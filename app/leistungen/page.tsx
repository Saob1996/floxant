import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MapPin, Sparkles, Truck } from "lucide-react";

import { company } from "@/lib/company";
import { buildGlobalRequestHref } from "@/lib/lead-intents/resolve-request-context";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/leistungen";
const canonical = `${company.url}${path}`;
const requestHref = buildGlobalRequestHref("services_overview");

const duesseldorfServices = [
  {
    title: "Reinigung",
    text: "Für Wohnung, Büro, Praxis oder Gewerbe mit Angaben zu Objekt, Fläche und Termin.",
    href: "/duesseldorf/reinigung",
  },
  {
    title: "Büroreinigung",
    text: "Arbeitsplätze, Besprechungsräume, Küche, Sanitär, Böden und gewünschter Turnus.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Praxisreinigung",
    text: "Empfang, Wartebereiche, Behandlungsräume, Sanitär und passende Zeitfenster.",
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Fensterreinigung",
    text: "Fensterzahl, Glasflächen, Innen- oder Außenseite, Rahmen, Höhe und Zugang.",
    href: "/duesseldorf/fensterreinigung",
  },
  {
    title: "Grundreinigung",
    text: "Einmalige intensive Reinigung nach Zustand, Böden, Küche und Sanitärbereichen.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Unterhaltsreinigung",
    text: "Wiederkehrende Reinigung mit Turnus, Zeitfenster, Objektart und Ansprechpartner.",
    href: "/duesseldorf/unterhaltsreinigung",
  },
  {
    title: "Bauendreinigung",
    text: "Baustaub und Rückstände vor Abnahme oder Übergabe mit Angaben zur Bauphase.",
    href: "/duesseldorf/baureinigung",
  },
  {
    title: "Gewerbereinigung",
    text: "Laden, Studio oder Gewerbefläche nach Nutzung, Größe, Zugang und Zeitfenster.",
    href: "/duesseldorf/gewerbereinigung",
  },
] as const;

const regensburgServices = [
  {
    title: "Umzug",
    text: "Start, Ziel, Umfang, Etagen, Zugang, Termin und gewünschte Zusatzleistungen.",
    href: "/regensburg/umzug",
  },
  {
    title: "Entrümpelung",
    text: "Einzelne Räume, Keller, Garage, Möbel oder Restmengen mit Zugang und Fotos.",
    href: "/regensburg/entruempelung",
  },
  {
    title: "Wohnungsauflösung",
    text: "Komplette Haushalte, mehrere Räume, Freigabe, Zeitrahmen und persönliche Abstimmung.",
    href: "/regensburg/wohnungsaufloesung",
  },
  {
    title: "Möbeltransport",
    text: "Einzelne Möbel oder kleinere Transporte mit Strecke, Maßen, Etage und Zugang.",
    href: "/kleintransport-regensburg",
  },
  {
    title: "Klaviertransport",
    text: "Instrument, Maße, Gewicht, Treppen, Engstellen, Aufzug und Fotos beschreiben.",
    href: "/klaviertransport-regensburg",
  },
  {
    title: "Reinigung",
    text: "Reinigung in Regensburg, wenn Objektart, Fläche, Umfang und Termin zusammenpassen.",
    href: "/regensburg/reinigung",
  },
] as const;

const faqItems = [
  {
    q: "Welche Leistungen bietet FLOXANT in Düsseldorf an?",
    a: "In Düsseldorf liegt der Schwerpunkt auf Reinigung für Wohnung, Büro, Praxis und Gewerbe. Dazu gehören Fenster-, Grund-, Unterhalts- und Bauendreinigung.",
  },
  {
    q: "Welche Leistungen bietet FLOXANT in Regensburg an?",
    a: "In Regensburg stehen Umzug, Entrümpelung, Wohnungsauflösung, Möbel- und Klaviertransport im Mittelpunkt. Reinigung kann ebenfalls angefragt werden.",
  },
  {
    q: "Welche Angaben sollte ich zuerst senden?",
    a: "Standort, gewünschte Leistung, Umfang und Termin reichen für den Einstieg. Je nach Aufgabe helfen Fläche, Räume, Etagen, Zugang, Start und Ziel oder freiwillige Fotos.",
  },
  {
    q: "Ist eine Anfrage bereits eine Buchung?",
    a: "Nein. FLOXANT prüft zunächst die Angaben und klärt offene Punkte. Ein Auftrag entsteht erst nach einer ausdrücklichen Vereinbarung.",
  },
] as const;

