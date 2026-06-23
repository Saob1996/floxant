import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";

import { germanText } from "@/lib/german-text";

type OfferCheckInlineCTAProps = {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
};

export function OfferCheckInlineCTA({
  title = "Schon ein Angebot erhalten?",
  text = "Wenn bereits ein Angebot vorliegt, kann FLOXANT Umfang, offene Punkte und nächste sinnvolle Schritte einordnen. Keine Rechtsberatung, keine Preisgarantie.",
  href = "/angebot-guenstiger-pruefen",
  label = "Angebot prüfen lassen",
}: OfferCheckInlineCTAProps) {
  return (
    <aside className="border-b border-slate-200 bg-blue-50 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-blue-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-600 text-white">
            <FileSearch className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-black tracking-normal text-slate-950">{germanText(title, title)}</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-slate-600">{germanText(text, text)}</p>
          </div>
        </div>
        <Link
          href={href}
          data-event="seo_cta_click"
          data-service="angebot-pruefen"
          data-page-intent="angebot-pruefen"
          data-source="offer_check_inline_cta"
          data-destination={href}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-700"
        >
          {germanText(label, label)}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
