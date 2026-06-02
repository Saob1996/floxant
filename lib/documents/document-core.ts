import { company, duesseldorfCompany } from "@/lib/company";
import type {
 DocumentCustomerSnapshot,
 DocumentLineItem,
 DocumentServiceBlock,
 FloxDocument,
 FloxDocumentStatus,
 FloxDocumentType,
 IntakePayload,
} from "@/lib/types/intake";

export type DocumentUnit = "Stück" | "Stunden" | "km" | "m²" | "pauschal" | "Tag" | "Fahrt" | "Sonstiges";

export const DOCUMENT_UNITS: DocumentUnit[] = ["Stück", "Stunden", "km", "m²", "pauschal", "Tag", "Fahrt", "Sonstiges"];

export const DOCUMENT_TYPE_CONFIG: Record<
 Exclude<FloxDocumentType, "inquiry_summary">,
 {
  label: string;
  title: string;
  numberPrefix: string;
  defaultIntro: string;
  defaultConditions: string;
  defaultFooter: string;
  statuses: Array<{ value: FloxDocumentStatus; label: string }>;
 }
> = {
 quote: {
  label: "Angebot",
  title: "Angebot",
  numberPrefix: "ANG",
  defaultIntro:
   "vielen Dank für Ihre Anfrage. Auf Basis der bisher vorliegenden Angaben erhalten Sie dieses Angebot für die beschriebenen Leistungen.",
  defaultConditions:
   "Dieses Angebot ist freibleibend bis zur finalen Abstimmung von Ort, Termin, Umfang, Zugang und Kapazität. Änderungen am Leistungsumfang können den Preis verändern.",
  defaultFooter: "Wir freuen uns auf Ihre Rückmeldung und klären offene Punkte gern vor der Beauftragung.",
  statuses: [
   { value: "draft", label: "Entwurf" },
   { value: "sent", label: "Gesendet" },
   { value: "accepted", label: "Angenommen" },
   { value: "rejected", label: "Abgelehnt" },
   { value: "archived", label: "Archiviert" },
  ],
 },
 order_confirmation: {
  label: "Auftragsbestätigung",
  title: "Auftragsbestätigung",
  numberPrefix: "AB",
  defaultIntro:
   "hiermit bestätigen wir die vereinbarten Leistungen auf Grundlage der abgestimmten Angaben.",
  defaultConditions:
   "Bitte stellen Sie sicher, dass Zugang, Schlüssel, Park- und Objektinformationen wie vereinbart verfügbar sind. Änderungen oder Zusatzaufwand werden vorab abgestimmt, soweit möglich.",
  defaultFooter: "Vielen Dank für Ihren Auftrag. FLOXANT koordiniert die Leistung nach den vereinbarten Angaben.",
  statuses: [
   { value: "draft", label: "Entwurf" },
   { value: "sent", label: "Gesendet" },
   { value: "confirmed", label: "Bestätigt" },
   { value: "archived", label: "Archiviert" },
  ],
 },
 invoice: {
  label: "Rechnung",
  title: "Rechnung",
  numberPrefix: "RE",
  defaultIntro: "vielen Dank für Ihren Auftrag. Wir berechnen Ihnen die nachfolgend aufgeführten Leistungen.",
  defaultConditions:
   "Bitte begleichen Sie den Rechnungsbetrag innerhalb des angegebenen Zahlungsziels. Geben Sie bei der Zahlung die Rechnungsnummer an.",
  defaultFooter: "Vielen Dank für die Zusammenarbeit.",
  statuses: [
   { value: "draft", label: "Entwurf" },
   { value: "sent", label: "Gesendet" },
   { value: "paid", label: "Bezahlt" },
   { value: "partially_paid", label: "Teilbezahlt" },
   { value: "overdue", label: "Überfällig" },
   { value: "voided", label: "Storniert" },
   { value: "archived", label: "Archiviert" },
  ],
 },
};

