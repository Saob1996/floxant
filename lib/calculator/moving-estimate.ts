import {
  CALCULATOR_BAND_LABELS,
  CALCULATOR_DISCLAIMER,
  MOVING_EFFORT_CONFIG,
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
  EffortBand,
  MovingAdditionalService,
  MovingCalculatorInput,
} from "./types";

const ADDITIONAL_SERVICE_LABELS: Readonly<Record<MovingAdditionalService, string>> = {
  disassembly: "Demontage",
  assembly: "Montage",
  packing: "Verpackung",
  clearance: "Entrümpelung",
  cleaning: "Reinigung",
  piano: "Klaviertransport",
};

const VALID_ADDITIONAL_SERVICES = new Set<MovingAdditionalService>(
  Object.keys(ADDITIONAL_SERVICE_LABELS) as MovingAdditionalService[],
);

function scoreForRooms(rooms: number): number {
  if (rooms <= 1) return MOVING_EFFORT_CONFIG.roomScores.one;
  if (rooms <= 3) return MOVING_EFFORT_CONFIG.roomScores.twoToThree;
  if (rooms <= 5) return MOVING_EFFORT_CONFIG.roomScores.fourToFive;
  return MOVING_EFFORT_CONFIG.roomScores.sixPlus;
}

function scoreForArea(areaM2: number): number {
  if (areaM2 <= 50) return MOVING_EFFORT_CONFIG.areaScores.upTo50;
  if (areaM2 <= 110) return MOVING_EFFORT_CONFIG.areaScores.upTo110;
  if (areaM2 <= 180) return MOVING_EFFORT_CONFIG.areaScores.upTo180;
  return MOVING_EFFORT_CONFIG.areaScores.above180;
}

function confidenceForResult(manualReview: boolean, missingInformation: readonly string[]): CalculatorConfidence {
  if (manualReview || missingInformation.length >= 4) return "low";
  if (missingInformation.length > 0) return "medium";
  return "high";
}

function addLocationFinding(
  label: "Startort" | "Zielort",
  state: ReturnType<typeof assessLocation>["state"],
  missingInformation: string[],
  manualReviewReasons: string[],
) {
  if (state === "missing") {
    missingInformation.push(`${label} oder Postleitzahl`);
    manualReviewReasons.push(`${label} fehlt`);
  } else if (state === "invalid_postcode") {
    missingInformation.push(`${label}: gültige fünfstellige Postleitzahl oder Ortsname`);
    manualReviewReasons.push(`${label} enthält keine gültige Postleitzahl`);
  } else if (state === "international") {
    missingInformation.push(`${label}: internationale Strecke muss einzeln geprüft werden`);
    manualReviewReasons.push("internationale Strecke");
  }
}

