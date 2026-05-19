import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  Crown,
  MessageCircle,
  Sparkles,
  Trash2,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { Einsatzradar } from "@/components/Einsatzradar";
import { FloxantNextStepPanel } from "@/components/FloxantNextStepPanel";
import { FloxantStorytellingSection } from "@/components/FloxantStorytellingSection";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { ServiceRequestCompass } from "@/components/ServiceRequestCompass";
import { SignatureServices } from "@/components/SignatureServices";
import { LocalSeoSignalPanel } from "@/components/seo/LocalSeoSignalPanel";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SearchDominanceExperience } from "@/components/seo/SearchDominanceExperience";
import { TrustFlowSection } from "@/components/seo/TrustFlowSection";
import { BAVARIA_DIRECT_DEMAND_LINKS } from "@/lib/bavaria-coverage";
import { company } from "@/lib/company";
import {
  einsatzradarFilters,
  einsatzradarRegionZones,
  getPublishedEinsatzradarEntries,
} from "@/lib/einsatzradar-data";
import { germanizeDeep, germanizeText } from "@/lib/german-text";
import { generatePageSEO } from "@/lib/seo";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

type RouteCard = {
  label: string;
  title: string;
  text: string;
  href: string;
  Icon: LucideIcon;
  trackingChannel?: "booking" | "whatsapp" | "phone";
};

type SpecialServiceGroup = RouteCard & {
  keywords: string[];
  links: {
    label: string;
    href: string;
  }[];
};

const coreServices: RouteCard[] = [
  {
    label: "Umzug",
    title: "Privat- und Firmenumzug",
    text: "Nicht nur tragen: Volumen, Laufwege, Zeitfenster, Fahrzeug und Zusatzaufgaben werden vor dem Einsatztag realistisch eingeordnet.",
    href: "/umzug-regensburg",
    Icon: Truck,
  },
  {
    label: "Reinigung",
    title: "Reinigung mit System",
    text: "Für Endreinigung, Übergabe, Objektflächen und saubere Abnahme, wenn Eindruck, Details und Termin wirklich zählen.",
    href: "/reinigung-regensburg",
    Icon: Sparkles,
  },
  {
    label: "Entrümpelung",
    title: "Räumung und Entsorgung",
    text: "Räume wieder entscheidbar machen: sortieren, tragen, entsorgen und die Fläche für den nächsten Schritt vorbereiten.",
    href: "/entruempelung-regensburg",
    Icon: Trash2,
  },
  {
    label: "Preisrahmen",
    title: "Rechner oder Budget",
    text: "Orientierung mit Kontext: Aufwand, Zugang, Strecke, Extras und Terminlage zuerst sauber einschätzen.",
    href: "/rechner",
    Icon: Banknote,
  },
  {
    label: "Einlagerung",
    title: "Lagerung und Zwischenlösung",
    text: "Für Einlagerung, Akten, Zwischenstationen und strukturierte Lagerwege aus Regensburg.",
    href: "/einlagerung",
    Icon: Briefcase,
  },
];

const specialRoutes: RouteCard[] = [
  {
    label: "Direkter Pfad",
    title: "Buchung statt Sucherei",
    text: "Sauberer Einstieg für Kunden, die Umzug, Reinigung oder Entsorgung direkt anfragen wollen.",
    href: "/buchung",
    Icon: Zap,
  },
  {
    label: "B2B & Objektbetrieb",
    title: "Gewerbliche Reinigung",
    text: "Für Büro, Praxis, Hotel und Hausverwaltung mit festen Ansprechpartnern.",
    href: "/gewerbereinigung-regensburg",
    Icon: Building2,
  },
  {
    label: "Diskreter Sonderweg",
    title: "Private Client",
    text: "Für hochwertige sensible Projekte mit ruhiger Führung und exakter Abstimmung.",
    href: "/private-client-service",
    Icon: Crown,
  },
  {
    label: "Flexible Route",
    title: "Leer-Rückfahrt",
    text: "Freie Kapazität auf Rückfahrten für Transport ohne Vollumzug nutzen.",
    href: "/leerfahrt-rueckfahrt",
    Icon: Briefcase,
  },
];

const trustPoints = [
  { title: "Ein Ansprechpartner", text: "Weniger Schnittstellen, weniger Risiko: Umzug, Reinigung, Entrümpelung und Übergabe können in einem Ablauf zusammenlaufen." },
  { title: "Realistische Einschätzung", text: "Volumen, Laufwege, Etagen, Parkmöglichkeit, Zeitfenster und Zusatzleistungen werden eingeordnet, bevor ein Auftrag verbindlich geplant wird." },
  { title: "Keine Preis-Hektik", text: "Vorschnell niedrige Einstiegspreise helfen niemandem, wenn am Einsatztag Fahrzeug, Team oder Zeitfenster nicht passen." },
  { title: "Sauberer Abschluss", text: "Schlüssel, Fotodokumentation, Restmengen und Übergabeanforderungen werden früh mitgedacht, wenn sie zum Auftrag gehören." },
];

const businessModelPillars = [
  {
    title: "Übergang statt Einzelauftrag",
    text: "FLOXANT denkt Wohnungswechsel als Prozess: Möbel, Reinigung, Entsorgung, Schlüssel und Übergabe müssen zusammen funktionieren.",
  },
  {
    title: "Einschätzung vor Preisversprechen",
    text: "Erst werden Aufwand, Region, Zugang, Timing und Zusatzleistungen sauber sortiert. Danach wird Angebot oder Abstimmung belastbar.",
  },
  {
    title: "Klare Führung statt Koordinationsstress",
    text: "Kunden buchen FLOXANT, wenn sie nicht mehrere Dienstleister parallel steuern und am Ende selbst alles zusammenhalten wollen.",
  },
];

const offerTracks: RouteCard[] = [
  {
    label: "Schnell",
    title: "Direkt anfragen",
    text: "Wenn Service, Ort und Termin schon grob klar sind: Anfrage absenden und den Fall strukturiert einordnen lassen.",
    href: "/buchung",
    Icon: Zap,
  },
  {
    label: "Orientierung",
    title: "Kosten einschätzen",
    text: "Wenn Sie erst wissen wollen, welche Faktoren Preis und Aufwand wirklich beeinflussen.",
    href: "/rechner",
    Icon: Banknote,
  },
  {
    label: "Budget",
    title: "Preisrahmen nennen",
    text: "Wenn ein Zielbudget vorhanden ist und FLOXANT ehrlich einordnen soll, welcher Umfang realistisch ist.",
    href: "/anfrage-mit-preisrahmen",
    Icon: CheckCircle2,
  },
  {
    label: "Sorglos",
    title: "Übergabe vorbereiten",
    text: "Wenn Umzug, Endreinigung, Restmengen, Fotos, Schlüssel und Übergabe zusammen gedacht werden müssen.",
    href: "/umzug-mit-reinigung",
    Icon: Sparkles,
  },
  {
    label: "Gewerbe",
    title: "Objekt & Betrieb",
    text: "Für Büros, Praxen, Hausverwaltungen, Gewerbeflächen und Einsätze mit laufendem Betrieb.",
    href: "/gewerbereinigung-regensburg",
    Icon: Building2,
  },
];

const contactConversionTracks: RouteCard[] = [
  {
    label: "Jederzeit senden",
    title: "Fall kurz schildern",
    text: "Service, Ort, Termin, Fotos und Budget können Sie jederzeit senden. FLOXANT prüft den Fall und meldet sich mit dem passenden nächsten Schritt.",
    href: "/buchung?utm_source=homepage_24h&urgency=24h&contact=callback#buchungssystem",
    Icon: Zap,
    trackingChannel: "booking",
  },
  {
    label: "Schnelle Rückfrage",
    title: "WhatsApp mit Fotos",
    text: "Ideal, wenn es eilig ist: kurze Nachricht, Ort, Wunschtermin, Fotos oder vorhandenes Angebot schicken.",
    href: `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent("Hallo FLOXANT, ich moechte eine 24h-Anfrage stellen. Ort, Termin und Service:")}`,
    Icon: MessageCircle,
    trackingChannel: "whatsapp",
  },
  {
    label: "Telefon",
    title: "Direkt anrufen",
    text: "Wenn ein Termin kippt, eine Übergabe naht oder sofort etwas geklärt werden muss, ist Telefon der schnellste Weg.",
    href: `tel:${company.phoneRaw}`,
    Icon: CheckCircle2,
    trackingChannel: "phone",
  },
];

