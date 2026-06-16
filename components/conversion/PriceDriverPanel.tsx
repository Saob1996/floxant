import { Banknote, CheckCircle2 } from "lucide-react";

type PriceDriverPanelProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  drivers: readonly string[];
  note?: string;
  className?: string;
};

export function PriceDriverPanel({
  eyebrow = "Preis und Aufwand",
  title = "Aufwandstreiber offen benennen.",
  intro = "Ein realistischer Rahmen entsteht erst, wenn die wichtigsten Einflussfaktoren sichtbar sind.",
  drivers,
  note = "Keine Lockpreise, keine pauschale Zusage: FLOXANT prüft Umfang, Zugang, Termin und Fotos vor dem nächsten Schritt.",
  className = "",
}: PriceDriverPanelProps) {
  return (
    <section className={`bg-slate-50 px-5 py-14 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Banknote className="h-6 w-6 text-amber-700" aria-hidden="true" />
          <p className="mt-4 text-sm font-black uppercase tracking-normal text-amber-700">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">{title}</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{intro}</p>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-900">
            {note}
          </p>
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          {drivers.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
