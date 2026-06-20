import type { LocalSeoRegionKey } from "./types";

export type LocalSeoRegionRecord = {
  key: LocalSeoRegionKey;
  displayName: string;
  path: string;
  centerCity: string;
  radiusKm: number;
  primaryFocus: readonly string[];
  strategicCities: readonly string[];
  positioning: string;
};

export const localSeoRegions = {
  duesseldorf: {
    key: "duesseldorf",
    displayName: "Region Düsseldorf",
    path: "/region-duesseldorf",
    centerCity: "Düsseldorf",
    radiusKm: 150,
    primaryFocus: [
      "Reinigung",
      "Grundreinigung",
      "Putzfirma",
      "Wohnungsreinigung",
      "Treppenhausreinigung",
      "Büroreinigung",
      "Praxisreinigung",
      "Gewerbereinigung",
      "Geruchsneutralisation",
      "Angebotsprüfung",
    ],
    strategicCities: [
      "Düsseldorf",
      "Köln",
      "Neuss",
      "Meerbusch",
      "Duisburg",
      "Mönchengladbach",
      "Krefeld",
      "Ratingen",
      "Hilden",
      "Erkrath",
    ],
    positioning:
      "Düsseldorf ist das starke Zentrum für Reinigung und Angebotsprüfung. Umlandseiten werden nur indexiert, wenn sie eigenen lokalen Nutzen haben.",
  },
  regensburg: {
    key: "regensburg",
    displayName: "Region Regensburg",
    path: "/region-regensburg",
    centerCity: "Regensburg",
    radiusKm: 200,
    primaryFocus: [
      "Umzug",
      "Umzugsservice",
      "Umzugskosten",
      "Seniorenumzug",
      "Entrümpelung",
      "Wohnungsauflösung",
      "Reinigung nach Umzug",
      "Angebotsprüfung",
    ],
    strategicCities: [
      "Regensburg",
      "Landshut",
      "Straubing",
      "Ingolstadt",
      "Neumarkt in der Oberpfalz",
      "Weiden in der Oberpfalz",
      "Schwandorf",
      "Amberg",
      "Kelheim",
    ],
    positioning:
      "Regensburg bleibt das Zentrum für Umzug, Entrümpelung, Wohnungsauflösung, Reinigung nach Umzug und Angebotsprüfung in Bayern.",
  },
} as const satisfies Record<LocalSeoRegionKey, LocalSeoRegionRecord>;
