import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { company } from "@/lib/company";
import {
  InternationalCustomerHint,
  OfferCheckCTA,
  RelatedSpecialServices,
  SignatureServicesGrid,
} from "@/components/conversion";
import { AiAnswerBlock } from "@/components/ai-answer";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { LocalConversionDecisionBox } from "@/components/LocalConversionDecisionBox";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { ServicePageCustomerSections } from "@/components/ServicePageCustomerSections";
import { SeoLeadForm } from "@/components/SeoLeadForm";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { B2BTrustPanel } from "@/components/B2BTrustPanel";
import {
  floxantCategoryLabels,
  getServicesByRegionAndCategory,
  type FloxantServiceCategory,
} from "@/lib/floxant-services";
import type { RegensburgServicePageConfig } from "@/lib/regensburg-service-pages";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { buildLeadHref, resolveLeadIntent } from "@/lib/lead-intents";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { getServiceVisual } from "@/lib/service-visuals";

type RegensburgServicePageProps = {
  config: RegensburgServicePageConfig;
};

function JsonLd({ config, whatsappHref }: { config: RegensburgServicePageConfig; whatsappHref: string }) {
  const canonical = `${company.url}${config.path}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: config.title,
        description: config.metaDescription,
        path: config.path,
        about: [config.serviceType, "FLOXANT Regensburg", "Übergabe", "Fotos senden"],
        potentialActions: [
          { name: config.primaryCta, target: `${config.path}#anfrage`, type: "ContactAction" },
          { name: "Fotos per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      {
        "@type": "LocalBusiness",
        "@id": `${company.url}/regensburg#localbusiness`,
        name: company.name,
        url: canonical,
        telephone: company.phoneRaw,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.streetAddress,
          postalCode: company.postalCode,
          addressLocality: company.city,
          addressRegion: company.state,
          addressCountry: company.countryCode,
        },
        areaServed: ["Regensburg", "Landkreis Regensburg", "Oberpfalz", "Bayern"].map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: config.serviceType,
        serviceType: config.serviceType,
        provider: { "@id": `${company.url}/regensburg#localbusiness` },
        areaServed: "Regensburg und Umgebung",
        url: canonical,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: canonical,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: company.phoneRaw,
          },
          availableLanguage: ["de", "en"],
        },
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Regensburg", item: "/regensburg" },
        { name: config.serviceType, item: config.path },
      ]),
      buildFaqJsonLd(config.faq),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

function getRegensburgRelatedText(item: { href: string; label: string }) {
  const href = item.href.toLowerCase();
  const label = item.label.toLowerCase();

  if (href.includes("umzug") || label.includes("umzug")) {
    return "Für Wohnungswechsel mit Start, Ziel, Etage, Laufweg, Möbelmenge, Fotos und möglicher Reinigung danach.";
  }

  if (href.includes("entruempelung") || label.includes("entrümpelung")) {
    return "Für Wohnung, Keller, Nebenraum oder Objektflächen, wenn Menge, Zugang, Freigabe, Fotos und Entsorgung geklärt werden müssen.";
  }

  if (href.includes("haushaltsaufloesung") || href.includes("wohnungsaufloesung") || label.includes("auflösung")) {
    return "Für Haushalt, Nachlass oder Wohnungsauflösung, wenn Räume, Freigabe, Ansprechpartner, Entsorgung und Endzustand ruhig sortiert werden sollen.";
  }

  if (href.includes("uebergabe") || href.includes("endreinigung") || label.includes("übergabe")) {
    return "Für Rückgabe, Besichtigung oder Nachmietertermin, wenn Küche, Bad, Böden, Restpunkte und Fotos zählen.";
  }

  if (href.includes("reinigung")) {
    return "Für Reinigung nach Umzug, Räumung oder Leerstand, wenn der Zielzustand vor Nutzung oder Übergabe klar beschrieben werden soll.";
  }

  if (href.includes("anbieter") || href.includes("angebot")) {
    return "Für vorhandene Angebote, wenn Preis, Umfang, Termin, Zusatzpunkte, Fotos und Budget sachlich eingeordnet werden sollen.";
  }

  return `Für ${item.label}, wenn Ort, Umfang, Zugang, Fotos, Termin und gewünschter Endzustand kurz beschrieben werden können.`;
}

