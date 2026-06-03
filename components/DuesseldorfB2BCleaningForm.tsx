"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, Phone, UploadCloud } from "lucide-react";

import { duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type SubmitState = "idle" | "submitting" | "success" | "error";

type DuesseldorfB2BCleaningFormProps = {
  context?: "bueroreinigung" | "gewerbereinigung" | "premium";
};

const serviceOptions = [
  "Gewerbereinigung",
  "Büroreinigung",
  "Praxisreinigung",
  "Unterhaltsreinigung",
  "Treppenhausreinigung",
  "Premium-Reinigung",
  "Noch unklar",
] as const;

const frequencyOptions = [
  "einmalig",
  "wöchentlich",
  "zwei- bis dreimal pro Woche",
  "monatlich",
  "nach Bedarf",
  "noch unklar",
] as const;

function getQueryValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

function defaultService(context: DuesseldorfB2BCleaningFormProps["context"]) {
  if (context === "premium") return "Premium-Reinigung";
  if (context === "bueroreinigung") return "Büroreinigung";
  return "Gewerbereinigung";
}

export function DuesseldorfB2BCleaningForm({
  context = "gewerbereinigung",
}: DuesseldorfB2BCleaningFormProps = {}) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileSummary, setFileSummary] = useState("Noch keine Datei ausgewählt");
  const [uploadStarted, setUploadStarted] = useState(false);

  const selectedDefaultService = defaultService(context);
  const isSubmitting = submitState === "submitting";

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppHref(
        duesseldorfCompany.phoneRaw,
        [
          "Hallo FLOXANT Reinigung Düsseldorf,",
          `ich möchte ${selectedDefaultService} in Düsseldorf anfragen.`,
          "Objektart, Fläche, Turnus, Zeitfenster und Fotos kann ich senden.",
        ].join("\n"),
      ),
    [selectedDefaultService],
  );

  function handleUploadStart() {
    if (uploadStarted) return;
    setUploadStarted(true);
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    handleUploadStart();
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
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const objectLocation = String(formData.get("objectLocation") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const honeypot = String(formData.get("website") || "").trim();

    if (honeypot) return;
    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Ansprechpartner an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte geben Sie Telefonnummer oder E-Mail an.");
      return;
    }
    if (!objectLocation) {
      setErrorMessage("Bitte nennen Sie Objektort oder PLZ in Düsseldorf.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz Objekt, Bedarf oder offene Punkte.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie die Datenschutz-Einwilligung.");
      return;
    }

    formData.set("type", `duesseldorf_${context}_cleaning`);
    formData.set("lead_type", `duesseldorf_${context}_cleaning`);
    formData.set("leadSubtype", "b2b_cleaning");
    formData.set("region", "duesseldorf");
    formData.set("sourceComponent", "duesseldorf_b2b_cleaning_form");
    formData.set("timestamp", new Date().toISOString());
    formData.set("landingPage", `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", document.referrer);
    formData.set("utmSource", getQueryValue("utm_source"));
    formData.set("utmMedium", getQueryValue("utm_medium"));
    formData.set("utmCampaign", getQueryValue("utm_campaign"));
    formData.set("gclid", getQueryValue("gclid"));

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || result.error || "Die Anfrage konnte nicht gesendet werden.");
      }

      form.reset();
      setFileSummary("Noch keine Datei ausgewählt");
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
      <div>
        <p className="text-sm font-black uppercase tracking-normal text-blue-700">
          Anfrage senden
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
          Objekt kurz beschreiben und Rückmeldung erhalten
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Die Anfrage ist kostenlos und unverbindlich. Für den Start reichen Ort, Objektart,
          gewünschte Leistung und ein kurzer Hinweis zum Bedarf.
        </p>
      </div>

      <form
        className="mt-6 grid gap-4"
        onSubmit={handleSubmit}
        data-event="form_submit"
        data-region="duesseldorf"
        data-service={context}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ansprechpartner*">
            <input name="name" autoComplete="name" className="duesseldorf-input" placeholder="Vorname Nachname" />
          </Field>
          <Field label="Firma oder Organisation">
            <input name="companyName" autoComplete="organization" className="duesseldorf-input" placeholder="Optional" />
          </Field>
          <Field label="Telefon">
            <input name="phone" type="tel" autoComplete="tel" className="duesseldorf-input" placeholder={duesseldorfCompany.phone} />
          </Field>
          <Field label="E-Mail">
            <input name="email" type="email" autoComplete="email" className="duesseldorf-input" placeholder={duesseldorfCompany.email} />
          </Field>
          <Field label="Objektort / PLZ in Düsseldorf*">
            <input name="objectLocation" autoComplete="address-level2" className="duesseldorf-input" placeholder="z. B. 40213, Bilk, Pempelfort" />
          </Field>
          <Field label="Gewünschte Leistung">
            <select name="service" defaultValue={selectedDefaultService} className="duesseldorf-input">
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
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
          <Field label="Fläche oder Räume">
            <input name="areaOrRooms" className="duesseldorf-input" placeholder="z. B. 180 m², 6 Räume" />
          </Field>
        </div>

        <Field label="Was soll gereinigt oder geklärt werden?*">
          <textarea
            name="message"
            rows={5}
            className="duesseldorf-input min-h-32 py-3"
            placeholder="Objektart, Zeitfenster, Zugang, Zustand, gewünschter Start oder besondere Punkte."
          />
        </Field>

        <label
          className="grid cursor-pointer gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-white"
          data-event={uploadStarted ? "upload_completed" : "upload_started"}
        >
          <span className="flex items-center gap-2 text-slate-950">
            <UploadCloud className="h-5 w-5 text-blue-700" aria-hidden="true" />
            Fotos oder Unterlagen optional hochladen
          </span>
          <span className="text-xs leading-5 text-slate-500">
            JPG, PNG, WebP oder PDF. Zugangscodes bitte nicht im Formular senden.
          </span>
          <span className="text-xs font-black text-slate-600">{fileSummary}</span>
          <input
            name="attachments"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
            className="sr-only"
            onClick={handleUploadStart}
            onChange={handleFiles}
            data-event={uploadStarted ? "upload_completed" : "upload_started"}
          />
        </label>

        <label className="hidden" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700" />
          <span>
            Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet.
            Die Anfrage ist kostenlos und unverbindlich.
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
            und meldet sich mit Rückfragen oder einer klaren Einschätzung.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Kostenlos anfragen
          </button>
          <a
            href={whatsappHref}
            data-event="whatsapp_click"
            data-contact-channel="whatsapp"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${duesseldorfCompany.phoneRaw}`}
            data-event="phone_click"
            data-contact-channel="phone"
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
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      {children}
    </label>
  );
}

