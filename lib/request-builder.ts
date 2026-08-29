export type RequestBuilderLocale = "de" | "en";
export type RequestBuilderRegion = "duesseldorf" | "regensburg";
export type RequestBuilderGroup = "cleaning" | "moving" | "clearance";

export type RequestBuilderService = {
  id: string;
  region: RequestBuilderRegion;
  group: RequestBuilderGroup;
  labelDe: string;
  labelEn: string;
  canonicalPath: string;
};

export type RequestBuilderField = {
  id: string;
  labelDe: string;
  labelEn: string;
  placeholderDe?: string;
  placeholderEn?: string;
  type: "text" | "textarea" | "select" | "date";
  required: boolean;
  options?: readonly { value: string; de: string; en: string }[];
};

export type RequestBriefResult = {
  completed: boolean;
  region: RequestBuilderRegion;
  serviceId: string;
  serviceLabel: string;
  canonicalPath: string;
  summary: string;
  brief: string;
  openFields: string[];
};

export const requestBuilderServices: readonly RequestBuilderService[] = [
  { id: "duesseldorf-cleaning", region: "duesseldorf", group: "cleaning", labelDe: "Reinigung", labelEn: "Cleaning service", canonicalPath: "/duesseldorf/reinigung" },
  { id: "duesseldorf-office", region: "duesseldorf", group: "cleaning", labelDe: "Büroreinigung", labelEn: "Office cleaning", canonicalPath: "/duesseldorf/bueroreinigung" },
  { id: "duesseldorf-practice", region: "duesseldorf", group: "cleaning", labelDe: "Praxisreinigung", labelEn: "Practice cleaning", canonicalPath: "/duesseldorf/praxisreinigung" },
  { id: "duesseldorf-window", region: "duesseldorf", group: "cleaning", labelDe: "Fenster- und Glasreinigung", labelEn: "Window cleaning", canonicalPath: "/duesseldorf/fensterreinigung" },
  { id: "regensburg-moving", region: "regensburg", group: "moving", labelDe: "Umzug", labelEn: "Moving service", canonicalPath: "/regensburg/umzug" },
  { id: "regensburg-clearance", region: "regensburg", group: "clearance", labelDe: "Entrümpelung oder Räumung", labelEn: "Clearance", canonicalPath: "/regensburg/entruempelung" },
  { id: "regensburg-house-clearance", region: "regensburg", group: "clearance", labelDe: "Wohnungsauflösung", labelEn: "House clearance", canonicalPath: "/regensburg/wohnungsaufloesung" },
  { id: "regensburg-cleaning", region: "regensburg", group: "cleaning", labelDe: "Reinigung", labelEn: "Cleaning service", canonicalPath: "/regensburg/reinigung" },
];

const yesNoOpen = [
  { value: "yes", de: "Ja", en: "Yes" },
  { value: "no", de: "Nein", en: "No" },
  { value: "open", de: "Noch offen", en: "Not decided yet" },
] as const;

const commonFields: readonly RequestBuilderField[] = [
  { id: "location", labelDe: "Ort oder PLZ", labelEn: "City or postcode", placeholderDe: "z. B. Düsseldorf 40213", placeholderEn: "e.g. Düsseldorf 40213", type: "text", required: true },
  { id: "desiredDate", labelDe: "Wunschtermin oder Zeitraum", labelEn: "Preferred date or period", type: "date", required: true },
  { id: "access", labelDe: "Zugang, Etage, Aufzug oder Parkweg", labelEn: "Access, floor, lift or parking route", placeholderDe: "Was ist für den Zugang wichtig?", placeholderEn: "What matters for access?", type: "textarea", required: true },
  { id: "photos", labelDe: "Sind Fotos vorhanden?", labelEn: "Are photos available?", type: "select", required: false, options: yesNoOpen },
  { id: "special", labelDe: "Besondere Anforderungen", labelEn: "Special requirements", placeholderDe: "Optional: sensible Flächen, Fristen oder Abstimmung", placeholderEn: "Optional: sensitive areas, deadlines or coordination", type: "textarea", required: false },
  { id: "callback", labelDe: "Rückruf gewünscht?", labelEn: "Would you like a callback?", type: "select", required: false, options: yesNoOpen },
];

