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
  Upload,
  Users,
} from "lucide-react";

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

interface SmartBookingWizardProps {
  dict: any;
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

function SmartBookingWizardInner({ dict }: SmartBookingWizardProps) {
  const [initialized, setInitialized] = useState(false);
  const searchParams = useSearchParams();
  const queryService = searchParams.get("service");
  const queryRegion = [searchParams.get("region"), searchParams.get("city"), searchParams.get("standort")]
    .filter(Boolean)
    .join(" ");
  const isDusseldorfQueryContext = looksLikeDusseldorf(queryRegion);
  const queryServicePreset = useMemo(() => normalizeBookingService(queryService), [queryService]);
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
  const queryReferralCode =
    searchParams.get("ref") || searchParams.get("partner_code") || searchParams.get("referral_code") || "";
  const normalizedSource = normalizeTrackingValue(queryUtmSource || storeLead?.utmSource || "");
  const normalizedCampaign = normalizeTrackingValue(queryUtmCampaign || storeLead?.utmCampaign || "");
  const isGoogleMapsContext = ["google_maps", "google_business_profile", "gbp", "maps"].some(
    (value) => normalizedSource.includes(value),
  );
  const isGoogleAdsContext = ["google_ads", "adwords", "cpc"].some(
    (value) => normalizedSource.includes(value) || normalizeTrackingValue(queryUtmMedium).includes(value),
  );

  const defaultBooking = {
    steps: {
      service: "Service",
      details: "Details",
      upgrades: "Zusatzmodule",
      contact: "Kontakt",
    },
    headings: {
      service_selection: "Leistung auswählen",
      service_subtitle: "Wählen Sie den passenden Einstieg für Ihre Anfrage",
      details_prefix: "Angaben zu",
      upgrades_title: "Passende Zusatzmodule",
      upgrades_subtitle: "Ergänzen Sie nur, was für Ihren Auftrag wirklich relevant ist",
      summary_title: "Kontaktdaten",
      summary_subtitle: "Wir melden uns passend zu Ihrer Anfrage",
      success_title: "Anfrage gesendet",
      success_message: "Vielen Dank {name}",
      success_email: "Wir melden uns über {email}",
    },
    services: {
      umzug: { label: "Umzug", desc: "Wohnungs- und Firmenumzug" },
      reinigung: { label: "Reinigung", desc: "Objekt, Zustand, Termin und Budget klaeren" },
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

  useEffect(() => {
    setInitialized(true);
    const presetService = isDusseldorfDisposalQueryContext
      ? "entsorgung"
      : isDusseldorfCleaningQueryContext
        ? "reinigung"
        : queryServicePreset || (storeService as ServiceType);

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
    queryServicePreset,
    storeBase,
    storeLead,
    storeService,
  ]);

  const steps = useMemo(
    () => [
      { number: 1, title: t?.steps?.service || "Service" },
      { number: 2, title: t?.steps?.details || "Details" },
      { number: 3, title: t?.steps?.upgrades || "Extras" },
      { number: 4, title: t?.steps?.contact || "Kontakt" },
    ],
    [t]
  );

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

  const currentServiceDrivers =
    state.service ? germanizeDeep(wizardServiceMeta[state.service].drivers) : [];

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
          scope: "Fläche / Reinigungsart optional",
          scopePlaceholder: "z. B. 75 m², Endreinigung, Küche/Bad/Fenster",
          access: "Zustand / Zugang optional",
          accessPlaceholder: "z. B. leerstehend, möbliert, starke Verschmutzung",
          budget: "Budget / Preisrahmen optional",
        }
      : state.service === "entsorgung"
        ? {
            scope: "Umfang / Objektart optional",
            scopePlaceholder: "z. B. Keller, Garage, 12 m³, Sperrmüll",
            access: "Etage / Zugang optional",
            accessPlaceholder: "z. B. 2. OG ohne Aufzug, Innenhof, kurzer Laufweg",
            budget: "Budget / Preisrahmen optional",
          }
        : state.service === "leerfahrt"
          ? {
              scope: "Strecke / Umfang optional",
              scopePlaceholder: "z. B. Regensburg -> Muenchen, 8 Kartons, 1 Sofa",
              access: "Terminflexibilitaet / Zugang optional",
              accessPlaceholder: "z. B. flexibel diese Woche, EG, kurzer Laufweg",
              budget: "Budget / Preisrahmen optional",
            }
          : {
            scope: "Volumen / Wohnungsgröße optional",
            scopePlaceholder: "z. B. 2 Zimmer, 45 Kartons, größere Möbel",
            access: "Etage / Aufzug / Halteverbot optional",
            accessPlaceholder: "z. B. 3. OG, Aufzug ja, Halteverbot prüfen",
            budget: "Budget / Preisrahmen optional",
          };

  const nextStep = () => {
    setState((prev) => ({
      ...prev,
      step: Math.min(prev.step + 1, 4),
    }));
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      step: Math.max(prev.step - 1, 1),
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
      setSubmitError(t?.error?.generic || "Bitte pruefen Sie die Angaben und ergaenzen Sie Name und Telefon.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const createdAt = new Date().toISOString();
    const serviceMeta = wizardServiceMeta[state.service];
    const bookingSource = isDusseldorfDisposalQueryContext
      ? "duesseldorf_disposal_booking"
      : isDusseldorfCleaningQueryContext
        ? "duesseldorf_cleaning_booking"
        : state.service === "leerfahrt" || normalizedCampaign.includes("leerfahrt")
          ? "return_trip_booking"
          : isGoogleAdsContext && state.service === "reinigung"
            ? "google_ads_cleaning_regensburg"
            : isGoogleMapsContext
              ? "google_maps_booking"
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
    const attribution = {
      landing_page: landingPage,
      referrer,
      utm_source: queryUtmSource || storeLead?.utmSource || "",
      utm_medium: queryUtmMedium || storeLead?.utmMedium || "",
      utm_campaign: queryUtmCampaign || storeLead?.utmCampaign || "",
      utm_content: queryUtmContent,
      gclid: queryGclid || storeLead?.gclid || "",
      referral_code: queryReferralCode,
      referral_source: queryReferralCode ? "partnercode_url" : "",
      referral_landing_page: queryReferralCode ? landingPage : "",
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
          referralCode: queryReferralCode,
          requestedDate: state.details.date,
          startAddress: state.details.startAddress.trim(),
          endAddress: state.details.endAddress.trim(),
          scopeSummary: state.details.scope.trim(),
          accessNotes: state.details.access.trim(),
          customerBudgetText: state.details.budget.trim(),
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
        selectedUpgrades: state.upgrades,
        message: formData.message.trim(),
      },
      metadata: {
        createdAt,
        intakeVersion: "1.3.0",
        source: bookingSource,
        servicePresetFromUrl: state.service,
        regionPreset,
        attribution,
        clientContext: {
          entryPoint,
          landingPage,
          referrer,
          leadSource: bookingSource,
          bookingMode: "smart_wizard",
          regionPreset,
          hasUploads: files.length > 0,
          utmSource: queryUtmSource || storeLead?.utmSource || "",
          utmMedium: queryUtmMedium || storeLead?.utmMedium || "",
          utmCampaign: queryUtmCampaign || storeLead?.utmCampaign || "",
          utmContent: queryUtmContent,
          gclid: queryGclid || storeLead?.gclid || "",
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
    submitData.append("landingPage", attribution.landing_page);
    submitData.append("referrer", attribution.referrer);
    submitData.append("utmSource", attribution.utm_source);
    submitData.append("utmMedium", attribution.utm_medium);
    submitData.append("utmCampaign", attribution.utm_campaign);
    submitData.append("utmContent", attribution.utm_content);
    submitData.append("gclid", attribution.gclid);
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

  const renderPhotosLabel = () => {
    const template =
      t?.form?.photos_count || defaultBooking.form.photos_count || "{count} Dateien ausgewählt";

    return files.length > 0
      ? template.replace("{count}", String(files.length))
      : t?.form?.photos_placeholder ||
          defaultBooking.form.photos_placeholder ||
          "Fotos hinzufügen";
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
            Dieser Duesseldorf-Einstieg ist auf Entsorgung ausgerichtet: Umfang,
            Zugang, Fotos und Budget helfen bei der Pruefung.
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
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  service: option.id as ServiceType,
                  step: 2,
                }))
              }
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
              Sie haben einen festen Preisrahmen? Dann nutzen Sie den separaten Budget-Weg.
            </p>
          </div>
          <Link
            href="/anfrage-mit-preisrahmen"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
            data-event="submit_budget_request"
            data-source="booking_wizard"
          >
            Budget nennen
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  };

  const renderDetails = () => (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="calc-kicker justify-center">Eckdaten für die Einschätzung</div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          {t?.headings?.details_prefix || "Angaben zu"} {currentServiceLabel}
        </h3>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500">
          Geben Sie die wichtigsten Eckdaten an. Daraus entsteht eine klare Grundlage für
          Rückmeldung, Termin und nächsten Schritt.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
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

            {(state.service === "umzug" || state.service === "leerfahrt") && (
              <FieldBox
                label={`${state.service === "leerfahrt" ? "Zielort / Richtung" : t?.form?.end_address || "Zieladresse"} optional`}
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
            )}
          </div>

          <FieldBox
            label={`${t?.form?.date || "Wunschtermin"} optional`}
            icon={<Calendar className="h-4 w-4" />}
            required={false}
          >
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
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

          <FieldBox label={briefingLabels.budget} icon={<Clock className="h-4 w-4" />} required={false}>
            <input
              value={state.details.budget}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  details: { ...prev.details, budget: e.target.value },
                }))
              }
              className="calc-input h-11"
              placeholder="z. B. 800 €, bitte Machbarkeit prüfen"
              data-event="submit_budget_request"
              data-source="booking_wizard_budget_field"
            />
          </FieldBox>

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

        <aside className="card-premium rounded-[2rem] p-6">
          <div className="calc-kicker">Worauf wir achten</div>
          <h4 className="mt-4 text-xl font-bold text-slate-950">
            {currentServiceLabel || "Ihre Anfrage"} wird sauber eingeordnet
          </h4>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Für den nächsten Schritt zählen vor allem die Punkte, die Aufwand, Team und Ablauf
            wirklich beeinflussen.
          </p>
          <div className="mt-6 space-y-3">
            {currentServiceDrivers.map((driver) => (
              <div
                key={driver}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/86 px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 text-blue-700" />
                <span className="text-sm font-medium text-slate-700">{driver}</span>
              </div>
            ))}
          </div>
        </aside>
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

    return (
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <div className="calc-kicker justify-center">Zusatzwünsche</div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            {t?.headings?.upgrades_title || "Optionale Extras"}
          </h3>
          <p className="text-slate-500">
            {t?.headings?.upgrades_subtitle || "Ergänzen Sie Ihre Anfrage bei Bedarf"}
          </p>
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
                  {isSelected ? <CheckCircle2 className="h-5 w-5 text-blue-600" /> : null}
                </div>
                <h4 className="text-lg font-semibold text-slate-950">{upgrade.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">{upgrade.desc}</p>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <PremiumButton variant="ghost" onClick={prevStep} type="button">
            <ArrowLeft className="h-4 w-4" />
            {t?.buttons?.back || "Zurück"}
          </PremiumButton>
          <PremiumButton onClick={nextStep} type="button">
            {t?.buttons?.finish || "Weiter"}
            <ArrowRight className="h-4 w-4" />
          </PremiumButton>
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="calc-kicker justify-center">Letzter Schritt</div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          {t?.headings?.summary_title || "Kontaktdaten"}
        </h3>
        <p className="text-slate-500">
          {t?.headings?.summary_subtitle || "Wir melden uns passend zu Ihrer Anfrage"}
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

          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white/[0.88] p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
              Klare Einschätzung
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Diese Anfrage startet als saubere Prüfung. Der nächste Schritt basiert auf Ihren
              Angaben, nicht auf einer vorschnellen Zusage.
            </p>
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          data-event="submit_booking"
          data-service={state.service || "unknown"}
        >
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

            <FieldBox label={`${t?.form?.email || "E-Mail"} optional`} required={false}>
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
          </div>

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

          <FieldBox label="Nachricht optional" icon={<MessageSquare className="h-4 w-4" />} required={false}>
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

          <div className="calc-field space-y-3 rounded-[1.8rem]">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Upload className="h-4 w-4" />
              </span>
              {t?.form?.photos || "Fotos"}
            </label>
            <div className="relative">
              <input
                id="smart-booking-file-upload"
                type="file"
                multiple
                accept="image/*"
                data-event="upload_images"
                data-source="booking_wizard"
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor="smart-booking-file-upload"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/85 p-4 text-slate-950 transition-all hover:border-blue-300 hover:bg-blue-50/70"
              >
                <Upload className="h-5 w-5 text-slate-400" />
                <span className="text-sm text-slate-500">{renderPhotosLabel()}</span>
              </label>
            </div>
          </div>

          {submitError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {submitError}
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
      <div className="grid gap-3 sm:grid-cols-4">
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
                {stepItem.number}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Schritt {stepItem.number}
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

export function SmartBookingWizard({ dict }: SmartBookingWizardProps) {
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
      {isVisible ? (
        <Suspense fallback={<div className="mx-auto min-h-[420px] w-full max-w-5xl rounded-[2.2rem] bg-white/70" />}>
          <SmartBookingWizardInner dict={dict} />
        </Suspense>
      ) : (
        <div className="mx-auto min-h-[400px] w-full max-w-5xl" />
      )}
    </div>
  );
}
