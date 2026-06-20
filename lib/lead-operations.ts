import type {
  LeadPriorityDecision,
  LeadValidationResult,
  NormalizedLeadSubmission,
  OperationalLeadKind,
} from "@/lib/lead-types";

export type SignatureServiceLeadDefinition = {
  signatureServiceKey: string;
  label: string;
  intent: NormalizedLeadSubmission["intentCanonical"];
  requiredInfo: string[];
  optionalInfo: string[];
  priorityHints: string[];
  successState: string;
  responseTemplate: string;
  contactParams: {
    service: string;
    intent: string;
  };
  matchingServices: string[];
  cities: Array<"duesseldorf" | "regensburg" | "both">;
  boundaries: string[];
};

export type LeadOperationsSnapshot = {
  leadKind: OperationalLeadKind;
  locationKey: NormalizedLeadSubmission["locationKey"];
  canonical: {
    service: NormalizedLeadSubmission["serviceCanonical"];
    city: NormalizedLeadSubmission["cityCanonical"];
    intent: NormalizedLeadSubmission["intentCanonical"];
    urgency: NormalizedLeadSubmission["urgencyCanonical"];
    offerStatus: NormalizedLeadSubmission["offer"]["offerStatusCanonical"];
    offerConcern: NormalizedLeadSubmission["offer"]["offerConcernCanonical"];
  };
  signatureService?: SignatureServiceLeadDefinition;
  missingInfo: string[];
  responseTemplate: string;
  successState: string;
  nextSteps: string[];
  doNotPromise: string[];
  internalChecklist: string[];
};

