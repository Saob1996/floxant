const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = process.cwd();

const routes = [
  {
    key: "reinigung",
    serviceName: "Reinigung",
    route: "/duesseldorf/reinigung",
    file: "app/duesseldorf/reinigung/page.tsx",
    service: "reinigung",
    primaryIntent: "reinigung-duesseldorf",
    offerIntent: "reinigungsangebot-pruefen",
  },
  {
    key: "bueroreinigung",
    serviceName: "Büroreinigung",
    route: "/duesseldorf/bueroreinigung",
    file: "app/duesseldorf/bueroreinigung/page.tsx",
    service: "bueroreinigung",
    primaryIntent: "bueroreinigung-duesseldorf",
    offerIntent: "bueroreinigung-angebot-pruefen",
  },
  {
    key: "gewerbereinigung",
    serviceName: "Gewerbereinigung",
    route: "/duesseldorf/gewerbereinigung",
    file: "app/duesseldorf/gewerbereinigung/page.tsx",
    service: "gewerbereinigung",
    primaryIntent: "gewerbereinigung-duesseldorf",
    offerIntent: "gewerbereinigung-angebot-pruefen",
  },
  {
    key: "praxisreinigung",
    serviceName: "Praxisreinigung",
    route: "/duesseldorf/praxisreinigung",
    file: "app/duesseldorf/praxisreinigung/page.tsx",
    service: "praxisreinigung",
    primaryIntent: "praxisreinigung-duesseldorf",
    offerIntent: "praxisreinigung-angebot-pruefen",
  },
  {
    key: "fensterreinigung",
    serviceName: "Fensterreinigung",
    route: "/duesseldorf/fensterreinigung",
    file: "app/duesseldorf/fensterreinigung/page.tsx",
    service: "fensterreinigung",
    primaryIntent: "fensterreinigung-duesseldorf",
    offerIntent: "fensterreinigung-angebot-pruefen",
  },
  {
    key: "grundreinigung",
    serviceName: "Grundreinigung",
    route: "/duesseldorf/grundreinigung",
    file: "app/duesseldorf/grundreinigung/page.tsx",
    service: "grundreinigung",
    primaryIntent: "grundreinigung-duesseldorf",
    offerIntent: "grundreinigung-angebot-pruefen",
  },
  {
    key: "unterhaltsreinigung",
    serviceName: "Unterhaltsreinigung",
    route: "/duesseldorf/unterhaltsreinigung",
    file: "app/duesseldorf/unterhaltsreinigung/page.tsx",
    service: "unterhaltsreinigung",
    primaryIntent: "unterhaltsreinigung-duesseldorf",
    offerIntent: "unterhaltsreinigung-angebot-pruefen",
  },
  {
    key: "baureinigung",
    serviceName: "Baureinigung",
    route: "/duesseldorf/baureinigung",
    file: "app/duesseldorf/baureinigung/page.tsx",
    service: "baureinigung",
    primaryIntent: "baureinigung-duesseldorf",
    offerIntent: "baureinigung-angebot-pruefen",
  },
];

const sourceFiles = [
  "components/duesseldorf/DuesseldorfCleaningServicePage.tsx",
  "app/duesseldorf/page.tsx",
  "app/angebot-guenstiger-pruefen/page.tsx",
  "app/angebotscheck/page.tsx",
  "scripts/generate-sitemap-routes.js",
  ...routes.map((route) => route.file),
];

