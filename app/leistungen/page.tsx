import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Home, MapPin, Truck } from "lucide-react";

import { company } from "@/lib/company";
import { buildRequestHref } from "@/lib/lead-intents/resolve-request-context";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/leistungen";
const canonical = `${company.url}${path}`;
const requestHref = buildRequestHref({
  source: "website",
  entryPage: path,
  ctaComponent: "services_overview",
  ctaPosition: "hero",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Leistungen: Reinigung, Umzug & Räumung",
  description:
    "Reinigung in Düsseldorf sowie Umzug, Reinigung und Räumung in Regensburg. Leistung wählen und mit passenden Eckdaten direkt anfragen.",
  alternates: { canonical, languages: { de: path, en: "/en/services", "x-default": path } },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    title: "FLOXANT Leistungen nach Standort und Aufgabe",
    description: "Wählen Sie die passende Leistung in Düsseldorf oder Regensburg und starten Sie die vorausgefüllte Anfrage.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "FLOXANT Leistungen" }],
  },
};

const groups = [
  {
    title: "Reinigung in Düsseldorf",
    description: "Für Wohnungen, Büros, Praxen und Gewerbeflächen. Objekt, Fläche, Turnus, Zugang und Zielzustand bestimmen den Leistungsumfang.",
    Icon: Building2,
    links: [
      ["Reinigung", "/duesseldorf/reinigung"],
      ["Büroreinigung", "/duesseldorf/bueroreinigung"],
      ["Praxisreinigung", "/duesseldorf/praxisreinigung"],
      ["Gewerbereinigung", "/duesseldorf/gewerbereinigung"],
      ["Grundreinigung", "/duesseldorf/grundreinigung"],
      ["Fensterreinigung", "/duesseldorf/fensterreinigung"],
    ],
  },
  {
    title: "Umzug und Transport in Regensburg",
    description: "Für planbare Abläufe werden Start, Ziel, Etagen, Aufzug, Strecke, Montage, Volumen und Termin vorab erfasst.",
    Icon: Truck,
    links: [
      ["Umzug", "/regensburg/umzug"],
      ["Seniorenumzug", "/regensburg/seniorenumzug"],
      ["Klaviertransport", "/klaviertransport-regensburg"],
      ["Umzug mit Reinigung", "/regensburg/umzug-reinigung"],
    ],
  },
  {
    title: "Reinigung in Regensburg",
    description: "Einmalige oder regelmäßige Reinigung wird nach Objektart, Fläche, Nutzung, Zeitfenster, Zugang und Aufgaben geplant.",
    Icon: Building2,
    links: [
      ["Reinigung", "/regensburg/reinigung"],
      ["Büroreinigung", "/regensburg/bueroreinigung"],
      ["Gewerbereinigung", "/regensburg/gewerbereinigung"],
    ],
  },
  {
    title: "Räumung und Auflösung in Regensburg",
    description: "Was bleibt, was entfernt wird und welcher Endzustand erreicht werden soll, wird vor Beginn eindeutig festgehalten.",
    Icon: Home,
    links: [
      ["Entrümpelung", "/regensburg/entruempelung"],
      ["Wohnungsauflösung", "/regensburg/wohnungsaufloesung"],
      ["Haushaltsauflösung", "/regensburg/haushaltsaufloesung"],
    ],
  },
] as const;

