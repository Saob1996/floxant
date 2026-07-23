import type { ContactFieldGroupKey } from "@/lib/service-routing";

export type ContactFieldDefinition = {
  name: string;
  label: string;
  required?: boolean;
  recommended?: boolean;
  sensitive?: boolean;
};

export type ContactFieldGroup = {
  key: ContactFieldGroupKey;
  label: string;
  description: string;
  fields: readonly ContactFieldDefinition[];
};

export const contactFieldGroups: Record<ContactFieldGroupKey, ContactFieldGroup> = {
  core: {
    key: "core",
    label: "Basisangaben",
    description: "Diese Angaben reichen für eine allgemeine Anfrage.",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email_or_phone", label: "E-Mail oder Telefon", required: true },
      { name: "servicePreset", label: "Leistung", required: true },
      { name: "city", label: "Ort", required: true },
      { name: "message", label: "Kurzbeschreibung", recommended: true },
      { name: "contactMethodPreference", label: "Bevorzugter Kontaktweg", recommended: true },
    ],
  },
  cleaning: {
    key: "cleaning",
    label: "Reinigung",
    description: "Hilfreiche Angaben für eine einmalige oder regelmäßige Reinigung.",
    fields: [
      { name: "objectType", label: "Objektart", recommended: true },
      { name: "areaSize", label: "Flaeche/Raeume", recommended: true },
      { name: "desiredDate", label: "Terminfenster", recommended: true },
      { name: "serviceScope", label: "Leistungsumfang", recommended: true },
      { name: "existingCleaningOffer", label: "Vorhandenes Angebot", recommended: true },
      { name: "message", label: "Zustand/Fotos/Details", recommended: true },
    ],
  },
  "b2b-cleaning": {
    key: "b2b-cleaning",
    label: "Büro- und Gewerbereinigung",
    description: "Hilfreiche Angaben für Büro, Gewerbe, Praxis, Kanzlei, Hotel oder regelmäßige Reinigung.",
    fields: [
      { name: "companyName", label: "Firma", recommended: true },
      { name: "areaSize", label: "Flaeche/Raeume", recommended: true },
      { name: "cleaningFrequency", label: "Turnus", recommended: true },
      { name: "preferredCleaningTime", label: "Gewuenschtes Zeitfenster", recommended: true },
      { name: "contactPersonRole", label: "Rolle/Ansprechpartner", recommended: true },
      { name: "specialAreas", label: "Sonderbereiche", recommended: true },
    ],
  },
  "property-cleaning": {
    key: "property-cleaning",
    label: "Hausverwaltung/Objekt",
    description: "Felder fuer Treppenhaus, Unterhalt, Gebaeude und Hausverwaltung.",
    fields: [
      { name: "propertyCleaningRole", label: "Rolle", recommended: true },
      { name: "propertyCleaningObjectType", label: "Objektart", recommended: true },
      { name: "propertyCleaningAreas", label: "Bereiche", recommended: true },
      { name: "propertyCleaningFrequency", label: "Turnus", recommended: true },
      { name: "propertyCleaningAccess", label: "Zugang/Schluesselweg", recommended: true },
      { name: "propertyCleaningExistingOffer", label: "Vorhandenes Angebot", recommended: true },
      { name: "propertyCleaningStartDate", label: "Start/Wechsel", recommended: true },
    ],
  },
  moving: {
    key: "moving",
    label: "Umzug",
    description: "Felder fuer Umzug, Fernumzug und Seniorenumzug.",
    fields: [
      { name: "serviceScope", label: "Umfang", recommended: true },
      { name: "desiredDate", label: "Termin", recommended: true },
      { name: "city", label: "Startort/Zielort", required: true },
      { name: "objectType", label: "Wohnung/Haus/Buero", recommended: true },
      { name: "message", label: "Etage, Aufzug, Laufweg", recommended: true },
      { name: "seniorExtraNeeds", label: "Seniorenumzug-Zusatzbedarf", recommended: true },
    ],
  },
  clearance: {
    key: "clearance",
    label: "Entruempelung/Aufloesung",
    description: "Felder fuer Keller, Wohnung, Nachlass, Haushaltsaufloesung und Zielzustand.",
    fields: [
      { name: "objectType", label: "Objekt/Raeume", recommended: true },
      { name: "serviceScope", label: "Menge/Zielzustand", recommended: true },
      { name: "desiredDate", label: "Frist/Termin", recommended: true },
      { name: "message", label: "Zugang, Freigabe, Fotos", recommended: true },
      { name: "handoverExtraNeeds", label: "Reinigung/Objektbrief optional", recommended: true },
    ],
  },
  "offer-check": {
    key: "offer-check",
    label: "Angebot pruefen",
    description: "Felder fuer Angebotscheck, Plan-B, Zweitmeinung und Anbieter-Vergleich.",
    fields: [
      { name: "offerStatus", label: "Bestehendes Angebot", recommended: true },
      { name: "offerAmount", label: "Bisheriger Preis", recommended: true },
      { name: "offerConcern", label: "Pruefgrund", recommended: true },
      { name: "desiredDate", label: "Termin/Deadline", recommended: true },
      { name: "message", label: "Leistungsumfang/offene Punkte", recommended: true },
      { name: "offerUploadMetadata", label: "Angaben zum hochgeladenen Angebot", recommended: true },
    ],
  },
  discreet: {
    key: "discreet",
    label: "Diskreter Fall",
    description: "Felder fuer sensible Anfragen mit minimaler Detailpflicht.",
    fields: [
      { name: "contactMethodPreference", label: "Sicherer Kontaktweg", recommended: true, sensitive: true },
      { name: "city", label: "Ort grob", required: true },
      { name: "message", label: "Grobe Lage", recommended: true, sensitive: true },
      { name: "desiredDate", label: "Frist", recommended: true },
      { name: "seniorSensitiveSituation", label: "Sensible Situation optional", recommended: true, sensitive: true },
    ],
  },
  english: {
    key: "english",
    label: "English request",
    description: "Fields for international customers using English service terms.",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email_or_phone", label: "Email or phone", required: true },
      { name: "servicePreset", label: "Service", required: true },
      { name: "city", label: "City/ZIP", required: true },
      { name: "message", label: "Short description", recommended: true },
      { name: "contactMethodPreference", label: "Preferred contact method", recommended: true },
    ],
  },
  "special-transport": {
    key: "special-transport",
    label: "Sondertransport",
    description: "Felder fuer Klaviertransport, Moebeltransport, Beiladung und Rueckfahrt.",
    fields: [
      { name: "pianoInstrumentType", label: "Instrument/Gegenstand", recommended: true },
      { name: "pianoStartLocation", label: "Startort", recommended: true },
      { name: "pianoDestination", label: "Zielort", recommended: true },
      { name: "pianoStartFloor", label: "Etage Start", recommended: true },
      { name: "pianoDestinationFloor", label: "Etage Ziel", recommended: true },
      { name: "pianoElevator", label: "Aufzug", recommended: true },
      { name: "pianoPhotos", label: "Fotos vorhanden", recommended: true },
    ],
  },
  "solar-pv": {
    key: "solar-pv",
    label: "Solar/PV",
    description: "Felder fuer Solar- und PV-Anlagen-Reinigung.",
    fields: [
      { name: "solarRoofType", label: "Dachart", recommended: true },
      { name: "solarAccess", label: "Zugang", recommended: true },
      { name: "solarModuleScope", label: "Modulumfang", recommended: true },
      { name: "solarVisibleDirt", label: "Sichtbare Verschmutzung", recommended: true },
      { name: "solarExistingOffer", label: "Vorhandenes Angebot", recommended: true },
      { name: "solarTimeframe", label: "Zeitraum", recommended: true },
    ],
  },
  handover: {
    key: "handover",
    label: "Uebergabe/Endreinigung",
    description: "Felder fuer Uebergabeakte, Endreinigung, Objektbrief und Vermieter-Ready.",
    fields: [
      { name: "handoverSituation", label: "Uebergabe-Situation", recommended: true },
      { name: "handoverCondition", label: "Zustand/Restmengen", recommended: true },
      { name: "handoverDeadline", label: "Uebergabe-Frist", recommended: true },
      { name: "handoverKeyAccess", label: "Schluesselweg/Zugang", recommended: true },
      { name: "handoverExtraNeeds", label: "Zusatzbedarf", recommended: true },
      { name: "message", label: "Fotos/offene Punkte", recommended: true },
    ],
  },
};

export function getContactFieldGroup(key: ContactFieldGroupKey) {
  return contactFieldGroups[key] || contactFieldGroups.core;
}
