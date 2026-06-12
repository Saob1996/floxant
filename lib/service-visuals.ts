export type ServiceVisualRegion = "duesseldorf" | "regensburg" | "global";

export type ServiceVisualCategory =
  | "commercial-cleaning"
  | "office-cleaning"
  | "medical-cleaning"
  | "residential-cleaning"
  | "staircase-cleaning"
  | "final-cleaning"
  | "offer-check"
  | "premium-cleaning"
  | "moving"
  | "clearance"
  | "handover"
  | "property";

export type ServiceVisual = {
  id: string;
  region: ServiceVisualRegion;
  category: ServiceVisualCategory;
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  prompt: string;
};

type VisualLookupInput = {
  region: Exclude<ServiceVisualRegion, "global">;
  slug?: string;
  path?: string;
  serviceLabel?: string;
};

const commercialCleaningImage = "/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp";
const offerCheckImage = "/assets/gewerbereinigung/reinigungsanfrage-checkliste-duesseldorf.webp";
const staircaseImage = "/assets/gewerbereinigung/schluessel-treppenhausreinigung-duesseldorf.webp";
const cleaningImage = "/assets/service-cleaning.png";
const movingImage = "/assets/service-moving.png";
const clearanceImage = "/assets/service-clearance.png";
const propertyImage = "/assets/property-operations/property-operations.png";

