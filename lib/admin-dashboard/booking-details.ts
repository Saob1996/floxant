import type { BookingRecord } from "./bookings";

type UnknownRecord = Record<string, unknown>;

export type AdminCalculatorSummaryItem = {
  label: string;
  value: string;
};

export type AdminCalculatorDetail = {
  calculatorLabel: "Umzugsrechner" | "Reinigungsrechner";
  calculatorVersion: string;
  createdAt: string;
  inputSummary: AdminCalculatorSummaryItem[];
  effortLabel: string;
  confidenceLabel: string;
  calculationSummary: string;
  assumptions: string[];
  missingInformation: string[];
  selectedAdditionalServices: string[];
  enquiryNote: string;
};

const CALCULATOR_LABELS = {
  moving: "Umzugsrechner",
  cleaning: "Reinigungsrechner",
} as const;

const EFFORT_LABELS: Readonly<Record<string, string>> = {
  small: "Kleiner Aufwand",
  medium: "Mittlerer Aufwand",
  large: "Größerer Aufwand",
  manual_review: "Individuelle Prüfung erforderlich",
};

const CONFIDENCE_LABELS: Readonly<Record<string, string>> = {
  high: "Gut",
  medium: "Teilweise offen",
  low: "Mehrere Angaben offen",
};

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as UnknownRecord
    : {};
}

function parseDetails(value: unknown): UnknownRecord {
  if (typeof value !== "string") return asRecord(value);
  try {
    return asRecord(JSON.parse(value));
  } catch {
    return {};
  }
}

function text(value: unknown, maxLength = 800): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 12)
    .map((item) => text(item, 240))
    .filter(Boolean);
}

function inputSummary(value: unknown): AdminCalculatorSummaryItem[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 18).flatMap((item) => {
    const record = asRecord(item);
    const label = text(record.label, 80);
    const summaryValue = text(record.value, 240);
    return label && summaryValue ? [{ label, value: summaryValue }] : [];
  });
}

/**
 * Reads only the customer-facing calculator handoff fields. Price placeholders,
 * unknown keys, credentials and arbitrary nested values are intentionally ignored.
 */
export function getAdminCalculatorDetail(
  booking: Pick<BookingRecord, "details">,
): AdminCalculatorDetail | null {
  const details = parseDetails(booking.details);
  const configuration = asRecord(details.configuration);
  const transfer = asRecord(configuration.calculatorTransfer);
  const calculatorType = text(transfer.calculatorType, 20);
  if (calculatorType !== "moving" && calculatorType !== "cleaning") return null;

  const result = asRecord(transfer.result);
  const effortBand = text(result.effortBand, 30);
  const confidence = text(result.confidence, 30);

  return {
    calculatorLabel: CALCULATOR_LABELS[calculatorType],
    calculatorVersion: text(transfer.calculatorVersion, 80),
    createdAt: text(transfer.createdAt, 80),
    inputSummary: inputSummary(transfer.inputSummary),
    effortLabel: EFFORT_LABELS[effortBand] || "Nicht eingeordnet",
    confidenceLabel: CONFIDENCE_LABELS[confidence] || "Nicht eingeordnet",
    calculationSummary: text(result.calculationSummary, 480),
    assumptions: stringList(transfer.assumptions),
    missingInformation: stringList(transfer.missingInformation),
    selectedAdditionalServices: stringList(transfer.selectedAdditionalServices),
    enquiryNote: text(transfer.enquiryNote),
  };
}
