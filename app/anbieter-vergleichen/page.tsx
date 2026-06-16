import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Scale, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
 ProviderComparisonPanel,
 providerComparisonCriteria,
} from "@/components/seo/ProviderComparisonPanel";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Wie vergleicht man Umzugsfirmen in Regensburg sinnvoll?",
  a: "Sinnvoll ist ein Vergleich nach Preisrahmen, Zugang, Volumen, Strecke, Terminlage, Kommunikation und Ablauf. Ein sehr niedriger Onlinepreis ohne Kostentreiber ist oft weniger aussagekräftig als eine klare Einschätzung.",
 },
 {
  q: "Woran erkennt man eine gute Reinigungsfirma?",
  a: "Eine gute Reinigungsfirma fragt nach Fläche, Objektart, Zustand, Möblierung, Fenstern, Küche, Bad, Termin und Übergabeziel. Je klarer diese Punkte sind, desto realistischer wird die Einschätzung.",
 },
 {
  q: "Was unterscheidet Entrümpelung von normalem Transport?",
  a: "Bei Entrümpelung zählen Materialarten, Volumen, Laufwege, Demontage, Sonderaufwand und Entsorgungsgrenzen. Bei Transport steht der Weg von A nach B stärker im Vordergrund.",
 },
 {
  q: "Warum sollte man nicht nur den niedrigsten Preis vergleichen?",
  a: "Der niedrigste Preis kann wichtige Faktoren ausblenden. Für Kunden sind am Ende Transparenz, Machbarkeit, Terminrealismus, klare Kommunikation und ein sauberer Leistungsumfang entscheidend.",
 },
 {
  q: "Wie unterscheidet sich FLOXANT von anderen Anbietern?",
  a: "FLOXANT setzt auf strukturierte Einschätzung, unverbindlichen Orientierungsrahmen, sichtbare Kostentreiber, klare Servicewege und regionale Einordnung für Regensburg, Bayern und ausgewählte Spezialanfragen.",
 },
 {
  q: "Was ist der Unterschied zwischen FLOXANT und einem Vergleichsportal?",
  a: "Ein Vergleichsportal ist oft ein Vermittlungsweg. FLOXANT ist der direkte Dienstleister mit eigener Einschätzung: Anfrage, Preisrahmen, Zusatzleistungen, Region, Ablauf und spätere Umsetzung werden zusammen betrachtet.",
 },
 {
  q: "Wann ist FLOXANT besser als ein reiner Billigpreis?",
  a: "Wenn der Auftrag reale Kostentreiber hat: Etagen, Laufwege, Montage, Termin, Zugang, Reinigung, Entsorgung, Büroinventar oder Leer-Rückfahrt. Dann ist eine ehrliche Einschätzung wertvoller als ein sehr niedriger Einstiegspreis ohne Kontext.",
 },
];

const comparisonSteps = [
 "Nicht nur Preis ansehen, sondern klären, ob die Leistung vollständig beschrieben ist.",
 "Kostentreiber trennen: Volumen, Fläche, Zugang, Laufwege, Terminlage, Zusatzleistungen.",
 "Serviceweg wählen: Rechner, Preisvorstellung, Express, Leer-Rückfahrt oder direkter Hauptservice.",
 "Auf realistische Kommunikation achten: keine Festpreis-Anmutung ohne geklärten Umfang.",
];

const comparisonMatrix = [
 {
  criterion: "Wer prüft die Anfrage?",
  portal: "Häufig Vermittlung oder Weitergabe der Anfrage an mehrere Anbieter.",
  cheap: "Oft nur kurzer Preisanker ohne vollständige Leistungsklärung.",
  floxant: "Direkte FLOXANT Einschätzung mit Serviceart, Region, Umfang, Zugang und Termin.",
 },
 {
  criterion: "Wie entsteht der Preis?",
  portal: "Meist erst nach Weitergabe der Daten und Rückmeldung Dritter.",
  cheap: "Niedriger Einstiegspreis kann wichtige Kostentreiber ausblenden.",
  floxant: "Unverbindlicher Orientierungsrahmen mit sichtbaren Kostentreibern und Preisvorstellung.",
 },
 {
  criterion: "Welche besondere Situationen werden sauber erkannt?",
  portal: "Standardformular, oft wenig Trennung nach Sonderfall.",
  cheap: "Sonderleistungen werden häufig später nachverhandelt.",
  floxant: "Eigene Wege für Leer-Rückfahrt, Beiladung, Firmenentsorgung, Büroumzug und Umzug mit Reinigung.",
 },
 {
  criterion: "Wie klar ist der nächste Schritt?",
  portal: "Mehrere Kontakte, unklare Zuständigkeit möglich.",
  cheap: "Schnell, aber nicht immer sauber dokumentiert.",
  floxant: "Rechner, Express-Check, Preisvorschlag oder direkter Kontakt mit klarer Anschlusslogik.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "anbieter-vergleichen",
  title: "Umzugsfirma & Reinigungsfirma vergleichen | FLOXANT",
  description:
   "Anbieter für Umzug, Reinigung und Entrümpelung in Regensburg und Bayern vergleichen: Preisrahmen, Ablauf, Kostentreiber und Serviceklarheit einschätzen.",
 });
}

