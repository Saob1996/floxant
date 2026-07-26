import type { FloxantLocationKey } from "@/lib/floxant-locations";

export type ServiceCategory =
  | "reinigung"
  | "umzug_transport"
  | "entruempelung_aufloesung"
  | "angebot_pruefen"
  | "signature_service";

export type ServicePriority = "P0" | "P1" | "P2" | "P3";
export type ServiceAvailability =
  | "available"
  | "limited"
  | "not_offered"
  | "needs_manual_confirmation";

export type ServiceInventoryItem = {
  serviceKey: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  customerProblem: string;
  suitableFor: readonly string[];
  notSuitableFor: readonly string[];
  requiredInfo: readonly string[];
  optionalInfo: readonly string[];
  effortFactors: readonly string[];
  primaryCTA: string;
  contactParams: {
    service: string;
    intent: string;
    source: "seo";
  };
  relatedServices: readonly string[];
  relatedSignatureServices: readonly string[];
  dusseldorfAvailability: ServiceAvailability;
  regensburgAvailability: ServiceAvailability;
  hasPage: boolean;
  recommendedRoute: string;
  canonicalRoute: string;
  priority: ServicePriority;
  seoIntent: string;
  shortKeywords: readonly string[];
  longTailKeywords: readonly string[];
  faqCandidates: readonly string[];
  blogCandidates: readonly string[];
};

type ServiceSeed = Omit<
  ServiceInventoryItem,
  | "notSuitableFor"
  | "requiredInfo"
  | "optionalInfo"
  | "effortFactors"
  | "primaryCTA"
  | "contactParams"
  | "relatedSignatureServices"
  | "hasPage"
  | "canonicalRoute"
  | "priority"
  | "shortKeywords"
  | "longTailKeywords"
  | "faqCandidates"
  | "blogCandidates"
> &
  Partial<
    Pick<
      ServiceInventoryItem,
      | "notSuitableFor"
      | "requiredInfo"
      | "optionalInfo"
      | "effortFactors"
      | "primaryCTA"
      | "contactParams"
      | "relatedSignatureServices"
      | "hasPage"
      | "canonicalRoute"
      | "priority"
      | "shortKeywords"
      | "longTailKeywords"
      | "faqCandidates"
      | "blogCandidates"
    >
  >;

const defaultRequiredInfo = [
  "Ort oder PLZ",
  "kurze Beschreibung",
  "Termin oder Zeitraum",
  "Fotos, falls vorhanden",
  "Kontaktweg",
] as const;

const defaultOptionalInfo = [
  "Budget oder Preisrahmen",
  "vorhandenes Angebot",
  "Zugang, Etage, Aufzug oder Parken",
  "besondere Fristen",
] as const;

const defaultEffortFactors = [
  "Umfang",
  "Zugang",
  "Zeitfenster",
  "Zustand",
  "Fotos und Rückfragen",
] as const;

function contactHref(service: string, city?: FloxantLocationKey) {
  const params = new URLSearchParams({
    service,
    intent: city ? `${service}-${city}` : service,
    source: "seo",
  });

  if (city) params.set("city", city);
  return `/kontakt?${params.toString()}`;
}

function buildService(seed: ServiceSeed): ServiceInventoryItem {
  const service = seed.contactParams?.service || seed.serviceKey;
  const intent = seed.contactParams?.intent || seed.serviceKey;

  return {
    ...seed,
    notSuitableFor:
      seed.notSuitableFor ||
      [
        "Preisgarantie ohne Angaben",
        "Sofortzusage ohne Termin- und Kapazitaetspruefung",
        "rechtliche Bewertung",
      ],
    requiredInfo: seed.requiredInfo || defaultRequiredInfo,
    optionalInfo: seed.optionalInfo || defaultOptionalInfo,
    effortFactors: seed.effortFactors || defaultEffortFactors,
    primaryCTA: seed.primaryCTA || contactHref(service),
    contactParams: seed.contactParams || { service, intent, source: "seo" },
    relatedSignatureServices:
      seed.relatedSignatureServices ||
      ["floxant-angebotscheck", "floxant-objektbrief", "floxant-plan-b-service"],
    hasPage: seed.hasPage ?? true,
    canonicalRoute: seed.canonicalRoute || seed.recommendedRoute,
    priority: seed.priority || "P2",
    shortKeywords: seed.shortKeywords || [seed.name],
    longTailKeywords:
      seed.longTailKeywords ||
      [`${seed.name} Angebot pruefen`, `${seed.name} mit Fotos anfragen`],
    faqCandidates:
      seed.faqCandidates ||
      [
        `Welche Angaben braucht FLOXANT fuer ${seed.name}?`,
        `Wann ist ${seed.name} sinnvoll?`,
        `Kann ein vorhandenes Angebot geprueft werden?`,
      ],
    blogCandidates:
      seed.blogCandidates ||
      [`${seed.name}: Aufwand und Angebot richtig verstehen`],
  };
}

