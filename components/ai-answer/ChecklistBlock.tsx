import { ClipboardCheck } from "lucide-react";

import { germanText } from "@/lib/german-text";

type ChecklistBlockProps = {
  title: string;
  intro?: string;
  items: readonly string[];
  columns?: 2 | 3;
  className?: string;
};

export function ChecklistBlock({
  title,
  intro,
  items,
  columns = 2,
  className = "",
}: ChecklistBlockProps) {
  return (
    <section className={`bg-slate-50 px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Checkliste
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">{germanText(title, title)}</h2>
          {intro ? <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p> : null}
        </div>
        <div className={`mt-7 grid gap-3 ${columns === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
              <p className="text-sm font-semibold leading-7 text-slate-700">{germanText(item, item)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
