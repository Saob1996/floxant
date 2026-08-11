import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  CALCULATOR_ANALYTICS_PARAMETER_KEYS,
  categorizeLocationForAnalytics,
  categorizeRouteForAnalytics,
  sanitizeCalculatorAnalyticsParameters,
} from "../lib/calculator/analytics-policy";
import { calculateCleaningEstimate } from "../lib/calculator/cleaning-estimate";
import { CALCULATOR_VERSION } from "../lib/calculator/effort-config";
import { calculateMovingEstimate } from "../lib/calculator/moving-estimate";
import { normalizeDecimalInput } from "../lib/calculator/normalize";
import {
  CALCULATOR_CONTACT_HREFS,
  createCalculatorEnquiryTransfer,
  parseCalculatorEnquiryTransfer,
} from "../lib/calculator/transfer";
import type {
  CalculatorEstimate,
  CleaningCalculatorInput,
  MovingCalculatorInput,
} from "../lib/calculator/types";

const movingBase: MovingCalculatorInput = {
  origin: "93047 Regensburg",
  destination: "90402 Nürnberg",
  desiredDate: "2026-10-15",
  flexible: "yes",
  manualDistanceKm: "112,5",
  scopeMode: "rooms",
  rooms: "1",
  areaM2: "",
  boxes: "12",
  furnitureAmount: "some",
  originFloor: "0",
  destinationFloor: "0",
  originElevator: "unknown",
  destinationElevator: "unknown",
  carryDistanceMeters: "10",
  additionalServices: [],
  pianoType: "unknown",
};

const cleaningBase: CleaningCalculatorInput = {
  location: "40210 Düsseldorf",
  objectType: "apartment",
  areaM2: "45",
  cleaningType: "one_off",
  cadence: "unknown",
  timeWindow: "",
  desiredDate: "2026-09-20",
  condition: "normal",
  windowCount: "",
  windowExtent: "unknown",
  windowSides: "unknown",
  windowAccess: "unknown",
  additionalServices: [],
  photosAvailable: "yes",
};

function assertEffortOnly(estimate: CalculatorEstimate) {
  assert.equal(estimate.estimateType, "effort_band");
  assert.equal(estimate.calculatorVersion, CALCULATOR_VERSION);
  assert.equal(estimate.minimum, null);
  assert.equal(estimate.maximum, null);
  assert.equal(estimate.currency, null);
  assert.doesNotMatch(JSON.stringify(estimate), /NaN|Infinity/);
  assert.match(estimate.disclaimer, /unverbindliche Orientierung/);
}

// Mobile decimal input: German comma, international dot, grouped thousands.
assert.equal(normalizeDecimalInput("80,5"), 80.5);
assert.equal(normalizeDecimalInput("80.5"), 80.5);
assert.equal(normalizeDecimalInput("1.000,5"), 1000.5);
assert.equal(normalizeDecimalInput("1,000.5"), 1000.5);
assert.equal(normalizeDecimalInput("nicht-zahl"), null);

const smallMove = calculateMovingEstimate(movingBase);
assertEffortOnly(smallMove);
assert.equal(smallMove.effortBand, "small", "small apartment should remain a small effort band");

const mediumMove = calculateMovingEstimate({
  ...movingBase,
  scopeMode: "area",
  areaM2: "95",
  rooms: "",
  boxes: "45",
  originFloor: "2",
  originElevator: "no",
});
assertEffortOnly(mediumMove);
assert.equal(mediumMove.effortBand, "medium", "medium move should map to medium effort");
assert(mediumMove.includedFactors.some((factor) => factor.includes("kein Aufzug")));

const largeMove = calculateMovingEstimate({
  ...movingBase,
  scopeMode: "area",
  areaM2: "220",
  rooms: "",
  boxes: "90",
  furnitureAmount: "many",
  originFloor: "5",
  destinationFloor: "4",
  originElevator: "no",
  destinationElevator: "no",
  additionalServices: ["packing", "assembly"],
});
assertEffortOnly(largeMove);
assert.equal(largeMove.effortBand, "large", "large move should map to large effort");

const unknownMove = calculateMovingEstimate({ ...movingBase, scopeMode: "unknown", rooms: "" });
assert.equal(unknownMove.effortBand, "manual_review");
assert(unknownMove.missingInformation.some((item) => item.includes("Zimmerzahl oder Wohnfläche")));

