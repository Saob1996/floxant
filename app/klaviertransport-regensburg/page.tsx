import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  DoorOpen,
  FileSearch,
  KeyboardMusic,
  MapPin,
  MessageCircle,
  Piano,
  Route,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { LeadCta } from "@/components/LeadCta";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { TrustProofPanel } from "@/components/TrustProofPanel";
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

const path = "/klaviertransport-regensburg";
const title = "Klaviertransport Regensburg | Etage und Zugang prüfen";
const description =
  "Klaviertransport Regensburg anfragen: Klavier, E-Piano oder Flügel mit Etage, Treppenhaus, Aufzug, Laufweg, Haltepunkt, Fotos und Termin prüfen.";

const leadHref = buildLeadHref({
  service: "klaviertransport",
  city: "regensburg",
  intent: "klaviertransport-regensburg",
  priority: "p0",
});

const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte einen Klaviertransport in Regensburg anfragen.",
    "Instrument, Start/Ziel, Etage, Treppenhaus, Aufzug, Fotos und Termin:",
  ].join("\n"),
);

const heroFacts = [
  { label: "Instrument", value: "Klavier, E-Piano oder Flügel" },
  { label: "Zugang", value: "Etage, Treppe, Aufzug, Türen" },
  { label: "Planung", value: "Fotos, Strecke, Termin, Rückfrage" },
] as const;

const neededDetails = [
  "Instrumenttyp, Bauform und ungefähre Maße, falls bekannt",
  "Start- und Zieladresse mit Etage",
  "Aufzug vorhanden: ja/nein und grobe Größe",
  "Fotos von Instrument, Eingang, Treppe und Zielraum",
  "Laufweg, Haltemöglichkeit, Türen, Kurven und enge Stellen",
  "Terminwunsch und Zeitfenster",
] as const;

const carePoints = [
  {
    icon: Piano,
    title: "Instrument zuerst einordnen",
    text: "Ein Klavier, E-Piano oder Flügel wird nicht wie ein normales Möbelstück behandelt. Entscheidend sind Bauform, Gewicht, Empfindlichkeit und Zugang.",
  },
  {
    icon: DoorOpen,
    title: "Treppenhaus realistisch prüfen",
    text: "Kurven, Absätze, Türbreiten, Geländer, Aufzug und Bodenbeläge müssen vorab sichtbar sein. Fotos sparen Rückfragen und Fehlannahmen.",
  },
  {
    icon: Route,
    title: "Strecke und Haltepunkt klären",
    text: "Start, Ziel, Laufweg und Park- oder Haltemöglichkeit in Regensburg entscheiden, wie der nächste Schritt sinnvoll geplant wird.",
  },
] as const;

const processSteps = [
  {
    title: "Eckdaten senden",
    text: "Sie senden Instrument, Start, Ziel, Etagen, Zugang, Fotos und Terminwunsch.",
  },
  {
    title: "Machbarkeit prüfen",
    text: "FLOXANT ordnet Zugang, Laufweg, Strecke und offene Risiken ein, bevor etwas zugesagt wird.",
  },
  {
    title: "Nächsten Schritt abstimmen",
    text: "Je nach Fall folgt Rückfrage, Angebotseinordnung, WhatsApp-Abstimmung oder Anfrageformular.",
  },
] as const;

const localSignals = [
  "Regensburger Altstadt und Stadtamhof: oft enge Zugänge und kurze Haltepunkte",
  "Kumpfmühl, Prüfening, Westenviertel, Reinhausen oder Galgenberg: Etagen, Innenhöfe und Laufwege vorab beschreiben",
  "Neutraubling, Lappersdorf, Pentling, Obertraubling oder Umland: Strecke, Zieladresse und Haltemöglichkeit sauber angeben",
  "Weiter entfernte Start- oder Zielorte gehören in die Angebotsprüfung, wenn Strecke, Rückfahrt oder Kombination den Transport realistisch machen",
] as const;