export const serviceVisuals = {
  "duesseldorf-commercial-cleaning": {
    id: "duesseldorf-commercial-cleaning",
    region: "duesseldorf",
    category: "commercial-cleaning",
    src: commercialCleaningImage,
    alt: "Gepflegter gewerblicher Raum für Reinigung in Düsseldorf",
    title: "Reinigung für Unternehmen in Düsseldorf",
    caption:
      "Sichtbare Flächen, Sanitärbereiche, Küchen, Empfang und Arbeitsbereiche werden nach Objekt, Turnus und Zeitfenster eingeordnet.",
    width: 1200,
    height: 800,
    prompt:
      "Realistische Fotografie eines gepflegten gewerblichen Innenraums in Duesseldorf, Buerobereich, Empfang, neutrale hochwertige Reinigungssituation, keine Personen, keine Logos, hell, professionell.",
  },
  "duesseldorf-office-cleaning": {
    id: "duesseldorf-office-cleaning",
    region: "duesseldorf",
    category: "office-cleaning",
    src: commercialCleaningImage,
    alt: "Ordentlicher Bürobereich für Büroreinigung in Düsseldorf",
    title: "Büroreinigung mit klarer Raumliste",
    caption:
      "Arbeitsplätze, Besprechungsräume, Küche, Sanitär und Randzeiten lassen sich mit Fotos und Eckdaten schnell vorsortieren.",
    width: 1200,
    height: 800,
    prompt:
      "Realistische Fotografie eines modernen Bueros nach der Reinigung, dezente professionelle Atmosphaere, saubere Tische und Boden, keine Menschen, keine Marken.",
  },
  "duesseldorf-medical-cleaning": {
    id: "duesseldorf-medical-cleaning",
    region: "duesseldorf",
    category: "medical-cleaning",
    src: commercialCleaningImage,
    alt: "Ruhiger Praxisbereich für Praxisreinigung in Düsseldorf",
    title: "Praxisnahe Reinigung vorsichtig abstimmen",
    caption:
      "Empfang, Wartebereich und allgemeine Praxisflächen werden nach Nutzung, Zeitfenster und klaren Grenzen geprüft.",
    width: 1200,
    height: 800,
    prompt:
      "Realistische Fotografie eines sauberen Praxis-Empfangsbereichs, diskret, hygienisch wirkend, keine medizinischen Eingriffe, keine Personen, keine Logos.",
  },
  "duesseldorf-residential-cleaning": {
    id: "duesseldorf-residential-cleaning",
    region: "duesseldorf",
    category: "residential-cleaning",
    src: cleaningImage,
    alt: "Gepflegter Wohnbereich für Wohnungsreinigung in Düsseldorf",
    title: "Wohnungsreinigung nach Zustand und Ziel",
    caption:
      "Küche, Bad, Boden, Fensternähe und Übergabepunkte werden anhand von Fotos und Terminwunsch realistisch eingeordnet.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie einer hellen gepflegten Wohnung nach Reinigung, Kueche und Wohnbereich sichtbar, hochwertig aber nicht uebertrieben, keine Personen.",
  },
  "duesseldorf-staircase-cleaning": {
    id: "duesseldorf-staircase-cleaning",
    region: "duesseldorf",
    category: "staircase-cleaning",
    src: staircaseImage,
    alt: "Treppenhaus und Schlüssel für Treppenhausreinigung in Düsseldorf",
    title: "Treppenhaus, Zugang und Hausordnung klären",
    caption:
      "Etagen, Laufwege, Eingangsbereich, Kellerzugang und Schlüsselregelung gehören direkt in die Anfrage.",
    width: 1200,
    height: 800,
    prompt:
      "Realistische Fotografie eines gepflegten Treppenhauses mit dezentem Schluesseldetail, Mehrfamilienhaus, natuerliches Licht, keine Personen.",
  },
  "duesseldorf-final-cleaning": {
    id: "duesseldorf-final-cleaning",
    region: "duesseldorf",
    category: "final-cleaning",
    src: cleaningImage,
    alt: "Leere saubere Wohnung für Endreinigung in Düsseldorf",
    title: "Endreinigung vor Übergabe",
    caption:
      "Auszug, Renovierung, Leerstand oder Übergabe lassen sich besser prüfen, wenn Fläche, Zustand und Fotos vorliegen.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie einer leeren sauberen Wohnung vor Uebergabe, helle Raeume, Boden und Kueche sichtbar, neutral, keine Personen.",
  },
  "duesseldorf-offer-check": {
    id: "duesseldorf-offer-check",
    region: "duesseldorf",
    category: "offer-check",
    src: offerCheckImage,
    alt: "Reinigungsangebot und Eckdaten für Angebotsprüfung in Düsseldorf",
    title: "Angebot oder Eckdaten senden",
    caption:
      "Ein vorhandenes Angebot, eine Raumliste oder Fotos helfen, den Bedarf sachlich und ohne Preisversprechen zu prüfen.",
    width: 1200,
    height: 800,
    prompt:
      "Realistische Fotografie eines Schreibtisches mit Reinigungsangebot, Notizen und Smartphone fuer WhatsApp-Anfrage, professionell, keine lesbaren Daten.",
  },
  "duesseldorf-premium-cleaning": {
    id: "duesseldorf-premium-cleaning",
    region: "duesseldorf",
    category: "premium-cleaning",
    src: commercialCleaningImage,
    alt: "Diskret gepflegter Raum für Premium-Reinigung in Düsseldorf",
    title: "Diskrete Reinigung für anspruchsvolle Objekte",
    caption:
      "Bei hochwertigen oder sensiblen Flächen zählen ruhige Abstimmung, Materialhinweise, Zugang und klare Prioritäten.",
    width: 1200,
    height: 800,
    prompt:
      "Realistische Fotografie eines diskret gepflegten hochwertigen Innenraums, Villa oder privates Office, elegante neutrale Reinigungssituation, keine Personen, keine Logos, kein Luxus-Klischee.",
  },
  "duesseldorf-disposal": {
    id: "duesseldorf-disposal",
    region: "duesseldorf",
    category: "clearance",
    src: clearanceImage,
    alt: "Sortierte Gegenstände für Entsorgung in Düsseldorf",
    title: "Entsorgung sauber von Reinigung trennen",
    caption:
      "Möbel, Kellerinhalte oder kleines Firmeninventar werden nach Menge, Material, Zugang und Fotos geprüft. Eine anschließende Reinigung bleibt ein eigener Schritt.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie sortierter Gegenstaende fuer Entsorgung in Duesseldorf, Keller oder Nebenraum, ordentlich vorbereitet, keine Personen, keine Logos.",
  },
  "duesseldorf-moving": {
    id: "duesseldorf-moving",
    region: "duesseldorf",
    category: "moving",
    src: movingImage,
    alt: "Umzugskartons und Transportvorbereitung für Umzug in Düsseldorf",
    title: "Umzug in Düsseldorf sauber vorbereiten",
    caption:
      "Start, Ziel, Volumen, Etage, Laufwege und Parkmöglichkeit werden vorab mit Fotos oder Besichtigung geprüft.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie eines vorbereiteten Umzugs in Duesseldorf, Kartons, Transportvorbereitung, ordentlich, keine Personen, keine Logos.",
  },
  "duesseldorf-clearance": {
    id: "duesseldorf-clearance",
    region: "duesseldorf",
    category: "clearance",
    src: clearanceImage,
    alt: "Sortierte Räumung für Entrümpelung und Haushaltsauflösung in Düsseldorf",
    title: "Räumung mit Fotos und Zugang klären",
    caption:
      "Menge, Material, Freigabe, Laufwege und mögliche Reinigung danach werden vor einem Termin sauber eingeordnet.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie einer geordneten Wohnungsraeumung in Duesseldorf, Kartons, sortierte Gegenstaende, heller Innenraum, keine Personen, keine Logos.",
  },
  "regensburg-moving": {
    id: "regensburg-moving",
    region: "regensburg",
    category: "moving",
    src: movingImage,
    alt: "Umzugskartons und Transportvorbereitung für Umzug in Regensburg",
    title: "Umzug mit klarer Vorbereitung",
    caption:
      "Start, Ziel, Volumen, Etage, Laufwege und Termin reichen für eine erste realistische Rückmeldung.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie eines vorbereiteten Umzugs in Regensburg, Kartons und Transporter, ordentlich, keine Personen, keine Logos.",
  },
  "regensburg-clearance": {
    id: "regensburg-clearance",
    region: "regensburg",
    category: "clearance",
    src: clearanceImage,
    alt: "Sortierte Räumung für Entrümpelung in Regensburg",
    title: "Räumung, Fotos und Zugang zuerst klären",
    caption:
      "Fotos von Räumen, Menge, Laufwegen und Parkmöglichkeit machen Entrümpelung oder Haushaltsauflösung besser planbar.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie einer geordneten Wohnungsraeumung, Kartons, sortierte Gegenstaende, heller Innenraum, keine Personen, keine Logos.",
  },
  "regensburg-handover": {
    id: "regensburg-handover",
    region: "regensburg",
    category: "handover",
    src: cleaningImage,
    alt: "Saubere leere Wohnung für Übergabe in Regensburg",
    title: "Übergabe und Endreinigung abstimmen",
    caption:
      "Fläche, Zustand, Termin und sichtbare Übergabepunkte zeigen, welche Reinigung sinnvoll ist.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie einer leeren sauberen Wohnung vor Uebergabe, helle Raeume, neutral, keine Personen, keine Logos.",
  },
  "global-property": {
    id: "global-property",
    region: "global",
    category: "property",
    src: propertyImage,
    alt: "Objektbetreuung und abgestimmte Services für Immobilien",
    title: "Objektbetreuung sichtbar machen",
    caption:
      "Wiederkehrende Aufgaben, Übergaben, Kontrollpunkte und Zusatzservices brauchen eine klare visuelle Zuordnung.",
    width: 1200,
    height: 900,
    prompt:
      "Realistische Fotografie eines gepflegten Wohn- oder Gewerbeobjekts mit diskreter Objektbetreuung, keine Personen, keine Logos.",
  },
} as const satisfies Record<string, ServiceVisual>;