const faqs = [
  {
    q: "Wie finde ich die passende Leistung?",
    a: "Beginnen Sie mit dem gewünschten Ergebnis: Räume reinigen, einen Umzug planen, Gegenstände transportieren oder eine Fläche räumen. Auf der jeweiligen Leistungsseite sind Standort und Leistung bereits für die Anfrage ausgewählt.",
  },
  {
    q: "Welche Leistungen bietet FLOXANT in Düsseldorf an?",
    a: "Der Düsseldorfer Schwerpunkt liegt auf Reinigung für Wohnungen, Büros, Praxen und Gewerbeflächen. Die jeweilige Seite nennt den passenden Umfang und die benötigten Angaben.",
  },
  {
    q: "Welche Leistungen bietet FLOXANT in Regensburg an?",
    a: "In Regensburg können Umzug, Transport, Reinigung, Entrümpelung und Wohnungs- oder Haushaltsauflösung angefragt werden. Kombinierte Leistungen hängen von Umfang und Termin ab.",
  },
  {
    q: "Kann FLOXANT ein vorhandenes Angebot prüfen?",
    a: "Ja. FLOXANT bietet eine praktische Zweitmeinung zu Leistungsumfang, offenen Positionen und möglichen Zusatzkosten und kann bei passender Kapazität ein eigenes alternatives Angebot erstellen.",
  },
] as const;

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Leistungen",
        description: metadata.description as string,
        path,
        about: ["Reinigung", "Umzug", "Entrümpelung", "Wohnungsauflösung"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Leistungen", item: path },
      ]),
      buildFaqJsonLd(faqs),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}

export default function LeistungenPage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-950">
      <JsonLd />
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-300">Leistungen</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Die passende Hilfe für Räume, Umzug und Räumung</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">FLOXANT bündelt die angebotenen Leistungen nach Standort und Aufgabe. Wählen Sie das gewünschte Ergebnis; Stadt und Leistung werden anschließend in den passenden Anfrageweg übernommen.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#leistungsgruppen" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-cyan-400 px-5 text-sm font-black text-slate-950 hover:bg-cyan-300">Leistung auswählen <ArrowRight className="h-4 w-4" /></a>
            <Link href={requestHref} className="inline-flex min-h-12 items-center rounded-lg border border-white/30 px-5 text-sm font-black text-white hover:bg-white/10">Allgemeine Anfrage</Link>
          </div>
        </div>
      </section>

      <section id="leistungsgruppen" className="px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="service-groups-title">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-blue-700"><MapPin className="h-4 w-4" /> Düsseldorf und Regensburg</p>
            <h2 id="service-groups-title" className="mt-3 text-3xl font-black sm:text-4xl">Leistungen nach Standort</h2>
            <p className="mt-4 leading-7 text-slate-600">Die Standortzuordnung verhindert unpassende Anfragewege: Düsseldorfer Reinigungsseiten führen zur Reinigung in Düsseldorf; Regensburger Umzugs- und Räumungsseiten bleiben bei Regensburg.</p>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {groups.map(({ title, description, Icon, links }) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-700 text-white"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="mt-5 text-2xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 hover:border-blue-300 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                        {label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="service-process-title">
        <div className="mx-auto max-w-7xl">
          <h2 id="service-process-title" className="max-w-3xl text-3xl font-black sm:text-4xl">Wenige Angaben, die den Umfang wirklich verändern</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Gewünschtes Ergebnis", "Beschreiben Sie, welcher Zustand nach Reinigung, Umzug oder Räumung erreicht sein soll."],
              ["Aufwand vor Ort", "Fläche, Menge, Etagen, Aufzug, Laufweg, Zugang und besondere Bereiche bestimmen die Durchführung."],
              ["Zeit und Umfang", "Termin, Turnus, Montage, Material, Entsorgung und weitere Aufgaben werden getrennt benannt."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-white p-5">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="services-faq-title">
        <div className="mx-auto max-w-4xl">
          <h2 id="services-faq-title" className="text-3xl font-black">Häufige Fragen</h2>
          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq) => <details key={faq.q} className="py-5"><summary className="cursor-pointer list-none font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">{faq.q}</summary><p className="mt-3 leading-7 text-slate-600">{faq.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="bg-blue-800 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-3xl font-black">Noch nicht sicher, welche Leistung passt?</h2><p className="mt-3 max-w-2xl text-blue-100">Wählen Sie zuerst den Standort. Die verfügbaren Leistungen erscheinen danach im zentralen Anfrageformular.</p></div>
          <Link href={requestHref} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-blue-900">Anfrage starten <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
