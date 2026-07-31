"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  FileUp,
  Loader2,
  Send,
} from "lucide-react";

import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";
import { appendConversionJourneyToFormData } from "@/lib/conversion-journey";
import { getBookingServiceForLead } from "@/lib/lead-intents";
import type { RequestContext } from "@/lib/lead-intents/resolve-request-context";
import { resolveRequestPageContent } from "@/lib/lead-intents/request-page-content";

type RequestStep = 1 | 2 | 3;
type RequestGroup = "cleaning" | "moving" | "clearance" | "general";
type FormErrors = Record<string, string>;

type ProfessionalRequestFormProps = {
  context: RequestContext;
  selection: ReactNode;
};

const inputClass =
  "min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base font-semibold text-slate-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const acceptedFileTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const maxFileSize = 8 * 1024 * 1024;

const cleaningExtras = [
  "Fenster und Glasflächen",
  "Küche",
  "Sanitärbereiche",
  "Treppenhaus",
  "Grundreinigung",
] as const;

const movingExtras = [
  "Möbeldemontage",
  "Möbelmontage",
  "Verpackung",
  "Entrümpelung",
  "Reinigung",
] as const;

const objectTypeLabels: Record<string, string> = {
  wohnung: "Wohnung",
  haus: "Haus",
  buero: "Büro",
  praxis: "Praxis",
  gewerbe: "Gewerbeobjekt",
  treppenhaus: "Treppenhaus",
  sonstiges: "Andere Objektart",
};

const frequencyLabels: Record<string, string> = {
  einmalig: "Einmalig",
  woechentlich: "Wöchentlich",
  "14-taegig": "14-tägig",
  monatlich: "Monatlich",
};

const answerLabels: Record<string, string> = {
  ja: "Ja",
  nein: "Nein",
  unklar: "Noch unklar",
};

function customerValue(value: string, labels: Record<string, string>) {
  return labels[value] || value;
}

function requestGroup(context: RequestContext): RequestGroup {
  if (context.formVariant === "moving" || context.formVariant === "special-transport") {
    return "moving";
  }
  if (context.formVariant === "clearance") return "clearance";
  if (
    [
      "cleaning",
      "b2b-cleaning",
      "property-cleaning",
      "solar-pv",
      "handover",
    ].includes(context.formVariant)
  ) {
    return "cleaning";
  }
  return "general";
}

