import { getBookingSummary, type BookingRecord } from "@/lib/admin-dashboard/bookings";

export type LeadCompletenessStatus =
  | "sufficient"
  | "multiple_missing"
  | "follow_up_required"
  | "not_assessable";

export type LeadServiceGroup = "cleaning" | "moving" | "clearance" | "general";

export type LeadCompletenessResult = {
  status: LeadCompletenessStatus;
  serviceGroup: LeadServiceGroup;
  present: string[];
  missing: string[];
  notApplicable: string[];
  explanation: string;
};

type Requirement = {
  id: string;
  label: string;
  paths?: string[];
  test?: (booking: BookingRecord) => boolean;
};

const LABELS: Record<LeadCompletenessStatus, string> = {
  sufficient: "Ausreichend beschrieben",
  multiple_missing: "Mehrere Angaben fehlen",
  follow_up_required: "Rückfrage erforderlich",
  not_assessable: "Nicht automatisch bewertbar",
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function valueAt(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => asRecord(value)[segment], source);
}

function hasValue(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined && typeof value === "object" && Object.keys(value as object).length > 0;
}

function hasPath(booking: BookingRecord, paths: string[]): boolean {
  return paths.some((path) => {
    if (path.startsWith("booking.")) return hasValue(valueAt(booking, path.slice(8)));
    return hasValue(valueAt(booking.details, path));
  });
}

function hasContact(booking: BookingRecord): boolean {
  const summary = getBookingSummary(booking);
  return Boolean(summary.name && summary.name !== "Nicht angegeben" && (summary.email || summary.phone));
}

function hasUploads(booking: BookingRecord): boolean {
  if (Array.isArray(booking.file_urls) && booking.file_urls.length > 0) return true;
  if (booking.file_url) return true;
  return hasPath(booking, ["configuration.uploadMetadata", "configuration.rawFields.photos", "configuration.rawFields.hasPhotos"]);
}

function serviceGroup(booking: BookingRecord): LeadServiceGroup {
  const value = String(booking.service || valueAt(booking.details, "service.type") || "").toLowerCase();
  if (/umzug|moving|transport/.test(value)) return "moving";
  if (/entru|räum|raum|clearance|auflos|auflös|entsorgung/.test(value)) return "clearance";
  if (/reinigung|cleaning|pflege/.test(value)) return "cleaning";
  return "general";
}

const commonRequirements: Requirement[] = [
  { id: "contact", label: "Name und Kontaktmöglichkeit", test: hasContact },
  {
    id: "location",
    label: "Ort oder Postleitzahl",
    paths: [
      "configuration.city",
      "configuration.location",
      "configuration.details.location",
      "configuration.rawFields.city",
      "configuration.rawFields.cityOrZip",
      "configuration.rawFields.location",
      "configuration.rawFields.ort",
      "metadata.regionPreset",
    ],
  },
];

const cleaningRequirements: Requirement[] = [
  ...commonRequirements,
  { id: "object", label: "Objektart", paths: ["configuration.objectType", "configuration.details.objectType", "configuration.rawFields.objectType", "configuration.rawFields.propertyType"] },
  { id: "scope", label: "Fläche, Räume oder Leistungsumfang", paths: ["configuration.area", "configuration.size", "configuration.rooms", "configuration.details.area", "configuration.rawFields.area", "configuration.rawFields.size", "configuration.rawFields.squareMeters", "configuration.rawFields.rooms", "configuration.rawFields.details", "contact.notes"] },
  { id: "service", label: "Gewünschte Reinigungsleistung", paths: ["service.type", "configuration.service", "configuration.rawFields.service", "configuration.rawFields.cleaningType"], test: (booking) => Boolean(booking.service) },
  { id: "frequency", label: "Einmalig, Turnus oder Termin", paths: ["configuration.frequency", "configuration.schedule", "configuration.date", "configuration.details.frequency", "configuration.rawFields.frequency", "configuration.rawFields.interval", "configuration.rawFields.date", "configuration.rawFields.preferredDate", "configuration.rawFields.termin"] },
  { id: "conditions", label: "Zugang oder besondere Bedingungen", paths: ["configuration.access", "configuration.conditions", "configuration.details.access", "configuration.rawFields.access", "configuration.rawFields.specialRequirements", "configuration.rawFields.conditions", "contact.notes"] },
  { id: "photos", label: "Fotos, sofern für Zustand oder Umfang relevant", test: hasUploads },
];

