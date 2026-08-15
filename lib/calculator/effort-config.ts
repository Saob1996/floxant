import type {
  CleaningAdditionalService,
  CleaningObjectType,
  CleaningType,
  EffortBand,
  MovingAdditionalService,
} from "./types";

export const CALCULATOR_VERSION = "effort-2026-08-11-v1";

const bandLabels: Readonly<Record<EffortBand, string>> = Object.freeze({
  small: "klein",
  medium: "mittel",
  large: "größer",
  manual_review: "individuelle Prüfung erforderlich",
});

export const CALCULATOR_BAND_LABELS = bandLabels;

export const MOVING_EFFORT_CONFIG = Object.freeze({
  version: CALCULATOR_VERSION,
  thresholds: Object.freeze({ smallMax: 3.25, mediumMax: 7.25 }),
  roomScores: Object.freeze({ one: 1.25, twoToThree: 3.5, fourToFive: 6, sixPlus: 8 }),
  areaScores: Object.freeze({ upTo50: 1.25, upTo110: 3.5, upTo180: 6, above180: 8 }),
  floorWithoutElevatorWeight: 0.45,
  floorUnknownElevatorWeight: 0.2,
  longCarryWeight: 0.9,
  veryLongCarryWeight: 1.8,
  furnitureScores: Object.freeze({ none: 0, some: 0.75, many: 1.7, unknown: 0.45 }),
  additionalServiceScores: Object.freeze<Readonly<Record<MovingAdditionalService, number>>>({
    disassembly: 0.8,
    assembly: 0.8,
    packing: 1.1,
    clearance: 1.25,
    cleaning: 0.7,
    piano: 2.75,
  }),
  manualReviewLimits: Object.freeze({ areaM2: 350, rooms: 10, floor: 25, carryMeters: 300, distanceKm: 1500 }),
});

// This public allowlist mirrors object types of active cleaning services reviewed
// in lib/services/service-registry.ts on 2026-08-11. Internal registry records are
// intentionally not imported into either calculator client bundle.
export const CLEANING_OBJECT_TYPE_OPTIONS: ReadonlyArray<{
  value: Exclude<CleaningObjectType, "unknown">;
  label: string;
}> = Object.freeze([
  { value: "apartment", label: "Wohnung" },
  { value: "office", label: "Büro" },
  { value: "practice", label: "Praxis" },
  { value: "commercial", label: "Gewerbefläche" },
  { value: "stairwell", label: "Treppenhaus" },
  { value: "other", label: "Anderes Objekt" },
]);

export const CLEANING_EFFORT_CONFIG = Object.freeze({
  version: CALCULATOR_VERSION,
  thresholds: Object.freeze({ smallMax: 3.25, mediumMax: 7.25 }),
  areaScores: Object.freeze({ upTo60: 1.2, upTo180: 3.6, upTo450: 6.4, above450: 8.4 }),
  objectTypeScores: Object.freeze<Readonly<Record<Exclude<CleaningObjectType, "unknown">, number>>>({
    apartment: 0,
    office: 0.55,
    practice: 0.8,
    commercial: 0.9,
    stairwell: 0.35,
    other: 1.1,
  }),
  cleaningTypeScores: Object.freeze<Readonly<Record<Exclude<CleaningType, "unknown">, number>>>({
    one_off: 0.45,
    recurring: 0.15,
    handover: 1.1,
    windows: 0.55,
    construction: 2,
  }),
  conditionScores: Object.freeze({ normal: 0, used: 0.75, heavy: 1.75, unknown: 0.55 }),
  windowScores: Object.freeze({ few: 1.15, some: 3.4, many: 6.2, unknown: 0 }),
  additionalServiceScores: Object.freeze<Readonly<Record<CleaningAdditionalService, number>>>({
    windows: 0.7,
    kitchen: 0.45,
    sanitary: 0.45,
    heavy_soiling: 1.35,
  }),
  manualReviewLimits: Object.freeze({ areaM2: 1000, windows: 120 }),
});

export const CALCULATOR_DISCLAIMER =
  "Die Berechnung ist eine unverbindliche Orientierung. Ein konkretes Angebot entsteht erst nach Prüfung der Angaben.";

export function effortBandFromScore(
  score: number,
  thresholds: Readonly<{ smallMax: number; mediumMax: number }>,
): Exclude<EffortBand, "manual_review"> {
  if (!Number.isFinite(score) || score <= thresholds.smallMax) return "small";
  if (score <= thresholds.mediumMax) return "medium";
  return "large";
}
