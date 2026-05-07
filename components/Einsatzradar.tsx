"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Radar, ShieldCheck } from "lucide-react";

import type {
  EinsatzradarEntry,
  EinsatzradarFilter,
  EinsatzradarZone,
} from "@/lib/einsatzradar-data";

type EinsatzradarProps = {
  entries: EinsatzradarEntry[];
  filters: EinsatzradarFilter[];
  zones?: EinsatzradarZone[];
  variant?: "full" | "compact";
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showFilters?: boolean;
  showZones?: boolean;
  source?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const serviceTone: Record<string, string> = {
  umzug: "border-blue-200 bg-blue-50 text-blue-800",
  reinigung: "border-emerald-200 bg-emerald-50 text-emerald-800",
  entruempelung: "border-orange-200 bg-orange-50 text-orange-800",
  transport: "border-cyan-200 bg-cyan-50 text-cyan-800",
  rueckfahrt: "border-indigo-200 bg-indigo-50 text-indigo-800",
  uebergabeakte: "border-amber-200 bg-amber-50 text-amber-900",
  mieterwechsel: "border-slate-200 bg-slate-100 text-slate-800",
  hausverwaltung: "border-stone-200 bg-stone-100 text-stone-800",
  premium: "border-zinc-300 bg-zinc-950 text-white",
  duesseldorf_reinigung: "border-teal-200 bg-teal-50 text-teal-800",
  duesseldorf_entsorgung: "border-rose-200 bg-rose-50 text-rose-800",
};

function formatService(value: string) {
  return value
    .replace(/_/g, " ")
    .replace("duesseldorf", "Duesseldorf")
    .replace("rueckfahrt", "Rueckfahrt")
    .replace("uebergabeakte", "Uebergabeakte")
    .replace("entruempelung", "Entruempelung");
}

export function Einsatzradar({
  entries,
  filters,
  zones = [],
  variant = "full",
  title = "FLOXANT Einsatzradar",
  subtitle = "Typische Einsatzarten, grobe Regionen und passende FLOXANT Einstiege ohne Kundendaten.",
  maxItems,
  showFilters = true,
  showZones = true,
  source = "einsatzradar",
  ctaHref = "/einsatzradar-regensburg",
  ctaLabel = "Einsatzradar ansehen",
}: EinsatzradarProps) {
  const [activeFilter, setActiveFilter] = useState<EinsatzradarFilter["id"]>("all");
  const isCompact = variant === "compact";

  const visibleEntries = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? entries
        : entries.filter((entry) => entry.service_type === activeFilter);

    return typeof maxItems === "number" ? filtered.slice(0, maxItems) : filtered;
  }, [activeFilter, entries, maxItems]);

  return (
    <section
      className={isCompact ? "px-4 py-12 sm:px-6" : "px-4 py-14 sm:px-6 lg:py-18"}
      data-event="view_einsatzradar"
      data-source={source}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              <Radar className="h-4 w-4" />
              Operations Radar
            </div>
            <h2 className={isCompact ? "mt-4 text-3xl font-black tracking-tight text-slate-950" : "mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-5xl"}>
              {title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{subtitle}</p>
          </div>
          <Link
            href={ctaHref}
            data-event="click_einsatzradar_cta"
            data-source={source}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {showZones && zones.length ? (
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {zones.map((zone) => (
              <details
                key={zone.id}
                className="group rounded-[1.45rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 open:border-blue-200 open:bg-blue-50/50"
                data-event="open_einsatzradar_region"
                data-region={zone.id}
              >
                <summary className="cursor-pointer list-none">
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">{zone.label}</span>
                  <span className="mt-2 block text-base font-black text-slate-950">{zone.title}</span>
                </summary>
                <p className="mt-3 text-xs leading-6 text-slate-600">{zone.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {zone.examples.slice(0, 5).map((example) => (
                    <span key={example} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-600">
                      {example}
                    </span>
                  ))}
                </div>
              </details>
            ))}
          </div>
        ) : null}

        {showFilters ? (
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  data-event="filter_einsatzradar_service"
                  data-filter={filter.id}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${
                    active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className={isCompact ? "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
          {visibleEntries.map((entry) => (
            <article
              key={entry.id}
              data-event="click_einsatzradar_card"
              data-service={entry.service_type}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition group-hover:opacity-100" />
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${serviceTone[entry.service_type] || "border-slate-200 bg-slate-50 text-slate-700"}`}>
                  {formatService(entry.service_type)}
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  {entry.timeframe_label}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">{entry.title}</h3>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500">
                <MapPin className="h-4 w-4 text-blue-600" />
                {entry.approximate_location} · {entry.direction_or_area}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">{entry.description}</p>

              <div className="mt-5 grid gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">FLOXANT prueft</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.included_services.map((service) => (
                      <span key={service} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Signature-Verknuepfung</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.signature_services.map((service) => (
                      <span key={service} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/70 p-3 text-xs leading-6 text-amber-900">
                <ShieldCheck className="mb-2 h-4 w-4" />
                Grobe Region, keine Adresse, keine Kundendaten, keine Live-Behauptung.
              </div>

              <Link
                href={entry.target_url}
                data-event="click_einsatzradar_cta"
                data-service={entry.service_type}
                data-source={source}
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-950"
              >
                {entry.cta_label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        {!visibleEntries.length ? (
          <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-600">
            Fuer diesen Filter sind noch keine typischen Einsatzarten veroeffentlicht.
          </div>
        ) : null}
      </div>
    </section>
  );
}
