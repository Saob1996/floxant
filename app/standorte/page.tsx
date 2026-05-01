import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  MapPin,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import {
  BAVARIA_DIRECT_DEMAND_LINKS,
  BAVARIA_COVERAGE_GROUPS,
  BAVARIA_MAPS_SERVICE_INTENTS,
  BAVARIA_METRO_DISTRICT_LINKS,
  BAVARIA_REGENSBURG_PROXIMITY_LINKS,
} from "@/lib/bavaria-coverage";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "/standorte",
    title: "Standorte & Einsatzgebiet | FLOXANT Regensburg, Bayern und direkter Buchungsweg",
    description:
      "Standorte, Staedte, Bezirke und Einsatzgebiet von FLOXANT ab Regensburg. Umzug, Reinigung, Entruempelung, Bueroumzug und direkter Buchungsweg fuer ganz Bayern.",
    keywords: [
      "Standorte Regensburg",
      "Servicegebiet Bayern",
      "Umzug Regensburg Umgebung",
      "Reinigung Regensburg Umgebung",
      "Entruempelung Bayern",
      "Buchung Regensburg",
      "Google Maps Standort Regensburg",
    ],
  });
}

const faqItems = [
  {
    q: "Wo liegt der operative Kern von FLOXANT?",
    a: "Der operative Kern liegt in Regensburg. Von dort aus prueft FLOXANT Anfragen in Bayern und passende Einsaetze im erweiterten Gebiet nach Strecke, Termin und Kapazitaet.",
  },
  {
    q: "Heisst jede Stadt auf dieser Seite, dass jeder Einsatz automatisch zugesagt ist?",
    a: "Nein. Die Staedte zeigen, wo FLOXANT grundsaetzlich sichtbar und planbar ist. Ob ein Einsatz passt, haengt weiterhin von Leistung, Umfang, Termin, Strecke und Verfuegbarkeit ab.",
  },
  {
    q: "Welche Seite ist fuer Google Maps oder direkte Anfragen am besten?",
    a: "Fuer direkte Anfragen ist die Buchungsseite der klarste Einstieg. Dort sind Buchung, Express-Check, Preisvorstellung und weitere Wege sauber gebuendelt.",
  },
];

const regionalSignalCards = [
  {
    title: "Regensburg als Standortsignal",
    text: "Adresse, Kontaktwege und direkter Buchungsweg geben Google Maps, Google Search und Kunden einen klaren lokalen Anker.",
    href: company.contactUrl,
    cta: "Kontakt ansehen",
  },
  {
    title: "Bayern als Einsatzgebiet",
    text: "Die Standortseite verbindet Staedte, Regionen und Servicepfade logisch, ohne Suchintentionen zu vermischen oder Thin Content zu erzeugen.",
    href: "/service-area-bayern",
    cta: "Bayern-Seite oeffnen",
  },
  {
    title: "Direkter Buchungsweg",
    text: "Fuer Maps, Empfehlungen und spontane Anfragen ist /buchung der sauberste und staerkste Conversion-Pfad.",
    href: company.bookingUrl,
    cta: "Buchung starten",
  },
];

const businessModelCards = [
  {
    title: "Direktpfad statt Lead-Boerse",
    text: "FLOXANT fuehrt Standortsignal, Rechner und Buchung auf denselben klaren Anfrageweg. Das macht das Geschaeftsmodell fuer Kunden sofort verstaendlich.",
  },
  {
    title: "Regensburg fuehrt, Bayern skaliert",
    text: "Der lokale Kern bleibt sichtbar, waehrend Bayern ueber echte Marktpfade, Bezirke und Service-Kombinationen erweitert wird.",
  },
  {
    title: "Jeder Pfad endet in Conversion",
    text: "Standorte sollen nicht nur ranken, sondern in Buchung, Kontakt, WhatsApp oder Vorpruefung weiterleiten.",
  },
];

