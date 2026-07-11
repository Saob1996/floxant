#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

function absolute(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function read(relativePath) {
  const filePath = absolute(relativePath);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function escapeCell(value) {
  return String(value || "").replace(/\n/g, " ").replace(/\|/g, "\\|");
}

const docs = [
  "docs/HAUSVERWALTUNG_CLEANING_ROUTE_ARCHITECTURE.md",
  "docs/HAUSVERWALTUNG_CLEANING_KEYWORD_INTENT_MAP.md",
  "docs/HAUSVERWALTUNG_UNTERHALT_GEBAEUDE_DIFFERENTIATION.md",
  "docs/HAUSVERWALTUNG_CLEANING_LOCAL_INTEGRATION_REPORT.md",
  "docs/HAUSVERWALTUNG_CLEANING_METADATA_SCHEMA_REPORT.md",
  "docs/HAUSVERWALTUNG_CLEANING_INTERNAL_LINKING_REPORT.md",
  "docs/HAUSVERWALTUNG_CLEANING_CONTENT_CLEANUP_REPORT.md",
];

const sources = {
  duesseldorfComponent: read("components/duesseldorf/DuesseldorfCleaningServicePage.tsx"),
  seoLeadForm: read("components/SeoLeadForm.tsx"),
  leadIntents: read("lib/lead-intents.ts"),
  nextConfig: read("next.config.js"),
  sitemapRoutes: read("lib/sitemap-routes.ts"),
  sitemapGenerator: read("scripts/generate-sitemap-routes.js"),
  packageJson: read("package.json"),
  offerCheck: `${read("app/angebot-guenstiger-pruefen/page.tsx")}\n${read("app/angebotscheck/page.tsx")}\n${read("app/anbieter-vergleichen/page.tsx")}`,
  contactPage: read("app/kontakt/page.tsx"),
  treppenRegensburg: read("app/treppenhausreinigung-regensburg/page.tsx"),
  unterhaltRegensburg: read("app/unterhaltsreinigung-regensburg/page.tsx"),
  regensburgCleaning: read("app/regensburg/reinigung/page.tsx"),
  regensburgGewerbe: read("app/regensburg/gewerbereinigung/page.tsx"),
  regensburgBuero: read("app/regensburg/bueroreinigung/page.tsx"),
};

const publicSource = [
  sources.duesseldorfComponent,
  sources.seoLeadForm,
  sources.leadIntents,
  sources.offerCheck,
  sources.treppenRegensburg,
  sources.unterhaltRegensburg,
  sources.regensburgCleaning,
  sources.regensburgGewerbe,
  sources.regensburgBuero,
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

const canonicalRoutes = [
  "/duesseldorf/reinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/bueroreinigung",
  "/treppenhausreinigung-regensburg",
  "/unterhaltsreinigung-regensburg",
  "/regensburg/reinigung",
  "/regensburg/gewerbereinigung",
  "/regensburg/bueroreinigung",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/anbieter-vergleichen",
  "/kontakt",
];

const deprecatedRoutes = [
  "/duesseldorf/hausverwaltung-reinigung",
  "/duesseldorf/treppenhausreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/gebaeudereinigung",
];

const leadServices = [
  "hausverwaltung-reinigung",
  "treppenhausreinigung",
  "unterhaltsreinigung",
  "gebaeudereinigung",
];

pass(
  "architecture:duesseldorf-hub",
  "/duesseldorf/reinigung remains the visible Hausverwaltung cleaning hub",
  exists("app/duesseldorf/reinigung/page.tsx") &&
    includesAll(sources.duesseldorfComponent, [
      "PropertyManagementCleaningSection",
      "id=\"hausverwaltung-reinigung\"",
      "Hausverwaltung-Reinigung",
      "Treppenhausreinigung",
      "Unterhaltsreinigung",
      "Gebäudereinigung",
    ]),
  "The sprint strengthens the existing static hub instead of adding thin Düsseldorf service pages.",
);

pass(
  "architecture:deprecated-duesseldorf-routes",
  "Deprecated Düsseldorf micro routes stay consolidated",
  deprecatedRoutes.every((route) => sources.nextConfig.includes(`"${route}"`) || sources.nextConfig.includes(`'${route}'`)) &&
    !deprecatedRoutes.some((route) => exists(`app${route}/page.tsx`)),
  "Deprecated Hausverwaltung/Treppenhaus/Unterhalt/Gebäude routes remain redirects or absent, not new doorways.",
);

pass(
  "architecture:canonical-routes",
  "Canonical focus routes are present as pages or configured redirects",
  canonicalRoutes.every((route) => {
    const pagePath = `app${route}/page.tsx`;
    return exists(pagePath) || sources.nextConfig.includes(`'${route}'`) || sources.nextConfig.includes(`"${route}"`);
  }),
  canonicalRoutes.join(", "),
);

pass(
  "regensburg:special-pages",
  "Regensburg Treppenhaus and Unterhalt pages remain indexable support pages",
  exists("app/treppenhausreinigung-regensburg/page.tsx") &&
    exists("app/unterhaltsreinigung-regensburg/page.tsx") &&
    includesAll(sources.treppenRegensburg + sources.unterhaltRegensburg, [
      "Treppenhausreinigung Regensburg",
      "Unterhaltsreinigung Regensburg",
      "Angebot",
    ]),
  "These pages cover the Regensburg root intents while legacy aliases consolidate.",
);

pass(
  "lead:intents",
  "Lead intent map supports Hausverwaltung, Treppenhaus, Unterhalt and Gebäude cleaning",
  leadServices.every((service) => sources.leadIntents.includes(`"${service}"`)) &&
    includesAll(sources.leadIntents, [
      "buildPropertyCleaningCopy",
      "/duesseldorf/reinigung",
      "/treppenhausreinigung-regensburg",
      "/unterhaltsreinigung-regensburg",
      "/hausverwaltung-reinigung",
      "/gebaeudereinigung",
    ]),
  "New service aliases, copy and conversion target routes are centralized in lib/lead-intents.ts.",
);

pass(
  "lead:form-fields",
  "SeoLeadForm captures property-cleaning qualification fields",
  includesAll(sources.seoLeadForm, [
    "isPropertyCleaningFlow",
    "propertyCleaningRoleOptions",
    "propertyCleaningObjectTypeOptions",
    "propertyCleaningAreaOptions",
    "propertyCleaningFrequencyOptions",
    "propertyCleaningRole",
    "propertyCleaningAreas",
    "propertyCleaningExistingOffer",
    "property_cleaning_offer_check",
  ]),
  "The fields stay optional and are written into details, metadata and FormData.",
);

pass(
  "lead:submit-only",
  "Lead API remains submit-only",
  sources.seoLeadForm.includes('onSubmit={handleSubmit}') &&
    sources.seoLeadForm.includes('await fetch("/api/bookings"') &&
    !/useEffect\s*\([^)]*fetch\(["']\/api/s.test(sources.seoLeadForm),
  "No automatic public-page API call was introduced.",
);

pass(
  "offer-check:property-intents",
  "Offer-check pages expose Hausverwaltung/Treppenhaus/Unterhalt cleaning CTAs",
  includesAll(sources.offerCheck, [
    "service=hausverwaltung-reinigung",
    "intent=hausverwaltung-reinigungsangebot-pruefen",
    "service=treppenhausreinigung",
    "intent=treppenhausreinigung-angebot-pruefen",
    "service=unterhaltsreinigung",
    "intent=unterhaltsreinigung-angebot-pruefen",
  ]),
  "Existing offer-check routes now route property cleaning users to the right prefilled contact flow.",
);

pass(
  "differentiation:visible-copy",
  "Treppenhaus, Unterhalt, Hausverwaltung and Gebäude are differentiated in visible content",
  includesAll(sources.duesseldorfComponent, [
    "Wie unterscheiden sich Treppenhausreinigung, Unterhaltsreinigung und Hausverwaltung-Reinigung?",
    "Treppenhausreinigung fokussiert",
    "Unterhaltsreinigung meint",
    "Gebäudereinigung / Objekt-Reinigung",
    "Eine Suchintention, ein sauberer Anfrageweg.",
  ]),
  "The hub explains scope instead of creating overlapping service pages.",
);

pass(
  "content:effort-turnus",
  "Object areas, effort factors and turnus are covered",
  includesAll(sources.duesseldorfComponent, [
    "propertyCleaningSituations",
    "propertyEffortFactors",
    "CleaningTurnusPanel",
    "Zugang, Schlüsselregelung",
    "gewünschter Turnus",
  ]),
  "Property managers can see which facts matter before requesting a quote.",
);

pass(
  "content:english-intent",
  "English property-cleaning intent is covered",
  includesAll(sources.duesseldorfComponent + sources.leadIntents, [
    "property management cleaning",
    "staircase cleaning",
    "common area cleaning",
    "building-cleaning",
  ]),
  "International users get a simple English bridge without separate duplicate pages.",
);

pass(
  "internal-linking:cluster",
  "Internal links connect cleaning hub, offer check and contact path",
  includesAll(sources.duesseldorfComponent + sources.offerCheck, [
    "/duesseldorf/reinigung#hausverwaltung-reinigung",
    "/duesseldorf/gewerbereinigung",
    "/duesseldorf/bueroreinigung",
    "/angebot-guenstiger-pruefen",
    "/kontakt?service=hausverwaltung-reinigung",
  ]),
  "The cluster uses existing strong pages and the prefilled contact flow.",
);

warn(
  "sitemap:consolidation",
  "Sitemap keeps canonical routes consolidated",
  sources.sitemapRoutes.includes('"/duesseldorf/reinigung"') &&
    !deprecatedRoutes.some((route) => sources.sitemapRoutes.includes(`"${route}"`)),
  "Deprecated Düsseldorf micro routes should not enter sitemap routes.",
);

const fakeTrustMarkers = [
  "AggregateRating",
  "ratingValue",
  "bestRating",
  "worstRating",
  "Kundenstimme",
  "Referenzkunde",
  "zertifiziert",
  "TUV",
  '"Review"',
  "'Review'",
];
const hasFakeTrustMarker =
  fakeTrustMarkers.some((marker) => publicSource.toLowerCase().includes(marker.toLowerCase())) ||
  publicSource.includes(`T${String.fromCharCode(220)}V`) ||
  /100%\s*(?:Garantie|garantiert)/i.test(publicSource);

pass(
  "metadata:schema-boundaries",
  "No fake reviews, ratings, customer names or guarantee schema were added",
  !hasFakeTrustMarker,
  "The sprint avoids fabricated trust and guarantee claims.",
);

pass(
  "vercel:public-page-safety",
  "No public-page dynamic runtime or load-time backend dependency was added",
  !/(force-dynamic|runtime\s*=\s*["']nodejs["']|revalidate\s*=|unstable_noStore|createClient\(|supabase|resend|sharp|cron|setInterval\()/i.test(publicSource),
  "Public pages remain static and the lead API is only used on form submit.",
);

pass(
  "encoding:changed-files",
  "Changed sprint files do not contain mojibake markers",
  !/Ã|Â/.test(publicSource + sources.packageJson),
  "UTF-8 text is clean in the sprint files checked here.",
);

for (const doc of docs) {
  pass(`doc:${path.basename(doc)}`, `${doc} exists`, exists(doc), doc);
}

pass(
  "package:script",
  "npm script hausverwaltung-cleaning:health exists",
  sources.packageJson.includes('"hausverwaltung-cleaning:health": "node scripts/hausverwaltung-cleaning-health.cjs"'),
  "package.json script registration.",
);

const hasFail = checks.some((check) => check.status === "FAIL");
const hasWarn = checks.some((check) => check.status === "WARN");
const status = hasFail ? "FAIL" : hasWarn ? "WARN" : "PASS";

const report = {
  status,
  generatedAt: new Date().toISOString(),
  summary: {
    total: checks.length,
    pass: checks.filter((check) => check.status === "PASS").length,
    warn: checks.filter((check) => check.status === "WARN").length,
    fail: checks.filter((check) => check.status === "FAIL").length,
  },
  canonicalRoutes,
  deprecatedRoutes,
  checks,
};

const markdown = [
  "# Hausverwaltung Cleaning Health Report",
  "",
  `Status: ${status}`,
  `Generated: ${report.generatedAt}`,
  "",
  "## Summary",
  "",
  `- Total: ${report.summary.total}`,
  `- PASS: ${report.summary.pass}`,
  `- WARN: ${report.summary.warn}`,
  `- FAIL: ${report.summary.fail}`,
  "",
  "## Route Model",
  "",
  "- Primary Düsseldorf property-cleaning hub: `/duesseldorf/reinigung#hausverwaltung-reinigung`",
  "- Düsseldorf micro routes stay consolidated instead of becoming new thin pages.",
  "- Regensburg support pages stay on `/treppenhausreinigung-regensburg` and `/unterhaltsreinigung-regensburg`.",
  "- Offer-check routes prefill property-cleaning service and intent parameters.",
  "",
  "## Checks",
  "",
  "| Status | ID | Check | Details |",
  "| --- | --- | --- | --- |",
  ...checks.map((check) => `| ${check.status} | ${escapeCell(check.id)} | ${escapeCell(check.label)} | ${escapeCell(check.details)} |`),
  "",
].join("\n");

fs.writeFileSync(absolute("hausverwaltung-cleaning-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(absolute("HAUSVERWALTUNG_CLEANING_HEALTH_REPORT.md"), markdown);

console.log(`Hausverwaltung cleaning health: ${status}`);
console.log(`PASS ${report.summary.pass} / WARN ${report.summary.warn} / FAIL ${report.summary.fail}`);
console.log("Wrote HAUSVERWALTUNG_CLEANING_HEALTH_REPORT.md");
console.log("Wrote hausverwaltung-cleaning-health-report.json");

if (hasFail) {
  process.exitCode = 1;
}
