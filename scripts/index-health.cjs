const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const PUBLIC_BASE_URL = "https://www.floxant.de";

const OUTPUT_MD = path.join(ROOT, "INDEX_HEALTH_REPORT.md");
const OUTPUT_JSON = path.join(ROOT, "index-health-report.json");

const GOLDEN_SET = [
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/hausverwaltung-reinigung",
  "/duesseldorf/reinigung-stadtteile-umgebung",
  "/regensburg",
  "/regensburg/umzug",
  "/regensburg/reinigung",
  "/regensburg/entruempelung",
  "/regensburg/gewerbereinigung",
  "/regensburg/bueroreinigung",
  "/regensburg/wohnungsaufloesung",
  "/klaviertransport-regensburg",
  "/angebot-vergleichen-duesseldorf",
  "/angebot-vergleichen-regensburg",
];

const LEGACY_ROOT_ROUTES = [
  "/umzug-regensburg",
  "/reinigung-regensburg",
  "/entruempelung-regensburg",
  "/gewerbereinigung-regensburg",
  "/bueroreinigung-regensburg",
  "/wohnungsaufloesung-regensburg",
  "/umzugsunternehmen-regensburg",
  "/seniorenumzug-regensburg",
  "/umzug-reinigung-regensburg",
  "/endreinigung-regensburg",
  "/umzug-duesseldorf",
  "/partnercode",
  "/villenservice",
  "/seo-gone",
];

const REMOVED_CITY_SLUGS = [
  "berlin",
  "bremen",
  "frankfurt",
  "hamburg",
  "leipzig",
  "stuttgart",
  "wuerzburg",
  "kempten",
  "lindau",
  "memmingen",
  "kaufbeuren",
  "traunstein",
];

const LEGACY_LANGUAGE_PREFIXES = ["ar", "bg", "de", "fa", "ja", "pl", "ro", "ru", "uk", "tr", "vi"];
const PRIVATE_PREFIXES = ["/api", "/admin", "/dashboard", "/login"];
const NON_SITEMAP_PUBLIC_PATTERNS = [
  /\/danke(?:\/|$)/,
  /^\/feedback(?:\/|$)/,
  /^\/angebote(?:\/|$)/,
  /^\/guenstig(?:\/|$)/,
  /^\/signature(?:\/|$)/,
];

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function normalizeRoute(route) {
  if (!route || route === "/") return "/";
  return `/${route.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function extractSitemapRoutes() {
  const source = read(path.join(ROOT, "lib", "sitemap-routes.ts"));
  return [...source.matchAll(/"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((value) => value.startsWith("/"))
    .map(normalizeRoute);
}

function exactSegmentPrefix(route, prefix) {
  return route === `/${prefix}` || route.startsWith(`/${prefix}/`);
}

function hasRemovedCity(route) {
  const normalized = route.toLowerCase();
  return REMOVED_CITY_SLUGS.some(
    (city) =>
      normalized === `/${city}` ||
      normalized.endsWith(`-${city}`) ||
      normalized.includes(`-${city}-`) ||
      normalized.includes(`/${city}/`),
  );
}

function isPrivateRoute(route) {
  return PRIVATE_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));
}

function isNonSitemapPublicPattern(route) {
  return NON_SITEMAP_PUBLIC_PATTERNS.some((pattern) => pattern.test(route));
}

function bucketRoute(route) {
  if (route === "/") return "home";
  if (route.startsWith("/duesseldorf")) return "duesseldorf-prefix";
  if (route.startsWith("/regensburg")) return "regensburg-prefix";
  if (exactSegmentPrefix(route, "en")) return "english-real";
  if (route === "/blog" || route.startsWith("/blog/")) return "blog";
  if (route === "/ratgeber" || route.startsWith("/ratgeber/")) return "ratgeber";
  if (route === "/wissen" || route.startsWith("/wissen/")) return "wissen";
  if (/(angebot|angebotscheck|anbieter|vergleich|kontakt)/.test(route)) return "offer-contact";
  if (/^\/[a-z0-9-]+\/(umzug|reinigung|entruempelung|bueroumzug|wohnungsaufloesung|haushaltsaufloesung)$/.test(route)) {
    return "structured-city-service";
  }
  if (/^\/(umzug|reinigung|entruempelung|bueroumzug|seniorenumzug|klaviertransport|wohnungsaufloesung)-/.test(route)) {
    return "root-city-service";
  }
  if (/regensburg/.test(route)) return "regensburg-containing";
  if (/duesseldorf/.test(route)) return "duesseldorf-containing";
  if (/(umzug|reinigung|entruempelung|bueroumzug|wohnungsaufloesung|haushaltsaufloesung|klaviertransport|seniorenumzug|gewerbe|buero|praxis|fenster|grund|treppenhaus)/.test(route)) {
    return "service-other";
  }
  return "support-other";
}

async function getRedirectSources() {
  const configPath = path.join(ROOT, "next.config.js");
  if (!fs.existsSync(configPath)) return [];

  const config = require(configPath);
  if (typeof config.redirects !== "function") return [];

  const redirects = await config.redirects();
  return redirects.map((redirect) => redirect.source).filter((source) => !source.includes(":"));
}

function getBuildRoutes() {
  const manifestPath = path.join(ROOT, ".next", "prerender-manifest.json");
  if (!fs.existsSync(manifestPath)) {
    return { available: false, routes: [], dynamicRoutes: [], notFoundRoutes: [] };
  }

  const manifest = JSON.parse(read(manifestPath));
  const routes = Object.keys(manifest.routes || {})
    .filter((route) => !route.startsWith("/_"))
    .map(normalizeRoute);

  return {
    available: true,
    routes,
    dynamicRoutes: Object.keys(manifest.dynamicRoutes || {}),
    notFoundRoutes: manifest.notFoundRoutes || [],
  };
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function classifyBuildOnly(route) {
  if (isPrivateRoute(route)) return "internal";
  if (route.includes("/danke")) return "thank-you";
  if (
    ["/agb", "/impressum", "/datenschutz", "/widerruf", "/buchungsbedingungen"].includes(route) ||
    route.includes("/agb") ||
    route.includes("/datenschutz")
  ) return "legal-or-privacy";
  if (LEGACY_ROOT_ROUTES.includes(route)) return "legacy-redirect";
  if (hasRemovedCity(route)) return "deprioritized-city";
  if (NON_SITEMAP_PUBLIC_PATTERNS.some((pattern) => pattern.test(route))) return "dynamic-index-excluded";
  if (route.startsWith("/seo-image") || ["/icon", "/icon.png", "/manifest.webmanifest", "/opengraph-image", "/robots.txt", "/indexnow-key.txt"].includes(route)) {
    return "technical-public";
  }
  return "other-build-not-sitemap";
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => String(value ?? "").replace(/\|/g, "\\|")).join(" | ")} |`),
  ].join("\n");
}

