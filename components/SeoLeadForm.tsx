"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

import {
  getBookingServiceForLead,
  leadObjectTypeOptions,
  leadServiceOptions,
  leadUrgencyOptions,
  resolveLeadIntent,
  type LeadIntent,
  type LeadService,
} from "@/lib/lead-intents";
import { appendConversionJourneyToFormData } from "@/lib/conversion-journey";

type SeoLeadFormProps = {
  initialIntent: LeadIntent;
  sourcePage?: string;
  initialOfferConcern?: string;
  initialOfferStatus?: string;
};

type FormErrors = Partial<Record<"name" | "contact" | "email" | "service" | "city" | "message" | "privacy" | "spam" | "form", string>>;

function isEmailValid(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function dispatchSeoConversionEvent(eventName: string, lead: LeadIntent, label: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("floxant:conversion-event", {
      detail: {
        event: eventName,
        source: "seo_contact_form",
        channel: "form",
        href: window.location.pathname,
        label,
        dataset: {
          event: eventName,
          source: "seo_contact_form",
          channel: "form",
          service: lead.trackingService,
          city: lead.trackingCity,
          intent: lead.trackingIntent,
          pageIntent: lead.trackingIntent,
          priority: lead.priority,
          label,
        },
      },
    }),
  );
}

function Field({
  label,
  htmlFor,
  error,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const errorId = `${htmlFor}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-black text-slate-950">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="flex gap-2 text-sm font-semibold leading-6 text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function fieldClass(hasError: boolean) {
  return [
    "min-h-12 w-full rounded-lg border bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition",
    "placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
    hasError ? "border-red-300 bg-red-50/40" : "border-slate-200",
  ].join(" ");
}

const offerStatusOptions = [
  { value: "", label: "Bitte waehlen" },
  { value: "written_offer", label: "Schriftliches Angebot liegt vor" },
  { value: "verbal_offer", label: "Nur muendliche Preisnennung" },
  { value: "multiple_offers", label: "Mehrere Angebote vergleichen" },
  { value: "no_offer_yet", label: "Noch kein Angebot" },
] as const;

const offerConcernOptions = [
  { value: "", label: "Bitte waehlen" },
  { value: "price_too_high", label: "Wirkt zu teuer" },
  { value: "scope_unclear", label: "Leistungsumfang unklar" },
  { value: "too_cheap_risky", label: "Sehr billiges Angebot wirkt riskant" },
  { value: "provider_unresponsive", label: "Anbieter reagiert nicht" },
  { value: "date_problem", label: "Termin passt nicht" },
  { value: "price_unclear", label: "Preis oder Leistungsumfang unklar" },
  { value: "addons_unclear", label: "Zusatzleistungen / Nebenkosten unklar" },
  { value: "deadline", label: "Termin oder Deadline kritisch" },
  { value: "multiple_offers", label: "Mehrere Angebote schwer vergleichbar" },
  { value: "no_offer_yet", label: "Noch kein Angebot, Orientierung gesucht" },
  { value: "alternative_needed", label: "Alternative zu bestehendem Angebot gesucht" },
  { value: "general_second_opinion", label: "Zweite Einschaetzung gewuenscht" },
] as const;

function getSuccessCopy({
  service,
  isOfferCheck,
  isB2B,
  trackingIntent,
}: {
  service: LeadService;
  isOfferCheck: boolean;
  isB2B: boolean;
  trackingIntent: string;
}) {
  const intentText = trackingIntent.toLowerCase();

  if (isOfferCheck) {
    return {
      body:
        "FLOXANT prueft Angaben, Umfang und naechste sinnvolle Schritte. Rueckfragen koennen folgen; es gibt keine Rechtsberatung und keine Preisgarantie.",
      bullets: [
        "Angebot, Umfang und offene Punkte werden sortiert.",
        "Falls Angaben fehlen, fragt FLOXANT nach.",
        "Eine Anfrage ist noch keine Buchung.",
      ],
    };
  }
  if (intentText.includes("plan-b") || intentText.includes("plan_b")) {
    return {
      body:
        "FLOXANT prueft Dringlichkeit, Ort, offene Punkte und realistische naechste Schritte. Eine Sofortzusage oder Terminbestaetigung entsteht dadurch nicht.",
      bullets: [
        "Deadline und Kontaktweg werden zuerst eingeordnet.",
        "Rueckfragen koennen folgen, wenn Angaben fehlen.",
        "Keine Sofort- oder Verfuegbarkeitsgarantie.",
      ],
    };
  }
  if (isB2B) {
    return {
      body:
        "FLOXANT ordnet Flaeche, Turnus, Reinigungszeiten und Ansprechpartner ein und meldet sich ueber den gewaehlten Kontaktweg.",
      bullets: [
        "Objektart, Flaeche und Turnus helfen besonders.",
        "Bestehende Angebote koennen spaeter ergaenzt werden.",
        "Eine Anfrage ist noch keine Beauftragung.",
      ],
    };
  }
  if (service === "klaviertransport") {
    return {
      body:
        "FLOXANT prueft Etage, Zugang, Instrumentart, Termin und Fotos, bevor ein Transportweg sinnvoll eingeordnet werden kann.",
      bullets: [
        "Start, Ziel und Zugang sind besonders wichtig.",
        "Fotos helfen, sind aber nicht zwingend im ersten Schritt.",
        "Eine Anfrage ist noch keine Buchung.",
      ],
    };
  }
  if (service === "umzug" || service === "fernumzug" || service === "seniorenumzug") {
    return {
      body:
        "FLOXANT prueft Start, Ziel, Etage, Menge, Termin und besondere Stuecke, bevor ein naechster Schritt vorgeschlagen wird.",
      bullets: [
        "Start/Ziel und Zugang sind besonders wichtig.",
        "Fotos oder grobe Menge koennen spaeter ergaenzt werden.",
        "Eine Anfrage ist noch keine Buchung.",
      ],
    };
  }
  if (service === "entruempelung" || service === "wohnungsaufloesung") {
    return {
      body:
        "FLOXANT prueft Raeume, Menge, Zugang, Entsorgung, Zielzustand und Fotos, damit die Raeumung besser einordenbar wird.",
      bullets: [
        "Menge, Zugang und Zielzustand sind wichtig.",
        "Fotos helfen, sind aber nicht zwingend im ersten Schritt.",
        "Eine Anfrage ist noch keine Buchung.",
      ],
    };
  }
  if (service === "diskret-service" || service === "private-client") {
    return {
      body:
        "FLOXANT beruecksichtigt den bevorzugten Kontaktweg soweit moeglich. Private Details muessen nicht oeffentlich oder ausfuehrlich im Formular stehen.",
      bullets: [
        "Ort, Zeitraum und grober Umfang reichen fuer den Start.",
        "Rueckfragen koennen diskret erfolgen.",
        "Keine Rechtsberatung, keine Sicherheitsdienstleistung.",
      ],
    };
  }
  return {
    body:
      "FLOXANT prueft Flaeche, Objektart, Termin, Zugang und Fotos und meldet sich ueber die angegebene Kontaktmoeglichkeit.",
    bullets: [
      "Flaeche, Objektart und Termin helfen besonders.",
      "Fotos koennen spaeter ergaenzt werden.",
      "Eine Anfrage ist noch keine Buchung.",
    ],
  };
}

export function SeoLeadForm({
  initialIntent,
  sourcePage = "/kontakt",
  initialOfferConcern = "",
  initialOfferStatus = "",
}: SeoLeadFormProps) {
  const initialService = initialIntent.service === "kontakt" ? "reinigung" : initialIntent.service;
  const initialCityInput = initialIntent.cityLabel || "";
  const [service, setService] = useState<LeadService>(initialService);
  const [city, setCity] = useState(initialCityInput);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [objectType, setObjectType] = useState("wohnung");
  const [urgency, setUrgency] = useState("flexibel");
  const [scope, setScope] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [offerStatus, setOfferStatus] = useState(initialOfferStatus);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerConcern, setOfferConcern] = useState(initialOfferConcern);
  const [contactMethod, setContactMethod] = useState("auto");
  const [areaSize, setAreaSize] = useState("");
  const [cleaningFrequency, setCleaningFrequency] = useState("");
  const [preferredCleaningTime, setPreferredCleaningTime] = useState("");
  const [contactPersonRole, setContactPersonRole] = useState("");
  const [serviceScope, setServiceScope] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const lead = useMemo(
    () => {
      const trimmedCity = city.trim();
      const cityStillInitial =
        !trimmedCity || trimmedCity.toLowerCase() === initialCityInput.trim().toLowerCase();
      const serviceStillInitial = service === initialService;

      return resolveLeadIntent({
        service,
        city: trimmedCity || initialIntent.city,
        intent: serviceStillInitial && cityStillInitial ? initialIntent.intent : undefined,
        priority: initialIntent.priority,
      });
    },
    [city, initialCityInput, initialIntent.city, initialIntent.intent, initialIntent.priority, initialService, service],
  );
  const isB2B = service === "bueroreinigung" || service === "gewerbereinigung";
  const isOfferCheck = service === "angebot-pruefen" || lead.trackingIntent.includes("angebot");
  const resolvedContactMethod = contactMethod === "auto" ? (phone.trim() ? "phone" : "email") : contactMethod;

  function validate() {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedCity = city.trim();
    const trimmedMessage = message.trim();

    if (honeypot.trim()) nextErrors.spam = "Die Anfrage wurde nicht gesendet. Bitte laden Sie die Seite neu.";
    if (Date.now() - startedAt < 2500) {
      nextErrors.spam = "Bitte pruefen Sie die Angaben kurz und senden Sie die Anfrage danach erneut.";
    }
    if (trimmedName.length < 2) nextErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!trimmedEmail && !trimmedPhone) nextErrors.contact = "Bitte E-Mail oder Telefon angeben.";
    if (trimmedEmail && !isEmailValid(trimmedEmail)) nextErrors.email = "Bitte eine gueltige E-Mail-Adresse eintragen.";
    if (trimmedPhone && trimmedPhone.length < 6) nextErrors.contact = "Die Telefonnummer ist zu kurz.";
    if (!service) nextErrors.service = "Bitte eine Leistung auswaehlen.";
    if (!trimmedCity) nextErrors.city = "Bitte Ort oder Einsatzgebiet eintragen.";
    if (trimmedMessage.length < 10) nextErrors.message = "Bitte beschreiben Sie den Bedarf in einem kurzen Satz.";
    if (!privacyConsent) nextErrors.privacy = "Bitte bestaetigen Sie den Datenschutz-Hinweis.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    if (!validate()) {
      dispatchSeoConversionEvent("seo_lead_submit_error", lead, "Validierung fehlgeschlagen");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrors({});
    const now = new Date().toISOString();
    const bookingService = getBookingServiceForLead(service);
    const landingPage = typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : sourcePage;
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    const details = {
      contact: {
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        callbackPreference: phone.trim() ? "rueckruf_moeglich" : "email",
        notes: message.trim(),
      },
      service: {
        type: bookingService,
        source: "seo_quick_lead_form",
        entryPoint: "/kontakt",
        presetFromUrl: service,
        regionPreset: lead.trackingCity,
      },
      valuation: {
        systemPriceRangeMin: 0,
        systemPriceRangeMax: 0,
        priceRangeMin: 0,
        priceRangeMax: 0,
        valuationLabel: "SEO-Anfrage mit kurzer Vorqualifizierung",
        valuationStage: "Anfrage wird geprueft",
        accuracyState: "Kurzer Lead mit kaufnahen Eckdaten",
        topDrivers: [
          `Leistung: ${lead.serviceLabel}`,
          `Ort: ${city.trim()}`,
          objectType ? `Objekt: ${objectType}` : "",
          urgency ? `Dringlichkeit: ${urgency}` : "",
          isOfferCheck && offerStatus ? `Angebotsstatus: ${offerStatus}` : "",
          isOfferCheck && offerAmount.trim() ? "Angebotspreis genannt" : "",
          isOfferCheck && offerConcern ? `Pruefgrund: ${offerConcern}` : "",
          scope.trim() ? "Umfang genannt" : "",
          desiredDate ? "Wunschtermin vorhanden" : "",
          isB2B && companyName.trim() ? "Firma genannt" : "",
        ].filter(Boolean),
        priceExplanation:
          "Diese SEO-Anfrage enthaelt die wichtigsten Angaben fuer eine erste fachliche Rueckmeldung. FLOXANT macht daraus keine automatische Preiszusage.",
        pricingSignals: {
          inquiryMode: "seo_quick_lead",
          serviceType: service,
          bookingService,
          city: city.trim(),
          intent: lead.trackingIntent,
          priority: lead.priority,
          objectType,
          urgency,
          desiredDate,
          scopeSummary: scope.trim(),
          offerStatus: isOfferCheck ? offerStatus : "",
          existingOffer: Boolean(isOfferCheck && offerStatus && offerStatus !== "no_offer_yet"),
          offerAmountText: isOfferCheck ? offerAmount.trim() : "",
          offerConcern: isOfferCheck ? offerConcern : "",
          companyName: isB2B ? companyName.trim() : "",
          areaSize: isB2B ? areaSize.trim() : "",
          cleaningFrequency: isB2B ? cleaningFrequency : "",
          preferredCleaningTime: isB2B ? preferredCleaningTime.trim() : "",
          contactPersonRole: isB2B ? contactPersonRole.trim() : "",
          serviceScope: isB2B ? serviceScope.trim() : "",
          contactMethod: resolvedContactMethod,
          preferredContactMethod: resolvedContactMethod,
          privacyConsent,
          isSensitiveCase: service === "diskret-service" || service === "private-client",
          sourcePage,
          landingPage,
          referrer,
        },
      },
      configuration: {
        requestContext: "seo_quick_lead",
        leadType: "seo_quick_lead",
        sourcePage,
        landingPage,
        referrer,
        service,
        bookingService,
        serviceLabel: lead.serviceLabel,
        city: city.trim(),
        citySlug: lead.trackingCity,
        intent: lead.trackingIntent,
        priority: lead.priority,
        objectType,
        urgency,
        desiredDate,
        deadline: desiredDate,
        scopeSummary: scope.trim(),
        offerStatus: isOfferCheck ? offerStatus : "",
        existingOffer: Boolean(isOfferCheck && offerStatus && offerStatus !== "no_offer_yet"),
        offerAmountText: isOfferCheck ? offerAmount.trim() : "",
        offerConcern: isOfferCheck ? offerConcern : "",
        serviceCategory: isOfferCheck ? "angebot_pruefen" : service,
        contactMethod: resolvedContactMethod,
        preferredContactMethod: resolvedContactMethod,
        privacyConsent,
        privacyNoticeShown: true,
        companyName: isB2B ? companyName.trim() : "",
        areaSize: isB2B ? areaSize.trim() : "",
        cleaningFrequency: isB2B ? cleaningFrequency : "",
        preferredCleaningTime: isB2B ? preferredCleaningTime.trim() : "",
        contactPersonRole: isB2B ? contactPersonRole.trim() : "",
        serviceScope: isB2B ? serviceScope.trim() : "",
        pageType: "contact",
        funnelStage: isOfferCheck ? "offer_check" : isB2B ? "b2b_lead" : "lead",
        ctaLabel: "Anfrage senden",
        isSensitiveCase: service === "diskret-service" || service === "private-client",
        message: message.trim(),
        formStartedAt: startedAt,
        submittedAt: now,
      },
      metadata: {
        createdAt: now,
        intakeVersion: "seo-lead-1.0.0",
        source: "seo_quick_lead_form",
        servicePresetFromUrl: service,
        regionPreset: lead.trackingCity,
        clientContext: {
          leadSource: "seo",
          leadType: "seo_quick_lead",
          sourceComponent: "SeoLeadForm",
          sourcePage,
          landingPage,
          referrer,
          service,
          city: city.trim(),
          intent: lead.trackingIntent,
          priority: lead.priority,
          offerStatus: isOfferCheck ? offerStatus : "",
          offerConcern: isOfferCheck ? offerConcern : "",
          contactMethod: resolvedContactMethod,
          preferredContactMethod: resolvedContactMethod,
          pageType: "contact",
          funnelStage: isOfferCheck ? "offer_check" : isB2B ? "b2b_lead" : "lead",
          ctaLabel: "Anfrage senden",
        },
      },
    };

    const payload = new FormData();
    payload.set("type", "booking_wizard");
    payload.set("lead_type", "seo_quick_lead");
    payload.set("leadSource", "seo_quick_lead_form");
    payload.set("source", "seo");
    payload.set("sourceComponent", "SeoLeadForm");
    payload.set("sourceContext", lead.trackingIntent);
    payload.set("sourcePage", sourcePage);
    payload.set("landingPage", landingPage);
    payload.set("referrer", referrer);
    payload.set("service", bookingService);
    payload.set("serviceCategory", isOfferCheck ? "angebot_pruefen" : service);
    payload.set("intent", lead.trackingIntent);
    payload.set("contactMethod", resolvedContactMethod);
    payload.set("preferredContactMethod", resolvedContactMethod);
    payload.set("name", name.trim());
    payload.set("email", email.trim());
    payload.set("phone", phone.trim());
    payload.set("cityOrZip", city.trim());
    payload.set("objectType", objectType);
    payload.set("urgency", urgency);
    payload.set("desiredDate", desiredDate);
    payload.set("deadline", desiredDate);
    payload.set("offerStatus", isOfferCheck ? offerStatus : "");
    payload.set("existingOffer", isOfferCheck && offerStatus && offerStatus !== "no_offer_yet" ? "true" : "false");
    payload.set("offerAmount", isOfferCheck ? offerAmount.trim() : "");
    payload.set("offerConcern", isOfferCheck ? offerConcern : "");
    payload.set("company", isB2B ? companyName.trim() : "");
    payload.set("companyName", isB2B ? companyName.trim() : "");
    payload.set("areaSize", isB2B ? areaSize.trim() : "");
    payload.set("cleaningFrequency", isB2B ? cleaningFrequency : "");
    payload.set("preferredCleaningTime", isB2B ? preferredCleaningTime.trim() : "");
    payload.set("contactPersonRole", isB2B ? contactPersonRole.trim() : "");
    payload.set("serviceScope", isB2B ? serviceScope.trim() : "");
    payload.set("scope", scope.trim());
    payload.set("message", message.trim());
    payload.set("pageType", "contact");
    payload.set("funnelStage", isOfferCheck ? "offer_check" : isB2B ? "b2b_lead" : "lead");
    payload.set("ctaLabel", "Anfrage senden");
    payload.set("privacyConsent", privacyConsent ? "true" : "false");
    payload.set("isSensitiveCase", service === "diskret-service" || service === "private-client" ? "true" : "false");
    payload.set("timestamp", now);
    payload.set("formStartedAt", String(startedAt));
    payload.set("companyWebsite", honeypot);
    payload.set("details", JSON.stringify(details));
    appendConversionJourneyToFormData(payload);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: payload,
      });

      let responsePayload: any = null;
      try {
        responsePayload = await response.json();
      } catch {
        responsePayload = null;
      }

      if (!response.ok || responsePayload?.success === false) {
        throw new Error(responsePayload?.message || responsePayload?.error || "Die Anfrage konnte nicht gesendet werden.");
      }

      dispatchSeoConversionEvent("seo_lead_submit_success", lead, "SEO-Anfrage erfolgreich gesendet");
      setStatus("success");
    } catch (error) {
      dispatchSeoConversionEvent("seo_lead_submit_error", lead, "SEO-Anfrage Fehler");
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp.",
      });
      setStatus("error");
    }
  }

  if (status === "success") {
    const successCopy = getSuccessCopy({ service, isOfferCheck, isB2B, trackingIntent: lead.trackingIntent });
    return (
      <div
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 shadow-sm shadow-slate-950/5"
        data-event="seo_lead_submit_success"
        data-service={lead.trackingService}
        data-city={lead.trackingCity}
        data-page-intent={lead.trackingIntent}
        data-priority={lead.priority}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-emerald-700">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-2xl font-black tracking-tight">Anfrage erhalten</h2>
        <p className="mt-3 text-sm font-semibold leading-7">
          {successCopy.body}
        </p>
        <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6">
          {successCopy.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
            setScope("");
          }}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-300 bg-white px-5 text-sm font-black text-emerald-900 transition hover:bg-emerald-100"
        >
          Weitere Anfrage vorbereiten
        </button>
      </div>
    );
  }

  return (
    <div
      data-event="seo_contact_form_view"
      data-source="seo_contact_form"
      data-service={lead.trackingService}
      data-city={lead.trackingCity}
      data-page-intent={lead.trackingIntent}
      data-priority={lead.priority}
    >
      <form
        id="direktanfrage"
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-sm shadow-slate-950/5 sm:p-6"
        data-event="seo_lead_submit_attempt"
        data-source="seo_contact_form"
        data-contact-channel="form"
        data-service={lead.trackingService}
        data-city={lead.trackingCity}
        data-intent={lead.trackingIntent}
        data-page-intent={lead.trackingIntent}
        data-priority={lead.priority}
        data-track-submit="attempt"
        noValidate
      >
      <div>
        <div className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
          Schnelle Anfrage
        </div>
        <h2 className="mt-2 text-2xl font-black tracking-tight">{lead.suggestedFormTitle}</h2>
        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{lead.suggestedFormIntro}</p>
      </div>

      <input
        type="text"
        name="companyWebsite"
        aria-label="Bitte leer lassen"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="formStartedAt" value={startedAt} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="seo-lead-name" required error={errors.name}>
          <input
            id="seo-lead-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass(Boolean(errors.name))}
            aria-describedby={errors.name ? "seo-lead-name-error" : undefined}
            autoComplete="name"
            placeholder="Ihr Name"
          />
        </Field>

        <Field label="Leistung" htmlFor="seo-lead-service" required error={errors.service}>
          <select
            id="seo-lead-service"
            name="servicePreset"
            value={service}
            onChange={(event) => setService(event.target.value as LeadService)}
            className={fieldClass(Boolean(errors.service))}
            aria-describedby={errors.service ? "seo-lead-service-error" : undefined}
          >
            {leadServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="E-Mail" htmlFor="seo-lead-email" error={errors.email || errors.contact}>
          <input
            id="seo-lead-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass(Boolean(errors.email || errors.contact))}
            aria-describedby={errors.email || errors.contact ? "seo-lead-email-error" : undefined}
            autoComplete="email"
            placeholder="name@beispiel.de"
          />
        </Field>

        <Field label="Telefon" htmlFor="seo-lead-phone" error={errors.contact}>
          <input
            id="seo-lead-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass(Boolean(errors.contact))}
            aria-describedby={errors.contact ? "seo-lead-phone-error" : undefined}
            autoComplete="tel"
            placeholder="+49 ..."
          />
        </Field>
      </div>

      <Field label="Bevorzugter Kontaktweg" htmlFor="seo-lead-contact-method">
        <select
          id="seo-lead-contact-method"
          name="contactMethodPreference"
          value={contactMethod}
          onChange={(event) => setContactMethod(event.target.value)}
          className={fieldClass(false)}
        >
          <option value="auto">automatisch nach Angabe</option>
          <option value="phone">Rueckruf bevorzugt</option>
          <option value="email">E-Mail bevorzugt</option>
          <option value="whatsapp">WhatsApp moeglich</option>
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ort" htmlFor="seo-lead-city" required error={errors.city}>
          <input
            id="seo-lead-city"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={fieldClass(Boolean(errors.city))}
            aria-describedby={errors.city ? "seo-lead-city-error" : undefined}
            autoComplete="address-level2"
            placeholder="Ort oder Einsatzgebiet"
          />
        </Field>

        <Field label="Objektart" htmlFor="seo-lead-object-type">
          <select
            id="seo-lead-object-type"
            name="objectType"
            value={objectType}
            onChange={(event) => setObjectType(event.target.value)}
            className={fieldClass(false)}
          >
            {leadObjectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {isB2B ? (
        <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          <Field label="Firma" htmlFor="seo-lead-company">
            <input
              id="seo-lead-company"
              name="companyName"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className={fieldClass(false)}
              autoComplete="organization"
              placeholder="Firma optional"
            />
          </Field>
          <Field label="Flaeche / Raeume" htmlFor="seo-lead-area-size">
            <input
              id="seo-lead-area-size"
              name="areaSize"
              value={areaSize}
              onChange={(event) => setAreaSize(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. 180 m2, 6 Raeume"
            />
          </Field>
          <Field label="Turnus" htmlFor="seo-lead-cleaning-frequency">
            <select
              id="seo-lead-cleaning-frequency"
              name="cleaningFrequency"
              value={cleaningFrequency}
              onChange={(event) => setCleaningFrequency(event.target.value)}
              className={fieldClass(false)}
            >
              <option value="">noch offen</option>
              <option value="einmalig">einmalig</option>
              <option value="woechentlich">woechentlich</option>
              <option value="mehrmals-pro-woche">mehrmals pro Woche</option>
              <option value="monatlich">monatlich</option>
              <option value="nach-bedarf">nach Bedarf</option>
            </select>
          </Field>
          <Field label="Gewuenschte Zeit" htmlFor="seo-lead-cleaning-time">
            <input
              id="seo-lead-cleaning-time"
              name="preferredCleaningTime"
              value={preferredCleaningTime}
              onChange={(event) => setPreferredCleaningTime(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. morgens, abends, nach Betrieb"
            />
          </Field>
          <Field label="Rolle" htmlFor="seo-lead-contact-role">
            <input
              id="seo-lead-contact-role"
              name="contactPersonRole"
              value={contactPersonRole}
              onChange={(event) => setContactPersonRole(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Office, Verwaltung, Inhaber"
            />
          </Field>
          <Field label="Leistungsumfang" htmlFor="seo-lead-service-scope">
            <input
              id="seo-lead-service-scope"
              name="serviceScope"
              value={serviceScope}
              onChange={(event) => setServiceScope(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Sanitär, Boeden, Kueche"
            />
          </Field>
          <p className="sm:col-span-2 text-xs font-semibold leading-5 text-slate-600">
            Fuer Unternehmen helfen Flaeche, Turnus und gewuenschte Reinigungszeiten bei der ersten Einordnung. Eine Anfrage ist noch keine Beauftragung.
          </p>
        </div>
      ) : null}

      {isOfferCheck ? (
        <div className="grid gap-4 rounded-lg border border-blue-100 bg-blue-50/50 p-4 sm:grid-cols-3">
          <Field label="Bestehendes Angebot" htmlFor="seo-lead-offer-status">
            <select
              id="seo-lead-offer-status"
              name="offerStatus"
              value={offerStatus}
              onChange={(event) => setOfferStatus(event.target.value)}
              className={fieldClass(false)}
            >
              {offerStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Bisheriger Preis" htmlFor="seo-lead-offer-amount">
            <input
              id="seo-lead-offer-amount"
              name="offerAmount"
              value={offerAmount}
              onChange={(event) => setOfferAmount(event.target.value)}
              className={fieldClass(false)}
              inputMode="decimal"
              placeholder="optional, z. B. 950 EUR"
            />
          </Field>
          <Field label="Pruefgrund" htmlFor="seo-lead-offer-concern">
            <select
              id="seo-lead-offer-concern"
              name="offerConcern"
              value={offerConcern}
              onChange={(event) => setOfferConcern(event.target.value)}
              className={fieldClass(false)}
            >
              {offerConcernOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Wunschtermin" htmlFor="seo-lead-date">
          <input
            id="seo-lead-date"
            name="desiredDate"
            type="date"
            value={desiredDate}
            onChange={(event) => setDesiredDate(event.target.value)}
            className={fieldClass(false)}
          />
        </Field>
        <Field label="Dringlichkeit" htmlFor="seo-lead-urgency">
          <select
            id="seo-lead-urgency"
            name="urgency"
            value={urgency}
            onChange={(event) => setUrgency(event.target.value)}
            className={`${fieldClass(false)} sm:col-span-2`}
          >
            {leadUrgencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Umfang" htmlFor="seo-lead-scope">
          <input
            id="seo-lead-scope"
            name="scope"
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className={fieldClass(false)}
            placeholder="z. B. 80 m2, 2 Zimmer, 20 m3"
          />
        </Field>
      </div>

      <Field label="Nachricht / Beschreibung" htmlFor="seo-lead-message" required error={errors.message}>
        <textarea
          id="seo-lead-message"
          name="message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClass(Boolean(errors.message))} min-h-28 resize-y py-3`}
          aria-describedby={errors.message ? "seo-lead-message-error" : undefined}
          placeholder={lead.defaultMessagePlaceholder}
        />
      </Field>

      <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold leading-6 text-slate-600">
        Datenschutz: Eine Anfrage ist noch keine Buchung. Bitte keine Zugangscodes, Ausweisdaten oder Zahlungsdaten senden. Adresse und Fotos koennen spaeter ergaenzt werden.
      </p>

      <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
        <input
          name="privacyConsent"
          type="checkbox"
          checked={privacyConsent}
          onChange={(event) => setPrivacyConsent(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700"
        />
        <span>
          Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung dieser Anfrage verarbeitet.
        </span>
      </label>
      {errors.privacy ? (
        <p className="flex gap-2 text-sm font-semibold leading-6 text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {errors.privacy}
        </p>
      ) : null}

      {errors.spam || errors.form ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-800"
          data-event="seo_lead_submit_error"
          data-service={lead.trackingService}
          data-city={lead.trackingCity}
          data-page-intent={lead.trackingIntent}
          data-priority={lead.priority}
        >
          {errors.spam || errors.form}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-label="SEO-Anfrage senden"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-black text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-400"
        data-event="seo_lead_submit_attempt"
        data-service={lead.trackingService}
        data-city={lead.trackingCity}
        data-page-intent={lead.trackingIntent}
        data-priority={lead.priority}
      >
        {status === "submitting" ? "Wird gesendet..." : "Anfrage senden"}
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
      </form>
    </div>
  );
}
