import type { Metadata } from "next";
import Link from "next/link";
import {
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
  Zap,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
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

const coreServices = [
  {
    title: "Umzug",
    label: "Kernleistung",
    description: "Privat- und Firmenumzüge in Regensburg und Bayern.",
    href: "/buchung?service=umzug#buchungssystem",
    cta: "Umzug anfragen",
    Icon: Truck,
    tone: "from-blue-600 via-blue-500 to-cyan-400",
  },
  {
    title: "Reinigung",
    label: "Kernleistung",
    description: "Wohnungs-, Büro- und Objektreinigung mit klarem Leistungsfokus.",
    href: "/buchung?service=reinigung#buchungssystem",
    cta: "Reinigung anfragen",
    Icon: Sparkles,
    tone: "from-teal-500 via-cyan-500 to-blue-400",
  },
  {
    title: "Entrümpelung",
    label: "Kernleistung",
    description: "Räumung, Abtransport und fachgerechte Entsorgung.",
    href: "/buchung?service=entsorgung#buchungssystem",
    cta: "Entrümpelung anfragen",
    Icon: Trash2,
    tone: "from-orange-500 via-amber-400 to-yellow-300",
  },
] as const;

const inquiryPaths = [
  {
    title: "Anfrage starten",
    label: "Strukturiert",
    description: "Für vollständige Angaben und eine saubere Prüfung.",
    href: "#buchungssystem",
    Icon: ClipboardCheck,
    variant: "primary",
  },
  {
    title: "Express-Check",
    label: "Eilig",
    description: "Für knappe Termine und schnelle Machbarkeit.",
    href: "/express-anfrage",
    Icon: Zap,
    variant: "warm",
  },
  {
    title: "Budget nennen",
    label: "Preisrahmen",
    description: "Wenn Sie einen Rahmen haben und Machbarkeit prüfen möchten.",
    href: "/anfrage-mit-preisrahmen",
    Icon: Banknote,
    variant: "mint",
  },
  {
    title: "WhatsApp",
    label: "Direkt",
    description: "Für Rückfragen, Fotos oder kurze Abstimmung.",
    href: whatsappUrl,
    Icon: MessageCircle,
    variant: "neutral",
    external: true,
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
    title: "Übergabeprotokoll",
    text: "Dokumentation, Fotos und klare Punkte für den Abschluss.",
    href: "/blog/wohnungsuebergabe-protokoll-guide",
    Icon: FileCheck2,
  },
  {
    title: "Halteverbotszone",
    text: "Park- und Zugangsthemen früh berücksichtigen.",
    href: "/halteverbotszone-regensburg",
    Icon: MapPin,
  },
  {
    title: "Seniorenumzug",
    text: "Ruhiger Ablauf mit mehr Begleitung und weniger Druck.",
    href: "/seniorenumzug",
    Icon: Home,
  },
  {
    title: "Rückfahrt / Beiladung",
    text: "Freie Kapazitäten nutzen, wenn Route und Termin passen.",
    href: "/beiladung",
    Icon: Route,
  },
  {
    title: "Schwertransport",
    text: "Klavier, Tresor oder sperrige Stücke separat prüfen lassen.",
    href: "/klaviertransport",
    Icon: PackageCheck,
  },
  {
    title: "Budget-Anfrage",
    text: "Preisrahmen offen nennen und realistisch prüfen lassen.",
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
    text: "Express, Budget, WhatsApp und Google Maps Einstieg sind Kontaktwege. So wählen Kunden schneller den passenden Start.",
  },
  {
    title: "Signature-Services",
    text: "Schlüssel, Protokoll, Halteverbotszone oder Beiladung lösen die Punkte, an denen Aufträge oft hängen bleiben.",
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
    q: "Ist Budget nennen eine eigene Leistung?",
    a: "Nein. Budget nennen ist ein Anfrageweg. Sie teilen Ihren Preisrahmen mit und FLOXANT prüft, welcher Umfang dafür realistisch ist.",
  },
  {
    q: "Welche Leistungen kann ich hier anfragen?",
    a: "Umzug, Reinigung und Entrümpelung sowie passende Signature-Services wie Schlüsselübergabe, Halteverbotszone, Seniorenumzug, Rückfahrt oder Schwertransport.",
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
    title: "FLOXANT Anfrage | Umzug, Reinigung & Entrümpelung starten",
    description:
      "FLOXANT Anfrage aus Regensburg: Umzug, Reinigung oder Entrümpelung wählen, Express-Check nutzen, Budget nennen oder direkt per WhatsApp starten.",
    keywords: [
      "FLOXANT Anfrage",
      "Umzug anfragen Regensburg",
      "Reinigung anfragen Regensburg",
      "Entrümpelung anfragen Regensburg",
      "Buchung Regensburg",
      "Express Check Umzug",
      "Budget Preisvorschlag",
      "Schlüsselübergabe",
      "Halteverbotszone Regensburg",
      "Beiladung Bayern",
    ],
  });
}

