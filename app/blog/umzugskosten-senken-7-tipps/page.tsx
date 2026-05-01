import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";

const tips = [
  {
    title: "Terminfenster bewusst wählen",
    text: "Monatsende, Wochenenden und sehr kurzfristige Termine sind oft enger geplant. Wer zeitlich etwas Spielraum hat, macht die Abstimmung häufig leichter.",
  },
  {
    title: "Volumen ehrlich reduzieren",
    text: "Jeder Gegenstand braucht Platz, Zeit und Handling. Vor dem Angebot sollte klar sein, was wirklich mitzieht, was verkauft wird und was entsorgt werden muss.",
  },
  {
    title: "Zugang und Laufwege früh klären",
    text: "Etagen, Aufzug, lange Wege, Innenhof, Parkmöglichkeit und Haltezone beeinflussen den Aufwand oft stärker als die Entfernung zwischen zwei Adressen.",
  },
  {
    title: "Umzug und Entrümpelung zusammen denken",
    text: "Wenn Keller, Balkon oder Garage offen bleiben, entsteht nach dem Umzug oft ein zweiter Einsatz. Eine kombinierte Planung kann Schnittstellen reduzieren.",
  },
  {
    title: "Reinigung nicht zu spät planen",
    text: "Wer erst nach dem Transport an Endreinigung und Übergabe denkt, gerät schnell in Zeitdruck. Besser ist ein Ablauf, der Auszug, Reinigung und Schlüsseltermin verbindet.",
  },
  {
    title: "Fotos und Inventar vorbereiten",
    text: "Gute Fotos, eine grobe Liste und klare Angaben helfen, den Aufwand realistischer einzuschätzen und unnötige Rückfragen zu vermeiden.",
  },
  {
    title: "Preisrahmen statt Lockpreis prüfen",
    text: "Ein niedriger Einstiegspreis hilft wenig, wenn Fahrzeug, Zeit oder Zuständigkeit später nicht passen. Realistische Vorprüfung schützt besser vor Überraschungen.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/umzugskosten-senken-7-tipps",
    title: "Umzugskosten senken | 7 realistische Hebel ohne Lockpreis",
    description:
      "Sieben praktische Hebel, um Umzugskosten realistisch einzuordnen: Volumen, Termin, Zugang, Reinigung, Entrümpelung und Preisrahmen.",
    keywords: [
      "Umzugskosten senken",
      "Umzug planen",
      "Umzug Regensburg",
      "Preisrahmen Umzug",
      "Umzug Bayern",
    ],
  });
}

export default function BlogArticle() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Umzugskosten senken: 7 realistische Hebel ohne Lockpreis",
    description:
      "Wie Kunden Umzugskosten besser steuern können, ohne sich auf künstlich niedrige Versprechen zu verlassen.",
    author: { "@type": "Organization", name: "FLOXANT" },
    publisher: { "@type": "Organization", name: "FLOXANT", url: "https://www.floxant.de" },
    datePublished: "2026-03-18",
    dateModified: "2026-05-01",
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_48%,#ffffff_100%)] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumbs
        lang="de"
        items={[{ label: "Blog", href: "/blog" }, { label: "Umzugskosten senken" }]}
      />

      <article className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <header className="rounded-[2.4rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Preisrahmen & Planung
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.018em] text-slate-950 md:text-6xl">
              Umzugskosten senken: 7 realistische Hebel ohne Lockpreis
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Viele Menschen fragen zuerst: Was kostet der Umzug? Sinnvoller ist oft die Frage:
              Welche Faktoren lassen den Auftrag kippen oder unnötig teuer werden? Wer Volumen,
              Zugang, Termin, Reinigung und Restaufgaben früh klärt, kann Kosten besser steuern.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/rechner" className="flox-button-primary px-6">
                Preisrahmen prüfen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/anfrage-mit-preisrahmen" className="flox-button-secondary px-6">
                Budget nennen
              </Link>
            </div>
          </header>

          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-xl shadow-slate-950/15 md:p-9">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
              Die kurze Antwort
            </div>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-200">
              Umzugskosten sinken nicht durch den billigsten Werbepreis, sondern durch klare
              Vorbereitung: weniger Volumen, bessere Zugänglichkeit, saubere Terminlogik und
              realistische Abstimmung. FLOXANT kann in Regensburg und Bayern helfen, diese Punkte
              vor der verbindlichen Planung sichtbar zu machen.
            </p>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-2">
            {tips.map((tip, index) => (
              <article
                key={tip.title}
                className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[1rem] bg-blue-50 text-sm font-bold text-blue-700">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                      {tip.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{tip.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 md:p-9">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Warum ein realistischer Preisrahmen ehrlicher ist
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Ein verbindlicher Auftrag sollte erst entstehen, wenn die wichtigsten Eckdaten
              geprüft sind. Dazu gehören Möbelmenge, Laufwege, Parkmöglichkeit, Etagen, Fotos,
              Strecke, Zusatzleistungen und Zeitfenster. Wenn diese Punkte fehlen, wirkt ein
              Angebot zwar schnell, ist aber oft nicht belastbar.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-700">
              FLOXANT setzt deshalb auf Vorprüfung statt künstlich niedriger Einstiegslogik. Das
              Ziel ist nicht, jeden Auftrag kleinzurechnen, sondern Umfang und Erwartung so
              zusammenzubringen, dass der Einsatztag planbar bleibt.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Orientierung statt Lockpreis", "Fotos und Eckdaten helfen", "Verbindlich erst nach Prüfung"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[1.1rem] border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-950"
                  >
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
