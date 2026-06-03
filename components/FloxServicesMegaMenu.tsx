"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { FloxServiceCard } from "@/components/FloxServiceCard";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantRegions,
  getServicesByRegionAndCategory,
  type FloxantRegion,
  type FloxantServiceCategory,
} from "@/lib/floxant-services";
import { cn } from "@/lib/utils";

const categoryOrder: FloxantServiceCategory[] = ["normal", "signature", "special"];

type FloxServicesMegaMenuProps = {
  mode?: "desktop" | "mobile";
  initialRegion?: FloxantRegion;
  onNavigate?: () => void;
};

export function FloxServicesMegaMenu({
  mode = "desktop",
  initialRegion = "duesseldorf",
  onNavigate,
}: FloxServicesMegaMenuProps) {
  const [activeRegion, setActiveRegion] = useState<FloxantRegion>(initialRegion);

  const activeServices = useMemo(
    () =>
      categoryOrder.map((category) => ({
        category,
        services: getServicesByRegionAndCategory(activeRegion, category),
      })),
    [activeRegion],
  );

  if (mode === "mobile") {
    return (
      <div className="grid gap-3">
        {(Object.keys(floxantRegions) as FloxantRegion[]).map((regionId) => {
          const region = floxantRegions[regionId];

          return (
            <details
              key={regionId}
              className="rounded-lg border border-slate-200 bg-white"
              open={regionId === initialRegion}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
                <span className="min-w-0">
                  <span className="block text-sm font-black text-slate-950">
                    {region.label}
                  </span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                    {region.shortDescription}
                  </span>
                </span>
                <MapPin className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              </summary>

              <div className="grid gap-3 border-t border-slate-200 p-3">
                {categoryOrder.map((category) => {
                  const services = getServicesByRegionAndCategory(regionId, category);
                  if (!services.length) return null;

                  return (
                    <details key={`${regionId}-${category}`} className="rounded-lg bg-slate-50" open={category === "normal"}>
                      <summary className="cursor-pointer list-none px-3 py-3">
                        <span className="block text-xs font-black uppercase tracking-normal text-slate-700">
                          {floxantCategoryLabels[category]}
                        </span>
                        <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                          {floxantCategoryDescriptions[category]}
                        </span>
                      </summary>
                      <div className="grid gap-2 px-2 pb-2">
                        {services.map((service) => (
                          <FloxServiceCard
                            key={service.id}
                            service={service}
                            compact
                            source="mobile_mega_menu"
                            className="shadow-none"
                          />
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid max-h-[calc(100vh-7rem)] gap-4 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.18)] xl:grid-cols-[13.5rem_1fr]">
      <div className="rounded-lg bg-slate-50 p-2.5">
        <p className="px-2 text-xs font-black uppercase tracking-normal text-slate-500">
          Region auswählen
        </p>
        <div className="mt-3 grid gap-2">
          {(Object.keys(floxantRegions) as FloxantRegion[]).map((regionId) => {
            const region = floxantRegions[regionId];
            const active = activeRegion === regionId;

            return (
              <button
                key={regionId}
                type="button"
                onMouseEnter={() => setActiveRegion(regionId)}
                onFocus={() => setActiveRegion(regionId)}
                onClick={() => setActiveRegion(regionId)}
                data-event="region_select"
                data-region={regionId}
                data-source="desktop_mega_menu"
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                  active
                    ? "border-blue-700 bg-white shadow-sm"
                    : "border-transparent hover:border-slate-200 hover:bg-white",
                )}
              >
                <span className="block text-sm font-black text-slate-950">
                  {region.label}
                </span>
                <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                  {region.shortDescription}
                </span>
              </button>
            );
          })}
        </div>

        <Link
          href={floxantRegions[activeRegion].href}
          onClick={onNavigate}
          data-event="region_select"
          data-region={activeRegion}
          data-source="desktop_mega_menu_region_cta"
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-800"
        >
          {floxantRegions[activeRegion].primaryCta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-3">
        {activeServices.map(({ category, services }) => {
          if (!services.length) return null;

          return (
            <section key={category}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-normal text-slate-700">
                    {floxantCategoryLabels[category]}
                  </h3>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    {floxantCategoryDescriptions[category]}
                  </p>
                </div>
              </div>
              <div className="grid gap-2 lg:grid-cols-3">
                {services.map((service) => (
                  <FloxServiceCard
                    key={service.id}
                    service={service}
                    compact
                    source="desktop_mega_menu"
                    className="min-h-[9.75rem] p-3"
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
