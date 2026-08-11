import type { Metadata } from "next";
import Link from "next/link";

import { generatePageSEO } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "rechner",
    title: "Aufwand für Umzug oder Reinigung einschätzen | FLOXANT",
    description:
      "Wählen Sie Umzug oder Reinigung und erhalten Sie in drei kurzen Schritten eine unverbindliche Aufwandseinschätzung – ohne Kontaktdaten vor dem Ergebnis.",
  });
}

const calculatorChoices = [
  {
    title: "Umzug einschätzen",
    description:
      "Route, Umfang, Zugang und gewünschte Zusatzleistungen in drei kurzen Schritten einordnen.",
    href: "/umzug-kosten-rechner",
    accent: "border-blue-200 bg-blue-50/70 text-blue-800",
    button: "bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-200",
  },
  {
    title: "Reinigung einschätzen",
    description:
      "Objekt, Reinigungsart und passende Ergänzungen ohne lange Tätigkeitsliste erfassen.",
    href: "/reinigung-preis-rechner",
    accent: "border-emerald-200 bg-emerald-50/70 text-emerald-800",
    button: "bg-emerald-700 hover:bg-emerald-800 focus-visible:ring-emerald-200",
  },
] as const;

export default function CalculatorHubPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-slate-50 px-4 pb-20 pt-12 text-slate-950 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
            FLOXANT Rechner
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Was möchten Sie einschätzen?
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Starten Sie direkt mit dem passenden Rechner. Das Ergebnis ist ohne Namen,
            Telefonnummer oder E-Mail sichtbar.
          </p>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-2" aria-label="Rechner auswählen">
          {calculatorChoices.map((choice) => (
            <article
              key={choice.href}
              className={`flex min-w-0 flex-col rounded-3xl border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${choice.accent}`}
            >
              <h2 className="text-2xl font-black tracking-tight text-slate-950">{choice.title}</h2>
              <p className="mt-3 flex-1 text-base leading-7 text-slate-700">{choice.description}</p>
              <Link
                href={choice.href}
                className={`mt-7 inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-base font-black text-white transition focus:outline-none focus-visible:ring-4 motion-reduce:transition-none ${choice.button}`}
              >
                Rechner öffnen
              </Link>
            </article>
          ))}
        </section>

        <aside className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm leading-6 text-slate-600">
          Die Einschätzung ordnet den voraussichtlichen Aufwand ein. Ein konkretes Angebot
          entsteht erst, nachdem FLOXANT Ihre Angaben geprüft hat.
        </aside>
      </div>
    </main>
  );
}
