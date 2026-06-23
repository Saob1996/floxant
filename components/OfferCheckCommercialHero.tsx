import Link from "next/link";
import { ArrowRight, FileSearch, ShieldCheck } from "lucide-react";

export function OfferCheckCommercialHero() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="OfferCheckCommercialHero">
      <div className="mx-auto grid max-w-7xl gap-7 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-700">
            <FileSearch className="h-4 w-4" />
            Angebot strukturiert prüfen
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Aus einem unsicheren Angebot wird eine klare Prüffrage.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            FLOXANT schaut auf Umfang, Termin, Zugang, Zusatzkosten und die Frage, ob ein sinnvoller nächster Schritt möglich ist. Das ist keine Rechtsberatung und kein Unterbietungsversprechen.
          </p>
          <Link
            href="/kontakt?service=angebot-pruefen&city=regensburg&intent=angebot-pruefen&source=seo"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            data-event="seo_cta_click"
            data-service="angebot-pruefen"
            data-city="regensburg"
            data-page-intent="angebot-pruefen"
            data-priority="p0"
            data-cta-label="Angebot pruefen lassen"
            data-destination="/kontakt?service=angebot-pruefen&city=regensburg&intent=angebot-pruefen&source=seo"
          >
            Angebot prüfen lassen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Was ist enthalten?",
            "Was ist ausgeschlossen?",
            "Welche Zusatzkosten sind möglich?",
            "Welcher nächste Schritt ist sinnvoll?",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-6 text-blue-950">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
