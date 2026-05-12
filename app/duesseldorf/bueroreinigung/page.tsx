import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock3,
  DoorOpen,
  FileText,
  Layers3,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  SquareStack,
  TimerReset,
  type LucideIcon,
} from "lucide-react";

import { DuesseldorfB2BCleaningForm } from "@/components/DuesseldorfB2BCleaningForm";
import {
  DUESSELDORF_CLEANING,
  buildDuesseldorfCleaningMetadata,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

const pagePath = "/duesseldorf/bueroreinigung";
const pageUrl = "https://www.floxant.de/duesseldorf/bueroreinigung";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: pagePath,
    title: "B2B-Reinigung Düsseldorf - Büros & kleine Unternehmen | FLOXANT",
    description:
      "Büroreinigung und B2B-Reinigung in Düsseldorf für kleine Unternehmen, Agenturen, Studios, Kanzleien und Gewerbeflächen: Fläche, Frequenz, Zeitfenster und Fotos senden.",
  });
}

const targetGroups = [
  {
    title: "Kleine Büros",
    text: "Regelmäßige Reinigung ohne überdimensionierten Großvertrag: Fläche, Frequenz, Zeitfenster und Umfang einfach senden.",
    cta: "Büroreinigung anfragen",
    Icon: Building2,
  },
  {
    title: "Agenturen & Studios",
    text: "Arbeitsräume, Meetingflächen und Pausenbereiche sauber halten, ohne den Betrieb mit schwerer Abstimmung zu blockieren.",
    cta: "Agentur/Studio prüfen",
    Icon: Sparkles,
  },
  {
    title: "Kanzleien",
    text: "Ruhige Zeitfenster, seriöser Eindruck und klare Zugangsklärung für kleinere Kanzlei- und Beratungsflächen.",
    cta: "Kanzlei-Reinigung anfragen",
    Icon: FileText,
  },
  {
    title: "Kleine Praxen nach Absprache",
    text: "Allgemeine Reinigung kleiner Praxisflächen nach Objektprüfung. Keine medizinische Spezialdesinfektion oder zertifizierte Hygienereinigung.",
    cta: "Praxisfläche anfragen",
    Icon: ShieldCheck,
  },
  {
    title: "Hausverwaltungen / Treppenhaus",
    text: "Treppenhäuser, Eingangsbereiche oder Gemeinschaftsflächen mit Frequenz, Zugang und Umfang nach Absprache einordnen.",
    cta: "Treppenhaus prüfen",
    Icon: DoorOpen,
  },
  {
    title: "Kleine Gewerbeflächen",
    text: "Laden, Studio, Büro oder Nebenfläche einmalig, regelmäßig oder als Grundreinigung prüfen lassen.",
    cta: "Gewerbefläche reinigen",
    Icon: SquareStack,
  },
] as const;

const serviceBlocks = [
  "Büroreinigung",
  "Unterhaltsreinigung nach Absprache",
  "Reinigung kleiner Gewerbeflächen",
  "Agentur-/Studio-Reinigung",
  "Kanzlei-Reinigung",
  "kleine Praxisflächen nach Absprache",
  "Treppenhausreinigung nach Absprache",
  "Grundreinigung nach Absprache",
  "Sanitärbereiche",
  "Küchen- und Pausenbereiche",
  "Böden und sichtbare Flächen",
  "regelmäßige Reinigung",
  "Fotoeinschätzung",
  "Budget-/Preisrahmen-Prüfung",
  "Entsorgung Düsseldorf als separater Zusatzlink",
] as const;

const objectChecks = [
  { label: "Büro", detail: "Arbeitsplätze, Besprechungsräume, Küche, Sanitär.", Icon: Building2 },
  { label: "Agentur / Studio", detail: "Kreativfläche, Kundenbereich, Pausenbereich.", Icon: Layers3 },
  { label: "Kanzlei", detail: "ruhige Zeitfenster, diskreter Zugang, Flächenumfang.", Icon: ClipboardList },
  { label: "Praxisfläche", detail: "nur allgemeine Reinigung nach Absprache.", Icon: ShieldCheck },
  { label: "Treppenhaus", detail: "Turnus, Zugang, Etagen und Gemeinschaftsflächen.", Icon: DoorOpen },
  { label: "Gewerbefläche", detail: "einmalig oder regelmäßig nach Objektprüfung.", Icon: SquareStack },
] as const;

const frequencyItems = [
  "einmalig",
  "wöchentlich",
  "zwei- bis dreimal pro Woche",
  "monatlich",
  "nach Bedarf",
  "noch unklar",
] as const;