function buildRegensburgServiceSummary(config: RegensburgServicePageConfig) {
  if (config.slug === "umzug") {
    return "FLOXANT Regensburg prüft Umzüge nach Start, Ziel, Etage, Laufweg, Möbelmenge, Fotos, Termin und gewünschter Zusatzleistung. Wenn Reinigung, Entrümpelung oder Übergabe dazugehören, wird die Reihenfolge direkt mitgedacht.";
  }

  if (config.slug === "entruempelung") {
    return "FLOXANT Regensburg prüft Entrümpelungen nach Räumen, Menge, Zugang, Etage, Fotos, Freigabe, Entsorgung und gewünschtem Endzustand. So wird klar, ob danach Reinigung oder Übergabevorbereitung sinnvoll ist.";
  }

  if (config.slug === "haushaltsaufloesung") {
    return "FLOXANT Regensburg unterstützt bei Haushaltsauflösungen mit ruhiger Sortierung von Räumen, Nachlass, Freigabe, Ansprechpartnern, Entsorgung, Fotos und möglicher Endreinigung.";
  }

  if (config.slug === "uebergabereinigung" || config.slug === "endreinigung") {
    return "FLOXANT Regensburg prüft Reinigung vor Übergabe, Auszug oder Nachnutzung nach Räumen, Zustand, Fotos, Deadline, Schlüsselweg und gewünschtem Ergebnis. Restmengen oder Räumung können vorab mit eingeordnet werden.";
  }

  return `FLOXANT unterstützt bei ${config.serviceType} mit einer ruhigen Vorprüfung von Ort, Umfang, Zugang, Termin und Fotos. Ziel ist eine klare Rückmeldung, welcher Ablauf für Regensburg und Umgebung sinnvoll ist und welche offenen Punkte vor einem Angebot geklärt werden müssen.`;
}

