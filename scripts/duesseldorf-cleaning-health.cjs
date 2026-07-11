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
];

const sourceFiles = [
  "components/duesseldorf/DuesseldorfCleaningServicePage.tsx",
  "app/duesseldorf/page.tsx",
  "app/angebot-guenstiger-pruefen/page.tsx",
  "app/angebotscheck/page.tsx",
  "proxy.ts",
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
const offerCheckSource = `${read("app/angebot-guenstiger-pruefen/page.tsx")}\n${read("app/angebotscheck/page.tsx")}`;
const nextConfigSource = read("next.config.js");
const proxySource = read("proxy.ts");
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
    `route:${route.key}:proxy`,
    `${route.route} is allowed by proxy policy`,
    proxySource.includes(route.route),
    "DUESSELDORF_ALLOWED_SERVICE_PATHS must include this P0 route.",
  );
  addCheck(
    `route:${route.key}:hero-cta`,
    `${route.serviceName} hero CTA carries service, city and intent params`,
    includesAll(componentSource, [
      `service=${route.service}`,
      "city=duesseldorf",
      `intent=${route.primaryIntent}`,
      `intent=${route.offerIntent}`,
    ]),
    "Primary and offer-check contact URLs include Düsseldorf-specific query params.",
  );
}

addCheck(
  "cluster:offer-check",
  "Offer-check pages link Düsseldorf cleaning intents",
  routes.every((route) =>
    offerCheckSource.includes(`service=${route.service}`) &&
    offerCheckSource.includes("city=duesseldorf") &&
    offerCheckSource.includes(`intent=${route.offerIntent}`),
  ),
  "angebot-guenstiger-pruefen and angebotscheck expose Düsseldorf cleaning offer-check CTAs.",
);

addCheck(
  "cluster:hub-links",
  "Düsseldorf hub links all five P0 cleaning pages",
  routes.every((route) => hubSource.includes(route.route)),
  "Hub contains direct internal links to the five Düsseldorf cleaning pages.",
);

addCheck(
  "cluster:service-links",
  "Cleaning pages cross-link the P0 service cluster",
  routes.every((route) => componentSource.includes(route.route)),
  "Shared component contains service-card links for the Düsseldorf cleaning cluster.",
);

addCheck(
  "content:quick-answer",
  "AI/quick-answer block is visible",
  includesAll(componentSource, ["function CleaningQuickAnswer", "Quick Answer / AI-Antwort", "quickAnswer"]),
  "Quick answer is rendered near the top of each page.",
);

addCheck(
  "content:effort-factors",
  "Effort factors are visible",
  includesAll(componentSource, ["function CleaningEffortFactorsPanel", "Aufwandstreiber", "effortFactors"]),
  "Effort drivers are shown as a dedicated section.",
);

addCheck(
  "content:faq",
  "FAQ is visible and structured",
  includesAll(componentSource, ["function CleaningFAQ", "faqItems", "buildFaqJsonLd", "config.faqItems.map"]),
  "FAQ UI and FAQPage JSON-LD are produced from the same items.",
);

addCheck(
  "content:english-intent",
  "English intent is represented",
  includesAll(componentSource, ["English intent", "simple English", "cleaning service", "office cleaning", "commercial cleaning", "window cleaning"]),
  "English-language search intent is supported without separate duplicate routes.",
);

addCheck(
  "content:no-guarantees",
  "No guarantee boundaries are visible",
  includesAll(componentSource, ["keine Preisgarantie", "keine Soforttermin-Garantie", "keine garantierte Verfügbarkeit", "keine Rechtsberatung", "keine automatische Buchung"]),
  "The pages state what FLOXANT does not promise.",
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
  ]),
  "Only the five P0 Düsseldorf cleaning routes are explicitly allowed.",
);

addCheck(
  "proxy:out-of-area-allowlist-order",
  "Proxy skips out-of-area cleaning redirect for allowed Düsseldorf P0 routes",
  proxySource.includes("function isOutOfAreaCleaningSignal") &&
    proxySource.includes("if (DUESSELDORF_ALLOWED_SERVICE_PATHS.has(pathname)) return false;"),
  "Allowed Düsseldorf cleaning routes must bypass the out-of-area cleaning redirect before term matching.",
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
