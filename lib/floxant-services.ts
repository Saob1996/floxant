export type FloxantRegion = "duesseldorf" | "regensburg";
export type FloxantServiceCategory = "normal" | "signature" | "special";

export type FloxantRegionConfig = {
  id: FloxantRegion;
  label: string;
  city: string;
  href: string;
  headline: string;
  description: string;
  shortDescription: string;
  primaryCta: string;
};

export type FloxantService = {
  id: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  longDescription: string;
  region: FloxantRegion;
  category: FloxantServiceCategory;
  href: string;
  ctaLabel: string;
  keywords: string[];
  googleAdsRelevant: boolean;
  priority: number;
  relatedServices: string[];
  blogSlug: string;
  schemaType: "Service";
};

type FloxantServiceSeed = Omit<
  FloxantService,
  "shortTitle" | "longDescription" | "keywords" | "relatedServices" | "blogSlug" | "schemaType"
> &
  Partial<Pick<
    FloxantService,
    "shortTitle" | "longDescription" | "keywords" | "relatedServices" | "blogSlug" | "schemaType"
  >>;

export const floxantCategoryOrder: FloxantServiceCategory[] = ["normal", "signature", "special"];

export const floxantRegions: Record<FloxantRegion, FloxantRegionConfig> = {
  duesseldorf: {
    id: "duesseldorf",
    label: "FLOXANT Düsseldorf",
    city: "Düsseldorf",
    href: "/duesseldorf",
    headline: "Umzug, Reinigung, Entrümpelung und Übergabe in Düsseldorf.",
    description:
      "FLOXANT Düsseldorf unterstützt bei Reinigung, Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und sauber geprüften Kombi-Anfragen.",
    shortDescription:
      "Umzug, Reinigung, Entrümpelung und Übergabe klar getrennt anfragen.",
    primaryCta: "Düsseldorf-Services ansehen",
  },
  regensburg: {
    id: "regensburg",
    label: "FLOXANT Regensburg",
    city: "Regensburg",
    href: "/regensburg",
    headline:
      "Umzug, Entrümpelung, Übergabereinigung und objektbezogene Unterstützung.",
    description:
      "FLOXANT Regensburg hilft bei Wohnungswechsel, Räumung, Haushaltsauflösung, Endreinigung und einer geordneten Übergabe.",
    shortDescription:
      "Umzug, Entrümpelung, Haushaltsauflösung und Übergabe.",
    primaryCta: "Services in Regensburg ansehen",
  },
};

export const floxantCategoryLabels: Record<FloxantServiceCategory, string> = {
  normal: "Normale Services",
  signature: "FLOXANT Signature",
  special: "Spezielle Services / Angebotsprüfung",
};

export const floxantCategoryDescriptions: Record<FloxantServiceCategory, string> = {
  normal: "Klassische Leistungen, die direkt nach Ort, Objekt, Umfang und Termin angefragt werden können.",
  signature: "Zusätzliche Leistungen für Fälle mit Zugang, Übergabe, Diskretion, Fotos oder besonderer Abstimmung.",
  special: "Schnelle Einstiege für Objektbrief, vorhandene Angebote, kurzfristige Anliegen, Google-Ads-Landingpages und unklare Fälle.",
};

