import {
  BASE_URL,
  LASTMOD,
  CORE_SERVICES,
  CITY_PAGES,
  SERVICE_CITY_PAGES,
  BAVARIA_AUTHORITY_PAGES,
  SIGNATURE_SEO_PAGES,
  LONGTAIL_PAGES,
  RATGEBER_PAGES,
  LEGAL_PAGES,
  HUB_PAGES,
} from "./sitemap-config";
import { dynamicLocalSeoRouteSet, dynamicLocalSeoRoutes } from "./local-seo-routes";
import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

/**
 * Sitemap Architecture:
 * - German-only root architecture.
 * - Single flat sitemap.xml for all indexable pages.
 */

interface SitemapUrl {
  pagePath?: string;
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const APP_PAGE_CANDIDATES = ["page.tsx", "page.ts", "page.jsx", "page.js", "route.ts", "route.tsx"] as const;

const LEGACY_REDIRECT_ROUTES = new Set([
  "partnercode",
  "airbnb-reinigung-duesseldorf",
  "angebot-red-flag-scanner",
  "villenservice",
  "umzug-duesseldorf",
]);

const NON_SEO_PUBLIC_ROUTES = new Set([
  "impressum",
  "datenschutz",
  "agb",
  "widerruf",
  "buchungsbedingungen",
  "duesseldorf/reinigung/datenschutz",
  "duesseldorf/reinigung/agb",
]);

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });
}

/**
 * Builds final root-based canonical URLs.
 */
function buildAbsoluteUrl(route: string): string {
  return `${BASE_URL}${route ? `/${route}` : ""}`;
}

function shouldSkipSitemapSegment(segment: string): boolean {
  return (
    segment === "api" ||
    segment === "admin" ||
    segment === "dashboard" ||
    segment === "login" ||
    segment === "angebote" ||
    segment === "guenstig" ||
    segment === "signature" ||
    segment === "feedback" ||
    segment === "villenservice" ||
    segment === "sitemap.xml" ||
    segment === "sitemap-de.xml" ||
    segment.startsWith("_") ||
    segment.startsWith("[")
  );
}

function shouldSkipSitemapRoute(route: string): boolean {
  const normalizedRoute = route.replace(/^\/+|\/+$/g, "");
  return LEGACY_REDIRECT_ROUTES.has(normalizedRoute) || NON_SEO_PUBLIC_ROUTES.has(normalizedRoute);
}

function normalizeRouteSegments(segments: string[]): string[] {
  return segments.filter((segment) => !segment.startsWith("(") && !segment.endsWith(")"));
}

function discoverStaticAppRoutes(): string[] {
  const appDir = join(process.cwd(), "app");
  const routes = new Set<string>();

  function walk(directory: string, segments: string[] = []) {
    if (!existsSync(directory)) return;

    const entries = readdirSync(directory, { withFileTypes: true });
    const hasPage = entries.some((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name));

    if (hasPage) {
      const routeSegments = normalizeRouteSegments(segments);
      const route = routeSegments.join("/");
      if (!routeSegments.some(shouldSkipSitemapSegment) && !shouldSkipSitemapRoute(route)) {
        routes.add(route);
      }
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (shouldSkipSitemapSegment(entry.name)) continue;
      walk(join(directory, entry.name), [...segments, entry.name]);
    }
  }

  walk(appDir);
  return Array.from(routes).sort();
}

function lastmodForRoute(route: string): string {
  const routeSegments = route ? route.split("/") : [];
  const appRouteDir = join(process.cwd(), "app", ...routeSegments);

  for (const fileName of APP_PAGE_CANDIDATES) {
    const candidate = join(appRouteDir, fileName);
    if (existsSync(candidate)) {
      return statSync(candidate).mtime.toISOString().split("T")[0];
    }
  }

  return LASTMOD;
}

function appRouteExists(route: string): boolean {
  if (dynamicLocalSeoRouteSet.has(`/${route}`)) return true;

  const routeSegments = route ? route.split("/") : [];
  const appRouteDir = join(process.cwd(), "app", ...routeSegments);

  return APP_PAGE_CANDIDATES.some((fileName) => existsSync(join(appRouteDir, fileName)));
}

function priorityForRoute(route: string): string {
  if (!route) return "1.0";
  if (["umzug", "reinigung", "entruempelung", "bueroumzug", "firmenentsorgung", "private-client-service", "gewerbereinigung-regensburg", "empfehlen", "makler-vermieter-link", "mieterwechsel-service-regensburg", "wohnung-wieder-vermietbar", "immobilie-verkaufsbereit-machen", "nachlass-raeumung-regensburg", "diskreter-umzug-trennung-scheidung", "schadensbegrenzung", "keller-muellraum-rettung-regensburg", "rueckfahrt-boerse", "uebergabeakte", "reinigung-moeblierte-wohnung-duesseldorf", "rechner", "buchung", "angebotscheck"].includes(route)) return "0.9";
  if (route === "duesseldorf/reinigung") return "0.91";
  if (route === "duesseldorf/bueroreinigung") return "0.9";
  if (
    [
      "duesseldorf/bueroreinigung",
      "duesseldorf/wohnungsreinigung",
      "duesseldorf/grundreinigung",
      "duesseldorf/treppenhausreinigung",
      "duesseldorf/endreinigung",
    ].includes(route)
  ) {
    return "0.82";
  }
  if (["duesseldorf/reinigung/datenschutz", "duesseldorf/reinigung/agb"].includes(route)) {
    return "0.35";
  }
  if (route === "leerfahrt-rueckfahrt") return "0.88";
  if (route === "einsatzgebiet-regensburg-200km") return "0.88";
  if (route === "standorte") return "0.88";
  if (route === "kontakt") return "0.88";
  if (route === "buchung-ablauf") return "0.86";
  if (route === "leistungen-vergleichen") return "0.85";
  if (route === "anbieter-vergleichen") return "0.85";
  if (route === "qualitaet-ablauf") return "0.84";
  if (route === "praxisfaelle") return "0.82";
  if (route === "kostenfaktoren") return "0.84";
  if (route === "floxant-fakten") return "0.8";
  if (route.includes("regensburg") || route.endsWith("-bayern") || route === "service-area-bayern") return "0.85";
  if (route.startsWith("blog") || route.startsWith("ratgeber") || route.startsWith("wissen")) return "0.65";
  if (["impressum", "datenschutz", "agb", "widerruf", "buchungsbedingungen"].includes(route)) return "0.3";
  return "0.7";
}

