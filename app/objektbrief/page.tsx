import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";

import { FloxantObjectBrief } from "@/components/FloxantObjectBrief";
import { FloxantObjectBriefBuilder } from "@/components/FloxantObjectBriefBuilder";
import { company } from "@/lib/company";
import { buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/objektbrief";
const canonical = `${company.url}${path}`;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte einen Objektbrief senden.",
    "Region:",
    "Leistung:",
    "Ort / PLZ:",
    "Termin / Deadline:",
    "Zugang / Ansprechpartner:",
    "Budgetrahmen, falls vorhanden:",
    "Fotos oder Angebot kann ich senden.",
  ].join("\n"),
);

const faqItems = [
  {
    q: "Was ist der FLOXANT Objektbrief?",
    a: "Der Objektbrief ist ein kurzer, strukturierter Startpunkt für Anfragen. Er sammelt Region, Leistung, Ort, Termin, Zugang, Fotos und optional einen Budgetrahmen, damit FLOXANT den Fall besser einordnen kann.",
  },
  {
    q: "Muss ich den Objektbrief vollständig ausfüllen?",
    a: "Nein. Auch wenige klare Angaben helfen. Wichtig sind vor allem Region, Leistung, Ort oder PLZ, Terminlage und ein kurzer Hinweis zum Zustand oder Ziel.",
  },
  {
    q: "Ist ein Budgetrahmen verbindlich?",
    a: "Nein. Ein Budgetrahmen ist nur eine Orientierung. Er hilft bei der ehrlichen Einschätzung, ersetzt aber kein geprüftes Angebot.",
  },
  {
    q: "Kann ich Fotos oder ein vorhandenes Angebot senden?",
    a: "Ja. Fotos, Screenshots oder ein vorhandenes Angebot können nach dem Start der WhatsApp-Anfrage im Chat gesendet werden.",
  },
  {
    q: "Was ist das Anfrage-Kurzzeichen?",
    a: "Das Anfrage-Kurzzeichen fasst Region, Leistung, Terminlage und Ort kurz zusammen. Es ist keine Auftragsnummer, hilft aber dabei, Ihre Anfrage im Gespräch schneller wiederzuerkennen.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Objektbrief | Anfrage klar vorbereiten",
  description:
    "Mit dem FLOXANT Objektbrief Reinigung, Umzug, Entrümpelung, Haushaltsauflösung oder Übergabe besser anfragen: Region, Ziel, Fotos, Zugang, Termin und Budgetrahmen senden.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "FLOXANT Objektbrief",
    description:
      "Ein klarer Weg für bessere Anfragen: Ziel, Fotos, Zugang, Termin und Budgetrahmen strukturiert senden.",
    images: [
      {
        url: "/assets/floxant-hero-neu-gedacht.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT Objektbrief",
      },
    ],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Objektbrief",
        description:
          "FLOXANT Objektbrief für strukturierte Anfragen zu Reinigung, Umzug, Entrümpelung, Haushaltsauflösung und Übergabe.",
        path,
        about: [
          "Objektbrief",
          "Reinigung Düsseldorf",
          "Umzug Regensburg",
          "Entrümpelung Regensburg",
          "Angebot prüfen",
          "Übergabevorbereitung",
        ],
        potentialActions: [
          { name: "Objektbrief per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
          { name: "Düsseldorf Reinigung anfragen", target: "/duesseldorf/reinigung", type: "Action" },
          { name: "Regensburg Services ansehen", target: "/regensburg", type: "Action" },
        ],
      }),
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

const useCases = [
  {
    title: "Düsseldorf: Reinigung besser einschätzen",
    text: "Für Büro, Praxis, Gewerbefläche, Wohnung, Treppenhaus oder Übergabe werden Ort, Fläche, Zustand, Turnus, Fotos und Zugang gemeinsam betrachtet.",
    href: "/duesseldorf/reinigung",
    cta: "Reinigung Düsseldorf öffnen",
    Icon: Building2,
  },
  {
    title: "Regensburg: Wechsel und Übergabe vorbereiten",
    text: "Für Umzug, Entrümpelung, Haushaltsauflösung oder Endreinigung hilft ein klares Bild aus Ort, Termin, Umfang, Zugang und Fotos.",
    href: "/regensburg",
    cta: "Regensburg öffnen",
    Icon: ClipboardCheck,
  },
  {
    title: "Angebot prüfen lassen",
    text: "Wenn schon ein Angebot vorliegt, kann FLOXANT Umfang, Zusatzpunkte, Termin, Zugang und Preisrahmen besser nachvollziehen.",
    href: "/angebot-vergleichen-duesseldorf",
    cta: "Angebot prüfen",
    Icon: BadgeCheck,
  },
] as const;

const qualityPoints = [
  "Bessere Rückfragen statt langer Erklärungen",
  "Fotos und Terminlage werden von Anfang an mitgedacht",
  "Ein Anfrage-Kurzzeichen hilft bei WhatsApp, Telefon und Formular",
  "Budgetrahmen möglich, aber ohne Preisgarantie",
  "Düsseldorf und Regensburg bleiben sauber getrennt",
] as const;

export default function ObjektbriefPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate min-h-[78svh] overflow-hidden bg-slate-950 px-5 pb-12 pt-32 text-white sm:px-8 lg:px-10">
        <Image
          src="/assets/floxant-hero-neu-gedacht.png"
          alt="FLOXANT Objektbrief für strukturierte Anfragen"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(15,23,42,0.82)_52%,rgba(15,23,42,0.48)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/25 bg-cyan-300/10 px-3 py-2 text-sm font-black uppercase tracking-normal text-cyan-100">
              <Camera className="h-4 w-4" aria-hidden="true" />
              FLOXANT Objektbrief
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal sm:text-6xl lg:text-7xl">
              Besser anfragen. Klarer entscheiden.
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-100">
              Der Objektbrief hilft, wenn mehrere Dinge zusammenkommen: Reinigung, Umzug,
              Entrümpelung, Haushaltsauflösung, Übergabe oder Angebotsprüfung. Sie senden die
              wichtigsten Angaben geordnet und erhalten ein kurzes Anfrage-Zeichen, das Sie in
              WhatsApp, Telefon oder Formular nennen können.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                data-event="whatsapp_click"
                data-region="duesseldorf-regensburg"
                data-source="object_brief_hero"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Objektbrief per WhatsApp
              </a>
              <a
                href="#schnellstart"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                data-event="hero_cta_click"
                data-source="object_brief_hero"
              >
                Objektbrief starten
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-100">
              Was FLOXANT dadurch schneller erkennt
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {qualityPoints.map((item) => (
                <div key={item} className="rounded-lg border border-white/15 bg-slate-950/55 p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold leading-6 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Für welche Fälle?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Ein Startpunkt für echte Situationen, nicht für perfekte Formulierungen.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {useCases.map(({ title, text, href, cta, Icon }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_20px_52px_rgba(15,23,42,0.08)]"
                data-event="service_card_click"
                data-source="object_brief_use_case"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-black tracking-normal text-slate-950">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-blue-800">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div id="schnellstart" className="scroll-mt-24">
        <FloxantObjectBriefBuilder />
      </div>

      <FloxantObjectBrief variant="homepage" className="border-t border-slate-200" />

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Häufige Fragen
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            Kurz geklärt, bevor Sie senden.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-black text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
