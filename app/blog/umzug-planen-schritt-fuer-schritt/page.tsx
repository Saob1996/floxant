
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, CheckCircle } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const pageLocale = "de";
  return generatePageSEO({
    pageLocale,
    path: 'blog/umzug-planen-schritt-fuer-schritt',
    title: "Umzug planen: In 10 Schritten zum Ziel | FLOXANT",
    description: "Umzug planen: Kündigung, Kartons, Zugang, Parken, Transport, Ummeldung und Übergabe Schritt für Schritt vorbereiten.",
  });
}

export default async function BlogUmzugPlanen() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Umzug planen" }
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20 text-slate-900">
        <div className="mb-8"><Breadcrumbs lang="de" items={breadcrumbs} /></div>
        <article>
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 18. März 2026</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 15 Min. Lesezeit</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
              Umzug planen: 10 Schritte, die wirklich helfen
            </h1>
          </header>
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
            <p>
              Eine brauchbare Umzugsplanung verbindet Termine, Menge, Zugang, Transport und Übergabe.
              Die folgenden zehn Schritte helfen, offene Punkte früh zu erkennen. Sie sind eine
              Organisationshilfe: Verträge, behördliche Fragen und individuelle Fristen prüfen Sie immer
              direkt bei der jeweils zuständigen Stelle.
            </p>
            
            <div className="bg-slate-50 p-8 rounded-3xl border my-10">
              <ul className="list-none ps-0 space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-blue-600 mt-1" />
                  <div>
                    <strong>Schritt 1: Ecktermine festhalten</strong>
                    <p className="text-sm text-slate-500">Schlüssel, Auszug, Einzug, Übergabe und persönliche Fristen in einem Kalender sammeln.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-blue-600 mt-1" />
                  <div>
                    <strong>Schritt 2: Umfang Raum für Raum erfassen</strong>
                    <p className="text-sm text-slate-500">Möbel, Kartons, Keller, Dachboden und schwere Einzelstücke notieren oder fotografieren.</p>
                  </div>
                </li>
                {[
                  ["Schritt 3: Aussortieren und Freigaben klären", "Behalten, spenden, verkaufen, entsorgen und unklare persönliche Gegenstände getrennt markieren."],
                  ["Schritt 4: Start und Ziel prüfen", "Etagen, Aufzug, Türbreiten, Treppen, Laufwege, Haltemöglichkeit und Ansprechpartner erfassen."],
                  ["Schritt 5: Eigenleistung festlegen", "Entscheiden, wer packt, demontiert, trägt, transportiert, montiert und reinigt."],
                  ["Schritt 6: Vergleichbare Anfragen senden", "Allen Anbietern dieselben Angaben, Fotos, Leistungen und Zeitfenster geben; offene Positionen benennen lassen."],
                  ["Schritt 7: Packplan erstellen", "Kartons nach Raum und Priorität markieren; Dokumente, Schlüssel, Medikamente und Wertsachen separat behalten."],
                  ["Schritt 8: Zugänge und Wege vorbereiten", "Park- und Ladebedingungen prüfen und erforderliche Abstimmungen rechtzeitig selbst veranlassen."],
                  ["Schritt 9: Umzugstag organisieren", "Kontaktpersonen, Reihenfolge, empfindliche Stücke, Zählerstände und einen kleinen Plan-B-Puffer festlegen."],
                  ["Schritt 10: Übergabe dokumentieren", "Räume, Schlüssel, sichtbaren Zustand und vereinbarte Restaufgaben nachvollziehbar festhalten."],
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start gap-4">
                    <CheckCircle className="text-blue-600 mt-1 shrink-0" />
                    <div>
                      <strong>{title}</strong>
                      <p className="text-sm text-slate-500">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <h2>Was eine belastbare Anfrage enthalten sollte</h2>
            <p>
              Nennen Sie Start, Ziel, Wunschtermin, ein Ersatzzeitfenster, Wohnfläche oder Raumzahl,
              geschätzte Kartons, große Möbel, Etagen, Aufzüge und Parkwege. Fotos von Treppenhaus,
              Zugängen und Sonderstücken reduzieren Rückfragen. Ein Rechnerwert bleibt eine Orientierung;
              Preis, Termin und Machbarkeit werden erst nach Prüfung bestätigt.
            </p>
            <div className="not-prose flex flex-wrap gap-3">
              <Link href="/regensburg/umzug" className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-bold text-white no-underline">
                Umzug Regensburg anfragen
              </Link>
              <Link href="/umzug-kosten-rechner" className="inline-block rounded-lg border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 no-underline">
                Eckdaten im Rechner erfassen
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
