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
 "/duesseldorf/putzfirma",
 "/duesseldorf/hausverwaltung-reinigung",
 "/duesseldorf/reinigungskraft-buero",
 "/duesseldorf/reinigung-stadtteile-umgebung",
 "/duesseldorf/vielleicht-guenstiger",
 "/angebot-vergleichen-duesseldorf",
 "/duesseldorf/bueroreinigung",
 "/duesseldorf/b2b-reinigung",
 "/duesseldorf/firmenreinigung",
 "/duesseldorf/fensterreinigung",
 "/duesseldorf/baureinigung",
 "/duesseldorf/teppichreinigung",
 "/duesseldorf/unterhaltsreinigung",
 "/duesseldorf/gebaeudereinigung",
 "/duesseldorf/objektreinigung",
 "/duesseldorf/ladenreinigung",
 "/duesseldorf/sonderreinigung",
 "/duesseldorf/gewerbereinigung",
 "/duesseldorf/hotelreinigung",
 "/duesseldorf/kanzleireinigung",
 "/duesseldorf/praxisreinigung",
 "/duesseldorf/it-raum-reinigung",
 "/duesseldorf/krankenhausreinigung",
 "/duesseldorf/kellerreinigung",
 "/duesseldorf/entsorgung",
 "/duesseldorf/wohnungsreinigung",
 "/duesseldorf/grundreinigung",
 "/duesseldorf/treppenhausreinigung",
 "/duesseldorf/endreinigung",
 "/duesseldorf/umzug",
 "/duesseldorf/entruempelung",
 "/duesseldorf/haushaltsaufloesung",
 "/regensburg/reinigung",
 "/regensburg/gewerbereinigung",
 "/buchung",
 "/rechner",
 "/umzug",
 "/umzug-regensburg",
 "/umzugsunternehmen-regensburg",
 "/umzug-aufhausen",
 "/umzug-friedberg",
 "/umzug-forchheim",
 "/umzug-neumarkt",
 "/umzug-ingolstadt",
 "/umzug-weiden",
 "/umzug-muenchen",
 "/umzug-nuernberg",
 "/klaviertransport-regensburg",
 "/klaviertransport",
 "/klaviertransport-muenchen",
 "/klaviertransport-nuernberg",
 "/seniorenumzug-bayern",
 "/seniorenumzug-nuernberg",
 "/seniorenumzug-erlangen",
 "/reinigung",
 "/reinigung-muenchen",
 "/notfallreinigung-24h",
 "/reinigung-nach-veranstaltung",
 "/gewerbereinigung-regensburg",
 "/bueroreinigung-regensburg",
 "/praxisreinigung-regensburg",
 "/hotelreinigung-regensburg",
 "/fensterreinigung-regensburg",
 "/baureinigung-regensburg",
 "/teppichreinigung-regensburg",
 "/treppenhausreinigung-regensburg",
 "/unterhaltsreinigung-regensburg",
 "/grundreinigung-regensburg",
 "/entruempelung",
 "/entruempelung-bayern",
 "/entruempelung-regensburg",
 "/entruempelung-nuernberg",
 "/entruempelung-landshut",
 "/wohnungsaufloesung-regensburg",
 "/wohnungsaufloesung-bayern",
 "/bueroumzug",
 "/bueroumzug-regensburg",
 "/bueroumzug-nuernberg",
 "/firmenentsorgung",
 "/kleinmengen-entsorgung",
 "/geruchslos-protokoll",
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
 "/duesseldorf/putzfirma",
 "/duesseldorf/hausverwaltung-reinigung",
 "/duesseldorf/reinigungskraft-buero",
 "/duesseldorf/reinigung-stadtteile-umgebung",
 "/duesseldorf/vielleicht-guenstiger",
 "/angebot-vergleichen-duesseldorf",
 "/duesseldorf/bueroreinigung",
 "/duesseldorf/b2b-reinigung",
 "/duesseldorf/firmenreinigung",
 "/duesseldorf/fensterreinigung",
 "/duesseldorf/baureinigung",
 "/duesseldorf/teppichreinigung",
 "/duesseldorf/unterhaltsreinigung",
 "/duesseldorf/gebaeudereinigung",
 "/duesseldorf/objektreinigung",
 "/duesseldorf/ladenreinigung",
 "/duesseldorf/sonderreinigung",
 "/duesseldorf/gewerbereinigung",
 "/duesseldorf/hotelreinigung",
 "/duesseldorf/kanzleireinigung",
 "/duesseldorf/praxisreinigung",
 "/duesseldorf/it-raum-reinigung",
 "/duesseldorf/krankenhausreinigung",
 "/duesseldorf/kellerreinigung",
 "/duesseldorf/entsorgung",
 "/duesseldorf/wohnungsreinigung",
 "/duesseldorf/grundreinigung",
 "/duesseldorf/treppenhausreinigung",
 "/duesseldorf/endreinigung",
 "/duesseldorf/umzug",
 "/duesseldorf/entruempelung",
 "/duesseldorf/haushaltsaufloesung",
 "/regensburg/reinigung",
 "/regensburg/gewerbereinigung",
 "/buchung",
 "/gewerbereinigung-regensburg",
 "/bueroreinigung-regensburg",
 "/praxisreinigung-regensburg",
 "/hotelreinigung-regensburg",
 "/fensterreinigung-regensburg",
 "/baureinigung-regensburg",
 "/teppichreinigung-regensburg",
 "/treppenhausreinigung-regensburg",
 "/unterhaltsreinigung-regensburg",
 "/grundreinigung-regensburg",
 "/notfallreinigung-24h",
 "/reinigung-nach-veranstaltung",
 "/beiladung",
 "/umzug-regensburg",
 "/umzugsunternehmen-regensburg",
 "/umzug-aufhausen",
 "/umzug-friedberg",
 "/umzug-forchheim",
 "/umzug-neumarkt",
 "/umzug-ingolstadt",
 "/umzug-weiden",
 "/umzug-muenchen",
 "/umzug-nuernberg",
 "/klaviertransport-regensburg",
 "/klaviertransport",
 "/klaviertransport-muenchen",
 "/klaviertransport-nuernberg",
 "/seniorenumzug-bayern",
 "/seniorenumzug-nuernberg",
 "/seniorenumzug-erlangen",
 "/umzug-mit-reinigung",
 "/express-anfrage",
 "/anfrage-mit-preisrahmen",
 "/kleinmengen-entsorgung",
 "/entruempelung-regensburg",
 "/entruempelung-nuernberg",
 "/entruempelung-bayern",
 "/entruempelung-landshut",
 "/wohnungsaufloesung-regensburg",
 "/wohnungsaufloesung-bayern",
 "/bueroumzug-regensburg",
 "/bueroumzug-nuernberg",
 "/geruchslos-protokoll",
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
 intent: "Verlässlichen Dienstleister für Umzug, Reinigung und Entrümpelung finden",
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
 title: "Angebot prüfen: Reinigung & Umzug | FLOXANT",
 description:
  "Reinigungsfirma-Angebot, Umzugsangebot oder Entsorgungspreis prüfen: Preis, Umfang, Fotos, Termin und Budget senden. Alternative anfragen.",
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
  title: "FLOXANT direkt anfragen | Umzug, Reinigung & Räumung",
  description:
   "Direkte FLOXANT Anfrage starten: Umzug, Reinigung, Entrümpelung, Haushaltsauflösung oder Entsorgung wählen, Fotos senden und Rückmeldung erhalten.",
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
 "/notfallreinigung-24h": {
  title: "Notfallreinigung 24h | schnell Fotos senden",
  description:
   "Dringende Reinigung für Wohnung, Büro, Gewerbe, Veranstaltung oder Übergabe: Ort, Fotos, Termin und Zugang senden. FLOXANT prüft schnell.",
  cluster: "money",
  intent: "Dringende Reinigung bei Zeitdruck, Party, Übergabe oder Objektproblem anfragen",
 },
 "/reinigung-nach-veranstaltung": {
  title: "Reinigung nach Veranstaltung & Party | FLOXANT",
  description:
   "Reinigung nach Party, Firmenfeier, Empfang, Seminar oder Event: Böden, Sanitär, Küche, Müll, Geruch und Übergabe sauber prüfen lassen.",
  cluster: "money",
  intent: "Reinigung nach Veranstaltung, Party, Firmenfeier oder Anlass anfragen",
 },
 "/gewerbereinigung-regensburg": {
 title: "Gewerbereinigung Regensburg | Büro, Praxis & Angebot",
 description:
   "Gewerbereinigung Regensburg für Büro, Praxis, Hotel und Objekt: Raumliste, Turnus, Fläche, Zeitfenster, Zugang und Fotos direkt senden.",
  cluster: "money",
  intent: "Gewerbereinigung in Regensburg für Büro, Praxis, Hotel, Treppenhaus, Glas, Bau oder IT-Raum anfragen",
 },
 "/bueroreinigung-regensburg": {
  title: "Büroreinigung Regensburg | Angebot & Kosten",
  description:
   "Büroreinigung Regensburg für Büro, Kanzlei, Agentur und Verwaltung: Fläche, Turnus, Küche, Sanitär, Zeitfenster und Fotos senden.",
  cluster: "money",
  intent: "Büroreinigung in Regensburg mit Angebot, Kostenfaktoren und Turnus anfragen",
 },
 "/praxisreinigung-regensburg": {
  title: "Praxisreinigung Regensburg | Arztpraxis & Angebot",
  description:
   "Praxisreinigung und Arztpraxis-Reinigung Regensburg: Empfang, Wartebereich, Büro, Sanitär, Turnus, Zeitfenster, Fotos und Angebot prüfen.",
  cluster: "money",
  intent: "Praxisreinigung oder Arztpraxis Reinigung in Regensburg mit Turnus und Leistungsgrenzen anfragen",
 },
 "/hotelreinigung-regensburg": {
  title: "Hotelreinigung Regensburg | Hotel & Angebot prüfen",
  description:
   "Hotelreinigung Regensburg für Hotel, Pension, Boardinghouse, Lobby, Flure und Zimmer: Turnus, Check-out, Zeitfenster, Fotos und Angebot senden.",
  cluster: "money",
  intent: "Hotelreinigung in Regensburg für Hotel, Pension, Boardinghouse oder Apartmenthaus anfragen",
 },
 "/fensterreinigung-regensburg": {
  title: "Fensterreinigung Regensburg | Glas, Rahmen & Angebot",
  description:
   "Fensterreinigung Regensburg für Glas, Rahmen, Büro, Praxis, Hotel, Wohnung und Schaufenster: Fensterzahl, Etage, Zugang und Fotos senden.",
  cluster: "money",
  intent: "Fensterreinigung oder Glasreinigung in Regensburg mit Kostenfaktoren und Angebot anfragen",
 },
 "/baureinigung-regensburg": {
  title: "Baureinigung Regensburg | Bauendreinigung & Staub",
  description:
   "Baureinigung Regensburg nach Renovierung, Sanierung oder Handwerkern: Bauzustand, Baustaub, Fenster, Boden, Zugang und Fotos senden.",
  cluster: "money",
  intent: "Baureinigung, Bauendreinigung, Baufeinreinigung oder Reinigung nach Renovierung in Regensburg anfragen",
 },
 "/teppichreinigung-regensburg": {
  title: "Teppichreinigung Regensburg | Polster & Sofa",
  description:
   "Teppichreinigung Regensburg fuer Teppichboden, Sofa, Polster und Buerostuehle: Material, Flecken, Fotos, Zugang und Termin senden.",
  cluster: "money",
  intent: "Teppichreinigung, Teppichbodenreinigung, Polsterreinigung oder Sofa-Reinigung in Regensburg anfragen",
 },
 "/treppenhausreinigung-regensburg": {
  title: "Treppenhausreinigung Regensburg | Hausverwaltung",
  description:
   "Treppenhausreinigung Regensburg für Hausverwaltung, WEG, Mietshaus und Objekt: Eingänge, Etagen, Aufzug, Turnus, Zugang und Fotos senden.",
  cluster: "money",
  intent: "Treppenhausreinigung in Regensburg für Hausverwaltung, WEG oder Mietshaus anfragen",
 },
 "/unterhaltsreinigung-regensburg": {
  title: "Unterhaltsreinigung Regensburg | Büro & Objekt",
  description:
   "Unterhaltsreinigung Regensburg für Büro, Praxis, Kanzlei und Treppenhaus: Turnus, Fläche, Reinigungsplan, Fotos und Angebot prüfen.",
  cluster: "money",
  intent: "Regelmäßige Unterhaltsreinigung in Regensburg mit Turnus und Reinigungsplan anfragen",
 },
 "/grundreinigung-regensburg": {
  title: "Grundreinigung Regensburg | Wohnung & Büro",
  description:
   "Grundreinigung Regensburg für Wohnung, Büro, Küche, Bad, Einzug, Auszug und starke Verschmutzung: Fotos, Fläche und Angebot prüfen.",
  cluster: "money",
  intent: "Grundreinigung in Regensburg für Wohnung, Büro, Auszug oder starke Verschmutzung anfragen",
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
  title: "Private Client Bayern | diskrete Abstimmung",
  description:
   "Diskreter Service für sensible Häuser und Anwesen: Umzug, Reinigung, Räumung und Entsorgung in Bayern und Baden-Württemberg.",
  cluster: "money",
  intent: "Diskrete Hilfe für sensible Privathaushalte finden",
 },
 "/service-area-bayern": {
  title: "FLOXANT Bayern | Umzug & Reinigung ab Regensburg",
  description:
   "Regensburg ist Kernregion, Bayern das Einsatzgebiet: Umzug, Reinigung, Entrümpelung, Büroumzug und Zusatzleistungen realistisch prüfen.",
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
   "Kompakte Fakten zu FLOXANT: Umzug, Reinigung, Entrümpelung, Regensburg, Bayern, Preisrahmen, Grenzen und kanonische Startpunkte.",
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
   "Direkt beim Dienstleister statt anonymer Weitergabe: Preisrahmen, Ablauf, Serviceklarheit und Verantwortung vor der Anfrage prüfen.",
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

moneySnippets["/duesseldorf/putzfirma"] = {
 title: "Putzservice Düsseldorf | Privathaushalt & Angebot",
 description:
  "Putzdienst und Putzfirma Düsseldorf für Privathaushalt, Wohnung, Büro oder Objekt: Stadtteil, Fotos, Termin und Angebot senden.",
 cluster: "money",
 intent: "Putzservice oder Putzfirma in Düsseldorf einfach anfragen",
};

moneySnippets["/duesseldorf/reinigung"] = {
 title: "Reinigungsfirma Düsseldorf | Wohnung & Büro prüfen",
 description:
  "Reinigungsfirma in Düsseldorf für Wohnung, Büro, Praxis und Übergabe: Stadtteil, Fläche, Fotos, Termin, Turnus und Budget direkt senden.",
 cluster: "money",
 intent: "Reinigung in Düsseldorf für privat, Büro oder Firma anfragen",
};

moneySnippets["/duesseldorf/bueroreinigung"] = {
 title: "B2B Büroreinigung Düsseldorf | Firma & Praxis prüfen",
 description:
  "Büroreinigung Düsseldorf für kleine Firmen, Kanzlei, Praxis und Hotelbereich: Raumliste, Turnus, Zeitfenster, Zugang und Fotos direkt senden.",
 cluster: "money",
 intent: "Firmenreinigung in Düsseldorf für Firma, Büro oder Hotel anfragen",
};

moneySnippets["/duesseldorf/b2b-reinigung"] = {
 title: "Firmenreinigung Düsseldorf | Firma, Büro & Objekt",
 description:
  "Firmenreinigung Düsseldorf für Büro, Firma, Kanzlei, Praxis, Hotel und Gewerbefläche. Stadtteil, Fläche, Turnus, Fotos und Ansprechpartner senden.",
 cluster: "money",
 intent: "Firmenreinigung in Düsseldorf für kleine Unternehmen und Objektflächen anfragen",
};

moneySnippets["/duesseldorf/firmenreinigung"] = {
 title: "Firmenreinigung Düsseldorf | Büro, Studio & Gewerbe",
 description:
  "Firmenreinigung in Düsseldorf für kleine Unternehmen, Studios, Agenturen und Gewerbeflächen: Fläche, Räume, Turnus, Zugang und Fotos prüfen lassen.",
 cluster: "money",
 intent: "Firmenreinigung in Düsseldorf für kleine Unternehmen anfragen",
};

moneySnippets["/duesseldorf/gebaeudereinigung"] = {
 title: "Gebäudereinigung Düsseldorf Pempelfort | Angebot",
 description:
  "Gebäudereinigung Düsseldorf, Pempelfort, Altstadt und Umgebung: Büro, Praxis, Treppenhaus, Objekt, Fotos und Turnus prüfen.",
 cluster: "money",
 intent: "Gebäudereinigung in Düsseldorf oder Pempelfort anfragen",
};

moneySnippets["/duesseldorf/objektreinigung"] = {
 title: "Objektreinigung Düsseldorf | Fläche & Turnus prüfen",
 description:
  "Objektreinigung Düsseldorf für Gewerbeflächen, Hausflur, Büro, Laden und Nebenflächen: Fläche, Turnus, Zugang und Fotos senden.",
 cluster: "money",
 intent: "Objektreinigung in Düsseldorf mit Objektart und Turnus anfragen",
};

moneySnippets["/duesseldorf/hausverwaltung-reinigung"] = {
 title: "Hausverwaltung Reinigung Düsseldorf | WEG & Treppenhaus",
 description:
  "Reinigung für Hausverwaltung, WEG, Hauseingang, Kellerflur und Treppenhaus in Düsseldorf: Etagen, Turnus, Schlüsselweg und Fotos senden.",
 cluster: "money",
 intent: "Hausverwaltungs- oder Treppenhausreinigung in Düsseldorf und Umgebung prüfen",
};

moneySnippets["/duesseldorf/reinigungskraft-buero"] = {
 title: "Büro reinigen Düsseldorf | Reinigungskraft prüfen",
 description:
  "Büro reinigen in Düsseldorf: Raumliste, Sanitär, Küche, Turnus, Zeitfenster, Fotos und Angebot für Reinigungskraft oder Firma klären.",
 cluster: "money",
 intent: "Büroreinigung oder Reinigungskraft für Büro in Düsseldorf anfragen",
};

moneySnippets["/duesseldorf/fensterreinigung"] = {
 title: "Fensterreiniger Düsseldorf | Glasreinigung prüfen",
 description:
  "Fensterreiniger und Glasreinigung Düsseldorf für Fenster, Rahmen, Glasflächen und Schaufenster: Anzahl, Etage, Zugang, Fotos und Termin senden.",
 cluster: "money",
 intent: "Fensterreinigung und Glasreinigung in Düsseldorf mit Fotos anfragen",
};

moneySnippets["/duesseldorf/baureinigung"] = {
 title: "Baureinigung Düsseldorf | Renovierung & Staub",
 description:
  "Baureinigung Düsseldorf nach Renovierung, Umbau oder Handwerkern: Baustaub, Schutzfolien, Boden, Fensterrahmen, Fotos und Übergabeziel senden.",
 cluster: "money",
 intent: "Baureinigung und Reinigung nach Renovierung in Düsseldorf anfragen",
};

moneySnippets["/duesseldorf/teppichreinigung"] = {
 title: "Teppichreinigung Düsseldorf | Polster & Sofa",
 description:
  "Teppichreinigung und Polsterreinigung Düsseldorf: Teppichboden, Sofa, Bürostühle, Flecken, Material, Fotos und Zeitfenster senden.",
 cluster: "money",
 intent: "Teppich- und Polsterreinigung in Düsseldorf nach Fotos anfragen",
};

moneySnippets["/duesseldorf/unterhaltsreinigung"] = {
 title: "Angebot Unterhaltsreinigung | Büro & Objekt",
 description:
  "Angebot Unterhaltsreinigung in Düsseldorf prüfen: Büro, Praxis, Kanzlei, Treppenhaus, Turnus, Fläche, Fotos und Reinigungsplan senden.",
 cluster: "money",
 intent: "Regelmäßige Unterhalts- und Gebäudereinigung in Düsseldorf anfragen",
};

moneySnippets["/duesseldorf/ladenreinigung"] = {
 title: "Ladenreinigung Düsseldorf | Geschäft & Fläche",
 description:
  "Ladenreinigung und Geschäftsreinigung Düsseldorf: Verkaufsfläche, Eingang, Schaufenster, Umkleide, Lager, Öffnungszeiten, Fotos und Angebot senden.",
 cluster: "money",
 intent: "Laden- und Geschäftsreinigung in Düsseldorf anfragen",
};

moneySnippets["/duesseldorf/sonderreinigung"] = {
 title: "Sonderreinigung Düsseldorf | Intensiv & Zustand",
 description:
  "Sonderreinigung und Intensivreinigung Düsseldorf: starke Verschmutzung, Leerstand, Mieterwechsel, Fotos, Grenzen und Angebot prüfen.",
 cluster: "money",
 intent: "Sonderreinigung und Intensivreinigung in Düsseldorf anfragen",
};

moneySnippets["/duesseldorf/gewerbereinigung"] = {
 title: "Gewerbereinigung Düsseldorf | Angebot klar prüfen",
 description:
  "FLOXANT prüft Gewerbereinigung in Düsseldorf für Büro, Praxis, Kanzlei und Objekt. Raumliste, Turnus, Fotos und Angebot senden, Zeitfenster klären.",
 cluster: "money",
 intent: "Gewerbereinigung in Düsseldorf für Objekt oder Betrieb anfragen",
};

moneySnippets["/duesseldorf/hotelreinigung"] = {
 title: "Hotelreinigung Düsseldorf | Fotos & Turnus prüfen",
 description:
  "Hotelreinigung Düsseldorf für Hotel, Boardinghouse und Apartmenthaus: Lobby, Flure, Zimmer nach Absprache, Turnus, Fotos und Angebot.",
 cluster: "money",
 intent: "Hotelreinigung in Düsseldorf für Beherbergung oder Boardinghouse anfragen",
};

moneySnippets["/duesseldorf/kanzleireinigung"] = {
 title: "Kanzleireinigung Düsseldorf | diskret & planbar",
 description:
  "Kanzleireinigung in Düsseldorf für Empfang, Büros, Besprechungsräume und Sanitär: diskrete Zeitfenster, Zugang, Fläche und Fotos abstimmen.",
 cluster: "money",
 intent: "Kanzleireinigung in Düsseldorf für Kanzlei oder Beratung anfragen",
};

moneySnippets["/duesseldorf/praxisreinigung"] = {
 title: "Praxisreinigung Düsseldorf | Praxisflächen prüfen",
 description:
  "Praxisreinigung Düsseldorf für Empfang, Wartebereich, Sanitär, Flure und Teamräume: Fläche, Turnus, Randzeit, Zugang und Fotos direkt senden.",
 cluster: "money",
 intent: "Praxisreinigung in Düsseldorf für allgemeine Flächen anfragen",
};

moneySnippets["/duesseldorf/it-raum-reinigung"] = {
 title: "IT-Raum Reinigung Düsseldorf | Serverraum prüfen",
 description:
  "IT-Raum- und Serverraum-nahe Reinigung in Düsseldorf nach Prüfung: Staub, Boden, Zugang, Zeitfenster, Tabubereiche und Fotos abstimmen.",
 cluster: "money",
 intent: "IT-Raum Reinigung in Düsseldorf mit klaren Grenzen prüfen lassen",
};

moneySnippets["/duesseldorf/krankenhausreinigung"] = {
 title: "Krankenhaus-nahe Reinigung Düsseldorf | Nebenflächen",
 description:
  "Reinigung für Krankenhaus- und Klinik-Nebenflächen in Düsseldorf nach Prüfung: Büros, Flure, Sanitär, Aufenthaltsbereiche, Zugang und Fotos.",
 cluster: "money",
 intent: "Krankenhaus-nahe Reinigung in Düsseldorf für Nebenflächen prüfen lassen",
};

moneySnippets["/duesseldorf/kellerreinigung"] = {
 title: "Kellerreinigung Düsseldorf | Keller & Nebenräume",
 description:
  "Kellerreinigung Düsseldorf für Keller, Abstellräume und Nebenflächen: Zustand, Fotos, Zugang, Entsorgung und Termin realistisch prüfen lassen.",
 cluster: "money",
 intent: "Kellerreinigung in Düsseldorf mit Fotos und Zugang anfragen",
};

moneySnippets["/duesseldorf/entsorgung"] = {
 title: "Entsorgung Düsseldorf | Möbel, Keller & Restmengen",
 description:
  "Entsorgung in Düsseldorf für Möbel, Keller, Sperrmüll und kleine Firmenmengen: Fotos, Umfang, Material, Zugang und Termin senden.",
 cluster: "money",
 intent: "Entsorgung in Düsseldorf für Möbel, Keller oder Firmenreste anfragen",
};

moneySnippets["/duesseldorf/wohnungsreinigung"] = {
 title: "Professionelle Wohnungsreinigung Düsseldorf | Fotos",
 description:
  "Professionelle Wohnungsreinigung Düsseldorf für bewohnte oder leere Wohnungen: Küche, Bad, Böden, Zustand, Fotos und Termin prüfen.",
 cluster: "money",
 intent: "Wohnungsreinigung in Düsseldorf mit Fotos und Termin anfragen",
};

moneySnippets["/duesseldorf/reinigung-stadtteile-umgebung"] = {
 title: "Reinigungsfirma Düsseldorf | Stadtteile & Umgebung",
 description:
  "Professionelle Reinigung in Düsseldorf für Büro, Hotel, Wohnung und Objekt: Altstadt, Stadtmitte, Pempelfort, Neuss, Ratingen und Meerbusch.",
 cluster: "money",
 intent: "Professionelle Reinigungsfirma in Düsseldorf Stadtteilen oder naher Umgebung anfragen",
};

moneySnippets["/duesseldorf/vielleicht-guenstiger"] = {
 title: "Reinigungsangebot Düsseldorf | Kosten fair prüfen",
 description:
  "Reinigungsangebot aus Düsseldorf als PDF, Foto oder Screenshot senden: Preis, Leistung, Fläche, Turnus, Fotos und mögliche Alternative prüfen.",
 cluster: "conversion",
 intent: "Reinigungsangebot in Düsseldorf hochladen und Alternative prüfen lassen",
};

moneySnippets["/angebot-vergleichen-duesseldorf"] = {
 title: "Reinigungsangebot Düsseldorf | Umfang klar prüfen",
 description:
  "Reinigungsangebot in Düsseldorf erhalten? FLOXANT prüft Umfang, Turnus, Objektart, Fotos und Preisrahmen kostenlos und unverbindlich. Antwort erhalten.",
 cluster: "conversion",
 intent: "Düsseldorfer Reinigungsangebot prüfen und eine klare zweite Einschätzung erhalten",
};

moneySnippets["/duesseldorf/umzug"] = {
 title: "Umzugsfirma Düsseldorf | Fotos senden, Ablauf klären",
 description:
  "FLOXANT prüft Umzug in Düsseldorf mit Start, Ziel, Etage, Laufweg und Fotos. Eckdaten senden, Angebot realistisch klären, Rückmeldung erhalten.",
 cluster: "money",
 intent: "Umzug in Düsseldorf mit Fotos, Start, Ziel und Zugangsdaten anfragen",
};

moneySnippets["/duesseldorf/entruempelung"] = {
 title: "Entrümpelung Düsseldorf | Fotos senden, Räume klären",
 description:
  "Entrümpelung in Düsseldorf für Wohnung, Keller und Objekt: Fotos, Menge, Zugang und Termin senden, Reinigung bei Bedarf mitprüfen, Ablauf klären.",
 cluster: "money",
 intent: "Entrümpelung in Düsseldorf für Wohnung, Keller oder Objekt nach Fotos anfragen",
};

moneySnippets["/duesseldorf/haushaltsaufloesung"] = {
 title: "Haushaltsauflösung Düsseldorf | Ruhig klären",
 description:
  "Haushaltsauflösung in Düsseldorf für Wohnung, Haus oder Nachlass: Fotos, Freigabe, Zugang und Reinigung nach Räumung prüfen lassen, Termin klären.",
 cluster: "money",
 intent: "Haushaltsauflösung in Düsseldorf mit Freigabe, Fotos und ruhiger Vorprüfung anfragen",
};

moneySnippets["/regensburg/reinigung"] = {
 title: "Reinigung Regensburg | Fotos senden, Aufwand klären",
 description:
  "FLOXANT prüft Reinigung in Regensburg für Wohnung, Büro, Übergabe und Umzug. Fläche, Zustand, Fotos und Termin senden, Budget nennen, Rückmeldung erhalten.",
 cluster: "money",
 intent: "Reinigung in Regensburg für Wohnung, Büro, Übergabe oder Umzug anfragen",
};

moneySnippets["/regensburg/umzug"] = {
 title: "Umzugsfirma Regensburg | Bilder senden, Angebot klären",
 description:
  "Umzug in Regensburg anfragen: Start, Ziel, Etage, Laufweg, Volumen und Fotos senden. FLOXANT prüft Angebot, Ablauf und Rückmeldung sauber.",
 cluster: "money",
 intent: "Umzugsfirma in Regensburg mit Start, Ziel, Volumen und Fotos anfragen",
};

moneySnippets["/regensburg/entruempelung"] = {
 title: "Entrümpelung Regensburg | Wohnung & Keller klären",
 description:
  "Entrümpelung in Regensburg für Wohnung, Keller, Garage oder Objekt: Fotos, Menge, Zugang, Entsorgung und Reinigung danach prüfen, Termin klären.",
 cluster: "money",
 intent: "Entrümpelung in Regensburg für Wohnung, Keller, Garage oder Objekt anfragen",
};

moneySnippets["/regensburg/haushaltsaufloesung"] = {
 title: "Haushaltsauflösung Regensburg | Nachlass ruhig klären",
 description:
  "Haushaltsauflösung in Regensburg für Wohnung, Haus oder Nachlass: Fotos, Freigabe, Zugang, Räumung und Reinigung ruhig prüfen, Termin klären lassen.",
 cluster: "money",
 intent: "Haushaltsauflösung oder Nachlassräumung in Regensburg ruhig anfragen",
};

moneySnippets["/regensburg/gewerbereinigung"] = {
 title: "Gewerbereinigung Regensburg | Raumliste senden",
 description:
  "Gewerbereinigung in Regensburg für Büro, Praxis, Kanzlei und Objekt: Raumliste, Turnus, Fotos und bestehendes Angebot senden, Starttermin klären.",
 cluster: "money",
 intent: "Gewerbereinigung in Regensburg für Büro, Praxis, Kanzlei oder Objekt anfragen",
};

moneySnippets["/duesseldorf/grundreinigung"] = {
 title: "Bodenreinigung Düsseldorf | Grundreinigung prüfen",
 description:
  "Bodenreinigung und Grundreinigung Düsseldorf: Fläche, Boden, Zustand, Fotos, Termin, Kostenfaktoren und Angebot direkt prüfen.",
 cluster: "money",
 intent: "Grundreinigung in Düsseldorf mit Fotos und Umfang anfragen",
};

moneySnippets["/duesseldorf/treppenhausreinigung"] = {
 title: "Treppenreinigung Düsseldorf | Hilden & WEG prüfen",
 description:
  "Treppenhaus- und Treppenreinigung Düsseldorf, Hilden nach Machbarkeit: Hausverwaltung, WEG, Etagen, Turnus, Zugang und Fotos.",
 cluster: "money",
 intent: "Treppenhausreinigung in Düsseldorf für Objekt oder Hausverwaltung anfragen",
};

moneySnippets["/duesseldorf/endreinigung"] = {
 title: "Endreinigung Düsseldorf | Auszug & Übergabe",
 description:
  "Endreinigung Düsseldorf für Auszug, Rückgabe oder Objektwechsel: Fläche, Zustand, Küche, Bad, Fotos, Termin und Übergabeziel senden.",
 cluster: "money",
 intent: "Endreinigung oder Übergabereinigung in Düsseldorf anfragen",
};

moneySnippets["/entsorgung-duesseldorf"] = {
 title: "Entsorgung Düsseldorf | Möbel, Sperrmüll & Abholung",
 description:
  "Entsorgung in Düsseldorf für Möbel, Sperrmüll, Haushaltsgegenstände, Keller und kleinere Räumungen: Umfang, Zugang, Etage, Fotos, Termin und Budget senden. Reinigung separat möglich.",
 cluster: "money",
 intent: "Entsorgung oder Möbelentsorgung in Düsseldorf anfragen",
};

moneySnippets["/reinigung-moeblierte-wohnung-duesseldorf"] = {
 title: "Apartment Düsseldorf wöchentliche Reinigung | Angebot",
 description:
  "Apartment oder möblierte Wohnung Düsseldorf mit wöchentlicher Reinigung: Zugang, Turnus, Fotos, Terminfenster und Angebot prüfen.",
 cluster: "money",
 intent: "Möblierte Wohnung oder Apartment-Reinigung in Düsseldorf anfragen",
};

moneySnippets["/schluesseluebergabe"] = {
 title: "Schlüsselübergabeprotokoll Reinigungsfirma | FLOXANT",
 description:
  "Schlüsselübergabeprotokoll mit Reinigungsfirma vorbereiten: Fotos, Reinigung, Übergabepunkte, Termin und Rückmeldung sauber abstimmen.",
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
 title: "Diskreter Umzug & Service | ruhig geplant",
 description:
  "Diskreter Service für sensible Kunden: Umzug, Reinigung, Übergabe und Koordination mit persönlicher Vorprüfung.",
 cluster: "money",
 intent: "Diskrete Hilfe für sensible Privathaushalte finden",
};

moneySnippets["/"] = {
 title: "FLOXANT – Umzug, Reinigung & Entrümpelung in Regensburg",
 description:
  "Umzug, Reinigung, Entrümpelung und Übergabe in Regensburg: FLOXANT bündelt Transport, Endreinigung, Räumung und Zusatzleistungen.",
 cluster: "money",
 intent: "Direkten Dienstleister für Umzug, Reinigung und Entrümpelung mit Buchung finden",
};

moneySnippets["/umzug-regensburg"] = {
 title: "Umzugsunternehmen Regensburg | Fotos & Termin prüfen",
 description:
  "Umzug Regensburg mit Umzugsunternehmen prüfen: Start, Ziel, Volumen, Etage, Laufweg, Parken, Fotos, Termin und Preisrahmen direkt senden.",
 cluster: "money",
 intent: "Umzug oder Umzugsunternehmen in Regensburg anfragen",
};

moneySnippets["/reinigung-regensburg"] = {
 title: "Reinigung Regensburg | Wohnung, Büro & Angebot",
 description:
  "Reinigung in Regensburg für Wohnung, Büro, Praxis, Grundreinigung oder Übergabe: Fläche, Zustand, Fotos, Termin und Budget direkt senden.",
 cluster: "money",
 intent: "Reinigung in Regensburg mit passender Spezialleistung, Fotos, Fläche und Termin anfragen",
};

moneySnippets["/klaviertransport-regensburg"] = {
 title: "Klaviertransport Regensburg | Angebot mit Fotos prüfen",
 description:
  "Klaviertransport Regensburg: Klavier, Piano oder Flügel mit Etage, Treppenhaus, Strecke, Fotos und Termin prüfen lassen. Anfrage direkt senden.",
 cluster: "money",
 intent: "Klaviertransport in Regensburg mit Fotos, Etage und Termin anfragen",
};

moneySnippets["/klaviertransport"] = {
 title: "Klaviertransport Bayern | München, Nürnberg & Regensburg",
 description:
  "Klaviertransport in Bayern prüfen: München, Nürnberg, Regensburg oder Bayreuth nach Route, Etage, Treppenhaus, Fotos und Termin.",
 cluster: "money",
 intent: "Klaviertransport in Bayern mit Fotos, Etage und Strecke anfragen",
};

moneySnippets["/klaviertransport-muenchen"] = {
 title: "Günstiger Klaviertransport München | Fotos prüfen",
 description:
  "Klaviertransport München: Instrument, Etage, Treppenhaus, Aufzug, Strecke, Fotos, Termin und Preisrahmen realistisch prüfen.",
 cluster: "money",
 intent: "Klaviertransport in München mit Fotos und Preisrahmen anfragen",
};

moneySnippets["/klaviertransport-nuernberg"] = {
 title: "Klaviertransporte Nürnberg | Zugang & Angebot prüfen",
 description:
  "Klaviertransport Nürnberg: Klavier, Piano oder Flügel mit Etage, Zugang, Treppenhaus, Fotos, Strecke und Termin prüfen lassen.",
 cluster: "money",
 intent: "Klaviertransport in Nürnberg mit Fotos, Strecke und Termin anfragen",
};

moneySnippets["/umzug-aufhausen"] = {
 title: "Umzug Aufhausen | Umzugsunternehmen & Termin prüfen",
 description:
  "Umzug Aufhausen: Start, Ziel, Möbelmenge, Etage, Laufweg, Termin und Fotos senden. FLOXANT prüft Strecke, Aufwand und Preisrahmen direkt.",
 cluster: "money",
 intent: "Umzug in Aufhausen mit Fotos und Preisrahmen anfragen",
};

moneySnippets["/umzug-neumarkt"] = {
 title: "Umzugsunternehmen Neumarkt i.d.OPf. | Anfrage starten",
 description:
  "Umzug Neumarkt i.d.OPf.: Möbelmenge, Etage, Strecke, Termin, Fotos und Zusatzleistungen senden. FLOXANT prüft den Ablauf ab Regensburg/Bayern.",
 cluster: "money",
 intent: "Umzugsunternehmen in Neumarkt in der Oberpfalz anfragen",
};

moneySnippets["/umzug-ingolstadt"] = {
 title: "Umzug Ingolstadt | Fotos & Angebot prüfen",
 description:
  "Umzug Ingolstadt: Möbelmenge, Etage, Strecke, Termin, Fotos und Zusatzleistungen senden. FLOXANT prüft Bayern-Route.",
 cluster: "money",
 intent: "Umzug in Ingolstadt mit Strecke und Preisrahmen anfragen",
};

moneySnippets["/umzug-weiden"] = {
 title: "Umzugsunternehmen Weiden i.d.OPf. | Anfrage prüfen",
 description:
  "Umzug Weiden i.d.OPf.: Start, Ziel, Möbelmenge, Etage, Fotos, Termin und Preisrahmen senden. FLOXANT prüft Bayern-Route.",
 cluster: "money",
 intent: "Umzugsunternehmen in Weiden in der Oberpfalz mit Fotos und Termin anfragen",
};

moneySnippets["/umzug-muenchen"] = {
 title: "Umzug München | Privatumzug & Fernumzug prüfen",
 description:
  "Umzug München, Privatumzug oder Fernumzug: Start, Ziel, Volumen, Etage, Haltezone, Fotos, Termin und Budget direkt online prüfen lassen.",
 cluster: "money",
 intent: "Umzug in München mit Fotos, Termin und Preisrahmen anfragen",
};

moneySnippets["/umzug-nuernberg"] = {
 title: "Privatumzug Nürnberg | Umzug & Angebot prüfen",
 description:
  "Privatumzug Nürnberg: Wohnung, Möbel, Kartons, Etage, Strecke, Fotos, Termin und mögliches Angebot vor Zusage prüfen.",
 cluster: "money",
 intent: "Privatumzug in Nürnberg mit Fotos und Angebot anfragen",
};

moneySnippets["/umzugsunternehmen-regensburg"] = {
 title: "Umzugsunternehmen Regensburg | Fotos & Angebot prüfen",
 description:
  "Umzugsunternehmen Regensburg: Etage, Strecke, Möbel, Fotos, Termin und Preisrahmen senden. FLOXANT prüft Ablauf, Reinigung und Übergabe.",
 cluster: "money",
 intent: "Umzugsunternehmen in Regensburg mit Fotos, Preisrahmen und Zusatzleistungen anfragen",
};

moneySnippets["/umzug-friedberg"] = {
 title: "Umziehen Friedberg | Umzug & Angebot klar prüfen",
 description:
  "Umziehen in Friedberg: Start, Ziel, Möbelmenge, Etage, Fotos und Termin senden. FLOXANT prüft Bayern-Route, Aufwand und Preisrahmen direkt.",
 cluster: "money",
 intent: "Umzug oder Umziehen in Friedberg mit Fotos und Termin anfragen",
};

moneySnippets["/umzug-forchheim"] = {
 title: "Umziehen Forchheim | Umzug & Angebot klar prüfen",
 description:
  "Umziehen in Forchheim: Möbel, Etage, Strecke, Fotos, Termin und Preisrahmen senden. FLOXANT prüft Machbarkeit und Aufwand in Bayern direkt.",
 cluster: "money",
 intent: "Umzug oder Umziehen in Forchheim mit Preisrahmen und Fotos anfragen",
};

moneySnippets["/seniorenumzug-bayern"] = {
 title: "Umzug im Alter Bayern | ruhig planen & Rückruf",
 description:
  "Seniorenumzug Bayern: Möbel, Zimmer, Angehörige, Reinigung, Übergabe, Rückruf und Termin ruhig klären. FLOXANT prüft Verfügbarkeit.",
 cluster: "money",
 intent: "Umzug im Alter in Bayern mit Angehörigen-Abstimmung anfragen",
};

moneySnippets["/seniorenumzug-nuernberg"] = {
 title: "Umzugshelfer für Senioren Nürnberg | ruhig anfragen",
 description:
  "Seniorenumzug Nürnberg: Zimmer, Möbel, Etage, Aufzug, Angehörige, Reinigung und Übergabe strukturiert senden. Rückruf möglich.",
 cluster: "money",
 intent: "Umzugshelfer für Senioren in Nürnberg anfragen",
};

moneySnippets["/seniorenumzug-erlangen"] = {
 title: "Umzugshelfer für Senioren Erlangen | ruhig planen",
 description:
  "Seniorenumzug Erlangen: Zimmer, Möbel, Angehörige, Etage, Reinigung, Übergabe, Rückruf und Termin ruhig prüfen lassen.",
 cluster: "money",
 intent: "Umzugshelfer für Senioren in Erlangen mit Rückruf und Übergabe anfragen",
};

moneySnippets["/reinigung-muenchen"] = {
 title: "Reinigungsservice München buchen | Termin prüfen",
 description:
  "Reinigung München nach Umzug, Übergabe oder Termin: Fläche, Zustand, Fotos, Zugang, Deadline, Räume und Budget direkt online prüfen lassen.",
 cluster: "money",
 intent: "Reinigung in München mit kurzfristigem Termin und Fotos anfragen",
};

moneySnippets["/bueroumzug-muenchen"] = {
 title: "Büroumzug München | Firma & Zeitfenster prüfen",
 description:
  "Büroumzug München für Firma, Büro und Praxis: Arbeitsplätze, Möbel, IT-nahe Bereiche, Zugang, Randzeit, Fotos und Angebot direkt prüfen.",
 cluster: "money",
 intent: "Büroumzug in München mit Firma, Zeitfenster und Fotos anfragen",
};

moneySnippets["/bueroumzug-regensburg"] = {
 title: "Büroumzug Regensburg | Firma & Angebot prüfen",
 description:
  "Büroumzug Regensburg: Arbeitsplätze, Möbel, Akten, IT-nahe Bereiche, Zeitfenster, Fotos, Entsorgung und Angebot prüfen.",
 cluster: "money",
 intent: "Büroumzug in Regensburg mit Zeitfenster, Entsorgung und Angebot anfragen",
};

moneySnippets["/bueroumzug-nuernberg"] = {
 title: "Büroumzug Nürnberg | Firma & Angebot prüfen",
 description:
  "Büroumzug Nürnberg: Arbeitsplätze, Möbel, Akten, Technik, Zeitfenster, Zugang, Fotos und Entsorgung alter Büromöbel prüfen.",
 cluster: "money",
 intent: "Büroumzug oder Firmenumzug in Nürnberg anfragen",
};

moneySnippets["/entruempelung-regensburg"] = {
 title: "Entrümpelung Regensburg | Wohnung & Keller räumen",
 description:
  "Entrümpelung Regensburg für Wohnung, Keller, Garage, Hausauflösung und Restmengen: Fotos, Menge, Zugang, Termin und Angebot direkt prüfen lassen.",
 cluster: "money",
 intent: "Entrümpelung, Haushaltsauflösung oder Wohnungsauflösung in Regensburg anfragen",
};

moneySnippets["/entruempelung-nuernberg"] = {
 title: "Praxisentrümpelung Nürnberg | Räume & Angebot",
 description:
  "Praxisentrümpelung Nürnberg: Praxisräume, Möbel, Akten, Technik, Freigabe, Fotos, Entsorgung und Reinigung danach prüfen.",
 cluster: "money",
 intent: "Praxisentrümpelung in Nürnberg mit Fotos und Entsorgung anfragen",
};

moneySnippets["/entruempelung-bayern"] = {
 title: "Entrümpelungsfirma Bayern finden | Fotos prüfen",
 description:
  "Entrümpelungsfirma in Bayern finden: Forchheim, Regensburg, München oder Nürnberg mit Räumen, Fotos, Zugang und Termin prüfen.",
 cluster: "geo",
 intent: "Entrümpelungsfirma in Bayern mit Fotos und Umfang anfragen",
};

moneySnippets["/entruempelung-landshut"] = {
 title: "Küchenentsorgung Landshut | Möbel & Restmengen",
 description:
  "Küchenentsorgung Landshut nach Fotos prüfen: Küchenmöbel, Elektrogeräte nach Absprache, Etage, Zugang, Demontage und Termin.",
 cluster: "money",
 intent: "Küchenentsorgung oder Entrümpelung in Landshut anfragen",
};

moneySnippets["/wohnungsaufloesung-regensburg"] = {
 title: "Hausauflösung Regensburg | Wohnung räumen lassen",
 description:
  "Wohnungsauflösung und Hausauflösung Regensburg, auch Bielingplatz: Räume, Keller, Möbel, Fotos, Zugang, Termin und Entsorgung prüfen.",
 cluster: "money",
 intent: "Wohnungsauflösung oder Hausauflösung in Regensburg mit Fotos und Entsorgung anfragen",
};

moneySnippets["/wohnungsaufloesung-bayern"] = {
 title: "Haus- und Wohnungsräumung Bayern | Angebot",
 description:
  "Haus- und Wohnungsräumung Bayern: Haushalt auflösen lassen mit Räumen, Möbeln, Keller, Fotos, Entsorgung, Reinigung und Termin.",
 cluster: "geo",
 intent: "Hausräumung oder Wohnungsauflösung in Bayern anfragen",
};

moneySnippets["/kleinmengen-entsorgung"] = {
 title: "Container Alternative | Kleinmengen & Grünschnitt prüfen",
 description:
  "Kleinmengen, Möbel, Küche, Restmengen oder Grünschnitt nach Fotos prüfen: Ort, Material, Zugang, Menge und Entsorgungsweg klären.",
 cluster: "support",
 intent: "Kleine Entsorgung oder Container-Alternative mit Fotos prüfen lassen",
};

moneySnippets["/geruchslos-protokoll"] = {
 title: "Geruchsbeseitigung Wohnung | München nach Prüfung",
 description:
  "Geruchsproblem in Wohnung oder Objekt prüfen: Ursache, Fläche, Fotos, Lüftung, Reinigung, Grenzen und Termin realistisch einordnen.",
 cluster: "support",
 intent: "Geruchsproblem in Wohnung oder Objekt nach Fotos prüfen lassen",
};

moneySnippets["/kleintransport-regensburg"] = {
 title: "Transport Regensburg – Möbel, Kleintransport & Rückfahrt",
 description:
  "Transport in Regensburg für Möbel und Einzelstücke. Route, Zugang, Fotos und Leerfahrt/Rückfahrt nach Verfügbarkeit prüfen.",
 cluster: "money",
 intent: "Transport oder Möbeltransport in Regensburg anfragen",
};

moneySnippets["/buchung"] = {
 title: "FLOXANT direkt anfragen | Umzug, Reinigung & Räumung",
 description:
  "Direkte FLOXANT Anfrage starten: Umzug, Reinigung, Entrümpelung, Haushaltsauflösung oder Entsorgung wählen, Fotos senden und Rückmeldung erhalten.",
 cluster: "conversion",
 intent: "FLOXANT direkt aus Google Maps oder Google Search buchen oder anfragen",
};

moneySnippets["/anbieter-vergleichen"] = {
 title: "FLOXANT vs Vergleichsportal | direkt anfragen",
 description:
  "Umzugsfirma, Reinigungsfirma oder Entrümpelung vergleichen: direkte Vorprüfung, klare Kostentreiber und Verantwortung statt anonymer Weitergabe.",
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
 title: "Entrümpelung Regensburg | Wohnung, Keller & Entsorgung",
 description:
  "Entrümpelung, Wohnungsauflösung und Entsorgung in Regensburg und Bayern: Fotos, Volumen, Zugang, Material, Termin und Reinigung danach prüfen.",
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
    `Umzugsservice ${city}: Strecke, Transportumfang, Zugang, Reinigung und Übergabe realistisch einschätzen lassen und direkt anfragen.`,
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
    `Umzug für Senioren in ${city}: FLOXANT klärt Zugang, Möbelumfang, Zeitfenster, Zusatzleistungen und Rückruf nach Absprache.`,
   (city: string) =>
    `Senioren-Umzug ${city}: Fotos, Zimmer, Etage, Aufzug, Hilfe durch Angehörige und Übergabeziel strukturiert senden.`,
   (city: string) =>
    `FLOXANT prüft Seniorenumzüge in ${city} mit ruhiger Planung, Transport, Reinigung und Übergabe nach Verfügbarkeit.`,
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
  return "Regensburg ist der feste Ausgangspunkt; Angebot, Fotos, Termin und Budget werden direkt passend zum Anliegen geprüft";
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

 if (service === "Klaviertransport") {
  return "Etage, Treppenhaus, Maße, Schutzbedarf und Strecke werden vor Zusage realistisch geprüft";
 }

 if (service === "Seniorenumzug") {
  return "Rückruf, Angehörigen-Abstimmung, Reinigung und Übergabe können ruhig mitgedacht werden";
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

