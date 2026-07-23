export type FaqRiskLevel = "low" | "medium" | "high";

export type FaqPageType =
  | "money"
  | "support"
  | "blog"
  | "ratgeber"
  | "hub"
  | "local"
  | "legal";

export type AuthorityFaqItem = {
  faqKey: string;
  question: string;
  answer: string;
  serviceKeys: string[];
  locationKeys: string[];
  intentKeys: string[];
  pageTypes: FaqPageType[];
  relatedUrl: string;
  schemaEligible: boolean;
  riskLevel: FaqRiskLevel;
  forbiddenClaims: string[];
  lastReviewed: string;
};

export type VisibleFaqItem = {
  q: string;
  a: string;
};

type FaqFilter = {
  serviceKey?: string;
  locationKey?: string;
  intentKey?: string;
  pageType?: FaqPageType;
  includeHighRisk?: boolean;
  schemaOnly?: boolean;
  limit?: number;
};

const positiveClaimPatterns = [
  /\bgarantiert\s+(guenstiger|billiger|sofort|verfuegbar|fertig|abgenommen|uebergeben)\b/i,
  /\b(preis|ersparnis|termin|verfuegbarkeit|abnahme|uebergabe|kaution|ertrag)\s*-?\s*garantie\b/i,
  /\b(rechtsberatung|pflegeberatung|medizinische beratung)\s+durch\s+floxant\b/i,
  /\b100\s*%\s+(zufriedenheit|garantie|erfolg)\b/i,
  /\bnr\.?\s*1\b/i,
  /\bbilligster\s+anbieter\b/i,
  /\bbester\s+anbieter\b/i,
];

function isNegated(value: string) {
  return /\b(keine|kein|ohne|nicht|wird nicht|werden nicht|ersetzt keine)\b/i.test(value);
}
export function faqAnswerSentenceCount(answer: string) {
  return answer
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

export function faqHasRiskyPositiveClaim(item: Pick<AuthorityFaqItem, "question" | "answer">) {
  const value = `${item.question} ${item.answer}`;
  if (isNegated(value)) return false;
  return positiveClaimPatterns.some((pattern) => pattern.test(value));
}

export function faqAnswerIsShort(answer: string) {
  const sentences = faqAnswerSentenceCount(answer);
  return sentences >= 1 && sentences <= 4 && answer.trim().length <= 520;
}

export function toVisibleFaqItem(item: AuthorityFaqItem): VisibleFaqItem {
  return {
    q: item.question,
    a: item.answer,
  };
}

export function dedupeFaqs<T extends Pick<AuthorityFaqItem, "faqKey" | "question">>(items: readonly T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.faqKey}::${item.question}`.toLowerCase().replace(/\s+/g, " ").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function isFaqSchemaEligible(item: AuthorityFaqItem, visible = true) {
  return (
    visible &&
    item.schemaEligible &&
    item.riskLevel !== "high" &&
    faqAnswerIsShort(item.answer) &&
    !faqHasRiskyPositiveClaim(item)
  );
}

export function selectFaqs(items: readonly AuthorityFaqItem[], filter: FaqFilter = {}) {
  const limit = Math.max(1, Math.min(filter.limit ?? 6, 8));
  const filtered = items.filter((item) => {
    if (filter.schemaOnly && !isFaqSchemaEligible(item)) return false;
    if (!filter.includeHighRisk && item.riskLevel === "high") return false;
    if (filter.serviceKey && !item.serviceKeys.includes(filter.serviceKey)) return false;
    if (filter.locationKey && !item.locationKeys.includes(filter.locationKey)) return false;
    if (filter.intentKey && !item.intentKeys.includes(filter.intentKey)) return false;
    if (filter.pageType && !item.pageTypes.includes(filter.pageType)) return false;
    return true;
  });

  return dedupeFaqs(filtered).slice(0, limit);
}

export function getSchemaVisibleFaqs(items: readonly AuthorityFaqItem[], limit = 6) {
  return selectFaqs(items, { schemaOnly: true, limit }).map(toVisibleFaqItem);
}

export function getVisibleFaqs(items: readonly AuthorityFaqItem[], limit = 6) {
  return selectFaqs(items, { limit }).map(toVisibleFaqItem);
}