export function calculateMovingEstimate(input: Readonly<MovingCalculatorInput>): CalculatorEstimate {
  const includedFactors: string[] = [];
  const assumptions: string[] = [];
  const missingInformation: string[] = [];
  const manualReviewReasons: string[] = [];
  let score = 0;

  const origin = assessLocation(input.origin);
  const destination = assessLocation(input.destination);
  addLocationFinding("Startort", origin.state, missingInformation, manualReviewReasons);
  addLocationFinding("Zielort", destination.state, missingInformation, manualReviewReasons);
  if (origin.state === "provided" && destination.state === "provided") {
    includedFactors.push("Start- und Zielort");
  }

  const manualDistance = normalizeNonNegativeMeasure(input.manualDistanceKm);
  if (manualDistance.state === "invalid") {
    missingInformation.push("Entfernung in einer gültigen, nicht negativen Kilometerangabe");
    manualReviewReasons.push("ungültige Entfernungsangabe");
  } else if (manualDistance.value !== null) {
    includedFactors.push("manuell angegebene Entfernung");
    if (manualDistance.value > MOVING_EFFORT_CONFIG.manualReviewLimits.distanceKm) {
      manualReviewReasons.push("außergewöhnlich große Entfernung");
    } else if (manualDistance.value > 300) {
      score += 1.6;
    } else if (manualDistance.value > 80) {
      score += 0.8;
    }
  } else {
    assumptions.push("Die exakte Entfernung wird nicht geschätzt und erst nach Prüfung der Route berücksichtigt.");
    missingInformation.push("Entfernung oder spätere Routenprüfung");
  }

  if (normalizeTextInput(input.desiredDate, 40)) {
    includedFactors.push("gewünschter Termin oder Zeitraum");
  } else {
    missingInformation.push("gewünschter Termin oder Zeitraum");
  }

  if (input.flexible === "yes") {
    includedFactors.push("zeitliche Flexibilität");
  } else if (input.flexible === "no") {
    includedFactors.push("fester Terminwunsch");
  } else {
    missingInformation.push("zeitliche Flexibilität");
  }

  if (input.scopeMode === "rooms") {
    const rooms = normalizeNonNegativeMeasure(input.rooms);
    if (rooms.state === "invalid" || rooms.value === 0) {
      missingInformation.push("Zimmerzahl größer als 0");
      manualReviewReasons.push("ungültige Zimmerzahl");
    } else if (rooms.value === null) {
      missingInformation.push("Zimmerzahl");
      manualReviewReasons.push("Umfang fehlt");
    } else {
      score += scoreForRooms(rooms.value);
      includedFactors.push(`${rooms.value.toLocaleString("de-DE", { maximumFractionDigits: 1 })} Zimmer`);
      if (rooms.value > MOVING_EFFORT_CONFIG.manualReviewLimits.rooms) {
        manualReviewReasons.push("sehr großer Umzug");
      }
    }
  } else if (input.scopeMode === "area") {
    const area = normalizeNonNegativeMeasure(input.areaM2);
    if (area.state === "invalid" || area.value === 0) {
      missingInformation.push("Wohnfläche größer als 0");
      manualReviewReasons.push("ungültige Wohnfläche");
    } else if (area.value === null) {
      missingInformation.push("Wohnfläche");
      manualReviewReasons.push("Umfang fehlt");
    } else {
      score += scoreForArea(area.value);
      includedFactors.push(`${area.value.toLocaleString("de-DE", { maximumFractionDigits: 1 })} m² Wohnfläche`);
      if (area.value > MOVING_EFFORT_CONFIG.manualReviewLimits.areaM2) {
        manualReviewReasons.push("sehr großer Umzug");
      }
    }
  } else {
    assumptions.push("Der Umfang ist noch unbekannt; die Einordnung kann deshalb nicht belastbar abgestuft werden.");
    missingInformation.push("Zimmerzahl oder Wohnfläche");
    manualReviewReasons.push("Umfang unbekannt");
  }

  const boxes = normalizeNonNegativeMeasure(input.boxes);
  if (boxes.state === "invalid") {
    missingInformation.push("Kartonanzahl als nicht negative Zahl");
    manualReviewReasons.push("ungültige Kartonanzahl");
  } else if (boxes.value !== null) {
    includedFactors.push(`etwa ${Math.round(boxes.value)} Kartons`);
    if (boxes.value > 120) score += 1.4;
    else if (boxes.value > 50) score += 0.7;
  }

  const furnitureAmount = input.furnitureAmount in MOVING_EFFORT_CONFIG.furnitureScores
    ? input.furnitureAmount
    : "unknown";
  score += MOVING_EFFORT_CONFIG.furnitureScores[furnitureAmount];
  if (furnitureAmount === "unknown") {
    missingInformation.push("grobe Möbelmenge");
  } else {
    const furnitureLabel = furnitureAmount === "none" ? "keine großen Möbel" : furnitureAmount === "some" ? "einige große Möbel" : "viele große Möbel";
    includedFactors.push(furnitureLabel);
  }

  const accessEntries = [
    {
      label: "Start",
      floor: normalizeNonNegativeMeasure(input.originFloor),
      elevator: input.originElevator,
    },
    {
      label: "Ziel",
      floor: normalizeNonNegativeMeasure(input.destinationFloor),
      elevator: input.destinationElevator,
    },
  ] as const;

  for (const access of accessEntries) {
    if (access.floor.state === "invalid") {
      missingInformation.push(`${access.label}etage als nicht negative Zahl`);
      manualReviewReasons.push(`ungültige ${access.label.toLowerCase()}etage`);
      continue;
    }

    if (access.floor.value === null) {
      missingInformation.push(`${access.label}etage`);
      continue;
    }

    const floor = access.floor.value;
    includedFactors.push(`${access.label}: ${floor === 0 ? "Erdgeschoss" : `${floor}. Etage`}`);
    if (floor > MOVING_EFFORT_CONFIG.manualReviewLimits.floor) {
      manualReviewReasons.push(`außergewöhnlich hohe ${access.label.toLowerCase()}etage`);
    }

    if (floor === 0 && access.elevator === "yes") {
      assumptions.push(`Die Aufzugsangabe am ${access.label.toLowerCase()}ort verändert den Aufwand im Erdgeschoss nicht.`);
    } else if (floor > 0 && access.elevator === "no") {
      score += Math.min(floor, 8) * MOVING_EFFORT_CONFIG.floorWithoutElevatorWeight;
      includedFactors.push(`${access.label}: kein Aufzug`);
    } else if (floor > 0 && access.elevator === "yes") {
      includedFactors.push(`${access.label}: Aufzug vorhanden`);
    } else if (floor > 0) {
      score += Math.min(floor, 8) * MOVING_EFFORT_CONFIG.floorUnknownElevatorWeight;
      missingInformation.push(`${access.label}: Aufzug vorhanden oder nicht`);
    }
  }

  const carryDistance = normalizeNonNegativeMeasure(input.carryDistanceMeters);
  if (carryDistance.state === "invalid") {
    missingInformation.push("Trageweg als nicht negative Meterangabe");
    manualReviewReasons.push("ungültiger Trageweg");
  } else if (carryDistance.value !== null) {
    includedFactors.push(`Trageweg ungefähr ${Math.round(carryDistance.value)} m`);
    if (carryDistance.value > MOVING_EFFORT_CONFIG.manualReviewLimits.carryMeters) {
      manualReviewReasons.push("außergewöhnlich langer Trageweg");
    } else if (carryDistance.value > 80) {
      score += MOVING_EFFORT_CONFIG.veryLongCarryWeight;
    } else if (carryDistance.value > 25) {
      score += MOVING_EFFORT_CONFIG.longCarryWeight;
    }
  } else {
    missingInformation.push("Trageweg zwischen Eingang und Fahrzeug");
  }

  const additionalServices = (Array.isArray(input.additionalServices) ? input.additionalServices : [])
    .filter((service): service is MovingAdditionalService => VALID_ADDITIONAL_SERVICES.has(service));
  for (const service of new Set(additionalServices)) {
    score += MOVING_EFFORT_CONFIG.additionalServiceScores[service];
    includedFactors.push(ADDITIONAL_SERVICE_LABELS[service]);
  }

  if (additionalServices.includes("piano")) {
    const pianoType = input.pianoType || "unknown";
    if (pianoType === "unknown") missingInformation.push("Art des Klaviers");
    manualReviewReasons.push("Klaviertransport benötigt Zugangsprüfung");
  }

  const manualReview = manualReviewReasons.length > 0;
  const effortBand: EffortBand = manualReview
    ? "manual_review"
    : effortBandFromScore(score, MOVING_EFFORT_CONFIG.thresholds);
  const normalizedMissingInformation = uniqueStrings(missingInformation);
  const normalizedIncludedFactors = uniqueStrings(includedFactors);
  const confidence = confidenceForResult(manualReview, normalizedMissingInformation);
  const bandLabel = CALCULATOR_BAND_LABELS[effortBand];

  const summary = manualReview
    ? "Die bekannten Angaben reichen für eine automatische Aufwandsstufe noch nicht aus. FLOXANT prüft Umfang, Zugang und Route individuell."
    : `Aus Umfang, Zugang und gewählten Zusatzleistungen ergibt sich voraussichtlich ein ${bandLabel}er Umzugsaufwand.`;

  return {
    calculatorType: "moving",
    calculatorVersion: MOVING_EFFORT_CONFIG.version,
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
      manualDistance.value === null ? "Exakte Entfernung, Fahrzeit und mögliche Maut" : "Fahrzeit, Verkehr und mögliche Maut",
      "Verfügbarkeit, Fahrzeug- und Teamplanung",
      "Besonderheiten, die erst durch Fotos oder Besichtigung erkennbar sind",
    ]),
    calculationSummary: summary,
    disclaimer: CALCULATOR_DISCLAIMER,
  };
}
