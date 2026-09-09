import { isCleaningRouteAllowed } from "@/lib/regensburg-cleaning-service-area";

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
    headline: "Düsseldorf-Anfragen klar getrennt.",
    description:
      "FLOXANT Düsseldorf führt Angebotsprüfung, Reinigung, Umzug, Räumung und Haushaltsauflösung. Ort, Umfang und Termin werden vor einer Zusage geprüft.",
    shortDescription:
      "Angebot prüfen, Umzug, Räumung und Servicegebiet.",
    primaryCta: "Düsseldorf-Anfrage prüfen",
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
  normal: "Häufig angefragte Leistungen",
  signature: "Besondere Hilfe im Ablauf",
  special: "Schnelle Klärung und Angebotsprüfung",
};

export const floxantCategoryDescriptions: Record<FloxantServiceCategory, string> = {
  normal: "Leistungen, die Sie direkt mit Ort, Objekt, Umfang und Termin anfragen können.",
  signature: "Hilfe für Fälle mit Zugang, Übergabe, Diskretion, Fotos oder besonderer Abstimmung.",
  special: "Schnelle Wege, wenn ein Angebot geprüft werden soll, ein Objekt unklar ist oder kurzfristig Hilfe gebraucht wird.",
};

const floxantServiceSeeds: FloxantServiceSeed[] = [
  {
    id: "duesseldorf-reinigung",
    title: "Reinigung Düsseldorf",
    shortTitle: "Reinigung",
    shortDescription:
      "Zentraler Einstieg für Wohnung, Büro, Gewerbe, Praxis, Fenster und einmalige Reinigung in Düsseldorf.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/reinigung",
    ctaLabel: "Reinigung auswählen",
    googleAdsRelevant: true,
    priority: 0.5,
  },
  {
    id: "duesseldorf-bueroreinigung",
    title: "Büroreinigung Düsseldorf",
    shortTitle: "Büroreinigung",
    shortDescription:
      "Büroflächen mit Raumliste, Turnus, Reinigungszeiten, Zugang und Ansprechpartner anfragen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/bueroreinigung",
    ctaLabel: "Büroreinigung ansehen",
    googleAdsRelevant: true,
    priority: 0.7,
  },
  {
    id: "duesseldorf-gewerbereinigung",
    title: "Gewerbereinigung Düsseldorf",
    shortTitle: "Gewerbereinigung",
    shortDescription:
      "Gewerbeobjekte nach Fläche, Nutzung, Zeitfenster, Sonderflächen und Leistungsumfang einordnen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/gewerbereinigung",
    ctaLabel: "Gewerbereinigung ansehen",
    googleAdsRelevant: true,
    priority: 0.8,
  },
  {
    id: "duesseldorf-praxisreinigung",
    title: "Praxisreinigung Düsseldorf",
    shortTitle: "Praxisreinigung",
    shortDescription:
      "Praxisräume mit sensiblen Bereichen, Turnus, Reinigungszeiten und Zugang sachlich anfragen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/praxisreinigung",
    ctaLabel: "Praxisreinigung ansehen",
    googleAdsRelevant: true,
    priority: 0.9,
  },
  {
    id: "duesseldorf-fensterreinigung",
    title: "Fensterreinigung Düsseldorf",
    shortTitle: "Fensterreinigung",
    shortDescription:
      "Glasflächen, Fensterzahl, Rahmen, Erreichbarkeit, Turnus und Termin vorab klären.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/fensterreinigung",
    ctaLabel: "Fensterreinigung ansehen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "duesseldorf-grundreinigung",
    title: "Grundreinigung Düsseldorf",
    shortTitle: "Grundreinigung",
    shortDescription:
      "Räume, Fläche, Verschmutzung, Schwerpunkte und gewünschten Zielzustand verständlich beschreiben.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/grundreinigung",
    ctaLabel: "Grundreinigung ansehen",
    googleAdsRelevant: true,
    priority: 1.1,
  },
  {
    id: "duesseldorf-unterhaltsreinigung",
    title: "Unterhaltsreinigung Düsseldorf",
    shortTitle: "Unterhaltsreinigung",
    shortDescription:
      "Wiederkehrende Reinigung mit Turnus, Raumliste, Zugangszeiten und festen Kontaktwegen vorbereiten.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/unterhaltsreinigung",
    ctaLabel: "Unterhaltsreinigung ansehen",
    googleAdsRelevant: true,
    priority: 1.2,
  },
  {
    id: "duesseldorf-baureinigung",
    title: "Bauendreinigung Düsseldorf",
    shortTitle: "Bauendreinigung",
    shortDescription:
      "Reinigung nach Bau, Umbau oder Renovierung anhand von Bauphase, Restarbeiten, Fotos und Termin prüfen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/baureinigung",
    ctaLabel: "Bauendreinigung ansehen",
    googleAdsRelevant: true,
    priority: 1.3,
  },
  {
    id: "duesseldorf-treppenhausreinigung",
    title: "Treppenhausreinigung Düsseldorf",
    shortTitle: "Treppenhausreinigung",
    shortDescription:
      "Eingang, Etagen, Geländer, Aufzug und Gemeinschaftsflächen mit Turnus und Zugang einordnen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/treppenhausreinigung",
    ctaLabel: "Treppenhausreinigung ansehen",
    googleAdsRelevant: true,
    priority: 1.4,
  },
  {
    id: "duesseldorf-angebot-vergleichen",
    title: "Reinigungsangebot Düsseldorf prüfen",
    shortTitle: "Angebot prüfen",
    shortDescription:
      "Vorhandenes Angebot mit Fläche, Turnus, Leistungsumfang und Zusatzpositionen sachlich vergleichen.",
    region: "duesseldorf",
    category: "special",
    href: "/angebot-vergleichen-duesseldorf",
    ctaLabel: "Angebot prüfen",
    googleAdsRelevant: true,
    priority: 0.5,
  },
  {
    id: "regensburg-reinigungsfirma",
    title: "Reinigungsfirma Regensburg",
    shortTitle: "Reinigungsfirma",
    shortDescription:
      "Zentraler Einstieg für Büro, Praxis, Gewerbe, Grundreinigung und Angebotsprüfung in Regensburg.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Reinigungsfirma ansehen",
    keywords: [
      "Reinigungsfirma Regensburg",
      "Gewerbereinigung Regensburg",
      "Büroreinigung Regensburg",
      "Praxisreinigung Regensburg",
      "Reinigungsangebot prüfen",
    ],
    googleAdsRelevant: true,
    priority: 0.35,
  },
  {
    id: "regensburg-umzug",
    title: "Umzug",
    shortDescription:
      "Umzug in Regensburg mit Fotos, Volumen, Zugang, Termin und möglicher Endreinigung sauber prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/umzug",
    ctaLabel: "Umzug anfragen",
    googleAdsRelevant: true,
    priority: 0.6,
  },
  {
    id: "regensburg-seniorenumzug",
    title: "Seniorenumzug",
    shortDescription:
      "Umzug im Alter mit Angehörigen, Reduzierung, Entrümpelung, Reinigung und Übergabe ruhig vorbereiten.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/seniorenumzug",
    ctaLabel: "Seniorenumzug anfragen",
    keywords: [
      "Seniorenumzug Regensburg",
      "Umzug im Alter",
      "Umzugshilfe für Senioren",
      "Seniorenumzug mit Entrümpelung",
    ],
    googleAdsRelevant: true,
    priority: 0.85,
  },
  {
    id: "regensburg-gewerbereinigung",
    title: "Gewerbereinigung",
    shortDescription:
      "Für Unternehmen, Gewerbeobjekte, Kanzleien, Studios und gemischte Flächen in Regensburg.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/gewerbereinigung",
    ctaLabel: "Gewerbereinigung ansehen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "regensburg-reinigung",
    title: "Reinigung",
    shortDescription:
      "Wohnung, Büro, Praxis, Übergabe oder Grundreinigung in Regensburg mit Fotos und Termin prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Reinigung anfragen",
    googleAdsRelevant: true,
    priority: 1.2,
  },
  {
    id: "regensburg-glasreinigung",
    title: "Glasreinigung",
    shortDescription:
      "Fenster, Glasflächen, Rahmen und Wintergarten nach Zugang, Höhe, Material und Termin realistisch einordnen.",
    region: "regensburg",
    category: "normal",
    href: "/glasreinigung",
    ctaLabel: "Glas prüfen",
    googleAdsRelevant: true,
    priority: 1.3,
  },
  {
    id: "regensburg-entruempelung",
    title: "Entrümpelung",
    shortDescription:
      "Wohnung, Keller, Nebenraum oder Objekt in Regensburg nach Menge, Zugang und Fotos einschätzen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/entruempelung",
    ctaLabel: "Entrümpelung prüfen",
    googleAdsRelevant: true,
    priority: 1.4,
  },
  {
    id: "regensburg-fassadenreinigung",
    title: "Fassadenreinigung",
    shortDescription:
      "Fassade, Eingangsbereich oder Außenfläche vorsichtig nach Untergrund, Höhe und Zugang prüfen lassen.",
    region: "regensburg",
    category: "normal",
    href: "/fassadenreinigung",
    ctaLabel: "Fassade prüfen",
    googleAdsRelevant: true,
    priority: 1.45,
  },
  {
    id: "regensburg-haushaltsaufloesung",
    title: "Haushaltsauflösung",
    shortDescription:
      "Wohnungsauflösung, Nachlass oder Haushalt in Regensburg ruhig mit Freigabe, Fotos und Reinigung klären.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/wohnungsaufloesung",
    ctaLabel: "Auflösung klären",
    googleAdsRelevant: true,
    priority: 1.6,
  },
  {
    id: "regensburg-eventreinigung",
    title: "Eventreinigung",
    shortDescription:
      "Reinigung vor oder nach Veranstaltung, Showroom-Termin oder Gewerbeevent mit Zeitfenster und Restmengen prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/eventreinigung",
    ctaLabel: "Event prüfen",
    googleAdsRelevant: true,
    priority: 1.65,
  },
  {
    id: "regensburg-endreinigung",
    title: "Endreinigung",
    shortDescription:
      "Endreinigung nach Auszug, Umzug oder Räumung in Regensburg mit Zustand, Fotos und Übergabetermin prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung-nach-umzug",
    ctaLabel: "Endreinigung prüfen",
    googleAdsRelevant: true,
    priority: 1.8,
  },
  {
    id: "regensburg-wasserschadenreinigung",
    title: "Reinigung nach Wasserschaden",
    shortDescription:
      "Nach Trocknung oder Freigabe sichtbare Rückstände, Geruch, Übergabeziel und Grenzen zur Sanierung klären.",
    region: "regensburg",
    category: "normal",
    href: "/reinigung-nach-wasserschaden",
    ctaLabel: "Fall prüfen",
    googleAdsRelevant: false,
    priority: 1.85,
  },
  {
    id: "regensburg-bueroreinigung",
    title: "Büroreinigung",
    shortDescription:
      "Für Büros, Agenturen, Kanzleien und kleine Unternehmen mit klarem Turnus und Zeitfenster.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/bueroreinigung",
    ctaLabel: "Büroreinigung ansehen",
    googleAdsRelevant: true,
    priority: 2,
  },
  {
    id: "regensburg-praxisreinigung",
    title: "Praxisreinigung",
    shortDescription:
      "Allgemeine Praxisflächen nach Absprache, mit klarer Grenze zu medizinischer Spezialdesinfektion.",
    region: "regensburg",
    category: "normal",
    href: "/praxisreinigung-regensburg",
    ctaLabel: "Praxisreinigung ansehen",
    googleAdsRelevant: true,
    priority: 3,
  },
  {
    id: "regensburg-unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    shortDescription:
      "Regelmäßige Reinigung für Büros, Objektflächen und Treppenhäuser mit Raumliste und Turnus.",
    region: "regensburg",
    category: "normal",
    href: "/unterhaltsreinigung-regensburg",
    ctaLabel: "Unterhaltsreinigung ansehen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "regensburg-treppenhausreinigung",
    title: "Treppenhausreinigung",
    shortDescription:
      "Für Hausverwaltungen, Eigentümer und Gewerbeobjekte mit Eingang, Etagen und Gemeinschaftsflächen.",
    region: "regensburg",
    category: "normal",
    href: "/treppenhausreinigung-regensburg",
    ctaLabel: "Treppenhausreinigung ansehen",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "regensburg-firmenreinigung",
    title: "Firmenreinigung",
    shortDescription:
      "Für Betriebe, Agenturen, Studios und Gewerbeflächen, bei denen Turnus und Zuständigkeit klar sein müssen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/gewerbereinigung",
    ctaLabel: "Firmenreinigung ansehen",
    googleAdsRelevant: true,
    priority: 6,
  },
  {
    id: "regensburg-hausverwaltung",
    title: "Hausverwaltung-Reinigung",
    shortDescription:
      "Für Treppenhäuser, Allgemeinflächen, Rückmeldungen und feste Ansprechpartner in betreuten Objekten.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Hausverwaltung ansehen",
    googleAdsRelevant: false,
    priority: 7,
  },
  {
    id: "regensburg-kanzleireinigung",
    title: "Kanzleireinigung",
    shortDescription:
      "Diskrete Reinigung für Empfang, Besprechungsräume, Arbeitsplätze und Sanitärbereiche in Kanzleien.",
    region: "regensburg",
    category: "normal",
    href: "/praxisreinigung-regensburg",
    ctaLabel: "Kanzleireinigung ansehen",
    googleAdsRelevant: true,
    priority: 8,
  },
  {
    id: "regensburg-hotelreinigung",
    title: "Hotelreinigung",
    shortDescription:
      "Für öffentliche Bereiche, Nebenflächen und planbare Reinigungsfenster nach Objekt und Auslastung.",
    region: "regensburg",
    category: "normal",
    href: "/hotelreinigung-regensburg",
    ctaLabel: "Hotelreinigung ansehen",
    googleAdsRelevant: true,
    priority: 9,
  },
  {
    id: "regensburg-ladenreinigung",
    title: "Ladenreinigung",
    shortDescription:
      "Für Verkaufsflächen, Showrooms, Schaufensternähe und Reinigungszeiten vor oder nach Öffnung.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Ladenreinigung ansehen",
    googleAdsRelevant: false,
    priority: 10,
  },
  {
    id: "regensburg-gebaeudereinigung",
    title: "Gebäudereinigung",
    shortDescription:
      "Für mehrere Objektbereiche, Nebenflächen, Sanitär, Eingänge und klare Reinigungspläne.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Gebäudereinigung ansehen",
    googleAdsRelevant: true,
    priority: 11,
  },
  {
    id: "regensburg-putzfirma",
    title: "Putzfirma Regensburg",
    shortDescription:
      "Alltagsnaher Einstieg für Wohnung, Büro, Praxis, Auszug und Putzfirma-Angebot in Regensburg.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Putzfirma prüfen",
    googleAdsRelevant: true,
    priority: 11.2,
  },
  {
    id: "regensburg-wohnungsreinigung",
    title: "Wohnungsreinigung",
    shortDescription:
      "Wohnung reinigen lassen, Grundreinigung, Auszug und Übergabe mit Zustand und Fotos prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Wohnung reinigen lassen",
    googleAdsRelevant: true,
    priority: 11.4,
  },
  {
    id: "regensburg-grundreinigung",
    title: "Grundreinigung",
    shortDescription:
      "Stärkere Verschmutzung, Leerstand, Wohnung, Büro oder Objektfläche nach Fotos einschätzen.",
    region: "regensburg",
    category: "normal",
    href: "/grundreinigung-regensburg",
    ctaLabel: "Grundreinigung prüfen",
    googleAdsRelevant: true,
    priority: 11.6,
  },
  {
    id: "regensburg-gewerbeflaechen-reinigung",
    title: "Gewerbeflächen-Reinigung",
    shortDescription:
      "Gewerbeflächen, Laden, Studio, Büro und Nebenflächen nach Raumliste, Turnus und Angebot prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Gewerbefläche prüfen",
    googleAdsRelevant: true,
    priority: 11.8,
  },
  {
    id: "regensburg-reinigung-stadtamhof",
    title: "Reinigung Regensburg-Stadtamhof",
    shortDescription:
      "Lokaler Einstieg für Stadtamhof, Westenviertel, Neutraubling und Umgebung mit Objekt, Fotos und Angebot.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Stadtamhof prüfen",
    googleAdsRelevant: true,
    priority: 12,
  },
  {
    id: "regensburg-premium-reinigung",
    title: "Premium-Reinigung",
    shortDescription:
      "Diskrete Abstimmung für hochwertige Büros, Praxen, Kanzleien, Showrooms und Apartments.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/reinigung",
    ctaLabel: "Premium-Reinigung ansehen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "regensburg-reinigungskonzept",
    title: "Reinigungskonzept als Extra",
    shortDescription:
      "Für Objekte mit mehreren Bereichen, festen Abläufen oder besonderem Abstimmungsbedarf.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/reinigung#kontakt",
    ctaLabel: "Konzept besprechen",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "regensburg-objektbetreuung",
    title: "Objektbetreuung als Extra",
    shortDescription:
      "Für Objekte, bei denen Zugang, Rückmeldung, Turnus und feste Ansprechpartner wichtig sind.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/reinigung",
    ctaLabel: "Objektbetreuung prüfen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "regensburg-schluesseluebergabe",
    title: "Schlüsselübergabe-Reinigung als Extra",
    shortDescription:
      "Für Termine, bei denen Reinigung, Zugang, Rückmeldung und Übergabepunkte zusammenpassen müssen.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/reinigung",
    ctaLabel: "Übergabe reinigen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "regensburg-angebot-vergleichen",
    title: "FLOXANT Angebotsprüfung",
    shortDescription:
      "Angebot, Screenshot oder Eckdaten senden und kostenlos prüfen lassen, ob eine passende Alternative möglich ist.",
    region: "regensburg",
    category: "special",
    href: "/angebot-vergleichen-regensburg",
    ctaLabel: "Angebot prüfen lassen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "regensburg-objektbrief",
    title: "FLOXANT Objektbrief",
    shortDescription:
      "Reinigung mit Ort, Fotos, Zugang, Termin und Budgetrahmen klar vorbereiten.",
    region: "regensburg",
    category: "special",
    href: "/objektbrief#schnellstart",
    ctaLabel: "Objektbrief starten",
    googleAdsRelevant: false,
    priority: 1.5,
  },
  {
    id: "regensburg-fairpreis-check",
    title: "FLOXANT Fairpreis-Check",
    shortDescription:
      "Vorhandenes Angebot nach Umfang, Zugang, Termin, Zusatzpositionen und realistischer Preislogik einordnen.",
    region: "regensburg",
    category: "special",
    href: "/angebot-guenstiger-pruefen",
    ctaLabel: "Fairpreis prüfen",
    googleAdsRelevant: true,
    priority: 1.6,
  },
  {
    id: "regensburg-plan-b-reinigung",
    title: "FLOXANT Plan-B-Reinigung",
    shortDescription:
      "Wenn Reinigung, Anbieter oder Übergabe kippen: Deadline, Fotos, Zugang und Prioritäten schnell sortieren.",
    region: "regensburg",
    category: "special",
    href: "/plan-b-reinigung",
    ctaLabel: "Plan B prüfen",
    googleAdsRelevant: true,
    priority: 1.7,
  },
  {
    id: "regensburg-vermieter-ready",
    title: "FLOXANT Vermieter-Ready-Service",
    shortDescription:
      "Wohnung vor Rückgabe, Besichtigung oder Neuvermietung mit Reinigung, Fotos und Restpunkten vorbereiten.",
    region: "regensburg",
    category: "special",
    href: "/vermieter-ready-service",
    ctaLabel: "Wohnung vorbereiten",
    googleAdsRelevant: false,
    priority: 1.8,
  },
  {
    id: "regensburg-gewerbe-ads",
    title: "Schnellanfrage Gewerbereinigung",
    shortDescription:
      "Direkter Kontaktweg für Unternehmen, Büros, Praxen und Gewerbeobjekte in Regensburg.",
    region: "regensburg",
    category: "special",
    href: "/regensburg/gewerbereinigung",
    ctaLabel: "Kostenlos anfragen",
    googleAdsRelevant: true,
    priority: 2,
  },
  {
    id: "regensburg-premium-ads",
    title: "Diskrete Premium-Anfrage",
    shortDescription:
      "Ruhiger Kontaktweg für hochwertige Objekte, bei denen Abstimmung und Auftreten wichtig sind.",
    region: "regensburg",
    category: "special",
    href: "/regensburg/reinigung",
    ctaLabel: "Diskret anfragen",
    googleAdsRelevant: true,
    priority: 3,
  },
  {
    id: "regensburg-kurzfristig",
    title: "Kurzfristige Reinigung prüfen",
    shortDescription:
      "Wenn ein Termin näher rückt und schnell geklärt werden muss, ob Reinigung realistisch machbar ist.",
    region: "regensburg",
    category: "special",
    href: "/regensburg/reinigung",
    ctaLabel: "Kurzfristig prüfen",
    googleAdsRelevant: true,
    priority: 4,
  },
  {
    id: "regensburg-entsorgung",
    title: "Entsorgung separat prüfen",
    shortDescription:
      "Für kleine Mengen, Keller, Nebenflächen oder Objektbereiche, wenn Reinigung allein nicht ausreicht.",
    region: "regensburg",
    category: "special",
    href: "/firmenentsorgung",
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
    id: "regensburg-umzugsunternehmen",
    title: "Umzugsunternehmen Regensburg",
    shortDescription:
      "Umzugsunternehmen für Start, Ziel, Volumen, Fotos, Zusatzleistungen und Angebotsprüfung in Regensburg.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/umzug",
    ctaLabel: "Umzugsunternehmen prüfen",
    googleAdsRelevant: true,
    priority: 1.1,
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
    id: "regensburg-reinigungsfirma",
    title: "Reinigungsfirma Regensburg",
    shortDescription:
      "Büro, Gewerbe, Wohnung, Endreinigung und Reinigungsangebot nach Objekt und Fotos einordnen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung",
    ctaLabel: "Reinigungsfirma prüfen",
    googleAdsRelevant: true,
    priority: 1.45,
  },
  {
    id: "regensburg-bueroreinigung",
    title: "Büroreinigung Regensburg",
    shortDescription:
      "Büro, Kanzlei, Agentur und Gewerbefläche mit Raumliste, Randzeit, Turnus und Angebot prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/bueroreinigung",
    ctaLabel: "Büroreinigung prüfen",
    googleAdsRelevant: true,
    priority: 1.5,
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
    id: "regensburg-solarreinigung",
    title: "Solarreinigung",
    shortDescription:
      "PV-Anlagen in Regensburg und Umgebung nach Modulfläche, Dachzugang, Wasser und Sicherheit prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/pv-anlagen-reinigung",
    ctaLabel: "PV-Anlage prüfen",
    googleAdsRelevant: true,
    priority: 1.7,
  },
  {
    id: "regensburg-mini-umzug",
    title: "Mini-Umzug",
    shortDescription:
      "WG-Zimmer, kleines Apartment oder wenige Möbel mit Volumen, Laufweg, Etage und Termin klären.",
    region: "regensburg",
    category: "normal",
    href: "/mini-umzug",
    ctaLabel: "Mini-Umzug prüfen",
    googleAdsRelevant: false,
    priority: 1.8,
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
    id: "regensburg-express-umzug",
    title: "Express-Umzug",
    shortDescription:
      "Knapper Umzugstermin, Anbieter-Ausfall oder Übergabe unter Zeitdruck mit realistischer Priorisierung.",
    region: "regensburg",
    category: "normal",
    href: "/express-umzug",
    ctaLabel: "Express prüfen",
    googleAdsRelevant: false,
    priority: 2.1,
  },
  {
    id: "regensburg-moebeltransport",
    title: "Möbeltransport",
    shortDescription:
      "Einzelstücke, Kleintransport oder Abholung mit Maßen, Gewicht, Etage und Strecke sauber einschätzen.",
    region: "regensburg",
    category: "normal",
    href: "/moebeltransport",
    ctaLabel: "Transport prüfen",
    googleAdsRelevant: false,
    priority: 2.2,
  },
  {
    id: "regensburg-kellerentruempelung",
    title: "Kellerentrümpelung",
    shortDescription:
      "Keller, Nebenraum oder Müllraum nach Menge, Feuchtigkeit, Zugang und Entsorgung realistisch prüfen.",
    region: "regensburg",
    category: "normal",
    href: "/kellerentruempelung",
    ctaLabel: "Keller prüfen",
    googleAdsRelevant: false,
    priority: 2.4,
  },
  {
    id: "regensburg-haushaltsaufloesung",
    title: "Haushaltsauflösung",
    shortDescription:
      "Wohnungen und Häuser nach Erbfall, Auszug oder Veränderung ruhig und anhand der Eckdaten klären.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/wohnungsaufloesung",
    ctaLabel: "Haushaltsauflösung ansehen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "regensburg-wohnungsaufloesung",
    title: "Wohnungsauflösung Regensburg",
    shortDescription:
      "Wohnungsauflösung nach Auszug, Nachlass oder Leerstand mit Fotos, Freigabe, Räumung und Reinigung klären.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/wohnungsaufloesung",
    ctaLabel: "Wohnungsauflösung prüfen",
    googleAdsRelevant: true,
    priority: 3.1,
  },
  {
    id: "regensburg-nachlassaufloesung",
    title: "Nachlassauflösung",
    shortDescription:
      "Nachlass, Wohnung, Keller und Freigaben ruhig, respektvoll und ohne falschen Zeitdruck sortieren.",
    region: "regensburg",
    category: "normal",
    href: "/nachlassaufloesung",
    ctaLabel: "Nachlass klären",
    googleAdsRelevant: false,
    priority: 3.2,
  },
  {
    id: "regensburg-lageraufloesung",
    title: "Lagerauflösung",
    shortDescription:
      "Lager, Nebenfläche oder Gewerbebestand nach Materialmix, Laufwegen, Freigabe und Übergabeziel klären.",
    region: "regensburg",
    category: "normal",
    href: "/lageraufloesung",
    ctaLabel: "Lager prüfen",
    googleAdsRelevant: false,
    priority: 3.4,
  },
  {
    id: "regensburg-uebergabereinigung",
    title: "Übergabereinigung",
    shortDescription:
      "Wohnung, Haus oder Gewerbefläche für Vermietertermin, Rückgabe oder Nachnutzung vorbereiten.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/reinigung-nach-umzug",
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
    href: "/regensburg/reinigung-nach-umzug",
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
    href: "/regensburg/reinigung-nach-umzug",
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
    href: "/reinigung-moeblierte-wohnung-regensburg",
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
    href: "/regensburg/reinigung-nach-umzug",
    ctaLabel: "Übergabe prüfen",
    googleAdsRelevant: false,
    priority: 1,
  },
  {
    id: "regensburg-angebot-vergleichen",
    title: "Angebot vergleichen Regensburg",
    shortDescription:
      "Reinigung, Umzug, Entrümpelung oder Wohnungsauflösung nach Umfang, Fotos und Preisrahmen sachlich prüfen.",
    region: "regensburg",
    category: "special",
    href: "/angebot-vergleichen-regensburg",
    ctaLabel: "Angebot vergleichen",
    googleAdsRelevant: true,
    priority: 1.2,
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
    id: "regensburg-fairpreis-check",
    title: "FLOXANT Fairpreis-Check",
    shortDescription:
      "Umzug, Räumung, Reinigung oder Kombi-Angebot sachlich nach Umfang, Aufwand und Preislogik prüfen.",
    region: "regensburg",
    category: "special",
    href: "/angebot-guenstiger-pruefen",
    ctaLabel: "Fairpreis prüfen",
    googleAdsRelevant: false,
    priority: 1.6,
  },
  {
    id: "regensburg-uebergabe-sprint",
    title: "FLOXANT Übergabe-Sprint",
    shortDescription:
      "Kurz vor Rückgabe oder Besichtigung Restmengen, Reinigung, Fotos und Schlüsselweg priorisieren.",
    region: "regensburg",
    category: "special",
    href: "/uebergabe-sprint",
    ctaLabel: "Sprint starten",
    googleAdsRelevant: false,
    priority: 1.7,
  },
  {
    id: "regensburg-vermieter-ready",
    title: "FLOXANT Vermieter-Ready-Service",
    shortDescription:
      "Wohnung für Rückgabe, Neuvermietung oder Besichtigung praktisch vorbereiten und Restpunkte klären.",
    region: "regensburg",
    category: "special",
    href: "/vermieter-ready-service",
    ctaLabel: "Vorbereiten",
    googleAdsRelevant: false,
    priority: 1.8,
  },
  {
    id: "regensburg-plan-b-reinigung",
    title: "FLOXANT Plan-B-Reinigung",
    shortDescription:
      "Wenn Reinigung, Anbieter oder Übergabe wackeln: Deadline, Zugang und Prioritäten schnell prüfen.",
    region: "regensburg",
    category: "special",
    href: "/plan-b-reinigung",
    ctaLabel: "Plan B prüfen",
    googleAdsRelevant: false,
    priority: 1.9,
  },
  {
    id: "regensburg-rueckfahrt-radar",
    title: "FLOXANT Rückfahrt-Radar",
    shortDescription:
      "Beiladung, Leerfahrt oder flexiblen Möbeltransport nach Strecke, Volumen und Zeitfenster prüfen.",
    region: "regensburg",
    category: "special",
    href: "/leerfahrt-rueckfahrt",
    ctaLabel: "Strecke prüfen",
    googleAdsRelevant: false,
    priority: 2.0,
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
    href: "/leerfahrt-rueckfahrt",
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

function isDeprecatedRegensburgCleaningService(service: FloxantServiceSeed) {
  if (service.region !== "regensburg") return false;

  const signal = [
    service.id,
    service.title,
    service.shortTitle,
    service.shortDescription,
    service.href,
    service.ctaLabel,
    ...(service.keywords || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const isCleaningSignal =
    /reinigung|cleaning|putz|gewerbereinigung|bueroreinigung|b\u00fcroreinigung|firmenreinigung|praxisreinigung|endreinigung|grundreinigung|hotelreinigung|treppenhaus|hausverwaltung/.test(signal);

  return isCleaningSignal && !isCleaningRouteAllowed(service.href);
}

export const floxantServices: FloxantService[] = floxantServiceSeeds
  .filter((service) => !isDeprecatedRegensburgCleaningService(service))
  .map((service) => ({
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
