import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, CheckCircle2, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CostDriverMatrix, costDriverGroups } from "@/components/seo/CostDriverMatrix";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Warum nennt FLOXANT keine harten Online-Endpreise?",
  a: "Weil Umzug, Reinigung, Entrümpelung und Büroumzug von Faktoren abhängen, die erst durch konkrete Angaben belastbar werden: Umfang, Zugang, Laufwege, Terminlage, Region und Zusatzleistungen.",
 },
 {
  q: "Was ist ein unverbindlicher Orientierungsrahmen?",
  a: "Ein Orientierungsrahmen ist eine erste Einschätzung auf Basis der eingegebenen Daten. Er hilft bei Planung und Budgetgefühl, ersetzt aber keine endgültige Prüfung durch FLOXANT.",
 },
 {
  q: "Welche Angaben verbessern die Einschätzung am meisten?",
  a: "Hilfreich sind Serviceart, Start- und Zielort, Fläche oder Volumen, Etagen, Aufzug, Laufwege, Terminwunsch, Zusatzleistungen, Fotos und eine optionale Preisvorstellung.",
 },
 {
  q: "Wie wird die Preisvorstellung des Kunden behandelt?",
  a: "Die Preisvorstellung ergänzt die erste Orientierung. Sie überschreibt sie nicht, hilft FLOXANT aber zu prüfen, ob Budget, Umfang und Leistung zusammenpassen.",
 },
 {
  q: "Warum unterscheiden sich Umzug, Reinigung und Entrümpelung so stark?",
  a: "Jeder Service hat andere Kostentreiber. Beim Umzug zählen Volumen und Zugang, bei Reinigung Fläche und Zustand, bei Entrümpelung Material, Laufwege und Entsorgungsaufwand.",
 },
];

const principles = [
 "Keine Lockpreise und keine scheinbar exakten Euro-Versprechen.",
 "Sichtbare Kostentreiber statt versteckter Pauschalannahmen.",
 "Kundenbudget und geprüfte Einschätzung bleiben sauber getrennt.",
 "Der Rechner ist Einstieg in die Vorprüfung, nicht finales Angebot.",
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "kostenfaktoren",
  title: "FLOXANT Kostenfaktoren | Preisrahmen für Umzug & Reinigung",
  description:
   "Welche Faktoren den Preisrahmen bei Umzug, Reinigung, Entrümpelung und Büroumzug beeinflussen: Volumen, Fläche, Zugang, Termin und Extras.",
 });
}

export default function KostenfaktorenPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Kostenfaktoren und Preisrahmen",
    description:
     "Erklärung der wichtigsten Kostentreiber für Umzug, Reinigung, Entrümpelung und Büroumzug.",
    path: "/kostenfaktoren",
    about: [
     "Kostenfaktoren",
     "Preisrahmen",
     "Umzugskosten",
     "Reinigungskosten",
     "Entrümpelungskosten",
     "Büroumzug",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Kostenfaktoren", item: "/kostenfaktoren" },
   ]),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "FLOXANT Kostenfaktoren je Service",
    itemListElement: costDriverGroups.map((group, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: group.service,
     url: `${company.url}${group.href}`,
     description: group.intro,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Kostenfaktoren" }]} />

   <section className="relative px-6 pb-16 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_64%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 ">
      <Banknote className="h-4 w-4" />
      Preiswahrheit statt Lockpreis
     </div>
     <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
      Welche Faktoren den FLOXANT Preisrahmen wirklich beeinflussen.
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/56">
      Diese Seite erklärt, warum FLOXANT zuerst mit einem unverbindlichen Orientierungsrahmen arbeitet.
      Je nach Service zählen andere Faktoren: Volumen, Fläche, Zugang, Zustand, Terminlage, Laufwege
      und Zusatzleistungen.
     </p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/rechner"
       className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
      >
       Preisrahmen im Rechner starten
       <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
       href="/anfrage-mit-preisrahmen"
       className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
      >
       Eigene Preisvorstellung senden
      </Link>
     </div>
    </div>
   </section>

   <section className="px-6 pb-8">
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
     {principles.map((item) => (
      <div key={item} className="rounded-[1.5rem] border border-foreground/10 bg-white/[0.03] p-5">
       <CheckCircle2 className="mb-4 h-5 w-5 text-blue-700 " />
       <p className="text-sm leading-relaxed text-foreground/56">{item}</p>
      </div>
     ))}
    </div>
   </section>

   <CostDriverMatrix compact />

   <section className="border-y border-foreground/5 bg-slate-950/55 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <ShieldCheck className="h-4 w-4" />
       Operative Realität
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Preisrahmen werden besser, wenn die Daten besser werden.
      </h2>
     </div>
     <div className="space-y-4 text-sm leading-relaxed text-foreground/56">
      <p>
       Eine grobe Anfrage kann nur grob eingeordnet werden. Je präziser Ort, Umfang, Zugang,
       Termin und Sonderwünsche angegeben werden, desto besser kann FLOXANT Team, Fahrzeug,
       Zeitfenster und Aufwand prüfen.
      </p>
      <p>
       Das Ziel ist nicht, den niedrigsten Fantasiepreis zu zeigen, sondern eine realistische
       Vorplanung zu ermöglichen. Dadurch werden spätere Rückfragen klarer und die Anfrage
       für die weitere Abstimmung nutzbarer.
      </p>
     </div>
    </div>
   </section>

   <section className="border-t border-foreground/5 px-6 py-20">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
       Häufige Fragen zu Kostenfaktoren und Preisrahmen
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
