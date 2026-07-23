const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const reportPath = path.join(ROOT, "lead-response-health-report.json");
const mdPath = path.join(ROOT, "LEAD_RESPONSE_HEALTH_REPORT.md");
const checks = [];

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function fileExists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function add(id, status, label, detail, files = []) {
  checks.push({ id, status, label, detail, files: files.map((file) => rel(path.join(ROOT, file))) });
}

function includesAll(file, needles) {
  const text = read(path.join(ROOT, file));
  const missing = needles.filter((needle) => !text.includes(needle));
  return { ok: missing.length === 0, missing };
}

const requiredFiles = [
  "docs/LEAD_RESPONSE_ARCHITECTURE.md",
  "docs/LEAD_REPLY_TEMPLATES.md",
  "docs/INTERNAL_LEAD_NOTIFICATION_REPORT.md",
  "docs/CUSTOMER_ACKNOWLEDGEMENT_TEMPLATES.md",
  "docs/LEAD_OPERATIONS_PLAYBOOK.md",
  "docs/LEAD_PII_SAFETY_REPORT.md",
  "docs/LEAD_RESPONSE_IMPLEMENTATION_REPORT.md",
  "lib/lead-reply-templates.ts",
  "lib/missing-info-questions.ts",
  "lib/lead-response-recommendations.ts",
  "lib/lead-summary.ts",
];

const missingRequired = requiredFiles.filter((file) => !fileExists(file));
add(
  "files:required",
  missingRequired.length ? "FAIL" : "PASS",
  "Lead response files exist",
  missingRequired.length ? `Missing: ${missingRequired.join(", ")}` : "All required lead-response files are present.",
  requiredFiles,
);

const pkg = JSON.parse(read(path.join(ROOT, "package.json")));
add(
  "script:package",
  pkg.scripts && pkg.scripts["lead-response:health"] === "node scripts/lead-response-health.cjs" ? "PASS" : "FAIL",
  "npm script lead-response:health exists",
  "package.json exposes the lead-response health script.",
  ["package.json"],
);

const templateSource = read(path.join(ROOT, "lib/lead-reply-templates.ts"));
const requiredTemplateKeys = [
  "reply-cleaning",
  "reply-b2b-cleaning",
  "reply-property-cleaning",
  "reply-moving",
  "reply-piano-transport",
  "reply-clearance",
  "reply-estate-clearance",
  "reply-senior-move",
  "reply-discreet",
  "reply-offer-check",
  "reply-solar-pv",
  "reply-handover",
  "reply-plan-b",
  "reply-english-short",
];
const missingTemplates = requiredTemplateKeys.filter((key) => !templateSource.includes(`templateKey: "${key}"`));
add(
  "templates:p0-services",
  missingTemplates.length ? "FAIL" : "PASS",
  "P0 services have reply templates",
  missingTemplates.length ? `Missing templates: ${missingTemplates.join(", ")}` : "All required service reply templates are present.",
  ["lib/lead-reply-templates.ts"],
);

const templateNeedles = [
  "subjectSuggestion",
  "internalUseCase",
  "customerReplyDE",
  "missingInfoQuestions",
  "notAllowedClaims",
  "recommendedNextStep",
];
const templateStructure = templateNeedles.filter((needle) => !templateSource.includes(needle));
add(
  "templates:structure",
  templateStructure.length ? "FAIL" : "PASS",
  "Reply template structure is complete",
  templateStructure.length ? `Missing fields: ${templateStructure.join(", ")}` : "Templates contain required structural fields.",
  ["lib/lead-reply-templates.ts"],
);

const questionsSource = read(path.join(ROOT, "lib/missing-info-questions.ts"));
const questionKeys = [
  "reinigung",
  "b2b-reinigung",
  "hausverwaltung-reinigung",
  "umzug",
  "klaviertransport",
  "entruempelung",
  "angebot-pruefen",
  "diskret-service",
  "plan-b-service",
  "solarreinigung",
  "uebergabe",
  "english",
];
const missingQuestionKeys = questionKeys.filter((key) => !questionsSource.includes(`serviceKey: "${key}"`));
add(
  "missing-info:questions",
  missingQuestionKeys.length ? "FAIL" : "PASS",
  "Missing-info questions exist per service",
  missingQuestionKeys.length ? `Missing question sets: ${missingQuestionKeys.join(", ")}` : "Service-specific missing-info question sets are present.",
  ["lib/missing-info-questions.ts"],
);

