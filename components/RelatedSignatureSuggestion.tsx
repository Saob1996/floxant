import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { getRequestChecklist } from "@/lib/request-checklists";

type RelatedSignatureSuggestionProps = {
  serviceKey?: string;
  className?: string;
};

export function RelatedSignatureSuggestion({
  serviceKey = "reinigung",
  className = "",
}: RelatedSignatureSuggestionProps) {
  const checklist = getRequestChecklist(serviceKey);

  return (
    <section
      className={`bg-slate-50 px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`}
      data-component="RelatedSignatureSuggestion"
      data-request-checklist-key={checklist.key}
      aria-labelledby={`signature-suggestion-${checklist.key}`}
    >
      <div className="mx-auto max-w-7xl">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Passender FLOXANT Weg
        </p>
        <h2 id={`signature-suggestion-${checklist.key}`} className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
          Wenn die Anfrage noch nicht eindeutig ist.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {checklist.relatedSignatureServices.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
            >
              <h3 className="text-lg font-black text-slate-950">{item.label}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.reason}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Oeffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
