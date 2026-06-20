import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";

import { getServiceFitHref, serviceFitOptions } from "@/lib/service-fit";

type ServiceFitAdvisorProps = {
  currentCity?: string;
  title?: string;
  intro?: string;
  className?: string;
};

export function ServiceFitAdvisor({
  currentCity,
  title = "Welcher Anfrageweg passt?",
  intro = "Diese Auswahl setzt nur Kontaktparameter. Es wird keine API aufgerufen und nichts gesendet, bevor das Formular bewusst abgeschickt wird.",
  className = "",
}: ServiceFitAdvisorProps) {
  return (
    <section className={`bg-white px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="ServiceFitAdvisor">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <Route className="h-4 w-4" aria-hidden="true" />
              Anfrageberater
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          </div>
          <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-700 lg:justify-self-end lg:text-right">
            {intro}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {serviceFitOptions.map((option) => {
            const href = getServiceFitHref(option, currentCity || option.city);

            return (
              <Link
                key={option.optionKey}
                href={href}
                className="group min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-sm"
                data-event="seo_cta_click"
                data-source="service_fit_advisor"
                data-service={option.service}
                data-city={currentCity || option.city || ""}
                data-page-intent={option.intent}
                data-priority={option.priority}
                data-cta-label={option.ctaLabel}
                data-destination={href}
              >
                <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-black text-blue-700">
                  {option.priority.toUpperCase()}
                </span>
                <h3 className="mt-3 text-lg font-black leading-tight text-slate-950">{option.label}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                  {option.suggestedFormIntro}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {option.recommendedFields.slice(0, 3).map((field) => (
                    <span key={field} className="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                      {field}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  {option.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

