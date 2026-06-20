import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Boxes,
  Building2,
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
  Route,
  ShieldCheck,
  Sparkles,
  Truck,
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

const path = "/umzug-regensburg";
const title = "Umzug Regensburg | Start, Ziel, Volumen und Termin klären";
const description =
  "Umzug Regensburg anfragen: Start, Ziel, Etage, Aufzug, Möbelmenge, Fotos, Termin, Reinigung, Entrümpelung und Übergabe sauber vorbereiten.";

const leadHref = buildLeadHref({
  service: "umzug",
  city: "regensburg",
  intent: "umzug-regensburg",
  priority: "p1",
});

const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte einen Umzug in Regensburg anfragen.",
    "Start/Ziel, Etage, Aufzug, Möbelmenge, Fotos, Termin und mögliche Zusatzleistungen:",
  ].join("\n"),
);

const heroFacts = [
  { label: "Strecke", value: "Start, Ziel, Etage, Aufzug, Laufweg" },
  { label: "Umfang", value: "Möbel, Kartons, Einzelstücke, Fotos" },
  { label: "Extras", value: "Abbau, Packhilfe, Reinigung, Entsorgung" },
] as const;

const neededDetails = [
  "Start- und Zieladresse mit Etage, Aufzug und Laufweg",
  "Grobe Möbelmenge, Kartons und große Einzelstücke",
  "Fotos von Treppenhaus, Hauseingang, Aufzug und Engstellen",
  "Terminwunsch, Zeitfenster und gewünschte Dringlichkeit",
  "Abbau, Packhilfe, Tragehilfe oder Beiladung separat nennen",
  "Ob Reinigung, Entrümpelung oder Übergabe nach dem Umzug dazugehört",
] as const;

const carePoints = [
  {
    icon: Route,
    title: "Start und Ziel realistisch prüfen",
    text: "Etage, Aufzug, Laufweg, Haltemöglichkeit und Engstellen entscheiden oft stärker als die reine Entfernung innerhalb Regensburgs.",
  },
  {
    icon: Boxes,
    title: "Volumen sichtbar machen",
    text: "Eine grobe Liste plus Fotos von Möbeln, Kartons und großen Einzelstücken macht die Rückmeldung deutlich verlässlicher.",
  },
  {
    icon: KeyRound,
    title: "Übergabe gleich mitdenken",
    text: "Restmengen, Endreinigung, Schlüsselweg und Vermietertermin sollten früh genannt werden, wenn sie zum Umzug gehören.",
  },
] as const;

const processSteps = [
  {
    title: "Eckdaten senden",
    text: "Sie nennen Start, Ziel, Etagen, Aufzug, Möbelmenge, Fotos, Termin und gewünschte Zusatzleistungen.",
  },
  {
    title: "Machbarkeit einordnen",
    text: "FLOXANT trennt Transport, Abbau, Packhilfe, Beiladung, Reinigung, Entrümpelung und Übergabe sauber voneinander.",
  },
  {
    title: "Nächsten Schritt klären",
    text: "Je nach Lage folgt Rückfrage, Anfrageformular, WhatsApp-Abstimmung oder eine sachliche Angebotsprüfung.",
  },
] as const;

const localSignals = [
  "Altstadt und Stadtamhof: enge Straßen, Haltepunkte und Treppenhäuser vorab mit Fotos zeigen",
  "Kumpfmühl, Westenviertel und Prüfening: Etage, Aufzug, Innenhof und Laufweg genau beschreiben",
  "Neutraubling, Lappersdorf, Pentling oder Umland: Strecke, Zeitfenster und Zieladresse früh klären",
] as const;

