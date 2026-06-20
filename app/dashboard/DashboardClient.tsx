"use client";

import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
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
  Trash2,
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
  | "route-board"
  | "high-flexibility"
  | "fixed-date"
  | "regensburg-start"
  | "regensburg-destination"
  | "bavaria-route"
  | "corridor-munich"
  | "corridor-nuremberg"
  | "corridor-straubing"
  | "corridor-passau"
  | "corridor-ingolstadt"
  | "offer-check"
  | "cheaper-alternative"
  | "cheaper-with-offer"
  | "cheaper-with-price"
  | "cheaper-with-budget"
  | "red-flag-scanner"
  | "red-flag-high"
  | "red-flag-upload"
  | "red-flag-price"
  | "red-flag-duesseldorf"
  | "platform-order"
  | "platform-myhammer"
  | "platform-check24"
  | "platform-other"
  | "platform-with-offer"
  | "platform-with-price"
  | "platform-with-photos"
  | "platform-provider-unclear"
  | "platform-aborted"
  | "platform-regensburg"
  | "platform-duesseldorf"
  | "tenant-turnover"
  | "handover-file"
  | "handover-key"
  | "handover-cleaning"
  | "handover-clearance"
  | "handover-tenant"
  | "handover-date"
  | "handover-recipient"
  | "handover-open"
  | "handover-photos-missing"
  | "handover-key-unclear"
  | "handover-premium"
  | "rental-ready"
  | "rental-viewing"
  | "rental-handover"
  | "rental-multiple-units"
  | "property-ready-service"
  | "property-ready-owner"
  | "property-ready-realtor"
  | "property-ready-estate"
  | "property-ready-manager"
  | "property-ready-photos"
  | "property-ready-viewing"
  | "property-ready-expose"
  | "property-ready-premium"
  | "property-ready-combined"
  | "property-ready-regensburg"
  | "estate-clearance"
  | "estate-callback"
  | "estate-inheritance-group"
  | "estate-clearance-open"
  | "estate-key-unclear"
  | "estate-photos"
  | "estate-sale"
  | "estate-rental"
  | "estate-premium"
  | "estate-regensburg"
  | "discreet-move"
  | "discreet-callback"
  | "discreet-safe-time"
  | "discreet-premium"
  | "discreet-cleaning"
  | "discreet-items"
  | "discreet-key"
  | "discreet-handover-file"
  | "discreet-regensburg"
  | "damage-control"
  | "damage-plan-gekippt"
  | "damage-button-source"
  | "damage-whatsapp-preferred"
  | "damage-today"
  | "damage-tomorrow"
  | "damage-handover"
  | "damage-move"
  | "damage-cleaning"
  | "damage-clearance"
  | "damage-duesseldorf"
  | "plan-b-service"
  | "plan-b-high-risk"
  | "plan-b-with-offer"
  | "plan-b-with-photos"
  | "plan-b-phone"
  | "plan-b-transport"
  | "plan-b-cleaning"
  | "plan-b-handover"
  | "plan-b-duesseldorf"
  | "cellar-trashroom"
  | "cellar-property-manager"
  | "cellar-weg"
  | "cellar-business"
  | "cellar-clearance-open"
  | "cellar-hazard-open"
  | "cellar-cleaning"
  | "realtor-landlord-link"
  | "object-case-realtor"
  | "object-case-landlord"
  | "object-case-owner"
  | "object-case-property-manager"
  | "object-case-viewing"
  | "object-case-handover"
  | "object-case-multiple"
  | "object-case-direct-source"
  | "referral-partnercode"
  | "referral-new-code"
  | "referral-with-person"
  | "referral-without-person"
  | "referral-bonus-review"
  | "referral-bonus-payout"
  | "referral-not-eligible"
  | "referral-regensburg"
  | "referral-duesseldorf"
  | "referral-b2b"
  | "property-manager"
  | "landlord"
  | "realtor"
  | "owner"
  | "urgent-handover"
  | "recurring-tenant"
  | "budget"
  | "needs-info"
  | "with-phone"
  | "with-photos"
  | "today"
  | "unhandled"
  | "duesseldorf-cleaning"
  | "duesseldorf-b2b-cleaning"
  | "b2b-office"
  | "b2b-agency-studio"
  | "b2b-law-office"
  | "b2b-practice"
  | "b2b-staircase"
  | "b2b-recurring"
  | "b2b-one-time"
  | "b2b-with-area"
  | "b2b-with-photos"
  | "b2b-with-phone"
  | "b2b-recurring-potential"
  | "duesseldorf-apartment-cleaning"
  | "apartment-guest-turnover"
  | "apartment-final-cleaning"
  | "apartment-recurring"
  | "apartment-b2b"
  | "apartment-checkin-time"
  | "apartment-laundry"
  | "apartment-key"
  | "duesseldorf-disposal"
  | "conversion-trigger"
  | "object-system"
  | "duesseldorf-revenue"
  | "regensburg-umzug"
  | "regensburg-bayern"
  | "high-score"
  | "google-maps"
  | "google-ads"
  | "premium"
  | "new"
  | "in-progress"
  | "rueckfrage"
  | "angebot-gesendet"
  | "won"
  | "lost";

type LeadQualityTone = "ready" | "needs-info" | "thin";

type LeadQuality = {
  label: string;
  tone: LeadQualityTone;
  missing: string[];
  nextQuestion: string;
};

type LeadPriority = "high" | "medium" | "low";

type LeadRevenueScore = {
  score: number;
  priority: LeadPriority;
  source: string;
  reasons: string[];
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
  "follow-up",
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
    label: "Heute",
    description: "Wichtiges sofort sehen.",
    icon: LayoutDashboard,
  },
  inquiries: {
    label: "Leads",
    description: "Neue und offene Anfragen.",
    icon: Inbox,
  },
  "price-review": {
    label: "Angebote",
    description: "Preis, Marge und Risiko.",
    icon: Calculator,
  },
  planning: {
    label: "Aufträge",
    description: "Team, Termin und Ablauf.",
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
  { id: "new", label: "Neu" },
  { id: "unhandled", label: "Unbearbeitet" },
  { id: "with-phone", label: "Telefon vorhanden" },
  { id: "with-photos", label: "Fotos vorhanden" },
  { id: "needs-info", label: "Angaben fehlen" },
  { id: "budget", label: "Budget vorhanden" },
  { id: "umzug", label: "Umzug" },
  { id: "reinigung", label: "Reinigung" },
  { id: "entsorgung", label: "Entrümpelung" },
  { id: "duesseldorf-cleaning", label: "Düsseldorf" },
];

const priorityInquiryFilterIds: InquiryFilter[] = [
  "all",
  "new",
  "unhandled",
  "with-phone",
  "with-photos",
  "needs-info",
  "budget",
  "umzug",
  "reinigung",
  "entsorgung",
  "duesseldorf-cleaning",
];

const inquiryFilterById = Object.fromEntries(
  inquiryFilters.map((filter) => [filter.id, filter]),
) as Record<InquiryFilter, { id: InquiryFilter; label: string }>;

const documentRows: Array<{
  type: FloxDocumentType;
  label: string;
  action: string;
}> = [
  { type: "inquiry_summary", label: "Prüfbericht Angebotsprüfung", action: "Erstellen" },
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

const STATUS_OPTIONS = [
  { value: "new", label: "Neu" },
  { value: "besichtigung_fotos_noetig", label: "Besichtigung/Fotos nötig" },
  { value: "in_pruefung", label: "In Prüfung" },
  { value: "scanner_ergebnis_pruefen", label: "Scanner-Ergebnis prüfen" },
  { value: "rueckfrage_noetig", label: "Rückfrage nötig" },
  { value: "angebot_pruefen", label: "Angebot prüfen" },
  { value: "alternative_einschaetzung_moeglich", label: "Alternative Einschätzung möglich" },
  { value: "alternative_moeglich", label: "Alternative möglich" },
  { value: "strecke_pruefen", label: "Strecke prüfen" },
  { value: "passende_tour_moeglich", label: "Passende Tour möglich" },
  { value: "keine_passende_tour_aktuell", label: "Keine passende Tour aktuell" },
  { value: "dokumentationsumfang_klaeren", label: "Dokumentationsumfang klären" },
  { value: "akte_nicht_gestartet", label: "Akte nicht gestartet" },
  { value: "akte_daten_fehlen", label: "Akte: Daten fehlen" },
  { value: "mit_service_kombinieren", label: "Mit Service kombinieren" },
  { value: "akte_in_vorbereitung", label: "Akte in Vorbereitung" },
  { value: "akte_fotos_pruefen", label: "Akte: Fotos prüfen" },
  { value: "akte_bereit_zur_freigabe", label: "Akte bereit zur Freigabe" },
  { value: "akte_abgeschlossen", label: "Akte abgeschlossen" },
  { value: "diskret_pruefen", label: "Diskret prüfen" },
  { value: "rueckruf_noetig", label: "Rückruf nötig" },
  { value: "objektstatus_pruefen", label: "Objektstatus prüfen" },
  { value: "objekt_pruefen", label: "Objekt prüfen" },
  { value: "flaeche_frequenz_klaeren", label: "Fläche/Frequenz klären" },
  { value: "regelmaessiger_auftrag_moeglich", label: "Regelmäßiger Auftrag möglich" },
  { value: "fotos_besichtigung_noetig", label: "Fotos/Besichtigung nötig" },
  { value: "in_vorbereitung", label: "In Vorbereitung" },
  { value: "wiederkehrender_kontakt_moeglich", label: "Wiederkehrender Kontakt möglich" },
  { value: "sofort_pruefen", label: "Sofort prüfen" },
  { value: "kapazitaet_pruefen", label: "Kapazität prüfen" },
  { value: "machbar", label: "Machbar" },
  { value: "nicht_machbar", label: "Nicht machbar" },
  { value: "nicht_passend", label: "Nicht passend" },
  { value: "umfang_pruefen", label: "Umfang prüfen" },
  { value: "fotos_noetig", label: "Fotos nötig" },
  { value: "freigabe_klaeren", label: "Freigabe klären" },
  { value: "problemstoffe_klaeren", label: "Problemstoffe klären" },
  { value: "zugang_klaeren", label: "Zugang klären" },
  { value: "leistungen_klaeren", label: "Leistungen klären" },
  { value: "angebot_vorbereiten", label: "Angebot vorbereiten" },
  { value: "beauftragt", label: "Beauftragt" },
  { value: "objektfall_pruefen", label: "Objektfall prüfen" },
  { value: "terminfenster_pruefen", label: "Terminfenster prüfen" },
  { value: "zusatzleistungen_klaeren", label: "Zusatzleistungen klären" },
  { value: "einmalauftrag", label: "Einmalauftrag" },
  { value: "wiederkehrender_auftrag_moeglich", label: "Wiederkehrender Auftrag möglich" },
  { value: "partnercode_erstellt", label: "Partnercode erstellt" },
  { value: "empfehlung_eingegangen", label: "Empfehlung eingegangen" },
  { value: "empfohlene_person_angefragt", label: "Empfohlene Person angefragt" },
  { value: "auftrag_in_pruefung", label: "Auftrag in Prüfung" },
  { value: "auftrag_bestaetigt", label: "Auftrag bestätigt" },
  { value: "auftrag_durchgefuehrt", label: "Auftrag durchgeführt" },
  { value: "auftrag_bezahlt", label: "Auftrag bezahlt" },
  { value: "bonus_pruefbar", label: "Bonus prüfbar" },
  { value: "bonus_freigegeben", label: "Bonus freigegeben" },
  { value: "bonus_ausgezahlt", label: "Bonus ausgezahlt" },
  { value: "nicht_bonusberechtigt", label: "Nicht bonusberechtigt" },
  { value: "angebot_erstellt", label: "Angebot erstellt" },
  { value: "wiederkehrender_kontakt", label: "Wiederkehrender Kontakt" },
  { value: "angebot_versendet", label: "Angebot gesendet" },
  { value: "angenommen", label: "Angenommen" },
  { value: "gewonnen", label: "Gewonnen" },
  { value: "abgelehnt", label: "Abgelehnt" },
  { value: "verloren", label: "Verloren" },
  { value: "erledigt", label: "Erledigt" },
  { value: "archiviert", label: "Archiviert" },
] as const;

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
      conversionJourney: germanizeDeep(asRecord(metadata.conversionJourney)),
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
  const map: Record<string, string> = Object.fromEntries(
    STATUS_OPTIONS.map((item) => [item.value, item.label]),
  );

  Object.assign(map, {
    in_bearbeitung: "In Prüfung",
    angebot: "Angebot erstellt",
    abgeschlossen: "Erledigt",
    storniert: "Abgelehnt",
    active: "Aktiv",
    paused: "Pausiert",
    draft: "Entwurf",
    archived: "Archiviert",
  });

  return map[status] || germanizeText(status.replace(/_/g, " "));
}

