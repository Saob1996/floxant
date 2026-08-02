#!/usr/bin/env node

const {
  ACCEPTED_REDIRECTS,
  addResult,
  collectAnchors,
  criticalRoutes,
  fetchPath,
  findLinkHref,
  findMetaContent,
  getHeadings,
  getTitle,
  hasApplicationError,
  hasNoindex,
  normalizePath,
  reportBaseUrl,
  stripTags,
  writeReport,
  extractSitemapLocs,
} = require("./qa-shared.cjs");

async function fetchFinalHtml(baseUrl, route, results) {
  const first = await fetchPath(baseUrl, route.path, { redirect: "manual" });
  if (!first.ok) return { response: first, finalPath: route.path, html: "" };

  if (ACCEPTED_REDIRECTS.has(first.status)) {
    const targetPath = normalizePath(first.location);
    if (!route.allowRedirect) {
      addResult(results, "FAIL", "route", route.path, `Unexpected redirect to ${targetPath || first.location}`, "Return 200 or mark the route as an intentional redirect.", { priority: route.priority });
      return { response: first, finalPath: targetPath || route.path, html: "" };
    }

    const expected = route.expectedRedirectPath ? normalizePath(route.expectedRedirectPath) : "";
    if (expected && targetPath !== expected) {
      addResult(results, "FAIL", "route", route.path, `Redirect target ${targetPath || first.location}; expected ${expected}`, "Fix next.config/proxy redirect target.", { priority: route.priority });
    } else {
      addResult(results, "PASS", "route", route.path, `Redirects to ${targetPath || first.location}`, "No action.", { priority: route.priority, redirectTarget: targetPath });
    }

    const second = await fetchPath(baseUrl, targetPath || first.location, { redirect: "manual" });
    return { response: second, finalPath: targetPath || route.path, html: second.body || "", redirectedFrom: first };
  }

  return { response: first, finalPath: route.path, html: first.body || "" };
}

function checkExpectedStatus(route, response, results) {
  if (!response.ok) {
    addResult(results, route.optional ? "WARN" : "FAIL", "route", route.path, response.error || "Request failed", "Start the app, set BASE_URL, or fix the route.", { priority: route.priority });
    return false;
  }

  if (response.status === 404 || response.status >= 500) {
    addResult(results, route.optional ? "WARN" : "FAIL", "route", route.path, `HTTP ${response.status}`, route.optional ? "Optional route missing; confirm this is intended." : "Fix 404/500 before deploy.", { priority: route.priority });
    return false;
  }

  if (!ACCEPTED_REDIRECTS.has(response.status) && response.status !== route.expectedStatus) {
    addResult(results, route.optional ? "WARN" : "FAIL", "route", route.path, `HTTP ${response.status}; expected ${route.expectedStatus}`, "Fix status code or update the route matrix.", { priority: route.priority });
    return false;
  }

  if (response.status === route.expectedStatus) {
    addResult(results, "PASS", "route", route.path, `HTTP ${response.status}`, "No action.", { priority: route.priority });
  }
  return true;
}

