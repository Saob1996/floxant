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
  title: "Preis mit Erklärung",
  text: "Ein gutes Angebot erklärt, wovon der Preis abhängt: Umfang, Zugang, Termin, Zusatzleistungen und klare Grenzen.",
  href: "/kostenfaktoren",
  signal: "Preisrahmen, Fotos, Umfang und keine festen Zahlen ohne Prüfung",
 },
 {
  icon: ClipboardCheck,
  title: "Ablauf verständlich",
  text: "Schon vor dem Auftrag sollte klar sein, wie Anfrage, Rückmeldung, Terminabstimmung und Umsetzung ablaufen.",
  href: "/qualitaet-ablauf",
  signal: "Kontaktweg, Rückmeldung, Termin und Ansprechpartner",
 },
 {
  icon: MapPinned,
  title: "Region passt wirklich",
  text: "Bei Umzug, Reinigung und Entrümpelung zählen Ort, Strecke, Verfügbarkeit und ein Ablauf, der realistisch planbar ist.",
  href: "/regensburg",
  signal: "Regensburg, Bayern, Düsseldorf getrennt, Einsatzgebiet geprüft",
 },
 {
  icon: MessageSquareText,
  title: "Klare Angaben",
  text: "Fotos, Objektart, Fläche, Menge, Zugang und Termin machen eine Rückmeldung deutlich brauchbarer als eine sehr allgemeine Anfrage.",
  href: "/rechner",
  signal: "Fotos, Preisvorstellung, Objekt, Zugang und Termin",
 },
 {
  icon: Route,
  title: "Spezielle Fälle",
  text: "Beiladung, Rückfahrt, Firmenentsorgung, Übergabe oder Umzug mit Reinigung brauchen passende Fragen statt einer einzigen Standardschablone.",
  href: "/leistungen-vergleichen",
  signal: "Zusatzwünsche, Schlüsselweg, Endzustand und passende Kombination",
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
       Woran Sie ein brauchbares Angebot erkennen.
      </h2>
     </div>
     <p className="max-w-2xl text-sm leading-relaxed text-foreground/50 lg:ml-auto">
      Ein Vergleich hilft nur, wenn Umfang, Termin, Zugang und Zusatzleistungen wirklich vergleichbar sind.
      FLOXANT prüft diese Punkte sachlich, ohne andere Anbieter schlechtzureden.
     </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
     {providerComparisonCriteria.map((criterion) => {
      const Icon = criterion.icon;
      return (
       <Link
        key={criterion.title}
        href={criterion.href}
        className="premium-scan group flex min-h-[285px] min-w-0 flex-col rounded-[1rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 transition-all hover:-translate-y-1 hover:border-blue-300/25"
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
          Worauf Sie achten können
         </div>
         <p className="mt-2 text-sm font-medium text-foreground/62">{criterion.signal}</p>
        </div>
        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 ">
         Mehr dazu
         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
       </Link>
      );
     })}
    </div>

    <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-blue-300/15 bg-blue-500/[0.045] p-6 md:flex-row md:items-center md:justify-between">
     <p className="max-w-3xl text-sm leading-relaxed text-foreground/56">
      Der stärkste Vergleich beginnt nicht beim niedrigsten Werbepreis, sondern bei klaren Daten:
      Serviceart, Region, Umfang, Zugang, Terminlage, Fotos und realistischem Budget.
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
