#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const generatedAt = new Date().toISOString();

const files = {
  primaryPage: path.join(root, "app", "regensburg", "umzug", "page.tsx"),
  supportPage: path.join(root, "app", "umzug-regensburg", "page.tsx"),
  nextConfig: path.join(root, "next.config.js"),
  sitemapRoutes: path.join(root, "lib", "sitemap-routes.ts"),
  packageJson: path.join(root, "package.json"),
};

const outputs = {
  markdown: path.join(root, "UMZUG_REGENSBURG_HEALTH_REPORT.md"),
  json: path.join(root, "umzug-regensburg-health-report.json"),
};

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function has(source, pattern) {
  return typeof pattern === "string" ? source.includes(pattern) : pattern.test(source);
}

function add(results, id, status, priority, file, detail, recommendation = "No action.") {
  results.push({
    id,
    status,
    priority,
    file: file ? rel(file) : "",
    detail,
    recommendation,
  });
}

function includesAll(source, values) {
  return values.every((value) => has(source, value));
}

function checkPrimaryRoute(results, primarySource) {
  add(
    results,
    "primary-route-exists",
    fs.existsSync(files.primaryPage) ? "PASS" : "FAIL",
    "P0",
    files.primaryPage,
    fs.existsSync(files.primaryPage) ? "Primary route /regensburg/umzug exists." : "Primary route file is missing.",
    fs.existsSync(files.primaryPage) ? "No action." : "Create app/regensburg/umzug/page.tsx."
  );

  add(
    results,
    "h1-intent",
    /<h1[\s\S]*Umzug[\s\S]*Regensburg/i.test(primarySource) ? "PASS" : "FAIL",
    "P0",
    files.primaryPage,
    "H1 should contain Umzug and Regensburg.",
    "Keep the H1 focused on the local moving intent."
  );

  add(
    results,
    "metadata",
    includesAll(primarySource, ["export const metadata", "title:", "description:", "canonicalPath", "/regensburg/umzug"])
      ? "PASS"
      : "FAIL",
    "P0",
    files.primaryPage,
    "Title, description and canonical path are present in route metadata.",
    includesAll(primarySource, ["export const metadata", "title:", "description:", "canonicalPath", "/regensburg/umzug"])
      ? "No action."
      : "Add route-level metadata with canonical /regensburg/umzug."
  );
}

