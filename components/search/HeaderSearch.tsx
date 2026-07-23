"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Search } from "lucide-react";

export function HeaderSearch({
  locale,
  className = "",
  onNavigate,
}: {
  locale: "de" | "en";
  className?: string;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const copy = locale === "de"
    ? { label: "FLOXANT durchsuchen", placeholder: "Leistung oder Frage", button: "Suchen" }
    : { label: "Search FLOXANT", placeholder: "Service or question", button: "Search" };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim();
    const target = locale === "de" ? "/suche" : "/en/search";
    onNavigate?.();
    window.location.assign(normalized ? `${target}#q=${encodeURIComponent(normalized)}` : target);
  }

  return (
    <form
      role="search"
      aria-label={copy.label}
      onSubmit={handleSubmit}
      className={`flex min-w-0 items-stretch gap-2 ${className}`}
    >
      <label className="sr-only" htmlFor={inputId}>{copy.label}</label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={copy.placeholder}
        autoComplete="off"
        className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-500 focus-visible:border-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-600/30"
      />
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-black text-white outline-none hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-cyan-600"
        aria-label={copy.button}
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{copy.button}</span>
      </button>
    </form>
  );
}
