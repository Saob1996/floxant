import type { IntakePayload } from "@/lib/types/intake";

export type BackhaulOfferStatus =
 | "active"
 | "reserved"
 | "completed"
 | "inactive"
 | "paused"
 | "draft"
 | "archived";
export type BackhaulPublicationStatus = "published" | "unpublished";
export type BackhaulCapacityMode = "shared-load" | "empty-return";
export type BackhaulPriceType = "fixed" | "from" | "estimate" | "on-request";

export interface BackhaulOffer {
 id: string;
 routeId: string;
 title: string;
 date: string;
 dateEnd: string;
 timeWindow: string;
 origin: string;
 destination: string;
 intermediateStops: string[];
 pickupRadiusKm: number | null;
 destinationRadius: string;
 routeAreas: string[];
 vehicleType: string;
 availableCapacity: string;
 availableCubicMeters: number | null;
 loadingArea: string;
 weightLimitKg: number | null;
 requiredHelpers: number | null;
 itemTypes: string[];
 capacityMode: BackhaulCapacityMode;
 internalNetPrice: number | null;
 publicGrossPrice: number | null;
 vatRate: number;
 priceType: BackhaulPriceType;
 conditions: string;
 publicDescription: string;
 publicationStatus: BackhaulPublicationStatus;
 priceHint: string;
 fairPriceNote: string;
 status: BackhaulOfferStatus;
 adminNote?: string;
 createdAt: string;
 updatedAt: string;
}

export interface BackhaulOfferRow {
 id: string;
 route_id: string;
 title: string;
 departure_date: string;
 date_end: string;
 time_window: string;
 origin: string;
 destination: string;
 intermediate_stops: string[] | null;
 pickup_radius_km: number | null;
 destination_radius: string;
 route_areas: string[] | null;
 vehicle_type: string;
 available_capacity: string;
 available_cubic_meters: number | null;
 loading_area: string;
 weight_limit_kg: number | null;
 required_helpers: number | null;
 item_types: string[] | null;
 capacity_mode: BackhaulCapacityMode;
 internal_net_price?: number | null;
 public_gross_price: number | null;
 vat_rate: number;
 price_type: BackhaulPriceType;
 conditions: string;
 public_description: string;
 publication_status: BackhaulPublicationStatus;
 price_hint: string;
 fair_price_note: string;
 status: BackhaulOfferStatus;
 admin_note?: string | null;
 created_at: string;
 updated_at: string;
}

export interface LegacyBackhaulOfferRow {
 id: string;
 title: string;
 departure_date: string;
 time_window: string;
 origin: string;
 destination: string;
 destination_radius: string;
 route_areas: string[] | null;
 vehicle_type: string;
 available_capacity: string;
 price_hint: string;
 fair_price_note: string;
 status: "active" | "paused" | "draft" | "archived";
 admin_note?: string | null;
 created_at: string;
 updated_at: string;
}

export const PUBLIC_BACKHAUL_OFFER_SELECT = [
 "id",
 "route_id",
 "title",
 "departure_date",
 "date_end",
 "time_window",
 "origin",
 "destination",
 "intermediate_stops",
 "pickup_radius_km",
 "destination_radius",
 "route_areas",
 "vehicle_type",
 "available_capacity",
 "available_cubic_meters",
 "loading_area",
 "weight_limit_kg",
 "required_helpers",
 "item_types",
 "capacity_mode",
 "public_gross_price",
 "vat_rate",
 "price_type",
 "conditions",
 "public_description",
 "publication_status",
 "price_hint",
 "fair_price_note",
 "status",
 "created_at",
 "updated_at",
].join(",");

export const ADMIN_BACKHAUL_OFFER_SELECT = `${PUBLIC_BACKHAUL_OFFER_SELECT},internal_net_price,admin_note`;

export const LEGACY_PUBLIC_BACKHAUL_OFFER_SELECT = [
 "id",
 "title",
 "departure_date",
 "time_window",
 "origin",
 "destination",
 "destination_radius",
 "route_areas",
 "vehicle_type",
 "available_capacity",
 "price_hint",
 "fair_price_note",
 "status",
 "created_at",
 "updated_at",
].join(",");

