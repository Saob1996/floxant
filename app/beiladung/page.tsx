import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Repeat, Search, ShieldCheck, Truck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "beiladung",
    title: "Beiladung Bayern | Möbel-Mitnahme ab Regensburg | FLOXANT",
    description:
      "Beiladung für Einzelmöbel ab Regensburg und in Bayern. FLOXANT prüft freie Kapazitäten, Strecke, Umfang und passendes Zeitfenster.",
  });
}

export default async function BeiladungPage() {
  const dict = await getDictionary("de");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Beiladung" },
  ];

  const faqItems = [
    {
      q: "Was genau versteht man unter Beiladung?",
      a: "Beiladung bedeutet: Einzelstücke oder kleine Mengen fahren auf einer passenden Tour mit, wenn Strecke, Terminfenster und freier Laderaum zusammenpassen.",
    },
    {
      q: "Für welche Transportgüter ist der Service geeignet?",
      a: "Ideal für Einzelstücke wie Sofas, Schränke oder Klaviere sowie für 5 bis 10 Umzugskartons, wenn kein kompletter LKW benötigt wird.",
    },
    {
      q: "Wann ist Beiladung die richtige Wahl?",
      a: "Wenn Ihr Liefertermin flexibel ist. Da wir bestehende Touren nutzen, koordinieren wir die Abholung und Zustellung innerhalb eines vereinbarten Zeitfensters.",
    },
    {
      q: "Wie unterscheidet sich FLOXANT Beiladung vom Standardservice?",
      a: "Die Anfrage wird wie ein kleiner Transport geprüft: Was soll mit, wie schwer ist es, wo liegt es, wie flexibel ist der Termin und welcher Schutz ist nötig.",
    },
    {
      q: "Gibt es regionale Einschränkungen in Bayern?",
      a: "Jede Strecke wird einzeln geprüft. Regensburg ist die Basis, Bayern ist möglich, wenn Route, Zeitfenster und Kapazität passen.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Beiladung", item: "/beiladung" },
      ]),
      buildServiceJsonLd({
        name: "Beiladung in Regensburg und Bayern",
        description:
          "Möbel-Mitnahme und kleinere Transportmengen mit FLOXANT auf freien Tourkapazitäten.",
        path: "/beiladung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Beiladung in Bayern | FLOXANT",
        description:
          "Definition, Einsatzbereich und Anfrage für Beiladung ab Regensburg und in Bayern.",
        path: "/beiladung",
        about: ["Beiladung", "Möbeltransport", "Regensburg", "Bayern"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <section className="section-glow relative px-6 pb-20 pt-10">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <FloxantSymbolLayer variant="backhaul" density="rich" />
        </div>
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/88 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5">
            <Truck size={14} />
            Beiladung Bayern
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Beiladung und Möbel-Mitnahme in Bayern
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-600">
            FLOXANT prüft freie Ladefläche für Einzelstücke, Teilmengen und kleinere Transporte
            ab Regensburg und in Bayern. Sinnvoll ist das vor allem, wenn der Termin etwas flexibel ist
            und kein ganzer Umzug gefahren werden muss.
          </p>
        </div>
      </section>

      <section className="section-glow relative px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Repeat, title: "Was ist das?", text: "Mitnahme auf bestehenden Touren mit freiem Laderaum." },
            { icon: Search, title: "Für wen?", text: "Für Einzelmöbel, kleine Mengen und flexible Transportfenster." },
            { icon: ShieldCheck, title: "Wann sinnvoll?", text: "Wenn kein kompletter Umzug nötig ist, aber Möbel oder Kartons trotzdem sicher mitfahren sollen." },
            { icon: CheckCircle2, title: "Wie läuft es ab?", text: "Stücke und Strecke angeben, Kapazität prüfen, passendes Zeitfenster abstimmen." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="card-premium rounded-[2rem] p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-glow relative px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-3xl font-bold text-slate-950">Häufige Fragen zur Beiladung</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <article key={item.q} className="card-premium rounded-[2rem] p-8">
                <h3 className="text-2xl font-bold text-slate-950">{item.q}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="section-glow relative px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-950">Beiladung anfragen</h2>
            <p className="mt-4 text-slate-600">
              Geben Sie Strecke, Menge und Zeitfenster an. FLOXANT prüft, ob eine passende
              Tourkapazität vorhanden ist.
            </p>
          </div>
          <div className="glass-elevated rounded-[2.6rem] p-4 md:p-6">
            <SmartBookingWizard
              dict={{
                common: dict.common,
                calculator: dict.calculator,
                booking: dict.booking,
              }}
            />
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 pb-24 pt-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/umzug", label: "Standard-Umzug ansehen" },
            { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt Richtung Regensburg" },
            { href: "/firmenentsorgung", label: "Firmenentsorgung für Büroinventar" },
            { href: "/rechner", label: "Rechner als Einstieg" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card-premium premium-scan rounded-[1.8rem] px-6 py-5"
            >
              <div className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                Weiterführend
              </div>
              <div className="mt-3 text-lg font-bold text-slate-950">{item.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
