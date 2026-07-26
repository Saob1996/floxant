"use client";

import { type FormEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Paperclip } from "lucide-react";

import { PrivacyConsentField } from "@/components/PrivacyConsentField";
import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";

type SubmitState = "idle" | "submitting" | "success" | "error";
type SuccessReceipt = { requestId: string; bookingId: string };

const inputClass =
  "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none placeholder:text-slate-500 focus-visible:border-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-600/25";
const labelClass = "grid gap-2 text-sm font-black text-slate-900";

function queryValue(name: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name)?.trim() || "";
}

export function RegensburgMovingAdsForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef(Date.now());
  const [step, setStep] = useState<1 | 2>(1);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState<SuccessReceipt | null>(null);

  function continueToContact() {
    const form = formRef.current;
    if (!form) return;
    const requiredIds = ["moving-start", "moving-destination", "moving-date", "moving-rooms"];
    const invalid = requiredIds
      .map((id) => document.getElementById(id))
      .find((element): element is HTMLInputElement => element instanceof HTMLInputElement && !element.reportValidity());
    if (invalid) {
      invalid.focus();
      return;
    }
    setMessage("");
    setStep(2);
    requestAnimationFrame(() => document.getElementById("moving-name")?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setMessage("");
    setReceipt(null);

    const payload = new FormData(event.currentTarget);
    if (!String(payload.get("email") || "").trim() && !String(payload.get("phone") || "").trim()) {
      setMessage("Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.");
      setState("error");
      return;
    }
    payload.set("type", "umzug");
    payload.set("lead_type", "google_ads_umzug_regensburg");
    payload.set("requestedService", "umzug");
    payload.set("region", "regensburg");
    payload.set("city", "Regensburg");
    payload.set("leadSource", "Google Ads – Umzug Regensburg");
    payload.set("source", "Google Ads – Umzug Regensburg");
    payload.set("sourcePage", "/umzug-regensburg/anfrage");
    payload.set("landingPage", "/umzug-regensburg/anfrage");
    payload.set("utmSource", queryValue("utm_source") || "google");
    payload.set("utmMedium", queryValue("utm_medium") || "cpc");
    payload.set("utmCampaign", queryValue("utm_campaign"));
    payload.set("utmTerm", queryValue("utm_term"));
    payload.set("utmContent", queryValue("utm_content"));
    payload.set("gclid", queryValue("gclid"));
    payload.set("timestamp", new Date().toISOString());
    payload.set("formStartedAt", String(startedAtRef.current));
    payload.set("companyWebsite", "");

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

      setReceipt({
        requestId: responsePayload.requestId,
        bookingId: responsePayload.bookingId,
      });
      setState("success");
    } catch {
      setMessage("Die Anfrage konnte technisch nicht gesendet werden. Bitte nutzen Sie WhatsApp oder versuchen Sie es später erneut.");
      setState("error");
    }
  }

  if (state === "success" && receipt) {
    return (
      <section
        id="umzug-anfragen"
        aria-live="polite"
        className="rounded-3xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-950 shadow-sm sm:p-8"
      >
        <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-black">Ihre Umzugsanfrage ist angekommen.</h2>
        <p className="mt-3 max-w-2xl font-medium leading-7">
          FLOXANT prüft Start, Ziel, Umfang, Zeitraum und die gewünschten Zusatzleistungen.
          Eine Buchung oder Terminbestätigung entsteht erst nach der persönlichen Abstimmung.
        </p>
        <p className="mt-5 text-sm font-bold">Referenz: {receipt.requestId}</p>
      </section>
    );
  }

  return (
    <form
      ref={formRef}
      id="umzug-anfragen"
      onSubmit={submit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/10 sm:p-8"
      noValidate={false}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-cyan-900">Schritt {step} von 2</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            {step === 1 ? "Umzug kurz beschreiben" : "Wie dürfen wir Sie erreichen?"}
          </h2>
        </div>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
          <div className="h-full rounded-full bg-cyan-600" style={{ width: step === 1 ? "50%" : "100%" }} />
        </div>
      </div>

      <div className={step === 1 ? "mt-6 grid gap-4 sm:grid-cols-2" : "hidden"}>
        <label className={labelClass} htmlFor="moving-start">
          Startort oder Start-PLZ
          <input id="moving-start" name="startLocation" required autoComplete="street-address" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="moving-destination">
          Zielort oder Ziel-PLZ
          <input id="moving-destination" name="destinationLocation" required className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="moving-date">
          Gewünschter Termin oder Zeitraum
          <input id="moving-date" name="desiredDate" required placeholder="z. B. 12.–16. August 2026" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="moving-rooms">
          Wohnungsgröße oder Zimmer
          <input id="moving-rooms" name="roomsCount" required placeholder="z. B. 2 Zimmer, etwa 65 m²" className={inputClass} />
        </label>

        <details className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer font-black text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600">
            Optionale Angaben zu Zugang und Umfang
          </summary>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>Startetage<input name="startFloor" inputMode="numeric" className={inputClass} /></label>
            <label className={labelClass}>Aufzug am Start<select name="startElevator" className={inputClass} defaultValue=""><option value="">Bitte wählen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option></select></label>
            <label className={labelClass}>Zieletage<input name="destinationFloor" inputMode="numeric" className={inputClass} /></label>
            <label className={labelClass}>Aufzug am Ziel<select name="destinationElevator" className={inputClass} defaultValue=""><option value="">Bitte wählen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option></select></label>
            <label className={`${labelClass} sm:col-span-2`}>Umfang und größere Möbel<textarea name="scope" rows={4} className={`${inputClass} py-3`} /></label>
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-black text-slate-900">Gewünschte Zusatzleistungen</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {["Demontage", "Montage", "Verpackungshilfe", "Entrümpelung", "Reinigung", "Klaviertransport"].map((label) => (
                  <label key={label} className="flex min-h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold">
                    <input type="checkbox" name="selectedAddons" value={label} className="h-4 w-4 accent-cyan-700" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className={`${labelClass} sm:col-span-2`}>Nachricht<textarea name="message" rows={4} className={`${inputClass} py-3`} /></label>
            <label className={`${labelClass} sm:col-span-2`}>
              <span className="inline-flex items-center gap-2"><Paperclip className="h-4 w-4" aria-hidden="true" />Fotos hinzufügen (optional)</span>
              <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" multiple className="block w-full rounded-xl border border-dashed border-slate-300 bg-white p-3 text-sm font-medium" />
            </label>
          </div>
        </details>
      </div>

      <div className={step === 2 ? "mt-6 grid gap-4 sm:grid-cols-2" : "hidden"}>
        <label className={labelClass} htmlFor="moving-name">
          Name
          <input id="moving-name" name="name" required autoComplete="name" className={inputClass} />
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
            Umzug anfragen
          </button>
        )}
      </div>
    </form>
  );
}