function normalize(value?: string) {
  return (value || "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

function matchesAny(value: string, terms: readonly string[]) {
  return terms.some((term) => value.includes(term));
}

export function getServiceVisual(input: VisualLookupInput): ServiceVisual {
  const key = normalize([input.slug, input.path, input.serviceLabel].filter(Boolean).join(" "));

  if (input.region === "regensburg") {
    if (matchesAny(key, ["umzug-reinigung", "umzug"])) return serviceVisuals["regensburg-moving"];
    if (matchesAny(key, ["entruempel", "haushaltsaufloesung", "haushaltsauflosung", "raeumung"])) {
      return serviceVisuals["regensburg-clearance"];
    }
    if (matchesAny(key, ["uebergabe", "endreinigung", "besenrein"])) return serviceVisuals["regensburg-handover"];
    return serviceVisuals["regensburg-handover"];
  }

  if (matchesAny(key, ["angebot", "vielleicht-guenstiger", "guenstiger", "angebot-vergleichen"])) {
    return serviceVisuals["duesseldorf-offer-check"];
  }
  if (matchesAny(key, ["luxus", "premium", "signature", "kanzlei", "showroom"])) {
    return serviceVisuals["duesseldorf-premium-cleaning"];
  }
  if (matchesAny(key, ["praxis", "klinik", "krankenhaus"])) {
    return serviceVisuals["duesseldorf-medical-cleaning"];
  }
  if (matchesAny(key, ["bueroreinigung", "buero", "firma", "firmen", "b2b", "gewerbe", "objekt", "hotel", "laden"])) {
    return serviceVisuals["duesseldorf-commercial-cleaning"];
  }
  if (matchesAny(key, ["treppenhaus", "schluessel", "hausverwaltung"])) {
    return serviceVisuals["duesseldorf-staircase-cleaning"];
  }
  if (matchesAny(key, ["endreinigung", "grundreinigung", "renovierung", "uebergabe"])) {
    return serviceVisuals["duesseldorf-final-cleaning"];
  }
  if (matchesAny(key, ["entsorgung", "keller"])) {
    return serviceVisuals["duesseldorf-disposal"];
  }
  if (matchesAny(key, ["umzug", "moving", "transport"])) {
    return serviceVisuals["duesseldorf-moving"];
  }
  if (matchesAny(key, ["entruempel", "haushaltsaufloesung", "haushaltsauflosung", "wohnungsaufloesung", "raeumung"])) {
    return serviceVisuals["duesseldorf-clearance"];
  }

  return serviceVisuals["duesseldorf-residential-cleaning"];
}
