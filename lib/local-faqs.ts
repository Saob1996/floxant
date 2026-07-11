import { selectFaqs, type AuthorityFaqItem } from "@/lib/faq-system";
import { authorityServiceFaqs } from "@/lib/service-faqs";

export type LocalFaqKey = "duesseldorf" | "regensburg" | "bayern" | "english-request";

export const localFaqCollections: Record<LocalFaqKey, AuthorityFaqItem[]> = {
  duesseldorf: selectFaqs(authorityServiceFaqs, { locationKey: "duesseldorf", limit: 8 }),
  regensburg: selectFaqs(authorityServiceFaqs, { locationKey: "regensburg", limit: 8 }),
  bayern: selectFaqs(authorityServiceFaqs, { locationKey: "bayern", limit: 8 }),
  "english-request": selectFaqs(authorityServiceFaqs, { intentKey: "english", limit: 8 }),
};

export function getLocalFaqItems(key: LocalFaqKey, limit = 6) {
  return localFaqCollections[key].slice(0, Math.max(1, Math.min(limit, 8)));
}
