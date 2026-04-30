export type InternalServiceType =
  | "umzug"
  | "reinigung"
  | "entsorgung"
  | "b2b_reinigung"
  | "leer_rueckfahrt";

export type CleaningCondition = "leicht" | "mittel" | "stark";
export type RiskLevel = "low" | "medium" | "high";
export type PricingVerdict = "gut" | "knapp" | "riskant" | "verlust";

export interface InternalCostInput {
  serviceType: InternalServiceType;
  distanceKm?: number;
  estimatedVolumeM3?: number;
  estimatedHours?: number;
  teamSize?: number;
  vehiclesCount?: number;
  floorsFrom?: number;
  floorsTo?: number;
  elevatorFrom?: boolean;
  elevatorTo?: boolean;
  walkingDistanceMeters?: number;
  heavyItems?: number;
  packingService?: boolean;
  disassemblyService?: boolean;
  assemblyService?: boolean;
  noParkingZone?: boolean;
  weekendOrUrgent?: boolean;
  disposalWeightKg?: number;
  cleaningAreaM2?: number;
  cleaningCondition?: CleaningCondition;
  customerPriceGross?: number;
  vatRate?: number;
  desiredMarginPercent?: number;
  employeeHourlyRateNet?: number;
  laborBurdenFactor?: number;
  vehicleDailyRateNet?: number;
  kmCostNet?: number;
  fuelCostPerKmNet?: number;
  materialFlatNet?: number;
}

export interface CostBreakdownItem {
  key:
    | "personal"
    | "fahrzeuge"
    | "kilometer_fuel"
    | "fahrzeit"
    | "material"
    | "zusatzkosten"
    | "risikopuffer";
  label: string;
  amountNet: number;
  description: string;
}

export interface InternalCostResult {
  input: Required<
    Pick<
      InternalCostInput,
      | "serviceType"
      | "distanceKm"
      | "estimatedVolumeM3"
      | "estimatedHours"
      | "teamSize"
      | "vehiclesCount"
      | "floorsFrom"
      | "floorsTo"
      | "walkingDistanceMeters"
      | "heavyItems"
      | "disposalWeightKg"
      | "cleaningAreaM2"
      | "vatRate"
      | "desiredMarginPercent"
    >
  > &
    Pick<
      InternalCostInput,
      | "elevatorFrom"
      | "elevatorTo"
      | "packingService"
      | "disassemblyService"
      | "assemblyService"
      | "noParkingZone"
      | "weekendOrUrgent"
      | "cleaningCondition"
      | "customerPriceGross"
    >;
  breakdown: CostBreakdownItem[];
  internalCostNet: number;
  internalCostGross: number;
  suggestedMinimumNet: number;
  suggestedMinimumGross: number;
  targetPriceNet: number;
  targetPriceGross: number;
  customerPriceNet: number | null;
  expectedProfitNet: number;
  expectedMarginPercent: number;
  riskLevel: RiskLevel;
  verdict: PricingVerdict;
  explanation: string[];
}
