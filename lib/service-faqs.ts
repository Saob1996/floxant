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
import {
  getVisibleFaqs,
  selectFaqs,
  type AuthorityFaqItem,
} from "@/lib/faq-system";

export type ServiceFaqKey =
  | "angebot-pruefen"
  | "reinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "umzug"
  | "klaviertransport"
  | "entruempelung"
  | "wohnungsaufloesung"
  | "seniorenumzug"
  | "diskret-service"
  | "solar-pv"
  | "uebergabe"
  | "hausverwaltung"
  | "english-request"
  | "duesseldorf"
  | "regensburg"
  | "signature";

export const serviceFaqCollections: Record<ServiceFaqKey, FloxantFaqItem[]> = {
  "angebot-pruefen": offerCheckFaqItems,
  reinigung: cleaningFaqItems,
  bueroreinigung: cleaningFaqItems,
  gewerbereinigung: cleaningFaqItems,
  umzug: movingFaqItems,
  klaviertransport: movingFaqItems,
  entruempelung: clearanceFaqItems,
  wohnungsaufloesung: clearanceFaqItems,
  seniorenumzug: movingFaqItems,
  "diskret-service": signatureServiceFaqItems,
  "solar-pv": signatureServiceFaqItems,
  uebergabe: signatureServiceFaqItems,
  hausverwaltung: cleaningFaqItems,
  "english-request": signatureServiceFaqItems,
  duesseldorf: duesseldorfFaqItems,
  regensburg: regensburgFaqItems,
  signature: signatureServiceFaqItems,
};

const reviewed = "2026-07-08";

