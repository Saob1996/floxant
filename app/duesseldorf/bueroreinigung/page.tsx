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
  Languages,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  SquareStack,
  TimerReset,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { DuesseldorfB2BCleaningForm } from "@/components/DuesseldorfB2BCleaningForm";
import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_SNIPPET_ANSWERS,
  buildDuesseldorfCleaningMetadata,
  buildDuesseldorfCleaningProviderJsonLd,
  buildDuesseldorfServiceJsonLd,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";
import {
  getDuesseldorfCleaningInternationalAliases,
  type SearchIntentAliasLanguage,
} from "@/lib/search-intent-aliases";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

const pagePath = "/duesseldorf/bueroreinigung";

const internationalLanguageLabels: Record<SearchIntentAliasLanguage, string> = {
  en: "Englisch",
  ru: "Russisch",
  zh: "Chinesisch",
  ko: "Koreanisch",
};

const b2bInternationalSearchAliases = getDuesseldorfCleaningInternationalAliases();
const b2bSnippetAnswerItems = DUESSELDORF_CLEANING_SNIPPET_ANSWERS.slice(0, 4);

function htmlLangForAlias(language: SearchIntentAliasLanguage) {
  return language === "zh" ? "zh-Hans" : language;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: pagePath,
    title: "Büroreinigung Düsseldorf - Büro, Hotel & Firma | FLOXANT",
    description:
      "Büroreinigung, Hotelreinigung und Reinigung für Firmen in Düsseldorf: Fläche, Turnus, Zeitfenster und Fotos senden.",
  });
}

const targetGroups = [
  {
    title: "Kleine Büros",
    text: "Regelmäßige Reinigung ohne überdimensionierten Großvertrag: Fläche, Turnus, Zeitfenster und Umfang einfach senden.",
    cta: "Büroreinigung anfragen",
    Icon: Building2,
  },
  {
    title: "Hotels & Boardinghouses",
    text: "Lobby, Flure, Frühstücksbereiche, Sanitär und Gästebereiche nach Turnus, Belegung und Zeitfenster prüfen lassen.",
    cta: "Hotelreinigung anfragen",
    Icon: Workflow,
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
    text: "Treppenhäuser, Eingangsbereiche oder Gemeinschaftsflächen mit Turnus, Zugang und Umfang nach Absprache einordnen.",
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

const b2bDecisionCards = [
  {
    title: "Passt die Büroreinigung zu meinem Objekt?",
    text: "Ja, wenn es um Büro, Hotel, Kanzlei, Studio, kleine Praxisfläche, Treppenhaus oder Gewerbefläche in Düsseldorf geht.",
    href: "#b2b-reinigung-form",
    cta: "Objektangaben senden",
  },
  {
    title: "Welche Angaben sparen Rückfragen?",
    text: "Fläche, Räume, Sanitär, Küche, Turnus, Zeitfenster, Zugang, Fotos, Stadtteil und Ansprechpartner machen die erste Einschätzung schneller.",
    href: "#b2b-reinigung-form",
    cta: "Anfrage vorbereiten",
  },
  {
    title: "Was kostet Reinigung für Firmen in Düsseldorf?",
    text: "Ein Preisrahmen hängt von Fläche, Turnus, Zustand und Zeitfenster ab. Vorhandene Angebote oder Budgets können separat geprüft werden.",
    href: "/duesseldorf/vielleicht-guenstiger",
    cta: "Kosten einordnen",
  },
] as const;

const serviceBlocks = [
  "Büroreinigung",
  "Hotelreinigung nach Absprache",
  "Lobby, Flure und Frühstücksbereich",
  "Boardinghouse- und Apartmenthaus-Reinigung",
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
  { label: "Hotel", detail: "Lobby, Flure, Gästebereiche, Frühstücksbereich.", Icon: Workflow },
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
    q: "Für welche Unternehmen ist die Reinigung gedacht?",
    a: "Für kleine Unternehmen, Hotels, Boardinghouses, Büros, Agenturen, Studios, Kanzleien, Hausverwaltungen, Treppenhäuser und kleinere Gewerbeflächen in Düsseldorf. FLOXANT prüft Umfang, Fläche, Turnus, Zeitfenster und Zugang nach Absprache.",
  },
  {
    q: "Reinigt FLOXANT Büros in Düsseldorf?",
    a: "Ja, Büroreinigung in Düsseldorf kann angefragt werden. Wichtig sind Objektart, Fläche, Anzahl der Räume, Sanitär- und Küchenbereiche, gewünschter Turnus und ein realistisches Zeitfenster.",
  },
  {
    q: "Ist Hotelreinigung in Düsseldorf möglich?",
    a: "Ja, Hotelreinigung, Boardinghouse-Reinigung oder Apartmenthaus-Reinigung kann nach Objektprüfung angefragt werden. Wichtig sind Anzahl der Bereiche, Turnus, Belegung, Lobby, Flure, Sanitär, Frühstücksbereich, Zeitfenster und Fotos.",
  },
  {
    q: "Sind regelmäßige Reinigungen möglich?",
    a: "Regelmäßige Reinigung ist nach Absprache möglich. Feste Zeiten hängen von Objekt, Umfang, Zugang, Turnus und verfügbarer Kapazität ab.",
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
    a: "Hilfreich sind Firma, Ansprechpartner, Objektort oder PLZ, Objektart, Fläche, Räume, Sanitärbereiche, gewünschte Reinigung, Turnus, Zeitfenster, Fotos und Budgetrahmen.",
  },
  {
    q: "Gibt es feste Preise?",
    a: "Nein. Preise hängen von Fläche, Umfang, Turnus, Zeitfenster, Zugang, Zustand und Leistung ab. Ein Budget hilft bei der Einordnung, ersetzt aber kein geprüftes Angebot.",
  },
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Diese Seite behandelt Büroreinigung, Hotelreinigung und Firmenreinigung für Unternehmen und Gewerbeflächen in Düsseldorf.",
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
        name: "Büroreinigung Düsseldorf für kleine Unternehmen",
        description:
          "FLOXANT prüft Büroreinigung, Firmenreinigung, Hotelreinigung, Treppenhausreinigung und Gewerbeflächenreinigung in Düsseldorf nach Fläche, Turnus, Zeitfenster und Zugang.",
        path: pagePath,
        about: [
          "Firmenreinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Hotelreinigung Düsseldorf",
          "Hotel Reinigung Düsseldorf",
          "Gewerbeflächenreinigung",
          "regelmäßige Reinigung",
          "Treppenhausreinigung Düsseldorf",
        ],
        potentialActions: [
          { name: "Büroreinigung anfragen", target: `${pagePath}#b2b-reinigung-form`, type: "ContactAction" },
        ],
      }),
      buildDuesseldorfCleaningProviderJsonLd(),
      buildDuesseldorfServiceJsonLd({
        path: pagePath,
        name: "Büroreinigung / Firmenreinigung Düsseldorf nach Absprache",
        description:
          "Büroreinigung, Firmenreinigung, Hotelreinigung und Gewerbeflächenreinigung in Düsseldorf für kleine Unternehmen, Hotels und Objekte nach Prüfung von Fläche, Turnus, Zeitfenster, Zugang und Umfang.",
        serviceType: "Büroreinigung / Firmenreinigung / Hotelreinigung / Gewerbeflächenreinigung Düsseldorf nach Absprache",
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "Büroreinigung Düsseldorf", item: pagePath },
      ]),
    ],
  };
}

