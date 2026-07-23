import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";

import { getAiAnswerByKey, type AiAnswerKey } from "@/lib/ai-answer-system";

type QuickAnswerBlockProps = {
  answerKey: AiAnswerKey;
  className?: string;
};

export function QuickAnswerBlock({ answerKey, className = "" }: QuickAnswerBlockProps) {
  const entry = getAiAnswerByKey(answerKey);

  if (!entry) return null;

  return (
    <section className={`bg-white px-5 py-10 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-5xl rounded-lg border border-blue-100 bg-blue-50 p-5">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
          <FileSearch className="h-4 w-4" aria-hidden="true" />
          Kurz erklärt
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-normal sm:text-4xl">{entry.title}</h2>
        <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{entry.directAnswer}</p>
        <Link
          href={entry.cta.href}
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-700"
        >
          {entry.cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
