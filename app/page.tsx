import type { Metadata } from "next";
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
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { SignatureServices } from "@/components/SignatureServices";
import { AiServiceRecommendationPanel } from "@/components/seo/AiServiceRecommendationPanel";
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
  { label: "FLOXANT Einsatzradar", href: "/einsatzradar-regensburg", description: "Typische Einsatzarten und grobe Servicezonen im Raum Regensburg ansehen: ohne Kundendaten, ohne exakte Adressen, ohne Fake-Live-Karte." },
  { label: "Rückfahrt-Börse", href: "/rueckfahrt-boerse", description: "Strecke mit Start, Ziel, Datum, Umfang und Flexibilität eintragen und Rückfahrt/Leerfahrt nach Verfügbarkeit prüfen lassen." },
  { label: "Uebergabeakte", href: "/uebergabeakte", description: "FLOXANT Uebergabe-Dossier 2.0 fuer Auszug, Reinigung, Fotos, Schluesselstatus, offene Hinweise und Aktenstatus nach Absprache." },
  { label: "Buchung", href: "/buchung", description: "Direkter Anfrageweg für Kunden, die ihren Fall sofort an FLOXANT senden möchten." },
  { label: "Rechner", href: "/rechner", description: "Einschätzung für Preisrahmen, Aufwand und Service-Fit vor der eigentlichen Anfrage." },
  { label: "Angebotscheck + Red-Flag-Scanner", href: "/angebotscheck#red-flag-scanner", description: "Angebot vor Zusage scannen: Umfang, Zugang, Zusatzkosten, Reinigung, Entsorgung und offene Punkte sichtbar machen." },
  { label: "Plattform-Auftrag prüfen", href: "/plattform-auftrag-pruefen", description: "Neutraler Einstieg für Kunden mit Plattform- oder Anbieterangebot: Angebot, Screenshot, Preis, Termin und offene Punkte praktisch prüfen lassen." },
  { label: "Express-Check", href: "/express-anfrage", description: "Schneller Weg für eilige Fälle mit wenigen Pflichtangaben." },
  { label: "Preisvorstellung", href: "/anfrage-mit-preisrahmen", description: "Direkter Weg für Kunden, die ihr Budget oder ihren Zielrahmen offen mitsenden möchten." },
  { label: "Umzugsunternehmen Regensburg", href: "/umzugsunternehmen-regensburg", description: "Money Page für Nutzer, die gezielt ein lokales Umzugsunternehmen suchen." },
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
    label: "Region & Local Proof",
    title: "Regensburg, 200 km und Bayern sichtbar machen",
    text: "Für lokale Suchanfragen, Google Maps, Einsatzgebiet, Servicegebiet und typische Einsatzarten im Raum Regensburg ohne Fake-Live-Karte.",
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
    title: "Düsseldorf nur Reinigung und Entsorgung",
    text: "Für B2B-Reinigung, Wohnungsreinigung, Treppenhaus, Grundreinigung, möblierte Wohnung und Entsorgung in Düsseldorf, ohne Umzugssignal.",
    href: "/duesseldorf/reinigung",
    Icon: Sparkles,
    keywords: ["Düsseldorf", "Reinigung", "Entsorgung"],
    links: [
      { label: "Reinigung Düsseldorf", href: "/duesseldorf/reinigung" },
      { label: "B2B-Reinigung Düsseldorf", href: "/duesseldorf/bueroreinigung" },
      { label: "Möblierte Wohnung", href: "/reinigung-moeblierte-wohnung-duesseldorf" },
      { label: "Entsorgung Düsseldorf", href: "/entsorgung-duesseldorf" },
    ],
  },
];

