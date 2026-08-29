export type AiAnswerKey =
  | "angebot-pruefen"
  | "duesseldorf-reinigung"
  | "duesseldorf-bueroreinigung"
  | "duesseldorf-gewerbereinigung"
  | "duesseldorf-praxisreinigung"
  | "umzug-regensburg"
  | "regensburg-bueroreinigung"
  | "regensburg-gewerbereinigung"
  | "klaviertransport-regensburg"
  | "entruempelung-regensburg"
  | "reinigung-regensburg"
  | "grundreinigung"
  | "leerfahrt-rueckfahrt"
  | "dringende-anfrage"
  | "nachlassaufloesung"
  | "diskret-service"
  | "seniorenumzug"
  | "solar-pv"
  | "objektbrief"
  | "uebergabe-sprint"
  | "duesseldorf"
  | "regensburg"
  | "english-request"
  | "europa-umzug"
  | "budget-umzug"
  | "schwierige-lebenssituation"
  | "kostenuebernahme";

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

import {
  EUROPE_MOVE_QUESTIONS,
  MANDATORY_BUDGET_RESPONSE,
  MANDATORY_COST_COVERAGE_RESPONSE,
  MANDATORY_DIFFICULT_SITUATION_RESPONSE,
} from "@/lib/round3/ai-knowledge";
import { roundThreeServiceMatrix } from "@/lib/round3/service-matrix";

