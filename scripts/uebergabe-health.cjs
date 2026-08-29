#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

function absolute(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const filePath = absolute(relativePath);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function exists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function includesAll(source, values) {
  return values.every((value) => (typeof value === "string" ? source.includes(value) : value.test(source)));
}

function escapeCell(value) {
  return String(value || "").replace(/\n/g, " ").replace(/\|/g, "\\|");
}

const docs = [
  "docs/UEBERGABE_ENDREINIGUNG_ROUTE_ARCHITECTURE.md",
  "docs/UEBERGABE_ENDREINIGUNG_KEYWORD_INTENT_MAP.md",
  "docs/REINIGUNG_NACH_ENTRUEMPELUNG_STRATEGY.md",
  "docs/VERMIETER_READY_POSITIONING_REPORT.md",
  "docs/UEBERGABE_SIGNATURE_SERVICES_REPORT.md",
  "docs/UEBERGABE_ENDREINIGUNG_LOCAL_INTEGRATION_REPORT.md",
  "docs/UEBERGABE_ENDREINIGUNG_METADATA_SCHEMA_REPORT.md",
  "docs/UEBERGABE_ENDREINIGUNG_INTERNAL_LINKING_REPORT.md",
  "docs/UEBERGABE_ENDREINIGUNG_CONTENT_CLEANUP_REPORT.md",
];

const sources = {
  page: read("app/regensburg/endreinigung/page.tsx"),
  config: read("lib/regensburg-service-pages.ts"),
  component: read("components/regensburg/RegensburgServicePage.tsx"),
  form: read("components/SeoLeadForm.tsx"),
  leadIntents: read("lib/lead-intents.ts"),
  nextConfig: read("next.config.js"),
  sitemapConfig: read("lib/sitemap-config.ts"),
  sitemapRoutes: read("lib/sitemap-routes.ts"),
  serviceInventory: read("lib/service-inventory.ts"),
  signatureSpecialServices: read("lib/signature-special-services.ts"),
  gscPriorities: read("lib/gsc-click-priorities.ts"),
  packageJson: read("package.json"),
};

const publicSources = [sources.page, sources.config, sources.component, sources.form, sources.leadIntents].join("\n");
const publicSourcesWithoutNegativeGuarantees = publicSources.replace(/Keine\s+garantierte\s+Kautionszusage\./gi, "");
const checks = [];

function add(id, label, status, details = "") {
  checks.push({ id, label, status, details });
}

function pass(id, label, condition, details = "") {
  add(id, label, condition ? "PASS" : "FAIL", details);
}

function warn(id, label, condition, details = "") {
  add(id, label, condition ? "PASS" : "WARN", details);
}

pass("route:primary", "Primary /regensburg/endreinigung app route exists", exists("app/regensburg/endreinigung/page.tsx"));
pass("route:static-wrapper", "Endreinigung route uses static Regensburg service wrapper", includesAll(sources.page, [
  "getRegensburgServicePage(\"endreinigung\")",
  "RegensburgServicePage",
  "alternates",
  "canonical: config.path",
]));
pass("metadata:intent", "Metadata targets end cleaning and handover intent", includesAll(sources.config, [
  "Endreinigung vor Übergabe in Regensburg",
  "Übergabe & Auszug vorbereiten",
  "nach Auszug oder Entrümpelung",
]));
pass("content:vermieter-ready", "Vermieter-Ready positioning is visible", includesAll(sources.config + sources.component, [
  "Vermieter-Ready-Service",
  "Vermieter-Ready",
  "/vermieter-ready-service",
]));
pass("content:handover-sprint", "Uebergabe-Sprint is integrated", includesAll(sources.config + sources.component, [
  "Übergabe-Sprint",
  "/uebergabe-sprint",
]));
pass("content:objektbrief-akte", "Objektbrief and Uebergabeakte are linked", includesAll(sources.config + sources.component, [
  "/objektbrief",
  "/uebergabeakte",
  "Objektbrief",
  "Übergabeakte",
]));
pass("content:post-clearance", "Reinigung nach Entruempelung is explicitly covered", includesAll(sources.config + sources.component, [
  "Reinigung nach Entrümpelung",
  "nach Entrümpelung",
  "Restmengen",
]));
pass("content:effort-factors", "Effort factors are present for handover cleaning", includesAll(sources.component, [
  "endCleaningEffortFactors",
  "Fläche, Raumanzahl, Objektart und Etage",
  "Schlüsselweg, Zugang, Parken",
]));
pass("content:legal-boundaries", "No-false-promise boundaries are visible", includesAll(sources.config + sources.component, [
  "Keine Abnahme-, Kautions- oder Rechtsgarantie.",
  "keine Wohnungsabnahme",
  "keine Rechtsberatung",
]));
pass("content:english-intent", "English end-of-tenancy intent is visible", includesAll(sources.component + sources.gscPriorities, [
  "Information in English",
  "end of tenancy cleaning",
  "move-out cleaning",
]));
pass("content:offer-check", "Offer-check CTA and intent are wired", includesAll(sources.component + sources.config + sources.leadIntents, [
  "/angebot-guenstiger-pruefen",
  "uebergabe-angebot-pruefen",
  "Angebotsprüfung",
]));

pass("lead:path-mapping", "Lead intent maps handover/end-cleaning routes", includesAll(sources.leadIntents, [
  "\"/regensburg/endreinigung\"",
  "endreinigung-wohnungsuebergabe",
  "\"/vermieter-ready-service\"",
  "\"/uebergabe-sprint\"",
  "\"/uebergabeakte\"",
  "\"/objektbrief\"",
]));
pass("lead:form-copy", "Lead form has handover-specific title, intro and placeholder", includesAll(sources.leadIntents, [
  "buildHandoverCleaningCopy",
  "Endreinigung vor Übergabe",
  "Vermieter-Ready-Fall",
]));
pass("lead:optional-fields", "SeoLeadForm exposes optional handover fields", includesAll(sources.form, [
  "handoverSituationOptions",
  "handoverConditionOptions",
  "handoverExtraNeedOptions",
  "handoverExtraNeeds",
  "handoverKeyAccess",
]));
pass("lead:payload", "SeoLeadForm sends optional handover fields in payload and details", includesAll(sources.form, [
  "payload.set(\"handoverSituation\"",
  "payload.set(\"handoverCondition\"",
  "payload.set(\"handoverDeadline\"",
  "payload.set(\"handoverExtraNeeds\"",
]));
pass("lead:conversion-target", "Lead conversion targets include endreinigung and signature support routes", includesAll(sources.leadIntents, [
  "{ path: \"/regensburg/endreinigung\", priorityPath: \"/regensburg/endreinigung\" }",
  "{ path: \"/vermieter-ready-service\", priorityPath: \"/vermieter-ready-service\" }",
  "{ path: \"/uebergabe-sprint\", priorityPath: \"/uebergabe-sprint\" }",
]));

pass("seo:gsc-entry", "GSC click priorities include /regensburg/endreinigung as P0", includesAll(sources.gscPriorities, [
  "\"/regensburg/endreinigung\"",
  "endCleaningRegensburgAnchors",
  "endreinigung regensburg",
]));
pass("seo:gsc-money-page", "SEO money page monitoring includes /regensburg/endreinigung", includesAll(sources.gscPriorities, [
  "{ path: \"/regensburg/endreinigung\", priorityPath: \"/regensburg/endreinigung\" }",
  "Endreinigung vor Uebergabe",
]));
pass("inventory:signature", "Service inventory and signature services know Vermieter-Ready and Uebergabe-Sprint", includesAll(sources.serviceInventory + sources.signatureSpecialServices, [
  "floxant-vermieter-ready-service",
  "floxant-uebergabe-sprint",
  "/vermieter-ready-service",
  "/uebergabe-sprint",
]));
pass("sitemap:source", "Sitemap sources include endreinigung and signature support routes", includesAll(sources.sitemapRoutes + sources.sitemapConfig, [
  "\"/regensburg/endreinigung\"",
  "\"/vermieter-ready-service\"",
  "\"/uebergabe-sprint\"",
  "\"uebergabeakte\"",
]));

pass("vercel:no-runtime-nodejs", "No runtime=nodejs on edited public route/component/form", !/runtime\s*=\s*["']nodejs["']/.test(publicSources));
pass("vercel:no-force-dynamic", "No force-dynamic on edited public route/component/form", !/dynamic\s*=\s*["']force-dynamic["']/.test(publicSources));
pass("vercel:no-revalidate", "No ISR revalidate on edited public route/component/form", !/revalidate\s*=/.test(publicSources));
pass("vercel:no-api-page-load", "No automatic API fetch added to edited public page/component", !/fetch\(["']\/api|sendBeacon\(|\/api\/vitals|\/api\/conversion-events/.test(sources.page + sources.config + sources.component));
pass("claims:no-fake-review", "No fake rating or review schema in edited sources", !/AggregateRating|ratingValue|\"Review\"|'Review'/.test(publicSources));
pass("claims:no-positive-guarantee", "No positive guarantee language for acceptance, deposit, price or instant dates", !/(garantierte\s+(Abnahme|Kaution|Ersparnis|Kautionsrückzahlung)|Abnahme\s+wird\s+garantiert|Kaution\s+wird\s+garantiert|Soforttermin\s+wird\s+garantiert|Preis\s+wird\s+garantiert|Verfügbarkeit\s+wird\s+garantiert)/i.test(publicSourcesWithoutNegativeGuarantees));
pass("claims:no-legal-advice-promise", "No legal advice promise", !/(Rechtsberatung[^.\n]*(bieten|leisten|übernehmen|garantieren))/i.test(publicSources));
pass("claims:no-doorway", "No doorway/keyword-stuffing markers", !/(Keyword-Wolke|keyword cloud|Short Keywords|Long-Tail Keywords|Doorway|Fake-Niederlassung)/i.test(publicSources));

for (const doc of docs) {
  pass(`doc:${path.basename(doc)}`, `${doc} exists`, exists(doc));
}

pass("package:script", "npm script uebergabe:health exists", sources.packageJson.includes('"uebergabe:health": "node scripts/uebergabe-health.cjs"'));
warn("worktree:docs-static", "Healthcheck is static and does not verify visual layout", true, "Browser and build checks remain separate.");

const totals = {
  pass: checks.filter((check) => check.status === "PASS").length,
  warn: checks.filter((check) => check.status === "WARN").length,
  fail: checks.filter((check) => check.status === "FAIL").length,
};
const overallStatus = totals.fail > 0 ? "FAIL" : totals.warn > 0 ? "WARN" : "PASS";
const generatedAt = new Date().toISOString();
const rows = checks
  .map((check) => `| ${check.status} | ${check.id} | ${escapeCell(check.label)} | ${escapeCell(check.details)} |`)
  .join("\n");

const markdown = `# Uebergabe Endreinigung Health Report

Stand: ${generatedAt}

Gesamtstatus: ${overallStatus}

| Status | Check | Ergebnis | Details |
| --- | --- | --- | --- |
${rows}

## Zusammenfassung

- PASS: ${totals.pass}
- WARN: ${totals.warn}
- FAIL: ${totals.fail}

## Hinweise

- Das Skript prueft statische Dateien und startet keinen Server.
- Visuelle QA, Build, Typecheck und SEO-/Lead-Health bleiben separate Abschlusspruefungen.
`;

const json = {
  generatedAt,
  status: overallStatus,
  totals,
  checks,
};

fs.writeFileSync(absolute("UEBERGABE_ENDREINIGUNG_HEALTH_REPORT.md"), markdown, "utf8");
fs.writeFileSync(absolute("uebergabe-health-report.json"), `${JSON.stringify(json, null, 2)}\n`, "utf8");

console.log(`Uebergabe/Endreinigung health: ${overallStatus} (${totals.pass} PASS, ${totals.warn} WARN, ${totals.fail} FAIL)`);

if (totals.fail > 0) {
  process.exitCode = 1;
}
