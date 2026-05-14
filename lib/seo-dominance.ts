import { germanizeText } from "@/lib/german-text";

type Snippet = {
 title: string;
 description: string;
 cluster: "money" | "geo" | "support" | "conversion" | "blog";
 intent: string;
};

type SnippetInput = {
 title?: string;
 description?: string;
};

export const SEO_MONEY_ROUTES = [
 "/",
 "/empfehlen",
 "/angebotscheck",
 "/angebot-guenstiger-pruefen",
 "/plattform-auftrag-pruefen",
 "/plan-b-service",
 "/makler-vermieter-link",
 "/mieterwechsel-service-regensburg",
 "/wohnung-wieder-vermietbar",
 "/immobilie-verkaufsbereit-machen",
 "/nachlass-raeumung-regensburg",
 "/diskreter-umzug-trennung-scheidung",
 "/rueckfahrt-boerse",
 "/uebergabeakte",
 "/schadensbegrenzung",
 "/keller-muellraum-rettung-regensburg",
 "/einsatzradar-regensburg",
 "/reinigung-moeblierte-wohnung-duesseldorf",
 "/entsorgung-duesseldorf",
 "/duesseldorf/reinigung",
 "/duesseldorf/bueroreinigung",
 "/duesseldorf/grundreinigung",
 "/duesseldorf/treppenhausreinigung",
 "/buchung",
 "/rechner",
 "/umzug",
 "/reinigung",
 "/gewerbereinigung-regensburg",
 "/entruempelung",
 "/bueroumzug",
 "/firmenentsorgung",
 "/leerfahrt-rueckfahrt",
 "/private-client-service",
 "/service-area-bayern",
 "/einsatzgebiet-regensburg-200km",
 "/qualitaet-ablauf",
 "/praxisfaelle",
 "/kostenfaktoren",
 "/leistungen-vergleichen",
 "/anbieter-vergleichen",
 "/buchung-ablauf",
 "/kontakt",
] as const;

export const SEO_SUPPORT_ROUTES = [
 "/blog",
 "/ratgeber",
 "/floxant-fakten",
 "/empfehlen",
 "/angebotscheck",
 "/angebot-guenstiger-pruefen",
 "/plattform-auftrag-pruefen",
 "/plan-b-service",
 "/makler-vermieter-link",
 "/mieterwechsel-service-regensburg",
 "/wohnung-wieder-vermietbar",
 "/immobilie-verkaufsbereit-machen",
 "/nachlass-raeumung-regensburg",
 "/diskreter-umzug-trennung-scheidung",
 "/rueckfahrt-boerse",
 "/uebergabeakte",
 "/schadensbegrenzung",
 "/keller-muellraum-rettung-regensburg",
 "/einsatzradar-regensburg",
 "/reinigung-moeblierte-wohnung-duesseldorf",
 "/entsorgung-duesseldorf",
 "/duesseldorf/reinigung",
 "/duesseldorf/bueroreinigung",
 "/duesseldorf/grundreinigung",
 "/duesseldorf/treppenhausreinigung",
 "/buchung",
 "/gewerbereinigung-regensburg",
 "/beiladung",
 "/umzug-mit-reinigung",
 "/express-anfrage",
 "/anfrage-mit-preisrahmen",
 "/kleinmengen-entsorgung",
 "/qualitaet-ablauf",
 "/praxisfaelle",
 "/kostenfaktoren",
 "/leistungen-vergleichen",
 "/anbieter-vergleichen",
 "/buchung-ablauf",
 "/kontakt",
] as const;

