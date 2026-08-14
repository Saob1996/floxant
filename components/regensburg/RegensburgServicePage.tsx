import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { SeoLeadForm } from "@/components/SeoLeadForm";
import { company } from "@/lib/company";
import { buildLeadHref, resolveLeadIntent } from "@/lib/lead-intents";
import { buildRegensburgCleaningAreaServedJsonLd } from "@/lib/regensburg-cleaning-service-area";
import type { RegensburgServicePageConfig } from "@/lib/regensburg-service-pages";
import { getServiceVisual } from "@/lib/service-visuals";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type RegensburgServicePageProps = {
  config: RegensburgServicePageConfig;
};

type ServiceAngle = {
  eyebrow: string;
  title: string;
  intro: string;
  points: readonly string[];
  suitableTitle: string;
};

function customerText(value: string) {
  return value
    .replace(/Blindpreise?/giu, "Pauschalpreise ohne ausreichende Angaben")
    .replace(/Spezialfällen?/giu, "besonderen Situationen")
    .replace(/Spezialfälle/giu, "besondere Situationen");
}

function customerConfig(config: RegensburgServicePageConfig): RegensburgServicePageConfig {
  return {
    ...config,
    title: customerText(config.title),
    metaTitle: customerText(config.metaTitle),
    metaDescription: customerText(config.metaDescription),
    eyebrow: customerText(config.eyebrow),
    description: customerText(config.description),
    primaryCta: customerText(config.primaryCta),
    whatsappMessage: customerText(config.whatsappMessage),
    serviceType: customerText(config.serviceType),
    suitableFor: config.suitableFor.map(customerText),
    scope: config.scope.map(customerText),
    process: config.process.map(customerText),
    trust: config.trust.map(customerText),
    faq: config.faq.map((item) => ({ q: customerText(item.q), a: customerText(item.a) })),
    related: config.related.map((item) => ({ ...item, label: customerText(item.label) })),
  };
}

function isRegensburgCleaningServiceSlug(slug: string) {
  return (
    slug.includes("reinigung") ||
    ["bueroreinigung", "reinigungsfirma", "besenreine-uebergabe"].includes(slug)
  );
}

function getServiceAngle(config: RegensburgServicePageConfig): ServiceAngle {
  if (config.slug === "entruempelung") {
    return {
      eyebrow: "Gezielte Räumung",
      title: "Entfernen, was in klar benannten Räumen nicht bleiben soll.",
      intro:
        "Bei einer Entrümpelung stehen Menge, Material und Zugang im Mittelpunkt. Sie legen fest, welche Gegenstände entfernt werden und wie die Räume danach aussehen sollen.",
      points: [
        "Wohnung, Keller, Dachboden oder Garage einzeln benennen",
        "Gegenstände und Materialien auf Fotos sichtbar machen",
        "Festhalten, was bleibt und was entfernt werden soll",
        "Gewünschten Zustand nach der Räumung beschreiben",
      ],
      suitableTitle: "Passend für einzelne Räume und klar begrenzte Mengen",
    };
  }

  if (config.slug === "wohnungsaufloesung") {
    return {
      eyebrow: "Geordnete Auflösung",
      title: "Eine ganze Wohnung mit Freigaben und persönlichen Dingen klären.",
      intro:
        "Bei Nachlass, Auszug oder Pflegeheimwechsel geht es um mehr als das Entfernen von Gegenständen. Ansprechpartner, Berechtigung, Erinnerungsstücke und die spätere Übergabe werden vor Beginn abgestimmt.",
      points: [
        "Berechtigte Kontaktperson und Freigaben festlegen",
        "Persönliche Unterlagen und Gegenstände kennzeichnen",
        "Wohnung, Keller und Nebenräume gemeinsam erfassen",
        "Räumung, Reinigung und Schlüsselübergabe getrennt planen",
      ],
      suitableTitle: "Passend für Nachlass, Auszug und vollständige Wohnungsübergabe",
    };
  }

  if (config.slug === "haushaltsaufloesung") {
    return {
      eyebrow: "Haushalt geordnet klären",
      title: "Hausrat, Freigaben und gewünschtes Ergebnis gemeinsam festlegen.",
      intro:
        "Eine Haushaltsauflösung braucht eine ruhige Abstimmung zu Räumen, Hausrat, berechtigten Personen und dem Zustand nach Abschluss der Arbeiten.",
      points: config.scope.slice(0, 4),
      suitableTitle: `Passend für ${config.serviceType}`,
    };
  }

  if (config.slug.includes("umzug")) {
    return {
      eyebrow: "Transport gut vorbereiten",
      title: "Start, Ziel, Möbelumfang und Zugänge zusammen betrachten.",
      intro:
        "Für einen Umzug zählen Strecke und Menge ebenso wie Treppen, Aufzüge, Laufwege und das gewünschte Zeitfenster.",
      points: config.scope.slice(0, 4),
      suitableTitle: `Passend für ${config.serviceType}`,
    };
  }

  if (isRegensburgCleaningServiceSlug(config.slug)) {
    return {
      eyebrow: "Reinigung klar beschreiben",
      title: "Fläche, Räume, Zustand und Zeitfenster vorab festhalten.",
      intro:
        "Eine Reinigungsanfrage wird verständlich, wenn die gewünschten Bereiche, aktuelle Verschmutzung und wiederkehrende oder einmalige Ausführung genannt sind.",
      points: config.scope.slice(0, 4),
      suitableTitle: `Passend für ${config.serviceType}`,
    };
  }

  return {
    eyebrow: "Leistung vorbereiten",
    title: `${config.serviceType} mit den wichtigsten Angaben anfragen.`,
    intro: config.description,
    points: config.scope.slice(0, 4),
    suitableTitle: `Passend für ${config.serviceType}`,
  };
}

