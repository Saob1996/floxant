#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const policy = JSON.parse(read("data/dynamic-local-route-policy.json"));
const routePageSource = read("app/[serviceSlug]/page.tsx");
const registrySource = read("lib/local-seo-routes.ts");
const sitemapSource = read("lib/sitemap-routes.ts");
const sitemapGeneratorSource = read("scripts/generate-sitemap-routes.js");
const sitemapXmlSource = read("lib/sitemap-xml.ts");
const redirectsSource = read("public/_redirects");

function normalizeRoute(route) {
  const normalized = String(route || "").trim().replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "/";
}

function sorted(values) {
  return [...values].map(normalizeRoute).sort((left, right) => left.localeCompare(right));
}

function parseRegistryRoutes() {
  const match = registrySource.match(
    /const unfilteredDynamicLocalSeoRoutes = (\[[\s\S]*?\]) as const satisfies/,
  );
  assert(match, "Historic dynamic local route registry could not be parsed.");
  return JSON.parse(match[1]).map((entry) => normalizeRoute(entry.route));
}

function collectStaticAppRoutes() {
  const appDirectory = path.join(root, "app");
  const routes = [];

  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }
      if (!entry.isFile() || !/^page\.(?:tsx?|jsx?)$/.test(entry.name)) continue;

      const segments = path
        .relative(appDirectory, directory)
        .split(path.sep)
        .filter(Boolean)
        .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));
      if (segments.some((segment) => /^[\[@_]/.test(segment))) continue;
      routes.push(normalizeRoute(segments.join("/")));
    }
  }

  walk(appDirectory);
  return routes;
}

function parseRedirects() {
  return redirectsSource
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("/") && !line.startsWith("/*"))
    .map((line) => {
      const [source, target, status] = line.split(/\s+/);
      return { source: normalizeRoute(source), target, status };
    });
}

function parseSitemapRoutes() {
  return [...sitemapSource.matchAll(/^\s*"(\/[^\"]*)",?\s*$/gm)].map((match) =>
    normalizeRoute(match[1]),
  );
}

function assertFileExistsForRoute(route) {
  const routeDirectory = route === "/" ? path.join(root, "app") : path.join(root, "app", ...route.slice(1).split("/"));
  assert(
    ["page.tsx", "page.ts", "page.jsx", "page.js"].some((fileName) =>
      fs.existsSync(path.join(routeDirectory, fileName)),
    ),
    `Expected explicit page owner for ${route}.`,
  );
}

const registryRoutes = parseRegistryRoutes();
const registryRouteSet = new Set(registryRoutes);
const staticRouteSet = new Set(collectStaticAppRoutes());
const redirects = parseRedirects();
const redirectSourceSet = new Set(redirects.map((entry) => entry.source));
const sitemapRoutes = parseSitemapRoutes();
const sitemapRouteSet = new Set(sitemapRoutes);
const publishedDynamicRoutes = sorted(policy.publishedDynamicRoutes);
const protectedStaticRoutes = sorted(policy.protectedStaticRoutes);
const protectedGscWinnerRoutes = sorted(policy.protectedGscWinnerRoutes);
const intentional404Routes = sorted(policy.intentionallyRemovedObservedTemplateRoutes);

assert.deepEqual(publishedDynamicRoutes, [], "publishedDynamicRoutes must stay empty for this release.");
assert.equal(new Set(protectedStaticRoutes).size, 96, "Expected 96 unique protected static registry overlaps.");

const discoveredProtectedStaticRoutes = registryRoutes.filter(
  (route) => staticRouteSet.has(route) && !redirectSourceSet.has(route),
);
assert.deepEqual(
  sorted(protectedStaticRoutes),
  sorted(discoveredProtectedStaticRoutes),
  "Policy protectedStaticRoutes must exactly match physical, non-redirect registry overlaps.",
);

for (const route of protectedStaticRoutes) assertFileExistsForRoute(route);

assert.match(routePageSource, /export const dynamicParams = false;/);
assert.match(routePageSource, /\.\.\.publishedDynamicLocalSeoRoutes/);
assert.doesNotMatch(routePageSource, /\.\.\.dynamicLocalSeoRoutes/);
assert.equal(
  (routePageSource.match(/getPublishedDynamicLocalSeoRoute\(serviceSlug\)/g) || []).length,
  2,
  "Metadata and renderer must both use the publication-gated resolver.",
);
assert.doesNotMatch(routePageSource, /200\s*km/i, "[serviceSlug] must not retain a 200-km areaServed claim.");
assert.match(routePageSource, /Verifiziertes Einsatzgebiet bis 75 km um Regensburg/);