const moneySnippets: Record<string, Snippet> = {
 "/": {
  title: "FLOXANT Regensburg | Umzug, Reinigung & Entrümpelung",
  description:
   "Umzug, Reinigung, Entrümpelung und Übergabe in Regensburg und Bayern: Fotos senden, Preisrahmen prüfen, Angebot vergleichen und direkt anfragen.",
  cluster: "money",
 intent: "Premium-Dienstleister für Umzug, Reinigung und Entrümpelung finden",
 },
 "/empfehlen": {
  title: "FLOXANT empfehlen | 50 Euro Empfehlungsbonus",
  description:
   "FLOXANT weiterempfehlen: Partnercode oder Empfehlungslink teilen. Bei bestaetigtem und bezahltem Auftrag wird der 50 Euro Bonus geprueft.",
  cluster: "conversion",
 intent: "FLOXANT an Freunde, Vermieter, Makler oder Unternehmen empfehlen und Partnercode nutzen",
 },
"/angebotscheck": {
  title: "Angebot prüfen lassen | FLOXANT Angebotscheck",
  description:
   "Angebot vor Zusage prüfen lassen: FLOXANT prüft Umfang, Preis, Termin, Zugang, Fotos, Zusatzkosten, Reinigung und Entsorgung.",
 cluster: "conversion",
  intent: "Vorhandenes Angebot mit Red-Flag-Scanner vor der Zusage prüfen und zweite Einschätzung anfragen",
 },
"/angebot-guenstiger-pruefen": {
 title: "Angebot prüfen & Alternative anfragen | FLOXANT",
 description:
  "Angebot einer anderen Firma prüfen lassen: Preis, Umfang, Fotos, Termin und Budget senden. FLOXANT prüft eine günstigere oder passendere Alternative.",
 cluster: "conversion",
 intent: "Umzugsangebot, Reinigungsangebot oder Entsorgungsangebot einer anderen Firma prüfen und günstigere oder passendere Alternative ohne Preisgarantie anfragen",
},
"/makler-vermieter-link": {
 title: "Fuer Makler & Vermieter | Objektfall direkt senden",
 description:
  "Direkter Objekt-Link fuer Makler, Vermieter, Eigentuemer und Hausverwaltungen: Fotos, Termin und offene Punkte an FLOXANT senden.",
 cluster: "conversion",
 intent: "Objektfall fuer Raeumung, Reinigung, Entsorgung oder Uebergabevorbereitung schnell an FLOXANT senden",
},
"/mieterwechsel-service-regensburg": {
 title: "Mieterwechsel-Service Regensburg | Raeumung, Reinigung & Uebergabe",
 description:
  "FLOXANT unterstützt Vermieter, Hausverwaltungen und Makler beim Mieterwechsel: Raeumung, Entsorgung, Endreinigung und Uebergabevorbereitung.",
 cluster: "money",
 intent: "Mieterwechsel-Fall in Regensburg fuer Hausverwaltung, Vermieter oder Makler anfragen",
},
 "/wohnung-wieder-vermietbar": {
  title: "Wohnung wieder vermietbar machen – Räumung, Reinigung & Entsorgung | FLOXANT",
  description:
   "Wohnung nach Auszug, Leerstand oder Mieterwechsel vorbereiten: FLOXANT prueft Raeumung, Entsorgung, Reinigung und Dokumentation nach Absprache.",
  cluster: "money",
  intent: "Wohnung nach Auszug fuer Besichtigung, Vermietung oder Nutzung vorbereiten lassen",
 },
 "/immobilie-verkaufsbereit-machen": {
  title: "Immobilie verkaufsbereit machen - Raeumung, Reinigung & Entsorgung | FLOXANT",
  description:
   "Wohnung oder Haus vor Verkauf, Besichtigung oder Expose vorbereiten: FLOXANT prueft Raeumung, Entsorgung, Reinigung und Dokumentation.",
  cluster: "money",
  intent: "Immobilie vor Verkauf, Besichtigung oder Expose praktisch vorbereiten lassen",
 },
 "/nachlass-raeumung-regensburg": {
  title: "Nachlass-Raeumung Regensburg | FLOXANT",
  description:
   "Wohnung, Haus, Keller oder Garage nach Erbfall diskret raeumen, entsorgen und reinigen lassen. FLOXANT prueft Umfang, Fotos, Freigabe und Termin.",
  cluster: "money",
  intent: "Nachlass- oder Erbfall-Wohnung in Regensburg diskret raeumen und reinigen lassen",
 },
 "/diskreter-umzug-trennung-scheidung": {
  title: "Diskreter Umzug bei Trennung oder Scheidung | FLOXANT",
  description:
   "Diskreter Auszug in Regensburg: Rueckruf, sichere Kontaktmethode, Transport, Reinigung, Schluesseluebergabe und Uebergabeakte nach Absprache pruefen lassen.",
  cluster: "money",
  intent: "Diskreten Auszug bei Trennung, Scheidung oder sensibler privater Situation anfragen",
 },
 "/rueckfahrt-boerse": {
  title: "Rückfahrt-Börse | Leerfahrt & Strecke prüfen",
  description:
   "Start, Ziel, Datum und Umfang eintragen. FLOXANT prüft Rückfahrt, Leerfahrt oder flexible Transportlösung ab Regensburg und Bayern.",
  cluster: "conversion",
  intent: "Flexible Transportstrecke für Rückfahrt oder Leerfahrt eintragen und prüfen lassen",
 },
 "/uebergabeakte": {
  title: "FLOXANT Übergabeakte | Auszug dokumentieren",
  description:
   "Organisatorische Dokumentation für Auszug, Reinigung, Fotos, Schlüsselstatus und Übergabe nach Absprache. Keine Rechtsberatung.",
 cluster: "conversion",
 intent: "Übergabeakte für Auszug, Reinigung oder Schlüsselübergabe anfragen",
 },
"/schadensbegrenzung": {
 title: "Schadensbegrenzung bei Umzug, Reinigung & Uebergabe | FLOXANT",
 description:
  "Wenn Umzug, Reinigung, Entruempelung oder Uebergabe kurzfristig kippen: Ort, Deadline, Fotos und offene Punkte senden.",
 cluster: "conversion",
 intent: "Akute Kipplage bei Umzug, Reinigung, Entruempelung oder Uebergabe nach Verfuegbarkeit pruefen lassen",
},
"/keller-muellraum-rettung-regensburg": {
 title: "Keller- & Muellraum-Rettung Regensburg | FLOXANT",
 description:
  "Keller, Muellraum, Garage oder Nebenflaeche zugestellt? FLOXANT prueft Raeumung, Entsorgung und Reinigung fuer Hausverwaltung, WEG und Gewerbe.",
 cluster: "money",
 intent: "Keller, Muellraum oder Nebenflaeche in Regensburg mit Fotos und Freigabe pruefen lassen",
},
"/buchung": {
  title: "FLOXANT direkt anfragen | Regensburg & Bayern",
  description:
   "Direkte FLOXANT Anfrage starten: Umzug, Reinigung, Entrümpelung, Transport oder Entsorgung wählen, Fotos senden, Budget nennen und Rückmeldung erhalten.",
  cluster: "conversion",
  intent: "Direkt aus Google Maps oder Google Search eine FLOXANT Anfrage starten",
 },
 "/rechner": {
  title: "FLOXANT Kostenrechner | Preisrahmen prüfen",
  description:
   "Preisrahmen für Umzug, Reinigung, Entrümpelung, Entsorgung oder Büroumzug einschätzen: Service wählen, Ort, Zugang, Fotos und Budget senden.",
  cluster: "conversion",
  intent: "Preisrahmen und Aufwand vor einer Anfrage einordnen",
 },
 "/umzug": {
  title: "Umzug Regensburg | Fotos senden & Preis prüfen",
  description:
   "Umzug in Regensburg und Bayern prüfen lassen: Volumen, Etagen, Laufwege, Fotos, vorhandenes Angebot, Zusatzleistungen und Übergabe sauber planen.",
  cluster: "money",
  intent: "Umzugsunternehmen in Regensburg oder Bayern beauftragen",
 },
 "/reinigung": {
  title: "Reinigung Regensburg | Endreinigung & Übergabe",
  description:
   "Reinigung in Regensburg und Bayern: Wohnung, Büro, Endreinigung und Übergabe mit Fläche, Zustand, Fotos, Termin und Budget prüfen lassen.",
  cluster: "money",
  intent: "Reinigungsfirma für Übergabe oder Objektservice finden",
 },
 "/gewerbereinigung-regensburg": {
  title: "Gewerbereinigung Regensburg | Büro, Praxis, Kanzlei",
  description:
   "Gewerbereinigung in Regensburg für Büros, Praxen, Kanzleien, Treppenhäuser und Immobilien. Direkte B2B-Anfrage statt Streuklicks.",
  cluster: "money",
  intent: "Gewerbereinigung in Regensburg für Büro, Praxis oder Kanzlei anfragen",
 },
 "/entruempelung": {
  title: "Entrümpelung Regensburg | Räumung & Entsorgung",
  description:
   "Entrümpelung, Wohnungsauflösung und Entsorgung in Regensburg und Bayern: Fotos, Volumen, Zugang, Material und Reinigung danach prüfen.",
  cluster: "money",
  intent: "Entrümpelung oder Wohnungsauflösung anfragen",
 },
 "/bueroumzug": {
  title: "Büroumzug Regensburg & Bayern | Firmenumzug planen",
  description:
   "Büro oder Firma umziehen? FLOXANT prüft Arbeitsplätze, IT, Archiv, Zugang und Zeitfenster für eine strukturierte Anfrage.",
  cluster: "money",
  intent: "Büroumzug oder Firmenumzug planen",
 },
 "/firmenentsorgung": {
  title: "Firmenentsorgung Regensburg | Büro & Gewerbe",
  description:
   "Büroinventar, Möbel oder Restmengen entsorgen? FLOXANT prüft Menge, Zugang und Abholung für Firmen, Praxen und Büros.",
  cluster: "money",
  intent: "Büro- oder Firmenentsorgung anfragen",
 },
 "/leerfahrt-rueckfahrt": {
  title: "Leer-Rückfahrt Regensburg | freie Ladefläche fair nutzen",
  description:
   "Freien Laderaum Richtung Regensburg nutzen: Möbel, Kartons, Paletten oder Büroinventar fair mitnehmen lassen, wenn Route und Datum passen.",
  cluster: "money",
  intent: "Günstige Rückfahrt oder Beiladung Richtung Regensburg finden",
 },
 "/private-client-service": {
  title: "Private Client Bayern | diskreter Premium-Service",
  description:
   "Diskreter Service für hochwertige Häuser und Anwesen: Umzug, Reinigung, Räumung und Entsorgung in Bayern und Baden-Württemberg.",
  cluster: "money",
  intent: "Diskreten Premium-Service für hochwertige Privathaushalte finden",
 },
 "/service-area-bayern": {
  title: "FLOXANT Bayern | Umzug & Reinigung ab Regensburg",
  description:
   "Regensburg ist Kernregion, Bayern das Einsatzgebiet: Umzug, Reinigung, Entrümpelung, Büroumzug und Zusatzservices realistisch prüfen.",
  cluster: "geo",
  intent: "FLOXANT Einsatzgebiet in Bayern prüfen",
 },
 "/standorte": {
  title: "FLOXANT Standorte | Regensburg, Bayern, Umgebung",
  description:
   "Passende Einsatzseite finden: Regensburg, Bayern, Umzug, Reinigung, Entrümpelung, Büroumzug und wichtige Orte im Überblick.",
  cluster: "geo",
  intent: "FLOXANT Einsatzort und passende Stadtseite finden",
 },
 "/floxant-fakten": {
  title: "FLOXANT Fakten | Leistungen, Region & Preislogik",
  description:
   "Kompakte Fakten zu FLOXANT: Umzug, Reinigung, Entrümpelung, Regensburg, Bayern, Preisrahmen, Grenzen und kanonische Einstiege.",
  cluster: "support",
  intent: "FLOXANT schnell und korrekt einordnen",
 },
 "/einsatzgebiet-regensburg-200km": {
  title: "Einsatzgebiet Regensburg 200 km | FLOXANT Bayern",
  description:
   "Umzug, Reinigung, Entrümpelung und Büroumzug ab Regensburg: Bayernweit anfragen und Einsatz nach Strecke realistisch prüfen.",
  cluster: "geo",
  intent: "Einsatzgebiet rund um Regensburg verstehen",
 },
 "/qualitaet-ablauf": {
  title: "FLOXANT Qualität & Ablauf | Warum Kunden anfragen",
  description:
   "Klarer Ablauf statt Chaos: Vorprüfung, ehrlicher Preisrahmen, saubere Kommunikation und strukturierte Umsetzung erklären.",
  cluster: "support",
  intent: "Vertrauen, Ablauf und Qualität vor einer Anfrage prüfen",
 },
 "/praxisfaelle": {
  title: "FLOXANT Praxisfälle | passenden Service finden",
  description:
   "Typische Fälle vergleichen: Umzug mit Reinigung, Büroumzug, Entrümpelung, Firmenentsorgung und Leer-Rückfahrt richtig wählen.",
  cluster: "support",
  intent: "Typische Fälle vergleichen und passenden FLOXANT Service finden",
 },
 "/kostenfaktoren": {
  title: "Kostenfaktoren Umzug & Reinigung | Preisrahmen verstehen",
  description:
   "Warum kostet ein Auftrag mehr oder weniger? Volumen, Fläche, Zugang, Termin und Extras verständlich vor der Anfrage prüfen.",
  cluster: "support",
  intent: "Kostenfaktoren verstehen und realistischen Preisrahmen vorbereiten",
 },
 "/leistungen-vergleichen": {
  title: "FLOXANT Leistungen vergleichen | welcher Service passt?",
  description:
   "Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt oder Private Client? Passenden FLOXANT Service schnell finden.",
  cluster: "support",
  intent: "Passenden FLOXANT Service anhand der eigenen Situation auswählen",
 },
 "/anbieter-vergleichen": {
  title: "FLOXANT vs Vergleichsportal | Anbieter Regensburg prüfen",
  description:
   "Direkt beim Dienstleister statt anonymer Lead-Runde: Preisrahmen, Ablauf, Serviceklarheit und Verantwortung vor der Anfrage prüfen.",
  cluster: "support",
  intent: "Dienstleister objektiv vergleichen und FLOXANT richtig einordnen",
 },
 "/buchung-ablauf": {
  title: "FLOXANT Buchung | Rechner, Anfrage, Angebot",
  description:
   "So läuft es ab: Preisrahmen prüfen, Anfrage senden, Angebot erhalten und Auftrag sauber abstimmen. Ohne versteckte Sofortbindung.",
  cluster: "conversion",
  intent: "Buchungsprozess, Anfrage und Dokumente vor dem Start verstehen",
 },
 "/kontakt": {
  title: "FLOXANT Kontakt | Rechner, WhatsApp & Buchung",
  description:
   "Direkt starten: Rechner, Express-Check, Preisvorschlag, WhatsApp, Telefon oder E-Mail für Umzug, Reinigung und Entrümpelung in Regensburg.",
  cluster: "conversion",
  intent: "FLOXANT erreichen, Anfrage starten oder passenden Kontaktweg wählen",
 },
 "/blog": {
  title: "FLOXANT Ratgeber | Umzug, Reinigung & Preise",
  description:
   "Praxisnahe Hilfe zu Umzug, Reinigung, Entrümpelung, Beiladung, Preisvorstellung und Serviceplanung in Regensburg und Bayern.",
  cluster: "blog",
  intent: "Vor einer Anfrage informieren und passende FLOXANT Seite finden",
 },
 "/ratgeber": {
  title: "Ratgeber Umzug & Reinigung | FLOXANT Bayern",
  description:
   "Checklisten, Kostenfaktoren und klare Entscheidungshilfen für Umzug, Reinigung, Entrümpelung, Leerfahrt und Wohnungsauflösung.",
  cluster: "blog",
  intent: "Vor einer Anfrage fundiert recherchieren",
 },
 "/umzug-bayern": {
  title: "Umzug Bayern | Preisrahmen ab Regensburg prüfen",
  description:
   "Umzug in Bayern geplant? FLOXANT prüft Strecke, Volumen, Zugang, Montage und Terminlage für eine klare Anfrage.",
  cluster: "geo",
  intent: "Umzugsunternehmen in Bayern anfragen",
 },
 "/reinigung-bayern": {
  title: "Reinigung Bayern | Endreinigung & Übergabe planen",
  description:
   "Reinigung in Bayern anfragen: Wohnung, Haus, Büro oder Übergabe mit Fläche, Zustand und Extras sauber vorprüfen.",
  cluster: "geo",
  intent: "Reinigungsfirma in Bayern anfragen",
 },
 "/entruempelung-bayern": {
  title: "Entrümpelung Bayern | Räumung & Entsorgung prüfen",
  description:
   "Entrümpelung in Bayern: Volumen, Material, Zugang, Demontage und Entsorgung realistisch einschätzen lassen.",
  cluster: "geo",
  intent: "Entrümpelung in Bayern anfragen",
 },
 "/wohnungsaufloesung-bayern": {
  title: "Wohnungsauflösung Bayern | Räumung sauber planen",
  description:
   "Wohnungsauflösung in Bayern vorbereiten: Räume, Mengen, Zugang, Entsorgung, Reinigung und Übergabe strukturiert klären.",
  cluster: "geo",
  intent: "Wohnungsauflösung in Bayern planen",
 },
 "/24h-umzug-bayern": {
  title: "24h Umzug Bayern | Express-Machbarkeit prüfen",
  description:
   "Kurzfristiger Umzug in Bayern? Region, Umfang, Zugang und Terminfenster senden. FLOXANT prüft die Machbarkeit.",
  cluster: "support",
  intent: "Kurzfristigen Umzug in Bayern prüfen",
 },
 "/beiladung": {
  title: "Beiladung Regensburg | Möbeltransport fair mitnehmen",
  description:
   "Einzelmöbel, Kartons oder kleine Mengen? Beiladung ab Regensburg und in Bayern prüfen, wenn Route und Zeitfenster passen.",
  cluster: "support",
  intent: "Beiladung statt Vollumzug prüfen",
 },
 "/umzug-mit-reinigung": {
  title: "Umzug mit Endreinigung Regensburg | FLOXANT",
  description:
   "Umzug und Endreinigung in Regensburg zusammen anfragen: Transport, Reinigung, Fotos, Schlüsselthemen und Übergabe sauber abstimmen.",
  cluster: "support",
  intent: "Umzug und Endreinigung in Regensburg zusammen planen",
 },
 "/express-anfrage": {
  title: "Express-Check Regensburg | schnelle Machbarkeit prüfen",
  description:
   "Wenig Zeit? Mit wenigen Eckdaten starten. FLOXANT prüft Termin, Region, Aufwand und Machbarkeit ohne langes Formular.",
  cluster: "conversion",
  intent: "Schnelle Anfrage mit wenigen Angaben starten",
 },
 "/anfrage-mit-preisrahmen": {
  title: "Preisvorschlag senden | FLOXANT Anfrage mit Budget",
  description:
   "Eigenes Zielbudget nennen und trotzdem ehrlich prüfen lassen: Kundenwunsch und FLOXANT Orientierungsrahmen bleiben getrennt.",
  cluster: "conversion",
  intent: "Anfrage mit Zielbudget oder Preisvorstellung senden",
 },
 "/kleinmengen-entsorgung": {
  title: "Kleinmengen-Entsorgung Regensburg | Möbel & Restmengen",
  description:
   "Möbel, Kartons, Restmengen oder Einzelstücke entsorgen? Kleine Mengen in Regensburg und Bayern sauber vorprüfen lassen.",
  cluster: "support",
  intent: "Kleine Entsorgungsmenge anfragen",
 },
};

