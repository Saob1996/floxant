"use client";

import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  MessageCircle,
  UploadCloud,
  X,
} from "lucide-react";

import { appendConversionJourneyToFormData } from "@/lib/conversion-journey";
import { reportOfferComparisonAdsEvent } from "@/components/OfferComparisonAdsTracker";

const MAX_FILE_BYTES = 12 * 1024 * 1024;
const MAX_FILES = 4;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png"]);

const serviceOptions = [
  "Gewerbereinigung",
  "Büroreinigung",
  "Praxisreinigung",
  "Unterhaltsreinigung",
  "Treppenhausreinigung",
  "Premium-Reinigung",
  "Noch unklar",
] as const;

type SubmitState = "idle" | "submitting" | "error";

type OfferComparisonAdsFormProps = {
  whatsappHref: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFileExtension(file: File) {
  return file.name.split(".").pop()?.toLowerCase() || "";
}

function validateFiles(files: File[]) {
  if (files.length > MAX_FILES) return `Bitte maximal ${MAX_FILES} Dateien hochladen.`;

  const invalid = files.find((file) => {
    const extension = getFileExtension(file);
    return !ALLOWED_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.has(extension);
  });
  if (invalid) return "Bitte nur PDF, JPG oder PNG hochladen.";

  const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
  if (oversized) return "Bitte einzelne Dateien unter 12 MB hochladen.";

  return "";
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getUtmValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

export function OfferComparisonAdsForm({ whatsappHref }: OfferComparisonAdsFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const startedAtRef = useRef(Date.now());
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function markUploadStarted(source: "click" | "drop") {
    if (uploadStarted) return;
    setUploadStarted(true);
    reportOfferComparisonAdsEvent("upload_started", {
      channel: "upload",
      label: source === "drop" ? "Upload per Drag-and-Drop gestartet" : "Upload-Auswahl gestartet",
      priority: "hot",
    });
  }

  function applyFiles(nextFiles: File[]) {
    const merged = [...files, ...nextFiles].slice(0, MAX_FILES);
    const validationError = validateFiles(merged);

    if (validationError) {
      setErrorMessage(validationError);
      reportOfferComparisonAdsEvent("upload_error", {
        channel: "upload",
        label: validationError,
        priority: "warm",
      });
      return;
    }

    setErrorMessage("");
    setFiles(merged);

    if (merged.length) {
      reportOfferComparisonAdsEvent("upload_completed", {
        channel: "upload",
        label: "Angebotsdatei ausgewählt",
        fileCount: merged.length,
        priority: "hot",
      });
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    applyFiles(Array.from(event.target.files || []));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    markUploadStarted("drop");
    applyFiles(Array.from(event.dataTransfer.files || []));
  }

  function removeFile(fileToRemove: File) {
    setFiles((current) => current.filter((file) => file !== fileToRemove));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const companyName = String(formData.get("companyName") || "").trim();
    const cityOrZip = String(formData.get("cityOrZip") || "").trim();
    const requestedService = String(formData.get("requestedService") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const honeypot = String(formData.get("website") || "").trim();

    if (honeypot) return;
    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie Ihren Namen an.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setErrorMessage("Bitte geben Sie eine gültige Telefonnummer an.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse an.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie die DSGVO-Einwilligung.");
      return;
    }

    const validationError = validateFiles(files);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const composedMessage = [
      "Anfrage: Reinigungsangebot in Düsseldorf prüfen lassen.",
      companyName ? `Firma: ${companyName}` : "",
      cityOrZip ? `Ort: ${cityOrZip}` : "",
      requestedService ? `Leistung: ${requestedService}` : "",
      message ? `Hinweis: ${message}` : "Hinweis: Bestehendes Angebot wirtschaftlich einordnen.",
    ]
      .filter(Boolean)
      .join("\n");

    formData.set("type", "offer_check");
    formData.set("lead_type", "angebotscheck_duesseldorf");
    formData.set("leadSubtype", "duesseldorf_cleaning_offer_check");
    formData.set("leadSource", "google_ads_offer_comparison");
    formData.set("sourceComponent", "offer_comparison_ads_form");
    formData.set("service", "reinigung");
    formData.set("region", "duesseldorf");
    formData.set("offerCheckIntent", "wirtschaftliche_alternative_pruefen");
    formData.set("message", composedMessage);
    formData.set("timestamp", new Date().toISOString());
    formData.set("landingPage", `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("gclid", getUtmValue("gclid"));
    formData.set("formDurationMs", String(Date.now() - startedAtRef.current));
    files.forEach((file) => formData.append("offerFile", file));
    appendConversionJourneyToFormData(formData);

    reportOfferComparisonAdsEvent("form_submit", {
      channel: "form",
      label: "Angebotsprüfung angefordert",
      fileCount: files.length,
      priority: "critical",
    });

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

      reportOfferComparisonAdsEvent("form_submit_success", {
        channel: "form",
        label: "Formular erfolgreich abgesendet",
        fileCount: files.length,
        priority: "critical",
      });

      form.reset();
      setFiles([]);
      router.push("/angebot-vergleichen-duesseldorf/danke");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
      reportOfferComparisonAdsEvent("form_submit_error", {
        channel: "form",
        label: error instanceof Error ? error.message : "Formularfehler",
        priority: "warm",
      });
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <form
      id="angebot-pruefen"
      className="grid scroll-mt-32 gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6 lg:p-8"
      onSubmit={handleSubmit}
      data-event="form_submit"
      data-source="google_ads_offer_comparison_landingpage"
      aria-label="Kostenlose Angebotsprüfung anfordern"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-normal text-blue-700">
          Angebot hochladen oder Eckdaten senden
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
          Angebot kostenlos prüfen lassen
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Senden Sie Ihr bestehendes Angebot oder die wichtigsten Eckdaten. Wir prüfen sachlich,
          ob eine passende Alternative möglich ist.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Name*
          <input name="name" autoComplete="name" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="Vorname Nachname" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Telefon*
          <input name="phone" type="tel" autoComplete="tel" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="+49 ..." />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          E-Mail*
          <input name="email" type="email" autoComplete="email" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="name@firma.de" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Firma
          <input name="companyName" autoComplete="organization" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="Optional" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Ort / PLZ
          <input name="cityOrZip" autoComplete="address-level2" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="z. B. Düsseldorf, Neuss, Ratingen" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Leistung
          <select name="requestedService" defaultValue="Gewerbereinigung" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            markUploadStarted("click");
            inputRef.current?.click();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              markUploadStarted("click");
              inputRef.current?.click();
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragActive(true);
            markUploadStarted("drop");
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`grid min-h-44 cursor-pointer place-items-center rounded-lg border border-dashed p-5 text-center transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            dragActive
              ? "border-blue-600 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-white"
          }`}
          aria-label="Bestehendes Angebot als PDF, JPG oder PNG hochladen"
          data-event={uploadStarted ? "upload_completed" : "upload_started"}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            multiple
            className="sr-only"
            onChange={handleInputChange}
            data-event={uploadStarted ? "upload_completed" : "upload_started"}
          />
          <div className="max-w-md">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white">
              <UploadCloud className="h-6 w-6" />
            </span>
            <p className="mt-4 text-base font-black text-slate-950">
              Bestehendes Angebot hochladen
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              PDF, JPG oder PNG ablegen oder Datei auswählen. Alternativ beschreiben Sie die Eckdaten unten.
            </p>
          </div>
        </div>

        {files.length ? (
          <div className="mt-3 grid gap-2" aria-live="polite">
            {files.map((file) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-blue-700" />
                  <span className="truncate font-medium text-slate-800">{file.name}</span>
                  <span className="shrink-0 text-xs text-slate-500">{formatFileSize(file.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                  aria-label={`${file.name} entfernen`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <label className="grid gap-2 text-sm font-bold text-slate-800">
        Was möchten Sie prüfen lassen?
        <textarea
          name="message"
          rows={4}
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          placeholder="Zum Beispiel: Leistungsumfang unklar, Turnus prüfen, Preis einordnen, Starttermin klären."
        />
      </label>

      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
        <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700" />
        <span>
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet.
          Die Prüfung ist kostenlos und unverbindlich; es wird keine Preisgarantie gegeben.
        </span>
      </label>

      {errorMessage ? (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-base font-black text-white shadow-[0_16px_34px_rgba(15,23,42,0.18)] transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        data-event="form_submit"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        Angebot prüfen lassen
      </button>

      <a
        href={whatsappHref}
        data-event="whatsapp_click"
        data-source="google_ads_offer_comparison_landingpage"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
      >
        <MessageCircle className="h-4 w-4" />
        Angebot per WhatsApp senden
      </a>

      <div className="grid gap-3 rounded-lg border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-bold leading-6 text-cyan-950 sm:grid-cols-[auto_1fr]">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
        <p>
          Wir prüfen, ob eine passende Alternative möglich ist. Jede Anfrage wird individuell bewertet.
        </p>
      </div>
    </form>
  );
}
