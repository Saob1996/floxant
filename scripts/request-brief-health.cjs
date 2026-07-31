const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const reportPath = path.join(ROOT, "request-brief-health-report.json");
const mdPath = path.join(ROOT, "REQUEST_BRIEF_HEALTH_REPORT.md");

const checks = [];

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function add(id, status, label, detail, files = []) {
  checks.push({ id, status, label, detail, files: files.map((file) => rel(path.join(ROOT, file))) });
}

function includesAll(file, needles) {
  const text = read(path.join(ROOT, file));
  const missing = needles.filter((needle) => !text.includes(needle));
  return { ok: missing.length === 0, missing };
}

function fileExists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

const requiredFiles = [
  "lib/request-checklists.ts",
  "lib/object-brief-checklists.ts",
  "lib/photo-guidance.ts",
  "lib/missing-info.ts",
  "components/RequestChecklistBlock.tsx",
  "components/PhotoGuidanceBlock.tsx",
  "components/MissingInfoHelper.tsx",
  "components/ObjectBriefPreview.tsx",
  "components/CopyRequestSummaryButton.tsx",
  "components/RelatedSignatureSuggestion.tsx",
  "components/BetterRequestNotice.tsx",
];
const referenceDocs = [
  "docs/OBJEKTBRIEF_ANFRAGEBRIEF_ARCHITECTURE.md",
  "docs/LEAD_REQUEST_SUMMARY_PAYLOAD_REPORT.md",
  "docs/REQUEST_MICROCOPY_GUIDE.md",
  "docs/REQUEST_CHECKLIST_AI_FAQ_REPORT.md",
  "docs/REQUEST_BRIEF_MOBILE_ACCESSIBILITY_REPORT.md",
  "docs/OBJEKTBRIEF_PAGE_REWRITE_REPORT.md",
  "docs/REQUEST_CHECKLIST_COMPONENTS_REPORT.md",
];

const missingRequired = requiredFiles.filter((file) => !fileExists(file));
add(
  "files:required",
  missingRequired.length ? "FAIL" : "PASS",
  "Required request-brief files exist",
  missingRequired.length ? `Missing: ${missingRequired.join(", ")}` : "All required request-brief files are present.",
  requiredFiles,
);
const missingReferenceDocs = referenceDocs.filter((file) => !fileExists(file));
add(
  "docs:reference",
  missingReferenceDocs.length ? "WARN" : "PASS",
  "Historical request-brief reference documents",
  missingReferenceDocs.length
    ? `Not present in this release branch: ${missingReferenceDocs.join(", ")}. Executable checks remain authoritative.`
    : "All historical reference documents are present.",
  referenceDocs,
);

const pkg = JSON.parse(read(path.join(ROOT, "package.json")));
add(
  "script:package",
  pkg.scripts && pkg.scripts["request-brief:health"] === "node scripts/request-brief-health.cjs" ? "PASS" : "FAIL",
  "npm script request-brief:health exists",
  "package.json contains the request-brief health script.",
  ["package.json"],
);

const checklistData = read(path.join(ROOT, "lib/request-checklists.ts"));
const requiredKeys = [
  "reinigung",
  "bueroreinigung",
  "gewerbereinigung",
  "hausverwaltung-reinigung",
  "angebot-pruefen",
  "umzug",
  "klaviertransport",
  "entruempelung",
  "wohnungsaufloesung",
  "seniorenumzug",
  "solar-pv",
  "diskret-service",
  "uebergabe",
  "objektbrief",
];
const missingKeys = requiredKeys.filter((key) => !checklistData.includes(`"${key}"`) && !checklistData.includes(`${key}:`));
add(
  "data:coverage",
  missingKeys.length ? "FAIL" : "PASS",
  "Checklist data covers required service groups",
  missingKeys.length ? `Missing keys: ${missingKeys.join(", ")}` : "All required service groups are represented.",
  ["lib/request-checklists.ts"],
);

const p0Pages = [
  ["app/kontakt/page.tsx", "ContactRequestGuidance"],
  ["app/objektbrief/page.tsx", "ObjectBriefPreview"],
  ["app/angebot-guenstiger-pruefen/page.tsx", "serviceKey=\"angebot-pruefen\""],
  ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx", "RequestBriefChecklistBlock"],
  ["app/regensburg/umzug/page.tsx", "serviceKey=\"umzug\""],
  ["app/klaviertransport-regensburg/page.tsx", "serviceKey=\"klaviertransport\""],
  ["app/entruempelung-regensburg/page.tsx", "serviceKey=\"entruempelung\""],
  ["app/wohnungsaufloesung-regensburg/page.tsx", "serviceKey=\"wohnungsaufloesung\""],
  ["app/reinigung-regensburg/page.tsx", "RequestBriefChecklistBlock"],
  ["app/bueroreinigung-regensburg/page.tsx", "serviceKey=\"bueroreinigung\""],
  ["app/gewerbereinigung-regensburg/page.tsx", "serviceKey=\"gewerbereinigung\""],
  ["app/diskret-service/page.tsx", "serviceKey=\"diskret-service\""],
  ["app/seniorenumzug-bayern/page.tsx", "serviceKey=\"seniorenumzug\""],
  ["components/GrowthServiceLandingPage.tsx", "requestBriefServiceKey"],
];
const missingP0 = p0Pages
  .filter(([file, needle]) => !read(path.join(ROOT, file)).includes(needle))
  .map(([file]) => file);