export const LEGACY_ADMIN_BACKHAUL_OFFER_SELECT = `${LEGACY_PUBLIC_BACKHAUL_OFFER_SELECT},admin_note`;

const LEGACY_METADATA_PREFIX = "FLOXANT_BACKHAUL_V2:";

type LegacyBackhaulMetadata = Partial<Pick<BackhaulOffer,
 | "routeId"
 | "dateEnd"
 | "intermediateStops"
 | "pickupRadiusKm"
 | "availableCubicMeters"
 | "loadingArea"
 | "weightLimitKg"
 | "requiredHelpers"
 | "itemTypes"
 | "capacityMode"
 | "internalNetPrice"
 | "publicGrossPrice"
 | "vatRate"
 | "priceType"
 | "conditions"
 | "publicDescription"
 | "publicationStatus"
 | "status"
 | "adminNote"
>>;

function readLegacyMetadata(value: string | null | undefined): LegacyBackhaulMetadata {
 if (!value?.startsWith(LEGACY_METADATA_PREFIX)) return { adminNote: value || "" };
 try {
  const parsed = JSON.parse(value.slice(LEGACY_METADATA_PREFIX.length));
  return parsed && typeof parsed === "object" ? parsed as LegacyBackhaulMetadata : {};
 } catch {
  return { adminNote: value };
 }
}

export function encodeLegacyBackhaulMetadata(offer: BackhaulOffer): string {
 const metadata: LegacyBackhaulMetadata = {
  routeId: offer.routeId.slice(0, 80),
  dateEnd: offer.dateEnd,
  intermediateStops: offer.intermediateStops.slice(0, 10).map((item) => item.slice(0, 80)),
  pickupRadiusKm: offer.pickupRadiusKm,
  availableCubicMeters: offer.availableCubicMeters,
  loadingArea: offer.loadingArea.slice(0, 240),
  weightLimitKg: offer.weightLimitKg,
  requiredHelpers: offer.requiredHelpers,
  itemTypes: offer.itemTypes.slice(0, 10).map((item) => item.slice(0, 80)),
  capacityMode: offer.capacityMode,
  internalNetPrice: offer.internalNetPrice,
  publicGrossPrice: offer.publicGrossPrice,
  vatRate: offer.vatRate,
  priceType: offer.priceType,
  conditions: offer.conditions.slice(0, 400),
  publicDescription: offer.publicDescription.slice(0, 600),
  publicationStatus: offer.publicationStatus,
  status: offer.status,
  adminNote: (offer.adminNote || "").slice(0, 600),
 };
 return `${LEGACY_METADATA_PREFIX}${JSON.stringify(metadata)}`;
}

export function toLegacyBackhaulStatus(status: BackhaulOfferStatus, publicationStatus: BackhaulPublicationStatus): LegacyBackhaulOfferRow["status"] {
 if (publicationStatus === "published" && status === "active") return "active";
 if (status === "draft") return "draft";
 if (status === "archived" || status === "completed") return "archived";
 return "paused";
}

export function mapBackhaulOfferRow(row: BackhaulOfferRow): BackhaulOffer {
 return {
  id: row.id,
  routeId: row.route_id,
  title: row.title,
  date: row.departure_date,
  dateEnd: row.date_end || row.departure_date,
  timeWindow: row.time_window,
  origin: row.origin,
  destination: row.destination,
  intermediateStops: Array.isArray(row.intermediate_stops) ? row.intermediate_stops : [],
  pickupRadiusKm: row.pickup_radius_km,
  destinationRadius: row.destination_radius,
  routeAreas: Array.isArray(row.route_areas) ? row.route_areas : [],
  vehicleType: row.vehicle_type,
  availableCapacity: row.available_capacity,
  availableCubicMeters: row.available_cubic_meters,
  loadingArea: row.loading_area || "",
  weightLimitKg: row.weight_limit_kg,
  requiredHelpers: row.required_helpers,
  itemTypes: Array.isArray(row.item_types) ? row.item_types : [],
  capacityMode: row.capacity_mode || "empty-return",
  internalNetPrice: row.internal_net_price ?? null,
  publicGrossPrice: row.public_gross_price,
  vatRate: row.vat_rate ?? 19,
  priceType: row.price_type || "on-request",
  conditions: row.conditions || "",
  publicDescription: row.public_description || row.fair_price_note,
  publicationStatus: row.publication_status || "unpublished",
  priceHint: row.price_hint,
  fairPriceNote: row.fair_price_note,
  status: row.status,
  adminNote: row.admin_note || "",
  createdAt: row.created_at,
  updatedAt: row.updated_at,
 };
}

