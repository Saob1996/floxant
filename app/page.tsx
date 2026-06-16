import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MessageCircle, ShieldCheck } from "lucide-react";

import { InternationalCustomerHint } from "@/components/conversion";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { FloxantObjectBrief } from "@/components/FloxantObjectBrief";
import { RegionSelector } from "@/components/RegionSelector";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { LocalSeoSignalPanel } from "@/components/seo/LocalSeoSignalPanel";
import { SearchDominanceExperience } from "@/components/seo/SearchDominanceExperience";
import { TrustFlowSection } from "@/components/seo/TrustFlowSection";
import { company } from "@/lib/company";
import { floxantRegions, getFeaturedServices, type FloxantRegion } from "@/lib/floxant-services";
import { generatePageSEO } from "@/lib/seo";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/";
const canonical = `${company.url}${path}`;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte meine Anfrage zuerst richtig einordnen.",
    "Region, Objekt und gewünschte Leistung kann ich kurz senden.",
  ].join("\n"),
);

const faqItems = [
  {
    q: "Warum trennt FLOXANT Düsseldorf und Regensburg?",
    a: "Düsseldorf und Regensburg haben eigene lokale Kontaktmöglichkeiten und klare Stadtteilbezüge. So bleiben Umzug, Reinigung, Entrümpelung, Haushaltsauflösung und Endreinigung je Standort sauber getrennt.",
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
  ...generatePageSEO({
    path,
    title: "FLOXANT | Umzug, Reinigung & Entrümpelung",
    description:
      "FLOXANT prüft Umzug, Reinigung, Solarreinigung, Entrümpelung, Haushaltsauflösung, Gewerbereinigung und Endreinigung in Düsseldorf und Regensburg. Anfrage auf Deutsch oder Englisch möglich.",
    keywords: [
      "FLOXANT",
      "Umzug Düsseldorf",
      "Reinigung Düsseldorf",
      "Entrümpelung Düsseldorf",
      "Umzug Regensburg",
      "Reinigung Regensburg",
      "Entrümpelung Regensburg",
    ],
  }),
  metadataBase: new URL(company.url),
  title: "FLOXANT | Umzug, Reinigung & Entrümpelung",
  description:
    "FLOXANT prüft Umzug, Reinigung, Solarreinigung, Entrümpelung, Haushaltsauflösung, Gewerbereinigung und Endreinigung in Düsseldorf und Regensburg. Anfrage auf Deutsch oder Englisch möglich.",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "FLOXANT | Umzug, Reinigung & Entrümpelung",
    description:
      "Düsseldorf und Regensburg: Service wählen, Fotos senden, Aufwand prüfen lassen.",
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
    title: "FLOXANT | Umzug, Reinigung & Entrümpelung",
    description:
      "Umzug, Reinigung, Solarreinigung, Entrümpelung und Endreinigung in Düsseldorf und Regensburg prüfen lassen.",
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
          "FLOXANT Startseite mit klarer Auswahl zwischen Düsseldorf und Regensburg für Umzug, Reinigung, Solarreinigung, Entrümpelung, Haushaltsauflösung und Endreinigung.",
        path,
        about: [
          "FLOXANT Düsseldorf",
          "Umzug Düsseldorf",
          "Entrümpelung Düsseldorf",
          "Gewerbereinigung Düsseldorf",
          "Solarreinigung",
          "PV-Anlagen-Reinigung",
          "Reinigung Düsseldorf",
          "Umzug Regensburg",
          "Reinigung Regensburg",
          "Entrümpelung Regensburg",
          "Übergabereinigung Regensburg",
        ],
        potentialActions: [
          { name: "Services in Düsseldorf ansehen", target: "/duesseldorf", type: "Action" },
          { name: "Services in Regensburg ansehen", target: "/regensburg", type: "Action" },
          { name: "Per WhatsApp Kontakt aufnehmen", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT lokale Dienstleistungen",
        description:
          "Umzug, Reinigung, Solarreinigung, Entrümpelung, Haushaltsauflösung, Gewerbereinigung und Endreinigung für Düsseldorf und Regensburg mit klarer Anfrageprüfung.",
        path,
        serviceType: "Lokale Dienstleistungen",
        areaServed: ["Düsseldorf", "Regensburg", "Bayern"],
        availableLanguage: ["de", "en"],
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

const homepageAreas: Array<{
  regionId: FloxantRegion;
  headline: string;
  text: string;
  points: string[];
}> = [
  {
    regionId: "duesseldorf",
    headline: "FLOXANT Düsseldorf",
    text: "Umzug, Reinigung, Solarreinigung, Entrümpelung, Haushaltsauflösung und Endreinigung in Düsseldorf mit eigener Stadtteil- und Anfrage-Logik.",
    points: [
      "Umzug und Entrümpelung",
      "Reinigung, Solar, Glas und Fassade",
      "Haushaltsauflösung und Endreinigung",
    ],
  },
  {
    regionId: "regensburg",
    headline: "FLOXANT Regensburg",
    text: "Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Vorbereitung einer besenreinen Übergabe. Der Bereich bleibt klar bei Räumung, Wechsel und Übergabe.",
    points: [
      "Mini-Umzug, Transport und Entrümpelung",
      "Haushaltsauflösung",
      "Übergabe und Endreinigung",
    ],
  },
];

const homepageFeaturedServices: Array<{
  regionId: FloxantRegion;
  title: string;
  text: string;
}> = [
  {
    regionId: "duesseldorf",
    title: "Services in Düsseldorf",
    text: "Für Umzug, Reinigung, Solarreinigung, Entrümpelung, Haushaltsauflösung, Gewerbereinigung und Übergabe.",
  },
  {
    regionId: "regensburg",
    title: "Umzug und Übergabe in Regensburg",
    text: "Für Umzug, Mini-Umzug, Möbeltransport, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe.",
  },
];

const specialServiceGroups = [
  {
    title: "Signature Services",
    text: "Fairpreis, Objektbrief, Übergabe, Plan B, Rückfahrt und PV-Sichtklar in einem Hub.",
    href: "/signature-services",
  },
  {
    title: "Objektbrief",
    text: "Wenn Region, Leistung, Zugang, Fotos oder Zielzustand noch unsortiert sind.",
    href: "/objektbrief",
  },
  {
    title: "Angebot prüfen",
    text: "Vorhandenes Angebot sachlich nach Umfang, Termin, Fotos und offenen Punkten einordnen.",
    href: "/angebot-guenstiger-pruefen",
  },
  {
    title: "Fairpreis-Check",
    text: "Wenn ein Preis zu hoch, zu niedrig oder schwer vergleichbar wirkt.",
    href: "/fairpreis-check",
  },
  {
    title: "Plan B",
    text: "Wenn Termin, Anbieter oder Übergabe kippen und zuerst Machbarkeit geklärt werden muss.",
    href: "/plan-b-service",
  },
  {
    title: "Übergabe-Sprint",
    text: "Restmengen, Reinigung, Fotos und Schlüsselweg vor Termin priorisieren.",
    href: "/uebergabe-sprint",
  },
  {
    title: "Rückfahrt-Radar",
    text: "Flexible Transporte, Beiladung und Leerfahrt sachlich nach Strecke prüfen.",
    href: "/rueckfahrt-radar",
  },
  {
    title: "PV-Sichtklar",
    text: "Solar- und PV-Anlagen nach Zugang, Modulfläche, Sicherheit und Fotos prüfen.",
    href: "/pv-anlagen-reinigung",
  },
] as const;

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />
      <LocalBusinessJsonLd />

      <section className="relative isolate min-h-[88svh] overflow-hidden bg-slate-950 text-white">
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

        <div className="mx-auto grid min-h-[88svh] max-w-7xl content-end px-5 pb-8 pt-28 sm:px-8 lg:px-10">
          <div className="max-w-4xl pb-8">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Düsseldorf oder Regensburg: erst richtig einordnen.
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
              FLOXANT
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-100 sm:text-xl">
              FLOXANT ordnet Ihre Anfrage zuerst nach Region, Leistung und Ziel. In Düsseldorf
              und Regensburg können Sie Umzug, Reinigung, Solarreinigung, Entrümpelung,
              Haushaltsauflösung, Gewerbereinigung und Endreinigung klar getrennt anfragen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#region-waehlen"
                data-event="hero_cta_click"
                data-source="homepage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-cyan-50"
              >
                Passende Region wählen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-source="homepage_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200/40 bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp: Anfrage kurz schildern
              </a>
            </div>
          </div>

          <div id="region-waehlen" className="scroll-mt-28">
            <RegionSelector source="homepage_hero_region_cards" />
          </div>
        </div>
      </section>

      <InternationalCustomerHint
        cityLabel="Düsseldorf und Regensburg"
        serviceLabel="Umzug, Reinigung, Räumung oder Solar/PV"
        tags={["Cleaning service", "Moving help", "Office cleaning", "House clearance", "Solar panel cleaning"]}
      />

      <SearchDominanceExperience variant="default" className="bg-white" />
      <LocalSeoSignalPanel sectionId="lokale-signale" />
      <TrustFlowSection sectionId="anfrage-ablauf" />

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Damit Sie schneller richtig anfragen
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Ihre Anfrage kommt direkt zum passenden Bereich.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              FLOXANT trennt Düsseldorf und Regensburg klar, damit Ort, Leistung, Aufwand und
              Ansprechpartner sofort verständlich bleiben. So wissen Sie schneller, welche Anfrage
              wirklich passt.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Klare Region",
                text: "Düsseldorf und Regensburg haben eigene Stadtteile und direkte Kontaktmöglichkeiten.",
              },
              {
                title: "Weniger Rückfragen",
                text: "Ort, Objekt, Termin und Fotos reichen meist für eine erste Einschätzung.",
              },
              {
                title: "Sauber geprüft",
                text: "Sie bekommen eine ehrliche Rückmeldung ohne Preisversprechen oder Druck.",
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

      <FloxantObjectBrief variant="homepage" className="border-b border-slate-200" />

      <section id="besondere-services" className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Besondere Services
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Wenn die Anfrage nicht in eine Standardschublade passt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Manche Fälle brauchen zuerst Sortierung: Fotos, Zugang, Preisrahmen, vorhandene
              Angebote oder eine gekippte Übergabe. Diese Startpunkte helfen, ohne falsche
              Sofortzusage den nächsten Schritt zu klären.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {specialServiceGroups.map((group) => (
              <Link
                key={group.href}
                href={group.href}
                data-event="service_card_click"
                data-source="homepage_special_services"
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
              >
                <h3 className="text-xl font-black text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{group.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  Öffnen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                Zwei klare Bereiche
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Erst Region wählen, dann die passende Leistung finden.
              </h2>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
                Auf der Leistungsseite finden Sie alle Angebote übersichtlich nach Region sortiert:
                Umzug, Reinigung, Solarreinigung, Spezialreinigung, Transport, Entrümpelung und
                Übergabe in Düsseldorf und Regensburg.
              </p>
            </div>
            <Link
              href="/leistungen"
              data-event="hero_cta_click"
              data-source="homepage_all_services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-950 shadow-sm transition hover:border-blue-200 hover:text-blue-800"
            >
              Alle Leistungen ansehen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {homepageAreas.map((area) => {
              const region = floxantRegions[area.regionId];

              return (
                <section key={area.regionId} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                        {region.city}
                      </p>
                      <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
                        {area.headline}
                      </h2>
                      <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-600">
                        {area.text}
                      </p>
                    </div>
                    <Link
                      href={region.href}
                      data-event="region_select"
                      data-region={area.regionId}
                      data-source="homepage_area_card"
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-800"
                    >
                      Bereich öffnen
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {area.points.map((point) => (
                      <div key={point} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <CheckCircle2 className="h-4 w-4 text-blue-700" aria-hidden="true" />
                        <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                Leistungen direkt finden
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Die wichtigsten FLOXANT Services auf einen Blick.
              </h2>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
                Wählen Sie den passenden Kontaktweg oder senden Sie ein vorhandenes Angebot zur
                kostenlosen und unverbindlichen Prüfung. Jede Karte führt direkt zur passenden Seite.
              </p>
            </div>
            <Link
              href="/angebot-vergleichen-duesseldorf"
              data-event="hero_cta_click"
              data-source="homepage_offer_check"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            >
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Angebot prüfen lassen
            </Link>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {homepageFeaturedServices.map((area) => {
              const services = getFeaturedServices(area.regionId, 6);
              const region = floxantRegions[area.regionId];

              return (
                <section key={area.regionId} className="min-w-0">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                        {region.city}
                      </p>
                      <h3 className="mt-1 text-2xl font-black text-slate-950">{area.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{area.text}</p>
                    </div>
                    <Link
                      href={region.href}
                      data-event="region_select"
                      data-region={area.regionId}
                      data-source="homepage_featured_services"
                      className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 transition hover:bg-white hover:text-blue-800"
                    >
                      Bereich öffnen
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {services.map((service) => (
                      <FloxServiceCard
                        key={service.id}
                        service={service}
                        compact
                        source={`homepage_featured_${area.regionId}`}
                      />
                    ))}
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
              Schneller zur richtigen Rückmeldung.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Sie müssen keine perfekte Leistungsbeschreibung schreiben. Region, Objekt, gewünschte
              Leistung, Zeitfenster und ein paar Fotos reichen für einen guten Start.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Sie wählen zuerst Düsseldorf oder Regensburg.",
              "Sie senden kurz Objekt, Leistung, Termin und Fotos.",
              "FLOXANT prüft, was sinnvoll machbar ist.",
              "Sie erhalten eine klare Rückmeldung und entscheiden in Ruhe.",
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
              data-event="hero_cta_click"
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
