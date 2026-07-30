import { getBookingSummary, type BookingRecord } from "@/lib/admin-dashboard/bookings";

export type LeadCompletenessStatus =
  | "sufficient"
  | "multiple_missing"
  | "follow_up_required"
  | "not_assessable";

export type LeadServiceGroup = "cleaning" | "moving" | "clearance" | "general";

export type RecommendedNextStep =
  | "Telefonisch zurückfragen"
  | "Fotos anfordern"
  | "Start- und Zieladresse klären"
  | "Fläche oder Umfang klären"
  | "Termin abstimmen"
  | "Besichtigung prüfen"
  | "Angebot vorbereiten";

export type LeadCompletenessResult = {
  status: LeadCompletenessStatus;
  serviceGroup: LeadServiceGroup;
  present: string[];
  missing: string[];
  recommendedNextStep: RecommendedNextStep;
  explanation: string;
};

type Requirement = {
  id: string;
  label: string;
  paths?: string[];
  test?: (booking: BookingRecord, details: Record<string, unknown>) => boolean;
};

const LABELS: Record<LeadCompletenessStatus, string> = {
  sufficient: "Ausreichend beschrieben",
  multiple_missing: "Mehrere Angaben fehlen",
  follow_up_required: "Rückfrage erforderlich",
  not_assessable: "Nicht automatisch beurteilbar",
};

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function valueAt(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    const record = asRecord(value);
    return record[segment];
  }, source);
}

function hasValue(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.some(hasValue);
  return Object.keys(asRecord(value)).length > 0;
}

function hasPath(
  booking: BookingRecord,
  details: Record<string, unknown>,
  paths: string[],
): boolean {
  return paths.some((path) => {
    if (path.startsWith("booking.")) {
      return hasValue(valueAt(booking, path.slice("booking.".length)));
    }
    return hasValue(valueAt(details, path));
  });
}

function hasContact(booking: BookingRecord): boolean {
  return Boolean(
    String(booking.name || "").trim() &&
      (String(booking.email || "").trim() || String(booking.phone || "").trim()),
  );
}

function detectServiceGroup(
  booking: BookingRecord,
  details: Record<string, unknown>,
): LeadServiceGroup {
  const service = [
    booking.service,
    valueAt(details, "service.type"),
    valueAt(details, "configuration.service"),
    valueAt(details, "configuration.rawFields.serviceCategory"),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/umzug|moving|transport/.test(service)) return "moving";
  if (/entrü|entru|räum|raum|clearance|auflös|auflos|entsorgung/.test(service)) {
    return "clearance";
  }
  if (/reinigung|cleaning|pflege/.test(service)) return "cleaning";
  return "general";
}

const locationPaths = [
  "configuration.cleaningRequest.location",
  "configuration.location",
  "configuration.city",
  "configuration.rawFields.cityOrZip",
  "configuration.rawFields.city",
  "configuration.rawFields.location",
  "service.regionPreset",
];

const datePaths = [
  "configuration.desiredDate",
  "configuration.date",
  "configuration.schedule",
  "configuration.deadline",
  "configuration.rawFields.desiredDate",
  "configuration.rawFields.date",
  "configuration.rawFields.preferredDate",
  "configuration.rawFields.timeframe",
  "configuration.cleaningRequest.schedule.preferredDate",
  "configuration.cleaningRequest.schedule.timeWindow",
];

const commonContact: Requirement = {
  id: "contact",
  label: "Kontakt",
  test: hasContact,
};

