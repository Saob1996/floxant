import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { File } from "node:buffer";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "functions", "_lib", "lead-handler.js"), "utf8");
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const { handleLeadSubmission } = await import(moduleUrl);

const env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test-only-service-key",
  RESEND_API_KEY: "test-only-resend-key",
  INTAKE_NOTIFICATION_EMAIL: "internal@example.test",
  RESEND_FROM_EMAIL: "FLOXANT Website <website@example.test>",
};

function jsonRequest(payload, origin = "https://www.floxant.de") {
  return new Request("https://www.floxant.de/api/bookings", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

const originalFetch = globalThis.fetch;
const originalError = console.error;
const fetchCalls = [];
globalThis.fetch = async (url, init = {}) => {
  fetchCalls.push({ url: String(url), init });
  if (String(url).includes("/rest/v1/bookings")) {
    return new Response(JSON.stringify([{ id: "mock-booking-id" }]), { status: 201, headers: { "Content-Type": "application/json" } });
  }
  if (String(url).includes("api.resend.com")) return new Response(JSON.stringify({ id: "mock-email-id" }), { status: 200 });
  if (String(url).includes("/storage/v1/object/")) return new Response(null, { status: 201 });
  throw new Error(`Unexpected mocked fetch target: ${url}`);
};

try {
  const denied = await handleLeadSubmission({ request: jsonRequest({}, "https://other-project.pages.dev"), env });
  assert.equal(denied.status, 403, "arbitrary pages.dev origins must be rejected");

  const honeypot = await handleLeadSubmission({ request: jsonRequest({ companyWebsite: "bot.example", email: "bot@example.test" }), env });
  assert.equal(honeypot.status, 202, "honeypot must terminate without persistence");
  assert.equal(fetchCalls.length, 0, "honeypot must not trigger Supabase or Resend");

  const tooLong = await handleLeadSubmission({ request: jsonRequest({ name: "A".repeat(161), email: "safe@example.test" }), env });
  assert.equal(tooLong.status, 413, "server-side text limits must be enforced");

  const realDateNow = Date.now;
  Date.now = () => 100000;
  const tooFast = await handleLeadSubmission({ request: jsonRequest({ name: "Fast Test", email: "fast@example.test", formStartedAt: 99500 }), env });
  Date.now = realDateNow;
  assert.equal(tooFast.status, 400, "minimum submission time must be enforced when supplied");

  const validPayload = {
    name: "Mock Person",
    email: "mock.person@example.test",
    service: "reinigung",
    source: "/en/contact",
    locale: "en",
    language: "en",
    details: "Mock scope without customer data",
    formStartedAt: Date.now() - 5000,
  };
  const accepted = await handleLeadSubmission({ request: jsonRequest(validPayload), env });
  assert.equal(accepted.status, 200);
  const acceptedBody = await accepted.json();
  assert.equal(acceptedBody.success, true);

  const bookingCall = fetchCalls.find((call) => call.url.includes("/rest/v1/bookings"));
  assert.ok(bookingCall, "mock booking insert must be called");
  const booking = JSON.parse(bookingCall.init.body)[0];
  assert.equal(booking.details.metadata.locale, "en", "English locale must be preserved in structured details");

  const emailCall = fetchCalls.find((call) => call.url.includes("api.resend.com"));
  assert.ok(emailCall, "mock Resend call must be called");
  const email = JSON.parse(emailCall.init.body);
  assert.equal(email.reply_to, "mock.person@example.test");
  assert.ok(email.text.includes("Neue FLOXANT-Anfrage"), "notification must include a plain text version");
  assert.ok(!email.subject.includes("Mock Person"), "notification subject must not contain the requester's name");
  assert.ok(emailCall.init.headers["Idempotency-Key"], "notification must use an idempotency key");

  const duplicate = await handleLeadSubmission({ request: jsonRequest(validPayload), env });
  assert.equal(duplicate.status, 409, "short-lived duplicate detection must reject identical payloads");

  const formData = new FormData();
  formData.set("name", "File Test");
  formData.set("email", "file@example.test");
  formData.set("service", "reinigung");
  formData.set("details", "Unique file test");
  formData.set("file", new File(["not a png"], "fake.png", { type: "image/png" }));
  const invalidFile = await handleLeadSubmission({
    request: new Request("https://www.floxant.de/api/bookings", { method: "POST", headers: { Origin: "https://www.floxant.de" }, body: formData }),
    env,
  });
  assert.equal(invalidFile.status, 415, "declared MIME type must match file signature");

  const logged = [];
  console.error = (...args) => logged.push(args);
  globalThis.fetch = async () => new Response(null, { status: 500 });
  const failed = await handleLeadSubmission({
    request: jsonRequest({ name: "Never Log This Name", email: "never-log@example.test", service: "umzug", details: "unique failure" }),
    env,
  });
  assert.equal(failed.status, 502);
  const serializedLogs = JSON.stringify(logged);
  assert.ok(!serializedLogs.includes("Never Log This Name"));
  assert.ok(!serializedLogs.includes("never-log@example.test"));
  assert.ok(!serializedLogs.includes("unique failure"));

  process.stdout.write("Lead-Handler-Sicherheitstest erfolgreich: 9 Mock-Szenarien, 0 echte Requests, 0 echte E-Mails.\n");
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalError;
}
