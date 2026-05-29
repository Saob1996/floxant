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
import { PsychologicalCleaningInternalLinks } from "@/components/PsychologicalCleaningLandingRoute";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import {
  BAVARIA_DIRECT_DEMAND_LINKS,
  BAVARIA_COVERAGE_GROUPS,
  BAVARIA_MAPS_SERVICE_INTENTS,
  BAVARIA_METRO_DISTRICT_LINKS,
  BAVARIA_REGENSBURG_PROXIMITY_LINKS,
} from "@/lib/bavaria-coverage";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
  {
    q: "Ist FLOXANT in ganz Bayern aktiv?",
    a: "FLOXANT arbeitet von Regensburg aus und prueft Bayern-Anfragen nach Strecke, Umfang, Terminlage und freier Kapazitaet.",
  },
  {
    q: "Welche Seite eignet sich am besten fuer direkte Anfragen?",
    a: "Fuer direkte Anfragen ist die Buchungsseite der beste Einstieg. Die Bayern-Seite hilft vor allem dabei, Region, Strecke und passende Leistung vorher einzuordnen.",
  },
  {
    q: "Warum zeigt diese Seite Regionen statt pauschal ueberall alles zu versprechen?",
    a: "Weil ehrliche regionale Planung mehr Vertrauen schafft. FLOXANT ordnet Regensburg, Oberpfalz, Mittelfranken, Oberbayern, Schwaben und den Donaukorridor sichtbar ein, statt beliebige Reichweite zu behaupten.",
  },
  {
    q: "Wann ist der Rechner sinnvoll und wann die direkte Buchung?",
    a: "Wer zuerst Aufwand und Preisrahmen einordnen moechte, nutzt den Rechner. Wer die wichtigsten Eckdaten schon kennt, geht direkt ueber die Buchungsseite oder eine passende Spezialseite weiter.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "service-area-bayern",
    title: "Servicegebiet Bayern | FLOXANT in Regensburg und ganz Bayern",
    description:
      "FLOXANT plant Umzug, Reinigung, Entruempelung und Bueroumzug ab Regensburg in Bayern. Regionen, Staedte, Bezirke und direkte Anfragewege klar eingeordnet.",
    keywords: [
      "Servicegebiet Bayern",
      "Umzug Bayern",
      "Reinigung Bayern",
      "Entruempelung Bayern",
      "Bueroumzug Bayern",
      "Regensburg Bayern Dienstleister",
      "Dienstleister Regensburg Anfrage",
    ],
  });
}

