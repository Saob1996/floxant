const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relativePath) => {
  const absolute = path.join(root, relativePath);
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : "";
};

const files = {
  contactPage: "app/kontakt/page.tsx",
  personalization: "components/ContactQueryPersonalization.tsx",
  professionalForm: "components/ProfessionalRequestForm.tsx",
  requestContext: "lib/lead-intents/resolve-request-context.ts",
  locationPolicy: "lib/lead-intents/request-location-policy.ts",
  requestPolicy: "lib/booking/request-service-policy.js",
  requestSchema: "lib/booking/request-schema.js",
  bookingClient: "lib/booking-submission-client.ts",
  leadHandler: "functions/_lib/lead-handler.js",
};

const sources = Object.fromEntries(
  Object.entries(files).map(([key, file]) => [key, read(file)]),
);
const packageJson = JSON.parse(read("package.json"));

const checks = [];
function check(name, pass, detail, action = "") {
  checks.push({ name, pass: Boolean(pass), detail, action });
}

function includesAll(source, tokens) {
  return tokens.every((token) => source.includes(token));
}

function profileCoreFields(source, profile) {
  const block = source.match(
    new RegExp(`${profile}:\\s*Object\\.freeze\\(\\{([\\s\\S]*?)\\n\\s*\\}\\),`),
  );
  if (!block) return [];
  const core = block[1].match(/coreFields:\s*Object\.freeze\(\[([^\]]*)\]\)/);
  if (!core) return [];
  return [...core[1].matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
}

const expectedProfiles = {
  cleaning: ["cityOrZip", "objectType", "areaSize", "scope"],
  moving: ["startLocation", "destinationLocation", "scope"],
  furniture: ["startLocation", "destinationLocation", "itemDescription"],
  piano: ["startLocation", "destinationLocation", "instrumentType"],
  clearance: ["cityOrZip", "objectType", "areaSize"],
  offer_check: ["cityOrZip", "scope"],
  general: ["cityOrZip", "scope"],
};

