import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Search, ShieldCheck } from "lucide-react";

import { FaqSearch } from "@/components/editorial/FaqSearch";
import type { DisplayFaq } from "@/components/editorial/types";
import { company } from "@/lib/company";
import { publicFaqs } from "@/lib/content/faq-registry";

const path = "/en/questions";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Questions and Answers",
  description:
    "Reviewed answers about cleaning, moving, clearance, quote checks, the enquiry process and required details in Düsseldorf and Regensburg.",
  alternates: {
    canonical: path,
    languages: {
      de: "/fragen",
      en: path,
      "x-default": "/fragen",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: path,
    title: "FLOXANT Questions and Answers",
    description: "Reviewed public answers about services, enquiries, process and service areas.",
  },
  robots: { index: true, follow: true },
};

const categoryLabels: Record<string, string> = {
  Leistungen: "Services",
  Angebot: "Quotes",
  Preisfaktoren: "Cost factors",
  Ablauf: "Process",
  Termin: "Timing",
  Turnus: "Frequency",
  Fotos: "Photos",
  Besichtigung: "Site visit",
  Zugang: "Access",
  Schlüssel: "Keys",
  Material: "Materials",
  Entsorgung: "Disposal",
  Umzug: "Moving",
  Reinigung: "Cleaning",
  "Büro und Gewerbe": "Office and commercial properties",
  Praxis: "Practices",
  Fenster: "Windows",
  Räumung: "Clearance",
  Übergabe: "Handover",
  Datenschutz: "Privacy",
  "englischsprachige Anfrage": "English-language enquiries",
  Servicegebiet: "Service area",
  "besondere Situationen": "Special situations",
};

const regionLabels: Record<string, string> = {
  Deutschland: "Germany",
  Düsseldorf: "Düsseldorf",
  Regensburg: "Regensburg",
  Bayern: "Bavaria",
};

const faqItems: readonly DisplayFaq[] = publicFaqs
  .filter((faq) => faq.locale === "en")
  .map((faq) => ({
    id: faq.id,
    question: faq.question,
    shortAnswer: faq.shortAnswer,
    detailedAnswer: faq.detailedAnswer,
    category: categoryLabels[faq.category] || "Service information",
    region: faq.region.map((region) => regionLabels[region] || "Germany").join(" · "),
    locale: faq.locale,
    relatedService: faq.relatedService,
    relatedArticle: faq.relatedArticle || undefined,
  }));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${company.url}${path}#faq`,
  url: `${company.url}${path}`,
  inLanguage: "en",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.detailedAnswer || faq.shortAnswer,
    },
  })),
};

export default function EnglishQuestionsPage() {
  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            Public knowledge base
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Clear answers before you send an enquiry
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            Search reviewed answers about services, the process, required details and regional
            availability. An enquiry is not an automatic booking or service confirmation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/en/services"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white"
            >
              View services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/en/service-finder"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 text-sm font-black text-white outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              Start the service finder
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Search className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Filter by topic or region</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Every answer remains available as readable text on this page.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <ShieldCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Reviewed public information</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Only verified entries approved for public use are shown.
              </p>
            </div>
          </div>

          <FaqSearch items={faqItems} locale="en" />
        </div>
      </section>
    </main>
  );
}