const groupFields: Record<RequestBuilderGroup, readonly RequestBuilderField[]> = {
  cleaning: [
    { id: "objectType", labelDe: "Objektart", labelEn: "Property type", type: "select", required: true, options: [
      { value: "apartment", de: "Wohnung / Haus", en: "Apartment / house" },
      { value: "office", de: "Büro", en: "Office" },
      { value: "practice", de: "Praxis", en: "Practice" },
      { value: "commercial", de: "Gewerbeobjekt", en: "Commercial property" },
      { value: "other", de: "Anderes Objekt", en: "Other property" },
    ] },
    { id: "area", labelDe: "Fläche und Räume", labelEn: "Area and rooms", placeholderDe: "z. B. 180 m², 6 Büros, Küche und Sanitär", placeholderEn: "e.g. 180 m², 6 offices, kitchen and sanitary areas", type: "text", required: true },
    { id: "scope", labelDe: "Gewünschte Reinigungsleistung (optional)", labelEn: "Required cleaning scope (optional)", placeholderDe: "Optional: Welche Bereiche und Arbeiten sollen enthalten sein?", placeholderEn: "Optional: Which areas and tasks should be included?", type: "textarea", required: false },
    { id: "frequency", labelDe: "Einmalig oder regelmäßig", labelEn: "One-off or recurring", type: "select", required: true, options: [
      { value: "once", de: "Einmalig", en: "One-off" },
      { value: "weekly", de: "Wöchentlich", en: "Weekly" },
      { value: "fortnightly", de: "14-tägig", en: "Every two weeks" },
      { value: "other", de: "Anderer Turnus / offen", en: "Other frequency / open" },
    ] },
    { id: "condition", labelDe: "Aktueller Zustand und gewünschtes Ergebnis", labelEn: "Current condition and desired result", placeholderDe: "Was ist sichtbar und welcher Zielzustand ist wichtig?", placeholderEn: "What is the current condition and desired result?", type: "textarea", required: true },
    { id: "materials", labelDe: "Material und Verbrauchsmittel", labelEn: "Materials and consumables", type: "select", required: false, options: [
      { value: "provider", de: "Soll FLOXANT mitbringen", en: "FLOXANT should supply them" },
      { value: "customer", de: "Vor Ort vorhanden", en: "Available on site" },
      { value: "open", de: "Noch zu klären", en: "Needs clarification" },
    ] },
  ],
  moving: [
    { id: "startAddress", labelDe: "Startort", labelEn: "Origin", placeholderDe: "Ort / PLZ und Straße optional später", placeholderEn: "City / postcode; street can follow later", type: "text", required: true },
    { id: "destination", labelDe: "Zielort", labelEn: "Destination", placeholderDe: "Ort / PLZ und Straße optional später", placeholderEn: "City / postcode; street can follow later", type: "text", required: true },
    { id: "floors", labelDe: "Etagen und Aufzüge an Start und Ziel", labelEn: "Floors and lifts at origin and destination", placeholderDe: "z. B. Start 3. OG ohne Aufzug, Ziel EG", placeholderEn: "e.g. origin 3rd floor no lift, destination ground floor", type: "text", required: true },
    { id: "homeSize", labelDe: "Wohnfläche und Räume", labelEn: "Home size and rooms", placeholderDe: "z. B. 75 m², 3 Zimmer", placeholderEn: "e.g. 75 m², 3 rooms", type: "text", required: true },
    { id: "inventory", labelDe: "Möbelumfang und besondere Stücke", labelEn: "Furniture scope and special items", placeholderDe: "Kurze Inventarliste oder wichtigste Möbel", placeholderEn: "Short inventory or main furniture items", type: "textarea", required: true },
    { id: "assembly", labelDe: "Demontage oder Montage", labelEn: "Disassembly or assembly", type: "select", required: false, options: yesNoOpen },
    { id: "packing", labelDe: "Verpackung oder Kartons benötigt", labelEn: "Packing or boxes required", type: "select", required: false, options: yesNoOpen },
    { id: "parking", labelDe: "Haltezone oder besondere Parksituation", labelEn: "Parking suspension or special parking situation", type: "select", required: false, options: yesNoOpen },
    { id: "extras", labelDe: "Reinigung oder Räumung zusätzlich", labelEn: "Cleaning or clearance as an extra", type: "select", required: false, options: yesNoOpen },
  ],
  clearance: [
    { id: "objectType", labelDe: "Objekt und betroffene Bereiche", labelEn: "Property and affected areas", placeholderDe: "z. B. Wohnung, Keller und Garage", placeholderEn: "e.g. apartment, cellar and garage", type: "text", required: true },
    { id: "inventory", labelDe: "Mengen oder Inventar", labelEn: "Quantity or inventory", placeholderDe: "Welche Möbel, Gegenstände oder Restmengen?", placeholderEn: "Which furniture, items or remaining contents?", type: "textarea", required: true },
    { id: "disposal", labelDe: "Was soll entsorgt, behalten oder getrennt werden?", labelEn: "What should be disposed of, kept or separated?", placeholderDe: "Grenzen und besondere Gegenstände nennen", placeholderEn: "State boundaries and special items", type: "textarea", required: true },
    { id: "desiredResult", labelDe: "Gewünschter Endzustand", labelEn: "Desired final condition", placeholderDe: "z. B. leer, besenrein oder mit Endreinigung", placeholderEn: "e.g. empty, swept or with final cleaning", type: "text", required: true },
  ],
};

export function getRequestBuilderFields(group: RequestBuilderGroup) {
  const fields = [...groupFields[group]];
  if (group !== "moving") fields.unshift(commonFields[0]);
  return [...fields, ...commonFields.slice(1)];
}

export function getRequestBuilderService(id: string) {
  return requestBuilderServices.find((service) => service.id === id) ?? requestBuilderServices[0];
}
