import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Home, MapPin, Sparkles } from "lucide-react";

import { company } from "@/lib/company";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/reinigung";
const canonical = `${company.url}${path}`;

const locationCards = [
  {
    city: "Düsseldorf",
    title: "Reinigung in Düsseldorf",
    text: "Für Wohnung, Büro, Gewerbe, Praxis, Fenster, Hausverwaltung oder möblierte Apartments in Düsseldorf. Erst Stadt und Objekt wählen, dann die passende Anfrage starten.",
    href: "/duesseldorf/reinigung",
    cta: "Düsseldorf wählen",
    points: ["Reinigungsfirma Düsseldorf", "Büroreinigung und Gewerbereinigung", "Apartment- und Wohnungsreinigung"],
  },
  {
    city: "Regensburg",
    title: "Reinigung in Regensburg",
    text: "Für Reinigung in Regensburg und im geprüften Umkreis: Wohnung, Übergabe, Büro, Gewerbe, Fenster, Endreinigung oder Reinigung nach Umzug.",
    href: "/regensburg/reinigung",
    cta: "Regensburg wählen",
    points: ["Reinigung Regensburg", "50-km-Umkreis nach Prüfung", "Übergabe, Objekt und Turnus"],
  },
] as const;

const cleaningTypes = [
  {
    id: "bueroreinigung",
    title: "Büroreinigung",
    text: "Arbeitsplätze, Besprechungsräume, Küche, Sanitär, Empfang, Reinigungszeiten und Turnus sauber beschreiben.",
    duesseldorf: "/duesseldorf/bueroreinigung",
    regensburg: "/regensburg/bueroreinigung",
  },
  {
    id: "gewerbereinigung",
    title: "Gewerbereinigung",
    text: "Objektart, Nutzungszeiten, Fläche, Sonderflächen, Zugang und Ansprechpartner in eine klare Anfrage bringen.",
    duesseldorf: "/duesseldorf/gewerbereinigung",
    regensburg: "/regensburg/gewerbereinigung",
  },
  {
    id: "fensterreinigung",
    title: "Fensterreinigung",
    text: "Fensterzahl, Glasflächen, Rahmen, Etage, Erreichbarkeit, Innen/Außen und Terminwunsch nennen.",
    duesseldorf: "/duesseldorf/fensterreinigung",
    regensburg: "/fensterreinigung-regensburg",
  },
  {
    id: "apartment-reinigung",
    title: "Möblierte Wohnung und Airbnb",
    text: "Für möblierte Apartments, Gästewechsel, Ferienwohnung oder Übergabe zählen Schlüsselweg, Fotos, Zustand und Zeitfenster.",
    duesseldorf: "/reinigung-moeblierte-wohnung-duesseldorf",
    regensburg: "/reinigung-moeblierte-wohnung-regensburg",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Reinigung wählen: Düsseldorf oder Regensburg | FLOXANT",
  description:
    "Reinigung bei FLOXANT zuerst nach Standort wählen: Düsseldorf oder Regensburg. Danach passende Anfrage für Wohnung, Büro, Gewerbe, Praxis, Fenster oder Apartment starten.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Reinigung in Düsseldorf oder Regensburg auswählen",
    description:
      "Kundennahe Standortwahl für Reinigungsanfragen: Düsseldorf oder Regensburg wählen und passend zur richtigen Reinigungsseite wechseln.",
    images: [
      {
        url: "/assets/service-cleaning.webp",
        width: 1200,
        height: 630,
        alt: "FLOXANT Reinigung nach Standort wählen",
      },
    ],
  },
};

export default function ReinigungLocationChooserPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Leistungen", item: "/leistungen" },
        { name: "Reinigung", item: path },
      ]),
      buildWebPageJsonLd({
        name: "Reinigung in Düsseldorf oder Regensburg auswählen",
        description:
          "Standort-Auswahl für Reinigungsanfragen bei FLOXANT: Düsseldorf oder Regensburg wählen und zur passenden Seite wechseln.",
        path,
        about: [
          "Reinigung Düsseldorf",
          "Reinigung Regensburg",
          "Reinigungsfirma",
          "Büroreinigung",
          "Gewerbereinigung",
          "Fensterreinigung",
        ],
      }),
    ],
  };

  return (
    <main className="bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Reinigung nach Standort wählen
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Reinigung in Düsseldorf oder Regensburg? Erst Standort wählen, dann richtig anfragen.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            FLOXANT führt Sie nicht automatisch in die falsche Stadt. Wählen Sie zuerst Düsseldorf oder Regensburg.
            Danach landen Sie auf der passenden deutschen Reinigungsseite mit den richtigen Angaben für Objekt, Fläche,
            Turnus, Termin und Zielzustand.
          </p>
        </div>
      </section>

      <section id="standort-auswahl" className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">Standort-Auswahl</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Wo brauchen Sie die Reinigung?</h2>
            <p className="mt-4 font-medium leading-7 text-slate-700">
              Für gutes Ranking und eine gute Kundenerfahrung müssen Stadt, Objekt und Reinigungsart zusammenpassen.
              Deshalb führen die nächsten Karten direkt zur richtigen lokalen Seite.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {locationCards.map((card) => (
              <article key={card.city} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-black uppercase tracking-wide text-blue-800">{card.city}</p>
                </div>
                <h3 className="mt-5 text-3xl font-black leading-tight">{card.title}</h3>
                <p className="mt-4 font-medium leading-7 text-slate-700">{card.text}</p>
                <ul className="mt-5 grid gap-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm font-bold leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={card.href}
                  className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">Reinigungsart wählen</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Direkt zur richtigen Reinigungsleistung.</h2>
            <p className="mt-4 font-medium leading-7 text-slate-700">
              Wenn Sie schon wissen, ob es um Büro, Gewerbe, Fenster oder Apartment geht, wählen Sie hier zuerst die
              Reinigungsart und dann die Stadt.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {cleaningTypes.map((item) => (
              <article id={item.id} key={item.id} className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-950">
                    {item.id === "apartment-reinigung" ? <Home className="h-5 w-5" aria-hidden="true" /> : <Building2 className="h-5 w-5" aria-hidden="true" />}
                  </span>
                  <h3 className="text-xl font-black">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={item.duesseldorf} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-black text-slate-900 hover:border-cyan-500 hover:bg-cyan-50">
                    Düsseldorf
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={item.regensburg} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-black text-slate-900 hover:border-cyan-500 hover:bg-cyan-50">
                    Regensburg
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
