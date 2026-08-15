import type { CalculatorType, EffortBand } from "./types";

export const CALCULATOR_ANALYTICS_EVENTS = [
  "calculator_view",
  "calculator_start",
  "calculator_step_complete",
  "calculator_result_view",
  "calculator_lead_start",
] as const;

export type CalculatorAnalyticsEventName = (typeof CALCULATOR_ANALYTICS_EVENTS)[number];

export const CALCULATOR_ANALYTICS_PARAMETER_KEYS = [
  "calculator_type",
  "step_number",
  "service_type",
  "location_category",
  "result_band",
  "lead_source",
] as const;

export type CalculatorAnalyticsParameters = Partial<{
  calculator_type: CalculatorType;
  step_number: number;
  service_type:
    | "moving"
    | "one_off"
    | "recurring"
    | "handover"
    | "windows"
    | "construction"
    | "unknown";
  location_category:
    | "duesseldorf"
    | "regensburg"
    | "germany_other"
    | "domestic_route"
    | "incomplete_route"
    | "international"
    | "unknown";
  result_band: EffortBand;
  lead_source: "calculator";
}>;

const CALCULATOR_TYPES = new Set(["moving", "cleaning"]);
const SERVICE_TYPES = new Set([
  "moving",
  "one_off",
  "recurring",
  "handover",
  "windows",
  "construction",
  "unknown",
]);
const LOCATION_CATEGORIES = new Set([
  "duesseldorf",
  "regensburg",
  "germany_other",
  "domestic_route",
  "incomplete_route",
  "international",
  "unknown",
]);
const RESULT_BANDS = new Set(["small", "medium", "large", "manual_review"]);

export function sanitizeCalculatorAnalyticsParameters(
  candidate: Readonly<Record<string, unknown>>,
): CalculatorAnalyticsParameters {
  const sanitized: CalculatorAnalyticsParameters = {};

  if (typeof candidate.calculator_type === "string" && CALCULATOR_TYPES.has(candidate.calculator_type)) {
    sanitized.calculator_type = candidate.calculator_type as CalculatorType;
  }

  if (
    typeof candidate.step_number === "number" &&
    Number.isInteger(candidate.step_number) &&
    candidate.step_number >= 1 &&
    candidate.step_number <= 3
  ) {
    sanitized.step_number = candidate.step_number;
  }

  if (typeof candidate.service_type === "string" && SERVICE_TYPES.has(candidate.service_type)) {
    sanitized.service_type = candidate.service_type as CalculatorAnalyticsParameters["service_type"];
  }

  if (
    typeof candidate.location_category === "string" &&
    LOCATION_CATEGORIES.has(candidate.location_category)
  ) {
    sanitized.location_category = candidate.location_category as CalculatorAnalyticsParameters["location_category"];
  }

  if (typeof candidate.result_band === "string" && RESULT_BANDS.has(candidate.result_band)) {
    sanitized.result_band = candidate.result_band as EffortBand;
  }

  if (candidate.lead_source === "calculator") sanitized.lead_source = "calculator";

  return sanitized;
}

const INTERNATIONAL_PATTERN =
  /(?:^|[\s,])(at|ch|nl|be|fr|pl|cz|dk|it)[-\s]?\d{3,}|österreich|austria|schweiz|switzerland|niederlande|netherlands|belgien|frankreich|france|polen|italien|wien|vienna|zürich|zurich|basel|salzburg/i;

export function categorizeLocationForAnalytics(
  location: unknown,
): NonNullable<CalculatorAnalyticsParameters["location_category"]> {
  if (typeof location !== "string" || !location.trim()) return "unknown";
  const normalized = location.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (INTERNATIONAL_PATTERN.test(normalized)) return "international";
  if (/dusseldorf|duesseldorf/.test(normalized)) return "duesseldorf";
  if (/regensburg/.test(normalized)) return "regensburg";
  return "germany_other";
}

export function categorizeRouteForAnalytics(
  origin: unknown,
  destination: unknown,
): NonNullable<CalculatorAnalyticsParameters["location_category"]> {
  const originCategory = categorizeLocationForAnalytics(origin);
  const destinationCategory = categorizeLocationForAnalytics(destination);
  if (originCategory === "international" || destinationCategory === "international") return "international";
  if (originCategory === "unknown" && destinationCategory === "unknown") return "unknown";
  if (originCategory === "unknown" || destinationCategory === "unknown") return "incomplete_route";
  return "domestic_route";
}
