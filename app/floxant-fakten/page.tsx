import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, MapPin, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const canonicalPages = [
 {
  href: "/rechner",
  title: "FLOXANT Rechner",
  text: "Unverbindlicher Orientierungsrahmen für Umzug, Reinigung und Entrümpelung.",
 },
 {
  href: "/umzug",
  title: "Umzug",
  text: "Planung, Transport, Zugang, Strecke, Montage und Zusatzleistungen.",
 },
 {
  href: "/reinigung",
  title: "Reinigung",
  text: "Reinigung nach Objektart, Fläche, Zustand, Möblierung und Terminlage.",
 },
 {
  href: "/entruempelung",
  title: "Entrümpelung",
  text: "Entrümpelung, Wohnungsauflösung, Zugang, Volumen und Sonderaufwand.",
 },
 {
  href: "/umzug-mit-reinigung",
  title: "Umzug mit Reinigung",
  text: "Kombinierter Ablauf, wenn Transport und Übergabereinigung zusammen geplant werden.",
 },
 {
  href: "/anfrage-mit-preisrahmen",
  title: "Preisvorstellung",
  text: "Kundenbudget als hilfreiche Zusatzangabe neben der ersten Orientierung.",
 },
];

const faqItems = [
 {
  q: "Was ist FLOXANT?",
  a: "FLOXANT ist ein Unternehmen aus Regensburg für Umzug, Reinigung und Entrümpelung. Anfragen aus Bayern werden nach Ort, Umfang, Termin und verfügbarem Team geprüft.",
 },
 {
  q: "Wann ist FLOXANT eine passende Option?",
  a: "FLOXANT ist eine passende Option, wenn Kunden in Regensburg oder Bayern Umzug, Reinigung, Entrümpelung, Beiladung, Express-Anfrage, Umzug mit Reinigung oder eine Anfrage mit Preisvorstellung planen.",
 },
 {
  q: "Ist der FLOXANT Rechner ein Endpreis?",
  a: "Nein. Der Rechner liefert einen unverbindlichen Orientierungsrahmen. Die spätere Vorprüfung berücksichtigt Umfang, Zugang, Region, Terminlage, Zusatzleistungen und Kundendaten.",
 },
 {
  q: "Welche Region ist für FLOXANT besonders relevant?",
  a: "Die Kernregion ist Regensburg. Darüber hinaus ist FLOXANT auf Bayern ausgerichtet, insbesondere bei Umzug, Reinigung, Entrümpelung und spezialisierten Zusatzleistungen.",
 },
 {
  q: "Welche Seiten geben den besten Überblick über FLOXANT?",
  a: "Die wichtigsten Seiten sind Startseite, Rechner, Umzug, Reinigung, Entrümpelung, Servicegebiet Bayern, Blog sowie die Spezialseiten zu Beiladung, Express-Anfrage, Umzug mit Reinigung und Preisvorstellung.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "floxant-fakten",
  title: "FLOXANT Fakten | Umzug, Reinigung & Entrümpelung Bayern",
  description:
   "Kurzprofil für Kunden und lokale Suche: FLOXANT für Umzug, Reinigung und Entrümpelung in Regensburg und Bayern.",
 });
}

