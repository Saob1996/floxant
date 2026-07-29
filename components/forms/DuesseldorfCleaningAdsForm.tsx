"use client";

import { type FormEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Paperclip } from "lucide-react";

import { PrivacyConsentField } from "@/components/PrivacyConsentField";
import { trackGenerateLead } from "@/lib/analytics/google-tag";
import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";

type SubmitState = "idle" | "submitting" | "success" | "error";
type SuccessReceipt = { requestId: string; bookingId: string };

const inputClass = "professional-form-control";
const labelClass = "grid gap-2 text-sm font-black text-slate-900";
const sourceLabel = "Google Ads – Reinigung Düsseldorf";
const sourcePage = "/duesseldorf/reinigung/anfrage";

function queryValue(name: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name)?.trim() || "";
}

function textValue(payload: FormData, name: string) {
  return String(payload.get(name) || "").trim();
}

export function DuesseldorfCleaningAdsForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef(Date.now());
  const leadEventKeyRef = useRef("");
  const [step, setStep] = useState<1 | 2>(1);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState<SuccessReceipt | null>(null);

  function continueToContact() {
    const form = formRef.current;
    if (!form) return;
    const requiredIds = [
      "cleaning-object",
      "cleaning-location",
      "cleaning-service",
      "cleaning-area",
      "cleaning-frequency",
      "cleaning-timeframe",
    ];
    const invalid = requiredIds
      .map((id) => document.getElementById(id))
      .find(
        (element): element is HTMLInputElement | HTMLSelectElement =>
          (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) && !element.reportValidity(),
      );
    if (invalid) {
      invalid.focus();
      return;
    }
    setMessage("");
    setStep(2);
    requestAnimationFrame(() => document.getElementById("cleaning-name")?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setMessage("");
    setReceipt(null);

    const payload = new FormData(event.currentTarget);
    if (!textValue(payload, "email") && !textValue(payload, "phone")) {
      setMessage("Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.");
      setState("error");
      return;
    }

    const customerMessage = textValue(payload, "message");
    const scopeSummary = [
      textValue(payload, "objectType"),
      textValue(payload, "serviceScope"),
      textValue(payload, "areaSize"),
      textValue(payload, "cleaningFrequency"),
      textValue(payload, "desiredDate"),
    ].filter(Boolean).join(" · ");

    payload.set("type", "reinigung");
    payload.set("lead_type", "google_ads_reinigung_duesseldorf");
    payload.set("service", "reinigung");
    payload.set("serviceCategory", "reinigung");
    payload.set("requestedService", "reinigung");
    payload.set("region", "duesseldorf");
    payload.set("city", "Düsseldorf");
    payload.set("leadSource", sourceLabel);
    payload.set("source", sourceLabel);
    payload.set("sourcePage", sourcePage);
    payload.set("landingPage", sourcePage);
    payload.set("pageType", "ads_landing");
    payload.set("intent", "reinigung-duesseldorf");
    payload.set("scope", scopeSummary);
    payload.set("message", customerMessage ? `${customerMessage}\n\n${scopeSummary}` : scopeSummary);
    payload.set("utmSource", queryValue("utm_source") || "google");
    payload.set("utmMedium", queryValue("utm_medium") || "cpc");
    payload.set("utmCampaign", queryValue("utm_campaign"));
    payload.set("utmTerm", queryValue("utm_term"));
    payload.set("utmContent", queryValue("utm_content"));
    payload.set("gclid", queryValue("gclid"));
    payload.set("gbraid", queryValue("gbraid"));
    payload.set("wbraid", queryValue("wbraid"));
    payload.set("timestamp", new Date().toISOString());
    payload.set("formStartedAt", String(startedAtRef.current));
    try {
      const response = await bookingFetch("/api/bookings", { method: "POST", body: payload });
      const responsePayload = await response.json().catch(() => ({})) as {
        ok?: boolean;
        requestId?: string;
        bookingId?: string;
        error?: string;
        fields?: Record<string, string>;
      };

      if (
        response.status !== 201 ||
        response.ok !== true ||
        responsePayload.ok !== true ||
        !responsePayload.requestId ||
        !responsePayload.bookingId
      ) {
        const fields = bookingFieldErrors(responsePayload);
        const firstFieldError = Object.values(fields).find(Boolean);
        const reference = responsePayload.requestId ? ` Referenz: ${responsePayload.requestId}` : "";
        setMessage(`${firstFieldError || responsePayload.error || "Die Anfrage konnte nicht gesendet werden."}${reference}`);
        setState("error");
        return;
      }

      if (!leadEventKeyRef.current) {
        leadEventKeyRef.current = `duesseldorf_cleaning_ads:${Date.now()}:${Math.random()}`;
      }
      trackGenerateLead(
        {
          form_name: "duesseldorf_cleaning_ads",
          service_type: "cleaning",
          location: "duesseldorf",
          lead_source: "google_ads",
        },
        leadEventKeyRef.current,
      );
      setReceipt({ requestId: responsePayload.requestId, bookingId: responsePayload.bookingId });
      setState("success");
    } catch {
      setMessage("Die Anfrage konnte nicht gesendet werden. Bitte nutzen Sie WhatsApp oder versuchen Sie es später erneut.");
      setState("error");
    }
  }

  if (state === "success" && receipt) {
    return (
      <section
        id="reinigung-anfragen"
        aria-live="polite"
        className="rounded-3xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-950 shadow-sm sm:p-8"
      >
        <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-black">Ihre Reinigungsanfrage ist angekommen.</h2>
        <p className="mt-3 max-w-2xl font-medium leading-7">
          FLOXANT prüft Objekt, Umfang, Rhythmus und Zeitraum. Eine Buchung oder Terminbestätigung entsteht erst nach
          der persönlichen Abstimmung.
        </p>
        <p className="mt-5 text-sm font-bold">Referenz: {receipt.requestId}</p>
      </section>
    );
  }

  return (
    <form
      ref={formRef}
      id="reinigung-anfragen"
      onSubmit={submit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/10 sm:p-8"
      data-event="form_submit"
    >
      <label className="sr-only" aria-hidden="true">
        Website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-cyan-900">Schritt {step} von 2</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            {step === 1 ? "Objekt und Reinigung beschreiben" : "Wie dürfen wir Sie erreichen?"}
          </h2>
        </div>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
          <div className="h-full rounded-full bg-cyan-600" style={{ width: step === 1 ? "50%" : "100%" }} />
        </div>
      </div>

      <div className={step === 1 ? "mt-6 grid gap-4 sm:grid-cols-2" : "hidden"}>
        <label className={labelClass} htmlFor="cleaning-object">
          Objektart
          <select id="cleaning-object" name="objectType" required defaultValue="" className={inputClass}>
            <option value="" disabled>Bitte wählen</option>
            <option value="Büro">Büro</option>
            <option value="Praxis">Praxis</option>
            <option value="Gewerbefläche">Gewerbefläche</option>
            <option value="Wohnung oder Haus">Wohnung oder Haus</option>
            <option value="Möbliertes Apartment">Möbliertes Apartment</option>
            <option value="Sonstiges Objekt">Sonstiges Objekt</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="cleaning-location">
          Ort oder PLZ
          <input id="cleaning-location" name="cityOrZip" required autoComplete="postal-code" placeholder="z. B. 40213 Düsseldorf" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="cleaning-service">
          Gewünschte Leistung
          <select id="cleaning-service" name="serviceScope" required defaultValue="" className={inputClass}>
            <option value="" disabled>Bitte wählen</option>
            <option value="Büroreinigung">Büroreinigung</option>
            <option value="Praxisreinigung">Praxisreinigung</option>
            <option value="Gewerbereinigung">Gewerbereinigung</option>
            <option value="Grundreinigung">Grundreinigung</option>
            <option value="Unterhaltsreinigung">Unterhaltsreinigung</option>
            <option value="Fensterreinigung">Fensterreinigung</option>
            <option value="Bau- oder Bauendreinigung">Bau- oder Bauendreinigung</option>
            <option value="Wohnungs- oder Apartmentreinigung">Wohnungs- oder Apartmentreinigung</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="cleaning-area">
          Ungefährer Umfang oder Fläche
          <input id="cleaning-area" name="areaSize" required placeholder="z. B. 180 m², 6 Räume" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="cleaning-frequency">
          Einmalig oder regelmäßig
          <select id="cleaning-frequency" name="cleaningFrequency" required defaultValue="" className={inputClass}>
            <option value="" disabled>Bitte wählen</option>
            <option value="einmalig">Einmalig</option>
            <option value="wöchentlich">Wöchentlich</option>
            <option value="mehrfach wöchentlich">Mehrfach wöchentlich</option>
            <option value="individuell">Individueller Rhythmus</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="cleaning-timeframe">
          Gewünschter Zeitraum
          <input id="cleaning-timeframe" name="desiredDate" required placeholder="z. B. ab September, vormittags" className={inputClass} />
        </label>

        <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
          <summary className="cursor-pointer font-black text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600">
            Optionale Angaben zum Reinigungsumfang
          </summary>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>Räume<input name="roomsCount" placeholder="z. B. 8 Räume" className={inputClass} /></label>
            <label className={labelClass}>Fenster oder Glasflächen<input name="specialAreas" placeholder="z. B. 14 Fenster, innen und außen" className={inputClass} /></label>
            <label className={labelClass}>Sanitärbereiche<input name="bathroomsCount" placeholder="z. B. 2 Sanitärbereiche" className={inputClass} /></label>
            <label className={labelClass}>Zugangszeiten<input name="preferredCleaningTime" placeholder="z. B. Mo–Fr ab 18 Uhr" className={inputClass} /></label>
            <label className={`${labelClass} sm:col-span-2`}>Besondere Verschmutzung oder Hinweise<textarea name="specialNotes" rows={3} className={inputClass} /></label>
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-black text-slate-900">Mögliche Zusatzleistungen</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {["Fenster und Rahmen", "Küche", "Sanitär", "Sonderbereiche", "Material abstimmen", "Angebot prüfen"].map((label) => (
                  <label key={label} className="flex min-h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold">
                    <input type="checkbox" name="selectedAddons" value={label} className="h-4 w-4 accent-cyan-700" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className={`${labelClass} sm:col-span-2`}>Nachricht<textarea name="message" rows={4} className={inputClass} /></label>
            <label className={`${labelClass} sm:col-span-2`}>
              <span className="inline-flex items-center gap-2"><Paperclip className="h-4 w-4" aria-hidden="true" />Fotos hinzufügen (optional)</span>
              <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" multiple className="block w-full rounded-xl border border-dashed border-slate-300 bg-white p-3 text-sm font-medium" />
            </label>
          </div>
        </details>
      </div>

      <div className={step === 2 ? "mt-6 grid gap-4 sm:grid-cols-2" : "hidden"}>
        <label className={labelClass} htmlFor="cleaning-name">
          Name
          <input id="cleaning-name" name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className={labelClass}>
          Bevorzugter Kontaktweg
          <select name="preferredContact" className={inputClass} defaultValue="email">
            <option value="email">E-Mail</option>
            <option value="phone">Telefon</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label className={labelClass}>
          Telefonnummer
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} />
        </label>
        <label className={labelClass}>
          E-Mail-Adresse
          <input name="email" type="email" inputMode="email" autoComplete="email" className={inputClass} />
        </label>
        <div className="sm:col-span-2"><PrivacyConsentField /></div>
      </div>

      {message ? (
        <p role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-950">
          {message}
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        {step === 2 ? (
          <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-sm font-black text-slate-700 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-600">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Zurück
          </button>
        ) : <span />}
        {step === 1 ? (
          <button type="button" onClick={continueToContact} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white outline-none hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-cyan-600">
            Weiter zum Kontakt
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" disabled={state === "submitting"} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-700 disabled:cursor-not-allowed disabled:opacity-60">
            {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            Reinigung anfragen
          </button>
        )}
      </div>
    </form>
  );
}
