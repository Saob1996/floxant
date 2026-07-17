"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

type SubmitState = "idle" | "sending" | "success" | "error";

export function EnglishRequestForm() {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("type", "booking_request");
    data.set("lead_type", "english-service-request");
    data.set("source", "/en/contact");
    data.set("intent", "english-contact");
    data.set("privacyConsent", "true");

    try {
      const response = await fetch("/api/bookings", { method: "POST", body: data });
      if (!response.ok) throw new Error("Request could not be submitted");
      form.reset();
      setState("success");
    } catch {
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
          <select name="city" required defaultValue="" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold">
            <option value="" disabled>Select a location</option>
            <option value="duesseldorf">Düsseldorf</option>
            <option value="regensburg">Regensburg</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Service
          <select name="service" required defaultValue="" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold">
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
          The request could not be sent. Please try again or use the phone or email shown in the footer.
        </p>
      ) : null}
      <button type="submit" disabled={state === "sending"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white disabled:opacity-60">
        <Send className="h-4 w-4" aria-hidden="true" />
        {state === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
