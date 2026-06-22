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
    signal: "Budget klären",
    title: "Erst Eckdaten senden, dann realistisch entscheiden",
    text: "Für eine brauchbare Rückmeldung reichen Quadratmeter allein nicht aus. Wichtig sind Fläche, Zustand, Fotos, Turnus, Zugang und Zeitfenster.",
    href: "/regensburg/gewerbereinigung#kontaktformular",
    cta: "Eckdaten senden",
    Icon: FileText,
    checks: ["m² und Objektart", "Fotos vom Zustand", "Turnus oder Anlass"],
  },
  {
    signal: "Regelmäßig sauber",
    title: "Für Büro, Praxis, Kanzlei und Objektbetrieb",
    text: "Wenn Reinigung regelmäßig laufen soll, braucht FLOXANT Raumliste, Turnus, Randzeiten, Zugang und Ansprechpartner.",
    href: "/unterhaltsreinigung-regensburg",
    cta: "Turnus wählen",
    Icon: ClipboardCheck,
    checks: ["Frequenz", "Leistungsverzeichnis", "Randzeiten"],
  },
  {
    signal: "Auszug oder Leerstand",
    title: "Zustand ehrlich prüfen",
    text: "Bei Küche, Bad, Böden, Leerstand oder Übergabe entscheidet der reale Zustand. Fotos sparen Rückfragen und falsche Erwartungen.",
    href: "/grundreinigung-regensburg",
    cta: "Grundreinigung öffnen",
    Icon: Camera,
    checks: ["Zustand", "Deadline", "Schwerpunkte"],
  },
  {
    signal: "Spezialfall",
    title: "Fenster, Teppich, Bau oder Treppenhaus einordnen",
    text: "Besondere Reinigungen brauchen konkrete Angaben: Fensterzahl, Material, Bauphase, Etagen, Zugang und gewünschter Zeitpunkt.",
    href: "#reinigungsservice-regensburg",
    cta: "Service finden",
    Icon: Sparkles,
    checks: ["Fenster/Glas", "Teppich/Polster", "Bau/Treppenhaus"],
  },
];

const snippetLines = [
  "Für Reinigung in Regensburg helfen Fläche, Zustand, Fotos und Termin vor der ersten Rückmeldung.",
  "Bei Büroreinigung werden Arbeitsplätze, Küche, Sanitär, Empfang und Randzeiten getrennt betrachtet.",
  "Fenster, Teppich, Bau oder Treppenhaus sollten klar benannt werden, damit Umfang und Material verständlich bleiben.",
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
              Welche Reinigung passt zu Ihrer Situation?
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Die passende Reinigung wird schneller klar, wenn Ihre Situation direkt sichtbar ist:
              laufende Reinigung, Auszug, Fenster, Teppich, Baustaub, Treppenhaus oder Übergabe.
            </p>

            <div className="mt-6 grid gap-3">
              {snippetLines.map((line) => (
                <div key={line} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
                  {line}
                </div>
              ))}
            </div>
          </article>

          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {decisionRows.map((item) => {
              const Icon = item.Icon;

              return (
                <article key={item.signal} className="flox-panel min-w-0 rounded-[1rem] p-5">
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
