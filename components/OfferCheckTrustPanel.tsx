import { AlertTriangle, FileSearch, ShieldCheck } from "lucide-react";

export function OfferCheckTrustPanel({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="OfferCheckTrustPanel">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <FileSearch className="h-4 w-4" aria-hidden="true" />
            Angebotspruefung
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Vertrauen entsteht durch Grenzen, nicht durch Unterbietungsversprechen.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            FLOXANT kann Umfang, Preisannahmen, offene Punkte und naechste Rueckfragen praktisch einordnen. Das ist keine Rechtsberatung und keine Garantie auf einen niedrigeren Preis.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Leistungsumfang und Zusatzpunkte sichtbar machen.",
            "Rueckfragen nennen, wenn Angebot oder Fotos fehlen.",
            "Keine Bewertung fremder Anbieter als Claim.",
            "Plan B nur nach Ort, Termin und Machbarkeit pruefen.",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
          <div className="md:col-span-2 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-950">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Kein Claim auf Rechtsberatung, niedrigsten Preis, Soforteinsatz oder garantierte Ersparnis.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
