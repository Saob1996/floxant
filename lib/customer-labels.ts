const serviceDisplayNames: Readonly<Record<string, string>> = {
  reinigung: "Reinigung",
  bueroreinigung: "Büroreinigung",
  gewerbereinigung: "Gewerbereinigung",
  praxisreinigung: "Praxisreinigung",
  fensterreinigung: "Fensterreinigung",
  "hausverwaltung-reinigung": "Reinigung für Hausverwaltungen",
  treppenhausreinigung: "Treppenhausreinigung",
  unterhaltsreinigung: "Unterhaltsreinigung",
  gebaeudereinigung: "Gebäudereinigung",
  umzug: "Umzug",
  fernumzug: "Fernumzug",
  seniorenumzug: "Seniorenumzug",
  klaviertransport: "Klaviertransport",
  moebeltransport: "Möbeltransport",
  entruempelung: "Entrümpelung",
  haushaltsaufloesung: "Haushaltsauflösung",
  wohnungsaufloesung: "Wohnungsauflösung",
  solarreinigung: "Solarreinigung",
  "pv-anlagen-reinigung": "PV-Anlagen-Reinigung",
  "angebot-pruefen": "Angebot prüfen",
  "diskret-service": "Diskrete Unterstützung",
  "private-client": "Persönliche und diskrete Unterstützung",
  "private-client-service": "Persönliche und diskrete Unterstützung",
  objektbrief: "Objektbrief",
  uebergabe: "Übergabevorbereitung",
  uebergabeakte: "Übergabeakte",
  "plan-b-service": "Hilfe bei kurzfristigen Änderungen",
  "english-contact": "Request in English",
  sonstiges: "Sonstige Anfrage",
  kontakt: "Sonstige Anfrage",
};

const locationDisplayNames: Readonly<Record<string, string>> = {
  bayern: "Bayern",
  deutschland: "Deutschland",
  duesseldorf: "Düsseldorf",
  dusseldorf: "Düsseldorf",
  landshut: "Landshut",
  muenchen: "München",
  munchen: "München",
  nuernberg: "Nürnberg",
  nurnberg: "Nürnberg",
  regensburg: "Regensburg",
  neuss: "Neuss",
  ratingen: "Ratingen",
  meerbusch: "Meerbusch",
  hilden: "Hilden",
  erkrath: "Erkrath",
  krefeld: "Krefeld",
  mettmann: "Mettmann",
  neutraubling: "Neutraubling",
  lappersdorf: "Lappersdorf",
  regenstauf: "Regenstauf",
  wenzenbach: "Wenzenbach",
  "bad-abbach": "Bad Abbach",
  kelheim: "Kelheim",
  nittendorf: "Nittendorf",
  hemau: "Hemau",
  burglengenfeld: "Burglengenfeld",
  schwandorf: "Schwandorf",
};

const intentDisplayNames: Readonly<Record<string, string>> = {
  "angebot-pruefen": "Vorhandenes Angebot prüfen",
  "umzugsangebot-pruefen": "Umzugsangebot prüfen",
  "reinigungsangebot-pruefen": "Reinigungsangebot prüfen",
  "bueroreinigung-angebot-pruefen": "Angebot für Büroreinigung prüfen",
  "gewerbereinigung-angebot-pruefen": "Angebot für Gewerbereinigung prüfen",
  "entruempelungsangebot-pruefen": "Angebot für Entrümpelung prüfen",
  "klaviertransport-angebot-pruefen": "Angebot für Klaviertransport prüfen",
  "leistung-anfragen": "Leistung anfragen",
  "reinigung-anfrage": "Reinigung anfragen",
  "umzug-anfragen": "Umzug anfragen",
  "umzug-transport": "Umzug oder Transport anfragen",
  "entruempelung-anfragen": "Entrümpelung anfragen",
  "entruempelung-aufloesung": "Entrümpelung oder Auflösung anfragen",
  "b2b-bueroreinigung": "Büro- oder Gewerbereinigung anfragen",
  "diskret-service": "Diskrete Unterstützung anfragen",
  "english-contact": "Request in English",
  "unsichere-anfrage": "Passende Leistung klären",
  "servicegebiet-pruefen": "Einsatzort prüfen",
  "plan-b-anbieterabsage": "Hilfe nach einer Absage anfragen",
};

