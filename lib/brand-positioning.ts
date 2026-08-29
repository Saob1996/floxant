export type BrandLocale = "de" | "en";
export type BrandRegion = "duesseldorf" | "regensburg";
export type BrandCtaIntent =
  | "start-request"
  | "check-quote"
  | "request-callback"
  | "send-details"
  | "send-photos"
  | "clarify-scope"
  | "create-request"
  | "start-scope-check";

export const brandPositioning = {
  primaryMessage: {
    de: "FLOXANT hilft, Reinigungs-, Umzugs- und Räumungsaufträge mit einem klaren Leistungsumfang anzufragen.",
    en: "FLOXANT helps customers describe cleaning, moving and clearance work in Germany with a clear scope.",
  },
  shortMessage: {
    de: "Leistung klären. Angaben ergänzen. Nächsten Schritt wählen.",
    en: "Clarify the service, complete the details and choose the next step.",
  },
  regions: {
    duesseldorf: {
      short: "Reinigung in Düsseldorf klar beschreiben und anfragen.",
      long:
        "In Düsseldorf liegt der Schwerpunkt auf Reinigung für Wohnung, Büro, Praxis und gewerblich genutzte Objekte. Objektart, Fläche, Bereiche, Turnus, Zugang und Termin werden vor einem Angebot geordnet.",
      primaryServices: [
        "Reinigung",
        "Büroreinigung",
        "Praxisreinigung",
        "Gewerbereinigung",
        "Fenster- und Glasreinigung",
        "Grundreinigung",
        "Unterhaltsreinigung",
        "Bau- und Endreinigung",
        "Treppenhausreinigung",
      ],
    },
    regensburg: {
      short: "Umzug, Räumung und Reinigung in Regensburg strukturiert anfragen.",
      long:
        "In Regensburg unterstützt FLOXANT bei Umzug, Entrümpelung, Räumung, Wohnungsauflösung, Reinigung und Übergabevorbereitung. Umfang, Zugang, Termin, Start und Ziel beziehungsweise gewünschter Endzustand werden gemeinsam geklärt.",
      primaryServices: [
        "Umzug",
        "Entrümpelung",
        "Räumung",
        "Wohnungsauflösung",
        "Reinigung",
        "Übergabevorbereitung",
      ],
    },
  },
  quoteReview: {
    de: {
      short: "Vorhandene Angebote auf offene Leistungsangaben prüfen.",
      long:
        "Der FLOXANT Klarheitscheck ordnet, welche Angaben vorhanden, unklar, fehlend oder für den konkreten Auftrag nicht relevant sind. Er ist keine Rechtsberatung, keine Anbieterbewertung und keine Vollständigkeitsgarantie.",
    },
    en: {
      short: "Check an existing quote for missing or unclear scope details.",
      long:
        "The FLOXANT Scope Check shows which details are present, unclear, missing or not relevant to the job. It is not legal advice, a provider rating or a guarantee of completeness.",
    },
  },
  englishUsers: {
    short: "English guidance for services carried out in Düsseldorf and Regensburg, Germany.",
    long:
      "FLOXANT helps English-speaking customers describe the required scope in Germany and prepare a clear request. The actual service area remains limited to the stated Düsseldorf and Regensburg service regions.",
  },
  allowedBenefits: [
    "Strukturierte Erfassung von Leistungsumfang, Ort, Termin und Zugang",
    "Hinweise auf fehlende oder unklare Angaben",
    "Kopierbare Anfrage- und Rückfragentexte",
    "Clientseitige Vorbereitung ohne Datenübertragung",
    "Sachliche Prüfung vorhandener Angebote ohne Rechtsbewertung",
    "Deutsche und englische Nutzerführung für reale Servicegebiete",
  ],
  prohibitedClaims: [
    "Marktführer",
    "Nummer 1",
    "bester Anbieter",
    "garantiert vollständig",
    "garantierter Termin",
    "sofort verfügbar",
    "24/7 verfügbar",
    "bundesweiter Service",
    "muttersprachliches Team",
    "feste Reaktionszeit",
  ],
  descriptions: {
    de: {
      short: "Dienstleistungsumfang verständlich vorbereiten.",
      long:
        "FLOXANT verbindet lokale Dienstleistungen mit Werkzeugen, die benötigte Angaben, offene Punkte und den nächsten sinnvollen Schritt sichtbar machen.",
    },
    en: {
      short: "Prepare a clear service scope in English.",
      long:
        "FLOXANT combines local services in Germany with tools that make required details, open questions and the next useful step easier to understand.",
    },
  },
} as const;

export const brandCtas: Record<BrandLocale, Record<BrandCtaIntent, string>> = {
  de: {
    "start-request": "Anfrage starten",
    "check-quote": "Angebot prüfen",
    "request-callback": "Rückruf anfragen",
    "send-details": "Details senden",
    "send-photos": "Fotos senden",
    "clarify-scope": "Leistungsumfang klären",
    "create-request": "Anfragebrief erstellen",
    "start-scope-check": "Klarheitscheck starten",
  },
  en: {
    "start-request": "Start a request",
    "check-quote": "Check a quote",
    "request-callback": "Request a callback",
    "send-details": "Send details",
    "send-photos": "Send photos",
    "clarify-scope": "Clarify the scope",
    "create-request": "Create a request brief",
    "start-scope-check": "Start the Scope Check",
  },
};

export function getBrandCta(locale: BrandLocale, intent: BrandCtaIntent) {
  return brandCtas[locale][intent];
}