export const floxantDocumentSettings = {
 companyName: company.name,
 legalName: process.env.FLOXANT_LEGAL_NAME || company.name,
 streetAddress: company.streetAddress || "",
 postalCode: company.postalCode || "",
 city: company.city || "",
 country: company.country || "Deutschland",
 phone: company.phone || "+49 1577 1105087",
 email: company.email || "info@floxant.de",
 website: company.url || "https://www.floxant.de",
 vatId: company.vatId || process.env.FLOXANT_VAT_ID || "",
 taxNumber: process.env.FLOXANT_TAX_NUMBER || "",
 bankName: process.env.FLOXANT_BANK_NAME || "",
 iban: process.env.FLOXANT_IBAN || "",
 bic: process.env.FLOXANT_BIC || "",
  taxMode: process.env.FLOXANT_TAX_MODE || "standard_vat",
};

export type FloxantDocumentSettings = typeof floxantDocumentSettings;

function normalizeRegionSignal(value: unknown) {
 return String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();
}

export function isDuesseldorfDocument(doc?: Partial<FloxDocument>) {
 const config = doc?.snapshot?.configuration || {};
 const service = doc?.snapshot?.service;
 const customer = doc?.editableData?.customer;
 const selectedServices = Array.isArray(config.selectedServices)
  ? config.selectedServices.join(" ")
  : config.selectedServices;
 const serviceSignals = (doc?.editableData?.services || [])
  .map((item) => [item.title, item.description, item.location, item.serviceType, item.notes].filter(Boolean).join(" "))
  .join(" ");

 const signal = normalizeRegionSignal(
  [
   service?.type,
   service?.source,
   service?.entryPoint,
   service?.presetFromUrl,
   service?.regionPreset,
   config.cityOrZip,
   config.objectLocation,
   config.location,
   config.address,
   config.addressOptionalInternal,
   config.fromAddress,
   config.toAddress,
   config.startLocation,
   config.targetAddress,
   config.sourcePage,
   config.serviceSlug,
   config.requestedService,
   config.serviceLabel,
   selectedServices,
   doc?.editableData?.title,
   doc?.editableData?.performanceLocation,
   doc?.editableData?.notesText,
   customer?.street,
   customer?.city,
   serviceSignals,
  ]
   .filter(Boolean)
   .join(" "),
 );

 return signal.includes("dusseldorf") || signal.includes("duesseldorf") || signal.includes("40213");
}

export function getDocumentBusinessSettings(doc?: Partial<FloxDocument>): FloxantDocumentSettings {
 if (!isDuesseldorfDocument(doc)) return floxantDocumentSettings;

 return {
  ...floxantDocumentSettings,
  streetAddress: duesseldorfCompany.streetAddress,
  postalCode: duesseldorfCompany.postalCode,
  city: duesseldorfCompany.city,
  country: duesseldorfCompany.country,
  email: duesseldorfCompany.email || floxantDocumentSettings.email,
  website: duesseldorfCompany.url || company.url,
 };
}

export function getMissingBusinessData(settings: FloxantDocumentSettings = floxantDocumentSettings) {
 const missing: string[] = [];
 if (!settings.streetAddress) missing.push("FLOXANT-Adresse");
 if (!settings.vatId && !settings.taxNumber) missing.push("Steuerangaben");
 if (!settings.bankName) missing.push("Bankname");
 if (!settings.iban) missing.push("IBAN");
 return missing;
}

export function isCommercialDocument(type: FloxDocumentType): type is Exclude<FloxDocumentType, "inquiry_summary"> {
 return type === "quote" || type === "order_confirmation" || type === "invoice";
}

export function getDocumentTypeLabel(type: FloxDocumentType) {
 return isCommercialDocument(type) ? DOCUMENT_TYPE_CONFIG[type].label : "Anfrage-Zusammenfassung";
}

export function getDocumentTitle(type: FloxDocumentType) {
 return isCommercialDocument(type) ? DOCUMENT_TYPE_CONFIG[type].title : "Anfrage-Zusammenfassung";
}

export function getDocumentPrefix(type: FloxDocumentType) {
 return isCommercialDocument(type) ? DOCUMENT_TYPE_CONFIG[type].numberPrefix : "ANF";
}

