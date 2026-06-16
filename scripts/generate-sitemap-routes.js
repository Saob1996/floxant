const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = process.cwd();
const appDirectory = path.join(workspaceRoot, "app");
const dynamicLocalRoutesFile = path.join(workspaceRoot, "lib", "local-seo-routes.ts");
const dynamicBlogSourceFiles = [
  path.join(workspaceRoot, "lib", "ai-recommendation-blog-articles.ts"),
  path.join(workspaceRoot, "lib", "offer-check-blog-articles.ts"),
  path.join(workspaceRoot, "lib", "strategic-blog-articles.ts"),
];
const psychologicalCleaningPagesFile = path.join(
  workspaceRoot,
  "lib",
  "psychological-cleaning-pages.ts",
);
const growthServicePagesFile = path.join(workspaceRoot, "lib", "growth-service-pages.ts");
const outputFile = path.join(workspaceRoot, "lib", "sitemap-routes.ts");

const pageFileNames = new Set(["page.ts", "page.tsx"]);
const extraIndexableRoutes = new Set([
  "/llms.txt",
  "/service-graph.json",
]);
const blockedSegments = new Set(["api", "admin", "dashboard", "login"]);
const blockedPrefixes = ["/api", "/admin", "/dashboard", "/login", "/angebote", "/guenstig", "/feedback"];
const nonSeoPublicRoutes = new Set([
  "/impressum",
  "/datenschutz",
  "/agb",
  "/widerruf",
  "/buchungsbedingungen",
  "/duesseldorf/reinigung/datenschutz",
  "/duesseldorf/reinigung/agb",
]);
const legacyRedirectRoutes = new Set([
  "/partnercode",
  "/airbnb-reinigung-duesseldorf",
  "/angebot-red-flag-scanner",
  "/guenstigeres-angebot-pruefen",
  "/villenservice",
  "/umzug-duesseldorf",
  "/seo-gone",
]);
const removedServicePrefixes = [
  "/halteverbotszone",
];

function isRouteGroup(segment) {
  return segment.startsWith("(") && segment.endsWith(")");
}

function getRouteFromDirectory(directory) {
  const relativeDirectory = path.relative(appDirectory, directory);
  const segments = relativeDirectory
    .split(path.sep)
    .filter(Boolean)
    .filter((segment) => !isRouteGroup(segment));

  if (
    segments.some(
      (segment) =>
        segment.startsWith("[") ||
        segment.startsWith("@") ||
        segment.startsWith("_") ||
        blockedSegments.has(segment),
    )
  ) {
    return null;
  }

  const route = `/${segments.join("/")}`.replace(/\/+/g, "/");
  return route === "/" ? "/" : route.replace(/\/$/, "");
}

function isIndexableRoute(route) {
  if (legacyRedirectRoutes.has(route)) return false;
  if (removedServicePrefixes.some((prefix) => route === prefix || route.startsWith(`${prefix}-`))) return false;
  if (nonSeoPublicRoutes.has(route)) return false;
  if (/^\/alternativen\/[^/]+$/.test(route)) return false;
  if (/^\/signature\/[^/]+$/.test(route)) return false;

  return !blockedPrefixes.some(
    (prefix) => route === prefix || route.startsWith(`${prefix}/`),
  );
}

function collectRoutes(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith(".") && !blockedSegments.has(entry.name)) {
        routes.push(...collectRoutes(fullPath));
      }
      continue;
    }

    if (!entry.isFile() || !pageFileNames.has(entry.name)) continue;

    const route = getRouteFromDirectory(directory);
    if (route && isIndexableRoute(route)) routes.push(route);
  }

  return routes;
}

function collectDynamicLocalSeoRoutes() {
  if (!fs.existsSync(dynamicLocalRoutesFile)) return [];

  const source = fs.readFileSync(dynamicLocalRoutesFile, "utf8");
  const routes = [];
  const routeRegex = /"route":\s*"([^"]+)"/g;
  let match;

  while ((match = routeRegex.exec(source))) {
    const route = match[1];
    if (isIndexableRoute(route)) routes.push(route);
  }

  return routes;
}

function collectSlugRoutesFromFile(filePath, slugPattern, routePrefix) {
  if (!fs.existsSync(filePath)) return [];

  const source = fs.readFileSync(filePath, "utf8");
  const routes = [];
  let match;

  while ((match = slugPattern.exec(source))) {
    const route = `${routePrefix}/${match[1]}`;
    if (isIndexableRoute(route)) routes.push(route);
  }

  return routes;
}

function collectDynamicBlogRoutes() {
  const routes = [];

  for (const filePath of dynamicBlogSourceFiles) {
    routes.push(...collectSlugRoutesFromFile(filePath, /slug:\s*"([^"]+)"/g, "/blog"));
  }

  routes.push(
    ...collectSlugRoutesFromFile(
      psychologicalCleaningPagesFile,
      /articleSlug:\s*"([^"]+)"/g,
      "/blog",
    ),
  );

  return routes;
}

function collectGrowthServiceRoutes() {
  if (!fs.existsSync(growthServicePagesFile)) return [];

  const source = fs.readFileSync(growthServicePagesFile, "utf8");
  const routes = [];
  const pathRegex = /path:\s*"([^"]+)"/g;
  let match;

  while ((match = pathRegex.exec(source))) {
    const route = match[1];
    if (isIndexableRoute(route)) routes.push(route);
  }

  return routes;
}

const routes = Array.from(
  new Set([
    ...collectRoutes(appDirectory),
    ...collectDynamicLocalSeoRoutes(),
    ...collectDynamicBlogRoutes(),
    ...collectGrowthServiceRoutes(),
    ...extraIndexableRoutes,
  ]),
).sort((routeA, routeB) => routeA.localeCompare(routeB));

const fileContent = `// Generated by scripts/generate-sitemap-routes.js. Do not edit by hand.
export const sitemapRoutes = ${JSON.stringify(routes, null, 2)} as const;
`;

fs.writeFileSync(outputFile, fileContent, "utf8");
console.log(`Generated ${routes.length} sitemap routes in ${path.relative(workspaceRoot, outputFile)}`);
