import { germanText } from "@/lib/german-text";

type NextStep = {
  title: string;
  text: string;
};

type CustomerNextStepPanelProps = {
  title: string;
  intro: string;
  steps: readonly NextStep[];
};

export function CustomerNextStepPanel({ title, intro, steps }: CustomerNextStepPanelProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Nach der Anfrage</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-200">{germanText(intro, intro)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-black text-white">{germanText(step.title, step.title)}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">{germanText(step.text, step.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
