export type SearchAuthorityLocale = "de-DE" | "en";

export type SearchAuthorityMetadata = {
  seoTitle: string;
  shortTitle: string;
  headline: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  primaryQuery: string;
  secondaryQueries: readonly string[];
  searchIntent: string;
  locale: SearchAuthorityLocale;
};

export const searchAuthorityPages = {
  "/": {
    seoTitle: "FLOXANT Düsseldorf & Regensburg | Reinigung, Umzug & Entrümpelung",
    shortTitle: "FLOXANT",
    headline: "Reinigung & Entrümpelung in Düsseldorf. Umzug & Reinigung in Regensburg.",
    description:
      "Reinigung und Entrümpelung in Düsseldorf. Umzug, Reinigung und Entrümpelung in Regensburg. Jeweils 75 km Umgebung. Persönliches Angebot anfragen.",
    ogTitle: "FLOXANT Dienstleistungen in Düsseldorf und Regensburg",
    ogDescription:
      "Reinigung und Entrümpelung in Düsseldorf. Umzug, Reinigung und Entrümpelung in Regensburg. Jeweils 75 km Umgebung.",
    primaryQuery: "FLOXANT Dienstleistungen",
    secondaryQueries: ["Reinigung Düsseldorf", "Entrümpelung Düsseldorf", "Umzug Regensburg", "Reinigung Regensburg", "Entrümpelung Regensburg"],
    searchIntent: "Marke, Standortwahl und Dienstleistungsanfrage",
    locale: "de-DE",
  },
  "/duesseldorf/reinigung": {
    seoTitle: "Reinigung Düsseldorf für Wohnung & Büro | FLOXANT",
    shortTitle: "Reinigung Düsseldorf",
    headline: "Reinigung in Düsseldorf, die Ihnen Arbeit abnimmt.",
    description:
      "FLOXANT reinigt Wohnungen, Büros, Praxen und Fenster in Düsseldorf und 75 km Umgebung. Umfang persönlich abstimmen und Reinigungsangebot anfragen.",
    ogTitle: "Reinigung Düsseldorf für Wohnung & Büro | FLOXANT",
    ogDescription:
      "FLOXANT reinigt Wohnungen, Büros, Praxen und Fenster in Düsseldorf und 75 km Umgebung. Umfang persönlich abstimmen und Reinigungsangebot anfragen.",
    primaryQuery: "reinigung düsseldorf",
    secondaryQueries: [
      "reinigungsdienst düsseldorf",
      "reinigungsunternehmen düsseldorf",
      "reinigungsfirma düsseldorf",
      "putzfirma düsseldorf",
      "putzservice düsseldorf",
    ],
    searchIntent: "Übergeordneter Reinigungs-Hub und passende Leistung wählen",
    locale: "de-DE",
  },
  "/duesseldorf/bueroreinigung": {
    seoTitle: "Büroreinigung Düsseldorf – passend zum Büroalltag | FLOXANT",
    shortTitle: "Büroreinigung Düsseldorf",
    headline: "Büroreinigung in Düsseldorf, passend zu Ihrem Arbeitsalltag.",
    description:
      "Gepflegte Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche. FLOXANT stimmt Reinigungsumfang, Rhythmus und Zeiten mit Ihrem Büro ab.",
    ogTitle: "Büroreinigung Düsseldorf – passend zum Büroalltag | FLOXANT",
    ogDescription:
      "Gepflegte Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche. FLOXANT stimmt Reinigungsumfang, Rhythmus und Zeiten mit Ihrem Büro ab.",
    primaryQuery: "büroreinigung düsseldorf",
    secondaryQueries: ["büroreinigung duesseldorf", "büro putzen düsseldorf", "putzfirma büro düsseldorf"],
    searchIntent: "B2B-Büroreinigung anfragen oder Angebot prüfen",
    locale: "de-DE",
  },
  "/duesseldorf/gewerbereinigung": {
    seoTitle: "Gewerbereinigung Düsseldorf für Ihren Betrieb | FLOXANT",
    shortTitle: "Gewerbereinigung Düsseldorf",
    headline: "Gewerbereinigung in Düsseldorf, passend zu Ihrem Betrieb.",
    description:
      "Reinigung für Ladenflächen, Studios und gewerbliche Räume in Düsseldorf. Aufgaben und Zeiten auf Nutzung, Kundenverkehr und Bodenbeläge abstimmen.",
    ogTitle: "Gewerbereinigung Düsseldorf für Ihren Betrieb | FLOXANT",
    ogDescription:
      "Reinigung für Ladenflächen, Studios und gewerbliche Räume in Düsseldorf. Aufgaben und Zeiten auf Nutzung, Kundenverkehr und Bodenbeläge abstimmen.",
    primaryQuery: "gewerbereinigung düsseldorf",
    secondaryQueries: ["commercial cleaning düsseldorf", "reinigung gewerbefläche düsseldorf"],
    searchIntent: "Gewerbliche Objekt-Reinigung anfragen",
    locale: "de-DE",
  },
  "/duesseldorf/praxisreinigung": {
    seoTitle: "Praxisreinigung Düsseldorf – nach Ihrem Ablauf | FLOXANT",
    shortTitle: "Praxisreinigung Düsseldorf",
    headline: "Praxisreinigung in Düsseldorf mit klaren Abläufen.",
    description:
      "FLOXANT reinigt Empfang, Warte-, Behandlungs- und Nebenräume nach vereinbartem Umfang. Turnus, Zeitfenster und Ihre Praxisvorgaben persönlich abstimmen.",
    ogTitle: "Praxisreinigung Düsseldorf – nach Ihrem Ablauf | FLOXANT",
    ogDescription:
      "FLOXANT reinigt Empfang, Warte-, Behandlungs- und Nebenräume nach vereinbartem Umfang. Turnus, Zeitfenster und Ihre Praxisvorgaben persönlich abstimmen.",
    primaryQuery: "praxisreinigung düsseldorf",
    secondaryQueries: ["professionelle praxisreinigung düsseldorf", "arztpraxis reinigung düsseldorf"],
    searchIntent: "Praxisreinigung ohne unbelegte Hygieneversprechen anfragen",
    locale: "de-DE",
  },
  "/duesseldorf/fensterreinigung": {
    seoTitle: "Fensterreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
    shortTitle: "Fensterreinigung Düsseldorf",
    headline: "Fensterreinigung in Düsseldorf für einen klaren Ausblick.",
    description:
      "Fenster und Glasflächen in Wohnung, Büro oder Laden reinigen lassen. Innen- und Außenseiten, Rahmen und Falze nach Wunsch vereinbaren.",
    ogTitle: "Fensterreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
    ogDescription:
      "Fenster und Glasflächen in Wohnung, Büro oder Laden reinigen lassen. Innen- und Außenseiten, Rahmen und Falze nach Wunsch vereinbaren.",
    primaryQuery: "fensterreinigung düsseldorf",
    secondaryQueries: ["fensterreiniger düsseldorf", "glasreinigung düsseldorf", "fenster putzen düsseldorf"],
    searchIntent: "Fenster- und Glasreinigung anfragen",
    locale: "de-DE",
  },
  "/reinigungsfirma-angebot": {
    seoTitle: "Reinigungsfirma-Angebot: 7 Angaben vor der Anfrage",
    shortTitle: "Reinigungsangebot anfragen",
    headline: "7 Angaben für ein nachvollziehbares Reinigungsangebot",
    description:
      "Reinigungsangebot mit 7 konkreten Angaben vorbereiten: Ort, Objekt, Fläche, Leistung, Turnus, Zugang und Termin. Fotos können die Prüfung ergänzen.",
    ogTitle: "7 Angaben für ein klares Reinigungsangebot",
    ogDescription:
      "Welche Informationen eine Reinigungsfirma vor einem belastbaren Angebot wirklich benötigt.",
    primaryQuery: "angebot reinigungsfirma",
    secondaryQueries: ["reinigungsfirma angebot", "angebot reinigung", "angebot für reinigungsarbeiten"],
    searchIntent: "Neues Reinigungsangebot mit vollständigen Eckdaten anfragen",
    locale: "de-DE",
  },
  "/angebot-vergleichen-duesseldorf": {
    seoTitle: "Reinigungsangebote Düsseldorf: 10 Punkte vergleichen",
    shortTitle: "Angebote Düsseldorf prüfen",
    headline: "10 Punkte für einen klaren Angebotsvergleich in Düsseldorf",
    description:
      "Zwei Reinigungsangebote in Düsseldorf anhand von 10 Punkten vergleichen: Umfang, Fläche, Turnus, Zeiten, Zugang, Material und Zusatzkosten prüfen.",
    ogTitle: "10 Punkte zum Vergleich von Reinigungsangeboten in Düsseldorf",
    ogDescription:
      "Leistungsumfang, Turnus, Zeitfenster und mögliche Zusatzpositionen vor der Zusage nachvollziehen.",
    primaryQuery: "reinigungsangebot prüfen düsseldorf",
    secondaryQueries: ["reinigungsangebot vergleichen", "angebot reinigungsfirma prüfen", "putzfirma angebot düsseldorf"],
    searchIntent: "Vorhandene Reinigungsangebote vergleichen und offene Punkte erkennen",
    locale: "de-DE",
  },
  "/angebotscheck": {
    seoTitle: "Angebotscheck: 12 Punkte zum Leistungsumfang | FLOXANT",
    shortTitle: "FLOXANT Klarheitscheck",
    headline: "Zwölf Punkte eines Angebots einzeln klären",
    description:
      "Vorhandenes Angebot für Reinigung, Umzug oder Räumung clientseitig prüfen: 12 Bereiche markieren, Rückfragen erstellen und Ergebnis übernehmen.",
    ogTitle: "FLOXANT Klarheitscheck für vorhandene Angebote",
    ogDescription:
      "Zwölf Bereiche zu Umfang, Ablauf und Preisstruktur ohne Upload und ohne Rechtsbewertung prüfen.",
    primaryQuery: "angebotscheck dienstleistung",
    secondaryQueries: ["reinigungsangebot prüfen", "umzugsangebot prüfen", "angebot leistungsumfang prüfen"],
    searchIntent: "Vorhandenes Dienstleistungsangebot auf offene Angaben prüfen",
    locale: "de-DE",
  },
  "/objektbrief": {
    seoTitle: "Anfragebrief für Reinigung, Umzug oder Räumung | FLOXANT",
    shortTitle: "FLOXANT Anfragebrief",
    headline: "Leistung, Ort und Umfang für eine klare Anfrage vorbereiten",
    description:
      "Erstellen Sie direkt im Browser einen Anfragebrief mit Leistung, Ort, Umfang, Zugang und Termin für Reinigung in Düsseldorf oder Reinigung, Umzug und Räumung in Regensburg – ohne Preisberechnung.",
    ogTitle: "FLOXANT Anfragebrief für klare Leistungsanfragen",
    ogDescription:
      "Leistung, Ort, Umfang, Zugang und Termin geordnet vorbereiten und offene Angaben erkennen.",
    primaryQuery: "dienstleistungsanfrage vorbereiten",
    secondaryQueries: ["reinigungsanfrage erstellen", "umzugsanfrage vorbereiten", "räumungsanfrage schreiben"],
    searchIntent: "Leistungsanfrage mit den nötigen Angaben vorbereiten",
    locale: "de-DE",
  },
  "/leistungsfinder": {
    seoTitle: "Leistungsfinder: Reinigung, Umzug oder Räumung | FLOXANT",
    shortTitle: "FLOXANT Leistungsfinder",
    headline: "Die passende FLOXANT-Leistung nach Region und Aufgabe finden",
    description:
      "Ordnen Sie Ihr Anliegen clientseitig ein: Reinigung in Düsseldorf oder Reinigung, Umzug und Räumung in Regensburg – mit passenden Angaben und nächstem Schritt.",
    ogTitle: "FLOXANT Leistungsfinder für Düsseldorf und Regensburg",
    ogDescription:
      "Region, Aufgabenart und Auftragssituation auswählen und zur passenden vorhandenen Leistungsseite gelangen.",
    primaryQuery: "FLOXANT Leistungsfinder",
    secondaryQueries: ["welche Reinigungsleistung", "Umzug oder Räumung Regensburg", "Reinigungsservice Düsseldorf finden"],
    searchIntent: "Passende vorhandene FLOXANT-Leistung bestimmen",
    locale: "de-DE",
  },
  "/en": {
    seoTitle: "FLOXANT Services in English | Düsseldorf & Regensburg",
    shortTitle: "Services in English",
    headline: "Cleaning in Düsseldorf and moving services in Regensburg",
    description:
      "FLOXANT services in English: cleaning in Düsseldorf and cleaning, moving or clearance in Regensburg. Send scope, timing, access and photos.",
    ogTitle: "FLOXANT services in English",
    ogDescription: "English service information for customers in Düsseldorf and Regensburg, Germany.",
    primaryQuery: "FLOXANT English services",
    secondaryQueries: ["cleaning service Düsseldorf", "moving service Regensburg", "house clearance Regensburg"],
    searchIntent: "English service and location selection",
    locale: "en",
  },
  "/en/duesseldorf/cleaning": {
    seoTitle: "Cleaning Service Düsseldorf | English Request | FLOXANT",
    shortTitle: "Cleaning Düsseldorf",
    headline: "Cleaning service in Düsseldorf for homes, offices and practices",
    description:
      "Cleaning service in Düsseldorf for apartments, offices, practices and commercial spaces. Send property type, size, timing, access and photos in English.",
    ogTitle: "Cleaning service in Düsseldorf",
    ogDescription: "English cleaning requests for homes, offices, practices and commercial properties in Düsseldorf.",
    primaryQuery: "cleaning service düsseldorf",
    secondaryQueries: ["cleaning company düsseldorf", "cleaner dusseldorf", "cleaning services dusseldorf"],
    searchIntent: "English cleaning service overview for Düsseldorf",
    locale: "en",
  },
  "/en/duesseldorf/office-cleaning": {
    seoTitle: "Office Cleaning Düsseldorf | Schedule & Quote | FLOXANT",
    shortTitle: "Office Cleaning Düsseldorf",
    headline: "Office cleaning in Düsseldorf with a clear schedule and scope",
    description:
      "Office cleaning in Düsseldorf for workspaces, kitchens, sanitary areas and meeting rooms. Send size, frequency, access and preferred cleaning times.",
    ogTitle: "Office cleaning in Düsseldorf",
    ogDescription: "Workspaces, frequency, access and cleaning times clearly defined before a quote.",
    primaryQuery: "office cleaning düsseldorf",
    secondaryQueries: ["office cleaner düsseldorf", "business cleaning düsseldorf"],
    searchIntent: "English office-cleaning request",
    locale: "en",
  },
  "/en/duesseldorf/commercial-cleaning": {
    seoTitle: "Commercial Cleaning Düsseldorf | Scope & Quote | FLOXANT",
    shortTitle: "Commercial Cleaning Düsseldorf",
    headline: "Commercial cleaning in Düsseldorf by property type and use",
    description:
      "Commercial cleaning in Düsseldorf for shops, studios and business properties. Send area, use, time windows, access, frequency and required scope.",
    ogTitle: "Commercial cleaning in Düsseldorf",
    ogDescription: "Property use, service scope, access and cleaning schedule clearly explained in English.",
    primaryQuery: "commercial cleaning düsseldorf",
    secondaryQueries: ["business cleaning düsseldorf", "commercial cleaner düsseldorf"],
    searchIntent: "English commercial-cleaning request",
    locale: "en",
  },
  "/en/duesseldorf/apartment-cleaning": {
    seoTitle: "Apartment Cleaning Düsseldorf | English Request | FLOXANT",
    shortTitle: "Apartment Cleaning Düsseldorf",
    headline: "Apartment cleaning in Düsseldorf for occupied or empty homes",
    description:
      "Apartment cleaning in Düsseldorf for occupied homes, empty flats and handovers. Send rooms, condition, access, timing and photos in English.",
    ogTitle: "Apartment cleaning in Düsseldorf",
    ogDescription: "English apartment-cleaning requests with rooms, condition, timing and access.",
    primaryQuery: "apartment cleaning düsseldorf",
    secondaryQueries: ["flat cleaning düsseldorf", "home cleaner düsseldorf"],
    searchIntent: "English apartment-cleaning request",
    locale: "en",
  },
  "/en/duesseldorf/deep-cleaning": {
    seoTitle: "Deep Cleaning Düsseldorf | Condition & Scope | FLOXANT",
    shortTitle: "Deep Cleaning Düsseldorf",
    headline: "Deep cleaning in Düsseldorf after renovation or heavy use",
    description:
      "Deep cleaning in Düsseldorf after renovation, vacancy or heavy use. Send rooms, surfaces, condition, access, desired result and photos in English.",
    ogTitle: "Deep cleaning in Düsseldorf",
    ogDescription: "Rooms, materials, condition and desired result checked before any quote or promise.",
    primaryQuery: "deep cleaning düsseldorf",
    secondaryQueries: ["intensive cleaning düsseldorf", "deep cleaner düsseldorf"],
    searchIntent: "English deep-cleaning request",
    locale: "en",
  },
  "/en/duesseldorf/move-out-cleaning": {
    seoTitle: "Move-Out Cleaning Düsseldorf | Handover | FLOXANT",
    shortTitle: "Move-Out Cleaning Düsseldorf",
    headline: "Move-out cleaning in Düsseldorf before the apartment handover",
    description:
      "Move-out cleaning in Düsseldorf before key return or handover. Send rooms, kitchen and bathroom condition, remaining items, access, date and photos.",
    ogTitle: "Move-out cleaning Düsseldorf",
    ogDescription: "English handover-cleaning requests with date, rooms, condition, access and photos.",
    primaryQuery: "move-out cleaning düsseldorf",
    secondaryQueries: ["end of tenancy cleaning düsseldorf", "handover cleaning düsseldorf"],
    searchIntent: "English move-out and handover cleaning request",
    locale: "en",
  },
  "/en/duesseldorf/practice-cleaning": {
    seoTitle: "Practice Cleaning Düsseldorf | Scope & Access | FLOXANT",
    shortTitle: "Practice Cleaning Düsseldorf",
    headline: "Practice cleaning in Düsseldorf with clear rooms, scope and access",
    description:
      "Practice cleaning in Düsseldorf for reception, waiting, office, sanitary and agreed ancillary areas. Send a room list, frequency, time window and access details.",
    ogTitle: "Practice cleaning in Düsseldorf",
    ogDescription: "Room list, service scope, time windows and access explained in English without medical hygiene promises.",
    primaryQuery: "practice cleaning düsseldorf",
    secondaryQueries: ["medical office cleaning düsseldorf", "practice cleaner düsseldorf"],
    searchIntent: "English practice-cleaning request",
    locale: "en",
  },
  "/en/duesseldorf/window-cleaning": {
    seoTitle: "Window Cleaning Düsseldorf | Glass & Access | FLOXANT",
    shortTitle: "Window Cleaning Düsseldorf",
    headline: "Window cleaning in Düsseldorf with glass area and access details",
    description:
      "Window cleaning in Düsseldorf for homes, offices and shops. Send window count, glass area, inside or outside, frames, floor, access and timing.",
    ogTitle: "Window cleaning in Düsseldorf",
    ogDescription: "Window count, glass area, frames, access and timing clearly described in English.",
    primaryQuery: "window cleaning düsseldorf",
    secondaryQueries: ["window cleaner düsseldorf", "glass cleaning düsseldorf"],
    searchIntent: "English window-cleaning request",
    locale: "en",
  },
  "/en/duesseldorf/cleaning-quote-review": {
    seoTitle: "Cleaning Quote Review Düsseldorf | Scope Check | FLOXANT",
    shortTitle: "Cleaning Quote Review",
    headline: "Review a Düsseldorf cleaning quote before you decide",
    description:
      "Review a cleaning quote for Düsseldorf: scope, area, frequency, access, time windows, materials, extras and missing assumptions checked in English.",
    ogTitle: "Cleaning quote review for Düsseldorf",
    ogDescription: "Understand scope, assumptions and possible extras before accepting a cleaning quote.",
    primaryQuery: "cleaning quote review düsseldorf",
    secondaryQueries: ["cleaning quote düsseldorf", "compare cleaning offers düsseldorf"],
    searchIntent: "English review of an existing cleaning quote",
    locale: "en",
  },
  "/en/quote-check": {
    seoTitle: "Quote Scope Check: 12 Details to Clarify | FLOXANT",
    shortTitle: "FLOXANT Scope Check",
    headline: "Clarify twelve scope details before accepting a service quote",
    description:
      "Use the client-side FLOXANT Scope Check for a cleaning, moving or clearance quote in Germany. Mark open details and create clear follow-up questions.",
    ogTitle: "FLOXANT Scope Check for service quotes",
    ogDescription: "Check twelve scope areas without uploading or transmitting quote data.",
    primaryQuery: "service quote scope check",
    secondaryQueries: ["cleaning quote review", "moving quote review", "quote checklist Germany"],
    searchIntent: "English review of scope details in an existing service quote",
    locale: "en",
  },
  "/en/create-request": {
    seoTitle: "Create a Cleaning or Moving Request Brief | FLOXANT",
    shortTitle: "Create a Request",
    headline: "Prepare a clear service request before contacting FLOXANT",
    description:
      "Create a structured request brief in English for cleaning in Düsseldorf or cleaning, moving and clearance in Regensburg. No price or appointment is calculated.",
    ogTitle: "Create a structured FLOXANT request brief",
    ogDescription:
      "Organise the service, location, scope, access and timing before you send an English request.",
    primaryQuery: "create service request Germany",
    secondaryQueries: ["cleaning request Düsseldorf", "moving request Regensburg", "service request brief"],
    searchIntent: "English preparation of a structured local service request",
    locale: "en",
  },
  "/en/service-finder": {
    seoTitle: "Service Finder for Düsseldorf & Regensburg | FLOXANT",
    shortTitle: "Service Finder",
    headline: "Find the relevant FLOXANT service for your region and task",
    description:
      "Use the client-side service finder for cleaning in Düsseldorf or cleaning, moving and clearance in Regensburg, Germany, with clear next steps in English.",
    ogTitle: "FLOXANT Service Finder in English",
    ogDescription:
      "Match the region, type of work and request situation to an existing FLOXANT service page.",
    primaryQuery: "FLOXANT service finder English",
    secondaryQueries: ["cleaning service Düsseldorf", "moving service Regensburg", "house clearance Regensburg"],
    searchIntent: "English selection of an existing local FLOXANT service",
    locale: "en",
  },
} as const satisfies Record<string, SearchAuthorityMetadata>;

export type SearchAuthorityPath = keyof typeof searchAuthorityPages;

export function getSearchAuthorityMetadata(path: string): SearchAuthorityMetadata | undefined {
  return searchAuthorityPages[path as SearchAuthorityPath];
}
