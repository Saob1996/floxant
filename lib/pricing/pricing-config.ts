import type { CleaningCondition, InternalServiceType, PricingVerdict } from "./types";

export const DEFAULT_VAT_RATE = 19;
export const DEFAULT_DESIRED_MARGIN_PERCENT = 22;
export const MINIMUM_SAFE_MARGIN_PERCENT = 10;

export const MARGIN_THRESHOLDS: Record<Exclude<PricingVerdict, "verlust">, number> = {
  riskant: 0,
  knapp: 10,
  gut: 20,
};

export const PRICING_DEFAULTS = {
  labor: {
    employeeHourlyRateNet: 22,
    burdenFactor: 1.32,
    averageSpeedKmH: 55,
  },
  vehicles: {
    defaultDailyRateNet: 119,
    kmCostNet: 0.24,
    fuelCostPerKmNet: 0.12,
  },
  risk: {
    basePercent: 10,
    maxPercent: 20,
  },
} as const;

export const SERVICE_BASES: Record<
  InternalServiceType,
  {
    minHours: number;
    baseMaterialNet: number;
    vehicleDailyRateNet: number;
    roundTripFactor: number;
  }
> = {
  umzug: {
    minHours: 4,
    baseMaterialNet: 45,
    vehicleDailyRateNet: 149,
    roundTripFactor: 2,
  },
  reinigung: {
    minHours: 3,
    baseMaterialNet: 35,
    vehicleDailyRateNet: 79,
    roundTripFactor: 1.4,
  },
  entsorgung: {
    minHours: 3,
    baseMaterialNet: 28,
    vehicleDailyRateNet: 139,
    roundTripFactor: 2,
  },
  b2b_reinigung: {
    minHours: 4,
    baseMaterialNet: 45,
    vehicleDailyRateNet: 89,
    roundTripFactor: 1.4,
  },
  leer_rueckfahrt: {
    minHours: 2,
    baseMaterialNet: 18,
    vehicleDailyRateNet: 99,
    roundTripFactor: 1.2,
  },
};

export const CLEANING_CONDITION_MULTIPLIER: Record<CleaningCondition, number> = {
  leicht: 1,
  mittel: 1.18,
  stark: 1.42,
};