export const aiAnswerEntries: AiAnswerEntry[] = [
  {
    key: "europa-umzug",
    route: roundThreeServiceMatrix.europeMove.path.de,
    title: "Europa-Umzug beginnt mit einer geprüften Route.",
    directAnswer: "FLOXANT prüft Europa-Umzüge ausschließlich mit Start in Deutschland. Route, Umfang, Termin, Kapazität und mögliche Grenz- oder Transitvorgaben werden vor einem verbindlichen Angebot geprüft.",
    usefulWhen: ["Start in Deutschland", "Ziel in Europa", "Route oder Grenzklasse offen"],
    neededInfo: [...EUROPE_MOVE_QUESTIONS],
    notPromised: ["keine Zollberatung", "keine garantierte Route", "keine automatische Buchung"],
    nextStep: "Start, Ziel, Haushaltsgröße und Zeitraum im vorausgewählten Formular senden.",
    cta: { href: "/europa-umzug-ab-deutschland#anfrage", label: "Europa-Umzug anfragen" },
    serviceKeys: ["EUROPE_MOVE"], intentKeys: ["europa", "ausland", "international"], lastReviewed: "2026-08-29",
  },
  {
    key: "budget-umzug",
    route: roundThreeServiceMatrix.budgetMove.path.de,
    title: "Preisvorstellung und Leistungsumfang gemeinsam prüfen.",
    directAnswer: MANDATORY_BUDGET_RESPONSE,
    usefulWhen: ["Bruttobudget steht fest", "Umfang ist teilweise flexibel", "Gegenvorschlag ist möglich"],
    neededInfo: ["Start und Ziel", "Umfang und Termin", "Bruttopreisvorstellung inklusive 19 % MwSt."],
    notPromised: ["keine automatische Budgetannahme", "kein garantierter Rabatt", "kein Auftrag durch Eingabe"],
    nextStep: "Bruttopreisvorstellung, unverzichtbare und flexible Leistungen senden.",
    cta: { href: "/umzug-mit-preisvorstellung#anfrage", label: "Budget-Umzug prüfen lassen" },
    serviceKeys: ["BUDGET_MOVE"], intentKeys: ["budget", "preisvorstellung", "preisrahmen"], lastReviewed: "2026-08-29",
  },
  {
    key: "schwierige-lebenssituation",
    route: roundThreeServiceMatrix.difficultSituation.path.de,
    title: "Praktische Hilfe ohne unnötige private Angaben.",
    directAnswer: MANDATORY_DIFFICULT_SITUATION_RESPONSE,
    usefulWhen: ["praktische Aufgabe belastet", "diskreter Kontakt wichtig", "Termin oder Zugang schwierig"],
    neededInfo: ["benötigte praktische Leistung", "Ort und Termin", "praktische Einschränkungen"],
    notPromised: ["keine medizinische Beratung", "keine Krisenintervention", "keine automatische Zusage"],
    nextStep: "Nur Aufgabe, Ort, Termin und Kontaktweg beschreiben.",
    cta: { href: "/hilfe-in-schwierigen-lebenssituationen#anfrage", label: "Praktische Hilfe anfragen" },
    serviceKeys: ["DIFFICULT_SITUATION"], intentKeys: ["schwierig", "todesfall", "trennung"], lastReviewed: "2026-08-29",
  },
  {
    key: "kostenuebernahme",
    route: roundThreeServiceMatrix.costCoverage.path.de,
    title: "Kostenvoranschlag ist noch keine Bewilligung.",
    directAnswer: MANDATORY_COST_COVERAGE_RESPONSE,
    usefulWhen: ["möglicher Kostenträger", "Kostenvoranschlag wird verlangt", "schriftliche Freigabe ist offen"],
    neededInfo: ["praktische Leistung", "möglicher Kostenträger", "Antrags- oder Freigabestatus"],
    notPromised: ["keine Kostenübernahmegarantie", "keine Rechtsberatung", "keine Anbieteranerkennung erfinden"],
    nextStep: "Leistung, Kostenträger und schriftliche Vorgaben ohne Diagnose senden.",
    cta: { href: "/kostenuebernahme-fuer-umzug-und-haushaltshilfe#anfrage", label: "Kostenvoranschlag vorbereiten" },
    serviceKeys: ["COST_COVERAGE_REQUEST"], intentKeys: ["jobcenter", "krankenkasse", "arbeitgeber", "kostenuebernahme"], lastReviewed: "2026-08-29",
  },
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
    cta: { href: "/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=website", label: "Umzug anfragen" },
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
    cta: { href: "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=website", label: "Reinigung anfragen" },
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
    cta: { href: "/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=website", label: "Bueroreinigung anfragen" },
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
    cta: { href: "/kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=website", label: "Gewerbereinigung anfragen" },
    serviceKeys: ["gewerbereinigung"],
    intentKeys: ["b2b", "angebot-pruefen"],
    lastReviewed: reviewed,
  },
  {
    key: "duesseldorf-praxisreinigung",
    route: "/duesseldorf/praxisreinigung",
    title: "Praxisreinigung nach Räumen, Nutzung und Zeitfenstern klären.",
    directAnswer:
      "Für eine Praxisreinigung in Düsseldorf müssen Raumarten, Flächen, Nutzungszeiten, sensible Bereiche, gewünschter Turnus und Zugang bekannt sein. Medizinische Desinfektion oder andere qualifizierte Sonderleistungen werden nicht ohne gesonderte Prüfung zugesagt.",
    usefulWhen: ["Praxisräume regelmäßig gereinigt werden sollen", "Randzeiten wichtig sind", "Leistungsgrenzen geklärt werden müssen"],
    neededInfo: ["Praxisart und Raumliste", "Fläche und Turnus", "Zeitfenster und Zugang", "besondere Anforderungen"],
    notPromised: ["keine medizinische Desinfektionszusage", "keine Hygienegarantie", "keine Termin- oder Preisgarantie"],
    nextStep: "Raumliste, Turnus und besondere Anforderungen senden.",
    cta: { href: "/kontakt?service=praxisreinigung&city=duesseldorf&intent=praxisreinigung-duesseldorf&source=website", label: "Praxisreinigung anfragen" },
    serviceKeys: ["praxisreinigung"],
    intentKeys: ["b2b", "praxis"],
    lastReviewed: reviewed,
  },
  {
    key: "regensburg-bueroreinigung",
    route: "/regensburg/bueroreinigung",
    title: "Büroreinigung in Regensburg nach Raumliste und Turnus prüfen.",
    directAnswer:
      "Für Büroreinigung in Regensburg zählen Fläche, Raumliste, Arbeitsplätze, Sanitär, Küche, Bodenarten, Turnus, Randzeiten und Schlüsselweg. Erst diese Angaben erlauben eine belastbare Leistungs- und Terminprüfung.",
    usefulWhen: ["laufende Büroreinigung gesucht wird", "ein Angebot unklare Positionen enthält", "Zugang außerhalb der Arbeitszeit geplant wird"],
    neededInfo: ["Firma und Ansprechpartner", "Fläche und Raumliste", "Turnus und Zeitfenster", "Zugang und Fotos"],
    notPromised: ["keine automatische Verfügbarkeit", "keine Schlüsselübernahme ohne Vereinbarung", "keine Preisgarantie"],
    nextStep: "Raumliste, Turnus, Zeitfenster und Zugang senden.",
    cta: { href: "/kontakt?service=bueroreinigung&city=regensburg&intent=bueroreinigung-regensburg&source=website", label: "Büroreinigung anfragen" },
    serviceKeys: ["bueroreinigung"],
    intentKeys: ["b2b", "turnus", "regensburg"],
    lastReviewed: reviewed,
  },
  {
    key: "regensburg-gewerbereinigung",
    route: "/regensburg/gewerbereinigung",
    title: "Gewerbereinigung in Regensburg nach Nutzung und Flächen klären.",
    directAnswer:
      "Gewerbereinigung in Regensburg wird nach Objektart, Nutzung, Fläche, Bodenarten, Reinigungsziel, Turnus, Zeitfenster und Zugang geprüft. Branchen- oder Spezialanforderungen müssen vor einer Zusage ausdrücklich benannt werden.",
    usefulWhen: ["Gewerbeflächen regelmäßig betreut werden sollen", "Sonderflächen vorhanden sind", "Leistungspositionen verglichen werden"],
    neededInfo: ["Objektart und Nutzung", "Fläche und Raumliste", "Turnus und Zeitfenster", "Sonderflächen und Zugang"],
    notPromised: ["keine Branchenfreigabe ohne Prüfung", "keine Sonderleistung ohne Bestätigung", "keine Termin- oder Preisgarantie"],
    nextStep: "Objektart, Nutzung, Fläche und gewünschtes Zeitfenster senden.",
    cta: { href: "/kontakt?service=gewerbereinigung&city=regensburg&intent=gewerbereinigung-regensburg&source=website", label: "Gewerbereinigung anfragen" },
    serviceKeys: ["gewerbereinigung"],
    intentKeys: ["b2b", "regensburg"],
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
    cta: { href: "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=website", label: "Klaviertransport vorbereiten" },
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
    cta: { href: "/kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=website", label: "Entruempelung anfragen" },
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
    cta: { href: "/kontakt?service=reinigung&city=regensburg&intent=reinigung-regensburg&source=website", label: "Reinigung vorbereiten" },
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
    cta: { href: "/kontakt?mode=neutral&source=website", label: "Diskreten Fall beschreiben" },
    serviceKeys: ["diskret-service"],
    intentKeys: ["diskret", "private-client"],
    lastReviewed: reviewed,
  },
  {
    key: "seniorenumzug",
    route: "/seniorenumzug-bayern",
    title: "Seniorenumzug mit Zuständigkeit, Zugang und Unterstützung klären.",
    directAnswer:
      "Ein Seniorenumzug wird wie ein Umzug mit zusätzlichen Abstimmungspunkten geprüft: Start, Ziel, Umfang, Zugang, Ansprechpartner, gewünschte Hilfe und Umgang mit persönlichen Gegenständen. FLOXANT ersetzt keine Pflege-, Rechts- oder medizinische Beratung.",
    usefulWhen: ["Angehörige koordinieren", "mehr Zeit für Entscheidungen nötig ist", "Räumung oder Reinigung dazugehören kann"],
    neededInfo: ["Start und Ziel", "Umfang und Zugang", "Ansprechpartner und Berechtigung", "gewünschte Unterstützung"],
    notPromised: ["keine Pflegeleistung", "keine Rechts- oder Medizinberatung", "keine Termin- oder Preisgarantie"],
    nextStep: "Ort, Umfang, Ansprechpartner und gewünschte Unterstützung nennen.",
    cta: { href: "/kontakt?service=seniorenumzug&city=regensburg&intent=seniorenumzug-regensburg&source=website", label: "Seniorenumzug anfragen" },
    serviceKeys: ["seniorenumzug"],
    intentKeys: ["senior", "diskret"],
    lastReviewed: reviewed,
  },
  {
    key: "nachlassaufloesung",
    route: "/nachlass-raeumung-regensburg",
    title: "Nachlassauflösung mit Freigaben und klaren Grenzen starten.",
    directAnswer:
      "Bei einer Nachlassauflösung müssen Berechtigung, Ansprechpartner, Räume, persönliche Gegenstände, Freigaben, Zugang und Zielzustand geklärt sein. Räumung, Entsorgung und Reinigung werden getrennt geprüft; Bewertung und Rechtsberatung gehören nicht zur Leistung.",
    usefulWhen: ["eine Nachlasswohnung geordnet werden muss", "mehrere Angehörige beteiligt sind", "Übergabe oder Reinigung folgt"],
    neededInfo: ["Berechtigung und Ansprechpartner", "Ort, Räume und Fotos", "Freigaben", "Zielzustand und Termin"],
    notPromised: ["keine Nachlassbewertung", "keine Rechtsberatung", "keine Gefahrstoffzusage"],
    nextStep: "Berechtigung, Ort, Umfang, Freigaben und Zielzustand senden.",
    cta: { href: "/kontakt?service=entruempelung&city=regensburg&intent=nachlassaufloesung&source=website", label: "Nachlassfall beschreiben" },
    serviceKeys: ["nachlassaufloesung", "wohnungsaufloesung"],
    intentKeys: ["nachlass", "diskret"],
    lastReviewed: reviewed,
  },
  {
    key: "grundreinigung",
    route: "/grundreinigung-regensburg",
    title: "Grundreinigung nach Fläche, Belägen und Zielzustand prüfen.",
    directAnswer:
      "Für eine Grundreinigung müssen Objektart, Fläche, Boden- und Oberflächenarten, aktueller Zustand, gewünschtes Ergebnis, Zugang, Fotos und Termin bekannt sein. Maschinen-, Fassaden- oder Gefahrstoffarbeiten werden nicht automatisch mit zugesagt.",
    usefulWhen: ["eine intensivere Reinigung als die laufende Pflege nötig ist", "Beläge und Zustand dokumentiert werden können", "ein Übergabetermin ansteht"],
    neededInfo: ["Ort und Objektart", "Fläche und Beläge", "Zustand und Fotos", "Zielzustand und Termin"],
    notPromised: ["keine Abnahmegarantie", "keine Spezialtechnik ohne Prüfung", "keine Termin- oder Preisgarantie"],
    nextStep: "Flächen, Beläge, Zustand und Ziel mit Fotos senden.",
    cta: { href: "/kontakt?service=grundreinigung&city=regensburg&intent=grundreinigung-regensburg&source=website", label: "Grundreinigung anfragen" },
    serviceKeys: ["grundreinigung"],
    intentKeys: ["reinigung", "grundreinigung"],
    lastReviewed: reviewed,
  },
  {
    key: "leerfahrt-rueckfahrt",
    route: "/leerfahrt-rueckfahrt",
    title: "Beiladung oder Rückfahrt nur passend zur echten Route prüfen.",
    directAnswer:
      "Eine Leer- oder Rückfahrt eignet sich nur, wenn Strecke, Datum, Ladepunkte, Gegenstände, Maße, Gewicht und freie Kapazität zu einer tatsächlich veröffentlichten Tour passen. Eine Anfrage reserviert keinen Platz und erzeugt keinen Pauschalpreis.",
    usefulWhen: ["Route und Datum flexibel sind", "eine Teilmenge transportiert werden soll", "Maße und Fotos vorliegen"],
    neededInfo: ["Start, Ziel und Datum", "Gegenstände, Maße und Gewicht", "Zugang und Etage", "Fotos und Kontaktweg"],
    notPromised: ["keine erfundene Tour", "keine Kapazitätsgarantie", "kein Preis ohne Routenprüfung"],
    nextStep: "Route, Datum, Maße, Gewicht und Fotos an die passende Tour senden.",
    cta: { href: "/leerfahrt-rueckfahrt#rueckfahrten", label: "Rückfahrten prüfen" },
    serviceKeys: ["leerfahrt", "rueckfahrt", "beiladung"],
    intentKeys: ["transport", "route"],
    lastReviewed: reviewed,
  },
  {
    key: "dringende-anfrage",
    route: "/plan-b-service",
    title: "Dringende Anfrage ohne Sofortzusage prüfen.",
    directAnswer:
      "Bei einer dringenden Anfrage prüft FLOXANT zuerst Ort, Service, Frist, Umfang, Zugang und vorhandene Alternativen. Eine 24-Stunden-, Soforttermin- oder Verfügbarkeitszusage entsteht erst nach ausdrücklicher manueller Bestätigung.",
    usefulWhen: ["ein Anbieter abgesagt hat", "eine Übergabe oder Frist naht", "ein Plan B benötigt wird"],
    neededInfo: ["Ort und Service", "genaue Frist", "Umfang und Fotos", "bisheriger Stand"],
    notPromised: ["keine 24-Stunden-Garantie", "keine automatische Verfügbarkeit", "keine Preisgarantie"],
    nextStep: "Ort, Leistung, Frist, Umfang und bisherigen Stand senden.",
    cta: { href: "/kontakt?mode=neutral&intent=dringende-anfrage&source=website", label: "Dringenden Fall prüfen lassen" },
    serviceKeys: ["plan-b", "notfallumzug"],
    intentKeys: ["dringend", "sofort", "24h"],
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
    cta: { href: "/kontakt?mode=neutral&source=website", label: "Solarfall pruefen" },
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
    cta: { href: "/kontakt?mode=neutral&source=website", label: "Uebergabe vorbereiten" },
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
    cta: { href: "/kontakt?mode=neutral&source=website", label: "Send English request" },
    serviceKeys: ["english-request"],
    intentKeys: ["english"],
    lastReviewed: reviewed,
  },
];

