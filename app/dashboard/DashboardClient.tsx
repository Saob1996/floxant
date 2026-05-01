"use client";

import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  ClipboardList,
  Clock,
  Euro,
  ExternalLink,
  FileCheck2,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PauseCircle,
  Phone,
  PlusCircle,
  Route,
  Search,
  Settings2,
  Truck,
  UserRound,
  X,
} from "lucide-react";

import type { BackhaulOffer } from "@/lib/backhaul-offers";
import { germanizeDeep, germanizeText } from "@/lib/german-text";
import { calculateInternalCost } from "@/lib/pricing/internal-cost-engine";
import {
  DEFAULT_DESIRED_MARGIN_PERCENT,
  DEFAULT_VAT_RATE,
  PRICING_DEFAULTS,
} from "@/lib/pricing/pricing-config";
import type {
  InternalCostInput,
  InternalCostResult,
  InternalServiceType,
} from "@/lib/pricing/types";
import type { FloxDocumentType, IntakePayload } from "@/lib/types/intake";
import { cn } from "@/lib/utils";

export interface Booking {
  id: string;
  service: string;
  name: string;
  email: string;
  phone: string;
  timestamp: string;
  status: string;
  notes: string;
  upgrades: string[];
  file_urls: string[];
  file_url: string;
  details: IntakePayload;
}

interface DashboardClientProps {
  dict: any;
}

type WorkspaceTab =
  | "overview"
  | "inquiries"
  | "price-review"
  | "planning"
  | "documents"
  | "return-trips"
  | "b2b-cleaning"
  | "follow-up"
  | "settings";

type DetailTab = "customer" | "price" | "planning" | "documents" | "history";

type InquiryFilter =
  | "all"
  | "umzug"
  | "reinigung"
  | "entsorgung"
  | "b2b-cleaning"
  | "return-trip"
  | "budget"
  | "needs-info"
  | "new"
  | "in-progress";

type LeadQualityTone = "ready" | "needs-info" | "thin";

type LeadQuality = {
  label: string;
  tone: LeadQualityTone;
  missing: string[];
  nextQuestion: string;
};

type PriorityTask = {
  id: string;
  customer: string;
  reason: string;
  nextStep: string;
  booking?: Booking;
  tab?: WorkspaceTab;
};

const WORKSPACE_TABS: WorkspaceTab[] = [
  "overview",
  "inquiries",
  "price-review",
  "planning",
  "documents",
  "return-trips",
  "b2b-cleaning",
  "follow-up",
  "settings",
];

const TAB_ALIASES: Record<string, WorkspaceTab> = {
  inbox: "inquiries",
  "internal-costs": "price-review",
};

const workspaceMeta: Record<
  WorkspaceTab,
  {
    label: string;
    description: string;
    icon: LucideIcon;
  }
> = {
  overview: {
    label: "Überblick",
    description: "Offenes sofort sehen.",
    icon: LayoutDashboard,
  },
  inquiries: {
    label: "Anfragen",
    description: "Neue Leads bearbeiten.",
    icon: Inbox,
  },
  "price-review": {
    label: "Preisprüfung",
    description: "Marge und Risiko prüfen.",
    icon: Calculator,
  },
  planning: {
    label: "Auftragsplanung",
    description: "Team und Ablauf planen.",
    icon: ClipboardList,
  },
  documents: {
    label: "Dokumente",
    description: "Angebote, ABs, Rechnungen.",
    icon: FileText,
  },
  "return-trips": {
    label: "Rückfahrten",
    description: "Kapazität und Routen.",
    icon: Route,
  },
  "b2b-cleaning": {
    label: "Reinigung B2B",
    description: "Fläche, Intervall, Objekt.",
    icon: BriefcaseBusiness,
  },
  "follow-up": {
    label: "Nachfassen",
    description: "Offene Kundenkontakte.",
    icon: Clock,
  },
  settings: {
    label: "Einstellungen",
    description: "Kosten und Regeln.",
    icon: Settings2,
  },
};

const inquiryFilters: Array<{ id: InquiryFilter; label: string }> = [
  { id: "all", label: "Alle" },
  { id: "umzug", label: "Umzug" },
  { id: "reinigung", label: "Reinigung" },
  { id: "entsorgung", label: "Entrümpelung" },
  { id: "b2b-cleaning", label: "B2B-Reinigung" },
  { id: "return-trip", label: "Rückfahrt" },
  { id: "budget", label: "Budget vorhanden" },
  { id: "needs-info", label: "Angaben fehlen" },
  { id: "new", label: "Neu" },
  { id: "in-progress", label: "In Bearbeitung" },
];

const documentRows: Array<{
  type: FloxDocumentType;
  label: string;
  action: string;
}> = [
  { type: "quote", label: "Angebot", action: "Erstellen" },
  { type: "order_confirmation", label: "Auftragsbestätigung", action: "Erstellen" },
  { type: "invoice", label: "Rechnung", action: "Erstellen" },
];

const initialBackhaulForm: Partial<BackhaulOffer> = {
  title: "Leer-Rückfahrt Richtung Regensburg",
  date: "",
  timeWindow: "nach Absprache",
  origin: "Auf Anfrage",
  destination: "Regensburg",
  destinationRadius: "ca. 150 km um Regensburg",
  routeAreas: ["Nürnberg", "München", "Ingolstadt", "Landshut"],
  vehicleType: "Transporter oder LKW nach Tour",
  availableCapacity: "Möbel, Kartons, Paletten oder Einzelstücke",
  priceHint: "fairer Rückfahrt-Preis nach Route und Volumen",
  fairPriceNote:
    "Wenn Route, Datum und Ladepunkte zur geplanten Rückfahrt passen, kann freie Fahrzeugkapazität fair angeboten werden. Umwege werden vorher transparent geprüft.",
  status: "active",
  adminNote: "",
};

function isWorkspaceTab(value: string): value is WorkspaceTab {
  return WORKSPACE_TABS.includes(value as WorkspaceTab);
}

function normalizeWorkspaceTab(value: string | null): WorkspaceTab {
  if (!value) return "overview";
  if (TAB_ALIASES[value]) return TAB_ALIASES[value];
  return isWorkspaceTab(value) ? value : "overview";
}

function toSafeNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, any>)
    : {};
}

function cleanText(value: unknown, fallback = "Nicht angegeben") {
  const text = germanizeText(String(value ?? "").trim());
  return text || fallback;
}

function cleanOptionalText(value: unknown) {
  return germanizeText(String(value ?? "").trim());
}

function normalizeBooking(raw: any): Booking {
  const rawDetails = asRecord(raw?.details);
  const contact = asRecord(rawDetails.contact);
  const serviceInfo = asRecord(rawDetails.service);
  const valuation = asRecord(rawDetails.valuation);
  const configuration = germanizeDeep(asRecord(rawDetails.configuration));
  const admin = asRecord(rawDetails.admin);
  const metadata = asRecord(rawDetails.metadata);
  const clientContext = asRecord(metadata.clientContext);
  const timestamp =
    typeof raw?.timestamp === "string" && raw.timestamp.trim()
      ? raw.timestamp
      : new Date().toISOString();

  const docs = Array.isArray(admin.docs) ? germanizeDeep(admin.docs) : [];
  const history = Array.isArray(admin.history) ? germanizeDeep(admin.history) : [];

  const normalizedDetails: IntakePayload = germanizeDeep({
    contact: {
      fullName: cleanOptionalText(contact.fullName || raw?.name),
      email: cleanOptionalText(contact.email || raw?.email),
      phone: cleanOptionalText(contact.phone || raw?.phone),
      callbackPreference: cleanOptionalText(contact.callbackPreference),
      notes: cleanOptionalText(contact.notes || raw?.notes),
    },
    service: {
      type: cleanOptionalText(serviceInfo.type || raw?.service || "umzug"),
      source: cleanOptionalText(serviceInfo.source || metadata.source),
      entryPoint: cleanOptionalText(
        serviceInfo.entryPoint || configuration.entryPoint || clientContext.entryPoint,
      ),
      presetFromUrl: cleanOptionalText(serviceInfo.presetFromUrl),
    },
    valuation: {
      systemPriceRangeMin: toSafeNumber(valuation.systemPriceRangeMin),
      systemPriceRangeMax: toSafeNumber(valuation.systemPriceRangeMax),
      priceRangeMin: toSafeNumber(
        valuation.priceRangeMin ?? valuation.systemPriceRangeMin,
      ),
      priceRangeMax: toSafeNumber(
        valuation.priceRangeMax ?? valuation.systemPriceRangeMax,
      ),
      valuationLabel: cleanOptionalText(valuation.valuationLabel),
      valuationStage: cleanText(valuation.valuationStage, "Vorprüfung"),
      accuracyState: cleanOptionalText(valuation.accuracyState),
      topDrivers: Array.isArray(valuation.topDrivers)
        ? valuation.topDrivers.map((item: unknown) => cleanOptionalText(item)).filter(Boolean)
        : [],
      customerBudget:
        valuation.customerBudget === null || valuation.customerBudget === undefined
          ? null
          : toSafeNumber(valuation.customerBudget),
      priceSuggestion:
        valuation.priceSuggestion === null || valuation.priceSuggestion === undefined
          ? null
          : toSafeNumber(valuation.priceSuggestion),
      priceExplanation: cleanOptionalText(valuation.priceExplanation),
      pricingSignals: germanizeDeep(asRecord(valuation.pricingSignals)),
    },
    configuration,
    admin: {
      internalNotes: cleanOptionalText(admin.internalNotes),
      nextAction: cleanOptionalText(admin.nextAction),
      updatedAt: cleanOptionalText(admin.updatedAt),
      updatedBy: cleanOptionalText(admin.updatedBy),
      docs,
      workOrder:
        admin.workOrder && typeof admin.workOrder === "object"
          ? germanizeDeep(admin.workOrder)
          : undefined,
      costLines: Array.isArray(admin.costLines) ? germanizeDeep(admin.costLines) : [],
      ledgerEntries: Array.isArray(admin.ledgerEntries)
        ? germanizeDeep(admin.ledgerEntries)
        : [],
      commercialDecision:
        admin.commercialDecision && typeof admin.commercialDecision === "object"
          ? germanizeDeep(admin.commercialDecision)
          : undefined,
      profitability:
        admin.profitability && typeof admin.profitability === "object"
          ? admin.profitability
          : undefined,
      history,
    },
    metadata: {
      createdAt: cleanOptionalText(metadata.createdAt || timestamp),
      intakeVersion: cleanOptionalText(metadata.intakeVersion || "dashboard"),
      source: cleanOptionalText(metadata.source || serviceInfo.source || "dashboard"),
      servicePresetFromUrl: cleanOptionalText(metadata.servicePresetFromUrl),
      clientContext: germanizeDeep(clientContext),
    },
  });

  const fileUrls = Array.isArray(raw?.file_urls)
    ? raw.file_urls.filter(Boolean).map(String)
    : typeof raw?.file_url === "string" && raw.file_url
      ? [raw.file_url]
      : [];

  return {
    id: String(raw?.id ?? `booking-${timestamp}`),
    service: cleanOptionalText(raw?.service || serviceInfo.type || "umzug"),
    name: cleanText(raw?.name || contact.fullName, "Unbekannter Kunde"),
    email: cleanOptionalText(raw?.email || contact.email),
    phone: cleanOptionalText(raw?.phone || contact.phone),
    timestamp,
    status: cleanOptionalText(raw?.status || "new"),
    notes: cleanOptionalText(raw?.notes || contact.notes),
    upgrades: Array.isArray(raw?.upgrades)
      ? raw.upgrades.map((item: unknown) => cleanOptionalText(item)).filter(Boolean)
      : [],
    file_urls: fileUrls,
    file_url: typeof raw?.file_url === "string" ? raw.file_url : "",
    details: normalizedDetails,
  };
}

function migrateDashboardLocalStorage() {
  if (typeof window === "undefined") return;
  const keys = ["floxant_income_expense"];

  for (const key of keys) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const cleaned = germanizeDeep(parsed);
      const next = JSON.stringify(cleaned);
      if (next !== raw) window.localStorage.setItem(key, next);
    } catch {
      window.localStorage.removeItem(key);
    }
  }
}

function formatCurrency(amount?: number | null, fallback = "Nicht angegeben") {
  if (amount === null || amount === undefined || !Number.isFinite(amount)) return fallback;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(value || 0);
}

function formatDate(value?: string) {
  if (!value) return "Nicht angegeben";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Nicht angegeben";
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDateTime(value?: string) {
  if (!value) return "Nicht angegeben";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Nicht angegeben";
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatStatus(status: string) {
  const map: Record<string, string> = {
    new: "Neu",
    in_bearbeitung: "In Bearbeitung",
    angebot_versendet: "Angebot versendet",
    abgeschlossen: "Abgeschlossen",
    storniert: "Storniert",
    active: "Aktiv",
    paused: "Pausiert",
    draft: "Entwurf",
    archived: "Archiviert",
  };

  return map[status] || germanizeText(status.replace(/_/g, " "));
}

function getStatusTone(status: string) {
  if (status === "new") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "in_bearbeitung") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "angebot_versendet") return "border-cyan-200 bg-cyan-50 text-cyan-700";
  if (status === "abgeschlossen" || status === "active") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "paused" || status === "draft") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  if (status === "storniert" || status === "archived") {
    return "border-red-200 bg-red-50 text-red-700";
  }
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function getServiceLabel(service: string) {
  const normalized = service.toLowerCase();
  const map: Record<string, string> = {
    umzug: "Umzug",
    bueroumzug: "Büroumzug",
    reinigung: "Reinigung",
    b2b_reinigung: "B2B-Reinigung",
    entsorgung: "Entrümpelung",
    firmenentsorgung: "Firmenentsorgung",
    leerfahrt: "Rückfahrt",
    leerfahrt_offer: "Rückfahrt",
    beiladung: "Beiladung",
    seniorenumzug: "Seniorenumzug",
    private_client: "Private Client",
    einlagerung: "Einlagerung",
  };
  return map[normalized] || germanizeText(service.replace(/_/g, " "));
}

