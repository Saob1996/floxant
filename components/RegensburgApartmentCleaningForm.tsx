"use client";

import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";
import { PrivacyConsentField } from "@/components/PrivacyConsentField";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white";
const textareaClass =
  "min-h-28 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white";

export function RegensburgApartmentCleaningForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
    ) as Record<string, string>;

    try {
      const response = await bookingFetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          type: "regensburg_moeblierte_wohnung_reinigung",
          lead_type: "regensburg_moeblierte_wohnung_reinigung",
          leadSource: "reinigung_moeblierte_wohnung_regensburg",
          landingPage: "/reinigung-moeblierte-wohnung-regensburg",
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const fields = bookingFieldErrors(result);
        if (response.status === 400 && Object.keys(fields).length > 0) {
          setErrorMessage(result.error || Object.values(fields)[0] || "Bitte korrigieren Sie die markierten Angaben.");
          setState("error");
          return;
        }
        throw new Error("submit_failed");
      }

      setState("success");
      event.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => {
        setErrorMessage("");
        if (state === "error") setState("idle");
      }}
      data-event="form_submit"
      data-region="regensburg"
      data-service="regensburg_moeblierte_wohnung_reinigung"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-blue-700">Apartment-Reset Anfrage</p>
          <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
            Möblierte Wohnung in Regensburg kurz einordnen.
          </h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
            Senden Sie Objekt, Terminfenster, Zustand und Kontaktdaten. Fotos können danach per WhatsApp oder
            Rückfrage ergänzt werden.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Regensburg + 75 km
        </span>
      </div>

      <input type="hidden" name="type" value="regensburg_moeblierte_wohnung_reinigung" />
      <input type="hidden" name="lead_type" value="regensburg_moeblierte_wohnung_reinigung" />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Ansprechpartner
          <input name="name" required autoComplete="name" className={inputClass} placeholder="Name" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Telefon
          <input name="phone" required autoComplete="tel" className={inputClass} placeholder="+49 ..." />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          E-Mail
          <input name="email" required type="email" autoComplete="email" className={inputClass} placeholder="name@example.de" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Rolle
          <select name="roleType" className={inputClass} defaultValue="">
            <option value="" disabled>Bitte wählen</option>
            <option>Vermieter</option>
            <option>Hausverwaltung</option>
            <option>Host oder Betreiber</option>
            <option>Privatperson</option>
            <option>Unternehmen</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Objektort
          <input name="objectLocation" required className={inputClass} placeholder="Regensburg, Stadtteil oder Ort im 75-km-Umkreis" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          PLZ
          <input name="zip" inputMode="numeric" className={inputClass} placeholder="930..." />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Objektart
          <select name="objectType" className={inputClass} defaultValue="">
            <option value="" disabled>Bitte wählen</option>
            <option>Möblierte Wohnung</option>
            <option>Apartment</option>
            <option>Serviced Apartment</option>
            <option>Ferienwohnung nach Absprache</option>
            <option>Leerstand mit Möblierung</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Reinigungsart
          <select name="cleaningType" className={inputClass} defaultValue="">
            <option value="" disabled>Bitte wählen</option>
            <option>Einmalige Reinigung</option>
            <option>Endreinigung vor Übergabe</option>
            <option>Gästewechsel nach Absprache</option>
            <option>Grundreinigung</option>
            <option>Regelmäßige Reinigung prüfen</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Wunschdatum
          <input name="desiredDate" type="date" className={inputClass} />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Zeitfenster
          <input name="timeWindow" className={inputClass} placeholder="z. B. vormittags, nach Checkout, vor Übergabe" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Checkout
          <input name="checkoutTime" className={inputClass} placeholder="falls relevant" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Nächster Check-in
          <input name="nextCheckinTime" className={inputClass} placeholder="falls relevant" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Fläche ca. m²
          <input name="areaM2" inputMode="numeric" className={inputClass} placeholder="z. B. 55" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Zimmer
          <input name="roomsCount" inputMode="numeric" className={inputClass} placeholder="z. B. 2" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Bäder
          <input name="bathroomsCount" inputMode="numeric" className={inputClass} placeholder="z. B. 1" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Küche vorhanden?
          <select name="kitchenPresent" className={inputClass} defaultValue="">
            <option value="" disabled>Bitte wählen</option>
            <option>Ja</option>
            <option>Nein</option>
            <option>Kitchenette</option>
            <option>Unklar</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Möblierung
          <select name="furnishedStatus" className={inputClass} defaultValue="">
            <option value="" disabled>Bitte wählen</option>
            <option>voll möbliert</option>
            <option>teilmöbliert</option>
            <option>leer mit Inventar</option>
            <option>unklar</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Wiederholung
          <select name="recurringFrequency" className={inputClass} defaultValue="">
            <option value="" disabled>Bitte wählen</option>
            <option>einmalig</option>
            <option>mehrmals pro Monat prüfen</option>
            <option>wöchentlich prüfen</option>
            <option>nach Buchungslage</option>
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          ["laundryChangeRequested", "Wäschewechsel ansprechen"],
          ["keyCoordinationRequested", "Schlüsselkoordination ansprechen"],
          ["photoDocumentationRequested", "Fotodokumentation gewünscht"],
          ["inventoryNoteRequested", "Inventarhinweis gewünscht"],
          ["disposalSmallItemsRequested", "Kleine Restmengen ansprechen"],
          ["whatsappPreferred", "WhatsApp bevorzugt"],
          ["callbackWanted", "Rückruf gewünscht"],
        ].map(([name, label]) => (
          <label key={name} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            <input type="checkbox" name={name} value="true" className="h-4 w-4 rounded border-slate-300 text-blue-700" />
            {label}
          </label>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Zugang und Besonderheiten
          <textarea name="accessNotes" className={textareaClass} placeholder="Schlüssel, Code, Etage, Parken, Hausordnung" />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Nachricht
          <textarea name="message" className={textareaClass} placeholder="Zustand, Ziel, Deadline, offene Punkte" />
        </label>
      </div>

      <label className="mt-4 block space-y-2 text-sm font-semibold text-slate-800">
        Budgetrahmen optional
        <input name="budget" className={inputClass} placeholder="optional" />
      </label>

      <div className="mt-4">
        <PrivacyConsentField />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          Anfrage senden
        </button>
        <a
          href="https://wa.me/4915771105087"
          target="_blank"
          rel="noopener noreferrer"
          data-event="whatsapp_click"
          data-region="regensburg"
          data-service="regensburg_moeblierte_wohnung_reinigung"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Fotos per WhatsApp
        </a>
      </div>

      {state === "success" ? (
        <p className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
          Danke, die Anfrage wurde gesendet. FLOXANT prüft die Angaben und meldet sich mit dem nächsten sinnvollen Schritt.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
          {errorMessage || "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp."}
        </p>
      ) : null}
    </form>
  );
}
