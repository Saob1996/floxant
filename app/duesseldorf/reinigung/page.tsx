import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Home,
  Languages,
  MapPin,
  MessageCircle,
  Sparkles,
  Building,
} from "lucide-react";

import { DuesseldorfCleaningCalculator } from "@/components/duesseldorf/DuesseldorfCleaningCalculator";
import { DuesseldorfCleaningBuyerJourney } from "@/components/duesseldorf/DuesseldorfCleaningBuyerJourney";
import { DuesseldorfCleaningConversionLift } from "@/components/duesseldorf/DuesseldorfCleaningConversionLift";
import { DuesseldorfCleaningDecisionGuide } from "@/components/duesseldorf/DuesseldorfCleaningDecisionGuide";
import { FloxantNextStepPanel } from "@/components/FloxantNextStepPanel";
import { FloxantStorytellingSection } from "@/components/FloxantStorytellingSection";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { AiServiceRecommendationPanel } from "@/components/seo/AiServiceRecommendationPanel";
import { SearchDominanceExperience } from "@/components/seo/SearchDominanceExperience";
import { SearchIntentExpansion } from "@/components/seo/SearchIntentExpansion";
import { SignatureServices } from "@/components/SignatureServices";
import { buildFaqJsonLd } from "@/lib/structured-data";
import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_AI_RECOMMENDATIONS,
  DUESSELDORF_CLEANING_CLICK_INTENTS,
  DUESSELDORF_CLEANING_CONVERSION_TRUST_ITEMS,
  DUESSELDORF_CLEANING_CUSTOMER_PATHS,
  DUESSELDORF_CLEANING_REQUEST_FIELDS,
  DUESSELDORF_CLEANING_SERVICES,
  DUESSELDORF_CLEANING_SNIPPET_ANSWERS,
  DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  buildDuesseldorfCleaningMetadata,
  buildDuesseldorfCleaningSchema,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";
import { getDuesseldorfCleaningInternationalAliases } from "@/lib/search-intent-aliases";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/reinigung",
    title: "Reinigungsfirma Düsseldorf | Putzfirma, Büro & Grundreinigung | FLOXANT",
    description:
      "Putzfirma und Reinigungsfirma in Düsseldorf für Wohnung, Büro, Praxis, Grundreinigung, Treppenhaus und Gewerbeflächen. Stadtteil, Fläche, Fotos und Termin senden.",
  });
}

const trustLine = [
  "Breite Str. 22, 40213 Düsseldorf",
  "Wohnung, Büro, Hotel & Übergabe",
  "Fotos beschleunigen die Einschätzung",
  "Stadtteil oder PLZ genügt zum Start",
  "WhatsApp, Telefon oder Formular",
  "Budget ehrlich prüfen",
];
const duesseldorfBookingHref = "/buchung?service=reinigung&region=duesseldorf#buchungssystem";

const mobileDecisionShortcuts = [
  { href: "#anfrage-checkliste", label: "Senden", note: "Angaben" },
  { href: "#stadtteil-schnellcheck", label: "Stadtteil", note: "Ort prüfen" },
  { href: "#preisvorschlag", label: "Kosten", note: "Budget nennen" },
  { href: "#kontakt", label: "Kontakt", note: "Fotos senden" },
] as const;

const heroHighlights = [
  {
    label: "Klarer Umfang",
    title: "Erst klären, dann sauber planen",
    text: "Wohnung, Büro, Hotel oder Treppenhaus haben unterschiedliche Ziele. Wir prüfen Fläche, Zustand, Fotos und Termin, bevor ein Auftrag bestätigt wird.",
  },
  {
    label: "Schnelle Einschätzung",
    title: "Direkter Kontakt ohne Umwege",
    text: "Sie schicken Stadtteil, Fläche, Zustand, Terminwunsch und Fotos. Daraus entsteht eine schnelle, realistische Rückmeldung statt einer pauschalen Zusage.",
  },
  {
    label: "Preisrahmen",
    title: "Budget nennen, Machbarkeit prüfen",
    text: "Wenn Sie einen festen Preisrahmen haben, sagen Sie ihn direkt. Wir ordnen ein, welcher Umfang dafür realistisch ist und wo Grenzen liegen.",
  },
  {
    label: "Düsseldorf Umgebung",
    title: "Stadtteile und nahe Orte sauber einordnen",
    text: "Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, MedienHafen sowie Neuss, Ratingen, Meerbusch, Mettmann und Duisburg werden nach Objekt, Zugang und Termin geprüft.",
  },
];

const focusCards = [
  {
    title: "Wohnungsreinigung, wenn der Zustand wieder stimmen muss",
    text: "Ob nach Auszug, vor Einzug oder vor einer Übergabe: Bei Wohnungen zählt nicht nur der sichtbare Eindruck. Küche, Bad, Böden, Fensterbereiche und schwer zugängliche Stellen entscheiden oft darüber, ob eine Reinigung als wirklich sauber wahrgenommen wird.",
  },
  {
    title: "Büroreinigung ohne unnötige Reibung",
    text: "Ein Büro soll sauber sein, ohne den Betrieb zu stören. Deshalb prüfen wir Terminfenster, Flächen, Turnus und besondere Anforderungen vorab. So entsteht keine theoretische Reinigung, sondern ein Ablauf, der zum Arbeitsalltag passt.",
  },
  {
    title: "Reinigung vor Übergabe: Der letzte Eindruck zählt",
    text: "Vor einer Wohnungs- oder Objektübergabe wird Reinigung anders bewertet. Kleine Rückstände, vergessene Bereiche oder Zeitdruck können schnell zum Problem werden. Wir helfen, die Reinigung sauber vorzubereiten und realistisch zu planen.",
  },
];

const leadQuickAnswers = [
  {
    Icon: ClipboardCheck,
    title: "Was kostet Reinigung in Düsseldorf?",
    text: "Ein realistischer Preis entsteht aus Fläche, Zustand, Zugang, Termin und gewünschtem Ergebnis. Fotos und ein Budget helfen bei der schnellen Einordnung.",
  },
  {
    Icon: Sparkles,
    title: "Wie bekomme ich schnell Rückmeldung?",
    text: "Stadtteil, Quadratmeter, Reinigungsart, Terminwunsch und Fotos senden. Dann kann FLOXANT prüfen, ob der Einsatz machbar ist.",
  },
  {
    Icon: MapPin,
    title: "Welche Orte werden geprüft?",
    text: "Düsseldorf mit Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, MedienHafen sowie Neuss, Ratingen, Meerbusch und Umgebung.",
  },
  {
    Icon: Building2,
    title: "Gibt es Umzug in Düsseldorf?",
    text: "Nein. Düsseldorf bleibt klar bei Reinigung und Entsorgung. Dadurch ist die Anfrage sauber getrennt und leichter verständlich.",
  },
] as const;

