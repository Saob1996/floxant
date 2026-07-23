const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const generatedAt = new Date().toISOString();
const baseUrl = String(process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const shouldSubmit = process.env.TEST_LEAD_SUBMIT === "true";

const files = {
  bookingsApi: "app/api/bookings/route.ts",
  intakeApi: "app/api/intake/route.ts",
  smartWizard: "components/SmartBookingWizard.tsx",
  offerCheck: "components/OfferCheckForm.tsx",
  cheaperAlternative: "components/CheaperAlternativeForm.tsx",
  contactPage: "app/kontakt/page.tsx",
};

function read(file) {
  const absolute = path.join(root, file);
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : "";
}

function addCheck(checks, name, status, priority, detail, action = "") {
  checks.push({ name, status, priority, detail, action });
}

function statusFromChecks(checks) {
  if (checks.some((item) => item.status === "FAIL")) return "FAIL";
  if (checks.some((item) => item.status === "WARN")) return "WARN";
  return "PASS";
}

function isLocalBaseUrl(url) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(url);
}

async function maybeSubmitLocalTest(checks) {
  if (!shouldSubmit) {
    addCheck(
      checks,
      "optional test submit",
      "PASS",
      "P0",
      "Skipped because TEST_LEAD_SUBMIT is not true. No lead submit was sent.",
      "Use TEST_LEAD_SUBMIT=true only against a local/test BASE_URL."
    );
    return;
  }

  if (!isLocalBaseUrl(baseUrl)) {
    addCheck(
      checks,
      "optional test submit guard",
      "WARN",
      "P0",
      `Refused test submit against non-local BASE_URL ${baseUrl}.`,
      "Run test submits only against localhost or 127.0.0.1."
    );
    return;
  }

  const formData = new FormData();
  formData.set("name", "Test Lead");
  formData.set("contactMethod", "email");
  formData.set("email", "test@example.com");
  formData.set("phone", "");
  formData.set("service", "angebot-pruefen");
  formData.set("city", "duesseldorf");
  formData.set("cityOrZip", "duesseldorf");
  formData.set("message", "Testpayload nicht als echter Auftrag verwenden");
  formData.set("privacyConsent", "true");
  formData.set("companyWebsite", "");
  formData.set("type", "booking_wizard");
  formData.set("leadSource", "lead_delivery_check");
  formData.set("timestamp", new Date().toISOString());

  try {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: "POST",
      body: formData,
    });
    const body = await response.text();
    addCheck(
      checks,
      "optional local test submit",
      response.ok ? "PASS" : "WARN",
      "P0",
      `HTTP ${response.status}; response sample: ${body.slice(0, 180)}`,
      response.ok ? "No action." : "Check local env variables, Supabase test table, and API logs."
    );
  } catch (error) {
    addCheck(
      checks,
      "optional local test submit",
      "WARN",
      "P0",
      `Local test submit failed: ${error.message}`,
      "Check local server and env; no production submit was sent."
    );
  }
}

