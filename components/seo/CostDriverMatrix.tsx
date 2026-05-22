import Link from "next/link";
import { ArrowRight, Banknote, Building2, Home, PackageOpen, Sparkles } from "lucide-react";

export const costDriverGroups = [
 {
  icon: Home,
  service: "Umzug",
  href: "/umzug",
  intro: "Beim Umzug bestimmen nicht nur Kilometer den Aufwand, sondern vor allem Zugang, Volumen und Koordination.",
  drivers: ["Volumen und Zimmer", "Strecke und Zielort", "Etagen, Aufzug und Laufwege", "Montage, Zugang und Zeitfenster"],
 },
 {
  icon: Sparkles,
  service: "Reinigung",
  href: "/reinigung",
  intro: "Bei Reinigung zählen Fläche, Zustand und klares Übergabeziel stärker als eine pauschale Quadratmeterzahl.",
  drivers: ["Fläche und Objektart", "Zustand und Möblierung", "Fenster, Küche und Bad", "Terminlage und Extras"],
 },
 {
  icon: PackageOpen,
  service: "Entrümpelung",
  href: "/entruempelung",
  intro: "Bei Entrümpelung entstehen Unterschiede durch Material, Demontage, Laufwege und Entsorgungsgrenzen.",
  drivers: ["Volumen und Räume", "Materialarten", "Zugang und Laufweg", "Demontage und Sonderaufwand"],
 },
 {
  icon: Building2,
  service: "Büroumzug",
  href: "/bueroumzug",
  intro: "Beim Büroumzug zählen Arbeitsplätze, IT, Archiv und Betriebsruhe als eigene Planungsfaktoren.",
  drivers: ["Arbeitsplätze und Inventar", "IT, Archiv und Möbel", "Zeitfenster und Ladezone", "Firmenentsorgung und Reinigung"],
 },
];

export function CostDriverMatrix({ compact = false }: { compact?: boolean }) {
 return (
  <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-20"}`}>
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.08),transparent_42%)]" />
   <div className="relative mx-auto max-w-7xl">
    <div className="mb-9 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <Banknote className="h-4 w-4" />
       Kostenfaktoren
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Warum FLOXANT mit Preisrahmen statt Scheingenauigkeit arbeitet.
      </h2>
     </div>
     <p className="max-w-2xl text-sm leading-relaxed text-foreground/50 lg:ml-auto">
      Jeder Service hat andere Aufwandstreiber. Diese Matrix macht sichtbar, warum eine erste Einschätzung hilfreich ist und welche Angaben den nächsten Schritt belastbarer machen.
     </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
     {costDriverGroups.map((group) => {
      const Icon = group.icon;
      return (
       <article
        key={group.service}
        className="premium-scan group flex flex-col rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7"
       >
        <div className="flex items-center justify-between gap-4">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 text-blue-700 ">
          <Icon className="h-5 w-5" />
         </div>
         <span className="rounded-full border border-foreground/10 bg-white/[0.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/42">
          {group.service}
         </span>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-foreground/50">{group.intro}</p>
        <div className="mt-6 grid gap-2">
         {group.drivers.map((driver) => (
          <div key={driver} className="rounded-2xl border border-foreground/8 bg-foreground/5 px-4 py-3 text-sm font-medium text-foreground/62">
           {driver}
          </div>
         ))}
        </div>
        <Link
         href={group.href}
         className="mt-auto inline-flex items-center gap-2 pt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 "
        >
         Service ansehen
         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
       </article>
      );
     })}
    </div>

    <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-blue-300/15 bg-blue-500/[0.045] p-6 md:flex-row md:items-center md:justify-between">
     <p className="max-w-3xl text-sm leading-relaxed text-foreground/56">
      Der angezeigte Rahmen bleibt unverbindlich. Er wird besser, wenn Serviceart, Ort, Umfang, Zugang, Termin und Preisvorstellung sauber angegeben werden.
     </p>
     <Link
      href="/kostenfaktoren"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300/20 bg-blue-500/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800 hover:bg-blue-500/15"
     >
      Kostenfaktoren verstehen
      <ArrowRight className="h-3.5 w-3.5" />
     </Link>
    </div>
   </div>
  </section>
 );
}
