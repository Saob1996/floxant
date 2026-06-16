import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import {
  InternationalCustomerHint,
  LocalServiceBridge,
  OfferCheckCTA,
  LocalIntentBlock,
  PriceDriverPanel,
  ProblemSituationGrid,
  RelatedSpecialServices,
  ServiceDecisionGuide,
  SignatureServicesGrid,
  TrustProofSection,
} from "@/components/conversion";
import { AiAnswerBlock } from "@/components/ai-answer";
import { company, duesseldorfCompany } from "@/lib/company";
import type { GrowthServicePageConfig } from "@/lib/growth-service-pages";
import { getServiceVisual } from "@/lib/service-visuals";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type GrowthServiceLandingPageProps = {
  config: GrowthServicePageConfig;
};

const kindLabels: Record<GrowthServicePageConfig["kind"], string> = {
  cleaning: "Reinigung",
  moving: "Umzug & Transport",
  clearance: "Entrümpelung & Auflösung",
  signature: "FLOXANT Signature",
};

const internationalGrowthHintPaths = new Set([
  "/solarreinigung",
  "/pv-anlagen-reinigung",
  "/duesseldorf/solarreinigung",
  "/regensburg/solarreinigung",
]);

function getRelatedSpecialKind(config: GrowthServicePageConfig) {
  if (config.kind === "moving") return "moving";
  if (config.kind === "clearance") return "clearance";
  if (config.kind === "signature") return "offer";
  return "cleaning";
}

function getLocalBridgeTargets(config: GrowthServicePageConfig) {
  if (config.kind === "moving") {
    return {
      duesseldorfHref: "/duesseldorf/umzug",
      regensburgHref: "/regensburg/umzug",
    };
  }

  if (config.kind === "clearance") {
    return {
      duesseldorfHref: "/duesseldorf/entruempelung",
      regensburgHref: "/regensburg/entruempelung",
    };
  }

  if (config.kind === "signature") {
    return {
      duesseldorfHref: "/duesseldorf",
      regensburgHref: "/regensburg",
    };
  }

  return {
    duesseldorfHref: "/duesseldorf/reinigung",
    regensburgHref: "/regensburg/reinigung",
  };
}

function getContact(config: GrowthServicePageConfig) {
  if (config.visualRegion === "duesseldorf") {
    return {
      name: duesseldorfCompany.name,
      phone: duesseldorfCompany.phone,
      phoneRaw: duesseldorfCompany.phoneRaw,
      email: duesseldorfCompany.email,
      city: duesseldorfCompany.city,
      streetAddress: duesseldorfCompany.streetAddress,
      postalCode: duesseldorfCompany.postalCode,
      countryCode: duesseldorfCompany.countryCode,
    };
  }

  return {
    name: company.name,
    phone: company.phone,
    phoneRaw: company.phoneRaw,
    email: company.email,
    city: company.city,
    streetAddress: company.streetAddress,
    postalCode: company.postalCode,
    countryCode: company.countryCode,
  };
}

function getBreadcrumbItems(config: GrowthServicePageConfig) {
  const items = [{ name: "FLOXANT", item: "/" }];

  if (config.path.startsWith("/duesseldorf/")) {
    items.push({ name: "Düsseldorf", item: "/duesseldorf" });
  } else if (config.path.startsWith("/regensburg/")) {
    items.push({ name: "Regensburg", item: "/regensburg" });
  } else {
    items.push({ name: "Leistungen", item: "/leistungen" });
  }

  items.push({ name: config.serviceName, item: config.path });
  return items;
}

