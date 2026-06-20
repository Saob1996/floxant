import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Camera,
  CheckCircle2,
  Clock3,
  HelpCircle,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
} from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_AI_RECOMMENDATIONS,
  DUESSELDORF_CLEANING_CLICK_INTENTS,
  DUESSELDORF_CLEANING_REQUEST_FIELDS,
  DUESSELDORF_CLEANING_SNIPPET_ANSWERS,
  buildDuesseldorfCleaningSchema,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";
import { ServicePageCustomerSections } from "@/components/ServicePageCustomerSections";
import {
  getDuesseldorfCleaningInternationalAliases,
  type SearchIntentAliasLanguage,
} from "@/lib/search-intent-aliases";
import {
  InternationalCustomerHint,
  OfferCheckCTA,
  RelatedSpecialServices,
  SignatureServicesGrid,
} from "@/components/conversion";
import { LeadCta } from "@/components/LeadCta";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { DuesseldorfCleaningConversionLift } from "@/components/duesseldorf/DuesseldorfCleaningConversionLift";
import { DuesseldorfCleaningBuyerJourney } from "@/components/duesseldorf/DuesseldorfCleaningBuyerJourney";
import { DuesseldorfCleaningDecisionGuide } from "@/components/duesseldorf/DuesseldorfCleaningDecisionGuide";
import { SearchIntentExpansion } from "@/components/seo/SearchIntentExpansion";
import { AiAnswerBlock } from "@/components/ai-answer";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { buildFaqJsonLd } from "@/lib/structured-data";

type ServicePageProps = {
  path?: string;
  metaDescription?: string;
  kicker: string;
  title: string;
  description: string;
  contentSections?: readonly {
    title: string;
    paragraphs: readonly string[];
  }[];
  bullets: readonly string[];
  localFocus: readonly string[];
  priceLogic?: readonly string[];
  faqItems?: readonly { q: string; a: string }[];
  relatedLinks?: readonly { href: string; label: string }[];
  boundaryText?: string;
  serviceLabel?: string;
  customerIntentItems?: readonly {
    searchPhrase: string;
    title: string;
    answer: string;
    href: string;
    cta: string;
    signal?: string;
  }[];
  requestFieldItems?: readonly {
    field: string;
    title: string;
    text: string;
  }[];
  snippetAnswerItems?: readonly {
    query: string;
    title: string;
    answer: string;
    href: string;
    cta?: string;
    signals?: readonly string[];
  }[];
};

