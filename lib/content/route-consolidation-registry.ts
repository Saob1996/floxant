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
  location: "Düsseldorf" | "Regensburg" | "Bayern" | "Überregional";
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
    cluster: "regensburg-cleaning-hub",
    service: "Reinigung",
    location: "Regensburg",
    primaryRoute: "/regensburg/reinigung",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      {
        route: "/regensburg/reinigungsfirma",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/regensburg/reinigung",
      },
    ],
    confidence: "confirmed",
    evidence: [
      "Die 28-Tage-Seitenaggregation weist für /regensburg/reinigung 556 Impressionen und 2 Klicks aus, für /regensburg/reinigungsfirma 94 Impressionen und keine Klicks.",
      "Beide Routen bedienen dieselbe generische lokale Reinigungsabsicht.",
      "Navigation und englische Sprachzuordnung verwenden /regensburg/reinigung als Primärroute.",
    ],
    unresolvedChecks: ["Externe Links der Alias-Route nach dem Rollout weiter beobachten"],
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
      {
        route: "/regensburg/umzugsservice",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/regensburg/umzug",
      },
      {
        route: "/regensburg/umzugsunternehmen",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/regensburg/umzug",
      },
      {
        route: "/en/regensburg/moving-company",
        decision: "REDIRECT_CANDIDATE",
        existingRedirect: "/en/regensburg/moving",
      },
    ],
    confidence: "probable",
    evidence: [
      "/regensburg/umzug erreicht im 28-Tage-Seitenexport 260 Impressionen; für die zwei deutschen Synonymrouten liegt dort keine eigene Zeile vor.",
      "Die interne Navigation, Sitemap und aktuelle Seitenarchitektur verwenden /regensburg/umzug.",
      "Eine bestehende 308-Weiterleitung führt die historische Variante zur Primärroute.",
    ],
    unresolvedChecks: ["externe Links beider Varianten prüfen", "indexierte Varianten in der Search Console prüfen"],
  },
  {
    cluster: "regensburg-move-out-cleaning",
    service: "End- und Übergabereinigung",
    location: "Regensburg",
    primaryRoute: "/regensburg/reinigung-nach-umzug",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      { route: "/regensburg/uebergabereinigung", decision: "REDIRECT_CANDIDATE", existingRedirect: "/regensburg/reinigung-nach-umzug" },
      { route: "/regensburg/endreinigung", decision: "REDIRECT_CANDIDATE", existingRedirect: "/regensburg/reinigung-nach-umzug" },
      { route: "/regensburg/besenreine-uebergabe", decision: "REDIRECT_CANDIDATE", existingRedirect: "/regensburg/reinigung-nach-umzug" },
    ],
    confidence: "probable",
    evidence: [
      "Die Seitenaggregate sind mit zwei bis drei Impressionen zu klein für eine Gewinnerableitung aus Nachfrage allein.",
      "Die Primärroute beschreibt den gesamten Ablauf nach dem Umzug und besitzt bereits eine direkte englische Entsprechung.",
      "Endreinigung, Übergabereinigung und besenreine Übergabe werden als Abschnitte statt als konkurrierende Zielseiten geführt.",
    ],
    unresolvedChecks: ["GSC-Landingpages nach 28 Tagen auf unerwartete Verluste prüfen"],
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
      {
        route: "/regensburg/haushaltsaufloesung",
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
  {
    cluster: "solar-pv-cleaning",
    service: "PV-Anlagen-Reinigung",
    location: "Bayern",
    primaryRoute: "/pv-anlagen-reinigung",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      { route: "/solarreinigung", decision: "REDIRECT_CANDIDATE", existingRedirect: "/pv-anlagen-reinigung" },
      { route: "/regensburg/solarreinigung", decision: "REDIRECT_CANDIDATE", existingRedirect: "/pv-anlagen-reinigung" },
    ],
    confidence: "probable",
    evidence: [
      "/pv-anlagen-reinigung weist im 28-Tage-Export sechs Impressionen aus, /solarreinigung drei.",
      "Beide Seiten beschreiben dieselbe Reinigungsleistung; die Primärroute benennt das Objekt fachlich eindeutiger.",
    ],
    unresolvedChecks: ["Regionale Nachfrage weiter sammeln; keine zusätzlichen Ortsseiten ohne zwei Nachfragesignale"],
  },
  {
    cluster: "backhaul-shared-load",
    service: "Leerfahrt, Rückfahrt und Beiladung",
    location: "Bayern",
    primaryRoute: "/leerfahrt-rueckfahrt",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      { route: "/rueckfahrt-boerse", decision: "REDIRECT_CANDIDATE", existingRedirect: "/leerfahrt-rueckfahrt" },
      { route: "/rueckfahrt-radar", decision: "REDIRECT_CANDIDATE", existingRedirect: "/leerfahrt-rueckfahrt" },
      { route: "/beiladung", decision: "REDIRECT_CANDIDATE", existingRedirect: "/leerfahrt-rueckfahrt" },
      { route: "/beiladung-regensburg", decision: "REDIRECT_CANDIDATE", existingRedirect: "/leerfahrt-rueckfahrt" },
    ],
    confidence: "probable",
    evidence: [
      "/leerfahrt-rueckfahrt weist im 28-Tage-Export 44 Impressionen aus, /rueckfahrt-boerse und /rueckfahrt-radar jeweils eine; für Beiladungsvarianten liegt keine Seitenzeile vor.",
      "Die gemeinsame Primärseite kann Route, Zeitfenster, Ladung, Flexibilität und Status in einem Prozess erklären.",
    ],
    unresolvedChecks: ["Beiladungsbezogene Suchanfragen nach dem Rollout getrennt beobachten"],
  },
  {
    cluster: "quote-review",
    service: "Angebotsprüfung",
    location: "Überregional",
    primaryRoute: "/angebot-guenstiger-pruefen",
    primaryDecision: "STRENGTHEN",
    legacyRoutes: [
      { route: "/angebot-pruefen", decision: "REDIRECT_CANDIDATE", existingRedirect: "/angebot-guenstiger-pruefen" },
      { route: "/angebotscheck", decision: "REDIRECT_CANDIDATE", existingRedirect: "/angebot-guenstiger-pruefen" },
      { route: "/fairpreis-check", decision: "REDIRECT_CANDIDATE", existingRedirect: "/angebot-guenstiger-pruefen" },
    ],
    confidence: "probable",
    evidence: [
      "/angebot-guenstiger-pruefen weist 60 Impressionen bei Position 8,65 aus; /angebotscheck 23, /angebot-pruefen sechs und /fairpreis-check fünf.",
      "Die vier Seiten versprechen denselben Kernnutzen: vorhandene Angebote anhand von Umfang, Annahmen und Zusatzpositionen verständlich prüfen.",
      "/reinigungsfirma-angebot bleibt getrennt, weil diese Seite eine neue Reinigungsanfrage statt die Prüfung eines vorhandenen Angebots bedient.",
    ],
    unresolvedChecks: ["Query-Zuordnung nach 28 Tagen prüfen; die vorhandenen Daten sind Seitenaggregate"],
  },
] as const satisfies readonly RouteConsolidationEntry[];

export function getRouteConsolidationEntry(route: string) {
  return routeConsolidationRegistry.find(
    (entry) => entry.primaryRoute === route || entry.legacyRoutes.some((legacy) => legacy.route === route),
  );
}
