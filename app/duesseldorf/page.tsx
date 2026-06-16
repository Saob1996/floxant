import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";

import {
  InternationalCustomerHint,
  LocalIntentBlock,
  ServiceDecisionGuide,
  TrustProofSection,
} from "@/components/conversion";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { company, duesseldorfCompany } from "@/lib/company";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantCategoryOrder,
  floxantRegions,
  getServicesByRegionAndCategory,
} from "@/lib/floxant-services";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const region = floxantRegions.duesseldorf;
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Düsseldorf,",
    "ich brauche Hilfe in Düsseldorf.",
    "Es geht um Umzug, Reinigung, Entrümpelung, Haushaltsauflösung oder Endreinigung.",
    "Stadtteil, Termin und Fotos kann ich direkt mitsenden.",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Düsseldorf | Reinigung, Umzug & Räumung",
  description:
    "FLOXANT Düsseldorf hilft bei Umzug, Reinigung, Entrümpelung, Haushaltsauflösung und Endreinigung. Cleaning service, moving help und Anfrage auf Deutsch oder Englisch möglich.",
  alternates: { canonical: "/duesseldorf" },
};

const duesseldorfLocalSignals = [
  "Stadtteil oder PLZ reichen für den Start: Altstadt, Bilk, Pempelfort, Oberkassel, Derendorf oder Umgebung.",
  "Bei Reinigung zählen Objektart, Fläche, Turnus, Zugang und Zeitfenster stärker als ein einzelnes Stichwort.",
  "Bei Umzug, Entrümpelung und Haushaltsauflösung helfen Fotos, Etage, Laufweg, Haltezone und Termin.",
  "Solar/PV, Glas und Fassade brauchen Angaben zu Höhe, Dachzugang, Wasseranschluss und Sicherheitsgrenzen.",
] as const;

const duesseldorfDecisionGuide = [
  {
    title: "Reinigung und Gewerbe",
    text: "Büro, Praxis, Kanzlei, Treppenhaus, Ladenfläche, Glas, Fassade oder Unterhalt mit Objektangaben prüfen.",
    href: "/duesseldorf/reinigung",
    cta: "Reinigung öffnen",
  },
  {
    title: "Solar/PV und Außenflächen",
    text: "PV-Anlage, Glas oder Fassade mit Fotos, Zugang, Modulfläche, Höhe und Wasseranschluss einordnen.",
    href: "/duesseldorf/solarreinigung",
    cta: "Solarreinigung prüfen",
  },
  {
    title: "Räumung und Entsorgung",
    text: "Keller, Wohnung, Nachlass, Haushaltsauflösung oder Sperrmüll nach Menge, Material und Zielzustand sortieren.",
    href: "/duesseldorf/entruempelung",
    cta: "Räumung öffnen",
  },
  {
    title: "Angebot oder Preis prüfen",
    text: "Vorhandenes Angebot mit Leistungsumfang, Termin, Zusatzkosten, Fotos und Budget sachlich einordnen.",
    href: "/angebot-vergleichen-duesseldorf",
    cta: "Angebot prüfen",
  },
] as const;

const duesseldorfTrustProofs = [
  "Düsseldorf-Anfragen bleiben nach Umzug, Reinigung, Räumung, Entsorgung und Endreinigung getrennt.",
  "Fotos, Stadtteil, Termin und Objektart helfen, ohne dass sofort eine Beauftragung entsteht.",
  "FLOXANT nennt Grenzen klar, statt Verfügbarkeit, Preis oder Ergebnis pauschal zu versprechen.",
] as const;

function buildDuesseldorfHubJsonLd() {
  const url = `${company.url}/duesseldorf`;

  return [
    buildWebPageJsonLd({
      name: "FLOXANT Düsseldorf",
      description:
        "FLOXANT Düsseldorf hilft bei Reinigung, Umzug, Räumung, Entrümpelung, Haushaltsauflösung und Angebotsprüfung. Anfrage auf Deutsch oder Englisch möglich.",
      path: "/duesseldorf",
      about: [
        "Reinigung Düsseldorf",
        "Umzug Düsseldorf",
        "Entrümpelung Düsseldorf",
        "Cleaning service Düsseldorf",
        "Moving help Düsseldorf",
      ],
      potentialActions: [
        {
          type: "ContactAction",
          name: "Anfrage auf Deutsch oder Englisch senden",
          target: "/kontakt#direktanfrage",
        },
      ],
    }),
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "CleaningService"],
      "@id": `${url}#localbusiness`,
      name: duesseldorfCompany.name,
      url,
      email: duesseldorfCompany.email,
      telephone: duesseldorfCompany.phoneRaw,
      priceRange: "nach Anfrage",
      knowsLanguage: ["de", "en"],
      address: {
        "@type": "PostalAddress",
        streetAddress: duesseldorfCompany.streetAddress,
        postalCode: duesseldorfCompany.postalCode,
        addressLocality: duesseldorfCompany.city,
        addressCountry: duesseldorfCompany.countryCode,
      },
      areaServed: [
        { "@type": "City", name: "Düsseldorf" },
        { "@type": "AdministrativeArea", name: "Düsseldorf und Umgebung" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: duesseldorfCompany.phoneRaw,
        email: duesseldorfCompany.email,
        contactType: "customer service",
        availableLanguage: ["de", "en"],
      },
    },
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Düsseldorf", item: "/duesseldorf" },
    ]),
  ];
}

