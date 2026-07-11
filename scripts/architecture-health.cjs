const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "ARCHITECTURE_HEALTH_REPORT.md");
const jsonPath = path.join(root, "architecture-health-report.json");

const requiredDocs = [
  "docs/SOURCE_OF_TRUTH_ARCHITECTURE.md",
  "docs/CTA_COMPONENT_CONSOLIDATION_REPORT.md",
  "docs/COMPONENT_CONSOLIDATION_REPORT.md",
  "docs/FAQ_AI_CHECKLIST_DATA_CONSOLIDATION_REPORT.md",
  "docs/SEO_DATA_ARCHITECTURE_CONSOLIDATION_REPORT.md",
  "docs/NAMING_IMPORT_CLEANUP_REPORT.md",
  "docs/DOCUMENTATION_INDEX.md",
];

const p0Services = [
  "reinigung",
  "bueroreinigung",
  "gewerbereinigung",
  "umzug",
  "klaviertransport",
  "entruempelung",
  "wohnungsaufloesung",
  "angebot-pruefen",
  "diskret-service",
  "solarreinigung",
  "pv-anlagen-reinigung",
];

const p0Cities = [
  "duesseldorf",
  "regensburg",
  "neuss",
  "ratingen",
  "meerbusch",
  "hilden",
  "erkrath",
  "krefeld",
  "mettmann",
  "neutraubling",
  "lappersdorf",
  "regenstauf",
  "wenzenbach",
  "bad-abbach",
  "kelheim",
  "nittendorf",
  "hemau",
  "burglengenfeld",
  "schwandorf",
];

const findings = [];

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function add(status, check, detail, file) {
  findings.push({ status, check, detail, file });
}

function walk(dir, files = []) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return files;

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if ([".git", ".next", "node_modules", "supabase"].includes(entry.name)) continue;
    const full = path.join(absolute, entry.name);
    const relative = rel(full);
    if (entry.isDirectory()) {
      walk(relative, files);
    } else if (/\.(tsx?|jsx?|cjs|mjs)$/.test(entry.name)) {
      files.push(relative);
    }
  }

  return files;
}

function isPublicPageFile(file) {
  if (!file.startsWith("app/")) return false;
  if (!/\/page\.(tsx|ts|jsx|js)$/.test(file)) return false;
  return !/(^|\/)(api|admin|dashboard|login)(\/|$)/.test(file);
}

function stripNegativeClaims(text) {
  return text
    .replace(/keine\s+[a-z-]*(garantie|zusage|versprechen)/gi, "")
    .replace(/ohne\s+[a-z-]*(garantie|zusage|versprechen)/gi, "");
}

function checkFileContains(file, patterns, checkName) {
  if (!exists(file)) {
    add("FAIL", checkName, `${file} fehlt.`, file);
    return;
  }
  const content = read(file);
  for (const pattern of patterns) {
    if (!content.includes(pattern)) {
      add("FAIL", checkName, `${pattern} fehlt in ${file}.`, file);
    }
  }
}

checkFileContains(
  "lib/service-routing.ts",
  [
    "normalizeServiceKey",
    "normalizeCityKey",
    "normalizeIntentKey",
    "normalizeEnglishAlias",
    "buildContactHref",
    "getServiceForRoute",
    "getPrimaryRouteForService",
    "getCanonicalLocation",
  ],
  "central-normalizers",
);

checkFileContains(
  "lib/source-of-truth.ts",
  ["sourceServices", "sourceLocations", "sourceIntents", "sourceContentMappings"],
  "source-of-truth-adapter",
);

checkFileContains("lib/cta-config.ts", ["resolveCtaConfig", "ctaDefinitions"], "cta-config");
checkFileContains("lib/sitemap-xml.ts", ["shouldSkipSitemapSegment", "api", "admin", "dashboard", "login"], "sitemap-private-safety");
checkFileContains("lib/faq-schema.ts", ["buildVisibleFaqJsonLd"], "visible-faq-schema");

for (const doc of requiredDocs) {
  add(exists(doc) ? "PASS" : "WARN", "required-doc", exists(doc) ? `${doc} vorhanden.` : `${doc} fehlt oder wird noch erstellt.`, doc);
}

const routing = exists("lib/service-routing.ts") ? read("lib/service-routing.ts") : "";
for (const service of p0Services) {
  add(
    routing.includes(`"${service}"`) ? "PASS" : "WARN",
    "p0-service-normalized",
    routing.includes(`"${service}"`) ? `${service} ist in service-routing erkennbar.` : `${service} braucht manuelle Pruefung.`,
    "lib/service-routing.ts",
  );
}