const floxantServiceSeeds: FloxantServiceSeed[] = [
  {
    id: "duesseldorf-umzug",
    title: "Umzug",
    shortDescription:
      "Umzug in Düsseldorf mit Fotos, Volumen, Zugang, Termin und möglicher Endreinigung sauber prüfen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/umzug",
    ctaLabel: "Umzug anfragen",
    googleAdsRelevant: true,
    priority: 0.6,
  },
  {
    id: "duesseldorf-gewerbereinigung",
    title: "Gewerbereinigung",
    shortDescription:
      "Für Unternehmen, Gewerbeobjekte, Kanzleien, Studios und gemischte Flächen in Düsseldorf.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/gewerbereinigung",
    ctaLabel: "Gewerbereinigung ansehen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "duesseldorf-reinigung",
    title: "Reinigung",
    shortDescription:
      "Wohnung, Büro, Praxis, Übergabe oder Grundreinigung in Düsseldorf mit Fotos und Termin prüfen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/reinigung",
    ctaLabel: "Reinigung anfragen",
    googleAdsRelevant: true,
    priority: 1.2,
  },
  {
    id: "duesseldorf-entruempelung",
    title: "Entrümpelung",
    shortDescription:
      "Wohnung, Keller, Nebenraum oder Objekt in Düsseldorf nach Menge, Zugang und Fotos einschätzen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/entruempelung",
    ctaLabel: "Entrümpelung prüfen",
    googleAdsRelevant: true,
    priority: 1.4,
  },
  {
    id: "duesseldorf-haushaltsaufloesung",
    title: "Haushaltsauflösung",
    shortDescription:
      "Wohnungsauflösung, Nachlass oder Haushalt in Düsseldorf ruhig mit Freigabe, Fotos und Reinigung klären.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/haushaltsaufloesung",
    ctaLabel: "Auflösung klären",
    googleAdsRelevant: true,
    priority: 1.6,
  },
  {
    id: "duesseldorf-endreinigung",
    title: "Endreinigung",
    shortDescription:
      "Endreinigung nach Auszug, Umzug oder Räumung in Düsseldorf mit Zustand, Fotos und Übergabetermin prüfen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/endreinigung",
    ctaLabel: "Endreinigung prüfen",
    googleAdsRelevant: true,
    priority: 1.8,
  },
  {
    id: "duesseldorf-bueroreinigung",
    title: "Büroreinigung",
    shortDescription:
      "Für Büros, Agenturen, Kanzleien und kleine Unternehmen mit klarem Turnus und Zeitfenster.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/bueroreinigung",
    ctaLabel: "Büroreinigung ansehen",
    googleAdsRelevant: true,
    priority: 2,
  },
  {
    id: "duesseldorf-praxisreinigung",
    title: "Praxisreinigung",
    shortDescription:
      "Allgemeine Praxisflächen nach Absprache, mit klarer Grenze zu medizinischer Spezialdesinfektion.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/praxisreinigung",
    ctaLabel: "Praxisreinigung ansehen",
    googleAdsRelevant: true,
    priority: 3,
  },
  {
    id: "duesseldorf-unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    shortDescription:
      "Regelmäßige Reinigung für Büros, Objektflächen und Treppenhäuser mit Raumliste und Turnus.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/unterhaltsreinigung",
    ctaLabel: "Unterhaltsreinigung ansehen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "duesseldorf-treppenhausreinigung",
    title: "Treppenhausreinigung",
    shortDescription:
      "Für Hausverwaltungen, Eigentümer und Gewerbeobjekte mit Eingang, Etagen und Gemeinschaftsflächen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/treppenhausreinigung",
    ctaLabel: "Treppenhausreinigung ansehen",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "duesseldorf-firmenreinigung",
    title: "Firmenreinigung",
    shortDescription:
      "Für Betriebe, Agenturen, Studios und Gewerbeflächen, bei denen Turnus und Zuständigkeit klar sein müssen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/firmenreinigung",
    ctaLabel: "Firmenreinigung ansehen",
    googleAdsRelevant: true,
    priority: 6,
  },
  {
    id: "duesseldorf-hausverwaltung",
    title: "Hausverwaltung-Reinigung",
    shortDescription:
      "Für Treppenhäuser, Allgemeinflächen, Rückmeldungen und feste Ansprechpartner in betreuten Objekten.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/hausverwaltung-reinigung",
    ctaLabel: "Hausverwaltung ansehen",
    googleAdsRelevant: false,
    priority: 7,
  },
  {
    id: "duesseldorf-kanzleireinigung",
    title: "Kanzleireinigung",
    shortDescription:
      "Diskrete Reinigung für Empfang, Besprechungsräume, Arbeitsplätze und Sanitärbereiche in Kanzleien.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/kanzleireinigung",
    ctaLabel: "Kanzleireinigung ansehen",
    googleAdsRelevant: true,
    priority: 8,
  },
  {
    id: "duesseldorf-hotelreinigung",
    title: "Hotelreinigung",
    shortDescription:
      "Für öffentliche Bereiche, Nebenflächen und planbare Reinigungsfenster nach Objekt und Auslastung.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/hotelreinigung",
    ctaLabel: "Hotelreinigung ansehen",
    googleAdsRelevant: true,
    priority: 9,
  },
  {
    id: "duesseldorf-ladenreinigung",
    title: "Ladenreinigung",
    shortDescription:
      "Für Verkaufsflächen, Showrooms, Schaufensternähe und Reinigungszeiten vor oder nach Öffnung.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/ladenreinigung",
    ctaLabel: "Ladenreinigung ansehen",
    googleAdsRelevant: false,
    priority: 10,
  },
  {
    id: "duesseldorf-gebaeudereinigung",
    title: "Gebäudereinigung",
    shortDescription:
      "Für mehrere Objektbereiche, Nebenflächen, Sanitär, Eingänge und klare Reinigungspläne.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/gebaeudereinigung",
    ctaLabel: "Gebäudereinigung ansehen",
    googleAdsRelevant: true,
    priority: 11,
  },
  {
    id: "duesseldorf-premium-reinigung",
    title: "Premium-Reinigung",
    shortDescription:
      "Diskrete Abstimmung für hochwertige Büros, Praxen, Kanzleien, Showrooms und Apartments.",
    region: "duesseldorf",
    category: "signature",
    href: "/duesseldorf/luxusreinigung",
    ctaLabel: "Premium-Reinigung ansehen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "duesseldorf-reinigungskonzept",
    title: "Reinigungskonzept als Extra",
    shortDescription:
      "Für Objekte mit mehreren Bereichen, festen Abläufen oder besonderem Abstimmungsbedarf.",
    region: "duesseldorf",
    category: "signature",
    href: "/duesseldorf/gewerbereinigung#kontakt",
    ctaLabel: "Konzept besprechen",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "duesseldorf-objektbetreuung",
    title: "Objektbetreuung als Extra",
    shortDescription:
      "Für Objekte, bei denen Zugang, Rückmeldung, Turnus und feste Ansprechpartner wichtig sind.",
    region: "duesseldorf",
    category: "signature",
    href: "/duesseldorf/hausverwaltung-reinigung",
    ctaLabel: "Objektbetreuung prüfen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "duesseldorf-schluesseluebergabe",
    title: "Schlüsselübergabe-Reinigung als Extra",
    shortDescription:
      "Für Termine, bei denen Reinigung, Zugang, Rückmeldung und Übergabepunkte zusammenpassen müssen.",
    region: "duesseldorf",
    category: "signature",
    href: "/duesseldorf/schluesseluebergabe-reinigung",
    ctaLabel: "Übergabe reinigen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "duesseldorf-angebot-vergleichen",
    title: "FLOXANT Angebotsprüfung",
    shortDescription:
      "Angebot, Screenshot oder Eckdaten senden und kostenlos prüfen lassen, ob eine passende Alternative möglich ist.",
    region: "duesseldorf",
    category: "special",
    href: "/angebot-vergleichen-duesseldorf",
    ctaLabel: "Angebot prüfen lassen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "duesseldorf-objektbrief",
    title: "FLOXANT Objektbrief",
    shortDescription:
      "Reinigung mit Ort, Fotos, Zugang, Termin und Budgetrahmen klar vorbereiten.",
    region: "duesseldorf",
    category: "special",
    href: "/objektbrief#schnellstart",
    ctaLabel: "Objektbrief starten",
    googleAdsRelevant: false,
    priority: 1.5,
  },
  {
    id: "duesseldorf-gewerbe-ads",
    title: "Schnellanfrage Gewerbereinigung",
    shortDescription:
      "Direkter Einstieg für Unternehmen, Büros, Praxen und Gewerbeobjekte in Düsseldorf.",
    region: "duesseldorf",
    category: "special",
    href: "/duesseldorf/gewerbereinigung",
    ctaLabel: "Kostenlos anfragen",
    googleAdsRelevant: true,
    priority: 2,
  },
  {
    id: "duesseldorf-premium-ads",
    title: "Diskrete Premium-Anfrage",
    shortDescription:
      "Ruhiger Anfrageweg für hochwertige Objekte, bei denen Abstimmung und Auftreten wichtig sind.",
    region: "duesseldorf",
    category: "special",
    href: "/duesseldorf/luxusreinigung",
    ctaLabel: "Diskret anfragen",
    googleAdsRelevant: true,
    priority: 3,
  },
  {
    id: "duesseldorf-kurzfristig",
    title: "Kurzfristige Reinigung prüfen",
    shortDescription:
      "Wenn ein Termin näher rückt und schnell geklärt werden muss, ob Reinigung realistisch machbar ist.",
    region: "duesseldorf",
    category: "special",
    href: "/duesseldorf/kurzfristige-reinigung",
    ctaLabel: "Kurzfristig prüfen",
    googleAdsRelevant: true,
    priority: 4,
  },
  {
    id: "duesseldorf-entsorgung",
    title: "Entsorgung separat prüfen",
    shortDescription:
      "Für kleine Mengen, Keller, Nebenflächen oder Objektbereiche, wenn Reinigung allein nicht ausreicht.",
    region: "duesseldorf",
    category: "special",
    href: "/duesseldorf/entsorgung",
    ctaLabel: "Entsorgung prüfen",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "regensburg-umzug",
    title: "Umzug",
    shortDescription:
      "Privat- und Objektumzüge in Regensburg mit Volumen, Zugang, Termin und Zusatzleistungen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/umzug",
    ctaLabel: "Umzug ansehen",
    googleAdsRelevant: false,
    priority: 1,
  },
  {
    id: "regensburg-reinigung",
    title: "Reinigung",
    shortDescription:
      "Wohnung, Büro, Übergabe oder Reinigung nach Umzug in Regensburg mit Fotos und Zustand prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Reinigung ansehen",
    googleAdsRelevant: true,
    priority: 1.4,
  },
  {
    id: "regensburg-gewerbereinigung",
    title: "Gewerbereinigung",
    shortDescription:
      "Büro, Praxis, Kanzlei, Treppenhaus und Objektflächen mit Raumliste, Turnus und Angebot prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/gewerbereinigung",
    ctaLabel: "Gewerbereinigung ansehen",
    googleAdsRelevant: true,
    priority: 1.6,
  },
  {
    id: "regensburg-entruempelung",
    title: "Entrümpelung",
    shortDescription:
      "Räume, Keller, Wohnungen oder Objektflächen räumen und für den nächsten Schritt vorbereiten.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/entruempelung",
    ctaLabel: "Entrümpelung ansehen",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "regensburg-haushaltsaufloesung",
    title: "Haushaltsauflösung",
    shortDescription:
      "Wohnungen und Häuser nach Erbfall, Auszug oder Veränderung ruhig und strukturiert klären.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/haushaltsaufloesung",
    ctaLabel: "Haushaltsauflösung ansehen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "regensburg-uebergabereinigung",
    title: "Übergabereinigung",
    shortDescription:
      "Wohnung, Haus oder Gewerbefläche für Vermietertermin, Rückgabe oder Nachnutzung vorbereiten.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/uebergabereinigung",
    ctaLabel: "Übergabereinigung ansehen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "regensburg-endreinigung",
    title: "Endreinigung",
    shortDescription:
      "Endreinigung nach Auszug, Umzug oder Räumung mit Blick auf sichtbare Übergabepunkte.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/endreinigung",
    ctaLabel: "Endreinigung ansehen",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "regensburg-umzug-reinigung",
    title: "Umzug mit Reinigung als Extra",
    shortDescription:
      "Umzug, Restmengen und Reinigung so abstimmen, dass die Übergabe nicht am Ende scheitert.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/umzug-reinigung",
    ctaLabel: "Kombination ansehen",
    googleAdsRelevant: false,
    priority: 1,
  },
  {
    id: "regensburg-uebergabevorbereitung",
    title: "Übergabevorbereitung als Extra",
    shortDescription:
      "Reinigung, Organisation, Fotos und offene Punkte vor der Übergabe zusammenführen.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/uebergabereinigung",
    ctaLabel: "Übergabe vorbereiten",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "regensburg-mieterwechsel",
    title: "Mieterwechsel als Extra",
    shortDescription:
      "Für Vermieter, Hausverwaltungen und Eigentümer, wenn Wohnung, Schlüssel, Fotos und Restpunkte geklärt werden müssen.",
    region: "regensburg",
    category: "signature",
    href: "/mieterwechsel-service-regensburg",
    ctaLabel: "Mieterwechsel planen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "regensburg-wohnung-vermietbar",
    title: "Wohnung wieder vermietbar als Extra",
    shortDescription:
      "Räumen, Reinigen, Restpunkte sortieren und die Fläche für Besichtigung oder Nachmieter vorbereiten.",
    region: "regensburg",
    category: "signature",
    href: "/wohnung-wieder-vermietbar",
    ctaLabel: "Wohnung vorbereiten",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "regensburg-immobilie-verkaufsbereit",
    title: "Immobilie verkaufsbereit als Extra",
    shortDescription:
      "Für Häuser, Wohnungen und Objekte, die vor Fotos, Maklertermin oder Verkauf sichtbarer werden sollen.",
    region: "regensburg",
    category: "signature",
    href: "/immobilie-verkaufsbereit-machen",
    ctaLabel: "Immobilie vorbereiten",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "regensburg-uebergabeakte",
    title: "Übergabeakte als Extra",
    shortDescription:
      "Fotos, offene Punkte, Schlüsselstatus und Zustandsnotizen für eine ruhigere Übergabe bündeln.",
    region: "regensburg",
    category: "signature",
    href: "/uebergabeakte",
    ctaLabel: "Übergabeakte ansehen",
    googleAdsRelevant: false,
    priority: 6,
  },
  {
    id: "regensburg-nachlass-raeumung",
    title: "Nachlass-Räumung als Extra",
    shortDescription:
      "Respektvolle Hilfe, wenn ein Haushalt nach Erbfall oder Veränderung geordnet geklärt werden soll.",
    region: "regensburg",
    category: "signature",
    href: "/nachlass-raeumung-regensburg",
    ctaLabel: "Nachlass klären",
    googleAdsRelevant: false,
    priority: 7,
  },
  {
    id: "regensburg-objektvertretung",
    title: "Objektvertretung als Extra",
    shortDescription:
      "Vor-Ort-Aufgaben übernehmen, wenn Zugang, Kontrolle, Schlüssel oder Rückmeldung kurzfristig offen sind.",
    region: "regensburg",
    category: "signature",
    href: "/objekt-springer",
    ctaLabel: "Objektvertretung prüfen",
    googleAdsRelevant: false,
    priority: 8,
  },
  {
    id: "regensburg-vor-ort-hilfe",
    title: "Vor-Ort-Hilfe als Extra",
    shortDescription:
      "Für Kunden, die nicht selbst vor Ort sein können und eine klare Prüfung oder Fotomeldung brauchen.",
    region: "regensburg",
    category: "signature",
    href: "/human-api",
    ctaLabel: "Vor-Ort-Hilfe prüfen",
    googleAdsRelevant: false,
    priority: 9,
  },
  {
    id: "regensburg-immobilienbetreuung",
    title: "Immobilienbetreuung als Extra",
    shortDescription:
      "Schlüssel, Übergabe, Reinigung, Fotos und Kontrollpunkte für Wohnungen oder Objekte vor Ort bündeln.",
    region: "regensburg",
    category: "signature",
    href: "/property-operations",
    ctaLabel: "Immobilie betreuen",
    googleAdsRelevant: false,
    priority: 10,
  },
  {
    id: "regensburg-leerstandsmanagement",
    title: "Leerstandsmanagement als Extra",
    shortDescription:
      "Für leerstehende Wohnungen oder Objekte, wenn Lüften, Zustand, Fotos und Rückmeldung wichtig sind.",
    region: "regensburg",
    category: "signature",
    href: "/leerstandsmanagement",
    ctaLabel: "Leerstand prüfen",
    googleAdsRelevant: false,
    priority: 11,
  },
  {
    id: "regensburg-erledigungsservice",
    title: "Erledigungsservice für Firmen",
    shortDescription:
      "Dokumente, Schlüssel, Materialwege oder kleine Vor-Ort-Aufgaben kontrolliert erledigen lassen.",
    region: "regensburg",
    category: "signature",
    href: "/business-errand-service",
    ctaLabel: "Erledigung prüfen",
    googleAdsRelevant: false,
    priority: 12,
  },
  {
    id: "regensburg-gaestewechsel",
    title: "Gästewechsel-Service als Extra",
    shortDescription:
      "Reinigung, Kontrolle, Fotos und Vorbereitung für Ferienwohnung oder Apartment zwischen zwei Aufenthalten.",
    region: "regensburg",
    category: "signature",
    href: "/airbnb-turnover-express",
    ctaLabel: "Gästewechsel planen",
    googleAdsRelevant: false,
    priority: 13,
  },
  {
    id: "regensburg-besenrein",
    title: "Besenreine Übergabe",
    shortDescription:
      "Praktische Unterstützung, wenn eine Fläche sauber, leer und verständlich übergeben werden soll.",
    region: "regensburg",
    category: "special",
    href: "/regensburg/besenreine-uebergabe",
    ctaLabel: "Übergabe prüfen",
    googleAdsRelevant: false,
    priority: 1,
  },
  {
    id: "regensburg-objektbrief",
    title: "FLOXANT Objektbrief",
    shortDescription:
      "Umzug, Räumung, Haushaltsauflösung, Endreinigung und Übergabe mit klaren Angaben vorbereiten.",
    region: "regensburg",
    category: "special",
    href: "/objektbrief#schnellstart",
    ctaLabel: "Objektbrief starten",
    googleAdsRelevant: false,
    priority: 1.5,
  },
  {
    id: "regensburg-entruempelung-uebergabe",
    title: "Entrümpelung mit Übergabevorbereitung",
    shortDescription:
      "Räumen, Restmengen klären und die Fläche für Vermieter, Käufer oder Nachnutzer vorbereiten.",
    region: "regensburg",
    category: "special",
    href: "/regensburg/entruempelung",
    ctaLabel: "Fall senden",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "regensburg-plan-b",
    title: "Plan B für Umzug und Übergabe",
    shortDescription:
      "Wenn Anbieter, Termin, Reinigung, Räumung oder Übergabe unsicher wirken und ein Backup geprüft werden soll.",
    region: "regensburg",
    category: "special",
    href: "/plan-b-service",
    ctaLabel: "Plan B prüfen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "regensburg-schadensbegrenzung",
    title: "Schadensbegrenzung nach Ausfall",
    shortDescription:
      "Wenn ein Ablauf bereits kippt und schnell geklärt werden muss, was noch sinnvoll möglich ist.",
    region: "regensburg",
    category: "special",
    href: "/schadensbegrenzung",
    ctaLabel: "Lage prüfen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "regensburg-plattformauftrag",
    title: "Auftrag aus Plattform prüfen",
    shortDescription:
      "Für unklare Plattform- oder Vergleichsangebote, bei denen Umfang, Preis oder Verantwortung unscharf sind.",
    region: "regensburg",
    category: "special",
    href: "/plattform-auftrag-pruefen",
    ctaLabel: "Auftrag prüfen",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "regensburg-keller-muellraum",
    title: "Keller- und Müllraum-Rettung",
    shortDescription:
      "Wenn Nebenflächen, Müllraum, Keller oder Restmengen vor Übergabe oder Nutzung wieder geordnet werden müssen.",
    region: "regensburg",
    category: "special",
    href: "/keller-muellraum-rettung-regensburg",
    ctaLabel: "Fläche prüfen",
    googleAdsRelevant: false,
    priority: 6,
  },
  {
    id: "regensburg-angebot-pruefen",
    title: "FLOXANT Angebotsprüfung",
    shortDescription:
      "Angebot für Umzug, Entrümpelung, Haushaltsauflösung, Übergabe oder Kombination kostenlos prüfen lassen.",
    region: "regensburg",
    category: "special",
    href: "/angebot-guenstiger-pruefen",
    ctaLabel: "Angebot prüfen",
    googleAdsRelevant: false,
    priority: 7,
  },
  {
    id: "regensburg-rueckfahrt",
    title: "Rückfahrt oder Leerfahrt nutzen",
    shortDescription:
      "Für flexible Transporte, wenn Strecke, Zeitfenster und Volumen zu einer vorhandenen Fahrt passen könnten.",
    region: "regensburg",
    category: "special",
    href: "/rueckfahrt-boerse",
    ctaLabel: "Strecke prüfen",
    googleAdsRelevant: false,
    priority: 8,
  },
  {
    id: "regensburg-urlaubsretter",
    title: "Urlaubsretter",
    shortDescription:
      "Letzte Wohnungs-, Schlüssel- oder Übergabepunkte vor einer Reise ruhig klären lassen.",
    region: "regensburg",
    category: "special",
    href: "/urlaubsretter",
    ctaLabel: "Restpunkte klären",
    googleAdsRelevant: false,
    priority: 9,
  },
];

