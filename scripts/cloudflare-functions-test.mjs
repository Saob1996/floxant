#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { handleLeadOptions, handleLeadSubmission } from "../functions/_lib/lead-handler.js";
import * as bookingsFunction from "../functions/api/bookings.js";
import * as intakeFunction from "../functions/api/intake.js";
import * as movingCanonicalRedirectFunction from "../functions/umzug-regensburg.js";
import { bookingFetch } from "../lib/booking-submission-client.ts";
import {
  REQUEST_SERVICE_POLICY,
  REQUEST_UNSURE_SERVICES,
} from "../lib/booking/request-service-policy.js";
import {
  ALLOWED_FILE_FIELDS,
  ALLOWED_TOP_LEVEL_FIELDS,
  MAX_PAYLOAD_FIELDS,
  countPayloadFields,
  normalizeLeadPayload,
} from "../functions/_lib/lead-payload.js";

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const originalConsoleInfo = console.info;
const serverLogs = [];
const serverInfoLogs = [];
const calls = [];
const mode = {
  insertFailure: false,
  resendFailure: false,
  resendHang: false,
  pairedEmptyBookingLookups: 0,
};
const metrics = {};
const mockBookingsById = new Map();
const mockStorageObjects = new Set();
const databaseMetrics = { insertConflicts: 0 };
const bookingLookupWaiters = [];

console.error = (...args) => serverLogs.push(args);
console.info = (...args) => serverInfoLogs.push(args);

