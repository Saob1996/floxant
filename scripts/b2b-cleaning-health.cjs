const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = process.cwd();

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

const docs = [
  "docs/B2B_CLEANING_ROUTE_ARCHITECTURE.md",
  "docs/B2B_CLEANING_KEYWORD_INTENT_MAP.md",
  "docs/BUEROREINIGUNG_GEWERBEREINIGUNG_DIFFERENTIATION.md",
  "docs/B2B_CLEANING_LOCAL_RELEVANCE_REPORT.md",
  "docs/B2B_CLEANING_METADATA_SCHEMA_REPORT.md",
  "docs/B2B_CLEANING_INTERNAL_LINKING_REPORT.md",
  "docs/B2B_CLEANING_CONTENT_CLEANUP_REPORT.md",
];

const routeMatrix = [
  {
    id: "b2b-office-primary",
    route: "/regensburg/bueroreinigung",
    label: "Primary B2B Bueroreinigung",
    files: ["app/regensburg/bueroreinigung/page.tsx", "lib/regensburg-service-pages.ts", "components/regensburg/RegensburgServicePage.tsx"],
    mustContain: [
      "Büroreinigung Regensburg für Firmen strukturiert anfragen",
      "Fläche",
      "Turnus",
      "Reinigungszeiten",
      "vorhandenes Angebot",
      "office cleaning",
    ],
  },
  {
    id: "office-support-root",
    route: "/bueroreinigung",
    label: "Support Bueroreinigung",
    files: ["app/bueroreinigung/page.tsx"],
    mustContain: [
      "Büroreinigung für Firmen strukturiert anfragen",
      "canonicalPath",
      "/regensburg/bueroreinigung",
      "Büroreinigung-Angebot prüfen lassen",
      "office cleaning",
    ],
  },
  {
    id: "duesseldorf-office",
    route: "/duesseldorf/bueroreinigung",
    label: "Bueroreinigung Duesseldorf",
    files: ["app/duesseldorf/bueroreinigung/page.tsx", "components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    mustContain: [
      "Büroreinigung in Düsseldorf für Firmen klar anfragen",
      "service=bueroreinigung",
      "city=duesseldorf",
      "intent=bueroreinigung-duesseldorf",
      "intent=bueroreinigung-angebot-pruefen",
    ],
  },
  {
    id: "duesseldorf-commercial",
    route: "/duesseldorf/gewerbereinigung",
    label: "Gewerbereinigung Duesseldorf",
    files: ["app/duesseldorf/gewerbereinigung/page.tsx", "components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    mustContain: [
      "Gewerbereinigung in Düsseldorf strukturiert anfragen",
      "service=gewerbereinigung",
      "city=duesseldorf",
      "intent=gewerbereinigung-duesseldorf",
      "intent=gewerbereinigung-angebot-pruefen",
    ],
  },
  {
    id: "regensburg-commercial",
    route: "/regensburg/gewerbereinigung",
    label: "Gewerbereinigung Regensburg",
    files: ["app/regensburg/gewerbereinigung/page.tsx", "lib/local-service-seo-pages.ts", "components/LocalServiceSeoPage.tsx"],
    mustContain: [
      "Gewerbereinigung Regensburg strukturiert anfragen",
      "Objektart",
      "Leistungsumfang",
      "Gewerbereinigungsangebot vergleichen",
      "commercial cleaning",
    ],
  },
];

const sourceFiles = Array.from(new Set(routeMatrix.flatMap((route) => route.files))).concat([
  "components/SeoLeadForm.tsx",
  "lib/lead-intents.ts",
  "lib/sitemap-routes.ts",
  "scripts/generate-sitemap-routes.js",
]);

const sources = Object.fromEntries(sourceFiles.map((file) => [file, read(file)]));
const combinedSource = Object.values(sources).join("\n");
const sitemapSource = read("lib/sitemap-routes.ts");
const nextConfigSource = read("next.config.js");
const packageJsonSource = read("package.json");
const formSource = read("components/SeoLeadForm.tsx");
const duesseldorfSource = read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx");

const results = [];

function addCheck(id, label, passed, details = "", severity = "fail") {
  results.push({
    id,
    label,
    status: passed ? "PASS" : severity.toUpperCase(),
    details,
  });
}

for (const route of routeMatrix) {
  addCheck(
    `${route.id}:files`,
    `${route.label} source files exist`,
    route.files.every(exists),
    route.files.join(", "),
  );

  const routeSource = route.files.map(read).join("\n");
  addCheck(
    `${route.id}:content`,
    `${route.label} contains required B2B intent markers`,
    includesAll(routeSource, route.mustContain),
    route.mustContain.join(", "),
  );
}

addCheck(
  "architecture:b2b-alias",
  "/b2b-bueroreinigung redirects to the canonical B2B office page",
  nextConfigSource.includes("['/b2b-bueroreinigung', '/regensburg/bueroreinigung']"),
  "Alias is not a competing indexable page.",
);

addCheck(
  "architecture:legacy-regensburg-office",
  "/bueroreinigung-regensburg redirects to /regensburg/bueroreinigung",
  nextConfigSource.includes("['/bueroreinigung-regensburg', '/regensburg/bueroreinigung']"),
  "Legacy root route remains consolidated.",
);

addCheck(
  "architecture:legacy-regensburg-commercial",
  "/gewerbereinigung-regensburg redirects to /regensburg/gewerbereinigung",
  nextConfigSource.includes("['/gewerbereinigung-regensburg', '/regensburg/gewerbereinigung']"),
  "Legacy root route remains consolidated.",
);