function getStatusTone(status: string) {
  if (status === "new") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "in_pruefung" || status === "in_bearbeitung") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "diskret_pruefen" || status === "rueckruf_noetig") return "border-stone-200 bg-stone-50 text-stone-700";
  if (status === "objektstatus_pruefen" || status === "objekt_pruefen" || status === "fotos_besichtigung_noetig") return "border-orange-200 bg-orange-50 text-orange-700";
  if (status === "objektfall_pruefen") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "partnercode_erstellt" || status === "empfehlung_eingegangen" || status === "empfohlene_person_angefragt") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "auftrag_in_pruefung" || status === "bonus_pruefbar") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "bonus_freigegeben" || status === "bonus_ausgezahlt" || status === "auftrag_bezahlt") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "nicht_bonusberechtigt") return "border-red-200 bg-red-50 text-red-700";
  if (status === "sofort_pruefen" || status === "kapazitaet_pruefen") return "border-red-200 bg-red-50 text-red-700";
  if (status === "rueckfrage_noetig") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "alternative_einschaetzung_moeglich" || status === "alternative_moeglich" || status === "scanner_ergebnis_pruefen" || status === "angebot_pruefen") return "border-violet-200 bg-violet-50 text-violet-700";
  if (status === "angebot_erstellt" || status === "angebot") return "border-indigo-200 bg-indigo-50 text-indigo-700";
  if (status === "angebot_versendet") return "border-cyan-200 bg-cyan-50 text-cyan-700";
  if (status === "angenommen" || status === "gewonnen" || status === "erledigt" || status === "abgeschlossen" || status === "active" || status === "machbar") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "umfang_pruefen" || status === "fotos_noetig" || status === "zugang_klaeren" || status === "leistungen_klaeren") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "terminfenster_pruefen" || status === "zusatzleistungen_klaeren" || status === "flaeche_frequenz_klaeren") return "border-cyan-200 bg-cyan-50 text-cyan-700";
  if (status === "einmalauftrag" || status === "wiederkehrender_auftrag_moeglich" || status === "regelmaessiger_auftrag_moeglich") return "border-teal-200 bg-teal-50 text-teal-700";
  if (status === "freigabe_klaeren" || status === "problemstoffe_klaeren" || status === "angebot_vorbereiten") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "nicht_machbar" || status === "nicht_passend") return "border-slate-200 bg-slate-50 text-slate-600";
  if (status === "paused" || status === "draft") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  if (status === "abgelehnt" || status === "verloren" || status === "archiviert" || status === "storniert" || status === "archived") {
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
    gewerbereinigung_regensburg: "Gewerbereinigung Regensburg",
    bueroreinigung_regensburg: "Büroreinigung Regensburg",
    buroreinigung_regensburg: "Büroreinigung Regensburg",
    praxisreinigung_regensburg: "Praxisreinigung Regensburg",
    hotelreinigung_regensburg: "Hotelreinigung Regensburg",
    fensterreinigung_regensburg: "Fensterreinigung Regensburg",
    baureinigung_regensburg: "Baureinigung Regensburg",
    teppichreinigung_regensburg: "Teppichreinigung Regensburg",
    treppenhausreinigung_regensburg: "Treppenhausreinigung Regensburg",
    unterhaltsreinigung_regensburg: "Unterhaltsreinigung Regensburg",
    grundreinigung_regensburg: "Grundreinigung Regensburg",
    duesseldorf_b2b_reinigung: "Düsseldorf B2B-Reinigung",
    duesseldorf_b2b_cleaning: "Düsseldorf B2B-Reinigung",
    duesseldorf_moeblierte_wohnung_reinigung: "Düsseldorf möblierte Wohnung",
    entsorgung: "Entrümpelung",
    transport: "Transport",
    kombination: "Kombination",
    mieterwechsel_service: "Mieterwechsel",
    uebergabeakte: "Übergabeakte",
    wohnung_wieder_vermietbar: "Wohnung wieder vermietbar",
    immobilie_verkaufsbereit: "Immobilie verkaufsbereit",
    nachlass_raeumung: "Nachlass-Räumung",
    diskreter_trennungsumzug: "Diskreter Trennungsumzug",
    discreet_move: "Diskreter Trennungsumzug",
    schadensbegrenzung: "Schadensbegrenzung",
    plan_b_service: "Plan-B-Service",
    keller_muellraum_rettung: "Keller-/Müllraum-Rettung",
    makler_vermieter_link: "Makler-/Vermieter-Link",
    referral_partnercode: "Empfehlung / Partnercode",
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
    google_maps_booking: "Google Maps Buchung",
    google_ads_cleaning_regensburg: "Google Ads Reinigung",
    duesseldorf_cleaning_booking: "Düsseldorf Reinigung",
    duesseldorf_b2b_cleaning: "Düsseldorf B2B-Reinigung",
    duesseldorf_b2b_reinigung: "Düsseldorf B2B-Reinigung",
    duesseldorf_b2b_cleaning_form: "Düsseldorf B2B-Reinigung",
    b2b_reinigung_duesseldorf: "Düsseldorf B2B-Reinigung",
    bueroreinigung_duesseldorf: "Düsseldorf B2B-Reinigung",
    gewerbereinigung_duesseldorf: "Düsseldorf B2B-Reinigung",
    duesseldorf_apartment_cleaning: "Düsseldorf Apartment-Reinigung",
    duesseldorf_moeblierte_wohnung_reinigung: "Düsseldorf Apartment-Reinigung",
    apartment_cleaning_duesseldorf: "Düsseldorf Apartment-Reinigung",
    airbnb_reinigung_duesseldorf: "Düsseldorf Apartment-Reinigung",
    duesseldorf_disposal_booking: "Düsseldorf Entsorgung",
    return_trip_booking: "Rückfahrt",
    return_trip_board: "Rückfahrt-Börse",
    route_board: "Rückfahrt-Börse",
    rueckfahrt_boerse: "Rückfahrt-Börse",
    offer_check: "Angebotscheck",
    offer_check_product: "FLOXANT Angebotsprüfung",
    floxant_angebotspruefung_product: "FLOXANT Angebotsprüfung",
    cheaper_alternative: "Günstiger prüfen",
    cheaper_alternative_page: "Günstiger prüfen",
    angebot_guenstiger_pruefen: "Günstiger prüfen",
    platform_order_check: "Plattform-Auftrag",
    platform_order_page: "Plattform-Auftrag",
    plattform_auftrag: "Plattform-Auftrag",
    red_flag_scanner: "Red-Flag-Scanner",
    handover_file: "Übergabeakte",
    uebergabeakte: "Übergabeakte",
    uebergabeakte_service: "Übergabeakte",
    rental_ready_service: "Wohnung wieder vermietbar",
    rental_ready: "Wohnung wieder vermietbar",
    wohnung_wieder_vermietbar: "Wohnung wieder vermietbar",
    property_ready_service: "Immobilie verkaufsbereit",
    property_ready: "Immobilie verkaufsbereit",
    immobilie_verkaufsbereit: "Immobilie verkaufsbereit",
    verkaufsbereit_service: "Immobilie verkaufsbereit",
    estate_clearance_service: "Nachlass-Räumung",
    estate_clearance: "Nachlass-Räumung",
    nachlass_raeumung: "Nachlass-Räumung",
    nachlass_raeumung_light: "Nachlass-Räumung",
    discreet_move_service: "Diskreter Trennungsumzug",
    discreet_move: "Diskreter Trennungsumzug",
    diskreter_trennungsumzug: "Diskreter Trennungsumzug",
    trennung_scheidung: "Diskret / sensible Anfrage",
    damage_control: "Schadensbegrenzung",
    schadensbegrenzung: "Schadensbegrenzung",
    plan_gekippt: "Plan gekippt",
    plan_gekippt_button: "Plan gekippt Button",
    plan_b_service: "Plan-B-Service",
    plan_b_form: "Plan-B-Formular",
    backup_service: "Plan-B-Service",
    cellar_trashroom_rescue: "Keller-/Müllraum-Rettung",
    keller_muellraum_rettung: "Keller-/Müllraum-Rettung",
    muellraum_rettung: "Müllraum-Rettung",
    realtor_landlord_link: "Makler-/Vermieter-Link",
    makler_vermieter_link: "Makler-/Vermieter-Link",
    object_case_link: "Objektfall-Link",
    referral_partnercode: "Empfehlung / Partnercode",
    partnercode: "Partnercode",
    partner_code: "Partnercode",
    empfehlung: "Empfehlung",
    referral: "Empfehlung",
    tenant_turnover_service: "Mieterwechsel",
    mieterwechsel_service: "Mieterwechsel",
    tenant_turnover: "Mieterwechsel",
    angebotscheck: "Angebotscheck",
    angebot_pruefen: "Angebotscheck",
    angebot_red_flag_scanner: "Red-Flag-Scanner",
    budget_contact_form: "Preisvorschlag",
    quick_express_modal: "Express",
    quick_express: "Express",
    intake_wizard: "Rechner",
    gewerbereinigung_regensburg: "B2B-Reinigung",
    bueroreinigung_regensburg: "Büroreinigung Regensburg",
    buroreinigung_regensburg: "Büroreinigung Regensburg",
    praxisreinigung_regensburg: "Praxisreinigung Regensburg",
    hotelreinigung_regensburg: "Hotelreinigung Regensburg",
    fensterreinigung_regensburg: "Fensterreinigung Regensburg",
    baureinigung_regensburg: "Baureinigung Regensburg",
    teppichreinigung_regensburg: "Teppichreinigung Regensburg",
    treppenhausreinigung_regensburg: "Treppenhausreinigung Regensburg",
    unterhaltsreinigung_regensburg: "Unterhaltsreinigung Regensburg",
    grundreinigung_regensburg: "Grundreinigung Regensburg",
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

function getProcessLabel(booking: Booking) {
  const config = booking.details?.configuration || {};
  const clientContext = booking.details?.metadata?.clientContext || {};
  const pricingSignals = booking.details?.valuation?.pricingSignals || {};
  const conversionJourney =
    config.conversionJourney ||
    pricingSignals.conversionJourney ||
    booking.details?.metadata?.conversionJourney ||
    {};
  const rawProcess = firstText(
    [
      config.requestContext,
      clientContext.leadSource,
      clientContext.sourceComponent,
      config.calculatorMode ? `Rechner ${config.calculatorMode}` : "",
      booking.details?.valuation?.valuationStage,
    ],
    "",
  );
  const lastSignal = firstText(
    [
      conversionJourney.lastEventName,
      config.conversionLastEvent,
      clientContext.conversionLastEvent,
    ],
    "",
  );
  const channel = firstText(
    [
      conversionJourney.lastChannel,
      config.conversionLastChannel,
      clientContext.conversionLastChannel,
    ],
    "",
  );

  if (lastSignal && channel) return `${rawProcess || getSourceLabel(booking)} · ${channel} · ${lastSignal}`;
  if (lastSignal) return `${rawProcess || getSourceLabel(booking)} · ${lastSignal}`;
  if (config.conversionJourneyId || clientContext.conversionJourneyId || conversionJourney.journeyId) {
    return `${rawProcess || getSourceLabel(booking)} · Journey verknuepft`;
  }
  return cleanText(rawProcess, getSourceLabel(booking));
}

function getSourceSignalText(booking: Booking) {
  return normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.service?.entryPoint,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.utmSource,
      booking.details?.metadata?.clientContext?.utmMedium,
      booking.details?.metadata?.clientContext?.utmCampaign,
      booking.details?.configuration?.requestContext,
      booking.details?.configuration?.entryPoint,
      booking.details?.configuration?.sourcePage,
      booking.details?.configuration?.leadSource,
      booking.details?.configuration?.requestedService,
      booking.details?.configuration?.serviceLabel,
      booking.details?.configuration?.serviceSlug,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isGoogleMapsLead(booking: Booking) {
  const source = getSourceSignalText(booking);
  return source.includes("google_maps") || source.includes("google business") || source.includes("gbp") || source.includes("maps");
}

function isGoogleAdsLead(booking: Booking) {
  const source = getSourceSignalText(booking);
  return source.includes("google_ads") || source.includes("google ads") || source.includes("adwords") || source.includes("cpc");
}

function isPremiumLead(booking: Booking) {
  const source = getSourceSignalText(booking);
  return (
    source.includes("private_client") ||
    source.includes("private client") ||
    source.includes("premium") ||
    source.includes("luxus") ||
    source.includes("villenservice")
  );
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
      config.objectLocation,
      config.cityOrZip,
      config.city_or_zip,
      config.districtOrZip,
      config.startLocation,
      config.destinationLocation,
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

function normalizeRegionText(value: string) {
  return cleanOptionalText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getDuesseldorfB2BText(booking: Booking) {
  const config = booking.details?.configuration || {};
  return normalizeRegionText(
    [
      booking.service,
      getMainLocation(booking),
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.service?.entryPoint,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadSubtype,
      booking.details?.metadata?.clientContext?.sourceComponent,
      config.leadType,
      config.leadSubtype,
      config.requestContext,
      config.sourceComponent,
      config.entryPoint,
      config.sourcePage,
      config.leadSource,
      config.region,
      config.regionPreset,
      config.companyName,
      config.requestedService,
      config.serviceLabel,
      config.serviceSlug,
      config.serviceCategory,
      config.objectType,
      config.propertyType,
      config.cleaningType,
      config.recurringFrequency,
      config.cadence,
      config.timeWindow,
      config.objectLocation,
      config.location,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isDuesseldorfB2BCleaningLead(booking: Booking) {
  const service = booking.service.toLowerCase();
  const config = booking.details?.configuration || {};
  const text = getDuesseldorfB2BText(booking);
  const hasDuesseldorfSignal =
    text.includes("dusseldorf") ||
    text.includes("duesseldorf") ||
    text.includes("/duesseldorf/bueroreinigung") ||
    config.regionPreset === "duesseldorf";
  const hasB2BSignal =
    text.includes("duesseldorf_b2b") ||
    text.includes("b2b") ||
    text.includes("bueroreinigung") ||
    text.includes("gewerbereinigung") ||
    text.includes("firmenreinigung") ||
    config.leadSubtype === "b2b";

  return hasDuesseldorfSignal && hasB2BSignal && (service === "b2b_reinigung" || service.includes("reinigung"));
}

function hasDuesseldorfB2BOffice(booking: Booking) {
  const text = getDuesseldorfB2BText(booking);
  return isDuesseldorfB2BCleaningLead(booking) && (text.includes("buero") || text.includes("buro") || text.includes("office"));
}

function hasDuesseldorfB2BAgencyStudio(booking: Booking) {
  const text = getDuesseldorfB2BText(booking);
  return isDuesseldorfB2BCleaningLead(booking) && (text.includes("agentur") || text.includes("studio"));
}

function hasDuesseldorfB2BLawOffice(booking: Booking) {
  return isDuesseldorfB2BCleaningLead(booking) && getDuesseldorfB2BText(booking).includes("kanzlei");
}

function hasDuesseldorfB2BPractice(booking: Booking) {
  return isDuesseldorfB2BCleaningLead(booking) && getDuesseldorfB2BText(booking).includes("praxis");
}

function hasDuesseldorfB2BStaircase(booking: Booking) {
  return isDuesseldorfB2BCleaningLead(booking) && getDuesseldorfB2BText(booking).includes("treppenhaus");
}

function hasDuesseldorfB2BRecurring(booking: Booking) {
  const text = getDuesseldorfB2BText(booking);
  return (
    isDuesseldorfB2BCleaningLead(booking) &&
    (text.includes("regel") ||
      text.includes("woechentlich") ||
      text.includes("wochentlich") ||
      text.includes("mehrmals") ||
      text.includes("monat"))
  );
}

function hasDuesseldorfB2BOneTime(booking: Booking) {
  const text = getDuesseldorfB2BText(booking);
  return isDuesseldorfB2BCleaningLead(booking) && (text.includes("einmalig") || text.includes("grundreinigung"));
}

function hasDuesseldorfB2BRecurringPotential(booking: Booking) {
  const config = booking.details?.configuration || {};
  return (
    hasDuesseldorfB2BRecurring(booking) ||
    cleanOptionalText(config.regularInvoiceRequested).toLowerCase() === "ja" ||
    Boolean(config.recurringPotential)
  );
}

function isDuesseldorfCleaningLead(booking: Booking) {
  if (isDuesseldorfB2BCleaningLead(booking)) return true;
  if (isDuesseldorfApartmentCleaningLead(booking)) return true;
  const regionText = normalizeRegionText(
    [
      getMainLocation(booking),
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.service?.regionPreset,
      booking.details?.metadata?.source,
      booking.details?.metadata?.regionPreset,
      booking.details?.configuration?.regionPreset,
      booking.details?.configuration?.region,
      booking.details?.configuration?.districtOrZip,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return isCleaningService(booking) && (regionText.includes("dusseldorf") || regionText.includes("duesseldorf"));
}

function isDuesseldorfDisposalLead(booking: Booking) {
  const regionText = normalizeRegionText(
    [
      getMainLocation(booking),
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.service?.regionPreset,
      booking.details?.metadata?.source,
      booking.details?.metadata?.regionPreset,
      booking.details?.configuration?.regionPreset,
      booking.details?.configuration?.region,
      booking.details?.configuration?.districtOrZip,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return isDisposalService(booking) && (regionText.includes("dusseldorf") || regionText.includes("duesseldorf"));
}

function isRegensburgBavariaLead(booking: Booking) {
  if (isDuesseldorfCleaningLead(booking)) return false;
  if (isDuesseldorfDisposalLead(booking)) return false;
  const regionText = normalizeRegionText(
    [
      getMainLocation(booking),
      getSourceLabel(booking),
      booking.details?.service?.entryPoint,
      booking.details?.configuration?.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    regionText.includes("regensburg") ||
    regionText.includes("bayern") ||
    regionText.includes("bavaria") ||
    !regionText.includes("dusseldorf")
  );
}

function isRegensburgMoveLead(booking: Booking) {
  const regionText = normalizeRegionText(
    [
      getMainLocation(booking),
      booking.details?.service?.entryPoint,
      booking.details?.configuration?.entryPoint,
      booking.details?.configuration?.region,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    !isDuesseldorfCleaningLead(booking) &&
    !isCleaningService(booking) &&
    !isDisposalService(booking) &&
    !isReturnTrip(booking) &&
    regionText.includes("regensburg")
  );
}

function getRegionLabel(booking: Booking) {
  if (isDuesseldorfDisposalLead(booking)) return "Düsseldorf Entsorgung";
  if (isDuesseldorfB2BCleaningLead(booking)) return "Düsseldorf B2B";
  if (isDuesseldorfApartmentCleaningLead(booking)) return "Düsseldorf Apartment";
  if (isDuesseldorfCleaningLead(booking)) return "Düsseldorf Reinigung";
  if (isRegensburgBavariaLead(booking)) return "Regensburg/Bayern";
  return "Region prüfen";
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
      config.recurringFrequency,
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
      config.areaRange,
      config.spaceRange,
      config.propertySizeRange,
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
      signals.quotedPrice ||
      signals.quotedPriceText ||
      signals.customerBudgetText ||
      signals.budget ||
      booking.details?.configuration?.customerBudgetText ||
      booking.details?.configuration?.quotedPrice ||
      booking.details?.configuration?.quotedPriceText ||
      booking.details?.configuration?.budget,
  );
}

function hasPriceSignal(booking: Booking) {
  const valuation = booking.details?.valuation;
  return Boolean(
    hasBudget(booking) ||
      valuation?.priceSuggestion ||
      valuation?.systemPriceRangeMin ||
      valuation?.systemPriceRangeMax ||
      valuation?.priceRangeMin ||
      valuation?.priceRangeMax,
  );
}

function hasOfferCheckUpload(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(
    config.offerUploadCount ||
      config.photoUploadCount ||
      (Array.isArray(config.offerFiles) && config.offerFiles.length > 0) ||
      (Array.isArray(config.planBOfferFiles) && config.planBOfferFiles.length > 0) ||
      (Array.isArray(config.planBPhotoFiles) && config.planBPhotoFiles.length > 0) ||
      (Array.isArray(config.handoverPhotoFiles) && config.handoverPhotoFiles.length > 0) ||
      (Array.isArray(config.rentalReadyPhotoFiles) && config.rentalReadyPhotoFiles.length > 0) ||
      (Array.isArray(config.estateClearancePhotoFiles) && config.estateClearancePhotoFiles.length > 0) ||
      (Array.isArray(config.photoFiles) && config.photoFiles.length > 0),
  );
}

function hasPhotoSignal(booking: Booking) {
  return Boolean(
    booking.file_urls.length > 0 ||
      hasOfferCheckUpload(booking) ||
      booking.details?.configuration?.wantsPhotosLink ||
      booking.details?.metadata?.clientContext?.wantsPhotosLink,
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
    "desiredStartDate",
    "preferredDate",
    "deadline",
    "appointmentDate",
    "handoverDate",
    "dateFlexibility",
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
    "roomsCount",
    "teamSize",
    "estimatedHours",
    "propertySize",
    "scopeSummary",
    "accessNotes",
    "offerText",
    "quotedPriceText",
    "offerSourceType",
    "offerUploadCount",
    "selectedAddons",
    "objectType",
    "objectLocation",
    "cleaningType",
    "recurringFrequency",
    "timeWindow",
    "sanitaryCount",
    "kitchenOrBreakroom",
    "selectedServices",
    "unitsCount",
    "goalType",
    "objectStatus",
    "viewingDate",
    "roleType",
    "keyStatus",
    "recipientType",
    "documentationScope",
    "additionalSpaces",
    "startLocation",
    "destinationLocation",
    "itemDescription",
    "items",
    "estimatedVolume",
    "requestType",
    "startFloor",
    "destinationFloor",
  ]);

  const missing: string[] = [];
  if (!hasUsefulText(booking.name)) missing.push("Name");
  if (!hasUsefulText(booking.phone) && !hasUsefulText(booking.email)) missing.push("Kontakt");
  if (!hasUsefulText(getMainLocation(booking))) missing.push("Ort/Adresse");
  if (!dateIsKnown) missing.push("Terminwunsch");
  if (!hasScope) missing.push("Fläche/Volumen/Umfang");
  if (!hasUsefulText(message)) missing.push("Kurzbeschreibung");
  if (!hasBudget(booking) && !hasPriceSignal(booking)) missing.push("Budget/Preisrahmen");
  if (!hasPhotoSignal(booking)) missing.push("Fotos/Anhänge");

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

function getStoredLeadQuality(booking: Booking) {
  return (
    booking.details?.admin?.leadQuality ||
    booking.details?.configuration?.leadQuality ||
    booking.details?.metadata?.clientContext?.leadQuality ||
    null
  );
}

function getLeadRevenueScore(booking: Booking): LeadRevenueScore {
  const config = booking.details?.configuration || {};
  const reasons: string[] = [];
  let score = 0;

  const add = (points: number, reason: string) => {
    score += points;
    reasons.push(reason);
  };

  const dateIsKnown = hasAnyConfigValue(config, [
    "moveDate",
    "date",
    "desiredDate",
    "desiredStartDate",
    "preferredDate",
    "deadline",
    "appointmentDate",
    "handoverDate",
    "dateFlexibility",
    "termin",
  ]);
  const hasLocation = hasUsefulText(getMainLocation(booking));
  const hasDescription = hasUsefulText(
    firstText(
      [
        booking.details?.contact?.notes,
        booking.notes,
        config.customerMessage,
        config.message,
        config.description,
        config.scopeSummary,
        config.itemDescription,
        config.items,
      ],
      "",
    ),
  );

  if (normalizePhoneForContact(booking.phone)) add(20, "Telefon vorhanden");
  if (hasPhotoSignal(booking)) add(15, "Fotos/Upload vorhanden");
  if (dateIsKnown) add(15, "konkreter Termin");
  if (hasBudget(booking)) add(10, "Budget vorhanden");
  if (hasLocation) add(10, "Ort/PLZ vorhanden");
  if (hasUsefulText(booking.service)) add(10, "Service eindeutig");
  if (hasDescription) add(10, "Beschreibung vorhanden");
  if (isRegensburgMoveLead(booking) || isDisposalService(booking) || isCleaningService(booking)) {
    add(10, "High-Intent-Service");
  }
  if (isGoogleMapsLead(booking)) add(15, "Google Maps Quelle");
  if (isGoogleAdsLead(booking)) add(15, "Google Ads Quelle");
  if (isPremiumLead(booking)) add(20, "Premium/High-Value Quelle");
  if (isOfferCheckLead(booking)) add(20, "Angebotscheck/kaufnah");
  if (isOfferCheckLead(booking) && hasOfferCheckUpload(booking)) add(15, "Angebot oder Fotos hochgeladen");
  if (isOfferCheckLead(booking) && hasBudget(booking)) add(10, "Preisangabe vorhanden");
  if (isCheaperAlternativeLead(booking)) add(30, "Preis-Alternative/kaufnah");
  if (isCheaperAlternativeLead(booking) && hasCheaperAlternativeOffer(booking)) add(15, "Angebot für Alternative hochgeladen");
  if (isCheaperAlternativeLead(booking) && hasCheaperAlternativePrice(booking)) add(10, "Angebotspreis vorhanden");
  if (isCheaperAlternativeLead(booking) && hasCheaperAlternativeBudget(booking)) add(10, "Zielbudget vorhanden");
  if (isPlatformOrderLead(booking)) add(25, "Plattform-Auftrag/kaufnah");
  if (isPlatformOrderLead(booking) && hasPlatformOfferUpload(booking)) add(15, "Plattform-Angebot hochgeladen");
  if (isPlatformOrderLead(booking) && hasPlatformPrice(booking)) add(10, "Angebotspreis vorhanden");
  if (isPlatformOrderLead(booking) && hasPlatformPhotos(booking)) add(10, "Fotos vorhanden");
  if (isPlatformOrderLead(booking) && (hasPlatformProviderUnclear(booking) || hasPlatformAborted(booking))) add(15, "Anbieter/Plattformweg unklar");
  if (isPlatformOrderLead(booking) && isPlatformDuesseldorf(booking)) add(10, "Düsseldorf Reinigung/Entsorgung");
  if (isRedFlagScannerLead(booking)) add(25, "Red-Flag-Scanner/Vor-Zusage-Lead");
  if (isRedFlagScannerLead(booking) && hasHighRedFlagScore(booking)) add(20, "hoher Klärungsbedarf");
  if (isRedFlagScannerLead(booking) && hasRedFlagOfferPrice(booking)) add(10, "Angebotspreis vorhanden");
  if (isRedFlagScannerLead(booking) && hasRedFlagDuesseldorf(booking)) add(10, "Düsseldorf Reinigung/Entsorgung");
  if (isTenantTurnoverLead(booking)) add(25, "Mieterwechsel/Wiederholungspotenzial");
  if (isTenantTurnoverLead(booking) && getTenantTurnoverRole(booking).includes("hausverwaltung")) add(20, "Hausverwaltung");
  if (isTenantTurnoverLead(booking) && hasRecurringTenantPotential(booking)) add(15, "Wiederkehrende Fälle möglich");
  if (isTenantTurnoverLead(booking) && Number(config.unitsCount || 0) > 1) add(15, "mehrere Einheiten");
  if (isTenantTurnoverLead(booking) && isUrgentTenantTurnover(booking)) add(10, "dringender Übergabetermin");
  if (isRentalReadyLead(booking)) add(25, "Objekt-Ready/vermietbar vorbereiten");
  if (isRentalReadyLead(booking) && isHighValueRentalRole(booking)) add(15, "Vermieter/Hausverwaltung/Makler");
  if (isRentalReadyLead(booking) && hasRentalReadyViewingDate(booking)) add(15, "Besichtigungstermin vorhanden");
  if (isRentalReadyLead(booking) && hasRentalReadyHandoverDate(booking)) add(15, "Übergabetermin vorhanden");
  if (isRentalReadyLead(booking) && hasRentalReadyCombinedServices(booking)) add(15, "Raeumung + Reinigung kombiniert");
  if (isRentalReadyLead(booking) && Number(config.unitsCount || 0) > 1) add(15, "mehrere Einheiten");
  if (isPropertyReadyLead(booking)) add(30, "Immobilie verkaufsbereit/Verkaufs-Intent");
  if (isPropertyReadyLead(booking) && isHighValuePropertyReadyRole(booking)) add(15, "Eigentuemer/Makler/Erbengemeinschaft/Verwaltung");
  if (isPropertyReadyLead(booking) && hasPhotoSignal(booking)) add(15, "Objektfotos vorhanden");
  if (isPropertyReadyLead(booking) && hasPropertyReadyViewingDate(booking)) add(15, "Besichtigungstermin vorhanden");
  if (isPropertyReadyLead(booking) && hasPropertyReadyExposeDate(booking)) add(15, "Expose-/Fototermin vorhanden");
  if (isPropertyReadyLead(booking) && hasPropertyReadyCombinedServices(booking)) add(15, "Raeumung + Reinigung kombiniert");
  if (isPropertyReadyLead(booking) && hasPropertyReadyPremium(booking)) add(15, "Premium/Diskret ausgewaehlt");
  if (isPropertyReadyLead(booking) && hasPropertyReadyRegensburg(booking)) add(10, "Regensburg/Umgebung");
  if (isPropertyReadyLead(booking) && hasPropertyReadyEstateCase(booking)) add(10, "Nachlass/Erbfall mit Fristpotenzial");
  if (isEstateClearanceLead(booking)) add(30, "Nachlass-Raeumung/Diskret-Fall");
  if (isEstateClearanceLead(booking) && normalizePhoneForContact(booking.phone)) add(15, "Telefon/Rückruf möglich");
  if (isEstateClearanceLead(booking) && hasEstateCallback(booking)) add(15, "Rückruf gewünscht");
  if (isEstateClearanceLead(booking) && hasPhotoSignal(booking)) add(15, "Fotos vorhanden");
  if (isEstateClearanceLead(booking) && hasEstateRegensburg(booking)) add(10, "Regensburg/Umgebung");
  if (isEstateClearanceLead(booking) && hasEstateSaleGoal(booking)) add(10, "Verkauf/Besichtigung/Objektvorbereitung");
  if (isEstateClearanceLead(booking) && hasEstateCombinedServices(booking)) add(15, "Raeumung + Reinigung kombiniert");
  if (isEstateClearanceLead(booking) && hasEstatePremium(booking)) add(15, "Premium/Diskret ausgewaehlt");
  if (
    isEstateClearanceLead(booking) &&
    (getEstateClearanceRole(booking).includes("makler") ||
      getEstateClearanceRole(booking).includes("hausverwaltung") ||
      getEstateClearanceRole(booking).includes("eigentuemer"))
  ) {
    add(10, "Makler/Verwaltung/Eigentuemer");
  }
  if (isDiscreetMoveLead(booking)) add(30, "Diskreter Trennungsumzug/sensible Anfrage");
  if (isDiscreetMoveLead(booking) && normalizePhoneForContact(booking.phone)) add(15, "Telefon/Rückruf möglich");
  if (isDiscreetMoveLead(booking) && hasDiscreetCallback(booking)) add(15, "Rückrufzeitfenster vorhanden");
  if (isDiscreetMoveLead(booking) && hasDiscreetSafeTime(booking)) add(10, "sichere Kontaktzeit");
  if (isDiscreetMoveLead(booking) && hasPhotoSignal(booking)) add(10, "Fotos vorhanden");
  if (isDiscreetMoveLead(booking) && hasDiscreetCleaning(booking)) add(10, "Auszug + Reinigung");
  if (isDiscreetMoveLead(booking) && (hasDiscreetKey(booking) || hasDiscreetHandoverFile(booking))) add(10, "Schlüssel/Übergabe relevant");
  if (isDiscreetMoveLead(booking) && hasDiscreetPremium(booking)) add(15, "Premium/Diskret ausgewaehlt");
  if (isDiscreetMoveLead(booking) && hasDiscreetRegensburg(booking)) add(10, "Regensburg/Umgebung");
  if (isPlanBServiceLead(booking)) add(35, "Plan-B/Backup-Lead");
  if (isPlanBServiceLead(booking) && hasPlanBHighRisk(booking)) add(20, "hohes Plan-B-Risiko");
  if (isPlanBServiceLead(booking) && hasPlanBPhotos(booking)) add(15, "Fotos vorhanden");
  if (isPlanBServiceLead(booking) && hasPlanBOffer(booking)) add(15, "bestehendes Angebot vorhanden");
  if (isPlanBServiceLead(booking) && (hasPlanBTransport(booking) || hasPlanBCleaning(booking) || hasPlanBHandover(booking))) add(10, "konkreter Backup-Bereich");
  if (isPlanBServiceLead(booking) && hasPlanBDuesseldorf(booking)) add(10, "Düsseldorf Reinigung/Entsorgung Backup");
  if (isDamageControlLead(booking)) add(35, "Schadensbegrenzung/Akut-Lead");
  if (isDamageControlLead(booking) && isDamagePlanButtonLead(booking)) add(15, "Plan gekippt Button");
  if (isDamageControlLead(booking) && (hasDamageToday(booking) || hasDamageTomorrow(booking))) add(20, "Deadline heute/morgen");
  if (isDamageControlLead(booking) && hasDamageHandover(booking)) add(15, "Übergabe bald/offen");
  if (isDamageControlLead(booking) && hasPhotoSignal(booking)) add(15, "Fotos/Angebot vorhanden");
  if (isDamageControlLead(booking) && (hasDamageMove(booking) || hasDamageCleaning(booking) || hasDamageClearance(booking))) add(10, "konkreter Problemtyp");
  if (isDamageControlLead(booking) && hasDamageWhatsAppPreferred(booking)) add(10, "WhatsApp bevorzugt");
  if (isDamageControlLead(booking) && hasDamageDuesseldorf(booking)) add(10, "Düsseldorf Reinigung/Entsorgung akut");
  if (isCellarTrashroomLead(booking)) add(30, "Keller-/Muellraum-Rettung");
  if (isCellarTrashroomLead(booking) && hasCellarHighValueRole(booking)) add(15, "Hausverwaltung/WEG/Gewerbe/Vermieter");
  if (isCellarTrashroomLead(booking) && hasPhotoSignal(booking)) add(15, "Fotos vorhanden");
  if (isCellarTrashroomLead(booking) && hasAnyConfigValue(config, ["deadline", "desiredDate"])) add(10, "Deadline vorhanden");
  if (isCellarTrashroomLead(booking) && hasCellarCleaning(booking)) add(10, "Reinigung danach");
  if (isCellarTrashroomLead(booking) && hasCellarRegensburg(booking)) add(10, "Regensburg/Umgebung");
  if (isRealtorLandlordLinkLead(booking)) add(30, "Makler-/Vermieter-Objektfall");
  if (isRealtorLandlordLinkLead(booking) && isHighValueObjectCaseRole(booking)) add(15, "Makler/Vermieter/Verwaltung");
  if (isRealtorLandlordLinkLead(booking) && hasPhotoSignal(booking)) add(15, "Objektfotos vorhanden");
  if (isRealtorLandlordLinkLead(booking) && hasObjectCaseViewingDate(booking)) add(15, "Besichtigungstermin vorhanden");
  if (isRealtorLandlordLinkLead(booking) && hasObjectCaseHandoverDate(booking)) add(15, "Übergabetermin vorhanden");
  if (isRealtorLandlordLinkLead(booking) && hasObjectCaseMultipleUnits(booking)) add(15, "mehrere Objekte/Einheiten");
  if (isRealtorLandlordLinkLead(booking) && hasObjectCaseCombinedServices(booking)) add(15, "Raeumung + Reinigung kombiniert");
  if (isRealtorLandlordLinkLead(booking) && hasDirectObjectCaseSource(booking)) add(10, "Direkte Akquise/QR/WhatsApp");
  if (isReferralPartnercodeLead(booking)) add(25, "Empfehlung / Partnercode");
  if (isReferralPartnercodeLead(booking) && hasReferredPerson(booking)) add(20, "empfohlene Person vorhanden");
  if (isReferralPartnercodeLead(booking) && normalizePhoneForContact(booking.phone)) add(15, "Empfehlender telefonisch erreichbar");
  if (isReferralPartnercodeLead(booking) && isReferralB2B(booking)) add(15, "B2B-/Objekt-Empfehlung");
  if (isReferralPartnercodeLead(booking) && isReferralRegensburg(booking)) add(10, "Regensburg/Umgebung");
  if (isReferralPartnercodeLead(booking) && isReferralBonusReview(booking)) add(10, "Bonus pruefbar");
  if (isDuesseldorfB2BCleaningLead(booking)) add(35, "Düsseldorf B2B-Reinigung");
  if (isDuesseldorfB2BCleaningLead(booking) && config.companyName) add(10, "Firma angegeben");
  if (isDuesseldorfB2BCleaningLead(booking) && hasB2BArea(booking)) add(10, "Fläche angegeben");
  if (isDuesseldorfB2BCleaningLead(booking) && hasDuesseldorfB2BRecurringPotential(booking)) add(15, "wiederkehrender Auftrag möglich");
  if (isDuesseldorfB2BCleaningLead(booking) && hasUsefulText(config.timeWindow)) add(10, "Zeitfenster vorhanden");
  if (isDuesseldorfB2BCleaningLead(booking) && hasPhotoSignal(booking)) add(10, "Objektfotos vorhanden");
  if (isDuesseldorfB2BCleaningLead(booking) && (Number(config.roomsCount || 0) > 1 || Number(config.sanitaryCount || 0) > 0)) add(10, "mehrere Räume/Sanitär");
  if (isDuesseldorfApartmentCleaningLead(booking)) add(30, "Düsseldorf Apartment-Reinigung");
  if (isDuesseldorfApartmentCleaningLead(booking) && hasApartmentCheckinTime(booking)) add(15, "Check-in/Check-out-Zeitfenster");
  if (isDuesseldorfApartmentCleaningLead(booking) && hasApartmentRecurring(booking)) add(20, "wiederkehrende Reinigung möglich");
  if (isDuesseldorfApartmentCleaningLead(booking) && hasApartmentB2B(booking)) add(15, "B2B/Betreiber-Potenzial");
  if (isDuesseldorfApartmentCleaningLead(booking) && hasApartmentLaundry(booking)) add(8, "Wäschewunsch klären");
  if (isDuesseldorfApartmentCleaningLead(booking) && hasApartmentKeyCoordination(booking)) add(8, "Schlüsselkoordination klären");
  if (isHandoverFileLead(booking)) add(25, "Übergabeakte/Signature-Produkt");
  if (isHandoverFileLead(booking) && hasHandoverTerm(booking)) add(15, "Übergabetermin vorhanden");
  if (isHandoverFileLead(booking) && getHandoverServicesText(booking).includes("schluessel")) add(15, "Schlüsselstatus/Schlüsselübergabe");
  if (isHandoverFileLead(booking) && getHandoverServicesText(booking).includes("endreinigung")) add(10, "Endreinigung kombiniert");
  if (isHandoverFileLead(booking) && getHandoverServicesText(booking).includes("mieterwechsel")) add(15, "Mieterwechsel verknuepft");
  if (isHandoverFileLead(booking) && hasHandoverRecipient(booking)) add(10, "Empfaenger der Akte geklaert");
  if (isReturnTrip(booking) && hasUsefulText(config.toAddress)) add(15, "Rueckfahrt mit Strecke");
  if (isRouteBoardLead(booking)) add(20, "Rueckfahrt-Boerse/kaufnah");
  if (isRouteBoardLead(booking) && hasHighRouteFlexibility(booking)) add(15, "hohe Terminflexibilitaet");
  if (isRouteBoardLead(booking) && hasUsefulText(config.startLocation) && hasUsefulText(config.destinationLocation)) {
    add(15, "konkrete Start-Ziel-Strecke");
  }
  if (isRouteBoardLead(booking) && (routeIncludesCity(booking, "regensburg") || routeIncludesCity(booking, "bayern"))) {
    add(10, "Regensburg/Bayern-Strecke");
  }
  if (isRouteBoardLead(booking) && Array.isArray(config.selectedAddons) && config.selectedAddons.length > 0) {
    add(10, "Zusatzservice angefragt");
  }
  if (isDuesseldorfDisposalLead(booking) && hasPhotoSignal(booking)) add(15, "Düsseldorf Entsorgung mit Fotos");
  if (isB2BCleaning(booking) && (hasB2BArea(booking) || hasB2BInterval(booking))) {
    add(10, "B2B-Reinigung mit Fläche/Frequenz");
  }

  if (!normalizePhoneForContact(booking.phone) && !hasUsefulText(booking.email)) {
    score -= 20;
    reasons.push("kein Kontaktweg");
  }
  if (!hasLocation) {
    score -= 20;
    reasons.push("Ort fehlt");
  }
  if (!hasDescription) {
    score -= 10;
    reasons.push("Beschreibung unklar");
  }

  const priority: LeadPriority = score >= 70 ? "high" : score >= 40 ? "medium" : "low";

  return {
    score: Math.max(0, score),
    priority,
    source: getSourceLabel(booking),
    reasons: reasons.slice(0, 5),
  };
}

function isClosed(booking: Booking) {
  return ["angenommen", "gewonnen", "abgelehnt", "verloren", "erledigt", "archiviert", "abgeschlossen", "storniert", "archived"].includes(
    booking.status,
  );
}

function isOfferCheckLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      booking.details?.configuration?.leadType,
      booking.details?.configuration?.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return sourceText.includes("angebotscheck") || sourceText.includes("offer_check") || sourceText.includes("angebot");
}

function getCheaperAlternativeText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const context = booking.details?.metadata?.clientContext || {};
  return normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.service?.entryPoint,
      booking.details?.metadata?.source,
      context.leadSource,
      context.leadSubtype,
      context.sourceComponent,
      context.entryPoint,
      config.leadSource,
      config.leadSubtype,
      config.sourceComponent,
      config.entryPoint,
      config.requestContext,
      config.valuationLabel,
      config.platformSituation,
      config.quotedPriceText,
      config.customerBudgetText,
      config.offerText,
      config.customerMessage,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isCheaperAlternativeLead(booking: Booking) {
  const text = getCheaperAlternativeText(booking);
  return (
    isOfferCheckLead(booking) &&
    (text.includes("cheaper_alternative") ||
      text.includes("angebot-guenstiger-pruefen") ||
      text.includes("guenstiger") ||
      text.includes("preis-alternative") ||
      text.includes("passendere alternative"))
  );
}

function hasCheaperAlternativeOffer(booking: Booking) {
  return isCheaperAlternativeLead(booking) && hasOfferCheckUpload(booking);
}

function hasCheaperAlternativePrice(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(config.quotedPrice || config.quotedPriceText || booking.details?.valuation?.priceSuggestion);
}

function hasCheaperAlternativeBudget(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(config.budget || config.customerBudgetText || booking.details?.valuation?.customerBudget);
}

function getDashboardStringArray(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => cleanOptionalText(item)).filter(Boolean);
  const text = cleanOptionalText(value);
  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.map((item) => cleanOptionalText(item)).filter(Boolean);
  } catch {
    // Dashboard data can arrive as comma-separated text from older payloads.
  }

  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRedFlagScannerText(booking: Booking) {
  const config = booking.details?.configuration || {};
  return normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadSource,
      booking.details?.metadata?.clientContext?.leadSubtype,
      booking.details?.metadata?.clientContext?.sourceComponent,
      config.leadSubtype,
      config.sourceComponent,
      config.scannerScoreLevel,
      config.scannerScoreLabel,
      config.redFlagSummary,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isRedFlagScannerLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  return (
    isOfferCheckLead(booking) &&
    (getRedFlagScannerText(booking).includes("red_flag_scanner") ||
      getRedFlagScannerText(booking).includes("red-flag") ||
      hasUsefulText(config.scannerScoreLevel) ||
      getDashboardStringArray(config.redFlagItems).length > 0)
  );
}

function getRedFlagScoreLevel(booking: Booking) {
  const config = booking.details?.configuration || {};
  return normalizeRegionText(firstText([config.scannerScoreLevel, config.scannerScoreLabel], ""));
}

function hasHighRedFlagScore(booking: Booking) {
  const config = booking.details?.configuration || {};
  const scoreValue = Number(config.scannerScoreValue || 0);
  const level = getRedFlagScoreLevel(booking);
  return level.includes("hoch") || scoreValue >= 9;
}

function hasRedFlagOfferPrice(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(config.quotedPrice || config.quotedPriceText || booking.details?.valuation?.priceSuggestion);
}

function hasRedFlagDuesseldorf(booking: Booking) {
  const config = booking.details?.configuration || {};
  const text = normalizeRegionText(
    [config.region, config.regionPreset, config.cityOrZip, getMainLocation(booking), booking.service, booking.details?.service?.type]
      .filter(Boolean)
      .join(" "),
  );
  return isRedFlagScannerLead(booking) && text.includes("duesseldorf") && (text.includes("reinigung") || text.includes("entsorgung"));
}

function getPlatformOrderText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const context = booking.details?.metadata?.clientContext || {};
  return normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.service?.entryPoint,
      booking.details?.metadata?.source,
      context.leadSource,
      context.leadSubtype,
      context.sourceComponent,
      context.entryPoint,
      config.leadSource,
      config.leadSubtype,
      config.sourceComponent,
      config.entryPoint,
      config.platformSituation,
      config.platformType,
      config.offerSourceType,
      config.cityOrZip,
      config.region,
      config.regionPreset,
      config.desiredDate,
      config.customerMessage,
      config.offerText,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isPlatformOrderLead(booking: Booking) {
  const text = getPlatformOrderText(booking);
  return (
    isOfferCheckLead(booking) &&
    (text.includes("plattform_auftrag") ||
      text.includes("platform_order") ||
      text.includes("plattform-auftrag-pruefen") ||
      text.includes("plattformfall") ||
      text.includes("plattform auftrag"))
  );
}

function hasPlatformOfferUpload(booking: Booking) {
  return isPlatformOrderLead(booking) && hasOfferCheckUpload(booking);
}

function hasPlatformPrice(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(config.quotedPrice || config.quotedPriceText || booking.details?.valuation?.priceSuggestion);
}

function hasPlatformPhotos(booking: Booking) {
  return isPlatformOrderLead(booking) && hasPhotoSignal(booking);
}

function getPlatformType(booking: Booking) {
  return normalizeRegionText(firstText([booking.details?.configuration?.platformType, booking.details?.configuration?.offerSourceType], ""));
}

function hasPlatformProviderUnclear(booking: Booking) {
  const text = getPlatformOrderText(booking);
  return text.includes("anbieter meldet") || text.includes("anbieter unklar") || text.includes("leistung unklar") || text.includes("termin unklar");
}

function hasPlatformAborted(booking: Booking) {
  const text = getPlatformOrderText(booking);
  return text.includes("abgebrochen") || text.includes("geschlossen") || text.includes("beendet");
}

function isPlatformRegensburg(booking: Booking) {
  return getPlatformOrderText(booking).includes("regensburg");
}

function isPlatformDuesseldorf(booking: Booking) {
  const text = getPlatformOrderText(booking);
  return text.includes("duesseldorf") && (text.includes("reinigung") || text.includes("entsorgung"));
}

function isTenantTurnoverLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      booking.details?.configuration?.leadType,
      booking.details?.configuration?.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("mieterwechsel") ||
    sourceText.includes("tenant_turnover") ||
    sourceText.includes("objektwechsel")
  );
}

function isHandoverFileLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      booking.details?.metadata?.clientContext?.leadSource,
      booking.details?.metadata?.clientContext?.sourceComponent,
      booking.details?.metadata?.clientContext?.sourceContext,
      booking.details?.metadata?.clientContext?.sourcePage,
      config.leadType,
      config.leadSource,
      config.sourceComponent,
      config.sourceContext,
      config.sourcePage,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("uebergabeakte") ||
    sourceText.includes("handover_file") ||
    sourceText.includes("handover_dossier") ||
    sourceText.includes("uebergabe-dossier")
  );
}

function isRentalReadyLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("wohnung_wieder_vermietbar") ||
    sourceText.includes("wohnung-wieder-vermietbar") ||
    sourceText.includes("rental_ready") ||
    sourceText.includes("objekt_ready") ||
    sourceText.includes("objekt-ready")
  );
}

function isPropertyReadyLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("immobilie_verkaufsbereit") ||
    sourceText.includes("property_ready") ||
    sourceText.includes("verkaufsbereit_service") ||
    sourceText.includes("immobilie-verkaufsbereit-machen")
  );
}

function isEstateClearanceLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("nachlass_raeumung") ||
    sourceText.includes("estate_clearance") ||
    sourceText.includes("nachlass-raeumung-regensburg") ||
    sourceText.includes("nachlass_raeumung_light")
  );
}

function isDamageControlLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("schadensbegrenzung") ||
    sourceText.includes("damage_control") ||
    sourceText.includes("plan_gekippt") ||
    sourceText.includes("rettungsmodus")
  );
}

function isCellarTrashroomLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("keller_muellraum_rettung") ||
    sourceText.includes("keller-muellraum-rettung") ||
    sourceText.includes("cellar_trashroom_rescue") ||
    sourceText.includes("muellraum_rettung")
  );
}

function isRealtorLandlordLinkLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("makler_vermieter_link") ||
    sourceText.includes("makler-vermieter-link") ||
    sourceText.includes("realtor_landlord_link") ||
    sourceText.includes("object_case_link") ||
    sourceText.includes("objektfall_link")
  );
}

function isReferralPartnercodeLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("referral_partnercode") ||
    sourceText.includes("partnercode") ||
    sourceText.includes("partner_code") ||
    sourceText.includes("empfehlung") ||
    sourceText.includes("referral")
  );
}

function getReferralText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const context = booking.details?.metadata?.clientContext || {};
  return normalizeRegionText(
    [
      config.referrerName,
      config.partnerCode,
      config.referralCode,
      config.referredService,
      config.referredCityOrZip,
      config.referredPersonName,
      config.bonusStatus,
      config.referralStatus,
      config.customerMessage,
      config.utmSource,
      config.utmMedium,
      config.utmCampaign,
      context.utmSource,
      context.utmMedium,
      context.utmCampaign,
      booking.status,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function hasReferredPerson(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(config.hasReferredPerson || config.referredPersonName || config.referredPersonPhone || config.referredPersonEmail);
}

function getReferralBonusStatus(booking: Booking) {
  return getReferralText(booking);
}

function isReferralBonusReview(booking: Booking) {
  const text = getReferralBonusStatus(booking);
  return ["bonus_pruefbar", "auftrag_bezahlt", "auftrag_bestaetigt", "auftrag_durchgefuehrt"].some((needle) => text.includes(needle));
}

function isReferralBonusPayout(booking: Booking) {
  const text = getReferralBonusStatus(booking);
  return ["bonus_freigegeben", "bonus_auszuzahlen", "bonus auszahlen", "bonus_ausgezahlt"].some((needle) => text.includes(needle));
}

function isReferralNotEligible(booking: Booking) {
  return getReferralBonusStatus(booking).includes("nicht_bonusberechtigt");
}

function isReferralRegensburg(booking: Booking) {
  return getReferralText(booking).includes("regensburg");
}

function isReferralDuesseldorf(booking: Booking) {
  return getReferralText(booking).includes("duesseldorf");
}

function isReferralB2B(booking: Booking) {
  const text = getReferralText(booking);
  return ["makler", "vermieter", "hausverwaltung", "mieterwechsel", "b2b", "gewerbe", "objekt"].some((needle) => text.includes(needle));
}

function isDuesseldorfApartmentCleaningLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("duesseldorf_moeblierte_wohnung_reinigung") ||
    sourceText.includes("duesseldorf_apartment_cleaning") ||
    sourceText.includes("apartment_cleaning_duesseldorf") ||
    sourceText.includes("airbnb_reinigung_duesseldorf") ||
    sourceText.includes("reinigung-moeblierte-wohnung-duesseldorf")
  );
}

