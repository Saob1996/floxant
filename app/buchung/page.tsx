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

function getBookingRegionLabel(region: BookingRegionPreset) {
  return region === "duesseldorf" ? "Düsseldorf" : "Regensburg & Bayern";
}

function withBookingRegion(href: string, region: BookingRegionPreset) {
  if (region !== "duesseldorf" || !href.startsWith("/buchung")) return href;

  const [pathAndQuery, hash] = href.split("#");
  const [path, query = ""] = pathAndQuery.split("?");
  const params = new URLSearchParams(query);
  params.set("region", "duesseldorf");

  return `${path}?${params.toString()}${hash ? `#${hash}` : ""}`;
}

function getRegionalDecisionPaths(region: BookingRegionPreset) {
  return primaryInquiryPaths.map((item) => ({
    ...item,
    href: withBookingRegion(item.href, region),
  }));
}

function getBookingHeroCopy(
  service: BookingServicePreset,
  region: BookingRegionPreset,
  isGoogleMapsFlow: boolean,
) {
  const regionLabel = getBookingRegionLabel(region);
  const eyebrowPrefix = isGoogleMapsFlow ? "Google Maps Anfrage" : regionLabel;

  if (service === "umzug") {
    return {
      eyebrow: `${eyebrowPrefix} · Umzug`,
      title: region === "duesseldorf" ? "Umzug Düsseldorf anfragen." : "Umzug direkt anfragen.",
      description:
        region === "duesseldorf"
          ? "Start, Ziel, Etage, Laufweg, Termin und Fotos senden. FLOXANT prüft, welche Hilfe für Ihren Umzug in Düsseldorf sinnvoll passt."
          : "Start, Ziel, Etage, Laufweg, Termin und Fotos senden. FLOXANT prüft den Umzug mit passenden Zusatzleistungen wie Endreinigung, Räumung oder Rückfahrt.",
      wizardEyebrow: "Umzugsanfrage",
      wizardTitle: "Umzugsdaten senden.",
      wizardDescription:
        "Der Umzug ist vorausgewählt. Ergänzen Sie Start, Ziel, Termin, Zugang, Fotos, Budget und Hinweise zu Abbau, Reinigung oder Restmengen.",
    };
  }

  if (service === "reinigung") {
    return {
      eyebrow: `${eyebrowPrefix} · Reinigung`,
      title: "Reinigung direkt anfragen.",
      description:
        "Objektart, Fläche, Zustand, Termin, Fotos und Ziel der Reinigung senden. FLOXANT prüft den Aufwand und den passenden nächsten Schritt.",
      wizardEyebrow: "Reinigungsanfrage",
      wizardTitle: "Objekt und Zustand senden.",
      wizardDescription:
        "Die Reinigung ist vorausgewählt. Ergänzen Sie Fläche, Räume, Zustand, Fotos, Turnus oder Übergabeziel.",
    };
  }

  if (service === "entsorgung") {
    return {
      eyebrow: `${eyebrowPrefix} · Räumung`,
      title: "Räumung direkt anfragen.",
      description:
        "Menge, Räume, Etage, Zugang, Fotos, Termin und gewünschter Endzustand helfen, Entrümpelung, Haushaltsauflösung oder Entsorgung sauber einzuordnen.",
      wizardEyebrow: "Räumungsanfrage",
      wizardTitle: "Umfang und Zugang senden.",
      wizardDescription:
        "Entrümpelung/Entsorgung ist vorausgewählt. Ergänzen Sie Menge, Material, Fotos, Etage, Zugang, Freigabe und Termin.",
    };
  }

  if (service === "leerfahrt") {
    return {
      eyebrow: `${eyebrowPrefix} · Rückfahrt`,
      title: "Leerfahrt prüfen lassen.",
      description:
        "Route, Ladegut, Zeitfenster, Maße und Fotos senden. FLOXANT prüft, ob Rückfahrt oder Beiladung praktisch passt.",
      wizardEyebrow: "Rückfahrt",
      wizardTitle: "Route und Ladegut senden.",
      wizardDescription:
        "Beschreiben Sie Start, Ziel, Ladegut, Maße, Gewicht, Zeitfenster und gewünschte Übergabe.",
    };
  }

  return {
    eyebrow: isGoogleMapsFlow ? "Google Maps Anfrage" : "Anfrage starten",
    title: "Was brauchen Sie?",
    description:
      "Wählen Sie Umzug, Reinigung oder Entrümpelung. Die Anfrage übernimmt den gewählten Kontext direkt.",
    wizardEyebrow: "Anfrage",
    wizardTitle: "Leistung wählen. Eckdaten senden.",
    wizardDescription:
      "Der Klick auf eine Kernleistung springt direkt hierher und wählt den passenden Service vor. Sie ergänzen nur noch Ort, Termin, Hinweise und Kontakt.",
  };
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
    text: "Drei klare Wege: Umzug, Reinigung und Entrümpelung. Zusatzmodule kommen erst dazu, wenn sie wirklich helfen.",
  },
  {
    title: "Kontaktwege",
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
    q: "Welcher Startpunkt passt für normale Anfragen?",
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

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "buchung",
    title: "FLOXANT direkt anfragen | Umzug, Reinigung & Räumung",
    description:
      "FLOXANT Anfrage direkt starten: Umzug, Reinigung, Entrümpelung, Haushaltsauflösung oder Entsorgung wählen, Fotos senden, Budget nennen und Rückmeldung erhalten.",
    keywords: [
      "FLOXANT Anfrage",
      "Umzug anfragen Regensburg",
      "Reinigung anfragen Regensburg",
      "Entrümpelung anfragen Regensburg",
      "Transport anfragen Regensburg",
      "Entsorgung anfragen Regensburg",
      "Umzug anfragen Düsseldorf",
      "Reinigung anfragen Düsseldorf",
      "Entrümpelung anfragen Düsseldorf",
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

export default async function BuchungPage() {
  const dict = await getDictionary("de");
  const initialBookingService: BookingServicePreset = null;
  const initialBookingRegion: BookingRegionPreset = "regensburg-bayern";
  const isGoogleMapsBookingFlow = false;
  const initialBookingEntry = "direkt";
  const heroCopy = getBookingHeroCopy(initialBookingService, initialBookingRegion, isGoogleMapsBookingFlow);
  const regionalDecisionPaths = getRegionalDecisionPaths(initialBookingRegion);

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
          "Zentraler Startpunkt für unverbindliche Anfragen, Einschätzung, Express-Anfrage und Kostenorientierung bei FLOXANT.",
        path: "/buchung",
        serviceType: "Umzug, Reinigung, Entrümpelung, Anfrage und Beratung",
        areaServed: ["Regensburg", "Bayern", "Düsseldorf"],
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
                {heroCopy.eyebrow}
              </div>
              <h1 className="mt-6 max-w-[12ch] text-4xl font-bold leading-[0.98] tracking-[-0.025em] text-slate-950 md:text-6xl">
                {heroCopy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                {heroCopy.description}
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
              <QuickDecisionPanel region={initialBookingRegion} />
            </div>
          </div>

          <div id="anfragewege" className="relative -top-28 h-0" />

          <div className="mt-5 grid gap-3 lg:hidden">
            {regionalDecisionPaths.map((item) => (
              <DecisionPathCard key={item.title} item={item} compact />
            ))}
          </div>

          <CoreServicesGrid region={initialBookingRegion} />
        </div>
      </section>

      <BookingWizardSection
        dict={dict}
        initialService={initialBookingService}
        initialRegion={initialBookingRegion}
        initialEntry={initialBookingEntry}
        eyebrow={heroCopy.wizardEyebrow}
        title={heroCopy.wizardTitle}
        description={heroCopy.wizardDescription}
      />

      <SecondaryRequestCases region={initialBookingRegion} />

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
      <BookingStickyActions
        whatsappHref={whatsappUrl}
        budgetHref={withBookingRegion("/buchung?entry=budget#buchungssystem", initialBookingRegion)}
      />
    </main>
  );
}

function QuickDecisionPanel({ region }: { region: BookingRegionPreset }) {
  const decisionPaths = getRegionalDecisionPaths(region);

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_26px_80px_rgba(15,23,42,0.2)] md:rounded-[2.6rem] md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 pt-2">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-200">
            Kontaktweg wählen
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Was passt jetzt?</h2>
        </div>
        <ShieldCheck className="h-6 w-6 text-cyan-200" />
      </div>
      <div className="grid gap-3">
        {decisionPaths.map((item) => (
          <DecisionPathCard key={item.title} item={item} />
        ))}
      </div>
    </aside>
  );
}

function CoreServicesGrid({ region }: { region: BookingRegionPreset }) {
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
          Drei klare Wege. Kosten, Express und WhatsApp bleiben klar getrennte Kontaktwege.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {coreServices.map((service) => {
          const Icon = service.Icon;
          const href = withBookingRegion(service.href, region);

          return (
            <Link
              key={service.title}
              href={href}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10"
              data-event="service_card_click"
              data-service={href.includes("entsorgung") ? "entruempelung" : href.includes("reinigung") ? "reinigung" : "umzug"}
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

function SecondaryRequestCases({ region }: { region: BookingRegionPreset }) {
  return (
    <section id="sonderfaelle" className="px-4 pb-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 md:p-7">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              Weitere Kontaktwege
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
            const actionHref = withBookingRegion(item.action, region);

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
                  href={actionHref}
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