const statusDisplayNames: Readonly<Record<string, string>> = {
  success: "Anfrage gesendet",
  sent: "Anfrage gesendet",
  submitted: "Anfrage gesendet",
  pending: "Anfrage wird geprüft",
  processing: "Anfrage wird geprüft",
  manualreview: "Wir prüfen, ob die Leistung an Ihrem Ort möglich ist.",
  "manual-review": "Wir prüfen, ob die Leistung an Ihrem Ort möglich ist.",
  unavailable: "Diese Leistung ist derzeit nicht bestätigt.",
  error: "Die Anfrage konnte nicht gesendet werden.",
};

function normalizeKey(value?: string | null) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}

export function getServiceDisplayName(serviceKey?: string | null) {
  return serviceDisplayNames[normalizeKey(serviceKey)] || "Sonstige Anfrage";
}

export function getLocationDisplayName(locationKey?: string | null) {
  const normalized = normalizeKey(locationKey);
  if (!normalized || normalized === "unknown" || normalized === "unbekannt") {
    return "Ort wird nach Ihrer Anfrage geprüft";
  }
  return locationDisplayNames[normalized] || "Ort wird nach Ihrer Anfrage geprüft";
}

export function getIntentDisplayName(intentKey?: string | null) {
  return intentDisplayNames[normalizeKey(intentKey)] || "Anliegen wird nach Ihrer Anfrage geklärt";
}

export function getCustomerFacingStatus(statusKey?: string | null) {
  return statusDisplayNames[normalizeKey(statusKey)] || "Wir prüfen Ihre Anfrage.";
}

export function getCustomerFacingFormTitle(
  serviceKey?: string | null,
  cityKey?: string | null,
  intentKey?: string | null,
) {
  const service = getServiceDisplayName(serviceKey);
  const city = getLocationDisplayName(cityKey);
  const intent = getIntentDisplayName(intentKey);

  if (service === "Sonstige Anfrage") return "Beschreiben Sie kurz, wobei Sie Hilfe brauchen";
  if (city.includes("wird nach")) return `${service}: ${intent}`;
  return `${service} in ${city}: ${intent}`;
}

export function getCustomerFacingSuccessMessage(intentKey?: string | null) {
  const intent = normalizeKey(intentKey);
  if (intent.includes("angebot")) {
    return "Ihre Anfrage wurde gesendet. Wir prüfen das vorhandene Angebot und melden uns bei Rückfragen über Ihre angegebene Kontaktmöglichkeit.";
  }
  if (intent.includes("diskret")) {
    return "Ihre Anfrage wurde gesendet. Wir verwenden den von Ihnen gewünschten Kontaktweg und fragen nur nach Angaben, die wirklich nötig sind.";
  }
  if (intent.includes("umzug") || intent.includes("transport")) {
    return "Ihre Anfrage wurde gesendet. Wir prüfen Start, Ziel, Umfang und Termin und melden uns mit den nächsten Schritten.";
  }
  if (intent.includes("reinigung")) {
    return "Ihre Anfrage wurde gesendet. Wir prüfen Objekt, Umfang und Termin und melden uns bei Rückfragen.";
  }
  return "Ihre Anfrage wurde gesendet. Wir prüfen Ihre Angaben und melden uns über die angegebene Kontaktmöglichkeit.";
}

export function getCustomerFacingErrorMessage(errorKey?: string | null) {
  const normalized = normalizeKey(errorKey);
  if (!normalized) {
    return "Die Anfrage konnte nicht gesendet werden. Prüfen Sie Ihre Angaben oder versuchen Sie es später erneut.";
  }
  if (normalized.includes("name")) return "Bitte geben Sie Ihren Namen ein.";
  if (normalized.includes("email") || normalized.includes("phone") || normalized.includes("contact")) {
    return "Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.";
  }
  if (normalized.includes("service")) return "Bitte wählen Sie eine Leistung.";
  if (normalized.includes("city") || normalized.includes("location") || normalized.includes("ort")) {
    return "Bitte geben Sie den Einsatzort an.";
  }
  if (normalized.includes("message") || normalized.includes("description")) {
    return "Bitte beschreiben Sie Ihr Anliegen kurz.";
  }
  if (normalized.includes("privacy") || normalized.includes("datenschutz")) {
    return "Bitte bestätigen Sie den Datenschutz-Hinweis.";
  }
  if (normalized.includes("manual")) {
    return "Dieser Einsatzort wird von uns geprüft. Geben Sie ihn bitte trotzdem vollständig an.";
  }
  return "Die Anfrage konnte nicht gesendet werden. Prüfen Sie Ihre Angaben oder versuchen Sie es später erneut.";
}