function checkSupportRoute(results, supportSource, nextConfigSource) {
  const sourceRedirect = /permanentRedirect\(["']\/regensburg\/umzug["']\)/.test(supportSource);
  const configRedirect =
    nextConfigSource.includes("['/umzug-regensburg', '/regensburg/umzug']") ||
    nextConfigSource.includes('["/umzug-regensburg", "/regensburg/umzug"]');

  add(
    results,
    "support-route-redirect",
    sourceRedirect && configRedirect ? "PASS" : sourceRedirect || configRedirect ? "WARN" : "FAIL",
    "P0",
    files.supportPage,
    `Support route source redirect: ${sourceRedirect}; next.config redirect: ${configRedirect}.`,
    "Keep /umzug-regensburg as redirect/support route, not as competing page."
  );
}

function checkSitemap(results, sitemapSource) {
  const hasPrimary = sitemapSource.includes('"/regensburg/umzug"');
  const hasDuplicate = sitemapSource.includes('"/umzug-regensburg"');
  add(
    results,
    "sitemap-primary",
    hasPrimary ? "PASS" : "FAIL",
    "P0",
    files.sitemapRoutes,
    hasPrimary ? "Sitemap contains /regensburg/umzug." : "Sitemap does not contain /regensburg/umzug.",
    "Run npm run seo:sitemap after route changes."
  );
  add(
    results,
    "sitemap-duplicate",
    hasDuplicate ? "FAIL" : "PASS",
    "P0",
    files.sitemapRoutes,
    hasDuplicate ? "Sitemap contains duplicate /umzug-regensburg." : "Sitemap excludes /umzug-regensburg.",
    "Only the canonical moving page should be listed."
  );
}

function checkConversion(results, primarySource) {
  const moveParams = "service=umzug&city=regensburg&intent=umzug-regensburg&source=website";
  const offerParams = "service=umzug&city=regensburg&intent=umzugsangebot-pruefen&source=website";
  add(
    results,
    "hero-contact-cta",
    primarySource.includes(moveParams) ? "PASS" : "FAIL",
    "P0",
    files.primaryPage,
    "Primary moving CTA should include service=umzug, city=regensburg and intent=umzug-regensburg.",
    "Use the canonical contact query for moving leads."
  );
  add(
    results,
    "offer-check-cta",
    primarySource.includes(offerParams) && /Umzugsangebot[\s\S]*pr(?:ue|ü)fen/i.test(primarySource) ? "PASS" : "FAIL",
    "P0",
    files.primaryPage,
    "Offer-check CTA should be visible and use intent=umzugsangebot-pruefen.",
    "Keep the Umzugsangebot CTA visible above FAQ."
  );
}

function checkContent(results, primarySource) {
  const required = [
    ["quick-answer-ai", ["Quick Answer", "AI-Antwort"]],
    ["faq-visible", ["faqItems", /H(?:ae|ä)ufige Fragen zum Umzug in Regensburg/]],
    ["authority-signals", ["Authority und Entscheidung", "Anfragequalität", "Kontaktfluss ohne Umwege"]],
    ["effort-factors", ["Aufwandstreiber", "Etage", "Trageweg", "Terminfenster"]],
    ["piano-link", ["/klaviertransport-regensburg", "Klaviertransport"]],
    ["senior-link", ["Seniorenumzug", "/regensburg/seniorenumzug"]],
    ["backhaul-link", ["Beiladung", "/beiladung-regensburg", "/leerfahrt-rueckfahrt"]],
    ["english-intent", ["moving company", "moving help", "simple English"]],
    ["local-relevance", ["Regensburg als Hauptort", "Servicegebiet auf Anfrage"]],
  ];

  for (const [id, needles] of required) {
    add(
      results,
      id,
      includesAll(primarySource, needles) ? "PASS" : "FAIL",
      id === "faq-visible" || id === "quick-answer-ai" ? "P0" : "P1",
      files.primaryPage,
      `Required content signals: ${needles.join(", ")}`,
      "Keep this content visible on /regensburg/umzug."
    );
  }
}

function checkNoClaims(results, primarySource) {
  const expectedNoClaims = [
    "keine Preisgarantie",
    "keine Soforttermin-Garantie",
    /keine garantierte Verf(?:ue|ü)gbarkeit/,
    "keine Rechtsberatung",
    "keine automatische Buchung",
  ];

  add(
    results,
    "visible-no-guarantees",
    includesAll(primarySource, expectedNoClaims) ? "PASS" : "FAIL",
    "P0",
    files.primaryPage,
    "Required no-guarantee disclaimers are visible.",
    "Keep no-price, no-instant-date and no-auto-booking language visible."
  );

  const forbidden = [
    /(?:geben|bieten|garantieren)\s+(?:eine\s+)?Preisgarantie/i,
    /Preis\s+(?:ist\s+)?garantiert/i,
    /(?:geben|bieten|garantieren)\s+(?:eine\s+)?Sofortgarantie/i,
    /garantierte\s+Ersparnis/i,
    /Google[-\s]?Ranking[-\s]?Garantie/i,
    /AI[-\s]?Ranking[-\s]?Garantie/i,
    /AggregateRating|Review|ratingValue/i,
  ];
  const hits = forbidden.filter((pattern) => pattern.test(primarySource)).map(String);
  add(
    results,
    "fake-claim-scan",
    hits.length ? "FAIL" : "PASS",
    "P0",
    files.primaryPage,
    hits.length ? `Potential forbidden claims/schema found: ${hits.join(", ")}` : "No fake ratings, ranking guarantees or positive guarantee claims found.",
    "Remove fake claims and never add AggregateRating/Review without real data."
  );

  add(
    results,
    "keyword-cloud-scan",
    /Short Keywords|Long-Tail|Keyword-Cluster|keyword cloud|Keyword-Wolke/i.test(primarySource) ? "FAIL" : "PASS",
    "P1",
    files.primaryPage,
    "No visible keyword-cloud structures should be present on the page.",
    "Keep keyword work in docs, not visible page copy."
  );
}

function checkVercelSafety(results, sourceMap) {
  const patterns = [
    ["runtime-nodejs", /runtime\s*=\s*["']nodejs["']/],
    ["force-dynamic", /dynamic\s*=\s*["']force-dynamic["']/],
    ["revalidate", /revalidate\s*=/],
    ["vitals-api", /\/api\/vitals/],
    ["conversion-api", /\/api\/conversion-events/],
    ["auto-api-fetch", /fetch\(["']\/api/],
    ["send-beacon", /sendBeacon/],
    ["supabase", /supabase/i],
    ["resend", /resend/i],
    ["sharp", /sharp/i],
  ];

  for (const [id, pattern] of patterns) {
    const hits = Object.entries(sourceMap)
      .filter(([, source]) => pattern.test(source))
      .map(([name]) => name);
    add(
      results,
      `vercel-${id}`,
      hits.length ? "FAIL" : "PASS",
      "P0",
      null,
      hits.length ? `Found in ${hits.join(", ")}` : `No ${id} pattern found in checked public route files.`,
      "Keep public page visits static and free of automatic server/API work."
    );
  }
}

function checkScriptRegistration(results, packageSource) {
  add(
    results,
    "npm-script",
    packageSource.includes('"umzug-regensburg:health"') ? "PASS" : "FAIL",
    "P0",
    files.packageJson,
    "npm run umzug-regensburg:health should be registered.",
    packageSource.includes('"umzug-regensburg:health"') ? "No action." : "Add the script to package.json."
  );
}

function writeReports(results) {
  const summary = {
    generatedAt,
    checks: results.length,
    pass: results.filter((item) => item.status === "PASS").length,
    warn: results.filter((item) => item.status === "WARN").length,
    fail: results.filter((item) => item.status === "FAIL").length,
  };
  const status = summary.fail ? "FAIL" : summary.warn ? "WARN" : "PASS";
  const output = { status, summary, results };
  const rows = results.map(
    (item) =>
      `| ${item.status} | ${item.priority} | ${item.id} | ${item.file || "-"} | ${item.detail.replace(/\|/g, "\\|")} | ${item.recommendation.replace(/\|/g, "\\|")} |`
  );
  const markdown = [
    "# Umzug Regensburg Health Report",
    "",
    `Generated: ${generatedAt}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Checks: ${summary.checks}`,
    `- PASS: ${summary.pass}`,
    `- WARN: ${summary.warn}`,
    `- FAIL: ${summary.fail}`,
    "",
    "## Results",
    "",
    "| Status | Priority | Check | File | Detail | Recommendation |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");

  fs.writeFileSync(outputs.json, JSON.stringify(output, null, 2));
  fs.writeFileSync(outputs.markdown, markdown);
  return output;
}

function main() {
  const primarySource = read(files.primaryPage);
  const supportSource = read(files.supportPage);
  const nextConfigSource = read(files.nextConfig);
  const sitemapSource = read(files.sitemapRoutes);
  const packageSource = read(files.packageJson);
  const results = [];

  checkPrimaryRoute(results, primarySource);
  checkSupportRoute(results, supportSource, nextConfigSource);
  checkSitemap(results, sitemapSource);
  checkConversion(results, primarySource);
  checkContent(results, primarySource);
  checkNoClaims(results, primarySource);
  checkVercelSafety(results, {
    "app/regensburg/umzug/page.tsx": primarySource,
    "app/umzug-regensburg/page.tsx": supportSource,
  });
  checkScriptRegistration(results, packageSource);

  const output = writeReports(results);
  console.log(`Umzug Regensburg health status: ${output.status}`);
  console.log("Reports written: UMZUG_REGENSBURG_HEALTH_REPORT.md, umzug-regensburg-health-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main();
