import type { LucideIcon } from "lucide-react";
import { FileSearch, PackageOpen, Sparkles, Truck, Zap } from "lucide-react";

export type InquiryIntent = "move" | "cleaning" | "clearance" | "express" | "offer-check";
export type InquiryRegion = "regensburg-bayern" | "duesseldorf";

export type InquiryField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "tel" | "email";
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

export type InquiryConfig = {
  intent: InquiryIntent;
  label: string;
  title: string;
  subtitle: string;
  regionScope: string;
  primaryCta: string;
  secondaryCta?: string;
  routeFallback?: string;
  serviceType: string;
  defaultRegion: InquiryRegion;
  icon: LucideIcon;
  fields: InquiryField[];
  whatsappText: (values: Record<string, string>) => string;
};

const valueOrBlank = (value?: string) => (value?.trim() ? value.trim() : "___");

export const OFFER_CHECK_ROUTE = "/angebot-guenstiger-pruefen";

export const inquiryConfigs: Record<InquiryIntent, InquiryConfig> = {
  move: {
    intent: "move",
    label: "Umzug",
    title: "Umzug anfragen.",
    subtitle: "Start, Ziel und grober Umfang reichen für die erste Einordnung.",
    regionScope: "Für Umzüge in Regensburg, Umgebung und Bayern nach Verfügbarkeit.",
    primaryCta: "Umzug anfragen",
    secondaryCta: "Ich möchte erst beraten werden",
    serviceType: "umzug",
    defaultRegion: "regensburg-bayern",
    icon: Truck,
    fields: [
      { name: "startLocation", label: "Startort", placeholder: "z. B. Regensburg, Prüfening", required: true },
      { name: "destinationLocation", label: "Zielort", placeholder: "z. B. Nürnberg oder innerhalb Regensburg", required: true },
      {
        name: "scope",
        label: "Grober Umfang",
        type: "select",
        required: true,
        options: ["1 Zimmer / kleine Menge", "2-3 Zimmer", "Haus / größere Wohnung", "Büro / Gewerbe", "Noch unsicher"],
      },
      { name: "timeframe", label: "Gewünschter Zeitraum", placeholder: "z. B. nächste Woche, Ende Juni" },
      { name: "phone", label: "Telefon oder WhatsApp", type: "tel", placeholder: "+49 ...", required: true },
      { name: "contactName", label: "Name optional", placeholder: "Ihr Name" },
    ],
    whatsappText: (values) =>
      `Hallo FLOXANT, ich möchte einen Umzug anfragen. Ort: ${valueOrBlank(values.startLocation)}. Ziel: ${valueOrBlank(values.destinationLocation)}. Umfang: ${valueOrBlank(values.scope)}. Bitte melden Sie sich bei mir.`,
  },
  cleaning: {
    intent: "cleaning",
    label: "Reinigung",
    title: "Reinigung anfragen.",
    subtitle: "Wählen Sie zuerst das Einsatzgebiet. Düsseldorf bleibt klar getrennt.",
    regionScope: "Düsseldorf: Reinigung über eigene lokale Kontaktmöglichkeiten. Regensburg/Bayern: Reinigung nach Einsatzgebiet und Verfügbarkeit.",
    primaryCta: "Reinigung anfragen",
    serviceType: "reinigung",
    defaultRegion: "regensburg-bayern",
    icon: Sparkles,
    fields: [
      { name: "location", label: "Ort", placeholder: "z. B. Düsseldorf-Flingern oder Regensburg", required: true },
      {
        name: "objectType",
        label: "Objektart",
        type: "select",
        required: true,
        options: ["Wohnung", "Haus", "Büro / Praxis", "Treppenhaus", "Möblierte Wohnung", "Sonstiges Objekt"],
      },
      { name: "size", label: "Fläche oder grobe Größe", placeholder: "z. B. 75 m², 3 Zimmer, kleines Büro", required: true },
      { name: "timeframe", label: "Gewünschter Zeitraum", placeholder: "z. B. diese Woche, vor Übergabe" },
      { name: "phone", label: "Telefon oder WhatsApp", type: "tel", placeholder: "+49 ...", required: true },
      { name: "contactName", label: "Name optional", placeholder: "Ihr Name" },
    ],
    whatsappText: (values) =>
      values.region === "duesseldorf"
        ? `Hallo FLOXANT, ich möchte eine Reinigung in Düsseldorf anfragen. Objekt: ${valueOrBlank(values.objectType)}. Umfang: ${valueOrBlank(values.size)}. Zeitraum: ${valueOrBlank(values.timeframe)}. Bitte melden Sie sich bei mir.`
        : `Hallo FLOXANT, ich möchte eine Reinigung in Regensburg/Bayern anfragen. Ort: ${valueOrBlank(values.location)}. Objekt: ${valueOrBlank(values.objectType)}. Umfang: ${valueOrBlank(values.size)}. Zeitraum: ${valueOrBlank(values.timeframe)}. Bitte melden Sie sich bei mir.`,
  },
  clearance: {
    intent: "clearance",
    label: "Entrümpelung",
    title: "Entrümpelung anfragen.",
    subtitle: "Ort, Art und Umfang reichen. Fotos können später per WhatsApp folgen.",
    regionScope: "Für Entrümpelungen in Regensburg, Umgebung und Bayern nach Verfügbarkeit.",
    primaryCta: "Entrümpelung anfragen",
    serviceType: "entsorgung",
    defaultRegion: "regensburg-bayern",
    icon: PackageOpen,
    fields: [
      { name: "location", label: "Ort", placeholder: "z. B. Regensburg, Kelheim, Straubing", required: true },
      {
        name: "clearanceType",
        label: "Art der Entrümpelung",
        type: "select",
        required: true,
        options: ["Wohnung", "Keller / Dachboden", "Haus", "Gewerbe / Büro", "Nachlass", "Sonstiges"],
      },
      { name: "scope", label: "Grober Umfang", placeholder: "z. B. 1 Kellerraum, 2 Zimmer, komplette Wohnung", required: true },
      { name: "timeframe", label: "Gewünschter Zeitraum", placeholder: "z. B. kurzfristig, vor Übergabe" },
      { name: "phone", label: "Telefon oder WhatsApp", type: "tel", placeholder: "+49 ...", required: true },
      { name: "contactName", label: "Name optional", placeholder: "Ihr Name" },
    ],
    whatsappText: (values) =>
      `Hallo FLOXANT, ich möchte eine Entrümpelung anfragen. Ort: ${valueOrBlank(values.location)}. Umfang: ${valueOrBlank(values.scope)}. Fotos kann ich bei Bedarf senden.`,
  },
  express: {
    intent: "express",
    label: "Express",
    title: "Nur Eckdaten senden.",
    subtitle: "Ort, Anliegen und Rückruf reichen. Details klären wir persönlich.",
    regionScope: "Nur Eckdaten senden. Details klären wir im Rückruf.",
    primaryCta: "Express-Anfrage senden",
    serviceType: "umzug",
    defaultRegion: "regensburg-bayern",
    icon: Zap,
    fields: [
      { name: "location", label: "Ort", placeholder: "z. B. Regensburg, Düsseldorf, Bayern", required: true },
      { name: "concern", label: "Anliegen", type: "textarea", placeholder: "Kurz sagen, worum es geht", required: true },
      { name: "phone", label: "Telefon oder WhatsApp", type: "tel", placeholder: "+49 ...", required: true },
    ],
    whatsappText: (values) =>
      `Hallo FLOXANT, ich möchte eine Express-Anfrage senden. Ort: ${valueOrBlank(values.location)}. Anliegen: ${valueOrBlank(values.concern)}. Bitte melden Sie sich bei mir.`,
  },
  "offer-check": {
    intent: "offer-check",
    label: "Angebot prüfen",
    title: "Fremdes Angebot prüfen lassen.",
    subtitle: "Wir prüfen, ob Preis, Umfang und Leistungen realistisch beschrieben sind, bevor Sie zusagen.",
    regionScope: "Für vorhandene Angebote anderer Firmen. Düsseldorf wird je nach Leistung über klare lokale Kontaktmöglichkeiten geprüft.",
    primaryCta: "Zur Angebotsprüfung",
    serviceType: "angebot_pruefen",
    defaultRegion: "regensburg-bayern",
    routeFallback: OFFER_CHECK_ROUTE,
    icon: FileSearch,
    fields: [],
    whatsappText: () =>
      "Hallo FLOXANT, ich möchte ein vorhandenes Angebot prüfen lassen. Ich sende Ihnen die Angaben bzw. das Angebot.",
  },
};

export const headerInquiryIntents: InquiryIntent[] = ["move", "cleaning", "clearance", "express"];