function getApartmentCleaningText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const context = booking.details?.metadata?.clientContext || {};
  return normalizeRegionText(
    [
      config.roleType,
      config.objectType,
      config.objectLocation,
      config.cleaningType,
      config.desiredDate,
      config.timeWindow,
      config.checkoutTime,
      config.nextCheckinTime,
      config.recurringFrequency,
      config.laundryChangeRequested,
      config.keyCoordinationRequested,
      config.photoDocumentationRequested,
      config.inventoryNoteRequested,
      config.disposalSmallItemsRequested,
      config.customerMessage,
      context.utmSource,
      context.utmMedium,
      context.utmCampaign,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function hasApartmentGuestTurnover(booking: Booking) {
  const text = getApartmentCleaningText(booking);
  return text.includes("gaestewechsel") || text.includes("check-out") || text.includes("check-in");
}

function hasApartmentFinalCleaning(booking: Booking) {
  const text = getApartmentCleaningText(booking);
  return text.includes("endreinigung") || text.includes("auszugsreinigung");
}

function hasApartmentRecurring(booking: Booking) {
  const config = booking.details?.configuration || {};
  const text = getApartmentCleaningText(booking);
  return Boolean(config.recurringInterest) || ["regel", "woechentlich", "monat", "buchung", "mehrere"].some((needle) => text.includes(needle));
}

function hasApartmentB2B(booking: Booking) {
  const config = booking.details?.configuration || {};
  const text = getApartmentCleaningText(booking);
  return Boolean(config.b2bPotential) || ["b2b", "betreiber", "business", "unternehmen", "mehrere"].some((needle) => text.includes(needle));
}

function hasApartmentCheckinTime(booking: Booking) {
  const config = booking.details?.configuration || {};
  return hasAnyConfigValue(config, ["checkoutTime", "nextCheckinTime", "timeWindow"]) || hasApartmentGuestTurnover(booking);
}

function hasApartmentLaundry(booking: Booking) {
  const value = normalizeRegionText(String(booking.details?.configuration?.laundryChangeRequested || ""));
  if (value === "ja" || value === "yes" || value === "true") return true;
  const text = getApartmentCleaningText(booking);
  return text.includes("waeschewechsel ja") || text.includes("waesche gewuenscht");
}

function hasApartmentKeyCoordination(booking: Booking) {
  const value = normalizeRegionText(String(booking.details?.configuration?.keyCoordinationRequested || ""));
  if (value === "ja" || value === "yes" || value === "true") return true;
  const text = getApartmentCleaningText(booking);
  return text.includes("schluesselkoordination ja") || text.includes("schluessel gewuenscht");
}

function getTenantTurnoverRole(booking: Booking) {
  return normalizeRegionText(String(booking.details?.configuration?.roleType || ""));
}

function getRentalReadyRole(booking: Booking) {
  return normalizeRegionText(String(booking.details?.configuration?.roleType || ""));
}

function getObjectCaseRole(booking: Booking) {
  return normalizeRegionText(String(booking.details?.configuration?.roleType || ""));
}

function getObjectCaseText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  return normalizeRegionText(
    [
      config.roleType,
      config.objectType,
      config.objectCaseType,
      config.objectLocation,
      config.desiredDate,
      config.viewingDate,
      config.handoverDate,
      config.unitsCount,
      services,
      config.customerMessage,
      config.utmSource,
      config.utmMedium,
      config.utmCampaign,
      booking.details?.metadata?.clientContext?.utmSource,
      booking.details?.metadata?.clientContext?.utmMedium,
      booking.details?.metadata?.clientContext?.utmCampaign,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isHighValueObjectCaseRole(booking: Booking) {
  const role = getObjectCaseRole(booking);
  return ["makler", "vermieter", "hausverwaltung", "eigentuemer"].some((needle) => role.includes(needle));
}

function hasObjectCaseViewingDate(booking: Booking) {
  const config = booking.details?.configuration || {};
  return hasAnyConfigValue(config, ["viewingDate"]) || getObjectCaseText(booking).includes("besichtigung");
}

function hasObjectCaseHandoverDate(booking: Booking) {
  const config = booking.details?.configuration || {};
  return hasAnyConfigValue(config, ["handoverDate"]) || getObjectCaseText(booking).includes("uebergabe");
}

function hasObjectCaseMultipleUnits(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Number(config.unitsCount || 0) > 1 || getObjectCaseText(booking).includes("mehrere");
}

function hasObjectCaseCombinedServices(booking: Booking) {
  const text = getObjectCaseText(booking);
  return (
    (text.includes("raeum") || text.includes("entruempel") || text.includes("entsorgung") || text.includes("moebel")) &&
    (text.includes("reinigung") || text.includes("endreinigung") || text.includes("grundreinigung"))
  );
}

function hasDirectObjectCaseSource(booking: Booking) {
  const config = booking.details?.configuration || {};
  const context = booking.details?.metadata?.clientContext || {};
  const text = normalizeRegionText(
    [
      config.directAcquisition,
      context.directAcquisition,
      config.utmSource,
      config.utmMedium,
      config.utmCampaign,
      context.utmSource,
      context.utmMedium,
      context.utmCampaign,
      booking.details?.service?.source,
    ]
      .filter(Boolean)
      .join(" "),
  );
  return ["direct", "whatsapp", "qr", "email_signature", "direct_b2b"].some((needle) => text.includes(needle));
}

function getRentalReadyServicesText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  return normalizeRegionText([services, config.goalType, config.objectStatus, config.keyStatus].filter(Boolean).join(" "));
}

function isHighValueRentalRole(booking: Booking) {
  const role = getRentalReadyRole(booking);
  return ["hausverwaltung", "vermieter", "makler", "eigentuemer"].some((needle) => role.includes(needle));
}

function hasRentalReadyViewingDate(booking: Booking) {
  const config = booking.details?.configuration || {};
  return hasAnyConfigValue(config, ["viewingDate"]);
}

function hasRentalReadyHandoverDate(booking: Booking) {
  const config = booking.details?.configuration || {};
  return hasAnyConfigValue(config, ["handoverDate"]);
}

function hasRentalReadyCombinedServices(booking: Booking) {
  const services = getRentalReadyServicesText(booking);
  return (
    (services.includes("raeum") || services.includes("entruempel") || services.includes("entsorgung") || services.includes("moebel")) &&
    (services.includes("reinigung") || services.includes("endreinigung") || services.includes("grundreinigung"))
  );
}

function getPropertyReadyRole(booking: Booking) {
  return normalizeRegionText(String(booking.details?.configuration?.roleType || ""));
}

function getPropertyReadyText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  const spaces = Array.isArray(config.additionalSpaces) ? config.additionalSpaces.join(" ") : String(config.additionalSpaces || "");
  return normalizeRegionText(
    [
      config.roleType,
      config.companyName,
      config.objectType,
      config.objectLocation,
      config.goalType,
      config.objectStatus,
      config.desiredDate,
      config.viewingDate,
      config.exposePhotoDate,
      config.saleDeadline,
      config.urgency,
      config.legalClearanceStatus,
      config.hazardousMaterialsStatus,
      config.keyStatus,
      services,
      spaces,
      config.customerMessage,
      config.utmSource,
      config.utmMedium,
      config.utmCampaign,
      booking.details?.metadata?.clientContext?.utmSource,
      booking.details?.metadata?.clientContext?.utmMedium,
      booking.details?.metadata?.clientContext?.utmCampaign,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function isHighValuePropertyReadyRole(booking: Booking) {
  const role = getPropertyReadyRole(booking);
  return ["eigentuemer", "makler", "erbengemeinschaft", "hausverwaltung", "vermieter"].some((needle) => role.includes(needle));
}

function hasPropertyReadyViewingDate(booking: Booking) {
  const config = booking.details?.configuration || {};
  return hasAnyConfigValue(config, ["viewingDate"]) || getPropertyReadyText(booking).includes("besichtigung");
}

function hasPropertyReadyExposeDate(booking: Booking) {
  const config = booking.details?.configuration || {};
  const text = getPropertyReadyText(booking);
  return hasAnyConfigValue(config, ["exposePhotoDate"]) || text.includes("expose") || text.includes("foto");
}

function hasPropertyReadyEstateCase(booking: Booking) {
  const text = getPropertyReadyText(booking);
  return text.includes("erb") || text.includes("nachlass");
}

function hasPropertyReadyPremium(booking: Booking) {
  const text = getPropertyReadyText(booking);
  return text.includes("premium") || text.includes("diskret");
}

function hasPropertyReadyCombinedServices(booking: Booking) {
  const text = getPropertyReadyText(booking);
  return (
    (text.includes("raeum") || text.includes("entruempel") || text.includes("entsorgung") || text.includes("moebel")) &&
    (text.includes("reinigung") || text.includes("endreinigung") || text.includes("grundreinigung"))
  );
}

function hasPropertyReadyRegensburg(booking: Booking) {
  return getPropertyReadyText(booking).includes("regensburg");
}

function getEstateClearanceText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  const spaces = Array.isArray(config.additionalSpaces) ? config.additionalSpaces.join(" ") : String(config.additionalSpaces || "");
  return normalizeRegionText(
    [
      config.roleType,
      config.objectType,
      config.objectLocation,
      config.goalType,
      config.estateStatus,
      config.objectStatus,
      config.desiredDate,
      config.urgency,
      config.legalClearanceStatus,
      config.involvedParties,
      config.hazardousMaterialsStatus,
      config.keyStatus,
      services,
      spaces,
      config.customerMessage,
      config.utmSource,
      config.utmMedium,
      config.utmCampaign,
      booking.details?.metadata?.clientContext?.utmSource,
      booking.details?.metadata?.clientContext?.utmMedium,
      booking.details?.metadata?.clientContext?.utmCampaign,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function getEstateClearanceRole(booking: Booking) {
  return normalizeRegionText(String(booking.details?.configuration?.roleType || ""));
}

function hasEstateCallback(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(config.callbackWanted) || getEstateClearanceText(booking).includes("rueckruf");
}

function hasEstateInheritanceGroup(booking: Booking) {
  const text = getEstateClearanceText(booking);
  return text.includes("erbengemeinschaft") || text.includes("mehrere beteiligte");
}

function hasEstateClearanceOpen(booking: Booking) {
  const text = getEstateClearanceText(booking);
  return text.includes("freigabe unklar") || text.includes("freigabe nein") || text.includes("berechtigung unklar");
}

function hasEstateKeyUnclear(booking: Booking) {
  const text = getEstateClearanceText(booking);
  return text.includes("schluessel unklar") || text.includes("zugang unklar") || text.includes("key unklar");
}

function hasEstateSaleGoal(booking: Booking) {
  const text = getEstateClearanceText(booking);
  return text.includes("verkauf") || text.includes("verkaufsbereit") || text.includes("besichtigung");
}

function hasEstateRentalGoal(booking: Booking) {
  const text = getEstateClearanceText(booking);
  return text.includes("vermietung") || text.includes("vermietbar");
}

function hasEstatePremium(booking: Booking) {
  const text = getEstateClearanceText(booking);
  return text.includes("premium") || text.includes("diskret");
}

function hasEstateCombinedServices(booking: Booking) {
  const text = getEstateClearanceText(booking);
  return (
    (text.includes("raeum") || text.includes("entruempel") || text.includes("entsorgung") || text.includes("moebel")) &&
    (text.includes("reinigung") || text.includes("endreinigung") || text.includes("grundreinigung"))
  );
}

function hasEstateRegensburg(booking: Booking) {
  return getEstateClearanceText(booking).includes("regensburg");
}

function isDiscreetMoveLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      booking.details?.metadata?.clientContext?.leadSubtype,
      config.leadType,
      config.leadSubtype,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
      config.sourceComponent,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("diskreter_trennungsumzug") ||
    sourceText.includes("discreet_move") ||
    sourceText.includes("trennung_scheidung") ||
    sourceText.includes("diskreter-umzug-trennung-scheidung")
  );
}

function getDiscreetMoveText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const context = booking.details?.metadata?.clientContext || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  const restrictions = Array.isArray(config.contactRestrictions) ? config.contactRestrictions.join(" ") : String(config.contactRestrictions || "");
  return normalizeRegionText(
    [
      config.requestType,
      config.cityOrZip,
      config.location,
      config.desiredDate,
      config.safeContactMethod,
      config.callbackTimeWindow,
      restrictions,
      services,
      config.startLocation,
      config.destinationLocation,
      config.floor,
      config.elevator,
      config.accessNotes,
      config.keyStatus,
      config.itemDescription,
      config.handoverDate,
      config.customerMessage,
      config.sourceComponent,
      config.sourcePage,
      context.leadType,
      context.leadSubtype,
      context.leadSource,
      context.sourceComponent,
      context.utmSource,
      context.utmMedium,
      context.utmCampaign,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function hasDiscreetCallback(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(config.callbackTimeWindow) || getDiscreetMoveText(booking).includes("rueckruf");
}

function hasDiscreetSafeTime(booking: Booking) {
  const text = getDiscreetMoveText(booking);
  return text.includes("bestimmter uhrzeit") || text.includes("nur zu") || text.includes("uhrzeit");
}

function hasDiscreetPremium(booking: Booking) {
  const text = getDiscreetMoveText(booking);
  return text.includes("premium") || text.includes("diskret");
}

function hasDiscreetCleaning(booking: Booking) {
  const config = booking.details?.configuration || {};
  const text = getDiscreetMoveText(booking);
  return Boolean(config.cleaningRequested) || text.includes("reinigung") || text.includes("endreinigung");
}

function hasDiscreetItems(booking: Booking) {
  const text = getDiscreetMoveText(booking);
  return text.includes("moebel") || text.includes("gegenstaende") || text.includes("persoenliche") || text.includes("abholung");
}

function hasDiscreetKey(booking: Booking) {
  const text = getDiscreetMoveText(booking);
  return text.includes("schluessel") || text.includes("zugang");
}

function hasDiscreetHandoverFile(booking: Booking) {
  const config = booking.details?.configuration || {};
  const text = getDiscreetMoveText(booking);
  return Boolean(config.handoverFileRequested) || text.includes("uebergabeakte") || text.includes("foto-dokumentation");
}

function hasDiscreetRegensburg(booking: Booking) {
  return getDiscreetMoveText(booking).includes("regensburg");
}

function getDamageControlText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const openItems = Array.isArray(config.selectedOpenItems) ? config.selectedOpenItems.join(" ") : String(config.selectedOpenItems || "");
  const addons = Array.isArray(config.selectedAddons) ? config.selectedAddons.join(" ") : String(config.selectedAddons || "");
  return normalizeRegionText(
    [
      config.problemType,
      config.damageSituation,
      config.urgency,
      config.deadline,
      config.cityOrZip,
      config.location,
      openItems,
      addons,
      config.leadSource,
      config.sourceComponent,
      config.sourceContext,
      config.sourcePage,
      booking.details?.metadata?.clientContext?.leadSource,
      booking.details?.metadata?.clientContext?.sourceComponent,
      booking.details?.metadata?.clientContext?.sourceContext,
      booking.details?.metadata?.clientContext?.sourcePage,
      config.customerMessage,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function hasDamageToday(booking: Booking) {
  const text = getDamageControlText(booking);
  return text.includes("heute");
}

function hasDamageTomorrow(booking: Booking) {
  const text = getDamageControlText(booking);
  return text.includes("morgen");
}

function hasDamageHandover(booking: Booking) {
  const text = getDamageControlText(booking);
  return text.includes("uebergabe") || text.includes("ubergabe");
}

function hasDamageMove(booking: Booking) {
  const text = getDamageControlText(booking);
  return text.includes("umzug") || text.includes("transport") || text.includes("fahrzeug");
}

function hasDamageCleaning(booking: Booking) {
  const text = getDamageControlText(booking);
  return text.includes("reinigung") || text.includes("endreinigung") || text.includes("bad") || text.includes("kueche");
}

function hasDamageClearance(booking: Booking) {
  const text = getDamageControlText(booking);
  return text.includes("entruempel") || text.includes("entsorgung") || text.includes("sperrmuell") || text.includes("keller");
}

function hasDamageDuesseldorf(booking: Booking) {
  return getDamageControlText(booking).includes("duesseldorf");
}

function isDamagePlanButtonLead(booking: Booking) {
  const text = getDamageControlText(booking);
  return text.includes("plan_gekippt_button") || text.includes("plan gekippt");
}

function hasDamageWhatsAppPreferred(booking: Booking) {
  const text = getDamageControlText(booking);
  const preferred = normalizeRegionText(String(booking.details?.configuration?.preferredContact || ""));
  return preferred.includes("whatsapp") || text.includes("whatsapp");
}

function isPlanBServiceLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.service,
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.leadSubtype,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
      config.sourceComponent,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("plan_b_service") ||
    sourceText.includes("plan-b-service") ||
    sourceText.includes("plan b service") ||
    sourceText.includes("backup_service") ||
    sourceText.includes("backup absicherung") ||
    sourceText.includes("ersatzplan")
  );
}

function getPlanBText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const context = booking.details?.metadata?.clientContext || {};
  const openItems = Array.isArray(config.selectedOpenItems) ? config.selectedOpenItems.join(" ") : String(config.selectedOpenItems || "");
  const addons = Array.isArray(config.selectedAddons) ? config.selectedAddons.join(" ") : String(config.selectedAddons || "");
  return normalizeRegionText(
    [
      config.uncertainArea,
      config.problemType,
      config.riskLevel,
      config.desiredPlanBPackage,
      config.deadline,
      config.cityOrZip,
      config.startLocation,
      config.destinationLocation,
      config.previousOfferSource,
      config.budget,
      openItems,
      addons,
      config.leadSource,
      config.sourceComponent,
      config.sourceContext,
      config.sourcePage,
      config.customerMessage,
      context.leadType,
      context.leadSource,
      context.sourceComponent,
      context.utmSource,
      context.utmMedium,
      context.utmCampaign,
      booking.status,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function hasPlanBHighRisk(booking: Booking) {
  const text = getPlanBText(booking);
  return (
    text.includes("plan_b_noetig") ||
    text.includes("kritisch") ||
    text.includes("dringend") ||
    text.includes("heute") ||
    text.includes("morgen") ||
    text.includes("diese woche") ||
    text.includes("deadline sehr nah")
  );
}

function hasPlanBOffer(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(
    config.hasOfferUpload ||
      Number(config.offerUploadCount || 0) > 0 ||
      config.offerFileMetadata ||
      config.planBOfferFiles ||
      getPlanBText(booking).includes("angebot"),
  );
}

function hasPlanBPhotos(booking: Booking) {
  const config = booking.details?.configuration || {};
  return Boolean(
    config.hasPhotoUpload ||
      Number(config.photoUploadCount || 0) > 0 ||
      config.planBPhotoFiles ||
      config.photoFiles ||
      hasPhotoSignal(booking),
  );
}

function hasPlanBTransport(booking: Booking) {
  const text = getPlanBText(booking);
  return text.includes("transport") || text.includes("umzug") || text.includes("ersatztransport") || text.includes("fahrzeug");
}

function hasPlanBCleaning(booking: Booking) {
  const text = getPlanBText(booking);
  return text.includes("reinigung") || text.includes("endreinigung") || text.includes("auszugsreinigung");
}

function hasPlanBHandover(booking: Booking) {
  const text = getPlanBText(booking);
  return text.includes("uebergabe") || text.includes("schluessel") || text.includes("akte");
}

function hasPlanBDuesseldorf(booking: Booking) {
  const text = getPlanBText(booking);
  return text.includes("duesseldorf") && (text.includes("reinigung") || text.includes("entsorgung"));
}

function getCellarTrashroomText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  const itemTypes = Array.isArray(config.itemTypes) ? config.itemTypes.join(" ") : String(config.itemTypes || "");
  return normalizeRegionText(
    [
      config.roleType,
      config.areaType,
      config.objectType,
      config.objectLocation,
      config.cityOrZip,
      config.deadline,
      config.urgency,
      config.hazardousMaterialsStatus,
      config.legalClearanceStatus,
      config.accessNotes,
      config.keyStatus,
      services,
      itemTypes,
      config.customerMessage,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function getCellarRole(booking: Booking) {
  return normalizeRegionText(String(booking.details?.configuration?.roleType || ""));
}

function hasCellarHighValueRole(booking: Booking) {
  const role = getCellarRole(booking);
  return ["hausverwaltung", "weg", "gewerbe", "vermieter"].some((needle) => role.includes(needle));
}

function hasCellarLegalClearanceOpen(booking: Booking) {
  const value = normalizeRegionText(String(booking.details?.configuration?.legalClearanceStatus || ""));
  return value.includes("unklar") || value.includes("nein") || value.includes("offen");
}

function hasCellarHazardOpen(booking: Booking) {
  const value = normalizeRegionText(String(booking.details?.configuration?.hazardousMaterialsStatus || ""));
  return value.includes("unklar") || value.includes("ja");
}

function hasCellarCleaning(booking: Booking) {
  const text = getCellarTrashroomText(booking);
  return text.includes("reinigung") || text.includes("sauber") || text.includes("objekt-ready");
}

function hasCellarRegensburg(booking: Booking) {
  const text = getCellarTrashroomText(booking);
  return text.includes("regensburg") || text.includes("930");
}

function getHandoverServicesText(booking: Booking) {
  const config = booking.details?.configuration || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  const scopeItems = getDashboardStringArray(config.documentationScopeItems).join(" ");
  const openItems = getDashboardStringArray(config.openItems).join(" ");
  return normalizeRegionText([services, config.documentationScope, scopeItems, openItems, config.keyStatus, config.recipientType, config.fileStatus].filter(Boolean).join(" "));
}

function hasHandoverTerm(booking: Booking) {
  const config = booking.details?.configuration || {};
  return hasAnyConfigValue(config, ["handoverDate", "desiredDate", "serviceDate", "date"]);
}

function hasHandoverRecipient(booking: Booking) {
  const recipient = normalizeRegionText(String(booking.details?.configuration?.recipientType || ""));
  return Boolean(recipient && !recipient.includes("offen"));
}

function getHandoverFileStatus(booking: Booking) {
  const config = booking.details?.configuration || {};
  return normalizeRegionText(String(config.fileStatus || booking.status || ""));
}

function hasOpenHandoverFile(booking: Booking) {
  if (!isHandoverFileLead(booking)) return false;
  const status = getHandoverFileStatus(booking);
  return !["akte_abgeschlossen", "abgeschlossen", "archiviert", "erledigt"].some((needle) => status.includes(needle));
}

function hasHandoverMissingPhotos(booking: Booking) {
  if (!isHandoverFileLead(booking)) return false;
  const text = getHandoverServicesText(booking);
  return text.includes("foto") && !hasPhotoSignal(booking);
}

function hasHandoverKeyUnclear(booking: Booking) {
  if (!isHandoverFileLead(booking)) return false;
  const keyStatus = normalizeRegionText(String(booking.details?.configuration?.keyStatus || ""));
  return !keyStatus || keyStatus.includes("unklar") || keyStatus.includes("offen");
}

function hasRecurringTenantPotential(booking: Booking) {
  const config = booking.details?.configuration || {};
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(" ") : String(config.selectedServices || "");
  return Boolean(config.recurringInterest) || normalizeRegionText(services).includes("wiederkehr");
}

function isUrgentTenantTurnover(booking: Booking) {
  const config = booking.details?.configuration || {};
  const urgency = normalizeRegionText(String(config.urgency || config.quickEntry || ""));
  return urgency.includes("diese_woche") || urgency.includes("uebergabe") || urgency.includes("urgent");
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

function isRouteBoardLead(booking: Booking) {
  const config = booking.details?.configuration || {};
  const sourceText = normalizeRegionText(
    [
      getSourceLabel(booking),
      booking.details?.service?.source,
      booking.details?.metadata?.source,
      booking.details?.metadata?.clientContext?.leadType,
      config.leadType,
      config.requestContext,
      booking.details?.service?.entryPoint,
      config.entryPoint,
    ]
      .filter(Boolean)
      .join(" "),
  );

  return (
    sourceText.includes("rueckfahrt_boerse") ||
    sourceText.includes("rueckfahrt-boerse") ||
    sourceText.includes("return_trip_board") ||
    sourceText.includes("route_board") ||
    sourceText.includes("streckenradar")
  );
}

function getRouteBoardText(booking: Booking) {
  const config = booking.details?.configuration || {};
  return normalizeRegionText(
    [
      config.startLocation,
      config.startZip,
      config.fromAddress,
      config.destinationLocation,
      config.destinationZip,
      config.toAddress,
      config.targetAddress,
      config.requestType,
      config.itemDescription,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function hasHighRouteFlexibility(booking: Booking) {
  const flexibility = normalizeRegionText(String(booking.details?.configuration?.dateFlexibility || ""));
  return isRouteBoardLead(booking) && flexibility.includes("flexibel") && !flexibility.includes("fixes");
}

function hasFixedRouteDate(booking: Booking) {
  const flexibility = normalizeRegionText(String(booking.details?.configuration?.dateFlexibility || ""));
  return isRouteBoardLead(booking) && (flexibility.includes("fixes") || flexibility.includes("fix"));
}

function routeIncludesCity(booking: Booking, city: string) {
  return getRouteBoardText(booking).includes(city);
}

function isB2BCleaning(booking: Booking) {
  const service = booking.service.toLowerCase();
  const source = getSourceLabel(booking).toLowerCase();
  const config = booking.details?.configuration || {};
  const serviceSignal = getDuesseldorfB2BText(booking);
  const hasRegensburgServicePageSignal = [
    "gewerbereinigung",
    "bueroreinigung",
    "buroreinigung",
    "praxisreinigung",
    "hotelreinigung",
    "fensterreinigung",
    "baureinigung",
    "teppichreinigung",
    "treppenhausreinigung",
    "unterhaltsreinigung",
    "grundreinigung",
  ].some((term) => serviceSignal.includes(term));
  if (isDuesseldorfB2BCleaningLead(booking)) return true;
  if (isDuesseldorfApartmentCleaningLead(booking) && hasApartmentB2B(booking)) return true;
  return (
    service === "b2b_reinigung" ||
    source.includes("b2b") ||
    source.includes("gewerbe") ||
    config.requestContext === "commercial_cleaning_service" ||
    hasRegensburgServicePageSignal ||
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
  return booking.status === "angebot_versendet" || hasSentDocument || (olderThanOneDay && !["new", "archiviert"].includes(booking.status));
}

function getAgeInDays(value?: string) {
  if (!value) return 0;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000)));
}

function getLeadAgeLabel(value?: string) {
  if (!value) return "Alter unbekannt";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Alter unbekannt";
  const diffMinutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / (60 * 1000)));
  if (diffMinutes < 60) return `${diffMinutes || 1} Min. alt`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} Std. alt`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} Tag${diffDays === 1 ? "" : "e"} alt`;
}

function isTodayLead(booking: Booking) {
  const date = new Date(booking.timestamp);
  if (Number.isNaN(date.getTime())) return false;
  return date.toDateString() === new Date().toDateString();
}

function isUnhandledLead(booking: Booking) {
  return !isClosed(booking) && ["new", "in_pruefung", "in_bearbeitung", "rueckfrage_noetig"].includes(booking.status);
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
  if (isDuesseldorfB2BCleaningLead(booking)) return "Objekt, Fläche, Frequenz und Zeitfenster prüfen";
  if (isDuesseldorfApartmentCleaningLead(booking)) return "Terminfenster, Zugang und Zusatzwünsche prüfen";
  if (isB2BCleaning(booking)) return "Service, Objekt, Fläche, Turnus und Fotos prüfen";
  if (isPlatformOrderLead(booking)) return "Plattformfall, Angebot und offene Punkte prüfen";
  if (isReferralPartnercodeLead(booking)) return "Partnercode, Auftrag und Bonusstatus prüfen";
  if (isPropertyReadyLead(booking)) return "Objektstatus, Fotos, Besichtigung und Zugang prüfen";
  if (isDiscreetMoveLead(booking)) return "Diskret Rückruf, Kontaktweg, Berechtigung und Umfang prüfen";
  if (isEstateClearanceLead(booking)) return "Diskret Rückruf, Freigabe, Fotos und Umfang prüfen";
  if (isRealtorLandlordLinkLead(booking)) return "Objektfall, Fotos und Termin prüfen";
  if (isCellarTrashroomLead(booking)) return "Freigabe, Fotos und Umfang prüfen";
  if (isPlanBServiceLead(booking)) return "Risiko, Backup-Paket und Kapazität prüfen";
  if (isDamageControlLead(booking)) return "Sofort Machbarkeit prüfen";
  if (isRentalReadyLead(booking)) return "Objektstatus prüfen";
  if (isHandoverFileLead(booking)) return "Dokumentationsumfang klaeren";
  if (booking.status === "new") return "Anfrage prüfen";
  if (hasBudget(booking)) return "Preisrahmen prüfen";
  if (hasOrderConfirmationOpen(booking)) return "AB vorbereiten";
  if (shouldFollowUp(booking)) return "Kunde nachfassen";
  return "Vorgang öffnen";
}

function matchesInquiryFilter(booking: Booking, filter: InquiryFilter) {
  if (filter === "all") return true;
  if (filter === "today") return isTodayLead(booking);
  if (filter === "unhandled") return isUnhandledLead(booking);
  if (filter === "new") return booking.status === "new";
  if (filter === "in-progress") return ["in_pruefung", "in_bearbeitung", "rueckfrage_noetig"].includes(booking.status);
  if (filter === "rueckfrage") return booking.status === "rueckfrage_noetig";
  if (filter === "angebot-gesendet") return booking.status === "angebot_versendet";
  if (filter === "won") return ["angenommen", "gewonnen"].includes(booking.status);
  if (filter === "lost") return ["abgelehnt", "verloren", "archiviert", "storniert", "archived"].includes(booking.status);
  if (filter === "route-board") return isRouteBoardLead(booking);
  if (filter === "high-flexibility") return hasHighRouteFlexibility(booking);
  if (filter === "fixed-date") return hasFixedRouteDate(booking);
  if (filter === "regensburg-start") return isRouteBoardLead(booking) && normalizeRegionText(String(booking.details?.configuration?.startLocation || booking.details?.configuration?.fromAddress || "")).includes("regensburg");
  if (filter === "regensburg-destination") return isRouteBoardLead(booking) && normalizeRegionText(String(booking.details?.configuration?.destinationLocation || booking.details?.configuration?.toAddress || "")).includes("regensburg");
  if (filter === "bavaria-route") return isRouteBoardLead(booking) && (getRouteBoardText(booking).includes("bayern") || getRouteBoardText(booking).includes("regensburg"));
  if (filter === "corridor-munich") return isRouteBoardLead(booking) && routeIncludesCity(booking, "munchen");
  if (filter === "corridor-nuremberg") return isRouteBoardLead(booking) && routeIncludesCity(booking, "nurnberg");
  if (filter === "corridor-straubing") return isRouteBoardLead(booking) && routeIncludesCity(booking, "straubing");
  if (filter === "corridor-passau") return isRouteBoardLead(booking) && routeIncludesCity(booking, "passau");
  if (filter === "corridor-ingolstadt") return isRouteBoardLead(booking) && routeIncludesCity(booking, "ingolstadt");
  if (filter === "offer-check") return isOfferCheckLead(booking);
  if (filter === "cheaper-alternative") return isCheaperAlternativeLead(booking);
  if (filter === "cheaper-with-offer") return isCheaperAlternativeLead(booking) && hasCheaperAlternativeOffer(booking);
  if (filter === "cheaper-with-price") return isCheaperAlternativeLead(booking) && hasCheaperAlternativePrice(booking);
  if (filter === "cheaper-with-budget") return isCheaperAlternativeLead(booking) && hasCheaperAlternativeBudget(booking);
  if (filter === "red-flag-scanner") return isRedFlagScannerLead(booking);
  if (filter === "red-flag-high") return isRedFlagScannerLead(booking) && hasHighRedFlagScore(booking);
  if (filter === "red-flag-upload") return isRedFlagScannerLead(booking) && hasOfferCheckUpload(booking);
  if (filter === "red-flag-price") return isRedFlagScannerLead(booking) && hasRedFlagOfferPrice(booking);
  if (filter === "red-flag-duesseldorf") return hasRedFlagDuesseldorf(booking);
  if (filter === "platform-order") return isPlatformOrderLead(booking);
  if (filter === "platform-myhammer") return isPlatformOrderLead(booking) && getPlatformType(booking).includes("myhammer");
  if (filter === "platform-check24") return isPlatformOrderLead(booking) && getPlatformType(booking).includes("check24");
  if (filter === "platform-other") return isPlatformOrderLead(booking) && (getPlatformType(booking).includes("andere") || getPlatformType(booking).includes("plattform"));
  if (filter === "platform-with-offer") return isPlatformOrderLead(booking) && hasPlatformOfferUpload(booking);
  if (filter === "platform-with-price") return isPlatformOrderLead(booking) && hasPlatformPrice(booking);
  if (filter === "platform-with-photos") return isPlatformOrderLead(booking) && hasPlatformPhotos(booking);
  if (filter === "platform-provider-unclear") return isPlatformOrderLead(booking) && hasPlatformProviderUnclear(booking);
  if (filter === "platform-aborted") return isPlatformOrderLead(booking) && hasPlatformAborted(booking);
  if (filter === "platform-regensburg") return isPlatformOrderLead(booking) && isPlatformRegensburg(booking);
  if (filter === "platform-duesseldorf") return isPlatformOrderLead(booking) && isPlatformDuesseldorf(booking);
  if (filter === "tenant-turnover") return isTenantTurnoverLead(booking);
  if (filter === "handover-file") return isHandoverFileLead(booking);
  if (filter === "handover-key") return isHandoverFileLead(booking) && getHandoverServicesText(booking).includes("schluessel");
  if (filter === "handover-cleaning") return isHandoverFileLead(booking) && getHandoverServicesText(booking).includes("endreinigung");
  if (filter === "handover-clearance") return isHandoverFileLead(booking) && (getHandoverServicesText(booking).includes("entruempel") || getHandoverServicesText(booking).includes("entsorgung"));
  if (filter === "handover-tenant") return isHandoverFileLead(booking) && getHandoverServicesText(booking).includes("mieterwechsel");
  if (filter === "handover-date") return isHandoverFileLead(booking) && hasHandoverTerm(booking);
  if (filter === "handover-recipient") return isHandoverFileLead(booking) && hasHandoverRecipient(booking);
  if (filter === "handover-open") return hasOpenHandoverFile(booking);
  if (filter === "handover-photos-missing") return hasHandoverMissingPhotos(booking);
  if (filter === "handover-key-unclear") return hasHandoverKeyUnclear(booking);
  if (filter === "handover-premium") return isHandoverFileLead(booking) && getHandoverServicesText(booking).includes("premium");
  if (filter === "rental-ready") return isRentalReadyLead(booking);
  if (filter === "rental-viewing") return isRentalReadyLead(booking) && hasRentalReadyViewingDate(booking);
  if (filter === "rental-handover") return isRentalReadyLead(booking) && hasRentalReadyHandoverDate(booking);
  if (filter === "rental-multiple-units") return isRentalReadyLead(booking) && Number(booking.details?.configuration?.unitsCount || 0) > 1;
  if (filter === "property-ready-service") return isPropertyReadyLead(booking);
  if (filter === "property-ready-owner") return isPropertyReadyLead(booking) && getPropertyReadyRole(booking).includes("eigentuemer");
  if (filter === "property-ready-realtor") return isPropertyReadyLead(booking) && getPropertyReadyRole(booking).includes("makler");
  if (filter === "property-ready-estate") return isPropertyReadyLead(booking) && hasPropertyReadyEstateCase(booking);
  if (filter === "property-ready-manager") return isPropertyReadyLead(booking) && getPropertyReadyRole(booking).includes("hausverwaltung");
  if (filter === "property-ready-photos") return isPropertyReadyLead(booking) && hasPhotoSignal(booking);
  if (filter === "property-ready-viewing") return isPropertyReadyLead(booking) && hasPropertyReadyViewingDate(booking);
  if (filter === "property-ready-expose") return isPropertyReadyLead(booking) && hasPropertyReadyExposeDate(booking);
  if (filter === "property-ready-premium") return isPropertyReadyLead(booking) && hasPropertyReadyPremium(booking);
  if (filter === "property-ready-combined") return isPropertyReadyLead(booking) && hasPropertyReadyCombinedServices(booking);
  if (filter === "property-ready-regensburg") return isPropertyReadyLead(booking) && hasPropertyReadyRegensburg(booking);
  if (filter === "estate-clearance") return isEstateClearanceLead(booking);
  if (filter === "estate-callback") return isEstateClearanceLead(booking) && hasEstateCallback(booking);
  if (filter === "estate-inheritance-group") return isEstateClearanceLead(booking) && hasEstateInheritanceGroup(booking);
  if (filter === "estate-clearance-open") return isEstateClearanceLead(booking) && hasEstateClearanceOpen(booking);
  if (filter === "estate-key-unclear") return isEstateClearanceLead(booking) && hasEstateKeyUnclear(booking);
  if (filter === "estate-photos") return isEstateClearanceLead(booking) && hasPhotoSignal(booking);
  if (filter === "estate-sale") return isEstateClearanceLead(booking) && hasEstateSaleGoal(booking);
  if (filter === "estate-rental") return isEstateClearanceLead(booking) && hasEstateRentalGoal(booking);
  if (filter === "estate-premium") return isEstateClearanceLead(booking) && hasEstatePremium(booking);
  if (filter === "estate-regensburg") return isEstateClearanceLead(booking) && hasEstateRegensburg(booking);
  if (filter === "discreet-move") return isDiscreetMoveLead(booking);
  if (filter === "discreet-callback") return isDiscreetMoveLead(booking) && hasDiscreetCallback(booking);
  if (filter === "discreet-safe-time") return isDiscreetMoveLead(booking) && hasDiscreetSafeTime(booking);
  if (filter === "discreet-premium") return isDiscreetMoveLead(booking) && hasDiscreetPremium(booking);
  if (filter === "discreet-cleaning") return isDiscreetMoveLead(booking) && hasDiscreetCleaning(booking);
  if (filter === "discreet-items") return isDiscreetMoveLead(booking) && hasDiscreetItems(booking);
  if (filter === "discreet-key") return isDiscreetMoveLead(booking) && hasDiscreetKey(booking);
  if (filter === "discreet-handover-file") return isDiscreetMoveLead(booking) && hasDiscreetHandoverFile(booking);
  if (filter === "discreet-regensburg") return isDiscreetMoveLead(booking) && hasDiscreetRegensburg(booking);
  if (filter === "damage-control") return isDamageControlLead(booking);
  if (filter === "damage-plan-gekippt") return isDamageControlLead(booking) && isDamagePlanButtonLead(booking);
  if (filter === "damage-button-source") return isDamageControlLead(booking) && isDamagePlanButtonLead(booking);
  if (filter === "damage-whatsapp-preferred") return isDamageControlLead(booking) && hasDamageWhatsAppPreferred(booking);
  if (filter === "damage-today") return isDamageControlLead(booking) && hasDamageToday(booking);
  if (filter === "damage-tomorrow") return isDamageControlLead(booking) && hasDamageTomorrow(booking);
  if (filter === "damage-handover") return isDamageControlLead(booking) && hasDamageHandover(booking);
  if (filter === "damage-move") return isDamageControlLead(booking) && hasDamageMove(booking);
  if (filter === "damage-cleaning") return isDamageControlLead(booking) && hasDamageCleaning(booking);
  if (filter === "damage-clearance") return isDamageControlLead(booking) && hasDamageClearance(booking);
  if (filter === "damage-duesseldorf") return isDamageControlLead(booking) && hasDamageDuesseldorf(booking);
  if (filter === "plan-b-service") return isPlanBServiceLead(booking);
  if (filter === "plan-b-high-risk") return isPlanBServiceLead(booking) && hasPlanBHighRisk(booking);
  if (filter === "plan-b-with-offer") return isPlanBServiceLead(booking) && hasPlanBOffer(booking);
  if (filter === "plan-b-with-photos") return isPlanBServiceLead(booking) && hasPlanBPhotos(booking);
  if (filter === "plan-b-phone") return isPlanBServiceLead(booking) && Boolean(booking.phone);
  if (filter === "plan-b-transport") return isPlanBServiceLead(booking) && hasPlanBTransport(booking);
  if (filter === "plan-b-cleaning") return isPlanBServiceLead(booking) && hasPlanBCleaning(booking);
  if (filter === "plan-b-handover") return isPlanBServiceLead(booking) && hasPlanBHandover(booking);
  if (filter === "plan-b-duesseldorf") return isPlanBServiceLead(booking) && hasPlanBDuesseldorf(booking);
  if (filter === "cellar-trashroom") return isCellarTrashroomLead(booking);
  if (filter === "cellar-property-manager") return isCellarTrashroomLead(booking) && getCellarRole(booking).includes("hausverwaltung");
  if (filter === "cellar-weg") return isCellarTrashroomLead(booking) && (getCellarRole(booking).includes("weg") || getCellarRole(booking).includes("eigentuemer"));
  if (filter === "cellar-business") return isCellarTrashroomLead(booking) && getCellarRole(booking).includes("gewerbe");
  if (filter === "cellar-clearance-open") return isCellarTrashroomLead(booking) && hasCellarLegalClearanceOpen(booking);
  if (filter === "cellar-hazard-open") return isCellarTrashroomLead(booking) && hasCellarHazardOpen(booking);
  if (filter === "cellar-cleaning") return isCellarTrashroomLead(booking) && hasCellarCleaning(booking);
  if (filter === "realtor-landlord-link") return isRealtorLandlordLinkLead(booking);
  if (filter === "object-case-realtor") return isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("makler");
  if (filter === "object-case-landlord") return isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("vermieter");
  if (filter === "object-case-owner") return isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("eigentuemer");
  if (filter === "object-case-property-manager") return isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("hausverwaltung");
  if (filter === "object-case-viewing") return isRealtorLandlordLinkLead(booking) && hasObjectCaseViewingDate(booking);
  if (filter === "object-case-handover") return isRealtorLandlordLinkLead(booking) && hasObjectCaseHandoverDate(booking);
  if (filter === "object-case-multiple") return isRealtorLandlordLinkLead(booking) && hasObjectCaseMultipleUnits(booking);
  if (filter === "object-case-direct-source") return isRealtorLandlordLinkLead(booking) && hasDirectObjectCaseSource(booking);
  if (filter === "referral-partnercode") return isReferralPartnercodeLead(booking);
  if (filter === "referral-new-code") return isReferralPartnercodeLead(booking) && getReferralText(booking).includes("partnercode_erstellt");
  if (filter === "referral-with-person") return isReferralPartnercodeLead(booking) && hasReferredPerson(booking);
  if (filter === "referral-without-person") return isReferralPartnercodeLead(booking) && !hasReferredPerson(booking);
  if (filter === "referral-bonus-review") return isReferralPartnercodeLead(booking) && isReferralBonusReview(booking);
  if (filter === "referral-bonus-payout") return isReferralPartnercodeLead(booking) && isReferralBonusPayout(booking);
  if (filter === "referral-not-eligible") return isReferralPartnercodeLead(booking) && isReferralNotEligible(booking);
  if (filter === "referral-regensburg") return isReferralPartnercodeLead(booking) && isReferralRegensburg(booking);
  if (filter === "referral-duesseldorf") return isReferralPartnercodeLead(booking) && isReferralDuesseldorf(booking);
  if (filter === "referral-b2b") return isReferralPartnercodeLead(booking) && isReferralB2B(booking);
  if (filter === "property-manager") return (isTenantTurnoverLead(booking) && getTenantTurnoverRole(booking).includes("hausverwaltung")) || (isRentalReadyLead(booking) && getRentalReadyRole(booking).includes("hausverwaltung")) || (isPropertyReadyLead(booking) && getPropertyReadyRole(booking).includes("hausverwaltung")) || (isEstateClearanceLead(booking) && getEstateClearanceRole(booking).includes("hausverwaltung")) || (isCellarTrashroomLead(booking) && getCellarRole(booking).includes("hausverwaltung")) || (isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("hausverwaltung"));
  if (filter === "landlord") return (isTenantTurnoverLead(booking) && getTenantTurnoverRole(booking).includes("vermieter")) || (isRentalReadyLead(booking) && getRentalReadyRole(booking).includes("vermieter")) || (isPropertyReadyLead(booking) && getPropertyReadyRole(booking).includes("vermieter")) || (isEstateClearanceLead(booking) && getEstateClearanceRole(booking).includes("vermieter")) || (isCellarTrashroomLead(booking) && getCellarRole(booking).includes("vermieter")) || (isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("vermieter"));
  if (filter === "realtor") return (isTenantTurnoverLead(booking) && getTenantTurnoverRole(booking).includes("makler")) || (isRentalReadyLead(booking) && getRentalReadyRole(booking).includes("makler")) || (isPropertyReadyLead(booking) && getPropertyReadyRole(booking).includes("makler")) || (isEstateClearanceLead(booking) && getEstateClearanceRole(booking).includes("makler")) || (isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("makler"));
  if (filter === "owner") return (isTenantTurnoverLead(booking) && getTenantTurnoverRole(booking).includes("eigentuemer")) || (isRentalReadyLead(booking) && getRentalReadyRole(booking).includes("eigentuemer")) || (isPropertyReadyLead(booking) && getPropertyReadyRole(booking).includes("eigentuemer")) || (isEstateClearanceLead(booking) && (getEstateClearanceRole(booking).includes("eigentuemer") || getEstateClearanceRole(booking).includes("erbe") || getEstateClearanceRole(booking).includes("angehoeriger") || getEstateClearanceRole(booking).includes("bevollmaechtigter"))) || (isCellarTrashroomLead(booking) && (getCellarRole(booking).includes("eigentuemer") || getCellarRole(booking).includes("weg"))) || (isRealtorLandlordLinkLead(booking) && getObjectCaseRole(booking).includes("eigentuemer"));
  if (filter === "urgent-handover") return isTenantTurnoverLead(booking) && isUrgentTenantTurnover(booking);
  if (filter === "recurring-tenant") return isTenantTurnoverLead(booking) && hasRecurringTenantPotential(booking);
  if (filter === "budget") return hasBudget(booking);
  if (filter === "with-phone") return Boolean(normalizePhoneForContact(booking.phone));
  if (filter === "with-photos") return hasPhotoSignal(booking);
  if (filter === "needs-info") return getLeadQuality(booking).tone !== "ready";
  if (filter === "duesseldorf-b2b-cleaning") return isDuesseldorfB2BCleaningLead(booking);
  if (filter === "b2b-office") return hasDuesseldorfB2BOffice(booking);
  if (filter === "b2b-agency-studio") return hasDuesseldorfB2BAgencyStudio(booking);
  if (filter === "b2b-law-office") return hasDuesseldorfB2BLawOffice(booking);
  if (filter === "b2b-practice") return hasDuesseldorfB2BPractice(booking);
  if (filter === "b2b-staircase") return hasDuesseldorfB2BStaircase(booking);
  if (filter === "b2b-recurring") return hasDuesseldorfB2BRecurring(booking);
  if (filter === "b2b-one-time") return hasDuesseldorfB2BOneTime(booking);
  if (filter === "b2b-with-area") return isDuesseldorfB2BCleaningLead(booking) && hasB2BArea(booking);
  if (filter === "b2b-with-photos") return isDuesseldorfB2BCleaningLead(booking) && hasPhotoSignal(booking);
  if (filter === "b2b-with-phone") return isDuesseldorfB2BCleaningLead(booking) && Boolean(normalizePhoneForContact(booking.phone));
  if (filter === "b2b-recurring-potential") return isDuesseldorfB2BCleaningLead(booking) && hasDuesseldorfB2BRecurringPotential(booking);
  if (filter === "duesseldorf-cleaning") return isDuesseldorfCleaningLead(booking);
  if (filter === "duesseldorf-apartment-cleaning") return isDuesseldorfApartmentCleaningLead(booking);
  if (filter === "apartment-guest-turnover") return isDuesseldorfApartmentCleaningLead(booking) && hasApartmentGuestTurnover(booking);
  if (filter === "apartment-final-cleaning") return isDuesseldorfApartmentCleaningLead(booking) && hasApartmentFinalCleaning(booking);
  if (filter === "apartment-recurring") return isDuesseldorfApartmentCleaningLead(booking) && hasApartmentRecurring(booking);
  if (filter === "apartment-b2b") return isDuesseldorfApartmentCleaningLead(booking) && hasApartmentB2B(booking);
  if (filter === "apartment-checkin-time") return isDuesseldorfApartmentCleaningLead(booking) && hasApartmentCheckinTime(booking);
  if (filter === "apartment-laundry") return isDuesseldorfApartmentCleaningLead(booking) && hasApartmentLaundry(booking);
  if (filter === "apartment-key") return isDuesseldorfApartmentCleaningLead(booking) && hasApartmentKeyCoordination(booking);
  if (filter === "duesseldorf-disposal") return isDuesseldorfDisposalLead(booking);
  if (filter === "conversion-trigger") {
    return (
      isOfferCheckLead(booking) ||
      isCheaperAlternativeLead(booking) ||
      isRedFlagScannerLead(booking) ||
      isPlatformOrderLead(booking) ||
      isPlanBServiceLead(booking) ||
      isDamageControlLead(booking) ||
      isReferralPartnercodeLead(booking)
    );
  }
  if (filter === "object-system") {
    return (
      isTenantTurnoverLead(booking) ||
      isRentalReadyLead(booking) ||
      isPropertyReadyLead(booking) ||
      isEstateClearanceLead(booking) ||
      isHandoverFileLead(booking) ||
      isRealtorLandlordLinkLead(booking) ||
      isCellarTrashroomLead(booking)
    );
  }
  if (filter === "duesseldorf-revenue") {
    return (
      isDuesseldorfB2BCleaningLead(booking) ||
      isDuesseldorfApartmentCleaningLead(booking) ||
      isDuesseldorfDisposalLead(booking)
    );
  }
  if (filter === "regensburg-umzug") return isRegensburgMoveLead(booking);
  if (filter === "regensburg-bayern") return isRegensburgBavariaLead(booking);
  if (filter === "high-score") return getLeadRevenueScore(booking).priority === "high";
  if (filter === "google-maps") return isGoogleMapsLead(booking);
  if (filter === "google-ads") return isGoogleAdsLead(booking);
  if (filter === "premium") return isPremiumLead(booking) || (isDiscreetMoveLead(booking) && hasDiscreetPremium(booking));
  if (filter === "b2b-cleaning") return isB2BCleaning(booking);
  if (filter === "return-trip") return isReturnTrip(booking);
  if (filter === "reinigung") return isCleaningService(booking);
  if (filter === "entsorgung") return isDisposalService(booking);
  if (filter === "umzug") {
    return !isCleaningService(booking) && !isDisposalService(booking) && !isReturnTrip(booking) && !isTenantTurnoverLead(booking) && !isRentalReadyLead(booking) && !isPropertyReadyLead(booking) && !isEstateClearanceLead(booking) && !isDiscreetMoveLead(booking) && !isPlatformOrderLead(booking) && !isPlanBServiceLead(booking) && !isDamageControlLead(booking) && !isCellarTrashroomLead(booking) && !isRealtorLandlordLinkLead(booking) && !isReferralPartnercodeLead(booking) && !isDuesseldorfApartmentCleaningLead(booking);
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
          getProcessLabel(booking),
          getMainLocation(booking),
          booking.details?.service?.source,
          booking.details?.service?.entryPoint,
          booking.details?.configuration?.requestedService,
          booking.details?.configuration?.serviceLabel,
          booking.details?.configuration?.serviceSlug,
          booking.details?.configuration?.sourcePage,
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
  const todayLeadCount = activeBookings.filter((booking) => {
    const created = new Date(booking.timestamp);
    const now = new Date();
    return (
      created.getFullYear() === now.getFullYear() &&
      created.getMonth() === now.getMonth() &&
      created.getDate() === now.getDate()
    );
  }).length;
  const openLeadCount = activeBookings.filter((booking) => !isClosed(booking)).length;
  const acceptedLeadCount = activeBookings.filter((booking) => booking.status === "angenommen").length;
  const lostLeadCount = activeBookings.filter((booking) => ["abgelehnt", "storniert"].includes(booking.status)).length;

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
      .filter((booking) => !isClosed(booking))
      .map((booking) => ({ booking, revenue: getLeadRevenueScore(booking) }))
      .filter(({ revenue }) => revenue.priority === "high")
      .sort((a, b) => b.revenue.score - a.revenue.score)
      .slice(0, 3)
      .forEach(({ booking, revenue }) =>
        pushBooking(
          booking,
          `High Score ${revenue.score}`,
          revenue.reasons[0] || "Kontakt, Termin und nächsten Schritt sofort prüfen",
          "inquiries",
        ),
      );

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

    return tasks.slice(0, 5);
  }, [bookings, followUpBookings, priceReviewBookings]);

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

    if (!response.ok || payload?.ok === false) {
      throw new Error(payload.error || "Anfrage konnte nicht gelöscht werden.");
    }

    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
    if (selectedBooking?.id === bookingId) setSelectedBooking(null);
    setError(null);
    setSuccessMessage("Diese Anfrage wurde gelöscht.");
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
                    {activeTab === "overview" ? "Heute im Operations Center" : activeMeta.label}
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
            {successMessage ? (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                {successMessage}
              </div>
            ) : null}

            {activeTab === "overview" ? (
              <OverviewWorkspace
                loading={loading}
                newRequestsCount={newRequestsCount}
                priceReviewOpenCount={priceReviewOpenCount}
                abOpenCount={abOpenCount}
                followUpCount={followUpBookings.length}
                todayLeadCount={todayLeadCount}
                openLeadCount={openLeadCount}
                acceptedLeadCount={acceptedLeadCount}
                lostLeadCount={lostLeadCount}
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
                onDelete={handleDeleteBooking}
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
  todayLeadCount,
  openLeadCount,
  acceptedLeadCount,
  lostLeadCount,
  priorityTasks,
  onOpenTask,
  onShortcut,
}: {
  loading: boolean;
  newRequestsCount: number;
  priceReviewOpenCount: number;
  abOpenCount: number;
  followUpCount: number;
  todayLeadCount: number;
  openLeadCount: number;
  acceptedLeadCount: number;
  lostLeadCount: number;
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
        title="Heute"
        text="Neue Leads, offene Angebote, Rückfragen und nächste Aktionen in einem klaren Kontrollraum."
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

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Heute neu", value: todayLeadCount, hint: "Frische Leads im Tagesfenster." },
          { label: "Offen gesamt", value: openLeadCount, hint: "Noch nicht abgeschlossen." },
          { label: "Angenommen", value: acceptedLeadCount, hint: "Gewonnene Vorgänge." },
          { label: "Verloren", value: lostLeadCount, hint: "Abgelehnt oder storniert." },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-950/5"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              {loading ? "..." : item.value}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{item.hint}</p>
          </div>
        ))}
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
  onDelete,
}: {
  loading: boolean;
  allBookings: Booking[];
  bookings: Booking[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  inquiryFilter: InquiryFilter;
  setInquiryFilter: (value: InquiryFilter) => void;
  onOpen: (booking: Booking) => void;
  onDelete: (bookingId: string) => Promise<void>;
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
  const priorityFilters = priorityInquiryFilterIds.map((id) => inquiryFilterById[id]).filter(Boolean);

  return (
    <section>
      <PageHeader
        title="Anfragen"
        text="Neue Kundenanfragen suchen, filtern und öffnen."
      />

      <div className="rounded-[1.65rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
        <div className="grid gap-3 xl:grid-cols-[minmax(280px,420px)_1fr] xl:items-start">
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
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {priorityFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setInquiryFilter(filter.id)}
                  data-event="region_select"
                  data-filter={filter.id}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-black transition",
                    inquiryFilter === filter.id
                      ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                  )}
                >
                  <span>{filter.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px]",
                      inquiryFilter === filter.id ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {filterCounts[filter.id] || 0}
                  </span>
                </button>
              ))}
            </div>

            <label className="mt-3 block sm:hidden">
              <span className="sr-only">Filter wählen</span>
              <select
                value={inquiryFilter}
                onChange={(event) => setInquiryFilter(event.target.value as InquiryFilter)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-300"
              >
                {priorityFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label} ({filterCounts[filter.id] || 0})
                  </option>
                ))}
              </select>
            </label>
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
          <BookingsTable bookings={bookings} onOpen={onOpen} onDelete={onDelete} />
        )}
      </div>
    </section>
  );
}

