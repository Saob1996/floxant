export type EditorialDraftLocale = "de" | "en";

export type EditorialDraftStatus = "HUMAN_REVIEW";

export type EditorialDraftServiceId =
  | "reinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "praxisreinigung"
  | "grundreinigung"
  | "unterhaltsreinigung"
  | "endreinigung"
  | "umzug"
  | "entruempelung"
  | "haushaltsaufloesung"
  | "wohnungsaufloesung"
  | "angebotscheck"
  | "anbieter-vergleichen"
  | "objektbrief"
  | "uebergabeakte"
  | "umzug-mit-reinigung";

export type EditorialDraftEvidence = {
  source: string;
  supports: string;
  verificationStatus: "INTERNAL_SOURCE" | "HUMAN_SOURCE_REQUIRED";
};

export type EditorialDraftOutlineSection = {
  heading: string;
  purpose: string;
};

export type EditorialDraft = {
  id: string;
  locale: EditorialDraftLocale;
  workingTitle: string;
  userProblem: string;
  primaryIntent: "scope" | "planning" | "comparison" | "handover";
  audience: string;
  status: EditorialDraftStatus;
  publishApproved: false;
  publicAllowed: false;
  serviceIds: readonly EditorialDraftServiceId[];
  outline: readonly EditorialDraftOutlineSection[];
  checklist: readonly string[];
  evidence: readonly EditorialDraftEvidence[];
  reviewerNotes: readonly string[];
};

/**
 * Private editorial briefs only. Nothing in this registry creates a route,
 * sitemap entry, structured-data object or publication approval.
 */