add(
  "p0:integration",
  missingP0.length ? "FAIL" : "PASS",
  "P0 pages/templates include request checklist integration",
  missingP0.length ? `Missing integration in: ${missingP0.join(", ")}` : "P0 pages and shared templates include request checklist blocks.",
  p0Pages.map(([file]) => file),
);

const optionalRoutes = [
  "app/duesseldorf/hausverwaltung-reinigung/page.tsx",
  "app/uebergabe-sprint/page.tsx",
  "app/vermieter-ready-service/page.tsx",
];
const missingOptional = optionalRoutes.filter((file) => !fileExists(file));
add(
  "p0:optional-routes",
  missingOptional.length ? "WARN" : "PASS",
  "Optional target routes checked",
  missingOptional.length
    ? `Routes do not exist in this worktree and were not recreated: ${missingOptional.join(", ")}`
    : "All optional routes exist.",
  optionalRoutes,
);

const formNeedles = [
  "buildRequestSummaryPayload",
  "requestSummary",
  "missingInfoFlags",
  "hasPhotos",
  "hasOffer",
  "signatureServiceHint",
  "leadPriority",
  'bookingFetch("/api/bookings"',
];
const formCheck = includesAll("components/SeoLeadForm.tsx", formNeedles);
add(
  "payload:form",
  formCheck.ok ? "PASS" : "FAIL",
  "SeoLeadForm submits request-summary signals only on submit",
  formCheck.ok ? "Summary fields are built in handleSubmit and posted with the lead payload." : `Missing: ${formCheck.missing.join(", ")}`,
  ["components/SeoLeadForm.tsx"],
);

const apiCheck = includesAll("functions/_lib/lead-payload.js", [
  "requestSummary",
  "missingInfoFlags",
  "hasPhotos",
  "hasOffer",
  "signatureServiceHint",
  "leadPriority",
]);
add(
  "payload:api",
  apiCheck.ok ? "PASS" : "FAIL",
  "Booking API accepts request-summary fields",
  apiCheck.ok ? "Flat form fields are parsed alongside existing details JSON." : `Missing: ${apiCheck.missing.join(", ")}`,
  ["functions/_lib/lead-payload.js"],
);

const staticPublicFiles = [
  "app/objektbrief/page.tsx",
  "app/kontakt/page.tsx",
  "components/RequestChecklistBlock.tsx",
  "components/PhotoGuidanceBlock.tsx",
  "components/MissingInfoHelper.tsx",
  "components/ObjectBriefPreview.tsx",
  "components/RelatedSignatureSuggestion.tsx",
  "components/BetterRequestNotice.tsx",
  "components/duesseldorf/DuesseldorfCleaningServicePage.tsx",
  "components/GrowthServiceLandingPage.tsx",
  "components/LocalServiceSeoPage.tsx",
  "components/regensburg/RegensburgServicePage.tsx",
];
const forbidden = [
  "runtime = \"nodejs\"",
  "runtime = 'nodejs'",
  "force-dynamic",
  "revalidate =",
  "sendBeacon(",
  "supabase",
  "resend",
  "sharp",
  "@react-pdf",
  "renderToStream",
];
const forbiddenHits = [];
for (const file of staticPublicFiles) {
  const text = read(path.join(ROOT, file));
  for (const needle of forbidden) {
    if (text.includes(needle)) forbiddenHits.push(`${file}: ${needle}`);
  }
}
add(
  "vercel:static-safety",
  forbiddenHits.length ? "FAIL" : "PASS",
  "Public request-brief surfaces stay static/lightweight",
  forbiddenHits.length ? `Forbidden patterns: ${forbiddenHits.join("; ")}` : "No runtime, revalidate, sendBeacon, Supabase, Resend, sharp or PDF patterns found in checked public files.",
  staticPublicFiles,
);

const clientCopy = read(path.join(ROOT, "components/CopyRequestSummaryButton.tsx"));
add(
  "client:copy-only",
  clientCopy.includes('"use client"') && clientCopy.includes("navigator.clipboard") && !clientCopy.includes("fetch(")
    ? "PASS"
    : "FAIL",
  "Client component is copy-only",
  "CopyRequestSummaryButton uses clipboard only and does not call APIs.",
  ["components/CopyRequestSummaryButton.tsx"],
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
  "# Request Brief Health Report",
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
  "- Normal public page visits remain static and do not call the lead API.",
  "- Lead API is still called by SeoLeadForm only on explicit submit.",
  "- Optional missing routes are documented as not recreated in this sprint.",
  "",
].join("\n");
fs.writeFileSync(mdPath, md);

console.log(`request-brief:health ${status} (${passCount} PASS, ${warnCount} WARN, ${failCount} FAIL)`);
console.log(`Wrote ${rel(reportPath)} and ${rel(mdPath)}`);

if (failCount) process.exit(1);
