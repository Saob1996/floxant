import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MapPin, Sparkles } from "lucide-react";

import {
  OfferCheckCTA,
  ProblemBasedServiceLinks,
  RelatedSpecialServices,
  ServiceClusterLinks,
  ServiceDecisionGuide,
  SignatureServicesGrid,
  TrustProofSection,
} from "@/components/conversion";
import { ServiceFinder } from "@/components/ContactPathChooser";
import { DecisionCompassPanel } from "@/components/DecisionCompassPanel";
import { ServicePackageDecisionExperience } from "@/components/packages/ServicePackageDecisionExperience";
import { ServiceNavigationOverview } from "@/components/ServiceNavigationOverview";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { LocationClarityPanel } from "@/components/LocationClarityPanel";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { ProcessProofSteps } from "@/components/ProcessProofSteps";
import { ProjectStoryGrid } from "@/components/ProjectStoryGrid";
import { SignatureServiceClarityGrid } from "@/components/SignatureServiceClarityGrid";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { ServiceCatalog } from "@/components/services/ServiceCatalog";
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
import { locationClarityItems, signatureServiceClarityItems } from "@/lib/professional-copy";
import { regensburgCleaningReviewRoutes } from "@/lib/regional-route-policy";
import {
  offerCheckLinks,
  specialCleaningLinks,
  specialClearanceLinks,
  specialMovingLinks,
} from "@/lib/signature-special-services";
import { publicServices } from "@/lib/services/service-registry";
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
    q: "Wo ist Reinigung bei FLOXANT verfügbar?",
    a: "FLOXANT prüft Reinigungsanfragen für Düsseldorf und Regensburg anhand des konkreten Orts, Objekts und Umfangs. Eine Anfrage ist noch keine Verfügbarkeitszusage.",
  },
  {
    q: "Kann ich ein bestehendes Angebot prüfen lassen?",
    a: "Ja. Sie können ein vorhandenes Angebot oder die wichtigsten Eckdaten senden. FLOXANT prüft, ob eine passende und wirtschaftlich interessante Alternative möglich ist. Die Prüfung ist kostenlos und unverbindlich.",
  },
  {
    q: "Sind alle Services sofort buchbar?",
    a: "Nein. Jede Anfrage wird nach Region, Objekt, Umfang, Termin und Machbarkeit geprüft. Danach erhalten Sie eine klare Rückmeldung zum sinnvollen nächsten Schritt.",
  },
  {
    q: "Warum sind nicht alle Ideen eigene Seiten?",
    a: "FLOXANT zeigt eine eigene Seite, wenn die Leistung einen klaren Nutzen und genügend konkrete Informationen bietet. Weitere Themen bleiben als Leistungskarte oder häufige Frage sichtbar.",
  },
];

const serviceClusterGuide = [
  {
    title: "Reinigung, Solar und Außenflächen",
    text: "Für Büro, Praxis, Gewerbe, Glas, Fassade, Solar/PV und Endreinigung. Wichtig sind Objektart, Fläche, Fotos, Zugang und Zeitfenster.",
    href: "/reinigung",
    cta: "Reinigungswege öffnen",
  },
  {
    title: "Umzug und Transport",
    text: "Für Wohnungswechsel, Mini-Umzug, Möbeltransport, Express-Umzug oder Rückfahrt. Entscheidend sind Route, Volumen, Etage und Termin.",
    href: "/regensburg/umzug",
    cta: "Umzug/Transport wählen",
  },
  {
    title: "Räumung und Auflösung",
    text: "Für Entrümpelung, Keller, Lager, Nachlass und Haushaltsauflösung. Fotos, Menge, Material, Zugang und gewünschter Endzustand helfen.",
    href: "/regensburg/entruempelung",
    cta: "Räumung einordnen",
  },
  {
    title: "Angebot, Fairpreis und Vergleich",
    text: "Wenn bereits ein Angebot, Preis oder Screenshot vorliegt: Umfang, Zusatzkosten, Termin und Alternative sachlich prüfen lassen.",
    href: "/angebot-guenstiger-pruefen",
    cta: "Angebot prüfen",
  },
  {
    title: "Besondere FLOXANT-Leistungen",
    text: "Für Objektbrief, Fairpreis-Check, Übergabe-Sprint, Plan-B-Service, Rückfahrt-Radar und PV-Sichtklar.",
    href: "/signature-services",
    cta: "Besondere Leistungen ansehen",
  },
] as const;