moneySnippets["/endreinigung-regensburg"] = {
 title: "Endreinigung Regensburg | Auszug & Übergabe",
 description:
  "Endreinigung in Regensburg für Wohnung, Auszug und Übergabe: Fläche, Zustand, Fotos, Termin und Budget realistisch prüfen lassen.",
 cluster: "money",
 intent: "Endreinigung in Regensburg vor Auszug oder Wohnungsübergabe anfragen",
};

moneySnippets["/halteverbotszone-regensburg"] = {
 title: "Halteverbotszone Regensburg | Umzug besser planen",
 description:
  "Halteverbotszone für Umzug oder Transport in Regensburg nach Absprache prüfen: Ort, Frist, Ladeweg, Fahrzeug und Termin klären.",
 cluster: "support",
 intent: "Halteverbotszone für Umzug in Regensburg organisieren lassen",
};

moneySnippets["/duesseldorf/reinigung"] = {
 title: "Reinigung Düsseldorf | Wohnung, Büro & Übergabe",
 description:
  "Reinigung in Düsseldorf für Wohnung, Auszug, Endreinigung und B2B-Flächen. Fotos, Fläche, Termin und Budget senden. Keine Umzüge in Düsseldorf.",
 cluster: "money",
 intent: "Reinigung in Düsseldorf für privat oder B2B anfragen",
};

