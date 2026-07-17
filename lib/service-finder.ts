export type ServiceFinderLocale = "de" | "en";
export type ServiceFinderRegion = "duesseldorf" | "regensburg" | "outside";
export type ServiceFinderJob = "cleaning" | "moving" | "clearance";
export type ServiceFinderContext = "private" | "business";
export type ServiceFinderCadence = "once" | "recurring";
export type ServiceFinderOffer = "yes" | "no";

export type ServiceFinderInput = {
  region: ServiceFinderRegion;
  job: ServiceFinderJob;
  context: ServiceFinderContext;
  cadence: ServiceFinderCadence;
  offer: ServiceFinderOffer;
};

type LocalisedLink = {
  labelDe: string;
  labelEn: string;
  hrefDe: string;
  hrefEn: string;
};

export type ServiceFinderResult = {
  supported: boolean;
  title: string;
  explanation: string;
  canonical?: { label: string; href: string };
  related: readonly { label: string; href: string }[];
  requiredDetails: readonly string[];
  primaryCta: { label: string; href: string };
};

const links = {
  duesseldorfCleaning: { labelDe: "Reinigung Düsseldorf", labelEn: "Cleaning service Düsseldorf", hrefDe: "/duesseldorf/reinigung", hrefEn: "/en/duesseldorf/cleaning" },
  duesseldorfOffice: { labelDe: "Büroreinigung Düsseldorf", labelEn: "Office cleaning Düsseldorf", hrefDe: "/duesseldorf/bueroreinigung", hrefEn: "/en/duesseldorf/office-cleaning" },
  duesseldorfPractice: { labelDe: "Praxisreinigung Düsseldorf", labelEn: "Practice cleaning Düsseldorf", hrefDe: "/duesseldorf/praxisreinigung", hrefEn: "/en/duesseldorf/cleaning" },
  duesseldorfWindows: { labelDe: "Fensterreinigung Düsseldorf", labelEn: "Window cleaning Düsseldorf", hrefDe: "/duesseldorf/fensterreinigung", hrefEn: "/en/duesseldorf/window-cleaning" },
  duesseldorfDeep: { labelDe: "Grundreinigung Düsseldorf", labelEn: "Deep cleaning Düsseldorf", hrefDe: "/duesseldorf/grundreinigung", hrefEn: "/en/duesseldorf/deep-cleaning" },
  duesseldorfMaintenance: { labelDe: "Unterhaltsreinigung Düsseldorf", labelEn: "Recurring cleaning Düsseldorf", hrefDe: "/duesseldorf/unterhaltsreinigung", hrefEn: "/en/duesseldorf/cleaning" },
  duesseldorfHome: { labelDe: "Wohnungsreinigung Düsseldorf", labelEn: "Apartment cleaning Düsseldorf", hrefDe: "/duesseldorf/wohnungsreinigung", hrefEn: "/en/duesseldorf/apartment-cleaning" },
  regensburgCleaning: { labelDe: "Reinigung Regensburg", labelEn: "Cleaning service Regensburg", hrefDe: "/regensburg/reinigung", hrefEn: "/en/regensburg/cleaning" },
  regensburgOffice: { labelDe: "Büroreinigung Regensburg", labelEn: "Office cleaning Regensburg", hrefDe: "/regensburg/bueroreinigung", hrefEn: "/en/regensburg/office-cleaning" },
  regensburgMoveOut: { labelDe: "Endreinigung Regensburg", labelEn: "Move-out cleaning Regensburg", hrefDe: "/regensburg/endreinigung", hrefEn: "/en/regensburg/move-out-cleaning" },
  regensburgMoving: { labelDe: "Umzug Regensburg", labelEn: "Moving service Regensburg", hrefDe: "/regensburg/umzug", hrefEn: "/en/regensburg/moving" },
  regensburgSeniorMove: { labelDe: "Seniorenumzug Regensburg", labelEn: "Moving company Regensburg", hrefDe: "/regensburg/seniorenumzug", hrefEn: "/en/regensburg/moving-company" },
  regensburgMovingCleaning: { labelDe: "Umzug mit Reinigung", labelEn: "Cleaning after moving", hrefDe: "/regensburg/umzug-reinigung", hrefEn: "/en/regensburg/cleaning-after-moving" },
  regensburgClearance: { labelDe: "Entrümpelung Regensburg", labelEn: "House clearance Regensburg", hrefDe: "/regensburg/entruempelung", hrefEn: "/en/regensburg/house-clearance" },
  regensburgHouseClearance: { labelDe: "Wohnungsauflösung Regensburg", labelEn: "Apartment clearance Regensburg", hrefDe: "/regensburg/wohnungsaufloesung", hrefEn: "/en/regensburg/apartment-clearance" },
} as const satisfies Record<string, LocalisedLink>;

function localiseLink(link: LocalisedLink, locale: ServiceFinderLocale) {
  return locale === "de" ? { label: link.labelDe, href: link.hrefDe } : { label: link.labelEn, href: link.hrefEn };
}

