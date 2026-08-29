import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, LockKeyhole, ShieldCheck } from "lucide-react";

import {
  StrategicServiceFinder,
  type FinderService,
  type FinderSignature,
} from "@/components/services/StrategicServiceFinder";
import { company } from "@/lib/company";
import {
  publicServices,
  selectPublicServiceFields,
} from "@/lib/services/service-registry";
import { publicSignatureSolutions } from "@/lib/services/signature-solutions";
import { getFaqsForService } from "@/lib/content/faq-registry";

const path = "/en/service-finder";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Service Finder in English",
  description:
    "Local, non-binding guidance for FLOXANT services with English information, without storing or transmitting your answers.",
  alternates: {
    canonical: path,
    languages: { de: "/service-finder", en: path, "x-default": "/service-finder" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: path,
    title: "FLOXANT Service Finder in English",
    description: "Match a situation to a service using a local, rule-based guide.",
  },
  robots: { index: true, follow: true },
};

const categoryCopy: Record<FinderService["category"], { description: string; objects: string[]; details: string[] }> = {
  cleaning: {
    description: "Cleaning is assessed from the property, condition, requested result, access, timing and frequency.",
    objects: ["Flat", "House", "Office", "Practice", "Commercial property"],
    details: ["Location", "Property type and size", "Condition and intended result", "Timing, access and photos"],
  },
  moving: {
    description: "Moving or transport is assessed from the start, destination, volume, access, timing and requested additions.",
    objects: ["Flat", "House", "Office", "Furniture"],
    details: ["Start and destination", "Volume or photos", "Floors and lift", "Preferred timing"],
  },
  clearance: {
    description: "Clearance is assessed from the rooms, volume, access, retained items, timing and disposal needs.",
    objects: ["Flat", "House", "Cellar", "Office", "Commercial property"],
    details: ["Location and rooms", "Volume or photos", "Access", "Retained items and deadline"],
  },
  offer_check: {
    description: "A quote check reviews the stated scope, assumptions, timing, access and possible extra items.",
    objects: ["Cleaning quote", "Moving quote", "Clearance quote"],
    details: ["Quote or screenshot", "Location and service", "Scope", "Timing and open questions"],
  },
};

const englishSignatureCopy: Record<string, { title: string; problem: string }> = {
  angebotscheck: { title: "FLOXANT quote check", problem: "The scope and assumptions in an existing quote need clarification." },
  "anbieter-vergleichen": { title: "FLOXANT provider comparison", problem: "Quotes need to be compared using the same factual criteria." },
  objektbrief: { title: "FLOXANT property brief", problem: "The property details required for an assessment are still unstructured." },
  uebergabeakte: { title: "FLOXANT handover file", problem: "Photos, remaining tasks, keys and contacts need one overview." },
  "plan-b-service": { title: "FLOXANT Plan B service", problem: "A planned provider or process becomes uncertain before a deadline." },
  "diskret-service": { title: "FLOXANT discreet service", problem: "A sensitive situation requires a data-minimising first contact." },
  "umzug-mit-reinigung": { title: "Combined moving and cleaning enquiry", problem: "Moving, remaining items, cleaning and handover need coordinated planning." },
};

const finderServices: readonly FinderService[] = publicServices
  .filter((service) => service.locale.includes("en") && Boolean(service.englishAlternativeRoute))
  .map((service) => {
    const copy = categoryCopy[service.category];
    const publicContent = selectPublicServiceFields(service, {
      publicTitle: service.englishName,
      publicDescription: copy.description,
      publicRoute: service.id === "umzug" ? "/en/regensburg/moving" : service.englishAlternativeRoute!,
      publicCta: {
        label: "Prepare enquiry",
        href: `/en/contact?service=${encodeURIComponent(service.id)}`,
      },
    });
    const faqs = getFaqsForService(service.id, "en");
    const articles = [...new Map(
      faqs
        .filter((faq) => faq.relatedArticle)
        .map((faq) => [faq.relatedArticle!, { href: faq.relatedArticle!, label: "Open related guide" }]),
    ).values()];
    return {
      title: publicContent.publicTitle,
      description: publicContent.publicDescription,
      category: service.category,
      regions: [...publicContent.publicRegions],
      audiences: [...service.audienceTypes],
      cadence: service.cadence,
      objectTypes: copy.objects,
      requiredDetails: copy.details,
      canonicalRoute: publicContent.publicRoute,
      ctaHref: publicContent.publicCta.href,
      faqLinks: faqs.slice(0, 2).map((faq) => ({ href: `/en/questions#${faq.id}`, label: faq.question })),
      articleLinks: articles.slice(0, 2),
    };
  });

const finderSignatures: readonly FinderSignature[] = publicSignatureSolutions
  .filter((solution) => Boolean(englishSignatureCopy[solution.id]))
  .map((solution) => ({
    title: englishSignatureCopy[solution.id].title,
    problem: englishSignatureCopy[solution.id].problem,
    relatedServiceRoutes: solution.serviceIds.flatMap((serviceId) => {
      const service = publicServices.find((item) => item.id === serviceId);
      if (!service?.englishAlternativeRoute) return [];
      return [service.id === "umzug" ? "/en/regensburg/moving" : service.englishAlternativeRoute];
    }),
    regions: [...solution.regions],
    canonicalRoute: `/en/signature-services#solution-${solution.id}`,
  }));

export default function EnglishServiceFinderPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Non-binding guidance
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Which service fits your situation?
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            A few short steps provide a rule-based match. The result is not a booking, price quote
            or availability confirmation.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <LockKeyhole className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Your answers stay local</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Nothing is stored or transmitted before you choose to open a contact route.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <ShieldCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Approved services only</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                The selection uses only public services that also have an English information route.
              </p>
            </div>
          </div>

          <StrategicServiceFinder services={finderServices} signatures={finderSignatures} locale="en" />

          <nav aria-label="Other guidance routes" className="mt-10 flex flex-wrap gap-3">
            <Link href="/en/services" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
              All English services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/en/questions" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-950">
              Questions and answers
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
