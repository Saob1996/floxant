/**
 * Runtime text sanitizer for FLOXANT
 * Catches broken UTF-8 mojibake patterns and replaces them with clean German text.
 * Primarily used for dashboard components that render localStorage or demo data.
 */

const MOJIBAKE_PATTERNS: [RegExp, string][] = [
  [/\u00C3\u0192\u00C2\u00A4/g, "ä"],
  [/\u00C3\u0192\u00C2\u00B6/g, "ö"],
  [/\u00C3\u0192\u00C2\u00BC/g, "ü"],
  [/\u00C3\u0192\u00C5\u00B8/g, "ß"],
  [/\u00C3\u0192\u00E2\u20AC\u017E/g, "Ä"],
  [/\u00C3\u0192\u00E2\u20AC\u201C/g, "Ö"],
  [/\u00C3\u0192\u00C5\u201C/g, "Ü"],
  [/\u00C3\u0192\u00C2\u00A9/g, "é"],
  [/\u00C3\u0192\u00C2\u00A8/g, "è"],
  [/\u00C3\u0192 /g, "à"],
  [/\u00C3\u0192\u00C6\u2019\u00C3\u2020/g, ""],
  [/\u00C3\u0192\u00E2\u20AC\u0161/g, ""],
  [/\u00C3\u0192/g, ""],
  [/\u00C3\u201A/g, ""],
  [/\u00C3\u00AF\u00C2\u00BF\u00C2\u00BD/g, ""],
  [/\uFFFD/g, ""],
];

/**
 * Sanitize a string that may contain broken UTF-8 encoding.
 * Returns cleaned text or the fallback if the result is empty/garbage.
 */
export function sanitizeText(
  input: string | null | undefined,
  fallback = "Nicht hinterlegt",
): string {
  if (!input || typeof input !== "string") return fallback;

  let cleaned = input.trim();

  for (const [pattern, replacement] of MOJIBAKE_PATTERNS) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  // Remove any remaining control characters
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");

  // If the cleaned result is empty or still looks like garbage, use fallback
  if (!cleaned || cleaned.length < 2) return fallback;

  // Check if more than 30% of characters are non-printable or unusual
  const suspiciousChars = cleaned.replace(/[\w\säöüÄÖÜß.,!?;:()&\-+@/€%#"'–—\n\r]/g, "");
  if (suspiciousChars.length > cleaned.length * 0.3) return fallback;

  return cleaned;
}

/**
 * Sanitize text for price/cost display.
 * Returns the clean value or a price-appropriate fallback.
 */
export function sanitizePrice(
  input: string | null | undefined,
): string {
  return sanitizeText(input, "Preisrahmen nicht angegeben");
}

/**
 * Sanitize customer name display.
 */
export function sanitizeCustomerName(
  input: string | null | undefined,
): string {
  return sanitizeText(input, "Unbekannter Kunde");
}

/**
 * Sanitize notes or description fields.
 */
export function sanitizeNotes(
  input: string | null | undefined,
): string {
  return sanitizeText(input, "Keine Notiz hinterlegt");
}
