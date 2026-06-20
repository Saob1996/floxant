import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  Languages,
  MapPin,
  MessageCircle,
  Route,
  ShieldCheck,
} from "lucide-react";

import { company, duesseldorfCompany } from "@/lib/company";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { germanizeDeep } from "@/lib/german-text";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import type { LocalSeoPageConfig } from "@/lib/local-seo/types";

type LocalSeoPageProps = {
  page: LocalSeoPageConfig;
};

function getProvider(page: LocalSeoPageConfig) {
  if (page.region === "duesseldorf") {
    return {
      name: duesseldorfCompany.name,
      phone: duesseldorfCompany.phone,
      phoneRaw: duesseldorfCompany.phoneRaw,
      email: duesseldorfCompany.email,
      streetAddress: duesseldorfCompany.streetAddress,
      postalCode: duesseldorfCompany.postalCode,
      city: duesseldorfCompany.city,
      state: "Nordrhein-Westfalen",
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
    state: company.state,
    countryCode: company.countryCode,
    url: `${company.url}/regensburg`,
  };
}

function getLocalizedCopy(page: LocalSeoPageConfig) {
  if (page.locale === "en") {
    return {
      localChecked: "Locally checked",
      whatsappWithPhotos: "WhatsApp with photos",
      localCheckLabel: "Local check",
      firstFeedbackTitle: "What matters for the first reply",
      firstFeedbackItems: ["city/district", "photos", "timing", "scope", "existing quote"],
      localEntryLabel: "Local context",
      localEntryHeading: `${page.city.displayName} without false local claims`,
      scopeHeading: "Service scope and customer value",
      scopeText:
        "This page focuses on concrete services, local context, typical customer situations and the right next step: direct request, WhatsApp with photos or a clear quote review.",
      processLabel: "Process",
      processHeading: "First facts, then a clear next step.",
      offerCheckLabel: "Quote review",
      offerCheckButton: "Review quote",
      linksLabel: "Internal links",
      linksHeading: "Relevant nearby pages, not a link wall.",
      linksText:
        "Only pages that match this search intent are linked: region, main service, nearby services, quote review and contact options.",
      openLabel: "Open",
      faqLabel: "FAQ",
      faqHeading: `Common questions about ${page.serviceName} in ${page.city.displayName}`,
      nextStepLabel: "Next step",
      nextStepText:
        "Send city, photos, timing and, if available, an existing quote. FLOXANT checks the request clearly and without invented local promises.",
      languageSwitchLabel: "Deutsch",
      whatsappShort: "WhatsApp",
    } as const;
  }

  return {
    localChecked: "Lokal geprüft",
    whatsappWithPhotos: "WhatsApp mit Fotos",
    localCheckLabel: "Lokale Prüfung",
    firstFeedbackTitle: "Was für die erste Rückmeldung zählt",
    firstFeedbackItems: ["Ort/PLZ", "Fotos", "Termin", "Umfang", "vorhandenes Angebot"],
    localEntryLabel: "Lokaler Einstieg",
    localEntryHeading: `${page.city.displayName} ohne falsche Standortbehauptung einordnen`,
    scopeHeading: "Leistungsumfang und Kundennutzen",
    scopeText:
      "Hier geht es um konkrete Leistungen, lokale Einordnung, typische Kundensituationen und den passenden nächsten Schritt: direkte Anfrage, WhatsApp mit Fotos oder sachliche Angebotsprüfung.",
    processLabel: "Ablauf",
    processHeading: "Erst Eckdaten, dann Entscheidung.",
    offerCheckLabel: "Angebotsprüfung",
    offerCheckButton: "Angebot prüfen",
    linksLabel: "Interne Linkstruktur",
    linksHeading: "Passende Nachbarseiten statt Linkfarm.",
    linksText:
      "Verlinkt werden nur Seiten, die für die aktuelle Suchintention sinnvoll sind: Region, Hauptleistung, Nachbarorte, Angebotsprüfung und Kontaktweg.",
    openLabel: "Öffnen",
    faqLabel: "FAQ",
    faqHeading: `Häufige Fragen zu ${page.serviceName} in ${page.city.displayName}`,
    nextStepLabel: "Nächster Schritt",
    nextStepText:
      "Senden Sie Ort, Fotos, Termin und bei Bedarf ein vorhandenes Angebot. FLOXANT prüft die Anfrage sachlich und ohne erfundene lokale Versprechen.",
    languageSwitchLabel: "English",
    whatsappShort: "WhatsApp",
  } as const;
}

function JsonLd({ page, whatsappHref }: { page: LocalSeoPageConfig; whatsappHref: string }) {
  const canonical = `${company.url}${page.path}`;
  const provider = getProvider(page);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: page.h1,
        description: page.metaDescription,
        path: page.path,
        about: [
          page.serviceType,
          page.city.displayName,
          ...page.serviceFocus.slice(0, 6),
          ...page.specialCases.slice(0, 4),
        ],
        potentialActions: [
          { name: page.primaryCta.label, target: page.primaryCta.href, type: "ContactAction" },
          { name: "WhatsApp mit Fotos senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${provider.url}#localbusiness`,
        name: provider.name,
        url: provider.url,
        telephone: provider.phoneRaw,
        email: provider.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: provider.streetAddress,
          postalCode: provider.postalCode,
          addressLocality: provider.city,
          addressRegion: provider.state,
          addressCountry: provider.countryCode,
        },
        areaServed: [
          {
            "@type": "City",
            name: page.city.displayName,
          },
          ...page.nearbyCities.slice(0, 5).map((city) => ({
            "@type": "City",
            name: city,
          })),
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: page.serviceType,
        serviceType: page.serviceName,
        description: page.metaDescription,
        provider: { "@id": `${provider.url}#localbusiness` },
        url: canonical,
        areaServed: [page.city.displayName, ...page.nearbyCities.slice(0, 4)].map((city) => ({
          "@type": "City",
          name: city,
        })),
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: canonical,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: provider.phoneRaw,
          },
          availableLanguage: ["de", "en"],
        },
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: page.region === "duesseldorf" ? "Düsseldorf" : "Regensburg", item: `/${page.region}` },
        { name: page.city.displayName, item: page.city.parentHub },
        { name: page.serviceName, item: page.path },
      ]),
      buildFaqJsonLd(page.faq),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

