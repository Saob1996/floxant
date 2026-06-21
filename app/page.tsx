import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MessageCircle, ShieldCheck } from "lucide-react";

import { InternationalCustomerHint } from "@/components/conversion";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { FloxantObjectBrief } from "@/components/FloxantObjectBrief";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { ProcessProofSteps } from "@/components/ProcessProofSteps";
import { ProjectStoryGrid } from "@/components/ProjectStoryGrid";
import { RegionSelector } from "@/components/RegionSelector";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { LocalSeoSignalPanel } from "@/components/seo/LocalSeoSignalPanel";
import { SearchDominanceExperience } from "@/components/seo/SearchDominanceExperience";
import { TrustFlowSection } from "@/components/seo/TrustFlowSection";
import { CustomerProblemSection } from "@/components/CustomerProblemSection";
import { LocationClarityPanel } from "@/components/LocationClarityPanel";
import { OfferCheckInlineCTA } from "@/components/OfferCheckInlineCTA";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { company } from "@/lib/company";
import { floxantRegions, getFeaturedServices, type FloxantRegion } from "@/lib/floxant-services";
import { buildLeadHref } from "@/lib/lead-intents";
import { homepageProblemItems, locationClarityItems } from "@/lib/professional-copy";
import { generatePageSEO } from "@/lib/seo";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/";
const canonical = `${company.url}${path}`;
const homepageLeadHref = buildLeadHref({
  path,
  service: "reinigung",
  city: "duesseldorf",
  intent: "homepage-anfrage",
  priority: "p1",
});
const cleaningOfferLeadHref = buildLeadHref({
  service: "reinigung",
  intent: "reinigungsfirma-angebot",
  priority: "p1",
});
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
    a: "Düsseldorf und Regensburg haben eigene lokale Kontaktmöglichkeiten und klare Stadtteilbezüge. Düsseldorf wird besonders für Reinigungsfirma, Gewerbereinigung, Büroreinigung, Praxisreinigung und Angebotsprüfung geführt; Regensburg bleibt der zweite Standortbereich.",
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
    title: "FLOXANT | Reinigung, Umzug & Angebot klar anfragen",
    description:
      "FLOXANT ordnet Reinigung, Umzug, Entrümpelung und vorhandene Angebote nach Ort, Umfang, Fotos und Termin klar ein.",
  }),
  metadataBase: new URL(company.url),
  title: "FLOXANT | Reinigung, Umzug & Angebot klar anfragen",
  description:
    "FLOXANT ordnet Reinigung, Umzug, Entrümpelung und vorhandene Angebote nach Ort, Umfang, Fotos und Termin klar ein.",
  alternates: {
    canonical,
    languages: {
      "de-DE": path,
      "x-default": path,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "FLOXANT | Reinigung, Umzug & Angebot klar anfragen",
    description:
      "Düsseldorf und Regensburg klar trennen: Service, Ort, Umfang, Fotos und Termin nennen.",
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
    title: "FLOXANT | Reinigung, Umzug & Angebot klar anfragen",
    description:
      "Reinigung, Umzug, Entrümpelung und Angebote mit Ort, Umfang, Fotos und Termin einordnen lassen.",
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
          "FLOXANT Startseite mit klarem Einstieg für Reinigungsfirma Düsseldorf, Reinigungsangebot-Prüfung und getrennte Standortbereiche für Düsseldorf und Regensburg.",
        path,
        about: [
          "FLOXANT Düsseldorf",
          "Reinigungsfirma Düsseldorf",
          "Gewerbereinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Praxisreinigung Düsseldorf",
          "Grundreinigung Düsseldorf",
          "Reinigungsangebot prüfen",
          "Reinigung Düsseldorf",
          "Umzug Regensburg",
          "Reinigung Regensburg",
          "Entrümpelung Regensburg",
          "Übergabereinigung Regensburg",
        ],
        potentialActions: [
          { name: "Anfrage stellen", target: homepageLeadHref, type: "ContactAction" },
          { name: "Services in Düsseldorf ansehen", target: "/duesseldorf", type: "Action" },
          { name: "Services in Regensburg ansehen", target: "/regensburg", type: "Action" },
          { name: "Per WhatsApp Kontakt aufnehmen", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT lokale Dienstleistungen",
        description:
          "Reinigungsfirma, Gewerbereinigung, Büroreinigung, Praxisreinigung und Reinigungsangebot-Prüfung für Düsseldorf sowie lokale Dienstleistungen in Regensburg.",
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
    text: "Reinigungsfirma, Gewerbereinigung, Büroreinigung, Praxisreinigung, Grundreinigung und Reinigungsangebot-Prüfung in Düsseldorf mit eigener Stadtteil- und Anfrage-Logik.",
    points: [
      "Reinigungsfirma und Gewerbereinigung",
      "Büro, Praxis, Kanzlei und Grundreinigung",
      "Reinigungsangebot prüfen und vergleichen",
    ],
  },
  {
    regionId: "regensburg",
    headline: "FLOXANT Regensburg",
    text: "Umzugsunternehmen, Büroreinigung, Wohnungsauflösung, Reinigungsfirma, Entrümpelung und Angebotsprüfung in Regensburg. Der Bereich bleibt klar bei Regensburg und Umgebung.",
    points: [
      "Umzugsunternehmen und Wohnungsauflösung",
      "Büroreinigung und Reinigungsfirma",
      "Angebot vergleichen Regensburg",
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
    title: "Reinigung in Düsseldorf",
    text: "Für Reinigungsfirma, Gewerbereinigung, Büroreinigung, Praxisreinigung, Grundreinigung und Angebotsprüfung.",
  },
  {
    regionId: "regensburg",
    title: "Regensburg: Umzug, Büroreinigung und Wohnungsauflösung",
    text: "Für Umzugsunternehmen, Büroreinigung, Reinigungsfirma, Wohnungsauflösung, Entrümpelung und Angebotsprüfung.",
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
    href: "/angebot-pruefen",
  },
  {
    title: "Reinigungsfirma Angebot",
    text: "Objekt, Fläche, Turnus, Fotos und Termin für ein Reinigungsangebot sauber senden.",
    href: "/reinigungsfirma-angebot",
  },
  {
    title: "Fernumzug München",
    text: "Strecke, Volumen, Etage, Haltezone und Termin für München-Fernstrecken prüfen.",
    href: "/fernumzug-muenchen",
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

const directRequestLinks = [
  {
    title: "Reinigung Düsseldorf",
    text: "Wohnung, Büro, Praxis, Übergabe oder Reinigungsangebot mit Stadtteil und Fotos einordnen.",
    href: "/duesseldorf/reinigung",
  },
  {
    title: "Büroreinigung Düsseldorf",
    text: "Raumliste, Turnus, Zeitfenster, Zugang und vorhandenes Angebot für Firmen senden.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Gewerbereinigung Düsseldorf",
    text: "Gewerbefläche, Büro, Praxis, Kanzlei oder Objekt mit Fläche und Nutzung prüfen.",
    href: "/duesseldorf/gewerbereinigung",
  },
  {
    title: "Reinigung Landshut",
    text: "Wohnung, Büro, Übergabe oder Reinigung nach Räumung mit Fotos und Termin anfragen.",
    href: "/reinigung-landshut",
  },
  {
    title: "Entrümpelung Landshut",
    text: "Räume, Keller, Garage, Menge, Zugang und Reinigung danach sachlich klären.",
    href: "/entruempelung-landshut",
  },
  {
    title: "Umzug Neustadt a.d. Waldnaab",
    text: "Start, Ziel, Etage, Volumen, Laufweg, Fotos und Termin für die Umzugsanfrage senden.",
    href: "/umzug-neustadt-an-der-waldnaab",
  },
  {
    title: "Umzug Vohenstrauß",
    text: "Wohnung, Apartment, einzelne Möbel oder kleiner Umzug mit Umfang und Zugang prüfen.",
    href: "/umzug-vohenstrauss",
  },
  {
    title: "Entrümpelung Regensburg",
    text: "Wohnung, Keller, Garage oder Objekt mit Menge, Freigabe und Zielzustand klären.",
    href: "/regensburg/entruempelung",
  },
  {
    title: "Reinigung München",
    text: "Wohnung, Übergabe, Büro oder Reinigung nach Umzug mit Fotos und Termin einordnen.",
    href: "/reinigung-muenchen",
  },
] as const;

function getHomepageAreaLinks(regionId: FloxantRegion) {
  if (regionId === "duesseldorf") {
    return [
      { href: "/region-duesseldorf", label: "Region Düsseldorf" },
      { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
      { href: "/duesseldorf/angebot-vergleichen", label: "Angebotsprüfung" },
    ];
  }

  return [
    { href: "/region-regensburg", label: "Region Regensburg" },
    { href: "/regensburg/umzug", label: "Umzug Regensburg" },
    { href: "/regensburg/angebot-vergleichen", label: "Angebotsprüfung" },
  ];
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />
      <LocalBusinessJsonLd />

      <section className="relative isolate min-h-[88svh] overflow-hidden bg-slate-950 text-white">
        <Image
          src="/assets/floxant-hero-neu-gedacht.webp"
          alt="FLOXANT als regionale Dienstleistungsmarke"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.78)_48%,rgba(15,23,42,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white to-transparent" />

        <div className="mx-auto grid min-h-[88svh] max-w-7xl content-end px-5 pb-8 pt-28 sm:px-8 lg:px-10">
          <div className="max-w-4xl pb-8">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Düsseldorf-Reinigung zuerst: Anfrage richtig einordnen.
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
              Reinigung, Umzug und Angebote klar anfragen
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-100 sm:text-xl">
              FLOXANT ordnet Ihre Anfrage zuerst nach Ort, Objekt, Umfang und Termin. So erkennen Sie
              schneller, ob Reinigung in Düsseldorf, Umzug oder Räumung in Regensburg oder ein
              Angebotscheck der passende nächste Schritt ist.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={homepageLeadHref}
                data-event="seo_cta_click"
                data-source="homepage_hero"
                data-service="reinigung"
                data-city="duesseldorf"
                data-page-intent="homepage-anfrage"
                data-priority="p1"
                data-cta-label="Anfrage stellen"
                data-destination={homepageLeadHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-cyan-200"
              >
                Anfrage stellen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/duesseldorf/reinigung"
                data-event="service_card_click"
                data-source="homepage_reinigung_duesseldorf"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-cyan-50"
              >
                Reinigung Düsseldorf
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#region-waehlen"
                data-event="hero_cta_click"
                data-source="homepage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition hover:bg-white/15"
              >
                Passende Region wählen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-source="homepage_hero"
                data-destination={whatsappHref}
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
        serviceLabel="Reinigungsfirma, Gewerbereinigung, Büroreinigung oder Angebotsprüfung"
        tags={["Cleaning service", "Commercial cleaning", "Office cleaning", "Practice cleaning", "Quote check"]}
      />

      <LocationClarityPanel locations={locationClarityItems} />

      <CustomerProblemSection
        title="Schnell erkennen, welcher FLOXANT-Weg passt."
        intro="Die Startseite führt nicht in eine generische Leistungswolke. Sie sortiert den Fall nach Ort, Service, vorhandenem Angebot, Fotos, Termin und nächstem Schritt."
        problems={homepageProblemItems}
      />

      <OfferCheckInlineCTA />

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

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Häufige direkte Anfragen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Schneller zum passenden lokalen Startpunkt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Diese Seiten bündeln die häufigsten aktuellen Anfragen, damit Ort, Leistung,
              Fotos, Termin und Angebot direkt an der richtigen Stelle landen.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {directRequestLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-event="service_card_click"
                data-source="homepage_direct_requests"
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
              >
                <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
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
                Auf der Leistungsseite finden Sie die Angebote nach Region sortiert. Für Düsseldorf
                stehen Reinigungsfirma, Gewerbereinigung, Büroreinigung, Praxisreinigung,
                Grundreinigung und Angebotsprüfung im Vordergrund.
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
                  <div className="mt-5 flex flex-wrap gap-2">
                    {getHomepageAreaLinks(area.regionId).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-white hover:text-blue-800"
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
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
              href={cleaningOfferLeadHref}
              data-event="seo_cta_click"
              data-source="homepage_offer_check"
              data-service="reinigung"
              data-city="deutschland"
              data-page-intent="reinigungsfirma-angebot"
              data-priority="p1"
              data-cta-label="Reinigungsangebot anfordern"
              data-destination={cleaningOfferLeadHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            >
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Reinigungsfirma Angebot
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
              "Sie starten für Düsseldorf direkt mit Reinigung, Objektart oder Angebotsprüfung.",
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

      <TrustProofPanel
        allowedPage="/"
        serviceKey="reinigung"
        locationKey="duesseldorf"
        title="Vertrauen auf der Startseite bleibt belegbar."
        intro="Die wichtigsten Trust-Signale sind Anfrageweg, lokale Einordnung, Angebotsgrenzen und der bewusste Verzicht auf erfundene Sterne oder Referenzen."
      />

      <LocalProofPanel location="duesseldorf" />
      <LocalProofPanel location="regensburg" className="bg-slate-900" />

      <ProcessProofSteps
        title="Der Ablauf ist sichtbar, bevor jemand Daten sendet."
        intro="FLOXANT zeigt vor der Anfrage, welche Angaben helfen und wo Grenzen bleiben. Preise, Termine und Alternativen werden nicht ohne Kontext versprochen."
      />

      <ProjectStoryGrid
        title="Projektstorys nur als gekennzeichnete Ausgangslagen."
        intro="Solange echte Kundendaten nicht freigegeben sind, erscheinen nur typische Situationen ohne Personen, Orte oder behauptete Ergebnisse."
      />

      <ServiceVisualProofGrid
        serviceKey="reinigung"
        title="Visual Proof ohne private Kundendaten."
        intro="Die sichtbaren Visuals sind abstrakt. Echte Fotos oder Vorher-Nachher-Bilder brauchen Freigabe, Privacy-Check und klare Kennzeichnung."
      />

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
              href={homepageLeadHref}
              data-event="seo_cta_click"
              data-source="homepage_final"
              data-service="reinigung"
              data-city="duesseldorf"
              data-page-intent="homepage-anfrage"
              data-priority="p1"
              data-cta-label="Kontakt oeffnen"
              data-destination={homepageLeadHref}
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