moneySnippets["/duesseldorf/bueroreinigung"] = {
 title: "B2B-Reinigung Düsseldorf | Büros & kleine Unternehmen",
 description:
  "B2B-Reinigung in Düsseldorf für kleine Unternehmen, Büros, Agenturen, Studios, Kanzleien und Gewerbeflächen: Fläche, Frequenz, Fotos und Zeitfenster senden.",
 cluster: "money",
 intent: "B2B-Reinigung in Düsseldorf für kleine Unternehmen anfragen",
};

moneySnippets["/duesseldorf/grundreinigung"] = {
 title: "Grundreinigung Düsseldorf | Wohnung, Büro & Objekt",
 description:
  "Grundreinigung in Düsseldorf für Wohnungen, Büros und kleine Gewerbeflächen nach Absprache: Fläche, Zustand, Fotos, Termin und Budget prüfen lassen.",
 cluster: "money",
 intent: "Grundreinigung in Düsseldorf mit Fotos und Umfang anfragen",
};

moneySnippets["/duesseldorf/treppenhausreinigung"] = {
 title: "Treppenhausreinigung Düsseldorf | Objekt & Hausverwaltung",
 description:
  "Treppenhausreinigung in Düsseldorf für kleinere Objekte und Hausverwaltungen nach Absprache: Zugang, Frequenz, Fläche und Fotos senden.",
 cluster: "money",
 intent: "Treppenhausreinigung in Düsseldorf für Objekt oder Hausverwaltung anfragen",
};

moneySnippets["/entsorgung-duesseldorf"] = {
 title: "Entsorgung Düsseldorf | Möbel, Sperrmüll & Abholung",
 description:
  "Entsorgung in Düsseldorf für Möbel, Sperrmüll und kleinere Räumungen: Fotos, Umfang, Zugang, Termin und Budget senden. Reinigung separat möglich.",
 cluster: "money",
 intent: "Entsorgung oder Möbelentsorgung in Düsseldorf anfragen",
};

moneySnippets["/reinigung-moeblierte-wohnung-duesseldorf"] = {
 title: "Reinigung möblierte Wohnung Düsseldorf | Apartment & Gästewechsel",
 description:
  "Reinigung für möblierte Wohnungen, Apartments und Kurzzeitvermietung in Düsseldorf: Terminfenster, Fotos, Zugang, Wäschewunsch und Budget prüfen lassen.",
 cluster: "money",
 intent: "Möblierte Wohnung oder Apartment-Reinigung in Düsseldorf anfragen",
};

moneySnippets["/schluesseluebergabe"] = {
 title: "Schlüsselübergabe Service | Protokoll & Übergabe",
 description:
  "Schlüsselübergabe nach Umzug, Reinigung oder Auszug: Termin, Fotos, Übergabepunkte und Protokoll organisatorisch abstimmen.",
 cluster: "support",
 intent: "Schlüsselübergabe mit Übergabeprotokoll vorbereiten",
};

moneySnippets["/leerfahrt-rueckfahrt"] = {
 title: "Leerfahrt & Rückfahrt anfragen | FLOXANT",
 description:
  "Leerfahrt oder Rückfahrt für Transport und Umzug anfragen: Strecke, Datum, Umfang und Flexibilität nennen. FLOXANT prüft Verfügbarkeit.",
 cluster: "money",
 intent: "Günstige Rückfahrt oder Beiladung Richtung Regensburg finden",
};

moneySnippets["/rueckfahrt-boerse"] = {
 title: "Rückfahrt-Börse – Strecke eintragen | FLOXANT",
 description:
  "Rückfahrt oder Leerfahrt prüfen lassen: Start, Ziel, Datum, Flexibilität, Umfang und Fotos senden. Keine Fake-Tour, sondern Verfügbarkeitsprüfung.",
 cluster: "conversion",
 intent: "Flexible Transportstrecke in der Rückfahrt-Börse prüfen lassen",
};

moneySnippets["/wohnung-wieder-vermietbar"] = {
 title: "Wohnung wieder vermietbar machen – Räumung, Reinigung & Entsorgung | FLOXANT",
 description:
  "Wohnung nach Auszug, Leerstand oder Mieterwechsel vorbereiten: Raeumung, Entsorgung, Reinigung, Fotos und Uebergabeakte nach Absprache.",
 cluster: "money",
 intent: "Wohnung fuer Besichtigung, Nutzung oder Vermietung praktisch vorbereiten lassen",
};

moneySnippets["/immobilie-verkaufsbereit-machen"] = {
 title: "Immobilie verkaufsbereit machen | FLOXANT",
 description:
  "Objekt vor Verkauf, Besichtigung oder Expose vorbereiten: Raeumung, Entsorgung, Reinigung, Fotos und Uebergabeakte nach Absprache.",
 cluster: "money",
 intent: "Immobilie fuer Verkauf, Besichtigung oder Expose durch Raeumung und Reinigung vorbereiten lassen",
};

