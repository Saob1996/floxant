import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { floxantLocationList, getLocationContactHref } from "@/lib/floxant-locations";
import { generatePageSEO } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path: "/standorte",
  title: "FLOXANT Standorte | Düsseldorf & Regensburg",
  description:
    "Die zwei tatsächlichen FLOXANT Standorte, ihre getrennten Leistungen und die verifizierten 75-km-Einsatzgebiete auf einen Blick.",
});

export default function StandortePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Standorte Düsseldorf und Regensburg",
        description:
          "Übersicht der tatsächlichen FLOXANT Standorte, ihrer regionalen Leistungen und Einsatzgebiete.",
        path: "/standorte",
        about: ["FLOXANT Düsseldorf", "FLOXANT Regensburg", "Einsatzgebiete"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Standorte", item: "/standorte" },
      ]),
      {
        "@type": "ItemList",
        name: "FLOXANT Standorte",
        numberOfItems: floxantLocationList.length,
        itemListElement: floxantLocationList.map((location, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: location.displayName,
          url: `${company.url}${location.localLandingPage}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Standorte" }]} />

      <section className="border-b border-slate-200 bg-white px-5 pb-14 pt-8 sm:px-8 lg:pb-20 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase text-blue-700">Zwei tatsächliche Standorte</p>
          <h1 className="mt-3 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Düsseldorf und Regensburg – Leistungen klar getrennt.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
            FLOXANT betreibt keine Scheinstandorte in den umliegenden Städten und Gemeinden.
            Düsseldorf ist der Reinigungsstandort. Regensburg ist der Standort für Umzug,
            Transport und Räumung; Reinigung bleibt dort eine getrennte Ergänzungsleistung.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-black text-slate-700">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              Verifizierte Adressen
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              75-km-Gebietsprüfung
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              Zusage erst nach Prüfung
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {floxantLocationList.map((location) => {
            const isDuesseldorf = location.locationKey === "duesseldorf";
            const requestHref = getLocationContactHref(
              location.locationKey,
              isDuesseldorf ? "reinigung" : "umzug",
            );

            return (
              <article key={location.locationKey} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase text-blue-700">
                      {isDuesseldorf ? "Reinigungsstandort" : "Umzug, Transport und Räumung"}
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight">{location.displayName}</h2>
                  </div>
                  <Building2 className="h-8 w-8 shrink-0 text-blue-700" aria-hidden="true" />
                </div>

                <address className="mt-5 flex gap-3 not-italic text-sm font-semibold leading-7 text-slate-700">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>
                    {location.addressLine1}<br />
                    {location.postalCode} {location.city}, {location.country}
                  </span>
                </address>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <h3 className="text-sm font-black uppercase text-slate-500">Aktive Schwerpunkte</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {location.primaryServices.map((service) => (
                      <li key={service} className="flex gap-2 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  {location.secondaryServices.length > 0 ? (
                    <p className="mt-4 text-xs font-semibold leading-6 text-slate-500">
                      Ergänzend und getrennt prüfbar: {location.secondaryServices.join(", ")}.
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={location.localLandingPage}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
                  >
                    Standort ansehen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={location.serviceAreaPage}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-blue-400 hover:text-blue-800"
                  >
                    Ort im Einsatzgebiet prüfen
                  </Link>
                  <Link
                    href={requestHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-blue-400 hover:text-blue-800"
                  >
                    Anfrage senden
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <ShieldCheck className="h-8 w-8 text-blue-700" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black tracking-tight">Was ein Einsatzgebiet bedeutet</h2>
          </div>
          <div className="grid gap-3 text-sm font-semibold leading-7 text-slate-700 sm:grid-cols-2">
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              Die 75-km-Prüfung nutzt Luftlinie vom tatsächlichen Standort zu amtlichen
              Gemeindepunkten. Sie dient als transparente erste Orientierung.
            </p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              Eine aufgeführte Gemeinde ist keine weitere Niederlassung. Termin, Kapazität,
              Leistung, Straßenstrecke und Zugang werden immer persönlich geprüft.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg bg-slate-950 p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Ort oder Leistung noch unklar?</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-300">
              Schreiben Sie Ort, Leistung, Umfang und Terminwunsch. FLOXANT ordnet die Anfrage
              dem richtigen Standort zu und meldet sich persönlich.
            </p>
          </div>
          <Link
            href="/kontakt?source=standorte&intent=standort-anfrage#direktanfrage"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-blue-50"
          >
            Allgemeine Anfrage senden
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
