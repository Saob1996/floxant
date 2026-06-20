import { HelpCircle } from "lucide-react";

import type { FloxantFaqItem } from "@/lib/faqs";
import { buildFaqJsonLd } from "@/lib/structured-data";

type FaqSectionProps = {
  title?: string;
  intro?: string;
  items: readonly FloxantFaqItem[];
  includeJsonLd?: boolean;
  maxItems?: number;
  className?: string;
};

export function FaqSection({
  title = "Haeufige Fragen",
  intro = "Kurze Antworten, die vor einer Anfrage helfen.",
  items,
  includeJsonLd = false,
  maxItems = 6,
  className = "",
}: FaqSectionProps) {
  const visibleItems = items.slice(0, Math.max(1, Math.min(maxItems, 8)));

  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      {includeJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(visibleItems)) }}
        />
      ) : null}
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
        </div>
        <div className="grid gap-3">
          {visibleItems.map((item, index) => (
            <details
              key={item.q}
              open={index === 0}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <summary className="cursor-pointer list-none text-lg font-black text-slate-950">
                {item.q}
              </summary>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
