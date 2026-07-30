import {
  getAdminFieldLabel,
  isSensitiveAdminField,
} from "./field-labels";
import type { BookingRecord } from "./bookings";

export type AdminDisplayValue =
  | string
  | number
  | boolean
  | AdminDisplayValue[]
  | { [key: string]: AdminDisplayValue };

export type AdminDetailItem = {
  label: string;
  path: string;
  value: AdminDisplayValue;
};

export type AdminDetailSection = {
  id: string;
  title: string;
  items: AdminDetailItem[];
};

export type AdminBookingFile = {
  url: string;
  name: string;
  contentType: string;
  isImage: boolean;
};

export type AdminBookingDetailView = {
  sections: AdminDetailSection[];
  files: AdminBookingFile[];
  additionalItems: AdminDetailItem[];
};

type UnknownRecord = Record<string, unknown>;

const SENSITIVE_FILE_QUERY_KEYS = new Set([
  "access_token",
  "apikey",
  "authorization",
  "key",
  "secret",
  "signature",
  "token",
]);

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function parseJson(value: unknown): unknown {
  if (typeof value !== "string" || !value.trim()) return value;
  try {
    return JSON.parse(value);
  } catch {
    return value.trim();
  }
}

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.every(isEmpty);
  if (typeof value === "object") return Object.values(value as UnknownRecord).every(isEmpty);
  return false;
}

function toDisplayValue(value: unknown): AdminDisplayValue | null {
  const parsed = parseJson(value);
  if (isEmpty(parsed)) return null;
  if (typeof parsed === "string" || typeof parsed === "number" || typeof parsed === "boolean") {
    return parsed;
  }
  if (Array.isArray(parsed)) {
    const items = parsed
      .map(toDisplayValue)
      .filter((item): item is AdminDisplayValue => item !== null);
    return items.length ? items : null;
  }
  if (parsed && typeof parsed === "object") {
    const entries = Object.entries(parsed as UnknownRecord)
      .filter(([key]) => !isSensitiveAdminField(key))
      .map(([key, item]) => [getAdminFieldLabel(key), toDisplayValue(item)] as const)
      .filter((entry): entry is readonly [string, AdminDisplayValue] => entry[1] !== null);
    return entries.length ? Object.fromEntries(entries) : null;
  }
  return null;
}

function valueAt(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    return (value as UnknownRecord)[segment];
  }, source);
}

function normalizeDetails(value: unknown): {
  record: UnknownRecord;
  legacyText: string;
} {
  const parsed = parseJson(value);
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    return { record: parsed as UnknownRecord, legacyText: "" };
  }
  return {
    record: {},
    legacyText: typeof parsed === "string" ? parsed.trim() : "",
  };
}

function firstValue(
  details: UnknownRecord,
  paths: string[],
  consumed: Set<string>,
): { path: string; value: AdminDisplayValue } | null {
  for (const path of paths) {
    const displayValue = toDisplayValue(valueAt(details, path));
    if (displayValue !== null) {
      consumed.add(path);
      return { path, value: displayValue };
    }
  }
  return null;
}

function item(
  label: string,
  details: UnknownRecord,
  paths: string[],
  consumed: Set<string>,
): AdminDetailItem | null {
  const result = firstValue(details, paths, consumed);
  return result ? { label, path: result.path, value: result.value } : null;
}

function staticItem(label: string, path: string, value: unknown): AdminDetailItem | null {
  const displayValue = toDisplayValue(value);
  return displayValue === null ? null : { label, path, value: displayValue };
}

function compactItems(items: Array<AdminDetailItem | null>): AdminDetailItem[] {
  return items.filter((item): item is AdminDetailItem => item !== null);
}

function flattenUnknown(
  value: unknown,
  prefix: string,
  consumed: Set<string>,
  output: AdminDetailItem[],
): void {
  if (isSensitiveAdminField(prefix) || isEmpty(value)) return;
  const parsed = parseJson(value);

  if (Array.isArray(parsed)) {
    const displayValue = toDisplayValue(parsed);
    if (displayValue !== null && !consumed.has(prefix)) {
      output.push({
        label: getAdminFieldLabel(prefix),
        path: prefix,
        value: displayValue,
      });
    }
    return;
  }

  if (parsed && typeof parsed === "object") {
    for (const [key, child] of Object.entries(parsed as UnknownRecord)) {
      const path = prefix ? `${prefix}.${key}` : key;
      flattenUnknown(child, path, consumed, output);
    }
    return;
  }

  if (!consumed.has(prefix)) {
    const displayValue = toDisplayValue(parsed);
    if (displayValue !== null) {
      output.push({
        label: getAdminFieldLabel(prefix),
        path: prefix,
        value: displayValue,
      });
    }
  }
}

