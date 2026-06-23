import { germanText } from "@/lib/german-text";

type ProcessProofStepsProps = {
  title?: string;
  intro?: string;
  steps?: readonly string[];
  className?: string;
};

const defaultSteps = [
  "Anfrage mit Ort, Leistung und Kontaktweg senden",
  "Fotos, Angebot oder kurze Lage optional ergänzen",
  "FLOXANT ordnet Umfang, offene Punkte und Machbarkeit ein",
  "Rückfragen, Angebotspfad oder nächster Schritt werden klar",
] as const;

export function ProcessProofSteps({
  title = "So wird aus einer Anfrage ein prüfbarer nächster Schritt",
  intro = "Der Ablauf bleibt sichtbar und statisch. Beim Seitenbesuch wird keine Lead-API ausgelöst.",
  steps = defaultSteps,
  className = "",
}: ProcessProofStepsProps) {
  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="ProcessProofSteps">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Prozessbeweis</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                {index + 1}
              </div>
              <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{germanText(step, step)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
