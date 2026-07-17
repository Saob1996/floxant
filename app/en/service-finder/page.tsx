import type { Metadata } from "next";

import { ServiceFinderTool } from "@/components/tools/ServiceFinderTool";
import { company } from "@/lib/company";
import { getSearchAuthorityMetadata } from "@/lib/search-authority";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/en/service-finder";
const pageMeta = getSearchAuthorityMetadata(path)!;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageMeta.seoTitle,
  description: pageMeta.description,
  alternates: { canonical: `${company.url}${path}`, languages: { "de-DE": `${company.url}/leistungsfinder`, en: `${company.url}${path}`, "x-default": `${company.url}/leistungsfinder` } },
  openGraph: { type: "website", locale: "en_GB", url: `${company.url}${path}`, siteName: company.name, title: pageMeta.ogTitle, description: pageMeta.ogDescription },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({ name: pageMeta.headline, description: pageMeta.description, path, about: ["FLOXANT Service Finder", "Cleaning Düsseldorf", "Moving Regensburg", "House clearance Regensburg"], inLanguage: "en" }),
    buildBreadcrumbJsonLd([{ name: "English services", item: "/en" }, { name: pageMeta.shortTitle, item: path }]),
  ],
};

export default function EnglishServiceFinderPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">FLOXANT Service Finder</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">{pageMeta.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{pageMeta.description}</p>
          <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-cyan-100">The finder only matches services listed for Düsseldorf and Regensburg, Germany. It does not confirm availability, a price or an appointment.</p>
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><ServiceFinderTool locale="en" /></div></section>
    </main>
  );
}
