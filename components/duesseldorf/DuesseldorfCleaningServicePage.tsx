import type { Metadata } from "next";
import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MessageCircle,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

import { company, duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  prioritySeoMetaRegistry,
  type PrioritySeoRoute,
} from "@/lib/content/seo-meta-registry";
import { buildLeadHref } from "@/lib/lead-intents";
import { searchAuthorityPages } from "@/lib/search-authority";
import { getLanguageAlternatesForPath } from "@/lib/local-seo/hreflangMap";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export type DuesseldorfCleaningPageKey =
  | "reinigung"
  | "bueroreinigung"
  | "praxisreinigung"
  | "fensterreinigung"
  | "gewerbereinigung"
  | "grundreinigung"
  | "unterhaltsreinigung"
  | "baureinigung"
  | "endreinigung"
  | "hotelreinigung"
  | "treppenhausreinigung";

type FaqItem = { q: string; a: string };

type PageConfig = {
  key: DuesseldorfCleaningPageKey;
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  eyebrow: string;
  h1: string;
  intro: string;
  summary: string;
  directQuestion?: string;
  directAnswer?: string;
  serviceType: string;
  cta: { href: string; label: string; service: string; intent: string };
  fitTitle: string;
  fitIntro: string;
  fit: string[];
  requiredDetails: string[];
  effortFactors: string[];
  process: string[];
  faqItems: FaqItem[];
  related: DuesseldorfCleaningPageKey[];
  about: string[];
  optional?: string[];
};

const requestHref = (service: string, intent: string, path: string) => {
  return buildLeadHref({
    path,
    service,
    city: "duesseldorf",
    intent,
    source: "service_page",
    ctaComponent: "duesseldorf_service_page",
    ctaPosition: "hero",
  });
};

const authority = searchAuthorityPages;

