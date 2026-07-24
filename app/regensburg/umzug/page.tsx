import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
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
  Handshake,
  Home,
  Info,
  Languages,
  MapPin,
  PackageCheck,
  Piano,
  Route,
  ShieldCheck,
  Sparkles,
  Truck,
  UsersRound,
  XCircle,
} from "lucide-react";

import { PriorityFaqSection } from "@/components/editorial/PriorityFaqSection";
import { PhotoGuidanceBlock } from "@/components/PhotoGuidanceBlock";
import { RequestChecklistBlock } from "@/components/RequestChecklistBlock";
import { company } from "@/lib/company";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const canonicalPath = "/regensburg/umzug";
const moveContactHref =
  "/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo";
const offerCheckHref =
  "/kontakt?service=umzug&city=regensburg&intent=umzugsangebot-pruefen&source=seo";
const pianoContactHref =
  "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo";

const pageTitle = "Umzug Regensburg anfragen - Start, Ziel und Termin klären";
const pageDescription =
  "Umzug in Regensburg geplant? Start, Ziel, Etage, Umfang und Termin beschreiben. FLOXANT prüft Anfrage oder Umzugsangebot anhand der genannten Eckdaten.";

type LinkCard = {
  title: string;
  text: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

type PlainCard = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalPath,
    languages: {
      "de-DE": canonicalPath,
      "x-default": canonicalPath,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonicalPath,
    title: "Umzug in Regensburg vorbereiten - Anfrage mit den wichtigsten Eckdaten stellen",
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

const heroFacts = [
  "Start, Ziel, Etage, Aufzug und Trageweg",
  "Umfang, Kartons, Einzelstücke und Fotos",
  "Terminwunsch, Zeitfenster und Kontaktweg",
] as const;

const situations: PlainCard[] = [
  {
    icon: Home,
    title: "Wohnungswechsel in Regensburg",
    text: "Wenn Start und Ziel in Regensburg liegen, zählen Etage, Aufzug, Haltepunkt und Trageweg oft mehr als die Strecke.",
  },
  {
    icon: Route,
    title: "Umzug ins Umland oder nach Regensburg",
    text: "Bei Strecken nach Neutraubling, Lappersdorf, Kelheim, Bad Abbach oder zurück nach Regensburg helfen Zielort und Zeitfenster.",
  },
  {
    icon: Boxes,
    title: "Mini-Umzug oder wenige Möbel",
    text: "Kleine Umzüge werden nicht künstlich aufgeblasen. Wichtig sind Einzelstücke, Zugang, flexible Termine und Fotos.",
  },
  {
    icon: UsersRound,
    title: "Seniorenumzug und Angehörige",
    text: "Bei Umzug im Alter sind ruhige Abstimmung, Reduzierung, Freigaben, Reinigung oder Entrümpelung oft Teil der Planung.",
  },
  {
    icon: Piano,
    title: "Klaviertransport und Sonderstücke",
    text: "Instrumentart, Treppe, Etage, Engstellen und Fotos müssen vorab klar sein. Ohne Zugangsdaten gibt es keine schnelle Zusage.",
  },
  {
    icon: Clock3,
    title: "Plan B, kurzfristiger Termin",
    text: "Wenn ein Anbieter absagt oder der Termin drückt, braucht FLOXANT vorhandene Infos, Prioritäten und ein realistisches Zeitfenster.",
  },
] as const;

const processSteps = [
  "Start, Ziel und Terminwunsch angeben",
  "Umfang, Etage, Aufzug und Trageweg beschreiben",
  "Fotos oder vorhandenes Angebot optional ergänzen",
  "FLOXANT ordnet Anfrage und nächste Schritte ein",
  "Rückmeldung über den gewünschten Kontaktweg",
] as const;

const effortFactors = [
  "Start und Ziel",
  "Entfernung und Route",
  "Etage und Aufzug",
  "Trageweg und Haltemöglichkeit",
  "Möbelmenge und Kartons",
  "Montage oder Demontage",
  "Sonderstücke wie Klavier",
  "Terminfenster und Dringlichkeit",
  "Kombination mit Reinigung",
  "Entrümpelung oder Restmengen",
] as const;

const neededInfo = [
  "Startort und Zielort",
  "Etage, Aufzug und Zugang",
  "Umfang, Kartons und grobe Möbelliste",
  "Terminwunsch oder Zeitfenster",
  "besondere Möbelstücke oder Engstellen",
  "vorhandenes Angebot oder Fotos, falls vorhanden",
  "Kontaktwunsch für Rückfragen",
] as const;

const authoritySignals = [
  {
    icon: ClipboardCheck,
    title: "Anfragequalität statt Blindpreis",
    text: "Start, Ziel, Etage, Aufzug, Umfang und Termin werden zuerst sortiert. So entstehen weniger Rückfragen und keine Schnellpreise ohne Kontext.",
  },
  {
    icon: FileSearch,
    title: "Angebotsprüfung als zweiter Blick",
    text: "Ein vorhandenes Umzugsangebot kann auf Struktur, Zusatzpositionen, offene Annahmen und fehlende Angaben geprüft werden - ohne Ersparnisgarantie.",
  },
  {
    icon: ShieldCheck,
    title: "Spezialfälle früh markieren",
    text: "Klavier, Seniorenumzug, Beiladung, Möbeltransport, Reinigung oder Entrümpelung werden nicht versteckt, sondern als eigener Aufwandspunkt sichtbar gemacht.",
  },
  {
    icon: Route,
    title: "Umzug direkt anfragen",
    text: "Nennen Sie Start, Ziel, Umfang und Termin für Ihren Umzug in Regensburg. Eine Anfrage ist noch keine Buchung.",
  },
] as const;

const noPromiseItems = [
  "keine Preisgarantie",
  "keine Soforttermin-Garantie",
  "keine garantierte Verfügbarkeit",
  "keine Rechtsberatung",
  "keine automatische Buchung durch eine Anfrage",
] as const;

const packageCards: LinkCard[] = [
  {
    icon: Boxes,
    title: "Mini-Umzug",
    text: "Wenige Möbel, kurze Strecke, flexible Anfrage. FLOXANT prüft, ob Transport, Beiladung oder ein normales Umzugsbriefing passt.",
    href: moveContactHref,
    label: "Mini-Umzug anfragen",
  },
  {
    icon: UsersRound,
    title: "Seniorenumzug",
    text: "Für Angehörige, Reduzierung, Packhilfe, sensible Planung und Kombination mit Reinigung oder Entrümpelung.",
    href: "/regensburg/seniorenumzug",
    label: "Seniorenumzug einordnen",
  },
  {
    icon: Piano,
    title: "Klaviertransport",
    text: "Instrument, Etage, Treppenhaus, Zugang, Fotos und Zielort vorab klären. Keine Zusage ohne Machbarkeitsprüfung.",
    href: "/klaviertransport-regensburg",
    label: "Klaviertransport Regensburg",
  },
  {
    icon: PackageCheck,
    title: "Möbeltransport",
    text: "Einzelne Möbel, Kleintransport oder Tragehilfe mit Start, Ziel, Trageweg, Termin und Foto vorbereiten.",
    href: "/kleintransport-regensburg",
    label: "Möbeltransport prüfen",
  },
  {
    icon: Route,
    title: "Beiladung und Rückfahrt",
    text: "Flexible Strecke, Transportgut und Zeitfenster nennen. Eine Rückfahrt kann passen, wird aber nicht garantiert.",
    href: "/beiladung-regensburg",
    label: "Beiladung Regensburg",
  },
  {
    icon: Building2,
    title: "Büro- oder Praxisumzug",
    text: "Gewerbliche Umzüge brauchen Ansprechpartner, Zeitfenster, Inventar, Zugang und realistische Prioritäten.",
    href: "/bueroumzug-regensburg",
    label: "Büroumzug Regensburg",
  },
] as const;

const relatedServices: LinkCard[] = [
  {
    icon: FileSearch,
    title: "Umzugsangebot prüfen",
    text: "Wenn ein Angebot teuer, unklar oder schwer vergleichbar wirkt, helfen Umfang, Fotos, Zusatzkosten und Termin.",
    href: offerCheckHref,
    label: "Angebot prüfen lassen",
  },
  {
    icon: Sparkles,
    title: "Umzug mit Reinigung",
    text: "Wenn die alte Wohnung übergabefähig werden soll, müssen Reihenfolge, Schlüsselweg, Zustand und Termin zusammenpassen.",
    href: "/regensburg/umzug-reinigung",
    label: "Kombi prüfen",
  },
  {
    icon: ClipboardCheck,
    title: "Entrümpelung vor dem Umzug",
    text: "Restmengen, Keller, Garage oder alte Möbel vor dem Umzug sichtbar machen, damit nichts am Umzugstag kippt.",
    href: "/regensburg/entruempelung",
    label: "Entrümpelung Regensburg",
  },
  {
    icon: ShieldCheck,
    title: "Plan-B-Service",
    text: "Wenn Anbieter, Termin oder Ablauf wackeln, sortiert FLOXANT vorhandene Infos und den nächsten realistischen Schritt.",
    href: "/plan-b-service",
    label: "Plan B ansehen",
  },
  {
    icon: FileSearch,
    title: "Angebotscheck",
    text: "Für zweite Einordnung von Angeboten, Annahmen und offenen Positionen, ohne Ersparnisgarantie oder Rechtsberatung.",
    href: "/angebotscheck",
    label: "Angebotscheck öffnen",
  },
  {
    icon: Route,
    title: "Leerfahrt und Rückfahrt",
    text: "Für flexible Transporte, freie Strecke oder Beiladung rund um Regensburg und Bayern nach Machbarkeit.",
    href: "/leerfahrt-rueckfahrt",
    label: "Rückfahrt prüfen",
  },
] as const;

const localSignals = [
  "Altstadt und Stadtamhof: Zufahrt, Ladepunkt, Treppenhaus und Engstellen früh mit Fotos zeigen.",
  "Kumpfmühl, Westenviertel und Prüfening: Etage, Aufzug, Innenhof und Trageweg sauber beschreiben.",
  "Neutraubling, Lappersdorf, Regenstauf, Bad Abbach, Kelheim, Nittendorf und Umgebung: auf Anfrage im Servicegebiet, keine Niederlassung behauptet.",
  "Schwandorf, Neumarkt i.d.OPf. oder Straubing: nur nach Strecke, Umfang und Zeitfenster manuell prüfen.",
] as const;

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: pageTitle,
        description: pageDescription,
        path: canonicalPath,
        about: [
          "Umzug Regensburg",
          "Umzugsangebot prüfen",
          "Mini-Umzug",
          "Seniorenumzug",
          "Klaviertransport",
          "Beiladung",
        ],
        potentialActions: [
          { name: "Umzug in Regensburg anfragen", target: moveContactHref, type: "ContactAction" },
          { name: "Umzugsangebot prüfen lassen", target: offerCheckHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "Umzug Regensburg",
        description: pageDescription,
        path: canonicalPath,
        serviceType: "Umzug, Umzugsanfrage und Umzugsangebot-Prüfung",
        areaServed: [
          "Regensburg",
          "Landkreis Regensburg",
          "Neutraubling",
          "Lappersdorf",
          "Regenstauf",
          "Bad Abbach",
          "Kelheim",
          "Nittendorf",
          "Regensburg Servicegebiet auf Anfrage",
        ],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Regensburg", item: "/regensburg" },
        { name: "Umzug", item: canonicalPath },
      ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
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

function PrimaryCta({
  href,
  label,
  variant = "dark",
}: {
  href: string;
  label: string;
  variant?: "dark" | "light" | "outline";
}) {
  const className =
    variant === "light"
      ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
      : variant === "outline"
        ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-cyan-300 hover:bg-cyan-50"
        : "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-cyan-800";

  return (
    <Link
      href={href}
      data-event="seo_cta_click"
      data-service="umzug"
      data-city="regensburg"
      data-page-intent={href.includes("umzugsangebot-pruefen") ? "umzugsangebot-pruefen" : "umzug-regensburg"}
      data-priority="p2"
      data-destination={href}
      data-source="seo"
      data-cta-label={label}
      className={className}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function RegensburgMoveHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#020617_0%,#0f3b4a_50%,#222018_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300">
            <Link href="/" className="hover:text-white">FLOXANT</Link>
            <span>/</span>
            <Link href="/regensburg" className="hover:text-white">Regensburg</Link>
            <span>/</span>
            <span className="text-white">Umzug</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
            <Truck className="h-4 w-4" aria-hidden="true" />
            Umzug Regensburg
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Umzug in Regensburg klar anfragen - mit Start, Ziel und Terminwunsch
          </h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-100 sm:text-lg">
            Sie planen einen Umzug in Regensburg oder Umgebung und möchten Aufwand, Termin und nächste Schritte besser
            einschätzen? Beschreiben Sie Start, Ziel, Etage, Menge und gewünschten Zeitraum. FLOXANT prüft diese Angaben
            für Privatumzug, Möbeltransport, Klaviertransport, Seniorenumzug oder einen Plan-B-Fall.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryCta href={moveContactHref} label="Umzug in Regensburg anfragen" variant="light" />
            <PrimaryCta href={offerCheckHref} label="Umzugsangebot prüfen lassen" variant="outline" />
          </div>

          <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-slate-300">
            Eine Anfrage ist noch keine Buchung. FLOXANT gibt keine Preisgarantie, keine Soforttermin-Garantie und keine
            garantierte Verfügbarkeit ohne geprüfte Eckdaten.
          </p>
        </div>

        <aside className="rounded-lg border border-white/12 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/25">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Umzugsbriefing</p>
          <h2 className="mt-2 text-2xl font-black tracking-normal">Die drei Angaben, die zuerst zählen.</h2>
          <div className="mt-5 grid gap-3">
            {heroFacts.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-bold leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-black text-emerald-950">Schneller Kontaktfluss</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-emerald-950/80">
              Der Button öffnet die Umzugsanfrage für Regensburg. Dort ergänzen Sie Start, Ziel, Umfang und Termin.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function MovingQuickAnswer() {
  return (
    <section id="ai-answer" className="border-b border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <Info className="h-4 w-4" aria-hidden="true" />
            Kurz erklärt
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Was braucht eine gute Umzugsanfrage in Regensburg?
          </h2>
        </div>
        <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-5">
          <p className="text-base font-semibold leading-8 text-slate-800">
            Für eine Umzugsanfrage in Regensburg helfen Startadresse, Zielort, Etage, Aufzug, Umfang,
            Terminwunsch und besondere Möbelstücke. FLOXANT kann die Angaben strukturieren und den passenden
            nächsten Schritt einordnen. Eine Anfrage ist noch keine Buchung.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryCta href={moveContactHref} label="Eckdaten senden" />
            <PrimaryCta href={offerCheckHref} label="Angebot einordnen" variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MovingAuthorityPanel() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Authority und Entscheidung"
          title="Warum FLOXANT die Umzugsanfrage zuerst sortiert."
          intro="Gute Umzugsplanung beginnt nicht mit einem Bauchpreis, sondern mit den Eckdaten, die den Aufwand wirklich verändern."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {authoritySignals.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <Icon className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black tracking-normal text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovingSituationGrid() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Kundensituationen"
          title="Nicht jeder Umzug ist ein Standard-Transport."
          intro="FLOXANT sortiert die Situation, bevor aus einem groben Umzugswunsch eine falsche Zusage entsteht."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {situations.map(({ icon: Icon, title, text }) => (
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

function MovingProcessAndNeeds() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.96fr_1.04fr]">
        <article>
          <SectionHeading
            eyebrow="Ablauf"
            title="Vom Umzugswunsch zur klaren Rückmeldung."
            intro="Der Ablauf bleibt bewusst einfach, aber vollständig genug für eine realistische erste Einordnung."
          />
          <div className="mt-8 grid gap-3">
            {processSteps.map((step, index) => (
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
            Diese Angaben machen die Rückfrage kürzer.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {neededInfo.map((item) => (
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

function MovingEffortFactorsPanel() {
  return (
    <section className="border-y border-slate-200 bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Wovon der Aufwand abhängt</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Warum ein Umzug nicht nur aus Strecke und Datum besteht.
          </h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-300">
            Je klarer diese Faktoren sind, desto besser kann FLOXANT Aufwand, Rückfragen und nächste Schritte
            einordnen. Das ersetzt keine verbindliche Zusage, verhindert aber Blindpreise.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {effortFactors.map((item) => (
            <div key={item} className="rounded-lg border border-white/12 bg-white/[0.06] p-4 text-sm font-bold leading-7 text-slate-100">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovingServicePackageCards() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Umzugsservices"
          title="Spezialfälle rund um Umzug Regensburg sauber verknüpfen."
          intro="Diese Wege zeigen typische Ergänzungen und nächste Entscheidungen bei einer Umzugsanfrage."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packageCards.map(({ icon: Icon, title, text, href, label }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-300 hover:bg-white hover:shadow-md"
              data-event="service_card_click"
              data-service="umzug"
              data-city="regensburg"
            >
              <Icon className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                {label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovingOfferCheckCTA() {
  return (
    <section id="umzugsangebot-pruefen" className="bg-cyan-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <article>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <FileSearch className="h-4 w-4" aria-hidden="true" />
            Angebotsprüfung
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            Umzugsangebot in Regensburg prüfen lassen
          </h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-700">
            Wenn ein Umzugsangebot für Regensburg zu teuer, unklar oder schwer vergleichbar wirkt, kann FLOXANT die
            Angaben prüfen. Wichtig sind Start, Ziel, Etage, Umfang, Termin, Zusatzkosten und besondere
            Möbelstücke. Es gibt keine Ersparnisgarantie und keine Rechtsberatung.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryCta href={offerCheckHref} label="Umzugsangebot prüfen lassen" />
            <Link
              href="/angebot-guenstiger-pruefen"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-200 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-cyan-400"
            >
              Angebotsprüfung erklärt
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Leistungsumfang und Zusatzpositionen",
            "Volumen, Etage, Aufzug und Trageweg",
            "Terminfenster, Dringlichkeit und Haltezone",
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

function RegensburgLocalProofPanel() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <SectionHeading
          eyebrow="Lokale Regensburg-Relevanz"
          title="Regensburg als Hauptort, Umgebung nur als Servicegebiet auf Anfrage."
          intro="FLOXANT behauptet keine erfundene Niederlassung im Umland. Entscheidend bleiben Route, Zugang, Umfang und Termin."
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

function MovingNoGuaranteePanel() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-amber-800">Was nicht versprochen wird</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Klare Anfrage statt falscher Sicherheit.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
            FLOXANT kann Umzugsdaten sortieren und den nächsten Schritt klären. Zusagen entstehen erst nach Prüfung
            von Umfang, Zugang, Termin und Machbarkeit.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {noPromiseItems.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-amber-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
              <XCircle className="mt-1 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedMovingServices() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Interne Links"
          title="Wenn der Umzug mit Angebot, Reinigung oder Plan B zusammenhängt."
          intro="Die Links führen zu bestehenden Seiten und halten den Regensburger Umzugskontext zusammen."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedServices.map(({ icon: Icon, title, text, href, label }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-300 hover:bg-white hover:shadow-md"
            >
              <Icon className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                {label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnglishMovingHint() {
  return (
    <section className="border-y border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <article>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800">
            <Languages className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-black uppercase tracking-normal text-cyan-800">Information in English</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Moving request in simple English is okay.
          </h2>
        </article>
        <div>
          <p className="text-sm font-semibold leading-7 text-slate-700">
            International customers can also describe a moving request in simple English. For moving help, moving company,
            piano transport or relocation support in Regensburg, FLOXANT needs start, destination, floor, volume and
            preferred date.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryCta href={moveContactHref} label="Start moving request" />
            <Link
              href={pianoContactHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              Piano transport request
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MovingFAQ() {
  return (
    <PriorityFaqSection
      route={canonicalPath}
      includeJsonLd
      tone="dark"
      title="Häufige Fragen zum Umzug in Regensburg"
      className="bg-slate-950"
    />
  );
}

function ClosingTrust() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <article>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <Handshake className="h-4 w-4" aria-hidden="true" />
            Klare Angaben vor der Anfrage
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Anfrage mit klaren Eckdaten, klare Rückfragen, keine erfundenen Bewertungen.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
            Fotos sind optional, Angebotsprüfung ist möglich, und die Rückmeldung läuft über den gewählten
            Kontaktweg. FLOXANT erfindet keine Preise und verspricht keine ungeprüfte Verfügbarkeit.
          </p>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: Camera, text: "Fotos optional für Treppe, Zugang, Möbel und Engstellen" },
            { icon: FileSearch, text: "Vorhandenes Umzugsangebot kann auf Umfang und offene Punkte geprüft werden" },
            { icon: BadgeEuro, text: "Preisrahmen nur mit Kontext statt Schnellpreis ohne Angaben" },
            { icon: ShieldCheck, text: "Keine Fake-Ratings, keine Preis- oder Sofortgarantie" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
              <Icon className="mt-1 h-4 w-4 shrink-0 text-cyan-800" aria-hidden="true" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RegensburgUmzugPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />
      <RegensburgMoveHero />
      <MovingQuickAnswer />
      <RequestChecklistBlock
        serviceKey="umzug"
        ctaHref={moveContactHref}
        ctaLabel="Umzugsdaten vorbereiten"
        compact
      />
      <PhotoGuidanceBlock serviceKey="umzug" compact />
      <MovingAuthorityPanel />
      <MovingSituationGrid />
      <MovingProcessAndNeeds />
      <MovingEffortFactorsPanel />
      <MovingServicePackageCards />
      <MovingOfferCheckCTA />
      <RegensburgLocalProofPanel />
      <MovingNoGuaranteePanel />
      <RelatedMovingServices />
      <EnglishMovingHint />
      <ClosingTrust />
      <MovingFAQ />
    </main>
  );
}
