"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  MapPin,
  PackageOpen,
  Shield,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { germanizeDeep } from "@/lib/german-text";
import { cn } from "@/lib/utils";
import { useCalculatorStore } from "@/store/calculatorStore";

type ServiceType =
  | "umzug"
  | "reinigung"
  | "entsorgung"
  | "bueroumzug"
  | "seniorenumzug"
  | "klaviertransport"
  | "einlagerung"
  | "malerarbeiten"
  | "akteneinlagerung"
  | "leerfahrt"
  | null;

type StoredConversionEvent = {
  event?: string;
  source?: string;
  channel?: string;
  href?: string;
  path?: string;
  search?: string;
  timestamp?: number;
  journeyId?: string;
  eventId?: string;
  dataset?: {
    intent?: string;
    priority?: string;
    contactChannel?: string;
  };
};

const JOURNEY_ID_KEY = "floxant:journey_id";
const LAST_CONVERSION_KEY = "floxant:last_conversion_event";
const CONVERSION_HISTORY_KEY = "floxant:conversion_history";

function parseStoredConversionEvent(value: string | null): StoredConversionEvent | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function readConversionJourneySnapshot() {
  if (typeof window === "undefined") return null;

  try {
    const journeyId = window.localStorage.getItem(JOURNEY_ID_KEY) || "";
    const lastEvent = parseStoredConversionEvent(window.localStorage.getItem(LAST_CONVERSION_KEY));
    const rawHistory = JSON.parse(window.localStorage.getItem(CONVERSION_HISTORY_KEY) || "[]");
    const recentEvents: StoredConversionEvent[] = Array.isArray(rawHistory)
      ? rawHistory.filter((item) => item && typeof item === "object").slice(0, 6)
      : [];
    const lastSignal = lastEvent || recentEvents[0] || null;

    if (!journeyId && !lastSignal && recentEvents.length === 0) return null;

    return {
      journeyId: journeyId || lastSignal?.journeyId || "",
      lastEvent: lastSignal,
      recentEvents,
      lastEventName: lastSignal?.event || "",
      lastSource: lastSignal?.source || "",
      lastChannel: lastSignal?.channel || lastSignal?.dataset?.contactChannel || "",
      lastIntent: lastSignal?.dataset?.intent || "",
      lastPriority: lastSignal?.dataset?.priority || "",
      lastPath: lastSignal?.path || "",
      lastHref: lastSignal?.href || "",
    };
  } catch {
    return null;
  }
}

function normalizeBookingService(value: string | null): ServiceType {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();

  if (normalized === "entruempelung" || normalized === "entrümpelung") {
    return "entsorgung";
  }

  if (
    [
      "umzug",
      "reinigung",
      "entsorgung",
      "bueroumzug",
      "seniorenumzug",
      "klaviertransport",
      "einlagerung",
      "malerarbeiten",
      "akteneinlagerung",
      "leerfahrt",
    ].includes(normalized)
  ) {
    return normalized as ServiceType;
  }

  return null;
}

function looksLikeDusseldorf(value: string) {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    normalized.includes("dusseldorf") ||
    normalized.includes("duesseldorf") ||
    /\b40[2-6]\d{2}\b/.test(normalized)
  );
}

