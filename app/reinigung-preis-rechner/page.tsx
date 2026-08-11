import type { Metadata } from "next";
import Link from "next/link";

import CleaningCalculator from "@/components/calculator/cleaning/CleaningCalculator";
import { generatePageSEO } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "reinigung-preis-rechner",
    title: "Reinigungskosten unverbindlich einschätzen | FLOXANT",
    description:
      "Reinigungsaufwand in drei kurzen Schritten einordnen: Objekt, Fläche, Reinigungsart und passende Ergänzungen. Ergebnis ohne Kontaktdaten und ohne unbestätigte Preisangabe.",
  });
}

const explanationCards = [
  {
    title: "Was berücksichtigt wird",
    text: "Objektart, ungefähre Fläche, Reinigungsart, Zustand, Turnus, Fensterumfang und ausgewählte Ergänzungen.",
  },
  {
    title: "Was noch geprüft wird",
    text: "Genaue Raumaufteilung, Materialbedarf, Zugang, Termin, Team und Besonderheiten, die erst auf Fotos sichtbar werden.",
  },
  {
    title: "Warum Ergebnisse variieren",
    text: "Zustand, Nutzung, Erreichbarkeit und gewünschter Zielzustand können den Aufwand bei gleicher Fläche deutlich verändern.",
  },
  {
    title: "Wie es weitergeht",
    text: "Nach der Einschätzung können Sie das Ergebnis in eine unverbindliche Anfrage übernehmen und offene Punkte ergänzen.",
  },
] as const;

const cleaningQuestions = [
  {
    question: "Muss die Fläche bereits genau bekannt sein?",
    answer: "Nein. Eine ungefähre Fläche genügt. Wenn sie noch nicht bekannt ist, können Sie das ausdrücklich auswählen; die offene Angabe wird im Ergebnis sichtbar genannt.",
  },
  {
    question: "Welche Reinigungsarten lassen sich einordnen?",
    answer: "Sie können eine einmalige oder regelmäßige Reinigung, eine Übergabe, Fenster und Glas sowie eine Reinigung nach Bau oder Renovierung auswählen.",
  },
  {
    question: "Erzeugt der Rechner einen verbindlichen Reinigungspreis?",
    answer: "Nein. Ohne fachlich bestätigte Preisgrundlage zeigt der Rechner eine verständliche Aufwandsstufe und die noch zu prüfenden Angaben, keinen scheinpräzisen Eurobetrag.",
  },
  {
    question: "Kann ich Fenster oder stärkere Verschmutzung ergänzen?",
    answer: "Ja. Passende Zusatzbereiche erscheinen erst nach Ihrer Auswahl. Fensterumfang, Küche, Sanitär oder stärkere Verschmutzung können optional berücksichtigt werden.",
  },
  {
    question: "Wie sende ich die Einschätzung an FLOXANT?",
    answer: "Über „Ergebnis als Anfrage senden“ übernehmen Sie die Zusammenfassung in das Anfrageformular. Erst dort ergänzen Sie die für eine Rückmeldung benötigten Kontaktdaten.",
  },
] as const;

export default function CleaningCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-slate-50 pb-20 text-slate-950">
      <section className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50 to-slate-50 px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <Link href="/rechner" className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-black text-emerald-800 underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">
            Zur Rechnerauswahl
          </Link>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Reinigungsaufwand einfach einordnen
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Wählen Sie Objekt, Fläche, Reinigungsart und passende Ergänzungen. Die Einordnung zeigt,
            welche Faktoren berücksichtigt wurden und bleibt bis zum Ergebnis vollständig ohne Kontaktdaten.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14" aria-label="Reinigungsrechner">
        <CleaningCalculator />
      </section>

      <section className="px-4 sm:px-6" aria-labelledby="cleaning-calculator-explained">
        <div className="mx-auto max-w-5xl">
          <h2 id="cleaning-calculator-explained" className="text-center text-3xl font-black tracking-tight">
            Eine Orientierung, kein automatisch erzeugter Festpreis
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {explanationCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-12 sm:px-6 sm:pt-16" aria-labelledby="cleaning-calculator-questions">
        <div className="mx-auto max-w-4xl">
          <h2 id="cleaning-calculator-questions" className="text-center text-3xl font-black tracking-tight">
            Fragen zur Reinigungseinschätzung
          </h2>
          <div className="mt-7 space-y-3">
            {cleaningQuestions.map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 open:border-emerald-200">
                <summary className="cursor-pointer font-black text-slate-950 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">
                  {item.question}
                </summary>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