check(
  "contact page mounts the central personalized form",
  includesAll(sources.contactPage, ["<ContactHeroCopy", "<ContactLeadForm", 'sourcePage="/kontakt"']),
  "The /kontakt page must render its route-derived copy and ContactLeadForm.",
);
check(
  "query personalization resolves one request context",
  includesAll(sources.personalization, [
    "resolveRequestContext({",
    'params.get("location")',
    'params.get("service")',
    'params.get("source")',
    'params.get("entryPage")',
  ]),
  "Location, service and attribution query input must pass through resolveRequestContext.",
);
check(
  "step-one selector uses resolved location/service options",
  includesAll(sources.personalization, [
    "function RequestContextSelector",
    "requestLocationOptions.map",
    "services.map",
    "selectLocation",
    "selectService",
  ]),
  "The selector must derive its choices from the central policy projection.",
);
check(
  "step-one selector exposes accessible state",
  includesAll(sources.personalization, [
    "<fieldset>",
    "<legend",
    'htmlFor="request-service-choice"',
    'id="request-service-choice"',
    "aria-pressed=",
    "aria-invalid=",
    "aria-describedby=",
  ]),
  "Location buttons and the service selector need labels, pressed state and error associations.",
);
check(
  "ProfessionalRequestForm is the only submit owner in the contact flow",
  sources.personalization.includes("<ProfessionalRequestForm")
    && !/\bfetch\s*\(/.test(sources.personalization)
    && !/<form\b/.test(sources.personalization),
  "ContactQueryPersonalization should resolve selection state while ProfessionalRequestForm owns submission.",
);

check(
  "resolver uses the shared allowlisted location policy",
  includesAll(sources.requestContext, [
    "requestServiceOptionsByLocation",
    "resolveAllowedRequestService",
    "isRequestServiceAllowedAtLocation",
    "neutralContext",
    "isSafeRequestToken",
  ]),
  "Unknown or disallowed location/service input must fall back to a neutral selection state.",
);
check(
  "resolver keeps query metadata bounded",
  includesAll(sources.requestContext, [
    "function normalizeSource",
    "function normalizeEntryPage",
    "function normalizeCampaign",
    '.slice(0, 240)',
    '.slice(0, 120)',
  ]),
  "Source, entry page and campaign values need allowlisting or explicit length limits.",
);
check(
  "location policy projects the shared request registry",
  includesAll(sources.locationPolicy, [
    "REQUEST_LOCATION_OPTIONS",
    "getRequestFormProfile",
    "getRequestService",
    "getRequestServicesForLocation",
    "isAllowedRequestCombination",
  ]),
  "Client options and server validation must consume the same request-service policy.",
);
check(
  "verified and unsure locations remain explicit",
  includesAll(sources.requestPolicy, [
    'id: "duesseldorf"',
    'id: "regensburg"',
    "REQUEST_UNSURE_SERVICES",
    'locations: ["unsicher"]',
  ]),
  "Düsseldorf, Regensburg and the explicit unsure path must remain policy entries.",
);
check(
  "all professional form profiles match the current core-field contract",
  Object.entries(expectedProfiles).every(([profile, expected]) => {
    const actual = profileCoreFields(sources.requestPolicy, profile);
    return actual.length === expected.length && actual.every((field, index) => field === expected[index]);
  }),
  Object.entries(expectedProfiles)
    .map(([profile, expected]) => `${profile}=[${expected.join(", ")}]`)
    .join("; "),
  "Update the gate only together with an intentional client/server profile-contract change.",
);

check(
  "central form implements exactly three progressive steps",
  /type\s+RequestStep\s*=\s*1\s*\|\s*2\s*\|\s*3/.test(sources.professionalForm)
    && includesAll(sources.professionalForm, [
      "function Progress",
      '"Standort und Leistung"',
      '"Eckdaten"',
      '"Kontakt und Zusammenfassung"',
      "step === 1",
      "step === 2",
      "step === 3",
    ]),
  "ProfessionalRequestForm must keep selection, service details and contact/summary as its three steps.",
);
check(
  "valid presets enter details while neutral entries start at selection",
  sources.professionalForm.includes("context.valid ? 2 : 1")
    && sources.professionalForm.includes("if (!context.valid) next.context"),
  "A valid CTA preset may skip to details; neutral or invalid input must require step one.",
);
check(
  "client detail validation covers every policy core field",
  Object.values(expectedProfiles).flat().every((field) => sources.professionalForm.includes(field))
    && includesAll(sources.professionalForm, [
      "function detailErrors()",
      'group === "moving"',
      'group === "furniture"',
      'group === "piano"',
      '["offer_check", "general"].includes(group)',
      'group === "cleaning"',
    ]),
  "Every shared profile core field needs a visible client control and step-two validation branch.",
);
check(
  "client and server share contact validation",
  sources.professionalForm.includes("validateRequestContact(")
    && sources.professionalForm.includes("requireContactMethod: true, requireConsent: true")
    && sources.leadHandler.includes("validateRequestContact(")
    && sources.requestPolicy.includes("export function validateRequestContact"),
  "Name, email/phone, preferred route and privacy consent must use the shared browser/Function validator.",
);
check(
  "server enforces the same service/profile policy",
  includesAll(sources.leadHandler, [
    "getRequestService",
    "getRequestFormProfile",
    "validateProfessionalRequestContext",
    "validateProfessionalContact",
    "canonicalizeProfessionalPayload",
  ]),
  "The Function must validate and canonicalize professional requests with the shared policy.",
);
check(
  "server errors return to their visible step and field",
  includesAll(sources.professionalForm, [
    "function errorFieldId",
    "function errorStep",
    "function showErrors",
    "pendingErrorFocusRef.current = firstErrorField(next)",
    "bookingFieldErrors(result)",
    "aria-invalid=",
    "aria-describedby=",
  ]),
  "Field errors from the Function must reopen the correct step and focus an associated visible control.",
);
check(
  "technical failures stay separate from field validation",
  includesAll(sources.professionalForm, [
    "type SubmissionIssue",
    "setSubmissionIssue({",
    "submissionIssue.requestId",
    "bookingFieldErrors(result)",
    "setErrors({})",
  ])
    && (sources.professionalForm.match(/Referenz:/g) || []).length === 1,
  "A technical reference should appear once, while normal field errors remain field-level.",
);
check(
  "canonical payload builder removes empty and UI-only values",
  includesAll(sources.requestSchema, [
    "REQUEST_UI_ONLY_FIELDS",
    "compactRequestValue",
    "sanitizeBookingPayload",
    "appendBookingPayloadToFormData",
  ])
    && sources.professionalForm.includes("appendBookingPayloadToFormData(new FormData(), requestFields)"),
  "The form must submit only compact canonical request fields.",
);
check(
  "central form submits through bookingFetch with idempotency",
  /bookingFetch\(["']\/api\/bookings["']/.test(sources.professionalForm)
    && /["']Idempotency-Key["']\s*:\s*attemptKey/.test(sources.professionalForm)
    && sources.bookingClient.includes("const inFlightRequests = new Map")
    && sources.bookingClient.includes("requestBodyKeys = new WeakMap"),
  "Double clicks and unchanged technical retries need one scoped request identity.",
);
check(
  "success requires the strict persisted-booking response",
  includesAll(sources.professionalForm, [
    "response.status !== 201",
    "response.ok !== true",
    "result.ok !== true",
    "!result.requestId",
    "!result.bookingId",
  ]),
  "The UI must show success only after HTTP 201 plus ok, requestId and bookingId.",
);
check(
  "service changes clear dependent request state",
  includesAll(sources.professionalForm, [
    "setFiles([])",
    "setMessage(\"\")",
    "setExtras",
    "setStartedAt(Date.now())",
    "submissionAttemptKeyRef.current = \"\"",
  ]),
  "Changing location/service must not retain stale details, files, extras or an old attempt key.",
);
check(
  "attachment limits are shared",
  sources.professionalForm.includes("REQUEST_ATTACHMENT_RULES")
    && sources.leadHandler.includes("REQUEST_ATTACHMENT_RULES")
    && includesAll(sources.requestPolicy, ["maxFiles", "maxFileBytes", "maxTotalBytes", "allowedMimeTypes"]),
  "Client and Function must enforce the same attachment count, size and MIME policy.",
);
check(
  "no fake guarantee or binding-confirmation language",
  !/(?:preisgarantie|ersparnisgarantie|verfuegbarkeitsgarantie|sofortzusage|buchung\s+bestätigt|auftrag\s+bestätigt)/i.test(
    `${sources.contactPage}\n${sources.personalization}\n${sources.professionalForm}`,
  ),
  "The enquiry flow must remain explicitly non-binding.",
);
check(
  "npm script contact-flow:health exists",
  packageJson.scripts?.["contact-flow:health"] === "node scripts/contact-flow-health.cjs",
  "package.json exposes the release-health command.",
);

const failed = checks.filter((item) => !item.pass);
const status = failed.length ? "RED" : "GREEN";
const report = {
  status,
  generatedAt: new Date().toISOString(),
  summary: {
    checks: checks.length,
    passed: checks.length - failed.length,
    failed: failed.length,
    warnings: 0,
  },
  checkedFiles: files,
  checks,
  warnings: [],
};

fs.writeFileSync(
  path.join(root, "contact-flow-health-report.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

const lines = [
  "# Contact Flow Health Report",
  "",
  `Status: ${status}`,
  `Generated: ${report.generatedAt}`,
  "",
  "## Contract",
  "",
  "- Step 1: allowlisted location and service selection.",
  "- Step 2: profile-specific core details plus optional additions/files.",
  "- Step 3: shared contact validation, review and explicit submit.",
  "- Delivery: canonical payload → bookingFetch → Cloudflare Pages Function → shared policy/handler.",
  "",
  "## Checks",
  "",
  ...checks.map((item) => `- ${item.pass ? "PASS" : "FAIL"}: ${item.name} - ${item.detail}${item.action ? ` Action: ${item.action}` : ""}`),
  "",
  "## Warnings",
  "",
  "- None.",
  "",
];

fs.writeFileSync(path.join(root, "CONTACT_FLOW_HEALTH_REPORT.md"), lines.join("\n"));

if (failed.length) {
  console.error(`contact-flow:health failed (${failed.length}/${checks.length})`);
  for (const item of failed) console.error(`- ${item.name}: ${item.detail}`);
  process.exit(1);
}

console.log(`contact-flow:health ${status} (${checks.length} checks)`);
