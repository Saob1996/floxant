import { HelpCircle } from "lucide-react";

export type HumanReadableFaqItem = {
  q: string;
  a: string;
};

type HumanReadableFAQProps = {
  title?: string;
  intro?: string;
  items: readonly HumanReadableFaqItem[];
  className?: string;
};

export function HumanReadableFAQ({
  title = "Haeufige Fragen",
  intro = "Kurze Antworten, die vor einer Anfrage helfen.",
  items,
  className = "",
}: HumanReadableFAQProps) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
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
          {items.map((item, index) => (
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
