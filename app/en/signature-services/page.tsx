import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

import { company } from "@/lib/company";
import { getCentralSeoEntry } from "@/lib/content/seo-matrix";
import { publicSignatureSolutions } from "@/lib/services/signature-solutions";

const path = "/en/signature-services";
const seo = getCentralSeoEntry(path);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: seo.activeTitle,
  description: seo.metaDescription,
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
    title: seo.ogTitle,
    description: seo.ogDescription,
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
    result: "A factual comparison of criteria without favouring a provider or promising the lowest price.",
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

function getOperationalDetails(solutionId: string) {
  if (solutionId === "angebotscheck" || solutionId === "anbieter-vergleichen") {
    return {
      scope: ["existing quote", "included work", "assumptions", "extra line items", "open questions"],
      boundaries: "The review explains the information provided. It is not legal advice, a quality certification or a promise to find a lower price.",
      priceFactors: ["document length", "number of quotes", "missing project details", "complexity of scope"],
      requiredDetails: ["quote or screenshots", "location", "requested service", "timing", "main concern"],
      steps: ["Upload the quote and project facts", "FLOXANT checks comparable criteria", "Receive open points and a practical next step"],
      faq: {
        q: "Will the review guarantee a cheaper quote?",
        a: "No. It makes scope, assumptions and open points easier to compare; it does not promise a saving or favour a provider.",
      },
    };
  }

  if (solutionId === "objektbrief" || solutionId === "uebergabeakte") {
    return {
      scope: ["property facts", "photos", "access", "known tasks", "contacts and timing"],
      boundaries: "The file organises the details supplied by the customer. It is not a survey, valuation, legal record or acceptance guarantee.",
      priceFactors: ["property size", "number of areas", "documentation volume", "required coordination"],
      requiredDetails: ["property location", "property type", "photos", "target result", "deadline or handover date"],
      steps: ["Send known facts and files", "FLOXANT structures tasks and gaps", "Confirm the brief before any separate service is planned"],
      faq: {
        q: "Does the file replace a formal handover report?",
        a: "No. It is an organised request and working overview based on the information provided, not a legal handover record.",
      },
    };
  }

  if (solutionId === "plan-b-service") {
    return {
      scope: ["deadline", "failed or uncertain arrangement", "minimum required result", "location", "available alternatives"],
      boundaries: "FLOXANT checks feasibility but does not promise emergency availability or a completed service before the facts are confirmed.",
      priceFactors: ["notice period", "scope", "access", "travel", "resources required"],
      requiredDetails: ["location", "deadline", "what has changed", "minimum required scope", "photos or prior quote"],
      steps: ["Describe the failed plan and deadline", "FLOXANT checks feasible options", "Agree a next step only if scope and timing can be confirmed"],
      faq: {
        q: "Is last-minute availability guaranteed?",
        a: "No. Availability is checked after location, scope, access and deadline are known.",
      },
    };
  }

  if (solutionId === "diskret-service") {
    return {
      scope: ["data-minimising contact", "preferred contact channel", "essential service facts", "sensitive timing", "restricted access"],
      boundaries: "Only necessary service information should be sent. This route is not anonymous, legal or crisis advice.",
      priceFactors: ["requested service", "scope", "access", "timing", "coordination needs"],
      requiredDetails: ["preferred contact method", "region", "service category", "timing", "only the essential context"],
      steps: ["Choose a discreet contact method", "Share the minimum useful facts", "Clarify scope and next steps directly"],
      faq: {
        q: "Do I need to explain private background details?",
        a: "No. Start with only the service facts needed to understand location, scope, timing and the preferred contact method.",
      },
    };
  }

  return {
    scope: ["move details", "remaining items", "cleaning scope", "handover date", "dependencies"],
    boundaries: "Moving, clearance and cleaning are assessed as separate work packages. One request does not automatically confirm every part.",
    priceFactors: ["volume", "route", "floors and access", "cleaning condition", "additional tasks"],
    requiredDetails: ["start and destination", "volume or photos", "access", "cleaning areas", "handover date"],
    steps: ["Send one combined brief", "FLOXANT separates tasks and dependencies", "Confirm feasible work packages and timing"],
    faq: {
      q: "Will moving and cleaning appear as one unclear total?",
      a: "No. The request separates the known work packages so scope, assumptions and optional tasks remain visible.",
    },
  };
}

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
            Structured service requests
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
            {englishSolutions.map(({ solution, copy }) => {
              const details = getOperationalDetails(solution.id);
              return (
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
                    <dt className="font-black text-slate-950">Service regions</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">
                      {solution.regions.join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">Scope</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{details.scope.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">Required details</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{details.requiredDetails.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">What can affect a separate service price</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{details.priceFactors.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">Process</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{details.steps.join(" → ")}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">Boundary</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{details.boundaries}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-950">{details.faq.q}</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{details.faq.a}</dd>
                  </div>
                </dl>
                <Link
                  href={`/en/contact?service=${encodeURIComponent(solution.id)}&intent=signature-service`}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-black text-blue-800 outline-none hover:text-blue-950 focus-visible:ring-2 focus-visible:ring-cyan-600"
                >
                  Start this request in English
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
              );
            })}
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