function buildRegensburgDecisionCopy(config: RegensburgServicePageConfig) {
  if (config.slug === "umzug") {
    return {
      intro:
        "Ein Umzug in Regensburg wird erst belastbar, wenn Start, Ziel, Volumen, Etage, Trageweg und Termin zusammen sichtbar sind. Reinigung oder Entrümpelung werden nur als optionale Zusatzpunkte getrennt geplant.",
      offerLabel: "Umzugsangebot Regensburg vergleichen",
      checklist: [
        "Start- und Zieladresse mit Etage, Aufzug und Haltemöglichkeit",
        "Möbelmenge, Kartons, große Einzelstücke und Fotos",
        "Terminfenster, Trageweg, Treppenhaus und Ansprechpartner",
        "Zusatzpunkte wie Montage, Packhilfe, Restmengen oder Reinigung separat nennen",
      ],
      localLogic: [
        "Bei Altstadt-Umzügen sind Zufahrt, Ladezone und Trageweg früh zu klären.",
        "In Kumpfmühl, Westenviertel oder Prüfening entscheiden Etage, Aufzug und Parkmöglichkeit häufig über den Aufwand.",
      ],
    };
  }

  if (config.slug === "entruempelung") {
    return {
      intro:
        "Entrümpelung braucht Fotos, Menge, Zugang und Zielzustand. So wird klar, ob es um Keller, Wohnung, Nachlass, Übergabevorbereitung oder nur um einzelne Restmengen geht.",
      offerLabel: "Entrümpelungsangebot Regensburg vergleichen",
      checklist: [
        "Räume: Wohnung, Keller, Dachboden, Garage oder Nebenfläche",
        "Menge, Material, was bleibt und was raus soll",
        "Fotos, Etage, Aufzug, Laufweg, Parkmöglichkeit und Freigabe",
        "Termin, Zielzustand und ob danach Reinigung nötig ist",
      ],
      localLogic: [
        "In Altstadt, Stadtamhof oder dicht belegten Wohnhäusern sind Zugang und Laufweg wichtiger als eine grobe Mengenangabe.",
        "In Burgweinting, Reinhausen oder Prüfening helfen Fotos von Keller, Garage und Haltepunkt, damit der Aufwand realistisch bleibt.",
      ],
    };
  }

  if (config.slug === "wohnungsaufloesung") {
    return {
      intro:
        "Wohnungsauflösung ist kein harter Schnellauftrag. Freigaben, persönliche Gegenstände, Ansprechpartner, Räume und Übergabeziel müssen ruhig geklärt werden.",
      offerLabel: "Auflösungsangebot Regensburg vergleichen",
      checklist: [
        "Situation: Nachlass, Auszug, Pflegeheimwechsel oder Leerstand",
        "Räume, Keller, Menge, was bleiben soll und wer freigibt",
        "Fotos von Wohnung, Laufwegen, Möbeln und sensiblen Bereichen",
        "Zielzustand: geräumt, besenrein, gereinigt oder übergabefähig",
      ],
      localLogic: [
        "Bei Nachlasswohnungen in Regensburg zählen Freigabe, Schlüsselweg und Ansprechpartner mehr als eine schnelle Preisfrage.",
        "Wenn Vermieterübergabe oder Nachnutzung ansteht, werden Räumung, Entsorgung und Reinigung getrennt eingeordnet.",
      ],
    };
  }

  if (config.slug === "bueroreinigung") {
    return {
      intro:
        "Büroreinigung passt, wenn Arbeitsplätze, Besprechung, Empfang, Teeküche, Sanitär, Turnus und Randzeit konkret beschrieben werden. Für breitere Objektflächen führt Gewerbereinigung weiter.",
      offerLabel: "Büroreinigungsangebot Regensburg vergleichen",
      checklist: [
        "Arbeitsplätze, Besprechungsräume, Empfang, Küche und Sanitär",
        "Fläche, Raumliste, Boden, Turnus und gewünschte Randzeit",
        "Schlüsselweg, Zugang, Ansprechpartner und Hausordnung",
        "Fotos und vorhandenes Angebot, falls ein Vergleich gewünscht ist",
      ],
      localLogic: [
        "Büros in Altstadt oder Stadtamhof brauchen oft klare Randzeiten und Zugangspunkte.",
        "In Gewerbelagen oder größeren Objekten entscheidet die Raumliste, ob Büroreinigung oder Gewerbereinigung besser passt.",
      ],
    };
  }

  return {
    intro:
      "Eine gute Rückmeldung entsteht, wenn Ort, Umfang, Zugang, Termin und Zielzustand zusammenpassen. Diese Punkte helfen, die Anfrage ohne Blindpreis sauber vorzubereiten.",
    offerLabel: "Angebot Regensburg vergleichen",
    checklist: [
      "Regensburg, Stadtteil, PLZ oder Umland-Ort nennen",
      `${config.serviceType}: Umfang, Zielzustand und Termin beschreiben`,
      "Fotos, vorhandenes Angebot, Raumliste oder grobe Menge mitschicken",
      "Zugang, Etage, Parken, Schlüsselweg und Ansprechpartner klären",
    ],
    localLogic: [
      "Regensburg und Landkreis Regensburg werden zuerst nach Machbarkeit, Route und Zeitfenster geprüft.",
      "Weiter entfernte Orte gehören in die Angebotsprüfung, wenn Route, Rückfahrt oder Kombination den Auftrag realistisch machen.",
    ],
  };
}

