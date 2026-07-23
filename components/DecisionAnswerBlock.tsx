import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { getAiAnswerByKey, type AiAnswerKey } from "@/lib/ai-answer-system";

type DecisionAnswerBlockProps = {
  answerKey: AiAnswerKey;
  className?: string;
};

export function DecisionAnswerBlock({ answerKey, className = "" }: DecisionAnswerBlockProps) {
  const entry = getAiAnswerByKey(answerKey);

  if (!entry) return null;

  return (
    <section className={`bg-slate-50 px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Wann sinnvoll?</p>
          <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
            {entry.usefulWhen.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-black uppercase tracking-normal text-slate-700">Was wird nicht versprochen?</p>
          <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
            {entry.notPromised.map((item) => (
              <li key={item} className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={entry.cta.href}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-700"
          >
            {entry.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>
  );
}
