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
import { PhotoGuidanceBlock } from "@/components/PhotoGuidanceBlock";
import { RequestChecklistBlock } from "@/components/RequestChecklistBlock";
import { company, duesseldorfCompany } from "@/lib/company";
import type { GrowthServicePageConfig } from "@/lib/growth-service-pages";
import { buildServiceContactHref } from "@/lib/service-routing";
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
  "/regensburg/reinigung",
  "/regensburg/solarreinigung",
]);

const solarPvPaths = new Set(["/solarreinigung", "/pv-anlagen-reinigung", "/regensburg/solarreinigung"]);

function isSolarPvPage(config: GrowthServicePageConfig) {
  return solarPvPaths.has(config.path) || config.slug.includes("solarreinigung") || config.slug.includes("pv-anlagen");
}

function getRelatedSpecialKind(config: GrowthServicePageConfig) {
  if (config.kind === "moving") return "moving";
  if (config.kind === "clearance") return "clearance";
  if (config.kind === "signature") return "offer";
  return "cleaning";
}

function getLocalBridgeTargets(config: GrowthServicePageConfig) {
  if (isSolarPvPage(config)) {
    return {
      duesseldorfHref: "/solarreinigung",
      regensburgHref: "/regensburg/solarreinigung",
    };
  }

  if (config.kind === "moving") {
    return {
      duesseldorfHref: "/regensburg/umzug",
      regensburgHref: "/regensburg/umzug",
    };
  }

  if (config.kind === "clearance") {
    return {
      duesseldorfHref: "/duesseldorf/entsorgung",
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
    duesseldorfHref: "/duesseldorf",
    regensburgHref: "/regensburg/reinigung",
  };
}

function getSolarPvOfferLinks(config: GrowthServicePageConfig) {
  const city =
    config.path.includes("/regensburg") || config.cityLabel.toLowerCase().includes("regensburg")
      ? "regensburg"
      : config.cityLabel.toLowerCase().includes("duesseldorf") || config.cityLabel.toLowerCase().includes("düsseldorf")
        ? "duesseldorf"
        : undefined;

  const href = (service: "solarreinigung" | "angebotscheck", intent: string) =>
    buildServiceContactHref({ service, city, intent, source: "website", anchor: "" });

  return {
    solarRequest: href("solarreinigung", "solarreinigung-anfragen"),
    solarOffer: href("angebotscheck", "solarreinigung-angebot-pruefen"),
    pvRequest: href("solarreinigung", "pv-reinigung-anfragen"),
    pvOffer: href("angebotscheck", "pv-reinigung-angebot-pruefen"),
  };
}

function SolarPvAuthorityPanel({ config }: { config: GrowthServicePageConfig }) {
  const links = getSolarPvOfferLinks(config);
  const quickAnswer =
    config.slug === "pv-anlagen-reinigung"
      ? "Für eine PV-Anlagen-Reinigung helfen Angaben zu Modulfläche, Dachart, Zugang, sichtbarer Verschmutzung, Fotos und gewünschtem Zeitraum. FLOXANT prüft diese Angaben oder ein vorhandenes Angebot anhand der genannten Eckdaten. Eine Ertragssteigerung, Preisersparnis oder Verfügbarkeit wird nicht garantiert."
      : "Für eine Solarreinigungsanfrage helfen Dachart, Zugang, Modulfläche, sichtbare Verschmutzung, Fotos und gewünschter Zeitraum. FLOXANT kann die Angaben strukturieren und ein vorhandenes Angebot einordnen. Eine Ertragssteigerung oder Preisersparnis wird nicht garantiert.";

  return (
    <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <article className="rounded-lg border border-cyan-100 bg-cyan-50 p-5">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Kurz erklärt</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Zugang, Dachart und Fotos zuerst klären.
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{quickAnswer}</p>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-black text-slate-950">Was FLOXANT braucht</h3>
            <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
              {[
                "Stadt, Ort oder Einsatzgebiet",
                "Dachart, Zugang und Sicherheitslage",
                "ungefähre Modulfläche oder Modulanzahl",
                "sichtbare Verschmutzung und optionale Fotos",
                "vorhandenes Angebot und gewünschter Zeitraum",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
            <h3 className="text-lg font-black">Was nicht versprochen wird</h3>
            <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-200">
              {[
                "keine Ertragsgarantie",
                "keine Preis- oder Ersparnisgarantie",
                "keine Soforttermin-Garantie",
                "keine technische Sicherheitszusage ohne Prüfung",
                "keine automatische Buchung durch Anfrage",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Solarreinigungsangebot prüfen lassen</p>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
            Angebot für Solar- oder PV-Reinigung sachlich einordnen.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            Wenn ein Angebot für Solarreinigung oder PV-Anlagen-Reinigung unklar wirkt, kann FLOXANT Dachart, Zugang,
            Modulfläche, sichtbare Verschmutzung, Sicherheitslage und mögliche Zusatzkosten strukturieren. Es gibt keine
            Ertragsgarantie, keine Ersparnisgarantie und keine Rechtsberatung.
          </p>
        </div>
        <div className="grid content-center gap-3 sm:grid-cols-2">
          <Link
            href={links.solarOffer}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white"
          >
            Solarreinigungsangebot prüfen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={links.pvOffer}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-slate-950"
          >
            PV-Reinigungsangebot prüfen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SolarPvDifferentiation() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-normal text-blue-700">Solarreinigung oder PV-Anlagen-Reinigung?</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
          Zwei Suchbegriffe, ein sauber getrennter Anfrageweg.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-950">Solarreinigung</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
              Der breitere Einstieg, wenn Solarmodule sichtbar verschmutzt sind oder eine Reinigung grundsätzlich geprüft
              werden soll. Wichtig sind Standort, Dachart, Zugang, Verschmutzung und Fotos.
            </p>
            <Link href="/pv-anlagen-reinigung" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
              Solarreinigung ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-950">PV-Anlagen-Reinigung</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
              Der konkretere Anlagen-/Modul-Fokus: Modulfläche, Reihen, Dachzugang, Wasser, Sicherheitslage und
              vorhandenes PV-Reinigungsangebot werden genauer eingeordnet.
            </p>
            <Link href="/pv-anlagen-reinigung" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
              PV-Anlagen-Reinigung ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
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
    items.push({ name: "Leistungen", item: "/leistungen" });
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
  const areaServed = [
    config.cityLabel,
    config.region === "duesseldorf" ? "Düsseldorf" : "",
    config.region === "regensburg" || config.region === "bayern" ? "Regensburg" : "",
    config.region === "bayern" ? "Bayern" : "",
  ].filter(Boolean);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
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
  const showSolarPvAuthority = isSolarPvPage(config);
  const relatedSpecialKind = getRelatedSpecialKind(config);
  const localBridgeTargets = getLocalBridgeTargets(config);
  const bookingUrl = new URL(config.bookingHref, company.url);
  const bookingTrackingService = bookingUrl.searchParams.get("service") || config.slug;
  const bookingTrackingCity =
    bookingUrl.searchParams.get("city") ||
    (config.region === "regensburg" || config.region === "duesseldorf" ? config.region : "");
  const bookingTrackingIntent = bookingUrl.searchParams.get("intent") || config.slug;
  const bookingTrackingPriority = config.kind === "signature" ? "p0" : "p1";
  const requestBriefServiceKey = showSolarPvAuthority ? "solar-pv" : config.slug;

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
                data-event="request_cta_click"
                data-service={bookingTrackingService}
                data-city={bookingTrackingCity || undefined}
                data-cta-label={config.primaryCta}
                data-destination={config.bookingHref}
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

      {showSolarPvAuthority ? <SolarPvAuthorityPanel config={config} /> : null}

      {showSolarPvAuthority ? <SolarPvDifferentiation /> : null}

      <RequestChecklistBlock
        serviceKey={requestBriefServiceKey}
        ctaHref={config.bookingHref}
        ctaLabel="Anfragebrief mit Eckdaten starten"
        compact
      />

      <PhotoGuidanceBlock serviceKey={requestBriefServiceKey} compact />

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
                Besondere Leistung
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Klarer Nutzen statt leerem Sondernamen.
              </h2>
              <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
                Dieser FLOXANT-Service ist ein Anfrageweg mit konkreten Angaben für Fälle, die vor einem
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
        title="Was wir für Sie übernehmen."
        intro="Wir stimmen die gewünschten Aufgaben mit Ihnen ab. Das Angebot benennt den Umfang, mögliche Ergänzungen und den Termin."
        proofs={config.included}
        boundaries={config.boundaries}
      />



      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Ablauf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              So läuft Ihr Auftrag ab.
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
        regionLabel="Einsatzgebiet"
        title={config.cityLabel}
        intro="Unsere Standorte sind Düsseldorf und Regensburg, jeweils mit 75 km lokalem Einsatzgebiet als Luftlinie. Konkrete Anfahrt und weitere Umzugsstrecken werden im Angebot vereinbart."
        signals={config.localSignals}
      />

      <RelatedSpecialServices
        kind={relatedSpecialKind}
        title={`Welche Spezialservices zu ${config.serviceName} passen.`}
        intro="Nicht jede Anfrage bleibt bei einer einzelnen Leistung. Diese verwandten Wege helfen, Angebot, Zugang, Termin, Fotos und Zielzustand richtig zu verbinden."
        limit={4}
      />

      <SignatureServicesGrid
        title="Passende zusätzliche Unterstützung prüfen."
        intro="Wenn Angebot, Objekt, Übergabe, Plan B oder Rückfahrt Teil des Falls sind, führen diese Startpunkte zu einer klareren Anfrage."
        limit={4}
      />

      <LocalServiceBridge
        serviceLabel={config.serviceName}
        duesseldorfHref={localBridgeTargets.duesseldorfHref}
        regensburgHref={localBridgeTargets.regensburgHref}
      />

      <OfferCheckCTA
        title="Vorhandenes Angebot zu diesem Service prüfen?"
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
            Schreiben Sie kurz, welche Unterstützung Sie brauchen. Wir stimmen den Umfang und ein
            persönliches Angebot mit Ihnen ab. Fotos sind freiwillig.
          </p>
          <Link
            href={config.bookingHref}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950"
            data-event="request_cta_click"
            data-service={bookingTrackingService}
            data-city={bookingTrackingCity || undefined}
            data-cta-label={config.primaryCta}
            data-destination={config.bookingHref}
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