const heroActionCards: RouteCard[] = [
  {
    label: "Schnell anfragen",
    title: "Fall senden",
    text: "Kurzfristiger Umzug, Reinigung, Entrümpelung oder Übergabe: Angaben senden und Rückrufweg wählen.",
    href: "/buchung?utm_source=homepage_decision&urgency=24h&contact=callback#buchungssystem",
    Icon: Zap,
    trackingChannel: "booking",
  },
  {
    label: "Direkt schreiben",
    title: "WhatsApp mit Fotos",
    text: "Fotos, Ort, Termin und offene Punkte direkt schicken, wenn Sie schnell Klarheit brauchen.",
    href: `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent("Hallo FLOXANT, ich moechte meinen Fall kurz einschaetzen lassen. Fotos/Ort/Termin:")}`,
    Icon: MessageCircle,
    trackingChannel: "whatsapp",
  },
  {
    label: "Preisgefühl",
    title: "Budget klären",
    text: "Wenn Sie zuerst wissen möchten, welcher Rahmen realistisch ist.",
    href: "/anfrage-mit-preisrahmen?utm_source=homepage_decision",
    Icon: Banknote,
  },
];

const heroTrustBadges = [
  { label: "Rückruf möglich", text: "Fall senden und passenden Kontaktweg wählen." },
  { label: "Fotos willkommen", text: "Bilder sparen Rückfragen und machen den Aufwand klarer." },
  { label: "24h online", text: "Anfrage jederzeit senden, auch abends oder am Wochenende." },
];

const regionLinks = [
  { label: "Servicegebiet Regensburg & Umgebung", href: "/einsatzgebiet-regensburg-200km" },
  { label: "FLOXANT Einsatzradar", href: "/einsatzradar-regensburg" },
  { label: "Umzug Regensburg", href: "/umzug-regensburg" },
  { label: "Umzugsunternehmen Regensburg", href: "/umzugsunternehmen-regensburg" },
  { label: "Reinigung Regensburg", href: "/reinigung-regensburg" },
  { label: "Entruempelung Regensburg", href: "/entruempelung-regensburg" },
  { label: "Transport Regensburg", href: "/kleintransport-regensburg" },
  { label: "Leerfahrt/Rueckfahrt Bayern", href: "/leerfahrt-rueckfahrt" },
  { label: "Bayern nach Verfuegbarkeit", href: "/service-area-bayern" },
  { label: "Direkte Anfrage mit Ort/PLZ", href: "/buchung#buchungssystem" },
];

const mapsIntentRoutes = [
  { label: "Umzug Regensburg", href: "/umzug-regensburg" },
  { label: "Umzugsunternehmen Regensburg", href: "/umzugsunternehmen-regensburg" },
  { label: "Reinigung Regensburg", href: "/reinigung-regensburg" },
  { label: "Endreinigung Regensburg", href: "/endreinigung-regensburg" },
  { label: "Entrümpelung Regensburg", href: "/entruempelung-regensburg" },
  { label: "Kleintransport Regensburg", href: "/kleintransport-regensburg" },
  { label: "Büroumzug Regensburg", href: "/bueroumzug-regensburg" },
  { label: "Einlagerung", href: "/einlagerung" },
  { label: "Akteneinlagerung Regensburg", href: "/akteneinlagerung-regensburg" },
];

const directEntryPaths = [
  { label: "FLOXANT empfehlen", href: "/empfehlen", description: "Partnercode und Empfehlungslink fuer Kunden, Freunde, Vermieter, Makler und Unternehmen mit 50-Euro-Bonus nach Pruefung." },
  { label: "Makler-/Vermieter-Link", href: "/makler-vermieter-link", description: "Kurzer Akquise-Link fuer Makler, Vermieter, Eigentuemer und Hausverwaltungen, um Objektfaelle mit Fotos, Termin und offenen Punkten direkt zu senden." },
  { label: "Mieterwechsel", href: "/mieterwechsel-service-regensburg", description: "B2B-Einstieg fuer Hausverwaltungen, Vermieter, Makler und Eigentuemer mit Raeumung, Reinigung und Uebergabevorbereitung." },
  { label: "Wohnung wieder vermietbar", href: "/wohnung-wieder-vermietbar", description: "Objekt-Ready-Service fuer Vermieter, Makler, Eigentuemer und Hausverwaltungen: Raeumung, Entsorgung, Reinigung und Dokumentation nach Absprache." },
  { label: "Immobilie verkaufsbereit machen", href: "/immobilie-verkaufsbereit-machen", description: "Property-Ready-Service fuer Eigentuemer, Makler und Erbengemeinschaften: Objekt vor Verkauf, Besichtigung oder Expose mit Fotos, Raeumung, Reinigung und Entsorgung pruefen lassen." },
  { label: "Nachlass-Raeumung Regensburg", href: "/nachlass-raeumung-regensburg", description: "Diskreter Service fuer Angehoerige, Erben, Eigentuemer und Bevollmaechtigte: Wohnung, Haus, Keller oder Garage nach Erbfall ruhig klaeren lassen." },
  { label: "Diskreter Umzug bei Trennung", href: "/diskreter-umzug-trennung-scheidung", description: "Rueckruf-First-Service fuer sensible private Auszuege: Transport, Reinigung, Schluesseluebergabe und Uebergabeakte nach Absprache pruefen lassen." },
  { label: "Schadensbegrenzung", href: "/schadensbegrenzung", description: "Rettungsmodus, wenn Umzug, Reinigung, Entruempelung oder Uebergabe kurzfristig kippen und offene Punkte schnell geprueft werden muessen." },
  { label: "Plan-B-Service", href: "/plan-b-service", description: "Backup-Control fuer Kunden mit unsicherem Ablauf: Ersatztransport, Reinigungs-Backup, Raeumungs-Backup oder Uebergabe-Backup nach Verfuegbarkeit pruefen." },
  { label: "Keller-/Muellraum-Rettung", href: "/keller-muellraum-rettung-regensburg", description: "Objektflaechen fuer Hausverwaltung, WEG, Vermieter und Gewerbe: Fotos, Freigabe, Zugang, Raeumung, Entsorgung und Reinigung pruefen." },
  { label: "FLOXANT Einsatzradar", href: "/einsatzradar-regensburg", description: "Typische Einsatzarten und grobe Servicezonen im Raum Regensburg ansehen: ohne Kundendaten und ohne exakte Adressen." },
  { label: "Rückfahrt-Börse", href: "/rueckfahrt-boerse", description: "Strecke mit Start, Ziel, Datum, Umfang und Flexibilität eintragen und Rückfahrt/Leerfahrt nach Verfügbarkeit prüfen lassen." },
  { label: "Uebergabeakte", href: "/uebergabeakte", description: "FLOXANT Uebergabe-Dossier 2.0 fuer Auszug, Reinigung, Fotos, Schluesselstatus, offene Hinweise und Aktenstatus nach Absprache." },
  { label: "Buchung", href: "/buchung", description: "Direkter Anfrageweg für Kunden, die ihren Fall sofort an FLOXANT senden möchten." },
  { label: "Rechner", href: "/rechner", description: "Einschätzung für Preisrahmen, Aufwand und Service-Fit vor der eigentlichen Anfrage." },
  { label: "Angebotscheck + Red-Flag-Scanner", href: "/angebotscheck#red-flag-scanner", description: "Angebot vor Zusage scannen: Umfang, Zugang, Zusatzkosten, Reinigung, Entsorgung und offene Punkte sichtbar machen." },
  { label: "Plattform-Auftrag prüfen", href: "/plattform-auftrag-pruefen", description: "Neutraler Einstieg für Kunden mit Plattform- oder Anbieterangebot: Angebot, Screenshot, Preis, Termin und offene Punkte praktisch prüfen lassen." },
  { label: "Express-Check", href: "/express-anfrage", description: "Schneller Weg für eilige Fälle mit wenigen Pflichtangaben." },
  { label: "Preisvorstellung", href: "/anfrage-mit-preisrahmen", description: "Direkter Weg für Kunden, die ihr Budget oder ihren Zielrahmen offen mitsenden möchten." },
  { label: "Umzugsunternehmen Regensburg", href: "/umzugsunternehmen-regensburg", description: "Informationen fuer alle, die gezielt ein lokales Umzugsunternehmen suchen." },
  { label: "Endreinigung Regensburg", href: "/endreinigung-regensburg", description: "Schneller Einstieg für Auszug, Übergabe und saubere Wohnungsrückgabe." },
  { label: "Kleintransport Regensburg", href: "/kleintransport-regensburg", description: "Einstieg für Möbel, Einzelstücke und kleinere Transporte in der Kernregion." },
  { label: "Kontakt", href: "/kontakt", description: "Kontaktweg für Telefon, WhatsApp und direkte Rückfrage." },
] as const;

