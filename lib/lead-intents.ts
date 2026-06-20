export type LeadPriority = "p0" | "p1" | "p2" | "p3";

export type LeadService =
  | "reinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "entruempelung"
  | "wohnungsaufloesung"
  | "umzug"
  | "fernumzug"
  | "seniorenumzug"
  | "klaviertransport"
  | "praxisreinigung"
  | "fensterreinigung"
  | "diskret-service"
  | "private-client"
  | "angebot-pruefen"
  | "kontakt"
  | "sonstiges";

export type LeadIntentInput = {
  path?: string | null;
  service?: string | null;
  city?: string | null;
  intent?: string | null;
  priority?: string | null;
  ctaLabel?: string | null;
};

export type LeadIntent = {
  path: string;
  service: LeadService;
  city: string;
  intent: string;
  priority: LeadPriority;
  serviceLabel: string;
  cityLabel: string;
  suggestedFormTitle: string;
  suggestedFormIntro: string;
  defaultMessagePlaceholder: string;
  ctaLabel: string;
  successMessage: string;
  trackingService: string;
  trackingCity: string;
  trackingIntent: string;
  bookingService: string;
};

export const leadServiceOptions: Array<{ value: LeadService; label: string }> = [
  { value: "reinigung", label: "Reinigung" },
  { value: "bueroreinigung", label: "Bueroreinigung" },
  { value: "gewerbereinigung", label: "Gewerbereinigung" },
  { value: "entruempelung", label: "Entruempelung" },
  { value: "wohnungsaufloesung", label: "Wohnungsaufloesung" },
  { value: "umzug", label: "Umzug" },
  { value: "fernumzug", label: "Fernumzug" },
  { value: "seniorenumzug", label: "Seniorenumzug" },
  { value: "klaviertransport", label: "Klaviertransport" },
  { value: "praxisreinigung", label: "Praxisreinigung" },
  { value: "fensterreinigung", label: "Fensterreinigung" },
  { value: "diskret-service", label: "Diskret-Service" },
  { value: "private-client", label: "Private Client" },
  { value: "angebot-pruefen", label: "Angebot pruefen" },
  { value: "sonstiges", label: "Sonstiges" },
];

export const leadUrgencyOptions = [
  { value: "flexibel", label: "flexibel" },
  { value: "diese-woche", label: "diese Woche" },
  { value: "kurzfristig-nach-verfuegbarkeit", label: "kurzfristig nach Verfuegbarkeit" },
  { value: "fester-termin-gewuenscht", label: "fester Termin gewuenscht" },
] as const;

