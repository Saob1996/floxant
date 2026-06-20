import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

export function NotSureWhatYouNeed() {
  const href = "/kontakt?service=sonstiges&city=regensburg&intent=unsichere-anfrage&source=contact-routing";

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5" data-component="NotSureWhatYouNeed">
      <HelpCircle className="h-5 w-5 text-blue-700" />
      <h3 className="mt-4 text-lg font-black text-slate-950">Noch unsicher?</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        Waehlen Sie im Formular Sonstiges oder senden Sie eine kurze Beschreibung. FLOXANT ordnet die Anfrage ein und stellt Rueckfragen, falls etwas fehlt.
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700"
        data-event="seo_cta_click"
        data-service="sonstiges"
        data-city="regensburg"
        data-page-intent="unsichere-anfrage"
        data-priority="p2"
        data-cta-label="Unsichere Anfrage senden"
        data-destination={href}
      >
        Unsichere Anfrage senden
        <ArrowRight className="h-4 w-4" />
      </Link>
    </aside>
  );
}
