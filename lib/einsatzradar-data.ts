import { germanizeText } from "@/lib/german-text";

export type EinsatzradarServiceType =
  | "umzug"
  | "reinigung"
  | "entruempelung"
  | "transport"
  | "rueckfahrt"
  | "uebergabeakte"
  | "mieterwechsel"
  | "hausverwaltung"
  | "premium"
  | "duesseldorf_reinigung"
  | "duesseldorf_entsorgung";

export type EinsatzradarRegionZone =
  | "regensburg_core"
  | "direkte_umgebung"
  | "streckenbereich"
  | "bayern_verfuegbarkeit"
  | "duesseldorf_separat";

export type EinsatzradarVisibilityStatus = "draft" | "published" | "archived";

export type EinsatzradarEntry = {
  id: string;
  title: string;
  service_type: EinsatzradarServiceType;
  region_zone: EinsatzradarRegionZone;
  approximate_location: string;
  direction_or_area: string;
  timeframe_label: string;
  description: string;
  included_services: string[];
  signature_services: string[];
  customer_type: string;
  cta_label: string;
  target_url: string;
  is_real_case: boolean;
  is_anonymized: boolean;
  has_customer_permission_for_media: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
  visibility_status: EinsatzradarVisibilityStatus;
};

export type EinsatzradarZone = {
  id: EinsatzradarRegionZone;
  title: string;
  label: string;
  description: string;
  examples: string[];
  services: string[];
};

export type EinsatzradarFilter = {
  id: "all" | EinsatzradarServiceType;
  label: string;
};

const timestamp = "2026-05-06T00:00:00.000Z";

function radarText(value: string) {
  return germanizeText(value).normalize("NFC");
}

function normalizeList(values: string[]) {
  return values.map(radarText);
}

function normalizeFilter(filter: EinsatzradarFilter): EinsatzradarFilter {
  return {
    ...filter,
    label: radarText(filter.label),
  };
}

function normalizeZone(zone: EinsatzradarZone): EinsatzradarZone {
  return {
    ...zone,
    title: radarText(zone.title),
    label: radarText(zone.label),
    description: radarText(zone.description),
    examples: normalizeList(zone.examples),
    services: normalizeList(zone.services),
  };
}

function normalizeEntry(entry: EinsatzradarEntry): EinsatzradarEntry {
  return {
    ...entry,
    title: radarText(entry.title),
    approximate_location: radarText(entry.approximate_location),
    direction_or_area: radarText(entry.direction_or_area),
    timeframe_label: radarText(entry.timeframe_label),
    description: radarText(entry.description),
    included_services: normalizeList(entry.included_services),
    signature_services: normalizeList(entry.signature_services),
    customer_type: radarText(entry.customer_type),
    cta_label: radarText(entry.cta_label),
  };
}

export const einsatzradarFilters: EinsatzradarFilter[] = ([
  { id: "all", label: "Alle" },
  { id: "umzug", label: "Umzug" },
  { id: "reinigung", label: "Reinigung" },
  { id: "entruempelung", label: "Entruempelung" },
  { id: "transport", label: "Transport" },
  { id: "rueckfahrt", label: "Rueckfahrt" },
  { id: "uebergabeakte", label: "Uebergabeakte" },
  { id: "mieterwechsel", label: "Mieterwechsel" },
  { id: "hausverwaltung", label: "Hausverwaltung" },
  { id: "duesseldorf_reinigung", label: "Duesseldorf Reinigung" },
  { id: "duesseldorf_entsorgung", label: "Duesseldorf Entsorgung" },
] satisfies EinsatzradarFilter[]).map(normalizeFilter);

