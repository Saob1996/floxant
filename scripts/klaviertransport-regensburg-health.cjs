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
  "docs/KLAVIERTRANSPORT_REGENSBURG_ROUTE_ARCHITECTURE.md",
  "docs/KLAVIERTRANSPORT_REGENSBURG_KEYWORD_INTENT_MAP.md",
  "docs/KLAVIERTRANSPORT_MOEBELTRANSPORT_UMZUG_DIFFERENTIATION.md",
  "docs/KLAVIERTRANSPORT_RUECKFAHRT_BEILADUNG_REPORT.md",
  "docs/KLAVIERTRANSPORT_REGENSBURG_LOCAL_RELEVANCE_REPORT.md",
  "docs/KLAVIERTRANSPORT_REGENSBURG_METADATA_SCHEMA_REPORT.md",
  "docs/KLAVIERTRANSPORT_REGENSBURG_INTERNAL_LINKING_REPORT.md",
  "docs/KLAVIERTRANSPORT_REGENSBURG_CONTENT_CLEANUP_REPORT.md",
];

const checks = [];

function add(id, label, passed, details = "") {
  checks.push({ id, label, status: passed ? "PASS" : "FAIL", details });
}

const page = read("app/klaviertransport-regensburg/page.tsx");
const generalPage = read("app/klaviertransport/page.tsx");
const moveHub = read("app/regensburg/umzug/page.tsx");
const form = read("components/SeoLeadForm.tsx");
const leadIntents = read("lib/lead-intents.ts");
const sitemap = read("lib/sitemap-routes.ts");
const packageJson = read("package.json");
const offerCheck = `${read("app/angebot-guenstiger-pruefen/page.tsx")}\n${read("app/angebotscheck/page.tsx")}`;
const source = [page, generalPage, moveHub, form, leadIntents, offerCheck].join("\n");