export function RegensburgServicePage({ config }: RegensburgServicePageProps) {
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, config.whatsappMessage);
  const serviceVisual = getServiceVisual({
    region: "regensburg",
    slug: config.slug,
    path: config.path,
    serviceLabel: config.serviceType,
  });
  const bookingLead = resolveLeadIntent(
    config.slug === "angebot-vergleichen-regensburg"
      ? {
          service: "angebot-pruefen",
          city: "regensburg",
          intent: "angebot-vergleichen-regensburg",
          priority: "p0",
        }
      : {
          service: config.slug,
          city: "regensburg",
          intent: `${config.slug}-regensburg`,
          priority: "p3",
        },
  );
  const bookingHref = buildLeadHref(bookingLead);
  const regensburgOfferHref = "/angebot-vergleichen-regensburg";
  const category: FloxantServiceCategory =
    config.slug === "umzug" ||
    config.slug === "umzugsunternehmen" ||
    config.slug === "entruempelung" ||
    config.slug === "haushaltsaufloesung" ||
    config.slug === "wohnungsaufloesung" ||
    config.slug === "bueroreinigung" ||
    config.slug === "reinigungsfirma" ||
    config.slug === "uebergabereinigung" ||
    config.slug === "endreinigung"
      ? "normal"
      : config.slug === "besenreine-uebergabe" || config.slug === "angebot-vergleichen-regensburg"
        ? "special"
        : "signature";
  const proofServiceKey =
    config.slug.includes("entruempelung") ||
    config.slug.includes("haushaltsaufloesung") ||
    config.slug.includes("wohnungsaufloesung")
      ? "entruempelung"
      : config.slug.includes("buero") || config.slug.includes("gewerbe")
        ? "b2b"
        : config.slug.includes("umzug") || config.slug.includes("transport") || config.slug.includes("klavier")
          ? "umzug"
          : "reinigung";
  const relatedCategoryServices = getServicesByRegionAndCategory("regensburg", category)
    .filter((service) => service.href !== config.path)
    .slice(0, 5);
  const customerSectionServices = [
    {
      title: config.serviceType,
      text: config.description,
      href: config.path,
    },
    ...config.related.slice(0, 5).map((item) => ({
      title: item.label,
      text: getRegensburgRelatedText(item),
      href: item.href,
    })),
  ];
  const internationalTags =
    config.slug === "umzug"
      ? ["Moving company", "Moving service", "Relocation help", "Moving help"]
      : config.slug === "entruempelung"
        ? ["Decluttering", "Junk removal", "House clearance", "Cleaning help"]
        : config.slug === "haushaltsaufloesung"
          ? ["House clearance", "Decluttering", "Junk removal", "Moving help"]
          : ["Cleaning service", "End of tenancy cleaning", "Moving help", "House clearance"];
  const relatedSpecialKind =
    config.slug === "umzug"
      ? "moving"
      : config.slug === "entruempelung" || config.slug === "haushaltsaufloesung"
        ? "clearance"
        : "cleaning";
  const decisionCopy = buildRegensburgDecisionCopy(config);
  const decisionServiceName = config.serviceType.replace(/\s+Regensburg$/u, "");

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd config={config} whatsappHref={whatsappHref} />

      <section className="relative isolate overflow-hidden bg-slate-950 pt-24 text-white sm:pt-28 lg:pt-32">
        <Image
          src={serviceVisual.src}
          alt={serviceVisual.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.82)_52%,rgba(15,23,42,0.42)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-20 lg:pt-10">
          <div>
            <div className="flex flex-wrap gap-2">
              <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {config.eyebrow}
              </p>
              <Link
                href={`/leistungen#regensburg-${category}`}
                data-event="service_card_click"
                data-region="regensburg"
                data-category={category}
                data-source="regensburg_service_hero_category"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-100/20 bg-cyan-100/12 px-3 py-2 text-sm font-bold text-cyan-50 backdrop-blur transition hover:bg-cyan-100/18"
              >
                {floxantCategoryLabels[category]}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              {config.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              {config.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bookingHref}
                data-event="seo_cta_click"
                data-region="regensburg"
                data-service={bookingLead.trackingService}
                data-city={bookingLead.trackingCity}
                data-page-intent={bookingLead.trackingIntent}
                data-priority={bookingLead.priority}
                data-cta-label={config.primaryCta}
                data-destination={bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/25 transition hover:bg-cyan-50"
              >
                {config.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="seo_cta_click"
                data-region="regensburg"
                data-service={bookingLead.trackingService}
                data-city={bookingLead.trackingCity}
                data-page-intent={bookingLead.trackingIntent}
                data-priority={bookingLead.priority}
                data-cta-label="Fotos per WhatsApp senden"
                data-destination={whatsappHref}
                data-contact-channel="whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Fotos per WhatsApp senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="seo_phone_click"
                data-region="regensburg"
                data-service={config.slug}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {company.phone}
              </a>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Regensburg und Umgebung",
                "Fotos oder Eckdaten reichen zum Start",
                "Keine Vermischung mit Düsseldorf-Reinigung",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-white/14 bg-white/8 px-4 py-3 text-sm font-bold leading-6 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside id="anfrage" className="scroll-mt-28 rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/20 sm:p-6">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Kurz anfragen
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">
              Was wir für die erste Rückmeldung brauchen
            </h2>
            <div className="mt-5 grid gap-3">
              {config.scope.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            {config.slug === "angebot-vergleichen-regensburg" ? (
              <div className="mt-6">
                <SeoLeadForm
                  initialIntent={bookingLead}
                  sourcePage={config.path}
                  initialOfferStatus="written_offer"
                />
              </div>
            ) : (
              <div className="mt-6 grid gap-3">
                <Link
                  href={bookingHref}
                  data-event="seo_cta_click"
                  data-region="regensburg"
                  data-service={bookingLead.trackingService}
                  data-city={bookingLead.trackingCity}
                  data-page-intent={bookingLead.trackingIntent}
                  data-priority={bookingLead.priority}
                  data-cta-label="Anfrageformular öffnen"
                  data-destination={bookingHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
                >
                  Anfrageformular öffnen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappHref}
                  data-event="seo_cta_click"
                  data-region="regensburg"
                  data-service={bookingLead.trackingService}
                  data-city={bookingLead.trackingCity}
                  data-page-intent={bookingLead.trackingIntent}
                  data-priority={bookingLead.priority}
                  data-cta-label="WhatsApp mit Fotos"
                  data-destination={whatsappHref}
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp mit Fotos
                </a>
              </div>
            )}
          </aside>
        </div>
      </section>

      <InternationalCustomerHint
        cityLabel="Regensburg"
        serviceLabel={config.serviceType}
        tags={internationalTags}
        primaryHref={bookingHref}
        photoHref={bookingHref}
        offerHref={regensburgOfferHref}
      />

      <LocalConversionDecisionBox
        cityName="Regensburg"
        serviceName={decisionServiceName}
        region="regensburg"
        primaryHref={bookingHref}
        primaryLabel={config.primaryCta}
        offerHref={regensburgOfferHref}
        offerLabel={decisionCopy.offerLabel}
        intro={decisionCopy.intro}
        checklist={decisionCopy.checklist}
        decisionItems={config.scope.slice(0, 4)}
        localLogic={decisionCopy.localLogic}
        trustItems={config.trust.slice(0, 3)}
      />

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <ServicePageCustomerSections
            region="regensburg"
            city="Regensburg"
            path={config.path}
            serviceSlug={config.slug}
            serviceLabel={config.serviceType}
            audience="Privatkunden, Familien, Vermieter, Erben und objektbezogene Auftraggeber"
            summary={buildRegensburgServiceSummary(config)}
            services={customerSectionServices}
            relatedLinks={config.related}
            offerCheckHref={regensburgOfferHref}
          />
        </div>
      </section>

      <AiAnswerBlock
        eyebrow="Regensburg Antwort"
        title={`${config.serviceType}: was für eine schnelle Einschätzung zählt.`}
        answer="FLOXANT kann lokale Regensburg-Anfragen besser einordnen, wenn Ort, Termin, Umfang, Zugang und Fotos früh sichtbar sind."
        points={[
          "Regensburg, Landkreis und Bayern werden nach Machbarkeit getrennt.",
          "Fotos reduzieren Rückfragen zu Zustand, Menge oder Fläche.",
          "Vorhandene Angebote können praktisch eingeordnet werden.",
          "Bei Zeitdruck ist Plan B oft wichtiger als ein reiner Preisvergleich.",
        ]}
        usefulWhen={["Termin oder Übergabe näherrückt", "Fotos oder Angebot vorliegen", "Serviceumfang noch nicht sauber beschrieben ist"]}
        notUsefulWhen={["eine Rechtsberatung erwartet wird", "ohne Angaben eine feste Zusage erwartet wird"]}
        neededInfo={["Ort/PLZ", "Termin", "Fotos", "kurze Beschreibung"]}
      />

      <RelatedSpecialServices
        kind={relatedSpecialKind}
        title={`Spezialservices passend zu ${config.serviceType} in Regensburg.`}
        intro="Wenn Umzug, Reinigung, Räumung, Übergabe oder Angebot zusammenhängen, helfen diese Spezialseiten beim nächsten sinnvollen Schritt."
        limit={4}
      />

      <SignatureServicesGrid
        title="Signature Services für Regensburger Sonderfälle."
        intro="Objektbrief, Übergabeakte, Plan B, Fairpreis-Check und Rückfahrt helfen, wenn die Anfrage mehr Abstimmung braucht als ein Standardformular."
        limit={4}
      />

      <OfferCheckCTA
        title={`Angebot für ${config.serviceType} schon vorhanden?`}
        text="FLOXANT prüft vorhandene Angebote nach Umfang, Fotos, Termin, Zugang, Zusatzpositionen und realistischen Grenzen. Keine Preisgarantie, keine Anbieter-Diffamierung."
        href={regensburgOfferHref}
      />

      {proofServiceKey === "b2b" ? <B2BTrustPanel /> : null}

      <TrustProofPanel
        allowedPage={config.path}
        serviceKey={proofServiceKey}
        locationKey="regensburg"
        title={`Trust Proof für ${config.serviceType}`}
        intro="Diese Regensburger Serviceseite setzt auf prüfbare Eckdaten statt erfundener Bewertungen: Ort, Umfang, Fotos, Zugang, Termin und offene Punkte."
      />

      <ServiceProofChecklist
        serviceKey={proofServiceKey}
        title={`Welche Angaben ${config.serviceType} belastbarer machen`}
        intro="Je konkreter lokale Eckdaten und sichtbare Objektinformationen sind, desto klarer wird die erste Rückmeldung."
      />

      <ServiceVisualProofGrid serviceKey={proofServiceKey} locationKey="regensburg" />

      <LocalProofPanel location="regensburg" />

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Geeignet für
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Diese Seite gehört klar zu FLOXANT Regensburg.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Diese Seite bezieht sich auf Regensburg und Umgebung. Ort, Umfang, Zugang,
              Fotos, Termin und vorhandene Angebote werden getrennt eingeordnet, damit
              Umzug, Reinigung, Räumung oder Übergabe nicht unsauber vermischt werden.
              Düsseldorfer Reinigung bleibt im eigenen Bereich.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.suitableFor.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              So läuft die Anfrage ab
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Erst Eckdaten, dann klare Rückmeldung.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {config.process.map((step, index) => (
              <article key={step} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Vertrauen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Ruhige Prüfung statt schneller Versprechen.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {config.trust.map((item) => (
              <article key={item} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <ShieldCheck className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Häufige Fragen.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {config.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {config.faq.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {relatedCategoryServices.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                  Weitere Regensburger Wege
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                  Passende Leistungen aus derselben Kategorie.
                </h2>
                <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
                  Wenn dieser Service nicht genau passt, helfen diese regional einsortierten
                  Seiten weiter. Alle Links bleiben im Regensburger Leistungsbereich und
                  führen nicht in Düsseldorfer Reinigungstexte.
                </p>
              </div>
              <Link
                href="/leistungen#regensburg"
                data-event="service_card_click"
                data-region="regensburg"
                data-source="regensburg_service_related_overview"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800"
              >
                Alle Regensburg-Leistungen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {relatedCategoryServices.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  data-event="service_card_click"
                  data-region="regensburg"
                  data-service={service.id}
                  data-category={service.category}
                  data-source="regensburg_service_related"
                  className="group flex min-h-[11rem] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-xs font-black uppercase tracking-normal text-blue-700">
                    {floxantCategoryLabels[service.category]}
                  </p>
                  <h3 className="mt-3 text-lg font-black leading-snug text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {service.shortDescription}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-black text-blue-700">
                    {service.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
