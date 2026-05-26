import Link from "next/link";
import { ArrowRight, Building2, Home, PackageCheck, Route, ShieldCheck } from "lucide-react";

const scenarios = [
 {
  icon: Home,
  label: "Privat",
  title: "Wohnung, Haus oder Übergabe steht an",
  text: "FLOXANT ordnet Volumen, Zugang, Terminlage, Reinigung und mögliche Restmengen in einem Ablauf ein.",
  facts: ["Umzug", "Endreinigung", "Entrümpelung"],
  href: "/umzug-mit-reinigung",
  action: "Kombiservice ansehen",
 },
 {
  icon: Building2,
  label: "Firma",
  title: "Büro, Inventar oder Standortwechsel",
  text: "Arbeitsplätze, IT, Archiv, Möbel, Zeitfenster und Firmenentsorgung werden als zusammenhängende Planung betrachtet.",
  facts: ["Büroumzug", "Firmenentsorgung", "Reinigung"],
  href: "/bueroumzug",
  action: "Büroumzug ansehen",
 },
 {
  icon: Route,
  label: "Rückfahrt",
  title: "Freie Kapazität Richtung Regensburg nutzen",
  text: "Wenn Route, Datum, Volumen und Umweg passen, kann eine Leer-Rückfahrt für Möbel, Kartons oder Büroinventar sinnvoll sein.",
  facts: ["Leer-Rückfahrt", "Beiladung", "Teiltransport"],
  href: "/leerfahrt-rueckfahrt",
  action: "Rückfahrten ansehen",
 },
 {
  icon: PackageCheck,
  label: "Preisrahmen",
  title: "Erst Klarheit, dann Anfrage",
  text: "Der Rechner zeigt keine Scheingenauigkeit, sondern einen unverbindlichen Orientierungsrahmen mit sichtbaren Kostentreibern.",
  facts: ["Rechner", "Einschätzung", "Preisvorstellung"],
  href: "/rechner",
  action: "Rechner starten",
 },
];

export function DecisionProofGrid() {
 return (
  <section className="relative overflow-hidden border-y border-foreground/5 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_38%)] px-6 py-24">
   <div className="mx-auto max-w-7xl">
    <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
     <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       Nutzerszenarien
      </div>
      <h2 className="mt-4 max-w-[14ch] text-4xl font-semibold flox-display-hero text-foreground md:text-6xl">
       Schnell erkennen, welcher FLOXANT Weg passt.
      </h2>
     </div>
     <p className="max-w-2xl text-lg leading-relaxed text-foreground/48 lg:ml-auto">
      Diese Beispiele verbinden Anliegen, Service und Anfrageweg. Kunden müssen nicht raten,
      ob sie Umzug, Reinigung, Entrümpelung, Büroumzug oder Leer-Rückfahrt brauchen.
     </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
     {scenarios.map((scenario) => {
      const Icon = scenario.icon;
      return (
       <Link
        key={scenario.href}
        href={scenario.href}
        className="premium-scan group flex min-h-[360px] flex-col rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.022))] p-7 transition-all hover:-translate-y-1 hover:border-blue-300/25"
       >
        <div className="flex items-center justify-between gap-4">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 text-blue-700 ">
          <Icon className="h-5 w-5" />
         </div>
         <span className="rounded-full border border-foreground/10 bg-white/[0.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/40">
          {scenario.label}
         </span>
        </div>
        <h3 className="mt-7 text-2xl font-semibold tracking-tight text-foreground">{scenario.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-foreground/48">{scenario.text}</p>
        <div className="mt-6 flex flex-wrap gap-2">
         {scenario.facts.map((fact) => (
          <span key={fact} className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/42">
           {fact}
          </span>
         ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 ">
         {scenario.action}
         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
       </Link>
      );
     })}
    </div>

    <div className="mt-8 rounded-[2rem] border border-emerald-300/15 bg-emerald-400/[0.035] p-6">
     <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
       <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-emerald-600 ">
        <ShieldCheck className="h-5 w-5" />
       </div>
       <div>
        <h3 className="text-xl font-semibold text-foreground">Keine vorschnelle Pauschale, keine falsche Garantie.</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/48">
         FLOXANT trennt Orientierung, Kundendaten, Preisvorstellung und spätere Abstimmung. Das macht die Anfrage klarer und für die Umsetzung besser nutzbar.
        </p>
       </div>
      </div>
      <Link href="/blog/preisrahmen-vorpruefung-statt-festpreis" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 ">
       Preislogik verstehen
       <ArrowRight className="h-3.5 w-3.5" />
      </Link>
     </div>
    </div>
   </div>
  </section>
 );
}