const specialServiceGroups: SpecialServiceGroup[] = [
  {
    label: "Angebot & Preis",
    title: "Angebot anderer Firma prüfen",
    text: "Für Kunden, die bereits ein Umzugsangebot, Reinigungsangebot oder Entsorgungsangebot haben und eine klarere, passendere oder mögliche günstigere FLOXANT-Alternative prüfen möchten.",
    href: "/angebot-guenstiger-pruefen",
    Icon: Banknote,
    keywords: ["Angebot prüfen", "Preisrahmen", "Alternative"],
    links: [
      { label: "Angebot günstiger prüfen", href: "/angebot-guenstiger-pruefen" },
      { label: "Angebotscheck", href: "/angebotscheck#red-flag-scanner" },
      { label: "Plattform-Auftrag prüfen", href: "/plattform-auftrag-pruefen" },
      { label: "Budget nennen", href: "/anfrage-mit-preisrahmen" },
    ],
  },
  {
    label: "Backup & Rettung",
    title: "Wenn der Ablauf unsicher wird",
    text: "Für Plan-B-Situationen, gekippte Termine, offene Reinigung, Entsorgung, Übergabe oder kurzfristige Lücken vor dem eigentlichen Schaden.",
    href: "/plan-b-service",
    Icon: Zap,
    keywords: ["Plan B", "Schadensbegrenzung", "Express"],
    links: [
      { label: "Plan-B-Service", href: "/plan-b-service" },
      { label: "Schadensbegrenzung", href: "/schadensbegrenzung" },
      { label: "Express-Check", href: "/express-anfrage" },
      { label: "Rückfahrt-Börse", href: "/rueckfahrt-boerse" },
    ],
  },
  {
    label: "Objekt & Übergabe",
    title: "Immobilie, Mieterwechsel und Übergabe vorbereiten",
    text: "Für Vermieter, Eigentümer, Makler, Hausverwaltungen und Kunden, die Objekt, Wohnung, Keller oder Übergabe sauber abschließen möchten.",
    href: "/immobilie-verkaufsbereit-machen",
    Icon: Building2,
    keywords: ["Objektservice", "Übergabeakte", "Mieterwechsel"],
    links: [
      { label: "Immobilie verkaufsbereit machen", href: "/immobilie-verkaufsbereit-machen" },
      { label: "Wohnung wieder vermietbar", href: "/wohnung-wieder-vermietbar" },
      { label: "Mieterwechsel-Service", href: "/mieterwechsel-service-regensburg" },
      { label: "Übergabeakte", href: "/uebergabeakte" },
    ],
  },
  {
    label: "Diskret & sensibel",
    title: "Ruhige Hilfe für sensible Situationen",
    text: "Für Nachlass, Erbfall, private Trennung, diskrete Auszüge oder Premium-Anfragen, bei denen Rückruf, Ruhe und klare Grenzen wichtiger sind als laute Werbung.",
    href: "/nachlass-raeumung-regensburg",
    Icon: Crown,
    keywords: ["Diskret", "Nachlass", "Premium"],
    links: [
      { label: "Nachlass-Räumung", href: "/nachlass-raeumung-regensburg" },
      { label: "Diskreter Umzug", href: "/diskreter-umzug-trennung-scheidung" },
      { label: "Private Client", href: "/private-client-service" },
      { label: "Makler-/Vermieter-Link", href: "/makler-vermieter-link" },
    ],
  },
  {
    label: "Region & Einsatzgebiet",
    title: "Regensburg, Umgebung und Bayern einordnen",
    text: "Fuer Kunden, die wissen moechten, ob FLOXANT in ihrem Ort helfen kann und welche Leistungen dort sinnvoll planbar sind.",
    href: "/einsatzradar-regensburg",
    Icon: MessageCircle,
    keywords: ["Regensburg", "200 km", "Bayern"],
    links: [
      { label: "Einsatzradar Regensburg", href: "/einsatzradar-regensburg" },
      { label: "Einsatzgebiet 200 km", href: "/einsatzgebiet-regensburg-200km" },
      { label: "Servicegebiet Bayern", href: "/service-area-bayern" },
      { label: "Standorte", href: "/standorte" },
    ],
  },
  {
    label: "Düsseldorf getrennt",
    title: "Düsseldorf klar als Reinigungsspur",
    text: "Fuer B2B-Reinigung, Wohnungsreinigung, Treppenhaus, Grundreinigung und moeblierte Wohnungen in Duesseldorf. Entsorgung bleibt ein separater vorhandener Zusatzweg.",
    href: "/duesseldorf/reinigung",
    Icon: Sparkles,
    keywords: ["Düsseldorf", "Reinigung", "B2B"],
    links: [
      { label: "Reinigung Düsseldorf", href: "/duesseldorf/reinigung" },
      { label: "B2B-Reinigung Düsseldorf", href: "/duesseldorf/bueroreinigung" },
      { label: "Möblierte Wohnung", href: "/reinigung-moeblierte-wohnung-duesseldorf" },
      { label: "Entsorgung separat", href: "/entsorgung-duesseldorf" },
    ],
  },
];

