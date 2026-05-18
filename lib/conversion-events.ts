export type ConversionPriority = "critical" | "hot" | "warm" | "normal";

export type ConversionEventInput = {
 event?: unknown;
 source?: unknown;
 channel?: unknown;
 href?: unknown;
 path?: unknown;
 label?: unknown;
 priority?: unknown;
 intent?: unknown;
 contactChannel?: unknown;
 journeyId?: unknown;
 eventId?: unknown;
 referrer?: unknown;
 search?: unknown;
 dataset?: Record<string, unknown>;
 utm?: Record<string, unknown>;
 timestamp?: unknown;
};

export type ConversionEventSignal = {
 event: string;
 source: string;
 channel: string;
 path: string;
 href: string;
 journeyId: string;
 eventId: string;
 priority: ConversionPriority;
 score: number;
 intent: string;
 responseHint: string;
 tags: string[];
 timestamp: number;
};

function clean(value: unknown, fallback = "") {
 return String(value ?? fallback)
  .replace(/[\r\n\t]+/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, 220);
}

function normalize(value: unknown) {
 return clean(value)
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();
}

function readText(input: ConversionEventInput, key: keyof ConversionEventInput) {
 return clean(input[key]);
}

function readDataset(input: ConversionEventInput, key: string) {
 return clean(input.dataset?.[key]);
}

function readUtm(input: ConversionEventInput, key: string) {
 return clean(input.utm?.[key]);
}

function inferChannel(input: ConversionEventInput) {
 const explicit = normalize(input.channel || input.contactChannel || readDataset(input, "contactChannel") || readDataset(input, "channel"));
 const event = normalize(input.event);
 const href = normalize(input.href);

 if (explicit) return explicit;
 if (href.startsWith("tel") || event.includes("phone") || event.includes("call")) return "phone";
 if (href.includes("wa me") || href.includes("whatsapp") || event.includes("whatsapp")) return "whatsapp";
 if (href.startsWith("mailto") || event.includes("email")) return "email";
 if (event.includes("submit") || event.includes("form")) return "form";
 if (event.includes("booking") || event.includes("anfrage")) return "booking";
 return "navigation";
}

function addSignal(state: { score: number; tags: string[] }, points: number, tag: string) {
 state.score += points;
 state.tags.push(tag);
}

export function classifyConversionEvent(input: ConversionEventInput): ConversionEventSignal {
 const event = readText(input, "event") || "interaction";
 const source =
  readText(input, "source") ||
  readDataset(input, "source") ||
  readUtm(input, "utm_source") ||
  "unknown";
 const channel = inferChannel(input);
 const path = readText(input, "path") || "/";
 const href = readText(input, "href");
 const journeyId = readText(input, "journeyId");
 const eventId = readText(input, "eventId");
 const priorityFlag = normalize(input.priority || readDataset(input, "priority"));
 const intentFlag = normalize(input.intent || readDataset(input, "intent"));
 const combined = normalize(
  [
   event,
   source,
   channel,
   path,
   href,
   priorityFlag,
   intentFlag,
   readText(input, "label"),
   readUtm(input, "utm_source"),
   readUtm(input, "utm_campaign"),
   readUtm(input, "gclid"),
  ].join(" "),
 );
 const state = { score: 0, tags: [] as string[] };

 if (/(24h|24 h|sofort|urgent|dringend|express|notfall|kurzfristig|heute|morgen)/.test(combined)) {
  addSignal(state, 30, "urgent_contact_intent");
 }
 if (/(homepage 24h|24h umzugsservice|mobile cta|google maps|google business|gbp|gclid|google ads)/.test(combined)) {
  addSignal(state, 18, "high_intent_source");
 }
 if (channel === "phone") {
  addSignal(state, 30, "direct_phone_contact");
 } else if (channel === "whatsapp") {
  addSignal(state, 28, "direct_whatsapp_contact");
 } else if (channel === "booking" || channel === "form") {
  addSignal(state, 22, "booking_path_started");
 } else if (channel === "email") {
  addSignal(state, 12, "email_contact");
 }
 if (/(submit|lead|booking|anfrage|contact)/.test(combined)) {
  addSignal(state, 16, "conversion_step");
 }
 if (/(critical|hot|priority|high)/.test(priorityFlag)) {
  addSignal(state, 16, "priority_cta");
 }
 if (/(view high intent page|page dwell|booking page dwell|calculator page dwell|offer check page dwell|urgent plan page dwell|signature service page dwell|service area page dwell|duesseldorf cleaning page dwell)/.test(combined)) {
  addSignal(state, 18, "high_intent_page_dwell");
 }
 if (/(angebot guenstiger|angebotscheck|plattform auftrag|plan b|schadensbegrenzung|buchung|rechner)/.test(combined)) {
  addSignal(state, 10, "commercial_page_intent");
 }
 if (/((regensburg|bayern|duesseldorf).*(umzug|reinigung|entruempelung|entsorgung|bueroumzug|cleaning|moving|decluttering|disposal)|(umzug|reinigung|entruempelung|entsorgung|bueroumzug|cleaning|moving|decluttering|disposal).*(regensburg|bayern|duesseldorf))/.test(combined)) {
  addSignal(state, 8, "local_service_context");
 }

 const priority: ConversionPriority =
  state.score >= 70 ? "critical" : state.score >= 50 ? "hot" : state.score >= 30 ? "warm" : "normal";
 const responseHint =
  priority === "critical"
   ? "Sofortkontakt im Backoffice pruefen und Rueckruf/WhatsApp priorisieren."
   : priority === "hot"
    ? "Heute als kaufnahen Kontakt pruefen."
    : priority === "warm"
     ? "In den naechsten operativen Slot aufnehmen."
     : "Normale Beobachtung ohne Unterbrechung des Anfrageprozesses.";

 return {
  event,
  source,
  channel,
  path,
  href,
  journeyId,
  eventId,
  priority,
  score: state.score,
  intent: priority === "normal" ? "awareness" : "contact_conversion",
  responseHint,
  tags: [...new Set(state.tags)],
  timestamp: Number(input.timestamp || Date.now()),
 };
}