export const signatureServiceLeadDefinitions: SignatureServiceLeadDefinition[] = [
  {
    signatureServiceKey: "floxant-angebotscheck",
    label: "FLOXANT Angebotscheck",
    intent: "angebot-pruefen",
    requiredInfo: ["Leistungsbereich", "Ort", "Angebotsstatus", "Pruefgrund", "Kontaktweg"],
    optionalInfo: ["Angebotspreis", "Anbieter/Plattform", "Upload", "Fotos", "Deadline"],
    priorityHints: ["schriftliches Angebot", "kurze Deadline", "mehrere Angebote", "B2B-Kontext"],
    successState:
      "Anfrage erhalten. FLOXANT ordnet Angaben, Leistungsumfang und naechste sinnvolle Schritte ein. Keine Rechtsberatung und keine Preisgarantie.",
    responseTemplate:
      "Danke fuer die Angaben. Wir sortieren Angebot, Leistungsumfang, Termin und offene Punkte. Falls noch etwas fehlt, melden wir uns ueber den gewaehlten Kontaktweg.",
    contactParams: { service: "angebot-pruefen", intent: "angebot-pruefen" },
    matchingServices: ["reinigung", "umzug", "entruempelung", "bueroreinigung", "gewerbereinigung"],
    cities: ["both"],
    boundaries: ["keine Rechtsberatung", "keine Preisgarantie", "keine Diffamierung anderer Anbieter"],
  },
  {
    signatureServiceKey: "floxant-fairpreis-check",
    label: "FLOXANT Fairpreis-Check",
    intent: "angebot-pruefen",
    requiredInfo: ["Leistungsbereich", "Ort", "Umfang", "Kontaktweg"],
    optionalInfo: ["Angebotspreis", "Leistungspositionen", "Fotos", "Termin", "Budgetrahmen"],
    priorityHints: ["Preis wirkt unklar", "Leistungsumfang nicht vergleichbar", "B2B oder Uebergabe-Kontext"],
    successState:
      "Fairpreis-Anfrage erhalten. FLOXANT ordnet Aufwandstreiber, Umfang und offene Punkte ein. Keine Preis- oder Ersparnisgarantie.",
    responseTemplate:
      "Danke. Wir pruefen, welche Angaben fuer eine faire Einordnung fehlen: Umfang, Zugang, Termin, Fotos und Angebotspositionen.",
    contactParams: { service: "angebot-pruefen", intent: "angebot-pruefen" },
    matchingServices: ["reinigung", "umzug", "entruempelung", "bueroreinigung", "gewerbereinigung"],
    cities: ["both"],
    boundaries: ["keine Preisgarantie", "keine Ersparnisgarantie", "keine Rechtsberatung"],
  },
  {
    signatureServiceKey: "floxant-objektbrief",
    label: "FLOXANT Objektbrief",
    intent: "signature-service",
    requiredInfo: ["Objektart", "Ort", "Zielzustand", "Kontaktweg"],
    optionalInfo: ["Fotos", "Zugang", "Schluesselweg", "Termin", "Umfang"],
    priorityHints: ["unklarer Service", "mehrere Gewerke", "nicht vor Ort"],
    successState: "Angaben werden strukturiert. FLOXANT klaert offene Punkte, bevor ein naechster Schritt empfohlen wird.",
    responseTemplate:
      "Danke. Wir bereiten die Angaben als Objektbrief vor: Objekt, Ziel, Zugang, Fotos und offene Fragen. Danach wird klarer, welcher Servicepfad passt.",
    contactParams: { service: "objektbrief", intent: "signature-service" },
    matchingServices: ["reinigung", "entruempelung", "umzug", "angebot-pruefen"],
    cities: ["both"],
    boundaries: ["keine automatische Zusage", "keine Rechtsberatung", "keine Bewertung von Eigentumsfragen"],
  },
  {
    signatureServiceKey: "floxant-uebergabeakte",
    label: "FLOXANT Uebergabeakte",
    intent: "signature-service",
    requiredInfo: ["Objekt", "Uebergabeziel", "Termin", "Kontaktweg"],
    optionalInfo: ["Fotos", "Schluesselstatus", "Restpunkte", "Reinigung", "Raeumung"],
    priorityHints: ["feste Uebergabe", "Raeumung plus Reinigung", "nicht vor Ort"],
    successState: "FLOXANT sortiert Fotos, Restpunkte und naechste Schritte fuer die Uebergabevorbereitung.",
    responseTemplate:
      "Danke. Wir pruefen, welche Informationen fuer eine Uebergabeakte fehlen und welche Punkte vor dem Termin praktisch geklaert werden sollten.",
    contactParams: { service: "objektbrief", intent: "signature-service" },
    matchingServices: ["reinigung", "entruempelung", "wohnungsaufloesung"],
    cities: ["regensburg", "both"],
    boundaries: ["keine Abnahmegarantie", "keine mietrechtliche Beratung", "keine offizielle Wohnungsabnahme"],
  },
  {
    signatureServiceKey: "floxant-uebergabe-sprint",
    label: "FLOXANT Uebergabe-Sprint",
    intent: "signature-service",
    requiredInfo: ["Deadline", "Ort", "Restpunkte", "Kontaktweg"],
    optionalInfo: ["Fotos", "Zugang", "Schluessel", "Prioritaetenliste"],
    priorityHints: ["kurzfristig", "Uebergabe diese Woche", "Plan droht zu kippen"],
    successState: "Dringlichkeit wird beruecksichtigt. FLOXANT prueft, welche Restpunkte realistisch priorisiert werden koennen.",
    responseTemplate:
      "Danke. Wir pruefen die Deadline, Restpunkte und den Zugang. Falls Angaben fehlen, fragen wir gezielt nach.",
    contactParams: { service: "plan-b-service", intent: "plan-b" },
    matchingServices: ["reinigung", "entruempelung", "plan-b-service"],
    cities: ["regensburg", "both"],
    boundaries: ["keine Sofortgarantie", "keine Kapazitaetsgarantie", "keine Abnahmegarantie"],
  },
  {
    signatureServiceKey: "floxant-plan-b-service",
    label: "FLOXANT Plan-B-Service",
    intent: "plan-b",
    requiredInfo: ["Problem", "Deadline", "Ort", "Kontaktweg"],
    optionalInfo: ["bisheriger Anbieter", "Angebot", "Fotos", "offene Punkte"],
    priorityHints: ["Anbieter faellt aus", "Deadline sehr nah", "Uebergabe gefaehrdet"],
    successState: "Plan-B-Anfrage erhalten. FLOXANT prueft Dringlichkeit und realistische naechste Schritte ohne Sofortgarantie.",
    responseTemplate:
      "Danke. Wir schauen zuerst auf Deadline, Ort, offenen Umfang und Kontaktweg. Wenn ein Plan B machbar erscheint oder Rueckfragen noetig sind, melden wir uns.",
    contactParams: { service: "plan-b-service", intent: "plan-b" },
    matchingServices: ["umzug", "reinigung", "entruempelung", "angebot-pruefen"],
    cities: ["both"],
    boundaries: ["keine Sofortgarantie", "keine Verfuegbarkeitsgarantie", "keine Aufforderung zum Vertragsbruch"],
  },
  {
    signatureServiceKey: "floxant-rueckfahrt-radar",
    label: "FLOXANT Rueckfahrt-Radar",
    intent: "signature-service",
    requiredInfo: ["Start", "Ziel", "Transportgut", "Zeitfenster", "Kontaktweg"],
    optionalInfo: ["Flexibilitaet", "Fotos", "Etage", "Zugang"],
    priorityHints: ["klare Route", "flexibles Zeitfenster", "kleines Volumen"],
    successState: "Route, Zeitfenster und Transportgut werden geprueft. Es gibt keine erfundene Rueckfahrt.",
    responseTemplate:
      "Danke. Wir pruefen Start, Ziel, Umfang und Zeitfenster. Wenn die Route nicht passt, nennen wir eine naheliegende Alternative oder fragen nach.",
    contactParams: { service: "umzug", intent: "signature-service" },
    matchingServices: ["umzug", "moebeltransport", "klaviertransport"],
    cities: ["regensburg"],
    boundaries: ["keine erfundene Rueckfahrt", "keine Termin- oder Preisgarantie"],
  },
  {
    signatureServiceKey: "floxant-diskret-service",
    label: "FLOXANT Diskret-Service",
    intent: "diskret",
    requiredInfo: ["Kontaktweg", "Ort", "grober Zeitraum"],
    optionalInfo: ["Rueckrufzeit", "Kontaktbeschraenkung", "grober Umfang", "Fotos"],
    priorityHints: ["sensible Situation", "Rueckruf bevorzugt", "kurze Frist"],
    successState:
      "Diskrete Anfrage erhalten. FLOXANT beruecksichtigt den bevorzugten Kontaktweg soweit moeglich. Details koennen spaeter ruhig geklaert werden.",
    responseTemplate:
      "Danke. Fuer den Start reichen Ort, grober Zeitraum und Kontaktweg. Wir fragen nur die Angaben nach, die fuer den naechsten Schritt wirklich noetig sind.",
    contactParams: { service: "diskret-service", intent: "diskret" },
    matchingServices: ["umzug", "reinigung", "entruempelung", "objektbrief"],
    cities: ["regensburg", "both"],
    boundaries: ["keine Rechtsberatung", "keine Sicherheitsdienstleistung", "keine Konfliktloesung"],
  },
  {
    signatureServiceKey: "floxant-vermieter-ready-service",
    label: "FLOXANT Vermieter-Ready-Service",
    intent: "signature-service",
    requiredInfo: ["Objekt", "Zielzustand", "Termin", "Kontaktweg"],
    optionalInfo: ["Fotos", "Restpunkte", "Schluessel", "Reinigung", "Raeumung"],
    priorityHints: ["Mieterwechsel", "Wiedervermietung", "Uebergabeziel"],
    successState: "FLOXANT sortiert Zielzustand, Restpunkte und praktische naechste Schritte.",
    responseTemplate:
      "Danke. Wir pruefen, welche Angaben fuer die Vorbereitung des Objekts fehlen und ob Reinigung, Raeumung oder Dokumentation zuerst sinnvoll ist.",
    contactParams: { service: "reinigung", intent: "signature-service" },
    matchingServices: ["reinigung", "entruempelung", "wohnungsaufloesung"],
    cities: ["both"],
    boundaries: ["keine mietrechtliche Bewertung", "keine Vermietungsgarantie", "keine Maklerleistung"],
  },
  {
    signatureServiceKey: "floxant-buero-startklar-service",
    label: "FLOXANT Buero-Startklar-Service",
    intent: "b2b-anfrage",
    requiredInfo: ["Firma", "Objektart", "Flaeche oder Raeume", "Turnus oder Starttermin", "Kontaktweg"],
    optionalInfo: ["Reinigungszeiten", "Ansprechpartnerrolle", "bestehendes Angebot", "Fotos"],
    priorityHints: ["Firma", "klare Flaeche", "Turnus", "Starttermin"],
    successState: "B2B-Anfrage erhalten. FLOXANT ordnet Flaeche, Turnus, Zeiten und Ansprechpartner ein.",
    responseTemplate:
      "Danke. Fuer Unternehmen helfen uns Flaeche, Turnus, gewuenschte Zeiten und Ansprechpartner. Eine Anfrage ist noch keine Beauftragung.",
    contactParams: { service: "bueroreinigung", intent: "b2b-anfrage" },
    matchingServices: ["bueroreinigung", "gewerbereinigung", "praxisreinigung"],
    cities: ["both"],
    boundaries: ["keine Fake-Referenzen", "keine Zertifikatsbehauptung", "keine automatische Beauftragung"],
  },
  {
    signatureServiceKey: "floxant-pv-sichtklar-service",
    label: "FLOXANT PV-Sichtklar-Service",
    intent: "spezialservice",
    requiredInfo: ["Dachart", "Zugang", "Ort", "Kontaktweg"],
    optionalInfo: ["Modulflaeche", "Fotos", "Wasserzugang", "Sicherheitslage"],
    priorityHints: ["Fotos", "klarer Zugang", "PV-Flaeche", "Terminfenster"],
    successState: "PV-Anfrage erhalten. FLOXANT prueft Zugang, Flaeche und naechste Rueckfragen ohne Ertragsversprechen.",
    responseTemplate:
      "Danke. Wir pruefen Dachart, Zugang, Modulflaeche und Fotos. Ertrag, Dachstatik oder Elektrofragen werden nicht versprochen.",
    contactParams: { service: "pv-anlagen-reinigung", intent: "spezialservice" },
    matchingServices: ["solarreinigung", "pv-anlagen-reinigung", "reinigung"],
    cities: ["both"],
    boundaries: ["keine Ertragsgarantie", "keine Dachstatik", "keine Elektroberatung"],
  },
  {
    signatureServiceKey: "floxant-entscheidungs-kompass",
    label: "FLOXANT Entscheidungs-Kompass",
    intent: "service-unsicher",
    requiredInfo: ["Ort", "grobes Problem", "Kontaktweg"],
    optionalInfo: ["Termin", "Fotos", "Budget", "vorhandenes Angebot"],
    priorityHints: ["unklarer Service", "mehrere Leistungen", "Angebot vorhanden"],
    successState: "FLOXANT ordnet die Anfrage und fragt gezielt nach, wenn der passende Service noch unklar ist.",
    responseTemplate:
      "Danke. Wir sortieren zuerst, welcher Servicepfad passt. Wenn Informationen fehlen, stellen wir kurze Rueckfragen statt vorschnell etwas zu versprechen.",
    contactParams: { service: "sonstiges", intent: "service-unsicher" },
    matchingServices: ["reinigung", "umzug", "entruempelung", "angebot-pruefen"],
    cities: ["both"],
    boundaries: ["keine automatische Entscheidung", "keine Preiszusage", "keine Rechtsberatung"],
  },
];

