import type { CanonicalLeadService, NormalizedLeadSubmission } from "@/lib/lead-types";
import { getMissingInfoQuestionsForServiceKey, resolveMissingInfoQuestionKey } from "@/lib/missing-info-questions";

export type LeadReplyTemplate = {
  templateKey: string;
  serviceKeys: string[];
  subjectSuggestion: string;
  internalUseCase: string;
  customerReplyDE: string;
  customerReplyEN?: string;
  missingInfoQuestions: string[];
  notAllowedClaims: string[];
  recommendedNextStep: string;
};

const notAllowedBase = [
  "keine falsche Buchungsbestaetigung",
  "keine Preisgarantie",
  "keine Soforttermin-Garantie",
  "keine Verfuegbarkeitsgarantie",
];

export const leadReplyTemplates: LeadReplyTemplate[] = [
  {
    templateKey: "reply-cleaning",
    serviceKeys: ["reinigung", "fensterreinigung"],
    subjectSuggestion: "Ihre Reinigungsanfrage bei FLOXANT",
    internalUseCase: "Normale Reinigungsanfrage mit Objekt, Zustand, Termin oder Fotos.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Objektart, Flaeche, Zustand, Termin und vorhandene Fotos ein. Falls Angaben fehlen, melden wir uns ueber den angegebenen Kontaktweg. Eine Anfrage ist noch keine Buchung und keine Preis- oder Terminzusage.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("reinigung"),
    notAllowedClaims: [...notAllowedBase, "keine Abnahmegarantie"],
    recommendedNextStep: "Objektart, Flaeche, Termin und Fotos pruefen; bei Luecken kurz nachfragen.",
  },
  {
    templateKey: "reply-b2b-cleaning",
    serviceKeys: ["bueroreinigung", "gewerbereinigung", "praxisreinigung", "b2b-bueroreinigung"],
    subjectSuggestion: "Ihre Anfrage zur Buero-/Gewerbereinigung",
    internalUseCase: "B2B-Reinigung, Praxis, Buero, Gewerbe, Turnus oder bestehendes Angebot.",
    customerReplyDE:
      "Danke fuer Ihre B2B-Anfrage. FLOXANT ordnet Flaeche, Turnus, Reinigungszeiten, Leistungsumfang und Ansprechpartner ein. Ein vorhandenes Angebot kann helfen. Eine Anfrage ist noch keine Beauftragung und enthaelt keine Preis- oder Referenzzusage.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("b2b-reinigung"),
    notAllowedClaims: [...notAllowedBase, "keine Fake-Referenzen", "keine unbelegten Zertifikate"],
    recommendedNextStep: "Flaeche, Turnus und Ansprechpartner zuerst klaeren; vorhandenes Angebot anfordern, falls erwaehnt.",
  },
  {
    templateKey: "reply-property-cleaning",
    serviceKeys: ["hausverwaltung-reinigung", "treppenhausreinigung", "unterhaltsreinigung", "gebaeudereinigung"],
    subjectSuggestion: "Ihre Objekt-/Hausverwaltungsanfrage",
    internalUseCase: "Hausverwaltung, WEG, Treppenhaus, Unterhalt oder Gemeinschaftsflaechen.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Objektart, Bereiche, Turnus, Zugang, Ansprechpartner und ein moegliches Angebot ein. Wir leisten keine Rechtsberatung oder Verkehrssicherungspflicht-Beratung. Eine Anfrage ist noch keine Beauftragung.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("hausverwaltung-reinigung"),
    notAllowedClaims: [...notAllowedBase, "keine Rechtsberatung", "keine Verkehrssicherungspflicht-Beratung"],
    recommendedNextStep: "Objekt, Bereiche, Turnus und Schluesselweg strukturieren; Angebot oder Leistungsverzeichnis pruefen.",
  },
  {
    templateKey: "reply-moving",
    serviceKeys: ["umzug", "fernumzug", "moebeltransport"],
    subjectSuggestion: "Ihre Umzugsanfrage bei FLOXANT",
    internalUseCase: "Umzug, Transport, Fernumzug, kleinere Transporte oder Umzugsangebot.",
    customerReplyDE:
      "Danke fuer Ihre Umzugsanfrage. FLOXANT ordnet Start, Ziel, Etagen, Umfang, Sonderstuecke und Termin ein. Falls Angaben fehlen, fragen wir gezielt nach. Eine Anfrage ist noch keine Buchung und keine Preis- oder Terminbestaetigung.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("umzug"),
    notAllowedClaims: [...notAllowedBase, "keine Schadenfreiheitsgarantie"],
    recommendedNextStep: "Route, Etagen, Umfang und Termin zuerst klaeren; Angebotspruefung anbieten, wenn ein Angebot vorhanden ist.",
  },
  {
    templateKey: "reply-piano-transport",
    serviceKeys: ["klaviertransport"],
    subjectSuggestion: "Ihre Anfrage zum Klaviertransport",
    internalUseCase: "Klavier, E-Piano, Fluegel oder schweres Einzelstueck mit Zugangsthema.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Instrumentart, Start, Ziel, Etage, Treppe, Zugang, Fotos und Termin ein. Ohne diese Eckdaten gibt es keine Machbarkeits-, Preis- oder Schadenfreiheitszusage.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("klaviertransport"),
    notAllowedClaims: [...notAllowedBase, "keine Schadenfreiheitsgarantie", "keine Machbarkeitsgarantie ohne Zugangspruefung"],
    recommendedNextStep: "Instrument, Etagen und Zugang pruefen; Fotos von Treppe, Kurven und Zielraum anfragen.",
  },
  {
    templateKey: "reply-clearance",
    serviceKeys: ["entruempelung"],
    subjectSuggestion: "Ihre Entruempelungsanfrage bei FLOXANT",
    internalUseCase: "Entruempelung, Raeumung, Menge, Zugang, Frist oder Fotos.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Raeume, Menge, Zugang, Frist, Fotos und Zielzustand ein. Reinigung danach oder Angebotspruefung kann mitgedacht werden. Eine Anfrage ist noch keine Buchung und keine Entsorgungs- oder Preiszusage.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("entruempelung"),
    notAllowedClaims: [...notAllowedBase, "keine Entsorgungszusage ohne Pruefung", "keine Wertgutachten"],
    recommendedNextStep: "Raeume, Menge, Zugang, Freigabe und Frist klaeren; Fotos optional anfragen.",
  },
  {
    templateKey: "reply-estate-clearance",
    serviceKeys: ["wohnungsaufloesung", "haushaltsaufloesung"],
    subjectSuggestion: "Ihre Anfrage zur Wohnungs-/Haushaltsaufloesung",
    internalUseCase: "Wohnungsaufloesung, Haushaltsaufloesung, Nachlass, sensible Freigabe oder Frist.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Umfang, Frist, Zugang, Freigabe und moegliche Anschlussleistungen wie Reinigung oder Uebergabe ein. Sensible Details muessen nicht sofort schriftlich genannt werden. Es erfolgt keine Rechtsberatung.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("wohnungsaufloesung"),
    notAllowedClaims: [...notAllowedBase, "keine Rechtsberatung", "keine Nachlassbewertung"],
    recommendedNextStep: "Freigabe, Umfang, Frist und Kontaktperson klaeren; Diskret-Service anbieten, wenn der Kontext sensibel ist.",
  },
  {
    templateKey: "reply-senior-move",
    serviceKeys: ["seniorenumzug"],
    subjectSuggestion: "Ihre Anfrage zum Seniorenumzug",
    internalUseCase: "Seniorenumzug, Angehoerige, Zusatzbedarf, Packhilfe, Reinigung oder Entruempelung.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Start, Ziel, Umfang, Ansprechpartner, Frist und Zusatzbedarf ein. Entruempelung, Reinigung oder Uebergabe koennen separat mitgedacht werden. Es erfolgt keine Pflege-, Medizin- oder Rechtsberatung.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("seniorenumzug"),
    notAllowedClaims: [...notAllowedBase, "keine Pflegeberatung", "keine medizinische Beratung", "keine Rechtsberatung"],
    recommendedNextStep: "Ansprechpartner, Frist, Umfang und Zusatzbedarf ruhig klaeren; sensible Details nicht erzwingen.",
  },
  {
    templateKey: "reply-discreet",
    serviceKeys: ["diskret-service", "private-client"],
    subjectSuggestion: "Ihre diskrete FLOXANT-Anfrage",
    internalUseCase: "Diskreter Fall, Trennung, Nachlass, private Situation oder bevorzugter Kontaktweg.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. Eine kurze Beschreibung, Ort, Frist und bevorzugter Kontaktweg reichen fuer den Start. Private Details muessen nicht sofort ins Formular. FLOXANT klaert nur die naechsten praktischen Schritte und leistet keine Rechts-, Pflege- oder Medizinberatung.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("diskret-service"),
    notAllowedClaims: [...notAllowedBase, "keine Rechtsberatung", "keine Pflegeberatung", "keine medizinische Beratung", "keine Sicherheitsdienstleistung"],
    recommendedNextStep: "Kontaktweg und Rueckrufzeit beachten; nur notwendige Rueckfragen stellen.",
  },
  {
    templateKey: "reply-offer-check",
    serviceKeys: ["angebot-pruefen"],
    subjectSuggestion: "Ihre Angebotspruefung bei FLOXANT",
    internalUseCase: "Angebot pruefen, Preis-/Leistungsumfang unklar, Plattformauftrag oder zweite Einordnung.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Angebot, Umfang, offene Punkte, Termin und moegliche Zusatzkosten organisatorisch ein. Es gibt keine Ersparnisgarantie, keine Preisgarantie und keine Rechtsberatung.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("angebot-pruefen"),
    notAllowedClaims: [...notAllowedBase, "keine Ersparnisgarantie", "keine Rechtsberatung", "keine Abwertung anderer Anbieter"],
    recommendedNextStep: "Angebotsstatus, Pruefgrund, Umfang und Frist klaeren; fehlendes Angebot oder Preispositionen nachfragen.",
  },
  {
    templateKey: "reply-solar-pv",
    serviceKeys: ["solarreinigung", "pv-anlagen-reinigung"],
    subjectSuggestion: "Ihre Solar-/PV-Reinigungsanfrage",
    internalUseCase: "Solar- oder PV-Reinigung mit Dachart, Zugang, Modulflaeche und Fotos.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Dachart, Zugang, Modulflaeche, Verschmutzung und Fotos ein. Bitte keine riskanten Dachfotos erstellen. Es gibt keine Ertrags-, Preis- oder Termin-Garantie.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("solarreinigung"),
    notAllowedClaims: [...notAllowedBase, "keine Ertragsgarantie", "keine Dachstatik", "keine Elektroberatung"],
    recommendedNextStep: "Dachart, sicheren Zugang, Modulflaeche und Fotos aus sicherer Position klaeren.",
  },
  {
    templateKey: "reply-handover",
    serviceKeys: ["uebergabe", "endreinigung", "objektbrief"],
    subjectSuggestion: "Ihre Anfrage zur Uebergabe/Endreinigung",
    internalUseCase: "Endreinigung, Wohnungsuebergabe, Objektbrief, Uebergabeakte oder Vermieter-Ready.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Objekt, Zustand, Frist, Restpunkte, Schluesselweg und gewuenschtes Ergebnis ein. Eine erfolgreiche Uebergabe, Kautionsrueckzahlung, Preis- oder Sofortterminzusage wird nicht garantiert.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("uebergabe"),
    notAllowedClaims: [...notAllowedBase, "keine Kautionsgarantie", "keine erfolgreiche Uebergabe garantieren", "keine Rechtsberatung"],
    recommendedNextStep: "Frist, Zustand, Restpunkte und Schluesselweg klaeren; Objektbrief/Uebergabeakte vorschlagen, falls hilfreich.",
  },
  {
    templateKey: "reply-plan-b",
    serviceKeys: ["plan-b-service", "schadensbegrenzung"],
    subjectSuggestion: "Ihre Plan-B-Anfrage bei FLOXANT",
    internalUseCase: "Anbieter abgesagt, Termin kippt, kurzfristige Rettung oder Schadensbegrenzung.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Dringlichkeit, Ort, offene Punkte, Kontaktweg und realistische naechste Schritte ein. Eine Sofortzusage, Kapazitaetsgarantie oder Terminbestaetigung entsteht dadurch nicht.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("plan-b-service"),
    notAllowedClaims: [...notAllowedBase, "keine Kapazitaetsgarantie", "keine Aufforderung zum Vertragsbruch"],
    recommendedNextStep: "Deadline, blockierenden Punkt und schnellsten Kontaktweg zuerst pruefen.",
  },
  {
    templateKey: "reply-english-short",
    serviceKeys: ["english", "en"],
    subjectSuggestion: "Your FLOXANT request",
    internalUseCase: "Short English acknowledgement for international customers.",
    customerReplyDE:
      "Thank you for your request. FLOXANT checks the service, city, scope, timing and preferred contact method. If details are missing, we will ask a short follow-up question. This is not a booking confirmation and no price or date is guaranteed.",
    customerReplyEN:
      "Thank you for your request. FLOXANT will review the service, city, scope, timing and preferred contact method. If details are missing, we will ask a short follow-up question. This is not a booking confirmation and no price or date is guaranteed.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("english"),
    notAllowedClaims: [...notAllowedBase, "no legal advice", "no automatic booking confirmation"],
    recommendedNextStep: "Reply in simple English, confirm request type, ask for one missing detail at a time.",
  },
  {
    templateKey: "reply-general",
    serviceKeys: ["sonstiges", "general"],
    subjectSuggestion: "Ihre FLOXANT-Anfrage",
    internalUseCase: "Allgemeine oder noch unklare Anfrage.",
    customerReplyDE:
      "Danke fuer Ihre Anfrage. FLOXANT ordnet Service, Ort, Umfang, Termin und Kontaktweg ein. Wenn Angaben fehlen, fragen wir kurz nach. Eine Anfrage ist noch keine Buchung und keine Preis- oder Terminzusage.",
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey("general"),
    notAllowedClaims: notAllowedBase,
    recommendedNextStep: "Service, Stadt, Termin und groben Umfang klaeren; passenden Servicepfad festlegen.",
  },
];