function changefreqForRoute(route: string): string {
  if (!route) return "daily";
  if (["duesseldorf/reinigung/datenschutz", "duesseldorf/reinigung/agb"].includes(route)) return "yearly";
  if (route === "duesseldorf/reinigung" || route === "duesseldorf/bueroreinigung") return "weekly";
  if (route.startsWith("duesseldorf/")) return "monthly";
  if (route.startsWith("blog") || route.startsWith("ratgeber") || route.startsWith("wissen")) return "weekly";
  if (["impressum", "datenschutz", "agb", "widerruf", "buchungsbedingungen"].includes(route)) return "yearly";
  return "weekly";
}

function addEntries(
  urls: SitemapUrl[],
  routes: readonly string[],
  priority: string,
  changefreq: string
): void {
  for (const route of routes) {
    const normalizedRoute = route.replace(/^\/+|\/+$/g, "");

    if (normalizedRoute.split("/").some(shouldSkipSitemapSegment) || shouldSkipSitemapRoute(normalizedRoute)) {
      continue;
    }

    // Do not let historic config arrays re-add deleted bulk city pages.
    if (normalizedRoute && !appRouteExists(normalizedRoute)) {
      continue;
    }

    urls.push({
      pagePath: normalizedRoute,
      loc: buildAbsoluteUrl(normalizedRoute),
      lastmod: lastmodForRoute(normalizedRoute),
      changefreq,
      priority,
    });
  }
}

/**
 * Generates the full flat German sitemap.
 */
export function generateSitemapResponse(): Response {
  const urls: SitemapUrl[] = [];

  // Homepage
  urls.push({
    pagePath: "",
    loc: buildAbsoluteUrl(""),
    lastmod: lastmodForRoute(""),
    changefreq: "daily",
    priority: "1.0",
  });

  // Core services
  addEntries(urls, CORE_SERVICES, "0.9", "weekly");

  // City pages
  addEntries(urls, CITY_PAGES, "0.9", "daily");

  // Service + city pages
  addEntries(urls, SERVICE_CITY_PAGES, "0.9", "weekly");

  // Historic local SEO route set, now served dynamically through app/[serviceSlug].
  addEntries(
    urls,
    dynamicLocalSeoRoutes.map((entry) => entry.route),
    "0.76",
    "monthly"
  );

  // Bavaria authority pages
  addEntries(urls, BAVARIA_AUTHORITY_PAGES, "0.9", "weekly");

  // Hub pages
  addEntries(urls, HUB_PAGES, "0.8", "weekly");

  // Signature SEO pages
  addEntries(urls, SIGNATURE_SEO_PAGES, "0.7", "weekly");

  // Long-tail pages
  addEntries(urls, LONGTAIL_PAGES, "0.6", "monthly");

  // Ratgeber / Blog pages
  addEntries(urls, RATGEBER_PAGES, "0.6", "weekly");

  // Legal pages
  addEntries(urls, LEGAL_PAGES, "0.3", "yearly");

  // Safety net: include all static root routes that exist in app/, while excluding
  // private/admin/API areas and dynamic placeholders. This keeps the sitemap aligned
  // with the large generated route set without hand-maintaining every city page.
  addEntries(
    urls,
    discoverStaticAppRoutes(),
    "0.7",
    "weekly"
  );

  const changefreqWeight: Record<string, number> = {
    daily: 4,
    weekly: 3,
    monthly: 2,
    yearly: 1,
  };
  const uniqueUrlMap = new Map<string, SitemapUrl>();

  for (const url of urls) {
    const discoveredPriority = Number(priorityForRoute(url.pagePath || ""));
    const configuredPriority = Number(url.priority);
    const priority = Math.max(
      Number.isFinite(configuredPriority) ? configuredPriority : 0.7,
      Number.isFinite(discoveredPriority) ? discoveredPriority : 0.7
    ).toFixed(2).replace(/0$/, "");
    const normalizedUrl = {
      ...url,
      priority,
      changefreq: url.changefreq || changefreqForRoute(url.pagePath || ""),
    };
    const existing = uniqueUrlMap.get(url.loc);

    if (!existing) {
      uniqueUrlMap.set(url.loc, normalizedUrl);
      continue;
    }

    const bestPriority = Math.max(Number(existing.priority), Number(normalizedUrl.priority))
      .toFixed(2)
      .replace(/0$/, "");
    const bestChangefreq =
      changefreqWeight[normalizedUrl.changefreq] > changefreqWeight[existing.changefreq]
        ? normalizedUrl.changefreq
        : existing.changefreq;

    uniqueUrlMap.set(url.loc, {
      ...existing,
      priority: bestPriority,
      changefreq: bestChangefreq,
    });
  }

  const uniqueUrls = Array.from(uniqueUrlMap.values());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (url) => ` <url>
  <loc>${escapeXml(url.loc)}</loc>
  <lastmod>${url.lastmod}</lastmod>
  <changefreq>${url.changefreq}</changefreq>
  <priority>${url.priority}</priority>
 </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
