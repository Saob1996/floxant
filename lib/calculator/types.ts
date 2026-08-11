export type CalculatorType = "moving" | "cleaning";

export type CalculatorEstimateType = "effort_band";
export type CalculatorConfidence = "high" | "medium" | "low";
export type EffortBand = "small" | "medium" | "large" | "manual_review";
export type NumericInput = number | string | null | undefined;

export interface CalculatorEstimate {
  calculatorType: CalculatorType;
  calculatorVersion: string;
  estimateType: CalculatorEstimateType;
  effortBand: EffortBand;
  minimum: null;
  maximum: null;
  currency: null;
  confidence: CalculatorConfidence;
  assumptions: string[];
  missingInformation: string[];
  includedFactors: string[];
  excludedFactors: string[];
  calculationSummary: string;
  disclaimer: string;
}

export type YesNoUnknown = "yes" | "no" | "unknown";

export type MovingScopeMode = "rooms" | "area" | "unknown";
export type MovingFurnitureAmount = "none" | "some" | "many" | "unknown";
export type MovingPianoType = "upright" | "grand" | "unknown";
export type MovingAdditionalService =
  | "disassembly"
  | "assembly"
  | "packing"
  | "clearance"
  | "cleaning"
  | "piano";

export interface MovingCalculatorInput {
  origin: string;
  destination: string;
  desiredDate: string;
  flexible: YesNoUnknown;
  manualDistanceKm?: NumericInput;
  scopeMode: MovingScopeMode;
  rooms?: NumericInput;
  areaM2?: NumericInput;
  boxes?: NumericInput;
  furnitureAmount: MovingFurnitureAmount;
  originFloor?: NumericInput;
  destinationFloor?: NumericInput;
  originElevator: YesNoUnknown;
  destinationElevator: YesNoUnknown;
  carryDistanceMeters?: NumericInput;
  additionalServices: MovingAdditionalService[];
  pianoType?: MovingPianoType;
  note?: string;
}

export type CleaningObjectType =
  | "apartment"
  | "office"
  | "practice"
  | "commercial"
  | "stairwell"
  | "other"
  | "unknown";

export type CleaningType =
  | "one_off"
  | "recurring"
  | "handover"
  | "windows"
  | "construction"
  | "unknown";

export type CleaningCadence =
  | "weekly"
  | "twice_weekly"
  | "monthly"
  | "other"
  | "unknown";

export type CleaningCondition = "normal" | "used" | "heavy" | "unknown";
export type WindowExtent = "few" | "some" | "many" | "unknown";
export type WindowSides = "inside" | "outside" | "both" | "unknown";
export type WindowAccess = "easy" | "limited" | "special" | "unknown";
export type CleaningAdditionalService =
  | "windows"
  | "kitchen"
  | "sanitary"
  | "heavy_soiling";

export interface CleaningCalculatorInput {
  location: string;
  objectType: CleaningObjectType;
  areaM2?: NumericInput;
  cleaningType: CleaningType;
  cadence?: CleaningCadence;
  timeWindow?: string;
  desiredDate?: string;
  condition?: CleaningCondition;
  windowCount?: NumericInput;
  windowExtent?: WindowExtent;
  windowSides?: WindowSides;
  windowAccess?: WindowAccess;
  additionalServices: CleaningAdditionalService[];
  photosAvailable: YesNoUnknown;
  note?: string;
}

export interface CalculatorTransferSummaryItem {
  label: string;
  value: string;
}

export interface CalculatorEnquiryTransfer {
  schemaVersion: 1;
  calculatorType: CalculatorType;
  calculatorVersion: string;
  createdAt: string;
  inputSummary: CalculatorTransferSummaryItem[];
  result: {
    estimateType: CalculatorEstimateType;
    effortBand: EffortBand;
    minimum: null;
    maximum: null;
    currency: null;
    confidence: CalculatorConfidence;
    calculationSummary: string;
  };
  assumptions: string[];
  missingInformation: string[];
  selectedAdditionalServices: string[];
  enquiryNote?: string;
}

export interface CalculatorDraft<TInput> {
  schemaVersion: 1;
  calculatorVersion: string;
  step: 1 | 2 | 3 | 4;
  input: TInput;
  updatedAt: string;
}
