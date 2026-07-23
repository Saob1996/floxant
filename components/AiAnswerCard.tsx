import { Bot, CheckCircle2 } from "lucide-react";

type AiAnswerCardProps = {
  eyebrow?: string;
  title: string;
  answer: string;
  points?: readonly string[];
  nextStep?: string;
  className?: string;
};

export function AiAnswerCard({
  eyebrow = "Kurze Antwort",
  title,
  answer,
  points = [],
  nextStep,
  className = "",
}: AiAnswerCardProps) {
  return (
    <section className={`bg-white px-5 py-10 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-slate-50 p-5">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
          <Bot className="h-4 w-4" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-4xl text-base font-semibold leading-8 text-slate-700">{answer}</p>
        {points.length > 0 ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                {point}
              </div>
            ))}
          </div>
        ) : null}
        {nextStep ? (
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-4 text-sm font-black text-blue-900">
            {nextStep}
          </div>
        ) : null}
      </div>
    </section>
  );
}
