"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import type {
  ServiceAreaPageConfig,
  ServiceAreaSearchPlace,
  ServiceAreaServiceLink,
} from "@/lib/service-areas";

const shortDirectionLabels: Record<ServiceAreaSearchPlace["direction"], string> = {
  nord: "nördlich",
  nordost: "nordöstlich",
  ost: "östlich",
  suedost: "südöstlich",
  sued: "südlich",
  suedwest: "südwestlich",
  west: "westlich",
  nordwest: "nordwestlich",
};

function normalizePlaceName(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä|ae/g, "a")
    .replace(/ö|oe/g, "o")
    .replace(/ü|ue/g, "u")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-/]/g, " ")
    .replace(/[^a-z0-9 ]+/g, "")
    .replace(/\s+/g, " ");
}

function distanceLabel(distanceKm: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: distanceKm < 10 ? 1 : 0,
    maximumFractionDigits: 1,
  }).format(distanceKm);
}

function requestHrefForService(requestHref: string, serviceId: string) {
  const [pathAndQuery, fragment] = requestHref.split("#", 2);
  const [pathname, query = ""] = pathAndQuery.split("?", 2);
  const params = new URLSearchParams(query);
  params.set("service", serviceId);
  const queryString = params.toString();

  return `${pathname}${queryString ? `?${queryString}` : ""}${fragment ? `#${fragment}` : ""}`;
}

