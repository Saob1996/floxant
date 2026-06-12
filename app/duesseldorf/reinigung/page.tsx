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
import { FloxantObjectBrief } from "@/components/FloxantObjectBrief";
import { FloxantStorytellingSection } from "@/components/FloxantStorytellingSection";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { AiServiceRecommendationPanel } from "@/components/seo/AiServiceRecommendationPanel";
import { ServicePageCustomerSections } from "@/components/ServicePageCustomerSections";
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


export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/reinigung",
    title: "Reinigung Düsseldorf | Fotos senden, Aufwand klären",
    description:
      "FLOXANT prüft Reinigung in Düsseldorf für Wohnung, Büro, Praxis und Übergabe. Stadtteil, Fläche, Fotos und Termin senden, Budget nennen.",
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
  { href: "#stadtteil-schnellcheck", label: "Ort", note: "Einsatzbereich" },
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
    title: "Düsseldorf und nahe Umgebung einplanen",
    text: "Ob Innenstadt, Pempelfort, Bilk, Oberkassel, MedienHafen oder ein naher Ort: Wichtig sind Objekt, Zugang, Parken, Zeitfenster und der gewünschte Reinigungsumfang.",
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
    title: "Welche Bereiche deckt FLOXANT ab?",
    text: "FLOXANT ist auf Reinigung in Düsseldorf ausgerichtet. Nahe Orte können angefragt werden, wenn Termin, Anfahrt und Umfang sinnvoll zusammenpassen.",
  },
  {
    Icon: Building2,
    title: "Kann Entsorgung dazukommen?",
    text: "Ja, Entsorgung wird separat geprüft. Wenn Umzug oder Entrümpelung dazugehört, wird der passende Düsseldorfer Service getrennt eingeordnet.",
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
    title: "Reinigung in Düsseldorf passend anfragen",
    text: "Nennen Sie Ort oder PLZ, Objektart, Zugang, Termin und wenn möglich Fotos. So lässt sich schnell klären, ob FLOXANT den Einsatz sinnvoll einplanen kann.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Stärkere Verschmutzung gründlich einordnen",
    text: "Wenn normale Reinigung nicht reicht, helfen Fotos von Küche, Bad, Böden, Ecken, Fensterbereichen und Problemstellen. Fläche und Termin machen die Einschätzung konkreter.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Wohnung wieder sauber vorbereiten",
    text: "Für Wohnungsreinigung zählen Räume, Küche, Bad, Böden, Fensterbereiche, Zustand und Termin. Fotos helfen, Aufwand und sinnvollen Umfang vorab zu verstehen.",
    href: "/duesseldorf/putzfirma",
  },
  {
    title: "Privathaushalt oder Apartment reinigen lassen",
    text: "Für Wohnungen, Apartments und private Übergaben helfen klare Angaben zu Räumen, Bad, Küche, Böden, Zugang, Termin und gewünschtem Ergebnis.",
    href: "/duesseldorf/wohnungsreinigung",
  },
  {
    title: "Apartment regelmäßig sauber halten",
    text: "Für möblierte Wohnungen, Apartments oder Gästewechsel zählen Turnus, Schlüsselweg, Fotos, Zeitfenster, Rückmeldung und klare Grenzen zu Wäsche oder Zusatzaufgaben.",
    href: "/reinigung-moeblierte-wohnung-duesseldorf",
  },
  {
    title: "Kosten und Budget realistisch besprechen",
    text: "Quadratmeter, Verschmutzung, Zugang, Zeitfenster und gewünschtes Ergebnis beeinflussen den Aufwand. Ein Preisrahmen hilft, schnell über Machbarkeit zu sprechen.",
    href: "/duesseldorf/reinigung#preisvorschlag",
  },
  {
    title: "Büro, Kanzlei oder Studio sauber halten",
    text: "Für Büros, Kanzleien, Studios und kleine Firmen zählen Fläche, Turnus, Zeitfenster, Schlüssel- oder Zugangsklärung und ein Ansprechpartner vor Ort.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Büro- und Praxisreinigung",
    text: "Für Büro, Kanzlei und allgemeine Praxisflächen werden Raumliste, Turnus, Zeitfenster, Sanitär, Empfang, Zugang und Ansprechpartner vorab geklärt.",
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Gewerbliche Fläche richtig beschreiben",
    text: "Für Praxis, Kanzlei, Studio, Laden, Büro oder gemischte Fläche helfen Raumliste, Nutzung, Turnus, Öffnungszeiten, Zugang und Fotos für die passende Einordnung.",
    href: "/duesseldorf/gewerbereinigung",
  },
  {
    title: "Praxisräume ruhig und verlässlich reinigen",
    text: "Für Empfang, Wartebereich, Personalräume und Sanitärflächen zählt ein ruhiger Ablauf mit klaren Grenzen. Praxisart, Fläche, Öffnungszeiten, Zugang und Fotos helfen bei der Prüfung.",
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Wohnung mit klarem Ergebnis reinigen",
    text: "Wenn eine Wohnung wieder sauber wirken soll, werden Küche, Bad, Böden, Fensterbereiche, Zustand, Termin und gewünschtes Ergebnis vorab eingeordnet.",
    href: "/duesseldorf/wohnungsreinigung",
  },
  {
    title: "Hotel oder Boardinghouse abstimmen",
    text: "Für Hotel, Boardinghouse oder Apartmenthaus werden Lobby, Flure, Gästebereiche, Sanitär, Zeitfenster und Kapazität nach Objektangaben geprüft.",
    href: "/duesseldorf/hotelreinigung",
  },
  {
    title: "Leerstand oder Objektwechsel vorbereiten",
    text: "Bei stärkerer Verschmutzung, Leerstand oder Objektwechsel entscheidet der Zustand. Fotos von Küche, Bad, Boden und Problemstellen machen die Einschätzung schneller.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Immobilie vor Besichtigung oder Übergabe reinigen",
    text: "Bei Immobilienreinigung geht es oft um den ersten Eindruck: Eingang, Böden, Küche, Bad, Fensterbereiche, Keller, Balkon und sichtbare Reststellen.",
    href: "/duesseldorf/endreinigung",
  },
  {
    title: "Einzelbüro oder kleine Firmenfläche reinigen",
    text: "Ob Einzelbüro, Agentur oder kleine Firmenfläche: wichtig sind Raumgröße, Arbeitszeiten, Sanitär, Küche, Schlüsselweg und ein sauberer Starttermin.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Nahe Umgebung sinnvoll mitprüfen",
    text: "Anfragen aus Neuss und naher Umgebung werden nach Fläche, Nutzung, Terminfenster, Zugang und gewünschtem Reinigungsumfang geprüft.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Büroreinigung mit festem Ablauf",
    text: "Viele Firmen brauchen nicht nur eine einzelne Reinigungskraft, sondern einen verlässlichen Ablauf: Raumliste, Randzeit, Schlüsselweg, Ansprechpartner, Fotos und klarer Turnus.",
    href: "/duesseldorf/reinigungskraft-buero",
  },
  {
    title: "Gewerbeflächen reinigen",
    text: "Bei Laden, Showroom, Lager, Büro oder gemischter Fläche entscheidet der richtige Umfang: Boden, Glas, Sanitär, Laufwege, Öffnungszeiten und Turnus.",
    href: "/duesseldorf/gewerbereinigung",
  },
  {
    title: "Gebäude mit mehreren Bereichen reinigen",
    text: "Bei Objekten mit Eingängen, Etagen, Treppenhaus, Büro- oder Wohnflächen werden Zugang, Bereichsliste, Terminfenster und Fotos gemeinsam eingeordnet.",
    href: "/duesseldorf/gebaeudereinigung",
  },
  {
    title: "Fotos senden und Rückfragen sparen",
    text: "Fotos sparen Rückfragen. Sie zeigen Zustand, Laufwege, Küche, Bad, Boden, Treppenhaus oder Keller und machen eine ehrliche Einschätzung schneller möglich.",
    href: "/duesseldorf/reinigung#kontakt",
  },
  {
    title: "Reinigung heute oder morgen klären",
    text: "Wenn es wirklich schnell gehen muss, entscheiden Deadline, Stadtteil, Fotos, Zugang und Prioritäten. FLOXANT prüft erst die Machbarkeit, bevor Erwartungen entstehen.",
    href: "/duesseldorf/kurzfristige-reinigung",
  },
  {
    title: "Kurzfristigen Termin sauber vorbereiten",
    text: "Wenn ein Termin näher rückt, zählt Klarheit: Stadtteil, Fläche, Schlüsselzugang, Zustand und Fotos direkt mitsenden. Eine Zusage gibt es erst nach Machbarkeitsprüfung.",
    href: "/duesseldorf/kurzfristige-reinigung",
  },
  {
    title: "Reinigung in Düsseldorf und Umgebung",
    text: "Für Büros, Praxen, Treppenhäuser, Wohnungen und Übergaben reichen für den Start Ort, Objekt, gewünschter Umfang, Terminfenster und wenn möglich Fotos.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Hausverwaltung mit klarer Bereichsliste",
    text: "Wenn Eingang, Treppenhaus, Kellerflur oder Müllbereich Beschwerden auslösen, helfen Bereichsliste, Turnus, Schlüsselweg, Fotos und Ansprechpartner.",
    href: "/duesseldorf/hausverwaltung-reinigung",
  },
  {
    title: "WEG-Objekt ruhig organisieren",
    text: "Eigentümer und Verwaltungen brauchen keine vagen Zusagen, sondern klare Bereiche, Turnus, Zugang, Fotostand und Grenzen zu Hausmeisterdienst.",
    href: "/duesseldorf/hausverwaltung-reinigung",
  },
  {
    title: "Reinigung mit Schlüsselübergabe",
    text: "Wenn Sie nicht vor Ort sein können, braucht die Reinigung einen klaren Schlüsselweg: Zugang, Berechtigung, Fotos, Deadline und Rückmeldung.",
    href: "/duesseldorf/schluesseluebergabe-reinigung",
  },
  {
    title: "Reinigung aus der Ferne abstimmen",
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
    title: "Treppenhaus regelmäßig sauber halten",
    text: "Für Treppenhaus, Eingänge, Kellerflur und Müllbereich helfen Fotos, Etagenzahl, Turnus, Schlüsselweg und eine klare Liste der wiederkehrenden Aufgaben.",
    href: "/duesseldorf/treppenhausreinigung",
  },
  {
    title: "Vorhandenes Reinigungsangebot prüfen lassen",
    text: "Wenn bereits ein Angebot vorliegt, können Preis, Umfang, Turnus, Zusatzpunkte und mögliche Alternative mit Fotos und Objektangaben besser eingeordnet werden.",
    href: "/duesseldorf/vielleicht-guenstiger",
  },
  {
    title: "Objektart direkt richtig zuordnen",
    text: "Senden Sie direkt Objektart, Ort, Fläche, Termin und Fotos. FLOXANT ordnet ein, ob Wohnungsreinigung, Büroreinigung, Grundreinigung oder ein anderer Reinigungsbereich passt.",
    href: "/duesseldorf/reinigung",
  },
  {
    title: "Einsatzort schnell klären",
    text: "Ort oder PLZ, Objektart, Zugang, Fotos und Termin zeigen, ob der Einsatz in Düsseldorf oder naher Umgebung sinnvoll planbar ist. Daraus entsteht eine konkrete Anfrage statt unklarer Rückfragen.",
    href: "/duesseldorf/reinigung-stadtteile-umgebung",
  },
  {
    title: "Mehrere Reinigungsangebote besser vergleichen",
    text: "Wenn mehrere Angebote vorliegen, sollten Umfang, Turnus, Zeitfenster, Zusatzpunkte und Fotos vergleichbar sein. Erst dann wird der Preis wirklich verständlich.",
    href: "/blog/reinigungsunternehmen-duesseldorf-anbieter-vergleichen",
  },
  {
    title: "Büro, Agentur oder Kanzlei planen",
    text: "Für Büro, Agentur, Kanzlei, kleine Firma oder Praxisfläche werden Raumliste, Turnus, Sanitär, Küche, Zeitfenster und Zugang konkret geprüft.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Büroreinigung mit Raumliste anfragen",
    text: "Für ein Büro zählen Raumliste, Sanitär, Küche, Turnus, Zeitfenster, Zugang und ein vorhandenes Angebot, falls es schon eines gibt.",
    href: "/blog/buero-reinigen-duesseldorf-bueroreinigung-angebot",
  },
  {
    title: "Böden und Laufspuren reinigen",
    text: "Bei Bodenreinigung zählen Material, Laufspuren, Verschmutzung, Fläche, Möbelstand, Fotos und ob normale Reinigung oder Grundreinigung passender ist.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Hauseingang und Flure reinigen",
    text: "Hauseingang, Treppenhaus, Flur und Kellerbereich brauchen klare Angaben zu Etagen, Turnus, Schlüsselweg, Fotos und Ansprechpartner.",
    href: "/duesseldorf/treppenhausreinigung",
  },
  {
    title: "Treppenhaus für Verwaltung oder WEG",
    text: "Für Hausverwaltung, WEG, Eingang, Etagen, Kellerflur und Müllbereich helfen Turnus, Fotos, Schlüsselweg und klare Bereichsliste.",
    href: "/blog/treppenhausreinigungen-duesseldorf-hauseingang-hausverwaltung",
  },
  {
    title: "Nach Veranstaltung wieder nutzbar machen",
    text: "Nach Veranstaltung, Empfang, Praxisabend oder Firmenfeier sind Fläche, Müll, Sanitär, Boden, Deadline und nächste Nutzung wichtig.",
    href: "/duesseldorf/sonderreinigung",
  },
  {
    title: "Wohnung vor Einzug oder Auszug reinigen",
    text: "Für Auszug, Einzug, möblierte Wohnung oder Übergabe werden Küche, Bad, Böden, Fensterbereiche, Zustand, Termin und Schlüsselzugang geprüft.",
    href: "/duesseldorf/wohnungsreinigung",
  },
  {
    title: "Preisrahmen für Reinigung einordnen",
    text: "Preise werden realistischer, wenn Fläche, Zustand, Objektart, Turnus, Zugang und Fotos vorliegen. Ein vorhandenes Angebot kann separat eingeordnet werden.",
    href: "/duesseldorf/vielleicht-guenstiger",
  },
  {
    title: "Reinigungskosten nachvollziehbar machen",
    text: "Kosten sind erst vergleichbar, wenn Fläche, Zustand, Objektart, Turnus, Zugang, Fotos und gewünschtes Ergebnis zusammen vorliegen.",
    href: "/blog/reinigungsfirma-duesseldorf-preise-kosten-angebot-pruefen",
  },
  {
    title: "Verkaufsfläche, Laden oder Showroom reinigen",
    text: "Bei Verkaufsflächen zählen Laufwege, Boden, Glas, Sanitär, Öffnungszeiten, Kundenverkehr und ein Zeitfenster, in dem der Betrieb nicht gestört wird.",
    href: "/duesseldorf/ladenreinigung",
  },
  {
    title: "Gebäudereinigung in Hassels, Düsseltal oder Heerdt",
    text: "Für Bürohaus, Wohnobjekt, Treppenhaus oder gemischte Fläche reichen Ort, Bereiche, Zugang, Turnus, Fotos und ein Ansprechpartner für die erste Einordnung.",
    href: "/duesseldorf/gebaeudereinigung",
  },
  {
    title: "Angebot für Reinigungsarbeiten senden",
    text: "Wenn bereits ein Angebot vorliegt, prüfen wir Umfang, Turnus, Zusatzleistungen, Zeitfenster und offene Punkte. Fotos helfen, die Leistung besser einzuordnen.",
    href: "/duesseldorf/vielleicht-guenstiger",
  },
  {
    title: "Gewerbeobjekt Reinigung",
    text: "Bei Gewerbeobjekten geht es um Büro, Eingang, Sanitär, Flure, Verkaufsfläche, Turnus, Zeitfenster und Ansprechpartner statt um eine pauschale Schätzung.",
    href: "/duesseldorf/objektreinigung",
  },
] as const;

