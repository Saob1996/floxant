
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";

export const metadata = generatePageSEO({
  path: "/blog/umzug-regensburg-tipps",
  title: "Umzug in Regensburg planen: Zugang, Parken, Laufwege | FLOXANT Blog",
  description: "Umzug in Regensburg mit Start, Ziel, Volumen, Etage, Aufzug, Parkmöglichkeit, Laufwegen, Möbelmontage und Übergabe besser vorbereiten.",
});

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0A0B10] py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs lang="de" items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "umzug-regensburg-tipps" }
        ]} />
        
        <header className="mb-16 mt-12 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
            Umzug in Regensburg planen: Zugang, Parken, Laufwege
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            So bereiten Sie Ihren Umzug in Regensburg und der Oberpfalz mit klaren Eckdaten besser vor.
          </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Die fünf Angaben, ohne die kein Umzug belastbar planbar ist</h2>
          <p>
            Ein Umzug in Regensburg beginnt mit Start, Ziel, gewünschtem Zeitraum, Umfang und Zugang. Dazu gehören
            Etage, Aufzug, Laufwege und eine realistische Haltemöglichkeit. Erst diese Kombination zeigt, wie viel
            Tragezeit, Fahrzeugraum und Abstimmung nötig sein können. Eine erste Anfrage darf kurz sein, sollte diese
            Eckdaten aber nicht durch eine pauschale Frage nach Preis oder Verfügbarkeit ersetzen.
          </p>

          <h2>Zugang und Laufwege früh dokumentieren</h2>
          <p>
            In Altstadtlagen, dicht bebauten Straßen oder Gebäuden mit engem Treppenhaus können wenige Meter einen
            großen Unterschied machen. Hilfreich sind Fotos vom Hauseingang, Treppenhaus, Aufzug und dem Weg zwischen
            möglichem Ladepunkt und Tür. Nennen Sie auch Innenhöfe, Stufen, niedrige Durchgänge oder zeitlich
            begrenzte Zugänge. FLOXANT prüft diese Punkte vor einer Zusage; eine Anfrage reserviert weder Ladefläche
            noch Termin.
          </p>

          <h2>Volumen nicht nur in Kartons denken</h2>
          <p>
            Eine Kartonzahl allein beschreibt den Umzug selten vollständig. Große Schränke, Sofas, Betten,
            Elektrogeräte, Kellerinhalt und zerlegbare Möbel beeinflussen Volumen und Arbeitsaufwand. Eine Liste der
            größeren Stücke und einige Übersichtsaufnahmen sind meist hilfreicher als eine sehr genaue, aber
            unvollständige Schätzung. Bei Klavier, Tresor oder anderen Sonderstücken sind Maße, Gewicht soweit bekannt,
            Etagen und Zugangsaufnahmen nötig.
          </p>

          <h2>Montage, Packhilfe und Reinigung als eigene Punkte nennen</h2>
          <p>
            Wer Möbelmontage, Kartons, Packhilfe, Entrümpelung oder Endreinigung benötigt, sollte das von Anfang an
            getrennt aufführen. So bleibt erkennbar, was zum Transport gehört und welche Zusatzleistung geprüft wird.
            Auch bei einer Wohnungsübergabe ist der gewünschte Zustand wichtig: leer, besenrein oder mit gesondert
            vereinbarter Reinigung sind unterschiedliche Ziele. Eine Abnahme oder Kautionsentscheidung kann nicht
            garantiert werden.
          </p>

          <h2>Preisfaktoren statt erfundener Pauschalpreise</h2>
          <p>
            Typische Faktoren sind Volumen, Kartons, Etagen, Aufzug, Laufweg, Parkmöglichkeit, Entfernung,
            Terminfenster, Demontage, Packhilfe und Sonderstücke. Ein Rechner kann eine erste Orientierung geben,
            ersetzt aber keine Prüfung der tatsächlichen Angaben. Ein konkretes Angebot sollte den Umfang und
            mögliche Zusatzpositionen nachvollziehbar benennen. Ein niedrigerer Preis oder kurzfristiger Termin wird
            dadurch nicht automatisch versprochen.
          </p>

          <h2>So geht es nach der Anfrage weiter</h2>
          <ol>
            <li>Start, Ziel, Zeitraum, Etagen und Aufzug senden.</li>
            <li>Möbelliste, Kartonzahl, Fotos und Sonderstücke ergänzen.</li>
            <li>Laufweg, Haltemöglichkeit und gewünschte Zusatzleistungen klären.</li>
            <li>Offene Rückfragen beantworten und den bestätigten Leistungsumfang prüfen.</li>
            <li>Erst nach beiderseitiger Bestätigung mit einem verbindlichen Termin rechnen.</li>
          </ol>
        </article>

        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="rounded-3xl bg-blue-600/10 p-10 text-center">
            <h2 className="mb-4 text-2xl font-bold">Umzug kurz einordnen lassen?</h2>
            <p className="mb-8 text-white/60">Senden Sie Ort, Umfang, Etage, Parkmöglichkeit und Termin. FLOXANT prüft den passenden Rahmen.</p>
            <Link href="/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg-blog&source=blog" className="btn-premium inline-flex py-4 px-10 rounded-2xl bg-blue-600 font-bold uppercase tracking-widest">
              Umzug anfragen
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
  