export function ServiceAreaSearch({
  places,
  config,
}: {
  places: ServiceAreaSearchPlace[];
  config: ServiceAreaPageConfig;
}) {
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<ServiceAreaSearchPlace | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(config.primaryServiceId);

  const normalizedQuery = normalizePlaceName(query);
  const suggestions = useMemo(() => {
    if (normalizedQuery.length < 2) return [];

    return places
      .filter((place) => normalizePlaceName(place.name).includes(normalizedQuery))
      .sort((left, right) => {
        const leftExact = normalizePlaceName(left.name) === normalizedQuery ? 0 : 1;
        const rightExact = normalizePlaceName(right.name) === normalizedQuery ? 0 : 1;
        return leftExact - rightExact || left.distanceKm - right.distanceKm;
      })
      .slice(0, 8);
  }, [normalizedQuery, places]);

  function choosePlace(place: ServiceAreaSearchPlace) {
    setQuery(place.name);
    setSelectedPlace(place);
    setSubmittedQuery(place.name);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const exactMatches = places.filter(
      (place) => normalizePlaceName(place.name) === normalizePlaceName(query),
    );
    const match = exactMatches.length === 1 ? exactMatches[0] : null;
    setSelectedPlace(match);
    setSubmittedQuery(query.trim());
    if (match) setQuery(match.name);
  }

  const matchedServices = selectedPlace ? config.serviceLinks : [];
  const selectedService =
    config.serviceLinks.find((service) => service.id === selectedServiceId) ??
    config.serviceLinks[0];
  const selectedRequestHref = selectedService
    ? requestHrefForService(config.requestHref, selectedService.id)
    : config.requestHref;
  const showUnknown = Boolean(submittedQuery && !selectedPlace);

  return (
    <section
      id="ort-pruefen"
      aria-labelledby="service-area-search-heading"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-normal text-blue-700">
          Einsatzgebiet prüfen
        </p>
        <h2
          id="service-area-search-heading"
          className="mt-2 text-2xl font-black tracking-normal text-slate-950 sm:text-3xl"
        >
          Liegt Ihr Ort im regionalen Bereich?
        </h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
          Die Suche nutzt verifizierte amtliche Gemeindepunkte und eine Luftlinie von höchstens
          75 Kilometern. Das Ergebnis ist eine erste Gebietsprüfung, keine Termin- oder
          Verfügbarkeitszusage.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6" role="search" noValidate>
        <label htmlFor={`${config.id}-place-search`} className="text-sm font-black text-slate-950">
          Stadt oder Gemeinde
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id={`${config.id}-place-search`}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedPlace(null);
                setSubmittedQuery("");
              }}
              autoComplete="address-level2"
              aria-describedby={`${config.id}-place-help`}
              className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-12 pr-4 text-base font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder={config.searchPlaceholder}
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Ort prüfen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p id={`${config.id}-place-help`} className="mt-2 text-xs font-semibold leading-5 text-slate-500">
          Groß-/Kleinschreibung, Umlaute, Bindestriche und übliche Umschreibungen werden
          tolerant behandelt.
        </p>

        {suggestions.length > 0 && !selectedPlace ? (
          <div
            className="mt-3 grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2"
            aria-label="Passende Orte"
          >
            {suggestions.map((place) => (
              <button
                key={place.id}
                type="button"
                onClick={() => choosePlace(place)}
                className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>
                  <span className="block">{place.name}</span>
                  <span className="mt-0.5 block text-xs font-semibold text-slate-500">
                    {place.bundesland} · {shortDirectionLabels[place.direction]}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-slate-500">
                  {distanceLabel(place.distanceKm)} km
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </form>

      <div aria-live="polite" className="mt-5">
        {selectedPlace ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  {selectedPlace.name} ({selectedPlace.bundesland}, {shortDirectionLabels[selectedPlace.direction]}) gehört zum modellierten Einsatzgebiet.
                </h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                  Der amtliche Gemeindepunkt liegt rund {distanceLabel(selectedPlace.distanceKm)} km
                  Luftlinie vom Standort {config.id === "duesseldorf" ? "Düsseldorf" : "Regensburg"}
                  entfernt.
                  {selectedPlace.edgeOfArea
                    ? " Der Ort liegt im Randbereich; die konkrete Machbarkeit wird besonders sorgfältig geprüft."
                    : " Bitte senden Sie die Eckdaten, damit Leistung, Termin und Machbarkeit geprüft werden können."}
                </p>
              </div>
            </div>

            {matchedServices.length > 0 ? (
              <div className="mt-4">
                <p className="text-xs font-black uppercase tracking-normal text-emerald-950">
                  Gewünschte Leistung auswählen
                </p>
                <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Passende Leistungen">
                  {matchedServices.map((service) => {
                    const isSelected = service.id === selectedService?.id;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`rounded-full border px-3 py-2 text-xs font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${
                          isSelected
                            ? "border-emerald-800 bg-emerald-800 text-white"
                            : "border-emerald-300 bg-white text-emerald-900 hover:border-emerald-500"
                        }`}
                      >
                        {service.label}
                      </button>
                    );
                  })}
                </div>
                {selectedService ? (
                  <Link
                    href={selectedService.href}
                    className="mt-3 inline-flex text-xs font-black text-emerald-900 underline decoration-emerald-400 underline-offset-4 hover:text-emerald-700"
                  >
                    Details zu {selectedService.label} ansehen
                  </Link>
                ) : null}
              </div>
            ) : null}

            <Link
              href={selectedRequestHref}
              data-event="seo_cta_click"
              data-region={config.id}
              data-service={selectedService?.id ?? config.primaryServiceId}
              data-page-intent="einsatzgebiet-anfrage"
              data-cta-label={`${selectedService?.label ?? config.primaryServiceLabel} anfragen`}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Eckdaten zu {selectedService?.label ?? config.primaryServiceLabel} senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}

        {showUnknown ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  „{submittedQuery}“ wurde nicht eindeutig gefunden.
                </h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                  {suggestions.length > 0
                    ? "Bitte wählen Sie oben den vollständigen Ort aus. Eine Teileingabe wird nicht automatisch einem möglicherweise falschen Ort zugeordnet."
                    : "Das ist keine automatische Absage. Der Ort kann anders geschrieben sein oder nahe an der Grenze liegen. Senden Sie den vollständigen Ort zusammen mit der gewünschten Leistung; FLOXANT prüft die Anfrage persönlich."}
                </p>
                <Link
                  href={config.requestHref}
                  className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  Ort persönlich prüfen lassen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