const allServices = [...duesseldorfServices, ...regensburgServices];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Leistungen | Düsseldorf & Regensburg",
  description:
    "Reinigung in Düsseldorf sowie Umzug, Räumung, Transport und Reinigung in Regensburg. Leistung wählen und Eckdaten direkt an FLOXANT senden.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: company.name,
    title: "FLOXANT Leistungen in Düsseldorf und Regensburg",
    description: "Leistung und Standort wählen und die wichtigsten Eckdaten direkt senden.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Leistungen in Düsseldorf und Regensburg",
        description:
          "Reinigung in Düsseldorf sowie Umzug, Räumung, Transport und Reinigung in Regensburg.",
        path,
        about: ["Reinigung Düsseldorf", "Umzug Regensburg", "Entrümpelung Regensburg"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Leistungen", item: path },
      ]),
      {
        "@type": "ItemList",
        name: "FLOXANT Leistungen",
        itemListElement: allServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.text,
            url: `${company.url}${service.href}`,
          },
        })),
      },
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

function ServiceList({
  services,
  region,
}: {
  services: typeof duesseldorfServices | typeof regensburgServices;
  region: "Düsseldorf" | "Regensburg";
}) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:border-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <h3 className="text-lg font-black text-slate-950">{service.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{service.text}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-800">
            {service.title} in {region}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function LeistungenPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Düsseldorf und Regensburg
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-6xl">
            Leistungen nach Standort und Aufgabe wählen.
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            In Düsseldorf liegt der Schwerpunkt auf Reinigung. In Regensburg stehen Umzug, Räumung und Transport im Mittelpunkt.
          </p>
          <Link
            href={requestHref}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
          >
            Leistung anfragen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 text-blue-800">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
            <p className="text-sm font-black uppercase tracking-normal">Düsseldorf</p>
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Reinigung in Düsseldorf</h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Wählen Sie die passende Reinigungsart. Auf der jeweiligen Seite sehen Sie, welche Angaben für eine erste Einschätzung helfen.
          </p>
          <ServiceList services={duesseldorfServices} region="Düsseldorf" />
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 text-blue-800">
            <Truck className="h-6 w-6" aria-hidden="true" />
            <p className="text-sm font-black uppercase tracking-normal">Regensburg</p>
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Umzug und Services in Regensburg</h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Beschreiben Sie Start, Ziel, Räume, Gegenstände oder den gewünschten Service. FLOXANT meldet sich, wenn noch Angaben fehlen.
          </p>
          <ServiceList services={regensburgServices} region="Regensburg" />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-normal sm:text-5xl">In drei Schritten zur Anfrage</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["1", "Leistung wählen", "Standort und passenden Leistungsbereich öffnen."],
              ["2", "Eckdaten senden", "Umfang, Termin und hilfreiche Zusatzangaben eintragen."],
              ["3", "Rückmeldung erhalten", "FLOXANT prüft die Angaben und meldet sich zum nächsten Schritt."],
            ].map(([number, title, text]) => (
              <li key={number} className="rounded-lg border border-slate-200 p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{number}</span>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cyan-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <FileSearch className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black tracking-normal sm:text-5xl">Schon ein Angebot erhalten?</h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-700">
              Senden Sie das vorhandene Angebot, wenn Leistungsumfang, Preispositionen oder mögliche Zusatzkosten unklar sind.
            </p>
          </div>
          <Link
            href="/angebot-guenstiger-pruefen"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-950"
          >
            Angebot prüfen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Kurz erklärt</h2>
            <div className="mt-7 divide-y divide-white/15 border-y border-white/15">
              {faqItems.map((item) => (
                <details key={item.q} className="py-4">
                  <summary className="cursor-pointer font-black">{item.q}</summary>
                  <p className="mt-3 pr-6 text-sm font-semibold leading-7 text-slate-300">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-lg bg-white p-7 text-slate-950">
            <CheckCircle2 className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black tracking-normal">Passende Leistung gefunden?</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              Senden Sie Standort, Leistung und die wichtigsten Eckdaten über das Anfrageformular.
            </p>
            <Link
              href={requestHref}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white"
            >
              Leistung anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
