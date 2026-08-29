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
  "docs/DISKRET_SERVICE_ROUTE_ARCHITECTURE.md",
  "docs/DISKRET_SERVICE_KEYWORD_INTENT_MAP.md",
  "docs/PRIVATE_CLIENT_SERVICE_POSITIONING_REPORT.md",
  "docs/DISKRET_SERVICE_CLUSTER_DIFFERENTIATION.md",
  "docs/DISKRET_SERVICE_LOCAL_INTEGRATION_REPORT.md",
  "docs/DISKRET_SERVICE_METADATA_SCHEMA_REPORT.md",
  "docs/DISKRET_SERVICE_INTERNAL_LINKING_REPORT.md",
  "docs/DISKRET_SERVICE_CONTENT_CLEANUP_REPORT.md",
];

const sources = {
  page: read("app/diskret-service/page.tsx"),
  privateClient: read("app/private-client-service/page.tsx"),
  contact: `${read("components/ContactQueryPersonalization.tsx")}\n${read("lib/booking/request-service-policy.js")}`,
  redirects: read("public/_redirects"),
  sitemapConfig: read("lib/sitemap-config.ts"),
  sitemapRoutes: read("lib/sitemap-routes.ts"),
  serviceInventory: read("lib/service-inventory.ts"),
  signatureSpecialServices: read("lib/signature-special-services.ts"),
  gscPriorities: read("lib/gsc-click-priorities.ts"),
  leadIntents: read("lib/lead-intents.ts"),
  packageJson: read("package.json"),
};

const publicSources = [sources.page, sources.privateClient, sources.contact].join("\n");
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

pass("route:primary", "Primary /diskret-service page exists", exists("app/diskret-service/page.tsx"));
pass("asset:hero", "Neutral Diskret-Service hero asset exists", exists("public/assets/diskret-service-hero.png"));
pass("metadata:primary", "Metadata title and description target Diskret-Service intent", includesAll(sources.page, [
  "Diskret-Service für sensible Anfragen",
  "Umzug, Entrümpelung und Auflösung",
  "Sensible Anfrage?",
]));
pass("h1:intent", "H1 targets sensible Diskret-Service request", includesAll(sources.page, [
  "Diskret-Service für sensible Anfragen",
  "Umzug, Entrümpelung und Auflösung zurückhaltend klären",
]));
pass("content:quick-answer", "Quick Answer block is visible", includesAll(sources.page, [
  "Kurz erklärt",
  "Der erste Schritt darf kurz bleiben.",
]));
pass("content:situations", "Sensitive case situations are visible", includesAll(sources.page, [
  "Trennung oder Scheidung",
  "Nachlass oder Todesfall",
  "diskrete Entruempelung",
  "Angebot wirkt unklar",
]));
pass("content:preferred-contact", "Preferred contact path is explicit", includesAll(sources.page, [
  "bevorzugten Kontaktweg",
  "Rueckmeldung ueber die gewuenschte Kontaktmoeglichkeit",
  "Kontaktweg",
]));
pass("content:minimal-details", "Minimal first-step detail policy is visible", includesAll(sources.page, [
  "Private Details sind im ersten Schritt nicht noetig.",
  "keine ausfuehrlichen privaten Details im ersten Schritt",
]));
pass("content:offer-check", "Offer-check CTA and text are visible", includesAll(sources.page, [
  "diskretes-angebot-pruefen",
  "Angebot diskret pruefen lassen",
  "Diskretes Angebot pruefen lassen",
]));
pass("content:boundaries", "No-false-promise boundary section is visible", includesAll(sources.page, [
  "keine Rechtsberatung",
  "keine Preisgarantie",
  "keine Soforttermin-Garantie",
  "keine automatische Buchung durch Anfrage",
]));
pass("content:service-links", "Related services are linked from the page", includesAll(sources.page, [
  "/diskreter-umzug-trennung-scheidung",
  "/regensburg/wohnungsaufloesung",
  "/private-client-service",
  "/angebot-guenstiger-pruefen",
]));
pass("content:local", "Regensburg and Duesseldorf local starts are present without doorway pages", includesAll(sources.page, [
  "Regensburg diskret starten",
  "Duesseldorf diskret starten",
  "ohne Fake-Niederlassung",
]));
pass("content:english", "English intent block is visible", includesAll(sources.page, [
  "Information in English",
  "Start discreet request in English",
]));
pass("faq:visible-schema", "FAQ is visible and backed by FAQ schema", includesAll(sources.page, [
  "FAQ",
  "buildFaqJsonLd(faqItems)",
  "Kann ich einen bevorzugten Kontaktweg waehlen?",
]));
pass("image:next-unoptimized", "Hero uses next/image without image optimization requirement", includesAll(sources.page, [
  "from \"next/image\"",
  "unoptimized",
  "/assets/diskret-service-hero.webp",
]));

pass("lead:path-mapping", "Lead intent maps /diskret-service directly", includesAll(sources.leadIntents, [
  "\"/diskret-service\"",
  "Diskreten Fall beschreiben",
  "sensible Anfrage, Ort, grober Umfang, bevorzugter Kontaktweg",
]));
pass("lead:conversion-target", "Lead conversion target includes /diskret-service", sources.leadIntents.includes('{ path: "/diskret-service", priorityPath: "/diskret-service" }'));
pass("contact:entry", "Contact page exposes Diskret-Service path and FAQ clarification", includesAll(sources.contact, [
  'id: "diskret-service"',
  'name: "FLOXANT Diskret-Service"',
  'leadService: "diskret-service"',
]));

