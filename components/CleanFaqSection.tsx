type FaqItem = {
  q: string;
  a: string;
};

type CleanFaqSectionProps = {
  title: string;
  intro?: string;
  items: readonly FaqItem[];
};

export function CleanFaqSection({ title, intro, items }: CleanFaqSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{title}</h2>
        {intro ? <p className="mt-5 text-base font-semibold leading-8 text-slate-600">{intro}</p> : null}
        <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50">
          {items.map((item) => (
            <div key={item.q} className="p-5">
              <h3 className="text-base font-black text-slate-950">{item.q}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