for (const source of [sitemapGeneratorSource, sitemapXmlSource]) {
  assert.doesNotMatch(source, /dynamicLocalSeoRoutes|dynamicLocalSeoRouteSet|local-seo-routes/);
}

const sitemapDynamicOnlyRoutes = sitemapRoutes.filter(
  (route) => registryRouteSet.has(route) && !staticRouteSet.has(route),
);
assert.deepEqual(
  sitemapDynamicOnlyRoutes,
  [],
  `Generated sitemap source still contains dynamic-only templates: ${sitemapDynamicOnlyRoutes.join(", ")}`,
);

const explicitWinnerRoutes = [
  "/",
  "/duesseldorf/reinigung",
  "/duesseldorf/grundreinigung",
  "/klaviertransport-regensburg",
];
for (const route of explicitWinnerRoutes) assertFileExistsForRoute(route);

const redirectedWinner = redirects.find(
  (entry) => entry.source === "/blog/grundreinigung-bodenreinigung-hauseingang-duesseldorf",
);
assert.deepEqual(
  redirectedWinner,
  {
    source: "/blog/grundreinigung-bodenreinigung-hauseingang-duesseldorf",
    target: "/duesseldorf/grundreinigung",
    status: "308",
  },
  "Redirected GSC winner must keep its direct 308 successor.",
);
assert.match(
  read("lib/offer-check-blog-articles.ts"),
  /slug:\s*"klaviertransport-regensburg-vor-anfrage"/,
);
assert.match(read("app/blog/[slug]/page.tsx"), /\.\.\.offerCheckBlogArticles\.map/);
assert.deepEqual(
  protectedGscWinnerRoutes,
  sorted([
    ...explicitWinnerRoutes,
    "/blog/grundreinigung-bodenreinigung-hauseingang-duesseldorf",
    "/blog/klaviertransport-regensburg-vor-anfrage",
  ]),
  "The six formal GSC winner routes must remain explicit in policy.",
);

for (const route of intentional404Routes) {
  assert(registryRouteSet.has(route), `${route} must be documented as a former template route.`);
  assert(!staticRouteSet.has(route), `${route} unexpectedly has an explicit page and must not be forced to 404.`);
  assert(!sitemapRouteSet.has(route), `${route} must not remain in the sitemap source.`);
  assert(!redirectSourceSet.has(route), `${route} must not receive a blanket redirect.`);
}

const studentMoveRedirect = redirects.find(
  (entry) => entry.source === "/studentenumzug-vohenstrauss",
);
assert.deepEqual(
  studentMoveRedirect,
  {
    source: "/studentenumzug-vohenstrauss",
    target: "/regensburg/umzug",
    status: "308",
  },
  "The legacy student move redirect must not target an intentionally removed template route.",
);

const linkProducerRequirements = [
  ["app/[serviceSlug]/page.tsx", routePageSource],
  ["components/CityServiceCluster.tsx", read("components/CityServiceCluster.tsx")],
  ["components/RegionalDominanceGrid.tsx", read("components/RegionalDominanceGrid.tsx")],
  ["lib/bavaria-coverage.ts", read("lib/bavaria-coverage.ts")],
];
for (const [fileName, source] of linkProducerRequirements) {
  assert.match(
    source,
    /resolvePublishedLocalServiceHref/,
    `${fileName} must resolve generated local links through the shared policy.`,
  );
}

if (process.env.VERIFY_STATIC_EXPORT === "1") {
  const outDirectory = path.join(root, "out");
  assert(fs.existsSync(outDirectory), "VERIFY_STATIC_EXPORT=1 requires a completed out/ build.");
  const disallowedDynamicRoutes = registryRoutes.filter(
    (route) => !staticRouteSet.has(route) && !publishedDynamicRoutes.includes(route),
  );

  for (const route of disallowedDynamicRoutes) {
    const relativeRoute = route.slice(1);
    const candidates = [
      path.join(outDirectory, `${relativeRoute}.html`),
      path.join(outDirectory, relativeRoute, "index.html"),
    ];
    assert(
      candidates.every((candidate) => !fs.existsSync(candidate)),
      `Static export unexpectedly contains disallowed template ${route}.`,
    );
  }
}

console.log(
  `DYNAMIC_LOCAL_INDEXABILITY_STATUS=PASS publishedDynamic=${publishedDynamicRoutes.length} protectedStatic=${protectedStaticRoutes.length} intentional404=${intentional404Routes.length}`,
);