function BookingsTable({
  bookings,
  onOpen,
  onDelete,
}: {
  bookings: Booking[];
  onOpen: (booking: Booking) => void;
  onDelete: (bookingId: string) => Promise<void>;
}) {
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);
    setDeleteError(null);
    try {
      await onDelete(deleteTarget.id);
      setDeleteTarget(null);
    } catch (error: any) {
      setDeleteError(error?.message || "Anfrage konnte nicht gelöscht werden.");
    } finally {
      setDeleting(false);
    }
  }

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
                <BookingRow
                  key={booking.id}
                  booking={booking}
                  onOpen={() => onOpen(booking)}
                  onDelete={() => setDeleteTarget(booking)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {bookings.map((booking) => (
          <MobileBookingCard
            key={booking.id}
            booking={booking}
            onOpen={() => onOpen(booking)}
            onDelete={() => setDeleteTarget(booking)}
          />
        ))}
      </div>
      {deleteTarget ? (
        <DeleteBookingDialog
          saving={deleting}
          error={deleteError}
          onCancel={() => {
            if (!deleting) {
              setDeleteTarget(null);
              setDeleteError(null);
            }
          }}
          onConfirm={confirmDelete}
        />
      ) : null}
    </>
  );
}

function BookingRow({
  booking,
  onOpen,
  onDelete,
}: {
  booking: Booking;
  onOpen: () => void;
  onDelete: () => void;
}) {
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
        <div className="mt-1 max-w-[220px] truncate text-[11px] font-semibold text-blue-700">
          {getProcessLabel(booking)}
        </div>
        <div className="mt-1 max-w-[180px] truncate text-xs text-slate-500">{getMainLocation(booking)}</div>
        <RegionBadge booking={booking} />
        <LeadRevenueBadge booking={booking} compact />
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        {getCustomerBudget(booking) ? formatCurrency(getCustomerBudget(booking)) : "Noch keine Einschätzung"}
        <LeadSignalChips booking={booking} />
      </td>
      <td className="px-4 py-3">
        <LeadQualityBadge booking={booking} />
      </td>
      <td className="px-4 py-3">
        <StatusPill status={booking.status} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        <div>{formatDateTime(booking.timestamp)}</div>
        <div className="mt-1 text-xs font-semibold text-slate-400">{getLeadAgeLabel(booking.timestamp)}</div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">{getNextStep(booking)}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-slate-950 px-3 text-xs font-bold text-white transition hover:bg-blue-700"
            data-event="service_card_click"
            data-source="dashboard_lead_table"
          >
            Öffnen
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-bold text-red-700 transition hover:bg-red-100"
            data-event="service_card_click"
            data-source="dashboard_lead_table"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Löschen
          </button>
        </div>
      </td>
    </tr>
  );
}

