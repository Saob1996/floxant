"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import {
  Banknote,
  Briefcase,
  Calculator,
  ClipboardList,
  Clock,
  Crown,
  FileCheck2,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  PauseCircle,
  PlusCircle,
  Route,
  Search,
  Settings2,
  Sparkles,
  Truck,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

import { BookingDetailView } from "@/components/dashboard/BookingDetailView";
import { DocumentChainTracker } from "@/components/dashboard/documents/DocumentChainTracker";
import { DocumentManager } from "@/components/dashboard/documents/DocumentManager";
import { InternalPricingWorkbench } from "@/components/dashboard/InternalPricingWorkbench";
import { OperationsControlPanel } from "@/components/dashboard/OperationsControlPanel";
import { GalleryModal } from "@/components/GalleryModal";
import { PremiumButton } from "@/components/ui/PremiumButton";
import type { BackhaulOffer } from "@/lib/backhaul-offers";
import {
  DEFAULT_DESIRED_MARGIN_PERCENT,
  DEFAULT_VAT_RATE,
  PRICING_DEFAULTS,
} from "@/lib/pricing/pricing-config";
import { germanizeDeep, germanizeText } from "@/lib/german-text";
import type { IntakePayload } from "@/lib/types/intake";
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

type InquiryFocus =
  | null
  | "new"
  | "pricing"
  | "budget"
  | "price_ready"
  | "docs"
  | "operations"
  | "channel_booking"
  | "channel_b2b"
  | "channel_luxury"
  | "channel_backhaul";

type WorkspaceTab =
  | "overview"
  | "inbox"
  | "price-review"
  | "internal-costs"
  | "planning"
  | "documents"
  | "return-trips"
  | "b2b-cleaning"
  | "follow-up"
  | "settings";

type DetailTab = "overview" | "documents" | "work_order" | "costs" | "decision" | "ledger";

const WORKSPACE_TABS: WorkspaceTab[] = [
  "overview",
  "inbox",
  "price-review",
  "internal-costs",
  "planning",
  "documents",
  "return-trips",
  "b2b-cleaning",
  "follow-up",
  "settings",
];

const initialBackhaulForm: Partial<BackhaulOffer> = {
  title: "Leer-Rueckfahrt fuer Firmen und Privatkunden Richtung Regensburg",
  date: "",
  timeWindow: "nach Absprache",
  origin: "Deutschlandweit auf Anfrage",
  destination: "Regensburg",
  destinationRadius: "ca. 150 km um Regensburg",
  routeAreas: ["Nuernberg", "Muenchen", "Ingolstadt", "Landshut"],
  vehicleType: "Transporter oder LKW nach Tour",
  availableCapacity: "Bueroinventar, Moebel, Kartons, Paletten oder Einzelstuecke",
  priceHint: "fairer Rueckfahrt-Preis nach Route und Volumen",
  fairPriceNote:
    "Wenn Route, Datum und Ladepunkte zur ohnehin geplanten Rueckfahrt passen, kann FLOXANT freie Fahrzeugkapazitaet fair anbieten. Sinnvolle Stopps unterwegs werden mit transparentem Umwegpreis geprueft.",
  status: "active",
  adminNote: "",
};

function isWorkspaceTab(value: string | null): value is WorkspaceTab {
  return Boolean(value && WORKSPACE_TABS.includes(value as WorkspaceTab));
}

function toSafeNumber(value: unknown) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function formatCurrency(amount?: number | null) {
  if (amount === null || amount === undefined || !Number.isFinite(amount)) {
    return "Nicht angegeben";
  }

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function normalizeBooking(raw: any): Booking {
  const timestamp =
    typeof raw?.timestamp === "string" && raw.timestamp.trim()
      ? raw.timestamp
      : new Date().toISOString();
  const details = raw?.details && typeof raw.details === "object" ? raw.details : {};
  const service = details.service && typeof details.service === "object" ? details.service : {};
  const valuation =
    details.valuation && typeof details.valuation === "object" ? details.valuation : {};
  const configuration =
    details.configuration && typeof details.configuration === "object"
      ? details.configuration
      : {};
  const admin = details.admin && typeof details.admin === "object" ? details.admin : {};
  const metadata =
    details.metadata && typeof details.metadata === "object" ? details.metadata : {};
  const clientContext =
    metadata.clientContext && typeof metadata.clientContext === "object"
      ? metadata.clientContext
      : {};
  const contact = details.contact && typeof details.contact === "object" ? details.contact : {};

  return {
    id: String(raw?.id ?? `booking-${Date.now()}`),
    service: String(raw?.service ?? service.type ?? "umzug"),
    name: germanizeText(String(raw?.name ?? contact.fullName ?? "Unbekannt")),
    email: String(raw?.email ?? contact.email ?? ""),
    phone: String(raw?.phone ?? contact.phone ?? ""),
    timestamp,
    status: String(raw?.status ?? "new"),
    notes: germanizeText(String(raw?.notes ?? "")),
    upgrades: Array.isArray(raw?.upgrades)
      ? raw.upgrades.filter(Boolean).map(String)
      : [],
    file_urls: Array.isArray(raw?.file_urls)
      ? raw.file_urls.filter(Boolean).map(String)
      : typeof raw?.file_url === "string" && raw.file_url
        ? [raw.file_url]
        : [],
    file_url: typeof raw?.file_url === "string" ? raw.file_url : "",
    details: germanizeDeep({
      contact: {
        fullName: String(contact.fullName ?? raw?.name ?? ""),
        email: String(contact.email ?? raw?.email ?? ""),
        phone: String(contact.phone ?? raw?.phone ?? ""),
        callbackPreference: String(contact.callbackPreference ?? ""),
        notes: typeof contact.notes === "string" ? contact.notes : "",
      },
      service: {
        type: String(service.type ?? raw?.service ?? "umzug"),
        source: String(service.source ?? metadata.source ?? ""),
        entryPoint:
          typeof service.entryPoint === "string"
            ? service.entryPoint
            : typeof clientContext.entryPoint === "string"
              ? clientContext.entryPoint
              : "",
        presetFromUrl:
          typeof service.presetFromUrl === "string" ? service.presetFromUrl : undefined,
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
        valuationLabel: String(valuation.valuationLabel ?? ""),
        valuationStage: String(valuation.valuationStage ?? "Vorpruefung"),
        accuracyState: String(valuation.accuracyState ?? ""),
        topDrivers: Array.isArray(valuation.topDrivers)
          ? valuation.topDrivers.filter(Boolean).map(String)
          : [],
        customerBudget:
          valuation.customerBudget === null || valuation.customerBudget === undefined
            ? null
            : toSafeNumber(valuation.customerBudget),
        priceSuggestion:
          valuation.priceSuggestion === null || valuation.priceSuggestion === undefined
            ? null
            : toSafeNumber(valuation.priceSuggestion),
        priceExplanation:
          typeof valuation.priceExplanation === "string" ? valuation.priceExplanation : "",
        pricingSignals:
          valuation.pricingSignals && typeof valuation.pricingSignals === "object"
            ? valuation.pricingSignals
            : {},
      },
      configuration,
      admin: {
        internalNotes: typeof admin.internalNotes === "string" ? admin.internalNotes : "",
        nextAction: typeof admin.nextAction === "string" ? admin.nextAction : "",
        updatedAt: typeof admin.updatedAt === "string" ? admin.updatedAt : "",
        updatedBy: typeof admin.updatedBy === "string" ? admin.updatedBy : "",
        docs: Array.isArray(admin.docs) ? admin.docs : [],
        workOrder:
          admin.workOrder && typeof admin.workOrder === "object"
            ? admin.workOrder
            : undefined,
        costLines: Array.isArray(admin.costLines) ? admin.costLines : [],
        ledgerEntries: Array.isArray(admin.ledgerEntries) ? admin.ledgerEntries : [],
        commercialDecision:
          admin.commercialDecision && typeof admin.commercialDecision === "object"
            ? admin.commercialDecision
            : undefined,
        profitability:
          admin.profitability && typeof admin.profitability === "object"
            ? admin.profitability
            : undefined,
        history: Array.isArray(admin.history) ? admin.history : [],
      },
      metadata: {
        createdAt:
          typeof metadata.createdAt === "string" && metadata.createdAt
            ? metadata.createdAt
            : timestamp,
        intakeVersion:
          typeof metadata.intakeVersion === "string" && metadata.intakeVersion
            ? metadata.intakeVersion
            : "legacy",
        source: typeof metadata.source === "string" ? metadata.source : String(service.source ?? ""),
        servicePresetFromUrl:
          typeof metadata.servicePresetFromUrl === "string"
            ? metadata.servicePresetFromUrl
            : undefined,
        clientContext,
      },
    }),
  };
}

function formatStatus(status: string) {
  if (!status) return "Unbekannt";
  if (status === "new") return "Neu";
  return status.replace(/_/g, " ");
}

function getStatusTone(status: string) {
  if (status === "new") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "in_bearbeitung") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "angebot_versendet") return "border-cyan-200 bg-cyan-50 text-cyan-700";
  if (status === "abgeschlossen") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  return "border-slate-200 bg-slate-100 text-slate-600";
}