export const editorialDrafts = [
  {
    id: "de-duesseldorf-gewerbereinigung-leistungsbriefing",
    locale: "de",
    workingTitle: "Gewerbereinigung in Düsseldorf richtig anfragen: ein prüfbares Leistungsbriefing",
    userProblem: "Office- und Facility-Verantwortliche müssen Reinigungsangebote vergleichen, obwohl Flächen, Intervalle, Zugänge und Qualitätskriterien uneinheitlich beschrieben sind.",
    primaryIntent: "scope",
    audience: "Office Management, Facility Management und Hausverwaltungen in Düsseldorf",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["bueroreinigung", "gewerbereinigung", "unterhaltsreinigung"],
    outline: [
      { heading: "Das Problem in einem Satz", purpose: "Erklären, warum vergleichbare Angaben wichtiger sind als eine möglichst lange Aufgabenliste." },
      { heading: "Objekt und Nutzung erfassen", purpose: "Flächenarten, Nutzungszeiten und sensible Zonen getrennt beschreiben." },
      { heading: "Leistung und Takt trennen", purpose: "Aufgaben, Intervalle und auslösende Ereignisse in einer klaren Matrix ordnen." },
      { heading: "Zugang, Sicherheit und Ansprechpartner", purpose: "Schlüssel, Alarm, Zeitfenster und Eskalationskontakt als offene Klärungspunkte behandeln." },
      { heading: "Abnahme ohne Scheinpräzision", purpose: "Beobachtbare Kriterien und einen dokumentierten Korrekturweg vorschlagen, ohne Ergebnisgarantie." },
    ],
    checklist: [
      "Nutzungsart und ungefähre Flächen je Zone intern bestätigen",
      "Gewünschte Aufgaben von gewünschtem Intervall trennen",
      "Zugangs- und Schließregeln mit der verantwortlichen Stelle klären",
      "Verbrauchsmaterialien und Abfallwege ausdrücklich zuordnen",
      "Angebote auf dieselben Annahmen und Ausschlüsse beziehen",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Öffentlich zulässige Service-IDs, Regionen und Status", verificationStatus: "INTERNAL_SOURCE" },
      { source: "artifacts/editorial-content-map.csv", supports: "Bestehende Cluster- und Überschneidungssignale für Düsseldorf-Reinigung", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Vom Auftraggeber freizugebendes Muster-Leistungsverzeichnis", supports: "Praxisbeispiel für Aufgaben, Intervalle, Ausschlüsse und Abnahme", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Keine Quadratmeterpreise oder branchenüblichen Intervalle ohne belegte, datierte Quelle nennen.",
      "Keine Zertifizierung, Desinfektionswirkung oder garantierte Reaktionszeit behaupten.",
    ],
  },
  {
    id: "de-duesseldorf-praxisreinigung-abgrenzung",
    locale: "de",
    workingTitle: "Praxisreinigung in Düsseldorf: Reinigungsumfang und Verantwortung sauber abgrenzen",
    userProblem: "Praxisverantwortliche benötigen eine klare Anfrage, dürfen allgemeine Reinigung, interne Hygienevorgaben und gegebenenfalls gesondert zu beauftragende Maßnahmen aber nicht vermischen.",
    primaryIntent: "scope",
    audience: "Praxismanagement und betriebliche Verantwortliche in Düsseldorf",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["praxisreinigung", "grundreinigung", "reinigung"],
    outline: [
      { heading: "Geltungsbereich festlegen", purpose: "Den Beitrag ausdrücklich als Anfragehilfe und nicht als Hygiene- oder Rechtsberatung einordnen." },
      { heading: "Raumgruppen statt Pauschalauftrag", purpose: "Empfang, Behandlung, Sanitär, Personal und Nebenräume getrennt erfassen." },
      { heading: "Interne Vorgaben als Primärquelle", purpose: "Praxisinterne Pläne, Freigaben und Verantwortlichkeiten vor Angebotsanfrage zusammentragen." },
      { heading: "Reinigung und Sonderanforderungen trennen", purpose: "Ungeklärte Desinfektions-, Aufbereitungs- oder Entsorgungsfragen sichtbar offenlassen." },
      { heading: "Dokumentierter Rückfragenprozess", purpose: "Einen sicheren Weg für Klärungen vor Leistungsbeginn beschreiben." },
    ],
    checklist: [
      "Verantwortliche Person für interne Vorgaben benennen",
      "Raumgruppen und nutzungsabhängige Sperrzeiten erfassen",
      "Reinigungsaufgaben von Desinfektions- oder Medizinproduktprozessen trennen",
      "Produkte und Verfahren nur nach dokumentierter Freigabe festlegen",
      "Unklare Anforderungen vor Angebotsvergleich schriftlich klären",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Status und regionale Zuordnung der Praxisreinigung", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Freigegebener Hygiene- und Reinigungsplan der jeweiligen Praxis", supports: "Objektspezifische Aufgaben, Mittel und Verantwortlichkeiten", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
      { source: "Von der Fachredaktion auszuwählende aktuelle Primärquelle der zuständigen Behörden oder Fachinstitutionen", supports: "Abgrenzung fachlicher und rechtlicher Anforderungen", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Vor Veröffentlichung fachlich prüfen lassen; keine allgemeingültigen Hygienevorgaben ableiten.",
      "Keine medizinische, rechtliche oder behördliche Konformität versprechen.",
    ],
  },
  {
    id: "de-regensburg-umzug-uebergabe-entscheidungsplan",
    locale: "de",
    workingTitle: "Umzug und Wohnungsübergabe in Regensburg koordinieren: ein Entscheidungsplan",
    userProblem: "Haushalte planen Transport, Restarbeiten und Schlüsseltermin oft getrennt und erkennen Abhängigkeiten erst zu spät.",
    primaryIntent: "planning",
    audience: "Mieterinnen, Mieter und Angehörige mit Umzug oder Übergabe in Regensburg",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["umzug", "endreinigung", "umzug-mit-reinigung", "uebergabeakte"],
    outline: [
      { heading: "Vom Übergabetermin rückwärts planen", purpose: "Fixtermine, Puffer und voneinander abhängige Arbeitspakete sichtbar machen." },
      { heading: "Transportumfang belastbar beschreiben", purpose: "Inventar, Zugänge, Wege und Eigenleistungen als Angebotsgrundlage ordnen." },
      { heading: "Leerräumen ist nicht Reinigen", purpose: "Räumung, Transport, Restarbeiten und Reinigung als getrennte Entscheidungen behandeln." },
      { heading: "Prüfpunkt vor Schlüsselabgabe", purpose: "Offene Punkte dokumentieren, ohne eine mietrechtliche Erfolgsgarantie zu suggerieren." },
      { heading: "Plan B für Abweichungen", purpose: "Entscheidungswege für Terminverschiebungen oder unerwartete Restmengen definieren." },
    ],
    checklist: [
      "Vertraglichen Übergabetermin und individuelle Vereinbarungen selbst prüfen",
      "Inventar sowie Abhol- und Zielzugang dokumentieren",
      "Eigenleistungen mit verantwortlicher Person und Fertigtermin festhalten",
      "Reinigung und Restarbeiten erst nach tatsächlichem Leerstand einplanen",
      "Übergabeunterlagen und offene Punkte vor dem Termin zusammentragen",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Öffentlich zulässige Umzugs-, Reinigungs- und Übergabe-Service-IDs", verificationStatus: "INTERNAL_SOURCE" },
      { source: "artifacts/editorial-content-map.csv", supports: "Bestehende Intent-Überlappung im Regensburg-Umzug-/Übergabe-Cluster", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Individueller Mietvertrag und abgestimmter Übergabetermin", supports: "Verbindliche objektspezifische Pflichten und Fristen", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Keine allgemeine Aussage zu mietvertraglichen Pflichten ohne juristische Quellenprüfung.",
      "Keine Verfügbarkeit oder Fertigstellung bis zu einem bestimmten Termin zusagen.",
    ],
  },
  {
    id: "de-regensburg-entruempelung-sortierentscheidung",
    locale: "de",
    workingTitle: "Entrümpelung in Regensburg vorbereiten: behalten, klären oder freigeben",
    userProblem: "Bei Haushalts- oder Wohnungsauflösungen werden persönliche Gegenstände, Dokumente und unklare Eigentumsverhältnisse leicht mit der eigentlichen Räumungslogistik vermischt.",
    primaryIntent: "planning",
    audience: "Privathaushalte, Angehörige und Bevollmächtigte in Regensburg",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["entruempelung", "haushaltsaufloesung", "wohnungsaufloesung"],
    outline: [
      { heading: "Entscheidung vor Bewegung", purpose: "Erst Verfügungsbefugnis und Schutzkategorien klären, dann Gegenstände bewegen lassen." },
      { heading: "Drei-Zonen-Prinzip", purpose: "Behalten, gesondert prüfen und zur Räumung freigeben räumlich eindeutig trennen." },
      { heading: "Unterlagen und persönliche Daten", purpose: "Dokumente, Datenträger und Schlüssel einem eigenen verantwortlichen Prozess zuweisen." },
      { heading: "Zugang und Umfang dokumentieren", purpose: "Räume, Nebenflächen, Wege und Ausschlüsse für eine belastbare Anfrage erfassen." },
      { heading: "Abschlusskontrolle", purpose: "Freigegebene Bereiche und verbliebene Gegenstände nachvollziehbar abgleichen." },
    ],
    checklist: [
      "Bevollmächtigung oder Entscheidungsbefugnis intern klären",
      "Persönliche Dokumente, Schlüssel und Datenträger separat sichern",
      "Behalten-, Prüfen- und Freigabezone sichtbar kennzeichnen",
      "Keller, Dachboden, Garage und Außenflächen ausdrücklich einbeziehen oder ausschließen",
      "Vor Beginn eine dokumentierte Freigabe der betroffenen Bereiche einholen",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Öffentlich zulässige Räumungs-Service-IDs und Status", verificationStatus: "INTERNAL_SOURCE" },
      { source: "artifacts/editorial-content-map.csv", supports: "Bestehende Seiten und Überlappung im Räumungscluster", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Vom Auftraggeber bestätigte Vollmacht oder Freigabe", supports: "Objektspezifische Entscheidungsbefugnis", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Keine Rechtsberatung zu Nachlass, Eigentum oder Vollmacht geben.",
      "Keine Verwertungserlöse, Entsorgungswege oder Kosten ohne konkrete Prüfung versprechen.",
    ],
  },
  {
    id: "de-angebot-vergleichen-annnahmen-ausschluesse",
    locale: "de",
    workingTitle: "Dienstleistungsangebote vergleichen: Annahmen, Ausschlüsse und Rückfragen sichtbar machen",
    userProblem: "Kundinnen und Kunden vergleichen Endbeträge, obwohl Angebote oft auf unterschiedlichen Mengen, Eigenleistungen oder Ausschlüssen beruhen.",
    primaryIntent: "comparison",
    audience: "Private und betriebliche Auftraggebende, die bereits mehrere Angebote vorliegen haben",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["angebotscheck", "anbieter-vergleichen", "objektbrief"],
    outline: [
      { heading: "Preis ist erst nach dem Umfang vergleichbar", purpose: "Vergleich auf gemeinsame Annahmen zurückführen, ohne Anbieter zu bewerten." },
      { heading: "Leistungszeilen normalisieren", purpose: "Inklusive Leistungen, Optionen und Ausschlüsse in dieselbe Struktur übertragen." },
      { heading: "Mengen und Zugänge prüfen", purpose: "Unklare Bezugsgrößen und objektspezifische Bedingungen als Rückfragen markieren." },
      { heading: "Risiken nicht als Aufschlag verstecken", purpose: "Vorbehalte, Nachträge und Entscheidungsfristen transparent erfassen." },
      { heading: "Dokumentierte Rückfrage statt Vermutung", purpose: "Eine kurze, sachliche Rückfrageliste als nächsten Schritt erstellen." },
    ],
    checklist: [
      "Alle Angebote auf denselben gewünschten Leistungsumfang beziehen",
      "Pauschalen, Mengenansätze und optionale Positionen getrennt markieren",
      "Eigenleistungen und bauseitige Voraussetzungen erfassen",
      "Ausschlüsse, Nachtragsregeln und Gültigkeitsfristen wörtlich prüfen",
      "Unklarheiten beim jeweiligen Anbieter bestätigen lassen",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Öffentlich zulässige Angebotscheck- und Vergleichsservices", verificationStatus: "INTERNAL_SOURCE" },
      { source: "artifacts/editorial-content-map.csv", supports: "17 erfasste Seiten im Cluster Angebot und Leistungsumfang", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Vom Nutzer anonymisierte Originalangebote und Anbieterantworten", supports: "Tatsächliche Positionen, Annahmen und Ausschlüsse", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Keine günstigere Alternative, Einsparhöhe oder Marktpreisbewertung garantieren.",
      "Keine vertraulichen Angebotsdaten in Beispiele oder Telemetrie übernehmen.",
    ],
  },
  {
    id: "de-wohnungsuebergabe-nicht-vor-ort-freigaben",
    locale: "de",
    workingTitle: "Wohnungsübergabe aus der Ferne vorbereiten: Freigaben, Nachweise und Eskalationswege",
    userProblem: "Wer nicht vor Ort sein kann, braucht klare Entscheidungs- und Dokumentationswege, ohne die tatsächliche Abnahme oder rechtliche Vertretung stillschweigend vorauszusetzen.",
    primaryIntent: "handover",
    audience: "Abwesende Mieterinnen, Mieter, Angehörige und bevollmächtigte Kontaktpersonen",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["uebergabeakte", "endreinigung", "umzug-mit-reinigung"],
    outline: [
      { heading: "Rolle und Vollmacht zuerst", purpose: "Organisatorische Unterstützung, rechtsgeschäftliche Vertretung und Abnahme klar unterscheiden." },
      { heading: "Entscheidungsmatrix für Rückfragen", purpose: "Festlegen, wer bei Mehrarbeit, Fundstücken oder Terminabweichungen entscheiden darf." },
      { heading: "Nachweisplan ohne Datenüberschuss", purpose: "Nur erforderliche Fotos und Statusangaben mit Empfänger und Aufbewahrungszweck definieren." },
      { heading: "Schlüssel und Zugang", purpose: "Übergabe, Empfang und Rückgabe nachvollziehbar organisieren." },
      { heading: "Offene Punkte transparent abschließen", purpose: "Restpunkte dokumentieren, statt eine erfolgreiche Vermieterabnahme zu versprechen." },
    ],
    checklist: [
      "Rolle und Entscheidungsbefugnis jeder beteiligten Person schriftlich klären",
      "Freigabegrenzen für Zusatzaufwand festlegen",
      "Zugang und Schlüsselübergabe mit Empfangsnachweis planen",
      "Erforderliche Dokumentation und Empfängerkreis minimieren",
      "Direkten Eskalationsweg für nicht freigegebene Situationen bestimmen",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Status der zugeordneten Services", verificationStatus: "INTERNAL_SOURCE" },
      { source: "artifacts/editorial-content-map.csv", supports: "Vorhandene Remote- und Übergabeinhalte sowie Konsolidierungsrisiko", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Vom Auftraggeber freigegebene Vollmacht, Mietvertrag und Terminabstimmung", supports: "Objektspezifische Befugnisse und Anforderungen", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Datenschutz- und Vollmachtsaussagen vor Veröffentlichung fachlich prüfen.",
      "Keine erfolgreiche Abnahme, Kautionsrückzahlung oder rechtliche Wirkung versprechen.",
    ],
  },
  {
    id: "en-regensburg-moving-request-brief",
    locale: "en",
    workingTitle: "Planning a move in Regensburg: build a request brief before asking for quotes",
    userProblem: "English-speaking customers may know the moving date but lack the German terminology and object details needed for comparable, actionable requests.",
    primaryIntent: "planning",
    audience: "English-speaking private customers planning a move to, from or within Regensburg",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["umzug", "umzug-mit-reinigung"],
    outline: [
      { heading: "Start with confirmed facts", purpose: "Separate fixed dates and addresses from estimates and open questions." },
      { heading: "Describe access at both properties", purpose: "Capture floors, lifts, walking distances and restrictions without guessing feasibility." },
      { heading: "Turn belongings into a usable inventory", purpose: "Use categories, dimensions for unusual items and photos only where necessary." },
      { heading: "Separate moving, packing and cleaning", purpose: "Make requested work and customer-provided work explicit." },
      { heading: "Ask the same questions of every provider", purpose: "Create a neutral clarification list instead of promising a price comparison result." },
    ],
    checklist: [
      "Confirm dates, origin, destination and a reachable contact",
      "Record access conditions at both locations",
      "List large, fragile or unusually heavy items separately",
      "Mark packing, dismantling and cleaning as requested or customer-provided",
      "Have every assumption confirmed before accepting an offer",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Public moving service IDs, English names and regional status", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Customer-confirmed inventory and property access information", supports: "Object-specific scope and constraints", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
      { source: "Human-reviewed English terminology against the approved German service registry", supports: "Terminology consistency without adding services", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Do not infer availability, permits, parking arrangements or a fixed price.",
      "Native-level English review and a factual cross-check against the German source are required.",
    ],
  },
  {
    id: "en-duesseldorf-commercial-cleaning-scope",
    locale: "en",
    workingTitle: "Commercial cleaning in Düsseldorf: define a scope providers can answer",
    userProblem: "International office teams need to request local cleaning services without losing important scope, access and responsibility details in translation.",
    primaryIntent: "scope",
    audience: "English-speaking office and facility teams responsible for premises in Düsseldorf",
    status: "HUMAN_REVIEW",
    publishApproved: false,
    publicAllowed: false,
    serviceIds: ["bueroreinigung", "gewerbereinigung", "unterhaltsreinigung"],
    outline: [
      { heading: "Define the premises and its use", purpose: "Describe zones and operating hours before discussing frequency." },
      { heading: "Build a task-and-frequency table", purpose: "Keep tasks, intervals and event-triggered work distinct." },
      { heading: "Assign supplies and waste responsibilities", purpose: "Make ownership explicit instead of assuming local conventions." },
      { heading: "Document access and escalation", purpose: "Identify access windows, key handling and the authorised contact." },
      { heading: "Compare responses on one baseline", purpose: "Check inclusions, exclusions and assumptions without claiming a market benchmark." },
    ],
    checklist: [
      "Confirm the German site address and on-site contact",
      "List zones, tasks and desired frequencies separately",
      "Assign consumables, waste handling and special requests",
      "Document access, security and communication constraints",
      "Request written confirmation of exclusions and assumptions",
    ],
    evidence: [
      { source: "lib/services/service-registry.ts", supports: "Public cleaning service IDs, English labels and Düsseldorf coverage", verificationStatus: "INTERNAL_SOURCE" },
      { source: "artifacts/editorial-content-map.csv", supports: "Current Düsseldorf cleaning cluster and visible evidence gaps", verificationStatus: "INTERNAL_SOURCE" },
      { source: "Human-approved bilingual scope template for the specific premises", supports: "Accurate German-English task mapping", verificationStatus: "HUMAN_SOURCE_REQUIRED" },
    ],
    reviewerNotes: [
      "Do not claim certifications, response times, staffing levels or standard market frequencies.",
      "A bilingual human reviewer must confirm that the English scope does not expand the German service promise.",
    ],
  },
] as const satisfies readonly EditorialDraft[];

export const editorialDraftsAwaitingHumanReview = editorialDrafts.filter(
  (draft) => draft.status === "HUMAN_REVIEW" && !draft.publishApproved && !draft.publicAllowed,
);

export function getEditorialDraftById(id: string): EditorialDraft | undefined {
  return editorialDrafts.find((draft) => draft.id === id);
}