function getSourceLabel(booking: Booking) {
  const source =
    booking.details?.service?.source ||
    booking.details?.metadata?.source ||
    booking.details?.configuration?.requestContext ||
    "";

  const map: Record<string, string> = {
    booking_page_wizard: "Buchung",
    budget_contact_form: "Preisvorschlag",
    quick_express_modal: "Express",
    quick_express: "Express",
    intake_wizard: "Rechner",
    gewerbereinigung_regensburg: "B2B-Reinigung",
    private_client_page: "Private Client",
    business_disposal_page: "Firmenentsorgung",
    backhaul_page: "Rückfahrt",
    dashboard_backhaul_offer: "Rückfahrt",
    dashboard: "Dashboard",
    "floxant-duesseldorf-cleaning": "Düsseldorf Reinigung",
    "cleaning-duesseldorf": "Düsseldorf Reinigung",
  };

  return map[String(source)] || cleanText(source, "Direkte Anfrage");
}

function firstText(values: unknown[], fallback = "Nicht angegeben") {
  for (const value of values) {
    const text = cleanOptionalText(value);
    if (text) return text;
  }
  return fallback;
}

function getMainLocation(booking: Booking) {
  const config = booking.details?.configuration || {};
  return firstText(
    [
      config.location,
      config.districtOrZip,
      config.fromAddress,
      config.startAddress,
      config.address,
      config.toAddress,
      config.targetAddress,
      config.companyAddress,
    ],
    "Nicht angegeben",
  );
}

function getB2BCompanyLabel(booking: Booking) {
  const config = booking.details?.configuration || {};
  return firstText(
    [
      config.companyName,
      config.businessName,
      config.objectName,
      config.locationName,
      booking.name,
    ],
    booking.name || "Gewerbekunde",
  );
}

function getB2BObjectLabel(booking: Booking) {
  const config = booking.details?.configuration || {};
  return firstText(
    [
      config.objectType,
      config.propertyType,
      config.cleaningObject,
      config.industry,
      config.facilityType,
    ],
    "Objekt noch offen",
  );
}

function getB2BIntervalLabel(booking: Booking) {
  const config = booking.details?.configuration || {};
  return firstText(
    [
      config.cleaningInterval,
      config.interval,
      config.frequency,
      config.cleaningFrequency,
      config.serviceFrequency,
    ],
    "Intervall offen",
  );
}

function getB2BAreaLabel(booking: Booking) {
  const config = booking.details?.configuration || {};
  return firstText(
    [
      config.officeAreaM2 && `${config.officeAreaM2} m²`,
      config.cleaningAreaM2 && `${config.cleaningAreaM2} m²`,
      config.areaM2 && `${config.areaM2} m²`,
      config.squareMeters && `${config.squareMeters} m²`,
      config.propertySize && `${config.propertySize} m²`,
    ],
    "Fläche offen",
  );
}

function hasB2BArea(booking: Booking) {
  return getB2BAreaLabel(booking) !== "Fläche offen";
}

function hasB2BInterval(booking: Booking) {
  return getB2BIntervalLabel(booking) !== "Intervall offen";
}

function getCustomerBudget(booking: Booking) {
  const valuation = booking.details?.valuation;
  return valuation?.customerBudget || valuation?.priceSuggestion || null;
}

function normalizePhoneForContact(phone?: string) {
  const trimmed = cleanOptionalText(phone);
  if (!trimmed) return "";
  const withoutSpaces = trimmed.replace(/[\s()./-]/g, "");
  if (withoutSpaces.startsWith("+")) return withoutSpaces;
  if (withoutSpaces.startsWith("00")) return `+${withoutSpaces.slice(2)}`;
  if (withoutSpaces.startsWith("0")) return `+49${withoutSpaces.slice(1)}`;
  return withoutSpaces;
}

function buildWhatsAppContactUrl(booking: Booking) {
  const phone = normalizePhoneForContact(booking.phone);
  if (!phone) return "";
  const quality = getLeadQuality(booking);
  const text = encodeURIComponent(
    `Hallo ${booking.name}, hier ist FLOXANT. Wir haben Ihre Anfrage zu ${getServiceLabel(
      booking.service,
    )} erhalten. Können wir kurz ${quality.nextQuestion.toLowerCase()}?`,
  );
  return `https://wa.me/${phone.replace(/^\+/, "")}?text=${text}`;
}

function buildEmailContactUrl(booking: Booking) {
  const email = cleanOptionalText(booking.email);
  if (!hasUsefulText(email)) return "";
  const quality = getLeadQuality(booking);
  const subject = encodeURIComponent(`Ihre FLOXANT Anfrage zu ${getServiceLabel(booking.service)}`);
  const body = encodeURIComponent(
    `Hallo ${booking.name},\n\nvielen Dank für Ihre Anfrage zu ${getServiceLabel(
      booking.service,
    )}.\n\nFür eine saubere Prüfung brauchen wir noch kurz folgenden Punkt: ${
      quality.nextQuestion
    }.\n\nWenn möglich, senden Sie uns bitte auch Fotos, Terminwunsch und die wichtigsten Eckdaten zum Objekt.\n\nViele Grüße\nFLOXANT`,
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function hasBudget(booking: Booking) {
  const signals = booking.details?.valuation?.pricingSignals || {};
  return Boolean(
    getCustomerBudget(booking) ||
      signals.requestedBudgetText ||
      signals.budget ||
      booking.details?.configuration?.budget,
  );
}

function hasPriceSignal(booking: Booking) {
  const valuation = booking.details?.valuation;
  return Boolean(
    hasBudget(booking) ||
      valuation?.systemPriceRangeMin ||
      valuation?.systemPriceRangeMax ||
      valuation?.priceRangeMin ||
      valuation?.priceRangeMax,
  );
}

function hasUsefulText(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) && value > 0;
  if (typeof value === "boolean") return false;
  const text = cleanOptionalText(value).toLowerCase();
  return Boolean(
    text &&
      ![
        "nicht angegeben",
        "keine notiz",
        "keine einschätzung",
        "noch keine einschätzung",
        "unbekannter kunde",
      ].includes(text),
  );
}

function hasAnyConfigValue(config: Record<string, any>, keys: string[]) {
  return keys.some((key) => hasUsefulText(config[key]));
}

function getLeadQuality(booking: Booking): LeadQuality {
  const config = booking.details?.configuration || {};
  const message = firstText(
    [
      booking.details?.contact?.notes,
      booking.notes,
      config.customerMessage,
      config.message,
      config.description,
      config.specialNotes,
    ],
    "",
  );
  const dateIsKnown = hasAnyConfigValue(config, [
    "moveDate",
    "date",
    "desiredDate",
    "preferredDate",
    "deadline",
    "appointmentDate",
    "termin",
  ]);
  const hasScope = hasAnyConfigValue(config, [
    "areaM2",
    "cleaningAreaM2",
    "officeAreaM2",
    "squareMeters",
    "estimatedVolumeM3",
    "wasteVolumeM3",
    "cbm",
    "volumeM3",
    "rooms",
    "roomCount",
    "teamSize",
    "estimatedHours",
    "propertySize",
  ]);

  const missing: string[] = [];
  if (!hasUsefulText(booking.name)) missing.push("Name");
  if (!hasUsefulText(booking.phone) && !hasUsefulText(booking.email)) missing.push("Kontakt");
  if (!hasUsefulText(getMainLocation(booking))) missing.push("Ort/Adresse");
  if (!dateIsKnown) missing.push("Terminwunsch");
  if (!hasScope) missing.push("Fläche/Volumen/Umfang");
  if (!hasUsefulText(message)) missing.push("Kurzbeschreibung");
  if (!hasBudget(booking) && !hasPriceSignal(booking)) missing.push("Budget/Preisrahmen");
  if (booking.file_urls.length === 0) missing.push("Fotos/Anhänge");

  const coreMissing = missing.filter((item) =>
    ["Kontakt", "Ort/Adresse", "Terminwunsch", "Fläche/Volumen/Umfang"].includes(item),
  ).length;
  const nextQuestion =
    missing[0] === "Kontakt"
      ? "Kontaktweg anfragen"
      : missing[0] === "Ort/Adresse"
        ? "Ort oder Adresse klären"
        : missing[0] === "Terminwunsch"
          ? "Terminfenster klären"
          : missing[0] === "Fläche/Volumen/Umfang"
            ? "Umfang mit Fläche, Volumen oder Fotos klären"
            : missing[0] === "Kurzbeschreibung"
              ? "Kurzbeschreibung nachfragen"
              : missing[0] === "Budget/Preisrahmen"
                ? "Preisrahmen oder Systemschätzung prüfen"
                : missing[0] === "Fotos/Anhänge"
                  ? "Fotos für schnellere Prüfung anfragen"
                  : "Direkt prüfen";

  if (coreMissing === 0 && missing.length <= 2) {
    return {
      label: "Gut prüfbar",
      tone: "ready",
      missing,
      nextQuestion,
    };
  }

  if (coreMissing <= 1 && missing.length <= 4) {
    return {
      label: "Nachfrage nötig",
      tone: "needs-info",
      missing,
      nextQuestion,
    };
  }

  return {
    label: "Kerninfos fehlen",
    tone: "thin",
    missing,
    nextQuestion,
  };
}

function isClosed(booking: Booking) {
  return ["abgeschlossen", "storniert", "archived"].includes(booking.status);
}

function isReturnTrip(booking: Booking) {
  const service = booking.service.toLowerCase();
  const source = getSourceLabel(booking).toLowerCase();
  return (
    service.includes("leerfahrt") ||
    service.includes("beiladung") ||
    service.includes("rueckfahrt") ||
    source.includes("rückfahrt") ||
    source.includes("rueckfahrt")
  );
}

function isB2BCleaning(booking: Booking) {
  const service = booking.service.toLowerCase();
  const source = getSourceLabel(booking).toLowerCase();
  const config = booking.details?.configuration || {};
  return (
    service === "b2b_reinigung" ||
    source.includes("b2b") ||
    source.includes("gewerbe") ||
    Boolean(config.companyName && service.includes("reinigung"))
  );
}

function isCleaningService(booking: Booking) {
  return booking.service.toLowerCase().includes("reinigung");
}

function isDisposalService(booking: Booking) {
  const service = booking.service.toLowerCase();
  return service.includes("entsorgung") || service.includes("entruempelung");
}

function getLatestDocument(booking: Booking, type: FloxDocumentType) {
  const docs = booking.details?.admin?.docs || [];
  return [...docs]
    .filter((doc) => doc.type === type)
    .sort((a, b) => {
      const versionDelta = Number(b.version || 0) - Number(a.version || 0);
      if (versionDelta !== 0) return versionDelta;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })[0];
}

function hasOrderConfirmationOpen(booking: Booking) {
  if (isClosed(booking)) return false;
  const doc = getLatestDocument(booking, "order_confirmation");
  return !doc || !["approved", "sent", "paid"].includes(doc.status);
}

function shouldFollowUp(booking: Booking) {
  if (isClosed(booking)) return false;
  const docs = booking.details?.admin?.docs || [];
  const hasSentDocument = docs.some((doc) => ["approved", "sent"].includes(doc.status));
  const olderThanOneDay =
    Date.now() - new Date(booking.timestamp).getTime() > 24 * 60 * 60 * 1000;
  return booking.status === "angebot_versendet" || hasSentDocument || (olderThanOneDay && booking.status !== "new");
}

function getAgeInDays(value?: string) {
  if (!value) return 0;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000)));
}

function getFollowUpReason(booking: Booking) {
  const latestQuote = getLatestDocument(booking, "quote");
  const latestOrder = getLatestDocument(booking, "order_confirmation");
  const latestInvoice = getLatestDocument(booking, "invoice");
  const quality = getLeadQuality(booking);

  if (booking.status === "angebot_versendet" || (latestQuote && ["approved", "sent"].includes(latestQuote.status))) {
    return "Angebot nachfassen";
  }

  if (latestOrder && ["approved", "sent"].includes(latestOrder.status)) {
    return "AB nachfassen";
  }

  if (latestOrder && !["paid", "cancelled"].includes(latestOrder.status)) {
    return "AB klären";
  }

  if (latestInvoice && !["paid", "cancelled"].includes(latestInvoice.status)) {
    return "Rechnung prüfen";
  }

  if (quality.tone !== "ready") {
    return quality.nextQuestion;
  }

  if (getAgeInDays(booking.timestamp) >= 3) {
    return "Kontakt auffrischen";
  }

  return "Nächsten Schritt setzen";
}

function getFollowUpSummary(booking: Booking) {
  const config = booking.details?.configuration || {};
  return firstText(
    [
      booking.details?.admin?.nextAction,
      booking.details?.contact?.notes,
      booking.notes,
      config.customerMessage,
      config.message,
      config.description,
      config.specialNotes,
    ],
    "Keine Notiz hinterlegt",
  );
}