for (const city of p0Cities) {
  add(
    routing.includes(city) ? "PASS" : "WARN",
    "p0-city-normalized",
    routing.includes(city) ? `${city} ist in der Normalisierung erkennbar.` : `${city} braucht manuelle Pruefung.`,
    "lib/service-routing.ts",
  );
}

for (const alias of ["cleaning", "office-cleaning", "commercial-cleaning", "moving", "house-clearance", "piano-transport", "offer-check", "solar-panel-cleaning"]) {
  add(
    routing.includes(alias) ? "PASS" : "WARN",
    "english-alias-normalized",
    routing.includes(alias) ? `${alias} ist normalisiert.` : `${alias} fehlt in der Alias-Schicht.`,
    "lib/service-routing.ts",
  );
}

const publicFiles = walk("app").filter(isPublicPageFile);
for (const file of publicFiles) {
  const content = read(file);
  if (/revalidate\s*=\s*0/.test(content)) add("FAIL", "vercel-revalidate", "Public Page setzt revalidate = 0.", file);
  if (/runtime\s*=\s*["']nodejs["']/.test(content)) add("FAIL", "vercel-runtime", "Public Page setzt runtime nodejs.", file);
  if (/dynamic\s*=\s*["']force-dynamic["']/.test(content)) add("FAIL", "vercel-dynamic", "Public Page setzt force-dynamic.", file);
  if (/fetch\(\s*["']\/api\//.test(content) || /navigator\.sendBeacon\(\s*["']\/api\//.test(content)) {
    add("WARN", "public-api-call-review", "Public Page enthaelt direkten API-Call; manuell auf Submit-only pruefen.", file);
  }
}

for (const file of ["lib/source-of-truth.ts", "lib/cta-config.ts", "lib/service-routing.ts"]) {
  if (!exists(file)) continue;
  const content = stripNegativeClaims(read(file));
  if (/(garantiert|garantie|sicher\s+verfuegbar|sofort\s+verfuegbar)/i.test(content)) {
    add("WARN", "positive-claim-review", "Moeglicher positiver Garantieclaim in zentraler Datei.", file);
  } else {
    add("PASS", "positive-claim-review", "Keine positiven Garantieclaims in zentraler Datei erkannt.", file);
  }
}

const ctaFiles = ["components/LeadCta.tsx", "components/conversion/OfferCheckCTA.tsx", "components/OfferCheckInlineCTA.tsx", "components/MobileFloatingContact.tsx"];
for (const file of ctaFiles) {
  if (!exists(file)) continue;
  const content = read(file);
  const usesCentralLogic = content.includes("resolveCtaConfig") || content.includes("LeadCta");
  add(
    usesCentralLogic ? "PASS" : "WARN",
    "cta-central-logic",
    usesCentralLogic
      ? `${file} nutzt zentrale CTA-Logik oder ist selbst die CTA-Basis.`
      : `${file} nutzt noch keine zentrale CTA-Logik.`,
    file,
  );
}

const failures = findings.filter((item) => item.status === "FAIL");
const warnings = findings.filter((item) => item.status === "WARN");
const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";

const report = [
  "# Architecture Health Report",
  "",
  `Status: ${status}`,
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Summary",
  "",
  `- PASS: ${findings.filter((item) => item.status === "PASS").length}`,
  `- WARN: ${warnings.length}`,
  `- FAIL: ${failures.length}`,
  "",
  "## Findings",
  "",
  ...findings.map((item) => `- ${item.status}: ${item.check} - ${item.detail}${item.file ? ` (${item.file})` : ""}`),
  "",
  "## Notes",
  "",
  "- Das Script loescht keine Dateien und fuehrt keine Migration aus.",
  "- Public-Page-Vercel-Regeln schliessen API/Admin/Dashboard/Login bewusst aus.",
].join("\n");

fs.writeFileSync(reportPath, report, "utf8");
fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    {
      status,
      generatedAt: new Date().toISOString(),
      totals: {
        pass: findings.filter((item) => item.status === "PASS").length,
        warn: warnings.length,
        fail: failures.length,
      },
      findings,
    },
    null,
    2,
  ),
  "utf8",
);

console.log(`Architecture health status: ${status}`);
console.log(`Report written: ${rel(reportPath)}`);
console.log(`JSON written: ${rel(jsonPath)}`);

if (failures.length) process.exitCode = 1;