export const leadObjectTypeOptions = [
  { value: "wohnung", label: "Wohnung" },
  { value: "haus", label: "Haus" },
  { value: "buero", label: "Buero" },
  { value: "praxis", label: "Praxis" },
  { value: "gewerbeflaeche", label: "Gewerbeflaeche" },
  { value: "keller-garage", label: "Keller/Garage" },
  { value: "gaestehaus-unterkunft", label: "Gaestehaus/Unterkunft" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const serviceLabels: Record<LeadService, string> = {
  reinigung: "Reinigung",
  bueroreinigung: "Bueroreinigung",
  gewerbereinigung: "Gewerbereinigung",
  entruempelung: "Entruempelung",
  wohnungsaufloesung: "Wohnungsaufloesung",
  umzug: "Umzug",
  fernumzug: "Fernumzug",
  seniorenumzug: "Seniorenumzug",
  klaviertransport: "Klaviertransport",
  praxisreinigung: "Praxisreinigung",
  fensterreinigung: "Fensterreinigung",
  "diskret-service": "Diskret-Service",
  "private-client": "Private Client Service",
  "angebot-pruefen": "Angebot pruefen",
  kontakt: "FLOXANT Anfrage",
  sonstiges: "Anfrage",
};

const cityLabels: Record<string, string> = {
  bayern: "Bayern",
  bamberg: "Bamberg",
  deutschland: "",
  duesseldorf: "Duesseldorf",
  erlangen: "Erlangen",
  ingolstadt: "Ingolstadt",
  landshut: "Landshut",
  muenchen: "Muenchen",
  neumarkt: "Neumarkt i.d.OPf.",
  "neustadt-an-der-waldnaab": "Neustadt an der Waldnaab",
  nuernberg: "Nuernberg",
  regensburg: "Regensburg",
  vohenstrauss: "Vohenstrauss",
  wuerzburg: "Wuerzburg",
};

const pathLeadIntents: Record<string, Partial<LeadIntent>> = {
  "/": {
    service: "reinigung",
    city: "duesseldorf",
    intent: "homepage-anfrage",
    priority: "p1",
    ctaLabel: "Anfrage stellen",
  },
  "/kontakt": {
    service: "kontakt",
    city: "regensburg",
    intent: "kontakt-anfrage",
    priority: "p0",
    ctaLabel: "Anfrage stellen",
  },
  "/reinigung-landshut": {
    service: "reinigung",
    city: "landshut",
    intent: "reinigung-landshut",
    priority: "p0",
    ctaLabel: "Reinigung in Landshut anfragen",
  },
  "/entruempelung-landshut": {
    service: "entruempelung",
    city: "landshut",
    intent: "entruempelung-landshut",
    priority: "p0",
    ctaLabel: "Entruempelung in Landshut anfragen",
  },
  "/klaviertransport": {
    service: "klaviertransport",
    city: "bayern",
    intent: "klaviertransport-bayern",
    priority: "p1",
    ctaLabel: "Klaviertransport anfragen",
  },
  "/klaviertransport-regensburg": {
    service: "klaviertransport",
    city: "regensburg",
    intent: "klaviertransport-regensburg",
    priority: "p0",
    ctaLabel: "Klaviertransport in Regensburg anfragen",
  },
  "/umzug-vohenstrauss": {
    service: "umzug",
    city: "vohenstrauss",
    intent: "umzug-vohenstrauss",
    priority: "p0",
    ctaLabel: "Umzug in Vohenstrauss anfragen",
  },
  "/umzug-neustadt-an-der-waldnaab": {
    service: "umzug",
    city: "neustadt-an-der-waldnaab",
    intent: "umzug-neustadt-an-der-waldnaab",
    priority: "p0",
    ctaLabel: "Umzug in Neustadt anfragen",
  },
  "/duesseldorf/reinigung": {
    service: "reinigung",
    city: "duesseldorf",
    intent: "reinigung-duesseldorf",
    priority: "p1",
    ctaLabel: "Reinigung in Duesseldorf anfragen",
  },
  "/duesseldorf/bueroreinigung": {
    service: "bueroreinigung",
    city: "duesseldorf",
    intent: "bueroreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Bueroreinigung anfragen",
  },
  "/duesseldorf/b2b-reinigung": {
    service: "bueroreinigung",
    city: "duesseldorf",
    intent: "b2b-bueroreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "B2B Bueroreinigung anfragen",
  },
  "/duesseldorf/gewerbereinigung": {
    service: "gewerbereinigung",
    city: "duesseldorf",
    intent: "gewerbereinigung-duesseldorf",
    priority: "p1",
    ctaLabel: "Gewerbereinigung anfragen",
  },
  "/duesseldorf/praxisreinigung": {
    service: "praxisreinigung",
    city: "duesseldorf",
    intent: "praxisreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Praxisreinigung anfragen",
  },
  "/duesseldorf/fensterreinigung": {
    service: "fensterreinigung",
    city: "duesseldorf",
    intent: "fensterreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Fensterreinigung anfragen",
  },
  "/duesseldorf/geruchsneutralisation": {
    service: "reinigung",
    city: "duesseldorf",
    intent: "geruchsneutralisation-wohnung-duesseldorf",
    priority: "p1",
    ctaLabel: "Geruchsneutralisation anfragen",
  },
  "/regensburg/umzug": {
    service: "umzug",
    city: "regensburg",
    intent: "umzug-regensburg",
    priority: "p3",
    ctaLabel: "Umzug in Regensburg anfragen",
  },
  "/regensburg/entruempelung": {
    service: "entruempelung",
    city: "regensburg",
    intent: "entruempelung-regensburg",
    priority: "p3",
    ctaLabel: "Entruempelung in Regensburg anfragen",
  },
  "/regensburg/wohnungsaufloesung": {
    service: "wohnungsaufloesung",
    city: "regensburg",
    intent: "wohnungsaufloesung-regensburg",
    priority: "p3",
    ctaLabel: "Wohnungsaufloesung in Regensburg anfragen",
  },
  "/wohnungsaufloesung-regensburg": {
    service: "wohnungsaufloesung",
    city: "regensburg",
    intent: "wohnungsaufloesung-regensburg",
    priority: "p2",
    ctaLabel: "Wohnungsaufloesung anfragen",
  },
  "/reinigung-muenchen": {
    service: "reinigung",
    city: "muenchen",
    intent: "reinigung-muenchen",
    priority: "p1",
    ctaLabel: "Reinigung in Muenchen anfragen",
  },
  "/fernumzug-muenchen": {
    service: "fernumzug",
    city: "muenchen",
    intent: "fernumzug-muenchen",
    priority: "p0",
    ctaLabel: "Fernumzug Muenchen anfragen",
  },
  "/reinigungsfirma-angebot": {
    service: "reinigung",
    city: "deutschland",
    intent: "reinigungsfirma-angebot",
    priority: "p1",
    ctaLabel: "Angebot anfordern",
  },
  "/angebotscheck": {
    service: "angebot-pruefen",
    city: "regensburg",
    intent: "angebotscheck",
    priority: "p0",
    ctaLabel: "Angebot pruefen lassen",
  },
  "/angebot-guenstiger-pruefen": {
    service: "angebot-pruefen",
    city: "regensburg",
    intent: "angebot-guenstiger-pruefen",
    priority: "p0",
    ctaLabel: "Angebot pruefen lassen",
  },
  "/angebot-vergleichen-duesseldorf": {
    service: "angebot-pruefen",
    city: "duesseldorf",
    intent: "angebot-vergleichen-duesseldorf",
    priority: "p0",
    ctaLabel: "Angebot pruefen lassen",
  },
  "/private-client-service": {
    service: "private-client",
    city: "bayern",
    intent: "private-client-service",
    priority: "p0",
    ctaLabel: "Vertraulich anfragen",
  },
  "/diskreter-umzug-trennung-scheidung": {
    service: "diskret-service",
    city: "deutschland",
    intent: "diskret-service",
    priority: "p0",
    ctaLabel: "Diskret anfragen",
  },
  "/seniorenumzug-landshut": {
    service: "seniorenumzug",
    city: "landshut",
    intent: "seniorenumzug-landshut",
    priority: "p1",
    ctaLabel: "Seniorenumzug Landshut anfragen",
  },
  "/seniorenumzug-bayern": {
    service: "seniorenumzug",
    city: "bayern",
    intent: "umzug-im-alter-bayern",
    priority: "p1",
    ctaLabel: "Umzug im Alter anfragen",
  },
  "/seniorenumzug-bamberg": {
    service: "seniorenumzug",
    city: "bamberg",
    intent: "umzug-im-alter-bamberg",
    priority: "p0",
    ctaLabel: "Seniorenumzug Bamberg anfragen",
  },
  "/seniorenumzug-erlangen": {
    service: "seniorenumzug",
    city: "erlangen",
    intent: "umzug-im-alter-erlangen",
    priority: "p1",
    ctaLabel: "Seniorenumzug Erlangen anfragen",
  },
  "/seniorenumzug-nuernberg": {
    service: "seniorenumzug",
    city: "nuernberg",
    intent: "umzugshilfe-senioren-nuernberg",
    priority: "p0",
    ctaLabel: "Seniorenumzug Nuernberg anfragen",
  },
  "/seniorenumzug-wuerzburg": {
    service: "seniorenumzug",
    city: "wuerzburg",
    intent: "umzug-im-alter-wuerzburg",
    priority: "p1",
    ctaLabel: "Seniorenumzug Wuerzburg anfragen",
  },
  "/umzug-neumarkt": {
    service: "umzug",
    city: "neumarkt",
    intent: "umzugsunternehmen-neumarkt-idopf",
    priority: "p0",
    ctaLabel: "Umzug Neumarkt anfragen",
  },
  "/umzug-ingolstadt": {
    service: "umzug",
    city: "ingolstadt",
    intent: "umzug-ingolstadt",
    priority: "p1",
    ctaLabel: "Umzug Ingolstadt anfragen",
  },
  "/bueroumzug-muenchen": {
    service: "umzug",
    city: "muenchen",
    intent: "bueroumzug-muenchen",
    priority: "p1",
    ctaLabel: "Bueroumzug Muenchen anfragen",
  },
  "/bueroumzug-nuernberg": {
    service: "umzug",
    city: "nuernberg",
    intent: "bueroumzug-nuernberg",
    priority: "p1",
    ctaLabel: "Bueroumzug Nuernberg anfragen",
  },
};

function clean(value: string | null | undefined) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function normalizeLeadPath(value: string | null | undefined) {
  if (!value) return "/";
  let pathname = value;
  try {
    pathname = new URL(value, "https://www.floxant.de").pathname;
  } catch {
    pathname = String(value);
  }

  const cleaned = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const withSlash = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return withSlash.replace(/^\/(?:de|fa)(?=\/)/, "") || "/";
}

export function normalizeLeadService(value: string | null | undefined): LeadService {
  const normalized = clean(value).replace(/[_\s]+/g, "-");
  if (["buroreinigung", "buero-reinigung", "bueroreinigung", "b2b-reinigung", "b2b-bueroreinigung"].includes(normalized)) {
    return "bueroreinigung";
  }
  if (["gewerbe-reinigung", "gewerbereinigung", "firmenreinigung"].includes(normalized)) {
    return "gewerbereinigung";
  }
  if (["praxisreinigung", "praxis-reinigung", "arztpraxis-reinigung", "reinigung-arztpraxis"].includes(normalized)) {
    return "praxisreinigung";
  }
  if (["fensterreinigung", "fenster-reinigung", "glasreinigung", "glas-reinigung"].includes(normalized)) {
    return "fensterreinigung";
  }
  if (["entruempelung", "entrumpelung", "entsorgung", "haushaltsaufloesung"].includes(normalized)) {
    return "entruempelung";
  }
  if (["wohnungsaufloesung", "wohnungsauflosung", "hausaufloesung", "hausauflosung"].includes(normalized)) {
    return "wohnungsaufloesung";
  }
  if (["fernumzug", "fern-umzug", "umzug-muenchen-fernumzug"].includes(normalized)) return "fernumzug";
  if (["klaviertransport", "klavier-transport", "pianotransport", "piano-transport"].includes(normalized)) {
    return "klaviertransport";
  }
  if (["bueroumzug", "buero-umzug", "buro-umzug", "firmenumzug"].includes(normalized)) {
    return "umzug";
  }
  if (["diskret-service", "diskreter-service", "diskreter-service-bayern", "diskreter-rueckruf"].includes(normalized)) {
    return "diskret-service";
  }
  if (["private-client", "private-client-service", "private-client-service-bayern", "villenservice"].includes(normalized)) {
    return "private-client";
  }
  if (["seniorenumzug", "umzug-im-alter"].includes(normalized)) return "seniorenumzug";
  if (
    [
      "angebot-pruefen",
      "angebot-prufen",
      "angebot-pruefung",
      "angebotscheck",
      "angebotspruefung",
      "offer-check",
      "quote-check",
      "guenstiger-pruefen",
    ].includes(normalized)
  ) {
    return "angebot-pruefen";
  }
  if (["reinigung", "umzug", "kontakt", "sonstiges"].includes(normalized)) return normalized as LeadService;
  return "sonstiges";
}

function normalizeCity(value: string | null | undefined) {
  return clean(value)
    .replace(/ae/g, "ae")
    .replace(/ue/g, "ue")
    .replace(/oe/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePriority(value: string | null | undefined): LeadPriority {
  const normalized = clean(value).replace(/^p/, "p");
  if (["p0", "p1", "p2", "p3"].includes(normalized)) return normalized as LeadPriority;
  if (["0", "1", "2", "3"].includes(normalized)) return `p${normalized}` as LeadPriority;
  return "p2";
}

export function getBookingServiceForLead(service: string | null | undefined) {
  const normalized = normalizeLeadService(service);
  if (normalized === "bueroreinigung" || normalized === "gewerbereinigung" || normalized === "praxisreinigung") return "b2b_reinigung";
  if (normalized === "fensterreinigung") return "reinigung";
  if (normalized === "klaviertransport") return "klaviertransport";
  if (normalized === "entruempelung" || normalized === "wohnungsaufloesung") return "entsorgung";
  if (normalized === "fernumzug" || normalized === "seniorenumzug") return "umzug";
  if (normalized === "diskret-service") return "private_client";
  if (normalized === "private-client") return "private_client";
  if (normalized === "angebot-pruefen") return "angebot_pruefen";
  if (normalized === "kontakt" || normalized === "sonstiges") return "umzug";
  return normalized;
}

function buildIntent(service: LeadService, city: string) {
  if (service === "kontakt") return "kontakt-anfrage";
  if (service === "diskret-service") return "diskret-service";
  if (service === "angebot-pruefen") return city ? `angebot-pruefen-${city}` : "angebot-pruefen";
  if (service === "reinigung" && !city) return "reinigungsfirma-angebot";
  return [service, city].filter(Boolean).join("-");
}

function buildTitle(serviceLabel: string, cityLabel: string) {
  if (serviceLabel === "FLOXANT Anfrage") return "FLOXANT Anfrage stellen";
  if (serviceLabel === "Diskret-Service") return "Diskret-Service vertraulich anfragen";
  if (serviceLabel === "Private Client Service") return `${serviceLabel} vertraulich anfragen`;
  if (serviceLabel === "Angebot pruefen") return cityLabel ? `Angebot fuer ${cityLabel} pruefen lassen` : "Angebot pruefen lassen";
  if (cityLabel) return `${serviceLabel} in ${cityLabel} anfragen`;
  return `${serviceLabel} anfragen`;
}

function buildIntro(service: LeadService, cityLabel: string) {
  if (service === "angebot-pruefen") {
    return `Nennen Sie Angebot, Ort, Termin, Umfang und den wichtigsten Pruefgrund${cityLabel ? ` fuer ${cityLabel}` : ""}. FLOXANT prueft organisatorisch und praktisch, ohne Preisgarantie.`;
  }
  if (service === "bueroreinigung") {
    return `Beschreiben Sie kurz Flaeche, Turnus, Zugang und gewuenschte Zeiten${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prueft den Bedarf und meldet sich zurueck.`;
  }
  if (service === "gewerbereinigung") {
    return `Nennen Sie Objektart, Flaeche, Turnus, Zeitfenster und Zugang${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT ordnet die Anfrage sachlich ein.`;
  }
  if (service === "praxisreinigung") {
    return `Nennen Sie Praxisart, Flaeche, Raumliste, Turnus, Zeitfenster und Zugang${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prueft allgemeine Reinigungsflaechen ohne pauschale Spezialdesinfektionszusage.`;
  }
  if (service === "fensterreinigung") {
    return `Nennen Sie Glasflaechen, Rahmen, Etage, Zugang, Turnus, Zustand und Terminwunsch${cityLabel ? ` in ${cityLabel}` : ""}. Fotos helfen bei schwer erreichbaren Flaechen.`;
  }
  if (service === "klaviertransport") {
    return `Beschreiben Sie Instrument, Start, Ziel, Etage, Aufzug, Treppenhaus, Laufweg und Terminwunsch${cityLabel ? ` in ${cityLabel}` : ""}. Fotos helfen bei der Machbarkeitspruefung.`;
  }
  if (service === "umzug" || service === "fernumzug" || service === "seniorenumzug") {
    return `Beschreiben Sie Start, Ziel, Umfang und Terminwunsch${cityLabel ? ` fuer ${cityLabel}` : ""}. FLOXANT prueft die Anfrage und meldet sich zurueck.`;
  }
  if (service === "entruempelung" || service === "wohnungsaufloesung") {
    return `Beschreiben Sie Raeume, Menge, Zugang, Freigabe und Zielzustand${cityLabel ? ` in ${cityLabel}` : ""}. Fotos koennen spaeter ergaenzt werden.`;
  }
  if (service === "diskret-service" || service === "private-client") {
    return "Beschreiben Sie Objekt, gewuenschte Diskretion, Leistungsumfang und sicheren Kontaktweg. FLOXANT prueft den Fall ruhig und ohne Standardzusage.";
  }
  return "Beschreiben Sie kurz Leistung, Ort, Umfang und gewuenschten Kontaktweg. FLOXANT prueft die Angaben und meldet sich zurueck.";
}

function buildPlaceholder(service: LeadService, cityLabel: string) {
  if (service === "angebot-pruefen") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Angebot liegt vor, Preis ca. 950 EUR, Termin naechste Woche, unklar sind Zusatzleistungen/Zugang`;
  }
  if (service === "bueroreinigung" || service === "gewerbereinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Buero/Praxis, ca. 250 m2, 2x pro Woche, Zugang ab 18 Uhr, Rueckruf gewuenscht`;
  }
  if (service === "praxisreinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Praxis, Empfang/Wartebereich/Sanitaer, ca. 140 m2, 3x pro Woche, nach Praxisschluss`;
  }
  if (service === "fensterreinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Glasflaechen/Rahmen, Etage, Zugang, ca. Anzahl Fenster, Zustand, Terminfenster`;
  }
  if (service === "klaviertransport") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Klavier oder E-Piano, Start/Ziel, Etage, Aufzug, Treppenhaus, Fotos, Terminfenster`;
  }
  if (service === "umzug" || service === "fernumzug" || service === "seniorenumzug") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Start/Ziel, Etage, grobe Moebelmenge, Terminfenster, Reinigung danach`;
  }
  if (service === "entruempelung" || service === "wohnungsaufloesung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Wohnung/Keller, Menge, Etage, Freigabe, Entsorgung und Reinigung danach`;
  }
  if (service === "diskret-service" || service === "private-client") {
    return "z. B. Anwesen/Residenz, gewuenschte Leistung, Zugang, Schutzbedarf, diskreter Rueckruf";
  }
  return "Kurz beschreiben: Leistung, Ort, Umfang, Terminwunsch und bester Kontaktweg.";
}

export function resolveLeadIntent(input: LeadIntentInput = {}): LeadIntent {
  const path = normalizeLeadPath(input.path);
  const known = pathLeadIntents[path] || {};
  const service = normalizeLeadService(input.service || known.service || "");
  const resolvedService = service === "sonstiges" && known.service ? (known.service as LeadService) : service;
  const city = normalizeCity(input.city || known.city || "");
  const resolvedCity = city || String(known.city || "");
  const priority = normalizePriority(input.priority || known.priority || "");
  const serviceLabel = serviceLabels[resolvedService] || serviceLabels.sonstiges;
  const cityLabel = cityLabels[resolvedCity] ?? resolvedCity.replace(/-/g, " ");
  const intent = normalizeCity(input.intent || known.intent || buildIntent(resolvedService, resolvedCity));
  const ctaLabel = input.ctaLabel || known.ctaLabel || buildTitle(serviceLabel, cityLabel);

  return {
    path,
    service: resolvedService,
    city: resolvedCity,
    intent,
    priority,
    serviceLabel,
    cityLabel,
    suggestedFormTitle: buildTitle(serviceLabel, cityLabel),
    suggestedFormIntro: buildIntro(resolvedService, cityLabel),
    defaultMessagePlaceholder: buildPlaceholder(resolvedService, cityLabel),
    ctaLabel,
    successMessage: "Anfrage erhalten. FLOXANT prueft die Angaben und meldet sich ueber die angegebene Kontaktmoeglichkeit.",
    trackingService: resolvedService,
    trackingCity: resolvedCity,
    trackingIntent: intent,
    bookingService: getBookingServiceForLead(resolvedService),
  };
}

export function buildLeadHref(input: LeadIntentInput = {}, destination = "/kontakt") {
  const lead = resolveLeadIntent(input);
  const params = new URLSearchParams();

  if (lead.service && lead.service !== "kontakt" && lead.service !== "sonstiges") {
    params.set("service", lead.service);
  }
  if (lead.city && lead.city !== "deutschland") {
    params.set("city", lead.city);
  }
  if (lead.intent) params.set("intent", lead.intent);
  params.set("source", "seo");

  const query = params.toString();
  return query ? `${destination}?${query}` : destination;
}

export const leadConversionTargets = [
  { path: "/", priorityPath: "/" },
  { path: "/kontakt", priorityPath: "/kontakt" },
  { path: "/reinigung-landshut", priorityPath: "/reinigung-landshut" },
  { path: "/entruempelung-landshut", priorityPath: "/entruempelung-landshut" },
  { path: "/klaviertransport-regensburg", priorityPath: "/klaviertransport-regensburg" },
  { path: "/umzug-vohenstrauss", priorityPath: "/umzug-vohenstrauss" },
  { path: "/umzug-neustadt-an-der-waldnaab", priorityPath: "/umzug-neustadt-an-der-waldnaab" },
  { path: "/duesseldorf/reinigung", priorityPath: "/duesseldorf/reinigung" },
  { path: "/duesseldorf/bueroreinigung", priorityPath: "/duesseldorf/bueroreinigung" },
  { path: "/duesseldorf/b2b-reinigung", priorityPath: "/duesseldorf/b2b-reinigung" },
  { path: "/duesseldorf/gewerbereinigung", priorityPath: "/duesseldorf/gewerbereinigung" },
  { path: "/duesseldorf/praxisreinigung", priorityPath: "/duesseldorf/praxisreinigung" },
  { path: "/duesseldorf/fensterreinigung", priorityPath: "/duesseldorf/fensterreinigung" },
  { path: "/regensburg/umzug", priorityPath: "/regensburg/umzug" },
  { path: "/regensburg/entruempelung", priorityPath: "/regensburg/entruempelung" },
  { path: "/regensburg/wohnungsaufloesung", priorityPath: "/regensburg/wohnungsaufloesung" },
  { path: "/wohnungsaufloesung-regensburg", priorityPath: "/wohnungsaufloesung-regensburg" },
  { path: "/reinigung-muenchen", priorityPath: "/reinigung-muenchen" },
  { path: "/fernumzug-muenchen", priorityPath: "/fernumzug-muenchen" },
  { path: "/reinigungsfirma-angebot", priorityPath: "/reinigungsfirma-angebot" },
  { path: "/private-client-service", priorityPath: "/private-client-service" },
  { path: "/diskreter-umzug-trennung-scheidung", priorityPath: "/diskreter-umzug-trennung-scheidung" },
] as const;