export function getAiAnswerByKey(key: AiAnswerKey) {
  const entry = aiAnswerEntries.find((item) => item.key === key);
  return entry ? { ...entry, neededInfo: entry.neededInfo.slice(0, 3) } : undefined;
}

export function getAiAnswerForRoute(route: string) {
  const cleanRoute = route.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const entry = aiAnswerEntries.find((item) => item.route === cleanRoute);
  return entry ? { ...entry, neededInfo: entry.neededInfo.slice(0, 3) } : undefined;
}

export function resolveAiAnswerKey(pathOrSignal: string): AiAnswerKey {
  const signal = pathOrSignal.toLowerCase();
  if (signal.includes("europa") || signal.includes("ausland") || signal.includes("international") || signal.includes("moving-from-germany")) return "europa-umzug";
  if (signal.includes("preisvorstellung") || signal.includes("preisrahmen") || signal.includes("budget")) return "budget-umzug";
  if (signal.includes("jobcenter") || signal.includes("krankenkasse") || signal.includes("pflegekasse") || signal.includes("sozialamt") || signal.includes("arbeitgeber") || signal.includes("kostenuebernahme") || signal.includes("cost-coverage")) return "kostenuebernahme";
  if (signal.includes("schwierig") || signal.includes("todesfall") || signal.includes("hardship") || signal.includes("difficult-situation")) return "schwierige-lebenssituation";
  if (signal.includes("angebot")) return "angebot-pruefen";
  if (signal.includes("english")) return "english-request";
  if (signal.includes("leerfahrt") || signal.includes("rueckfahrt") || signal.includes("beiladung")) return "leerfahrt-rueckfahrt";
  if (signal.includes("klavier")) return "klaviertransport-regensburg";
  if (signal.includes("senior")) return "seniorenumzug";
  if (signal.includes("nachlass") || signal.includes("wohnungsaufloesung") || signal.includes("haushaltsaufloesung")) return "nachlassaufloesung";
  if (signal.includes("entruempel")) return "entruempelung-regensburg";
  if (signal.includes("diskret") || signal.includes("private")) return "diskret-service";
  if (signal.includes("solar") || signal.includes("pv")) return "solar-pv";
  if (signal.includes("notfall") || signal.includes("dringend") || signal.includes("sofort") || signal.includes("24h") || signal.includes("plan-b")) return "dringende-anfrage";
  if (signal.includes("grundreinigung") || signal.includes("baureinigung")) return "grundreinigung";
  if (signal.includes("praxisreinigung")) return "duesseldorf-praxisreinigung";
  if (signal.includes("hotelreinigung")) return "regensburg-gewerbereinigung";
  if (signal.includes("unterhaltsreinigung") || signal.includes("treppenhausreinigung")) return "regensburg-bueroreinigung";
  if (signal.includes("fernumzug") || signal.includes("bueroumzug") || signal.includes("kleintransport")) return "umzug-regensburg";
  if (signal.includes("keller") || signal.includes("muellraum")) return "entruempelung-regensburg";
  if (signal.includes("regensburg") && signal.includes("bueroreinigung")) return "regensburg-bueroreinigung";
  if (signal.includes("regensburg") && signal.includes("gewerbereinigung")) return "regensburg-gewerbereinigung";
  if (signal.includes("bueroreinigung")) return "duesseldorf-bueroreinigung";
  if (signal.includes("gewerbereinigung")) return "duesseldorf-gewerbereinigung";
  if (signal.includes("regensburg") && signal.includes("umzug")) return "umzug-regensburg";
  if (signal.includes("regensburg") && signal.includes("reinigung")) return "reinigung-regensburg";
  if (signal.includes("duesseldorf") && signal.includes("reinigung")) return "duesseldorf-reinigung";
  if (signal.includes("regensburg")) return "regensburg";
  if (signal.includes("duesseldorf")) return "duesseldorf";
  return "angebot-pruefen";
}