const faqItems = [
  {
    q: "Kann ich FLOXANT 24 Stunden am Tag kontaktieren?",
    a: "Ja. Die Online-Anfrage und WhatsApp sind als 24h-Kontaktweg sichtbar. FLOXANT prueft eingehende Faelle nach Verfuegbarkeit und meldet sich mit dem passenden naechsten Schritt.",
  },
  {
    q: "Welche Leistungen übernimmt FLOXANT in Regensburg und Bayern?",
    a: "FLOXANT bündelt Umzug, Reinigung, Entrümpelung, Büroumzug, Gewerbereinigung, Firmenentsorgung, Leer-Rückfahrt und Übergabevorbereitung in einem klar geführten System.",
  },
  {
    q: "Wie starte ich am schnellsten eine Anfrage?",
    a: "Für die meisten Fälle ist die Buchungsseite der direkteste Weg. Wenn Sie zuerst ein Preisgefühl möchten, passt der Rechner. Für sehr kurze Fälle eignet sich der Express-Check.",
  },
  {
    q: "Warum arbeitet FLOXANT mit Einschätzung statt mit Schnell-Festpreis?",
    a: "Weil ein vorschnell niedriger Preis am Einsatztag oft zu Problemen führt: zu wenig Zeit, zu wenig Fahrzeugkapazität, ungeklärte Laufwege oder Zusatzleistungen. FLOXANT kalkuliert lieber realistisch, damit Durchführung und Erwartung zusammenpassen.",
  },
  {
    q: "Kann FLOXANT Umzug, Reinigung und Schlüsselübergabe zusammen übernehmen?",
    a: "Ja, je nach Kapazität und Auftrag können Umzug, Endreinigung, Rest-Entrümpelung, Fotodokumentation und Schlüsselübergabe kombiniert werden. Besonders sinnvoll ist das, wenn die Wohnung zeitnah übergeben werden muss.",
  },
  {
    q: "Warum ist eine Wohnungsübergabe mehr als nur Reinigung?",
    a: "Weil bei einer Übergabe nicht nur Sauberkeit zählt. Auch Restgegenstände, Schlüssel, Zustand, Fotos, Zeitfenster und Kommunikation mit Vermieter oder Hausverwaltung können entscheidend sein.",
  },
  {
    q: "Ist FLOXANT nur in Regensburg aktiv?",
    a: "Regensburg ist der operative Kern. Von dort aus prüft FLOXANT Einsätze in der Umgebung bis ca. 200 km und in Bayern, wenn Strecke, Verfügbarkeit und Leistungsumfang sinnvoll zusammenpassen.",
  },
  {
    q: "Gibt es auch Wege für Gewerbe oder sensible Projekte?",
    a: "Ja. Für B2B-Reinigung gibt es eine eigene Seite, für diskrete Premium-Fälle den Private-Client-Pfad und für flexible Transporte die Leer-Rückfahrt.",
  },
  {
    q: "Welche besonderen FLOXANT-Seiten helfen bei speziellen Situationen?",
    a: "Besonders wichtig sind Angebotsprüfung, Plan-B-Service, Schadensbegrenzung, Immobilie verkaufsbereit machen, Nachlass-Räumung, diskreter Umzug, Einsatzradar, Rückfahrt-Börse, Schlüsselübergabe, Übergabeakte und Düsseldorf Reinigung. Diese Seiten führen Kunden gezielt zum passenden Anfrageweg statt nur zu einer allgemeinen Servicebeschreibung.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "",
    title: "FLOXANT Regensburg – Umzug, Reinigung & Spezialservices",
    description:
      "FLOXANT bündelt Umzug, Reinigung, Entrümpelung, Entsorgung, Angebotsprüfung, Plan B, Übergabe, Objektservice und Düsseldorf Reinigung mit klaren Anfragewegen.",
    keywords: [
      "24h Umzugsservice Regensburg",
      "24 Stunden Umzug Reinigung Entruempelung",
      "FLOXANT 24h Anfrage",
      "Umzug Regensburg",
      "Reinigung Regensburg",
      "Entrümpelung Regensburg",
      "Entsorgung Regensburg",
      "Angebot anderer Firma prüfen",
      "Umzugsangebot prüfen",
      "Reinigungsangebot prüfen",
      "Plan B Service Umzug Reinigung",
      "Immobilie verkaufsbereit machen",
      "Nachlass Räumung Regensburg",
      "diskreter Umzug Regensburg",
      "Übergabeakte",
      "Umzugsunternehmen Bayern",
      "Gewerbereinigung Regensburg",
      "Buchung Regensburg",
      "Rechner Umzug Reinigung Entrümpelung",
      "Leer-Rückfahrt Regensburg",
      "Private Client Umzug Bayern",
    ],
  });
}

