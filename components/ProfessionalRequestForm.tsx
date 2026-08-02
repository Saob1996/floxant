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
import {
  REQUEST_ATTACHMENT_RULES,
} from "@/lib/booking/request-service-policy.js";
import { sanitizeBookingPayload } from "@/lib/booking/request-schema.js";
import { trackGenerateLead } from "@/lib/analytics/google-tag";
import { appendConversionJourneyToFormData } from "@/lib/conversion-journey";
import { getBookingServiceForLead } from "@/lib/lead-intents";
import type { RequestContext } from "@/lib/lead-intents/resolve-request-context";
import { resolveRequestPageContent } from "@/lib/lead-intents/request-page-content";

type RequestStep = 1 | 2 | 3;
type RequestGroup =
  | "cleaning"
  | "moving"
  | "furniture"
  | "piano"
  | "clearance"
  | "offer_check"
  | "general";
type FormErrors = Record<string, string>;

type ProfessionalRequestFormProps = {
  context: RequestContext;
  selection: (error?: string) => ReactNode;
  sourcePage?: string;
};

const inputClass =
  "min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base font-semibold text-slate-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const acceptedFileTypes = new Set(REQUEST_ATTACHMENT_RULES.allowedMimeTypes);

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
  vierzehntaegig: "14-tägig",
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
  if (
    ["cleaning", "moving", "furniture", "piano", "clearance", "offer_check"].includes(
      context.formVariant,
    )
  ) {
    return context.formVariant as RequestGroup;
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
        <p id={`${id}-error`} role="alert" className="flex items-start gap-2 text-sm font-semibold text-red-700">
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
  sourcePage = "/kontakt",
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
  const [condition, setCondition] = useState("");
  const [accessPath, setAccessPath] = useState("");
  const [windowCount, setWindowCount] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [instrumentType, setInstrumentType] = useState("");
  const [stairs, setStairs] = useState("");
  const [accessWidth, setAccessWidth] = useState("");
  const [vehicleDistance, setVehicleDistance] = useState("");
  const [fillLevel, setFillLevel] = useState("");
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
  const pendingErrorFocusRef = useRef("");
  const submitLockRef = useRef(false);
  const leadEventKeyRef = useRef("");
  const submissionAttemptKeyRef = useRef("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousContextRef = useRef({
    location: context.location,
    serviceKey: context.serviceKey,
    group,
  });

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (!pendingErrorFocusRef.current) return;
    const id = pendingErrorFocusRef.current;
    pendingErrorFocusRef.current = "";
    window.requestAnimationFrame(() => document.getElementById(id)?.focus());
  }, [errors, step]);

  useEffect(() => {
    const previous = previousContextRef.current;
    if (previous.location === context.location && previous.serviceKey === context.serviceKey) return;

    const locationChanged = previous.location !== context.location;

    if (locationChanged) {
      setCityOrZip(
        context.location === "duesseldorf"
          ? "Düsseldorf"
          : context.location === "regensburg"
            ? "Regensburg"
            : "",
      );
      setStartLocation(context.location === "regensburg" ? "Regensburg" : "");
    }

    if (!context.valid) {
      previousContextRef.current = {
        location: context.location,
        serviceKey: "",
        group: previous.group,
      };
      setErrors({});
      setRequestId("");
      setStatus("idle");
      setStep(1);
      submitLockRef.current = false;
      submissionAttemptKeyRef.current = "";
      return;
    }

    const groupChanged = previous.group !== group;
    previousContextRef.current = {
      location: context.location,
      serviceKey: context.serviceKey,
      group,
    };

    if (groupChanged) {
      setObjectType("");
      setAreaSize("");
      setFrequency("");
      setStartLocation(context.location === "regensburg" ? "Regensburg" : "");
      setDestinationLocation("");
      setStartFloor("");
      setDestinationFloor("");
      setStartElevator("");
      setDestinationElevator("");
      setFloor("");
      setElevator("");
      setScope("");
      setCondition("");
      setAccessPath("");
      setWindowCount("");
      setItemDescription("");
      setDimensions("");
      setWeight("");
      setInstrumentType("");
      setStairs("");
      setAccessWidth("");
      setVehicleDistance("");
      setFillLevel("");
      setCleaningRequested(false);
      setOptionalOpen(false);
    } else if (context.serviceKey !== "fensterreinigung") {
      setWindowCount("");
    }

    setExtras((current) =>
      current.filter((extra) => context.allowedUpgrades.includes(extra)),
    );
    setErrors({});
    setRequestId("");
    setStatus("idle");
    setStep(context.valid ? 2 : 1);
    submitLockRef.current = false;
    submissionAttemptKeyRef.current = "";
  }, [context.allowedUpgrades, context.location, context.serviceKey, context.valid, group]);

  function detailErrors() {
    const next: FormErrors = {};
    if (!context.valid) next.context = "Bitte wählen Sie Standort und Leistung aus.";

    if (group === "moving") {
      if (startLocation.trim().length < 2) next.startLocation = "Bitte Startort eintragen.";
      if (destinationLocation.trim().length < 2) {
        next.destinationLocation = "Bitte Zielort eintragen.";
      }
      if (scope.trim().length < 2) next.scope = "Bitte Umfang, Zimmer oder Wohnfläche angeben.";
    } else if (group === "furniture") {
      if (startLocation.trim().length < 2) next.startLocation = "Bitte Abholort eintragen.";
      if (destinationLocation.trim().length < 2) next.destinationLocation = "Bitte Zielort eintragen.";
      if (itemDescription.trim().length < 2) {
        next.itemDescription = "Bitte Art und Anzahl der Möbel angeben.";
      }
    } else if (group === "piano") {
      if (startLocation.trim().length < 2) next.startLocation = "Bitte Abholort eintragen.";
      if (destinationLocation.trim().length < 2) next.destinationLocation = "Bitte Zielort eintragen.";
      if (!instrumentType) next.instrumentType = "Bitte Instrumentenart auswählen.";
    } else if (["offer_check", "general"].includes(group)) {
      if (cityOrZip.trim().length < 2) next.cityOrZip = "Bitte Ort oder PLZ eintragen.";
      if (scope.trim().length < 2) next.scope = "Bitte beschreiben Sie kurz Ihr Anliegen.";
    } else {
      if (cityOrZip.trim().length < 2) next.cityOrZip = "Bitte Ort oder PLZ eintragen.";
      if (objectType.trim().length < 2) next.objectType = "Bitte Objektart auswählen.";
      if (areaSize.trim().length < 2) {
        next.areaSize =
          group === "clearance"
            ? "Bitte ungefähre Größe oder Umfang angeben."
            : "Bitte Fläche oder Umfang angeben.";
      }
      if (group === "cleaning" && scope.trim().length < 2) {
        next.scope = "Bitte Räume, Bereiche oder gewünschten Umfang angeben.";
      }
    }
    return next;
  }

  function contactErrors() {
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
    return next;
  }

  function firstErrorField(next: FormErrors) {
    const ids: Record<string, string> = {
      context: "request-service-choice",
      location: "request-service-choice",
      service: "request-service-choice",
      serviceId: "request-service-choice",
      cityOrZip: "request-city",
      objectType: "request-object",
      areaSize: "request-area",
      scope: group === "moving" ? "request-moving-scope" : "request-scope",
      startLocation: "request-start",
      destinationLocation: "request-destination",
      itemDescription: "request-items",
      instrumentType: "request-instrument",
      name: "request-name",
      contact: "request-email",
      email: "request-email",
      phone: "request-phone",
      privacy: "request-privacy",
      privacyConsent: "request-privacy",
      files: "request-files",
    };
    return Object.keys(next).map((key) => ids[key]).find(Boolean) || "request-error-summary";
  }

  function showErrors(next: FormErrors, targetStep?: RequestStep) {
    pendingErrorFocusRef.current = firstErrorField(next);
    if (targetStep) setStep(targetStep);
    setErrors(next);
    setStatus("error");
  }

  function selectFiles(nextFiles: File[]) {
    if (nextFiles.length > REQUEST_ATTACHMENT_RULES.maxFiles) {
      setStatus("error");
      setErrors((current) => ({
        ...current,
        files: `Bitte wählen Sie höchstens ${REQUEST_ATTACHMENT_RULES.maxFiles} Dateien aus.`,
      }));
      return;
    }
    const invalidType = nextFiles.find((file) => !acceptedFileTypes.has(file.type));
    const oversized = nextFiles.find((file) => file.size > REQUEST_ATTACHMENT_RULES.maxFileBytes);
    const totalBytes = nextFiles.reduce((total, file) => total + file.size, 0);
    if (invalidType) {
      setStatus("error");
      setErrors((current) => ({
        ...current,
        files: "Bitte verwenden Sie nur JPG-, PNG-, WebP- oder PDF-Dateien.",
      }));
      return;
    }
    if (oversized) {
      setStatus("error");
      setErrors((current) => ({
        ...current,
        files: "Diese Datei ist zu groß. Entfernen Sie die Datei oder wählen Sie eine kleinere Version.",
      }));
      return;
    }
    if (totalBytes > REQUEST_ATTACHMENT_RULES.maxTotalBytes) {
      setStatus("error");
      setErrors((current) => ({
        ...current,
        files: "Die ausgewählten Dateien sind zusammen zu groß. Bitte entfernen Sie eine oder mehrere Dateien.",
      }));
      return;
    }
    setErrors((current) => {
      const next = { ...current };
      delete next.files;
      return next;
    });
    setFiles(
      nextFiles.filter(
        (file, index, all) =>
          all.findIndex(
            (candidate) =>
              candidate.name === file.name &&
              candidate.size === file.size &&
              candidate.lastModified === file.lastModified,
          ) === index,
      ),
    );
  }

  function continueToContact() {
    const next = detailErrors();
    if (Object.keys(next).length) {
      showErrors(next);
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
    if (group === "furniture") {
      return [
        ["Abholort", startLocation],
        ["Zielort", destinationLocation],
        ["Möbel", itemDescription],
        ["Maße", dimensions],
        ["Zeitraum", desiredDate],
        ["Etagen", startFloor || destinationFloor ? `${startFloor || "offen"} → ${destinationFloor || "offen"}` : ""],
        ["Aufzüge", startElevator || destinationElevator ? `Abholung ${customerValue(startElevator, answerLabels) || "offen"}, Ziel ${customerValue(destinationElevator, answerLabels) || "offen"}` : ""],
        ["Zugangsweg", accessPath],
        ["Entfernung zum Fahrzeug", vehicleDistance],
      ];
    }
    if (group === "piano") {
      return [
        ["Abholort", startLocation],
        ["Zielort", destinationLocation],
        ["Instrument", instrumentType],
        ["Maße", dimensions],
        ["Gewicht", weight],
        ["Zeitraum", desiredDate],
        ["Etagen", startFloor || destinationFloor ? `${startFloor || "offen"} → ${destinationFloor || "offen"}` : ""],
        ["Treppen", stairs],
        ["Aufzüge", startElevator || destinationElevator ? `Abholung ${customerValue(startElevator, answerLabels) || "offen"}, Ziel ${customerValue(destinationElevator, answerLabels) || "offen"}` : ""],
        ["Zugangsbreite", accessWidth],
        ["Entfernung zum Fahrzeug", vehicleDistance],
      ];
    }
    if (group === "clearance") {
      return [
        ["Ort", cityOrZip],
        ["Objektart", customerValue(objectType, objectTypeLabels)],
        ["Größe oder Umfang", areaSize],
        ["Etage", floor],
        ["Aufzug", customerValue(elevator, answerLabels)],
        ["Menge oder Füllgrad", fillLevel],
        ["Gegenstände und Besonderheiten", scope],
        ["Zugangsweg", accessPath],
        ["Zeitraum", desiredDate],
        ["Reinigung gewünscht", cleaningRequested ? "Ja" : "Nein"],
      ];
    }
    if (["offer_check", "general"].includes(group)) {
      return [
        ["Ort", cityOrZip],
        ["Anliegen und Umfang", scope],
        ["Zeitraum", desiredDate],
      ];
    }
    return [
      ["Ort", cityOrZip],
      ["Objektart", customerValue(objectType, objectTypeLabels)],
      ["Fläche oder Umfang", areaSize],
      ["Räume, Bereiche oder Reinigungsumfang", scope],
      ["Turnus", customerValue(frequency, frequencyLabels)],
      ["Zeitraum", desiredDate],
      ["Aktueller Zustand", condition],
      ["Fenster oder Glasflächen", windowCount],
      ["Zugangsweg", accessPath],
    ];
  }, [
    areaSize,
    accessPath,
    cityOrZip,
    cleaningRequested,
    condition,
    desiredDate,
    dimensions,
    destinationElevator,
    destinationFloor,
    destinationLocation,
    elevator,
    fillLevel,
    floor,
    frequency,
    group,
    instrumentType,
    itemDescription,
    objectType,
    scope,
    startElevator,
    startFloor,
    startLocation,
    stairs,
    vehicleDistance,
    weight,
    windowCount,
    accessWidth,
  ]);

  const missingOptional = [
    desiredDate ? "" : "Termin oder Zeitraum",
    !context.allowedUpgrades.length || extras.length ? "" : "Zusatzleistungen",
    files.length ? "" : "Fotos oder Dokumente",
  ].filter(Boolean);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    if (submitLockRef.current) return;
    const nextDetailErrors = detailErrors();
    if (Object.keys(nextDetailErrors).length) {
      showErrors(nextDetailErrors, context.valid ? 2 : 1);
      return;
    }
    const nextContactErrors = contactErrors();
    if (Object.keys(nextContactErrors).length) {
      showErrors(nextContactErrors, 3);
      return;
    }

    submitLockRef.current = true;
    const attemptKey = `professional_request:${Date.now()}:${crypto.randomUUID()}`;
    submissionAttemptKeyRef.current = attemptKey;
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
        sourcePage,
        landingPage,
        entryPage: context.entryPage || landingPage,
        campaign: context.campaign,
        serviceId: context.serviceKey,
        serviceLabel: context.leadIntent.serviceLabel,
        dashboardLabel: context.leadIntent.serviceLabel,
        formProfile: context.formVariant,
        confirmationEmailVariant: context.confirmationEmailVariant,
        service: context.serviceKey,
        serviceType: bookingService,
        location: cityOrZip.trim() || locationLabel(context),
        locationLabel: locationLabel(context),
        regionPreset: context.location,
        city: cityOrZip.trim(),
        objectType,
        areaSize: areaSize.trim(),
        area: areaSize.trim(),
        rooms: group === "moving" ? scope.trim() : "",
        cleaningFrequency: frequency,
        condition: condition.trim(),
        windowCount: windowCount.trim(),
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
        itemDescription: itemDescription.trim(),
        dimensions: dimensions.trim(),
        weight: weight.trim(),
        instrumentType,
        stairs: stairs.trim(),
        accessWidth: accessWidth.trim(),
        vehicleDistance: vehicleDistance.trim(),
        accessPath: accessPath.trim(),
        fillLevel: fillLevel.trim(),
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
          condition: condition.trim(),
          windowCount: windowCount.trim(),
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
          itemDescription: itemDescription.trim(),
          dimensions: dimensions.trim(),
          weight: weight.trim(),
          instrumentType,
          stairs: stairs.trim(),
          accessWidth: accessWidth.trim(),
          vehicleDistance: vehicleDistance.trim(),
          accessPath: accessPath.trim(),
          fillLevel: fillLevel.trim(),
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
        intakeVersion: "professional-request-2.0.0",
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

    const requestFields = sanitizeBookingPayload({
      type: "professional_request",
      lead_type: "professional_request",
      leadSource: context.sourceLabel,
      source: context.sourceLabel,
      sourceComponent: "ProfessionalRequestForm",
      sourcePage,
      landingPage,
      service: bookingService,
      serviceId: context.serviceKey,
      serviceLabel: context.leadIntent.serviceLabel,
      serviceCategory: context.serviceKey,
      location: context.location,
      locationLabel: locationLabel(context),
      intent: context.intent,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      contactMethod,
      preferredContactMethod: contactMethod,
      cityOrZip: cityOrZip.trim(),
      objectType,
      areaSize: areaSize.trim(),
      cleaningFrequency: frequency,
      condition: condition.trim(),
      windowCount: windowCount.trim(),
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
      itemDescription: itemDescription.trim(),
      dimensions: dimensions.trim(),
      weight: weight.trim(),
      instrumentType,
      stairs: stairs.trim(),
      accessWidth: accessWidth.trim(),
      vehicleDistance: vehicleDistance.trim(),
      accessPath: accessPath.trim(),
      fillLevel: fillLevel.trim(),
      selectedAddons: extras,
      cleaningRequested,
      message: message.trim(),
      privacyConsent: true,
      formStartedAt: String(startedAt),
      timestamp: now,
      companyWebsite: honeypot,
      ...attribution,
      upgrades: extras,
      details,
    });
    const payload = new FormData();
    for (const [key, value] of Object.entries(requestFields)) {
      payload.set(
        key,
        typeof value === "string" ? value : typeof value === "boolean" ? String(value) : JSON.stringify(value),
      );
    }
    for (const file of files) payload.append("photo", file);
    appendConversionJourneyToFormData(payload);

    try {
      const response = await bookingFetch("/api/bookings", {
        method: "POST",
        headers: {
          "Idempotency-Key": attemptKey,
        },
        body: payload,
      });
      const result = (await response.json()) as {
        ok?: boolean;
        code?: string;
        requestId?: string;
        bookingId?: string;
        error?: string;
      };

      if (submissionAttemptKeyRef.current !== attemptKey) return;

      if (
        response.status !== 201 ||
        response.ok !== true ||
        result.ok !== true ||
        !result.requestId ||
        !result.bookingId
      ) {
        const serverErrors = bookingFieldErrors(result);
        submitLockRef.current = false;
        submissionAttemptKeyRef.current = "";
        const contextError = ["context", "location", "service", "serviceId"].some(
          (key) => Boolean(serverErrors[key]),
        );
        const detailError = [
          "files",
          "cityOrZip",
          "objectType",
          "areaSize",
          "scope",
          "startLocation",
          "destinationLocation",
          "itemDescription",
          "instrumentType",
        ].some((key) => Boolean(serverErrors[key]));
        if (serverErrors.files) setOptionalOpen(true);
        const next = {
          ...serverErrors,
          form:
            result.code === "NETWORK_ERROR"
              ? "Die Anfrage konnte gerade nicht übermittelt werden. Ihre Eingaben bleiben erhalten. Versuchen Sie es erneut."
              : result.error ||
                "Die Anfrage konnte nicht verarbeitet werden. Bitte prüfen Sie Ihre Angaben.",
        };
        setRequestId(response.status >= 500 ? result.requestId || "" : "");
        showErrors(next, contextError ? 1 : detailError ? 2 : undefined);
        return;
      }

      if (!leadEventKeyRef.current) {
        leadEventKeyRef.current = attemptKey;
      }
      trackGenerateLead(
        {
          form_name: "central_professional_request",
          service_type: context.analyticsServiceType,
          location: context.location || "unsicher",
          lead_source: context.sourceLabel,
        },
        leadEventKeyRef.current,
      );
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
      if (submissionAttemptKeyRef.current !== attemptKey) return;
      submitLockRef.current = false;
      submissionAttemptKeyRef.current = "";
      showErrors({
        form: "Die Anfrage konnte gerade nicht übermittelt werden. Ihre Eingaben bleiben erhalten. Versuchen Sie es erneut.",
      });
    }
  }

  const routeCoreFields = (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="request-start" label={group === "moving" ? "Startort" : "Abholort"} required error={errors.startLocation}>
        <input id="request-start" value={startLocation} onChange={(event) => setStartLocation(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.startLocation)} aria-describedby={errors.startLocation ? "request-start-error" : undefined} />
      </Field>
      <Field id="request-destination" label="Zielort" required error={errors.destinationLocation}>
        <input id="request-destination" value={destinationLocation} onChange={(event) => setDestinationLocation(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.destinationLocation)} aria-describedby={errors.destinationLocation ? "request-destination-error" : undefined} />
      </Field>
      {group === "moving" ? (
        <Field id="request-moving-scope" label="Zimmer, Wohnfläche oder ungefährer Umfang" required error={errors.scope}>
          <input id="request-moving-scope" value={scope} onChange={(event) => setScope(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.scope)} aria-describedby={errors.scope ? "request-moving-scope-error" : undefined} />
        </Field>
      ) : null}
      {group === "furniture" ? (
        <>
          <Field id="request-items" label="Art und Anzahl der Möbel" required error={errors.itemDescription}>
            <input id="request-items" value={itemDescription} onChange={(event) => setItemDescription(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.itemDescription)} aria-describedby={errors.itemDescription ? "request-items-error" : undefined} />
          </Field>
          <Field id="request-dimensions" label="Maße, soweit bekannt">
            <input id="request-dimensions" value={dimensions} onChange={(event) => setDimensions(event.target.value)} className={inputClass} placeholder="z. B. 220 × 95 × 85 cm" />
          </Field>
        </>
      ) : null}
      {group === "piano" ? (
        <>
          <Field id="request-instrument" label="Instrumentenart" required error={errors.instrumentType}>
            <select id="request-instrument" value={instrumentType} onChange={(event) => setInstrumentType(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.instrumentType)} aria-describedby={errors.instrumentType ? "request-instrument-error" : undefined}>
              <option value="">Bitte auswählen</option>
              <option value="Klavier">Klavier</option>
              <option value="Flügel">Flügel</option>
              <option value="E-Piano">E-Piano</option>
              <option value="Anderes Tasteninstrument">Anderes Tasteninstrument</option>
            </select>
          </Field>
          <Field id="request-dimensions" label="Maße, soweit bekannt">
            <input id="request-dimensions" value={dimensions} onChange={(event) => setDimensions(event.target.value)} className={inputClass} placeholder="Breite × Tiefe × Höhe" />
          </Field>
        </>
      ) : null}
      <Field id="request-period" label="Gewünschter Termin oder Zeitraum">
        <input id="request-period" value={desiredDate} onChange={(event) => setDesiredDate(event.target.value)} className={inputClass} />
      </Field>
    </div>
  );

  const locationCoreFields = ["offer_check", "general"].includes(group) ? (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="request-city" label="Ort oder PLZ" required error={errors.cityOrZip}>
        <input id="request-city" value={cityOrZip} onChange={(event) => setCityOrZip(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.cityOrZip)} aria-describedby={errors.cityOrZip ? "request-city-error" : undefined} />
      </Field>
      <Field id="request-scope" label={group === "offer_check" ? "Was möchten Sie prüfen lassen?" : "Worum geht es?"} required error={errors.scope}>
        <textarea id="request-scope" rows={3} value={scope} onChange={(event) => setScope(event.target.value)} className={`${inputClass} py-3`} aria-required="true" aria-invalid={Boolean(errors.scope)} aria-describedby={errors.scope ? "request-scope-error" : undefined} />
      </Field>
      <Field id="request-date" label="Gewünschter Termin oder Zeitraum">
        <input id="request-date" value={desiredDate} onChange={(event) => setDesiredDate(event.target.value)} className={inputClass} />
      </Field>
    </div>
  ) : (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="request-city" label="Ort oder PLZ" required error={errors.cityOrZip}>
        <input id="request-city" value={cityOrZip} onChange={(event) => setCityOrZip(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.cityOrZip)} aria-describedby={errors.cityOrZip ? "request-city-error" : undefined} />
      </Field>
      <Field id="request-object" label="Objektart" required error={errors.objectType}>
        <select id="request-object" value={objectType} onChange={(event) => setObjectType(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.objectType)} aria-describedby={errors.objectType ? "request-object-error" : undefined}>
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
      <Field id="request-area" label={group === "clearance" ? "Ungefähre Größe oder Umfang" : "Ungefähr zu bearbeitende Fläche"} required error={errors.areaSize}>
        <input id="request-area" value={areaSize} onChange={(event) => setAreaSize(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.areaSize)} aria-describedby={errors.areaSize ? "request-area-error" : undefined} placeholder="z. B. 85 m² oder 3 Räume" />
      </Field>
      {group === "clearance" ? (
        <>
          <Field id="request-floor" label="Etage"><input id="request-floor" value={floor} onChange={(event) => setFloor(event.target.value)} className={inputClass} /></Field>
          <Field id="request-elevator" label="Aufzug"><select id="request-elevator" value={elevator} onChange={(event) => setElevator(event.target.value)} className={inputClass}><option value="">Noch offen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option></select></Field>
        </>
      ) : (
        <>
          <Field id="request-scope" label="Räume, Bereiche oder gewünschter Reinigungsumfang" required error={errors.scope}>
            <input id="request-scope" value={scope} onChange={(event) => setScope(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.scope)} aria-describedby={errors.scope ? "request-scope-error" : undefined} />
          </Field>
          <Field id="request-frequency" label="Einmalig oder regelmäßig"><select id="request-frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)} className={inputClass}><option value="">Noch offen</option><option value="einmalig">Einmalig</option><option value="woechentlich">Wöchentlich</option><option value="vierzehntaegig">14-tägig</option><option value="monatlich">Monatlich</option></select></Field>
        </>
      )}
      <Field id="request-date" label="Gewünschter Termin oder Zeitraum"><input id="request-date" value={desiredDate} onChange={(event) => setDesiredDate(event.target.value)} className={inputClass} /></Field>
    </div>
  );

  const routeOptionalFields = ["moving", "furniture", "piano"].includes(group) ? (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="request-start-floor" label={group === "moving" ? "Startetage" : "Etage am Abholort"}><input id="request-start-floor" value={startFloor} onChange={(event) => setStartFloor(event.target.value)} className={inputClass} /></Field>
      <Field id="request-destination-floor" label="Etage am Zielort"><input id="request-destination-floor" value={destinationFloor} onChange={(event) => setDestinationFloor(event.target.value)} className={inputClass} /></Field>
      <Field id="request-start-elevator" label="Aufzug am Start- oder Abholort"><select id="request-start-elevator" value={startElevator} onChange={(event) => setStartElevator(event.target.value)} className={inputClass}><option value="">Noch offen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option></select></Field>
      <Field id="request-destination-elevator" label="Aufzug am Zielort"><select id="request-destination-elevator" value={destinationElevator} onChange={(event) => setDestinationElevator(event.target.value)} className={inputClass}><option value="">Noch offen</option><option value="ja">Ja</option><option value="nein">Nein</option><option value="unklar">Unklar</option></select></Field>
      {group === "piano" ? <Field id="request-weight" label="Ungefähres Gewicht, soweit bekannt"><input id="request-weight" value={weight} onChange={(event) => setWeight(event.target.value)} className={inputClass} /></Field> : null}
      {group === "piano" ? <Field id="request-stairs" label="Treppen und Besonderheiten"><input id="request-stairs" value={stairs} onChange={(event) => setStairs(event.target.value)} className={inputClass} /></Field> : null}
      {group === "piano" ? <Field id="request-access-width" label="Zugangs- oder Treppenbreite"><input id="request-access-width" value={accessWidth} onChange={(event) => setAccessWidth(event.target.value)} className={inputClass} /></Field> : null}
      <Field id="request-access-path" label="Zugangsweg oder Trageweg"><input id="request-access-path" value={accessPath} onChange={(event) => setAccessPath(event.target.value)} className={inputClass} /></Field>
      {["furniture", "piano"].includes(group) ? <Field id="request-vehicle-distance" label="Entfernung zum Fahrzeug"><input id="request-vehicle-distance" value={vehicleDistance} onChange={(event) => setVehicleDistance(event.target.value)} className={inputClass} placeholder="z. B. direkt am Eingang oder ca. 30 m" /></Field> : null}
    </div>
  ) : null;

  const locationOptionalFields = group === "clearance" ? (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="request-fill-level" label="Menge oder Füllgrad"><input id="request-fill-level" value={fillLevel} onChange={(event) => setFillLevel(event.target.value)} className={inputClass} placeholder="z. B. halb gefüllt oder ca. 8 m³" /></Field>
      <Field id="request-access-path" label="Zugangsweg"><input id="request-access-path" value={accessPath} onChange={(event) => setAccessPath(event.target.value)} className={inputClass} /></Field>
      <div className="sm:col-span-2"><Field id="request-clearance-scope" label="Art der Gegenstände und Besonderheiten"><textarea id="request-clearance-scope" rows={3} value={scope} onChange={(event) => setScope(event.target.value)} className={`${inputClass} py-3`} /></Field></div>
      <label className="flex min-h-12 items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 sm:col-span-2"><input type="checkbox" checked={cleaningRequested} onChange={(event) => setCleaningRequested(event.target.checked)} className="mt-1 h-4 w-4" />Reinigung nach der Räumung als mögliche Zusatzleistung prüfen</label>
    </div>
  ) : group === "cleaning" ? (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="request-condition" label="Aktueller Zustand"><input id="request-condition" value={condition} onChange={(event) => setCondition(event.target.value)} className={inputClass} /></Field>
      <Field id="request-access-path" label="Zugang oder besondere Bereiche"><input id="request-access-path" value={accessPath} onChange={(event) => setAccessPath(event.target.value)} className={inputClass} /></Field>
      {context.serviceKey === "fensterreinigung" ? <Field id="request-window-count" label="Fensteranzahl oder Glasflächen"><input id="request-window-count" value={windowCount} onChange={(event) => setWindowCount(event.target.value)} className={inputClass} /></Field> : null}
    </div>
  ) : null;

  if (status === "success") {
    return (
      <section
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-950"
        aria-live="polite"
        role="status"
        data-request-success
      >
        <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-black">Ihre Anfrage ist eingegangen</h2>
        <p className="mt-3 leading-7">
          Vielen Dank. Wir haben Ihre Angaben erhalten und prüfen den gewünschten Umfang.
          Anschließend melden wir uns zum weiteren Vorgehen. Mit dem Absenden entsteht noch
          kein Auftrag und kein automatisch bestätigter Termin.
        </p>
        <dl className="mt-5 grid gap-3 rounded-lg border border-emerald-200 bg-white/70 p-4 sm:grid-cols-2">
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
        <div id="request-error-summary" ref={errorSummaryRef} tabIndex={-1} role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 outline-none focus:ring-2 focus:ring-red-600">
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
          {context.notice ? (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950" role="status">
              {context.notice}
            </p>
          ) : null}
          <div className="mt-5">
            {selection(errors.context || errors.location || errors.serviceId || errors.service)}
          </div>
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
        aria-busy={status === "submitting"}
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

            {["moving", "furniture", "piano"].includes(group)
              ? routeCoreFields
              : locationCoreFields}

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
                  {routeOptionalFields}
                  {locationOptionalFields}
                  {context.allowedUpgrades.length ? (
                    <fieldset>
                      <legend className="text-sm font-black text-slate-950">Zusatzleistungen</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {context.allowedUpgrades.map((extra) => (
                          <label key={extra} className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800"><input type="checkbox" checked={extras.includes(extra)} onChange={() => setExtras((current) => toggleValue(current, extra))} className="h-4 w-4" />{extra}</label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}
                  <Field id="request-message" label="Besonderheiten oder Nachricht (optional)"><textarea id="request-message" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} className={`${inputClass} py-3`} /></Field>
                  <Field id="request-files" label="Fotos oder Dokumente (optional)" error={errors.files}>
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-black text-slate-900"><FileUp className="h-4 w-4" aria-hidden="true" />Bis zu {REQUEST_ATTACHMENT_RULES.maxFiles} Dateien auswählen</div>
                      <input ref={fileInputRef} id="request-files" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => { const nextFiles = Array.from(event.currentTarget.files || []); event.currentTarget.value = ""; selectFiles(nextFiles); }} className="mt-3 block w-full text-sm font-semibold text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:font-black file:text-white" aria-invalid={Boolean(errors.files)} aria-describedby={errors.files ? "request-files-error request-files-help" : "request-files-help"} />
                      <div aria-live="polite">{files.length ? <ul className="mt-3 grid gap-2">{files.map((file, index) => <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center justify-between gap-3 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold"><span className="min-w-0 truncate">{file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB</span><button type="button" onClick={() => { setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index)); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="shrink-0 font-black text-blue-700 underline" aria-label={`${file.name} entfernen`}>Entfernen</button></li>)}</ul> : null}</div>
                      <p id="request-files-help" className="mt-2 text-xs leading-5 text-slate-600">Fotos helfen uns, den Umfang besser einzuschätzen. Der Upload ist optional. JPG, PNG, WebP oder PDF bis 8 MB je Datei und 24 MB insgesamt. Bitte keine Ausweise, Zugangscodes oder unnötigen persönlichen Unterlagen hochladen.</p>
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
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Prüfen Sie Ihre Angaben. Nach dem Absenden sehen wir uns Ihre Anfrage persönlich an und klären anschließend den passenden nächsten Schritt.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="request-name" label="Name" required error={errors.name}>
                <input id="request-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "request-name-error" : undefined} />
              </Field>
              <Field id="request-contact-method" label="Bevorzugter Kontaktweg">
                <select id="request-contact-method" value={contactMethod} onChange={(event) => setContactMethod(event.target.value)} className={inputClass}>
                  <option value="email">E-Mail</option><option value="telefon">Telefon</option><option value="whatsapp">WhatsApp</option>
                </select>
              </Field>
              <Field id="request-email" label="E-Mail-Adresse" required={contactMethod === "email"} error={errors.email}>
                <input id="request-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} aria-required={contactMethod === "email"} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "request-email-error" : undefined} />
              </Field>
              <Field id="request-phone" label="Telefonnummer" required={["telefon", "whatsapp"].includes(contactMethod)} error={errors.phone}>
                <input id="request-phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} aria-required={["telefon", "whatsapp"].includes(contactMethod)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "request-phone-error" : undefined} />
              </Field>
            </div>
            <p className="text-sm font-semibold text-slate-600">Mindestens E-Mail-Adresse oder Telefonnummer ist erforderlich. Der gewählte Kontaktweg muss ausgefüllt sein.</p>

            <section className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-5" aria-labelledby="request-summary-title">
              <h3 id="request-summary-title" className="text-lg font-black text-slate-950">Ihre Angaben vor dem Absenden</h3>

              <section className="rounded-lg border border-blue-100 bg-white p-4" aria-labelledby="request-summary-selection">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 id="request-summary-selection" className="font-black text-slate-950">Standort und Leistung</h4>
                  <button type="button" onClick={() => setStep(1)} className="min-h-11 rounded-lg px-3 text-sm font-black text-blue-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Auswahl ändern</button>
                </div>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Standort</dt><dd className="mt-1 font-semibold text-slate-900">{locationLabel(context)}</dd></div>
                  <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Leistung</dt><dd className="mt-1 font-semibold text-slate-900">{context.leadIntent.serviceLabel}</dd></div>
                </dl>
              </section>

              <section className="rounded-lg border border-blue-100 bg-white p-4" aria-labelledby="request-summary-details">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 id="request-summary-details" className="font-black text-slate-950">Ort, Route und Eckdaten</h4>
                  <button type="button" onClick={() => setStep(2)} className="min-h-11 rounded-lg px-3 text-sm font-black text-blue-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Eckdaten ändern</button>
                </div>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {importantDetails.filter(([, value]) => value).map(([label, value]) => (
                    <div key={label}><dt className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words font-semibold text-slate-900">{value}</dd></div>
                  ))}
                </dl>
              </section>

              <section className="rounded-lg border border-blue-100 bg-white p-4" aria-labelledby="request-summary-additions">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 id="request-summary-additions" className="font-black text-slate-950">Zusatzangaben, Dateien und Nachricht</h4>
                  <button type="button" onClick={() => { setOptionalOpen(true); setStep(2); }} className="min-h-11 rounded-lg px-3 text-sm font-black text-blue-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Zusatzangaben ändern</button>
                </div>
                {extras.length || files.length || message ? (
                  <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                    {extras.length ? <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Zusatzleistungen</dt><dd className="mt-1 font-semibold text-slate-900"><ul className="list-inside list-disc">{extras.map((extra) => <li key={extra}>{extra}</li>)}</ul></dd></div> : null}
                    {files.length ? <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Dateien</dt><dd className="mt-1 font-semibold text-slate-900"><ul className="list-inside list-disc">{files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>)}</ul></dd></div> : null}
                    {message ? <div className="sm:col-span-2"><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Nachricht</dt><dd className="mt-1 whitespace-pre-wrap break-words font-semibold text-slate-900">{message}</dd></div> : null}
                  </dl>
                ) : (
                  <p className="mt-3 text-sm font-semibold text-slate-600">Keine optionalen Zusatzangaben ausgewählt.</p>
                )}
                {missingOptional.length ? <p className="mt-3 text-sm font-semibold text-slate-600">{pageContent.optionalSummary}</p> : null}
              </section>

              <section className="rounded-lg border border-blue-100 bg-white p-4" aria-labelledby="request-summary-contact">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 id="request-summary-contact" className="font-black text-slate-950">Kontakt</h4>
                  <button type="button" onClick={() => document.getElementById("request-name")?.focus()} className="min-h-11 rounded-lg px-3 text-sm font-black text-blue-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Kontakt ändern</button>
                </div>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {name ? <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Name</dt><dd className="mt-1 font-semibold text-slate-900">{name}</dd></div> : null}
                  <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Bevorzugter Kontaktweg</dt><dd className="mt-1 font-semibold text-slate-900">{contactMethod === "email" ? "E-Mail" : contactMethod === "whatsapp" ? "WhatsApp" : "Telefon"}</dd></div>
                  {email ? <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">E-Mail-Adresse</dt><dd className="mt-1 break-words font-semibold text-slate-900">{email}</dd></div> : null}
                  {phone ? <div><dt className="text-xs font-black uppercase tracking-wide text-slate-500">Telefonnummer</dt><dd className="mt-1 font-semibold text-slate-900">{phone}</dd></div> : null}
                </dl>
              </section>
            </section>

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-800">
              <input
                id="request-privacy"
                name="privacyConsent"
                type="checkbox"
                checked={privacyConsent}
                onChange={(event) => setPrivacyConsent(event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0"
                aria-required="true"
                aria-invalid={Boolean(errors.privacy)}
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
                {status === "submitting" ? "Anfrage wird gesendet …" : "Unverbindliche Anfrage senden"}
              </button>
            </div>
          </div>
        ) : null}
      </form>
    </section>
  );
}
