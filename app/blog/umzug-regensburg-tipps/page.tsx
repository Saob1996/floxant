
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Umzug in Regensburg planen: Zugang, Parken, Laufwege | FLOXANT Blog",
  description: "Wie Sie Ihren Umzug in Regensburg und der Oberpfalz mit Zugang, Parkmöglichkeit, Volumen und Termin besser vorbereiten."
};

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
          <p></p>
# Umzug in Regensburg: die Punkte, die wirklich zählen
<p></p>
<p>Ein Umzug in Regensburg braucht vor allem klare Angaben. In der Altstadt, im Westenviertel oder im Landkreis entscheiden oft Zugang, Parkmöglichkeit, Etage und Laufweg.</p>
<p></p>
### 1. Zugang und Laufwege früh planen
<p>Besonders in den zentrumsnahen Lagen Regensburgs sind Ladeweg, Etage und Parkmöglichkeit früh zu klären. Wir von FLOXANT prüfen diese Punkte vorab mit den Angaben in Ihrer Anfrage.</p>
<p></p>
### 2. Das richtige Volumen kalkulieren
<p>Viele unterschätzen die Menge an Kartons. Nutzen Sie unseren Online-Rechner, um eine erste Einschätzung zu erhalten.</p>
<p></p>
### 3. Nachhaltig umziehen
<p>Packdecken, stabile Kartons und klare Beschriftung helfen mehr als Hektik am Einsatztag. Je besser vorbereitet wird, desto ruhiger läuft der Transport.</p>
<p>    </p>
        </article>

        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="rounded-3xl bg-blue-600/10 p-10 text-center">
            <h2 className="mb-4 text-2xl font-bold">Umzug kurz einordnen lassen?</h2>
            <p className="mb-8 text-white/60">Senden Sie Ort, Umfang, Etage, Parkmöglichkeit und Termin. FLOXANT prüft den passenden Rahmen.</p>
            <a href="/rechner" className="btn-premium inline-flex py-4 px-10 rounded-2xl bg-blue-600 font-bold uppercase tracking-widest">
              Jetzt anfragen
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
  
