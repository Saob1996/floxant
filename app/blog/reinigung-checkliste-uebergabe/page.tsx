import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";

const checklist = [
  "Küche: Arbeitsflächen, Backofen, Dunstabzug, Schränke, Fliesen und sichtbare Fettspuren.",
  "Bad: Armaturen, Kalkränder, Fugen, Dusche, WC, Waschbecken und schwer erreichbare Ecken.",
  "Böden: Staub, Flecken, Sockelleisten und Spuren nach dem Auszug.",
  "Fensterbereiche: Rahmen, Schienen, Griffe und sichtbare Ablagerungen.",
  "Nebenflächen: Balkon, Keller, Abstellraum, Garage und letzte Restgegenstände.",
  "Übergabe: Schlüssel, Fotos, Zählerstände und Terminlogik vorab klären.",
];

const faqItems = [
  {
    q: "Garantiert FLOXANT die Wohnungsabnahme?",
    a: "Nein. Ob eine Wohnung abgenommen wird, hängt vom Mietvertrag, vom tatsächlichen Zustand und von der Entscheidung des Vermieters ab. FLOXANT kann die Reinigung und Vorbereitung aber realistischer strukturieren.",
  },
  {
    q: "Wann sollte die Endreinigung geplant werden?",
    a: "Am besten nach dem Auszug und vor dem Vermietertermin. Wichtig ist, dass Restgegenstände, Zugang und Schlüssel vorab geklärt sind.",
  },
  {
    q: "Welche Angaben helfen für eine schnelle Einschätzung?",
    a: "Fläche, Zimmerzahl, Fotos, Zustand, Termin, Adresse, besondere Bereiche wie Küche, Bad, Fenster und Nebenflächen.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/reinigung-checkliste-uebergabe",
    title: "Reinigung zur Wohnungsübergabe | Checkliste ohne falsche Versprechen",
    description:
      "Checkliste für Endreinigung und Wohnungsübergabe: Küche, Bad, Böden, Fenster, Nebenflächen, Schlüssel und Fotos realistisch vorbereiten.",
    keywords: [
      "Reinigung Wohnungsübergabe",
      "Endreinigung Checkliste",
      "Wohnungsübergabe Reinigung",
      "Regensburg",
      "Bayern",
    ],
  });
}

export default function BlogPost() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Reinigung zur Wohnungsübergabe: Was wirklich zählt",
    description:
      "Eine realistische Checkliste für Endreinigung, Übergabevorbereitung und typische Problemstellen vor dem Vermietertermin.",
    author: { "@type": "Organization", name: "FLOXANT" },
    publisher: { "@type": "Organization", name: "FLOXANT", url: "https://www.floxant.de" },
    datePublished: "2026-03-18",
    dateModified: "2026-05-01",
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_44%,#f5f8fc_100%)] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumbs
        lang="de"
        items={[{ label: "Blog", href: "/blog" }, { label: "Reinigung zur Wohnungsübergabe" }]}
      />

      <article className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <header className="rounded-[2.4rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Wohnungsübergabe
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.018em] text-slate-950 md:text-6xl">
              Reinigung zur Wohnungsübergabe: Was wirklich zählt
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Eine Übergabereinigung ist keine normale Unterhaltsreinigung. Nach dem Auszug
              sieht man plötzlich Details, die vorher verdeckt waren: Kalk, Staub, Fettspuren,
              Möbelkanten, Nebenflächen und Restgegenstände. Genau diese Punkte sollten vor dem
              Vermietertermin realistisch geprüft werden.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/rechner?service=reinigung" className="flox-button-primary px-6">
                Reinigungsaufwand einschätzen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/buchung" className="flox-button-secondary px-6">
                Fall schildern
              </Link>
            </div>
          </header>

          <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-xl shadow-slate-950/15">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                Die kurze Antwort
              </div>
              <p className="mt-4 text-base leading-8 text-slate-200">
                Eine Wohnung ist vor der Übergabe nicht automatisch bereit, nur weil sie leer ist.
                Entscheidend sind sichtbare Details, Nebenflächen, Fotos, Schlüssel und ein
                realistisches Zeitfenster. FLOXANT kann in Regensburg und Bayern helfen, Reinigung
                und Übergabevorbereitung sauberer zu planen, ohne eine Kautions- oder
                Abnahmezusage zu versprechen.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Typische Stellen, die bei der Übergabe auffallen
              </h2>
              <div className="mt-5 grid gap-3">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.15rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 md:p-9">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Warum klare Vorprüfung besser ist als ein pauschales Versprechen
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Reinigung hängt stark vom Zustand ab. Eine Küche nach langer Nutzung braucht andere
              Arbeit als eine fast leere Wohnung. Ein Bad mit Kalkspuren ist nicht mit einem
              frisch renovierten Bad vergleichbar. Deshalb ist eine ehrliche Einschätzung wichtiger
              als eine schöne, aber ungenaue Zusage.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-700">
              FLOXANT prüft Fläche, Zustand, Termin, Fotos und gewünschtes Ergebnis. Wenn zur
              Reinigung noch Rest-Entrümpelung, Schlüsselübergabe oder Fotodokumentation gehören,
              sollte das vorab gemeinsam gedacht werden. So sinkt das Risiko, dass am Ende zwar
              geputzt wurde, aber die Übergabe trotzdem organisatorisch offen bleibt.
            </p>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {faqItems.map((item) => (
              <article
                key={item.q}
                className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              >
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </article>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}
