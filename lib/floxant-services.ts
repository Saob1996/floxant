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
    headline: "Reinigungslösungen für Unternehmen, Praxen und Gewerbeobjekte.",
    description:
      "FLOXANT Düsseldorf unterstützt Unternehmen, Praxen, Kanzleien, Hausverwaltungen und Gewerbeobjekte mit sauber eingeordneten Reinigungsanfragen.",
    shortDescription:
      "Gewerbliche Reinigung für Unternehmen, Praxen und betreute Objekte.",
    primaryCta: "Services in Düsseldorf ansehen",
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
  normal: "Häufige Leistungen",
  signature: "FLOXANT Signature Services",
  special: "Schnelle Hilfe & Angebotsprüfung",
};

export const floxantCategoryDescriptions: Record<FloxantServiceCategory, string> = {
  normal: "Leistungen, die Kunden besonders häufig anfragen und die sich schnell einordnen lassen.",
  signature: "Für Situationen, in denen Zugang, Übergabe, Abstimmung oder besondere Sorgfalt wichtig sind.",
  special: "Für bestehende Angebote, kurzfristige Anliegen oder Fälle, bei denen erst Klarheit entstehen muss.",
};

const floxantServiceSeeds: FloxantServiceSeed[] = [
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
    title: "Bestehendes Angebot prüfen lassen",
    shortDescription:
      "Sie haben bereits ein Reinigungsangebot und möchten eine sachliche zweite Einschätzung.",
    region: "duesseldorf",
    category: "special",
    href: "/angebot-vergleichen-duesseldorf",
    ctaLabel: "Angebot prüfen lassen",
    googleAdsRelevant: true,
    priority: 1,
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
    title: "Angebot sachlich prüfen lassen",
    shortDescription:
      "Vorhandenes Angebot, Screenshot oder Preisrahmen senden und offene Punkte ruhig einordnen lassen.",
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