moneySnippets["/nachlass-raeumung-regensburg"] = {
 title: "Nachlass-Raeumung Regensburg | FLOXANT",
 description:
  "Wohnung, Haus, Keller oder Garage nach Erbfall diskret klaeren: Freigabe, Fotos, Raeumung, Entsorgung, Reinigung und Rueckruf nach Absprache.",
 cluster: "money",
 intent: "Nachlass-Raeumung oder Wohnungsaufloesung in Regensburg diskret anfragen",
};

moneySnippets["/diskreter-umzug-trennung-scheidung"] = {
 title: "Diskreter Umzug bei Trennung oder Scheidung | FLOXANT",
 description:
  "Diskreter Auszug in Regensburg: Rueckruf, sichere Kontaktmethode, Transport, Reinigung, Schluesseluebergabe und Uebergabeakte nach Absprache.",
 cluster: "money",
 intent: "Diskreten Auszug in sensibler privater Situation mit Rueckruf und sicherer Kontaktmethode anfragen",
};

moneySnippets["/uebergabeakte"] = {
 title: "FLOXANT Übergabeakte – Auszug & Übergabe dokumentieren",
 description:
  "Übergabeakte nach Absprache anfragen: erledigte Leistungen, Fotos, Schlüsselstatus und Hinweise organisatorisch dokumentieren lassen.",
 cluster: "conversion",
 intent: "Organisatorische Übergabeakte für Auszug oder Wohnungsübergabe anfragen",
};

moneySnippets["/schadensbegrenzung"] = {
 title: "Schadensbegrenzung bei Umzug, Reinigung & Uebergabe | FLOXANT",
 description:
  "Plan gekippt? FLOXANT prueft kurzfristig Ort, Deadline, Fotos, offene Punkte und Machbarkeit fuer Umzug, Reinigung, Entruempelung oder Uebergabe.",
 cluster: "conversion",
 intent: "Kurzfristige Schadensbegrenzung ohne Notdienst-Garantie anfragen",
};

moneySnippets["/plan-b-service"] = {
 title: "Plan-B-Service für Umzug, Reinigung & Übergabe | FLOXANT",
 description:
  "Ablauf unsicher? FLOXANT prüft nach Verfügbarkeit einen Ersatz- oder Ergänzungsplan für Umzug, Reinigung, Räumung, Entsorgung und Übergabe.",
 cluster: "conversion",
 intent: "Plan B für unsicheren Umzug, Reinigung oder Übergabe prüfen lassen",
};

moneySnippets["/plattform-auftrag-pruefen"] = {
 title: "Plattform-Auftrag prüfen lassen | FLOXANT",
 description:
  "Bereits über Plattform oder Anbieter angefragt? FLOXANT prüft Umfang, Preis, Termin, Fotos und offene Punkte organisatorisch vor der Zusage.",
 cluster: "conversion",
 intent: "Plattform-Angebot oder Auftrag praktisch prüfen und zweite Einschätzung anfragen",
};

moneySnippets["/keller-muellraum-rettung-regensburg"] = {
 title: "Keller- & Muellraum-Rettung Regensburg | FLOXANT",
 description:
  "Keller, Muellraum, Garage oder Nebenflaeche blockiert? Fotos, Freigabe, Zugang und Umfang senden; FLOXANT prueft Raeumung, Entsorgung und Reinigung.",
 cluster: "money",
 intent: "Objektflaeche fuer Hausverwaltung, WEG, Vermieter oder Gewerbe in Regensburg pruefen lassen",
};

moneySnippets["/einsatzradar-regensburg"] = {
 title: "FLOXANT Einsatzradar Regensburg | Einsatzarten & Servicegebiet",
 description:
  "Typische und anonymisierte Einsatzarten im Raum Regensburg: Umzug, Reinigung, Entrümpelung, Rückfahrt, Übergabeakte und Objektservice.",
 cluster: "geo",
 intent: "Lokale FLOXANT Einsatzarten und Servicezonen rund um Regensburg ansehen",
};

moneySnippets["/private-client-service"] = {
 title: "Premium Umzug & Service | diskret geplant",
 description:
  "Diskreter Premium-Service für hochwertige Kunden: Umzug, Reinigung, Übergabe und Koordination mit persönlicher Vorprüfung.",
 cluster: "money",
 intent: "Diskreten Luxusservice für hochwertige Privathaushalte finden",
};

moneySnippets["/"] = {
 title: "FLOXANT – Umzug, Reinigung & Entrümpelung in Regensburg",
 description:
  "Umzug, Reinigung, Entrümpelung und Übergabe in Regensburg: FLOXANT bündelt Transport, Endreinigung, Räumung und Zusatzservices.",
 cluster: "money",
 intent: "Direkten Dienstleister für Umzug, Reinigung und Entrümpelung mit Buchung finden",
};

moneySnippets["/umzug-regensburg"] = {
 title: "Umzug Regensburg – Transport, Reinigung & Übergabe",
 description:
  "Umzug in Regensburg mit Planung, Transport, Endreinigung, Schlüsselübergabe und Halteverbotszone nach Absprache. Fotos oder Budget senden.",
 cluster: "money",
 intent: "Umzug oder Umzugsunternehmen in Regensburg anfragen",
};

moneySnippets["/reinigung-regensburg"] = {
 title: "Reinigung Regensburg – Endreinigung & Übergabe",
 description:
  "Reinigung in Regensburg für Wohnung, Auszug und Übergabe. Fotos senden, Budget nennen und Aufwand realistisch prüfen lassen.",
 cluster: "money",
 intent: "Reinigung oder Endreinigung in Regensburg anfragen",
};

moneySnippets["/entruempelung-regensburg"] = {
 title: "Entrümpelung Regensburg – Wohnung, Keller & Reinigung",
 description:
  "Entrümpelung in Regensburg für Wohnung, Keller, Garage und Sperrmüll. Fotos senden, Preisrahmen prüfen und Reinigung ergänzen.",
 cluster: "money",
 intent: "Entrümpelung in Regensburg anfragen",
};

moneySnippets["/kleintransport-regensburg"] = {
 title: "Transport Regensburg – Möbel, Kleintransport & Rückfahrt",
 description:
  "Transport in Regensburg für Möbel und Einzelstücke. Route, Zugang, Fotos, Haltezone und Leerfahrt/Rückfahrt nach Verfügbarkeit prüfen.",
 cluster: "money",
 intent: "Transport oder Möbeltransport in Regensburg anfragen",
};

moneySnippets["/buchung"] = {
 title: "FLOXANT direkt anfragen | Regensburg & Bayern",
 description:
  "Direkte FLOXANT Anfrage starten: Umzug, Reinigung, Entrümpelung, Transport oder Entsorgung wählen, Fotos senden, Budget nennen und Rückmeldung erhalten.",
 cluster: "conversion",
 intent: "FLOXANT direkt aus Google Maps oder Google Search buchen oder anfragen",
};

moneySnippets["/anbieter-vergleichen"] = {
 title: "FLOXANT vs Vergleichsportal | direkt anfragen",
 description:
  "Umzugsfirma, Reinigungsfirma oder Entrümpelung vergleichen: direkte Vorprüfung, klare Kostentreiber und Verantwortung statt Lead-Runde.",
 cluster: "support",
 intent: "FLOXANT gegen Vergleichsportale und lokale Anbieter prüfen",
};