async function main() {
  const checks = [];
  const bookingsApi = read(files.bookingsApi);
  const intakeApi = read(files.intakeApi);
  const smartWizard = read(files.smartWizard);
  const offerCheck = read(files.offerCheck);
  const cheaperAlternative = read(files.cheaperAlternative);
  const contactPage = read(files.contactPage);

  addCheck(checks, "bookings api exists", bookingsApi ? "PASS" : "FAIL", "P0", files.bookingsApi);
  addCheck(checks, "bookings api POST", /export\s+async\s+function\s+POST/.test(bookingsApi) ? "PASS" : "FAIL", "P0", "POST route handler detected.");
  addCheck(checks, "database insert", /from\(["']bookings["']\)\.insert/.test(bookingsApi) ? "PASS" : "FAIL", "P0", "Supabase bookings insert detected.");
  addCheck(checks, "lead notification", /sendInternalIntakeNotification/.test(bookingsApi) ? "PASS" : "WARN", "P1", "Internal notification hook detected.");
  addCheck(checks, "server validation", /Kontaktangabe fehlt|Name ist zu kurz|Telefonnummer ist zu kurz|E-Mail-Adresse/.test(bookingsApi) ? "PASS" : "FAIL", "P0", "Server validation text detected.");
  addCheck(checks, "honeypot", /companyWebsite|honeypotValue|Spam-Schutz/.test(bookingsApi) ? "PASS" : "WARN", "P1", "Honeypot/spam guard detected.");
  addCheck(checks, "privacy payload", /privacyConsent|privacy/.test(bookingsApi) ? "PASS" : "WARN", "P1", "Privacy consent payload detected.");
  addCheck(checks, "friendly api error", /Die Anfrage konnte gerade nicht|Bitte versuchen Sie es erneut|WhatsApp/.test(bookingsApi) ? "PASS" : "WARN", "P1", "Customer-friendly API fallback detected.");
  addCheck(checks, "no fake booking success", /Buchung bestaetigt|Buchung best.tigt|Auftrag bestaetigt|Auftrag best.tigt/.test(`${bookingsApi}\n${smartWizard}\n${offerCheck}\n${cheaperAlternative}`) ? "FAIL" : "PASS", "P0", "No binding booking confirmation wording detected.");

  addCheck(checks, "intake api exists", intakeApi ? "PASS" : "WARN", "P2", files.intakeApi);
  addCheck(checks, "intake validation", /Name ist zu kurz|Service-Typ fehlt|Telefonnummer ist zu kurz/.test(intakeApi) ? "PASS" : "WARN", "P2", "Intake validation detected.");

  const formFiles = [
    [files.smartWizard, smartWizard],
    [files.offerCheck, offerCheck],
    [files.cheaperAlternative, cheaperAlternative],
  ];
  for (const [file, source] of formFiles) {
    addCheck(checks, `${file} submit target`, /fetch\(["']\/api\/bookings["']/.test(source) ? "PASS" : "FAIL", "P0", "Form submits to /api/bookings.");
    addCheck(checks, `${file} error state`, /setSubmitError|setErrorMessage|submitState.*error|Die Anfrage konnte nicht gesendet/.test(source) ? "PASS" : "WARN", "P1", "User-facing error state detected.");
    addCheck(checks, `${file} success state`, /success|setIsSuccess|setSubmitState\(["']success["']/.test(source) ? "PASS" : "WARN", "P1", "Success state detected.");
    addCheck(checks, `${file} privacy`, /privacy|privacyConsent/.test(source) ? "PASS" : "WARN", "P1", "Privacy acknowledgement detected.");
  }

  addCheck(checks, "contact page lead paths", /Anfrage|Kontakt|\/buchung|\/angebot-guenstiger-pruefen/.test(contactPage) ? "PASS" : "WARN", "P1", "Contact page includes lead path copy/links.");
  addCheck(checks, "pii in data attributes", /data-[a-z0-9-]*(email|phone|telefon|name)=/i.test(`${smartWizard}\n${offerCheck}\n${cheaperAlternative}\n${contactPage}`) ? "FAIL" : "PASS", "P0", "No obvious PII data attributes detected.");

  await maybeSubmitLocalTest(checks);

  const status = statusFromChecks(checks);
  const summary = {
    generatedAt,
    baseUrl,
    testLeadSubmit: shouldSubmit,
    checks: checks.length,
    pass: checks.filter((item) => item.status === "PASS").length,
    warn: checks.filter((item) => item.status === "WARN").length,
    fail: checks.filter((item) => item.status === "FAIL").length,
  };
  const output = { status, summary, checks };
  const rows = checks.map((item) => `| ${item.status} | ${item.priority} | ${item.name} | ${item.detail || "-"} | ${item.action || "-"} |`);
  const md = [
    "# Lead Delivery Check Report",
    "",
    `Generated: ${generatedAt}`,
    `Base URL: ${baseUrl}`,
    `TEST_LEAD_SUBMIT: ${shouldSubmit ? "true" : "false"}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Checks: ${summary.checks}`,
    `- PASS: ${summary.pass}`,
    `- WARN: ${summary.warn}`,
    `- FAIL: ${summary.fail}`,
    "",
    "## Checks",
    "",
    "| Status | Priority | Check | Detail | Action |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
    "",
    "## Submit Safety",
    "",
    "- No production lead is submitted automatically.",
    "- Test submit requires `TEST_LEAD_SUBMIT=true` and a localhost/127.0.0.1 BASE_URL.",
    "- Test payload uses `test@example.com` and is clearly marked as not a real order.",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "lead-delivery-check-report.json"), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(root, "LEAD_DELIVERY_CHECK_REPORT.md"), md);
  console.log(`Lead delivery check status: ${status}`);
  console.log("Reports written: LEAD_DELIVERY_CHECK_REPORT.md, lead-delivery-check-report.json");
  process.exit(status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
