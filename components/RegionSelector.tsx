import Link from "next/link";
import { ArrowRight, Building2, Home } from "lucide-react";

import {
  floxantRegions,
  type FloxantRegion,
} from "@/lib/floxant-services";
import { cn } from "@/lib/utils";

type RegionSelectorProps = {
  activeRegion?: FloxantRegion;
  className?: string;
  compact?: boolean;
  source?: string;
};

export function RegionSelector({
  activeRegion,
  className,
  compact = false,
  source = "region_selector",
}: RegionSelectorProps) {
  return (
    <div
      className={cn(
        "grid gap-3 md:grid-cols-2",
        compact && "gap-2",
        className,
      )}
    >
      {Object.values(floxantRegions).map((region) => {
        const active = activeRegion === region.id;
        const isDuesseldorf = region.id === "duesseldorf";
        const Icon = isDuesseldorf ? Building2 : Home;
        const points = isDuesseldorf
          ? ["Gewerbereinigung", "Büro & Praxis", "Angebot prüfen"]
          : ["Umzug", "Entrümpelung", "Übergabe"];

        return (
          <Link
            key={region.id}
            href={region.href}
            data-event="region_select"
            data-region={region.id}
            data-source={source}
            className={cn(
              "group min-w-0 rounded-lg border bg-white/95 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-5",
              active
                ? "border-blue-700 ring-2 ring-blue-100"
                : "border-slate-200 hover:border-slate-300",
              compact && "p-4",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-black uppercase tracking-normal text-blue-700">
                  {region.city}
                </span>
              </div>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700"
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-normal text-slate-950 sm:text-[1.7rem]">
              {region.label}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {region.shortDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {points.map((point) => (
                <span
                  key={point}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700"
                >
                  {point}
                </span>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
              {region.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