export function getSignatureServiceDefinition(key: string) {
  return signatureServiceLeadDefinitions.find((item) => item.signatureServiceKey === key) || null;
}

function defaultSuccessState(lead: NormalizedLeadSubmission) {
  if (lead.leadKind === "offer-check") {
    return "Anfrage erhalten. FLOXANT ordnet Angebot, Angaben und offene Punkte ein. Keine Rechtsberatung, keine Preisgarantie.";
  }
  if (lead.leadKind === "b2b") {
    return "B2B-Anfrage erhalten. Flaeche, Turnus, Zeiten und Ansprechpartner helfen bei der ersten Einordnung. Eine Anfrage ist noch keine Beauftragung.";
  }
  if (lead.serviceCanonical === "klaviertransport") {
    return "Anfrage erhalten. Etage, Zugang, Instrumentart, Termin und Fotos helfen bei der naechsten Rueckfrage.";
  }
  if (lead.serviceCanonical === "solarreinigung" || lead.serviceCanonical === "pv-anlagen-reinigung") {
    return "Anfrage erhalten. Dachart, Zugang, Modulflaeche und Fotos helfen. Es gibt keine Ertragsversprechen.";
  }
  if (lead.leadKind === "discreet") {
    return "Diskrete Anfrage erhalten. Der bevorzugte Kontaktweg wird beruecksichtigt, soweit moeglich.";
  }
  if (lead.leadKind === "plan-b") {
    return "Plan-B-Anfrage erhalten. Dringlichkeit wird beruecksichtigt; eine Sofortzusage wird nicht versprochen.";
  }
  if (["umzug", "seniorenumzug", "fernumzug", "moebeltransport"].includes(lead.serviceCanonical)) {
    return "Anfrage erhalten. Start, Ziel, Etage, Menge und Termin helfen beim naechsten Schritt.";
  }
  if (["entruempelung", "haushaltsaufloesung", "wohnungsaufloesung"].includes(lead.serviceCanonical)) {
    return "Anfrage erhalten. Raeume, Menge, Zugang, Fotos und Frist helfen bei der Einordnung.";
  }
  return "Anfrage erhalten. FLOXANT prueft Angaben und meldet sich ueber die angegebene Kontaktmoeglichkeit.";
}