export default function DuesseldorfHubPage() {
  const jsonLd = buildDuesseldorfHubJsonLd();

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
            {region.label}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
            Hilfe in Düsseldorf einfach anfragen
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Sagen Sie kurz, worum es geht: Wohnung, Büro, Keller, Übergabe, Umzug
            oder Räumung. Mit Stadtteil, Termin und Fotos kann FLOXANT schnell
            einschätzen, welcher nächste Schritt passt.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/duesseldorf/umzug"
              data-event="hero_cta_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
            >
              Passende Hilfe finden
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${duesseldorfCompany.phoneRaw}`}
              data-event="phone_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
            >
              <Phone className="h-4 w-4" />
              {duesseldorfCompany.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Für Düsseldorf verständlich sortiert
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Sie schildern den Fall. FLOXANT zeigt den passenden Weg.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Keine Fachbegriffe nötig. Stadtteil, Fotos, Termin und eine kurze
              Beschreibung reichen, damit wir Reinigung, Umzug, Räumung oder
              Entsorgung sauber einordnen können.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Düsseldorf und direkte Umgebung nach Terminlage",
              "Hilfe für Wohnung, Büro, Keller, Übergabe und Objekt",
              "Fotos, Stadtteil, Termin und Wunsch einfach mitsenden",
              "Ehrliche Rückmeldung ohne künstliches Sofortversprechen",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocalIntentBlock
        regionLabel="Düsseldorf lokal"
        title="Stadtteil, Objekt und Zielzustand direkt mitschicken."
        intro="Düsseldorf-Anfragen werden klarer, wenn Stadtteil, Zugang, Objektart und Terminfenster früh sichtbar sind. So landet die Anfrage schneller beim passenden Leistungsweg."
        signals={duesseldorfLocalSignals}
        links={[
          { href: "/duesseldorf/reinigung", label: "Reinigung" },
          { href: "/duesseldorf/solarreinigung", label: "Solar/PV" },
          { href: "/duesseldorf/entruempelung", label: "Räumung" },
        ]}
      />

      <InternationalCustomerHint
        cityLabel="Düsseldorf"
        serviceLabel="Reinigung, Umzug, Räumung oder Solar/PV in Düsseldorf"
        tags={["Cleaning service", "Moving help", "Office cleaning", "House clearance", "Solar panel cleaning"]}
        primaryHref="/kontakt#direktanfrage"
        photoHref="/buchung#buchungssystem"
      />

      <ServiceDecisionGuide
        eyebrow="Düsseldorf-Service wählen"
        title="Nicht sicher, welche Leistung passt?"
        intro="Diese vier Wege decken die meisten lokalen Such- und Anfrageabsichten ab, ohne dass Sie Fachbegriffe kennen müssen."
        items={duesseldorfDecisionGuide}
      />

      <TrustProofSection
        eyebrow="Vertrauen vor Anfrage"
        title="Klare Rückmeldung statt schneller Scheinzusage."
        intro="FLOXANT prüft erst die relevanten Eckdaten und trennt, ob Reinigung, Räumung, Umzug oder Angebotsprüfung der bessere Start ist."
        proofs={duesseldorfTrustProofs}
      />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Der passende Startpunkt
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Wählen Sie, was Ihrem Fall am nächsten kommt.
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Wenn Sie unsicher sind, starten Sie mit dem naheliegendsten Thema.
            Wir ordnen Ihre Anfrage nach Objekt, Zustand, Zugang, Termin und Ziel ein.
          </p>

          <div className="mt-8 grid gap-5">
            {floxantCategoryOrder.map((category) => {
              const services = getServicesByRegionAndCategory("duesseldorf", category);
              if (!services.length) return null;

              return (
                <section key={category} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-normal text-blue-700">
                        FLOXANT Düsseldorf
                      </p>
                      <h3 className="mt-1 text-2xl font-black tracking-normal text-slate-950">
                        {floxantCategoryLabels[category]}
                      </h3>
                    </div>
                    <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                      {floxantCategoryDescriptions[category]}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                      <FloxServiceCard
                        key={service.id}
                        service={service}
                        source={`duesseldorf_hub_${category}`}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