const priorityCheck = includesAll("lib/lead-priority.ts", [
  "p0_b2b_cleaning_scope",
  "p0_piano_access_or_date",
  "p0_clearance_deadline_or_photos",
  "p0_handover_deadline",
  "p0_operational_response",
]);
add(
  "priority:p0-signals",
  priorityCheck.ok ? "PASS" : "FAIL",
  "Lead priority includes response-quality P0 signals",
  priorityCheck.ok ? "P0 operational signals are represented." : `Missing: ${priorityCheck.missing.join(", ")}`,
  ["lib/lead-priority.ts"],
);

const routingCheck = includesAll("lib/lead-routing.ts", [
  "responseTemplateKey",
  "missingInfoQuestions",
  "internalPriority",
  "recommendedNextStep",
  "sensitiveHandlingRequired",
  "b2bHandlingRequired",
  "englishReplyPossible",
]);
add(
  "routing:response-fields",
  routingCheck.ok ? "PASS" : "FAIL",
  "Lead routing exposes response recommendation fields",
  routingCheck.ok ? "Routing exposes template, missing-info and handling flags." : `Missing: ${routingCheck.missing.join(", ")}`,
  ["lib/lead-routing.ts"],
);

const operationsCheck = includesAll("lib/lead-operations.ts", [
  "responseRecommendation",
  "internalSummary",
  "missingInfoQuestions",
  "customerAcknowledgement",
  "responseTemplateKey",
]);
add(
  "operations:snapshot",
  operationsCheck.ok ? "PASS" : "FAIL",
  "Operations snapshot carries lead-response data",
  operationsCheck.ok ? "Lead operations include recommendations, summary and acknowledgement copy." : `Missing: ${operationsCheck.missing.join(", ")}`,
  ["lib/lead-operations.ts"],
);

const notificationCheck = includesAll("lib/mail/notifications.ts", [
  "formatLeadInternalSummaryLines",
  "[FLOXANT Lead",
  "Lead-Response-Summary",
  "responseTemplateKey",
  "Datenschutz",
]);
add(
  "notification:internal",
  notificationCheck.ok ? "PASS" : "WARN",
  "Internal notification structure exists",
  notificationCheck.ok ? "Internal notification uses priority, template, follow-up and PII-safe summary." : `Review notification gaps: ${notificationCheck.missing.join(", ")}`,
  ["lib/mail/notifications.ts"],
);

const successCheck = includesAll("components/SeoLeadForm.tsx", [
  "getLeadReplyTemplateForServiceKey",
  "getMissingInfoQuestionsForServiceKey",
  "Was FLOXANT als Nächstes prüft",
  "Diese Bestätigung ist keine Buchung",
  "responseTemplateKey",
]);
add(
  "success-state:customer",
  successCheck.ok ? "PASS" : "FAIL",
  "Customer success state is service-specific and honest",
  successCheck.ok ? "Success state includes next-step and no-booking/no-guarantee copy." : `Missing: ${successCheck.missing.join(", ")}`,
  ["components/SeoLeadForm.tsx"],
);

const apiCheck = includesAll("app/api/bookings/route.ts", [
  "responseTemplateKey",
  "recommendedNextStep",
  "missingInfoQuestions",
  "sendInternalIntakeNotification",
]);
add(
  "api:submit-only-fields",
  apiCheck.ok ? "PASS" : "FAIL",
  "Booking API accepts lead-response fields",
  apiCheck.ok ? "Lead-response fields are parsed on explicit submit." : `Missing: ${apiCheck.missing.join(", ")}`,
  ["app/api/bookings/route.ts"],
);

const forbiddenClaims = [
  /garantiert (?:einen )?preis/i,
  /ersparnisgarantie.*ja/i,
  /soforttermin garantiert/i,
  /rechtsberatung erfolgt/i,
  /pflegeberatung erfolgt/i,
  /medizinische beratung erfolgt/i,
  /buchung bestaetigt/i,
  /booking confirmed/i,
];
const safetyScope = [
  "lib/lead-reply-templates.ts",
  "components/SeoLeadForm.tsx",
  "docs/LEAD_RESPONSE_ARCHITECTURE.md",
  "docs/LEAD_REPLY_TEMPLATES.md",
  "docs/CUSTOMER_ACKNOWLEDGEMENT_TEMPLATES.md",
  "docs/LEAD_OPERATIONS_PLAYBOOK.md",
];
const claimHits = [];
for (const file of safetyScope) {
  const text = read(path.join(ROOT, file));
  for (const pattern of forbiddenClaims) {
    if (pattern.test(text)) claimHits.push(`${file}: ${pattern}`);
  }
}
add(
  "copy:no-false-claims",
  claimHits.length ? "FAIL" : "PASS",
  "No false booking, price, instant-date or advice claims",
  claimHits.length ? `Forbidden claim patterns: ${claimHits.join("; ")}` : "No forbidden promise patterns found in lead-response scope.",
  safetyScope,
);

