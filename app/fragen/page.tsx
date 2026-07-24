import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Search, ShieldCheck } from "lucide-react";

import { FaqSearch } from "@/components/editorial/FaqSearch";
import type { DisplayFaq } from "@/components/editorial/types";
import { company } from "@/lib/company";
import { publicFaqs } from "@/lib/content/faq-registry";

const path = "/fragen";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Häufige Fragen zu FLOXANT Leistungen",
  description:
    "Geprüfte Antworten zu Reinigung, Umzug, Räumung, Angeboten, Ablauf und benötigten Angaben in Düsseldorf und Regensburg.",
  alternates: {
    canonical: path,
    languages: {
      de: path,
      en: "/en/questions",
      "x-default": path,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: "Häufige Fragen zu FLOXANT Leistungen",
    description:
      "Klare Antworten zu Leistungen, Anfrage, Ablauf und Servicegebiet.",
  },
  robots: { index: true, follow: true },
};

const faqItems: readonly DisplayFaq[] = publicFaqs
  .filter((faq) => faq.locale === "de")
  .map((faq) => ({
    id: faq.id,
    question: faq.question,
    shortAnswer: faq.shortAnswer,
    detailedAnswer: faq.detailedAnswer,
    category: faq.category,
    region: faq.region.join(" · "),
    locale: faq.locale,
    relatedService: faq.relatedService,
    relatedArticle: faq.relatedArticle || undefined,
  }));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${company.url}${path}#faq`,
  url: `${company.url}${path}`,
  inLanguage: "de-DE",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.detailedAnswer || faq.shortAnswer,
    },
  })),
};

export default function QuestionsPage() {
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
            Öffentliche Wissensbasis
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Klare Antworten vor Ihrer Anfrage
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            Durchsuchen Sie geprüfte Antworten zu Leistungen, Ablauf, benötigten Angaben und
            regionaler Verfügbarkeit. Eine Anfrage ist noch keine Buchung oder Leistungszusage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/leistungen"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white"
            >
              Leistungen ansehen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/service-finder"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 text-sm font-black text-white outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              Service Finder starten
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Search className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Nach Thema oder Region filtern</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Fragen und Antworten bleiben vollständig auf dieser Seite sichtbar und durchsuchbar.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <ShieldCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Geprüfte öffentliche Angaben</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Angezeigt werden ausschließlich verifizierte und öffentlich freigegebene Einträge.
              </p>
            </div>
          </div>

          <FaqSearch items={faqItems} locale="de" />
        </div>
      </section>
    </main>
  );
}
