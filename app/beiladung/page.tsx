import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Repeat, Search, ShieldCheck, Truck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
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
    title: "Beiladung Bayern ✓ Möbel-Mitnahme Region Regensburg | FLOXANT",
    description:
      "Professionelle Beiladung für Einzelmöbel ab Regensburg und in ganz Bayern. Nutzen Sie freie Kapazitäten für eine effiziente und kostengünstige Möbel-Mitnahme.",
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
      a: "Beiladung ist die professionelle Mitnahme von Einzelstücken oder Teilmengen auf bereits geplanten Touren mit freiem Laderaum. Dies optimiert die Auslastung und senkt die Kosten für den Kunden.",
    },
    {
      q: "Für welche Transportgüter ist der Service geeignet?",
      a: "Ideal für Einzelstücke wie Sofas, Schränke oder Klaviere sowie für 5-10 Umzugskartons, wenn kein kompletter LKW benötigt wird.",
    },
    {
      q: "Wann ist Beiladung die richtige Wahl?",
      a: "Wenn Ihr Liefertermin um +- 3 Tage flexibel ist. Da wir bestehende Touren nutzen, koordinieren wir die Abholung und Zustellung innerhalb eines vereinbarten Zeitfensters.",
    },
    {
      q: "Wie unterscheidet sich FLOXANT Beiladung vom Standardservice?",
      a: "Die logistische Abwicklung ist gebündelt. Sie erhalten denselben Schutz und dieselbe Professionalität wie beim Voll-Umzug, aber zu Konditionen für Teilmengen.",
    },
    {
      q: "Gibt es regionale Einschränkungen in Bayern?",
      a: "Nein. Wir decken die gesamte Nord-Süd und Ost-West Achse in Bayern ab, mit Regensburg als zentralem Logistik-Hub für die Verteilung.",
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
    <main className="min-h-screen bg-background text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_50%)]" />
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-widest text-blue-400">
            <Truck size={14} className="text-blue-500/60" />
            Beiladung Bayern
          </div>
          <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl">
            Professionelle Beiladung & Möbel-Mitnahme in Bayern
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/50">
            FLOXANT nutzt ungenutzte Laderaum-Ressourcen für Einzelstücke, Teilmengen und kleinere Transporte ab Regensburg und in ganz Bayern. Wir bieten eine semantisch klare und operativ sichere Lösung für professionelle Möbel-Mitnahme ohne die Kosten eines Exklusiv-Transports.
          </p>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.01] px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Repeat, title: "Was ist das?", text: "Mitnahme auf bestehenden Touren mit freiem Laderaum." },
            { icon: Search, title: "Für wen?", text: "Für Einzelmöbel, kleine Mengen und flexible Transportfenster." },
            { icon: ShieldCheck, title: "Wann sinnvoll?", text: "Wenn kein kompletter Umzugsservice benötigt wird, aber der Transport professionell bleiben soll." },
            { icon: CheckCircle2, title: "Wie läuft es ab?", text: "Stücke und Strecke angeben, Kapazität prüfen, passendes Zeitfenster abstimmen." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <Icon className="mb-5 h-8 w-8 text-blue-400" />
                <h2 className="mb-3 text-xl font-bold tracking-tight">{item.title}</h2>
                <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold">Häufige Fragen zur Beiladung</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                <h3 className="mb-4 text-xl font-bold">{item.q}</h3>
                <p className="text-white/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="bg-slate-900/50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Beiladung anfragen</h2>
            <p className="mt-4 text-white/50">
              Geben Sie Strecke, Menge und Zeitfenster an. FLOXANT prüft, ob eine passende Tourkapazität vorhanden ist.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-1 shadow-2xl backdrop-blur-xl">
            <div className="p-4 md:p-8">
              <SmartBookingWizard
                dict={{
                  common: dict.common,
                  calculator: dict.calculator,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-16">
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
              className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
