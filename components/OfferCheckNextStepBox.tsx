import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export function OfferCheckNextStepBox() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="OfferCheckNextStepBox">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm shadow-slate-950/10 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-200">
              <ClipboardCheck className="h-4 w-4" />
              Nach dem Absenden
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              FLOXANT prüft Angaben und meldet Rückfragen oder den nächsten Schritt.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Wenn Angebot, Fotos oder Umfang fehlen, kann FLOXANT zuerst Rückfragen stellen. Eine Anfrage bestätigt noch keinen Auftrag.
            </p>
          </div>
          <Link
            href="/kontakt?service=angebot-pruefen&city=regensburg&intent=angebot-pruefen&source=seo"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950"
            data-event="seo_cta_click"
            data-service="angebot-pruefen"
            data-city="regensburg"
            data-page-intent="angebot-pruefen"
            data-priority="p0"
            data-cta-label="Angebot jetzt senden"
            data-destination="/kontakt?service=angebot-pruefen&city=regensburg&intent=angebot-pruefen&source=seo"
          >
            Angebot jetzt senden
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
