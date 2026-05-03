import Link from "next/link";
import {
 ArrowRight,
 Banknote,
 ClipboardCheck,
 MapPinned,
 MessageCircle,
 Route,
 ShieldCheck,
} from "lucide-react";
import { company } from "@/lib/company";

const confidenceSignals = [
 {
  icon: Banknote,
  title: "Preisrahmen mit Kontext",
  text: "FLOXANT zeigt eine unverbindliche Orientierung und erklärt, welche Faktoren den Aufwand wirklich beeinflussen: Umfang, Zugang, Strecke, Extras und Termin.",
  href: "/kostenfaktoren",
  label: "Kostenfaktoren",
 },
 {
  icon: ClipboardCheck,
  title: "Anfrage mit nutzbaren Daten",
  text: "Serviceart, Umfang, Zugang, Termin, Preisvorstellung und Übergabeziel werden so erfasst, dass daraus eine echte Prüfung entsteht.",
  href: "/buchung",
  label: "Buchung",
 },
 {
  icon: Route,
  title: "Ablauf statt Formular-Leere",
  text: "Kunden sehen, was nach dem Absenden passiert: Prüfung, Rückfrage, Angebot, Bestätigung und saubere Durchführung.",
  href: "/buchung-ablauf",
  label: "Buchung & Ablauf",
 },
 {
  icon: MapPinned,
  title: "Einsatzgebiet ehrlich geprüft",
  text: "Regensburg ist die Basis. Weitere Orte werden nach Verfügbarkeit, Route und Machbarkeit geprüft, statt pauschal alles zu versprechen.",
  href: "/einsatzgebiet-regensburg-200km",
  label: "Einsatzgebiet",
 },
 {
  icon: MessageCircle,
  title: "Direkter Kontakt möglich",
  text: "Wer nicht rechnen möchte, kann FLOXANT direkt erreichen und den passenden Anfrageweg gemeinsam klären.",
  href: "/kontakt",
  label: "Kontakt",
 },
];

type ServiceConfidencePanelProps = {
 compact?: boolean;
 pagePath?: string;
 eyebrow?: string;
 title?: string;
 intro?: string;
};

function absoluteUrl(path: string) {
 return `${company.url}${path}`;
}

export function ServiceConfidencePanel({
 compact = false,
 pagePath = "/",
 eyebrow = "Vertrauenssignale",
 title = "Warum FLOXANT vor der Anfrage mehr Klarheit gibt.",
 intro = "Diese Punkte helfen, eine Anfrage besser einzuordnen: keine Scheingenauigkeit, keine falschen Garantien, sondern ein nachvollziehbarer Ablauf und eine ehrliche Prüfung der Machbarkeit.",
}: ServiceConfidencePanelProps) {
 const sectionId = "vertrauenssignale";
 const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${absoluteUrl(pagePath)}#${sectionId}`,
  name: "FLOXANT Vertrauenssignale",
  description: intro,
  numberOfItems: confidenceSignals.length,
  itemListElement: confidenceSignals.map((item, index) => ({
   "@type": "ListItem",
   position: index + 1,
   name: item.title,
   url: absoluteUrl(item.href),
   description: item.text,
  })),
 };

 return (
  <section id={sectionId} className={`relative overflow-hidden bg-[#f4f8ff] px-6 text-slate-950 ${compact ? "py-12" : "py-24"}`}>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.13),transparent_34%),radial-gradient(circle_at_88%_42%,rgba(14,165,233,0.08),transparent_32%)]" />
   <div className="relative mx-auto max-w-7xl">
    <div className="mb-9 grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
     <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
       <ShieldCheck className="h-4 w-4" />
       {eyebrow}
      </div>
      <h2 className={`${compact ? "mt-4 text-3xl md:text-4xl" : "mt-5 text-4xl md:text-6xl"} font-semibold tracking-tight text-slate-950`}>
       {title}
      </h2>
     </div>
     <p className="max-w-2xl text-sm leading-relaxed text-slate-600 lg:ml-auto lg:text-right">
      {intro}
     </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
     {confidenceSignals.map((item) => {
      const Icon = item.icon;
      return (
       <Link
        key={item.href}
        href={item.href}
        className="premium-scan group flex min-h-[280px] flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-blue-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
       >
        <div className="flex items-start justify-between gap-4">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
         </div>
         <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
          {item.label}
         </span>
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
         Mehr ansehen
         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
       </Link>
      );
     })}
    </div>

    <div className="mt-6 grid gap-4 rounded-[2rem] border border-blue-100 bg-white/80 p-5 shadow-sm md:grid-cols-[1fr_auto_auto_auto] md:items-center">
     <p className="text-sm leading-relaxed text-slate-600">
      Starker nächster Schritt: erst Aufwand, Zugang und Übergabeziel einordnen, dann mit FLOXANT abstimmen. So bleibt die Anfrage schnell und trotzdem sauber vorbereitet.
     </p>
     <Link
      href="/buchung"
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-blue-700/25 hover:bg-blue-500"
     >
      Anfrage starten
      <ArrowRight className="h-3.5 w-3.5" />
     </Link>
     <Link
      href="/rechner"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 hover:border-blue-200 hover:bg-blue-100"
     >
      Rechner starten
      <ArrowRight className="h-3.5 w-3.5" />
     </Link>
     <Link
      href="/kontakt"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-700 hover:border-blue-200 hover:text-blue-700"
     >
      Kontakt wählen
     </Link>
    </div>
   </div>
  </section>
 );
}