export const duesseldorfCleaningPages: Record<DuesseldorfCleaningPageKey, PageConfig> = {
  endreinigung: {
    key: "endreinigung", path: "/duesseldorf/endreinigung",
    title: "Endreinigung Düsseldorf vor der Wohnungsübergabe | FLOXANT",
    description: "Wohnung nach dem Auszug reinigen lassen: Böden, Bad, Küche und vereinbarte Oberflächen. FLOXANT übernimmt Ihre Endreinigung in Düsseldorf und Umgebung.",
    ogTitle: "Endreinigung in Düsseldorf mit FLOXANT", eyebrow: "Endreinigung Düsseldorf",
    h1: "Endreinigung in Düsseldorf, damit Sie den Auszug abschließen können.",
    intro: "Während Sie sich um Ihr neues Zuhause kümmern, reinigen wir Ihre bisherige Wohnung im vereinbarten Umfang. Böden, Bad, Küche und Oberflächen stimmen wir auf den Zustand und Ihren Übergabetermin ab.",
    summary: "Einmalige Reinigung der möglichst leergeräumten Wohnung nach Auszug oder vor Einzug. Fenster, Einbauten und Geräteinnenräume können Sie ergänzen.",
    serviceType: "Endreinigung und Wohnungsreinigung in Düsseldorf",
    cta: { href: requestHref("reinigung", "endreinigung-duesseldorf", "/duesseldorf/endreinigung"), label: "Endreinigungsangebot anfragen", service: "reinigung", intent: "endreinigung-duesseldorf" },
    fitTitle: "Eine saubere Wohnung für den nächsten Schritt", fitIntro: "Für Mieter, Eigentümer und Vermieter vor der Übergabe oder dem Einzug. Den gewünschten Reinigungsumfang halten wir vor dem Auftrag fest.",
    fit: ["Böden und erreichbare Oberflächen", "Bad und Sanitärbereiche", "Küche nach vereinbartem Umfang", "Türen, Schalter und zugängliche Einbauten"],
    optional: ["Fenster, Rahmen und Falze", "Schrank- und Geräteinnenräume, wenn leer und zugänglich", "Intensive Reinigung ausgewählter Rückstände", "Räumung verbliebener Gegenstände als gesonderter Auftrag"],
    requiredDetails: ["Wohnfläche und Räume", "Zustand sowie leer oder möbliert", "gewünschte Aufgaben", "Termin und Zugang"],
    effortFactors: ["Wohnfläche und Raumaufteilung", "Zustand von Küche, Bad und Böden", "Möblierung und Zugänglichkeit", "Fenster und zusätzliche Detailarbeiten", "Anfahrt und Termin"],
    process: ["Sie nennen kurz Wohnung, gewünschte Reinigung und Übergabetermin. Fotos sind freiwillig.", "Wir vereinbaren Umfang, Preis, Zugang und Termin.", "Wir reinigen die vereinbarten Bereiche und besprechen anschließend das Ergebnis."],
    faqItems: [
      {q:"Muss die Wohnung bereits leer sein?",a:"Eine leere Wohnung erleichtert die Reinigung von Böden und Einbauten. Wenn Möbel verbleiben, sagen Sie uns kurz welche; wir stimmen die zugänglichen Bereiche ab."},
      {q:"Sind Fenster und Backofen enthalten?",a:"Diese Aufgaben werden auf Wunsch ergänzt und im Angebot benannt. Eine kurze Angabe reicht für den Erstkontakt."},
      {q:"Was kostet die Endreinigung?",a:"Maßgeblich sind Fläche, Zustand, Küche und Bad, Zugänglichkeit sowie zusätzliche Aufgaben. Aus einer kurzen Beschreibung erstellen wir ein individuelles Angebot; Fotos können die Einschätzung erleichtern."},
      {q:"Garantiert die Reinigung eine Wohnungsabnahme?",a:"Wir übernehmen den vereinbarten Reinigungsumfang. Die Entscheidung über die Wohnungsabnahme liegt bei den Beteiligten; Schäden oder Abnutzung werden durch Reinigung nicht automatisch beseitigt."}
    ],
    related: ["reinigung", "grundreinigung", "fensterreinigung"], about: ["Endreinigung Düsseldorf", "Wohnungsreinigung", "Reinigung nach Auszug"],
  },
  hotelreinigung: {
    key: "hotelreinigung", path: "/duesseldorf/hotelreinigung",
    title: "Hotelreinigung Düsseldorf – gepflegte Objektflächen | FLOXANT",
    description: "Allgemeine Reinigung von Hotel- und Apartmentflächen in Düsseldorf. Böden, Oberflächen und Sanitärbereiche mit FLOXANT nach Aufgabenliste vereinbaren.",
    ogTitle: "Hotel- und Apartmentreinigung in Düsseldorf", eyebrow: "Hotelreinigung Düsseldorf",
    h1: "Reinigung von Hotelflächen in Düsseldorf, passend zu Ihrem Betrieb.",
    intro: "Wir übernehmen die allgemeine Reinigung vereinbarter Hotel- und Apartmentflächen. Böden, zugängliche Oberflächen und Sanitärbereiche erhalten eine abgestimmte Aufgabenliste, mit Zugang und Zeiten passend zu Ihrem Betrieb.",
    summary: "Allgemeine Reinigung von vereinbarten Räumen und Gemeinschaftsflächen. Ein vollständiger Housekeeping- oder Wäscheservice ist nicht Bestandteil dieses Angebots.",
    serviceType: "Hotelreinigung und Apartmentreinigung in Düsseldorf",
    cta: { href: requestHref("reinigung", "hotelreinigung-duesseldorf", "/duesseldorf/hotelreinigung"), label: "Hotelreinigung anfragen", service: "reinigung", intent: "hotelreinigung-duesseldorf" },
    fitTitle: "Gepflegte Räume und Gemeinschaftsflächen", fitIntro: "Für Hotels, Apartmentvermieter und Betreiber möblierter Unterkünfte, die die allgemeine Flächenreinigung abgeben möchten.",
    fit: ["Böden und zugängliche Oberflächen in Gästezimmern", "Bäder und vereinbarte Sanitärbereiche", "Küchenbereiche in Apartments nach Aufgabenliste", "Vereinbarte Flure und Gemeinschaftsflächen"],
    optional: ["Fenster und Rahmen nach separater Vereinbarung", "Intensive Reinigung ausgewählter Flächen", "Zusätzliche zugängliche Küchenbereiche nach Aufgabenliste"],
    requiredDetails: ["Anzahl und Größe der Zimmer oder Apartments", "Aufgabenliste und gewünschter Rhythmus", "Zeiten zwischen Abreise und Anreise", "Zugang und Kontaktperson"],
    effortFactors: ["Einheiten, Bäder und Küchenumfang", "Reinigungsrhythmus und Zustand", "Zusätzliche Fenster- oder Detailreinigung", "Entfernung zwischen Einheiten", "Zugang und vereinbartes Zeitfenster"],
    process: ["Sie nennen Einheiten, Aufgaben und Wechselzeiten.", "Wir stimmen Reinigung, Material, Zugang, Preis und Rückmeldung ab.", "Unser Team reinigt nach Aufgabenliste; offene Punkte gehen an Ihre Kontaktperson."],
    faqItems: [
      {q:"Übernimmt FLOXANT auch Apartmentreinigung?",a:"Ja. Wir stimmen die Reinigung von Wohnbereich, Bad und gegebenenfalls Küche auf Ihr Apartment und den Gästewechsel ab."},
      {q:"Gehören Wäsche und Verbrauchsmaterial dazu?",a:"Dieses Angebot betrifft die allgemeine Reinigung. Wäscheversorgung, Bettenservice, Inventarservice und Nachfüllen von Gästeartikeln sind nicht enthalten."},
      {q:"Wie werden kurzfristige Änderungen besprochen?",a:"Eine benannte Kontaktperson meldet geänderte Abreisezeiten oder zusätzliche Einheiten. Termin und Umfang werden gemeinsam abgestimmt."},
      {q:"Wie entsteht ein Angebot?",a:"Hilfreich sind Einheitenzahl, Größe, Bäder, Küchen, Aufgaben und Wechselrhythmus. Daraus ermitteln wir den Reinigungsaufwand und besprechen die benötigten Zeitfenster."}
    ],
    related: ["unterhaltsreinigung", "fensterreinigung", "grundreinigung"], about: ["Hotelreinigung Düsseldorf", "Apartmentreinigung", "Housekeeping"],
  },
  reinigung: {
    key: "reinigung",
    path: "/duesseldorf/reinigung",
    title: "Reinigung Düsseldorf für Wohnung & Büro | FLOXANT",
    description: "FLOXANT reinigt Wohnungen, Büros, Praxen und Fenster in Düsseldorf und 75 km Umgebung. Umfang persönlich abstimmen und Reinigungsangebot anfragen.",
    ogTitle: authority["/duesseldorf/reinigung"].ogTitle,
    eyebrow: authority["/duesseldorf/reinigung"].shortTitle,
    h1: "Reinigung in Düsseldorf, die Ihnen Arbeit abnimmt.",
    intro:
      "Ob Wohnung, Büro oder Fenster: Wir kümmern uns um die vereinbarte Reinigung. Sie gewinnen Zeit für Ihren Alltag und wissen vorher, welche Arbeiten wir übernehmen. Beschreiben Sie kurz Ihr Anliegen – wir erstellen ein persönliches Angebot.",
    summary:
      "Einmalig gründlich reinigen oder regelmäßig für gepflegte Räume sorgen: Wählen Sie die Reinigung, die zu Ihrem Zuhause oder Betrieb passt.",
    directQuestion: "Was kostet ein Reinigungsdienst in Düsseldorf?",
    directAnswer:
      "Die Kosten eines Reinigungsdienstes in Düsseldorf hängen von Fläche, Reinigungsart, Zustand, Raumzahl, Sanitär- und Küchenbereichen, einmaligem oder regelmäßigem Turnus, Reinigungszeit, Zugang und Zusatzleistungen ab. Deshalb ist eine kurze Objektbeschreibung aussagekräftiger als ein pauschaler Stundenpreis. Senden Sie Räume, Fläche, Zustand, gewünschte Leistung, Turnus, Fotos und Wunschtermin; FLOXANT prüft den benötigten Umfang.",
    serviceType: "Reinigungsservice in Düsseldorf",
    cta: {
      href: requestHref("reinigung", "reinigung-duesseldorf", "/duesseldorf/reinigung"),
      label: "Reinigungsangebot anfragen",
      service: "reinigung",
      intent: "reinigung-duesseldorf",
    },
    fitTitle: "Die passende Reinigungsart finden",
    fitIntro:
      "Ein Büro braucht einen anderen Ablauf als eine Baustelle oder große Glasflächen. Die einzelnen Seiten erklären den jeweiligen Umfang.",
    fit: [
      "Einmalige Reinigung für Wohnung oder Objekt",
      "Regelmäßige Reinigung für Büro, Praxis oder Gewerbe",
      "Intensive Reinigung bei stärkeren Rückständen",
      "Fenster-, Glas- oder Bauendreinigung mit eigener Zugangsplanung",
    ],
    requiredDetails: ["Objektart und Fläche", "gewünschte Leistung", "Zustand und Termin", "Turnus bei regelmäßiger Reinigung"],
    effortFactors: ["Fläche und Raumaufteilung", "Nutzung und Verschmutzung", "Zugang und Zeitfenster", "gewünschter Leistungsumfang"],
    process: [
  "Sie beschreiben kurz Ihre Räume und den gewünschten Termin. Fotos sind freiwillig.",
  "Wir stimmen Aufgaben, Preis, Zugang und Reinigungszeit mit Ihnen ab.",
  "Unser Team übernimmt die vereinbarte Reinigung. Anschließend besprechen wir das Ergebnis."
],
    faqItems: [
      {
        q: "Welche Reinigung passt zu meinem Objekt?",
        a: "Büro, Praxis, Gewerbefläche, Fenster, Grundreinigung, Unterhaltsreinigung und Baureinigung haben eigene Seiten. Dort sehen Sie, welche Angaben für die jeweilige Leistung wichtig sind.",
      },
      {
        q: "Kann ich auch eine einmalige Reinigung anfragen?",
        a: "Ja. Nennen Sie Objektart, Fläche, aktuellen Zustand, gewünschtes Ergebnis und Termin. Danach lässt sich klären, welcher Leistungsumfang sinnvoll ist.",
      },
      {
        q: "Sind Fotos für die Anfrage nötig?",
        a: "Nein. Fotos sind freiwillig, können bei starken Verschmutzungen, schwer erreichbaren Fenstern oder Rückständen nach Bauarbeiten aber Rückfragen reduzieren.",
      },
      {
        q: "Ist meine Anfrage schon eine feste Buchung?",
        a: "Nein. Wir prüfen zunächst Leistung, Umfang, Zugang und Termin. Erst danach stimmen wir die nächsten Schritte mit Ihnen ab.",
      },
    ],
    related: ["bueroreinigung", "praxisreinigung", "fensterreinigung", "gewerbereinigung", "grundreinigung", "endreinigung", "unterhaltsreinigung", "hotelreinigung", "baureinigung", "treppenhausreinigung"],
    about: ["Reinigung Düsseldorf", "Reinigungsservice Düsseldorf", "Reinigungsarten Düsseldorf"],
  },
  bueroreinigung: {
    key: "bueroreinigung",
    path: "/duesseldorf/bueroreinigung",
    title: "Büroreinigung Düsseldorf – passend zum Büroalltag | FLOXANT",
    description: "Gepflegte Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche. FLOXANT stimmt Reinigungsumfang, Rhythmus und Zeiten mit Ihrem Büro ab.",
    ogTitle: authority["/duesseldorf/bueroreinigung"].ogTitle,
    eyebrow: authority["/duesseldorf/bueroreinigung"].shortTitle,
    h1: "Büroreinigung in Düsseldorf, passend zu Ihrem Arbeitsalltag.",
    intro:
      "Wir reinigen Ihre Büroräume, damit sich Ihr Team auf die Arbeit konzentrieren kann. Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche erhalten einen abgestimmten Reinigungsplan – mit Zeiten, die zu Ihrem Betrieb passen.",
    summary:
      "Regelmäßige Reinigung für Arbeitsplätze und Gemeinschaftsbereiche. Fenster, intensive Bodenreinigung oder selten genutzte Nebenräume lassen sich separat einplanen.",
    directQuestion: "Was kostet eine Büroreinigung in Düsseldorf?",
    directAnswer:
      "Die Kosten einer Büroreinigung in Düsseldorf hängen vor allem von Fläche, Raumaufteilung, Nutzung, Sanitär- und Küchenbereichen, gewünschtem Turnus sowie Reinigungszeiten und Zugang ab. Ein Büro mit täglichem Publikumsverkehr benötigt einen anderen Leistungsplan als eine kleine, selten genutzte Einheit. Senden Sie Raumliste, Fläche, Wunschrhythmus und mögliche Zeitfenster; FLOXANT prüft die Angaben und klärt den passenden Umfang persönlich.",
    serviceType: "Büroreinigung in Düsseldorf",
    cta: {
      href: requestHref("bueroreinigung", "bueroreinigung-duesseldorf", "/duesseldorf/bueroreinigung"),
      label: "Büroreinigung anfragen",
      service: "bueroreinigung",
      intent: "bueroreinigung-duesseldorf",
    },
    fitTitle: "Büroreinigung für planbare Arbeitsabläufe",
    fitIntro: "Geeignet für Unternehmen, Kanzleien und Büroeinheiten, die feste Bereiche und verlässliche Zeitfenster abstimmen möchten.",
    fit: ["Arbeitsplätze und Besprechungsräume", "Empfang und Gemeinschaftsflächen", "Büroküche und Sanitärbereiche", "Regelmäßiger Turnus außerhalb der Kernzeiten"],
    requiredDetails: ["Bürofläche und Raumliste", "Anzahl der Arbeitsplätze", "gewünschter Turnus", "mögliche Reinigungszeiten", "Zugang oder Schlüsselregelung", "besondere Boden- oder Oberflächen"],
    effortFactors: ["Belegung und Raumaufteilung", "Küche und Sanitärumfang", "Reinigungshäufigkeit", "Randzeiten und Zugang", "Bodenbeläge und Zusatzbereiche"],
    process: ["Räume und gewünschten Turnus nennen.", "Reinigungszeiten und Zugang abstimmen.", "Leistungsumfang vor dem Start gemeinsam festhalten."],
    faqItems: [
      { q: "Was kostet eine Büroreinigung in Düsseldorf?", a: "Der Preis richtet sich nach Fläche, Raumaufteilung, Nutzung, Sanitär- und Küchenbereichen, Turnus, Reinigungszeiten und Zugang. Mit einer Raumliste und den gewünschten Zeitfenstern kann FLOXANT den Umfang gezielt prüfen." },
      { q: "Welche Bereiche gehören zur Büroreinigung?", a: "Typisch sind Arbeitsplätze, Besprechungsräume, Empfang, Laufwege, Küche und Sanitärbereiche. Der genaue Umfang wird für Ihr Büro festgelegt." },
      { q: "Ist Büroreinigung auch am frühen Morgen oder Abend möglich?", a: "Nennen Sie Ihre möglichen Zeitfenster. Wir prüfen, welcher Ablauf mit Zugang, Gebäudenutzung und verfügbarem Team vereinbar ist." },
      { q: "Wie oft sollte ein Büro gereinigt werden?", a: "Das hängt von Belegung, Publikumsverkehr, Küche, Sanitärbereichen und gewünschtem Standard ab. Aus diesen Angaben ergibt sich ein passender Turnus." },
      { q: "Was sollte in einer Raumliste stehen?", a: "Hilfreich sind Raumart, ungefähre Größe, Nutzung und gewünschte Aufgaben. Bereiche mit abweichendem Turnus können separat markiert werden." },
    ],
    related: ["unterhaltsreinigung", "fensterreinigung", "grundreinigung"],
    about: ["Büroreinigung Düsseldorf", "regelmäßige Büroreinigung", "Reinigung von Arbeitsplätzen"],
  },
  praxisreinigung: {
    key: "praxisreinigung",
    path: "/duesseldorf/praxisreinigung",
    title: "Praxisreinigung Düsseldorf – nach Ihrem Ablauf | FLOXANT",
    description: "FLOXANT reinigt Empfang, Warte-, Behandlungs- und Nebenräume nach vereinbartem Umfang. Turnus, Zeitfenster und Ihre Praxisvorgaben persönlich abstimmen.",
    ogTitle: authority["/duesseldorf/praxisreinigung"].ogTitle,
    eyebrow: authority["/duesseldorf/praxisreinigung"].shortTitle,
    h1: "Praxisreinigung in Düsseldorf mit klaren Abläufen.",
    intro:
      "Wir übernehmen die Reinigung Ihrer Praxisräume und stimmen die Aufgaben auf Ihren Tagesablauf ab. Empfang, Wartebereich, Behandlungs- und Nebenräume werden nach Raumliste und Ihren vereinbarten Vorgaben gereinigt.",
    summary:
      "Feste Aufgaben, abgestimmte Reinigungszeiten und eine klare Kontaktperson erleichtern die Zusammenarbeit. Besondere Anforderungen werden vor Beginn gemeinsam besprochen.",
    directQuestion: "Was wird bei einer Praxisreinigung gereinigt?",
    directAnswer:
      "Eine Praxisreinigung in Düsseldorf kann Empfang, Wartezimmer, Behandlungs- und Funktionsräume, Sanitär- und Personalbereiche sowie vereinbarte Kontaktflächen umfassen. Welche Aufgaben tatsächlich dazugehören, richtet sich nach Raumliste, Praxisart, internen Vorgaben und den verfügbaren Zeitfenstern. Medizinische Spezialaufgaben und besondere Abfälle sind nicht automatisch enthalten. Senden Sie Räume, Fläche, Turnus, sensible Bereiche und Zugangsregelung für eine konkrete Prüfung.",
    serviceType: "Praxisreinigung in Düsseldorf",
    cta: {
      href: requestHref("praxisreinigung", "praxisreinigung-duesseldorf", "/duesseldorf/praxisreinigung"),
      label: "Praxisreinigung anfragen",
      service: "praxisreinigung",
      intent: "praxisreinigung-duesseldorf",
    },
    fitTitle: "Praxisbereiche nachvollziehbar trennen",
    fitIntro: "Geeignet für Arzt-, Therapie- und andere Praxisräume mit festem Tagesablauf und dokumentierten eigenen Anforderungen.",
    fit: ["Empfang und Wartebereich", "Behandlungs- und Funktionsräume nach Vorgabe", "Sanitär- und Personalräume", "Reinigung außerhalb der Sprechzeiten"],
    requiredDetails: ["Praxisart und Raumliste", "Öffnungs- und Reinigungszeiten", "interne Reinigungs- oder Hygienevorgaben", "sensible oder ausgeschlossene Bereiche", "Zugang und Ansprechpartner", "gewünschter Turnus"],
    effortFactors: ["Anzahl und Art der Räume", "praxisinterne Vorgaben", "Turnus und Zeitfenster", "sensible Oberflächen", "Zugang außerhalb der Öffnungszeiten"],
    process: ["Räume und eigene Vorgaben beschreiben.", "Sensible Bereiche und Ausschlüsse klären.", "Turnus, Zeitfenster und Ansprechpartner festlegen."],
    faqItems: [
      { q: "Welche Praxisräume können eingeplant werden?", a: "Empfang, Wartezimmer, Behandlungsräume, Personalräume und Sanitärbereiche können getrennt beschrieben werden. Der konkrete Umfang richtet sich nach Ihren Vorgaben." },
      { q: "Werden meine internen Hygienevorgaben berücksichtigt?", a: "Ja, sofern Sie die relevanten Vorgaben bereitstellen und die Aufgaben fachlich sowie organisatorisch umsetzbar sind. Ungeklärte Anforderungen werden vorab besprochen." },
      { q: "Kann die Reinigung nach den Sprechzeiten stattfinden?", a: "Nennen Sie mögliche Zeitfenster und die Zugangsregelung. Wir prüfen einen Ablauf, der den Praxisbetrieb möglichst wenig beeinträchtigt." },
      { q: "Ist die Entsorgung medizinischer Abfälle enthalten?", a: "Nein, nicht automatisch. Besondere Abfälle und medizinische Spezialaufgaben müssen ausdrücklich benannt und separat auf ihre Umsetzbarkeit geprüft werden." },
    ],
    related: ["unterhaltsreinigung", "fensterreinigung", "grundreinigung"],
    about: ["Praxisreinigung Düsseldorf", "Reinigung von Praxisräumen", "Praxisreinigung außerhalb der Sprechzeiten"],
  },
  fensterreinigung: {
    key: "fensterreinigung",
    path: "/duesseldorf/fensterreinigung",
    title: "Fensterreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
    description: "Fenster und Glasflächen in Wohnung, Büro oder Laden reinigen lassen. Innen- und Außenseiten, Rahmen und Falze nach Wunsch vereinbaren.",
    ogTitle: authority["/duesseldorf/fensterreinigung"].ogTitle,
    eyebrow: authority["/duesseldorf/fensterreinigung"].shortTitle,
    h1: "Fensterreinigung in Düsseldorf für einen klaren Ausblick.",
    intro:
      "Wir reinigen Fenster und Glasflächen in Ihrer Wohnung, im Büro oder in der Ladenfläche. Innen- und Außenseiten sowie Rahmen und Falze stimmen wir vorab ab, damit Sie genau die Reinigung erhalten, die Sie brauchen.",
    summary:
      "Glasflächen reinigen wir im vereinbarten Umfang. Rahmen, Falze und Fensterbänke können hinzukommen; bei höher gelegenen Fenstern klären wir die sichere Erreichbarkeit.",
    serviceType: "Fenster- und Glasreinigung in Düsseldorf",
    cta: {
      href: requestHref("fensterreinigung", "fensterreinigung-duesseldorf", "/duesseldorf/fensterreinigung"),
      label: "Fensterreinigung anfragen",
      service: "fensterreinigung",
      intent: "fensterreinigung-duesseldorf",
    },
    fitTitle: "Glasflächen und Zugang zuerst klären",
    fitIntro: "Geeignet für normale Fenster, Schaufenster und größere Glasflächen, wenn Umfang und Erreichbarkeit vorab beschrieben werden können.",
    fit: ["Fenster innen und außen", "Rahmen und Falze nach Vereinbarung", "Schaufenster und Glastrennwände", "Einmalige oder regelmäßige Glasreinigung"],
    requiredDetails: ["Fensterzahl oder ungefähre Glasfläche", "Innen-, Außen- oder beidseitige Reinigung", "Rahmen und Falze gewünscht", "Etage und Erreichbarkeit", "Besonderheiten wie Sprossen oder Folien", "Termin oder gewünschter Turnus"],
    effortFactors: ["Glasfläche und Teilung", "Höhe und sichere Erreichbarkeit", "Rahmen- und Falzreinigung", "hartnäckige Rückstände", "Möbel oder Hindernisse vor den Fenstern"],
    process: ["Glasmenge und gewünschte Seiten angeben.", "Höhe, Zugang und Besonderheiten beschreiben.", "Termin unter Berücksichtigung von Aufwand und Wetter abstimmen."],
    faqItems: [
      { q: "Werden Fenster innen und außen gereinigt?", a: "Beides ist möglich. Geben Sie an, welche Seiten und ob Rahmen oder Falze zum gewünschten Umfang gehören sollen." },
      { q: "Wie beschreibe ich große Glasflächen?", a: "Nennen Sie ungefähr Breite und Höhe oder senden Sie freiwillig Fotos. Bei vielen ähnlichen Fenstern reicht oft zusätzlich die Stückzahl." },
      { q: "Können schwer erreichbare Fenster gereinigt werden?", a: "Die Erreichbarkeit muss vorab geprüft werden. Etage, Öffnungsart, Zugang und mögliche Hindernisse entscheiden über den geeigneten Ablauf." },
      { q: "Kann schlechtes Wetter den Termin verändern?", a: "Bei Außenflächen können Wind, Starkregen oder andere Sicherheitsrisiken eine Verschiebung nötig machen. Das wird im Einzelfall abgestimmt." },
    ],
    related: ["bueroreinigung", "gewerbereinigung", "grundreinigung"],
    about: ["Fensterreinigung Düsseldorf", "Glasreinigung Düsseldorf", "Schaufensterreinigung Düsseldorf"],
  },
  gewerbereinigung: {
    key: "gewerbereinigung",
    path: "/duesseldorf/gewerbereinigung",
    title: "Gewerbereinigung Düsseldorf für Ihren Betrieb | FLOXANT",
    description: "Reinigung für Ladenflächen, Studios und gewerbliche Räume in Düsseldorf. Aufgaben und Zeiten auf Nutzung, Kundenverkehr und Bodenbeläge abstimmen.",
    ogTitle: authority["/duesseldorf/gewerbereinigung"].ogTitle,
    eyebrow: authority["/duesseldorf/gewerbereinigung"].shortTitle,
    h1: "Gewerbereinigung in Düsseldorf, passend zu Ihrem Betrieb.",
    intro:
      "Gepflegte Räume gehören zum ersten Eindruck Ihres Betriebs. Wir reinigen Ihre vereinbarten Gewerbeflächen und stimmen Aufgaben, Turnus und Zugang auf Öffnungszeiten und Nutzung ab.",
    summary:
      "Gewerbereinigung beginnt mit Objektart, Nutzungszeiten und einer klaren Flächenliste. Maschinen, Produktionsbereiche oder besondere Stoffe gehören nur dann zum Umfang, wenn sie ausdrücklich geprüft wurden.",
    serviceType: "Gewerbereinigung in Düsseldorf",
    cta: {
      href: requestHref("gewerbereinigung", "gewerbereinigung-duesseldorf", "/duesseldorf/gewerbereinigung"),
      label: "Gewerbereinigung anfragen",
      service: "gewerbereinigung",
      intent: "gewerbereinigung-duesseldorf",
    },
    fitTitle: "Reinigung passend zur gewerblichen Nutzung",
    fitIntro: "Geeignet für Gewerbeflächen mit Kundenverkehr, unterschiedlichen Bodenarten oder Bereichen, die einen eigenen Turnus benötigen.",
    fit: ["Läden und Verkaufsflächen", "Studios und Ausstellungsräume", "Empfang, Personal- und Sanitärbereiche", "Gemischt genutzte Objektflächen"],
    requiredDetails: ["Art und Nutzung des Gewerbes", "Flächen und Raumaufteilung", "Öffnungs- und Reinigungszeiten", "Publikumsverkehr und sensible Bereiche", "Bodenarten oder besondere Oberflächen", "Turnus und Zugang"],
    effortFactors: ["Nutzungsart und Kundenfrequenz", "Flächengröße und Möblierung", "Boden- und Oberflächenmix", "Zeitfenster außerhalb des Betriebs", "klar abgegrenzte Sonderbereiche"],
    process: ["Nutzung und zu reinigende Bereiche abgrenzen.", "Turnus, Betriebszeiten und Zugang klären.", "Leistungsumfang passend zum Objekt festlegen."],
    faqItems: [
      { q: "Für welche Gewerbeflächen kann ich anfragen?", a: "Zum Beispiel für Läden, Studios, Ausstellungen, Empfangsbereiche oder gemischt genutzte Objekte. Die Nutzung und alle gewünschten Bereiche sollten genannt werden." },
      { q: "Was ist der Unterschied zur Büroreinigung?", a: "Büroreinigung konzentriert sich auf typische Arbeits- und Besprechungsräume. Gewerbereinigung berücksichtigt stärker Kundenverkehr, Verkaufsflächen und gemischte Nutzungen." },
      { q: "Sind Maschinen oder Produktionsflächen enthalten?", a: "Nicht automatisch. Maschinen, technische Anlagen, besondere Stoffe oder produktionsnahe Aufgaben müssen getrennt beschrieben und auf Machbarkeit geprüft werden." },
      { q: "Kann die Reinigung außerhalb der Öffnungszeiten erfolgen?", a: "Nennen Sie mögliche Zeiten sowie Zugang und Alarmregelung. Danach prüfen wir, welcher Ablauf zum Objekt passt." },
    ],
    related: ["bueroreinigung", "unterhaltsreinigung", "fensterreinigung"],
    about: ["Gewerbereinigung Düsseldorf", "Reinigung von Gewerbeflächen", "Ladenreinigung Düsseldorf"],
  },
  grundreinigung: {
    key: "grundreinigung",
    path: "/duesseldorf/grundreinigung",
    title: "Grundreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
    description: "Intensive Reinigung für Wohnung, Haus und Gewerberäume in Düsseldorf. Böden, Küche, Bad und schwer erreichbare Bereiche gezielt einplanen.",
    ogTitle: "Grundreinigung Düsseldorf für stark beanspruchte Flächen",
    eyebrow: "Grundreinigung Düsseldorf",
    h1: "Grundreinigung in Düsseldorf, wenn es gründlicher sein soll.",
    intro:
      "Wenn die übliche Reinigung nicht mehr ausreicht, kümmern wir uns gezielt um stärkere Verschmutzungen und vernachlässigte Bereiche. Gemeinsam legen wir fest, welche Böden, Oberflächen, Küchen- oder Sanitärbereiche gründlich gereinigt werden sollen.",
    summary:
      "Eine einmalige intensive Reinigung für ausgewählte Bereiche, etwa vor Einzug, nach längerer Nutzung oder ergänzend zur regelmäßigen Pflege.",
    directQuestion: "Was beeinflusst den Preis einer Grundreinigung in Düsseldorf?",
    directAnswer:
      "Der Preis einer Grundreinigung in Düsseldorf wird durch Fläche, Anzahl und Nutzung der Räume, Boden- und Oberflächenarten, Verschmutzungsgrad, Möblierung, Zugänglichkeit und gewünschten Zielzustand beeinflusst. Bei Wohnung oder Haus zählen außerdem intensive Bereiche wie Küche und Sanitär. Fotos helfen bei der ersten Einordnung, ersetzen aber nicht immer eine Prüfung vor Ort. Senden Sie Fläche, Räume, Materialhinweise, Zustand und Wunschtermin für eine konkrete Anfrage.",
    serviceType: "Grundreinigung in Düsseldorf",
    cta: {
      href: requestHref("grundreinigung", "grundreinigung-duesseldorf", "/duesseldorf/grundreinigung"),
      label: "Grundreinigung anfragen",
      service: "reinigung",
      intent: "grundreinigung-duesseldorf",
    },
    fitTitle: "Intensive Reinigung für einen klaren Neustart",
    fitIntro: "Geeignet bei länger aufgebauten Rückständen, vor einer neuen Nutzung oder wenn einzelne Oberflächen intensiver bearbeitet werden sollen.",
    fit: ["Stark beanspruchte Böden und Oberflächen", "Leere oder möblierte Räume vor neuer Nutzung", "Küche, Sanitär oder andere Intensivbereiche", "Einmaliger Umfang statt laufendem Turnus"],
    requiredDetails: ["Fläche und betroffene Räume", "Boden- und Oberflächenarten", "Art und Stärke der Rückstände", "möbliert oder leer", "gewünschter Zielzustand", "Termin und Zugang"],
    effortFactors: ["Material und Empfindlichkeit", "Verschmutzungsgrad", "Möblierung und freie Arbeitsfläche", "Anzahl intensiver Einzelbereiche", "notwendige Einwirk- und Trocknungszeiten"],
    process: ["Betroffene Flächen und Rückstände beschreiben.", "Materialien und gewünschten Zielzustand prüfen.", "Intensivumfang und Termin eindeutig abgrenzen."],
    faqItems: [
      { q: "Was beeinflusst den Preis einer Grundreinigung in Düsseldorf?", a: "Entscheidend sind Fläche, Räume, Materialien, Verschmutzungsgrad, Möblierung, Zugänglichkeit, intensive Einzelbereiche und der gewünschte Zielzustand. Fotos und eine kurze Beschreibung helfen bei der ersten Prüfung." },
      { q: "Wann ist eine Grundreinigung sinnvoll?", a: "Wenn haftende oder länger aufgebaute Rückstände mit einer normalen laufenden Reinigung nicht ausreichend entfernt werden können." },
      { q: "Müssen die Räume leer sein?", a: "Nicht immer. Eine freie Fläche erleichtert die Arbeit jedoch. Beschreiben Sie vorhandene Möbel, Einbauten und welche Bereiche zugänglich sind." },
      { q: "Sind alle Flecken vollständig entfernbar?", a: "Das lässt sich ohne Prüfung von Material und Rückstand nicht zusagen. Wir klären vorab den realistischen Zielzustand und mögliche Grenzen." },
      { q: "Ist Grundreinigung dasselbe wie Unterhaltsreinigung?", a: "Nein. Grundreinigung ist ein intensiver, meist einmaliger Umfang. Unterhaltsreinigung hält vereinbarte Bereiche in einem regelmäßigen Turnus sauber." },
    ],
    related: ["reinigung", "unterhaltsreinigung", "baureinigung"],
    about: ["Grundreinigung Düsseldorf", "Intensivreinigung Düsseldorf", "einmalige Grundreinigung"],
  },
  unterhaltsreinigung: {
    key: "unterhaltsreinigung",
    path: "/duesseldorf/unterhaltsreinigung",
    title: "Unterhaltsreinigung Düsseldorf – regelmäßig gepflegt | FLOXANT",
    description: "Regelmäßige Reinigung von Büros, Gewerbe- und Gemeinschaftsflächen. Aufgaben, Turnus und Reinigungszeiten mit FLOXANT passend zum Objekt vereinbaren.",
    ogTitle: "Unterhaltsreinigung Düsseldorf mit klarem Turnus",
    eyebrow: "Unterhaltsreinigung Düsseldorf",
    h1: "Unterhaltsreinigung in Düsseldorf für dauerhaft gepflegte Räume.",
    intro:
      "Wir übernehmen wiederkehrende Reinigungsaufgaben, damit Ihre Räume im Alltag gepflegt bleiben. Böden, Oberflächen, Küchen und Sanitärbereiche bekommen den Rhythmus, den ihre Nutzung erfordert.",
    summary:
      "Ein abgestimmter Plan hält fest, was bei jedem Termin und was in größeren Abständen erledigt wird. So bleibt der Leistungsumfang verständlich.",
    serviceType: "Unterhaltsreinigung in Düsseldorf",
    cta: {
      href: requestHref("unterhaltsreinigung", "unterhaltsreinigung-duesseldorf", "/duesseldorf/unterhaltsreinigung"),
      label: "Unterhaltsreinigung anfragen",
      service: "unterhaltsreinigung",
      intent: "unterhaltsreinigung-duesseldorf",
    },
    fitTitle: "Wiederkehrende Aufgaben eindeutig festlegen",
    fitIntro: "Geeignet für regelmäßig genutzte Büro-, Praxis- und Gewerbeflächen, deren Aufgaben in unterschiedlichen Abständen anfallen.",
    fit: ["Feste Aufgaben pro Raum", "Täglicher, wöchentlicher oder individueller Turnus", "Zeitfenster passend zur Nutzung", "Zusatzaufgaben nach vereinbarter Häufigkeit"],
    requiredDetails: ["Objektart und Flächengröße", "Raum- und Aufgabenliste", "gewünschte Häufigkeit je Bereich", "Reinigungszeitfenster", "Zugangs- und Schlüsselregelung", "Ansprechpartner für Änderungen"],
    effortFactors: ["Häufigkeit je Aufgabe", "Nutzung und Personenaufkommen", "Sanitär- und Küchenbereiche", "Laufwege und Bodenarten", "Zugang an Arbeits- oder Ruhetagen"],
    process: ["Räume und Aufgaben nach Häufigkeit ordnen.", "Zeitfenster, Zugang und Ansprechpartner abstimmen.", "Turnus starten und Änderungen nachvollziehbar festhalten."],
    faqItems: [
      { q: "Was gehört zur Unterhaltsreinigung?", a: "Nur die vereinbarten wiederkehrenden Aufgaben. Dazu können Böden, Oberflächen, Sanitär-, Küchen- oder Gemeinschaftsbereiche gehören." },
      { q: "Kann jeder Raum einen anderen Turnus haben?", a: "Ja. Häufig genutzte Bereiche können öfter eingeplant werden als Nebenräume. Eine Raum- und Aufgabenliste macht diese Unterschiede sichtbar." },
      { q: "Wie werden Änderungen am Umfang abgestimmt?", a: "Ein fester Ansprechpartner erleichtert Anpassungen. Neue Aufgaben oder andere Häufigkeiten sollten vor der Umsetzung klar festgehalten werden." },
      { q: "Sind Fenster automatisch enthalten?", a: "Nein. Fenster- und Glasreinigung wird als eigener Umfang mit Glasmenge, Seiten, Rahmen und Erreichbarkeit geplant." },
    ],
    related: ["bueroreinigung", "praxisreinigung", "gewerbereinigung"],
    about: ["Unterhaltsreinigung Düsseldorf", "regelmäßige Reinigung Düsseldorf", "Reinigungsplan Düsseldorf"],
  },
  baureinigung: {
    key: "baureinigung",
    path: "/duesseldorf/baureinigung",
    title: "Baureinigung Düsseldorf nach Umbau & Renovierung | FLOXANT",
    description: "Baustaub und vereinbarte Rückstände nach Renovierung entfernen lassen. FLOXANT stimmt Flächen, Materialien und Zeitpunkt der Reinigung mit Ihnen ab.",
    ogTitle: "Baureinigung Düsseldorf vor Abnahme und Übergabe",
    eyebrow: "Baureinigung Düsseldorf",
    h1: "Baureinigung in Düsseldorf für den nächsten Schritt nach dem Umbau.",
    intro:
      "Nach Umbau oder Renovierung übernehmen wir die vereinbarte Reinigung, damit Ihre Räume wieder genutzt werden können. Wir berücksichtigen den Stand der Arbeiten, Staub, Rückstände und empfindliche Oberflächen.",
    summary:
      "Für Baureinigung zählen Bauphase, Fläche, abgeschlossene Gewerke, vorhandene Rückstände und Übergabetermin. Gefährliche Stoffe oder nicht klar zuordenbare Abfälle gehören nicht automatisch zum Umfang.",
    serviceType: "Bau- und Bauendreinigung in Düsseldorf",
    cta: {
      href: "/duesseldorf/buchen?service=bauendreinigung&intent=bauendreinigung-duesseldorf&source=website",
      label: "Bauendreinigung anfragen",
      service: "bauendreinigung",
      intent: "bauendreinigung-duesseldorf",
    },
    fitTitle: "Reinigung passend zum Stand der Arbeiten",
    fitIntro: "Geeignet nach Renovierung, Ausbau oder Neubau, wenn Flächen vor dem nächsten Gewerk oder vor der Übergabe gereinigt werden sollen.",
    fit: ["Bauzwischenreinigung zwischen Gewerken", "Bauendreinigung vor Abnahme", "Entfernung von Staub, Folien und leichten Bauresten", "Übergabefähige Reinigung nach vereinbartem Umfang"],
    requiredDetails: ["Bauphase und Projektart", "Fläche und Anzahl der Ebenen", "abgeschlossene und laufende Gewerke", "Art der Rückstände", "empfindliche neue Oberflächen", "Zugang, Strom, Wasser und Übergabetermin"],
    effortFactors: ["Projektstand und Restarbeiten", "Baustaub und Rückstandsarten", "Schutzfolien oder Klebereste", "Fläche und Ebenen", "enger Übergabe- oder Abnahmetermin"],
    process: ["Bauphase, Fläche und Gewerke beschreiben.", "Rückstände, Oberflächen und Ausschlüsse prüfen.", "Umfang auf Zwischenreinigung oder Übergabe abstimmen."],
    faqItems: [
      { q: "Was ist der Unterschied zwischen Bauzwischen- und Bauendreinigung?", a: "Die Zwischenreinigung schafft Ordnung für weitere Arbeiten. Die Bauendreinigung wird nach weitgehend abgeschlossenen Gewerken für Abnahme oder Nutzung geplant." },
      { q: "Werden Klebereste und Schutzfolien entfernt?", a: "Solche Aufgaben müssen ausdrücklich benannt werden. Material, Menge und Haftung entscheiden, ob und wie sie bearbeitet werden können." },
      { q: "Kann gereinigt werden, während andere Gewerke arbeiten?", a: "Das ist nur sinnvoll, wenn Bereiche, Zeitfenster und Verantwortlichkeiten klar getrennt sind. Laufende Staubarbeiten können das Ergebnis beeinträchtigen." },
      { q: "Sind Bauschutt oder gefährliche Stoffe enthalten?", a: "Nein, nicht automatisch. Bauschutt, Gefahrstoffe und besondere Entsorgung müssen separat benannt und fachlich geprüft werden." },
    ],
    related: ["grundreinigung", "fensterreinigung", "gewerbereinigung"],
    about: ["Baureinigung Düsseldorf", "Bauendreinigung Düsseldorf", "Bauzwischenreinigung Düsseldorf"],
  },
  treppenhausreinigung: {
    key: "treppenhausreinigung",
    path: "/duesseldorf/treppenhausreinigung",
    title: "Treppenhausreinigung Düsseldorf für Ihr Objekt | FLOXANT",
    description: "Eingang, Treppen, Podeste und Geländer regelmäßig reinigen lassen. FLOXANT vereinbart Bereiche und Turnus mit Eigentümern und Hausverwaltungen.",
    ogTitle: "Treppenhausreinigung Düsseldorf klar abstimmen",
    eyebrow: "Treppenhausreinigung Düsseldorf",
    h1: "Treppenhausreinigung in Düsseldorf für einen gepflegten Eingang.",
    intro:
      "Wir reinigen Eingänge, Treppen, Podeste und vereinbarte Gemeinschaftsflächen. Ein fester Aufgabenplan sorgt dafür, dass Eigentümer, Verwaltung und Bewohner wissen, welche Bereiche gepflegt werden.",
    summary:
      "Für eine erste Einschätzung helfen Anzahl der Etagen und Eingänge, gewünschte Bereiche, Turnus, Zugangsregelung und ein fester Ansprechpartner.",
    serviceType: "Treppenhausreinigung in Düsseldorf",
    cta: {
      href: requestHref("treppenhausreinigung", "treppenhausreinigung-duesseldorf", "/duesseldorf/treppenhausreinigung"),
      label: "Treppenhausreinigung anfragen",
      service: "treppenhausreinigung",
      intent: "treppenhausreinigung-duesseldorf",
    },
    fitTitle: "Für gemeinsam genutzte Bereiche mit festem Plan",
    fitIntro:
      "Geeignet für Hausverwaltungen, Eigentümergemeinschaften und Vermieter, die wiederkehrende Aufgaben nachvollziehbar festlegen möchten.",
    fit: [
      "Eingänge, Treppen und Podeste",
      "Geländer und Aufzug nach Vereinbarung",
      "Ausgewählte Gemeinschaftsflächen",
      "Fester oder individuell abgestimmter Turnus",
    ],
    requiredDetails: [
      "Anzahl der Etagen und Eingänge",
      "gewünschte Bereiche und Aufgaben",
      "Turnus oder bevorzugte Wochentage",
      "Zugang und Schlüsselregelung",
      "Aufzug und weitere Gemeinschaftsflächen",
      "Ansprechpartner für Rückfragen",
    ],
    effortFactors: [
      "Etagen, Eingänge und Laufwege",
      "Nutzung und Verschmutzung",
      "Aufzug und zusätzliche Bereiche",
      "Turnus und Zugangszeiten",
      "Keller, Fenster oder Außenstufen nur nach Vereinbarung",
    ],
    process: [
      "Objekt, Bereiche und Turnus nennen.",
      "Zugang und Ansprechpartner abstimmen.",
      "Leistungsplan vor dem Start gemeinsam festhalten.",
    ],
    faqItems: [
      {
        q: "Welche Bereiche können berücksichtigt werden?",
        a: "Je nach Vereinbarung können Eingang, Treppen, Podeste, Geländer, Aufzug und ausgewählte Gemeinschaftsflächen dazugehören.",
      },
      {
        q: "Kann eine Hausverwaltung einen festen Turnus anfragen?",
        a: "Ja. Nennen Sie Objekt, Bereiche, gewünschte Wochentage oder Intervalle, Zugang und Ansprechpartner.",
      },
      {
        q: "Sind Keller, Fenster oder Außenstufen automatisch enthalten?",
        a: "Nein. Solche Bereiche werden nur berücksichtigt, wenn sie ausdrücklich beschrieben, geprüft und vereinbart wurden.",
      },
      {
        q: "Welche Angaben helfen für die erste Einschätzung?",
        a: "Hilfreich sind Etagen, Eingänge, Aufzug, gewünschte Bereiche, Turnus, Zugang und ein Ansprechpartner.",
      },
    ],
    related: ["unterhaltsreinigung", "fensterreinigung", "grundreinigung"],
    about: ["Treppenhausreinigung Düsseldorf", "Treppenreinigung Düsseldorf", "Reinigung für Hausverwaltungen"],
  },
};