function MobileBookingCard({
  booking,
  onOpen,
  onDelete,
}: {
  booking: Booking;
  onOpen: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-slate-950">{booking.name}</h3>
          <p className="mt-1 text-xs text-slate-500">{getServiceLabel(booking.service)} · {getSourceLabel(booking)}</p>
          <p className="mt-1 truncate text-[11px] font-semibold text-blue-700">{getProcessLabel(booking)}</p>
        </div>
        <StatusPill status={booking.status} />
      </div>
      <div className="mt-3 grid gap-2 text-sm text-slate-600">
        <MiniLine label="Budget" value={getCustomerBudget(booking) ? formatCurrency(getCustomerBudget(booking)) : "Noch keine Einschätzung"} />
        <LeadSignalChips booking={booking} />
        <MiniLine label="Prozess" value={getProcessLabel(booking)} />
        <MiniLine label="Ort" value={getMainLocation(booking)} />
        <MiniLine label="Alter" value={getLeadAgeLabel(booking.timestamp)} />
        <RegionBadge booking={booking} />
        <LeadRevenueBadge booking={booking} />
        <div>
          <p className="mb-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">Prüfung</p>
          <LeadQualityBadge booking={booking} />
        </div>
        <MiniLine label="Nächster Schritt" value={getNextStep(booking)} />
      </div>
      <CustomerQuickActions booking={booking} />
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white"
          data-event="service_card_click"
          data-source="dashboard_mobile_lead_card"
        >
          Öffnen
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-sm font-bold text-red-700"
          data-event="service_card_click"
          data-source="dashboard_mobile_lead_card"
        >
          <Trash2 className="h-4 w-4" />
          Löschen
        </button>
      </div>
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
            label="Zugang / Parken"
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
      <div className="mb-5 grid gap-3 md:grid-cols-4">
        <Metric label="Angebot fehlt" value={`${quoteMissingCount}`} />
        <Metric label="AB vorbereiten" value={`${orderActionCount}`} />
        <Metric label="Rechnung offen" value={`${invoiceOpenCount}`} />
        <a
          href="/dashboard/documents"
          className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-black text-blue-800 transition hover:border-blue-300 hover:bg-blue-100"
        >
          Neues Dokument ohne Anfrage
        </a>
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
                  href={`/api/pdf/${booking.id}?documentId=${doc.id}&download=1`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  PDF herunterladen
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  function requestDeleteBooking() {
    setError(null);
    setDeleteDialogOpen(true);
  }

  async function confirmDeleteBooking() {
    setSaving(true);
    setError(null);
    try {
      await onDelete(booking.id);
      setDeleteDialogOpen(false);
      onClose();
    } catch (deleteError: any) {
      setError(deleteError?.message || "Anfrage konnte nicht gelöscht werden.");
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
              <LeadRevenueBadge booking={booking} />
              <p className="mt-1 text-xs text-slate-500">
                {getServiceLabel(booking.service)} · {getSourceLabel(booking)} · {formatDateTime(booking.timestamp)} · {getLeadAgeLabel(booking.timestamp)}
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
              onDelete={requestDeleteBooking}
            />
          ) : null}
          {activeTab === "documents" ? (
            <DocumentsDetail booking={booking} saving={saving} onCreate={createDocument} />
          ) : null}
          {activeTab === "history" ? <HistoryDetail booking={booking} /> : null}
        </div>
      </aside>
      {deleteDialogOpen ? (
        <DeleteBookingDialog
          saving={saving}
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDeleteBooking}
        />
      ) : null}
    </div>
  );
}