const invalidMove = calculateMovingEstimate({ ...movingBase, rooms: "-2", boxes: "-4" });
assertEffortOnly(invalidMove);
assert.equal(invalidMove.effortBand, "manual_review");
assert(invalidMove.missingInformation.some((item) => item.includes("Zimmerzahl größer als 0")));

assert.equal(calculateMovingEstimate({ ...movingBase, rooms: "0" }).effortBand, "manual_review");
assert.equal(calculateMovingEstimate({ ...movingBase, destination: "" }).effortBand, "manual_review");
assert.equal(calculateMovingEstimate({ ...movingBase, origin: "1234" }).effortBand, "manual_review");
assert.equal(calculateMovingEstimate({ ...movingBase, destination: "AT-1010 Wien" }).effortBand, "manual_review");
assert.equal(calculateMovingEstimate({ ...movingBase, originFloor: "31" }).effortBand, "manual_review");

const groundFloorElevator = calculateMovingEstimate({ ...movingBase, originFloor: "0", originElevator: "yes" });
assert(groundFloorElevator.assumptions.some((item) => item.includes("Erdgeschoss")));

const extrasMove = calculateMovingEstimate({
  ...movingBase,
  scopeMode: "area",
  areaM2: "95",
  rooms: "",
  additionalServices: ["packing", "assembly", "clearance"],
});
assert.notEqual(extrasMove.effortBand, smallMove.effortBand, "moving extras should affect the effort band");

const smallCleaning = calculateCleaningEstimate(cleaningBase);
assertEffortOnly(smallCleaning);
assert.equal(smallCleaning.effortBand, "small", "small apartment should remain a small cleaning effort");

const largeOffice = calculateCleaningEstimate({
  ...cleaningBase,
  objectType: "office",
  areaM2: "500",
  cleaningType: "recurring",
  cadence: "twice_weekly",
  timeWindow: "abends",
  condition: "unknown",
});
assertEffortOnly(largeOffice);
assert.equal(largeOffice.effortBand, "large", "large office should map to large effort");

const recurringWithoutCadence = calculateCleaningEstimate({
  ...cleaningBase,
  cleaningType: "recurring",
  cadence: "unknown",
  timeWindow: "abends",
});
assert.equal(recurringWithoutCadence.effortBand, "manual_review");
assert(recurringWithoutCadence.missingInformation.some((item) => item.includes("Turnus")));

const deepOneOff = calculateCleaningEstimate({
  ...cleaningBase,
  areaM2: "60",
  condition: "heavy",
  additionalServices: ["kitchen", "sanitary"],
});
assertEffortOnly(deepOneOff);
assert.notEqual(deepOneOff.effortBand, "small", "heavy one-off cleaning should not remain small");

const windowCleaning = calculateCleaningEstimate({
  ...cleaningBase,
  areaM2: "",
  cleaningType: "windows",
  windowCount: "12",
  windowSides: "both",
  windowAccess: "easy",
});
assertEffortOnly(windowCleaning);
assert.equal(windowCleaning.effortBand, "medium");

const windowsWithoutAmount = calculateCleaningEstimate({
  ...cleaningBase,
  areaM2: "",
  cleaningType: "windows",
  windowCount: "",
  windowExtent: "unknown",
  windowSides: "both",
  windowAccess: "easy",
});
assert.equal(windowsWithoutAmount.effortBand, "manual_review");

assert.equal(calculateCleaningEstimate({ ...cleaningBase, areaM2: "" }).effortBand, "manual_review");
assert.equal(calculateCleaningEstimate({ ...cleaningBase, areaM2: "-10" }).effortBand, "manual_review");
assert.equal(calculateCleaningEstimate({ ...cleaningBase, areaM2: "1200" }).effortBand, "manual_review");
assert.equal(calculateCleaningEstimate({ ...cleaningBase, location: "1234" }).effortBand, "manual_review");

const cleaningWithExtras = calculateCleaningEstimate({
  ...cleaningBase,
  areaM2: "160",
  condition: "used",
  additionalServices: ["windows", "kitchen", "sanitary", "heavy_soiling"],
});
assertEffortOnly(cleaningWithExtras);
assert.equal(cleaningWithExtras.effortBand, "large", "cleaning extras should affect the effort band");