export type DeterministicCustomerAnswer = {
  status: "matched" | "needs-clarification" | "manual-review";
  answer: string;
  neededInfo: string[];
  nextStep: string;
  cta: AiAnswerEntry["cta"];
  answerKey?: AiAnswerKey;
  safetyFlags: string[];
};

function normalizeSignal(value: string) {
  return value
    .toLocaleLowerCase("de-DE")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export function resolveDeterministicCustomerAnswer(input: {
  question: string;
  service?: string;
  location?: string;
}): DeterministicCustomerAnswer {
  const signal = normalizeSignal([input.question, input.service, input.location].filter(Boolean).join(" "));
  const hasDuesseldorf = signal.includes("duesseldorf");
  const hasRegensburg = signal.includes("regensburg");

  if (hasDuesseldorf && hasRegensburg) {
    return {
      status: "needs-clarification",
      answer: "Düsseldorf und Regensburg stehen beide in der Anfrage. Bitte nennen Sie eindeutig den Einsatzort; Leistungen und bestätigte Servicegebiete unterscheiden sich.",
      neededInfo: ["eindeutiger Einsatzort oder Start und Ziel", "gewünschte Leistung", "Termin oder Frist"],
      nextStep: "Einsatzort und Leistung im Kontaktformular eindeutig auswählen.",
      cta: { href: "/kontakt?mode=neutral&intent=ort-klaeren&source=antwortsystem", label: "Ort und Leistung klären" },
      safetyFlags: ["conflicting-location"],
    };
  }

  const specialTerms = ["asbest", "gefahrstoff", "chemikal", "kontamin", "tatort", "schimmel", "desinfektion", "fassadenreinigung", "lueftungsreinigung", "hausmeisterservice", "winterdienst", "rohrreinigung"];
  const matchedSpecialTerm = specialTerms.find((term) => signal.includes(term));
  if (matchedSpecialTerm) {
    return {
      status: "manual-review",
      answer: "Diese Anfrage enthält eine Gefahrstoff-, Hygiene- oder qualifizierte Spezialleistung. FLOXANT sagt sie nicht als Standardleistung zu. Zuerst müssen Stoff, Zustand, Ort, Zugang, Fotos und erforderliche Qualifikation persönlich geprüft werden.",
      neededInfo: ["genaue Art des Sonderfalls", "Ort und Objektart", "Fotos ohne unnötige persönliche Daten", "bekannte Gefahren- oder Stoffhinweise"],
      nextStep: "Sonderfall ohne Ausführungs- oder Terminannahme zur persönlichen Prüfung senden.",
      cta: { href: "/kontakt?mode=neutral&intent=manuelle-pruefung&source=antwortsystem", label: "Sonderfall prüfen lassen" },
      safetyFlags: ["qualified-service", matchedSpecialTerm],
    };
  }

  if (input.location?.trim() && !hasDuesseldorf && !hasRegensburg) {
    return {
      status: "manual-review",
      answer: "Der genannte Ort ist in dieser Anfrage keinem bestätigten Kerngebiet zugeordnet. Eine mögliche Anfahrt wird persönlich geprüft; daraus entsteht keine Gebiets-, Termin- oder Verfügbarkeitszusage.",
      neededInfo: ["vollständiger Einsatzort oder PLZ", "gewünschte Leistung", "Umfang", "Termin oder Frist"],
      nextStep: "Ort und Eckdaten zur persönlichen Gebietsprüfung senden.",
      cta: { href: "/kontakt?mode=neutral&intent=servicegebiet-pruefen&source=antwortsystem", label: "Servicegebiet prüfen lassen" },
      safetyFlags: ["unconfirmed-location"],
    };
  }

  const answerKey = resolveAiAnswerKey(signal);
  const entry = getAiAnswerByKey(answerKey) || getAiAnswerByKey("angebot-pruefen")!;
  const asksForPrice = /\b(preis|kosten|euro|eur|pauschal|guenstig|billig)\b/.test(signal);
  const asksForUrgency = /\b(24h|sofort|heute|morgen|dringend|notfall)\b/.test(signal);
  const safetyFlags = [
    ...(asksForPrice ? ["price-needs-scope"] : []),
    ...(asksForUrgency ? ["availability-needs-confirmation"] : []),
  ];
  const safeguards = [
    asksForPrice ? "Ein konkreter Preis wird erst nach Prüfung des Leistungsumfangs genannt." : "",
    asksForUrgency ? "Eine kurzfristige Verfügbarkeit oder ein 24-Stunden-Termin wird nicht automatisch bestätigt." : "",
  ].filter(Boolean).join(" ");

  return {
    status: "matched",
    answer: `${entry.directAnswer}${safeguards ? ` ${safeguards}` : ""}`,
    neededInfo: [...entry.neededInfo],
    nextStep: entry.nextStep,
    cta: entry.cta,
    answerKey: entry.key,
    safetyFlags,
  };
}
