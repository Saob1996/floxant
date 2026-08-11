const INTERNAL_PUBLIC_KEYS = new Set([
  "internalId",
  "id",
  "slug",
  "priority",
  "status",
  "seoNotes",
  "targetQuery",
  "searchIntent",
  "evidence",
  "evidenceStatus",
  "auditStatus",
  "internalLabel",
  "owner",
  "manualReview",
  "conversionGoal",
  "rankingOpportunity",
  "contentOwner",
  "reviewDate",
  "lastReviewedAt",
  "relatedServiceIds",
  "faqIds",
  "serviceIds",
]);

function sanitizeValue(value: unknown): unknown {
  if (
    value === null
    || typeof value === "string"
    || typeof value === "number"
    || typeof value === "boolean"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((entry) => sanitizeValue(entry))
      .filter((entry) => entry !== undefined);
  }

  if (typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    return undefined;
  }

  const sanitizedEntries = Object.entries(value)
    .filter(([key]) => !INTERNAL_PUBLIC_KEYS.has(key))
    .map(([key, entry]) => [key, sanitizeValue(entry)] as const)
    .filter(([, entry]) => entry !== undefined);

  return Object.fromEntries(sanitizedEntries);
}

/**
 * Defense-in-depth boundary for values that are sent to public renderers or
 * client components. Primary selectors still use explicit allow-lists; this
 * helper removes internal planning keys from nested runtime overrides.
 */
export function sanitizePublicContent<T>(content: T): T {
  return sanitizeValue(content) as T;
}