const instantDecisionCards = [
  {
    Icon: ClipboardCheck,
    title: "Kosten einschätzen",
    text: "Budget nennen, Fläche und Zustand beschreiben und eine ehrliche Rückmeldung bekommen.",
    href: "#preisvorschlag",
    cta: "Budget nennen",
  },
  {
    Icon: Clock3,
    title: "Heute oder morgen",
    text: "Wenn der Termin drückt, zählen Fotos, Stadtteil, Schlüsselzugang und klare Prioritäten.",
    href: "/duesseldorf/kurzfristige-reinigung",
    cta: "Machbarkeit prüfen",
  },
  {
    Icon: MessageCircle,
    title: "Nicht vor Ort",
    text: "Schlüsselweg, Berechtigung, Ansprechpartner und Rückmeldung vorab sauber klären.",
    href: "/duesseldorf/schluesseluebergabe-reinigung",
    cta: "Schlüsselweg klären",
  },
  {
    Icon: Building,
    title: "Hausverwaltung",
    text: "Eingang, Treppenhaus, Kellerflur, Turnus und Beschwerden strukturiert anfragen.",
    href: "/duesseldorf/hausverwaltung-reinigung",
    cta: "Objekt planen",
  },
  {
    Icon: Home,
    title: "Wohnung oder Übergabe",
    text: "Für Auszug, Einzug, Bad, Küche, Böden, Fensterbereiche, Schlüsselübergabe und schnelle Terminfragen.",
    href: "/duesseldorf/wohnungsreinigung",
    cta: "Wohnung prüfen",
  },
  {
    Icon: Building2,
    title: "Büro, Hotel oder Firma",
    text: "Fläche, Turnus, Zeitfenster, Zugang und Ansprechpartner direkt passend senden.",
    href: "/duesseldorf/bueroreinigung",
    cta: "Firmenfläche prüfen",
  },
  {
    Icon: Sparkles,
    title: "Angebot liegt schon vor",
    text: "Angebot, Screenshot oder Preis senden und eine mögliche Alternative prüfen lassen.",
    href: "/duesseldorf/vielleicht-guenstiger",
    cta: "Angebot prüfen",
  },
] as const;

