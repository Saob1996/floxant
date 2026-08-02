import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Route,
  ShieldCheck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceAreaSearch } from "@/components/service-areas/ServiceAreaSearch";
import { company, duesseldorfCompany } from "@/lib/company";
import {
  directionLabels,
  getDirectionGroups,
  getServiceAreaCounts,
  getServiceAreaMethodology,
  getServiceAreaRegion,
  getServiceAreaSearchPlaces,
  serviceAreaPageConfigs,
  type ServiceAreaRegionId,
} from "@/lib/service-areas";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

function formatDistance(distance: number) {
  return new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 1,
  }).format(distance);
}

function formatCoordinate(coordinate: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 5,
    maximumFractionDigits: 6,
  }).format(coordinate);
}

export function ServiceAreaPage({ regionId }: { regionId: ServiceAreaRegionId }) {
  const config = serviceAreaPageConfigs[regionId];
  const region = getServiceAreaRegion(regionId);
  const places = getServiceAreaSearchPlaces(regionId);
  const groups = getDirectionGroups(regionId);
  const counts = getServiceAreaCounts(regionId);
  const methodology = getServiceAreaMethodology();
  const location = regionId === "duesseldorf" ? duesseldorfCompany : company;
  const locationName = regionId === "duesseldorf" ? "Düsseldorf" : "Regensburg";
  const description = `${config.primaryServiceLabel} im Einsatzgebiet rund um ${locationName}: Ort anhand verifizierter Gemeindedaten prüfen und Eckdaten direkt an FLOXANT senden.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: config.title,
        description,
        path: config.path,
        about: [config.primaryServiceLabel, `Einsatzgebiet ${locationName}`],
        potentialActions: [
          { name: "Ort prüfen", target: `${config.path}#ort-pruefen` },
          { name: "Anfrage senden", target: config.requestHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: `${config.primaryServiceLabel} im Einsatzgebiet ${locationName}`,
        description,
        path: config.path,
        serviceType: config.primaryServiceLabel,
        areaServed: [
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: region.center.latitude,
              longitude: region.center.longitude,
            },
            geoRadius: "75000",
          },
        ],
        provider: {
          name: location.name,
          url: `${company.url}${config.hubHref}`,
          phoneRaw: location.phoneRaw,
          streetAddress: location.streetAddress,
          postalCode: location.postalCode,
          city: location.city,
          countryCode: location.countryCode,
        },
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: locationName, item: config.hubHref },
        { name: "Einsatzgebiet", item: config.path },
      ]),
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: locationName, href: config.hubHref },
          { label: "Einsatzgebiet" },
        ]}
      />

      <section className="border-b border-slate-200 bg-white px-4 pb-14 pt-8 sm:px-6 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              {config.eyebrow}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {config.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
              {config.intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#ort-pruefen"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Ort prüfen
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href={config.requestHref}
                data-event="seo_cta_click"
                data-region={config.id}
                data-service={config.primaryServiceId}
                data-page-intent="einsatzgebiet-anfrage"
                data-cta-label={`${config.primaryServiceLabel} anfragen`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-900 transition hover:border-blue-400 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Eckdaten senden
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-blue-200 bg-blue-50 p-6" aria-label="So ist das Gebiet definiert">
            <Route className="h-8 w-8 text-blue-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black">Transparent statt pauschal</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
              Grundlage ist die Luftlinie vom tatsächlichen Standort {locationName} zum amtlichen
              Gemeindepunkt. Die Grenze liegt bei höchstens 75 km. Straßenstrecke, Termin und
              Kapazität werden erst mit Ihrer Anfrage geprüft.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-white p-4">
                <dt className="text-xs font-black uppercase text-slate-500">Radius</dt>
                <dd className="mt-1 text-2xl font-black">75 km</dd>
              </div>
              <div className="rounded-md bg-white p-4">
                <dt className="text-xs font-black uppercase text-slate-500">Stand</dt>
                <dd className="mt-1 text-sm font-black">{region.places[0]?.lastVerifiedAt}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase text-blue-700">So läuft die Anfrage ab</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Von der Gebietsprüfung zur persönlichen Rückmeldung
          </h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "Eckdaten senden", "Ort, Leistung, Umfang und Terminwunsch übermitteln."],
              ["2", "Rückfragen klären", "Zugang, Fotos oder eine Besichtigung bei Bedarf abstimmen."],
              ["3", "Angebot erhalten", "Nach persönlicher Prüfung erhalten Sie den passenden nächsten Schritt."],
              ["4", "Termin abstimmen", "Erst danach werden Durchführung und konkreter Termin vereinbart."],
            ].map(([step, title, text]) => (
              <li key={step} className="rounded-lg border border-slate-200 bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-black text-white">
                  {step}
                </span>
                <h3 className="mt-4 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <ServiceAreaSearch places={places} config={config} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-blue-700">Leistungen am Standort</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Klare regionale Zuordnung
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Die Gebietsprüfung ändert nicht das Leistungsprofil des Standorts. Wählen Sie die
              passende Leistung; FLOXANT prüft anschließend Umfang, Zugang, Termin und Anfahrt.
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {config.serviceLinks.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <h3 className="text-lg font-black group-hover:text-blue-800">{service.label}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  Leistung ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">Orientierung</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Gebiet nach Richtung</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">
              Die Beispiele dienen der Orientierung. Eine Gemeinde erhält dadurch keine eigene
              Niederlassung oder automatisch eine eigene Ortsseite.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {groups.map((group) => (
                <div key={group.direction} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h3 className="font-black">{directionLabels[group.direction]}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {group.examples.join(", ")}
                    {group.count > group.examples.length ? " und weitere Orte" : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <ClipboardList className="h-7 w-7 text-blue-700" aria-hidden="true" />
              <h2 className="mt-3 text-2xl font-black">Diese Angaben helfen bei der Prüfung</h2>
              <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
                {config.detailsNeeded.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <ShieldCheck className="h-7 w-7 text-blue-700" aria-hidden="true" />
              <h2 className="mt-3 text-2xl font-black">Was Aufwand und Machbarkeit beeinflusst</h2>
              <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
                {config.effortFactors.map((factor) => (
                  <li key={factor}>• {factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase text-blue-700">Häufige Fragen</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Einsatzgebiet und Anfrage</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200">
            {config.faq.map((item) => (
              <details key={item.question} className="group p-5">
                <summary className="cursor-pointer text-base font-black">{item.question}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl rounded-lg bg-slate-950 p-7 text-white sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Ort und Auftrag gemeinsam prüfen</h2>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-300">
                Senden Sie Ort, Leistung und Eckdaten. FLOXANT antwortet persönlich; die
                Gebietszuordnung allein ist noch keine Auftrags- oder Terminzusage.
              </p>
            </div>
            <Link
              href={config.requestHref}
              data-event="seo_cta_click"
              data-region={config.id}
              data-service={config.primaryServiceId}
              data-page-intent="einsatzgebiet-anfrage"
              data-cta-label={`${config.primaryServiceLabel} anfragen`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Anfrage starten
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-6 border-t border-slate-700 pt-5 text-xs font-semibold leading-6 text-slate-400">
            Methodik: {methodology.distance}; Radius {methodology.coverageRadiusKm} km. Quelle:
            {" "}
            <a
              href={methodology.municipalitySourceUrl}
              rel="noreferrer"
              className="underline decoration-slate-500 underline-offset-4 hover:text-white"
            >
              {methodology.municipalitySource}
            </a>
            . Quellenvermerk: ©{" "}
            <a
              href={methodology.attributionUrl}
              rel="noreferrer"
              className="underline decoration-slate-500 underline-offset-4 hover:text-white"
            >
              BKG
            </a>{" "}
            2026{" "}
            <a
              href={methodology.licenseUrl}
              rel="noreferrer"
              className="underline decoration-slate-500 underline-offset-4 hover:text-white"
            >
              dl-de/by-2-0
            </a>{" "}
            (Daten verändert),{" "}
            <a
              href={methodology.dataSourcesUrl}
              rel="noreferrer"
              className="underline decoration-slate-500 underline-offset-4 hover:text-white"
            >
              Datenquellen
            </a>
            . Bearbeitung: Auswahl bis 75 km und Haversine-Distanzberechnung durch FLOXANT.
            Verifizierte Gebietseinträge: {counts.covered}; separat geprüfte und ausgeschlossene
            Grenzfälle: {counts.excludedBorderCases}. Standort: {region.center.address} (Koordinaten
            {" "}{formatCoordinate(region.center.latitude)}, {formatCoordinate(region.center.longitude)}).
          </p>
        </div>
      </section>
    </main>
  );
}
