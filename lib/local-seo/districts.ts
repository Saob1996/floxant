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
      `Für eine Reinigungsanfrage in ${displayName} können Sie Objektart, Flächen, Zustand und Wunschtermin direkt beschreiben.`,
    localProofNotes: [
      "Für den Start reichen Ort, Objektart, Flächen und gewünschter Zeitraum.",
      "Fotos helfen bei besonderen Verschmutzungen oder schwer erreichbaren Bereichen.",
      "FLOXANT prüft die Angaben persönlich und klärt offene Punkte vor dem Angebot.",
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
