type CustomerProblem = {
  title: string;
  text: string;
};

type CustomerProblemSectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  problems: readonly CustomerProblem[];
};

export function CustomerProblemSection({
  eyebrow = "Typische Kundensituationen",
  title,
  intro,
  problems,
}: CustomerProblemSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{title}</h2>
          {intro ? <p className="mt-5 text-base font-semibold leading-8 text-slate-600">{intro}</p> : null}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <article key={problem.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-black tracking-normal text-slate-950">{problem.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{problem.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