const faqItems = [
  {
    q: "Was braucht FLOXANT für einen Klaviertransport in Regensburg?",
    a: "Hilfreich sind Instrumenttyp, Start- und Zieladresse, Etagen, Aufzug, Fotos von Instrument und Zugängen, Laufweg, Haltemöglichkeit und Terminwunsch.",
  },
  {
    q: "Kann ich zuerst Fotos per WhatsApp senden?",
    a: "Ja. Fotos von Klavier, Eingang, Treppenhaus, Türrahmen, Aufzug und Zielraum helfen, den Fall schneller einzuordnen.",
  },
  {
    q: "Gibt es sofort einen festen Preis?",
    a: "Nicht seriös ohne Eckdaten. Der Aufwand hängt stark von Instrument, Gewicht, Etage, Treppenhaus, Laufweg, Strecke und Termin ab.",
  },
  {
    q: "Transportiert FLOXANT auch Flügel?",
    a: "Flügel werden besonders vorsichtig geprüft. Je nach Zugang, Gewicht, Strecke und Situation kann eine Rückfrage oder Spezialabstimmung nötig sein.",
  },
  {
    q: "Ist Klaviertransport mit Umzug kombinierbar?",
    a: "Ja, wenn Umfang, Termin und Zugang zusammenpassen. Dafür sind Fotos und eine klare Beschreibung des Gesamtumzugs wichtig.",
  },
] as const;

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title,
  description,
  keywords: [
    "klaviertransport regensburg",
    "klavier transportieren regensburg",
    "pianotransport regensburg",
    "klaviertransport mit treppe regensburg",
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
          "Klaviertransport Regensburg",
          "Pianotransport",
          "Transport mit Etage und Treppenhaus",
          "Regensburg",
        ],
        potentialActions: [
          { name: "Klaviertransport anfragen", target: leadHref, type: "ContactAction" },
          { name: "Fotos per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "Klaviertransport Regensburg",
        description,
        path,
        serviceType: "Klaviertransport und Pianotransport",
        areaServed: ["Regensburg", "Stadtamhof", "Kumpfmühl", "Prüfening", "Lappersdorf", "Neutraubling"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Umzug", item: "/umzug" },
        { name: "Klaviertransport", item: "/klaviertransport" },
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

function PianoTransportVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_26px_70px_rgba(15,23,42,0.14)]">
      <div className="absolute right-0 top-0 h-32 w-32 bg-amber-200/30 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-36 w-36 bg-cyan-200/30 blur-3xl" aria-hidden="true" />

      <div className="relative rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-cyan-200">Transportbriefing</p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">Klavier nicht blind planen.</h2>
          </div>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white text-slate-950">
            <Piano className="h-8 w-8" aria-hidden="true" />
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

      <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
            <Ruler className="h-4 w-4" aria-hidden="true" />
            Zugangscheck
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">Treppen, Türen, Aufzug und Laufweg vorab sichtbar machen.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Saubere Zusage
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">Erst prüfen, dann Termin, Aufwand und nächsten Schritt abstimmen.</p>
        </div>
      </div>
    </div>
  );
}