function needsOrderDocument(booking: Booking) {
  const quote = getLatestDocument(booking, "quote");
  const order = getLatestDocument(booking, "order_confirmation");
  return Boolean(
    quote &&
      ["approved", "sent"].includes(quote.status) &&
      (!order || !["approved", "sent", "paid"].includes(order.status)),
  );
}

function hasOpenInvoiceDocument(booking: Booking) {
  const invoice = getLatestDocument(booking, "invoice");
  return Boolean(invoice && !["paid", "cancelled"].includes(invoice.status));
}

function getDocumentNextStep(booking: Booking) {
  const quote = getLatestDocument(booking, "quote");
  const order = getLatestDocument(booking, "order_confirmation");
  const invoice = getLatestDocument(booking, "invoice");

  if (!quote) {
    return {
      label: "Angebot erstellen",
      text: "Preis, Leistungsumfang und Kundendaten prüfen, dann ein sauberes Angebot vorbereiten.",
    };
  }

  if (["draft", "generated"].includes(quote.status)) {
    return {
      label: "Angebot freigeben",
      text: "Angebot ist vorhanden, aber noch nicht als freigegeben oder versendet markiert.",
    };
  }

  if (!order) {
    return {
      label: "Auftragsbestätigung vorbereiten",
      text: "Nach Angebot oder Zusage den Auftrag verbindlich in eine AB überführen.",
    };
  }

  if (["draft", "generated"].includes(order.status)) {
    return {
      label: "Auftragsbestätigung klären",
      text: "AB prüfen, freigeben oder an den Kunden senden, damit Planung und Einsatz belastbar werden.",
    };
  }

  if (!invoice && ["approved", "sent"].includes(order.status)) {
    return {
      label: "Rechnung vorbereiten",
      text: "Nach bestätigtem Auftrag prüfen, ob Rechnung oder Zahlungsstatus als nächster Schritt nötig ist.",
    };
  }

  if (invoice && !["paid", "cancelled"].includes(invoice.status)) {
    return {
      label: "Rechnung nachhalten",
      text: "Rechnung ist vorhanden, aber noch nicht als bezahlt markiert.",
    };
  }

  return {
    label: "Dokumentenstand prüfen",
    text: "Die wichtigsten Dokumente sind angelegt. Bei Änderungen Angebot, AB oder Rechnung aktualisieren.",
  };
}

function formatMoneyRange(booking: Booking) {
  const valuation = booking.details?.valuation;
  const min = valuation?.systemPriceRangeMin || valuation?.priceRangeMin || 0;
  const max = valuation?.systemPriceRangeMax || valuation?.priceRangeMax || 0;
  if (!min && !max) return "Noch keine Einschätzung";
  if (min && max) return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  return formatCurrency(min || max);
}

function getNextStep(booking: Booking) {
  const adminNext = booking.details?.admin?.nextAction;
  if (adminNext) return adminNext;
  const quality = getLeadQuality(booking);
  if (!booking.phone && !booking.email) return "Kontakt ergänzen";
  if (quality.tone === "thin") return quality.nextQuestion;
  if (quality.tone === "needs-info" && booking.status === "new") return quality.nextQuestion;
  if (booking.status === "new") return "Anfrage prüfen";
  if (hasBudget(booking)) return "Preisrahmen prüfen";
  if (hasOrderConfirmationOpen(booking)) return "AB vorbereiten";
  if (shouldFollowUp(booking)) return "Kunde nachfassen";
  return "Vorgang öffnen";
}

function matchesInquiryFilter(booking: Booking, filter: InquiryFilter) {
  if (filter === "all") return true;
  if (filter === "new") return booking.status === "new";
  if (filter === "in-progress") return booking.status === "in_bearbeitung";
  if (filter === "budget") return hasBudget(booking);
  if (filter === "needs-info") return getLeadQuality(booking).tone !== "ready";
  if (filter === "b2b-cleaning") return isB2BCleaning(booking);
  if (filter === "return-trip") return isReturnTrip(booking);
  if (filter === "reinigung") return isCleaningService(booking);
  if (filter === "entsorgung") return isDisposalService(booking);
  if (filter === "umzug") {
    return !isCleaningService(booking) && !isDisposalService(booking) && !isReturnTrip(booking);
  }
  return true;
}

function inferInternalServiceType(booking?: Booking | null): InternalServiceType {
  if (!booking) return "umzug";
  if (isB2BCleaning(booking)) return "b2b_reinigung";
  if (isCleaningService(booking)) return "reinigung";
  if (isDisposalService(booking)) return "entsorgung";
  if (isReturnTrip(booking)) return "leer_rueckfahrt";
  return "umzug";
}

function numberFrom(config: Record<string, any>, keys: string[], fallback: number) {
  for (const key of keys) {
    const value = toSafeNumber(config[key], Number.NaN);
    if (Number.isFinite(value) && value > 0) return value;
  }
  return fallback;
}

function buildCostInput(booking?: Booking | null): InternalCostInput {
  const config = booking?.details?.configuration || {};
  const serviceType = inferInternalServiceType(booking);
  const conditionRaw = String(config.cleaningCondition || config.condition || "").toLowerCase();
  const cleaningCondition = conditionRaw.includes("stark")
    ? "stark"
    : conditionRaw.includes("leicht")
      ? "leicht"
      : "mittel";

  return {
    serviceType,
    distanceKm: numberFrom(config, ["distanceKm", "distance", "routeDistanceKm"], serviceType === "reinigung" ? 10 : 25),
    estimatedVolumeM3: numberFrom(config, ["estimatedVolumeM3", "cbm", "volumeM3", "wasteVolumeM3"], 10),
    estimatedHours: numberFrom(config, ["estimatedHours", "hours"], serviceType === "reinigung" || serviceType === "b2b_reinigung" ? 4 : 6),
    teamSize: numberFrom(config, ["teamSize", "crewSize", "helpers"], serviceType === "reinigung" ? 1 : 2),
    vehiclesCount: numberFrom(config, ["vehiclesCount", "vehicles"], 1),
    floorsFrom: toSafeNumber(config.fromFloor || config.floorsFrom),
    floorsTo: toSafeNumber(config.toFloor || config.floorsTo),
    elevatorFrom: Boolean(config.hasElevatorFrom || config.elevatorFrom),
    elevatorTo: Boolean(config.hasElevatorTo || config.elevatorTo),
    walkingDistanceMeters: numberFrom(config, ["walkingDistanceMeters", "loadingDistanceMeters", "walkingDistanceFrom"], 15),
    heavyItems: Array.isArray(config.heavyItems)
      ? config.heavyItems.length
      : toSafeNumber(config.heavyItems),
    packingService: Boolean(config.packingService),
    disassemblyService: Boolean(config.disassemblyService),
    assemblyService: Boolean(config.assemblyService),
    noParkingZone: Boolean(config.noParkingZone || config.noParkingZoneFrom || config.noParkingZoneTo),
    weekendOrUrgent: ["dringend", "express", "diese_woche", "wochenende"].includes(
      String(config.urgency || config.timeConstraint || "").toLowerCase(),
    ),
    disposalWeightKg: toSafeNumber(config.disposalWeightKg),
    cleaningAreaM2: numberFrom(config, ["areaM2", "cleaningAreaM2", "squareMeters", "officeAreaM2"], 120),
    cleaningCondition,
    customerPriceGross: booking ? getCustomerBudget(booking) || undefined : undefined,
    vatRate: DEFAULT_VAT_RATE,
    desiredMarginPercent: DEFAULT_DESIRED_MARGIN_PERCENT,
  };
}

function getVerdictCopy(result: InternalCostResult) {
  if (result.verdict === "gut") return "Gut";
  if (result.verdict === "knapp") return "Knapp";
  if (result.verdict === "riskant") return "Riskant";
  return "Verlust";
}

function getVerdictTone(result: InternalCostResult) {
  if (result.verdict === "gut") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (result.verdict === "knapp") return "border-amber-200 bg-amber-50 text-amber-700";
  if (result.verdict === "riskant") return "border-orange-200 bg-orange-50 text-orange-700";
  return "border-red-200 bg-red-50 text-red-700";
}

