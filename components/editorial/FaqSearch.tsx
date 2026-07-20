"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { FaqAccordion } from "@/components/editorial/FaqAccordion";
import type { DisplayFaq } from "@/components/editorial/types";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .trim();
}

export function FaqSearch({
  items,
  locale,
}: {
  items: readonly DisplayFaq[];
  locale: "de" | "en";
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, locale)),
    [items, locale],
  );
  const regions = useMemo(
    () => [...new Set(items.map((item) => item.region).filter(Boolean) as string[])].sort(),
    [items],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query);
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (region !== "all" && item.region !== region) return false;
      if (!normalizedQuery) return true;
      return normalize(`${item.question} ${item.shortAnswer} ${item.detailedAnswer || ""}`).includes(
        normalizedQuery,
      );
    });
  }, [category, items, query, region]);

  const copy = locale === "de"
    ? {
        label: "Fragen durchsuchen",
        placeholder: "Zum Beispiel: Fotos, Angebot oder Zugang",
        category: "Thema",
        region: "Region",
        all: "Alle",
        results: "passende Fragen",
        empty: "Keine passende Frage gefunden. Öffnen Sie einen Service oder stellen Sie Ihre Anfrage direkt.",
        reset: "Filter zurücksetzen",
      }
    : {
        label: "Search questions",
        placeholder: "For example: photos, quote or access",
        category: "Topic",
        region: "Region",
        all: "All",
        results: "matching questions",
        empty: "No matching question was found. Open a service or send a direct enquiry.",
        reset: "Reset filters",
      };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
        <label className="block text-sm font-black text-slate-950" htmlFor={`faq-search-${locale}`}>
          {copy.label}
        </label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" aria-hidden="true" />
          <input
            id={`faq-search-${locale}`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.placeholder}
            autoComplete="off"
            className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-base text-slate-950 outline-none placeholder:text-slate-500 focus-visible:border-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-600/30"
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-bold text-slate-800">
            {copy.category}
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
            >
              <option value="all">{copy.all}</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-sm font-bold text-slate-800">
            {copy.region}
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="mt-1 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
            >
              <option value="all">{copy.all}</option>
              {regions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm font-bold text-slate-700">
            {filtered.length} {copy.results}
          </p>
          {(query || category !== "all" || region !== "all") ? (
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory("all"); setRegion("all"); }}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-black text-blue-800 outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-cyan-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              {copy.reset}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        {filtered.length ? (
          <FaqAccordion items={filtered} />
        ) : (
          <p className="rounded-2xl border border-amber-300 bg-amber-50 p-5 font-bold leading-7 text-amber-950">
            {copy.empty}
          </p>
        )}
      </div>
    </div>
  );
}
