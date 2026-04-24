import Link from "next/link";
import {
 ArrowRight,
 Banknote,
 Calculator,
 ClipboardCheck,
 FileCheck,
 FileText,
 ReceiptText,
 Send,
 ShieldCheck,
 Zap,
} from "lucide-react";

export const bookingActionCards = [
 {
  icon: Calculator,
  title: "Direkt rechnen",
  text: "Service auswählen, Angaben erfassen und einen unverbindlichen Orientierungsrahmen erhalten.",
  href: "/rechner",
  action: "Rechner starten",
 },
 {
  icon: Zap,
  title: "Express prüfen",
  text: "Für kurzfristige Fälle mit wenigen Eckdaten und schneller Machbarkeitsprüfung.",
  href: "/express-anfrage",
  action: "Express-Check öffnen",
 },
 {
  icon: Banknote,
  title: "Preisvorstellung senden",
  text: "Eigenes Zielbudget ergänzen, ohne dass es die System-Einschätzung überschreibt.",
  href: "/anfrage-mit-preisrahmen",
  action: "Preisrahmen anfragen",
 },
];

export const bookingDocumentSteps = [
 {
  icon: FileText,
  title: "Anfrage-Zusammenfassung",
  text: "Ihre Angaben werden strukturiert gesichert: Service, Umfang, Region, Kostentreiber und Kontakt.",
 },
 {
  icon: FileCheck,
  title: "Angebot",
  text: "Nach Prüfung kann FLOXANT ein bearbeitbares Angebot mit Leistungen, Positionen und Bedingungen erstellen.",
 },
 {
  icon: ClipboardCheck,
  title: "Auftragsbestätigung",
  text: "Erst wenn Umfang und Termin abgestimmt sind, entsteht eine klare Bestätigung für die Umsetzung.",
 },
 {
  icon: ReceiptText,
  title: "Rechnung",
  text: "Nach Leistung oder gemäß Vereinbarung folgt eine Rechnung mit kontrollierten Positionen.",
 },
];

export function BookingProcessPanel({ compact = false }: { compact?: boolean }) {
 return (
  <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-24"}`}>
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_82%_42%,rgba(34,211,238,0.08),transparent_32%)]" />
   <div className="relative mx-auto max-w-7xl">
    <div className="mb-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <ShieldCheck className="h-4 w-4" />
       Rechnen oder Buchung vorbereiten
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       Vom ersten Preisrahmen zur kontrollierten Beauftragung.
      </h2>
     </div>
     <p className="max-w-2xl text-sm leading-relaxed text-foreground/50 lg:ml-auto">
      FLOXANT trennt bewusst Orientierung, Prüfung und Auftrag. Kunden können sofort starten,
      bleiben aber geschützt: Kein harter Endpreis, keine versteckte Sofortbindung, klare Dokumentkette.
     </p>
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
     {bookingActionCards.map((card) => {
      const Icon = card.icon;
      return (
       <Link
        key={card.href}
        href={card.href}
        className="premium-scan group rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 transition-all hover:-translate-y-1 hover:border-blue-300/25"
       >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 text-blue-700 ">
         <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-7 text-2xl font-semibold tracking-tight text-foreground">{card.title}</h3>
        <p className="mt-4 min-h-[72px] text-sm leading-relaxed text-foreground/50">{card.text}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 ">
         {card.action}
         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
       </Link>
      );
     })}
    </div>

    <div className="mt-8 rounded-[2rem] border border-foreground/10 bg-white/[0.03] p-6 md:p-8">
     <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
       <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 ">
        Dokumentkette
       </div>
       <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Was nach dem Absenden entstehen kann.
       </h3>
      </div>
      <Link
       href="/buchung-ablauf"
       className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 "
      >
       Ablauf im Detail
       <ArrowRight className="h-3.5 w-3.5" />
      </Link>
     </div>

     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {bookingDocumentSteps.map((step, index) => {
       const Icon = step.icon;
       return (
        <div key={step.title} className="rounded-[1.5rem] border border-foreground/8 bg-foreground/5 p-5">
         <div className="flex items-center justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-white/[0.035] text-blue-700 ">
           <Icon className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/30">
           Schritt {index + 1}
          </span>
         </div>
         <h4 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h4>
         <p className="mt-3 text-sm leading-relaxed text-foreground/48">{step.text}</p>
        </div>
       );
      })}
     </div>

     <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-blue-300/15 bg-blue-500/[0.055] p-5 md:flex-row md:items-center md:justify-between">
      <p className="max-w-3xl text-sm leading-relaxed text-foreground/58">
       Wichtig: Die Anfrage startet die fachliche Prüfung. Eine verbindliche Beauftragung entsteht erst,
       wenn Leistung, Termin und Dokumente sauber abgestimmt sind.
      </p>
      <Link
       href="/rechner"
       className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-950 hover:bg-blue-400"
      >
       Jetzt starten
       <Send className="h-3.5 w-3.5" />
      </Link>
     </div>
    </div>
   </div>
  </section>
 );
}
