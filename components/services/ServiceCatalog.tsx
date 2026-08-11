"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileSearch, PackageOpen, Sparkles, Truck, X } from "lucide-react";

import type { PublicServiceContent } from "@/lib/services/service-registry";

type FilterState = {
  region: string;
  audience: "all" | "Privat" | "Gewerblich";
  category: "all" | PublicServiceContent["publicCategory"];
  cadence: "all" | PublicServiceContent["publicCadence"];
};

const initialFilters: FilterState = {
  region: "all",
  audience: "all",
  category: "all",
  cadence: "all",
};

const categoryIcons = {
  Reinigung: Sparkles,
  "Umzug und Transport": Truck,
  "Räumung und Auflösung": PackageOpen,
  Angebotsprüfung: FileSearch,
} as const;

export function ServiceCatalog({
  services,
  locale,
}: {
  services: readonly PublicServiceContent[];
  locale: "de" | "en";
}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const visibleServices = services;
  const regions = useMemo(() => [...new Set(visibleServices.flatMap((service) => service.publicRegions))].sort(), [visibleServices]);

  const filtered = useMemo(() => visibleServices.filter((service) => {
    if (filters.region !== "all" && !service.publicRegions.some((region) => region === filters.region)) return false;
    if (filters.audience !== "all" && !service.publicAudienceLabels.includes(filters.audience)) return false;
    if (filters.category !== "all" && service.publicCategory !== filters.category) return false;
    if (filters.cadence !== "all" && service.publicCadence !== "Einmalig oder regelmäßig" && service.publicCadence !== filters.cadence) return false;
    return true;
  }), [filters, visibleServices]);

  const copy = locale === "de" ? {
    region: "Region",
    audience: "Zielgruppe",
    category: "Leistungsart",
    cadence: "Turnus",
    all: "Alle",
    private: "Privat",
    business: "Gewerblich",
    oneOff: "Einmalig",
    recurring: "Regelmäßig",
    cleaning: "Reinigung",
    moving: "Umzug & Transport",
    clearance: "Räumung & Auflösung",
    offer: "Angebotsprüfung",
    results: "sichtbare Leistungen",
    reset: "Filter zurücksetzen",
    signature: "Signature Service",
    special: "Speziallösung",
    target: "Geeignet für",
    details: "Benötigte Angaben",
    open: "Leistung ansehen",
    empty: "Für diese Filterkombination ist keine öffentlich freigegebene Leistung hinterlegt.",
  } : {
    region: "Region",
    audience: "Audience",
    category: "Service type",
    cadence: "Frequency",
    all: "All",
    private: "Private",
    business: "Business",
    oneOff: "One-off",
    recurring: "Recurring",
    cleaning: "Cleaning",
    moving: "Moving & transport",
    clearance: "Clearance",
    offer: "Quote review",
    results: "visible services",
    reset: "Reset filters",
    signature: "Signature service",
    special: "Special solution",
    target: "Suitable for",
    details: "Details required",
    open: "View service",
    empty: "No publicly approved service is registered for this filter combination.",
  };

  const hasFilters = Object.entries(filters).some(([, value]) => value !== "all");
  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div>
      <section aria-label={locale === "de" ? "Servicefilter" : "Service filters"} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect label={copy.region} value={filters.region} onChange={(value) => setFilter("region", value)} options={[{ value: "all", label: copy.all }, ...regions.map((region) => ({ value: region, label: region }))]} />
          <FilterSelect label={copy.audience} value={filters.audience} onChange={(value) => setFilter("audience", value as FilterState["audience"])} options={[{ value: "all", label: copy.all }, { value: "Privat", label: copy.private }, { value: "Gewerblich", label: copy.business }]} />
          <FilterSelect label={copy.category} value={filters.category} onChange={(value) => setFilter("category", value as FilterState["category"])} options={[{ value: "all", label: copy.all }, { value: "Reinigung", label: copy.cleaning }, { value: "Umzug und Transport", label: copy.moving }, { value: "Räumung und Auflösung", label: copy.clearance }, { value: "Angebotsprüfung", label: copy.offer }]} />
          <FilterSelect label={copy.cadence} value={filters.cadence} onChange={(value) => setFilter("cadence", value as FilterState["cadence"])} options={[{ value: "all", label: copy.all }, { value: "Einmalig", label: copy.oneOff }, { value: "Regelmäßig", label: copy.recurring }]} />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-bold text-slate-700" aria-live="polite">{filtered.length} {copy.results}</p>
          {hasFilters ? <button type="button" onClick={() => setFilters(initialFilters)} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-black text-blue-800 outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-cyan-600"><X className="h-4 w-4" aria-hidden="true" />{copy.reset}</button> : null}
        </div>
      </section>

      {filtered.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((service) => {
            const Icon = categoryIcons[service.publicCategory];
            const title = locale === "de" ? service.publicTitle : service.publicEnglishTitle;
            const description = locale === "de"
              ? service.publicDescription
              : `${title} in ${service.publicRegions.join(" and ")}. Scope and availability are checked from the details supplied with the enquiry.`;
            const audience = locale === "de" ? service.publicTargetAudiences.slice(0, 3).join(" · ") : service.publicAudienceLabels.map((item) => item === "Privat" ? "Private customers" : "Businesses").join(" · ");
            const details = locale === "de" ? service.publicRequirements.slice(0, 3).join(" · ") : "Location · service scope · preferred date";
            const href = locale === "en" ? service.publicEnglishRoute ?? service.publicRoute : service.publicRoute;
            return (
              <article key={`${locale}-${href}`} className="flex min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-cyan-200"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <div className="flex flex-wrap justify-end gap-2">
                    {service.publicBadges.includes("Signature Service") ? <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-950">{copy.signature}</span> : null}
                    {service.publicBadges.includes("Speziallösung") ? <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-950">{copy.special}</span> : null}
                  </div>
                </div>
                <h2 className="mt-5 text-2xl font-black leading-tight text-slate-950">{title}</h2>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-700">{description}</p>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div><dt className="font-black text-slate-950">{copy.target}</dt><dd className="mt-1 font-medium leading-6 text-slate-700">{audience}</dd></div>
                  <div><dt className="font-black text-slate-950">{copy.details}</dt><dd className="mt-1 font-medium leading-6 text-slate-700">{details}</dd></div>
                </dl>
                <div className="mt-auto pt-6">
                  <Link href={href} prefetch={false} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white outline-none hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-cyan-600">
                    {copy.open}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : <p className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 font-bold text-amber-950">{copy.empty}</p>}
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly { value: string; label: string }[]; onChange: (value: string) => void }) {
  return <label className="text-sm font-black text-slate-900">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base font-medium text-slate-950 outline-none focus-visible:border-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-600/30">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}