export function getDocumentStatuses(type: FloxDocumentType) {
 if (isCommercialDocument(type)) return DOCUMENT_TYPE_CONFIG[type].statuses;
 return [
  { value: "draft" as FloxDocumentStatus, label: "Entwurf" },
  { value: "archived" as FloxDocumentStatus, label: "Archiviert" },
 ];
}

export function getStatusLabel(type: FloxDocumentType, status: FloxDocumentStatus) {
 return getDocumentStatuses(type).find((entry) => entry.value === status)?.label || status.replace(/_/g, " ");
}

export function formatDateForInput(value?: string) {
 if (!value) return "";
 const parsed = new Date(value);
 if (Number.isNaN(parsed.getTime())) return value.slice(0, 10);
 return parsed.toISOString().slice(0, 10);
}

export function formatDateDE(value?: string) {
 if (!value) return "";
 const parsed = new Date(value);
 if (Number.isNaN(parsed.getTime())) return value;
 return new Intl.DateTimeFormat("de-DE").format(parsed);
}

export function formatMoney(value: number, currency = "EUR") {
 return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(Number(value) || 0);
}

function normalizeNumber(value: unknown, fallback = 0) {
 const parsed = Number(value);
 return Number.isFinite(parsed) ? parsed : fallback;
}

export function calculateDocumentItem(item: DocumentLineItem): DocumentLineItem {
 const quantity = normalizeNumber(item.quantity, 0);
 const unitPriceNet = normalizeNumber(item.unitPriceNet ?? item.unitPrice, 0);
 const discountPercent = normalizeNumber(item.discountPercent, 0);
 const discountAmountNet = normalizeNumber(item.discountAmountNet, 0);
 const taxRate = normalizeNumber(item.taxRate, 19);
 const baseNet = quantity * unitPriceNet;
 const percentDiscount = baseNet * (discountPercent / 100);
 const lineTotalNet = Math.max(0, baseNet - percentDiscount - discountAmountNet);
 const taxAmount = lineTotalNet * (taxRate / 100);
 const lineTotalGross = lineTotalNet + taxAmount;

 return {
  ...item,
  quantity,
  unitPrice: unitPriceNet,
  unitPriceNet,
  discountPercent,
  discountAmountNet,
  taxRate,
  lineTotalNet,
  taxAmount,
  lineTotalGross,
  total: lineTotalNet,
 };
}

export function normalizeItems(items: DocumentLineItem[] = []) {
 return items.map((item, index) =>
  calculateDocumentItem({
   id: item.id || crypto.randomUUID(),
   position: index + 1,
   description: item.description || "",
   quantity: normalizeNumber(item.quantity, 1),
   unit: item.unit || "pauschal",
   unitPrice: normalizeNumber(item.unitPriceNet ?? item.unitPrice, 0),
   unitPriceNet: normalizeNumber(item.unitPriceNet ?? item.unitPrice, 0),
   discountPercent: normalizeNumber(item.discountPercent, 0),
   discountAmountNet: normalizeNumber(item.discountAmountNet, 0),
   taxRate: normalizeNumber(item.taxRate, 19),
   serviceId: item.serviceId || "",
   category: item.category || "",
   orderIndex: item.orderIndex ?? index,
   total: normalizeNumber(item.total, 0),
  }),
 );
}

export function calculateDocumentTotals(items: DocumentLineItem[] = []) {
 const normalized = normalizeItems(items);
 const netBeforeDiscount = normalized.reduce(
  (sum, item) => sum + normalizeNumber(item.quantity) * normalizeNumber(item.unitPriceNet ?? item.unitPrice),
  0,
 );
 const net = normalized.reduce((sum, item) => sum + normalizeNumber(item.lineTotalNet ?? item.total), 0);
 const tax = normalized.reduce((sum, item) => sum + normalizeNumber(item.taxAmount), 0);
 return {
  net,
  discountTotal: Math.max(0, netBeforeDiscount - net),
  tax,
  gross: net + tax,
  currency: "EUR",
 };
}