function formatMoneyRange(booking: Booking) {
  const valuation = booking.details.valuation;
  if (!valuation.systemPriceRangeMin || !valuation.systemPriceRangeMax) {
    return germanizeText("Noch keine Einschaetzung");
  }
  return `${formatCurrency(valuation.systemPriceRangeMin)} bis ${formatCurrency(valuation.systemPriceRangeMax)}`;
}

function serviceMatchesFilter(service: string, filterService: string | null) {
  if (!filterService) return true;
  if (filterService === "private_client") {
    return service === "private_client" || service === "villenservice";
  }
  return service === filterService;
}
function getServiceDisplay(service: string) {
  const normalized = service === "villenservice" ? "private_client" : service;
  const fallback = {
    label: service.replace(/_/g, " "),
    Icon: Briefcase,
    railClass: "bg-slate-400",
    iconClass: "bg-slate-100 text-slate-700",
  };

  const displays: Record<string, typeof fallback> = {
    umzug: {
      label: "Umzug",
      Icon: Briefcase,
      railClass: "bg-blue-500",
      iconClass: "bg-blue-100 text-blue-700",
    },
    reinigung: {
      label: "Reinigung",
      Icon: Sparkles,
      railClass: "bg-cyan-500",
      iconClass: "bg-cyan-100 text-cyan-700",
    },
    entsorgung: {
      label: "Entruempelung",
      Icon: Truck,
      railClass: "bg-orange-500",
      iconClass: "bg-orange-100 text-orange-700",
    },
    bueroumzug: {
      label: "Bueroumzug",
      Icon: Briefcase,
      railClass: "bg-sky-500",
      iconClass: "bg-sky-100 text-sky-700",
    },
    leerfahrt: {
      label: "Leer-Rueckfahrt",
      Icon: Truck,
      railClass: "bg-emerald-500",
      iconClass: "bg-emerald-100 text-emerald-700",
    },
    firmenentsorgung: {
      label: "Firmenentsorgung",
      Icon: Truck,
      railClass: "bg-teal-500",
      iconClass: "bg-teal-100 text-teal-700",
    },
    private_client: {
      label: "Private Client",
      Icon: Crown,
      railClass: "bg-amber-400",
      iconClass: "bg-amber-50 text-amber-700",
    },
  };

  return displays[normalized] || fallback;
}

function getMainLocation(booking: Booking) {
  return (
    booking.details.configuration.fromAddress ||
    booking.details.configuration.location ||
    "Unbekannt"
  );
}
function getBookingSourceMeta(booking: Booking) {
  const source =
    booking.details.service.source ||
    booking.details.metadata.source ||
    (typeof booking.details.configuration.requestContext === "string"
      ? booking.details.configuration.requestContext
      : "") ||
    (typeof (booking.details.configuration as any).source === "string"
      ? (booking.details.configuration as any).source
      : "") ||
    (typeof (booking.details as any).source === "string"
      ? (booking.details as any).source
      : "");

  const entryPoint =
    booking.details.service.entryPoint ||
    (typeof booking.details.configuration.entryPoint === "string"
      ? booking.details.configuration.entryPoint
      : "") ||
    (typeof booking.details.metadata.clientContext.entryPoint === "string"
      ? booking.details.metadata.clientContext.entryPoint
      : "");

  const sourceMap: Record<string, string> = {
    booking_page_wizard: "Buchungssystem",
    budget_contact_form: "Preisvorschlag",
    quick_express_modal: "Express-Check",
    gewerbereinigung_regensburg: "Gewerbereinigung B2B",
    private_client_page: "Private Client",
    business_disposal_page: "Firmenentsorgung",
    backhaul_page: "Leer-Rueckfahrt",
    quick_express: "Express-Check",
    booking_wizard: "Buchungssystem",
    dashboard: "Dashboard",
    nav_pinned_button: "Navigation",
  };

  return {
    label: sourceMap[source] || "Direkte Anfrage",
    source,
    entryPoint: entryPoint || "Nicht hinterlegt",
  };
}
const inquiryFocusLabelMap: Record<Exclude<InquiryFocus, null>, string> = {
  new: "Neue Kundenanfragen",
  pricing: "Budget oder Preisrahmen sichtbar",
  budget: "Mit Budgetangabe",
  price_ready: "Preispruefung bereit",
  docs: "Dokumente im System",
  operations: "Interne Kalkulation gepflegt",
  channel_booking: "Buchungsanfragen",
  channel_b2b: "Gewerbliche Reinigungsanfragen buendeln",
  channel_luxury: "Nachfassen",
  channel_backhaul: "Leer-Rueckfahrt",
};

const dashboardNavigation: Array<{
  id: WorkspaceTab;
  label: string;
  shortLabel: string;
}> = [
  { id: "overview", label: "Ueberblick", shortLabel: "Ueberblick" },
  { id: "inbox", label: "Eingaenge", shortLabel: "Eingaenge" },
  { id: "price-review", label: "Preispruefung", shortLabel: "Preispruefung" },
  { id: "internal-costs", label: "Interne Kosten", shortLabel: "Kosten" },
  { id: "planning", label: "Auftragsplanung", shortLabel: "Planung" },
  { id: "documents", label: "Dokumente", shortLabel: "Dokumente" },
  { id: "return-trips", label: "Leer-Rueckfahrten", shortLabel: "Rueckfahrten" },
  { id: "b2b-cleaning", label: "B2B-Reinigung", shortLabel: "B2B" },
  { id: "follow-up", label: "Nachfassen", shortLabel: "Nachfassen" },
  { id: "settings", label: "Einstellungen", shortLabel: "Einstellungen" },
];

const workspaceMeta: Record<
  WorkspaceTab,
  { label: string; title: string; description: string; icon: typeof LayoutDashboard }