export const serviceInventory: readonly ServiceInventoryItem[] = [
  buildService({
    serviceKey: "reinigung",
    name: "Reinigung",
    category: "reinigung",
    shortDescription: "Allgemeine Reinigung für Wohnung, Objekt, Auszug, Büro oder Übergabe.",
    customerProblem: "Kunden wissen oft nicht, ob normale Reinigung, Grundreinigung oder Spezialreinigung passt.",
    suitableFor: ["Wohnung", "Büro", "Auszug", "Übergabe", "Objekt nach Fotos"],
    relatedServices: ["grundreinigung", "endreinigung", "bueroreinigung", "spezialreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/reinigung",
    priority: "P0",
    seoIntent: "lokale Reinigungsanfrage und Serviceauswahl",
    shortKeywords: ["Reinigung", "Reinigungsfirma"],
    longTailKeywords: ["Reinigung mit Fotos anfragen", "Reinigungsangebot prüfen lassen"],
    blogCandidates: ["Reinigung: Aufwand und Zielzustand richtig beschreiben"],
  }),
  buildService({
    serviceKey: "bueroreinigung",
    name: "Bueroreinigung",
    category: "reinigung",
    shortDescription: "Büros, Kanzleien, Agenturen und kleine Gewerbeflächen mit Raumliste und Turnus.",
    customerProblem: "Turnus, Fläche, Randzeiten und Zusatzpositionen sind in Angeboten oft schwer vergleichbar.",
    suitableFor: ["Büro", "Kanzlei", "Agentur", "Praxisnahe Nebenflächen", "kleine Gewerbeflächen"],
    requiredInfo: ["Ort", "Fläche", "Raumliste", "Turnus", "Zeitfenster", "Zugang"],
    effortFactors: ["Fläche", "Arbeitsplätze", "Sanitär", "Küche", "Turnus", "Schlüsselweg"],
    relatedServices: ["gewerbereinigung", "unterhaltsreinigung", "praxisreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/bueroreinigung",
    canonicalRoute: "/regensburg/bueroreinigung",
    priority: "P0",
    seoIntent: "Büroreinigung lokal anfragen oder Angebot prüfen",
    shortKeywords: ["Büroreinigung", "Büro reinigen"],
    longTailKeywords: ["Büroreinigung Angebot prüfen", "Büroreinigung Turnus und Fläche klären"],
  }),
  buildService({
    serviceKey: "gewerbereinigung",
    name: "Gewerbereinigung",
    category: "reinigung",
    shortDescription: "Gewerbe, Laden, Praxis, Büro, Hotel oder gemischte Flächen nach Nutzung und Zeitfenster.",
    customerProblem: "Gewerbliche Flächen brauchen klare Raumliste, Nutzung und Verantwortlichkeiten.",
    suitableFor: ["Gewerbeflächen", "kleine Firmen", "Ladenflaechen", "Praxis", "Hotelbereiche"],
    relatedServices: ["bueroreinigung", "praxisreinigung", "hotelreinigung", "unterhaltsreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/gewerbereinigung",
    canonicalRoute: "/regensburg/gewerbereinigung",
    priority: "P0",
    seoIntent: "gewerbliche Reinigung mit Objektangaben anfragen",
    shortKeywords: ["Gewerbereinigung", "Firmenreinigung"],
  }),
  buildService({
    serviceKey: "praxisreinigung",
    name: "Praxisreinigung",
    category: "reinigung",
    shortDescription: "Allgemeine Praxisflächen nach Raumliste, Öffnungszeiten und klaren Grenzen.",
    customerProblem: "Praxisreinigung darf nicht als medizinische Spezialdesinfektion missverstanden werden.",
    suitableFor: ["Empfang", "Wartebereich", "Nebenraeume", "Sanitär", "Praxis-Büro"],
    notSuitableFor: ["OP-Reinigung", "Labor-Spezialdesinfektion", "medizinische Zertifikatsversprechen"],
    relatedServices: ["bueroreinigung", "gewerbereinigung", "unterhaltsreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/praxisreinigung-regensburg",
    canonicalRoute: "/praxisreinigung-regensburg",
    priority: "P1",
    seoIntent: "Praxisreinigung mit Grenzen und Zeitfenster klären",
  }),
  buildService({
    serviceKey: "fensterreinigung",
    name: "Fensterreinigung",
    category: "reinigung",
    shortDescription: "Fenster, Glasflächen, Rahmen und Schaufenster nach Zugang, Höhe und Fotos.",
    customerProblem: "Anzahl, Innen-/Außenseite, Etage und Zugang fehlen in vielen Anfragen.",
    suitableFor: ["Fenster", "Glasflächen", "Schaufenster", "Rahmen", "Wintergarten nach Prüfung"],
    notSuitableFor: ["Seiltechnik ohne Prüfung", "Fassadenkletterei ohne Prüfung"],
    effortFactors: ["Anzahl", "Höhe", "Innen- oder Außenseite", "Zugang", "Verschmutzung"],
    relatedServices: ["glasreinigung", "fassadenreinigung", "spezialreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/fensterreinigung-regensburg",
    canonicalRoute: "/fensterreinigung-regensburg",
    priority: "P1",
    seoIntent: "Fensterreinigung lokal mit Aufwandstreibern anfragen",
  }),
  buildService({
    serviceKey: "glasreinigung",
    name: "Glasreinigung",
    category: "reinigung",
    shortDescription: "Glas, Rahmen und Schaufenster mit Material, Höhe und Zugang vorpruefen.",
    customerProblem: "Glasflächen werden oft ohne Höhe, Seite oder Material beschrieben.",
    suitableFor: ["Glasflächen", "Schaufenster", "Rahmen", "erreichbare Glasbereiche"],
    relatedServices: ["fensterreinigung", "fassadenreinigung", "spezialreinigung"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "needs_manual_confirmation",
    recommendedRoute: "/spezialreinigung",
    priority: "P2",
    seoIntent: "Spezialreinigung Glas mit Zugang und Fotos klären",
  }),
  buildService({
    serviceKey: "grundreinigung",
    name: "Grundreinigung",
    category: "reinigung",
    shortDescription: "Staerkere Verschmutzung, Leerstand, Auszug oder Objektflaeche nach Zustand einordnen.",
    customerProblem: "Normale Unterhaltsreinigung reicht nicht, aber Umfang und Zielzustand sind unklar.",
    suitableFor: ["Leerstand", "Auszug", "starke Nutzung", "Boden- und Nebenflächen", "Objekte"],
    relatedServices: ["endreinigung", "sonderreinigung", "reinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/grundreinigung-regensburg",
    canonicalRoute: "/grundreinigung-regensburg",
    priority: "P1",
    seoIntent: "Grundreinigung nach Zustand und Zielzustand anfragen",
  }),
  buildService({
    serviceKey: "endreinigung",
    name: "Endreinigung",
    category: "reinigung",
    shortDescription: "Reinigung nach Auszug, Umzug oder Räumung vor Rückgabe oder Nachnutzung.",
    customerProblem: "Übergabeziel, Restmengen und Reinigung werden zu spaet zusammen gedacht.",
    suitableFor: ["Auszug", "Umzug", "nach Entrümpelung", "Besichtigung", "Übergabe"],
    notSuitableFor: ["Abnahmegarantie", "Kautionsgarantie", "rechtliche Bewertung des Mietvertrags"],
    relatedServices: ["uebergabereinigung", "reinigung-nach-entruempelung", "umzug-mit-reinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/endreinigung",
    priority: "P1",
    seoIntent: "Endreinigung mit Übergabeziel und Fotos klären",
  }),
  buildService({
    serviceKey: "bauendreinigung",
    name: "Bauendreinigung",
    category: "reinigung",
    shortDescription: "Baustaub, Handwerkerreste und Übergabeziel nach Renovierung oder Umbau prüfen.",
    customerProblem: "Baustaub und Restarbeiten werden haeufig mit Sanierung oder Maengelhaftung vermischt.",
    suitableFor: ["Renovierung", "Umbau", "Baufeinreinigung light", "Übergabe nach Handwerkern"],
    notSuitableFor: ["Sanierung", "Baumaengelhaftung", "Gefahrstoffe", "Asbest"],
    relatedServices: ["reinigung-nach-renovierung", "grundreinigung", "spezialreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/baureinigung-regensburg",
    priority: "P1",
    seoIntent: "Baureinigung nach Fotos, Zugang und Übergabeziel anfragen",
  }),
  buildService({
    serviceKey: "solarreinigung",
    name: "Solarreinigung",
    category: "reinigung",
    shortDescription: "PV- oder Solarmodule nach Verschmutzung, Dachzugang, Wasser und Sicherheit vorpruefen.",
    customerProblem: "Kunden erwarten oft Ertragsversprechen, obwohl zuerst Sicherheit und Zugang zählen.",
    suitableFor: ["PV-Module", "sichtbare Verschmutzung", "Dachzugang nach Prüfung"],
    notSuitableFor: ["Ertragsgarantie", "Elektroarbeiten", "Dacharbeiten", "Reparaturen"],
    requiredInfo: ["Ort", "Fotos", "Modulfläche", "Dachzugang", "Wasseranschluss", "Sicherheitslage"],
    relatedServices: ["pv-anlagen-reinigung", "floxant-pv-sichtklar-service", "spezialreinigung"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "needs_manual_confirmation",
    recommendedRoute: "/spezialreinigung",
    priority: "P1",
    seoIntent: "Solarreinigung realistisch und ohne Ertragsgarantie prüfen",
  }),
  buildService({
    serviceKey: "umzug",
    name: "Umzug",
    category: "umzug_transport",
    shortDescription: "Privat- und Objektumzug mit Start, Ziel, Volumen, Zugang, Termin und Zusatzleistungen.",
    customerProblem: "Umzugspreise sind ohne Volumen, Laufwege und Zusatzleistungen nicht vergleichbar.",
    suitableFor: ["Wohnungswechsel", "kleine Objektumzuege", "Umzug mit Reinigung", "Transport mit Planung"],
    requiredInfo: ["Start", "Ziel", "Etage", "Aufzug", "Volumen", "Termin", "Fotos"],
    effortFactors: ["Volumen", "Etage", "Laufweg", "Parken", "Demontage", "Entfernung", "Termin"],
    relatedServices: ["moebeltransport", "mini-umzug", "seniorenumzug", "umzug-mit-reinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/umzug",
    priority: "P0",
    seoIntent: "lokalen Umzug anfragen oder Umzugsangebot prüfen",
  }),
  buildService({
    serviceKey: "mini-umzug",
    name: "Mini-Umzug",
    category: "umzug_transport",
    shortDescription: "Kleiner Umzug mit wenigen Möbeln, Zimmer oder Apartment nach Volumen und Laufweg.",
    customerProblem: "Kleine Umzüge wirken einfach, werden aber durch Etage, Parken und Zeitfenster aufwendig.",
    suitableFor: ["WG-Zimmer", "kleines Apartment", "wenige Möbel", "kurzer Umzug"],
    relatedServices: ["moebeltransport", "kleintransport", "beiladung"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/spezialumzug",
    priority: "P2",
    seoIntent: "Mini-Umzug nach Volumen und Zugang klären",
  }),
  buildService({
    serviceKey: "express-umzug",
    name: "Express-Umzug",
    category: "umzug_transport",
    shortDescription: "Dringender Umzug ohne Sofortgarantie, mit Machbarkeitspruefung nach Umfang und Termin.",
    customerProblem: "Zeitdruck führt oft zu falschen Sofortversprechen.",
    suitableFor: ["kurzfristige Termine", "Anbieter-Ausfall", "Deadline vor Übergabe"],
    notSuitableFor: ["24/7-Sofortgarantie", "Zusage ohne Umfang", "Preisgarantie"],
    relatedServices: ["plan-b-service", "umzug", "uebergabe-sprint"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/spezialumzug",
    priority: "P2",
    seoIntent: "dringenden Umzug realistisch prüfen",
  }),
  buildService({
    serviceKey: "seniorenumzug",
    name: "Seniorenumzug",
    category: "umzug_transport",
    shortDescription: "Umzug im Alter mit Angehörigen, Fristen, Sortierung und ruhiger Abstimmung.",
    customerProblem: "Neben Transport sind Auswahl, Kommunikation, Tempo und Übergabe wichtig.",
    suitableFor: ["Umzug im Alter", "Angehörige", "Pflegeheimwechsel", "Verkleinerung"],
    relatedServices: ["umzug", "haushaltsaufloesung", "diskret-service"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/seniorenumzug",
    priority: "P1",
    seoIntent: "Seniorenumzug mit ruhiger Vorbereitung",
  }),
  buildService({
    serviceKey: "moebeltransport",
    name: "Moebeltransport",
    category: "umzug_transport",
    shortDescription: "Einzelstuecke, Abholung oder Kleintransport nach Masse, Gewicht und Strecke.",
    customerProblem: "Einzeltransporte brauchen genaue Masse, Gewicht, Etage und Schutz.",
    suitableFor: ["Einzelmoebel", "Abholung", "Kleintransport", "Zwischenroute"],
    relatedServices: ["kleintransport", "beiladung", "rueckfahrt"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/spezialumzug",
    priority: "P2",
    seoIntent: "Möbeltransport mit Masse und Strecke klären",
  }),
  buildService({
    serviceKey: "klaviertransport",
    name: "Klaviertransport",
    category: "umzug_transport",
    shortDescription: "Klaviertransport nach Gewicht, Treppen, Strecke, Schutz und Teamverfuegbarkeit prüfen.",
    customerProblem: "Klaviere brauchen mehr Angaben als normale Möbeltransporte.",
    suitableFor: ["Klavier", "E-Piano nach Prüfung", "kurze oder regionale Strecke"],
    notSuitableFor: ["Blindzusage ohne Fotos", "Spezialkran ohne Prüfung"],
    requiredInfo: ["Instrumenttyp", "Masse", "Gewicht falls bekannt", "Etagen", "Fotos", "Start und Ziel"],
    relatedServices: ["moebeltransport", "umzug", "rueckfahrt-radar"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/klaviertransport-regensburg",
    priority: "P1",
    seoIntent: "Klaviertransport Regensburg mit Zugang und Fotos anfragen",
  }),
  buildService({
    serviceKey: "beiladung-rueckfahrt",
    name: "Beiladung und Rueckfahrt",
    category: "umzug_transport",
    shortDescription: "Flexible Transportstrecken, Rückfahrt oder Beiladung nach Route, Volumen und Zeitfenster.",
    customerProblem: "Beiladung passt nur, wenn Strecke, Termin und Volumen flexibel genug sind.",
    suitableFor: ["kleines Volumen", "flexible Termine", "Rückroute", "Einzelmoebel"],
    relatedServices: ["rueckfahrt-radar", "moebeltransport", "kleintransport"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/rueckfahrt-boerse",
    priority: "P2",
    seoIntent: "Beiladung oder Rückfahrt sachlich prüfen",
  }),
  buildService({
    serviceKey: "entruempelung",
    name: "Entruempelung",
    category: "entruempelung_aufloesung",
    shortDescription: "Wohnung, Keller, Garage oder Objekt nach Menge, Zugang, Freigabe und Entsorgung prüfen.",
    customerProblem: "Menge, Materialmix, Entsorgung und Reinigung danach sind oft unklar.",
    suitableFor: ["Wohnung", "Keller", "Garage", "Nebenraum", "Objektflaeche"],
    requiredInfo: ["Ort", "Fotos", "Menge", "Räume", "Zugang", "Freigabe"],
    effortFactors: ["Menge", "Material", "Etage", "Laufweg", "Entsorgung", "Restreinigung"],
    relatedServices: ["haushaltsaufloesung", "wohnungsaufloesung", "kellerentruempelung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/entruempelung",
    priority: "P0",
    seoIntent: "Entrümpelung lokal mit Fotos anfragen oder Angebot prüfen",
  }),
  buildService({
    serviceKey: "kellerentruempelung",
    name: "Kellerentruempelung",
    category: "entruempelung_aufloesung",
    shortDescription: "Keller, Nebenraum oder Müllraum nach Fotos, Menge, Feuchtigkeit und Zugang klären.",
    customerProblem: "Keller wirken klein, enthalten aber oft schwer kalkulierbare Mengen und Laufwege.",
    suitableFor: ["Keller", "Nebenraum", "Müllraum", "Abstellflaeche"],
    relatedServices: ["entruempelung", "keller-muellraum-rettung", "spezial-entruempelung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/keller-muellraum-rettung-regensburg",
    priority: "P2",
    seoIntent: "Keller und Nebenflächen nach Fotos klären",
  }),
  buildService({
    serviceKey: "haushaltsaufloesung",
    name: "Haushaltsaufloesung",
    category: "entruempelung_aufloesung",
    shortDescription: "Haushalt, Haus oder Wohnung nach Auszug, Erbfall oder Veraenderung ruhig klären.",
    customerProblem: "Freigaben, Nachlass, Räumung, Entsorgung und Reinigung müssen respektvoll getrennt werden.",
    suitableFor: ["Nachlass", "Auszug", "Pflegeheimwechsel", "Haus oder Wohnung", "Übergabevorbereitung"],
    notSuitableFor: ["Rechtsberatung", "Wertgutachten", "Nachlassbewertung"],
    relatedServices: ["wohnungsaufloesung", "nachlassaufloesung", "diskret-service"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/haushaltsaufloesung",
    priority: "P1",
    seoIntent: "Haushaltsauflösung respektvoll und mit konkreten Eckdaten anfragen",
  }),
  buildService({
    serviceKey: "wohnungsaufloesung",
    name: "Wohnungsaufloesung",
    category: "entruempelung_aufloesung",
    shortDescription: "Wohnung nach Auszug, Nachlass oder Leerstand mit Räumung, Entsorgung und Reinigung klären.",
    customerProblem: "Wohnungsauflösung braucht Freigabe, Fotos, Zielzustand und oft eine Reinigung danach.",
    suitableFor: ["Nachlasswohnung", "Leerstand", "Auszug", "Pflegeheimwechsel", "Übergabe"],
    relatedServices: ["haushaltsaufloesung", "entruempelung", "endreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/wohnungsaufloesung",
    priority: "P1",
    seoIntent: "Wohnungsauflösung mit Zielzustand und Freigabe klären",
  }),
  buildService({
    serviceKey: "nachlassaufloesung",
    name: "Nachlassaufloesung",
    category: "entruempelung_aufloesung",
    shortDescription: "Nachlass, Wohnung oder Haus respektvoll mit Freigabe, Fotos und Grenzen klären.",
    customerProblem: "Emotionale Lage und Berechtigung müssen sauber berücksichtigt werden.",
    suitableFor: ["Nachlass", "Erben", "Angehörige", "Wohnung oder Haus"],
    notSuitableFor: ["Rechtsberatung", "Wertgutachten", "Erbberatung"],
    relatedServices: ["haushaltsaufloesung", "wohnungsaufloesung", "diskret-service"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/nachlass-raeumung-regensburg",
    priority: "P2",
    seoIntent: "Nachlassraeumung respektvoll vorbereiten",
  }),
  buildService({
    serviceKey: "angebot-pruefen",
    name: "Angebot pruefen",
    category: "angebot_pruefen",
    shortDescription: "Vorhandenes Angebot nach Umfang, Fotos, Zusatzpositionen, Termin und Annahmen einordnen.",
    customerProblem: "Kunden sehen Endpreise, aber nicht, ob Leistung, Risiko und Zusatzpositionen vergleichbar sind.",
    suitableFor: ["Reinigungsangebot", "Umzugsangebot", "Entrümpelungsangebot", "Gewerbereinigung", "Solarreinigung"],
    notSuitableFor: ["Preisgarantie", "Unterbietungszusage", "Abwertung anderer Anbieter"],
    requiredInfo: ["Angebot oder Screenshot", "Ort", "Leistung", "Umfang", "Termin", "Fotos falls vorhanden"],
    relatedServices: ["anbieter-vergleichen", "fairpreis-check", "plan-b-service"],
    relatedSignatureServices: ["floxant-angebotscheck", "floxant-fairpreis-check", "floxant-entscheidungs-kompass"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/angebot-guenstiger-pruefen",
    priority: "P0",
    seoIntent: "vorhandenes Angebot sachlich prüfen lassen",
    shortKeywords: ["Angebot prüfen", "Angebotscheck"],
    longTailKeywords: ["Reinigungsangebot prüfen", "Umzugsangebot prüfen", "Entrümpelungsangebot prüfen"],
  }),
  buildService({
    serviceKey: "anbieter-vergleichen",
    name: "Anbieter vergleichen",
    category: "angebot_pruefen",
    shortDescription: "Anbieter nach Leistung, Risiko, Kommunikation, Termin und Zusatzpositionen vergleichen.",
    customerProblem: "Portal-Rankings und Billigpreise zeigen nicht, ob der Auftrag wirklich passt.",
    suitableFor: ["mehrere Angebote", "unklare Anbieterwahl", "Preis-Leistungs-Vergleich"],
    notSuitableFor: ["Ranking-Garantie", "Google-Maps-Ranking-Versprechen"],
    relatedServices: ["angebot-pruefen", "fairpreis-check", "plan-b-service"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/anbieter-vergleichen",
    priority: "P1",
    seoIntent: "Anbieter sachlich vergleichen statt Portalranking vertrauen",
  }),
  buildService({
    serviceKey: "floxant-angebotscheck",
    name: "FLOXANT Angebotscheck",
    category: "signature_service",
    shortDescription: "Prüft Angebotsumfang, Lücken, Zusatzpositionen und realistische Grenzen.",
    customerProblem: "Ein Angebot wirkt gut oder teuer, aber die Annahmen sind nicht transparent.",
    suitableFor: ["Angebot liegt vor", "Unsicherheit vor Zusage", "zweite Einordnung"],
    relatedServices: ["angebot-pruefen", "anbieter-vergleichen", "fairpreis-check"],
    relatedSignatureServices: ["floxant-fairpreis-check", "floxant-entscheidungs-kompass"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/angebotscheck",
    priority: "P0",
    seoIntent: "FLOXANT Angebotscheck als zweite Einordnung",
  }),
  buildService({
    serviceKey: "floxant-fairpreis-check",
    name: "FLOXANT Fairpreis-Check",
    category: "signature_service",
    shortDescription: "Prüft Leistungsumfang, mögliche Zusatzkosten und fehlende Positionen ohne Preisgarantie.",
    customerProblem: "Kunden brauchen eine faire Einordnung, nicht nur einen niedrigeren Preis.",
    suitableFor: ["Preis wirkt hoch", "Leistung unklar", "Budget und Umfang passen nicht zusammen"],
    notSuitableFor: ["Unterbietungsgarantie", "verbindliche Marktpreisbewertung"],
    relatedServices: ["angebot-pruefen", "anbieter-vergleichen"],
    relatedSignatureServices: ["floxant-angebotscheck", "floxant-entscheidungs-kompass"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/fairpreis-check",
    canonicalRoute: "/fairpreis-check",
    priority: "P0",
    seoIntent: "Fairpreis sachlich prüfen lassen",
  }),
  buildService({
    serviceKey: "floxant-objektbrief",
    name: "FLOXANT Objektbrief",
    category: "signature_service",
    shortDescription: "Sammelt Objektart, Fotos, Zugang, Zielzustand, Termin und offene Punkte.",
    customerProblem: "Die Anfrage ist schwer beschreibbar und braucht Struktur.",
    suitableFor: ["unklares Objekt", "Fotos vorhanden", "mehrere Leistungen", "Übergabeziel"],
    relatedServices: ["reinigung", "entruempelung", "umzug"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/objektbrief",
    priority: "P0",
    seoIntent: "Objektbrief für klare Serviceanfrage",
  }),
  buildService({
    serviceKey: "floxant-uebergabeakte",
    name: "FLOXANT Uebergabeakte",
    category: "signature_service",
    shortDescription: "Buendelt Fotos, Restpunkte, Schlüsselstatus und sichtbare Übergabehinweise.",
    customerProblem: "Kurz vor Übergabe fehlen Uebersicht, Fotos und Prioritäten.",
    suitableFor: ["Wohnungsuebergabe", "Gewerbeauszug", "Nicht-vor-Ort-Fall", "Restpunkte"],
    notSuitableFor: ["Rechtsberatung", "Abnahmegarantie", "Kautionsgarantie"],
    relatedServices: ["endreinigung", "wohnungsaufloesung", "umzug-mit-reinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/uebergabeakte",
    priority: "P1",
    seoIntent: "Übergabe praktisch vorbereiten",
  }),
  buildService({
    serviceKey: "floxant-uebergabe-sprint",
    name: "FLOXANT Uebergabe-Sprint",
    category: "signature_service",
    shortDescription: "Priorisiert Restmengen, Reinigung, Fotos und Schlüsselweg bei naher Deadline.",
    customerProblem: "Die Übergabe steht kurz bevor und Plan, Reihenfolge oder Machbarkeit sind unsicher.",
    suitableFor: ["naher Termin", "Restmengen", "Reinigung vor Rückgabe", "Plan B"],
    notSuitableFor: ["Sofortgarantie", "Abnahmegarantie"],
    relatedServices: ["endreinigung", "entruempelung", "plan-b-service"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/uebergabe-sprint",
    canonicalRoute: "/uebergabe-sprint",
    priority: "P1",
    seoIntent: "Übergabe bei Zeitdruck priorisieren",
  }),
  buildService({
    serviceKey: "floxant-plan-b-service",
    name: "FLOXANT Plan-B-Service",
    category: "signature_service",
    shortDescription: "Sortiert Lage, Deadline, vorhandene Daten und realistische Alternativen bei Ausfall.",
    customerProblem: "Anbieter sagt ab, reagiert nicht oder der Termin kippt.",
    suitableFor: ["Anbieterabsage", "Zeitdruck", "unklare Machbarkeit", "Backup"],
    notSuitableFor: ["Sofortzusage", "Kapazitaetsgarantie"],
    relatedServices: ["umzug", "reinigung", "entruempelung", "angebot-pruefen"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/plan-b-service",
    priority: "P0",
    seoIntent: "Plan B bei Anbieterabsage oder Terminrisiko",
  }),
  buildService({
    serviceKey: "floxant-rueckfahrt-radar",
    name: "FLOXANT Rueckfahrt-Radar",
    category: "signature_service",
    shortDescription: "Prüft Route, Volumen und Zeitfenster für Rückfahrt, Beiladung oder Leerfahrt.",
    customerProblem: "Flexible Transporte passen nur, wenn Strecke und Volumen sauber beschrieben sind.",
    suitableFor: ["Beiladung", "Rückfahrt", "Einzelmoebel", "flexible Route"],
    relatedServices: ["beiladung-rueckfahrt", "moebeltransport", "kleintransport"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "available",
    recommendedRoute: "/rueckfahrt-radar",
    canonicalRoute: "/rueckfahrt-radar",
    priority: "P2",
    seoIntent: "Rückfahrt und Beiladung prüfen",
  }),
  buildService({
    serviceKey: "floxant-diskret-service",
    name: "FLOXANT Diskret-Service",
    category: "signature_service",
    shortDescription: "Ruhiger Kontaktweg für sensible Umzüge, Nachlass, Trennung oder belastete Räume.",
    customerProblem: "Kunden brauchen würdevolle Kommunikation und wenig öffentliche Reibung.",
    suitableFor: ["sensible Lage", "Trennung", "Nachlass", "belastete Wohnung", "diskrete Entrümpelung"],
    notSuitableFor: ["anonyme Beauftragung ohne Berechtigung", "rechtliche Konfliktberatung"],
    relatedServices: ["diskreter-umzug", "nachlassaufloesung", "private-client-service", "angebot-pruefen"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/diskret-service",
    priority: "P0",
    seoIntent: "diskrete Anfrage mit ruhigem Kontaktweg",
  }),
  buildService({
    serviceKey: "floxant-vermieter-ready-service",
    name: "FLOXANT Vermieter-Ready-Service",
    category: "signature_service",
    shortDescription: "Bereitet Wohnung oder Objekt für Rückgabe, Besichtigung oder Neuvermietung vor.",
    customerProblem: "Reinigung, Restpunkte, Fotos und Zielzustand müssen vor dem Termin zusammenpassen.",
    suitableFor: ["Vermieter", "Makler", "Leerstand", "Besichtigung", "Neuvermietung"],
    notSuitableFor: ["Mietrechtsberatung", "Abnahmegarantie"],
    relatedServices: ["endreinigung", "wohnungsaufloesung", "uebergabeakte"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/vermieter-ready-service",
    canonicalRoute: "/vermieter-ready-service",
    priority: "P1",
    seoIntent: "Objekt für Vermieter oder Nachnutzung vorbereiten",
  }),
  buildService({
    serviceKey: "floxant-buero-startklar-service",
    name: "FLOXANT Buero-Startklar-Service",
    category: "signature_service",
    shortDescription: "Büro, Praxis oder Gewerbefläche vor Start, Einzug, Umbauende oder Wochenstart vorbereiten.",
    customerProblem: "Gewerbeflächen brauchen einen klaren Zustand, ohne Betriebsablauf zu stoeren.",
    suitableFor: ["Büro", "Praxis", "Kanzlei", "Gewerbefläche", "Einzug oder Wochenstart"],
    relatedServices: ["bueroreinigung", "gewerbereinigung", "bauendreinigung"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/regensburg/bueroreinigung",
    canonicalRoute: "/regensburg/bueroreinigung",
    priority: "P2",
    seoIntent: "Büro startklar mit Reinigung und Ablauf machen",
  }),
  buildService({
    serviceKey: "floxant-pv-sichtklar-service",
    name: "FLOXANT PV-Sichtklar-Service",
    category: "signature_service",
    shortDescription: "PV-Reinigung mit Sichtpruefung von Verschmutzung, Zugang, Fotos und Sicherheitsgrenzen.",
    customerProblem: "PV-Anfragen brauchen klare Grenze zu Technik, Dach und Ertragsversprechen.",
    suitableFor: ["PV-Anlage", "sichtbare Verschmutzung", "Fotos und Dachzugang"],
    notSuitableFor: ["Ertragsgarantie", "Elektroarbeiten", "Dachreparatur"],
    relatedServices: ["solarreinigung", "pv-anlagen-reinigung", "spezialreinigung"],
    dusseldorfAvailability: "needs_manual_confirmation",
    regensburgAvailability: "needs_manual_confirmation",
    recommendedRoute: "/pv-anlagen-reinigung",
    canonicalRoute: "/pv-anlagen-reinigung",
    priority: "P2",
    seoIntent: "PV-Reinigung sicher und ohne Ertragsversprechen prüfen",
  }),
  buildService({
    serviceKey: "floxant-entscheidungs-kompass",
    name: "FLOXANT Entscheidungs-Kompass",
    category: "signature_service",
    shortDescription: "Hilft, zwischen Direktanfrage, Angebotsprüfung, Objektbrief oder Plan B zu wählen.",
    customerProblem: "Kunden wissen nicht, welcher nächste Schritt der richtige ist.",
    suitableFor: ["unklare Servicewahl", "mehrere Optionen", "vorhandenes Angebot", "Zeitdruck"],
    relatedServices: ["angebot-pruefen", "anbieter-vergleichen", "objektbrief"],
    dusseldorfAvailability: "available",
    regensburgAvailability: "available",
    recommendedRoute: "/signature-services",
    priority: "P1",
    seoIntent: "passenden FLOXANT Startpunkt finden",
  }),
] as const;

export const serviceGroups: Record<ServiceCategory, readonly ServiceInventoryItem[]> = {
  reinigung: serviceInventory.filter((service) => service.category === "reinigung"),
  umzug_transport: serviceInventory.filter((service) => service.category === "umzug_transport"),
  entruempelung_aufloesung: serviceInventory.filter(
    (service) => service.category === "entruempelung_aufloesung",
  ),
  angebot_pruefen: serviceInventory.filter((service) => service.category === "angebot_pruefen"),
  signature_service: serviceInventory.filter((service) => service.category === "signature_service"),
};

export function getServicesForLocation(locationKey: FloxantLocationKey) {
  const key = locationKey === "duesseldorf" ? "dusseldorfAvailability" : "regensburgAvailability";

  return serviceInventory.filter((service) => service[key] !== "not_offered");
}

export function getPriorityServices(priority: ServicePriority) {
  return serviceInventory.filter((service) => service.priority === priority);
}
