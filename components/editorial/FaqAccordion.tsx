"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { DisplayFaq } from "@/components/editorial/types";

export function FaqAccordion({
  items,
  openFirst = false,
}: {
  items: readonly DisplayFaq[];
  openFirst?: boolean;
}) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(openFirst && items[0] ? [items[0].id] : []),
  );

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-3 print:gap-5">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `faq-panel-${instanceId}-${item.id}`;
        const buttonId = `faq-button-${instanceId}-${item.id}`;

        return (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:break-inside-avoid print:border-slate-400 print:shadow-none"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-black leading-6 text-slate-950 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-600 sm:text-lg print:px-0"
              >
                <span>{item.question}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-950 text-cyan-200" aria-hidden="true">
                  {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-200 print:block ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] print:grid-rows-[1fr]"
              }`}
            >
              <div className="overflow-hidden print:overflow-visible">
                <div className="border-t border-slate-200 px-5 pb-5 pt-4 text-sm font-medium leading-7 text-slate-700 print:border-0 print:px-0 print:pt-1">
                  <p className="font-bold text-slate-900">{item.shortAnswer}</p>
                  {item.detailedAnswer && item.detailedAnswer !== item.shortAnswer ? (
                    <p className="mt-2">{item.detailedAnswer}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
