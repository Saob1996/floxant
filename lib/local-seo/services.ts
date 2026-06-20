import type { LocalSeoServiceKey } from "./types";

export type LocalSeoServiceRecord = {
  key: LocalSeoServiceKey;
  displayName: string;
  category: "cleaning" | "moving" | "clearance" | "offer";
  shortScope: readonly string[];
  searchIntents: readonly string[];
};

export const localSeoServices = {
  reinigung: {
    key: "reinigung",
    displayName: "Reinigung",
    category: "cleaning",
    shortScope: ["Wohnung", "Büro", "Praxis", "Treppenhaus", "Übergabe"],
    searchIntents: ["reinigung", "reinigungsfirma", "reinigungsservice"],
  },
  grundreinigung: {
    key: "grundreinigung",
    displayName: "Grundreinigung",
    category: "cleaning",
    shortScope: ["stärkere Verschmutzung", "Auszug", "Renovierung", "Büro", "Praxis"],
    searchIntents: ["grundreinigung", "grundreinigung wohnung", "reinigung nach auszug"],
  },
  putzfirma: {
    key: "putzfirma",
    displayName: "Putzfirma",
    category: "cleaning",
    shortScope: ["Wohnung", "Büro", "Praxis", "Alltagsanfrage"],
    searchIntents: ["putzfirma", "putzfirmen", "zuverlässige putzfirma"],
  },
  reinigungsdienst: {
    key: "reinigungsdienst",
    displayName: "Reinigungsdienst",
    category: "cleaning",
    shortScope: ["Privat", "Gewerbe", "regelmäßig", "einmalig"],
    searchIntents: ["reinigungsdienst", "reinigungsservice", "reinigungsfirma"],
  },
  haushaltsreinigung: {
    key: "haushaltsreinigung",
    displayName: "Haushaltsreinigung",
    category: "cleaning",
    shortScope: ["Privathaushalt", "Wohnung", "Alltag", "Auszug"],
    searchIntents: ["haushaltsreinigung", "wohnung reinigen lassen", "putzdienst"],
  },
  wohnungsreinigung: {
    key: "wohnungsreinigung",
    displayName: "Wohnungsreinigung",
    category: "cleaning",
    shortScope: ["Auszug", "Übergabe", "Leerstand", "Grundreinigung"],
    searchIntents: ["wohnungsreinigung", "reinigung nach auszug", "wohnung reinigen lassen"],
  },
  treppenhausreinigung: {
    key: "treppenhausreinigung",
    displayName: "Treppenhausreinigung",
    category: "cleaning",
    shortScope: ["Hauseingang", "Hausflur", "Etagen", "Hausverwaltung"],
    searchIntents: ["treppenhausreinigung", "treppenreinigung", "reinigung hauseingang"],
  },
  gebaeudereinigung: {
    key: "gebaeudereinigung",
    displayName: "Gebäudereinigung",
    category: "cleaning",
    shortScope: ["Objekt", "Gewerbe", "Eingang", "Treppenhaus"],
    searchIntents: ["gebäudereinigung", "gewerbereinigung", "objektreinigung"],
  },
  bueroreinigung: {
    key: "bueroreinigung",
    displayName: "Büroreinigung",
    category: "cleaning",
    shortScope: ["Arbeitsplätze", "Küche", "Sanitär", "Randzeiten"],
    searchIntents: ["büroreinigung", "büro reinigen lassen", "reinigung büro"],
  },
  gewerbereinigung: {
    key: "gewerbereinigung",
    displayName: "Gewerbereinigung",
    category: "cleaning",
    shortScope: ["Gewerbeflächen", "Laden", "Studio", "Objekt"],
    searchIntents: ["gewerbereinigung", "reinigung gewerbe", "reinigung gewerbeflächen"],
  },
  praxisreinigung: {
    key: "praxisreinigung",
    displayName: "Praxisreinigung",
    category: "cleaning",
    shortScope: ["Empfang", "Wartebereich", "Behandlungsräume", "Sanitär"],
    searchIntents: ["praxisreinigung", "praxis reinigen lassen", "reinigung praxis"],
  },
  kanzleireinigung: {
    key: "kanzleireinigung",
    displayName: "Kanzleireinigung",
    category: "cleaning",
    shortScope: ["Besprechungsräume", "Arbeitsplätze", "Diskretion", "Randzeiten"],
    searchIntents: ["kanzleireinigung", "reinigung kanzlei", "büroreinigung kanzlei"],
  },
  "gewerbeflaechen-reinigung": {
    key: "gewerbeflaechen-reinigung",
    displayName: "Gewerbeflächen-Reinigung",
    category: "cleaning",
    shortScope: ["Gewerbefläche", "Verkaufsfläche", "Lager", "Eingang"],
    searchIntents: ["reinigung gewerbeflächen", "gewerbeflächen reinigen lassen", "gewerbereinigung"],
  },
  geruchsneutralisation: {
    key: "geruchsneutralisation",
    displayName: "Geruchsneutralisation",
    category: "cleaning",
    shortScope: ["Nikotin", "Tiergeruch", "muffige Räume", "Auszug"],
    searchIntents: ["geruchsneutralisation wohnung", "geruch entfernen", "wohnung geruch neutralisieren"],
  },
  "angebot-vergleichen": {
    key: "angebot-vergleichen",
    displayName: "Angebotsprüfung",
    category: "offer",
    shortScope: ["Preis", "Leistungsumfang", "Zusatzpositionen", "Fotos"],
    searchIntents: ["angebot prüfen", "angebot vergleichen", "reinigungsangebot prüfen"],
  },
  umzug: {
    key: "umzug",
    displayName: "Umzug",
    category: "moving",
    shortScope: ["Privatumzug", "Seniorenumzug", "Möbeltransport", "Reinigung danach"],
    searchIntents: ["umzug", "umzugsunternehmen", "umzugsangebot prüfen"],
  },
  umzugsservice: {
    key: "umzugsservice",
    displayName: "Umzugsservice",
    category: "moving",
    shortScope: ["Planung", "Tragen", "Transport", "Zusatzleistungen"],
    searchIntents: ["umzugsservice", "umzugsfirma", "umzugshilfe"],
  },
  umzugsunternehmen: {
    key: "umzugsunternehmen",
    displayName: "Umzugsunternehmen",
    category: "moving",
    shortScope: ["Privatumzug", "Möbel", "Transport", "Angebotsprüfung"],
    searchIntents: ["umzugsunternehmen", "umzugsfirma", "umzugsangebot prüfen"],
  },
  "umzug-kosten": {
    key: "umzug-kosten",
    displayName: "Umzugskosten",
    category: "moving",
    shortScope: ["Volumen", "Etage", "Aufzug", "Entfernung", "Zusatzleistungen"],
    searchIntents: ["umzugskosten", "umzugsunternehmen kosten", "umzugsangebot prüfen"],
  },
  seniorenumzug: {
    key: "seniorenumzug",
    displayName: "Seniorenumzug",
    category: "moving",
    shortScope: ["Angehörige", "Packhilfe", "Übergabe", "ruhige Planung"],
    searchIntents: ["seniorenumzug", "umzug für senioren", "seniorenumzug organisieren"],
  },
  entruempelung: {
    key: "entruempelung",
    displayName: "Entrümpelung",
    category: "clearance",
    shortScope: ["Keller", "Wohnung", "Restmengen", "Entsorgung"],
    searchIntents: ["entrümpelung", "räumung", "entsorgung"],
  },
  wohnungsaufloesung: {
    key: "wohnungsaufloesung",
    displayName: "Wohnungsauflösung",
    category: "clearance",
    shortScope: ["Nachlass", "Auszug", "Leerstand", "Reinigung danach"],
    searchIntents: ["wohnungsauflösung", "hausauflösung", "nachlass räumung"],
  },
  "reinigung-nach-umzug": {
    key: "reinigung-nach-umzug",
    displayName: "Reinigung nach Umzug",
    category: "cleaning",
    shortScope: ["Endreinigung", "Übergabe", "Restpunkte", "Schlüsseltermin"],
    searchIntents: ["reinigung nach umzug", "endreinigung", "übergabereinigung"],
  },
} as const satisfies Record<LocalSeoServiceKey, LocalSeoServiceRecord>;