function locationLabel(context: RequestContext) {
  if (context.location === "duesseldorf") return "Düsseldorf";
  if (context.location === "regensburg") return "Regensburg";
  if (context.location === "unsicher") return "Noch unsicher";
  return "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-black text-slate-950">
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-2 text-sm font-semibold text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Progress({ step }: { step: RequestStep }) {
  const labels = ["Standort und Leistung", "Eckdaten", "Kontakt und Zusammenfassung"];
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label={`Schritt ${step} von 3`}>
      {labels.map((label, index) => {
        const number = (index + 1) as RequestStep;
        const active = number === step;
        const complete = number < step;
        return (
          <li
            key={label}
            className={`min-w-0 rounded-lg border px-3 py-3 ${
              active
                ? "border-blue-700 bg-blue-700 text-white"
                : complete
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
            aria-current={active ? "step" : undefined}
          >
            <span className="block text-xs font-black">Schritt {number}</span>
            <span className="mt-1 hidden truncate text-xs font-semibold sm:block">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function ProfessionalRequestForm({
  context,
  selection,
}: ProfessionalRequestFormProps) {
  const group = useMemo(() => requestGroup(context), [context]);
  const pageContent = useMemo(() => resolveRequestPageContent(context), [context]);
  const [step, setStep] = useState<RequestStep>(() => (context.valid ? 2 : 1));
  const [objectType, setObjectType] = useState("");
  const [cityOrZip, setCityOrZip] = useState(() =>
    context.location === "duesseldorf"
      ? "Düsseldorf"
      : context.location === "regensburg"
        ? "Regensburg"
        : "",
  );
  const [areaSize, setAreaSize] = useState("");
  const [frequency, setFrequency] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [startLocation, setStartLocation] = useState(() =>
    context.location === "regensburg" ? "Regensburg" : "",
  );
  const [destinationLocation, setDestinationLocation] = useState("");
  const [startFloor, setStartFloor] = useState("");
  const [destinationFloor, setDestinationFloor] = useState("");
  const [startElevator, setStartElevator] = useState("");
  const [destinationElevator, setDestinationElevator] = useState("");
  const [floor, setFloor] = useState("");
  const [elevator, setElevator] = useState("");
  const [scope, setScope] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [cleaningRequested, setCleaningRequested] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [optionalOpen, setOptionalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [requestId, setRequestId] = useState("");
  const [startedAt] = useState(() => Date.now());
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "error" && Object.keys(errors).length) {
      errorSummaryRef.current?.focus();
    }
  }, [errors, status]);

  function validateDetails() {
    const next: FormErrors = {};
    if (!context.valid) next.context = "Bitte wählen Sie Standort und Leistung aus.";

    if (group === "moving") {
      if (startLocation.trim().length < 2) next.startLocation = "Bitte Startort eintragen.";
      if (destinationLocation.trim().length < 2) {
        next.destinationLocation = "Bitte Zielort eintragen.";
      }
      if (scope.trim().length < 2) next.scope = "Bitte Umfang, Zimmer oder Wohnfläche angeben.";
    } else {
      if (cityOrZip.trim().length < 2) next.cityOrZip = "Bitte Ort oder PLZ eintragen.";
      if (objectType.trim().length < 2) next.objectType = "Bitte Objektart auswählen.";
      if (areaSize.trim().length < 2) {
        next.areaSize =
          group === "clearance"
            ? "Bitte ungefähre Größe oder Umfang angeben."
            : "Bitte Fläche oder Umfang angeben.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateContact() {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = "Bitte Namen eintragen.";
    if (!email.trim() && !phone.trim()) {
      next.contact = "Bitte E-Mail-Adresse oder Telefonnummer eintragen.";
    }
    if (email.trim() && !isEmail(email.trim())) {
      next.email = "Bitte eine gültige E-Mail-Adresse eintragen.";
    }
    if (phone.trim() && phone.trim().length < 6) {
      next.phone = "Bitte eine vollständige Telefonnummer eintragen.";
    }
    if (contactMethod === "email" && !email.trim()) {
      next.email = "Bitte tragen Sie für den gewählten Kontaktweg eine E-Mail-Adresse ein.";
    }
    if (["telefon", "whatsapp"].includes(contactMethod) && !phone.trim()) {
      next.phone = "Bitte tragen Sie für den gewählten Kontaktweg eine Telefonnummer ein.";
    }
    if (!privacyConsent) {
      next.privacy = "Bitte bestätigen Sie den Datenschutz-Hinweis.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function selectFiles(nextFiles: File[]) {
    const limited = nextFiles.slice(0, 5);
    const invalidType = limited.find((file) => !acceptedFileTypes.has(file.type));
    const oversized = limited.find((file) => file.size > maxFileSize);
    if (invalidType) {
      setErrors((current) => ({
        ...current,
        files: "Bitte verwenden Sie nur JPG-, PNG-, WebP- oder PDF-Dateien.",
      }));
      return;
    }
    if (oversized) {
      setErrors((current) => ({
        ...current,
        files: "Eine Datei ist größer als 8 MB. Bitte wählen Sie eine kleinere Datei.",
      }));
      return;
    }
    setErrors((current) => {
      const next = { ...current };
      delete next.files;
      return next;
    });
    setFiles(limited);
  }

  function continueToContact() {
    if (!validateDetails()) {
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("idle");
    setStep(3);
  }

  const importantDetails = useMemo(() => {
    if (group === "moving") {
      return [
        ["Start", startLocation],
        ["Ziel", destinationLocation],
        ["Umfang", scope],
        ["Zeitraum", desiredDate],
        ["Etagen", startFloor || destinationFloor ? `${startFloor || "offen"} → ${destinationFloor || "offen"}` : ""],
        ["Aufzug", startElevator || destinationElevator ? `Start ${customerValue(startElevator, answerLabels) || "offen"}, Ziel ${customerValue(destinationElevator, answerLabels) || "offen"}` : ""],
      ];
    }
    if (group === "clearance") {
      return [
        ["Ort", cityOrZip],
        ["Objektart", customerValue(objectType, objectTypeLabels)],
        ["Größe oder Umfang", areaSize],
        ["Etage", floor],
        ["Aufzug", customerValue(elevator, answerLabels)],
        ["Restgegenstände", scope],
        ["Zeitraum", desiredDate],
        ["Reinigung gewünscht", cleaningRequested ? "Ja" : ""],
      ];
    }
    return [
      ["Ort", cityOrZip],
      ["Objektart", customerValue(objectType, objectTypeLabels)],
      ["Fläche oder Umfang", areaSize],
      ["Turnus", customerValue(frequency, frequencyLabels)],
      ["Zeitraum", desiredDate],
    ];
  }, [
    areaSize,
    cityOrZip,
    cleaningRequested,
    desiredDate,
    destinationElevator,
    destinationFloor,
    destinationLocation,
    elevator,
    floor,
    frequency,
    group,
    objectType,
    scope,
    startElevator,
    startFloor,
    startLocation,
  ]);

  const missingOptional = [
    desiredDate ? "" : "Termin oder Zeitraum",
    extras.length ? "" : "Zusatzleistungen",
    files.length ? "" : "Fotos oder Dokumente",
  ].filter(Boolean);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    if (!validateContact() || !validateDetails()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setRequestId("");
    const now = new Date().toISOString();
    const landingPage = `${window.location.pathname}${window.location.search}`;
    const query = new URLSearchParams(window.location.search);
    const bookingService = getBookingServiceForLead(context.service || "sonstiges");
    const attribution = {
      utmSource: query.get("utm_source") || "",
      utmMedium: query.get("utm_medium") || "",
      utmCampaign: query.get("utm_campaign") || context.campaign,
      utmTerm: query.get("utm_term") || "",
      utmContent: query.get("utm_content") || "",
      gclid: query.get("gclid") || "",
      gbraid: query.get("gbraid") || "",
      wbraid: query.get("wbraid") || "",
    };
    const details = {
      contact: {
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        callbackPreference: contactMethod,
        notes: message.trim(),
      },
      service: {
        type: bookingService,
        source: context.sourceLabel,
        entryPoint: landingPage,
        regionPreset: context.location,
      },
      configuration: {
        requestContext: "professional_request",
        leadType: "professional_request",
        sourcePage: "/kontakt",
        landingPage,
        entryPage: context.entryPage || landingPage,
        campaign: context.campaign,
        service: context.serviceKey,
        serviceType: bookingService,
        location: cityOrZip.trim() || locationLabel(context),
        city: cityOrZip.trim(),
        objectType,
        areaSize: areaSize.trim(),
        area: areaSize.trim(),
        rooms: group === "moving" ? scope.trim() : "",
        cleaningFrequency: frequency,
        desiredDate,
        preferredDate: desiredDate,
        timeframe: desiredDate,
        startLocation: startLocation.trim(),
        destinationLocation: destinationLocation.trim(),
        startFloor: startFloor.trim(),
        destinationFloor: destinationFloor.trim(),
        startElevator,
        destinationElevator,
        floor: floor.trim(),
        elevator,
        scope: scope.trim(),
        selectedAddons: extras,
        selectedServices: extras,
        cleaningRequested,
        message: message.trim(),
        preferredContactMethod: contactMethod,
        privacyConsent: true,
        rawFields: {
          cityOrZip: cityOrZip.trim(),
          objectType,
          areaSize: areaSize.trim(),
          cleaningFrequency: frequency,
          desiredDate,
          startLocation: startLocation.trim(),
          destinationLocation: destinationLocation.trim(),
          startFloor: startFloor.trim(),
          destinationFloor: destinationFloor.trim(),
          startElevator,
          destinationElevator,
          floor: floor.trim(),
          elevator,
          scope: scope.trim(),
          selectedAddons: extras,
          selectedServices: extras,
          cleaningRequested,
          message: message.trim(),
          contactMethod,
          source: context.sourceLabel,
          entryPage: context.entryPage || landingPage,
          locale: context.locale,
          ...attribution,
        },
      },
      metadata: {
        createdAt: now,
        intakeVersion: "professional-request-1.0.0",
        locale: context.locale,
        source: context.sourceLabel,
        clientContext: {
          source: context.sourceLabel,
          entryPoint: context.entryPage || landingPage,
          landingPage,
          campaign: context.campaign,
          locale: context.locale,
          ...attribution,
        },
      },
    };

    const payload = new FormData();
    payload.set("type", "professional_request");
    payload.set("lead_type", "professional_request");
    payload.set("leadSource", context.sourceLabel);
    payload.set("source", context.sourceLabel);
    payload.set("sourceComponent", "ProfessionalRequestForm");
    payload.set("sourcePage", "/kontakt");
    payload.set("landingPage", landingPage);
    payload.set("service", bookingService);
    payload.set("serviceCategory", context.serviceKey);
    payload.set("intent", context.intent);
    payload.set("name", name.trim());
    payload.set("email", email.trim());
    payload.set("phone", phone.trim());
    payload.set("contactMethod", contactMethod);
    payload.set("preferredContactMethod", contactMethod);
    payload.set("cityOrZip", cityOrZip.trim());
    payload.set("objectType", objectType);
    payload.set("areaSize", areaSize.trim());
    payload.set("area", areaSize.trim());
    payload.set("rooms", group === "moving" ? scope.trim() : "");
    payload.set("cleaningFrequency", frequency);
    payload.set("desiredDate", desiredDate);
    payload.set("preferredDate", desiredDate);
    payload.set("timeframe", desiredDate);
    payload.set("startLocation", startLocation.trim());
    payload.set("destinationLocation", destinationLocation.trim());
    payload.set("startFloor", startFloor.trim());
    payload.set("destinationFloor", destinationFloor.trim());
    payload.set("startElevator", startElevator);
    payload.set("destinationElevator", destinationElevator);
    payload.set("floor", floor.trim());
    payload.set("elevator", elevator);
    payload.set("scope", scope.trim());
    payload.set("selectedAddons", extras.join(", "));
    payload.set("selectedServices", extras.join(", "));
    payload.set("cleaningRequested", cleaningRequested ? "true" : "false");
    payload.set("message", message.trim());
    payload.set("privacyConsent", "true");
    payload.set("formStartedAt", String(startedAt));
    payload.set("timestamp", now);
    payload.set("companyWebsite", honeypot);
    payload.set("utmSource", attribution.utmSource);
    payload.set("utmMedium", attribution.utmMedium);
    payload.set("utmCampaign", attribution.utmCampaign);
    payload.set("utmTerm", attribution.utmTerm);
    payload.set("utmContent", attribution.utmContent);
    payload.set("gclid", attribution.gclid);
    payload.set("gbraid", attribution.gbraid);
    payload.set("wbraid", attribution.wbraid);
    payload.set("upgrades", JSON.stringify(extras));
    payload.set("details", JSON.stringify(details));
    for (const file of files) payload.append("photo", file);
    appendConversionJourneyToFormData(payload);

    try {
      const response = await bookingFetch("/api/bookings", {
        method: "POST",
        body: payload,
      });
      const result = (await response.json()) as {
        ok?: boolean;
        requestId?: string;
        bookingId?: string;
        error?: string;
      };

      if (
        response.status !== 201 ||
        result.ok !== true ||
        !result.requestId ||
        !result.bookingId
      ) {
        const serverErrors = bookingFieldErrors(result);
        setErrors({
          ...serverErrors,
          form:
            result.error ||
            "Die Anfrage konnte nicht verarbeitet werden. Bitte prüfen Sie Ihre Angaben.",
        });
        setRequestId(result.requestId || "");
        setStatus("error");
        return;
      }

      setRequestId(result.requestId);
      setStatus("success");
      window.dispatchEvent(
        new CustomEvent("floxant:conversion-event", {
          detail: {
            event: "seo_lead_submit_success",
            source: context.sourceLabel,
            channel: "form",
            href: "/api/bookings",
            label: "Anfrage erfolgreich gesendet",
            dataset: {
              source: context.sourceLabel,
              service: context.serviceKey,
              city: context.location,
              intent: context.intent,
              pageIntent: context.intent,
              channel: "form",
              label: "Anfrage erfolgreich gesendet",
            },
          },
        }),
      );
    } catch {
      setErrors({
        form: "Die Anfrage konnte technisch nicht verarbeitet werden. Bitte versuchen Sie es erneut.",
      });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-950"
        aria-live="polite"
        data-request-success
      >
        <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-black">Ihre Anfrage ist angekommen.</h2>
        <p className="mt-3 leading-7">
          FLOXANT prüft Ihre Angaben und meldet sich über den gewählten Kontaktweg.
          Eine Buchung oder Terminbestätigung entsteht erst nach der persönlichen Abstimmung.
        </p>
        <dl className="mt-5 grid gap-3 rounded-lg border border-emerald-200 bg-white/70 p-4 sm:grid-cols-2">
          <div><dt className="text-xs font-black uppercase tracking-wide text-emerald-800">Referenznummer</dt><dd className="mt-1 break-all font-semibold">{requestId}</dd></div>
          <div><dt className="text-xs font-black uppercase tracking-wide text-emerald-800">Kontaktweg</dt><dd className="mt-1 font-semibold">{contactMethod === "email" ? "E-Mail" : contactMethod === "whatsapp" ? "WhatsApp" : "Telefon"}</dd></div>
          <div><dt className="text-xs font-black uppercase tracking-wide text-emerald-800">Standort</dt><dd className="mt-1 font-semibold">{locationLabel(context)}</dd></div>
          <div><dt className="text-xs font-black uppercase tracking-wide text-emerald-800">Leistung</dt><dd className="mt-1 font-semibold">{context.leadIntent.serviceLabel}</dd></div>
        </dl>
        <a href="/" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-emerald-800 px-5 text-sm font-black text-white hover:bg-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
          Zur Startseite
        </a>
      </section>
    );
  }

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 sm:p-6"
      data-professional-request-form
      data-request-group={group}
    >
      <Progress step={step} />

      {status === "error" && Object.keys(errors).length ? (
        <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 outline-none focus:ring-2 focus:ring-red-600">
          Einige Angaben brauchen noch Ihre Aufmerksamkeit. Prüfen Sie bitte die markierten Felder.
          {requestId ? <span className="mt-2 block break-all text-xs">Referenz: {requestId}</span> : null}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="mt-6">
          <h2
            ref={stepHeadingRef}
            tabIndex={-1}
            className="text-2xl font-black text-slate-950 outline-none"
          >
            Standort und Leistung auswählen
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            Die verfügbaren Leistungen werden passend zum gewählten Standort angezeigt.
          </p>
          <div className="mt-5">{selection}</div>
          {errors.context ? (
            <p className="mt-4 text-sm font-semibold text-red-700">{errors.context}</p>
          ) : null}
          {context.valid ? (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Weiter zu den Eckdaten
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        data-track-submit="success_only"
        data-source={context.sourceLabel}
        aria-label="FLOXANT Anfrage"
      >
        {step === 2 ? (
          <div className="mt-6 space-y-6">
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="text-2xl font-black text-slate-950 outline-none"
              >
                Eckdaten zur Leistung
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                Pflichtangaben sind markiert. Schätzwerte können Sie als ungefähr kennzeichnen.
              </p>
            </div>

            {group === "moving" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="request-start" label="Startort" required error={errors.startLocation}>
                  <input id="request-start" value={startLocation} onChange={(event) => setStartLocation(event.target.value)} className={inputClass} aria-describedby={errors.startLocation ? "request-start-error" : undefined} />
                </Field>
                <Field id="request-destination" label="Zielort" required error={errors.destinationLocation}>
                  <input id="request-destination" value={destinationLocation} onChange={(event) => setDestinationLocation(event.target.value)} className={inputClass} aria-describedby={errors.destinationLocation ? "request-destination-error" : undefined} />
                </Field>
                <Field id="request-period" label="Gewünschter Termin oder Zeitraum">
                  <input id="request-period" value={desiredDate} onChange={(event) => setDesiredDate(event.target.value)} className={inputClass} />
                </Field>
                <Field id="request-moving-scope" label="Zimmer, Wohnfläche oder Möbelumfang" required error={errors.scope}>
                  <input id="request-moving-scope" value={scope} onChange={(event) => setScope(event.target.value)} className={inputClass} aria-describedby={errors.scope ? "request-moving-scope-error" : undefined} />
                </Field>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="request-city" label="Ort oder PLZ" required error={errors.cityOrZip}>
                  <input id="request-city" value={cityOrZip} onChange={(event) => setCityOrZip(event.target.value)} className={inputClass} aria-describedby={errors.cityOrZip ? "request-city-error" : undefined} />
                </Field>
                <Field id="request-object" label="Objektart" required error={errors.objectType}>
                  <select id="request-object" value={objectType} onChange={(event) => setObjectType(event.target.value)} className={inputClass} aria-describedby={errors.objectType ? "request-object-error" : undefined}>
                    <option value="">Bitte auswählen</option>
                    <option value="wohnung">Wohnung</option>
                    <option value="haus">Haus</option>
                    <option value="buero">Büro</option>
                    <option value="praxis">Praxis</option>
                    <option value="gewerbe">Gewerbeobjekt</option>
                    <option value="treppenhaus">Treppenhaus</option>
                    <option value="sonstiges">Andere Objektart</option>
                  </select>
                </Field>
                <Field id="request-area" label={group === "clearance" ? "Ungefähre Größe oder Umfang" : "Fläche oder Umfang"} required error={errors.areaSize}>
                  <input id="request-area" value={areaSize} onChange={(event) => setAreaSize(event.target.value)} className={inputClass} aria-describedby={errors.areaSize ? "request-area-error" : undefined} />
                </Field>
                {group === "clearance" ? (
                  <>
                    <Field id="request-floor" label="Etage">
                      <input id="request-floor" value={floor} onChange={(event) => setFloor(event.target.value)} className={inputClass} />
                    </Field>
                    <Field id="request-elevator" label="Aufzug">
                      <select id="request-elevator" value={elevator} onChange={(event) => setElevator(event.target.value)} className={inputClass}>
                        <option value="">Noch offen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option>
                      </select>
                    </Field>
                  </>
                ) : (
                  <Field id="request-frequency" label="Einmalig oder regelmäßig">
                    <select id="request-frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)} className={inputClass}>
                      <option value="">Noch offen</option><option value="einmalig">Einmalig</option><option value="woechentlich">Wöchentlich</option><option value="vierzehntaegig">14-tägig</option><option value="monatlich">Monatlich</option>
                    </select>
                  </Field>
                )}
                <Field id="request-date" label="Gewünschter Termin oder Zeitraum">
                  <input id="request-date" value={desiredDate} onChange={(event) => setDesiredDate(event.target.value)} className={inputClass} />
                </Field>
              </div>
            )}

            <section className="rounded-lg border border-slate-200 bg-slate-50">
              <button
                type="button"
                aria-expanded={optionalOpen}
                aria-controls="request-optional-details"
                onClick={() => setOptionalOpen((current) => !current)}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-4 text-left text-sm font-black text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Weitere Angaben hinzufügen <span className="text-xs font-semibold text-slate-500">optional</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${optionalOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {optionalOpen ? (
                <div id="request-optional-details" className="space-y-5 border-t border-slate-200 p-4">
                  {group === "moving" ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="request-start-floor" label="Startetage"><input id="request-start-floor" value={startFloor} onChange={(event) => setStartFloor(event.target.value)} className={inputClass} /></Field>
                      <Field id="request-destination-floor" label="Zieletage"><input id="request-destination-floor" value={destinationFloor} onChange={(event) => setDestinationFloor(event.target.value)} className={inputClass} /></Field>
                      <Field id="request-start-elevator" label="Aufzug am Startort"><select id="request-start-elevator" value={startElevator} onChange={(event) => setStartElevator(event.target.value)} className={inputClass}><option value="">Noch offen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option></select></Field>
                      <Field id="request-destination-elevator" label="Aufzug am Zielort"><select id="request-destination-elevator" value={destinationElevator} onChange={(event) => setDestinationElevator(event.target.value)} className={inputClass}><option value="">Noch offen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option></select></Field>
                    </div>
                  ) : null}
                  {group === "clearance" ? (
                    <>
                      <Field id="request-clearance-scope" label="Art und Umfang der Gegenstände"><input id="request-clearance-scope" value={scope} onChange={(event) => setScope(event.target.value)} className={inputClass} /></Field>
                      <label className="flex min-h-12 items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800"><input type="checkbox" checked={cleaningRequested} onChange={(event) => setCleaningRequested(event.target.checked)} className="mt-1 h-4 w-4" />Reinigung nach der Räumung als mögliche Zusatzleistung prüfen</label>
                    </>
                  ) : (
                    <fieldset>
                      <legend className="text-sm font-black text-slate-950">Zusatzleistungen</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {(group === "moving" ? movingExtras : cleaningExtras).map((extra) => (
                          <label key={extra} className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800"><input type="checkbox" checked={extras.includes(extra)} onChange={() => setExtras((current) => toggleValue(current, extra))} className="h-4 w-4" />{extra}</label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  <Field id="request-message" label="Besonderheiten oder Nachricht (optional)"><textarea id="request-message" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} className={`${inputClass} py-3`} /></Field>
                  <Field id="request-files" label="Fotos oder Dokumente (optional)" error={errors.files}>
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-black text-slate-900"><FileUp className="h-4 w-4" aria-hidden="true" />Bis zu fünf Dateien auswählen</div>
                      <input id="request-files" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => selectFiles(Array.from(event.target.files || []))} className="mt-3 block w-full text-sm font-semibold text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:font-black file:text-white" aria-describedby={errors.files ? "request-files-error" : undefined} />
                      {files.length ? <ul className="mt-3 grid gap-2">{files.map((file, index) => <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold"><span className="min-w-0 truncate">{file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB</span><button type="button" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="shrink-0 font-black text-blue-700 underline">Entfernen</button></li>)}</ul> : null}
                      <p className="mt-2 text-xs leading-5 text-slate-600">JPG, PNG, WebP oder PDF bis 8 MB. Bitte keine Ausweise, Zugangscodes oder unnötigen persönlichen Unterlagen hochladen.</p>
                    </div>
                  </Field>
                </div>
              ) : null}
            </section>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück
              </button>
              <button type="button" onClick={continueToContact} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                Weiter zu Kontakt und Übersicht <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6 space-y-6">
            <div>
              <h2 ref={stepHeadingRef} tabIndex={-1} className="text-2xl font-black text-slate-950 outline-none">Kontakt und Zusammenfassung</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Prüfen Sie die Eckdaten. Sie können jederzeit zurückgehen und Angaben ändern.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="request-name" label="Name" required error={errors.name}>
                <input id="request-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} aria-describedby={errors.name ? "request-name-error" : undefined} />
              </Field>
              <Field id="request-contact-method" label="Bevorzugter Kontaktweg">
                <select id="request-contact-method" value={contactMethod} onChange={(event) => setContactMethod(event.target.value)} className={inputClass}>
                  <option value="email">E-Mail</option><option value="telefon">Telefon</option><option value="whatsapp">WhatsApp</option>
                </select>
              </Field>
              <Field id="request-email" label="E-Mail-Adresse" error={errors.email || errors.contact}>
                <input id="request-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} aria-describedby={errors.email || errors.contact ? "request-email-error" : undefined} />
              </Field>
              <Field id="request-phone" label="Telefonnummer" error={errors.phone}>
                <input id="request-phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} aria-describedby={errors.phone ? "request-phone-error" : undefined} />
              </Field>
            </div>
            <p className="text-sm font-semibold text-slate-600">Mindestens E-Mail-Adresse oder Telefonnummer ist erforderlich. Der gewählte Kontaktweg muss ausgefüllt sein.</p>

            <section className="rounded-lg border border-blue-200 bg-blue-50 p-5" aria-labelledby="request-summary-title">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 id="request-summary-title" className="text-lg font-black text-slate-950">Ihre Angaben vor dem Absenden</h3><button type="button" onClick={() => setStep(2)} className="min-h-11 rounded-lg px-3 text-sm font-black text-blue-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Angaben ändern</button></div>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Standort</dt><dd className="mt-1 font-semibold text-slate-900">{locationLabel(context)}</dd></div>
                <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Leistung</dt><dd className="mt-1 font-semibold text-slate-900">{context.leadIntent.serviceLabel}</dd></div>
                {importantDetails.filter(([, value]) => value).map(([label, value]) => (
                  <div key={label}><dt className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words font-semibold text-slate-900">{value}</dd></div>
                ))}
                {extras.length ? <div className="sm:col-span-2"><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Zusatzleistungen</dt><dd className="mt-1 font-semibold text-slate-900">{extras.join(", ")}</dd></div> : null}
                {message ? <div className="sm:col-span-2"><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Nachricht</dt><dd className="mt-1 whitespace-pre-wrap break-words font-semibold text-slate-900">{message}</dd></div> : null}
                {files.length ? <div className="sm:col-span-2"><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Dateien</dt><dd className="mt-1 font-semibold text-slate-900">{files.map((file) => file.name).join(", ")}</dd></div> : null}
              </dl>
              {missingOptional.length ? <p className="mt-4 text-sm font-semibold text-slate-600">{pageContent.optionalSummary}</p> : null}
            </section>

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-800">
              <input
                id="request-privacy"
                name="privacyConsent"
                type="checkbox"
                checked={privacyConsent}
                onChange={(event) => setPrivacyConsent(event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0"
                aria-describedby={errors.privacy ? "request-privacy-error" : undefined}
              />
              <span>Ich habe den <a href="/datenschutz" className="font-black text-blue-700 underline">Datenschutz-Hinweis</a> gelesen und stimme der Bearbeitung meiner Anfrage zu.</span>
            </label>
            {errors.privacy ? <p id="request-privacy-error" className="text-sm font-semibold text-red-700">{errors.privacy}</p> : null}

            <div className="hidden" aria-hidden="true">
              <label htmlFor="request-company-website">Website</label>
              <input id="request-company-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
            </div>

            {errors.form ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800" role="alert">
                {errors.form}
                {requestId ? <span className="mt-2 block break-all text-xs">Referenz: {requestId}</span> : null}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep(2)} disabled={status === "submitting"} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-60">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück
              </button>
              <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-cyan-500 px-5 text-sm font-black text-slate-950 hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-wait disabled:opacity-70">
                {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                {status === "submitting" ? "Wird gesendet..." : "Anfrage senden"}
              </button>
            </div>
          </div>
        ) : null}
      </form>
    </section>
  );
}
