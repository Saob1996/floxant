import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";

const offerConcerns = [
  ["wirkt zu teuer", "price_too_high"],
  ["Leistungsumfang unklar", "scope_unclear"],
  ["sehr billiges Angebot wirkt riskant", "too_cheap_risky"],
  ["Anbieter reagiert nicht", "provider_unresponsive"],
  ["Termin passt nicht", "date_problem"],
  ["Zusatzkosten unklar", "addons_unclear"],
  ["mehrere Angebote schwer vergleichbar", "multiple_offers"],
  ["noch kein Angebot, brauche Orientierung", "no_offer_yet"],
] as const;

export function OfferConcernSelector() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="OfferConcernSelector">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Prüfgrund</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Was macht das Angebot unsicher?
          </h2>
          <p className="mt-3 text-base leading-8 text-slate-700">
            Die Auswahl führt zum Kontaktformular mit passendem Intent. Es wird nichts abgesendet, bis das Formular bewusst gesendet wird.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {offerConcerns.map(([label, concern]) => {
            const href = `/kontakt?service=angebot-pruefen&city=regensburg&intent=angebot-pruefen&offerConcern=${concern}&source=seo`;
            return (
              <Link
                key={concern}
                href={href}
                className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200"
                data-event="seo_cta_click"
                data-service="angebot-pruefen"
                data-city="regensburg"
                data-page-intent="angebot-pruefen"
                data-priority="p0"
                data-cta-label={label}
                data-destination={href}
              >
                <AlertTriangle className="h-5 w-5 text-amber-700" />
                <h3 className="mt-3 text-base font-black text-slate-950">{label}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  Als Prüfgrund nutzen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
