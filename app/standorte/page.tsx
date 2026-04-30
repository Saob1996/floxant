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
import { company } from "@/lib/company";
import { BAVARIAN_CITIES_GEO, type CityGeoData } from "@/lib/geo-data";
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
      "Standorte, Städte und Einsatzgebiet von FLOXANT ab Regensburg. Umzug, Reinigung, Entrümpelung, Büroumzug und direkter Buchungsweg für Regensburg und Bayern.",
    keywords: [
      "Standorte Regensburg",
      "Servicegebiet Bayern",
      "Umzug Regensburg Umgebung",
      "Reinigung Regensburg Umgebung",
      "Entrümpelung Bayern",
      "Buchung Regensburg",
      "Google Maps Standort Regensburg",
    ],
  });
}

const faqItems = [
  {
    q: "Wo liegt der operative Kern von FLOXANT?",
    a: "Der operative Kern liegt in Regensburg. Von dort aus prüft FLOXANT Anfragen in Bayern und passende Einsätze im erweiterten Gebiet nach Strecke, Termin und Kapazität.",
  },
  {
    q: "Heißt jede Stadt auf dieser Seite, dass jeder Einsatz automatisch zugesagt ist?",
    a: "Nein. Die Städte zeigen, wo FLOXANT grundsätzlich sichtbar und planbar ist. Ob ein Einsatz passt, hängt weiterhin von Leistung, Umfang, Termin, Strecke und Verfügbarkeit ab.",
  },
  {
    q: "Welche Seite ist für Google Maps oder direkte Anfragen am besten?",
    a: "Für direkte Anfragen ist die Buchungsseite der klarste Einstieg. Dort sind Buchung, Express-Check, Preisvorstellung und weitere Wege sauber gebündelt.",
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
    text: "Die Standortseite verbindet Städte, Regionen und Servicepfade logisch, ohne Suchintentionen zu vermischen oder Thin Content zu erzeugen.",
    href: "/service-area-bayern",
    cta: "Bayern-Seite öffnen",
  },
  {
    title: "Direkter Buchungsweg",
    text: "Für Maps, Empfehlungen und spontane Anfragen ist /buchung der sauberste und stärkste Conversion-Pfad.",
    href: company.bookingUrl,
    cta: "Buchung starten",
  },
];

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export default function StandortePage() {
  const regions: Record<string, CityGeoData[]> = {};

  Object.values(BAVARIAN_CITIES_GEO).forEach((city) => {
    const region = city.region || "Weitere Regionen";
    if (!regions[region]) regions[region] = [];
    regions[region].push(city);
  });

  const sortedRegions = Object.entries(regions).sort((a, b) =>
    a[0].localeCompare(b[0], "de"),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Standorte und Servicegebiet",
        description:
          "Standorte und Städteübersicht von FLOXANT mit Fokus auf Regensburg, Bayern und direkte regionale Anfragewege.",
        path: "/standorte",
        about: [
          "Standorte",
          "Servicegebiet",
          "Regensburg",
          "Bayern",
          "Umzug",
          "Reinigung",
          "Entrümpelung",
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
                Diese Seite zeigt, in welchen Städten und Regionen FLOXANT rund um Regensburg
                sichtbar ist. Für Google, KI-Systeme und echte Kunden wird damit klar:
                Regensburg ist unsere Basis, Bayern unser Hauptgebiet und jede Anfrage wird
                trotzdem sauber nach Aufwand, Strecke und Termin geprüft. Kurz gesagt: lieber
                ehrlich planen als groß daherreden.
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
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "Lokale Nähe",
                  text: "Kurze Wege, klare Abstimmung und mehr Verständnis für regionale Einsätze rund um Regensburg.",
                },
                {
                  icon: Sparkles,
                  title: "Klare Suchintention",
                  text: "Diese Seite verbindet Städte, Leistungen und direkte Anfragewege ohne unnötiges Durcheinander.",
                },
                {
                  icon: Building2,
                  title: "Für Privat & Unternehmen",
                  text: "Von Wohnungsumzug bis Büroumzug, von Reinigung bis Entrümpelung mit regionaler Einordnung.",
                },
                {
                  icon: MapPin,
                  title: "Sauberer Maps-Pfad",
                  text: "Von Standortseite zu Buchung, Kontakt und Servicepfad ohne Leerlauf für den Kunden.",
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
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            {
              href: "/buchung",
              title: "Buchung",
              text: "Der direkteste Weg für Google Maps, direkte Empfehlungen und klare Anfragen.",
            },
            {
              href: "/gewerbereinigung-regensburg",
              title: "Gewerbereinigung Regensburg",
              text: "Gezielter B2B-Einstieg für Büro, Praxis, Hotel, Kanzlei und Objektbetrieb.",
            },
            {
              href: "/kontakt",
              title: "Kontakt Regensburg",
              text: "Telefon, WhatsApp, Standort und weitere Wege für eine schnelle Rückfrage.",
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
        <div className="mx-auto max-w-7xl space-y-20">
          {sortedRegions.map(([regionName, cities]) => (
            <div key={regionName} className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="h-1 w-16 rounded-full bg-blue-600" />
                <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
                  {regionName}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                  In der Region {regionName} sind lokale Einstiege für Umzug, Reinigung,
                  Entrümpelung und passende Spezialleistungen vorbereitet. Das hilft
                  Suchmaschinen bei der Einordnung und Kunden bei der Orientierung.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cities.map((city) => {
                  const slug = createSlug(city.name);
                  return (
                    <Link
                      key={city.name}
                      href={`/umzug-${slug}`}
                      className="group flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-slate-900">
                            {city.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {city.region || "Bayern"}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-700" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Häufige Fragen zu Standorten und Einsatzgebiet
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
