import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, LockKeyhole } from "lucide-react";

import { OfferCheckConversionFlow } from "@/components/OfferCheckConversionFlow";
import { clarityCheckMethod } from "@/lib/clarity-check";
import { company } from "@/lib/company";
import { getSearchAuthorityMetadata } from "@/lib/search-authority";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/angebotscheck";
const pageMeta = getSearchAuthorityMetadata(path)!;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageMeta.seoTitle,
  description: pageMeta.description,
  alternates: {
    canonical: `${company.url}${path}`,
    languages: {
      "de-DE": `${company.url}${path}`,
      en: `${company.url}/en/quote-check`,
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
      about: ["FLOXANT Klarheitscheck", "Reinigungsangebot", "Umzugsangebot", "Räumungsangebot"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: pageMeta.shortTitle, item: path },
    ]),
  ],
};

const benefitCards = [
  { Icon: ClipboardCheck, text: "Zwölf klar getrennte Prüfpunkte" },
  { Icon: LockKeyhole, text: "Keine Übertragung während des Checks" },
  { Icon: CheckCircle2, text: "Rückfragen statt künstlicher Prozentwertung" },
] as const;

export default function AngebotscheckPage() {
  return (
    <main className="overflow-hidden bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{clarityCheckMethod.de.name}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">{pageMeta.headline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{pageMeta.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#klarheitscheck" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-slate-950">
                Klarheitscheck starten <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/reinigungsfirma-angebot" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-black text-white">
                Neues Reinigungsangebot vorbereiten
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {benefitCards.map(({ Icon, text }) => {
              return <div key={text} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4 text-sm font-bold"><Icon className="h-5 w-5 text-cyan-200" />{text}</div>;
            })}
          </div>
        </div>
      </section>
      <OfferCheckConversionFlow />
      <section className="border-t border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black tracking-tight">Was der Klarheitscheck nicht bewertet</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">{clarityCheckMethod.de.disclaimer} Das Ergebnis zeigt nur, welche Angaben nach Ihrer Auswahl vor einer Zusage noch schriftlich geklärt werden könnten.</p>
        </div>
      </section>
    </main>
  );
}
