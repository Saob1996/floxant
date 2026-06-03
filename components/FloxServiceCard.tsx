import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";

import {
  floxantCategoryLabels,
  floxantRegions,
  type FloxantService,
} from "@/lib/floxant-services";
import { cn } from "@/lib/utils";

type FloxServiceCardProps = {
  service: FloxantService;
  compact?: boolean;
  className?: string;
  source?: string;
};

export function FloxServiceCard({
  service,
  compact = false,
  className,
  source = "service_card",
}: FloxServiceCardProps) {
  const region = floxantRegions[service.region];

  return (
    <Link
      href={service.href}
      data-event="service_card_click"
      data-service={service.id}
      data-region={service.region}
      data-category={service.category}
      data-source={source}
      className={cn(
        "group flex h-full min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500",
        compact ? "gap-2" : "gap-3 p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex min-h-8 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[11px] font-bold text-slate-600">
          <MapPin className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
          {region.city}
        </span>
        {service.googleAdsRelevant ? (
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-cyan-800">
            <Star className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-normal text-slate-500">
          {floxantCategoryLabels[service.category]}
        </p>
        <h3 className="mt-1 text-base font-black leading-snug text-slate-950">
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm font-medium leading-6 text-slate-600",
            compact && "line-clamp-2",
          )}
        >
          {service.shortDescription}
        </p>
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-black text-blue-700">
        {service.ctaLabel}
        <ArrowRight
          className="h-4 w-4 transition group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

