export type GscPriorityLevel = "P0" | "P1" | "P2" | "P3" | "P4";

export type GscInternalAnchor = {
  href: string;
  label: string;
};

export type GscClickPriority = {
  priority: GscPriorityLevel;
  path: string;
  canonical: string;
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  h1: string;
  pageIntent: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  jsonLdTypes: readonly string[];
  internalLinkAnchors: readonly GscInternalAnchor[];
};

const cleaningClusterAnchors = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
  { href: "/reinigungsfirma-angebot", label: "Reinigungsfirma Angebot anfragen" },
] as const;

const seniorMoveAnchors = [
  { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
  { href: "/seniorenumzug-erlangen", label: "Seniorenumzug Erlangen" },
  { href: "/seniorenumzug-bamberg", label: "Seniorenumzug Bamberg" },
  { href: "/umzug-muenchen", label: "Umzug München" },
  { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
] as const;

const landshutCleaningAnchors = [
  { href: "/reinigung-landshut", label: "Reinigung Landshut" },
  { href: "/entruempelung-landshut", label: "Entrümpelung Landshut" },
  { href: "/umzug-landshut", label: "Umzug Landshut" },
  { href: "/reinigungsfirma-angebot", label: "Reinigungsangebot anfragen" },
  { href: "/kontakt", label: "FLOXANT Kontakt" },
] as const;

const landshutClearanceAnchors = [
  { href: "/entruempelung-landshut", label: "Entrümpelung Landshut" },
  { href: "/reinigung-landshut", label: "Reinigung nach Räumung Landshut" },
  { href: "/wohnungsaufloesung-bayern", label: "Wohnungsauflösung Bayern" },
  { href: "/kleinmengen-entsorgung", label: "Kleinmengen Entsorgung" },
  { href: "/angebot-guenstiger-pruefen", label: "Entrümpelungsangebot prüfen" },
] as const;

const bavariaMoveAnchors = [
  { href: "/umzug-vohenstrauss", label: "Umzug Vohenstrauß" },
  { href: "/umzug-neustadt-an-der-waldnaab", label: "Umzug Neustadt an der Waldnaab" },
  { href: "/umzug", label: "Umzug in Bayern" },
  { href: "/reinigung", label: "Reinigung nach Umzug" },
  { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
] as const;

const regensburgMoveAnchors = [
  { href: "/regensburg/umzug", label: "Umzug Regensburg" },
  { href: "/regensburg/umzugsunternehmen", label: "Umzugsunternehmen Regensburg" },
  { href: "/regensburg/umzug-reinigung", label: "Umzug mit Reinigung Regensburg" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung vor Umzug Regensburg" },
  { href: "/angebot-vergleichen-regensburg", label: "Umzugsangebot Regensburg prüfen" },
] as const;

const regensburgClearanceAnchors = [
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
  { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
  { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg Einstieg" },
  { href: "/regensburg/endreinigung", label: "Endreinigung nach Räumung" },
  { href: "/angebot-vergleichen-regensburg", label: "Räumungsangebot prüfen" },
] as const;

const privateClientAnchors = [
  { href: "/private-client-service", label: "Private Client Service" },
  { href: "/diskreter-umzug-trennung-scheidung", label: "Diskreter Umzug" },
  { href: "/nachlass-raeumung-regensburg", label: "Nachlassräumung" },
  { href: "/kontakt", label: "Diskret Kontakt aufnehmen" },
  { href: "/anfrage-mit-preisrahmen", label: "Preisrahmen vertraulich nennen" },
] as const;

const contactAnchors = [
  { href: "/kontakt", label: "FLOXANT Kontakt" },
  { href: "/buchung", label: "Buchung starten" },
  { href: "/rechner", label: "Preisrahmen prüfen" },
  { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
  { href: "/private-client-service", label: "Private Client Anfrage" },
] as const;

export const gscClickPriorities = {
  "/reinigung-landshut": {
    priority: "P0",
    path: "/reinigung-landshut",
    canonical: "/reinigung-landshut",
    title: "Reinigung Landshut | Wohnung, Büro & Übergabe",
    description:
      "Reinigung Landshut für Wohnung, Büro oder Übergabe: Fläche, Zustand, Fotos, Termin und Zielzustand senden. FLOXANT prüft den passenden Ablauf.",
    openGraphTitle: "Reinigung Landshut anfragen",
    openGraphDescription:
      "Wohnung, Büro, Übergabe oder Reinigung nach Räumung in Landshut mit Fotos und Termin einordnen.",
    h1: "Reinigung Landshut mit Fotos, Fläche und Übergabeziel klären",
    pageIntent: "Reinigung in Landshut für Wohnung, Büro, Übergabe oder nach Räumung anfragen",
    primaryKeyword: "reinigung landshut",
    secondaryKeywords: [
      "reinigungsfirma landshut",
      "endreinigung landshut",
      "reinigung nach umzug landshut",
      "reinigungsangebot landshut",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: landshutCleaningAnchors,
  },
  "/entruempelung-landshut": {
    priority: "P0",
    path: "/entruempelung-landshut",
    canonical: "/entruempelung-landshut",
    title: "Entrümpelung Landshut | Räume, Fotos & Angebot",
    description:
      "Entrümpelung Landshut für Wohnung, Keller, Garage oder Restmengen: Fotos, Menge, Zugang, Termin und Reinigung danach sachlich prüfen.",
    openGraphTitle: "Entrümpelung Landshut anfragen",
    openGraphDescription:
      "Räumung in Landshut mit Menge, Zugang, Entsorgung, Zielzustand und optionaler Reinigung klären.",
    h1: "Entrümpelung Landshut für Wohnung, Keller und Restmengen",
    pageIntent: "Entrümpelung in Landshut mit Fotos, Menge und Zielzustand anfragen",
    primaryKeyword: "entruempelung landshut",
    secondaryKeywords: [
      "entrümpelung landshut",
      "wohnung räumen landshut",
      "haushaltsauflösung landshut",
      "entsorgung landshut",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: landshutClearanceAnchors,
  },
  "/umzug-vohenstrauss": {
    priority: "P0",
    path: "/umzug-vohenstrauss",
    canonical: "/umzug-vohenstrauss",
    title: "Umzug Vohenstrauß | kleiner Umzug & Angebot",
    description:
      "Umzug Vohenstrauß für Wohnung, Apartment oder einzelne Möbel: Start, Ziel, Etage, Volumen, Fotos, Termin und Preisrahmen senden.",
    openGraphTitle: "Umzug Vohenstrauß anfragen",
    openGraphDescription:
      "Kleinen oder privaten Umzug in Vohenstrauß mit Umfang, Zugang und Fotos realistisch prüfen lassen.",
    h1: "Umzug Vohenstrauß mit Volumen, Zugang und Termin klären",
    pageIntent: "Umzug in Vohenstrauß für Wohnung, Apartment oder kleine Umzüge anfragen",
    primaryKeyword: "umzug vohenstrauß",
    secondaryKeywords: [
      "umzug vohenstrauss",
      "kleiner umzug vohenstrauß",
      "umzugsangebot vohenstrauß",
      "möbeltransport vohenstrauß",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: bavariaMoveAnchors,
  },
  "/umzug-neustadt-an-der-waldnaab": {
    priority: "P0",
    path: "/umzug-neustadt-an-der-waldnaab",
    canonical: "/umzug-neustadt-an-der-waldnaab",
    title: "Umzug Neustadt a.d. Waldnaab | Angebot prüfen",
    description:
      "Umzug Neustadt an der Waldnaab: Start, Ziel, Möbelmenge, Etage, Laufweg, Termin und Fotos senden. FLOXANT prüft den Ablauf.",
    openGraphTitle: "Umzug Neustadt an der Waldnaab",
    openGraphDescription:
      "Umzugsanfrage mit Volumen, Zugang, Termin und Zusatzbedarf in Neustadt an der Waldnaab vorbereiten.",
    h1: "Umzug Neustadt an der Waldnaab mit Eckdaten sauber anfragen",
    pageIntent: "Umzug in Neustadt an der Waldnaab mit Angebot, Fotos und Termin anfragen",
    primaryKeyword: "umzug neustadt an der waldnaab",
    secondaryKeywords: [
      "umzugsfirma neustadt an der waldnaab",
      "umzugsangebot neustadt an der waldnaab",
      "umzugsservice neustadt waldnaab",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: bavariaMoveAnchors,
  },
  "/private-client-service": {
    priority: "P0",
    path: "/private-client-service",
    canonical: "/private-client-service",
    title: "Private Client Service | Diskret anfragen",
    description:
      "FLOXANT Private Client Service für diskreten Umzug, Reinigung, Räumung und Objektabstimmung: sensible Anfrage persönlich prüfen lassen.",
    openGraphTitle: "FLOXANT Private Client Service",
    openGraphDescription:
      "Diskrete Anfrage für Residenz, Anwesen, Zweitwohnsitz, Nachlass oder sensible Übergabe persönlich einordnen.",
    h1: "Diskreter Private Client Service für sensible Objekte",
    pageIntent: "Private Client Service für diskrete Objektlogistik, Reinigung, Räumung und Umzug anfragen",
    primaryKeyword: "private client service",
    secondaryKeywords: [
      "diskreter umzug",
      "residenzreinigung",
      "diskrete räumung",
      "objektlogistik privat",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: privateClientAnchors,
  },
  "/kontakt": {
    priority: "P0",
    path: "/kontakt",
    canonical: "/kontakt",
    title: "Kontakt | FLOXANT Anfrage stellen",
    description:
      "FLOXANT kontaktieren und Anfrage für Reinigung, Umzug oder Entrümpelung stellen. Bedarf beschreiben und Rückmeldung erhalten.",
    openGraphTitle: "FLOXANT Kontakt",
    openGraphDescription:
      "Telefon, WhatsApp, E-Mail, Buchung, Rechner und Anfragewege für FLOXANT sauber starten.",
    h1: "FLOXANT kontaktieren und Anfrage stellen",
    pageIntent: "Kontakt zu FLOXANT für lokale Dienstleistungsanfragen und Angebotsprüfung aufnehmen",
    primaryKeyword: "floxant kontakt",
    secondaryKeywords: [
      "floxant anfrage",
      "umzug kontakt",
      "reinigung kontakt",
      "angebot prüfen kontakt",
    ],
    jsonLdTypes: ["WebPage", "ContactPage", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: contactAnchors,
  },
  "/duesseldorf/fensterreinigung": {
    priority: "P0",
    path: "/duesseldorf/fensterreinigung",
    canonical: "/duesseldorf/fensterreinigung",
    title: "Fensterreinigung Duesseldorf mit Glas und Zugang",
    description:
      "Fensterreinigung Duesseldorf anfragen: Anzahl, Etage, Innen- oder Aussenseite, Rahmen, Zugang, Fotos, Zeitfenster und Angebot klaeren.",
    openGraphTitle: "Fensterreinigung Duesseldorf anfragen",
    openGraphDescription:
      "Glas, Rahmen, Etage, Zugang und Zeitfenster fuer Fensterreinigung in Duesseldorf strukturiert senden.",
    h1: "Fensterreinigung Duesseldorf mit Glas, Rahmen und Zugang",
    pageIntent: "Fensterreinigung in Duesseldorf mit Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "fensterreinigung duesseldorf",
    secondaryKeywords: ["glasreinigung duesseldorf", "schaufensterreinigung duesseldorf", "fenster putzen lassen duesseldorf"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/duesseldorf/reinigung", label: "Reinigung Duesseldorf" },
      { href: "/duesseldorf/bueroreinigung", label: "Bueroreinigung Duesseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Duesseldorf" },
      { href: "/reinigungsfirma-angebot", label: "Reinigungsangebot klaeren" },
      { href: "/angebot-guenstiger-pruefen", label: "Fensterreinigungsangebot pruefen" },
    ],
  },
  "/duesseldorf/umzug": {
    priority: "P1",
    path: "/duesseldorf/umzug",
    canonical: "/duesseldorf/umzug",
    title: "Umzug Duesseldorf mit Start, Ziel und Angebot klaeren",
    description:
      "Umzug Duesseldorf anfragen: Start, Ziel, Etage, Laufweg, Fotos, Terminwunsch und vorhandenes Angebot vor der Zusage klaeren.",
    openGraphTitle: "Umzug Duesseldorf anfragen",
    openGraphDescription:
      "Umzug in Duesseldorf mit Volumen, Etage, Zugang, Termin und Angebot sauber vorbereiten.",
    h1: "Umzug Duesseldorf mit Start, Ziel und Terminwunsch",
    pageIntent: "Umzug in Duesseldorf mit Angebot, Fotos und Termin anfragen",
    primaryKeyword: "umzug duesseldorf",
    secondaryKeywords: ["umzugsfirma duesseldorf", "umzugsangebot duesseldorf", "umzug mit reinigung duesseldorf"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/duesseldorf/reinigung", label: "Reinigung nach Umzug Duesseldorf" },
      { href: "/duesseldorf/entruempelung", label: "Entruempelung Duesseldorf" },
      { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot pruefen" },
      { href: "/kontakt?service=umzug&city=duesseldorf&intent=umzugsangebot-pruefen&source=seo", label: "Umzugsangebot einordnen" },
    ],
  },
  "/duesseldorf/entruempelung": {
    priority: "P1",
    path: "/duesseldorf/entruempelung",
    canonical: "/duesseldorf/entruempelung",
    title: "Entruempelung Duesseldorf mit Raeumen und Zugang",
    description:
      "Entruempelung Duesseldorf anfragen: Raeume, Menge, Zugang, Fotos, Frist, Entsorgung, Reinigung danach und Angebot strukturiert klaeren.",
    openGraphTitle: "Entruempelung Duesseldorf anfragen",
    openGraphDescription:
      "Raeumung in Duesseldorf mit Fotos, Menge, Zugang, Zielzustand und Anschlussreinigung vorbereiten.",
    h1: "Entruempelung Duesseldorf mit Raeumen, Menge und Zugang",
    pageIntent: "Entruempelung in Duesseldorf mit Menge, Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "entruempelung duesseldorf",
    secondaryKeywords: ["wohnungsaufloesung duesseldorf", "haushaltsaufloesung duesseldorf", "raeumungsangebot duesseldorf"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/duesseldorf/reinigung", label: "Reinigung nach Entruempelung Duesseldorf" },
      { href: "/duesseldorf/haushaltsaufloesung", label: "Haushaltsaufloesung Duesseldorf" },
      { href: "/angebot-guenstiger-pruefen", label: "Entruempelungsangebot pruefen" },
      { href: "/kontakt?service=entruempelung&city=duesseldorf&intent=entruempelungsangebot-pruefen&source=seo", label: "Raeumungsangebot einordnen" },
    ],
  },
  "/klaviertransport-regensburg": {
    priority: "P0",
    path: "/klaviertransport-regensburg",
    canonical: "/klaviertransport-regensburg",
    title: "Klaviertransport Regensburg mit Etage und Zugang klaeren",
    description:
      "Klaviertransport Regensburg vorbereiten: Instrument, Etage, Aufzug, Treppenhaus, Strecke, Haltemoeglichkeit, Fotos und Termin klaeren.",
    openGraphTitle: "Klaviertransport Regensburg vorbereiten",
    openGraphDescription:
      "Instrumententransport in Regensburg mit Fotos, Zugang, Etage, Strecke und Termin vorab einordnen.",
    h1: "Klaviertransport Regensburg mit Instrument, Zugang und Termin",
    pageIntent: "Klaviertransport in Regensburg mit Etage, Zugang, Strecke und Angebot anfragen",
    primaryKeyword: "klaviertransport regensburg",
    secondaryKeywords: ["pianotransport regensburg", "instrumententransport regensburg", "klavier umzug regensburg"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/regensburg/umzug", label: "Umzug Regensburg" },
      { href: "/regensburg/umzug", label: "Umzug in Regensburg" },
      { href: "/angebot-guenstiger-pruefen", label: "Transportangebot pruefen" },
      { href: "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo", label: "Klaviertransport anfragen" },
    ],
  },
  "/solarreinigung": {
    priority: "P1",
    path: "/solarreinigung",
    canonical: "/solarreinigung",
    title: "Solarreinigung mit PV-Fotos, Zugang und Termin klaeren",
    description:
      "Solarreinigung fuer PV-Anlagen vorbereiten: Modulzahl, Zugang, Dachart, Fotos, Verschmutzung, Wasseranschluss, Termin und Angebot klaeren.",
    openGraphTitle: "Solarreinigung anfragen",
    openGraphDescription:
      "PV-Flaeche, Dachzugang, Verschmutzung und Sicherheitsgrenzen fuer Solarreinigung vorab einordnen.",
    h1: "Solarreinigung fuer PV-Anlagen mit sauberer Vorpruefung",
    pageIntent: "Solarreinigung mit PV-Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "solarreinigung",
    secondaryKeywords: ["pv reinigung", "pv anlage reinigen lassen", "solarreinigung angebot"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/pv-anlagen-reinigung", label: "PV-Anlagen-Reinigung" },
      { href: "/angebot-guenstiger-pruefen", label: "Solarreinigungsangebot pruefen" },
      { href: "/duesseldorf/fensterreinigung", label: "Glas und Fensterreinigung Duesseldorf" },
      { href: "/kontakt?service=reinigung&intent=reinigungsangebot-pruefen&source=seo", label: "Reinigungsangebot einordnen" },
    ],
  },
  "/pv-anlagen-reinigung": {
    priority: "P1",
    path: "/pv-anlagen-reinigung",
    canonical: "/pv-anlagen-reinigung",
    title: "PV-Anlagen-Reinigung mit Modulen und Zugang klaeren",
    description:
      "PV-Anlagen-Reinigung anfragen: Module, Dachform, Zugang, Wasseranschluss, Verschmutzung, Fotos, Sicherheitsgrenzen und Angebot klaeren.",
    openGraphTitle: "PV-Anlagen-Reinigung anfragen",
    openGraphDescription:
      "Photovoltaik-Reinigung mit Modulzahl, Dachzugang, Fotos und Sicherheitsgrenzen vorbereiten.",
    h1: "PV-Anlagen-Reinigung mit Modulen, Zugang und Fotos",
    pageIntent: "PV-Anlagen-Reinigung mit Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "pv-anlagen-reinigung",
    secondaryKeywords: ["photovoltaik reinigung", "pv module reinigen", "pv reinigung angebot"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/solarreinigung", label: "Solarreinigung" },
      { href: "/angebot-guenstiger-pruefen", label: "PV-Angebot pruefen" },
      { href: "/kontakt?service=reinigung&intent=reinigungsangebot-pruefen&source=seo", label: "PV-Reinigung anfragen" },
    ],
  },
  "/duesseldorf": {
    priority: "P2",
    path: "/duesseldorf",
    canonical: "/duesseldorf",
    title: "FLOXANT Düsseldorf | Reinigung & Angebot prüfen",
    description:
      "FLOXANT Düsseldorf: Reinigungsfirma, Büroreinigung, Gewerbereinigung, Grundreinigung und Reinigungsangebot mit Stadtteil, Fotos und Termin prüfen.",
    openGraphTitle: "FLOXANT Düsseldorf",
    openGraphDescription:
      "Düsseldorfer Reinigungsanfragen nach Objekt, Stadtteil, Fläche, Fotos und Angebot sauber sortieren.",
    h1: "FLOXANT Düsseldorf für Reinigung und Angebotsprüfung",
    pageIntent: "Düsseldorf-Hub für Reinigung, Büroreinigung, Gewerbereinigung und Angebotsprüfung",
    primaryKeyword: "floxant düsseldorf",
    secondaryKeywords: [
      "reinigung düsseldorf",
      "reinigungsfirma düsseldorf",
      "büroreinigung düsseldorf",
      "gewerbereinigung düsseldorf",
    ],
    jsonLdTypes: ["WebPage", "LocalBusiness", "BreadcrumbList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/b2b-reinigung": {
    priority: "P0",
    path: "/duesseldorf/b2b-reinigung",
    canonical: "/duesseldorf/bueroreinigung",
    title: "B2B Büroreinigung Düsseldorf | Firmenangebot anfragen",
    description:
      "B2B Büroreinigung Düsseldorf für Unternehmen: Fläche, Turnus, Zeitfenster, Zugang und Fotos senden. FLOXANT prüft die Anfrage sachlich.",
    openGraphTitle: "B2B Büroreinigung Düsseldorf",
    openGraphDescription:
      "Büro, Praxis, Kanzlei oder Gewerbeobjekt in Düsseldorf mit klaren Eckdaten anfragen.",
    h1: "B2B Büroreinigung Düsseldorf für Firmen, Praxen und Büros",
    pageIntent: "B2B-Büroreinigung in Düsseldorf mit Angebot für Gewerbekunden anfragen",
    primaryKeyword: "b2b büroreinigung",
    secondaryKeywords: [
      "büroreinigung firma",
      "büroreinigung für unternehmen",
      "büroreinigung düsseldorf",
      "firma für büroreinigung",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/bueroreinigung": {
    priority: "P0",
    path: "/duesseldorf/bueroreinigung",
    canonical: "/duesseldorf/bueroreinigung",
    title: "Bueroreinigung Duesseldorf mit Raumliste und Angebot",
    description:
      "Bueroreinigung Duesseldorf fuer Buero, Kanzlei, Praxis und Gewerbe: Flaeche, Raumliste, Turnus, Zeitfenster und Angebot klaeren.",
    openGraphTitle: "Büroreinigung Düsseldorf anfragen",
    openGraphDescription:
      "FLOXANT ordnet Büroreinigung in Düsseldorf nach Objekt, Turnus, Fläche und Zeitfenster ein.",
    h1: "Büroreinigung Düsseldorf mit klarer Angebotsanfrage",
    pageIntent: "Büroreinigung in Düsseldorf für Firmen und Gewerbe anfragen",
    primaryKeyword: "büroreinigung düsseldorf",
    secondaryKeywords: [
      "büro reinigen düsseldorf",
      "firma büroreinigung düsseldorf",
      "reinigungsfirma büro düsseldorf",
      "büroreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/seniorenumzug-bayern": {
    priority: "P0",
    path: "/seniorenumzug-bayern",
    canonical: "/seniorenumzug-bayern",
    title: "Umzug im Alter Bayern | Senioren-Umzug ruhig planen",
    description:
      "Umzug im Alter in Bayern: Möbel, Kartons, Rückruf, Angehörige, Reinigung und Übergabe ruhig abstimmen und Anfrage mit Fotos senden.",
    openGraphTitle: "Umzug im Alter Bayern",
    openGraphDescription:
      "Seniorenumzug in Bayern mit ruhiger Abstimmung, Fotos, Rückruf und klaren nächsten Schritten.",
    h1: "Umzug im Alter in Bayern ruhig und planbar anfragen",
    pageIntent: "Seniorenumzug und Umzug im Alter in Bayern anfragen",
    primaryKeyword: "umzug im alter bayern",
    secondaryKeywords: [
      "seniorenumzug bayern",
      "umzugshelfer senioren bayern",
      "umzugshelfer für senioren bayern",
      "umzug für senioren bayern",
      "senioren umzug bayern",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: seniorMoveAnchors,
  },
  "/seniorenumzug-erlangen": {
    priority: "P0",
    path: "/seniorenumzug-erlangen",
    canonical: "/seniorenumzug-erlangen",
    title: "Umzug im Alter Erlangen | Senioren-Umzug anfragen",
    description:
      "Seniorenumzug Erlangen: Angehörige, Möbel, Etage, Aufzug, Fotos, Reinigung und Übergabe ruhig klären. FLOXANT prüft den nächsten Schritt.",
    openGraphTitle: "Seniorenumzug Erlangen",
    openGraphDescription:
      "Umzug im Alter in Erlangen mit Rückruf, Fotos und klarer Vorbereitung anfragen.",
    h1: "Seniorenumzug Erlangen: Umzug im Alter ruhig vorbereiten",
    pageIntent: "Umzug im Alter und Umzugshelfer für Senioren in Erlangen anfragen",
    primaryKeyword: "umzug im alter erlangen",
    secondaryKeywords: [
      "seniorenumzug erlangen",
      "umzugshelfer senioren erlangen",
      "umzugshelfer für senioren erlangen",
      "umzug für senioren erlangen",
      "senioren umzug erlangen",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: seniorMoveAnchors,
  },
  "/seniorenumzug-bamberg": {
    priority: "P0",
    path: "/seniorenumzug-bamberg",
    canonical: "/seniorenumzug-bamberg",
    title: "Umzug im Alter Bamberg | Senioren-Umzug anfragen",
    description:
      "Seniorenumzug Bamberg: Rückruf, Angehörige, Möbelumfang, Etage, Fotos und Übergabe strukturiert klären. FLOXANT prüft die Anfrage.",
    openGraphTitle: "Seniorenumzug Bamberg",
    openGraphDescription:
      "Umzug im Alter in Bamberg mit ruhiger Abstimmung und praktischer Vorbereitung.",
    h1: "Seniorenumzug Bamberg für Umzug im Alter",
    pageIntent: "Seniorenumzug und Umzug im Alter in Bamberg anfragen",
    primaryKeyword: "umzug im alter bamberg",
    secondaryKeywords: [
      "seniorenumzug bamberg",
      "umzugshelfer senioren bamberg",
      "umzugshelfer für senioren bamberg",
      "umzug für senioren bamberg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: seniorMoveAnchors,
  },
  "/fernumzug-muenchen": {
    priority: "P0",
    path: "/fernumzug-muenchen",
    canonical: "/fernumzug-muenchen",
    title: "Fernumzug München | Strecke & Angebot anfragen",
    description:
      "Fernumzug München: Start, Ziel, Ladevolumen, Etage, Haltezone, Termin und Fotos senden. FLOXANT prüft Strecke und Zusatzleistungen.",
    openGraphTitle: "Fernumzug München planen",
    openGraphDescription:
      "Längere Strecke aus oder nach München mit Volumen, Zugang, Termin und Rückfahrt prüfen lassen.",
    h1: "Fernumzug München: Strecke, Volumen und Termin sauber anfragen",
    pageIntent: "Fernumzug aus oder nach München mit Strecke, Volumen und Angebot anfragen",
    primaryKeyword: "fernumzug münchen",
    secondaryKeywords: [
      "umzug münchen fernumzug",
      "umzug von münchen",
      "umzug nach münchen",
      "umzugsangebot münchen prüfen",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/umzug-muenchen", label: "Umzug München" },
      { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
      { href: "/reinigung-muenchen", label: "Reinigung nach Umzug München" },
      { href: "/bueroumzug-muenchen", label: "Büroumzug München" },
      { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
    ],
  },
  "/entruempelung-nuernberg": {
    priority: "P0",
    path: "/entruempelung-nuernberg",
    canonical: "/entruempelung-nuernberg",
    title: "Praxisentrümpelung Nürnberg | Räume & Angebot prüfen",
    description:
      "Praxisentrümpelung Nürnberg: Praxisräume, Möbel, Technik, Akten, Freigabe, Fotos, Entsorgung und Reinigung danach prüfen.",
    openGraphTitle: "Praxisentrümpelung Nürnberg",
    openGraphDescription:
      "Entrümpelung für Praxisräume in Nürnberg mit Fotos, Freigabe, Entsorgung und Anschlussreinigung einordnen.",
    h1: "Praxisentrümpelung Nürnberg über Entrümpelung klar anfragen",
    pageIntent: "Praxisentrümpelung in Nürnberg über die bestehende Entrümpelungsseite anfragen",
    primaryKeyword: "praxisentrümpelung nürnberg",
    secondaryKeywords: [
      "praxis räumen nürnberg",
      "entrümpelung praxis nürnberg",
      "praxisauflösung nürnberg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/entruempelung-nuernberg", label: "Entrümpelung Nürnberg" },
      { href: "/entruempelung", label: "Entrümpelung" },
      { href: "/firmenentsorgung", label: "Firmenentsorgung" },
      { href: "/reinigung-nach-veranstaltung", label: "Reinigung nach Sonderfall" },
      { href: "/angebot-guenstiger-pruefen", label: "Entsorgungsangebot prüfen" },
    ],
  },
  "/gewerbereinigung": {
    priority: "P0",
    path: "/gewerbereinigung",
    canonical: "/gewerbereinigung",
    title: "Gewerbereinigung | Büro, Praxis & Objekt anfragen",
    description:
      "Gewerbereinigung für Büro, Praxis, Kanzlei, Hotel und Objekt: Fläche, Turnus, Zeitfenster, Zugang und Fotos strukturiert senden.",
    openGraphTitle: "Gewerbereinigung anfragen",
    openGraphDescription:
      "Objekt, Fläche, Turnus und Zeitfenster für Büro, Praxis, Hotel oder Gewerbe sauber einordnen.",
    h1: "Gewerbereinigung für Büro, Praxis und Objekt anfragen",
    pageIntent: "Gewerbereinigung für gewerbliche Objekte anfragen",
    primaryKeyword: "gewerbereinigung",
    secondaryKeywords: [
      "gewerbereinigung angebot",
      "büroreinigung",
      "praxisreinigung",
      "objektreinigung",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/reinigungsfirma-angebot", label: "Reinigungsfirma Angebot" },
    ],
  },
  "/reinigungsfirma-angebot": {
    priority: "P1",
    path: "/reinigungsfirma-angebot",
    canonical: "/reinigungsfirma-angebot",
    title: "Reinigungsfirma Angebot mit Objekt und Turnus klaeren",
    description:
      "Reinigungsfirma Angebot vorbereiten: Objekt, Flaeche, Turnus, Zustand, Fotos und Termin senden, damit offene Punkte vor Zusage klar sind.",
    openGraphTitle: "Reinigungsfirma Angebot anfragen",
    openGraphDescription:
      "Reinigungsangebot für Büro, Praxis, Wohnung, Grundreinigung oder Treppenhaus mit klaren Eckdaten vorbereiten.",
    h1: "Reinigungsfirma Angebot anfragen: Objekt, Fläche und Termin klar senden",
    pageIntent: "Angebot für Reinigungsfirma, Reinigung oder Reinigungsarbeiten anfragen",
    primaryKeyword: "reinigungsfirma angebot",
    secondaryKeywords: [
      "angebot reinigung",
      "angebot für reinigungsarbeiten",
      "reinigungsangebot",
      "reinigungsfirma kosten anfragen",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/reinigung": {
    priority: "P1",
    path: "/duesseldorf/reinigung",
    canonical: "/duesseldorf/reinigung",
    title: "Reinigung Duesseldorf mit Objekt und Angebot klaeren",
    description:
      "Reinigung Duesseldorf fuer Wohnung, Buero, Praxis, Treppenhaus oder Grundreinigung: Fotos, Flaeche, Termin und Angebot klar senden.",
    openGraphTitle: "Reinigung Düsseldorf",
    openGraphDescription:
      "Passende Reinigungsseite in Düsseldorf nach Objekt, Fläche, Zustand und Termin auswählen.",
    h1: "Reinigung Düsseldorf für Wohnung, Büro, Praxis und Objekt",
    pageIntent: "Reinigungsfirma oder Reinigungsdienst in Düsseldorf anfragen",
    primaryKeyword: "reinigung düsseldorf",
    secondaryKeywords: [
      "reinigungsfirma düsseldorf",
      "reinigungsdienst düsseldorf",
      "putzfirma düsseldorf",
      "reinigungsangebot düsseldorf",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/praxisreinigung": {
    priority: "P1",
    path: "/duesseldorf/praxisreinigung",
    canonical: "/duesseldorf/praxisreinigung",
    title: "Praxisreinigung Düsseldorf | Praxis & Angebot",
    description:
      "Praxisreinigung Düsseldorf: Empfang, Wartebereich, Sanitär, Büroflächen, Turnus, Zeitfenster und Fotos für ein Angebot senden.",
    openGraphTitle: "Praxisreinigung Düsseldorf",
    openGraphDescription:
      "Praxisräume in Düsseldorf mit Turnus, Zeitfenster, Flächen und Leistungsgrenzen anfragen.",
    h1: "Praxisreinigung Düsseldorf für Praxisräume und Empfang",
    pageIntent: "Praxisreinigung in Düsseldorf anfragen",
    primaryKeyword: "praxisreinigung düsseldorf",
    secondaryKeywords: [
      "praxis reinigung düsseldorf",
      "arztpraxis reinigung düsseldorf",
      "praxisreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/hotelreinigung": {
    priority: "P1",
    path: "/duesseldorf/hotelreinigung",
    canonical: "/duesseldorf/hotelreinigung",
    title: "Hotelreinigung Düsseldorf | Objekt & Turnus anfragen",
    description:
      "Hotelreinigung Düsseldorf für Hotel, Pension, Lobby, Flure und Zimmer: Turnus, Check-out-Zeitfenster, Zugang und Fotos senden.",
    openGraphTitle: "Hotelreinigung Düsseldorf",
    openGraphDescription:
      "Hotel, Boardinghouse oder Pension in Düsseldorf mit Turnus und Objektangaben anfragen.",
    h1: "Hotelreinigung Düsseldorf für Hotel, Lobby und Zimmerbereiche",
    pageIntent: "Hotelreinigung in Düsseldorf anfragen",
    primaryKeyword: "hotelreinigung düsseldorf",
    secondaryKeywords: [
      "hotel reinigung düsseldorf",
      "hotelreinigung angebot",
      "reinigung hotel düsseldorf",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/grundreinigung": {
    priority: "P1",
    path: "/duesseldorf/grundreinigung",
    canonical: "/duesseldorf/grundreinigung",
    title: "Grundreinigung Düsseldorf | Wohnung & Objekt",
    description:
      "Grundreinigung Düsseldorf für Wohnung, Büro, Boden, Küche, Bad und starke Verschmutzung: Zustand, Fläche, Fotos und Termin senden.",
    openGraphTitle: "Grundreinigung Düsseldorf",
    openGraphDescription:
      "Grundreinigung nach Auszug, vor Übergabe oder für Objektflächen in Düsseldorf einordnen.",
    h1: "Grundreinigung Düsseldorf für Wohnung, Büro und Objekt",
    pageIntent: "Grundreinigung in Düsseldorf anfragen",
    primaryKeyword: "grundreinigung düsseldorf",
    secondaryKeywords: [
      "wohnung grundreinigung düsseldorf",
      "büro grundreinigung düsseldorf",
      "grundreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/wohnungsreinigung": {
    priority: "P1",
    path: "/duesseldorf/wohnungsreinigung",
    canonical: "/duesseldorf/wohnungsreinigung",
    title: "Wohnungsreinigung Düsseldorf | Wohnung reinigen lassen",
    description:
      "Wohnungsreinigung Düsseldorf für Auszug, Einzug, Übergabe oder Privathaushalt: Räume, Zustand, Fotos und Termin klar senden.",
    openGraphTitle: "Wohnungsreinigung Düsseldorf",
    openGraphDescription:
      "Wohnung in Düsseldorf reinigen lassen mit Räumen, Zustand, Termin und Fotos.",
    h1: "Wohnungsreinigung Düsseldorf für Auszug, Einzug und Übergabe",
    pageIntent: "Wohnungsreinigung in Düsseldorf anfragen",
    primaryKeyword: "wohnungsreinigung düsseldorf",
    secondaryKeywords: [
      "wohnung reinigen lassen düsseldorf",
      "reinigungsfirma düsseldorf privathaushalt",
      "putzfrau düsseldorf anfragen",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/treppenhausreinigung": {
    priority: "P1",
    path: "/duesseldorf/treppenhausreinigung",
    canonical: "/duesseldorf/treppenhausreinigung",
    title: "Treppenhausreinigung Düsseldorf | Hausverwaltung",
    description:
      "Treppenhausreinigung Düsseldorf für Hausverwaltung, WEG und Mietshaus: Etagen, Turnus, Zugang, Eingänge und Fotos senden.",
    openGraphTitle: "Treppenhausreinigung Düsseldorf",
    openGraphDescription:
      "Treppenhaus, Eingänge, Aufzug und Turnus in Düsseldorf für Hausverwaltungen einordnen.",
    h1: "Treppenhausreinigung Düsseldorf für Hausverwaltung und WEG",
    pageIntent: "Treppenhausreinigung in Düsseldorf anfragen",
    primaryKeyword: "treppenhausreinigung düsseldorf",
    secondaryKeywords: [
      "reinigung treppenhaus düsseldorf",
      "hausverwaltung reinigung düsseldorf",
      "treppenhausreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/duesseldorf/gewerbereinigung": {
    priority: "P1",
    path: "/duesseldorf/gewerbereinigung",
    canonical: "/duesseldorf/gewerbereinigung",
    title: "Gewerbereinigung Duesseldorf fuer Buero und Objekt",
    description:
      "Gewerbereinigung Duesseldorf fuer Buero, Praxis, Kanzlei, Hotel und Objekt: Flaeche, Turnus, Zeitfenster, Zugang und Fotos senden.",
    openGraphTitle: "Gewerbereinigung Düsseldorf",
    openGraphDescription:
      "Gewerbeobjekte in Düsseldorf mit Fläche, Turnus und Zeitfenster anfragen.",
    h1: "Gewerbereinigung Düsseldorf für Büro, Praxis und Objekt",
    pageIntent: "Gewerbereinigung in Düsseldorf anfragen",
    primaryKeyword: "gewerbereinigung düsseldorf",
    secondaryKeywords: [
      "objektreinigung düsseldorf",
      "firmenreinigung düsseldorf",
      "büroreinigung düsseldorf",
      "praxisreinigung düsseldorf",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/regensburg/umzug": {
    priority: "P2",
    path: "/regensburg/umzug",
    canonical: "/regensburg/umzug",
    title: "Umzug Regensburg | Fotos senden, Angebot klären",
    description:
      "Umzug Regensburg mit Start, Ziel, Etage, Volumen, Laufweg, Fotos und Termin anfragen. Reinigung, Restmengen oder Angebot mitprüfen.",
    openGraphTitle: "Umzug Regensburg anfragen",
    openGraphDescription:
      "City-first Umzugsseite für Regensburg mit Fotos, Zugang, Zusatzleistungen und Angebotsprüfung.",
    h1: "Umzug Regensburg mit Volumen, Zugang und Termin klären",
    pageIntent: "City-first Umzugsanfrage in Regensburg mit Fotos, Angebot und Zusatzbedarf",
    primaryKeyword: "umzug regensburg",
    secondaryKeywords: [
      "umzugsfirma regensburg",
      "umzugsunternehmen regensburg",
      "umzugsangebot regensburg",
      "umzug mit reinigung regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: regensburgMoveAnchors,
  },
  "/regensburg/entruempelung": {
    priority: "P2",
    path: "/regensburg/entruempelung",
    canonical: "/regensburg/entruempelung",
    title: "Entrümpelung Regensburg | Räume & Angebot klären",
    description:
      "Entrümpelung Regensburg für Wohnung, Keller, Garage oder Objekt: Menge, Zugang, Fotos, Entsorgung, Reinigung danach und Termin prüfen.",
    openGraphTitle: "Entrümpelung Regensburg anfragen",
    openGraphDescription:
      "City-first Entrümpelung in Regensburg mit Räumen, Menge, Freigabe und gewünschtem Endzustand.",
    h1: "Entrümpelung Regensburg mit Fotos, Menge und Zielzustand",
    pageIntent: "City-first Entrümpelung in Regensburg für Wohnung, Keller oder Objekt anfragen",
    primaryKeyword: "entrümpelung regensburg",
    secondaryKeywords: [
      "entruempelung regensburg",
      "wohnung räumen regensburg",
      "keller räumen regensburg",
      "räumungsangebot regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: regensburgClearanceAnchors,
  },
  "/regensburg/wohnungsaufloesung": {
    priority: "P2",
    path: "/regensburg/wohnungsaufloesung",
    canonical: "/regensburg/wohnungsaufloesung",
    title: "Wohnungsauflösung Regensburg | Räume klären",
    description:
      "Wohnungsauflösung Regensburg für Auszug, Nachlass oder Leerstand: Räume, Fotos, Freigabe, Entsorgung, Reinigung und Zielzustand prüfen.",
    openGraphTitle: "Wohnungsauflösung Regensburg",
    openGraphDescription:
      "City-first Wohnungsauflösung in Regensburg mit Freigabe, Räumung, Entsorgung und optionaler Reinigung.",
    h1: "Wohnungsauflösung Regensburg ruhig und strukturiert klären",
    pageIntent: "City-first Wohnungsauflösung in Regensburg für Nachlass, Auszug und Leerstand anfragen",
    primaryKeyword: "wohnungsauflösung regensburg",
    secondaryKeywords: [
      "hausauflösung regensburg",
      "haushaltsauflösung regensburg",
      "wohnung auflösen regensburg",
      "nachlass räumung regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: regensburgClearanceAnchors,
  },
  "/umzug-muenchen": {
    priority: "P1",
    path: "/umzug-muenchen",
    canonical: "/umzug-muenchen",
    title: "Umzug München | Privatumzug, Fernumzug & Angebot",
    description:
      "Umzug München für Privat, Büro oder Fernstrecke: Start, Ziel, Volumen, Etage, Haltezone, Fotos, Termin und Angebot prüfen lassen.",
    openGraphTitle: "Umzug München anfragen",
    openGraphDescription:
      "Privatumzug, Fernumzug, Büroumzug und Reinigung nach Umzug in München sauber einordnen.",
    h1: "Umzug München mit Volumen, Termin und Angebot sauber anfragen",
    pageIntent: "Umzug in München mit Privatumzug, Fernumzug und Angebot anfragen",
    primaryKeyword: "umzug münchen",
    secondaryKeywords: [
      "privatumzug münchen",
      "fernumzug münchen",
      "umzugsangebot münchen prüfen",
      "umzug münchen festpreis",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/fernumzug-muenchen", label: "Fernumzug München" },
      { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot München prüfen" },
      { href: "/reinigung-muenchen", label: "Reinigung nach Umzug München" },
      { href: "/bueroumzug-muenchen", label: "Büroumzug München" },
      { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
    ],
  },
  "/reinigung-muenchen": {
    priority: "P1",
    path: "/reinigung-muenchen",
    canonical: "/reinigung-muenchen",
    title: "Reinigung München | Wohnung, Übergabe & Angebot",
    description:
      "Reinigung München nach Umzug, vor Übergabe oder für Wohnung: Räume, Zustand, Fotos, Termin und Angebot strukturiert senden.",
    openGraphTitle: "Reinigung München anfragen",
    openGraphDescription:
      "Endreinigung, Wohnungsreinigung oder Reinigung nach Umzug in München einordnen.",
    h1: "Reinigung München für Wohnung, Auszug und Übergabe",
    pageIntent: "Reinigung in München nach Umzug oder vor Übergabe anfragen",
    primaryKeyword: "reinigung münchen",
    secondaryKeywords: [
      "endreinigung münchen",
      "wohnungsreinigung münchen",
      "reinigung nach umzug münchen",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/umzug-muenchen", label: "Umzug München" },
      { href: "/fernumzug-muenchen", label: "Fernumzug München" },
      { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung" },
      { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
    ],
  },
  "/regensburg/umzugsunternehmen": {
    priority: "P2",
    path: "/regensburg/umzugsunternehmen",
    canonical: "/regensburg/umzugsunternehmen",
    title: "Umzugsunternehmen Regensburg mit Angebot und Termin",
    description:
      "Umzugsunternehmen Regensburg anfragen: Volumen, Strecke, Etage, Laufweg, Fotos, Termin und Zusatzleistungen vorab klaeren.",
    openGraphTitle: "Umzugsunternehmen Regensburg",
    openGraphDescription:
      "Umzugsfirma in Regensburg mit klarer Anfrage, Fotos und Preisrahmen vorbereiten.",
    h1: "Umzugsunternehmen Regensburg mit Angebot nach Prüfung",
    pageIntent: "Umzugsunternehmen in Regensburg anfragen",
    primaryKeyword: "umzugsunternehmen regensburg",
    secondaryKeywords: [
      "umzugsfirma regensburg",
      "umzugsservice regensburg",
      "umzugsangebot regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "FAQPage"],
    internalLinkAnchors: [
      { href: "/regensburg/umzug", label: "Umzug Regensburg" },
      { href: "/regensburg/umzug-kosten", label: "Umzugskosten Regensburg" },
      { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
      { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
    ],
  },
} as const satisfies Record<string, GscClickPriority>;

export type SeoMoneyPage = {
  path: string;
  canonicalPath: string;
  service: string;
  city: string;
  intent: string;
  priority: GscPriorityLevel;
  targetQueries: readonly string[];
  expectedTitleIncludes: readonly string[];
  expectedH1Includes: readonly string[];
  expectedSchemaTypes: readonly string[];
  expectedCtaEvent: "seo_cta_click";
  expectedRelatedLinks: readonly string[];
  language: "de" | "fa";
  shouldBeInSitemap: boolean;
  shouldBeIndexable: boolean;
};

const monitoredMoneyPageTargets = [
  { path: "/reinigung-landshut", priorityPath: "/reinigung-landshut" },
  { path: "/entruempelung-landshut", priorityPath: "/entruempelung-landshut" },
  { path: "/umzug-vohenstrauss", priorityPath: "/umzug-vohenstrauss" },
  { path: "/umzug-neustadt-an-der-waldnaab", priorityPath: "/umzug-neustadt-an-der-waldnaab" },
  { path: "/duesseldorf/reinigung", priorityPath: "/duesseldorf/reinigung" },
  { path: "/duesseldorf/bueroreinigung", priorityPath: "/duesseldorf/bueroreinigung" },
  { path: "/duesseldorf/gewerbereinigung", priorityPath: "/duesseldorf/gewerbereinigung" },
  { path: "/regensburg/umzug", priorityPath: "/regensburg/umzug" },
  { path: "/regensburg/entruempelung", priorityPath: "/regensburg/entruempelung" },
  { path: "/regensburg/wohnungsaufloesung", priorityPath: "/regensburg/wohnungsaufloesung" },
  { path: "/reinigung-muenchen", priorityPath: "/reinigung-muenchen" },
  { path: "/private-client-service", priorityPath: "/private-client-service" },
  { path: "/kontakt", priorityPath: "/kontakt" },
  { path: "/reinigungsfirma-angebot", priorityPath: "/reinigungsfirma-angebot" },
] as const;

const monitoredMoneyPageContext = {
  "/reinigung-landshut": {
    service: "reinigung",
    city: "landshut",
    intent: "lokale Reinigungsanfrage mit Fotos, Termin und Zielzustand",
    expectedRelatedLinks: ["/entruempelung-landshut", "/reinigungsfirma-angebot", "/kontakt"],
  },
  "/entruempelung-landshut": {
    service: "entruempelung",
    city: "landshut",
    intent: "lokale Entruempelungsanfrage mit Menge, Zugang und Reinigung danach",
    expectedRelatedLinks: ["/reinigung-landshut", "/wohnungsaufloesung-bayern", "/angebot-guenstiger-pruefen"],
  },
  "/umzug-vohenstrauss": {
    service: "umzug",
    city: "vohenstrauss",
    intent: "lokale Umzugsanfrage mit Volumen, Zugang und Termin",
    expectedRelatedLinks: ["/umzug-neustadt-an-der-waldnaab", "/umzug", "/angebot-guenstiger-pruefen"],
  },
  "/umzug-neustadt-an-der-waldnaab": {
    service: "umzug",
    city: "neustadt-an-der-waldnaab",
    intent: "lokale Umzugsanfrage mit Strecke, Umfang und Zugang",
    expectedRelatedLinks: ["/umzug-vohenstrauss", "/umzug", "/angebot-guenstiger-pruefen"],
  },
  "/duesseldorf/reinigung": {
    service: "reinigung",
    city: "duesseldorf",
    intent: "Reinigungsfirma in Duesseldorf fuer Wohnung, Objekt und Angebot",
    expectedRelatedLinks: ["/duesseldorf/bueroreinigung", "/duesseldorf/gewerbereinigung", "/reinigungsfirma-angebot"],
  },
  "/duesseldorf/bueroreinigung": {
    service: "bueroreinigung",
    city: "duesseldorf",
    intent: "Bueroreinigung in Duesseldorf fuer Firmen und Gewerbekunden",
    expectedRelatedLinks: ["/duesseldorf/reinigung", "/duesseldorf/gewerbereinigung", "/reinigungsfirma-angebot"],
  },
  "/duesseldorf/gewerbereinigung": {
    service: "gewerbereinigung",
    city: "duesseldorf",
    intent: "Gewerbereinigung in Duesseldorf fuer Buero, Praxis und Objekt",
    expectedRelatedLinks: ["/duesseldorf/reinigung", "/duesseldorf/bueroreinigung", "/kontakt"],
  },
  "/regensburg/umzug": {
    service: "umzug",
    city: "regensburg",
    intent: "City-first Umzugsanfrage in Regensburg",
    expectedRelatedLinks: ["/regensburg/entruempelung", "/regensburg/wohnungsaufloesung", "/angebot-vergleichen-regensburg"],
  },
  "/regensburg/entruempelung": {
    service: "entruempelung",
    city: "regensburg",
    intent: "City-first Entruempelung in Regensburg",
    expectedRelatedLinks: ["/regensburg/wohnungsaufloesung", "/regensburg/umzug", "/angebot-vergleichen-regensburg"],
  },
  "/regensburg/wohnungsaufloesung": {
    service: "wohnungsaufloesung",
    city: "regensburg",
    intent: "City-first Wohnungsaufloesung in Regensburg",
    expectedRelatedLinks: ["/regensburg/entruempelung", "/regensburg/umzug", "/angebot-vergleichen-regensburg"],
  },
  "/reinigung-muenchen": {
    service: "reinigung",
    city: "muenchen",
    intent: "Reinigung in Muenchen nach Umzug, vor Uebergabe oder fuer Wohnung",
    expectedRelatedLinks: ["/umzug-muenchen", "/reinigungsfirma-angebot", "/anfrage-mit-preisrahmen"],
  },
  "/private-client-service": {
    service: "private-client",
    city: "bayern",
    intent: "diskrete sensible Anfrage fuer private Objekte",
    expectedRelatedLinks: ["/diskreter-umzug-trennung-scheidung", "/nachlass-raeumung-regensburg", "/kontakt"],
  },
  "/kontakt": {
    service: "kontakt",
    city: "regensburg",
    intent: "Kontakt und Conversion-Ziel fuer Anfrage, Rueckruf und Formular",
    expectedRelatedLinks: ["/buchung", "/rechner", "/private-client-service"],
  },
  "/reinigungsfirma-angebot": {
    service: "reinigung",
    city: "deutschland",
    intent: "Angebot fuer Reinigungsfirma mit Objekt, Flaeche und Termin anfragen",
    expectedRelatedLinks: ["/duesseldorf/reinigung", "/duesseldorf/gewerbereinigung", "/kontakt"],
  },
} as const;

export const seoMoneyPages = monitoredMoneyPageTargets.map((target) => {
  const priority = gscClickPriorities[target.priorityPath as keyof typeof gscClickPriorities];
  const context = monitoredMoneyPageContext[target.priorityPath as keyof typeof monitoredMoneyPageContext];
  const language: SeoMoneyPage["language"] = "language" in target && (target.language === "de" || target.language === "fa") ? target.language : "de";

  return {
    path: target.path,
    canonicalPath: priority.canonical,
    service: context.service,
    city: context.city,
    intent: context.intent,
    priority: priority.priority,
    targetQueries: [priority.primaryKeyword, ...priority.secondaryKeywords],
    expectedTitleIncludes: priority.title
      .split(/[\s|,&]+/)
      .filter((token) => token.length >= 5)
      .slice(0, 4),
    expectedH1Includes: priority.h1
      .split(/[\s|,&]+/)
      .filter((token) => token.length >= 5)
      .slice(0, 4),
    expectedSchemaTypes: priority.jsonLdTypes,
    expectedCtaEvent: "seo_cta_click",
    expectedRelatedLinks: context.expectedRelatedLinks,
    language,
    shouldBeInSitemap: language === "de",
    shouldBeIndexable: true,
  };
}) satisfies readonly SeoMoneyPage[];

export type GscClickPriorityPath = keyof typeof gscClickPriorities;

export function normalizeGscPriorityPath(path: string) {
  const cleaned = (path || "/").split("?")[0].split("#")[0].replace(/\/+$/, "");
  return cleaned ? (cleaned.startsWith("/") ? cleaned : `/${cleaned}`) : "/";
}

export function getGscClickPriority(path: string): GscClickPriority | undefined {
  return gscClickPriorities[normalizeGscPriorityPath(path) as GscClickPriorityPath];
}
