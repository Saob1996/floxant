import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { ServiceFinderTool } from "@/components/tools/ServiceFinderTool";
import { company } from "@/lib/company";
import { getSearchAuthorityMetadata } from "@/lib/search-authority";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/leistungsfinder";
const pageMeta = getSearchAuthorityMetadata(path)!;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageMeta.seoTitle,
  description: pageMeta.description,
  alternates: { canonical: `${company.url}${path}`, languages: { "de-DE": `${company.url}${path}`, "x-default": `${company.url}${path}` } },
  openGraph: { type: "website", locale: "de_DE", url: `${company.url}${path}`, siteName: company.name, title: pageMeta.ogTitle, description: pageMeta.ogDescription },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({ name: pageMeta.headline, description: pageMeta.description, path, about: ["FLOXANT Leistungsfinder", "Reinigung Düsseldorf", "Umzug Regensburg", "Entrümpelung Regensburg"] }),
    buildBreadcrumbJsonLd([{ name: "Startseite", item: "/" }, { name: pageMeta.shortTitle, item: path }]),
  ],
};

export default function LeistungsfinderPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200"><Compass className="h-4 w-4" aria-hidden="true" />FLOXANT Leistungsfinder</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">{pageMeta.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{pageMeta.description}</p>
          <Link href="/objektbrief" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-black text-white">Leistung schon bekannt? Anfragebrief erstellen<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><ServiceFinderTool locale="de" /></div></section>
    </main>
  );
}
