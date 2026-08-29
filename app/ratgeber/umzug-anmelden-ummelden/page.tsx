import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { buildFaqJsonLd } from "@/lib/structured-data";

const path = "/ratgeber/umzug-anmelden-ummelden";
const faqItems = [
  {
    q: "Wo prüfe ich die aktuell geltenden Fristen?",
    a: "Prüfen Sie Fristen und Verfahren direkt bei der für Ihren neuen Wohnort zuständigen Behörde oder Stelle. Dieser Ratgeber ersetzt keine amtliche Auskunft.",
  },
  {
    q: "Welche Unterlagen sollte ich vor einem Termin prüfen?",
    a: "Die zuständige Stelle nennt die aktuell erforderlichen Nachweise. Prüfen Sie dort Terminweg, Identitätsnachweise, wohnungsbezogene Bestätigungen und Besonderheiten Ihres Falls.",
  },
  {
    q: "Übernimmt FLOXANT persönliche Ummeldungen?",
    a: "Nein. Persönliche Behörden-, Vertrags- und Identitätsangelegenheiten bleiben bei Ihnen. FLOXANT kann transportbezogene Eckdaten und den Umzugsablauf einordnen.",
  },
  {
    q: "Wie behalte ich Adressänderungen im Blick?",
    a: "Führen Sie eine eigene Liste nach Bereichen wie Wohnen, Energie, Kommunikation, Arbeit, Bank, Versicherungen, Mobilität und Abonnements und dokumentieren Sie den jeweiligen Bearbeitungsstand.",
  },
] as const;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    pageLocale: "de",
    path,
    title: "Umzug anmelden und ummelden: eigene Aufgaben im Blick",
    description: "Organisatorische Übersicht für persönliche Ummeldungen und Adressänderungen. Zuständigkeiten, Unterlagen und aktuelle Fristen bei den jeweiligen Stellen prüfen.",
  });
}

export default function Article() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqItems)) }} />
      <div className="mx-auto max-w-4xl px-5 pt-10 sm:px-8">
        <Breadcrumbs lang="de" items={[{ label: "Ratgeber", href: "/ratgeber" }, { label: "Anmelden und ummelden" }]} />
      </div>

      <section className="px-5 pb-12 pt-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">FLOXANT Ratgeber</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Umzug anmelden und ummelden: Aufgaben sauber trennen</h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
            Bei einem Wohnungswechsel laufen Transport, Übergabe, Verträge und persönliche Verwaltungsaufgaben parallel.
            Diese Übersicht hilft bei der Organisation, enthält aber keine Rechtsberatung und keine verbindlichen Fristen.
            Prüfen Sie aktuelle Anforderungen direkt bei der jeweils zuständigen Behörde, Einrichtung oder Vertragsstelle.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">Persönliche Aufgaben</h2>
            <p className="mt-4 leading-8 text-slate-700">
              Wohnsitzbezogene Meldungen, Identitätsunterlagen, Fahrzeugfragen und persönliche Verträge können nur Sie
              oder eine berechtigte Person klären. Nutzen Sie die offiziellen Informationen Ihres neuen Wohnorts und
              notieren Sie Zuständigkeit, Terminweg, benötigte Nachweise und aktuellen Bearbeitungsstand.
            </p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">Transportbezogene Aufgaben</h2>
            <p className="mt-4 leading-8 text-slate-700">
              Für die Umzugsplanung zählen Start und Ziel, Termin, Volumen, Etagen, Aufzüge, Laufwege, Parkmöglichkeit,
              Sonderstücke und gewünschte Eigenleistungen. Diese Angaben kann FLOXANT prüfen; persönliche Ummeldungen
              oder Behördenvertretung sind damit nicht verbunden.
            </p>
          </article>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <h2 className="text-3xl font-black">Eine eigene Änderungsliste anlegen</h2>
            <p className="mt-4 leading-8 text-slate-700">
              Gliedern Sie die Liste nach Wohnen und Energie, Telefon und Internet, Arbeitgeber oder Ausbildung,
              Bank und Versicherungen, Mobilität, Gesundheits- und Mitgliedschaftsthemen sowie Abonnements und
              Lieferdiensten. Nicht jede Position gilt für jeden Haushalt. Vermerken Sie deshalb nur relevante
              Stellen und speichern Sie Bestätigungen so, dass Sie sie später wiederfinden.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-black">Vor dem Umzugstag prüfen</h2>
            <p className="mt-4 leading-8 text-slate-700">
              Halten Sie Schlüsseltermine, Übergabe, Ansprechpartner und Zähler- oder Zustandsdokumentation getrennt
              von der Transportliste fest. Persönliche Dokumente, Zugangsdaten, Medikamente, Schlüssel und Wertsachen
              gehören nicht in normale Umzugskartons. Bei Unsicherheit zu einer amtlichen Pflicht ist die offizielle
              Stelle die maßgebliche Quelle.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black">Häufige Fragen</h2>
            <div className="mt-6 grid gap-4">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <summary className="cursor-pointer text-lg font-black">{item.q}</summary>
                  <p className="mt-3 leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-8">
            <Link href="/ratgeber" className="rounded-lg border border-slate-300 px-5 py-3 font-bold">Alle Ratgeber</Link>
            <Link href="/regensburg/umzug" className="rounded-lg bg-slate-950 px-5 py-3 font-bold text-white">Umzug Regensburg anfragen</Link>
            <Link href="/blog/umzug-planen-schritt-fuer-schritt" className="rounded-lg border border-slate-300 px-5 py-3 font-bold">Umzug weiter planen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
