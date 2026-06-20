import {
  clearanceFaqItems,
  cleaningFaqItems,
  duesseldorfFaqItems,
  movingFaqItems,
  offerCheckFaqItems,
  regensburgFaqItems,
  signatureServiceFaqItems,
  type FloxantFaqItem,
} from "@/lib/faqs";

export type ServiceFaqKey =
  | "angebot-pruefen"
  | "reinigung"
  | "umzug"
  | "entruempelung"
  | "duesseldorf"
  | "regensburg"
  | "signature";

export const serviceFaqCollections: Record<ServiceFaqKey, FloxantFaqItem[]> = {
  "angebot-pruefen": offerCheckFaqItems,
  reinigung: cleaningFaqItems,
  umzug: movingFaqItems,
  entruempelung: clearanceFaqItems,
  duesseldorf: duesseldorfFaqItems,
  regensburg: regensburgFaqItems,
  signature: signatureServiceFaqItems,
};

export function getServiceFaqItems(key: ServiceFaqKey, limit = 6) {
  return serviceFaqCollections[key].slice(0, Math.max(1, Math.min(limit, 8)));
}

export function resolveServiceFaqKey(pathOrSignal: string): ServiceFaqKey {
  const signal = pathOrSignal.toLowerCase();

  if (signal.includes("angebot") || signal.includes("anbieter")) return "angebot-pruefen";
  if (signal.includes("duesseldorf")) return "duesseldorf";
  if (signal.includes("regensburg")) return "regensburg";
  if (signal.includes("entruempel") || signal.includes("aufloesung")) return "entruempelung";
  if (signal.includes("umzug") || signal.includes("transport") || signal.includes("klavier")) return "umzug";
  if (signal.includes("signature") || signal.includes("plan-b") || signal.includes("objektbrief")) return "signature";

  return "reinigung";
}
