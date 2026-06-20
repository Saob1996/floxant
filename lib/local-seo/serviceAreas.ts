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
  duesseldorf: {
    region: "duesseldorf",
    center: "Düsseldorf",
    radiusLabel: "ca. 150 km rund um Düsseldorf",
    correctWording:
      "FLOXANT betreut Anfragen in dieser Stadt im Rahmen des regionalen Einsatzgebiets rund um Düsseldorf.",
    forbiddenWording: ["FLOXANT Standort", "FLOXANT Filiale", "unser Team direkt in"],
    priorityCities: localSeoRegions.duesseldorf.strategicCities,
  },
  regensburg: {
    region: "regensburg",
    center: "Regensburg",
    radiusLabel: "ca. 200 km rund um Regensburg",
    correctWording:
      "FLOXANT betreut Anfragen in dieser Stadt im Rahmen des regionalen Einsatzgebiets rund um Regensburg.",
    forbiddenWording: ["FLOXANT Standort", "FLOXANT Filiale", "unser Team direkt in"],
    priorityCities: localSeoRegions.regensburg.strategicCities,
  },
} as const satisfies Record<LocalSeoRegionKey, LocalSeoServiceArea>;
