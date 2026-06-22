import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  CheckCircle2,
  FileSearch,
  MapPin,
  MousePointerClick,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { germanizeDeep } from "@/lib/german-text";
import { cn } from "@/lib/utils";

type SearchDominanceVariant = "default" | "offer" | "duesseldorf" | "pillar";

type SearchDominanceCard = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

type SearchDominanceSignal = SearchDominanceCard & {
  label: string;
};

type SearchAppearanceSignal = {
  label: string;
  text: string;
};

type SearchAction = {
  label: string;
  text: string;
  href: string;
  Icon: LucideIcon;
};

type LocalTrustSignal = {
  label: string;
  text: string;
  Icon: LucideIcon;
};

type CustomerChoice = SearchAction;

type SearchDominanceConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  proofLine: string;
  serpTitle: string;
  serpDescription: string;
  aiAnswer: string;
  clickReasons: string[];
  searchAppearance: SearchAppearanceSignal[];
  searchActions: SearchAction[];
  localTrustSignals: LocalTrustSignal[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  searchChips: string[];
  steps: string[];
  cards: SearchDominanceCard[];
};

const configs: Record<SearchDominanceVariant, SearchDominanceConfig> = {
  default: {
    eyebrow: "Klarer Weg zur Anfrage",
    title: "Vom ersten Problem zur passenden FLOXANT-Anfrage.",
    intro:
      "Niemand soll raten, welcher Service passt. Diese Seite führt von Ort, Leistung, Fotos, Budget und vorhandenen Angeboten zum richtigen nächsten Schritt.",
    proofLine:
      "Düsseldorf und Regensburg bleiben getrennte lokale Bereiche. Beide führen Umzug, Reinigung und Entrümpelung über klare Kontaktmöglichkeiten; Regensburg ergänzt Umgebung ca. 200 km und Bayern nach Verfügbarkeit.",
    serpTitle: "FLOXANT Regensburg: Umzug, Reinigung, Entrümpelung direkt anfragen",
    serpDescription:
      "Fotos, Termin, Budget oder Angebot senden. FLOXANT prüft Service, Ort, Umfang und den passenden nächsten Schritt in Regensburg, Umgebung und Bayern.",
    aiAnswer:
      "FLOXANT passt, wenn Sie Umzug, Reinigung, Entrümpelung, Entsorgung, Angebotsprüfung oder eine direkte Anfrage im Raum Regensburg/Bayern klären möchten.",
    clickReasons: [
      "Direkte Anfrage statt Vergleichsportal",
      "Fotos, Termin und Budget sofort möglich",
      "Regensburg als Standort mit Bayern-Reichweite",
      "Kunden sehen sofort: anfragen, Preisrahmen prüfen oder Angebot senden",
    ],
    searchAppearance: [
      {
        label: "Titel",
        text: "Marke, Regensburg und Kernservices stehen sofort sichtbar im Treffer.",
      },
      {
        label: "Kurztext",
        text: "Fotos, Termin, Budget und direkte Anfrage liefern einen konkreten Grund für die Anfrage.",
      },
      {
        label: "Direkte Wege",
        text: "Buchung, Rechner und Angebotsprüfung führen schnell zum passenden Kontaktweg.",
      },
    ],
    searchActions: [
      {
        label: "Fall senden",
        text: "Service, Ort, Termin und Fotos direkt übermitteln.",
        href: "/buchung#buchungssystem",
        Icon: UploadCloud,
      },
      {
        label: "Preisrahmen prüfen",
        text: "Kostenfaktoren verstehen, bevor Sie verbindlich anfragen.",
        href: "/rechner#rechner-wizard",
        Icon: Search,
      },
      {
        label: "Angebot prüfen",
        text: "Fremdes Angebot hochladen und Alternative prüfen lassen.",
        href: "/angebot-guenstiger-pruefen",
        Icon: FileSearch,
      },
      {
        label: "Region ansehen",
        text: "Regensburg und Bayern nach Verfuegbarkeit einordnen.",
        href: "/regensburg",
        Icon: MapPin,
      },
    ],
    localTrustSignals: [
      {
        label: "Kontakt ohne Umweg",
        text: "Telefon, WhatsApp und Buchung bleiben als klare Kontaktwege sichtbar.",
        Icon: MapPin,
      },
      {
        label: "Prüfbare Anfrage",
        text: "Fotos, Ort, Termin, Zugang und Budget machen den Fall schneller einschätzbar.",
        Icon: Camera,
      },
      {
        label: "Servicegebiet",
        text: "Regensburg, 200-km-Nahbereich und Bayern nach Verfügbarkeit werden sauber erklärt.",
        Icon: Radar,
      },
      {
        label: "Direkter Abschluss",
        text: "Rechner, Angebotsprüfung und Anfrage führen Kunden ohne Vergleichsportal weiter.",
        Icon: MousePointerClick,
      },
    ],
    primaryHref: "/buchung#buchungssystem",
    primaryLabel: "Fall direkt senden",
    secondaryHref: "/angebot-guenstiger-pruefen",
    secondaryLabel: "Angebot prüfen",
    searchChips: [
      "Umzug Regensburg",
      "Reinigung Regensburg",
      "Entrümpelung Bayern",
      "Angebot prüfen lassen",
      "FLOXANT direkt anfragen",
      "Hausauflösung Regensburg",
      "Reinigung Regensburg",
      "Büroumzug Nürnberg",
    ],
    steps: ["Anliegen", "Ort", "Fotos", "Preisrahmen", "Anfrage"],
    cards: [
      {
        title: "Anfragegrund sofort sichtbar",
        text: "Rechner, Buchung, WhatsApp, Angebotsprüfung und Preisrahmen sind als klare Startpunkte angelegt.",
        Icon: MousePointerClick,
      },
      {
        title: "Region sauber erklärt",
        text: "Ortsseiten zeigen, welche Leistung in welcher Region sinnvoll angefragt werden kann.",
        Icon: MapPin,
      },
      {
        title: "Schnelle Orientierung",
        text: "Kurze Antworten erklären, wann FLOXANT passt und welcher nächste Schritt sinnvoll ist.",
        Icon: BrainCircuit,
      },
    ],
  },
  offer: {
    eyebrow: "Angebotsprüfung als klarer zweiter Weg",
    title: "Kunden mit fremdem Angebot brauchen einen klaren zweiten Weg.",
    intro:
      "Wer schon ein Angebot hat, braucht eine ruhige zweite Einordnung. FLOXANT macht daraus keinen aggressiven Preisangriff, sondern eine praktische Prüfung von Preis, Umfang, Termin, Fotos, Budget und möglicher Alternative.",
    proofLine:
      "Günstiger oder passender wird nur nach Prüfung und Verfügbarkeit eingeschätzt. Keine Preisgarantie, keine Konkurrenzdiffamierung.",
    serpTitle: "Angebot anderer Firma prüfen & FLOXANT-Alternative anfragen",
    serpDescription:
      "Umzugsangebot, Reinigungsangebot oder Entsorgungsangebot hochladen. FLOXANT prüft Preis, Umfang, Termin, Fotos und mögliche Alternative.",
    aiAnswer:
      "FLOXANT passt, wenn ein vorhandenes Angebot praktisch geprüft werden soll: Umfang, Termin, Fotos, Zugang und mögliche Alternative werden ohne Preisgarantie eingeordnet.",
    clickReasons: [
      "Angebot hochladen statt lange erklären",
      "Preis, Umfang und offene Punkte prüfen",
      "Alternative möglich, aber ohne falsche Garantie",
      "Kunde muss nur Foto, PDF oder Text senden",
    ],
    searchAppearance: [
      {
        label: "Titel",
        text: "Menschen mit vorhandenem Angebot erkennen sofort, dass sie Preis, Umfang und offene Punkte prüfen lassen können.",
      },
      {
        label: "Kurztext",
        text: "Upload, Preis, Umfang, Fotos und mögliche Alternative stehen im Vordergrund.",
      },
      {
        label: "Direkte Wege",
        text: "Upload, Red-Flag-Check und Plattform-Auftrag führen ohne Umweg weiter.",
      },
    ],
    searchActions: [
      {
        label: "Angebot hochladen",
        text: "PDF, Screenshot oder Foto direkt zur Prüfung senden.",
        href: "/angebot-guenstiger-pruefen#guenstiger-form",
        Icon: UploadCloud,
      },
      {
        label: "Offene Punkte prüfen",
        text: "Etage, Laufweg, Zusatzkosten und Umfang besser erkennen.",
        href: "/angebotscheck#red-flag-scanner",
        Icon: ShieldCheck,
      },
      {
        label: "Plattformfall klären",
        text: "Unklare Plattform-Anfrage neutral einordnen lassen.",
        href: "/plattform-auftrag-pruefen",
        Icon: FileSearch,
      },
      {
        label: "Direkt anfragen",
        text: "Wenn Sie sofort eine FLOXANT-Alternative prüfen möchten.",
        href: "/buchung#buchungssystem",
        Icon: MousePointerClick,
      },
    ],
    localTrustSignals: [
      {
        label: "Angebot vorhanden",
        text: "PDF, Screenshot, Foto oder Text liefern konkrete Daten statt vager Preisfrage.",
        Icon: FileSearch,
      },
      {
        label: "Preis ohne Druck",
        text: "FLOXANT prüft mögliche Alternativen ohne Preisgarantie oder Konkurrenzangriff.",
        Icon: ShieldCheck,
      },
      {
        label: "Lokal einordnen",
        text: "Ort, PLZ, Termin und Serviceart verbinden die Angebotsprüfung mit Regensburg/Bayern.",
        Icon: MapPin,
      },
      {
        label: "Schnell weiterkommen",
        text: "Kunden mit fremdem Angebot bekommen Upload, Red-Flag-Check und direkte Anfrage.",
        Icon: UploadCloud,
      },
    ],
    primaryHref: "/angebot-guenstiger-pruefen#guenstiger-form",
    primaryLabel: "Angebot hochladen",
    secondaryHref: "/angebotscheck#red-flag-scanner",
    secondaryLabel: "Offene Punkte prüfen",
    searchChips: [
      "Angebot anderer Firma prüfen",
      "Umzugsangebot günstiger",
      "Reinigungsangebot prüfen",
      "Entsorgungsangebot prüfen",
      "Alternative anfragen",
      "Angebot online prüfen",
      "FLOXANT Angebot prüfen",
      "Reinigungsfirma Angebot",
      "Umzugsangebot Regensburg",
      "Entrümpelungsangebot Regensburg",
    ],
    steps: ["Angebot", "Preis", "Umfang", "Fotos", "FLOXANT-Alternative"],
    cards: [
      {
        title: "Angebot liegt bereits vor",
        text: "Die Seite hilft Kunden, die bereits Preis, Anbieter oder Plattformangebot vorliegen haben.",
        Icon: FileSearch,
      },
      {
        title: "Upload macht den Fall prüfbar",
        text: "PDF, Screenshot, Foto, Ort, Termin und Budget helfen, aus Unsicherheit eine konkrete Anfrage zu machen.",
        Icon: UploadCloud,
      },
      {
        title: "Alternative ohne falsches Versprechen",
        text: "FLOXANT prüft eine mögliche Alternative, ohne falsche Preisversprechen oder rechtlich riskante Aussagen.",
        Icon: ShieldCheck,
      },
    ],
  },
  duesseldorf: {
    eyebrow: "Lokale Services in Düsseldorf",
    title: "Düsseldorf ist bei FLOXANT klar lokal getrennt.",
    intro:
      "Für Düsseldorf gibt es eigene Wege für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Endreinigung, Gewerbereinigung und Entsorgung nach Absprache.",
    proofLine:
      "Düsseldorf mit klarer Orientierung: Umzug, Reinigung, Entrümpelung und Übergabe werden passend zum Ort geprüft.",
    serpTitle: "FLOXANT Düsseldorf: Umzug, Reinigung & Räumung",
    serpDescription:
      "Düsseldorf ist bei FLOXANT klar lokal geführt. Leistung, Objekt, Fotos, Zugang, Termin und Ziel senden.",
    aiAnswer:
      "FLOXANT Düsseldorf passt für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Endreinigung, Gewerbereinigung und Entsorgung, wenn Ort, Umfang, Fotos, Zugang und Termin geprüft werden sollen.",
    clickReasons: [
      "Düsseldorf klar getrennt",
      "Objekt, Fläche und Zeitfenster senden",
      "Umzug, Reinigung und Räumung getrennt anfragen",
      "Vorhandenes Angebot sachlich prüfen",
      "Stadtteil, Fotos und Termin direkt mitschicken",
    ],
    searchAppearance: [
      {
        label: "Titel",
        text: "Düsseldorf steht mit eigenen Seiten für Umzug, Reinigung und Räumung.",
      },
      {
        label: "Kurztext",
        text: "Objekt, Fläche, Turnus, Zeitfenster und Fotos machen die Anfrage konkret.",
      },
      {
        label: "Direkte Wege",
        text: "Umzug, Firma, Wohnung, Apartment, Treppenhaus und Entsorgung bleiben getrennt.",
      },
    ],
    searchActions: [
      {
        label: "Umzug senden",
        text: "Umzug in Düsseldorf mit Fotos, Etagen, Zugang und Termin prüfen lassen.",
        href: "/duesseldorf/umzug",
        Icon: Sparkles,
      },
      {
        label: "Firma prüfen",
        text: "Fläche, Turnus und Zeitfenster für kleine Unternehmen senden.",
        href: "/duesseldorf/bueroreinigung",
        Icon: CheckCircle2,
      },
      {
        label: "Räumung klären",
        text: "Entrümpelung oder Haushaltsauflösung mit Fotos und Zielzustand senden.",
        href: "/duesseldorf/entruempelung",
        Icon: Camera,
      },
      {
        label: "Entsorgung ergänzen",
        text: "Gegenstände, Möbel oder Restmengen separat prüfen.",
        href: "/entsorgung-duesseldorf",
        Icon: Radar,
      },
      {
        label: "Angebot prüfen",
        text: "Vorhandenes Reinigungsangebot aus Düsseldorf einordnen lassen.",
        href: "/duesseldorf/vielleicht-guenstiger",
        Icon: FileSearch,
      },
    ],
    localTrustSignals: [
      {
        label: "Düsseldorf klar",
        text: "Düsseldorf trennt Umzug, Reinigung, Entrümpelung und Entsorgung über klare Kontaktmöglichkeiten.",
        Icon: ShieldCheck,
      },
      {
        label: "Objektklarheit",
        text: "Wohnung, Büro, Apartment, Treppenhaus, Umzug oder Entsorgung werden getrennt geführt.",
        Icon: Radar,
      },
      {
        label: "Für Unternehmen",
        text: "Fläche, Turnus, Zeitfenster und Zugang passen zu Anfragen kleiner Unternehmen.",
        Icon: CheckCircle2,
      },
      {
        label: "Fotos helfen",
        text: "Objektfotos machen Zustand, Umfang und Rückmeldung deutlich schneller.",
        Icon: Camera,
      },
    ],
    primaryHref: "/duesseldorf/umzug",
    primaryLabel: "Umzug anfragen",
    secondaryHref: "/duesseldorf/bueroreinigung",
    secondaryLabel: "Firmenreinigung",
    searchChips: [
      "Reinigung Düsseldorf",
      "Reinigungsbetrieb Düsseldorf",
      "Reinigungsunternehmen Düsseldorf",
      "Büroreinigung Düsseldorf",
      "Büro reinigen Düsseldorf",
      "Reinigungsfirma Preise",
      "Bodenreinigung Düsseldorf",
      "Treppenhausreinigung",
      "Hauseingang Reinigung",
      "Gewerbeobjekt Reinigung",
      "Gebäudereinigung Pempelfort",
      "Gebäudereinigung Altstadt",
      "Reinigungsservice Düsseldorf",
      "Praxisreinigung Düsseldorf",
    ],
    steps: ["Objekt", "Fläche", "Turnus", "Zeitfenster", "Anfrage"],
    cards: [
      {
        title: "Leistungen klar getrennt",
        text: "Düsseldorf-Seiten führen zu Reinigung für Unternehmen, Praxen, Wohnungen, Treppenhäuser und Gewerbeobjekte.",
        Icon: Radar,
      },
      {
        title: "Firmenanfragen klarer starten",
        text: "Firma, Fläche, Räume, Sanitärbereiche, Turnus und Zeitfenster werden für kleine Unternehmen sichtbar.",
        Icon: CheckCircle2,
      },
      {
        title: "Anfrage ohne Umweg",
        text: "WhatsApp, Anfrage und Budgetweg bleiben nah am Objektproblem und ohne überfüllten Formularstart.",
        Icon: Camera,
      },
    ],
  },
  pillar: {
    eyebrow: "Leistung verständlich einordnen",
    title: "Jede Leistungsseite zeigt: Was wird gebraucht und was ist der nächste Schritt?",
    intro:
      "Die wichtigsten Leistungsseiten erklären Kundensituation, Ort, Umfang, Fotos, Angebot und direkte Anfrage in einer wiedererkennbaren Struktur.",
    proofLine:
      "Das macht die Seite verständlicher, ohne künstliche Begriffsketten oder übertriebene Versprechen.",
    serpTitle: "FLOXANT Service prüfen: Kosten, Fotos, Termin und Anfrage",
    serpDescription:
      "Leistung, Ort, Umfang, Budget und vorhandenes Angebot einordnen. FLOXANT führt von der ersten Frage zur passenden Anfrage.",
    aiAnswer:
      "FLOXANT passt, wenn ein konkreter Service mit Ort, Preisrahmen, Fotos oder vorhandenem Angebot geprüft werden soll.",
    clickReasons: [
      "Leistung und Ort sofort einordnen",
      "Preisrahmen oder vorhandenes Angebot prüfen",
      "Nächster Schritt bleibt sichtbar",
      "Kunden klicken auf den Weg, der gerade passt",
    ],
    searchAppearance: [
      {
        label: "Titel",
        text: "Leistung, Ort und FLOXANT-Anfrage werden sauber verbunden.",
      },
      {
        label: "Kurztext",
        text: "Kostenfaktoren, Fotos, Termin und direkte Anfrage beantworten die wichtigsten Fragen vor dem Kontakt.",
      },
      {
        label: "Direkte Wege",
        text: "Rechner, Buchung, Angebotsprüfung und Zusatzleistungen bleiben nah dran.",
      },
    ],
    searchActions: [
      {
        label: "Direkt anfragen",
        text: "Leistung, Ort, Termin und offene Punkte senden.",
        href: "/buchung#buchungssystem",
        Icon: MousePointerClick,
      },
      {
        label: "Kosten prüfen",
        text: "Preisrahmen und Aufwand vor der Anfrage verstehen.",
        href: "/rechner#rechner-wizard",
        Icon: Search,
      },
      {
        label: "Fotos senden",
        text: "Zustand, Menge oder Zugang schneller einschätzbar machen.",
        href: "/buchung#buchungssystem",
        Icon: Camera,
      },
      {
        label: "Angebot vergleichen",
        text: "Vorhandenes Angebot mit FLOXANT praktisch einordnen.",
        href: "/angebot-guenstiger-pruefen",
        Icon: FileSearch,
      },
    ],
    localTrustSignals: [
      {
        label: "Passende Leistung",
        text: "Jede Leistungsseite erklärt Ort, Umfang, Kostenfaktoren und den nächsten Schritt.",
        Icon: Search,
      },
      {
        label: "Klare Wege",
        text: "Rechner, Buchung, Angebotsprüfung und Zusatzleistungen bleiben logisch verknüpft.",
        Icon: ArrowRight,
      },
      {
        label: "Klar verständlich",
        text: "Sichtbare Grenzen und klare Antworten machen FLOXANT für Kunden eindeutiger.",
        Icon: BrainCircuit,
      },
      {
        label: "Nächster Schritt",
        text: "Fotos, Termin, Angebot oder Budget führen direkt zum nächsten Schritt.",
        Icon: MousePointerClick,
      },
    ],
    primaryHref: "/buchung#buchungssystem",
    primaryLabel: "Direkt anfragen",
    secondaryHref: "/rechner#rechner-wizard",
    secondaryLabel: "Preisrahmen prüfen",
    searchChips: [
      "Kosten prüfen",
      "Fotos senden",
      "Termin klären",
      "Angebot vergleichen",
      "Service wählen",
      "Ich brauche Hilfe",
      "Ich habe ein Angebot",
      "Ich will buchen",
    ],
    steps: ["Leistung", "Ort", "Umfang", "Budget", "Buchung"],
    cards: [
      {
        title: "Nicht nur Text, sondern Orientierung",
        text: "Der Abschnitt zeigt Kunden sofort, welche Angaben FLOXANT braucht und welcher Startpunkt sinnvoll ist.",
        Icon: Search,
      },
      {
        title: "Mehr Vertrauen vor der Anfrage",
        text: "Preisrahmen, Fotos und Angebotsprüfung werden als normaler, seriöser Kontakt sichtbar.",
        Icon: Sparkles,
      },
      {
        title: "Bessere nächste Schritte",
        text: "Leistungsseiten führen logisch zu Rechner, Buchung, Angebotsprüfung und passenden Zusatzleistungen.",
        Icon: ArrowRight,
      },
    ],
  },
};