function getPricingDecision(result: InternalCostResult) {
  if (!result.customerPriceNet) {
    return {
      label: "Zielpreis als Ausgangspunkt",
      text: "Es liegt noch kein Kundenpreis vor. Mit Mindestpreis, Zielpreis und Kostentreibern argumentieren, statt vorschnell eine Zahl zu nennen.",
      action: "Preisrahmen sauber erklären",
      tone: "border-blue-200 bg-blue-50 text-blue-800",
    };
  }

  if (result.verdict === "gut") {
    return {
      label: "Preis ist tragfähig",
      text: "Der Kundenpreis deckt Kosten, Risiko und Marge. Wenn Umfang und Termin stimmen, kann daraus ein belastbares Angebot entstehen.",
      action: "Angebot vorbereiten",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-800",
    };
  }

  if (result.verdict === "knapp") {
    return {
      label: "Preis knapp prüfen",
      text: "Der Rahmen ist möglich, aber empfindlich. Umfang, Laufwege, Zeitfenster oder Extras vor Zusage noch einmal schärfen.",
      action: "Umfang mit Kunde klären",
      tone: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }

  if (result.verdict === "riskant") {
    return {
      label: "Nicht blind zusagen",
      text: "Der Preis lässt wenig Puffer. Erst Leistung reduzieren, Termin entspannen oder Preisrahmen neu abstimmen.",
      action: "Nachverhandeln oder Umfang reduzieren",
      tone: "border-orange-200 bg-orange-50 text-orange-800",
    };
  }

  return {
    label: "Preis erzeugt Verlust",
    text: "Der Kundenpreis liegt unter den internen Kosten. Ohne Anpassung sollte dieser Auftrag nicht bestätigt werden.",
    action: "Neuen Preisrahmen setzen",
    tone: "border-red-200 bg-red-50 text-red-800",
  };
}

export default function DashboardClient({ dict }: DashboardClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [backhaulOffers, setBackhaulOffers] = useState<BackhaulOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState<InquiryFilter>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDetailTab, setSelectedDetailTab] = useState<DetailTab>("customer");
  const [selectedPriceBookingId, setSelectedPriceBookingId] = useState<string | null>(null);
  const [selectedPlanningBookingId, setSelectedPlanningBookingId] = useState<string | null>(null);
  const [selectedDocumentsBookingId, setSelectedDocumentsBookingId] = useState<string | null>(null);
  const [backhaulForm, setBackhaulForm] =
    useState<Partial<BackhaulOffer>>(initialBackhaulForm);
  const [savingBackhaul, setSavingBackhaul] = useState(false);
  const [backhaulActionError, setBackhaulActionError] = useState("");

  const loadingText = dict?.auth?.loading || "Dashboard wird geladen.";

  useEffect(() => {
    migrateDashboardLocalStorage();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    let mounted = true;

    async function loadDashboardData() {
      setLoading(true);
      setError(null);

      try {
        const [bookingResponse, backhaulResponse] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/backhauls?all=1"),
        ]);

        if (!bookingResponse.ok) {
          throw new Error("Anfragen konnten nicht geladen werden.");
        }

        const bookingData = await bookingResponse.json();
        const backhaulData = backhaulResponse.ok ? await backhaulResponse.json() : [];

        if (!mounted) return;

        setBookings(Array.isArray(bookingData) ? bookingData.map(normalizeBooking) : []);
        setBackhaulOffers(
          Array.isArray(backhaulData) ? germanizeDeep(backhaulData) : [],
        );
      } catch (loadError: any) {
        if (mounted) setError(loadError?.message || "Dashboard konnte nicht geladen werden.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void loadDashboardData();

    return () => {
      mounted = false;
    };
  }, [status]);

  useEffect(() => {
    const nextTab = normalizeWorkspaceTab(searchParams.get("tab"));
    if (activeTab !== nextTab) setActiveTab(nextTab);
  }, [activeTab, searchParams]);

  const activeBookings = useMemo(
    () => bookings.filter((booking) => booking.status !== "deleted"),
    [bookings],
  );

  const filteredBookings = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();

    return activeBookings
      .filter((booking) => matchesInquiryFilter(booking, inquiryFilter))
      .filter((booking) => {
        if (!needle) return true;
        const haystack = [
          booking.name,
          booking.email,
          booking.phone,
          getServiceLabel(booking.service),
          getSourceLabel(booking),
          getMainLocation(booking),
          booking.details?.contact?.notes,
          booking.details?.admin?.nextAction,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(needle);
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [activeBookings, inquiryFilter, searchTerm]);

  const priceReviewBookings = useMemo(
    () =>
      bookings
        .filter((booking) => !isClosed(booking) && (hasPriceSignal(booking) || booking.status === "new"))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [bookings],
  );

  const planningBookings = useMemo(
    () =>
      bookings
        .filter((booking) => !isClosed(booking) && !isReturnTrip(booking))
        .sort((a, b) => {
          const aPlanned = a.details?.admin?.workOrder ? 1 : 0;
          const bPlanned = b.details?.admin?.workOrder ? 1 : 0;
          if (aPlanned !== bPlanned) return bPlanned - aPlanned;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }),
    [bookings],
  );

  const documentBookings = useMemo(
    () =>
      bookings
        .filter((booking) => !isReturnTrip(booking))
        .sort((a, b) => {
          const aDocs = a.details?.admin?.docs?.length || 0;
          const bDocs = b.details?.admin?.docs?.length || 0;
          if (aDocs !== bDocs) return bDocs - aDocs;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }),
    [bookings],
  );

  const b2bBookings = useMemo(
    () =>
      bookings
        .filter(isB2BCleaning)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [bookings],
  );

  const followUpBookings = useMemo(
    () =>
      bookings
        .filter(shouldFollowUp)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [bookings],
  );

  const newRequestsCount = bookings.filter((booking) => booking.status === "new").length;
  const priceReviewOpenCount = priceReviewBookings.filter((booking) => {
    const decision = booking.details?.admin?.commercialDecision?.decision;
    return !decision || decision === "review";
  }).length;
  const abOpenCount = bookings.filter(hasOrderConfirmationOpen).length;
  const activeBackhaulsCount = backhaulOffers.filter((offer) => offer.status === "active").length;

  const priorityTasks = useMemo<PriorityTask[]>(() => {
    const tasks: PriorityTask[] = [];
    const used = new Set<string>();

    function pushBooking(booking: Booking, reason: string, nextStep: string, tab?: WorkspaceTab) {
      if (used.has(booking.id) || tasks.length >= 5) return;
      used.add(booking.id);
      tasks.push({
        id: `${reason}-${booking.id}`,
        customer: booking.name,
        reason,
        nextStep,
        booking,
        tab,
      });
    }

    bookings
      .filter((booking) => !isClosed(booking) && getLeadQuality(booking).tone === "thin")
      .slice(0, 2)
      .forEach((booking) =>
        pushBooking(booking, "Kerninfos fehlen", getLeadQuality(booking).nextQuestion, "inquiries"),
      );

    bookings
      .filter((booking) => booking.status === "new")
      .slice(0, 2)
      .forEach((booking) => pushBooking(booking, "Neue Anfrage", "Kontakt und Umfang prüfen", "inquiries"));

    priceReviewBookings
      .slice(0, 2)
      .forEach((booking) => pushBooking(booking, "Preisprüfung offen", "Marge und Risiko prüfen", "price-review"));

    bookings
      .filter(hasOrderConfirmationOpen)
      .slice(0, 2)
      .forEach((booking) => pushBooking(booking, "AB offen", "Dokumente vorbereiten", "documents"));

    followUpBookings
      .slice(0, 2)
      .forEach((booking) => pushBooking(booking, "Nachfassen", "Kundenkontakt setzen", "follow-up"));

    backhaulOffers
      .filter((offer) => offer.status === "active")
      .slice(0, 1)
      .forEach((offer) => {
        if (tasks.length < 5) {
          tasks.push({
            id: `backhaul-${offer.id}`,
            customer: offer.title,
            reason: "Rückfahrt aktiv",
            nextStep: "Route und freie Kapazität prüfen",
            tab: "return-trips",
          });
        }
      });

    return tasks.slice(0, 5);
  }, [backhaulOffers, bookings, followUpBookings, priceReviewBookings]);

  const selectedPriceBooking =
    priceReviewBookings.find((booking) => booking.id === selectedPriceBookingId) ||
    priceReviewBookings[0] ||
    null;
  const selectedPlanningBooking =
    planningBookings.find((booking) => booking.id === selectedPlanningBookingId) ||
    planningBookings[0] ||
    null;
  const selectedDocumentsBooking =
    documentBookings.find((booking) => booking.id === selectedDocumentsBookingId) ||
    documentBookings[0] ||
    null;

  useEffect(() => {
    if (!selectedPriceBookingId && priceReviewBookings[0]) {
      setSelectedPriceBookingId(priceReviewBookings[0].id);
    }
  }, [priceReviewBookings, selectedPriceBookingId]);

  useEffect(() => {
    if (!selectedPlanningBookingId && planningBookings[0]) {
      setSelectedPlanningBookingId(planningBookings[0].id);
    }
  }, [planningBookings, selectedPlanningBookingId]);

  useEffect(() => {
    if (!selectedDocumentsBookingId && documentBookings[0]) {
      setSelectedDocumentsBookingId(documentBookings[0].id);
    }
  }, [documentBookings, selectedDocumentsBookingId]);

  function setWorkspace(nextTab: WorkspaceTab) {
    setActiveTab(nextTab);
    setMobileNavOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (nextTab === "overview") {
      params.delete("tab");
    } else {
      params.set("tab", nextTab);
    }
    const query = params.toString();
    router.replace(query ? `/dashboard?${query}` : "/dashboard", { scroll: false });
  }

  function activateInquiries(filter: InquiryFilter = "all") {
    setInquiryFilter(filter);
    setWorkspace("inquiries");
  }

  function openBooking(booking: Booking, tab: DetailTab = "customer") {
    setSelectedBooking(booking);
    setSelectedDetailTab(tab);
  }

  function handleBookingUpdate(updatedBooking: Booking) {
    const normalized = normalizeBooking(updatedBooking);
    setBookings((current) =>
      current.map((booking) => (booking.id === normalized.id ? normalized : booking)),
    );
    if (selectedBooking?.id === normalized.id) {
      setSelectedBooking(normalized);
    }
  }

  async function handleDeleteBooking(bookingId: string) {
    const response = await fetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Löschen fehlgeschlagen");
    }

    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
    if (selectedBooking?.id === bookingId) setSelectedBooking(null);
  }

  async function reloadBackhauls() {
    const response = await fetch("/api/backhauls?all=1");
    const payload = await response.json();
    if (Array.isArray(payload)) setBackhaulOffers(germanizeDeep(payload));
  }

  function updateBackhaulField<K extends keyof BackhaulOffer>(
    key: K,
    value: BackhaulOffer[K] | string,
  ) {
    setBackhaulForm((current) => {
      if (key === "routeAreas") {
        const routeAreas = Array.isArray(value)
          ? value
          : String(value)
              .split(/[,;\n]/)
              .map((item) => cleanOptionalText(item))
              .filter(Boolean);
        return { ...current, routeAreas };
      }
      return { ...current, [key]: value };
    });
  }

  async function saveBackhaulOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBackhaulActionError("");
    if (!cleanOptionalText(backhaulForm.title)) {
      setBackhaulActionError("Bitte mindestens einen Titel für die Rückfahrt eintragen.");
      return;
    }
    setSavingBackhaul(true);

    try {
      const response = await fetch("/api/backhauls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backhaulForm),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Rückfahrt konnte nicht gespeichert werden.");
      await reloadBackhauls();
      setBackhaulForm(initialBackhaulForm);
    } catch (saveError: any) {
      setBackhaulActionError(saveError?.message || "Rückfahrt konnte nicht gespeichert werden.");
    } finally {
      setSavingBackhaul(false);
    }
  }

  async function updateBackhaulStatus(offer: BackhaulOffer, nextStatus: BackhaulOffer["status"]) {
    setBackhaulActionError("");
    try {
      const response = await fetch(`/api/backhauls/${offer.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...offer, status: nextStatus }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Status konnte nicht aktualisiert werden.");
      await reloadBackhauls();
    } catch (updateError: any) {
      setBackhaulActionError(updateError?.message || "Status konnte nicht aktualisiert werden.");
    }
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500">
        {loadingText}
      </div>
    );
  }

  const activeMeta = workspaceMeta[activeTab];
  const ActiveIcon = activeMeta.icon;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">
      <MobileDrawer
        open={mobileNavOpen}
        activeTab={activeTab}
        onClose={() => setMobileNavOpen(false)}
        onSelect={setWorkspace}
      />

      <Sidebar activeTab={activeTab} onSelect={setWorkspace} />

      <div className="min-h-screen lg:pl-[300px]">
        <div className="mx-auto max-w-[1520px] px-4 py-4 sm:px-6 lg:px-8">
          <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 sm:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  aria-label="Navigation öffnen"
                  onClick={() => setMobileNavOpen(true)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <ActiveIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {activeMeta.label}
                  </p>
                  <h1 className="truncate text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {activeTab === "overview" ? "Überblick" : activeMeta.label}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex max-w-full items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                  <span className="truncate">{session?.user?.email || "Angemeldet"}</span>
                </span>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  Abmelden
                </button>
              </div>
            </div>
          </header>

          <main className="mt-5">
            {error ? (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {activeTab === "overview" ? (
              <OverviewWorkspace
                loading={loading}
                newRequestsCount={newRequestsCount}
                priceReviewOpenCount={priceReviewOpenCount}
                abOpenCount={abOpenCount}
                followUpCount={followUpBookings.length}
                activeBackhaulsCount={activeBackhaulsCount}
                priorityTasks={priorityTasks}
                onOpenTask={(task) => {
                  if (task.booking) {
                    openBooking(task.booking);
                    return;
                  }
                  if (task.tab) setWorkspace(task.tab);
                }}
                onShortcut={(tab, filter) => {
                  if (tab === "inquiries") {
                    activateInquiries(filter || "all");
                    return;
                  }
                  setWorkspace(tab);
                }}
              />
            ) : null}

            {activeTab === "inquiries" ? (
              <InquiriesWorkspace
                loading={loading}
                allBookings={activeBookings}
                bookings={filteredBookings}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                inquiryFilter={inquiryFilter}
                setInquiryFilter={setInquiryFilter}
                onOpen={openBooking}
              />
            ) : null}

            {activeTab === "price-review" ? (
              <PriceReviewWorkspace
                bookings={priceReviewBookings}
                selectedBooking={selectedPriceBooking}
                selectedId={selectedPriceBookingId}
                setSelectedId={setSelectedPriceBookingId}
                onOpen={(booking) => openBooking(booking, "price")}
              />
            ) : null}

            {activeTab === "planning" ? (
              <PlanningWorkspace
                bookings={planningBookings}
                selectedBooking={selectedPlanningBooking}
                selectedId={selectedPlanningBookingId}
                setSelectedId={setSelectedPlanningBookingId}
                onOpen={(booking) => openBooking(booking, "planning")}
              />
            ) : null}

            {activeTab === "documents" ? (
              <DocumentsWorkspace
                bookings={documentBookings}
                selectedBooking={selectedDocumentsBooking}
                selectedId={selectedDocumentsBookingId}
                setSelectedId={setSelectedDocumentsBookingId}
                onOpen={(booking) => openBooking(booking, "documents")}
              />
            ) : null}

            {activeTab === "return-trips" ? (
              <ReturnTripsWorkspace
                offers={backhaulOffers}
                form={backhaulForm}
                saving={savingBackhaul}
                error={backhaulActionError}
                onChange={updateBackhaulField}
                onSubmit={saveBackhaulOffer}
                onStatus={updateBackhaulStatus}
              />
            ) : null}

            {activeTab === "b2b-cleaning" ? (
              <B2BCleaningWorkspace
                loading={loading}
                bookings={b2bBookings}
                onOpen={(booking) => openBooking(booking, "customer")}
              />
            ) : null}

            {activeTab === "follow-up" ? (
              <FollowUpWorkspace
                loading={loading}
                bookings={followUpBookings}
                onOpen={(booking) => openBooking(booking, "history")}
              />
            ) : null}

            {activeTab === "settings" ? <SettingsWorkspace /> : null}
          </main>
        </div>
      </div>

      {selectedBooking ? (
        <RequestDetailPanel
          booking={selectedBooking}
          activeTab={selectedDetailTab}
          setActiveTab={setSelectedDetailTab}
          onClose={() => setSelectedBooking(null)}
          onSave={handleBookingUpdate}
          onDelete={handleDeleteBooking}
        />
      ) : null}
    </div>
  );
}

function Sidebar({
  activeTab,
  onSelect,
}: {
  activeTab: WorkspaceTab;
  onSelect: (tab: WorkspaceTab) => void;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[300px] border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col p-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
            FLOXANT Backoffice
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-950">Operatives Zentrum</h2>
          <p className="mt-1 text-sm leading-snug text-slate-600">
            Anfragen, Preise, Planung und Dokumente sauber getrennt.
          </p>
        </div>

        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto" aria-label="Dashboard Navigation">
          {WORKSPACE_TABS.map((tab) => {
            const meta = workspaceMeta[tab];
            const Icon = meta.icon;
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSelect(tab)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                  active
                    ? "bg-blue-50 text-blue-800 ring-1 ring-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    active ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold">{meta.label}</span>
                  <span className="block truncate text-xs text-slate-500">{meta.description}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function MobileDrawer({
  open,
  activeTab,
  onClose,
  onSelect,
}: {
  open: boolean;
  activeTab: WorkspaceTab;
  onClose: () => void;
  onSelect: (tab: WorkspaceTab) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Navigation schließen"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40"
      />
      <aside className="relative h-full w-[88vw] max-w-[340px] overflow-y-auto bg-white p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              FLOXANT Backoffice
            </p>
            <h2 className="mt-2 text-lg font-bold text-slate-950">Operatives Zentrum</h2>
          </div>
          <button
            type="button"
            aria-label="Navigation schließen"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-white hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 space-y-1" aria-label="Mobile Dashboard Navigation">
          {WORKSPACE_TABS.map((tab) => {
            const meta = workspaceMeta[tab];
            const Icon = meta.icon;
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSelect(tab)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                  active
                    ? "bg-blue-50 text-blue-800 ring-1 ring-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-bold">{meta.label}</span>
                  <span className="block text-xs text-slate-500">{meta.description}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

function PageHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function OverviewWorkspace({
  loading,
  newRequestsCount,
  priceReviewOpenCount,
  abOpenCount,
  followUpCount,
  activeBackhaulsCount,
  priorityTasks,
  onOpenTask,
  onShortcut,
}: {
  loading: boolean;
  newRequestsCount: number;
  priceReviewOpenCount: number;
  abOpenCount: number;
  followUpCount: number;
  activeBackhaulsCount: number;
  priorityTasks: PriorityTask[];
  onOpenTask: (task: PriorityTask) => void;
  onShortcut: (tab: WorkspaceTab, filter?: InquiryFilter) => void;
}) {
  const workFlow: Array<{
    label: string;
    text: string;
    tab: WorkspaceTab;
    filter?: InquiryFilter;
  }> = [
    {
      label: "1. Anfrage öffnen",
      text: "Kontakt, Ort, Service und Nachricht kurz prüfen.",
      tab: "inquiries" as WorkspaceTab,
      filter: "new" as InquiryFilter,
    },
    {
      label: "2. Preisrahmen prüfen",
      text: "Budget, Mindestpreis, Zielpreis und Risiko abgleichen.",
      tab: "price-review" as WorkspaceTab,
    },
    {
      label: "3. Auftrag planen",
      text: "Team, Fahrzeug, Termin, Zugang und Extras festhalten.",
      tab: "planning" as WorkspaceTab,
    },
    {
      label: "4. Dokumente sauber machen",
      text: "Angebot, AB und Rechnung getrennt vorbereiten.",
      tab: "documents" as WorkspaceTab,
    },
  ];

  const decisionQueue: Array<{
    label: string;
    value: number;
    text: string;
    tab: WorkspaceTab;
    filter?: InquiryFilter;
  }> = [
    {
      label: "Lead zuerst",
      value: newRequestsCount,
      text: "Neue Anfrage öffnen und Grunddaten prüfen.",
      tab: "inquiries" as WorkspaceTab,
      filter: "new" as InquiryFilter,
    },
    {
      label: "Preis entscheiden",
      value: priceReviewOpenCount,
      text: "Budget, Mindestpreis, Marge und Risiko prüfen.",
      tab: "price-review" as WorkspaceTab,
    },
    {
      label: "Dokument nachziehen",
      value: abOpenCount,
      text: "Angebot, AB oder Rechnung sauber weiterführen.",
      tab: "documents" as WorkspaceTab,
    },
    {
      label: "Kontakt sichern",
      value: followUpCount,
      text: "Kunden nachfassen, bevor Vorgänge liegen bleiben.",
      tab: "follow-up" as WorkspaceTab,
    },
  ];

  const focusNotes = [
    {
      label: "Heute zuerst",
      text: "Neue Leads, offene Preise und fehlende ABs nicht vermischen.",
    },
    {
      label: "Ruhig prüfen",
      text: "Erst Grunddaten, Budget und Risiko klären, dann planen.",
    },
    {
      label: "Nächster Schritt",
      text: "Jeder Vorgang braucht genau eine klare Folgeaktion.",
    },
  ];

  return (
    <section>
      <PageHeader
        title="Überblick"
        text="Heute offene Vorgänge, Entscheidungen und nächste Schritte."
      />

      <div className="mb-5 grid gap-3 lg:grid-cols-3">
        {focusNotes.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50/65 p-4 shadow-sm shadow-slate-950/5"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-700">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          icon={Inbox}
          label="Neue Anfragen"
          hint="Direkt zur Lead-Liste mit neuen Vorgängen."
          value={newRequestsCount}
          tone="blue"
          onClick={() => onShortcut("inquiries", "new")}
        />
        <KpiCard
          icon={Calculator}
          label="Preisprüfung offen"
          hint="Budget, Mindestpreis und Risiko prüfen."
          value={priceReviewOpenCount}
          tone="amber"
          onClick={() => onShortcut("price-review")}
        />
        <KpiCard
          icon={FileCheck2}
          label="AB offen"
          hint="Angebote und Auftragsbestätigungen nachziehen."
          value={abOpenCount}
          tone="slate"
          onClick={() => onShortcut("documents")}
        />
        <KpiCard
          icon={MessageCircle}
          label="Nachfassen"
          hint="Offene Kundenkontakte und Rückmeldungen."
          value={followUpCount}
          tone="orange"
          onClick={() => onShortcut("follow-up")}
        />
        <KpiCard
          icon={Truck}
          label="Rückfahrten aktiv"
          hint="Freie Kapazitäten und Routen prüfen."
          value={activeBackhaulsCount}
          tone="emerald"
          onClick={() => onShortcut("return-trips")}
        />
      </div>

      <div className="mt-5">
        <Panel
          title="Entscheidung heute"
          subtitle="Der schnellste Weg zum nächsten sinnvollen Schritt."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {decisionQueue.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onShortcut(item.tab, item.filter)}
                className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-lg hover:shadow-blue-950/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
                      {loading ? "..." : item.value}
                    </p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 transition group-hover:border-blue-200 group-hover:bg-white group-hover:text-blue-700">
                    Öffnen
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Priorität heute" subtitle="Maximal die wichtigsten offenen Vorgänge.">
          {loading ? (
            <EmptyState text="Dashboard-Daten werden geladen." />
          ) : priorityTasks.length === 0 ? (
            <EmptyState text="Aktuell gibt es keine dringende Aufgabe." />
          ) : (
            <div className="divide-y divide-slate-100">
              {priorityTasks.map((task) => (
                <div
                  key={task.id}
                  className="grid gap-3 py-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-950">{task.customer}</p>
                    <p className="text-xs text-slate-500">{task.reason}</p>
                  </div>
                  <p className="text-sm text-slate-600">{task.nextStep}</p>
                  <p className="text-xs text-slate-500">
                    {task.booking ? getServiceLabel(task.booking.service) : "Rückfahrt"}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenTask(task)}
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-3 text-xs font-bold text-white transition hover:bg-blue-700"
                  >
                    Öffnen
                  </button>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <div className="grid gap-5">
          <Panel title="Schnellzugriff" subtitle="Direkt in den richtigen Arbeitsmodus.">
            <div className="grid gap-2">
              <ShortcutButton label="Neue Anfrage prüfen" onClick={() => onShortcut("inquiries", "new")} />
              <ShortcutButton label="Preis berechnen" onClick={() => onShortcut("price-review")} />
              <ShortcutButton label="Auftrag planen" onClick={() => onShortcut("planning")} />
              <ShortcutButton label="Dokument erstellen" onClick={() => onShortcut("documents")} />
              <ShortcutButton label="Nachfassen" onClick={() => onShortcut("follow-up")} />
            </div>
          </Panel>

          <Panel title="Arbeitsfolge" subtitle="Vom Lead zur sauberen Auftragsbasis.">
            <div className="grid gap-2">
              {workFlow.map((step) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => onShortcut(step.tab, step.filter)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="text-sm font-black text-slate-950">{step.label}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">{step.text}</div>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function KpiCard({
  icon: Icon,
  label,
  hint,
  value,
  tone,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  hint: string;
  value: number;
  tone: "blue" | "amber" | "slate" | "orange" | "emerald";
  onClick: () => void;
}) {
  const toneMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${hint}`}
      className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-950/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", toneMap[tone])}>
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-2xl font-black tracking-tight text-slate-950">{value}</span>
      </div>
      <p className="mt-3 text-sm font-bold text-slate-950">{label}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700 opacity-0 transition group-hover:opacity-100">
        Öffnen
        <ArrowRight className="h-3 w-3" />
      </span>
    </button>
  );
}

function ShortcutButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function InquiriesWorkspace({
  loading,
  allBookings,
  bookings,
  searchTerm,
  setSearchTerm,
  inquiryFilter,
  setInquiryFilter,
  onOpen,
}: {
  loading: boolean;
  allBookings: Booking[];
  bookings: Booking[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  inquiryFilter: InquiryFilter;
  setInquiryFilter: (value: InquiryFilter) => void;
  onOpen: (booking: Booking) => void;
}) {
  const filterCounts = useMemo(
    () =>
      inquiryFilters.reduce<Record<InquiryFilter, number>>((acc, filter) => {
        acc[filter.id] =
          filter.id === "all"
            ? allBookings.length
            : allBookings.filter((booking) => matchesInquiryFilter(booking, filter.id)).length;
        return acc;
      }, {} as Record<InquiryFilter, number>),
    [allBookings],
  );

  const hasActiveSearch = searchTerm.trim().length > 0;
  const hasActiveFilter = inquiryFilter !== "all";
  const hasActiveLimit = hasActiveSearch || hasActiveFilter;
  const triageCards: Array<{
    id: InquiryFilter;
    label: string;
    text: string;
    tone: string;
  }> = [
    {
      id: "new",
      label: "Neu",
      text: "Frisch eingegangene Anfragen zuerst prüfen.",
      tone: "border-blue-100 bg-blue-50 text-blue-900",
    },
    {
      id: "needs-info",
      label: "Angaben fehlen",
      text: "Erst Kontakt, Ort, Umfang oder Termin nachfragen.",
      tone: "border-amber-100 bg-amber-50 text-amber-900",
    },
    {
      id: "budget",
      label: "Budget vorhanden",
      text: "Preisrahmen mit Aufwand und Risiko abgleichen.",
      tone: "border-emerald-100 bg-emerald-50 text-emerald-900",
    },
    {
      id: "b2b-cleaning",
      label: "B2B-Reinigung",
      text: "Objekt, Fläche, Intervall und Ansprechpartner klären.",
      tone: "border-cyan-100 bg-cyan-50 text-cyan-950",
    },
  ];

  return (
    <section>
      <PageHeader
        title="Anfragen"
        text="Neue Kundenanfragen suchen, filtern und öffnen."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          {triageCards.map((item) => {
            const active = inquiryFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setInquiryFilter(item.id)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-950/5",
                  item.tone,
                  active ? "ring-2 ring-blue-300" : "",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-black">{item.label}</span>
                  <span className="rounded-full bg-white/80 px-2 py-1 text-xs font-black">
                    {filterCounts[item.id] || 0}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 opacity-80">{item.text}</p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Name, Telefon, E-Mail, Ort oder Service suchen"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-950 outline-none focus:border-blue-300 focus:bg-white"
            />
            {hasActiveSearch ? (
              <button
                type="button"
                aria-label="Suche leeren"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {inquiryFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setInquiryFilter(filter.id)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-bold transition",
                  inquiryFilter === filter.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50",
                )}
              >
                <span>{filter.label}</span>
                <span
                  className={cn(
                    "ml-2 rounded-full px-1.5 py-0.5 text-[10px]",
                    inquiryFilter === filter.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                  )}
                >
                  {filterCounts[filter.id] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {bookings.length} von {allBookings.length} Vorgängen sichtbar
            {hasActiveSearch ? ` · Suche: "${searchTerm.trim()}"` : ""}
          </span>
          {hasActiveLimit ? (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setInquiryFilter("all");
              }}
              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Filter zurücksetzen
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <EmptyState text="Anfragen werden geladen." />
        ) : bookings.length === 0 ? (
          <EmptyState text="Keine passenden Anfragen gefunden." />
        ) : (
          <BookingsTable bookings={bookings} onOpen={onOpen} />
        )}
      </div>
    </section>
  );
}

function BookingsTable({
  bookings,
  onOpen,
}: {
  bookings: Booking[];
  onOpen: (booking: Booking) => void;
}) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 md:block">
        <div className="overflow-x-auto">
          <table className="min-w-[1080px] w-full divide-y divide-slate-100 text-left">
            <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Kunde</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Herkunft</th>
                <th className="px-4 py-3">Budget</th>
                <th className="px-4 py-3">Prüfung</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Nächster Schritt</th>
                <th className="px-4 py-3 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} onOpen={() => onOpen(booking)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {bookings.map((booking) => (
          <MobileBookingCard key={booking.id} booking={booking} onOpen={() => onOpen(booking)} />
        ))}
      </div>
    </>
  );
}

function BookingRow({ booking, onOpen }: { booking: Booking; onOpen: () => void }) {
  return (
    <tr className="align-top transition hover:bg-blue-50/40">
      <td className="px-4 py-3">
        <div className="font-bold text-slate-950">{booking.name}</div>
        <div className="mt-1 text-xs text-slate-500">
          {firstText([booking.phone, booking.email], "Kontakt nicht angegeben")}
        </div>
        <CustomerQuickActions booking={booking} compact />
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">{getServiceLabel(booking.service)}</td>
      <td className="px-4 py-3">
        <div className="text-sm text-slate-700">{getSourceLabel(booking)}</div>
        <div className="mt-1 max-w-[180px] truncate text-xs text-slate-500">{getMainLocation(booking)}</div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        {getCustomerBudget(booking) ? formatCurrency(getCustomerBudget(booking)) : "Noch keine Einschätzung"}
      </td>
      <td className="px-4 py-3">
        <LeadQualityBadge booking={booking} />
      </td>
      <td className="px-4 py-3">
        <StatusPill status={booking.status} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{formatDateTime(booking.timestamp)}</td>
      <td className="px-4 py-3 text-sm text-slate-700">{getNextStep(booking)}</td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-3 text-xs font-bold text-white transition hover:bg-blue-700"
        >
          Öffnen
        </button>
      </td>
    </tr>
  );
}

function MobileBookingCard({ booking, onOpen }: { booking: Booking; onOpen: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-slate-950">{booking.name}</h3>
          <p className="mt-1 text-xs text-slate-500">{getServiceLabel(booking.service)} · {getSourceLabel(booking)}</p>
        </div>
        <StatusPill status={booking.status} />
      </div>
      <div className="mt-3 grid gap-2 text-sm text-slate-600">
        <MiniLine label="Budget" value={getCustomerBudget(booking) ? formatCurrency(getCustomerBudget(booking)) : "Noch keine Einschätzung"} />
        <MiniLine label="Ort" value={getMainLocation(booking)} />
        <div>
          <p className="mb-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">Prüfung</p>
          <LeadQualityBadge booking={booking} />
        </div>
        <MiniLine label="Nächster Schritt" value={getNextStep(booking)} />
      </div>
      <CustomerQuickActions booking={booking} />
      <button
        type="button"
        onClick={onOpen}
        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white"
      >
        Öffnen
      </button>
    </div>
  );
}

function PriceReviewWorkspace({
  bookings,
  selectedBooking,
  selectedId,
  setSelectedId,
  onOpen,
}: {
  bookings: Booking[];
  selectedBooking: Booking | null;
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  onOpen: (booking: Booking) => void;
}) {
  return (
    <section>
      <PageHeader
        title="Preisprüfung"
        text="Preisvorschlag, Mindestpreis, Zielpreis, Marge und Risiko getrennt prüfen."
      />

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <Panel title="Vorgänge" subtitle="Anfrage für die Prüfung wählen.">
          <SelectableBookingList
            bookings={bookings}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            emptyText="Noch keine Anfrage für die Preisprüfung vorhanden."
          />
        </Panel>

        <PricingForm booking={selectedBooking} onOpen={onOpen} />
      </div>
    </section>
  );
}

function PricingForm({
  booking,
  onOpen,
}: {
  booking: Booking | null;
  onOpen: (booking: Booking) => void;
}) {
  const [input, setInput] = useState<InternalCostInput>(() => buildCostInput(booking));

  useEffect(() => {
    setInput(buildCostInput(booking));
  }, [booking?.id]);

  const result = useMemo(() => calculateInternalCost(input), [input]);
  const decision = getPricingDecision(result);

  function setNumberField(key: keyof InternalCostInput, value: string) {
    setInput((current) => ({
      ...current,
      [key]: value === "" ? undefined : Number(value),
    }));
  }

  if (!booking) {
    return <EmptyState text="Bitte links zuerst einen Vorgang wählen." />;
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <Panel title="Eingaben" subtitle="Service, Aufwand, Team und Kundenpreis.">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <FieldLabel>Service</FieldLabel>
            <select
              value={input.serviceType}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  serviceType: event.target.value as InternalServiceType,
                }))
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
            >
              <option value="umzug">Umzug</option>
              <option value="reinigung">Reinigung</option>
              <option value="entsorgung">Entrümpelung</option>
              <option value="b2b_reinigung">B2B-Reinigung</option>
              <option value="leer_rueckfahrt">Rückfahrt</option>
            </select>
          </label>
          <NumberField label="Kundenpreis brutto" value={input.customerPriceGross} onChange={(value) => setNumberField("customerPriceGross", value)} />
          <NumberField label="Distanz km" value={input.distanceKm} onChange={(value) => setNumberField("distanceKm", value)} />
          <NumberField label="Dauer Stunden" value={input.estimatedHours} onChange={(value) => setNumberField("estimatedHours", value)} />
          <NumberField label="Teamgröße" value={input.teamSize} onChange={(value) => setNumberField("teamSize", value)} />
          <NumberField label="Fahrzeuge" value={input.vehiclesCount} onChange={(value) => setNumberField("vehiclesCount", value)} />
          <NumberField label="Volumen m³" value={input.estimatedVolumeM3} onChange={(value) => setNumberField("estimatedVolumeM3", value)} />
          <NumberField label="Fläche m²" value={input.cleaningAreaM2} onChange={(value) => setNumberField("cleaningAreaM2", value)} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <TogglePill
            active={Boolean(input.noParkingZone)}
            label="Haltezone"
            onClick={() => setInput((current) => ({ ...current, noParkingZone: !current.noParkingZone }))}
          />
          <TogglePill
            active={Boolean(input.weekendOrUrgent)}
            label="Eil-/Wochenendtermin"
            onClick={() => setInput((current) => ({ ...current, weekendOrUrgent: !current.weekendOrUrgent }))}
          />
          <TogglePill
            active={Boolean(input.disassemblyService)}
            label="Abbau"
            onClick={() => setInput((current) => ({ ...current, disassemblyService: !current.disassemblyService }))}
          />
          <TogglePill
            active={Boolean(input.assemblyService)}
            label="Aufbau"
            onClick={() => setInput((current) => ({ ...current, assemblyService: !current.assemblyService }))}
          />
        </div>

        <button
          type="button"
          onClick={() => onOpen(booking)}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Vorgang im Detail öffnen
        </button>
      </Panel>

      <Panel title="Ergebnis" subtitle="Ampel, Mindestpreis, Zielpreis und Kostenbreakdown.">
        <div className={cn("mb-4 rounded-xl border p-4", decision.tone)}>
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.14em]">Operative Empfehlung</p>
              <h3 className="mt-2 text-base font-black">{decision.label}</h3>
              <p className="mt-1 text-sm leading-6 opacity-90">{decision.text}</p>
            </div>
            <div className="rounded-lg border border-current/20 bg-white/65 px-3 py-2 text-xs font-black uppercase tracking-[0.12em]">
              {decision.action}
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Metric label="Interne Kosten" value={formatCurrency(result.internalCostGross)} />
          <Metric label="Mindestpreis" value={formatCurrency(result.suggestedMinimumGross)} />
          <Metric label="Zielpreis" value={formatCurrency(result.targetPriceGross)} />
          <Metric label="Gewinn netto" value={formatCurrency(result.expectedProfitNet)} />
          <Metric label="Marge" value={`${formatNumber(result.expectedMarginPercent)} %`} />
          <div className={cn("rounded-xl border px-4 py-3", getVerdictTone(result))}>
            <p className="text-[10px] font-black uppercase tracking-[0.14em]">Risiko</p>
            <p className="mt-1 text-sm font-black">{getVerdictCopy(result)}</p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Kostenbreakdown
          </div>
          <div className="divide-y divide-slate-100">
            {result.breakdown.map((item) => (
              <div key={item.key} className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-sm font-bold text-slate-950">{germanizeText(item.label)}</p>
                  <p className="text-xs text-slate-500">{germanizeText(item.description)}</p>
                </div>
                <p className="text-sm font-bold text-slate-950">{formatCurrency(item.amountNet)}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function PlanningWorkspace({
  bookings,
  selectedBooking,
  selectedId,
  setSelectedId,
  onOpen,
}: {
  bookings: Booking[];
  selectedBooking: Booking | null;
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  onOpen: (booking: Booking) => void;
}) {
  return (
    <section>
      <PageHeader
        title="Auftragsplanung"
        text="Team, Fahrzeuge, Zeit, Etagen, Extras und interne Hinweise planen."
      />
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <Panel title="Vorgänge" subtitle="Offene Aufträge für die Planung.">
          <SelectableBookingList
            bookings={bookings}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            emptyText="Noch keine Planungsanfrage vorhanden."
          />
        </Panel>

        {selectedBooking ? (
          <PlanningModules booking={selectedBooking} onOpen={onOpen} />
        ) : (
          <EmptyState text="Bitte links zuerst einen Vorgang wählen." />
        )}
      </div>
    </section>
  );
}

function PlanningModules({
  booking,
  onOpen,
}: {
  booking: Booking;
  onOpen: (booking: Booking) => void;
}) {
  const workOrder = booking.details?.admin?.workOrder || {};
  const config = booking.details?.configuration || {};

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PlanningCard
        title="Termin"
        items={[
          ["Datum", firstText([workOrder.scheduledDate, config.moveDate, config.date])],
          ["Zeitfenster", firstText([workOrder.timeWindow, config.timeWindow])],
          ["Status", formatStatus(workOrder.status || booking.status)],
        ]}
      />
      <PlanningCard
        title="Team"
        items={[
          ["Teamlead", firstText([workOrder.teamLead], "Noch nicht zugewiesen")],
          ["Kontakt", firstText([workOrder.contactName, booking.name])],
          ["Telefon", firstText([workOrder.contactPhone, booking.phone])],
        ]}
      />
      <PlanningCard
        title="Fahrzeuge"
        items={[
          ["Service", getServiceLabel(booking.service)],
          ["Volumen/Fläche", firstText([config.estimatedVolumeM3 && `${config.estimatedVolumeM3} m³`, config.areaM2 && `${config.areaM2} m²`])],
          ["Preisrahmen", formatMoneyRange(booking)],
        ]}
      />
      <PlanningCard
        title="Objektzugang"
        items={[
          ["Start", firstText([workOrder.fromAddress, config.fromAddress, config.location])],
          ["Ziel", firstText([workOrder.toAddress, config.toAddress, config.targetAddress])],
          ["Laufweg", firstText([config.walkingDistanceMeters && `${config.walkingDistanceMeters} m`])],
        ]}
      />
      <div className="md:col-span-2">
        <Panel title="Extras und interne Hinweise" subtitle="Kurz genug für die operative Übergabe.">
          <div className="grid gap-3 md:grid-cols-2">
            <MiniLine label="Extras" value={(workOrder.extraServices || booking.upgrades || []).join(", ") || "Keine Extras"} />
            <MiniLine label="Nächster Schritt" value={booking.details?.admin?.nextAction || "Nicht angegeben"} />
            <MiniLine label="Teamhinweis" value={workOrder.teamInstructions || "Keine Notiz"} />
            <MiniLine label="Zugangshinweis" value={workOrder.accessNotes || "Keine Notiz"} />
          </div>
          <button
            type="button"
            onClick={() => onOpen(booking)}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Planung im Detail öffnen
          </button>
        </Panel>
      </div>
    </div>
  );
}

function DocumentsWorkspace({
  bookings,
  selectedBooking,
  selectedId,
  setSelectedId,
  onOpen,
}: {
  bookings: Booking[];
  selectedBooking: Booking | null;
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  onOpen: (booking: Booking) => void;
}) {
  const quoteMissingCount = bookings.filter((booking) => !getLatestDocument(booking, "quote")).length;
  const orderActionCount = bookings.filter(needsOrderDocument).length;
  const invoiceOpenCount = bookings.filter(hasOpenInvoiceDocument).length;

  return (
    <section>
      <PageHeader
        title="Dokumente"
        text="Angebot, Auftragsbestätigung, Rechnung und Anhänge klar getrennt."
      />
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <Metric label="Angebot fehlt" value={`${quoteMissingCount}`} />
        <Metric label="AB vorbereiten" value={`${orderActionCount}`} />
        <Metric label="Rechnung offen" value={`${invoiceOpenCount}`} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <Panel title="Vorgänge" subtitle="Dokumentenstatus pro Anfrage.">
          <SelectableBookingList
            bookings={bookings}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            emptyText="Noch keine Vorgänge vorhanden."
          />
        </Panel>

        {selectedBooking ? (
          <Panel
            title={selectedBooking.name}
            subtitle={`Nächster Schritt: ${getDocumentNextStep(selectedBooking).label}`}
          >
            <DocumentStatusTable booking={selectedBooking} onOpen={() => onOpen(selectedBooking)} />
          </Panel>
        ) : (
          <EmptyState text="Bitte links zuerst einen Vorgang wählen." />
        )}
      </div>
    </section>
  );
}

function DocumentStatusTable({
  booking,
  onOpen,
}: {
  booking: Booking;
  onOpen: () => void;
}) {
  const nextStep = getDocumentNextStep(booking);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-blue-100 bg-blue-50/80 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
              Nächster Dokument-Schritt
            </p>
            <h3 className="mt-2 text-base font-black text-slate-950">{nextStep.label}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">{nextStep.text}</p>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Vorgang öffnen
          </button>
        </div>
      </div>

      {documentRows.map((row) => {
        const doc = getLatestDocument(booking, row.type);
        return (
          <div
            key={row.type}
            className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center"
          >
            <div>
              <p className="font-bold text-slate-950">{row.label}</p>
              <p className="text-sm text-slate-500">
                {doc ? `${doc.number} · ${formatStatus(doc.status)} · ${formatDate(doc.updatedAt)}` : "Noch nicht erstellt"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {doc ? (
                <a
                  href={`/api/pdf/${booking.id}?documentId=${doc.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Anzeigen
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
              <a
                href={`/dashboard/documents/${booking.id}`}
                className="inline-flex h-9 items-center rounded-lg bg-blue-600 px-3 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                Bearbeiten
              </a>
            </div>
          </div>
        );
      })}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="font-bold text-slate-950">Anhänge</p>
        <p className="mt-1 text-sm text-slate-500">
          {booking.file_urls.length ? `${booking.file_urls.length} Datei(en) vorhanden` : "Keine Anhänge vorhanden"}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-3 inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Im Detail ansehen
        </button>
      </div>
    </div>
  );
}

function ReturnTripsWorkspace({
  offers,
  form,
  saving,
  error,
  onChange,
  onSubmit,
  onStatus,
}: {
  offers: BackhaulOffer[];
  form: Partial<BackhaulOffer>;
  saving: boolean;
  error: string;
  onChange: <K extends keyof BackhaulOffer>(key: K, value: BackhaulOffer[K] | string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onStatus: (offer: BackhaulOffer, status: BackhaulOffer["status"]) => void;
}) {
  const activeCount = offers.filter((offer) => offer.status === "active").length;
  const pausedCount = offers.filter((offer) => offer.status === "paused").length;
  const flexibleCount = offers.filter((offer) => !offer.date).length;

  return (
    <section>
      <PageHeader
        title="Rückfahrten"
        text="Aktive Leer- und Rückfahrten, freie Kapazität, Route und Status."
      />

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <Metric label="Aktive Rückfahrten" value={`${activeCount}`} />
        <Metric label="Pausiert" value={`${pausedCount}`} />
        <Metric label="Flexible Termine" value={`${flexibleCount}`} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <Panel title="Aktive Kapazitäten" subtitle="Routen und Status schnell prüfen.">
          {offers.length === 0 ? (
            <EmptyState text="Noch keine Rückfahrt eingetragen." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Route</th>
                    <th className="px-4 py-3">Kapazität</th>
                    <th className="px-4 py-3">Datum</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {offers.map((offer) => (
                    <tr key={offer.id}>
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-950">{germanizeText(offer.title)}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {germanizeText(offer.origin)} → {germanizeText(offer.destination)}
                        </p>
                        <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500">
                          {germanizeText(offer.priceHint)}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{germanizeText(offer.availableCapacity)}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{offer.date || "flexibel"}</td>
                      <td className="px-4 py-3"><StatusPill status={offer.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => onStatus(offer, offer.status === "active" ? "paused" : "active")}
                            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            <PauseCircle className="h-3.5 w-3.5" />
                            {offer.status === "active" ? "Pausieren" : "Aktivieren"}
                          </button>
                          <button
                            type="button"
                            onClick={() => onStatus(offer, "archived")}
                            className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-bold text-red-700 transition hover:bg-red-100"
                          >
                            <Archive className="h-3.5 w-3.5" />
                            Archiv
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel title="Neue Rückfahrt" subtitle="Kurz, sauber und ohne Doppelpflege.">
          <form onSubmit={onSubmit} className="grid gap-3">
            <TextField label="Titel" value={form.title || ""} onChange={(value) => onChange("title", value)} required />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Datum" type="date" value={form.date || ""} onChange={(value) => onChange("date", value)} />
              <TextField label="Zeitfenster" value={form.timeWindow || ""} onChange={(value) => onChange("timeWindow", value)} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Startgebiet" value={form.origin || ""} onChange={(value) => onChange("origin", value)} />
              <TextField label="Ziel" value={form.destination || ""} onChange={(value) => onChange("destination", value)} />
            </div>
            <TextField label="Zielradius" value={form.destinationRadius || ""} onChange={(value) => onChange("destinationRadius", value)} />
            <TextField label="Fahrzeugtyp" value={form.vehicleType || ""} onChange={(value) => onChange("vehicleType", value)} />
            <TextField label="Kapazität" value={form.availableCapacity || ""} onChange={(value) => onChange("availableCapacity", value)} />
            <TextField label="Preis-Hinweis" value={form.priceHint || ""} onChange={(value) => onChange("priceHint", value)} />
            <TextField label="Gebiete auf Route" value={(form.routeAreas || []).join(", ")} onChange={(value) => onChange("routeAreas", value)} />
            <DashboardTextarea label="Faire Preislogik" value={form.fairPriceNote || ""} onChange={(value) => onChange("fairPriceNote", value)} />
            <DashboardTextarea label="Interne Notiz" value={form.adminNote || ""} onChange={(value) => onChange("adminNote", value)} />
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              <PlusCircle className="h-4 w-4" />
              {saving ? "Speichert..." : "Rückfahrt speichern"}
            </button>
          </form>
        </Panel>
      </div>
    </section>
  );
}

function B2BCleaningWorkspace({
  loading,
  bookings,
  onOpen,
}: {
  loading: boolean;
  bookings: Booking[];
  onOpen: (booking: Booking) => void;
}) {
  const areaReadyCount = bookings.filter(hasB2BArea).length;
  const intervalReadyCount = bookings.filter(hasB2BInterval).length;
  const budgetCount = bookings.filter(hasBudget).length;

  return (
    <section>
      <PageHeader
        title="Reinigung B2B"
        text="Gewerbliche Reinigungsanfragen nach Objekt, Fläche, Intervall und Entscheidungsschritt."
      />
      {loading ? (
        <EmptyState text="B2B-Anfragen werden geladen." />
      ) : bookings.length === 0 ? (
        <EmptyState text="Noch keine gewerbliche Reinigungsanfrage vorhanden." />
      ) : (
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            <Metric label="Fläche geklärt" value={`${areaReadyCount}/${bookings.length}`} />
            <Metric label="Intervall geklärt" value={`${intervalReadyCount}/${bookings.length}`} />
            <Metric label="Mit Budgetsignal" value={`${budgetCount}`} />
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <p className="text-sm font-black text-slate-950">B2B zuerst sauber einordnen</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Bei gewerblicher Reinigung entscheiden Fläche, Objektart, Intervall, Zugang und Betriebszeiten.
              Diese Liste zeigt genau diese Punkte zuerst, damit aus einer Anfrage schneller ein prüfbares Angebot wird.
            </p>
          </div>

          <div className="grid gap-3">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 transition hover:border-blue-200 hover:shadow-md hover:shadow-slate-950/10"
              >
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px_220px_auto] xl:items-center">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                        Gewerbliche Reinigung
                      </span>
                      <StatusPill status={booking.status} />
                    </div>
                    <h3 className="truncate text-base font-black text-slate-950">
                      {getB2BCompanyLabel(booking)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {getB2BObjectLabel(booking)} · {getMainLocation(booking)}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {getFollowUpSummary(booking)}
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
                    <MiniLine label="Fläche" value={getB2BAreaLabel(booking)} />
                    <MiniLine label="Intervall" value={getB2BIntervalLabel(booking)} />
                    <MiniLine label="Preisrahmen" value={formatMoneyRange(booking)} />
                  </div>

                  <div className="grid gap-2">
                    <LeadQualityBadge booking={booking} compact />
                    <p className="text-xs leading-snug text-slate-500">{getNextStep(booking)}</p>
                    <CustomerQuickActions booking={booking} compact />
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpen(booking)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Öffnen
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function FollowUpWorkspace({
  loading,
  bookings,
  onOpen,
}: {
  loading: boolean;
  bookings: Booking[];
  onOpen: (booking: Booking) => void;
}) {
  const sortedBookings = [...bookings].sort((a, b) => {
    const ageDelta = getAgeInDays(b.timestamp) - getAgeInDays(a.timestamp);
    if (ageDelta !== 0) return ageDelta;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  const missingInfoCount = bookings.filter((booking) => getLeadQuality(booking).tone !== "ready").length;
  const staleCount = bookings.filter((booking) => getAgeInDays(booking.timestamp) >= 3).length;
  const budgetCount = bookings.filter((booking) => hasBudget(booking)).length;

  return (
    <section>
      <PageHeader
        title="Nachfassen"
        text="Offene Kundenkontakte nach Grund, Alter und nächstem Kontaktweg sortiert."
      />
      {loading ? (
        <EmptyState text="Nachfassliste wird geladen." />
      ) : bookings.length === 0 ? (
        <EmptyState text="Aktuell kein Nachfassen nötig." />
      ) : (
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            <Metric label="Offene Nachfasser" value={`${bookings.length}`} />
            <Metric label="Angaben fehlen" value={`${missingInfoCount}`} />
            <Metric label="Mit Preisrahmen" value={`${budgetCount}`} />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-950">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold">Heute zuerst prüfen</p>
                <p className="mt-1 text-amber-900">
                  {staleCount} Vorgang/Vorgänge sind älter als 3 Tage. Dort zuerst kurz Kontakt aufnehmen oder nächsten Schritt setzen.
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full border border-amber-300 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">
                Nachfassdruck
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            {sortedBookings.map((booking) => {
              const age = getAgeInDays(booking.timestamp);
              const reason = getFollowUpReason(booking);
              const note = getFollowUpSummary(booking);

              return (
                <article
                  key={booking.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 transition hover:border-blue-200 hover:shadow-md hover:shadow-slate-950/10"
                >
                  <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_190px_220px_auto] xl:items-center">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                          {reason}
                        </span>
                        <StatusPill status={booking.status} />
                      </div>
                      <h3 className="truncate text-base font-black text-slate-950">{booking.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {getServiceLabel(booking.service)} · {getSourceLabel(booking)} · {getMainLocation(booking)}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{note}</p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                      <MiniLine label="Alter" value={`${age} Tag${age === 1 ? "" : "e"}`} />
                      <MiniLine label="Eingang" value={formatDate(booking.timestamp)} />
                    </div>

                    <div className="grid gap-2">
                      <MiniLine label="Preisrahmen" value={formatMoneyRange(booking)} />
                      <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Kontakt</p>
                        <CustomerQuickActions booking={booking} compact />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 xl:items-end">
                      <LeadQualityBadge booking={booking} compact />
                      <p className="max-w-[220px] text-xs leading-snug text-slate-500 xl:text-right">
                        {getNextStep(booking)}
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpen(booking)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        Öffnen
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function SettingsWorkspace() {
  return (
    <section>
      <PageHeader
        title="Einstellungen"
        text="Kostenannahmen, MwSt., Fahrzeugkosten, Mindestmarge und Risikopuffer."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <SettingsCard title="Stundenlohn netto" value={`${PRICING_DEFAULTS.labor.employeeHourlyRateNet} €`} text="Interner Basiswert für Personal." />
        <SettingsCard title="Nebenkostenfaktor" value={`${PRICING_DEFAULTS.labor.burdenFactor.toFixed(2)}x`} text="Personalaufwand inklusive Nebenkosten." />
        <SettingsCard title="Fahrzeugkosten" value={`${(PRICING_DEFAULTS.vehicles.kmCostNet + PRICING_DEFAULTS.vehicles.fuelCostPerKmNet).toFixed(2)} €/km`} text="Kilometer und Diesel zusammen." />
        <SettingsCard title="Risikopuffer" value={`${PRICING_DEFAULTS.risk.basePercent}-${PRICING_DEFAULTS.risk.maxPercent} %`} text="Puffer bei unklaren Angaben." />
        <SettingsCard title="MwSt." value={`${DEFAULT_VAT_RATE} %`} text="Standard für Brutto-Berechnung." />
        <SettingsCard title="Zielmarge" value={`${DEFAULT_DESIRED_MARGIN_PERCENT} %`} text="Richtwert für saubere Angebote." />
      </div>
    </section>
  );
}

function RequestDetailPanel({
  booking,
  activeTab,
  setActiveTab,
  onClose,
  onSave,
  onDelete,
}: {
  booking: Booking;
  activeTab: DetailTab;
  setActiveTab: (tab: DetailTab) => void;
  onClose: () => void;
  onSave: (booking: Booking) => void;
  onDelete: (bookingId: string) => Promise<void>;
}) {
  const [status, setStatus] = useState(booking.status);
  const [internalNotes, setInternalNotes] = useState(booking.details?.admin?.internalNotes || "");
  const [nextAction, setNextAction] = useState(booking.details?.admin?.nextAction || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus(booking.status);
    setInternalNotes(booking.details?.admin?.internalNotes || "");
    setNextAction(booking.details?.admin?.nextAction || "");
  }, [booking.id, booking.status, booking.details?.admin?.internalNotes, booking.details?.admin?.nextAction]);

  async function saveMeta() {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNotes, nextAction }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Speichern fehlgeschlagen.");
      onSave(payload.data);
    } catch (saveError: any) {
      setError(saveError?.message || "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  async function createDocument(type: FloxDocumentType) {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_doc", documentType: type }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Dokument konnte nicht erstellt werden.");
      onSave(payload.data);
    } catch (docError: any) {
      setError(docError?.message || "Dokument konnte nicht erstellt werden.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteBooking() {
    if (!window.confirm(`Anfrage von ${booking.name} wirklich löschen?`)) return;
    setSaving(true);
    setError(null);
    try {
      await onDelete(booking.id);
      onClose();
    } catch (deleteError: any) {
      setError(deleteError?.message || "Löschen fehlgeschlagen.");
      setSaving(false);
    }
  }

  const tabs: Array<{ id: DetailTab; label: string; icon: LucideIcon }> = [
    { id: "customer", label: "Kunde", icon: UserRound },
    { id: "price", label: "Preis", icon: Euro },
    { id: "planning", label: "Planung", icon: ClipboardList },
    { id: "documents", label: "Dokumente", icon: FileText },
    { id: "history", label: "Verlauf", icon: Clock },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button type="button" aria-label="Detail schließen" onClick={onClose} className="absolute inset-0 bg-slate-950/35" />
      <aside className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden border-l border-slate-200 bg-slate-50 shadow-2xl">
        <header className="border-b border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Anfrage-Detail
              </p>
              <h2 className="mt-1 truncate text-xl font-bold tracking-tight text-slate-950">
                {booking.name}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {getServiceLabel(booking.service)} · {getSourceLabel(booking)} · {formatDateTime(booking.timestamp)}
              </p>
            </div>
            <button
              type="button"
              aria-label="Detail schließen"
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm font-bold transition",
                    active
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {error ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {activeTab === "customer" ? <CustomerDetail booking={booking} /> : null}
          {activeTab === "price" ? <PriceDetail booking={booking} /> : null}
          {activeTab === "planning" ? (
            <PlanningDetail
              booking={booking}
              status={status}
              setStatus={setStatus}
              internalNotes={internalNotes}
              setInternalNotes={setInternalNotes}
              nextAction={nextAction}
              setNextAction={setNextAction}
              saving={saving}
              onSave={saveMeta}
              onDelete={deleteBooking}
            />
          ) : null}
          {activeTab === "documents" ? (
            <DocumentsDetail booking={booking} saving={saving} onCreate={createDocument} />
          ) : null}
          {activeTab === "history" ? <HistoryDetail booking={booking} /> : null}
        </div>
      </aside>
    </div>
  );
}

function CustomerDetail({ booking }: { booking: Booking }) {
  const configRows = buildContextRows(booking);
  const quality = getLeadQuality(booking);

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4">
        <Panel title="Kunde" subtitle="Kontakt, Adresse, Service und Herkunft.">
          <div className="grid gap-3">
            <ContactLine icon={UserRound} label="Name" value={booking.name} />
            <ContactLine icon={Phone} label="Telefon" value={booking.phone || "Nicht angegeben"} href={booking.phone ? `tel:${booking.phone}` : undefined} />
            <ContactLine icon={Mail} label="E-Mail" value={booking.email || "Nicht angegeben"} href={booking.email ? `mailto:${booking.email}` : undefined} />
            <ContactLine icon={MapPin} label="Ort/Adresse" value={getMainLocation(booking)} />
            <CustomerQuickActions booking={booking} />
          </div>
        </Panel>

        <Panel title="Prüfstatus" subtitle="Zeigt, ob die Anfrage sofort bewertbar ist.">
          <LeadQualityBadge booking={booking} />
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
              Nächster sauberer Schritt
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{quality.nextQuestion}</p>
          </div>
          {quality.missing.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {quality.missing.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Die Kerninformationen reichen für eine erste operative Prüfung.
            </p>
          )}
        </Panel>
      </div>

      <Panel title="Kontext" subtitle="Nur die wichtigsten Felder, keine Rohdatenwand.">
        <div className="grid gap-3 sm:grid-cols-2">
          <MiniLine label="Service" value={getServiceLabel(booking.service)} />
          <MiniLine label="Herkunft" value={getSourceLabel(booking)} />
          <MiniLine label="Preisrahmen" value={formatMoneyRange(booking)} />
          <MiniLine label="Nächster Schritt" value={getNextStep(booking)} />
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Nachricht</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {booking.details?.contact?.notes || booking.notes || booking.details?.configuration?.customerMessage || "Keine Notiz"}
          </p>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {configRows.map((row) => (
            <MiniLine key={row.label} label={row.label} value={row.value} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function buildContextRows(booking: Booking) {
  const config = booking.details?.configuration || {};
  const rows = [
    ["Start", firstText([config.fromAddress, config.startAddress, config.location])],
    ["Ziel", firstText([config.toAddress, config.targetAddress])],
    ["Termin", firstText([config.moveDate, config.date, config.desiredDate])],
    ["Fläche", firstText([config.areaM2 && `${config.areaM2} m²`, config.cleaningAreaM2 && `${config.cleaningAreaM2} m²`])],
    ["Volumen", firstText([config.estimatedVolumeM3 && `${config.estimatedVolumeM3} m³`, config.cbm && `${config.cbm} m³`])],
    ["Etagen", firstText([config.fromFloor && `${config.fromFloor} / ${config.toFloor || 0}`])],
    ["Budget", getCustomerBudget(booking) ? formatCurrency(getCustomerBudget(booking)) : "Nicht angegeben"],
    ["Anhänge", booking.file_urls.length ? `${booking.file_urls.length} Datei(en)` : "Keine Anhänge"],
  ];

  return rows
    .map(([label, value]) => ({ label, value }))
    .filter((row) => row.value && row.value !== "Nicht angegeben")
    .slice(0, 8);
}

function PriceDetail({ booking }: { booking: Booking }) {
  const input = buildCostInput(booking);
  const result = calculateInternalCost(input);

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <Panel title="Kundenpreis" subtitle="Budget, Systemrahmen und Bewertung.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Metric label="Kundenbudget" value={getCustomerBudget(booking) ? formatCurrency(getCustomerBudget(booking)) : "Nicht angegeben"} />
          <Metric label="Systemrahmen" value={formatMoneyRange(booking)} />
          <Metric label="Mindestpreis" value={formatCurrency(result.suggestedMinimumGross)} />
          <Metric label="Zielpreis" value={formatCurrency(result.targetPriceGross)} />
        </div>
        <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
          {booking.details?.valuation?.priceExplanation || "Noch keine interne Begründung hinterlegt."}
        </p>
      </Panel>

      <Panel title="Interne Prüfung" subtitle="Marge, Gewinn, Risiko und wichtigste Kostentreiber.">
        <div className="grid gap-3 sm:grid-cols-3">
          <Metric label="Interne Kosten" value={formatCurrency(result.internalCostGross)} />
          <Metric label="Gewinn netto" value={formatCurrency(result.expectedProfitNet)} />
          <div className={cn("rounded-xl border px-4 py-3", getVerdictTone(result))}>
            <p className="text-[10px] font-black uppercase tracking-[0.14em]">Ampel</p>
            <p className="mt-1 text-sm font-black">{getVerdictCopy(result)}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          {result.explanation.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {germanizeText(item)}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function PlanningDetail({
  booking,
  status,
  setStatus,
  internalNotes,
  setInternalNotes,
  nextAction,
  setNextAction,
  saving,
  onSave,
  onDelete,
}: {
  booking: Booking;
  status: string;
  setStatus: (value: string) => void;
  internalNotes: string;
  setInternalNotes: (value: string) => void;
  nextAction: string;
  setNextAction: (value: string) => void;
  saving: boolean;
  onSave: () => void;
  onDelete: () => void;
}) {
  const workOrder = booking.details?.admin?.workOrder || {};
  const config = booking.details?.configuration || {};

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
      <div className="grid gap-4 md:grid-cols-2">
        <PlanningCard title="Termin" items={[
          ["Datum", firstText([workOrder.scheduledDate, config.moveDate, config.date])],
          ["Zeitfenster", firstText([workOrder.timeWindow, config.timeWindow])],
          ["Status", formatStatus(status)],
        ]} />
        <PlanningCard title="Team" items={[
          ["Teamlead", firstText([workOrder.teamLead], "Noch nicht zugewiesen")],
          ["Kontakt", firstText([workOrder.contactName, booking.name])],
          ["Telefon", firstText([workOrder.contactPhone, booking.phone])],
        ]} />
        <PlanningCard title="Fahrzeuge" items={[
          ["Fahrzeuge", firstText([config.vehiclesCount])],
          ["Volumen/Fläche", firstText([config.estimatedVolumeM3 && `${config.estimatedVolumeM3} m³`, config.areaM2 && `${config.areaM2} m²`])],
          ["Extras", (workOrder.extraServices || booking.upgrades || []).join(", ") || "Keine Extras"],
        ]} />
        <PlanningCard title="Objektzugang" items={[
          ["Start", firstText([workOrder.fromAddress, config.fromAddress, config.location])],
          ["Ziel", firstText([workOrder.toAddress, config.toAddress, config.targetAddress])],
          ["Zugang", firstText([workOrder.accessNotes])],
        ]} />
      </div>

      <Panel title="Bearbeitung" subtitle="Status, nächste Aktion und interne Notiz.">
        <div className="grid gap-3">
          <label>
            <FieldLabel>Status</FieldLabel>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
            >
              <option value="new">Neu</option>
              <option value="in_bearbeitung">In Bearbeitung</option>
              <option value="angebot_versendet">Angebot versendet</option>
              <option value="abgeschlossen">Abgeschlossen</option>
              <option value="storniert">Storniert</option>
            </select>
          </label>
          <TextField label="Nächste Aktion" value={nextAction} onChange={setNextAction} />
          <label>
            <FieldLabel>Interne Notiz</FieldLabel>
            <textarea
              value={internalNotes}
              onChange={(event) => setInternalNotes(event.target.value)}
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
            />
          </label>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            Speichern
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
          >
            Anfrage löschen
          </button>
        </div>
      </Panel>
    </div>
  );
}

function DocumentsDetail({
  booking,
  saving,
  onCreate,
}: {
  booking: Booking;
  saving: boolean;
  onCreate: (type: FloxDocumentType) => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <Panel title="Dokumente" subtitle="Angebot, AB und Rechnung getrennt verwalten.">
        <div className="space-y-3">
          {documentRows.map((row) => {
            const doc = getLatestDocument(booking, row.type);
            return (
              <div key={row.type} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-bold text-slate-950">{row.label}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {doc ? `${doc.number} · ${formatStatus(doc.status)}` : "Noch nicht erstellt"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doc ? (
                      <a
                        href={`/api/pdf/${booking.id}?documentId=${doc.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700"
                      >
                        Anzeigen
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => onCreate(row.type)}
                        className="inline-flex h-9 items-center rounded-lg bg-blue-600 px-3 text-xs font-bold text-white disabled:opacity-60"
                      >
                        {row.action}
                      </button>
                    )}
                    <a
                      href={`/dashboard/documents/${booking.id}`}
                      className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700"
                    >
                      Workbench
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel title="Anhänge" subtitle="Kundenfotos und Dateien.">
        {booking.file_urls.length === 0 ? (
          <EmptyState text="Keine Anhänge vorhanden." />
        ) : (
          <div className="grid gap-2">
            {booking.file_urls.map((url, index) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
              >
                Anhang {index + 1}
              </a>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

function HistoryDetail({ booking }: { booking: Booking }) {
  const history = booking.details?.admin?.history || [];
  return (
    <Panel title="Verlauf" subtitle="Statusänderungen, Notizen und nächste Schritte.">
      {history.length === 0 ? (
        <EmptyState text="Noch kein Verlauf gespeichert." />
      ) : (
        <div className="divide-y divide-slate-100">
          {history.map((entry, index) => (
            <div key={`${entry.timestamp}-${index}`} className="grid gap-2 py-4 md:grid-cols-[180px_1fr]">
              <div>
                <p className="text-sm font-bold text-slate-950">{formatStatus(entry.status)}</p>
                <p className="text-xs text-slate-500">{formatDateTime(entry.timestamp)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-700">{germanizeText(entry.note)}</p>
                <p className="mt-1 text-xs text-slate-500">{germanizeText(entry.user || "System")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function SelectableBookingList({
  bookings,
  selectedId,
  setSelectedId,
  emptyText,
}: {
  bookings: Booking[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  emptyText: string;
}) {
  if (bookings.length === 0) return <EmptyState text={emptyText} />;

  return (
    <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
      {bookings.map((booking) => {
        const active = booking.id === selectedId;
        return (
          <button
            key={booking.id}
            type="button"
            onClick={() => setSelectedId(booking.id)}
            className={cn(
              "w-full rounded-xl border p-3 text-left transition",
              active
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950">{booking.name}</p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {getServiceLabel(booking.service)} · {getMainLocation(booking)}
                </p>
              </div>
              <StatusPill status={booking.status} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 sm:p-5">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-950">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function PlanningCard({
  title,
  items,
}: {
  title: string;
  items: Array<[string, string]>;
}) {
  return (
    <Panel title={title}>
      <div className="grid gap-3">
        {items.map(([label, value]) => (
          <MiniLine key={label} label={label} value={value || "Nicht angegeben"} />
        ))}
      </div>
    </Panel>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">{germanizeText(value || "Nicht angegeben")}</p>
    </div>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">{germanizeText(value)}</p>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}

function CustomerQuickActions({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
  const normalizedPhone = normalizePhoneForContact(booking.phone);
  const whatsAppUrl = buildWhatsAppContactUrl(booking);
  const emailUrl = buildEmailContactUrl(booking);

  if (!normalizedPhone && !emailUrl) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500">
        Kein direkter Kontaktweg hinterlegt.
      </div>
    );
  }

  const baseClass = compact
    ? "mt-2 inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[10px] font-black uppercase tracking-[0.1em] transition"
    : "inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-black uppercase tracking-[0.12em] transition";

  return (
    <div className={cn("flex flex-wrap gap-2", compact ? "" : "mt-3")}>
      {normalizedPhone ? (
        <a
          href={`tel:${normalizedPhone}`}
          className={cn(baseClass, "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100")}
        >
          <Phone className="h-3.5 w-3.5" />
          Anrufen
        </a>
      ) : null}
      {whatsAppUrl ? (
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(baseClass, "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100")}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      ) : null}
      {emailUrl ? (
        <a
          href={emailUrl}
          className={cn(baseClass, "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")}
        >
          <Mail className="h-3.5 w-3.5" />
          E-Mail
        </a>
      ) : null}
    </div>
  );
}

function LeadQualityBadge({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
  const quality = getLeadQuality(booking);
  const toneMap: Record<LeadQualityTone, string> = {
    ready: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "needs-info": "border-amber-200 bg-amber-50 text-amber-700",
    thin: "border-red-200 bg-red-50 text-red-700",
  };
  const missingText = quality.missing.length
    ? `Fehlt: ${quality.missing.slice(0, 3).join(", ")}${quality.missing.length > 3 ? " ..." : ""}`
    : "Kerninfos vorhanden";

  return (
    <div className="max-w-[220px]">
      <span
        className={cn(
          "inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em]",
          toneMap[quality.tone],
        )}
      >
        {quality.label}
      </span>
      {!compact ? (
        <p className="mt-1 text-xs leading-snug text-slate-500">{missingText}</p>
      ) : null}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em]", getStatusTone(status))}>
      {formatStatus(status)}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
      {children}
    </span>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
      />
    </label>
  );
}

function DashboardTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
      />
    </label>
  );
}

function TogglePill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-2 text-xs font-bold transition",
        active
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
      )}
    >
      {label}
    </button>
  );
}

function SettingsCard({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-700">{title}</p>
      <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}
