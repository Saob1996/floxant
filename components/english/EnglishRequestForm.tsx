"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { PrivacyConsentField } from "@/components/PrivacyConsentField";
import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";

type SubmitState = "idle" | "sending" | "success" | "error";

const servicesByRegion = {
  "": [],
  duesseldorf: [
    { value: "reinigung", label: "Cleaning service" },
    { value: "bueroreinigung", label: "Office cleaning" },
    { value: "gewerbereinigung", label: "Commercial cleaning" },
    { value: "praxisreinigung", label: "Practice cleaning" },
    { value: "fensterreinigung", label: "Window cleaning" },
    { value: "angebot-vergleichen", label: "Cleaning quote review" },
  ],
  regensburg: [
    { value: "reinigung", label: "Cleaning service" },
    { value: "bueroreinigung", label: "Office cleaning" },
    { value: "wohnungsreinigung", label: "Apartment cleaning" },
    { value: "grundreinigung", label: "Deep cleaning" },
    { value: "treppenhausreinigung", label: "Stairwell cleaning" },
    { value: "umzug", label: "Moving service" },
    { value: "umzugsunternehmen", label: "Moving company" },
    { value: "umzug-kosten", label: "Moving costs" },
    { value: "entruempelung", label: "Clearance" },
    { value: "wohnungsaufloesung", label: "House or apartment clearance" },
    { value: "reinigung-nach-umzug", label: "Cleaning after moving" },
    { value: "angebot-vergleichen", label: "Quote review" },
  ],
} as const;

type Region = keyof typeof servicesByRegion;
type ServiceRegion = Exclude<Region, "">;

const serviceAliases: Readonly<Record<string, string>> = {
  angebotscheck: "angebot-vergleichen",
  endreinigung: "reinigung-nach-umzug",
  gebaeudereinigung: "gewerbereinigung",
  "umzug-mit-reinigung": "reinigung-nach-umzug",
};

function isServiceRegion(value: string | null): value is ServiceRegion {
  return value === "duesseldorf" || value === "regensburg";
}

function normalizeRequestedService(value: string | null) {
  if (!value) return "";
  return serviceAliases[value] ?? value;
}

function hasService(region: Region, service: string) {
  return region !== "" && servicesByRegion[region].some((option) => option.value === service);
}

export function EnglishRequestForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [region, setRegion] = useState<Region>("");
  const [service, setService] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedService = normalizeRequestedService(params.get("service"));
    const requestedRegion = params.get("city");
    let nextRegion: Region = isServiceRegion(requestedRegion) ? requestedRegion : "";

    if (!nextRegion && requestedService) {
      const matchingRegions = (["duesseldorf", "regensburg"] as const).filter((candidate) =>
        hasService(candidate, requestedService),
      );
      if (matchingRegions.length === 1) nextRegion = matchingRegions[0];
    }

    if (nextRegion) {
      setRegion(nextRegion);
      if (hasService(nextRegion, requestedService)) setService(requestedService);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("type", "booking_request");
    data.set("lead_type", "english-service-request");
    data.set("source", "/en/contact");
    data.set("intent", "english-contact");

    try {
      const response = await bookingFetch("/api/bookings", { method: "POST", body: data });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (response.status !== 201 || payload.ok !== true) {
        const fieldErrors = bookingFieldErrors(payload);
        const firstFieldError = Object.values(fieldErrors).find(Boolean);
        throw new Error(firstFieldError || payload.error || "Request could not be submitted.");
      }
      form.reset();
      setRegion("");
      setService("");
      setState("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Request could not be submitted.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6" role="status">
        <CheckCircle2 className="h-7 w-7 text-emerald-700" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-black text-slate-950">Your request has been sent.</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
          FLOXANT will review the location, service and scope and contact you using the details provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm" aria-label="English FLOXANT request form">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Name
          <input name="name" required autoComplete="name" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Email
          <input name="email" type="email" required autoComplete="email" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Phone (optional)
          <input name="phone" type="tel" autoComplete="tel" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          City or postcode
          <input name="cityOrZip" required autoComplete="postal-code" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Location
          <select
            name="city"
            required
            value={region}
            onChange={(event) => {
              const nextRegion = event.target.value as Region;
              setRegion(nextRegion);
              setService((currentService) =>
                hasService(nextRegion, currentService) ? currentService : "",
              );
            }}
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold"
          >
            <option value="" disabled>Select a location</option>
            <option value="duesseldorf">Düsseldorf</option>
            <option value="regensburg">Regensburg</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Service
          <select
            name="service"
            required
            value={service}
            onChange={(event) => setService(event.target.value)}
            disabled={!region}
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold disabled:bg-slate-100 disabled:text-slate-500"
          >
            <option value="" disabled>
              {region ? "Select a service" : "Select a location first"}
            </option>
            {servicesByRegion[region].map((service) => (
              <option key={service.value} value={service.value}>{service.label}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-bold text-slate-800">
        Scope, timing and access
        <textarea
          name="details"
          required
          rows={7}
          placeholder="Please describe the property or move, approximate size, current condition, preferred date, access and whether photos or an existing quote are available."
          className="rounded-lg border border-slate-300 px-4 py-3 font-semibold leading-7"
        />
      </label>
      <PrivacyConsentField locale="en" />
      {state === "error" ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800" role="alert">
          {errorMessage || "The request could not be sent. Please try again or use the phone or email shown in the footer."}
        </p>
      ) : null}
      <button type="submit" disabled={state === "sending"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white disabled:opacity-60">
        <Send className="h-4 w-4" aria-hidden="true" />
        {state === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
