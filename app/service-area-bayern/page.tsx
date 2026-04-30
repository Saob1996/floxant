import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
  {
    q: "Ist FLOXANT in ganz Bayern aktiv?",
    a: "FLOXANT arbeitet mit Regensburg als operativem Kern und Bayern als geplantem Einsatzgebiet. Ob ein Einsatz passt, hängt weiterhin von Strecke, Umfang, Terminlage und Kapazität ab.",
  },
  {
    q: "Welche Seite eignet sich für Google Maps oder das Google-Unternehmensprofil am besten?",
    a: "Für direkte Anfragen ist die Buchungsseite der stärkste Einstieg. Die Bayern-Seite hilft vor allem bei regionaler Einordnung, interner Verlinkung und klarer Suchintention.",
  },
  {
    q: "Warum zeigt diese Seite Regionen statt pauschal überall alles zu versprechen?",
    a: "Weil ehrliche regionale Planung mehr Vertrauen schafft. FLOXANT ordnet Regensburg, Oberpfalz, Mittelfranken und Oberbayern sichtbar ein, statt beliebige Reichweite zu behaupten.",
  },
  {
    q: "Wann ist der Rechner sinnvoll und wann die direkte Buchung?",
    a: "Wer zuerst Aufwand und Preisrahmen einordnen möchte, nutzt den Rechner. Wer die wichtigsten Eckdaten schon kennt, geht direkt über die Buchungsseite oder eine passende Spezialseite weiter.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "service-area-bayern",
    title: "Servicegebiet Bayern | FLOXANT in Regensburg, Nürnberg und München",
    description:
      "FLOXANT plant Umzug, Reinigung, Entrümpelung und Büroumzug ab Regensburg in Bayern. Regionen, Städte, 200-km-Einsatzgebiet und direkte Anfragewege klar eingeordnet.",
    keywords: [
      "Servicegebiet Bayern",
      "Umzug Bayern",
      "Reinigung Bayern",
      "Entrümpelung Bayern",
      "Büroumzug Bayern",
      "Regensburg Bayern Dienstleister",
      "Google Maps Buchungslink Regensburg",
    ],
  });
}

