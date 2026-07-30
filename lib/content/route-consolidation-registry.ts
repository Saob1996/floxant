export type RouteSeoDecision =
  | "KEEP"
  | "STRENGTHEN"
  | "CONSOLIDATION_CANDIDATE"
  | "REDIRECT_CANDIDATE"
  | "NOINDEX_CANDIDATE"
  | "MANUAL_REVIEW";

export type CannibalizationConfidence = "confirmed" | "probable" | "unclear" | "manual_review";

export type RouteConsolidationEntry = {
  cluster: string;
  service: string;
  location: "Düsseldorf" | "Regensburg";
  primaryRoute: string;
  primaryDecision: "KEEP" | "STRENGTHEN";
  legacyRoutes: readonly {
    route: string;
    decision: RouteSeoDecision;
    existingRedirect: string | null;
  }[];
  confidence: CannibalizationConfidence;
  evidence: readonly string[];
  unresolvedChecks: readonly string[];
};

export const routeConsolidationRegistry = [
  {
    cluster: "duesseldorf-cleaning-hub",
    service: "Reinigung",
    location: "Düsseldorf",
    primaryRoute: "/duesseldorf/reinigung",
    primaryDecision: "KEEP",
    legacyRoutes: [
      {
        route: "/reinigung-duesseldorf",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/duesseldorf/reinigung",
      },
      {
        route: "/reinigungsfirma-duesseldorf",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/duesseldorf/reinigung",
      },
    ],
    confidence: "probable",
    evidence: [
      "Die 28-Tage-Seitenaggregation zeigt starke Sichtbarkeit der regionalen Reinigungsseite.",
      "Die Standortseite und die Reinigungsseite besitzen unterschiedliche Aufgaben.",
      "Bestehende statische Weiterleitungen bündeln generische Reinigungsvarianten auf der Reinigungsseite.",
    ],
    unresolvedChecks: ["Suchanfragen und Zielseiten in der Search Console manuell zusammen prüfen", "externe Links prüfen"],
  },
  {
    cluster: "regensburg-moving",
    service: "Umzug",
    location: "Regensburg",
    primaryRoute: "/regensburg/umzug",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      {
        route: "/umzug-regensburg",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/regensburg/umzug",
      },
    ],
    confidence: "probable",
    evidence: [
      "Beide Routen erscheinen in getrennten historischen Seitenaggregationen.",
      "Die interne Navigation, Sitemap und aktuelle Seitenarchitektur verwenden /regensburg/umzug.",
      "Eine bestehende 308-Weiterleitung führt die historische Variante zur Primärroute.",
    ],
    unresolvedChecks: ["externe Links beider Varianten prüfen", "indexierte Varianten in der Search Console prüfen"],
  },
  {
    cluster: "regensburg-clearance",
    service: "Entrümpelung",
    location: "Regensburg",
    primaryRoute: "/regensburg/entruempelung",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      {
        route: "/entruempelung-regensburg",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/regensburg/entruempelung",
      },
      {
        route: "/entrümpelung-regensburg",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/regensburg/entruempelung",
      },
    ],
    confidence: "probable",
    evidence: [
      "Die aktuelle Sitemap und interne Standortarchitektur verwenden /regensburg/entruempelung.",
      "Bestehende 308-Weiterleitungen führen Schreibvarianten zur Primärroute.",
      "Die Query- und Seitenexporte bleiben getrennte Aggregate; eine konkrete Query-Zuordnung ist nicht bewiesen.",
    ],
    unresolvedChecks: ["externe Links der historischen Route prüfen", "Indexabdeckung manuell prüfen"],
  },
  {
    cluster: "regensburg-apartment-clearance",
    service: "Wohnungsauflösung",
    location: "Regensburg",
    primaryRoute: "/regensburg/wohnungsaufloesung",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      {
        route: "/wohnungsaufloesung-regensburg",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/regensburg/wohnungsaufloesung",
      },
    ],
    confidence: "probable",
    evidence: [
      "Die aktuelle Sitemap führt die regionale Primärroute.",
      "Eine bestehende 308-Weiterleitung bündelt die historische Schreibweise.",
      "Wohnungsauflösung bleibt inhaltlich von allgemeiner Entrümpelung und Haushaltsauflösung getrennt.",
    ],
    unresolvedChecks: ["Indexabdeckung und externe Links manuell prüfen"],
  },
] as const satisfies readonly RouteConsolidationEntry[];

export function getRouteConsolidationEntry(route: string) {
  return routeConsolidationRegistry.find(
    (entry) => entry.primaryRoute === route || entry.legacyRoutes.some((legacy) => legacy.route === route),
  );
}