function buildDefaultKeywords(service: FloxantServiceSeed) {
  const region = floxantRegions[service.region];
  const base = [
    service.title,
    service.shortTitle || service.title,
    region.city,
    `${service.title} ${region.city}`,
    floxantCategoryLabels[service.category],
    service.googleAdsRelevant ? "wichtiger Anfrageeinstieg" : "",
  ];

  return Array.from(new Set(base.filter(Boolean)));
}

function buildDefaultBlogSlug(service: FloxantServiceSeed) {
  return service.blogSlug || service.href.replace(/^\/+/, "").replace(/\//g, "-");
}

export const floxantServices: FloxantService[] = floxantServiceSeeds.map((service) => ({
  ...service,
  shortTitle: service.shortTitle || service.title,
  longDescription: service.longDescription || service.shortDescription,
  keywords: service.keywords || buildDefaultKeywords(service),
  relatedServices: service.relatedServices || [],
  blogSlug: buildDefaultBlogSlug(service),
  schemaType: service.schemaType || "Service",
}));

export function getServicesByRegion(region: FloxantRegion) {
  return floxantServices
    .filter((service) => service.region === region)
    .sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title, "de"));
}

export function getServicesByRegionAndCategory(
  region: FloxantRegion,
  category: FloxantServiceCategory,
) {
  return getServicesByRegion(region).filter((service) => service.category === category);
}

export function getFeaturedServices(region: FloxantRegion, limit = 6) {
  return getServicesByRegion(region)
    .filter((service) => service.category !== "special" || service.googleAdsRelevant)
    .slice(0, limit);
}
