import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Briefcase,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  KeyRound,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Network,
  PhoneCall,
  PlaneTakeoff,
  Radio,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { company } from "@/lib/company";
import type {
  PropertyOperationsPage,
  PropertyOperationsSlug,
} from "@/lib/property-operations-pages";
import { getPropertyOperationsPage } from "@/lib/property-operations-pages";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const serviceIcons: Record<PropertyOperationsSlug, typeof Radio> = {
  "objekt-springer": Radio,
  urlaubsretter: PlaneTakeoff,
  "airbnb-turnover-express": BedDouble,
  leerstandsmanagement: KeyRound,
  "business-errand-service": Briefcase,
  "human-api": Smartphone,
  "property-operations": Building2,
};

function buildWhatsAppHref(page: PropertyOperationsPage) {
  const message = `Hallo FLOXANT, ich interessiere mich fuer ${page.serviceName}. Ort, Aufgabe und Zeitfenster:`;
  return `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

function buildBookingHref(page: PropertyOperationsPage) {
  return `/buchung?utm_source=${page.slug}&utm_medium=premium_landingpage&service=${page.slug}#buchungssystem`;
}

function buildLocalBusinessJsonLd(page: PropertyOperationsPage) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${company.url}/#localbusiness`,
    name: company.name,
    url: company.url,
    image: `${company.url}${page.image.src}`,
    email: company.email,
    telephone: company.phoneRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: company.city,
      postalCode: company.postalCode,
      addressRegion: company.state,
      addressCountry: company.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: "Regensburg" },
      { "@type": "AdministrativeArea", name: "Oberpfalz" },
      { "@type": "State", name: "Bayern" },
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${company.url}${page.path}#service`,
        name: page.serviceName,
      },
    },
  };
}

function buildJsonLd(page: PropertyOperationsPage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Immobilienbetreuung", item: "/property-operations" },
        { name: page.serviceName, item: page.path },
      ]),
      buildServiceJsonLd({
        name: page.serviceName,
        description: page.metaDescription,
        path: page.path,
        serviceType: page.serviceName,
        areaServed: ["Regensburg", "Oberpfalz", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: page.seoTitle,
        description: page.metaDescription,
        path: page.path,
        about: [
          page.serviceName,
          "Immobilienbetreuung",
          "Regensburg",
          "Oberpfalz",
          "Bayern",
          "Hilfe vor Ort",
        ],
        potentialActions: [
          { type: "ContactAction", name: "WhatsApp Anfrage senden", target: buildWhatsAppHref(page) },
          { type: "ContactAction", name: "Telefonisch anfragen", target: "/kontakt" },
          { name: "Buchung starten", target: buildBookingHref(page) },
        ],
      }),
      buildFaqJsonLd(page.faq),
      buildLocalBusinessJsonLd(page),
    ],
  };
}

function RelatedLink({ slug }: { slug: PropertyOperationsSlug }) {
  const item = getPropertyOperationsPage(slug);
  const Icon = serviceIcons[slug];

  return (
    <Link
      href={item.path}
      className="group block rounded-lg border border-white/10 bg-white/[0.045] p-5 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-300"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/10 text-white">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="h-4 w-4 text-white/55 transition group-hover:translate-x-1 group-hover:text-white" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[0] text-white">{item.shortName}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{item.hero.promise}</p>
    </Link>
  );
}

