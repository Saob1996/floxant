import { getRequestChecklist, type RequestChecklistKey } from "@/lib/request-checklists";

export const objectBriefSections = [
  {
    key: "situation",
    title: "Situation",
    text: "Worum geht es, welche Leistung ist gemeint und warum ist die Anfrage gerade relevant?",
  },
  {
    key: "object",
    title: "Objekt",
    text: "Ort/PLZ, Objektart, Räume, Fläche, Zustand, Zugang und Schlüsselweg.",
  },
  {
    key: "time",
    title: "Termin",
    text: "Wunschtermin, Deadline, Übergabe, Besichtigung oder flexibles Zeitfenster.",
  },
  {
    key: "proof",
    title: "Unterlagen",
    text: "Fotos, vorhandenes Angebot, Raumliste oder grobe Menge freiwillig und ohne sensible Daten.",
  },
  {
    key: "next-step",
    title: "Nächster Schritt",
    text: "Rückruf, WhatsApp, E-Mail, Angebotscheck, Übergabeakte oder normaler Kontakt.",
  },
] as const;

export const objectBriefPrinciples = [
  "Der Objektbrief ist keine Buchung.",
  "Er erzeugt keine Preis-, Termin- oder Verfügbarkeitsgarantie.",
  "Er soll fehlende Angaben sichtbar machen, nicht Kundendaten öffentlich speichern.",
  "Fotos und Angebote bleiben optional und gehören erst in den bewussten Kontaktweg.",
] as const;

export function getObjectBriefChecklist(serviceKey?: string): {
  key: RequestChecklistKey;
  title: string;
  items: string[];
} {
  const checklist = getRequestChecklist(serviceKey || "objektbrief");

  return {
    key: checklist.key,
    title: `${checklist.shortLabel} als Objektbrief`,
    items: [
      ...checklist.requiredCoreInfo.map((item) => `${item.label}: ${item.detail}`),
      ...checklist.helpfulOptionalInfo.slice(0, 2).map((item) => `${item.label}: ${item.detail}`),
    ].slice(0, 6),
  };
}
