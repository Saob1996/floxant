import Link from "next/link";
import { ArrowRight, Compass, type LucideIcon } from "lucide-react";

export type ServiceDecisionGuideItem = {
  title: string;
  text: string;
  href?: string;
  cta?: string;
  Icon?: LucideIcon;
};

type ServiceDecisionGuideProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: readonly ServiceDecisionGuideItem[];
  className?: string;
  dark?: boolean;
};

export function ServiceDecisionGuide({
  eyebrow = "Welcher Weg passt?",
  title,
  intro,
  items,
  className = "",
  dark = false,
}: ServiceDecisionGuideProps) {
  const sectionClass = dark
    ? "bg-slate-950 text-white"
    : "border-y border-slate-200 bg-white text-slate-950";
  const cardClass = dark
    ? "border-white/10 bg-white/[0.07] text-white hover:border-blue-200/40 hover:bg-white/[0.11]"
    : "border-slate-200 bg-slate-50 text-slate-950 hover:border-blue-200 hover:bg-white hover:shadow-md";
  const mutedText = dark ? "text-slate-300" : "text-slate-600";
  const accentText = dark ? "text-cyan-200" : "text-blue-700";

  return (
    <section className={`${sectionClass} px-5 py-14 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className={`inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal ${accentText}`}>
              <Compass className="h-4 w-4" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          </div>
          {intro ? <p className={`max-w-3xl text-base font-semibold leading-8 lg:text-right ${mutedText}`}>{intro}</p> : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = item.Icon;
            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {Icon ? <Icon className={`h-5 w-5 ${accentText}`} aria-hidden="true" /> : null}
                    <h3 className="mt-3 text-lg font-black leading-snug">{item.title}</h3>
                  </div>
                  {item.href ? <ArrowRight className={`h-4 w-4 shrink-0 ${accentText}`} aria-hidden="true" /> : null}
                </div>
                <p className={`mt-3 text-sm font-semibold leading-7 ${mutedText}`}>{item.text}</p>
                {item.cta ? (
                  <span className={`mt-5 inline-flex items-center gap-2 text-sm font-black ${accentText}`}>
                    {item.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={`${item.title}-${item.href}`}
                  href={item.href}
                  className={`group rounded-lg border p-5 transition hover:-translate-y-0.5 ${cardClass}`}
                  data-event="service_card_click"
                  data-source="service_decision_guide"
                >
                  {content}
                </Link>
              );
            }

            return (
              <article key={item.title} className={`rounded-lg border p-5 ${cardClass}`}>
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