function JsonLd({
  config,
  whatsappHref,
}: {
  config: RegensburgServicePageConfig;
  whatsappHref: string;
}) {
  const canonical = `${company.url}${config.path}`;
  const isCleaningServicePage = isRegensburgCleaningServiceSlug(config.slug);
  const localAreaServed = isCleaningServicePage
    ? buildRegensburgCleaningAreaServedJsonLd()
    : ["Regensburg", "Landkreis Regensburg", "Oberpfalz", "Bayern"].map((name) => ({
        "@type": "AdministrativeArea",
        name,
      }));
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: config.title,
        description: config.metaDescription,
        path: config.path,
        about: [config.serviceType, "FLOXANT Regensburg"],
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
        areaServed: localAreaServed,
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: config.serviceType,
        serviceType: config.serviceType,
        provider: { "@id": `${company.url}/regensburg#localbusiness` },
        areaServed: isCleaningServicePage ? localAreaServed : "Regensburg und Umgebung",
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

export function RegensburgServicePage({ config: rawConfig }: RegensburgServicePageProps) {
  const config = customerConfig(rawConfig);
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
          path: config.path,
          service: config.slug,
          city: "regensburg",
        },
  );
  const bookingHref = buildLeadHref(bookingLead);
  const angle = getServiceAngle(config);

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd config={config} whatsappHref={whatsappHref} />

      <section className="relative isolate bg-slate-950 pt-24 text-white sm:pt-28 lg:pt-32">
        <Image
          src={serviceVisual.src}
          alt={serviceVisual.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.86)_58%,rgba(15,23,42,0.48)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_0.82fr] lg:px-10 lg:pb-20">
          <div>
            <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300">
              <Link href="/" className="hover:text-white">FLOXANT</Link>
              <span>/</span>
              <Link href="/regensburg" className="hover:text-white">Regensburg</Link>
              <span>/</span>
              <span className="text-white">{config.serviceType}</span>
            </nav>
            <p className="mt-7 flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {config.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              {config.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              {config.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bookingHref}
                data-event="cta_click"
                data-region="regensburg"
                data-service={bookingLead.trackingService}
                data-city={bookingLead.trackingCity}
                data-page-intent={bookingLead.trackingIntent}
                data-priority={bookingLead.priority}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                {config.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Fotos per WhatsApp senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="phone_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {company.phone}
              </a>
            </div>
          </div>

          <aside className="self-end rounded-lg border border-white/15 bg-white/[0.08] p-5 backdrop-blur sm:p-6">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Für die erste Rückmeldung
            </p>
            <div className="mt-4 grid gap-3">
              {config.scope.slice(0, 4).map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm font-bold leading-6 text-slate-100">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">{angle.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{angle.title}</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{angle.intro}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {angle.points.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xl font-black text-slate-950">{angle.suitableTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {config.suitableFor.slice(0, 6).map((item) => (
                <span key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Ablauf</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            So wird {config.serviceType} vorbereitet.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {config.process.slice(0, 4).map((step, index) => (
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Klare Absprachen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Was Sie bei {config.serviceType} erwarten können.
            </h2>
            <div className="mt-6 grid gap-3">
              {config.trust.slice(0, 3).map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/12 bg-white/[0.06] p-4 text-sm font-semibold leading-7 text-slate-200">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Weitere Leistungen</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {config.related.slice(0, 5).map((item) => (
                <Link key={item.href} href={item.href} className="group rounded-lg border border-white/12 bg-white/[0.06] p-4 text-sm font-black text-white transition hover:bg-white/[0.1]">
                  <span className="inline-flex items-center gap-2">
                    {item.label}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Antworten zu {config.serviceType}.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Für eine persönliche Einschätzung können Sie Ihre Eckdaten direkt senden.
            </p>
          </div>
          <div className="grid gap-3">
            {config.faq.slice(0, 6).map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="anfrage" className="scroll-mt-28 border-t border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Anfrage</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            {config.primaryCta}
          </h2>
          {config.slug === "angebot-vergleichen-regensburg" ? (
            <div className="mt-8">
              <SeoLeadForm
                initialIntent={bookingLead}
                sourcePage={config.path}
                initialOfferStatus="written_offer"
              />
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bookingHref}
                data-event="cta_click"
                data-region="regensburg"
                data-service={bookingLead.trackingService}
                data-city={bookingLead.trackingCity}
                data-page-intent={bookingLead.trackingIntent}
                data-priority={bookingLead.priority}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800"
              >
                Anfrageformular öffnen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-100 px-6 text-sm font-black text-emerald-900 transition hover:bg-emerald-200"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Fotos per WhatsApp senden
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
