"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";

type SubmitState = "idle" | "sending" | "success" | "error";

type EnglishRequestFormProps = {
  initialDetails?: string;
  source?: string;
  intent?: string;
  defaultService?: string;
  formId?: string;
};

export function EnglishRequestForm({
  initialDetails = "",
  source = "/en/contact",
  intent = "english-contact",
  defaultService = "",
  formId = "english-request-form",
}: EnglishRequestFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [details, setDetails] = useState(initialDetails);
  const [errorMessage, setErrorMessage] = useState("");
  const formStartedAt = useRef(Date.now());

  useEffect(() => {
    if (initialDetails) setDetails(initialDetails);
  }, [initialDetails]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("type", "booking_request");
    data.set("lead_type", "english-service-request");
    data.set("source", source);
    data.set("intent", intent);
    data.set("privacyConsent", "true");
    data.set("language", "en");
    data.set("locale", "en");
    data.set("formStartedAt", String(formStartedAt.current));

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
      setDetails("");
      formStartedAt.current = Date.now();
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
    <form
      id={formId}
      onSubmit={handleSubmit}
      onChange={() => {
        setErrorMessage("");
        if (state === "error") setState("idle");
      }}
      className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      aria-label="English FLOXANT request form"
    >
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input name="language" type="hidden" value="en" />
      <input name="locale" type="hidden" value="en" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Name
          <input name="name" required maxLength={160} autoComplete="name" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Email
          <input name="email" type="email" required maxLength={254} autoComplete="email" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Phone (optional)
          <input name="phone" type="tel" maxLength={60} autoComplete="tel" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          City or postcode
          <input name="cityOrZip" required maxLength={120} autoComplete="postal-code" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Location
          <select name="city" required defaultValue="" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold">
            <option value="" disabled>Select a location</option>
            <option value="duesseldorf">Düsseldorf</option>
            <option value="regensburg">Regensburg</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Service
          <select name="service" required defaultValue={defaultService} className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold">
            <option value="" disabled>Select a service</option>
            <option value="reinigung">Cleaning service</option>
            <option value="bueroreinigung">Office cleaning</option>
            <option value="gewerbereinigung">Commercial cleaning</option>
            <option value="wohnungsreinigung">Apartment or move-out cleaning</option>
            <option value="fensterreinigung">Window cleaning</option>
            <option value="umzug">Moving service</option>
            <option value="entruempelung">Clearance</option>
            <option value="angebot-vergleichen">Quote review</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-bold text-slate-800">
        Scope, timing and access
        <textarea
          name="details"
          required
          rows={7}
          maxLength={12000}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Please describe the property or move, approximate size, current condition, preferred date, access and whether photos or an existing quote are available."
          className="rounded-lg border border-slate-300 px-4 py-3 font-semibold leading-7"
        />
      </label>
      <label className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
        <input name="privacy" type="checkbox" required className="mt-1 h-5 w-5" />
        <span>I agree that FLOXANT may use these details to process and reply to my request. Please do not send passwords, access codes or unnecessary personal documents.</span>
      </label>
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