export function mapLegacyBackhaulOfferRow(row: LegacyBackhaulOfferRow): BackhaulOffer {
 const metadata = readLegacyMetadata(row.admin_note);
 const logicalStatus = metadata.status || row.status;
 return {
  id: row.id,
  routeId: metadata.routeId || `RF-${row.departure_date}-${row.id.slice(0, 8).toUpperCase()}`,
  title: row.title,
  date: row.departure_date,
  dateEnd: metadata.dateEnd || row.departure_date,
  timeWindow: row.time_window,
  origin: row.origin,
  destination: row.destination,
  intermediateStops: metadata.intermediateStops || [],
  pickupRadiusKm: metadata.pickupRadiusKm ?? null,
  destinationRadius: row.destination_radius,
  routeAreas: Array.isArray(row.route_areas) ? row.route_areas : [],
  vehicleType: row.vehicle_type,
  availableCapacity: row.available_capacity,
  availableCubicMeters: metadata.availableCubicMeters ?? null,
  loadingArea: metadata.loadingArea || "",
  weightLimitKg: metadata.weightLimitKg ?? null,
  requiredHelpers: metadata.requiredHelpers ?? null,
  itemTypes: metadata.itemTypes || [],
  capacityMode: metadata.capacityMode || "empty-return",
  internalNetPrice: metadata.internalNetPrice ?? null,
  publicGrossPrice: metadata.publicGrossPrice ?? null,
  vatRate: metadata.vatRate ?? 19,
  priceType: metadata.priceType || "on-request",
  conditions: metadata.conditions || "",
  publicDescription: metadata.publicDescription || row.fair_price_note,
  publicationStatus: metadata.publicationStatus || (row.status === "active" ? "published" : "unpublished"),
  priceHint: row.price_hint,
  fairPriceNote: row.fair_price_note,
  status: logicalStatus,
  adminNote: metadata.adminNote || "",
  createdAt: row.created_at,
  updatedAt: row.updated_at,
 };
}

// Intentionally empty: public pages must not show fake or assumed return trips.
export const FALLBACK_BACKHAUL_OFFERS: BackhaulOffer[] = [];

function asString(value: unknown, fallback = "") {
 const text = String(value || "").trim();
 return text || fallback;
}

function asArray(value: unknown): string[] {
 if (Array.isArray(value)) return value.map((item) => asString(item)).filter(Boolean);
 if (typeof value === "string") {
  return value
   .split(/[,;\n]/)
   .map((item) => item.trim())
   .filter(Boolean);
 }
 return [];
}

function normalizeDestinationRadius(value: unknown) {
 const text = asString(value, "ca. 200 km um Regensburg");
 return text.replace(/(?:100|150) km/g, "200 km");
}

