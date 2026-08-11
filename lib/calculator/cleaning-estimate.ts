import {
  CALCULATOR_BAND_LABELS,
  CALCULATOR_DISCLAIMER,
  CLEANING_EFFORT_CONFIG,
  effortBandFromScore,
} from "./effort-config";
import {
  assessLocation,
  normalizeNonNegativeMeasure,
  normalizeTextInput,
  uniqueStrings,
} from "./normalize";
import type {
  CalculatorConfidence,
  CalculatorEstimate,
  CleaningAdditionalService,
  CleaningCalculatorInput,
  CleaningCondition,
  CleaningObjectType,
  CleaningType,
  EffortBand,
  WindowExtent,
} from "./types";

const OBJECT_LABELS: Readonly<Record<Exclude<CleaningObjectType, "unknown">, string>> = {
  apartment: "Wohnung",
  office: "Büro",
  practice: "Praxis",
  commercial: "Gewerbefläche",
  stairwell: "Treppenhaus",
  other: "anderes Objekt",
};

const CLEANING_TYPE_LABELS: Readonly<Record<Exclude<CleaningType, "unknown">, string>> = {
  one_off: "einmalige Reinigung",
  recurring: "regelmäßige Reinigung",
  handover: "Übergabe- oder Auszugsreinigung",
  windows: "Fenster- oder Glasreinigung",
  construction: "Bau- oder Renovierungsreinigung",
};

const ADDITIONAL_SERVICE_LABELS: Readonly<Record<CleaningAdditionalService, string>> = {
  windows: "Fenster",
  kitchen: "Küche",
  sanitary: "Sanitärbereiche",
  heavy_soiling: "stärkere Verschmutzung",
};

const VALID_OBJECT_TYPES = new Set<CleaningObjectType>([
  "apartment",
  "office",
  "practice",
  "commercial",
  "stairwell",
  "other",
  "unknown",
]);
const VALID_CLEANING_TYPES = new Set<CleaningType>([
  "one_off",
  "recurring",
  "handover",
  "windows",
  "construction",
  "unknown",
]);
const VALID_ADDITIONAL_SERVICES = new Set<CleaningAdditionalService>(
  Object.keys(ADDITIONAL_SERVICE_LABELS) as CleaningAdditionalService[],
);

function scoreForArea(areaM2: number): number {
  if (areaM2 <= 60) return CLEANING_EFFORT_CONFIG.areaScores.upTo60;
  if (areaM2 <= 180) return CLEANING_EFFORT_CONFIG.areaScores.upTo180;
  if (areaM2 <= 450) return CLEANING_EFFORT_CONFIG.areaScores.upTo450;
  return CLEANING_EFFORT_CONFIG.areaScores.above450;
}

function windowExtentFromCount(count: number): Exclude<WindowExtent, "unknown"> {
  if (count <= 6) return "few";
  if (count <= 18) return "some";
  return "many";
}

function confidenceForResult(manualReview: boolean, missingInformation: readonly string[]): CalculatorConfidence {
  if (manualReview || missingInformation.length >= 4) return "low";
  if (missingInformation.length > 0) return "medium";
  return "high";
}

