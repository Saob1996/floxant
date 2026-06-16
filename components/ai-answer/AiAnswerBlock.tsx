import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, XCircle } from "lucide-react";

type AiAnswerBlockProps = {
  eyebrow?: string;
  title: string;
  answer: string;
  points: readonly string[];
  usefulWhen: readonly string[];
  notUsefulWhen?: readonly string[];
  neededInfo: readonly string[];
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export function AiAnswerBlock({
  eyebrow = "Kurze Antwort",
  title,
  answer,
  points,
  usefulWhen,
  notUsefulWhen = [],
  neededInfo,
  ctaHref = "/angebot-guenstiger-pruefen#guenstiger-form",
  ctaLabel = "Angebot pruefen lassen",
  className = "",
}: AiAnswerBlockProps) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl rounded-lg border border-blue-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_54%,#f8fafc_100%)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <article>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <Info className="h-4 w-4" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-700">{answer}</p>
            <Link
              href={ctaHref}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-700"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              {points.slice(0, 6).map((point) => (
                <div key={point} className="rounded-lg border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="h-5 w-5 text-blue-700" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{point}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-black text-emerald-900">Sinnvoll, wenn</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-emerald-950">
                  {usefulWhen.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-black text-amber-900">Eher nicht passend, wenn</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-amber-950">
                  {(notUsefulWhen.length ? notUsefulWhen : ["ein verbindlicher Rechtscheck erwartet wird", "nur der niedrigste Preis zaehlt"]).map((item) => (
                    <li key={item} className="flex gap-2">
                      <XCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-950">FLOXANT braucht</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-700">
                  {neededInfo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
