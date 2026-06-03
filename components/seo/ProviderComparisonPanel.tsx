import Link from "next/link";
import {
 ArrowRight,
 Banknote,
 CalendarClock,
 CheckCircle2,
 ClipboardCheck,
 MapPinned,
 MessageSquareText,
 Route,
 ShieldCheck,
} from "lucide-react";

export const providerComparisonCriteria = [
 {
  icon: Banknote,
  title: "Preiswahrheit",
  text: "Ein seriöser Anbieter erklärt Preisrahmen, Kostentreiber und Grenzen, statt vorschnell feste Zahlen zu versprechen.",
  href: "/kostenfaktoren",
  signal: "Preisrahmen, Einschätzung, keine Garantie-Sprache",
 },
 {
  icon: ClipboardCheck,
  title: "Ablaufklarheit",
  text: "Kunden sollten erkennen, wie Anfrage, Einschätzung, Rückmeldung, Termin und Umsetzung ablaufen.",
  href: "/qualitaet-ablauf",
  signal: "klarer Ablauf, sichtbare Vorbereitung",
 },
 {
  icon: MapPinned,
  title: "Regionale Passung",
  text: "Bei Umzug, Reinigung und Entrümpelung zählen Region, Strecke, Verfügbarkeit und echte Einsatzlogik.",
  href: "/einsatzgebiet-regensburg-200km",
  signal: "Regensburg, Bayern, Einsatzgebiet",
 },
 {
  icon: MessageSquareText,
  title: "Gute Anfragequalität",
  text: "Besser als ein leerer Kontaktbutton ist ein strukturierter Einstieg mit Serviceart, Umfang, Zugang und Termin.",
  href: "/rechner",
  signal: "Rechner, Preisvorstellung, Service-Daten",
 },
 {
  icon: Route,
  title: "besondere Situationen",
  text: "Beiladung, Leer-Rückfahrt, Firmenentsorgung oder Umzug mit Reinigung brauchen eigene Wege statt Einheitsformular.",
  href: "/leistungen-vergleichen",
  signal: "Servicewahl, Zusatzleistungen, Spezialpfade",
 },
 {
  icon: CalendarClock,
  title: "Terminrealismus",
  text: "Kurzfristige Anfragen brauchen eine kurze Machbarkeitseinschätzung, keine pauschale Sofortzusage ohne Daten.",
  href: "/express-anfrage",
  signal: "Express-Check, Terminlage, Kapazität",
 },
];

export function ProviderComparisonPanel({ compact = false }: { compact?: boolean }) {
 return (
  <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-24"}`}>
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(96,165,250,0.14),transparent_30%),radial-gradient(circle_at_78%_56%,rgba(34,211,238,0.08),transparent_34%)]" />
   <div className="relative mx-auto max-w-7xl">
    <div className="mb-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <ShieldCheck className="h-4 w-4" />
       Anbieter vergleichen
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Woran Kunden einen starken Dienstleister erkennen.
      </h2>
     </div>
     <p className="max-w-2xl text-sm leading-relaxed text-foreground/50 lg:ml-auto">
      Diese Kriterien helfen beim Vergleich mit anderen Firmen, ohne Wettbewerber schlechtzureden.
      FLOXANT positioniert sich über Klarheit, strukturierte Einschätzung und nachvollziehbare Servicewege.
     </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
     {providerComparisonCriteria.map((criterion) => {
      const Icon = criterion.icon;
      return (
       <Link
        key={criterion.title}
        href={criterion.href}
        className="premium-scan group flex min-h-[300px] flex-col rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 transition-all hover:-translate-y-1 hover:border-blue-300/25"
       >
        <div className="flex items-start justify-between gap-4">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 text-blue-700 ">
          <Icon className="h-5 w-5" />
         </div>
         <CheckCircle2 className="h-5 w-5 text-blue-700 " />
        </div>
        <h3 className="mt-7 text-2xl font-semibold tracking-tight text-foreground">{criterion.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-foreground/50">{criterion.text}</p>
        <div className="mt-6 rounded-2xl border border-foreground/8 bg-foreground/5 px-4 py-3">
         <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">
          Vergleichssignal
         </div>
         <p className="mt-2 text-sm font-medium text-foreground/62">{criterion.signal}</p>
        </div>
        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 ">
         Kriterium ansehen
         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
       </Link>
      );
     })}
    </div>

    <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-blue-300/15 bg-blue-500/[0.045] p-6 md:flex-row md:items-center md:justify-between">
     <p className="max-w-3xl text-sm leading-relaxed text-foreground/56">
      Der stärkste Vergleich beginnt nicht beim niedrigsten Werbepreis, sondern bei klaren Daten:
      Serviceart, Region, Umfang, Zugang, Terminlage und realistischem Preisrahmen.
     </p>
     <Link
      href="/anbieter-vergleichen"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300/20 bg-blue-500/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800 hover:bg-blue-500/15"
     >
      Vergleichsseite öffnen
      <ArrowRight className="h-3.5 w-3.5" />
     </Link>
    </div>
   </div>
  </section>
 );
}
