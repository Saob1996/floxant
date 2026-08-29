const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const generatedAt = new Date().toISOString();
const baseUrl = String(process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const acceptedRedirectStatuses = new Set([301, 302, 307, 308]);

const legacyRoutes = [
  { path: "/de/umzug-duesseldorf", expected: "/seo-gone", strategy: "redirect" },
  { path: "/de/wissen/halteverbotszone-duesseldorf", expected: "/seo-gone", strategy: "redirect" },
  { path: "/umzug-regensburg", expected: "/regensburg/umzug", strategy: "redirect" },
  { path: "/reinigung-regensburg", expected: "/regensburg/reinigung", strategy: "redirect" },
  { path: "/entruempelung-regensburg", expected: "/regensburg/entruempelung", strategy: "redirect" },
  { path: "/gewerbereinigung-regensburg", expected: "/regensburg/gewerbereinigung", strategy: "redirect" },
  { path: "/bueroreinigung-regensburg", expected: "/regensburg/bueroreinigung", strategy: "redirect" },
  { path: "/b2b-bueroreinigung", expected: "/regensburg/bueroreinigung", strategy: "redirect" },
];

const canonicalSample = [
  "/",
  "/kontakt",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/regensburg",
  "/klaviertransport-regensburg",
  "/diskret-service",
  "/impressum",
  "/datenschutz",
  "/agb",
];

async function fetchManual(routePath) {
  try {
    const response = await fetch(`${baseUrl}${routePath}`, { redirect: "manual" });
    const contentType = response.headers.get("content-type") || "";
    const body = /html|xml|text/i.test(contentType) ? await response.text() : "";
    return {
      ok: true,
      status: response.status,
      location: response.headers.get("location") || "",
      contentType,
      body,
    };
  } catch (error) {
    return { ok: false, status: 0, location: "", contentType: "", body: "", error: error.message };
  }
}

function locationPath(location) {
  if (!location) return "";
  try {
    return new URL(location, baseUrl).pathname;
  } catch {
    return String(location);
  }
}

function add(results, scope, pathName, status, priority, httpStatus, detail, action, extra = {}) {
  results.push({
    scope,
    path: pathName,
    status,
    priority,
    httpStatus,
    detail,
    action,
    ...extra,
  });
}

function extractLocs(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gi)).map((match) => match[1].trim());
}

function extractInternalLinks(html) {
  const links = new Set();
  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const url = new URL(href, baseUrl);
      if (url.origin === new URL(baseUrl).origin) {
        const routePath = url.pathname.replace(/\/+$/, "") || "/";
        if (!routePath.startsWith("/_next") && !routePath.includes(".")) links.add(routePath);
      }
    } catch {
      // Ignore malformed links; browser verification can inspect them manually.
    }
  }
  return Array.from(links);
}

async function checkSitemap(results) {
  const sitemap = await fetchManual("/sitemap.xml");
  if (!sitemap.ok || sitemap.status !== 200) {
    add(results, "sitemap", "/sitemap.xml", "FAIL", "P0", sitemap.status, sitemap.error || "Sitemap not reachable", "Fix sitemap route or deployment.");
    return [];
  }

  const locs = extractLocs(sitemap.body);
  add(results, "sitemap", "/sitemap.xml", locs.length ? "PASS" : "FAIL", "P0", sitemap.status, `${locs.length} URLs found`, locs.length ? "No action." : "Fix sitemap XML output.");

  const forbidden = locs.filter((loc) => /\/(api|admin|dashboard|login)(\/|$)/i.test(new URL(loc).pathname));
  if (forbidden.length) {
    add(results, "sitemap", "forbidden routes", "FAIL", "P0", 0, `${forbidden.length} forbidden sitemap URLs`, "Remove API/admin/dashboard/login URLs from sitemap.", { samples: forbidden.slice(0, 10) });
  } else {
    add(results, "sitemap", "forbidden routes", "PASS", "P0", 0, "No API/admin/dashboard/login URLs found", "No action.");
  }

  for (const loc of locs) {
    const routePath = new URL(loc).pathname;
    const page = await fetchManual(routePath);
    if (!page.ok) {
      add(results, "sitemap-url", routePath, "FAIL", "P0", 0, page.error || "Request failed", "Fix or remove URL from sitemap.");
      continue;
    }
    if (page.status === 404 || page.status >= 500) {
      add(results, "sitemap-url", routePath, "FAIL", "P0", page.status, "Sitemap URL returns 404/500", "Fix route or remove URL from sitemap.");
    } else if (acceptedRedirectStatuses.has(page.status)) {
      add(results, "sitemap-url", routePath, "WARN", "P1", page.status, `Sitemap URL redirects to ${page.location}`, "Prefer canonical final URLs in sitemap.");
    }
  }

  return locs;
}

