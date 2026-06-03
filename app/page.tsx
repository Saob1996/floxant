import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";

import { FloxServiceCard } from "@/components/FloxServiceCard";
import { RegionSelector } from "@/components/RegionSelector";
import { company } from "@/lib/company";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantRegions,
  getServicesByRegionAndCategory,
  type FloxantServiceCategory,
} from "@/lib/floxant-services";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/";
const canonical = `${company.url}${path}`;
const categoryOrder: FloxantServiceCategory[] = ["normal", "signature", "special"];
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte zuerst die passende Region klären.",
    "Düsseldorf: Reinigung. Regensburg: Umzug, Entrümpelung oder Übergabe.",
  ].join("\n"),
);

const faqItems = [
  {
    q: "Warum trennt FLOXANT Düsseldorf und Regensburg?",
    a: "Die Leistungen sind regional unterschiedlich ausgerichtet. Düsseldorf steht für Reinigung von Unternehmen, Praxen und Gewerbeobjekten. Regensburg steht für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabevorbereitung.",
  },
  {
    q: "Was passiert nach meiner Anfrage?",
    a: "FLOXANT prüft Ort, Objekt, Umfang, Termin und offene Punkte. Danach erhalten Sie eine klare Rückmeldung, Rückfragen oder ein unverbindliches Angebot.",
  },
  {
    q: "Ist die Anfrage kostenlos?",
    a: "Ja. Die Anfrage ist kostenlos und unverbindlich. Eine Zusage entsteht erst, wenn Umfang, Termin und nächster Schritt für beide Seiten klar sind.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT | Düsseldorf Reinigung und Regensburg Umzug & Übergabe",
  description:
    "FLOXANT trennt klar nach Region: Düsseldorf für Gewerbe-, Büro- und Praxisreinigung. Regensburg für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe.",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "FLOXANT | Region wählen",
    description:
      "Düsseldorf: Reinigung für Unternehmen. Regensburg: Umzug, Entrümpelung und Übergabereinigung.",
    images: [
      {
        url: "/assets/floxant-hero-neu-gedacht.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT regionale Dienstleistungen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLOXANT | Region wählen",
    description:
      "Düsseldorf für Reinigung. Regensburg für Umzug, Entrümpelung und Übergabe.",
    images: ["/assets/floxant-hero-neu-gedacht.png"],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT",
        description:
          "FLOXANT Startseite mit klarer Auswahl zwischen Düsseldorf Reinigung und Regensburg Umzug, Entrümpelung und Übergabe.",
        path,
        about: [
          "FLOXANT Düsseldorf Reinigung",
          "Gewerbereinigung Düsseldorf",
          "Umzug Regensburg",
          "Entrümpelung Regensburg",
          "Übergabereinigung Regensburg",
        ],
        potentialActions: [
          { name: "Services in Düsseldorf ansehen", target: "/duesseldorf", type: "Action" },
          { name: "Services in Regensburg ansehen", target: "/regensburg", type: "Action" },
          { name: "Per WhatsApp Kontakt aufnehmen", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      {
        "@type": "Organization",
        "@id": `${company.url}/#organization`,
        name: company.name,
        url: company.url,
        email: company.email,
        telephone: company.phoneRaw,
        sameAs: company.sameAs,
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

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate min-h-[92svh] overflow-hidden bg-slate-950 text-white">
        <Image
          src="/assets/floxant-hero-neu-gedacht.png"
          alt="FLOXANT als regionale Dienstleistungsmarke"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.78)_48%,rgba(15,23,42,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white to-transparent" />

        <div className="mx-auto grid min-h-[92svh] max-w-7xl content-end px-5 pb-8 pt-28 sm:px-8 lg:px-10">
          <div className="max-w-4xl pb-8">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Region zuerst. Dann die passende Leistung.
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
              FLOXANT
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-100 sm:text-xl">
              Eine Marke, zwei klare regionale Leistungsbereiche: Düsseldorf für professionelle Reinigung.
              Regensburg für Umzug, Entrümpelung, Haushaltsauflösung und Übergabe.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#region-waehlen"
                data-event="hero_cta_click"
                data-source="homepage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-cyan-50"
              >
                Region wählen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-source="homepage_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200/40 bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Per WhatsApp Kontakt aufnehmen
              </a>
            </div>
          </div>

          <div id="region-waehlen" className="scroll-mt-28">
            <RegionSelector source="homepage_hero_region_cards" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Warum diese Struktur
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Kunden sollen sofort wissen, ob FLOXANT passt.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Deshalb führt die Startseite nicht mehr durch eine gemischte Leistungswand.
              Sie wählen zuerst die Region. Danach sehen Sie nur die Leistungen, die dort wirklich gemeint sind.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Klare Region",
                text: "Düsseldorf und Regensburg werden nicht vermischt.",
              },
              {
                title: "Konkrete Anfrage",
                text: "Ort, Objekt, Umfang, Termin und Fotos reichen für den Start.",
              },
              {
                title: "Keine Preisversprechen",
                text: "Jede Anfrage wird individuell und unverbindlich geprüft.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <CheckCircle2 className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {(["duesseldorf", "regensburg"] as const).map((regionId) => {
              const region = floxantRegions[regionId];

              return (
                <section key={regionId} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                        {region.city}
                      </p>
                      <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
                        {region.label}
                      </h2>
                      <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-600">
                        {region.description}
                      </p>
                    </div>
                    <Link
                      href={region.href}
                      data-event="region_select"
                      data-region={regionId}
                      data-source="homepage_service_preview"
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-800"
                    >
                      Ansehen
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {categoryOrder.map((category) => {
                      const categoryServices = getServicesByRegionAndCategory(regionId, category);
                      if (!categoryServices.length) return null;

                      return (
                        <div key={`${regionId}-${category}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <div className="mb-3">
                            <h3 className="text-xs font-black uppercase tracking-normal text-slate-800">
                              {floxantCategoryLabels[category]}
                            </h3>
                            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                              {floxantCategoryDescriptions[category]}
                            </p>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {categoryServices.slice(0, 3).map((service) => (
                              <FloxServiceCard
                                key={service.id}
                                service={service}
                                compact
                                source={`homepage_${regionId}_${category}`}
                              />
                            ))}
                          </div>
                          {categoryServices.length > 3 ? (
                            <Link
                              href={region.href}
                              data-event="region_select"
                              data-region={regionId}
                              data-category={category}
                              data-source={`homepage_${regionId}_${category}_more`}
                              className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-800 transition hover:border-blue-200 hover:text-blue-800"
                            >
                              Weitere Services in {region.city} ansehen
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              So läuft die Anfrage ab
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Erst prüfen, dann sauber entscheiden.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Sie müssen keine perfekte Leistungsbeschreibung vorbereiten. Eine gute erste Anfrage nennt Region,
              Objekt, gewünschte Leistung, Zeitfenster, offene Punkte und wenn möglich Fotos.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Sie wählen Düsseldorf oder Regensburg.",
              "Sie senden die wichtigsten Eckdaten per Formular, WhatsApp oder Telefon.",
              "FLOXANT prüft Machbarkeit, Umfang und sinnvollen nächsten Schritt.",
              "Sie erhalten eine klare Rückmeldung und entscheiden unverbindlich.",
            ].map((step, index) => (
              <article key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Direktkontakt
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
              Unsicher, welche Region oder Leistung passt?
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              Schreiben Sie kurz, worum es geht. FLOXANT ordnet die Anfrage der richtigen Region zu
              und meldet sich mit dem passenden nächsten Schritt.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              data-source="homepage_final"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp starten
            </a>
            <Link
              href="/kontakt"
              data-event="footer_cta_click"
              data-source="homepage_final"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100"
            >
              Kontakt öffnen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