function JsonLd({
  config,
  whatsappHref,
}: {
  config: GrowthServicePageConfig;
  whatsappHref: string;
}) {
  const canonical = `${company.url}${config.path}`;
  const contact = getContact(config);
  const areaServed = [
    config.cityLabel,
    config.region === "duesseldorf" ? "Düsseldorf" : "",
    config.region === "regensburg" || config.region === "bayern" ? "Regensburg" : "",
    config.region === "bayern" ? "Bayern" : "",
  ].filter(Boolean);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${canonical}#localbusiness`,
        name: contact.name,
        url: canonical,
        telephone: contact.phoneRaw,
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.streetAddress,
          postalCode: contact.postalCode,
          addressLocality: contact.city,
          addressCountry: contact.countryCode,
        },
        sameAs: company.sameAs,
      },
      buildServiceJsonLd({
        name: config.serviceName,
        description: config.metaDescription,
        path: config.path,
        serviceType: config.serviceType,
        areaServed,
        availableLanguage: internationalGrowthHintPaths.has(config.path) ? ["de", "en"] : ["de"],
      }),
      buildWebPageJsonLd({
        name: config.title,
        description: config.metaDescription,
        path: config.path,
        about: [
          config.serviceName,
          config.serviceType,
          kindLabels[config.kind],
          ...config.heroHighlights,
        ],
        potentialActions: [
          { name: config.primaryCta, target: config.bookingHref, type: "ContactAction" },
          { name: config.secondaryCta, target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildBreadcrumbJsonLd(getBreadcrumbItems(config)),
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

export function GrowthServiceLandingPage({ config }: GrowthServiceLandingPageProps) {
  const contact = getContact(config);
  const whatsappHref = buildWhatsAppHref(contact.phoneRaw, config.whatsappMessage);
  const relatedGuideItems = config.relatedLinks.map((item) => ({
    title: item.label,
    text: item.text,
    href: item.href,
    cta: "Seite öffnen",
  }));
  const visual = getServiceVisual({
    region: config.visualRegion,
    slug: config.slug,
    path: config.path,
    serviceLabel: config.serviceName,
  });
  const showInternationalCustomerHint = internationalGrowthHintPaths.has(config.path);
  const relatedSpecialKind = getRelatedSpecialKind(config);
  const localBridgeTargets = getLocalBridgeTargets(config);

  return (
    <main className="overflow-hidden bg-white pb-24 text-slate-950 md:pb-0">
      <JsonLd config={config} whatsappHref={whatsappHref} />

      <section className="relative isolate overflow-hidden bg-slate-950 pt-28 text-white sm:pt-32 lg:pt-36">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-68"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.86)_52%,rgba(15,23,42,0.48)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-20">
          <div className="self-end">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {config.eyebrow}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-200/25 bg-emerald-300/12 px-3 py-2 text-sm font-bold text-emerald-100 backdrop-blur">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {kindLabels[config.kind]}
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              {config.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-100">
              {config.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={config.bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-cyan-50"
                data-event="hero_cta_click"
                data-service={config.slug}
                data-source="growth_service_hero"
              >
                {config.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                data-event="whatsapp_click"
                data-service={config.slug}
                data-source="growth_service_hero"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {config.secondaryCta}
              </a>
              <a
                href={`tel:${contact.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
                data-event="phone_click"
                data-service={config.slug}
                data-source="growth_service_hero"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.phone}
              </a>
            </div>
          </div>

          <div className="grid content-end gap-3 lg:pl-8">
            {config.heroHighlights.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-white/15 bg-slate-950/72 p-4 text-sm font-bold leading-6 text-slate-100 backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProblemSituationGrid
        title="Passt dieser Service zu Ihrer Situation?"
        intro="Die beste Anfrage beschreibt nicht nur eine Leistung, sondern den konkreten Engpass: Ort, Objekt, Termin, Zugang, Fotos und Zielzustand."
        items={config.situations}
      />

      {showInternationalCustomerHint ? (
        <InternationalCustomerHint
          cityLabel={config.cityLabel}
          serviceLabel={config.serviceName}
          tags={["Solar panel cleaning", "PV cleaning", "Cleaning service", "Photos welcome"]}
          primaryHref={config.bookingHref}
          photoHref={config.bookingHref}
          offerHref="/angebot-guenstiger-pruefen#guenstiger-form"
        />
      ) : null}

      {config.signature ? (
        <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
                Signature Service
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Klarer Nutzen statt leerem Sondernamen.
              </h2>
              <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
                Dieser FLOXANT-Service ist ein strukturierter Anfrageweg für Fälle, die vor einem
                normalen Auftrag erst sortiert werden müssen.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Zielgruppe", config.signature.audience],
                ["Problem", config.signature.problem],
                ["Ergebnis", config.signature.result],
                ["Sinnvoll wenn", config.signature.usefulWhen],
                ["Nicht sinnvoll wenn", config.signature.notUsefulWhen],
              ].map(([title, text]) => (
                <article key={title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                  <h3 className="text-sm font-black uppercase tracking-normal text-cyan-100">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TrustProofSection
        title="Was FLOXANT bei dieser Anfrage prüft."
        intro="Entscheidend sind nicht nur Quadratmeter, Kilometer oder ein Stichwort. FLOXANT prüft Zustand, Zugang, Termin, Material, Fotos und sinnvolle Grenzen vor einer Zusage."
        proofs={config.included}
        boundaries={config.boundaries}
      />

      <AiAnswerBlock
        eyebrow="Direkte Antwort"
        title={`${config.serviceName}: wann ist eine Anfrage sinnvoll?`}
        answer={`FLOXANT prueft ${config.serviceName}, wenn Ort, Termin, Umfang, Zugang und Zielzustand so beschrieben sind, dass daraus eine belastbare Einschaetzung entstehen kann.`}
        points={[
          "Fotos helfen bei Aufwand, Zustand und Zugang.",
          "Ein Preisrahmen ersetzt keine Pruefung, macht Rueckfragen aber konkreter.",
          "Bei vorhandenen Angeboten kann FLOXANT offene Punkte sichtbar machen.",
          "Duesseldorf und Regensburg werden nach passendem lokalen Kontaktweg getrennt.",
        ]}
        usefulWhen={[
          "Termin, Ort und Leistung grob klar sind",
          "Fotos oder Beschreibung vorliegen",
          "ein Angebot oder Preis verglichen werden soll",
        ]}
        notUsefulWhen={[
          "eine Rechtsberatung erwartet wird",
          "ohne Angaben ein verbindlicher Festpreis erwartet wird",
        ]}
        neededInfo={["Ort/PLZ", "Terminfenster", "Fotos oder kurze Beschreibung", "Serviceziel"]}
        ctaHref="/angebot-guenstiger-pruefen#guenstiger-form"
        ctaLabel="Angebot oder Situation pruefen"
      />

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Ablauf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              So wird aus einer unsicheren Anfrage ein klarer nächster Schritt.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {config.process.map((step, index) => (
              <article key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PriceDriverPanel drivers={config.costFactors} />

      <LocalIntentBlock
        regionLabel="Lokale Relevanz"
        title={config.cityLabel}
        intro="Lokale Anfragen werden besser, wenn Stadtteil, Objektart, Zugang, Terminfenster und Ansprechpartner direkt sichtbar sind."
        signals={config.localSignals}
      />

      <RelatedSpecialServices
        kind={relatedSpecialKind}
        title={`Welche Spezialservices zu ${config.serviceName} passen.`}
        intro="Nicht jede Anfrage bleibt bei einer einzelnen Leistung. Diese verwandten Wege helfen, Angebot, Zugang, Termin, Fotos und Zielzustand richtig zu verbinden."
        limit={4}
      />

      <SignatureServicesGrid
        title="Passende FLOXANT Signature Services mitdenken."
        intro="Wenn Angebot, Objekt, Uebergabe, Plan B oder Rueckfahrt Teil des Falls sind, fuehren diese Startpunkte zu einer klareren Anfrage."
        limit={4}
      />

      <LocalServiceBridge
        serviceLabel={config.serviceName}
        duesseldorfHref={localBridgeTargets.duesseldorfHref}
        regensburgHref={localBridgeTargets.regensburgHref}
      />

      <OfferCheckCTA
        title="Vorhandenes Angebot zu diesem Service pruefen?"
        text="Wenn bereits ein Angebot vorliegt, kann FLOXANT Umfang, Fotos, Zugang, Termin, Zusatzpositionen und Preislogik sachlich einordnen. Es gibt keine Preisgarantie und keine Abwertung anderer Anbieter."
      />

      <ServiceDecisionGuide
        eyebrow="Passt auch zu"
        title="Verwandte FLOXANT Wege."
        intro="Wenn dieser Service nur ein Teil des Problems ist, führen diese Wege zu Angebot, Objektbrief, Plan B oder einer lokalen Anfrage."
        items={relatedGuideItems}
      />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Häufige Fragen zu {config.serviceName}.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Kurz beantwortet, damit vor der Anfrage klar ist, welche Angaben wirklich zählen.
            </p>
          </article>
          <div className="grid gap-3">
            {config.faq.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm"
              >
                <summary className="cursor-pointer text-sm font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 rounded-lg border border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold leading-7 text-slate-200">
            Senden Sie Ort, Fotos, Termin, Budget oder ein vorhandenes Angebot. FLOXANT prüft die
            Anfrage sachlich, kostenlos und ohne erfundene Zusagen.
          </p>
          <Link
            href={config.bookingHref}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950"
            data-event="hero_cta_click"
            data-service={config.slug}
            data-source="growth_service_final"
          >
            {config.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <Link
          href={config.bookingHref}
          className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-950/25"
          data-event="mobile_sticky_cta_click"
          data-service={config.slug}
        >
          {config.primaryCta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
