import de from "./dictionaries/de.json";

function hardenPriceLanguage(value: unknown): unknown {
 if (typeof value === "string") {
  return value
   .replace(/Festpreis-Garantie/g, "Preisrahmen nach Vorprüfung")
   .replace(/Festpreisgarantie/g, "Preisrahmen nach Vorprüfung")
   .replace(/Festpreise ohne Überraschungen/g, "Nachvollziehbarer Preisrahmen")
   .replace(/Festpreisangebot/g, "Angebot nach Prüfung")
   .replace(/zum Festpreis/g, "mit Preisrahmen")
   .replace(/Festpreise/g, "Preisrahmen")
   .replace(/Festpreis/g, "Preisrahmen")
   .replace(/100% Preissicherheit/g, "klare Kosteneinordnung")
   .replace(/100% Abnahmegarantie/g, "klare Übergabevorbereitung")
   .replace(/Abnahmegarantie 100%/g, "Übergabevorbereitung")
   .replace(/zu 100% unverbindlich/g, "unverbindlich")
   .replace(/100% transparenten/g, "transparenten")
   .replace(/garantierte Abnahme/g, "klare Übergabevorbereitung")
   .replace(
    /Wir garantieren Ihnen jedoch nach einem kurzen persönlichen Austausch immer einen transparenten Preisrahmen ohne versteckte Kosten!?\s*🙌?/g,
    "Nach einem persönlichen Austausch erhalten Sie eine transparente Einordnung ohne versteckte Kosten."
   )
   .replace(/verbindliche Preisrahmen/g, "konkrete Angebote");
 }

 if (Array.isArray(value)) {
  return value.map(hardenPriceLanguage);
 }

 if (value && typeof value === "object") {
  return Object.fromEntries(
   Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
    key,
    hardenPriceLanguage(nestedValue),
   ])
  );
 }

 return value;
}

const germanDictionary = hardenPriceLanguage(de) as typeof de;

// Root Architecture Hardening: Ignore locale and always return German.
// This preserves compatibility while effectively disabling i18n.
const dictionaries = {
 de: () => Promise.resolve(germanDictionary),
 en: () => Promise.resolve(germanDictionary),
 ru: () => Promise.resolve(germanDictionary),
};

export const getDictionary = async (locale: any) => dictionaries.de();
