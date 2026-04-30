import { Metadata } from "next";
import Link from "next/link";
import { Banknote, ShieldCheck, Target, Wallet } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BudgetContactForm } from "@/components/BudgetContactForm";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
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
    path: "anfrage-mit-preisrahmen",
    title: "Anfrage mit Preisvorstellung in Regensburg und Bayern | FLOXANT",
    description:
      "Teilen Sie FLOXANT Ihre Preisvorstellung für Umzug, Reinigung oder Entrümpelung mit. Die Angabe bleibt unverbindlich und ergänzt die spätere Vorprüfung.",
  });
}

export default function BudgetPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Anfrage mit Preisrahmen" },
  ];

  const faqItems = [
    {
      q: "Was ist eine Anfrage mit Preisvorstellung?",
      a: "Sie teilen uns Ihren finanziellen Rahmen mit, damit FLOXANT die spätere Vorprüfung und die passende Leistungszusammenstellung besser einordnen kann.",
    },
    {
      q: "Ersetzt mein Budget die FLOXANT Einschätzung?",
      a: "Nein. Ihre Preisvorstellung ergänzt die System- und Teamprüfung, ersetzt sie aber nicht. Im Backoffice bleiben beide Werte getrennt sichtbar.",
    },
    {
      q: "Ist meine Anfrage damit verbindlich?",
      a: "Nein. Ihre Preisvorstellung ist unverbindlich. Erst nach finaler Abstimmung und konkreter Freigabe entsteht ein Auftrag.",
    },
    {
      q: "Wann ist diese Seite sinnvoll?",
      a: "Wenn Sie einen klaren Budgetkorridor haben, Varianten vergleichen wollen oder vorab wissen möchten, welche Leistungen sich in Ihrem Rahmen sinnvoll priorisieren lassen.",
    },
    {
      q: "Funktioniert das für Umzug, Reinigung und Entrümpelung?",
      a: "Ja. Gerade bei regionalen Einsätzen in Regensburg und Bayern hilft eine frühe Preisvorstellung dabei, Aufwand, Terminlage und Zusatzleistungen sauber zu steuern.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Anfrage mit Preisrahmen", item: "/anfrage-mit-preisrahmen" },
      ]),
      buildServiceJsonLd({
        name: "Anfrage mit Preisvorstellung für Umzug, Reinigung und Entrümpelung",
        description:
          "Budget-orientierte Anfrage für Regensburg und Bayern, bei der Kunden ihre Preisvorstellung unverbindlich übermitteln.",
        path: "/anfrage-mit-preisrahmen",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Preisvorstellung und Budget-Anfrage | FLOXANT",
        description:
          "Teilen Sie FLOXANT unverbindlich Ihr Zielbudget mit und lassen Sie die passende Vorprüfung vorbereiten.",
        path: "/anfrage-mit-preisrahmen",
        about: ["Preisvorstellung", "Budgetplanung", "Umzug", "Reinigung", "Entrümpelung", "Bayern"],
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
          <FloxantSymbolLayer variant="premium" density="soft" />
        </div>
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/88 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5">
            <Banknote size={14} />
            Preisvorstellung und Vorprüfung
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-7xl">
            Ihr Rahmen. Unsere ehrliche Vorprüfung.
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-600">
            Diese Seite ist für Kunden gedacht, die bereits ein Zielbudget oder eine
            Preisvorstellung haben. FLOXANT nutzt diese Angabe nicht als Zusage, sondern
            als zusätzliches Signal für die spätere Einsatzplanung in Regensburg und Bayern.
          </p>
        </div>
      </section>

      <section className="section-glow relative px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 text-start md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Bessere Priorisierung",
              text: "Ein früher Budgethinweis hilft dabei, Umfang, Zusatzleistungen und Terminwunsch realistischer einzuordnen.",
            },
            {
              icon: ShieldCheck,
              title: "Keine falsche Preiszusage",
              text: "Ihre Angabe bleibt unverbindlich. Erst die konkrete Vorprüfung zeigt, welche Leistung in diesem Rahmen sinnvoll umsetzbar ist.",
            },
            {
              icon: Wallet,
              title: "System und Kundenwunsch getrennt",
              text: "Später stehen System-Orientierungsrahmen und Kunden-Preisvorstellung nebeneinander, damit Entscheidungen nachvollziehbar bleiben.",
            },
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
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="glass-elevated rounded-[2.4rem] p-8">
            <h2 className="text-3xl font-bold text-slate-950">Wie FLOXANT Ihre Preisvorstellung nutzt</h2>
            <div className="mt-8 space-y-6 text-slate-600">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">1. Was ist das?</h3>
                <p className="mt-2">
                  Eine unverbindliche Budget-Anfrage für Umzug, Reinigung oder Entrümpelung.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">2. Für wen ist das sinnvoll?</h3>
                <p className="mt-2">
                  Für Kunden mit klarem Kostenkorridor, für sensible Projekte und für Fälle,
                  in denen Varianten geprüft werden sollen.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">3. Wie läuft es ab?</h3>
                <p className="mt-2">
                  Sie übermitteln Service, Kontaktdaten und Ihre Preisvorstellung. Danach kann
                  FLOXANT Ihre Angaben mit Umfang, Zugang, Region und Zusatzleistungen abgleichen.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">4. Wo ist die Grenze?</h3>
                <p className="mt-2">
                  Ein Budget alleine erzeugt keinen garantierten Preis. Es ist ein hilfreiches
                  Signalsystem, keine Preiszusage.
                </p>
              </div>
            </div>
          </div>

          <BudgetContactForm />
        </div>
      </section>

      <section className="section-glow relative px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-950">
            Häufige Fragen zum Preisrahmen
          </h2>
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

      <section className="section-glow relative px-6 pb-24 pt-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/rechner", label: "Rechner als Einstieg" },
            { href: "/umzug", label: "Umzug als Hauptservice" },
            { href: "/reinigung", label: "Reinigung als Hauptservice" },
            { href: "/entruempelung", label: "Entrümpelung als Hauptservice" },
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
