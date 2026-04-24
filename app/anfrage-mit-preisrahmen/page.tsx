import { Metadata } from "next";
import Link from "next/link";
import { Banknote, ShieldCheck, Target, Wallet } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BudgetContactForm } from "@/components/BudgetContactForm";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildServiceJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "anfrage-mit-preisrahmen",
  title: "Anfrage mit Preisvorstellung in Regensburg und Bayern | FLOXANT",
  description:
   "Teilen Sie FLOXANT Ihre Preisvorstellung für Umzug, Reinigung oder Entrümpelung mit. Die Angabe bleibt unverbindlich und ergänzt die spätere Vorprüfung.",
 });
}

export default function BudgetPage() {
 const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Anfrage mit Preisrahmen" },
 ];

 const faqItems = [
  {
   q: "Was ist eine Anfrage mit Preisvorstellung?",
   a: "Sie teilen uns Ihren finanziellen Rahmen mit, damit FLOXANT die spätere Vorprüfung und die passende Leistungszusammenstellung besser einordnen kann.",
  },
  {
   q: "Ersetzt mein Budget die FLOXANT Einschätzung?",
   a: "Nein. Ihre Preisvorstellung ergänzt die System- und Teamprüfung, ersetzt sie aber nicht. Im Backoffice bleiben beide Werte getrennt sichtbar.",
  },
  {
   q: "Ist meine Anfrage damit verbindlich?",
   a: "Nein. Ihre Preisvorstellung ist unverbindlich. Erst nach finaler Abstimmung und konkreter Freigabe entsteht ein Auftrag.",
  },
  {
   q: "Wann ist diese Seite sinnvoll?",
   a: "Wenn Sie einen klaren Budgetkorridor haben, Varianten vergleichen wollen oder vorab wissen möchten, welche Leistungen sich in Ihrem Rahmen sinnvoll priorisieren lassen.",
  },
  {
   q: "Funktioniert das für Umzug, Reinigung und Entrümpelung?",
   a: "Ja. Gerade bei regionalen Einsätzen in Regensburg und Bayern hilft eine frühe Preisvorstellung dabei, Aufwand, Terminlage und Zusatzleistungen sauber zu steuern.",
  },
 ];

 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Anfrage mit Preisrahmen", item: "/anfrage-mit-preisrahmen" },
   ]),
   buildServiceJsonLd({
    name: "Anfrage mit Preisvorstellung für Umzug, Reinigung und Entrümpelung",
    description:
     "Budget-orientierte Anfrage für Regensburg und Bayern, bei der Kunden ihre Preisvorstellung unverbindlich übermitteln.",
    path: "/anfrage-mit-preisrahmen",
    areaServed: ["Regensburg", "Bayern"],
   }),
   buildWebPageJsonLd({
    name: "Preisvorstellung und Budget-Anfrage | FLOXANT",
    description:
     "Teilen Sie FLOXANT unverbindlich Ihr Zielbudget mit und lassen Sie die passende Vorprüfung vorbereiten.",
    path: "/anfrage-mit-preisrahmen",
    about: ["Preisvorstellung", "Budgetplanung", "Umzug", "Reinigung", "Entrümpelung", "Bayern"],
   }),
   buildFaqJsonLd(faqItems),
  ],
 };

 return (
  <main className="min-h-screen bg-background text-white">
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
   />

   <Breadcrumbs lang="de" items={breadcrumbs} />

   <section className="relative overflow-hidden px-6 pb-20 pt-16">
    <div className="absolute inset-x-0 top-0 h-[500px] bg-blue-600/5 blur-[120px]" />
    <div className="mx-auto max-w-6xl text-center">
     <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
      <Banknote size={14} className="text-blue-400" />
      Preisvorstellung und Vorprüfung
     </div>
     <h1 className="mb-8 text-4xl font-bold tracking-tight text-white md:text-7xl">
      Ihr Rahmen. Unsere ehrliche Vorprüfung.
     </h1>
     <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/50">
      Diese Seite ist für Kunden gedacht, die bereits ein Zielbudget oder eine
      Preisvorstellung haben. FLOXANT nutzt diese Angabe nicht als Zusage, sondern als
      zusätzliches Signal für die spätere Einsatzplanung in Regensburg und Bayern.
     </p>
    </div>
   </section>

   <section className="border-y border-white/5 bg-white/[0.01] px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-6 text-start md:grid-cols-3">
     {[
      {
       icon: Target,
       title: "Bessere Priorisierung",
       text: "Ein früher Budgethinweis hilft dabei, Umfang, Zusatzleistungen und Terminwunsch realistischer einzuordnen.",
      },
      {
       icon: ShieldCheck,
       title: "Keine falsche Preiszusage",
       text: "Ihre Angabe bleibt unverbindlich. Erst die konkrete Vorprüfung zeigt, welche Leistung in diesem Rahmen sinnvoll umsetzbar ist.",
      },
      {
       icon: Wallet,
       title: "System und Kundenwunsch getrennt",
       text: "Später stehen System-Orientierungsrahmen und Kunden-Preisvorstellung nebeneinander, damit Entscheidungen nachvollziehbar bleiben.",
      },
     ].map((item) => {
      const Icon = item.icon;
      return (
       <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <Icon className="mb-5 h-8 w-8 text-blue-400" />
        <h2 className="mb-3 text-xl font-bold">{item.title}</h2>
        <p className="leading-relaxed text-white/60">{item.text}</p>
       </div>
      );
     })}
    </div>
   </section>

   <section className="px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
     <div className="rounded-[2rem] border border-white/10 bg-[#0B0B14] p-8">
      <h2 className="text-3xl font-bold text-white">Wie FLOXANT Ihre Preisvorstellung nutzt</h2>
      <div className="mt-8 space-y-6 text-white/65">
       <div>
        <h3 className="text-lg font-semibold text-white">1. Was ist das?</h3>
        <p className="mt-2">
         Eine unverbindliche Budget-Anfrage für Umzug, Reinigung oder Entrümpelung.
        </p>
       </div>
       <div>
        <h3 className="text-lg font-semibold text-white">2. Für wen ist das sinnvoll?</h3>
        <p className="mt-2">
         Für Kunden mit klarem Kostenkorridor, für sensible Projekte und für Fälle,
         in denen Varianten geprüft werden sollen.
        </p>
       </div>
       <div>
        <h3 className="text-lg font-semibold text-white">3. Wie läuft es ab?</h3>
        <p className="mt-2">
         Sie übermitteln Service, Kontaktdaten und Ihre Preisvorstellung. Danach kann
         FLOXANT Ihre Angaben mit Umfang, Zugang, Region und Zusatzleistungen abgleichen.
        </p>
       </div>
       <div>
        <h3 className="text-lg font-semibold text-white">4. Wo ist die Grenze?</h3>
        <p className="mt-2">
         Ein Budget alleine erzeugt keinen garantierten Preis. Es ist ein hilfreiches
         Signalsystem, keine Preiszusage.
        </p>
       </div>
      </div>
     </div>

     <div className="rounded-[2rem] border border-white/10 bg-black/30 p-4 shadow-2xl backdrop-blur-xl">
      <BudgetContactForm className="border-0 bg-transparent p-4 shadow-none sm:p-6" />
     </div>
    </div>
   </section>

   <section className="px-6 py-20">
    <div className="mx-auto max-w-4xl">
     <h2 className="mb-12 text-center text-3xl font-bold">Häufige Fragen zum Preisrahmen</h2>
     <div className="space-y-6">
      {faqItems.map((item) => (
       <div key={item.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
        <h3 className="mb-4 text-xl font-bold text-blue-400/90">{item.q}</h3>
        <p className="leading-relaxed text-white/60">{item.a}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-white/5 px-6 py-16">
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
     {[
      { href: "/rechner", label: "Rechner als Einstieg" },
      { href: "/umzug", label: "Umzug als Hauptservice" },
      { href: "/reinigung", label: "Reinigung als Hauptservice" },
      { href: "/entruempelung", label: "Entrümpelung als Hauptservice" },
     ].map((item) => (
      <Link
       key={item.href}
       href={item.href}
       className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:text-white"
      >
       {item.label}
      </Link>
     ))}
    </div>
   </section>
  </main>
 );
}
