"use client";

import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

import { getRegionalRoutePolicy } from "@/lib/regional-route-policy";

type RegionalRouteNoticeProps = {
  pathname: string;
};

export function RegionalRouteNotice({ pathname }: RegionalRouteNoticeProps) {
  const policy = getRegionalRoutePolicy(pathname);

  if (!policy) return null;

  return (
    <aside className="bg-slate-950 px-5 pb-5 pt-28 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-lg border border-white/12 bg-white/[0.06] p-4 shadow-[0_18px_60px_rgba(2,6,23,0.22)] backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:p-5">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-md border border-cyan-100/20 bg-cyan-100/12 px-3 py-2 text-xs font-black uppercase tracking-normal text-cyan-100">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Regensburg-Seite neu eingeordnet
          </p>
          <h2 className="mt-3 text-xl font-black leading-snug tracking-normal text-white md:text-2xl">
            {policy.label}
          </h2>
          <p className="mt-2 max-w-4xl text-sm font-semibold leading-7 text-slate-200">
            {policy.customerNeed} Düsseldorf bleibt bei FLOXANT getrennt für Reinigung
            positioniert; diese Seite gehört zum Regensburg-Bereich und wird nach
            Objekt, Fotos, Umfang und Termin geprüft.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:min-w-[26rem]">
          <Link
            href="/leistungen#regensburg"
            data-event="service_card_click"
            data-region="regensburg"
            data-source="regional_route_notice"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
          >
            Leistungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={policy.targetHref}
            data-event="service_card_click"
            data-region="regensburg"
            data-source="regional_route_notice_target"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/16 bg-white/10 px-4 text-sm font-black text-white transition hover:bg-white/15"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {policy.targetLabel}
          </Link>
        </div>
      </div>
    </aside>
  );
}