function absolute(relativePath) {
  return path.join(workspaceRoot, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function read(relativePath) {
  const filePath = absolute(relativePath);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function routeRedirectPattern(route) {
  const escaped = escapeRegExp(route);
  return new RegExp(`["']${escaped}(?:/:path\\*)?["']`);
}

const componentSource = read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx");
const hubSource = read("app/duesseldorf/page.tsx");
const nextConfigSource = read("next.config.js");
const sitemapSource = read("lib/sitemap-routes.ts");
const packageJsonSource = read("package.json");
const changedSource = sourceFiles.map((file) => read(file)).join("\n");

const results = [];

function addCheck(id, label, passed, details, severity = "fail") {
  const status = passed ? "PASS" : severity.toUpperCase();
  results.push({ id, label, status, details: details || "" });
}

for (const route of routes) {
  const pageSource = read(route.file);
  const routeSource = `${pageSource}\n${componentSource}`;
  addCheck(
    `route:${route.key}:file`,
    `${route.route} page file exists`,
    exists(route.file),
    route.file,
  );
  addCheck(
    `route:${route.key}:metadata`,
    `${route.serviceName} metadata helper is wired`,
    pageSource.includes(`buildDuesseldorfCleaningMetadata("${route.key}")`),
    "Uses buildDuesseldorfCleaningMetadata with the matching page key.",
  );
  addCheck(
    `route:${route.key}:component`,
    `${route.serviceName} page renders shared service component`,
    pageSource.includes(`<DuesseldorfCleaningServicePage pageKey="${route.key}" />`),
    "Static App Router page delegates to the Düsseldorf cleaning component.",
  );
  addCheck(
    `route:${route.key}:h1`,
    `${route.serviceName} and Düsseldorf are present in H1 copy`,
    routeSource.includes(`h1:`) && routeSource.includes(route.serviceName) && routeSource.includes("Düsseldorf"),
    "Source contains service-specific H1 configuration with Düsseldorf.",
  );
  addCheck(
    `route:${route.key}:canonical`,
    `${route.route} canonical metadata is present`,
    componentSource.includes("alternates") && componentSource.includes("canonical: config.path") && componentSource.includes(route.route),
    "Metadata builder uses the route path as canonical.",
  );
  addCheck(
    `route:${route.key}:sitemap`,
    `${route.route} is in generated sitemap routes`,
    sitemapSource.includes(`"${route.route}"`),
    "Run npm run seo:sitemap before this check if it fails.",
  );
  addCheck(
    `route:${route.key}:redirect`,
    `${route.route} is not in next.config redirect sources`,
    !routeRedirectPattern(route.route).test(nextConfigSource),
    "No exact deprecated/gone redirect may match this P0 route.",
  );
  addCheck(
    `route:${route.key}:hero-cta`,
    `${route.serviceName} hero CTA carries service, city and primary intent`,
    includesAll(componentSource, [
      `requestHref("${route.service}", "${route.primaryIntent}")`,
      'data-city="duesseldorf"',
      `intent: "${route.primaryIntent}"`,
    ]),
    "The single primary service CTA keeps Düsseldorf and the matching service intent.",
  );
}

addCheck(
  "cluster:offer-check",
  "Düsseldorf hub keeps offer review as a separate secondary path",
  includesAll(hubSource, ["/angebot-guenstiger-pruefen", 'data-service="angebot-pruefen"', 'data-city="duesseldorf"']),
  "The hub separates the cleaning enquiry from the secondary offer-review path.",
);

addCheck(
  "cluster:hub-links",
  "Düsseldorf hub links all eight P0 cleaning pages",
  routes.every((route) => hubSource.includes(route.route)),
  "Hub contains direct internal links to the eight Düsseldorf cleaning pages.",
);

addCheck(
  "cluster:service-links",
  "Cleaning pages cross-link the P0 service cluster",
  routes.every((route) => componentSource.includes(route.route)),
  "Shared component contains service-card links for the Düsseldorf cleaning cluster.",
);

addCheck(
  "content:quick-answer",
  "Hero states service, city and next step directly",
  includesAll(componentSource, ["function Hero", "config.h1", "config.intro", "<ServiceCta config={config} light />"]),
  "The release uses direct customer copy instead of an AI-labelled answer block.",
);

addCheck(
  "content:effort-factors",
  "Effort factors are visible",
  includesAll(componentSource, ["function SpecialistDetails", "Wovon die Planung abhängt.", "effortFactors"]),
  "Effort drivers are shown as a dedicated section.",
);

addCheck(
  "content:faq",
  "FAQ is visible and structured",
  includesAll(componentSource, ["function Faq", "faqItems", "buildFaqJsonLd", "config.faqItems.map"]),
  "FAQ UI and FAQPage JSON-LD are produced from the same items.",
);

addCheck(
  "content:english-intent",
  "Specialists have their own details, effort factors and FAQ",
  routes.filter((route) => route.key !== "reinigung").every((route) =>
    new RegExp(`${route.key}: \\{[\\s\\S]*?requiredDetails:[\\s\\S]*?effortFactors:[\\s\\S]*?faqItems:[\\s\\S]*?related:`).test(componentSource)),
  "Each specialist configuration carries content that is specific to its customer situation.",
);

addCheck(
  "content:no-guarantees",
  "No invented ranking, customer-count or satisfaction claim is present",
  !/\b(?:Nr\.?\s*1|Marktführer|100\s*%\s*Zufriedenheit|\d{3,}\s*Kunden)\b/i.test(changedSource),
  "The regional pages avoid unsupported superlatives and fabricated trust numbers.",
);

addCheck(
  "content:no-keyword-cloud",
  "No keyword cloud pattern found",
  !/keyword[-_\s]?cloud|hidden keyword|seo keyword/i.test(changedSource),
  "No hidden keyword list or keyword-cloud UI was added.",
);

addCheck(
  "schema:web-service-breadcrumb-faq",
  "Schema covers WebPage, Service, BreadcrumbList and FAQPage",
  includesAll(componentSource, ["buildWebPageJsonLd", "buildServiceJsonLd", "buildBreadcrumbJsonLd", "buildFaqJsonLd"]),
  "Structured data is built with existing helpers.",
);

addCheck(
  "schema:no-fake-proof",
  "No fake review/rating/certification schema added",
  !/AggregateRating|["@']Review["@']|hasCertification|TÜV|TUEV|DIN ISO|ISO 9001/i.test(changedSource),
  "No rating, review or formal certification schema claim appears in the sprint files.",
);

addCheck(
  "schema:no-fake-localbusiness",
  "Cleaning pages do not add fake Düsseldorf LocalBusiness addresses",
  !componentSource.includes('"@type": "LocalBusiness"') && !componentSource.includes("PostalAddress"),
  "The cleaning pages use organization/service schema instead of a fabricated local address.",
);

addCheck(
  "sitemap:allowlist",
  "Sitemap generator has a narrow Düsseldorf cleaning allowlist",
  includesAll(read("scripts/generate-sitemap-routes.js"), [
    "allowedDuesseldorfCleaningRoutes",
    "/duesseldorf/reinigung",
    "/duesseldorf/bueroreinigung",
    "/duesseldorf/gewerbereinigung",
    "/duesseldorf/praxisreinigung",
    "/duesseldorf/fensterreinigung",
    "/duesseldorf/grundreinigung",
    "/duesseldorf/unterhaltsreinigung",
    "/duesseldorf/baureinigung",
  ]),
  "Only the eight P0 Düsseldorf cleaning routes are explicitly allowed.",
);

addCheck(
  "runtime:no-middleware-proxy",
  "Static release does not add root middleware or proxy runtime",
  !exists("middleware.ts") && !exists("middleware.js") && !exists("proxy.ts") && !exists("proxy.js"),
  "Cloudflare Pages keeps the public routes static; redirects belong in the static redirect configuration.",
);

const forbiddenVercelPatterns = [
  "runtime = \"nodejs\"",
  "runtime = 'nodejs'",
  "force-dynamic",
  "revalidate =",
  "/api/vitals",
  "/api/conversion-events",
  "fetch('/api",
  "fetch(\"/api",
  "sendBeacon",
  "supabase",
  "resend",
  "sharp",
];

addCheck(
  "vercel:safety",
  "No Vercel-sensitive runtime/API/storage usage added",
  forbiddenVercelPatterns.every((pattern) => !changedSource.includes(pattern)),
  `Scanned for: ${forbiddenVercelPatterns.join(", ")}`,
);

addCheck(
  "package:script",
  "package script duesseldorf-cleaning:health is registered",
  packageJsonSource.includes('"duesseldorf-cleaning:health": "node scripts/duesseldorf-cleaning-health.cjs"'),
  "npm run duesseldorf-cleaning:health is available.",
);

const totals = {
  pass: results.filter((result) => result.status === "PASS").length,
  warn: results.filter((result) => result.status === "WARN").length,
  fail: results.filter((result) => result.status === "FAIL").length,
};

const overallStatus = totals.fail > 0 ? "FAIL" : totals.warn > 0 ? "WARN" : "PASS";
const generatedAt = new Date().toISOString();

const markdownRows = results
  .map((result) => `| ${result.status} | ${result.id} | ${result.label} | ${String(result.details).replace(/\|/g, "\\|")} |`)
  .join("\n");

const markdown = `# Düsseldorf Cleaning Health Report

Generated: ${generatedAt}

Overall status: **${overallStatus}**

| Metric | Count |
| --- | ---: |
| PASS | ${totals.pass} |
| WARN | ${totals.warn} |
| FAIL | ${totals.fail} |

| Status | ID | Check | Details |
| --- | --- | --- | --- |
${markdownRows}
`;

const jsonReport = {
  generatedAt,
  overallStatus,
  totals,
  routes: routes.map(({ key, serviceName, route, file }) => ({ key, serviceName, route, file })),
  results,
};

fs.writeFileSync(absolute("DUESSELDORF_CLEANING_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(absolute("duesseldorf-cleaning-health-report.json"), `${JSON.stringify(jsonReport, null, 2)}\n`);

console.log(`Düsseldorf cleaning health: ${overallStatus} (${totals.pass} pass, ${totals.warn} warn, ${totals.fail} fail)`);
console.log("Wrote DUESSELDORF_CLEANING_HEALTH_REPORT.md and duesseldorf-cleaning-health-report.json");

if (totals.fail > 0) process.exit(1);