export default function KlaviertransportRegensburgPage() {
  return (
    <main className="overflow-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd />

      <section className="relative isolate px-5 pb-14 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#f8fafc_0%,#eef6ff_44%,#f7efe2_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(90deg,rgba(15,23,42,0.08),rgba(14,116,144,0.08),rgba(180,83,9,0.08))]" />

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">FLOXANT</Link>
            <span>/</span>
            <Link href="/umzug" className="hover:text-slate-950">Umzug</Link>
            <span>/</span>
            <Link href="/klaviertransport" className="hover:text-slate-950">Klaviertransport</Link>
            <span>/</span>
            <span className="text-slate-900">Regensburg</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.72fr)] lg:items-center xl:grid-cols-[minmax(0,0.98fr)_minmax(500px,0.72fr)]">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800 shadow-sm">
                <KeyboardMusic className="h-4 w-4 text-cyan-700" aria-hidden="true" />
                Klaviertransport Regensburg
              </div>

              <h1 className="mt-6 max-w-[22rem] break-words text-3xl font-black leading-[1.05] tracking-normal text-slate-950 sm:max-w-4xl sm:text-5xl xl:text-6xl">
                Klaviertransport in Regensburg ruhig vorbereiten statt riskant improvisieren.
              </h1>

              <p className="mt-6 max-w-[22rem] break-words text-base font-semibold leading-8 text-slate-700 sm:max-w-3xl sm:text-lg">
                Ein Klavier ist kein normales Möbelstück. FLOXANT klärt zuerst Instrument, Etage,
                Treppenhaus, Aufzug, Laufweg, Haltemöglichkeit und Termin. So wird aus einer
                unsicheren Anfrage ein sauber einschätzbarer Transportfall.
              </p>

              <div className="mt-7 flex max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-start">
                <LeadCta
                  service="klaviertransport"
                  city="regensburg"
                  intent="klaviertransport-regensburg"
                  priority="p0"
                  label="Klaviertransport anfragen"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white shadow-[0_16px_40px_rgba(15,23,42,0.22)] transition hover:bg-cyan-800 sm:w-auto"
                >
                  Klaviertransport anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LeadCta>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="seo_cta_click"
                  data-service="klaviertransport"
                  data-city="regensburg"
                  data-page-intent="klaviertransport-regensburg"
                  data-priority="p0"
                  data-cta-label="Fotos per WhatsApp senden"
                  data-destination={whatsappHref}
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 text-sm font-black text-white shadow-[0_16px_40px_rgba(16,185,129,0.2)] transition hover:bg-emerald-600 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Fotos per WhatsApp senden
                </a>
                <Link
                  href="/angebot-vergleichen-regensburg"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-900 transition hover:border-cyan-300 hover:text-cyan-800 sm:w-auto"
                >
                  Transportangebot vergleichen
                </Link>
              </div>

              <div className="mt-8 grid max-w-[22rem] gap-3 sm:max-w-none sm:grid-cols-3">
                {[
                  { icon: Camera, text: "Fotos von Zugang und Instrument" },
                  { icon: Clock3, text: "Terminwunsch und Zeitfenster" },
                  { icon: Truck, text: "Start, Ziel und Haltepunkt" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-lg border border-white bg-white/80 p-4 text-sm font-bold text-slate-700 shadow-sm">
                    <Icon className="h-5 w-5 shrink-0 text-cyan-700" aria-hidden="true" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <PianoTransportVisual />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Worum es wirklich geht</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Die wichtigen Fragen kommen vor dem Preis.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Kunden brauchen keine langen Werbetexte. Sie brauchen eine klare Antwort, ob ihr
              Klaviertransport in Regensburg mit dem vorhandenen Zugang, Termin und Laufweg sinnvoll
              planbar ist. Genau dafür ist diese Anfrage gedacht.
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
              Diese Informationen machen die Rückmeldung belastbarer.
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
              Lokal zählt der Zugang, nicht nur die Strecke.
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
              Drei Schritte, damit aus Unsicherheit ein klarer Plan wird.
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
              Ein seriöser Preis braucht zuerst einen seriösen Fallcheck.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Beim Klaviertransport hängt der Aufwand nicht nur von Kilometern ab. Treppenhaus,
              Aufzug, Türbreiten, Laufweg, Gewicht, Schutzbedarf und Termin entscheiden mit. Deshalb
              ist ein kurzer Foto- und Zugangsscheck besser als ein schneller Blindpreis.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: BadgeEuro, title: "Preisrahmen einordnen", text: "Wenn Sie bereits ein Budget oder Angebot haben, kann FLOXANT die Eckdaten dazu sachlich prüfen." },
              { icon: FileSearch, title: "Transportangebot prüfen", text: "Vorhandene Angebote lassen sich besser verstehen, wenn Leistung, Zugang und Termin klar sind." },
              { icon: ShieldCheck, title: "Keine falsche Sicherheit", text: "Ohne Fotos und Zugangsdaten wird kein schwieriger Klaviertransport schön geredet." },
              { icon: Camera, title: "Fotos helfen sofort", text: "Ein paar gute Bilder sagen mehr als lange Beschreibungen und verkürzen Rückfragen." },
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

      <TrustProofPanel
        allowedPage={path}
        serviceKey="umzug"
        locationKey="regensburg"
        title="Trust Proof für Klaviertransport Regensburg"
        intro="Diese Seite setzt auf prüfbare Transport-Eckdaten statt schneller Blindzusagen: Instrument, Zugang, Fotos, Laufweg, Haltepunkt und Termin bleiben sichtbar."
      />

      <ServiceProofChecklist
        serviceKey="umzug"
        title="Welche Angaben den Klaviertransport belastbarer machen"
        intro="Ein Klaviertransport wird planbarer, wenn Instrument, Treppenhaus, Laufweg, Haltepunkt und Zielraum vor der Zusage nachvollziehbar sind."
      />

      <LocalProofPanel location="regensburg" />

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Häufige Fragen zum Klaviertransport in Regensburg
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LeadCta
                service="klaviertransport"
                city="regensburg"
                intent="klaviertransport-regensburg"
                priority="p0"
                label="Klaviertransport anfragen"
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
