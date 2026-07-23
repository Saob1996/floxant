import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

import { company } from "@/lib/company";
import { publicSignatureSolutions } from "@/lib/services/signature-solutions";

const path = "/en/signature-services";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Signature and Special Solutions",
  description:
    "Reviewed FLOXANT solutions for quote checks, property briefs, handovers, backup planning, discreet enquiries and combined moving and cleaning.",
  alternates: {
    canonical: path,
    languages: {
      de: "/signature-services",
      en: path,
      "x-default": "/signature-services",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: path,
    title: "FLOXANT Signature and Special Solutions",
    description: "Publicly reviewed request paths for situations that need structured clarification.",
  },
  robots: { index: true, follow: true },
};

type EnglishSignatureCopy = {
  name: string;
  function: string;
  problem: string;
  result: string;
};

const englishCopy: Record<string, EnglishSignatureCopy> = {
  angebotscheck: {
    name: "FLOXANT quote check",
    function: "Reviews an existing service quote by scope, access, timing, extra items and missing details.",
    problem: "A final price cannot be assessed sensibly while the scope and assumptions remain unclear.",
    result: "A structured list of understandable points, missing details and useful follow-up questions.",
  },
  "anbieter-vergleichen": {
    name: "FLOXANT provider comparison",
    function: "Compares quotes using the same criteria: scope, timing, communication, extra items and open assumptions.",
    problem: "Quotes can look comparable even when their scope and assumptions differ.",
    result: "A factual comparison of criteria without a provider ranking or lowest-price promise.",
  },
  objektbrief: {
    name: "FLOXANT property brief",
    function: "Structures the property type, region, location, timing, access, photos and intended result for an enquiry.",
    problem: "The need is known, but the property details required for an assessment are still unstructured.",
    result: "A concise, reusable enquiry brief containing the known details.",
  },
  uebergabeakte: {
    name: "FLOXANT handover file",
    function: "Brings photos, remaining tasks, key status, timing and contacts together for a property handover.",
    problem: "Cleaning, remaining items, keys and documentation are often handled separately before a handover.",
    result: "An organised overview of known handover points and open tasks.",
  },
  "plan-b-service": {
    name: "FLOXANT Plan B service",
    function: "Checks the deadline, scope, region and possible next steps when a planned provider or process becomes uncertain.",
    problem: "A provider cancels, does not respond or leaves a required service open before a deadline.",
    result: "A feasibility assessment with clearly stated limits and possible next steps.",
  },
  "diskret-service": {
    name: "FLOXANT discreet service",
    function: "Provides a data-minimising first contact for sensitive moving, clearance, estate or cleaning situations.",
    problem: "A sensitive situation needs clarification without disclosing unnecessary private details at the first step.",
    result: "A restrained enquiry using the preferred contact method and only the necessary basic details.",
  },
  "umzug-mit-reinigung": {
    name: "Combined moving and cleaning enquiry",
    function: "Brings the move, remaining items, final cleaning and handover date into one enquiry.",
    problem: "Separate requests can overlook dependencies between transport, clearance, cleaning and handover.",
    result: "A coordinated process check covering known dates, dependencies and open points.",
  },
};

const englishSolutions = publicSignatureSolutions
  .filter((solution) => Boolean(englishCopy[solution.id]))
  .map((solution) => ({ solution, copy: englishCopy[solution.id] }));

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${company.url}${path}#solutions`,
  name: "FLOXANT signature and special solutions",
  itemListElement: englishSolutions.map(({ solution, copy }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: copy.name,
    url: `${company.url}${path}#solution-${solution.id}`,
  })),
};

export default function EnglishSignatureServicesPage() {
  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c") }}
      />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Publicly reviewed solutions
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Structured request paths for situations beyond a standard service form
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            These solutions help organise existing quotes, property details, handovers, backup
            planning or sensitive situations before any separate service agreement is made.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {englishSolutions.map(({ solution, copy }) => (
              <article
                id={`solution-${solution.id}`}
                key={solution.id}
                className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-950">
                    {solution.kind === "SIGNATURE" ? "Signature solution" : "Special solution"}
                  </span>
                  <ShieldCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-2xl font-black leading-tight">{copy.name}</h2>
                <p className="mt-3 font-medium leading-7 text-slate-700">{copy.function}</p>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-black text-slate-950">Situation</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{copy.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">Intended result</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{copy.result}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">Reviewed regions</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">
                      {solution.regions.join(" · ")}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={solution.canonicalRoute}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-black text-blue-800 outline-none hover:text-blue-950 focus-visible:ring-2 focus-visible:ring-cyan-600"
                >
                  Open service details in German
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <aside className="mt-12 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-black">Clear boundaries remain part of every request</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "No automatic booking or service confirmation",
                "No legal advice",
                "No price or savings guarantee",
                "No guaranteed immediate availability",
              ].map((item) => (
                <li key={item} className="flex gap-3 font-semibold leading-7 text-slate-200">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/en/service-finder"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white"
            >
              Use the service finder
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