function defaultResponseTemplate(lead: NormalizedLeadSubmission) {
  if (lead.leadKind === "offer-check") {
    return "Danke fuer Ihre Anfrage. Wir ordnen Angebot, Leistungsumfang, Termin und offene Punkte ein. Wenn Angaben fehlen, melden wir uns mit Rueckfragen.";
  }
  if (lead.leadKind === "b2b") {
    return "Danke. Fuer die erste Einordnung helfen Flaeche, Turnus, gewuenschte Zeiten und Ansprechpartner. Wir melden uns ueber den angegebenen Kontaktweg.";
  }
  if (lead.leadKind === "discreet") {
    return "Danke. Sie muessen nicht alles schriftlich erklaeren. Wir melden uns ueber den bevorzugten Kontaktweg und klaeren nur notwendige Details.";
  }
  if (lead.leadKind === "plan-b") {
    return "Danke. Wir pruefen Deadline, Ort, offenen Umfang und Kontaktweg. Wenn Rueckfragen noetig sind, melden wir uns.";
  }
  return "Danke fuer Ihre Anfrage. Wir pruefen Service, Ort, Termin und Umfang und melden uns mit Rueckfragen oder dem naechsten sinnvollen Schritt.";
}

function defaultChecklist(lead: NormalizedLeadSubmission) {
  const base = ["Kontaktweg pruefen", "Ort/Standort zuordnen", "Service und Intent bestaetigen"];
  if (lead.leadKind === "offer-check") return [...base, "Angebotsstatus pruefen", "Pruefgrund klaeren", "Preis/Upload/Fotos suchen"];
  if (lead.leadKind === "b2b") return [...base, "Firma/Flaeche/Turnus pruefen", "Reinigungszeiten und Rolle klaeren"];
  if (lead.leadKind === "discreet") return [...base, "sicheren Kontaktweg beachten", "keine Details erzwingen"];
  if (lead.leadKind === "plan-b") return [...base, "Deadline priorisieren", "bisheriges Problem klaeren"];
  return [...base, "Terminfenster und Umfang pruefen"];
}