export default async function BuchungPage() {
  const dict = await getDictionary("de");

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
          "Klar priorisierter Anfragebereich für Umzug, Reinigung, Entrümpelung, Express-Check, Budgeteinschätzung und passende Signature-Services.",
        path: "/buchung",
        about: [
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Buchung",
          "Express-Check",
          "Budget-Anfrage",
          "Schlüsselübergabe",
          "Regensburg",
          "Bayern",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Anfrage- und Buchungszentrum",
        description:
          "Zentraler Einstieg für unverbindliche Anfragen, Einschätzung, Express-Check und Preisrahmen bei FLOXANT.",
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
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7fb_42%,#eef4f8_100%)] text-foreground">
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
                Anfrage starten
              </div>
              <h1 className="mt-6 max-w-[13ch] text-4xl font-bold leading-[0.98] tracking-[-0.025em] text-slate-950 md:text-6xl">
                Umzug, Reinigung und Entrümpelung. Klar organisiert aus Regensburg.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                Schnell anfragen, Aufwand realistisch einschätzen lassen und sauber Rückmeldung erhalten.
              </p>

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

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Leistung wählen",
                href: "#kernleistungen",
                text: "Wenn zuerst klar sein soll, ob Umzug, Reinigung oder Entrümpelung passt.",
              },
              {
                label: "Anfrageweg wählen",
                href: "#anfragewege",
                text: "Wenn Express, Budget oder WhatsApp der bessere Einstieg ist.",
              },
              {
                label: "Direkt ins Formular",
                href: "#buchungssystem",
                text: "Wenn der Fall grob klar ist und Sie direkt senden möchten.",
              },
              {
                label: "Vorher Orientierung",
                href: "/rechner",
                text: "Wenn Sie erst Aufwand, Zugang und Preisrahmen prüfen möchten.",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-[1.4rem] border border-slate-200 bg-white/88 px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>

          <CoreServicesGrid />
        </div>
      </section>

      <section id="anfragewege" className="px-4 pb-12 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_26px_90px_rgba(15,23,42,0.18)] md:rounded-[2.4rem] md:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="p-3 md:p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-200">
                Wie möchten Sie starten?
              </div>
              <h2 className="mt-3 max-w-[12ch] text-3xl font-bold leading-[1] tracking-[-0.02em] md:text-5xl">
                Ein Ziel. Vier saubere Wege.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Anfragewege sind bewusst getrennt von Leistungen. So sehen Sie sofort, ob normaler Start, Express, Budget oder WhatsApp passt.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {inquiryPaths.map((item) => (
                <DecisionPathCard key={item.title} item={item} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="signature-services" className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                Signature-Services
              </div>
              <h2 className="mt-3 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-5xl">
                Das macht FLOXANT besonderer als ein Standardauftrag.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-right">
              Diese Module lösen die typischen Schnittstellen: Schlüssel, Zugang, Übergabe, Rückfahrt, Sondertransport und Preisrahmen.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {signatureServices.map((item) => {
              const Icon = item.Icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[1.55rem] border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-950/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

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

      <section id="kontakt" className="px-4 pb-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div id="buchungssystem" className="relative -top-28 block h-0 w-0" />
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                <Clock3 className="h-4 w-4" />
                Anfrageformular
              </div>
              <h2 className="mt-3 max-w-[12ch] text-3xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
                Leistung wählen. Fall senden.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:text-right">
              Der Klick auf eine Kernleistung springt direkt hierher und wählt den passenden Service vor. Sie ergänzen nur noch Ort, Termin, Hinweise und Kontakt.
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
              />
            </div>
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
              Diese Inhalte helfen, Preisrahmen, Übergabe und kombinierte Leistungen besser
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
    </main>
  );
}

function QuickDecisionPanel() {
  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_26px_80px_rgba(15,23,42,0.2)] md:rounded-[2.6rem] md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 pt-2">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-200">
            Start wählen
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Wie starten?</h2>
        </div>
        <ShieldCheck className="h-6 w-6 text-cyan-200" />
      </div>
      <div className="grid gap-3">
        {inquiryPaths.map((item) => (
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
          Drei klare Startpunkte. Budget, Express und WhatsApp bleiben klar getrennte Anfragewege.
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
  item: (typeof inquiryPaths)[number];
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

  return item.href.startsWith("http") ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : item.href.startsWith("#") ? (
    <a href={item.href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}
