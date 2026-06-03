import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Home,
  KeyRound,
  MapPin,
  MessageCircle,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantNextStepPanel } from "@/components/FloxantNextStepPanel";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { AiServiceRecommendationPanel } from "@/components/seo/AiServiceRecommendationPanel";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const bookingUrl = `${company.url}/buchung`;
const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte eine Anfrage zu Umzug, Reinigung oder Entrümpelung stellen.",
)}`;
const duesseldorfWhatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte eine Reinigung in Düsseldorf anfragen. Ich kann Fläche, Termin, Budget und Fotos senden.",
)}`;

const duesseldorfDisposalWhatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte Entsorgung in Düsseldorf anfragen. Ich kann Umfang, Zugang, Termin, Budget und Fotos senden.",
)}`;

type BuchungPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type BookingServicePreset = "umzug" | "reinigung" | "entsorgung" | "leerfahrt" | null;
type BookingRegionPreset = "regensburg-bayern" | "duesseldorf";
type DecisionPathItem = {
  title: string;
  label: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  variant: "primary" | "warm" | "mint" | "neutral";
  external?: boolean;
};

function getSearchParamValue(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

function getBookingServicePreset(value: string): BookingServicePreset {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes("reinigung") || normalized.includes("clean")) return "reinigung";
  if (
    normalized.includes("entsorgung") ||
    normalized.includes("entruempelung") ||
    normalized.includes("entrumpelung") ||
    normalized.includes("raeumung") ||
    normalized.includes("raumung")
  ) {
    return "entsorgung";
  }
  if (normalized.includes("leerfahrt") || normalized.includes("rueckfahrt") || normalized.includes("ruckfahrt")) return "leerfahrt";
  if (normalized.includes("umzug") || normalized.includes("moving") || normalized.includes("move")) return "umzug";

  return null;
}

function looksLikeDuesseldorfIntent(value: string) {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    normalized.includes("dusseldorf") ||
    normalized.includes("duesseldorf") ||
    /\b40[2-6]\d{2}\b/.test(normalized)
  );
}

function looksLikeDisposalIntent(value: string) {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    normalized.includes("entsorgung") ||
    normalized.includes("entruempelung") ||
    normalized.includes("entrumpelung") ||
    normalized.includes("sperrmuell") ||
    normalized.includes("sperrmull") ||
    normalized.includes("moebelentsorgung")
  );
}

function looksLikeGoogleMapsSource(value: string) {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_");

  return (
    normalized.includes("google_maps") ||
    normalized.includes("google_business_profile") ||
    normalized.includes("gbp") ||
    normalized.includes("maps")
  );
}

const coreServices = [
  {
    title: "Umzug",
    label: "Kernleistung",
    description: "Privat- und Firmenumzüge in Regensburg und Bayern.",
    href: "/buchung?service=umzug&entry=direkt#buchungssystem",
    cta: "Umzug anfragen",
    Icon: Truck,
    tone: "from-blue-600 via-blue-500 to-cyan-400",
  },
  {
    title: "Reinigung",
    label: "Kernleistung",
    description: "Wohnungs-, Büro- und Objektreinigung mit klarem Leistungsfokus.",
    href: "/buchung?service=reinigung&entry=direkt#buchungssystem",
    cta: "Reinigung anfragen",
    Icon: Sparkles,
    tone: "from-teal-500 via-cyan-500 to-blue-400",
  },
  {
    title: "Entrümpelung",
    label: "Kernleistung",
    description: "Räumung, Abtransport und fachgerechte Entsorgung.",
    href: "/buchung?service=entsorgung&entry=direkt#buchungssystem",
    cta: "Entrümpelung anfragen",
    Icon: Trash2,
    tone: "from-orange-500 via-amber-400 to-yellow-300",
  },
] as const;

const primaryInquiryPaths = [
  {
    title: "Anfrage senden",
    label: "Direkter Start",
    description: "Leistung wählen und die Anfrage sofort senden.",
    href: "/buchung?entry=direkt#buchungssystem",
    Icon: ClipboardCheck,
    variant: "primary",
  },
  {
    title: "Express-Check",
    label: "Zeitdruck",
    description: "Wenn Termin, Zugang oder Übergabe schnell geklärt werden sollen.",
    href: "/buchung?entry=express&urgency=express#buchungssystem",
    Icon: Zap,
    variant: "warm",
  },
  {
    title: "Kosten einschätzen",
    label: "Erste Orientierung",
    description: "Budget nennen und realistisch einordnen lassen.",
    href: "/buchung?entry=budget#buchungssystem",
    Icon: Banknote,
    variant: "mint",
  },
] as const;

const secondaryRequestCases = [
  {
    title: "Fotos ergänzen",
    text: "Zugang, Menge, Zustand oder Angebot direkt im Formular mitschicken.",
    action: "/buchung?entry=fotos#buchungssystem",
    detail: "/angebot-guenstiger-pruefen",
    Icon: ClipboardCheck,
  },
  {
    title: "Schadensbegrenzung",
    text: "Wenn Termin, Anbieter oder Ablauf kippt und schnell ein Plan B gebraucht wird.",
    action: "/buchung?entry=schadensbegrenzung&urgency=express#buchungssystem",
    detail: "/schadensbegrenzung",
    Icon: AlertTriangle,
  },
  {
    title: "Keller/Müllraum",
    text: "Nebenflächen, Garage, Keller oder Müllraum als Objektfall senden.",
    action: "/buchung?service=entsorgung&entry=keller_muellraum#buchungssystem",
    detail: "/keller-muellraum-rettung-regensburg",
    Icon: Trash2,
  },
  {
    title: "Makler/Vermieter",
    text: "Objektfall mit Übergabe, Fotos, Reinigung oder Räumung strukturiert starten.",
    action: "/buchung?entry=objektfall#buchungssystem",
    detail: "/makler-vermieter-link",
    Icon: UsersRound,
  },
] as const;

const signatureServices = [
  {
    title: "Schlüsselübergabe",
    text: "Anwesenheit und Abstimmung, wenn Sie nicht selbst vor Ort sein können.",
    href: "/schluesseluebergabe",
    Icon: KeyRound,
  },
  {
    title: "FLOXANT Übergabeakte",
    text: "Dokumentation, Fotos, Schlüsselstatus und Hinweise nach Absprache.",
    href: "/uebergabeakte",
    Icon: FileCheck2,
  },
  {
    title: "Wohnung wieder vermietbar",
    text: "Objekt nach Auszug, Leerstand oder Mieterwechsel nutzbarer vorbereiten.",
    href: "/wohnung-wieder-vermietbar",
    Icon: Home,
  },
  {
    title: "Immobilie verkaufsbereit",
    text: "Objekt vor Verkauf, Besichtigung oder Exposé mit Fotos, Räumung und Reinigung prüfen.",
    href: "/immobilie-verkaufsbereit-machen",
    Icon: FileCheck2,
  },
  {
    title: "Nachlassräumung",
    text: "Wohnung, Haus, Keller oder Garage nach Erbfall diskret mit Fotos, Freigabe und Rückruf klären.",
    href: "/nachlass-raeumung-regensburg",
    Icon: FileCheck2,
  },
  {
    title: "Diskreter Auszug",
    text: "Sensible private Auszugssituation mit Rückruf, sicherer Kontaktmethode, Transport, Reinigung und Übergabe klären.",
    href: "/diskreter-umzug-trennung-scheidung",
    Icon: ShieldCheck,
  },
  {
    title: "Umzug + Endreinigung",
    text: "Transport, Reinigung und Übergabe gemeinsam vorbereiten.",
    href: "/umzug-mit-reinigung",
    Icon: Sparkles,
  },
  {
    title: "Entrümpelung + Reinigung",
    text: "Räume leeren und auf Wunsch sauberer übergabebereit machen.",
    href: "/entruempelung-regensburg",
    Icon: PackageCheck,
  },
  {
    title: "Leerfahrt / Rückfahrt",
    text: "Freie Kapazitäten nutzen, wenn Strecke, Datum und Umfang passen.",
    href: "/leerfahrt-rueckfahrt",
    Icon: Route,
  },
  {
    title: "Foto-Prüfung",
    text: "Fotos von Zugang, Umfang oder Zustand direkt für bessere Einschätzung senden.",
    href: "#buchungssystem",
    Icon: ClipboardCheck,
  },
  {
    title: "Kostenrahmen",
    text: "Budget offen nennen und realistisch einordnen lassen.",
    href: "/anfrage-mit-preisrahmen",
    Icon: Banknote,
  },
  {
    title: "Express-Check",
    text: "Kurzer Weg für Zeitdruck, Zugang und schnelle Rückmeldung.",
    href: "/express-anfrage",
    Icon: Zap,
  },
] as const;

const signatureServiceGroups = [
  {
    title: "Übergabe & Dokumentation",
    items: ["Schlüsselübergabe", "FLOXANT Übergabeakte", "Zugangsprüfung", "Foto-Prüfung"],
  },
  {
    title: "Reinigung & Objektvorbereitung",
    items: ["Wohnung wieder vermietbar", "Immobilie verkaufsbereit", "Umzug + Endreinigung"],
  },
  {
    title: "Entrümpelung & Nebenflächen",
    items: ["Entrümpelung + Reinigung", "Nachlassräumung"],
  },
  {
    title: "Sonderfall & Zeitdruck",
    items: ["Diskreter Auszug", "Leerfahrt / Rückfahrt", "Kostenrahmen", "Express-Check"],
  },
] as const;

const processSteps = [
  "Leistung wählen",
  "Eckdaten senden",
  "Aufwand und Zugang prüfen",
  "Angebot oder Rückruf erhalten",
  "Termin nach Bestätigung planen",
] as const;

const proofPoints = [
  "Unverbindliche Anfrage",
  "Klare Rückmeldung nach Ihren Angaben",
  "Betreuung aus Regensburg",
] as const;

const detailCards = [
  {
    title: "Kernleistungen",
    text: "Drei klare Startpunkte: Umzug, Reinigung und Entrümpelung. Zusatzmodule kommen erst dazu, wenn sie wirklich helfen.",
  },
  {
    title: "Anfragewege",
    text: "Express, WhatsApp, Google Maps und Kosteneinschätzung bleiben getrennte Wege. So wählen Kunden schneller den passenden Start.",
  },
  {
    title: "Besondere Leistungen",
    text: "Schlüssel, Protokoll, Zugang oder Beiladung lösen die Punkte, an denen Aufträge oft hängen bleiben.",
  },
] as const;

const knowledgeLinks = [
  {
    title: "Umzug Kosten besser einschätzen",
    href: "/blog/umzug-kosten-regensburg",
    text: "Wenn vor der Anfrage noch unklar ist, welche Faktoren den Rahmen tatsächlich treiben.",
  },
  {
    title: "Wohnungsübergabe sauber vorbereiten",
    href: "/blog/wohnungsuebergabe-regensburg-vorbereiten",
    text: "Wenn Übergabe, Reinigung, Restmengen und Schlüssel früh mitgedacht werden sollen.",
  },
  {
    title: "Umzug mit Reinigung kombinieren",
    href: "/blog/umzug-mit-reinigung-regensburg",
    text: "Wenn der eigentliche Engpass nicht nur der Transport, sondern der ganze Abschluss ist.",
  },
] as const;

const faqItems = [
  {
    q: "Ist das Absenden der Anfrage schon verbindlich?",
    a: "Nein. Das Absenden ist unverbindlich. Ein verbindlicher Termin entsteht erst nach Prüfung, Angebot und gemeinsamer Bestätigung.",
  },
  {
    q: "Welcher Einstieg passt für normale Anfragen?",
    a: "Für die meisten Fälle passt die strukturierte Anfrage. Dort wählen Sie Leistung, Ort, Termin und wichtige Hinweise aus.",
  },
  {
    q: "Wann nutze ich den Express-Check?",
    a: "Der Express-Check passt, wenn Termin, Zugang oder Übergabe schnell eingeschätzt werden sollen.",
  },
  {
    q: "Ist eine Kosteneinschätzung eine eigene Leistung?",
    a: "Nein. Sie teilen Ihren Kostenrahmen mit und FLOXANT ordnet ein, welcher Umfang dafür realistisch ist.",
  },
  {
    q: "Welche Leistungen kann ich hier anfragen?",
    a: "Umzug, Reinigung und Entrümpelung sowie passende Zusatzleistungen wie Schlüsselübergabe, Seniorenumzug, Rückfahrt oder Schwertransport.",
  },
  {
    q: "Kann ich auch direkt per WhatsApp starten?",
    a: "Ja. WhatsApp eignet sich besonders für kurze Rückfragen, Fotos oder schnelle Abstimmung vor der strukturierten Anfrage.",
  },
];

const duesseldorfBookingProof = [
  {
    title: "Nur Reinigung in Düsseldorf",
    text: "Der Anfragefluss bleibt bewusst auf Wohnungsreinigung, Endreinigung, Büroreinigung und Grundreinigung begrenzt.",
    Icon: Sparkles,
  },
  {
    title: "Kostenrahmen und Fotos helfen",
    text: "Fläche, Zustand, Terminwunsch, Fotos und ein Budget machen die Einschätzung schneller und realistischer.",
    Icon: Banknote,
  },
  {
    title: "Antwort nach Prüfung",
    text: "Die Anfrage ist unverbindlich. FLOXANT prüft Umfang, Machbarkeit und Termin, bevor ein Auftrag entsteht.",
    Icon: ClipboardCheck,
  },
] as const;

const duesseldorfBookingFaqItems = [
  {
    q: "Kann ich über diese Buchungsseite andere Leistungsarten anfragen?",
    a: "Nein. Dieser Einstieg ist bewusst nur auf Reinigung in Düsseldorf ausgelegt. Andere Leistungen werden hier nicht als lokaler Düsseldorfer Anfrageweg geführt.",
  },
  {
    q: "Welche Reinigungsarten kann ich in Düsseldorf anfragen?",
    a: "Möglich sind Wohnungsreinigung, Endreinigung, Büroreinigung, Grundreinigung, Treppenhausreinigung und Reinigung vor Übergabe, jeweils nach Umfang und Verfügbarkeit.",
  },
  {
    q: "Was sollte ich für eine schnelle Einschätzung angeben?",
    a: "Hilfreich sind Fläche, Adresse oder Stadtteil, Terminwunsch, Reinigungsziel, Fotos vom Zustand und ein Budget, falls es eine feste Vorstellung gibt.",
  },
] as const;

const duesseldorfDisposalBookingProof = [
  {
    title: "Nur Entsorgung in diesem Einstieg",
    text: "Die Anfrage sammelt Umfang, Zugang, Fotos und Budget für Möbel, Sperrmüll oder regulär entsorgbare Gegenstände.",
    Icon: Trash2,
  },
  {
    title: "Fotos machen die Prüfung schneller",
    text: "Bilder von Menge, Etage, Laufweg und Materialart helfen bei einer realistischen Einschätzung.",
    Icon: ClipboardCheck,
  },
  {
    title: "Keine riskanten Stoffe",
    text: "Gefahrstoffe, Chemikalien, Asbest und rechtlich ungeklärte Sonderabfaelle werden nicht zugesagt.",
    Icon: ShieldCheck,
  },
] as const;

const duesseldorfDisposalBookingFaqItems = [
  {
    q: "Welche Entsorgung kann ich in Düsseldorf anfragen?",
    a: "Möbel, Sperrmüll, Haushaltsgegenstände, kleinere Räumungen und regulär entsorgbare Gegenstände können nach Umfang, Zugang und Fotos geprüft werden.",
  },
  {
    q: "Ist das ein Umzugsangebot?",
    a: "Nein. Dieser Einstieg ist für Entsorgung in Düsseldorf gedacht. Andere Leistungen werden hier nicht als lokaler Hauptservice beworben.",
  },
  {
    q: "Was braucht FLOXANT für eine schnelle Einschätzung?",
    a: "Hilfreich sind Fotos, Umfang, Etage, Aufzug oder Laufweg, Terminwunsch, Materialart und ein Budgetrahmen, falls vorhanden.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "buchung",
    title: "FLOXANT Anfrage Regensburg & Bayern | Umzug, Reinigung, Entrümpelung",
    description:
      "FLOXANT Anfrage aus Regensburg direkt starten: Umzug, Reinigung, Entrümpelung, Transport oder Entsorgung wählen, Fotos senden, Budget nennen und Rückmeldung erhalten.",
    keywords: [
      "FLOXANT Anfrage",
      "Umzug anfragen Regensburg",
      "Reinigung anfragen Regensburg",
      "Entrümpelung anfragen Regensburg",
      "Transport anfragen Regensburg",
      "Entsorgung anfragen Regensburg",
      "Buchung Regensburg",
      "Express Check Umzug",
      "Budget Preisvorschlag",
      "Google Maps Anfrage Regensburg",
      "Direkt anfragen FLOXANT",
      "Anfrage mit Fotos senden",
      "Angebot anderer Firma prüfen",
      "Schlüsselübergabe",
      "Beiladung Bayern",
    ],
  });
}

export default async function BuchungPage({ searchParams }: BuchungPageProps) {
  const dict = await getDictionary("de");
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const regionIntent = [
    getSearchParamValue(resolvedSearchParams, "region"),
    getSearchParamValue(resolvedSearchParams, "city"),
    getSearchParamValue(resolvedSearchParams, "standort"),
    getSearchParamValue(resolvedSearchParams, "ort"),
    getSearchParamValue(resolvedSearchParams, "plz"),
  ].join(" ");
  const serviceIntent = [
    getSearchParamValue(resolvedSearchParams, "service"),
    getSearchParamValue(resolvedSearchParams, "leistung"),
  ].join(" ");
  const sourceIntent = [
    getSearchParamValue(resolvedSearchParams, "utm_source"),
    getSearchParamValue(resolvedSearchParams, "source"),
  ].join(" ");
  const isDuesseldorfIntent = looksLikeDuesseldorfIntent(regionIntent);
  const isDuesseldorfDisposalFlow = isDuesseldorfIntent && looksLikeDisposalIntent(serviceIntent);
  const isDuesseldorfCleaningFlow = isDuesseldorfIntent && !isDuesseldorfDisposalFlow;
  const isGoogleMapsBookingFlow = looksLikeGoogleMapsSource(sourceIntent);

  if (isDuesseldorfDisposalFlow) {
    return <DuesseldorfDisposalBooking dict={dict} />;
  }

  if (isDuesseldorfCleaningFlow) {
    return <DuesseldorfCleaningBooking dict={dict} />;
  }

  const heroLabel = isGoogleMapsBookingFlow ? "Google Maps Anfrage" : "Anfrage starten";
  const initialBookingService = getBookingServicePreset(serviceIntent);
  const initialBookingRegion: BookingRegionPreset = "regensburg-bayern";
  const initialBookingEntry =
    getSearchParamValue(resolvedSearchParams, "entry") ||
    getSearchParamValue(resolvedSearchParams, "weg") ||
    (isGoogleMapsBookingFlow ? "google_maps" : "direkt");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Anfrage starten", item: "/buchung" },
      ]),
      buildWebPageJsonLd({
        name: "FLOXANT Anfrage starten",
        description:
          "Klar priorisierter Anfragebereich für Umzug, Reinigung, Entrümpelung, Express-Anfrage, Kosteneinschätzung und passende Zusatzleistungen.",
        path: "/buchung",
        about: [
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Buchung",
          "Express-Check",
          "Kostenrahmen",
          "Schlüsselübergabe",
          "Regensburg",
          "Bayern",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Anfrage- und Buchungszentrum",
        description:
          "Zentraler Einstieg für unverbindliche Anfragen, Einschätzung, Express-Anfrage und Kostenorientierung bei FLOXANT.",
        path: "/buchung",
        serviceType: "Umzug, Reinigung, Entrümpelung, Anfrage und Beratung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildFaqJsonLd(faqItems),
      {
        "@type": "ItemList",
        "@id": `${bookingUrl}#kernleistungen`,
        name: "FLOXANT Kernleistungen",
        itemListElement: coreServices.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `${company.url}${item.href}`,
          description: item.description,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7fb_42%,#eef4f8_100%)] pb-28 text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Anfrage starten" }]} />

      <section id="ueberblick" className="relative px-4 pb-10 pt-8 sm:px-6 lg:pb-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_72%_0%,rgba(37,99,235,0.16),transparent_58%),radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.14),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-white/80 bg-white/[0.82] p-6 shadow-[0_26px_80px_rgba(15,23,42,0.08)] backdrop-blur md:rounded-[2.6rem] md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                <MapPin className="h-4 w-4" />
                {heroLabel}
              </div>
              <h1 className="mt-6 max-w-[12ch] text-4xl font-bold leading-[0.98] tracking-[-0.025em] text-slate-950 md:text-6xl">
                Was brauchen Sie?
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                Wählen Sie Umzug, Reinigung oder Entrümpelung. Die Anfrage übernimmt den gewählten Kontext direkt.
              </p>

              {isGoogleMapsBookingFlow ? (
                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold leading-6 text-blue-900">
                  Aus Google Maps kommend? Wählen Sie direkt die Leistung, nennen Sie Ort
                  oder PLZ und senden Sie optional Fotos für eine schnellere Prüfung.
                </div>
              ) : null}

              <div className="mt-7 grid gap-2 sm:grid-cols-3">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/5"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <QuickDecisionPanel />
            </div>
          </div>

          <div id="anfragewege" className="relative -top-28 h-0" />

          <div className="mt-5 grid gap-3 lg:hidden">
            {primaryInquiryPaths.map((item) => (
              <DecisionPathCard key={item.title} item={item} compact />
            ))}
          </div>

          <CoreServicesGrid />
        </div>
      </section>

      <BookingWizardSection
        dict={dict}
        initialService={initialBookingService}
        initialRegion={initialBookingRegion}
        initialEntry={initialBookingEntry}
      />

      <SecondaryRequestCases />

      <FloxantNextStepPanel variant="booking" className="pb-12 pt-0" />

      <AiServiceRecommendationPanel variant="default" className="pb-12 pt-0" />

      <section id="signature-services" className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                Besondere Leistungen
              </div>
              <h2 className="mt-3 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-5xl">
                Das macht FLOXANT präziser als einen Standardauftrag.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-right">
              Diese Leistungen lösen typische Schnittstellen: Schlüssel, Zugang, Übergabe, Rückfahrt, Sondertransport und Kostenrahmen.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {signatureServiceGroups.map((group) => (
              <section key={group.title} className="rounded-[1.6rem] border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-950/5">
                <h3 className="text-lg font-black tracking-tight text-slate-950">{group.title}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {signatureServices
                    .filter((item) => (group.items as readonly string[]).includes(item.title))
                    .map((item) => {
                      const Icon = item.Icon;

                      return (
                        <article key={item.title} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                              <Icon className="h-4 w-4" />
                            </span>
                            <Link
                              href={item.href}
                              className="text-xs font-black text-slate-500 underline-offset-4 hover:text-blue-700 hover:underline"
                            >
                            Ansehen
                            </Link>
                          </div>
                          <h4 className="mt-4 text-base font-bold tracking-tight text-slate-950">{item.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                          <Link
                            href={getSignatureActionHref(item.title)}
                            className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-3 text-xs font-black uppercase tracking-[0.12em] text-blue-700 transition hover:bg-blue-50"
                            data-event="hero_cta_click"
                            data-source="booking_signature_service"
                            data-label={item.title}
                            data-request-center="ignore"
                          >
                            Anfrage vorbereiten
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </article>
                      );
                    })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <PublicAuthorityModules
        moduleIds={[
          "regensburg_core",
          "photo_check",
          "budget_check",
          "move_cleaning_combo",
          "clear_cleaning_combo",
          "rental_ready",
          "realtor_landlord_link",
          "duesseldorf_apartment_cleaning",
          "referral_partnercode",
          "damage_control",
          "cellar_trashroom_rescue",
          "empty_return_fit",
        ]}
        badge={isGoogleMapsBookingFlow ? "Google Maps Anfrage" : "Anfragequalität"}
        title="Was eine schnelle Anfrage für FLOXANT besser verwertbar macht"
        subtitle="Die Buchungsseite bleibt kurz und zeigt klar, welche Angaben helfen: Ort, Leistung, Termin, Fotos, Budget und passende Zusatzleistungen wie Reinigung, Entrümpelung oder Rückfahrt."
        source={isGoogleMapsBookingFlow ? "gbp_booking_authority_modules" : "booking_authority_modules"}
      />

      <section id="ablauf" className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-slate-950/5 md:p-7">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                So läuft es ab
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Kurzer Weg zur klaren Anfrage.
              </h2>
            </div>
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-950 md:max-w-md">
              Die Anfrage ist unverbindlich. Verbindlich wird ein Termin erst nach Einschätzung und Bestätigung.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step}
                className="relative rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-bold leading-6 text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="border-y border-slate-200 bg-white/60 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {detailCards.map((item) => (
              <article key={item.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="wissen" className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.95),rgba(255,255,255,1))] p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                Vor der Anfrage
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Erst kurz orientieren, dann sauber anfragen.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 lg:text-right">
              Diese Inhalte helfen, Kostenrahmen, Übergabe und kombinierte Leistungen besser
              einzuordnen, bevor Sie den Fall an FLOXANT senden.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {knowledgeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.45rem] border border-white bg-white px-5 py-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Ratgeber
                </div>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  Weiterlesen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Häufige Fragen zur FLOXANT Anfrage
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <BookingStickyActions whatsappHref={whatsappUrl} budgetHref="/buchung?entry=budget#buchungssystem" />
    </main>
  );
}

function DuesseldorfCleaningBooking({ dict }: { dict: any }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7fffd_0%,#f6fafc_48%,#eef5f8_100%)] pb-28 text-foreground">
      <Breadcrumbs items={[{ label: "Reinigung Düsseldorf", href: "/duesseldorf/reinigung" }, { label: "Anfrage" }]} />

      <section className="relative px-4 pb-12 pt-8 sm:px-6 lg:pb-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_75%_0%,rgba(20,184,166,0.18),transparent_58%),radial-gradient(circle_at_15%_22%,rgba(37,99,235,0.12),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-white/80 bg-white/[0.88] p-6 shadow-[0_26px_80px_rgba(15,23,42,0.08)] backdrop-blur md:rounded-[2.6rem] md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-teal-700">
                <MapPin className="h-4 w-4" />
                Düsseldorf · Nur Reinigung
              </div>
              <h1 className="mt-6 max-w-[13ch] text-4xl font-bold leading-[0.98] tracking-[-0.025em] text-slate-950 md:text-6xl">
                Reinigung Düsseldorf unverbindlich anfragen.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                Für Düsseldorf führt dieser Einstieg ausschließlich zu Reinigung: Wohnung,
                Endreinigung, Büro, Grundreinigung oder Übergabevorbereitung. Budget,
                Fotos und Terminwunsch helfen bei einer schnellen Einschätzung.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#buchungssystem"
                  className="flox-readable-cta-dark inline-flex items-center justify-center gap-2 rounded-[1.2rem] px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5"
                  data-event="hero_cta_click"
                  data-service="reinigung"
                  data-region="duesseldorf"
                >
                  Reinigung anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={duesseldorfWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-teal-200 bg-teal-50 px-5 py-3 text-sm font-bold text-teal-800 transition hover:-translate-y-0.5 hover:bg-teal-100"
                  data-event="whatsapp_click"
                  data-service="reinigung"
                  data-region="duesseldorf"
                >
                  WhatsApp mit Fotos starten
                </a>
                <Link
                  href="/buchung?service=reinigung&region=duesseldorf&entry=budget#buchungssystem"
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-teal-200"
                  data-event="form_submit"
                  data-service="reinigung"
                  data-region="duesseldorf"
                  data-request-center="ignore"
                >
                  Budget einordnen lassen
                </Link>
                <Link
                  href="/reinigung-moeblierte-wohnung-duesseldorf"
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-bold text-cyan-900 transition hover:-translate-y-0.5 hover:bg-cyan-100"
                  data-event="service_card_click"
                  data-service="duesseldorf_moeblierte_wohnung_reinigung"
                  data-region="duesseldorf"
                >
                  Moeblierte Wohnung
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_26px_80px_rgba(15,23,42,0.2)] md:rounded-[2.6rem]">
              <div className="px-2 pt-2">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-200">
                  Anfragequalität
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Gute Angaben, schneller prüfbar.
                </h2>
              </div>
              <div className="mt-5 grid gap-3">
                {duesseldorfBookingProof.map((item) => {
                  const Icon = item.Icon;

                  return (
                    <article key={item.title} className="rounded-[1.45rem] border border-white/10 bg-white/[0.08] p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.12] text-teal-100">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-bold tracking-tight">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-white/70">{item.text}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="kontakt" className="px-4 pb-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div id="buchungssystem" className="relative -top-28 block h-0 w-0" />
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-teal-700">
                <Clock3 className="h-4 w-4" />
                Reinigungsanfrage
              </div>
              <h2 className="mt-3 max-w-[13ch] text-3xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
                Zustand, Termin und Budget senden.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:text-right">
              Diese Anfrage ist auf Reinigung in Düsseldorf vorbereitet.
              Andere Leistungen werden hier nicht als lokaler Düsseldorfer Anfrageweg geführt.
            </p>
          </div>

          <div className="calc-surface relative overflow-hidden rounded-[2.2rem] p-3 shadow-[0_28px_80px_rgba(15,23,42,0.1)] sm:p-5">
            <div className="pointer-events-none absolute inset-0 opacity-16">
              <FloxantSymbolLayer variant="moving" density="soft" className="opacity-70" />
            </div>
            <div className="relative">
              <SmartBookingWizard
                dict={{
                  common: dict.common,
                  calculator: dict.calculator,
                  booking: dict.booking,
                }}
                initialService="reinigung"
                initialRegion="duesseldorf"
                initialEntry="direkt"
                forceVisible
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Häufige Fragen zur Reinigungsanfrage Düsseldorf
            </h2>
          </div>
          <div className="space-y-3">
            {duesseldorfBookingFaqItems.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <BookingStickyActions
        whatsappHref={duesseldorfWhatsappUrl}
        budgetHref="/buchung?service=reinigung&region=duesseldorf&entry=budget#buchungssystem"
      />
    </main>
  );
}

function DuesseldorfDisposalBooking({ dict }: { dict: any }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#f8fbff_48%,#eef5f8_100%)] pb-28 text-foreground">
      <Breadcrumbs items={[{ label: "Entsorgung Düsseldorf", href: "/entsorgung-duesseldorf" }, { label: "Anfrage" }]} />

      <section className="relative px-4 pb-12 pt-8 sm:px-6 lg:pb-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_75%_0%,rgba(249,115,22,0.16),transparent_58%),radial-gradient(circle_at_15%_22%,rgba(37,99,235,0.12),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-white/80 bg-white/[0.88] p-6 shadow-[0_26px_80px_rgba(15,23,42,0.08)] backdrop-blur md:rounded-[2.6rem] md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-orange-700">
                <Trash2 className="h-4 w-4" />
                Düsseldorf - Entsorgung
              </div>
              <h1 className="mt-6 max-w-[13ch] text-4xl font-bold leading-[0.98] tracking-[-0.025em] text-slate-950 md:text-6xl">
                Entsorgung Düsseldorf unverbindlich anfragen.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                Für Möbel, Sperrmüll, Haushaltsgegenstände oder kleine Räumungen zählen
                Umfang, Zugang, Etage, Termin und Fotos. FLOXANT prüft diese Angaben, bevor
                ein Angebot oder Rückruf entsteht.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#buchungssystem"
                  className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_46px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5"
                  data-event="hero_cta_click"
                  data-service="entsorgung"
                  data-region="duesseldorf"
                >
                  Entsorgung anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={duesseldorfDisposalWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-bold text-orange-800 transition hover:-translate-y-0.5 hover:bg-orange-100"
                  data-event="whatsapp_click"
                  data-service="entsorgung"
                  data-region="duesseldorf"
                >
                  WhatsApp mit Fotos starten
                </a>
                <Link
                  href="/buchung?service=entsorgung&region=duesseldorf&entry=budget#buchungssystem"
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-orange-200"
                  data-event="form_submit"
                  data-service="entsorgung"
                  data-region="duesseldorf"
                  data-request-center="ignore"
                >
                  Kosten einschätzen
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_26px_80px_rgba(15,23,42,0.2)] md:rounded-[2.6rem]">
              <div className="px-2 pt-2">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-200">
                  Anfragequalität
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Umfang sichtbar machen. Rückmeldung beschleunigen.
                </h2>
              </div>
              <div className="mt-5 grid gap-3">
                {duesseldorfDisposalBookingProof.map((item) => {
                  const Icon = item.Icon;

                  return (
                    <article key={item.title} className="rounded-[1.45rem] border border-white/10 bg-white/[0.08] p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.12] text-orange-100">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-bold tracking-tight">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-white/70">{item.text}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="kontakt" className="px-4 pb-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div id="buchungssystem" className="relative -top-28 block h-0 w-0" />
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-orange-700">
                <Clock3 className="h-4 w-4" />
                Entsorgungsanfrage
              </div>
              <h2 className="mt-3 max-w-[13ch] text-3xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
                Umfang, Zugang, Fotos und Budget senden.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:text-right">
              Diese Anfrage ist auf Entsorgung in Düsseldorf vorbereitet.
              Reinigung bleibt separat; andere lokale Hauptservices werden hier nicht beworben.
            </p>
          </div>

          <div className="calc-surface relative overflow-hidden rounded-[2.2rem] p-3 shadow-[0_28px_80px_rgba(15,23,42,0.1)] sm:p-5">
            <div className="pointer-events-none absolute inset-0 opacity-16">
              <FloxantSymbolLayer variant="moving" density="soft" className="opacity-70" />
            </div>
            <div className="relative">
              <SmartBookingWizard
                dict={{
                  common: dict.common,
                  calculator: dict.calculator,
                  booking: dict.booking,
                }}
                initialService="entsorgung"
                initialRegion="duesseldorf"
                initialEntry="direkt"
                forceVisible
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Häufige Fragen zur Entsorgungsanfrage Düsseldorf
            </h2>
          </div>
          <div className="space-y-3">
            {duesseldorfDisposalBookingFaqItems.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <BookingStickyActions
        whatsappHref={duesseldorfDisposalWhatsappUrl}
        budgetHref="/buchung?service=entsorgung&region=duesseldorf&entry=budget#buchungssystem"
      />
    </main>
  );
}

function QuickDecisionPanel() {
  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_26px_80px_rgba(15,23,42,0.2)] md:rounded-[2.6rem] md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 pt-2">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-200">
            Anfrageweg wählen
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Was passt jetzt?</h2>
        </div>
        <ShieldCheck className="h-6 w-6 text-cyan-200" />
      </div>
      <div className="grid gap-3">
        {primaryInquiryPaths.map((item) => (
          <DecisionPathCard key={item.title} item={item} />
        ))}
      </div>
    </aside>
  );
}

function CoreServicesGrid() {
  return (
    <section id="kernleistungen" className="mt-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
            Kernleistungen
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Erst die Leistung wählen. Dann den passenden Weg.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-right">
          Drei klare Startpunkte. Kosten, Express und WhatsApp bleiben klar getrennte Anfragewege.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {coreServices.map((service) => {
          const Icon = service.Icon;

          return (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10"
              data-event="service_card_click"
              data-service={service.href.includes("entsorgung") ? "entruempelung" : service.href.includes("reinigung") ? "reinigung" : "umzug"}
              data-source="booking_core_services"
              data-request-center="ignore"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.tone}`} />
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-gradient-to-br ${service.tone} text-white shadow-[0_18px_42px_rgba(15,23,42,0.14)]`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  {service.label}
                </span>
              </div>
              <h3 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">{service.title}</h3>
              <p className="mt-3 min-h-[48px] text-sm leading-7 text-slate-600">{service.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                {service.cta}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function DecisionPathCard({
  item,
  compact = false,
}: {
  item: DecisionPathItem;
  compact?: boolean;
}) {
  const Icon = item.Icon;
  const tone =
    item.variant === "primary"
      ? "border-blue-400/30 bg-blue-500/[0.15] text-blue-50 hover:bg-blue-500/20"
      : item.variant === "warm"
        ? "border-amber-300/30 bg-amber-400/[0.15] text-amber-50 hover:bg-amber-400/20"
        : item.variant === "mint"
          ? "border-emerald-300/30 bg-emerald-400/[0.15] text-emerald-50 hover:bg-emerald-400/20"
          : "border-slate-500/30 bg-white/10 text-slate-50 hover:bg-white/[0.15]";

  const content = (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.12] text-white">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
              {item.label}
            </div>
            <div className="text-base font-bold tracking-tight text-white">{item.title}</div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-white" />
      </div>
      <p className={compact ? "mt-3 text-sm leading-6 text-white/70" : "mt-2 pl-14 text-sm leading-6 text-white/70"}>
        {item.description}
      </p>
    </>
  );

  const className = `group block rounded-[1.45rem] border p-4 transition duration-300 ${tone}`;
  const eventName = "external" in item && item.external ? "whatsapp_click" : "hero_cta_click";
  const eventAction = "external" in item && item.external
    ? "whatsapp"
    : item.href.includes("preisrahmen")
      ? "budget_request"
      : "booking";

  return item.href.startsWith("http") ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-event={eventName}
      data-action={eventAction}
      data-source="booking_decision_path"
    >
      {content}
    </a>
  ) : item.href.startsWith("#") ? (
    <a href={item.href} className={className} data-event={eventName} data-action={eventAction} data-source="booking_decision_path" data-request-center="ignore">
      {content}
    </a>
  ) : (
    <Link
      href={item.href}
      className={className}
      data-event={eventName}
      data-action={eventAction}
      data-source="booking_decision_path"
      data-request-center={item.href.startsWith("/buchung") ? "ignore" : undefined}
    >
      {content}
    </Link>
  );
}

function getSignatureActionHref(title: string) {
  const normalized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes("reinigung") || normalized.includes("vermietbar") || normalized.includes("verkaufsbereit")) {
    return "/buchung?service=reinigung&entry=zusatzservice#buchungssystem";
  }

  if (normalized.includes("entruempel") || normalized.includes("nachlass")) {
    return "/buchung?service=entsorgung&entry=zusatzservice#buchungssystem";
  }

  if (normalized.includes("leerfahrt") || normalized.includes("ruckfahrt") || normalized.includes("rueckfahrt")) {
    return "/buchung?service=leerfahrt&entry=rueckfahrt#buchungssystem";
  }

  if (normalized.includes("budget") || normalized.includes("kostenrahmen")) {
    return "/buchung?entry=budget#buchungssystem";
  }

  if (normalized.includes("express")) {
    return "/buchung?entry=express&urgency=express#buchungssystem";
  }

  return "/buchung?service=umzug&entry=zusatzservice#buchungssystem";
}

function BookingWizardSection({
  dict,
  initialService,
  initialRegion,
  initialEntry,
  eyebrow = "Anfrage",
  title = "Leistung wählen. Eckdaten senden.",
  description = "Der Klick auf eine Kernleistung springt direkt hierher und wählt den passenden Service vor. Sie ergänzen nur noch Ort, Termin, Hinweise und Kontakt.",
}: {
  dict: any;
  initialService: BookingServicePreset;
  initialRegion: BookingRegionPreset;
  initialEntry: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section id="kontakt" className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div id="buchungssystem" className="relative -top-28 block h-0 w-0" />
        <div className="mb-6 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              <Clock3 className="h-4 w-4" />
              {eyebrow}
            </div>
            <h2 className="mt-3 max-w-[12ch] text-3xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:text-right">
            {description}
          </p>
        </div>

        <div className="calc-surface relative overflow-hidden rounded-[2.2rem] p-3 shadow-[0_28px_80px_rgba(15,23,42,0.1)] sm:p-5">
          <div className="pointer-events-none absolute inset-0 opacity-16">
            <FloxantSymbolLayer variant="moving" density="soft" className="opacity-70" />
          </div>
          <div className="relative">
            <SmartBookingWizard
              dict={{
                common: dict.common,
                calculator: dict.calculator,
                booking: dict.booking,
              }}
              initialService={initialService}
              initialRegion={initialRegion}
              initialEntry={initialEntry}
              forceVisible
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SecondaryRequestCases() {
  return (
    <section id="sonderfaelle" className="px-4 pb-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 md:p-7">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              Weitere Anfragewege
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Sonderfall wählen, dann direkt ins Formular.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:text-right">
            Diese Wege bleiben erhalten, führen aber nicht mehr in ein Labyrinth. Der Hauptbutton setzt den Kontext und startet die Anfrage.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {secondaryRequestCases.map((item) => {
            const Icon = item.Icon;

            return (
              <article key={item.title} className="rounded-[1.45rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-blue-700 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <Link href={item.detail} className="text-xs font-black text-slate-500 underline-offset-4 hover:text-blue-700 hover:underline">
                    Ansehen
                  </Link>
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-slate-600">{item.text}</p>
                <Link
                  href={item.action}
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-700"
                  data-event="hero_cta_click"
                  data-source="booking_secondary_case"
                  data-request-center="ignore"
                >
                  Mit Anfrage starten
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BookingStickyActions({
  whatsappHref,
  budgetHref,
}: {
  whatsappHref: string;
  budgetHref: string;
}) {
  return (
    <nav
      aria-label="Schneller Anfragezugang"
      className="fixed inset-x-3 bottom-[max(0.8rem,env(safe-area-inset-bottom))] z-[65] mx-auto flex max-w-2xl items-center gap-2 rounded-[1.2rem] border border-slate-200 bg-white/96 p-2 shadow-[0_18px_58px_rgba(15,23,42,0.2)] backdrop-blur md:bottom-5"
    >
      <a
        href="#buchungssystem"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 text-sm font-black text-white transition hover:bg-blue-700"
        data-event="hero_cta_click"
        data-source="booking_sticky"
        data-request-center="ignore"
      >
        Anfrage starten
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-sm font-black text-white shadow-[0_10px_26px_rgba(37,211,102,0.22)] transition hover:bg-[#16a34a]"
        data-event="whatsapp_click"
        data-source="booking_sticky"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <Link
        href={budgetHref}
        className="hidden min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-black text-slate-900 transition hover:bg-blue-50 sm:inline-flex"
        data-event="form_submit"
        data-source="booking_sticky"
        data-request-center="ignore"
      >
        Kosten einschätzen
      </Link>
    </nav>
  );
}