export function buildLeadOperationsSnapshot(
  lead: NormalizedLeadSubmission,
  validation: LeadValidationResult,
  decision: LeadPriorityDecision,
): LeadOperationsSnapshot {
  const signatureService = getSignatureServiceDefinition(lead.signatureServiceKey);
  const missingInfo = [...new Set([...lead.missingInfoHints, ...validation.missingRecommended])];
  const doNotPromise = [
    "keine Buchungsbestaetigung bei reiner Anfrage",
    "keine Preis- oder Ersparnisgarantie",
    "keine Rechtsberatung",
    "keine Termin- oder Sofortgarantie",
    ...(signatureService?.boundaries || []),
  ];

  return {
    leadKind: lead.leadKind,
    locationKey: lead.locationKey,
    canonical: {
      service: lead.serviceCanonical,
      city: lead.cityCanonical,
      intent: lead.intentCanonical,
      urgency: lead.urgencyCanonical,
      offerStatus: lead.offer.offerStatusCanonical,
      offerConcern: lead.offer.offerConcernCanonical,
    },
    ...(signatureService ? { signatureService } : {}),
    missingInfo,
    responseTemplate: signatureService?.responseTemplate || defaultResponseTemplate(lead),
    successState: signatureService?.successState || defaultSuccessState(lead),
    nextSteps: [
      decision.nextAction,
      missingInfo.length ? `Fehlende Angaben nachfassen: ${missingInfo.join(", ")}` : "Lead ist fuer die erste Einordnung ausreichend.",
      lead.locationKey === "unknown" ? "Standort nicht erzwingen; Stadt/Region nachfragen." : `Standort ${lead.locationKey} verwenden.`,
    ],
    doNotPromise: [...new Set(doNotPromise)],
    internalChecklist: defaultChecklist(lead),
  };
}
