import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MapPin, Sparkles } from "lucide-react";

import { FloxServiceCard } from "@/components/FloxServiceCard";
import { company } from "@/lib/company";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantCategoryOrder,
  floxantRegions,
  floxantServices,
  getServicesByRegionAndCategory,
  type FloxantRegion,
} from "@/lib/floxant-services";
import { regensburgCleaningReviewRoutes } from "@/lib/regional-route-policy";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/leistungen";
const canonical = `${company.url}${path}`;
const regionOrder: FloxantRegion[] = ["duesseldorf", "regensburg"];

const faqItems = [
  {
    q: "Warum sind die Leistungen nach Düsseldorf und Regensburg getrennt?",
    a: "FLOXANT Düsseldorf steht für gewerbliche Reinigung. FLOXANT Regensburg steht für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe. Die Trennung hilft Kunden, direkt den passenden Bereich zu finden.",
  },
  {
    q: "Kann ich ein bestehendes Angebot prüfen lassen?",
    a: "Ja. Sie können ein vorhandenes Angebot oder die wichtigsten Eckdaten senden. FLOXANT prüft, ob eine passende und wirtschaftlich interessante Alternative möglich ist. Die Prüfung ist kostenlos und unverbindlich.",
  },
  {
    q: "Sind alle Services sofort buchbar?",
    a: "Nein. Jede Anfrage wird nach Region, Objekt, Umfang, Termin und Machbarkeit geprüft. Danach erhalten Sie eine klare Rückmeldung zum sinnvollen nächsten Schritt.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Leistungen | Düsseldorf Reinigung & Regensburg Übergabe",
  description:
    "Alle FLOXANT Leistungen klar nach Region: Düsseldorf für Reinigung von Unternehmen, Praxen und Gewerbe. Regensburg für Umzug, Entrümpelung, Haushaltsauflösung und Übergabe.",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "FLOXANT Leistungen nach Region",
    description:
      "Düsseldorf: Reinigung. Regensburg: Umzug, Entrümpelung, Haushaltsauflösung und Übergabe.",
    images: [
      {
        url: "/assets/floxant-hero-neu-gedacht.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT Leistungen nach Region",
      },
    ],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Leistungen",
        description:
          "Zentrale Leistungsübersicht für FLOXANT Düsseldorf Reinigung und FLOXANT Regensburg Umzug, Entrümpelung, Haushaltsauflösung und Übergabe.",
        path,
        about: [
          "Gewerbereinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Praxisreinigung Düsseldorf",
          "Umzug Regensburg",
          "Entrümpelung Regensburg",
          "Haushaltsauflösung Regensburg",
          "Angebot prüfen lassen",
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Leistungen", item: path },
      ]),
      {
        "@type": "ItemList",
        "@id": `${canonical}#services`,
        name: "FLOXANT Leistungen",
        itemListElement: floxantServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": service.schemaType,
            name: service.title,
            description: service.shortDescription,
            url: `${company.url}${service.href}`,
            areaServed: floxantRegions[service.region].city,
            serviceType: floxantCategoryLabels[service.category],
          },
        })),
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

export default function LeistungenPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <Image
          src="/assets/floxant-hero-neu-gedacht.png"
          alt="FLOXANT Leistungen nach Region"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(15,23,42,0.82)_58%,rgba(15,23,42,0.54)_100%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100 backdrop-blur">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Erst Region wählen, dann passende Leistung anfragen
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.03] tracking-normal sm:text-5xl lg:text-6xl">
            FLOXANT Leistungen klar nach Düsseldorf und Regensburg getrennt.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            Düsseldorf bündelt die Reinigungsleistungen für Unternehmen, Praxen, Büros und
            Gewerbeobjekte. Regensburg bündelt Umzug, Entrümpelung, Haushaltsauflösung,
            Endreinigung und Übergabe.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {regionOrder.map((regionId) => {
              const region = floxantRegions[regionId];
              return (
                <Link
                  key={regionId}
                  href={`#${regionId}`}
                  data-event="region_select"
                  data-region={regionId}
                  data-source="leistungen_hero"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  {region.city} ansehen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              );
            })}
            <Link
              href="/angebot-vergleichen-duesseldorf"
              data-event="hero_cta_click"
              data-source="leistungen_hero"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200/50 bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Angebot prüfen lassen
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Düsseldorf: Reinigung ohne Umzugstexte",
            "Regensburg: Umzug, Räumung und Übergabe",
            "Signature Services für besondere Abstimmung",
            "Schnelle Hilfe, wenn erst Klarheit fehlt",
          ].map((item) => (
            <div key={item} className="flex min-w-0 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {regionOrder.map((regionId) => {
        const region = floxantRegions[regionId];

        return (
          <section
            key={regionId}
            id={regionId}
            className="scroll-mt-28 border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10"
          >
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                    {region.city}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                    {region.label}
                  </h2>
                  <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
                    {region.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Link
                    href={region.href}
                    data-event="region_select"
                    data-region={regionId}
                    data-source="leistungen_region_head"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {region.city} Bereich öffnen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="mt-10 grid gap-10">
                {floxantCategoryOrder.map((category) => {
                  const services = getServicesByRegionAndCategory(regionId, category);
                  if (!services.length) return null;

                  return (
                    <section
                      key={`${regionId}-${category}`}
                      id={`${regionId}-${category}`}
                      className="scroll-mt-28"
                    >
                      <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                          <p className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-black uppercase tracking-normal text-slate-700 shadow-sm ring-1 ring-slate-200">
                            <Sparkles className="h-4 w-4 text-blue-700" aria-hidden="true" />
                            {floxantCategoryLabels[category]}
                          </p>
                          <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                            {floxantCategoryDescriptions[category]}
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {services.map((service) => (
                          <FloxServiceCard
                            key={service.id}
                            service={service}
                            source={`leistungen_${regionId}_${category}`}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>

              {regionId === "regensburg" ? (
                <section
                  id="regensburg-reinigung-nach-pruefung"
                  className="mt-10 scroll-mt-28 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-normal text-blue-700">
                        Regensburg sauber eingeordnet
                      </p>
                      <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
                        Weitere Reinigungsseiten nach Prüfung
                      </h3>
                    </div>
                    <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                      Wenn Sie nach Reinigung in Regensburg gesucht haben, führen wir Sie zu den
                      passenden Regensburger Leistungen. Entscheidend sind Objekt, Fotos, Umfang
                      und das Ziel der Übergabe.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {regensburgCleaningReviewRoutes.map((route) => (
                      <Link
                        key={route.path}
                        href={route.targetHref}
                        data-event="service_card_click"
                        data-region="regensburg"
                        data-category="special"
                        data-source="leistungen_regensburg_review_routes"
                        className="group flex min-h-[11rem] flex-col rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
                      >
                        <p className="text-xs font-black uppercase tracking-normal text-blue-700">
                          Passend einordnen
                        </p>
                        <h4 className="mt-3 text-lg font-black leading-snug text-slate-950">
                          {route.shortLabel}
                        </h4>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                          {route.customerNeed}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-black text-blue-700">
                          {route.targetLabel}
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </section>
        );
      })}

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Häufige Fragen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Die Übersicht soll schnell zur richtigen Anfrage führen.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer text-base font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
