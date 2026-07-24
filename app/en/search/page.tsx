import type { Metadata } from "next";

import { PublicSearch } from "@/components/search/PublicSearch";
import { company } from "@/lib/company";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/en/search";
const description = "Search FLOXANT services, questions, signature services and practical guides locally without storing your search terms.";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Search FLOXANT | Services, questions and guides",
  description,
  alternates: {
    canonical: `${company.url}${path}`,
    languages: { "de-DE": `${company.url}/suche`, en: `${company.url}${path}`, "x-default": `${company.url}/suche` },
  },
};

const fallbackLinks = [
  { href: "/en/services", label: "Services", description: "Select cleaning, moving, clearance or quote-review services by region." },
  { href: "/en/questions", label: "Questions", description: "Answers about process, required details, photos, access and quotes." },
  { href: "/en/signature-services", label: "Signature services", description: "Structured routes for quotes, property details, handovers or a plan B." },
  { href: "/en/blog", label: "Guides", description: "Practical checklists for requesting services in Germany." },
  { href: "/en/duesseldorf/cleaning", label: "Düsseldorf cleaning", description: "English guidance for cleaning enquiries in Düsseldorf." },
  { href: "/en/regensburg/moving", label: "Regensburg moving", description: "English guidance for moving enquiries in Regensburg." },
] as const;

export default function EnglishSearchPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({ name: "Search FLOXANT", description, path, inLanguage: "en" }),
      buildBreadcrumbJsonLd([{ name: "Home", item: "/en" }, { name: "Search", item: path }]),
    ],
  };

  return (
    <main className="bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
      <header className="bg-slate-950 px-5 pb-14 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-200">Local site search</p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">Find services, questions and guides.</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-200">Search runs entirely in your browser. Your terms are not stored or sent to external search services.</p>
        </div>
      </header>
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl"><PublicSearch locale="en" fallbackLinks={fallbackLinks} /></div>
      </section>
    </main>
  );
}
