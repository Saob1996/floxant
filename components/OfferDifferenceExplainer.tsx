import { AlertTriangle, CheckCircle2, Scale } from "lucide-react";

const differences = [
  {
    title: "Nicht gleicher Umfang",
    text: "Ein Angebot kann günstiger wirken, wenn Reinigung, Etage, Laufweg, Entsorgung oder Zusatzpositionen fehlen.",
  },
  {
    title: "Andere Annahmen",
    text: "Fläche, Volumen, Fotos, Zugang und Terminfenster werden oft unterschiedlich eingeschätzt.",
  },
  {
    title: "Andere Grenzen",
    text: "Manche Angebote schließen bestimmte Leistungen aus oder rechnen sie erst später ab.",
  },
];

export function OfferDifferenceExplainer() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="OfferDifferenceExplainer">
      <div className="mx-auto grid max-w-7xl gap-7 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-700">
            <Scale className="h-4 w-4" />
            Angebote vergleichbar machen
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Warum ein Angebot teuer, billig oder unklar wirken kann
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            FLOXANT vergleicht keine Anbieter-Rankings. Es geht um die praktische Frage, ob Umfang, Termin, Zugang und Zusatzkosten sauber beschrieben sind.
          </p>
          <div className="mt-5 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-950">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            Keine Rechtsberatung, keine Preisgarantie und keine Garantie, dass FLOXANT jedes Angebot unterbieten kann.
          </div>
        </div>
        <div className="grid gap-3">
          {differences.map((item) => (
            <article key={item.title} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              <div>
                <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-700">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
