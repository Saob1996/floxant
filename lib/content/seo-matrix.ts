import { prioritySeoMatrix } from "@/lib/content/seo-meta-registry";
import { englishLocalSeoSeoMatrix } from "@/lib/local-seo/englishLocalSeoPages";

export type CentralSeoMatrixEntry = {
  route: string;
  shortTitle: string;
  longTitle: string;
  activeTitle: string;
  metaDescription: string;
  h1: string;
  ogTitle: string;
  ogDescription: string;
};

const roundTwoEntries: readonly CentralSeoMatrixEntry[] = [
  {
    route: "/regensburg/reinigung",
    shortTitle: "Reinigung Regensburg",
    longTitle: "Reinigung Regensburg für Wohnung, Büro und Übergabe",
    activeTitle: "Reinigung Regensburg | Objekt & Umfang anfragen | FLOXANT",
    metaDescription: "Reinigung in Regensburg für Wohnung, Büro, Praxis, Treppenhaus oder Übergabe anfragen. Objektart, Fläche, Zustand, Zugang und Termin senden.",
    h1: "Reinigung in Regensburg passend zu Objekt und Umfang anfragen",
    ogTitle: "Reinigung Regensburg mit klaren Eckdaten anfragen",
    ogDescription: "Objektart, Fläche, Zustand, Zugang, Termin und gewünschtes Ergebnis für eine passende Reinigungsanfrage senden.",
  },
  {
    route: "/regensburg/reinigung-nach-umzug",
    shortTitle: "Reinigung nach Umzug",
    longTitle: "Reinigung nach Umzug in Regensburg für Endreinigung und Übergabe",
    activeTitle: "Reinigung nach Umzug Regensburg | Übergabe vorbereiten",
    metaDescription: "End- und Übergabereinigung nach dem Umzug in Regensburg anfragen: Räume, Zustand, Restpunkte, Fotos, Zugang und Übergabetermin senden.",
    h1: "Reinigung nach dem Umzug in Regensburg klar vorbereiten",
    ogTitle: "End- und Übergabereinigung nach Umzug in Regensburg",
    ogDescription: "Räume, Zustand, Restpunkte, Zugang und Übergabetermin in einer Anfrage zusammenfassen.",
  },
  {
    route: "/pv-anlagen-reinigung",
    shortTitle: "PV-Reinigung",
    longTitle: "PV-Anlagen-Reinigung mit Dach-, Zugang- und Anlagendaten anfragen",
    activeTitle: "PV-Anlagen-Reinigung | Zugang & Umfang prüfen | FLOXANT",
    metaDescription: "PV-Anlagen-Reinigung mit Anlagenart, Modulfläche, Dachform, Zugang, sichtbarem Zustand, Fotos und gewünschtem Zeitraum anfragen.",
    h1: "PV-Anlagen-Reinigung anhand von Anlage und Zugang prüfen",
    ogTitle: "PV-Anlagen-Reinigung mit klaren Anlagendaten",
    ogDescription: "Modulfläche, Dachform, Zugang, sichtbaren Zustand, Fotos und Zeitraum für eine realistische Prüfung senden.",
  },
  {
    route: "/leerfahrt-rueckfahrt",
    shortTitle: "Leerfahrt & Rückfahrt",
    longTitle: "Leerfahrt, Rückfahrt und Beiladung nach Route und Kapazität prüfen",
    activeTitle: "Leerfahrt & Rückfahrt prüfen | Route, Ladung, Zeitfenster",
    metaDescription: "Leerfahrt, Rückfahrt oder Beiladung mit Start, Ziel, Zeitfenster, Transportgut, Volumen, Zugang und Fotos unverbindlich prüfen lassen.",
    h1: "Leerfahrt, Rückfahrt und Beiladung mit klaren Eckdaten prüfen",
    ogTitle: "Leerfahrt und Rückfahrt nach Route und Ladung prüfen",
    ogDescription: "Start, Ziel, Zeitfenster, Transportgut, Volumen und Zugang für einen möglichen Kapazitätsabgleich senden.",
  },
  {
    route: "/angebot-guenstiger-pruefen",
    shortTitle: "Angebot prüfen",
    longTitle: "Vorhandenes Angebot auf Umfang, Annahmen und Zusatzpositionen prüfen",
    activeTitle: "Angebot prüfen | Umfang & Zusatzkosten verstehen | FLOXANT",
    metaDescription: "Vorhandenes Serviceangebot sachlich prüfen lassen: Leistungsumfang, Annahmen, Zugang, Termin, Zusatzpositionen und offene Fragen verständlich einordnen.",
    h1: "Vorhandenes Angebot sachlich und nachvollziehbar prüfen",
    ogTitle: "Angebotsprüfung für Umfang, Annahmen und Zusatzpositionen",
    ogDescription: "Vorhandenes Angebot und Projektdaten senden und offene Punkte vor einer Entscheidung sichtbar machen.",
  },
  {
    route: "/signature-services",
    shortTitle: "Signature Services",
    longTitle: "FLOXANT Signature Services für Angebot, Objekt, Übergabe und Plan B",
    activeTitle: "FLOXANT Signature Services & Speziallösungen",
    metaDescription: "Angebotsprüfung, Objektbrief, Übergabe, Plan B, diskrete Situationen und kombinierte Leistungen mit den nötigen Angaben vorbereiten.",
    h1: "Strukturierte Anfragewege für besondere Servicesituationen",
    ogTitle: "FLOXANT Signature Services und Speziallösungen",
    ogDescription: "Angebot, Objektangaben, Übergabe, Plan B und sensible Situationen mit passenden Angaben vorbereiten.",
  },
  {
    route: "/kontakt",
    shortTitle: "Anfrage",
    longTitle: "Leistung mit Standort, Umfang, Dateien und Kontaktweg anfragen",
    activeTitle: "Leistung unverbindlich anfragen | FLOXANT",
    metaDescription: "Standort und Leistung wählen, passende Eckdaten und Dateien ergänzen und bevorzugten Kontaktweg festlegen.",
    h1: "Ihre Leistung in drei Schritten unverbindlich anfragen",
    ogTitle: "FLOXANT Anfrage in drei klaren Schritten",
    ogDescription: "Leistung wählen, Eckdaten ergänzen und Kontaktweg bestätigen.",
  },
  {
    route: "/en/signature-services",
    shortTitle: "Signature services",
    longTitle: "FLOXANT signature services for quotes, properties, handovers and backup plans",
    activeTitle: "FLOXANT Signature and Special Solutions",
    metaDescription: "Structured request paths for quote checks, property briefs, handovers, backup planning, discreet enquiries and combined services.",
    h1: "Structured request paths for situations beyond a standard service form",
    ogTitle: "FLOXANT Signature and Special Solutions",
    ogDescription: "Prepare quote, property, handover, backup and discreet requests with the details needed for a realistic assessment.",
  },
] as const;

export const centralSeoMatrix: readonly CentralSeoMatrixEntry[] = [
  ...prioritySeoMatrix,
  ...roundTwoEntries,
  ...englishLocalSeoSeoMatrix,
];

const matrixByRoute = new Map(centralSeoMatrix.map((entry) => [entry.route, entry]));

export function getCentralSeoEntry(route: string): CentralSeoMatrixEntry {
  const entry = matrixByRoute.get(route);
  if (!entry) throw new Error(`Missing central SEO matrix entry for ${route}`);
  return entry;
}
