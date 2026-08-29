#!/usr/bin/env node

import { handleLeadSubmission } from "../functions/_lib/lead-handler.js";

const originalFetch = globalThis.fetch;
const calls = [];
globalThis.fetch = async (url, init = {}) => {
  calls.push({ url: String(url), method: init.method || "GET" });
  if (String(url).includes("/rest/v1/bookings")) {
    return new Response(JSON.stringify([{ id: "cf-test-booking" }]), { status: 201, headers: { "Content-Type": "application/json" } });
  }
  if (String(url).includes("api.resend.com")) {
    return new Response(JSON.stringify({ id: "cf-test-mail" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  if (String(url).includes("/storage/v1/object/")) return new Response("{}", { status: 200 });
  throw new Error(`Unerwarteter Fetch: ${url}`);
};

const env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test-service-role",
  RESEND_API_KEY: "test-resend",
  INTAKE_NOTIFICATION_EMAIL: "lead@example.com",
  RESEND_FROM_EMAIL: "FLOXANT Test <test@example.com>",
};

async function responseBody(request, customEnv = env) {
  const response = await handleLeadSubmission({ request, env: customEnv });
  return { response, body: await response.json() };
}

try {
  const missingConfig = await responseBody(new Request("https://www.floxant.de/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://www.floxant.de" },
    body: JSON.stringify({ name: "Test", email: "test@example.com", service: "umzug" }),
  }), {});
  if (missingConfig.response.status !== 503 || missingConfig.body.success !== false) throw new Error("Fehlende Konfiguration ist nicht sichtbar.");

  const valid = await responseBody(new Request("https://www.floxant.de/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://www.floxant.de" },
    body: JSON.stringify({ name: "Funktion Test", email: "test@example.com", service: "umzug", message: "Testanfrage" }),
  }));
  if (
    !valid.response.ok ||
    !valid.body.success ||
    valid.body.id !== "cf-test-booking" ||
    !calls.some((call) => call.url.includes("api.resend.com"))
  ) {
    throw new Error(`JSON-Lead fehlgeschlagen: ${JSON.stringify(valid.body)}`);
  }

  const formData = new FormData();
  formData.set("name", "Upload Test");
  formData.set("phone", "+49123456789");
  formData.set("service", "angebot_pruefen");
  formData.set("details", JSON.stringify({ service: { type: "angebot_pruefen" }, contact: { fullName: "Upload Test" } }));
  formData.set("offerFile", new File(["%PDF-1.4\n% FLOXANT test fixture\n%%EOF"], "angebot.pdf", { type: "application/pdf" }));
  const upload = await responseBody(new Request("https://www.floxant.de/api/intake", {
    method: "POST",
    headers: { Origin: "https://www.floxant.de" },
    body: formData,
  }));
  if (!upload.response.ok || !upload.body.success || !calls.some((call) => call.url.includes("/storage/v1/object/"))) {
    throw new Error(`FormData-/Upload-Lead fehlgeschlagen: ${JSON.stringify(upload.body)}`);
  }

  const invalid = await responseBody(new Request("https://www.floxant.de/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://www.floxant.de" },
    body: JSON.stringify({ name: "X", email: "ungueltig", service: "umzug" }),
  }));
  if (invalid.response.status !== 400 || invalid.body.success !== false) throw new Error("Validierungsfehler wird nicht sichtbar gemeldet.");

  console.log(JSON.stringify({
    passed: true,
    cases: ["missing-config-visible", "json-lead", "multipart-upload-lead", "validation-visible"],
    mockedExternalCalls: calls.length,
  }, null, 2));
} finally {
  globalThis.fetch = originalFetch;
}
