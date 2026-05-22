#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const routePattern =
  /^app\/(umzug|reinigung|entruempelung|bueroumzug|wohnungsaufloesung|klaviertransport|seniorenumzug)-([^/]+)\/page\.tsx$/;

const outOfRegensburgRadiusCitySlugs = new Set([
  "berlin",
  "bremen",
  "dortmund",
  "essen",
  "frankfurt",
  "hamburg",
  "koeln",
  "leipzig",
  "lindau",
  "stuttgart",
]);

const nonCityRouteSlugs = new Set([
  "moeblierte-wohnung-duesseldorf",
]);

const baseKeyByService = {
  umzug: "umzug_spec",
  reinigung: "reinigung_spec",
  entruempelung: "entruempelung_spec",
  bueroumzug: "service_buero_umzug",
  wohnungsaufloesung: "entruempelung_spec",
  klaviertransport: "klaviertransport_spec",
  seniorenumzug: "seniorenumzug_spec",
};

const labelByService = {
  umzug: "Umzug",
  reinigung: "Reinigung",
  entruempelung: "Entr\u00fcmpelung",
  bueroumzug: "B\u00fcroumzug",
  wohnungsaufloesung: "Wohnungsaufl\u00f6sung",
  klaviertransport: "Klaviertransport",
  seniorenumzug: "Seniorenumzug",
};

const smallWords = new Set(["am", "an", "bei", "dem", "den", "der", "im", "in"]);

function cityNameFromSlug(slug) {
  return slug
    .split("-")
    .map((part, index) =>
      smallWords.has(part) && index > 0
        ? part
        : `${part.charAt(0).toUpperCase()}${part.slice(1)}`,
    )
    .join(" ");
}

const input = fs.readFileSync(0, "utf8").split(/\r?\n/).filter(Boolean);
const entries = [];

for (const rawFile of input) {
  const file = rawFile.replace(/\\/g, "/");
  const match = file.match(routePattern);
  if (!match) continue;

  const [, service, citySlug] = match;
  const route = `/${service}-${citySlug}`;
  if (route === "/umzug-duesseldorf") continue;
  if (outOfRegensburgRadiusCitySlugs.has(citySlug)) continue;
  if (nonCityRouteSlugs.has(citySlug)) continue;

  entries.push({
    route,
    service,
    citySlug,
    city: cityNameFromSlug(citySlug),
    baseKey: baseKeyByService[service],
    label: labelByService[service],
  });
}

entries.sort((routeA, routeB) => routeA.route.localeCompare(routeB.route));

const output = `// Generated from the historic FLOXANT local SEO route set.
// These routes are served dynamically through app/[serviceSlug]/page.tsx so Vercel does not prebuild 1600+ pages.

export type DynamicLocalSeoService =
  | "umzug"
  | "reinigung"
  | "entruempelung"
  | "bueroumzug"
  | "wohnungsaufloesung"
  | "klaviertransport"
  | "seniorenumzug";

export type DynamicLocalSeoRoute = {
  route: string;
  service: DynamicLocalSeoService;
  citySlug: string;
  city: string;
  baseKey: string;
  label: string;
};

export const dynamicLocalSeoRoutes = ${JSON.stringify(entries, null, 2)} as const satisfies readonly DynamicLocalSeoRoute[];

export const dynamicLocalSeoRouteSet = new Set<string>(dynamicLocalSeoRoutes.map((entry) => entry.route));

export function getDynamicLocalSeoRoute(route: string): DynamicLocalSeoRoute | undefined {
  const normalizedRoute = route.startsWith("/") ? route : "/" + route;
  return dynamicLocalSeoRoutes.find((entry) => entry.route === normalizedRoute);
}
`;

fs.writeFileSync(path.join(process.cwd(), "lib", "local-seo-routes.ts"), output, "utf8");
console.log(`Generated ${entries.length} dynamic local SEO routes`);
