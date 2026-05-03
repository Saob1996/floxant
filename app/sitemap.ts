import type { MetadataRoute } from "next";

import { company } from "@/lib/company";
import { sitemapRoutes } from "@/lib/sitemap-routes";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

const lastModified = new Date("2026-05-03T00:00:00.000Z");
const highPriorityRoutes = new Set([
  "/",
  "/buchung",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/bueroumzug",
  "/gewerbereinigung-regensburg",
  "/private-client-service",
  "/service-area-bayern",
  "/kontakt",
  "/standorte",
]);

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
    .map((route) => ({
      url: new URL(route, company.url).toString(),
      lastModified,
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
    }));
}
