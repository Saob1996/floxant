import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, LockKeyhole } from "lucide-react";

import { RequestBriefBuilder } from "@/components/tools/RequestBriefBuilder";
import { company } from "@/lib/company";
import { getSearchAuthorityMetadata } from "@/lib/search-authority";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/objektbrief";
const pageMeta = getSearchAuthorityMetadata(path)!;
const contactHref = "/kontakt?intent=objektbrief-uebergabe&source=objektbrief";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageMeta.seoTitle,
  description: pageMeta.description,
  alternates: {
    canonical: `${company.url}${path}`,
    languages: {
      "de-DE": `${company.url}${path}`,
      en: `${company.url}/en/create-request`,
      "x-default": `${company.url}${path}`,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${company.url}${path}`,
    siteName: company.name,
    title: pageMeta.ogTitle,
    description: pageMeta.ogDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: pageMeta.headline,
      description: pageMeta.description,
      path,
      about: ["FLOXANT Anfragebrief", "Reinigungsanfrage", "Umzugsanfrage", "Räumungsanfrage"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: pageMeta.shortTitle, item: path },
    ]),
  ],
};

const benefits = [
  { Icon: FileText, text: "Leistung, Ort, Umfang und Zugang geordnet zusammenfassen" },
  { Icon: LockKeyhole, text: "Eingaben bleiben bis zur bewussten Übergabe in diesem Browser" },
  { Icon: CheckCircle2, text: "Offene Pflichtangaben werden transparent benannt" },
] as const;

export default function ObjektbriefPage() {
  return (
    <main className="overflow-hidden bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">FLOXANT Anfragebrief</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">{pageMeta.headline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{pageMeta.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#anfragebrief" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-slate-950">
                Anfragebrief starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/angebotscheck" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-black text-white">
                Vorhandenes Angebot prüfen
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {benefits.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4 text-sm font-bold">
                <Icon className="h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="anfragebrief" className="scroll-mt-24 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <RequestBriefBuilder locale="de" contactHref={contactHref} />
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight">Was der Anfragebrief leistet</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            Der Anfragebrief ordnet Ihre eigenen Angaben. Er berechnet keinen Preis, reserviert keinen Termin und ist noch keine Beauftragung. Erst wenn Sie den Text bewusst in das bestehende Kontaktformular übernehmen und dieses absenden, werden Daten übertragen.
          </p>
        </div>
      </section>
    </main>
  );
}