function getCustomerChoices(variant: SearchDominanceVariant): CustomerChoice[] {
  if (variant === "offer") {
    return [
      {
        label: "Ich habe ein Angebot",
        text: "Foto, PDF oder Text senden. FLOXANT prüft Preis, Umfang und offene Punkte.",
        href: "/angebot-guenstiger-pruefen#guenstiger-form",
        Icon: UploadCloud,
      },
      {
        label: "Ich will es einfacher",
        text: "Service, Ort und Termin kurz senden, ohne alles selbst vergleichen zu müssen.",
        href: "/buchung#buchungssystem",
        Icon: MousePointerClick,
      },
      {
        label: "Ich kenne den Preis nicht",
        text: "Erst grob einschätzen, welche Punkte den Aufwand wirklich verändern.",
        href: "/rechner#rechner-wizard",
        Icon: Search,
      },
    ];
  }

  if (variant === "duesseldorf") {
    return [
      {
        label: "Ich brauche Reinigung",
        text: "Wohnung, Büro, Praxis, Treppenhaus oder Objekt mit Fotos anfragen.",
        href: "/duesseldorf/reinigung#kontakt",
        Icon: Sparkles,
      },
      {
        label: "Ich habe ein Angebot",
        text: "Vorhandenen Preis oder Screenshot für Düsseldorf-Reinigung einordnen lassen.",
        href: "/duesseldorf/vielleicht-guenstiger",
        Icon: FileSearch,
      },
      {
        label: "Ich bin Firma",
        text: "Fläche, Turnus, Sanitär, Büro oder Praxis schnell passend senden.",
        href: "/duesseldorf/bueroreinigung",
        Icon: CheckCircle2,
      },
    ];
  }

  return [
    {
      label: "Ich will buchen",
      text: "Ort, Service, Termin und Fotos direkt senden. FLOXANT sortiert den nächsten Schritt.",
      href: "/buchung#buchungssystem",
      Icon: MousePointerClick,
    },
    {
      label: "Ich will Preisrahmen",
      text: "Erst grob prüfen, ob Umzug, Reinigung oder Entrümpelung realistisch passt.",
      href: "/rechner#rechner-wizard",
      Icon: Search,
    },
    {
      label: "Ich habe ein Angebot",
      text: "Fremdes Angebot hochladen und FLOXANT-Alternative prüfen lassen.",
      href: "/angebot-guenstiger-pruefen",
      Icon: FileSearch,
    },
  ];
}