export const authorityServiceFaqs: AuthorityFaqItem[] = [
  {
    faqKey: "offer-check-when",
    question: "Wann lohnt sich eine Angebotspruefung?",
    answer:
      "Sie lohnt sich, wenn Preis, Leistungsumfang, Zusatzkosten, Termin oder Verantwortlichkeiten vor einer Zusage unklar wirken. FLOXANT ordnet die Angaben praktisch ein, ohne eine Ersparnis oder Rechtspruefung zu garantieren.",
    serviceKeys: ["angebot-pruefen"],
    locationKeys: ["duesseldorf", "regensburg", "bayern"],
    intentKeys: ["angebot-pruefen", "preisfrage", "anbieter-vergleichen"],
    pageTypes: ["money", "support", "blog", "ratgeber"],
    relatedUrl: "/angebot-guenstiger-pruefen",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["preisgarantie", "rechtsberatung", "anbieterabwertung"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "offer-check-info",
    question: "Welche Angaben helfen beim Angebot pruefen?",
    answer:
      "Hilfreich sind Angebot oder Screenshot, Service, Ort, Termin, Leistungsumfang, Fotos und die konkrete offene Frage. Wenn noch kein Angebot vorliegt, reichen Beschreibung, Preisrahmen und Zielzustand fuer eine erste Einordnung.",
    serviceKeys: ["angebot-pruefen"],
    locationKeys: ["duesseldorf", "regensburg", "bayern"],
    intentKeys: ["angebot-pruefen", "request-brief"],
    pageTypes: ["money", "support", "blog"],
    relatedUrl: "/angebot-guenstiger-pruefen",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["preisgarantie"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "cleaning-info",
    question: "Welche Angaben braucht FLOXANT fuer eine Reinigungsanfrage?",
    answer:
      "Nennen Sie Ort, Objektart, Flaeche, Zustand, Fotos, Termin, Zugang und den gewuenschten Zielzustand. Bei laufender Reinigung helfen zusaetzlich Turnus, Raumliste, Randzeiten und Schluesselweg.",
    serviceKeys: ["reinigung", "bueroreinigung", "gewerbereinigung", "hausverwaltung"],
    locationKeys: ["duesseldorf", "regensburg"],
    intentKeys: ["reinigung-anfragen", "request-brief"],
    pageTypes: ["money", "local", "support"],
    relatedUrl: "/duesseldorf/reinigung",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["soforttermin-garantie", "abnahmegarantie"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "office-cleaning-turnus",
    question: "Was sollte bei Bueroreinigung im Angebot stehen?",
    answer:
      "Wichtig sind Flaeche, Raumliste, Turnus, Reinigungszeiten, Sanitaer, Kueche, Schluesselweg, Ansprechpartner und Zusatzflaechen. So lassen sich Pauschalen besser mit dem echten Leistungsumfang vergleichen.",
    serviceKeys: ["bueroreinigung", "gewerbereinigung"],
    locationKeys: ["duesseldorf", "regensburg"],
    intentKeys: ["b2b", "angebot-pruefen", "turnus"],
    pageTypes: ["money", "support", "blog"],
    relatedUrl: "/duesseldorf/bueroreinigung",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["zertifikat", "garantierte verfuegbarkeit"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "moving-info",
    question: "Welche Angaben helfen fuer einen Umzug in Regensburg?",
    answer:
      "Start, Ziel, Etage, Aufzug, Laufweg, Haltemoeglichkeit, Umfang, Fotos, Termin und Sonderstuecke sind entscheidend. Reinigung, Entruempelung oder Uebergabe sollten direkt als Zusatzbedarf genannt werden.",
    serviceKeys: ["umzug", "seniorenumzug"],
    locationKeys: ["regensburg", "bayern"],
    intentKeys: ["umzug-anfragen", "request-brief"],
    pageTypes: ["money", "local", "support"],
    relatedUrl: "/regensburg/umzug",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["soforttermin-garantie", "preisgarantie"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "piano-transport-access",
    question: "Was ist bei Klaviertransport mit Treppe wichtig?",
    answer:
      "Instrumentart, Etage, Treppenhaus, Tueren, Aufzug, Engstellen, Laufweg und Fotos sind wichtiger als ein schneller Blindpreis. Eine Anfrage ist noch keine Buchung und keine Schaedenfreiheits- oder Termin-Garantie.",
    serviceKeys: ["klaviertransport", "umzug"],
    locationKeys: ["regensburg"],
    intentKeys: ["klaviertransport", "request-brief"],
    pageTypes: ["money", "support", "blog"],
    relatedUrl: "/klaviertransport-regensburg",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["schaedenfreiheit-garantie", "soforttermin-garantie"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "clearance-photos",
    question: "Welche Fotos helfen bei Entruempelung oder Wohnungsaufloesung?",
    answer:
      "Hilfreich sind Fotos von Raeumen, Keller, Garage, Laufwegen, groben Mengen, Sondermaterial und dem gewuenschten Endzustand. Dadurch lassen sich Umfang, Zugang und moegliche Reinigung danach besser einschaetzen.",
    serviceKeys: ["entruempelung", "wohnungsaufloesung", "diskret-service"],
    locationKeys: ["duesseldorf", "regensburg"],
    intentKeys: ["entruempelung-anfragen", "request-brief"],
    pageTypes: ["money", "support", "blog"],
    relatedUrl: "/regensburg/entruempelung",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["entsorgungsgarantie", "rechtsberatung"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "discreet-first-step",
    question: "Muss ich sensible Details direkt erklaeren?",
    answer:
      "Nein. Fuer den ersten Schritt reichen grober Servicebedarf, Ort, Frist und bevorzugter Kontaktweg. Private Details koennen spaeter nur soweit geklaert werden, wie sie fuer die praktische Umsetzung noetig sind.",
    serviceKeys: ["diskret-service", "seniorenumzug", "wohnungsaufloesung"],
    locationKeys: ["duesseldorf", "regensburg", "bayern"],
    intentKeys: ["diskret", "private-client"],
    pageTypes: ["money", "support"],
    relatedUrl: "/diskret-service",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["rechtsberatung", "pflegeberatung", "medizinische beratung"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "solar-no-yield-promise",
    question: "Was wird bei Solar- oder PV-Reinigung nicht versprochen?",
    answer:
      "FLOXANT verspricht keine Ertragssteigerung, keine Preisersparnis, keine Sofortverfuegbarkeit und keine technische Sicherheitszusage ohne Pruefung. Fuer die Einordnung helfen Dachart, Zugang, Modulanzahl, Fotos und vorhandenes Angebot.",
    serviceKeys: ["solar-pv"],
    locationKeys: ["duesseldorf", "regensburg", "bayern"],
    intentKeys: ["solar", "pv", "angebot-pruefen"],
    pageTypes: ["money", "support"],
    relatedUrl: "/solarreinigung",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["ertragsgarantie", "sicherheitszusage", "preisgarantie"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "handover-realistic",
    question: "Kann FLOXANT eine erfolgreiche Uebergabe garantieren?",
    answer:
      "Nein. FLOXANT kann Reinigung, Räumung, Fotos, Schlüsselweg und Restpunkte praktisch vorbereiten. Vermieterentscheidung, Kautionsrückzahlung und rechtliche Wirkung bleiben davon unberührt.",
    serviceKeys: ["uebergabe", "reinigung", "entruempelung"],
    locationKeys: ["duesseldorf", "regensburg", "bayern"],
    intentKeys: ["uebergabe", "endreinigung", "vermieter-ready"],
    pageTypes: ["money", "support", "blog"],
    relatedUrl: "/uebergabe-sprint",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["kautionsgarantie", "uebergabegarantie", "rechtsberatung"],
    lastReviewed: reviewed,
  },
  {
    faqKey: "english-request",
    question: "Can I send the request in English?",
    answer:
      "Yes. You can describe cleaning, office cleaning, moving help, house clearance, piano transport, offer check, solar panel cleaning or discreet service in simple English. FLOXANT will still need location, service, timing and photos or an offer when available.",
    serviceKeys: ["english-request", "angebot-pruefen", "reinigung", "umzug", "entruempelung", "solar-pv"],
    locationKeys: ["duesseldorf", "regensburg", "bayern"],
    intentKeys: ["english", "request-brief"],
    pageTypes: ["money", "local", "support"],
    relatedUrl: "/kontakt",
    schemaEligible: true,
    riskLevel: "low",
    forbiddenClaims: ["doorway", "ranking"],
    lastReviewed: reviewed,
  },
];

export function getServiceFaqItems(key: ServiceFaqKey, limit = 6) {
  return serviceFaqCollections[key].slice(0, Math.max(1, Math.min(limit, 8)));
}

export function getAuthorityServiceFaqItems(key: ServiceFaqKey, limit = 6) {
  const structured = selectFaqs(authorityServiceFaqs, { serviceKey: key, limit });
  return structured.length ? structured : authorityServiceFaqs.slice(0, Math.max(1, Math.min(limit, 8)));
}

export function getVisibleServiceFaqItems(key: ServiceFaqKey, limit = 6) {
  const structured = getAuthorityServiceFaqItems(key, limit);
  return structured.length ? structured.map((item) => ({ q: item.question, a: item.answer })) : getVisibleFaqs(authorityServiceFaqs, limit);
}

export function resolveServiceFaqKey(pathOrSignal: string): ServiceFaqKey {
  const signal = pathOrSignal.toLowerCase();

  if (signal.includes("angebot") || signal.includes("anbieter")) return "angebot-pruefen";
  if (signal.includes("duesseldorf")) return "duesseldorf";
  if (signal.includes("regensburg")) return "regensburg";
  if (signal.includes("buero") || signal.includes("bueroreinigung")) return "bueroreinigung";
  if (signal.includes("gewerbe")) return "gewerbereinigung";
  if (signal.includes("klavier") || signal.includes("piano")) return "klaviertransport";
  if (signal.includes("senior")) return "seniorenumzug";
  if (signal.includes("diskret") || signal.includes("private-client")) return "diskret-service";
  if (signal.includes("solar") || signal.includes("pv")) return "solar-pv";
  if (signal.includes("uebergabe") || signal.includes("endreinigung")) return "uebergabe";
  if (signal.includes("entruempel") || signal.includes("aufloesung")) return "entruempelung";
  if (signal.includes("umzug") || signal.includes("transport") || signal.includes("klavier")) return "umzug";
  if (signal.includes("signature") || signal.includes("plan-b") || signal.includes("objektbrief")) return "signature";

  return "reinigung";
}