export const einsatzradarRegionZones: EinsatzradarZone[] = ([
  {
    id: "regensburg_core",
    title: "Regensburg Core",
    label: "Operativer Kern",
    description: "Regensburg ist der operative Kern von FLOXANT. Hier sind Umzug, Reinigung, Entruempelung, Transport, Uebergabeakte und Mieterwechsel besonders nah an der Planung.",
    examples: ["Regensburg", "Innenstadt", "Westenviertel", "Kasernenviertel"],
    services: ["Umzug", "Reinigung", "Entruempelung", "Transport", "Uebergabeakte", "Mieterwechsel"],
  },
  {
    id: "direkte_umgebung",
    title: "Direkte Umgebung",
    label: "Nahbereich",
    description: "Die direkte Umgebung ist relevant fuer kurzfristige Anfragen, Endreinigung, Keller, kleinere Transporte und kombinierte Auszugsfaelle.",
    examples: ["Neutraubling", "Lappersdorf", "Pentling", "Sinzing", "Regenstauf", "Obertraubling", "Barbing", "Wenzenbach", "Tegernheim"],
    services: ["Reinigung", "Umzug", "Entruempelung", "Transport", "Objektvorbereitung"],
  },
  {
    id: "streckenbereich",
    title: "Streckenbereich",
    label: "Route pruefen",
    description: "Streckenbereiche sind fuer Transport, Umzug, Rueckfahrt/Leerfahrt und groessere Anfragen nach Verfuegbarkeit interessant.",
    examples: ["Kelheim", "Straubing", "Schwandorf", "Cham", "Amberg", "Deggendorf"],
    services: ["Transport", "Rueckfahrt", "Umzug", "Entruempelung"],
  },
  {
    id: "bayern_verfuegbarkeit",
    title: "Bayern nach Verfuegbarkeit",
    label: "Erweiterte Region",
    description: "Bayern ist keine pauschale Sofortzusage, sondern eine erweiterte Einsatzregion fuer planbare Anfragen und Streckenlogik nach Verfuegbarkeit.",
    examples: ["Muenchen", "Nuernberg", "Ingolstadt", "Landshut", "Passau", "Augsburg"],
    services: ["Umzug", "Transport", "Rueckfahrt", "Premium", "Kombi-Service"],
  },
  {
    id: "duesseldorf_separat",
    title: "Duesseldorf separat",
    label: "Reinigung & Entsorgung",
    description: "Duesseldorf ist bei FLOXANT getrennt fuer Reinigung und Entsorgung positioniert. Es werden keine Duesseldorf-Umzuege als Schwerpunkt beworben.",
    examples: ["Duesseldorf Reinigung", "Duesseldorf Entsorgung"],
    services: ["Wohnungsreinigung", "Endreinigung", "B2B-Reinigung", "Entsorgung"],
  },
] satisfies EinsatzradarZone[]).map(normalizeZone);

