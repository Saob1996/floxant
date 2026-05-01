import Link from "next/link";
import {
 ArrowRight,
 Banknote,
 Building2,
 Crown,
 Home,
 PackageOpen,
 Route,
 Sparkles,
} from "lucide-react";

export const serviceComparisonRows = [
 {
  icon: Home,
  situation: "Wohnung oder Haus zieht um",
  bestFit: "Umzug",
  href: "/umzug",
  supportHref: "/umzug-mit-reinigung",
  supportLabel: "Umzug mit Reinigung",
  text: "Passend, wenn Transport, Volumen, Strecke, Zugang, Montage oder Haltezone geplant werden müssen.",
  signal: "Volumen, Zimmer, Strecke, Etagen",
 },
 {
  icon: Sparkles,
  situation: "Übergabe soll sauber funktionieren",
  bestFit: "Reinigung",
  href: "/reinigung",
  supportHref: "/endreinigung-regensburg",
  supportLabel: "Endreinigung Regensburg",
  text: "Passend, wenn Fläche, Zustand, Fenster, Küche, Bad und ein klares Übergabeziel wichtig sind.",
  signal: "Fläche, Zustand, Extras, Termin",
 },
 {
  icon: PackageOpen,
  situation: "Räume müssen frei werden",
  bestFit: "Entrümpelung",
  href: "/entruempelung",
  supportHref: "/kleinmengen-entsorgung",
  supportLabel: "Kleinmengen-Entsorgung",
  text: "Passend, wenn Mengen, Materialarten, Laufwege, Demontage oder Entsorgungsaufwand zu klären sind.",
  signal: "Volumen, Material, Zugang, Sonderaufwand",
 },
 {
  icon: Building2,
  situation: "Firma, Büro oder Standort verändert sich",
  bestFit: "Büroumzug",
  href: "/bueroumzug",
  supportHref: "/firmenentsorgung",
  supportLabel: "Firmenentsorgung",
  text: "Passend, wenn Arbeitsplätze, IT, Archiv, Möbel, Zeitfenster oder Büroinventar koordiniert werden.",
  signal: "Arbeitsplätze, IT, Archiv, Betriebsruhe",
 },
 {
  icon: Route,
  situation: "Menge passt zu einer Rückfahrt",
  bestFit: "Leer-Rückfahrt",
  href: "/leerfahrt-rueckfahrt",
  supportHref: "/beiladung",
  supportLabel: "Beiladung",
  text: "Passend, wenn Datum, Route und Menge zur freien Fahrt Richtung Regensburg oder Umgebung passen.",
  signal: "Datum, Route, Menge, Umweg",
 },
 {
  icon: Crown,
  situation: "Anwesen oder hochwertiger Haushalt",
  bestFit: "Private Client",
  href: "/private-client-service",
  supportHref: "/qualitaet-ablauf",
  supportLabel: "Qualität & Ablauf",
  text: "Passend, wenn Diskretion, ruhige Abstimmung, hochwertige Räume und besondere Sorgfalt entscheidend sind.",
  signal: "Diskretion, Zugang, Schutz, Abstimmung",
 },
];

export function ServiceMatchBoard({ compact = false }: { compact?: boolean }) {
 return (
  <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-24"}`}>
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(59,130,246,0.13),transparent_34%),radial-gradient(circle_at_80%_45%,rgba(14,165,233,0.08),transparent_34%)]" />
   <div className="relative mx-auto max-w-7xl">
    <div className="mb-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <Banknote className="h-4 w-4" />
       Service-Kompass
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Welche FLOXANT Leistung passt zu Ihrer Situation?
      </h2>
     </div>
     <p className="max-w-2xl text-sm leading-relaxed text-foreground/50 lg:ml-auto">
      Der Vergleich hilft, nicht erst die falsche Leistung zu öffnen. Wählen Sie die
      Situation, die Ihrem Fall am nächsten kommt, und springen Sie direkt zum passenden Weg.
     </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
     {serviceComparisonRows.map((row) => {
      const Icon = row.icon;
      return (
       <article
        key={row.situation}
        className="premium-scan group flex min-h-[360px] flex-col rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 transition-all hover:-translate-y-1 hover:border-blue-300/25"
       >
        <div className="flex items-center justify-between gap-4">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 text-blue-700 ">
          <Icon className="h-5 w-5" />
         </div>
         <span className="rounded-full border border-blue-300/15 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800 ">
          {row.bestFit}
         </span>
        </div>

        <h3 className="mt-7 text-2xl font-semibold tracking-tight text-foreground">{row.situation}</h3>
        <p className="mt-4 text-sm leading-relaxed text-foreground/50">{row.text}</p>

        <div className="mt-6 rounded-2xl border border-foreground/8 bg-foreground/5 p-4">
         <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">
          Für die Einschätzung wichtig
         </div>
         <p className="mt-2 text-sm font-medium text-foreground/62">{row.signal}</p>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
         <Link
          href={row.href}
         className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-blue-400"
        >
          Passenden Weg öffnen
          <ArrowRight className="h-3.5 w-3.5" />
         </Link>
         <Link
          href={row.supportHref}
          className="inline-flex flex-1 items-center justify-center rounded-2xl border border-foreground/10 bg-white/[0.035] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/62 transition hover:bg-white/[0.07] hover:text-foreground"
         >
          {row.supportLabel}
         </Link>
        </div>
       </article>
      );
     })}
    </div>

    <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-foreground/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between">
     <p className="max-w-3xl text-sm leading-relaxed text-foreground/54">
      Wenn mehrere Situationen zutreffen, ist der Rechner der sicherste Einstieg. Dort werden Serviceart,
      Region, Zugang, Termin und Preisvorstellung getrennt erfasst.
     </p>
     <Link
      href="/leistungen-vergleichen"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300/20 bg-blue-500/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800 hover:bg-blue-500/15"
     >
      Leistungen vergleichen
      <ArrowRight className="h-3.5 w-3.5" />
     </Link>
    </div>
   </div>
  </section>
 );
}