addCheck(
  "differentiation:visible-comparison",
  "Bueroreinigung/Gewerbereinigung comparison is visible",
  includesAll(duesseldorfSource, [
    "function BueroreinigungGewerbereinigungComparison",
    "Büro oder Gewerbe?",
    "Büroreinigung",
    "Gewerbereinigung",
  ]),
  "Shared Duesseldorf component renders the comparison section.",
);

addCheck(
  "form:b2b-fields",
  "B2B optional form fields are visible",
  includesAll(formSource, [
    "existingCleaningOffer",
    "specialAreas",
    "b2bSpecialAreaOptions",
    "Firma",
    "Turnus",
    "Gewünschte Zeit",
    "Vorhandenes Angebot",
    "Besondere Bereiche",
  ]),
  "Company, object details, offer status and special areas are present without becoming required.",
);

addCheck(
  "form:b2b-success",
  "B2B-specific success state is present",
  formSource.includes("Ihre Anfrage zur Büro-/Gewerbereinigung wurde gesendet"),
  "Success copy references Flaeche, Turnus, Reinigungszeiten and Leistungsumfang.",
);

addCheck(
  "form:no-load-api",
  "Lead API remains submit-only",
  formSource.includes('onSubmit={handleSubmit}') &&
    formSource.includes('await fetch("/api/bookings"') &&
    !/useEffect\s*\([^)]*fetch\(["']\/api/s.test(formSource),
  "No automatic client fetch to /api is used when the public page loads.",
);

for (const doc of docs) {
  addCheck(`doc:${path.basename(doc)}`, `${doc} exists`, exists(doc), doc);
}

addCheck(
  "package:script",
  "npm script b2b-cleaning:health exists",
  packageJsonSource.includes('"b2b-cleaning:health": "node scripts/b2b-cleaning-health.cjs"'),
  "package.json script registration.",
);

addCheck(
  "sitemap:canonical-routes",
  "Sitemap contains canonical B2B cleaning routes",
  [
    "/regensburg/bueroreinigung",
    "/regensburg/gewerbereinigung",
    "/duesseldorf/bueroreinigung",
    "/duesseldorf/gewerbereinigung",
  ].every((route) => sitemapSource.includes(`"${route}"`)),
  "Canonical pages should be included in lib/sitemap-routes.ts.",
);

addCheck(
  "sitemap:no-duplicate-aliases",
  "Sitemap excludes B2B/legacy duplicate aliases",
  [
    "/b2b-bueroreinigung",
    "/bueroreinigung",
    "/bueroreinigung-regensburg",
    "/gewerbereinigung-regensburg",
  ].every((route) => !sitemapSource.includes(`"${route}"`)),
  "Aliases/support pages should not compete in sitemap.xml.",
);

addCheck(
  "metadata:schema-visible-faq",
  "FAQ schema is only used where visible FAQ exists",
  includesAll(combinedSource, ["buildFaqJsonLd", "faqItems"]) && !combinedSource.includes("AggregateRating"),
  "FAQPage helpers are paired with visible FAQ arrays; no aggregate rating.",
);

addCheck(
  "english:intent",
  "English office/commercial cleaning intent is present",
  /office cleaning/i.test(combinedSource) && /commercial cleaning/i.test(combinedSource),
  "English intent is represented as supporting copy, not duplicate routes.",
);

const forbiddenVercelPatterns = [
  "runtime = \"nodejs\"",
  "runtime = 'nodejs'",
  "force-dynamic",
  "revalidate =",
  "/api/vitals",
  "/api/conversion-events",
  "sendBeacon",
  "supabase",
  "resend",
  "sharp",
];

addCheck(
  "vercel:safety",
  "No Vercel-sensitive public-page patterns added in sprint files",
  forbiddenVercelPatterns.every((pattern) => !combinedSource.includes(pattern)),
  `Scanned: ${forbiddenVercelPatterns.join(", ")}`,
);

addCheck(
  "content:no-fake-claims",
  "No fake ratings, reviews, certificates or guarantees in sprint files",
  !/AggregateRating|["@']Review["@']|ISO 9001|DIN ISO|TÜV|TUEV|garantiert g[uü]nstiger|Soforttermin-Garantie ohne/i.test(combinedSource),
  "Boundaries like keine Preisgarantie are allowed and expected.",
);

addCheck(
  "content:no-keyword-cloud",
  "No keyword cloud or hidden keyword pattern found",
  !/keyword[-_\s]?cloud|hidden keyword|display:\s*none[^;]*(bueroreinigung|gewerbereinigung)/i.test(combinedSource),
  "Visible copy uses natural sections and FAQs.",
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

const markdown = `# B2B Cleaning Health Report

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
  routes: routeMatrix.map(({ id, route, label, files }) => ({ id, route, label, files })),
  docs,
  results,
};

fs.writeFileSync(absolute("B2B_CLEANING_HEALTH_REPORT.md"), markdown);
fs.writeFileSync(absolute("b2b-cleaning-health-report.json"), `${JSON.stringify(jsonReport, null, 2)}\n`);

console.log(`B2B cleaning health: ${overallStatus} (${totals.pass} pass, ${totals.warn} warn, ${totals.fail} fail)`);
console.log("Wrote B2B_CLEANING_HEALTH_REPORT.md and b2b-cleaning-health-report.json");

if (totals.fail > 0) process.exit(1);
