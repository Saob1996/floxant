import { ArrowRightLeft } from "lucide-react";

import { germanText } from "@/lib/german-text";

export type ComparisonAnswerRow = {
  topic: string;
  left: string;
  right: string;
  decision: string;
};

type ComparisonAnswerTableProps = {
  title?: string;
  intro?: string;
  leftLabel?: string;
  rightLabel?: string;
  rows: readonly ComparisonAnswerRow[];
  className?: string;
};

export function ComparisonAnswerTable({
  title = "Was ist der richtige Weg?",
  intro = "Die Tabelle trennt typische Entscheidungen, damit Preis, Umfang und Risiko nicht vermischt werden.",
  leftLabel = "Option A",
  rightLabel = "Option B",
  rows,
  className = "",
}: ComparisonAnswerTableProps) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <ArrowRightLeft className="h-4 w-4" aria-hidden="true" />
            Vergleich
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-[0.75fr_1fr_1fr_1fr] bg-slate-950 text-xs font-black uppercase tracking-normal text-white max-lg:hidden">
            <div className="p-4">Frage</div>
            <div className="p-4">{germanText(leftLabel, leftLabel)}</div>
            <div className="p-4">{germanText(rightLabel, rightLabel)}</div>
            <div className="p-4">Entscheidung</div>
          </div>
          {rows.map((row) => (
            <article key={row.topic} className="grid border-t border-slate-200 lg:grid-cols-[0.75fr_1fr_1fr_1fr]">
              <div className="bg-slate-50 p-4 text-sm font-black text-slate-950">{germanText(row.topic, row.topic)}</div>
              <div className="p-4 text-sm font-semibold leading-7 text-slate-700">
                <span className="mb-2 block text-xs font-black uppercase tracking-normal text-slate-400 lg:hidden">{germanText(leftLabel, leftLabel)}</span>
                {germanText(row.left, row.left)}
              </div>
              <div className="p-4 text-sm font-semibold leading-7 text-slate-700">
                <span className="mb-2 block text-xs font-black uppercase tracking-normal text-slate-400 lg:hidden">{germanText(rightLabel, rightLabel)}</span>
                {germanText(row.right, row.right)}
              </div>
              <div className="bg-blue-50 p-4 text-sm font-black leading-7 text-blue-950">
                <span className="mb-2 block text-xs font-black uppercase tracking-normal text-blue-500 lg:hidden">Entscheidung</span>
                {germanText(row.decision, row.decision)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