function parseFileUrlValues(value: unknown): string[] {
  const parsed = parseJson(value);
  if (typeof parsed === "string") return parsed.trim() ? [parsed.trim()] : [];
  if (Array.isArray(parsed)) return parsed.flatMap(parseFileUrlValues);
  return [];
}

function safePublicFileUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return "";
    if ([...url.searchParams.keys()].some((key) => SENSITIVE_FILE_QUERY_KEYS.has(key.toLowerCase()))) {
      return "";
    }

    const hostname = url.hostname.toLowerCase();
    if (hostname === "floxant.de" || hostname === "www.floxant.de") return url.toString();
    if (
      hostname.endsWith(".supabase.co") &&
      url.pathname.startsWith("/storage/v1/object/public/")
    ) {
      return url.toString();
    }
    return "";
  } catch {
    return "";
  }
}

function fileNameFromUrl(url: string): string {
  try {
    const name = decodeURIComponent(new URL(url).pathname.split("/").at(-1) || "Datei");
    return name.replace(/^\d+_/, "") || "Datei";
  } catch {
    return "Datei";
  }
}

function inferContentType(url: string, declared = ""): string {
  if (declared.trim()) return declared.trim().toLowerCase();
  const pathname = new URL(url).pathname.toLowerCase();
  if (/\.(jpe?g)$/.test(pathname)) return "image/jpeg";
  if (/\.png$/.test(pathname)) return "image/png";
  if (/\.webp$/.test(pathname)) return "image/webp";
  if (/\.pdf$/.test(pathname)) return "application/pdf";
  return "application/octet-stream";
}

function collectFiles(booking: BookingRecord, details: UnknownRecord): AdminBookingFile[] {
  const candidates: Array<{ url: string; name?: string; contentType?: string }> = [
    ...parseFileUrlValues(booking.file_url).map((url) => ({ url })),
    ...parseFileUrlValues(booking.file_urls).map((url) => ({ url })),
  ];

  const uploadMetadata = valueAt(details, "configuration.uploadMetadata");
  if (Array.isArray(uploadMetadata)) {
    for (const upload of uploadMetadata) {
      const record = asRecord(upload);
      const url = typeof record.publicUrl === "string" ? record.publicUrl : "";
      if (url) {
        candidates.push({
          url,
          name: typeof record.originalName === "string" ? record.originalName : undefined,
          contentType: typeof record.contentType === "string" ? record.contentType : undefined,
        });
      }
    }
  }

  const unique = new Map<string, AdminBookingFile>();
  for (const candidate of candidates) {
    const url = safePublicFileUrl(candidate.url);
    if (!url || unique.has(url)) continue;
    const contentType = inferContentType(url, candidate.contentType);
    unique.set(url, {
      url,
      name: candidate.name?.trim() || fileNameFromUrl(url),
      contentType,
      isImage: contentType.startsWith("image/"),
    });
  }
  return [...unique.values()];
}

