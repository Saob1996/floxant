import { CheckCircle2, CircleSlash2 } from "lucide-react";

import { getServicePackages, type ServicePackageGroup } from "@/lib/service-packages";

type ServiceFitGuideProps = {
  group: ServicePackageGroup;
  title?: string;
  intro?: string;
  limit?: number;
};

export function ServiceFitGuide({ group, title, intro, limit = 4 }: ServiceFitGuideProps) {
  const packages = getServicePackages(group).slice(0, limit);

  return (
    <section className="px-4 py-12 sm:px-6" data-component="ServiceFitGuide">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Passt das?</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            {title || "Schneller erkennen, welcher Service passt"}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            {intro || "Wenn der Fall noch unscharf ist, reicht eine kurze Lagebeschreibung. FLOXANT ordnet die Anfrage nach Service, Aufwand und naechstem Schritt ein."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {packages.map((item) => (
            <article key={item.serviceKey} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <div className="mt-4 grid gap-3">
                <div className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <span>{item.geeignetWenn[0]}</span>
                </div>
                <div className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CircleSlash2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <span>{item.nichtGeeignetWenn[0]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
