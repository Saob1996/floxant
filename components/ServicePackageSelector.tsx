import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleSlash2 } from "lucide-react";

import {
  buildServicePackageHref,
  getServicePackages,
  servicePackageGroups,
  type ServicePackageGroup,
} from "@/lib/service-packages";
import { germanText } from "@/lib/german-text";

type ServicePackageSelectorProps = {
  groups: ServicePackageGroup | ServicePackageGroup[];
  title?: string;
  intro?: string;
  limit?: number;
};

export function ServicePackageSelector({ groups, title, intro, limit }: ServicePackageSelectorProps) {
  const groupList = Array.isArray(groups) ? groups : [groups];
  const packages = getServicePackages(groupList).slice(0, limit);
  const fallback = groupList.length === 1 ? servicePackageGroups[groupList[0]] : null;

  return (
    <section className="px-4 py-12 sm:px-6" data-component="ServicePackageSelector">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Service-Pakete</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            {germanText(title || fallback?.title || "Passenden Service-Pfad wählen", title || fallback?.title || "Passenden Service-Pfad wählen")}
          </h2>
          <p className="mt-3 text-base leading-8 text-slate-700">
            {germanText(
              intro || fallback?.intro || "Die Paketlogik hilft, aus einer groben Anfrage einen klareren nächsten Schritt zu machen.",
              intro || fallback?.intro || "Die Paketlogik hilft, aus einer groben Anfrage einen klareren nächsten Schritt zu machen.",
            )}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((item) => {
            const href = buildServicePackageHref(item);
            const ctaCity = href.includes("?")
              ? new URLSearchParams(href.slice(href.indexOf("?") + 1)).get("city") || ""
              : "";
            return (
              <article
                key={item.serviceKey}
                className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                      {germanText(item.group.replace("-", " "), item.group.replace("-", " "))}
                    </div>
                    <h3 className="mt-2 text-xl font-black tracking-normal text-slate-950">{germanText(item.title, item.title)}</h3>
                  </div>
                  <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-black uppercase text-blue-800">
                    {item.priority.toUpperCase()}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{germanText(item.shortDescription, item.shortDescription)}</p>

                <div className="mt-4 grid gap-3 text-sm leading-6">
                  <div>
                    <p className="font-black text-slate-950">Geeignet wenn</p>
                    <ul className="mt-2 grid gap-2 text-slate-700">
                      {item.geeignetWenn.slice(0, 2).map((entry) => (
                        <li key={entry} className="flex gap-2">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                          <span>{germanText(entry, entry)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-black text-slate-950">Nicht passend wenn</p>
                    <ul className="mt-2 grid gap-2 text-slate-700">
                      {item.nichtGeeignetWenn.slice(0, 1).map((entry) => (
                        <li key={entry} className="flex gap-2">
                          <CircleSlash2 className="mt-1 h-4 w-4 shrink-0 text-amber-700" />
                          <span>{germanText(entry, entry)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.typischeAufwandstreiber.slice(0, 4).map((factor) => (
                    <span key={factor} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {germanText(factor, factor)}
                    </span>
                  ))}
                </div>

                <Link
                  href={href}
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-800"
                  data-event="seo_cta_click"
                  data-service={item.kontaktParameter.service}
                  data-city={ctaCity}
                  data-page-intent={item.kontaktParameter.intent}
                  data-priority={item.priority}
                  data-cta-label={item.empfohlenerCTA}
                  data-destination={href}
                >
                  {germanText(item.empfohlenerCTA, item.empfohlenerCTA)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
