#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { handleLeadOptions, handleLeadSubmission } from "../functions/_lib/lead-handler.js";
import * as bookingsFunction from "../functions/api/bookings.js";
import * as intakeFunction from "../functions/api/intake.js";
import { bookingFetch } from "../lib/booking-submission-client.ts";

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const serverLogs = [];
const calls = [];
const mode = { insertFailure: false, resendFailure: false };

console.error = (...args) => serverLogs.push(args);

globalThis.fetch = async (url, init = {}) => {
  const target = String(url);
  calls.push({ url: target, method: init.method || "GET", headers: init.headers || {}, body: init.body });
  if (target.includes("/rest/v1/bookings")) {
    return mode.insertFailure
      ? new Response(JSON.stringify({ message: "synthetic database failure" }), { status: 500 })
      : new Response(JSON.stringify([{ id: "mock-booking-id" }]), { status: 201, headers: { "Content-Type": "application/json" } });
  }
  if (target.includes("api.resend.com")) {
    return mode.resendFailure
      ? new Response(JSON.stringify({ message: "synthetic resend failure" }), { status: 500 })
      : new Response(JSON.stringify({ id: "mock-mail-id" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  if (target.includes("/storage/v1/object/")) return new Response("{}", { status: 201 });
  throw new Error(`Unexpected mocked target: ${target}`);
};

const env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "synthetic-service-role",
  RESEND_API_KEY: "synthetic-resend-key",
  INTAKE_NOTIFICATION_EMAIL: "lead@example.com",
  RESEND_FROM_EMAIL: "FLOXANT Test <test@example.com>",
  ALLOWED_FORM_ORIGINS: "https://preview.example.pages.dev",
};

const validPayload = (overrides = {}) => ({
  name: "Synthetic Request",
  email: "synthetic@example.com",
  phone: "",
  service: "umzug",
  privacyConsent: true,
  timestamp: new Date().toISOString(),
  ...overrides,
});

function request(payload, { origin = "https://www.floxant.de", endpoint = "/api/bookings", requestEnv = env } = {}) {
  return {
    context: {
      request: new Request(`https://www.floxant.de${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: origin },
        body: JSON.stringify(payload),
      }),
      env: requestEnv,
    },
  };
}

async function submit(payload, options) {
  const { context } = request(payload, options);
  const response = await handleLeadSubmission(context);
  return { response, body: await response.json() };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const results = [];
async function test(name, callback) {
  await callback();
  results.push(name);
}

try {
  await test("configuration-error-503", async () => {
    const result = await submit(validPayload(), { requestEnv: {} });
    assert(result.response.status === 503, "missing configuration must return 503");
    assert(result.body.ok === false && result.body.code === "CONFIGURATION_ERROR" && result.body.requestId, "configuration response contract");
    assert(!JSON.stringify(result.body).includes("SUPABASE"), "public response must not expose variable names");
  });

  await test("empty-payload-400", async () => {
    const result = await submit({});
    assert(result.response.status === 400 && result.body.code === "VALIDATION_ERROR", "empty payload must return 400");
  });

  await test("invalid-email-400", async () => {
    const result = await submit(validPayload({ email: "invalid" }));
    assert(result.response.status === 400 && result.body.fields.email, "invalid email must be assigned to email");
  });

  await test("missing-consent-400", async () => {
    const result = await submit(validPayload({ privacyConsent: undefined }));
    assert(result.response.status === 400 && result.body.fields.privacyConsent, "missing consent must return a field error");
  });

  await test("honeypot-safe-rejection", async () => {
    const result = await submit(validPayload({ companyWebsite: "bot.example" }));
    assert(result.response.status === 400 && result.body.code === "VALIDATION_ERROR", "honeypot must be rejected");
    assert(!JSON.stringify(result.body).includes("bot.example"), "honeypot value must not be echoed");
  });

  await test("foreign-origin-403", async () => {
    const result = await submit(validPayload(), { origin: "https://attacker.example" });
    assert(result.response.status === 403 && result.body.code === "ORIGIN_NOT_ALLOWED", "foreign origin must return 403");
  });

  await test("controlled-preview-origin", async () => {
    const result = await submit(validPayload(), { origin: "https://preview.example.pages.dev" });
    assert(result.response.status === 201 && result.response.headers.get("Access-Control-Allow-Origin") === "https://preview.example.pages.dev", "configured preview origin must work exactly");
  });

  await test("options-204", async () => {
    const response = handleLeadOptions({
      request: new Request("https://www.floxant.de/api/bookings", { method: "OPTIONS", headers: { Origin: "https://www.floxant.de" } }),
      env,
    });
    assert(response.status === 204, "OPTIONS must return 204");
    assert(response.headers.get("Access-Control-Allow-Origin") === "https://www.floxant.de", "OPTIONS must echo allowed origin");
    assert(response.headers.get("Access-Control-Allow-Methods") === "POST, OPTIONS", "OPTIONS methods header");
  });

  await test("pages-function-entrypoints", async () => {
    assert(bookingsFunction.onRequestPost === handleLeadSubmission, "bookings POST entrypoint must use shared handler");
    assert(bookingsFunction.onRequestOptions === handleLeadOptions, "bookings OPTIONS entrypoint must exist");
    assert(intakeFunction.onRequestPost === handleLeadSubmission, "intake POST entrypoint must use shared handler");
    assert(intakeFunction.onRequestOptions === handleLeadOptions, "intake OPTIONS entrypoint must exist");
  });

  await test("valid-json-201", async () => {
    const result = await submit(validPayload());
    assert(result.response.status === 201, "valid JSON must return 201");
    assert(result.body.ok === true && result.body.bookingId === "mock-booking-id" && result.body.requestId, "success response contract");
    assert(Object.keys(result.body).sort().join(",") === "bookingId,ok,requestId", "success response must contain only public fields");
  });

  await test("valid-formdata-201", async () => {
    const formData = new FormData();
    formData.set("name", "Synthetic FormData");
    formData.set("phone", "+49123456789");
    formData.set("service", "angebot_pruefen");
    formData.set("privacy", "on");
    formData.set("timestamp", new Date().toISOString());
    const response = await handleLeadSubmission({
      request: new Request("https://www.floxant.de/api/intake", { method: "POST", headers: { Origin: "https://www.floxant.de" }, body: formData }),
      env,
    });
    const body = await response.json();
    assert(response.status === 201 && body.ok === true, "valid FormData must return 201");
  });

  await test("structured-intake-json-201", async () => {
    const result = await submit({
      contact: { fullName: "Synthetic Calculator", email: "", phone: "+49123456789" },
      service: { type: "reinigung", source: "intake_wizard", entryPoint: "/rechner" },
      valuation: { priceRangeMin: 100, priceRangeMax: 200 },
      configuration: { propertyType: "synthetic" },
      metadata: { createdAt: new Date().toISOString(), intakeVersion: "synthetic" },
      privacyConsent: true,
    }, { endpoint: "/api/intake" });
    assert(result.response.status === 201 && result.body.ok === true, "structured intake JSON must return 201");
    const lastInsert = [...calls].reverse().find((call) => call.url.includes("/rest/v1/bookings"));
    const booking = JSON.parse(lastInsert.body)[0];
    assert(booking.service === "reinigung" && booking.details.service.type === "reinigung", "nested service.type must remain compatible");
  });

  await test("insert-failure-500", async () => {
    mode.insertFailure = true;
    const result = await submit(validPayload());
    mode.insertFailure = false;
    assert(result.response.status === 500 && result.body.code === "SUBMISSION_FAILED", "database failure must return 500");
    assert(!JSON.stringify(result.body).includes("database"), "database detail must stay private");
  });

  await test("resend-failure-still-201", async () => {
    mode.resendFailure = true;
    const result = await submit(validPayload());
    mode.resendFailure = false;
    assert(result.response.status === 201 && result.body.ok === true, "Resend failure must not undo booking success");
  });

  await test("no-pii-in-logs", async () => {
    const sentinelName = "PII-SENTINEL-NAME";
    const sentinelEmail = "pii-sentinel@example.com";
    mode.insertFailure = true;
    await submit(validPayload({ name: sentinelName, email: sentinelEmail }));
    mode.insertFailure = false;
    const logText = JSON.stringify(serverLogs);
    assert(!logText.includes(sentinelName) && !logText.includes(sentinelEmail), "server logs must not contain customer data");
  });

  await test("service-role-not-in-browser", async () => {
    const clientFiles = [
      "lib/booking-submission-client.ts",
      "components/SeoLeadForm.tsx",
      "components/SmartBookingWizard.tsx",
      "components/calculator/LeadCaptureForm.tsx",
      "components/calculator/LeadClosing.tsx",
    ];
    const browserSource = clientFiles.map((file) => readFileSync(file, "utf8")).join("\n");
    assert(!browserSource.includes("SUPABASE_SERVICE_ROLE_KEY"), "service role variable must not enter client sources");
  });

  await test("no-anon-insert", async () => {
    const handlerSource = readFileSync("functions/_lib/lead-handler.js", "utf8");
    assert(!handlerSource.includes("NEXT_PUBLIC_SUPABASE_ANON_KEY"), "anon key must not be used by Function");
    assert(!handlerSource.includes("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"), "publishable key must not be used by Function");
    const insertCall = calls.find((call) => call.url.includes("/rest/v1/bookings"));
    assert(insertCall && insertCall.headers.apikey === env.SUPABASE_SERVICE_ROLE_KEY, "insert must use service role key");
  });

  await test("double-click-one-request", async () => {
    let clientFetchCount = 0;
    globalThis.fetch = async () => {
      clientFetchCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 20));
      return new Response(JSON.stringify({ ok: true, requestId: "client-request", bookingId: "client-booking" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    };
    const formData = new FormData();
    formData.set("privacyConsent", "true");
    const [first, second] = await Promise.all([
      bookingFetch("/api/bookings?double-click", { method: "POST", body: formData }),
      bookingFetch("/api/bookings?double-click", { method: "POST", body: formData }),
    ]);
    assert(clientFetchCount === 1 && first.status === 201 && second.status === 201, "double click must share one browser request");
    globalThis.fetch = originalFetch;
  });

  await test("english-client-error-compatible", async () => {
    globalThis.document = { documentElement: { lang: "en" } };
    globalThis.fetch = async () => new Response(JSON.stringify({ ok: false, code: "CONFIGURATION_ERROR", requestId: "english-reference" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
    const response = await bookingFetch("/api/bookings?english", { method: "POST", body: new FormData() });
    const body = await response.json();
    assert(response.status === 503 && body.error.includes("Reference: english-reference"), "English error must include safe reference");
    delete globalThis.document;
    globalThis.fetch = originalFetch;
  });

  await test("upload-compatible", async () => {
    globalThis.fetch = async (url, init = {}) => {
      const target = String(url);
      calls.push({ url: target, method: init.method || "GET", headers: init.headers || {} });
      if (target.includes("/storage/v1/object/")) return new Response("{}", { status: 201 });
      if (target.includes("/rest/v1/bookings")) return new Response(JSON.stringify([{ id: "upload-booking" }]), { status: 201, headers: { "Content-Type": "application/json" } });
      if (target.includes("api.resend.com")) return new Response("{}", { status: 200 });
      throw new Error("unexpected upload target");
    };
    const formData = new FormData();
    formData.set("name", "Synthetic Upload");
    formData.set("phone", "+49123456789");
    formData.set("service", "angebot_pruefen");
    formData.set("privacyConsent", "true");
    formData.set("offerFile", new File([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37])], "synthetic.pdf", { type: "application/pdf" }));
    const response = await handleLeadSubmission({
      request: new Request("https://www.floxant.de/api/bookings", { method: "POST", headers: { Origin: "https://www.floxant.de" }, body: formData }),
      env,
    });
    assert(response.status === 201, "valid PDF upload must remain compatible");
    assert(calls.some((call) => call.url.includes("/storage/v1/object/uploads/")), "upload endpoint must be called");
  });

  await test("active-clients-use-contract-adapter", async () => {
    const files = [
      "components/BackhaulOffersBoard.tsx", "components/BudgetContactForm.tsx", "components/BusinessDisposalForm.tsx",
      "components/CellarTrashroomRescueForm.tsx", "components/CheaperAlternativeForm.tsx", "components/CommercialCleaningLeadForm.tsx",
      "components/DamageControlForm.tsx", "components/DiscreetMoveForm.tsx", "components/DuesseldorfB2BCleaningForm.tsx",
      "components/EstateClearanceForm.tsx", "components/HandoverFileForm.tsx", "components/OfferCheckForm.tsx",
      "components/OfferComparisonAdsForm.tsx", "components/PlanBServiceForm.tsx", "components/PlatformOrderCheckForm.tsx",
      "components/PrivateClientInquiryForm.tsx", "components/PropertyReadyForm.tsx", "components/QuickBudgetModal.tsx",
      "components/QuickExpressModal.tsx", "components/RealtorLandlordLinkForm.tsx", "components/ReferralPartnerCodeForm.tsx",
      "components/RegensburgApartmentCleaningForm.tsx", "components/RentalReadyForm.tsx", "components/ReturnTripBoardForm.tsx",
      "components/SeoLeadForm.tsx", "components/SmartBookingWizard.tsx", "components/TenantTurnoverForm.tsx",
      "components/calculator/LeadCaptureForm.tsx", "components/calculator/LeadClosing.tsx", "components/inquiry/InquiryIntentModal.tsx",
    ];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      assert(source.includes("bookingFetch("), `${file} must use bookingFetch`);
      assert(!/fetch\("\/api\/(bookings|intake)/.test(source), `${file} must not bypass the response contract`);
    }
  });

  originalConsoleError(JSON.stringify({ passed: true, cases: results, mockedExternalCalls: calls.length }, null, 2));
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
  if (globalThis.document?.documentElement?.lang === "en") delete globalThis.document;
}
