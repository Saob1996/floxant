const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const generatedAt = new Date().toISOString();
const baseUrl = String(process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const shouldSubmit = process.env.TEST_LEAD_SUBMIT === "true";

const files = {
  bookingsFunction: "functions/api/bookings.js",
  intakeFunction: "functions/api/intake.js",
  leadHandler: "functions/_lib/lead-handler.js",
  bookingClient: "lib/booking-submission-client.ts",
  requestPolicy: "lib/booking/request-service-policy.js",
  requestSchema: "lib/booking/request-schema.js",
  professionalForm: "components/ProfessionalRequestForm.tsx",
  contactPage: "app/kontakt/page.tsx",
};

function read(file) {
  const absolute = path.join(root, file);
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : "";
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", ".next", "node_modules", "out", "dist", "coverage"].includes(entry.name)) {
      return [];
    }
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return /\.(?:[cm]?[jt]sx?)$/.test(entry.name) ? [absolute] : [];
  });
}

function relative(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function count(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function addCheck(checks, name, pass, priority, detail, action = "") {
  checks.push({
    name,
    status: pass ? "PASS" : "FAIL",
    priority,
    detail,
    action,
  });
}

function addRuntimeCheck(checks, name, status, priority, detail, action = "") {
  checks.push({ name, status, priority, detail, action });
}

function statusFromChecks(checks) {
  if (checks.some((item) => item.status === "FAIL")) return "FAIL";
  if (checks.some((item) => item.status === "WARN")) return "WARN";
  return "PASS";
}

function isLocalBaseUrl(value) {
  try {
    const url = new URL(value);
    return (
      ["http:", "https:"].includes(url.protocol)
      && ["localhost", "127.0.0.1", "::1"].includes(url.hostname)
      && !url.username
      && !url.password
    );
  } catch {
    return false;
  }
}

function endpointDelegatesToSharedHandler(source) {
  return (
    /import\s*\{[^}]*\bhandleLeadOptions\b[^}]*\bhandleLeadSubmission\b[^}]*\}\s*from\s*["']\.\.\/_lib\/lead-handler\.js["']/s.test(source)
    && /export\s+const\s+onRequestPost\s*=\s*handleLeadSubmission\s*;/.test(source)
    && /export\s+const\s+onRequestOptions\s*=\s*handleLeadOptions\s*;/.test(source)
  );
}