const serverFetch = async (url, init = {}) => {
  const target = String(url);
  calls.push({ url: target, method: init.method || "GET", headers: init.headers || {}, body: init.body });
  if (target.includes("/rest/v1/bookings")) {
    const method = String(init.method || "GET").toUpperCase();
    if (method === "GET") {
      const idFilter = new URL(target).searchParams.get("id") || "";
      const bookingId = idFilter.replace(/^eq\./, "");
      const stored = mockBookingsById.get(bookingId);
      if (!stored && mode.pairedEmptyBookingLookups > 0) {
        mode.pairedEmptyBookingLookups -= 1;
        if (mode.pairedEmptyBookingLookups === 0) {
          for (const release of bookingLookupWaiters.splice(0)) release();
        } else {
          await new Promise((resolve) => bookingLookupWaiters.push(resolve));
        }
      }
      return new Response(JSON.stringify(stored ? [{ id: stored.id, details: stored.details }] : []), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (method !== "POST") throw new Error(`Unexpected bookings method: ${method}`);
    if (mode.insertFailure) {
      return new Response(JSON.stringify({ message: "synthetic database failure" }), { status: 500 });
    }
    const row = JSON.parse(String(init.body || "[]"))[0] || {};
    const bookingId = row.id || "mock-booking-id";
    if (row.id && mockBookingsById.has(row.id)) {
      databaseMetrics.insertConflicts += 1;
      return new Response(JSON.stringify({ code: "23505", message: "synthetic duplicate key" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (row.id) mockBookingsById.set(row.id, structuredClone(row));
    return new Response(JSON.stringify([{ id: bookingId }]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (target.includes("api.resend.com")) {
    if (mode.resendHang) {
      return new Promise((_resolve, reject) => {
        const abort = () => reject(new DOMException("Synthetic Resend timeout", "AbortError"));
        if (init.signal?.aborted) abort();
        else init.signal?.addEventListener("abort", abort, { once: true });
      });
    }
    return mode.resendFailure
      ? new Response(JSON.stringify({ message: "synthetic resend failure" }), { status: 500 })
      : new Response(JSON.stringify({ id: "mock-mail-id" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  if (target.includes("/storage/v1/object/")) {
    if (mockStorageObjects.has(target)) return new Response("{}", { status: 409 });
    mockStorageObjects.add(target);
    return new Response("{}", { status: 201 });
  }
  throw new Error(`Unexpected mocked target: ${target}`);
};
globalThis.fetch = serverFetch;

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

const activeClientFiles = [
  "components/BackhaulOffersBoard.tsx", "components/BudgetContactForm.tsx", "components/BusinessDisposalForm.tsx",
  "components/CellarTrashroomRescueForm.tsx", "components/CheaperAlternativeForm.tsx", "components/CommercialCleaningLeadForm.tsx",
  "components/DamageControlForm.tsx", "components/DiscreetMoveForm.tsx", "components/DuesseldorfB2BCleaningForm.tsx",
  "components/forms/DuesseldorfCleaningAdsForm.tsx", "components/forms/RegensburgMovingAdsForm.tsx",
  "components/EstateClearanceForm.tsx", "components/HandoverFileForm.tsx", "components/OfferCheckForm.tsx",
  "components/OfferComparisonAdsForm.tsx", "components/PlanBServiceForm.tsx", "components/PlatformOrderCheckForm.tsx",
  "components/PrivateClientInquiryForm.tsx", "components/PropertyReadyForm.tsx", "components/QuickBudgetModal.tsx",
  "components/QuickExpressModal.tsx", "components/RealtorLandlordLinkForm.tsx", "components/ReferralPartnerCodeForm.tsx",
  "components/RegensburgApartmentCleaningForm.tsx", "components/RentalReadyForm.tsx", "components/ReturnTripBoardForm.tsx",
  "components/SeoLeadForm.tsx", "components/SmartBookingWizard.tsx", "components/TenantTurnoverForm.tsx",
  "components/calculator/LeadCaptureForm.tsx", "components/calculator/LeadClosing.tsx", "components/inquiry/InquiryIntentModal.tsx",
];

const seoTopLevelFields = `
areaSize cityOrZip cleaningFrequency company companyName companyWebsite contactMethod contactPersonRole ctaLabel deadline
desiredDate details email existingCleaningOffer existingOffer formStartedAt funnelStage handoverCondition handoverDeadline
handoverExtraNeeds handoverKeyAccess handoverSituation hasOffer hasPhotos intent isSensitiveCase landingPage lead_type
leadPriority leadSource message missingInfoFlags missingInfoQuestions name objectType offerAmount offerConcern offerStatus
pageType phone pianoConcern pianoDestination pianoDestinationFloor pianoElevator pianoExistingOffer pianoInstrumentType
pianoNarrowStairs pianoPhotos pianoStartFloor pianoStartLocation preferredCleaningTime preferredContactMethod privacyConsent
propertyCleaningAccess propertyCleaningAreas propertyCleaningContactPerson propertyCleaningExistingOffer
propertyCleaningFrequency propertyCleaningObjectType propertyCleaningRole propertyCleaningStartDate recommendedNextStep
referrer requestSummary responseTemplateKey scope seniorDeadline seniorDestination seniorDestinationFloor seniorElevator
seniorExistingOffer seniorExtraNeeds seniorRequesterRole seniorScope seniorSensitiveSituation seniorStartFloor
seniorStartLocation service serviceCategory serviceScope signatureServiceHint solarAccess solarExistingOffer solarModuleScope
solarObjectType solarRoofType solarTimeframe solarVisibleDirt source sourceComponent sourceContext sourcePage specialAreas
timestamp type urgency conversionJourneyId conversionLastEvent conversionLastSource conversionLastChannel conversionLastIntent
conversionLastPriority
`.trim().split(/\s+/);

const seoFlowFields = `
handoverSituation handoverCondition handoverDeadline handoverKeyAccess handoverExtraNeeds offerStatus existingOffer
offerAmountText offerConcern companyName areaSize cleaningFrequency preferredCleaningTime contactPersonRole serviceScope
existingCleaningOffer specialAreas propertyCleaningRole propertyCleaningObjectType propertyCleaningAreas
propertyCleaningFrequency propertyCleaningAccess propertyCleaningContactPerson propertyCleaningExistingOffer
propertyCleaningStartDate solarRoofType solarAccess solarModuleScope solarVisibleDirt solarExistingOffer solarTimeframe
solarObjectType pianoInstrumentType pianoStartLocation pianoDestination pianoStartFloor pianoDestinationFloor pianoElevator
pianoNarrowStairs pianoPhotos pianoExistingOffer pianoConcern seniorRequesterRole seniorStartLocation seniorDestination
seniorStartFloor seniorDestinationFloor seniorElevator seniorScope seniorExtraNeeds seniorDeadline seniorExistingOffer
seniorSensitiveSituation
`.trim().split(/\s+/);

function emptyRecord(keys) {
  return Object.fromEntries(keys.map((key) => [key, ""]));
}

function largestActiveContactPayload() {
  const responseHints = {
    responseTemplateKey: "standard",
    subjectSuggestion: "Synthetic subject",
    recommendedNextStep: "Synthetic next step",
    missingInfoQuestions: ["Synthetic question 1", "Synthetic question 2", "Synthetic question 3", "Synthetic question 4"],
    customerAcknowledgement: "Synthetic acknowledgement",
  };
  const repeatedContext = {
    inquiryMode: "seo_quick_lead",
    serviceType: "reinigung",
    bookingService: "reinigung",
    city: "Synthetic City",
    intent: "synthetic-contact",
    priority: "p1",
    objectType: "wohnung",
    urgency: "flexibel",
    desiredDate: "2099-01-01",
    scopeSummary: "Synthetic scope",
    ...emptyRecord(seoFlowFields),
    contactMethod: "email",
    preferredContactMethod: "email",
    requestSummary: "Synthetic request summary",
    missingInfoFlags: ["synthetic-flag"],
    hasPhotos: false,
    hasOffer: false,
    signatureServiceHint: "",
    leadPriority: "p1",
    leadResponseHints: responseHints,
    responseTemplateKey: responseHints.responseTemplateKey,
    recommendedNextStep: responseHints.recommendedNextStep,
    missingInfoQuestions: responseHints.missingInfoQuestions,
    privacyConsent: true,
    isSensitiveCase: false,
    sourcePage: "/kontakt",
    landingPage: "/kontakt",
    referrer: "",
  };
  const payload = {
    ...emptyRecord(seoTopLevelFields),
    name: "Synthetic Largest Contact",
    email: "largest-contact@example.com",
    service: "reinigung",
    privacyConsent: "true",
    timestamp: new Date().toISOString(),
    formStartedAt: String(Date.now() - 5_000),
    type: "booking_wizard",
    lead_type: "seo_quick_lead",
    leadSource: "seo_quick_lead_form",
    source: "seo",
    sourceComponent: "SeoLeadForm",
    sourceContext: "synthetic-contact",
    sourcePage: "/kontakt",
    landingPage: "/kontakt",
    serviceCategory: "reinigung",
    intent: "synthetic-contact",
    details: {
      contact: {
        fullName: "Synthetic Largest Contact",
        email: "largest-contact@example.com",
        phone: "",
        callbackPreference: "email",
        notes: "Synthetic contact request",
      },
      service: {
        type: "reinigung",
        source: "seo_quick_lead_form",
        entryPoint: "/kontakt",
        presetFromUrl: "reinigung",
        regionPreset: "regensburg",
      },
      valuation: {
        systemPriceRangeMin: 0,
        systemPriceRangeMax: 0,
        priceRangeMin: 0,
        priceRangeMax: 0,
        valuationLabel: "Synthetic contact",
        valuationStage: "Synthetic validation",
        accuracyState: "Synthetic",
        topDrivers: Array.from({ length: 12 }, (_, index) => `Synthetic driver ${index + 1}`),
        priceExplanation: "Synthetic explanation",
        pricingSignals: repeatedContext,
      },
      configuration: {
        requestContext: "seo_quick_lead",
        leadType: "seo_quick_lead",
        service: "reinigung",
        bookingService: "reinigung",
        serviceLabel: "Reinigung",
        city: "Synthetic City",
        citySlug: "regensburg",
        ...repeatedContext,
        message: "Synthetic contact request",
        formStartedAt: Date.now() - 5_000,
        submittedAt: new Date().toISOString(),
      },
      metadata: {
        createdAt: new Date().toISOString(),
        intakeVersion: "seo-lead-1.0.0",
        source: "seo_quick_lead_form",
        servicePresetFromUrl: "reinigung",
        regionPreset: "regensburg",
        clientContext: {
          leadSource: "seo",
          leadType: "seo_quick_lead",
          sourceComponent: "SeoLeadForm",
          service: "reinigung",
          city: "Synthetic City",
          ...repeatedContext,
        },
      },
    },
  };
  return payload;
}

function payloadAtNormalizedLimit(extraItem = false) {
  return validPayload({
    details: {
      configuration: {
        selectedServices: Array.from({ length: 64 }, (_, index) => `service-${index}`),
        selectedAddons: Array.from({ length: 64 }, (_, index) => `addon-${index}`),
        selectedOpenItems: Array.from({ length: 64 }, (_, index) => `open-${index}`),
        missingInfoQuestions: Array.from({ length: extraItem ? 38 : 37 }, (_, index) => `question-${index}`),
      },
    },
  });
}

const offerCheckFields = `
budget callbackWanted cityOrZip contactMethod ctaLabel deadline desiredDate email existingOffer formDurationMs formStartedAt
funnelStage intent landingPage lead_type leadSource leadSubtype message name offerAmount offerConcern offerProvider
offerSourceType offerStatus offerText pageType partnerCode phone preferredContactMethod privacy privacyConsent quotedPrice
redFlagCategories redFlagItems redFlagSummary referralCode referrer region scannerScoreLabel scannerScoreLevel scannerScoreValue
selectedAddons service serviceCategory source sourceComponent sourcePage timestamp type utmCampaign utmContent utmMedium utmSource
`.trim().split(/\s+/);

function largestActiveOfferFormData() {
  const formData = new FormData();
  for (const key of offerCheckFields) formData.set(key, `synthetic-${key}`);
  formData.set("name", "Synthetic Largest Offer");
  formData.set("email", "largest-offer@example.com");
  formData.set("phone", "+49123456789");
  formData.set("contactMethod", "email");
  formData.set("preferredContactMethod", "email");
  formData.set("service", "angebot_pruefen");
  formData.set("privacy", "on");
  formData.set("privacyConsent", "true");
  formData.set("timestamp", new Date().toISOString());
  formData.set("formStartedAt", String(Date.now() - 5_000));
  formData.set("formDurationMs", "5000");
  formData.set("selectedAddons", JSON.stringify(["Synthetic addon 1", "Synthetic addon 2"]));
  formData.set("redFlagCategories", JSON.stringify(["synthetic-category"]));
  formData.set("redFlagItems", JSON.stringify(["synthetic-item"]));
  return formData;
}

async function submitFormData(formData, {
  endpoint = "/api/bookings",
  acceptLanguage = "de-DE",
  idempotencyKey,
  origin = "https://www.floxant.de",
} = {}) {
  const headers = { Origin: origin, "Accept-Language": acceptLanguage };
  if (idempotencyKey !== undefined) headers["Idempotency-Key"] = idempotencyKey;
  const response = await handleLeadSubmission({
    request: new Request(`${origin}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    }),
    env,
  });
  return { response, body: await response.json() };
}

function uploadFormData() {
  const formData = new FormData();
  formData.set("name", "Synthetic Upload Request");
  formData.set("email", "synthetic-upload@example.com");
  formData.set("service", "reinigung");
  formData.set("privacyConsent", "true");
  return formData;
}

function professionalPayload(serviceId, location, fields = {}) {
  return validPayload({
    type: "professional_request",
    lead_type: "professional_request",
    sourceComponent: "ProfessionalRequestForm",
    service: serviceId,
    serviceId,
    location,
    contactMethod: "email",
    ...fields,
  });
}

function duesseldorfCleaningFormData() {
  const formData = new FormData();
  for (const [key, value] of Object.entries({
    type: "professional_request",
    lead_type: "professional_request",
    sourceComponent: "ProfessionalRequestForm",
    sourcePage: "/kontakt?location=duesseldorf&service=reinigung",
    service: "reinigung",
    serviceId: "reinigung",
    location: "duesseldorf",
    cityOrZip: "40210 Düsseldorf",
    objectType: "Wohnung",
    areaSize: "85 m²",
    scope: "Unterhaltsreinigung der Wohnräume",
    name: "Élodie O’Connor-Straße",
    email: "elodie@example.com",
    phone: "+49 (0) 211 / 12 34-567",
    contactMethod: "email",
    preferredContactMethod: "email",
    privacyConsent: "true",
    timestamp: new Date().toISOString(),
  })) {
    formData.set(key, value);
  }
  return formData;
}

function syntheticPdf(size, name) {
  const bytes = new Uint8Array(size);
  bytes.set([0x25, 0x50, 0x44, 0x46, 0x2d]);
  return new File([bytes], name, { type: "application/pdf" });
}

function request(payload, {
  origin = "https://www.floxant.de",
  endpoint = "/api/bookings",
  requestEnv = env,
  acceptLanguage = "de-DE",
  idempotencyKey,
} = {}) {
  const headers = { "Content-Type": "application/json", Origin: origin, "Accept-Language": acceptLanguage };
  if (idempotencyKey !== undefined) headers["Idempotency-Key"] = idempotencyKey;
  return {
    context: {
      request: new Request(`https://www.floxant.de${endpoint}`, {
        method: "POST",
        headers,
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

  await test("cloudflare-project-preview-origins", async () => {
    const previewEnv = { ...env, ALLOWED_FORM_ORIGINS: "" };
    const immutableOrigin = "https://210bb1c5.floxant.pages.dev";
    const immutableResult = await submit(validPayload(), {
      origin: immutableOrigin,
      requestEnv: previewEnv,
    });
    assert(
      immutableResult.response.status === 201
      && immutableResult.response.headers.get("Access-Control-Allow-Origin") === immutableOrigin,
      "the immutable FLOXANT Pages preview must accept its own origin",
    );

    const branchOrigin = "https://codex-central-enquiry-flow-2.floxant.pages.dev";
    const branchOptions = handleLeadOptions({
      request: new Request("https://www.floxant.de/api/bookings", {
        method: "OPTIONS",
        headers: { Origin: branchOrigin },
      }),
      env: previewEnv,
    });
    assert(
      branchOptions.status === 204
      && branchOptions.headers.get("Access-Control-Allow-Origin") === branchOrigin,
      "the FLOXANT branch preview must accept its own origin",
    );

    const siblingResult = await submit(validPayload(), {
      origin: "https://attacker.pages.dev",
      requestEnv: previewEnv,
    });
    assert(
      siblingResult.response.status === 403 && siblingResult.body.code === "ORIGIN_NOT_ALLOWED",
      "an unrelated Pages project must remain blocked",
    );
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

  await test("server-idempotency-key-validation-400", async () => {
    const insertsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    for (const idempotencyKey of ["not-a-uuid", "x".repeat(97)]) {
      const result = await submit(validPayload(), { idempotencyKey });
      assert(
        result.response.status === 400 && result.body.code === "INVALID_IDEMPOTENCY_KEY" && result.body.requestId,
        "malformed and overlong idempotency keys must return a safe 400 response",
      );
    }
    assert(
      calls.filter((call) => call.url.includes("/rest/v1/bookings")).length === insertsBefore,
      "invalid idempotency keys must be rejected before insertion",
    );
  });

  await test("server-idempotency-parallel-and-later-replay", async () => {
    const idempotencyKey = `professional_request:${Date.now()}:${crypto.randomUUID()}`;
    const firstFormData = uploadFormData();
    const secondFormData = uploadFormData();
    firstFormData.append("photo", syntheticPdf(8, "same-request.pdf"));
    secondFormData.append("photo", syntheticPdf(8, "same-request.pdf"));
    const callsBefore = calls.length;
    const conflictsBefore = databaseMetrics.insertConflicts;
    mode.pairedEmptyBookingLookups = 2;

    let first;
    let second;
    try {
      [first, second] = await Promise.all([
        submitFormData(firstFormData, { idempotencyKey }),
        submitFormData(secondFormData, { idempotencyKey }),
      ]);
    } finally {
      mode.pairedEmptyBookingLookups = 0;
      for (const release of bookingLookupWaiters.splice(0)) release();
    }
    assert(first.response.status === 201 && second.response.status === 201, "parallel keyed submissions must both return 201");
    assert(
      first.body.requestId === second.body.requestId && first.body.bookingId === second.body.bookingId,
      "parallel keyed submissions must replay the same identifiers",
    );

    const parallelCalls = calls.slice(callsBefore);
    assert(
      parallelCalls.filter((call) => call.url.includes("/storage/v1/object/")).length === 2
      && new Set(parallelCalls.filter((call) => call.url.includes("/storage/v1/object/")).map((call) => call.url)).size === 1,
      "parallel retries may race on one deterministic storage object",
    );
    assert(
      parallelCalls.filter((call) => call.url.includes("/rest/v1/bookings") && call.method === "POST").length === 2
      && databaseMetrics.insertConflicts === conflictsBefore + 1
      && mockBookingsById.has(idempotencyKey.slice(-36)),
      "the bookings UUID primary key must resolve a parallel database insert race to one row",
    );
    assert(
      parallelCalls.filter((call) => call.url.includes("api.resend.com")).length === 2,
      "parallel replay must send the internal and customer emails only once",
    );

    const replayFormData = uploadFormData();
    replayFormData.append("photo", syntheticPdf(8, "same-request.pdf"));
    const callsBeforeReplay = calls.length;
    const replay = await submitFormData(replayFormData, { idempotencyKey });
    assert(replay.response.status === 201, "later cross-isolate-safe replay must return 201");
    assert(
      replay.body.requestId === first.body.requestId && replay.body.bookingId === first.body.bookingId,
      "later same-isolate replay must preserve the original identifiers",
    );
    const replayCalls = calls.slice(callsBeforeReplay);
    assert(
      replayCalls.length === 1
      && replayCalls[0].url.includes("/rest/v1/bookings")
      && replayCalls[0].method === "GET",
      "later replay must only read the durable booking and repeat no external side effect",
    );

    const newFormData = uploadFormData();
    newFormData.append("photo", syntheticPdf(8, "new-request.pdf"));
    const callsBeforeNewKey = calls.length;
    const newSubmission = await submitFormData(newFormData, { idempotencyKey: crypto.randomUUID() });
    const newKeyCalls = calls.slice(callsBeforeNewKey);
    assert(newSubmission.response.status === 201 && newSubmission.body.ok === true, "a legitimate new key must still succeed");
    assert(newSubmission.body.requestId !== first.body.requestId, "a new key must create a new request identifier");
    assert(
      newKeyCalls.filter((call) => call.url.includes("/storage/v1/object/")).length === 1
      && newKeyCalls.filter((call) => call.url.includes("/rest/v1/bookings") && call.method === "POST").length === 1
      && newKeyCalls.filter((call) => call.url.includes("api.resend.com")).length === 2,
      "a new key must perform one upload, one insert, and one notification pair",
    );
  });

  await test("server-idempotency-failure-releases-key", async () => {
    const idempotencyKey = crypto.randomUUID();
    const stablePayload = validPayload();
    const callsBefore = calls.length;
    let failed;
    mode.insertFailure = true;
    try {
      failed = await submit(stablePayload, { idempotencyKey });
    } finally {
      mode.insertFailure = false;
    }
    assert(failed.response.status === 500 && failed.body.code === "SUBMISSION_FAILED", "failed keyed insert must return 500");

    const recovered = await submit(stablePayload, { idempotencyKey });
    assert(recovered.response.status === 201 && recovered.body.ok === true, "the same key must be reusable after failure");
    assert(recovered.body.requestId !== failed.body.requestId, "the recovered attempt must be a new operation");

    const callsBeforeReplay = calls.length;
    const replay = await submit(stablePayload, { idempotencyKey });
    assert(
      replay.response.status === 201
      && replay.body.requestId === recovered.body.requestId
      && replay.body.bookingId === recovered.body.bookingId,
      "a recovered success must become replayable",
    );
    const replayCalls = calls.slice(callsBeforeReplay);
    assert(
      replayCalls.length === 1
      && replayCalls[0].url.includes("/rest/v1/bookings")
      && replayCalls[0].method === "GET",
      "a recovered success replay must only perform the durable lookup",
    );

    const attemptCalls = calls.slice(callsBefore);
    assert(
      attemptCalls.filter((call) => call.url.includes("/rest/v1/bookings") && call.method === "POST").length === 2,
      "failure release must permit exactly one fresh insert attempt",
    );
    assert(
      attemptCalls.filter((call) => call.url.includes("api.resend.com")).length === 2,
      "only the recovered success may send the notification pair",
    );
  });

  await test("client-clock-skew-never-blocks-valid-request", async () => {
    const result = await submit(validPayload({
      timestamp: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      formStartedAt: String(Date.now() + 5 * 60 * 1000),
    }));
    assert(result.response.status === 201 && result.body.ok === true, "hidden client timestamps must never reject a valid enquiry");
  });

  await test("server-idempotency-cross-isolate-replay-and-safe-conflict", async () => {
    const idempotencyKey = `professional_request:${Date.now()}:${crypto.randomUUID()}`;
    const stablePayload = validPayload({
      name: "Jörg O’Connor",
      phone: "+49 (0) 211 / 12 34-567",
      timestamp: new Date(Date.now() - 5_000).toISOString(),
      details: {
        configuration: {
          submittedAt: "2026-08-03T08:00:00.000Z",
          utmCampaign: "first-touch",
          gclid: "first-click-id",
          conversionJourneyId: "first-journey",
          conversionLastSource: "organic",
        },
        metadata: {
          createdAt: "2026-08-03T08:00:00.000Z",
          conversionJourney: {
            timestamp: "2026-08-03T08:00:00.000Z",
            source: "organic",
            lastEvent: "view",
          },
          clientContext: { utmSource: "google", landingPage: "/kontakt" },
        },
      },
    });
    const retriedPayload = structuredClone(stablePayload);
    retriedPayload.timestamp = new Date().toISOString();
    retriedPayload.details.configuration.submittedAt = "2026-08-03T08:01:00.000Z";
    retriedPayload.details.metadata.createdAt = "2026-08-03T08:01:00.000Z";
    retriedPayload.details.metadata.conversionJourney.timestamp = "2026-08-03T08:01:00.000Z";
    retriedPayload.details.configuration.utmCampaign = "retry-touch";
    retriedPayload.details.configuration.gclid = "retry-click-id";
    retriedPayload.details.configuration.conversionJourneyId = "retry-journey";
    retriedPayload.details.configuration.conversionLastSource = "paid";
    retriedPayload.details.metadata.conversionJourney.source = "paid";
    retriedPayload.details.metadata.conversionJourney.lastEvent = "form_retry";
    retriedPayload.details.metadata.clientContext.utmSource = "newsletter";
    retriedPayload.details.metadata.clientContext.landingPage = "/kontakt/retry";
    const callsBefore = calls.length;
    const first = await submit(stablePayload, {
      idempotencyKey,
      origin: "https://www.floxant.de",
    });
    const replay = await submit(retriedPayload, {
      idempotencyKey,
      origin: "https://floxant.de",
    });
    const conflict = await submit({ ...retriedPayload, service: "reinigung" }, {
      idempotencyKey,
      origin: "https://floxant.pages.dev",
    });
    assert(first.response.status === 201 && replay.response.status === 201, "new submission timestamps must remain the same durable retry across independent origins");
    assert(
      first.body.bookingId === replay.body.bookingId
      && first.body.requestId === replay.body.requestId
      && first.body.bookingId === idempotencyKey.slice(-36),
      "database replay must preserve the UUID-backed booking and original request identifiers",
    );
    assert(
      conflict.response.status === 409
      && conflict.body.code === "IDEMPOTENCY_CONFLICT"
      && conflict.body.ok === false
      && conflict.body.requestId,
      "reusing a key for a different payload must return a safe conflict",
    );
    const attemptCalls = calls.slice(callsBefore);
    assert(
      attemptCalls.filter((call) => call.url.includes("/rest/v1/bookings") && call.method === "POST").length === 1,
      "same-payload replay and different-payload conflict must not create a second row",
    );
    assert(
      attemptCalls.filter((call) => call.url.includes("api.resend.com")).length === 2,
      "only the first successful insert may send the notification pair",
    );
    const stored = mockBookingsById.get(idempotencyKey.slice(-36));
    assert(
      /^sha256:[0-9a-f]{64}$/.test(stored?.details?.metadata?.idempotencyFingerprint || "")
      && stored?.details?.metadata?.idempotencyRequestId === first.body.requestId,
      "the booking must persist only a non-PII payload fingerprint and the original request ID",
    );
  });

  await test("pages-function-entrypoints", async () => {
    assert(bookingsFunction.onRequestPost === handleLeadSubmission, "bookings POST entrypoint must use shared handler");
    assert(bookingsFunction.onRequestOptions === handleLeadOptions, "bookings OPTIONS entrypoint must exist");
    assert(intakeFunction.onRequestPost === handleLeadSubmission, "intake POST entrypoint must use shared handler");
    assert(intakeFunction.onRequestOptions === handleLeadOptions, "intake OPTIONS entrypoint must exist");
  });

  await test("Regensburg-moving-canonical-redirect", async () => {
    const response = movingCanonicalRedirectFunction.onRequest({
      request: new Request("https://www.floxant.de/umzug-regensburg"),
    });
    assert(response.status === 308, "legacy Regensburg moving route must redirect permanently");
    assert(
      response.headers.get("Location") === "https://www.floxant.de/regensburg/umzug",
      "legacy Regensburg moving route must target the canonical organic page",
    );
  });

  await test("largest-active-contact-payload-201", async () => {
    const payload = largestActiveContactPayload();
    const rawFieldCount = countPayloadFields(payload);
    const { context } = request(payload);
    const normalized = normalizeLeadPayload(payload, context.request);
    const normalizedFieldCount = countPayloadFields(normalized);
    assert(rawFieldCount > MAX_PAYLOAD_FIELDS, "largest contact fixture must reproduce the old false-positive limit");
    assert(normalizedFieldCount <= MAX_PAYLOAD_FIELDS, "largest contact fixture must remain inside the secured normalized limit");
    const result = await submit(payload);
    assert(result.response.status === 201 && result.body.ok === true, "largest legitimate contact payload must return 201");
    metrics.largestContactRawFields = rawFieldCount;
    metrics.largestContactNormalizedFields = normalizedFieldCount;
  });

  await test("largest-active-offer-formdata-201", async () => {
    const formData = largestActiveOfferFormData();
    metrics.largestOfferTopLevelFields = new Set(formData.keys()).size;
    const result = await submitFormData(formData);
    assert(result.response.status === 201 && result.body.ok === true, "largest legitimate offer FormData must return 201");
  });

  await test("duesseldorf-cleaning-minimal-formdata-201", async () => {
    const formData = duesseldorfCleaningFormData();
    for (const omitted of [
      "desiredDate",
      "frequency",
      "cleaningFrequency",
      "selectedAddons",
      "selectedServices",
      "upgrades",
    ]) {
      assert(!formData.has(omitted), `minimal Düsseldorf/Reinigung FormData must omit ${omitted}`);
    }
    const callsBefore = calls.length;
    const result = await submitFormData(formData);
    const submissionCalls = calls.slice(callsBefore);
    const insertCalls = submissionCalls.filter(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    );
    assert(result.response.status === 201 && result.body.ok === true, `minimal Düsseldorf/Reinigung FormData must return 201: ${JSON.stringify(result.body)}`);
    assert(insertCalls.length === 1, "minimal Düsseldorf/Reinigung FormData must insert exactly once");
    const inserted = JSON.parse(insertCalls[0].body)[0];
    assert(inserted.details.configuration.formProfile === "cleaning", "the cleaning profile must come from the service policy");
    assert(inserted.details.configuration.location === "40210 Düsseldorf", "the submitted city or postal code must remain visible");
    assert(inserted.details.configuration.locationId === "duesseldorf" && inserted.details.configuration.region === "duesseldorf", "the policy region must remain canonical and separate from the submitted location");
    assert(inserted.details.configuration.cleaningRequest.location === "40210 Düsseldorf", "the cleaning projection must keep the submitted location");
    assert(inserted.details.configuration.serviceRequest.locationLabel === "40210 Düsseldorf", "the dashboard projection must keep the submitted location");
    const notificationCalls = submissionCalls.filter((call) => call.url.includes("api.resend.com"));
    assert(notificationCalls.length === 2 && notificationCalls.every((call) => call.body.includes("40210 Düsseldorf")), "internal and customer emails must include the submitted location");
    assert(inserted.upgrades.length === 0 && inserted.details.configuration.selectedAddons.length === 0, "omitted add-ons must remain an empty canonical list");
    assert(
      !Object.hasOwn(inserted.details.configuration.rawFields, "desiredDate")
      && !Object.hasOwn(inserted.details.configuration.rawFields, "cleaningFrequency"),
      "optional date and frequency must remain optional through persistence",
    );
  });

  await test("professional-minimal-profile-matrix-201", async () => {
    const fixtures = [
      {
        profile: "cleaning",
        serviceId: "reinigung",
        location: "duesseldorf",
        fields: { cityOrZip: "Düsseldorf", objectType: "Wohnung", areaSize: "85 m²", scope: "Wohnräume reinigen" },
      },
      {
        profile: "moving",
        serviceId: "umzug",
        location: "regensburg",
        fields: { startLocation: "Regensburg", destinationLocation: "Nürnberg", scope: "Zwei Zimmer" },
      },
      {
        profile: "furniture",
        serviceId: "moebeltransport",
        location: "regensburg",
        fields: { startLocation: "Regensburg", destinationLocation: "Landshut", itemDescription: "Ein Sideboard" },
      },
      {
        profile: "piano",
        serviceId: "klaviertransport",
        location: "regensburg",
        fields: { startLocation: "Regensburg", destinationLocation: "München", instrumentType: "Klavier" },
      },
      {
        profile: "clearance",
        serviceId: "entruempelung",
        location: "regensburg",
        fields: { cityOrZip: "93047 Regensburg", objectType: "Keller", areaSize: "25 m²" },
      },
      {
        profile: "offer_check",
        serviceId: "angebotscheck",
        location: "duesseldorf",
        fields: { cityOrZip: "40210 Düsseldorf", scope: "Umzugsangebot prüfen" },
      },
      {
        profile: "general",
        serviceId: "diskret-service",
        location: "duesseldorf",
        fields: { cityOrZip: "Düsseldorf", scope: "Diskrete Objektklärung" },
      },
    ];
    const postsBefore = calls.filter(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    ).length;
    for (const fixture of fixtures) {
      const result = await submit(professionalPayload(fixture.serviceId, fixture.location, fixture.fields));
      assert(result.response.status === 201 && result.body.ok === true, `${fixture.profile} minimal profile must return 201: ${JSON.stringify(result.body)}`);
      const insertCall = calls.filter(
        (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
      ).at(-1);
      const inserted = JSON.parse(insertCall.body)[0];
      assert(inserted.details.configuration.formProfile === fixture.profile, `${fixture.profile} must persist its canonical profile`);
      assert(!Object.hasOwn(inserted.details.configuration.rawFields, "desiredDate"), `${fixture.profile} must not require a desired date`);
    }
    const postsAfter = calls.filter(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    ).length;
    assert(postsAfter === postsBefore + fixtures.length, "every minimal profile must insert exactly once");
  });

  await test("every-active-location-service-combination-201", async () => {
    const profileFields = {
      cleaning: { cityOrZip: "40210 Düsseldorf", objectType: "Büro", areaSize: "120 m²", scope: "Büroflächen reinigen" },
      moving: { startLocation: "Regensburg", destinationLocation: "Landshut", scope: "Zwei Zimmer" },
      furniture: { startLocation: "Regensburg", destinationLocation: "Landshut", itemDescription: "Ein Sideboard" },
      piano: { startLocation: "Regensburg", destinationLocation: "München", instrumentType: "Klavier" },
      clearance: { cityOrZip: "93047 Regensburg", objectType: "Keller", areaSize: "25 m²" },
      offer_check: { cityOrZip: "40210 Düsseldorf", scope: "Vorliegendes Angebot prüfen" },
      general: { cityOrZip: "40210 Düsseldorf", scope: "Diskrete Anfrage einordnen" },
    };
    let combinations = 0;
    for (const entry of REQUEST_SERVICE_POLICY) {
      for (const location of entry.locations) {
        combinations += 1;
        const callsBefore = calls.length;
        const result = await submit(validPayload({
          type: "professional_request",
          lead_type: "professional_request",
          sourceComponent: "ProfessionalRequestForm",
          service: entry.leadService,
          serviceId: entry.id,
          serviceCategory: entry.id,
          location,
          contactMethod: "email",
          preferredContactMethod: "email",
          ...profileFields[entry.formProfile],
        }));
        assert(result.response.status === 201 && result.body.ok === true, `${location}/${entry.id} must return 201`);
        const combinationCalls = calls.slice(callsBefore);
        const insertCalls = combinationCalls.filter((call) => call.url.includes("/rest/v1/bookings") && call.method === "POST");
        assert(insertCalls.length === 1, `${location}/${entry.id} must insert exactly once`);
        assert(combinationCalls.filter((call) => call.url.includes("api.resend.com")).length === 2, `${location}/${entry.id} must send exactly one notification pair`);
        const inserted = JSON.parse(insertCalls[0].body)[0];
        assert(inserted.details.configuration.serviceId === entry.id, `${location}/${entry.id} must persist the canonical service ID`);
        assert(inserted.details.configuration.locationId === location && inserted.details.configuration.region === location, `${location}/${entry.id} must persist the canonical location ID`);
        assert(inserted.details.configuration.formProfile === entry.formProfile, `${location}/${entry.id} must persist its registry profile`);
      }
    }
    assert(combinations === 44, `expected 44 active registry combinations, got ${combinations}`);
    metrics.activeRegistryCombinations = combinations;
  });

  await test("every-unsure-service-profile-201", async () => {
    const profileFields = {
      cleaning: { cityOrZip: "93047 Regensburg", objectType: "Wohnung", areaSize: "80 m²", scope: "Reinigung einordnen" },
      moving: { startLocation: "93047 Regensburg", destinationLocation: "Ziel noch offen", scope: "Zwei Zimmer" },
      clearance: { cityOrZip: "93047 Regensburg", objectType: "Keller", areaSize: "25 m²" },
      general: { cityOrZip: "93047 Regensburg", scope: "Andere Anfrage einordnen" },
    };
    for (const entry of REQUEST_UNSURE_SERVICES) {
      const callsBefore = calls.length;
      const result = await submit(validPayload({
        type: "professional_request",
        lead_type: "professional_request",
        sourceComponent: "ProfessionalRequestForm",
        service: entry.leadService,
        serviceId: entry.id,
        serviceCategory: entry.id,
        location: "unsicher",
        contactMethod: "email",
        preferredContactMethod: "email",
        ...profileFields[entry.formProfile],
      }));
      assert(result.response.status === 201 && result.body.ok === true, `unsicher/${entry.id} must return 201`);
      const combinationCalls = calls.slice(callsBefore);
      const insertCalls = combinationCalls.filter((call) => call.url.includes("/rest/v1/bookings") && call.method === "POST");
      assert(insertCalls.length === 1, `unsicher/${entry.id} must insert exactly once`);
      assert(combinationCalls.filter((call) => call.url.includes("api.resend.com")).length === 2, `unsicher/${entry.id} must send exactly one notification pair`);
      const inserted = JSON.parse(insertCalls[0].body)[0];
      assert(inserted.details.configuration.serviceId === entry.id, `unsicher/${entry.id} must persist its canonical service ID`);
      assert(inserted.details.configuration.locationId === "unsicher", `unsicher/${entry.id} must persist the neutral location ID`);
      assert(inserted.details.configuration.formProfile === entry.formProfile, `unsicher/${entry.id} must persist its profile`);
    }
    metrics.unsureServiceProfiles = REQUEST_UNSURE_SERVICES.length;
  });

  await test("formdata-structured-addon-json-and-empty-arrays-201", async () => {
    const formData = duesseldorfCleaningFormData();
    formData.set("selectedAddons", JSON.stringify(["Fenster- und Glasflächen"]));
    formData.set("selectedServices", "[]");
    formData.set("upgrades", "[]");
    const callsBefore = calls.length;
    const result = await submitFormData(formData);
    assert(result.response.status === 201 && result.body.ok === true, "JSON add-ons and empty structured arrays must be accepted");
    const insertCall = calls.slice(callsBefore).find(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    );
    const inserted = JSON.parse(insertCall.body)[0];
    assert(
      inserted.upgrades.length === 1
      && inserted.upgrades[0] === "Fenster- und Glasflächen"
      && inserted.details.configuration.selectedAddons[0] === "Fenster- und Glasflächen",
      "allowed add-ons must persist with their canonical policy label",
    );
  });

  await test("formdata-legacy-addon-lists-201", async () => {
    const formData = duesseldorfCleaningFormData();
    formData.set("selectedServices", "Fenster- und Glasflächen | Küche");
    formData.set("selectedAddons", "");
    formData.set("upgrades", "");
    const callsBefore = calls.length;
    const result = await submitFormData(formData);
    assert(result.response.status === 201 && result.body.ok === true, "legacy comma or pipe add-on lists must remain compatible");
    const insertCall = calls.slice(callsBefore).find(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    );
    const inserted = JSON.parse(insertCall.body)[0];
    assert(
      inserted.upgrades.join("|") === "Fenster- und Glasflächen|Küche",
      "top-level selectedServices must be canonicalized with all legacy list values",
    );
  });

  await test("formdata-malformed-structured-addon-json-400", async () => {
    const formData = duesseldorfCleaningFormData();
    formData.set("selectedAddons", '["Fenster- und Glasflächen"');
    const postsBefore = calls.filter(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    ).length;
    const result = await submitFormData(formData);
    assert(
      result.response.status === 400
      && result.body.code === "VALIDATION_ERROR"
      && result.body.fields?.selectedAddons,
      "malformed structured add-on JSON must return a field-level 400",
    );
    const postsAfter = calls.filter(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    ).length;
    assert(postsAfter === postsBefore, "malformed structured add-on JSON must never reach Supabase");
  });

  await test("many-checkbox-fields-201", async () => {
    const result = await submit(validPayload({
      authorizationConfirmed: true,
      callbackWanted: true,
      cleaningRequested: true,
      disposalRequested: true,
      handoverFileRequested: true,
      hasOffer: true,
      hasPhotos: true,
      isSensitiveCase: false,
      recurringInterest: true,
      referredPersonConsentConfirmed: true,
      whatsappPreferred: true,
    }));
    assert(result.response.status === 201 && result.body.ok === true, "many legitimate checkbox fields must return 201");
  });

  await test("payload-exactly-at-limit-201", async () => {
    const payload = payloadAtNormalizedLimit();
    const { context } = request(payload);
    const normalized = normalizeLeadPayload(payload, context.request);
    const normalizedCount = countPayloadFields(normalized);
    assert(normalizedCount === MAX_PAYLOAD_FIELDS, "exact-limit fixture must contain exactly the normalized limit");
    const result = await submit(payload);
    assert(result.response.status === 201 && result.body.ok === true, "payload exactly at the normalized limit must return 201");
    metrics.normalizedFieldLimit = MAX_PAYLOAD_FIELDS;
  });

  await test("payload-above-limit-de-400", async () => {
    const payload = payloadAtNormalizedLimit(true);
    delete payload.phone;
    assert(countPayloadFields(payload) === MAX_PAYLOAD_FIELDS + 1, "over-limit fixture must exceed the normalized limit by one");
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    const result = await submit(payload, { acceptLanguage: "de-DE" });
    const insertCallsAfter = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    assert(result.response.status === 400, "payload above the normalized limit must return 400");
    assert(result.body.fields?.form === "Die Anfrage konnte nicht verarbeitet werden, weil zu viele einzelne Felder übertragen wurden.", "German over-limit message must be exact");
    assert(insertCallsAfter === insertCallsBefore, "over-limit payload must not reach Supabase");
  });

  await test("payload-above-limit-en-400", async () => {
    const result = await submit(payloadAtNormalizedLimit(true), { acceptLanguage: "en-US" });
    assert(result.response.status === 400, "English over-limit payload must return 400");
    assert(result.body.fields?.form === "The request could not be processed because too many individual fields were submitted.", "English over-limit message must be exact");
  });

  await test("unknown-top-level-field-400", async () => {
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    const result = await submit(validPayload({ unexpectedInternalState: "synthetic" }));
    assert(result.response.status === 400 && result.body.code === "UNSUPPORTED_FIELDS", "unknown top-level field must return 400");
    assert(result.body.unsupportedFields?.[0] === "unexpectedInternalState", "response must expose only the safe unsupported field path");
    assert(calls.filter((call) => call.url.includes("/rest/v1/bookings")).length === insertCallsBefore, "unknown field must not reach Supabase");
  });

  await test("unknown-nested-field-400", async () => {
    const result = await submit(validPayload({ details: { configuration: { unexpectedNestedState: true } } }));
    assert(result.response.status === 400 && result.body.code === "UNSUPPORTED_FIELDS", "unknown nested field must return 400");
    assert(result.body.unsupportedFields?.[0] === "details.configuration.unexpectedNestedState", "nested unknown path must be safe and precise");
  });

  await test("regensburg-moving-context-formdata-201", async () => {
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    const formData = new FormData();
    const details = {
      contact: { fullName: "Synthetic Moving Test", email: "synthetic@example.com", phone: "0000000", callbackPreference: "email", notes: "Synthetischer Umzugstest ohne Kundendaten." },
      service: { type: "Umzug", source: "seo", entryPoint: "/kontakt?source=seo&location=regensburg&service=umzug&intent=umzug-anfrage&priority=p1", regionPreset: "regensburg" },
      configuration: {
        requestContext: "professional_request", leadType: "professional_request", sourcePage: "/kontakt",
        landingPage: "/kontakt?source=seo&location=regensburg&service=umzug&intent=umzug-anfrage&priority=p1",
        location: "Regensburg", city: "Regensburg", startLocation: "Regensburg", destinationLocation: "Nürnberg", desiredDate: "August 2099",
        scope: "2 Zimmer, synthetischer Test", selectedAddons: ["reinigung", "entrümpelung", "möbelmontage"],
        message: "Synthetischer Umzugstest ohne Kundendaten.", preferredContactMethod: "email", privacyConsent: true,
        rawFields: { startLocation: "Regensburg", destinationLocation: "Nürnberg", desiredDate: "August 2099", scope: "2 Zimmer, synthetischer Test", selectedAddons: ["reinigung", "entrümpelung", "möbelmontage"], entryPage: "/kontakt", locale: "de" },
      },
      metadata: { createdAt: "2026-07-31T12:00:00.000Z", intakeVersion: "professional-request-1.0.0", locale: "de", source: "seo", clientContext: { source: "seo", entryPoint: "/kontakt", landingPage: "/kontakt", campaign: "", locale: "de" } },
    };
    for (const [key, value] of Object.entries({
      type: "professional_request", lead_type: "professional_request", leadSource: "seo", source: "seo",
      sourceComponent: "ProfessionalRequestForm", sourcePage: "/kontakt", landingPage: "/kontakt", service: "Umzug",
      serviceCategory: "umzug", intent: "umzug-anfrage", name: "Synthetic Moving Test", email: "synthetic@example.com",
      phone: "0000000", preferredContactMethod: "email", startLocation: "Regensburg", destinationLocation: "Nürnberg",
      desiredDate: "August 2099",
      scope: "2 Zimmer, synthetischer Test", selectedAddons: "reinigung, entrümpelung, möbelmontage",
      message: "Synthetischer Umzugstest ohne Kundendaten.", privacyConsent: "true", timestamp: "2026-07-31T12:00:00.000Z",
    })) formData.set(key, value);
    formData.set("upgrades", JSON.stringify(["reinigung", "entrümpelung", "möbelmontage"]));
    formData.set("details", JSON.stringify(details));
    const result = await submitFormData(formData);
    const insertCallsAfter = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    assert(result.response.status === 201 && result.body.ok === true, "exact Regensburg moving context must return 201");
    assert(insertCallsAfter === insertCallsBefore + 1, "exact Regensburg moving context must insert exactly once");
    const inserted = JSON.parse(calls.filter((call) => call.url.includes("/rest/v1/bookings")).at(-1).body)[0];
    assert(inserted.details.configuration.rawFields.destinationLocation === "Nürnberg", "legitimate nested moving fields must be retained");
    assert(inserted.upgrades.length === 3, "all selected moving add-ons must be retained");
    assert(inserted.details.configuration.selectedAddons.includes("Möbelmontage"), "known add-ons must be stored with their canonical policy label");
  });

  await test("canonical-central-fields-and-aliases", async () => {
    const normalized = normalizeLeadPayload({
      formType: "professional_request",
      entryPage: "/kontakt?location=regensburg&service=klaviertransport",
      serviceId: "klaviertransport",
      serviceLabel: "Klaviertransport",
      location: "regensburg",
      locationLabel: "Regensburg",
      itemDescription: "Synthetic upright piano",
      dimensions: "145 × 60 × 120 cm",
      weight: "240 kg",
      instrumentType: "Klavier",
      stairs: "12 Stufen",
      accessWidth: "92 cm",
      vehicleDistance: "18 m",
      accessPath: "Innenhof",
      condition: "gebraucht",
      windowCount: "8",
      fillLevel: "halbvoll",
    }, new Request("https://www.floxant.de/kontakt"));
    assert(normalized.type === "professional_request", "formType alias must normalize to type");
    assert(normalized.entryPoint.startsWith("/kontakt"), "entryPage alias must normalize to entryPoint");
    assert(normalized.instrumentType === "Klavier" && normalized.accessWidth === "92 cm", "new central fields must survive contract normalization");
  });

  await test("central-professional-piano-request-201-and-confirmation", async () => {
    const callsBefore = calls.length;
    const result = await submit(validPayload({
      type: "professional_request",
      lead_type: "professional_request",
      service: "klaviertransport",
      serviceId: "klaviertransport",
      serviceLabel: "Manipulierte Leistungsbezeichnung",
      location: "regensburg",
      locationLabel: "Manipulierter Standort",
      phone: "+49 (0) 941 / 12 34-567",
      contactMethod: "whatsapp",
      startLocation: "Regensburg Altstadt",
      destinationLocation: "München Schwabing",
      desiredDate: "August 2099",
      itemDescription: "Synthetic upright piano",
      dimensions: "145 × 60 × 120 cm",
      weight: "240 kg",
      instrumentType: "Klavier",
      stairs: "12 Stufen",
      accessWidth: "92 cm",
      vehicleDistance: "18 m",
      accessPath: "Innenhof",
      details: {
        service: {
          id: "umzug",
          serviceId: "umzug",
          name: "Manipulierter Nested-Service",
          type: "reinigung",
          serviceLabel: "Manipulierter Nested-Service",
          regionPreset: "duesseldorf",
        },
        configuration: {
          requestContext: "professional_request",
          leadType: "professional_request",
          serviceId: "umzug",
          serviceLabel: "Manipulierte Leistungsbezeichnung",
          dashboardLabel: "Manipulierte Leistungsbezeichnung",
          service: "umzug",
          serviceType: "umzug",
          serviceCategory: "cleaning",
          serviceSlug: "umzug",
          requestedService: "umzug",
          formProfile: "moving",
          confirmationEmailVariant: "moving",
          timeframe: "flexibel",
          location: "duesseldorf",
          locationLabel: "Manipulierter Standort",
          region: "duesseldorf",
          regionPreset: "duesseldorf",
          rawFields: {
            instrumentType: "Klavier",
            accessWidth: "92 cm",
            vehicleDistance: "18 m",
            accessPath: "Innenhof",
          },
        },
      },
    }));
    assert(result.response.status === 201 && result.body.ok === true, `allowed central piano request must return 201: ${JSON.stringify(result.body)}`);
    const submissionCalls = calls.slice(callsBefore);
    const insertCall = submissionCalls.find((call) => call.url.includes("/rest/v1/bookings"));
    const inserted = JSON.parse(insertCall.body)[0];
    const normalized = inserted.details.configuration.serviceRequest;
    assert(normalized.serviceId === "klaviertransport" && normalized.serviceLabel === "Klaviertransport", "service identity and label must come from the policy");
    assert(normalized.location === "Regensburg" && normalized.locationLabel === "Regensburg", "the display location must use the trusted policy label when no city or postal code is submitted");
    assert(normalized.item.instrumentType === "Klavier" && normalized.item.weight === "240 kg", "piano item data must be structured");
    assert(normalized.access.stairs === "12 Stufen" && normalized.access.width === "92 cm", "access data must be structured");
    assert(inserted.details.service.id === "klaviertransport" && inserted.details.service.serviceId === "klaviertransport", "nested service IDs must be fully canonical");
    assert(inserted.details.service.name === "Klaviertransport" && inserted.details.service.serviceLabel === "Klaviertransport", "nested service names must be fully canonical");
    assert(inserted.details.service.type === "transport" && inserted.details.service.label === "Klaviertransport" && inserted.details.service.regionPreset === "regensburg", "nested service identity must be fully canonical");
    assert(inserted.details.configuration.serviceId === "klaviertransport" && inserted.details.configuration.service === "klaviertransport", "nested configuration service values must be canonical");
    assert(inserted.details.configuration.serviceCategory === "moving" && inserted.details.configuration.serviceSlug === "klaviertransport" && inserted.details.configuration.requestedService === "klaviertransport", "nested service category and slugs must be canonical");
    assert(inserted.details.configuration.formProfile === "piano" && inserted.details.configuration.confirmationEmailVariant === "piano_transport", "profile and confirmation variant must come from the policy");
    assert(inserted.details.configuration.location === "Regensburg" && inserted.details.configuration.locationId === "regensburg" && inserted.details.configuration.region === "regensburg" && inserted.details.configuration.regionPreset === "regensburg", "display location and canonical region identity must remain separate");
    const resendCalls = submissionCalls.filter((call) => call.url.includes("api.resend.com"));
    assert(resendCalls.length === 2, "internal notification and customer confirmation must both be sent after insert");
    const customerMessage = resendCalls.map((call) => JSON.parse(call.body)).find((message) => message.to?.[0] === "synthetic@example.com");
    assert(customerMessage?.subject === "Ihre Anfrage bei FLOXANT ist eingegangen", "customer confirmation subject must describe an enquiry receipt");
    assert(customerMessage.html.includes("Klaviertransport") && customerMessage.html.includes("Regensburg"), "customer confirmation must use canonical service and location labels");
    assert(customerMessage.html.includes("August 2099") && customerMessage.html.includes("Regensburg Altstadt"), `customer confirmation must include a few important structured facts: ${customerMessage.html}`);
    assert(
      customerMessage.html.includes("synthetic@example.com")
      && customerMessage.html.includes("+49 (0) 941 / 12 34-567")
      && customerMessage.html.includes("WhatsApp"),
      "customer confirmation must repeat the submitted contact routes and preference",
    );
    assert(/Rückfragen/.test(customerMessage.html) && /Besichtigung/.test(customerMessage.html), "customer confirmation must explain that questions or an inspection may be needed");
    assert(/nicht automatisch bestätigt/.test(customerMessage.html), "customer confirmation must distinguish receipt from order or appointment confirmation");
    assert(!customerMessage.html.includes("mock-booking-id") && !/track|versicher/i.test(customerMessage.html), "customer confirmation must contain no request ID, tracking, or insurance wording");
  });

  await test("professional-type-marker-conflicts-400", async () => {
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    for (const conflictingMarkers of [
      { type: "general_request", lead_type: "professional_request" },
      { type: "general_request", lead_type: "general_request" },
      { type: "general_request", lead_type: "general_request", sourceComponent: "ProfessionalRequestForm" },
      {
        type: "professional_request",
        lead_type: "professional_request",
        details: { configuration: { requestContext: "quick_contact" } },
      },
    ]) {
      const result = await submit(validPayload({
        type: "professional_request",
        lead_type: "professional_request",
        service: "umzug",
        serviceId: "umzug",
        location: "regensburg",
        startLocation: "Regensburg",
        destinationLocation: "Nürnberg",
        scope: "Synthetic moving scope",
        desiredDate: "August 2099",
        ...conflictingMarkers,
      }));
      assert(result.response.status === 400 && result.body.fields?.type, "conflicting central type markers must return 400");
    }
    assert(calls.filter((call) => call.url.includes("/rest/v1/bookings")).length === insertCallsBefore, "type downgrades and marker conflicts must never reach Supabase");
  });

  await test("missing-professional-piano-core-field-400", async () => {
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    const result = await submit(validPayload({
      type: "professional_request",
      lead_type: "professional_request",
      service: "klaviertransport",
      serviceId: "klaviertransport",
      location: "regensburg",
      startLocation: "Regensburg",
      destinationLocation: "München",
      dimensions: "145 × 60 × 120 cm",
      desiredDate: "September 2099",
      instrumentType: "",
    }));
    assert(result.response.status === 400 && result.body.fields?.instrumentType, "missing piano instrument type must be rejected from the shared profile");
    assert(calls.filter((call) => call.url.includes("/rest/v1/bookings")).length === insertCallsBefore, "missing professional core fields must not reach Supabase");
  });

  await test("foreign-professional-upgrade-400", async () => {
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    const result = await submit(validPayload({
      type: "professional_request",
      lead_type: "professional_request",
      service: "umzug",
      serviceId: "umzug",
      location: "regensburg",
      startLocation: "Regensburg",
      destinationLocation: "Nürnberg",
      scope: "Synthetic moving scope",
      desiredDate: "October 2099",
      selectedAddons: ["Verpackung", "VIP-Sonderleistung"],
      upgrades: ["Verpackung", "VIP-Sonderleistung"],
    }));
    assert(result.response.status === 400 && result.body.fields?.selectedAddons, "an add-on outside the service policy must be rejected");
    assert(calls.filter((call) => call.url.includes("/rest/v1/bookings")).length === insertCallsBefore, "foreign professional add-ons must not reach Supabase");
  });

  await test("invalid-professional-location-service-combination-400", async () => {
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    const result = await submit(validPayload({
      type: "professional_request",
      lead_type: "professional_request",
      service: "umzug",
      serviceId: "umzug",
      serviceLabel: "Umzug",
      location: "duesseldorf",
      locationLabel: "Düsseldorf",
    }));
    assert(result.response.status === 400 && result.body.fields?.serviceId, "disallowed location-service combination must return a field-level 400");
    assert(calls.filter((call) => call.url.includes("/rest/v1/bookings")).length === insertCallsBefore, "disallowed combination must not reach Supabase");
  });

  await test("manipulated-professional-policy-tokens-400", async () => {
    const insertCallsBefore = calls.filter((call) => call.url.includes("/rest/v1/bookings")).length;
    for (const manipulated of [
      { location: "../regensburg", serviceId: "umzug", expectedField: "location" },
      { location: "regensburg", serviceId: "../../umzug", expectedField: "serviceId" },
    ]) {
      const result = await submit(validPayload({
        type: "professional_request",
        lead_type: "professional_request",
        service: "umzug",
        serviceId: manipulated.serviceId,
        location: manipulated.location,
      }));
      assert(result.response.status === 400 && result.body.fields?.[manipulated.expectedField], "path-like policy tokens must receive a field-level 400 before normalization");
    }
    assert(calls.filter((call) => call.url.includes("/rest/v1/bookings")).length === insertCallsBefore, "path-like policy tokens must never reach Supabase");
  });

  await test("professional-contact-method-required-400", async () => {
    const postsBefore = calls.filter(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    ).length;
    const result = await submit(professionalPayload("reinigung", "duesseldorf", {
      cityOrZip: "Düsseldorf",
      objectType: "Wohnung",
      areaSize: "85 m²",
      scope: "Wohnräume reinigen",
      contactMethod: undefined,
    }));
    assert(result.response.status === 400 && result.body.fields?.contactMethod, "professional requests must select a preferred contact route");
    assert(
      calls.filter((call) => call.url.includes("/rest/v1/bookings") && call.method === "POST").length === postsBefore,
      "a professional request without contact route must not insert",
    );
  });

  await test("professional-preferred-route-needs-matching-contact-field-400", async () => {
    const cleaningFields = {
      cityOrZip: "Düsseldorf",
      objectType: "Wohnung",
      areaSize: "85 m²",
      scope: "Wohnräume reinigen",
    };
    const emailMissing = await submit(professionalPayload("reinigung", "duesseldorf", {
      ...cleaningFields,
      email: "",
      phone: "+49 (0) 211 / 12 34-567",
      contactMethod: "email",
    }));
    assert(emailMissing.response.status === 400 && emailMissing.body.fields?.email, "preferred email must require a valid email address");

    const phoneMissing = await submit(professionalPayload("reinigung", "duesseldorf", {
      ...cleaningFields,
      email: "synthetic@example.com",
      phone: "",
      contactMethod: "telefon",
    }));
    assert(phoneMissing.response.status === 400 && phoneMissing.body.fields?.phone, "preferred phone must require a valid phone number");
  });

  await test("professional-contact-method-conflicts-400-and-aliases-pass", async () => {
    const cleaningFields = {
      cityOrZip: "Düsseldorf",
      objectType: "Wohnung",
      areaSize: "85 m²",
      scope: "Wohnräume reinigen",
      phone: "+49 (0) 211 / 12 34-567",
    };
    const conflict = await submit(professionalPayload("reinigung", "duesseldorf", {
      ...cleaningFields,
      preferredContactMethod: "email",
      contactMethod: "telefon",
    }));
    assert(
      conflict.response.status === 400
      && conflict.body.code === "VALIDATION_ERROR"
      && conflict.body.fields?.contactMethod,
      "contradictory professional contact routes must return a normal field-level 400",
    );

    const equivalentAliases = await submit(professionalPayload("reinigung", "duesseldorf", {
      ...cleaningFields,
      preferredContactMethod: "mail",
      contactMethod: "email",
    }));
    assert(equivalentAliases.response.status === 201 && equivalentAliases.body.ok === true, "alias-equivalent professional contact routes must be accepted");
    const inserted = JSON.parse(calls.filter(
      (call) => call.url.includes("/rest/v1/bookings") && call.method === "POST",
    ).at(-1).body)[0];
    assert(
      inserted.details.contact.callbackPreference === "email"
      && inserted.details.configuration.preferredContactMethod === "email",
      "alias-equivalent contact routes must persist canonically",
    );
  });

  await test("legacy-request-without-contact-method-remains-201", async () => {
    const withoutMethod = await submit(validPayload({ contactMethod: undefined, preferredContactMethod: undefined }));
    const directMethodOnly = await submit(validPayload({ contactMethod: "mail", preferredContactMethod: undefined }));
    assert(
      withoutMethod.response.status === 201
      && withoutMethod.body.ok === true
      && directMethodOnly.response.status === 201
      && directMethodOnly.body.ok === true,
      "legacy request payloads must remain compatible without preferredContactMethod",
    );
  });

  await test("legacy-explicit-contact-route-needs-matching-field", async () => {
    const preferredEmailWithoutEmail = await submit(validPayload({
      email: "",
      phone: "+49 (0) 211 / 12 34-567",
      preferredContactMethod: "email",
    }));
    const preferredPhoneWithoutPhone = await submit(validPayload({
      email: "synthetic@example.com",
      phone: "",
      contactMethod: "telefon",
    }));
    const matchingPhone = await submit(validPayload({
      email: "",
      phone: "+49 (0) 211 / 12 34-567",
      contactMethod: "telefon",
    }));
    assert(
      preferredEmailWithoutEmail.response.status === 400
      && preferredEmailWithoutEmail.body.fields?.email,
      "an explicit legacy email preference must require an email address",
    );
    assert(
      preferredPhoneWithoutPhone.response.status === 400
      && preferredPhoneWithoutPhone.body.fields?.phone,
      "an explicit legacy phone preference must require a phone number",
    );
    assert(
      matchingPhone.response.status === 201 && matchingPhone.body.ok === true,
      "a legacy request with matching preferred contact data must remain valid",
    );
  });

  await test("valid-json-201", async () => {
    const result = await submit(validPayload());
    assert(result.response.status === 201, "valid JSON must return 201");
    assert(result.body.ok === true && result.body.bookingId === "mock-booking-id" && result.body.requestId, "success response contract");
    assert(Object.keys(result.body).sort().join(",") === "bookingId,ok,requestId", "success response must contain only public fields");
  });

  for (const fixture of [
    {
      name: "valid-cleaning-request-201",
      service: "reinigung",
      expectedService: "reinigung",
      extra: { objectType: "Wohnung", areaSize: "85 m²", cleaningFrequency: "einmalig" },
    },
    {
      name: "valid-office-cleaning-request-201",
      service: "bueroreinigung",
      expectedService: "bueroreinigung",
      extra: { objectType: "Büro", areaSize: "320 m²", cleaningFrequency: "wöchentlich", company: "Synthetic Office" },
    },
    {
      name: "valid-practice-cleaning-request-201",
      service: "praxisreinigung",
      expectedService: "praxisreinigung",
      extra: { objectType: "Praxis", preferredCleaningTime: "nach 18 Uhr", company: "Synthetic Practice" },
    },
    {
      name: "valid-window-cleaning-request-201",
      service: "fensterreinigung",
      expectedService: "fensterreinigung",
      extra: { objectType: "Gewerbe", serviceScope: "Fenster innen und außen", areaSize: "24 Fenster" },
    },
  ]) {
    await test(fixture.name, async () => {
      const result = await submit(validPayload({
        service: fixture.service,
        serviceCategory: "reinigung",
        cityOrZip: "40210 Düsseldorf",
        leadSource: "synthetic_cleaning_test",
        sourcePage: `/duesseldorf/${fixture.expectedService}`,
        message: "Synthetische Testanfrage ohne echte Übermittlung.",
        ...fixture.extra,
      }));
      assert(result.response.status === 201 && result.body.ok === true, `${fixture.name} must return 201`);
      const lastInsert = [...calls].reverse().find((call) => call.url.includes("/rest/v1/bookings"));
      const insertedBooking = JSON.parse(lastInsert.body)[0];
      const normalized = insertedBooking.details?.configuration?.cleaningRequest;
      assert(normalized?.service === fixture.expectedService, `${fixture.name} must normalize its cleaning service`);
      assert(normalized?.location === "40210 Düsseldorf", `${fixture.name} must retain the Düsseldorf location`);
      assert(normalized?.source === "synthetic_cleaning_test", `${fixture.name} must retain its source`);
      assert(normalized?.entryPage === `/duesseldorf/${fixture.expectedService}`, `${fixture.name} must retain its entry page`);
      assert(insertedBooking.details?.configuration?.serviceRequest?.group === "cleaning", `${fixture.name} must receive the common cleaning request shape`);
    });
  }

  await test("valid-professional-moving-request-201", async () => {
    const result = await submit(validPayload({
      service: "umzug",
      serviceCategory: "umzug",
      leadSource: "synthetic_professional_test",
      sourcePage: "/kontakt",
      startLocation: "Regensburg",
      destinationLocation: "München",
      desiredDate: "August 2099",
      scope: "Synthetic three-room move",
      startFloor: "2",
      destinationFloor: "1",
      startElevator: "nein",
      destinationElevator: "ja",
      selectedAddons: "Verpackung, Montage",
    }));
    assert(result.response.status === 201 && result.body.ok === true, "valid professional moving request must return 201");
    const lastInsert = [...calls].reverse().find((call) => call.url.includes("/rest/v1/bookings"));
    const insertedBooking = JSON.parse(lastInsert.body)[0];
    const normalized = insertedBooking.details?.configuration?.serviceRequest;
    assert(normalized?.group === "moving", "moving request group must be normalized");
    assert(normalized?.route?.startLocation === "Regensburg", "moving start location must be retained");
    assert(normalized?.route?.destinationLocation === "München", "moving destination must be retained");
    assert(normalized?.route?.startElevator === "nein", "moving access details must be retained");
  });

  await test("valid-professional-clearance-request-201", async () => {
    const result = await submit(validPayload({
      service: "entruempelung",
      serviceCategory: "entruempelung",
      leadSource: "synthetic_professional_test",
      sourcePage: "/kontakt",
      cityOrZip: "93047 Regensburg",
      objectType: "Wohnung",
      areaSize: "ungefähr 70 m²",
      floor: "3",
      elevator: "nein",
      scope: "Synthetic furniture and household items",
      desiredDate: "September 2099",
    }));
    assert(result.response.status === 201 && result.body.ok === true, "valid professional clearance request must return 201");
    const lastInsert = [...calls].reverse().find((call) => call.url.includes("/rest/v1/bookings"));
    const insertedBooking = JSON.parse(lastInsert.body)[0];
    const normalized = insertedBooking.details?.configuration?.serviceRequest;
    assert(normalized?.group === "clearance", "clearance request group must be normalized");
    assert(normalized?.location === "93047 Regensburg", "clearance location must be retained");
    assert(normalized?.object?.type === "Wohnung", "clearance object type must be retained");
    assert(normalized?.object?.floor === "3", "clearance floor must be retained");
    assert(normalized?.remainingItems.includes("Synthetic furniture"), "clearance scope must be retained");
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

  await test("calculator-details-schema-201", async () => {
    const umzug = {
      areaM2: 95,
      rooms: 4,
      fromFloor: 2,
      toFloor: 3,
      hasElevatorFrom: false,
      hasElevatorTo: true,
      boxesCount: 35,
      furnitureList: ["Synthetic table", "Synthetic cabinet"],
      heavyItems: ["Synthetic piano"],
      packingService: true,
      unpackingService: false,
      disassemblyService: true,
      assemblyService: true,
      kitchenAssembly: false,
      walkingDistanceFrom: 20,
      walkingDistanceTo: 15,
      noParkingZoneFrom: true,
      noParkingZoneTo: false,
      timeConstraint: "flexibel",
      isPartialMove: false,
      fromAddressDetailed: "Synthetic start",
      toAddressDetailed: "Synthetic destination",
      distanceKm: 120,
      narrowStairsFrom: false,
      narrowStairsTo: false,
      courtyardAccessFrom: true,
      courtyardAccessTo: false,
      uncertainVolume: false,
      freeTextNote: "Synthetic calculator note",
    };
    const result = await submit({
      name: "Synthetic Calculator Full",
      phone: "+49123456789",
      service: "umzug",
      privacyConsent: true,
      timestamp: new Date().toISOString(),
      details: {
        contact: { fullName: "Synthetic Calculator Full", phone: "+49123456789", callbackPreference: "jederzeit" },
        service: { type: "umzug", source: "calculator_lead", entryPoint: "/rechner" },
        valuation: {
          priceRangeMin: 100,
          priceRangeMax: 200,
          topDrivers: ["Synthetic volume", "Synthetic distance"],
          pricingSignals: {
            serviceType: "umzug",
            primaryFactors: ["Synthetic volume"],
            metrics: umzug,
            calculatorMode: "advanced",
            calculatorInputs: { umzug },
          },
        },
        configuration: {
          requestContext: "calculator_lead",
          calculatorMode: "advanced",
          callbackTime: "jederzeit",
          wantsPhotosLink: false,
          calculatorInputs: { umzug },
        },
        metadata: { createdAt: new Date().toISOString(), intakeVersion: "calculator-legacy-2.0", source: "calculator_lead" },
      },
    }, { endpoint: "/api/intake" });
    assert(result.response.status === 201 && result.body.ok === true, "full known calculator details must return 201");
  });

  await test("backhaul-selected-offer-schema-201", async () => {
    const selectedOffer = {
      id: "synthetic-offer",
      title: "Synthetic backhaul offer",
      date: "2099-01-01",
      timeWindow: "synthetic window",
      origin: "Synthetic origin",
      destination: "Synthetic destination",
      destinationRadius: "150 km",
      routeAreas: ["Synthetic route"],
      vehicleType: "Synthetic vehicle",
      availableCapacity: "Synthetic capacity",
      priceHint: "Synthetic price hint",
      fairPriceNote: "Synthetic fair price note",
      status: "active",
      adminNote: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await submit(validPayload({
      service: "leerfahrt",
      details: {
        configuration: { requestContext: "backhaul_inquiry", selectedOffer },
        metadata: { source: "backhaul_page", intakeVersion: "1.2.0" },
      },
    }));
    assert(result.response.status === 201 && result.body.ok === true, "known selected backhaul offer must return 201");
  });

  await test("insert-failure-500", async () => {
    mode.insertFailure = true;
    const result = await submit(validPayload());
    mode.insertFailure = false;
    assert(result.response.status === 500 && result.body.code === "SUBMISSION_FAILED", "database failure must return 500");
    assert(!JSON.stringify(result.body).includes("database"), "database detail must stay private");
  });

  await test("resend-failure-still-201", async () => {
    const callsBefore = calls.length;
    mode.resendFailure = true;
    const result = await submit(validPayload());
    mode.resendFailure = false;
    assert(result.response.status === 201 && result.body.ok === true, "Resend failure must not undo booking success");
    const submissionCalls = calls.slice(callsBefore);
    const insertIndex = submissionCalls.findIndex((call) => call.url.includes("/rest/v1/bookings"));
    const resendIndex = submissionCalls.findIndex((call) => call.url.includes("api.resend.com"));
    assert(insertIndex >= 0 && resendIndex > insertIndex, "mocked Supabase insert must finish before the failing Resend notification");
  });

  await test("resend-timeout-still-201", async () => {
    const callsBefore = calls.length;
    const startedAt = Date.now();
    mode.resendHang = true;
    const result = await submit(validPayload());
    mode.resendHang = false;
    const elapsedMs = Date.now() - startedAt;
    assert(result.response.status === 201 && result.body.ok === true, "a timed-out Resend request must not undo the stored lead");
    assert(elapsedMs >= 3_500 && elapsedMs < 6_000, "parallel Resend deliveries must abort within the short server timeout");
    const submissionCalls = calls.slice(callsBefore);
    const insertIndex = submissionCalls.findIndex((call) => call.url.includes("/rest/v1/bookings"));
    const resendCalls = submissionCalls.filter((call) => call.url.includes("api.resend.com"));
    assert(insertIndex >= 0 && resendCalls.length === 2, "both post-insert email attempts must use the timeout-safe path");
    assert(resendCalls.every((call) => call.body && call.method === "POST"), "timed-out email attempts must preserve the Resend request contract");
  });

  await test("no-pii-in-logs", async () => {
    const sentinelName = "PII-SENTINEL-NAME";
    const sentinelEmail = "pii-sentinel@example.com";
    const success = await submit(validPayload({ name: sentinelName, email: sentinelEmail }));
    const sentLog = serverInfoLogs.at(-1);
    assert(success.response.status === 201 && sentLog?.[0] === "Cloudflare lead notification sent", "successful notification must emit an operational info log");
    assert(
      Object.keys(sentLog?.[1] || {}).sort().join(",") === "bookingId,deliveryCount,requestId,status"
      && sentLog[1].requestId === success.body.requestId
      && sentLog[1].bookingId === success.body.bookingId
      && sentLog[1].status === "sent"
      && sentLog[1].deliveryCount === 2,
      "notification success log must contain only non-PII delivery evidence",
    );
    mode.insertFailure = true;
    await submit(validPayload({ name: sentinelName, email: sentinelEmail }));
    mode.insertFailure = false;
    const logText = JSON.stringify([...serverLogs, ...serverInfoLogs]);
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

  await test("bookings-insert-schema-compatible", async () => {
    const allowedColumns = new Set([
      "id", "name", "email", "phone", "service", "timestamp", "status", "upgrades", "details", "file_url", "file_urls",
    ]);
    const inserts = calls.filter((call) => call.url.includes("/rest/v1/bookings") && typeof call.body === "string");
    assert(inserts.length > 0, "mocked Supabase inserts must exist");
    for (const insert of inserts) {
      const rows = JSON.parse(insert.body);
      const columns = Object.keys(rows[0] || {});
      assert(columns.every((column) => allowedColumns.has(column)), `insert contains an unsupported bookings column: ${columns.join(", ")}`);
    }
  });

  await test("empty-optional-formdata-fields-pruned", async () => {
    let capturedBody;
    globalThis.fetch = async (_url, init = {}) => {
      capturedBody = init.body;
      return new Response(JSON.stringify({ ok: true, requestId: "form-prune-request", bookingId: "form-prune-booking" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    };
    const formData = new FormData();
    formData.set("name", "  Synthetic Pruned Form  ");
    formData.set("email", "pruned-form@example.com");
    formData.set("phone", "   ");
    formData.set("budget", "");
    formData.set("service", "reinigung");
    formData.set("privacyConsent", "true");
    formData.set("details", JSON.stringify({ contact: { phone: "", notes: "" }, configuration: { selectedAddons: [] }, source: " synthetic " }));
    const response = await bookingFetch("/api/bookings?prune-formdata", { method: "POST", body: formData });
    assert(response.status === 201 && capturedBody instanceof FormData, "normalized FormData request must remain FormData");
    assert(!capturedBody.has("phone") && !capturedBody.has("budget"), "empty optional FormData fields must be removed");
    assert(capturedBody.get("name") === "Synthetic Pruned Form", "FormData strings must be trimmed");
    const details = JSON.parse(String(capturedBody.get("details")));
    assert(!details.contact && !details.configuration && details.source === "synthetic", "nested empty FormData JSON must be pruned");
    globalThis.fetch = serverFetch;
  });

  await test("empty-optional-json-fields-pruned", async () => {
    let capturedBody = "";
    globalThis.fetch = async (_url, init = {}) => {
      capturedBody = String(init.body || "");
      return new Response(JSON.stringify({ ok: true, requestId: "json-prune-request", bookingId: "json-prune-booking" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    };
    const response = await bookingFetch("/api/intake?prune-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload({ phone: "", details: { contact: { notes: "" }, configuration: { openItems: [] } } })),
    });
    const normalized = JSON.parse(capturedBody);
    assert(response.status === 201, "normalized JSON request must remain compatible");
    assert(!Object.hasOwn(normalized, "phone") && !Object.hasOwn(normalized, "details"), "empty optional JSON fields must be removed recursively");
    globalThis.fetch = serverFetch;
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
    globalThis.fetch = serverFetch;
  });

  await test("automatic-idempotency-survives-new-body-network-retry", async () => {
    const capturedKeys = [];
    let responseIndex = 0;
    globalThis.fetch = async (_url, init = {}) => {
      capturedKeys.push(new Headers(init.headers).get("Idempotency-Key"));
      responseIndex += 1;
      if (responseIndex <= 2) throw new TypeError("synthetic lost response");
      return new Response(JSON.stringify({ ok: true, requestId: `auto-${responseIndex}`, bookingId: `booking-${responseIndex}` }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    };
    const body = (message, timestamp, source) => {
      const formData = new FormData();
      formData.set("name", "Automatic Retry");
      formData.set("email", "retry@example.com");
      formData.set("message", message);
      formData.set("privacyConsent", "true");
      formData.set("timestamp", timestamp);
      formData.set("source", source);
      return formData;
    };
    const first = await bookingFetch("/api/bookings?automatic-retry", {
      method: "POST",
      body: body("same business request", "2026-08-03T10:00:00.000Z", "first-source"),
    });
    const retry = await bookingFetch("/api/bookings?automatic-retry", {
      method: "POST",
      body: body("same business request", "2026-08-03T10:01:00.000Z", "changed-attribution"),
    });
    const changed = await bookingFetch("/api/bookings?automatic-retry", {
      method: "POST",
      body: body("changed business request", "2026-08-03T10:02:00.000Z", "first-source"),
    });
    const recovered = await bookingFetch("/api/bookings?automatic-retry", {
      method: "POST",
      body: body("same business request", "2026-08-03T10:03:00.000Z", "third-source"),
    });
    assert(first.status === 500 && retry.status === 500 && changed.status === 201 && recovered.status === 201, "network retries and changed requests must preserve the response contract");
    assert(capturedKeys.every((key) => /^booking_auto:\d{10,16}:[0-9a-f-]{36}$/i.test(key || "")), "every shared-adapter POST must receive a valid durable idempotency key");
    assert(capturedKeys[0] === capturedKeys[1] && capturedKeys[1] === capturedKeys[3], "new bodies with identical business data must reuse the lost-response key");
    assert(capturedKeys[2] !== capturedKeys[0], "materially changed business data must receive a new key");
    globalThis.fetch = serverFetch;
  });

  await test("english-client-error-keeps-reference-separate", async () => {
    globalThis.document = { documentElement: { lang: "en" } };
    globalThis.fetch = async () => new Response(JSON.stringify({ ok: false, code: "CONFIGURATION_ERROR", requestId: "english-reference" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
    const response = await bookingFetch("/api/bookings?english", { method: "POST", body: new FormData() });
    const body = await response.json();
    assert(
      response.status === 503
      && body.requestId === "english-reference"
      && !body.error.includes("Reference:")
      && !body.error.includes("english-reference"),
      "English technical errors must keep the reference separate for one UI rendering",
    );
    delete globalThis.document;
    globalThis.fetch = serverFetch;
  });

  await test("network-error-keeps-safe-client-contract", async () => {
    globalThis.fetch = async () => {
      throw new TypeError("synthetic network failure");
    };
    const response = await bookingFetch("/api/bookings?network-error", {
      method: "POST",
      body: new FormData(),
    });
    const body = await response.json();
    assert(response.status === 500 && body.code === "NETWORK_ERROR", "network failures must keep a distinguishable safe client code");
    assert(!body.requestId && !/synthetic|TypeError/.test(body.error), "network errors must expose no fake reference or internal exception");
    globalThis.fetch = serverFetch;
  });

  await test("upload-not-counted-as-payload-field", async () => {
    globalThis.fetch = async (url, init = {}) => {
      const target = String(url);
      calls.push({ url: target, method: init.method || "GET", headers: init.headers || {} });
      if (target.includes("/storage/v1/object/")) return new Response("{}", { status: 201 });
      if (target.includes("/rest/v1/bookings")) return new Response(JSON.stringify([{ id: "upload-booking" }]), { status: 201, headers: { "Content-Type": "application/json" } });
      if (target.includes("api.resend.com")) return new Response("{}", { status: 200 });
      throw new Error("unexpected upload target");
    };
    const limitPayload = payloadAtNormalizedLimit();
    const formData = new FormData();
    formData.set("name", limitPayload.name);
    formData.set("email", limitPayload.email);
    formData.set("service", limitPayload.service);
    formData.set("privacyConsent", "true");
    formData.set("timestamp", limitPayload.timestamp);
    formData.set("details", JSON.stringify(limitPayload.details));
    formData.set("offerFile", new File([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37])], "synthetic.pdf", { type: "application/pdf" }));
    const result = await submitFormData(formData);
    assert(result.response.status === 201, "valid PDF upload alongside an exact-limit payload must remain compatible");
    assert(calls.some((call) => call.url.includes("/storage/v1/object/uploads/")), "upload endpoint must be called");
  });

  await test("central-file-count-limit-400", async () => {
    const formData = uploadFormData();
    for (let index = 0; index < 6; index += 1) {
      formData.append("photo", syntheticPdf(8, `synthetic-${index}.pdf`));
    }
    const uploadCallsBefore = calls.filter((call) => call.url.includes("/storage/v1/object/")).length;
    const result = await submitFormData(formData);
    assert(result.response.status === 400 && result.body.fields?.files.includes("5"), "more than five files must be rejected");
    assert(calls.filter((call) => call.url.includes("/storage/v1/object/")).length === uploadCallsBefore, "file-count rejection must happen before upload");
  });

  await test("central-per-file-size-limit-400", async () => {
    const formData = uploadFormData();
    formData.append("photo", syntheticPdf((8 * 1024 * 1024) + 1, "synthetic-too-large.pdf"));
    const result = await submitFormData(formData);
    assert(result.response.status === 400 && result.body.fields?.files.includes("8 MiB"), "a file larger than eight MiB must be rejected");
  });

  await test("central-total-file-size-limit-400", async () => {
    const formData = uploadFormData();
    for (let index = 0; index < 4; index += 1) {
      formData.append("files", syntheticPdf((6 * 1024 * 1024) + 1, `synthetic-total-${index}.pdf`));
    }
    const result = await submitFormData(formData);
    assert(result.response.status === 400 && result.body.fields?.files.includes("24 MiB"), "files larger than 24 MiB in total must be rejected");
  });

  await test("active-clients-use-contract-adapter", async () => {
    for (const file of activeClientFiles) {
      const source = readFileSync(file, "utf8");
      const delegatesToCentralOwner = source.includes("<ProfessionalRequestForm");
      assert(source.includes("bookingFetch(") || delegatesToCentralOwner, `${file} must use bookingFetch or delegate to ProfessionalRequestForm`);
      assert(!/fetch\("\/api\/(bookings|intake)/.test(source), `${file} must not bypass the response contract`);
      if (delegatesToCentralOwner) {
        assert(!/bookingFetch\("\/api\/(bookings|intake)/.test(source), `${file} must not duplicate the central submit owner`);
        continue;
      }
      assert(/bookingFetch\("\/api\/(bookings|intake)/.test(source), `${file} must target an active intake endpoint`);

      const programmaticFields = [...source.matchAll(/\.(?:append|set)\(\s*["']([^"']+)["']/g)].map((match) => match[1]);
      const readsNativeForm = [...source.matchAll(/new FormData\(([^)]*)\)/g)].some((match) => match[1].trim());
      const nativeFields = readsNativeForm
        ? [...source.matchAll(/\bname=["']([^"']+)["']/g)].map((match) => match[1])
        : [];
      const literalFields = [...programmaticFields, ...nativeFields];
      const unsupportedFields = [...new Set(literalFields)].filter(
        (field) => !ALLOWED_TOP_LEVEL_FIELDS.has(field) && !ALLOWED_FILE_FIELDS.has(field),
      );
      assert(unsupportedFields.length === 0, `${file} has unrecognized submitted fields: ${unsupportedFields.join(", ")}`);
    }
    metrics.activeSubmitters = activeClientFiles.length;
  });

  originalConsoleError(JSON.stringify({ passed: true, cases: results, metrics, mockedExternalCalls: calls.length }, null, 2));
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
  console.info = originalConsoleInfo;
  if (globalThis.document?.documentElement?.lang === "en") delete globalThis.document;
}
