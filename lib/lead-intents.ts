// @ts-nocheck
export type LeadPriority = "p0" | "p1" | "p2" | "p3";

export type LeadService =
  | "reinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "hausverwaltung-reinigung"
  | "treppenhausreinigung"
  | "unterhaltsreinigung"
  | "gebaeudereinigung"
  | "entruempelung"
  | "wohnungsaufloesung"
  | "umzug"
  | "fernumzug"
  | "seniorenumzug"
  | "klaviertransport"
  | "moebeltransport"
  | "praxisreinigung"
  | "fensterreinigung"
  | "solarreinigung"
  | "pv-anlagen-reinigung"
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
  { value: "bueroreinigung", label: "Büroreinigung" },
  { value: "gewerbereinigung", label: "Gewerbereinigung" },
  { value: "hausverwaltung-reinigung", label: "Hausverwaltung-Reinigung" },
  { value: "treppenhausreinigung", label: "Treppenhausreinigung" },
  { value: "unterhaltsreinigung", label: "Unterhaltsreinigung" },
  { value: "gebaeudereinigung", label: "Gebäudereinigung" },
  { value: "entruempelung", label: "Entrümpelung" },
  { value: "wohnungsaufloesung", label: "Wohnungsauflösung" },
  { value: "umzug", label: "Umzug" },
  { value: "fernumzug", label: "Fernumzug" },
  { value: "seniorenumzug", label: "Seniorenumzug" },
  { value: "klaviertransport", label: "Klaviertransport" },
  { value: "moebeltransport", label: "Möbeltransport" },
  { value: "praxisreinigung", label: "Praxisreinigung" },
  { value: "fensterreinigung", label: "Fensterreinigung" },
  { value: "solarreinigung", label: "Solarreinigung" },
  { value: "pv-anlagen-reinigung", label: "PV-Anlagen-Reinigung" },
  { value: "diskret-service", label: "Diskret-Service" },
  { value: "private-client", label: "Private Client" },
  { value: "angebot-pruefen", label: "Angebot prüfen" },
  { value: "sonstiges", label: "Sonstiges" },
];

export const leadUrgencyOptions = [
  { value: "flexibel", label: "flexibel" },
  { value: "diese-woche", label: "diese Woche" },
  { value: "kurzfristig-nach-verfuegbarkeit", label: "kurzfristig nach Verfügbarkeit" },
  { value: "fester-termin-gewuenscht", label: "fester Termin gewünscht" },
] as const;

