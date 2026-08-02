import { localSeoRegions } from "./regions";
import type { LocalSeoRegionKey } from "./types";

export type LocalSeoServiceArea = {
  region: LocalSeoRegionKey;
  center: string;
  radiusLabel: string;
  correctWording: string;
  forbiddenWording: readonly string[];
  priorityCities: readonly string[];
};

export const localSeoServiceAreas = {
  regensburg: {
    region: "regensburg",
    center: "Regensburg",
    radiusLabel: "75 km rund um Regensburg",
    correctWording:
      "FLOXANT betreut Reinigungsanfragen in Regensburg und Umgebung bis 75 km ohne lokale Filialbehauptung.",
    forbiddenWording: ["FLOXANT Standort", "FLOXANT Filiale", "unser Team direkt in", "bayernweit", "bundesweit"],
    priorityCities: localSeoRegions.regensburg.strategicCities,
  },
} as const satisfies Partial<Record<LocalSeoRegionKey, LocalSeoServiceArea>>;
