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

const regionOptions = [
  { value: "duesseldorf", label: "Düsseldorf" },
  { value: "regensburg", label: "Regensburg" },
] as const;

const serviceOptions = [
  { value: "reinigung", label: "Reinigung / Cleaning service" },
  { value: "solarreinigung", label: "Solar- / PV-Anlagen-Reinigung / Solar panel cleaning" },
  { value: "glas_fassade_event", label: "Glas-, Fassaden- oder Eventreinigung / Glass cleaning" },
  { value: "umzug", label: "Umzug / Moving help" },
  { value: "mini_express_transport", label: "Mini-Umzug, Express oder Möbeltransport / Small move" },
  { value: "entsorgung", label: "Entrümpelung / Decluttering" },
  { value: "keller_nachlass_lager", label: "Keller, Nachlass oder Lagerauflösung / House clearance" },
  { value: "nachlass_raeumung", label: "Haushaltsauflösung / House clearance" },
  { value: "mieterwechsel_service", label: "Übergabereinigung / End of tenancy cleaning" },
  { value: "signature_service", label: "Fairpreis, Plan B oder Übergabe-Sprint / Second opinion" },
  { value: "objektbrief", label: "Objektbrief für bessere Anbieteranfrage" },
  { value: "rueckfahrt_radar", label: "Rückfahrt, Beiladung oder Möbeltransport prüfen" },
  { value: "diskret_service", label: "Diskret-Service für sensible Fälle" },
  { value: "kombination", label: "Kombination / mehrere Leistungen" },
  { value: "b2b_reinigung", label: "Gewerbe-, Büro- oder Praxisreinigung" },
] as const;

const offerStatusOptions = [
  { value: "upload", label: "Ja, ich möchte ein Angebot hochladen" },
  { value: "details", label: "Ja, ich möchte die Eckdaten eintragen" },
  { value: "no_offer", label: "Nein, ich möchte trotzdem eine Einschätzung" },
] as const;

const urgencyOptions = [
  { value: "normal", label: "Normal, Termin ist flexibel" },
  { value: "soon", label: "Bald, innerhalb von 7 Tagen" },
  { value: "urgent", label: "Dringend, Deadline steht" },
  { value: "unclear", label: "Erst einordnen, noch kein Termin" },
] as const;