function getDominanceRows(variant: SearchDominanceVariant): SearchDominanceSignal[] {
  if (variant === "offer") {
    return [
      {
        label: "Konkrete Anfrage",
        title: "Kunden mit vorhandenem Angebot abholen",
        text: "Wer bereits ein Angebot hat, braucht keine Theorie, sondern eine ruhige Prüfung von Umfang, Termin, Preisrahmen und offenen Punkten.",
        Icon: MousePointerClick,
      },
      {
        label: "Region",
        title: "Regensburg und Bayern bündeln",
        text: "Die Angebotsprüfung verbindet Umzug, Reinigung, Entrümpelung, Entsorgung, Ort, Termin und Budget mit einer direkten Anfrage.",
        Icon: MapPin,
      },
      {
        label: "Saubere Prüfung",
        title: "Sicher statt aggressiv",
        text: "Keine Preisgarantie und keine Konkurrenzdiffamierung: FLOXANT prüft praktisch, ob Umfang und Alternative passen.",
        Icon: ShieldCheck,
      },
      {
        label: "Klare Einordnung",
        title: "Angebot sauber prüfen",
        text: "FLOXANT wird als praktischer Prüfweg für vorhandene Angebote erklärt, nicht als riskantes Preisversprechen.",
        Icon: BrainCircuit,
      },
    ];
  }

  if (variant === "duesseldorf") {
    return [
      {
        label: "Düsseldorf",
        title: "Düsseldorf klar getrennt",
        text: "Die Seite führt zu Umzug, Reinigung, Firmenreinigung, Apartment-Reinigung, Treppenhaus, Entrümpelung und Entsorgung in Düsseldorf.",
        Icon: Radar,
      },
      {
        label: "Firmen-Passung",
        title: "Firma und Objektklarheit",
        text: "Fläche, Turnus, Zeitfenster, Fotos und Zugang sind genau die Angaben, die kleine Unternehmen wirklich brauchen.",
        Icon: CheckCircle2,
      },
      {
        label: "Kontaktweg",
        title: "Schnell zur Anfrage",
        text: "Kunden finden schneller zu Telefon, WhatsApp oder Objektanfrage, statt sich durch allgemeine Texte zu arbeiten.",
        Icon: MapPin,
      },
      {
        label: "Leistungsgrenze",
        title: "Keine falschen Spezialversprechen",
        text: "Die Kommunikation bleibt bei allgemeiner Reinigung nach Absprache, ohne medizinische oder industrielle Zusagen.",
        Icon: ShieldCheck,
      },
    ];
  }

  if (variant === "pillar") {
    return [
      {
        label: "Kernseite",
        title: "Jede wichtige Leistungsseite bekommt Richtung",
        text: "Leistung, Ort, Preisrahmen, Fotos und Angebot sind auf jeder Kernseite als Entscheidungspfad sichtbar.",
        Icon: Search,
      },
      {
        label: "Passende Wege",
        title: "Wichtige Wege werden stärker",
        text: "Rechner, Buchung, Angebotsprüfung und Zusatzleistungen sind nicht versteckt, sondern logisch verknüpft.",
        Icon: ArrowRight,
      },
      {
        label: "Klare Antwort",
        title: "FLOXANT bleibt klar erklärbar",
        text: "Sichtbare Kurzantworten und klare Grenzen machen die Entscheidung leichter als lange, austauschbare Textblöcke.",
        Icon: BrainCircuit,
      },
      {
        label: "Nächster Schritt",
        title: "Kunden finden den nächsten Schritt",
        text: "Jede Seite zeigt einen klaren Weg zu Anfrage, Preisrahmen, Fotos oder Angebotsprüfung, statt nur Leistungen aufzuzählen.",
        Icon: MousePointerClick,
      },
    ];
  }

  return [
    {
      label: "Marke",
      title: "Marke und Service sofort erkennbar",
      text: "FLOXANT zeigt direkt, welche Hilfe passt: Umzug, Reinigung, Budget, Fotos und Anfrage werden verständlich zusammengeführt.",
      Icon: Sparkles,
    },
      {
        label: "Region",
        title: "Düsseldorf und Regensburg sauber getrennt",
        text: "Kunden sehen sofort, welche Hilfe in Düsseldorf passt und welche Leistungen über Regensburg und Bayern laufen.",
        Icon: MapPin,
      },
    {
      label: "Klarer Grund",
      title: "Passender nächster Schritt",
      text: "Kunden sehen sofort, ob Rechner, Buchung, Angebotsprüfung oder WhatsApp der passende nächste Schritt ist.",
      Icon: MousePointerClick,
    },
      {
        label: "Saubere Trennung",
        title: "Düsseldorf klar getrennt",
        text: "Kunden in Düsseldorf finden direkt die passende Anfrage für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung oder Entsorgung.",
        Icon: ShieldCheck,
      },
  ];
}

