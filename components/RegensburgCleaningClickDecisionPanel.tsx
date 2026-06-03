import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const decisionRows: Array<{
  signal: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  Icon: LucideIcon;
  checks: string[];
}> = [
  {
    signal: "Preis oder Kosten",
    title: "Kosten erst einordnen, dann Angebot",
    text: "Wer nach Reinigung Kosten Regensburg sucht, braucht keine Fantasie-Zahl. Wichtig sind Fläche, Zustand, Fotos, Turnus und Zeitfenster.",
    href: "/gewerbereinigung-regensburg#kontaktformular",
    cta: "Anfrage vorbereiten",
    Icon: FileText,
    checks: ["m² und Objektart", "Fotos vom Zustand", "Turnus oder Anlass"],
  },
  {
    signal: "Laufende Reinigung",
    title: "Für Büro, Praxis, Kanzlei und Objektbetrieb",
    text: "Wenn Reinigung regelmäßig laufen soll, führt die Unterhaltsreinigung schneller zum passenden Reinigungsplan.",
    href: "/unterhaltsreinigung-regensburg",
    cta: "Turnus wählen",
    Icon: ClipboardCheck,
    checks: ["Frequenz", "Leistungsverzeichnis", "Randzeiten"],
  },
  {
    signal: "Einzug, Auszug, Leerstand",
    title: "Starke Verschmutzung ehrlich prüfen",
    text: "Bei Küche, Bad, Böden, Leerstand oder Übergabe entscheidet der reale Zustand. Fotos sparen Rückfragen und falsche Erwartungen.",
    href: "/grundreinigung-regensburg",
    cta: "Grundreinigung öffnen",
    Icon: Camera,
    checks: ["Zustand", "Deadline", "Schwerpunkte"],
  },
  {
    signal: "Besondere Situation",
    title: "Fenster, Teppich, Bau oder Treppenhaus direkt wählen",
    text: "Spezielle Suchbegriffe brauchen spezielle Angaben: Fensterzahl, Material, Bauphase, Etagen oder Zugang.",
    href: "#reinigungsservice-regensburg",
    cta: "Service finden",
    Icon: Sparkles,
    checks: ["Fenster/Glas", "Teppich/Polster", "Bau/Treppenhaus"],
  },
];

const snippetLines = [
  "Putzfirma Regensburg gesucht: FLOXANT fragt Fläche, Zustand, Fotos und Termin ab, bevor ein seriöses Angebot entsteht.",
  "Büroreinigung Regensburg: Arbeitsplätze, Küche, Sanitär, Empfang und Randzeiten sauber abstimmen.",
  "Fenster, Teppich, Bau oder Treppenhaus: passende Reinigungsart direkt wählen statt allgemeine Anfrage verlieren.",
];

export function RegensburgCleaningClickDecisionPanel() {
  return (
    <section id="klickentscheidung-regensburg" className="flox-section pt-0">
      <div className="flox-shell">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">
              <CheckCircle2 className="h-4 w-4" />
              Richtige Anfrage
            </div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Schneller zur richtigen Reinigungsanfrage in Regensburg.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Mehr Anfragen entstehen, wenn Kunden ihre Situation sofort wiederfinden:
              Kosten, laufende Reinigung, Auszug, Fenster, Teppich, Baustaub oder Treppenhaus.
            </p>

            <div className="mt-6 grid gap-3">
              {snippetLines.map((line) => (
                <div key={line} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
                  {line}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2 xl:pr-40 2xl:pr-44">
            {decisionRows.map((item) => {
              const Icon = item.Icon;

              return (
                <article key={item.signal} className="flox-panel rounded-[1.5rem] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700">
                        {item.signal}
                      </p>
                      <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-700">{item.text}</p>

                  <div className="mt-5 grid gap-2">
                    {item.checks.map((check) => (
                      <div key={check} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-900">
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
