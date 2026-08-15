#!/usr/bin/env node

const assert = require("node:assert/strict");
const path = require("node:path");

const {
  ROOT,
  addResult,
  criticalRoutes,
  fetchPath,
  findRiskClaims,
  normalizeForScan,
  readFileIfExists,
  rel,
  reportBaseUrl,
  stripTags,
  walk,
  writeReport,
} = require("./qa-shared.cjs");

function verifyClaimNegationFixtures() {
  const fixtures = [
    {
      text: "Die Prüfung ist weder eine Preis- noch eine Ersparnisgarantie.",
      expectedRules: [],
    },
    {
      text: "Ersetzt die Prüfung eine Rechtsberatung? Nein. Verträge werden nicht bewertet.",
      expectedRules: [],
    },
    {
      text: "Wir geben eine Ersparnisgarantie.",
      expectedRules: ["savings-guarantee"],
    },
    {
      text: "Unsere Prüfung ersetzt eine Rechtsberatung.",
      expectedRules: ["legal-advice"],
    },
    {
      text: "Ersetzt die Prüfung eine Rechtsberatung? Ja.",
      expectedRules: ["legal-advice"],
    },
  ];

  for (const fixture of fixtures) {
    assert.deepEqual(
      findRiskClaims(fixture.text).map((finding) => finding.rule),
      fixture.expectedRules,
      `Unexpected claim classification for fixture: ${fixture.text}`,
    );
  }

  return fixtures.length;
}

const centralFiles = [
  "lib/company.ts",
  "lib/lead-intents.ts",
  "lib/lead-routing.ts",
  "lib/service-routing.ts",
  "lib/source-of-truth.ts",
  "lib/cta-config.ts",
  "lib/structured-data.ts",
  "lib/schema-datasets.ts",
  "lib/service-products.ts",
  "lib/service-faqs.ts",
  "components/Footer.tsx",
  "components/SeoLeadForm.tsx",
  "components/MobileFloatingContact.tsx",
  "components/LeadCta.tsx",
];

function keywordCloudScore(text) {
  const normalized = normalizeForScan(stripTags(text));
  const cityNames = ["regensburg", "duesseldorf", "dusseldorf", "muenchen", "munchen", "nuernberg", "nurnberg", "landshut", "ingolstadt", "augsburg", "passau", "amberg", "weiden", "rosenheim", "wuerzburg"];
  const hits = cityNames.reduce((sum, city) => sum + (normalized.match(new RegExp(`\\b${city}\\b`, "g")) || []).length, 0);
  return { hits, unique: cityNames.filter((city) => normalized.includes(city)).length };
}

function hasFakeAddressPattern(text) {
  const normalized = normalizeForScan(text);
  return /niederlassung\s+(duesseldorf|munchen|muenchen|nuernberg|nurnberg|landshut)/i.test(normalized) ||
    /adresse\s+folgt|musterstrasse|beispielstrasse|12345/i.test(normalized);
}

async function scanRoute(baseUrl, route, results) {
  if (route.nonHtml || route.optional) return;
  const target = route.expectedRedirectPath || route.path;
  const response = await fetchPath(baseUrl, target, { redirect: "manual" });
  if (!response.ok || response.status >= 400) {
    addResult(results, "WARN", "content-route", route.path, response.error || `HTTP ${response.status}`, "Route was not scannable; qa:routes owns hard status failures.", { priority: route.priority });
    return;
  }

  const text = stripTags(response.body || "");
  const claims = findRiskClaims(text);
  addResult(results, claims.length ? "FAIL" : "PASS", "fake-claims", route.path, claims.length ? `${claims.length} risky claim pattern(s) found.` : "No risky guarantee/fake-claim pattern found.", claims.length ? "Remove or qualify unsupported claim." : "No action.", { priority: route.priority, findings: claims.slice(0, 8) });

  const cloud = keywordCloudScore(text);
  addResult(results, cloud.hits > 80 || cloud.unique > 10 ? "WARN" : "PASS", "keyword-cloud", route.path, `City mentions: ${cloud.hits}; unique city tokens: ${cloud.unique}.`, cloud.hits > 80 || cloud.unique > 10 ? "Review for footer/location keyword cloud." : "No action.", { priority: route.priority });

  addResult(results, hasFakeAddressPattern(text) ? "FAIL" : "PASS", "fake-location", route.path, hasFakeAddressPattern(text) ? "Fake address/branch marker found." : "No fake address/branch marker found.", hasFakeAddressPattern(text) ? "Remove unsupported branch/address wording." : "No action.", { priority: route.priority });
}

function scanCentralFiles(results) {
  const files = Array.from(new Set([
    ...centralFiles.map((file) => path.join(ROOT, file)),
    ...walk(path.join(ROOT, "lib", "local-seo"), (file) => /\.(ts|tsx|js|cjs|mjs)$/.test(file)).slice(0, 60),
  ]));

  for (const file of files) {
    const source = readFileIfExists(file);
    if (!source) {
      addResult(results, "WARN", "central-data", rel(file), "Expected central file missing or not readable.", "Confirm file was intentionally removed/renamed.", { priority: "P2" });
      continue;
    }

    const claims = findRiskClaims(source);
    addResult(results, claims.length ? "WARN" : "PASS", "central-data-claims", rel(file), claims.length ? `${claims.length} risky claim pattern(s) in source data.` : "No risky claim pattern in central data.", claims.length ? "Review source wording before deploy." : "No action.", { priority: "P1", findings: claims.slice(0, 8) });

    const fakeAddress = hasFakeAddressPattern(source);
    addResult(results, fakeAddress ? "FAIL" : "PASS", "central-data-location", rel(file), fakeAddress ? "Fake address/branch marker found in central data." : "No fake address marker in central data.", fakeAddress ? "Remove unsupported address/branch claim." : "No action.", { priority: "P0" });
  }
}

async function main() {
  const claimNegationFixtures = verifyClaimNegationFixtures();
  const { baseUrl, explicit } = reportBaseUrl();
  const results = [];
  const routes = criticalRoutes.filter((route) => route.priority === "P0" && !route.nonHtml);

  for (const route of routes) {
    await scanRoute(baseUrl, route, results);
  }
  scanCentralFiles(results);

  const output = writeReport({
    markdownPath: "QA_CONTENT_SAFETY_REPORT.md",
    jsonPath: "qa-content-safety-report.json",
    title: "QA Content Safety Report",
    summary: {
      baseUrl,
      baseUrlWasExplicit: explicit,
      p0RoutesScanned: routes.length,
      centralFilesScanned: centralFiles.length,
      claimNegationFixtures,
      piiPolicy: "No submitted lead data is read or written by this script.",
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- Unsupported guarantee, rating, legal/care/medical advice and fake location claims are RED on rendered P0 pages.",
      "- Central data warnings require editorial review before production.",
    ],
  });

  console.log(`QA content safety status: ${output.status}`);
  console.log("Reports written: QA_CONTENT_SAFETY_REPORT.md, qa-content-safety-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