type SearchDominanceExperienceProps = {
  variant?: SearchDominanceVariant;
  className?: string;
};

export function SearchDominanceExperience({
  variant = "default",
  className,
}: SearchDominanceExperienceProps) {
  const config = germanizeDeep(configs[variant]) as SearchDominanceConfig;
  const dominanceRows = germanizeDeep(getDominanceRows(variant)) as SearchDominanceSignal[];
  const customerChoices = germanizeDeep(getCustomerChoices(variant)) as CustomerChoice[];

  return (
    <section className={cn("relative px-4 py-10 sm:px-6 lg:py-14", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-52 max-w-4xl rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.35rem] border border-slate-200 bg-slate-950 text-white shadow-[0_32px_110px_rgba(15,23,42,0.18)] md:rounded-[2.9rem]">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-cyan-300/18 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-tl-[5rem] border-l border-t border-white/10 bg-white/[0.04]" />

        <div className="relative grid gap-6 p-5 md:p-7 lg:grid-cols-[0.88fr_1.12fr] lg:p-8">
          <AnimateOnScroll className="flex min-h-[28rem] flex-col justify-between rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur md:p-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                <Search className="h-4 w-4" />
                {config.eyebrow}
              </div>
              <h2 className="flox-gradient-title mt-5 max-w-[15ch] text-3xl font-bold leading-[1.02] tracking-[-0.035em] md:text-5xl">
                {config.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
                {config.intro}
              </p>
            </div>

            <div className="mt-7 grid gap-2">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Google, Maps & klare Antworten
              </div>
              <div className="flex flex-wrap gap-2">
                {config.searchChips.map((chip, index) => (
                  <span
                    key={`${chip}-${index}`}
                    className="flox-search-chip rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-bold text-white"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="flox-proof-rail mt-7 rounded-[1.35rem] border border-amber-200/20 bg-amber-200/10 p-4 pl-5 text-sm font-semibold leading-7 text-amber-50">
              {config.proofLine}
            </div>
          </AnimateOnScroll>

          <div className="grid gap-4">
            <AnimateOnScroll delay={80} className="rounded-[1.8rem] border border-white/10 bg-white p-4 text-slate-950 shadow-xl shadow-black/10 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    So geht es weiter
                  </div>
                  <h3 className="flox-ink-gradient-title mt-2 text-2xl font-bold tracking-[-0.03em]">
                    Aus Anfrage wird ein klarer nächster Schritt.
                  </h3>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    href={config.primaryHref}
                    className="flox-magnetic-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
                    data-event="hero_cta_click"
                  >
                    {config.primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={config.secondaryHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-white"
                    data-event="hero_cta_click"
                  >
                    {config.secondaryLabel}
                  </Link>
                </div>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-5">
                {config.steps.map((step, index) => (
                  <div
                    key={step}
                    className="flox-card-lift relative rounded-[1.15rem] border border-slate-200 bg-slate-50 px-3 py-3 text-center transition"
                  >
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                      {index + 1}
                    </div>
                    <div className="mt-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700">
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-2 md:grid-cols-3">
                {customerChoices.map((choice) => {
                  const Icon = choice.Icon;

                  return (
                    <Link
                      key={choice.label}
                      href={choice.href}
                      className="group rounded-[1.15rem] border border-blue-100 bg-blue-50/70 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-950/10"
                      data-event="service_card_click"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-600 text-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-black leading-tight text-slate-950">{choice.label}</span>
                      </div>
                      <p className="mt-3 text-xs font-semibold leading-5 text-slate-600">{choice.text}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-blue-700">
                        Weiter
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={102} className="flox-search-action-strip rounded-[1.65rem] p-4 backdrop-blur md:p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                    Nach dem Klick sofort handlungsfähig
                  </div>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                    Kein Rätselraten: FLOXANT zeigt den nächsten Schritt.
                  </h3>
                </div>
                <span className="flox-search-deck-badge rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em]">
                  Anfrage · Rechner · Fotos · Region
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {config.searchActions.map((action) => {
                  const Icon = action.Icon;

                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="flox-search-action-card group rounded-[1.2rem] p-4 transition"
                      data-event="service_card_click"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="flox-search-action-icon grid h-10 w-10 shrink-0 place-items-center rounded-[0.9rem]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <ArrowRight className="flox-search-action-arrow h-4 w-4 transition group-hover:translate-x-0.5" />
                      </div>
                      <div className="flox-search-action-title mt-3 text-sm font-black leading-tight">{action.label}</div>
                      <p className="flox-search-action-copy mt-1.5 text-xs font-semibold leading-5">
                        {action.text}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={108} className="flox-local-trust-deck rounded-[1.65rem] p-4 backdrop-blur md:p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100">
                  Maps, Vertrauen und schnelle Entscheidung
                  </div>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                    Kunden erkennen sofort, welcher Weg zu ihrem Anliegen passt.
                  </h3>
                </div>
                <span className="flox-local-trust-badge rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em]">
                  Adresse · Fotos · Ort · Budget
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {config.localTrustSignals.map((signal) => {
                  const Icon = signal.Icon;

                  return (
                    <div
                      key={signal.label}
                      className="flox-local-trust-card rounded-[1.2rem] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flox-local-trust-icon grid h-9 w-9 shrink-0 place-items-center rounded-[0.9rem]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="flox-local-trust-title text-sm font-black leading-tight">
                          {signal.label}
                        </div>
                      </div>
                      <p className="flox-local-trust-copy mt-3 text-xs font-semibold leading-5">
                        {signal.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={115} className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flox-serp-preview-card flox-card-lift rounded-[1.55rem] border border-slate-200 bg-white p-5 text-slate-950">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  <Search className="h-3.5 w-3.5" />
                  Suchergebnis-Vorschau
                </div>
                <div className="mt-4 text-xs font-semibold text-emerald-700">
                  www.floxant.de
                </div>
                <h3 className="mt-1 text-xl font-black leading-tight tracking-[-0.025em] text-blue-800">
                  {config.serpTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {config.serpDescription}
                </p>
                <div className="mt-4 rounded-[1.15rem] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Klick-Gründe im Suchergebnis
                  </div>
                  <div className="mt-2 grid gap-2">
                    {config.clickReasons.map((reason) => (
                      <div key={reason} className="flex items-start gap-2 text-xs font-bold leading-5 text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flox-google-appearance-grid mt-4 grid gap-2 sm:grid-cols-3">
                  {config.searchAppearance.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1rem] border border-blue-100 bg-white px-3 py-3 shadow-sm shadow-slate-950/5"
                    >
                      <div className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-700">
                        {item.label}
                      </div>
                      <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {config.searchChips.slice(0, 3).map((chip) => (
                    <span
                      key={`serp-${chip}`}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flox-proof-rail rounded-[1.55rem] border border-cyan-200/20 bg-cyan-300/10 p-5 pl-6 text-white">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                  <BrainCircuit className="h-3.5 w-3.5" />
                  Kurzantwort für Kunden
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-cyan-50">
                  {config.aiAnswer}
                </p>
                <div className="mt-4 rounded-[1rem] border border-white/10 bg-white/8 p-3 text-xs font-semibold leading-6 text-slate-200">
                  Klare Grenzen und passende Aktionen helfen Kunden, FLOXANT schnell richtig einzuordnen.
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={128} className="flox-dominance-panel rounded-[1.8rem] border border-cyan-200/16 p-4 text-white shadow-[0_22px_70px_rgba(2,6,23,0.18)] backdrop-blur md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                    Stärken im Vergleich
                  </div>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                    Warum FLOXANT gut passt.
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-50">
                  Lokal · Direkt · Prüfbar · Verständlich
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {dominanceRows.map((item) => {
                  const Icon = item.Icon;

                  return (
                    <article
                      key={item.title}
                      className="flox-dominance-row rounded-[1.3rem] border border-white/10 bg-white/[0.08] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-cyan-200/20 bg-cyan-300/14 text-cyan-100">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/90">
                            {item.label}
                          </div>
                          <h4 className="mt-2 text-base font-black leading-tight text-white">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </AnimateOnScroll>

            <div className="grid gap-3 md:grid-cols-3">
              {config.cards.map((card, index) => {
                const Icon = card.Icon;

                return (
                  <AnimateOnScroll key={card.title} delay={140 + index * 80} className="h-full">
                    <article className="flox-click-card group flex h-full min-h-[15rem] flex-col justify-between rounded-[1.65rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.1]">
                      <div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/12 text-cyan-100 transition group-hover:bg-cyan-300/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.02em]">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{card.text}</p>
                      </div>
                      <div className="mt-5 h-1.5 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-white/20" />
                    </article>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