const districtIntentCards = [
  {
    title: "Altstadt, Stadtmitte und Carlstadt",
    text: "Für Büros, Kanzleien, Wohnungen, Hotels und Übergaben in zentralen Lagen zählen Lieferzone, Etage, Aufzug, Parkmöglichkeit und Zeitfenster besonders stark.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Pempelfort, Derendorf und Golzheim",
    text: "Geeignet für Büroreinigung, Praxisflächen nach Absprache, Kanzleireinigung, Treppenhausreinigung und gepflegte Wohnungsreinigung mit klarem Turnus.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Bilk, Unterbilk und MedienHafen",
    text: "Hier treffen Wohnungen, Apartments, Agenturen, Studios, Hotels und Firmenflächen aufeinander. Fotos und Objektart helfen bei der schnellen Zuordnung.",
    href: "/reinigung-moeblierte-wohnung-duesseldorf",
  },
  {
    title: "Oberkassel, Heerdt und Lörick",
    text: "Für Wohnungen, möblierte Apartments, kleinere Firmenflächen und Endreinigung vor Übergabe werden Zustand, Zugang und Termin realistisch geprüft.",
    href: "/duesseldorf/wohnungsreinigung",
  },
  {
    title: "Benrath, Eller und Gerresheim",
    text: "Für Wohnungsreinigung, Grundreinigung, Treppenhaus, Keller oder Entsorgung ist wichtig, ob Zugang, Laufweg und Fotos bereits klar sind.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Neuss, Ratingen und Meerbusch",
    text: "Anfragen aus der nahen Umgebung werden nach Ort, Objektart, Anfahrt, Terminfenster, Umfang und Kapazität geprüft.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
] as const;

const requestChecklist = DUESSELDORF_CLEANING_REQUEST_FIELDS;

const customerSearchPhraseCards = [
  {
    title: "Reinigungsfirma in meiner Nähe",
    text: "Wer nach Reinigung in der Nähe sucht, braucht zuerst eine schnelle Ortsprüfung. Stadtteil oder PLZ, Objektart, Zugang, Termin und Fotos machen die Rückmeldung deutlich konkreter.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Grundreinigung in Düsseldorf",
    text: "Wenn normale Reinigung nicht reicht, zählen Zustand und Details: Küche, Bad, Böden, Ecken, Fensterbereiche und stärkere Verschmutzung mit Fotos, Fläche und Termin einordnen.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Putzfirma Düsseldorf für Wohnung",
    text: "Viele Kunden sagen Putzfirma oder Putzservice, meinen aber eine klare Wohnungsreinigung: Fläche, Zustand, Küche, Bad, Böden, Termin und Fotos werden vorab geprüft.",
    href: "/duesseldorf/putzfirma",
  },
  {
    title: "Reinigungsfirma Düsseldorf Privathaushalt",
    text: "Für Wohnungen, Apartments und private Übergaben helfen klare Angaben zu Räumen, Bad, Küche, Böden, Zugang, Termin und gewünschtem Ergebnis.",
    href: "/duesseldorf/wohnungsreinigung",
  },
  {
    title: "Reinigung Kosten Düsseldorf",
    text: "Die Kosten hängen von Quadratmetern, Verschmutzung, Zugang, Zeitfenster und gewünschtem Ergebnis ab. Ein Preisrahmen hilft, die Machbarkeit schnell einzuordnen.",
    href: "/duesseldorf/reinigung#preisvorschlag",
  },
  {
    title: "Büroreinigung Angebot Düsseldorf",
    text: "Für Büros, Kanzleien, Studios und kleine Firmen zählen Fläche, Turnus, Zeitfenster, Schlüssel- oder Zugangsklärung und ein Ansprechpartner vor Ort.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Büro- und Praxisreinigung",
    text: "Für Büro, Kanzlei und allgemeine Praxisflächen werden Raumliste, Turnus, Zeitfenster, Sanitär, Empfang, Zugang und Ansprechpartner vorab geklärt.",
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Praxisreinigung Düsseldorf",
    text: "Für Empfang, Wartebereich, Personalräume und Sanitärflächen zählt ein ruhiger Ablauf mit klaren Grenzen. Praxisart, Fläche, Öffnungszeiten, Zugang und Fotos helfen bei der Prüfung.",
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Wohnungsreinigung Düsseldorf",
    text: "Wenn eine Wohnung wieder sauber wirken soll, werden Küche, Bad, Böden, Fensterbereiche, Zustand, Termin und gewünschtes Ergebnis vorab eingeordnet.",
    href: "/duesseldorf/wohnungsreinigung",
  },
  {
    title: "Hotelreinigung Düsseldorf",
    text: "Für Hotel, Boardinghouse oder Apartmenthaus werden Lobby, Flure, Gästebereiche, Sanitär, Zeitfenster und Kapazität nach Objektangaben geprüft.",
    href: "/duesseldorf/hotelreinigung",
  },
  {
    title: "Grundreinigung Düsseldorf",
    text: "Bei stärkerer Verschmutzung, Leerstand oder Objektwechsel entscheidet der Zustand. Fotos von Küche, Bad, Boden und Problemstellen machen die Einschätzung schneller.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Büro putzen Düsseldorf",
    text: "Ob Einzelbüro, Agentur oder kleine Firmenfläche: wichtig sind Raumgröße, Arbeitszeiten, Sanitär, Küche, Schlüsselweg und ein sauberer Starttermin.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Praxisreinigung Neuss",
    text: "Anfragen aus Neuss und naher Umgebung werden nach Fläche, Nutzung, Terminfenster, Zugang und gewünschtem Reinigungsumfang geprüft.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Reinigungskraft Büro Düsseldorf",
    text: "Viele Firmen suchen nach einer Person, brauchen aber einen verlässlichen Ablauf: Raumliste, Randzeit, Schlüsselweg, Ansprechpartner, Fotos und klarer Turnus.",
    href: "/duesseldorf/reinigungskraft-buero",
  },
  {
    title: "Gewerbeflächen reinigen",
    text: "Bei Laden, Showroom, Lager, Büro oder gemischter Fläche entscheidet der richtige Umfang: Boden, Glas, Sanitär, Laufwege, Öffnungszeiten und Turnus.",
    href: "/duesseldorf/gewerbereinigung",
  },
  {
    title: "Gebäudereinigung Düsseldorf Pempelfort",
    text: "Für Pempelfort und zentrale Stadtteile werden Objektart, Etagen, Zugang, Eingänge, Treppenhaus, Büro- oder Wohnflächen und Terminfenster eingeordnet.",
    href: "/duesseldorf/gebaeudereinigung",
  },
  {
    title: "Putzservice mit Fotos anfragen",
    text: "Fotos sparen Rückfragen. Sie zeigen Zustand, Laufwege, Küche, Bad, Boden, Treppenhaus oder Keller und machen eine ehrliche Einschätzung schneller möglich.",
    href: "/duesseldorf/reinigung#kontakt",
  },
  {
    title: "Reinigung heute Düsseldorf",
    text: "Wenn es wirklich schnell gehen muss, entscheiden Deadline, Stadtteil, Fotos, Zugang und Prioritäten. FLOXANT prüft erst die Machbarkeit, bevor Erwartungen entstehen.",
    href: "/duesseldorf/kurzfristige-reinigung",
  },
  {
    title: "Kurzfristige Reinigung Düsseldorf",
    text: "Wenn ein Termin näher rückt, zählt Klarheit: Stadtteil, Fläche, Schlüsselzugang, Zustand und Fotos direkt mitsenden. Eine Zusage gibt es erst nach Machbarkeitsprüfung.",
    href: "/duesseldorf/kurzfristige-reinigung",
  },
  {
    title: "Putzfirma in meiner Nähe Düsseldorf",
    text: "Für Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel und nahe Orte hilft zuerst die lokale Einordnung: PLZ, Zugang, Etage und Fotos.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Hausverwaltung Reinigung Düsseldorf",
    text: "Wenn Eingang, Treppenhaus, Kellerflur oder Müllbereich Beschwerden auslösen, helfen Bereichsliste, Turnus, Schlüsselweg, Fotos und Ansprechpartner.",
    href: "/duesseldorf/hausverwaltung-reinigung",
  },
  {
    title: "WEG Reinigung Düsseldorf",
    text: "Eigentümer und Verwaltungen brauchen keine vagen Zusagen, sondern klare Bereiche, Turnus, Zugang, Fotostand und Grenzen zu Hausmeisterdienst.",
    href: "/duesseldorf/hausverwaltung-reinigung",
  },
  {
    title: "Reinigung mit Schlüsselübergabe",
    text: "Wenn Sie nicht vor Ort sein können, braucht die Reinigung einen klaren Schlüsselweg: Zugang, Berechtigung, Fotos, Deadline und Rückmeldung.",
    href: "/duesseldorf/schluesseluebergabe-reinigung",
  },
  {
    title: "Reinigung nicht vor Ort Düsseldorf",
    text: "Für Auszug, Besichtigung oder Einzug aus der Ferne sind Schlüssel, Berechtigung, Ansprechpartner und Rückmeldung wichtiger als ein allgemeiner Preis.",
    href: "/duesseldorf/schluesseluebergabe-reinigung",
  },
  {
    title: "Reinigung nach Auszug oder Übergabe",
    text: "Bei Übergabe, Einzug oder Auszug werden kleine Rückstände schnell sichtbar. FLOXANT prüft, welcher Reinigungsumfang realistisch zum Termin passt.",
    href: "/duesseldorf/endreinigung",
  },
  {
    title: "Treppenhausreinigung für Hausverwaltung",
    text: "Hausverwaltungen und Eigentümer brauchen klare Angaben zu Etagen, Eingangsbereich, Turnus, Schlüssel, Laufwegen und gewünschtem Eindruck.",
    href: "/duesseldorf/treppenhausreinigung",
  },
  {
    title: "Reinigungsdienst für Treppenhäuser Düsseldorf",
    text: "Für Treppenhaus, Eingänge, Kellerflur und Müllbereich helfen Fotos, Etagenzahl, Turnus, Schlüsselweg und eine klare Liste der wiederkehrenden Aufgaben.",
    href: "/duesseldorf/treppenhausreinigung",
  },
  {
    title: "Reinigungsfirma Angebot prüfen",
    text: "Wenn bereits ein Angebot vorliegt, können Preis, Umfang, Turnus, Zusatzpunkte und mögliche Alternative mit Fotos und Objektangaben besser eingeordnet werden.",
    href: "/duesseldorf/vielleicht-guenstiger",
  },
  {
    title: "Reinigungsbetrieb Düsseldorf",
    text: "Wer nach Reinigungsbetrieb, Reinigungsunternehmen oder Reinigungsdienst sucht, kann direkt Objektart, Stadtteil, Fläche, Termin und Fotos senden. FLOXANT ordnet die passende Reinigungsseite zu.",
    href: "/duesseldorf/reinigung",
  },
  {
    title: "Reinigungsfirma Düsseldorf in der Nähe",
    text: "Für Nähe-Suchen zählen Stadtteil oder PLZ, Objektart, Zugang, Fotos und Termin mehr als ein allgemeiner Begriff. FLOXANT prüft Düsseldorf und nahe Orte sauber nach Machbarkeit.",
    href: "/blog/reinigungsfirma-duesseldorf-in-der-naehe-stadtteile",
  },
  {
    title: "Reinigungsunternehmen vergleichen",
    text: "Wenn mehrere Angebote vorliegen, sollten Umfang, Turnus, Zeitfenster, Zusatzpunkte und Fotos vergleichbar sein. Erst dann wird der Preis wirklich verständlich.",
    href: "/blog/reinigungsunternehmen-duesseldorf-anbieter-vergleichen",
  },
  {
    title: "Büroreinigung Reinigungsfirma Düsseldorf",
    text: "Für Büro, Agentur, Kanzlei, kleine Firma oder Praxisfläche werden Raumliste, Turnus, Sanitär, Küche, Zeitfenster und Zugang konkret geprüft.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Büro reinigen Düsseldorf",
    text: "Für Büro reinigen, Büroreinigung Preise oder ein vorhandenes Büroreinigungsangebot zählen Raumliste, Sanitär, Küche, Turnus, Zeitfenster und Zugang.",
    href: "/blog/buero-reinigen-duesseldorf-bueroreinigung-angebot",
  },
  {
    title: "Bodenreinigung Düsseldorf",
    text: "Bei Bodenreinigung zählen Material, Laufspuren, Verschmutzung, Fläche, Möbelstand, Fotos und ob normale Reinigung oder Grundreinigung passender ist.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Reinigung Hauseingang Düsseldorf",
    text: "Hauseingang, Treppenhaus, Flur und Kellerbereich brauchen klare Angaben zu Etagen, Turnus, Schlüsselweg, Fotos und Ansprechpartner.",
    href: "/duesseldorf/treppenhausreinigung",
  },
  {
    title: "Treppenhausreinigungen Düsseldorf",
    text: "Für Hausverwaltung, WEG, Eingang, Etagen, Kellerflur und Müllbereich helfen Turnus, Fotos, Schlüsselweg und klare Bereichsliste.",
    href: "/blog/treppenhausreinigungen-duesseldorf-hauseingang-hausverwaltung",
  },
  {
    title: "Veranstaltungsreinigung Düsseldorf",
    text: "Nach Veranstaltung, Empfang, Praxisabend oder Firmenfeier sind Fläche, Müll, Sanitär, Boden, Deadline und nächste Nutzung wichtig.",
    href: "/duesseldorf/sonderreinigung",
  },
  {
    title: "Professionelle Wohnungsreinigung Düsseldorf",
    text: "Für Auszug, Einzug, möblierte Wohnung oder Übergabe werden Küche, Bad, Böden, Fensterbereiche, Zustand, Termin und Schlüsselzugang geprüft.",
    href: "/duesseldorf/wohnungsreinigung",
  },
  {
    title: "Reinigungsfirma Düsseldorf Preise",
    text: "Preise werden realistischer, wenn Fläche, Zustand, Objektart, Turnus, Zugang und Fotos vorliegen. Ein vorhandenes Angebot kann separat eingeordnet werden.",
    href: "/duesseldorf/vielleicht-guenstiger",
  },
  {
    title: "Reinigungsfirma Düsseldorf Kosten",
    text: "Kosten sind erst vergleichbar, wenn Fläche, Zustand, Objektart, Turnus, Zugang, Fotos und gewünschtes Ergebnis zusammen vorliegen.",
    href: "/blog/reinigungsfirma-duesseldorf-preise-kosten-angebot-pruefen",
  },
  {
    title: "Gewerbeobjekt Reinigung",
    text: "Bei Gewerbeobjekten geht es um Büro, Eingang, Sanitär, Flure, Verkaufsfläche, Turnus, Zeitfenster und Ansprechpartner statt um einen pauschalen Blindpreis.",
    href: "/duesseldorf/objektreinigung",
  },
] as const;

const serviceIcons = [Home, Building2, Sparkles, Building, ClipboardCheck, CheckCircle2];
const snippetAnswerIcons = [ClipboardCheck, Sparkles, MapPin, CheckCircle2];
const clickIntentIcons = [MapPin, Clock3, BadgeEuro, Camera, MessageCircle];
const internationalSearchAliases = getDuesseldorfCleaningInternationalAliases();
const internationalLanguageLabels = {
  en: "English",
  ru: "Русский",
  zh: "中文",
  ko: "한국어",
} as const;

const faqs = [
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. In Düsseldorf liegt der Fokus auf Reinigung und separat auf Entsorgung. Umzugsleistungen werden dort nicht als lokaler Hauptservice beworben.",
  },
  {
    q: "Kann ich bei FLOXANT Reinigung Düsseldorf ein eigenes Budget nennen?",
    a: "Ja. Sie können uns Ihren Preisrahmen direkt mitteilen. Wir ordnen dann ehrlich ein, ob der Auftrag dafür machbar ist, welcher Umfang möglich wäre oder ob der Aufwand realistisch höher liegt.",
  },
  {
    q: "Ist der Preisvorschlag automatisch verbindlich?",
    a: "Nein. Ein Budget oder Preisvorschlag ist zunächst eine Orientierung. Verbindlich wird ein Auftrag erst, wenn Umfang, Zustand, Termin und Leistung klar eingeordnet und bestätigt wurden.",
  },
  {
    q: "Kann FLOXANT kurzfristige Reinigung in Düsseldorf heute oder morgen prüfen?",
    a: "Ja, nach Kapazität und nur mit klaren Eckdaten: Stadtteil, Objektart, Fläche, Fotos, Zugang, Deadline und Prioritäten. Eine 24/7-Sofortgarantie wird nicht versprochen.",
  },
  {
    q: "Kann die Reinigung organisiert werden, wenn ich nicht vor Ort bin?",
    a: "Das kann geprüft werden, wenn Schlüsselweg, Berechtigung, Ansprechpartner, Fotos, Termin und Rückmeldung vorher eindeutig geklärt sind.",
  },
  {
    q: "Welche Angaben braucht eine Hausverwaltung für eine Reinigungsanfrage?",
    a: "Hilfreich sind Objektadresse oder Stadtteil, Eingänge, Etagen, Treppenhaus, Kellerflur, Müllbereich, Turnus, Schlüsselweg, Ansprechpartner und Fotos von Beschwerden oder Problemstellen.",
  },
  {
    q: "Welche Informationen helfen für eine schnelle Einschätzung?",
    a: "Hilfreich sind Fläche, Adresse oder Stadtteil, gewünschter Termin, Reinigungsart, Fotos vom Zustand und besondere Bereiche wie Küche, Bad, Fenster oder starke Verschmutzung.",
  },
  {
    q: "Macht FLOXANT Reinigung Düsseldorf auch Übergabereinigung?",
    a: "Ja, je nach Kapazität und Umfang können Reinigungen vor Wohnungs- oder Objektübergaben angefragt werden. Wichtig sind klare Angaben zum Zustand, Termin und gewünschten Ergebnis.",
  },
  {
    q: "Warum nennt FLOXANT nicht sofort einen festen Preis?",
    a: "Weil Reinigung stark vom Zustand, Umfang, Termin und Anspruch abhängt. Ein sofortiger Pauschalpreis ohne Einordnung kann später zu falschen Erwartungen führen. Wir kalkulieren lieber realistisch.",
  },
];

