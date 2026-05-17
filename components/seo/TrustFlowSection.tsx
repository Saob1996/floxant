import Link from "next/link";
import { ArrowRight, CircleDashed, FileCheck2, Handshake, ShieldCheck } from "lucide-react";

const requestQualityLabel = "Sauberer Ablauf";

const requestFlow = [
  {
    step: "01",
    title: "Fall richtig einordnen",
    text: "Buchung, Rechner, Geschäftskunde oder sensible Anfrage: Der Einstieg soll zum Fall passen, damit nichts doppelt erklärt werden muss.",
    Icon: CircleDashed,
  },
  {
    step: "02",
    title: "Risiken früh sichtbar machen",
    text: "Zugang, Umfang, Terminlage, Schlüssel, Reinigung, Restmengen und Extras werden ruhig aufgenommen und nicht hektisch zusammengeschoben.",
    Icon: FileCheck2,
  },
  {
    step: "03",
    title: "Mit echtem nächsten Schritt weitergehen",
    text: "FLOXANT meldet sich mit klarer Einordnung zurück, nicht mit Scheingenauigkeit oder einem Preis, der den tatsächlichen Aufwand ausblendet.",
    Icon: Handshake,
  },
];

const trustPoints = [
  "Klarer Weg statt Vergleichsportal-Hektik",
  "Ruhige Führung statt Werbe-Lärm",
  "Saubere Übergabe statt unklarer Zuständigkeit",
];

export function TrustFlowSection({ sectionId = "ablauf" }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="section-glow content-auto relative px-6 pb-20">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="glass-elevated px-6 py-6 md:px-8 md:py-8">
            <div className="flox-overline text-blue-700">
              So läuft die Anfrage
            </div>
            <h2 className="flox-title-lg flox-display-section mt-4 max-w-[14ch] text-slate-950">
              Vertrauen entsteht durch Klarheit, nicht durch Lautstärke
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-700">
              Eine gute Anfrage muss nicht kompliziert sein. Sie muss nur die Punkte klären,
              die später entscheidend werden: Volumen, Laufwege, Termin, Reinigung,
              Zugang und Übergabe.
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">
              Kurz gesagt: lieber einmal realistisch prüfen als später zweimal improvisieren.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flox-tag-soft"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0 text-blue-700" />
                  <span className="text-sm font-semibold text-slate-800">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/buchung"
                className="flox-button-primary h-11 px-5"
              >
                Direkt anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/rechner"
                className="flox-button-secondary h-11 px-5"
              >
                Rechner starten
              </Link>
              <Link
                href="/express-anfrage"
                className="flox-button-quiet h-11 border-cyan-200 bg-cyan-50 px-5 text-cyan-900"
              >
                Express-Check
              </Link>
            </div>
          </div>

          <div className="glass-elevated px-6 py-6 md:px-8 md:py-8">
            <div className="flox-overline text-blue-700">
              Anfrage-Qualität zuerst
            </div>
            <h3 className="flox-title-lg flox-display-section-tight mt-4 max-w-[16ch] text-slate-950">
              Ein guter Ablauf wirkt ruhiger, schneller und viel glaubwürdiger
            </h3>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-700">
              Erst die richtige Spur wählen, dann ordentlich prüfen und erst danach konkret
              weitergehen. Für Kunden bedeutet das weniger Sucherei, weniger Rückfragen und
              einen nächsten Schritt, der wirklich zum Auftrag passt.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {requestFlow.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.step} className="card-premium card-depth p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flox-icon-tile h-11 w-11">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="flox-action-meta text-slate-400">
                        {item.step}
                      </span>
                    </div>
                    <div className="flox-overline mt-5 text-blue-700">
                      {requestQualityLabel}
                    </div>
                    <h4 className="flox-card-title mt-2 text-slate-950">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