export default async function ServiceAreaBayern() {
  const dict = await getDictionary("de");
  const coverageCount = BAVARIA_COVERAGE_GROUPS.reduce(
    (sum, group) => sum + group.links.length,
    0,
  );

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
          "Regionale Einordnung des FLOXANT Einsatzgebiets mit Schwerpunkt Regensburg und ganz Bayern.",
        path: "/service-area-bayern",
        about: [
          "Regensburg",
          "Bayern",
          "Umzug",
          "Reinigung",
          "Entruempelung",
          "Bueroumzug",
          "Stadtbezirke",
        ],
      }),
      buildFaqJsonLd(faqItems),
      {
        "@type": "ItemList",
        name: "FLOXANT Bayern Service-Intentionen",
        description:
          "Direkte Bayern-Pfade fuer Maps- und Suchanfragen nach Umzug, Reinigung, Entruempelung, Entsorgung, Lagerung, Bueroumzug und Gewerbereinigung.",
        itemListElement: BAVARIA_MAPS_SERVICE_INTENTS.map((intent, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: intent.title,
          url: `https://www.floxant.de${intent.primary.href}`,
          description: intent.description,
        })),
      },
    ],
  };

  const regions = [
    {
      name: "Regensburg und Oberpfalz",
      desc:
        "Die Regensburger Basis mit kurzer Abstimmung fuer Umzug, Reinigung, Entruempelung und Bueroumzug.",
      links: [
        { href: "/umzug-regensburg", label: "Umzug Regensburg" },
        { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
        { href: "/entruempelung-regensburg", label: "Entruempelung Regensburg" },
        { href: "/bueroumzug-regensburg", label: "Bueroumzug Regensburg" },
      ],
    },
    {
      name: "Nuernberg und Mittelfranken",
      desc:
        "Wichtige Nachfrage-Region fuer Umzuege, Entruempelung, Bueroumzug und kurzfristige Anfragen im erweiterten Einsatzraum.",
      links: [
        { href: "/umzug-nuernberg", label: "Umzug Nuernberg" },
        { href: "/reinigung-nuernberg", label: "Reinigung Nuernberg" },
        { href: "/entruempelung-nuernberg", label: "Entruempelung Nuernberg" },
        { href: "/bueroumzug-nuernberg", label: "Bueroumzug Nuernberg" },
      ],
    },
    {
      name: "Muenchen und Oberbayern",
      desc:
        "Starker Ausbaukorridor fuer Umzug, Objektservice und kombinierte Leistungen mit klarer wirtschaftlicher Einordnung.",
      links: [
        { href: "/umzug-muenchen", label: "Umzug Muenchen" },
        { href: "/reinigung-muenchen", label: "Reinigung Muenchen" },
        { href: "/entruempelung-muenchen", label: "Entruempelung Muenchen" },
        { href: "/bueroumzug-muenchen", label: "Bueroumzug Muenchen" },
      ],
    },
    {
      name: "Niederbayern und Donaukorridor",
      desc:
        "Solide Achse fuer planbare Auftraege zwischen Landshut, Straubing, Deggendorf und Passau mit starkem Regensburg-Bezug.",
      links: [
        { href: "/umzug-landshut", label: "Umzug Landshut" },
        { href: "/reinigung-straubing", label: "Reinigung Straubing" },
        { href: "/entruempelung-deggendorf", label: "Entruempelung Deggendorf" },
        { href: "/bueroumzug-passau", label: "Bueroumzug Passau" },
      ],
    },
    {
      name: "Augsburg und Schwaben",
      desc:
        "Wichtige Nachfrage fuer Umzug, Objektservice, Raeumung und Firmenumzug im westlichen Bayern mit klaren Marktpfaden.",
      links: [
        { href: "/umzug-augsburg", label: "Umzug Augsburg" },
        { href: "/reinigung-kempten", label: "Reinigung Kempten" },
        { href: "/entruempelung-memmingen", label: "Entruempelung Memmingen" },
        { href: "/bueroumzug-neu-ulm", label: "Bueroumzug Neu-Ulm" },
      ],
    },
    {
      name: "Franken Nord und Bayern-West",
      desc:
        "Weitere Regionen wie Bamberg, Bayreuth, Schweinfurt und Wuerzburg, wenn Strecke, Umfang und Termin sinnvoll passen.",
      links: [
        { href: "/umzug-bamberg", label: "Umzug Bamberg" },
        { href: "/reinigung-bayreuth", label: "Reinigung Bayreuth" },
        { href: "/entruempelung-schweinfurt", label: "Entruempelung Schweinfurt" },
        { href: "/bueroumzug-wuerzburg", label: "Bueroumzug Wuerzburg" },
      ],
    },
  ];

  const valuePillars = [
    {
      title: "Regensburg als Kern",
      text: "Von hier aus werden Anfragen, Verfuegbarkeit und Einsatzfenster sauber vorbereitet.",
      Icon: MapPin,
    },
    {
      title: "Bayern als Ausbaugebiet",
      text: "Fuer Bayern zaehlen bei FLOXANT immer Strecke, Zugaenge, Termine und Wirtschaftlichkeit.",
      Icon: Route,
    },
    {
      title: "Klare Vorpruefung",
      text: "Lieber ein ehrlicher erster Rahmen als eine Zahl ohne belastbare Grundlage.",
      Icon: ShieldCheck,
    },
  ];

  const quickFacts = [
    "Bayern heisst bei FLOXANT nicht ueberall alles versprechen, sondern jede Region sauber nach Aufwand und Weg einordnen.",
    "Regensburg bleibt die Basis, Bayern wird nach Strecke, Umfang und Termin sauber eingeordnet.",
    "Wer direkt anfragen moechte, nutzt die Buchung. Wer erst Orientierung braucht, nimmt den passenden Einstieg weiter unten.",
  ];

  const businessFlowCards = [
    {
      title: "Rechner für Vorprüfung",
      text: "Für Kunden, die Preisrahmen, Aufwand und passenden Service erst einordnen wollen.",
      href: "/rechner",
      cta: "Rechner öffnen",
    },
    {
      title: "Buchung für direkte Anfragen",
      text: "Für klare Fälle, bei denen Service, Region und nächster Schritt schon feststehen.",
      href: "/buchung",
      cta: "Direkt anfragen",
    },
    {
      title: "Rückfahrt-Börse für flexible Strecken",
      text: "Für Kunden mit Start, Ziel, Datum und Umfang, die eine Leerfahrt oder Rückfahrt nach Verfügbarkeit prüfen lassen wollen.",
      href: "/rueckfahrt-boerse",
      cta: "Strecke prüfen",
    },
    {
      title: "Standorte für Bayern-Anfragen",
      text: "Für Kunden, die zuerst Reichweite, Nähe und Einsatzgebiet verstehen wollen.",
      href: "/standorte",
      cta: "Standorte ansehen",
    },
  ];

  const hubLinks = [
    { href: "/umzug-bayern", label: "Umzug Bayern" },
    { href: "/reinigung-bayern", label: "Reinigung Bayern" },
    { href: "/entruempelung-bayern", label: "Entruempelung Bayern" },
    { href: "/bueroumzug-bayern", label: "Bueroumzug Bayern" },
    { href: "/standorte", label: "Standorte in Bayern" },
    { href: "/einsatzgebiet-regensburg-200km", label: "200-km-Einsatzgebiet" },
    { href: "/rueckfahrt-boerse", label: "Rückfahrt-Börse" },
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
              Regionale Relevanz fuer Regensburg und Bayern
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              FLOXANT in Bayern klar statt chaotisch eingeordnet.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              FLOXANT arbeitet mit Schwerpunkt Regensburg und plant regelmaessige Einsaetze fuer
              Umzug, Reinigung, Entruempelung und Bueroumzug in Bayern. Diese Seite zeigt die
              wichtigsten Regionen, direkten Anfragewege und starken Marktpfade so, dass Kunden
              sofort verstehen, was wirklich passt.
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

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-8 max-w-3xl">
            <span className="label-premium text-blue-700">Maps-Service-Suche</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Fuer jede wichtige Google-Maps-Suche ein eindeutiger Einstieg
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Kunden suchen oft nicht nach einer Marke, sondern nach dem konkreten Problem:
              Umzug, Reinigung, Entsorgung, Entruempelung, Lagerung oder Bueroumzug. Diese
              Einstiege machen die FLOXANT-Struktur fuer genau diese Absichten klarer.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BAVARIA_MAPS_SERVICE_INTENTS.map((intent) => (
              <article
                key={intent.id}
                className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {intent.query}
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{intent.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{intent.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={intent.primary.href}
                    className="rounded-full bg-blue-600 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white"
                  >
                    {intent.primary.label}
                  </Link>
                  {intent.supporting.slice(0, 3).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {businessFlowCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card-premium rounded-[1.9rem] p-6 transition-all hover:-translate-y-1 hover:border-blue-300/30"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                Geschaeftsmodell-Pfad
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                {item.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            { label: "Bayern-Regionen", value: `${BAVARIA_COVERAGE_GROUPS.length}` },
            { label: "Direkte Standortpfade", value: `${coverageCount}+` },
            { label: "Metropolbezirke", value: `${BAVARIA_METRO_DISTRICT_LINKS.length}` },
          ].map((item) => (
            <div
              key={item.label}
              className="card-premium rounded-[1.8rem] p-6 text-sm leading-7 text-slate-600"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                {item.label}
              </div>
              <div className="mt-3 text-3xl font-bold leading-none text-slate-950">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 max-w-3xl">
            <span className="label-premium text-blue-700">Nahraum zuerst sauber abdecken</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Der Nahraum macht die Bayern-Reichweite glaubwürdig
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Bayernweite Anfragen funktionieren besser, wenn die Basis klar und plausibel bleibt.
              Diese Orte bilden die direkte Regensburg-Zone für schnelle lokale Anfragen.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BAVARIA_REGENSBURG_PROXIMITY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span className="label-premium text-blue-700">Regionen in Bayern</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Die wichtigsten Regionen für Anfragen in Bayern
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Statt unuebersichtlicher Listen arbeitet FLOXANT mit klaren regionalen Bereichen.
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
              fuehren die wichtigsten Bayern-Bereiche direkt auf die passenden Kernseiten.
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

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <span className="label-premium text-blue-700">Direkte Bayern-Einstiege</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Klare Einstiege für häufige Bayern-Anfragen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Diese Links verdichten häufige Kombinationen aus Stadt und Leistung. Sie helfen
              Nutzern schneller in das passende Angebot, ohne lange Listen durchsuchen zu müssen.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {BAVARIA_DIRECT_DEMAND_LINKS.slice(0, 12).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-premium rounded-[1.6rem] p-5 transition-all hover:-translate-y-1 hover:border-blue-300/30"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Bayern-Markt
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,0.98))] p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-9">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Metropolpfade
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Zusaetzliche Einstiege fuer grosse Stadtlagen
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Diese Seiten helfen, Anfragen aus Muenchen und Nuernberg genauer einzuordnen,
              besonders wenn Stadtteil, Zugang, Strecke oder Objektart wichtig sind.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {BAVARIA_METRO_DISTRICT_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-premium rounded-[1.5rem] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/25"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Bezirksseite
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{item.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.note}</p>
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
              klarer weiter.
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

      <PsychologicalCleaningInternalLinks
        title="Spezial-Reinigung aus dem Regensburger Einsatzgebiet"
        intro="Diese Problemseiten verbinden Bayern-Reichweite mit konkreten Situationen: Uebergabe, Baustaub, Geruch, Eile und diskrete Hilfe."
        focusSlugs={[
          "panikfrei-in-24h",
          "baustaub-ende",
          "geruchslos-protokoll",
          "vermieter-schockschutz-reinigung",
          "sichtbar-sauber-protokoll",
          "atemruhig-reinigung",
        ]}
      />

      <section className="border-t border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Haeufige Fragen zum Servicegebiet Bayern
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