function normalizeTrackingValue(value: string | null) {
  return (value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const REGENSBURG_CLEANING_BOOKING_SOURCES = new Set([
  "gewerbereinigung_regensburg",
  "bueroreinigung_regensburg",
  "buroreinigung_regensburg",
  "praxisreinigung_regensburg",
  "hotelreinigung_regensburg",
  "fensterreinigung_regensburg",
  "baureinigung_regensburg",
  "teppichreinigung_regensburg",
  "treppenhausreinigung_regensburg",
  "unterhaltsreinigung_regensburg",
  "grundreinigung_regensburg",
]);

function getRegensburgCleaningBookingSource(...values: string[]) {
  return values.find((value) => REGENSBURG_CLEANING_BOOKING_SOURCES.has(value)) || "";
}

interface BookingState {
  step: number;
  service: ServiceType;
  details: {
    startAddress: string;
    endAddress: string;
    date: string;
    scope: string;
    access: string;
    budget: string;
  };
  upgrades: string[];
}

type RequestFlowVariant = "express" | "budget" | "upload" | "detailed";

type WizardStepItem = {
  number: number;
  displayNumber: number;
  title: string;
};

function getRequestFlowVariant(entry: string, urgency: string): RequestFlowVariant {
  const value = `${entry} ${urgency}`;

  if (
    value.includes("express") ||
    value.includes("24h") ||
    value.includes("sofort") ||
    value.includes("schaden") ||
    value.includes("plan_b")
  ) {
    return "express";
  }

  if (value.includes("budget") || value.includes("preis") || value.includes("rechner") || value.includes("kosten")) {
    return "budget";
  }

  if (value.includes("foto") || value.includes("upload") || value.includes("angebot")) {
    return "upload";
  }

  return "detailed";
}

interface SmartBookingWizardProps {
  dict: any;
  initialService?: ServiceType;
  initialRegion?: "regensburg-bayern" | "duesseldorf";
  initialEntry?: string;
  forceVisible?: boolean;
}

const wizardServiceMeta: Record<
  Exclude<ServiceType, null>,
  { label: string; drivers: string[] }
> = {
  umzug: {
    label: "Umzug",
    drivers: ["Route", "Zugang", "Terminfenster", "Extras"],
  },
  reinigung: {
    label: "Reinigung",
    drivers: ["Objekt", "Zustand", "Terminfenster", "Extras"],
  },
  entsorgung: {
    label: "Entrümpelung",
    drivers: ["Volumen", "Zugang", "Materialart", "Terminfenster"],
  },
  bueroumzug: {
    label: "Büroumzug",
    drivers: ["Standort", "Arbeitsplätze", "Terminfenster", "Montage"],
  },
  seniorenumzug: {
    label: "Seniorenumzug",
    drivers: ["Begleitung", "Route", "Zugang", "Terminfenster"],
  },
  klaviertransport: {
    label: "Klaviertransport",
    drivers: ["Transportweg", "Zugang", "Sicherung", "Terminfenster"],
  },
  einlagerung: {
    label: "Einlagerung",
    drivers: ["Abholort", "Volumen", "Lagerdauer", "Terminfenster"],
  },
  malerarbeiten: {
    label: "Malerarbeiten",
    drivers: ["Objekt", "Umfang", "Terminfenster", "Zusatzarbeiten"],
  },
  akteneinlagerung: {
    label: "Akteneinlagerung",
    drivers: ["Abholort", "Menge", "Lagerdauer", "Zugriff"],
  },
  leerfahrt: {
    label: "Leer-Rückfahrt",
    drivers: ["Startgebiet", "Zielrichtung", "Ladevolumen", "Terminfenster"],
  },
};

function SmartBookingWizardInner({ dict, initialService, initialRegion, initialEntry }: SmartBookingWizardProps) {
  const [initialized, setInitialized] = useState(false);
  const searchParams = useSearchParams();
  const queryService = searchParams.get("service");
  const queryRegion = [searchParams.get("region"), searchParams.get("city"), searchParams.get("standort")]
    .filter(Boolean)
    .join(" ");
  const isDusseldorfQueryContext =
    initialRegion === "duesseldorf" || (!initialRegion && looksLikeDusseldorf(queryRegion));
  const queryServicePreset = useMemo(
    () => normalizeBookingService(initialService || queryService),
    [initialService, queryService],
  );
  const isDusseldorfDisposalQueryContext =
    isDusseldorfQueryContext && queryServicePreset === "entsorgung";
  const isDusseldorfCleaningQueryContext =
    isDusseldorfQueryContext && !isDusseldorfDisposalQueryContext;
  const storeService = useCalculatorStore((s) => s.serviceType);
  const storeBase = useCalculatorStore((s) => s.baseDetails);
  const storeLead = useCalculatorStore((s) => s.leadDetails);
  const setMode = useCalculatorStore((s) => s.setMode);
  const queryUtmSource = searchParams.get("utm_source") || searchParams.get("source") || "";
  const queryUtmMedium = searchParams.get("utm_medium") || "";
  const queryUtmCampaign = searchParams.get("utm_campaign") || "";
  const queryUtmContent = searchParams.get("utm_content") || "";
  const queryGclid = searchParams.get("gclid") || "";
  const queryUrgency = searchParams.get("urgency") || searchParams.get("dringlichkeit") || "";
  const queryPreferredContact = searchParams.get("contact") || searchParams.get("kontakt") || "";
  const queryEntry = initialEntry || searchParams.get("entry") || searchParams.get("weg") || "";
  const queryReferralCode =
    searchParams.get("ref") || searchParams.get("partner_code") || searchParams.get("referral_code") || "";
  const normalizedSource = normalizeTrackingValue(queryUtmSource || storeLead?.utmSource || "");
  const normalizedCampaign = normalizeTrackingValue(queryUtmCampaign || storeLead?.utmCampaign || "");
  const normalizedUrgency = normalizeTrackingValue(queryUrgency);
  const normalizedEntry = normalizeTrackingValue(queryEntry);
  const requestFlow = getRequestFlowVariant(normalizedEntry, normalizedUrgency);
  const isExpressFlow = requestFlow === "express";
  const isBudgetFlow = requestFlow === "budget";
  const isUploadFlow = requestFlow === "upload";
  const isDetailedFlow = requestFlow === "detailed";
  const shouldSkipUpgrades = !isDetailedFlow;
  const isGoogleMapsContext = ["google_maps", "google_business_profile", "gbp", "maps"].some(
    (value) => normalizedSource.includes(value),
  );
  const isGoogleAdsContext = ["google_ads", "adwords", "cpc"].some(
    (value) => normalizedSource.includes(value) || normalizeTrackingValue(queryUtmMedium).includes(value),
  );

  const defaultBooking = {
    steps: {
      service: "Leistung",
      details: "Eckdaten",
      upgrades: "Extras",
      contact: "Kontakt",
    },
    headings: {
      service_selection: "Womit dürfen wir starten?",
      service_subtitle: "Wählen Sie Ihre Hauptleistung.",
      details_prefix: "Angaben zu",
      upgrades_title: "Passende Extras",
      upgrades_subtitle: "Ergänzen Sie nur, was für Ihren Auftrag wirklich relevant ist.",
      summary_title: "Kontaktdaten",
      summary_subtitle: "Wir melden uns passend zu Ihrer Anfrage",
      success_title: "Anfrage gesendet",
      success_message: "Vielen Dank {name}",
      success_email: "Wir melden uns über {email}",
    },
    services: {
      umzug: { label: "Umzug", desc: "Wohnungs- und Firmenumzug" },
      reinigung: { label: "Reinigung", desc: "Objekt, Zustand, Termin und Budget klären" },
      entsorgung: { label: "Entrümpelung", desc: "Räumung und Entsorgung" },
    },
    form: {
      start_address: "Startadresse",
      end_address: "Zieladresse",
      date: "Wunschtermin",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      photos: "Fotos",
      photos_placeholder: "Fotos hinzufügen",
      photos_count: "{count} Dateien ausgewählt",
      placeholder_address: "Adresse oder Ort",
      placeholder_name: "Ihr Name",
      placeholder_email: "name@beispiel.de",
      placeholder_phone: "+49 ...",
    },
    buttons: {
      back: "Zurück",
      next: "Weiter",
      finish: "Weiter",
      submit: "Anfrage absenden",
      sending: "Wird gesendet...",
      new_request: "Neue Anfrage",
    },
    upgrades: {
      ladies_team: {
        title: "Frauen-Team",
        desc: "Besonders sensible Einsätze",
      },
      "24h_service": {
        title: "24h-Service",
        desc: "Kurzfristige Verfügbarkeit",
      },
      furniture_opt: {
        title: "Möbelservice",
        desc: "Zusatzhilfe bei Möbeln",
      },
      storage_rot: {
        title: "Zwischenlagerung",
        desc: "Temporäre Lagerlösung",
      },
      maybe_box: {
        title: "Unsicheres Volumen",
        desc: "Später präzisieren",
      },
      clean_shield: {
        title: "Schutzservice",
        desc: "Zusätzliche Absicherung",
      },
    },
    error: {
      submit: "Fehler beim Senden",
      generic: "Ein Fehler ist aufgetreten",
    },
  };

  const t = germanizeDeep(dict?.booking || defaultBooking);

  const [state, setState] = useState<BookingState>({
    step: 1,
    service: null,
    details: {
      startAddress: "",
      endAddress: "",
      date: "",
      scope: "",
      access: "",
      budget: "",
    },
    upgrades: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [contactExpanded, setContactExpanded] = useState(() => isDetailedFlow || isUploadFlow);
  const [todayInputValue, setTodayInputValue] = useState("");

  useEffect(() => {
    setTodayInputValue(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    setInitialized(true);
    const presetService = initialService || (isDusseldorfDisposalQueryContext
      ? "entsorgung"
      : isDusseldorfCleaningQueryContext
        ? "reinigung"
        : queryServicePreset || (storeService as ServiceType));

    if (presetService) {
      setState((prev) => ({
        ...prev,
        service: presetService,
        details: {
          ...prev.details,
          startAddress: storeBase.fromAddress || "",
          endAddress: storeBase.toAddress || "",
          date: storeBase.moveDate || "",
          scope: prev.details.scope,
          access: prev.details.access,
          budget: prev.details.budget,
        },
        step: 2,
      }));
    }
    if (storeLead) {
      setFormData({
        name: storeLead.customerName || "",
        email: storeLead.customerEmail || "",
        phone: storeLead.customerPhone || "",
        message: "",
      });
    }
  }, [
    isDusseldorfCleaningQueryContext,
    isDusseldorfDisposalQueryContext,
    initialService,
    queryServicePreset,
    storeBase,
    storeLead,
    storeService,
  ]);

  useEffect(() => {
    if (isDetailedFlow || isUploadFlow) {
      setContactExpanded(true);
      return;
    }
    setDetailsExpanded(false);
    setContactExpanded(false);
  }, [isDetailedFlow, isUploadFlow]);

  const steps = useMemo<WizardStepItem[]>(() => {
    const detailTitle =
      requestFlow === "express"
        ? "2 Fragen"
        : requestFlow === "budget"
          ? "Preisrahmen"
          : requestFlow === "upload"
            ? "Prüfung"
            : t?.steps?.details || "Details";

    if (shouldSkipUpgrades) {
      return [
        { number: 1, displayNumber: 1, title: t?.steps?.service || "Service" },
        { number: 2, displayNumber: 2, title: detailTitle },
        { number: 4, displayNumber: 3, title: t?.steps?.contact || "Kontakt" },
      ];
    }

    return [
      { number: 1, displayNumber: 1, title: t?.steps?.service || "Service" },
      { number: 2, displayNumber: 2, title: detailTitle },
      { number: 3, displayNumber: 3, title: t?.steps?.upgrades || "Extras" },
      { number: 4, displayNumber: 4, title: t?.steps?.contact || "Kontakt" },
    ];
  }, [requestFlow, shouldSkipUpgrades, t]);

  const isDusseldorfServiceConflict =
    state.service !== "reinigung" &&
    state.service !== "entsorgung" &&
    looksLikeDusseldorf(`${state.details.startAddress} ${state.details.endAddress}`);

  const isStepTwoValid = useMemo(() => {
    const hasStart = state.details.startAddress.trim().length >= 2;

    return Boolean(state.service && hasStart && !isDusseldorfServiceConflict);
  }, [isDusseldorfServiceConflict, state.details, state.service]);

  const isContactValid = useMemo(
    () => {
      const email = formData.email.trim();
      const emailLooksValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      return formData.name.trim().length >= 2 && formData.phone.trim().length >= 6 && emailLooksValid;
    },
    [formData]
  );

  const currentServiceLabel =
    state.service &&
    germanizeDeep(t?.services?.[state.service]?.label || wizardServiceMeta[state.service].label);

  const primaryLocationLabel =
    state.service === "reinigung"
      ? "Adresse / Objektort"
      : state.service === "entsorgung"
        ? "Abholort / Einsatzort"
        : state.service === "leerfahrt"
          ? "Startort / Abholort"
          : state.service === "bueroumzug"
          ? "Aktueller Firmenstandort"
          : t?.form?.start_address || "Startadresse";

  const briefingLabels =
    state.service === "reinigung"
      ? {
          scope: "Fläche / Reinigungsart falls bekannt",
          scopePlaceholder: "z. B. 75 m², Endreinigung, Küche/Bad/Fenster",
          access: "Zustand / Zugang falls bekannt",
          accessPlaceholder: "z. B. leerstehend, möbliert, starke Verschmutzung",
          budget: "Budget / Preisrahmen falls bekannt",
        }
      : state.service === "entsorgung"
        ? {
            scope: "Umfang / Objektart falls bekannt",
            scopePlaceholder: "z. B. Keller, Garage, 12 m³, Sperrmüll",
            access: "Etage / Zugang falls bekannt",
            accessPlaceholder: "z. B. 2. OG ohne Aufzug, Innenhof, kurzer Laufweg",
            budget: "Budget / Preisrahmen falls bekannt",
          }
        : state.service === "leerfahrt"
          ? {
              scope: "Strecke / Umfang falls bekannt",
              scopePlaceholder: "z. B. Regensburg -> München, 8 Kartons, 1 Sofa",
              access: "Terminflexibilität / Zugang falls bekannt",
              accessPlaceholder: "z. B. flexibel diese Woche, EG, kurzer Laufweg",
              budget: "Budget / Preisrahmen falls bekannt",
            }
          : {
            scope: "Volumen / Wohnungsgröße falls bekannt",
            scopePlaceholder: "z. B. 2 Zimmer, 45 Kartons, größere Möbel",
            access: "Etage / Aufzug / Zugang falls bekannt",
            accessPlaceholder: "z. B. 3. OG, Aufzug ja, langer Laufweg",
            budget: "Budget / Preisrahmen falls bekannt",
          };

  const flowDetailsIntro = useMemo(() => {
    if (isExpressFlow) {
      return {
        kicker: "Express-Start",
        title: `${currentServiceLabel || "Anfrage"} schnell einordnen`,
        subtitle: "Nur Ort und Anliegen. Danach reicht Name und Telefon für den Rückruf.",
        badge: "2 kurze Fragen",
        scopeLabel: "Was muss schnell geklärt werden?",
        scopePlaceholder: "z. B. heute noch Rückruf, Termin kippt, Übergabe steht an",
      };
    }

    if (isBudgetFlow) {
      return {
        kicker: "Kostenrahmen",
        title: "Kosten grob einschätzen lassen",
        subtitle: "Ort, Umfang und Preisgefühl reichen für eine erste realistische Einordnung.",
        badge: "3 Fragen",
        scopeLabel: briefingLabels.scope,
        scopePlaceholder: briefingLabels.scopePlaceholder,
      };
    }

    if (isUploadFlow) {
      return {
        kicker: "Prüfung",
        title: "Fotos oder Angebot richtig zuordnen",
        subtitle: "Ort und kurzer Kontext reichen. Die Dateien ergänzen Sie im letzten Schritt.",
        badge: "2 Fragen",
        scopeLabel: "Was sollen wir prüfen?",
        scopePlaceholder: "z. B. vorhandenes Angebot, Fotos vom Objekt, unsichere Menge",
      };
    }

    return {
      kicker: "Anfrage",
      title: `${currentServiceLabel || "Service"} sauber vorbereiten`,
      subtitle: "Erst der wichtigste Ort. Weitere Details kommen Schritt für Schritt.",
      badge: "geführt",
      scopeLabel: briefingLabels.scope,
      scopePlaceholder: briefingLabels.scopePlaceholder,
    };
  }, [
    briefingLabels.access,
    briefingLabels.budget,
    briefingLabels.scope,
    briefingLabels.scopePlaceholder,
    currentServiceLabel,
    isBudgetFlow,
    isExpressFlow,
    isUploadFlow,
  ]);

  const showDestinationField =
    isDetailedFlow && (state.service === "umzug" || state.service === "leerfahrt");
  const showFlowScopeField = !isDetailedFlow;
  const showFlowBudgetField = isBudgetFlow;
  const optionalDetailFieldCount = 3;

  const detailsGuide = useMemo(() => {
    if (isExpressFlow) {
      return {
        title: "Schnell starten, Details später.",
        required: "Ort und kurzer Hinweis reichen für den ersten Rückruf.",
        optional: "Mehr Angaben sind nicht nötig, wenn es schnell gehen soll.",
      };
    }

    if (isBudgetFlow) {
      return {
        title: "Preisrahmen ohne langes Formular.",
        required: "Ort, Umfang und Budget reichen für die erste Einordnung.",
        optional: "Fotos und Nachricht können später ergänzt werden.",
      };
    }

    if (isUploadFlow) {
      return {
        title: "Erst zuordnen, dann Dateien senden.",
        required: "Ort und Prüfgrund reichen, die Dateien kommen im Kontakt-Schritt.",
        optional: "Weitere Angaben können im Rückruf geklärt werden.",
      };
    }

    if (state.service === "reinigung") {
      return {
        title: "Erst Objekt und Termin, Details danach.",
        required: "Adresse oder Objektort reicht als Pflichtangabe.",
        optional: "Fläche, Zustand, Fotos und Budget können Sie ergänzen, wenn Sie es wissen.",
      };
    }

    if (state.service === "entsorgung") {
      return {
        title: "Erst Abholort, dann Menge und Zugang.",
        required: "Der Einsatzort reicht, damit FLOXANT den Fall zuordnen kann.",
        optional: "Menge, Etage, Fotos und Budget machen die Rückmeldung schneller.",
      };
    }

    if (state.service === "leerfahrt") {
      return {
        title: "Erst Richtung nennen, Details danach.",
        required: "Startort oder Abholort reicht als erster Fixpunkt.",
        optional: "Zielrichtung, Terminflexibilität und Ladeumfang helfen bei freier Kapazität.",
      };
    }

    return {
      title: "Erst Auszugsort, dann Ziel, Datum und Umfang.",
      required: "Startadresse oder Ort reicht, um die Anfrage zu beginnen.",
      optional: "Zielort, Datum, Wohnungsgröße, Zugang und Budget können Sie danach ergänzen.",
    };
  }, [isBudgetFlow, isExpressFlow, isUploadFlow, state.service]);

  const contactReadiness = useMemo(
    () => {
      const email = formData.email.trim();

      return [
        {
          label: "Name",
          ready: formData.name.trim().length >= 2,
          text: "damit wir Sie richtig zuordnen",
        },
        {
          label: "Telefon",
          ready: formData.phone.trim().length >= 6,
          text: "für schnelle Rückfragen",
        },
        {
          label: "E-Mail",
          ready: !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
          text: "optional, aber hilfreich",
        },
      ];
    },
    [formData.email, formData.name, formData.phone],
  );

  const visibleContactReadiness = useMemo(
    () =>
      contactExpanded
        ? contactReadiness
        : contactReadiness.filter((item) => item.label !== "E-Mail"),
    [contactExpanded, contactReadiness],
  );

  const contactIntro = useMemo(() => {
    if (isExpressFlow) {
      return {
        kicker: "Express-Rückruf",
        title: "Nur Name und Telefon.",
        subtitle: "Damit wir schnell nachfragen können. E-Mail, Fotos und Nachricht bleiben optional.",
        badge: "schnell",
        expandLabel: "Nachricht oder Fotos ergänzen",
      };
    }

    if (isBudgetFlow) {
      return {
        kicker: "Rückmeldung zum Preisrahmen",
        title: "Kontakt für die Einschätzung.",
        subtitle: "Name und Telefon reichen. Fotos oder eine kurze Nachricht können den Preisrahmen verbessern.",
        badge: "mittel",
        expandLabel: "E-Mail, Nachricht oder Fotos ergänzen",
      };
    }

    if (isUploadFlow) {
      return {
        kicker: "Fotos / Angebot",
        title: "Dateien und Kontakt senden.",
        subtitle: "Laden Sie Fotos oder ein vorhandenes Angebot hoch, damit FLOXANT sauber prüfen kann.",
        badge: "Prüfung",
        expandLabel: "Dateien anzeigen",
      };
    }

    return {
      kicker: "Letzter Schritt",
      title: "Kontakt und Details senden.",
      subtitle: "Je klarer die Angaben sind, desto gezielter fällt die Rückmeldung aus.",
      badge: "detailliert",
      expandLabel: "Optionale Angaben anzeigen",
    };
  }, [isBudgetFlow, isExpressFlow, isUploadFlow]);

  const nextStep = () => {
    setState((prev) => ({
      ...prev,
      step: prev.step === 2 && shouldSkipUpgrades ? 4 : Math.min(prev.step + 1, 4),
    }));
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      step: prev.step === 4 && shouldSkipUpgrades ? 2 : Math.max(prev.step - 1, 1),
    }));
  };

  const resetWizard = () => {
    setState({
      step: 1,
      service: null,
      details: {
        startAddress: "",
        endAddress: "",
        date: "",
        scope: "",
        access: "",
        budget: "",
      },
      upgrades: [],
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setFiles([]);
    setIsSuccess(false);
    setSubmitError("");
    setIsSubmitting(false);
    setDetailsExpanded(false);
    setContactExpanded(isDetailedFlow || isUploadFlow);
    setMode("selection");
  };

  const compressImage = async (file: File): Promise<File> =>
    new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve(file);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 1200;
          const maxHeight = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              resolve(
                new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                  type: "image/jpeg",
                })
              );
            },
            "image/jpeg",
            0.7
          );
        };

        img.onerror = () => resolve(file);
      };

      reader.onerror = () => resolve(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!state.service || !isStepTwoValid || !isContactValid) {
      setSubmitError(t?.error?.generic || "Bitte prüfen Sie die Angaben und ergänzen Sie Name und Telefon.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const createdAt = new Date().toISOString();
    const serviceMeta = wizardServiceMeta[state.service];
    const servicePageBookingSource = getRegensburgCleaningBookingSource(normalizedSource, normalizedEntry);
    const bookingSource = isDusseldorfDisposalQueryContext
      ? "duesseldorf_disposal_booking"
      : isDusseldorfCleaningQueryContext
        ? "duesseldorf_cleaning_booking"
        : normalizedEntry.includes("budget")
          ? "booking_budget_request"
        : normalizedEntry.includes("express")
          ? "booking_express_check"
        : normalizedEntry.includes("foto") || normalizedEntry.includes("upload")
          ? "booking_photo_upload_request"
        : normalizedEntry.includes("schaden") || normalizedEntry.includes("plan_b")
          ? "booking_plan_b_request"
        : normalizedEntry.includes("keller") || normalizedEntry.includes("muellraum")
          ? "booking_object_area_request"
        : state.service === "leerfahrt" || normalizedCampaign.includes("leerfahrt")
          ? "return_trip_booking"
          : normalizedUrgency.includes("24h") || normalizedSource.includes("homepage_24h")
            ? "homepage_24h_booking"
          : isGoogleAdsContext && state.service === "reinigung"
            ? "google_ads_cleaning_regensburg"
            : isGoogleMapsContext
              ? "google_maps_booking"
            : servicePageBookingSource
              ? servicePageBookingSource
              : "booking_page_wizard";
    const entryPoint = isDusseldorfDisposalQueryContext
      ? "/buchung?service=entsorgung&region=duesseldorf"
      : isDusseldorfCleaningQueryContext
        ? "/buchung?service=reinigung&region=duesseldorf"
        : "/buchung";
    const regionPreset = isDusseldorfQueryContext ? "duesseldorf" : "";
    const landingPage =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : entryPoint;
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    const conversionJourney = readConversionJourneySnapshot();
    const attribution = {
      landing_page: landingPage,
      referrer,
      utm_source: queryUtmSource || storeLead?.utmSource || "",
      utm_medium: queryUtmMedium || storeLead?.utmMedium || "",
      utm_campaign: queryUtmCampaign || storeLead?.utmCampaign || "",
      utm_content: queryUtmContent,
      gclid: queryGclid || storeLead?.gclid || "",
      urgency: queryUrgency,
      preferred_contact: queryPreferredContact,
      referral_code: queryReferralCode,
      referral_source: queryReferralCode ? "partnercode_url" : "",
      referral_landing_page: queryReferralCode ? landingPage : "",
      conversion_journey_id: conversionJourney?.journeyId || "",
      conversion_last_event: conversionJourney?.lastEventName || "",
      conversion_last_source: conversionJourney?.lastSource || "",
      conversion_last_channel: conversionJourney?.lastChannel || "",
      conversion_last_intent: conversionJourney?.lastIntent || "",
      conversion_last_priority: conversionJourney?.lastPriority || "",
      entry: normalizedEntry || "direkt",
      service: state.service,
      region: regionPreset || "regensburg_bayern",
      lead_source: bookingSource,
      created_at: createdAt,
    };
    const details = {
      contact: {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        callbackPreference: "jederzeit",
        notes: formData.message.trim(),
      },
      service: {
        type: state.service,
        source: bookingSource,
        entryPoint,
        entry: normalizedEntry || "direkt",
        presetFromUrl: state.service,
        regionPreset,
      },
      valuation: {
        systemPriceRangeMin: 0,
        systemPriceRangeMax: 0,
        priceRangeMin: 0,
        priceRangeMax: 0,
        valuationLabel: "Anfrage mit Eckdaten",
        valuationStage: "Anfrage wird geprüft",
        accuracyState: "Solide Vorplanung",
        topDrivers: [
          ...serviceMeta.drivers,
          ...(state.details.scope.trim() ? ["Umfang angegeben"] : []),
          ...(state.details.access.trim() ? ["Zugang beschrieben"] : []),
          ...(state.details.budget.trim() ? ["Budget genannt"] : []),
          ...(queryUrgency ? ["Dringlichkeit aus Einstieg"] : []),
          ...(state.upgrades.length ? ["Ausgewählte Extras"] : []),
          ...(files.length ? ["Bildmaterial vorhanden"] : []),
        ].slice(0, 5),
        priceExplanation:
          "Diese Anfrage enthält die wichtigsten Eckdaten für eine strukturierte Einschätzung. FLOXANT prüft daraus Route, Termin, Zugang und Zusatzleistungen vor dem nächsten Schritt.",
        pricingSignals: {
          inquiryMode: bookingSource,
          serviceType: state.service,
          regionPreset,
          attribution,
          conversionJourney,
          referralCode: queryReferralCode,
          requestedDate: state.details.date,
          startAddress: state.details.startAddress.trim(),
          endAddress: state.details.endAddress.trim(),
          scopeSummary: state.details.scope.trim(),
          accessNotes: state.details.access.trim(),
          customerBudgetText: state.details.budget.trim(),
          urgency: queryUrgency,
          preferredContact: queryPreferredContact,
          upgrades: state.upgrades,
          hasUploads: files.length > 0,
          customerMessage: formData.message.trim(),
        },
      },
      configuration: {
        requestContext: bookingSource,
        entryPoint,
        landingPage,
        referrer,
        leadSource: bookingSource,
        attribution,
        conversionJourney,
        referralCode: queryReferralCode,
        referralSource: queryReferralCode ? "partnercode_url" : "",
        referralLandingPage: queryReferralCode ? landingPage : "",
        utmSource: attribution.utm_source,
        utmMedium: attribution.utm_medium,
        utmCampaign: attribution.utm_campaign,
        utmContent: attribution.utm_content,
        regionPreset,
        region: regionPreset,
        serviceLabel: serviceMeta.label,
        fromAddress: state.details.startAddress.trim(),
        location: state.details.startAddress.trim(),
        toAddress: state.details.endAddress.trim(),
        moveDate: state.details.date,
        date: state.details.date,
        scopeSummary: state.details.scope.trim(),
        accessNotes: state.details.access.trim(),
        customerBudgetText: state.details.budget.trim(),
        urgency: queryUrgency,
        preferredContact: queryPreferredContact,
        selectedUpgrades: state.upgrades,
        message: formData.message.trim(),
      },
      metadata: {
        createdAt,
        intakeVersion: "1.3.0",
        source: bookingSource,
        entry: normalizedEntry || "direkt",
        servicePresetFromUrl: state.service,
        regionPreset,
        attribution,
        conversionJourney,
        clientContext: {
          entryPoint,
          landingPage,
          referrer,
          leadSource: bookingSource,
          entry: normalizedEntry || "direkt",
          bookingMode: "smart_wizard",
          regionPreset,
          hasUploads: files.length > 0,
          utmSource: queryUtmSource || storeLead?.utmSource || "",
          utmMedium: queryUtmMedium || storeLead?.utmMedium || "",
          utmCampaign: queryUtmCampaign || storeLead?.utmCampaign || "",
          utmContent: queryUtmContent,
          gclid: queryGclid || storeLead?.gclid || "",
          urgency: queryUrgency,
          preferredContact: queryPreferredContact,
          conversionJourneyId: conversionJourney?.journeyId || "",
          conversionLastEvent: conversionJourney?.lastEventName || "",
          conversionLastSource: conversionJourney?.lastSource || "",
          conversionLastChannel: conversionJourney?.lastChannel || "",
          conversionLastIntent: conversionJourney?.lastIntent || "",
          conversionLastPriority: conversionJourney?.lastPriority || "",
          referralCode: queryReferralCode,
          referralSource: queryReferralCode ? "partnercode_url" : "",
        },
      },
    };

    const submitData = new FormData();
    submitData.append("type", "booking_wizard");
    submitData.append("service", state.service);
    submitData.append("upgrades", JSON.stringify(state.upgrades));
    submitData.append("details", JSON.stringify(details));
    submitData.append("name", formData.name.trim());
    submitData.append("email", formData.email.trim());
    submitData.append("phone", formData.phone.trim());
    submitData.append("timestamp", createdAt);
    if (state.details.budget.trim()) {
      submitData.append("budget", state.details.budget.trim());
    }
    if (regionPreset) {
      submitData.append("region", regionPreset);
    }
    submitData.append("leadSource", bookingSource);
    submitData.append("entry", normalizedEntry || "direkt");
    submitData.append("landingPage", attribution.landing_page);
    submitData.append("referrer", attribution.referrer);
    submitData.append("utmSource", attribution.utm_source);
    submitData.append("utmMedium", attribution.utm_medium);
    submitData.append("utmCampaign", attribution.utm_campaign);
    submitData.append("utmContent", attribution.utm_content);
    submitData.append("gclid", attribution.gclid);
    submitData.append("urgency", queryUrgency);
    submitData.append("preferredContact", queryPreferredContact);
    submitData.append("conversionJourneyId", conversionJourney?.journeyId || "");
    submitData.append("conversionLastEvent", conversionJourney?.lastEventName || "");
    submitData.append("conversionLastSource", conversionJourney?.lastSource || "");
    submitData.append("conversionLastChannel", conversionJourney?.lastChannel || "");
    submitData.append("conversionLastIntent", conversionJourney?.lastIntent || "");
    submitData.append("conversionLastPriority", conversionJourney?.lastPriority || "");
    if (queryReferralCode) {
      submitData.append("referralCode", queryReferralCode);
      submitData.append("partnerCode", queryReferralCode);
    }

    try {
      if (files.length > 0) {
        for (const file of files) {
          const compressedFile = await compressImage(file);
          submitData.append("file", compressedFile);
        }
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        let errorMessage = t?.error?.submit || "Die Anfrage konnte nicht gesendet werden.";
        try {
          const payload = await response.json();
          errorMessage = payload?.message || payload?.error || errorMessage;
        } catch {
          // Keep the user-facing fallback when the server response is not JSON.
        }
        throw new Error(errorMessage);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : t?.error?.generic || "Die Anfrage konnte nicht gesendet werden."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderServiceSelection = () => {
    const options: Array<{
      id: string;
      label: string;
      desc: string;
      icon: typeof Box;
      isLink?: boolean;
      href?: string;
      eyebrow: string;
      accent: string;
    }> = [
      {
        id: "umzug",
        label: t?.services?.umzug?.label || "Umzug",
        desc: t?.services?.umzug?.desc || "Wohnungs- und Firmenumzug",
        icon: Box,
        eyebrow: "Umzug",
        accent: "from-blue-600 to-cyan-500",
      },
      {
        id: "reinigung",
        label: t?.services?.reinigung?.label || "Reinigung",
        desc: t?.services?.reinigung?.desc || "Wohnung, Endreinigung oder Objekt sauber einordnen",
        icon: Sparkles,
        eyebrow: "Reinigung",
        accent: "from-teal-500 to-cyan-500",
      },
      {
        id: "entsorgung",
        label: t?.services?.entsorgung?.label || "Entrümpelung",
        desc: t?.services?.entsorgung?.desc || "Räumung und Entsorgung",
        icon: Trash2,
        eyebrow: "Entrümpelung",
        accent: "from-orange-500 to-amber-400",
      },
    ];

    const visibleOptions = isDusseldorfDisposalQueryContext
      ? options.filter((option) => option.id === "entsorgung")
      : isDusseldorfCleaningQueryContext
        ? options.filter((option) => option.id === "reinigung")
        : options;

    return (
      <div className="space-y-5">
        {isDusseldorfDisposalQueryContext ? (
          <div className="rounded-[1.35rem] border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold leading-6 text-orange-950">
            Dieser Düsseldorf-Einstieg ist auf Entsorgung ausgerichtet: Umfang,
            Zugang, Fotos und Budget helfen bei der Prüfung.
          </div>
        ) : null}
        {isDusseldorfCleaningQueryContext ? (
          <div className="rounded-[1.35rem] border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold leading-6 text-teal-950">
            Dieser Düsseldorf-Einstieg wird hier nur als Reinigung geführt. Für andere
            Leistungsarten bitte den Regensburg-Bereich nutzen.
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {visibleOptions.map((option) =>
          option.isLink ? (
            <Link
              key={option.id}
              href={option.href || "/"}
              className="calc-option-card group rounded-[1.9rem] p-7"
              data-event={`select_service_${option.id === "entsorgung" ? "entruempelung" : option.id}`}
              data-source="booking_wizard"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-gradient-to-br ${option.accent} text-white shadow-[0_14px_34px_rgba(15,23,42,0.12)]`}
                >
                  <option.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {option.eyebrow}
                </span>
              </div>
              <h3 className="mt-7 text-xl font-semibold tracking-tight text-slate-950">
                {option.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{option.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                Preisrahmen nennen
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ) : (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setDetailsExpanded(false);
                setState((prev) => ({
                  ...prev,
                  service: option.id as ServiceType,
                  step: 2,
                }));
              }}
              className="calc-option-card group rounded-[1.9rem] p-7 text-start"
              data-event={`select_service_${option.id === "entsorgung" ? "entruempelung" : option.id}`}
              data-source="booking_wizard"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-gradient-to-br ${option.accent} text-white shadow-[0_14px_34px_rgba(15,23,42,0.12)]`}
                >
                  <option.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  {option.eyebrow}
                </span>
              </div>
              <h3 className="mt-7 text-xl font-semibold tracking-tight text-slate-950">
                {option.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{option.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                Einstieg wählen
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          )
        )}
        </div>
        <div className="grid gap-3 rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4 text-start md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
              Eigener Anfrageweg
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Sie haben eine feste Preisvorstellung? Dann senden Sie den Kostenrahmen direkt mit.
            </p>
          </div>
          <Link
            href="/anfrage-mit-preisrahmen"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
            data-event="submit_budget_request"
            data-source="booking_wizard"
          >
            Kostenrahmen senden
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  };

  const renderDetails = () => (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="calc-kicker justify-center">{flowDetailsIntro.kicker}</div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          {flowDetailsIntro.title}
        </h3>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500">
          {flowDetailsIntro.subtitle}
        </p>
      </div>

      <div className="space-y-6">
          <div className="rounded-[1.4rem] border border-blue-100 bg-blue-50/70 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Nur das Wichtigste
                </p>
                <h4 className="mt-1 text-base font-black text-slate-950">{detailsGuide.title}</h4>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{detailsGuide.required}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-black text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {flowDetailsIntro.badge}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FieldBox
              label={primaryLocationLabel}
              icon={<MapPin className="h-4 w-4" />}
            >
              <input
                value={state.details.startAddress}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    details: { ...prev.details, startAddress: e.target.value },
                  }))
                }
                className="calc-input h-11"
                placeholder={
                  t?.form?.placeholder_address || defaultBooking.form.placeholder_address
                }
              />
            </FieldBox>

            {showDestinationField ? (
              <FieldBox
                label={`${state.service === "leerfahrt" ? "Zielort / Richtung" : t?.form?.end_address || "Zieladresse"} falls bekannt`}
                icon={<MapPin className="h-4 w-4" />}
                required={false}
              >
                <input
                  value={state.details.endAddress}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      details: { ...prev.details, endAddress: e.target.value },
                    }))
                  }
                  className="calc-input h-11"
                  placeholder={
                    t?.form?.placeholder_address || defaultBooking.form.placeholder_address
                  }
                />
              </FieldBox>
            ) : null}

            {showFlowScopeField ? (
              <FieldBox
                label={flowDetailsIntro.scopeLabel}
                icon={isExpressFlow ? <MessageSquare className="h-4 w-4" /> : <PackageOpen className="h-4 w-4" />}
              >
                <input
                  value={state.details.scope}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      details: { ...prev.details, scope: e.target.value },
                    }))
                  }
                  className="calc-input h-11"
                  placeholder={flowDetailsIntro.scopePlaceholder}
                />
              </FieldBox>
            ) : null}

            {showFlowBudgetField ? (
              <FieldBox label={briefingLabels.budget} icon={<Clock className="h-4 w-4" />}>
                <input
                  value={state.details.budget}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      details: { ...prev.details, budget: e.target.value },
                    }))
                  }
                  className="calc-input h-11"
                  placeholder="z. B. 800 EUR, realistisch prüfen"
                  data-event="submit_budget_request"
                  data-source="booking_wizard_budget_field"
                />
              </FieldBox>
            ) : null}
          </div>

          {isDetailedFlow ? detailsExpanded ? (
            <div className="space-y-6 rounded-[1.4rem] border border-slate-200 bg-white p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Falls bekannt
                  </p>
                  <p className="mt-1 text-sm font-black leading-6 text-slate-950">
                    {optionalDetailFieldCount} weitere Fragen, nur wenn Sie es schon wissen.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailsExpanded(false)}
                  className="inline-flex min-h-9 w-fit items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-black text-slate-700 transition hover:bg-white"
                >
                  Kürzer anzeigen
                </button>
              </div>

              <FieldBox
                label={`${t?.form?.date || "Wunschtermin"} falls bekannt`}
                icon={<Calendar className="h-4 w-4" />}
                required={false}
              >
                <input
                  type="date"
                  min={todayInputValue || undefined}
                  value={state.details.date}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      details: { ...prev.details, date: e.target.value },
                    }))
                  }
                  className="calc-input h-11"
                />
              </FieldBox>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FieldBox label={briefingLabels.scope} icon={<PackageOpen className="h-4 w-4" />} required={false}>
              <input
                value={state.details.scope}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    details: { ...prev.details, scope: e.target.value },
                  }))
                }
                className="calc-input h-11"
                placeholder={briefingLabels.scopePlaceholder}
              />
            </FieldBox>

            <FieldBox label={briefingLabels.access} icon={<Shield className="h-4 w-4" />} required={false}>
              <input
                value={state.details.access}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    details: { ...prev.details, access: e.target.value },
                  }))
                }
                className="calc-input h-11"
                placeholder={briefingLabels.accessPlaceholder}
              />
            </FieldBox>
          </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setDetailsExpanded(true)}
              className="flex w-full items-center justify-between gap-4 rounded-[1.4rem] border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <span>
                <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Optional
                </span>
                <span className="mt-1 block text-sm font-black text-slate-950">
                  Weitere {optionalDetailFieldCount} Fragen öffnen
                </span>
                <span className="mt-1 block text-sm font-semibold leading-6 text-slate-500">
                  Datum, Umfang und Zugang ergänzen. Ein Ort reicht weiter für den Start.
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-blue-700" />
            </button>
          ) : null}

          {isDusseldorfServiceConflict ? (
            <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950">
              Dieser Düsseldorf-Einstieg ist bei FLOXANT nur für Reinigung vorgesehen.
              Bitte wählen Sie Reinigung oder ändern Sie den Ort.
            </div>
          ) : null}

          <div className="flex justify-center gap-4 pt-2">
            <PremiumButton variant="ghost" onClick={prevStep} type="button">
              <ArrowLeft className="h-4 w-4" />
              {t?.buttons?.back || "Zurück"}
            </PremiumButton>
            <PremiumButton onClick={nextStep} type="button" disabled={!isStepTwoValid}>
              {t?.buttons?.next || "Weiter"}
              <ArrowRight className="h-4 w-4" />
            </PremiumButton>
          </div>
        </div>

    </div>
  );

  const renderUpgrades = () => {
    const u = t?.upgrades || {};
    const relevantUpgrades = [
      {
        id: "ladies_team",
        title: u?.ladies_team?.title || "Frauen-Team",
        icon: Users,
        desc: u?.ladies_team?.desc || "",
        service: ["umzug", "reinigung"],
      },
      {
        id: "24h_service",
        title: u?.["24h_service"]?.title || "24h-Service",
        icon: Clock,
        desc: u?.["24h_service"]?.desc || "",
        service: ["umzug", "entsorgung", "reinigung"],
      },
      {
        id: "furniture_opt",
        title: u?.furniture_opt?.title || "Möbelservice",
        icon: Sparkles,
        desc: u?.furniture_opt?.desc || "",
        service: "umzug",
      },
      {
        id: "storage_rot",
        title: u?.storage_rot?.title || "Zwischenlagerung",
        icon: PackageOpen,
        desc: u?.storage_rot?.desc || "",
        service: "umzug",
      },
      {
        id: "maybe_box",
        title: u?.maybe_box?.title || "Unsicheres Volumen",
        icon: Box,
        desc: u?.maybe_box?.desc || "",
        service: ["umzug", "entsorgung"],
      },
      {
        id: "clean_shield",
        title: u?.clean_shield?.title || "Schutzservice",
        icon: Shield,
        desc: u?.clean_shield?.desc || "",
        service: ["umzug", "entsorgung"],
      },
    ].filter((item) =>
      Array.isArray(item.service)
        ? item.service.includes(state.service || "")
        : item.service === state.service
    );
    const selectedUpgradeCount = state.upgrades.length;
    const upgradeIntro = "Wählen Sie nur, was wirklich gebraucht wird. Sonst einfach weiter.";
    const continueLabel =
      selectedUpgradeCount > 0
        ? `${selectedUpgradeCount} Zusatzwunsch${selectedUpgradeCount > 1 ? "e" : ""} übernehmen`
        : "Ohne Extras weiter";

    return (
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <div className="calc-kicker justify-center">Optional</div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            Brauchen Sie noch etwas?
          </h3>
          <p className="text-slate-500">
            Kein Muss. Wenn nichts passt, gehen Sie direkt weiter.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                Kurze Auswahl
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-emerald-950">
                {upgradeIntro}
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-white bg-white px-3 py-1.5 text-[11px] font-black text-emerald-800 shadow-sm">
              {selectedUpgradeCount > 0 ? `${selectedUpgradeCount} ausgewählt` : "keine Auswahl nötig"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {relevantUpgrades.map((upgrade) => {
            const isSelected = state.upgrades.includes(upgrade.id);
            const Icon = upgrade.icon;

            return (
              <button
                key={upgrade.id}
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    upgrades: isSelected
                      ? prev.upgrades.filter((id) => id !== upgrade.id)
                      : [...prev.upgrades, upgrade.id],
                  }))
                }
                className="calc-chip-card relative rounded-[1.8rem] p-6 text-start"
                data-active={isSelected ? "true" : "false"}
                data-event="select_booking_upgrade"
                data-upgrade={upgrade.id}
                aria-pressed={isSelected}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl",
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em]",
                      isSelected
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-slate-50 text-slate-500",
                    )}
                  >
                    {isSelected ? "Ausgewählt" : "Optional"}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-slate-950">{upgrade.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {upgrade.desc || "Nur auswählen, wenn dieser Punkt für Ihre Anfrage wirklich wichtig ist."}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          <PremiumButton variant="ghost" onClick={prevStep} type="button">
            <ArrowLeft className="h-4 w-4" />
            {t?.buttons?.back || "Zurück"}
          </PremiumButton>
          {selectedUpgradeCount > 0 ? (
            <button
              type="button"
              onClick={() => setState((prev) => ({ ...prev, upgrades: [] }))}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Auswahl löschen
            </button>
          ) : null}
          <PremiumButton onClick={nextStep} type="button">
            {continueLabel}
            <ArrowRight className="h-4 w-4" />
          </PremiumButton>
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="calc-kicker justify-center">{contactIntro.kicker}</div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          {contactIntro.title}
        </h3>
        <p className="text-slate-500">
          {contactIntro.subtitle}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="glass-elevated rounded-[2rem] p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-lg font-semibold text-slate-950">{currentServiceLabel}</span>
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>

          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            {state.details.startAddress ? (
              <div>
                <span className="font-semibold text-slate-950">
                  {t?.form?.start_address || "Startadresse"}:
                </span>{" "}
                {state.details.startAddress}
              </div>
            ) : null}
            {state.details.endAddress ? (
              <div>
                <span className="font-semibold text-slate-950">
                  {t?.form?.end_address || "Zieladresse"}:
                </span>{" "}
                {state.details.endAddress}
              </div>
            ) : null}
            {state.details.date ? (
              <div>
                <span className="font-semibold text-slate-950">
                  {t?.form?.date || "Wunschtermin"}:
                </span>{" "}
                {state.details.date}
              </div>
            ) : null}
          </div>

          {state.upgrades.length > 0 ? (
            <div className="mt-6 space-y-2">
              <span className="text-sm text-slate-500">Ausgewählte Extras</span>
              <div className="flex flex-wrap gap-2">
                {state.upgrades.map((upgradeId) => {
                  const title = t?.upgrades?.[upgradeId]?.title || upgradeId;
                  return (
                    <span
                      key={upgradeId}
                      className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
                    >
                      {title}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : null}

        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          data-event="submit_booking"
          data-service={state.service || "unknown"}
          data-source={queryUtmSource || "booking_wizard"}
          data-contact-channel={queryPreferredContact || "form"}
          data-intent={queryUrgency ? "urgent_booking_submit" : "booking_submit"}
          data-priority={queryUrgency ? "hot" : "normal"}
        >
          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {contactIntro.kicker}
                </p>
                <h4 className="mt-1 text-base font-black text-slate-950">
                  {contactIntro.title}
                </h4>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {contactIntro.subtitle}
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                {contactIntro.badge}
              </span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {visibleContactReadiness.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "rounded-2xl border px-3 py-3",
                    item.ready ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-slate-200 bg-slate-50 text-slate-700",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={cn("h-4 w-4", item.ready ? "text-emerald-600" : "text-slate-300")} />
                    <span className="text-xs font-black">{item.label}</span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold leading-5 opacity-80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldBox label={t?.form?.name || "Name"}>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="calc-input h-11"
                placeholder={t?.form?.placeholder_name || defaultBooking.form.placeholder_name}
              />
            </FieldBox>

            <FieldBox label={t?.form?.phone || "Telefon"}>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="calc-input h-11"
                placeholder={t?.form?.placeholder_phone || defaultBooking.form.placeholder_phone}
              />
            </FieldBox>
          </div>

          {!contactExpanded ? (
            <button
              type="button"
              onClick={() => setContactExpanded(true)}
              className="flex w-full items-center justify-between gap-4 rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 text-left text-sm font-black text-slate-900 transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Optional
                </span>
                {contactIntro.expandLabel}
              </span>
              <ArrowRight className="h-4 w-4 text-blue-700" />
            </button>
          ) : (
            <div className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-white p-4">
              <FieldBox label={`${t?.form?.email || "E-Mail"} falls gewünscht`} required={false}>
                <input
                  type="email"
                  value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="calc-input h-11"
                placeholder={t?.form?.placeholder_email || defaultBooking.form.placeholder_email}
                />
              </FieldBox>

              <FieldBox label="Nachricht falls bekannt" icon={<MessageSquare className="h-4 w-4" />} required={false}>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="calc-input min-h-24 resize-none py-3"
                  placeholder="Kurz beschreiben: Was ist wichtig, was ist offen, wann soll FLOXANT sich melden?"
                />
              </FieldBox>

              <div className="rounded-[1.8rem] border border-blue-100 bg-blue-50/45 p-3 shadow-sm shadow-slate-950/5">
                <UploadDropCard
                  title={isUploadFlow ? "Fotos oder Angebot hinzufügen" : t?.form?.photos || "Fotos optional"}
                  description={
                    isUploadFlow
                      ? "Laden Sie Bilder, ein vorhandenes Angebot oder relevante Objektfotos hoch."
                      : "Fotos von Menge, Zugang, Etage, Räumen oder Zustand helfen bei der Einschätzung."
                  }
                  helper="JPG, PNG oder WebP hochladen. Bitte keine Zugangscodes oder sensiblen Daten im Dateinamen verwenden."
                  accept="image/jpeg,image/png,image/webp"
                  files={files}
                  dataEvent="upload_images"
                  tone="blue"
                  onFilesChange={setFiles}
                />
              </div>
            </div>
          )}

          {submitError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {submitError}
            </div>
          ) : null}

          {!isContactValid ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Bitte Name und Telefonnummer eintragen. Dann kann FLOXANT sinnvoll zurückmelden.
            </div>
          ) : null}

          <div className="flex justify-center gap-4 pt-2">
            <PremiumButton variant="ghost" type="button" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4" />
              {t?.buttons?.back || "Zurück"}
            </PremiumButton>
            <PremiumButton type="submit" disabled={isSubmitting || !isContactValid}>
              {isSubmitting
                ? t?.buttons?.sending || "Wird gesendet..."
                : t?.buttons?.submit || "Anfrage absenden"}
            </PremiumButton>
          </div>
        </form>
      </div>
    </div>
  );

  if (!initialized) {
    return (
      <div className="glass-elevated mx-auto min-h-[420px] w-full max-w-5xl rounded-[2.2rem]" />
    );
  }

  if (isSuccess) {
    const successTitle =
      t?.headings?.success_title || defaultBooking.headings.success_title;
    const successMessageTemplate =
      t?.headings?.success_message || defaultBooking.headings.success_message;
    const successEmailTemplate =
      t?.headings?.success_email || defaultBooking.headings.success_email;

    return (
      <div className="glass-elevated mx-auto flex min-h-[420px] w-full max-w-3xl flex-col items-center justify-center rounded-[2.2rem] p-8 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-950">
          {successTitle}
        </h2>
        <p className="mb-2 text-sm text-slate-600">
          {successMessageTemplate.replace("{name}", formData.name || "")}
        </p>
        <p className="mb-8 text-sm text-slate-500">
          {formData.email
            ? successEmailTemplate.replace("{email}", formData.email)
            : "Wir melden uns telefonisch oder per WhatsApp passend zu Ihrer Anfrage."}
        </p>
        <PremiumButton type="button" onClick={resetWizard}>
          {t?.buttons?.new_request || "Neue Anfrage"}
        </PremiumButton>
      </div>
    );
  }

  return (
    <div
      className="mx-auto w-full max-w-5xl space-y-8"
      data-event="start_booking"
      data-source="booking_wizard"
    >
      <div className={cn("grid gap-3", steps.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4")}>
        {steps.map((stepItem) => (
          <div
            key={stepItem.number}
            className={cn(
              "rounded-[1.6rem] border p-4 transition-all",
              state.step >= stepItem.number
                ? "border-blue-200 bg-white shadow-[0_14px_32px_rgba(37,99,235,0.08)]"
                : "border-slate-200/90 bg-white/70"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black transition-all",
                  state.step >= stepItem.number
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-400"
                )}
              >
                {stepItem.displayNumber}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Schritt {stepItem.displayNumber}
                </div>
                <div
                  className={cn(
                    "text-sm font-semibold",
                    state.step >= stepItem.number ? "text-slate-950" : "text-slate-500"
                  )}
                >
                  {stepItem.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={state.step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.24 }}
        >
          {state.step === 1 ? (
            <div className="glass-elevated space-y-8 rounded-[2.2rem] p-6 text-center md:p-8">
              <div className="space-y-3">
                <div className="calc-kicker justify-center">Strukturierter Einstieg</div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                  {t?.headings?.service_selection || "Leistung auswählen"}
                </h2>
                <p className="mx-auto max-w-2xl text-slate-500">
                  {t?.headings?.service_subtitle ||
                    "Wählen Sie den passenden Einstieg für Ihre Anfrage"}
                </p>
              </div>
              {renderServiceSelection()}
            </div>
          ) : null}

          {state.step === 2 ? (
            <div className="glass-elevated rounded-[2.2rem] p-6 md:p-8">{renderDetails()}</div>
          ) : null}

          {state.step === 3 ? (
            <div className="glass-elevated rounded-[2.2rem] p-6 md:p-8">{renderUpgrades()}</div>
          ) : null}

          {state.step === 4 ? (
            <div className="glass-elevated rounded-[2.2rem] p-6 md:p-8">{renderContact()}</div>
          ) : null}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

function FieldBox({
  label,
  icon,
  children,
  required = true,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="calc-field space-y-3 rounded-[1.8rem]">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-950">
        {icon ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            {icon}
          </span>
        ) : null}
        {label}
        {required ? <span className="text-red-400">*</span> : null}
      </label>
      {children}
    </div>
  );
}

export function SmartBookingWizard({ dict, initialService, initialRegion, initialEntry, forceVisible = false }: SmartBookingWizardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {isVisible || forceVisible ? (
        <Suspense fallback={<div className="mx-auto min-h-[420px] w-full max-w-5xl rounded-[2.2rem] bg-white/70" />}>
          <SmartBookingWizardInner
            dict={dict}
            initialService={initialService}
            initialRegion={initialRegion}
            initialEntry={initialEntry}
          />
        </Suspense>
      ) : (
        <div className="mx-auto min-h-[400px] w-full max-w-5xl" />
      )}
    </div>
  );
}
