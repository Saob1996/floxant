import type { Metadata } from "next";

import { PublicSearch } from "@/components/search/PublicSearch";
import { company } from "@/lib/company";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/suche";
const description = "Durchsuchen Sie FLOXANT-Leistungen, häufige Fragen, Signature Services und Ratgeber lokal und ohne Speicherung Ihrer Suchanfrage.";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Suche | Leistungen, Fragen und Ratgeber",
  description,
  alternates: {
    canonical: `${company.url}${path}`,
    languages: { "de-DE": `${company.url}${path}`, "en-DE": `${company.url}/en/search`, "x-default": `${company.url}${path}` },
  },
  robots: { index: false, follow: true },
};

const fallbackLinks = [
  { href: "/leistungen", label: "Leistungen", description: "Reinigung, Umzug, Räumung und Angebotsprüfung nach Region auswählen." },
  { href: "/fragen", label: "Häufige Fragen", description: "Antworten zu Ablauf, Angaben, Fotos, Zugang und Angeboten." },
  { href: "/signature-services", label: "Signature Services", description: "Besondere Anfragewege für Angebot, Objekt, Übergabe oder Plan B." },
  { href: "/blog", label: "Ratgeber", description: "Checklisten und Entscheidungshilfen für konkrete Servicefragen." },
  { href: "/duesseldorf", label: "Düsseldorf", description: "Reinigung und weitere öffentlich angebotene Leistungen in Düsseldorf." },
  { href: "/regensburg", label: "Regensburg", description: "Umzug, Reinigung, Räumung und weitere Leistungen in Regensburg." },
] as const;

export default function SearchPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({ name: "FLOXANT Suche", description, path }),
      buildBreadcrumbJsonLd([{ name: "Startseite", item: "/" }, { name: "Suche", item: path }]),
    ],
  };

  return (
    <main className="bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
      <header className="bg-slate-950 px-5 pb-14 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-200">Lokale Seitensuche</p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">Leistungen, Fragen und Ratgeber finden.</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-200">Die Suche läuft vollständig in Ihrem Browser. Ihre Suchbegriffe werden weder gespeichert noch an externe Suchdienste übertragen.</p>
        </div>
      </header>
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl"><PublicSearch locale="de" fallbackLinks={fallbackLinks} /></div>
      </section>
    </main>
  );
}