const serviceTrustProofs = [
  "Jede Anfrage beginnt mit Ort, Leistung, kurzer Beschreibung und einem Kontaktweg.",
  "Fotos, vorhandene Angebote, Budget, Termin oder Dringlichkeit bleiben optional, aber hilfreich.",
  "Die Leistungsseite führt zu echten Kontaktwegen statt zu dünnen Einzelideen.",
  "Reinigung wird zuerst nach Standort gewählt: Düsseldorf oder Regensburg, damit Anfrage und Erwartung zusammenpassen.",
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Leistungen: Reinigung, Umzug und mehr anfragen",
  description:
    "Wählen Sie Region und Aufgabe: Reinigung, Umzug, Räumung, Angebotsprüfung oder diskrete Hilfe direkt anfragen.",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "FLOXANT Leistungen nach Region und Aufgabe",
    description:
      "Leistung wählen und mit Ort, Umfang, Fotos und Termin in Düsseldorf oder Regensburg anfragen.",
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
          "Zentrale Leistungsübersicht für FLOXANT Düsseldorf und Regensburg: Reinigung, Umzug, Transport, Entrümpelung, Haushaltsauflösung, Übergabe und Angebotsprüfung.",
        path,
        about: [
          "Gewerbereinigung Regensburg",
          "Büroreinigung Regensburg",
          "Praxisreinigung Regensburg",
          "Reinigung Regensburg 50 km",
          "Glasreinigung",
          "Fassadenreinigung",
          "Umzug Regensburg",
          "Mini-Umzug",
          "Möbeltransport",
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
          src="/assets/floxant-hero-neu-gedacht.webp"
          alt="FLOXANT Leistungen nach Region"
          fill
          priority
          fetchPriority="high"
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
            Reinigung, Umzug, Räumung und weitere FLOXANT-Leistungen.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            Starten Sie nicht mit einer langen Service-Liste, sondern mit der Kundensituation.
            Düsseldorf und Regensburg bündeln die jeweils öffentlich geprüften Leistungen
            für Reinigung, Umzug, Transport, Räumung und Übergabe. Wenn bereits ein Angebot
            vorliegt, ist die Angebotsprüfung der kürzere Weg.
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
              href="/angebot-vergleichen-regensburg"
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

      <LocationClarityPanel locations={locationClarityItems} />

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10 lg:py-20" aria-labelledby="service-katalog-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">Öffentlich geprüftes Service-Register</p>
            <h2 id="service-katalog-heading" className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Leistungen nach Region und Bedarf filtern
            </h2>
            <p className="mt-4 font-medium leading-7 text-slate-700">
              Der Katalog zeigt nur Leistungen, die im zentralen Register für die öffentliche Darstellung freigegeben sind. Die Filter arbeiten ausschließlich lokal im Browser und erzeugen keine indexierbaren Ergebnis-URLs.
            </p>
          </div>
          <noscript>
            <p className="mb-6 rounded-xl border border-cyan-200 bg-cyan-50 p-4 font-semibold text-slate-800">
              Alle freigegebenen Leistungen bleiben als Links sichtbar; die Filter benötigen JavaScript.
            </p>
          </noscript>
          <ServiceCatalog services={publicServices} locale="de" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/service-finder" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600">
              Service Finder öffnen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/fragen" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 px-5 text-sm font-black text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600">Häufige Fragen ansehen</Link>
          </div>
        </div>
      </section>

      <ServiceNavigationOverview
        title="Die wichtigsten Leistungen ohne Suchschleife."
        intro="Reinigung, Umzug, Räumung, Angebotsprüfung und besondere Leistungen sind nach typischen Kundensituationen geordnet."
      />

      <DecisionCompassPanel />

      <SignatureServiceClarityGrid
        title="Zusätzliche Hilfe für besondere Situationen."
        intro="Wenn Angebot, Objekt, Übergabe oder Plan B unklar sind, hilft eine passende Vorprüfung. So können Sie Ihre Situation verständlich beschreiben und die nötigen Angaben vorbereiten."
        services={signatureServiceClarityItems}
      />

      <section className="border-b border-slate-200 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Regensburg: Reinigung, Büro, Gewerbe, Praxis und Übergabe",
            "Regensburg: Umzug, Transport, Räumung, Haushaltsauflösung und Übergabe",
            "FLOXANT Signature für diskrete oder abstimmungsintensive Fälle",
            "Angebotsprüfung, wenn bereits ein Preis oder Angebot vorliegt",
          ].map((item) => (
            <div key={item} className="flex min-w-0 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceDecisionGuide
        eyebrow="Leistungen im Überblick"
        title="Erst die Situation wählen, dann die passende Leistung öffnen."
        intro="Manche Anfragen betreffen mehrere Aufgaben. Diese Übersicht führt Sie zum passenden Formular."
        items={serviceClusterGuide}
      />

      <ServicePackageDecisionExperience
        variant="default"
        limitPerGroup={2}
        heading="Einzelne oder verbundene Leistungen auswählen."
        intro="Die Übersicht trennt einzelne Leistungen, kombinierte Aufgaben und die Angebotsprüfung. So finden Sie schneller die passende Anfrage."
      />

      <ServiceFinder
        compact
        currentCity="regensburg"
        title="Welche Leistung möchten Sie anfragen?"
        intro="Wählen Sie eine Leistung und ergänzen Sie anschließend Ort, Umfang und Termin im Formular."
        source="leistungen-service-finder"
      />

      <SignatureServicesGrid
        title="Zusätzliche Hilfe verbindet mehrere Aufgaben."
        intro="Angebotsprüfung, Objektbrief, Übergabe, Plan B, Rückfahrt und PV-Reinigung helfen, wenn eine normale Einzelanfrage nicht ausreicht."
        limit={6}
      />

      <ProblemBasedServiceLinks limit={6} />

      <ServiceClusterLinks
        eyebrow="Besondere Leistungen"
        title="Zusätzliche Hilfe für besondere Situationen"
        intro="Wählen Sie die passende Unterstützung für Reinigung, Angebot, Übergabe oder dringende Fälle."
        links={[
          ...specialCleaningLinks.slice(0, 4),
          ...specialMovingLinks.slice(0, 3),
          ...specialClearanceLinks.slice(0, 3),
        ]}
      />

      <RelatedSpecialServices
        kind="offer"
        title="Angebotsprüfung als eigene Leistung."
        intro="Wenn Preis, Umfang oder Anbieterwahl schon im Raum stehen, fuehren diese Einstiege zur sachlichen Pruefung statt zu einem weiteren Vergleichsportal."
        services={offerCheckLinks}
        limit={3}
      />

      <OfferCheckCTA />

      <TrustProofSection
        eyebrow="Diese Angaben helfen"
        title="Wenige Pflichtangaben, bessere Rückmeldung."
        intro="FLOXANT fragt nur ab, was für den Start wichtig ist. Alles Weitere verbessert die Einschätzung, bleibt aber freiwillig."
        proofs={serviceTrustProofs}
      />

      <TrustProofPanel
        allowedPage="/leistungen"
        serviceKey="reinigung"
        title="Service-Trust bleibt an Angaben gebunden."
        intro="Die Leistungsübersicht zeigt, welche Belege eine Anfrage verbessern, und welche Aussagen FLOXANT bewusst nicht als unbelegte Garantie nutzt."
      />

      <ServiceProofChecklist
        serviceKey="reinigung"
        title="Proof-Inputs für Reinigung, Umzug und Sonderfälle"
        intro="Die Checkliste startet mit Reinigung, gilt als Muster für alle Leistungen: Objekt, Zugang, Fotos, Termin und Ziel müssen zusammenpassen."
      />

      <ProcessProofSteps />

      <ProjectStoryGrid
        title="Typische Ausgangslagen statt erfundener Case Studies."
        intro="Die Übersicht nutzt nur abstrakte, klar gekennzeichnete Situationen. Echte Projektstorys bleiben verborgen, bis Einwilligung und Privacy-Check vorliegen."
      />

      <ServiceVisualProofGrid
        title="Visual Proof mit Privacy-Grenzen."
        intro="Sichtbare Visuals sind neutral. Echte Vorher-Nachher-Fotos oder Objektbilder werden erst nach Freigabe und Anonymisierung genutzt."
      />

      <LocalProofPanel location="regensburg" className="bg-slate-900" />

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