export default function Home() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;
  const content = germanizeDeep({
    coreServices,
    specialRoutes,
    trustPoints,
    businessModelPillars,
    offerTracks,
    contactConversionTracks,
    heroActionCards,
    heroTrustBadges,
    regionLinks,
    directEntryPaths,
    specialServiceGroups,
    faqItems,
  });
  const radarEntries = getPublishedEinsatzradarEntries();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Startseite",
        description:
          "Operative Kontrolle für Umzug, Reinigung, Entrümpelung und Wohnungsübergabe in Regensburg, Umgebung ca. 200 km und Bayern nach Verfügbarkeit.",
        path: "/",
        about: [
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Gewerbereinigung",
          "Büroumzug",
          "Schlüsselübergabe",
          "Übergabeprotokoll",
          "Halteverbotszone",
          "Plan-B-Service",
          "Regensburg",
          "Umgebung Regensburg ca. 200 km",
          "Bayern",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Umzug, Reinigung und Entrümpelung",
        description:
          "FLOXANT bündelt Umzug, Reinigung, Entrümpelung, Büroumzug, Übergabevorbereitung und direkte Anfragewege mit operativem Kern in Regensburg, Umgebung ca. 200 km und Bayern nach Verfügbarkeit.",
        path: "/",
        serviceType: "Umzug, Reinigung und Entrümpelung",
        areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern"],
      }),
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/#direkte-einstiege",
        name: "FLOXANT direkte Einstiege",
        description:
      "Hauptwege für direkte Anfrage, Einschätzung, Express-Check, Preisvorstellung und Kontakt.",
        itemListElement: content.directEntryPaths.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `https://www.floxant.de${item.href}`,
          description: item.description,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/#besondere-services",
        name: "Besondere FLOXANT Seiten und Services",
        description:
          "Gruppierte Spezialseiten fuer Angebotspruefung, Plan B, Objektservice, diskrete Anfragen, Regensburg/Bayern-Servicegebiet und Duesseldorf Reinigung.",
        itemListElement: content.specialServiceGroups.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `https://www.floxant.de${item.href}`,
          description: item.text,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/#lokale-servicepfade",
        name: "FLOXANT lokale Servicewege",
        description:
          "Lokale Regensburg- und Bayern-Pfade für Umzug, Reinigung, Entrümpelung, Büroumzug und Einlagerung.",
        itemListElement: mapsIntentRoutes.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `https://www.floxant.de${item.href}`,
        })),
      },
      buildFaqJsonLd(content.faqItems),
    ],
  };
  const primaryCoreServices = content.coreServices.slice(0, 3);
  const supportCoreServices = content.coreServices.slice(3);

  return (
    <main className="flox-home-page relative min-h-screen overflow-hidden bg-background">
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(germanizeDeep(jsonLd)) }}
      />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="ueberblick" className="flox-brand-hero relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:pb-20 lg:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="moving" density="soft" mode="hero" className="opacity-30" />
        </div>

        <div className="flox-shell relative">
          <div className="flox-hero-stage px-5 py-6 sm:px-8 sm:py-8 xl:px-10 xl:py-10">
            <div aria-hidden="true" className="flox-brand-watermark">FLOXANT</div>
            <div aria-hidden="true" className="flox-brand-coordinate">REG / BAY / 200 KM</div>
            <div className="flox-hero-layout grid gap-7 xl:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.76fr)] xl:items-start">
              <div className="flox-hero-copy">
                <div className="flox-hero-kicker-row">
                  <span>Regensburg / Bayern</span>
                  <span>Umzug / Reinigung / Entr&uuml;mpelung</span>
                </div>
                <div className="flox-brand-signature-row mt-4" aria-label="FLOXANT Einsatzsystem">
                  <span className="flox-brand-sigil" aria-hidden="true">F</span>
                  <span>
                    <strong>FLOXANT Einsatzsystem</strong>
                    <small>Regensburg · Bayern · Übergabe im Blick</small>
                  </span>
                </div>
                <div className="flox-kicker">Umzug, Reinigung und Übergabe aus einer Hand</div>

                <h1 className="mt-7 flox-title-xl flox-display-hero max-w-[19ch] text-slate-950 sm:max-w-[16ch]">
                  FLOXANT <span className="flox-hero-accent-word">koordiniert</span> Umzug, Reinigung & Entrümpelung.
                </h1>

                <p className="flox-body mt-5 max-w-2xl">
                  Regensburg ist der Startpunkt. Senden Sie Ort, Termin, Fotos oder offene Fragen.
                  FLOXANT prüft Umzug, Reinigung, Entrümpelung und Übergabe als einen klaren Ablauf.
                </p>

                <div className="flox-hero-action-grid mt-8">
                  <Link
                    href="/buchung?utm_source=homepage_hero&urgency=24h&contact=callback#buchungssystem"
                    className="flox-cta-choice flox-cta-choice-compact flox-cta-choice-primary"
                    data-event="start_booking"
                    data-source="homepage_hero"
                    data-contact-channel="booking"
                    data-intent="hero_24h_booking"
                    data-priority="hot"
                  >
                    <span className="flox-cta-choice-icon">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="flox-cta-choice-body">
                      <span className="flox-cta-choice-title">Anfrage senden</span>
                      <span className="flox-cta-choice-copy">Fall kurz schildern</span>
                    </span>
                    <span className="flox-cta-choice-arrow">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                  <Link
                    href="/rechner?utm_source=homepage_hero"
                    className="flox-cta-choice flox-cta-choice-compact flox-cta-choice-light"
                    data-event="start_calculator"
                    data-source="homepage_hero"
                    data-intent="hero_price_orientation"
                    data-priority="warm"
                  >
                    <span className="flox-cta-choice-icon">
                      <Banknote className="h-4 w-4" />
                    </span>
                    <span className="flox-cta-choice-body">
                      <span className="flox-cta-choice-title">Kosten einschätzen</span>
                      <span className="flox-cta-choice-copy">Preisrahmen prüfen</span>
                    </span>
                    <span className="flox-cta-choice-arrow">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flox-cta-choice flox-cta-choice-compact flox-cta-choice-whatsapp"
                    data-event="click_whatsapp"
                    data-source="homepage_hero"
                    data-contact-channel="whatsapp"
                    data-intent="hero_direct_contact"
                    data-priority="hot"
                  >
                    <span className="flox-cta-choice-icon">
                      <WhatsAppMark className="h-7 w-7" />
                    </span>
                    <span className="flox-cta-choice-body">
                      <span className="flox-cta-choice-title">WhatsApp</span>
                      <span className="flox-cta-choice-copy">Direkt schreiben</span>
                    </span>
                    <span className="flox-cta-choice-arrow">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>

                <div className="flox-hero-proof-strip mt-6">
                  {content.heroTrustBadges.map((badge) => (
                    <div
                      key={badge.label}
                      className="flox-hero-proof-item"
                    >
                      <div className="flox-overline text-blue-700">
                        {badge.label}
                      </div>
                      <p className="flox-card-copy-sm mt-2 text-slate-600">{badge.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flox-hero-side space-y-3">
                <div className="flox-hero-brand-visual">
                  <Image
                    src="/assets/floxant-hero-neu-gedacht.png"
                    alt="Symbolbild für einen organisierten FLOXANT Umzug mit Servicefahrzeug in Regensburg"
                    fill
                    priority
                    sizes="(min-width: 1280px) 430px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="flox-hero-brand-caption">
                    <span className="flox-overline">FLOXANT Einsatzsystem</span>
                    <strong>Ort, Fotos, Termin und Übergabe werden früh zusammengeführt.</strong>
                  </div>
                </div>

                <div className="flox-hero-console p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flox-overline text-blue-700">
                        Schnelle Hilfe
                      </div>
                      <h2 className="flox-card-title-lg mt-2 max-w-[16ch] text-slate-950">
                        Wie möchten Sie starten?
                      </h2>
                    </div>
                    <span className="hidden items-center rounded-[var(--flox-radius-xs)] border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-700 sm:inline-flex">
                      24h online
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2.5">
                    {content.heroActionCards.map((track, index) => {
                      const Icon = track.Icon;
                      const isExternal = track.href.startsWith("http") || track.href.startsWith("tel:");
                      const isDirectContact =
                        track.trackingChannel === "booking" || track.trackingChannel === "whatsapp";
                      const eventName =
                        track.trackingChannel === "whatsapp"
                          ? "click_whatsapp"
                          : track.trackingChannel === "booking"
                            ? "start_booking"
                            : "start_price_frame";
                      const accentClassName =
                        [
                          "bg-blue-600 text-white group-hover:bg-blue-700",
                          "bg-emerald-500 text-white group-hover:bg-emerald-600",
                          "bg-amber-400 text-slate-950 group-hover:bg-amber-500",
                        ][index] ?? "bg-slate-950 text-white group-hover:bg-blue-700";
                      const className =
                        index === 0
                          ? "flox-hero-action-primary group grid min-h-[6rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-3.5 py-3.5 text-left"
                          : "flox-hero-action-secondary group grid min-h-[5.75rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-3.5 py-3.5 text-left";
                      const body = (
                        <>
                          <span className={`flox-icon-tile h-10 w-10 transition ${accentClassName}`}>
                            {track.trackingChannel === "whatsapp" ? (
                              <WhatsAppMark className="h-7 w-7" />
                            ) : (
                              <Icon className="h-4 w-4" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flox-action-meta block text-blue-700">
                              {track.label}
                            </span>
                            <span className="flox-action-title mt-1 block text-slate-950">
                              {track.title}
                            </span>
                            <span className="flox-card-copy-sm mt-1 block text-slate-600">
                              {track.text}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                        </>
                      );

                      return isExternal ? (
                        <a
                          key={track.href}
                          href={track.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                          data-event={eventName}
                          data-source="homepage_decision_panel"
                          data-contact-channel={track.trackingChannel}
                          data-intent={isDirectContact ? "hero_direct_conversion" : "hero_price_orientation"}
                          data-priority={isDirectContact ? "hot" : "warm"}
                        >
                          {body}
                        </a>
                      ) : (
                        <Link
                          key={track.href}
                          href={track.href}
                          className={className}
                          data-event={eventName}
                          data-source="homepage_decision_panel"
                          data-contact-channel={track.trackingChannel}
                          data-intent={isDirectContact ? "hero_direct_conversion" : "hero_price_orientation"}
                          data-priority={isDirectContact ? "hot" : "warm"}
                        >
                          {body}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="flox-hero-note flox-card-copy-sm mt-4 px-4 py-3 text-slate-700">
                    Senden Sie lieber zu früh als zu spät. Mit Ort, Termin und Fotos lässt sich der
                    nächste Schritt schneller einschätzen.
                  </div>
                </div>

                <div className="flox-hero-metric-strip">
                {[
                  ["Lokal erreichbar", "Kurze Wege, wenn Anfahrt und Termin wirklich zählen."],
                  ["Ehrlich geplant", "Ort, Umfang und Verfügbarkeit werden vorab sauber geprüft."],
                  ["Übergabe im Blick", "Schlüssel, Fotos, Restmengen und nächster Schritt bleiben geklärt."],
                ].map(([label, text]) => (
                  <div key={label} className="flox-hero-metric">
                    <div className="flox-metric-label">{label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flox-brand-system-strip mt-6" aria-label="FLOXANT Service-System">
              {[
                ["01", "Prüfen", "Ort · Termin · Fotos"],
                ["02", "Einordnen", "Umzug · Reinigung · Entrümpelung"],
                ["03", "Klären", "Anfrage · Rückruf · nächster Schritt"],
              ].map(([step, title, text]) => (
                <div key={step} className="flox-brand-system-cell">
                  <span>{step}</span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Decision Bar */}
          <div className="flox-hero-route-strip mt-5">
            {[
              { label: "Umzug Regensburg", href: "/umzug-regensburg" },
              { label: "Reinigung Regensburg", href: "/reinigung-regensburg" },
              { label: "Entrümpelung Regensburg", href: "/entruempelung-regensburg" },
              { label: "Preis prüfen", href: "/rechner?utm_source=homepage_decision_bar" },
              { label: "Angebot prüfen", href: "/angebotscheck" },
              { label: "Direkt anfragen", href: "/buchung?utm_source=homepage_decision_bar&urgency=24h&contact=callback#buchungssystem" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flox-hero-route-card group px-4 py-4"
                data-event={item.href.includes("buchung") ? "start_booking" : "click_home_decision_bar"}
                data-source="homepage_decision_bar"
                data-contact-channel={item.href.includes("buchung") ? "booking" : undefined}
                data-intent={item.href.includes("buchung") ? "decision_bar_direct_booking" : "decision_bar_navigation"}
                data-priority={item.href.includes("buchung") ? "hot" : "warm"}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </div>
              </Link>
            ))}
          </div>

          <div id="kontakt-24h" className="flox-priority-contact-band mt-5 scroll-mt-24">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="bg-slate-950 px-5 py-5 text-white sm:px-6">
                <div className="flox-tag-dark">
                  Jederzeit erreichbar
                </div>
                <h2 className="flox-card-title-lg mt-4 max-w-[14ch] text-white">
                  Schicken Sie Ihren Fall, sobald es dringend wird.
                </h2>
                <p className="flox-section-copy mt-3 text-slate-300">
                  Ob abends, am Wochenende oder kurz vor der Übergabe: Senden Sie die wichtigsten
                  Angaben, Fotos oder Fragen. FLOXANT prüft, was realistisch machbar ist, und meldet
                  sich mit einem klaren Vorschlag für den nächsten Schritt.
                </p>
              </div>

              <div className="flox-contact-track-grid grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
                {content.contactConversionTracks.map((track) => {
                  const Icon = track.Icon;
                  const isExternal = track.href.startsWith("http") || track.href.startsWith("tel:");
                  const className =
                    "flox-contact-track-card group flex h-full min-h-[12rem] flex-col justify-between px-4 py-4 text-left";
                  const body = (
                    <>
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={`flox-icon-tile h-10 w-10 text-white ${
                              track.trackingChannel === "whatsapp" ? "bg-[#25D366]" : "bg-blue-600"
                            }`}
                          >
                            {track.trackingChannel === "whatsapp" ? (
                              <WhatsAppMark className="h-7 w-7" />
                            ) : (
                              <Icon className="h-4 w-4" />
                            )}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                        </div>
                        <div className="flox-action-meta mt-4 text-blue-700">
                          {track.label}
                        </div>
                        <h3 className="flox-action-title mt-2 text-slate-950">
                          {track.title}
                        </h3>
                        <p className="flox-card-copy-sm mt-2 text-slate-600">
                          {track.text}
                        </p>
                      </div>
                      <span className="flox-action-meta mt-4 inline-flex text-slate-950">
                        Kontakt starten
                      </span>
                    </>
                  );

                  return isExternal ? (
                    <a
                      key={track.href}
                      href={track.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      data-event="click_24h_contact"
                      data-source="homepage_24h_conversion"
                      data-contact-channel={track.trackingChannel}
                      data-intent="24h_contact_conversion"
                      data-priority="hot"
                    >
                      {body}
                    </a>
                  ) : (
                    <Link
                      key={track.href}
                      href={track.href}
                      className={className}
                      data-event="click_24h_contact"
                      data-source="homepage_24h_conversion"
                      data-contact-channel={track.trackingChannel}
                      data-intent="24h_contact_conversion"
                      data-priority="hot"
                    >
                      {body}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flox-bridge-note mt-4">
            <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
              <div className="px-5 py-4 text-sm leading-7 text-slate-700 sm:px-6">
                Wer schon weiß, was gebraucht wird, startet direkt mit einer{" "}
                <Link href="/buchung" className="flox-subtle-link font-semibold text-blue-700 underline decoration-blue-200 hover:text-blue-900">
                  Anfrage
                </Link>
                . Wer zuerst ein Gefühl für Aufwand und Preisrahmen möchte, nutzt den{" "}
                <Link href="/rechner" className="flox-subtle-link font-semibold text-blue-700 underline decoration-blue-200 hover:text-blue-900">
                  Rechner
                </Link>
                .
              </div>
              <div className="border-t border-blue-100 bg-blue-50/70 px-5 py-4 text-sm leading-7 text-slate-700 lg:border-l lg:border-t-0 sm:px-6">
                Bei Gewerbe, sensiblen Fällen oder flexiblen Transporten führt FLOXANT Sie zum passenden Kontaktweg.
              </div>
            </div>
          </div>

          <div className="flox-support-route-grid mt-4">
            {[
              {
                title: "Den richtigen Start finden",
                text: "Direkte Anfrage, Preisrahmen oder Express-Fall: Sie wählen den Weg, der zu Ihrer Situation passt.",
                href: "/buchung",
              },
              {
                title: "Hilfe aus der Region",
                text: "Regensburg ist der Kern. Von dort aus prüft FLOXANT Umzug, Reinigung und Entrümpelung in der Umgebung bis ca. 200 km und in Bayern nach Ort, Umfang und Termin.",
                href: "/standorte",
              },
              {
                title: "Übergabe mitdenken",
                text: "Wenn Schlüssel, Restmengen, Reinigung oder Fotos wichtig sind, wird das direkt bei der Anfrage berücksichtigt.",
                href: "/umzug-mit-reinigung",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flox-support-route-card group px-5 py-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flox-card-title text-slate-950">{item.title}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>

          <div className="flox-cta-band flox-offer-hub mt-5 p-4 md:p-5">
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="px-2 py-2">
                <div className="flox-tag-dark">
                  Einfach starten
                </div>
                <h2 className="flox-title-lg flox-display-section mt-4 max-w-[13ch] text-white">
                  Der passende Start ohne langes Suchen.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Wählen Sie, was gerade am besten hilft: direkt anfragen, Kosten einschätzen,
                  Budget nennen, Übergabe vorbereiten oder Gewerbefall besprechen.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {content.offerTracks.map((track) => {
                  const Icon = track.Icon;
                  return (
                    <Link
                      key={track.href}
                      href={track.href}
                      className="flox-action-card-dark group p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flox-icon-tile-dark h-10 w-10">
                          <Icon className="h-4 w-4" />
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                      </div>
                      <div className="flox-action-meta mt-4 text-cyan-200">
                        {track.label}
                      </div>
                      <h3 className="flox-action-title mt-2 text-white">
                        {track.title}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-slate-300">{track.text}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flox-search-entry-strip mt-4 px-5 py-4">
            <div className="flox-overline text-blue-700">
              Häufig gesuchte Einstiege
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {mapsIntentRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flox-command-link"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceRequestCompass />

      {/* ── SERVICE ARCHITECTURE ──────────────────────────────── */}
      <FloxantStorytellingSection
        variant="operations"
        eyebrow="So hilft FLOXANT"
        title="Erst verstehen, dann sauber lösen: FLOXANT führt den ganzen Übergang."
        intro="Sie schicken, was schon da ist: Fotos, Ort, Termin, Angebot oder Budget. Daraus entsteht kein Ratespiel, sondern ein klarer Ablauf für Umzug, Reinigung, Entrümpelung und Übergabe."
        regionLabel="Regensburg · Umgebung 200 km · Bayern nach Verfügbarkeit · Düsseldorf Reinigung getrennt"
        primaryHref="/buchung"
        primaryLabel="Direkt anfragen"
        secondaryHref="/angebot-guenstiger-pruefen"
        secondaryLabel="Angebot prüfen"
        className="flox-story-flow pt-6"
      />

      <FloxantNextStepPanel variant="booking" className="flox-next-step-flow py-8" />

      <section id="kontakt-gruende" className="flox-section flox-section-tight flox-brand-section content-auto py-8">
        <div className="flox-shell">
          <div className="flox-editorial-grid">
            <div className="flox-section-intro">
              <div className="flox-kicker">Warum jetzt Kontakt aufnehmen?</div>
              <h2 className="flox-title-lg flox-display-section mt-5 max-w-[14ch] text-slate-950">
                Je früher wir den Fall kennen, desto besser lässt er sich planen.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
                Ein kurzer Kontakt reicht oft, um Unsicherheit aus dem Ablauf zu nehmen. Senden Sie
                Ort, Termin, Fotos, groben Umfang oder ein vorhandenes Angebot. FLOXANT sagt Ihnen,
                welcher nächste Schritt sinnvoll ist.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/buchung?utm_source=homepage_contact_reasons&urgency=24h&contact=callback#buchungssystem"
                  className="flox-button-primary px-6"
                  data-event="start_booking"
                  data-source="homepage_contact_reasons"
                  data-contact-channel="booking"
                  data-intent="contact_reason_booking"
                  data-priority="hot"
                >
                  Fall schildern
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flox-button-secondary px-6"
                  data-event="click_whatsapp"
                  data-source="homepage_contact_reasons"
                  data-contact-channel="whatsapp"
                  data-intent="contact_reason_whatsapp"
                  data-priority="hot"
                >
                  <WhatsAppMark className="h-5 w-5" />
                  WhatsApp schreiben
                </a>
              </div>
            </div>

            <div className="flox-reason-grid">
              {[
                ["Termin naht", "Wenn Auszug, Reinigung oder Übergabe schon bald ansteht."],
                ["Aufwand unklar", "Wenn Menge, Laufwege, Etagen oder Restarbeiten schwer einzuschaetzen sind."],
                ["Angebot liegt vor", "Wenn Sie wissen möchten, ob Umfang, Preis und Zusatzpunkte plausibel sind."],
                ["Alles aus einer Hand", "Wenn Transport, Reinigung, Entsorgung und Schlüsselübergabe zusammenpassen müssen."],
              ].map(([title, text], index) => {
                const iconClassName =
                  [
                    "bg-blue-50 text-blue-700",
                    "bg-emerald-50 text-emerald-700",
                    "bg-amber-50 text-amber-700",
                    "bg-slate-100 text-slate-700",
                  ][index] ?? "bg-blue-50 text-blue-700";

                return (
                  <div key={title} className="flox-reason-card group px-4 py-4">
                    <div className="flox-card-title flex items-center gap-2 text-slate-950">
                      <span className={`flox-icon-tile h-8 w-8 ${iconClassName}`}>
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      {title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="flox-section flox-section-major flox-brand-section flox-service-brand-section content-auto pt-0">
        <div className="flox-shell">
          <div className="flox-section-intro max-w-3xl">
            <div className="flox-kicker">Leistungen schnell einordnen</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[16ch] text-slate-950">
              Was FLOXANT übernimmt - und wann welcher Weg passt.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Die meisten Kunden brauchen keine lange Erklärung, sondern einen passenden Einstieg.
              Hier sehen Sie, ob Umzug, Reinigung, Entrümpelung, Preisprüfung oder Lagerung der
              richtige nächste Schritt ist.
            </p>
          </div>

          <div className="flox-brand-logic-board mt-8" aria-label="FLOXANT Leistungslogik">
            {[
              ["F1", "Fall verstehen", "Ort, Umfang, Fotos und Termin werden zuerst sauber eingeordnet."],
              ["F2", "Service bündeln", "Umzug, Reinigung, Entrümpelung und Übergabe greifen als Ablauf zusammen."],
              ["F3", "Nächsten Schritt führen", "Anfrage, Rechner, Rückruf oder WhatsApp bleiben klar unterscheidbar."],
            ].map(([code, title, text]) => (
              <div key={code} className="flox-brand-logic-cell">
                <span>{code}</span>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            ))}
          </div>

          <div className="flox-service-architecture mt-10">
            <div className="grid gap-4 lg:grid-cols-3">
              {primaryCoreServices.map((route) => {
                const Icon = route.Icon;
                return (
                  <article key={route.title} className="flox-service-priority-card group p-6">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="flox-icon-tile h-12 w-12 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flox-overline mt-5 text-blue-700">
                      {route.label}
                    </div>
                    <h3 className="flox-card-title-lg mt-3 text-slate-950">{route.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{route.text}</p>
                    <Link href={route.href} className="flox-row-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                      Weiter
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {supportCoreServices.map((route) => {
              const Icon = route.Icon;
              return (
                <article key={route.title} className="flox-service-support-card group p-5">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="flox-icon-tile h-11 w-11 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flox-overline mt-5 text-blue-700">
                    {route.label}
                  </div>
                  <h3 className="flox-card-title-lg mt-3 text-slate-950">{route.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{route.text}</p>
                  <Link href={route.href} className="flox-row-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                    Weiter
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="besondere-services" className="flox-section flox-section-contrast content-auto pt-0">
        <div className="flox-shell">
          <div className="flox-cta-band px-5 py-6 text-white md:px-8 md:py-8">
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />

            <div className="relative grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <div className="flox-tag-dark">
                  <Sparkles className="h-4 w-4" />
                  Hilfe für besondere Situationen
                </div>
                <h2 className="flox-gradient-title flox-title-lg flox-display-section mt-5 max-w-[13ch]">
                  Wenn ein normaler Auftrag nicht reicht.
                </h2>
              </div>
              <p className="max-w-3xl text-sm font-semibold leading-7 text-slate-200 md:text-base md:leading-8">
                Manche Situationen brauchen mehr Ruhe und Vorbereitung: ein vorhandenes Angebot,
                ein gekippter Plan, eine bevorstehende Übergabe, Nachlass, diskreter Auszug oder
                ein Objekt, das wieder sauber nutzbar werden soll. Genau dafür gibt es eigene Wege.
              </p>
            </div>

            <div className="relative mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {content.specialServiceGroups.map((group, index) => {
                const Icon = group.Icon;

                return (
                  <article
                    key={group.title}
                    className="flox-action-card-dark flox-special-service-card group p-4 md:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flox-icon-tile h-11 w-11 bg-white text-blue-700 shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flox-action-meta text-cyan-100">
                            {group.label}
                          </div>
                          <div className="flox-card-copy-sm mt-1 text-slate-400">
                            Service {index + 1}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={group.href}
                        className="flox-icon-tile-dark h-10 w-10 transition group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-blue-700"
                        aria-label={`${group.title} öffnen`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <h3 className="flox-card-title-lg mt-5 text-white">
                      {group.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
                      {group.text}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.keywords.map((keyword) => (
                        <span
                          key={`${group.title}-${keyword}`}
                          className="flox-tag-dark flox-card-copy-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-2">
                      {group.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flox-action-card-dark flex items-center justify-between gap-3 px-3 py-3 text-sm font-bold text-slate-100"
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-cyan-100" />
                        </Link>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SignatureServices
        locale="de"
        source="homepage_signature_services"
        className="flox-signature-flow"
        dict={{
          signature_services: {
            badge: "Besondere Hilfe",
            title: "Wenn Timing, Reinigung, Restmengen oder Übergabe zusammenpassen müssen",
            subtitle:
              "Viele Aufträge werden erst schwierig, wenn Details fehlen: Schlüssel, Haltezone, Fotos, Restmengen, Reinigung oder ein fester Übergabetermin. FLOXANT denkt diese Punkte früh mit.",
            items: {},
          },
        }}
      />

      <Einsatzradar
        entries={radarEntries}
        filters={einsatzradarFilters}
        zones={einsatzradarRegionZones}
        variant="compact"
        maxItems={6}
        showFilters={false}
        showZones={false}
        title="Typische FLOXANT Hilfe in Regensburg"
        subtitle="Beispiele, bei denen FLOXANT im Raum Regensburg helfen kann: Reinigung, Entrümpelung, Umzug, Rückfahrt, Übergabe und Objektvorbereitung."
        source="homepage_einsatzradar_teaser"
      />

      <PublicAuthorityModules
        moduleIds={[
          "regensburg_core",
          "regensburg_200km",
          "bavaria_availability",
          "move_cleaning_combo",
          "clear_cleaning_combo",
            "rental_ready",
            "realtor_landlord_link",
            "referral_partnercode",
            "damage_control",
          "cellar_trashroom_rescue",
          "handover_file",
          "photo_check",
          "budget_check",
          "route_board",
          "premium_discreet",
        ]}
        badge="Lokale Hilfe"
        title="Warum FLOXANT in Regensburg gut zu komplexen Fällen passt"
        subtitle="Sie bekommen keine lose Liste von Leistungen, sondern eine ruhige Einordnung: Region, Verfügbarkeit, Fotos, Budget, kombinierte Services und sensible Projekte werden von Anfang an mitgedacht."
        source="homepage_local_authority_modules"
      />

      <section className="flox-section flox-section-index content-auto pt-0">
        <div className="flox-shell">
          <div className="flox-link-directory-panel px-6 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flox-kicker">Regensburg und Bayern</div>
                <h2 className="mt-3 flox-title-lg flox-display-section max-w-[16ch] text-slate-950">
                  Finden Sie direkt die Hilfe, die zu Ort und Aufgabe passt.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Ob Umzug, Reinigung, Entrümpelung, Büroumzug oder Einlagerung: Die passenden
                  Seiten führen schnell zu Informationen und Kontakt.
                </p>
              </div>
              <Link href="/standorte" className="flox-button-secondary px-6">
                Alle Standorte
              </Link>
            </div>
            <div className="flox-link-directory-grid mt-6">
              {BAVARIA_DIRECT_DEMAND_LINKS.slice(0, 8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flox-directory-card px-4 py-4"
                >
                  <div className="flox-overline text-blue-700">
                    Vor Ort
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-950">{item.label}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE SYSTEMS + TRUST (merged) ──────────────────── */}
      <section id="geschaeftsmodell" className="flox-section flox-section-pair content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="flox-panel flox-lead-panel px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">So arbeitet FLOXANT</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[15ch] text-slate-950">
              Nicht einfach nur Helfer buchen, sondern den Ablauf richtig vorbereiten.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Für Sie heißt das: weniger Abstimmung mit mehreren Stellen, klarere Verantwortung,
              realistische Planung und bessere Vorbereitung für den Einsatztag.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/buchung" className="flox-button-primary px-6">
                Fall kurz schildern
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/rechner" className="flox-button-secondary px-6">
                Kosten einschätzen
              </Link>
            </div>
            <div className="mt-5 flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:flex-row sm:flex-wrap">
              <Link href="/praxisfaelle" className="flox-command-link">
                Praxisfälle ansehen
              </Link>
              <Link href="/anbieter-vergleichen" className="flox-command-link">
                Anbieter fair vergleichen
              </Link>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {content.businessModelPillars.map((item) => (
              <article key={item.title} className="flox-system-pillar-card p-6">
                <h3 className="flox-card-title text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="preis" className="flox-section flox-section-pair content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.03fr_0.97fr]">
          <article className="flox-panel-dark flox-conversion-panel px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Sofortiger Einstieg</div>
            <h2 className="flox-title-lg flox-display-section mt-6 max-w-[15ch] text-white">
              Nicht jeder Kunde braucht denselben Weg.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              FLOXANT trennt direkte Anfrage, Preisgefühl, B2B-Reinigung und Premium-Fälle
              sauber voneinander, statt alles in einem einzigen Formular zu verstecken.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.specialRoutes.map((item) => {
                const Icon = item.Icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flox-action-card-dark flox-special-route-card px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flox-icon-tile-dark h-10 w-10">
                        <Icon className="h-4 w-4" />
                      </div>
                      <ArrowRight className="flox-special-route-arrow mt-1 h-4 w-4" />
                    </div>
                    <div className="flox-action-meta flox-special-route-meta mt-4">
                      {item.label}
                    </div>
                    <h3 className="flox-card-title flox-special-route-title mt-2">{item.title}</h3>
                    <p className="flox-special-route-copy mt-2 text-sm leading-7">{item.text}</p>
                  </Link>
                );
              })}
            </div>
          </article>

          <article className="flox-panel flox-support-panel px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Warum FLOXANT</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[15ch] text-slate-950">
              Weniger Schnittstellen. Weniger Risiko. Besser planbar.
            </h2>
            <div className="mt-6 flox-list-compact">
              {content.trustPoints.map((item, index) => (
                <div key={item.title} className="flox-list-item">
                  <span className="flox-list-step">{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-700">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── OPERATIONS PROOF ──────────────────────────────────── */}
      <section id="ablauf" className="flox-section flox-section-pair content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-2">
          <article className="flox-panel flox-process-panel px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Ablauf</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[16ch] text-slate-950">
              Vertrauen entsteht durch Struktur, nicht durch Lautstärke.
            </h2>
            <div className="mt-6 space-y-3">
              {[
                "Fall kurz schildern: Service, Ort, Termin, Zugang und Ziel der Übergabe.",
                "Volumen, Fläche, Laufwege, Parkmöglichkeit und Zusatzleistungen realistisch erfassen.",
                "FLOXANT prüft Machbarkeit, Preisrahmen und passende Durchführung.",
                "Erst danach werden Termin, Team, Leistungsumfang und Übergabe verbindlich abgestimmt.",
              ].map((step, index) => (
                <div key={step} className="flox-list-item">
                  <span className="flox-list-step">{index + 1}</span>
                  <span className="text-sm font-semibold leading-7 text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="flox-panel flox-process-panel px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Operative Stärke</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[15ch] text-slate-950">
              FLOXANT denkt kombinierte Services von Anfang an mit.
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "Direktbuchung, Rechner, WhatsApp und Budget greifen kontrolliert ineinander.",
                "B2B-Reinigung, Leer-Rückfahrt und Private Client bleiben eigene starke Wege.",
                "Regionale Führung ab Regensburg macht Übergabe und Abstimmung realistischer.",
                "Schlüsselübergabe, Fotodokumentation und Protokoll können von Anfang an mitgedacht werden.",
              ].map((item) => (
                <div key={item} className="flox-process-note px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── REGION + FAQ ──────────────────────────────────────── */}
      <SearchDominanceExperience variant="default" className="content-auto pt-0" />
      <TrustFlowSection sectionId="vertrauen" />
      <LocalSeoSignalPanel sectionId="lokales-signal" />

      <section id="region" className="flox-section flox-section-index content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="flox-link-directory-panel px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Region</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Regensburg ist der Kern. Bayern bleibt das klare Einsatzgebiet.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Die Umgebung bis ca. 200 km rund um Regensburg wird zuerst geprüft; Bayern
              bleibt nach Verfügbarkeit möglich. Diese Klarheit hilft Kunden und Suchmaschinen,
              FLOXANT als lokales Service-System mit echter operativer Basis zu verstehen.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.regionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flox-command-link flox-command-link-large"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </article>

          <div className="flox-faq-panel px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">FAQ</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Häufige Fragen zu Anfrage, Preis und Einsatzgebiet.
            </h2>
            <div className="mt-6 grid gap-3">
              {content.faqItems.map((item, index) => (
                <details
                  key={item.q}
                  className="flox-faq-card px-4 py-4"
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section id="kontakt" className="flox-section flox-section-final content-auto pt-0">
        <div className="flox-shell">
          <div className="flox-panel-dark px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Direkt anfragen</div>
                <h2 className="flox-title-lg flox-display-hero mt-6 max-w-[15ch] text-white">
                  Der nächste Schritt soll sich klar anfühlen, nicht billig.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  Wenn Sie schon wissen, was ansteht, schildern Sie den Fall direkt über die Buchung.
                  Wenn Sie erst ein Preisgefühl brauchen, nutzen Sie den Rechner. Wenn Timing, Schlüssel,
                  Reinigung oder Übergabe drängen, hilft eine kurze, konkrete Beschreibung am meisten.
                </p>
              </div>

              <div className="flox-cta-choice-grid">
                <Link href="/buchung" className="flox-cta-choice flox-cta-choice-primary">
                  <span className="flox-cta-choice-icon">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="flox-cta-choice-body">
                    <span className="flox-cta-choice-eyebrow">Hauptpfad</span>
                    <span className="flox-cta-choice-title">Fall schildern</span>
                    <span className="flox-cta-choice-copy">Direkt zur Anfrage</span>
                  </span>
                  <span className="flox-cta-choice-arrow">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href="/rechner" className="flox-cta-choice flox-cta-choice-light">
                  <span className="flox-cta-choice-icon">
                    <Banknote className="h-5 w-5" />
                  </span>
                  <span className="flox-cta-choice-body">
                    <span className="flox-cta-choice-eyebrow">Einschätzung</span>
                    <span className="flox-cta-choice-title">Kosten einschätzen</span>
                    <span className="flox-cta-choice-copy">Rechner öffnen</span>
                  </span>
                  <span className="flox-cta-choice-arrow">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
