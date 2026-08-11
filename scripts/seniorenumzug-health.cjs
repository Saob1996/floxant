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

const docs = [
  "docs/SENIORENUMZUG_ROUTE_ARCHITECTURE.md",
  "docs/SENIORENUMZUG_KEYWORD_INTENT_MAP.md",
  "docs/SENIORENUMZUG_UMZUG_IM_ALTER_DIFFERENTIATION.md",
  "docs/SENIORENUMZUG_LOCAL_PAGE_REVIEW.md",
  "docs/SENIORENUMZUG_COMBINED_SERVICES_REPORT.md",
  "docs/SENIORENUMZUG_METADATA_SCHEMA_REPORT.md",
  "docs/SENIORENUMZUG_INTERNAL_LINKING_REPORT.md",
  "docs/SENIORENUMZUG_CONTENT_CLEANUP_REPORT.md",
];

const sources = {
  primaryPage: read("app/seniorenumzug-bayern/page.tsx"),
  components: read("components/seniorenumzug/SeniorMoveSections.tsx"),
  form: read("components/SeoLeadForm.tsx"),
  seo: read("lib/seo.ts"),
  sitemap: read("lib/sitemap-routes.ts"),
  nextConfig: read("next.config.js"),
  navigation: `${read("lib/service-navigation.ts")}\n${read("lib/floxant-services.ts")}\n${read("components/ContactPathChooser.tsx")}`,
  offerCheck: `${read("app/angebot-guenstiger-pruefen/page.tsx")}\n${read("app/angebotscheck/page.tsx")}`,
  localPages: `${read("app/seniorenumzug-regensburg/page.tsx")}\n${read("app/seniorenumzug-landshut/page.tsx")}\n${read("app/seniorenumzug-nuernberg/page.tsx")}`,
  packageJson: read("package.json"),
};

const checkedPublicSources = [
  sources.primaryPage,
  sources.components,
  sources.localPages,
  sources.navigation,
  sources.offerCheck,
].join("\n");

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