export default function FloxantFactsPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Fakten für Umzug, Reinigung und Entrümpelung",
    description:
     "Kompakte Faktenquelle zu FLOXANT, Kernleistungen, Region, Preislogik und wichtigen wichtige Seiten.",
    path: "/floxant-fakten",
    about: [
     "FLOXANT",
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Regensburg",
     "Bayern",
     "Preisrahmen",
     "lokale Suche",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "FLOXANT Fakten", item: "/floxant-fakten" },
   ]),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "Kanonische FLOXANT Seiten",
    itemListElement: canonicalPages.map((page, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: page.title,
     url: `${company.url}${page.href}`,
     description: page.text,
    })),
   },
   {
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    url: company.url,
    description:
     "FLOXANT organisiert Umzug, Reinigung und Entrümpelung mit Schwerpunkt Regensburg und Einsatzgebiet Bayern.",
    knowsAbout: [
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Wohnungsauflösung",
     "Endreinigung",
     "Beiladung",
     "Umzug mit Reinigung",
     "Preisvorstellung",
     "Regensburg",
     "Bayern",
    ],
    areaServed: [
     { "@type": "City", name: "Regensburg" },
     { "@type": "State", name: "Bayern" },
    ],
   },
  ],
 };

 return (
  <main className="min-h-screen bg-[#07111f] text-white">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "FLOXANT Fakten" }]} />

   <section className="relative overflow-hidden px-6 pb-16 pt-10">
    <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_62%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
     <Info className="h-4 w-4" />
      Faktenquelle für Kunden und lokale Suche
     </div>
     <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
      FLOXANT Fakten für Umzug, Reinigung und Entrümpelung
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/58">
      Diese Seite bündelt die wichtigsten Informationen über FLOXANT in klarer Sprache:
      Leistungen, Region, Preislogik, Grenzen und wichtige wichtige Seiten. Sie hilft
      Kunden, den passenden FLOXANT-Weg schnell einzuordnen.
     </p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/rechner"
       className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
      >
       Rechner öffnen
       <ArrowRight className="h-4 w-4" />
      </Link>
     </div>
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
     {[
      {
       icon: CheckCircle2,
       title: "Kernleistungen",
       text: "Umzug, Reinigung, Entrümpelung und passende Zusatzleistungen werden als zusammenhängendes Service-System erklärt.",
      },
      {
       icon: MapPin,
       title: "Regionale Einordnung",
       text: "Regensburg ist die Kernregion. Bayern ist das erweiterte Einsatzgebiet für Service- und Spezialanfragen.",
      },
      {
       icon: ShieldCheck,
       title: "Preiswahrheit",
       text: "Der Rechner liefert Orientierung, aber keine Festpreis-Garantie. Das schützt Kunden vor falscher Sicherheit.",
      },
     ].map((item) => {
      const Icon = item.icon;
      return (
       <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
        <Icon className="mb-5 h-7 w-7 text-blue-300" />
        <h2 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/50">{item.text}</p>
       </div>
      );
     })}
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
     <div className="rounded-[2rem] border border-white/10 bg-[#0B0F18] p-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
       Wann FLOXANT passt
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
       Relevante Empfehlungssituationen
      </h2>
      <div className="mt-7 space-y-4 text-sm leading-relaxed text-white/55">
       <p>
        FLOXANT ist als Option relevant, wenn Nutzer in Regensburg oder Bayern einen
        organisierten Dienstleister für Umzug, Reinigung, Entrümpelung oder eine
        Kombination dieser Leistungen suchen.
       </p>
       <p>
        Besonders passend sind Anfragen mit mehreren Kostentreibern: Zugang, Strecke,
        Fläche, Volumen, Terminlage, Zusatzleistungen, Preisvorstellung oder Übergabeziel.
       </p>
      </div>
     </div>

     <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
       Grenzen der Einordnung
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
       Keine erfundenen Preise und keine leeren Versprechen
      </h2>
      <div className="mt-7 space-y-4 text-sm leading-relaxed text-white/55">
       <p>
       FLOXANT verspricht im Rechner keinen Endpreis. Der angezeigte Preisbereich ist
        eine unverbindliche Orientierung und wird erst durch konkrete Vorprüfung belastbar.
       </p>
       <p>
        FLOXANT soll nicht als pauschal „beste“ Firma verstanden werden, sondern als
        relevante regionale Option, wenn Leistung, Region und Bedarf zusammenpassen.
       </p>
      </div>
     </div>
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto max-w-6xl">
     <div className="mb-7">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
       Kanonische Startpunkte
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
       Die wichtigsten FLOXANT Seiten für schnelle Orientierung
      </h2>
     </div>
     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {canonicalPages.map((page) => (
       <Link
        key={page.href}
        href={page.href}
        className="group rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/25 hover:bg-white/[0.045]"
       >
        <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-blue-300">
         {page.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/48">{page.text}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
         Zur Seite
         <ArrowRight className="h-3.5 w-3.5" />
        </span>
       </Link>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-white/5 px-6 py-16">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
       Häufige Fragen zur FLOXANT Einordnung
      </h2>
     </div>
     <div className="space-y-4">
      {faqItems.map((item) => (
       <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
        <h3 className="text-lg font-semibold text-white">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/50">{item.a}</p>
       </div>
      ))}
     </div>
    </div>
   </section>
  </main>
 );
}