export function LocalSeoPage({ page: rawPage }: LocalSeoPageProps) {
  const page = germanizeDeep(rawPage);
  const provider = getProvider(page);
  const whatsappHref = buildWhatsAppHref(provider.phoneRaw, page.whatsappMessage);
  const copy = getLocalizedCopy(page);
  const languageAlternate = page.languageAlternates.find((alternate) =>
    page.locale === "en" ? alternate.hreflang === "de-DE" : alternate.hreflang === "en",
  );

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd page={page} whatsappHref={whatsappHref} />

      <section className="relative isolate bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(8,47,73,0.72),rgba(2,6,23,0.96)_52%,rgba(20,83,45,0.42))]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {page.eyebrow}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-200/20 bg-emerald-300/12 px-3 py-2 text-sm font-black text-emerald-100">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {copy.localChecked}
              </span>
              {languageAlternate ? (
                <Link
                  href={languageAlternate.path}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-black text-white transition hover:bg-white/15"
                >
                  <Languages className="h-4 w-4" aria-hidden="true" />
                  {copy.languageSwitchLabel}
                </Link>
              ) : null}
            </div>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-100">
              {page.heroText}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={page.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                data-event="seo_cta_click"
                data-service={page.serviceKey}
                data-city={page.city.slug}
                data-page-intent={page.serviceName}
                data-region={page.region}
                data-cta-label={page.primaryCta.label}
              >
                {page.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                data-event="seo_cta_click"
                data-service={page.serviceKey}
                data-city={page.city.slug}
                data-page-intent={page.serviceName}
                data-contact-channel="whatsapp"
                data-region={page.region}
                data-cta-label={copy.whatsappWithPhotos}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {copy.whatsappWithPhotos}
              </a>
              <Link
                href={page.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
                data-event="seo_cta_click"
                data-service={page.serviceKey}
                data-city={page.city.slug}
                data-page-intent="angebot-pruefen"
                data-contact-channel="offer_check"
                data-region={page.region}
                data-cta-label={page.secondaryCta.label}
              >
                {page.secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/20">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              {copy.localCheckLabel}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">
              {copy.firstFeedbackTitle}
            </h2>
            <div className="mt-5 grid gap-3">
              {copy.firstFeedbackItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              {copy.localEntryLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              {copy.localEntryHeading}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {page.localIntro}
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-3">
            {page.localProofNotes.map((note) => (
              <div key={note} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-700">
                <ShieldCheck className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-normal">
              {copy.scopeHeading}
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">
              {copy.scopeText}
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {[...page.serviceFocus, ...page.customerTypes].slice(0, 10).map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {page.sections.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black tracking-normal text-slate-950">
                {item.title}
              </h2>
              <div className="mt-4 space-y-4">
                {item.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm font-semibold leading-7 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              {copy.processLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              {copy.processHeading}
            </h2>
          </article>
          <div className="grid gap-4 md:grid-cols-2">
            {page.process.map((step, index) => (
              <article key={step} className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-700 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              {copy.offerCheckLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              {page.offerCheck.title}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-200">
              {page.offerCheck.body}
            </p>
            <Link
              href={page.secondaryCta.href}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950"
              data-event="seo_cta_click"
              data-service={page.serviceKey}
              data-city={page.city.slug}
              data-page-intent="angebot-pruefen"
            >
              {copy.offerCheckButton}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {page.specialCases.map((item) => (
              <div key={item} className="rounded-lg border border-white/12 bg-white/[0.06] p-4 text-sm font-semibold leading-7 text-slate-200">
                <Route className="mb-3 h-5 w-5 text-cyan-200" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              {copy.linksLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              {copy.linksHeading}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {copy.linksText}
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {page.internalLinks.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
              >
                <h3 className="text-base font-black text-slate-950">{item.label}</h3>
                {item.text ? <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p> : null}
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  {copy.openLabel}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <article>
            <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              {copy.faqLabel}
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              {copy.faqHeading}
            </h2>
          </article>
          <div className="grid gap-3">
            {page.faq.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white px-5 py-4">
                <summary className="cursor-pointer text-base font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              {copy.nextStepLabel}
            </p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
              {copy.nextStepText}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link
              href={page.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white"
              data-event="seo_cta_click"
              data-service={page.serviceKey}
              data-city={page.city.slug}
              data-page-intent={page.serviceName}
            >
              {page.primaryCta.label}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-black text-slate-950"
              data-event="seo_cta_click"
              data-service={page.serviceKey}
              data-city={page.city.slug}
              data-page-intent={page.serviceName}
              data-contact-channel="whatsapp"
            >
              {copy.whatsappShort}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