function DeleteBookingDialog({
  saving,
  error,
  onCancel,
  onConfirm,
}: {
  saving: boolean;
  error?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/45 px-4" role="alertdialog" aria-modal="true" aria-labelledby="delete-booking-title" aria-describedby="delete-booking-text">
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-5 shadow-2xl shadow-slate-950/25">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 id="delete-booking-title" className="text-lg font-black tracking-tight text-slate-950">
              Anfrage wirklich löschen?
            </h3>
            <p id="delete-booking-text" className="mt-2 text-sm leading-6 text-slate-600">
              Diese Aktion entfernt die Anfrage aus dem Dashboard. Dieser Schritt kann nicht automatisch rückgängig gemacht werden.
            </p>
          </div>
        </div>
        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            {saving ? "Löschen..." : "Löschen"}
          </button>
        </div>
      </div>
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
    ["Angefragter Service", firstText([config.requestedService, config.serviceLabel, getServiceLabel(booking.service)])],
    ["Startpunkt", firstText([config.sourcePage, config.entryPoint, booking.details?.service?.entryPoint])],
    ["Größenordnung", firstText([config.areaRange, config.spaceRange, config.propertySizeRange])],
    ["Turnus/Anlass", firstText([config.cadence, config.recurringFrequency, config.cleaningFrequency])],
    ["Rolle", firstText([config.roleType])],
    ["Firma/Organisation", firstText([config.companyName])],
    ["Partnercode", firstText([config.partnerCode, config.referralCode])],
    ["Bonusstatus", firstText([config.bonusStatus])],
    ["Empfehlungsstatus", firstText([config.referralStatus])],
    ["Empfohlener Service", firstText([config.referredService])],
    ["Empfohlene Person", firstText([config.referredPersonName])],
    ["Einwilligung Dritter", firstText([config.referredPersonConsentConfirmed ? "bestaetigt" : ""])],
    ["Objektart", firstText([config.objectType])],
    ["Objektfall", firstText([config.objectCaseType])],
    ["Objektort", firstText([config.objectLocation])],
    ["B2B-Objektart", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.objectType]) : ""],
    ["B2B-Reinigung", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.cleaningType]) : ""],
    ["B2B-Frequenz", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.recurringFrequency]) : ""],
    ["B2B-Zeitfenster", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.timeWindow]) : ""],
    ["Starttermin", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.desiredStartDate]) : ""],
    ["Sanitärbereiche", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.sanitaryCount]) : ""],
    ["Küche/Pausenbereich", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.kitchenOrBreakroom]) : ""],
    ["Bodenart", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.floorType]) : ""],
    ["Regelrechnung", isDuesseldorfB2BCleaningLead(booking) ? firstText([config.regularInvoiceRequested]) : ""],
    ["Apartment-Reinigungsart", firstText([config.cleaningType])],
    ["Check-out", firstText([config.checkoutTime])],
    ["Naechster Check-in", firstText([config.nextCheckinTime])],
    ["Frequenz", firstText([config.recurringFrequency])],
    ["Waeschewechsel", firstText([config.laundryChangeRequested])],
    ["Schlüsselkoordination", firstText([config.keyCoordinationRequested])],
    ["Foto-Dokumentation", firstText([config.photoDocumentationRequested])],
    ["Inventarhinweis", firstText([config.inventoryNoteRequested])],
    ["Kleine Entsorgung", firstText([config.disposalSmallItemsRequested])],
    ["Baeder", firstText([config.bathroomsCount])],
    ["Kueche", firstText([config.kitchenPresent])],
    ["Moebliert", firstText([config.furnishedStatus])],
    ["Übergabetermin", firstText([config.handoverDate])],
    ["Mieterwechsel-Leistungen", Array.isArray(config.selectedServices) ? config.selectedServices.join(", ") : firstText([config.selectedServices])],
    ["Objektziel", firstText([config.goalType])],
    ["Objektstatus", firstText([config.objectStatus])],
    ["Nachlass-Status", firstText([config.estateStatus])],
    ["Beteiligte", firstText([config.involvedParties])],
    ["Diskreter Rückruf", firstText([config.callbackWanted ? "ja" : ""])],
    ["Sichere Kontaktmethode", firstText([config.safeContactMethod])],
    ["Rückrufzeitfenster", firstText([config.callbackTimeWindow])],
    ["Kontakt-Hinweis", getDashboardStringArray(config.contactRestrictions).join(", ")],
    ["Berechtigung bestaetigt", firstText([config.authorizationConfirmed ? "ja" : ""])],
    ["Diskret-Anfrageart", firstText([config.requestType])],
    ["Reinigung gewuenscht", firstText([config.cleaningRequested ? "ja" : ""])],
    ["Entsorgung gewuenscht", firstText([config.disposalRequested ? "ja" : ""])],
    ["Übergabeakte gewünscht", firstText([config.handoverFileRequested ? "ja" : ""])],
    ["Betroffene Fläche", firstText([config.areaType])],
    ["Problemstoffe", firstText([config.hazardousMaterialsStatus])],
    ["Freigabe", firstText([config.legalClearanceStatus])],
    ["Gegenstandsarten", Array.isArray(config.itemTypes) ? config.itemTypes.join(", ") : firstText([config.itemTypes])],
    ["Flächengröße", firstText([config.areaSize && `${config.areaSize} m2`])],
    ["Problemtyp", firstText([config.problemType])],
    ["Schadenslage", firstText([config.damageSituation])],
    ["Plan-B-Risiko", firstText([config.riskLevel])],
    ["Unsicherer Bereich", firstText([config.uncertainArea])],
    ["Plan-B-Paket", firstText([config.desiredPlanBPackage])],
    ["Bisheriger Anbieter", firstText([config.previousOfferSource])],
    ["Deadline", firstText([config.deadline])],
    ["Offene Punkte", Array.isArray(config.selectedOpenItems) ? config.selectedOpenItems.join(", ") : firstText([config.selectedOpenItems])],
    ["Besichtigungstermin", firstText([config.viewingDate])],
    ["Expose-Fototermin", firstText([config.exposePhotoDate])],
    ["Verkaufsfrist", firstText([config.saleDeadline])],
    ["Einheiten", firstText([config.unitsCount])],
    ["Dringlichkeit", firstText([config.urgency])],
    ["Aktenstatus", firstText([config.fileStatus])],
    ["Exportstatus", firstText([config.exportStatus])],
    ["Quellflow", firstText([config.sourceFlow])],
    ["Objektlabel", firstText([config.objectLabel])],
    ["Schlüsselstatus", firstText([config.keyStatus])],
    ["Schlüsseltermin", firstText([config.keyHandoverDate])],
    ["Schlüssel-Empfänger", firstText([config.keyHandoverRecipient])],
    ["Empfaenger Akte", firstText([config.recipientType])],
    ["Dokumentationsumfang", firstText([config.documentationScope])],
    ["Dossier-Bausteine", getDashboardStringArray(config.documentationScopeItems).join(", ")],
    ["Fotobereiche", getDashboardStringArray(config.photoSections).join(", ")],
    ["Offene Aktenpunkte", getDashboardStringArray(config.openItems).join(", ")],
    ["Raeume", firstText([config.roomsCount])],
    ["Etage/Zugang", firstText([config.floor, config.accessNotes])],
    ["Nebenraeume", Array.isArray(config.additionalSpaces) ? config.additionalSpaces.join(", ") : firstText([config.additionalSpaces])],
    ["Start", firstText([config.startLocation, config.startZip, config.fromAddress, config.startAddress, config.location, config.cityOrZip])],
    ["Ziel", firstText([config.destinationLocation, config.destinationZip, config.toAddress, config.targetAddress])],
    ["Termin", firstText([config.moveDate, config.date, config.desiredDate])],
    ["Flexibilitaet", firstText([config.dateFlexibility])],
    ["Anfrageart", firstText([config.requestType])],
    ["Umfang", firstText([config.itemDescription, config.items, config.scopeSummary])],
    ["Routenvolumen", firstText([config.estimatedVolume])],
    ["Routenetagen", firstText([config.startFloor && `${config.startFloor} / ${config.destinationFloor || 0}`])],
    ["Fläche", firstText([config.areaM2 && `${config.areaM2} m²`, config.cleaningAreaM2 && `${config.cleaningAreaM2} m²`])],
    ["Volumen", firstText([config.estimatedVolumeM3 && `${config.estimatedVolumeM3} m³`, config.cbm && `${config.cbm} m³`])],
    ["Etagen", firstText([config.fromFloor && `${config.fromFloor} / ${config.toFloor || 0}`])],
    ["Budget", getCustomerBudget(booking) ? formatCurrency(getCustomerBudget(booking)) : "Nicht angegeben"],
    ["Plattform-Situation", firstText([config.platformSituation])],
    ["Plattform optional", firstText([config.platformType])],
    ["Angebotspreis", firstText([config.quotedPrice && formatCurrency(config.quotedPrice), config.quotedPriceText])],
    ["Anbieter/Plattform", firstText([config.offerSourceType])],
    ["Scanner-Level", firstText([config.scannerScoreLabel, config.scannerScoreLevel])],
    ["Scanner-Punkte", firstText([config.scannerScoreValue])],
    ["Offene Kategorien", getDashboardStringArray(config.redFlagCategories).join(", ")],
    ["Red-Flag-Punkte", getDashboardStringArray(config.redFlagItems).slice(0, 5).join(", ")],
    ["Zusatzleistungen", Array.isArray(config.selectedAddons) ? config.selectedAddons.join(", ") : firstText([config.selectedAddons])],
    [
      "Anhänge",
      booking.file_urls.length
        ? `${booking.file_urls.length} Datei(en)`
        : hasOfferCheckUpload(booking)
          ? `${Number(config.offerUploadCount || 0) + Number(config.photoUploadCount || 0)} ${
              isHandoverFileLead(booking)
                ? "Übergabeakte-Foto(s)"
                : isPlatformOrderLead(booking)
                  ? "Plattform-Auftrag-Datei(en)"
                : isPropertyReadyLead(booking)
                  ? "Immobilie-verkaufsbereit-Foto(s)"
                : isEstateClearanceLead(booking)
                  ? "Nachlass-Foto(s)"
                : isDiscreetMoveLead(booking)
                  ? "Diskret-Foto(s)"
                : isDuesseldorfB2BCleaningLead(booking)
                  ? "B2B-Reinigung-Foto(s)"
                : isDuesseldorfApartmentCleaningLead(booking)
                  ? "Apartment-Reinigung-Foto(s)"
                : isRealtorLandlordLinkLead(booking)
                  ? "Objektfall-Foto(s)"
                : isCellarTrashroomLead(booking)
                  ? "Keller-/Muellraum-Foto(s)"
                : isPlanBServiceLead(booking)
                  ? "Plan-B-Datei(en)"
                : isDamageControlLead(booking)
                  ? "Schadensbegrenzung-Datei(en)"
                : isRentalReadyLead(booking)
                  ? "Objekt-Ready-Foto(s)"
                : isTenantTurnoverLead(booking)
                  ? "Mieterwechsel-Foto(s)"
                  : "Angebotscheck-Datei(en)"
            }`
        : hasPhotoSignal(booking)
          ? "Fotos per WhatsApp angeboten"
          : "Keine Anhänge",
    ],
    ["Prozess", getProcessLabel(booking)],
    ["Lead-Quelle", firstText([config.leadSource, booking.details?.metadata?.clientContext?.leadSource, booking.details?.service?.source])],
    ["Source-Komponente", firstText([config.sourceComponent, booking.details?.metadata?.clientContext?.sourceComponent])],
    ["Source-Kontext", firstText([config.sourceContext, booking.details?.metadata?.clientContext?.sourceContext])],
    ["Journey", firstText([config.conversionJourneyId, config.conversionJourney?.journeyId, booking.details?.metadata?.conversionJourney?.journeyId, booking.details?.metadata?.clientContext?.conversionJourneyId])],
    ["Letztes Hinweis", firstText([config.conversionLastEvent, config.conversionJourney?.lastEventName, booking.details?.metadata?.conversionJourney?.lastEventName, booking.details?.metadata?.clientContext?.conversionLastEvent])],
    ["Quellseite", firstText([config.sourcePage, booking.details?.metadata?.clientContext?.sourcePage])],
    ["Landingpage", firstText([config.landingPage, booking.details?.metadata?.clientContext?.landingPage, booking.details?.service?.entryPoint])],
    [
      "UTM",
      firstText([
        [config.utmSource, config.utmMedium, config.utmCampaign, config.utmContent].filter(Boolean).join(" / "),
        [
          booking.details?.metadata?.clientContext?.utmSource,
          booking.details?.metadata?.clientContext?.utmMedium,
          booking.details?.metadata?.clientContext?.utmCampaign,
          booking.details?.metadata?.clientContext?.utmContent,
        ]
          .filter(Boolean)
          .join(" / "),
      ]),
    ],
  ];

  return rows
    .map(([label, value]) => ({ label, value }))
    .filter((row) => row.value && row.value !== "Nicht angegeben")
    .slice(0, 18);
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

