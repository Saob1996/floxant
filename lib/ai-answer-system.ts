export type AiAnswerKey =
  | "angebot-pruefen"
  | "duesseldorf-reinigung"
  | "duesseldorf-bueroreinigung"
  | "duesseldorf-gewerbereinigung"
  | "umzug-regensburg"
  | "klaviertransport-regensburg"
  | "entruempelung-regensburg"
  | "reinigung-regensburg"
  | "diskret-service"
  | "seniorenumzug"
  | "solar-pv"
  | "objektbrief"
  | "uebergabe-sprint"
  | "duesseldorf"
  | "regensburg"
  | "english-request";

export type AiAnswerEntry = {
  key: AiAnswerKey;
  route: string;
  title: string;
  directAnswer: string;
  usefulWhen: string[];
  neededInfo: string[];
  notPromised: string[];
  nextStep: string;
  cta: {
    href: string;
    label: string;
  };
  serviceKeys: string[];
  intentKeys: string[];
  lastReviewed: string;
};

const reviewed = "2026-07-08";

export const aiAnswerEntries: AiAnswerEntry[] = [
  {
    key: "angebot-pruefen",
    route: "/angebot-guenstiger-pruefen",
    title: "Angebot erst einordnen, dann entscheiden.",
    directAnswer:
      "Eine Angebotspruefung ist sinnvoll, wenn Preis, Leistungsumfang, Zusatzkosten oder Termin unklar wirken. FLOXANT prüft die Angaben anhand der genannten Eckdaten, ohne eine Ersparnis oder rechtliche Pruefung zu garantieren.",
    usefulWhen: ["Preis oder Umfang unklar", "Zusatzkosten offen", "Termin oder Leistung nicht eindeutig"],
    neededInfo: ["Angebot oder Screenshot", "Service und Ort", "offene Frage", "Fotos oder Frist"],
    notPromised: ["keine Preisgarantie", "keine Rechtsberatung", "keine Abwertung anderer Anbieter"],
    nextStep: "Angebot, Service, Ort und offene Punkte senden.",
    cta: { href: "/angebot-guenstiger-pruefen#guenstiger-form", label: "Angebot pruefen lassen" },
    serviceKeys: ["angebot-pruefen"],
    intentKeys: ["angebot-pruefen", "preisfrage"],
    lastReviewed: reviewed,
  },
  {
    key: "umzug-regensburg",
    route: "/regensburg/umzug",
    title: "Umzug in Regensburg mit Eckdaten starten.",
    directAnswer:
      "Fuer eine Umzugsanfrage in Regensburg helfen Start, Ziel, Etage, Umfang und Terminwunsch. FLOXANT kann auch Sonderstuecke, Klaviertransport, Seniorenumzug oder ein vorhandenes Umzugsangebot einordnen.",
    usefulWhen: ["Start und Ziel bekannt", "Etage oder Umfang unklar", "Zusatzleistungen gehoeren dazu"],
    neededInfo: ["Start und Ziel", "Etage, Aufzug, Laufweg", "Umfang und Fotos", "Terminwunsch"],
    notPromised: ["keine automatische Buchung", "keine Soforttermin-Garantie", "keine Preisgarantie"],
    nextStep: "Umzugsdaten oder vorhandenes Angebot senden.",
    cta: { href: "/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo", label: "Umzug anfragen" },
    serviceKeys: ["umzug"],
    intentKeys: ["umzug-anfragen"],
    lastReviewed: reviewed,
  },
  {
    key: "duesseldorf-reinigung",
    route: "/duesseldorf/reinigung",
    title: "Reinigung in Duesseldorf mit Objektangaben klaeren.",
    directAnswer:
      "Fuer Reinigung in Duesseldorf zaehlen Objektart, Flaeche, Zustand, Fotos, Termin und Zielzustand. FLOXANT trennt private Reinigung, Endreinigung, Bueroreinigung und Gewerbereinigung, damit die Anfrage nicht pauschal bleibt.",
    usefulWhen: ["Objektart steht fest", "Flaeche oder Zustand unklar", "Angebot soll geprueft werden"],
    neededInfo: ["Stadtteil oder PLZ", "Objektart und Flaeche", "Fotos", "Termin oder Turnus"],
    notPromised: ["keine Abnahmegarantie", "keine Soforttermin-Garantie", "keine Preisgarantie"],
    nextStep: "Objekt und Zielzustand kurz beschreiben.",
    cta: { href: "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo", label: "Reinigung anfragen" },
    serviceKeys: ["reinigung"],
    intentKeys: ["reinigung-anfragen"],
    lastReviewed: reviewed,
  },
  {
    key: "duesseldorf-bueroreinigung",
    route: "/duesseldorf/bueroreinigung",
    title: "Bueroreinigung braucht Raumliste, Turnus und Zugang.",
    directAnswer:
      "Bei Bueroreinigung sind Raumliste, Flaeche, Turnus, Randzeiten, Schluesselweg und Ansprechpartner wichtiger als ein pauschaler Quadratmeterpreis. Ein vorhandenes Angebot kann anhand dieser Punkte eingeordnet werden.",
    usefulWhen: ["laufende Reinigung gesucht", "Turnus oder Randzeit offen", "Angebot wirkt unvollstaendig"],
    neededInfo: ["Raumliste", "Flaeche", "Turnus", "Schluesselweg"],
    notPromised: ["keine garantierte Verfuegbarkeit", "keine erfundenen Zertifikate", "keine Preisgarantie"],
    nextStep: "Objektdaten und gewuenschten Turnus senden.",
    cta: { href: "/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo", label: "Bueroreinigung anfragen" },
    serviceKeys: ["bueroreinigung"],
    intentKeys: ["b2b", "turnus"],
    lastReviewed: reviewed,
  },
  {
    key: "duesseldorf-gewerbereinigung",
    route: "/duesseldorf/gewerbereinigung",
    title: "Gewerbereinigung nach Objektart und Nutzung pruefen.",
    directAnswer:
      "Gewerbereinigung wird klarer, wenn Objektart, Nutzung, Flaeche, Reinigungszeiten, Sonderflaechen und Zielzustand sichtbar sind. FLOXANT ordnet Leistungsumfang und Angebot praktisch ein.",
    usefulWhen: ["Gewerbeflaeche braucht Turnus", "Nutzung variiert", "Leistungspaket ist unklar"],
    neededInfo: ["Objektart", "Flaeche und Nutzung", "Zeitfenster", "Fotos oder Angebot"],
    notPromised: ["keine Branchen-Garantie", "keine Preisgarantie", "keine Soforttermin-Garantie"],
    nextStep: "Gewerbeobjekt und offene Punkte beschreiben.",
    cta: { href: "/kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo", label: "Gewerbereinigung anfragen" },
    serviceKeys: ["gewerbereinigung"],
    intentKeys: ["b2b", "angebot-pruefen"],
    lastReviewed: reviewed,
  },
  {
    key: "klaviertransport-regensburg",
    route: "/klaviertransport-regensburg",
    title: "Klaviertransport zuerst nach Zugang pruefen.",
    directAnswer:
      "Bei Klaviertransport in Regensburg sind Instrumentart, Treppe, Aufzug, Tueren, Laufweg, Start, Ziel und Fotos entscheidend. FLOXANT prüft die Machbarkeit anhand der genannten Eckdaten, bevor eine Buchung entsteht.",
    usefulWhen: ["Treppe oder Engstelle vorhanden", "Instrumentart bekannt", "Transport mit Umzug kombiniert wird"],
    neededInfo: ["Instrumentart", "Start und Ziel", "Etage und Zugang", "Fotos"],
    notPromised: ["keine Schaedenfreiheits-Garantie", "keine Soforttermin-Garantie", "keine Preisgarantie"],
    nextStep: "Instrument und Zugangswege beschreiben.",
    cta: { href: "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo", label: "Klaviertransport vorbereiten" },
    serviceKeys: ["klaviertransport"],
    intentKeys: ["klaviertransport"],
    lastReviewed: reviewed,
  },
  {
    key: "entruempelung-regensburg",
    route: "/regensburg/entruempelung",
    title: "Entruempelung mit Menge, Freigabe und Endzustand klaeren.",
    directAnswer:
      "Fuer Entruempelung in Regensburg helfen Raeume, Menge, Material, Fotos, Zugang, Freigabe, Termin und gewuenschter Endzustand. Wenn danach Reinigung oder Uebergabe wichtig ist, sollte das direkt genannt werden.",
    usefulWhen: ["Raeume oder Keller betroffen", "Menge unklar", "Reinigung danach moeglich"],
    neededInfo: ["Raeume und Menge", "Fotos", "Zugang und Etage", "Freigabe und Termin"],
    notPromised: ["keine Entsorgungszusage ohne Pruefung", "keine Preisgarantie", "keine Rechtsberatung"],
    nextStep: "Raeumungsfall mit Fotos oder Beschreibung senden.",
    cta: { href: "/kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo", label: "Entruempelung anfragen" },
    serviceKeys: ["entruempelung"],
    intentKeys: ["entruempelung-anfragen"],
    lastReviewed: reviewed,
  },
  {
    key: "reinigung-regensburg",
    route: "/regensburg/reinigung",
    title: "Reinigung in Regensburg mit Objekt, Zustand und Ziel klaeren.",
    directAnswer:
      "Fuer Reinigung in Regensburg helfen Objektart, Flaeche, Zustand, Fotos, Termin, Zugang und Zielzustand. FLOXANT ordnet Wohnungs-, Bueroreinigung, Gewerbereinigung, Endreinigung oder Spezialreinigung getrennt ein.",
    usefulWhen: ["Objekt und Zustand beschrieben werden koennen", "Fotos vorhanden sind", "Angebot oder Turnus unklar ist"],
    neededInfo: ["Ort oder Stadtteil", "Objektart und Flaeche", "Fotos", "Termin oder Turnus"],
    notPromised: ["keine Abnahmegarantie", "keine Preisgarantie", "keine Soforttermin-Garantie"],
    nextStep: "Reinigungsziel und Fotos oder Angebot senden.",
    cta: { href: "/kontakt?service=reinigung&city=regensburg&intent=reinigung-regensburg&source=seo", label: "Reinigung vorbereiten" },
    serviceKeys: ["reinigung"],
    intentKeys: ["reinigung-anfragen"],
    lastReviewed: reviewed,
  },
  {
    key: "diskret-service",
    route: "/diskret-service",
    title: "Sensible Anfrage zurueckhaltend starten.",
    directAnswer:
      "Der Diskret-Service ist fuer sensible Anfragen gedacht, bei denen zurueckhaltende Kommunikation wichtig ist. Eine kurze Beschreibung und ein bevorzugter Kontaktweg reichen im ersten Schritt.",
    usefulWhen: ["Trennung, Nachlass oder sensible Wohnungssituation", "Diskretion wichtig ist", "Kontaktweg begrenzt werden soll"],
    neededInfo: ["grober Servicebedarf", "Ort", "Frist", "bevorzugter Kontaktweg"],
    notPromised: ["keine Rechtsberatung", "keine Pflegeberatung", "keine medizinische Beratung"],
    nextStep: "Sensible Lage nur so weit beschreiben, wie es fuer den Start noetig ist.",
    cta: { href: "/kontakt?mode=neutral&source=seo", label: "Diskreten Fall beschreiben" },
    serviceKeys: ["diskret-service"],
    intentKeys: ["diskret", "private-client"],
    lastReviewed: reviewed,
  },
  {
    key: "solar-pv",
    route: "/solarreinigung",
    title: "Solar- und PV-Reinigung mit Zugang und Fotos einordnen.",
    directAnswer:
      "Fuer Solar- oder PV-Reinigung helfen Dachart, Zugang, Modulanzahl, sichtbare Verschmutzung, Fotos und gewuenschter Zeitraum. FLOXANT gibt keine Ertrags-, Preis- oder Verfuegbarkeitsgarantie.",
    usefulWhen: ["Verschmutzung sichtbar ist", "Dachzugang klaerbar ist", "Angebot geprueft werden soll"],
    neededInfo: ["Dachart", "Zugang", "Modulflaeche", "Fotos"],
    notPromised: ["keine Ertragsgarantie", "keine technische Sicherheitszusage ohne Pruefung", "keine Soforttermin-Garantie"],
    nextStep: "Dach- und Moduldaten senden.",
    cta: { href: "/kontakt?mode=neutral&source=seo", label: "Solarfall pruefen" },
    serviceKeys: ["solar-pv"],
    intentKeys: ["solar", "pv"],
    lastReviewed: reviewed,
  },
  {
    key: "objektbrief",
    route: "/objektbrief",
    title: "Objektbrief sortiert unklare Faelle vor der Anfrage.",
    directAnswer:
      "Der Objektbrief hilft, wenn noch nicht klar ist, ob Reinigung, Umzug, Entruempelung, Uebergabe oder Angebotspruefung passt. Ort, Ziel, Fotos, Zugang, Termin und offene Fragen werden in eine nutzbare Anfrage gebracht.",
    usefulWhen: ["Service noch unklar ist", "Fotos oder Zugang wichtig sind", "mehrere Leistungen zusammenkommen"],
    neededInfo: ["Region", "Objekt oder Leistung", "Termin", "Fotos oder Angebot"],
    notPromised: ["keine automatische Buchung", "keine Preisgarantie", "keine Rechtsberatung"],
    nextStep: "Objekt, Ziel und offene Fragen übersichtlich senden.",
    cta: { href: "/objektbrief", label: "Objektbrief erstellen" },
    serviceKeys: ["objektbrief", "angebot-pruefen"],
    intentKeys: ["request-brief", "service-finder"],
    lastReviewed: reviewed,
  },
  {
    key: "uebergabe-sprint",
    route: "/uebergabe-sprint",
    title: "Uebergabe-Sprint klaert Restpunkte vor dem Termin.",
    directAnswer:
      "Der Uebergabe-Sprint passt, wenn Reinigung, Restmengen, Fotos, Schluesselweg oder letzte Aufgaben vor einem Termin sortiert werden muessen. FLOXANT bereitet praktisch vor, garantiert aber keine Abnahme, Kaution oder Vermieterentscheidung.",
    usefulWhen: ["Uebergabetermin naht", "Restpunkte offen sind", "Reinigung und Raeumung zusammenhaengen"],
    neededInfo: ["Termin", "Zustand und Fotos", "Restpunkte", "Schluesselweg"],
    notPromised: ["keine Uebergabegarantie", "keine Kautionsgarantie", "keine Rechtsberatung"],
    nextStep: "Termin, Zustand und Restpunkte senden.",
    cta: { href: "/kontakt?mode=neutral&source=seo", label: "Uebergabe vorbereiten" },
    serviceKeys: ["uebergabe"],
    intentKeys: ["uebergabe", "endreinigung"],
    lastReviewed: reviewed,
  },
  {
    key: "duesseldorf",
    route: "/duesseldorf",
    title: "Duesseldorf-Hub fuehrt zur passenden Reinigung oder Anfrage.",
    directAnswer:
      "Die Duesseldorf-Seite ordnet Reinigungs-, Bueroreinigungs-, Gewerbereinigungs- und objektbezogene Anfragen nach Ort, Objektart, Umfang und Zielzustand. Preis- oder Terminversprechen entstehen daraus nicht automatisch.",
    usefulWhen: ["Service noch gewaehlt wird", "Dusseldorf oder Umgebung betroffen ist", "Angebot geprueft werden soll"],
    neededInfo: ["Stadtteil", "Service", "Objektart", "Termin oder Turnus"],
    notPromised: ["keine Fake-Niederlassung", "keine Soforttermin-Garantie", "keine Preisgarantie"],
    nextStep: "Lokalen Service oder Angebotspruefung auswaehlen.",
    cta: { href: "/duesseldorf", label: "Duesseldorf-Service waehlen" },
    serviceKeys: ["reinigung", "bueroreinigung", "gewerbereinigung"],
    intentKeys: ["local", "service-finder"],
    lastReviewed: reviewed,
  },
  {
    key: "regensburg",
    route: "/regensburg",
    title: "Regensburg-Hub sortiert Service, Ort und naechsten Schritt.",
    directAnswer:
      "Die Regensburg-Seite buendelt Umzug, Reinigung, Entruempelung, Wohnungsaufloesung, Klaviertransport und Angebotspruefung. Eine gute Anfrage nennt Service, Ort, Umfang, Zugang, Fotos und Termin.",
    usefulWhen: ["mehrere Services moeglich sind", "Regensburg oder Umgebung betroffen ist", "Angebot oder Fotos vorhanden sind"],
    neededInfo: ["Service", "Ort", "Umfang", "Fotos oder Angebot"],
    notPromised: ["keine automatische Buchung", "keine Preisgarantie", "keine Soforttermin-Garantie"],
    nextStep: "Service auswaehlen oder Fall kurz beschreiben.",
    cta: { href: "/regensburg", label: "Regensburg-Service waehlen" },
    serviceKeys: ["umzug", "reinigung", "entruempelung"],
    intentKeys: ["local", "service-finder"],
    lastReviewed: reviewed,
  },
  {
    key: "english-request",
    route: "/kontakt",
    title: "English requests are welcome when the case is concrete.",
    directAnswer:
      "International customers can send simple English requests for cleaning service, office cleaning, moving help, house clearance, piano transport, offer check, solar panel cleaning, end of tenancy cleaning or discreet service. FLOXANT still needs location, service, timing and photos or an offer when available.",
    usefulWhen: ["German wording is difficult", "service and location are clear", "photos or offer are available"],
    neededInfo: ["service", "location", "timing", "photos or offer"],
    notPromised: ["no English doorway pages", "no ranking promise", "no legal advice"],
    nextStep: "Send a short English request with the key details.",
    cta: { href: "/kontakt?mode=neutral&source=seo", label: "Send English request" },
    serviceKeys: ["english-request"],
    intentKeys: ["english"],
    lastReviewed: reviewed,
  },
];

