"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { ProfessionalRequestForm } from "@/components/ProfessionalRequestForm";
import type { LeadIntent } from "@/lib/lead-intents";
import {
  requestLocationOptions,
  resolveRequestContext,
  type RequestContextInput,
  type RequestLocation,
  type RequestServiceOption,
} from "@/lib/lead-intents/resolve-request-context";
import { cn } from "@/lib/utils";

const offerConcernScopes: Readonly<Record<string, string>> = {
  price_too_high: "Prüfgrund: Das Angebot wirkt zu teuer.",
  scope_unclear: "Prüfgrund: Der Leistungsumfang ist unklar.",
  too_cheap_risky: "Prüfgrund: Ein sehr billiges Angebot wirkt riskant.",
  provider_unresponsive: "Prüfgrund: Der Anbieter reagiert nicht.",
  date_problem: "Prüfgrund: Der vorgeschlagene Termin passt nicht.",
  addons_unclear: "Prüfgrund: Mögliche Zusatzkosten sind unklar.",
  multiple_offers: "Prüfgrund: Mehrere Angebote sind schwer vergleichbar.",
  no_offer_yet: "Prüfgrund: Es liegt noch kein Angebot vor; gewünscht ist Orientierung.",
};

function useCurrentQuery() {
  const searchParams = useSearchParams();
  const routerQuery = searchParams.toString();
  const [query, setQuery] = useState("");

  useLayoutEffect(() => {
    const syncFromLocation = () => setQuery(window.location.search.replace(/^\?/, ""));
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [routerQuery]);

  return query;
}

function resolveQueryContext(query: string, fallback: RequestContextInput = {}) {
  const params = new URLSearchParams(query);
  const utmSource = params.get("utm_source")?.trim().toLowerCase() || "";
  const utmCampaign = params.get("utm_campaign")?.trim().toLowerCase() || "";
  const isGoogleBusinessProfile =
    ["google", "gbp", "google_business_profile", "google-business-profile"].includes(utmSource) &&
    /(?:^|[_-])gbp(?:[_-]|$)/.test(utmCampaign);
  return resolveRequestContext({
    mode: params.get("mode"),
    location: params.get("location") || params.get("region") || fallback.location,
    city: params.get("city") || fallback.city,
    service: params.get("service") || fallback.service,
    intent: params.get("intent"),
    priority: params.get("priority"),
    source: params.get("source") || (isGoogleBusinessProfile ? "google_maps" : fallback.source),
    entryPage: params.get("entryPage") || fallback.entryPage,
    campaign: params.get("campaign") || params.get("utm_campaign"),
    locale: params.get("locale"),
    ctaComponent: params.get("ctaComponent") || fallback.ctaComponent,
    ctaPosition: params.get("ctaPosition") || fallback.ctaPosition,
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
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
        {context.description}
      </p>
    </>
  );
}

function RequestContextSelector({
  location,
  serviceKey,
  services,
  error,
}: {
  location: RequestLocation | "";
  serviceKey: string;
  services: readonly RequestServiceOption[];
  error?: string;
}) {
  const locationOptions: Array<{ value: RequestLocation; label: string }> = [
    ...requestLocationOptions.map((option) => ({ value: option.id, label: option.label })),
    { value: "unsicher", label: "Noch unsicher" },
  ];
  function selectLocation(nextLocation: RequestLocation) {
    replaceRequestQuery((params) => {
      params.delete("mode");
      params.delete("city");
      params.delete("service");
      params.delete("intent");
      params.delete("priority");
      params.delete("offerConcern");
      params.set("location", nextLocation);
      if (!params.get("source")) params.set("source", "contact_selector");
    });
  }

  function selectService(nextServiceKey: string) {
    if (!location || !nextServiceKey) return;
    const service = services.find((option) => option.key === nextServiceKey);
    if (!service) return;

    replaceRequestQuery((params) => {
      params.delete("mode");
      params.delete("city");
      params.set("location", location);
      params.set("service", service.key);
      params.set("intent", service.intent);
      params.set("priority", "p1");
      params.delete("offerConcern");
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
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "request-context-error" : undefined}
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
        {error ? (
          <p id="request-context-error" className="mt-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function ContactLeadForm({
  fallbackIntent: _fallbackIntent,
  defaultLocation,
  defaultService,
  sourcePage = "/kontakt",
}: {
  fallbackIntent: LeadIntent;
  defaultLocation?: RequestLocation;
  defaultService?: string;
  sourcePage?: string;
}) {
  const query = useCurrentQuery();
  const [entryReset, setEntryReset] = useState(0);
  const fallback = useMemo<RequestContextInput>(
    () => ({
      location: defaultLocation,
      service: defaultService,
      source:
        sourcePage === "/buchung" || sourcePage.endsWith("/buchen")
          ? "buchung"
          : "kontakt",
      entryPage: sourcePage,
    }),
    [defaultLocation, defaultService, sourcePage],
  );
  const context = useMemo(() => resolveQueryContext(query, fallback), [fallback, query]);
  const offerConcern = useMemo(() => {
    if (context.serviceKey !== "angebotscheck") return "";
    const key = new URLSearchParams(query).get("offerConcern") || "";
    return offerConcernScopes[key] || "";
  }, [context.serviceKey, query]);

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
        key={`central-request:${entryReset}:${offerConcern}`}
        context={context}
        sourcePage={sourcePage}
        initialScope={offerConcern}
        selection={(selectionError) => (
          <RequestContextSelector
            location={context.location}
            serviceKey={context.serviceKey}
            services={context.availableServices}
            error={selectionError}
          />
        )}
      />
    </div>
  );
}

export function LegacyBookingContextRedirect() {
  const query = useCurrentQuery();
  const searchParams = useMemo(() => new URLSearchParams(query), [query]);
  const location = searchParams.get("location") || searchParams.get("region");
  const redirectsToContact = ["duesseldorf", "dusseldorf"].includes(
    String(location || "").trim().toLowerCase(),
  );

  useEffect(() => {
    if (!redirectsToContact) return;
    const next = new URLSearchParams();
    for (const key of ["service", "intent", "source", "priority", "mode", "locale", "entryPage", "ctaComponent", "ctaPosition"]) {
      const value = searchParams.get(key)?.trim() || "";
      const valid = key === "entryPage"
        ? /^\/(?!\/)[\p{L}\p{N}/_-]{0,180}$/u.test(value)
        : /^[\p{L}\p{N} _-]{1,80}$/u.test(value);
      if (value && valid) next.set(key, value);
    }
    next.set("location", "duesseldorf");
    if (!next.get("source")) next.set("source", "buchung");
    window.location.replace(`/kontakt?${next.toString()}#direktanfrage`);
  }, [redirectsToContact, searchParams]);

  return redirectsToContact ? (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-white/95 px-6 text-center" role="status">
      <div className="max-w-lg rounded-xl border border-blue-100 bg-blue-50 p-6 text-slate-950 shadow-lg">
        <p className="text-lg font-black">Düsseldorf-Anfrage wird geöffnet</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Wir öffnen den passenden zentralen Anfrageweg für Düsseldorf.
        </p>
      </div>
    </div>
  ) : null;
}

