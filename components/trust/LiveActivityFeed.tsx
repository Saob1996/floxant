"use client";

import React from "react";
import { CheckCircle2, MapPin } from "lucide-react";

export default function LiveActivityFeed({ dic }: { dic?: any }) {
  const locationLabel =
    dic?.calculator?.near_you || dic?.area?.cities?.bavaria || "Bayern";

  const headline =
    dic?.calculator?.social_proof ||
    "Unverbindliche Anfrage in wenigen Schritten";

  const subline =
    dic?.calculator?.start_description ||
    "Sie erhalten eine erste Einschätzung und können danach Ihre Anfrage absenden.";

  return (
    <div className="mb-4 w-full">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-[#11131A]/90 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/15 bg-blue-400/10 text-blue-300">
            <CheckCircle2 size={16} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              <p className="truncate text-sm font-medium tracking-tight text-white">
                {headline}
              </p>
            </div>
            <p className="truncate text-xs text-white/45">{subline}</p>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#0B0D12] px-3 py-1.5 md:flex">
          <MapPin size={14} className="text-blue-300" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
            {locationLabel}
          </span>
        </div>
      </div>
    </div>
  );
}