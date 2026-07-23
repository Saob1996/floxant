import { buildFaqJsonLd } from "@/lib/structured-data";
import {
  isFaqSchemaEligible,
  toVisibleFaqItem,
  type AuthorityFaqItem,
  type VisibleFaqItem,
} from "@/lib/faq-system";

type BuildVisibleFaqSchemaInput = {
  items: readonly AuthorityFaqItem[];
  visibleKeys?: readonly string[];
  limit?: number;
};

export function getFaqSchemaItemsForVisibleContent({
  items,
  visibleKeys,
  limit = 8,
}: BuildVisibleFaqSchemaInput): VisibleFaqItem[] {
  const visibleKeySet = visibleKeys?.length ? new Set(visibleKeys) : undefined;
  const eligible = items.filter((item) => {
    const visible = visibleKeySet ? visibleKeySet.has(item.faqKey) : true;
    return isFaqSchemaEligible(item, visible);
  });

  return eligible.slice(0, Math.max(1, Math.min(limit, 8))).map(toVisibleFaqItem);
}
export function buildVisibleFaqJsonLd(input: BuildVisibleFaqSchemaInput) {
  return buildFaqJsonLd(getFaqSchemaItemsForVisibleContent(input));
}
