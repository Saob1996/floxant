import type { LocalSeoDistrictRecord } from "./types";

const preparedM0 = {
  indexStatus: "noindex",
  maturityLevel: "M0",
  passedChecks: ["Route vorbereitet", "Datenstruktur vorhanden", "nicht in Sitemap"],
  missingChecks: [
    "eigenständiger lokaler Hauptinhalt",
    "ausreichende Suchintention",
    "individuelle FAQ",
    "Freigabe für Indexierung",
  ],
} as const;

function duesseldorfDistrict(slug: string, displayName: string, nearby: readonly string[]): LocalSeoDistrictRecord {
  return {
    slug,
    displayName,
    citySlug: "duesseldorf",
    cityName: "Düsseldorf",
    region: "duesseldorf",
    parentHub: "/duesseldorf/reinigung-stadtteile-umgebung",
    serviceFocus: ["Reinigung", "Wohnungsreinigung", "Treppenhausreinigung", "Grundreinigung"],
    nearbyCities: nearby,
    districts: [displayName, ...nearby],
    customerTypes: ["Privathaushalte", "Hausverwaltungen", "Büros", "Vermieter"],
    relevantServices: ["reinigung", "wohnungsreinigung", "treppenhausreinigung", "grundreinigung"],
    specialCases: ["Übergabe", "Treppenhaus", "Grundreinigung", "Angebotsprüfung"],
    localIntro:
      `Die Stadtteilseite für ${displayName} ist vorbereitet, bleibt aber noindex, bis genügend eigenständiger lokaler Inhalt und echte Suchintention vorliegen.`,
    localProofNotes: [
      "Keine automatische Indexierung von Stadtteilseiten.",
      "Kein Footer-Link und kein Sitemap-Eintrag.",
      "Freigabe erst ab M1 nach Qualitätsprüfung.",
    ],
    maturity: preparedM0,
  };
}

function regensburgDistrict(slug: string, displayName: string, nearby: readonly string[]): LocalSeoDistrictRecord {
  return {
    slug,
    displayName,
    citySlug: "regensburg",
    cityName: "Regensburg",
    region: "regensburg",
    parentHub: "/region-regensburg",
    serviceFocus: ["Reinigung", "Reinigung nach Umzug", "Wohnungsübergabe"],
    nearbyCities: nearby,
    districts: [displayName, ...nearby],
    customerTypes: ["Privathaushalte", "Mieter", "Vermieter", "Angehörige"],
    relevantServices: ["reinigung", "reinigung-nach-umzug", "wohnungsaufloesung"],
    specialCases: ["Auszug", "Übergabe", "Restmengen", "Reinigung nach Umzug"],
    localIntro:
      `Die Regensburger Stadtteilseite für ${displayName} ist vorbereitet und bleibt noindex, bis sie mehr bietet als eine generische Reinigungsseite.`,
    localProofNotes: [
      "M0-Seite ist nicht in der Sitemap.",
      "Keine künstliche Stadtteil-Linkfarm.",
      "Indexierung erst nach individueller FAQ und Kundensituationen.",
    ],
    maturity: preparedM0,
  };
}

export const localSeoDistricts = {
  "duesseldorf-heerdt": duesseldorfDistrict("heerdt", "Heerdt", ["Lörick", "Oberkassel", "Niederkassel", "Neuss"]),
  "duesseldorf-oberkassel": duesseldorfDistrict("oberkassel", "Oberkassel", ["Heerdt", "Lörick", "Niederkassel", "Carlstadt"]),
  "duesseldorf-bilk": duesseldorfDistrict("bilk", "Bilk", ["Unterbilk", "Friedrichstadt", "Hamm", "Oberbilk"]),
  "duesseldorf-pempelfort": duesseldorfDistrict("pempelfort", "Pempelfort", ["Derendorf", "Golzheim", "Stadtmitte", "Düsseltal"]),
  "duesseldorf-derendorf": duesseldorfDistrict("derendorf", "Derendorf", ["Pempelfort", "Golzheim", "Mörsenbroich", "Rath"]),
  "regensburg-altstadt": regensburgDistrict("altstadt", "Altstadt", ["Stadtamhof", "Innenstadt", "Westenviertel"]),
  "regensburg-innenstadt": regensburgDistrict("innenstadt", "Innenstadt", ["Altstadt", "Galgenberg", "Stadtamhof"]),
  "regensburg-westenviertel": regensburgDistrict("westenviertel", "Westenviertel", ["Prüfening", "Königswiesen", "Kumpfmühl"]),
  "regensburg-kumpfmuehl": regensburgDistrict("kumpfmuehl", "Kumpfmühl", ["Westenviertel", "Königswiesen", "Galgenberg"]),
  "regensburg-pruefening": regensburgDistrict("pruefening", "Prüfening", ["Westenviertel", "Königswiesen", "Ziegetsdorf"]),
} as const satisfies Record<string, LocalSeoDistrictRecord>;
