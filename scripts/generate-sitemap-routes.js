const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = process.cwd();
const appDirectory = path.join(workspaceRoot, "app");
const regensburgCleaningArea = require(path.join(workspaceRoot, "data", "serviceAreas", "regensburgCleaning.json"));
const dynamicLocalRoutesFile = path.join(workspaceRoot, "lib", "local-seo-routes.ts");
const dynamicBlogSourceFiles = [
  path.join(workspaceRoot, "lib", "ai-recommendation-blog-articles.ts"),
  path.join(workspaceRoot, "lib", "offer-check-blog-articles.ts"),
  path.join(workspaceRoot, "lib", "strategic-blog-articles.ts"),
];
const dominanceArticlesFile = path.join(workspaceRoot, "lib", "content", "dominance-articles.ts");
const psychologicalCleaningPagesFile = path.join(
  workspaceRoot,
  "lib",
  "psychological-cleaning-pages.ts",
);
const growthServicePagesFile = path.join(workspaceRoot, "lib", "growth-service-pages.ts");
const structuredLocalSeoPagesFile = path.join(workspaceRoot, "lib", "local-seo", "localSeoPages.ts");
const englishLocalSeoPagesFile = path.join(workspaceRoot, "lib", "local-seo", "englishLocalSeoPages.ts");
const outputFile = path.join(workspaceRoot, "lib", "sitemap-routes.ts");

const pageFileNames = new Set(["page.ts", "page.tsx"]);
const nonHtmlSitemapExtensionPattern = /\.(?:txt|json|xml|png|jpe?g|webp|avif|svg|ico|gif|pdf|webmanifest)$/i;
const blockedSegments = new Set(["api", "admin", "dashboard", "login"]);
const blockedPrefixes = ["/api", "/admin", "/dashboard", "/login", "/angebote", "/guenstig", "/feedback"];
const nonSeoPublicRoutes = new Set([
  "/impressum",
  "/datenschutz",
  "/agb",
  "/widerruf",
  "/buchungsbedingungen",
  "/regensburg/buchen",
  "/duesseldorf/buchen",
  "/angebot-vergleichen-duesseldorf/danke",
  "/duesseldorf/reinigung/anfrage",
  "/umzug-regensburg/anfrage",
  "/regensburg/reinigung/datenschutz",
  "/regensburg/reinigung/agb",
]);
const consciouslyExcludedSignatureLandingRoutes = new Set([
  "/anti-scham-reinigung",
  "/atemruhig-reinigung",
  "/baustaub-ende",
  "/geruchslos-protokoll",
  "/hidden-dirt-check",
  "/mama-kommt-morgen-service",
  "/montagmorgen-effekt",
  "/panikfrei-in-24h",
  "/reset-reinigung",
  "/schluesselruhe-service",
  "/sichtbar-sauber-protokoll",
  "/vermieter-schockschutz-reinigung",
]);
const legacyRedirectRoutes = new Set([
  "/partnercode",
  "/airbnb-reinigung-regensburg",
  "/angebot-red-flag-scanner",
  "/guenstigeres-angebot-pruefen",
  "/einsatzgebiet-regensburg-200km",
  "/service-area-bayern",
  "/villenservice",
  "/umzug-duesseldorf",
  "/duesseldorf/angebot-vergleichen",
  "/duesseldorf/umzug",
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
  "/seo-gone",
]);
const canonicalAliasRoutes = new Set([
  "/duesseldorf/entsorgung",
  "/seniorenumzug",
]);
const allowedDuesseldorfCleaningRoutes = new Set([
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/baureinigung",
  "/duesseldorf/treppenhausreinigung",
  "/duesseldorf/luxusreinigung",
]);
const verifiedApartmentCleaningRoutes = new Set([
  "/reinigung-moeblierte-wohnung-duesseldorf",
  "/reinigung-moeblierte-wohnung-regensburg",
]);
const removedServicePrefixes = [
  "/halteverbotszone",
];
const broadRootCityServicePrefixes = [
  "bueroumzug",
  "entruempelung",
  "klaviertransport",
  "reinigung",
  "seniorenumzug",
  "umzug",
  "wohnungsaufloesung",
];
const gscValidatedRootCityServiceRoutes = new Set([
  "/entruempelung-landshut",
  "/umzug-neustadt-an-der-waldnaab",
  "/umzug-vohenstrauss",
]);
const deprioritizedCitySlugs = new Set([
  "forchheim",
  "friedberg",
  "wuerzburg",
  "kempten",
  "lindau",
  "memmingen",
  "kaufbeuren",
  "traunstein",
  "berlin",
  "bremen",
  "frankfurt",
  "hamburg",
  "leipzig",
  "stuttgart",
]);
const cleaningRouteTerms = [
  "reinigung",
  "reinigungsfirma",
  "reinigungsdienst",
  "putzfirma",
  "gebaeudereinigung",
  "bueroreinigung",
  "praxisreinigung",
  "treppenhausreinigung",
  "grundreinigung",
  "glasreinigung",
  "fensterreinigung",
  "baureinigung",
  "bauendreinigung",
  "sonderreinigung",
  "gewerbereinigung",
  "unterhaltsreinigung",
  "wohnungsreinigung",
  "haushaltsreinigung",
  "hotelreinigung",
  "kanzleireinigung",
  "objektreinigung",
  "teppichreinigung",
  "solarreinigung",
  "pv-anlagen-reinigung",
  "endreinigung",
  "uebergabereinigung",
  "cleaning",
];
const genericRegensburgCleaningRoutes = new Set([
  "reinigung",
  "gewerbereinigung",
  "notfallreinigung-24h",
  "reinigung-nach-veranstaltung",
  "reinigungsfirma-angebot",
  "reinigung-preis-rechner",
  "reinigungsgarantie",
  "spezialreinigung",
  "solarreinigung",
  "pv-anlagen-reinigung",
  "clean-start",
]);

function normalizeCleaningPlaceKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[char] || char)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const allowedCleaningPlaceKeys = new Set(
  [
    "Regensburg",
    ...regensburgCleaningArea.allowedCitiesAndMunicipalities,
    ...regensburgCleaningArea.regensburgDistricts,
    ...regensburgCleaningArea.regensburgSubdistricts,
    ...regensburgCleaningArea.localVillagesAndHamlets,
  ].map(normalizeCleaningPlaceKey),
);

for (const [canonical, aliases] of Object.entries(regensburgCleaningArea.aliases)) {
  const canonicalKey = normalizeCleaningPlaceKey(canonical);
  allowedCleaningPlaceKeys.add(canonicalKey);
  for (const alias of aliases) allowedCleaningPlaceKeys.add(normalizeCleaningPlaceKey(alias));
}

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
  if (verifiedApartmentCleaningRoutes.has(route)) return true;
  if (nonHtmlSitemapExtensionPattern.test(route)) return false;
  if (legacyRedirectRoutes.has(route)) return false;
  if (canonicalAliasRoutes.has(route)) return false;
  if (consciouslyExcludedSignatureLandingRoutes.has(route)) return false;
  if (removedServicePrefixes.some((prefix) => route === prefix || route.startsWith(`${prefix}-`))) return false;
  if (!isCleaningRouteAllowed(route)) return false;
  if (nonSeoPublicRoutes.has(route)) return false;
  if (isDeprioritizedCityRoute(route)) return false;
  if (isBroadRootCityServiceRoute(route)) return false;
  if (/^\/alternativen\/[^/]+$/.test(route)) return false;
  if (/^\/signature\/[^/]+$/.test(route)) return false;

  return !blockedPrefixes.some(
    (prefix) => route === prefix || route.startsWith(`${prefix}/`),
  );
}

function isCleaningRoute(route) {
  const normalizedRoute = route.toLowerCase().replace(/^\/+|\/+$/g, "");
  const segments = normalizedRoute.split("/");
  return cleaningRouteTerms.some((term) =>
    normalizedRoute === term ||
    segments.some((segment) => segment === term || segment.includes(term)),
  );
}

function extractCleaningPlaceSlug(route) {
  const normalizedRoute = route.toLowerCase().replace(/^\/+|\/+$/g, "");
  if (normalizedRoute.startsWith("reinigung-")) return normalizedRoute.replace(/^reinigung-/, "");
  if (normalizedRoute.endsWith("-reinigung")) return normalizedRoute.replace(/-reinigung$/, "");
  if (normalizedRoute.startsWith("en/")) {
    const parts = normalizedRoute.split("/");
    if (parts.length >= 3 && (parts[2].includes("cleaning") || parts[2].includes("quote-review"))) return parts[1];
  }

  const parts = normalizedRoute.split("/");
  if (parts[0] === "regensburg") return "regensburg";
  if (parts.length >= 2 && isCleaningRoute(parts.slice(1).join("/"))) return parts[0];

  return null;
}

