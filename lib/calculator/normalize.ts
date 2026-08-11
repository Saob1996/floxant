import type { NumericInput } from "./types";

export type NormalizedMeasure = {
  value: number | null;
  state: "provided" | "missing" | "invalid";
};

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const INTERNATIONAL_LOCATION_PATTERN =
  /(?:^|[\s,])(at|ch|nl|be|fr|pl|cz|dk|it)[-\s]?\d{3,}|österreich|austria|schweiz|switzerland|niederlande|netherlands|belgien|belgium|frankreich|france|polen|poland|tschechien|czech|italien|italy|wien|vienna|zürich|zurich|basel|salzburg(?:$|[\s,])/i;

export function normalizeTextInput(value: unknown, maxLength = 180): string {
  if (typeof value !== "string") return "";
  return value
    .replace(CONTROL_CHARACTERS, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizeDecimalInput(value: NumericInput): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;

  let normalized = value.trim().replace(/[\s\u00A0]/g, "");
  if (!normalized) return null;
  if (!/^[+-]?[\d.,]+$/.test(normalized)) return null;

  const commaIndex = normalized.lastIndexOf(",");
  const dotIndex = normalized.lastIndexOf(".");

  if (commaIndex >= 0 && dotIndex >= 0) {
    const decimalSeparator = commaIndex > dotIndex ? "," : ".";
    const thousandsSeparator = decimalSeparator === "," ? /\./g : /,/g;
    normalized = normalized.replace(thousandsSeparator, "").replace(decimalSeparator, ".");
  } else {
    const separator = commaIndex >= 0 ? "," : dotIndex >= 0 ? "." : "";
    if (separator) {
      const pieces = normalized.split(separator);
      const signlessFirst = pieces[0].replace(/^[+-]/, "");
      const looksLikeThousands =
        pieces.length > 1 &&
        pieces.slice(1).every((piece) => piece.length === 3) &&
        signlessFirst.length >= 1 &&
        signlessFirst.length <= 3;

      normalized = looksLikeThousands
        ? pieces.join("")
        : `${pieces.slice(0, -1).join("")}.${pieces.at(-1) || "0"}`;
    }
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeNonNegativeMeasure(value: NumericInput): NormalizedMeasure {
  const missing = value === null || value === undefined || (typeof value === "string" && !value.trim());
  if (missing) return { value: null, state: "missing" };

  const parsed = normalizeDecimalInput(value);
  if (parsed === null || parsed < 0) return { value: null, state: "invalid" };
  return { value: parsed, state: "provided" };
}

export type LocationAssessment = {
  value: string;
  state: "provided" | "missing" | "invalid_postcode" | "international";
};

export function assessLocation(value: unknown): LocationAssessment {
  const normalized = normalizeTextInput(value, 120);
  if (!normalized) return { value: "", state: "missing" };

  const compact = normalized.replace(/\s/g, "");
  if (/^\d+$/.test(compact) && !/^\d{5}$/.test(compact)) {
    return { value: normalized, state: "invalid_postcode" };
  }

  if (INTERNATIONAL_LOCATION_PATTERN.test(normalized)) {
    return { value: normalized, state: "international" };
  }

  return { value: normalized, state: "provided" };
}

export function uniqueStrings(values: readonly string[]): string[] {
  return Array.from(new Set(values.map((value) => normalizeTextInput(value, 240)).filter(Boolean)));
}
