import { company } from "../company";
import {
  roundThreeServiceMatrix,
  roundThreeServices,
  type RoundThreeLocale,
  type RoundThreeRequestType,
} from "./service-matrix";

export const MANDATORY_BUDGET_RESPONSE =
  "Ihre Preisvorstellung ist noch keine Buchung. Wir prüfen Strecke, Umfang, Termin und Kapazität. Danach erhalten Sie eine klare Rückmeldung: machbar, mit verändertem Umfang machbar, Gegenangebot oder derzeit nicht umsetzbar.";
export const MANDATORY_DIFFICULT_SITUATION_RESPONSE =
  "Sie müssen keine Diagnose oder ausführliche private Geschichte angeben. Beschreiben Sie nur die benötigte Leistung, den Termin, praktische Einschränkungen und Ihr verfügbares Bruttobudget.";
export const MANDATORY_COST_COVERAGE_RESPONSE =
  "FLOXANT kann einen detaillierten Kostenvoranschlag erstellen. Ob Jobcenter, Krankenkasse, Sozialamt, Pflegekasse oder Arbeitgeber zahlt, entscheidet ausschließlich die jeweilige Stelle. Beauftragen Sie die Leistung erst nach schriftlicher Genehmigung.";

export const EUROPE_MOVE_QUESTIONS = [
  "Von welcher Postleitzahl und welchem Ort in Deutschland startet der Umzug?",
  "In welches Land und welchen Zielort ziehen Sie?",
  "Wie groß ist der Haushalt und wann soll der Umzug stattfinden?",
] as const;

export type RoundThreeAiIntent =
  | "cleaning"
  | "moving"
  | "europeMove"
  | "budgetMove"
  | "difficultSituation"
  | "costCoverage"
  | "clearance"
  | "customs"
  | "insurance";

export type RoundThreeAiAnswer = {
  intent: RoundThreeAiIntent;
  locale: RoundThreeLocale;
  directAnswer: string;
  serviceExplanation: string;
  missingInfo: string[];
  followUpQuestions: string[];
  cta: { href: string; label: string };
  humanContact: { phone: string; email: string };
  notPromised: string[];
  lastReviewed: string;
};

export const roundThreeAiKnowledgeBase = {
  services: roundThreeServices,
  regions: {
    movingOrigin: "DE",
    europeDestination: "Europe after route review",
    localBase: "Regensburg",
    cleaning: "Only the regions confirmed in the existing service registry",
  },
  contacts: { phone: company.phone, email: company.email },
  sources: [
    "https://www.arbeitsagentur.de/vermittlungsbudget",
    "https://www.gesetze-im-internet.de/sgb_2/__22.html",
    "https://www.gesetze-im-internet.de/sgb_5/__38.html",
    "https://www.gesetze-im-internet.de/sgb_11/__45b.html",
    "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-transit_en",
    "https://www.gov.uk/guidance/transfer-of-residence-to-great-britain",
    "https://www.bazg.admin.ch/de/vorgehen-umzug-in-die-schweiz",
    "https://www.toll.no/en/moving-to-or-out-of-norway/moving-goods",
  ],
  lastReviewed: "2026-08-29",
} as const;