function checkHtml(route, finalPath, html, results) {
  if (route.nonHtml) return;
  if (!html) {
    addResult(results, route.optional ? "WARN" : "FAIL", "html", route.path, "No HTML body available for checks.", "Inspect response body and rendering.", { priority: route.priority });
    return;
  }

  if (hasApplicationError(html)) {
    addResult(results, "FAIL", "html", route.path, "Application or hydration error marker found in HTML.", "Fix runtime/rendering error before deploy.", { priority: route.priority });
  } else {
    addResult(results, "PASS", "html", route.path, "No obvious application/hydration error marker.", "No action.", { priority: route.priority });
  }

  const title = getTitle(html);
  addResult(results, title ? "PASS" : "FAIL", "metadata", route.path, title ? `Title found: ${title.slice(0, 90)}` : "Title missing.", title ? "No action." : "Add metadata title.", { priority: route.priority });

  const description = findMetaContent(html, "description");
  if (route.mustHaveMetaDescription) {
    addResult(results, description ? "PASS" : "FAIL", "metadata", route.path, description ? "Meta description found." : "Meta description missing.", description ? "No action." : "Add metadata description.", { priority: route.priority });
  }

  const h1s = getHeadings(html, 1);
  if (!h1s.length) {
    addResult(results, "FAIL", "html", route.path, "H1 missing.", "Add one visible H1.", { priority: route.priority });
  } else {
    const normalized = h1s.join(" ").toLowerCase();
    const expected = route.expectedH1Contains || [];
    const matches = expected.length ? expected.some((part) => normalized.includes(String(part).toLowerCase())) : true;
    addResult(results, matches ? "PASS" : "WARN", "html", route.path, `H1: ${h1s.join(" | ")}`, matches ? "No action." : `Expected H1 to contain one of: ${expected.join(", ")}`, { priority: route.priority });
  }

  if (route.mustHaveCanonical) {
    const canonical = findLinkHref(html, "canonical");
    if (!canonical) {
      addResult(results, "FAIL", "metadata", route.path, "Canonical missing.", "Add canonical metadata.", { priority: route.priority });
    } else {
      const canonicalPath = normalizePath(canonical);
      const status = route.allowRedirect || route.optional || canonicalPath === normalizePath(finalPath) ? "PASS" : "WARN";
      addResult(results, status, "metadata", route.path, `Canonical ${canonicalPath}`, status === "PASS" ? "No action." : "Canonical should usually point at the final rendered route.", { priority: route.priority, canonicalPath });
    }
  }

  if (route.mustNotHaveNoindex) {
    addResult(results, hasNoindex(html) ? "FAIL" : "PASS", "robots", route.path, hasNoindex(html) ? "Money page has noindex." : "No noindex on money page.", hasNoindex(html) ? "Remove noindex or update matrix if intentionally blocked." : "No action.", { priority: route.priority });
  }

  const anchors = collectAnchors(html);
  if (route.mustHaveCta) {
    const cta = anchors.find((anchor) => /cta|kontakt|angebot|anfrage|pruefen|prüfen/i.test(`${anchor.text} ${JSON.stringify(anchor.attrs)}`));
    addResult(results, cta ? "PASS" : "WARN", "cta-presence", route.path, cta ? `CTA-like link found: ${cta.href || cta.text}` : "No obvious CTA-like anchor found.", cta ? "No action." : "Confirm page has a visible primary CTA.", { priority: route.priority });
  }

  if (route.mustHaveContactLink) {
    const contactLink = anchors.find((anchor) =>
      normalizePath(anchor.href) === "/kontakt" ||
      String(anchor.href || "").startsWith("/kontakt?") ||
      (route.localContactTarget && String(anchor.href || "") === route.localContactTarget),
    );
    addResult(results, contactLink ? "PASS" : "WARN", "contact-link", route.path, contactLink ? `Contact target found: ${contactLink.href}` : "No contact target found.", contactLink ? "No action." : "Add or verify the canonical or page-local contact target.", { priority: route.priority });
  }
}

async function checkTechnical(baseUrl, results) {
  const robots = await fetchPath(baseUrl, "/robots.txt", { redirect: "manual" });
  addResult(results, robots.ok && robots.status === 200 ? "PASS" : "FAIL", "technical", "/robots.txt", robots.ok ? `HTTP ${robots.status}` : robots.error, robots.ok && robots.status === 200 ? "No action." : "Fix robots route.", { priority: "P0" });

  const sitemap = await fetchPath(baseUrl, "/sitemap.xml", { redirect: "manual" });
  if (!sitemap.ok || sitemap.status !== 200) {
    addResult(results, "FAIL", "technical", "/sitemap.xml", sitemap.error || `HTTP ${sitemap.status}`, "Fix sitemap route.", { priority: "P0" });
    return;
  }

  const locs = extractSitemapLocs(sitemap.body);
  addResult(results, locs.length ? "PASS" : "FAIL", "technical", "/sitemap.xml", `${locs.length} sitemap URLs found.`, locs.length ? "No action." : "Fix sitemap XML output.", { priority: "P0" });

  const forbidden = locs.filter((loc) => /\/(api|admin|dashboard|login)(\/|$)/i.test(normalizePath(loc)));
  addResult(results, forbidden.length ? "FAIL" : "PASS", "sitemap", "forbidden-public-routes", forbidden.length ? `${forbidden.length} forbidden URLs in sitemap.` : "No API/admin/dashboard/login sitemap URLs.", forbidden.length ? "Remove forbidden URLs from sitemap." : "No action.", { priority: "P0", samples: forbidden.slice(0, 10) });
}

async function main() {
  const { baseUrl, explicit } = reportBaseUrl();
  const results = [];

  for (const route of criticalRoutes) {
    const { response, finalPath, html } = await fetchFinalHtml(baseUrl, route, results);
    const statusOk = checkExpectedStatus(route, response, results);
    if (statusOk && !ACCEPTED_REDIRECTS.has(response.status)) checkHtml(route, finalPath, html, results);
  }

  await checkTechnical(baseUrl, results);

  const output = writeReport({
    markdownPath: "QA_ROUTES_REPORT.md",
    jsonPath: "qa-routes-report.json",
    title: "QA Routes Report",
    summary: {
      baseUrl,
      baseUrlWasExplicit: explicit,
      routeCount: criticalRoutes.length,
      defaultBaseUrlNote: explicit ? "BASE_URL was provided." : "BASE_URL missing; defaulted to http://localhost:3000.",
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- P0 404/500 responses are RED.",
      "- Optional `falls vorhanden` routes are WARN when absent.",
      "- Redirect aliases are allowed only when the matrix marks them as intentional.",
    ],
  });

  console.log(`QA routes status: ${output.status}`);
  console.log("Reports written: QA_ROUTES_REPORT.md, qa-routes-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