const timeWindowItems = [
  "vor Arbeitsbeginn",
  "nach Feierabend",
  "am Wochenende",
  "während Öffnungszeiten nach Absprache",
  "flexibel",
  "noch unklar",
] as const;

const boundaryItems = [
  "keine medizinische Spezialdesinfektion",
  "keine Krankenhaus-, Labor- oder Reinraumreinigung",
  "keine Industrie- oder Gefahrstoffreinigung",
  "keine 24/7- oder feste Kapazitätsgarantie ohne Prüfung",
  "keine Umzüge in Düsseldorf",
] as const;

const faqItems = [
  {
    q: "Für welche Unternehmen ist die B2B-Reinigung gedacht?",
    a: "Für kleine Unternehmen, Büros, Agenturen, Studios, Kanzleien, Hausverwaltungen, Treppenhäuser und kleinere Gewerbeflächen in Düsseldorf. FLOXANT prüft Umfang, Fläche, Frequenz, Zeitfenster und Zugang nach Absprache.",
  },
  {
    q: "Reinigt FLOXANT Büros in Düsseldorf?",
    a: "Ja, Büroreinigung in Düsseldorf kann angefragt werden. Wichtig sind Objektart, Fläche, Anzahl der Räume, Sanitär- und Küchenbereiche, gewünschte Frequenz und ein realistisches Zeitfenster.",
  },
  {
    q: "Sind regelmäßige Reinigungen möglich?",
    a: "Regelmäßige Reinigung ist nach Absprache möglich. Feste Zeiten hängen von Objekt, Umfang, Zugang, Frequenz und verfügbarer Kapazität ab.",
  },
  {
    q: "Sind kleine Praxisflächen möglich?",
    a: "Ja, allgemeine Reinigung kleiner Praxisflächen kann nach Absprache geprüft werden. FLOXANT behauptet keine medizinische Spezialdesinfektion, keine Krankenhausreinigung und keine zertifizierte Hygienereinigung.",
  },
  {
    q: "Ist Treppenhausreinigung möglich?",
    a: "Treppenhausreinigung oder Reinigung kleiner Gemeinschaftsflächen kann nach Objektart, Zugang, Etagen, Turnus und Umfang geprüft werden.",
  },
  {
    q: "Welche Angaben braucht FLOXANT?",
    a: "Hilfreich sind Firma, Ansprechpartner, Objektort oder PLZ, Objektart, Fläche, Räume, Sanitärbereiche, gewünschte Reinigung, Frequenz, Zeitfenster, Fotos und Budgetrahmen.",
  },
  {
    q: "Gibt es feste Preise?",
    a: "Nein. Preise hängen von Fläche, Umfang, Frequenz, Zeitfenster, Zugang, Zustand und Leistung ab. Ein Budget hilft bei der Einordnung, ersetzt aber kein geprüftes Angebot.",
  },
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Diese Seite behandelt B2B-Reinigung für kleine Unternehmen und Gewerbeflächen in Düsseldorf.",
  },
  {
    q: "Kann Entsorgung ergänzt werden?",
    a: "Ja, wenn kleine Gegenstände, Möbel oder Material entfernt werden müssen, kann Entsorgung Düsseldorf als separater Zusatzweg nach Fotos und Umfang geprüft werden.",
  },
] as const;

function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "B2B-Reinigung Düsseldorf für kleine Unternehmen",
        description:
          "FLOXANT prüft B2B-Reinigung, Büroreinigung, Treppenhausreinigung und Gewerbeflächenreinigung in Düsseldorf nach Fläche, Frequenz, Zeitfenster und Zugang.",
        path: pagePath,
        about: [
          "B2B-Reinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Gewerbeflächenreinigung",
          "regelmäßige Reinigung",
          "Treppenhausreinigung Düsseldorf",
        ],
        potentialActions: [
          { name: "B2B-Reinigung anfragen", target: `${pagePath}#b2b-reinigung-form`, type: "ContactAction" },
        ],
      }),
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "B2B-Reinigung / Büroreinigung Düsseldorf nach Absprache",
        description:
          "B2B-Reinigung, Büroreinigung und Gewerbeflächenreinigung in Düsseldorf für kleine Unternehmen nach Prüfung von Fläche, Frequenz, Zeitfenster, Zugang und Umfang.",
        serviceType: "B2B-Reinigung / Büroreinigung / Gewerbeflächenreinigung Düsseldorf nach Absprache",
        url: pageUrl,
        areaServed: [{ "@type": "City", name: "Düsseldorf" }],
        provider: {
          "@type": "Organization",
          name: "FLOXANT",
          url: "https://www.floxant.de",
          telephone: DUESSELDORF_CLEANING.phoneRaw,
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: DUESSELDORF_CLEANING.phoneRaw,
            contactType: "customer service",
            areaServed: "Düsseldorf",
            availableLanguage: "de",
          },
        },
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "B2B-Reinigung Düsseldorf", item: pagePath },
      ]),
      buildFaqJsonLd([...faqItems]),
    ],
  };
}

