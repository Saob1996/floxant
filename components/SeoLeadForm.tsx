"use client";

import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";

import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
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
import { germanText, germanizeDeep } from "@/lib/german-text";
import { getCustomerFacingErrorMessage } from "@/lib/customer-labels";
import { buildRequestSummaryPayload } from "@/lib/missing-info";
import { getLeadReplyTemplateForServiceKey } from "@/lib/lead-reply-templates";
import { getMissingInfoQuestionsForServiceKey } from "@/lib/missing-info-questions";
import { validateRequestContact } from "@/lib/booking/request-service-policy.js";

type SeoLeadFormProps = {
  initialIntent: LeadIntent;
  sourcePage?: string;
  initialOfferConcern?: string;
  initialOfferStatus?: string;
  initiallyNeutral?: boolean;
  displayHeading?: string;
  displayIntro?: string;
  trackingSource?: string;
};

type FormErrors = Partial<Record<"name" | "contact" | "email" | "phone" | "contactMethod" | "service" | "city" | "message" | "privacy" | "spam" | "form", string>>;

function createSeoLeadIdempotencyKey() {
  return `seo_lead:${Date.now()}:${globalThis.crypto.randomUUID()}`;
}

function isSolarPvService(service: string) {
  return service === "solarreinigung" || service === "pv-anlagen-reinigung";
}

