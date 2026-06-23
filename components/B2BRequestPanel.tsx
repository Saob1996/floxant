import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck } from "lucide-react";

import { germanText } from "@/lib/german-text";

const b2bFields = [
  "Firma",
  "Objektart",
  "Fläche",
  "gewünschter Turnus",
  "bevorzugte Reinigungszeit",
  "Ansprechpartner",
  "Ort/Stadt",
  "bestehendes Angebot Ja/Nein",
] as const;

type B2BRequestPanelProps = {
  city?: string;
};

export function B2BRequestPanel({ city = "duesseldorf" }: B2BRequestPanelProps) {
  const href = `/kontakt?service=bueroreinigung&city=${city}&intent=b2b-bueroreinigung&source=b2b`;

  return (
    <section className="px-4 py-12 sm:px-6" data-component="B2BRequestPanel">
      <div className="mx-auto grid max-w-7xl gap-7 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-cyan-800">
            <Building2 className="h-4 w-4" />
            B2B-Anfrage
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Für Unternehmen helfen Fläche, Turnus und Zeiten.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            Eine Firmenanfrage wird besser, wenn Objektart, gewünschte Reinigungszeit und Ansprechpartner direkt sichtbar sind. Eine Anfrage ist noch keine Beauftragung.
          </p>
          <Link
            href={href}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-cyan-900"
            data-event="seo_cta_click"
            data-service="bueroreinigung"
            data-city={city}
            data-page-intent="b2b-bueroreinigung"
            data-priority="p0"
            data-cta-label="B2B-Reinigung anfragen"
            data-destination={href}
          >
            B2B-Reinigung anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {b2bFields.map((field) => (
            <div key={field} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-800" />
              <span>{germanText(field, field)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
