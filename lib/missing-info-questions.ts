import type { CanonicalLeadService, NormalizedLeadSubmission } from "@/lib/lead-types";

export type MissingInfoQuestionSet = {
  serviceKey: string;
  label: string;
  questions: string[];
};

const genericQuestions = [
  "Welche Leistung soll FLOXANT einordnen?",
  "In welcher Stadt oder Region soll die Leistung stattfinden?",
  "Gibt es ein ungefaehres Terminfenster?",
  "Wie erreichen wir Sie am besten fuer Rueckfragen?",
];

export const missingInfoQuestionSets: MissingInfoQuestionSet[] = [
  {
    serviceKey: "reinigung",
    label: "Reinigung",
    questions: [
      "Welche Flaeche oder wie viele Raeume sollen gereinigt werden?",
      "Geht es um eine einmalige Reinigung oder einen regelmaessigen Turnus?",
      "Gibt es Fotos oder ein vorhandenes Angebot?",
      "Wann soll die Reinigung ungefaehr stattfinden?",
    ],
  },
  {
    serviceKey: "b2b-reinigung",
    label: "Buero-/Gewerbereinigung",
    questions: [
      "Welche Flaeche oder Raumliste ist betroffen?",
      "Welcher Turnus ist gewuenscht?",
      "Welche Reinigungszeiten passen zum Betrieb?",
      "Wer ist fachlicher Ansprechpartner?",
    ],
  },
  {
    serviceKey: "hausverwaltung-reinigung",
    label: "Hausverwaltung-/Treppenhausreinigung",
    questions: [
      "Welche Objektart und welche Bereiche sind betroffen?",
      "Welcher Turnus oder Starttermin ist geplant?",
      "Wie ist der Zugang oder Schluesselweg geregelt?",
      "Gibt es ein bestehendes Angebot oder Leistungsverzeichnis?",
    ],
  },
  {
    serviceKey: "umzug",
    label: "Umzug",
    questions: [
      "Was sind Start- und Zielort?",
      "Welche Etagen, Aufzuege oder Laufwege sind relevant?",
      "Wie gross ist der Umfang grob?",
      "Welcher Termin oder Zeitraum ist geplant?",
    ],
  },
  {
    serviceKey: "klaviertransport",
    label: "Klaviertransport",
    questions: [
      "Welche Instrumentart ist es?",
      "Welche Etage betrifft Start und Ziel?",
      "Gibt es Treppenhaus, Aufzug oder enge Stellen?",
      "Sind Fotos von Zugang und Instrument vorhanden?",
    ],
  },
  {
    serviceKey: "entruempelung",
    label: "Entruempelung",
    questions: [
      "Welche Raeume oder Flaechen sind betroffen?",
      "Wie gross ist die Menge grob?",
      "Welche Etage, welcher Zugang oder welche Freigabe ist wichtig?",
      "Gibt es eine Frist und Fotos vom Zustand?",
    ],
  },
  {
    serviceKey: "wohnungsaufloesung",
    label: "Wohnungsaufloesung/Nachlass",
    questions: [
      "Welche Raeume oder Nebenflaechen sind betroffen?",
      "Gibt es eine Frist, Uebergabe oder Familienabstimmung?",
      "Welche Freigabe oder Kontaktperson ist vorhanden?",
      "Soll Reinigung oder Uebergabe danach mitgedacht werden?",
    ],
  },
  {
    serviceKey: "seniorenumzug",
    label: "Seniorenumzug",
    questions: [
      "Wer ist Ansprechpartner fuer Rueckfragen?",
      "Was sind Start, Ziel und ungefaehrer Umfang?",
      "Gibt es Zusatzbedarf wie Packhilfe, Reinigung oder Entruempelung?",
      "Welche Frist oder welcher ruhige Zeitraum ist wichtig?",
    ],
  },
  {
    serviceKey: "angebot-pruefen",
    label: "Angebot pruefen",
    questions: [
      "Welcher Service steht im Angebot?",
      "Was wirkt unklar, zu teuer oder riskant?",
      "Liegt ein schriftliches Angebot oder nur eine muendliche Angabe vor?",
      "Gibt es eine Frist oder mehrere Angebote?",
    ],
  },
  {
    serviceKey: "diskret-service",
    label: "Diskret-Service",
    questions: [
      "Welcher Kontaktweg ist bevorzugt?",
      "Grob welcher Service oder welche Situation ist gemeint?",
      "Gibt es eine Frist?",
      "Sollen Details spaeter in Ruhe geklaert werden?",
    ],
  },
  {
    serviceKey: "plan-b-service",
    label: "Plan-B-Service",
    questions: [
      "Was ist aktuell blockiert oder abgesagt?",
      "Bis wann muss eine Loesung stehen?",
      "Welche Leistung und welcher Ort sind betroffen?",
      "Wer ist fuer Rueckfragen am schnellsten erreichbar?",
    ],
  },
  {
    serviceKey: "solarreinigung",
    label: "Solar/PV",
    questions: [
      "Welche Dachart oder Zugangsmoeglichkeit gibt es?",
      "Wie gross ist die Modulfläche oder Anlage ungefaehr?",
      "Welche Verschmutzung ist sichtbar?",
      "Gibt es Fotos aus sicherer Position?",
    ],
  },
  {
    serviceKey: "uebergabe",
    label: "Uebergabe/Endreinigung",
    questions: [
      "Welche Frist oder welcher Uebergabetermin steht an?",
      "Wie ist der aktuelle Zustand von Kueche, Bad, Boden und Restmengen?",
      "Wie ist der Schluesselweg oder Zugang geregelt?",
      "Soll Objektbrief, Uebergabeakte oder Angebotspruefung mitgedacht werden?",
    ],
  },
  {
    serviceKey: "english",
    label: "English request",
    questions: [
      "Which service do you need?",
      "Which city or region is relevant?",
      "Is there a preferred date or deadline?",
      "What is the best way to contact you?",
    ],
  },
  {
    serviceKey: "general",
    label: "Allgemein",
    questions: genericQuestions,
  },
];

