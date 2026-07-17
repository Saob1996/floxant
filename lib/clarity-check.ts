export type ClarityCheckServiceType = "cleaning" | "moving" | "clearance" | "general";
export type ClarityCheckStatus = "present" | "unclear" | "missing" | "not-relevant";

export type ClarityCheckItem = {
  id: string;
  titleDe: string;
  titleEn: string;
  explanationDe: string;
  explanationEn: string;
  whyImportantDe: string;
  whyImportantEn: string;
  typicalMissingDe: string;
  typicalMissingEn: string;
  followUpDe: string;
  followUpEn: string;
  category: "parties" | "property" | "scope" | "schedule" | "operations" | "commercial" | "completion";
  applicableServiceTypes: readonly ClarityCheckServiceType[];
};

export const clarityCheckItems = [
  {
    id: "provider-contact",
    titleDe: "Anbieter und Ansprechpartner",
    titleEn: "Provider and contact person",
    explanationDe: "Name, erreichbarer Ansprechpartner und Kontaktweg sind im Angebot erkennbar.",
    explanationEn: "The quote identifies the provider, a contact person and a contact channel.",
    whyImportantDe: "Rückfragen und Änderungen brauchen eine eindeutig zuständige Stelle.",
    whyImportantEn: "Questions and changes need a clearly responsible contact.",
    typicalMissingDe: "Ein konkreter Ansprechpartner oder Kontaktweg fehlt.",
    typicalMissingEn: "A named contact person or contact channel is missing.",
    followUpDe: "Wer ist für Rückfragen und Änderungen zuständig?",
    followUpEn: "Who is responsible for questions and changes?",
    category: "parties",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "property-address",
    titleDe: "Objekt und Adresse",
    titleEn: "Property and address",
    explanationDe: "Einsatzort, Objektart sowie bei Umzügen Start und Ziel sind eindeutig beschrieben.",
    explanationEn: "The service location, property type and, for moves, origin and destination are clear.",
    whyImportantDe: "Ort und Objekt bestimmen Anfahrt, Zugang und geeignete Leistung.",
    whyImportantEn: "Location and property type affect travel, access and the suitable service.",
    typicalMissingDe: "PLZ, Objektart oder eine der Umzugsadressen fehlt.",
    typicalMissingEn: "The postcode, property type or one of the moving addresses is missing.",
    followUpDe: "Für welches Objekt und welche vollständigen Einsatzorte gilt das Angebot?",
    followUpEn: "Which property and complete service locations does the quote cover?",
    category: "property",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "quantity-scope",
    titleDe: "Fläche, Menge oder Umfang",
    titleEn: "Area, quantity or volume",
    explanationDe: "Fläche, Räume, Inventar, Volumen oder zu räumende Bereiche sind nachvollziehbar beziffert oder beschrieben.",
    explanationEn: "Area, rooms, inventory, volume or clearance zones are quantified or clearly described.",
    whyImportantDe: "Ohne Mengengerüst lassen sich Aufwand und Leistungsgrenzen schwer vergleichen.",
    whyImportantEn: "Without quantities, effort and scope boundaries are difficult to compare.",
    typicalMissingDe: "Fläche, Raumzahl, Inventarliste oder Volumen ist nur grob genannt.",
    typicalMissingEn: "Area, room count, inventory or volume is only described vaguely.",
    followUpDe: "Welche Fläche, Räume, Mengen oder Gegenstände sind zugrunde gelegt?",
    followUpEn: "Which area, rooms, quantities or items are included in the calculation?",
    category: "scope",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "included-services",
    titleDe: "Enthaltene Leistungen",
    titleEn: "Included services",
    explanationDe: "Die konkreten Arbeitsschritte und bearbeiteten Bereiche sind als Leistungsumfang benannt.",
    explanationEn: "The quote lists the actual tasks and areas included in the scope.",
    whyImportantDe: "Nur benannte Leistungen lassen sich vor Beginn gemeinsam abgleichen.",
    whyImportantEn: "Only stated services can be checked before work starts.",
    typicalMissingDe: "Es steht nur eine Sammelbezeichnung wie Reinigung oder Umzug im Angebot.",
    typicalMissingEn: "The quote only uses a broad label such as cleaning or moving.",
    followUpDe: "Welche einzelnen Arbeiten und Bereiche sind enthalten?",
    followUpEn: "Which individual tasks and areas are included?",
    category: "scope",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "excluded-services",
    titleDe: "Nicht enthaltene Leistungen",
    titleEn: "Excluded services",
    explanationDe: "Ausschlüsse, Voraussetzungen und Leistungen gegen Zusatzauftrag sind sichtbar abgegrenzt.",
    explanationEn: "Exclusions, assumptions and separately charged services are clearly stated.",
    whyImportantDe: "Abgrenzungen verhindern unterschiedliche Erwartungen am Einsatztag.",
    whyImportantEn: "Clear boundaries reduce mismatched expectations on the service date.",
    typicalMissingDe: "Rahmen, Material, Entsorgung, Montage oder Sonderflächen bleiben offen.",
    typicalMissingEn: "Frames, materials, disposal, assembly or special areas remain unclear.",
    followUpDe: "Welche Arbeiten sind ausdrücklich nicht enthalten oder separat zu beauftragen?",
    followUpEn: "Which tasks are explicitly excluded or require a separate order?",
    category: "scope",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "frequency-date",
    titleDe: "Häufigkeit, Termin und Zeitfenster",
    titleEn: "Frequency, date and time window",
    explanationDe: "Turnus, Startdatum, Einmaltermin oder Zeitfenster sind passend zur Leistung festgehalten.",
    explanationEn: "Frequency, start date, one-off date or time window matches the service requested.",
    whyImportantDe: "Termin und Häufigkeit beeinflussen Personalplanung und Leistungsumfang.",
    whyImportantEn: "Timing and frequency affect staffing and the agreed scope.",
    typicalMissingDe: "Der Termin ist nur mündlich genannt oder der Turnus bleibt offen.",
    typicalMissingEn: "The date is only verbal or the frequency is left open.",
    followUpDe: "Welcher Termin, Turnus und welches Zeitfenster sind vereinbart?",
    followUpEn: "Which date, frequency and time window are agreed?",
    category: "schedule",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "materials-consumables",
    titleDe: "Material und Verbrauchsmittel",
    titleEn: "Materials and consumables",
    explanationDe: "Es ist geklärt, wer Material, Geräte, Verpackung oder Verbrauchsmittel bereitstellt.",
    explanationEn: "The quote states who supplies materials, equipment, packing or consumables.",
    whyImportantDe: "Materialfragen verändern Umfang und können Zusatzpositionen auslösen.",
    whyImportantEn: "Materials affect the scope and may create extra items.",
    typicalMissingDe: "Reinigungsmittel, Müllbeutel, Verpackung oder Spezialgerät ist nicht zugeordnet.",
    typicalMissingEn: "Cleaning products, waste bags, packing or specialist equipment are not assigned.",
    followUpDe: "Welche Materialien und Geräte sind enthalten und wer stellt sie bereit?",
    followUpEn: "Which materials and equipment are included, and who supplies them?",
    category: "operations",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "access-keys",
    titleDe: "Zugang, Schlüssel und Wege",
    titleEn: "Access, keys and routes",
    explanationDe: "Etage, Aufzug, Laufweg, Parken, Schlüssel und gegebenenfalls Alarmanlage sind berücksichtigt.",
    explanationEn: "Floor, lift, carrying route, parking, keys and any alarm system are considered.",
    whyImportantDe: "Zugang beeinflusst Dauer, Ablauf und notwendige Abstimmung.",
    whyImportantEn: "Access affects duration, workflow and coordination.",
    typicalMissingDe: "Etage, Schlüsselübergabe, Parkweg oder Alarmkontakt fehlt.",
    typicalMissingEn: "Floor, key handover, parking route or alarm contact is missing.",
    followUpDe: "Wie erfolgt der Zugang und welche Schlüssel-, Park- oder Alarmregeln gelten?",
    followUpEn: "How is access arranged, and what key, parking or alarm rules apply?",
    category: "operations",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "additional-services",
    titleDe: "Zusatzleistungen und Änderungen",
    titleEn: "Additional services and changes",
    explanationDe: "Optionale Zusatzarbeiten und der Umgang mit späteren Änderungen sind beschrieben.",
    explanationEn: "Optional extras and the process for later changes are described.",
    whyImportantDe: "Spätere Ergänzungen sollten nicht erst am Einsatztag preislich offen werden.",
    whyImportantEn: "Later additions should not remain commercially unclear until the service date.",
    typicalMissingDe: "Zusatzstunden, weitere Räume, Montage oder Nacharbeiten sind nicht geregelt.",
    typicalMissingEn: "Extra hours, additional rooms, assembly or follow-up work are not covered.",
    followUpDe: "Wie werden Zusatzleistungen oder Änderungen vor Ausführung bestätigt?",
    followUpEn: "How are extra services or changes approved before they are carried out?",
    category: "operations",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "price-structure",
    titleDe: "Preisstruktur und Zusatzkosten",
    titleEn: "Price structure and extra costs",
    explanationDe: "Pauschale, Einheitspreise, Umsatzsteuer, Fahrt- und mögliche Zusatzkosten sind unterscheidbar.",
    explanationEn: "Fixed price, unit prices, VAT, travel and possible extra costs are distinguishable.",
    whyImportantDe: "Ein Endbetrag ist nur mit seinen Annahmen und möglichen Zusatzpositionen vergleichbar.",
    whyImportantEn: "A final amount is comparable only when assumptions and possible extras are visible.",
    typicalMissingDe: "Netto oder brutto, Anfahrt, Entsorgung oder Mehrarbeit bleibt unklar.",
    typicalMissingEn: "Net or gross price, travel, disposal or extra work remains unclear.",
    followUpDe: "Welche Preisbestandteile und möglichen Zusatzkosten gelten?",
    followUpEn: "Which price components and possible extra costs apply?",
    category: "commercial",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "term-validity",
    titleDe: "Laufzeit, Kündigung oder Gültigkeit",
    titleEn: "Term, cancellation or validity",
    explanationDe: "Bei wiederkehrenden Leistungen sind Laufzeit und Kündigung, bei Einzelaufträgen die Angebotsgültigkeit erkennbar.",
    explanationEn: "Recurring services show term and cancellation; one-off quotes show their validity period.",
    whyImportantDe: "Die zeitliche Bindung muss zur Art des Auftrags passen.",
    whyImportantEn: "The period of commitment needs to fit the type of work.",
    typicalMissingDe: "Gültigkeitsdatum, Mindestlaufzeit oder Kündigungsweg fehlt.",
    typicalMissingEn: "Validity date, minimum term or cancellation process is missing.",
    followUpDe: "Wie lange gilt das Angebot und welche Laufzeit oder Kündigung ist vorgesehen?",
    followUpEn: "How long is the quote valid, and what term or cancellation applies?",
    category: "commercial",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
  {
    id: "completion-questions",
    titleDe: "Abnahme, Rückfragen und Änderungen",
    titleEn: "Completion, questions and changes",
    explanationDe: "Abnahme, Dokumentation, Rückfragen und der Umgang mit Abweichungen sind praktisch beschrieben.",
    explanationEn: "Completion, documentation, questions and deviations are handled in a practical way.",
    whyImportantDe: "Ein klarer Abschlussweg hilft, offene Punkte zeitnah gemeinsam festzuhalten.",
    whyImportantEn: "A clear completion process helps record open points promptly.",
    typicalMissingDe: "Ansprechpartner nach Ausführung, Abnahmeform oder Änderungsweg fehlt.",
    typicalMissingEn: "The post-service contact, completion format or change process is missing.",
    followUpDe: "Wie werden Abschluss, Rückfragen und Abweichungen dokumentiert?",
    followUpEn: "How are completion, questions and deviations documented?",
    category: "completion",
    applicableServiceTypes: ["cleaning", "moving", "clearance", "general"],
  },
] as const satisfies readonly ClarityCheckItem[];

export const clarityCheckMethod = {
  de: {
    name: "FLOXANT Klarheitscheck",
    description: "Zwölf getrennte Bereiche für Leistungsumfang, Ablauf und offene Rückfragen.",
    disclaimer: "Keine Rechtsberatung, Anbieterbewertung, Preisprüfung oder Vollständigkeitsgarantie.",
  },
  en: {
    name: "FLOXANT Scope Check",
    description: "Twelve distinct areas covering scope, operations and open questions.",
    disclaimer: "Not legal advice, a provider rating, a price review or a guarantee of completeness.",
  },
} as const;

export const clarityStatusLabels = {
  de: { present: "vorhanden", unclear: "unklar", missing: "fehlt", "not-relevant": "nicht relevant" },
  en: { present: "present", unclear: "unclear", missing: "missing", "not-relevant": "not relevant" },
} as const;

export function getApplicableClarityItems(serviceType: ClarityCheckServiceType) {
  return clarityCheckItems.filter((item) => item.applicableServiceTypes.includes(serviceType));
}

export function getClarityResultLabel(locale: "de" | "en", statuses: readonly ClarityCheckStatus[]) {
  const considered = statuses.filter((status) => status !== "not-relevant");
  const missing = considered.filter((status) => status === "missing").length;
  const unclear = considered.filter((status) => status === "unclear").length;
  if (locale === "de") {
    if (missing >= 3) return "Wichtige Leistungsdetails fehlen";
    if (missing > 0 || unclear >= 3) return "Mehrere Punkte sollten geklärt werden";
    return "Angaben weitgehend vorhanden";
  }
  if (missing >= 3) return "Important scope details are missing";
  if (missing > 0 || unclear >= 3) return "Several points should be clarified";
  return "Details are largely present";
}