const selectableLeadServiceOptions = leadServiceOptions.filter(
  (option) => !isSolarPvService(option.value),
);

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
  const visibleLabel = germanText(label, label);
  const visibleError = error ? germanText(error, error) : "";

  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-black text-slate-950">
        {visibleLabel}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>
      {children}
      {visibleError ? (
        <p id={errorId} className="flex gap-2 text-sm font-semibold leading-6 text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {visibleError}
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
  { value: "", label: "Bitte wählen" },
  { value: "written_offer", label: "Schriftliches Angebot liegt vor" },
  { value: "verbal_offer", label: "Nur mündliche Preisnennung" },
  { value: "multiple_offers", label: "Mehrere Angebote vergleichen" },
  { value: "no_offer_yet", label: "Noch kein Angebot" },
] as const;

const offerConcernOptions = [
  { value: "", label: "Bitte wählen" },
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
  { value: "general_second_opinion", label: "Zweite Einschätzung gewünscht" },
] as const;

const b2bSpecialAreaOptions = [
  { value: "kueche", label: "Küche" },
  { value: "sanitaer", label: "Sanitär" },
  { value: "empfang", label: "Empfang" },
  { value: "besprechungsraeume", label: "Besprechungsräume" },
  { value: "lager-gewerbeflaeche", label: "Lager/Gewerbefläche" },
  { value: "praxisraeume", label: "Praxisräume" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const propertyCleaningRoleOptions = [
  { value: "", label: "noch offen" },
  { value: "hausverwaltung", label: "Hausverwaltung" },
  { value: "vermieter", label: "Vermieter" },
  { value: "eigentuemergemeinschaft", label: "Eigentümergemeinschaft" },
  { value: "unternehmen", label: "Unternehmen" },
  { value: "privat", label: "Privat" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const propertyCleaningObjectTypeOptions = [
  { value: "", label: "noch offen" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
  { value: "wohnanlage", label: "Wohnanlage" },
  { value: "gewerbeobjekt", label: "Gewerbeobjekt" },
  { value: "buerogebaeude", label: "Bürogebäude" },
  { value: "praxis-gewerbeflaeche", label: "Praxis/Gewerbefläche" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const propertyCleaningAreaOptions = [
  { value: "treppenhaus", label: "Treppenhaus" },
  { value: "eingangsbereich", label: "Eingangsbereich" },
  { value: "keller-garage", label: "Keller/Garage" },
  { value: "aufzug", label: "Aufzug" },
  { value: "gemeinschaftsflaechen", label: "Gemeinschaftsflächen" },
  { value: "buero-gewerbeflaeche", label: "Büro/Gewerbefläche" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const propertyCleaningFrequencyOptions = [
  { value: "", label: "noch offen" },
  { value: "einmalig", label: "einmalig" },
  { value: "woechentlich", label: "wöchentlich" },
  { value: "vierzehntaegig", label: "14-tägig" },
  { value: "monatlich", label: "monatlich" },
  { value: "unklar", label: "noch unklar" },
] as const;

const propertyCleaningYesNoOptions = [
  { value: "", label: "noch offen" },
  { value: "ja", label: "Ja" },
  { value: "nein", label: "Nein" },
  { value: "unklar", label: "Unklar / mehrere Angebote" },
] as const;

const solarObjectTypeOptions = [
  { value: "", label: "noch offen" },
  { value: "privat", label: "Privat" },
  { value: "gewerbe", label: "Gewerbe" },
  { value: "hausverwaltung", label: "Hausverwaltung" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const pianoInstrumentOptions = [
  { value: "", label: "noch offen" },
  { value: "klavier", label: "Klavier" },
  { value: "e-piano", label: "E-Piano" },
  { value: "fluegel-pruefen", label: "Flügel, nur nach Prüfung" },
  { value: "schweres-einzelstueck", label: "Sonstiges schweres Stück" },
] as const;

const pianoAccessOptions = [
  { value: "", label: "noch offen" },
  { value: "ja", label: "Ja" },
  { value: "nein", label: "Nein" },
  { value: "unklar", label: "Unklar" },
] as const;

const pianoConcernOptions = [
  { value: "", label: "noch offen" },
  { value: "zugang-unklar", label: "Zugang unklar" },
  { value: "angebot-teuer", label: "Angebot wirkt teuer" },
  { value: "termin-unklar", label: "Termin unklar" },
  { value: "anbieter-abgesagt", label: "Anbieter abgesagt" },
  { value: "treppe-schwierig", label: "Treppe schwierig" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const seniorRequesterRoleOptions = [
  { value: "", label: "noch offen" },
  { value: "selbst", label: "selbst" },
  { value: "angehoerige", label: "Angehörige" },
  { value: "betreuung-organisation", label: "Betreuung / Organisation" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const seniorScopeOptions = [
  { value: "", label: "noch offen" },
  { value: "wenige-moebel", label: "wenige Möbel" },
  { value: "komplette-wohnung", label: "komplette Wohnung" },
  { value: "mit-keller-garage", label: "mit Keller/Garage" },
  { value: "unklar", label: "unklar" },
] as const;

const seniorYesNoOptions = [
  { value: "", label: "noch offen" },
  { value: "ja", label: "Ja" },
  { value: "nein", label: "Nein" },
  { value: "unklar", label: "Unklar" },
] as const;

const seniorExtraNeedOptions = [
  { value: "entruempelung", label: "Entrümpelung" },
  { value: "reinigung", label: "Reinigung" },
  { value: "wohnungsaufloesung", label: "Wohnungsauflösung" },
  { value: "objektbrief", label: "Objektbrief" },
  { value: "uebergabe", label: "Übergabe" },
  { value: "diskret-service", label: "Diskret-Service" },
] as const;

const handoverSituationOptions = [
  { value: "", label: "noch offen" },
  { value: "auszug", label: "Auszug / Wohnungswechsel" },
  { value: "nach-entruempelung", label: "nach Entrümpelung" },
  { value: "vermieter-ready", label: "Vermieter-Ready" },
  { value: "verwaltung-uebergabe", label: "Übergabe an Verwaltung" },
  { value: "besichtigung-nachnutzung", label: "Besichtigung / Nachnutzung" },
] as const;

const handoverConditionOptions = [
  { value: "", label: "noch offen" },
  { value: "leer-besenrein", label: "leer / besenrein" },
  { value: "sichtbar-verschmutzt", label: "sichtbar verschmutzt" },
  { value: "restmengen", label: "Restmengen vorhanden" },
  { value: "nach-raeumung", label: "nach Räumung" },
  { value: "fotos-vorhanden", label: "Fotos vorhanden" },
] as const;

const handoverExtraNeedOptions = [
  { value: "objektbrief", label: "Objektbrief" },
  { value: "uebergabeakte", label: "Übergabeakte" },
  { value: "uebergabe-sprint", label: "Übergabe-Sprint" },
  { value: "vermieter-ready-service", label: "Vermieter-Ready-Service" },
  { value: "angebot-pruefen", label: "Angebot prüfen" },
  { value: "entruempelung", label: "Restmengen / Entrümpelung" },
] as const;

function getSuccessCopy({
  service,
  isOfferCheck,
  isB2B,
  isSolarPv,
  isPianoTransport,
  isSeniorMove,
  isHandoverCleaningFlow,
  isPropertyCleaningFlow,
  trackingIntent,
}: {
  service: LeadService;
  isOfferCheck: boolean;
  isB2B: boolean;
  isSolarPv: boolean;
  isPianoTransport: boolean;
  isSeniorMove: boolean;
  isHandoverCleaningFlow: boolean;
  isPropertyCleaningFlow: boolean;
  trackingIntent: string;
}) {
  const intentText = trackingIntent.toLowerCase();

  if (isPropertyCleaningFlow) {
    return {
      body:
        "Ihre Anfrage zur Reinigung für Hausverwaltungen wurde gesendet. Wir prüfen Objektart, Bereiche, Turnus, Zugang und Leistungsumfang. Falls Angaben fehlen, melden wir uns über Ihre gewählte Kontaktmöglichkeit. Eine Verfügbarkeit oder ein Preis wird nicht garantiert.",
      bullets: [
        "Objektart, Bereiche, Turnus, Zugang und Ansprechpartner helfen besonders.",
        "Ein vorhandenes Reinigungsangebot kann zur Einordnung ergänzt werden.",
        "Keine Rechtsberatung, keine Preisgarantie und keine Soforttermin-Zusage.",
      ],
    };
  }

  if (isHandoverCleaningFlow) {
    return {
      body:
        "Ihre Anfrage zur Endreinigung oder Übergabevorbereitung wurde gesendet. Wir prüfen Fläche, Zustand, Frist, Restmengen, Fotos und mögliche Ergänzungen wie Objektbrief oder Übergabeakte. Eine Abnahme, Kautionsrückzahlung, Preis- oder Sofortterminzusage wird nicht garantiert.",
      bullets: [
        "Fotos von Küche, Bad, Böden, Restmengen und Zugang helfen besonders.",
        "Objektbrief, Übergabeakte, Übergabe-Sprint oder Angebotsprüfung können optional ergänzt werden.",
        "Eine Anfrage ist noch keine Buchung und keine rechtliche Übergabebewertung.",
      ],
    };
  }

  if (isPianoTransport) {
    return {
      body:
        "Ihre Anfrage zum Klaviertransport wurde gesendet. Wir prüfen Instrumentart, Start, Ziel, Etage, Zugang und Terminwunsch. Falls Angaben fehlen, melden wir uns über Ihre gewählte Kontaktmöglichkeit. Eine Verfügbarkeit oder ein Preis wird nicht garantiert.",
      bullets: [
        "Instrumentart, Start, Ziel, Etage und Zugang helfen besonders.",
        "Fotos oder ein vorhandenes Angebot können später ergänzt werden.",
        "Keine Preis-, Soforttermin- oder Verfügbarkeitsgarantie.",
      ],
    };
  }

  if (isSolarPv) {
    return {
      body:
        "Ihre Anfrage zur Solar- oder PV-Anlagen-Reinigung wurde gesendet. Wir prüfen Dachart, Zugang, Modulfläche und sichtbare Verschmutzung. Falls Angaben fehlen, melden wir uns über Ihre gewählte Kontaktmöglichkeit. Eine Ertragssteigerung oder Verfügbarkeit wird nicht garantiert.",
      bullets: [
        "Dachart, Zugang, Modulfläche und Fotos helfen besonders.",
        "Ein vorhandenes Angebot kann zur Einordnung ergänzt werden.",
        "Keine Ertrags-, Preis- oder Soforttermin-Garantie.",
      ],
    };
  }

  if (isB2B) {
    return {
      body:
        "Ihre Anfrage zur Büro- oder Gewerbereinigung wurde gesendet. Wir prüfen Fläche, Turnus, Reinigungszeiten und Leistungsumfang. Falls Angaben fehlen, melden wir uns über Ihre gewählte Kontaktmöglichkeit.",
      bullets: [
        "Objektart, Fläche, Turnus und Reinigungszeiten helfen besonders.",
        "Ein vorhandenes Angebot kann zur Einordnung ergänzt werden.",
        "Eine Anfrage ist noch keine Beauftragung.",
      ],
    };
  }
  if (isSeniorMove) {
    return {
      body:
        "Ihre Anfrage zum Seniorenumzug wurde gesendet. Wir prüfen Start, Ziel, Umfang, Termin und gewünschte Zusatzleistungen. Falls Angaben fehlen, melden wir uns über Ihre gewählte Kontaktmöglichkeit. Eine Verfügbarkeit oder ein Preis wird nicht garantiert.",
      bullets: [
        "Start, Ziel, Etage, Umfang und Termin helfen besonders.",
        "Entrümpelung, Reinigung, Übergabe oder Diskret-Service können nach Bedarf ergänzt werden.",
        "Eine Anfrage ist noch keine Buchung, kein Preis und keine Soforttermin-Zusage.",
      ],
    };
  }
  if (isOfferCheck) {
    return {
      body:
        "Wir prüfen das Angebot, den Leistungsumfang und Ihre offenen Fragen. Rückfragen können folgen; es gibt keine Rechtsberatung, keine Preisgarantie und keine Ersparnisgarantie.",
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
        "FLOXANT prüft Dringlichkeit, Ort, offene Punkte und realistische nächste Schritte. Eine Sofortzusage oder Terminbestätigung entsteht dadurch nicht.",
      bullets: [
        "Deadline und Kontaktweg werden zuerst eingeordnet.",
        "Rückfragen können folgen, wenn Angaben fehlen.",
        "Keine Sofort- oder Verfügbarkeitsgarantie.",
      ],
    };
  }
  if (service === "klaviertransport") {
    return {
      body:
        "FLOXANT prüft Etage, Zugang, Instrumentart, Termin und Fotos, bevor ein Transportweg sinnvoll eingeordnet werden kann.",
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
        "FLOXANT prüft Start, Ziel, Etage, Menge, Termin und besondere Stücke, bevor ein nächster Schritt vorgeschlagen wird.",
      bullets: [
        "Start/Ziel und Zugang sind besonders wichtig.",
        "Fotos oder grobe Menge können später ergänzt werden.",
        "Eine Anfrage ist noch keine Buchung.",
      ],
    };
  }
  if (service === "entruempelung" || service === "wohnungsaufloesung") {
    return {
      body:
        "FLOXANT prüft Räume, Menge, Zugang, Entsorgung, Zielzustand und Fotos, damit die Räumung besser einordenbar wird.",
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
        "FLOXANT berücksichtigt den bevorzugten Kontaktweg soweit möglich. Im ersten Schritt reichen Ort, Zeitraum und eine kurze Beschreibung; weitere Einzelheiten können später folgen.",
      bullets: [
        "Ort, Zeitraum und grober Umfang reichen für den Start.",
        "Rückfragen können diskret erfolgen.",
        "Keine Rechtsberatung, keine Sicherheitsdienstleistung.",
      ],
    };
  }
  return {
    body:
      "FLOXANT prüft Fläche, Objektart, Termin, Zugang und Fotos und meldet sich über die angegebene Kontaktmöglichkeit.",
    bullets: [
      "Fläche, Objektart und Termin helfen besonders.",
      "Fotos können später ergänzt werden.",
      "Eine Anfrage ist noch keine Buchung.",
    ],
  };
}

export function SeoLeadForm({
  initialIntent,
  sourcePage = "/kontakt",
  initialOfferConcern = "",
  initialOfferStatus = "",
  initiallyNeutral = false,
  displayHeading,
  displayIntro,
  trackingSource = "seo_contact_form",
}: SeoLeadFormProps) {
  const hasNeutralSolarPreset = isSolarPvService(initialIntent.service);
  const initialService =
    initialIntent.service === "kontakt" || hasNeutralSolarPreset
      ? "sonstiges"
      : initialIntent.service;
  const initialCityInput = initialIntent.cityLabel || "";
  const [service, setService] = useState<LeadService>(initialService);
  const [serviceSelected, setServiceSelected] = useState(
    !initiallyNeutral && !hasNeutralSolarPreset,
  );
  const [city, setCity] = useState(initialCityInput);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [objectType, setObjectType] = useState("wohnung");
  const [urgency, setUrgency] = useState("flexibel");
  const [scope, setScope] = useState("");
  const [handoverSituation, setHandoverSituation] = useState("");
  const [handoverCondition, setHandoverCondition] = useState("");
  const [handoverDeadline, setHandoverDeadline] = useState("");
  const [handoverKeyAccess, setHandoverKeyAccess] = useState("");
  const [handoverExtraNeeds, setHandoverExtraNeeds] = useState<string[]>([]);
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
  const [existingCleaningOffer, setExistingCleaningOffer] = useState("");
  const [specialAreas, setSpecialAreas] = useState<string[]>([]);
  const [propertyCleaningRole, setPropertyCleaningRole] = useState("");
  const [propertyCleaningObjectType, setPropertyCleaningObjectType] = useState("");
  const [propertyCleaningAreas, setPropertyCleaningAreas] = useState<string[]>([]);
  const [propertyCleaningFrequency, setPropertyCleaningFrequency] = useState("");
  const [propertyCleaningAccess, setPropertyCleaningAccess] = useState("");
  const [propertyCleaningContactPerson, setPropertyCleaningContactPerson] = useState("");
  const [propertyCleaningExistingOffer, setPropertyCleaningExistingOffer] = useState("");
  const [propertyCleaningStartDate, setPropertyCleaningStartDate] = useState("");
  const [solarRoofType, setSolarRoofType] = useState("");
  const [solarAccess, setSolarAccess] = useState("");
  const [solarModuleScope, setSolarModuleScope] = useState("");
  const [solarVisibleDirt, setSolarVisibleDirt] = useState("");
  const [solarExistingOffer, setSolarExistingOffer] = useState("");
  const [solarTimeframe, setSolarTimeframe] = useState("");
  const [solarObjectType, setSolarObjectType] = useState("");
  const [pianoInstrumentType, setPianoInstrumentType] = useState("");
  const [pianoStartLocation, setPianoStartLocation] = useState("");
  const [pianoDestination, setPianoDestination] = useState("");
  const [pianoStartFloor, setPianoStartFloor] = useState("");
  const [pianoDestinationFloor, setPianoDestinationFloor] = useState("");
  const [pianoElevator, setPianoElevator] = useState("");
  const [pianoNarrowStairs, setPianoNarrowStairs] = useState("");
  const [pianoPhotos, setPianoPhotos] = useState("");
  const [pianoExistingOffer, setPianoExistingOffer] = useState("");
  const [pianoConcern, setPianoConcern] = useState("");
  const [seniorRequesterRole, setSeniorRequesterRole] = useState("");
  const [seniorStartLocation, setSeniorStartLocation] = useState("");
  const [seniorDestination, setSeniorDestination] = useState("");
  const [seniorStartFloor, setSeniorStartFloor] = useState("");
  const [seniorDestinationFloor, setSeniorDestinationFloor] = useState("");
  const [seniorElevator, setSeniorElevator] = useState("");
  const [seniorScope, setSeniorScope] = useState("");
  const [seniorExtraNeeds, setSeniorExtraNeeds] = useState<string[]>([]);
  const [seniorDeadline, setSeniorDeadline] = useState("");
  const [seniorExistingOffer, setSeniorExistingOffer] = useState("");
  const [seniorSensitiveSituation, setSeniorSensitiveSituation] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const idempotencyKeyRef = useRef<string | null>(null);
  const submitLockRef = useRef(false);

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
  const isPropertyCleaningFlow =
    service === "hausverwaltung-reinigung" ||
    service === "treppenhausreinigung" ||
    service === "unterhaltsreinigung" ||
    service === "gebaeudereinigung" ||
    /hausverwaltung|treppenhaus|unterhalt|gebaeude|gebaude|objekt-reinigung|objektreinigung|wohnanlage|property-management|staircase|stairwell|building-cleaning|common-area/.test(
      `${lead.trackingIntent} ${sourcePage}`.toLowerCase(),
    );
  const isSolarPv = service === "solarreinigung" || service === "pv-anlagen-reinigung";
  const isPianoTransport = service === "klaviertransport" || lead.trackingIntent.includes("klaviertransport");
  const isSeniorMove =
    service === "seniorenumzug" ||
    lead.trackingIntent.includes("seniorenumzug") ||
    lead.trackingIntent.includes("umzug-im-alter");
  const isOfferCheck = service === "angebot-pruefen" || (lead.trackingIntent.includes("angebot") && !isPianoTransport);
  const isHandoverCleaningFlow =
    service === "reinigung" &&
    /endreinigung|uebergabe|ubergabe|vermieter-ready|objektbrief|reinigung-nach-entruempelung|post-clearance|end-of-tenancy|move-out-cleaning/.test(
      `${lead.trackingIntent} ${sourcePage}`.toLowerCase(),
    );
  const resolvedContactMethod = contactMethod === "auto" ? (phone.trim() ? "phone" : "email") : contactMethod;
  const funnelStage = isPropertyCleaningFlow && isOfferCheck
    ? "property_cleaning_offer_check"
    : isPropertyCleaningFlow
      ? "property_cleaning_lead"
      : isOfferCheck
        ? "offer_check"
      : isB2B
        ? "b2b_lead"
        : "lead";

  function toggleSpecialArea(value: string) {
    setSpecialAreas((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function togglePropertyCleaningArea(value: string) {
    setPropertyCleaningAreas((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function toggleSeniorExtraNeed(value: string) {
    setSeniorExtraNeeds((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function toggleHandoverExtraNeed(value: string) {
    setHandoverExtraNeeds((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function validate() {
    const contactValidation = validateRequestContact(
      {
        name,
        email,
        phone,
        contactMethod: resolvedContactMethod,
        privacyConsent,
      },
      { requireContactMethod: true, requireConsent: true },
    );
    const {
      privacyConsent: privacyError,
      ...contactErrors
    } = contactValidation.fields;
    const nextErrors: FormErrors = { ...contactErrors };
    const trimmedCity = city.trim();
    const trimmedMessage = message.trim();

    if (honeypot.trim()) nextErrors.spam = "Die Anfrage wurde nicht gesendet. Bitte laden Sie die Seite neu.";
    if (Date.now() - startedAt < 2500) {
      nextErrors.spam = "Bitte prüfen Sie die Angaben kurz und senden Sie die Anfrage danach erneut.";
    }
    if (!serviceSelected) nextErrors.service = "Bitte eine Leistung auswählen.";
    if (isSolarPvService(service)) {
      nextErrors.service = "Bitte wählen Sie eine aktuell bestätigte Leistung aus.";
    }
    if (!trimmedCity) nextErrors.city = "Bitte Ort oder Einsatzgebiet eintragen.";
    if (trimmedMessage.length < 10) nextErrors.message = "Bitte beschreiben Sie den Bedarf in einem kurzen Satz.";
    if (privacyError) nextErrors.privacy = privacyError;

    setErrors(nextErrors);
    return nextErrors;
  }

  function focusFirstError(nextErrors: FormErrors) {
    const ids: Partial<Record<keyof FormErrors, string>> = {
      name: "seo-lead-name",
      service: "seo-lead-service",
      email: "seo-lead-email",
      phone: "seo-lead-phone",
      contact: "seo-lead-email",
      contactMethod: "seo-lead-contact-method",
      city: "seo-lead-city",
      message: "seo-lead-message",
      privacy: "seo-lead-privacy",
    };
    const firstKey = [
      "name",
      "service",
      "email",
      "phone",
      "contact",
      "contactMethod",
      "city",
      "message",
      "privacy",
    ].find((key) => nextErrors[key as keyof FormErrors]);
    const id = firstKey ? ids[firstKey as keyof FormErrors] : undefined;
    if (id) requestAnimationFrame(() => document.getElementById(id)?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLockRef.current || status === "submitting") return;

    submitLockRef.current = true;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      dispatchSeoConversionEvent("seo_lead_submit_error", lead, "Validierung fehlgeschlagen");
      setStatus("error");
      focusFirstError(validationErrors);
      submitLockRef.current = false;
      return;
    }

    const attemptKey = idempotencyKeyRef.current ?? createSeoLeadIdempotencyKey();
    idempotencyKeyRef.current = attemptKey;
    let completedSuccessfully = false;

    setStatus("submitting");
    setErrors({});
    const now = new Date().toISOString();
    const bookingService = getBookingServiceForLead(service);
    const landingPage = typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : sourcePage;
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    const photoSignalText = [
      message,
      scope,
      handoverCondition,
      handoverKeyAccess,
      solarVisibleDirt,
      pianoPhotos,
      seniorSensitiveSituation,
    ]
      .join(" ")
      .toLowerCase();
    const hasPhotos =
      /foto|fotos|bild|bilder|photo|photos|screenshot/.test(photoSignalText) ||
      pianoPhotos === "ja" ||
      handoverCondition === "fotos-vorhanden";
    const hasOffer =
      Boolean(isOfferCheck && offerStatus && offerStatus !== "no_offer_yet") ||
      existingCleaningOffer === "ja" ||
      propertyCleaningExistingOffer === "ja" ||
      solarExistingOffer === "ja" ||
      pianoExistingOffer === "ja" ||
      seniorExistingOffer === "ja";
    const requestSummaryPayload = buildRequestSummaryPayload({
      serviceKey: service,
      intent: lead.trackingIntent,
      cityOrZip: city.trim() ? "present" : "",
      objectType:
        objectType ||
        propertyCleaningObjectType ||
        solarObjectType ||
        pianoInstrumentType ||
        seniorRequesterRole ||
        handoverSituation,
      urgency,
      desiredDate: desiredDate || handoverDeadline || solarTimeframe || seniorDeadline,
      scope:
        scope.trim() ||
        serviceScope.trim() ||
        areaSize.trim() ||
        solarModuleScope.trim() ||
        pianoInstrumentType ||
        seniorScope ||
        propertyCleaningAreas.join(","),
      hasPhotos,
      hasOffer,
    });
    const responseTemplate = getLeadReplyTemplateForServiceKey(service, lead.trackingIntent);
    const responseMissingInfoQuestions = getMissingInfoQuestionsForServiceKey(service, lead.trackingIntent, 4);
    const leadResponseHints = {
      responseTemplateKey: responseTemplate.templateKey,
      subjectSuggestion: responseTemplate.subjectSuggestion,
      recommendedNextStep: responseTemplate.recommendedNextStep,
      missingInfoQuestions: responseMissingInfoQuestions,
      customerAcknowledgement: responseTemplate.customerReplyDE,
    };
    const details = {
      contact: {
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        callbackPreference: phone.trim() ? "rückruf_moeglich" : "email",
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
        valuationLabel: "Anfrage mit ersten Eckdaten",
        valuationStage: "Anfrage wird geprüft",
        accuracyState: "Erste Angaben für die Prüfung",
        topDrivers: [
          `Leistung: ${lead.serviceLabel}`,
          `Ort: ${city.trim()}`,
          objectType ? `Objekt: ${objectType}` : "",
          urgency ? `Dringlichkeit: ${urgency}` : "",
          isHandoverCleaningFlow && handoverSituation ? `Übergabe-Situation: ${handoverSituation}` : "",
          isHandoverCleaningFlow && handoverCondition ? `Zustand: ${handoverCondition}` : "",
          isHandoverCleaningFlow && handoverDeadline.trim() ? `Übergabe-Frist: ${handoverDeadline.trim()}` : "",
          isHandoverCleaningFlow && handoverKeyAccess.trim() ? "Schlüsselweg/Zugang genannt" : "",
          isHandoverCleaningFlow && handoverExtraNeeds.length > 0 ? "Übergabe-Zusatzbedarf genannt" : "",
          isOfferCheck && offerStatus ? `Angebotsstatus: ${offerStatus}` : "",
          isOfferCheck && offerAmount.trim() ? "Angebotspreis genannt" : "",
          isOfferCheck && offerConcern ? `Prüfgrund: ${offerConcern}` : "",
          scope.trim() ? "Umfang genannt" : "",
          desiredDate ? "Wunschtermin vorhanden" : "",
          isB2B && companyName.trim() ? "Firma genannt" : "",
          isB2B && existingCleaningOffer ? `Vorhandenes Angebot: ${existingCleaningOffer}` : "",
          isB2B && specialAreas.length > 0 ? "Besondere B2B-Bereiche genannt" : "",
          isPropertyCleaningFlow && propertyCleaningRole ? `Objektrolle: ${propertyCleaningRole}` : "",
          isPropertyCleaningFlow && propertyCleaningObjectType ? `Objektart: ${propertyCleaningObjectType}` : "",
          isPropertyCleaningFlow && propertyCleaningAreas.length > 0 ? "Objektbereiche genannt" : "",
          isPropertyCleaningFlow && propertyCleaningFrequency ? `Turnus: ${propertyCleaningFrequency}` : "",
          isPropertyCleaningFlow && propertyCleaningAccess.trim() ? "Zugang/Schluesselweg genannt" : "",
          isPropertyCleaningFlow && propertyCleaningExistingOffer ? `Vorhandenes Angebot: ${propertyCleaningExistingOffer}` : "",
          isPropertyCleaningFlow && propertyCleaningStartDate.trim() ? "Startfenster genannt" : "",
          isSolarPv && solarRoofType.trim() ? `Dachart: ${solarRoofType.trim()}` : "",
          isSolarPv && solarAccess.trim() ? "PV-Zugang beschrieben" : "",
          isSolarPv && solarModuleScope.trim() ? "Modulfläche/-umfang genannt" : "",
          isSolarPv && solarExistingOffer ? `Solar/PV-Angebot: ${solarExistingOffer}` : "",
          isPianoTransport && pianoInstrumentType ? `Instrumentart: ${pianoInstrumentType}` : "",
          isPianoTransport && pianoStartFloor.trim() ? `Etage Start: ${pianoStartFloor.trim()}` : "",
          isPianoTransport && pianoDestinationFloor.trim() ? `Etage Ziel: ${pianoDestinationFloor.trim()}` : "",
          isPianoTransport && pianoElevator ? `Aufzug: ${pianoElevator}` : "",
          isPianoTransport && pianoNarrowStairs ? `Treppenhaus eng: ${pianoNarrowStairs}` : "",
          isPianoTransport && pianoExistingOffer ? `Klaviertransport-Angebot: ${pianoExistingOffer}` : "",
          isPianoTransport && pianoConcern ? `Problem/Sorge: ${pianoConcern}` : "",
          isSeniorMove && seniorRequesterRole ? `Seniorenumzug Rolle: ${seniorRequesterRole}` : "",
          isSeniorMove && seniorStartLocation.trim() ? `Startort: ${seniorStartLocation.trim()}` : "",
          isSeniorMove && seniorDestination.trim() ? `Zielort: ${seniorDestination.trim()}` : "",
          isSeniorMove && seniorScope ? `Seniorenumzug Umfang: ${seniorScope}` : "",
          isSeniorMove && seniorExtraNeeds.length > 0 ? "Seniorenumzug Zusatzbedarf genannt" : "",
          isSeniorMove && seniorExistingOffer ? `Seniorenumzug-Angebot: ${seniorExistingOffer}` : "",
          isSeniorMove && seniorSensitiveSituation ? "Sensible Situation optional markiert" : "",
        ].filter(Boolean),
        priceExplanation:
          "Diese Anfrage enthält die wichtigsten Angaben für eine erste fachliche Rückmeldung. Ein Preis wird erst nach Prüfung der Eckdaten zugesagt.",
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
          handoverSituation: isHandoverCleaningFlow ? handoverSituation : "",
          handoverCondition: isHandoverCleaningFlow ? handoverCondition : "",
          handoverDeadline: isHandoverCleaningFlow ? handoverDeadline.trim() : "",
          handoverKeyAccess: isHandoverCleaningFlow ? handoverKeyAccess.trim() : "",
          handoverExtraNeeds: isHandoverCleaningFlow ? handoverExtraNeeds : [],
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
          existingCleaningOffer: isB2B ? existingCleaningOffer : "",
          specialAreas: isB2B ? specialAreas : [],
          propertyCleaningRole: isPropertyCleaningFlow ? propertyCleaningRole : "",
          propertyCleaningObjectType: isPropertyCleaningFlow ? propertyCleaningObjectType : "",
          propertyCleaningAreas: isPropertyCleaningFlow ? propertyCleaningAreas : [],
          propertyCleaningFrequency: isPropertyCleaningFlow ? propertyCleaningFrequency : "",
          propertyCleaningAccess: isPropertyCleaningFlow ? propertyCleaningAccess.trim() : "",
          propertyCleaningContactPerson: isPropertyCleaningFlow ? propertyCleaningContactPerson.trim() : "",
          propertyCleaningExistingOffer: isPropertyCleaningFlow ? propertyCleaningExistingOffer : "",
          propertyCleaningStartDate: isPropertyCleaningFlow ? propertyCleaningStartDate.trim() : "",
          solarRoofType: isSolarPv ? solarRoofType.trim() : "",
          solarAccess: isSolarPv ? solarAccess.trim() : "",
          solarModuleScope: isSolarPv ? solarModuleScope.trim() : "",
          solarVisibleDirt: isSolarPv ? solarVisibleDirt.trim() : "",
          solarExistingOffer: isSolarPv ? solarExistingOffer : "",
          solarTimeframe: isSolarPv ? solarTimeframe.trim() : "",
          solarObjectType: isSolarPv ? solarObjectType : "",
          pianoInstrumentType: isPianoTransport ? pianoInstrumentType : "",
          pianoStartLocation: isPianoTransport ? pianoStartLocation.trim() : "",
          pianoDestination: isPianoTransport ? pianoDestination.trim() : "",
          pianoStartFloor: isPianoTransport ? pianoStartFloor.trim() : "",
          pianoDestinationFloor: isPianoTransport ? pianoDestinationFloor.trim() : "",
          pianoElevator: isPianoTransport ? pianoElevator : "",
          pianoNarrowStairs: isPianoTransport ? pianoNarrowStairs : "",
          pianoPhotos: isPianoTransport ? pianoPhotos : "",
          pianoExistingOffer: isPianoTransport ? pianoExistingOffer : "",
          pianoConcern: isPianoTransport ? pianoConcern : "",
          seniorRequesterRole: isSeniorMove ? seniorRequesterRole : "",
          seniorStartLocation: isSeniorMove ? seniorStartLocation.trim() : "",
          seniorDestination: isSeniorMove ? seniorDestination.trim() : "",
          seniorStartFloor: isSeniorMove ? seniorStartFloor.trim() : "",
          seniorDestinationFloor: isSeniorMove ? seniorDestinationFloor.trim() : "",
          seniorElevator: isSeniorMove ? seniorElevator : "",
          seniorScope: isSeniorMove ? seniorScope : "",
          seniorExtraNeeds: isSeniorMove ? seniorExtraNeeds : [],
          seniorDeadline: isSeniorMove ? seniorDeadline.trim() : "",
          seniorExistingOffer: isSeniorMove ? seniorExistingOffer : "",
          seniorSensitiveSituation: isSeniorMove ? seniorSensitiveSituation : "",
          contactMethod: resolvedContactMethod,
          preferredContactMethod: resolvedContactMethod,
          requestSummary: requestSummaryPayload.requestSummary,
          missingInfoFlags: requestSummaryPayload.missingInfoFlags,
          hasPhotos: requestSummaryPayload.hasPhotos,
          hasOffer: requestSummaryPayload.hasOffer,
          signatureServiceHint: requestSummaryPayload.signatureServiceHint,
          leadPriority: requestSummaryPayload.leadPriority,
          responseTemplateKey: leadResponseHints.responseTemplateKey,
          recommendedNextStep: leadResponseHints.recommendedNextStep,
          missingInfoQuestions: responseMissingInfoQuestions,
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
        handoverSituation: isHandoverCleaningFlow ? handoverSituation : "",
        handoverCondition: isHandoverCleaningFlow ? handoverCondition : "",
        handoverDeadline: isHandoverCleaningFlow ? handoverDeadline.trim() : "",
        handoverKeyAccess: isHandoverCleaningFlow ? handoverKeyAccess.trim() : "",
        handoverExtraNeeds: isHandoverCleaningFlow ? handoverExtraNeeds : [],
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
        existingCleaningOffer: isB2B ? existingCleaningOffer : "",
        specialAreas: isB2B ? specialAreas : [],
        propertyCleaningRole: isPropertyCleaningFlow ? propertyCleaningRole : "",
        propertyCleaningObjectType: isPropertyCleaningFlow ? propertyCleaningObjectType : "",
        propertyCleaningAreas: isPropertyCleaningFlow ? propertyCleaningAreas : [],
        propertyCleaningFrequency: isPropertyCleaningFlow ? propertyCleaningFrequency : "",
        propertyCleaningAccess: isPropertyCleaningFlow ? propertyCleaningAccess.trim() : "",
        propertyCleaningContactPerson: isPropertyCleaningFlow ? propertyCleaningContactPerson.trim() : "",
        propertyCleaningExistingOffer: isPropertyCleaningFlow ? propertyCleaningExistingOffer : "",
        propertyCleaningStartDate: isPropertyCleaningFlow ? propertyCleaningStartDate.trim() : "",
        solarRoofType: isSolarPv ? solarRoofType.trim() : "",
        solarAccess: isSolarPv ? solarAccess.trim() : "",
        solarModuleScope: isSolarPv ? solarModuleScope.trim() : "",
        solarVisibleDirt: isSolarPv ? solarVisibleDirt.trim() : "",
        solarExistingOffer: isSolarPv ? solarExistingOffer : "",
        solarTimeframe: isSolarPv ? solarTimeframe.trim() : "",
        solarObjectType: isSolarPv ? solarObjectType : "",
        pianoInstrumentType: isPianoTransport ? pianoInstrumentType : "",
        pianoStartLocation: isPianoTransport ? pianoStartLocation.trim() : "",
        pianoDestination: isPianoTransport ? pianoDestination.trim() : "",
        pianoStartFloor: isPianoTransport ? pianoStartFloor.trim() : "",
        pianoDestinationFloor: isPianoTransport ? pianoDestinationFloor.trim() : "",
        pianoElevator: isPianoTransport ? pianoElevator : "",
        pianoNarrowStairs: isPianoTransport ? pianoNarrowStairs : "",
        pianoPhotos: isPianoTransport ? pianoPhotos : "",
        pianoExistingOffer: isPianoTransport ? pianoExistingOffer : "",
        pianoConcern: isPianoTransport ? pianoConcern : "",
        seniorRequesterRole: isSeniorMove ? seniorRequesterRole : "",
        seniorStartLocation: isSeniorMove ? seniorStartLocation.trim() : "",
        seniorDestination: isSeniorMove ? seniorDestination.trim() : "",
        seniorStartFloor: isSeniorMove ? seniorStartFloor.trim() : "",
        seniorDestinationFloor: isSeniorMove ? seniorDestinationFloor.trim() : "",
        seniorElevator: isSeniorMove ? seniorElevator : "",
        seniorScope: isSeniorMove ? seniorScope : "",
        seniorExtraNeeds: isSeniorMove ? seniorExtraNeeds : [],
        seniorDeadline: isSeniorMove ? seniorDeadline.trim() : "",
        seniorExistingOffer: isSeniorMove ? seniorExistingOffer : "",
        seniorSensitiveSituation: isSeniorMove ? seniorSensitiveSituation : "",
        pageType: "contact",
        funnelStage,
        ctaLabel: "Anfrage senden",
        requestSummary: requestSummaryPayload.requestSummary,
        missingInfoFlags: requestSummaryPayload.missingInfoFlags,
        hasPhotos: requestSummaryPayload.hasPhotos,
        hasOffer: requestSummaryPayload.hasOffer,
        signatureServiceHint: requestSummaryPayload.signatureServiceHint,
        leadPriority: requestSummaryPayload.leadPriority,
        leadResponseHints,
        responseTemplateKey: leadResponseHints.responseTemplateKey,
        recommendedNextStep: leadResponseHints.recommendedNextStep,
        missingInfoQuestions: responseMissingInfoQuestions,
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
          handoverSituation: isHandoverCleaningFlow ? handoverSituation : "",
          handoverCondition: isHandoverCleaningFlow ? handoverCondition : "",
          handoverDeadline: isHandoverCleaningFlow ? handoverDeadline.trim() : "",
          handoverKeyAccess: isHandoverCleaningFlow ? handoverKeyAccess.trim() : "",
          handoverExtraNeeds: isHandoverCleaningFlow ? handoverExtraNeeds : [],
          offerStatus: isOfferCheck ? offerStatus : "",
          offerConcern: isOfferCheck ? offerConcern : "",
          existingCleaningOffer: isB2B ? existingCleaningOffer : "",
          specialAreas: isB2B ? specialAreas : [],
          propertyCleaningRole: isPropertyCleaningFlow ? propertyCleaningRole : "",
          propertyCleaningObjectType: isPropertyCleaningFlow ? propertyCleaningObjectType : "",
          propertyCleaningAreas: isPropertyCleaningFlow ? propertyCleaningAreas : [],
          propertyCleaningFrequency: isPropertyCleaningFlow ? propertyCleaningFrequency : "",
          propertyCleaningAccess: isPropertyCleaningFlow ? propertyCleaningAccess.trim() : "",
          propertyCleaningContactPerson: isPropertyCleaningFlow ? propertyCleaningContactPerson.trim() : "",
          propertyCleaningExistingOffer: isPropertyCleaningFlow ? propertyCleaningExistingOffer : "",
          propertyCleaningStartDate: isPropertyCleaningFlow ? propertyCleaningStartDate.trim() : "",
          solarRoofType: isSolarPv ? solarRoofType.trim() : "",
          solarAccess: isSolarPv ? solarAccess.trim() : "",
          solarModuleScope: isSolarPv ? solarModuleScope.trim() : "",
          solarVisibleDirt: isSolarPv ? solarVisibleDirt.trim() : "",
          solarExistingOffer: isSolarPv ? solarExistingOffer : "",
          solarTimeframe: isSolarPv ? solarTimeframe.trim() : "",
          solarObjectType: isSolarPv ? solarObjectType : "",
          pianoInstrumentType: isPianoTransport ? pianoInstrumentType : "",
          pianoStartLocation: isPianoTransport ? pianoStartLocation.trim() : "",
          pianoDestination: isPianoTransport ? pianoDestination.trim() : "",
          pianoStartFloor: isPianoTransport ? pianoStartFloor.trim() : "",
          pianoDestinationFloor: isPianoTransport ? pianoDestinationFloor.trim() : "",
          pianoElevator: isPianoTransport ? pianoElevator : "",
          pianoNarrowStairs: isPianoTransport ? pianoNarrowStairs : "",
          pianoPhotos: isPianoTransport ? pianoPhotos : "",
          pianoExistingOffer: isPianoTransport ? pianoExistingOffer : "",
          pianoConcern: isPianoTransport ? pianoConcern : "",
          seniorRequesterRole: isSeniorMove ? seniorRequesterRole : "",
          seniorStartLocation: isSeniorMove ? seniorStartLocation.trim() : "",
          seniorDestination: isSeniorMove ? seniorDestination.trim() : "",
          seniorStartFloor: isSeniorMove ? seniorStartFloor.trim() : "",
          seniorDestinationFloor: isSeniorMove ? seniorDestinationFloor.trim() : "",
          seniorElevator: isSeniorMove ? seniorElevator : "",
          seniorScope: isSeniorMove ? seniorScope : "",
          seniorExtraNeeds: isSeniorMove ? seniorExtraNeeds : [],
          seniorDeadline: isSeniorMove ? seniorDeadline.trim() : "",
          seniorExistingOffer: isSeniorMove ? seniorExistingOffer : "",
          seniorSensitiveSituation: isSeniorMove ? seniorSensitiveSituation : "",
          contactMethod: resolvedContactMethod,
          preferredContactMethod: resolvedContactMethod,
          requestSummary: requestSummaryPayload.requestSummary,
          missingInfoFlags: requestSummaryPayload.missingInfoFlags,
          hasPhotos: requestSummaryPayload.hasPhotos,
          hasOffer: requestSummaryPayload.hasOffer,
          signatureServiceHint: requestSummaryPayload.signatureServiceHint,
          leadPriority: requestSummaryPayload.leadPriority,
          leadResponseHints,
          responseTemplateKey: leadResponseHints.responseTemplateKey,
          recommendedNextStep: leadResponseHints.recommendedNextStep,
          missingInfoQuestions: responseMissingInfoQuestions,
          pageType: "contact",
          funnelStage,
          ctaLabel: "Anfrage senden",
        },
      },
    };

    const payload = new FormData();
    payload.set("type", "booking_wizard");
    payload.set("lead_type", "seo_quick_lead");
    payload.set("leadSource", "seo_quick_lead_form");
    payload.set("source", trackingSource);
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
    payload.set("handoverSituation", isHandoverCleaningFlow ? handoverSituation : "");
    payload.set("handoverCondition", isHandoverCleaningFlow ? handoverCondition : "");
    payload.set("handoverDeadline", isHandoverCleaningFlow ? handoverDeadline.trim() : "");
    payload.set("handoverKeyAccess", isHandoverCleaningFlow ? handoverKeyAccess.trim() : "");
    payload.set("handoverExtraNeeds", isHandoverCleaningFlow ? handoverExtraNeeds.join(",") : "");
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
    payload.set("existingCleaningOffer", isB2B ? existingCleaningOffer : "");
    payload.set("specialAreas", isB2B ? specialAreas.join(",") : "");
    payload.set("propertyCleaningRole", isPropertyCleaningFlow ? propertyCleaningRole : "");
    payload.set("propertyCleaningObjectType", isPropertyCleaningFlow ? propertyCleaningObjectType : "");
    payload.set("propertyCleaningAreas", isPropertyCleaningFlow ? propertyCleaningAreas.join(",") : "");
    payload.set("propertyCleaningFrequency", isPropertyCleaningFlow ? propertyCleaningFrequency : "");
    payload.set("propertyCleaningAccess", isPropertyCleaningFlow ? propertyCleaningAccess.trim() : "");
    payload.set("propertyCleaningContactPerson", isPropertyCleaningFlow ? propertyCleaningContactPerson.trim() : "");
    payload.set("propertyCleaningExistingOffer", isPropertyCleaningFlow ? propertyCleaningExistingOffer : "");
    payload.set("propertyCleaningStartDate", isPropertyCleaningFlow ? propertyCleaningStartDate.trim() : "");
    payload.set("solarRoofType", isSolarPv ? solarRoofType.trim() : "");
    payload.set("solarAccess", isSolarPv ? solarAccess.trim() : "");
    payload.set("solarModuleScope", isSolarPv ? solarModuleScope.trim() : "");
    payload.set("solarVisibleDirt", isSolarPv ? solarVisibleDirt.trim() : "");
    payload.set("solarExistingOffer", isSolarPv ? solarExistingOffer : "");
    payload.set("solarTimeframe", isSolarPv ? solarTimeframe.trim() : "");
    payload.set("solarObjectType", isSolarPv ? solarObjectType : "");
    payload.set("pianoInstrumentType", isPianoTransport ? pianoInstrumentType : "");
    payload.set("pianoStartLocation", isPianoTransport ? pianoStartLocation.trim() : "");
    payload.set("pianoDestination", isPianoTransport ? pianoDestination.trim() : "");
    payload.set("pianoStartFloor", isPianoTransport ? pianoStartFloor.trim() : "");
    payload.set("pianoDestinationFloor", isPianoTransport ? pianoDestinationFloor.trim() : "");
    payload.set("pianoElevator", isPianoTransport ? pianoElevator : "");
    payload.set("pianoNarrowStairs", isPianoTransport ? pianoNarrowStairs : "");
    payload.set("pianoPhotos", isPianoTransport ? pianoPhotos : "");
    payload.set("pianoExistingOffer", isPianoTransport ? pianoExistingOffer : "");
    payload.set("pianoConcern", isPianoTransport ? pianoConcern : "");
    payload.set("seniorRequesterRole", isSeniorMove ? seniorRequesterRole : "");
    payload.set("seniorStartLocation", isSeniorMove ? seniorStartLocation.trim() : "");
    payload.set("seniorDestination", isSeniorMove ? seniorDestination.trim() : "");
    payload.set("seniorStartFloor", isSeniorMove ? seniorStartFloor.trim() : "");
    payload.set("seniorDestinationFloor", isSeniorMove ? seniorDestinationFloor.trim() : "");
    payload.set("seniorElevator", isSeniorMove ? seniorElevator : "");
    payload.set("seniorScope", isSeniorMove ? seniorScope : "");
    payload.set("seniorExtraNeeds", isSeniorMove ? seniorExtraNeeds.join(",") : "");
    payload.set("seniorDeadline", isSeniorMove ? seniorDeadline.trim() : "");
    payload.set("seniorExistingOffer", isSeniorMove ? seniorExistingOffer : "");
    payload.set("seniorSensitiveSituation", isSeniorMove ? seniorSensitiveSituation : "");
    payload.set("scope", scope.trim());
    payload.set("message", message.trim());
    payload.set("pageType", "contact");
    payload.set("funnelStage", funnelStage);
    payload.set("ctaLabel", "Anfrage senden");
    payload.set("requestSummary", requestSummaryPayload.requestSummary);
    payload.set("missingInfoFlags", requestSummaryPayload.missingInfoFlags.join(","));
    payload.set("hasPhotos", requestSummaryPayload.hasPhotos ? "true" : "false");
    payload.set("hasOffer", requestSummaryPayload.hasOffer ? "true" : "false");
    payload.set("signatureServiceHint", requestSummaryPayload.signatureServiceHint);
    payload.set("leadPriority", requestSummaryPayload.leadPriority);
    payload.set("responseTemplateKey", leadResponseHints.responseTemplateKey);
    payload.set("recommendedNextStep", leadResponseHints.recommendedNextStep);
    payload.set("missingInfoQuestions", responseMissingInfoQuestions.join(" | "));
    payload.set("privacyConsent", privacyConsent ? "true" : "false");
    payload.set("isSensitiveCase", service === "diskret-service" || service === "private-client" ? "true" : "false");
    payload.set("timestamp", now);
    payload.set("formStartedAt", String(startedAt));
    payload.set("companyWebsite", honeypot);
    payload.set("details", JSON.stringify(details));
    appendConversionJourneyToFormData(payload);

    try {
      const response = await bookingFetch("/api/bookings", {
        method: "POST",
        body: payload,
        headers: {
          "Idempotency-Key": attemptKey,
        },
      });

      let responsePayload: any = null;
      try {
        responsePayload = await response.json();
      } catch {
        responsePayload = null;
      }

      if (response.status !== 201 || responsePayload?.ok !== true) {
        if (idempotencyKeyRef.current !== attemptKey) return;

        const serverFields = bookingFieldErrors(responsePayload);
        const mappedErrors: FormErrors = {};
        if (serverFields.name) mappedErrors.name = serverFields.name;
        if (serverFields.email) mappedErrors.email = serverFields.email;
        if (serverFields.phone) mappedErrors.phone = serverFields.phone;
        if (serverFields.contact) mappedErrors.contact = serverFields.contact;
        if (serverFields.contactMethod || serverFields.preferredContactMethod || serverFields.preferredContact) {
          mappedErrors.contactMethod =
            serverFields.contactMethod ||
            serverFields.preferredContactMethod ||
            serverFields.preferredContact;
        }
        if (serverFields.service) mappedErrors.service = serverFields.service;
        if (serverFields.city || serverFields.cityOrZip) mappedErrors.city = serverFields.city || serverFields.cityOrZip;
        if (serverFields.message) mappedErrors.message = serverFields.message;
        if (serverFields.privacyConsent) mappedErrors.privacy = serverFields.privacyConsent;
        if (!Object.keys(mappedErrors).length) {
          mappedErrors.form = responsePayload?.error || getCustomerFacingErrorMessage("submit-error");
        }
        dispatchSeoConversionEvent("seo_lead_submit_error", lead, "SEO-Anfrage Fehler");
        setErrors(mappedErrors);
        setStatus("error");
        focusFirstError(mappedErrors);
        return;
      }

      if (idempotencyKeyRef.current !== attemptKey) return;

      dispatchSeoConversionEvent("seo_lead_submit_success", lead, "SEO-Anfrage erfolgreich gesendet");
      completedSuccessfully = true;
      idempotencyKeyRef.current = null;
      setStatus("success");
    } catch {
      if (idempotencyKeyRef.current !== attemptKey) return;

      dispatchSeoConversionEvent("seo_lead_submit_error", lead, "SEO-Anfrage Fehler");
      setErrors({
        form: getCustomerFacingErrorMessage("submit-error"),
      });
      setStatus("error");
    } finally {
      if (!completedSuccessfully && idempotencyKeyRef.current !== attemptKey) {
        setStatus("idle");
      }
      submitLockRef.current = false;
    }
  }

  if (status === "success") {
    const successCopy = germanizeDeep(getSuccessCopy({ service, isOfferCheck, isB2B, isSolarPv, isPianoTransport, isSeniorMove, isHandoverCleaningFlow, isPropertyCleaningFlow, trackingIntent: lead.trackingIntent })) as ReturnType<typeof getSuccessCopy>;
    const responseTemplate = getLeadReplyTemplateForServiceKey(service, lead.trackingIntent);
    const followUpQuestions = getMissingInfoQuestionsForServiceKey(service, lead.trackingIntent, 3);
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
        <h2 className="mt-4 text-2xl font-black tracking-tight">Anfrage gesendet</h2>
        <p className="mt-3 text-sm font-semibold leading-7">{successCopy.body}</p>
        <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6">
          {successCopy.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-lg border border-emerald-200 bg-white/80 p-4 text-sm font-semibold leading-6 text-emerald-950">
          <p className="font-black">Was FLOXANT als Nächstes prüft</p>
          <p className="mt-2">{responseTemplate.recommendedNextStep}</p>
          <p className="mt-3 font-black">Falls noch Angaben fehlen</p>
          <ul className="mt-2 grid gap-1">
            {followUpQuestions.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs font-bold leading-5">
            Sie können Informationen später ergänzen. Diese Bestätigung ist keine Buchung, keine Preiszusage und keine Termin- oder Verfügbarkeitsgarantie.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            idempotencyKeyRef.current = null;
            submitLockRef.current = false;
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
      data-source={trackingSource}
      data-service={lead.trackingService}
      data-city={lead.trackingCity}
      data-page-intent={lead.trackingIntent}
      data-priority={lead.priority}
    >
      <form
        data-booking-field-errors="managed"
        id="direktanfrage"
        onSubmit={handleSubmit}
        onChange={() => {
          idempotencyKeyRef.current = null;
          setErrors({});
          if (status === "error") setStatus("idle");
        }}
        className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-sm shadow-slate-950/5 sm:p-6"
        data-event="seo_lead_submit_attempt"
        data-source={trackingSource}
        data-contact-channel="form"
        data-service={lead.trackingService}
        data-city={lead.trackingCity}
        data-intent={lead.trackingIntent}
        data-page-intent={lead.trackingIntent}
        data-priority={lead.priority}
        data-track-submit="attempt"
        noValidate
      >
      <fieldset disabled={status === "submitting"} className="contents">
      <div>
        <div className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
          Schnelle Anfrage
        </div>
        <h2 className="mt-2 text-2xl font-black tracking-tight">
          {germanText(displayHeading || lead.suggestedFormTitle, displayHeading || lead.suggestedFormTitle)}
        </h2>
        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
          {germanText(displayIntro || lead.suggestedFormIntro, displayIntro || lead.suggestedFormIntro)}
        </p>
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
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            placeholder="Ihr Name"
          />
        </Field>

        <Field label="Leistung" htmlFor="seo-lead-service" required error={errors.service}>
          <select
            id="seo-lead-service"
            name="servicePreset"
            value={serviceSelected ? service : ""}
            onChange={(event) => {
              setService(event.target.value as LeadService);
              setServiceSelected(Boolean(event.target.value));
            }}
            className={fieldClass(Boolean(errors.service))}
            aria-describedby={errors.service ? "seo-lead-service-error" : undefined}
            aria-invalid={Boolean(errors.service)}
          >
            <option value="">Bitte Leistung auswählen</option>
            {selectableLeadServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {germanText(option.label, option.label)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="E-Mail" htmlFor="seo-lead-email" error={errors.email}>
          <input
            id="seo-lead-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass(Boolean(errors.email || errors.contact))}
            aria-describedby={[
              errors.email ? "seo-lead-email-error" : "",
              errors.contact ? "seo-lead-contact-error" : "",
            ].filter(Boolean).join(" ") || undefined}
            aria-invalid={Boolean(errors.email || errors.contact)}
            autoComplete="email"
            placeholder="name@beispiel.de"
          />
        </Field>

        <Field label="Telefon" htmlFor="seo-lead-phone" error={errors.phone}>
          <input
            id="seo-lead-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass(Boolean(errors.phone || errors.contact))}
            aria-describedby={[
              errors.phone ? "seo-lead-phone-error" : "",
              errors.contact ? "seo-lead-contact-error" : "",
            ].filter(Boolean).join(" ") || undefined}
            aria-invalid={Boolean(errors.phone || errors.contact)}
            autoComplete="tel"
            placeholder="+49 ..."
          />
        </Field>
      </div>

      {errors.contact ? (
        <p id="seo-lead-contact-error" className="flex gap-2 text-sm font-semibold leading-6 text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {germanText(errors.contact, errors.contact)}
        </p>
      ) : null}

      <Field
        label="Bevorzugter Kontaktweg"
        htmlFor="seo-lead-contact-method"
        error={errors.contactMethod}
      >
        <select
          id="seo-lead-contact-method"
          name="contactMethodPreference"
          value={contactMethod}
          onChange={(event) => setContactMethod(event.target.value)}
          className={fieldClass(Boolean(errors.contactMethod))}
          aria-describedby={errors.contactMethod ? "seo-lead-contact-method-error" : undefined}
          aria-invalid={Boolean(errors.contactMethod)}
        >
          <option value="auto">automatisch nach Angabe</option>
          <option value="phone">Rückruf bevorzugt</option>
          <option value="email">E-Mail bevorzugt</option>
          <option value="whatsapp">WhatsApp möglich</option>
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
                {germanText(option.label, option.label)}
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
          <Field label="Fläche / Räume" htmlFor="seo-lead-area-size">
            <input
              id="seo-lead-area-size"
              name="areaSize"
              value={areaSize}
              onChange={(event) => setAreaSize(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. 180 m2, 6 Räume"
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
              <option value="woechentlich">wöchentlich</option>
              <option value="mehrmals-pro-woche">mehrmals pro Woche</option>
              <option value="monatlich">monatlich</option>
              <option value="nach-bedarf">nach Bedarf</option>
            </select>
          </Field>
          <Field label="Gewünschte Zeit" htmlFor="seo-lead-cleaning-time">
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
              placeholder="z. B. Sanitär, Böden, Küche"
            />
          </Field>
          <Field label="Vorhandenes Angebot" htmlFor="seo-lead-existing-cleaning-offer">
            <select
              id="seo-lead-existing-cleaning-offer"
              name="existingCleaningOffer"
              value={existingCleaningOffer}
              onChange={(event) => setExistingCleaningOffer(event.target.value)}
              className={fieldClass(false)}
            >
              <option value="">noch offen</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar / mehrere Angebote</option>
            </select>
          </Field>
          <div className="space-y-3 sm:col-span-2">
            <p className="text-sm font-black text-slate-950">Besondere Bereiche</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {b2bSpecialAreaOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="specialAreas"
                    value={option.value}
                    checked={specialAreas.includes(option.value)}
                    onChange={() => toggleSpecialArea(option.value)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-700"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <p className="sm:col-span-2 text-xs font-semibold leading-5 text-slate-600">
            Für Unternehmen helfen Fläche, Turnus und gewünschte Reinigungszeiten bei der ersten Einordnung. Eine Anfrage ist noch keine Beauftragung.
          </p>
        </div>
      ) : null}

      {isPropertyCleaningFlow ? (
        <div className="grid gap-4 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 sm:grid-cols-2">
          <Field label="Rolle" htmlFor="seo-lead-property-role">
            <select
              id="seo-lead-property-role"
              name="propertyCleaningRole"
              value={propertyCleaningRole}
              onChange={(event) => setPropertyCleaningRole(event.target.value)}
              className={fieldClass(false)}
            >
              {propertyCleaningRoleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Objektart" htmlFor="seo-lead-property-object-type">
            <select
              id="seo-lead-property-object-type"
              name="propertyCleaningObjectType"
              value={propertyCleaningObjectType}
              onChange={(event) => setPropertyCleaningObjectType(event.target.value)}
              className={fieldClass(false)}
            >
              {propertyCleaningObjectTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Turnus" htmlFor="seo-lead-property-frequency">
            <select
              id="seo-lead-property-frequency"
              name="propertyCleaningFrequency"
              value={propertyCleaningFrequency}
              onChange={(event) => setPropertyCleaningFrequency(event.target.value)}
              className={fieldClass(false)}
            >
              {propertyCleaningFrequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Vorhandenes Angebot" htmlFor="seo-lead-property-existing-offer">
            <select
              id="seo-lead-property-existing-offer"
              name="propertyCleaningExistingOffer"
              value={propertyCleaningExistingOffer}
              onChange={(event) => setPropertyCleaningExistingOffer(event.target.value)}
              className={fieldClass(false)}
            >
              {propertyCleaningYesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Zugang / Schlüsselweg" htmlFor="seo-lead-property-access">
            <input
              id="seo-lead-property-access"
              name="propertyCleaningAccess"
              value={propertyCleaningAccess}
              onChange={(event) => setPropertyCleaningAccess(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Schlüssel bei Verwaltung, Code, Hausmeister"
            />
          </Field>
          <Field label="Ansprechpartner" htmlFor="seo-lead-property-contact">
            <input
              id="seo-lead-property-contact"
              name="propertyCleaningContactPerson"
              value={propertyCleaningContactPerson}
              onChange={(event) => setPropertyCleaningContactPerson(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Verwaltung, Beirat, Objektleitung"
            />
          </Field>
          <Field label="Start / Wechsel" htmlFor="seo-lead-property-start-date">
            <input
              id="seo-lead-property-start-date"
              name="propertyCleaningStartDate"
              value={propertyCleaningStartDate}
              onChange={(event) => setPropertyCleaningStartDate(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. ab Monatswechsel, nach Kuendigung, flexibel"
            />
          </Field>
          <div className="space-y-3 sm:col-span-2">
            <p className="text-sm font-black text-slate-950">Bereiche</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {propertyCleaningAreaOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="propertyCleaningAreas"
                    value={option.value}
                    checked={propertyCleaningAreas.includes(option.value)}
                    onChange={() => togglePropertyCleaningArea(option.value)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-700"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <p className="sm:col-span-2 text-xs font-semibold leading-5 text-slate-600">
            Diese Angaben helfen bei Hausverwaltung-Reinigung, Treppenhausreinigung, Unterhaltsreinigung und Objekt-/Wohnanlagenreinigung. Eine Anfrage ist noch keine Beauftragung.
          </p>
        </div>
      ) : null}

      {isHandoverCleaningFlow ? (
        <div className="grid gap-4 rounded-lg border border-blue-100 bg-blue-50/50 p-4 sm:grid-cols-2">
          <Field label="Übergabe-Situation" htmlFor="seo-lead-handover-situation">
            <select
              id="seo-lead-handover-situation"
              name="handoverSituation"
              value={handoverSituation}
              onChange={(event) => setHandoverSituation(event.target.value)}
              className={fieldClass(false)}
            >
              {handoverSituationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Zustand / Restmengen" htmlFor="seo-lead-handover-condition">
            <select
              id="seo-lead-handover-condition"
              name="handoverCondition"
              value={handoverCondition}
              onChange={(event) => setHandoverCondition(event.target.value)}
              className={fieldClass(false)}
            >
              {handoverConditionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Übergabe-Frist" htmlFor="seo-lead-handover-deadline">
            <input
              id="seo-lead-handover-deadline"
              name="handoverDeadline"
              value={handoverDeadline}
              onChange={(event) => setHandoverDeadline(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Freitag, Monatsende, 6 Tage"
            />
          </Field>
          <Field label="Schlüsselweg / Zugang" htmlFor="seo-lead-handover-key-access">
            <input
              id="seo-lead-handover-key-access"
              name="handoverKeyAccess"
              value={handoverKeyAccess}
              onChange={(event) => setHandoverKeyAccess(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Schlüssel bei Verwaltung, EG, Aufzug"
            />
          </Field>
          <div className="space-y-3 sm:col-span-2">
            <p className="text-sm font-black text-slate-950">Optionaler Zusatzbedarf</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {handoverExtraNeedOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="handoverExtraNeeds"
                    value={option.value}
                    checked={handoverExtraNeeds.includes(option.value)}
                    onChange={() => toggleHandoverExtraNeed(option.value)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-700"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <p className="text-xs font-semibold leading-5 text-slate-600 sm:col-span-2">
            Diese Felder sind optional und helfen bei Endreinigung vor Übergabe, Reinigung nach Entrümpelung, Vermieter-Ready-Service,
            Objektbrief oder Übergabeakte. Bitte keine Zugangscodes im Formular senden.
          </p>
        </div>
      ) : null}

      {isSeniorMove ? (
        <div className="grid gap-4 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 sm:grid-cols-2">
          <Field label="Wer fragt an?" htmlFor="seo-lead-senior-requester-role">
            <select
              id="seo-lead-senior-requester-role"
              name="seniorRequesterRole"
              value={seniorRequesterRole}
              onChange={(event) => setSeniorRequesterRole(event.target.value)}
              className={fieldClass(false)}
            >
              {seniorRequesterRoleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Startort" htmlFor="seo-lead-senior-start-location">
            <input
              id="seo-lead-senior-start-location"
              name="seniorStartLocation"
              value={seniorStartLocation}
              onChange={(event) => setSeniorStartLocation(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Regensburg, Stadtteil, grob"
            />
          </Field>
          <Field label="Zielort" htmlFor="seo-lead-senior-destination">
            <input
              id="seo-lead-senior-destination"
              name="seniorDestination"
              value={seniorDestination}
              onChange={(event) => setSeniorDestination(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. neue Wohnung, Angehörige, Einrichtung"
            />
          </Field>
          <Field label="Etage Start" htmlFor="seo-lead-senior-start-floor">
            <input
              id="seo-lead-senior-start-floor"
              name="seniorStartFloor"
              value={seniorStartFloor}
              onChange={(event) => setSeniorStartFloor(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. 2. OG, EG, Keller"
            />
          </Field>
          <Field label="Etage Ziel" htmlFor="seo-lead-senior-destination-floor">
            <input
              id="seo-lead-senior-destination-floor"
              name="seniorDestinationFloor"
              value={seniorDestinationFloor}
              onChange={(event) => setSeniorDestinationFloor(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. EG, 1. OG, Aufzug"
            />
          </Field>
          <Field label="Aufzug vorhanden?" htmlFor="seo-lead-senior-elevator">
            <select
              id="seo-lead-senior-elevator"
              name="seniorElevator"
              value={seniorElevator}
              onChange={(event) => setSeniorElevator(event.target.value)}
              className={fieldClass(false)}
            >
              {seniorYesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Umfang" htmlFor="seo-lead-senior-scope">
            <select
              id="seo-lead-senior-scope"
              name="seniorScope"
              value={seniorScope}
              onChange={(event) => setSeniorScope(event.target.value)}
              className={fieldClass(false)}
            >
              {seniorScopeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Frist / Termin" htmlFor="seo-lead-senior-deadline">
            <input
              id="seo-lead-senior-deadline"
              name="seniorDeadline"
              value={seniorDeadline}
              onChange={(event) => setSeniorDeadline(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. bis Monatsende, flexibel"
            />
          </Field>
          <Field label="Vorhandenes Angebot" htmlFor="seo-lead-senior-existing-offer">
            <select
              id="seo-lead-senior-existing-offer"
              name="seniorExistingOffer"
              value={seniorExistingOffer}
              onChange={(event) => setSeniorExistingOffer(event.target.value)}
              className={fieldClass(false)}
            >
              {seniorYesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sensible Situation optional" htmlFor="seo-lead-senior-sensitive-situation">
            <select
              id="seo-lead-senior-sensitive-situation"
              name="seniorSensitiveSituation"
              value={seniorSensitiveSituation}
              onChange={(event) => setSeniorSensitiveSituation(event.target.value)}
              className={fieldClass(false)}
            >
              {seniorYesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="space-y-3 sm:col-span-2">
            <p className="text-sm font-black text-slate-950">Zusatzbedarf</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {seniorExtraNeedOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="seniorExtraNeeds"
                    value={option.value}
                    checked={seniorExtraNeeds.includes(option.value)}
                    onChange={() => toggleSeniorExtraNeed(option.value)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-700"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <p className="text-xs font-semibold leading-5 text-slate-600 sm:col-span-2">
            Alle Seniorenumzug-Zusatzfelder sind optional. Bitte keine privaten Details senden, die für die erste Einordnung nicht nötig sind. Keine Pflege-, Rechts-, Preis- oder Soforttermin-Garantie.
          </p>
        </div>
      ) : null}

      {isPianoTransport ? (
        <div className="grid gap-4 rounded-lg border border-amber-100 bg-amber-50/50 p-4 sm:grid-cols-2">
          <Field label="Instrumentart" htmlFor="seo-lead-piano-instrument-type">
            <select
              id="seo-lead-piano-instrument-type"
              name="pianoInstrumentType"
              value={pianoInstrumentType}
              onChange={(event) => setPianoInstrumentType(event.target.value)}
              className={fieldClass(false)}
            >
              {pianoInstrumentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Startort" htmlFor="seo-lead-piano-start-location">
            <input
              id="seo-lead-piano-start-location"
              name="pianoStartLocation"
              value={pianoStartLocation}
              onChange={(event) => setPianoStartLocation(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Regensburg Westenviertel"
            />
          </Field>
          <Field label="Zielort" htmlFor="seo-lead-piano-destination">
            <input
              id="seo-lead-piano-destination"
              name="pianoDestination"
              value={pianoDestination}
              onChange={(event) => setPianoDestination(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Lappersdorf, Innenstadt, Umland"
            />
          </Field>
          <Field label="Etage Start" htmlFor="seo-lead-piano-start-floor">
            <input
              id="seo-lead-piano-start-floor"
              name="pianoStartFloor"
              value={pianoStartFloor}
              onChange={(event) => setPianoStartFloor(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. 2. OG, EG, Keller"
            />
          </Field>
          <Field label="Etage Ziel" htmlFor="seo-lead-piano-destination-floor">
            <input
              id="seo-lead-piano-destination-floor"
              name="pianoDestinationFloor"
              value={pianoDestinationFloor}
              onChange={(event) => setPianoDestinationFloor(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. 1. OG, EG"
            />
          </Field>
          <Field label="Aufzug vorhanden?" htmlFor="seo-lead-piano-elevator">
            <select
              id="seo-lead-piano-elevator"
              name="pianoElevator"
              value={pianoElevator}
              onChange={(event) => setPianoElevator(event.target.value)}
              className={fieldClass(false)}
            >
              {pianoAccessOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Treppenhaus eng?" htmlFor="seo-lead-piano-narrow-stairs">
            <select
              id="seo-lead-piano-narrow-stairs"
              name="pianoNarrowStairs"
              value={pianoNarrowStairs}
              onChange={(event) => setPianoNarrowStairs(event.target.value)}
              className={fieldClass(false)}
            >
              {pianoAccessOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Fotos vorhanden?" htmlFor="seo-lead-piano-photos">
            <select
              id="seo-lead-piano-photos"
              name="pianoPhotos"
              value={pianoPhotos}
              onChange={(event) => setPianoPhotos(event.target.value)}
              className={fieldClass(false)}
            >
              {pianoAccessOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Vorhandenes Angebot" htmlFor="seo-lead-piano-existing-offer">
            <select
              id="seo-lead-piano-existing-offer"
              name="pianoExistingOffer"
              value={pianoExistingOffer}
              onChange={(event) => setPianoExistingOffer(event.target.value)}
              className={fieldClass(false)}
            >
              <option value="">noch offen</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar / mehrere Angebote</option>
            </select>
          </Field>
          <Field label="Sorge / Problem" htmlFor="seo-lead-piano-concern">
            <select
              id="seo-lead-piano-concern"
              name="pianoConcern"
              value={pianoConcern}
              onChange={(event) => setPianoConcern(event.target.value)}
              className={fieldClass(false)}
            >
              {pianoConcernOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <p className="text-xs font-semibold leading-5 text-slate-600 sm:col-span-2">
            Alle Klaviertransport-Zusatzfelder sind optional. Fotos können später ergänzt werden. Eine Anfrage ist keine Buchung, keine Preiszusage und keine Verfügbarkeitsgarantie.
          </p>
        </div>
      ) : null}

      {isSolarPv ? (
        <div className="grid gap-4 rounded-lg border border-cyan-100 bg-cyan-50/50 p-4 sm:grid-cols-2">
          <Field label="Dachart" htmlFor="seo-lead-solar-roof-type">
            <input
              id="seo-lead-solar-roof-type"
              name="solarRoofType"
              value={solarRoofType}
              onChange={(event) => setSolarRoofType(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Flachdach, Schrägdach, Carport"
            />
          </Field>
          <Field label="Zugang zur Anlage" htmlFor="seo-lead-solar-access">
            <input
              id="seo-lead-solar-access"
              name="solarAccess"
              value={solarAccess}
              onChange={(event) => setSolarAccess(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Leiter, Dachausstieg, unklar"
            />
          </Field>
          <Field label="Modulumfang" htmlFor="seo-lead-solar-module-scope">
            <input
              id="seo-lead-solar-module-scope"
              name="solarModuleScope"
              value={solarModuleScope}
              onChange={(event) => setSolarModuleScope(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. 24 Module, ca. 60 m2"
            />
          </Field>
          <Field label="Sichtbare Verschmutzung" htmlFor="seo-lead-solar-visible-dirt">
            <input
              id="seo-lead-solar-visible-dirt"
              name="solarVisibleDirt"
              value={solarVisibleDirt}
              onChange={(event) => setSolarVisibleDirt(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Pollen, Staub, Vogelkot"
            />
          </Field>
          <Field label="Vorhandenes Angebot" htmlFor="seo-lead-solar-existing-offer">
            <select
              id="seo-lead-solar-existing-offer"
              name="solarExistingOffer"
              value={solarExistingOffer}
              onChange={(event) => setSolarExistingOffer(event.target.value)}
              className={fieldClass(false)}
            >
              <option value="">noch offen</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar / mehrere Angebote</option>
            </select>
          </Field>
          <Field label="Gewünschter Zeitraum" htmlFor="seo-lead-solar-timeframe">
            <input
              id="seo-lead-solar-timeframe"
              name="solarTimeframe"
              value={solarTimeframe}
              onChange={(event) => setSolarTimeframe(event.target.value)}
              className={fieldClass(false)}
              placeholder="z. B. Frühjahr, flexibel, vor Übergabe"
            />
          </Field>
          <Field label="Objektart Solar/PV" htmlFor="seo-lead-solar-object-type">
            <select
              id="seo-lead-solar-object-type"
              name="solarObjectType"
              value={solarObjectType}
              onChange={(event) => setSolarObjectType(event.target.value)}
              className={fieldClass(false)}
            >
              {solarObjectTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <p className="text-xs font-semibold leading-5 text-slate-600 sm:col-span-2">
            Fotos können später ergänzt werden. Die Anfrage löst keine automatische Buchung aus und enthält keine Ertrags- oder Verfügbarkeitszusage.
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
                  {germanText(option.label, option.label)}
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
          <Field label="Prüfgrund" htmlFor="seo-lead-offer-concern">
            <select
              id="seo-lead-offer-concern"
              name="offerConcern"
              value={offerConcern}
              onChange={(event) => setOfferConcern(event.target.value)}
              className={fieldClass(false)}
            >
              {offerConcernOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {germanText(option.label, option.label)}
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
                {germanText(option.label, option.label)}
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
          placeholder={germanText(lead.defaultMessagePlaceholder, lead.defaultMessagePlaceholder)}
        />
      </Field>

      <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold leading-6 text-slate-600">
        Datenschutz: Eine Anfrage ist noch keine Buchung. Bitte keine Zugangscodes, Ausweisdaten oder Zahlungsdaten senden. Adresse und Fotos können später ergänzt werden.
      </p>

      <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
        <input
          id="seo-lead-privacy"
          name="privacyConsent"
          type="checkbox"
          checked={privacyConsent}
          onChange={(event) => setPrivacyConsent(event.target.checked)}
          aria-invalid={Boolean(errors.privacy)}
          aria-describedby={errors.privacy ? "seo-lead-privacy-error" : undefined}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700"
        />
        <span>
          Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung dieser Anfrage verarbeitet.
        </span>
      </label>
      {errors.privacy ? (
        <p id="seo-lead-privacy-error" className="flex gap-2 text-sm font-semibold leading-6 text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {germanText(errors.privacy, errors.privacy)}
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
          {germanText(errors.spam || errors.form, errors.spam || errors.form || "")}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-label="Anfrage senden"
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
      </fieldset>
      </form>
    </div>
  );
}