const movingRequirements: Requirement[] = [
  { id: "contact", label: "Name und Kontaktmöglichkeit", test: hasContact },
  { id: "start", label: "Startort", paths: ["configuration.fromAddress", "configuration.details.startLocation", "configuration.rawFields.startAddress", "configuration.rawFields.start_address", "startAddress", "calculator_inputs.umzug.fromAddressDetailed"] },
  { id: "destination", label: "Zielort", paths: ["configuration.toAddress", "configuration.details.destinationLocation", "configuration.rawFields.endAddress", "configuration.rawFields.end_address", "endAddress", "calculator_inputs.umzug.toAddressDetailed"] },
  { id: "size", label: "Wohnfläche, Zimmer oder Möbelumfang", paths: ["configuration.area", "configuration.rooms", "configuration.volume", "configuration.rawFields.area", "configuration.rawFields.rooms", "configuration.rawFields.squareMeters", "configuration.rawFields.furniture", "calculator_inputs.umzug.volume"] },
  { id: "floors", label: "Etagen", paths: ["configuration.floors", "configuration.rawFields.floors", "configuration.rawFields.startFloor", "configuration.rawFields.endFloor", "calculator_inputs.umzug.floors"] },
  { id: "elevator", label: "Aufzug", paths: ["configuration.elevator", "configuration.rawFields.elevator", "configuration.rawFields.startElevator", "configuration.rawFields.endElevator"] },
  { id: "date", label: "Gewünschter Termin oder Zeitraum", paths: ["configuration.date", "configuration.schedule", "configuration.rawFields.date", "configuration.rawFields.preferredDate", "configuration.rawFields.termin", "configuration.rawFields.timeframe"] },
  { id: "extras", label: "Gewünschte Zusatzleistungen", paths: ["configuration.extras", "configuration.rawFields.additionalServices", "configuration.rawFields.montage", "configuration.rawFields.packing", "configuration.rawFields.cleaning", "upgrades"], test: (booking) => Array.isArray(booking.upgrades) ? booking.upgrades.length > 0 : hasValue(booking.upgrades) },
];

const clearanceRequirements: Requirement[] = [
  ...commonRequirements,
  { id: "object", label: "Objektart und betroffene Räume", paths: ["configuration.objectType", "configuration.rooms", "configuration.rawFields.objectType", "configuration.rawFields.rooms", "configuration.rawFields.propertyType"] },
  { id: "volume", label: "Menge oder grober Räumungsumfang", paths: ["configuration.volume", "configuration.amount", "configuration.rawFields.volume", "configuration.rawFields.amount", "configuration.rawFields.details", "contact.notes"] },
  { id: "access", label: "Zugang, Etage oder Laufwege", paths: ["configuration.access", "configuration.floors", "configuration.rawFields.access", "configuration.rawFields.floor", "configuration.rawFields.elevator"] },
  { id: "date", label: "Termin oder Frist", paths: ["configuration.date", "configuration.deadline", "configuration.rawFields.date", "configuration.rawFields.deadline", "configuration.rawFields.preferredDate"] },
  { id: "photos", label: "Fotos zur Einordnung des Umfangs", test: hasUploads },
];

const generalRequirements: Requirement[] = [
  ...commonRequirements,
  { id: "service", label: "Gewünschte Leistung", paths: ["service.type", "configuration.service", "configuration.rawFields.service"], test: (booking) => Boolean(booking.service) },
  { id: "description", label: "Kurze Auftragsbeschreibung", paths: ["contact.notes", "configuration.message", "configuration.rawFields.message", "configuration.rawFields.details", "valuation.pricingSignals.customerMessage"] },
  { id: "timing", label: "Termin oder Zeitraum", paths: ["configuration.date", "configuration.schedule", "configuration.rawFields.date", "configuration.rawFields.preferredDate", "configuration.rawFields.timeframe"] },
];

export function getLeadCompletenessLabel(status: LeadCompletenessStatus): string {
  return LABELS[status];
}

export function evaluateLeadCompleteness(booking: BookingRecord): LeadCompletenessResult {
  const group = serviceGroup(booking);
  const requirements = group === "cleaning" ? cleaningRequirements : group === "moving" ? movingRequirements : group === "clearance" ? clearanceRequirements : generalRequirements;
  const present: string[] = [];
  const missing: string[] = [];

  for (const requirement of requirements) {
    const available = requirement.test?.(booking) || (requirement.paths ? hasPath(booking, requirement.paths) : false);
    (available ? present : missing).push(requirement.label);
  }

  const summary = getBookingSummary(booking);
  const noDescription = !summary.message && !hasPath(booking, ["configuration.rawFields.details"]);
  let status: LeadCompletenessStatus;
  if (group === "general" && noDescription) status = "not_assessable";
  else if (missing.includes("Name und Kontaktmöglichkeit") || (group === "moving" && (missing.includes("Startort") || missing.includes("Zielort")))) status = "follow_up_required";
  else if (missing.length > 0) status = "multiple_missing";
  else status = "sufficient";

  return {
    status,
    serviceGroup: group,
    present,
    missing,
    notApplicable: [],
    explanation: status === "sufficient"
      ? "Die wesentlichen Angaben für eine manuelle Prüfung sind erkennbar. Das ist keine Zusage oder Preisbewertung."
      : status === "not_assessable"
        ? "Leistung oder Beschreibung ist nicht eindeutig genug für eine automatische Vollständigkeitsprüfung."
        : "Die aufgeführten Angaben sollten vor Angebot oder Termin manuell geklärt werden.",
  };
}
