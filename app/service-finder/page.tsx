import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, LockKeyhole, ShieldCheck } from "lucide-react";

import {
  StrategicServiceFinder,
  type FinderService,
  type FinderSignature,
} from "@/components/services/StrategicServiceFinder";
import { company } from "@/lib/company";
import { publicServices } from "@/lib/services/service-registry";
import { publicSignatureSolutions } from "@/lib/services/signature-solutions";
import { getFaqsForService } from "@/lib/content/faq-registry";

const path = "/service-finder";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Leistungsfinder",
  description:
    "Lokale, unverbindliche Orientierung für FLOXANT Leistungen in Düsseldorf und Regensburg – ohne Speicherung oder Übertragung der Antworten.",
  alternates: {
    canonical: path,
    languages: { de: path, en: "/en/service-finder", "x-default": path },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: "FLOXANT Leistungsfinder",
    description: "Passende Leistungen anhand weniger Angaben lokal einordnen.",
  },
  robots: { index: true, follow: true },
};

const finderServices: readonly FinderService[] = publicServices.map((service) => {
  const faqs = getFaqsForService(service.id, "de");
  const articles = [...new Map(
    faqs
      .filter((faq) => faq.relatedArticle)
      .map((faq) => [faq.relatedArticle!, { href: faq.relatedArticle!, label: "Passenden Ratgeber öffnen" }]),
  ).values()];
  return {
    id: service.id,
    title: service.germanName,
    description: service.shortDescription,
    category: service.category,
    regions: [...service.regions],
    audiences: [...service.audienceTypes],
    cadence: service.cadence,
    objectTypes: [...service.objectTypes],
    requiredDetails: [...service.requiredDetails],
    canonicalRoute: service.canonicalRoute,
    ctaHref: service.cta.href,
    faqLinks: faqs.slice(0, 2).map((faq) => ({ href: `/fragen#${faq.id}`, label: faq.question })),
    articleLinks: articles.slice(0, 2),
  };
});

const finderSignatures: readonly FinderSignature[] = publicSignatureSolutions.map((solution) => ({
  id: solution.id,
  title: solution.name,
  problem: solution.problem,
  serviceIds: [...solution.serviceIds],
  regions: [...solution.regions],
  canonicalRoute: solution.canonicalRoute,
}));

export default function ServiceFinderPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Unverbindliche Orientierung
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Welcher Service passt zu Ihrer Situation?
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            Wenige kurze Schritte ordnen Ihre Angaben nachvollziehbar ein. Das Ergebnis ist keine
            Buchung, Preisangabe oder Verfügbarkeitszusage.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <LockKeyhole className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Antworten bleiben lokal</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Es wird nichts gespeichert oder übertragen, bevor Sie selbst einen Kontaktweg öffnen.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <ShieldCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Nur freigegebene Leistungen</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Die Auswahl basiert ausschließlich auf den freigegebenen Leistungen und besonderen Lösungen.
              </p>
            </div>
          </div>

          <StrategicServiceFinder
            services={finderServices}
            signatures={finderSignatures}
            locale="de"
          />

          <nav aria-label="Weitere Orientierungswege" className="mt-10 flex flex-wrap gap-3">
            <Link href="/leistungen" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
              Alle Leistungen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/fragen" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-950">
              Häufige Fragen
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
