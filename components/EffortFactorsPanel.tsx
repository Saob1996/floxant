import { Gauge, ShieldCheck } from "lucide-react";

import { germanText, germanizeDeep } from "@/lib/german-text";
import { getEffortFactors, type EffortFactorGroup } from "@/lib/service-effort-factors";

type EffortFactorsPanelProps = {
  group: EffortFactorGroup;
  title?: string;
  intro?: string;
  limit?: number;
};

export function EffortFactorsPanel({ group, title, intro, limit }: EffortFactorsPanelProps) {
  const definition = germanizeDeep(getEffortFactors(group));
  const factors = definition.factors.slice(0, limit);

  return (
    <section className="px-4 py-12 sm:px-6" data-component="EffortFactorsPanel" data-effort-group={group}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Aufwandstreiber</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">{germanText(title || definition.title, title || definition.title)}</h2>
          <p className="mt-3 text-base leading-8 text-slate-700">{germanText(intro || definition.intro, intro || definition.intro)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {factors.map((factor) => (
            <article key={factor.key} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <Gauge className="h-5 w-5 text-blue-700" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{germanText(factor.label, factor.label)}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{germanText(factor.whyItMatters, factor.whyItMatters)}</p>
              <p className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold leading-5 text-blue-950">
                Hilfreich: {germanText(factor.helpfulInput, factor.helpfulInput)}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-3 rounded-lg border border-amber-200 bg-amber-50 p-5 md:grid-cols-3">
          {definition.boundaries.map((item) => (
            <div key={item} className="flex gap-2 text-sm font-bold leading-6 text-amber-950">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{germanText(item, item)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
