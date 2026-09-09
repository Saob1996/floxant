import policy from "@/data/local-route-area-policy.json";

const decisionsByPath = new Map(policy.excludedRoutes.map((entry) => [entry.path, entry]));
const normalizePath = (path: string) => `/${path.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "")}`;

export function getOutsideLocalServiceAreaDecision(path: string) {
  return decisionsByPath.get(normalizePath(path));
}

export function isOutsideLocalServiceAreaRoute(path: string) {
  return decisionsByPath.has(normalizePath(path));
}

export const localMovingRouteExceptions: readonly string[] = policy.routeExceptions;
