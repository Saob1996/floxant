import { normalizeTextInput, uniqueStrings } from "./normalize";
import type {
  CalculatorEnquiryTransfer,
  CalculatorEstimate,
  CalculatorTransferSummaryItem,
  CalculatorType,
} from "./types";

export const CALCULATOR_ENQUIRY_TRANSFER_SESSION_KEY =
  "floxant:calculator-enquiry-transfer:v1";

export const CALCULATOR_DRAFT_SESSION_KEYS: Readonly<Record<CalculatorType, string>> = Object.freeze({
  moving: "floxant:calculator-draft:moving:v1",
  cleaning: "floxant:calculator-draft:cleaning:v1",
});

export const CALCULATOR_CONTACT_HREFS: Readonly<Record<CalculatorType, string>> = Object.freeze({
  moving: "/kontakt?mode=neutral&source=calculator&intent=umzug-rechner#direktanfrage",
  cleaning: "/kontakt?mode=neutral&source=calculator&intent=reinigung-rechner#direktanfrage",
});

const TRANSFER_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const EFFORT_BANDS = new Set(["small", "medium", "large", "manual_review"]);
const CONFIDENCE_LEVELS = new Set(["high", "medium", "low"]);

export type CreateCalculatorEnquiryTransferInput = {
  estimate: CalculatorEstimate;
  inputSummary: readonly CalculatorTransferSummaryItem[];
  selectedAdditionalServices?: readonly string[];
  enquiryNote?: string;
  createdAt?: string;
};

function sanitizeSummary(
  items: readonly CalculatorTransferSummaryItem[],
): CalculatorTransferSummaryItem[] {
  const sanitized: CalculatorTransferSummaryItem[] = [];

  for (const item of items.slice(0, 18)) {
    const label = normalizeTextInput(item?.label, 80);
    const value = normalizeTextInput(item?.value, 240);
    if (!label || !value) continue;
    if (sanitized.some((entry) => entry.label === label && entry.value === value)) continue;
    sanitized.push({ label, value });
  }

  return sanitized;
}

export function createCalculatorEnquiryTransfer(
  input: CreateCalculatorEnquiryTransferInput,
): CalculatorEnquiryTransfer {
  const { estimate } = input;
  const enquiryNote = normalizeTextInput(input.enquiryNote, 800);
  const createdAtCandidate = input.createdAt ? new Date(input.createdAt) : new Date();
  const createdAt = Number.isNaN(createdAtCandidate.getTime())
    ? new Date().toISOString()
    : createdAtCandidate.toISOString();

  return {
    schemaVersion: 1,
    calculatorType: estimate.calculatorType,
    calculatorVersion: normalizeTextInput(estimate.calculatorVersion, 80),
    createdAt,
    inputSummary: sanitizeSummary(input.inputSummary),
    result: {
      estimateType: "effort_band",
      effortBand: estimate.effortBand,
      minimum: null,
      maximum: null,
      currency: null,
      confidence: estimate.confidence,
      calculationSummary: normalizeTextInput(estimate.calculationSummary, 480),
    },
    assumptions: uniqueStrings(estimate.assumptions).slice(0, 12),
    missingInformation: uniqueStrings(estimate.missingInformation).slice(0, 12),
    selectedAdditionalServices: uniqueStrings(input.selectedAdditionalServices || []).slice(0, 12),
    ...(enquiryNote ? { enquiryNote } : {}),
  };
}

export function storeCalculatorEnquiryTransfer(transfer: CalculatorEnquiryTransfer): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.sessionStorage.setItem(
      CALCULATOR_ENQUIRY_TRANSFER_SESSION_KEY,
      JSON.stringify(transfer),
    );
    return true;
  } catch {
    return false;
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function safeStringList(value: unknown, limit: number): string[] | null {
  if (!Array.isArray(value)) return null;
  const result = value
    .slice(0, limit)
    .map((item) => normalizeTextInput(item, 240))
    .filter(Boolean);
  return result.length === value.length ? result : null;
}

export function parseCalculatorEnquiryTransfer(
  serialized: string | null | undefined,
  expectedType?: CalculatorType,
): CalculatorEnquiryTransfer | null {
  if (!serialized) return null;

  try {
    const parsed = asRecord(JSON.parse(serialized));
    const calculatorType = parsed.calculatorType;
    if (
      parsed.schemaVersion !== 1
      || (calculatorType !== "moving" && calculatorType !== "cleaning")
      || (expectedType && calculatorType !== expectedType)
      || typeof parsed.calculatorVersion !== "string"
      || !parsed.calculatorVersion.trim()
      || typeof parsed.createdAt !== "string"
    ) {
      return null;
    }

    const createdAtMs = new Date(parsed.createdAt).getTime();
    if (
      !Number.isFinite(createdAtMs)
      || createdAtMs > Date.now() + 5 * 60 * 1000
      || Date.now() - createdAtMs > TRANSFER_MAX_AGE_MS
    ) {
      return null;
    }

    if (!Array.isArray(parsed.inputSummary) || parsed.inputSummary.length > 18) return null;
    const inputSummary = sanitizeSummary(
      parsed.inputSummary.map((item) => {
        const record = asRecord(item);
        return { label: String(record.label || ""), value: String(record.value || "") };
      }),
    );
    if (inputSummary.length !== parsed.inputSummary.length) return null;

    const result = asRecord(parsed.result);
    if (
      result.estimateType !== "effort_band"
      || typeof result.effortBand !== "string"
      || !EFFORT_BANDS.has(result.effortBand)
      || result.minimum !== null
      || result.maximum !== null
      || result.currency !== null
      || typeof result.confidence !== "string"
      || !CONFIDENCE_LEVELS.has(result.confidence)
      || typeof result.calculationSummary !== "string"
    ) {
      return null;
    }

    const assumptions = safeStringList(parsed.assumptions, 12);
    const missingInformation = safeStringList(parsed.missingInformation, 12);
    const selectedAdditionalServices = safeStringList(parsed.selectedAdditionalServices, 12);
    if (!assumptions || !missingInformation || !selectedAdditionalServices) return null;

    const enquiryNote = normalizeTextInput(parsed.enquiryNote, 800);
    return {
      schemaVersion: 1,
      calculatorType,
      calculatorVersion: normalizeTextInput(parsed.calculatorVersion, 80),
      createdAt: new Date(createdAtMs).toISOString(),
      inputSummary,
      result: {
        estimateType: "effort_band",
        effortBand: result.effortBand as CalculatorEnquiryTransfer["result"]["effortBand"],
        minimum: null,
        maximum: null,
        currency: null,
        confidence: result.confidence as CalculatorEnquiryTransfer["result"]["confidence"],
        calculationSummary: normalizeTextInput(result.calculationSummary, 480),
      },
      assumptions,
      missingInformation,
      selectedAdditionalServices,
      ...(enquiryNote ? { enquiryNote } : {}),
    };
  } catch {
    return null;
  }
}

export function loadCalculatorEnquiryTransfer(
  expectedType?: CalculatorType,
): CalculatorEnquiryTransfer | null {
  if (typeof window === "undefined") return null;
  try {
    return parseCalculatorEnquiryTransfer(
      window.sessionStorage.getItem(CALCULATOR_ENQUIRY_TRANSFER_SESSION_KEY),
      expectedType,
    );
  } catch {
    return null;
  }
}

export function clearCalculatorEnquiryTransfer(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(CALCULATOR_ENQUIRY_TRANSFER_SESSION_KEY);
  } catch {
    // A blocked storage API must not affect the enquiry flow.
  }
}
