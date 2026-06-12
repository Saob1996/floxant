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
import { ServicePageCustomerSections } from "@/components/ServicePageCustomerSections";
import {
  floxantCategoryLabels,
  getServicesByRegionAndCategory,
  type FloxantServiceCategory,
} from "@/lib/floxant-services";
import type { RegensburgServicePageConfig } from "@/lib/regensburg-service-pages";
import { buildWhatsAppHref } from "@/lib/whatsapp";
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

export function RegensburgServicePage({ config }: RegensburgServicePageProps) {
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, config.whatsappMessage);
  const serviceVisual = getServiceVisual({
    region: "regensburg",
    slug: config.slug,
    path: config.path,
    serviceLabel: config.serviceType,
  });
  const bookingHref = `/buchung?region=regensburg&service=${encodeURIComponent(config.slug)}#buchungssystem`;
  const category: FloxantServiceCategory =
    config.slug === "umzug" ||
    config.slug === "entruempelung" ||
    config.slug === "haushaltsaufloesung" ||
    config.slug === "uebergabereinigung" ||
    config.slug === "endreinigung"
      ? "normal"
      : config.slug === "besenreine-uebergabe"
        ? "special"
        : "signature";
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
                data-event="hero_cta_click"
                data-region="regensburg"
                data-service={config.slug}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/25 transition hover:bg-cyan-50"
              >
                {config.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-region="regensburg"
                data-service={config.slug}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Fotos per WhatsApp senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="phone_click"
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
            <div className="mt-6 grid gap-3">
              <Link
                href={bookingHref}
                data-event="hero_cta_click"
                data-region="regensburg"
                data-service={config.slug}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
              >
                Anfrageformular öffnen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-region="regensburg"
                data-service={config.slug}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp mit Fotos
              </a>
            </div>
          </aside>
        </div>
      </section>

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
            offerCheckHref="/anbieter-vergleichen"
          />
        </div>
      </section>

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
              Diese Seite bezieht sich auf Regensburg und Umgebung. Es geht um Umzug,
              Entrümpelung, Haushaltsauflösung, Endreinigung oder Übergabevorbereitung.
              Düsseldorfer Gewerbereinigung bleibt getrennt im eigenen Bereich.
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
