// @ts-nocheck
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
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot sachlich prüfen" },
] as const;

const seniorMoveAnchors = [
  { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
  { href: "/seniorenumzug-erlangen", label: "Seniorenumzug Erlangen" },
  { href: "/seniorenumzug-bamberg", label: "Seniorenumzug Bamberg" },
  { href: "/umzug-muenchen", label: "Umzug München" },
  { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
] as const;

const regensburgCleaningAnchors = [
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
  { href: "/entruempelung-landshut", label: "Reinigung nach Entrümpelung Landshut" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
  { href: "/kontakt", label: "FLOXANT Kontakt" },
] as const;

const endCleaningRegensburgAnchors = [
  { href: "/regensburg/endreinigung", label: "Endreinigung vor Übergabe Regensburg" },
  { href: "/regensburg/uebergabereinigung", label: "Übergabereinigung Regensburg" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung vor Endreinigung" },
  { href: "/objektbrief", label: "Objektbrief für Übergabe" },
  { href: "/uebergabeakte", label: "Übergabeakte vorbereiten" },
  { href: "/uebergabeakte", label: "Übergabeakte für Vermieter" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
] as const;

const landshutClearanceAnchors = [
  { href: "/entruempelung-landshut", label: "Entrümpelung Landshut" },
  { href: "/regensburg/reinigung", label: "Reinigung nach Räumung einordnen" },
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
  { href: "/diskret-service", label: "Diskret-Service für sensible Fälle" },
  { href: "/diskreter-umzug-trennung-scheidung", label: "Diskreter Umzug" },
  { href: "/nachlass-raeumung-regensburg", label: "Nachlassräumung" },
  { href: "/kontakt", label: "Diskret Kontakt aufnehmen" },
  { href: "/anfrage-mit-preisrahmen", label: "Preisrahmen vertraulich nennen" },
] as const;

const diskretServiceAnchors = [
  { href: "/diskret-service", label: "Diskret-Service" },
  { href: "/diskreter-umzug-trennung-scheidung", label: "Diskreter Umzug nach Trennung" },
  { href: "/nachlass-raeumung-regensburg", label: "Nachlassraeumung diskret klären" },
  { href: "/angebot-guenstiger-pruefen", label: "Diskretes Angebot prüfen" },
  { href: "/private-client-service", label: "Private Client Service" },
  { href: "/kontakt?service=diskret-service&intent=diskret-service&source=seo", label: "Diskreten Fall beschreiben" },
] as const;

const contactAnchors = [
  { href: "/kontakt", label: "FLOXANT Kontakt" },
  { href: "/diskret-service", label: "Diskret-Service" },
  { href: "/buchung", label: "Buchung starten" },
  { href: "/rechner", label: "Preisrahmen prüfen" },
  { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
  { href: "/private-client-service", label: "Private Client Anfrage" },
] as const;

export const gscClickPriorities = {
  "/regensburg/reinigung": {
    priority: "P0",
    path: "/regensburg/reinigung",
    canonical: "/regensburg/reinigung",
    title: "Reinigung Regensburg | Wohnung, Büro & Übergabe",
    description:
      "Reinigung Regensburg für Wohnung, Büro oder Übergabe: Fläche, Zustand, Fotos, Termin und Zielzustand senden. FLOXANT prüft den passenden Ablauf.",
    openGraphTitle: "Reinigung Regensburg anfragen",
    openGraphDescription:
      "Wohnung, Büro, Übergabe oder Reinigung nach Räumung in Regensburg mit Fotos und Termin einordnen.",
    h1: "Reinigung Regensburg mit Fotos, Fläche und Übergabeziel klären",
    pageIntent: "Reinigung in Regensburg für Wohnung, Büro, Übergabe oder nach Räumung anfragen",
    primaryKeyword: "reinigung regensburg",
    secondaryKeywords: [
      "reinigungsfirma regensburg",
      "endreinigung regensburg",
      "reinigung nach umzug regensburg",
      "reinigungsangebot regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: regensburgCleaningAnchors,
  },
  "/regensburg/endreinigung": {
    priority: "P0",
    path: "/regensburg/endreinigung",
    canonical: "/regensburg/endreinigung",
    title: "Endreinigung Regensburg | Übergabe & Auszug vorbereiten",
    description:
      "Endreinigung in Regensburg vor Übergabe, nach Auszug oder Entrümpelung: Fotos, Fläche, Zustand, Frist und Restmengen prüfen lassen.",
    openGraphTitle: "Endreinigung vor Übergabe Regensburg",
    openGraphDescription:
      "Wohnung nach Auszug, Räumung oder Entrümpelung für Übergabe, Besichtigung oder Nachnutzung einordnen.",
    h1: "Endreinigung vor Übergabe in Regensburg - Wohnung, Zustand und Frist klären",
    pageIntent: "Endreinigung, Reinigung nach Entrümpelung und Übergabevorbereitung in Regensburg anfragen",
    primaryKeyword: "endreinigung regensburg",
    secondaryKeywords: [
      "reinigung vor wohnungsuebergabe regensburg",
      "übergabereinigung regensburg",
      "reinigung nach entrümpelung regensburg",
      "wohnung übergabefertig machen",
      "end of tenancy cleaning regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: endCleaningRegensburgAnchors,
  },
  "/entruempelung-landshut": {
    priority: "P0",
    path: "/entruempelung-landshut",
    canonical: "/entruempelung-landshut",
    title: "Entrümpelung Landshut mit Reinigung danach",
    description:
      "Entrümpelung Landshut anfragen: Räume, Menge, Zugang, Fotos, Termin, Zielzustand und Reinigung danach sachlich klären.",
    openGraphTitle: "Entrümpelung Landshut mit Reinigung danach",
    openGraphDescription:
      "Räumung in Landshut mit Menge, Zugang, Entsorgung, Zielzustand und optionaler Reinigung klären.",
    h1: "Entrümpelung Landshut mit Reinigung nach der Räumung",
    pageIntent: "Entrümpelung und Reinigung nach Räumung in Landshut mit Fotos und Zielzustand anfragen",
    primaryKeyword: "reinigung nach entrümpelung landshut",
    secondaryKeywords: [
      "entrümpelung landshut",
      "reinigung nach entrümpelung landshut",
      "wohnung räumen landshut",
      "haushaltsauflösung landshut",
      "entsorgung landshut",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: bavariaMoveAnchors,
  },
  "/diskret-service": {
    priority: "P0",
    path: "/diskret-service",
    canonical: "/diskret-service",
    title: "Diskret-Service für sensible Anfragen",
    description:
      "Sensible Anfrage zu Umzug, Entrümpelung, Auflösung, Nachlass, Reinigung oder Angebot mit bevorzugtem Kontaktweg einordnen.",
    openGraphTitle: "FLOXANT Diskret-Service",
    openGraphDescription:
      "Diskrete Fälle ruhig beschreiben und nächste Schritte ohne unnötige Details klären.",
    h1: "Diskret-Service für sensible Anfragen - Umzug, Entrümpelung und Auflösung zurückhaltend klären",
    pageIntent: "Diskrete Anfrage mit bevorzugtem Kontaktweg für Umzug, Entrümpelung, Auflösung und Angebot",
    primaryKeyword: "diskreter service",
    secondaryKeywords: [
      "diskret-service",
      "diskrete entrümpelung",
      "diskreter umzug",
      "diskrete haushaltsauflösung",
      "private client service",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: diskretServiceAnchors,
  },
  "/private-client-service": {
    priority: "P0",
    path: "/private-client-service",
    canonical: "/private-client-service",
    title: "Private Client Service - sensible private Anfragen klar abstimmen",
    description:
      "Private Client Service für individuelle private Anfragen: Umzug, Reinigung, Räumung, Übergabe oder Angebotsprüfung mit persönlicher Koordination.",
    openGraphTitle: "FLOXANT Private Client Service",
    openGraphDescription:
      "Individuelle private Serviceanfragen mit den wichtigsten Angaben vorbereiten und mit bevorzugtem Kontaktweg klären.",
    h1: "Private Client Service für sensible private Servicekoordination",
    pageIntent: "Private Client Anfrage für persönlich koordinierte private Services stellen",
    primaryKeyword: "private client service",
    secondaryKeywords: [
      "private client service germany",
      "private client moving cleaning clearance",
      "private service coordination",
      "persönliche servicekoordination",
      "private objektkoordination",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
    jsonLdTypes: ["WebPage", "ContactPage", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: contactAnchors,
  },
  "/fensterreinigung-regensburg": {
    priority: "P0",
    path: "/fensterreinigung-regensburg",
    canonical: "/fensterreinigung-regensburg",
    title: "Fensterreinigung Regensburg mit Glas und Zugang",
    description:
      "Fensterreinigung Regensburg anfragen: Anzahl, Etage, Innen- oder Außenseite, Rahmen, Zugang, Fotos, Zeitfenster und Angebot klären.",
    openGraphTitle: "Fensterreinigung Regensburg anfragen",
    openGraphDescription:
      "Glas, Rahmen, Etage, Zugang und Zeitfenster für Fensterreinigung in Regensburg übersichtlich senden.",
    h1: "Fensterreinigung Regensburg mit Glas, Rahmen und Zugang",
    pageIntent: "Fensterreinigung in Regensburg mit Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "fensterreinigung regensburg",
    secondaryKeywords: ["glasreinigung regensburg", "schaufensterreinigung regensburg", "fenster putzen lassen Regensburg"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/reinigungsfirma-angebot", label: "Reinigungsangebot klären" },
      { href: "/angebot-guenstiger-pruefen", label: "Fensterreinigungsangebot prüfen" },
    ],
  },
  "/regensburg/umzug": {
    priority: "P1",
    path: "/regensburg/umzug",
    canonical: "/regensburg/umzug",
    title: "Umzug Regensburg mit Start, Ziel und Angebot klären",
    description:
      "Umzug Regensburg anfragen: Start, Ziel, Etage, Laufweg, Fotos, Terminwunsch und vorhandenes Angebot vor der Zusage klären.",
    openGraphTitle: "Umzug Regensburg anfragen",
    openGraphDescription:
      "Umzug in Regensburg mit Volumen, Etage, Zugang, Termin und Angebot sauber vorbereiten.",
    h1: "Umzug Regensburg mit Start, Ziel und Terminwunsch",
    pageIntent: "Umzug in Regensburg mit Angebot, Fotos und Termin anfragen",
    primaryKeyword: "umzug regensburg",
    secondaryKeywords: ["umzugsfirma regensburg", "umzugsangebot regensburg", "umzug mit reinigung regensburg"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/regensburg/reinigung", label: "Reinigung nach Umzug Regensburg" },
      { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
      { href: "/kontakt?service=umzug&city=regensburg&intent=umzugsangebot-pruefen&source=seo", label: "Umzugsangebot einordnen" },
    ],
  },
  "/regensburg/entruempelung": {
    priority: "P1",
    path: "/regensburg/entruempelung",
    canonical: "/regensburg/entruempelung",
    title: "Entrümpelung Regensburg mit Räumen und Zugang",
    description:
      "Entrümpelung Regensburg anfragen: Räume, Menge, Zugang, Fotos, Frist, Entsorgung, Reinigung danach und Angebot strukturiert klären.",
    openGraphTitle: "Entrümpelung Regensburg anfragen",
    openGraphDescription:
      "Räumung in Regensburg mit Fotos, Menge, Zugang, Zielzustand und Anschlussreinigung vorbereiten.",
    h1: "Entrümpelung Regensburg mit Räumen, Menge und Zugang",
    pageIntent: "Entrümpelung in Regensburg mit Menge, Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "entrümpelung regensburg",
    secondaryKeywords: ["wohnungsauflösung regensburg", "haushaltsauflösung regensburg", "räumungsangebot regensburg"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/regensburg/reinigung", label: "Reinigung nach Entrümpelung Regensburg" },
      { href: "/regensburg/haushaltsaufloesung", label: "Haushaltsauflösung Regensburg" },
      { href: "/angebot-guenstiger-pruefen", label: "Entrümpelungsangebot prüfen" },
      { href: "/kontakt?service=entruempelung&city=regensburg&intent=entruempelungsangebot-pruefen&source=seo", label: "Räumungsangebot einordnen" },
    ],
  },
  "/klaviertransport-regensburg": {
    priority: "P0",
    path: "/klaviertransport-regensburg",
    canonical: "/klaviertransport-regensburg",
    title: "Klaviertransport Regensburg mit Etage und Zugang klären",
    description:
      "Klaviertransport Regensburg vorbereiten: Instrument, Etage, Aufzug, Treppenhaus, Strecke, Haltemoeglichkeit, Fotos und Termin klären.",
    openGraphTitle: "Klaviertransport Regensburg vorbereiten",
    openGraphDescription:
      "Instrumententransport in Regensburg mit Fotos, Zugang, Etage, Strecke und Termin vorab einordnen.",
    h1: "Klaviertransport Regensburg mit Instrument, Zugang und Termin",
    pageIntent: "Klaviertransport in Regensburg mit Etage, Zugang, Strecke und Angebot anfragen",
    primaryKeyword: "klaviertransport regensburg",
    secondaryKeywords: ["pianotransport regensburg", "instrumententransport regensburg", "klavier umzug regensburg"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/regensburg/umzug", label: "Umzug Regensburg" },
      { href: "/regensburg/umzug", label: "Umzug in Regensburg" },
      { href: "/angebot-guenstiger-pruefen", label: "Transportangebot prüfen" },
      { href: "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo", label: "Klaviertransport anfragen" },
    ],
  },
  "/solarreinigung": {
    priority: "P1",
    path: "/solarreinigung",
    canonical: "/solarreinigung",
    title: "Solarreinigung mit PV-Fotos, Zugang und Termin klären",
    description:
      "Solarreinigung für PV-Anlagen vorbereiten: Modulzahl, Zugang, Dachart, Fotos, Verschmutzung, Wasseranschluss, Termin und Angebot klären.",
    openGraphTitle: "Solarreinigung anfragen",
    openGraphDescription:
      "PV-Fläche, Dachzugang, Verschmutzung und Sicherheitsgrenzen für Solarreinigung vorab einordnen.",
    h1: "Solarreinigung für PV-Anlagen mit sauberer Vorprüfung",
    pageIntent: "Solarreinigung mit PV-Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "solarreinigung",
    secondaryKeywords: ["pv reinigung", "pv anlage reinigen lassen", "solarreinigung angebot"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/pv-anlagen-reinigung", label: "PV-Anlagen-Reinigung" },
      { href: "/angebot-guenstiger-pruefen", label: "Solarreinigungsangebot prüfen" },
      { href: "/fensterreinigung-regensburg", label: "Glas und Fensterreinigung Regensburg" },
      { href: "/kontakt?service=reinigung&intent=reinigungsangebot-pruefen&source=seo", label: "Reinigungsangebot einordnen" },
    ],
  },
  "/pv-anlagen-reinigung": {
    priority: "P1",
    path: "/pv-anlagen-reinigung",
    canonical: "/pv-anlagen-reinigung",
    title: "PV-Anlagen-Reinigung mit Modulen und Zugang klären",
    description:
      "PV-Anlagen-Reinigung anfragen: Module, Dachform, Zugang, Wasseranschluss, Verschmutzung, Fotos, Sicherheitsgrenzen und Angebot klären.",
    openGraphTitle: "PV-Anlagen-Reinigung anfragen",
    openGraphDescription:
      "Photovoltaik-Reinigung mit Modulzahl, Dachzugang, Fotos und Sicherheitsgrenzen vorbereiten.",
    h1: "PV-Anlagen-Reinigung mit Modulen, Zugang und Fotos",
    pageIntent: "PV-Anlagen-Reinigung mit Fotos, Zugang und Angebot anfragen",
    primaryKeyword: "pv-anlagen-reinigung",
    secondaryKeywords: ["photovoltaik reinigung", "pv module reinigen", "pv reinigung angebot"],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/solarreinigung", label: "Solarreinigung" },
      { href: "/angebot-guenstiger-pruefen", label: "PV-Angebot prüfen" },
      { href: "/kontakt?service=reinigung&intent=reinigungsangebot-pruefen&source=seo", label: "PV-Reinigung anfragen" },
    ],
  },
  "/regensburg": {
    priority: "P2",
    path: "/regensburg",
    canonical: "/regensburg",
    title: "FLOXANT Regensburg | Reinigung & Angebot prüfen",
    description:
      "FLOXANT Regensburg: Reinigungsfirma, Büroreinigung, Gewerbereinigung, Grundreinigung und Reinigungsangebot mit Stadtteil, Fotos und Termin prüfen.",
    openGraphTitle: "FLOXANT Regensburg",
    openGraphDescription:
      "Regensburger Reinigungsanfragen nach Objekt, Stadtteil, Fläche, Fotos und Angebot sauber sortieren.",
    h1: "FLOXANT Regensburg für Reinigung und Angebotsprüfung",
    pageIntent: "Regensburg-Hub für Reinigung, Büroreinigung, Gewerbereinigung und Angebotsprüfung",
    primaryKeyword: "floxant regensburg",
    secondaryKeywords: [
      "reinigung Regensburg",
      "reinigungsfirma Regensburg",
      "büroreinigung Regensburg",
      "gewerbereinigung Regensburg",
    ],
    jsonLdTypes: ["WebPage", "LocalBusiness", "BreadcrumbList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/regensburg/bueroreinigung": {
    priority: "P0",
    path: "/regensburg/bueroreinigung",
    canonical: "/regensburg/bueroreinigung",
    title: "B2B Büroreinigung mit Raumliste und Angebot",
    description:
      "B2B Büroreinigung für Firmen: Fläche, Raumliste, Turnus, Zeitfenster, Zugang und vorhandenes Angebot sachlich klären.",
    openGraphTitle: "B2B Büroreinigung anfragen",
    openGraphDescription:
      "FLOXANT ordnet Büroreinigung für Firmen nach Objekt, Turnus, Fläche, Zeitfenster und Ansprechpartner ein.",
    h1: "B2B Büroreinigung für Firmen mit klarer Angebotsanfrage",
    pageIntent: "B2B-Büroreinigung für Firmen und Gewerbe mit Raumliste und Angebot anfragen",
    primaryKeyword: "b2b büroreinigung",
    secondaryKeywords: [
      "büroreinigung firma",
      "büroreinigung für unternehmen",
      "büro reinigen regensburg",
      "firma büroreinigung Regensburg",
      "reinigungsfirma büro Regensburg",
      "büroreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/seniorenumzug-bayern": {
    priority: "P0",
    path: "/seniorenumzug-bayern",
    canonical: "/seniorenumzug-bayern",
    title: "Seniorenumzug anfragen - Umzug, Umfang und Übergabe klären",
    description:
      "Seniorenumzug geplant? Start, Ziel, Umfang, Termin und Zusatzleistungen wie Entrümpelung oder Reinigung beschreiben. FLOXANT prüft die Anfrage anhand der genannten Eckdaten.",
    openGraphTitle: "Seniorenumzug Bayern mit konkreten Eckdaten anfragen",
    openGraphDescription:
      "Seniorenumzug und Umzug im Alter mit Angehörigen, Entrümpelung, Reinigung, Übergabe und Angebotsprüfung ruhig einordnen.",
    h1: "Seniorenumzug mit konkreten Eckdaten anfragen - mit Angehörigen, Umfang und Terminwunsch",
    pageIntent: "Seniorenumzug und Umzug im Alter in Bayern anfragen",
    primaryKeyword: "seniorenumzug bayern",
    secondaryKeywords: [
      "seniorenumzug",
      "umzug im alter",
      "umzug im alter bayern",
      "seniorenumzug bayern",
      "umzugshelfer senioren bayern",
      "umzugshelfer für senioren bayern",
      "umzug für senioren bayern",
      "senioren umzug bayern",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: seniorMoveAnchors,
  },
  "/seniorenumzug-bamberg": {
    priority: "P0",
    path: "/seniorenumzug-bamberg",
    canonical: "/seniorenumzug-bamberg",
    title: "Umzug im Alter Bamberg | Senioren-Umzug anfragen",
    description:
      "Seniorenumzug Bamberg: Rückruf, Angehörige, Möbelumfang, Etage, Fotos und Übergabe anhand der Eckdaten klären. FLOXANT prüft die Anfrage.",
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
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/umzug-muenchen", label: "Umzug München" },
      { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
      { href: "/regensburg/reinigung", label: "Reinigung nach Umzug Regensburg" },
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
      "Praxisentrümpelung Regensburg: Praxisräume, Möbel, Technik, Akten, Freigabe, Fotos, Entsorgung und Reinigung danach prüfen.",
    openGraphTitle: "Praxisentrümpelung Nürnberg",
    openGraphDescription:
      "Entrümpelung für Praxisräume in Regensburg mit Fotos, Freigabe, Entsorgung und Anschlussreinigung einordnen.",
    h1: "Praxisentrümpelung Nürnberg über Entrümpelung klar anfragen",
    pageIntent: "Praxisentrümpelung in Nürnberg über die bestehende Entrümpelungsseite anfragen",
    primaryKeyword: "praxisentrümpelung nürnberg",
    secondaryKeywords: [
      "praxis räumen nürnberg",
      "entrümpelung praxis nürnberg",
      "praxisauflösung nürnberg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
      "Gewerbereinigung für Büro, Praxis, Kanzlei, Hotel und Objekt: Fläche, Turnus, Zeitfenster, Zugang und Fotos übersichtlich senden.",
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
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
      { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/reinigungsfirma-angebot", label: "Reinigungsfirma Angebot" },
    ],
  },
  "/reinigungsfirma-angebot": {
    priority: "P1",
    path: "/reinigungsfirma-angebot",
    canonical: "/reinigungsfirma-angebot",
    title: "Reinigungsfirma Angebot mit Objekt und Turnus klären",
    description:
      "Reinigungsfirma Angebot vorbereiten: Objekt, Fläche, Turnus, Zustand, Fotos und Termin senden, damit offene Punkte vor Zusage klar sind.",
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
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/regensburg/reinigung": {
    priority: "P1",
    path: "/regensburg/reinigung",
    canonical: "/regensburg/reinigung",
    title: "Reinigung Regensburg mit Objekt und Angebot klären",
    description:
      "Reinigung Regensburg für Wohnung, Büro, Praxis, Treppenhaus oder Grundreinigung: Fotos, Fläche, Termin und Angebot klar senden.",
    openGraphTitle: "Reinigung Regensburg",
    openGraphDescription:
      "Passende Reinigungsseite in Regensburg nach Objekt, Fläche, Zustand und Termin auswählen.",
    h1: "Reinigung Regensburg für Wohnung, Büro, Praxis und Objekt",
    pageIntent: "Reinigungsfirma oder Reinigungsdienst in Regensburg anfragen",
    primaryKeyword: "reinigung Regensburg",
    secondaryKeywords: [
      "reinigungsfirma Regensburg",
      "reinigungsdienst Regensburg",
      "putzfirma Regensburg",
      "reinigungsangebot Regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/praxisreinigung-regensburg": {
    priority: "P1",
    path: "/praxisreinigung-regensburg",
    canonical: "/praxisreinigung-regensburg",
    title: "Praxisreinigung Regensburg | Praxis & Angebot",
    description:
      "Praxisreinigung Regensburg: Empfang, Wartebereich, Sanitär, Büroflächen, Turnus, Zeitfenster und Fotos für ein Angebot senden.",
    openGraphTitle: "Praxisreinigung Regensburg",
    openGraphDescription:
      "Praxisräume in Regensburg mit Turnus, Zeitfenster, Flächen und Leistungsgrenzen anfragen.",
    h1: "Praxisreinigung Regensburg für Praxisräume und Empfang",
    pageIntent: "Praxisreinigung in Regensburg anfragen",
    primaryKeyword: "praxisreinigung Regensburg",
    secondaryKeywords: [
      "praxis reinigung Regensburg",
      "arztpraxis reinigung Regensburg",
      "praxisreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/hotelreinigung-regensburg": {
    priority: "P1",
    path: "/hotelreinigung-regensburg",
    canonical: "/hotelreinigung-regensburg",
    title: "Hotelreinigung Regensburg | Objekt & Turnus anfragen",
    description:
      "Hotelreinigung Regensburg für Hotel, Pension, Lobby, Flure und Zimmer: Turnus, Check-out-Zeitfenster, Zugang und Fotos senden.",
    openGraphTitle: "Hotelreinigung Regensburg",
    openGraphDescription:
      "Hotel, Boardinghouse oder Pension in Regensburg mit Turnus und Objektangaben anfragen.",
    h1: "Hotelreinigung Regensburg für Hotel, Lobby und Zimmerbereiche",
    pageIntent: "Hotelreinigung in Regensburg anfragen",
    primaryKeyword: "hotelreinigung Regensburg",
    secondaryKeywords: [
      "hotel reinigung Regensburg",
      "hotelreinigung angebot",
      "reinigung hotel Regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/grundreinigung-regensburg": {
    priority: "P1",
    path: "/grundreinigung-regensburg",
    canonical: "/grundreinigung-regensburg",
    title: "Grundreinigung Regensburg | Wohnung & Objekt",
    description:
      "Grundreinigung Regensburg für Wohnung, Büro, Boden, Küche, Bad und starke Verschmutzung: Zustand, Fläche, Fotos und Termin senden.",
    openGraphTitle: "Grundreinigung Regensburg",
    openGraphDescription:
      "Grundreinigung nach Auszug, vor Übergabe oder für Objektflächen in Regensburg einordnen.",
    h1: "Grundreinigung Regensburg für Wohnung, Büro und Objekt",
    pageIntent: "Grundreinigung in Regensburg anfragen",
    primaryKeyword: "grundreinigung Regensburg",
    secondaryKeywords: [
      "wohnung grundreinigung Regensburg",
      "büro grundreinigung Regensburg",
      "grundreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/regensburg/reinigung": {
    priority: "P1",
    path: "/regensburg/reinigung",
    canonical: "/regensburg/reinigung",
    title: "Wohnungsreinigung Regensburg | Wohnung reinigen lassen",
    description:
      "Wohnungsreinigung Regensburg für Auszug, Einzug, Übergabe oder Privathaushalt: Räume, Zustand, Fotos und Termin klar senden.",
    openGraphTitle: "Wohnungsreinigung Regensburg",
    openGraphDescription:
      "Wohnung in Regensburg reinigen lassen mit Räumen, Zustand, Termin und Fotos.",
    h1: "Wohnungsreinigung Regensburg für Auszug, Einzug und Übergabe",
    pageIntent: "Wohnungsreinigung in Regensburg anfragen",
    primaryKeyword: "wohnungsreinigung Regensburg",
    secondaryKeywords: [
      "wohnung reinigen lassen regensburg",
      "reinigungsfirma Regensburg privathaushalt",
      "putzfrau Regensburg anfragen",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/treppenhausreinigung-regensburg": {
    priority: "P1",
    path: "/treppenhausreinigung-regensburg",
    canonical: "/treppenhausreinigung-regensburg",
    title: "Treppenhausreinigung Regensburg | Hausverwaltung",
    description:
      "Treppenhausreinigung Regensburg für Hausverwaltung, WEG und Mietshaus: Etagen, Turnus, Zugang, Eingänge und Fotos senden.",
    openGraphTitle: "Treppenhausreinigung Regensburg",
    openGraphDescription:
      "Treppenhaus, Eingänge, Aufzug und Turnus in Regensburg für Hausverwaltungen einordnen.",
    h1: "Treppenhausreinigung Regensburg für Hausverwaltung und WEG",
    pageIntent: "Treppenhausreinigung in Regensburg anfragen",
    primaryKeyword: "treppenhausreinigung Regensburg",
    secondaryKeywords: [
      "reinigung treppenhaus Regensburg",
      "hausverwaltung reinigung Regensburg",
      "treppenhausreinigung angebot",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: cleaningClusterAnchors,
  },
  "/regensburg/gewerbereinigung": {
    priority: "P1",
    path: "/regensburg/gewerbereinigung",
    canonical: "/regensburg/gewerbereinigung",
    title: "Gewerbereinigung Regensburg für Büro und Objekt",
    description:
      "Gewerbereinigung Regensburg für Büro, Praxis, Kanzlei, Hotel und Objekt: Fläche, Turnus, Zeitfenster, Zugang und Fotos senden.",
    openGraphTitle: "Gewerbereinigung Regensburg",
    openGraphDescription:
      "Gewerbeobjekte in Regensburg mit Fläche, Turnus und Zeitfenster anfragen.",
    h1: "Gewerbereinigung Regensburg für Büro, Praxis und Objekt",
    pageIntent: "Gewerbereinigung in Regensburg anfragen",
    primaryKeyword: "gewerbereinigung Regensburg",
    secondaryKeywords: [
      "objektreinigung Regensburg",
      "firmenreinigung Regensburg",
      "büroreinigung Regensburg",
      "praxisreinigung Regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
      "umzugsunternehmen Regensburg",
      "umzugsangebot regensburg",
      "umzug mit reinigung regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
      "entrümpelung regensburg",
      "wohnung rär?umen Regensburg",
      "keller rär?umen Regensburg",
      "räumungsangebot regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
    h1: "Wohnungsauflösung Regensburg ruhig und anhand der Eckdaten klären",
    pageIntent: "City-first Wohnungsauflösung in Regensburg für Nachlass, Auszug und Leerstand anfragen",
    primaryKeyword: "wohnungsauflösung regensburg",
    secondaryKeywords: [
      "hausauflösung regensburg",
      "haushaltsauflösung regensburg",
      "wohnung auflösen Regensburg",
      "nachlass räumung regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
      "Privatumzug, Fernumzug, Büroumzug und Reinigung nach Umzug in Regensburg sauber einordnen.",
    h1: "Umzug München mit Volumen, Termin und Angebot sauber anfragen",
    pageIntent: "Umzug in München mit Privatumzug, Fernumzug und Angebot anfragen",
    primaryKeyword: "umzug münchen",
    secondaryKeywords: [
      "privatumzug münchen",
      "fernumzug münchen",
      "umzugsangebot münchen prüfen",
      "umzug münchen festpreis",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
    internalLinkAnchors: [
      { href: "/fernumzug-muenchen", label: "Fernumzug München" },
      { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot München prüfen" },
      { href: "/regensburg/reinigung", label: "Reinigung nach Umzug Regensburg" },
      { href: "/bueroumzug-muenchen", label: "Büroumzug München" },
      { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
    ],
  },
  "/regensburg/reinigung": {
    priority: "P1",
    path: "/regensburg/reinigung",
    canonical: "/regensburg/reinigung",
    title: "Reinigung Regensburg | Wohnung, Übergabe & Angebot",
    description:
      "Reinigung Regensburg nach Umzug, vor Übergabe oder für Wohnung: Räume, Zustand, Fotos, Termin und Angebot übersichtlich senden.",
    openGraphTitle: "Reinigung Regensburg anfragen",
    openGraphDescription:
      "Endreinigung, Wohnungsreinigung oder Reinigung nach Umzug in Regensburg einordnen.",
    h1: "Reinigung Regensburg für Wohnung, Auszug und Übergabe",
    pageIntent: "Reinigung in Regensburg nach Umzug oder vor Übergabe anfragen",
    primaryKeyword: "reinigung Regensburg",
    secondaryKeywords: [
      "endreinigung Regensburg",
      "wohnungsreinigung Regensburg",
      "reinigung nach umzug Regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
      "Umzugsunternehmen Regensburg anfragen: Volumen, Strecke, Etage, Laufweg, Fotos, Termin und Zusatzleistungen vorab klären.",
    openGraphTitle: "Umzugsunternehmen Regensburg",
    openGraphDescription:
      "Umzugsfirma in Regensburg mit klarer Anfrage, Fotos und Preisrahmen vorbereiten.",
    h1: "Umzugsunternehmen Regensburg mit Angebot nach Prüfung",
    pageIntent: "Umzugsunternehmen in Regensburg anfragen",
    primaryKeyword: "umzugsunternehmen Regensburg",
    secondaryKeywords: [
      "umzugsfirma regensburg",
      "umzugsservice regensburg",
      "umzugsangebot regensburg",
    ],
    jsonLdTypes: ["WebPage", "Service", "BreadcrumbList", "ItemList"],
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
  { path: "/regensburg/reinigung", priorityPath: "/regensburg/reinigung" },
  { path: "/regensburg/endreinigung", priorityPath: "/regensburg/endreinigung" },
  { path: "/entruempelung-landshut", priorityPath: "/entruempelung-landshut" },
  { path: "/umzug-vohenstrauss", priorityPath: "/umzug-vohenstrauss" },
  { path: "/umzug-neustadt-an-der-waldnaab", priorityPath: "/umzug-neustadt-an-der-waldnaab" },
  { path: "/regensburg/reinigung", priorityPath: "/regensburg/reinigung" },
  { path: "/regensburg/bueroreinigung", priorityPath: "/regensburg/bueroreinigung" },
  { path: "/regensburg/gewerbereinigung", priorityPath: "/regensburg/gewerbereinigung" },
  { path: "/regensburg/umzug", priorityPath: "/regensburg/umzug" },
  { path: "/regensburg/entruempelung", priorityPath: "/regensburg/entruempelung" },
  { path: "/regensburg/wohnungsaufloesung", priorityPath: "/regensburg/wohnungsaufloesung" },
  { path: "/regensburg/reinigung", priorityPath: "/regensburg/reinigung" },
  { path: "/diskret-service", priorityPath: "/diskret-service" },
  { path: "/private-client-service", priorityPath: "/private-client-service" },
  { path: "/kontakt", priorityPath: "/kontakt" },
  { path: "/reinigungsfirma-angebot", priorityPath: "/reinigungsfirma-angebot" },
] as const;

const monitoredMoneyPageContext = {
  "/regensburg/reinigung": {
    service: "reinigung",
    city: "landshut",
    intent: "lokale Reinigungsanfrage mit Fotos, Termin und Zielzustand",
    expectedRelatedLinks: ["/entruempelung-regensburg", "/reinigungsfirma-angebot", "/kontakt"],
  },
  "/regensburg/endreinigung": {
    service: "reinigung",
    city: "regensburg",
    intent: "Endreinigung vor Uebergabe, Reinigung nach Entruempelung und Uebergabevorbereitung",
    expectedRelatedLinks: ["/regensburg/uebergabereinigung", "/objektbrief", "/uebergabeakte", "/angebot-guenstiger-pruefen"],
  },
  "/entruempelung-landshut": {
    service: "entruempelung",
    city: "landshut",
    intent: "lokale Entruempelungsanfrage mit Menge, Zugang und Reinigung danach",
    expectedRelatedLinks: ["/regensburg/reinigung", "/wohnungsaufloesung-regensburg", "/angebot-guenstiger-pruefen"],
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
  "/regensburg/reinigung": {
    service: "reinigung",
    city: "regensburg",
    intent: "Reinigungsfirma in Regensburg fuer Wohnung, Objekt und Angebot",
    expectedRelatedLinks: ["/regensburg/bueroreinigung", "/regensburg/gewerbereinigung", "/reinigungsfirma-angebot"],
  },
  "/regensburg/bueroreinigung": {
    service: "bueroreinigung",
    city: "regensburg",
    intent: "Bueroreinigung in Regensburg fuer Firmen und Gewerbekunden",
    expectedRelatedLinks: ["/regensburg/reinigung", "/regensburg/gewerbereinigung", "/reinigungsfirma-angebot"],
  },
  "/regensburg/gewerbereinigung": {
    service: "gewerbereinigung",
    city: "regensburg",
    intent: "Gewerbereinigung in Regensburg fuer Buero, Praxis und Objekt",
    expectedRelatedLinks: ["/regensburg/reinigung", "/regensburg/bueroreinigung", "/kontakt"],
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
  "/regensburg/reinigung": {
    service: "reinigung",
    city: "regensburg",
    intent: "Reinigung in Regensburg nach Umzug, vor Uebergabe oder fuer Wohnung",
    expectedRelatedLinks: ["/regensburg/umzug", "/reinigungsfirma-angebot", "/anfrage-mit-preisrahmen"],
  },
  "/diskret-service": {
    service: "diskret-service",
    city: "deutschland",
    intent: "sensible Anfrage mit bevorzugtem Kontaktweg und ohne unnoetige Privatdetails",
    expectedRelatedLinks: ["/private-client-service", "/diskreter-umzug-trennung-scheidung", "/angebot-guenstiger-pruefen"],
  },
  "/private-client-service": {
    service: "private-client",
    city: "bayern",
    intent: "diskrete sensible Anfrage fuer private Objekte",
    expectedRelatedLinks: ["/diskret-service", "/diskreter-umzug-trennung-scheidung", "/nachlass-raeumung-regensburg", "/kontakt"],
  },
  "/kontakt": {
    service: "kontakt",
    city: "regensburg",
    intent: "Kontakt und Conversion-Ziel fuer Anfrage, Rueckruf und Formular",
    expectedRelatedLinks: ["/buchung", "/rechner", "/diskret-service", "/private-client-service"],
  },
  "/reinigungsfirma-angebot": {
    service: "reinigung",
    city: "deutschland",
    intent: "Angebot fuer Reinigungsfirma mit Objekt, Flaeche und Termin anfragen",
    expectedRelatedLinks: ["/regensburg/reinigung", "/regensburg/gewerbereinigung", "/kontakt"],
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