export function normalizeServices(services: DocumentServiceBlock[] = []) {
 return services.map((service, index) => ({
  id: service.id || crypto.randomUUID(),
  title: service.title || `Leistungsblock ${index + 1}`,
  description: service.description || "",
  serviceType: service.serviceType || "",
  date: service.date || "",
  location: service.location || "",
  notes: service.notes || "",
  orderIndex: service.orderIndex ?? index,
 }));
}

export function normalizeCustomer(customer?: Partial<DocumentCustomerSnapshot>, fallback?: IntakePayload["contact"]) {
 const contactName = customer?.name || fallback?.fullName || "Kunde";
 return {
  customerType: customer?.customerType || (customer?.companyName ? "company" : "private"),
  customerNumber: customer?.customerNumber || "",
  name: contactName,
  companyName: customer?.companyName || "",
  contactPerson: customer?.contactPerson || "",
  street: customer?.street || "",
  zip: customer?.zip || "",
  city: customer?.city || "",
  country: customer?.country || "Deutschland",
  email: customer?.email || fallback?.email || "",
  phone: customer?.phone || fallback?.phone || "",
  vatId: customer?.vatId || "",
 };
}

export function extractCustomerFromBooking(booking: {
 name?: string;
 email?: string;
 phone?: string;
 details?: IntakePayload;
}) {
 const config = booking.details?.configuration || {};
 const contact = booking.details?.contact;
 return normalizeCustomer(
  {
   name: contact?.fullName || booking.name || "Kunde",
   companyName: typeof config.companyName === "string" ? config.companyName : "",
   street:
    typeof config.addressOptionalInternal === "string"
     ? config.addressOptionalInternal
     : typeof config.address === "string"
      ? config.address
      : "",
   zip: typeof config.zip === "string" ? config.zip : "",
   city:
    typeof config.cityOrZip === "string"
     ? config.cityOrZip
     : typeof config.objectLocation === "string"
      ? config.objectLocation
      : "",
   email: contact?.email || booking.email || "",
   phone: contact?.phone || booking.phone || "",
  },
  contact,
 );
}

export function extractServicesFromBooking(booking: {
 service?: string;
 details?: IntakePayload;
}) {
 const config = booking.details?.configuration || {};
 const selectedServices = Array.isArray(config.selectedServices)
  ? config.selectedServices
  : String(config.selectedServices || booking.service || "Service")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

 const location =
  config.objectLocation ||
  config.cityOrZip ||
  config.location ||
  config.fromAddress ||
  config.startLocation ||
  "";

 return selectedServices.length
  ? selectedServices.map((title: string, index: number) => ({
    id: crypto.randomUUID(),
    title: String(title || "Leistung"),
    description: String(config.customerMessage || config.message || config.note || ""),
    serviceType: booking.service || "",
    location: String(location || ""),
    orderIndex: index,
   }))
  : [
    {
     id: crypto.randomUUID(),
     title: booking.service || "Service",
     description: "",
     serviceType: booking.service || "",
     location: String(location || ""),
     orderIndex: 0,
    },
   ];
}

export function suggestDocumentNumber(type: FloxDocumentType, allDocuments: FloxDocument[] = [], issueDate = new Date()) {
 const prefix = getDocumentPrefix(type);
 const year = issueDate.getFullYear();
 const pattern = new RegExp(`^${prefix}-${year}-(\\d{4,})$`);
 const max = allDocuments.reduce((highest, doc) => {
  const match = String(doc.number || "").match(pattern);
  if (!match) return highest;
  return Math.max(highest, Number(match[1]) || 0);
 }, 0);
 return `${prefix}-${year}-${String(max + 1).padStart(4, "0")}`;
}

export function createDefaultLineItem(serviceId?: string): DocumentLineItem {
 return calculateDocumentItem({
  id: crypto.randomUUID(),
  position: 1,
  description: "Leistung nach Absprache",
  quantity: 1,
  unit: "pauschal",
  unitPrice: 0,
  unitPriceNet: 0,
  discountPercent: 0,
  discountAmountNet: 0,
  taxRate: 19,
  serviceId: serviceId || "",
  category: "",
  orderIndex: 0,
  total: 0,
 });
}