const preferredContactOptions = [
  { value: "telefon", label: "Telefon" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-Mail" },
] as const;

const propertyTypeOptions = [
  { value: "wohnung", label: "Wohnung / Haus" },
  { value: "gewerbe", label: "Büro / Gewerbe / Praxis" },
  { value: "aussenflaeche", label: "Dach / Fassade / Außenfläche" },
  { value: "lager_keller", label: "Keller / Lager / Nebenfläche" },
  { value: "transport", label: "Transportstrecke" },
  { value: "unklar", label: "Noch unklar" },
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
    const region = String(formData.get("region") || "duesseldorf").trim();
    const cityOrZip = String(formData.get("cityOrZip") || "").trim();
    const requestedService = String(formData.get("requestedService") || "").trim();
    const offerStatus = String(formData.get("offerStatus") || "").trim();
    const urgency = String(formData.get("urgency") || "").trim();
    const preferredContact = String(formData.get("preferredContact") || "").trim();
    const propertyType = String(formData.get("propertyType") || "").trim();
    const desiredDate = String(formData.get("desiredDate") || "").trim();
    const quotedPrice = String(formData.get("quotedPrice") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const honeypot = String(formData.get("website") || "").trim();

    if (honeypot) return;
    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie Ihren Namen an.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7 && !isValidEmail(email)) {
      setErrorMessage("Bitte geben Sie Telefon oder E-Mail für die Rückmeldung an.");
      return;
    }
    if (email && !isValidEmail(email)) {
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

    const selectedServiceLabel =
      serviceOptions.find((item) => item.value === requestedService)?.label || requestedService;
    const selectedRegionLabel =
      regionOptions.find((item) => item.value === region)?.label || region;
    const offerStatusLabel =
      offerStatusOptions.find((item) => item.value === offerStatus)?.label || offerStatus;
    const urgencyLabel =
      urgencyOptions.find((item) => item.value === urgency)?.label || urgency;
    const preferredContactLabel =
      preferredContactOptions.find((item) => item.value === preferredContact)?.label || preferredContact;
    const propertyTypeLabel =
      propertyTypeOptions.find((item) => item.value === propertyType)?.label || propertyType;

    const composedMessage = [
      "Anfrage: FLOXANT Angebotsprüfung.",
      companyName ? `Firma: ${companyName}` : "",
      `Region: ${selectedRegionLabel}`,
      cityOrZip ? `Ort/PLZ: ${cityOrZip}` : "",
      selectedServiceLabel ? `Leistungsbereich: ${selectedServiceLabel}` : "",
      offerStatusLabel ? `Ausgangslage: ${offerStatusLabel}` : "",
      propertyTypeLabel ? `Objekt/Fläche: ${propertyTypeLabel}` : "",
      urgencyLabel ? `Dringlichkeit: ${urgencyLabel}` : "",
      preferredContactLabel ? `Kontaktwunsch: ${preferredContactLabel}` : "",
      desiredDate ? `Zeitraum: ${desiredDate}` : "",
      quotedPrice ? `Bisheriger Preis: ${quotedPrice}` : "",
      budget ? `Budget/Preisrahmen: ${budget}` : "",
      message ? `Hinweis: ${message}` : "Hinweis: Bitte prüfen, ob eine passende und wirtschaftlich interessante Alternative möglich ist.",
    ]
      .filter(Boolean)
      .join("\n");

    formData.set("type", "offer_check");
    formData.set("lead_type", "angebotspruefung");
    formData.set("leadSubtype", "floxant_angebotspruefung_product");
    formData.set("leadSource", "offer_check_product");
    formData.set("sourceComponent", "offer_comparison_ads_form");
    formData.set("service", requestedService || "reinigung");
    formData.set("region", region || "duesseldorf");
    formData.set("regionPreset", region || "duesseldorf");
    formData.set("entryPoint", "/angebot-vergleichen-duesseldorf");
    formData.set("offerSourceType", offerStatus);
    formData.set("urgency", urgency || "normal");
    formData.set("preferredContact", preferredContact || "telefon");
    formData.set("propertyType", propertyType || "unklar");
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

    reportOfferComparisonAdsEvent("offer_check_started", {
      channel: "form",
      label: "FLOXANT Angebotsprüfung gestartet",
      fileCount: files.length,
      region,
      service: requestedService,
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
      reportOfferComparisonAdsEvent("form_submit", {
        channel: "form",
        label: "Angebotsprüfung erfolgreich angefordert",
        fileCount: files.length,
        region,
        service: requestedService,
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
      className="grid w-full max-w-full min-w-0 scroll-mt-32 gap-6 overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] [&_input]:min-w-0 [&_input]:w-full [&_label]:min-w-0 [&_select]:min-w-0 [&_select]:w-full [&_textarea]:min-w-0 [&_textarea]:w-full sm:p-6 lg:p-8"
      onSubmit={handleSubmit}
      data-event="offer_check_started"
      data-source="google_ads_offer_comparison_landingpage"
      aria-label="Kostenlose Angebotsprüfung anfordern"
    >
      <div className="min-w-0">
        <p className="text-sm font-black uppercase tracking-normal text-blue-700">
          FLOXANT Angebotsprüfung
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
          Angebot kostenlos prüfen lassen
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Senden Sie Ihr bestehendes Angebot oder die wichtigsten Eckdaten. Wir prüfen kostenlos
          und unverbindlich, ob eine passende und wirtschaftlich interessante Alternative möglich ist.
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-blue-700">
          Second opinion auf Deutsch oder Englisch möglich. Begriffe wie cleaning quote,
          moving quote oder service offer reichen für den Start.
        </p>
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Name*
          <input name="name" autoComplete="name" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="Vorname Nachname" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Telefon
          <input name="phone" type="tel" autoComplete="tel" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="+49 ..." />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          E-Mail
          <input name="email" type="email" autoComplete="email" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="name@firma.de" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Firma
          <input name="companyName" autoComplete="organization" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="Optional" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Stadt*
          <select name="region" defaultValue="duesseldorf" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            {regionOptions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Ort / PLZ
          <input name="cityOrZip" autoComplete="address-level2" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="z. B. Düsseldorf, Regensburg, Neuss" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Leistungsbereich*
          <select name="requestedService" defaultValue="reinigung" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Objekt / Fläche
          <select name="propertyType" defaultValue="unklar" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            {propertyTypeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Bestehendes Angebot*
          <select name="offerStatus" defaultValue="upload" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            {offerStatusOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Dringlichkeit
          <select name="urgency" defaultValue="normal" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            {urgencyOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kontaktwunsch
          <select name="preferredContact" defaultValue="telefon" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            {preferredContactOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Gewünschter Zeitraum
          <input name="desiredDate" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="z. B. nächste Woche, Monatsende" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Bisheriger Preis
          <input name="quotedPrice" inputMode="decimal" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="freiwillig, z. B. 950 EUR" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Budget / Preisrahmen
          <input name="budget" inputMode="decimal" className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="freiwillig, falls vorhanden" />
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
              Angebot, Screenshot oder Fotos hochladen
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              PDF, JPG oder PNG ablegen oder Datei auswählen. Die Anfrage funktioniert auch ohne Upload.
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
          placeholder="Zum Beispiel: Leistungsumfang, Fläche oder Volumen, Termin, Zugang, Turnus, Übergabeziel oder offene Punkte."
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
        data-event="offer_check_started"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        Kostenlose Prüfung anfordern
      </button>

      <a
        href={whatsappHref}
        data-event="whatsapp_click"
        data-source="google_ads_offer_comparison_landingpage"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
      >
        <MessageCircle className="h-4 w-4" />
        Per WhatsApp senden
      </a>

      <div className="grid gap-3 rounded-lg border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-bold leading-6 text-cyan-950 sm:grid-cols-[auto_1fr]">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
        <p>
          Wir prüfen kostenlos und unverbindlich, ob eine passende und wirtschaftlich interessante Alternative möglich ist. Jede Anfrage wird individuell bewertet.
        </p>
      </div>
    </form>
  );
}
