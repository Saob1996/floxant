import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

import { germanText } from "@/lib/german-text";

type QuickDecisionBoxProps = {
  title?: string;
  fits: readonly string[];
  notFits: readonly string[];
  nextSteps: readonly string[];
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export function QuickDecisionBox({
  title = "Passt Angebot prüfen zu Ihrer Situation?",
  fits,
  notFits,
  nextSteps,
  ctaHref = "/angebot-guenstiger-pruefen#guenstiger-form",
  ctaLabel = "Situation beschreiben",
  className = "",
}: QuickDecisionBoxProps) {
  return (
    <section className={`bg-slate-50 px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            Entscheidung
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">{germanText(title, title)}</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <DecisionColumn title="Passt, wenn" tone="green" items={fits} icon="check" />
          <DecisionColumn title="Eher nicht passend, wenn" tone="amber" items={notFits} icon="x" />
          <div className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Dann nächster Schritt</p>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-700">
              {nextSteps.map((item) => (
                <li key={item}>{germanText(item, item)}</li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-700"
            >
              {germanText(ctaLabel, ctaLabel)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionColumn({
  title,
  items,
  tone,
  icon,
}: {
  title: string;
  items: readonly string[];
  tone: "green" | "amber";
  icon: "check" | "x";
}) {
  const Icon = icon === "check" ? CheckCircle2 : XCircle;
  const colors =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
      : "border-amber-200 bg-amber-50 text-amber-950";

  return (
    <div className={`rounded-lg border p-5 ${colors}`}>
      <p className="text-sm font-black uppercase tracking-normal">{germanText(title, title)}</p>
      <ul className="mt-4 space-y-3 text-sm font-semibold leading-7">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{germanText(item, item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
