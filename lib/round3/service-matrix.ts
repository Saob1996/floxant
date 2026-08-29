export type RoundThreeRequestType =
  | "EUROPE_MOVE"
  | "BUDGET_MOVE"
  | "DIFFICULT_SITUATION"
  | "COST_COVERAGE_REQUEST";

export type RoundThreeLocale = "de" | "en";

export type RoundThreeServiceDefinition = {
  serviceId: string;
  requestType: RoundThreeRequestType;
  name: Record<RoundThreeLocale, string>;
  path: Record<RoundThreeLocale, string>;
  region: string;
  actuallyOffered: boolean;
  availabilityNote: Record<RoundThreeLocale, string>;
  targetCustomers: Record<RoundThreeLocale, readonly string[]>;
  included: Record<RoundThreeLocale, readonly string[]>;
  excluded: Record<RoundThreeLocale, readonly string[]>;
  requiredDetails: Record<RoundThreeLocale, readonly string[]>;
  priceFactors: Record<RoundThreeLocale, readonly string[]>;
  optionalServices: Record<RoundThreeLocale, readonly string[]>;
  costPayerPossible: Record<RoundThreeLocale, string>;
  lastReviewed: string;
  metadata: Record<
    RoundThreeLocale,
    {
      shortTitle: string;
      longTitle: string;
      activeTitle: string;
      h1: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
    }
  >;
};

export const ROUND_THREE_REVIEW_DATE = "2026-08-29";