export default function DuesseldorfReinigungPage() {
  const whatsappHeroHref = buildDuesseldorfCleaningWhatsAppHref(
    DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  );
  const baseJsonLd = buildDuesseldorfCleaningSchema({
    path: "/duesseldorf/reinigung",
    title: "Reinigung Düsseldorf für Wohnung, Büro und Endreinigung",
    description:
      "Reinigung in Düsseldorf für Wohnung, Büro, Hotel, Auszug, Übergabe und Firmenflächen nach Stadtteil, Fläche, Fotos, Zustand, Zeitfenster und Budget prüfen lassen.",
    serviceLabel: "Reinigung Düsseldorf",
    relatedLinks: DUESSELDORF_CLEANING_SERVICES,
  });
  const jsonLd = baseJsonLd;
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <main className="px-4 pb-24 pt-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-7xl">
        <section className="duesseldorf-hero rounded-[1rem] border border-white/16 px-6 py-10 text-white shadow-[0_30px_90px_rgba(3,7,18,0.28)] md:px-10 md:py-12">
          <div className="max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
              FLOXANT Reinigung Düsseldorf
            </div>
            <h1 className="duesseldorf-hero-title mt-5 max-w-[17ch] text-[clamp(2.55rem,5.4vw,5rem)] font-bold">
              Reinigungsfirma Düsseldorf für Wohnung, Büro und Endreinigung
            </h1>
            <p className="duesseldorf-hero-copy mt-5 max-w-3xl text-lg">
              Sie suchen eine Putzfirma oder Reinigungsfirma in Düsseldorf und möchten
              ohne langes Hin und Her wissen, ob es passt? Senden Sie Stadtteil oder PLZ,
              Fläche, Zustand, Terminwunsch und Fotos. FLOXANT prüft Wohnungen, Büros,
              Hotels, Übergaben und Firmenflächen klar, kundennah und ohne vermischte
              Umzugsleistung.
            </p>
            <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-[1.05fr_1fr_0.95fr]">
              <a
                href={duesseldorfBookingHref}
                className="flox-readable-cta-light inline-flex min-h-14 items-center justify-center gap-2 rounded-[0.85rem] px-5 py-3 text-sm font-black transition hover:-translate-y-0.5"
                data-event="hero_cta_click"
                data-service="reinigung"
                data-region="duesseldorf"
              >
                Reinigung anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHeroHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[0.85rem] border border-emerald-200/60 bg-emerald-300/18 px-5 py-3 text-sm font-black text-emerald-50 shadow-[0_18px_42px_rgba(16,185,129,0.18)] transition hover:-translate-y-0.5 hover:bg-emerald-300/26"
                data-event="whatsapp_click"
                data-service="reinigung"
                data-region="duesseldorf"
              >
                WhatsApp mit Fotos senden
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#preisvorschlag"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[0.85rem] border border-white/18 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16"
                data-event="form_submit"
                data-service="reinigung"
                data-region="duesseldorf"
              >
                Preisrahmen prüfen
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-slate-300">Passende Zusatzwege:</span>
              <Link
                href="/entsorgung-duesseldorf"
                className="inline-flex min-h-10 items-center justify-center rounded-[0.75rem] border border-white/14 bg-white/8 px-4 text-xs font-bold text-white transition hover:bg-white/12"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                Entsorgung separat
              </Link>
              <Link
                href="/reinigung-moeblierte-wohnung-duesseldorf"
                className="inline-flex min-h-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/35 bg-cyan-300/12 px-4 text-xs font-bold text-cyan-50 transition hover:bg-cyan-300/20"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                Möblierte Wohnung reinigen
              </Link>
              <Link
                href="/duesseldorf/reinigung-stadtteile-umgebung"
                className="inline-flex min-h-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/35 bg-cyan-300/12 px-4 text-xs font-bold text-cyan-50 transition hover:bg-cyan-300/20"
                data-event="region_select"
                data-region="duesseldorf"
              >
                Stadtteile & Umgebung
              </Link>
              <Link
                href="/duesseldorf/vielleicht-guenstiger"
                className="inline-flex min-h-10 items-center justify-center rounded-[0.75rem] border border-emerald-200/35 bg-emerald-300/14 px-4 text-xs font-bold text-emerald-50 transition hover:bg-emerald-300/22"
                data-event="hero_cta_click"
                data-region="duesseldorf"
              >
                Vielleicht günstiger?
              </Link>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Sie haben einen festen Preisrahmen? Nennen Sie uns Ihr Budget, wir ordnen
              ehrlich, ob und in welchem Umfang der Auftrag machbar ist.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustLine.map((item) => (
                <div
                  key={item}
                  className="rounded-[0.75rem] border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold text-white/92"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {heroHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[0.85rem] border border-white/14 bg-white/8 px-4 py-4 shadow-[0_18px_42px_rgba(2,6,23,0.18)] backdrop-blur transition hover:-translate-y-1 hover:border-teal-200/45 hover:bg-white/12"
                >
                  <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
                    {item.label}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold tracking-normal text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <nav
          aria-label="Schnelle Entscheidung für Reinigung Düsseldorf"
          className="mt-3 grid grid-cols-2 gap-2 md:hidden"
        >
          {mobileDecisionShortcuts.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-[0.75rem] border border-slate-200 bg-white px-3 py-3 text-center shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
            >
              <span className="block text-xs font-black text-slate-950">{item.label}</span>
              <span className="mt-1 block text-[10px] font-semibold leading-4 text-slate-600">
                {item.note}
              </span>
            </a>
          ))}
        </nav>

        <DuesseldorfCleaningConversionLift serviceLabel="Reinigung Düsseldorf" />
        <DuesseldorfCleaningBuyerJourney
          serviceLabel="Reinigung Düsseldorf"
          focusHrefs={[
            "/duesseldorf/kurzfristige-reinigung",
            "/duesseldorf/schluesseluebergabe-reinigung",
            "/duesseldorf/hausverwaltung-reinigung",
            "/duesseldorf/wohnungsreinigung",
            "/duesseldorf/endreinigung",
            "/duesseldorf/bueroreinigung",
            "/duesseldorf/unterhaltsreinigung",
            "/duesseldorf/ladenreinigung",
            "/duesseldorf/baureinigung",
            "/duesseldorf/fensterreinigung",
            "/duesseldorf/vielleicht-guenstiger",
          ]}
        />
        <DuesseldorfCleaningDecisionGuide
          serviceLabel="Reinigung Düsseldorf"
          focusHrefs={[
            "/duesseldorf/kurzfristige-reinigung",
            "/duesseldorf/schluesseluebergabe-reinigung",
            "/duesseldorf/hausverwaltung-reinigung",
            "/duesseldorf/vielleicht-guenstiger",
            "/duesseldorf/endreinigung",
            "/duesseldorf/bueroreinigung",
            "/duesseldorf/ladenreinigung",
            "/duesseldorf/sonderreinigung",
          ]}
        />

        <section id="vertrauen-klickgruende" className="pt-6">
          <div className="mb-5 max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Was vor der Anfrage hilft
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
              Je klarer die Lage, desto schneller können wir antworten
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Ein paar Fotos, der Stadtteil, der gewünschte Termin und der Zugang zum
              Objekt reichen oft für den Start. Wenn etwas nicht machbar ist, sagen wir
              das lieber früh als zu spät.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {DUESSELDORF_CLEANING_CONVERSION_TRUST_ITEMS.map((item) => (
              <article
                key={item.title}
                className="rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-lg font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="duesseldorf-sofort-entscheiden" className="pt-6">
          <div className="grid gap-4 rounded-[0.95rem] border border-teal-100 bg-[linear-gradient(135deg,#ffffff_0%,#ecfeff_52%,#f8fafc_100%)] p-4 shadow-[0_18px_44px_rgba(15,118,110,0.08)] lg:grid-cols-[0.7fr_1.3fr] lg:p-5">
            <article className="rounded-[0.75rem] border border-white bg-white/80 p-5">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                Schnell entscheiden
              </div>
              <h2 id="duesseldorf-sofort-entscheiden" className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                Was brauchen Sie gerade?
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Wählen Sie direkt den passenden Weg. So kommen Kunden schneller von der Suche
                zur Anfrage, ohne lange zwischen ähnlichen Leistungen zu vergleichen.
              </p>
            </article>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {instantDecisionCards.map(({ Icon, title, text, href, cta }) => (
                <Link
                  key={title}
                  href={href}
                  className="group rounded-[0.75rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_16px_34px_rgba(15,118,110,0.12)]"
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] bg-slate-950 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-base font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-teal-800">
                    {cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="klick-einstiege" className="pt-6">
          <div className="grid gap-4 rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_20px_56px_rgba(15,23,42,0.07)] lg:grid-cols-[0.7fr_1.3fr] lg:p-6">
            <article className="rounded-[0.85rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                Klicknahe Suchfragen
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                Wenn Kunden schnell entscheiden wollen
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Viele Besucher suchen nicht theoretisch, sondern mit Zeitdruck: in der Nähe,
                heute oder diese Woche, per WhatsApp, mit Fotos oder vor der Übergabe. Diese
                Einstiege führen direkt zur passenden Aktion.
              </p>
            </article>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {DUESSELDORF_CLEANING_CLICK_INTENTS.map((item, index) => {
                const Icon = clickIntentIcons[index % clickIntentIcons.length] || CheckCircle2;
                return (
                  <Link
                    key={item.searchPhrase}
                    href={item.href}
                    className="group rounded-[0.85rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_18px_42px_rgba(15,118,110,0.1)]"
                    data-event="service_card_click"
                    data-region="duesseldorf"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="mt-3 text-[11px] font-black uppercase tracking-normal text-teal-700">
                      {item.searchPhrase}
                    </div>
                    <h3 className="mt-2 text-base font-black leading-snug text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="kurzantworten" className="grid gap-4 pt-6 md:grid-cols-2 xl:grid-cols-4">
          {leadQuickAnswers.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-lg font-black leading-snug text-slate-950">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{text}</p>
            </article>
          ))}
        </section>

        <section id="snippet-antworten" className="pt-8">
          <div className="grid gap-5 rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_22px_62px_rgba(15,23,42,0.08)] lg:grid-cols-[0.78fr_1.22fr] lg:p-7">
            <article className="rounded-[0.9rem] border border-teal-100 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_68%,#f8fafc_100%)] p-5">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-800">
                Vor der Anfrage geklärt
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                Schnelle Antworten für Reinigung in Düsseldorf
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Wer sucht, möchte sofort wissen: Passt FLOXANT für mein Objekt, wie
                schnell bekomme ich Rückmeldung und welche Angaben werden gebraucht?
                Diese Antworten machen die Entscheidung leichter und führen direkt zur
                passenden Anfrage.
              </p>
              <a
                href={whatsappHeroHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.8rem] bg-slate-950 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                data-event="whatsapp_click"
                data-region="duesseldorf"
              >
                Fotos und Eckdaten senden
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
            <div className="grid gap-3 md:grid-cols-2">
              {DUESSELDORF_CLEANING_SNIPPET_ANSWERS.map((item, index) => {
                const Icon = snippetAnswerIcons[index % snippetAnswerIcons.length] || ClipboardCheck;
                return (
                  <Link
                    key={item.query}
                    href={item.href}
                    className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_18px_44px_rgba(15,118,110,0.1)]"
                    data-event="service_card_click"
                    data-region="duesseldorf"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                          {item.query}
                        </div>
                        <h3 className="mt-2 text-base font-black text-slate-950">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="gesuchte-leistungen" className="pt-8">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                Häufig gesucht in Düsseldorf
              </div>
              <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-normal text-slate-950">
                Schnell zur passenden Reinigung statt lange vergleichen
              </h2>
            </div>
            <Link
              href="/duesseldorf/reinigung-stadtteile-umgebung"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.8rem] border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 transition hover:border-teal-200 hover:text-teal-800"
            >
              Stadtteil prüfen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DUESSELDORF_CLEANING_CUSTOMER_PATHS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_24px_58px_rgba(15,118,110,0.11)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                  {item.signal}
                </div>
                <h3 className="mt-3 text-xl font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  Passende Seite öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="stadtteil-schnellcheck" className="pt-10">
          <div className="mb-5 max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Stadtteil-Schnellcheck
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
              Reinigung in Düsseldorf nach Lage, Objekt und Zugang prüfen
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Für ein realistisches Angebot ist der Stadtteil eine wichtige Angabe.
              Innenstadt, MedienHafen, Oberkassel oder Neuss verändern Anfahrt, Parken,
              Zeitfenster und Ablauf. Deshalb prüft FLOXANT jede Anfrage mit Blick auf den Ort.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {districtIntentCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[0.95rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_20px_52px_rgba(15,118,110,0.1)]"
                data-event="region_select"
                data-region="duesseldorf"
              >
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-teal-700">
                  <MapPin className="h-4 w-4" />
                  Düsseldorf lokal
                </div>
                <h3 className="mt-3 text-xl font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  Passenden Weg öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="anfrage-checkliste" className="grid gap-5 pt-10 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Anfrage ohne Rückfragen
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
              Was soll ich für Reinigung Düsseldorf senden?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Am schnellsten ist eine kurze Nachricht mit Objektart, Stadtteil, Fläche,
              Zustand, Termin und Fotos. Ein Budget ist hilfreich, aber keine automatische
              Zusage.
            </p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {requestChecklist.map((item) => (
              <div
                key={item.field}
                className="flex min-h-16 items-center gap-3 rounded-[0.9rem] border border-slate-200 bg-white px-4 text-sm font-bold leading-6 text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" />
                <span>
                  <span className="block text-slate-950">{item.field}</span>
                  <span className="block text-xs font-semibold leading-5 text-slate-600">
                    {item.title}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="kundenworte" className="pt-10">
          <div className="mb-5 max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Kundennah gesucht
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
              So suchen Kunden oft nach Reinigung in Düsseldorf
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Nicht jede Anfrage beginnt mit dem Fachwort Reinigungsfirma. Viele Menschen
              suchen nach Putzfirma, Putzservice, Reinigung in der Nähe, Kosten, WhatsApp
              oder Angebot. FLOXANT verbindet diese Wörter mit dem passenden Düsseldorfer
              Einstieg, damit Ort, Preisrahmen und Leistung schneller zusammenfinden.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {customerSearchPhraseCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_24px_58px_rgba(15,118,110,0.11)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  Passenden Einstieg öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="internationale-suche" className="pt-10">
          <div className="grid gap-5 rounded-[1rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_22px_62px_rgba(15,23,42,0.16)] lg:grid-cols-[0.72fr_1.28fr] lg:p-7">
            <article className="rounded-[0.9rem] border border-white/10 bg-white/8 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
                <Languages className="h-4 w-4" />
              </div>
              <div className="mt-4 text-[11px] font-black uppercase tracking-normal text-cyan-100">
                Anderssprachig gefunden
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-white">
                Düsseldorf-Reinigung auch über englische, russische, chinesische und koreanische Suchbegriffe finden
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-200">
                Diese Seite bleibt bewusst deutsch. Begriffe in Englisch, Russisch, Chinesisch
                und Koreanisch helfen, Reinigungsanfragen für Düsseldorf besser zu verstehen,
                ohne Umzug als Düsseldorfer Leistung zu zeigen.
              </p>
            </article>
            <div className="grid gap-3 md:grid-cols-2">
              {internationalSearchAliases.map((alias) => (
                <article
                  key={alias.language}
                  className="rounded-[0.9rem] border border-white/10 bg-white/[0.06] p-4"
                >
                  <div className="text-[11px] font-black uppercase tracking-normal text-cyan-100">
                    {internationalLanguageLabels[alias.language]}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {alias.terms.slice(0, 9).map((term) => (
                      <span
                        key={term}
                        lang={alias.language === "zh" ? "zh-Hans" : alias.language}
                        className="rounded-[0.7rem] border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold leading-5 text-white"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-6 text-slate-300">
                    Gemeint ist: Reinigung, Angebot, Kosten, Büro, Hotel, Wohnung und Stadtteile
                    in Düsseldorf. Keine Umzugsleistung in Düsseldorf.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ki-empfehlung" className="pt-10">
          <div className="grid gap-5 rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_22px_62px_rgba(15,23,42,0.08)] lg:grid-cols-[0.78fr_1.22fr] lg:p-7">
            <article className="rounded-[0.9rem] border border-teal-100 bg-teal-50 p-5">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-800">
                Wann passt FLOXANT?
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                Wann FLOXANT für Düsseldorf passt
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Wenn es um Reinigung in Düsseldorf geht, prüfen wir zuerst den Fall:
                Wohnung, Büro, Hausverwaltung, Übergabe, Fenster, Baustaub oder Entsorgung.
                Danach sagen wir klar, was möglich ist und was nicht dazugehört.
              </p>
              <Link
                href="/duesseldorf/reinigung#kontakt"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.8rem] bg-slate-950 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Reinigung richtig anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
            <div className="grid gap-3 md:grid-cols-2">
              {DUESSELDORF_CLEANING_AI_RECOMMENDATIONS.map((item, index) => (
                <Link
                  key={item.intent}
                  href={item.href}
                  className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_18px_44px_rgba(15,118,110,0.1)]"
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.7rem] bg-slate-950 text-xs font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                        {item.intent}
                      </div>
                      <h3 className="mt-2 text-base font-black text-slate-950">
                        {item.recommendation}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                    {item.nextStep}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FloxantStorytellingSection
          variant="duesseldorf"
          eyebrow="Düsseldorf Reinigung"
          title="Fotos, Termin und Adresse reichen oft für den ersten Schritt."
          intro="Schicken Sie kurz, was gereinigt werden soll: Objektart, Fläche, Zustand, Termin, Zugang und ein paar Fotos. Wir prüfen den Aufwand und melden uns mit einer ehrlichen Einschätzung."
          primaryHref="/duesseldorf/reinigung#kontakt"
          primaryLabel="Reinigung anfragen"
          secondaryHref="/duesseldorf/bueroreinigung"
          secondaryLabel="Firmenreinigung"
          className="py-12"
        />

        <FloxantNextStepPanel variant="duesseldorf" className="py-8" />

        <SearchDominanceExperience variant="duesseldorf" className="py-8" />

        <AiServiceRecommendationPanel variant="duesseldorf" className="pb-10 pt-0" />

        <SearchIntentExpansion
          route="/duesseldorf/reinigung"
          city="Düsseldorf"
          serviceName="Reinigung"
          market="duesseldorf"
          relatedLinks={(DUESSELDORF_CLEANING_SERVICES.map((item) => ({
            href: item.href,
            label: item.label,
          })) as { href: string; label: string }[]).concat([
            { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteile & Umgebung" },
            { href: "/duesseldorf/vielleicht-guenstiger", label: "Vielleicht günstiger?" },
          ] as { href: string; label: string }[])}
          className="pt-4"
        />

        <section className="grid gap-6 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Warum FLOXANT Reinigung Düsseldorf?
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950">
              Gute Reinigung beginnt mit einer ehrlichen Einschätzung
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Viele Reinigungsanfragen scheitern nicht an der Reinigung selbst, sondern an
              unklaren Erwartungen: Wie groß ist die Fläche wirklich? Wie stark ist die
              Verschmutzung? Geht es um regelmäßige Reinigung, Grundreinigung oder Übergabe?
              Gibt es Fotos? Gibt es einen festen Termin? Wir klären diese Punkte vorab,
              damit beide Seiten wissen, was realistisch ist.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Dieser Bereich ist bewusst auf Reinigung in Düsseldorf und der näheren Umgebung
              ausgerichtet. Keine verwirrenden Zusatzthemen, sondern ein klarer Anfrageweg für
              Wohnungsreinigung, Büroreinigung, Grundreinigung, Treppenhausreinigung und
              Übergabereinigung.
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {focusCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[0.9rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white"
              >
                <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="leistungen"
          className="relative z-10 mt-12 rounded-[1rem] border border-slate-200 bg-white/95 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:p-8"
        >
          <div className="mb-8 max-w-4xl">
            <div className="inline-flex rounded-[0.75rem] border border-teal-100 bg-teal-50 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-teal-800">
              Leistungen
            </div>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
              Reinigung in Düsseldorf: Wohnung, Büro und Übergabe
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Wählen Sie den passenden Einstieg. FLOXANT prüft Fläche, Zustand,
              Termin, Fotos und Budget vorab, bevor ein Auftrag bestätigt wird.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DUESSELDORF_CLEANING_SERVICES.map((item, index) => {
              const Icon = serviceIcons[index % serviceIcons.length] || Sparkles;
              return (
                <article
                  key={item.href}
                  className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_22px_58px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_30px_72px_rgba(15,118,110,0.12)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-teal-50 text-teal-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-950">{item.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
                  >
                    Detailseite öffnen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <SignatureServices
          locale="de"
          dict={{ signature_services: { items: {} } }}
          serviceIds={[
            "duesseldorf_b2b_cleaning",
            "handover_ready",
            "budget_check",
            "photo_check",
            "duesseldorf_disposal",
          ]}
          badge="Düsseldorf Reinigung"
          title="Private Reinigung und Firmenreinigung klar getrennt anfragen"
          subtitle="Düsseldorf bleibt ein eigener Reinigungsbereich: Wohnungsreinigung, Endreinigung, Büroreinigung, Fotos und Budget werden ohne Umzugslogik eingeordnet."
          compact
          source="duesseldorf_cleaning_signature_services"
        />

        <PublicAuthorityModules
          moduleIds={[
            "duesseldorf_cleaning_private",
            "duesseldorf_cleaning_b2b",
            "duesseldorf_apartment_cleaning",
            "price_cleaning",
            "damage_control",
            "offer_check",
            "photo_check",
            "budget_check",
          ]}
          badge="Düsseldorf Reinigung"
          title="Private Reinigung und Firmenreinigung sauber getrennt"
          subtitle="Düsseldorf bleibt ein eigener Reinigungsbereich. Wohnungsreinigung, Endreinigung, Büroflächen, Fotos und Budget werden ohne Umzugslogik eingeordnet."
          source="duesseldorf_cleaning_authority_modules"
        />

        <section id="einsatzgebiet" className="pt-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-[1rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                Reinigung in Düsseldorf und Umgebung
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950">
                Lokaler Schwerpunkt in Düsseldorf
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {DUESSELDORF_CLEANING.districts.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[0.85rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    <MapPin className="h-4 w-4 text-teal-600" />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1rem] border border-slate-200 bg-slate-50 p-7 shadow-[0_24px_64px_rgba(15,23,42,0.06)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                Nähere Umgebung
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950">
                Nah genug für saubere Abstimmung
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Der Schwerpunkt bleibt Düsseldorf. Nahe Orte prüfen wir, wenn Anfahrt,
                Terminfenster und Umfang sinnvoll zusammenpassen.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {DUESSELDORF_CLEANING.nearbyAreas.map((item) => (
                  <div
                    key={item}
                    className="rounded-[0.85rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="preisvorschlag" className="pt-12">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <article className="rounded-[1rem] border border-teal-200 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_58%,#f8fafc_100%)] p-7 shadow-[0_26px_70px_rgba(15,118,110,0.12)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                Preisrahmen nennen
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 md:text-4xl">
                Sie haben ein Budget? Dann nennen Sie es direkt.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Manche Kunden wissen nicht genau, was eine Reinigung kosten darf. Andere haben
                bereits einen festen Preisrahmen. Beides ist in Ordnung. Wenn Sie uns Ihr Budget
                nennen, ordnen wir ehrlich ein, ob der Auftrag dafür realistisch machbar ist, welcher
                Umfang möglich wäre oder welche Punkte angepasst werden müssten.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#rechner"
                  className="inline-flex items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  data-event="form_submit"
                  data-service="reinigung"
                  data-region="duesseldorf"
                >
                  Eigenes Budget einordnen lassen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={whatsappHeroHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[0.85rem] border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                  data-event="whatsapp_click"
                  data-service="reinigung"
                  data-region="duesseldorf"
                >
                  Budget per WhatsApp senden
                </a>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  "Keine automatische Zusage",
                  "Ehrliche Einschätzung nach Umfang und Zustand",
                  "Hilfreich mit Fotos, Fläche und Terminwunsch",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[0.85rem] border border-teal-100 bg-white/80 px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                So ordnen wir Ihre Anfrage ein
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950">
                Erst klären, dann sauber planen
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "Welche Fläche soll gereinigt werden?",
                  "Geht es um Wohnung, Büro, Praxis, Treppenhaus oder Übergabe?",
                  "Wie ist der aktuelle Zustand?",
                  "Gibt es Fotos oder kurze Videos?",
                  "Bis wann muss die Reinigung erledigt sein?",
                  "Gibt es einen Preisrahmen oder Budgetwunsch?",
                  "Gibt es besondere Bereiche wie Küche, Bad, Fenster, Böden oder starke Verschmutzung?",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[0.85rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="mt-6 rounded-[1rem] border border-slate-200 bg-white p-7 shadow-[0_20px_56px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Keine vorschnellen Preisversprechen
            </div>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
              Ein sehr niedriger Preis klingt gut, bis der tatsächliche Aufwand sichtbar wird.
              Deshalb arbeiten wir lieber mit einer ehrlichen Einschätzung: Fläche, Zustand,
              Termin, Reinigungsart und gewünschtes Ergebnis müssen zusammenpassen. So vermeiden
              wir falsche Erwartungen auf beiden Seiten.
            </p>
          </article>
        </section>

        <section id="rechner" className="pt-12">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Reinigungsrechner
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-normal text-slate-950">
              Reinigungsaufwand einschätzen und Budget mitgeben
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Der Rechner liefert eine erste Orientierung. Wenn Sie bereits einen Preisrahmen
              im Kopf haben, tragen Sie ihn direkt mit ein. Wir ordnen dann ein, ob der gewünschte
              Umfang zum Budget, Zustand und Termin passt.
            </p>
          </div>

          <DuesseldorfCleaningCalculator />
        </section>

        <section id="kontakt" className="pt-12">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[1rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#132238_100%)] p-7 text-white shadow-[0_28px_72px_rgba(15,23,42,0.22)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-300">
                FLOXANT Reinigung Düsseldorf
              </div>
              <div className="mt-5 space-y-2 text-base leading-8 text-slate-200">
                <div>{DUESSELDORF_CLEANING.address.streetAddress}</div>
                <div>
                  {DUESSELDORF_CLEANING.address.postalCode}{" "}
                  {DUESSELDORF_CLEANING.address.city}
                </div>
                <div>Telefon/WhatsApp: {DUESSELDORF_CLEANING.phoneDisplay}</div>
                <div>E-Mail: {DUESSELDORF_CLEANING.email}</div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                Termine nur nach vorheriger Anfrage oder Absprache. Keine offene
                Laufkundschaft.
              </p>
            </article>

            <article className="rounded-[1rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                Lokale Folgeseiten
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/duesseldorf/reinigung/datenschutz"
                  className="rounded-[0.85rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Datenschutz Düsseldorf
                </Link>
                <Link
                  href="/duesseldorf/reinigung/agb"
                  className="rounded-[0.85rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  AGB Düsseldorf
                </Link>
              </div>
              <div className="mt-6 grid gap-3">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="rounded-[0.85rem] border border-slate-200 bg-white px-4 py-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