moneySnippets["/rechner"] = {
 title: "FLOXANT Kostenrechner | Preisrahmen prüfen",
 description:
  "Preisrahmen für Umzug, Reinigung, Entrümpelung, Entsorgung oder Büroumzug einschätzen: Service wählen, Ort, Zugang, Fotos und Budget senden.",
 cluster: "conversion",
 intent: "Kostenrahmen für Umzug, Reinigung oder Entrümpelung realistisch prüfen",
};

moneySnippets["/umzug"] = {
 title: "Umzug Regensburg | Fotos senden & Preis prüfen",
 description:
  "Umzug in Regensburg und Bayern prüfen lassen: Volumen, Etagen, Laufwege, Fotos, vorhandenes Angebot, Zusatzleistungen und Übergabe sauber planen.",
 cluster: "money",
 intent: "Umzugsunternehmen in Regensburg direkt anfragen",
};

moneySnippets["/reinigung"] = {
 title: "Reinigung Regensburg | Endreinigung & Übergabe",
 description:
  "Reinigung in Regensburg und Bayern: Wohnung, Büro, Endreinigung und Übergabe mit Fläche, Zustand, Fotos, Termin und Budget prüfen lassen.",
 cluster: "money",
 intent: "Reinigungsfirma in Regensburg für Übergabe oder Objektservice finden",
};

moneySnippets["/entruempelung"] = {
 title: "Entrümpelung Regensburg | Räumung & Entsorgung",
 description:
  "Entrümpelung, Wohnungsauflösung und Entsorgung in Regensburg und Bayern: Fotos, Volumen, Zugang, Material und Reinigung danach prüfen.",
 cluster: "money",
 intent: "Entrümpelung oder Wohnungsauflösung in Regensburg anfragen",
};

moneySnippets["/bueroumzug"] = {
 title: "Büroumzug Regensburg | Firmenumzug klar planen",
 description:
  "Arbeitsplätze, IT, Archiv, Möbel, Zugang und Zeitfenster strukturiert prüfen lassen. FLOXANT plant Büroumzüge in Regensburg und Bayern.",
 cluster: "money",
 intent: "Büroumzug oder Firmenumzug in Regensburg und Bayern planen",
};

moneySnippets["/firmenentsorgung"] = {
 title: "Firmenentsorgung Regensburg | Büro & Gewerbe",
 description:
  "Büromöbel, Inventar, Aktenreste oder Restmengen entsorgen lassen. FLOXANT prüft Menge, Zugang und Abholung für Firmen.",
 cluster: "money",
 intent: "Firmenentsorgung für Büro, Praxis oder Gewerbe anfragen",
};

moneySnippets["/express-anfrage"] = {
 title: "Express-Check Regensburg | schnelle Anfrage starten",
 description:
  "Wenig Zeit? Mit wenigen Eckdaten Machbarkeit für Umzug, Reinigung, Entrümpelung, Leerfahrt oder Transport prüfen lassen.",
 cluster: "conversion",
 intent: "Schnelle Dienstleister-Anfrage mit wenigen Angaben starten",
};

moneySnippets["/qualitaet-ablauf"] = {
 title: "FLOXANT Qualität & Ablauf | direkt Vertrauen prüfen",
 description:
  "So arbeitet FLOXANT: Vorprüfung, Preisrahmen, Kommunikation, Arbeitsauftrag und Dokumente klar nachvollziehen.",
 cluster: "support",
 intent: "Qualität, Ablauf und Vertrauenssignale vor einer Anfrage prüfen",
};

moneySnippets["/kostenfaktoren"] = {
 title: "Umzug Kostenfaktoren | Preisrahmen realistisch verstehen",
 description:
  "Warum ein Auftrag mehr oder weniger kostet: Volumen, Fläche, Zugang, Strecke, Termin und Extras vor der Anfrage verstehen.",
 cluster: "support",
 intent: "Kostenfaktoren verstehen und Preisrahmen realistisch vorbereiten",
};

moneySnippets["/leistungen-vergleichen"] = {
 title: "FLOXANT Leistungen | Umzug, Reinigung, Entrümpelung",
 description:
  "Welcher Service passt? Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt und Private Client klar vergleichen.",
 cluster: "support",
 intent: "Passenden FLOXANT Service schnell auswählen",
};

moneySnippets["/service-area-bayern"] = {
 title: "FLOXANT Bayern | aus Regensburg bayernweit tätig",
 description:
  "FLOXANT arbeitet ab Regensburg für Bayern: Umzug, Reinigung, Entrümpelung, Büroumzug und Leerfahrt nach Strecke prüfen.",
 cluster: "geo",
 intent: "FLOXANT Einsatzgebiet in Bayern und rund um Regensburg prüfen",
};

moneySnippets["/einsatzgebiet-regensburg-200km"] = {
 title: "Servicegebiet Regensburg & Umgebung | FLOXANT",
 description:
  "Regensburg als Kern: Umzug, Reinigung, Entrümpelung und Transport in der Umgebung bis ca. 200 km und Bayern nach Verfügbarkeit prüfen.",
 cluster: "geo",
 intent: "FLOXANT Servicegebiet rund um Regensburg und Bayern einordnen",
};