function cleaningSelection(input: ServiceFinderInput) {
  if (input.region === "regensburg") {
    return input.context === "business"
      ? { main: links.regensburgOffice, related: [links.regensburgCleaning, links.regensburgMoveOut] }
      : { main: links.regensburgCleaning, related: [links.regensburgMoveOut] };
  }
  if (input.context === "business" && input.cadence === "recurring") {
    return { main: links.duesseldorfMaintenance, related: [links.duesseldorfOffice, links.duesseldorfPractice] };
  }
  if (input.context === "business") {
    return { main: links.duesseldorfCleaning, related: [links.duesseldorfDeep, links.duesseldorfWindows] };
  }
  if (input.cadence === "recurring") {
    return { main: links.duesseldorfCleaning, related: [links.duesseldorfMaintenance, links.duesseldorfWindows] };
  }
  return { main: links.duesseldorfDeep, related: [links.duesseldorfHome, links.duesseldorfWindows] };
}

function requiredDetails(job: ServiceFinderJob, locale: ServiceFinderLocale) {
  const details = {
    cleaning: {
      de: ["Ort oder PLZ", "Objektart und ungefähre Fläche", "gewünschte Bereiche und Arbeiten", "Turnus oder Termin", "Zugang und aktueller Zustand"],
      en: ["City or postcode", "Property type and approximate area", "Required areas and tasks", "Frequency or preferred date", "Access and current condition"],
    },
    moving: {
      de: ["Start- und Zielort", "Etagen und Aufzüge", "Wohnfläche und Räume", "Möbelumfang", "Termin und Zugang"],
      en: ["Origin and destination", "Floors and lifts", "Home size and rooms", "Furniture scope", "Date and access"],
    },
    clearance: {
      de: ["Ort oder PLZ", "Objekt und betroffene Bereiche", "Inventar oder Mengen", "Zugang", "gewünschter Endzustand und Termin"],
      en: ["City or postcode", "Property and affected areas", "Inventory or quantity", "Access", "Desired final condition and date"],
    },
  } as const;
  return details[job][locale];
}

export function resolveServiceFinder(input: ServiceFinderInput, locale: ServiceFinderLocale): ServiceFinderResult {
  const isGerman = locale === "de";
  const primaryCta = input.offer === "yes"
    ? { label: isGerman ? "Angebotsumfang prüfen" : "Check the quote scope", href: isGerman ? "/angebotscheck" : "/en/quote-check" }
    : { label: isGerman ? "Anfragebrief erstellen" : "Create a request brief", href: isGerman ? "/objektbrief" : "/en/create-request" };

  if (input.region === "outside") {
    return {
      supported: false,
      title: isGerman ? "Diese Region ist im Leistungsfinder nicht bestätigt" : "This region is not confirmed in the service finder",
      explanation: isGerman
        ? "FLOXANT nennt hier keine Leistung als verfügbar. Sie können die Region neutral anfragen; daraus entsteht noch keine Zusage."
        : "FLOXANT does not present a service as available here. You can ask for a neutral region check, but this is not a confirmation.",
      related: [],
      requiredDetails: requiredDetails(input.job, locale),
      primaryCta: { label: isGerman ? "Region neutral anfragen" : "Ask about the region", href: isGerman ? "/kontakt?intent=region-check" : "/en/contact" },
    };
  }

  if (input.region === "duesseldorf" && input.job !== "cleaning") {
    return {
      supported: false,
      title: isGerman ? "Keine passende Düsseldorfer Leistung hinterlegt" : "No matching Düsseldorf service is listed",
      explanation: isGerman
        ? "Umzug und Räumung sind in diesem Finder für Regensburg hinterlegt. Für Düsseldorf wird deshalb keine künstliche Empfehlung erzeugt."
        : "Moving and clearance are listed for Regensburg in this finder. It does not invent a Düsseldorf recommendation.",
      related: [],
      requiredDetails: requiredDetails(input.job, locale),
      primaryCta: { label: isGerman ? "Anliegen neutral schildern" : "Describe the request", href: isGerman ? "/kontakt?intent=service-check" : "/en/contact" },
    };
  }

  const selection = input.job === "cleaning"
    ? cleaningSelection(input)
    : input.job === "moving"
      ? { main: links.regensburgMoving, related: [links.regensburgSeniorMove, links.regensburgMovingCleaning] }
      : { main: links.regensburgClearance, related: [links.regensburgHouseClearance, links.regensburgCleaning] };
  const canonical = localiseLink(selection.main, locale);

  return {
    supported: true,
    title: isGerman ? `Passende Hauptleistung: ${canonical.label}` : `Relevant main service: ${canonical.label}`,
    explanation: isGerman
      ? "Die Einordnung basiert nur auf Ihren Antworten und den tatsächlich hinterlegten FLOXANT-Leistungen. Details werden erst nach einer konkreten Anfrage geprüft."
      : "This match uses only your answers and the FLOXANT services listed for the region. Details are reviewed only after a specific request.",
    canonical,
    related: selection.related.map((link) => localiseLink(link, locale)),
    requiredDetails: requiredDetails(input.job, locale),
    primaryCta,
  };
}
