import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, CalendarClock, CheckCircle2, KeyRound, ShieldCheck, Sparkles } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RegensburgApartmentCleaningForm } from "@/components/RegensburgApartmentCleaningForm";
import { CleaningProcessBlock } from "@/components/cleaning-seo/CleaningProcessBlock";
import { LocalTrustBlock } from "@/components/cleaning-seo/LocalTrustBlock";
import { RelatedServicesBlock } from "@/components/cleaning-seo/RelatedServicesBlock";
import { RequestChecklistBlock } from "@/components/cleaning-seo/RequestChecklistBlock";
import { ServiceAreaBlock } from "@/components/cleaning-seo/ServiceAreaBlock";
import { company } from "@/lib/company";
import { buildRegensburgCleaningAreaServedJsonLd } from "@/lib/regensburg-cleaning-service-area";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/reinigung-moeblierte-wohnung-regensburg";

const faqItems = [
  {
    q: "Reinigt FLOXANT möblierte Wohnungen in Regensburg?",
    a: "Ja, möblierte Wohnungen, Apartments und ähnliche Objektfälle können in Regensburg und im Umkreis bis 50 km geprüft werden. Wichtig sind Objektart, Zustand, Zeitfenster, Zugang, Fotos und gewünschtes Ergebnis.",
  },
  {
    q: "Ist das eine Airbnb-Partnerschaft?",
    a: "Nein. Die Seite ist für Reinigungsanfragen rund um möblierte Wohnungen und Apartments gedacht. FLOXANT behauptet keine Plattformpartnerschaft und keine Hotelstandard-Garantie.",
  },
  {
    q: "Welche Angaben helfen für ein Angebot?",
    a: "Hilfreich sind Adresse oder Stadtteil, Fläche, Zimmer, Bad, Küche, Möblierung, Checkout oder Übergabetermin, nächster Check-in, Zugang, Parken, Fotos und Sonderwünsche.",
  },
  {
    q: "Sind Wäsche, Schlüssel und Inventar automatisch enthalten?",
    a: "Nein. Wäschewechsel, Schlüsselkoordination, Fotodokumentation, Inventarhinweise oder kleine Restmengen werden nur nach Absprache eingeordnet.",
  },
  {
    q: "Gibt es feste Preise pro Apartment?",
    a: "Nein. Preis und Machbarkeit hängen von Fläche, Zustand, Möblierung, Zeitfenster, Zugang, Küche, Bad, Fotos und Zusatzpunkten ab.",
  },
] as const;

const useCases = [
  {
    title: "Möblierte Wohnung",
    text: "Für Vermieter, Verwaltung oder Privatperson, wenn Zustand, Möbel, Küche, Bad und Übergabeziel klar werden müssen.",
    icon: BedDouble,
  },
  {
    title: "Apartment-Reset",
    text: "Für Apartments mit engem Terminfenster, wenn Checkout, nächster Check-in, Zugang und Fotos zusammenpassen müssen.",
    icon: CalendarClock,
  },
  {
    title: "Schlüssel und Zugang",
    text: "Schlüsselweg, Code, Etage, Parken und Ansprechpartner werden vor einer Zusage geprüft.",
    icon: KeyRound,
  },
  {
    title: "Klare Grenzen",
    text: "Keine Plattformpartnerschaft, keine Wäsche-, Inventar-, Abnahme- oder Hotelstandard-Garantie ohne Absprache.",
    icon: ShieldCheck,
  },
] as const;

function buildRegensburgCleaningMetadata(): Metadata {
  return generatePageSEO({
    lang: "de",
    path: "reinigung-moeblierte-wohnung-regensburg",
    title: "Reinigung möblierte Wohnung Regensburg | Apartment-Reset",
    description:
      "Möblierte Wohnung oder Apartment in Regensburg reinigen lassen: Objekt, Fotos, Checkout, Zugang, Termin und Zusatzwünsche im 50-km-Umkreis klären.",
  });
}