const piiReportFiles = [
  "docs/LEAD_RESPONSE_ARCHITECTURE.md",
  "docs/LEAD_REPLY_TEMPLATES.md",
  "docs/INTERNAL_LEAD_NOTIFICATION_REPORT.md",
  "docs/CUSTOMER_ACKNOWLEDGEMENT_TEMPLATES.md",
  "docs/LEAD_OPERATIONS_PLAYBOOK.md",
  "docs/LEAD_PII_SAFETY_REPORT.md",
  "docs/LEAD_RESPONSE_IMPLEMENTATION_REPORT.md",
];
const piiPatterns = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  /\+49\s?\d[\d\s()./-]{6,}/,
  /\b0\d{2,5}[\s/-]?\d{5,}\b/,
];
const piiHits = [];
for (const file of piiReportFiles) {
  const text = read(path.join(ROOT, file));
  for (const pattern of piiPatterns) {
    if (pattern.test(text)) piiHits.push(`${file}: ${pattern}`);
  }
}
add(
  "pii:reports",
  piiHits.length ? "FAIL" : "PASS",
  "Reports stay free of obvious PII patterns",
  piiHits.length ? `PII-like patterns found: ${piiHits.join("; ")}` : "No obvious email or phone patterns found in new lead-response reports.",
  piiReportFiles,
);

const publicSafetyFiles = ["components/SeoLeadForm.tsx", "app/kontakt/page.tsx"];
const publicForbidden = [
  "runtime = \"nodejs\"",
  "force-dynamic",
  "revalidate =",
  "sendBeacon(",
  "setInterval(",
  "supabase",
  "new Resend",
  "resend.emails",
  "sharp",
  "/api/vitals",
  "/api/conversion-events",
];
const publicHits = [];
for (const file of publicSafetyFiles) {
  const text = read(path.join(ROOT, file));
  for (const needle of publicForbidden) {
    if (text.includes(needle)) publicHits.push(`${file}: ${needle}`);
  }
}
add(
  "vercel:public-safety",
  publicHits.length ? "FAIL" : "PASS",
  "No Vercel usage regression in public lead-response scope",
  publicHits.length ? `Forbidden public patterns: ${publicHits.join("; ")}` : "No public runtime, polling, automatic API, Supabase, Resend or sharp patterns found.",
  publicSafetyFiles,
);

const submitOnlyCheck =
  read(path.join(ROOT, "components/SeoLeadForm.tsx")).includes('onSubmit={handleSubmit}') &&
  read(path.join(ROOT, "components/SeoLeadForm.tsx")).includes('fetch("/api/bookings"') &&
  !/useEffect\s*\([^)]*fetch\(["']\/api/s.test(read(path.join(ROOT, "components/SeoLeadForm.tsx")));
add(
  "api:submit-only",
  submitOnlyCheck ? "PASS" : "FAIL",
  "Lead API is submit-only",
  submitOnlyCheck ? "SeoLeadForm fetches /api/bookings only from submit handler." : "Review SeoLeadForm for automatic API calls.",
  ["components/SeoLeadForm.tsx"],
);

const failCount = checks.filter((check) => check.status === "FAIL").length;
const warnCount = checks.filter((check) => check.status === "WARN").length;
const passCount = checks.filter((check) => check.status === "PASS").length;
const status = failCount ? "RED" : warnCount ? "YELLOW" : "GREEN";
const report = {
  status,
  generatedAt: new Date().toISOString(),
  summary: { pass: passCount, warn: warnCount, fail: failCount },
  checks,
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

const rows = checks
  .map((check) => `| ${check.status} | ${check.id} | ${check.label} | ${check.detail.replace(/\|/g, "/")} |`)
  .join("\n");
const md = [
  "# Lead Response Health Report",
  "",
  `Status: ${status}`,
  "",
  `Generated: ${report.generatedAt}`,
  "",
  `Summary: ${passCount} PASS, ${warnCount} WARN, ${failCount} FAIL`,
  "",
  "| Status | ID | Check | Detail |",
  "|---|---|---|---|",
  rows,
  "",
  "## Notes",
  "",
  "- The health check is static and does not submit leads, send mail or call Supabase.",
  "- Internal notifications may contain customer contact data only inside the existing submit-triggered lead process.",
  "- Static reports must remain PII-free.",
  "",
].join("\n");

fs.writeFileSync(mdPath, md);
console.log(`lead-response:health ${status} (${passCount} PASS, ${warnCount} WARN, ${failCount} FAIL)`);
console.log("Wrote lead-response-health-report.json and LEAD_RESPONSE_HEALTH_REPORT.md");

if (failCount) process.exitCode = 1;
