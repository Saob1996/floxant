import type { IntakePayload } from "@/lib/types/intake";

export type BackhaulOfferStatus = "active" | "paused" | "draft" | "archived";

export interface BackhaulOffer {
 id: string;
 title: string;
 date: string;
 timeWindow: string;
 origin: string;
 destination: string;
 destinationRadius: string;
 routeAreas: string[];
 vehicleType: string;
 availableCapacity: string;
 priceHint: string;
 fairPriceNote: string;
 status: BackhaulOfferStatus;
 adminNote?: string;
 createdAt: string;
 updatedAt: string;
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
 const text = asString(value, "ca. 150 km um Regensburg");
 return text.replace("100 km", "150 km");
}

export function normalizeBackhaulOffer(record: any): BackhaulOffer {
 const details = record?.details || {};
 const stored = details?.configuration?.backhaulOffer || details?.backhaulOffer || record || {};
 const now = new Date().toISOString();

 return {
  id: asString(record?.id || stored.id, crypto.randomUUID()),
  title: asString(stored.title, "Leer-Rückfahrt für Firmen und Privatkunden Richtung Regensburg"),
  date: asString(stored.date),
  timeWindow: asString(stored.timeWindow, "nach Absprache"),
  origin: asString(stored.origin, "Deutschlandweit auf Anfrage"),
  destination: asString(stored.destination, "Regensburg"),
  destinationRadius: normalizeDestinationRadius(stored.destinationRadius),
  routeAreas: asArray(stored.routeAreas),
  vehicleType: asString(stored.vehicleType, "Transporter oder LKW nach Tour"),
  availableCapacity: asString(stored.availableCapacity, "Büroinventar, Möbel, Kartons, Paletten, Einzelstücke"),
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
    "Dieses Angebot beschreibt eine geplante Rückfahrt nach Regensburg und ca. 150 km Umkreis. Kunden erhalten einen fairen Preis, wenn Route, Volumen und Terminfenster passen; sinnvolle Stopps unterwegs werden mit transparentem Umwegpreis geprüft.",
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
