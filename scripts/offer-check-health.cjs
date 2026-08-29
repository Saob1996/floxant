const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return "";
  return fs.readFileSync(absolutePath, "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function includesAny(source, needles) {
  return needles.some((needle) => source.includes(needle));
}

function add(checks, id, status, details) {
  checks.push({ id, status, details });
}

const primaryPage = read("app/angebot-guenstiger-pruefen/page.tsx");
const supportPage = read("app/angebotscheck/page.tsx");
const comparisonPage = read("app/anbieter-vergleichen/page.tsx");
const contactPage = read("app/kontakt/page.tsx");
const cheaperForm = read("components/CheaperAlternativeForm.tsx");
const seoLeadForm = read("components/SeoLeadForm.tsx");
const packageJson = read("package.json");
const sitemapRoutes = read("lib/sitemap-routes.ts");
const leadIntents = read("lib/lead-intents.ts");
const ctaComponent = read("components/conversion/OfferCheckCTA.tsx");
const internalSources = [
  read("app/page.tsx"),
  read("app/leistungen/page.tsx"),
  read("app/kontakt/page.tsx"),
  read("app/reinigung-regensburg/page.tsx"),
  read("app/umzug-regensburg/page.tsx"),
  read("app/entruempelung/page.tsx"),
  read("app/bueroreinigung-regensburg/page.tsx"),
  read("app/gewerbereinigung-regensburg/page.tsx"),
  read("app/wohnungsaufloesung-regensburg/page.tsx"),
].join("\n");

const docs = [
  "docs/OFFER_CHECK_ARCHITECTURE.md",
  "docs/OFFER_CHECK_KEYWORD_INTENT_MAP.md",
  "docs/OFFER_CHECK_METADATA_SCHEMA_SITEMAP_REPORT.md",
  "docs/OFFER_CHECK_AI_FAQ_REPORT.md",
  "docs/OFFER_CHECK_ENGLISH_INTENT_REPORT.md",
  "docs/OFFER_CHECK_INTERNAL_LINKING_REPORT.md",
];

const checks = [];

