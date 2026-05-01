import { germanizeText } from "@/lib/german-text";

/**
 * Runtime text sanitizer for FLOXANT.
 * Used where old dashboard/localStorage/demo values can still contain mojibake.
 */

function cleanControlCharacters(value: string) {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
}

export function sanitizeText(
  input: string | null | undefined,
  fallback = "Nicht hinterlegt",
): string {
  if (!input || typeof input !== "string") return fallback;

  const cleaned = cleanControlCharacters(germanizeText(input)).trim();
  if (!cleaned) return fallback;

  const suspicious = cleaned.match(
    /[\u00EF\u00BF\u00BD\u00C3\u2020]|\u00C3\u0192(?![A-Za-z])|\u00C3\u201A(?![A-Za-z])/g,
  );
  if (suspicious && suspicious.length > Math.max(2, cleaned.length * 0.15)) {
    return fallback;
  }

  return cleaned;
}

export function sanitizePrice(input: string | null | undefined): string {
  return sanitizeText(input, "Preisrahmen nicht angegeben");
}

export function sanitizeCustomerName(input: string | null | undefined): string {
  return sanitizeText(input, "Unbekannter Kunde");
}

export function sanitizeNotes(input: string | null | undefined): string {
  return sanitizeText(input, "Keine Notiz hinterlegt");
}