export function calculateCleaningEstimate(input: Readonly<CleaningCalculatorInput>): CalculatorEstimate {
  const includedFactors: string[] = [];
  const assumptions: string[] = [];
  const missingInformation: string[] = [];
  const manualReviewReasons: string[] = [];
  let score = 0;

  const location = assessLocation(input.location);
  if (location.state === "missing") {
    missingInformation.push("Standort oder Postleitzahl");
    manualReviewReasons.push("Standort fehlt");
  } else if (location.state === "invalid_postcode") {
    missingInformation.push("gültige fünfstellige Postleitzahl oder Ortsname");
    manualReviewReasons.push("ungültige Postleitzahl");
  } else if (location.state === "international") {
    missingInformation.push("Standort außerhalb Deutschlands muss einzeln geprüft werden");
    manualReviewReasons.push("internationaler Standort");
  } else {
    includedFactors.push("Standort");
  }

  const objectType = VALID_OBJECT_TYPES.has(input.objectType) ? input.objectType : "unknown";
  if (objectType === "unknown") {
    missingInformation.push("Objektart");
    manualReviewReasons.push("Objektart unbekannt");
  } else {
    score += CLEANING_EFFORT_CONFIG.objectTypeScores[objectType];
    includedFactors.push(OBJECT_LABELS[objectType]);
    if (objectType === "other") {
      manualReviewReasons.push("anderes Objekt benötigt kurze Einzelfallprüfung");
    }
  }

  const cleaningType = VALID_CLEANING_TYPES.has(input.cleaningType) ? input.cleaningType : "unknown";
  if (cleaningType === "unknown") {
    missingInformation.push("Reinigungsart");
    manualReviewReasons.push("Reinigungsart noch unsicher");
  } else {
    score += CLEANING_EFFORT_CONFIG.cleaningTypeScores[cleaningType];
    includedFactors.push(CLEANING_TYPE_LABELS[cleaningType]);
  }

  const area = normalizeNonNegativeMeasure(input.areaM2);
  const areaRequired = cleaningType !== "windows";
  if (area.state === "invalid" || area.value === 0) {
    missingInformation.push("Fläche größer als 0");
    manualReviewReasons.push("ungültige Fläche");
  } else if (area.value === null) {
    if (areaRequired) {
      missingInformation.push("ungefähre Fläche");
      manualReviewReasons.push("Fläche unbekannt");
    } else {
      assumptions.push("Bei reiner Fensterreinigung wird die Fläche des Objekts nicht als Hauptmaß verwendet.");
    }
  } else {
    score += scoreForArea(area.value);
    includedFactors.push(`${area.value.toLocaleString("de-DE", { maximumFractionDigits: 1 })} m² Fläche`);
    if (area.value > CLEANING_EFFORT_CONFIG.manualReviewLimits.areaM2) {
      manualReviewReasons.push("sehr großes Objekt");
    }
  }

  const condition: CleaningCondition = input.condition || "unknown";
  const conditionScore = condition in CLEANING_EFFORT_CONFIG.conditionScores
    ? CLEANING_EFFORT_CONFIG.conditionScores[condition]
    : CLEANING_EFFORT_CONFIG.conditionScores.unknown;
  score += conditionScore;
  if (condition === "unknown") {
    if (cleaningType !== "recurring" && cleaningType !== "windows") {
      missingInformation.push("Zustand oder Verschmutzungsgrad");
    }
  } else {
    const conditionLabel = condition === "normal" ? "normaler Zustand" : condition === "used" ? "sichtbar genutzter Zustand" : "stärkere Verschmutzung";
    includedFactors.push(conditionLabel);
  }

  if (cleaningType === "recurring") {
    if (!input.cadence || input.cadence === "unknown") {
      missingInformation.push("Turnus der regelmäßigen Reinigung");
      manualReviewReasons.push("regelmäßige Reinigung ohne Turnus");
    } else {
      const cadenceLabel = input.cadence === "weekly" ? "wöchentlich" : input.cadence === "twice_weekly" ? "zweimal wöchentlich" : input.cadence === "monthly" ? "monatlich" : "anderer Turnus";
      includedFactors.push(cadenceLabel);
    }

    if (normalizeTextInput(input.timeWindow, 80)) includedFactors.push("gewünschtes Zeitfenster");
    else missingInformation.push("gewünschtes Zeitfenster");
  } else if (cleaningType === "one_off" || cleaningType === "handover" || cleaningType === "construction") {
    if (normalizeTextInput(input.desiredDate, 40)) includedFactors.push("gewünschter Termin");
    else missingInformation.push("gewünschter Termin oder Zeitraum");
  }

  const windowCount = normalizeNonNegativeMeasure(input.windowCount);
  let windowExtent: WindowExtent = input.windowExtent || "unknown";
  if (windowCount.state === "invalid") {
    missingInformation.push("Fensteranzahl als nicht negative Zahl");
    manualReviewReasons.push("ungültige Fensteranzahl");
  } else if (windowCount.value !== null && windowCount.value > 0) {
    windowExtent = windowExtentFromCount(windowCount.value);
    includedFactors.push(`etwa ${Math.round(windowCount.value)} Fenster`);
    if (windowCount.value > CLEANING_EFFORT_CONFIG.manualReviewLimits.windows) {
      manualReviewReasons.push("außergewöhnlich viele Fenster");
    }
  }

  if (cleaningType === "windows") {
    if ((windowCount.value === null || windowCount.value === 0) && windowExtent === "unknown") {
      missingInformation.push("Fensteranzahl oder grobe Glasfläche");
      manualReviewReasons.push("Fensterreinigung ohne Mengenangabe");
    } else if (windowExtent !== "unknown") {
      score += CLEANING_EFFORT_CONFIG.windowScores[windowExtent];
    }

    if (!input.windowSides || input.windowSides === "unknown") missingInformation.push("innen, außen oder beidseitig");
    else includedFactors.push(input.windowSides === "both" ? "Fenster innen und außen" : input.windowSides === "inside" ? "Fenster innen" : "Fenster außen");

    if (!input.windowAccess || input.windowAccess === "unknown") missingInformation.push("Erreichbarkeit der Fenster");
    else if (input.windowAccess === "special") {
      includedFactors.push("Fenster nur mit besonderem Zugang erreichbar");
      manualReviewReasons.push("besondere Fenstererreichbarkeit");
    } else {
      includedFactors.push(input.windowAccess === "easy" ? "Fenster gut erreichbar" : "Fenster teilweise schwer erreichbar");
      if (input.windowAccess === "limited") score += 0.8;
    }
  }

  const additionalServices = (Array.isArray(input.additionalServices) ? input.additionalServices : [])
    .filter((service): service is CleaningAdditionalService => VALID_ADDITIONAL_SERVICES.has(service));
  for (const service of new Set(additionalServices)) {
    score += CLEANING_EFFORT_CONFIG.additionalServiceScores[service];
    includedFactors.push(ADDITIONAL_SERVICE_LABELS[service]);
  }

  if (additionalServices.includes("windows") && cleaningType !== "windows" && windowCount.value === null && windowExtent === "unknown") {
    missingInformation.push("Menge der zusätzlich gewünschten Fensterreinigung");
  }

  if (input.photosAvailable === "yes") {
    assumptions.push("Fotos können die spätere Prüfung erleichtern, fließen aber nicht als eigener Aufwandstreiber ein.");
  } else if (input.photosAvailable === "unknown") {
    missingInformation.push("Fotos, sofern Zustand oder Zugang schwer beschreibbar sind");
  }

  const manualReview = manualReviewReasons.length > 0;
  const effortBand: EffortBand = manualReview
    ? "manual_review"
    : effortBandFromScore(score, CLEANING_EFFORT_CONFIG.thresholds);
  const normalizedMissingInformation = uniqueStrings(missingInformation);
  const normalizedIncludedFactors = uniqueStrings(includedFactors);
  const confidence = confidenceForResult(manualReview, normalizedMissingInformation);
  const bandLabel = CALCULATOR_BAND_LABELS[effortBand];

  const summary = manualReview
    ? "Die bekannten Angaben reichen für eine automatische Aufwandsstufe noch nicht aus. FLOXANT prüft Objekt, Zustand und Reinigungsziel individuell."
    : `Aus Objekt, Fläche, Reinigungsart und Ergänzungen ergibt sich voraussichtlich ein ${bandLabel}er Reinigungsaufwand.`;

  return {
    calculatorType: "cleaning",
    calculatorVersion: CLEANING_EFFORT_CONFIG.version,
    estimateType: "effort_band",
    effortBand,
    minimum: null,
    maximum: null,
    currency: null,
    confidence,
    assumptions: uniqueStrings(assumptions),
    missingInformation: normalizedMissingInformation,
    includedFactors: normalizedIncludedFactors,
    excludedFactors: uniqueStrings([
      "Kein numerischer Preis, weil keine öffentlich validierte Preislogik vorliegt",
      "Materialbedarf, genaue Raumaufteilung und Objektzugang",
      "Verfügbarkeit, Team- und Terminplanung",
      "Besonderheiten, die erst durch Fotos oder Besichtigung erkennbar sind",
    ]),
    calculationSummary: summary,
    disclaimer: CALCULATOR_DISCLAIMER,
  };
}