export const metadata = buildRegensburgCleaningMetadata();

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Regensburg", item: "/regensburg/reinigung" },
        { name: "Möblierte Wohnung", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Reinigung möblierte Wohnung Regensburg",
        description:
          "Reinigung für möblierte Wohnungen und Apartments in Regensburg nach Objektart, Zustand, Terminfenster, Zugang, Fotos und Zusatzwünschen.",
        path: pagePath,
        serviceType: "Reinigung möblierte Wohnung, Apartment-Reinigung und Apartment-Reset in Regensburg",
        areaServed: buildRegensburgCleaningAreaServedJsonLd(),
        availableLanguage: ["de", "en"],
      }),
      buildWebPageJsonLd({
        name: "Reinigung möblierte Wohnung Regensburg mit Apartment-Reset",
        description:
          "Lokale Reinigungsanfrage für möblierte Wohnungen, Apartments und Übergabefälle in Regensburg mit Fotos, Terminfenster, Zugang und klaren Grenzen.",
        path: pagePath,
        about: [
          "Reinigung möblierte Wohnung Regensburg",
          "Apartment-Reinigung Regensburg",
          "Apartment-Reset",
          "Reinigung vor Check-in",
          "Reinigung nach Checkout",
          "Reinigung Regensburg plus 50 km",
        ],
        potentialActions: [
          { name: "Apartment-Reinigung anfragen", target: `${pagePath}#anfrage`, type: "ContactAction" },
          { name: "Fotos per WhatsApp senden", target: `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`, type: "ContactAction" },
        ],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default function CleaningFurnishedApartmentRegensburgPage() {
  return (
    <main className="overflow-hidden bg-white pb-24 text-slate-950 md:pb-0">
      <JsonLd />
      <Breadcrumbs
        items={[
          { label: "Reinigung Regensburg", href: "/regensburg/reinigung" },
          { label: "Möblierte Wohnung Regensburg" },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <Image
          src="/assets/gewerbereinigung/reinigungsanfrage-checkliste-regensburg.webp"
          alt="Checkliste und Schlüssel als Symbol für Reinigung einer möblierten Wohnung in Regensburg"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.86)_55%,rgba(15,23,42,0.48)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Apartment-Reset Regensburg
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Reinigung für möblierte Wohnungen in Regensburg.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              FLOXANT prüft möblierte Wohnungen und Apartments nach Objektart, Zustand, Terminfenster, Checkout,
              Zugang, Fotos und Zusatzwünschen. Der Service bleibt auf Regensburg und den Umkreis bis 50 km begrenzt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#anfrage"
                data-event="seo_cta_click"
                data-region="regensburg"
                data-service="regensburg_moeblierte_wohnung_reinigung"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                Apartment-Reinigung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-event="whatsapp_click"
                data-region="regensburg"
                data-service="regensburg_moeblierte_wohnung_reinigung"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Fotos senden
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Möblierte Wohnung, Apartment oder Übergabefall nach Absprache.",
              "Checkout, Check-in, Schlüsselweg und Zugang vor Zusage klären.",
              "Keine Airbnb-Partnerschaft und keine Hotelstandard-Garantie.",
              "Wäsche, Inventar, Fotodokumentation und Restmengen nur nach Absprache.",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-slate-950/70 p-4 text-sm font-semibold leading-7 text-slate-100">
                <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceAreaBlock
        title="Reinigungsgebiet für möblierte Wohnungen"
        intro="FLOXANT prüft möblierte Wohnungen und Apartments in Regensburg und im Umkreis bis 50 km. Orte außerhalb dieses Radius werden nicht als eigenes Reinigungsgebiet beworben."
      />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Geeignet für</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              Wenn Möbel, Zeitfenster und Übergabe zusammen gedacht werden müssen.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <LocalTrustBlock ctaHref={`${pagePath}#anfrage`} ctaLabel="Apartment-Reinigung anfragen" />
      <CleaningProcessBlock ctaHref={`${pagePath}#anfrage`} ctaLabel="Objektangaben senden" />
      <RequestChecklistBlock ctaHref={`${pagePath}#anfrage`} ctaLabel="Apartment-Anfrage vorbereiten" />

      <section id="anfrage" className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Anfrage</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              Erst Eckdaten, dann Rückmeldung.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Für möblierte Wohnungen zählen nicht nur Quadratmeter. Wichtig sind Möbel, Küche, Bad, Zustand,
              Terminfenster, Schlüsselweg, Fotos und die Frage, ob Zusatzpunkte wie Wäsche oder Inventar überhaupt
              eingeordnet werden sollen.
            </p>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
              FLOXANT gibt keine Abnahme-, Gäste-, Wäsche-, Inventar- oder Preisgarantie. Erst nach Objektangaben
              und Rückfragen wird klar, welcher nächste Schritt realistisch ist.
            </div>
          </div>
          <RegensburgApartmentCleaningForm />
        </div>
      </section>

      <RelatedServicesBlock
        currentHref={pagePath}
        title="Weitere passende Reinigungswege"
        intro="Diese Seiten helfen, wenn es statt möblierter Wohnung eher um Grundreinigung, Büro, Gewerbe, Treppenhaus, Fenster oder Angebotsprüfung geht."
        limit={6}
      />

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              Häufige Fragen zur Reinigung möblierter Wohnungen.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
                <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