function resolveSeoMetadata(config: PageConfig) {
  const priorityMeta = config.path in prioritySeoMetaRegistry
    ? prioritySeoMetaRegistry[config.path as PrioritySeoRoute]
    : undefined;

  return {
    title: priorityMeta?.seoTitle ?? config.title,
    headline: priorityMeta?.headline ?? config.h1,
    description: priorityMeta?.description ?? config.description,
    ogTitle: priorityMeta?.ogTitle ?? config.ogTitle,
    ogDescription: priorityMeta?.ogDescription ?? priorityMeta?.description ?? config.description,
  };
}

export function buildDuesseldorfCleaningMetadata(pageKey: DuesseldorfCleaningPageKey): Metadata {
  const config = duesseldorfCleaningPages[pageKey];
  const seo = resolveSeoMetadata(config);
  const languages = Object.fromEntries(
    getLanguageAlternatesForPath(config.path).map((alternate) => [alternate.hreflang, alternate.path]),
  );
  return {
    metadataBase: new URL(company.url),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: config.path,
      languages,
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: config.path,
      title: seo.ogTitle,
      description: seo.ogDescription,
    },
    twitter: { card: "summary", title: seo.title, description: seo.description },
  };
}

function JsonLd({ config }: { config: PageConfig }) {
  const seo = resolveSeoMetadata(config);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: seo.title,
        description: seo.description,
        path: config.path,
        about: config.about,
        potentialActions: [{ name: config.cta.label, target: config.cta.href, type: "ContactAction" }],
      }),
      buildServiceJsonLd({
        name: seo.headline,
        description: seo.description,
        path: config.path,
        serviceType: config.serviceType,
        areaServed: ["Düsseldorf"],
        availableLanguage: ["de"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Düsseldorf", item: "/duesseldorf" },
        { name: config.eyebrow, item: config.path },
      ]),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

function ServiceCta({ config, light = false }: { config: PageConfig; light?: boolean }) {
  return (
    <Link
      href={config.cta.href}
      className={light
        ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
        : "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-cyan-800"}
      data-event="request_cta_click"
      data-service={config.cta.service}
      data-city="duesseldorf"
      data-destination={config.cta.href}
      data-source="website"
      data-cta-label={config.cta.label}
    >
      {config.cta.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function Hero({ config }: { config: PageConfig }) {
  return (
    <section className="relative isolate bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(8,145,178,0.24),transparent_34%),linear-gradient(135deg,#020617_0%,#0f172a_60%,#164e63_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div>
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300">
            <Link href="/" className="hover:text-white">FLOXANT</Link><span>/</span>
            <Link href="/duesseldorf" className="hover:text-white">Düsseldorf</Link><span>/</span>
            <span className="text-white">{config.eyebrow}</span>
          </nav>
          <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />{config.eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">{config.h1}</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-100 sm:text-lg">{config.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ServiceCta config={config} light />
            <a
              href={`tel:${duesseldorfCompany.phoneRaw}`}
              data-event="phone_click"
              data-source="duesseldorf_cleaning_hero"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Frage kurz telefonisch klären
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-300">
            Eine kurze Nachricht genügt für den Anfang. Fotos können Sie freiwillig ergänzen.
          </p>
        </div>
        <aside className="rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/30">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Das übernehmen wir</p>
          <div className="mt-4 grid gap-3">
            {config.fit.slice(0, 3).map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />{item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function ServiceChooser({ keys }: { keys: DuesseldorfCleaningPageKey[] }) {
  return (
    <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Reinigungsleistungen</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">Direkt zur passenden Reinigung.</h2>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
          Vom einzelnen Fenster bis zum regelmäßigen Reinigungsplan: Finden Sie die Unterstützung für Ihre Räume.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {keys.map((key) => {
            const item = duesseldorfCleaningPages[key];
            return (
              <article key={item.path} className="flex min-h-52 flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md">
                <h3 className="text-xl font-black text-slate-950">
                  <Link href={item.path} className="hover:text-cyan-800">{item.eyebrow}</Link>
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.summary}</p>
                <div className="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-black">
                  <Link href={item.path} className="inline-flex items-center gap-2 text-cyan-800">
                    Leistung ansehen<ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={item.cta.href} className="text-slate-950 underline decoration-cyan-300 decoration-2 underline-offset-4">
                    Direkt anfragen
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MoveOutCleaningCallout() {
  return (
    <section id="umzugsreinigung" className="scroll-mt-28 border-b border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-5 rounded-lg border border-cyan-100 bg-cyan-50 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-cyan-800">Umzugsreinigung Düsseldorf</p>
          <h2 className="mt-3 text-3xl font-black">Endreinigung nach Auszug oder vor Einzug anfragen</h2>
          <p className="mt-4 max-w-3xl font-semibold leading-8 text-slate-700">Nach dem Auszug reinigen wir Ihre Wohnung im vereinbarten Umfang. Böden, Küche, Bad und zugängliche Oberflächen stimmen wir auf den Zustand ab; Fenster und Einbauten lassen sich ergänzen. So haben Sie mehr Zeit für Ihr neues Zuhause.</p>
        </div>
        <Link href="/duesseldorf/endreinigung" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white">
          Umzugsreinigung anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function HubDecisionDetails({ config }: { config: PageConfig }) {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-800">Privat</p>
          <h2 className="mt-3 text-2xl font-black">Wohnung, Grund- oder Auszugsreinigung</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">Objektart, Räume, Fläche, Zustand, gewünschtes Ergebnis und Termin zeigen, welche Reinigungsart passt.</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-800">Gewerblich</p>
          <h2 className="mt-3 text-2xl font-black">Büro, Praxis oder Gewerbefläche</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">Wir reinigen Arbeitsplätze, Gemeinschaftsflächen und vereinbarte Nebenräume. Aufgaben und Zeiten passen wir an Ihren Betrieb an.</p>
        </article>
        <article className="rounded-lg bg-slate-950 p-6 text-white">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-200">Preisfaktoren</p>
          <h2 className="mt-3 text-2xl font-black">So entsteht Ihr persönliches Angebot</h2>
          <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-200">
            {config.effortFactors.slice(0, 4).map((factor) => <li key={factor}>• {factor}</li>)}
          </ul>
        </article>
      </div>
    </section>
  );
}

function SpecialistDetails({ config }: { config: PageConfig }) {
  return (
    <>
      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Leistungsumfang</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{config.fitTitle}</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{config.fitIntro}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {config.fit.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">{item}</div>
            ))}
          </div>
          {config.optional?.length ? <div className="mt-7"><h3 className="text-xl font-bold">Auf Wunsch zusätzlich</h3><ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">{config.optional.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
        </div>
      </section>
      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
              <ClipboardList className="h-4 w-4" aria-hidden="true" />Ihre Angaben
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">Diese Angaben helfen bei Ihrem Angebot.</h2>
            <ul className="mt-6 grid gap-3">
              {config.requiredDetails.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg bg-slate-950 p-5 text-white">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
              <Clock3 className="h-4 w-4" aria-hidden="true" />Aufwand und Termin
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Was den Preis beeinflusst.</h2>
            <p className="mt-4 leading-7 text-slate-200">Wir erstellen ein persönliches Angebot aus dem gewünschten Umfang. Die konkrete Einsatzadresse und Anfahrt werden dabei berücksichtigt.</p>
            <ul className="mt-6 grid gap-3">
              {config.effortFactors.map((item) => (
                <li key={item} className="rounded-lg border border-white/15 bg-white/[0.06] p-3 text-sm font-semibold leading-7 text-slate-100">{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

function Process({ config }: { config: PageConfig }) {
  return (
    <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-normal text-cyan-800">So geht es weiter</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">In drei Schritten zur vereinbarten Reinigung.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {config.process.map((step, index) => (
            <div key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">{index + 1}</span>
              <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ config }: { config: PageConfig }) {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Häufige Fragen</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">Gut zu wissen zu {config.eyebrow}.</h2>
        </div>
        <div className="grid gap-3">
          {config.faqItems.map((item, index) => (
            <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ config }: { config: PageConfig }) {
  return (
    <section className="bg-cyan-950 px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <MapPin className="h-4 w-4" aria-hidden="true" />Düsseldorf
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">Ihre Reinigung konkret anfragen.</h2>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-cyan-50/85">
            Wir reinigen in Düsseldorf und im Umkreis von 75 km Luftlinie. Schreiben Sie kurz, welche Arbeit Sie abgeben möchten. Umfang, Preis, Anfahrt und Termin stimmen wir persönlich mit Ihnen ab.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <ServiceCta config={config} light />
          <a
            href={`tel:${company.phoneRaw}`}
            data-event="phone_click"
            data-source="duesseldorf_cleaning_final"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Jetzt anrufen
          </a>
        </div>
      </div>
    </section>
  );
}

export function DuesseldorfCleaningServicePage({ pageKey }: { pageKey: DuesseldorfCleaningPageKey }) {
  const config = duesseldorfCleaningPages[pageKey];
  const isHub = pageKey === "reinigung";
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd config={config} />
      <Hero config={config} />
      <section className="border-b border-slate-200 bg-white px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl gap-4 rounded-lg border border-cyan-100 bg-cyan-50 p-5">
          <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-800" aria-hidden="true" />
          <div>
            {config.directAnswer ? (
              <>
                <p className="text-sm font-black uppercase tracking-wide text-cyan-900">Direkt beantwortet</p>
                <h2 className="mt-2 text-xl font-black text-slate-950">{config.directQuestion}</h2>
                <p className="mt-3 text-base font-semibold leading-8 text-slate-800">{config.directAnswer}</p>
              </>
            ) : (
              <p className="text-base font-semibold leading-8 text-slate-800">{config.summary}</p>
            )}
          </div>
        </div>
      </section>
      {isHub ? <ServiceChooser keys={config.related} /> : <SpecialistDetails config={config} />}
      {isHub ? <HubDecisionDetails config={config} /> : null}
      {isHub ? <MoveOutCleaningCallout /> : null}
      <Process config={config} />
      {isHub ? null : <ServiceChooser keys={config.related} />}
      <Faq config={config} />
      <FinalCta config={config} />
    </main>
  );
}