export function buildDocumentFromInput({
 type,
 allDocuments,
 customer,
 services,
 items,
 sourceBooking,
 sourceDocument,
 sourceFlow = "manual",
}: {
 type: FloxDocumentType;
 allDocuments?: FloxDocument[];
 customer?: Partial<DocumentCustomerSnapshot>;
 services?: DocumentServiceBlock[];
 items?: DocumentLineItem[];
 sourceBooking?: {
  id?: string;
  service?: string;
  name?: string;
  email?: string;
  phone?: string;
  details?: IntakePayload;
 };
 sourceDocument?: FloxDocument;
 sourceFlow?: FloxDocument["sourceFlow"];
}): FloxDocument {
 const now = new Date();
 const validUntil = new Date(now);
 validUntil.setDate(validUntil.getDate() + 14);
 const dueDate = new Date(now);
 dueDate.setDate(dueDate.getDate() + 7);
 const fallbackContact = sourceBooking?.details?.contact || {
  fullName: sourceBooking?.name || "Kunde",
  email: sourceBooking?.email || "",
  phone: sourceBooking?.phone || "",
  callbackPreference: "",
 };
 const customerSnapshot = normalizeCustomer(customer || sourceDocument?.editableData.customer, fallbackContact);
 const serviceBlocks =
  services?.length
   ? normalizeServices(services)
   : sourceDocument?.editableData.services?.length
    ? normalizeServices(sourceDocument.editableData.services)
    : sourceBooking
     ? normalizeServices(extractServicesFromBooking(sourceBooking))
     : normalizeServices([
       {
        id: crypto.randomUUID(),
        title: "Leistung nach Absprache",
        description: "",
        orderIndex: 0,
       },
      ]);
 const lineItems =
  items?.length
   ? normalizeItems(items)
   : sourceDocument?.editableData.items?.length
    ? normalizeItems(sourceDocument.editableData.items)
    : normalizeItems([createDefaultLineItem(serviceBlocks[0]?.id)]);
 const config = isCommercialDocument(type) ? DOCUMENT_TYPE_CONFIG[type] : undefined;
 const number = suggestDocumentNumber(type, allDocuments || [], now);
 const totals = calculateDocumentTotals(lineItems);

 return {
  id: crypto.randomUUID(),
  bookingId: sourceBooking?.id || `manual-${crypto.randomUUID()}`,
  leadId: sourceBooking?.id,
  type,
  number,
  status: "draft",
  version: 1,
  sourceDocumentId: sourceDocument?.id,
  sourceFlow,
  snapshot: {
   contact: {
    fullName: customerSnapshot.name,
    email: customerSnapshot.email || "",
    phone: customerSnapshot.phone || "",
    callbackPreference: fallbackContact.callbackPreference || "",
    notes: "",
   },
   service: sourceBooking?.details?.service || {
    type: sourceBooking?.service || "manual_document",
    source: sourceFlow === "manual" ? "dashboard_manual_document" : "dashboard_booking_document",
    entryPoint: "/dashboard/documents",
   },
   valuation: sourceBooking?.details?.valuation || {
    systemPriceRangeMin: 0,
    systemPriceRangeMax: 0,
    priceRangeMin: 0,
    priceRangeMax: 0,
    valuationLabel: "Manuelles Dokument",
    valuationStage: "Manuell erstellt",
    accuracyState: "Manuelle Dokumentdaten",
    topDrivers: [],
   },
   configuration: sourceBooking?.details?.configuration || {},
   timestamp: now.toISOString(),
  },
  editableData: {
   title: config?.title || getDocumentTitle(type),
   documentNumber: number,
   customer: customerSnapshot,
   services: serviceBlocks,
   serviceDate: sourceDocument?.editableData.serviceDate || "",
   servicePeriodStart: sourceDocument?.editableData.servicePeriodStart || "",
   servicePeriodEnd: sourceDocument?.editableData.servicePeriodEnd || "",
   performanceLocation: sourceDocument?.editableData.performanceLocation || serviceBlocks[0]?.location || "",
   introText: sourceDocument?.editableData.introText || config?.defaultIntro || "",
   items: lineItems,
   conditions: sourceDocument?.editableData.conditions || config?.defaultConditions || "",
   notesText: sourceDocument?.editableData.notesText || "",
   publicRemark: sourceDocument?.editableData.publicRemark || "",
   internalNote: "",
   validUntil: type === "quote" ? validUntil.toISOString() : "",
   documentDate: now.toISOString(),
   dueDate: type === "invoice" ? dueDate.toISOString() : "",
   paymentDueDate: type === "invoice" ? dueDate.toISOString() : "",
   paymentTerms: type === "invoice" ? "Zahlbar innerhalb von 7 Tagen ohne Abzug." : "",
   footerNote: config?.defaultFooter || "",
  },
  totals,
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
 };
}