> = {
  overview: {
    label: "Ueberblick",
    title: "Tagesstatus und schnelle Entscheidungen",
    description:
      "Offene Vorgaenge, Preispruefungen, Rueckfahrten, fehlende Dokumente und kritische Aufgaben sofort im Blick.",
    icon: LayoutDashboard,
  },
  inbox: {
    label: "Eingaenge",
    title: "Eingaenge",
    description:
      "Neue Kundenanfragen, Budgetangaben, Herkunft und schnelle Ersteinschaetzung sauber an einem Ort.",
    icon: Inbox,
  },
  "price-review": {
    label: "Preispruefung",
    title: "Preispruefung",
    description:
      "Ampelbewertung, Kostentreiber, Mindestpreis, Zielpreis und Empfehlung sichtbar vergleichen.",
    icon: WalletCards,
  },
  "internal-costs": {
    label: "Interne Kosten",
    title: "Interne Kosten",
    description:
      "Freie interne Kalkulation fuer Telefon, Vor-Ort-Termin oder wirtschaftliche Vorpruefung ohne Kundensicht.",
    icon: Calculator,
  },
  planning: {
    label: "Auftragsplanung",
    title: "Team, Fahrzeuge, Zeiten und Extras planen",
    description:
      "Mitarbeiter, Fahrzeuge, Etagen, Aufzug, Laufweg, schwere Gegenstaende und Hinweise fuer die Durchfuehrung buendeln.",
    icon: ClipboardList,
  },
  documents: {
    label: "Dokumente",
    title: "Dokumente",
    description:
      "Angebot, Auftragsbestaetigung, Rechnung und Dateien getrennt von Kalkulation und Preispruefung verwalten.",
    icon: FileText,
  },
  "return-trips": {
    label: "Leer-Rueckfahrten",
    title: "Leer-Rueckfahrten",
    description:
      "Aktive Rueckfahrten, freie m3, Datum, Route und Veroeffentlichung auf der Website sauber pflegen.",
    icon: Truck,
  },
  "b2b-cleaning": {
    label: "B2B-Reinigung",
    title: "Gewerbliche Reinigungsanfragen buendeln",
    description:
      "Objektart, Flaeche, Intervall, Ansprechpartner und monatlichen Zielpreis fuer B2B-Reinigung im Blick behalten.",
    icon: Sparkles,
  },
  "follow-up": {
    label: "Nachfassen",
    title: "Nachfassen",
    description:
      "Angebote ohne Antwort, offene Bestaetigungen, Rechnungsstatus und Bewertungsanfragen sauber nachverfolgen.",
    icon: Clock,
  },
  settings: {
    label: "Einstellungen",
    title: "Kostenannahmen und Systemwerte pflegen",
    description:
      "Stundenlohn, Fahrzeugkosten, Diesel, Risikopuffer, MwSt. und Mindestmarge als interne Stammdaten sichtbar halten.",
    icon: Settings2,
  },
};

