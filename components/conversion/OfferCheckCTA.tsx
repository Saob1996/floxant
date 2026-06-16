import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";

type OfferCheckCTAProps = {
  title?: string;
  text?: string;
  href?: string;
  className?: string;
};

export function OfferCheckCTA({
  title = "Liegt schon ein Angebot vor?",
  text = "FLOXANT kann Preis, Umfang, Zusatzpositionen, Termin, Fotos und fehlende Angaben sachlich einordnen. Keine Preisgarantie, keine Abwertung anderer Anbieter.",
  href = "/angebot-guenstiger-pruefen#guenstiger-form",
  className = "",
}: OfferCheckCTAProps) {
  return (
    <section className={`bg-slate-950 px-5 py-10 text-white sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-white/12 bg-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <FileSearch className="h-4 w-4" aria-hidden="true" />
            Angebotspruefung
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-normal">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-slate-300">{text}</p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
        >
          Angebot pruefen lassen
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
