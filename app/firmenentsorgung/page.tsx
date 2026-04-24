import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, FileWarning, PackageOpen, Recycle, ShieldCheck, Trash2 } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessDisposalForm } from "@/components/BusinessDisposalForm";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildServiceJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Was ist Firmenentsorgung bei FLOXANT?",
  a: "Firmenentsorgung ist die strukturierte Abholung und Entsorgung nicht erlaubnispflichtiger Büro- und Gewerbegegenstände wie Möbel, Regale, Kartons, Verpackung, Büroausstattung und transportfähige Restbestände.",
 },
 {
  q: "Welche Materialien sind ausdrücklich ausgeschlossen?",
  a: "Ausgeschlossen sind Gefahrstoffe, Asbest, Chemikalien, Farben, medizinische Abfälle, kontaminierte Materialien und andere Sonderabfälle, für die besondere Genehmigungen oder Fachentsorger erforderlich sind.",
 },
 {
  q: "Für wen ist der Service gedacht?",
  a: "Für Büros, Agenturen, Praxen, Kanzleien, Lagerflächen, kleinere Gewerbeeinheiten, Hausverwaltungen und Unternehmen, die Räume räumen oder Inventar abtransportieren lassen möchten.",
 },
 {
  q: "Kann die Firmenentsorgung mit Büroumzug oder Leer-Rückfahrt kombiniert werden?",
  a: "Ja. Wenn ein Büroumzug oder eine Rückfahrt Richtung Regensburg ohnehin geplant ist, kann FLOXANT prüfen, ob Büroinventar, Kartons oder Restbestände sinnvoll mitgenommen werden können.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "firmenentsorgung",
  title: "Firmenentsorgung & Büroentsorgung Regensburg | FLOXANT",
  description:
   "Firmenentsorgung und Büroentsorgung für nicht erlaubnispflichtige Büro- und Gewerbegegenstände: Möbel, Kartons, Verpackung, Regale und Inventar in Regensburg und Bayern.",
  keywords: [
   "Firmenentsorgung Regensburg",
   "Büroentsorgung Regensburg",
   "Büroauflösung Firma",
   "Gewerbe Entsorgung Bayern",
   "Büromöbel entsorgen",
  ],
 });
}

