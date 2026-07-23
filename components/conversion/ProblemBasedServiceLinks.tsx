import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";

import { problemBasedServiceLinks } from "@/lib/signature-special-services";

type ProblemBasedServiceLinksProps = {
  title?: string;
  intro?: string;
  limit?: number;
  className?: string;
};

export function ProblemBasedServiceLinks({
  title = "Nach Problem starten, nicht nach Fachbegriff.",
  intro = "Viele Anfragen beginnen nicht mit einem perfekten Service-Namen. Diese Wege fuehren von der konkreten Lage zum passenden FLOXANT-Startpunkt.",
  limit = problemBasedServiceLinks.length,
  className = "",
}: ProblemBasedServiceLinksProps) {
  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
            Problemorientiert
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {problemBasedServiceLinks.slice(0, limit).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
            >
              <h3 className="text-base font-black text-slate-950">{link.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{link.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                {link.cta || "Startpunkt oeffnen"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
