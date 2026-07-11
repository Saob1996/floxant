import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";

import { getTaxonomyByGroup, type ServiceNavigationItem } from "@/lib/service-navigation";

type ServiceNavigationOverviewProps = {
  title?: string;
  intro?: string;
  groups?: readonly ServiceNavigationItem["group"][];
  location?: "duesseldorf" | "regensburg";
  limitPerGroup?: number;
  className?: string;
};

const groupLabels: Record<ServiceNavigationItem["group"], string> = {
  reinigung: "Reinigung",
  umzug_transport: "Umzug & Transport",
  entruempelung_aufloesung: "Entrümpelung & Auflösung",
  angebot_pruefen: "Angebotsprüfung",
  signature: "Besondere Lösungen",
  standort: "Standorte",
};

function locationAllowed(item: ServiceNavigationItem, location?: "duesseldorf" | "regensburg") {
  if (!location) return true;
  return location === "duesseldorf" ? item.duesseldorf : item.regensburg;
}

export function ServiceNavigationOverview({
  title = "Leistungen nach Ihrer Situation.",
  intro = "Diese Übersicht zeigt die wichtigsten Leistungen und führt direkt zu den passenden Angaben.",
  groups = ["reinigung", "umzug_transport", "entruempelung_aufloesung", "angebot_pruefen", "signature"],
  location,
  limitPerGroup = 4,
  className = "",
}: ServiceNavigationOverviewProps) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="ServiceNavigationOverview">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Layers3 className="h-4 w-4" aria-hidden="true" />
            Leistungen im Überblick
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {groups.map((group) => {
            const items = getTaxonomyByGroup(group)
              .filter((item) => locationAllowed(item, location))
              .filter((item) => item.priority !== "P3")
              .slice(0, limitPerGroup);

            if (!items.length) return null;

            return (
              <article key={group} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-2xl font-black tracking-normal text-slate-950">{groupLabels[group]}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <Link
                      key={item.serviceKey}
                      href={item.primaryRoute}
                      prefetch={false}
                      className="group flex min-h-[12rem] flex-col rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                      data-event="service_card_click"
                      data-service={item.serviceKey}
                      data-city={location || ""}
                      data-priority={item.priority.toLowerCase()}
                      data-source="service_navigation_overview"
                    >
                      <h4 className="mt-3 text-lg font-black text-slate-950">{item.name}</h4>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{item.explanation}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-black text-blue-700">
                        Leistung ansehen
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