const canonicalServiceToTemplate: Partial<Record<CanonicalLeadService, string>> = {
  reinigung: "reply-cleaning",
  fensterreinigung: "reply-cleaning",
  bueroreinigung: "reply-b2b-cleaning",
  gewerbereinigung: "reply-b2b-cleaning",
  praxisreinigung: "reply-b2b-cleaning",
  "b2b-bueroreinigung": "reply-b2b-cleaning",
  umzug: "reply-moving",
  fernumzug: "reply-moving",
  moebeltransport: "reply-moving",
  seniorenumzug: "reply-senior-move",
  klaviertransport: "reply-piano-transport",
  entruempelung: "reply-clearance",
  haushaltsaufloesung: "reply-estate-clearance",
  wohnungsaufloesung: "reply-estate-clearance",
  solarreinigung: "reply-solar-pv",
  "pv-anlagen-reinigung": "reply-solar-pv",
  "angebot-pruefen": "reply-offer-check",
  "diskret-service": "reply-discreet",
  "plan-b-service": "reply-plan-b",
  objektbrief: "reply-handover",
  sonstiges: "reply-general",
};

function normalize(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\s]+/g, "-")
    .trim();
}

export function getLeadReplyTemplate(templateKey: string) {
  return leadReplyTemplates.find((template) => template.templateKey === templateKey) || leadReplyTemplates[leadReplyTemplates.length - 1];
}