const serviceCityPatterns = [
 {
  prefix: "/umzug-",
  service: "Umzug",
  titles: [
   (city: string) => `Umzug ${city} | Preisrahmen direkt prüfen`,
   (city: string) => `Umzugsfirma ${city} | Aufwand sauber prüfen`,
   (city: string) => `Umzugsservice ${city} | Strecke & Termin klären`,
   (city: string) => `Umzug in ${city} | FLOXANT Anfrage starten`,
  ],
  descriptions: [
   (city: string) =>
    `Umzug in ${city}: FLOXANT prüft Volumen, Zugang, Strecke, Termin und Extras. Anfrage mit Fotos oder Preisrahmen strukturiert starten.`,
   (city: string) =>
    `Umzugsfirma für ${city} gesucht? FLOXANT klärt Etagen, Laufwege, Möbelumfang, Strecke und Zusatzleistungen nach Verfügbarkeit.`,
   (city: string) =>
    `Umzugsservice ${city}: Strecke, Transportumfang, Haltezone, Reinigung und Übergabe realistisch einschätzen lassen und direkt anfragen.`,
   (city: string) =>
    `FLOXANT prüft Umzüge in ${city} mit Fokus auf Volumen, Zugang, Zeitfenster, Zusatzleistungen und nachvollziehbaren Preisrahmen.`,
  ],
 },
 {
  prefix: "/reinigung-",
  service: "Reinigung",
  titles: [
   (city: string) => `Reinigung ${city} | Übergabe sauber planen`,
   (city: string) => `Reinigungsfirma ${city} | Objekt prüfen lassen`,
   (city: string) => `Endreinigung ${city} | Fläche & Termin klären`,
   (city: string) => `Wohnungsreinigung ${city} | FLOXANT Anfrage`,
  ],
  descriptions: [
   (city: string) =>
    `Reinigung in ${city}: FLOXANT prüft Fläche, Zustand, Objektart, Termin und Extras für Endreinigung, Übergabe und Objektservice.`,
   (city: string) =>
    `Reinigungsfirma für ${city} gesucht? Fotos, Fläche, Verschmutzung, Zeitfenster und Übergabeanforderungen direkt prüfen lassen.`,
   (city: string) =>
    `Endreinigung in ${city}: Wohnungszustand, Räume, Bad, Küche, Böden und Übergabetermin klar erfassen und Anfrage starten.`,
   (city: string) =>
    `FLOXANT prüft Reinigungsanfragen in ${city} für Wohnung, Büro, Grundreinigung und saubere Übergabe nach Verfügbarkeit.`,
  ],
 },
 {
  prefix: "/entruempelung-",
  service: "Entrümpelung",
  titles: [
   (city: string) => `Entrümpelung ${city} | Räumung prüfen`,
   (city: string) => `Räumung ${city} | Entsorgung klar anfragen`,
   (city: string) => `Keller entrümpeln ${city} | FLOXANT prüft`,
   (city: string) => `Entrümpelungsservice ${city} | Fotos senden`,
  ],
  descriptions: [
   (city: string) =>
    `Entrümpelung in ${city}: FLOXANT prüft Volumen, Material, Zugang, Laufwege und Entsorgung. Fotos senden und Umfang klären.`,
   (city: string) =>
    `Räumung in ${city} anfragen: Keller, Wohnung, Garage oder Nebenfläche mit Zugang, Menge, Termin und Entsorgung prüfen lassen.`,
   (city: string) =>
    `Entrümpelungsservice ${city}: Möbel, Sperrmüll, Kellerflächen und normale Gegenstände nach Absprache einschätzen und anfragen.`,
   (city: string) =>
    `FLOXANT prüft Entrümpelung in ${city} mit Fotoeinschätzung, Mengenprüfung, Zugangsklärung und optionaler Reinigung danach.`,
  ],
 },
 {
  prefix: "/bueroumzug-",
  service: "Büroumzug",
  titles: [
   (city: string) => `Büroumzug ${city} | Firmenumzug klar planen`,
   (city: string) => `Firmenumzug ${city} | Büro & Archiv prüfen`,
   (city: string) => `Büroumzug in ${city} | Zeitfenster klären`,
   (city: string) => `Office-Umzug ${city} | FLOXANT Anfrage`,
  ],
  descriptions: [
   (city: string) =>
    `Büroumzug in ${city}: Arbeitsplätze, IT, Archiv, Zugang, Zeitfenster und Zusatzleistungen strukturiert prüfen und anfragen.`,
   (city: string) =>
    `Firmenumzug ${city}: FLOXANT klärt Bürogröße, Möbel, Kartons, Technik, Aufzug, Laufwege und Termin nach Verfügbarkeit.`,
   (city: string) =>
    `Büro in ${city} umziehen: Umfang, Etagen, sensible Unterlagen, Zeitfenster und Reinigung nach dem Umzug sauber abstimmen.`,
   (city: string) =>
    `FLOXANT prüft Büroumzüge in ${city} für kleine Teams, Praxen, Kanzleien und Gewerbeflächen mit klarer Ablaufplanung.`,
  ],
 },
 {
  prefix: "/wohnungsaufloesung-",
  service: "Wohnungsauflösung",
  titles: [
   (city: string) => `Wohnungsauflösung ${city} | Räumung planen`,
   (city: string) => `Wohnung räumen ${city} | Entsorgung prüfen`,
   (city: string) => `Haushaltsauflösung ${city} | FLOXANT Anfrage`,
   (city: string) => `Wohnungsräumung ${city} | Umfang klären`,
  ],
  descriptions: [
   (city: string) =>
    `Wohnungsauflösung in ${city}: Räume, Mengen, Zugang, Entsorgung, Reinigung und Übergabe sauber vorprüfen und Anfrage vorbereiten.`,
   (city: string) =>
    `Wohnung in ${city} räumen lassen: FLOXANT prüft Möbel, Hausrat, Keller, Laufwege, Termin und Entsorgung nach Absprache.`,
   (city: string) =>
    `Haushaltsauflösung ${city}: Fotos, Räume, Nebenflächen, Schlüsselstatus und gewünschte Reinigung strukturiert senden und prüfen lassen.`,
   (city: string) =>
   `FLOXANT prüft Wohnungsräumungen in ${city} für Eigentümer, Vermieter, Erben und Hausverwaltungen mit klarer Objektvorbereitung.`,
  ],
 },
 {
  prefix: "/halteverbotszone-",
  service: "Halteverbotszone",
  titles: [
   (city: string) => `Halteverbotszone ${city} | Umzug planen`,
   (city: string) => `Halteverbot ${city} | Zugang prüfen lassen`,
   (city: string) => `Umzug Haltezone ${city} | FLOXANT Anfrage`,
   (city: string) => `Halteverbotszone in ${city} | Termin klären`,
  ],
  descriptions: [
   (city: string) =>
    `Halteverbotszone in ${city}: Datum, Adresse, Ladeweg, Fahrzeuggröße und Vorlaufzeit strukturiert prüfen und Umzug besser vorbereiten.`,
   (city: string) =>
    `Halteverbot für ${city} anfragen: FLOXANT klärt Zugang, Laufwege, Fahrzeug, Terminfenster und mögliche Abstimmung nach Verfügbarkeit.`,
   (city: string) =>
    `Umzug in ${city} mit Haltezone planen: Engstellen, Ladefläche, Etage, Trageweg und Zeitfenster vorab realistisch einordnen.`,
   (city: string) =>
    `FLOXANT prüft Halteverbotszonen in ${city} als Baustein für Umzug, Transport, Büroumzug oder größere Objektanfragen.`,
  ],
 },
 {
  prefix: "/klaviertransport-",
  service: "Klaviertransport",
  titles: [
   (city: string) => `Klaviertransport ${city} | Zugang prüfen`,
   (city: string) => `Klavier transportieren ${city} | FLOXANT`,
   (city: string) => `Pianotransport ${city} | Etage & Termin klären`,
   (city: string) => `Klaviertransport in ${city} | Anfrage starten`,
  ],
  descriptions: [
   (city: string) =>
    `Klaviertransport in ${city}: Etage, Treppenhaus, Gewicht, Zugang, Strecke, Termin und Fotos vorab prüfen lassen.`,
   (city: string) =>
    `Klavier oder Piano in ${city} transportieren: FLOXANT klärt Trageweg, Schutzbedarf, Fahrzeug, Helfer und Machbarkeit nach Absprache.`,
   (city: string) =>
    `Pianotransport ${city}: Fotos, Maße, Start, Ziel, Aufzug, Treppen und Terminfenster senden, damit der Aufwand prüfbar wird.`,
   (city: string) =>
    `FLOXANT prüft Klaviertransporte in ${city} als Spezialtransport mit Zugangsklärung, Terminprüfung und realistischer Einschätzung.`,
  ],
 },
 {
  prefix: "/seniorenumzug-",
  service: "Seniorenumzug",
  titles: [
   (city: string) => `Seniorenumzug ${city} | ruhig planen`,
   (city: string) => `Umzug für Senioren ${city} | FLOXANT`,
   (city: string) => `Senioren-Umzug ${city} | Ablauf klären`,
   (city: string) => `Seniorenumzug in ${city} | Rückruf möglich`,
  ],
  descriptions: [
   (city: string) =>
    `Seniorenumzug in ${city}: Umfang, Möbel, Kartons, Termin, Reinigung, Übergabe und Angehörigen-Abstimmung ruhig prüfen lassen.`,
   (city: string) =>
    `Umzug für Senioren in ${city}: FLOXANT klärt Zugang, Möbelumfang, Zeitfenster, Zusatzservices und Rückruf nach Absprache.`,
   (city: string) =>
    `Senioren-Umzug ${city}: Fotos, Zimmer, Etage, Aufzug, Hilfe durch Angehörige und Übergabeziel strukturiert senden.`,
   (city: string) =>
    `FLOXANT prüft Seniorenumzüge in ${city} mit ruhiger Planung, Transport, Reinigung und Übergabe nach Verfügbarkeit.`,
  ],
 },
 {
  prefix: "/studentenumzug-",
  service: "Studentenumzug",
  titles: [
   (city: string) => `Studentenumzug ${city} | klein & klar planen`,
   (city: string) => `Umzug für Studenten ${city} | FLOXANT`,
   (city: string) => `Studenten-Umzug ${city} | Beiladung prüfen`,
   (city: string) => `Studentenumzug in ${city} | Anfrage starten`,
  ],
  descriptions: [
   (city: string) =>
    `Studentenumzug in ${city}: Kartons, Möbel, Etage, Strecke, Beiladung und Terminfenster kompakt prüfen lassen.`,
   (city: string) =>
    `Umzug für Studenten in ${city}: FLOXANT klärt kleinen Transport, Zugang, Budget, Fotos und mögliche Rückfahrt nach Verfügbarkeit.`,
   (city: string) =>
    `Studenten-Umzug ${city}: WG-Zimmer, Einzelmöbel, Kartons, Start, Ziel und Zeitfenster schnell in eine Anfrage bringen.`,
   (city: string) =>
    `FLOXANT prüft Studentenumzüge in ${city} als kleine Umzugs- oder Transportanfrage mit klarer Preisrahmen-Vorprüfung.`,
  ],
 },
] as const;

