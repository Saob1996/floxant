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
import type { RegensburgServicePageConfig } from "@/lib/regensburg-service-pages";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const heroImages: Record<string, string> = {
  umzug: "/assets/service-moving.png",
  entruempelung: "/assets/service-clearance.png",
  haushaltsaufloesung: "/assets/service-clearance.png",
  uebergabereinigung: "/assets/service-cleaning.png",
  endreinigung: "/assets/service-cleaning.png",
  "umzug-reinigung": "/assets/service-moving.png",
  "besenreine-uebergabe": "/assets/service-cleaning.png",
};

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

export function RegensburgServicePage({ config }: RegensburgServicePageProps) {
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, config.whatsappMessage);
  const heroImage = heroImages[config.slug] || "/assets/service-cleaning.png";
  const bookingHref = `/buchung?region=regensburg&service=${encodeURIComponent(config.slug)}#buchungssystem`;

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd config={config} whatsappHref={whatsappHref} />

      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          src={heroImage}
          alt={config.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.82)_52%,rgba(15,23,42,0.42)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {config.eyebrow}
            </p>
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
                data-event="form_submit"
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

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Geeignet für
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Regensburg-Seite mit klarem lokalen Schwerpunkt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Diese Seite bezieht sich auf Regensburg und Umgebung. Es geht um Umzug,
              Entrümpelung, Haushaltsauflösung, Endreinigung oder Übergabevorbereitung.
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
    </main>
  );
}