const fallbackRelatedLinks = [
  { href: "/duesseldorf/reinigungsfirma", label: "Reinigungsfirma Düsseldorf" },
  { href: "/duesseldorf/kurzfristige-reinigung", label: "Kurzfristige Reinigung prüfen" },
  { href: "/duesseldorf/hausverwaltung-reinigung", label: "Hausverwaltung-Reinigung planen" },
  { href: "/duesseldorf/schluesseluebergabe-reinigung", label: "Schlüsselübergabe-Reinigung anfragen" },
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf anfragen" },
  { href: "/duesseldorf/putzfirma", label: "Putzfirma Düsseldorf prüfen" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung prüfen" },
  { href: "/duesseldorf/reinigungskraft-buero", label: "Reinigungskraft Büro planen" },
  { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhaltsreinigung planen" },
  { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung prüfen" },
  { href: "/duesseldorf/objektreinigung", label: "Objektreinigung planen" },
  { href: "/duesseldorf/ladenreinigung", label: "Ladenreinigung prüfen" },
  { href: "/duesseldorf/sonderreinigung", label: "Sonderreinigung prüfen" },
  { href: "/duesseldorf/b2b-reinigung", label: "Firmenreinigung planen" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung einschätzen" },
  { href: "/duesseldorf/reinigung-nach-renovierung", label: "Nach Renovierung reinigen" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil prüfen" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
  { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot vergleichen" },
  { href: "/reinigungsfirma-angebot", label: "Neues Reinigungsangebot anfragen" },
  { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung anfragen" },
  { href: "/duesseldorf/entsorgung", label: "Entsorgung separat prüfen" },
];

const heroProofItems = [
  {
    Icon: Camera,
    title: "Fotos reichen zum Start",
    text: "Objekt, Fläche, Stadtteil und Zustand senden.",
  },
  {
    Icon: Clock3,
    title: "Zeitfenster sauber klären",
    text: "Einmalig, regelmäßig, vor Öffnung oder nach Feierabend.",
  },
  {
    Icon: ShieldCheck,
    title: "Klare Prüfung",
    text: "Leistung, Umfang und Grenzen werden vor einer Zusage sauber eingeordnet.",
  },
] as const;

const serviceConfidenceItems = [
  {
    Icon: MapPin,
    title: "Stadtteil zuerst",
    text: "PLZ, Etage, Parken und Zugang machen die Rückmeldung konkreter.",
  },
  {
    Icon: Camera,
    title: "Fotos sparen Zeit",
    text: "Bilder von Zustand, Laufwegen und Flächen reduzieren Rückfragen.",
  },
  {
    Icon: Banknote,
    title: "Budget offen nennen",
    text: "Preisrahmen hilft bei der Einordnung, ist aber keine Zusage.",
  },
  {
    Icon: Clock3,
    title: "Termin ehrlich prüfen",
    text: "Kurzfristige Einsätze werden nach Kapazität und Umfang bewertet.",
  },
] as const;

const clickIntentIcons = [MapPin, Clock3, Banknote, Camera, MessageCircle] as const;

const internationalLanguageLabels: Record<SearchIntentAliasLanguage, string> = {
  en: "Englisch",
  ru: "Russisch",
  zh: "Chinesisch",
  ko: "Koreanisch",
};

function htmlLangForAlias(language: SearchIntentAliasLanguage) {
  return language === "zh" ? "zh-Hans" : language;
}

function getLanguageHelpText(language: SearchIntentAliasLanguage) {
  switch (language) {
    case "en":
      return "Sie können die wichtigsten Eckdaten auch auf Englisch senden. Für die Rückmeldung zählen Ort, Objekt, Fläche, Fotos und Termin.";
    case "ru":
      return "Wenn die Anfrage auf Russisch vorbereitet wird, helfen kurze Angaben zu Objekt, Zustand, Zugang, Fotos und gewünschtem Ergebnis.";
    case "zh":
      return "Auch bei chinesischer Kurzbeschreibung bleibt der Ablauf einfach: Adresse, Objektart, Fotos, Termin und Kontaktweg senden.";
    case "ko":
      return "Bei koreanischer Anfrage reichen die wichtigsten Daten zum Objekt, zur Fläche, zum Zeitfenster und zum gewünschten Ergebnis.";
  }
}

function getDuesseldorfRelatedText(item: { href: string; label: string }) {
  const href = item.href.toLowerCase();
  const label = item.label.toLowerCase();

  if (href.includes("bueroreinigung") || href.includes("reinigungskraft-buero") || label.includes("büro")) {
    return "Für Büros, Agenturen und Kanzleien mit Raumliste, Küche, Sanitär, Randzeiten, Schlüsselweg und Ansprechpartner.";
  }

  if (href.includes("gewerbereinigung") || href.includes("b2b-reinigung") || href.includes("firmenreinigung")) {
    return "Für Gewerbeflächen, Firmenbereiche, Ladenflächen oder Arbeitsbereiche, wenn Nutzung, Turnus und Zugang den Aufwand bestimmen.";
  }

  if (href.includes("praxisreinigung") || href.includes("kanzleireinigung")) {
    return "Für Praxis- oder Kanzleiflächen, wenn Öffnungszeiten, sensible Bereiche, Zugang, Fotos und ein verlässlicher Turnus wichtig sind.";
  }

  if (href.includes("gebaeudereinigung") || href.includes("objektreinigung")) {
    return "Für Gebäude mit Eingang, Etagen, Fluren, Sanitär, Büroflächen oder Treppenhaus, wenn mehrere Bereiche zusammen betrachtet werden sollen.";
  }

  if (href.includes("hausverwaltung") || href.includes("treppenhaus")) {
    return "Für Hausverwaltung, WEG oder Vermieter mit Eingang, Treppenhaus, Kellerflur, Beschwerden, Turnus und Schlüsselweg.";
  }

  if (href.includes("grundreinigung") || href.includes("sonderreinigung") || href.includes("renovierung")) {
    return "Für stärkere Verschmutzung, Leerstand, Renovierung oder Mieterwechsel, wenn normale Unterhaltsreinigung nicht ausreicht.";
  }

  if (href.includes("endreinigung") || href.includes("schluesseluebergabe")) {
    return "Für Auszug, Besichtigung oder Übergabe, wenn Küche, Bad, Böden, Restpunkte, Schlüsselweg und Deadline zählen.";
  }

  if (href.includes("fensterreinigung") || href.includes("teppichreinigung")) {
    return "Für Glas, Rahmen, Teppich oder Polster nach Fläche, Material, Zugang, Etage, Zustand und gewünschtem Termin.";
  }

  if (href.includes("angebot") || href.includes("vielleicht-guenstiger")) {
    return "Für vorhandene Reinigungsangebote, wenn Umfang, Turnus, Zusatzpunkte, Fotos und Preisrahmen sachlich geprüft werden sollen.";
  }

  if (href.includes("entsorgung")) {
    return "Für kleinere Restmengen, Möbel oder Kellerinhalt, die vor oder nach der Reinigung getrennt geklärt werden müssen.";
  }

  if (href.includes("wohnungsreinigung") || href.includes("moeblierte")) {
    return "Für Wohnung, Apartment oder möblierte Fläche mit Räumen, Zustand, Fotos, Zugang, Termin und gewünschtem Ergebnis.";
  }

  return `Für ${item.label}, wenn Objekt, Umfang, Zustand, Fotos und Termin konkret beschrieben werden sollen.`;
}

function buildDuesseldorfServiceSummary(serviceLabel: string, path: string) {
  const href = path.toLowerCase();

  if (href.includes("gewerbereinigung") || href.includes("b2b-reinigung") || href.includes("firmenreinigung")) {
    return "FLOXANT Düsseldorf prüft gewerbliche Reinigung nach Objektart, Fläche, Nutzung, Turnus, Randzeit, Zugang und Fotos. So lässt sich klären, ob Büro, Praxis, Ladenfläche, Treppenhaus oder ein gemischtes Objekt passend eingeordnet werden kann.";
  }

  if (href.includes("bueroreinigung") || href.includes("reinigungskraft-buero")) {
    return "FLOXANT Düsseldorf prüft Büroreinigung nach Raumliste, Arbeitszeiten, Küche, Sanitär, Boden, Schlüsselweg und gewünschtem Turnus. Fotos und ein kurzer Preisrahmen helfen, schnell zu erkennen, ob eine laufende oder einmalige Reinigung sinnvoll ist.";
  }

  if (href.includes("praxisreinigung") || href.includes("kanzleireinigung")) {
    return "FLOXANT Düsseldorf prüft Praxis- und Kanzleiflächen mit Blick auf Öffnungszeiten, Wartebereich, Nebenräume, Sanitär, Zugang und Fotos. Es geht um eine realistische Reinigung der zugänglichen Flächen ohne pauschale Spezialversprechen.";
  }

  if (href.includes("hausverwaltung") || href.includes("treppenhaus")) {
    return "FLOXANT Düsseldorf unterstützt Hausverwaltungen, WEGs und Vermieter bei Reinigungsanfragen rund um Eingang, Treppenhaus, Kellerflur, Aufzug, Müllbereich und Beschwerden. Wichtig sind Objektadresse, Turnus, Zugang, Fotos und Ansprechpartner.";
  }

  if (href.includes("endreinigung") || href.includes("schluesseluebergabe")) {
    return "FLOXANT Düsseldorf prüft Endreinigung und Übergabereinigung für Auszug, Leerstand, Besichtigung oder Schlüsseltermin. Entscheidend sind Räume, Zustand, Fotos, Deadline, Zugang und der gewünschte Übergabezustand.";
  }

  return `FLOXANT prüft ${serviceLabel} in Düsseldorf nach Objektart, Fläche, Zustand, Zugang, Termin und Fotos. Ziel ist eine klare Rückmeldung, welche Reinigung sinnvoll ist und welche Angaben für ein belastbares Angebot noch fehlen.`;
}

type ServiceSituationCard = {
  title: string;
  text: string;
  href: string;
  cta: string;
};

function buildServiceSituationCards(serviceLabel: string, path: string): ServiceSituationCard[] {
  const href = path.toLowerCase();

  if (href.includes("praxisreinigung")) {
    return [
      {
        title: "Praxisflächen ohne Störung anfragen",
        text: "Für Empfang, Wartebereich, Nebenräume, Sanitär und Teamflächen zählen Öffnungszeiten, Zugang, Raumliste und ein Zeitfenster, das zum Praxisbetrieb passt.",
        href: "/duesseldorf/praxisreinigung#anfrage-checkliste",
        cta: "Praxisdaten senden",
      },
      {
        title: "Turnus und Randzeiten klären",
        text: "Ob wöchentlich, mehrmals pro Woche oder nach Absprache: FLOXANT prüft den sinnvollen Rhythmus anhand von Fläche, Nutzung, Fotos und Ansprechpartner.",
        href: "/duesseldorf/unterhaltsreinigung",
        cta: "Turnus prüfen",
      },
      {
        title: "Vorhandenes Praxisangebot einordnen",
        text: "Wenn bereits ein Angebot vorliegt, helfen Preis, Leistungsumfang, Turnus, Raumliste, Zugang und Fotos für eine sachliche zweite Einschätzung.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Angebot prüfen",
      },
    ];
  }

  if (href.includes("hausverwaltung") || href.includes("treppenhaus")) {
    return [
      {
        title: "Treppenhaus und Eingang sauber planen",
        text: "Etagen, Eingangsbereich, Aufzug, Kellerflur, Müllbereich, Turnus, Schlüsselweg und Fotos machen die Anfrage für Hausverwaltung oder WEG konkret.",
        href: "/duesseldorf/treppenhausreinigung",
        cta: "Bereiche nennen",
      },
      {
        title: "Beschwerden nachvollziehbar klären",
        text: "Wenn Mieter oder Eigentümer bestimmte Stellen melden, helfen Fotos und eine kurze Bereichsliste. So wird nicht pauschal gereinigt, sondern gezielt geprüft.",
        href: "/duesseldorf/hausverwaltung-reinigung#anfrage-checkliste",
        cta: "Objekt prüfen",
      },
      {
        title: "Objektwechsel oder Übergabe vorbereiten",
        text: "Bei Auszug, Leerstand oder Neuvermietung können Endreinigung, Schlüsselweg und kleine Restpunkte getrennt eingeordnet werden.",
        href: "/duesseldorf/endreinigung",
        cta: "Übergabe planen",
      },
    ];
  }

  if (
    href.includes("bueroreinigung") ||
    href.includes("firmenreinigung") ||
    href.includes("gewerbereinigung") ||
    href.includes("b2b-reinigung") ||
    href.includes("hotelreinigung")
  ) {
    return [
      {
        title: "Gewerbefläche mit Raumliste anfragen",
        text: "Büro, Firma, Praxis, Laden, Hotel oder gemischte Fläche: Raumliste, Sanitär, Küche, Boden, Glas, Turnus, Randzeit und Zugang direkt mitschicken.",
        href: "/duesseldorf/gewerbereinigung#anfrage-checkliste",
        cta: "Fläche beschreiben",
      },
      {
        title: "Büroreinigung im Arbeitsalltag einplanen",
        text: "Für Büros zählen Nutzungszeiten, Schlüsselweg, Ansprechpartner, Reinigung nach Feierabend und klare Rückmeldung, damit der Betrieb nicht gestört wird.",
        href: "/duesseldorf/bueroreinigung",
        cta: "Büro prüfen",
      },
      {
        title: "Angebot und Budget sachlich vergleichen",
        text: "Ein Preis ist erst verständlich, wenn Turnus, Fläche, Zusatzpunkte, Fotos und Zeitfenster zusammen betrachtet werden. FLOXANT prüft ohne Preisgarantie.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Angebot prüfen",
      },
    ];
  }

  return [
    {
      title: `${serviceLabel} konkret vorbereiten`,
      text: "Nennen Sie Objektart, Stadtteil oder PLZ, Fläche, Zustand, Termin und gewünschtes Ergebnis. Fotos machen die Rückmeldung deutlich schneller.",
      href: `${path}#anfrage-checkliste`,
      cta: "Angaben senden",
    },
    {
      title: "Budget oder vorhandenes Angebot nutzen",
      text: "Wenn Sie bereits einen Preisrahmen oder ein Angebot haben, kann FLOXANT Umfang, Fotos, Turnus und offene Punkte sachlich einordnen.",
      href: "/duesseldorf/vielleicht-guenstiger",
      cta: "Budget prüfen",
    },
    {
      title: "Passende Reinigungsart finden",
      text: "Wohnung, Büro, Praxis, Treppenhaus, Grundreinigung oder Endreinigung werden nicht vermischt. Die Anfrage wird nach Objekt und Ziel sauber zugeordnet.",
      href: "/duesseldorf/reinigung-stadtteile-umgebung",
      cta: "Leistung wählen",
    },
  ];
}

function buildDefaultFaqItems(serviceLabel: string, title: string) {
  return [
    {
      q: `Was kostet ${serviceLabel} in Düsseldorf?`,
      a: `Der Preis hängt von Fläche, Zustand, Objektart, Stadtteil, Zugang, Termin und gewünschtem Ergebnis ab. Für ${title} hilft ein kurzer Preisrahmen, damit FLOXANT die Machbarkeit ehrlich einordnen kann.`,
    },
    {
      q: "Welche Angaben beschleunigen die Rückmeldung?",
      a: "Senden Sie Objektart, Düsseldorfer Stadtteil oder PLZ, Fläche, Terminwunsch, Zugang, Fotos und bei Bedarf Ihr Budget. Je klarer diese Angaben sind, desto schneller kann der Auftrag geprüft werden.",
    },
    {
      q: "Kann ich einfach Fotos per WhatsApp senden?",
      a: "Ja. Fotos vom Zustand, Zugang, Boden, Küche, Bad, Nebenflächen oder Gewerbebereich helfen sehr. Die Anfrage bleibt unverbindlich, bis Umfang, Termin und Leistung bestätigt sind.",
    },
    {
      q: "Ist die Anfrage verbindlich?",
      a: "Nein. Die Anfrage dient der ersten Prüfung. Verbindlich wird ein Auftrag erst, wenn Umfang, Termin, Zugang und Leistung abgestimmt sind.",
    },
  ];
}

function getVisibleIntentLabel(item: { searchPhrase: string; signal?: string }) {
  if (item.signal) return item.signal;
  if (/kosten|preis|angebot/i.test(item.searchPhrase)) return "Angebot & Kosten";
  if (/heute|morgen|kurzfristig|schnell|termin/i.test(item.searchPhrase)) return "Kurzfristig";
  if (/schlüssel|nicht vor ort|übergabe|auszug/i.test(item.searchPhrase)) return "Zugang & Übergabe";
  if (/hausverwaltung|weg|treppenhaus/i.test(item.searchPhrase)) return "Hausverwaltung";
  if (/büro|praxis|firma|gewerbe|hotel|kanzlei/i.test(item.searchPhrase)) return "Gewerbe";
  if (/wohnung|apartment|putzfirma/i.test(item.searchPhrase)) return "Wohnung";
  return "Kontaktweg";
}

function getRecommendationLabel(intent: string) {
  if (/kosten|preis|angebot|vergleich/i.test(intent)) return "Angebot prüfen";
  if (/heute|morgen|kurzfristig|schnell/i.test(intent)) return "Termin dringend";
  if (/schlüssel|nicht vor ort|übergabe|auszug|besichtigung/i.test(intent)) return "Nicht vor Ort";
  if (/hausverwaltung|weg|mieter|treppenhaus|gebäude/i.test(intent)) return "Hausverwaltung";
  if (/büro|firma|gewerbe|kanzlei|praxis|hotel/i.test(intent)) return "Gewerbe";
  if (/stadtteil|nähe|neuss|ratingen|meerbusch|altstadt|pempelfort/i.test(intent)) return "Ort & Zugang";
  if (/wohnung|putzfirma|putzservice|reinigungsfirma/i.test(intent)) return "Wohnung oder Büro";
  if (/umzug|transport|büroumzug/i.test(intent)) return "Falscher Bereich";
  return "Passender Fall";
}

export function DuesseldorfServicePage({
  path = "/duesseldorf/reinigung",
  metaDescription,
  kicker,
  title,
  description,
  contentSections = [],
  bullets,
  localFocus,
  priceLogic = [],
  faqItems = [],
  relatedLinks = [],
  boundaryText = "Düsseldorf ist bei FLOXANT klar auf Reinigung, Entsorgung und objektbezogene Anfragen ausgerichtet. Entscheidend sind Objektart, Ort, Umfang, Zugang und Zeitfenster.",
  serviceLabel = "Reinigung",
  customerIntentItems = [],
  requestFieldItems = [],
  snippetAnswerItems: customSnippetAnswerItems = [],
}: ServicePageProps) {
  const visibleLinks = relatedLinks.length > 0 ? relatedLinks : fallbackRelatedLinks;
  const isCommercialIntent = /B2B|Büro|Firma|Gewerbe|Kanzlei|Praxis|Hotel|Krankenhaus/i.test(serviceLabel);
  const whatsappMessage = `Hallo FLOXANT Reinigung Düsseldorf, ich möchte ${title} anfragen. Objektart, Stadtteil, Fläche, Turnus/Zeitfenster und Fotos kann ich senden.`;
  const activeFaqItems = faqItems.length > 0 ? faqItems : buildDefaultFaqItems(serviceLabel, title);
  const internationalSearchAliases = getDuesseldorfCleaningInternationalAliases();
  const serviceSnippetAnswerItems =
    customSnippetAnswerItems.length > 0
      ? customSnippetAnswerItems
      : DUESSELDORF_CLEANING_SNIPPET_ANSWERS.slice(0, 4);
  const serviceClickIntentItems =
    customerIntentItems.length > 0
      ? customerIntentItems
      : DUESSELDORF_CLEANING_CLICK_INTENTS.slice(0, 5);
  const serviceRequestFields =
    requestFieldItems.length > 0 ? requestFieldItems : DUESSELDORF_CLEANING_REQUEST_FIELDS;
  const quickAnswers = [
    {
      Icon: Banknote,
      title: "Preis nur realistisch mit Zustand",
      text: `Für ${serviceLabel} zählen Fläche, Verschmutzung, Zugang, Termin und Ziel. Ein Budget ist willkommen, aber keine automatische Zusage.`,
    },
    {
      Icon: Camera,
      title: "Fotos machen die Anfrage schneller",
      text: "Bilder von Räumen, Boden, Küche, Bad, Zugang oder Objektflächen sparen Rückfragen und verbessern die erste Einschätzung.",
    },
    {
      Icon: MessageCircle,
      title: "Direkt per WhatsApp möglich",
      text: "Kurz Stadtteil, Fläche, Zeitfenster und Fotos senden. FLOXANT prüft, ob der Auftrag in Düsseldorf machbar ist.",
    },
  ] as const;
  const snippetAnswerItems = [
    {
      title: `Wann passt ${serviceLabel} in Düsseldorf?`,
      text: `Wenn Objektart, Stadtteil, Fläche, Zustand, Termin und gewünschtes Ergebnis klar beschrieben werden können, lässt sich ${serviceLabel} deutlich schneller prüfen.`,
    },
    {
      title: "Welche Angaben sparen Zeit?",
      text: "PLZ oder Stadtteil, Raum- oder Flächenangabe, Fotos, Zugang, Zeitfenster, Ansprechpartner und ein möglicher Preisrahmen machen die erste Rückmeldung belastbarer.",
    },
    {
      title: "Warum keine Sofort-Pauschale?",
      text: "Reinigung hängt stark von Zustand, Material, Nutzung und Anspruch ab. FLOXANT prüft lieber realistisch, bevor ein Preis falsche Erwartungen erzeugt.",
    },
  ] as const;
  const decisionItems = [
    {
      title: `Passt ${serviceLabel} zu meiner Anfrage?`,
      text: `Ja, wenn es um Reinigung oder Entsorgung in Düsseldorf geht und Objektart, Stadtteil, Fläche, Zustand, Termin und Ziel kurz beschrieben werden können.`,
      href: "#kontakt",
      cta: "Anfrage richtig senden",
      external: false,
    },
    {
      title: "Wie bekomme ich schneller Rückmeldung?",
      text: "Am besten mit Fotos, PLZ oder Stadtteil, Flächenangabe, Zugang, Zeitfenster, Ansprechpartner und einem realistischen Preisrahmen.",
      href: buildDuesseldorfCleaningWhatsAppHref(whatsappMessage),
      cta: "WhatsApp vorbereiten",
      external: true,
    },
    {
      title: "Wo prüfe ich Kosten oder ein vorhandenes Angebot?",
      text: "Wenn Sie schon einen Preis, ein Angebot oder eine Budgetgrenze haben, führt die Angebotsprüfung schneller zur passenden Einordnung.",
      href: "/duesseldorf/vielleicht-guenstiger",
      cta: "Kosten/Budget prüfen",
      external: false,
    },
  ] as const;
  const mobileShortcutItems = [
    { href: "#schnell-entscheiden", label: "Passt?", note: "Weg wählen" },
    { href: "#anfrage-checkliste", label: "Senden", note: "Angaben" },
    { href: "#kontakt", label: "Kontakt", note: "Fotos senden" },
    { href: "/duesseldorf/vielleicht-guenstiger", label: "Kosten?", note: "Budget prüfen" },
  ] as const;
  const jsonLd = buildDuesseldorfCleaningSchema({
    path,
    title,
    description: metaDescription || description,
    serviceLabel,
    relatedLinks: visibleLinks,
    requestFieldItems: serviceRequestFields,
    clickIntentItems: serviceClickIntentItems,
    snippetAnswerItems: serviceSnippetAnswerItems,
  });
  const faqJsonLd = buildFaqJsonLd(activeFaqItems);
  const pathSegments = path.split("/").filter(Boolean);
  const serviceSlug = pathSegments[pathSegments.length - 1] || "reinigung";
  const leadService =
    serviceSlug.includes("praxisreinigung")
      ? "praxisreinigung"
      : serviceSlug.includes("fensterreinigung") || serviceSlug.includes("glas")
      ? "fensterreinigung"
      : serviceSlug.includes("bueroreinigung") || serviceSlug.includes("buero") || serviceSlug.includes("b2b")
      ? "bueroreinigung"
      : serviceSlug.includes("gewerbe") || serviceSlug.includes("firma")
        ? "gewerbereinigung"
        : "reinigung";
  const leadIntent = serviceSlug.includes("b2b")
    ? "b2b-bueroreinigung-duesseldorf"
    : `${leadService}-duesseldorf`;
  const leadPriority =
    leadService === "bueroreinigung" || leadService === "praxisreinigung" || leadService === "fensterreinigung"
      ? "p0"
      : "p1";
  const customerSectionServices = [
    {
      title: `${serviceLabel} anfragen`,
      text: description,
      href: path,
    },
    ...visibleLinks.slice(0, 5).map((item) => ({
      title: item.label,
      text: getDuesseldorfRelatedText(item),
      href: item.href,
    })),
  ];
  const serviceSituationCards = buildServiceSituationCards(serviceLabel, path);

  return (
    <main className="overflow-x-clip px-4 pb-28 pt-10 sm:px-6 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        <section className="duesseldorf-service-hero overflow-hidden rounded-[1rem] border border-white/10 px-5 py-8 text-white shadow-[0_24px_70px_rgba(7,17,29,0.24)] sm:px-7 md:px-9 md:py-10">
          <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
            {kicker}
          </div>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.05rem,4.6vw,4.1rem)] font-bold leading-[1.04] tracking-normal">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100">
            {description}
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {heroProofItems.map(({ Icon, title: itemTitle, text }) => (
              <div
                key={itemTitle}
                className="flex min-h-[5.5rem] gap-3 rounded-[0.85rem] border border-white/12 bg-white/8 px-4 py-3"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-200" />
                <div>
                  <div className="text-sm font-black text-white">{itemTitle}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-200">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LeadCta
              service={leadService}
              city="duesseldorf"
              intent={leadIntent}
              priority={leadPriority}
              label={`${serviceLabel} anfragen`}
              source="duesseldorf_service_hero"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.8rem] bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              {serviceLabel} anfragen
              <ArrowRight className="h-4 w-4" />
            </LeadCta>
            <a
              href={buildDuesseldorfCleaningWhatsAppHref(
                `Hallo FLOXANT Reinigung Düsseldorf, ich interessiere mich für ${title}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.8rem] border border-emerald-200/80 bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_14px_30px_rgba(5,150,105,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
              data-event="seo_cta_click"
              data-service="reinigung"
              data-city="duesseldorf"
              data-page-intent={serviceLabel}
              data-priority="p1"
              data-cta-label="WhatsApp mit Fotos senden"
              data-contact-channel="whatsapp"
              data-region="duesseldorf"
            >
              WhatsApp mit Fotos senden
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="#kunden-suchen"
              className="inline-flex min-h-12 items-center justify-center rounded-[0.8rem] border border-cyan-100/35 bg-cyan-200/16 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-200/24"
              data-event="service_card_click"
              data-region="duesseldorf"
            >
              Passenden Fall finden
            </Link>
          </div>
        </section>

        <ServicePageCustomerSections
          region="duesseldorf"
          city="Düsseldorf"
          path={path}
          serviceSlug={serviceSlug}
          serviceLabel={serviceLabel}
          audience="Kunden, Unternehmen, Praxen, Verwaltungen und private Auftraggeber"
          summary={buildDuesseldorfServiceSummary(serviceLabel, path)}
          services={customerSectionServices}
          relatedLinks={visibleLinks}
          offerCheckHref="/angebot-vergleichen-duesseldorf"
          className="pt-6"
        />

        <InternationalCustomerHint
          cityLabel="Düsseldorf"
          serviceLabel={serviceLabel}
          tags={
            isCommercialIntent
              ? ["Office cleaning", "Commercial cleaning", "Cleaning company", "Cleaning service"]
              : ["Cleaning service", "Apartment cleaning", "End of tenancy cleaning", "Cleaning company"]
          }
          primaryHref="/duesseldorf/reinigung#kontakt"
          photoHref="/duesseldorf/reinigung#kontakt"
          offerHref="/angebot-vergleichen-duesseldorf"
          className="mt-6 rounded-[0.95rem] border border-slate-200"
        />

        <AiAnswerBlock
          eyebrow="Duesseldorf Antwort"
          title={`${serviceLabel}: was fuer eine schnelle Einschaetzung zaehlt.`}
          answer="FLOXANT kann Duesseldorfer Reinigungsanfragen besser einordnen, wenn Objekt, Stadtteil, Flaeche, Zustand, Zugang und Fotos frueh sichtbar sind."
          points={[
            "Der Stadtteil hilft bei Terminfenster, Anfahrt und realistischen Rueckfragen.",
            "Fotos zeigen Zustand, Flaeche und besondere Stellen schneller als lange Beschreibungen.",
            "Vorhandene Angebote koennen nach Umfang, Zusatzpositionen und Annahmen geprueft werden.",
            "Bei Bueros, Praxen und Gewerbeflaechen zaehlen Turnus, Uhrzeit und Zugang besonders stark.",
          ]}
          usefulWhen={["Fotos oder Angebot vorliegen", "Turnus oder Flaeche noch unsicher sind", "ein schneller naechster Schritt gebraucht wird"]}
          notUsefulWhen={["eine feste Preisgarantie erwartet wird", "ohne Objektangaben sofort gebucht werden soll"]}
          neededInfo={["Stadtteil", "Flaeche", "Fotos", "Terminfenster"]}
        />

        <RelatedSpecialServices
          kind="cleaning"
          title={`Spezialservices passend zu ${serviceLabel} in Duesseldorf.`}
          intro="Wenn Glas, Fassade, PV, Event, Uebergabe oder Gewerbeflaechen Teil des Falls sind, helfen diese Spezialwege bei Umfang, Fotos, Zugang und Termin."
          limit={4}
          className="mt-6 rounded-[0.95rem] border border-slate-200"
        />

        <SignatureServicesGrid
          title="Signature Services fuer Duesseldorfer Reinigungsfaelle."
          intro="Angebotscheck, Objektbrief, Plan B, PV-Sichtklar und Buero-Startklar machen aus unklaren Reinigungsanfragen einen konkreteren naechsten Schritt."
          limit={4}
          className="mt-6 rounded-[0.95rem]"
        />

      <OfferCheckCTA
        title={`Reinigungsangebot fuer ${serviceLabel} schon vorhanden?`}
        text="FLOXANT prueft vorhandene Angebote nach Flaeche, Turnus, Zusatzpositionen, Zugang, Fotos und Zeitfenster. Keine Preisgarantie, keine Anbieter-Diffamierung."
        href="/angebot-vergleichen-duesseldorf"
        className="mt-6 rounded-[0.95rem]"
      />

        <section className="grid gap-4 pt-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Typische Kundensituationen
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              {serviceLabel} in Düsseldorf verständlich anfragen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Kunden brauchen keine perfekte Fachsprache. Wichtig sind Objekt, Fläche,
              Nutzung, Zustand, Fotos, Zugang, Termin und ein Ansprechpartner. Daraus wird
              eine klare Reinigungsanfrage statt ein ungenauer Preisvergleich.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-3">
            {serviceSituationCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group min-w-0 rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <nav
          aria-label="Schnelle Auswahl für Düsseldorfer Reinigungsanfragen"
          className="mt-3 grid grid-cols-4 gap-2 md:hidden"
        >
          {mobileShortcutItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[0.75rem] border border-slate-200 bg-white px-3 py-3 text-center shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
            >
              <span className="block text-xs font-black text-slate-950">{item.label}</span>
              <span className="mt-1 block text-[10px] font-semibold leading-4 text-slate-600">
                {item.note}
              </span>
            </Link>
          ))}
        </nav>

        <DuesseldorfCleaningConversionLift serviceLabel={serviceLabel} compact />
        <DuesseldorfCleaningBuyerJourney
          serviceLabel={serviceLabel}
          compact
          focusHrefs={[path, ...visibleLinks.map((link) => link.href)]}
        />
        <DuesseldorfCleaningDecisionGuide
          serviceLabel={serviceLabel}
          compact
          focusHrefs={[path, ...visibleLinks.map((link) => link.href), "/duesseldorf/vielleicht-guenstiger"]}
        />

        <section className="grid gap-3 pt-6 md:grid-cols-4">
          {serviceConfidenceItems.map(({ Icon, title: itemTitle, text }) => (
            <article
              key={itemTitle}
              className="min-w-0 rounded-[0.85rem] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[0.7rem] border border-teal-100 bg-teal-50 text-teal-700">
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="mt-3 text-base font-black tracking-normal text-slate-950">
                {itemTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 pt-6 md:grid-cols-3">
          {quickAnswers.map(({ Icon, title: itemTitle, text }) => (
            <article
              key={itemTitle}
              className="rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-lg font-black tracking-normal text-slate-950">
                {itemTitle}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 pt-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Kurzantwort für Kunden
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              {serviceLabel} in Düsseldorf realistisch anfragen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Diese Seite soll schnell beantworten, ob Ihre Anfrage passt, welche Angaben
              FLOXANT braucht und warum Fotos, Stadtteil und Preisrahmen die Einschätzung
              beschleunigen.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-3">
            {snippetAnswerItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="kunden-suchen" className="grid gap-4 pt-6 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Häufige Kundensituationen
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Wann {serviceLabel} in Düsseldorf angefragt wird
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Oft geht es um einen konkreten Anlass: ein neuer Turnus, eine Übergabe,
              ein kurzfristiger Termin, Fotos vom Objekt oder ein vorhandenes Angebot.
              Diese Wege helfen, die Anfrage direkt richtig einzuordnen.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {serviceClickIntentItems.map((item, index) => {
              const Icon = clickIntentIcons[index % clickIntentIcons.length] || CheckCircle2;

              return (
                <Link
                  key={item.searchPhrase}
                  href={item.href}
                  className="group min-w-0 rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]"
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[0.7rem] border border-teal-100 bg-teal-50 text-teal-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="mt-3 text-[11px] font-black uppercase tracking-normal text-teal-700">
                    {getVisibleIntentLabel(item)}
                  </div>
                  <h3 className="mt-2 text-base font-black tracking-normal text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="schnell-entscheiden" className="grid gap-4 pt-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Vor der Anfrage
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Schnell erkennen, welcher Weg für {serviceLabel} passt
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Für eine erste Einordnung reichen meist Ort, Objektart, gewünschter Umfang,
              Zeitfenster und Fotos. Danach lässt sich klären, ob Formular, WhatsApp,
              Telefon oder Angebotsprüfung der beste nächste Schritt ist.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-3">
            {decisionItems.map((item) => {
              const className =
                "group min-w-0 rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]";
              const content = (
                <>
                  <CheckCircle2 className="h-5 w-5 text-teal-700" />
                  <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </>
              );

              return item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={className}
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section id="anfrage-checkliste" className="grid gap-4 pt-6 lg:grid-cols-[0.76fr_1.24fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.14)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
              Anfrage in 60 Sekunden vorbereiten
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              Was FLOXANT für {serviceLabel} in Düsseldorf zuerst braucht
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Je klarer Ort, Objekt, Fläche, Fotos und Zeitfenster sind, desto schneller
              lässt sich einschätzen, ob FLOXANT die Anfrage passend übernehmen kann.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={buildDuesseldorfCleaningWhatsAppHref(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                data-event="whatsapp_click"
                data-region="duesseldorf"
              >
                Angaben per WhatsApp senden
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#kontakt"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-white/15 bg-white/10 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                data-event="hero_cta_click"
                data-region="duesseldorf"
              >
                Kontaktwege öffnen
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {serviceRequestFields.map((item, index) => (
              <article
                key={item.field}
                className="rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-[0.7rem] border border-teal-100 bg-teal-50 px-3 py-2 text-[11px] font-black uppercase tracking-normal text-teal-800">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-teal-700" />
                </div>
                <div className="mt-4 text-[11px] font-black uppercase tracking-normal text-teal-700">
                  {item.field}
                </div>
                <h3 className="mt-2 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 pt-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Vor der Anfrage
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Antworten, die vor der Anfrage helfen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Kurze, klare Antworten machen schon vor dem Kontakt verständlich, welche
              Angaben wichtig sind und welcher nächste Schritt zur Situation passt.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {serviceSnippetAnswerItems.map((item, index) => (
              <Link
                key={item.query}
                href={item.href}
                className="group min-w-0 rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                  Antwort {index + 1}
                </div>
                <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  Passende Seite öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 pt-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Passt FLOXANT?
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Wann FLOXANT für diese Reinigung in Düsseldorf passt
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Wenn Ort, Objektart, Fläche, Zustand, Fotos und Termin klar sind, können
              wir den Auftrag besser einschätzen. Wichtig sind außerdem Turnus, Zugang,
              Ansprechpartner und gewünschtes Zeitfenster.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {DUESSELDORF_CLEANING_AI_RECOMMENDATIONS.slice(0, 4).map((item) => (
              <Link
                key={item.intent}
                href={item.href}
                className="group min-w-0 rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                  {getRecommendationLabel(item.intent)}
                </div>
                <h3 className="mt-2 text-base font-black text-slate-950">
                  {item.recommendation}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  {item.nextStep}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="international-verstaendlich" className="grid gap-4 pt-6 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_16px_38px_rgba(15,23,42,0.12)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
              <Languages className="h-4 w-4" />
            </div>
            <div className="mt-4 text-[11px] font-black uppercase tracking-normal text-cyan-100">
              Auch mit kurzer Beschreibung verständlich
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-white">
              {serviceLabel} in Düsseldorf auch dann anfragen, wenn die Angaben noch knapp sind
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Wichtig ist nicht die perfekte Formulierung, sondern der Inhalt: Ort, Objekt,
              Fläche, Zustand, Fotos, Termin und gewünschter Kontaktweg. FLOXANT ordnet
              daraus die passende Rückfrage ein.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {internationalSearchAliases.map((alias) => (
              <article
                key={alias.language}
                className="min-w-0 rounded-[0.9rem] border border-slate-200 bg-white p-4"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                  {internationalLanguageLabels[alias.language]}
                </div>
                <p lang={htmlLangForAlias(alias.language)} className="mt-3 text-sm leading-7 text-slate-700">
                  {getLanguageHelpText(alias.language)}
                </p>
              </article>
            ))}
          </div>
        </section>

        {isCommercialIntent ? (
          <section className="grid gap-4 pt-6 lg:grid-cols-[1fr_0.92fr]">
            <article className="rounded-[0.95rem] border border-emerald-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">
                Schnelle Rückmeldung für Firmen
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
                Geschäftliche Reinigungsanfrage direkt prüfbar machen
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Für Hotels, Büros, Firmen, Kanzleien, Praxen und Gewerbeflächen zählt eine schnelle,
                belastbare Einordnung. Senden Sie Objektart, Düsseldorfer Stadtteil, Fläche,
                gewünschten Turnus, Zeitfenster und Fotos. So kann FLOXANT sauber prüfen,
                ob der Auftrag realistisch planbar ist und wie eine saubere Angebotsgrundlage entsteht.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={buildDuesseldorfCleaningWhatsAppHref(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                  data-event="whatsapp_click"
                  data-region="duesseldorf"
                >
                  Per WhatsApp anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-slate-800 bg-slate-950 px-5 text-sm font-black !text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                  data-event="hero_cta_click"
                  data-region="duesseldorf"
                  style={{ color: "#ffffff" }}
                >
                  Direkt Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4 text-white" />
                </a>
              </div>
            </article>

            <article className="rounded-[0.95rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                Was wir für ein Angebot brauchen
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  "Objektart: Hotel, Büro, Kanzlei, Praxis, Firma oder Gewerbe",
                  "Stadtteil, Fläche, Etagen, Zugang und Park-/Lieferzone",
                  "Turnus, gewünschtes Zeitfenster, Fotos und Ansprechpartner",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-[0.9rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </section>
        ) : null}

        <section className="grid gap-6 pt-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Düsseldorf konkret
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Düsseldorf sauber getrennt
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Diese Seite ist für {serviceLabel} in Düsseldorf aufgebaut. Entscheidend sind
              Objektart, Stadtteil, Fläche, gewünschte Häufigkeit, Zeitfenster, Zugang und
              Fotos. So bleibt die Anfrage bei der Düsseldorfer Reinigung und wird nicht mit
              Regensburger Umzug, Entrümpelung oder Haushaltsauflösung vermischt.
            </p>
          </article>

          <article className="overflow-hidden rounded-[0.95rem] border border-teal-100 bg-teal-50 p-6 sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-800">
              Lokale Einordnung
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Planung nach Stadtteil, Objekt und Zugang
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              In Düsseldorf verändern Innenstadtlage, Parkmöglichkeit, Hausordnung,
              Aufzug, Etage, Hinterhof, Lieferzone und Terminfenster den Aufwand deutlich.
              Deshalb wird nicht pauschal versprochen, sondern nach Objekt und Lage
              geprüft: Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, Derendorf,
              Flingern, MedienHafen und angrenzende Bereiche wie Neuss, Ratingen,
              Meerbusch, Mettmann und Duisburg werden sauber zugeordnet.
            </p>
          </article>
        </section>

        {contentSections.length > 0 ? (
          <section className="grid gap-6 pt-10 lg:grid-cols-2">
            {contentSections.map((section) => (
              <article
                key={section.title}
                className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7"
              >
                <h2 className="text-2xl font-bold tracking-normal text-slate-950">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </section>
        ) : null}

        <SearchIntentExpansion
          route="/duesseldorf/reinigung"
          city="Düsseldorf"
          serviceName={serviceLabel}
          market="duesseldorf"
          relatedLinks={visibleLinks}
          className="px-0 pt-10"
        />

        <TrustProofPanel
          allowedPage={path}
          serviceKey="reinigung"
          locationKey="duesseldorf"
          title={`Trust Proof fuer ${serviceLabel}`}
          intro="Diese lokale Reinigungsseite nutzt konkrete Anfragebelege statt erfundener Bewertungen: Objekt, Flaeche, Zustand, Fotos, Zugang und Termin."
          className="-mx-5 bg-white px-5 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
        />

        <ServiceProofChecklist
          serviceKey="reinigung"
          title={`Welche Angaben ${serviceLabel} belastbarer machen`}
          intro="FLOXANT kann die Anfrage besser einordnen, wenn lokale Eckdaten und sichtbare Objektinformationen zusammenkommen."
          className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
        />

        <ServiceVisualProofGrid
          serviceKey="reinigung"
          locationKey="duesseldorf"
          className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
        />

        <LocalProofPanel
          location="duesseldorf"
          className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
        />

        <section className="grid gap-6 pt-10 lg:grid-cols-[1.04fr_0.96fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Worum es hier geht
            </div>
            <div className="mt-5 space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Lokaler Fokus
            </div>
            <div className="mt-5 grid gap-3">
              {localFocus.map((item) => (
                <div
                  key={item}
                  className="flex min-w-0 items-center gap-3 rounded-[0.9rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
                  <span className="min-w-0">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[0.9rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
              Kontakt: {DUESSELDORF_CLEANING.address.streetAddress},{" "}
              {DUESSELDORF_CLEANING.address.postalCode}{" "}
              {DUESSELDORF_CLEANING.address.city} · {DUESSELDORF_CLEANING.phoneDisplay}
            </div>
          </article>
        </section>

        <section className="grid gap-6 pt-10 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-teal-700">
              <Route className="h-4 w-4" />
              Preis- und Anfahrtslogik
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Was den Aufwand in Düsseldorf wirklich verändert
            </h2>
            <div className="mt-5 grid gap-3">
              {(priceLogic.length > 0
                ? priceLogic
                : [
                    "Fläche, Objektart, Zustand und gewünschtes Ergebnis bestimmen den Grundaufwand.",
                    "Zugang, Etage, Parkmöglichkeit und Zeitfenster verändern die Planung vor Ort.",
                    "Fotos und ein klarer Preisrahmen helfen, die Anfrage schneller realistisch einzuordnen.",
                  ]
              ).map((item) => (
                <div key={item} className="rounded-[0.9rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[0.95rem] border border-amber-200 bg-amber-50 p-6 sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-amber-800">
              Klare Einordnung
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Düsseldorf bleibt konkret und nachvollziehbar
            </h2>
            <p className="mt-4 text-sm leading-7 text-amber-950">{boundaryText}</p>
            <div className="mt-5 rounded-[0.9rem] border border-amber-200 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700">
              Adresse Düsseldorf: {DUESSELDORF_CLEANING.address.streetAddress},{" "}
              {DUESSELDORF_CLEANING.address.postalCode} {DUESSELDORF_CLEANING.address.city}. Anfragen werden für Düsseldorf nach Objekt, Stadtteil, Umfang, Fotos und Termin geprüft.
            </div>
          </article>
        </section>

        <section className="grid gap-6 pt-10 lg:grid-cols-[1fr_0.88fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Passende Wege
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Passende Düsseldorfer Seiten
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {visibleLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-[0.9rem] border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 transition hover:border-teal-200 hover:bg-white hover:text-slate-950"
                >
                  <span className="min-w-0">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal-700" />
                </Link>
              ))}
            </div>
          </article>

          <article id="kontakt" className="scroll-mt-28 overflow-hidden rounded-[0.95rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.14)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
              Kontaktmöglichkeit
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              Direkt mit Düsseldorf-Bezug anfragen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Nennen Sie Objektart, Düsseldorfer Stadtteil, Fläche, gewünschten Termin,
              Zugang und Fotos. So kann FLOXANT die Reinigungsanfrage schnell und sachlich einordnen.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
                className="inline-flex min-h-12 items-center gap-3 rounded-[0.9rem] border border-slate-700 bg-slate-900/75 px-4 text-sm font-bold !text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-slate-800"
              >
                <Phone className="h-4 w-4 text-teal-200" />
                {DUESSELDORF_CLEANING.phoneDisplay}
              </a>
              <a
                href={buildDuesseldorfCleaningWhatsAppHref(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                WhatsApp mit Objektangaben öffnen
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </section>

        <section className="pt-10">
          <div className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-teal-700">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Häufige Fragen zu {title}
            </h2>
            <div className="mt-5 space-y-3">
              {activeFaqItems.map((item, index) => (
                <details
                  key={item.q}
                  open={index === 0}
                  className="rounded-[0.9rem] border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <summary className="cursor-pointer text-sm font-bold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