export const roundThreeServiceMatrix = {
  europeMove: {
    serviceId: "EUROPE_MOVE_FROM_GERMANY",
    requestType: "EUROPE_MOVE",
    name: {
      de: "Europa-Umzug ab Deutschland",
      en: "Moving from Germany to Europe",
    },
    path: {
      de: "/europa-umzug-ab-deutschland",
      en: "/en/moving-from-germany-to-europe",
    },
    region: "Start ausschließlich in Deutschland; Ziel in Europa nach Einzelfallprüfung",
    actuallyOffered: true,
    availabilityNote: {
      de: "FLOXANT nimmt Anfragen mit Start in Deutschland an. Route, Kapazität, Zoll- und Steuerbehandlung sowie Machbarkeit werden vor einem verbindlichen Angebot geprüft.",
      en: "FLOXANT accepts enquiries that start in Germany. Route, capacity, customs and tax treatment, and feasibility are checked before any binding quote.",
    },
    targetCustomers: {
      de: ["Privathaushalte", "Familien", "Beruflich Umziehende", "Unternehmen"],
      en: ["Private households", "Families", "Professionals relocating", "Businesses"],
    },
    included: {
      de: ["Routen- und Machbarkeitsprüfung", "Umzugstransport nach bestätigtem Leistungsumfang", "Abstimmung von Zugang, Volumen und Termin", "Klare Kennzeichnung von Prüf- und Ausschlusspunkten"],
      en: ["Route and feasibility review", "Moving transport for the confirmed scope", "Coordination of access, volume and timing", "Clear identification of review points and exclusions"],
    },
    excluded: {
      de: ["Umzüge mit Start außerhalb Deutschlands", "Rechts-, Steuer- oder Zollberatung", "Automatische Zollabwicklung", "Garantierte Termine vor Prüfung"],
      en: ["Moves starting outside Germany", "Legal, tax or customs advice", "Automatic customs clearance", "Guaranteed dates before review"],
    },
    requiredDetails: {
      de: ["Startort in Deutschland", "Zielland und Zielort", "Wunschtermin oder Zeitfenster", "Haushaltsgröße und Volumen", "Etagen, Aufzüge und Zufahrt", "Gewünschte Zusatzleistungen"],
      en: ["Origin in Germany", "Destination country and city", "Preferred date or window", "Household size and volume", "Floors, lifts and access", "Requested add-ons"],
    },
    priceFactors: {
      de: ["Entfernung und Route", "Volumen und Gewicht", "Tragewege und Zugang", "Personal- und Fahrzeugbedarf", "Zusatzleistungen", "Grenz-, Transit-, Steuer- oder Zollanforderungen nach Prüfung"],
      en: ["Distance and route", "Volume and weight", "Carrying distances and access", "Crew and vehicle requirements", "Add-ons", "Border, transit, tax or customs requirements after review"],
    },
    optionalServices: {
      de: ["Verpacken", "Möbelmontage", "Zwischenlagerung nach Verfügbarkeit", "Endreinigung nach separater Prüfung"],
      en: ["Packing", "Furniture assembly", "Temporary storage subject to availability", "Final cleaning after a separate review"],
    },
    costPayerPossible: {
      de: "Nur nach schriftlicher Zusage des jeweiligen Kostenträgers; FLOXANT gibt keine Kostenübernahmegarantie.",
      en: "Only with written approval from the relevant payer; FLOXANT does not guarantee cost coverage.",
    },
    lastReviewed: ROUND_THREE_REVIEW_DATE,
    metadata: {
      de: {
        shortTitle: "Europa-Umzug ab Deutschland | FLOXANT",
        longTitle: "Europa-Umzug ab Deutschland strukturiert anfragen | FLOXANT",
        activeTitle: "Europa-Umzug ab Deutschland anfragen | FLOXANT",
        h1: "Europa-Umzug mit Start in Deutschland klar planen",
        metaDescription: "Europa-Umzug mit Start in Deutschland anfragen: Route, Volumen, Zugang, Termin und mögliche Grenzanforderungen strukturiert prüfen lassen.",
        ogTitle: "Europa-Umzug ab Deutschland mit klarer Vorprüfung",
        ogDescription: "Drei Schritte für Route, Umzugsumfang und Kontakt – ohne automatische Buchungs- oder Zollzusage.",
      },
      en: {
        shortTitle: "Move from Germany to Europe | FLOXANT",
        longTitle: "Plan a move from Germany to Europe | FLOXANT",
        activeTitle: "Moving from Germany to Europe | FLOXANT",
        h1: "Plan your move from Germany to Europe with clear checks",
        metaDescription: "Request a move starting in Germany: provide route, volume, access and timing for a structured feasibility review.",
        ogTitle: "Moving from Germany to Europe with a clear review",
        ogDescription: "Three steps for route, moving scope and contact, with no automatic booking or customs promise.",
      },
    },
  },
  budgetMove: {
    serviceId: "MOVE_WITH_GROSS_BUDGET",
    requestType: "BUDGET_MOVE",
    name: { de: "Umzug mit Preisvorstellung", en: "Moving with a budget" },
    path: { de: "/umzug-mit-preisvorstellung", en: "/en/moving-with-a-budget" },
    region: "Regensburg und erreichbare Start-/Zielorte nach Routenprüfung",
    actuallyOffered: true,
    availabilityNote: {
      de: "FLOXANT prüft, ob Leistungsumfang und Bruttopreisvorstellung zusammenpassen. Die Eingabe ist keine Annahme und kein verbindliches Angebot.",
      en: "FLOXANT checks whether the scope and stated gross budget can be reconciled. Submission is neither acceptance nor a binding quote.",
    },
    targetCustomers: { de: ["Privathaushalte mit konkreter Preisvorstellung", "Kunden mit flexiblem Leistungsumfang"], en: ["Private households with a clear budget", "Customers who can adjust the scope"] },
    included: { de: ["Machbarkeitsprüfung", "Abgleich von Budget und Umfang", "Möglicher Vorschlag für reduzierten Umfang", "Klare Rückmeldung"], en: ["Feasibility review", "Budget-to-scope comparison", "Possible reduced-scope proposal", "Clear response"] },
    excluded: { de: ["Automatische Annahme des Budgets", "Preisgarantie ohne Prüfung", "Verdeckte Nettoangaben für Verbraucher", "Auftrag ohne Bestätigung"], en: ["Automatic budget acceptance", "Price guarantee without review", "Hidden net pricing for consumers", "Order without confirmation"] },
    requiredDetails: { de: ["Start und Ziel", "Umfang und Volumen", "Wunschtermin", "Bruttopreisvorstellung inklusive 19 % MwSt.", "Unverzichtbare und flexible Leistungen"], en: ["Origin and destination", "Scope and volume", "Preferred date", "Gross budget including 19% VAT", "Essential and flexible services"] },
    priceFactors: { de: ["Route", "Volumen", "Etagen und Tragewege", "Personalbedarf", "Termin", "Zusatzleistungen"], en: ["Route", "Volume", "Floors and carrying distances", "Crew", "Timing", "Add-ons"] },
    optionalServices: { de: ["Verpacken", "Montage", "Reinigung", "Flexible Terminoption"], en: ["Packing", "Assembly", "Cleaning", "Flexible timing"] },
    costPayerPossible: { de: "Bei möglichem Kostenträger gilt dessen vorherige schriftliche Zusage; keine Garantie durch FLOXANT.", en: "Where a payer may be involved, prior written approval is required; FLOXANT gives no guarantee." },
    lastReviewed: ROUND_THREE_REVIEW_DATE,
    metadata: {
      de: { shortTitle: "Umzug mit Preisvorstellung | FLOXANT", longTitle: "Umzug mit Bruttopreisvorstellung prüfen lassen | FLOXANT", activeTitle: "Umzug mit Preisvorstellung anfragen | FLOXANT", h1: "Umzug mit klarer Preisvorstellung anfragen", metaDescription: "Bruttopreisvorstellung inklusive 19 % MwSt., Route und Umfang senden. FLOXANT prüft Machbarkeit oder einen passenden reduzierten Umfang.", ogTitle: "Passt Ihr Umzug zu Ihrer Preisvorstellung?", ogDescription: "Budget und Umfang transparent prüfen lassen – ohne automatische Annahme." },
      en: { shortTitle: "Moving with a budget | FLOXANT", longTitle: "Have your moving budget and scope reviewed | FLOXANT", activeTitle: "Moving with a budget | FLOXANT", h1: "Request a move with a clear gross budget", metaDescription: "Send your gross budget including 19% VAT, route and scope. FLOXANT reviews feasibility or a possible reduced scope.", ogTitle: "Can your move fit your stated budget?", ogDescription: "A transparent scope and budget review with no automatic acceptance." },
    },
  },
  difficultSituation: {
    serviceId: "DIFFICULT_SITUATION_SUPPORT",
    requestType: "DIFFICULT_SITUATION",
    name: { de: "Hilfe in schwierigen Lebenssituationen", en: "Help in difficult situations" },
    path: { de: "/hilfe-in-schwierigen-lebenssituationen", en: "/en/help-in-difficult-situations" },
    region: "Regensburg und Umgebung; weitere Routen nach Prüfung",
    actuallyOffered: true,
    availabilityNote: { de: "FLOXANT prüft praktische Hilfe für Umzug, Räumung, Transport oder Reinigung. Eine Diagnose, Todesursache oder intime Lebensgeschichte ist nicht nötig.", en: "FLOXANT reviews practical help for moving, clearance, transport or cleaning. No diagnosis, cause of death or intimate personal history is needed." },
    targetCustomers: { de: ["Menschen mit dringendem praktischem Unterstützungsbedarf", "Angehörige", "Bevollmächtigte", "Soziale Ansprechpartner"], en: ["People needing urgent practical support", "Relatives", "Authorised representatives", "Social support contacts"] },
    included: { de: ["Diskrete Erstprüfung", "Priorisierung nach Termin und praktischer Aufgabe", "Klare Abgrenzung des möglichen Umfangs", "Kontakt in gewünschter Sprache"], en: ["Discreet initial review", "Prioritisation by timing and practical task", "Clear scope boundaries", "Contact in the preferred response language"] },
    excluded: { de: ["Medizinische, psychologische oder rechtliche Beratung", "Krisenintervention", "Anforderung sensibler Diagnosen", "Leistungs- oder Kostenübernahmegarantie"], en: ["Medical, psychological or legal advice", "Crisis intervention", "Requests for sensitive diagnoses", "Service or cost-coverage guarantees"] },
    requiredDetails: { de: ["Praktische Aufgabe", "Ort", "Zeitfenster", "Zugang", "Gewünschter Kontaktweg", "Optional Preisvorstellung"], en: ["Practical task", "Location", "Time window", "Access", "Preferred contact method", "Optional budget"] },
    priceFactors: { de: ["Gewählte Leistung", "Umfang", "Zugang", "Personal und Fahrzeuge", "Termin", "Entsorgung nur nach tatsächlichem Material"], en: ["Selected service", "Scope", "Access", "Crew and vehicles", "Timing", "Disposal only after actual material review"] },
    optionalServices: { de: ["Umzug", "Transport", "Räumung", "Reinigung", "Übergabevorbereitung"], en: ["Moving", "Transport", "Clearance", "Cleaning", "Handover preparation"] },
    costPayerPossible: { de: "Ein Kostenträger kann nur nach individueller Prüfung und schriftlicher Zusage einbezogen werden; keine Garantie.", en: "A payer can only be involved after individual review and written approval; no guarantee." },
    lastReviewed: ROUND_THREE_REVIEW_DATE,
    metadata: {
      de: { shortTitle: "Praktische Hilfe in schwieriger Lage | FLOXANT", longTitle: "Diskrete praktische Hilfe in schwierigen Lebenssituationen | FLOXANT", activeTitle: "Hilfe in schwierigen Lebenssituationen | FLOXANT", h1: "Praktische Hilfe, wenn gerade vieles zusammenkommt", metaDescription: "Umzug, Räumung, Transport oder Reinigung diskret anfragen. Keine Diagnose oder private Lebensgeschichte nötig; FLOXANT prüft die praktische Aufgabe.", ogTitle: "Diskrete praktische Hilfe ohne unnötige private Angaben", ogDescription: "Die Aufgabe, der Ort und das Zeitfenster genügen für eine erste Machbarkeitsprüfung." },
      en: { shortTitle: "Practical help in difficult situations | FLOXANT", longTitle: "Discreet practical help in difficult situations | FLOXANT", activeTitle: "Help in difficult situations | FLOXANT", h1: "Practical help when several things become difficult at once", metaDescription: "Discreetly request moving, clearance, transport or cleaning. No diagnosis or private life story is needed for the practical review.", ogTitle: "Discreet practical help without unnecessary private details", ogDescription: "The task, location and time window are enough for an initial feasibility review." },
    },
  },
  costCoverage: {
    serviceId: "COST_COVERAGE_PREPARATION",
    requestType: "COST_COVERAGE_REQUEST",
    name: { de: "Kostenübernahme für Umzug und Haushaltshilfe", en: "Cost coverage for moving and household help" },
    path: { de: "/kostenuebernahme-fuer-umzug-und-haushaltshilfe", en: "/en/cost-coverage-for-moving-and-household-help" },
    region: "Deutschland; Ausführung nur im bestätigten FLOXANT-Leistungsgebiet bzw. nach Routenprüfung",
    actuallyOffered: true,
    availabilityNote: { de: "FLOXANT kann Leistungsumfang und Kostenvoranschlag vorbereiten. Ob und wie ein Kostenträger zahlt, entscheidet ausschließlich die zuständige Stelle.", en: "FLOXANT can prepare a service scope and cost estimate. Only the responsible payer decides whether and how costs are covered." },
    targetCustomers: { de: ["Antragstellende", "Angehörige oder Bevollmächtigte", "Arbeitnehmende bei beruflichem Umzug"], en: ["Applicants", "Relatives or authorised representatives", "Employees relocating for work"] },
    included: { de: ["Erfassung von Leistung und Kostenträger", "Vorbereitung eines prüfbaren Kostenvoranschlags", "Dokumentation von Rückfragen und Freigabestatus", "Anpassung des Umfangs nach schriftlicher Entscheidung"], en: ["Capture of scope and prospective payer", "Preparation of a reviewable cost estimate", "Documentation of questions and approval status", "Scope adjustment after a written decision"] },
    excluded: { de: ["Rechtsberatung", "Antragstellung im Namen des Kunden", "Genehmigungs- oder Zahlungszusage", "Abrechnung als anerkannter Pflegeanbieter ohne bestätigten Status"], en: ["Legal advice", "Submitting an application on the customer's behalf", "Approval or payment guarantee", "Billing as a recognised care provider without confirmed status"] },
    requiredDetails: { de: ["Benötigte praktische Leistung", "Ort und Zeitfenster", "Möglicher Kostenträger", "Stand der Anfrage", "Vorliegende schriftliche Vorgaben ohne sensible Diagnosen"], en: ["Practical service required", "Location and time window", "Possible payer", "Application status", "Relevant written requirements without sensitive diagnoses"] },
    priceFactors: { de: ["Tatsächlicher Leistungsumfang", "Route", "Personal und Material", "Zugang", "Termin", "Vorgaben des Kostenträgers"], en: ["Actual scope", "Route", "Crew and materials", "Access", "Timing", "Payer requirements"] },
    optionalServices: { de: ["Umzug", "Transport", "Haushaltsnahe Reinigung im tatsächlich angebotenen Umfang", "Räumung"], en: ["Moving", "Transport", "Household cleaning within the actually offered scope", "Clearance"] },
    costPayerPossible: { de: "Möglich je nach Rechtsgrundlage und Einzelfall, aber nie garantiert. Vor Beauftragung ist grundsätzlich eine schriftliche Entscheidung der zuständigen Stelle erforderlich.", en: "May be possible depending on the legal basis and individual case, but is never guaranteed. A written decision from the responsible body is generally required before commissioning." },
    lastReviewed: ROUND_THREE_REVIEW_DATE,
    metadata: {
      de: { shortTitle: "Kostenübernahme Umzug & Haushaltshilfe | FLOXANT", longTitle: "Kostenübernahme für Umzug und Haushaltshilfe vorbereiten | FLOXANT", activeTitle: "Kostenübernahme für Umzug & Haushaltshilfe | FLOXANT", h1: "Kostenübernahme zuerst klären, Leistung danach sauber planen", metaDescription: "Möglichen Kostenträger, Leistung und Antragsstand erfassen. FLOXANT erstellt bei Eignung einen Kostenvoranschlag, ohne Genehmigung zu versprechen.", ogTitle: "Kostenvoranschlag für Umzug oder Haushaltshilfe vorbereiten", ogDescription: "Sauber zwischen Kostenvoranschlag, Antrag, Freigabe und Auftrag unterscheiden." },
      en: { shortTitle: "Cost coverage for moving and household help | FLOXANT", longTitle: "Prepare cost coverage for moving or household help | FLOXANT", activeTitle: "Cost coverage for moving & household help | FLOXANT", h1: "Clarify cost coverage before planning the service", metaDescription: "Record the possible payer, service and application status. FLOXANT may prepare a cost estimate without promising approval.", ogTitle: "Prepare a cost estimate for moving or household help", ogDescription: "Keep cost estimate, application, approval and order clearly separate." },
    },
  },
} as const satisfies Record<string, RoundThreeServiceDefinition>;

export type RoundThreeServiceKey = keyof typeof roundThreeServiceMatrix;

export function getRoundThreeService(key: RoundThreeServiceKey) {
  return roundThreeServiceMatrix[key];
}

export const roundThreeServices = Object.values(roundThreeServiceMatrix);
