"use client";

import { useEffect, useMemo, useState } from "react";

import { ProfessionalRequestForm } from "@/components/ProfessionalRequestForm";
import type { LeadIntent } from "@/lib/lead-intents";
import {
  resolveRequestContext,
  type RequestLocation,
  type RequestServiceOption,
} from "@/lib/lead-intents/resolve-request-context";
import { cn } from "@/lib/utils";

function useCurrentQuery() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const syncQuery = () => setQuery(window.location.search);
    syncQuery();
    window.addEventListener("popstate", syncQuery);
    return () => window.removeEventListener("popstate", syncQuery);
  }, []);

  return query;
}

function resolveQueryContext(query: string) {
  const params = new URLSearchParams(query);
  return resolveRequestContext({
    mode: params.get("mode"),
    location: params.get("location"),
    city: params.get("city"),
    service: params.get("service"),
    intent: params.get("intent"),
    priority: params.get("priority"),
    source: params.get("source"),
    entryPage: params.get("entryPage"),
    campaign: params.get("campaign") || params.get("utm_campaign"),
    locale: params.get("locale"),
  });
}

function replaceRequestQuery(update: (params: URLSearchParams) => void) {
  const params = new URLSearchParams(window.location.search);
  update(params);
  const nextQuery = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}#direktanfrage`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function ContactHeroBadge() {
  const query = useCurrentQuery();
  const context = useMemo(() => resolveQueryContext(query), [query]);

  return <span data-request-badge>{context.badge}</span>;
}

export function ContactHeroCopy({
  fallbackIntent: _fallbackIntent,
}: {
  fallbackIntent: LeadIntent;
}) {
  const query = useCurrentQuery();
  const context = useMemo(() => resolveQueryContext(query), [query]);

  return (
    <>
      <h1
        className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
        data-request-headline
      >
        {context.headline}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
        {context.description}
      </p>
    </>
  );
}

function RequestContextSelector({
  location,
  serviceKey,
  services,
}: {
  location: RequestLocation | "";
  serviceKey: string;
  services: readonly RequestServiceOption[];
}) {
  const locationOptions: Array<{ value: RequestLocation; label: string }> = [
    { value: "duesseldorf", label: "Düsseldorf" },
    { value: "regensburg", label: "Regensburg" },
    { value: "unsicher", label: "Noch unsicher" },
  ];
  function selectLocation(nextLocation: RequestLocation) {
    replaceRequestQuery((params) => {
      params.delete("mode");
      params.delete("city");
      params.delete("service");
      params.delete("intent");
      params.delete("priority");
      params.set("location", nextLocation);
      if (!params.get("source")) params.set("source", "contact_selector");
    });
  }

  function selectService(nextServiceKey: string) {
    if (!location || !nextServiceKey) return;
    const service = services.find((option) => option.key === nextServiceKey);
    if (!service) return;

    if (service.key === "angebot-pruefen") {
      window.location.assign("/angebot-guenstiger-pruefen?source=contact_selector");
      return;
    }

    replaceRequestQuery((params) => {
      params.delete("mode");
      params.delete("city");
      params.set("location", location);
      params.set("service", service.key);
      params.set("intent", service.intent);
      params.set("priority", "p1");
      if (!params.get("source")) params.set("source", "contact_selector");
    });
  }

  return (
    <section
      className="mb-4 grid gap-5 rounded-lg border border-blue-200 bg-blue-50/70 p-5"
      aria-label="Standort und Leistung auswählen"
      data-request-context-selector
    >
      <fieldset>
        <legend className="text-base font-black text-slate-950">
          1. Wo wird die Leistung benötigt?
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {locationOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => selectLocation(option.value)}
              aria-pressed={location === option.value}
              className={cn(
                "min-h-11 rounded-lg border px-3 text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                location === option.value
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-200 bg-white text-slate-800 hover:border-blue-300",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="request-service-choice" className="text-base font-black text-slate-950">
          2. Welche Leistung benötigen Sie?
        </label>
        <select
          id="request-service-choice"
          value={serviceKey}
          onChange={(event) => selectService(event.target.value)}
          disabled={!location}
          className="mt-3 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        >
          <option value="">
            {location ? "Bitte Leistung auswählen" : "Bitte zuerst Standort auswählen"}
          </option>
          {services.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export function ContactLeadForm({
  fallbackIntent: _fallbackIntent,
}: {
  fallbackIntent: LeadIntent;
}) {
  const query = useCurrentQuery();
  const [entryReset, setEntryReset] = useState(0);
  const context = useMemo(() => resolveQueryContext(query), [query]);

  useEffect(() => {
    const reset = () => setEntryReset((current) => current + 1);
    window.addEventListener("floxant:neutral-request-entry", reset);
    return () => window.removeEventListener("floxant:neutral-request-entry", reset);
  }, []);

  return (
    <div
      id="direktanfrage"
      className="order-first scroll-mt-28 lg:order-none lg:scroll-mt-32"
      tabIndex={-1}
    >
      <ProfessionalRequestForm
        key={`${query || "static-contact-default"}:${entryReset}`}
        context={context}
        selection={
          <RequestContextSelector
            location={context.location}
            serviceKey={context.serviceKey}
            services={context.availableServices}
          />
        }
      />
    </div>
  );
}