const canonicalServiceToQuestionKey: Partial<Record<CanonicalLeadService, string>> = {
  reinigung: "reinigung",
  bueroreinigung: "b2b-reinigung",
  gewerbereinigung: "b2b-reinigung",
  praxisreinigung: "b2b-reinigung",
  "b2b-bueroreinigung": "b2b-reinigung",
  fensterreinigung: "reinigung",
  umzug: "umzug",
  fernumzug: "umzug",
  moebeltransport: "umzug",
  seniorenumzug: "seniorenumzug",
  klaviertransport: "klaviertransport",
  entruempelung: "entruempelung",
  haushaltsaufloesung: "wohnungsaufloesung",
  wohnungsaufloesung: "wohnungsaufloesung",
  solarreinigung: "solarreinigung",
  "pv-anlagen-reinigung": "solarreinigung",
  "angebot-pruefen": "angebot-pruefen",
  "diskret-service": "diskret-service",
  "plan-b-service": "plan-b-service",
  objektbrief: "uebergabe",
};

function normalizeKey(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\s]+/g, "-")
    .trim();
}

export function resolveMissingInfoQuestionKey(serviceKey?: string, intent?: string) {
  const normalizedService = normalizeKey(serviceKey);
  const normalizedIntent = normalizeKey(intent);
  const combined = `${normalizedService} ${normalizedIntent}`;

  if (/angebot|offer|quote|preis/.test(combined)) return "angebot-pruefen";
  if (/diskret|private-client|sensible|trennung|scheidung/.test(combined)) return "diskret-service";
  if (/plan-b|backup|schadensbegrenzung|anbieter-abgesagt/.test(combined)) return "plan-b-service";
  if (/hausverwaltung|treppenhaus|unterhalt|weg|property/.test(combined)) return "hausverwaltung-reinigung";
  if (/buero|buro|gewerbe|praxis|kanzlei|b2b/.test(combined)) return "b2b-reinigung";
  if (/klavier|piano/.test(combined)) return "klaviertransport";
  if (/senior|angehoerige/.test(combined)) return "seniorenumzug";
  if (/entruempel|raeum|raumung|entsorgung/.test(combined)) return "entruempelung";
  if (/wohnungsaufloesung|haushaltsaufloesung|nachlass/.test(combined)) return "wohnungsaufloesung";
  if (/solar|pv|photovoltaik/.test(combined)) return "solarreinigung";
  if (/uebergabe|ubergabe|endreinigung|vermieter-ready|objektbrief/.test(combined)) return "uebergabe";
  if (/umzug|moving|transport|fernumzug/.test(combined)) return "umzug";
  if (/english|en-/.test(combined)) return "english";
  if (/reinigung|cleaning|fenster/.test(combined)) return "reinigung";

  return "general";
}

export function getMissingInfoQuestionSet(serviceKey?: string, intent?: string) {
  const key = resolveMissingInfoQuestionKey(serviceKey, intent);
  return missingInfoQuestionSets.find((item) => item.serviceKey === key) || missingInfoQuestionSets[missingInfoQuestionSets.length - 1];
}

export function getMissingInfoQuestionsForServiceKey(serviceKey?: string, intent?: string, limit = 4) {
  return getMissingInfoQuestionSet(serviceKey, intent).questions.slice(0, limit);
}

export function getMissingInfoQuestionsForLead(lead: NormalizedLeadSubmission, limit = 4) {
  const key =
    lead.leadKind === "offer-check"
      ? "angebot-pruefen"
      : lead.leadKind === "discreet"
        ? "diskret-service"
        : lead.leadKind === "plan-b"
          ? "plan-b-service"
          : lead.leadKind === "b2b"
            ? "b2b-reinigung"
            : canonicalServiceToQuestionKey[lead.serviceCanonical] || resolveMissingInfoQuestionKey(lead.serviceCanonical, lead.intentCanonical);

  return (missingInfoQuestionSets.find((item) => item.serviceKey === key)?.questions || genericQuestions).slice(0, limit);
}