export const leadObjectTypeOptions = [
  { value: "wohnung", label: "Wohnung" },
  { value: "haus", label: "Haus" },
  { value: "buero", label: "Büro" },
  { value: "praxis", label: "Praxis" },
  { value: "gewerbeflaeche", label: "Gewerbefläche" },
  { value: "keller-garage", label: "Keller/Garage" },
  { value: "gaestehaus-unterkunft", label: "Gästehaus/Unterkunft" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const serviceLabels: Record<LeadService, string> = {
  reinigung: "Reinigung",
  bueroreinigung: "Büroreinigung",
  gewerbereinigung: "Gewerbereinigung",
  "hausverwaltung-reinigung": "Hausverwaltung-Reinigung",
  treppenhausreinigung: "Treppenhausreinigung",
  unterhaltsreinigung: "Unterhaltsreinigung",
  gebaeudereinigung: "Gebäudereinigung",
  entruempelung: "Entrümpelung",
  wohnungsaufloesung: "Wohnungsauflösung",
  umzug: "Umzug",
  fernumzug: "Fernumzug",
  seniorenumzug: "Seniorenumzug",
  klaviertransport: "Klaviertransport",
  moebeltransport: "Möbeltransport",
  praxisreinigung: "Praxisreinigung",
  fensterreinigung: "Fensterreinigung",
  solarreinigung: "Solarreinigung",
  "pv-anlagen-reinigung": "PV-Anlagen-Reinigung",
  "diskret-service": "Diskret-Service",
  "private-client": "Private Client Service",
  "angebot-pruefen": "Angebot prüfen",
  kontakt: "FLOXANT Anfrage",
  sonstiges: "Anfrage",
};

const cityLabels: Record<string, string> = {
  bayern: "Bayern",
  bamberg: "Bamberg",
  deutschland: "",
  dusseldorf: "Düsseldorf",
  duesseldorf: "Düsseldorf",
  erlangen: "Erlangen",
  ingolstadt: "Ingolstadt",
  landshut: "Landshut",
  muenchen: "München",
  neumarkt: "Neumarkt i.d.OPf.",
  "neustadt-an-der-waldnaab": "Neustadt an der Waldnaab",
  nuernberg: "Nürnberg",
  regensburg: "Regensburg",
  vohenstrauss: "Vohenstrauss",
  wuerzburg: "Würzburg",
};

const pathLeadIntents: Record<string, Partial<LeadIntent>> = {
  "/": {
    service: "sonstiges",
    city: "deutschland",
    intent: "homepage-anfrage",
    priority: "p1",
    ctaLabel: "Anfrage senden",
  },
  "/kontakt": {
    service: "kontakt",
    city: "regensburg",
    intent: "kontakt-anfrage",
    priority: "p0",
    ctaLabel: "Anfrage stellen",
  },
  "/duesseldorf/reinigung": {
    service: "reinigung",
    city: "duesseldorf",
    intent: "reinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Reinigung in Düsseldorf anfragen",
  },
  "/duesseldorf/gewerbereinigung": {
    service: "gewerbereinigung",
    city: "duesseldorf",
    intent: "gewerbereinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Gewerbereinigung anfragen",
  },
  "/duesseldorf/bueroreinigung": {
    service: "bueroreinigung",
    city: "duesseldorf",
    intent: "bueroreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Büroreinigung anfragen",
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
  "/duesseldorf/grundreinigung": {
    service: "reinigung",
    city: "duesseldorf",
    intent: "grundreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Grundreinigung anfragen",
  },
  "/duesseldorf/baureinigung": {
    service: "reinigung",
    city: "duesseldorf",
    intent: "bauendreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Bau- oder Bauendreinigung anfragen",
  },
  "/duesseldorf/hausverwaltung-reinigung": {
    service: "hausverwaltung-reinigung",
    city: "duesseldorf",
    intent: "hausverwaltung-reinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Hausverwaltung-Reinigung anfragen",
  },
  "/duesseldorf/treppenhausreinigung": {
    service: "treppenhausreinigung",
    city: "duesseldorf",
    intent: "treppenhausreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Treppenhausreinigung anfragen",
  },
  "/duesseldorf/unterhaltsreinigung": {
    service: "unterhaltsreinigung",
    city: "duesseldorf",
    intent: "unterhaltsreinigung-duesseldorf",
    priority: "p0",
    ctaLabel: "Unterhaltsreinigung anfragen",
  },
  "/duesseldorf/gebaeudereinigung": {
    service: "gebaeudereinigung",
    city: "duesseldorf",
    intent: "gebaeudereinigung-duesseldorf",
    priority: "p1",
    ctaLabel: "Gebäudereinigung einordnen",
  },
  "/hausverwaltung-reinigung": {
    service: "hausverwaltung-reinigung",
    city: "duesseldorf",
    intent: "hausverwaltung-reinigung-anfragen",
    priority: "p1",
    ctaLabel: "Hausverwaltung-Reinigung anfragen",
  },
  "/treppenhausreinigung": {
    service: "treppenhausreinigung",
    city: "regensburg",
    intent: "treppenhausreinigung-anfragen",
    priority: "p1",
    ctaLabel: "Treppenhausreinigung anfragen",
  },
  "/unterhaltsreinigung": {
    service: "unterhaltsreinigung",
    city: "regensburg",
    intent: "unterhaltsreinigung-anfragen",
    priority: "p1",
    ctaLabel: "Unterhaltsreinigung anfragen",
  },
  "/gebaeudereinigung": {
    service: "gebaeudereinigung",
    city: "regensburg",
    intent: "gebaeudereinigung-anfragen",
    priority: "p1",
    ctaLabel: "Gebäudereinigung einordnen",
  },
  "/treppenhausreinigung-regensburg": {
    service: "treppenhausreinigung",
    city: "regensburg",
    intent: "treppenhausreinigung-regensburg",
    priority: "p0",
    ctaLabel: "Treppenhausreinigung Regensburg anfragen",
  },
  "/unterhaltsreinigung-regensburg": {
    service: "unterhaltsreinigung",
    city: "regensburg",
    intent: "unterhaltsreinigung-regensburg",
    priority: "p0",
    ctaLabel: "Unterhaltsreinigung Regensburg anfragen",
  },
  "/reinigung-regensburg": {
    service: "hausverwaltung-reinigung",
    city: "regensburg",
    intent: "hausverwaltung-reinigung-regensburg",
    priority: "p1",
    ctaLabel: "Objekt-Reinigung Regensburg anfragen",
  },
  "/gewerbereinigung-regensburg": {
    service: "gewerbereinigung",
    city: "regensburg",
    intent: "gewerbereinigung-regensburg",
    priority: "p1",
    ctaLabel: "Gewerbereinigung Regensburg anfragen",
  },
  "/bueroreinigung-regensburg": {
    service: "bueroreinigung",
    city: "regensburg",
    intent: "bueroreinigung-regensburg",
    priority: "p1",
    ctaLabel: "Büroreinigung Regensburg anfragen",
  },
  "/regensburg/reinigung": {
    service: "reinigung",
    city: "regensburg",
    intent: "reinigung-regensburg",
    priority: "p0",
    ctaLabel: "Reinigung in Regensburg anfragen",
  },
  "/regensburg/endreinigung": {
    service: "reinigung",
    city: "regensburg",
    intent: "endreinigung-wohnungsuebergabe",
    priority: "p0",
    ctaLabel: "Endreinigung vor Übergabe prüfen",
  },
  "/regensburg/uebergabereinigung": {
    service: "reinigung",
    city: "regensburg",
    intent: "uebergabereinigung-regensburg",
    priority: "p0",
    ctaLabel: "Übergabereinigung anfragen",
  },
  "/vermieter-ready-service": {
    service: "reinigung",
    city: "regensburg",
    intent: "vermieter-ready-service",
    priority: "p0",
    ctaLabel: "Vermieter-Ready-Service prüfen",
  },
  "/uebergabe-sprint": {
    service: "reinigung",
    city: "regensburg",
    intent: "uebergabe-sprint",
    priority: "p0",
    ctaLabel: "Übergabe-Sprint starten",
  },
  "/uebergabeakte": {
    service: "reinigung",
    city: "regensburg",
    intent: "uebergabeakte",
    priority: "p1",
    ctaLabel: "Übergabeakte anfragen",
  },
  "/objektbrief": {
    service: "reinigung",
    city: "regensburg",
    intent: "objektbrief-uebergabe",
    priority: "p1",
    ctaLabel: "Objektbrief anfragen",
  },
  "/reinigung-nach-entruempelung-regensburg": {
    service: "reinigung",
    city: "regensburg",
    intent: "reinigung-nach-entruempelung-regensburg",
    priority: "p1",
    ctaLabel: "Reinigung nach Entrümpelung prüfen",
  },
  "/entruempelung-landshut": {
    service: "entruempelung",
    city: "landshut",
    intent: "entruempelung-landshut",
    priority: "p0",
    ctaLabel: "Entrümpelung in Landshut anfragen",
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
  "/moebeltransport": {
    service: "moebeltransport",
    city: "bayern",
    intent: "moebeltransport",
    priority: "p1",
    ctaLabel: "Möbeltransport anfragen",
  },
  "/kleintransport-regensburg": {
    service: "moebeltransport",
    city: "regensburg",
    intent: "kleintransport-regensburg",
    priority: "p1",
    ctaLabel: "Kleintransport in Regensburg anfragen",
  },
  "/beiladung-regensburg": {
    service: "moebeltransport",
    city: "regensburg",
    intent: "beiladung-regensburg",
    priority: "p1",
    ctaLabel: "Beiladung in Regensburg prüfen",
  },
  "/leerfahrt-rueckfahrt": {
    service: "moebeltransport",
    city: "regensburg",
    intent: "rueckfahrt-beiladung-regensburg",
    priority: "p1",
    ctaLabel: "Rückfahrt oder Beiladung prüfen",
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
  "/regensburg/bueroreinigung": {
    service: "bueroreinigung",
    city: "regensburg",
    intent: "b2b-bueroreinigung-regensburg",
    priority: "p0",
    ctaLabel: "B2B Büroreinigung anfragen",
  },
  "/regensburg/gewerbereinigung": {
    service: "gewerbereinigung",
    city: "regensburg",
    intent: "gewerbereinigung-regensburg",
    priority: "p1",
    ctaLabel: "Gewerbereinigung anfragen",
  },
  "/praxisreinigung-regensburg": {
    service: "praxisreinigung",
    city: "regensburg",
    intent: "praxisreinigung-regensburg",
    priority: "p0",
    ctaLabel: "Praxisreinigung anfragen",
  },
  "/fensterreinigung-regensburg": {
    service: "fensterreinigung",
    city: "regensburg",
    intent: "fensterreinigung-regensburg",
    priority: "p0",
    ctaLabel: "Fensterreinigung anfragen",
  },
  "/solarreinigung": {
    service: "solarreinigung",
    city: "deutschland",
    intent: "solarreinigung-anfragen",
    priority: "p1",
    ctaLabel: "Solarreinigung anfragen",
  },
  "/pv-anlagen-reinigung": {
    service: "pv-anlagen-reinigung",
    city: "deutschland",
    intent: "pv-reinigung-anfragen",
    priority: "p1",
    ctaLabel: "PV-Anlagen-Reinigung anfragen",
  },
  "/regensburg/solarreinigung": {
    service: "solarreinigung",
    city: "regensburg",
    intent: "solarreinigung-regensburg",
    priority: "p1",
    ctaLabel: "Solarreinigung Regensburg anfragen",
  },
  "/regensburg/umzug": {
    service: "umzug",
    city: "regensburg",
    intent: "umzug-regensburg",
    priority: "p2",
    ctaLabel: "Umzug in Regensburg anfragen",
  },
  "/regensburg/entruempelung": {
    service: "entruempelung",
    city: "regensburg",
    intent: "entruempelung-regensburg",
    priority: "p2",
    ctaLabel: "Entrümpelung in Regensburg anfragen",
  },
  "/regensburg/wohnungsaufloesung": {
    service: "wohnungsaufloesung",
    city: "regensburg",
    intent: "wohnungsaufloesung-regensburg",
    priority: "p2",
    ctaLabel: "Wohnungsauflösung in Regensburg anfragen",
  },
  "/fernumzug-muenchen": {
    service: "fernumzug",
    city: "muenchen",
    intent: "fernumzug-muenchen",
    priority: "p0",
    ctaLabel: "Fernumzug München anfragen",
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
    ctaLabel: "Angebot prüfen lassen",
  },
  "/angebot-guenstiger-pruefen": {
    service: "angebot-pruefen",
    city: "regensburg",
    intent: "angebot-guenstiger-pruefen",
    priority: "p0",
    ctaLabel: "Angebot prüfen lassen",
  },
  "/angebot-vergleichen-regensburg": {
    service: "angebot-pruefen",
    city: "regensburg",
    intent: "angebot-vergleichen-regensburg",
    priority: "p0",
    ctaLabel: "Angebot prüfen lassen",
  },
  "/angebot-vergleichen-duesseldorf": {
    service: "angebot-pruefen",
    city: "duesseldorf",
    intent: "angebot-vergleichen-duesseldorf",
    priority: "p0",
    ctaLabel: "Angebot prüfen lassen",
  },
  "/private-client-service": {
    service: "private-client",
    city: "bayern",
    intent: "private-client-service",
    priority: "p0",
    ctaLabel: "Vertraulich anfragen",
  },
  "/diskret-service": {
    service: "diskret-service",
    city: "deutschland",
    intent: "diskret-service",
    priority: "p0",
    ctaLabel: "Diskreten Fall beschreiben",
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
    ctaLabel: "Seniorenumzug Nürnberg anfragen",
  },
  "/seniorenumzug-wuerzburg": {
    service: "seniorenumzug",
    city: "wuerzburg",
    intent: "umzug-im-alter-wuerzburg",
    priority: "p1",
    ctaLabel: "Seniorenumzug Würzburg anfragen",
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
    ctaLabel: "Büroumzug München anfragen",
  },
  "/bueroumzug-nuernberg": {
    service: "umzug",
    city: "nuernberg",
    intent: "bueroumzug-nuernberg",
    priority: "p1",
    ctaLabel: "Büroumzug Nürnberg anfragen",
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
  if (["cleaning", "cleaning-service", "cleaner", "house-cleaning", "grundreinigung", "sonderreinigung", "baureinigung", "hotelreinigung"].includes(normalized)) {
    return "reinigung";
  }
  if (
    [
      "endreinigung",
      "end-cleaning",
      "move-out-cleaning",
      "end-of-tenancy-cleaning",
      "uebergabereinigung",
      "ubergabereinigung",
      "reinigung-vor-wohnungsuebergabe",
      "wohnungsuebergabe",
      "vermieter-ready-service",
      "uebergabe-sprint",
      "uebergabeakte",
      "objektbrief",
      "reinigung-nach-entruempelung",
      "post-clearance-cleaning",
    ].includes(normalized)
  ) {
    return "reinigung";
  }
  if (["office-cleaning", "b2b-cleaning", "b2b", "b2b-reinigung"].includes(normalized)) {
    return "bueroreinigung";
  }
  if (["commercial-cleaning", "business-cleaning"].includes(normalized)) {
    return "gewerbereinigung";
  }
  if (["property-management-cleaning", "property-cleaning", "hausverwaltung-reinigung", "hausverwaltungsreinigung", "reinigung-hausverwaltung", "wohnanlagen-reinigung", "objektpflege"].includes(normalized)) {
    return "hausverwaltung-reinigung";
  }
  if (["staircase-cleaning", "stairwell-cleaning", "treppenhaus-reinigung", "treppenhausreinigung", "treppenreinigung", "hauseingang-reinigung"].includes(normalized)) {
    return "treppenhausreinigung";
  }
  if (["recurring-cleaning", "maintenance-cleaning", "unterhalt-reinigung", "unterhaltsreinigung", "regelmaessige-reinigung", "regelmassige-reinigung"].includes(normalized)) {
    return "unterhaltsreinigung";
  }
  if (["building-cleaning", "gebaeudereinigung", "gebaude-reinigung", "objekt-reinigung", "objektreinigung"].includes(normalized)) {
    return "gebaeudereinigung";
  }
  if (["moving", "moving-help", "relocation", "move"].includes(normalized)) {
    return "umzug";
  }
  if (["house-clearance", "apartment-clearance", "clearance", "decluttering"].includes(normalized)) {
    return "entruempelung";
  }
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
  if (["solarreinigung", "solar-reinigung", "solar-panel-cleaning", "solar-cleaning"].includes(normalized)) {
    return "solarreinigung";
  }
  if (
    [
      "pv-anlagen-reinigung",
      "pv-anlagenreinigung",
      "pv-reinigung",
      "photovoltaik-reinigung",
      "photovoltaikreinigung",
      "pv-cleaning",
    ].includes(normalized)
  ) {
    return "pv-anlagen-reinigung";
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
  if (
    [
      "moebeltransport",
      "mobeltransport",
      "moebel-transport",
      "mobel-transport",
      "furniture-transport",
      "furniture-moving",
      "kleintransport",
      "klein-transport",
      "small-move",
      "beiladung",
      "rueckfahrt",
      "ruckfahrt",
      "leerfahrt",
      "leerfahrt-rueckfahrt",
      "return-trip",
      "backhaul",
    ].includes(normalized)
  ) {
    return "moebeltransport";
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
      "offercheck",
      "quote-check",
      "quote-review",
      "second-opinion",
      "guenstiger-pruefen",
    ].includes(normalized)
  ) {
    return "angebot-pruefen";
  }
  if (["reinigung", "hausverwaltung-reinigung", "treppenhausreinigung", "unterhaltsreinigung", "gebaeudereinigung", "solarreinigung", "pv-anlagen-reinigung", "umzug", "moebeltransport", "kontakt", "sonstiges"].includes(normalized)) return normalized as LeadService;
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
  if (
    normalized === "bueroreinigung" ||
    normalized === "gewerbereinigung" ||
    normalized === "praxisreinigung" ||
    normalized === "hausverwaltung-reinigung" ||
    normalized === "treppenhausreinigung" ||
    normalized === "unterhaltsreinigung" ||
    normalized === "gebaeudereinigung"
  ) return "b2b_reinigung";
  if (normalized === "fensterreinigung") return "reinigung";
  if (normalized === "solarreinigung" || normalized === "pv-anlagen-reinigung") return "reinigung";
  if (normalized === "klaviertransport") return "klaviertransport";
  if (normalized === "moebeltransport") return "transport";
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
  if (serviceLabel === "Angebot prüfen") return cityLabel ? `Angebot für ${cityLabel} prüfen lassen` : "Angebot prüfen lassen";
  if (cityLabel) return `${serviceLabel} in ${cityLabel} anfragen`;
  return `${serviceLabel} anfragen`;
}

function buildIntro(service: LeadService, cityLabel: string) {
  if (service === "angebot-pruefen") {
    return `Nennen Sie Angebot, Ort, Termin, Umfang und den wichtigsten Prüfgrund${cityLabel ? ` für ${cityLabel}` : ""}. FLOXANT prüft organisatorisch und praktisch, ohne Preisgarantie.`;
  }
  if (service === "bueroreinigung") {
    return `Beschreiben Sie kurz Fläche, Turnus, Zugang und gewünschte Zeiten${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prüft den Bedarf und meldet sich zurück.`;
  }
  if (service === "gewerbereinigung") {
    return `Nennen Sie Objektart, Fläche, Turnus, Zeitfenster und Zugang${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT ordnet die Anfrage sachlich ein.`;
  }
  if (service === "hausverwaltung-reinigung") {
    return `Nennen Sie Objektart, Etagen, Gemeinschaftsflächen, gewünschten Turnus, Zugang und Ansprechpartner${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prüft die Anfrage oder ein vorhandenes Angebot anhand der genannten Eckdaten.`;
  }
  if (service === "treppenhausreinigung") {
    return `Nennen Sie Etagen, Eingang, Aufzug, Laufwege, Turnus, Zugang und Ansprechpartner${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prüft die Treppenhausreinigung organisatorisch ohne Preis- oder Verfügbarkeitsgarantie.`;
  }
  if (service === "unterhaltsreinigung") {
    return `Nennen Sie Bereiche, Fläche, Turnus, Reinigungszeiten, Zugang und Leistungsumfang${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT sortiert, ob laufende Unterhaltsreinigung, Büro- oder Objekt-Reinigung passt.`;
  }
  if (service === "gebaeudereinigung") {
    return `Nennen Sie Objektart, Bereiche, Fläche, Turnus, Sonderflächen, Zugang und vorhandenes Angebot${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT ordnet Gebäudereinigung als Objektanfrage ein.`;
  }
  if (service === "praxisreinigung") {
    return `Nennen Sie Praxisart, Fläche, Raumliste, Turnus, Zeitfenster und Zugang${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prüft allgemeine Reinigungsflächen ohne pauschale Spezialdesinfektionszusage.`;
  }
  if (service === "fensterreinigung") {
    return `Nennen Sie Glasflächen, Rahmen, Etage, Zugang, Turnus, Zustand und Terminwunsch${cityLabel ? ` in ${cityLabel}` : ""}. Fotos helfen bei schwer erreichbaren Flächen.`;
  }
  if (service === "solarreinigung" || service === "pv-anlagen-reinigung") {
    return `Nennen Sie Dachart, Zugang, Modulfläche, sichtbare Verschmutzung, Fotos und gewünschten Zeitraum${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prüft Machbarkeit ohne Ertrags- oder Verfügbarkeitsgarantie.`;
  }
  if (service === "klaviertransport") {
    return `Beschreiben Sie Instrument, Start, Ziel, Etage, Aufzug, Treppenhaus, Laufweg und Terminwunsch${cityLabel ? ` in ${cityLabel}` : ""}. Fotos helfen bei der Machbarkeitsprüfung.`;
  }
  if (service === "moebeltransport") {
    return `Beschreiben Sie Möbelstück, Start, Ziel, Etage, Zugang, Trageweg, Terminwunsch und mögliche Flexibilität${cityLabel ? ` in ${cityLabel}` : ""}. FLOXANT prüft, ob Möbeltransport, Kleintransport, Beiladung oder Rückfahrt passt.`;
  }
  if (service === "umzug" || service === "fernumzug" || service === "seniorenumzug") {
    return `Beschreiben Sie Start, Ziel, Umfang und Terminwunsch${cityLabel ? ` für ${cityLabel}` : ""}. FLOXANT prüft die Anfrage und meldet sich zurück.`;
  }
  if (service === "entruempelung" || service === "wohnungsaufloesung") {
    return `Beschreiben Sie Räume, Menge, Zugang, Freigabe und Zielzustand${cityLabel ? ` in ${cityLabel}` : ""}. Fotos können später ergänzt werden.`;
  }
  if (service === "diskret-service") {
    return "Beschreiben Sie nur grob Service, Ort, Frist und bevorzugten Kontaktweg. FLOXANT ordnet die Anfrage ruhig ein; private Details sind im ersten Schritt nicht noetig.";
  }
  if (service === "private-client") {
    return "Beschreiben Sie Objekt, gewünschte Diskretion, Leistungsumfang und sicheren Kontaktweg. FLOXANT prüft den Fall ruhig und ohne Standardzusage.";
  }
  return "Beschreiben Sie kurz Leistung, Ort, Umfang und gewünschten Kontaktweg. FLOXANT prüft die Angaben und meldet sich zurück.";
}

function buildPlaceholder(service: LeadService, cityLabel: string) {
  if (service === "angebot-pruefen") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Angebot liegt vor, Preis ca. 950 EUR, Termin nächste Woche, unklar sind Zusatzleistungen/Zugang`;
  }
  if (service === "bueroreinigung" || service === "gewerbereinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Büro/Praxis, ca. 250 m2, 2x pro Woche, Zugang ab 18 Uhr, Rückruf gewünscht`;
  }
  if (service === "hausverwaltung-reinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Mehrfamilienhaus, 4 Etagen, Treppenhaus/Eingang/Keller, wöchentlich, Zugang über Verwaltung, vorhandenes Angebot unklar`;
  }
  if (service === "treppenhausreinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Treppenhaus, 3 Etagen, Eingang und Geländer, 14-tägig, Schlüsselweg klären, Angebot optional`;
  }
  if (service === "unterhaltsreinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Objektfläche, ca. 300 m2, Sanitär/Küche/Flure, 2x wöchentlich, Zeiten nach Betrieb`;
  }
  if (service === "gebaeudereinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Gebäude/Objekt, Bereiche und Sonderflächen, Turnus noch unklar, Fotos oder Angebot vorhanden`;
  }
  if (service === "praxisreinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Praxis, Empfang/Wartebereich/Sanitär, ca. 140 m2, 3x pro Woche, nach Praxisschluss`;
  }
  if (service === "fensterreinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Glasflächen/Rahmen, Etage, Zugang, ca. Anzahl Fenster, Zustand, Terminfenster`;
  }
  if (service === "solarreinigung" || service === "pv-anlagen-reinigung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Dachart, Zugang, ca. Modulanzahl oder Modulfläche, sichtbare Verschmutzung, Fotos, vorhandenes Angebot`;
  }
  if (service === "klaviertransport") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Klavier oder E-Piano, Start/Ziel, Etage, Aufzug, Treppenhaus, Fotos, Terminfenster`;
  }
  if (service === "moebeltransport") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Sofa/Schrank/E-Piano, Start/Ziel, Etage, Zugang, Fotos, Terminfenster, Rückfahrt oder Beiladung möglich`;
  }
  if (service === "umzug" || service === "fernumzug" || service === "seniorenumzug") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Start/Ziel, Etage, grobe Möbelmenge, Terminfenster, Reinigung danach`;
  }
  if (service === "entruempelung" || service === "wohnungsaufloesung") {
    return `z. B. ${cityLabel ? `${cityLabel}, ` : ""}Wohnung/Keller, Menge, Etage, Freigabe, Entsorgung und Reinigung danach`;
  }
  if (service === "diskret-service") {
    return "z. B. sensible Anfrage, Ort, grober Umfang, bevorzugter Kontaktweg, Fotos oder Angebot optional";
  }
  if (service === "private-client") {
    return "z. B. Anwesen/Residenz, gewünschte Leistung, Zugang, Schutzbedarf, diskreter Rückruf";
  }
  return "Kurz beschreiben: Leistung, Ort, Umfang, Terminwunsch und bester Kontaktweg.";
}

function isHandoverCleaningIntent(intent: string) {
  return /endreinigung|uebergabe|ubergabe|vermieter-ready|objektbrief|reinigung-nach-entruempelung|post-clearance|end-of-tenancy|move-out-cleaning/.test(intent);
}

function buildHandoverCleaningCopy(intent: string, cityLabel: string, serviceLabel: string) {
  if (!isHandoverCleaningIntent(intent)) return null;

  const localSuffix = cityLabel ? ` in ${cityLabel}` : "";

  if (intent.includes("angebot")) {
    return {
      title: `Angebot zur Übergabe-Endreinigung${localSuffix} prüfen lassen`,
      intro:
        "Nennen Sie vorhandenes Angebot, Fläche, Zustand, Frist, Restmengen und offene Zusatzpositionen. FLOXANT prüft organisatorisch und praktisch, ohne Preis- oder Ersparnisgarantie.",
      placeholder:
        "z. B. Reinigungsangebot liegt vor, 85 m2 Wohnung, Übergabe nächste Woche, Küche/Bad/Böden, Restmengen unklar, Fotos vorhanden",
    };
  }

  if (intent.includes("objektbrief")) {
    return {
      title: `Objektbrief für Übergabe${localSuffix} anfragen`,
      intro:
        "Beschreiben Sie Objekt, Zustand, Fotos, offene Punkte, Frist und gewünschten Überblick. Der Objektbrief fasst Informationen zusammen und, ersetzt aber keine Rechts- oder Abnahmeprüfung.",
      placeholder:
        "z. B. leerstehende Wohnung, Fotos vorhanden, Restpunkte nach Auszug, Übergabe an Verwaltung, kurzer Objektbrief gewünscht",
    };
  }

  if (intent.includes("uebergabeakte") || intent.includes("ubergabeakte")) {
    return {
      title: `Übergabeakte${localSuffix} vorbereiten`,
      intro:
        "Nennen Sie Objekt, Beteiligte, Frist, Fotos, Reinigungsbedarf und offene Punkte. Die Übergabeakte hilft bei Struktur und Dokumentation, ohne rechtliche Wirkung zu versprechen.",
      placeholder:
        "z. B. Wohnung nach Auszug, Verwaltungstermin, Fotos und offene Punkte vorhanden, Reinigung und Übergabeakte gewünscht",
    };
  }

  if (intent.includes("vermieter-ready") || intent.includes("uebergabe-sprint") || intent.includes("ubergabe-sprint")) {
    return {
      title: `Vermieter-Ready-Fall${localSuffix} prüfen`,
      intro:
        "Beschreiben Sie Zustand, Frist, Restmengen, Reinigung, Schlüsselweg und gewünschte Nachnutzung. FLOXANT sortiert, ob Endreinigung, Objektbrief, Übergabeakte oder Angebotsprüfung passt.",
      placeholder:
        "z. B. Vermieter-Ready: Wohnung leer, 2 Zimmer, Übergabe in 6 Tagen, Bad/Küche/Böden, Restmengen und Fotos vorhanden",
    };
  }

  return {
    title: `Endreinigung vor Übergabe${localSuffix} anfragen`,
    intro:
      "Nennen Sie Fläche, Raumanzahl, Zustand, Restmengen, Fotos, Schlüsselweg und Übergabetermin. FLOXANT prüft Reinigung nach Auszug oder Entrümpelung ohne Abnahme-, Kautions- oder Soforttermin-Garantie.",
    placeholder:
      "z. B. Regensburg, 75 m2 Wohnung, Auszug erledigt, Übergabe am Freitag, Küche/Bad/Böden, kleine Restmengen, Fotos vorhanden",
  };
}

function isPropertyCleaningIntent(intent: string, service: LeadService) {
  return (
    service === "hausverwaltung-reinigung" ||
    service === "treppenhausreinigung" ||
    service === "unterhaltsreinigung" ||
    service === "gebaeudereinigung" ||
    /hausverwaltung|treppenhaus|unterhalt|gebaeude|gebaude|objekt-reinigung|objektreinigung|wohnanlage|property-management|staircase|stairwell|building-cleaning|common-area/.test(intent)
  );
}

function buildPropertyCleaningCopy(intent: string, cityLabel: string, serviceLabel: string, service: LeadService) {
  if (!isPropertyCleaningIntent(intent, service)) return null;
  const localSuffix = cityLabel ? ` in ${cityLabel}` : "";

  if (intent.includes("angebot") || intent.includes("pruefen") || intent.includes("prufen")) {
    return {
      title: `Reinigungsangebot für Hausverwaltung${localSuffix} prüfen lassen`,
      intro:
        "Nennen Sie vorhandenes Angebot, Objektart, Etagen, Bereiche, Turnus, Zugang, Ansprechpartner und unklare Positionen. FLOXANT ordnet organisatorisch ein, ohne Rechts-, Preis- oder Ersparnisgarantie.",
      placeholder:
        "z. B. Angebot liegt vor, Mehrfamilienhaus, 4 Etagen, Treppenhaus/Eingang/Keller, wöchentlich, Zusatzpositionen und Zugang unklar",
    };
  }

  if (service === "treppenhausreinigung") {
    return {
      title: `Treppenhausreinigung${localSuffix} anfragen`,
      intro:
        "Beschreiben Sie Etagen, Hauseingang, Geländer, Aufzug, Gemeinschaftswege, Turnus, Zugang und Ansprechpartner. Eine Anfrage ist noch keine Beauftragung.",
      placeholder:
        "z. B. Treppenhaus, 3 Etagen, Eingang/Geländer/Aufzug, 14-tägig, Zugang über Verwaltung, Ansprechpartner vorhanden",
    };
  }

  if (service === "unterhaltsreinigung") {
    return {
      title: `Unterhaltsreinigung${localSuffix} mit Turnus klären`,
      intro:
        "Beschreiben Sie Bereiche, Fläche, Leistungsumfang, gewünschten Turnus, Reinigungszeiten, Zugang und Ansprechpartner. FLOXANT sortiert die laufende Objekt- oder Gewerbereinigung.",
      placeholder:
        "z. B. Objektfläche, Sanitär/Küche/Flure, ca. 300 m2, 2x pro Woche, nach Betrieb, Angebot optional",
    };
  }

  if (service === "gebaeudereinigung") {
    return {
      title: `Gebäudereinigung${localSuffix} mit konkreten Eckdaten anfragen`,
      intro:
        "Beschreiben Sie Gebäude, Bereiche, Sonderflächen, Turnus, Zugang, Ansprechpartner und vorhandene Fotos oder Angebote. FLOXANT ordnet den passenden Reinigungsweg ein.",
      placeholder:
        "z. B. Gewerbeobjekt/Wohnanlage, Bereiche und Sonderflächen, Turnus unklar, Zugang und Ansprechpartner vorhanden",
    };
  }

  return {
    title: `Hausverwaltung-Reinigung${localSuffix} klar anfragen`,
    intro:
      "Beschreiben Sie Objektart, Etagen, Gemeinschaftsflächen, gewünschten Turnus, Zugang, Ansprechpartner und vorhandenes Angebot. FLOXANT prüft die Anfrage anhand der genannten Eckdaten.",
    placeholder:
      "z. B. Wohnanlage/Mehrfamilienhaus, Treppenhaus, Eingang, Keller/Garage, wöchentlich, Schlüsselweg und Ansprechpartner klären",
  };
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
  const handoverCopy = buildHandoverCleaningCopy(intent, cityLabel, serviceLabel);
  const propertyCleaningCopy = buildPropertyCleaningCopy(intent, cityLabel, serviceLabel, resolvedService);

  return {
    path,
    service: resolvedService,
    city: resolvedCity,
    intent,
    priority,
    serviceLabel,
    cityLabel,
    suggestedFormTitle: propertyCleaningCopy?.title || handoverCopy?.title || buildTitle(serviceLabel, cityLabel),
    suggestedFormIntro: propertyCleaningCopy?.intro || handoverCopy?.intro || buildIntro(resolvedService, cityLabel),
    defaultMessagePlaceholder: propertyCleaningCopy?.placeholder || handoverCopy?.placeholder || buildPlaceholder(resolvedService, cityLabel),
    ctaLabel,
    successMessage: "Anfrage erhalten. FLOXANT prüft die Angaben und meldet sich über die angegebene Kontaktmöglichkeit.",
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
  { path: "/duesseldorf/reinigung", priorityPath: "/duesseldorf/reinigung" },
  { path: "/duesseldorf/gewerbereinigung", priorityPath: "/duesseldorf/gewerbereinigung" },
  { path: "/duesseldorf/bueroreinigung", priorityPath: "/duesseldorf/bueroreinigung" },
  { path: "/duesseldorf/praxisreinigung", priorityPath: "/duesseldorf/praxisreinigung" },
  { path: "/duesseldorf/fensterreinigung", priorityPath: "/duesseldorf/fensterreinigung" },
  { path: "/duesseldorf/grundreinigung", priorityPath: "/duesseldorf/grundreinigung" },
  { path: "/duesseldorf/unterhaltsreinigung", priorityPath: "/duesseldorf/unterhaltsreinigung" },
  { path: "/duesseldorf/baureinigung", priorityPath: "/duesseldorf/baureinigung" },
  { path: "/duesseldorf/treppenhausreinigung", priorityPath: "/duesseldorf/treppenhausreinigung" },
  { path: "/treppenhausreinigung-regensburg", priorityPath: "/treppenhausreinigung-regensburg" },
  { path: "/unterhaltsreinigung-regensburg", priorityPath: "/unterhaltsreinigung-regensburg" },
  { path: "/regensburg/reinigung", priorityPath: "/regensburg/reinigung" },
  { path: "/regensburg/endreinigung", priorityPath: "/regensburg/endreinigung" },
  { path: "/regensburg/uebergabereinigung", priorityPath: "/regensburg/uebergabereinigung" },
  { path: "/vermieter-ready-service", priorityPath: "/vermieter-ready-service" },
  { path: "/uebergabe-sprint", priorityPath: "/uebergabe-sprint" },
  { path: "/uebergabeakte", priorityPath: "/uebergabeakte" },
  { path: "/objektbrief", priorityPath: "/objektbrief" },
  { path: "/entruempelung-landshut", priorityPath: "/entruempelung-landshut" },
  { path: "/klaviertransport-regensburg", priorityPath: "/klaviertransport-regensburg" },
  { path: "/umzug-vohenstrauss", priorityPath: "/umzug-vohenstrauss" },
  { path: "/umzug-neustadt-an-der-waldnaab", priorityPath: "/umzug-neustadt-an-der-waldnaab" },
  { path: "/regensburg/bueroreinigung", priorityPath: "/regensburg/bueroreinigung" },
  { path: "/regensburg/gewerbereinigung", priorityPath: "/regensburg/gewerbereinigung" },
  { path: "/praxisreinigung-regensburg", priorityPath: "/praxisreinigung-regensburg" },
  { path: "/fensterreinigung-regensburg", priorityPath: "/fensterreinigung-regensburg" },
  { path: "/regensburg/umzug", priorityPath: "/regensburg/umzug" },
  { path: "/regensburg/entruempelung", priorityPath: "/regensburg/entruempelung" },
  { path: "/regensburg/wohnungsaufloesung", priorityPath: "/regensburg/wohnungsaufloesung" },
  { path: "/fernumzug-muenchen", priorityPath: "/fernumzug-muenchen" },
  { path: "/reinigungsfirma-angebot", priorityPath: "/reinigungsfirma-angebot" },
  { path: "/diskret-service", priorityPath: "/diskret-service" },
  { path: "/private-client-service", priorityPath: "/private-client-service" },
  { path: "/diskreter-umzug-trennung-scheidung", priorityPath: "/diskreter-umzug-trennung-scheidung" },
] as const;
