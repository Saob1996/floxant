
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";

export const metadata = generatePageSEO({
  path: "/blog/entruempelung-bayern-leitfaden",
  title: "Entrümpelung in Bayern planen: Umfang, Freigabe, Entsorgung",
  description: "Entrümpelung und Haushaltsauflösung mit Räumen, Fotos, Freigaben, Materialarten, Zugang, Reinigung und Zielzustand nachvollziehbar vorbereiten.",
});

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0A0B10] py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs lang="de" items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Entrümpelung Bayern Leitfaden" }
        ]} />
        
        <header className="mb-16 mt-12 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
            Haushaltsauflösung und Entrümpelung in Bayern seriös planen
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            Ein Leitfaden für klare Freigaben, prüfbare Mengen, getrennte Leistungen und einen nachvollziehbaren Zielzustand.
          </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Entrümpelung beginnt mit einer eindeutigen Freigabe</h2>
          <p>
            Eine Haushaltsauflösung kann organisatorisch und persönlich belastend sein. Bevor etwas getragen wird,
            muss deshalb feststehen, wer entscheiden darf und welches Ergebnis erreicht werden soll. Hilfreich sind
            eine Raumliste, Fotos, die Kennzeichnung persönlicher Gegenstände und eine schriftlich klare Trennung:
            Was bleibt, was wird an eine berechtigte Person übergeben und was darf entfernt werden? Bei einem
            Nachlass ersetzt FLOXANT weder eine rechtliche Beratung noch eine Bewertung von Gegenständen.
          </p>

          <h2>Diese Angaben machen den Aufwand prüfbar</h2>
          <p>
            Für eine erste Einordnung werden Ort, Räume, Menge, Materialarten, Etage, Aufzug, Laufweg,
            Haltemöglichkeit, Fotos und gewünschter Termin benötigt. Ebenso wichtig ist der Zielzustand: Soll nur
            geräumt werden, ist eine Reinigung gewünscht oder steht eine Übergabe an? Ohne diese Angaben wäre jede
            Preis- oder Terminaussage spekulativ. Fotos sollten den tatsächlichen Umfang zeigen, aber keine unnötigen
            persönlichen Dokumente, Kennzeichen oder Zugangscodes enthalten.
          </p>

          <h2>Räumung, Entsorgung und Reinigung getrennt betrachten</h2>
          <p>
            Räumung beschreibt das Sortieren, Tragen und Entfernen freigegebener Gegenstände. Entsorgung betrifft die
            Materialarten und die dafür nötigen Wege. Reinigung ist eine eigene Leistung, deren Umfang vom Zustand und
            vom vereinbarten Ziel abhängt. Diese Trennung hilft, Angebote zu vergleichen. In einem konkreten Angebot
            sollten Arbeitsumfang, Transport, Entsorgungsanteil, Anfahrt, mögliche Zusatzleistungen und Umsatzsteuer
            nachvollziehbar ausgewiesen sein.
          </p>

          <h2>Gefahrstoffe und qualifizierte Sonderfälle</h2>
          <p>
            Asbest, Chemikalien, kontaminierte Materialien, Schimmel oder andere unklare Stoffe sind keine automatisch
            eingeschlossene Standardleistung. Solche Hinweise müssen vorab genannt werden. Erst eine persönliche
            Prüfung kann klären, ob eine geeignete Fachleistung erforderlich ist und ob FLOXANT den Fall überhaupt
            übernehmen kann. Eine Anfrage ist daher noch keine Entsorgungs-, Preis- oder Verfügbarkeitszusage.
          </p>

          <h2>Ein sinnvoller Ablauf in fünf Schritten</h2>
          <ol>
            <li>Berechtigung, Ansprechpartner und Freigaben eindeutig festhalten.</li>
            <li>Räume, Mengen, Zugänge und sensible Gegenstände mit Fotos dokumentieren.</li>
            <li>Räumung, Entsorgung, Reinigung und Übergabe als getrennte Punkte beschreiben.</li>
            <li>Gefahrstoffe oder andere Sonderfälle ausdrücklich kennzeichnen.</li>
            <li>Angebot, Terminfenster, Schlüsselweg und gewünschten Endzustand gemeinsam bestätigen.</li>
          </ol>

          <h2>Was FLOXANT für die nächste Prüfung braucht</h2>
          <p>
            Senden Sie den Ort, eine kurze Raumliste, Fotos, Etage und Zugang, den gewünschten Zeitraum, die
            Freigabesituation und das Ziel nach der Räumung. Wenn bereits ein Angebot vorliegt, können dessen
            Leistungspositionen mitgeschickt werden. FLOXANT prüft die Angaben sachlich, verspricht aber weder eine
            Wertanrechnung noch einen niedrigeren Preis oder einen Termin ohne ausdrückliche Bestätigung.
          </p>
        </article>

        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="rounded-3xl bg-blue-600/10 p-10 text-center">
            <h2 className="mb-4 text-2xl font-bold">Entrümpelung mit echten Eckdaten anfragen</h2>
            <p className="mb-8 text-white/60">Senden Sie Räume, Fotos, Zugang, Freigaben, Termin und Zielzustand. Erst danach wird der passende nächste Schritt geprüft.</p>
            <Link href="/kontakt?service=entruempelung&city=regensburg&intent=entruempelung-bayern-leitfaden&source=blog" className="btn-premium inline-flex py-4 px-10 rounded-2xl bg-blue-600 font-bold uppercase tracking-widest">
              Entrümpelung anfragen
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
  
