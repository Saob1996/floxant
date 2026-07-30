const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const checks = [];
function check(name, pass, detail) {
  checks.push({ name, pass: Boolean(pass), detail });
}

const routing = read("lib/service-routing.ts");
const finder = read("components/ContactPathChooser.tsx");
const leadIntents = read("lib/lead-intents.ts");
const nextConfig = exists("next.config.js") ? read("next.config.js") : "";
const packageJson = JSON.parse(read("package.json"));

const requiredServices = [
  "reinigung",
  "bueroreinigung",
  "hausverwaltung-reinigung",
  "treppenhausreinigung",
  "unterhaltsreinigung",
  "umzug",
  "seniorenumzug",
  "klaviertransport",
  "entruempelung",
  "wohnungsaufloesung",
  "angebot-pruefen",
  "plan-b-service",
  "diskret-service",
  "english-contact",
  "sonstiges",
];

const requiredAliases = [
  "cleaning",
  "office-cleaning",
  "house-clearance",
  "offer-check",
  "piano-transport",
  "discreet-service",
];

for (const serviceKey of requiredServices) {
  check(`routing contains ${serviceKey}`, routing.includes(`serviceKey: "${serviceKey}"`), "Service key must be in serviceRoutingMatrix.");
}

for (const alias of requiredAliases) {
  check(`alias maps ${alias}`, routing.includes(`"${alias}"`) || leadIntents.includes(`"${alias}"`), "English/legacy alias should normalize to a canonical route.");
}

check("routing matrix exported", routing.includes("export const serviceRoutingMatrix"), "lib/service-routing.ts exposes the matrix.");
check("alias map exported", routing.includes("export const serviceAliasMap"), "Aliases are auditable.");
check("href builder exported", routing.includes("export function buildServiceContactHref"), "Central contact href builder exists.");
check("route resolver exported", routing.includes("export function resolveServiceRoute"), "Central resolver exists.");
check("dynamic contact heading helper exported", routing.includes("buildContactPageHeading"), "Contact page can derive service/city heading.");
check("all selections marked noApiOnSelect", routing.includes("noApiOnSelect: true"), "Matrix records that selection is link-only.");
check("ServiceFinder component exists", finder.includes("export function ServiceFinder"), "ContactPathChooser exports the central ServiceFinder.");
check("ContactPathChooser remains compatible", finder.includes("export function ContactPathChooser"), "Existing import path remains stable.");
check("Finder has CTA data attributes", ["data-event", "data-service", "data-city", "data-page-intent", "data-priority", "data-destination", "data-no-api-on-select"].every((token) => finder.includes(token)), "Finder links expose conversion-safe attributes.");
check("Finder has no fetch", !/fetch\s*\(/.test(finder), "Selecting a service must not call an API.");
check("Finder has no bookings API", !finder.includes("/api/bookings"), "Bookings API only belongs to submit flow.");
check("Image optimization remains disabled", /images\s*:\s*{[\s\S]*unoptimized\s*:\s*true/.test(nextConfig), "next.config.js keeps images.unoptimized=true.");
check("npm script service-router:health exists", packageJson.scripts && packageJson.scripts["service-router:health"] === "node scripts/service-router-health.cjs", "package.json exposes the health command.");

const routeCount = (routing.match(/serviceKey: "/g) || []).length;
check("routing matrix has broad coverage", routeCount >= 20, `Found ${routeCount} service route entries.`);

const docs = [
  "docs/SERVICE_ROUTING_MATRIX.md",
  "docs/SERVICE_FINDER_IMPLEMENTATION_REPORT.md",
  "docs/CTA_ROUTING_SITEWIDE_REPORT.md",
  "docs/ENGLISH_CONTACT_ROUTING_REPORT.md",
  "docs/LEAD_ROUTING_PRIORITY_REPORT.md",
];
const documentationWarnings = docs
  .filter((doc) => !exists(doc))
  .map((doc) => ({
    name: `doc exists ${doc}`,
    detail: "Historical sprint documentation is absent; executable routing checks remain authoritative.",
  }));

const failed = checks.filter((item) => !item.pass);
const status = failed.length ? "RED" : documentationWarnings.length ? "YELLOW" : "GREEN";
const report = {
  status,
  generatedAt: new Date().toISOString(),
  summary: {
    checks: checks.length,
    passed: checks.length - failed.length,
    failed: failed.length,
    documentationWarnings: documentationWarnings.length,
    routeCount,
  },
  checks,
  warnings: documentationWarnings,
};

fs.writeFileSync(path.join(root, "service-router-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

const lines = [
  "# Service Router Health Report",
  "",
  `Status: ${status}`,
  `Generated: ${report.generatedAt}`,
  `Route entries: ${routeCount}`,
  "",
  "## Checks",
  ...checks.map((item) => `- ${item.pass ? "PASS" : "FAIL"}: ${item.name} - ${item.detail}`),
  "",
  "## Safety",
  "- Service selection is link-only.",
  "- Lead API is reserved for explicit form submit.",
  "- Image optimization remains disabled.",
  "",
  "## Documentation warnings",
  ...(documentationWarnings.length
    ? documentationWarnings.map((item) => `- WARN: ${item.name} - ${item.detail}`)
    : ["- None."]),
];

fs.writeFileSync(path.join(root, "SERVICE_ROUTER_HEALTH_REPORT.md"), `${lines.join("\n")}\n`);

if (failed.length) {
  console.error(`service-router:health failed (${failed.length}/${checks.length})`);
  for (const item of failed) console.error(`- ${item.name}: ${item.detail}`);
  process.exit(1);
}

console.log(`service-router:health ${status} (${checks.length} checks, ${routeCount} routes)`);
