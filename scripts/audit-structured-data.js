#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const { htmlFileToRoute, walk, writeCsv } = require("./editorial-audit-utils.js");
const {
  analyzeHtmlDocuments,
  normalizeRoute,
  parseRedirectSourceRoutes,
  scanPublicSource,
} = require("./structured-data-policy.cjs");

const root = process.cwd();
const outRoot = path.join(root, "out");
const reportFile = path.join(root, "artifacts", "structured-data-audit.csv");
const redirectsFile = path.join(root, "public", "_redirects");

if (!fs.existsSync(outRoot)) {
  console.error("Structured-data audit requires an existing out/ build.");
  process.exit(1);
}

const htmlFiles = walk(outRoot, (entry) => entry.endsWith(".html"));
const redirectSources = fs.existsSync(redirectsFile)
  ? parseRedirectSourceRoutes(fs.readFileSync(redirectsFile, "utf8"))
  : new Set();
const documents = htmlFiles.map((file) => ({
  route: htmlFileToRoute(outRoot, file),
  html: fs.readFileSync(file, "utf8"),
  isRedirectAlias: redirectSources.has(normalizeRoute(htmlFileToRoute(outRoot, file))),
}));
const rendered = analyzeHtmlDocuments(documents);
const source = scanPublicSource(root);
const sitemapFile = path.join(outRoot, "sitemap.xml");
const sitemapAliasFindings = [];

if (fs.existsSync(sitemapFile)) {
  const sitemap = fs.readFileSync(sitemapFile, "utf8");
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
    try {
      const route = normalizeRoute(new URL(match[1]).pathname);
      if (redirectSources.has(route)) {
        sitemapAliasFindings.push({
          route,
          source: "out/sitemap.xml",
          block: 0,
          type: "RedirectAlias",
          issue: "REDIRECT_ALIAS_IN_SITEMAP",
          severity: "error",
          detail: `${route} is a redirect source and must not be listed as an indexable sitemap URL.`,
        });
      }
    } catch {
      // Sitemap syntax is validated by the dedicated sitemap/SEO gates.
    }
  }
}

const rows = [
  ...rendered.findings.map((item) => ({
    route: item.route,
    source: "rendered-html",
    block: item.block,
    type: item.type,
    issue: item.issue,
    severity: item.severity,
    detail: item.detail,
  })),
  ...source.findings.map((item) => ({
    route: "",
    source: item.source,
    block: 0,
    type: "SOURCE",
    issue: item.issue,
    severity: item.severity,
    detail: item.detail,
  })),
  ...sitemapAliasFindings,
];

writeCsv(reportFile, ["route", "source", "block", "type", "issue", "severity", "detail"], rows);

const counts = rows.reduce((result, row) => {
  result[row.issue] = (result[row.issue] || 0) + 1;
  return result;
}, {});
const errors = rows.filter((row) => row.severity === "error").length;

console.log(JSON.stringify({
  passed: errors === 0,
  htmlFiles: htmlFiles.length,
  sourceFiles: source.filesScanned,
  jsonLdBlocks: rendered.jsonLdBlocks,
  configuredRedirectSources: redirectSources.size,
  renderedRedirectAliasDocuments: rendered.redirectAliasDocuments,
  redirectAliasesInSitemap: counts.REDIRECT_ALIAS_IN_SITEMAP || 0,
  invalidJson: counts.INVALID_JSON || 0,
  selfReferentialReviewSchema: counts.SELF_REFERENTIAL_REVIEW_SCHEMA || 0,
  qAPageStaticFaq: counts.QAPAGE_STATIC_FAQ || 0,
  faqContentNotVisible: counts.FAQ_CONTENT_NOT_VISIBLE || 0,
  faqDuplication: (counts.FAQ_DUPLICATE_ENTRY || 0)
    + (counts.FAQ_BLOCK_DUPLICATED_ACROSS_ROUTES || 0)
    + (counts.FAQ_ENTRY_MASS_DUPLICATED || 0),
  starRatingsInMetadata: counts.STAR_RATING_IN_METADATA || 0,
  invalidOrMismatchedSchemas: (counts.INVALID_SUPPORTED_SCHEMA || 0)
    + (counts.SCHEMA_ROUTE_MISMATCH || 0)
    + (counts.SCHEMA_LANGUAGE_MISMATCH || 0)
    + (counts.INVALID_SCHEMA_CONTEXT || 0),
  unverifiedClaims: Object.entries(counts)
    .filter(([issue]) => issue.startsWith("UNVERIFIED_"))
    .reduce((sum, [, count]) => sum + count, 0),
  findings: rows.length,
  errors,
  report: path.relative(root, reportFile),
}, null, 2));

if (errors) process.exit(1);