export default function DashboardClient({ dict }: DashboardClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState<string | null>(null);
  const [inquiryFocus, setInquiryFocus] = useState<InquiryFocus>(null);
  const [workspace, setWorkspace] = useState<WorkspaceTab>("overview");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDetailTab, setSelectedDetailTab] = useState<DetailTab>("overview");
  const [selectedReviewBookingId, setSelectedReviewBookingId] = useState<string | null>(null);
  const [selectedPlanningBookingId, setSelectedPlanningBookingId] = useState<string | null>(null);
  const [selectedDocumentsBookingId, setSelectedDocumentsBookingId] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [backhaulOffers, setBackhaulOffers] = useState<BackhaulOffer[]>([]);
  const [backhaulForm, setBackhaulForm] =
    useState<Partial<BackhaulOffer>>(initialBackhaulForm);
  const [savingBackhaul, setSavingBackhaul] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const t = dict.dashboard;
  const tAuth = dict.auth;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data.map(normalizeBooking) : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    fetch("/api/backhauls?all=1")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setBackhaulOffers(data);
      })
      .catch((error) => console.error("Backhaul offer fetch failed:", error));
  }, [status]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const nextTab = isWorkspaceTab(tab) ? tab : "overview";
    if (workspace !== nextTab) {
      setWorkspace(nextTab);
    }
  }, [searchParams, workspace]);

  useEffect(() => {
    if (!mobileNavOpen) return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [mobileNavOpen]);

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => {
        const needle = searchTerm.toLowerCase();
        const matchesSearch =
          !needle ||
          booking.name.toLowerCase().includes(needle) ||
          booking.email.toLowerCase().includes(needle) ||
          booking.phone.toLowerCase().includes(needle);

        const hasPriceRange =
          Boolean(booking.details.valuation.systemPriceRangeMin) &&
          Boolean(booking.details.valuation.systemPriceRangeMax);
        const hasBudget = Boolean(booking.details.valuation.customerBudget);
        const hasDocs = Boolean(booking.details.admin?.docs?.length);
        const hasOperations =
          Boolean(booking.details.admin?.workOrder) ||
          Boolean(booking.details.admin?.costLines?.length) ||
          Boolean(booking.details.admin?.ledgerEntries?.length) ||
          Boolean(booking.details.admin?.commercialDecision);
        const isNew =
          Date.now() - new Date(booking.timestamp).getTime() <
          24 * 60 * 60 * 1000;
        const sourceLabel = getBookingSourceMeta(booking).label;

        const matchesFocus =
          !inquiryFocus ||
          (inquiryFocus === "new" && isNew) ||
          (inquiryFocus === "pricing" && (hasBudget || hasPriceRange)) ||
          (inquiryFocus === "budget" && hasBudget) ||
          (inquiryFocus === "price_ready" && hasPriceRange) ||
          (inquiryFocus === "docs" && hasDocs) ||
          (inquiryFocus === "operations" && hasOperations) ||
          (inquiryFocus === "channel_booking" && sourceLabel === "Buchungssystem") ||
          (inquiryFocus === "channel_b2b" &&
            sourceLabel === "Gewerbereinigung B2B") ||
          (inquiryFocus === "channel_luxury" && sourceLabel === "Private Client") ||
          (inquiryFocus === "channel_backhaul" &&
            sourceLabel === "Leer-Rueckfahrt");

        return (
          matchesSearch &&
          serviceMatchesFilter(booking.service, filterService) &&
          matchesFocus
        );
      })
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
  }, [bookings, filterService, inquiryFocus, searchTerm]);

  const recentBookings = useMemo(() => bookings.slice().sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  ).slice(0, 6), [bookings]);

  const docsBookings = useMemo(
    () =>
      bookings
        .filter((booking) => (booking.details.admin?.docs?.length || 0) > 0)
        .sort(
          (a, b) =>
            (b.details.admin?.docs?.length || 0) - (a.details.admin?.docs?.length || 0),
        ),
    [bookings],
  );

  const priceReviewBookings = useMemo(
    () =>
      bookings
        .filter(
          (booking) =>
            Boolean(booking.details.valuation.customerBudget) ||
            (Boolean(booking.details.valuation.systemPriceRangeMin) &&
              Boolean(booking.details.valuation.systemPriceRangeMax)),
        )
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        ),
    [bookings],
  );

  const b2bBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => getBookingSourceMeta(booking).label === "Gewerbereinigung B2B",
      ),
    [bookings],
  );

  const premiumBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const source = getBookingSourceMeta(booking).label;
        return source === "Private Client" || serviceMatchesFilter(booking.service, "private_client");
      }),
    [bookings],
  );

  const planningBookings = useMemo(
    () =>
      bookings
        .slice()
        .sort((a, b) => {
          const aHasWorkOrder = a.details.admin?.workOrder ? 1 : 0;
          const bHasWorkOrder = b.details.admin?.workOrder ? 1 : 0;
          if (aHasWorkOrder !== bHasWorkOrder) return bHasWorkOrder - aHasWorkOrder;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }),
    [bookings],
  );

  const followUpBookings = useMemo(
    () =>
      bookings
        .filter((booking) => {
          const docs = booking.details.admin?.docs || [];
          const hasSentDocument = docs.some((doc) => ["approved", "sent"].includes(doc.status));
          const pendingStatus = ["new", "in_bearbeitung", "angebot_versendet"].includes(
            booking.status,
          );
          const olderThanOneDay =
            Date.now() - new Date(booking.timestamp).getTime() > 24 * 60 * 60 * 1000;
          return hasSentDocument || (pendingStatus && olderThanOneDay);
        })
        .sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        ),
    [bookings],
  );

  const selectedReviewBooking = useMemo(
    () =>
      priceReviewBookings.find((booking) => booking.id === selectedReviewBookingId) ||
      priceReviewBookings[0] ||
      null,
    [priceReviewBookings, selectedReviewBookingId],
  );

  const selectedPlanningBooking = useMemo(
    () =>
      planningBookings.find((booking) => booking.id === selectedPlanningBookingId) ||
      planningBookings[0] ||
      null,
    [planningBookings, selectedPlanningBookingId],
  );

  const selectedDocumentsBooking = useMemo(
    () =>
      docsBookings.find((booking) => booking.id === selectedDocumentsBookingId) ||
      docsBookings[0] ||
      null,
    [docsBookings, selectedDocumentsBookingId],
  );

  const newRequests = bookings.filter(
    (booking) =>
      Date.now() - new Date(booking.timestamp).getTime() < 24 * 60 * 60 * 1000,
  ).length;
  const budgetCount = bookings.filter((booking) => Boolean(booking.details.valuation.customerBudget)).length;
  const priceReadyCount = bookings.filter(
    (booking) =>
      Boolean(booking.details.valuation.systemPriceRangeMin) &&
      Boolean(booking.details.valuation.systemPriceRangeMax),
  ).length;
  const docsCount = bookings.reduce(
    (sum, booking) => sum + (booking.details.admin?.docs?.length || 0),
    0,
  );
  const operationsManagedCount = bookings.filter(
    (booking) =>
      Boolean(booking.details.admin?.workOrder) ||
      Boolean(booking.details.admin?.costLines?.length) ||
      Boolean(booking.details.admin?.ledgerEntries?.length) ||
      Boolean(booking.details.admin?.commercialDecision),
  ).length;
  const activeBackhauls = backhaulOffers.filter((offer) => offer.status === "active").length;
  const missingDocumentsCount = bookings.filter(
    (booking) =>
      booking.status !== "new" && (booking.details.admin?.docs?.length || 0) === 0,
  ).length;
  const criticalTasksCount = bookings.filter((booking) => {
    const hasContactGap = !booking.phone && !booking.email;
    const hasNoPriceSignals =
      !booking.details.valuation.customerBudget &&
      !booking.details.valuation.systemPriceRangeMin &&
      !booking.details.valuation.systemPriceRangeMax;
    return hasContactGap || hasNoPriceSignals;
  }).length;

  function scrollContentIntoView() {
    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function updateUrlTab(nextTab: WorkspaceTab) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTab === "overview") {
      params.delete("tab");
    } else {
      params.set("tab", nextTab);
    }
    const query = params.toString();
    router.replace(query ? `/dashboard?${query}` : "/dashboard", { scroll: false });
  }

  function switchWorkspace(nextTab: WorkspaceTab) {
    setWorkspace(nextTab);
    setMobileNavOpen(false);
    updateUrlTab(nextTab);
    scrollContentIntoView();
  }

  function rememberFocusTrigger() {
    if (typeof document === "undefined") return;
    if (document.activeElement instanceof HTMLElement) {
      lastFocusedElementRef.current = document.activeElement;
    }
  }

  function handleCloseCaseManagement() {
    setSelectedBooking(null);
    setSelectedDetailTab("overview");
    const params = new URLSearchParams(searchParams.toString());
    ["leadId", "caseId", "modal", "detail"].forEach((key) => params.delete(key));
    const query = params.toString();
    router.replace(query ? `/dashboard?${query}` : "/dashboard", { scroll: false });
    window.requestAnimationFrame(() => {
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
        return;
      }
      contentRef.current?.focus();
    });
  }

  function openBooking(booking: Booking, initialTab: DetailTab = "overview") {
    rememberFocusTrigger();
    setSelectedBooking(booking);
    setSelectedDetailTab(initialTab);
  }

  function activateInquiryWorkspace(
    nextTab: WorkspaceTab,
    focus: InquiryFocus = null,
    service: string | null = null,
  ) {
    setInquiryFocus(focus);
    setFilterService(service);
    switchWorkspace(nextTab);
  }

  function clearInquiryFocus() {
    setInquiryFocus(null);
    setFilterService(null);
  }

  function openPriceReview(booking?: Booking | null) {
    if (booking) {
      setSelectedReviewBookingId(booking.id);
    } else if (!selectedReviewBookingId && priceReviewBookings[0]) {
      setSelectedReviewBookingId(priceReviewBookings[0].id);
    }
    switchWorkspace("price-review");
  }

  function openPlanning(booking?: Booking | null) {
    if (booking) {
      setSelectedPlanningBookingId(booking.id);
    } else if (!selectedPlanningBookingId && planningBookings[0]) {
      setSelectedPlanningBookingId(planningBookings[0].id);
    }
    switchWorkspace("planning");
  }

  function openDocumentsCenter(booking?: Booking | null) {
    if (booking) {
      setSelectedDocumentsBookingId(booking.id);
    } else if (!selectedDocumentsBookingId && docsBookings[0]) {
      setSelectedDocumentsBookingId(docsBookings[0].id);
    }
    switchWorkspace("documents");
  }

  function openGallery(images: string[], initialIndex: number) {
    setGalleryImages(images);
    setGalleryIndex(initialIndex);
  }

  function closeGallery() {
    setGalleryImages(null);
  }

  function handleUpdateBooking(updatedBooking: Booking) {
    const normalized = normalizeBooking(updatedBooking);
    setBookings((current) =>
      current.map((entry) => (entry.id === normalized.id ? normalized : entry)),
    );
    if (selectedBooking?.id === normalized.id) {
      setSelectedBooking(normalized);
    }
  }

  async function handleDocumentUpdate(bookingId: string, documentParams: any) {
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documentParams),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Dokumentenaktion fehlgeschlagen");
    }

    handleUpdateBooking(payload.data);
  }

  async function handleDeleteBooking(bookingId: string) {
    const response = await fetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
    const payload = await response.json();

    if (!response.ok) {
        throw new Error(payload.error || "Loeschen fehlgeschlagen");
    }

    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
    if (selectedBooking?.id === bookingId) {
      handleCloseCaseManagement();
    }
    if (selectedReviewBookingId === bookingId) setSelectedReviewBookingId(null);
    if (selectedPlanningBookingId === bookingId) setSelectedPlanningBookingId(null);
    if (selectedDocumentsBookingId === bookingId) setSelectedDocumentsBookingId(null);
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
              .map((item) => item.trim())
              .filter(Boolean);
        return { ...current, routeAreas };
      }
      return { ...current, [key]: value };
    });
  }

  async function reloadBackhauls() {
    const response = await fetch("/api/backhauls?all=1");
    const data = await response.json();
    if (Array.isArray(data)) {
      setBackhaulOffers(data);
    }
  }

  async function saveBackhaulOffer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingBackhaul(true);

    try {
      const response = await fetch("/api/backhauls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backhaulForm),
      });
      if (!response.ok) {
          throw new Error("Rueckfahrt konnte nicht gespeichert werden.");
      }
      await reloadBackhauls();
      setBackhaulForm(initialBackhaulForm);
    } catch (error) {
      console.error(error);
    } finally {
      setSavingBackhaul(false);
    }
  }

  async function setBackhaulStatus(offer: BackhaulOffer, statusValue: string) {
    try {
      const response = await fetch("/api/backhauls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...offer, status: statusValue }),
      });
      if (!response.ok) {
        throw new Error("Status konnte nicht aktualisiert werden.");
      }
      await reloadBackhauls();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (workspace === "price-review" && !selectedReviewBookingId && priceReviewBookings[0]) {
      setSelectedReviewBookingId(priceReviewBookings[0].id);
    }
  }, [workspace, selectedReviewBookingId, priceReviewBookings]);

  useEffect(() => {
    if (workspace === "planning" && !selectedPlanningBookingId && planningBookings[0]) {
      setSelectedPlanningBookingId(planningBookings[0].id);
    }
  }, [workspace, selectedPlanningBookingId, planningBookings]);

  useEffect(() => {
    if (workspace === "documents" && !selectedDocumentsBookingId && docsBookings[0]) {
      setSelectedDocumentsBookingId(docsBookings[0].id);
    }
  }, [workspace, selectedDocumentsBookingId, docsBookings]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f8fbff] text-slate-500">
        {tAuth.loading}
      </div>
    );
  }

  const activeMeta = workspaceMeta[workspace];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#f8fafc_100%)]">
      <AnimatePresence>
        {mobileNavOpen ? (
          <>
            <m.button
              type="button"
                  aria-label="Navigation schliessen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm xl:hidden"
            />
            <m.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[320px] border-r border-slate-200 bg-white p-4 shadow-2xl xl:hidden"
            >
              <div className="flex items-center justify-between gap-3 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    FLOXANT Backoffice
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Bereiche und Arbeitswege
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Navigation schliessen"
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-slate-950"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-2" aria-label="Mobile Backoffice Navigation">
                {dashboardNavigation.map((item) => {
                  const meta = workspaceMeta[item.id];
                  const Icon = meta.icon;
                  const active = workspace === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`${item.label} oeffnen`}
                      onClick={() => switchWorkspace(item.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-[1.15rem] border px-4 py-3 text-left transition",
                        active
                          ? "border-blue-200 bg-blue-50 text-slate-950 shadow-sm shadow-blue-950/5"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          active ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">
                          {germanizeText(item.label)}
                        </div>
                        <div className="mt-1 text-xs leading-relaxed text-slate-500">
                          {germanizeText(meta.description)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </m.aside>
          </>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto flex max-w-[1680px] gap-6 px-4 py-5 md:px-6 lg:px-8">
        <aside className="hidden w-[280px] shrink-0 xl:block">
          <div className="sticky top-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                FLOXANT Backoffice
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                Operativ, klar und ohne Sucherei
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Anfragen, Preise, Planung und Dokumente sauber getrennt.
              </p>
            </div>

            <nav className="mt-4 space-y-2" aria-label="Backoffice Navigation">
              {dashboardNavigation.map((item) => {
                const meta = workspaceMeta[item.id];
                const Icon = meta.icon;
                const active = workspace === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`${item.label} oeffnen`}
                    onClick={() => switchWorkspace(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[1.2rem] border px-4 py-3 text-left transition",
                      active
                        ? "border-blue-200 bg-blue-50 text-slate-950 shadow-sm shadow-blue-950/5"
                        : "border-transparent bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        active ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500",
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {germanizeText(item.label)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {germanizeText(meta.description)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Direkter Pfad
              </p>
              <div className="mt-2 text-sm font-semibold text-slate-950">
                /buchung als Hauptlink
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Fuer Google Maps, Google Search und direkte Kundenanfragen.
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Bereiche oeffnen"
                    onClick={() => setMobileNavOpen(true)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 xl:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1.1rem] bg-blue-50 text-blue-700">
                    <activeMeta.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                      {germanizeText(activeMeta.label)}
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                      {germanizeText(activeMeta.title)}
                    </h1>
                  </div>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {germanizeText(activeMeta.description)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-600">
                  {session?.user?.email || "Angemeldet"}
                </div>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  Abmelden
                </button>
              </div>
            </div>
          </header>

          <main ref={contentRef} tabIndex={-1} className="mt-6 space-y-6 outline-none">
            {workspace === "overview" ? (
              <section className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <OverviewNavCard
                    icon={Inbox}
                    label="Offene Eingaenge"
                    value={String(newRequests)}
                    description="Neue Kundenanfragen fuer Sichtung und erste Entscheidung."
                    statusLabel={newRequests > 0 ? "pruefen" : "ruhig"}
                    onClick={() => activateInquiryWorkspace("inbox", "new")}
                  />
                  <OverviewNavCard
                    icon={WalletCards}
                    label="Mit Budgetangabe"
                    value={String(budgetCount)}
                    description="Kunden haben einen Preisrahmen genannt."
                    statusLabel={budgetCount > 0 ? "offen" : "leer"}
                    onClick={() => activateInquiryWorkspace("inbox", "budget")}
                  />
                  <OverviewNavCard
                    icon={FileCheck2}
                    label="Preispruefung"
                    value={String(priceReadyCount)}
                    description="Anfragen mit offenem Preisvorschlag und Bewertungsbedarf."
                    statusLabel={priceReadyCount > 0 ? "bereit" : "spaeter"}
                    onClick={() => openPriceReview()}
                  />
                  <OverviewNavCard
                    icon={Truck}
                    label="Leer-Rueckfahrten"
                    value={String(activeBackhauls)}
                    description="Aktive Touren mit freier Kapazitaet."
                    statusLabel={activeBackhauls > 0 ? "aktiv" : "leer"}
                    onClick={() => switchWorkspace("return-trips")}
                  />
                  <OverviewNavCard
                    icon={Calculator}
                    label="Interne Kalkulation"
                    value={String(operationsManagedCount)}
                    description="Kosten, Marge und Mindestpreis pruefen."
                    statusLabel={operationsManagedCount > 0 ? "aktiv" : "neu"}
                    onClick={() => switchWorkspace("internal-costs")}
                  />
                  <OverviewNavCard
                    icon={ClipboardList}
                    label="Auftragsplanung"
                    value={String(planningBookings.length)}
                    description="Team, Fahrzeuge, Zeiten und Extras vorbereiten."
                    statusLabel={planningBookings.length > 0 ? "offen" : "leer"}
                    onClick={() => openPlanning()}
                  />
                  <OverviewNavCard
                    icon={FileText}
                    label="Fehlende Dokumente"
                    value={String(missingDocumentsCount)}
                    description="Vorgaenge ohne Angebot, Bestaetigung oder Rechnung."
                    statusLabel={missingDocumentsCount > 0 ? "pruefen" : "ruhig"}
                    onClick={() => openDocumentsCenter()}
                  />
                  <OverviewNavCard
                    icon={Clock}
                    label="Kritische Aufgaben"
                    value={String(Math.max(followUpBookings.length, criticalTasksCount))}
                    description="Nachfassen, Rueckmeldung oder unklare Vorgaenge."
                    statusLabel={followUpBookings.length > 0 || criticalTasksCount > 0 ? "offen" : "ruhig"}
                    onClick={() => switchWorkspace("follow-up")}
                  />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                          Heute relevant
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                          Offene Vorgaenge direkt oeffnen
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => switchWorkspace("inbox")}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Eingaenge ansehen
                      </button>
                    </div>

                    <div className="space-y-3">
                      {recentBookings.length === 0 ? (
                        <EmptyPanel text="Noch keine Anfragen im System." />
                      ) : (
                        recentBookings.map((booking) => (
                          <LeadRow
                            key={booking.id}
                            booking={booking}
                            onOpen={() => openBooking(booking)}
                            onPriceReview={() => openPriceReview(booking)}
                            onDocuments={() => openBooking(booking, "documents")}
                            onGallery={openGallery}
                          />
                        ))
                      )}
                    </div>
                  </section>

                  <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                      Schnelle Bereiche
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                      Direkt zum passenden Arbeitsmodus
                    </h2>
                    <div className="mt-5 grid gap-3">
                      <ShortcutCard
                        title="Preispruefung"
                        text="Kundenpreis gegen Mindestpreis, Zielpreis und Marge abgleichen."
                        actionLabel="Preispruefung oeffnen"
                        onClick={() => openPriceReview()}
                      />
                      <ShortcutCard
                        title="Interne Kosten"
                        text="Freie interne Kalkulation fuer Telefonate und schnelle Vorpruefungen."
                        actionLabel="Kostenrechner oeffnen"
                        onClick={() => switchWorkspace("internal-costs")}
                      />
                      <ShortcutCard
                        title="Auftragsplanung"
                        text="Team, Fahrzeuge, Etagen, Aufzug, Laufweg und Extras buendeln."
                        actionLabel="Planung oeffnen"
                        onClick={() => openPlanning()}
                      />
                      <ShortcutCard
                        title="B2B-Reinigung"
                        text="Gewerbliche Reinigungsanfragen mit Objektart, Flaeche und Intervall buendeln."
                        actionLabel="B2B-Leads oeffnen"
                        onClick={() => switchWorkspace("b2b-cleaning")}
                      />
                    </div>
                  </section>
                </div>
              </section>
            ) : null}

            {workspace === "inbox" ? (
              <section className="space-y-5">
                <DashboardSectionHeader
                  title="Eingaenge"
                  text="Neue Leads, Budgetangaben und unvollstaendige Anfragen an einem Ort sichten und priorisieren."
                />
                <InquiryToolbar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterService={filterService}
                  setFilterService={setFilterService}
                  inquiryFocus={inquiryFocus}
                  clearInquiryFocus={clearInquiryFocus}
                />
                <LeadList
                  loading={loading}
                  bookings={filteredBookings}
                  onOpen={(booking) => openBooking(booking)}
                  onPriceReview={(booking) => openPriceReview(booking)}
                  onDocuments={(booking) => openBooking(booking, "documents")}
                  onGallery={openGallery}
                  emptyText={t.status.empty}
                />
              </section>
            ) : null}

            {workspace === "price-review" ? (
              <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                  <DashboardSectionHeader
                    title="Preispruefung"
                    text="Links die passende Anfrage waehlen, rechts Mindestpreis, Zielpreis, Marge und Risikostufe beurteilen."
                    compact
                  />
                  <div className="mt-5 space-y-3">
                    {priceReviewBookings.length === 0 ? (
                      <EmptyPanel text="Noch keine Anfrage mit ausreichenden Preis- oder Budgetdaten vorhanden." />
                    ) : (
                      priceReviewBookings.map((booking) => {
                        const active = selectedReviewBooking?.id === booking.id;
                        return (
                          <button
                            key={booking.id}
                            type="button"
                            onClick={() => setSelectedReviewBookingId(booking.id)}
                            className={cn(
                              "w-full rounded-[1.25rem] border p-4 text-left transition",
                              active
                                ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-950/5"
                                : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white",
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-bold text-slate-950">{booking.name}</div>
                                <div className="mt-1 text-xs text-slate-500">
                                  {getServiceDisplay(booking.service).label} / {germanizeText(getMainLocation(booking))}
                                </div>
                              </div>
                              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                                {formatStatus(booking.status)}
                              </span>
                            </div>
                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                              <MiniInfo label="Systemrahmen" value={formatMoneyRange(booking)} />
                              <MiniInfo
                                label="Kundenbudget"
                                value={
                                  booking.details.valuation.customerBudget
                                    ? `${booking.details.valuation.customerBudget} EUR`
                                    : "Nicht angegeben"
                                }
                              />
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                <InternalPricingWorkbench mode="review" booking={selectedReviewBooking} />
              </section>
            ) : null}

            {workspace === "internal-costs" ? (
              <section className="space-y-5">
                <DashboardSectionHeader
                  title="Interne Kosten"
                  text="Personal, Fahrzeug, Diesel, Zeit, Material und Risiko ohne Kundensicht sauber intern kalkulieren."
                />
                <InternalPricingWorkbench mode="calculator" />
              </section>
            ) : null}

            {workspace === "planning" ? (
              <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                  <DashboardSectionHeader
                    title="Auftragsplanung"
                    text="Links den Vorgang waehlen, rechts Team, Fahrzeuge, Zeiten, Etagen und Hinweise fuer die Durchfuehrung pflegen."
                    compact
                  />
                  <div className="mt-5 space-y-3">
                    {planningBookings.length === 0 ? (
                      <EmptyPanel text="Noch keine Anfragen fuer die Auftragsplanung vorhanden." />
                    ) : (
                      planningBookings.map((booking) => {
                        const active = selectedPlanningBooking?.id === booking.id;
                        return (
                          <button
                            key={booking.id}
                            type="button"
                            onClick={() => setSelectedPlanningBookingId(booking.id)}
                            className={cn(
                              "w-full rounded-[1.25rem] border p-4 text-left transition",
                              active
                                ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-950/5"
                                : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white",
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-bold text-slate-950">{booking.name}</div>
                                <div className="mt-1 text-xs text-slate-500">
                                  {getServiceDisplay(booking.service).label} / {germanizeText(getMainLocation(booking))}
                                </div>
                              </div>
                              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                                {booking.details.admin?.workOrder ? "Auftrag" : "neu"}
                              </span>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {selectedPlanningBooking ? (
                  <OperationsControlPanel
                    booking={selectedPlanningBooking}
                    onSave={handleUpdateBooking}
                    initialPanel="work_order"
                    lockedPanel
                  />
                ) : (
                    <EmptyPanel text="Bitte links zuerst einen Vorgang auswaehlen." />
                )}
              </section>
            ) : null}

            {workspace === "documents" ? (
              <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                  <DashboardSectionHeader
                    title="Dokumente"
                    text="Angebot, Auftragsbestaetigung, Rechnung und Dateien pro Vorgang getrennt verwalten."
                    compact
                  />
                  <div className="mt-5 space-y-3">
                    {docsBookings.length === 0 ? (
                      <EmptyPanel text="Noch keine Dokumente im System gespeichert." />
                    ) : (
                      docsBookings.map((booking) => {
                        const active = selectedDocumentsBooking?.id === booking.id;
                        return (
                          <button
                            key={booking.id}
                            type="button"
                            onClick={() => setSelectedDocumentsBookingId(booking.id)}
                            className={cn(
                              "w-full rounded-[1.25rem] border p-4 text-left transition",
                              active
                                ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-950/5"
                                : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white",
                            )}
                          >
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="text-sm font-bold text-slate-950">{booking.name}</div>
                                <div className="mt-1 text-xs text-slate-500">
                                  {getServiceDisplay(booking.service).label} / {germanizeText(getMainLocation(booking))}
                                </div>
                              </div>
                              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                                {(booking.details.admin?.docs?.length || 0).toString()} Dokumente
                              </span>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedDocumentsBooking ? (
                    <>
                      <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                          Dokumentenkette
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                          {selectedDocumentsBooking.name}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          Angebot, Auftragsbestaetigung, Rechnung und Dateistatus bleiben getrennt von Kalkulation und Planung sichtbar.
                        </p>
                      </div>
                      <DocumentChainTracker documents={selectedDocumentsBooking.details.admin?.docs || []} />
                      <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                        <DocumentManager
                          bookingId={selectedDocumentsBooking.id}
                          documents={selectedDocumentsBooking.details.admin?.docs || []}
                          onUpdate={(payload) => handleDocumentUpdate(selectedDocumentsBooking.id, payload)}
                        />
                      </div>
                    </>
                  ) : (
                    <EmptyPanel text="Bitte links zuerst einen Vorgang auswaehlen." />
                  )}
                </div>
              </section>
            ) : null}

            {workspace === "return-trips" ? (
              <section className="rounded-[2rem] border border-emerald-200 bg-[linear-gradient(135deg,rgba(16,185,129,0.08),rgba(255,255,255,0.82))] p-6 shadow-sm shadow-slate-950/5">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                      <Truck className="h-3.5 w-3.5" />
                      Leer-Rueckfahrten
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                      Rueckfahrten veroeffentlichen
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                      Hier eingetragene Rueckfahrten erscheinen direkt auf der oeffentlichen
                      Leer-Rueckfahrt-Seite. Ziel ist Regensburg mit ca. 150 km Radius.
                    </p>
                  </div>
                  <a
                    href="/leerfahrt-rueckfahrt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-600 transition hover:border-emerald-200 hover:text-slate-950"
                  >
                    Oeffentliche Seite
                    <Route className="h-4 w-4" />
                  </a>
                </div>

                <form
                  onSubmit={saveBackhaulOffer}
                  className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 lg:grid-cols-4"
                >
                  <DashboardField
                    label="Titel"
                    value={backhaulForm.title || ""}
                    onChange={(value) => updateBackhaulField("title", value)}
                    required
                  />
                  <DashboardField
                    label="Datum"
                    value={backhaulForm.date || ""}
                    onChange={(value) => updateBackhaulField("date", value)}
                    type="date"
                  />
                  <DashboardField
                    label="Zeitfenster"
                    value={backhaulForm.timeWindow || ""}
                    onChange={(value) => updateBackhaulField("timeWindow", value)}
                  />
                  <DashboardField
                    label="Status"
                    value={backhaulForm.status || "active"}
                    onChange={(value) => updateBackhaulField("status", value)}
                    asSelect
                  />
                  <DashboardField
                    label="Startgebiet"
                    value={backhaulForm.origin || ""}
                    onChange={(value) => updateBackhaulField("origin", value)}
                  />
                  <DashboardField
                    label="Ziel"
                    value={backhaulForm.destination || ""}
                    onChange={(value) => updateBackhaulField("destination", value)}
                  />
                  <DashboardField
                    label="Zielradius"
                    value={backhaulForm.destinationRadius || ""}
                    onChange={(value) => updateBackhaulField("destinationRadius", value)}
                  />
                  <DashboardField
                    label="Fahrzeug"
                    value={backhaulForm.vehicleType || ""}
                    onChange={(value) => updateBackhaulField("vehicleType", value)}
                  />
                  <div className="lg:col-span-2">
                    <DashboardField
                      label="Gebiete auf Route"
                      value={(backhaulForm.routeAreas || []).join(", ")}
                      onChange={(value) => updateBackhaulField("routeAreas", value)}
                    />
                  </div>
                  <DashboardField
                    label="Kapazitaet"
                    value={backhaulForm.availableCapacity || ""}
                    onChange={(value) => updateBackhaulField("availableCapacity", value)}
                  />
                  <DashboardField
                    label="Preishinweis"
                    value={backhaulForm.priceHint || ""}
                    onChange={(value) => updateBackhaulField("priceHint", value)}
                  />
                  <div className="lg:col-span-3">
                    <DashboardField
                      label="Faire-Preis-Erklaerung"
                      value={backhaulForm.fairPriceNote || ""}
                      onChange={(value) => updateBackhaulField("fairPriceNote", value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingBackhaul}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-emerald-200 disabled:opacity-60"
                  >
                    <PlusCircle className="h-4 w-4" />
                    {savingBackhaul ? "Speichert..." : "Veroeffentlichen"}
                  </button>
                </form>

                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  {backhaulOffers.length === 0 ? (
                    <EmptyPanel text="Noch keine admin-gepflegte Leer-Rueckfahrt gespeichert." />
                  ) : (
                    backhaulOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-950">{offer.title}</h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {offer.origin} / {offer.destination} / {offer.date || "flexibel"} /{" "}
                              {offer.availableCapacity}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase",
                              offer.status === "active"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-slate-200 bg-slate-100 text-slate-500",
                            )}
                          >
                            {offer.status}
                          </span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {offer.routeAreas.slice(0, 6).map((area) => (
                            <span
                              key={area}
                              className="rounded-full bg-slate-100 px-3 py-1 text-[10px] text-slate-500"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setBackhaulStatus(
                                offer,
                                offer.status === "active" ? "paused" : "active",
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:text-slate-950"
                          >
                            <PauseCircle className="h-4 w-4" />
                            {offer.status === "active" ? "Pausieren" : "Aktivieren"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setBackhaulStatus(offer, "archived")}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            Archivieren
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            ) : null}

            {workspace === "b2b-cleaning" ? (
              <section className="space-y-5">
                <DashboardSectionHeader
                  title="B2B-Reinigung"
                  text="Gewerbliche Reinigungsanfragen mit Flaeche, Intervall, Objektart und Ansprechpartner sauber buendeln."
                />
                <LeadList
                  loading={loading}
                  bookings={b2bBookings}
                  onOpen={(booking) => openBooking(booking)}
                  onPriceReview={(booking) => openPriceReview(booking)}
                  onDocuments={(booking) => openBooking(booking, "documents")}
                  onGallery={openGallery}
                  emptyText="Noch keine B2B-Reinigungsleads vorhanden."
                />
              </section>
            ) : null}

            {workspace === "follow-up" ? (
              <section className="space-y-5">
                <DashboardSectionHeader
                  title="Nachfassen"
                  text="Angebote ohne Antwort, offene Bestaetigungen, Rechnungsstatus und Bewertungsanfragen sauber nachhalten."
                />
                <LeadList
                  loading={loading}
                  bookings={followUpBookings}
                  onOpen={(booking) => openBooking(booking)}
                  onPriceReview={(booking) => openPriceReview(booking)}
                  onDocuments={(booking) => openBooking(booking, "documents")}
                  onGallery={openGallery}
                  emptyText="Noch keine offenen Nachfass-Vorgaenge vorhanden."
                />
              </section>
            ) : null}

            {workspace === "settings" ? (
              <section className="grid gap-6 xl:grid-cols-3">
                <InfoPanel
                  title="Interner Stundenlohn"
                  text="Grundwert fuer Personalaufwand vor Zuschlaegen und Risikopuffer."
                  value={`${PRICING_DEFAULTS.labor.employeeHourlyRateNet} EUR netto`}
                />
                <InfoPanel
                  title="Nebenkostenfaktor"
                  text="Personalaufwand wird mit Sozial- und Nebenkosten hochgerechnet."
                  value={`${PRICING_DEFAULTS.labor.burdenFactor.toFixed(2)}x`}
                />
                <InfoPanel
                  title="Fahrzeugkosten pro km"
                  text="Kilometerkosten und Diesel fliessen getrennt in die interne Kalkulation ein."
                  value={`${(PRICING_DEFAULTS.vehicles.kmCostNet + PRICING_DEFAULTS.vehicles.fuelCostPerKmNet).toFixed(2)} EUR / km`}
                />
                <InfoPanel
                  title="Risikopuffer"
                  text="Standardpuffer fuer unsichere Volumina, viele Etagen, Distanz und fehlende Fotos."
                  value={`${PRICING_DEFAULTS.risk.basePercent} bis ${PRICING_DEFAULTS.risk.maxPercent} %`}
                />
                <InfoPanel
                  title="MwSt."
                  text="Standardwert fuer Brutto-Berechnung im Rechner und in der Preispruefung."
                  value={`${DEFAULT_VAT_RATE} %`}
                />
                <InfoPanel
                  title="Zielmarge"
                  text="Interner Richtwert fuer wirtschaftlich saubere Angebote."
                  value={`${DEFAULT_DESIRED_MARGIN_PERCENT} %`}
                />
              </section>
            ) : null}          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedBooking ? (
          <BookingDetailView
            booking={selectedBooking}
            initialTab={selectedDetailTab}
            onClose={handleCloseCaseManagement}
            onSave={handleUpdateBooking}
            onDelete={handleDeleteBooking}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {galleryImages ? (
          <GalleryModal
            images={galleryImages}
            initialIndex={galleryIndex}
            onClose={closeGallery}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function DashboardSectionHeader({
  title,
  text,
  compact = false,
}: {
  title: string;
  text: string;
  compact?: boolean;
}) {
  const safeTitle = germanizeText(title);
  const safeText = germanizeText(text);
  return (
    <div className={cn("rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5", compact && "p-0 border-0 shadow-none bg-transparent")}>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
        Arbeitsbereich
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{safeTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{safeText}</p>
    </div>
  );
}

function InquiryToolbar({
  searchTerm,
  setSearchTerm,
  filterService,
  setFilterService,
  inquiryFocus,
  clearInquiryFocus,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterService: string | null;
  setFilterService: (value: string | null) => void;
  inquiryFocus: InquiryFocus;
  clearInquiryFocus: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Name, E-Mail oder Telefon durchsuchen"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-10 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
          {[
            { id: null, label: "Alle" },
            { id: "umzug", label: "Umzug" },
            { id: "reinigung", label: "Reinigung" },
            { id: "entsorgung", label: "Entsorgung" },
            { id: "bueroumzug", label: "Bueroumzug" },
            { id: "leerfahrt", label: "Leer-Rueckfahrt" },
            { id: "firmenentsorgung", label: "Firmenentsorgung" },
            { id: "private_client", label: "Private Client" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setFilterService(item.id);
              }}
              className={cn(
                "whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                filterService === item.id || (!filterService && item.id === null)
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950",
              )}
            >
              {germanizeText(item.label)}
            </button>
          ))}
        </div>
      </div>

      {inquiryFocus ? (
        <div className="flex flex-col gap-3 rounded-[1.4rem] border border-blue-200 bg-blue-50 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
              Aktiver Fokus
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Das Dashboard zeigt gerade:{" "}
              <span className="font-bold text-slate-950">
                {inquiryFocusLabelMap[inquiryFocus]}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={clearInquiryFocus}
            className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            Fokus aufheben
          </button>
        </div>
      ) : null}
    </>
  );
}

function LeadList({
  loading,
  bookings,
  onOpen,
  onPriceReview,
  onDocuments,
  onGallery,
  emptyText,
}: {
  loading: boolean;
  bookings: Booking[];
  onOpen: (booking: Booking) => void;
  onPriceReview: (booking: Booking) => void;
  onDocuments: (booking: Booking) => void;
  onGallery: (images: string[], initialIndex: number) => void;
  emptyText: string;
}) {
  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">Daten werden geladen...</div>
    );
  }

  if (bookings.length === 0) {
    return <EmptyPanel text={emptyText} />;
  }

  return (
    <div className="grid gap-4">
      <AnimatePresence>
        {bookings.map((booking, index) => (
          <m.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: index * 0.03 }}
          >
            <LeadRow
              booking={booking}
              onOpen={() => onOpen(booking)}
              onPriceReview={() => onPriceReview(booking)}
              onDocuments={() => onDocuments(booking)}
              onGallery={onGallery}
            />
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function LeadRow({
  booking,
  onOpen,
  onPriceReview,
  onDocuments,
  onGallery,
}: {
  booking: Booking;
  onOpen: () => void;
  onPriceReview: () => void;
  onDocuments: () => void;
  onGallery?: (images: string[], initialIndex: number) => void;
}) {
  const serviceDisplay = getServiceDisplay(booking.service);
  const ServiceIcon = serviceDisplay.Icon;
  const sourceMeta = getBookingSourceMeta(booking);
  const safeServiceLabel = germanizeText(serviceDisplay.label);
  const safeSourceLabel = germanizeText(sourceMeta.label);
  const safeEntryPoint = germanizeText(sourceMeta.entryPoint);
  const safeLocation = germanizeText(getMainLocation(booking));

  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 transition-all hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className={cn("h-2 w-full lg:h-auto lg:w-2", serviceDisplay.railClass)} />

        <div className="flex flex-1 flex-col gap-5 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0 flex items-start gap-4">
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl",
                serviceDisplay.iconClass,
              )}
            >
              <ServiceIcon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-950">
                  {booking.name}
                </h3>
                <span
                  className={cn(
                    "rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    getStatusTone(booking.status),
                  )}
                >
                  {formatStatus(booking.status)}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                <MapPin className="h-3 w-3" />
                <span className="max-w-[18rem] truncate font-medium">{safeLocation}</span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span>{safeServiceLabel}</span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span>{safeSourceLabel}</span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                <Clock className="h-3 w-3" />
                {new Date(booking.timestamp).toLocaleString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <span aria-hidden="true" className="text-slate-300">/</span>
                Einstieg: <span className="max-w-[18rem] truncate">{safeEntryPoint}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[320px]">
            <MiniInfo label="Systemrahmen" value={formatMoneyRange(booking)} />
            <MiniInfo
              label="Budget"
              value={
                booking.details.valuation.customerBudget
                  ? formatCurrency(booking.details.valuation.customerBudget)
                  : "Nicht angegeben"
              }
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onGallery && booking.file_urls.length > 0 ? (
              <button
                type="button"
                onClick={() => onGallery(booking.file_urls, 0)}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Bilder ({booking.file_urls.length})
              </button>
            ) : null}
            <button
              type="button"
              onClick={onDocuments}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Dokumente
            </button>
            <button
              type="button"
              onClick={onPriceReview}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              {germanizeText("Preis pruefen")}
            </button>
            <PremiumButton
              className="h-10 bg-blue-600 px-5 text-[10px] font-bold uppercase tracking-[0.18em] shadow-sm shadow-blue-700/20"
              onClick={onOpen}
            >
              Verwalten
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewNavCard({
  icon: Icon,
  label,
  value,
  description,
  statusLabel,
  onClick,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  value: string;
  description: string;
  statusLabel: string;
  onClick: () => void;
}) {
  const safeLabel = germanizeText(label);
  const safeDescription = germanizeText(description);
  const safeStatusLabel = germanizeText(statusLabel);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={germanizeText(`${label} oeffnen`)}
      className="rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
          {safeStatusLabel}
        </span>
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
        {safeLabel}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{safeDescription}</p>
    </button>
  );
}

function ShortcutCard({
  title,
  text,
  actionLabel,
  onClick,
}: {
  title: string;
  text: string;
  actionLabel: string;
  onClick: () => void;
}) {
  const safeTitle = germanizeText(title);
  const safeText = germanizeText(text);
  const safeActionLabel = germanizeText(actionLabel);
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-200 hover:bg-white"
    >
      <div className="text-base font-bold text-slate-950">{safeTitle}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{safeText}</div>
      <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700">
        {safeActionLabel}
      </div>
    </button>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  const safeLabel = germanizeText(label);
  const safeValue = germanizeText(value);
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {safeLabel}
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-950">{safeValue}</div>
    </div>
  );
}

function InfoPanel({
  title,
  text,
  value,
}: {
  title: string;
  text: string;
  value: string;
}) {
  const safeTitle = germanizeText(title);
  const safeText = germanizeText(text);
  const safeValue = germanizeText(value);
  return (
    <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
        {safeTitle}
      </div>
      <div className="mt-3 text-lg font-bold text-slate-950">{safeValue}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{safeText}</div>
    </div>
  );
}

function EmptyPanel({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
      {germanizeText(text)}
    </div>
  );
}

function DashboardField({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  asSelect = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  asSelect?: boolean;
}) {
  const safeLabel = germanizeText(label);
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {safeLabel}
      </span>
      {asSelect ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:border-emerald-300"
        >
          <option value="active">Aktiv</option>
          <option value="paused">Pausiert</option>
          <option value="draft">Entwurf</option>
        </select>
      ) : (
        <input
          required={required}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:border-emerald-300"
        />
      )}
    </label>
  );
}
