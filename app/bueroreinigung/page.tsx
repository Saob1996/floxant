import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Languages,
  ShieldCheck,
} from "lucide-react";

import { company } from "@/lib/company";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/bueroreinigung";
const canonicalPath = "/regensburg/bueroreinigung";

const primaryHref = "/kontakt?service=bueroreinigung&city=regensburg&intent=bueroreinigung-anfrage&source=seo";
const offerHref = "/kontakt?service=bueroreinigung&city=regensburg&intent=bueroreinigung-angebot-pruefen&source=seo";

const faqItems = [
  {
    q: "Welche Angaben braucht FLOXANT für B2B-Büroreinigung?",
    a: "Hilfreich sind Ort, Objektart, Fläche, Raumliste, Turnus, Reinigungszeiten, Ansprechpartner, Zugang und ein vorhandenes Angebot, falls es schon eines gibt.",
  },
  {
    q: "Wie unterscheiden sich Büroreinigung und Gewerbereinigung?",
    a: "Büroreinigung fokussiert Büroalltag, Arbeitsplätze, Besprechungsräume, Küche, Sanitär und planbaren Turnus. Gewerbereinigung ist breiter und hängt stärker von Objektart, Nutzung, Sonderflächen und Leistungsumfang ab.",
  },
  {
    q: "Kann ich ein Büroreinigungsangebot prüfen lassen?",
    a: "Ja. FLOXANT kann Fläche, Turnus, Leistungsumfang, Reinigungszeiten und offene Positionen sachlich einordnen. Es gibt keine Preis- oder Ersparnisgarantie.",
  },
  {
    q: "Ist eine Anfrage schon eine Beauftragung?",
    a: "Nein. Die Anfrage dient zur Einordnung. Eine Beauftragung entsteht erst nach geprüften Eckdaten und ausdrücklicher Abstimmung.",
  },
  {
    q: "Can I request office cleaning in English?",
    a: "Yes. International companies can describe office cleaning or commercial cleaning in simple English. Location, area, frequency, time window and object type are helpful.",
  },
] as const;

const needs = [
  "Ort oder Einsatzgebiet",
  "Objektart und Fläche",
  "Raumliste oder Bereiche",
  "gewünschter Turnus",
  "Reinigungszeiten",
  "Ansprechpartner oder Rolle",
  "Zugang oder Schlüsselweg",
  "vorhandenes Angebot optional",
] as const;

const routes = [
  {
    title: "Büroreinigung Regensburg",
    text: "Kanonische B2B-Zielseite für Büroreinigung in Regensburg mit Fläche, Turnus, Reinigungszeiten und Angebotseinordnung.",
    href: "/regensburg/bueroreinigung",
  },
  {
    title: "Büroreinigung Düsseldorf",
    text: "Büroreinigung für Firmen in Düsseldorf mit Angaben zu Fläche, Turnus und Reinigungszeiten.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Gewerbereinigung einordnen",
    text: "Wenn Objektart, Sonderflächen, Nutzung oder Leistungsumfang breiter sind als reine Büroflächen.",
    href: "/gewerbereinigung",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Büroreinigung für Firmen mit konkreten Eckdaten anfragen",
  description:
    "B2B-Büroreinigung vorbereiten: Fläche, Turnus, Reinigungszeiten, Objektart und Ansprechpartner nennen. Angebot optional prüfen lassen.",
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
    title: "Büroreinigung für Firmen mit konkreten Eckdaten anfragen",
    description:
      "FLOXANT ordnet B2B-Büroreinigung nach Fläche, Turnus, Reinigungszeiten, Objektart und Ansprechpartner ein.",
  },
};

export default function BueroreinigungPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Büroreinigung für Firmen mit konkreten Eckdaten anfragen",
        description:
          "Support-Seite für B2B-Büroreinigung mit klarer Weiterleitung zu Regensburg, Düsseldorf, Gewerbereinigung und Angebotsprüfung.",
        path: pagePath,
        about: [
          "B2B-Büroreinigung",
          "Büroreinigung für Firmen",
          "Office cleaning",
          "Büroreinigungsangebot prüfen",
        ],
        potentialActions: [
          { name: "Büroreinigung anfragen", target: primaryHref, type: "ContactAction" },
          { name: "Büroreinigungsangebot prüfen", target: offerHref, type: "ContactAction" },
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Büroreinigung", item: pagePath },
      ]),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="relative isolate bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10">
        <Image
          src="/assets/gewerbereinigung/gewerbliche-reinigung-regensburg-hero.webp"
          alt="Helles Büro als neutrales Beispiel für Büroreinigung"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.84)_58%,rgba(15,23,42,0.52)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              B2B-Büroreinigung
            </p>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Büroreinigung für Firmen mit konkreten Eckdaten anfragen
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-100 sm:text-lg">
              Für eine B2B-Büroreinigung sind Fläche, gewünschter Turnus, Reinigungszeiten,
              Objektart und Ansprechpartner entscheidend. FLOXANT hilft, die Anfrage
              vorzubereiten und offene Punkte eines vorhandenen Angebots einzuordnen.
              Eine Anfrage ist noch keine Beauftragung.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                Büroreinigung für Firma anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={offerHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
              >
                Büroreinigung-Angebot prüfen lassen
                <FileSearch className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/25">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Kurz erklärt</p>
            <p className="mt-3 text-base font-semibold leading-8 text-slate-700">
              Für B2B-Büroreinigung helfen Angaben zu Fläche, Turnus, Reinigungszeiten,
              Objektart und Ansprechpartner. FLOXANT kann die Anfrage oder ein vorhandenes
              Angebot strukturieren. Preise, Verfügbarkeit oder feste Ergebnisse werden nicht garantiert.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Was FLOXANT braucht</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Fläche, Turnus, Zeiten und Objektart zuerst klären.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Wählen Sie Büroreinigung in Regensburg, Büroreinigung in Düsseldorf oder Gewerbereinigung.
              Jede Seite fragt nach den Angaben, die für die jeweilige Leistung wichtig sind.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {needs.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-800" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Passende Zielseite wählen</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            B2B-Büroreinigung ohne doppelte Money Pages.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {routes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-300 hover:shadow-md"
              >
                <h3 className="text-xl font-black tracking-normal text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                  Seite öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Ablauf und Grenzen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Anfrage mit klaren Eckdaten, keine automatische Zusage.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Firma optional, Ansprechpartner hilfreich",
              "Angebot optional zur Prüfung ergänzen",
              "keine Preisgarantie",
              "keine Soforttermin-Garantie",
              "keine garantierte Verfügbarkeit",
              "keine erfundenen Zertifikate oder Referenzen",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-cyan-800" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
              <Languages className="h-4 w-4" aria-hidden="true" />
              Information in English
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Office cleaning or commercial cleaning request in simple English.
            </h2>
          </div>
          <p className="text-sm font-semibold leading-7 text-slate-200">
            International companies can describe an office cleaning request in simple English.
            For office cleaning or commercial cleaning in Düsseldorf or Regensburg, FLOXANT
            needs location, area, cleaning frequency, preferred time window and a short description.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-800">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Häufige Fragen zur Büroreinigung für Firmen.
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white"
              >
                Anfrage starten
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