export function buildAdminBookingDetailView(
  booking: BookingRecord,
): AdminBookingDetailView {
  const { record: details, legacyText } = normalizeDetails(booking.details);
  const consumed = new Set<string>();
  const upgrades = toDisplayValue(parseJson(booking.upgrades));

  const sections: AdminDetailSection[] = [
    {
      id: "overview",
      title: "Anfrageübersicht",
      items: compactItems([
        staticItem("Name", "name", booking.name),
        staticItem("Anfrage-ID", "id", booking.id),
        staticItem("Eingangsdatum", "timestamp", booking.timestamp || booking.created_at),
        staticItem("Anfrageart", "service", booking.service),
        item(
          "Sprache",
          details,
          [
            "configuration.cleaningRequest.locale",
            "metadata.locale",
            "metadata.clientContext.locale",
            "configuration.locale",
            "configuration.rawFields.locale",
            "configuration.rawFields.language",
          ],
          consumed,
        ),
        staticItem("Status", "status", booking.status || "new"),
        item(
          "Quelle",
          details,
          [
            "configuration.cleaningRequest.source",
            "service.source",
            "metadata.source",
            "configuration.leadSource",
            "configuration.rawFields.leadSource",
            "configuration.rawFields.source",
            "source",
          ],
          consumed,
        ),
        item(
          "Formular",
          details,
          [
            "configuration.requestContext",
            "configuration.leadType",
            "configuration.formType",
            "configuration.rawFields.lead_type",
            "configuration.rawFields.form_type",
            "configuration.rawFields.type",
            "form_type",
            "metadata.intakeVersion",
          ],
          consumed,
        ),
        item(
          "Einstiegsseite",
          details,
          [
            "configuration.cleaningRequest.entryPage",
            "service.entryPoint",
            "configuration.landingPage",
            "configuration.sourcePage",
            "configuration.entryPoint",
            "metadata.clientContext.landingPage",
            "metadata.clientContext.entryPoint",
            "configuration.rawFields.landingPage",
            "configuration.rawFields.sourcePage",
            "configuration.rawFields.entryPage",
            "configuration.rawFields.entry_page",
            "entry_page",
          ],
          consumed,
        ),
        item(
          "Kampagne",
          details,
          [
            "metadata.clientContext.campaign",
            "configuration.campaign",
            "configuration.googleAdsCampaign",
            "configuration.rawFields.campaign",
            "configuration.rawFields.utmCampaign",
            "configuration.rawFields.utm_campaign",
          ],
          consumed,
        ),
      ]),
    },
    {
      id: "contact",
      title: "Kontakt",
      items: compactItems([
        staticItem("E-Mail", "email", booking.email),
        staticItem("Telefonnummer", "phone", booking.phone),
        item(
          "Firma",
          details,
          [
            "configuration.cleaningRequest.contact.company",
            "configuration.companyName",
            "configuration.company",
            "valuation.pricingSignals.companyName",
            "configuration.rawFields.companyName",
            "configuration.rawFields.company",
          ],
          consumed,
        ),
        item(
          "Bevorzugter Kontaktweg",
          details,
          [
            "configuration.cleaningRequest.contact.preferredMethod",
            "contact.callbackPreference",
            "configuration.preferredContact",
            "configuration.preferredContactMethod",
            "configuration.rawFields.preferredContact",
            "configuration.rawFields.preferredContactMethod",
            "configuration.rawFields.contactMethod",
          ],
          consumed,
        ),
      ]),
    },
    {
      id: "location",
      title: "Ort oder Route",
      items: compactItems([
        item(
          "Ort",
          details,
          [
            "configuration.cleaningRequest.location",
            "configuration.location",
            "configuration.city",
            "configuration.objectLocation",
            "configuration.rawFields.cityOrZip",
            "configuration.rawFields.city",
            "configuration.rawFields.location",
            "service.regionPreset",
          ],
          consumed,
        ),
        item(
          "PLZ",
          details,
          [
            "configuration.cleaningRequest.postalCode",
            "configuration.postalCode",
            "configuration.zip",
            "configuration.rawFields.postalCode",
            "configuration.rawFields.zip",
          ],
          consumed,
        ),
        item(
          "Objektadresse",
          details,
          [
            "configuration.address",
            "configuration.objectAddress",
            "configuration.rawFields.address",
          ],
          consumed,
        ),
        item(
          "Startort",
          details,
          [
            "configuration.fromAddress",
            "configuration.startLocation",
            "configuration.details.startLocation",
            "valuation.pricingSignals.startAddress",
            "calculator_inputs.umzug.fromAddressDetailed",
            "configuration.rawFields.startLocation",
            "configuration.rawFields.startAddress",
          ],
          consumed,
        ),
        item(
          "Start-PLZ",
          details,
          [
            "configuration.startPostalCode",
            "configuration.rawFields.startPostalCode",
            "configuration.rawFields.startZip",
          ],
          consumed,
        ),
        item(
          "Zielort",
          details,
          [
            "configuration.toAddress",
            "configuration.destinationLocation",
            "configuration.details.destinationLocation",
            "valuation.pricingSignals.endAddress",
            "calculator_inputs.umzug.toAddressDetailed",
            "configuration.rawFields.destination",
            "configuration.rawFields.destinationLocation",
            "configuration.rawFields.endAddress",
          ],
          consumed,
        ),
        item(
          "Ziel-PLZ",
          details,
          [
            "configuration.destinationPostalCode",
            "configuration.rawFields.destinationPostalCode",
            "configuration.rawFields.destinationZip",
          ],
          consumed,
        ),
        item(
          "Startetage",
          details,
          [
            "configuration.startFloor",
            "configuration.fromFloor",
            "configuration.rawFields.startFloor",
          ],
          consumed,
        ),
        item(
          "Zieletage",
          details,
          [
            "configuration.destinationFloor",
            "configuration.toFloor",
            "configuration.rawFields.destinationFloor",
          ],
          consumed,
        ),
        item(
          "Aufzug am Startort",
          details,
          [
            "configuration.hasElevatorFrom",
            "configuration.startElevator",
            "configuration.rawFields.hasElevatorStart",
            "configuration.rawFields.startElevator",
          ],
          consumed,
        ),
        item(
          "Aufzug am Zielort",
          details,
          [
            "configuration.hasElevatorTo",
            "configuration.destinationElevator",
            "configuration.rawFields.hasElevatorDestination",
            "configuration.rawFields.destinationElevator",
          ],
          consumed,
        ),
        item(
          "Objektart",
          details,
          [
            "configuration.cleaningRequest.propertyType",
            "configuration.propertyType",
            "configuration.objectType",
            "valuation.pricingSignals.propertyType",
            "configuration.rawFields.propertyType",
            "configuration.rawFields.objectType",
          ],
          consumed,
        ),
        item(
          "Fläche",
          details,
          [
            "configuration.cleaningRequest.area",
            "configuration.areaM2",
            "configuration.areaSize",
            "configuration.areaRange",
            "configuration.spaceRange",
            "valuation.pricingSignals.areaM2",
            "valuation.pricingSignals.areaRange",
            "configuration.rawFields.area",
            "configuration.rawFields.areaSize",
          ],
          consumed,
        ),
        item(
          "Räume",
          details,
          [
            "configuration.cleaningRequest.rooms",
            "configuration.roomsCount",
            "configuration.rooms",
            "configuration.rawFields.roomsCount",
            "configuration.rawFields.rooms",
          ],
          consumed,
        ),
      ]),
    },
    {
      id: "schedule",
      title: "Termin und Zeitraum",
      items: compactItems([
        item(
          "Gewünschtes Datum",
          details,
          [
            "configuration.cleaningRequest.preferredDate",
            "configuration.preferredDate",
            "configuration.desiredDate",
            "configuration.moveDate",
            "configuration.date",
            "valuation.pricingSignals.requestedDate",
            "configuration.rawFields.preferredDate",
            "configuration.rawFields.desiredDate",
          ],
          consumed,
        ),
        item(
          "Zeitraum",
          details,
          [
            "configuration.cleaningRequest.accessTimes",
            "configuration.timeWindow",
            "configuration.preferredWindow",
            "configuration.preferredCleaningTime",
            "configuration.rawFields.timeWindow",
            "configuration.rawFields.preferredCleaningTime",
          ],
          consumed,
        ),
        item(
          "Flexibilität",
          details,
          [
            "configuration.cleaningRequest.flexibility",
            "configuration.flexibility",
            "configuration.dateFlexibility",
            "configuration.rawFields.dateFlexibility",
          ],
          consumed,
        ),
        item(
          "Turnus",
          details,
          [
            "configuration.cleaningRequest.frequency",
            "configuration.recurringFrequency",
            "configuration.cleaningFrequency",
            "configuration.cadence",
            "valuation.pricingSignals.cadence",
            "configuration.rawFields.cleaningFrequency",
            "configuration.rawFields.frequency",
          ],
          consumed,
        ),
      ]),
    },
    {
      id: "service",
      title: "Leistung und Umfang",
      items: compactItems([
        item(
          "Hauptleistung",
          details,
          [
            "configuration.cleaningRequest.service",
            "service.type",
            "configuration.serviceLabel",
            "configuration.requestedService",
            "configuration.rawFields.requestedService",
          ],
          consumed,
        ),
        item(
          "Unterleistung",
          details,
          [
            "configuration.serviceScope",
            "configuration.rawFields.serviceScope",
            "configuration.rawFields.cleaningType",
          ],
          consumed,
        ),
        item(
          "Umfang",
          details,
          [
            "configuration.scopeSummary",
            "configuration.scope",
            "valuation.pricingSignals.scopeSummary",
            "configuration.rawFields.scope",
          ],
          consumed,
        ),
        staticItem("Ausgewählte Zusatzleistungen", "upgrades", upgrades),
        item(
          "Weitere Zusatzleistungen",
          details,
          [
            "configuration.cleaningRequest.selectedServices",
            "configuration.selectedAddons",
            "configuration.selectedServices",
            "configuration.selectedUpgrades",
            "configuration.rawFields.selectedAddons",
            "configuration.rawFields.selectedServices",
          ],
          consumed,
        ),
        item(
          "Kartons",
          details,
          [
            "configuration.boxesCount",
            "valuation.pricingSignals.boxesCount",
            "configuration.rawFields.boxesCount",
          ],
          consumed,
        ),
        item(
          "Möbel und Gegenstände",
          details,
          [
            "configuration.items",
            "configuration.itemDescription",
            "configuration.furnitureList",
            "configuration.rawFields.itemDescription",
          ],
          consumed,
        ),
        item(
          "Maße",
          details,
          [
            "configuration.dimensions",
            "configuration.itemDimensions",
            "configuration.rawFields.dimensions",
            "configuration.rawFields.itemDimensions",
            "configuration.rawFields.measurements",
          ],
          consumed,
        ),
        item(
          "Restgegenstände",
          details,
          [
            "configuration.remainingItems",
            "configuration.openItems",
            "configuration.rawFields.remainingItems",
            "configuration.rawFields.openItems",
            "configuration.rawFields.itemDescription",
          ],
          consumed,
        ),
        item(
          "Demontage",
          details,
          [
            "configuration.disassemblyService",
            "configuration.disassemblyRequired",
            "configuration.rawFields.disassembly",
          ],
          consumed,
        ),
        item(
          "Montage",
          details,
          [
            "configuration.assemblyService",
            "configuration.rawFields.assemblyService",
          ],
          consumed,
        ),
        item(
          "Verpackung",
          details,
          [
            "configuration.packingService",
            "configuration.rawFields.packing",
          ],
          consumed,
        ),
        item(
          "Entrümpelung",
          details,
          [
            "configuration.disposalRequested",
            "configuration.entsorgung",
            "configuration.rawFields.disposalRequested",
          ],
          consumed,
        ),
        item(
          "Reinigung",
          details,
          [
            "configuration.cleaningRequested",
            "configuration.reinigung",
            "configuration.rawFields.cleaningRequested",
          ],
          consumed,
        ),
        item(
          "Fenster und Glasflächen",
          details,
          [
            "configuration.windowsCount",
            "configuration.specialAreas",
            "configuration.rawFields.windowsCount",
            "configuration.rawFields.specialAreas",
          ],
          consumed,
        ),
        item(
          "Material",
          details,
          [
            "configuration.material",
            "configuration.materialTypes",
            "configuration.rawFields.materialTypes",
          ],
          consumed,
        ),
      ]),
    },
    {
      id: "description",
      title: "Beschreibung",
      items: compactItems([
        item(
          "Nachricht",
          details,
          [
            "configuration.cleaningRequest.message",
            "configuration.legacyDetailsText",
            "contact.notes",
            "configuration.message",
            "configuration.customerMessage",
            "valuation.pricingSignals.customerMessage",
            "configuration.rawFields.message",
            "configuration.rawFields.note",
          ],
          consumed,
        ),
        item(
          "Strukturierte Beschreibung",
          details,
          [
            "configuration.requestSummary",
            "configuration.leadDetails",
            "valuation.priceExplanation",
            "configuration.rawFields.requestSummary",
          ],
          consumed,
        ),
        item(
          "Zusätzliche Hinweise",
          details,
          [
            "configuration.cleaningRequest.specialConditions",
            "configuration.specialNotes",
            "configuration.accessNotes",
            "configuration.note",
            "configuration.rawFields.specialNotes",
            "configuration.rawFields.accessNotes",
          ],
          consumed,
        ),
        item(
          "Offene Angaben",
          details,
          [
            "configuration.missingInfoFlags",
            "configuration.rawFields.missingInfoFlags",
            "metadata.clientContext.missingInfoFlags",
          ],
          consumed,
        ),
        staticItem("Ältere Beschreibung", "details", legacyText),
      ]),
    },
    {
      id: "campaign",
      title: "Kampagnendaten",
      items: compactItems([
        item(
          "UTM Source",
          details,
          [
            "configuration.cleaningRequest.campaign.utmSource",
            "configuration.attribution.utm_source",
            "metadata.attribution.utm_source",
            "metadata.clientContext.utmSource",
            "configuration.utmSource",
            "configuration.rawFields.utmSource",
            "configuration.rawFields.utm_source",
          ],
          consumed,
        ),
        item(
          "UTM Medium",
          details,
          [
            "configuration.cleaningRequest.campaign.utmMedium",
            "configuration.attribution.utm_medium",
            "metadata.attribution.utm_medium",
            "metadata.clientContext.utmMedium",
            "configuration.utmMedium",
            "configuration.rawFields.utmMedium",
            "configuration.rawFields.utm_medium",
          ],
          consumed,
        ),
        item(
          "UTM Campaign",
          details,
          [
            "configuration.cleaningRequest.campaign.utmCampaign",
            "configuration.attribution.utm_campaign",
            "metadata.attribution.utm_campaign",
            "metadata.clientContext.utmCampaign",
            "configuration.utmCampaign",
            "configuration.rawFields.utmCampaign",
            "configuration.rawFields.utm_campaign",
          ],
          consumed,
        ),
        item(
          "UTM Term",
          details,
          [
            "configuration.cleaningRequest.campaign.utmTerm",
            "configuration.attribution.utm_term",
            "metadata.attribution.utm_term",
            "configuration.utmTerm",
            "configuration.rawFields.utmTerm",
            "configuration.rawFields.utm_term",
          ],
          consumed,
        ),
        item(
          "UTM Content",
          details,
          [
            "configuration.cleaningRequest.campaign.utmContent",
            "configuration.attribution.utm_content",
            "metadata.attribution.utm_content",
            "metadata.clientContext.utmContent",
            "configuration.utmContent",
            "configuration.rawFields.utmContent",
            "configuration.rawFields.utm_content",
          ],
          consumed,
        ),
        item(
          "GCLID",
          details,
          [
            "configuration.cleaningRequest.campaign.gclid",
            "configuration.attribution.gclid",
            "metadata.attribution.gclid",
            "metadata.clientContext.gclid",
            "configuration.rawFields.gclid",
          ],
          consumed,
        ),
        item(
          "GBRAID",
          details,
          [
            "configuration.cleaningRequest.campaign.gbraid",
            "configuration.attribution.gbraid",
            "metadata.attribution.gbraid",
            "metadata.clientContext.gbraid",
            "configuration.rawFields.gbraid",
          ],
          consumed,
        ),
        item(
          "WBRAID",
          details,
          [
            "configuration.cleaningRequest.campaign.wbraid",
            "configuration.attribution.wbraid",
            "metadata.attribution.wbraid",
            "metadata.clientContext.wbraid",
            "configuration.rawFields.wbraid",
          ],
          consumed,
        ),
        item(
          "Google-Ads-Kampagne",
          details,
          [
            "configuration.googleAdsCampaign",
            "configuration.rawFields.googleAdsCampaign",
            "configuration.rawFields.utmCampaign",
          ],
          consumed,
        ),
      ]),
    },
  ].filter((section) => section.items.length > 0);

  const additionalItems: AdminDetailItem[] = [];
  flattenUnknown(details, "", consumed, additionalItems);
  if (upgrades !== null) consumed.add("upgrades");

  return {
    sections,
    files: collectFiles(booking, details),
    additionalItems: additionalItems
      .filter((entry) => !entry.path.startsWith("configuration.uploadMetadata"))
      .sort((a, b) => a.path.localeCompare(b.path, "de")),
  };
}

export function formatAdminDisplayScalar(value: string | number | boolean): string {
  if (value === true) return "Ja";
  if (value === false) return "Nein";
  return String(value);
}