export const einsatzradarEntries: EinsatzradarEntry[] = ([
  {
    id: "endreinigung-wohnungsuebergabe-regensburg",
    title: "Endreinigung vor Wohnungsuebergabe",
    service_type: "reinigung",
    region_zone: "regensburg_core",
    approximate_location: "Raum Regensburg",
    direction_or_area: "Regensburg Core",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Uebergabetermin steht an, Reinigung ist noch offen und Fotos koennen bei der Einschaetzung helfen.",
    included_services: ["Endreinigung", "Wohnungsuebergabe-Vorbereitung", "Fotoeinschaetzung"],
    signature_services: ["Uebergabeakte", "Plan gekippt", "Angebotscheck"],
    customer_type: "Privatkunden, Vermieter, Hausverwaltungen",
    cta_label: "Endreinigung anfragen",
    target_url: "/reinigung-regensburg",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "kellerentruempelung-umgebung-regensburg",
    title: "Kellerentruempelung mit Fotoeinschaetzung",
    service_type: "entruempelung",
    region_zone: "direkte_umgebung",
    approximate_location: "Umgebung Regensburg",
    direction_or_area: "Nahbereich",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Keller oder Nebenraeume sind voll; Umfang, Zugang, Etage und Entsorgung muessen vorab eingeordnet werden.",
    included_services: ["Entruempelung", "Entsorgung", "Reinigung optional"],
    signature_services: ["Keller-/Muellraum-Rettung", "Wohnung wieder vermietbar", "Uebergabeakte"],
    customer_type: "Privatkunden, Vermieter, WEG",
    cta_label: "Keller mit Fotos anfragen",
    target_url: "/entruempelung-regensburg",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "umzug-endreinigung-nahbereich",
    title: "Umzug plus Endreinigung",
    service_type: "umzug",
    region_zone: "direkte_umgebung",
    approximate_location: "Regensburg und Nahbereich",
    direction_or_area: "Direkte Umgebung",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Auszug, Transport, Reinigung und Schluesselthemen muessen zeitlich zusammenpassen.",
    included_services: ["Umzug", "Endreinigung", "Schluesseluebergabe optional"],
    signature_services: ["Uebergabeakte", "Schadensbegrenzung", "Premium/Diskret"],
    customer_type: "Privatkunden, Familien, Vermieter",
    cta_label: "Auszugspaket anfragen",
    target_url: "/umzug-regensburg",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "moebeltransport-straubing-rueckfahrt",
    title: "Moebeltransport Richtung Straubing",
    service_type: "transport",
    region_zone: "streckenbereich",
    approximate_location: "Richtung Straubing",
    direction_or_area: "Streckenbereich",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Einzelmoebel oder Teilmengen brauchen Strecke, Datum, Umfang und Pruefung auf Rueckfahrt/Leerfahrt.",
    included_services: ["Transport", "Moebeltransport", "Rueckfahrt/Leerfahrt pruefen"],
    signature_services: ["Rueckfahrt-Boerse", "Budgetpruefung"],
    customer_type: "Privatkunden, kleine Firmen",
    cta_label: "Strecke pruefen lassen",
    target_url: "/rueckfahrt-boerse",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "mieterwechsel-regensburg-akte",
    title: "Mieterwechsel mit Uebergabeakte",
    service_type: "mieterwechsel",
    region_zone: "regensburg_core",
    approximate_location: "Raum Regensburg",
    direction_or_area: "Regensburg Core",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Nach Auszug sollen Raeumung, Reinigung, Schluesselstatus und offene Hinweise strukturiert werden.",
    included_services: ["Raeumung", "Reinigung", "Uebergabeakte"],
    signature_services: ["Mieterwechsel-Service", "Wohnung wieder vermietbar", "Makler-/Vermieter-Link"],
    customer_type: "Hausverwaltungen, Vermieter, Makler",
    cta_label: "Mieterwechsel-Service anfragen",
    target_url: "/mieterwechsel-service-regensburg",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "muellraum-keller-hausverwaltung",
    title: "Muellraum-/Keller-Rettung fuer Hausverwaltung",
    service_type: "hausverwaltung",
    region_zone: "regensburg_core",
    approximate_location: "Hausverwaltung / Raum Regensburg",
    direction_or_area: "Regensburg Core",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Gemeinschaftsflaechen, Keller oder Muellraum sind blockiert; Freigabe, Fotos und Zugang muessen geklaert sein.",
    included_services: ["Raeumung", "Entsorgung", "Fotoeinschaetzung", "Reinigung optional"],
    signature_services: ["Keller-/Muellraum-Rettung", "Mieterwechsel", "Uebergabeakte"],
    customer_type: "Hausverwaltungen, WEG, Vermieter",
    cta_label: "Objektflaeche pruefen lassen",
    target_url: "/keller-muellraum-rettung-regensburg",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "premium-diskret-bayern",
    title: "Premium-/Diskret-Service mit Rueckruf",
    service_type: "premium",
    region_zone: "bayern_verfuegbarkeit",
    approximate_location: "Regensburg / Bayern nach Absprache",
    direction_or_area: "Erweiterte Einsatzregion",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Sensible Objekt- oder Auszugssituation braucht Rueckruf, Planung, Reinigung, Uebergabe und klare Abstimmung.",
    included_services: ["Rueckruf", "Planung", "Reinigung", "Uebergabe"],
    signature_services: ["Premium/Diskret", "Uebergabeakte", "Angebotscheck"],
    customer_type: "Premium-Kunden, Eigentuemer, Familien",
    cta_label: "Premium-Anfrage starten",
    target_url: "/private-client-service",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "duesseldorf-reinigung-objekt",
    title: "Duesseldorf Reinigung fuer Wohnung oder Objekt",
    service_type: "duesseldorf_reinigung",
    region_zone: "duesseldorf_separat",
    approximate_location: "Duesseldorf Reinigung",
    direction_or_area: "Duesseldorf separat",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Wohnungsreinigung, Endreinigung oder B2B-Reinigung wird in Duesseldorf getrennt vom Regensburger Umzugsmarkt geprueft.",
    included_services: ["Wohnungsreinigung", "Endreinigung", "B2B-Reinigung"],
    signature_services: ["Apartment-Reset", "Fotoeinschaetzung"],
    customer_type: "Vermieter, Hosts, Unternehmen",
    cta_label: "Reinigung Duesseldorf anfragen",
    target_url: "/duesseldorf/reinigung",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
  {
    id: "duesseldorf-entsorgung-foto",
    title: "Duesseldorf Entsorgung mit Fotos",
    service_type: "duesseldorf_entsorgung",
    region_zone: "duesseldorf_separat",
    approximate_location: "Duesseldorf Entsorgung",
    direction_or_area: "Duesseldorf separat",
    timeframe_label: "Typische Einsatzart, keine Live-Daten",
    description: "Moebel, Sperrmuell oder Gegenstaende sollen mit Fotos grob eingeschaetzt und als Entsorgungsanfrage geprueft werden.",
    included_services: ["Moebelentsorgung", "Sperrmuell", "Fotoeinschaetzung"],
    signature_services: ["Entsorgung Duesseldorf", "Budgetpruefung"],
    customer_type: "Privatkunden, Vermieter, Gewerbe",
    cta_label: "Entsorgung Duesseldorf anfragen",
    target_url: "/entsorgung-duesseldorf",
    is_real_case: false,
    is_anonymized: true,
    has_customer_permission_for_media: false,
    created_at: timestamp,
    updated_at: timestamp,
    visibility_status: "published",
  },
] satisfies EinsatzradarEntry[]).map(normalizeEntry);

export const einsatzradarFaq = [
  {
    q: "Was ist der FLOXANT Einsatzradar?",
    a: "Der Einsatzradar zeigt typische Einsatzarten und grobe Servicezonen, die FLOXANT im Raum Regensburg und getrennt fuer Duesseldorf Reinigung/Entsorgung prueft.",
  },
  {
    q: "Sind das echte Einsaetze?",
    a: "Aktuell zeigt der Einsatzradar typische Einsatzarten, keine Live-Daten. Echte Einsaetze duerfen nur anonymisiert und mit Freigabe veroeffentlicht werden.",
  },
  {
    q: "Warum werden keine Adressen gezeigt?",
    a: "FLOXANT veroeffentlicht keine Kundennamen, Telefonnummern, E-Mails, exakten Adressen oder identifizierbaren Details. Es werden nur grobe Regionen wie Raum Regensburg oder Richtung Straubing genutzt.",
  },
  {
    q: "Welche Regionen deckt FLOXANT ab?",
    a: "Regensburg ist der operative Kern. Die direkte Umgebung und Streckenbereiche werden nach Ort, Termin, Umfang und Kapazitaet geprueft. Bayern ist nach Verfuegbarkeit moeglich.",
  },
  {
    q: "Was bedeutet Duesseldorf separat?",
    a: "Duesseldorf ist bei FLOXANT fuer Reinigung und Entsorgung positioniert, nicht fuer Umzug. Deshalb erscheinen dort nur passende Reinigungs- und Entsorgungsbeispiele.",
  },
  {
    q: "Kann ich meinen Fall mit Fotos senden?",
    a: "Ja. Fotos helfen bei der Einschaetzung von Umfang, Zugang, Zustand und passenden Zusatzservices. Fotos werden nicht oeffentlich genutzt, ausser es gibt eine ausdrueckliche Freigabe.",
  },
  {
    q: "Kann mein Auftrag spaeter im Einsatzradar erscheinen?",
    a: "Nur nach Zustimmung, anonymisiert, ohne personenbezogene Daten und ohne exakte Adresse. Ohne Freigabe bleibt der Auftrag intern.",
  },
].map((item) => ({
  q: radarText(item.q),
  a: radarText(item.a),
}));

export function getPublishedEinsatzradarEntries() {
  return einsatzradarEntries.filter((entry) => entry.visibility_status === "published");
}