export default function AnbieterVergleichenPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Anbieter für Umzug, Reinigung und Entrümpelung vergleichen",
    description:
     "Objektive Vergleichskriterien für Umzugsfirma, Reinigungsfirma, Entrümpelung, Büroumzug und Zusatzleistungen.",
    path: "/anbieter-vergleichen",
    about: [
     "Umzugsfirma vergleichen",
     "Reinigungsfirma vergleichen",
     "Entrümpelung vergleichen",
     "Büroumzug",
     "Preisrahmen",
     "Kostentreiber",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Anbieter vergleichen", item: "/anbieter-vergleichen" },
   ]),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "Vergleichskriterien für Dienstleister",
    itemListElement: providerComparisonCriteria.map((criterion, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: criterion.title,
     url: `${company.url}${criterion.href}`,
     description: criterion.text,
    })),
   },
   {
    "@type": "ItemList",
    name: "FLOXANT Vergleich mit Portal und Billigangebot",
    itemListElement: comparisonMatrix.map((row, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: row.criterion,
     description: `Portal: ${row.portal} Billigangebot: ${row.cheap} FLOXANT: ${row.floxant}`,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Anbieter vergleichen" }]} />

   <section className="relative px-6 pb-14 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[590px] bg-[radial-gradient(circle_at_48%_0%,rgba(59,130,246,0.2),transparent_64%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 ">
      <Scale className="h-4 w-4" />
      Vergleich mit klarem Preisrahmen
     </div>
     <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
      Anbieter für Umzug, Reinigung und Entrümpelung richtig vergleichen.
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
      Wer verschiedene Firmen in Regensburg oder Bayern vergleicht, sollte nicht nur auf einen
      niedrigen Onlinepreis schauen. Entscheidend sind klare Leistung, realistische Einschätzung,
      transparente Kostentreiber, Terminlogik und ein sauberer nächster Schritt.
     </p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/rechner"
       className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
      >
       FLOXANT Rechner starten
       <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
       href="/leistungen-vergleichen"
       className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
      >
       Leistungen vergleichen
      </Link>
     </div>
    </div>
   </section>

   <section className="px-6 pb-12" aria-labelledby="vergleich-matrix">
    <div className="mx-auto max-w-7xl rounded-[2.35rem] border border-foreground/10 bg-[radial-gradient(circle_at_84%_0%,rgba(245,158,11,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.052),rgba(255,255,255,0.018))] p-5 shadow-2xl shadow-foreground/10">
     <div className="mb-5 flex flex-col gap-3 rounded-[1.8rem] border border-foreground/10 bg-foreground/5 p-6 md:flex-row md:items-end md:justify-between">
      <div>
       <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-500 ">
        FLOXANT vs Portal vs Billigangebot
       </p>
       <h2 id="vergleich-matrix" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        Der bessere Anbieter ist nicht immer der mit dem lautesten Preis.
       </h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-foreground/48 md:text-right">
       Diese Gegenüberstellung hilft Kunden, echte Qualität vor der Anfrage zu erkennen:
       Zuständigkeit, Preiswahrheit, besondere Situationen und nächster Schritt.
      </p>
     </div>

     <div className="grid gap-3">
      {comparisonMatrix.map((row) => (
       <article key={row.criterion} className="grid gap-3 rounded-[1.55rem] border border-foreground/10 bg-foreground/5 p-4 lg:grid-cols-[0.8fr_1fr_1fr_1fr]">
        <div className="rounded-2xl border border-foreground/10 bg-white/[0.03] p-4">
         <p className="text-[10px] font-black uppercase tracking-[0.16em] text-foreground/35">Kriterium</p>
         <h3 className="mt-2 text-lg font-semibold text-foreground">{row.criterion}</h3>
        </div>
        <div className="rounded-2xl border border-foreground/10 bg-white/[0.025] p-4">
         <p className="text-[10px] font-black uppercase tracking-[0.16em] text-foreground/35">Vergleichsportal</p>
         <p className="mt-2 text-sm leading-relaxed text-foreground/46">{row.portal}</p>
        </div>
        <div className="rounded-2xl border border-foreground/10 bg-white/[0.025] p-4">
         <p className="text-[10px] font-black uppercase tracking-[0.16em] text-foreground/35">Reiner Billigpreis</p>
         <p className="mt-2 text-sm leading-relaxed text-foreground/46">{row.cheap}</p>
        </div>
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
         <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-500 ">FLOXANT</p>
         <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/72">{row.floxant}</p>
        </div>
       </article>
      ))}
     </div>

     <div className="mt-5 grid gap-3 md:grid-cols-3">
      <Link href="/rechner" className="rounded-[1.4rem] bg-blue-500 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-foreground transition hover:bg-blue-400">
       Preisrahmen einschätzen
      </Link>
      <Link href="/leerfahrt-rueckfahrt" className="rounded-[1.4rem] border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-emerald-500  transition hover:bg-emerald-400/15">
       Leer-Rückfahrt nutzen
      </Link>
      <Link href="/kontakt" className="rounded-[1.4rem] border border-foreground/10 bg-white/[0.04] px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-foreground/72 transition hover:bg-white/[0.07] hover:text-foreground">
       Direkt Kontakt aufnehmen
      </Link>
     </div>
    </div>
   </section>

   <ProviderComparisonPanel compact />

   <section className="border-y border-foreground/5 bg-slate-950/55 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <ShieldCheck className="h-4 w-4" />
       Besser vergleichen
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Der faire Vergleich schützt vor falschen Erwartungen.
      </h2>
     </div>
     <div className="grid gap-4">
      {comparisonSteps.map((step) => (
       <div key={step} className="flex gap-4 rounded-[1.5rem] border border-foreground/10 bg-white/[0.03] p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 " />
        <p className="text-sm leading-relaxed text-foreground/56">{step}</p>
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
       Häufige Fragen zum Anbieter-Vergleich
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
