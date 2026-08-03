import type { Metadata } from "next";
import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Home,
  Languages,
  MapPin,
  PanelsTopLeft,
  ShieldCheck,
  Sun,
  Sparkles,
  Stethoscope,
  Store,
  XCircle,
} from "lucide-react";

import { PriorityFaqSection } from "@/components/editorial/PriorityFaqSection";
import { PhotoGuidanceBlock } from "@/components/PhotoGuidanceBlock";
import { RequestChecklistBlock as RequestBriefChecklistBlock } from "@/components/RequestChecklistBlock";
import { company, duesseldorfCompany } from "@/lib/company";
import { getActivePriorityFaqAssignment } from "@/lib/content/faq-registry";
import { getPrioritySeoMeta, type SeoMetaModel } from "@/lib/content/seo-meta-registry";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export type DuesseldorfCleaningPageKey =
  | "reinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "praxisreinigung"
  | "fensterreinigung"
  | "grundreinigung"
  | "unterhaltsreinigung"
  | "baureinigung"
  | "treppenhausreinigung";

type CtaConfig = {
  href: string;
  label: string;
  service: string;
  intent: string;
  priority: "p0" | "p1" | "p2";
};

type Card = {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  label?: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type PageConfig = {
  key: DuesseldorfCleaningPageKey;
  path: string;
  meta?: SeoMetaModel;
  title: string;
  description: string;
  ogTitle: string;
  eyebrow: string;
  h1: string;
  intro: string;
  quickAnswer: string;
  serviceType: string;
  primaryCta: CtaConfig;
  offerCta: CtaConfig;
  situations: Card[];
  needs: string[];
  effortFactors: string[];
  serviceCards: Card[];
  b2bTrust: string[];
  faqItems: FaqItem[];
  about: string[];
};

const duesseldorfArea = [
  "Düsseldorf",
  "Neuss",
  "Ratingen",
  "Meerbusch",
  "Hilden",
  "Erkrath",
  "Mettmann",
  "Krefeld",
  "Duisburg",
  "Düsseldorf Servicegebiet auf Anfrage",
] as const;

const noPromiseItems = [
  "keine Preisgarantie",
  "keine Soforttermin-Garantie",
  "keine garantierte Verfügbarkeit",
  "keine Rechtsberatung",
  "keine automatische Buchung durch eine Anfrage",
] as const;

const cleaningContact = "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo";
const cleaningOfferContact =
  "/kontakt?service=reinigung&city=duesseldorf&intent=reinigungsangebot-pruefen&source=seo";
const officeContact =
  "/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo";
const officeOfferContact =
  "/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-angebot-pruefen&source=seo";
const commercialContact =
  "/kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo";
const commercialOfferContact =
  "/kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-angebot-pruefen&source=seo";
const practiceContact =
  "/kontakt?service=praxisreinigung&city=duesseldorf&intent=praxisreinigung-duesseldorf&source=seo";
const practiceOfferContact =
  "/kontakt?service=praxisreinigung&city=duesseldorf&intent=praxisreinigung-angebot-pruefen&source=seo";
const windowContact =
  "/kontakt?service=fensterreinigung&city=duesseldorf&intent=fensterreinigung-duesseldorf&source=seo";
const windowOfferContact =
  "/kontakt?service=fensterreinigung&city=duesseldorf&intent=fensterreinigung-angebot-pruefen&source=seo";
const deepCleaningContact =
  "/kontakt?service=grundreinigung&city=duesseldorf&intent=grundreinigung-duesseldorf&source=seo";
const deepCleaningOfferContact =
  "/kontakt?service=grundreinigung&city=duesseldorf&intent=grundreinigung-angebot-pruefen&source=seo";
const maintenanceCleaningOfferContact =
  "/kontakt?service=unterhaltsreinigung&city=duesseldorf&intent=unterhaltsreinigung-angebot-pruefen&source=seo";
const constructionCleaningContact =
  "/kontakt?service=baureinigung&city=duesseldorf&intent=baureinigung-duesseldorf&source=seo";
const constructionCleaningOfferContact =
  "/kontakt?service=baureinigung&city=duesseldorf&intent=baureinigung-angebot-pruefen&source=seo";
const solarContact =
  "/kontakt?mode=neutral&source=seo";
const solarOfferContact =
  "/kontakt?service=angebotscheck&city=duesseldorf&intent=pv-reinigungsangebot-pruefen&source=seo";
const propertyManagementCleaningContact =
  "/kontakt?service=treppenhausreinigung&city=duesseldorf&intent=hausverwaltung-reinigung-duesseldorf&source=seo";
const staircaseCleaningContact =
  "/kontakt?service=treppenhausreinigung&city=duesseldorf&intent=treppenhausreinigung-duesseldorf&source=seo";
const maintenanceCleaningContact =
  "/kontakt?service=unterhaltsreinigung&city=duesseldorf&intent=unterhaltsreinigung-duesseldorf&source=seo";
const buildingCleaningContact =
  "/kontakt?service=gewerbereinigung&city=duesseldorf&intent=objektreinigung-duesseldorf&source=seo";
const propertyCleaningOfferContact =
  "/kontakt?service=angebotscheck&city=duesseldorf&intent=hausverwaltung-reinigungsangebot-pruefen&source=seo";

const commonNeeds = [
  "Ort oder Stadtteil grob",
  "Objektart und Fläche",
  "gewünschte Leistung und Zielzustand",
  "Terminwunsch oder Frist",
  "Turnus, falls regelmäßig",
  "Fotos oder vorhandenes Angebot, falls vorhanden",
  "Kontaktwunsch für Rückfragen",
] as const;

const commonEffortFactors = [
  "Fläche und Raumanzahl",
  "Objektart und Nutzung",
  "Verschmutzungsgrad",
  "gewünschter Turnus",
  "Termin, Frist und Tageszeit",
  "Zugänglichkeit und Schlüsselweg",
  "Sonderflächen, Glas oder Sanitär",
  "Fotos und vorhandenes Angebot",
] as const;

const hubServiceCards: Card[] = [
  {
    icon: Building2,
    title: "Büroreinigung Düsseldorf",
    text: "Für Firmen, Büroflächen, Empfang, Küche, Sanitärbereiche, Turnus, Reinigungszeiten und klare Ansprechpartner.",
    href: "/duesseldorf/bueroreinigung",
    label: "Büroreinigung ansehen",
  },
  {
    icon: Store,
    title: "Gewerbereinigung Düsseldorf",
    text: "Für Gewerbeflächen, Nutzungszeiten, Leistungsumfang, Sonderflächen und Angebotvergleich ohne Branchen-Garantie.",
    href: "/duesseldorf/gewerbereinigung",
    label: "Gewerbereinigung einordnen",
  },
  {
    icon: Stethoscope,
    title: "Praxisreinigung Düsseldorf",
    text: "Für Praxisräume, sensible Bereiche, Reinigungszeiten und sachliche Hygieneabstimmung ohne erfundene Zertifikate.",
    href: "/duesseldorf/praxisreinigung",
    label: "Praxisreinigung vorbereiten",
  },
  {
    icon: PanelsTopLeft,
    title: "Fenster- und Glasreinigung",
    text: "Für Fenster, Glasflächen, Rahmen/Falze optional, Erreichbarkeit, Turnus und Terminlogik.",
    href: "/duesseldorf/fensterreinigung",
    label: "Fensterreinigung anfragen",
  },
  {
    icon: Sun,
    title: "Solarreinigung / PV-Anlagen-Reinigung",
    text: "Für PV-Module, Dachart, Zugang, Modulfläche, Verschmutzung und Fotos. Keine Ertragsgarantie, keine Dachzusage ohne Prüfung.",
    href: solarContact,
    label: "Solarreinigung anfragen",
  },
  {
    icon: ClipboardCheck,
    title: "Hausverwaltung und Übergabe",
    text: "Für Treppenhaus, Allgemeinflächen, Übergabe, Fristen oder Reinigung nach Entrümpelung mit klarer Objektbeschreibung.",
    href: "/kontakt?service=treppenhausreinigung&city=duesseldorf&intent=hausverwaltung-reinigung-duesseldorf&source=seo",
    label: "Hausverwaltung anfragen",
  },
  {
    icon: FileSearch,
    title: "Reinigungsangebot prüfen",
    text: "Wenn ein Angebot unklar, schwer vergleichbar oder zu pauschal wirkt, helfen Fläche, Turnus, Umfang und Zusatzkosten.",
    href: cleaningOfferContact,
    label: "Angebot prüfen lassen",
  },
  {
    icon: BedDouble,
    title: "Ferienwohnungs- und Apartmentreinigung",
    text: "Für Ferienwohnung, möbliertes Apartment oder Gästewechsel mit Checkout, Check-in, Zugang, Fotos und klaren Zusatzgrenzen.",
    href: "/reinigung-moeblierte-wohnung-duesseldorf",
    label: "Apartment-Reinigung ansehen",
  },
  {
    icon: Sparkles,
    title: "Grundreinigung Düsseldorf",
    text: "Für intensivere Reinigung von Wohnung, Haus, Büro oder Gewerbefläche mit klaren Schwerpunkten und Zielzustand.",
    href: "/duesseldorf/grundreinigung",
    label: "Grundreinigung ansehen",
  },
  {
    icon: CalendarClock,
    title: "Unterhaltsreinigung Düsseldorf",
    text: "Für wiederkehrende Reinigung mit Bereichen, Turnus, Zeitfenstern, Zugang und festem Ansprechpartner.",
    href: "/duesseldorf/unterhaltsreinigung",
    label: "Unterhaltsreinigung ansehen",
  },
  {
    icon: ClipboardCheck,
    title: "Bau- und Bauendreinigung Düsseldorf",
    text: "Für Bauzwischenstand, Renovierung oder Abschluss vor Übergabe mit Bauphase, Fläche, Restarbeiten und Termin.",
    href: "/duesseldorf/baureinigung",
    label: "Baureinigung ansehen",
  },
  {
    icon: Building2,
    title: "Treppenhausreinigung Düsseldorf",
    text: "Für Eingang, Etagen, Geländer, Aufzug und Gemeinschaftsflächen mit Turnus, Zugang und Ansprechpartner.",
    href: "/duesseldorf/treppenhausreinigung",
    label: "Treppenhausreinigung ansehen",
  },
];

const baseFaqItems: FaqItem[] = [
  {
    q: "Welche Angaben braucht FLOXANT für Reinigung in Düsseldorf?",
    a: "Hilfreich sind Objektart, Fläche, gewünschter Zustand, Terminwunsch, Turnus, Zugang, Fotos und ein vorhandenes Angebot, falls es schon eines gibt.",
  },
  {
    q: "Kann ich ein Reinigungsangebot prüfen lassen?",
    a: "Ja. FLOXANT kann Fläche, Objektart, Turnus, Leistungsumfang, Termin und mögliche Zusatzkosten prüfen. Es gibt keine Ersparnisgarantie und keine Rechtsberatung.",
  },
  {
    q: "Kann ich Solar- oder PV-Reinigung in Düsseldorf anfragen?",
    a: "Ja. Beschreiben Sie Dachart, Zugang, Modulfläche, sichtbare Verschmutzung, Fotos und gewünschtes Zeitfenster. FLOXANT prüft Machbarkeit und offene Punkte ohne Ertrags- oder Sicherheitsgarantie.",
  },
  {
    q: "Kann ich ein Solarreinigungsangebot prüfen lassen?",
    a: "Ja. Ein vorhandenes Angebot kann nach Dachzugang, Modulfläche, Sicherheitslage, sichtbarer Verschmutzung und möglichen Zusatzkosten eingeordnet werden. Es gibt keine Preis- oder Ertragsgarantie.",
  },
  {
    q: "Was beeinflusst den Aufwand bei einer Reinigung?",
    a: "Entscheidend sind Fläche, Objektart, Verschmutzungsgrad, gewünschter Turnus, Zugänglichkeit, Sonderflächen, Fenster/Glas, Sanitär/Küche, Frist und vorhandene Fotos.",
  },
  {
    q: "Ist die Anfrage schon eine Buchung?",
    a: "Nein. Eine Anfrage löst keine automatische Buchung aus. FLOXANT prüft die Angaben und meldet sich über den gewählten Kontaktweg mit dem nächsten Schritt.",
  },
  {
    q: "Wie unterscheiden sich Treppenhausreinigung, Unterhaltsreinigung und Hausverwaltung-Reinigung?",
    a: "Treppenhausreinigung fokussiert Eingänge, Etagen, Geländer, Aufzug und Gemeinschaftswege. Unterhaltsreinigung meint wiederkehrende Reinigung nach Turnus und Leistungsumfang. Hausverwaltung-Reinigung bündelt Objektart, Ansprechpartner, Zugang, Bereiche und vorhandene Angebote für Verwaltung, Vermieter oder WEG.",
  },
  {
    q: "Kann eine Hausverwaltung ein Treppenhaus- oder Unterhaltsreinigungsangebot prüfen lassen?",
    a: "Ja. FLOXANT kann Fläche, Etagen, Bereiche, Turnus, Zugang, Ansprechpartner, Zusatzpositionen und fehlende Angaben strukturieren. Das ist eine organisatorische Einordnung, keine Rechtsberatung und keine Preis- oder Ersparnisgarantie.",
  },
  {
    q: "Kann ich auf Englisch anfragen?",
    a: "Yes. International customers can describe a cleaning service, property management cleaning, staircase cleaning, common area cleaning, office cleaning or commercial cleaning request in simple English.",
  },
];

const propertyCleaningCtas: CtaConfig[] = [
  {
    href: propertyManagementCleaningContact,
    label: "Hausverwaltung-Reinigung anfragen",
    service: "treppenhausreinigung",
    intent: "hausverwaltung-reinigung-duesseldorf",
    priority: "p0",
  },
  {
    href: staircaseCleaningContact,
    label: "Treppenhausreinigung einordnen",
    service: "treppenhausreinigung",
    intent: "treppenhausreinigung-duesseldorf",
    priority: "p0",
  },
  {
    href: propertyCleaningOfferContact,
    label: "Reinigungsangebot prüfen lassen",
    service: "angebotscheck",
    intent: "hausverwaltung-reinigungsangebot-pruefen",
    priority: "p0",
  },
];

const propertyCleaningSituations = [
  "Treppenhaus soll regelmäßig gereinigt werden",
  "Gemeinschaftsflächen, Eingang oder Aufzug brauchen einen klaren Turnus",
  "Hausverwaltung oder WEG braucht eine Anfrage mit den wichtigsten Eckdaten",
  "Vorhandenes Reinigungsangebot ist schwer vergleichbar",
  "Keller, Garage oder Müllraum sollen optional eingeordnet werden",
  "Düsseldorf ist der Hauptort; umliegende Einsatzorte werden nach Objekt und Termin geprüft",
] as const;

const propertyCleaningTypes = [
  {
    title: "Hausverwaltung-Reinigung",
    text: "Bündelt Objektart, Bereiche, Ansprechpartner, Zugang, Turnus und Angebotsprüfung für Verwaltung, Vermieter oder Eigentümergemeinschaft.",
    href: propertyManagementCleaningContact,
  },
  {
    title: "Treppenhausreinigung",
    text: "Fokussiert Hauseingang, Etagen, Geländer, Aufzug, Laufwege und wiederkehrenden Rhythmus im Mehrfamilienhaus oder Objekt.",
    href: staircaseCleaningContact,
  },
  {
    title: "Unterhaltsreinigung",
    text: "Meint laufende Reinigung nach Leistungsumfang, Bereichen, Turnus, Zeiten und Zugang; passend für Gewerbe, Büro und Objektflächen.",
    href: maintenanceCleaningContact,
  },
  {
    title: "Gebäudereinigung / Objekt-Reinigung",
    text: "Der breitere Rahmen für Gebäude, Sonderflächen, Fenster, Grundreinigung oder gemischte Objektanforderungen nach Prüfung.",
    href: buildingCleaningContact,
  },
] as const;

const propertyEffortFactors = [
  "Objektart, Anzahl der Etagen und Einheiten",
  "Treppenhaus, Eingang, Aufzug, Keller, Garage und Gemeinschaftsflächen",
  "gewünschter Turnus: einmalig, wöchentlich, 14-tägig oder monatlich",
  "Zugang, Schlüsselregelung, Ansprechpartner und Zeitfenster",
  "Verschmutzungsgrad, Sonderflächen und vorhandene Fotos",
  "vorhandenes Angebot mit Leistungsumfang, Zusatzpositionen und offenen Fragen",
] as const;

export const duesseldorfCleaningPages: Record<DuesseldorfCleaningPageKey, PageConfig> = {
  reinigung: {
    key: "reinigung",
    path: "/duesseldorf/reinigung",
    meta: getPrioritySeoMeta("/duesseldorf/reinigung"),
    title: "Reinigungsfirma Düsseldorf: Reinigung anfragen | FLOXANT",
    description:
      "Reinigung in Düsseldorf persönlich anfragen: Wohnung, Büro, Praxis, Fenster, Grund- oder Unterhaltsreinigung. Objekt, Umfang und Termin einfach senden.",
    ogTitle: "Reinigung Düsseldorf – persönlich, klar und passend zum Objekt anfragen",
    eyebrow: "Reinigung Düsseldorf",
    h1: "Reinigung in Düsseldorf – persönlich, verständlich und passend zu Ihrem Objekt",
    intro:
      "Sie suchen einen Reinigungsdienst in Düsseldorf, der Ihre Situation zuerst versteht? Nennen Sie Objektart, Fläche, gewünschtes Ergebnis und Terminwunsch. FLOXANT ordnet Ihre Anfrage ohne Umwege der passenden Reinigung zu – von Wohnung und Apartment über Büro, Praxis und Gewerbe bis Grund-, Unterhalts-, Fenster- oder Bauendreinigung.",
    quickAnswer:
      "Für eine Reinigungsanfrage in Düsseldorf helfen Objektart, Fläche, gewünschter Zustand, Terminwunsch, Turnus und Fotos. FLOXANT kann die Angaben strukturieren und passende nächste Schritte einordnen. Eine Anfrage ist noch keine Buchung.",
    serviceType: "Reinigung, Reinigungsanfrage und Reinigungsangebot-Prüfung",
    primaryCta: {
      href: cleaningContact,
      label: "Reinigung in Düsseldorf anfragen",
      service: "reinigung",
      intent: "reinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: cleaningOfferContact,
      label: "Reinigungsangebot prüfen lassen",
      service: "reinigung",
      intent: "reinigungsangebot-pruefen",
      priority: "p0",
    },
    situations: [
      {
        icon: Sparkles,
        title: "Wohnung vor Übergabe",
        text: "Wenn eine Wohnung übergabefähig werden soll, zählen Zustand, Fläche, Frist, Schlüsselweg und gewünschtes Ergebnis.",
      },
      {
        icon: Building2,
        title: "Büro mit regelmäßigem Turnus",
        text: "Für Firmen sind Fläche, Räume, Reinigungszeiten, Ansprechpartner und Turnus wichtiger als eine pauschale Preisaussage.",
      },
      {
        icon: Store,
        title: "Gewerbefläche mit Leistungsumfang",
        text: "Gewerbliche Reinigung braucht Objektart, Nutzungszeiten, Sonderflächen und eine klare Trennung von Büroreinigung.",
      },
      {
        icon: Stethoscope,
        title: "Praxisräume sachlich planen",
        text: "Praxisreinigung wird ohne erfundene Zertifikate formuliert. Wichtig sind Bereiche, Zeiten, Zugang und Ansprechpartner.",
      },
      {
        icon: PanelsTopLeft,
        title: "Fenster oder Glasflächen",
        text: "Fensterzahl, Glasflächen, Rahmen/Falze optional, Erreichbarkeit und Turnus helfen bei der ersten Einordnung.",
      },
      {
        icon: FileSearch,
        title: "Angebot wirkt unklar",
        text: "Wenn Positionen, Zusatzkosten oder Turnus schwer vergleichbar sind, kann eine Prüfung der einzelnen Angebotspositionen helfen.",
      },
    ],
    needs: [...commonNeeds],
    effortFactors: [
      ...commonEffortFactors,
      "Dachart, PV-Zugang und Modulfläche bei Solar-/PV-Reinigung",
      "sichtbare Verschmutzung und Fotos bei Solar panel cleaning",
    ],
    serviceCards: hubServiceCards,
    b2bTrust: [
      "Privat, Gewerbe und B2B werden getrennt beschrieben, damit keine falsche Leistungserwartung entsteht.",
      "FLOXANT erfindet keine Referenzen, Zertifikate oder Verfügbarkeiten für Düsseldorf.",
      "Fotos, Objektart, Fläche und Terminwunsch verkürzen Rückfragen und machen Angebote besser vergleichbar.",
    ],
    faqItems: baseFaqItems,
    about: [
      "Reinigung Düsseldorf",
      "Reinigungsfirma Düsseldorf",
      "Putzfirma Düsseldorf",
      "Gebäudereinigung Düsseldorf",
      "Reinigungsangebot prüfen",
      "Wohnungsreinigung Düsseldorf",
      "Apartmentreinigung Düsseldorf",
      "Reinigung Düsseldorf Innenstadt",
      "Reinigung Düsseldorf Pempelfort",
      "Reinigung Düsseldorf Flingern",
    ],
  },
  bueroreinigung: {
    key: "bueroreinigung",
    path: "/duesseldorf/bueroreinigung",
    meta: getPrioritySeoMeta("/duesseldorf/bueroreinigung"),
    title: "Büroreinigung Düsseldorf für Firmen klar anfragen",
    description:
      "Büroreinigung in Düsseldorf für Firmen: Fläche, Turnus, Reinigungszeiten und Leistungsumfang beschreiben. Angebot Punkt für Punkt prüfen lassen.",
    ogTitle: "Büroreinigung in Düsseldorf für Firmen vorbereiten",
    eyebrow: "Büroreinigung Düsseldorf",
    h1: "Büroreinigung in Düsseldorf für Firmen klar anfragen",
    intro:
      "Für eine Büroreinigung in Düsseldorf helfen Fläche, Turnus, Reinigungszeiten und besondere Bereiche wie Küche, Sanitär oder Besprechungsräume. FLOXANT prüft die Anfrage anhand der genannten Eckdaten und kann ein vorhandenes Angebot auf offene Punkte prüfen.",
    quickAnswer:
      "Für eine Büroreinigung in Düsseldorf helfen Fläche, Raumarten, Sanitär- und Küchenanteil, gewünschter Turnus, Reinigungszeiten, Ansprechpartner und Zugang. FLOXANT kann Anfrage oder Angebot strukturieren. Eine Anfrage ist noch keine Beauftragung.",
    serviceType: "Büroreinigung Düsseldorf für Firmen",
    primaryCta: {
      href: officeContact,
      label: "Büroreinigung in Düsseldorf anfragen",
      service: "bueroreinigung",
      intent: "bueroreinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: officeOfferContact,
      label: "Büroreinigungsangebot prüfen lassen",
      service: "bueroreinigung",
      intent: "bueroreinigung-angebot-pruefen",
      priority: "p0",
    },
    situations: [
      {
        icon: Building2,
        title: "Regelmäßige Büroreinigung",
        text: "Turnus, Zeiten, Flächen, Küche, Sanitär und Schlüsselweg müssen vor einem Angebot klar sein.",
      },
      {
        icon: CalendarClock,
        title: "Reinigung außerhalb der Geschäftszeiten",
        text: "Zeitfenster, Zugang, Ansprechpartner und Alarm-/Schließlogik gehören früh in die Anfrage.",
      },
      {
        icon: FileSearch,
        title: "Büroreinigungsangebot prüfen",
        text: "FLOXANT kann prüfen, ob Turnus, Leistungsumfang, Fläche, Zusatzkosten und Ansprechpartner nachvollziehbar sind.",
      },
    ],
    needs: [
      "Firmenname optional und Ansprechpartner",
      "Fläche, Raumliste und Anzahl Arbeitsplätze",
      "gewünschter Turnus und Reinigungszeiten",
      "Sanitär, Küche, Empfang und Sonderflächen",
      "Zugang, Schlüsselweg und gewünschter Start",
      "vorhandenes Büroreinigungsangebot optional",
    ],
    effortFactors: [
      "Fläche und Raumtypen",
      "Turnus und Wochentage",
      "Reinigung außerhalb Geschäftszeiten",
      "Sanitär- und Küchenanteil",
      "Zugang, Schlüssel und Ansprechpartner",
      "Sonderleistungen wie Glas oder Grundreinigung",
    ],
    serviceCards: [
      hubServiceCards[1],
      hubServiceCards[2],
      hubServiceCards[3],
      hubServiceCards[5],
    ],
    b2bTrust: [
      "B2B-Anfragen werden mit Fläche, Turnus, Zeiten und Ansprechpartner vorbereitet.",
      "Keine Fake-Firmenkunden, keine erfundenen Referenzen und keine Zertifikatsbehauptungen.",
      "Büroreinigung wird von Gewerbereinigung abgegrenzt: Büroalltag, feste Flächen, planbarer Turnus.",
    ],
    faqItems: [
      {
        q: "Für welche Büros passt die Anfrage?",
        a: "Für kleine und größere Büroflächen, Empfangsbereiche, Küchen, Sanitärbereiche und wiederkehrende Reinigung, wenn Fläche, Turnus und Zeiten klar beschrieben werden.",
      },
      {
        q: "Wie unterscheiden sich Büroreinigung und Gewerbereinigung?",
        a: "Büroreinigung meint vor allem Büroalltag, Arbeitsplätze, Besprechungsräume, Küche, Sanitär, Turnus und Reinigungszeiten. Gewerbereinigung ist breiter und hängt stärker von Objektart, Nutzung, Sonderflächen, Zugang und Leistungsumfang ab.",
      },
      ...baseFaqItems.slice(1),
    ],
    about: ["Büroreinigung Düsseldorf", "B2B Büroreinigung", "Büroreinigungsangebot prüfen"],
  },
  gewerbereinigung: {
    key: "gewerbereinigung",
    path: "/duesseldorf/gewerbereinigung",
    meta: getPrioritySeoMeta("/duesseldorf/gewerbereinigung"),
    title: "Gewerbereinigung Düsseldorf - Fläche, Turnus und Umfang klären",
    description:
      "Gewerbereinigung in Düsseldorf mit konkreten Eckdaten anfragen: Objektart, Fläche, Nutzungszeiten, Turnus und Leistungsumfang beschreiben.",
    ogTitle: "Gewerbereinigung in Düsseldorf mit konkreten Eckdaten anfragen",
    eyebrow: "Gewerbereinigung Düsseldorf",
    h1: "Gewerbereinigung in Düsseldorf mit konkreten Eckdaten anfragen",
    intro:
      "Bei Gewerbereinigung zählen Objektart, Fläche, Reinigungszeiten, Leistungsumfang und Zugang. FLOXANT hilft, die Anfrage klar vorzubereiten und vorhandene Angebote besser einzuordnen.",
    quickAnswer:
      "Für Gewerbereinigung in Düsseldorf helfen Objektart, Fläche, Nutzungszeiten, gewünschter Turnus, Leistungsumfang, Zugang und ein vorhandenes Angebot. FLOXANT gibt keine Preis-, Branchen- oder Verfügbarkeitsgarantie.",
    serviceType: "Gewerbereinigung Düsseldorf",
    primaryCta: {
      href: commercialContact,
      label: "Gewerbereinigung in Düsseldorf anfragen",
      service: "gewerbereinigung",
      intent: "gewerbereinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: commercialOfferContact,
      label: "Gewerbereinigungsangebot prüfen lassen",
      service: "gewerbereinigung",
      intent: "gewerbereinigung-angebot-pruefen",
      priority: "p0",
    },
    situations: [
      {
        icon: Store,
        title: "Gewerbefläche mit Nutzungszeiten",
        text: "Bei Laden, Objekt oder Gewerbefläche zählen Nutzung, Zugang, Zeiten und Verschmutzungsgrad.",
      },
      {
        icon: Building2,
        title: "Büro vs. Gewerbe abgrenzen",
        text: "Büroreinigung ist planbarer Büroalltag; Gewerbereinigung kann stärker von Objektart und Sonderflächen abhängen.",
      },
      {
        icon: FileSearch,
        title: "Angebot vergleichen",
        text: "Leistungsumfang, Turnus, Zusatzpositionen und Objektannahmen werden sichtbar gemacht, ohne Ersparnisgarantie.",
      },
    ],
    needs: [
      "Objektart und grobe Nutzung",
      "Fläche, Bereiche und Sonderflächen",
      "Nutzungszeiten und gewünschte Reinigungszeiten",
      "Turnus oder einmaliger Anlass",
      "Zugang, Ansprechpartner und Fotos",
      "vorhandenes Gewerbereinigungsangebot optional",
    ],
    effortFactors: [
      "Objektart und Nutzung",
      "Fläche und Sonderflächen",
      "Zeitfenster und Zugang",
      "Verschmutzungsgrad",
      "Turnus oder Sonderreinigung",
      "Leistungsumfang und Zusatzpositionen",
    ],
    serviceCards: [
      hubServiceCards[0],
      hubServiceCards[2],
      hubServiceCards[3],
      hubServiceCards[5],
    ],
    b2bTrust: [
      "Gewerbeflächen werden nach Objektart, Nutzung, Zeitfenster und Leistungsumfang betrachtet.",
      "Keine falschen Zertifikate, keine Fake-Referenzen und keine Aussage, dass jede Branche garantiert passt.",
      "Angebotsvergleich bleibt eine Einordnung, keine Rechtsberatung und keine Ersparnisgarantie.",
    ],
    faqItems: [
      {
        q: "Welche Gewerbeflächen passen?",
        a: "Gewerbeflächen können eingeordnet werden, wenn Objektart, Fläche, Nutzung, Zeiten, Zugang und gewünschter Leistungsumfang klar beschrieben werden.",
      },
      {
        q: "Wann ist Gewerbereinigung passender als Büroreinigung?",
        a: "Gewerbereinigung passt eher bei Laden, Objektflächen, Hausverwaltung, Praxisflächen nach Absprache oder gemischten Flächen. Büroreinigung passt eher bei Arbeitsplätzen, Besprechungsräumen, Küche, Sanitär und planbarem Büroturnus.",
      },
      ...baseFaqItems.slice(1),
    ],
    about: ["Gewerbereinigung Düsseldorf", "gewerbliche Reinigung Düsseldorf", "Gewerbereinigung Angebot prüfen"],
  },
  praxisreinigung: {
    key: "praxisreinigung",
    path: "/duesseldorf/praxisreinigung",
    meta: getPrioritySeoMeta("/duesseldorf/praxisreinigung"),
    title: "Praxisreinigung Düsseldorf mit konkreten Eckdaten anfragen",
    description:
      "Praxisreinigung in Düsseldorf sachlich vorbereiten: Räume, sensible Bereiche, Reinigungszeiten, Ansprechpartner und Angebot klären.",
    ogTitle: "Praxisreinigung in Düsseldorf klar und mit konkreten Eckdaten anfragen",
    eyebrow: "Praxisreinigung Düsseldorf",
    h1: "Praxisreinigung in Düsseldorf klar und mit konkreten Eckdaten anfragen",
    intro:
      "Praxisreinigung braucht sachliche Angaben zu Praxisräumen, sensiblen Bereichen, Reinigungszeiten, Zugang und Ansprechpartnern. FLOXANT formuliert keine medizinische Zertifizierung und keine Hygienegarantie.",
    quickAnswer:
      "Für Praxisreinigung in Düsseldorf helfen Praxisart, Räume, sensible Bereiche, Turnus, Reinigungszeiten, Zugang, Ansprechpartner und vorhandenes Angebot. Eine Anfrage ist noch keine Buchung.",
    serviceType: "Praxisreinigung Düsseldorf",
    primaryCta: {
      href: practiceContact,
      label: "Praxisreinigung in Düsseldorf anfragen",
      service: "praxisreinigung",
      intent: "praxisreinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: practiceOfferContact,
      label: "Praxisreinigungsangebot prüfen lassen",
      service: "praxisreinigung",
      intent: "praxisreinigung-angebot-pruefen",
      priority: "p1",
    },
    situations: [
      {
        icon: Stethoscope,
        title: "Praxisräume mit sensiblen Bereichen",
        text: "Räume, Abläufe, sensible Zonen und Reinigungszeiten werden sachlich beschrieben.",
      },
      {
        icon: CalendarClock,
        title: "Reinigung vor oder nach Sprechzeiten",
        text: "Zeitfenster, Zugang, Ansprechpartner und Rückfragen müssen klar sein.",
      },
      {
        icon: ShieldCheck,
        title: "Hygiene ohne falsche Versprechen",
        text: "FLOXANT erfindet keine Desinfektions-, Medizin- oder Zertifikatsgarantie.",
      },
    ],
    needs: [
      "Praxisart und Raumliste",
      "sensible Bereiche und gewünschter Turnus",
      "Reinigungszeiten und Ansprechpartner",
      "Zugang, Schlüsselweg und Fristen",
      "vorhandener Reinigungsplan oder Angebot optional",
      "Fotos nur wenn passend und ohne private Daten",
    ],
    effortFactors: [
      "Raumarten und sensible Bereiche",
      "Turnus und Zeitfenster",
      "Zugang und Ansprechpartner",
      "Sanitär, Empfang und Behandlungsräume",
      "Dokumentationsbedarf, falls vorhanden",
      "Leistungsumfang im Angebot",
    ],
    serviceCards: [
      hubServiceCards[0],
      hubServiceCards[1],
      hubServiceCards[5],
    ],
    b2bTrust: [
      "Praxisreinigung wird sachlich beschrieben, ohne rechtliche Hygieneberatung.",
      "Keine medizinische Zertifizierung, keine Desinfektionsgarantie und keine erfundenen Nachweise.",
      "Anfrage und Angebot werden nach Räumen, Zeiten, Zugang und Leistungsumfang sortiert.",
    ],
    faqItems: [
      {
        q: "Für welche Praxen ist die Anfrage gedacht?",
        a: "Für Praxisräume, Empfang, Sanitärbereiche, sensible Bereiche und regelmäßige Reinigung, wenn Räume, Zeiten, Zugang und Ansprechpartner klar beschrieben werden.",
      },
      ...baseFaqItems.slice(1),
    ],
    about: ["Praxisreinigung Düsseldorf", "Arztpraxis reinigen lassen Düsseldorf", "Praxisreinigung Angebot prüfen"],
  },
  fensterreinigung: {
    key: "fensterreinigung",
    path: "/duesseldorf/fensterreinigung",
    meta: getPrioritySeoMeta("/duesseldorf/fensterreinigung"),
    title: "Fensterreinigung Düsseldorf - Glasflächen und Termin klären",
    description:
      "Fensterreinigung in Düsseldorf anfragen: Glasflächen, Fensterzahl, Rahmen/Falze optional, Erreichbarkeit, Turnus und Termin beschreiben.",
    ogTitle: "Fensterreinigung Düsseldorf - Glasflächen, Umfang und Termin klären",
    eyebrow: "Fensterreinigung Düsseldorf",
    h1: "Fensterreinigung in Düsseldorf anfragen - Glasflächen, Umfang und Termin klären",
    intro:
      "Für Fenster- und Glasreinigung in Düsseldorf zählen Glasflächen, Fensterzahl, Rahmen/Falze optional, Erreichbarkeit, Turnus und Termin. FLOXANT macht keine riskanten Höhen- oder Sicherheitsversprechen ohne Prüfung.",
    quickAnswer:
      "Für Fensterreinigung in Düsseldorf helfen Fensterzahl, Glasflächen, Innen/Außen, Rahmen/Falze optional, Etage, Erreichbarkeit, Turnus, Fotos und Terminwunsch.",
    serviceType: "Fensterreinigung und Glasreinigung Düsseldorf",
    primaryCta: {
      href: windowContact,
      label: "Fensterreinigung in Düsseldorf anfragen",
      service: "fensterreinigung",
      intent: "fensterreinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: windowOfferContact,
      label: "Fensterreinigungsangebot prüfen lassen",
      service: "fensterreinigung",
      intent: "fensterreinigung-angebot-pruefen",
      priority: "p1",
    },
    situations: [
      {
        icon: PanelsTopLeft,
        title: "Private oder gewerbliche Glasflächen",
        text: "Wohnung, Büro oder Gewerbe werden nach Glasfläche, Erreichbarkeit und Termin getrennt betrachtet.",
      },
      {
        icon: ClipboardCheck,
        title: "Rahmen und Falze optional",
        text: "Wichtig ist, ob nur Glas oder auch Rahmen/Falze gewünscht sind.",
      },
      {
        icon: ShieldCheck,
        title: "Erreichbarkeit zuerst klären",
        text: "Etage, Zugang, innen/außen und Fotos helfen, ohne riskante Sicherheitsversprechen zu machen.",
      },
    ],
    needs: [
      "Fensterzahl oder grobe Glasfläche",
      "innen, außen, Rahmen/Falze optional",
      "Etage und Erreichbarkeit",
      "privat, Büro oder Gewerbe",
      "Turnus oder einmaliger Termin",
      "Fotos, falls möglich und ohne private Daten",
    ],
    effortFactors: [
      "Glasfläche und Fensterzahl",
      "Innen/Außen und Rahmen/Falze",
      "Etage und Zugang",
      "Turnus und Terminfenster",
      "Sonderflächen oder schwer erreichbare Bereiche",
      "Fotos und vorhandenes Angebot",
    ],
    serviceCards: [
      hubServiceCards[0],
      hubServiceCards[1],
      hubServiceCards[5],
    ],
    b2bTrust: [
      "Fensterreinigung wird nach Fläche, Erreichbarkeit, Turnus und Leistungsumfang eingeordnet.",
      "Keine erfundenen Spezialgeräte, keine Höhenzusage und keine Sicherheitsgarantie ohne Prüfung.",
      "Glasreinigung, Rahmen/Falze und Innen/Außen werden getrennt beschrieben.",
    ],
    faqItems: [
      {
        q: "Welche Angaben helfen bei Fensterreinigung in Düsseldorf?",
        a: "Hilfreich sind Fensterzahl, Glasflächen, innen/außen, Rahmen/Falze, Etage, Erreichbarkeit, Turnus, Termin und Fotos.",
      },
      ...baseFaqItems.slice(1),
    ],
    about: ["Fensterreinigung Düsseldorf", "Glasreinigung Düsseldorf", "Fensterreinigungsangebot prüfen"],
  },
  grundreinigung: {
    key: "grundreinigung",
    path: "/duesseldorf/grundreinigung",
    meta: getPrioritySeoMeta("/duesseldorf/grundreinigung"),
    title: "Grundreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
    description:
      "Grundreinigung in Düsseldorf anfragen: Räume, Fläche, Verschmutzung, Schwerpunkte und Zielzustand nennen. Für Wohnung, Haus, Büro oder Gewerbe.",
    ogTitle: "Grundreinigung Düsseldorf – gründlich und passend zum Objekt anfragen",
    eyebrow: "Grundreinigung Düsseldorf",
    h1: "Grundreinigung in Düsseldorf: gründlich geplant für Wohnung, Haus und Gewerbe",
    intro:
      "Eine Grundreinigung geht über die laufende Reinigung hinaus. Nennen Sie Räume, Fläche, sichtbare Verschmutzungen, schwer erreichbare Bereiche und den gewünschten Zielzustand. FLOXANT prüft, welche Leistungen zum Objekt und Termin passen.",
    quickAnswer:
      "Für eine Grundreinigung in Düsseldorf helfen Objektart, Quadratmeter, Raumliste, Verschmutzungsgrad, gewünschte Schwerpunkte, Zugang, Fotos und Termin. So lässt sich klären, was enthalten sein soll und welche Punkte separat geprüft werden müssen.",
    serviceType: "Grundreinigung für Wohnung, Haus, Büro und Gewerbe in Düsseldorf",
    primaryCta: {
      href: deepCleaningContact,
      label: "Grundreinigung in Düsseldorf anfragen",
      service: "grundreinigung",
      intent: "grundreinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: deepCleaningOfferContact,
      label: "Angebot für Grundreinigung prüfen",
      service: "grundreinigung",
      intent: "grundreinigung-angebot-pruefen",
      priority: "p1",
    },
    situations: [
      {
        icon: Sparkles,
        title: "Intensive Wohnungsreinigung",
        text: "Für Küche, Bad, Böden, Türen, Sockelleisten und festgelegte Detailflächen nach längerer Nutzung.",
      },
      {
        icon: Home,
        title: "Vor Einzug oder Übergabe",
        text: "Wenn eine leere oder möblierte Wohnung vor Einzug, Rückgabe oder Besichtigung gründlich vorbereitet werden soll.",
      },
      {
        icon: Store,
        title: "Büro und Gewerbefläche",
        text: "Für stärkere Verschmutzung, saisonale Intensivreinigung oder definierte Sonderbereiche außerhalb des normalen Turnus.",
      },
    ],
    needs: [
      "Objektart, Fläche und Raumanzahl",
      "möbliert, leer oder teilweise zugänglich",
      "sichtbare Verschmutzungen und gewünschte Schwerpunkte",
      "Böden, Küche, Bad, Türen, Sockelleisten oder andere Detailflächen",
      "Fotos, Zugang und Terminwunsch",
      "vorhandenes Angebot oder Leistungsverzeichnis optional",
    ],
    effortFactors: [
      "Fläche, Raumanzahl und Möblierung",
      "Verschmutzungsgrad und Detailtiefe",
      "Materialien und empfindliche Oberflächen",
      "schwer erreichbare Bereiche",
      "gewünschter Zielzustand und Termin",
      "Zusatzleistungen wie Fenster oder Geräte innen",
    ],
    serviceCards: [hubServiceCards[0], hubServiceCards[3], hubServiceCards[8], hubServiceCards[9]],
    b2bTrust: [
      "Der gewünschte Umfang wird vorab als Liste geklärt, damit Grundreinigung nicht mit Unterhaltsreinigung verwechselt wird.",
      "Materialien, empfindliche Oberflächen und schwer erreichbare Bereiche werden vor einer Zusage geprüft.",
      "Fotos und ein vorhandenes Leistungsverzeichnis helfen, Angebote nachvollziehbar zu vergleichen.",
    ],
    faqItems: [
      {
        q: "Was gehört zu einer Grundreinigung in Düsseldorf?",
        a: "Der genaue Umfang wird für jedes Objekt festgelegt. Häufig geht es um Böden, Küche, Bad, Türen, Sockelleisten und definierte Detailflächen. Fenster, Geräte innen oder Sonderflächen sollten ausdrücklich genannt werden.",
      },
      {
        q: "Was ist der Unterschied zur Unterhaltsreinigung?",
        a: "Grundreinigung ist intensiver und meist einmalig oder in größeren Abständen. Unterhaltsreinigung ist eine wiederkehrende Reinigung nach festem Plan und Turnus.",
      },
      ...baseFaqItems.slice(1),
    ],
    about: ["Grundreinigung Düsseldorf", "Grundreinigung Wohnung Düsseldorf", "Intensivreinigung Düsseldorf"],
  },
  unterhaltsreinigung: {
    key: "unterhaltsreinigung",
    path: "/duesseldorf/unterhaltsreinigung",
    meta: getPrioritySeoMeta("/duesseldorf/unterhaltsreinigung"),
    title: "Unterhaltsreinigung Düsseldorf für Büro & Objekt | FLOXANT",
    description:
      "Unterhaltsreinigung in Düsseldorf anfragen: Flächen, Bereiche, Turnus, Reinigungszeiten, Zugang und Ansprechpartner für Büro, Gewerbe oder Objekt klären.",
    ogTitle: "Unterhaltsreinigung Düsseldorf – Turnus und Leistung klar abstimmen",
    eyebrow: "Unterhaltsreinigung Düsseldorf",
    h1: "Unterhaltsreinigung in Düsseldorf: klare Abläufe für Büro, Gewerbe und Objekt",
    intro:
      "Regelmäßige Reinigung funktioniert dann gut, wenn Bereiche, Turnus, Zeitfenster, Zugang und Ansprechpartner klar sind. FLOXANT hilft, die laufende Reinigung für Büro, Gewerbe, Treppenhaus oder Gemeinschaftsflächen verständlich anzufragen.",
    quickAnswer:
      "Für Unterhaltsreinigung in Düsseldorf werden Fläche, Raumarten, gewünschte Bereiche, Häufigkeit, Reinigungszeiten, Zugang und Ansprechpartner benötigt. Ein vorhandenes Leistungsverzeichnis macht den Vergleich einfacher.",
    serviceType: "Unterhaltsreinigung für Büro, Gewerbe und Objekt in Düsseldorf",
    primaryCta: {
      href: maintenanceCleaningContact,
      label: "Unterhaltsreinigung anfragen",
      service: "unterhaltsreinigung",
      intent: "unterhaltsreinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: maintenanceCleaningOfferContact,
      label: "Unterhaltsreinigungsangebot prüfen",
      service: "unterhaltsreinigung",
      intent: "unterhaltsreinigung-angebot-pruefen",
      priority: "p1",
    },
    situations: [
      {
        icon: Building2,
        title: "Büro mit festem Turnus",
        text: "Arbeitsplätze, Empfang, Küche, Sanitär und Besprechungsräume nach Wochenplan und Zeitfenster.",
      },
      {
        icon: Store,
        title: "Gewerbe und Objektflächen",
        text: "Laufende Reinigung passend zu Nutzung, Kundenverkehr, Öffnungszeiten und empfindlichen Bereichen.",
      },
      {
        icon: ClipboardCheck,
        title: "Hausverwaltung und Gemeinschaftsflächen",
        text: "Treppenhaus, Eingang, Aufzug oder andere gemeinsam genutzte Flächen mit Zugang und Kontrollpunkten.",
      },
    ],
    needs: [
      "Objektart, Fläche und Raumliste",
      "gewünschter Turnus und Wochentage",
      "Reinigungszeiten und Nutzungszeiten",
      "Sanitär, Küche, Empfang und Sonderbereiche",
      "Zugang, Schlüsselregelung und Ansprechpartner",
      "Leistungsverzeichnis oder vorhandenes Angebot optional",
    ],
    effortFactors: [
      "Fläche, Raumarten und Nutzungsintensität",
      "Häufigkeit und Wochentage",
      "Zeitfenster außerhalb oder während der Nutzung",
      "Sanitär-, Küchen- und Publikumsbereiche",
      "Zugang und Schlüsselorganisation",
      "Verbrauchsmaterial oder Zusatzleistungen nach Abstimmung",
    ],
    serviceCards: [hubServiceCards[0], hubServiceCards[1], hubServiceCards[5], hubServiceCards[8]],
    b2bTrust: [
      "Turnus, Bereiche und Verantwortlichkeiten werden vorab verständlich festgehalten.",
      "Keine erfundenen Referenzen oder pauschalen Qualitätsgarantien ohne konkreten Leistungsumfang.",
      "Ein vorhandenes Angebot wird nach enthaltenen Leistungen, Intervallen und Zusatzpositionen geprüft.",
    ],
    faqItems: [
      {
        q: "Wie oft kann Unterhaltsreinigung stattfinden?",
        a: "Der passende Turnus hängt von Nutzung, Fläche und Bereichen ab. Möglich sind zum Beispiel mehrere Termine pro Woche, wöchentlich oder andere abgestimmte Intervalle; eine Zusage erfolgt nach Prüfung.",
      },
      {
        q: "Ist Treppenhausreinigung Teil der Unterhaltsreinigung?",
        a: "Sie kann Teil eines laufenden Objektplans sein. Eingang, Etagen, Geländer, Aufzug und Zusatzbereiche sollten im Leistungsverzeichnis einzeln benannt werden.",
      },
      ...baseFaqItems.slice(1),
    ],
    about: ["Unterhaltsreinigung Düsseldorf", "laufende Büroreinigung Düsseldorf", "Objektreinigung Düsseldorf"],
  },
  baureinigung: {
    key: "baureinigung",
    path: "/duesseldorf/baureinigung",
    meta: getPrioritySeoMeta("/duesseldorf/baureinigung"),
    title: "Bauendreinigung Düsseldorf nach Bau & Renovierung | FLOXANT",
    description:
      "Bau- oder Bauendreinigung in Düsseldorf anfragen: Bauphase, Fläche, Staub, Schutzfolien, Restarbeiten, Zugang und Übergabetermin verständlich beschreiben.",
    ogTitle: "Bauendreinigung Düsseldorf – sauber zur Abnahme oder Übergabe",
    eyebrow: "Bauendreinigung Düsseldorf",
    h1: "Bau- und Bauendreinigung in Düsseldorf: vorbereitet für Abnahme, Einzug oder Übergabe",
    intro:
      "Nach Bau, Umbau oder Renovierung kommt es auf Bauphase, Restarbeiten, Staubbelastung, Schutzfolien, Oberflächen und den Übergabetermin an. FLOXANT prüft den gewünschten Umfang, bevor eine Leistung oder ein Termin zugesagt wird.",
    quickAnswer:
      "Für Bauendreinigung in Düsseldorf helfen Bauphase, Quadratmeter, Raumliste, Art der Rückstände, empfindliche Oberflächen, Fotos, Wasser- und Stromzugang sowie der geplante Abnahme- oder Übergabetermin.",
    serviceType: "Bauzwischenreinigung und Bauendreinigung in Düsseldorf",
    primaryCta: {
      href: constructionCleaningContact,
      label: "Bauendreinigung in Düsseldorf anfragen",
      service: "baureinigung",
      intent: "bauendreinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: constructionCleaningOfferContact,
      label: "Baureinigungsangebot prüfen",
      service: "baureinigung",
      intent: "bauendreinigung-angebot-pruefen",
      priority: "p1",
    },
    situations: [
      {
        icon: ClipboardCheck,
        title: "Nach Neubau oder Umbau",
        text: "Baustaub, Etiketten, Schutzfolien und typische Rückstände vor Abnahme oder Nutzung einordnen.",
      },
      {
        icon: Home,
        title: "Nach Renovierung",
        text: "Wohnung, Haus, Büro oder Ladenfläche nach Maler-, Boden- oder Montagearbeiten vorbereiten.",
      },
      {
        icon: CalendarClock,
        title: "Vor Abnahme oder Übergabe",
        text: "Termin, Restarbeiten und mögliche Nacharbeiten realistisch aufeinander abstimmen.",
      },
    ],
    needs: [
      "Bauphase und Art der Arbeiten",
      "Fläche, Räume und Etagen",
      "Art der Rückstände und sichtbarer Baustaub",
      "Schutzfolien, Etiketten und empfindliche Oberflächen",
      "Wasser, Strom, Zugang und Entsorgungssituation",
      "Fotos sowie Abnahme- oder Übergabetermin",
    ],
    effortFactors: [
      "Bauphase, Fläche und Raumanzahl",
      "Staub, Folien, Etiketten und Materialreste",
      "empfindliche neue Oberflächen",
      "Restarbeiten anderer Gewerke",
      "Zugang, Wasser, Strom und Laufwege",
      "Abnahmefrist und gewünschter Zielzustand",
    ],
    serviceCards: [hubServiceCards[7], hubServiceCards[8], hubServiceCards[3], hubServiceCards[6]],
    b2bTrust: [
      "Bauzwischenreinigung und Bauendreinigung werden nach Bauphase und Zielzustand getrennt.",
      "Fest anhaftende Rückstände, Gefahrstoffe oder Entsorgung werden nicht pauschal zugesagt.",
      "Fotos und der aktuelle Stand der Restarbeiten helfen, Termin und Umfang realistisch zu prüfen.",
    ],
    faqItems: [
      {
        q: "Was ist der Unterschied zwischen Baureinigung und Bauendreinigung?",
        a: "Baureinigung kann auch während eines Bau- oder Umbauprojekts stattfinden. Bauendreinigung bereitet Flächen nach Abschluss der Arbeiten auf Abnahme, Einzug oder Übergabe vor.",
      },
      {
        q: "Wann sollte die Bauendreinigung angefragt werden?",
        a: "Sobald Bauphase, Restarbeiten und voraussichtlicher Übergabetermin absehbar sind. Fotos und eine Raumliste helfen, den Umfang früh zu prüfen.",
      },
      ...baseFaqItems.slice(1),
    ],
    about: ["Bauendreinigung Düsseldorf", "Baureinigung Düsseldorf", "Reinigung nach Renovierung Düsseldorf"],
  },
  treppenhausreinigung: {
    key: "treppenhausreinigung",
    path: "/duesseldorf/treppenhausreinigung",
    title: "Treppenhausreinigung Düsseldorf für Hausverwaltung & WEG | FLOXANT",
    description:
      "Treppenhausreinigung in Düsseldorf anfragen: Etagen, Eingang, Geländer, Aufzug, Gemeinschaftsflächen, Turnus, Zugang und Ansprechpartner klar beschreiben.",
    ogTitle: "Treppenhausreinigung Düsseldorf – Turnus und Bereiche klar vereinbaren",
    eyebrow: "Treppenhausreinigung Düsseldorf",
    h1: "Treppenhausreinigung in Düsseldorf für gepflegte Gemeinschaftsflächen",
    intro:
      "Für ein Mehrfamilienhaus, eine Eigentümergemeinschaft oder ein Gewerbeobjekt zählen klare Bereiche und ein verlässlicher Abstimmungsweg. Nennen Sie Etagen, Eingang, Geländer, Aufzug, Zusatzflächen, gewünschten Turnus und Zugang. FLOXANT prüft den passenden Umfang vor einer Zusage.",
    quickAnswer:
      "Für eine Treppenhausreinigung in Düsseldorf helfen Objektart, Anzahl der Etagen und Eingänge, Aufzug, Bodenarten, gewünschte Bereiche, Turnus, Zugang, Ansprechpartner, Fotos und ein vorhandenes Leistungsverzeichnis.",
    serviceType: "Treppenhausreinigung für Wohn- und Gewerbeobjekte in Düsseldorf",
    primaryCta: {
      href: staircaseCleaningContact,
      label: "Treppenhausreinigung in Düsseldorf anfragen",
      service: "treppenhausreinigung",
      intent: "treppenhausreinigung-duesseldorf",
      priority: "p0",
    },
    offerCta: {
      href: propertyCleaningOfferContact,
      label: "Treppenhaus-Angebot prüfen",
      service: "angebotscheck",
      intent: "treppenhausreinigung-angebot-pruefen",
      priority: "p1",
    },
    situations: [
      {
        icon: Building2,
        title: "Hausverwaltung oder WEG",
        text: "Eingänge, Etagen, Geländer, Aufzug und Gemeinschaftswege mit Turnus und Ansprechpartner einordnen.",
      },
      {
        icon: Home,
        title: "Mehrfamilienhaus",
        text: "Wiederkehrende Reinigung für ein bewohntes Objekt mit Zugang, Bodenarten und Zusatzflächen abstimmen.",
      },
      {
        icon: Store,
        title: "Gewerbeobjekt",
        text: "Treppen, Eingangszone und gemeinsam genutzte Wege passend zu Nutzungszeiten und Zugangsregeln beschreiben.",
      },
    ],
    needs: [
      "Objektart, Adresse oder Stadtteil",
      "Anzahl der Eingänge, Etagen und Treppenläufe",
      "Bodenarten, Geländer und vorhandener Aufzug",
      "gewünschte Bereiche und Turnus",
      "Zugang, Schlüsselweg und mögliche Reinigungszeiten",
      "Ansprechpartner, Fotos oder Leistungsverzeichnis optional",
    ],
    effortFactors: [
      "Anzahl der Eingänge, Etagen und Treppenläufe",
      "Bodenarten, Stufen, Podeste und Geländer",
      "Aufzug und weitere Gemeinschaftsflächen",
      "Nutzungsintensität und Verschmutzungsgrad",
      "Turnus, Reinigungszeit und Zugang",
      "Keller, Glas, Außenstufen oder Sonderbereiche nach Vereinbarung",
    ],
    serviceCards: [hubServiceCards[11], hubServiceCards[9], hubServiceCards[0], hubServiceCards[1]],
    b2bTrust: [
      "Bereiche, Turnus und Zugangsweg werden vor einer Zusage konkret abgefragt.",
      "Hausverwaltung, WEG oder Vermieter erhalten einen klaren Kontaktweg für Rückfragen.",
      "Keller, Glas, Außenflächen oder Verbrauchsmaterial gelten nicht automatisch als enthalten.",
    ],
    faqItems: [
      {
        q: "Welche Bereiche können bei einer Treppenhausreinigung berücksichtigt werden?",
        a: "Je nach Vereinbarung können Eingang, Treppen, Podeste, Geländer, Aufzug und ausgewählte Gemeinschaftsflächen berücksichtigt werden. Zusatzbereiche sollten ausdrücklich genannt werden.",
      },
      {
        q: "Kann eine Hausverwaltung einen festen Turnus anfragen?",
        a: "Ja. Nennen Sie Objekt, Bereiche, gewünschte Wochentage oder Intervalle, Zugang und Ansprechpartner. FLOXANT prüft anschließend Umfang und Machbarkeit.",
      },
      {
        q: "Sind Keller, Fenster oder Außenstufen automatisch enthalten?",
        a: "Nein. Solche Bereiche sind nur enthalten, wenn sie ausdrücklich beschrieben, geprüft und vereinbart wurden.",
      },
      ...baseFaqItems.slice(1, 3),
    ],
    about: [
      "Treppenhausreinigung Düsseldorf",
      "Treppenreinigung Düsseldorf",
      "Hausverwaltung-Reinigung Düsseldorf",
      "WEG-Reinigung Düsseldorf",
    ],
  },
};

const serviceScopeByPage: Record<DuesseldorfCleaningPageKey, readonly string[]> = {
  reinigung: ["vereinbarte Räume und erreichbare Oberflächen", "Böden und sichtbare Kontaktflächen", "Küche oder Sanitär nach beschriebenem Umfang"],
  bueroreinigung: ["Arbeits- und Besprechungsbereiche", "Empfang, Küche und Sanitär nach Raumliste", "Böden und erreichbare Oberflächen im vereinbarten Turnus"],
  gewerbereinigung: ["vereinbarte Nutz- und Nebenflächen", "Böden, erreichbare Oberflächen und Sanitär", "objektspezifische Bereiche nach vorheriger Prüfung"],
  praxisreinigung: ["Empfang, Warte- und Behandlungsräume nach Raumliste", "Sanitär und erreichbare Oberflächen", "Reinigungszeiten passend zum Praxisbetrieb"],
  fensterreinigung: ["vereinbarte Glasflächen innen oder außen", "Rahmen und Falze nur nach ausdrücklicher Vereinbarung", "zugängliche Fenster anhand der beschriebenen Höhe"],
  grundreinigung: ["vereinbarte Räume und Reinigungsschwerpunkte", "intensivere Bearbeitung erreichbarer Flächen", "klar beschriebener Zielzustand nach Objektprüfung"],
  unterhaltsreinigung: ["wiederkehrende Reinigung nach Raumliste", "vereinbarte Böden, Oberflächen, Küche und Sanitär", "festgelegter Turnus und Zugangszeit"],
  baureinigung: ["vereinbarte Flächen nach Bau- oder Renovierungsphase", "Baustaub und typische lose Rückstände nach Prüfung", "Vorbereitung auf Abnahme, Einzug oder Übergabe im abgestimmten Umfang"],
  treppenhausreinigung: ["Eingang, Treppen und Podeste nach Vereinbarung", "Geländer und Aufzug im beschriebenen Umfang", "ausgewählte Gemeinschaftsflächen im vereinbarten Turnus"],
};

const notIncludedByPage: Record<DuesseldorfCleaningPageKey, readonly string[]> = {
  reinigung: ["Entsorgung größerer Mengen", "Gefahrstoff- oder Schädlingsbeseitigung", "nicht beschriebene Sonderflächen"],
  bueroreinigung: ["IT-Innenreinigung", "Akten- oder Arbeitsplatzorganisation", "Verbrauchsmaterial ohne Vereinbarung"],
  gewerbereinigung: ["Maschinen-Innenreinigung", "produktionsbedingte Gefahrstoffe", "Höhenarbeiten ohne Zugangsprüfung"],
  praxisreinigung: ["medizinische Spezialdesinfektion ohne gesonderte Prüfung", "Instrumentenaufbereitung", "Entsorgung medizinischer Abfälle"],
  fensterreinigung: ["Höhenzugang oder Hebebühne ohne Prüfung", "beschädigte oder nicht sicher erreichbare Elemente", "Rahmen und Falze ohne Vereinbarung"],
  grundreinigung: ["Sanierung beschädigter Oberflächen", "Schimmel- oder Gefahrstoffbeseitigung", "Entrümpelung und Entsorgung ohne Vereinbarung"],
  unterhaltsreinigung: ["Grund- oder Bauendreinigung", "Fenster und Sonderflächen ohne Leistungsplan", "Verbrauchsmaterial ohne Vereinbarung"],
  baureinigung: ["Bauschutt- und Gefahrstoffentsorgung", "Handwerker-Nacharbeiten", "Entfernung unbekannter fest haftender Rückstände ohne Prüfung"],
  treppenhausreinigung: ["Keller, Müllraum oder Außenanlage ohne Vereinbarung", "Fenster- und Glasreinigung ohne Leistungsplan", "Winterdienst und technische Hausmeisterarbeiten"],
};

const intentFocusByPage: Record<
  DuesseldorfCleaningPageKey,
  { suitableFor: string; chooseWhen: string; nextStep: string }
> = {
  reinigung: {
    suitableFor:
      "Für private Wohnungen, Büros, Praxen, Gewerbeflächen und Objektverantwortliche, die zuerst die passende Reinigungsart auswählen möchten.",
    chooseWhen:
      "Wählen Sie diese Übersicht, wenn noch offen ist, ob Büro-, Praxis-, Fenster-, Grund-, Unterhalts- oder Bauendreinigung am besten passt.",
    nextStep:
      "Nennen Sie Objektart, Fläche, Zustand, Turnus oder Anlass und Terminwunsch. Danach lässt sich die passende Spezialleistung auswählen.",
  },
  bueroreinigung: {
    suitableFor:
      "Für Unternehmen, Kanzleien, Agenturen und andere Büroflächen mit Arbeitsplätzen, Besprechungsräumen, Küche, Empfang oder Sanitärbereichen.",
    chooseWhen:
      "Wählen Sie Büroreinigung, wenn ein planbarer Büroalltag, feste Räume und ein einmaliger oder wiederkehrender Turnus im Mittelpunkt stehen.",
    nextStep:
      "Senden Sie Fläche, Raumliste, gewünschte Wochentage, Reinigungszeiten, Zugang und Ansprechpartner.",
  },
  gewerbereinigung: {
    suitableFor:
      "Für Läden, gemischt genutzte Gewerbeflächen, Objektbereiche und Betriebe, deren Nutzung über eine klassische Bürofläche hinausgeht.",
    chooseWhen:
      "Wählen Sie Gewerbereinigung, wenn Objektart, Nutzungszeiten, Sonderflächen oder betriebliche Abläufe den Reinigungsumfang bestimmen.",
    nextStep:
      "Beschreiben Sie Objektart, Fläche, Nutzung, Zeitfenster, Turnus, Zugang und besondere Bereiche.",
  },
  praxisreinigung: {
    suitableFor:
      "Für Praxen sowie Therapie- und Beratungsräume mit Empfang, Wartebereich, Behandlungsräumen, Büro- und Sanitärflächen.",
    chooseWhen:
      "Wählen Sie Praxisreinigung für die allgemeine Reinigung von Praxisräumen. Medizinische Spezialdesinfektion, Instrumentenaufbereitung und medizinische Abfälle sind nicht automatisch enthalten.",
    nextStep:
      "Nennen Sie Raumarten, Fläche, sensible Bereiche, gewünschte Zeiten, Zugang und Ansprechpartner.",
  },
  fensterreinigung: {
    suitableFor:
      "Für private und gewerbliche Fenster, Schaufenster und erreichbare Glasflächen, wenn Anzahl, Größe und Zugang beschrieben werden können.",
    chooseWhen:
      "Wählen Sie Fensterreinigung, wenn Glasflächen die Hauptleistung sind. Rahmen, Falze, Höhenzugang und Innen- oder Außenseite werden getrennt vereinbart.",
    nextStep:
      "Senden Sie Fensterzahl oder Fotos, ungefähre Größe, Etage, Erreichbarkeit, gewünschte Seiten und Terminwunsch.",
  },
  grundreinigung: {
    suitableFor:
      "Für Wohnungen, Häuser, Büros und Gewerbeflächen, die einmalig intensiver als bei einer laufenden Reinigung bearbeitet werden sollen.",
    chooseWhen:
      "Wählen Sie Grundreinigung bei stärkerer Verschmutzung oder einem klaren einmaligen Zielzustand. Für einen festen Turnus ist Unterhaltsreinigung passender.",
    nextStep:
      "Beschreiben Sie Fläche, Zustand, Böden, Küche, Sanitär, Schwerpunkte, schwer erreichbare Bereiche und mögliche Fotos.",
  },
  unterhaltsreinigung: {
    suitableFor:
      "Für Büros, Praxen, Gewerbe- und Objektflächen mit wiederkehrender Reinigung nach Raumliste und abgestimmtem Turnus.",
    chooseWhen:
      "Wählen Sie Unterhaltsreinigung, wenn dieselben Bereiche regelmäßig zu vereinbarten Zeiten gereinigt werden sollen.",
    nextStep:
      "Nennen Sie Objektart, Fläche, Räume, gewünschten Turnus, Zeitfenster, Zugang und festen Ansprechpartner.",
  },
  baureinigung: {
    suitableFor:
      "Für Wohnungen, Häuser, Büros oder Gewerbeflächen nach Neubau, Umbau, Renovierung oder Handwerkerarbeiten.",
    chooseWhen:
      "Wählen Sie Bauendreinigung, wenn Flächen für Abnahme, Einzug oder Übergabe vorbereitet werden sollen. Bauzwischenreinigung betrifft frühere Bauphasen.",
    nextStep:
      "Senden Sie Bauphase, Fläche, Art der Rückstände, Fotos, Restarbeiten, Zugang und geplanten Abnahme- oder Übergabetermin.",
  },
  treppenhausreinigung: {
    suitableFor:
      "Für Hausverwaltungen, Eigentümergemeinschaften und Objektverantwortliche mit Eingängen, Treppen, Podesten und vereinbarten Gemeinschaftsflächen.",
    chooseWhen:
      "Wählen Sie Treppenhausreinigung für einen wiederkehrenden Leistungsplan. Keller, Müllraum, Fenster oder Außenflächen werden nur bei Vereinbarung ergänzt.",
    nextStep:
      "Nennen Sie Etagen, Eingänge, Aufzug, weitere Bereiche, Turnus, Zugang und Ansprechpartner.",
  },
};

export function buildDuesseldorfCleaningMetadata(pageKey: DuesseldorfCleaningPageKey): Metadata {
  const config = duesseldorfCleaningPages[pageKey];
  const title = config.meta?.seoTitle ?? config.title;
  const description = config.meta?.description ?? config.description;
  const ogTitle = config.meta?.ogTitle ?? config.ogTitle;
  const ogDescription = config.meta?.ogDescription ?? description;

  return {
    metadataBase: new URL(company.url),
    title,
    description,
    alternates: {
      canonical: config.path,
      languages: {
        "de-DE": config.path,
        "x-default": config.path,
      },
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: config.path,
      title: ogTitle,
      description: ogDescription,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function JsonLd({ config }: { config: PageConfig }) {
  const title = config.meta?.seoTitle ?? config.title;
  const description = config.meta?.description ?? config.description;
  const headline = config.meta?.headline ?? config.h1;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: title,
        description,
        path: config.path,
        about: config.about,
        potentialActions: [
          { name: config.primaryCta.label, target: config.primaryCta.href, type: "ContactAction" },
          { name: config.offerCta.label, target: config.offerCta.href, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: headline,
        description,
        path: config.path,
        serviceType: config.serviceType,
        areaServed: [...duesseldorfArea],
        availableLanguage: ["de", "en"],
        provider: duesseldorfCompany,
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Düsseldorf", item: "/duesseldorf" },
        { name: config.eyebrow, item: config.path },
      ]),
      ...(getActivePriorityFaqAssignment(config.path)
        ? []
        : [buildFaqJsonLd(config.faqItems)]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-normal text-cyan-800">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{intro}</p> : null}
    </div>
  );
}

function CleaningCta({ cta, variant = "dark" }: { cta: CtaConfig; variant?: "dark" | "light" | "outline" }) {
  const className =
    variant === "light"
      ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
      : variant === "outline"
        ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-cyan-300 hover:bg-cyan-50"
        : "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-cyan-800";

  return (
    <Link
      href={cta.href}
      data-event="seo_cta_click"
      data-service={cta.service}
      data-city="duesseldorf"
      data-page-intent={cta.intent}
      data-priority={cta.priority}
      data-destination={cta.href}
      data-source="seo"
      data-cta-label={cta.label}
      className={className}
    >
      {cta.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function DuesseldorfCleaningHero({ config }: { config: PageConfig }) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#020617_0%,#103a46_48%,#263022_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300">
            <Link href="/" className="hover:text-white">FLOXANT</Link>
            <span>/</span>
            <Link href="/duesseldorf" className="hover:text-white">Düsseldorf</Link>
            <span>/</span>
            <span className="text-white">{config.eyebrow}</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {config.eyebrow}
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            {config.meta?.headline ?? config.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-100 sm:text-lg">
            {config.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CleaningCta cta={config.primaryCta} variant="light" />
            <CleaningCta cta={config.offerCta} variant="outline" />
          </div>
          <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-slate-300">
            Eine Anfrage ist noch keine Buchung. FLOXANT gibt keine Preisgarantie, keine Soforttermin-Garantie und
            keine garantierte Verfügbarkeit ohne geprüfte Eckdaten.
          </p>
        </div>
        <aside className="rounded-lg border border-white/12 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/25">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Anfragebriefing</p>
          <h2 className="mt-2 text-2xl font-black tracking-normal">Was zuerst geklärt werden sollte.</h2>
          <div className="mt-5 grid gap-3">
            {["Objektart und Fläche", "Zielzustand, Turnus und Termin", "Fotos oder Angebot optional"].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-bold leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-black text-emerald-950">Kontaktfluss</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-emerald-950/80">
              Der Button öffnet die passende Reinigungsanfrage für Düsseldorf.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CleaningQuickAnswer({ config }: { config: PageConfig }) {
  return (
    <section id="ai-answer" className="border-b border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Kurz erklärt
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Welche Angaben helfen bei {config.eyebrow}?
          </h2>
        </div>
        <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-5">
          <p className="text-base font-semibold leading-8 text-slate-800">{config.quickAnswer}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CleaningCta cta={config.primaryCta} />
            <CleaningCta cta={config.offerCta} variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceIntentFocus({ config }: { config: PageConfig }) {
  const focus = intentFocusByPage[config.key];
  return (
    <section className="border-b border-slate-200 bg-slate-50 px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Passt diese Leistung?</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            {config.eyebrow} passend zur Aufgabe auswählen
          </h2>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {[
            { title: "Für wen geeignet", text: focus.suitableFor },
            { title: "Wann diese Seite passt", text: focus.chooseWhen },
            { title: "Was Sie zuerst senden", text: focus.nextStep },
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black tracking-normal text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DuesseldorfCleaningAuthorityBlock({ config }: { config: PageConfig }) {
  const searchIntents = [
    {
      title: "Reinigungsfirma Düsseldorf",
      text: "Für private Wohnungen, möblierte Apartments, Büros, Praxen und gewerbliche Flächen zählt nicht ein pauschaler Preis, sondern ein prüfbarer Umfang.",
    },
    {
      title: "Büroreinigung und Gewerbereinigung",
      text: "Arbeitsplätze, Empfang, Sanitär, Küche, Ladenfläche oder Praxis werden nach Fläche, Turnus, Zugang und Reinigungszeit sauber getrennt.",
    },
    {
      title: "Fenster, Übergabe und Sonderfälle",
      text: "Fensterreinigung, Übergabereinigung, Grundreinigung oder Reinigung nach Auszug brauchen Fotos, Zielzustand und realistische Grenzen.",
    },
  ] as const;

  const localSignals = [
    "Düsseldorf als Hauptort der Anfrage klar nennen",
    "Stadtteil, Etage, Zugang und Park-/Haltesituation ergänzen",
    "Objektart: Wohnung, Büro, Praxis, Laden, Hausverwaltung oder Apartment",
    "Gewünschtes Ergebnis: einmalig, Übergabe, Turnus, Fenster oder Gewerbefläche",
  ] as const;

  return (
    <section className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10" aria-labelledby="duesseldorf-authority-heading">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Reinigung in Düsseldorf
          </p>
          <h2 id="duesseldorf-authority-heading" className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            Reinigung in Düsseldorf klar auswählen und passend anfragen.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            Hier finden Sie die passenden Leistungen rund um {config.eyebrow}: Reinigungsfirma,
            Büroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Wohnungsreinigung und möblierte
            Apartment-Reinigung in Düsseldorf. Der Text bleibt absichtlich praktisch: Was ist das Objekt, was soll
            sauber werden, bis wann und mit welchem Ziel?
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CleaningCta cta={config.primaryCta} />
            <Link
              href="/reinigung-moeblierte-wohnung-duesseldorf"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              Apartment-Reinigung Düsseldorf
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            {searchIntents.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black tracking-normal text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="rounded-lg border border-cyan-100 bg-white p-5">
            <h3 className="text-xl font-black tracking-normal text-slate-950">Was die Anfrage stärker macht</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {localSignals.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DuesseldorfCleaningNavigator({ config }: { config: PageConfig }) {
  const districts = [
    "Altstadt und Carlstadt",
    "Stadtmitte und Pempelfort",
    "Derendorf und Golzheim",
    "Flingern und Düsseltal",
    "Oberkassel und Niederkassel",
    "Bilk, Unterbilk und Friedrichstadt",
    "Wersten, Holthausen und Benrath",
    "Weitere Stadtteile nach Objektprüfung",
  ] as const;

  const customerPaths = [
    {
      title: "Privathaushalt und Wohnung",
      text: "Für Wohnungsreinigung, Grundreinigung, Auszug oder Übergabe: Fläche, Räume, Zustand, Etage und Termin nennen.",
      href: config.primaryCta.href,
      label: "Wohnungsreinigung beschreiben",
    },
    {
      title: "Büro, Praxis oder Gewerbe",
      text: "Für wiederkehrende Reinigung: Nutzungszeiten, Bereiche, Turnus, Zugang und Ansprechpartner zusammenfassen.",
      href: "/duesseldorf/bueroreinigung",
      label: "Büroreinigung auswählen",
    },
    {
      title: "Apartment und Gästewechsel",
      text: "Für möblierte Wohnungen und Ferienapartments: Checkout, nächster Check-in, Schlüsselweg und gewünschte Zusatzleistungen angeben.",
      href: "/reinigung-moeblierte-wohnung-duesseldorf",
      label: "Apartment-Reinigung ansehen",
    },
    {
      title: "Fenster, Bau oder Sonderreinigung",
      text: "Für Glas, Bauabschluss oder besondere Flächen helfen Fotos, Erreichbarkeit, Restarbeiten und ein klarer Zielzustand.",
      href: "/duesseldorf/fensterreinigung",
      label: "Fensterreinigung einordnen",
    },
  ] as const;

  return (
    <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10" aria-labelledby="duesseldorf-navigator-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Düsseldorf vor Ort
            </p>
            <h2 id="duesseldorf-navigator-heading" className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              Stadtteil, Objekt und Reinigungsziel in einem Schritt klären.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Ob Wohnung in Bilk, Büro in der Stadtmitte oder Apartment in Pempelfort: Entscheidend ist nicht nur der
              Stadtteil, sondern was gereinigt werden soll, wann Zugang möglich ist und welcher Zustand erreicht werden
              soll. FLOXANT prüft den Einsatz für Ihr konkretes Objekt.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Düsseldorfer Stadtteile und Bereiche">
              {districts.map((district) => (
                <span key={district} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
                  {district}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {customerPaths.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                <Link href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                  {item.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BueroreinigungGewerbereinigungComparison() {
  const items = [
    {
      icon: Building2,
      title: "Büroreinigung",
      text: "Für Arbeitsplätze, Besprechungsräume, Empfang, Küche, Sanitär, festen Turnus und Reinigungszeiten rund um den Büroalltag.",
      href: "/duesseldorf/bueroreinigung",
      cta: "Büroreinigung Düsseldorf anfragen",
    },
    {
      icon: Store,
      title: "Gewerbereinigung",
      text: "Für Objektart, Gewerbeflächen, Sonderflächen, Nutzungszeiten, Zugang, Leistungsumfang und vorhandene Angebotspositionen.",
      href: "/duesseldorf/gewerbereinigung",
      cta: "Gewerbereinigung Düsseldorf einordnen",
    },
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Büro oder Gewerbe?</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Zwei Leistungen, zwei klare Anfragewege.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
            FLOXANT trennt Büroreinigung und Gewerbereinigung bewusst, damit Fläche, Turnus,
            Reinigungszeiten, Objektart und Ansprechpartner im passenden Kontext landen.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map(({ icon: Icon, title, text, href, cta }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-300 hover:shadow-md"
            >
              <Icon className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                {cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCleaningQuickAnswer() {
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
      <p className="text-sm font-black uppercase tracking-normal text-emerald-800">Kurz erklärt für Hausverwaltungen</p>
      <p className="mt-3 text-base font-semibold leading-8 text-slate-800">
        Für eine Hausverwaltung-Reinigung helfen Angaben zu Objektart, Etagen, Bereichen, Turnus, Zugang,
        Schlüsselregelung und Ansprechpartner. FLOXANT kann eine Anfrage oder ein vorhandenes Angebot
        strukturieren. Preise, Verfügbarkeit oder rechtliche Bewertungen werden nicht garantiert.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {propertyCleaningCtas.map((cta, index) => (
          <CleaningCta key={cta.intent} cta={cta} variant={index === 0 ? "dark" : "outline"} />
        ))}
      </div>
    </div>
  );
}

function ObjectCleaningSituationGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {propertyCleaningSituations.map((item) => (
        <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
          {item}
        </div>
      ))}
    </div>
  );
}

function TreppenhausCleaningPanel() {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <ClipboardCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">Treppenhausreinigung</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
        Sinnvoll bei Hauseingang, Etagen, Geländer, Aufzug, Laufwegen und wiederkehrendem Turnus.
        Wichtig sind Anzahl der Etagen, Zugang, Schlüsselweg und mögliche Zusatzbereiche.
      </p>
      <Link
        href={staircaseCleaningContact}
        className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800"
        data-event="seo_cta_click"
        data-service="treppenhausreinigung"
        data-city="duesseldorf"
        data-page-intent="treppenhausreinigung-duesseldorf"
        data-priority="p0"
        data-cta-label="Treppenhausreinigung einordnen"
        data-destination={staircaseCleaningContact}
      >
        Treppenhausreinigung einordnen
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

function UnterhaltsreinigungPanel() {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <CalendarClock className="h-6 w-6 text-cyan-800" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">Unterhaltsreinigung</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
        Passt, wenn regelmäßige Reinigung nach Plan, Zeitfenster, Bereichen und Leistungsumfang gefragt ist.
        Sie kann Büro, Gewerbe, Gemeinschaftsflächen oder Objektbereiche abdecken.
      </p>
      <Link
        href={maintenanceCleaningContact}
        className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800"
        data-event="seo_cta_click"
        data-service="unterhaltsreinigung"
        data-city="duesseldorf"
        data-page-intent="unterhaltsreinigung-duesseldorf"
        data-priority="p0"
        data-cta-label="Unterhaltsreinigung mit Turnus klaeren"
        data-destination={maintenanceCleaningContact}
      >
        Unterhaltsreinigung mit Turnus klären
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

function PropertyCleaningEffortFactorsPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {propertyEffortFactors.map((item) => (
        <div key={item} className="rounded-lg border border-cyan-100 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
          {item}
        </div>
      ))}
    </div>
  );
}

function CleaningTurnusPanel() {
  return (
    <article className="rounded-lg border border-cyan-100 bg-white p-5">
      <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Turnus und Zugang</p>
      <h3 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
        Der Rhythmus ist Teil der Anfrage, nicht nur ein Preisdetail.
      </h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
        Einmalig, wöchentlich, 14-tägig, monatlich oder noch unklar: Entscheidend sind Nutzung,
        Verschmutzung, Zeitfenster, Schlüsselregelung und Ansprechpartner. Bitte keine Zugangscodes
        im Formular senden.
      </p>
    </article>
  );
}

function PropertyCleaningOfferCheckCTA() {
  return (
    <article className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
      <FileSearch className="h-6 w-6 text-emerald-800" aria-hidden="true" />
      <h3 className="mt-4 text-2xl font-black tracking-normal text-slate-950">
        Reinigungsangebot für Hausverwaltung prüfen
      </h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
        Wenn Turnus, Leistungsumfang, Zusatzpositionen, Etagen, Zugang oder Objektannahmen unklar sind,
        kann FLOXANT das Angebot organisatorisch einordnen. Keine Rechtsberatung, keine Preis- oder
        Ersparnisgarantie.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <CleaningCta cta={propertyCleaningCtas[2]!} />
        <Link
          href="/angebot-guenstiger-pruefen"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-emerald-400"
        >
          Angebotsprüfung erklärt
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function EnglishPropertyCleaningHint() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-black uppercase tracking-normal text-cyan-800">English property intent</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
        Property management cleaning, staircase cleaning, building cleaning and common area cleaning requests can be
        described in simple English. Useful details are object type, floors, common areas, frequency, access and contact person.
      </p>
    </div>
  );
}

function PropertyCleaningFAQ() {
  return (
    <div className="grid gap-3">
      {[
        {
          q: "Wo kann ich eine Reinigung für eine Hausverwaltung in Düsseldorf anfragen?",
          a: "Starten Sie über die Düsseldorfer Reinigungsseite. Nennen Sie Objektart, Bereiche, Turnus, Zugang und einen Ansprechpartner.",
        },
        {
          q: "Welche Angaben braucht FLOXANT für Wohnanlagenreinigung?",
          a: "Objektart, Etagen, Einheiten, Bereiche, Turnus, Zugang, Ansprechpartner und vorhandene Angebote helfen bei der Einordnung.",
        },
      ].map((item, index) => (
        <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function PropertyManagementCleaningSection() {
  return (
    <section id="hausverwaltung-reinigung" className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeading
            eyebrow="Hausverwaltung, Treppenhaus, Unterhalt"
            title="Reinigung für Hausverwaltungen mit Objekt, Turnus und Umfang klären."
            intro="Hier unterscheiden Sie Hausverwaltung-Reinigung, Treppenhausreinigung, Unterhaltsreinigung und Gebäudereinigung nach Objekt, Bereichen und gewünschtem Turnus."
          />
          <PropertyCleaningQuickAnswer />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <TreppenhausCleaningPanel />
          <UnterhaltsreinigungPanel />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="min-w-0">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Kundensituationen</p>
            <h3 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
              Wann Hausverwaltungen und Vermieter anfragen.
            </h3>
            <div className="mt-5">
              <ObjectCleaningSituationGrid />
            </div>
          </article>
          <article className="min-w-0">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Differenzierung</p>
            <h3 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
              Ein Anliegen, ein sauberer Anfrageweg.
            </h3>
            <div className="mt-5 grid gap-3">
              {propertyCleaningTypes.map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-cyan-300">
                  <h4 className="text-base font-black text-slate-950">{item.title}</h4>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                    Anfrageweg öffnen
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <CleaningTurnusPanel />
          <PropertyCleaningOfferCheckCTA />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <article className="min-w-0">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Wovon der Aufwand abhängt</p>
            <h3 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
              Was Aufwand, Rückfragen und Angebotbarkeit beeinflusst.
            </h3>
            <div className="mt-5">
              <PropertyCleaningEffortFactorsPanel />
            </div>
          </article>
          <div className="grid gap-4">
            <EnglishPropertyCleaningHint />
            <PropertyCleaningFAQ />
          </div>
        </div>
      </div>
    </section>
  );
}

function CleaningSituationGrid({ config }: { config: PageConfig }) {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Kundensituationen"
          title="Welche Reinigungsanfrage passt zu welchem Fall?"
          intro="Die Seite trennt Privat-, Gewerbe- und B2B-Anfragen, statt alles als dieselbe Reinigung zu verkaufen."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {config.situations.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CleaningScopeAndBoundaries({ config }: { config: PageConfig }) {
  return (
    <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Leistungsumfang"
          title="Was vereinbart werden kann – und was nicht automatisch dazugehört."
          intro="Der konkrete Umfang entsteht erst aus Objekt, Bereichen, Zustand, Zugang und Termin. Die Übersicht verhindert, dass wichtige Zusatzarbeiten stillschweigend vorausgesetzt werden."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="text-xl font-black text-emerald-950">Möglicher Umfang nach Vereinbarung</h3>
            <ul className="mt-5 grid gap-3">
              {serviceScopeByPage[config.key].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold leading-7 text-emerald-950/85">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="text-xl font-black text-amber-950">Nicht automatisch enthalten</h3>
            <ul className="mt-5 grid gap-3">
              {notIncludedByPage[config.key].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold leading-7 text-amber-950/85">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function CleaningEffortFactorsPanel({ config }: { config: PageConfig }) {
  return (
    <section className="border-y border-slate-200 bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Wovon der Aufwand abhängt</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Wovon Aufwand und Rückfragen abhängen.
          </h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-300">
            Je klarer Fläche, Objektart, Turnus und Zielzustand sind, desto besser kann FLOXANT die Anfrage einordnen.
            Das ersetzt keine Zusage, verhindert aber blinde Pauschalen.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {config.effortFactors.map((item) => (
            <div key={item} className="rounded-lg border border-white/12 bg-white/[0.06] p-4 text-sm font-bold leading-7 text-slate-100">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CleaningNeedsPanel({ config }: { config: PageConfig }) {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.96fr_1.04fr]">
        <article>
          <SectionHeading
            eyebrow="Ablauf"
            title="Vom Reinigungswunsch zur klaren Rückmeldung."
            intro="FLOXANT braucht keine perfekte Ausschreibung, aber genug Eckdaten für eine seriöse Einordnung."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Objektart und Ort angeben",
              "Fläche, Zustand und Termin beschreiben",
              "Fotos oder vorhandenes Angebot optional ergänzen",
              "FLOXANT ordnet Anfrage und nächste Schritte ein",
              "Rückmeldung über den gewünschten Kontaktweg",
            ].map((step, index) => (
              <div key={step} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-bold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Was FLOXANT braucht
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Diese Angaben machen die Einschätzung belastbarer.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {config.needs.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function CleaningServiceClusterCards({ config }: { config: PageConfig }) {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Ähnliche Leistungen"
          title="Reinigung, Büro, Gewerbe, Praxis und Glas sauber trennen."
          intro="Die Karten führen zu den passenden Reinigungsleistungen oder direkt zur Anfrage."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {config.serviceCards.map(({ icon: Icon, title, text, href, label }) => (
            <Link
              key={title}
              href={href || config.primaryCta.href}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-300 hover:bg-white hover:shadow-md"
              data-event="service_card_click"
              data-service={config.primaryCta.service}
              data-city="duesseldorf"
            >
              <Icon className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                {label || "Anfrage starten"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CleaningOfferCheckCTA({ config }: { config: PageConfig }) {
  return (
    <section id="reinigungsangebot-pruefen" className="bg-cyan-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <article>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <FileSearch className="h-4 w-4" aria-hidden="true" />
            Angebotsprüfung
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            Reinigungsangebot in Düsseldorf prüfen lassen
          </h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-700">
            Wenn ein Reinigungsangebot für Düsseldorf zu teuer, unklar oder schwer vergleichbar wirkt, kann FLOXANT die
            Angaben prüfen. Wichtig sind Fläche, Objektart, Turnus, Leistungsumfang, Termin und
            mögliche Zusatzkosten. Es gibt keine Ersparnisgarantie und keine Rechtsberatung.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CleaningCta cta={config.offerCta} />
            <Link
              href="/angebot-guenstiger-pruefen"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-200 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-cyan-400"
            >
              Angebotsprüfung erklärt
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/angebotscheck"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-200 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-cyan-400"
            >
              Angebotscheck öffnen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Fläche, Objektart und Turnus",
            "Leistungsumfang und Zusatzpositionen",
            "Termin, Frist und Reinigungszeiten",
            "Was fehlt, damit Angebote fair vergleichbar werden",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-cyan-100 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DuesseldorfLocalProofPanel() {
  const localSignals = [
    "Düsseldorf ist der Hauptort dieser Seite; Umland wird nur als Servicegebiet auf Anfrage formuliert.",
    "Neuss, Ratingen, Meerbusch, Hilden, Erkrath und Mettmann sind keine erfundenen Niederlassungen.",
    "Krefeld, Duisburg, Essen, Mönchengladbach, Wuppertal oder Köln werden nur nach Objekt, Strecke und Machbarkeit geprüft.",
    "Einsätze im Umland werden nach Ort, Objekt, Strecke und Termin einzeln geprüft.",
  ];

  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <SectionHeading
          eyebrow="Lokale Düsseldorf-Relevanz"
          title="Düsseldorf als Hauptort, Umgebung nur als Servicegebiet auf Anfrage."
          intro="FLOXANT behauptet keine zusätzliche Niederlassung im Umland. Entscheidend bleiben Objekt, Zugang, Umfang und Termin."
        />
        <div className="grid gap-3">
          {localSignals.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-800" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function B2BTrustPanel({ config }: { config: PageConfig }) {
  return (
    <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Hinweise für Unternehmen</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Klare Abstimmung für gewerbliche Aufträge.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
            FLOXANT nutzt klare Rückfragen, Fotos optional, Angebotsprüfung und einen nachvollziehbaren Kontaktweg.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {config.b2bTrust.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-cyan-800" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CleaningNoGuaranteePanel() {
  return (
    <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-amber-800">Was nicht versprochen wird</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Klare Anfrage statt falscher Sicherheit.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
            Zusagen entstehen erst nach Prüfung von Objekt, Umfang, Termin, Zugang und Machbarkeit.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {noPromiseItems.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-7 text-slate-700">
              <XCircle className="mt-1 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnglishCleaningHint({ config }: { config: PageConfig }) {
  return (
    <section className="border-y border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <article>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800">
            <Languages className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-black uppercase tracking-normal text-cyan-800">Information in English</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Cleaning request in simple English is okay.
          </h2>
        </article>
        <div>
          <p className="text-sm font-semibold leading-7 text-slate-700">
            International customers can describe a cleaning service, office cleaning, commercial cleaning, cleaning
            company or window cleaning request in simple English. FLOXANT needs object type, city, floor or access,
            area, service scope and preferred date.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CleaningCta cta={config.primaryCta} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CleaningFAQ({ config }: { config: PageConfig }) {
  return (
    <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Häufige Fragen zu {config.eyebrow}
          </h2>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CleaningCta cta={config.primaryCta} variant="light" />
            <CleaningCta cta={config.offerCta} variant="outline" />
          </div>
        </div>
        <div className="grid gap-3">
          {config.faqItems.map((item, index) => (
            <details key={item.q} open={index === 0} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
              <summary className="cursor-pointer text-base font-black text-white">{item.q}</summary>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DuesseldorfCleaningServicePage({ pageKey }: { pageKey: DuesseldorfCleaningPageKey }) {
  const config = duesseldorfCleaningPages[pageKey];
  const showsOfficeComparison = ["reinigung", "bueroreinigung", "gewerbereinigung"].includes(config.key);
  const showsPropertyManagement = [
    "reinigung",
    "gewerbereinigung",
    "unterhaltsreinigung",
    "treppenhausreinigung",
  ].includes(config.key);

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd config={config} />
      <DuesseldorfCleaningHero config={config} />
      <CleaningQuickAnswer config={config} />
      {config.key === "reinigung" ? <DuesseldorfCleaningAuthorityBlock config={config} /> : <ServiceIntentFocus config={config} />}
      <DuesseldorfCleaningNavigator config={config} />
      <RequestBriefChecklistBlock
        serviceKey={config.key}
        ctaHref={config.primaryCta.href}
        ctaLabel="Reinigungsdaten vorbereiten"
        compact
      />
      <PhotoGuidanceBlock serviceKey={config.key} compact />
      {showsOfficeComparison ? <BueroreinigungGewerbereinigungComparison /> : null}
      {showsPropertyManagement ? <PropertyManagementCleaningSection /> : null}
      <CleaningSituationGrid config={config} />
      <CleaningScopeAndBoundaries config={config} />
      <CleaningNeedsPanel config={config} />
      <CleaningEffortFactorsPanel config={config} />
      <CleaningServiceClusterCards config={config} />
      <CleaningOfferCheckCTA config={config} />
      <DuesseldorfLocalProofPanel />
      <B2BTrustPanel config={config} />
      <CleaningNoGuaranteePanel />
      <EnglishCleaningHint config={config} />
      {getActivePriorityFaqAssignment(config.path) ? (
        <PriorityFaqSection
          route={config.path}
          includeJsonLd
          tone="dark"
          title={`Häufige Fragen zu ${config.eyebrow}`}
          className="bg-slate-950"
        />
      ) : (
        <CleaningFAQ config={config} />
      )}
    </main>
  );
}
