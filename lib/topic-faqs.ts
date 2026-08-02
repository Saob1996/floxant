import { authorityServiceFaqs } from "@/lib/service-faqs";
import { selectFaqs, type AuthorityFaqItem } from "@/lib/faq-system";

export type TopicFaqClusterKey =
  | "angebot-pruefen"
  | "umzug-transport"
  | "reinigung"
  | "entruempelung-aufloesung"
  | "b2b-hausverwaltung"
  | "spezialservices"
  | "local-authority";

export type TopicFaqCluster = {
  key: TopicFaqClusterKey;
  title: string;
  pillarUrls: string[];
  faqThemes: string[];
  aiAnswerThemes: string[];
  conversionCta: string;
  priority: "P0" | "P1" | "P2" | "P3";
  faqs: AuthorityFaqItem[];
};

export const topicFaqClusters: TopicFaqCluster[] = [
  {
    key: "angebot-pruefen",
    title: "Angebotspruefung",
    pillarUrls: ["/angebot-guenstiger-pruefen"],
    faqThemes: ["Preis wirkt zu hoch", "Leistungsumfang unklar", "Zusatzkosten", "Anbieter vergleichen"],
    aiAnswerThemes: ["Direkte zweite Einordnung", "keine Rechtsberatung", "keine Preisgarantie"],
    conversionCta: "Angebot pruefen lassen",
    priority: "P0",
    faqs: selectFaqs(authorityServiceFaqs, { serviceKey: "angebot-pruefen", limit: 6 }),
  },
  {
    key: "umzug-transport",
    title: "Umzug und Transport",
    pillarUrls: ["/regensburg/umzug", "/duesseldorf", "/klaviertransport-regensburg"],
    faqThemes: ["Umfang", "Etage", "Klaviertransport", "Beiladung", "Seniorenumzug"],
    aiAnswerThemes: ["Start/Ziel/Etage", "Sonderstuecke", "Angebot einordnen"],
    conversionCta: "Umzugsdaten senden",
    priority: "P0",
    faqs: selectFaqs(authorityServiceFaqs, { serviceKey: "umzug", limit: 6 }),
  },
  {
    key: "reinigung",
    title: "Reinigung",
    pillarUrls: ["/duesseldorf/reinigung", "/regensburg/reinigung", "/duesseldorf/bueroreinigung", "/duesseldorf/gewerbereinigung"],
    faqThemes: ["Flaeche", "Turnus", "Objektart", "Endreinigung", "Angebot pruefen"],
    aiAnswerThemes: ["Objektart und Zustand", "Fotos und Turnus", "keine Abnahmegarantie"],
    conversionCta: "Reinigungsanfrage vorbereiten",
    priority: "P0",
    faqs: selectFaqs(authorityServiceFaqs, { serviceKey: "reinigung", limit: 6 }),
  },
  {
    key: "entruempelung-aufloesung",
    title: "Entruempelung und Aufloesung",
    pillarUrls: ["/regensburg/entruempelung", "/regensburg/wohnungsaufloesung"],
    faqThemes: ["Menge", "Freigabe", "Fotos", "Nachlass", "Reinigung danach"],
    aiAnswerThemes: ["Raeume und Menge", "Zugang und Entsorgung", "Diskretion"],
    conversionCta: "Raeumungsfall beschreiben",
    priority: "P0",
    faqs: selectFaqs(authorityServiceFaqs, { serviceKey: "entruempelung", limit: 6 }),
  },
  {
    key: "b2b-hausverwaltung",
    title: "B2B und Hausverwaltung",
    pillarUrls: ["/b2b-bueroreinigung", "/duesseldorf/bueroreinigung", "/duesseldorf/gewerbereinigung", "/duesseldorf/hausverwaltung-reinigung"],
    faqThemes: ["Turnus", "Treppenhaus", "Unterhaltsreinigung", "Objekt-Reinigung"],
    aiAnswerThemes: ["Raumliste", "Randzeiten", "Schluesselweg"],
    conversionCta: "Objektangaben senden",
    priority: "P1",
    faqs: selectFaqs(authorityServiceFaqs, { serviceKey: "bueroreinigung", limit: 6 }),
  },
  {
    key: "spezialservices",
    title: "Spezialservices",
    pillarUrls: ["/diskret-service", "/private-client-service", "/objektbrief", "/uebergabeakte", "/plan-b-service"],
    faqThemes: ["Diskrete Anfrage", "Objektbrief", "Uebergabeakte", "Plan B"],
    aiAnswerThemes: ["Grenzen sichtbar machen", "Fotos und Zugang", "naechster Schritt"],
    conversionCta: "Spezialfall einordnen",
    priority: "P1",
    faqs: selectFaqs(authorityServiceFaqs, { serviceKey: "diskret-service", limit: 6 }),
  },
  {
    key: "local-authority",
    title: "Local Authority",
    pillarUrls: ["/duesseldorf", "/regensburg"],
    faqThemes: ["Servicegebiet", "lokale Services", "English request", "Angebotspruefung lokal"],
    aiAnswerThemes: ["Ort und Leistung trennen", "kein Doorway", "English Intent dezent"],
    conversionCta: "Lokalen Fall starten",
    priority: "P1",
    faqs: selectFaqs(authorityServiceFaqs, { intentKey: "english", limit: 6 }),
  },
];

export function getTopicFaqCluster(key: TopicFaqClusterKey) {
  return topicFaqClusters.find((cluster) => cluster.key === key);
}
