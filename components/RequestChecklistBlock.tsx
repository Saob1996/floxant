import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, ListChecks } from "lucide-react";

import {
  buildRequestChecklistContactHref,
  getRequestChecklist,
} from "@/lib/request-checklists";

type RequestChecklistBlockProps = {
  serviceKey?: string;
  title?: string;
  intro?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  compact?: boolean;
  embedded?: boolean;
  showOptional?: boolean;
};

export function RequestChecklistBlock({
  serviceKey = "reinigung",
  title,
  intro,
  ctaHref,
  ctaLabel = "Anfrage mit Eckdaten starten",
  className = "",
  compact = false,
  embedded = false,
  showOptional = true,
}: RequestChecklistBlockProps) {
  const checklist = getRequestChecklist(serviceKey);
  const href = ctaHref || buildRequestChecklistContactHref(checklist.key, { source: "request-checklist" });
  const coreItems = checklist.requiredCoreInfo.slice(0, compact ? 4 : 6);
  const optionalItems = showOptional ? checklist.helpfulOptionalInfo.slice(0, compact ? 2 : 4) : [];
  const sectionClass = embedded
    ? `rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 ${className}`
    : `bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`;
  const innerClass = embedded
    ? "grid gap-5"
    : "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start";

  return (
    <section
      className={sectionClass}
      aria-labelledby={`request-checklist-${checklist.key}`}
      data-component="RequestChecklistBlock"
      data-request-checklist-key={checklist.key}
    >
      <div className={innerClass}>
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            Anfrage-Checkliste
          </p>
          <h2
            id={`request-checklist-${checklist.key}`}
            className={compact || embedded ? "mt-3 text-2xl font-black tracking-normal text-slate-950" : "mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl"}
          >
            {title || checklist.microcopy.headline}
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 sm:text-base sm:leading-8">
            {intro || checklist.microcopy.intro}
          </p>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-950">
            {checklist.microcopy.submitReminder}
          </p>
          <Link
            href={href}
            data-event="request_cta_click"
            data-service={checklist.contactService}
            data-source="request_checklist_block"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {coreItems.map((item) => (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-950">{item.label}</h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
          {optionalItems.map((item) => (
            <article key={item.label} className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-black text-slate-950">{item.label} optional</h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
