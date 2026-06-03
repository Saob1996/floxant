import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

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

        return (
          <Link
            key={region.id}
            href={region.href}
            data-event="region_select"
            data-region={region.id}
            data-source={source}
            className={cn(
              "group min-w-0 rounded-lg border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              active
                ? "border-blue-700 ring-2 ring-blue-100"
                : "border-slate-200 hover:border-slate-300",
              compact && "p-4",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700"
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-normal text-slate-950">
              {region.label}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {region.shortDescription}
            </p>
            <span className="mt-5 inline-flex text-sm font-black text-blue-700">
              {region.primaryCta}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