export function normalizeBackhaulOffer(record: any): BackhaulOffer {
 const details = record?.details || {};
 const stored = details?.configuration?.backhaulOffer || details?.backhaulOffer || record || {};
 const now = new Date().toISOString();

 return {
  id: asString(record?.id || stored.id, crypto.randomUUID()),
  routeId: asString(stored.routeId, `RF-${new Date().getFullYear()}`),
  title: asString(stored.title, "Leer-Rückfahrt für Firmen und Privatkunden Richtung Regensburg"),
  date: asString(stored.date),
  dateEnd: asString(stored.dateEnd, stored.date),
  timeWindow: asString(stored.timeWindow, "nach Absprache"),
  origin: asString(stored.origin, "Deutschlandweit auf Anfrage"),
  destination: asString(stored.destination, "Regensburg"),
  intermediateStops: asArray(stored.intermediateStops),
  pickupRadiusKm: Number.isFinite(Number(stored.pickupRadiusKm)) ? Number(stored.pickupRadiusKm) : null,
  destinationRadius: normalizeDestinationRadius(stored.destinationRadius),
  routeAreas: asArray(stored.routeAreas),
  vehicleType: asString(stored.vehicleType, "Transporter oder LKW nach Tour"),
  availableCapacity: asString(stored.availableCapacity, "Büroinventar, Möbel, Kartons, Paletten, Einzelstücke"),
  availableCubicMeters: Number.isFinite(Number(stored.availableCubicMeters)) ? Number(stored.availableCubicMeters) : null,
  loadingArea: asString(stored.loadingArea),
  weightLimitKg: Number.isFinite(Number(stored.weightLimitKg)) ? Number(stored.weightLimitKg) : null,
  requiredHelpers: Number.isFinite(Number(stored.requiredHelpers)) ? Number(stored.requiredHelpers) : null,
  itemTypes: asArray(stored.itemTypes),
  capacityMode: asString(stored.capacityMode, "empty-return") as BackhaulCapacityMode,
  internalNetPrice: Number.isFinite(Number(stored.internalNetPrice)) ? Number(stored.internalNetPrice) : null,
  publicGrossPrice: Number.isFinite(Number(stored.publicGrossPrice)) ? Number(stored.publicGrossPrice) : null,
  vatRate: Number.isFinite(Number(stored.vatRate)) ? Number(stored.vatRate) : 19,
  priceType: asString(stored.priceType, "on-request") as BackhaulPriceType,
  conditions: asString(stored.conditions),
  publicDescription: asString(stored.publicDescription, stored.fairPriceNote),
  publicationStatus: asString(stored.publicationStatus, "unpublished") as BackhaulPublicationStatus,
  priceHint: asString(stored.priceHint, "fairer Rückfahrt-Preis nach Route und Volumen"),
  fairPriceNote: asString(
   stored.fairPriceNote,
   "Der Preis hängt davon ab, ob Strecke, Datum, Volumen und Ladepunkte zur geplanten Rückfahrt Richtung Regensburg passen. Sinnvolle Stopps unterwegs sind möglich; ein Umweg wird vorab transparent besprochen.",
  ),
  status: asString(record?.status || stored.status, "active") as BackhaulOfferStatus,
  adminNote: asString(stored.adminNote),
  createdAt: asString(record?.timestamp || stored.createdAt, now),
  updatedAt: asString(details?.admin?.updatedAt || stored.updatedAt, now),
 };
}

export function buildBackhaulOfferDetails(offer: BackhaulOffer, updatedBy = "dashboard"): IntakePayload {
 return {
  contact: {
   fullName: "FLOXANT Rückfahrt-Angebot",
   email: "",
   phone: "",
   callbackPreference: "intern",
   notes: offer.adminNote || "",
  },
  service: {
   type: "leerfahrt_offer",
   source: "dashboard",
   entryPoint: "/dashboard",
   presetFromUrl: "leerfahrt-rueckfahrt",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Leer-Rückfahrt Angebot",
   valuationStage: "Admin-gepflegte Rückfahrt",
   accuracyState: "Admin-gepflegte Rückfahrt",
   topDrivers: ["Datum", "Route", "freie Fahrzeugkapazität", "Umwegprüfung"],
   priceExplanation:
    "Dieses Angebot beschreibt eine geplante Rückfahrt nach Regensburg und ca. 200 km Umkreis. Kunden erhalten einen fairen Preis, wenn Route, Volumen und Terminfenster passen; sinnvolle Stopps unterwegs werden mit transparentem Umwegpreis geprüft.",
   pricingSignals: {
    routeAreas: offer.routeAreas,
    destinationRadius: offer.destinationRadius,
    availableCapacity: offer.availableCapacity,
   },
  },
  configuration: {
   requestContext: "backhaul_offer",
   backhaulOffer: offer,
  },
  metadata: {
   createdAt: offer.createdAt,
   intakeVersion: "1.2.0",
   source: "dashboard_backhaul_offer",
   servicePresetFromUrl: "leerfahrt-rueckfahrt",
  },
  admin: {
   internalNotes: offer.adminNote,
   updatedAt: offer.updatedAt,
   updatedBy,
   history: [
    {
     status: offer.status,
     note: "Leer-Rückfahrt Angebot gespeichert",
     timestamp: offer.updatedAt,
     user: updatedBy,
    },
   ],
  },
 };
}