const movingRequirements: Requirement[] = [
  {
    id: "start",
    label: "Startort",
    paths: [
      "configuration.startLocation",
      "configuration.fromAddress",
      "configuration.details.startLocation",
      "configuration.rawFields.startLocation",
      "configuration.rawFields.startAddress",
      "calculator_inputs.umzug.fromAddressDetailed",
    ],
  },
  {
    id: "destination",
    label: "Zielort",
    paths: [
      "configuration.destinationLocation",
      "configuration.toAddress",
      "configuration.details.destinationLocation",
      "configuration.rawFields.destinationLocation",
      "configuration.rawFields.endAddress",
      "calculator_inputs.umzug.toAddressDetailed",
    ],
  },
  { id: "date", label: "Zeitraum", paths: datePaths },
  {
    id: "scope",
    label: "Umfang",
    paths: [
      "configuration.scope",
      "configuration.areaSize",
      "configuration.rooms",
      "configuration.volume",
      "configuration.rawFields.scope",
      "configuration.rawFields.areaSize",
      "configuration.rawFields.rooms",
      "configuration.rawFields.furniture",
      "calculator_inputs.umzug.volume",
      "contact.notes",
    ],
  },
  {
    id: "floors",
    label: "Etagen",
    paths: [
      "configuration.startFloor",
      "configuration.destinationFloor",
      "configuration.floors",
      "configuration.rawFields.startFloor",
      "configuration.rawFields.destinationFloor",
      "configuration.rawFields.floors",
    ],
  },
  {
    id: "elevator",
    label: "Aufzug",
    paths: [
      "configuration.startElevator",
      "configuration.destinationElevator",
      "configuration.elevator",
      "configuration.rawFields.startElevator",
      "configuration.rawFields.destinationElevator",
      "configuration.rawFields.elevator",
    ],
  },
  commonContact,
];

const cleaningRequirements: Requirement[] = [
  { id: "location", label: "Ort", paths: locationPaths },
  {
    id: "object",
    label: "Objektart",
    paths: [
      "configuration.cleaningRequest.object.objectType",
      "configuration.objectType",
      "configuration.rawFields.objectType",
      "configuration.rawFields.propertyType",
    ],
  },
  {
    id: "scope",
    label: "Fläche oder Umfang",
    paths: [
      "configuration.cleaningRequest.scope.areaSqm",
      "configuration.cleaningRequest.scope.rooms",
      "configuration.areaSize",
      "configuration.area",
      "configuration.size",
      "configuration.rooms",
      "configuration.scope",
      "configuration.rawFields.areaSize",
      "configuration.rawFields.area",
      "configuration.rawFields.squareMeters",
      "configuration.rawFields.rooms",
      "configuration.rawFields.scope",
      "contact.notes",
    ],
  },
  {
    id: "service",
    label: "Leistung",
    paths: [
      "service.type",
      "configuration.cleaningRequest.serviceType",
      "configuration.service",
      "configuration.rawFields.cleaningType",
    ],
    test: (booking) => Boolean(String(booking.service || "").trim()),
  },
  {
    id: "frequency",
    label: "Einmalig oder regelmäßig",
    paths: [
      "configuration.cleaningRequest.schedule.frequency",
      "configuration.cleaningFrequency",
      "configuration.frequency",
      "configuration.rawFields.cleaningFrequency",
      "configuration.rawFields.frequency",
      "configuration.rawFields.interval",
    ],
  },
  { id: "date", label: "Termin oder Turnus", paths: datePaths },
  commonContact,
];

const clearanceRequirements: Requirement[] = [
  { id: "location", label: "Ort", paths: locationPaths },
  {
    id: "object",
    label: "Objektart",
    paths: [
      "configuration.objectType",
      "configuration.rawFields.objectType",
      "configuration.rawFields.propertyType",
    ],
  },
  {
    id: "size",
    label: "Größe",
    paths: [
      "configuration.areaSize",
      "configuration.area",
      "configuration.size",
      "configuration.rawFields.areaSize",
      "configuration.rawFields.area",
      "configuration.rawFields.squareMeters",
    ],
  },
  {
    id: "floor",
    label: "Etage",
    paths: [
      "configuration.floor",
      "configuration.rawFields.floor",
      "configuration.rawFields.floors",
    ],
  },
  {
    id: "scope",
    label: "Umfang",
    paths: [
      "configuration.scope",
      "configuration.volume",
      "configuration.amount",
      "configuration.rawFields.scope",
      "configuration.rawFields.volume",
      "configuration.rawFields.amount",
      "contact.notes",
    ],
  },
  { id: "date", label: "Gewünschter Zeitraum", paths: datePaths },
  commonContact,
];