export function PropertyOperationsLandingPage({ page }: { page: PropertyOperationsPage }) {
  const Icon = serviceIcons[page.slug];
  const jsonLd = buildJsonLd(page);
  const whatsappHref = buildWhatsAppHref(page);
  const bookingHref = buildBookingHref(page);

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[88svh] overflow-hidden">
        <Image
          src={page.image.src}
          alt={page.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.96)_0%,rgba(5,7,10,0.82)_42%,rgba(5,7,10,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.20)_0%,rgba(5,7,10,0.50)_72%,#05070a_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 sm:px-7 lg:px-8">
          <div className="animate-hero-fade max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-md">
              <Icon className="h-4 w-4" />
              {page.hero.eyebrow}
            </div>
            <h1 className="mt-7 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[0] text-white sm:text-5xl lg:text-7xl">
              {page.hero.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
              {page.hero.subheadline}
            </p>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white">
              {page.hero.promise}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Anfrage starten
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-300/40 bg-emerald-400/12 px-5 py-3 text-sm font-bold text-emerald-50 transition hover:-translate-y-0.5 hover:bg-emerald-400/18 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/18 bg-white/8 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <PhoneCall className="h-4 w-4" />
                Direkt anrufen
              </a>
            </div>
          </div>

          <div className="animate-hero-slide mt-10 grid gap-3 sm:grid-cols-3">
            {page.hero.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                  {metric.label}
                </div>
                <div className="mt-2 text-base font-semibold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <MapPin className="h-4 w-4" />
              Regensburg, Oberpfalz und Bayern
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
              {page.problem.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{page.problem.intro}</p>
          </div>
          <div className="grid gap-3">
            {page.problem.worries.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" style={{ color: page.accent }} />
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Typische Stressmomente
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
              Der Druck entsteht, bevor die Aufgabe groß aussieht.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {page.stress.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-[#0a1018] p-6">
                <ShieldCheck className="h-6 w-6" style={{ color: page.accent }} />
                <h3 className="mt-5 text-xl font-semibold tracking-[0] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
              <Sparkles className="h-4 w-4" />
              FLOXANT-Lösung
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
              {page.solution.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{page.solution.intro}</p>
          </div>
          <div className="grid gap-4">
            {page.solution.points.map((item) => (
              <article key={item.title} className="premium-scan rounded-lg border border-white/10 bg-white/[0.045] p-6">
                <h3 className="text-xl font-semibold tracking-[0] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080b10] px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Ablauf
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
                Erst Klarheit. Dann Einsatz.
              </h2>
            </div>
            <div className="grid gap-3">
              {page.workflow.map((step) => (
                <article key={step.label} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[4.5rem_1fr]">
                  <div className="font-mono text-2xl font-semibold" style={{ color: page.accent }}>
                    {step.label}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[0] text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Vorteile
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
              Nicht einfach mehr Dienstleistung. Weniger offener Kopf.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {page.benefits.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
                <FileCheck2 className="h-6 w-6" style={{ color: page.accent }} />
                <h3 className="mt-5 text-lg font-semibold tracking-[0] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <LockKeyhole className="h-4 w-4" />
              Service-Grenzen und Vertrauen
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
              Gute Hilfe heißt auch: keine falschen Versprechen.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Jeder Einsatz braucht klare Berechtigung, Zugang, Aufgabe und Grenze.
              Wenn etwas nicht sauber machbar ist, sagen wir das vor der Zusage.
            </p>
          </div>
          <div className="grid gap-3">
            {page.guarantees.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-[#0a1018] p-4">
                <ClipboardCheck className="mt-1 h-5 w-5 shrink-0" style={{ color: page.accent }} />
                <p className="text-sm leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              FAQ
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
              Fragen, die vor der Anfrage wichtig sind.
            </h2>
          </div>
          <div className="grid gap-3">
            {page.faq.map((item) => (
              <details key={item.q} className="group rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold tracking-[0] text-white">
                  <span className="inline-flex w-full items-start justify-between gap-5">
                    {item.q}
                    <span className="mt-1 text-xl leading-none text-slate-400 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080b10] px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Passende weitere Hilfe
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
                Passende Module, wenn der Fall größer wird.
              </h2>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/reinigung" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                  Reinigung
                </Link>
                <Link href="/umzug" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                  Umzug
                </Link>
                <Link href="/entruempelung" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                  Entrümpelung
                </Link>
                <Link href="/blog" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                  Ratgeber
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {page.related.map((slug) => (
                <RelatedLink key={slug} slug={slug} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-7 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <Camera className="h-4 w-4" />
              Ratgeber-Themen
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
              Aus diesen Fragen entsteht guter Content.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Diese Themen erklären typische Fragen aus der Praxis, ohne die Seite mit
              langen Listen zu überladen.
            </p>
          </div>
          <div className="grid gap-3">
            {page.blogIdeas.map((item) => (
              <Link key={item.title} href="/blog" className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.07]">
                <div className="flex gap-3">
                  <Network className="mt-1 h-5 w-5 shrink-0" style={{ color: page.accent }} />
                  <div>
                    <h3 className="text-lg font-semibold tracking-[0] text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.angle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 pb-20 pt-6 sm:px-7 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(56,189,248,0.08)_100%)]" />
        <div className="relative mx-auto max-w-7xl rounded-lg border border-white/12 bg-white/[0.06] p-7 backdrop-blur-md md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100">
                Nächster Schritt
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[0] text-white sm:text-5xl">
                Ein Anruf und das Problem bekommt einen Besitzer.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Senden Sie Ort, Aufgabe, Zeitfenster, Zugang und ein Foto, falls vorhanden. FLOXANT prüft,
                ob der Einsatz realistisch, sicher und sauber ausführbar ist.
              </p>
            </div>
            <div className="grid gap-3">
              <Link
                href={bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Buchung öffnen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-300/40 bg-emerald-400/12 px-5 py-3 text-sm font-bold text-emerald-50 transition hover:-translate-y-0.5 hover:bg-emerald-400/18 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp mit Eckdaten
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/18 bg-white/8 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <PhoneCall className="h-4 w-4" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
