import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";

import { company } from "@/lib/company";
import { practicalGuides } from "@/lib/practical-guides";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/blog";
const canonical = `${company.url}${path}`;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Ratgeber: Umzug, Reinigung & Räumung",
  description:
    "Kompakte Ratgeber zu Umzug, Reinigung, Entrümpelung, Kostenfaktoren und Übergabe in Düsseldorf und Regensburg.",
  alternates: {
    canonical,
    languages: { "de-DE": path, en: "/en/blog", "x-default": path },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    title: "FLOXANT Ratgeber für konkrete Servicefragen",
    description: "Ausgewählte Antworten zu Vorbereitung, Kostenfaktoren und Leistungsumfang.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "FLOXANT Ratgeber" }],
  },
};

const topics = [
  {
    title: "Umzug planen",
    description: "Strecke, Volumen, Zugang und Kostenfaktoren vor einer Anfrage besser einschätzen.",
    articles: [
      ["Umzugskosten in Regensburg realistisch einordnen", "/blog/umzug-kosten-regensburg", "Kostenfaktoren"],
      ["Umzug-Checkliste: die wichtigsten Schritte", "/blog/umzug-checkliste", "Checkliste"],
      ["Büroumzug in Regensburg: Kostenfaktoren und Checkliste", "/blog/bueroumzug-regensburg-kostenfaktoren-checkliste", "Firmenumzug"],
      ["Beiladung in Bayern: Wann sie sich lohnt", "/blog/beiladung-bayern-wann-lohnt-es-sich", "Transport"],
    ],
  },
  {
    title: "Reinigung beschreiben",
    description: "Objekt, Fläche, Turnus, Zugang und Zielzustand so benennen, dass Angebote vergleichbar werden.",
    articles: [
      ["Reinigung vor Übergabe: Checkliste", "/blog/reinigung-checkliste-uebergabe", "Übergabe"],
      ["Büroreinigung in Regensburg richtig anfragen", "/blog/bueroreinigung-regensburg-angebot-einholen", "Büro"],
      ["Treppenhausreinigung für Hausverwaltungen", "/blog/hausverwaltung-treppenhausreinigung-regensburg", "Objekt"],
      ["Reinigungsfirma für Büro und Praxis auswählen", "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl", "Auswahl"],
    ],
  },
  {
    title: "Räumung und Übergabe",
    description: "Freigaben, persönliche Gegenstände, Endzustand und Übergabe in der richtigen Reihenfolge vorbereiten.",
    articles: [
      ["Wohnungsauflösung: Was jetzt zu tun ist", "/blog/wohnungsaufloesung-was-tun", "Auflösung"],
      ["Entrümpelungskosten realistisch einordnen", "/blog/entrumpelung-kosten-bayern", "Kosten"],
      ["Fotodokumentation bei Umzug und Übergabe", "/blog/fotodokumentation-umzug-reinigung", "Dokumentation"],
      ["Umzug, Reinigung und Entrümpelung kombinieren", "/blog/service-kombination-umzug-reinigung-entruempelung", "Kombination"],
    ],
  },
] as const;

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Ratgeber",
        description: metadata.description as string,
        path,
        about: ["Umzug", "Reinigung", "Entrümpelung", "Übergabe"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Ratgeber", item: path },
      ]),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

export default function BlogHubPage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-950">
      <JsonLd />
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-cyan-300"><BookOpen className="h-4 w-4" /> Ratgeber</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Praktische Hilfe für Reinigung, Umzug und Entrümpelung.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Was gehört dazu, wie planen Sie den Ablauf und welche Arbeit können Sie abgeben? Unsere Ratgeber helfen Ihnen, die nächsten Schritte für Ihr Zuhause oder Ihren Betrieb zu ordnen.</p>
          <a href="#themen" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-cyan-400 px-5 text-sm font-black text-slate-950 hover:bg-cyan-300">Thema auswählen <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10" aria-labelledby="current-guides-title">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-blue-800">Aktualisiert am 9. September 2026</p>
          <h2 id="current-guides-title" className="mt-3 text-3xl font-bold">Acht Fragen aus dem Alltag</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {practicalGuides.map((guide) => <article key={guide.slug} className="rounded-xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-blue-800">{guide.region === "duesseldorf" ? "Düsseldorf" : "Regensburg"}</p>
              <h3 className="mt-2 text-xl font-bold leading-7"><Link href={`/blog/${guide.slug}`} className="hover:text-blue-800">{guide.title}</Link></h3>
              <p className="mt-3 leading-7 text-slate-600">{guide.description}</p>
              <Link href={`/blog/${guide.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-blue-800">Ratgeber lesen <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section id="themen" className="px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="guide-topics-title">
        <div className="mx-auto max-w-7xl">
          <h2 id="guide-topics-title" className="text-3xl font-black sm:text-4xl">Weitere Ratgeber nach Thema</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Checklisten und Entscheidungshilfen für Ihre Planung, Kostenfragen und die nächsten Schritte.</p>
          <div className="mt-9 grid gap-8">
            {topics.map((topic) => (
              <section key={topic.title} className="rounded-xl border border-slate-200 bg-slate-50 p-6" aria-labelledby={`topic-${topic.title.replace(/\s+/g, "-").toLowerCase()}`}>
                <h3 id={`topic-${topic.title.replace(/\s+/g, "-").toLowerCase()}`} className="text-2xl font-black">{topic.title}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">{topic.description}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {topic.articles.map(([title, href, label]) => (
                    <article key={href} className="rounded-lg border border-slate-200 bg-white p-5">
                      <p className="text-xs font-black uppercase tracking-wide text-blue-700">{label}</p>
                      <h4 className="mt-2 text-lg font-black leading-7">{title}</h4>
                      <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500"><Clock3 className="h-4 w-4" aria-hidden="true" /> Kurzratgeber</p>
                      <Link href={href} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Ratgeber lesen <ArrowRight className="h-4 w-4" /></Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-blue-800 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-3xl font-black">Genug gelesen – jetzt Eckdaten senden</h2><p className="mt-3 max-w-2xl text-blue-100">Wählen Sie Standort und Leistung. Danach fragt FLOXANT nur die dafür relevanten Angaben ab.</p></div>
          <Link href="/leistungen" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-blue-900">Leistung wählen <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