pass("route:primary", "Primary Seniorenumzug page exists", exists("app/seniorenumzug-bayern/page.tsx"));
pass("route:umzug-im-alter-alias", "Umzug-im-Alter aliases redirect to Seniorenumzug routes", includesAll(sources.nextConfig, [
  "['/umzug-im-alter-bayern', '/seniorenumzug-bayern']",
  "['/umzug-im-alter-erlangen', '/seniorenumzug-erlangen']",
  "['/umzug-im-alter-bamberg', '/seniorenumzug-bamberg']",
  "['/umzug-im-alter-wuerzburg', '/seniorenumzug-wuerzburg']",
]));
pass("h1:primary", "H1 contains Seniorenumzug and structured request intent", sources.components.includes("Seniorenumzug strukturiert anfragen - mit Angehörigen"));
pass("metadata:title-description", "Title and description are present", includesAll(sources.primaryPage, [
  "Seniorenumzug anfragen - Umzug, Umfang und Übergabe klären",
  "Seniorenumzug geplant? Start, Ziel, Umfang, Termin",
]));
pass("canonical:hub", "/seniorenumzug canonicalizes to /seniorenumzug-bayern", sources.seo.includes('"/seniorenumzug": "/seniorenumzug-bayern"'));
pass("sitemap:primary", "Sitemap contains primary Seniorenumzug hub", sources.sitemap.includes('"/seniorenumzug-bayern"'));
pass("sitemap:no-umzug-im-alter", "Sitemap does not list Umzug-im-Alter aliases", !/\"\/umzug-im-alter-/.test(sources.sitemap));
warn("sitemap:seniorenumzug-support", "/seniorenumzug is not treated as a second primary route", !sources.sitemap.includes('"/seniorenumzug"'), "If present, it is documented as canonical support risk.");
pass("cta:primary", "Hero CTA points to Seniorenumzug contact flow", sources.components.includes("/kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=website"));
pass("cta:offer-check", "Seniorenumzug offer-check CTA is present", sources.components.includes("seniorenumzug-angebot-pruefen") && sources.offerCheck.includes("Seniorenumzug"));
pass("cta:discreet", "Discreet Seniorenumzug CTA is present", sources.components.includes("seniorenumzug-diskret") && sources.components.includes("diskret-service"));
pass("content:quick-answer", "Quick Answer is visible", includesAll(sources.components, ["Quick Answer", "Eine Anfrage ist noch keine Buchung"]));
pass("content:situations", "Customer situations are visible", includesAll(sources.components, [
  "Umzug in kleinere Wohnung",
  "Angehörige organisieren mit",
  "Betreutes Wohnen oder Pflegeumfeld",
  "Wohnung danach räumen",
]));
pass("content:effort-factors", "Effort factors are visible", includesAll(sources.components, [
  "Aufwandstreiber",
  "Etage, Aufzug und Laufweg",
  "Angehörigenkoordination",
  "Terminwunsch, Frist und Flexibilität",
]));
pass("content:needed-data", "What FLOXANT needs is visible", includesAll(sources.components, [
  "Startort und Zielort",
  "bevorzugter Kontaktweg",
  "vorhandenes Angebot optional",
]));
pass("content:no-promises", "Visible boundary section is present", includesAll(sources.components, [
  "keine Pflegeleistung",
  "keine medizinische Beratung",
  "keine Rechtsberatung",
  "keine Preisgarantie",
  "keine Soforttermin-Garantie",
  "keine garantierte Verfügbarkeit",
  "keine automatische Buchung durch Anfrage",
]));
pass("faq:visible", "Seniorenumzug FAQ is visible and schema source exists", sources.components.includes("SeniorMoveFAQ") && sources.primaryPage.includes("buildFaqJsonLd(seniorMoveFaqItems)"));
pass("ai:answer", "AI Answer block is present", includesAll(sources.components, ["AI Answer", "Was gehört in eine gute Anfrage für Seniorenumzug"]));
pass("links:combined-services", "Entruempelung, Reinigung, Diskret-Service, Objektbrief and Uebergabe links are present", includesAll(sources.components, [
  "/regensburg/entruempelung",
  "/regensburg/reinigung",
  "/diskreter-umzug-trennung-scheidung",
  "/objektbrief",
  "/uebergabeakte",
  "/uebergabe-sprint",
]));
pass("links:navigation", "Navigation and footer expose Seniorenumzug without link spam", includesAll(sources.navigation, [
  "serviceKey: \"seniorenumzug\"",
  "Seniorenumzug",
  "/seniorenumzug-bayern",
]));
pass("local:reviewed-pages", "Existing physical local pages received support blocks", includesAll(sources.localPages, [
  "LocalSeniorMoveSupport city=\"Regensburg\"",
  "LocalSeniorMoveSupport city=\"Landshut\"",
  "LocalSeniorMoveSupport city=\"Nuernberg\"",
]));
pass("form:optional-fields", "Seniorenumzug optional fields exist in contact form", includesAll(sources.form, [
  "seniorRequesterRole",
  "seniorStartLocation",
  "seniorDestination",
  "seniorStartFloor",
  "seniorDestinationFloor",
  "seniorElevator",
  "seniorScope",
  "seniorExtraNeeds",
  "seniorDeadline",
  "seniorExistingOffer",
  "seniorSensitiveSituation",
]));
pass("form:success-copy", "Seniorenumzug success copy is specific", sources.form.includes("Ihre Anfrage zum Seniorenumzug wurde gesendet"));
pass("english:intent", "English senior moving intent is present", includesAll(sources.components, [
  "Senior moving request in simple English",
  "english-senior-moving-request",
]));
pass("schema:no-fake-rating", "No fake rating or review schema in Seniorenumzug sources", !/AggregateRating|ratingValue|\"Review\"|'Review'/.test(`${sources.primaryPage}\n${sources.components}`));
pass("safety:no-price-guarantee", "No positive price guarantee", !/(mit Preisgarantie|Preisgarantie (geben|bieten|garantieren)|(?<!keine )(?<!ohne )garantierte Ersparnis|Ersparnisgarantie (geben|bieten|garantieren)|Preis wird garantiert|Ersparnis wird garantiert)/i.test(checkedPublicSources));
pass("safety:no-care-promise", "No care or medical service promise", !/(Pflegeleistung[^.\n]*(uebernehmen|bieten)|medizinische Beratung[^.\n]*(bieten|leisten)|Pflegeberatung[^.\n]*(bieten|leisten))/i.test(checkedPublicSources));
pass("safety:no-legal-advice", "No legal advice promise", !/(Rechtsberatung[^.\n]*(bieten|leisten|uebernehmen)|rechtlich verbindlich)/i.test(checkedPublicSources));
pass("safety:no-keyword-cloud", "No visible keyword cloud", !/Keyword-Wolke|keyword cloud|Short Keywords|Long-Tail Keywords/i.test(checkedPublicSources));
pass("safety:no-doorway-created", "No new Umzug-im-Alter physical pages were created", !exists("app/umzug-im-alter-bayern/page.tsx") && !exists("app/umzug-im-alter-erlangen/page.tsx"));
pass("vercel:no-runtime-nodejs", "No runtime=nodejs on Seniorenumzug public pages", !/runtime\s*=\s*["']nodejs["']/.test(checkedPublicSources));
pass("vercel:no-force-dynamic", "No force-dynamic on Seniorenumzug public pages", !/dynamic\s*=\s*["']force-dynamic["']/.test(checkedPublicSources));
pass("vercel:no-revalidate", "No ISR revalidate on Seniorenumzug public pages", !/revalidate\s*=/.test(checkedPublicSources));
pass("vercel:no-auto-api", "No automatic API fetch or beacon patterns added", !/useEffect\(\s*\(\)\s*=>\s*fetch\(["']\/api|sendBeacon\(|\/api\/vitals|\/api\/conversion-events/.test(checkedPublicSources));

for (const doc of docs) {
  pass(`doc:${path.basename(doc)}`, `${doc} exists`, exists(doc));
}

pass("package:script", "npm script seniorenumzug:health exists", sources.packageJson.includes('"seniorenumzug:health": "node scripts/seniorenumzug-health.cjs"'));

const totals = {
  pass: checks.filter((check) => check.status === "PASS").length,
  warn: checks.filter((check) => check.status === "WARN").length,
  fail: checks.filter((check) => check.status === "FAIL").length,
};
const overallStatus = totals.fail > 0 ? "FAIL" : totals.warn > 0 ? "WARN" : "PASS";
const generatedAt = new Date().toISOString();
const rows = checks
  .map((check) => `| ${check.status} | ${check.id} | ${check.label} | ${String(check.details || "").replace(/\|/g, "\\|")} |`)
  .join("\n");
const markdown = `# Seniorenumzug Health Report

Generated: ${generatedAt}

Overall status: **${overallStatus}**

| Metric | Count |
| --- | ---: |
| PASS | ${totals.pass} |
| WARN | ${totals.warn} |
| FAIL | ${totals.fail} |

| Status | ID | Check | Details |
| --- | --- | --- | --- |
${rows}
`;

const report = { generatedAt, overallStatus, totals, docs, checks };
fs.writeFileSync(absolute("SENIORENUMZUG_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(absolute("seniorenumzug-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Seniorenumzug health: ${overallStatus} (${totals.pass} pass, ${totals.warn} warn, ${totals.fail} fail)`);
console.log("Wrote SENIORENUMZUG_HEALTH_REPORT.md and seniorenumzug-health-report.json");

if (totals.fail > 0) process.exit(1);