export function resolveLeadReplyTemplateKey(serviceKey?: string, intent?: string) {
  const questionKey = resolveMissingInfoQuestionKey(serviceKey, intent);
  if (questionKey === "angebot-pruefen") return "reply-offer-check";
  if (questionKey === "diskret-service") return "reply-discreet";
  if (questionKey === "plan-b-service") return "reply-plan-b";
  if (questionKey === "hausverwaltung-reinigung") return "reply-property-cleaning";
  if (questionKey === "b2b-reinigung") return "reply-b2b-cleaning";
  if (questionKey === "klaviertransport") return "reply-piano-transport";
  if (questionKey === "seniorenumzug") return "reply-senior-move";
  if (questionKey === "entruempelung") return "reply-clearance";
  if (questionKey === "wohnungsaufloesung") return "reply-estate-clearance";
  if (questionKey === "solarreinigung") return "reply-solar-pv";
  if (questionKey === "uebergabe") return "reply-handover";
  if (questionKey === "umzug") return "reply-moving";
  if (questionKey === "english") return "reply-english-short";
  if (questionKey === "reinigung") return "reply-cleaning";

  const normalizedService = normalize(serviceKey);
  return leadReplyTemplates.find((template) => template.serviceKeys.map(normalize).includes(normalizedService))?.templateKey || "reply-general";
}

export function getLeadReplyTemplateForServiceKey(serviceKey?: string, intent?: string) {
  return getLeadReplyTemplate(resolveLeadReplyTemplateKey(serviceKey, intent));
}

export function getLeadReplyTemplateForLead(lead: NormalizedLeadSubmission) {
  const templateKey =
    lead.leadKind === "offer-check"
      ? "reply-offer-check"
      : lead.leadKind === "discreet"
        ? "reply-discreet"
        : lead.leadKind === "plan-b"
          ? "reply-plan-b"
          : canonicalServiceToTemplate[lead.serviceCanonical] || resolveLeadReplyTemplateKey(lead.serviceCanonical, lead.intentCanonical);

  return getLeadReplyTemplate(templateKey);
}