async function checkLegacy(results) {
  for (const item of legacyRoutes) {
    const response = await fetchManual(item.path);
    const target = locationPath(response.location);
    if (!response.ok) {
      add(results, "legacy", item.path, "FAIL", "P0", 0, response.error || "Request failed", "Check legacy route handling.");
      continue;
    }
    if (!acceptedRedirectStatuses.has(response.status)) {
      add(results, "legacy", item.path, "WARN", "P1", response.status, "Legacy route did not redirect", "Confirm intended 200/404/410 strategy.");
      continue;
    }
    const status = target === item.expected ? "PASS" : "FAIL";
    add(
      results,
      "legacy",
      item.path,
      status,
      "P0",
      response.status,
      `Redirect target: ${target || response.location}`,
      status === "PASS" ? "No action." : `Expected ${item.expected}. Fix next.config/proxy redirect.`
    );
  }
}

async function checkCanonicals(results) {
  for (const routePath of canonicalSample) {
    const response = await fetchManual(routePath);
    if (!response.ok || response.status !== 200) {
      add(results, "canonical", routePath, "WARN", "P1", response.status, response.error || "Page not 200", "Inspect canonical manually.");
      continue;
    }
    const match = response.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    if (!match) {
      add(results, "canonical", routePath, "WARN", "P1", response.status, "Canonical tag not found", "Check metadata.");
      continue;
    }
    const canonicalPath = new URL(match[1], baseUrl).pathname;
    const canonicalResponse = await fetchManual(canonicalPath);
    const status = canonicalResponse.status === 200 ? "PASS" : "WARN";
    add(
      results,
      "canonical",
      routePath,
      status,
      "P1",
      canonicalResponse.status,
      `Canonical ${canonicalPath}`,
      status === "PASS" ? "No action." : "Canonical target should resolve without redirect/error."
    );
  }
}

async function checkInternalLinks(results) {
  const sourcePages = ["/", "/kontakt", "/angebot-guenstiger-pruefen", "/duesseldorf", "/regensburg"];
  const links = new Set();
  for (const sourcePage of sourcePages) {
    const response = await fetchManual(sourcePage);
    if (response.status === 200) {
      extractInternalLinks(response.body).forEach((link) => links.add(link));
    }
  }

  const limit = Number(process.env.INTERNAL_LINK_LIMIT || 120);
  let checked = 0;
  for (const link of Array.from(links).slice(0, limit)) {
    checked += 1;
    const response = await fetchManual(link);
    if (!response.ok || response.status === 404 || response.status >= 500) {
      add(results, "internal-link", link, "FAIL", "P1", response.status, response.error || "Internal link broken", "Fix internal link target.");
    }
  }
  add(results, "internal-link", "sample", "PASS", "P2", 0, `${checked} internal links checked from ${sourcePages.length} pages`, "Increase INTERNAL_LINK_LIMIT for deeper checks.");
}

function writeReports(results) {
  const summary = {
    generatedAt,
    baseUrl,
    checks: results.length,
    pass: results.filter((item) => item.status === "PASS").length,
    warn: results.filter((item) => item.status === "WARN").length,
    fail: results.filter((item) => item.status === "FAIL").length,
  };
  const status = summary.fail ? "FAIL" : summary.warn ? "WARN" : "PASS";
  const output = { status, summary, results };
  const rows = results.map((item) => `| ${item.status} | ${item.priority} | ${item.scope} | ${item.path} | ${item.httpStatus || "-"} | ${item.detail || "-"} | ${item.action || "-"} |`);
  const md = [
    "# Routes Health Report",
    "",
    `Generated: ${generatedAt}`,
    `Base URL: ${baseUrl}`,
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
    "| Status | Priority | Scope | Path | HTTP | Detail | Action |",
    "| --- | --- | --- | --- | ---: | --- | --- |",
    ...rows,
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "routes-health-report.json"), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(root, "ROUTES_HEALTH_REPORT.md"), md);
  return output;
}

async function main() {
  const results = [];
  await checkSitemap(results);
  await checkLegacy(results);
  await checkCanonicals(results);
  await checkInternalLinks(results);
  const output = writeReports(results);
  console.log(`Routes health status: ${output.status}`);
  console.log("Reports written: ROUTES_HEALTH_REPORT.md, routes-health-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
