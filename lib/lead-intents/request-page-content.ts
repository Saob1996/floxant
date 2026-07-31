import type { RequestContext } from "@/lib/lead-intents/resolve-request-context";

export type RequestPageContent = {
  key: string;
  cards: readonly { title: string; text: string }[];
  checklist: readonly string[];
  optionalSummary: string;
};

const neutral: RequestPageContent = {
  key: "neutral",
  cards: [
    { title: "Ort und Leistung wählen", text: "Wählen Sie zuerst, wo und wobei FLOXANT Sie unterstützen soll." },
    { title: "Eckdaten kurz beschreiben", text: "Ein grober Umfang und ein gewünschter Zeitraum reichen für die erste Prüfung." },
    { title: "Kontaktweg festlegen", text: "Bestimmen Sie, ob die Rückmeldung per E-Mail, Telefon oder WhatsApp erfolgen soll." },
  ],
  checklist: ["Standort", "gewünschte Leistung", "grober Umfang", "Zeitraum, falls bekannt", "bevorzugter Kontaktweg"],
  optionalSummary: "Optional können Sie noch einen Zeitraum, Fotos oder weitere hilfreiche Angaben ergänzen.",
};

const moving: RequestPageContent = {
  key: "regensburg_moving",
  cards: [
    { title: "Start und Ziel klar angeben", text: "Mit Startort, Zielort, Etagen und Angaben zum Aufzug lässt sich der Transportweg besser einordnen." },
    { title: "Umfang verständlich beschreiben", text: "Zimmer, Wohnfläche, Kartons und größere Möbel helfen dabei, den benötigten Umfang zu prüfen." },
    { title: "Zusatzleistungen passend auswählen", text: "Demontage, Montage, Verpackung, Entrümpelung oder Reinigung können bei Bedarf ergänzt werden." },
  ],
  checklist: ["Startort und Zielort", "gewünschter Zeitraum", "Zimmer oder Wohnfläche", "Etagen und Aufzug", "größere Möbel", "gewünschte Zusatzleistungen", "Fotos der Räume oder Zugänge, optional"],
  optionalSummary: "Optional können Sie noch einen Zeitraum, Fotos oder weitere Angaben zu Möbeln und Zugängen ergänzen.",
};

const cleaning: RequestPageContent = {
  key: "duesseldorf_cleaning",
  cards: [
    { title: "Objekt und Ort angeben", text: "Objektart, Stadtteil oder Postleitzahl helfen bei der ersten Einordnung der Reinigung." },
    { title: "Fläche und Turnus beschreiben", text: "Nennen Sie die ungefähre Fläche und ob die Reinigung einmalig oder regelmäßig benötigt wird." },
    { title: "Besondere Bereiche ergänzen", text: "Fenster, Küche, Sanitärbereiche oder ein Treppenhaus können gezielt ergänzt werden." },
  ],
  checklist: ["Ort oder Postleitzahl", "Objektart", "ungefähre Fläche", "gewünschter Turnus", "besondere Bereiche", "Zugang oder Zeitfenster", "Fotos, optional"],
  optionalSummary: "Optional können Sie noch einen Zeitraum, Fotos oder besondere Bereiche der Reinigung ergänzen.",
};

const clearance: RequestPageContent = {
  key: "regensburg_clearance",
  cards: [
    { title: "Objekt und Zugang beschreiben", text: "Ort, Objektart, Etage und Aufzug helfen, den Zugang realistisch einzuordnen." },
    { title: "Restmenge verständlich angeben", text: "Räume, Fläche und größere Gegenstände geben einen ersten Überblick über den Umfang." },
    { title: "Zusatzbedarf ergänzen", text: "Demontage, Entsorgung oder Reinigung können passend zur Situation ergänzt werden." },
  ],
  checklist: ["Ort und Objektart", "Räume oder Fläche", "Etage und Aufzug", "größere Gegenstände", "gewünschter Zeitraum", "Zusatzleistungen", "Fotos, optional"],
  optionalSummary: "Optional können Sie noch einen Zeitraum, Fotos oder weitere Angaben zu Restmengen und Zugängen ergänzen.",
};

export function resolveRequestPageContent(context: RequestContext): RequestPageContent {
  if (!context.valid || context.neutral) return neutral;
  if (context.service === "umzug") return moving;
  if (context.service === "entruempelung" || context.service === "wohnungsaufloesung") return clearance;
  if (["reinigung", "bueroreinigung", "gewerbereinigung", "fensterreinigung"].includes(context.service)) return cleaning;
  return neutral;
}
