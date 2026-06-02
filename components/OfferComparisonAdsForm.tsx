"use client";

import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useMemo,
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
  ShieldCheck,
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
  "Büroreinigung",
  "Praxisreinigung",
  "Gewerbereinigung",
  "Treppenhausreinigung",
  "Unterhaltsreinigung",
  "Sonstiges",
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

  const uploadedSummary = useMemo(() => {
    if (!files.length) return "Noch keine Datei ausgewählt";
    if (files.length === 1) return files[0].name;
    return `${files.length} Dateien ausgewählt`;
  }, [files]);

  function markUploadStarted(source: "click" | "drop") {
    if (uploadStarted) return;
    setUploadStarted(true);
    reportOfferComparisonAdsEvent("ads_offer_comparison_upload_start", {
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
      reportOfferComparisonAdsEvent("ads_offer_comparison_upload_error", {
        channel: "upload",
        label: validationError,
        priority: "warm",
      });
      return;
    }

    setErrorMessage("");
    setFiles(merged);

    if (merged.length) {
      reportOfferComparisonAdsEvent("ads_offer_comparison_upload_complete", {
        channel: "upload",
        label: "Angebotsdatei ausgewählt",
        fileCount: merged.length,
        fileTypes: Array.from(new Set(merged.map((file) => file.type || getFileExtension(file)))),
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
    if (name.length < 3 || !name.includes(" ")) {
      setErrorMessage("Bitte geben Sie Vorname und Nachname an.");
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
      "Google-Ads-Anfrage: Reinigungsangebot in Düsseldorf vergleichen lassen.",
      companyName ? `Firma: ${companyName}` : "",
      cityOrZip ? `Ort: ${cityOrZip}` : "",
      requestedService ? `Gewünschte Leistung: ${requestedService}` : "",
      message ? `Prüfwunsch: ${message}` : "Prüfwunsch: Bestehendes Angebot wirtschaftlich einordnen.",
    ]
      .filter(Boolean)
      .join("\n");

    formData.set("type", "offer_check");
    formData.set("lead_type", "angebotscheck");
    formData.set("leadSubtype", "cheaper_alternative");
    formData.set("leadSource", "cheaper_alternative");
    formData.set("source", "cheaper_alternative");
    formData.set("sourceComponent", "duesseldorf_offer_comparison_ads");
    formData.set("service", "b2b_reinigung");
    formData.set("region", "duesseldorf");
    formData.set("platformSituation", "Google Ads Reinigungsangebot vergleichen Düsseldorf");
    formData.set("offerCheckIntent", "wirtschaftliche_alternative_pruefen");
    formData.set("message", composedMessage);
    formData.set("selectedAddons", JSON.stringify([requestedService, cityOrZip, companyName].filter(Boolean)));
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

    reportOfferComparisonAdsEvent("ads_offer_comparison_form_submit", {
      channel: "form",
      label: "Kostenlose Prüfung angefordert",
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

      reportOfferComparisonAdsEvent("ads_offer_comparison_form_success", {
        channel: "form",
        label: "Formular Angebotsvergleich erfolgreich abgesendet",
        fileCount: files.length,
        priority: "critical",
      });

      form.reset();
      setFiles([]);
      router.push("/angebot-vergleichen-duesseldorf/danke");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
      reportOfferComparisonAdsEvent("ads_offer_comparison_form_error", {
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
      className="grid gap-5 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6"
      onSubmit={handleSubmit}
      data-event="ads_offer_comparison_form_submit"
      data-source="google_ads_offer_comparison_landingpage"
      data-channel="form"
      aria-label="Kostenlose Angebotsprüfung anfordern"
    >
      <div>
        <p className="text-sm font-semibold text-cyan-700">Angebot hochladen oder Eckdaten senden</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
          Kostenlose Prüfung anfordern
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Das Formular ist bewusst kurz gehalten. Für die erste Einschätzung reichen Kontaktdaten,
          Leistungsart und, falls vorhanden, das Angebot als Datei.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-800 sm:col-span-2">
          Vorname und Nachname*
          <input
            name="name"
            autoComplete="name"
            required
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="Max Mustermann"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Telefonnummer*
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="+49 ..."
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          E-Mail-Adresse*
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="name@firma.de"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Firmenname
          <input
            name="companyName"
            autoComplete="organization"
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="Optional"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Ort
          <input
            name="cityOrZip"
            autoComplete="address-level2"
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="z. B. Düsseldorf, Neuss, Ratingen"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800 sm:col-span-2">
          Gewünschte Leistung
          <select
            name="requestedService"
            defaultValue="Büroreinigung"
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
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
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            multiple
            className="sr-only"
            onChange={handleInputChange}
            data-event="ads_offer_comparison_upload_input"
          />
          <div className="max-w-md">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white">
              <UploadCloud className="h-6 w-6" />
            </span>
            <p className="mt-4 text-base font-semibold text-slate-950">Bestehendes Angebot einfach hochladen</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              PDF, JPG oder PNG per Drag-and-Drop ablegen oder Datei auswählen.
              Alternativ können Sie die wichtigsten Informationen unten beschreiben.
            </p>
            <p className="mt-3 text-xs font-semibold text-slate-500">{uploadedSummary}</p>
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

      <label className="grid gap-2 text-sm font-semibold text-slate-800">
        Was möchten Sie vergleichen oder prüfen lassen?
        <textarea
          name="message"
          rows={4}
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          placeholder="Zum Beispiel: Preis wirkt hoch, Leistungsumfang ist unklar, Turnus soll geprüft werden oder Starttermin ist kurzfristig."
        />
      </label>

      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
        <input
          name="privacy"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700"
        />
        <span>
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage
          verarbeitet. Die Prüfung ist kostenlos und unverbindlich; es wird keine Preisgarantie gegeben.
        </span>
      </label>

      {errorMessage ? (
        <div
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-base font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.18)] transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        data-event="ads_offer_comparison_submit_button"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        Kostenlose Prüfung anfordern
      </button>

      <div className="grid gap-3 rounded-lg border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-950 sm:grid-cols-[auto_1fr]">
        <ShieldCheck className="mt-0.5 h-5 w-5 text-cyan-700" />
        <p>
          Wir prüfen sachlich, ob Umfang, Turnus, Zusatzleistungen und Rahmenbedingungen zu
          einer wirtschaftlich interessanten Alternative passen. Jede Anfrage wird individuell bewertet.
        </p>
      </div>

      <a
        href={whatsappHref}
        data-event="ads_offer_comparison_whatsapp_click"
        data-source="google_ads_offer_comparison_landingpage"
        data-channel="whatsapp"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
      >
        <CheckCircle2 className="h-4 w-4" />
        Angebot lieber per WhatsApp senden
      </a>
    </form>
  );
}