const regensburgCoreCitySlugs = new Set([
 "regensburg",
 "neutraubling",
 "lappersdorf",
 "pentling",
 "obertraubling",
 "regenstauf",
 "sinzing",
 "bad-abbach",
 "nittendorf",
 "wenzenbach",
 "tegernheim",
 "barbing",
 "donaustauf",
 "zeitlarn",
]);

const bayernHubCitySlugs = new Set([
 "muenchen",
 "muenchen-schwabing",
 "nuernberg",
 "augsburg",
 "ingolstadt",
 "landshut",
 "passau",
 "wuerzburg",
 "bamberg",
 "bayreuth",
 "erlangen",
 "fuerth",
 "coburg",
 "rosenheim",
 "straubing",
 "schwandorf",
]);

function getCitySlugFromLocalRoute(route: string, prefix: string) {
 return route.slice(prefix.length).replace(/\/+$/, "");
}

function getLocalCoverageSentence(route: string, prefix: string, city: string) {
 const citySlug = getCitySlugFromLocalRoute(route, prefix);

 if (citySlug === "regensburg") {
  return "Regensburg ist der operative Kern; Angebot, Fotos, Termin und Budget werden direkt passend zur Leistung geprüft";
 }

 if (regensburgCoreCitySlugs.has(citySlug)) {
  return `${city} liegt im direkten Regensburg-Nahbereich; Strecke, Zugang, Fotos und Kapazität werden vor Anfrage sauber eingeordnet`;
 }

 if (bayernHubCitySlugs.has(citySlug)) {
  return `${city} wird als Bayern-Strecke nach Verfügbarkeit geprüft; Rückfahrt, Zeitfenster und Umfang zählen besonders`;
 }

 return `${city} wird über den FLOXANT-Regensburg-Radius geprüft; Ort, Fotos und Preisrahmen helfen bei der schnellen Einschätzung`;
}

function getLocalServiceSentence(service: string) {
 if (service === "Reinigung") {
  return "Reinigungsangebot, Übergabeziel, Fläche und Zustand können direkt mitgesendet werden";
 }

 if (service === "Entrümpelung" || service === "Wohnungsauflösung") {
  return "Räumungsangebot, Menge, Zugang, Entsorgung und Reinigung danach können gemeinsam geprüft werden";
 }

 if (service === "Halteverbotszone") {
  return "Haltezone, Ladeweg, Fahrzeuggröße und Umzugstermin werden als Vorbereitungsbaustein geklärt";
 }

 if (service === "Klaviertransport") {
  return "Etage, Treppenhaus, Maße, Schutzbedarf und Strecke werden vor Zusage realistisch geprüft";
 }

 if (service === "Seniorenumzug") {
  return "Rückruf, Angehörigen-Abstimmung, Reinigung und Übergabe können ruhig mitgedacht werden";
 }

 if (service === "Studentenumzug") {
  return "Budget, Beiladung, Einzelmöbel, Kartons und Zeitfenster werden kompakt eingeordnet";
 }

 return "Vorhandene Angebote können zusätzlich günstiger, klarer oder passender geprüft werden";
}

function strengthenLocalDescription(route: string, prefix: string, service: string, city: string, description: string) {
 const base = description.replace(/\s*[.!?]\s*$/, "");
 return `${base}. ${getLocalCoverageSentence(route, prefix, city)}. ${getLocalServiceSentence(service)}.`;
}

function variantIndex(value: string, count: number) {
 if (count <= 1) return 0;
 let hash = 0;
 for (let index = 0; index < value.length; index += 1) {
  hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
 }
 return hash % count;
}

function normalizeRoute(path: string) {
 const cleanPath = (path || "/").split("?")[0].split("#")[0].replace(/\/+$/, "");
 return cleanPath ? (cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`) : "/";
}

function titleCaseCity(slug: string) {
 const minorWords = new Set(["am", "an", "der", "die", "das", "bei", "in", "im", "vorm", "zum", "zur"]);
 const words = slug
  .split("-")
  .filter(Boolean)
  .map((word, index) => {
   const lower = word.toLowerCase();
   const normalized = germanizeText(lower);
   if (index > 0 && minorWords.has(lower)) return normalized;
   return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  });

 return germanizeText(words.join(" "));
}

export function getDominanceSnippet(path: string, fallback: SnippetInput): SnippetInput {
 const route = normalizeRoute(path);
 const exact = moneySnippets[route];

 if (exact) {
  return { title: exact.title, description: exact.description };
 }

 for (const pattern of serviceCityPatterns) {
  if (!route.startsWith(pattern.prefix)) continue;

  const city = titleCaseCity(route.slice(pattern.prefix.length));
  const title = pattern.titles[variantIndex(route, pattern.titles.length)](city);
  const baseDescription = pattern.descriptions[variantIndex(`${route}:description`, pattern.descriptions.length)](city);
  const description = strengthenLocalDescription(route, pattern.prefix, pattern.service, city, baseDescription);
  return {
   title,
   description,
  };
 }

 return fallback;
}

export function getDominanceIntent(path: string) {
 const route = normalizeRoute(path);
 const exact = moneySnippets[route];

 if (exact) return exact.intent;

 const cityMatch = serviceCityPatterns.find((pattern) => route.startsWith(pattern.prefix));
 if (cityMatch) {
  return `${cityMatch.service} in einer konkreten Stadt anfragen`;
 }

 if (route.startsWith("/blog/") || route.startsWith("/ratgeber/")) {
  return "Ratgeber lesen und zum passenden Service weitergehen";
 }

 return "FLOXANT Dienstleistung verstehen und Anfrage vorbereiten";
}

