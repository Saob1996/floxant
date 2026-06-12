import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { company, duesseldorfCompany } from "@/lib/company";
import type { LocalServiceSeoPageConfig } from "@/lib/local-service-seo-pages";
import { getServiceVisual } from "@/lib/service-visuals";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type LocalServiceSeoPageProps = {
  config: LocalServiceSeoPageConfig;
};

function getContact(config: LocalServiceSeoPageConfig) {
  if (config.cityKey === "duesseldorf") {
    return {
      name: duesseldorfCompany.name,
      phone: duesseldorfCompany.phone,
      phoneRaw: duesseldorfCompany.phoneRaw,
      email: duesseldorfCompany.email,
      streetAddress: duesseldorfCompany.streetAddress,
      postalCode: duesseldorfCompany.postalCode,
      city: duesseldorfCompany.city,
      countryCode: duesseldorfCompany.countryCode,
      url: `${company.url}/duesseldorf`,
    };
  }

  return {
    name: company.name,
    phone: company.phone,
    phoneRaw: company.phoneRaw,
    email: company.email,
    streetAddress: company.streetAddress,
    postalCode: company.postalCode,
    city: company.city,
    countryCode: company.countryCode,
    url: `${company.url}/regensburg`,
  };
}

function JsonLd({ config, whatsappHref }: { config: LocalServiceSeoPageConfig; whatsappHref: string }) {
  const canonical = `${company.url}${config.path}`;
  const contact = getContact(config);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": config.schemaType,
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
        areaServed: [
          {
            "@type": "City",
            name: config.cityName,
          },
        ],
        sameAs: company.sameAs,
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: config.serviceType,
        description: config.metaDescription,
        serviceType: config.serviceType,
        url: canonical,
        provider: { "@id": `${canonical}#localbusiness` },
        areaServed: [config.cityName, ...config.districts.slice(0, 6)].map((name) => ({
          "@type": name === config.cityName ? "City" : "Place",
          name,
        })),
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: canonical,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: contact.phoneRaw,
          },
          availableLanguage: ["de"],
        },
      },
      buildWebPageJsonLd({
        name: config.headline,
        description: config.metaDescription,
        path: config.path,
        about: [config.mainKeyword, ...config.secondaryKeywords.slice(0, 8)],
        potentialActions: [
          { name: config.primaryCta, target: config.bookingHref, type: "ContactAction" },
          { name: "Fotos per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: config.cityName, item: `/${config.cityKey}` },
        { name: config.serviceName, item: config.path },
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

export function LocalServiceSeoPage({ config }: LocalServiceSeoPageProps) {
  const contact = getContact(config);
  const whatsappHref = buildWhatsAppHref(contact.phoneRaw, config.whatsappMessage);
  const visual = getServiceVisual({
    region: config.cityKey,
    slug: config.key,
    path: config.path,
    serviceLabel: config.serviceName,
  });

  return (
    <main className="overflow-hidden bg-white pb-24 text-slate-950 md:pb-0">
      <JsonLd config={config} whatsappHref={whatsappHref} />

      <section className="relative isolate overflow-hidden bg-slate-950 pt-24 text-white sm:pt-28 lg:pt-32">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-72"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.82)_54%,rgba(15,23,42,0.44)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-20">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                FLOXANT {config.cityName}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-200/25 bg-emerald-300/12 px-3 py-2 text-sm font-bold text-emerald-100 backdrop-blur">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Kostenlose erste Prüfung
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              {config.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              {config.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={config.bookingHref}
                data-event="hero_cta_click"
                data-region={config.cityKey}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                {config.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-event="whatsapp_click"
                data-region={config.cityKey}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {config.secondaryCta}
              </a>
              <a
                href={`tel:${contact.phoneRaw}`}
                data-event="phone_click"
                data-region={config.cityKey}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.phone}
              </a>
            </div>
          </div>

          <div className="grid content-end gap-3 lg:pl-8">
            {config.proofItems.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-white/15 bg-slate-950/72 p-4 text-sm font-semibold leading-6 text-slate-100 backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Suchintention
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              {config.problemTitle}
            </h2>
          </article>
          <div className="grid gap-4">
            {config.problemText.map((paragraph) => (
              <p key={paragraph} className="text-base font-semibold leading-8 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-normal text-slate-950">
              {config.scopeTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Jede Anfrage wird nach Service, Stadtteil, Umfang, Zugang, Zeitfenster und Zielzustand
              eingeordnet. So bleibt der Leistungsumfang konkret und vergleichbar.
            </p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.scopeItems.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-700">
                <CheckCircle2 className="mb-3 h-5 w-5 text-blue-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Ablauf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Von Anfrage bis Durchführung
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {config.process.map((step, index) => (
              <article key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-700 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold leading-7 text-slate-200">
              Senden Sie jetzt Ort, Termin, Fotos und die wichtigsten Eckdaten. FLOXANT prüft
              den nächsten Schritt ohne Preis- oder Sofortgarantie.
            </p>
            <Link
              href={config.bookingHref}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950"
              data-event="hero_cta_click"
              data-region={config.cityKey}
            >
              Angebot prüfen lassen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <Banknote className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-normal text-slate-950">
              Kostenfaktoren statt Blindpreis
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              FLOXANT nennt keine ausgedachten Festpreise. Ein realistischer Preisrahmen entsteht erst,
              wenn Umfang, Zugang, Zustand und Zusatzleistungen sichtbar sind.
            </p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.costFactors.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Lokal
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              {config.localTitle}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {config.localText}
            </p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.districts.map((district) => (
              <div key={district} className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700">
                <MapPin className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                {district}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-normal text-slate-950">
              Warum FLOXANT für diese Anfrage passt
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Der Nutzen liegt in der strukturierten Anfrage: klarer Kontaktweg, prüfbare Fotos,
              realistische Einschätzung und kombinierte Leistungen ohne leere Versprechen.
            </p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.trustItems.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-700">
                <ShieldCheck className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Passende Wege
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Passende Leistungen in {config.cityName}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {config.relatedLinks.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="group min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
                data-event="service_card_click"
                data-region={config.cityKey}
              >
                <h3 className="text-base font-black text-slate-950">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  Seite öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Häufige Fragen zu {config.serviceName} in {config.cityName}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Kurz beantwortet, damit Sie vor der Anfrage wissen, welche Angaben wirklich zählen.
            </p>
          </article>
          <div className="grid gap-3">
            {config.faq.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="rounded-lg border border-slate-200 bg-white px-5 py-4"
              >
                <summary className="cursor-pointer text-sm font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 rounded-lg border border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-normal text-cyan-200">
              Nächster Schritt
            </div>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-200">
              Ort, Fotos, Termin, Budget oder vorhandenes Angebot senden. FLOXANT prüft die Anfrage
              für {config.cityName} sachlich und ohne erfundene Zusagen.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link
              href={config.bookingHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950"
              data-event="hero_cta_click"
              data-region={config.cityKey}
            >
              {config.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-black text-slate-950"
              data-event="whatsapp_click"
              data-region={config.cityKey}
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              Fotos senden
            </a>
          </div>
        </div>
      </section>

      {config.cityKey === "regensburg" ? (
        <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
          <Link
            href={config.bookingHref}
            className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-950/25"
            data-event="mobile_sticky_cta_click"
            data-region={config.cityKey}
          >
            {config.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </main>
  );
}
