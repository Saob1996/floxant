import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileWarning,
  PackageOpen,
  Recycle,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessDisposalForm } from "@/components/BusinessDisposalForm";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
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
    title: "Firmenentsorgung & Büroentsorgung Regensburg | Für Unternehmen, Praxen und Büros",
    description:
      "Firmenentsorgung und Büroentsorgung für nicht erlaubnispflichtige Büro- und Gewerbegegenstände: Möbel, Kartons, Verpackung, Regale und Inventar in Regensburg und Bayern.",
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
    <main className="min-h-screen overflow-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Firmenentsorgung" }]} />

      <section className="relative overflow-hidden px-6 pb-18 pt-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10rem] top-16 h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />
          <div className="absolute right-[-9rem] top-2 h-96 w-96 rounded-full bg-blue-200/42 blur-3xl" />
          <FloxantSymbolLayer variant="office" density="rich" className="opacity-35" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">
              <Building2 className="h-4 w-4" />
              Büro- und Firmenentsorgung
            </div>
            <h1 className="mt-7 max-w-5xl text-4xl font-bold leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-6xl">
              Firmenentsorgung für Büros, Unternehmen und Gewerbeflächen
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              FLOXANT entsorgt nicht erlaubnispflichtige Büro- und Gewerbegegenstände: Möbel,
              Regale, Kartons, Verpackung, Büroausstattung und normale Restbestände. Der Service
              ist für Unternehmen gedacht, die Flächen schnell, sauber und ohne unnötige
              Komplexität freibekommen möchten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#firmenentsorgung-anfrage"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-500 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_48px_rgba(6,182,212,0.24)] transition-all hover:-translate-y-1"
              >
                Firmenentsorgung anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/leerfahrt-rueckfahrt"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
              >
                Mit Leer-Rückfahrt kombinieren
              </Link>
            </div>
          </div>

          <div className="glass-elevated premium-scan relative isolate rounded-[2.7rem] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="relative z-10 grid gap-4">
              {[
                { icon: CheckCircle2, label: "Geeignet", value: "Büromöbel, Regale, Kartons, Verpackung, Inventar" },
                { icon: FileWarning, label: "Nicht geeignet", value: "Gefahrstoffe, Asbest, Chemikalien, Sonderabfälle" },
                { icon: PackageOpen, label: "Planung", value: "Volumen, Zugang, Ladeweg und Terminfenster" },
                { icon: ShieldCheck, label: "Sauber", value: "B2B-Vorprüfung ohne falsche Entsorgungsversprechen" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[1.7rem] border border-slate-200 bg-white/92 p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="mb-4 h-6 w-6 text-cyan-600" />
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      {item.label}
                    </div>
                    <div className="mt-2 text-lg font-bold text-slate-950">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 py-16">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
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
            <article key={item.title} className="card-premium rounded-[2rem] p-7">
              <Trash2 className="mb-5 h-7 w-7 text-cyan-600" />
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-glow relative px-6 py-16">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Abgrenzung</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Was wir annehmen und was nicht
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                Ziel ist eine schlanke Firmenentsorgung ohne Genehmigungs- oder
                Sonderstoff-Komplexität. Geeignet sind normale Bürogegenstände, die transportiert,
                sortiert und regulär entsorgt oder verwertet werden können.
              </p>
              <p>
                Nicht geeignet sind gefährliche oder regulierte Stoffe. Wenn solche Materialien
                vorhanden sind, muss vorab ein passender Fachentsorger oder ein separates Verfahren
                geklärt werden.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.7rem] border border-emerald-200 bg-emerald-50 p-6">
              <Recycle className="mb-4 h-7 w-7 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-950">Geeignete Gegenstände</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Schreibtische, Stühle, Regale, Kartons, Verpackung, Werbematerial, einfache
                Büroausstattung, normale Gewerberestbestände und transportfähige Kleinmengen.
              </p>
            </div>
            <div className="rounded-[1.7rem] border border-rose-200 bg-rose-50 p-6">
              <FileWarning className="mb-4 h-7 w-7 text-rose-600" />
              <h3 className="text-xl font-bold text-slate-950">Ausgeschlossen</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Asbest, Chemikalien, Farben, Gefahrstoffe, kontaminierte Materialien, medizinische
                Abfälle, Flüssigkeiten und andere Sonderabfälle mit besonderen gesetzlichen
                Anforderungen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="firmenentsorgung-anfrage" className="section-glow relative px-6 py-16">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Direkte B2B-Anfrage</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Büroinventar, Restbestände oder Firmenfläche räumen?
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              Geben Sie Firma, Standort, Menge, Materialarten und Zugang an. FLOXANT prüft, ob die
              Entsorgung direkt, in Kombination mit einem Büroumzug oder über eine passende
              Rückfahrt sinnvoll ist.
            </p>
          </div>
          <BusinessDisposalForm />
        </div>
      </section>

      <section className="section-glow relative px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">FAQ zur Firmenentsorgung</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article key={item.q} className="card-premium rounded-[1.7rem] p-6">
                <h3 className="text-xl font-bold text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 pb-20 pt-8">
        <div className="relative z-10 mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/bueroumzug", label: "Büroumzug planen" },
            { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt für Firmen" },
            { href: "/entruempelung", label: "Entrümpelung vergleichen" },
            { href: "/kleinmengen-entsorgung", label: "Kleinmengen-Entsorgung" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card-premium rounded-[1.7rem] px-6 py-5 text-base font-bold text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