// Analytics policy: only the explicit non-PII allowlist may survive.
const analyticsCandidate = {
  calculator_type: "moving",
  step_number: 2,
  service_type: "moving",
  location_category: "domestic_route",
  result_band: "medium",
  lead_source: "calculator",
  name: "Max Mustermann",
  email: "max@example.com",
  phone: "+49 123",
  exact_address: "Musterstraße 1",
  start_location: "Musterstraße 1",
  destination_location: "Zielweg 2",
  message: "private message",
  files: ["photo.jpg"],
  exact_price: 999,
  bookingId: "booking-1",
  requestId: "request-1",
};
const safeAnalytics = sanitizeCalculatorAnalyticsParameters(analyticsCandidate);
assert.deepEqual(Object.keys(safeAnalytics).sort(), [...CALCULATOR_ANALYTICS_PARAMETER_KEYS].sort());
assert.equal(JSON.stringify(safeAnalytics).includes("Mustermann"), false);
assert.equal("email" in safeAnalytics, false);
assert.equal("exact_price" in safeAnalytics, false);
assert.deepEqual(sanitizeCalculatorAnalyticsParameters({ service_type: "Musterstraße 1" }), {});
assert.equal(categorizeLocationForAnalytics("40210 Düsseldorf"), "duesseldorf");
assert.equal(categorizeRouteForAnalytics("93047 Regensburg", "90402 Nürnberg"), "domestic_route");
assert.equal(categorizeRouteForAnalytics("93047 Regensburg", "AT-1010 Wien"), "international");

const transfer = createCalculatorEnquiryTransfer({
  estimate: mediumMove,
  inputSummary: [
    { label: "Start\u0000", value: "93047   Regensburg" },
    { label: "Ziel", value: "90402 Nürnberg" },
  ],
  selectedAdditionalServices: ["Montage", "Montage"],
  enquiryNote: "Bitte   zurückrufen\u0007",
  createdAt: "2026-08-11T12:00:00.000Z",
});
assert.equal(transfer.schemaVersion, 1);
assert.equal(transfer.result.minimum, null);
assert.equal(transfer.result.maximum, null);
assert.equal(transfer.result.currency, null);
assert.deepEqual(transfer.selectedAdditionalServices, ["Montage"]);
assert.equal(transfer.inputSummary[0].label, "Start");
assert.equal(transfer.enquiryNote, "Bitte zurückrufen");
const currentTransfer = { ...transfer, createdAt: new Date().toISOString() };
assert.deepEqual(
  parseCalculatorEnquiryTransfer(JSON.stringify(currentTransfer), "moving"),
  currentTransfer,
);
assert.equal(parseCalculatorEnquiryTransfer(JSON.stringify(currentTransfer), "cleaning"), null);
assert.equal(
  parseCalculatorEnquiryTransfer(JSON.stringify({
    ...currentTransfer,
    result: { ...currentTransfer.result, minimum: 100 },
  })),
  null,
);

for (const href of Object.values(CALCULATOR_CONTACT_HREFS)) {
  const url = new URL(href, "https://www.floxant.de");
  assert.equal(url.pathname, "/kontakt");
  assert.equal(url.hash, "#direktanfrage");
  assert.equal(url.searchParams.get("mode"), "neutral");
  assert.equal(url.searchParams.has("location"), false);
  assert.equal(url.searchParams.has("service"), false);
  assert.deepEqual([...url.searchParams.keys()].sort(), ["intent", "mode", "source"]);
}

// Dedicated client bundles must not import the other calculator or its estimate module.
const movingSource = readFileSync(path.join(process.cwd(), "components", "calculator", "moving", "MovingCalculator.tsx"), "utf8");
const cleaningSource = readFileSync(path.join(process.cwd(), "components", "calculator", "cleaning", "CleaningCalculator.tsx"), "utf8");
assert.doesNotMatch(movingSource, /CleaningCalculator|cleaning-estimate/);
assert.doesNotMatch(cleaningSource, /MovingCalculator|moving-estimate/);

console.log("calculator-logic-test: PASS (moving, cleaning, transfer, analytics PII allowlist)");
