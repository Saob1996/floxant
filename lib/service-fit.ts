export type ServiceFitPriority = "p0" | "p1" | "p2" | "p3";

export type ServiceFitOption = {
  optionKey: string;
  label: string;
  service: string;
  city?: string;
  intent: string;
  priority: ServiceFitPriority;
  suggestedFormTitle: string;
  suggestedFormIntro: string;
  defaultMessagePlaceholder: string;
  recommendedFields: readonly string[];
  ctaLabel: string;
  successMessage: string;
};

function buildContactHref(option: ServiceFitOption, cityOverride?: string) {
  const params = new URLSearchParams({
    service: option.service,
    intent: option.intent,
    priority: option.priority,
    source: "service-fit-advisor",
  });
  const city = cityOverride || option.city;
  if (city) params.set("city", city);
  return `/kontakt?${params.toString()}#direktanfrage`;
}

export const serviceFitOptions: readonly ServiceFitOption[] = [
  {
    optionKey: "reinigung",
    label: "Ich brauche Reinigung",
    service: "reinigung",
    intent: "reinigung-einordnen",
    priority: "p1",
    suggestedFormTitle: "Reinigung einordnen lassen",
    suggestedFormIntro: "Senden Sie Ort, Objektart, Flaeche, Zustand, Termin und Fotos, falls vorhanden.",
    defaultMessagePlaceholder: "z. B. Wohnung oder Buero, Flaeche, Zustand, Termin, Fotos vorhanden",
    recommendedFields: ["Ort", "Objektart", "Flaeche", "Zustand", "Termin", "Fotos"],
    ctaLabel: "Reinigung starten",
    successMessage: "FLOXANT prueft Reinigungsart, Aufwand und naechste Rueckfragen.",
  },
  {
    optionKey: "b2b-reinigung",
    label: "Ich brauche Buero-/Gewerbereinigung",
    service: "bueroreinigung",
    intent: "b2b-bueroreinigung",
    priority: "p0",
    suggestedFormTitle: "Buero- oder Gewerbereinigung einordnen",
    suggestedFormIntro: "Wichtig sind Flaeche, Raumliste, Turnus, Zeitfenster, Zugang und Ansprechpartner.",
    defaultMessagePlaceholder: "z. B. Buero, 250 m2, 2x pro Woche, Zugang ab 18 Uhr, Ansprechpartner",
    recommendedFields: ["Firma", "Flaeche", "Raumliste", "Turnus", "Zeitfenster", "Zugang"],
    ctaLabel: "Gewerbeobjekt klaeren",
    successMessage: "FLOXANT ordnet Turnus, Flaeche und Rueckfragen fuer das Objekt.",
  },
  {
    optionKey: "umzug-transport",
    label: "Ich brauche Umzug/Transport",
    service: "umzug",
    intent: "umzug-transport-einordnen",
    priority: "p1",
    suggestedFormTitle: "Umzug oder Transport einordnen",
    suggestedFormIntro: "Start, Ziel, Volumen, Etage, Laufweg und Termin entscheiden ueber den passenden Weg.",
    defaultMessagePlaceholder: "z. B. Start/Ziel, Etage, Aufzug, grobe Menge, Terminfenster",
    recommendedFields: ["Start", "Ziel", "Volumen", "Etage", "Aufzug", "Termin"],
    ctaLabel: "Umzug/Transport klaeren",
    successMessage: "FLOXANT prueft Route, Volumen und Machbarkeit.",
  },
  {
    optionKey: "entruempelung-aufloesung",
    label: "Ich brauche Entruempelung/Aufloesung",
    service: "entruempelung",
    intent: "entruempelung-aufloesung-einordnen",
    priority: "p1",
    suggestedFormTitle: "Raeumung oder Aufloesung einordnen",
    suggestedFormIntro: "Fotos, Menge, Zugang, Freigabe und Zielzustand sind wichtiger als ein perfekter Text.",
    defaultMessagePlaceholder: "z. B. Keller/Wohnung, Menge, Fotos, Zugang, Freigabe, Reinigung danach",
    recommendedFields: ["Ort", "Raeume", "Menge", "Fotos", "Zugang", "Freigabe"],
    ctaLabel: "Raeumung klaeren",
    successMessage: "FLOXANT prueft Raeumung, Entsorgung, Zielzustand und offene Fragen.",
  },
  {
    optionKey: "angebot-pruefen",
    label: "Ich moechte ein Angebot pruefen lassen",
    service: "angebot-pruefen",
    intent: "angebot-pruefen",
    priority: "p0",
    suggestedFormTitle: "Angebot pruefen lassen",
    suggestedFormIntro: "Angebot, Preis, Umfang, Termin und Pruefgrund reichen fuer den ersten Check.",
    defaultMessagePlaceholder: "z. B. Angebot liegt vor, Preis/Umfang unklar, Termin naechste Woche",
    recommendedFields: ["Angebot", "Preis", "Pruefgrund", "Ort", "Termin", "Fotos"],
    ctaLabel: "Angebot pruefen",
    successMessage: "FLOXANT prueft Angebot und offene Punkte ohne Preisgarantie.",
  },
  {
    optionKey: "plan-b",
    label: "Ich habe einen dringenden Plan-B-Fall",
    service: "angebot-pruefen",
    intent: "plan-b-anbieterabsage",
    priority: "p0",
    suggestedFormTitle: "Plan B bei Ausfall oder Deadline pruefen",
    suggestedFormIntro: "Beschreiben Sie, was gekippt ist, welche Frist gilt und welche Daten schon vorliegen.",
    defaultMessagePlaceholder: "z. B. Anbieter sagt ab, Uebergabe am Freitag, Fotos und Angebot vorhanden",
    recommendedFields: ["Was ist passiert?", "Deadline", "Ort", "Umfang", "Kontaktweg", "Plan-A-Status"],
    ctaLabel: "Plan B klaeren",
    successMessage: "FLOXANT prueft die Lage und nennt realistische naechste Schritte.",
  },
  {
    optionKey: "diskret",
    label: "Ich habe einen diskreten/sensiblen Fall",
    service: "diskret-service",
    intent: "diskret-service",
    priority: "p0",
    suggestedFormTitle: "Diskreten Fall ruhig anfragen",
    suggestedFormIntro: "Ort, grober Umfang und sicherer Kontaktweg reichen. Details koennen spaeter folgen.",
    defaultMessagePlaceholder: "z. B. sensible Lage, grober Umfang, diskreter Rueckruf gewuenscht",
    recommendedFields: ["Kontaktweg", "Ort", "grober Umfang", "Zeitfenster", "besondere Diskretion"],
    ctaLabel: "Diskret anfragen",
    successMessage: "FLOXANT prueft den Fall mit ruhigem Kontaktweg und klaren Grenzen.",
  },
  {
    optionKey: "unsicher",
    label: "Ich bin unsicher",
    service: "sonstiges",
    intent: "unsichere-anfrage",
    priority: "p2",
    suggestedFormTitle: "Anfrage einordnen lassen",
    suggestedFormIntro: "Eine kurze Beschreibung reicht, wenn Service, Ort oder naechster Schritt noch unklar sind.",
    defaultMessagePlaceholder: "z. B. Ich weiss noch nicht, ob Reinigung, Raeumung, Umzug oder Angebot pruefen passt",
    recommendedFields: ["Ort", "kurze Lage", "Ziel", "Termin", "Kontaktweg"],
    ctaLabel: "Einordnung starten",
    successMessage: "FLOXANT ordnet die Anfrage und stellt gezielte Rueckfragen.",
  },
] as const;

export function getServiceFitOption(optionKey: string) {
  return serviceFitOptions.find((option) => option.optionKey === optionKey) || serviceFitOptions.at(-1)!;
}

export function getServiceFitHref(option: ServiceFitOption, cityOverride?: string) {
  return buildContactHref(option, cityOverride);
}

