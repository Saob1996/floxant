import { ShieldCheck } from "lucide-react";

import { germanText, germanizeDeep } from "@/lib/german-text";

const trustItems = germanizeDeep([
  "Keine Fake-Referenzen und keine erfundenen Firmenkunden.",
  "Keine erfundenen Zertifikate oder Spezialhygiene-Versprechen.",
  "Flaeche, Turnus, Zeitfenster und Zugang werden vor einem Angebot geklaert.",
  "Bestehende Angebote koennen nach Umfang und offenen Punkten strukturiert werden.",
] as const);

export function BusinessTrustPanel() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="BusinessTrustPanel">
      <div className="mx-auto max-w-7xl rounded-lg border border-cyan-200 bg-cyan-50 p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-xs font-black uppercase tracking-normal text-cyan-900">Vertrauen für Unternehmen</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Gewerbekunden brauchen klare Grenzen und gute Rückfragen.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-cyan-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-800" />
                <span>{germanText(item, item)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
