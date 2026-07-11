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
  regensburg: {
    key: "regensburg",
    displayName: "Region Regensburg",
    path: "/region-regensburg",
    centerCity: "Regensburg",
    radiusKm: 50,
    primaryFocus: [
      "Reinigung",
      "Bueroreinigung",
      "Gewerbereinigung",
      "Praxisreinigung",
      "Treppenhausreinigung",
      "Reinigung nach Umzug",
      "Angebotsprüfung",
    ],
    strategicCities: [
      "Regensburg",
      "Neutraubling",
      "Lappersdorf",
      "Pentling",
      "Obertraubling",
      "Regenstauf",
      "Kelheim",
      "Schwandorf",
      "Straubing",
    ],
    positioning:
      "Regensburg bleibt der lokale Schwerpunkt fuer Reinigung. Umlandorte werden nur im 50-km-Umkreis und ohne Standortbehauptung eingeordnet.",
  },
} as const satisfies Partial<Record<LocalSeoRegionKey, LocalSeoRegionRecord>>;
