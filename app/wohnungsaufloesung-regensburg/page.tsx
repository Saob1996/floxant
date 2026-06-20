import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Boxes,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileSearch,
  Home,
  KeyRound,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

import { LeadCta } from "@/components/LeadCta";
import { company } from "@/lib/company";
import { buildLeadHref } from "@/lib/lead-intents";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/wohnungsaufloesung-regensburg";
const title = "Wohnungsauflösung Regensburg | Räume, Freigabe und Übergabe klären";
const description =
  "Wohnungsauflösung Regensburg anfragen: Wohnung, Keller, Nachlass, Möbel, Fotos, Entsorgung, Endzustand und Übergabe ruhig vorbereiten.";

const leadHref = buildLeadHref({
  service: "wohnungsaufloesung",
  city: "regensburg",
  intent: "wohnungsaufloesung-regensburg",
  priority: "p2",
});

const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte eine Wohnungsauflösung in Regensburg anfragen.",
    "Wohnung/Haus, Etage, Räume, Keller, Fotos, Freigaben, Termin und gewünschter Endzustand:",
  ].join("\n"),
);

const heroFacts = [
  { label: "Objekt", value: "Wohnung, Haus, Keller oder Nebenräume" },
  { label: "Freigabe", value: "Was bleibt, was weg darf, wer entscheidet" },
  { label: "Ziel", value: "Räumen, entsorgen, reinigen, übergeben" },
] as const;

const neededDetails = [
  "Adresse oder Stadtteil in Regensburg mit Etage und Zugang",
  "Räume, Keller, Dachboden, Garage, Balkon oder Nebenflächen",
  "Fotos von Zimmern, Möbeln, Elektrogeräten und Laufwegen",
  "Was bleiben soll, was entsorgt werden darf und was unklar ist",
  "Ansprechpartner, Schlüsselweg, Freigabe und Übergabetermin",
  "Ob nach der Räumung eine Endreinigung mitgedacht werden soll",
] as const;

const carePoints = [
  {
    icon: KeyRound,
    title: "Freigaben sauber klären",
    text: "Bei Nachlass, Pflegeheim, Verkauf oder Mietende muss klar sein, wer entscheiden darf und welche Gegenstände nicht angerührt werden sollen.",
  },
  {
    icon: Camera,
    title: "Fotos statt Blindschätzung",
    text: "Gute Bilder von Räumen, Keller, Möbeln, Laufweg und Treppenhaus machen die erste Einschätzung deutlich belastbarer.",
  },
  {
    icon: Sparkles,
    title: "Endzustand festlegen",
    text: "Leer, besenrein, mit Endreinigung oder mit Übergabevorbereitung: Der gewünschte Zustand bestimmt den passenden Ablauf.",
  },
] as const;

const processSteps = [
  {
    title: "Situation beschreiben",
    text: "Sie senden Räume, Menge, Fotos, Zugang, Termin, Freigaben und den gewünschten Endzustand.",
  },
  {
    title: "Umfang einordnen",
    text: "FLOXANT trennt Räumung, Entsorgung, sensible Gegenstände, Laufwege und mögliche Reinigungsschritte.",
  },
  {
    title: "Nächsten Schritt abstimmen",
    text: "Danach folgt Rückfrage, Anfrageformular, WhatsApp-Abstimmung oder eine sachliche Angebotsprüfung.",
  },
] as const;

const localSignals = [
  "Altstadt, Stadtamhof und Ostenviertel: Zugang, Haltepunkt und enge Treppenhäuser vorab zeigen",
  "Kumpfmühl, Westenviertel und Prüfening: Wohnung, Keller, Garage und Laufweg getrennt beschreiben",
  "Lappersdorf, Neutraubling, Pentling oder Umland: Schlüsselweg, Termin und Strecke früh klären",
] as const;

