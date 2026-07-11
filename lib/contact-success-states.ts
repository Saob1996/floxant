import type { ContactSuccessStateKey } from "@/lib/service-routing";

export type ContactSuccessState = {
  key: ContactSuccessStateKey;
  title: string;
  body: string;
  nextSteps: readonly string[];
};

export const contactSuccessStates: Record<ContactSuccessStateKey, ContactSuccessState> = {
  "general-success": {
    key: "general-success",
    title: "Anfrage gesendet.",
    body: "FLOXANT prüft Leistung, Ort und Umfang und meldet sich über die angegebene Kontaktmöglichkeit.",
    nextSteps: ["Leistung und Ort prüfen", "fehlende Angaben nachfragen", "über den gewünschten Kontaktweg melden"],
  },
  "cleaning-success": {
    key: "cleaning-success",
    title: "Reinigungsanfrage gesendet.",
    body: "FLOXANT prüft Objektart, Fläche, Zustand, Termin und vorhandene Fotos oder Angebote ohne Preis- oder Verfügbarkeitsgarantie.",
    nextSteps: ["Objekt und Fläche prüfen", "Terminfenster klären", "bei Bedarf Fotos oder Angebot erfragen"],
  },
  "b2b-success": {
    key: "b2b-success",
    title: "Anfrage zur Firmenreinigung gesendet.",
    body: "FLOXANT prüft Fläche, Turnus, Zugang und Ansprechpartner für Büro, Gewerbe, Praxis oder Objekt.",
    nextSteps: ["Turnus und Zeitfenster prüfen", "Ansprechpartner klären", "Leistungsumfang abstimmen"],
  },
  "property-cleaning-success": {
    key: "property-cleaning-success",
    title: "Anfrage zur Objektreinigung gesendet.",
    body: "FLOXANT prueft Rolle, Objektart, Bereiche, Turnus, Zugang und vorhandenes Angebot fuer Verwaltung, Treppenhaus oder Unterhalt.",
    nextSteps: ["Objektbereiche sortieren", "Schluesselweg klaeren", "Angebot oder Turnus abgleichen"],
  },
  "moving-success": {
    key: "moving-success",
    title: "Umzugsanfrage gesendet.",
    body: "FLOXANT prueft Start, Ziel, Umfang, Etagen, Termin und besondere Ruecksichtspunkte.",
    nextSteps: ["Route und Termin pruefen", "Umfang nachfassen", "Transportweg einordnen"],
  },
  "clearance-success": {
    key: "clearance-success",
    title: "Räumungsanfrage gesendet.",
    body: "FLOXANT prueft Raeume, Menge, Zugang, Freigabe, Zielzustand und optionalen Reinigungsbedarf.",
    nextSteps: ["Menge und Zugang einordnen", "Freigabe klaeren", "Zielzustand abstimmen"],
  },
  "offer-check-success": {
    key: "offer-check-success",
    title: "Anfrage zur Angebotsprüfung gesendet.",
    body: "FLOXANT prueft Angebot, Umfang, Preisrahmen, Termin und Pruefgrund organisatorisch, ohne Preis- oder Ersparnisgarantie.",
    nextSteps: ["Angebotsstatus pruefen", "Pruefgrund einordnen", "fehlende Unterlagen nachfragen"],
  },
  "discreet-success": {
    key: "discreet-success",
    title: "Diskrete Anfrage gesendet.",
    body: "FLOXANT prueft nur die notwendigen Eckdaten und nutzt den angegebenen sicheren Kontaktweg.",
    nextSteps: ["Kontaktweg beachten", "nur noetige Rueckfragen stellen", "Fallgrenzen ruhig klaeren"],
  },
  "english-success": {
    key: "english-success",
    title: "Your request has arrived.",
    body: "FLOXANT checks the service, location, scope and preferred contact method before asking for missing details.",
    nextSteps: ["check service and city", "ask for missing details", "use the selected contact method"],
  },
  "special-transport-success": {
    key: "special-transport-success",
    title: "Anfrage zum Sondertransport gesendet.",
    body: "FLOXANT prueft Gegenstand, Start, Ziel, Etagen, Zugang, Fotos und Terminfenster.",
    nextSteps: ["Start und Ziel pruefen", "Zugang und Etagen klaeren", "Fotos optional nachfragen"],
  },
  "solar-pv-success": {
    key: "solar-pv-success",
    title: "Anfrage zur Solar- oder PV-Reinigung gesendet.",
    body: "FLOXANT prueft Dachart, Zugang, Modulumfang, Verschmutzung, Fotos und Zeitraum ohne Ertragsversprechen.",
    nextSteps: ["Zugang einordnen", "Modulumfang klaeren", "Fotos oder Angebot optional nachfragen"],
  },
  "handover-success": {
    key: "handover-success",
    title: "Anfrage zur Übergabevorbereitung gesendet.",
    body: "FLOXANT prueft Zustand, Restmengen, Frist, Schluesselweg und passenden Weg fuer Endreinigung, Objektbrief oder Uebergabeakte.",
    nextSteps: ["Frist und Schluesselweg pruefen", "Restmengen klaeren", "passenden Uebergabeweg einordnen"],
  },
};

export function getContactSuccessState(key: ContactSuccessStateKey) {
  return contactSuccessStates[key] || contactSuccessStates["general-success"];
}