add("route:primary", "/klaviertransport-regensburg route exists", exists("app/klaviertransport-regensburg/page.tsx"));
add(
  "content:h1",
  "H1 contains Klaviertransport and Regensburg",
  page.includes("Klaviertransport in Regensburg anfragen - Etage, Zugang und Termin"),
);
add(
  "metadata:title-description",
  "Title and description are present",
  page.includes("Klaviertransport Regensburg - Etage, Zugang und Termin") &&
    page.includes("Instrumentart, Etage, Treppenhaus, Zugang und Termin"),
);
add("canonical:path", "Canonical path constant is primary route", page.includes('const path = "/klaviertransport-regensburg"'));
add("sitemap:primary", "Sitemap contains primary route", sitemap.includes('"/klaviertransport-regensburg"'));
add(
  "sitemap:no-moebel-regensburg-duplicate",
  "No competing /moebeltransport-regensburg sitemap route",
  !sitemap.includes('"/moebeltransport-regensburg"'),
);
add(
  "cta:primary",
  "Hero CTA points to klaviertransport Regensburg contact flow",
  page.includes('service="klaviertransport"') &&
    page.includes('city="regensburg"') &&
    page.includes('intent="klaviertransport-regensburg"'),
);
add(
  "cta:offer-check",
  "Klaviertransport offer-check CTA is present",
  page.includes("klaviertransport-angebot-pruefen") && offerCheck.includes("klaviertransport-angebot-pruefen"),
);
add("faq:visible", "FAQ is visible and expanded", page.includes("Häufige Fragen zum Klaviertransport in Regensburg") && page.includes("Can I ask in English?"));
add("ai:quick-answer", "Quick Answer block is present", page.includes("Quick Answer") && page.includes("Eine Anfrage ist noch keine Buchung"));
add(
  "content:effort-factors",
  "Effort factors are visible",
  includesAll(page, ["Aufwandstreiber", "Instrumentart und Bauform", "Etage an Start und Ziel", "Treppenhausbreite"]),
);
add(
  "content:instrument-access",
  "Instrument, floor and access are explained",
  includesAll(page, ["Instrumentart", "Etage", "Treppenhaus", "Aufzug", "Zugang"]),
);
add("link:umzug", "Umzug Regensburg link present", page.includes('href: "/regensburg/umzug"') || page.includes('href="/regensburg/umzug"'));
add(
  "link:backhaul",
  "Rueckfahrt/Beiladung link or section present",
  page.includes("Rückfahrt / Beiladung") && page.includes('href="/leerfahrt-rueckfahrt"') && page.includes("rueckfahrt-beiladung-regensburg"),
);
add(
  "form:piano-fields",
  "Piano optional form fields are present",
  includesAll(form, [
    "isPianoTransport",
    "pianoInstrumentType",
    "pianoStartLocation",
    "pianoDestination",
    "pianoStartFloor",
    "pianoDestinationFloor",
    "pianoElevator",
    "pianoNarrowStairs",
    "pianoExistingOffer",
    "pianoConcern",
  ]),
);
add(
  "form:piano-success",
  "Piano success copy is present",
  form.includes("Ihre Anfrage zum Klaviertransport wurde gesendet"),
);
add(
  "lead:moebeltransport",
  "Moebeltransport contact service is normalized",
  leadIntents.includes('| "moebeltransport"') &&
    leadIntents.includes('return "moebeltransport";') &&
    leadIntents.includes('if (normalized === "moebeltransport") return "transport";'),
);
for (const doc of docs) add(`doc:${path.basename(doc)}`, `${doc} exists`, exists(doc));
add(
  "package:script",
  "npm script klaviertransport-regensburg:health exists",
  packageJson.includes('"klaviertransport-regensburg:health": "node scripts/klaviertransport-regensburg-health.cjs"'),
);
add(
  "english:intent",
  "English piano transport intent is present",
  /piano transport in Regensburg|Piano transport in Regensburg|Can I ask in English/i.test(source),
);
add(
  "safety:no-price-guarantee",
  "No positive price guarantee claim",
  !/garantiert g.nstig|preisgarantie[^.\n]*(ja|geben|bieten|sichern)|fester preis garantiert/i.test(source),
);
add(
  "safety:no-sofort-guarantee",
  "No positive immediate appointment guarantee",
  !/soforttermin[^.\n]*(garantiert|sicher)|garantierte sofort/i.test(source),
);
add(
  "safety:no-damage-guarantee",
  "No positive damage-free guarantee",
  !/sch.denfreiheit[^.\n]*(garantiert|sicher)|garantiert ohne schaden/i.test(source),
);
add(
  "safety:no-fake-claims",
  "No fake ratings or invented specialist equipment markers",
  !/AggregateRating|["@']Review["@']|TUEV|TÜV|ISO 9001|Spezialkran|Klavierroboter|garantierte Spezialausruestung/i.test(source),
);
add(
  "safety:no-keyword-cloud",
  "No keyword cloud or hidden keyword pattern",
  !/keyword[-_\s]?cloud|hidden keyword|display:\s*none[^;]*(klavier|piano|moebeltransport)/i.test(source),
);
add(
  "vercel:safety",
  "No Vercel-sensitive public-page patterns added in sprint source",
  [
    'runtime = "nodejs"',
    "runtime = 'nodejs'",
    "force-dynamic",
    "revalidate =",
    "/api/vitals",
    "/api/conversion-events",
    "sendBeacon",
    "useEffect(() => fetch",
    "setInterval(",
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
const markdown = `# Klaviertransport Regensburg Health Report

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
fs.writeFileSync(absolute("KLAVIERTRANSPORT_REGENSBURG_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(absolute("klaviertransport-regensburg-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Klaviertransport Regensburg health: ${overallStatus} (${totals.pass} pass, ${totals.fail} fail)`);
console.log("Wrote KLAVIERTRANSPORT_REGENSBURG_HEALTH_REPORT.md and klaviertransport-regensburg-health-report.json");

if (totals.fail > 0) process.exit(1);
