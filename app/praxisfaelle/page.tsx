import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Home, PackageOpen, Route, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CustomerIntentRouter } from "@/components/seo/CustomerIntentRouter";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const scenarios = [
 {
  icon: Home,
  title: "Wohnung wechseln und sauber übergeben",
  audience: "Privatkunden, Familien, Vermieter und Hausverwaltungen",
  situation:
   "Der Umzug muss mit Endreinigung, Restmengen, Laufwegen und Schlüsselübergabe zusammenpassen.",
  route: "/umzug-mit-reinigung",
  action: "Kombiservice ansehen",
  signals: ["Umzug", "Endreinigung", "Übergabe", "Preisrahmen"],
 },
 {
  icon: Building2,
  title: "Büro verlagern und Inventar sortieren",
  audience: "Unternehmen, Praxen, Kanzleien und große Büros",
  situation:
   "Arbeitsplätze, IT, Archiv, Möbel, Zeitfenster und alte Gegenstände müssen ohne unnötige Betriebsstörung geplant werden.",
  route: "/bueroumzug",
  action: "Büroumzug planen",
  signals: ["Büroumzug", "Firmenentsorgung", "Zeitfenster", "Inventar"],
 },
 {
  icon: PackageOpen,
  title: "Räume freibekommen und Mengen entsorgen",
  audience: "Haushalte, Erbfälle, Firmen und Verwaltungen",
  situation:
   "Volumen, Materialarten, Demontage, Laufwege und Entsorgungsgrenzen bestimmen, welcher Service sinnvoll ist.",
  route: "/entruempelung",
  action: "Entrümpelung prüfen",
  signals: ["Räumung", "Material", "Demontage", "Entsorgung"],
 },
 {
  icon: Route,
  title: "Leere Rückfahrt sinnvoll nutzen",
  audience: "Kunden mit Teilmengen, Möbeln, Kartons oder Büroinventar",
  situation:
   "Wenn Datum, Route, freie Kapazität und Zielrichtung nach Regensburg passen, kann ein fairer Rücktransport sinnvoll sein.",
  route: "/leerfahrt-rueckfahrt",
  action: "Leer-Rückfahrt ansehen",
  signals: ["Route", "Datum", "Teilmengen", "Regensburg"],
 },
];

const faqItems = [
 {
  q: "Sind diese Praxisfälle echte Kundenreferenzen?",
  a: "Nein. Die Praxisfälle sind anonymisierte Entscheidungssituationen und typische Planungsbeispiele. Sie zeigen, wann welcher FLOXANT Service sinnvoll sein kann, ohne Kundendaten oder erfundene Bewertungen zu verwenden.",
 },
 {
  q: "Warum sind Praxisfälle für Kunden hilfreich?",
  a: "Viele Kunden wissen anfangs nicht, ob sie Umzug, Reinigung, Entrümpelung, Beiladung, Firmenentsorgung oder eine Kombination brauchen. Praxisfälle machen den passenden Einstieg schneller erkennbar.",
 },
 {
  q: "Wie helfen Praxisfälle bei der Preisvorstellung?",
  a: "Sie zeigen, welche Kostentreiber vor einer Anfrage wichtig sind. Dadurch lässt sich ein Zielbudget realistischer nennen, ohne die spätere Prüfung zu ersetzen.",
 },
 {
  q: "Welche Region steht im Mittelpunkt?",
  a: "Regensburg ist der feste Ausgangspunkt. Bayern und das erweiterte Einsatzgebiet werden je nach Strecke, Termin, Serviceart und Machbarkeit geprüft.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "praxisfaelle",
  title: "FLOXANT Praxisfälle | Umzug, Reinigung, Entrümpelung",
  description:
   "Typische FLOXANT Entscheidungssituationen: Umzug mit Reinigung, Büroumzug, Entrümpelung, Leer-Rückfahrt und Preisrahmen richtig einordnen.",
 });
}

export default function PraxisfaellePage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Praxisfälle und Entscheidungssituationen",
    description:
     "Typische Entscheidungssituationen für Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung und Leer-Rückfahrt.",
    path: "/praxisfaelle",
    about: [
     "Praxisfälle",
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Büroumzug",
     "Firmenentsorgung",
     "Leer-Rückfahrt",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Praxisfälle", item: "/praxisfaelle" },
   ]),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "FLOXANT Entscheidungssituationen",
    itemListElement: scenarios.map((scenario, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: scenario.title,
     url: `${company.url}${scenario.route}`,
     description: scenario.situation,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Praxisfälle" }]} />

   <section className="relative px-6 pb-16 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_64%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 ">
      <ShieldCheck className="h-4 w-4" />
      Entscheidungssituationen statt Werbeversprechen
     </div>
     <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
      Typische Fälle, in denen FLOXANT besonders sinnvoll wird.
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/56">
      Diese Seite zeigt keine erfundenen Bewertungen und keine erfundenen Referenzen. Sie erklärt
      typische Situationen, in denen Kunden Umzug, Reinigung, Entrümpelung, Büroumzug,
      Firmenentsorgung oder Leer-Rückfahrt sauber einordnen müssen.
     </p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/rechner"
       className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
      >
       Passenden Weg im Rechner prüfen
       <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
       href="/qualitaet-ablauf"
       className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
      >
       Qualitätslogik verstehen
      </Link>
     </div>
    </div>
   </section>

   <section className="px-6 pb-20">
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
     {scenarios.map((scenario) => {
      const Icon = scenario.icon;
      return (
       <article
        key={scenario.title}
        className="premium-scan rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.058),rgba(255,255,255,0.018))] p-7"
       >
        <div className="flex flex-wrap items-start justify-between gap-4">
         <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 p-3 text-blue-700 ">
          <Icon className="h-6 w-6" />
         </div>
         <span className="rounded-full border border-foreground/10 bg-white/[0.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/42">
          {scenario.audience}
         </span>
        </div>
        <h2 className="mt-7 text-3xl font-semibold tracking-tight text-foreground">{scenario.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/52">{scenario.situation}</p>
        <div className="mt-6 flex flex-wrap gap-2">
         {scenario.signals.map((signal) => (
          <span
           key={signal}
           className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/38"
          >
           {signal}
          </span>
         ))}
        </div>
        <Link
         href={scenario.route}
         className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 "
        >
         {scenario.action}
         <ArrowRight className="h-3.5 w-3.5" />
        </Link>
       </article>
      );
     })}
    </div>
   </section>

   <CustomerIntentRouter compact />

   <section className="border-t border-foreground/5 px-6 py-20">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
       Häufige Fragen zu FLOXANT Praxisfällen
      </h2>
     </div>
     <div className="space-y-4">
      {faqItems.map((item) => (
       <article key={item.q} className="rounded-[1.5rem] border border-foreground/10 bg-white/[0.025] p-6">
        <h3 className="text-lg font-semibold text-foreground">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/50">{item.a}</p>
       </article>
      ))}
     </div>
    </div>
   </section>
  </main>
 );
}
