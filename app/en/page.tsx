import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Languages, MapPin } from "lucide-react";

import { company } from "@/lib/company";
import { englishLocalSeoPages } from "@/lib/local-seo/englishLocalSeoPages";
import type { LocalSeoPageConfig } from "@/lib/local-seo/types";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT English Services | Düsseldorf Cleaning & Regensburg Moving",
  description:
    "English FLOXANT service pages for Düsseldorf and nearby cleaning, quote review, Regensburg moving, house clearance and moving quote review.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en",
    title: "FLOXANT English Services",
    description:
      "English service pages for Düsseldorf and nearby cleaning plus Regensburg moving with WhatsApp requests and quote review.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "FLOXANT English Services" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnglishHubPage() {
  const duesseldorfPages = englishLocalSeoPages.filter((page) => page.region === "duesseldorf");
  const regensburgPages = englishLocalSeoPages.filter((page) => page.region === "regensburg");

  return (
    <main className="bg-white text-slate-950">
      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
            <Languages className="h-4 w-4" aria-hidden="true" />
            English FLOXANT services
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
            English pages for Düsseldorf cleaning, nearby cities and Regensburg moving
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-100">
            Choose the matching English service page, send photos by WhatsApp and review existing
            quotes before booking. German pages remain available through hreflang pairs where a real
            equivalent exists.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <ServiceGroup title="Düsseldorf and nearby cleaning" pages={duesseldorfPages} />
          <ServiceGroup title="Regensburg moving and clearance" pages={regensburgPages} />
        </div>
      </section>
    </main>
  );
}

function ServiceGroup({ title, pages }: { title: string; pages: readonly LocalSeoPageConfig[] }) {
  return (
    <section>
      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {title}
      </div>
      <div className="mt-5 grid gap-3">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
          >
            <h2 className="text-xl font-black tracking-normal text-slate-950">{page.serviceName}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{page.metaDescription}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
              Open page
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
