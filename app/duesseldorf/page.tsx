import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";

import {
  InternationalCustomerHint,
  LocalIntentBlock,
  ServiceDecisionGuide,
  TrustProofSection,
} from "@/components/conversion";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { LocalContactPanel } from "@/components/LocalContactPanel";
import { LocationClarityPanel } from "@/components/LocationClarityPanel";
import { LocationFaq } from "@/components/LocationFaq";
import { ProjectStoryGrid } from "@/components/ProjectStoryGrid";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { ServiceFitAdvisor } from "@/components/ServiceFitAdvisor";
import { ServiceClusterGrid } from "@/components/ServiceClusterGrid";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { AiAnswerBlock } from "@/components/ai-answer";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { company, duesseldorfCompany } from "@/lib/company";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantCategoryOrder,
  floxantRegions,
  getServicesByRegionAndCategory,
} from "@/lib/floxant-services";
import { locationClarityItems } from "@/lib/professional-copy";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const region = floxantRegions.duesseldorf;
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Düsseldorf,",
    "ich suche eine Reinigungsfirma in Düsseldorf.",
    "Es geht um Büro, Praxis, Gewerbe, Grundreinigung oder ein vorhandenes Reinigungsangebot.",
    "Stadtteil, Objektart, Fläche, Termin und Fotos kann ich direkt mitsenden.",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Reinigung Duesseldorf mit Objekt, Flaeche und Termin",
  description:
    "Stadtteil, Objekt, Flaeche, Turnus, Fotos und Termin nennen. FLOXANT ordnet die passende Reinigung in Duesseldorf strukturiert ein.",
  alternates: { canonical: "/duesseldorf" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${company.url}/duesseldorf`,
    siteName: "FLOXANT",
    title: "Reinigung Duesseldorf mit Objekt, Flaeche und Termin",
    description:
      "Stadtteil, Objekt, Flaeche, Turnus, Fotos und Termin nennen. FLOXANT ordnet die passende Duesseldorfer Reinigung ein.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reinigung Duesseldorf mit Objekt, Flaeche und Termin",
    description:
      "Stadtteil, Objekt, Flaeche, Turnus, Fotos und Termin nennen. FLOXANT ordnet die passende Duesseldorfer Reinigung ein.",
  },
};

const duesseldorfLocalSignals = [
  "Stadtteil oder PLZ reichen für den Start: Altstadt, Bilk, Pempelfort, Oberkassel, Derendorf oder Umgebung.",
  "Bei Reinigungsfirma Düsseldorf zählen Objektart, Fläche, Turnus, Zugang und Zeitfenster stärker als ein einzelnes Stichwort.",
  "Für Gewerbereinigung, Büroreinigung, Praxisreinigung und Grundreinigung helfen Fotos, Raumliste, Sanitärbereiche und gewünschter Starttermin.",
  "Vorhandene Reinigungsangebote werden nur fair vergleichbar, wenn Umfang, Zusatzpunkte, Turnus, Stadtteil und Preisrahmen sichtbar sind.",
  "Solar/PV, Glas und Fassade brauchen Angaben zu Höhe, Dachzugang, Wasseranschluss und Sicherheitsgrenzen.",
] as const;

const duesseldorfDecisionGuide = [
  {
    title: "Reinigungsfirma Düsseldorf",
    text: "Zentraler Einstieg für Büro, Praxis, Kanzlei, Gewerbe, Grundreinigung und Angebotsprüfung in Düsseldorf.",
    href: "/duesseldorf/reinigungsfirma",
    cta: "Reinigungsfirma öffnen",
  },
  {
    title: "Region Düsseldorf und Umland",
    text: "Kuratierter Hub für Düsseldorf, direkte Umgebung und vorbereitete Umland-Seiten ohne falsche Standortbehauptung.",
    href: "/region-duesseldorf",
    cta: "Region öffnen",
  },
  {
    title: "Gewerbe, Büro und Praxis",
    text: "Gewerbeflächen, Büroreinigung, Praxisreinigung, Kanzlei und Unterhaltsreinigung mit Raumliste und Turnus prüfen.",
    href: "/duesseldorf/gewerbereinigung",
    cta: "Gewerbereinigung prüfen",
  },
  {
    title: "Putzfirma, Wohnung und Treppenhaus",
    text: "Putzfirma, Wohnungsreinigung, Treppenhausreinigung, Hauseingang und Grundreinigung mit Stadtteil, Fotos und Termin klären.",
    href: "/duesseldorf/putzfirma",
    cta: "Putzfirma öffnen",
  },
  {
    title: "Gewerbeflächen und Heerdt",
    text: "Gewerbeflächen reinigen lassen oder Reinigung in Düsseldorf-Heerdt lokal mit Objekt, Zugang, Turnus und Angebot prüfen.",
    href: "/duesseldorf/gewerbeflaechen-reinigung",
    cta: "Gewerbefläche prüfen",
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
    href: "/duesseldorf/angebot-vergleichen",
    cta: "Angebot prüfen",
  },
] as const;

const duesseldorfTrustProofs = [
  "Düsseldorf-Anfragen bleiben nach Reinigungsfirma, Gewerbereinigung, Büro, Praxis, Grundreinigung und Angebotsprüfung getrennt.",
  "Fotos, Stadtteil, Termin und Objektart helfen, ohne dass sofort eine Beauftragung entsteht.",
  "FLOXANT nennt Grenzen klar, statt Verfügbarkeit, Preis oder Ergebnis pauschal zu versprechen.",
] as const;

function buildDuesseldorfHubJsonLd() {
  const url = `${company.url}/duesseldorf`;

  return [
    buildWebPageJsonLd({
      name: "FLOXANT Düsseldorf",
      description:
        "FLOXANT Düsseldorf hilft bei Reinigungsfirma, Gewerbereinigung, Büroreinigung, Praxisreinigung, Grundreinigung und Reinigungsangebot-Prüfung. Anfrage auf Deutsch oder Englisch möglich.",
      path: "/duesseldorf",
      about: [
        "Reinigungsfirma Düsseldorf",
        "Reinigung Düsseldorf",
        "Gewerbereinigung Düsseldorf",
        "Büroreinigung Düsseldorf",
        "Praxisreinigung Düsseldorf",
        "Grundreinigung Düsseldorf",
        "Reinigungsangebot prüfen",
        "Cleaning service Düsseldorf",
      ],
      potentialActions: [
        {
          type: "ContactAction",
          name: "Reinigungsanfrage auf Deutsch oder Englisch senden",
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
            Reinigung Düsseldorf mit Objekt, Fläche und Termin anfragen
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Sagen Sie kurz, ob es um Büro, Praxis, Kanzlei, Gewerbefläche,
            Grundreinigung oder ein vorhandenes Reinigungsangebot geht. Mit
            Stadtteil, Fläche, Termin und Fotos kann FLOXANT den passenden
            Düsseldorfer Reinigungsweg einschätzen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/duesseldorf/reinigungsfirma"
              data-event="hero_cta_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
            >
              Reinigungsfirma öffnen
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

      <LocationClarityPanel
        title="Düsseldorf bleibt ein eigener Reinigungsstandort."
        intro="Duesseldorf wird nicht mit Regensburg vermischt. Fuer die Einordnung zaehlen Stadtteil, Objektart, Flaeche, Turnus, Zugang, Fotos und Terminfenster."
        locations={locationClarityItems}
      />

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
        title="Stadtteil, Objekt und Reinigungsziel direkt mitschicken."
        intro="Düsseldorfer Reinigungsanfragen werden klarer, wenn Stadtteil, Zugang, Objektart, Fläche, Turnus und Terminfenster früh sichtbar sind. So landet die Anfrage schneller bei Reinigungsfirma, Gewerbereinigung, Büro, Praxis oder Angebotsprüfung."
        signals={duesseldorfLocalSignals}
        links={[
          { href: "/duesseldorf/reinigungsfirma", label: "Reinigungsfirma" },
          { href: "/region-duesseldorf", label: "Region Düsseldorf" },
          { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
          { href: "/duesseldorf/reinigungsdienst", label: "Reinigungsdienst" },
          { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung" },
          { href: "/duesseldorf/putzfirma", label: "Putzfirma" },
          { href: "/duesseldorf/haushaltsreinigung", label: "Haushaltsreinigung" },
          { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung" },
          { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung" },
          { href: "/duesseldorf/geruchsneutralisation", label: "Geruchsneutralisation" },
          { href: "/duesseldorf/gewerbeflaechen-reinigung", label: "Gewerbeflächen" },
          { href: "/duesseldorf/reinigung-heerdt", label: "Heerdt" },
          { href: "/duesseldorf/angebot-vergleichen", label: "Angebotsprüfung" },
          { href: "/angebot-vergleichen-duesseldorf", label: "Angebot prüfen" },
        ]}
      />

      <AiAnswerBlock
        eyebrow="Kurze Antwort"
        title="Duesseldorf: der beste Start haengt vom Objekt ab."
        answer="FLOXANT ordnet Duesseldorfer Anfragen nach Stadtteil, Objektart, Flaeche, Turnus, Zugang und vorhandenen Fotos ein. Bei Bueros, Praxen und Gewerbe ist oft eine direkte Reinigungsanfrage sinnvoll; bei unklarem Leistungsumfang oder bestehendem Angebot hilft die Angebotspruefung."
        points={[
          "Reinigung, Bueroreinigung, Gewerbereinigung und Praxisreinigung bleiben fachlich getrennt.",
          "Vorhandene Angebote werden ohne Preisgarantie nach Umfang, Zusatzpunkten und Annahmen eingeordnet.",
          "Stadtteil, Fotos und Zeitfenster machen Rueckfragen konkreter.",
          "Bei Spezialfaellen wie Glas, PV, Fassade oder Raeumung fuehren passende Links weiter.",
        ]}
        usefulWhen={["Objektart und Stadtteil bekannt sind", "ein Reinigungsangebot geprueft werden soll", "Fotos oder Raumliste vorliegen"]}
        notUsefulWhen={["eine sofort verbindliche Preiszusage erwartet wird", "noch gar kein Objekt beschrieben werden kann"]}
        neededInfo={["Stadtteil", "Objektart", "Flaeche oder Raumliste", "Fotos oder vorhandenes Angebot"]}
        ctaHref="/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo"
        ctaLabel="Duesseldorf-Anfrage starten"
      />

      <LocationFaq
        location="duesseldorf"
        includeJsonLd
        className="border-y border-slate-200"
      />

      <LocalContactPanel
        locationKeys={["duesseldorf"]}
        service="reinigung"
        title="FLOXANT Duesseldorf mit sichtbaren Standortdaten."
        intro="Die Duesseldorfer Adresse, Telefon und E-Mail kommen aus zentralen Standortdaten. Oeffnungszeiten und GBP-Profil-URL bleiben bis zur manuellen Pruefung ungenannt."
      />

      <ServiceFitAdvisor
        currentCity="duesseldorf"
        title="Duesseldorfer Anfrage schnell richtig einordnen."
        intro="Die Auswahl fuehrt zu Kontaktlinks mit city=duesseldorf und passendem Intent. Es wird nichts automatisch gesendet."
      />

      <ServiceClusterGrid
        locationKey="duesseldorf"
        categories={["reinigung", "angebot_pruefen", "signature_service"]}
        title="Duesseldorfer Services nach Reinigungs- und Entscheidungsfall."
        intro="Die zentrale Inventur trennt direkte Reinigungsleistungen, Angebotspruefung und Signature Services. Unklare Verfuegbarkeiten werden sichtbar als manuelle Pruefung markiert."
        limitPerCategory={5}
      />

      <InternationalCustomerHint
        cityLabel="Düsseldorf"
        serviceLabel="Reinigungsfirma, Office Cleaning, Gewerbereinigung oder Angebotsprüfung in Düsseldorf"
        tags={["Cleaning service", "Office cleaning", "Commercial cleaning", "Practice cleaning", "Quote check"]}
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

      <LocalProofPanel location="duesseldorf" />

      <TrustProofPanel
        allowedPage="/duesseldorf"
        serviceKey="reinigung"
        locationKey="duesseldorf"
        title="Duesseldorf-Trust ohne GBP-Raten."
        intro="Die Seite zeigt nur belegbare lokale Signale aus vorhandenen Daten und markiert GBP, Oeffnungszeiten und Review-Belege als manuell zu pruefen."
      />

      <ServiceProofChecklist
        serviceKey="reinigung"
        title="Was Duesseldorfer Reinigungsanfragen belegbarer macht"
        intro="Objektart, Flaeche, Fotos, Zugang, Turnus und Zielzustand machen aus einer lokalen Anfrage einen pruefbaren Start."
      />

      <ProjectStoryGrid serviceKey="angebot-pruefen" locationKey="duesseldorf" />
      <ServiceVisualProofGrid serviceKey="reinigung" locationKey="duesseldorf" />

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