function normalize(value: string) {
  return value.toLocaleLowerCase("de-DE").normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

export function detectRoundThreeAiIntent(question: string): RoundThreeAiIntent {
  const signal = normalize(question);
  if (/(zoll|customs|custom|einfuhr|import|transit)/.test(signal)) return "customs";
  if (/(versicherung|versichert|insurance|insured|deckung|coverage for damage)/.test(signal)) return "insurance";
  if (/(jobcenter|arbeitsagentur|agentur fur arbeit|employment agency|krankenkasse|health insurer|pflegekasse|care fund|sozialamt|social welfare|arbeitgeber|employer|kostenubernahme|kostenvoranschlag|cost estimate|cost coverage|reimbursement|erstattung)/.test(signal)) return "costCoverage";
  if (/(preisvorstellung|preisrahmen|fest\w* budget|fixed budget|moving budget|budget move|budget von|budget of)/.test(signal)) return "budgetMove";
  if (/(schwierig|belastend|hardship|difficult situation|todes|death|nachlass|estate|trennung|separation|schwangerschaft|pregnan|diagnos)/.test(signal)) return "difficultSituation";
  if (/(europa|europe|ausland|abroad|international|deutschland|germany|frankreich|france|italien|italy|spanien|spain|schweiz|switzerland|norwegen|norway|\buk\b|united kingdom)/.test(signal)) return "europeMove";
  if (/(entru|raumung|clearance|house clearance|declutter|entsorg|dispos)/.test(signal)) return "clearance";
  if (/(reinig|\bclean\b|cleaning|cleaner|household help)/.test(signal)) return "cleaning";
  return "moving";
}

function localeFor(question: string, requested?: RoundThreeLocale): RoundThreeLocale {
  if (requested) return requested;
  const signal = normalize(question);
  return /\b(what|how|can|does|is|are|moving|cleaning|help|quote|from|with|need)\b/.test(signal) ? "en" : "de";
}

function serviceAnswer(
  requestType: RoundThreeRequestType,
  locale: RoundThreeLocale,
  directAnswer: string,
  questions?: readonly string[],
): RoundThreeAiAnswer {
  const service = roundThreeServices.find((item) => item.requestType === requestType)!;
  const fallbackQuestions = service.requiredDetails[locale].slice(0, 3).map((item) =>
    locale === "de" ? `Können Sie ${item.toLocaleLowerCase("de-DE")} angeben?` : `Can you provide ${item.toLowerCase()}?`,
  );
  return {
    intent: requestType === "EUROPE_MOVE" ? "europeMove" : requestType === "BUDGET_MOVE" ? "budgetMove" : requestType === "DIFFICULT_SITUATION" ? "difficultSituation" : "costCoverage",
    locale,
    directAnswer,
    serviceExplanation: service.availabilityNote[locale],
    missingInfo: [...service.requiredDetails[locale].slice(0, 3)],
    followUpQuestions: [...(questions || fallbackQuestions).slice(0, 3)],
    cta: { href: service.path[locale], label: locale === "de" ? `${service.name.de} anfragen` : `Request ${service.name.en.toLowerCase()}` },
    humanContact: { phone: company.phone, email: company.email },
    notPromised: [...service.excluded[locale]],
    lastReviewed: service.lastReviewed,
  };
}

export function answerRoundThreeQuestion(question: string, requestedLocale?: RoundThreeLocale): RoundThreeAiAnswer {
  const locale = localeFor(question, requestedLocale);
  const intent = detectRoundThreeAiIntent(question);
  if (intent === "budgetMove") {
    return serviceAnswer("BUDGET_MOVE", locale, locale === "de" ? MANDATORY_BUDGET_RESPONSE : "Your stated budget is not a booking. We review route, scope, timing and capacity. You then receive a clear response: feasible, feasible with a changed scope, a counter-offer, or currently not feasible.");
  }
  if (intent === "difficultSituation") {
    return serviceAnswer("DIFFICULT_SITUATION", locale, locale === "de" ? MANDATORY_DIFFICULT_SITUATION_RESPONSE : "You do not need to provide a diagnosis or a detailed personal story. Describe only the service needed, the date, practical constraints and your available gross budget.");
  }
  if (intent === "costCoverage") {
    return serviceAnswer("COST_COVERAGE_REQUEST", locale, locale === "de" ? MANDATORY_COST_COVERAGE_RESPONSE : "FLOXANT can prepare a detailed cost estimate. Whether a Jobcenter, health insurer, social welfare office, long-term care fund or employer pays is decided exclusively by that body. Commission the service only after written approval.");
  }
  if (intent === "europeMove" || intent === "customs") {
    const answer = locale === "de"
      ? "FLOXANT prüft Europa-Umzüge ausschließlich mit Start in Deutschland. Route, Umfang, Termin, Kapazität und mögliche Grenz- oder Transitvorgaben werden vor einem verbindlichen Angebot geprüft; FLOXANT erteilt keine Zollberatung."
      : "FLOXANT reviews European moves only when they start in Germany. Route, scope, timing, capacity and possible border or transit requirements are checked before a binding quote; FLOXANT does not provide customs advice.";
    const result = serviceAnswer("EUROPE_MOVE", locale, answer, locale === "de" ? EUROPE_MOVE_QUESTIONS : ["Which postcode and city in Germany is the move starting from?", "Which country and destination city are you moving to?", "How large is the household and when should the move take place?"]);
    return { ...result, intent };
  }

  const isCleaning = intent === "cleaning";
  const isClearance = intent === "clearance";
  const isInsurance = intent === "insurance";
  const path = isInsurance ? (locale === "de" ? "/kontakt" : "/en/contact") : isCleaning ? (locale === "de" ? "/leistungen" : "/en/services") : isClearance ? (locale === "de" ? "/regensburg/entruempelung" : "/en/regensburg/apartment-clearance") : (locale === "de" ? "/regensburg/umzug" : "/en/regensburg/moving");
  const directAnswer = isInsurance
    ? (locale === "de" ? "FLOXANT erfindet oder bestätigt keine Versicherungsdeckung. Bitte klären Sie Deckung, Selbstbehalt und Schadenprozess schriftlich mit dem jeweiligen Versicherer; FLOXANT kann nur den praktischen Leistungsumfang beschreiben." : "FLOXANT does not invent or confirm insurance cover. Confirm cover, excess and the claims process in writing with the relevant insurer; FLOXANT can only describe the practical service scope.")
    : isCleaning
      ? (locale === "de" ? "Eine Reinigungsanfrage wird anhand von Ort, Objektart, Fläche, Zustand, Ziel und Termin geprüft. Preis und Verfügbarkeit werden nicht automatisch bestätigt." : "A cleaning enquiry is reviewed from location, property type, area, condition, intended result and timing. Price and availability are not confirmed automatically.")
      : isClearance
        ? (locale === "de" ? "Für eine Räumungsanfrage helfen Räume, Menge, Material, zu behaltende Gegenstände, Zugang und gewünschter Endzustand. Entsorgungsweg und Preis folgen erst nach Prüfung." : "A clearance enquiry should state rooms, volume, materials, retained items, access and intended end condition. Disposal route and price follow only after review.")
        : (locale === "de" ? "Für einen Umzug werden Start, Ziel, Umfang, Zugänge und Termin benötigt. FLOXANT prüft Machbarkeit und Kapazität vor einem Angebot oder Auftrag." : "A moving enquiry needs origin, destination, scope, access and timing. FLOXANT reviews feasibility and capacity before a quote or order.");
  return {
    intent,
    locale,
    directAnswer,
    serviceExplanation: locale === "de" ? "Der passende bestehende Service wird anhand der tatsächlichen Aufgabe und Region gewählt." : "The appropriate existing service is selected from the actual task and region.",
    missingInfo: locale === "de" ? ["Ort oder Route", "praktischer Umfang", "Termin oder Zeitraum"] : ["location or route", "practical scope", "date or window"],
    followUpQuestions: locale === "de" ? ["Wo soll die Leistung stattfinden?", "Welcher Umfang ist praktisch nötig?", "Welcher Termin oder Zeitraum ist wichtig?"] : ["Where should the service take place?", "What practical scope is required?", "Which date or time window matters?"],
    cta: { href: path, label: locale === "de" ? "Passenden Service öffnen" : "Open the appropriate service" },
    humanContact: { phone: company.phone, email: company.email },
    notPromised: [locale === "de" ? "keine automatische Preis-, Termin-, Versicherungs- oder Auftragszusage" : "no automatic price, timing, insurance or order promise"],
    lastReviewed: roundThreeServiceMatrix.europeMove.lastReviewed,
  };
}
