
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalendarDays, Trash2, CheckCircle } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const pageLocale = "de";
  return generatePageSEO({
    pageLocale,
    path: 'blog/entrumpelung-kosten-bayern',
    title: "Entrümpelungskosten in Bayern realistisch einschätzen",
    description: "Welche Angaben den Aufwand einer Entrümpelung bestimmen: Menge, Material, Etage, Laufweg, Zufahrt, Sortierung, Entsorgung und Zielzustand.",
  });
}

export default async function BlogEntruempelungKosten() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Entrümpelung Kosten Bayern" }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20 text-slate-900">
        <div className="mb-8"><Breadcrumbs lang="de" items={breadcrumbs} /></div>
        <article>
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 15. April 2026</span>
              <span className="flex items-center gap-1"><Trash2 className="w-4 h-4" /> Entrümpelung</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
              Entrümpelung in Bayern: Kosten, Planung und Wertanrechnung
            </h1>
          </header>
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
            <p>
              Für eine Entrümpelung gibt es keinen belastbaren Einheitspreis ohne Angaben zum Objekt.
              Zwei Wohnungen mit derselben Fläche können einen deutlich anderen Aufwand verursachen:
              Entscheidend sind Menge, Materialarten, Gewicht, Etage, Laufwege, Zufahrt, Sortierung und
              der gewünschte Zustand nach der Räumung. Eine seriöse Anfrage beschreibt deshalb nicht nur
              Quadratmeter, sondern den konkreten Inhalt und die Bedingungen vor Ort.
            </p>

            <h2>Diese Faktoren verändern den Aufwand</h2>
            <p>
              Fotos aus jedem Raum, vom Keller oder Dachboden sowie von Treppenhaus und Zufahrt helfen bei
              der ersten Einordnung. Schwere Gegenstände, enge Wege, fehlender Aufzug und lange Tragewege
              benötigen mehr Personal und Zeit. Auch gemischte Materialien können zusätzliche Sortier- oder
              Entsorgungsschritte auslösen. Sonderstoffe und unbekannte Inhalte müssen getrennt benannt und
              gegebenenfalls durch dafür geeignete Stellen bewertet werden.
            </p>
            <ul>
              <li><strong>Menge:</strong> Fotos, Raumzahl und eine grobe Volumenschätzung statt nur Wohnfläche.</li>
              <li><strong>Zugang:</strong> Etage, Aufzug, Treppenbreite, Laufweg und Haltemöglichkeit.</li>
              <li><strong>Material:</strong> Möbel, Hausrat, Elektrogeräte, Metall, Holz und besondere Funde getrennt nennen.</li>
              <li><strong>Zielzustand:</strong> Nur räumen, besenrein übergeben oder zusätzliche Reinigung prüfen.</li>
              <li><strong>Termin:</strong> Wunschtermin, feste Übergabe und ein mögliches Ersatzzeitfenster angeben.</li>
            </ul>

            <h2>Warum Wertanrechnung nicht pauschal möglich ist</h2>
            <p>
              Ein Gegenstand ist nicht automatisch anrechenbar, nur weil er einmal teuer war. Zustand,
              Vollständigkeit, Nachfrage, Transportfähigkeit und tatsächlich bestätigte Abnahme sind wichtig.
              Deshalb sollte ein möglicher Wert nie vor der Sichtung als feste Gutschrift eingeplant werden.
              Persönliche Dokumente, Erinnerungsstücke und unklare Fundstücke werden außerdem nicht wie
              gewöhnlicher Hausrat behandelt: Berechtigung und gewünschter Umgang müssen vorab geklärt sein.
            </p>

            <h2>So wird eine Anfrage vergleichbar</h2>
            <p>
              Senden Sie allen angefragten Dienstleistern denselben Umfang. Notieren Sie Räume, Nebenflächen,
              sichtbare Menge, schwere Einzelstücke, Zugang, Entfernung zum Fahrzeug und den Zielzustand.
              Fragen Sie, welche Leistungen enthalten sind und welche Positionen erst nach Besichtigung oder
              Rückfrage bestätigt werden. So vergleichen Sie Leistungsumfang statt nur eine Endsumme.
            </p>
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 my-10">
              <h3 className="mt-0 text-emerald-900 flex items-center gap-2"><CheckCircle className="text-emerald-600" /> Vor der Anfrage bereithalten</h3>
              <p className="text-emerald-800">
                Ort oder PLZ, Fotos, Räume und Nebenflächen, Etage, Aufzug, Park- und Laufweg,
                schwere oder sensible Gegenstände, Wunschtermin und gewünschter Endzustand. FLOXANT prüft
                anschließend Einsatzgebiet, Umfang und Machbarkeit; daraus entsteht noch keine automatische Zusage.
              </p>
            </div>

            <p>
              Für eine konkrete Einordnung können Sie den Regensburger Räumungsbereich öffnen oder zunächst
              einen kurzen Anfragebrief mit den bekannten Eckdaten vorbereiten.
            </p>
            <div className="not-prose flex flex-wrap gap-3">
              <Link href="/regensburg/entruempelung" className="rounded-lg bg-slate-950 px-5 py-3 font-bold text-white">
                Entrümpelung Regensburg prüfen
              </Link>
              <Link href="/objektbrief" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-bold text-slate-900">
                Anfragebrief vorbereiten
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