pass("seo:gsc-entry", "GSC click priorities include /diskret-service as P0", includesAll(sources.gscPriorities, [
  "\"/diskret-service\"",
  "Diskret-Service fuer sensible Anfragen",
  "internalLinkAnchors: diskretServiceAnchors",
]));
pass("seo:private-client-separated", "Private Client priority is no longer the primary Diskret-Service target", includesAll(sources.gscPriorities, [
  "Private Client Service - sensible private Anfragen klar abstimmen",
  "primaryKeyword: \"private client service\"",
]));
pass("inventory:route", "Service inventory points Diskret-Service to /diskret-service", includesAll(sources.serviceInventory, [
  "FLOXANT Diskret-Service",
  "recommendedRoute: \"/diskret-service\"",
  "priority: \"P0\"",
]));
pass("signature:route", "Signature services point Diskret-Service to /diskret-service", includesAll(sources.signatureSpecialServices, [
  "FLOXANT Diskret-Service",
  "href: \"/diskret-service\"",
  "priority: \"A\"",
]));
pass("sitemap:config", "Sitemap config includes diskret-service", sources.sitemapConfig.includes("\"diskret-service\""));
warn("sitemap:generated", "Generated sitemap route list includes /diskret-service after seo:sitemap", sources.sitemapRoutes.includes("\"/diskret-service\""), "Run npm run seo:sitemap if this is WARN.");
pass("redirect:no-primary-redirect", "/diskret-service is not redirected away", !/^\/diskret-service\s+/m.test(sources.redirects));
pass("redirect:alias", "/diskreter-service redirects to /diskret-service", sources.redirects.includes("/diskreter-service /diskret-service 308"));

pass("private-client:positioning", "Private Client page links to Diskret-Service and states separation", includesAll(sources.privateClient, [
  "Private Client Service für sensible private Anfragen",
  "/diskret-service",
  "separaten Diskret-Service",
]));
pass("private-client:no-luxury-keywords", "Private Client page no longer carries luxury/residence keyword set", !/(Luxus|White-glove|Residenz|Anwesen|Luxury)/i.test(sources.privateClient));

pass("vercel:no-runtime-nodejs", "No runtime=nodejs on Diskret-Service public page", !/runtime\s*=\s*["']nodejs["']/.test(sources.page));
pass("vercel:no-force-dynamic", "No force-dynamic on Diskret-Service public page", !/dynamic\s*=\s*["']force-dynamic["']/.test(sources.page));
pass("vercel:no-revalidate", "No ISR revalidate on Diskret-Service public page", !/revalidate\s*=/.test(sources.page));
pass("vercel:no-api-fetch", "No automatic API fetch on Diskret-Service public page", !/fetch\(["']\/api|sendBeacon\(|\/api\/vitals|\/api\/conversion-events/.test(sources.page));
pass("claims:no-fake-review", "No fake rating or review schema in Diskret-Service sources", !/AggregateRating|ratingValue|\"Review\"|'Review'/.test(sources.page));
pass("claims:no-guarantee", "No positive guarantee language in Diskret-Service public copy", !/(100\s*%\s*garant|garantierte Ersparnis|Soforttermin garantiert|Preis wird garantiert|Verfuegbarkeit garantiert|Verfügbarkeit garantiert|rechtlich verbindlich)/i.test(publicSources));
pass("claims:no-medical-legal", "No medical, care or legal advice promise", !/(medizinische Beratung[^.\n]*(bieten|leisten)|Pflegeberatung[^.\n]*(bieten|leisten)|Rechtsberatung[^.\n]*(bieten|leisten|uebernehmen|übernehmen))/i.test(publicSources));
pass("claims:no-keyword-stuffing", "No visible keyword-cloud or doorway language", !/(Keyword-Wolke|keyword cloud|Short Keywords|Long-Tail Keywords|Doorway)/i.test(publicSources));

for (const doc of docs) {
  pass(`doc:${path.basename(doc)}`, `${doc} exists`, exists(doc));
}

pass("package:script", "npm script diskret-service:health exists", sources.packageJson.includes('"diskret-service:health": "node scripts/diskret-service-health.cjs"'));

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

const markdown = `# Diskret-Service Health Report

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

- WARN bei \`sitemap:generated\` bedeutet meistens nur, dass \`npm run seo:sitemap\` noch nicht nach der Codeaenderung gelaufen ist.
- Das Skript prueft statische Dateien und startet keinen Server.
`;

const json = {
  generatedAt,
  status: overallStatus,
  totals,
  checks,
};

fs.writeFileSync(absolute("DISKRET_SERVICE_HEALTH_REPORT.md"), markdown, "utf8");
fs.writeFileSync(absolute("diskret-service-health-report.json"), `${JSON.stringify(json, null, 2)}\n`, "utf8");

console.log(`Diskret-Service health: ${overallStatus} (${totals.pass} PASS, ${totals.warn} WARN, ${totals.fail} FAIL)`);

if (totals.fail > 0) {
  process.exitCode = 1;
}