function HandoverDossierBuilder({ booking }: { booking: Booking }) {
  const config = booking.details?.configuration || {};
  const dossierStatus = firstText([config.fileStatus, booking.status], "Nicht gestartet");
  const exportStatus = firstText([config.exportStatus], "Nicht vorbereitet");
  const documentationItems = getDashboardStringArray(config.documentationScopeItems);
  const photoSections = getDashboardStringArray(config.photoSections);
  const openItems = getDashboardStringArray(config.openItems);
  const services = Array.isArray(config.selectedServices) ? config.selectedServices.join(", ") : firstText([config.selectedServices]);

  return (
    <Panel title="Übergabeakte-Builder" subtitle="Interne Dossier-Struktur für Objekt, Leistungen, Fotos, Schlüssel und Hinweise.">
      <div data-event="service_card_click" className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">Aktenstatus</p>
            <p className="mt-1 text-sm font-black text-amber-950">{formatStatus(dossierStatus)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Export</p>
            <p className="mt-1 text-sm font-black text-slate-900">{formatStatus(exportStatus)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Fotos</p>
            <p className="mt-1 text-sm font-black text-slate-900">{hasPhotoSignal(booking) ? "Vorhanden" : "Fehlen/unklar"}</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <PlanningCard title="Objekt" items={[
            ["Label", firstText([config.objectLabel, config.objectLocation, config.objectType])],
            ["Ort/PLZ", firstText([config.objectLocation, config.cityOrZip, config.location])],
            ["Etage/Zugang", firstText([config.floor, config.accessNotes])],
          ]} />
          <PlanningCard title="Leistungen" items={[
            ["Services", services],
            ["Datum", firstText([config.serviceDate, config.desiredDate, config.handoverDate])],
            ["Notiz", firstText([config.serviceNotes, config.customerMessage])],
          ]} />
          <PlanningCard title="Fotos" items={[
            ["Aktiv", firstText([config.photosEnabled, config.photoDocumentationEnabled ? "ja" : ""])],
            ["Bereiche", photoSections.join(", ") || "Noch nicht festgelegt"],
            ["Fotohinweis", firstText([config.photoNotes])],
          ]} />
          <PlanningCard title="Schlüssel & Hinweise" items={[
            ["Status", firstText([config.keyStatus])],
            ["Empfaenger", firstText([config.keyHandoverRecipient, config.recipientType])],
            ["Offene Punkte", openItems.join(", ") || firstText([config.visibleNotes, config.publicNotes])],
          ]} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Dossier-Bausteine</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {documentationItems.length ? documentationItems.join(", ") : "Noch kein Dokumentationsumfang ausgewaehlt."}
          </p>
          <p className="mt-3 text-xs leading-6 text-slate-500">
            Export ist vorbereitet, aber nicht als oeffentliche Route gebaut. PDF/HTML-Ausgabe sollte spaeter nur geschuetzt im Dashboard erfolgen.
          </p>
          <button
            type="button"
            disabled
            data-event="service_card_click"
            className="mt-3 inline-flex h-9 cursor-not-allowed items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-400"
          >
            Export spaeter geschuetzt ergaenzen
          </button>
        </div>
      </div>
    </Panel>
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
    <div className="grid gap-4">
      {isHandoverFileLead(booking) ? <HandoverDossierBuilder booking={booking} /> : null}

      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
      <div className="grid gap-4 md:grid-cols-2">
        <PlanningCard title="Termin" items={[
          ["Datum", firstText([workOrder.scheduledDate, config.moveDate, config.date, config.desiredDate])],
          ["Zeitfenster", firstText([workOrder.timeWindow, config.timeWindow, config.dateFlexibility])],
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
          ["Start", firstText([workOrder.fromAddress, config.startLocation, config.fromAddress, config.location])],
          ["Ziel", firstText([workOrder.toAddress, config.destinationLocation, config.toAddress, config.targetAddress])],
          ["Zugang", firstText([workOrder.accessNotes, config.accessNotes])],
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
              data-source="dashboard_lead_detail"
            >
              {STATUS_OPTIONS.some((item) => item.value === status) ? null : (
                <option value={status}>{formatStatus(status)}</option>
              )}
              {STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
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
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            Anfrage löschen
          </button>
        </div>
      </Panel>
      </div>
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
                        href={`/api/pdf/${booking.id}?documentId=${doc.id}&download=1`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700"
                      >
                        PDF herunterladen
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
          hasPhotoSignal(booking) ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
              Der Kunde hat angeboten, Fotos oder kurze Videos per WhatsApp zu senden. Beim
              Nachfassen direkt Bilder von Zugang, Zustand, Menge oder Fläche anfordern.
            </div>
          ) : (
            <EmptyState text="Keine Anhänge vorhanden." />
          )
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
          data-event="phone_click"
          data-source="dashboard_quick_action"
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
          data-event="whatsapp_click"
          data-source="dashboard_quick_action"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      ) : null}
      {emailUrl ? (
        <a
          href={emailUrl}
          className={cn(baseClass, "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")}
          data-event="hero_cta_click"
          data-source="dashboard_quick_action"
        >
          <Mail className="h-3.5 w-3.5" />
          E-Mail
        </a>
      ) : null}
    </div>
  );
}

function LeadSignalChips({ booking }: { booking: Booking }) {
  const signals = [
    hasBudget(booking)
      ? {
          label: "Budget",
          className: "border-blue-200 bg-blue-50 text-blue-700",
        }
      : null,
    hasPhotoSignal(booking)
      ? {
          label: booking.file_urls.length ? "Fotos da" : "Fotos möglich",
          className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        }
      : null,
  ].filter(Boolean) as Array<{ label: string; className: string }>;

  if (!signals.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {signals.map((signal) => (
        <span
          key={signal.label}
          className={cn(
            "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em]",
            signal.className,
          )}
        >
          {signal.label}
        </span>
      ))}
    </div>
  );
}

function LeadRevenueBadge({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
  const revenue = getLeadRevenueScore(booking);
  const toneMap: Record<LeadPriority, string> = {
    high: "border-emerald-200 bg-emerald-50 text-emerald-700",
    medium: "border-blue-200 bg-blue-50 text-blue-700",
    low: "border-slate-200 bg-slate-50 text-slate-600",
  };
  const label =
    revenue.priority === "high"
      ? "High"
      : revenue.priority === "medium"
        ? "Medium"
        : "Low";

  return (
    <div className="mt-2 max-w-[220px]">
      <span
        className={cn(
          "inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em]",
          toneMap[revenue.priority],
        )}
        title={revenue.reasons.join(", ")}
      >
        Score {revenue.score} - {label}
      </span>
      {!compact ? (
        <p className="mt-1 text-xs leading-snug text-slate-500">
          {revenue.source}
          {revenue.reasons.length ? ` - ${revenue.reasons.slice(0, 2).join(", ")}` : ""}
        </p>
      ) : null}
    </div>
  );
}

function LeadQualityBadge({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
  const quality = getLeadQuality(booking);
  const storedLeadQuality = getStoredLeadQuality(booking);
  const toneMap: Record<LeadQualityTone, string> = {
    ready: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "needs-info": "border-amber-200 bg-amber-50 text-amber-700",
    thin: "border-red-200 bg-red-50 text-red-700",
  };
  const missingText = quality.missing.length
    ? `Fehlt: ${quality.missing.slice(0, 3).join(", ")}${quality.missing.length > 3 ? " ..." : ""}`
    : "Kerninfos vorhanden";
  const storedPriorityText = storedLeadQuality?.priority
    ? `Lead: ${String(storedLeadQuality.priority).toUpperCase()} - Score ${storedLeadQuality.score ?? "-"}`
    : "";

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
        <p className="mt-1 text-xs leading-snug text-slate-500">{storedPriorityText || missingText}</p>
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

function RegionBadge({ booking }: { booking: Booking }) {
  const label = getRegionLabel(booking);
  const tone = isDuesseldorfDisposalLead(booking)
    ? "border-orange-200 bg-orange-50 text-orange-700"
    : isDuesseldorfCleaningLead(booking)
      ? "border-teal-200 bg-teal-50 text-teal-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <span className={cn("mt-2 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em]", tone)}>
      {label}
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