export default function FirmenentsorgungPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Firmenentsorgung", item: "/firmenentsorgung" },
   ]),
   buildServiceJsonLd({
    name: "Firmenentsorgung und Büroentsorgung in Regensburg und Bayern",
    description:
     "Abholung, Sortierung und Entsorgung nicht erlaubnispflichtiger Büro- und Gewerbegegenstände mit FLOXANT.",
    path: "/firmenentsorgung",
    serviceType: "Firmenentsorgung",
    areaServed: ["Regensburg", "Bayern", "Nürnberg", "München"],
   }),
   buildWebPageJsonLd({
    name: "Firmenentsorgung und Büroentsorgung | FLOXANT",
    description:
     "B2B-Service für Büroinventar, Möbel, Kartons, Verpackung und normale Gewerbegegenstände ohne Sondergenehmigung.",
    path: "/firmenentsorgung",
    about: ["Firmenentsorgung", "Büroentsorgung", "Büroauflösung", "Regensburg", "Bayern"],
   }),
   buildFaqJsonLd(faqItems),
  ],
 };

 return (
  <main className="min-h-screen bg-background text-white">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Firmenentsorgung" }]} />

   <section className="relative overflow-hidden px-6 pb-16 pt-14">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.14),transparent_52%)]" />
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
     <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
       <Building2 className="h-4 w-4" />
       Büro- und Firmenentsorgung
      </div>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
       Firmenentsorgung für Büros, Unternehmen und Gewerbeflächen
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/55">
       FLOXANT entsorgt nicht erlaubnispflichtige Büro- und Gewerbegegenstände: Möbel,
       Regale, Kartons, Verpackung, Büroausstattung und normale Restbestände. Der Service
       ist für Unternehmen gedacht, die Räume schnell, sauber und ohne unnötige Komplexität
       freibekommen möchten.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
       <Link
        href="#firmenentsorgung-anfrage"
        className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
       >
        Firmenentsorgung anfragen
        <ArrowRight className="h-4 w-4" />
       </Link>
       <Link
        href="/leerfahrt-rueckfahrt"
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white"
       >
        Mit Leer-Rückfahrt kombinieren
       </Link>
      </div>
     </div>

     <div className="premium-scan rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-7 shadow-2xl shadow-black/30">
      <div className="grid gap-4">
       {[
        { icon: CheckCircle2, label: "Geeignet", value: "Büromöbel, Regale, Kartons, Verpackung, Inventar" },
        { icon: FileWarning, label: "Nicht geeignet", value: "Gefahrstoffe, Asbest, Chemikalien, Sonderabfälle" },
        { icon: PackageOpen, label: "Planung", value: "Volumen, Zugang, Ladeweg und Terminfenster" },
        { icon: ShieldCheck, label: "Sauber", value: "B2B-Vorprüfung ohne falsche Entsorgungsversprechen" },
       ].map((item) => {
        const Icon = item.icon;
        return (
         <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <Icon className="mb-4 h-6 w-6 text-cyan-200" />
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/32">{item.label}</div>
          <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
         </div>
        );
       })}
      </div>
     </div>
    </div>
   </section>

   <section className="border-y border-white/5 bg-white/[0.012] px-6 py-14">
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
     {[
      {
       title: "Für Firmen und große Büros",
       text: "Wenn Arbeitsplätze abgebaut, Lagerflächen reduziert oder Büroinventar nach einem Umzug übrig bleibt.",
      },
      {
       title: "Ohne Sonderabfall-Risiko",
       text: "FLOXANT nimmt nur normale, transportfähige Gegenstände an. Erlaubnispflichtige Stoffe werden klar ausgeschlossen.",
      },
      {
       title: "Kombinierbar mit Touren",
       text: "Wenn Rückfahrt, Büroumzug oder Route passen, kann die Abholung besonders effizient geplant werden.",
      },
     ].map((item) => (
      <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7">
       <Trash2 className="mb-5 h-7 w-7 text-cyan-200" />
       <h2 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
       <p className="mt-4 text-sm leading-relaxed text-white/50">{item.text}</p>
      </div>
     ))}
    </div>
   </section>

   <section className="px-6 py-16">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
     <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Abgrenzung</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Was wir annehmen und was nicht</h2>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/52">
       <p>
        Ziel ist eine schlanke Firmenentsorgung ohne Genehmigungs- oder Sonderstoff-Komplexität.
        Geeignet sind normale Bürogegenstände, die transportiert, sortiert und regulär entsorgt
        oder verwertet werden können.
       </p>
       <p>
        Nicht geeignet sind gefährliche oder regulierte Stoffe. Wenn solche Materialien vorhanden
        sind, muss vorab ein passender Fachentsorger oder ein separates Verfahren geklärt werden.
       </p>
      </div>
     </div>
     <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.5rem] border border-emerald-300/15 bg-emerald-400/5 p-6">
       <Recycle className="mb-4 h-7 w-7 text-emerald-200" />
       <h3 className="text-xl font-semibold text-white">Geeignete Gegenstände</h3>
       <p className="mt-3 text-sm leading-relaxed text-white/50">
        Schreibtische, Stühle, Regale, Kartons, Verpackung, Werbematerial, einfache Büroausstattung,
        normale Gewerberestbestände und transportfähige Kleinmengen.
       </p>
      </div>
      <div className="rounded-[1.5rem] border border-red-300/15 bg-red-400/5 p-6">
       <FileWarning className="mb-4 h-7 w-7 text-red-200" />
       <h3 className="text-xl font-semibold text-white">Ausgeschlossen</h3>
       <p className="mt-3 text-sm leading-relaxed text-white/50">
        Asbest, Chemikalien, Farben, Gefahrstoffe, kontaminierte Materialien, medizinische Abfälle,
        Flüssigkeiten und andere Sonderabfälle mit besonderen gesetzlichen Anforderungen.
       </p>
      </div>
     </div>
    </div>
   </section>

   <section id="firmenentsorgung-anfrage" className="border-t border-white/5 px-6 py-16">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
     <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Direkte B2B-Anfrage</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
       Büroinventar, Restbestände oder Firmenfläche räumen?
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50">
       Geben Sie Firma, Standort, Menge, Materialarten und Zugang an. FLOXANT prüft,
       ob die Entsorgung direkt, in Kombination mit einem Büroumzug oder über eine passende
       Rückfahrt sinnvoll ist.
      </p>
     </div>
     <BusinessDisposalForm />
    </div>
   </section>

   <section className="border-t border-white/5 px-6 py-16">
    <div className="mx-auto max-w-6xl">
     <h2 className="text-3xl font-semibold tracking-tight text-white">FAQ zur Firmenentsorgung</h2>
     <div className="mt-8 grid gap-4 md:grid-cols-2">
      {faqItems.map((item) => (
       <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
        <h3 className="text-lg font-semibold text-white">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/50">{item.a}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-white/5 px-6 py-16">
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
     {[
      { href: "/bueroumzug", label: "Büroumzug planen" },
      { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt für Firmen" },
      { href: "/entruempelung", label: "Entrümpelung vergleichen" },
      { href: "/kleinmengen-entsorgung", label: "Kleinmengen-Entsorgung" },
     ].map((item) => (
      <Link
       key={item.href}
       href={item.href}
       className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-cyan-300/35 hover:text-white"
      >
       {item.label}
      </Link>
     ))}
    </div>
   </section>
  </main>
 );
}