export default function DuesseldorfBueroreinigungPage() {
  const whatsappHref = buildDuesseldorfCleaningWhatsAppHref(
    "Hallo FLOXANT, ich möchte eine Büro- oder Firmenreinigung in Düsseldorf anfragen. Es geht um [Büro/Hotel/Boardinghouse/Agentur/Studio/Kanzlei/Gewerbefläche]. Fläche, Turnus, Zeitfenster und Fotos kann ich senden.",
  );
  const jsonLd = buildJsonLd();

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f5fbfb_0%,#ffffff_45%,#eef7f6_100%)] pb-28 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-16 lg:pt-14" data-event="view_duesseldorf_b2b_cleaning">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[linear-gradient(135deg,rgba(20,184,166,0.14),rgba(248,250,252,0.3)_42%,rgba(59,130,246,0.08))]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-cyan-200 bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-cyan-800 shadow-sm">
              <Building2 className="h-4 w-4" />
              FLOXANT Büroreinigung Düsseldorf
            </div>
            <h1 className="mt-6 max-w-[14ch] text-[clamp(2.55rem,6vw,5.6rem)] font-black leading-[0.94] tracking-normal text-slate-950">
              Reinigung für Büro, Hotel und Firma in Düsseldorf
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">
              Für Büros, Hotels, Boardinghouses, Agenturen, Studios, Kanzleien und kleine Gewerbeflächen: FLOXANT prüft regelmäßige Reinigung, Grundreinigung und objektbezogene Reinigung in Düsseldorf nach Absprache.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#b2b-reinigung-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-900"
                data-event="start_b2b_cleaning_lead"
              >
                Büroreinigung anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                data-event="click_b2b_cleaning_whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                Per WhatsApp anfragen
              </a>
              <a
                href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-200"
                data-event="click_b2b_cleaning_phone"
              >
                <Phone className="h-4 w-4" />
                Anrufen
              </a>
            </div>
          </div>

          <div className="rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-cyan-950/10 md:p-7">
            <div className="rounded-[0.95rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-normal text-cyan-300">Ablauf</p>
                  <h2 className="mt-2 text-2xl font-black text-white">Objekt · Fläche · Turnus · Zeitfenster · Angebot</h2>
                </div>
                <span className="rounded-[0.75rem] border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-normal text-cyan-100">
                  nach Absprache
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-5">
                {["Objekt", "Fläche", "Turnus", "Zugang", "Prüfung"].map((item, index) => (
                  <div key={item} className="rounded-[0.8rem] border border-white/10 bg-white/8 p-3">
                    <div className="text-[10px] font-black uppercase tracking-normal text-cyan-200">0{index + 1}</div>
                    <div className="mt-2 text-sm font-black text-white">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {["Büro", "Hotel", "Boardinghouse", "Kanzlei", "Studio", "Gewerbefläche"].map((item) => (
                <div key={item} className="rounded-[0.8rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[0.85rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-900">
              Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Diese Seite behandelt Büroreinigung, Hotelreinigung und Firmenreinigung in Düsseldorf.
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-5">
            {["Objektart", "Fläche", "Turnus", "Zeitfenster", "Fotos"].map((item) => (
              <div key={item} className="rounded-[0.85rem] border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-950/5">
                <div className="text-[11px] font-black uppercase tracking-normal text-cyan-700">{item}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">vor Angebot sauber klären</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="schnell-entscheiden" className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 md:p-8">
            <div className="text-xs font-black uppercase tracking-normal text-cyan-800">
              Vor dem Angebot
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Büroreinigung Düsseldorf schneller einschätzen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Wer nach Büroreinigung, Hotelreinigung oder Reinigung für Firmen in Düsseldorf sucht,
              braucht schnelle Orientierung: Passt das Objekt, welche Angaben werden gebraucht
              und wo lassen sich Kosten oder vorhandene Angebote prüfen?
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-3">
            {b2bDecisionCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-950/10"
                data-event="click_b2b_cleaning_decision"
                data-region="duesseldorf"
              >
                <CheckCircle2 className="h-5 w-5 text-cyan-700" />
                <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div id="international-verstaendlich" className="mx-auto mt-5 grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="rounded-[0.95rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-xl shadow-cyan-950/10 md:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
              <Languages className="h-4 w-4" />
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-normal text-cyan-100">
              International verständlich
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-white">
              Büroreinigung auch bei englischer, russischer, chinesischer oder koreanischer Suche finden
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Die Seite bleibt deutsch. Kurze Suchbegriffe helfen bei der Zuordnung, wenn
              Kunden in Düsseldorf nach Reinigung für Büro, Hotel oder Firma suchen.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {b2bInternationalSearchAliases.map((alias) => (
              <article key={alias.language} className="rounded-[0.9rem] border border-slate-200 bg-white p-4">
                <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
                  {internationalLanguageLabels[alias.language]}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {alias.terms.slice(0, 4).map((term) => (
                    <span
                      key={term}
                      lang={htmlLangForAlias(alias.language)}
                      className="rounded-[0.7rem] border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold leading-5 text-slate-800"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-5 grid max-w-7xl gap-3 md:grid-cols-4">
          {b2bSnippetAnswerItems.map((item, index) => (
            <Link
              key={item.query}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-950/10"
              data-event="click_b2b_cleaning_snippet_answer"
              data-region="duesseldorf"
            >
              <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
                Antwort {index + 1}
              </div>
              <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                Öffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Zielgruppen</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
              Für kleine Unternehmen statt anonyme Großdienstleister
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
                Kleine Unternehmen, Hotels und Objektbetreiber brauchen oft keine überdimensionierte Konzernlösung, sondern einen klaren Anfrageprozess: Was ist das Objekt, wie groß ist die Fläche, wie oft soll gereinigt werden und wann passt es betrieblich?
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
          <article className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 md:p-8">
            <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Objekt-Check</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Welche Fläche soll gereinigt werden?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Der Objekt-Check sortiert die Anfrage nach Fläche, Räumen, Sanitärbereichen, Küche, Bodenart, Turnus, Zeitfenster, Zugang und Fotos. Dadurch wird aus einer allgemeinen Reinigungsanfrage eine prüfbare Firmenanfrage.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {objectChecks.map((item) => (
                <MiniCheck key={item.label} item={item} />
              ))}
            </div>
          </article>

          <article className="rounded-[1rem] border border-cyan-200 bg-[linear-gradient(135deg,#0f172a_0%,#102a3a_56%,#0d9488_100%)] p-6 text-white shadow-xl shadow-cyan-950/20 md:p-8">
            <div className="text-xs font-black uppercase tracking-normal text-cyan-200">Turnus & Zeitfenster</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Reinigung für Firmen entscheidet sich im Kalender
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <OptionPanel title="Wie oft?" items={frequencyItems} Icon={TimerReset} eventName="select_b2b_frequency" />
              <OptionPanel title="Wann passt es?" items={timeWindowItems} Icon={Clock3} eventName="select_b2b_time_window" />
            </div>
            <p className="mt-6 rounded-[0.85rem] border border-white/10 bg-white/8 p-4 text-sm leading-7 text-cyan-50">
              Feste Zeiten und regelmäßige Reinigungen sind abhängig von Objekt, Umfang, Zugang und Kapazität. FLOXANT prüft, was realistisch möglich ist.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Service-Bausteine</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
                Büroreinigung, Unterhaltsreinigung und Gewerbereinigung in Düsseldorf
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Der Fokus liegt auf allgemeiner Büroreinigung, Hotelreinigung, Unterhaltsreinigung und Gewerbeflächenreinigung für kleine Unternehmen. FLOXANT prüft Fläche, Turnus, Zeitfenster, Zugang und Budget. Spezialleistungen wie medizinische Desinfektion, Reinraum, Gefahrstoff oder 24/7-Zusage werden nicht behauptet.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/duesseldorf/reinigung" className="rounded-[0.75rem] border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-cyan-200">
                  Reinigung Düsseldorf
                </Link>
                <Link href="/duesseldorf/grundreinigung" className="rounded-[0.75rem] border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-cyan-200">
                  Grundreinigung Düsseldorf
                </Link>
                <Link href="/duesseldorf/hotelreinigung" className="rounded-[0.75rem] border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 hover:bg-emerald-100">
                  Hotelreinigung Düsseldorf
                </Link>
                <Link href="/duesseldorf/treppenhausreinigung" className="rounded-[0.75rem] border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-cyan-200">
                  Treppenhausreinigung
                </Link>
                <Link href="/entsorgung-duesseldorf" className="rounded-[0.75rem] border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-800 hover:bg-orange-100">
                  Entsorgung ergänzen
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[0.85rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
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
            <div className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Düsseldorf-Abgrenzung</div>
              <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                Reinigung und Entsorgung. Keine Umzüge.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Diese Seite ist für Büroreinigung und Firmenreinigung kleiner Unternehmen, Hotels, Büros, Studios, Kanzleien, Treppenhäuser und Gewerbeflächen gedacht.
              </p>
            </div>
            <div className="rounded-[1rem] border border-amber-200 bg-amber-50 p-6">
              <div className="text-xs font-black uppercase tracking-normal text-amber-800">Was diese Seite nicht verspricht</div>
              <div className="mt-4 grid gap-2">
                {boundaryItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm leading-6 text-amber-950">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">WhatsApp-Schnellweg</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Senden Sie Objektart, Fläche, Turnus, Zeitfenster und Fotos. Bitte keine Zugangscodes oder sensiblen Daten in die erste Nachricht schreiben.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-event="click_b2b_cleaning_whatsapp"
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-emerald-500 px-5 text-sm font-black text-slate-950"
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
        <div className="mx-auto max-w-7xl rounded-[1rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                Häufige Fragen zur Büroreinigung Düsseldorf
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Die Antworten spiegeln sichtbar wider, was FLOXANT anbietet und was bewusst nicht versprochen wird.
              </p>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-[0.85rem] border border-slate-200 bg-slate-50 p-5">
                  <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[0.9rem] border border-cyan-200 bg-cyan-50 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-normal text-cyan-900">Schnelle Entscheidung</div>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Geeignet, wenn Büro, Hotel oder Firma klar geprüft werden soll
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Senden Sie Objektart, Fläche, Turnus, Zeitfenster, Fotos und einen Ansprechpartner.
                FLOXANT ordnet die Büro- oder Firmenreinigung in Düsseldorf ein, ohne Jobsuche,
                Umzug oder Transport mit der Anfrage zu vermischen.
              </p>
            </div>
            <a href="#b2b-reinigung-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-5 text-sm font-black text-white">
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
    <article className="rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/10">
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
    <div className="rounded-[0.85rem] border border-slate-200 bg-slate-50 p-4">
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
    <div className="rounded-[0.95rem] border border-white/10 bg-white/8 p-5">
      <div className="flex items-center gap-2 text-sm font-black text-white">
        <Icon className="h-5 w-5 text-cyan-200" />
        {title}
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <a key={item} href="#b2b-reinigung-form" data-event={eventName} className="rounded-[0.75rem] border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-cyan-50 transition hover:bg-white/14">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
