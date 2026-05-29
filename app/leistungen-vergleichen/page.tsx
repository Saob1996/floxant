import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceMatchBoard, serviceComparisonRows } from "@/components/seo/ServiceMatchBoard";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Welche FLOXANT Leistung passt, wenn ich umziehe und reinigen lassen möchte?",
  a: "Wenn Transport und Übergabe zusammenhängen, ist Umzug mit Reinigung der sauberste Einstieg. Für eine erste Einordnung eignet sich der Rechner, weil Volumen, Fläche, Zugang und Termin getrennt erfasst werden.",
 },
 {
  q: "Wann ist Entrümpelung sinnvoller als ein normaler Umzug?",
  a: "Entrümpelung ist sinnvoll, wenn Räume frei werden müssen und Material, Laufwege, Demontage oder Entsorgung im Vordergrund stehen. Ein Umzug passt besser, wenn Gegenstände gezielt an einen neuen Ort transportiert werden.",
 },
 {
  q: "Wann sollte eine Firma Büroumzug statt Privatumzug wählen?",
  a: "Büroumzug ist besser, wenn Arbeitsplätze, IT, Archiv, Möbel, Betriebsruhe, Ladezone oder Zeitfenster koordiniert werden müssen. Dadurch werden typische Firmenrisiken früher sichtbar.",
 },
 {
  q: "Was ist der Unterschied zwischen Preisvorschlag und Rechner?",
  a: "Der Rechner erstellt einen unverbindlichen Orientierungsrahmen aus den Angaben. Eine Preisvorstellung des Kunden ist ein zusätzliches Budgetsignal und überschreibt die Systemeinschätzung nicht.",
 },
 {
  q: "Warum ist dieser Vergleich für Regensburg und Bayern relevant?",
  a: "FLOXANT arbeitet von Regensburg aus und prüft passende Einsätze in Bayern. Die richtige Servicewahl hängt deshalb immer auch von Region, Strecke, Terminlage und Umfang ab.",
 },
];

const decisionPrinciples = [
 "Erst die Situation klären: Transport, Reinigung, Räumung, Firma, Route oder sensibler Privathaushalt.",
 "Dann die Kostentreiber trennen: Volumen, Fläche, Zugang, Laufwege, Material, Termin und Zusatzleistungen.",
 "Danach den richtigen Einstieg wählen: Service-Seite, Rechner, Preisvorstellung oder Spezialservice.",
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "leistungen-vergleichen",
  title: "FLOXANT Leistungen vergleichen | Umzug, Reinigung & Entrümpelung",
  description:
   "Welche FLOXANT Leistung passt? Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt und Private Client für Regensburg und Bayern vergleichen.",
 });
}

export default function LeistungenVergleichenPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Leistungen vergleichen",
    description:
     "Service-Kompass für Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt und Private Client.",
    path: "/leistungen-vergleichen",
    about: [
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Büroumzug",
     "Leer-Rückfahrt",
     "Private Client Service",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Leistungen vergleichen", item: "/leistungen-vergleichen" },
   ]),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "FLOXANT Service-Kompass",
    itemListElement: serviceComparisonRows.map((row, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: row.bestFit,
     url: `${company.url}${row.href}`,
     description: `${row.situation}: ${row.text}`,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Leistungen vergleichen" }]} />

   <section className="relative px-6 pb-14 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[580px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_64%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 ">
      <Compass className="h-4 w-4" />
      Service-Kompass
     </div>
     <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
      FLOXANT Leistungen vergleichen und den richtigen Einstieg finden.
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
      Nicht jede Anfrage gehört sofort in denselben Service. Dieser Vergleich ordnet typische
      Kundensituationen sauber zu: Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt
      oder Private Client Service in Regensburg und Bayern.
     </p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/rechner"
       className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
      >
       Rechner starten
       <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
       href="/kostenfaktoren"
       className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
      >
       Kostenfaktoren verstehen
      </Link>
     </div>
    </div>
   </section>

   <ServiceMatchBoard compact />

   <section className="border-y border-foreground/5 bg-slate-950/55 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <ShieldCheck className="h-4 w-4" />
       Saubere Entscheidung
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Bessere Anfragen entstehen durch klare Servicewahl.
      </h2>
     </div>
     <div className="grid gap-4">
      {decisionPrinciples.map((item) => (
       <div key={item} className="flex gap-4 rounded-[1.5rem] border border-foreground/10 bg-white/[0.03] p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 " />
        <p className="text-sm leading-relaxed text-foreground/56">{item}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-foreground/5 px-6 py-20">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
       Häufige Fragen zur FLOXANT Service-Auswahl
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