export default function DuesseldorfBueroreinigungPage() {
  const whatsappHref = buildDuesseldorfCleaningWhatsAppHref(
    "Hallo FLOXANT, ich möchte eine B2B-Reinigung in Düsseldorf anfragen. Es geht um [Büro/Agentur/Studio/Kanzlei/Gewerbefläche]. Fläche, Frequenz, Zeitfenster und Fotos kann ich senden.",
  );
  const jsonLd = buildJsonLd();

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f5fbfb_0%,#ffffff_45%,#eef7f6_100%)] pb-28 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-16 lg:pt-14" data-event="view_duesseldorf_b2b_cleaning">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_80%_0%,rgba(20,184,166,0.2),transparent_55%),radial-gradient(circle_at_15%_18%,rgba(59,130,246,0.13),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-800 shadow-sm">
              <Building2 className="h-4 w-4" />
              FLOXANT Business-Cleaning OS Düsseldorf
            </div>
            <h1 className="mt-6 max-w-[13ch] text-[clamp(2.55rem,6vw,5.6rem)] font-black leading-[0.94] tracking-[-0.045em] text-slate-950">
              B2B-Reinigung Düsseldorf für kleine Unternehmen
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">
              Für Büros, Agenturen, Studios, Kanzleien und kleine Gewerbeflächen: FLOXANT prüft regelmäßige Reinigung, Grundreinigung und objektbezogene Reinigung in Düsseldorf nach Absprache.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#b2b-reinigung-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.2rem] bg-slate-950 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-900"
                data-event="start_b2b_cleaning_lead"
              >
                B2B-Reinigung anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                data-event="click_b2b_cleaning_whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                B2B-Reinigung per WhatsApp
              </a>
              <a
                href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.2rem] border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-200"
                data-event="click_b2b_cleaning_phone"
              >
                <Phone className="h-4 w-4" />
                Anrufen
              </a>
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-cyan-950/10 md:p-7">
            <div className="rounded-[1.6rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">Objekt-Flow</p>
                  <h2 className="mt-2 text-2xl font-black text-white">Objekt · Fläche · Frequenz · Zeitfenster · Angebot</h2>
                </div>
                <span className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">
                  nach Absprache
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-5">
                {["Objekt", "Fläche", "Frequenz", "Zugang", "Prüfung"].map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.12em] text-cyan-200">0{index + 1}</div>
                    <div className="mt-2 text-sm font-black text-white">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {["Büro", "Agentur", "Kanzlei", "Studio", "Treppenhaus", "Gewerbefläche"].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-900">
              Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Diese Seite behandelt B2B-Reinigung für kleine Unternehmen und Gewerbeflächen in Düsseldorf.
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-5">
            {["Objektart", "Fläche", "Frequenz", "Zeitfenster", "Fotos"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-950/5">
                <div className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-700">{item}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">vor Angebot sauber klären</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Zielgruppen</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Für kleine Unternehmen statt anonyme Großdienstleister
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Kleine Unternehmen brauchen oft keine überdimensionierte Konzernlösung, sondern einen klaren Anfrageprozess: Was ist das Objekt, wie groß ist die Fläche, wie oft soll gereinigt werden und wann passt es betrieblich?
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {targetGroups.map((item) => (
              <InfoCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 md:p-8">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Objekt-Check</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Welche Fläche soll gereinigt werden?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Der Objekt-Check sortiert die Anfrage nach Fläche, Räumen, Sanitärbereichen, Küche, Bodenart, Frequenz, Zeitfenster, Zugang und Fotos. Dadurch wird aus einer allgemeinen Reinigungsanfrage ein prüfbarer B2B-Fall.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {objectChecks.map((item) => (
                <MiniCheck key={item.label} item={item} />
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-cyan-200 bg-[linear-gradient(135deg,#0f172a_0%,#102a3a_56%,#0d9488_100%)] p-6 text-white shadow-xl shadow-cyan-950/20 md:p-8">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Frequenz & Zeitfenster</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              B2B-Reinigung entscheidet sich im Kalender
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <OptionPanel title="Wie oft?" items={frequencyItems} Icon={TimerReset} eventName="select_b2b_frequency" />
              <OptionPanel title="Wann passt es?" items={timeWindowItems} Icon={Clock3} eventName="select_b2b_time_window" />
            </div>
            <p className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-7 text-cyan-50">
              Feste Zeiten und regelmäßige Reinigungen sind abhängig von Objekt, Umfang, Zugang und Kapazität. FLOXANT prüft, was realistisch möglich ist.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Service-Bausteine</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Büroreinigung, Unterhaltsreinigung und Gewerbereinigung in Düsseldorf
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Der Fokus liegt auf allgemeiner Büroreinigung, Unterhaltsreinigung und Gewerbeflächenreinigung für kleine Unternehmen. FLOXANT prüft Fläche, Frequenz, Zeitfenster, Zugang und Budget. Spezialleistungen wie medizinische Desinfektion, Reinraum, Gefahrstoff oder 24/7-Zusage werden nicht behauptet.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/duesseldorf/reinigung" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-cyan-200">
                  Reinigung Düsseldorf
                </Link>
                <Link href="/duesseldorf/grundreinigung" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-cyan-200">
                  Grundreinigung Düsseldorf
                </Link>
                <Link href="/duesseldorf/treppenhausreinigung" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-cyan-200">
                  Treppenhausreinigung
                </Link>
                <Link href="/entsorgung-duesseldorf" className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-800 hover:bg-orange-100">
                  Entsorgung ergänzen
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <span className="text-sm font-bold leading-6 text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.94fr_1.06fr]">
          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Düsseldorf-Abgrenzung</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                Reinigung und Entsorgung. Keine Umzüge.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Diese Seite ist ausschließlich für B2B-Reinigung kleiner Unternehmen, Büros, Studios, Kanzleien, Treppenhäuser und Gewerbeflächen gedacht.
              </p>
            </div>
            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Was diese Seite nicht verspricht</div>
              <div className="mt-4 grid gap-2">
                {boundaryItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm leading-6 text-amber-950">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">WhatsApp-Schnellweg</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Senden Sie Objektart, Fläche, Frequenz, Zeitfenster und Fotos. Bitte keine Zugangscodes oder sensiblen Daten in die erste Nachricht schreiben.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-event="click_b2b_cleaning_whatsapp"
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-black text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                Büroreinigung Düsseldorf anfragen
              </a>
            </div>
          </aside>
          <DuesseldorfB2BCleaningForm />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Häufige Fragen zur B2B-Reinigung Düsseldorf
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Die Antworten spiegeln sichtbar wider, was FLOXANT anbietet und was bewusst nicht versprochen wird.
              </p>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-200 bg-cyan-50 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-900">Google Ads / GBP / Vertrieb</div>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Geeignet für kleine B2B-Reinigungsanfragen in Düsseldorf
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Keyword-Richtung: büroreinigung düsseldorf, b2b reinigung düsseldorf, gewerbereinigung düsseldorf, treppenhausreinigung düsseldorf. Negative Keywords: Jobs, Minijob, Reinigungskraft gesucht, Umzug, Transport.
              </p>
            </div>
            <a href="#b2b-reinigung-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white">
              Objekt prüfen lassen
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

function InfoCard({
  item,
}: {
  item: {
    title: string;
    text: string;
    cta: string;
    Icon: LucideIcon;
  };
}) {
  const Icon = item.Icon;
  return (
    <article className="rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/10">
      <Icon className="h-6 w-6 text-cyan-700" />
      <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
      <a href="#b2b-reinigung-form" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
        {item.cta}
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

function MiniCheck({
  item,
}: {
  item: {
    label: string;
    detail: string;
    Icon: LucideIcon;
  };
}) {
  const Icon = item.Icon;
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-cyan-700" />
      <div className="mt-3 text-sm font-black text-slate-950">{item.label}</div>
      <p className="mt-2 text-xs leading-5 text-slate-600">{item.detail}</p>
    </div>
  );
}

function OptionPanel({
  title,
  items,
  Icon,
  eventName,
}: {
  title: string;
  items: readonly string[];
  Icon: LucideIcon;
  eventName: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
      <div className="flex items-center gap-2 text-sm font-black text-white">
        <Icon className="h-5 w-5 text-cyan-200" />
        {title}
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <a key={item} href="#b2b-reinigung-form" data-event={eventName} className="rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-cyan-50 transition hover:bg-white/14">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
