import { ClipboardCheck } from "lucide-react";

import { getEffortFactors, type EffortFactorGroup } from "@/lib/service-effort-factors";
import { germanText } from "@/lib/german-text";

type WhatWeNeedChecklistProps = {
  group: EffortFactorGroup;
  title?: string;
  intro?: string;
  limit?: number;
};

export function WhatWeNeedChecklist({ group, title, intro, limit = 8 }: WhatWeNeedChecklistProps) {
  const definition = getEffortFactors(group);
  const items = definition.factors.slice(0, limit);

  return (
    <section className="px-4 py-12 sm:px-6" data-component="WhatWeNeedChecklist">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.76fr_1.24fr]">
        <div>
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Welche Angaben helfen?</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            {germanText(title, "Mit diesen Angaben wird die Anfrage besser buchbar")}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            {germanText(intro, "Fotos, grobe Eckdaten und ein ehrlicher Prüfgrund reichen oft für den ersten Schritt.")}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.key} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm shadow-slate-950/5">
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              <span>
                <strong className="text-slate-950">{germanText(item.label, item.label)}:</strong> {germanText(item.helpfulInput, item.helpfulInput)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