function bookingFetchCallChecks(file, source) {
  const calls = [...source.matchAll(/\bbookingFetch\s*\(/g)];
  const imported = /import\s*\{[^}]*\bbookingFetch\b[^}]*\}\s*from\s*["']@\/lib\/booking-submission-client["']/s.test(source);
  const approvedTargets = calls.every((match) => {
    const sample = source.slice(match.index, match.index + 160);
    return /bookingFetch\s*\(\s*["']\/api\/(?:bookings|intake)["']/.test(sample);
  });
  const postOnly = calls.every((match) => {
    const sample = source.slice(match.index, match.index + 500);
    return /method\s*:\s*["']POST["']/.test(sample);
  });
  return {
    file,
    calls: calls.length,
    imported,
    approvedTargets,
    postOnly,
  };
}

async function maybeSubmitLocalTest(checks) {
  if (!shouldSubmit) {
    addRuntimeCheck(
      checks,
      "submit safety gate",
      "PASS",
      "P0",
      "TEST_LEAD_SUBMIT is not exactly true; no HTTP request was made.",
      "Set TEST_LEAD_SUBMIT=true only for an explicit localhost test.",
    );
    return;
  }

  if (!isLocalBaseUrl(baseUrl)) {
    addRuntimeCheck(
      checks,
      "submit safety gate",
      "WARN",
      "P0",
      `Refused the explicit test submit because BASE_URL is not local: ${baseUrl}`,
      "Use a localhost, 127.0.0.1 or [::1] BASE_URL.",
    );
    return;
  }

  const formData = new FormData();
  formData.set("name", "FLOXANT LEAD DELIVERY TEST");
  formData.set("contactMethod", "email");
  formData.set("email", "test@example.com");
  formData.set("service", "angebot-pruefen");
  formData.set("cityOrZip", "Düsseldorf");
  formData.set("scope", "SYNTHETISCHER LOKALER LEAD-DELIVERY-TEST – KEIN KUNDENAUFTRAG");
  formData.set("message", "SYNTHETISCHER LOKALER LEAD-DELIVERY-TEST – KEIN KUNDENAUFTRAG");
  formData.set("privacyConsent", "true");
  formData.set("companyWebsite", "");
  formData.set("leadSource", "lead_delivery_check");
  formData.set("timestamp", new Date().toISOString());

  try {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: "POST",
      body: formData,
    });
    const body = await response.text();
    addRuntimeCheck(
      checks,
      "explicit local test submit",
      response.ok ? "PASS" : "WARN",
      "P0",
      `HTTP ${response.status}; response sample: ${body.slice(0, 180)}`,
      response.ok ? "No action." : "Check the local server, test environment and Function logs.",
    );
  } catch (error) {
    addRuntimeCheck(
      checks,
      "explicit local test submit",
      "WARN",
      "P0",
      `Local test submit failed: ${error.message}`,
      "Check the local server. No non-local request was sent.",
    );
  }
}

async function main() {
  const checks = [];
  const bookingsFunction = read(files.bookingsFunction);
  const intakeFunction = read(files.intakeFunction);
  const leadHandler = read(files.leadHandler);
  const bookingClient = read(files.bookingClient);
  const requestPolicy = read(files.requestPolicy);
  const requestSchema = read(files.requestSchema);
  const professionalForm = read(files.professionalForm);
  const contactPage = read(files.contactPage);

  addCheck(
    checks,
    "Cloudflare Pages Function endpoints",
    endpointDelegatesToSharedHandler(bookingsFunction) && endpointDelegatesToSharedHandler(intakeFunction),
    "P0",
    `${files.bookingsFunction} and ${files.intakeFunction} delegate POST/OPTIONS to the shared handler.`,
    "Restore both Pages Function adapters and their shared delegation.",
  );
  addCheck(
    checks,
    "shared Function handler exports",
    /export\s+async\s+function\s+handleLeadSubmission\s*\(/.test(leadHandler)
      && /export\s+function\s+handleLeadOptions\s*\(/.test(leadHandler),
    "P0",
    `${files.leadHandler} exposes the POST and OPTIONS handlers.`,
  );
  addCheck(
    checks,
    "Function configuration fails closed",
    /SUPABASE_URL\s*\|\|\s*env\?\.NEXT_PUBLIC_SUPABASE_URL/.test(leadHandler)
      && /SUPABASE_SERVICE_ROLE_KEY/.test(leadHandler)
      && /code:\s*["']CONFIGURATION_ERROR["']/.test(leadHandler)
      && /\},\s*503\s*,/.test(leadHandler),
    "P0",
    "The handler requires Supabase configuration and returns a structured 503 when it is absent.",
  );
  addCheck(
    checks,
    "supported request formats and size guard",
    /application\/json/.test(leadHandler)
      && /multipart\/form-data/.test(leadHandler)
      && /application\/x-www-form-urlencoded/.test(leadHandler)
      && /requestWithEnforcedSize/.test(leadHandler),
    "P0",
    "JSON, multipart and URL-encoded requests are parsed behind an enforced size limit.",
  );
  addCheck(
    checks,
    "shared server validation contract",
    /validateRequestContact/.test(leadHandler)
      && /validateProfessionalRequestContext/.test(leadHandler)
      && /getRequestFormProfile/.test(leadHandler)
      && /fields:\s*error\.fields/.test(leadHandler)
      && /\},\s*400\s*,/.test(leadHandler)
      && /export\s+function\s+validateRequestContact/.test(requestPolicy),
    "P0",
    "The Function uses the shared contact/service policy and returns field-level 400 responses.",
  );
  addCheck(
    checks,
    "privacy and anti-spam validation",
    /privacyConsent/.test(leadHandler)
      && /requireConsent:\s*true/.test(leadHandler)
      && /companyWebsite/.test(leadHandler)
      && /formStartedAt/.test(leadHandler),
    "P0",
    "Consent, honeypot and plausible form timing are validated server-side.",
  );
  addCheck(
    checks,
    "Supabase booking persistence",
    /\/rest\/v1\/bookings\?select=id/.test(leadHandler)
      && /async\s+function\s+insertBooking/.test(leadHandler)
      && /method:\s*["']POST["']/.test(leadHandler)
      && /DATABASE_INSERT_FAILED/.test(leadHandler),
    "P0",
    "The shared handler inserts into the Supabase bookings REST endpoint and fails closed on insert errors.",
  );
  const insertIndex = leadHandler.indexOf("const inserted = await insertBooking");
  const notificationIndex = leadHandler.indexOf("const notification = await sendNotifications", insertIndex);
  addCheck(
    checks,
    "notification follows durable insert",
    insertIndex >= 0
      && notificationIndex > insertIndex
      && /https:\/\/api\.resend\.com\/emails/.test(leadHandler)
      && /notification\.status === ["']sent["']/.test(leadHandler),
    "P0",
    "Resend notification delivery is attempted only after a durable booking insert and emits a non-PII status log.",
  );
  addCheck(
    checks,
    "durable idempotency path",
    /readIdempotencyKey/.test(leadHandler)
      && /submissionFingerprint/.test(leadHandler)
      && /readBookingById/.test(leadHandler)
      && /IDEMPOTENCY_CONFLICT/.test(leadHandler),
    "P0",
    "Idempotency is backed by the persisted booking identity and payload fingerprint.",
  );
  addCheck(
    checks,
    "confirmed success response contract",
    /ok:\s*true[\s\S]{0,180}requestId:[\s\S]{0,180}bookingId:/.test(leadHandler)
      && /\},\s*201\s*,/.test(leadHandler),
    "P0",
    "A successful Function response carries ok=true, requestId and bookingId with HTTP 201.",
  );

  addCheck(
    checks,
    "bookingFetch adapter contract",
    /export\s+async\s+function\s+bookingFetch/.test(bookingClient)
      && /code:\s*["']NETWORK_ERROR["']/.test(bookingClient)
      && /response\.status\s*===\s*201/.test(bookingClient)
      && /payload\.bookingId/.test(bookingClient)
      && /normalizeFormData/.test(bookingClient),
    "P0",
    "The shared client normalizes payloads, converts network failures and accepts only the strict HTTP 201 contract.",
  );

  const componentFiles = walk(path.join(root, "components"));
  const bookingClients = componentFiles
    .map((absolute) => ({ absolute, file: relative(absolute), source: fs.readFileSync(absolute, "utf8") }))
    .filter(({ source }) => /\bbookingFetch\s*\(/.test(source))
    .map(({ file, source }) => bookingFetchCallChecks(file, source));
  const totalBookingFetchCalls = bookingClients.reduce((sum, client) => sum + client.calls, 0);
  addCheck(
    checks,
    "bookingFetch clients discovered",
    bookingClients.length > 0 && totalBookingFetchCalls > 0,
    "P0",
    `${bookingClients.length} components with ${totalBookingFetchCalls} bookingFetch call(s) were inspected.`,
  );
  const clientsWithoutImport = bookingClients.filter((client) => !client.imported).map((client) => client.file);
  addCheck(
    checks,
    "bookingFetch clients use shared adapter",
    clientsWithoutImport.length === 0,
    "P0",
    clientsWithoutImport.length
      ? `Missing shared import: ${clientsWithoutImport.join(", ")}`
      : "Every bookingFetch client imports the shared submission adapter.",
    "Import bookingFetch from @/lib/booking-submission-client.",
  );
  const clientsWithBadTargets = bookingClients
    .filter((client) => !client.approvedTargets || !client.postOnly)
    .map((client) => client.file);
  addCheck(
    checks,
    "bookingFetch clients target lead POST endpoints",
    clientsWithBadTargets.length === 0,
    "P0",
    clientsWithBadTargets.length
      ? `Unsupported target or non-POST call: ${clientsWithBadTargets.join(", ")}`
      : "Every discovered client POSTs through bookingFetch to /api/bookings or /api/intake.",
  );

  const publicSources = [path.join(root, "app"), path.join(root, "components")]
    .flatMap(walk)
    .map((absolute) => ({ file: relative(absolute), source: fs.readFileSync(absolute, "utf8") }));
  const rawLeadFetches = publicSources
    .filter(({ source }) => /\bfetch\s*\(\s*["'`]\/api\/(?:bookings|intake)["'`]/.test(source))
    .map(({ file }) => file);
  addCheck(
    checks,
    "no raw lead submission bypass",
    rawLeadFetches.length === 0,
    "P0",
    rawLeadFetches.length
      ? `Direct lead fetch bypass found: ${rawLeadFetches.join(", ")}`
      : "No public component bypasses bookingFetch for the lead submission endpoints.",
    "Route lead submissions through bookingFetch.",
  );
  addCheck(
    checks,
    "central request uses canonical payload",
    /appendBookingPayloadToFormData\(new FormData\(\),\s*requestFields\)/.test(professionalForm)
      && /bookingFetch\(["']\/api\/bookings["']/.test(professionalForm)
      && /["']Idempotency-Key["']/.test(professionalForm)
      && /export\s+function\s+appendBookingPayloadToFormData/.test(requestSchema),
    "P0",
    "ProfessionalRequestForm builds the shared canonical payload and submits it with an idempotency key.",
  );
  addCheck(
    checks,
    "contact page exposes central lead path",
    /<ContactLeadForm\b/.test(contactPage) && /sourcePage=["']\/kontakt["']/.test(contactPage),
    "P1",
    "The public contact page embeds the central request form.",
  );

  const clientCorpus = bookingClients
    .map((client) => read(client.file))
    .join("\n");
  addCheck(
    checks,
    "no PII data attributes in lead clients",
    !/data-[a-z0-9-]*(?:email|phone|telefon|name)\s*=/i.test(clientCorpus),
    "P0",
    "No obvious PII-bearing data attribute was found in bookingFetch clients.",
  );
  addCheck(
    checks,
    "no binding booking confirmation wording",
    !/(?:Buchung|Auftrag)\s+(?:bestaetigt|bestätigt)/i.test(`${leadHandler}\n${clientCorpus}`),
    "P0",
    "No lead response promises a binding booking or order confirmation.",
  );

  await maybeSubmitLocalTest(checks);

  const status = statusFromChecks(checks);
  const summary = {
    generatedAt,
    baseUrl,
    testLeadSubmit: shouldSubmit,
    inspectedBookingFetchClients: bookingClients.length,
    inspectedBookingFetchCalls: totalBookingFetchCalls,
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
    `- bookingFetch clients: ${summary.inspectedBookingFetchClients}`,
    `- bookingFetch calls: ${summary.inspectedBookingFetchCalls}`,
    "",
    "## Checks",
    "",
    "| Status | Priority | Check | Detail | Action |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
    "",
    "## Submit Safety",
    "",
    "- The check performs no HTTP request unless `TEST_LEAD_SUBMIT` is exactly `true`.",
    "- Even with that flag, submission is refused unless `BASE_URL` resolves to localhost, 127.0.0.1 or [::1].",
    "- The optional local payload is explicitly marked as synthetic and not a customer order.",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "lead-delivery-check-report.json"), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(root, "LEAD_DELIVERY_CHECK_REPORT.md"), md);
  console.log(`Lead delivery check status: ${status}`);
  console.log(`Inspected bookingFetch clients: ${bookingClients.length}; calls: ${totalBookingFetchCalls}`);
  console.log("Reports written: LEAD_DELIVERY_CHECK_REPORT.md, lead-delivery-check-report.json");
  process.exit(status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
