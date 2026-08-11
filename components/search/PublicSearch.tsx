"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";

export type PublicSearchEntry = {
  title: string;
  description: string;
  url: string;
  locale: "de" | "en";
  type: "Leistung" | "Besondere Leistung" | "Frage" | "Ratgeber" | "Standort" | "Service" | "Special service" | "Question" | "Guide" | "Location";
  regions: string[];
};

const synonyms: Record<string, string[]> = {
  umzug: ["moving", "move", "transport"],
  moving: ["umzug", "transport"],
  reinigung: ["cleaning", "sauber", "putzen"],
  cleaning: ["reinigung", "clean"],
  raeumung: ["räumung", "entruempelung", "entrümpelung", "clearance"],
  entruempelung: ["entrümpelung", "raeumung", "räumung", "clearance"],
  clearance: ["entruempelung", "räumung", "auflösung"],
  angebot: ["quote", "offer", "kostenvoranschlag"],
  quote: ["angebot", "offer"],
  duesseldorf: ["düsseldorf"],
  dusseldorf: ["düsseldorf"],
  regensburg: ["regensburg"],
  buero: ["büro", "office", "gewerbe"],
  office: ["büro", "buero", "business"],
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function editDistanceAtMostOne(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  if (a.length > b.length) return editDistanceAtMostOne(b, a);
  let i = 0;
  let j = 0;
  let differences = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i += 1; j += 1; continue; }
    differences += 1;
    if (differences > 1) return false;
    if (a.length === b.length) { i += 1; j += 1; }
    else j += 1;
  }
  return differences + Number(j < b.length) <= 1;
}

function scoreEntry(entry: PublicSearchEntry, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;
  const queryTokens = normalizedQuery.split(/\s+/).flatMap((token) => [token, ...(synonyms[token] || []).map(normalize)]);
  const title = normalize(entry.title);
  const haystack = normalize(`${entry.title} ${entry.description} ${entry.regions.join(" ")}`);
  const haystackTokens = haystack.split(/\s+/);
  let score = title.includes(normalizedQuery) ? 12 : haystack.includes(normalizedQuery) ? 7 : 0;
  for (const token of queryTokens) {
    if (title.split(/\s+/).includes(token)) score += 6;
    else if (haystackTokens.includes(token)) score += 3;
    else if (token.length >= 5 && haystackTokens.some((candidate) => candidate.length >= 5 && editDistanceAtMostOne(token, candidate))) score += 1;
  }
  return score;
}

