import { Metadata } from "next";
import Link from "next/link";
import {
 ArrowRight,
 ClipboardCheck,
 FileCheck2,
 MessageSquareText,
 Route,
 ShieldCheck,
 Sparkles,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CustomerIntentRouter } from "@/components/seo/CustomerIntentRouter";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Was bedeutet Qualität bei FLOXANT konkret?",
  a: "Qualität bedeutet klare Vorprüfung, nachvollziehbare Leistungsgrenzen, saubere Kommunikation, geeignete Einsatzplanung und ein Ablauf, der zu Umfang, Zugang, Termin und Region passt.",
 },
 {
  q: "Warum beginnt FLOXANT mit einer Vorprüfung?",
  a: "Umzug, Reinigung und Entrümpelung hängen stark von Umfang, Zugang, Laufwegen, Terminlage und Zusatzleistungen ab. Eine Vorprüfung verhindert falsche Preis- und Leistungsversprechen.",
 },
 {
  q: "Welche Rolle spielt der Rechner im Qualitätsprozess?",
  a: "Der Rechner sammelt die wichtigsten Angaben und macht Kostentreiber sichtbar. Er liefert einen unverbindlichen Orientierungsrahmen, aber kein finales Angebot.",
 },
 {
  q: "Wie bleibt der Ablauf für Kunden transparent?",
  a: "Kunden sehen, welche Faktoren relevant sind, welcher Serviceweg passt und welche Anschlussoptionen sinnvoll sind: Rechner, Express-Anfrage, Preisvorstellung oder ein konkreter Service.",
 },
 {
  q: "Gilt der Qualitätsprozess auch für Firmen und Private Client?",
  a: "Ja. Bei Firmen zählen zusätzlich Zeitfenster, Inventar, IT, Archiv und Betriebsruhe. Bei Private Client stehen Diskretion, Schutz wertvoller Gegenstände und ruhige Abstimmung im Vordergrund.",
 },
];

const pillars = [
 {
  icon: ClipboardCheck,
  title: "Saubere Vorprüfung",
  text: "Service, Ort, Umfang, Zugang, Termin und Zusatzleistungen werden so erfasst, dass daraus eine belastbare Einsatzgrundlage entsteht.",
 },
 {
  icon: ShieldCheck,
  title: "Ehrlicher Preisrahmen",
  text: "FLOXANT vermeidet Lockpreise. Die erste Einschätzung bleibt unverbindlich und erklärt sichtbar, welche Faktoren den Aufwand beeinflussen.",
 },
 {
  icon: MessageSquareText,
  title: "Klare Kommunikation",
  text: "Rückfragen, Preisvorstellung, Besonderheiten und nächste Schritte werden getrennt sichtbar, damit Kunden und Team dasselbe Bild haben.",
 },
 {
  icon: FileCheck2,
  title: "Übergabe und Abschluss",
  text: "Wo sinnvoll, wird der Abschluss mit Reinigung, Restmengen, Entsorgung oder Dokumentenlogik vorbereitet, ohne den Kunden im Prozess zu überladen.",
 },
];

const serviceLinks = [
 { href: "/umzug", label: "Umzug mit klarer Einsatzplanung" },
 { href: "/reinigung", label: "Reinigung mit definiertem Ergebnis" },
 { href: "/entruempelung", label: "Entrümpelung mit geregelter Entsorgung" },
 { href: "/bueroumzug", label: "Büroumzug mit Zeitfenster und Betriebsruhe" },
 { href: "/firmenentsorgung", label: "Firmenentsorgung für Büroinventar" },
 { href: "/private-client-service", label: "Private Client für sensible Haushalte" },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "qualitaet-ablauf",
  title: "FLOXANT Qualität & Ablauf | Vorprüfung, Sorgfalt, Planung",
  description:
   "Wie FLOXANT Umzug, Reinigung, Entrümpelung und Büroumzug vorbereitet: klare Vorprüfung, ehrlicher Preisrahmen, transparente Kommunikation.",
 });
}

export default function QualityProcessPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Qualität und Ablauf",
    description:
     "Qualitäts- und Ablaufseite zu Vorprüfung, Preisrahmen, Kommunikation und Umsetzung bei FLOXANT.",
    path: "/qualitaet-ablauf",
    about: [
     "FLOXANT",
     "Qualität",
     "Vorprüfung",
     "Preisrahmen",
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Büroumzug",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Qualität und Ablauf", item: "/qualitaet-ablauf" },
   ]),
   buildFaqJsonLd(faqItems),
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Qualität und Ablauf" }]} />

   <section className="relative px-6 pb-16 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_64%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 ">
      <ShieldCheck className="h-4 w-4" />
      FLOXANT Qualitätslogik
     </div>
     <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
      Erst sauber prüfen, dann stark umsetzen.
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/56">
      FLOXANT arbeitet nicht mit harten Schnellversprechen, sondern mit einer strukturierten
      Vorprüfung. So werden Umzug, Reinigung, Entrümpelung, Büroumzug und Zusatzleistungen
      für Regensburg und Bayern realistischer, klarer und besser planbar.
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
       href="/anfrage-mit-preisrahmen"
       className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
      >
       Preisvorstellung senden
      </Link>
     </div>
    </div>
   </section>

   <section className="px-6 pb-16">
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
     {pillars.map((item) => {
      const Icon = item.icon;
      return (
       <article
        key={item.title}
        className="premium-scan rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-7"
       >
        <Icon className="mb-5 h-7 w-7 text-blue-700 " />
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/50">{item.text}</p>
       </article>
      );
     })}
    </div>
   </section>

   <section className="border-y border-foreground/5 bg-slate-950/55 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <Route className="h-4 w-4" />
       Ablauf statt Zufall
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Der Prozess macht die Leistung verständlich.
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-foreground/50">
       Gute Dienstleistung beginnt vor dem Einsatz. Je besser Umfang, Zugang, Termin,
       Region und Ziel geklärt sind, desto weniger Reibung entsteht später bei Team,
       Fahrzeug, Material und Abschluss.
      </p>
     </div>
     <div className="grid gap-4">
      {[
       "Kunden verstehen vor der Anfrage, welche Faktoren den Aufwand bestimmen.",
       "FLOXANT trennt erste Orientierung und Kundenwunsch sauber.",
       "Rechner, Express-Anfrage, Preisrahmen und Service-Seiten führen klar zum nächsten Schritt.",
       "Keine Fake-Bewertungen, keine Garantie-Sprache, keine überzogenen Versprechen.",
      ].map((point) => (
       <div key={point} className="flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-5">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 " />
        <p className="text-sm leading-relaxed text-foreground/58">{point}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="px-6 py-20">
    <div className="mx-auto max-w-6xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       Gilt für alle wichtigen Servicewege
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
       Qualität ist kein einzelner Button, sondern die Struktur dahinter.
      </h2>
     </div>
     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {serviceLinks.map((link) => (
       <Link
        key={link.href}
        href={link.href}
        className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-foreground/10 bg-white/[0.025] p-6 text-foreground transition-all hover:-translate-y-1 hover:border-blue-300/25 hover:bg-blue-500/10"
       >
        <span className="text-base font-semibold">{link.label}</span>
        <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
       </Link>
      ))}
     </div>
    </div>
   </section>

   <CustomerIntentRouter compact />

   <section className="border-t border-foreground/5 px-6 py-20">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
       Häufige Fragen zu Qualität und Ablauf
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