export function normalizeDocument(doc: FloxDocument): FloxDocument {
 const items = normalizeItems(doc.editableData?.items || []);
 const customer = normalizeCustomer(doc.editableData?.customer, doc.snapshot?.contact);
 const services = normalizeServices(doc.editableData?.services || []);
 const number = doc.editableData?.documentNumber || doc.number || "";
 return {
  ...doc,
  number,
  editableData: {
   ...doc.editableData,
   title: doc.editableData?.title || getDocumentTitle(doc.type),
   documentNumber: number,
   customer,
   services,
   items,
  },
  totals: calculateDocumentTotals(items),
  updatedAt: new Date().toISOString(),
 };
}

export function validateDocument(doc: FloxDocument) {
 const normalized = normalizeDocument(doc);
 const warnings: Array<{ level: "critical" | "warning"; message: string }> = [];
 const customer = normalized.editableData.customer;
 const settingsMissing = getMissingBusinessData(getDocumentBusinessSettings(normalized));

 if (!normalized.number) warnings.push({ level: "critical", message: "Dokumentnummer fehlt." });
 if (!normalized.editableData.documentDate) warnings.push({ level: "critical", message: "Dokumentdatum fehlt." });
 if (!customer?.name && !customer?.companyName) warnings.push({ level: "critical", message: "Kundenname fehlt." });
 if (!customer?.street || !customer?.zip || !customer?.city) {
  warnings.push({ level: "warning", message: "Kundenadresse ist unvollständig." });
 }
 if (!normalized.editableData.items.length) warnings.push({ level: "critical", message: "Keine Positionen vorhanden." });
 if (normalized.totals.gross <= 0) warnings.push({ level: "warning", message: "Gesamtbetrag ist 0,00 EUR." });
 if (!normalized.editableData.serviceDate && !normalized.editableData.servicePeriodStart) {
  warnings.push({ level: normalized.type === "invoice" ? "critical" : "warning", message: "Leistungsdatum oder Leistungszeitraum fehlt." });
 }
 if (normalized.type === "quote" && !normalized.editableData.validUntil) {
  warnings.push({ level: "warning", message: "Gültig-bis-Datum fehlt." });
 }
 if (normalized.type === "order_confirmation") {
  if (!normalized.editableData.performanceLocation) warnings.push({ level: "warning", message: "Leistungsort fehlt." });
  if (!normalized.editableData.services?.length) warnings.push({ level: "critical", message: "Keine Services angegeben." });
 }
 if (normalized.type === "invoice") {
  if (!normalized.number.startsWith("RE-")) warnings.push({ level: "warning", message: "Rechnungsnummer sollte im Rechnungsnummernkreis liegen." });
  if (!normalized.editableData.dueDate && !normalized.editableData.paymentDueDate) warnings.push({ level: "critical", message: "Zahlungsziel fehlt." });
  if (settingsMissing.length) warnings.push({ level: "critical", message: `FLOXANT-Stammdaten unvollständig: ${settingsMissing.join(", ")}.` });
  if (normalized.editableData.items.some((item) => item.taxRate === undefined || item.taxRate === null)) {
   warnings.push({ level: "critical", message: "Mindestens eine Position hat keinen Steuersatz." });
  }
 }

 return warnings;
}
