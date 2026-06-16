import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type ProblemSituationGridItem = {
  title: string;
  text: string;
};

type ProblemSituationGridProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: readonly ProblemSituationGridItem[];
  tone?: "blue" | "amber";
  className?: string;
  children?: ReactNode;
};

export function ProblemSituationGrid({
  eyebrow = "Typische Situation",
  title,
  intro,
  items,
  tone = "blue",
  className = "",
  children,
}: ProblemSituationGridProps) {
  const Icon = tone === "amber" ? AlertCircle : CheckCircle2;
  const iconColor = tone === "amber" ? "text-amber-700" : "text-blue-700";

  return (
    <section className={`border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              {title}
            </h2>
          </div>
          {intro ? (
            <p className="max-w-3xl text-base font-semibold leading-8 text-slate-600 lg:text-right">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black leading-snug text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
