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
  return values.every((value) => source.includes(value));
}

const docs = [
  "docs/SOLARREINIGUNG_PV_ROUTE_ARCHITECTURE.md",
  "docs/SOLARREINIGUNG_PV_KEYWORD_INTENT_MAP.md",
  "docs/SOLARREINIGUNG_PV_DIFFERENTIATION_REPORT.md",
  "docs/SOLARREINIGUNG_DUAL_LOCATION_REPORT.md",
  "docs/SOLARREINIGUNG_PV_METADATA_SCHEMA_REPORT.md",
  "docs/SOLARREINIGUNG_PV_INTERNAL_LINKING_REPORT.md",
  "docs/SOLARREINIGUNG_PV_CONTENT_CLEANUP_REPORT.md",
];

const checks = [];

function add(id, label, passed, details = "") {
  checks.push({ id, label, status: passed ? "PASS" : "FAIL", details });
}

const growth = read("lib/growth-service-pages.ts");
const renderer = read("components/GrowthServiceLandingPage.tsx");
const form = read("components/ProfessionalRequestForm.tsx");
const sitemap = read("lib/sitemap-routes.ts");
const packageJson = read("package.json");
const nextConfig = read("next.config.js");
const offerCheck = `${read("app/angebot-guenstiger-pruefen/page.tsx")}\n${read("app/angebotscheck/page.tsx")}`;
const hubs = `${read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx")}\n${read("app/reinigung-regensburg/page.tsx")}`;
const source = [growth, renderer, form, offerCheck, read("scripts/generate-sitemap-routes.js")].join("\n");

add("route:solarreinigung", "/solarreinigung route exists", exists("app/solarreinigung/page.tsx"));
add("route:pv", "/pv-anlagen-reinigung route exists", exists("app/pv-anlagen-reinigung/page.tsx"));
add("route:regensburg-solar", "/regensburg/solarreinigung route exists", exists("app/regensburg/solarreinigung/page.tsx"));
add(
  "content:solar",
  "Solarreinigung page has required authority markers",
  includesAll(growth, [
    "Solarreinigung anfragen - Zugang, Dachart und Verschmutzung klären",
    "Dachart",
    "Zugang",
    "Modulfläche",
    "sichtbare Verschmutzung",
    "Solarreinigungsangebot prüfen",
    "solar panel cleaning",
  ]),
);
add(
  "content:pv",
  "PV page has required authority markers",
  includesAll(growth, [
    "PV-Anlagen-Reinigung anfragen - Modulfläche, Zugang und Zustand klären",
    "Modulfläche",
    "Dachart",
    "PV-Reinigungsangebot",
    "keine Ertrags",
    "solar panel cleaning",
  ]),
);
add(
  "template:solar-modules",
  "Solar/PV template renders quick answer, offer check and differentiation",
  includesAll(renderer, [
    "function SolarPvAuthorityPanel",
    "Kurz erklärt",
    "Solarreinigungsangebot prüfen lassen",
    "function SolarPvDifferentiation",
    "keine Ertragsgarantie",
  ]),
);
add(
  "form:solar-fields",
  "Solar/PV optional form fields are present",
  includesAll(form, [
    "objectType",
    "areaSize",
    "condition",
    "accessPath",
    "desiredDate",
    "selectedAddons",
    "message",
  ]),
);
add(
  "form:solar-success",
  "Honest request success copy is present",
  includesAll(form, ["Ihre Anfrage ist eingegangen", "kein Auftrag", "kein automatisch bestätigter Termin"]),
);
add(
  "form:no-load-api",
  "Lead API remains submit-only",
  form.includes('onSubmit={handleSubmit}') &&
    form.includes('bookingFetch("/api/bookings"') &&
    !/useEffect\s*\([^)]*(?:bookingFetch|fetch)\(["']\/api/s.test(form),
);
for (const doc of docs) add(`doc:${path.basename(doc)}`, `${doc} exists`, exists(doc));
add(
  "package:script",
  "npm script solar-pv:health exists",
  packageJson.includes('"solar-pv:health": "node scripts/solar-pv-health.cjs"'),
);
add(
  "sitemap:primary",
  "Sitemap contains primary solar/PV routes",
  ["/solarreinigung", "/pv-anlagen-reinigung", "/regensburg/solarreinigung"].every((route) =>
    sitemap.includes(`"${route}"`),
  ),
);
add(
  "redirect:duesseldorf-solar",
  "/duesseldorf/solarreinigung is not a competing route",
  nextConfig.includes("'/duesseldorf/solarreinigung'") || !exists("app/duesseldorf/solarreinigung/page.tsx"),
);
add(
  "offer-check:solar",
  "Offer-check pages contain solar/PV offer-check intent",
  /Solarreinigung|PV/.test(offerCheck) && /solarreinigung-angebot-pruefen/.test(offerCheck),
);
add(
  "local-hubs:solar",
  "Duesseldorf and Regensburg hubs expose solar/PV support",
  /solarreinigung-duesseldorf/.test(hubs) &&
    /Solarreinigung Regensburg/.test(hubs) &&
    /solar panel cleaning/i.test(hubs),
);
add(
  "english:intent",
  "English solar panel cleaning intent is present",
  /solar panel cleaning/i.test(source),
);
add(
  "schema:no-fake-rating",
  "No fake rating/review schema markers in sprint source",
  !/AggregateRating|["@']Review["@']/i.test(source),
);
add(
  "content:no-fake-claims",
  "No fake yield, price, certificate or safety guarantees in sprint source",
  !/Ertragssteigerung wird garantiert|garantierte Ertragssteigerung|Ertragsgarantie garantiert|Sicherheitsgarantie|TÜV-geprüft|TUEV-geprueft|ISO 9001|garantiert günstiger/i.test(source),
);
add(
  "content:no-keyword-cloud",
  "No keyword cloud or hidden keyword pattern found",
  !/keyword[-_\s]?cloud|hidden keyword|display:\s*none[^;]*(solarreinigung|pv)/i.test(source),
);
add(
  "vercel:safety",
  "No Vercel-sensitive public-page patterns added in solar/PV sprint files",
  [
    'runtime = "nodejs"',
    "runtime = 'nodejs'",
    "force-dynamic",
    "revalidate =",
    "/api/vitals",
    "/api/conversion-events",
    "sendBeacon",
  ].every((pattern) => !source.includes(pattern)),
);

const totals = {
  pass: checks.filter((check) => check.status === "PASS").length,
  fail: checks.filter((check) => check.status === "FAIL").length,
};
const overallStatus = totals.fail > 0 ? "FAIL" : "PASS";
const generatedAt = new Date().toISOString();
const rows = checks
  .map((check) => `| ${check.status} | ${check.id} | ${check.label} | ${String(check.details).replace(/\|/g, "\\|")} |`)
  .join("\n");
const markdown = `# Solar PV Health Report

Generated: ${generatedAt}

Overall status: **${overallStatus}**

| Metric | Count |
| --- | ---: |
| PASS | ${totals.pass} |
| FAIL | ${totals.fail} |

| Status | ID | Check | Details |
| --- | --- | --- | --- |
${rows}
`;

const report = { generatedAt, overallStatus, totals, docs, checks };
fs.writeFileSync(absolute("SOLAR_PV_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(absolute("solar-pv-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Solar/PV health: ${overallStatus} (${totals.pass} pass, ${totals.fail} fail)`);
console.log("Wrote SOLAR_PV_HEALTH_REPORT.md and solar-pv-health-report.json");

if (totals.fail > 0) process.exit(1);
