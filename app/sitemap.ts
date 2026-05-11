import type { MetadataRoute } from "next";

import { company } from "@/lib/company";
import { sitemapRoutes } from "@/lib/sitemap-routes";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

const lastModified = new Date("2026-05-07T00:00:00.000Z");
const highPriorityRoutes = new Set([
  "/",
  "/empfehlen",
  "/angebotscheck",
  "/angebot-guenstiger-pruefen",
  "/plattform-auftrag-pruefen",
  "/makler-vermieter-link",
  "/mieterwechsel-service-regensburg",
  "/wohnung-wieder-vermietbar",
  "/immobilie-verkaufsbereit-machen",
  "/nachlass-raeumung-regensburg",
  "/diskreter-umzug-trennung-scheidung",
  "/schadensbegrenzung",
  "/plan-b-service",
  "/keller-muellraum-rettung-regensburg",
  "/rueckfahrt-boerse",
  "/uebergabeakte",
  "/buchung",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/bueroumzug",
  "/umzug-regensburg",
  "/umzugsunternehmen-regensburg",
  "/reinigung-regensburg",
  "/entruempelung-regensburg",
  "/entsorgung-duesseldorf",
  "/reinigung-moeblierte-wohnung-duesseldorf",
  "/bueroumzug-regensburg",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/treppenhausreinigung",
  "/gewerbereinigung-regensburg",
  "/private-client-service",
  "/service-area-bayern",
  "/einsatzgebiet-regensburg-200km",
  "/einsatzradar-regensburg",
  "/kontakt",
  "/standorte",
]);

const redirectOnlyRoutes = new Set([
  "/duesseldorf/b2b-reinigung",
  "/umzug-duesseldorf",
  "/seo-gone",
]);

const forbiddenDuesseldorfServiceTerms = [
  "umzug",
  "umzugs",
  "bueroumzug",
  "transport",
  "kleintransport",
  "klaviertransport",
  "halteverbotszone",
  "beiladung",
  "rueckfahrt",
  "leerfahrt",
  "seniorenumzug",
  "studentenumzug",
  "entruempelung",
  "wohnungsaufloesung",
] as const;

function isForbiddenDuesseldorfMovingRoute(route: string) {
  const normalizedRoute = route.toLowerCase();
  if (!normalizedRoute.includes("duesseldorf")) return false;

  return forbiddenDuesseldorfServiceTerms.some((term) => normalizedRoute.includes(term));
}

function isIndexableSitemapRoute(route: string) {
  if (!route.startsWith("/")) return false;
  if (/^\/(de|en|ru|bg|vi|tr)(\/|$)/.test(route)) return false;
  if (redirectOnlyRoutes.has(route)) return false;
  if (isForbiddenDuesseldorfMovingRoute(route)) return false;

  return true;
}

function getPriority(route: string) {
  if (route === "/") return 1;
  if (highPriorityRoutes.has(route)) return 0.95;
  if (route === "/blog" || route === "/wissen") return 0.86;
  if (/^\/(umzug|reinigung|entruempelung|bueroumzug|wohnungsaufloesung)-/.test(route)) {
    return 0.78;
  }
  if (route.startsWith("/blog/") || route.startsWith("/wissen/") || route.startsWith("/ratgeber/")) {
    return 0.68;
  }
  if (/^\/(agb|datenschutz|impressum|widerruf|buchungsbedingungen)$/.test(route)) return 0.34;
  return 0.72;
}

function getChangeFrequency(route: string): ChangeFrequency {
  if (route === "/" || highPriorityRoutes.has(route)) return "weekly";
  if (route === "/blog" || route.startsWith("/blog/")) return "weekly";
  if (/^\/(umzug|reinigung|entruempelung|bueroumzug|wohnungsaufloesung)-/.test(route)) {
    return "monthly";
  }
  if (/^\/(agb|datenschutz|impressum|widerruf|buchungsbedingungen)$/.test(route)) return "yearly";
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes
    .filter(isIndexableSitemapRoute)
    .map((route) => ({
      url: new URL(route, company.url).toString(),
      lastModified,
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
    }));
}
