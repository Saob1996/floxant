#!/usr/bin/env node

const {
  addResult,
  collectJsonLd,
  criticalRoutes,
  extractSitemapLocs,
  fetchPath,
  findLinkHref,
  hasNoindex,
  jsonLdTypes,
  normalizePath,
  npmCommand,
  reportBaseUrl,
  scriptExists,
  stripTags,
  writeReport,
} = require("./qa-shared.cjs");

function routeCanonicalPath(route) {
  return normalizePath(route.expectedCanonicalPath || route.expectedRedirectPath || route.path);
}

function routeFetchPath(route) {
  return normalizePath(route.expectedRedirectPath || route.path);
}

function sitemapHasRoute(locs, route) {
  const expected = routeCanonicalPath(route);
  return locs.some((loc) => normalizePath(loc) === expected || (!route.expectedRedirectPath && normalizePath(loc) === normalizePath(route.path)));
}

function robotsBlocksP0(robotsText, routePath) {
  const normalized = normalizePath(routePath);
  const lines = String(robotsText || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return lines.some((line) => {
    const match = line.match(/^disallow:\s*(.+)$/i);
    if (!match) return false;
    const blocked = normalizePath(match[1]);
    return blocked !== "/" && normalized.startsWith(blocked);
  });
}

async function checkP0Page(baseUrl, route, results) {
  if (route.nonHtml || route.optional) return;
  const targetPath = routeFetchPath(route);
  const response = await fetchPath(baseUrl, targetPath, { redirect: "manual" });
  if (!response.ok || response.status >= 400) {
    addResult(results, "FAIL", "seo-page", route.path, response.error || `HTTP ${response.status}`, "P0 page must be reachable for SEO checks.", { priority: route.priority });
    return;
  }

  const html = response.body || "";
  if (route.mustHaveCanonical) {
    const canonical = findLinkHref(html, "canonical");
    if (!canonical) {
      addResult(results, "FAIL", "canonical", route.path, "Canonical missing.", "Add canonical metadata.", { priority: route.priority });
    } else {
      const canonicalPath = normalizePath(canonical);
      const expectedPath = routeCanonicalPath(route);
      const status = canonicalPath === expectedPath ? "PASS" : route.expectedCanonicalPath ? "FAIL" : route.allowRedirect ? "PASS" : "WARN";
      addResult(results, status, "canonical", route.path, `Canonical ${canonicalPath}; expected ${expectedPath}.`, status === "PASS" ? "No action." : "Confirm canonical target manually.", { priority: route.priority });
    }
  }

  if (route.expectedNoindex) {
    addResult(results, hasNoindex(html) ? "PASS" : "FAIL", "noindex", route.path, hasNoindex(html) ? "Intentional noindex found." : "Required noindex missing.", hasNoindex(html) ? "No action." : "Add noindex to this non-organic route.", { priority: route.priority });
  } else if (route.mustNotHaveNoindex) {
    addResult(results, hasNoindex(html) ? "FAIL" : "PASS", "noindex", route.path, hasNoindex(html) ? "P0 page has noindex." : "No noindex on P0 page.", hasNoindex(html) ? "Remove noindex or update matrix intentionally." : "No action.", { priority: route.priority });
  }

  const jsonLd = collectJsonLd(html);
  addResult(results, jsonLd.errors.length ? "FAIL" : "PASS", "schema-json", route.path, jsonLd.errors.length ? `Invalid JSON-LD: ${jsonLd.errors.join("; ")}` : "JSON-LD parses or none present.", jsonLd.errors.length ? "Fix invalid JSON-LD." : "No action.", { priority: route.priority });

  const types = jsonLd.scripts.flatMap(jsonLdTypes);
  const visibleText = stripTags(html);
  const hasVisibleFaq = /faq|haeufig|häufig|fragen|frage/i.test(visibleText);
  const hasFaqSchema = types.includes("FAQPage");
  addResult(results, hasFaqSchema && !hasVisibleFaq ? "FAIL" : "PASS", "faq-schema", route.path, hasFaqSchema ? "FAQ schema visible-text consistency checked." : "No FAQ schema on page.", hasFaqSchema && !hasVisibleFaq ? "Only output FAQ schema when FAQ content is visible." : "No action.", { priority: route.priority, schemaTypes: types });

  const hasAggregateOrReview = types.some((type) => /AggregateRating|Review/i.test(type));
  addResult(results, hasAggregateOrReview ? "FAIL" : "PASS", "review-schema", route.path, hasAggregateOrReview ? `Review/AggregateRating schema found: ${types.join(", ")}` : "No Review/AggregateRating schema found.", hasAggregateOrReview ? "Remove fake/unverified rating/review schema." : "No action.", { priority: route.priority });

  const hasLocalBusiness = types.some((type) => /LocalBusiness/i.test(type));
  if (hasLocalBusiness && !/streetAddress|addressLocality|telephone/i.test(html)) {
    addResult(results, "WARN", "localbusiness-schema", route.path, "LocalBusiness schema found without obvious address/telephone fields in HTML source.", "Confirm it uses real business data only.", { priority: route.priority });
  } else if (hasLocalBusiness) {
    addResult(results, "PASS", "localbusiness-schema", route.path, "LocalBusiness schema has business-data markers.", "No action.", { priority: route.priority });
  }
}

function runExistingSeoScripts(results) {
  const scripts = [
    { name: "seo:sitemap", optional: false },
    { name: "seo:dedupe-risk", optional: true },
    { name: "snippet:health", optional: true },
    { name: "content-authority:health", optional: true },
    { name: "faq:health", optional: true },
  ];

  for (const item of scripts) {
    if (!scriptExists(item.name)) {
      addResult(results, "WARN", "seo-script", item.name, "Script missing.", "Add script or update qa:seo orchestration.", { priority: "P2" });
      continue;
    }
    const result = npmCommand(item.name, {}, { optional: item.optional, tailLines: 20 });
    addResult(results, result.status, "seo-script", item.name, `Exit ${result.exitCode}; duration ${result.durationMs}ms.`, result.status === "PASS" ? "No action." : "Inspect child script report.", { priority: item.optional ? "P2" : "P0", command: result.name, stdoutTail: result.stdoutTail, stderrTail: result.stderrTail });
  }
}

async function main() {
  const { baseUrl, explicit } = reportBaseUrl();
  const results = [];

  const sitemap = await fetchPath(baseUrl, "/sitemap.xml", { redirect: "manual" });
  let locs = [];
  if (!sitemap.ok || sitemap.status !== 200) {
    addResult(results, "FAIL", "sitemap", "/sitemap.xml", sitemap.error || `HTTP ${sitemap.status}`, "Fix sitemap route.", { priority: "P0" });
  } else {
    locs = extractSitemapLocs(sitemap.body);
    addResult(results, locs.length ? "PASS" : "FAIL", "sitemap", "/sitemap.xml", `${locs.length} sitemap URLs found.`, locs.length ? "No action." : "Fix sitemap generation.", { priority: "P0" });
  }

  const forbidden = locs.filter((loc) => /\/(api|admin|dashboard|login)(\/|$)/i.test(normalizePath(loc)));
  addResult(results, forbidden.length ? "FAIL" : "PASS", "sitemap", "forbidden-routes", forbidden.length ? `${forbidden.length} forbidden sitemap URLs.` : "No API/admin/dashboard/login routes in sitemap.", forbidden.length ? "Remove forbidden URLs." : "No action.", { priority: "P0", samples: forbidden.slice(0, 10) });

  for (const route of criticalRoutes.filter((item) => item.excludeFromSitemap)) {
    const present = locs.some((loc) => normalizePath(loc) === normalizePath(route.path));
    addResult(results, present ? "FAIL" : "PASS", "sitemap-exclusion", route.path, present ? "Non-organic route is present in sitemap." : "Non-organic route is absent from sitemap.", present ? "Remove this route from sitemap." : "No action.", { priority: route.priority });
  }

  for (const route of criticalRoutes.filter((item) => item.priority === "P0" && !item.nonHtml && !item.contactPage)) {
    const present = sitemapHasRoute(locs, route);
    addResult(results, present ? "PASS" : "WARN", "sitemap-p0", route.path, present ? "P0 route/canonical target present in sitemap." : "P0 route not found in sitemap.", present ? "No action." : "Confirm whether route should be in sitemap or intentionally redirected.", { priority: route.priority });
  }

  const robots = await fetchPath(baseUrl, "/robots.txt", { redirect: "manual" });
  if (!robots.ok || robots.status !== 200) {
    addResult(results, "FAIL", "robots", "/robots.txt", robots.error || `HTTP ${robots.status}`, "Fix robots route.", { priority: "P0" });
  } else {
    for (const route of criticalRoutes.filter((item) => item.priority === "P0" && item.moneyPage)) {
      const blocked = robotsBlocksP0(robots.body, routeCanonicalPath(route));
      addResult(results, blocked ? "FAIL" : "PASS", "robots", route.path, blocked ? "robots.txt appears to block P0 route." : "robots.txt does not block P0 route.", blocked ? "Remove robots block for P0 route." : "No action.", { priority: route.priority });
    }
  }

  for (const route of criticalRoutes) {
    await checkP0Page(baseUrl, route, results);
  }

  runExistingSeoScripts(results);

  const output = writeReport({
    markdownPath: "QA_SEO_REPORT.md",
    jsonPath: "qa-seo-report.json",
    title: "QA SEO Report",
    summary: {
      baseUrl,
      baseUrlWasExplicit: explicit,
      sitemapUrlCount: locs.length,
      p0RoutesChecked: criticalRoutes.filter((item) => item.priority === "P0").length,
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- Missing P0 sitemap entries are YELLOW unless the route is an intentional redirect.",
      "- Broken sitemap/robots, invalid JSON-LD, noindex on money pages, and fake review/rating schema are RED.",
    ],
  });

  console.log(`QA SEO status: ${output.status}`);
  console.log("Reports written: QA_SEO_REPORT.md, qa-seo-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
