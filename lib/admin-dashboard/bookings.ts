export type BookingDetails = Record<string, unknown>;

export interface BookingRecord {
  id: string;
  service: string | null;
  upgrades: unknown;
  details: BookingDetails | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  timestamp: string | null;
  file_url: string | null;
  status: string | null;
  created_at: string | null;
  file_urls: unknown;
}

export interface BookingAdditionalField {
  path: string;
  label: string;
  value: string;
}

export const BOOKING_SELECT = [
  "id",
  "service",
  "upgrades",
  "details",
  "name",
  "email",
  "phone",
  "timestamp",
  "file_url",
  "status",
  "created_at",
  "file_urls",
].join(",");

export const EDITABLE_STATUSES = [
  { value: "new", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "erledigt", label: "Erledigt" },
] as const;

export type EditableBookingStatus = (typeof EDITABLE_STATUSES)[number]["value"];

const STATUS_LABELS: Record<string, string> = {
  new: "Neu",
  in_bearbeitung: "In Bearbeitung",
  erledigt: "Erledigt",
  deleted: "Gelöscht (Altbestand)",
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function valueAt(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => asRecord(value)[segment], source);
}

function firstText(source: unknown, paths: string[]): string {
  for (const path of paths) {
    const value = valueAt(source, path);
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
}

function normalizedTopLevel(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

const SENSITIVE_DETAIL_PATTERN =
  /(?:password|passwort|token|csrf|authorization|auth|secret|api.?key|captcha|honeypot|companywebsite)/i;

function readableFieldLabel(path: string) {
  const key = path.split(".").at(-1) || path;
  const spaced = key
    .replace(/([a-zäöüß])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced ? spaced.charAt(0).toLocaleUpperCase("de-DE") + spaced.slice(1) : path;
}

function displayValue(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null) return "";
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

function flattenAdditionalFields(
  value: unknown,
  path = "",
  result: BookingAdditionalField[] = [],
): BookingAdditionalField[] {
  if (result.length >= 250 || SENSITIVE_DETAIL_PATTERN.test(path)) return result;

  if (Array.isArray(value)) {
    const rendered = displayValue(value);
    if (rendered) result.push({ path, label: readableFieldLabel(path), value: rendered.slice(0, 4000) });
    return result;
  }

  if (value && typeof value === "object") {
    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      const nestedPath = path ? `${path}.${key}` : key;
      flattenAdditionalFields(nestedValue, nestedPath, result);
    }
    return result;
  }

  const rendered = displayValue(value);
  if (rendered) result.push({ path, label: readableFieldLabel(path), value: rendered.slice(0, 4000) });
  return result;
}

export function getAdditionalBookingFields(booking: BookingRecord): BookingAdditionalField[] {
  const details = asRecord(booking.details);
  const configuration = asRecord(details.configuration);
  const originalPayload = asRecord(configuration.originalPayload);
  const originalFields = asRecord(originalPayload.fields);
  const rawFields = asRecord(configuration.rawFields);
  const source = Object.keys(originalFields).length
    ? originalFields
    : Object.keys(rawFields).length
      ? rawFields
      : details;

  return flattenAdditionalFields(source).filter(
    (field) => !["name", "email", "phone", "service", "message", "note", "notes"].includes(field.path),
  );
}

export function getBookingAttachmentUrls(booking: BookingRecord): string[] {
  const details = asRecord(booking.details);
  const configuration = asRecord(details.configuration);
  const uploadMetadata = Array.isArray(configuration.uploadMetadata)
    ? configuration.uploadMetadata
    : [];
  const metadataUrls = uploadMetadata
    .map((entry) => asRecord(entry).publicUrl)
    .filter((value): value is string => typeof value === "string" && Boolean(value.trim()));
  const storedUrls = Array.isArray(booking.file_urls)
    ? booking.file_urls.filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
    : [];
  const legacyUrl = normalizedTopLevel(booking.file_url);

  return Array.from(new Set([...storedUrls, ...metadataUrls, ...(legacyUrl ? [legacyUrl] : [])]));
}

export function getStatusLabel(status: string | null | undefined): string {
  const normalized = normalizedTopLevel(status) || "new";
  if (STATUS_LABELS[normalized]) return STATUS_LABELS[normalized];

  const readable = normalized.replace(/_/g, " ");
  return readable.charAt(0).toUpperCase() + readable.slice(1);
}

export function getServiceLabel(service: string | null | undefined): string {
  const normalized = normalizedTopLevel(service);
  if (!normalized) return "Nicht angegeben";

  const labels: Record<string, string> = {
    b2b_reinigung: "B2B-Reinigung",
    budget_inquiry_quick: "Budget-Anfrage",
    entsorgung: "Entrümpelung / Entsorgung",
    reinigung: "Reinigung",
    umzug: "Umzug",
  };

  if (labels[normalized]) return labels[normalized];
  const readable = normalized.replace(/_/g, " ");
  return readable.charAt(0).toUpperCase() + readable.slice(1);
}

export function getBookingSummary(booking: BookingRecord) {
  const details = asRecord(booking.details);
  const fromLocation = firstText(details, [
    "configuration.fromAddress",
    "configuration.details.startLocation",
    "configuration.rawFields.startAddress",
    "configuration.rawFields.start_address",
    "startAddress",
    "valuation.pricingSignals.startAddress",
    "calculator_inputs.umzug.fromAddressDetailed",
  ]);
  const toLocation = firstText(details, [
    "configuration.toAddress",
    "configuration.details.destinationLocation",
    "configuration.rawFields.endAddress",
    "configuration.rawFields.end_address",
    "endAddress",
    "valuation.pricingSignals.endAddress",
    "calculator_inputs.umzug.toAddressDetailed",
  ]);
  const directLocation = firstText(details, [
    "configuration.city",
    "configuration.location",
    "configuration.details.location",
    "configuration.rawFields.city",
    "configuration.rawFields.location",
    "configuration.rawFields.ort",
    "metadata.regionPreset",
    "service.regionPreset",
  ]);
  const location =
    fromLocation && toLocation
      ? `${fromLocation} → ${toLocation}`
      : fromLocation || toLocation || directLocation;

  return {
    name:
      normalizedTopLevel(booking.name) ||
      firstText(details, ["contact.fullName", "configuration.details.contactName"]) ||
      "Nicht angegeben",
    company: firstText(details, [
      "configuration.company",
      "configuration.companyName",
      "configuration.rawFields.company",
      "configuration.rawFields.companyName",
      "configuration.rawFields.firma",
      "configuration.rawFields.organization",
    ]),
    email: normalizedTopLevel(booking.email) || firstText(details, ["contact.email"]),
    phone: normalizedTopLevel(booking.phone) || firstText(details, ["contact.phone"]),
    location,
    message: firstText(details, [
      "contact.notes",
      "configuration.message",
      "configuration.rawFields.message",
      "configuration.rawFields.note",
      "configuration.rawFields.notes",
      "valuation.pricingSignals.customerMessage",
    ]),
    source: firstText(details, [
      "service.source",
      "metadata.source",
      "configuration.leadSource",
      "configuration.rawFields.leadSource",
      "configuration.rawFields.source",
      "source",
    ]),
    entryPoint: firstText(details, [
      "service.entryPoint",
      "configuration.entryPoint",
      "metadata.clientContext.entryPoint",
      "configuration.rawFields.landingPage",
      "configuration.rawFields.sourcePage",
    ]),
    service: getServiceLabel(booking.service || firstText(details, ["service.type"])),
    date: normalizedTopLevel(booking.timestamp) || normalizedTopLevel(booking.created_at),
    status: normalizedTopLevel(booking.status) || "new",
  };
}

export function getBookingSearchText(booking: BookingRecord): string {
  const summary = getBookingSummary(booking);
  return [
    booking.id,
    summary.name,
    summary.company,
    summary.email,
    summary.phone,
    summary.location,
    summary.message,
    summary.source,
    summary.entryPoint,
    summary.service,
    getStatusLabel(summary.status),
  ]
    .join(" ")
    .toLocaleLowerCase("de-DE");
}

export function formatBookingDate(value: string): string {
  if (!value) return "Nicht angegeben";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
