import type { Metadata } from "next";

import { EnglishQuoteCheckExperience } from "@/components/english/EnglishQuoteCheckExperience";
import { clarityCheckMethod } from "@/lib/clarity-check";
import { company } from "@/lib/company";
import { getSearchAuthorityMetadata } from "@/lib/search-authority";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/en/quote-check";
const pageMeta = getSearchAuthorityMetadata(path)!;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageMeta.seoTitle,
  description: pageMeta.description,
  alternates: {
    canonical: `${company.url}${path}`,
    languages: {
      "de-DE": `${company.url}/angebotscheck`,
      en: `${company.url}${path}`,
      "x-default": `${company.url}/angebotscheck`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `${company.url}${path}`,
    siteName: company.name,
    title: pageMeta.ogTitle,
    description: pageMeta.ogDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({ name: pageMeta.headline, description: pageMeta.description, path, about: ["FLOXANT Scope Check", "Cleaning quote", "Moving quote"], inLanguage: "en" }),
    buildBreadcrumbJsonLd([
      { name: "English services", item: "/en" },
      { name: pageMeta.shortTitle, item: path },
    ]),
  ],
};

export default function EnglishQuoteCheckPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{clarityCheckMethod.en.name}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">{pageMeta.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{pageMeta.description}</p>
          <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-cyan-100">Services are carried out in the stated Düsseldorf and Regensburg regions in Germany. The check is not a global service, legal review or guarantee.</p>
        </div>
      </section>
      <EnglishQuoteCheckExperience />
    </main>
  );
}
