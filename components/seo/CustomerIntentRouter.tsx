import Link from "next/link";
import { ArrowRight, Building2, Home, PackageCheck, Route, Sparkles } from "lucide-react";

const routes = [
 {
  icon: Home,
  label: "Privat",
  title: "Wohnung, Haus oder Übergabe",
  text: "Für Umzug, Endreinigung, Restmengen, Keller, Möbel und eine saubere Schlüsselübergabe.",
  href: "/umzug-mit-reinigung",
  action: "Kombiservice prüfen",
 },
 {
  icon: Building2,
  label: "Firma",
  title: "Büro, Inventar oder Standort",
  text: "Für Büroumzug, Firmenentsorgung, Arbeitsplätze, Archiv, Zeitfenster und Betriebsruhe.",
  href: "/bueroumzug",
  action: "Firmenweg ansehen",
 },
 {
  icon: PackageCheck,
  label: "Klarheit",
  title: "Erst Preisrahmen verstehen",
  text: "Für Kunden, die Aufwand, Kostentreiber und Preisvorstellung vor der Anfrage sauber einordnen möchten.",
  href: "/rechner",
  action: "Rechner starten",
 },
 {
  icon: Route,
  label: "Route",
  title: "Leer-Rückfahrt oder Beiladung",
  text: "Für Teilmengen, Möbel, Kartons oder Büroinventar, wenn Datum und Strecke Richtung Regensburg passen.",
  href: "/leerfahrt-rueckfahrt",
  action: "Rückfahrt prüfen",
 },
];

export function CustomerIntentRouter({ compact = false }: { compact?: boolean }) {
 return (
  <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-20"}`}>
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.07),transparent_42%)]" />
   <div className="relative mx-auto max-w-7xl">
    <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
       <Sparkles className="h-4 w-4" />
       Entscheidungshilfe
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
       Starten Sie dort, wo Ihr Fall gerade steht.
      </h2>
     </div>
     <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">
      Manche wissen schon genau, was gebraucht wird. Andere müssen erst Aufwand,
      Termin und Preisrahmen einordnen. Diese Wege führen schneller zum richtigen Einstieg.
     </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
     {routes.map((item) => {
      const Icon = item.icon;
      return (
       <Link
        key={item.href}
        href={item.href}
        className="premium-scan group flex min-h-[300px] flex-col rounded-[2rem] border border-slate-200 bg-white/80 p-7 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"
       >
        <div className="flex items-center justify-between gap-4">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
         </div>
         <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {item.label}
         </span>
        </div>
        <h3 className="mt-7 text-2xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
         {item.action}
         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
       </Link>
      );
     })}
    </div>
   </div>
  </section>
 );
}
