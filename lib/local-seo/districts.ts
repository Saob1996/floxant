import type { LocalSeoDistrictRecord } from "./types";

const preparedM0 = {
  indexStatus: "noindex",
  maturityLevel: "M0",
  passedChecks: ["Route vorbereitet", "Datenstruktur vorhanden", "nicht in Sitemap"],
  missingChecks: [
    "eigenstaendiger lokaler Hauptinhalt",
    "ausreichende Suchintention",
    "individuelle FAQ",
    "Freigabe fuer Indexierung",
  ],
} as const;

function regensburgDistrict(slug: string, displayName: string, nearby: readonly string[]): LocalSeoDistrictRecord {
  return {
    slug,
    displayName,
    citySlug: "regensburg",
    cityName: "Regensburg",
    region: "regensburg",
    parentHub: "/region-regensburg",
    serviceFocus: ["Reinigung", "Reinigung nach Umzug", "Wohnungsuebergabe"],
    nearbyCities: nearby,
    districts: [displayName, ...nearby],
    customerTypes: ["Privathaushalte", "Mieter", "Vermieter", "Hausverwaltungen"],
    relevantServices: ["reinigung", "reinigung-nach-umzug", "wohnungsreinigung"],
    specialCases: ["Auszug", "Uebergabe", "Treppenhaus", "Reinigung nach Umzug"],
    localIntro:
      `Die Regensburger Stadtteilseite fuer ${displayName} ist vorbereitet und bleibt noindex, bis sie mehr bietet als eine generische Reinigungsseite.`,
    localProofNotes: [
      "M0-Seite ist nicht in der Sitemap.",
      "Keine kuenstliche Stadtteil-Linkfarm.",
      "Indexierung erst nach individueller FAQ und Kundensituationen.",
    ],
    maturity: preparedM0,
  };
}

export const localSeoDistricts = {
  "regensburg-altstadt": regensburgDistrict("altstadt", "Altstadt", ["Stadtamhof", "Innenstadt", "Westenviertel"]),
  "regensburg-innenstadt": regensburgDistrict("innenstadt", "Innenstadt", ["Altstadt", "Galgenberg", "Stadtamhof"]),
  "regensburg-westenviertel": regensburgDistrict("westenviertel", "Westenviertel", [
    "Pruefening",
    "Koenigswiesen",
    "Kumpfmuehl",
  ]),
  "regensburg-kumpfmuehl": regensburgDistrict("kumpfmuehl", "Kumpfmuehl", [
    "Westenviertel",
    "Koenigswiesen",
    "Galgenberg",
  ]),
  "regensburg-pruefening": regensburgDistrict("pruefening", "Pruefening", [
    "Westenviertel",
    "Koenigswiesen",
    "Ziegetsdorf",
  ]),
  "regensburg-burgweinting": regensburgDistrict("burgweinting", "Burgweinting", [
    "Harting",
    "Oberisling",
    "Grass",
  ]),
} as const satisfies Record<string, LocalSeoDistrictRecord>;