export default function StandortePage() {
  const totalLocationLinks = BAVARIA_COVERAGE_GROUPS.reduce(
    (sum, group) => sum + group.links.length,
    0,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Standorte und Servicegebiet",
        description:
          "Standorte, Staedte, Bezirke und direkte regionale Anfragewege von FLOXANT mit Fokus auf Regensburg und Bayern.",
        path: "/standorte",
        about: [
          "Standorte",
          "Servicegebiet",
          "Regensburg",
          "Bayern",
          "Umzug",
          "Reinigung",
          "Entruempelung",
        ],
        potentialActions: [
          { name: "Direkte Anfrage starten", target: "/buchung" },
          { name: "Servicegebiet Bayern ansehen", target: "/service-area-bayern" },
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Standorte", item: "/standorte" },
      ]),
      buildFaqJsonLd(faqItems),
      {
        "@type": "ItemList",
        name: "FLOXANT Maps-Service-Suchintentionen",
        description:
          "Direkte Servicepfade fuer Maps-Suchen wie Umzug, Reinigung, Entruempelung, Entsorgung, Lagerung und Bueroumzug.",
        itemListElement: BAVARIA_MAPS_SERVICE_INTENTS.map((intent, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: intent.title,
          url: `${company.url}${intent.primary.href}`,
          description: intent.description,
        })),
      },
      {
        "@type": "ItemList",
        name: "FLOXANT Regensburg Nahraum",
        itemListElement: BAVARIA_REGENSBURG_PROXIMITY_LINKS.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `${company.url}${item.href}`,
          description: item.note,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(59,130,246,0.1),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Standorte" }]} />

      <section className="relative overflow-hidden px-6 pb-16 pt-8 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-34">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <MapPin className="h-4 w-4" />
                Regensburg als Kern, Bayern im Fokus
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                Standorte und Einsatzgebiet von FLOXANT klar eingeordnet.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                Diese Seite zeigt, in welchen Städten, Regionen und starken Marktachsen FLOXANT
                rund um Regensburg erreichbar ist. Für Kunden wird damit klar: Regensburg ist
                unsere Basis, Bayern unser Hauptgebiet und jede Anfrage wird nach Aufwand,
                Strecke und Termin geprüft.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/buchung"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Direkt anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/service-area-bayern"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Bayern-Seite öffnen
                  <Radar className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Regionen", value: `${BAVARIA_COVERAGE_GROUPS.length}` },
                  { label: "Direkte Marktpfade", value: `${totalLocationLinks}+` },
                  { label: "Metropolbezirke", value: `${BAVARIA_METRO_DISTRICT_LINKS.length}` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.35rem] border border-slate-200 bg-white/86 p-4 shadow-sm shadow-slate-950/5"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                      {item.label}
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-slate-950">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {businessModelCards.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.45rem] border border-slate-200 bg-white/92 p-4 shadow-sm shadow-slate-950/5"
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                      Geschaeftsmodell
                    </div>
                    <h2 className="mt-2 text-base font-semibold text-slate-950">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "Lokale Naehe",
                  text: "Kurze Wege, klare Abstimmung und mehr Verstaendnis fuer regionale Einsaetze rund um Regensburg.",
                },
                {
                  icon: Sparkles,
                  title: "Klare Suchintention",
                  text: "Diese Seite verbindet Staedte, Leistungen und direkte Anfragewege ohne unnoetiges Durcheinander.",
                },
                {
                  icon: Building2,
                  title: "Fuer Privat & Unternehmen",
                  text: "Von Wohnungsumzug bis Bueroumzug, von Reinigung bis Entruempelung mit regionaler Einordnung.",
                },
                {
                  icon: MapPin,
                  title: "Sauberer Maps-Pfad",
                  text: "Von Standortseite zu Buchung, Kontakt und Servicepfad ohne Leerlauf fuer den Kunden.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                  >
                    <Icon className="h-5 w-5 text-blue-700" />
                    <h2 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {regionalSignalCards.map((item) => {
            const external = item.href.startsWith("http");
            const classes =
              "rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md";

            return external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                  Lokales Signal
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={classes}>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                  Lokales Signal
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto mb-4 max-w-6xl">
          <div className="rounded-[1.8rem] border border-blue-100 bg-white p-6 shadow-sm shadow-slate-950/5">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Google Maps Service-Intentionen
            </div>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950">
              Wenn Kunden nur den Service suchen, soll der richtige FLOXANT-Pfad sofort passen
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">
              Diese Matrix trennt die wichtigsten Maps-Suchen sauber: Umzug, Reinigung,
              Entruempelung, Entsorgung, Lagerung, Bueroumzug und Gewerbereinigung bekommen
              eindeutige Einstiege statt gemischter Signale.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {BAVARIA_MAPS_SERVICE_INTENTS.map((intent) => (
                <article
                  key={intent.id}
                  className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    {intent.query}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">{intent.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {intent.description}
                  </p>
                  <Link
                    href={intent.primary.href}
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700"
                  >
                    {intent.primary.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            {
              href: "/buchung",
              title: "Buchung",
              text: "Der direkteste Weg fuer Google Maps, direkte Empfehlungen und klare Anfragen.",
            },
            {
              href: "/gewerbereinigung-regensburg",
              title: "Gewerbereinigung Regensburg",
              text: "Gezielter B2B-Einstieg fuer Buero, Praxis, Hotel, Kanzlei und Objektbetrieb.",
            },
            {
              href: "/kontakt",
              title: "Kontakt Regensburg",
              text: "Telefon, WhatsApp, Standort und weitere Wege fuer eine schnelle Rueckfrage.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                Lokaler Einstieg
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="regionen" className="px-6 py-20">
        <div className="mx-auto mb-16 max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5">
          <div className="mb-6 max-w-3xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Regensburg Nahraum
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Stadtnahe Orte, die das lokale Maps-Signal verdichten
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Der Kern bleibt Regensburg. Diese umliegenden Orte helfen, lokale Suchanfragen
              rund um Stadt, Landkreis und direkte Einsatzkorridore sichtbar sauber zu fuehren.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BAVARIA_REGENSBURG_PROXIMITY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.15rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-20">
          {BAVARIA_COVERAGE_GROUPS.map((group) => (
            <div key={group.id} className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="h-1 w-16 rounded-full bg-blue-600" />
                <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
                  {group.region}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                  {group.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-slate-900">{link.label}</div>
                        <div className="text-xs text-slate-500">{group.region}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-700" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,0.98))] p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-9">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Metropolpfade
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Stadtteile und urbane Nachfragepfade mit eigener Signalwirkung
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Diese Bezirksseiten helfen bei klaren Suchintentionen in dichten Stadtlagen und
              staerken die lokale Relevanz ueber die grossen Bayern-Hubs hinaus.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {BAVARIA_METRO_DISTRICT_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                  Bezirksseite
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{item.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Nachfragepfade Bayern
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Direkte Marktseiten fuer starke Such- und Buchungsintention
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Diese Pfade zeigen am schnellsten, wie FLOXANT in Bayern gefunden werden soll:
              lokal verankert in Regensburg, aber mit klaren Service- und Stadtachsen fuer
              Muenchen, Nuernberg, Augsburg und Niederbayern.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {BAVARIA_DIRECT_DEMAND_LINKS.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.55rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Direktseite
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-950">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Haeufige Fragen zu Standorten und Einsatzgebiet
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
