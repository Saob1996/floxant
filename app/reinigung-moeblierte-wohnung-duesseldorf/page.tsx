import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Camera,
  CalendarClock,
  CheckCircle2,
  KeyRound,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  CostDrivers,
  DecisionGuide,
  IncludedExcluded,
  KeyFacts,
  NextStep,
  QuickAnswer,
  RelatedServices,
  RequiredDetails,
  ScopeSummary,
} from "@/components/editorial/AuthorityBlocks";
import { PriorityFaqSection } from "@/components/editorial/PriorityFaqSection";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/reinigung-moeblierte-wohnung-duesseldorf";
const contactHref =
  "/kontakt?service=reinigung&city=duesseldorf&intent=ferienwohnung-reinigung-duesseldorf&source=seo";
const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte eine Ferienwohnung oder ein möbliertes Apartment in Düsseldorf reinigen lassen. Objekt, Fläche, Checkout, nächsten Check-in und Fotos kann ich senden.",
)}`;

const included = [
  "Bad, Küche, Schlafbereich, Böden und sichtbare Oberflächen nach vereinbartem Umfang",
  "Einordnung des Zeitfensters zwischen Checkout und nächstem Check-in",
  "Sichtkontrolle und kurze Zustandsrückmeldung nach Absprache",
  "Vorbereitung des vereinbarten Zielzustands für den nächsten Aufenthalt",
] as const;

const excluded = [
  "Wäschewechsel, Waschservice oder Bettenlogistik ohne vorherige Abstimmung",
  "Schlüsselkoordination, Inventarprüfung oder Fotodokumentation ohne ausdrückliche Bestätigung",
  "Gästekommunikation, Plattform-Support, Schadensregulierung oder Bewertungsmanagement",
  "Pauschale Zusagen zu Hotelstandard, Preis, Termin oder freien Kapazitäten",
] as const;

const requiredDetails = [
  "Adresse oder Stadtteil und Art des Objekts",
  "ungefähre Fläche, Zimmer, Schlafplätze und Bäder",
  "Checkout, nächster Check-in und verfügbares Zeitfenster",
  "aktueller Zustand und gewünschter Zielzustand",
  "Etage, Aufzug, Park- oder Ladeweg und Zugang",
  "Wünsche zu Wäsche, Schlüsseln, Fotos oder Inventar",
] as const;

const effortDrivers = [
  "Fläche, Raumaufteilung und Anzahl der Schlaf- und Sanitärbereiche",
  "Verschmutzungsgrad und Rückstände nach dem letzten Aufenthalt",
  "Zeitpuffer zwischen Checkout und nächstem Check-in",
  "Zugangsweg, Etage, Aufzug und Parksituation",
  "Küche, Bad, Glasflächen und besondere Oberflächen",
  "zusätzliche Abstimmung zu Wäsche, Schlüsseln, Fotos oder Inventar",
] as const;

const process = [
  {
    label: "01",
    title: "Objektprofil senden",
    text: "Objektart, Fläche, Räume, Zustand, Zugang und Fotos bilden die Grundlage.",
  },
  {
    label: "02",
    title: "Zeitfenster abgleichen",
    text: "Checkout, nächster Check-in und möglicher Puffer werden vor einer Zusage geprüft.",
  },
  {
    label: "03",
    title: "Umfang festlegen",
    text: "Reinigung und mögliche Zusatzpunkte werden ausdrücklich voneinander getrennt.",
  },
  {
    label: "04",
    title: "Nächsten Schritt abstimmen",
    text: "FLOXANT meldet zurück, was realistisch ist und welche Angaben noch fehlen.",
  },
] as const;

const baseMetadata = generatePageSEO({
  lang: "de",
  path: "reinigung-moeblierte-wohnung-duesseldorf",
  title: "Ferienwohnung-Reinigung Düsseldorf | Gästewechsel",
  description:
    "Ferienwohnung oder möbliertes Apartment in Düsseldorf reinigen lassen: Checkout, Check-in, Zugang, Fläche, Wäschewunsch und Fotos vorab klären.",
});

const baseOtherMetadata = Object.fromEntries(
  Object.entries(baseMetadata.other || {}).filter(([, value]) => value !== undefined),
) as Record<string, string | number | Array<string | number>>;

export const metadata: Metadata = {
  ...baseMetadata,
  other: {
    ...baseOtherMetadata,
    "geo.region": "DE-NW",
    "geo.placename": "Düsseldorf",
    "geo.position": "51.2277;6.7735",
    "dc.subject":
      "Ferienwohnung-Reinigung Düsseldorf, Apartmentreinigung Düsseldorf, Gästewechsel Düsseldorf, Reinigung möblierte Wohnung Düsseldorf",
    "dc.coverage":
      "Düsseldorf: Ferienwohnung, möbliertes Apartment, Gästewechsel und geprüfte lokale Reinigungsanfrage ohne Plattformpartnerschaft.",
  },
};

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "Ferienwohnung und Apartment", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Ferienwohnungs- und Apartmentreinigung Düsseldorf",
        description:
          "Reinigung und Vorbereitung von Ferienwohnungen und möblierten Apartments in Düsseldorf nach Objekt, Zustand, Terminfenster, Zugang und vereinbartem Umfang.",
        path: pagePath,
        serviceType:
          "Ferienwohnungsreinigung, Apartmentreinigung und Gästewechsel-Reinigung in Düsseldorf",
        areaServed: [
          "Düsseldorf",
          "Neuss",
          "Ratingen",
          "Meerbusch",
          "Hilden",
          "Erkrath",
          "Mettmann",
        ],
        availableLanguage: ["de", "en"],
      }),
      buildWebPageJsonLd({
        name: "Ferienwohnung und möbliertes Apartment in Düsseldorf reinigen lassen",
        description:
          "Lokale Leistungsseite für Ferienwohnung, möbliertes Apartment und Gästewechsel in Düsseldorf mit sichtbarem Umfang, Grenzen und Anfrageweg.",
        path: pagePath,
        about: [
          "Ferienwohnung-Reinigung Düsseldorf",
          "Apartmentreinigung Düsseldorf",
          "Gästewechsel-Reinigung",
          "Reinigung nach Checkout",
          "Reinigung vor Check-in",
          "plattformunabhängige Reinigung für Kurzzeitvermietung",
        ],
        potentialActions: [
          { name: "Ferienwohnungsreinigung anfragen", target: contactHref, type: "ContactAction" },
          { name: "Eckdaten per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default function FurnishedApartmentCleaningDuesseldorfPage() {
  return (
    <main className="overflow-hidden bg-white pb-24 text-slate-950 md:pb-0">
      <JsonLd />
      <Breadcrumbs
        items={[
          { label: "Reinigung Düsseldorf", href: "/duesseldorf/reinigung" },
          { label: "Ferienwohnung & Apartment" },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(8,47,73,0.88)_0%,rgba(15,23,42,0.96)_52%,rgba(2,6,23,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/25 bg-cyan-300/10 px-3 py-2 text-sm font-black text-cyan-100">
              <BedDouble className="h-4 w-4" aria-hidden="true" />
              Düsseldorf · Ferienwohnung & Apartment
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Reinigung für Ferienwohnung und möbliertes Apartment in Düsseldorf.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              FLOXANT prüft Reinigung und Gästewechsel nach Objekt, Zustand, Checkout, nächstem Check-in,
              Zugang und gewünschtem Umfang. Der Service ist plattformunabhängig und wird erst nach den
              konkreten Eckdaten bestätigt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={contactHref}
                data-event="seo_cta_click"
                data-region="duesseldorf"
                data-service="ferienwohnung_reinigung"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Apartment-Reinigung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-event="whatsapp_click"
                data-region="duesseldorf"
                data-service="ferienwohnung_reinigung"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-300/35 bg-emerald-300/10 px-6 text-sm font-black text-emerald-100 transition hover:bg-emerald-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Eckdaten per WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: CalendarClock, text: "Checkout und nächster Check-in werden als echtes Zeitfenster geprüft." },
              { icon: KeyRound, text: "Zugang und Schlüsselweg gehören vorab in die Abstimmung." },
              { icon: Camera, text: "Fotos und Zustandsrückmeldung sind nur im vereinbarten Umfang enthalten." },
              { icon: ShieldCheck, text: "Keine Plattformpartnerschaft und keine Hotelstandard-Garantie." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="rounded-lg border border-white/15 bg-white/[0.06] p-5 text-sm font-semibold leading-7 text-slate-100"
                >
                  <Icon className="mb-3 h-5 w-5 text-cyan-200" aria-hidden="true" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.08fr_0.92fr]">
          <QuickAnswer title="Was ist eine Ferienwohnungs- oder Gästewechsel-Reinigung?">
            <p>
              Sie verbindet den vereinbarten Reinigungsumfang mit dem konkreten Wechsel zwischen zwei
              Aufenthalten. Entscheidend sind nicht der Name einer Buchungsplattform, sondern Objektprofil,
              Zustand, Zeitfenster, Zugang und der ausdrücklich bestätigte Zielzustand.
            </p>
          </QuickAnswer>
          <KeyFacts
            items={[
              { label: "Region", value: "Düsseldorf; Umland nach Einzelfallprüfung" },
              { label: "Geeignet für", value: "Ferienwohnung, möblierte Wohnung, Apartment" },
              { label: "Wichtig", value: "Checkout, Check-in, Zugang und Fotos" },
              { label: "Nicht automatisch", value: "Wäsche, Schlüssel, Inventar und Gästesupport" },
            ]}
          />
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <DecisionGuide
            title="Welche Anfrage passt zu Ihrer Situation?"
            items={[
              {
                when: "Einmalige Reinigung einer möblierten Wohnung",
                then: "Zustand, Fläche, Möbel, Küche, Bad und gewünschter Übergabezustand beschreiben.",
              },
              {
                when: "Reinigung zwischen Checkout und Check-in",
                then: "Zusätzlich beide Uhrzeiten, Zugang, Puffer und eine klare Prioritätenliste nennen.",
              },
              {
                when: "Wiederkehrender Gästewechsel",
                then: "Objektprofil, Standardumfang, Ausnahmen und Rückmeldeweg einmal sauber festlegen.",
              },
              {
                when: "Übergabe nach längerer Vermietung",
                then: "Endreinigung und Gästewechsel trennen; Restmengen oder Schäden brauchen eine eigene Einordnung.",
              },
            ]}
          />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <ScopeSummary title="Der Umfang entsteht aus dem Objektprofil, nicht aus einem Plattformnamen.">
            <p>
              Zwei Apartments mit gleicher Fläche können unterschiedliche Zeitfenster, Küchen, Bäder,
              Wäschewege und Zugänge haben. FLOXANT trennt deshalb den Reinigungsumfang von optionalen
              Aufgaben und bestätigt keine pauschale Komplettleistung ohne diese Angaben.
            </p>
          </ScopeSummary>
          <div className="mt-7">
            <IncludedExcluded included={included} excluded={excluded} />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-cyan-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Düsseldorf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
              Zugang und Zeitpuffer sind Teil der lokalen Planung.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-slate-300">
              In dicht bebauten Bereichen können Etage, Aufzug, Ladeweg und Parksituation den verfügbaren
              Puffer stärker beeinflussen als die reine Quadratmeterzahl. Anfragen aus Neuss, Ratingen,
              Meerbusch, Hilden, Erkrath oder Mettmann werden anhand des konkreten Einsatzorts geprüft.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Adresse oder Stadtteil statt nur „Düsseldorf“ nennen.",
              "Etage, Aufzug und Entfernung vom möglichen Stellplatz beschreiben.",
              "Checkout und Check-in als Uhrzeit, nicht nur als Datum angeben.",
              "Zugangsdaten erst über einen abgestimmten sicheren Weg teilen.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                <p className="text-sm font-semibold leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <RequiredDetails items={requiredDetails} title="Diese Angaben vermeiden Rückfragen" />
          <CostDrivers items={effortDrivers} title="Was den Gästewechsel-Aufwand beeinflusst" />
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-blue-800">Ablauf</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            Vom Objektprofil zur realistischen Rückmeldung.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {process.map((step) => (
              <article key={step.label} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="font-mono text-sm font-black text-blue-800">{step.label}</p>
                <h3 className="mt-3 text-xl font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <RelatedServices
            links={[
              {
                href: "/airbnb-turnover-express",
                label: "Gästewechsel-Service",
                description: "Der überregionale Ablauf für Reinigung, Kontrolle, Schlüssel und Rückmeldung.",
              },
              {
                href: "/duesseldorf/reinigung",
                label: "Reinigung Düsseldorf",
                description: "Allgemeiner Einstieg für Wohnung, Büro, Gewerbe, Fenster und Übergabe.",
              },
              {
                href: "/duesseldorf/fensterreinigung",
                label: "Fensterreinigung Düsseldorf",
                description: "Wenn Glasflächen, Rahmen, Erreichbarkeit und Etage separat geklärt werden müssen.",
              },
              {
                href: "/angebot-vergleichen-duesseldorf",
                label: "Reinigungsangebot vergleichen",
                description: "Wenn bereits ein Angebot vorliegt und Umfang oder Zusatzpositionen unklar sind.",
              },
              {
                href: "/makler-vermieter-link",
                label: "Makler- und Vermieter-Link",
                description: "Für Objekt, Fotos, Rückmeldung und Übergabe, wenn mehrere Beteiligte koordiniert werden.",
              },
              {
                href: "/uebergabeakte",
                label: "Übergabeakte",
                description: "Wenn Zustand, Fotos, Schlüsselweg und offene Punkte vor der Übergabe dokumentiert werden sollen.",
              },
            ]}
          />
          <div className="mt-8">
            <NextStep
              title="Objekt und Zeitfenster kurz einordnen"
              text="Senden Sie Objektart, Fläche, Checkout, nächsten Check-in, Zugang und vorhandene Fotos. FLOXANT prüft, welcher nächste Schritt realistisch ist."
              href={contactHref}
              label="Anfrage vorbereiten"
            />
          </div>
        </div>
      </section>

      <PriorityFaqSection
        route={pagePath}
        title="Häufige Fragen zu Ferienwohnung und Gästewechsel"
        intro="Die Antworten trennen Reinigung, optionale Zusatzpunkte und Plattformaufgaben klar voneinander."
        includeJsonLd
        className="bg-slate-50"
      />
    </main>
  );
}
