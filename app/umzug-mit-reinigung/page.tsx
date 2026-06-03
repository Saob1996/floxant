import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, KeyRound, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/umzug-mit-reinigung";

const faqItems = [
  {
    q: "Welche Vorteile bietet ein Umzug mit Endreinigung?",
    a: "Transport und Reinigung werden nicht als zwei getrennte Baustellen behandelt. FLOXANT prueft, ob Volumen, Flaeche, Zustand, Fotos, Schluessel und Uebergabetermin in einem Ablauf sinnvoll zusammenpassen.",
  },
  {
    q: "Ist eine Endreinigung fuer die Uebergabe moeglich?",
    a: "Ja, nach Absprache. Wichtig sind Flaeche, Zustand, Fotos, Termin und das Ziel der Uebergabe. Eine Vermieterentscheidung wird nicht garantiert.",
  },
  {
    q: "Wann unterscheidet sich der Kombi-Service vom Standard-Umzug?",
    a: "Der Standard-Umzug endet meist mit dem Transport. Der Kombi-Service denkt Reinigung, Restpunkte, Fotos und Uebergabevorbereitung direkt mit.",
  },
  {
    q: "Fuer wen ist dieser Service in Regensburg und Bayern geeignet?",
    a: "Fuer Mieter mit engem Uebergabetermin, Eigentuemer, Familien und Kunden, die nicht mehrere Anbieter fuer Transport, Reinigung und Abschluss koordinieren wollen.",
  },
  {
    q: "Wie funktioniert die Abstimmung der Termine?",
    a: "FLOXANT erfasst Umzugsvolumen, Flaeche, Zustand, Zugang, Termin und Fotos. Danach wird geprueft, ob Reihenfolge, Team und Zeitfenster realistisch zusammenpassen.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "umzug-mit-reinigung",
    title: "Umzug mit Endreinigung Regensburg & Bayern | FLOXANT",
    description:
      "Umzug mit Endreinigung in Regensburg und Bayern nach Verfuegbarkeit: Transport, Reinigung, Fotos, Schluessel und Uebergabe gemeinsam anfragen.",
    keywords: [
      "Umzug mit Endreinigung",
      "Umzug mit Reinigung Regensburg",
      "Wohnungsuebergabe Reinigung",
      "Reinigung nach Umzug",
      "Umzug und Endreinigung",
    ],
  });
}

export default async function UmzugMitReinigungPage() {
  const dict = await getDictionary("de");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Umzug mit Reinigung", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Umzug mit Endreinigung in Regensburg und Bayern",
        description:
          "Abgestimmte Kombination aus Umzug, Endreinigung, Fotos, Schluesselthemen und Uebergabevorbereitung.",
        path: pagePath,
        serviceType: "Umzug mit Endreinigung",
        areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Umzug mit Reinigung | FLOXANT",
        description:
          "Definition, Ablauf und Anfrage fuer die Kombination aus Umzug und Reinigung in Regensburg und Bayern.",
        path: pagePath,
        about: ["Umzug", "Endreinigung", "Wohnungsuebergabe", "Regensburg", "Bayern", "Fotos", "Budget"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs lang="de" items={[{ label: "Home", href: "/" }, { label: "Umzug mit Reinigung" }]} />

      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_50%)]" />
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-mono uppercase tracking-widest text-emerald-300">
            <Sparkles size={14} className="text-emerald-400" />
            Kombi-Service fuer Auszug und Uebergabe
          </div>
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Umzug mit Endreinigung in Regensburg und Bayern
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/62">
            FLOXANT verbindet Umzug, Endreinigung und Uebergabevorbereitung, wenn Auszug und
            Rueckgabe eng zusammenliegen. Entscheidend sind Strecke, Volumen, Flaeche, Zustand,
            Fotos, Schluessel und Termin. Regensburg bleibt der Kern; Bayern wird nach Route,
            Kapazitaet und Leistungsumfang geprueft.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              data-event="hero_cta_click"
              data-source="move_cleaning_hero"
            >
              Kombi-Service anfragen
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/reinigung-regensburg"
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Endreinigung ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "Was ist das?",
              text: "Ein koordinierter Ablauf aus Beladung, Transport, Endreinigung und Uebergabevorbereitung.",
            },
            {
              icon: Sparkles,
              title: "Fuer wen?",
              text: "Fuer Auszuege mit direkter Uebergabe oder wenn Vermietung und Transport eng getaktet sind.",
            },
            {
              icon: ShieldCheck,
              title: "Wann sinnvoll?",
              text: "Wenn zwei Gewerke nicht getrennt organisiert werden sollen und Zeitverluste vermieden werden muessen.",
            },
            {
              icon: KeyRound,
              title: "Wie laeuft es ab?",
              text: "Erst Umzug und Flaeche klaeren, dann Reinigung, Fotos, Schluessel und Terminlogik zusammen planen.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <Icon className="mb-5 h-8 w-8 text-emerald-300" />
                <h2 className="mb-3 text-xl font-bold tracking-tight">{item.title}</h2>
                <p className="text-sm leading-relaxed text-white/64">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <div className="bg-white text-slate-950">
        <PublicAuthorityModules
          moduleIds={[
            "move_cleaning_combo",
            "handover_preparation",
            "price_umzug",
            "price_cleaning",
            "photo_check",
            "budget_check",
          ]}
          badge="Umzug und Reinigung zusammen"
          title="Warum Umzug und Endreinigung gemeinsam planbarer werden"
          subtitle="Diese Seite zielt auf Kunden mit Auszug, Uebergabetermin und Koordinationsdruck. FLOXANT klaert Transport, Reinigungsumfang, Fotos, Budget und Schluesselthemen, ohne eine Abnahme zu garantieren."
          source="move_cleaning_authority_modules"
        />
      </div>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold">Haeufige Fragen zu Umzug mit Reinigung</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <article key={item.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                <h3 className="mb-4 text-xl font-bold">{item.q}</h3>
                <p className="leading-7 text-white/64">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Kombi-Service anfragen</h2>
            <p className="mt-4 text-white/55">
              Nutzen Sie die Anfrage, wenn Umzug und Endreinigung gemeinsam geplant werden sollen.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-1 shadow-2xl backdrop-blur-xl">
            <div className="p-4 md:p-8">
              <SmartBookingWizard
                dict={{
                  common: dict.common,
                  calculator: dict.calculator,
                  booking: dict.booking,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/umzug-regensburg", label: "Umzug in Regensburg anfragen" },
            { href: "/reinigung-regensburg", label: "Endreinigung in Regensburg pruefen" },
            { href: "/schluesseluebergabe", label: "Schluesseluebergabe mitdenken" },
            { href: "/service-area-bayern", label: "Servicegebiet Bayern" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-emerald-500/40 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
