import { germanText } from "@/lib/german-text";

type TrustItem = {
  title: string;
  text: string;
};

type ProfessionalTrustPanelProps = {
  title: string;
  intro: string;
  items: readonly TrustItem[];
};

export function ProfessionalTrustPanel({ title, intro, items }: ProfessionalTrustPanelProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Vertrauen ohne Show</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">{germanText(intro, intro)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-black text-slate-950">{germanText(item.title, item.title)}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{germanText(item.text, item.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