function isCleaningRouteAllowed(route) {
  if (!isCleaningRoute(route)) return true;

  const normalizedRoute = route.toLowerCase().replace(/^\/+|\/+$/g, "");
  if (allowedDuesseldorfCleaningRoutes.has(`/${normalizedRoute}`)) return true;

  if (normalizedRoute.startsWith("blog/")) {
    return (
      normalizedRoute.includes("regensburg") ||
      normalizedRoute.includes("duesseldorf") ||
      normalizedRoute.includes("50-km") ||
      normalizedRoute.includes("50km")
    );
  }

  if (genericRegensburgCleaningRoutes.has(normalizedRoute)) return true;

  const placeSlug = extractCleaningPlaceSlug(normalizedRoute);
  if (!placeSlug) return genericRegensburgCleaningRoutes.has(normalizedRoute);

  return allowedCleaningPlaceKeys.has(normalizeCleaningPlaceKey(placeSlug));
}

function isBroadRootCityServiceRoute(route) {
  const normalizedRoute = route.toLowerCase().replace(/^\/+|\/+$/g, "");

  if (gscValidatedRootCityServiceRoutes.has(`/${normalizedRoute}`)) {
    return false;
  }

  if (normalizedRoute === "seniorenumzug-landshut") {
    return false;
  }

  if (isCleaningRoute(normalizedRoute) && isCleaningRouteAllowed(normalizedRoute)) {
    return false;
  }

  if (normalizedRoute.includes("regensburg") || normalizedRoute.endsWith("-bayern")) {
    return false;
  }

  return broadRootCityServicePrefixes.some((prefix) => normalizedRoute.startsWith(`${prefix}-`));
}

function isDeprioritizedCityRoute(route) {
  const normalizedRoute = route.toLowerCase().replace(/^\/+|\/+$/g, "");

  return Array.from(deprioritizedCitySlugs).some(
    (citySlug) =>
      normalizedRoute === citySlug ||
      normalizedRoute.endsWith(`-${citySlug}`) ||
      normalizedRoute.includes(`-${citySlug}-`),
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

  routes.push(
    ...collectSlugRoutesFromFile(
      dominanceArticlesFile,
      /locale:\s*"de",[\s\S]*?slug:\s*"([^"]+)"/g,
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

function collectStructuredLocalSeoRoutes() {
  if (!fs.existsSync(structuredLocalSeoPagesFile)) return [];

  const source = fs.readFileSync(structuredLocalSeoPagesFile, "utf8");
  const routes = [];
  const pageBlockRegex = /path:\s*"([^"]+)"[\s\S]*?maturity:\s*(indexableM1|indexableM2|input\.city\.maturity|district\.maturity)/g;
  let match;

  while ((match = pageBlockRegex.exec(source))) {
    const route = match[1];
    const maturitySource = match[2];
    if (maturitySource === "district.maturity") continue;
    if (isIndexableRoute(route)) routes.push(route);
  }

  for (const slug of collectConstStringArray(source, "regensburgCityCleaningSlugs")) {
    const route = `/${slug}/reinigung`;
    if (isIndexableRoute(route)) routes.push(route);
  }

  for (const slug of collectConstStringArray(source, "regensburgCityMoveSlugs")) {
    const route = `/${slug}/umzug`;
    if (isIndexableRoute(route)) routes.push(route);
  }

  return routes;
}

function collectEnglishLocalSeoRoutes() {
  if (!fs.existsSync(englishLocalSeoPagesFile)) return [];

  const source = fs.readFileSync(englishLocalSeoPagesFile, "utf8");
  const routes = [];
  const pathRegex = /path:\s*"([^"]+)"/g;
  let match;

  while ((match = pathRegex.exec(source))) {
    const route = match[1];
    if (isIndexableRoute(route)) routes.push(route);
  }

  return routes;
}

function collectConstStringArray(source, constName) {
  const arrayMatch = source.match(new RegExp(`const\\s+${constName}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const;`));
  if (!arrayMatch) return [];

  const values = [];
  const stringRegex = /"([^"]+)"/g;
  let match;

  while ((match = stringRegex.exec(arrayMatch[1]))) {
    values.push(match[1]);
  }

  return values;
}

const routes = Array.from(
  new Set([
    ...collectRoutes(appDirectory),
    ...collectDynamicLocalSeoRoutes(),
    ...collectDynamicBlogRoutes(),
    ...collectGrowthServiceRoutes(),
    ...collectStructuredLocalSeoRoutes(),
    ...collectEnglishLocalSeoRoutes(),
  ]),
).sort((routeA, routeB) => routeA.localeCompare(routeB));

const fileContent = `// Generated by scripts/generate-sitemap-routes.js. Do not edit by hand.
export const sitemapRoutes = ${JSON.stringify(routes, null, 2)} as const;
`;

fs.writeFileSync(outputFile, fileContent, "utf8");
console.log(`Generated ${routes.length} sitemap routes in ${path.relative(workspaceRoot, outputFile)}`);