export default async function ServiceAreaBayern() {
  const dict = await getDictionary("de");

  const breadcrumbs = [
    { label: "Startseite", href: "/" },
    { label: "Servicegebiet Bayern" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Servicegebiet Bayern", item: "/service-area-bayern" },
      ]),
      buildWebPageJsonLd({
        name: "Servicegebiet Bayern | FLOXANT",
        description:
          "Regionale Einordnung des FLOXANT Einsatzgebiets mit Schwerpunkt Regensburg und Bayern.",
        path: "/service-area-bayern",
        about: [
          "Regensburg",
          "Bayern",
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Büroumzug",
          "200-km-Einsatzgebiet",
        ],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  const regions = [
    {
      name: "Regensburg und Oberpfalz",
      desc:
        "Das operative Zentrum mit kurzer Reaktionszeit und dichtem Einsatznetz für Umzug, Reinigung, Entrümpelung und Büroumzug.",
      links: [
        { href: "/umzug-regensburg", label: "Umzug Regensburg" },
        { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
        { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
        { href: "/bueroumzug-regensburg", label: "Büroumzug Regensburg" },
      ],
    },
    {
      name: "Nürnberg und Mittelfranken",
      desc:
        "Wichtige Nachfrage-Region für Umzüge, Entrümpelung, Büroumzug und kurzfristige Anfragen im erweiterten Einsatzraum.",
      links: [
        { href: "/umzug-nuernberg", label: "Umzug Nürnberg" },
        { href: "/reinigung-nuernberg", label: "Reinigung Nürnberg" },
        { href: "/entruempelung-nuernberg", label: "Entrümpelung Nürnberg" },
        { href: "/bueroumzug-nuernberg", label: "Büroumzug Nürnberg" },
      ],
    },
    {
      name: "München und Oberbayern",
      desc:
        "Starker Ausbaukorridor für Umzug, Objektservice und kombinierte Leistungen mit klarer wirtschaftlicher Einordnung.",
      links: [
        { href: "/umzug-muenchen", label: "Umzug München" },
        { href: "/reinigung-muenchen", label: "Reinigung München" },
        { href: "/entruempelung-muenchen", label: "Entrümpelung München" },
        { href: "/bueroumzug-muenchen", label: "Büroumzug München" },
      ],
    },
  ];

  const valuePillars = [
    {
      title: "Regensburg als Kern",
      text: "Von hier aus werden Anfragen, Verfügbarkeit und Einsatzfenster sauber vorbereitet.",
      Icon: MapPin,
    },
    {
      title: "Bayern als Ausbaugebiet",
      text: "Für Bayern zählen bei FLOXANT immer Strecke, Zugänge, Termine und Wirtschaftlichkeit.",
      Icon: Route,
    },
    {
      title: "Klare Vorprüfung",
      text: "Lieber ein ehrlicher erster Rahmen als eine künstlich perfekte Zahl ohne Substanz.",
      Icon: ShieldCheck,
    },
  ];

  const quickFacts = [
    "Bayern heißt bei FLOXANT nicht überall alles versprechen, sondern jede Region sauber nach Aufwand und Weg einordnen.",
    "Regensburg bleibt der operative Kern, Bayern ist das geplante Ausbaugebiet mit klaren Prioritäten.",
    "Wer direkt anfragen möchte, nutzt die Buchung. Wer erst Orientierung braucht, nimmt den passenden Einstieg weiter unten.",
  ];

  const hubLinks = [
    { href: "/umzug-bayern", label: "Umzug Bayern" },
    { href: "/reinigung-bayern", label: "Reinigung Bayern" },
    { href: "/entruempelung-bayern", label: "Entrümpelung Bayern" },
    { href: "/bueroumzug-bayern", label: "Büroumzug Bayern" },
    { href: "/einsatzgebiet-regensburg-200km", label: "200-km-Einsatzgebiet" },
    { href: "/rechner", label: "Zum FLOXANT Rechner" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <section className="relative overflow-hidden px-6 pb-20 pt-8">
        <div className="pointer-events-none absolute inset-0">
          <FloxantSymbolLayer
            variant="office"
            density="soft"
            mode="hero"
            className="opacity-20"
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="glass-elevated rounded-[2.5rem] p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/86 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
              <MapPin className="h-4 w-4" />
              Regionale Relevanz für Regensburg und Bayern
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              FLOXANT in Bayern klar statt chaotisch eingeordnet.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              FLOXANT arbeitet mit Schwerpunkt Regensburg und plant regelmäßige Einsätze für
              Umzug, Reinigung, Entrümpelung und Büroumzug in Bayern. Diese Seite zeigt die
              wichtigsten Regionen, direkten Anfragewege und den erweiterten Einsatzraum so,
              dass Kunden sofort verstehen, was wirklich passt. Kurz gesagt: sauber erklärt
              verkauft sich besser als große Versprechen ohne Plan.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/buchung"
                className="btn-premium inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-8 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_44px_rgba(37,99,235,0.24)]"
              >
                Bayern-Anfrage starten
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/einsatzgebiet-regensburg-200km"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-8 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <Radar className="h-4 w-4" />
                200-km-Einsatzgebiet
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {valuePillars.map((item) => {
              const Icon = item.Icon;
              return (
                <div key={item.title} className="card-premium rounded-[2rem] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {quickFacts.map((item) => (
            <div
              key={item}
              className="card-premium rounded-[1.8rem] p-6 text-sm leading-7 text-slate-600"
            >
              <div className="mb-3 flex items-center gap-2 text-blue-700">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.16em]">
                  Sauber eingeordnet
                </span>
              </div>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span className="label-premium text-blue-700">Regionen in Bayern</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Die wichtigsten Cluster für Sichtbarkeit und Anfragen
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Statt unübersichtlicher Listen arbeitet FLOXANT mit klaren regionalen Clustern.
              So verstehen Kunden und Google schneller, wo Umzug, Reinigung, Entrümpelung und
              Büroumzug realistisch eingeordnet werden.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {regions.map((region) => (
              <article key={region.name} className="card-premium rounded-[2.2rem] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-950">{region.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{region.desc}</p>
                <div className="mt-6 grid gap-3">
                  {region.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white/86 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/80 hover:text-slate-950"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="glass-elevated mx-auto max-w-7xl rounded-[2.6rem] p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="label-premium text-blue-700">Hub-Seiten</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Direkte Wege für die wichtigsten Bayern-Themen
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-right">
              Wer schon weiß, wonach er sucht, soll nicht erst im Menü herumirren. Deshalb
              führen die wichtigsten Bayern-Cluster direkt auf die passenden Kernseiten.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hubLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-premium group rounded-[1.8rem] px-6 py-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-bold text-slate-950">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="px-6 pb-16 pt-16">
        <div className="calc-surface mx-auto max-w-7xl rounded-[2.8rem] px-6 py-12 md:px-10 md:py-14">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="calc-kicker justify-center">Direkte Bayern-Anfrage</div>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-4xl">
              Service, Region und Eckdaten geordnet anfragen
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Nutzen Sie den Einstieg unten, wenn Standort, Service und Preisrahmen regional
              sauber vorbereitet werden sollen. So geht Ihre Anfrage klarer rein und deutlich
              professioneller weiter.
            </p>
          </div>

          <SmartBookingWizard dict={dict} />

          <div className="mt-10 text-center">
            <Link
              href="/standorte"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              Alle Standorte ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Häufige Fragen zum Servicegebiet Bayern
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article
                key={item.q}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              >
                <h3 className="text-lg font-semibold text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