const faqItems = [
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
    a: "Regensburg ist der operative Kern. Von dort aus führt FLOXANT Einsätze in Bayern sauber weiter, wenn Strecke, Verfügbarkeit und Leistungsumfang sinnvoll zusammenpassen.",
  },
  {
    q: "Gibt es auch Wege für Gewerbe oder sensible Projekte?",
    a: "Ja. Für B2B-Reinigung gibt es eine eigene Seite, für diskrete Premium-Fälle den Private-Client-Pfad und für flexible Transporte die Leer-Rückfahrt.",
  },
  {
    q: "Welche besonderen FLOXANT-Seiten helfen bei speziellen Situationen?",
    a: "Besonders wichtig sind Angebotsprüfung, Plan-B-Service, Schadensbegrenzung, Immobilie verkaufsbereit machen, Nachlass-Räumung, diskreter Umzug, Einsatzradar, Rückfahrt-Börse, Übergabeakte und Düsseldorf Reinigung/Entsorgung. Diese Seiten führen Kunden gezielt zum passenden Anfrageweg statt nur zu einer allgemeinen Servicebeschreibung.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "",
    title: "FLOXANT Regensburg – Umzug, Reinigung & Spezialservices",
    description:
      "FLOXANT bündelt Umzug, Reinigung, Entrümpelung, Entsorgung, Angebotsprüfung, Plan B, Übergabe, Objektservice und Düsseldorf Reinigung/Entsorgung mit klaren Anfragewegen.",
    keywords: [
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
          "Operative Kontrolle für Umzug, Reinigung, Entrümpelung und Wohnungsübergabe in Regensburg und Bayern.",
        path: "/",
        about: [
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Gewerbereinigung",
          "Büroumzug",
          "Regensburg",
          "Bayern",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Umzug, Reinigung und Entrümpelung",
        description:
          "FLOXANT bündelt Umzug, Reinigung, Entrümpelung, Büroumzug, Übergabevorbereitung und direkte Anfragewege mit operativem Kern in Regensburg und Einsatzgebiet Bayern.",
        path: "/",
        serviceType: "Umzug, Reinigung und Entrümpelung",
        areaServed: ["Regensburg", "Bayern"],
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
          "Gruppierte Spezialseiten für Angebotsprüfung, Plan B, Objektservice, diskrete Anfragen, Regensburg/Bayern-Local-SEO und Düsseldorf Reinigung/Entsorgung.",
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
        name: "FLOXANT lokale Servicepfade",
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(germanizeDeep(jsonLd)) }}
      />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="ueberblick" className="relative overflow-hidden px-6 pb-16 pt-12 lg:pb-20 lg:pt-18">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="moving" density="soft" mode="hero" className="opacity-30" />
        </div>

        <div className="flox-shell relative">
          <div className="flox-panel rounded-[2.4rem] px-6 py-7 sm:px-9 sm:py-9 xl:px-10 xl:py-10">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
              <div>
                <div className="flox-kicker">Umzug, Reinigung und Übergabe aus einer Hand</div>

                <h1 className="mt-7 flox-title-xl flox-display-hero max-w-[16ch] text-slate-950">
                  Umzug, Reinigung & Entrümpelung in Regensburg - organisiert aus einer Hand.
                </h1>

                <p className="flox-body mt-5 max-w-2xl">
                  FLOXANT hilft in Regensburg, der Umgebung bis ca. 200 km und Bayern nach
                  Verfügbarkeit, wenn mehr als nur ein Transport gebraucht wird: Reinigung,
                  Restmengen, Schlüssel, Fotos, Zeitfenster und Übergabe müssen zusammenpassen.
                  Dafür ordnen wir den Fall realistisch ein, bevor daraus ein verbindlicher Auftrag wird.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/buchung"
                    className="flox-button-primary px-6"
                    data-event="start_booking"
                    data-source="homepage_hero"
                  >
                    Auftrag realistisch einordnen lassen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/rechner"
                    className="flox-button-secondary px-6"
                    data-event="start_calculator"
                    data-source="homepage_hero"
                  >
                    Kosten einschätzen
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flox-button-quiet px-6"
                    data-event="click_whatsapp"
                    data-source="homepage_hero"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["Lokal erreichbar", "Kurze Wege dort, wo Anfahrt und Termin wirklich zählen."],
                  ["Reichweite geprüft", "Weitere Orte werden nach Route, Umfang und Kapazität eingeordnet."],
                  ["Übergabe im Blick", "Leistung, Schlüssel, Fotos und nächster Schritt bleiben sichtbar."],
                ].map(([label, text]) => (
                  <div key={label} className="flox-metric">
                    <div className="flox-metric-label">{label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decision Bar */}
          <div className="mt-5 grid gap-3 lg:grid-cols-6">
            {[
              { label: "Umzug Regensburg", href: "/umzug-regensburg" },
              { label: "Reinigung Regensburg", href: "/reinigung-regensburg" },
              { label: "Entrümpelung Regensburg", href: "/entruempelung-regensburg" },
              { label: "Preis prüfen", href: "/rechner" },
              { label: "Angebot prüfen", href: "/angebotscheck" },
              { label: "Direkt anfragen", href: "/buchung" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flox-panel group relative overflow-hidden rounded-[1.35rem] px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-[1.55rem] border border-blue-100 bg-white/90 shadow-lg shadow-slate-950/5">
            <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
              <div className="px-5 py-4 text-sm leading-7 text-slate-700 sm:px-6">
                Wer schon weiß, was gebraucht wird, startet direkt über{" "}
                <Link href="/buchung" className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-900">
                  Buchung
                </Link>
                . Wer zuerst Klarheit zu Aufwand und Rahmen will, nutzt den{" "}
                <Link href="/rechner" className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-900">
                  Rechner
                </Link>
                .
              </div>
              <div className="border-t border-blue-100 bg-blue-50/70 px-5 py-4 text-sm leading-7 text-slate-700 lg:border-l lg:border-t-0 sm:px-6">
                Spezialfälle wie Gewerbe, Premium-Betreuung oder flexible Transporte bleiben separat sauber erreichbar.
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              {
                title: "Erst den passenden Weg wählen",
                text: "Buchung, Rechner, Budget oder Express bleiben getrennt, damit der Einstieg sofort verständlich bleibt.",
                href: "/buchung",
              },
              {
                title: "Lokale Leistung statt Suchchaos",
                text: "Regensburg ist der Kern. Von dort aus führen Umzug, Reinigung und Entrümpelung sauber in die passenden Stadt- und Servicepfade.",
                href: "/standorte",
              },
              {
                title: "Übergabe von Anfang an mitdenken",
                text: "Wenn Schlüssel, Restmengen, Reinigung oder Fotodokumentation wichtig sind, wird das früh in die Einordnung eingebaut.",
                href: "/umzug-mit-reinigung",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[1.45rem] border border-slate-200 bg-white/90 px-5 py-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold tracking-tight text-slate-950">{item.title}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(18,38,70,0.96))] p-4 shadow-2xl shadow-slate-950/20 md:p-5">
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="px-2 py-2">
                <div className="inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                  Welcher Weg passt?
                </div>
                <h2 className="mt-4 max-w-[13ch] text-3xl font-bold leading-[1] tracking-[-0.018em] text-white md:text-4xl">
                  Fünf Einstiege statt ein überladenes Formular.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Kunden sollen nicht suchen müssen. FLOXANT trennt schnelle Anfrage, Preisgefühl,
                  Budget, Übergabe und Gewerbe sauber voneinander.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {content.offerTracks.map((track) => {
                  const Icon = track.Icon;
                  return (
                    <Link
                      key={track.href}
                      href={track.href}
                      className="group rounded-[1.35rem] border border-white/10 bg-white/[0.075] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.1]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-[0.95rem] bg-white/10 text-cyan-200">
                          <Icon className="h-4 w-4" />
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                      </div>
                      <div className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                        {track.label}
                      </div>
                      <h3 className="mt-2 text-base font-bold leading-tight tracking-tight text-white">
                        {track.title}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-slate-300">{track.text}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[1.55rem] border border-slate-200 bg-white/88 px-5 py-4 shadow-sm shadow-slate-950/5">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Häufig gesuchte Einstiege
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {mapsIntentRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950 hover:shadow-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE ARCHITECTURE ──────────────────────────────── */}
      <FloxantStorytellingSection
        variant="operations"
        eyebrow="FLOXANT jetzt verständlich"
        title="Umzug, Reinigung, Entrümpelung und Übergabe als klarer Ablauf."
        intro="Statt Kunden mit vielen Einzelleistungen allein zu lassen, zeigt FLOXANT den nächsten sinnvollen Schritt: Fotos senden, Ort und Termin klären, Angebot prüfen, Budget nennen oder direkt anfragen."
        regionLabel="Regensburg · Umgebung 200 km · Bayern nach Verfügbarkeit · Düsseldorf nur Reinigung/Entsorgung"
        primaryHref="/buchung"
        primaryLabel="Direkt anfragen"
        secondaryHref="/angebot-guenstiger-pruefen"
        secondaryLabel="Angebot prüfen"
        className="pt-6"
      />

      <FloxantNextStepPanel variant="booking" className="py-8" />

      <SearchDominanceExperience variant="default" className="py-8" />

      <AiServiceRecommendationPanel variant="default" className="pb-10 pt-0" />

      <section id="leistungen" className="flox-section content-auto pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
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

          <div className="mt-10 grid gap-4 xl:grid-cols-4">
            {content.coreServices.map((route) => {
              const Icon = route.Icon;
              return (
                <article key={route.title} className="flox-panel group relative overflow-hidden rounded-[1.8rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700 transition duration-300 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {route.label}
                  </div>
                  <h3 className="mt-3 text-[1.5rem] font-bold tracking-tight text-slate-950">{route.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{route.text}</p>
                  <Link href={route.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900">
                    Weiter
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="besondere-services" className="flox-section content-auto pt-0">
        <div className="flox-shell">
          <div className="relative overflow-hidden rounded-[2.45rem] border border-slate-200 bg-slate-950 px-5 py-6 text-white shadow-[0_34px_100px_rgba(15,23,42,0.18)] md:px-8 md:py-8">
            <div className="pointer-events-none absolute -left-20 top-4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-12 -top-16 h-72 w-72 rounded-full bg-cyan-300/16 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />

            <div className="relative grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                  <Sparkles className="h-4 w-4" />
                  Besondere FLOXANT Seiten & Services
                </div>
                <h2 className="flox-gradient-title mt-5 max-w-[13ch] text-3xl font-black leading-[1.02] tracking-[-0.045em] md:text-5xl">
                  Die Seiten, die Kunden wirklich weiterbringen.
                </h2>
              </div>
              <p className="max-w-3xl text-sm font-semibold leading-7 text-slate-200 md:text-base md:leading-8">
                FLOXANT soll nicht wie ein normaler Umzugs- oder Reinigungsanbieter wirken.
                Diese Spezialseiten holen kaufnahe Situationen ab: vorhandenes Angebot,
                Plan B, Objektübergabe, Nachlass, diskreter Auszug, lokale Regensburg-Suche
                und Düsseldorf-Reinigung ohne Umzugssignal.
              </p>
            </div>

            <div className="relative mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {content.specialServiceGroups.map((group, index) => {
                const Icon = group.Icon;

                return (
                  <article
                    key={group.title}
                    className="flox-special-service-card group rounded-[1.65rem] border border-white/10 bg-white/[0.075] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.1] md:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[1rem] bg-white text-blue-700 shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">
                            {group.label}
                          </div>
                          <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                            Ebene {index + 1}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={group.href}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-cyan-100 transition group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-blue-700"
                        aria-label={`${group.title} öffnen`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <h3 className="mt-5 text-xl font-black leading-tight tracking-[-0.025em] text-white">
                      {group.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
                      {group.text}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.keywords.map((keyword) => (
                        <span
                          key={`${group.title}-${keyword}`}
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-50"
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
                          className="flex items-center justify-between gap-3 rounded-[1rem] border border-white/10 bg-white/[0.06] px-3 py-3 text-sm font-bold text-slate-100 transition hover:border-cyan-200/30 hover:bg-white/[0.1]"
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
        dict={{
          signature_services: {
            badge: "Signatur-Services",
            title: "Signature Services, die FLOXANT vom Standardanbieter trennen",
            subtitle:
              "Viele Aufträge kippen nicht beim Tragen, sondern bei Timing, Reinigung, Restmengen, Schlüssel, Haltezone, Fotos und Übergabe. Diese Bausteine machen genau diese Engpässe sichtbar.",
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
        title="FLOXANT Einsatzradar Regensburg"
        subtitle="Typische Einsatzarten im Raum Regensburg: Reinigung, Entruempelung, Umzug, Rueckfahrt, Uebergabe und Objektvorbereitung ohne Kundendaten oder Fake-Live-Karte."
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
        badge="Lokale Autoritaet"
        title="Warum FLOXANT in Regensburg anders wirkt als ein Standardanbieter"
        subtitle="Die Startseite zeigt jetzt die Themen, nach denen Kunden wirklich entscheiden: Region, Verfuegbarkeit, Fotos, Budget, kombinierte Services und ein ruhiger Premium-Pfad fuer sensible Projekte."
        source="homepage_local_authority_modules"
      />

      <section className="flox-section content-auto pt-0">
        <div className="flox-shell">
          <div className="flox-panel rounded-[2rem] px-6 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flox-kicker">Maps und lokale Suche</div>
                <h2 className="mt-3 flox-title-lg flox-display-section max-w-[16ch] text-slate-950">
                  Die stärksten direkten Regensburg- und Bayern-Pfade auf einen Blick
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Diese Seiten decken die konkreten Suchintentionen ab, die für lokale Dienstleister
                  besonders wertvoll sind: Umzug, Reinigung, Entrümpelung, Büroumzug und Einlagerung.
                </p>
              </div>
              <Link href="/standorte" className="flox-button-secondary px-6">
                Alle Standorte
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {BAVARIA_DIRECT_DEMAND_LINKS.slice(0, 8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.45rem] border border-slate-200 bg-white px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Lokalpfad
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
      <section id="geschaeftsmodell" className="flox-section content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Geschäftsmodell klar erklärt</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[15ch] text-slate-950">
              FLOXANT ist nicht der billigste Helfer. FLOXANT ist geordnete Service-Führung.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Für Kunden heißt das: weniger Schnittstellen, klarere Verantwortung, realistischere
              Kalkulation und deutlich bessere Vorbereitung für den Einsatztag.
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
              <Link href="/praxisfaelle" className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800">
                Praxisfälle ansehen
              </Link>
              <Link href="/anbieter-vergleichen" className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800">
                Anbieter fair vergleichen
              </Link>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {content.businessModelPillars.map((item) => (
              <article key={item.title} className="flox-panel rounded-[1.7rem] p-6">
                <h3 className="text-[1.18rem] font-bold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="preis" className="flox-section content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.03fr_0.97fr]">
          <article className="flox-panel-dark rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Sofortiger Einstieg</div>
            <h2 className="mt-6 max-w-[15ch] text-[clamp(2rem,4vw,3.4rem)] font-bold flox-display-section text-white">
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
                    className="rounded-[1.3rem] border border-white/10 bg-white/6 px-4 py-4 transition hover:border-cyan-300/30 hover:bg-white/8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] bg-white/8 text-cyan-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 text-slate-400" />
                    </div>
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                      {item.label}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                  </Link>
                );
              })}
            </div>
          </article>

          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
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
      <section id="ablauf" className="flox-section content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-2">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
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

          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
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
                <div key={item} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── REGION + FAQ ──────────────────────────────────────── */}
      <TrustFlowSection sectionId="vertrauen" />
      <LocalSeoSignalPanel sectionId="lokales-signal" />

      <section id="region" className="flox-section content-auto pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Region</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Regensburg ist der Kern. Bayern bleibt das klare Einsatzgebiet.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Diese Klarheit hilft Kunden und Suchmaschinen gleichermaßen, FLOXANT als
              lokales Service-System mit echter operativer Basis zu verstehen.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.regionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </article>

          <div className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">FAQ</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Häufige Fragen zu Anfrage, Preis und Einsatzgebiet.
            </h2>
            <div className="mt-6 grid gap-3">
              {content.faqItems.map((item, index) => (
                <details
                  key={item.q}
                  className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4"
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
      <section id="kontakt" className="flox-section content-auto pt-0">
        <div className="flox-shell">
          <div className="flox-panel-dark rounded-[2.4rem] px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Direkt anfragen</div>
                <h2 className="mt-6 max-w-[15ch] text-[clamp(2.2rem,4vw,4rem)] font-bold flox-display-hero text-white">
                  Der nächste Schritt soll sich klar anfühlen, nicht billig.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  Wenn Sie schon wissen, was ansteht, schildern Sie den Fall direkt über die Buchung.
                  Wenn Sie erst ein Preisgefühl brauchen, nutzen Sie den Rechner. Wenn Timing, Schlüssel,
                  Reinigung oder Übergabe drängen, hilft eine kurze, konkrete Beschreibung am meisten.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/buchung" className="flox-button-primary min-h-[5.6rem] rounded-[1.4rem] px-5 text-left normal-case tracking-normal">
                  <span className="w-full">
                    <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/74">
                      Hauptpfad
                    </span>
                    <span className="mt-2 block text-xl font-black tracking-tight">Fall schildern</span>
                  </span>
                </Link>
                <Link href="/rechner" className="flox-button-secondary min-h-[5.6rem] rounded-[1.4rem] border-white/12 bg-white/6 px-5 text-left normal-case tracking-normal text-white">
                  <span className="w-full">
                    <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                      Einschätzung
                    </span>
                    <span className="mt-2 block text-xl font-black tracking-tight">Kosten einschätzen</span>
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