function addIssue(issues, severity, label, details) {
  issues.push({ severity, label, details });
}

function routeSourceHint(route) {
  const segments = route.replace(/^\/+/, "").split("/").filter(Boolean);
  const pagePath = path.join(ROOT, "app", ...segments, "page.tsx");
  if (fs.existsSync(pagePath)) return path.relative(ROOT, pagePath);
  if (route.startsWith("/blog/")) return "dynamic blog data";
  if (exactSegmentPrefix(route, "en")) return "lib/local-seo/englishLocalSeoPages.ts";
  if (/^\/[a-z0-9-]+\/(umzug|reinigung|entruempelung|bueroumzug|wohnungsaufloesung|haushaltsaufloesung)$/.test(route)) {
    return "lib/local-seo/localSeoPages.ts";
  }
  if (/^\/(umzug|reinigung|entruempelung|bueroumzug|seniorenumzug|klaviertransport)-/.test(route)) {
    return "dynamic local SEO route";
  }
  return "app or generated route";
}

async function main() {
  const sitemapRoutes = extractSitemapRoutes();
  const sitemapSet = new Set(sitemapRoutes);
  const redirectSources = await getRedirectSources();
  const redirectHits = sitemapRoutes.filter((route) => redirectSources.includes(route));
  const privateHits = sitemapRoutes.filter(isPrivateRoute);
  const nonSitemapPatternHits = sitemapRoutes.filter(isNonSitemapPublicPattern);
  const legacyRootHits = sitemapRoutes.filter((route) => LEGACY_ROOT_ROUTES.includes(route));
  const removedCityHits = sitemapRoutes.filter(hasRemovedCity);
  const legacyLanguageHits = sitemapRoutes.filter((route) =>
    LEGACY_LANGUAGE_PREFIXES.some((locale) => exactSegmentPrefix(route, locale)),
  );
  const englishRoutes = sitemapRoutes.filter((route) => exactSegmentPrefix(route, "en"));
  const goldenRows = GOLDEN_SET.map((route) => ({
    route,
    inSitemap: sitemapSet.has(route),
    redirect: redirectSources.includes(route),
    source: routeSourceHint(route),
    canonical: `${PUBLIC_BASE_URL}${route}`,
  }));
  const build = getBuildRoutes();
  const buildSet = new Set(build.routes);
  const buildNotSitemap = build.routes.filter((route) => !sitemapSet.has(route));
  const sitemapNotBuild = sitemapRoutes.filter((route) => !buildSet.has(route));
  const buckets = countBy(sitemapRoutes, bucketRoute);
  const buildOnlyBuckets = countBy(buildNotSitemap, classifyBuildOnly);

  const issues = [];
  if (redirectHits.length) addIssue(issues, "FAIL", "Redirect URLs in Sitemap", redirectHits.join(", "));
  if (privateHits.length) addIssue(issues, "FAIL", "Private URLs in Sitemap", privateHits.join(", "));
  if (nonSitemapPatternHits.length) addIssue(issues, "FAIL", "Noindex/support patterns in Sitemap", nonSitemapPatternHits.join(", "));
  if (legacyRootHits.length) addIssue(issues, "FAIL", "Legacy root URLs in Sitemap", legacyRootHits.join(", "));
  if (removedCityHits.length) addIssue(issues, "FAIL", "Removed city URLs in Sitemap", removedCityHits.slice(0, 40).join(", "));
  if (legacyLanguageHits.length) addIssue(issues, "FAIL", "Legacy language URLs in Sitemap", legacyLanguageHits.join(", "));

  const missingGolden = goldenRows.filter((row) => !row.inSitemap);
  if (missingGolden.length) addIssue(issues, "FAIL", "Golden-set URL missing in Sitemap", missingGolden.map((row) => row.route).join(", "));

  const rootCityCount = buckets["root-city-service"] || 0;
  if (rootCityCount > 1000) {
    addIssue(
      issues,
      "WARN",
      "Large root city-service sitemap mass",
      `${rootCityCount} root city-service URLs remain index candidates. No hard leak found, but crawl budget should be monitored in GSC.`,
    );
  }

  if (englishRoutes.length) {
    addIssue(
      issues,
      "INFO",
      "English routes",
      `${englishRoutes.length} /en routes are present and treated as real English local SEO pages, not legacy locale redirects.`,
    );
  }

  const status = issues.some((issue) => issue.severity === "FAIL")
    ? "FAIL"
    : issues.some((issue) => issue.severity === "WARN")
      ? "WARN"
      : "PASS";

  const payload = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      sitemapRoutes: sitemapRoutes.length,
      buildRoutesAvailable: build.available,
      buildRoutes: build.routes.length,
      buildDynamicRoutePatterns: build.dynamicRoutes.length,
      buildNotSitemap: buildNotSitemap.length,
      sitemapNotBuild: sitemapNotBuild.length,
      redirects: redirectSources.length,
      redirectHits: redirectHits.length,
      privateHits: privateHits.length,
      nonSitemapPatternHits: nonSitemapPatternHits.length,
      legacyRootHits: legacyRootHits.length,
      removedCityHits: removedCityHits.length,
      legacyLanguageHits: legacyLanguageHits.length,
      englishRoutes: englishRoutes.length,
    },
    buckets,
    buildOnlyBuckets,
    goldenSet: goldenRows,
    examples: {
      buildNotSitemap: buildNotSitemap.slice(0, 80),
      sitemapNotBuild: sitemapNotBuild.slice(0, 40),
      removedCityHits: removedCityHits.slice(0, 40),
      englishRoutes,
    },
    issues,
  };

  const markdown = [
    "# Index Health Report",
    "",
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    mdTable(
      ["Metric", "Value"],
      [
        ["Sitemap routes", sitemapRoutes.length],
        ["Build routes available", build.available ? "yes" : "no"],
        ["Build prerender routes", build.routes.length],
        ["Build dynamic route patterns", build.dynamicRoutes.length],
        ["Build routes not in sitemap", buildNotSitemap.length],
        ["Sitemap routes not prerendered", sitemapNotBuild.length],
        ["Configured exact redirects", redirectSources.length],
        ["Redirect URLs in sitemap", redirectHits.length],
        ["Private URLs in sitemap", privateHits.length],
        ["Noindex/support patterns in sitemap", nonSitemapPatternHits.length],
        ["Legacy root URLs in sitemap", legacyRootHits.length],
        ["Removed city URLs in sitemap", removedCityHits.length],
        ["Legacy language URLs in sitemap", legacyLanguageHits.length],
        ["English indexable routes", englishRoutes.length],
      ],
    ),
    "",
    "## Sitemap Buckets",
    "",
    mdTable(
      ["Bucket", "Count"],
      Object.entries(buckets).sort((a, b) => b[1] - a[1]),
    ),
    "",
    "## Build-Only Buckets",
    "",
    mdTable(
      ["Bucket", "Count"],
      Object.entries(buildOnlyBuckets).sort((a, b) => b[1] - a[1]),
    ),
    "",
    "## Golden Set",
    "",
    mdTable(
      ["URL", "In Sitemap", "Redirect Source", "Canonical Expectation", "Source"],
      goldenRows.map((row) => [row.route, row.inSitemap ? "yes" : "no", row.redirect ? "yes" : "no", row.canonical, row.source]),
    ),
    "",
    "## Issues",
    "",
    issues.length
      ? mdTable(["Severity", "Label", "Details"], issues.map((issue) => [issue.severity, issue.label, issue.details]))
      : "No issues.",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(payload, null, 2));
  fs.writeFileSync(OUTPUT_MD, markdown);

  console.log(
    `INDEX_HEALTH_STATUS=${status} sitemap=${sitemapRoutes.length} redirectsInSitemap=${redirectHits.length} removedCities=${removedCityHits.length} legacyLanguages=${legacyLanguageHits.length} goldenMissing=${missingGolden.length}`,
  );

  if (status === "FAIL") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
