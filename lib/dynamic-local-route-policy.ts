import dynamicLocalRoutePolicy from "@/data/dynamic-local-route-policy.json";
import {
  dynamicLocalSeoRoutes,
  type DynamicLocalSeoRoute,
} from "@/lib/local-seo-routes";

type LocalTemplateService =
  | "umzug"
  | "reinigung"
  | "entruempelung"
  | "bueroumzug"
  | "wohnungsaufloesung"
  | "klaviertransport"
  | "seniorenumzug";

const localServiceFallbacks: Record<LocalTemplateService, string> = {
  umzug: "/regensburg/umzug",
  reinigung: "/regensburg/reinigung",
  entruempelung: "/regensburg/entruempelung",
  bueroumzug: "/bueroumzug-regensburg",
  wohnungsaufloesung: "/regensburg/wohnungsaufloesung",
  klaviertransport: "/klaviertransport-regensburg",
  seniorenumzug: "/regensburg/seniorenumzug",
};

function normalizeRoute(route: string): string {
  const normalized = route.trim().split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "/";
}

function getLocalTemplateService(route: string): LocalTemplateService | undefined {
  const normalizedRoute = normalizeRoute(route);
  return (Object.keys(localServiceFallbacks) as LocalTemplateService[]).find((service) =>
    normalizedRoute.startsWith(`/${service}-`),
  );
}

export const publishedDynamicLocalRouteSet = new Set<string>(
  dynamicLocalRoutePolicy.publishedDynamicRoutes.map(normalizeRoute),
);

export const protectedStaticLocalRouteSet = new Set<string>(
  dynamicLocalRoutePolicy.protectedStaticRoutes.map(normalizeRoute),
);

export const publishedDynamicLocalSeoRoutes = dynamicLocalSeoRoutes.filter((entry) =>
  publishedDynamicLocalRouteSet.has(entry.route),
) as readonly DynamicLocalSeoRoute[];

export function getPublishedDynamicLocalSeoRoute(route: string): DynamicLocalSeoRoute | undefined {
  const normalizedRoute = normalizeRoute(route);
  if (!publishedDynamicLocalRouteSet.has(normalizedRoute)) return undefined;
  return publishedDynamicLocalSeoRoutes.find((entry) => entry.route === normalizedRoute);
}

export function isPublishedLocalServiceRoute(route: string): boolean {
  const normalizedRoute = normalizeRoute(route);
  return (
    publishedDynamicLocalRouteSet.has(normalizedRoute) ||
    protectedStaticLocalRouteSet.has(normalizedRoute)
  );
}

export function resolvePublishedLocalServiceHref(candidateRoute: string, fallbackRoute?: string): string {
  const normalizedCandidate = normalizeRoute(candidateRoute);
  const service = getLocalTemplateService(normalizedCandidate);
  if (!service) return candidateRoute;
  if (isPublishedLocalServiceRoute(normalizedCandidate)) return normalizedCandidate;

  return fallbackRoute || localServiceFallbacks[service];
}
