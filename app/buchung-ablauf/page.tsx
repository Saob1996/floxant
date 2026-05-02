import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
 BookingProcessPanel,
 bookingActionCards,
 bookingDocumentSteps,
} from "@/components/seo/BookingProcessPanel";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Kann ich bei FLOXANT direkt buchen?",
  a: "Sie können direkt eine Anfrage oder Einschätzung starten. Eine verbindliche Beauftragung entsteht erst, wenn Leistung, Termin, Preisrahmen und Dokumente sauber abgestimmt sind.",
 },
 {
  q: "Was ist der Unterschied zwischen Rechner und Buchung?",
  a: "Der Rechner liefert eine unverbindliche Orientierung und sammelt wichtige Daten. Die Buchungsvorbereitung nutzt diese Angaben für Rückfragen, Angebot und mögliche Auftragsbestätigung.",
 },
 {
  q: "Welche Dokumente kann FLOXANT vorbereiten?",
  a: "Für eine Anfrage können Zusammenfassung, Angebot, Auftragsbestätigung und Rechnung vorbereitet werden. Die Inhalte bleiben administrierbar und können vor Versand geprüft werden.",
 },
 {
  q: "Ist das Absenden der Anfrage kostenpflichtig?",
  a: "Nein. Das Absenden startet die fachliche Einordnung. Kosten entstehen erst durch eine ausdrücklich abgestimmte Leistung oder Beauftragung.",
 },
 {
  q: "Warum ist der Ablauf für Kunden sicherer?",
  a: "Weil FLOXANT Preisrahmen, Kostentreiber, Kundendaten und Dokumente trennt. Dadurch entstehen weniger Missverständnisse und klarere Entscheidungen.",
 },
];

const clarityPoints = [
 "Sofort starten: Rechner, Express-Anfrage oder Preisvorstellung.",
 "Keine versteckte Sofortbindung durch das Absenden einer Anfrage.",
 "Dokumente bleiben kontrollierbar: erst Entwurf, dann Freigabe, dann Versand.",
 "System-Orientierungsrahmen und Kunden-Preisvorstellung bleiben getrennt sichtbar.",
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "buchung-ablauf",
  title: "FLOXANT Buchung & Ablauf | Rechner, Anfrage, Dokumente",
  description:
   "So funktioniert FLOXANT: direkt rechnen, Anfrage vorbereiten, Angebot und Auftragsbestätigung kontrolliert erhalten. Klarer Ablauf ohne versteckte Sofortbindung.",
 });
}

export default function BuchungAblaufPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Buchung und Ablauf",
    description:
     "Erklärung des Buchungsprozesses von Rechner und Anfrage bis Angebot, Auftragsbestätigung und Rechnung.",
    path: "/buchung-ablauf",
    about: [
     "Buchung",
     "Anfrage",
     "Rechner",
     "Angebot",
     "Auftragsbestätigung",
     "Rechnung",
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Buchung und Ablauf", item: "/buchung-ablauf" },
   ]),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "FLOXANT Buchungs- und Dokumentprozess",
    itemListElement: bookingDocumentSteps.map((step, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: step.title,
     url: `${company.url}/buchung-ablauf`,
     description: step.text,
    })),
   },
   {
    "@type": "ItemList",
    name: "FLOXANT direkte Einstiegspfade",
    itemListElement: bookingActionCards.map((card, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: card.title,
     url: `${company.url}${card.href}`,
     description: card.text,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Buchung & Ablauf" }]} />

   <section className="relative px-6 pb-14 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[590px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.21),transparent_64%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 ">
      <FileCheck className="h-4 w-4" />
      Klarer Buchungsprozess
     </div>
     <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
      Direkt rechnen, Anfrage vorbereiten und sauber beauftragen.
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
      FLOXANT macht den Weg vom ersten Bedarf zur Umsetzung transparent: zuerst
      Orientierungsrahmen und Einschätzung, dann Rückfragen, Angebot, Auftragsbestätigung
      und Rechnung. So bleibt der Prozess schnell, aber nicht übereilt.
     </p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/rechner"
       className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
      >
       Direkt rechnen
       <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
       href="/express-anfrage"
       className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
      >
       Express-Anfrage starten
      </Link>
     </div>
    </div>
   </section>

   <BookingProcessPanel compact />

   <section className="border-y border-foreground/5 bg-slate-950/55 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <ShieldCheck className="h-4 w-4" />
       Kundenfreundlich und kontrolliert
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Der Prozess zeigt früh, was verbindlich ist und was noch geprüft wird.
      </h2>
     </div>
     <div className="grid gap-4">
      {clarityPoints.map((point) => (
       <div key={point} className="flex gap-4 rounded-[1.5rem] border border-foreground/10 bg-white/[0.03] p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 " />
        <p className="text-sm leading-relaxed text-foreground/56">{point}</p>
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
       Häufige Fragen zu Buchung, Angebot und Dokumenten
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