function compactCardLabel(value: string) {
  if (/kosten|preis|angebot/i.test(value)) return "Angebot & Kosten";
  if (/heute|kurzfristig|morgen|termin/i.test(value)) return "Kurzfristig";
  if (/schlüssel|nicht vor ort/i.test(value)) return "Zugang klären";
  if (/hausverwaltung|weg|treppenhaus/i.test(value)) return "Hausverwaltung";
  if (/büro|praxis|firma|gewerbe/i.test(value)) return "Gewerbe";
  if (/wohnung|übergabe|auszug/i.test(value)) return "Wohnung & Übergabe";
  return "Anfrageweg";
}

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
    q: "Kann Reinigung in Düsseldorf mit Umzug oder Entrümpelung kombiniert werden?",
    a: "Ja, wenn Umfang, Termin und Zugang passen. Reinigung, Umzug, Entrümpelung und Entsorgung werden getrennt geprüft, damit Angebot und Ablauf nachvollziehbar bleiben.",
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

const duesseldorfPriorityServiceCards = [
  {
    Icon: Building2,
    title: "Büroreinigung Düsseldorf",
    text: "Für Büros, Agenturen, Kanzleien und kleine Firmen zählen Raumliste, Sanitär, Küche, Turnus, Randzeit, Schlüsselweg und ein Ansprechpartner.",
    href: "/duesseldorf/bueroreinigung",
    cta: "Büro anfragen",
  },
  {
    Icon: ClipboardCheck,
    title: "Praxisreinigung Düsseldorf",
    text: "Für Empfang, Wartebereich, Nebenräume und Sanitärflächen wird vorab geklärt, welche zugänglichen Bereiche wann gereinigt werden sollen.",
    href: "/duesseldorf/praxisreinigung",
    cta: "Praxisdaten senden",
  },
  {
    Icon: Building,
    title: "Treppenhaus und Hausverwaltung",
    text: "Eingang, Etagen, Kellerflur, Müllbereich, Turnus, Beschwerden, Fotos und Schlüsselweg helfen Verwaltungen bei einer klaren Anfrage.",
    href: "/duesseldorf/hausverwaltung-reinigung",
    cta: "Objekt prüfen",
  },
  {
    Icon: Sparkles,
    title: "Endreinigung und Übergabe",
    text: "Bei Auszug, Einzug, Besichtigung oder Schlüsseltermin werden Räume, Küche, Bad, Böden, Restpunkte, Fotos und Deadline gemeinsam betrachtet.",
    href: "/duesseldorf/endreinigung",
    cta: "Übergabe vorbereiten",
  },
  {
    Icon: BadgeEuro,
    title: "Angebot oder Budget nennen",
    text: "Wenn bereits ein Reinigungsangebot oder ein Preisrahmen vorliegt, prüft FLOXANT Umfang, Turnus, Zusatzpunkte und mögliche Alternative ohne Preisgarantie.",
    href: "/angebot-vergleichen-duesseldorf",
    cta: "Angebot prüfen",
  },
  {
    Icon: Camera,
    title: "Fotos per WhatsApp senden",
    text: "Fotos von Räumen, Boden, Küche, Bad, Zugang oder Problemstellen sparen Rückfragen und machen die erste Rückmeldung deutlich konkreter.",
    href: "#kontakt",
    cta: "Fotos vorbereiten",
  },
] as const;

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
  const customerSectionServices = DUESSELDORF_CLEANING_SERVICES.slice(0, 6).map((item) => ({
    title: item.label,
    text: item.description,
    href: item.href,
  }));

  return (
    <main className="overflow-x-clip px-4 pb-24 pt-10 sm:px-6">
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
              Sie möchten eine Wohnung, ein Büro, eine Praxis, ein Treppenhaus oder eine
              Gewerbefläche in Düsseldorf reinigen lassen? Senden Sie Ort oder PLZ, Fläche,
              Zustand, Terminwunsch und Fotos. FLOXANT prüft den Fall klar, realistisch und
              ohne pauschale Versprechen.
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
                Angebot prüfen lassen
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

        <ServicePageCustomerSections
          region="duesseldorf"
          city="Düsseldorf"
          path="/duesseldorf/reinigung"
          serviceSlug="reinigung"
          serviceLabel="Reinigung"
          audience="Privatkunden, Unternehmen, Praxen, Hausverwaltungen und Gewerbeobjekte"
          summary="FLOXANT bietet Reinigung in Düsseldorf für Wohnungen, Büros, Praxen, Treppenhäuser, Gewerbeflächen und Übergaben an. Entscheidend sind Objektart, Fläche, Zustand, Zugang, Termin und Fotos, damit die Anfrage schnell und realistisch eingeordnet werden kann."
          services={customerSectionServices}
          relatedLinks={[
            { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung" },
            { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung" },
            { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung" },
            { href: "/duesseldorf/endreinigung", label: "Endreinigung" },
            { href: "/angebot-vergleichen-duesseldorf", label: "Angebot prüfen" },
          ]}
          offerCheckHref="/angebot-vergleichen-duesseldorf"
          className="pt-8"
        />

        <section className="pt-6">
          <div className="grid min-w-0 gap-4 overflow-hidden rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_20px_56px_rgba(15,23,42,0.07)] xl:grid-cols-[0.72fr_1.28fr] xl:p-6">
            <article className="min-w-0 rounded-[0.85rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                Leistungen direkt finden
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                Reinigung in Düsseldorf nach Objekt und Anlass auswählen
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                FLOXANT trennt die Anfrage nach dem, was wirklich gereinigt werden soll:
                Büro, Praxis, Treppenhaus, Wohnung, Gewerbefläche, Endreinigung oder ein
                vorhandenes Angebot. Sie senden Ort, Fläche, Fotos, Termin und bei Bedarf
                Ihr Budget.
              </p>
            </article>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {duesseldorfPriorityServiceCards.map(({ Icon, title, text, href, cta }) => (
                <Link
                  key={title}
                  href={href}
                  className="group min-w-0 rounded-[0.85rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_34px_rgba(15,118,110,0.12)]"
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] bg-slate-950 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-base font-black leading-snug text-slate-950">{title}</h3>
                  <p className="mt-2 break-words text-sm leading-7 text-slate-700">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-teal-800">
                    {cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FloxantObjectBrief variant="duesseldorf" className="px-0 py-8" />

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
          <div className="grid min-w-0 gap-4 overflow-hidden rounded-[0.95rem] border border-teal-100 bg-[linear-gradient(135deg,#ffffff_0%,#ecfeff_52%,#f8fafc_100%)] p-4 shadow-[0_18px_44px_rgba(15,118,110,0.08)] xl:grid-cols-[0.72fr_1.28fr] xl:p-5">
            <article className="min-w-0 rounded-[0.75rem] border border-white bg-white/80 p-5">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                Schnell entscheiden
              </div>
              <h2 id="duesseldorf-sofort-entscheiden" className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                Was brauchen Sie gerade?
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Wählen Sie direkt, was zu Ihrer Situation passt. Für den Start reichen
                Objektart, Ort, gewünschter Umfang, Terminfenster und wenn möglich Fotos.
              </p>
            </article>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
              {instantDecisionCards.map(({ Icon, title, text, href, cta }) => (
                <Link
                  key={title}
                  href={href}
                  className="group min-w-0 rounded-[0.75rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_16px_34px_rgba(15,118,110,0.12)]"
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] bg-slate-950 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-base font-black leading-snug text-slate-950">{title}</h3>
                  <p className="mt-2 break-words text-sm leading-6 text-slate-600">{text}</p>
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
          <div className="grid min-w-0 gap-4 overflow-hidden rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_20px_56px_rgba(15,23,42,0.07)] xl:grid-cols-[0.72fr_1.28fr] xl:p-6">
            <article className="min-w-0 rounded-[0.85rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                Schnelle Anliegen
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                Wenn Reinigung zeitnah geklärt werden muss
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Manchmal geht es nicht um eine lange Beratung, sondern um eine klare
                Rückmeldung: Passt der Termin, welche Angaben fehlen noch und welcher
                Kontaktweg ist am schnellsten?
              </p>
            </article>
            <div className="grid min-w-0 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
              {DUESSELDORF_CLEANING_CLICK_INTENTS.map((item, index) => {
                const Icon = clickIntentIcons[index % clickIntentIcons.length] || CheckCircle2;
                return (
                  <Link
                    key={item.searchPhrase}
                    href={item.href}
                    className="group min-w-0 rounded-[0.85rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_18px_42px_rgba(15,118,110,0.1)]"
                    data-event="service_card_click"
                    data-region="duesseldorf"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="mt-3 text-[11px] font-black uppercase tracking-normal text-teal-700">
                      {compactCardLabel(item.searchPhrase)}
                    </div>
                    <h3 className="mt-2 text-base font-black leading-snug text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 break-words text-sm leading-6 text-slate-600">{item.answer}</p>
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
                Häufige Reinigungssituationen
              </div>
              <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-normal text-slate-950">
                Schnell zur passenden Reinigungsleistung in Düsseldorf
              </h2>
            </div>
            <Link
              href="/duesseldorf/reinigung-stadtteile-umgebung"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.8rem] border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 transition hover:border-teal-200 hover:text-teal-800"
            >
              Einsatzbereich öffnen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid min-w-0 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {DUESSELDORF_CLEANING_CUSTOMER_PATHS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group min-w-0 rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_24px_58px_rgba(15,118,110,0.11)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                  {compactCardLabel(item.signal)}
                </div>
                <h3 className="mt-3 text-xl font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 break-words text-sm leading-7 text-slate-700">{item.text}</p>
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
              Einsatzbereich
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
              Reinigung in Düsseldorf nach Ort, Objekt und Zugang planen
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Der Einsatzort hilft bei der Planung von Anfahrt, Parken, Zugang und
              Zeitfenster. Nennen Sie einfach Stadtteil oder PLZ, Objektart und gewünschte
              Leistung. FLOXANT ordnet dann ein, welcher Ablauf sinnvoll ist.
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
              So kommen Anfragen bei uns an
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
              Reinigung in Düsseldorf klar beschreiben
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Nicht jede Anfrage ist perfekt vorbereitet. Beschreiben Sie einfach, was
              gereinigt werden soll, wo das Objekt liegt, bis wann es erledigt sein muss
              und ob Fotos oder ein vorhandenes Angebot vorliegen.
            </p>
          </div>
          <div className="grid min-w-0 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {customerSearchPhraseCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group min-w-0 rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_24px_58px_rgba(15,118,110,0.11)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="mt-4 break-words text-xl font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 break-words text-sm leading-7 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  Passende Leistung öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="mehrsprachige-anfrage" className="pt-10">
          <div className="grid gap-5 rounded-[1rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_22px_62px_rgba(15,23,42,0.16)] lg:grid-cols-[0.72fr_1.28fr] lg:p-7">
            <article className="rounded-[0.9rem] border border-white/10 bg-white/8 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
                <Languages className="h-4 w-4" />
              </div>
              <div className="mt-4 text-[11px] font-black uppercase tracking-normal text-cyan-100">
                Mehrsprachige Anfrage
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-white">
                Reinigungsanfragen auch bei fremdsprachigen Angaben klären
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-200">
                Wenn eine Anfrage auf Englisch, Russisch, Chinesisch oder Koreanisch kommt,
                zählen trotzdem die gleichen Eckdaten: Ort, Objekt, Fläche, Zustand, Termin
                und gewünschter Kontaktweg. FLOXANT hält die Rückfrage einfach und verständlich.
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
                    Hilfreich sind kurze Angaben zu Objekt, Umfang, Termin, Zugang und Fotos.
                    Für Reinigung in Düsseldorf bleibt diese Seite der direkte Einstieg; Umzug,
                    Entrümpelung und Haushaltsauflösung haben eigene lokale Seiten.
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
                Für welche Reinigungsfälle FLOXANT in Düsseldorf passt
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                FLOXANT passt, wenn Reinigung konkret geplant werden soll: Wohnung, Büro,
                Hausverwaltung, Übergabe, Fenster, Baustaub oder ergänzende Entsorgung.
                Wir sagen klar, welche Leistung gemeint ist und welche Angaben noch fehlen.
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
                  className="group min-w-0 rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_18px_44px_rgba(15,118,110,0.1)]"
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.7rem] bg-slate-950 text-xs font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                        {compactCardLabel(item.intent)}
                      </div>
                      <h3 className="mt-2 text-base font-black text-slate-950">
                        {item.recommendation}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 break-words text-sm leading-7 text-slate-700">{item.answer}</p>
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

        <AiServiceRecommendationPanel variant="duesseldorf" className="pb-10 pt-0" />

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
              Dieser Bereich bleibt bewusst bei Reinigung in Düsseldorf und der näheren
              Umgebung. Wohnungsreinigung, Büroreinigung, Grundreinigung,
              Treppenhausreinigung und Übergabereinigung werden klar getrennt angefragt.
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
              Wählen Sie die Leistung, die zu Ihrer Situation passt. Für die erste
              Einschätzung helfen Fläche, Zustand, Termin, Fotos, Zugang und ein möglicher
              Preisrahmen.
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
                    Leistung ansehen
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
          subtitle="Wohnungsreinigung, Endreinigung und Büroreinigung werden getrennt angefragt. Fotos, Termin und Budget helfen bei einer ehrlichen ersten Einschätzung."
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
          subtitle="Wohnungsreinigung, Endreinigung, Büroflächen, Fotos und Budget werden verständlich eingeordnet, damit der passende nächste Schritt klar ist."
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