export function PublicSearch({
  locale,
  fallbackLinks,
}: {
  locale: "de" | "en";
  fallbackLinks: readonly { href: string; label: string; description: string }[];
}) {
  const [entries, setEntries] = useState<PublicSearchEntry[]>([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [region, setRegion] = useState("all");
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [activeIndex, setActiveIndex] = useState(-1);
  const loaded = useRef(false);

  const ensureIndex = useCallback(async () => {
    if (loaded.current) return;
    loaded.current = true;
    setState("loading");
    try {
      const response = await fetch("/search-index.json", { cache: "force-cache" });
      if (!response.ok) throw new Error("search-index-unavailable");
      const data = await response.json() as { entries?: PublicSearchEntry[] } | PublicSearchEntry[];
      const nextEntries = Array.isArray(data) ? data : data.entries || [];
      setEntries(nextEntries.filter((entry) => entry.locale === locale));
      setState("ready");
    } catch {
      loaded.current = false;
      setState("error");
    }
  }, [locale]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const initialQuery = params.get("q")?.trim();
    if (!initialQuery) return;
    setQuery(initialQuery);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }, []);

  useEffect(() => {
    if (query.trim()) void ensureIndex();
  }, [ensureIndex, query]);

  const results = useMemo(() => entries
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ entry, score }) => score > 0 && (type === "all" || entry.type === type) && (region === "all" || entry.regions.includes(region)))
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, locale))
    .slice(0, 20), [entries, locale, query, region, type]);

  useEffect(() => { setActiveIndex(-1); }, [query, type, region]);

  const copy = locale === "de" ? {
    label: "FLOXANT durchsuchen",
    placeholder: "Leistung, Frage oder Ratgeber",
    type: "Inhaltstyp",
    region: "Region",
    all: "Alle",
    service: "Leistungen",
    signature: "Signature Services",
    faq: "Fragen",
    article: "Ratgeber",
    results: "Suchergebnisse",
    loading: "Der lokale Suchindex wird geladen.",
    empty: "Keine passende öffentliche Seite gefunden. Versuchen Sie einen allgemeineren Begriff oder öffnen Sie eine Hauptleistung.",
    error: "Der Suchindex ist gerade nicht verfügbar. Die wichtigsten Einstiege bleiben unten direkt erreichbar.",
    suggestions: "Direkte Einstiege",
    clear: "Suche löschen",
    noScript: "Für die lokale Suche ist JavaScript erforderlich. Alle wichtigen Einstiege bleiben unten direkt erreichbar.",
  } : {
    label: "Search FLOXANT",
    placeholder: "Service, question or guide",
    type: "Content type",
    region: "Region",
    all: "All",
    service: "Services",
    signature: "Signature services",
    faq: "Questions",
    article: "Guides",
    results: "Search results",
    loading: "The local search index is loading.",
    empty: "No matching public page was found. Try a broader term or open a main service.",
    error: "The search index is currently unavailable. The key entry points below remain available.",
    suggestions: "Direct links",
    clear: "Clear search",
    noScript: "JavaScript is required for local search. All main links remain available below.",
  };
  const typeOptions = locale === "de"
    ? [
        { value: "Leistung", label: copy.service },
        { value: "Besondere Leistung", label: copy.signature },
        { value: "Frage", label: copy.faq },
        { value: "Ratgeber", label: copy.article },
      ]
    : [
        { value: "Service", label: copy.service },
        { value: "Special service", label: copy.signature },
        { value: "Question", label: copy.faq },
        { value: "Guide", label: copy.article },
      ];

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") { setQuery(""); setActiveIndex(-1); return; }
    if (!results.length) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((current) => Math.min(current + 1, results.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((current) => Math.max(current - 1, 0)); }
    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      window.location.assign(results[activeIndex].entry.url);
    }
  }

  return (
    <div>
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
        <label htmlFor={`public-search-${locale}`} className="text-sm font-black text-slate-950">{copy.label}</label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" aria-hidden="true" />
          <input
            id={`public-search-${locale}`}
            type="search"
            value={query}
            role="combobox"
            aria-autocomplete="list"
            aria-controls={`public-search-results-${locale}`}
            aria-expanded={Boolean(query && results.length)}
            aria-activedescendant={activeIndex >= 0 ? `search-result-${locale}-${activeIndex}` : undefined}
            onFocus={() => void ensureIndex()}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={copy.placeholder}
            autoComplete="off"
            className="min-h-14 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-lg font-medium text-slate-950 outline-none placeholder:text-slate-500 focus-visible:border-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-600/30"
          />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label={copy.clear} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-slate-700 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-600"><X className="h-5 w-5" aria-hidden="true" /></button> : null}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-bold text-slate-800">{copy.type}<select value={type} onChange={(event) => setType(event.target.value)} className="mt-1 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"><option value="all">{copy.all}</option>{typeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-800">{copy.region}<select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-1 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"><option value="all">{copy.all}</option><option value="Düsseldorf">Düsseldorf</option><option value="Regensburg">Regensburg</option></select></label>
        </div>
      </section>

      <p role="status" aria-live="polite" className="sr-only">
        {query && state === "ready"
          ? activeIndex >= 0 && results[activeIndex]?.entry.title
            ? `${copy.results}: ${results[activeIndex].entry.title}`
            : `${results.length} ${copy.results}`
          : ""}
      </p>
      <section
        id={`public-search-results-${locale}`}
        aria-labelledby={`public-search-results-heading-${locale}`}
        className="mt-8"
      >
        <h2 id={`public-search-results-heading-${locale}`} className="sr-only">{copy.results}</h2>
        {state === "loading" ? <p className="font-bold text-slate-700">{copy.loading}</p> : null}
        {state === "error" ? <p className="rounded-2xl border border-amber-300 bg-amber-50 p-5 font-bold text-amber-950">{copy.error}</p> : null}
        {query && state === "ready" && !results.length ? <p className="rounded-2xl border border-slate-300 bg-white p-5 font-bold text-slate-800">{copy.empty}</p> : null}
        {query && results.length ? (
          <ul role="listbox" className="grid list-none gap-3">
            {results.map(({ entry }, index) => (
              <li key={entry.url} role="option" aria-selected={activeIndex === index}>
                <Link id={`search-result-${locale}-${index}`} href={entry.url} prefetch={false} className={`group block rounded-2xl border bg-white p-5 outline-none ${activeIndex === index ? "border-cyan-700 ring-2 ring-cyan-600/30" : "border-slate-200 hover:border-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600"}`}>
                  <span className="text-xs font-black uppercase tracking-[0.1em] text-cyan-900">{entry.type}</span><span className="mt-1 block text-xl font-black text-slate-950">{entry.title}</span><span className="mt-2 block text-sm font-medium leading-6 text-slate-700">{entry.description}</span><ArrowRight className="mt-3 h-4 w-4 text-blue-800 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <noscript><p className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 font-bold text-slate-800">{copy.noScript}</p></noscript>
      <section className="mt-10"><h2 className="text-2xl font-black text-slate-950">{copy.suggestions}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{fallbackLinks.map((link) => <Link key={link.href} href={link.href} prefetch={false} className="rounded-2xl border border-slate-200 bg-white p-5 outline-none hover:border-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600"><span className="font-black text-slate-950">{link.label}</span><span className="mt-1 block text-sm font-medium leading-6 text-slate-700">{link.description}</span></Link>)}</div></section>
    </div>
  );
}
