import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  KeyRound,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import {
  getPsychologicalCleaningPage,
  getPsychologicalCleaningRelatedPages,
  psychologicalCleaningLandingPages,
  type PsychologicalCleaningLandingPage,
  type PsychologicalCleaningLandingSlug,
} from "@/lib/psychological-cleaning-pages";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export function generatePsychologicalCleaningLandingMetadata(
  slug: PsychologicalCleaningLandingSlug,
): Metadata {
  const page = getPsychologicalCleaningPage(slug);

  if (!page) {
    return generatePageSEO({
      lang: "de",
      path: slug,
      title: "FLOXANT Reinigung Regensburg",
      description: "FLOXANT Reinigung, Übergabe und Objektservice in Regensburg und Bayern.",
    });
  }

  return generatePageSEO({
    lang: "de",
    path: page.slug,
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: [...page.searchIntents, page.serviceName, "Reinigung Regensburg", "Oberpfalz", "Bayern"],
  });
}

function whatsappUrl(page: PsychologicalCleaningLandingPage) {
  return `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(page.whatsappText)}`;
}

function bookingUrl(page: PsychologicalCleaningLandingPage) {
  return `/buchung?service=reinigung&intent=${encodeURIComponent(page.slug)}#buchungssystem`;
}

function pageJsonLd(page: PsychologicalCleaningLandingPage) {
  const path = `/${page.slug}`;
  const relatedPages = getPsychologicalCleaningRelatedPages(page);

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Regensburg", item: "/regensburg/reinigung" },
        { name: page.serviceName, item: path },
      ]),
      buildServiceJsonLd({
        name: `${page.serviceName} in Regensburg`,
        description: page.metaDescription,
        path,
        serviceType: page.category,
        areaServed: ["Regensburg", "Oberpfalz", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: page.seoTitle,
        description: page.metaDescription,
        path,
        about: [page.serviceName, page.category, ...page.searchIntents, "Regensburg", "Oberpfalz", "Bayern"],
        potentialActions: [
          { type: "ContactAction", name: "WhatsApp Anfrage", target: whatsappUrl(page) },
          { type: "ContactAction", name: "Telefon Anfrage", target: "/kontakt" },
          { name: "Buchung starten", target: bookingUrl(page) },
        ],
      }),
      buildFaqJsonLd(page.faqItems),
      {
        "@type": "ItemList",
        name: `Interne Empfehlungen zu ${page.serviceName}`,
        itemListElement: relatedPages.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.serviceName,
          url: `${company.url}/${item.slug}`,
          description: item.metaDescription,
        })),
      },
      {
        "@type": "LocalBusiness",
        "@id": `${company.url}/#localbusiness`,
        name: company.name,
        url: company.url,
        telephone: company.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.streetAddress,
          addressLocality: company.city,
          postalCode: company.postalCode,
          addressCountry: company.countryCode,
        },
      },
    ],
  };
}

