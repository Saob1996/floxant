import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Radar, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Einsatzradar } from "@/components/Einsatzradar";
import { company } from "@/lib/company";
import {
  einsatzradarFaq,
  einsatzradarFilters,
  einsatzradarRegionZones,
  getPublishedEinsatzradarEntries,
} from "@/lib/einsatzradar-data";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/einsatzradar-regensburg";

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20m%C3%B6chte%20meinen%20Fall%20im%20Raum%20Regensburg%20pr%C3%BCfen%20lassen.%20Es%20geht%20um%20%5BUmzug%2FReinigung%2FEntr%C3%BCmpelung%2FTransport%2F%C3%9Cbergabe%5D.%20Ort%2C%20Termin%2C%20Fotos%20und%20Umfang%20kann%20ich%20senden.";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path,
    title: "FLOXANT Einsatzradar Regensburg – Umzug, Reinigung & Entrümpelung",
    description:
      "Anonymisierte Einsatzarten und Servicebereiche von FLOXANT im Raum Regensburg: Umzug, Reinigung, Entrümpelung, Transport, Übergabe, Rückfahrt und Objektvorbereitung.",
  });
}

export default function EinsatzradarRegensburgPage() {
  const publishedEntries = getPublishedEinsatzradarEntries();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Einsatzradar Regensburg",
        description:
          "Typische Einsatzarten, grobe Servicezonen und passende Kontaktwege fuer FLOXANT im Raum Regensburg und getrennt fuer Duesseldorf Reinigung/Entsorgung.",
        path,
        about: [
          "Einsatzradar",
          "Regensburg",
          "Umzug",
          "Reinigung",
          "Entruempelung",
          "Transport",
          "Rueckfahrt",
          "Uebergabeakte",
          "Mieterwechsel",
        ],
        potentialActions: [
          { name: "Eigenen Fall pruefen lassen", target: "/buchung#buchungssystem" },
          { name: "WhatsApp Anfrage senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Einsatzradar Regensburg",
        description:
          "Typische Einsatzarten fuer Umzug, Reinigung, Entruempelung, Transport, Uebergabe, Rueckfahrt und Objektvorbereitung im Raum Regensburg.",
        path,
        serviceType: "Einsatzarten und Servicezonen fuer FLOXANT Regensburg",
        areaServed: ["Regensburg", "Umgebung Regensburg", "Bayern nach Verfuegbarkeit", "Duesseldorf Reinigung und Entsorgung"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Einsatzradar Regensburg", item: path },
      ]),
      buildFaqJsonLd(einsatzradarFaq),
      {
        "@type": "ItemList",
        name: "FLOXANT Einsatzarten im Raum Regensburg",
        itemListElement: publishedEntries.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.title,
          url: `${company.url}${entry.target_url}`,
          description: `${entry.approximate_location}: ${entry.description}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_46%,#eef6ff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Einsatzradar Regensburg" }]} />

      <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              <Radar className="h-4 w-4" />
              FLOXANT Einsatzübersicht
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
              FLOXANT Einsatzradar für Regensburg und Umgebung
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Welche Einsatzarten FLOXANT im Raum Regensburg prüft: Umzug, Reinigung,
              Entrümpelung, Transport, Wohnungsübergabe, Mieterwechsel und Rückfahrt nach
              Verfügbarkeit.
            </p>
            <div className="mt-7 grid gap-2 text-sm font-bold text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Regensburg direkt",
                "Umgebung ca. 200 km",
                "Bayern nach Verfügbarkeit",
                "Düsseldorf passend zum Anliegen",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-950/5">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/buchung#buchungssystem"
                data-event="hero_cta_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700"
              >
                Eigenen Fall prüfen lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                Fall per WhatsApp senden
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-blue-500/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
              <div className="grid gap-3">
                {einsatzradarRegionZones.map((zone, index) => (
                  <div key={zone.id} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">Zone {index + 1}</p>
                        <h2 className="mt-1 text-base font-black text-slate-950">{zone.title}</h2>
                        <p className="mt-2 text-xs leading-6 text-slate-600">{zone.description}</p>
                      </div>
                      <MapPin className="h-5 w-5 shrink-0 text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-xs leading-6 text-amber-900">
                Keine Live-Karte, keine Fake-Einsätze, keine Adressen: Der Radar zeigt typische Einsatzarten und sichere grobe Zonen.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Warum anonymisiert?</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Lokaler Proof ohne Kundendaten-Leck</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                FLOXANT zeigt hier typische Einsatzarten statt exakter Einsatzdaten. Echte Fälle dürfen
                später nur anonymisiert, grob regional und mit Freigabe veröffentlicht werden.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Keine Kundennamen",
                "Keine exakten Adressen",
                "Keine personenbezogenen Fotos ohne Freigabe",
                "Keine Live- oder Heute-Behauptung",
                "Nur grobe Regionen",
                "Düsseldorf getrennt fuer Reinigung/Entsorgung",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1rem] border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm font-bold leading-6 text-blue-950">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Einsatzradar
        entries={publishedEntries}
        filters={einsatzradarFilters}
        zones={einsatzradarRegionZones}
        title="Typische Einsatzarten im FLOXANT Radar"
        subtitle="Filterbare Einsatzkarten mit grober Region, Problem, FLOXANT-Lösung, Signature-Service und passender Zielseite."
        source="einsatzradar_page"
        ctaHref="/buchung#buchungssystem"
        ctaLabel="Eigenen Fall senden"
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white sm:p-8">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Signature Services</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Der Radar verbindet Einsatzarten mit echten FLOXANT Startpunkten</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Nicht jede Anfrage braucht dieselbe Leistung. Deshalb fuehren Einsatzkarten direkt zu
              passenden Seiten wie Rueckfahrt-Boerse, Uebergabeakte, Mieterwechsel, Keller-/Muellraum
              oder Wohnung wieder vermietbar.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Uebergabeakte", href: "/uebergabeakte" },
              { label: "Rueckfahrt-Boerse", href: "/rueckfahrt-boerse" },
              { label: "Mieterwechsel", href: "/mieterwechsel-service-regensburg" },
              { label: "Keller-/Muellraum", href: "/keller-muellraum-rettung-regensburg" },
              { label: "Wohnung wieder vermietbar", href: "/wohnung-wieder-vermietbar" },
              { label: "Angebotscheck", href: "/angebotscheck" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-black text-slate-800 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zum FLOXANT Einsatzradar</h2>
          <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
            {einsatzradarFaq.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="cursor-pointer list-none text-base font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/buchung#buchungssystem" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700">
              Typische Anfrage senden
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/einsatzgebiet-regensburg-200km" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:text-blue-700">
              Servicegebiet ansehen
            </Link>
          </div>
        </div>
      </section>

      <div className="flox-mobile-action-wrap z-40 md:hidden">
        <div className="flox-mobile-action-shell">
          <div className="flox-mobile-action-grid">
        <Link href="/buchung#buchungssystem" className="flox-mobile-action flox-mobile-action-primary" data-event="hero_cta_click">
          Fall senden
        </Link>
        <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
          WhatsApp
        </a>
        <a href={`tel:${company.phoneRaw}`} className="flox-mobile-action flox-mobile-action-light">
          Anrufen
        </a>
          </div>
        </div>
      </div>
    </main>
  );
}
