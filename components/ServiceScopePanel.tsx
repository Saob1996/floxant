import { ClipboardCheck } from "lucide-react";

import { getServicePackage } from "@/lib/service-packages";

type ServiceScopePanelProps = {
  serviceKey: string;
  title?: string;
};

export function ServiceScopePanel({ serviceKey, title }: ServiceScopePanelProps) {
  const item = getServicePackage(serviceKey);
  if (!item) return null;

  return (
    <section className="px-4 py-12 sm:px-6" data-component="ServiceScopePanel">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-xs font-black uppercase tracking-normal text-blue-700">Leistungsumfang</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              {title || `${item.title}: was fuer den Start benoetigt wird`}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{item.shortDescription}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ScopeList title="Benoetigte Angaben" items={item.benoetigteAngaben} />
            <ScopeList title="Optional hilfreich" items={item.optionaleAngaben} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScopeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-base font-black text-slate-950">{title}</h3>
      <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