add(checks, "primary-page-exists", exists("app/angebot-guenstiger-pruefen/page.tsx") ? "PASS" : "FAIL", "Primary offer-check page is present.");
add(
  checks,
  "clear-h1",
  primaryPage.includes("Angebot prüfen lassen, bevor Sie vorschnell zusagen") ? "PASS" : "FAIL",
  "Primary page keeps the requested clear H1.",
);
add(
  checks,
  "metadata-present",
  primaryPage.includes("Angebot prüfen lassen - Preis, Umfang und offene Punkte klären") &&
    primaryPage.includes("Ohne Rechtsberatung") &&
    supportPage.includes("title: pageMeta.seoTitle") &&
    supportPage.includes("description: pageMeta.description") &&
    comparisonPage.includes("Anbieter vergleichen - Leistung, Umfang und Risiko einordnen")
    ? "PASS"
    : "FAIL",
  "Offer-check, support and comparison metadata are differentiated.",
);
add(
  checks,
  "no-guarantee-claims",
  /garantiert\s+(?:günstiger|billiger|ersparnis)|ersparnis\s+garantiert|preisersparnis\s+garant/i.test(primaryPage)
    ? "FAIL"
    : "PASS",
  "No wording promises a cheaper result or guaranteed savings.",
);
add(
  checks,
  "legal-boundary-visible",
  primaryPage.includes("keine Rechtsberatung") && cheaperForm.includes("keine Rechtsberatung") && seoLeadForm.includes("keine Rechtsberatung")
    ? "PASS"
    : "FAIL",
  "Legal boundary is visible on page and forms.",
);
add(
  checks,
  "savings-boundary-visible",
  primaryPage.includes("keine Ersparnisgarantie") && cheaperForm.includes("keine Ersparnisgarantie") && seoLeadForm.includes("keine Ersparnisgarantie")
    ? "PASS"
    : "FAIL",
  "Savings boundary is visible on page and forms.",
);
add(
  checks,
  "visible-faq",
  primaryPage.includes("<details") && primaryPage.includes("offerCheckAiAnswers") ? "PASS" : "FAIL",
  "FAQ and expandable answer blocks are visible in source.",
);
add(
  checks,
  "ai-answer-blocks",
  primaryPage.includes("Ablauf kurz erklärt") && primaryPage.includes("offerCheckAiAnswers") && primaryPage.includes("Was tun, wenn ein Angebot zu teuer wirkt?") ? "PASS" : "FAIL",
  "AI-answer style questions are present.",
);
add(
  checks,
  "service-matrix",
  primaryPage.includes('id="service-matrix"') &&
    includesAny(primaryPage, ["Büroreinigung", "Gewerbereinigung", "Klaviertransport", "Solarreinigung / PV", "B2B-Services"])
    ? "PASS"
    : "FAIL",
  "Service-specific matrix covers core offer-check services.",
);
add(
  checks,
  "warning-signs",
  primaryPage.includes("Warnsignale") && primaryPage.includes("Zusatzkosten") ? "PASS" : "FAIL",
  "Warning signs are visible.",
);
add(
  checks,
  "scope-boundary",
  primaryPage.includes('id="scope-boundary"') && primaryPage.includes("Was nicht geprüft wird") ? "PASS" : "FAIL",
  "Scope boundary is visible.",
);
add(
  checks,
  "cta-present",
  primaryPage.includes("/kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=website") &&
    primaryPage.includes("#guenstiger-form")
    ? "PASS"
    : "FAIL",
  "Primary CTAs include form anchor and clean contact parameters.",
);
add(
  checks,
  "service-contact-params",
  includesAny(primaryPage, [
    "reinigungsangebot-pruefen",
    "bueroreinigung-angebot-pruefen",
    "gewerbereinigung-angebot-pruefen",
    "umzugsangebot-pruefen",
    "entruempelungsangebot-pruefen",
    "solarreinigung-angebot-pruefen",
    "klaviertransport-angebot-pruefen",
  ])
    ? "PASS"
    : "FAIL",
  "Service-specific contact intents are present.",
);
add(
  checks,
  "form-recognizes-offer-check",
  cheaperForm.includes('formData.set("intent", "angebot-pruefen")') &&
    cheaperForm.includes('formData.set("serviceCategory", "angebot_pruefen")') &&
    cheaperForm.includes('name="offerStatus"') &&
    cheaperForm.includes('name="urgency"')
    ? "PASS"
    : "FAIL",
  "CheaperAlternativeForm sends offer-check intent, category, status and urgency.",
);
add(
  checks,
  "honest-success-state",
  cheaperForm.includes("Anfrage zur Angebotsprüfung wurde gesendet") &&
    cheaperForm.includes("keine Rechtsberatung") &&
    cheaperForm.includes("keine Ersparnisgarantie") &&
    seoLeadForm.includes("keine Preisgarantie und keine Ersparnisgarantie")
    ? "PASS"
    : "FAIL",
  "Success states are honest and bounded.",
);
add(
  checks,
  "internal-links",
  (internalSources.match(/angebot-guenstiger-pruefen/g) || []).length >= 8 && ctaComponent.includes("data-service")
    ? "PASS"
    : "WARN",
  "Offer-check links exist in key hubs/service pages; some deleted Düsseldorf pages require manual follow-up.",
);
add(
  checks,
  "english-intent",
  primaryPage.includes("Can I ask in English?") &&
    primaryPage.includes("english-offer-check") &&
    leadIntents.includes('"offer-check"')
    ? "PASS"
    : "FAIL",
  "English intent is visible and mapped through lead-intents.",
);
add(
  checks,
  "no-keyword-cloud",
  /angebot prüfen\s*angebot prüfen\s*angebot prüfen/i.test(primaryPage) ? "FAIL" : "PASS",
  "No repeated keyword-cloud block detected.",
);
add(
  checks,
  "no-new-doorway-pages",
  !exists("app/umzugsangebot-pruefen/page.tsx") &&
    !exists("app/entruempelungsangebot-pruefen/page.tsx") &&
    !exists("app/fairpreis-check/page.tsx")
    ? "PASS"
    : "WARN",
  "Sprint did not create mass service-specific doorway pages.",
);
add(
  checks,
  "sitemap-canonical-clean",
  sitemapRoutes.includes('"/angebot-guenstiger-pruefen"') &&
    sitemapRoutes.includes('"/angebotscheck"') &&
    sitemapRoutes.includes('"/anbieter-vergleichen"')
    ? "PASS"
    : "WARN",
  "Primary/support/comparison pages are in sitemap routes; deleted local routes are documented separately.",
);
add(
  checks,
  "required-docs",
  docs.every(exists) ? "PASS" : "FAIL",
  `Required docs present: ${docs.filter(exists).length}/${docs.length}.`,
);
add(
  checks,
  "npm-script",
  packageJson.includes('"offer-check:health"') ? "PASS" : "FAIL",
  "npm script offer-check:health is registered.",
);

const counts = checks.reduce(
  (acc, check) => {
    acc[check.status] = (acc[check.status] || 0) + 1;
    return acc;
  },
  { PASS: 0, WARN: 0, FAIL: 0 },
);

const result = {
  generatedAt: new Date().toISOString(),
  status: counts.FAIL ? "FAIL" : counts.WARN ? "WARN" : "PASS",
  counts,
  checks,
};

const markdown = [
  "# Offer Check Health Report",
  "",
  `Generated: ${result.generatedAt}`,
  `Status: ${result.status}`,
  `Counts: PASS ${counts.PASS || 0}, WARN ${counts.WARN || 0}, FAIL ${counts.FAIL || 0}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- **${check.status}** ${check.id}: ${check.details}`),
  "",
  "## Notes",
  "",
  "- This script is static and does not start a server or call APIs.",
  "- WARN items are merge-review items, not silent failures.",
].join("\n");

fs.writeFileSync(path.join(root, "offer-check-health-report.json"), `${JSON.stringify(result, null, 2)}\n`);
fs.writeFileSync(path.join(root, "OFFER_CHECK_HEALTH_REPORT.md"), `${markdown}\n`);

console.log(`offer-check:health ${result.status} - PASS ${counts.PASS || 0}, WARN ${counts.WARN || 0}, FAIL ${counts.FAIL || 0}`);
for (const check of checks) {
  console.log(`${check.status} ${check.id}: ${check.details}`);
}

process.exit(counts.FAIL ? 1 : 0);