const generalRequirements: Requirement[] = [
  { id: "location", label: "Ort", paths: locationPaths },
  {
    id: "service",
    label: "Gewünschte Leistung",
    paths: ["service.type", "configuration.service", "configuration.rawFields.service"],
    test: (booking) => Boolean(String(booking.service || "").trim()),
  },
  {
    id: "description",
    label: "Kurze Auftragsbeschreibung",
    paths: [
      "contact.notes",
      "configuration.message",
      "configuration.scope",
      "configuration.rawFields.message",
      "configuration.rawFields.details",
    ],
  },
  commonContact,
];

function chooseNextStep(
  group: LeadServiceGroup,
  status: LeadCompletenessStatus,
  missingIds: string[],
): RecommendedNextStep {
  if (status === "sufficient") return "Angebot vorbereiten";
  if (group === "moving" && (missingIds.includes("start") || missingIds.includes("destination"))) {
    return "Start- und Zieladresse klären";
  }
  if (missingIds.includes("scope") || missingIds.includes("size") || missingIds.includes("object")) {
    return "Fläche oder Umfang klären";
  }
  if (missingIds.includes("date") || missingIds.includes("frequency")) {
    return "Termin abstimmen";
  }
  if (missingIds.includes("contact")) return "Telefonisch zurückfragen";
  if (group === "clearance") return "Fotos anfordern";
  if (group === "general") return "Besichtigung prüfen";
  return "Telefonisch zurückfragen";
}

export function getLeadCompletenessLabel(status: LeadCompletenessStatus): string {
  return LABELS[status];
}

export function evaluateLeadCompleteness(
  booking: BookingRecord,
): LeadCompletenessResult {
  const details = asRecord(booking.details);
  const serviceGroup = detectServiceGroup(booking, details);
  const requirements =
    serviceGroup === "moving"
      ? movingRequirements
      : serviceGroup === "cleaning"
        ? cleaningRequirements
        : serviceGroup === "clearance"
          ? clearanceRequirements
          : generalRequirements;

  const present: string[] = [];
  const missing: string[] = [];
  const missingIds: string[] = [];

  for (const requirement of requirements) {
    const available =
      requirement.test?.(booking, details) ||
      (requirement.paths ? hasPath(booking, details, requirement.paths) : false);
    if (available) {
      present.push(requirement.label);
    } else {
      missing.push(requirement.label);
      missingIds.push(requirement.id);
    }
  }

  const summary = getBookingSummary(booking);
  const cannotAssess =
    serviceGroup === "general" &&
    (!summary.service ||
      summary.service === "Sonstige Anfrage" ||
      missingIds.includes("description"));
  const criticalMissing =
    missingIds.includes("contact") ||
    (serviceGroup === "moving" &&
      (missingIds.includes("start") || missingIds.includes("destination")));

  const status: LeadCompletenessStatus = cannotAssess
    ? "not_assessable"
    : criticalMissing
      ? "follow_up_required"
      : missing.length
        ? "multiple_missing"
        : "sufficient";

  return {
    status,
    serviceGroup,
    present,
    missing,
    recommendedNextStep: chooseNextStep(serviceGroup, status, missingIds),
    explanation:
      status === "sufficient"
        ? "Die fachlichen Kernangaben sind vorhanden. Das ist keine Preis- oder Terminzusage."
        : status === "not_assessable"
          ? "Leistung oder Beschreibung ist für eine automatische Vollständigkeitsprüfung nicht eindeutig genug."
          : "Die aufgeführten fachlichen Angaben sollten vor Angebot oder Termin manuell geklärt werden.",
  };
}
