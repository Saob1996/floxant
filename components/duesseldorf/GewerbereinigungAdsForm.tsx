"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, Phone, UploadCloud } from "lucide-react";

import { duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type Mode = "quick" | "detailed";
type SubmitState = "idle" | "submitting" | "success" | "error";

const serviceOptions = [
  { value: "Gewerbereinigung", label: "Gewerbereinigung / Commercial cleaning" },
  { value: "Büroreinigung", label: "Büroreinigung / Office cleaning" },
  { value: "Praxisreinigung", label: "Praxisreinigung / Practice cleaning" },
  { value: "Kanzleireinigung", label: "Kanzleireinigung / Office cleaning" },
  { value: "Unterhaltsreinigung", label: "Unterhaltsreinigung / Regular cleaning" },
  { value: "Treppenhausreinigung", label: "Treppenhausreinigung" },
  { value: "Glasreinigung", label: "Glasreinigung" },
  { value: "Fassadenreinigung", label: "Fassadenreinigung" },
  { value: "Solar-/PV-Reinigung", label: "Solar-/PV-Reinigung / Solar panel cleaning" },
  { value: "Angebot prüfen lassen", label: "Angebot prüfen lassen / Quote check" },
  { value: "Noch unklar", label: "Noch unklar" },
] as const;

const frequencyOptions = [
  "einmalig",
  "wöchentlich",
  "zwei- bis dreimal pro Woche",
  "täglich",
  "monatlich",
  "nach Bedarf",
  "noch unklar",
] as const;

function getQueryValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

function reportSuccessfulFormSubmit(mode: Mode) {
  window.dataLayer?.push({
    event: "form_submit",
    event_category: "duesseldorf_gewerbereinigung_ads_form",
    event_label: mode === "quick" ? "Schnellanfrage erfolgreich" : "Detaillierte Anfrage erfolgreich",
    page_path: window.location.pathname,
  });
}

export function GewerbereinigungAdsForm() {
  const [mode, setMode] = useState<Mode>("quick");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileSummary, setFileSummary] = useState("Noch keine Datei ausgewählt");
  const [uploadStarted, setUploadStarted] = useState(false);
  const isSubmitting = submitState === "submitting";

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppHref(
        duesseldorfCompany.phoneRaw,
        [
          "Hallo FLOXANT Reinigung Düsseldorf,",
          "ich möchte Gewerbereinigung in Düsseldorf anfragen.",
          "Objektart, PLZ, Fläche, Turnus und Fotos kann ich senden.",
        ].join("\n"),
      ),
    [],
  );

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    setUploadStarted(true);
    const files = Array.from(event.target.files || []);
    if (!files.length) {
      setFileSummary("Noch keine Datei ausgewählt");
      return;
    }
    setFileSummary(files.length === 1 ? files[0].name : `${files.length} Dateien ausgewählt`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const objectLocation = String(formData.get("objectLocation") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const honeypot = String(formData.get("website") || "").trim();

    if (honeypot) return;
    if (name.length < 2) {
      setErrorMessage("Bitte nennen Sie kurz Ihren Namen.");
      return;
    }
    if (contact.length < 5) {
      setErrorMessage("Bitte geben Sie Telefon, WhatsApp oder E-Mail für die Rückmeldung an.");
      return;
    }
    if (objectLocation.length < 2) {
      setErrorMessage("Bitte nennen Sie den Objektort oder die PLZ in Düsseldorf.");
      return;
    }
    if (message.length < 8) {
      setErrorMessage("Bitte beschreiben Sie kurz Objekt, Fläche, Turnus oder offene Fragen.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie die Datenschutz-Einwilligung.");
      return;
    }

    formData.set("type", "duesseldorf_gewerbereinigung_cleaning");
    formData.set("lead_type", "duesseldorf_gewerbereinigung_cleaning");
    formData.set("leadSubtype", mode === "quick" ? "quick_commercial_cleaning" : "detailed_commercial_cleaning");
    formData.set("region", "duesseldorf");
    formData.set("service", String(formData.get("service") || "Gewerbereinigung"));
    formData.set("phone", contact);
    formData.set("sourceComponent", "GewerbereinigungAdsForm");
    formData.set("landingPage", `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", document.referrer);
    formData.set("utmSource", getQueryValue("utm_source"));
    formData.set("utmMedium", getQueryValue("utm_medium"));
    formData.set("utmCampaign", getQueryValue("utm_campaign"));
    formData.set("gclid", getQueryValue("gclid"));
    formData.set("timestamp", new Date().toISOString());

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || result.error || "Die Anfrage konnte gerade nicht gesendet werden.");
      }

      form.reset();
      setFileSummary("Noch keine Datei ausgewählt");
      setUploadStarted(false);
      setSubmitState("success");
      reportSuccessfulFormSubmit(mode);
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Die Anfrage konnte gerade nicht gesendet werden. Bitte nutzen Sie WhatsApp oder Telefon.",
      );
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.14)] sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-normal text-blue-700">
            Anfrage mit Eckdaten
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
            Rückmeldung zur Gewerbereinigung erhalten
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            Starten Sie kurz. Details können Sie direkt ergänzen oder später nachreichen.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
          {[
            { id: "quick", label: "Schnell" },
            { id: "detailed", label: "Details" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Anfragemodus ${item.label}`}
              onClick={() => setMode(item.id as Mode)}
              className={`min-h-10 rounded-md px-4 text-sm font-black transition ${
                mode === item.id ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <form
        className="mt-6 grid gap-4"
        onSubmit={handleSubmit}
        data-event="form_submit"
        data-track-submit="success_only"
        data-region="duesseldorf"
        data-service="gewerbereinigung"
        data-source="duesseldorf_gewerbereinigung_ads_form"
      >
        <p className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold leading-6 text-blue-900">
          Anfrage auf Deutsch oder Englisch möglich: office cleaning, commercial cleaning,
          cleaning quote oder photos welcome reichen für den Start.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name*">
            <input name="name" autoComplete="name" aria-label="Name" className="duesseldorf-input" placeholder="Vorname Nachname" />
          </Field>
          <Field label="Telefon / WhatsApp / E-Mail*">
            <input name="contact" autoComplete="tel" aria-label="Telefon, WhatsApp oder E-Mail" className="duesseldorf-input" placeholder="+49 ... oder name@firma.de" />
          </Field>
          <Field label="Objektort / PLZ*">
            <input name="objectLocation" autoComplete="address-level2" aria-label="Objektort oder PLZ" className="duesseldorf-input" placeholder="z. B. 40213, Bilk, Pempelfort" />
          </Field>
          {mode === "detailed" ? (
            <Field label="Firma">
              <input name="companyName" autoComplete="organization" aria-label="Firma" className="duesseldorf-input" placeholder="Optional" />
            </Field>
          ) : null}
        </div>

        {mode === "detailed" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Leistung">
              <select name="service" defaultValue="Gewerbereinigung" className="duesseldorf-input">
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Turnus">
              <select name="recurringFrequency" defaultValue="noch unklar" className="duesseldorf-input">
                {frequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Fläche / Räume">
              <input name="areaOrRooms" aria-label="Fläche oder Räume" className="duesseldorf-input" placeholder="z. B. 220 m², 8 Räume" />
            </Field>
            <Field label="Gewünschte Zeiten">
              <input name="preferredTime" aria-label="Gewünschte Zeiten" className="duesseldorf-input" placeholder="z. B. abends, Wochenende, morgens" />
            </Field>
          </div>
        ) : null}

        <Field label={mode === "quick" ? "Kurze Nachricht*" : "Beschreibung / offene Punkte*"}>
          <textarea
            name="message"
            rows={mode === "quick" ? 4 : 5}
            className="duesseldorf-input min-h-28 py-3"
            placeholder="Objektart, Fläche, Turnus, Zeitfenster oder vorhandenes Angebot kurz beschreiben."
          />
        </Field>

        {mode === "detailed" ? (
          <label
            className="grid cursor-pointer gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-white"
            data-event={uploadStarted ? "upload_completed" : "upload_started"}
            data-source="gewerbereinigung_ads_upload"
          >
            <span className="flex min-w-0 items-center gap-2 text-slate-950">
              <UploadCloud className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              Fotos, Angebot oder Unterlagen optional hochladen
            </span>
            <span className="text-xs leading-5 text-slate-500">
              JPG, PNG, WebP oder PDF. Zugangscodes bitte nicht senden.
            </span>
            <span className="min-w-0 overflow-hidden text-ellipsis text-xs font-black text-slate-600">
              {fileSummary}
            </span>
            <input
              name="attachments"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              className="sr-only"
              onClick={() => setUploadStarted(true)}
              onChange={handleFiles}
              data-event={uploadStarted ? "upload_completed" : "upload_started"}
              data-source="gewerbereinigung_ads_upload"
            />
          </label>
        ) : null}

        <label className="hidden" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700" />
          <span>
            Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet.
            Die Anfrage führt nicht automatisch zu einer Beauftragung.
          </span>
        </label>

        {errorMessage ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800" role="alert">
            {errorMessage}
          </div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" aria-hidden="true" />
            Danke. Ihre Anfrage ist eingegangen. FLOXANT prüft Objekt, Umfang und nächsten Schritt
            und meldet sich mit Rückfragen oder einer realistischen Einschätzung.
          </div>
        ) : null}

        {submitState === "error" && !errorMessage ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800" role="alert">
            Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label={mode === "quick" ? "Gewerbereinigung Düsseldorf schnell anfragen" : "Rückmeldung zur Gewerbereinigung Düsseldorf erhalten"}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {mode === "quick" ? "Gewerbereinigung Düsseldorf anfragen" : "Rückmeldung zur Gewerbereinigung erhalten"}
          </button>
          <a
            href={whatsappHref}
            data-event="whatsapp_click"
            data-contact-channel="whatsapp"
            data-source="gewerbereinigung_form"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${duesseldorfCompany.phoneRaw}`}
            data-event="phone_click"
            data-contact-channel="phone"
            data-source="gewerbereinigung_form"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" />
            Telefon
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
      {label}
      {children}
    </label>
  );
}