export function getAiAnswerByKey(key: AiAnswerKey) {
  return aiAnswerEntries.find((entry) => entry.key === key);
}

export function getAiAnswerForRoute(route: string) {
  const cleanRoute = route.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return aiAnswerEntries.find((entry) => entry.route === cleanRoute);
}

export function resolveAiAnswerKey(pathOrSignal: string): AiAnswerKey {
  const signal = pathOrSignal.toLowerCase();
  if (signal.includes("angebot")) return "angebot-pruefen";
  if (signal.includes("bueroreinigung")) return "duesseldorf-bueroreinigung";
  if (signal.includes("gewerbereinigung")) return "duesseldorf-gewerbereinigung";
  if (signal.includes("klavier")) return "klaviertransport-regensburg";
  if (signal.includes("entruempel")) return "entruempelung-regensburg";
  if (signal.includes("diskret") || signal.includes("private")) return "diskret-service";
  if (signal.includes("senior")) return "seniorenumzug";
  if (signal.includes("solar") || signal.includes("pv")) return "solar-pv";
  if (signal.includes("regensburg") && signal.includes("umzug")) return "umzug-regensburg";
  if (signal.includes("duesseldorf") && signal.includes("reinigung")) return "duesseldorf-reinigung";
  if (signal.includes("english")) return "english-request";
  if (signal.includes("regensburg")) return "regensburg";
  if (signal.includes("duesseldorf")) return "duesseldorf";
  return "angebot-pruefen";
}
