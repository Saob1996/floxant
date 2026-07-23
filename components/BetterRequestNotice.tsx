import { ShieldCheck } from "lucide-react";

import { getRequestChecklist } from "@/lib/request-checklists";

type BetterRequestNoticeProps = {
  serviceKey?: string;
  className?: string;
};

export function BetterRequestNotice({
  serviceKey = "reinigung",
  className = "",
}: BetterRequestNoticeProps) {
  const checklist = getRequestChecklist(serviceKey);

  return (
    <aside
      className={`rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-7 text-slate-800 ${className}`}
      data-component="BetterRequestNotice"
      data-request-checklist-key={checklist.key}
    >
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
        <p>
          {checklist.microcopy.noPromise} {checklist.microcopy.submitReminder}
        </p>
      </div>
    </aside>
  );
}