export function PsychologicalCleaningLandingRoute({
  slug,
}: {
  slug: PsychologicalCleaningLandingSlug;
}) {
  const page = getPsychologicalCleaningPage(slug);

  if (!page) notFound();

  const relatedPages = getPsychologicalCleaningRelatedPages(page);
  const bookingHref = bookingUrl(page);
  const whatsappHref = whatsappUrl(page);

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_46%,#f7fafc_100%)] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(page)) }}
      />

      <section className="px-4 pb-10 pt-8 sm:px-6 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Reinigung", href: "/reinigung" },
              { label: "Reinigung Regensburg", href: "/regensburg/reinigung" },
              { label: page.serviceName },
            ]}
          />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles className="h-4 w-4" />
              {page.category}
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-slate-950 md:text-6xl">
              {page.heroHeadline}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {page.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bookingHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                {page.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp schreiben
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <Phone className="h-4 w-4" />
                Direkt anrufen
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Gefühl", text: "Druck rausnehmen und wieder handlungsfähig werden" },
                { label: "Region", text: "Regensburg, Oberpfalz, Bayern" },
                { label: "Kontakt", text: "WhatsApp, Telefon, Buchung" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="relative h-56 sm:h-72 lg:h-80">
              <Image
                src="/assets/service-cleaning.png"
                alt={`${page.serviceName} mit FLOXANT Reinigung in Regensburg`}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                <ShieldCheck className="h-4 w-4" />
                Endlich wird der Fall sortiert
              </div>
              <p className="mt-5 text-xl font-semibold leading-8 text-white">
                {page.emotionalPromise}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{page.localNote}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Problem
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              {page.problemTitle}
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <ProblemColumn title="Typische Sorgen" items={page.worries} />
            <ProblemColumn title="Typische Konflikte" items={page.conflicts} />
            <ProblemColumn title="Stresssituationen" items={page.stressSituations} />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              FLOXANT-Lösung
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Wir machen aus Druck einen Ablauf.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{page.solutionIntro}</p>
            <div className="mt-6 grid gap-3">
              {page.whyItWorks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
                  <p className="text-sm leading-6 text-emerald-950">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.solutionSteps.map((step, index) => (
              <article key={step.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  Schritt {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Warum FLOXANT
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Vertrauen entsteht durch Struktur, nicht durch laute Versprechen.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Die Anfrage beginnt beim echten Problem: Räume, Zustand, Fotos,
                Zeitdruck und gewünschtes Ergebnis. Danach wird entschieden, welche
                Reinigung oder Vorbereitung wirklich passt.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {page.trustSignals.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <Star className="mb-3 h-5 w-5 text-amber-500" />
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
              {page.guarantees.map((item) => (
                <div key={item} className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <ClipboardCheck className="mb-3 h-5 w-5 text-blue-700" />
                  <p className="text-sm leading-7 text-slate-700">Klare Grenze: {item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Ablauf
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                So wird aus Unsicherheit ein sauberer Auftrag.
              </h2>
            </div>
            <Link href={bookingHref} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">
              Buchung starten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {page.processSteps.map((step) => (
              <article key={step.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <CalendarCheck className="mb-4 h-5 w-5 text-blue-700" />
                <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PsychologicalCleaningInternalLinks
        title="Passende FLOXANT Spezialseiten"
        intro="Diese Seiten greifen typische Anschlussfragen auf. So bleibt der Weg vom Problem zur passenden Hilfe kurz."
        focusSlugs={page.relatedSlugs}
        excludeSlug={page.slug}
      />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Häufige Fragen zu {page.shortName}
            </h2>
          </div>
          <div className="space-y-4">
            {page.faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              <KeyRound className="h-4 w-4" />
              Direkter nächster Schritt
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
              Endlich wird der nächste Schritt klar.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Senden Sie kurz Ort, Termin, Fotos und Ziel. FLOXANT prüft, welcher Umfang realistisch
              ist und welcher nächste Schritt zu Ihrer Situation passt.
            </p>
          </div>
          <div className="grid gap-3">
            <Link href={bookingHref} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-blue-50">
              {page.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 px-5 py-4 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-400/20">
              WhatsApp schreiben
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={`tel:${company.phoneRaw}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/15">
              Direkt anrufen
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProblemColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
            <p className="text-sm leading-7 text-slate-600">{item}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export function PsychologicalCleaningInternalLinks({
  title = "Spezialseiten für Reinigung, Übergabe und Entlastung",
  intro = "FLOXANT führt häufige Stresssituationen in klare Servicewege. Jede Seite beantwortet ein anderes Problem.",
  focusSlugs,
  excludeSlug,
  limit = 6,
}: {
  title?: string;
  intro?: string;
  focusSlugs?: readonly string[];
  excludeSlug?: string;
  limit?: number;
}) {
  const focused = focusSlugs
    ? focusSlugs
        .map((slug) => getPsychologicalCleaningPage(slug))
        .filter((item): item is PsychologicalCleaningLandingPage => Boolean(item))
    : [];
  const fallback = psychologicalCleaningLandingPages.filter((page) => page.slug !== excludeSlug);
  const pages = [...focused, ...fallback]
    .filter((page, index, list) => list.findIndex((item) => item.slug === page.slug) === index)
    .filter((page) => page.slug !== excludeSlug)
    .slice(0, limit);

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <MapPin className="h-3.5 w-3.5" />
              Regensburg, Oberpfalz, Bayern
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-right">{intro}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                {page.category}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-950 transition group-hover:text-blue-700">
                {page.serviceName}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{page.metaDescription}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Seite öffnen
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
