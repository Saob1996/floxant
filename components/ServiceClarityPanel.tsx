import { germanText } from "@/lib/german-text";

type ClarityItem = {
  title: string;
  text: string;
};

type ServiceClarityPanelProps = {
  title: string;
  intro: string;
  items: readonly ClarityItem[];
};

export function ServiceClarityPanel({ title, intro, items }: ServiceClarityPanelProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Service klar einordnen</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">{germanText(intro, intro)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-base font-black tracking-normal text-slate-950">{germanText(item.title, item.title)}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{germanText(item.text, item.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