const relatedLinks = [
  { href: "/umzugsunternehmen-regensburg", label: "Umzugsunternehmen Regensburg" },
  { href: "/umzug-reinigung-regensburg", label: "Umzug mit Reinigung" },
  { href: "/entruempelung-regensburg", label: "Entrümpelung vor dem Umzug" },
  { href: "/beiladung-regensburg", label: "Beiladung Regensburg" },
  { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
] as const;

const faqItems = [
  {
    q: "Welche Angaben braucht FLOXANT für einen Umzug in Regensburg?",
    a: "Wichtig sind Start, Ziel, Etage, Aufzug, Laufweg, Möbelmenge, Kartons, große Einzelstücke, Fotos, Terminwunsch und gewünschte Zusatzleistungen.",
  },
  {
    q: "Kann ich Fotos per WhatsApp senden?",
    a: "Ja. Fotos von Treppenhaus, Hauseingang, Aufzug, Möbeln, Kartons und Engstellen helfen, den Aufwand schneller und realistischer einzuordnen.",
  },
  {
    q: "Kann Reinigung oder Entrümpelung mit dem Umzug kombiniert werden?",
    a: "Ja, wenn Umfang und Termin zusammenpassen. Restmengen, Endreinigung, Schlüsselweg und Übergabetermin sollten dafür früh genannt werden.",
  },
  {
    q: "Gibt es sofort einen festen Preis?",
    a: "Seriös erst nach Eckdaten. Aufwand und Preis hängen von Volumen, Etage, Zugang, Strecke, Termin, Zusatzleistungen und möglichen Engstellen ab.",
  },
  {
    q: "Hilft FLOXANT auch bei kurzfristigem Umzug?",
    a: "Kurzfristige Fälle werden nach Machbarkeit eingeordnet. Je klarer Fotos, Prioritäten, Umfang und Zeitfenster sind, desto schneller ist eine Rückmeldung möglich.",
  },
] as const;

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title,
  description,
  keywords: [
    "umzug regensburg",
    "umzugsunternehmen regensburg",
    "umzugsfirma regensburg",
    "umzugsservice regensburg",
    "umzugsangebot prüfen",
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
          "Umzug Regensburg",
          "Umzugsunternehmen Regensburg",
          "Umzugsservice",
          "Beiladung",
          "Umzug mit Reinigung",
        ],
        potentialActions: [
          { name: "Umzug Regensburg anfragen", target: leadHref, type: "ContactAction" },
          { name: "Fotos per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "Umzug Regensburg",
        description,
        path,
        serviceType: "Umzug, Möbeltransport und Umzugsservice",
        areaServed: ["Regensburg", "Stadtamhof", "Kumpfmühl", "Prüfening", "Lappersdorf", "Neutraubling"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Umzug", item: "/umzug" },
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

function MoveBriefingVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_26px_70px_rgba(15,23,42,0.14)]">
      <div className="relative rounded-lg bg-slate-950 p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-cyan-200">Umzugsbriefing</p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">Nicht nach Bauchgefühl planen.</h2>
          </div>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white text-slate-950">
            <Truck className="h-8 w-8" aria-hidden="true" />
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
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Zugang
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
            Etagen, Aufzug, Treppenhaus, Innenhof und Haltepunkt vorab klären.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
            Umfang
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
            Möbel, Kartons, Abbau, Packhilfe und Restmengen getrennt nennen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UmzugRegensburgPage() {
  return (
    <main className="overflow-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd />

      <section className="relative isolate px-5 pb-14 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#f8fafc_0%,#edf6ff_45%,#f4efe6_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(90deg,rgba(15,23,42,0.08),rgba(14,116,144,0.08),rgba(180,83,9,0.08))]" />

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">FLOXANT</Link>
            <span>/</span>
            <Link href="/umzug" className="hover:text-slate-950">Umzug</Link>
            <span>/</span>
            <span className="text-slate-900">Regensburg</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(420px,0.72fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(500px,0.72fr)]">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800 shadow-sm">
                <Truck className="h-4 w-4 text-cyan-700" aria-hidden="true" />
                Umzug Regensburg
              </div>

              <h1 className="mt-6 max-w-[23rem] break-words text-3xl font-black leading-[1.05] tracking-normal text-slate-950 sm:max-w-4xl sm:text-5xl xl:text-6xl">
                Umzug in Regensburg klar planen statt hektisch improvisieren.
              </h1>

              <p className="mt-6 max-w-[23rem] break-words text-base font-semibold leading-8 text-slate-700 sm:max-w-3xl sm:text-lg">
                FLOXANT klärt Start, Ziel, Etage, Aufzug, Laufweg, Möbelmenge, Fotos und Termin.
                Wenn Reinigung, Entrümpelung, Beiladung oder Übergabe dazugehören, wird das getrennt
                eingeordnet und nicht in eine unklare Pauschale gepackt.
              </p>

              <div className="mt-7 flex max-w-[23rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-start">
                <LeadCta
                  service="umzug"
                  city="regensburg"
                  intent="umzug-regensburg"
                  priority="p1"
                  label="Umzug direkt anfragen"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white shadow-[0_16px_40px_rgba(15,23,42,0.22)] transition hover:bg-cyan-800 sm:w-auto"
                >
                  Umzug direkt anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LeadCta>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="seo_cta_click"
                  data-service="umzug"
                  data-city="regensburg"
                  data-page-intent="umzug-regensburg"
                  data-priority="p1"
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
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-900 transition hover:border-cyan-300 hover:text-cyan-800 sm:w-auto"
                >
                  Umzugsangebot prüfen
                </Link>
              </div>

              <div className="mt-8 grid max-w-[23rem] gap-3 sm:max-w-none sm:grid-cols-3">
                {[
                  { icon: MapPin, text: "Start, Ziel und Haltepunkt" },
                  { icon: Camera, text: "Fotos von Zugang und Möbeln" },
                  { icon: Clock3, text: "Termin und Zeitfenster" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-lg border border-white bg-white/80 p-4 text-sm font-bold text-slate-700 shadow-sm">
                    <Icon className="h-5 w-5 shrink-0 text-cyan-700" aria-hidden="true" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <MoveBriefingVisual />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Worum es wirklich geht</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Gute Umzugsplanung beginnt mit den Engstellen, nicht mit Werbesätzen.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Ein Regensburger Umzug wird planbar, wenn Volumen, Zugang, Termin und Zusatzleistungen
              klar sind. So entsteht eine Rückmeldung, die zu Ihrer Situation passt und nicht nur zu
              einem Suchbegriff.
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {carePoints.map(({ icon: Icon, title: itemTitle, text }) => (
              <article key={itemTitle} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-cyan-800 shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{itemTitle}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fb] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
              Angaben für die Einschätzung
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Diese Informationen machen die Rückmeldung schneller und ehrlicher.
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
              Lokal zählen Haltepunkt, Etage und Laufweg.
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
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Ablauf</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Drei Schritte vom Umzugswunsch zur klaren Rückmeldung.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-black text-cyan-800">0{index + 1}</div>
                <h3 className="mt-3 text-2xl font-black tracking-normal text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f6f8fb] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Kosten und Angebot</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Ein gutes Umzugsangebot braucht mehr als Kilometer und Datum.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Volumen, Etage, Aufzug, Laufweg, Abbau, Packhilfe, Haltemöglichkeit, Termin und
              Zusatzleistungen verändern den Aufwand. Deshalb ist eine kurze, klare Anfrage besser
              als ein schneller Blindpreis.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: BadgeEuro, title: "Preisrahmen einordnen", text: "Budget oder vorhandenes Angebot kann mit Volumen, Strecke und Zugang sachlich geprüft werden." },
              { icon: FileSearch, title: "Umzugsangebot prüfen", text: "Unklare Positionen, Zusatzkosten und Leistungsumfang werden verständlicher." },
              { icon: Sparkles, title: "Reinigung mitdenken", text: "Wenn die alte Wohnung sauber übergeben werden soll, gehört das früh in die Anfrage." },
              { icon: ShieldCheck, title: "Keine falsche Zusage", text: "Ohne Zugang, Fotos und Volumen wird kein komplizierter Umzug schön geredet." },
            ].map(({ icon: Icon, title: cardTitle, text }) => (
              <article key={cardTitle} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="h-6 w-6 text-cyan-800" aria-hidden="true" />
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
              <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Passende nächste Seiten</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Wenn der Umzug mehr als reiner Transport ist.
              </h2>
            </div>
            <LeadCta
              service="umzug"
              city="regensburg"
              intent="umzug-regensburg"
              priority="p1"
              label="Umzug schildern"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-cyan-800"
            >
              Umzug schildern
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LeadCta>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-800 transition hover:border-cyan-300 hover:bg-cyan-50"
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
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Häufige Fragen zum Umzug in Regensburg
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LeadCta
                service="umzug"
                city="regensburg"
                intent="umzug-regensburg"
                priority="p1"
                label="Umzug anfragen"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
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
