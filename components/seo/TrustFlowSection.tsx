import Link from "next/link";
import { ArrowRight, CalendarCheck2, ClipboardCheck, MessageSquareText, ShieldCheck } from "lucide-react";

const steps = [
 {
  icon: ClipboardCheck,
  label: "1",
  title: "Angaben sauber erfassen",
  text: "Service, Ort, Umfang, Zugang und Termin werden so abgefragt, dass daraus eine nutzbare Vorprüfung entsteht.",
 },
 {
  icon: ShieldCheck,
  label: "2",
  title: "Preisrahmen ehrlich einordnen",
  text: "FLOXANT zeigt Orientierung statt Scheingenauigkeit: Kostentreiber bleiben sichtbar und nachvollziehbar.",
 },
 {
  icon: CalendarCheck2,
  label: "3",
  title: "Machbarkeit prüfen",
  text: "Region, Zeitfenster, Team, Fahrzeug, Laufwege und Zusatzleistungen werden für die operative Planung zusammengeführt.",
 },
 {
  icon: MessageSquareText,
  label: "4",
  title: "Nächsten Schritt abstimmen",
  text: "Nach der Anfrage kann FLOXANT Rückfragen klären, Unterlagen ergänzen und den passenden Serviceweg bestätigen.",
 },
];

const pathways = [
 { href: "/rechner", label: "Rechner starten", tone: "blue" },
 { href: "/express-anfrage", label: "Express-Check", tone: "amber" },
 { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden", tone: "blue" },
 { href: "/qualitaet-ablauf", label: "Ablauf verstehen", tone: "blue" },
];

export function TrustFlowSection() {
 return (
  <section className="relative overflow-hidden px-6 py-24">
   <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/25 to-transparent" />
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_42%)]" />

   <div className="relative mx-auto max-w-7xl">
    <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
     <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       Anfrage-Qualität
      </div>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
       Aus einem Klick wird ein belastbarer Plan.
      </h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/48">
       FLOXANT führt Nutzer nicht in ein leeres Kontaktformular, sondern in eine strukturierte
       Anfrage. Das verbessert Erfahrung, Vertrauen und die Qualität der späteren Abstimmung.
      </p>
     </div>

     <div className="rounded-[2.2rem] border border-foreground/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
       {pathways.map((path) => (
        <Link
         key={path.href}
         href={path.href}
         className={
          path.tone === "amber"
           ? "group flex min-h-[92px] items-center justify-between rounded-[1.4rem] border border-amber-300/20 bg-amber-300/10 px-5 py-4 text-amber-50 transition hover:bg-amber-300/15"
           : "group flex min-h-[92px] items-center justify-between rounded-[1.4rem] border border-blue-300/20 bg-blue-500/10 px-5 py-4 text-blue-900 transition hover:bg-blue-500/15"
         }
        >
         <span className="text-sm font-bold">{path.label}</span>
         <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
       ))}
      </div>
     </div>
    </div>

    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
     {steps.map((step) => {
      const Icon = step.icon;
      return (
       <article
        key={step.title}
        className="premium-scan rounded-[2rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.052),rgba(255,255,255,0.018))] p-7"
       >
        <div className="flex items-center justify-between">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 text-blue-700 ">
          <Icon className="h-5 w-5" />
         </div>
         <span className="rounded-full border border-foreground/10 bg-white/[0.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/42">
          Schritt {step.label}
         </span>
        </div>
        <h3 className="mt-7 text-2xl font-semibold tracking-tight text-foreground">{step.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-foreground/46">{step.text}</p>
       </article>
      );
     })}
    </div>
   </div>
  </section>
 );
}