const relatedLinks = [
  { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
  { href: "/nachlass-raeumung-regensburg", label: "Nachlassräumung Regensburg" },
  { href: "/regensburg/endreinigung", label: "Endreinigung nach Räumung" },
  { href: "/umzug-regensburg", label: "Umzug Regensburg" },
  { href: "/angebot-guenstiger-pruefen", label: "Räumungsangebot prüfen" },
] as const;

const faqItems = [
  {
    q: "Was braucht FLOXANT für eine Wohnungsauflösung in Regensburg?",
    a: "Hilfreich sind Adresse oder Stadtteil, Etage, Zugang, Räume, Nebenräume, Fotos, Menge, Freigaben, Terminwunsch und gewünschter Endzustand.",
  },
  {
    q: "Kann ich zuerst Fotos per WhatsApp senden?",
    a: "Ja. Fotos von Zimmern, Keller, Möbeln, Elektrogeräten, Treppenhaus und Laufwegen helfen, den Umfang ohne lange Erklärung besser einzuordnen.",
  },
  {
    q: "Ist Wohnungsauflösung dasselbe wie Entrümpelung?",
    a: "Nicht ganz. Entrümpelung beschreibt oft das Entfernen von Restmengen. Wohnungsauflösung umfasst zusätzlich Freigaben, Nachlass, Schlüsselweg, Endzustand und Übergabe.",
  },
  {
    q: "Kann eine Endreinigung nach der Räumung mitgedacht werden?",
    a: "Ja. Ob eine Reinigung sinnvoll ist, hängt vom Übergabetermin, Zustand nach der Räumung und den Anforderungen von Vermieter, Käufer oder Verwaltung ab.",
  },
  {
    q: "Gibt es sofort einen festen Preis?",
    a: "Seriös erst nach Eckdaten. Preis und Aufwand hängen von Menge, Etage, Laufweg, Entsorgung, Freigaben, Termin und gewünschtem Endzustand ab.",
  },
] as const;

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title,
  description,
  keywords: [
    "wohnungsauflösung regensburg",
    "haushaltsauflösung regensburg",
    "wohnung auflösen regensburg",
    "entrümpelung wohnung regensburg",
    "räumungsangebot prüfen",
  ],
});

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Wohnungsauflösung Regensburg",
          "Haushaltsauflösung",
          "Entrümpelung",
          "Nachlassräumung",
          "Übergabevorbereitung",
        ],
        potentialActions: [
          { name: "Wohnungsauflösung anfragen", target: leadHref, type: "ContactAction" },
          { name: "Fotos per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "Wohnungsauflösung Regensburg",
        description,
        path,
        serviceType: "Wohnungsauflösung, Haushaltsauflösung und Entrümpelung",
        areaServed: ["Regensburg", "Stadtamhof", "Kumpfmühl", "Prüfening", "Lappersdorf", "Neutraubling"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Entrümpelung", item: "/entruempelung" },
        { name: "Wohnungsauflösung", item: "/wohnungsaufloesung-bayern" },
        { name: "Regensburg", item: path },
      ]),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

function ClearanceVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_26px_70px_rgba(15,23,42,0.14)]">
      <div className="relative rounded-lg bg-slate-950 p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-amber-200">Räumungsbriefing</p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">Nicht einfach leer räumen.</h2>
          </div>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white text-slate-950">
            <Home className="h-8 w-8" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {heroFacts.map((item) => (
            <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
              <div className="text-[11px] font-black uppercase tracking-normal text-slate-300">{item.label}</div>
              <div className="mt-1 text-sm font-bold leading-6 text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
            <Boxes className="h-4 w-4" aria-hidden="true" />
            Räume und Menge
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
            Zimmer, Keller, Möbel, Geräte und Restmengen getrennt sichtbar machen.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
            Übergabeziel
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
            Räumung, Entsorgung und mögliche Reinigung vor dem Termin abstimmen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WohnungsaufloesungRegensburgPage() {
  return (
    <main className="overflow-hidden bg-[#f7f8fb] text-slate-950">
      <JsonLd />

      <section className="relative isolate px-5 pb-14 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#f8fafc_0%,#eef7f7_44%,#f4efe6_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(90deg,rgba(15,23,42,0.08),rgba(13,148,136,0.08),rgba(180,83,9,0.08))]" />

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">FLOXANT</Link>
            <span>/</span>
            <Link href="/entruempelung" className="hover:text-slate-950">Entrümpelung</Link>
            <span>/</span>
            <Link href="/wohnungsaufloesung-bayern" className="hover:text-slate-950">Wohnungsauflösung</Link>
            <span>/</span>
            <span className="text-slate-900">Regensburg</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.72fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(500px,0.72fr)]">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800 shadow-sm">
                <KeyRound className="h-4 w-4 text-teal-700" aria-hidden="true" />
                Wohnungsauflösung Regensburg
              </div>

              <h1 className="mt-6 max-w-[23rem] break-words text-3xl font-black leading-[1.05] tracking-normal text-slate-950 sm:max-w-4xl sm:text-5xl xl:text-6xl">
                Wohnungsauflösung in Regensburg ruhig klären und sauber übergeben.
              </h1>

              <p className="mt-6 max-w-[23rem] break-words text-base font-semibold leading-8 text-slate-700 sm:max-w-3xl sm:text-lg">
                Eine Wohnung aufzulösen ist oft mehr als Möbel entsorgen. FLOXANT klärt Räume,
                Keller, Nachlass, Fotos, Freigaben, Schlüsselweg, Entsorgung, Reinigung und
                Übergabetermin, bevor aus Unsicherheit ein Räumungsauftrag wird.
              </p>

              <div className="mt-7 flex max-w-[23rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-start">
                <LeadCta
                  service="wohnungsaufloesung"
                  city="regensburg"
                  intent="wohnungsaufloesung-regensburg"
                  priority="p2"
                  label="Wohnungsauflösung anfragen"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white shadow-[0_16px_40px_rgba(15,23,42,0.22)] transition hover:bg-teal-800 sm:w-auto"
                >
                  Wohnungsauflösung anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LeadCta>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="seo_cta_click"
                  data-service="wohnungsaufloesung"
                  data-city="regensburg"
                  data-page-intent="wohnungsaufloesung-regensburg"
                  data-priority="p2"
                  data-cta-label="Fotos per WhatsApp senden"
                  data-destination={whatsappHref}
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 text-sm font-black text-white shadow-[0_16px_40px_rgba(16,185,129,0.2)] transition hover:bg-emerald-600 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Fotos per WhatsApp senden
                </a>
                <Link
                  href="/angebot-guenstiger-pruefen"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-900 transition hover:border-teal-300 hover:text-teal-800 sm:w-auto"
                >
                  Räumungsangebot prüfen
                </Link>
              </div>

              <div className="mt-8 grid max-w-[23rem] gap-3 sm:max-w-none sm:grid-cols-3">
                {[
                  { icon: Camera, text: "Fotos von Räumen und Möbeln" },
                  { icon: KeyRound, text: "Freigaben und Schlüsselweg" },
                  { icon: Clock3, text: "Termin und Übergabeziel" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-lg border border-white bg-white/80 p-4 text-sm font-bold text-slate-700 shadow-sm">
                    <Icon className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <ClearanceVisual />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-teal-800">Worum es wirklich geht</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Erst Ordnung in die Entscheidung bringen, dann die Wohnung räumen.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Gute Wohnungsauflösung beginnt nicht mit einem schnellen Preis, sondern mit Klarheit:
              Welche Räume gehören dazu, was darf weg, was bleibt, wer gibt frei und wie soll die
              Wohnung am Ende übergeben werden?
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {carePoints.map(({ icon: Icon, title: itemTitle, text }) => (
              <article key={itemTitle} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-teal-800 shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{itemTitle}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-teal-800">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
              Angaben für die Einschätzung
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Diese Informationen sparen Rückfragen und Missverständnisse.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {neededDetails.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-amber-200">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Regensburg und Umgebung
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Lokal entscheidet oft der Zugang, nicht nur die Menge.
            </h2>
            <div className="mt-6 grid gap-3">
              {localSignals.map((item) => (
                <p key={item} className="rounded-lg border border-white/10 bg-white/[0.07] p-4 text-sm font-semibold leading-7 text-slate-100">
                  {item}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-teal-800">Ablauf</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Der Ablauf bleibt ruhig, auch wenn die Situation emotional ist.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-black text-teal-800">0{index + 1}</div>
                <h3 className="mt-3 text-2xl font-black tracking-normal text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f8fb] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-teal-800">Kosten und Angebot</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Ein Räumungsangebot wird erst fair, wenn Umfang und Endzustand klar sind.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Menge allein reicht nicht. Etage, Aufzug, Laufweg, Sperrmüll, Elektrogeräte,
              sensible Gegenstände, Freigaben, Entsorgung und Reinigung nach der Räumung verändern
              den Aufwand. Darum ist der Foto- und Freigabecheck der bessere Start.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: BadgeEuro, title: "Preisrahmen einordnen", text: "Budget oder vorhandenes Angebot kann mit Menge, Zugang und Endzustand sachlich geprüft werden." },
              { icon: FileSearch, title: "Angebot prüfen lassen", text: "Unklare Positionen, Zusatzkosten und Leistungsumfang werden besser verständlich." },
              { icon: Trash2, title: "Entsorgung trennen", text: "Möbel, Elektrogeräte, Restmengen und sensible Dinge sollten nicht in einen Topf geworfen werden." },
              { icon: ShieldCheck, title: "Keine falsche Sicherheit", text: "Bei unklarer Freigabe wird nicht einfach zugesagt. Erst klären, dann räumen." },
            ].map(({ icon: Icon, title: cardTitle, text }) => (
              <article key={cardTitle} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="h-6 w-6 text-teal-800" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{cardTitle}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-normal text-teal-800">Passende nächste Seiten</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Wenn die Wohnungsauflösung Teil eines größeren Falls ist.
              </h2>
            </div>
            <LeadCta
              service="wohnungsaufloesung"
              city="regensburg"
              intent="wohnungsaufloesung-regensburg"
              priority="p2"
              label="Fall schildern"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-teal-800"
            >
              Fall schildern
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LeadCta>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-800 transition hover:border-teal-300 hover:bg-teal-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-teal-200">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Häufige Fragen zur Wohnungsauflösung in Regensburg
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LeadCta
                service="wohnungsaufloesung"
                city="regensburg"
                intent="wohnungsaufloesung-regensburg"
                priority="p2"
                label="Wohnungsauflösung anfragen"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-teal-50"
              >
                Anfrage senden
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LeadCta>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </article>

          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-white/12 bg-white/[0.06] px-5 py-4">
                <summary className="cursor-pointer text-base font-black text-white">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
