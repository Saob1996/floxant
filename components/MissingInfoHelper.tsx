import { AlertCircle, CheckCircle2 } from "lucide-react";

import { getMissingInfoHints } from "@/lib/missing-info";
import { getRequestChecklist } from "@/lib/request-checklists";

type MissingInfoHelperProps = {
  serviceKey?: string;
  className?: string;
  compact?: boolean;
};

export function MissingInfoHelper({
  serviceKey = "reinigung",
  className = "",
  compact = false,
}: MissingInfoHelperProps) {
  const checklist = getRequestChecklist(serviceKey);
  const missingHints = getMissingInfoHints(serviceKey).slice(0, compact ? 4 : 6);

  return (
    <section
      className={`bg-slate-950 px-5 py-12 text-white sm:px-8 lg:px-10 ${className}`}
      data-component="MissingInfoHelper"
      data-request-checklist-key={checklist.key}
      aria-labelledby={`missing-info-${checklist.key}`}
    >
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            Fehlende Angaben
          </p>
          <h2 id={`missing-info-${checklist.key}`} className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Was FLOXANT sonst nachfragen wuerde.
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-300 sm:text-base sm:leading-8">
            Fehlende Angaben sind kein Problem. Sie zeigen nur, welche Rueckfragen den naechsten Schritt schneller machen.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {missingHints.map((item) => (
            <div key={item.flag} className="flex gap-3 rounded-lg border border-white/12 bg-white/[0.06] p-4 text-sm font-semibold leading-6 text-slate-200">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
