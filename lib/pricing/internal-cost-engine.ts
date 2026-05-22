import {
  CLEANING_CONDITION_MULTIPLIER,
  DEFAULT_DESIRED_MARGIN_PERCENT,
  DEFAULT_VAT_RATE,
  MARGIN_THRESHOLDS,
  MINIMUM_SAFE_MARGIN_PERCENT,
  PRICING_DEFAULTS,
  SERVICE_BASES,
} from "./pricing-config";
import type {
  CostBreakdownItem,
  InternalCostInput,
  InternalCostResult,
  PricingVerdict,
  RiskLevel,
} from "./types";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function grossToNet(gross: number, vatRate: number) {
  return gross / (1 + vatRate / 100);
}

function netToGross(net: number, vatRate: number) {
  return net * (1 + vatRate / 100);
}

function roundPriceStep(value: number) {
  if (!Number.isFinite(value) || value <= 0) return 0;
  if (value < 300) return Math.ceil(value / 10) * 10;
  if (value < 1500) return Math.ceil(value / 25) * 25;
  return Math.ceil(value / 50) * 50;
}

function estimateHours(input: InternalCostResult["input"]) {
  const distanceHours =
    input.distanceKm > 0 ? (input.distanceKm * SERVICE_BASES[input.serviceType].roundTripFactor) / 55 : 0;

  switch (input.serviceType) {
    case "umzug":
      return Math.max(
        SERVICE_BASES.umzug.minHours,
        input.estimatedVolumeM3 * 0.42 +
          distanceHours +
          input.teamSize * 0.4 +
          (input.packingService ? 1.2 : 0) +
          (input.disassemblyService ? 1 : 0) +
          (input.assemblyService ? 1 : 0)
      );
    case "reinigung":
    case "b2b_reinigung": {
      const area = input.cleaningAreaM2 || Math.max(0, input.estimatedVolumeM3 * 10);
      const conditionMultiplier = CLEANING_CONDITION_MULTIPLIER[input.cleaningCondition || "mittel"];
      return Math.max(SERVICE_BASES[input.serviceType].minHours, (area / 35) * conditionMultiplier);
    }
    case "entsorgung":
      return Math.max(
        SERVICE_BASES.entsorgung.minHours,
        input.estimatedVolumeM3 * 0.55 +
          input.disposalWeightKg / 250 +
          distanceHours +
          (input.disassemblyService ? 0.8 : 0)
      );
    case "leer_rueckfahrt":
      return Math.max(
        SERVICE_BASES.leer_rueckfahrt.minHours,
        input.estimatedVolumeM3 * 0.22 + distanceHours * 0.65
      );
    default:
      return SERVICE_BASES.umzug.minHours;
  }
}

function estimateTeamSize(input: InternalCostResult["input"]) {
  switch (input.serviceType) {
    case "umzug":
      if (input.estimatedVolumeM3 >= 35) return 4;
      if (input.estimatedVolumeM3 >= 18) return 3;
      return Math.max(2, input.teamSize);
    case "entsorgung":
      if (input.estimatedVolumeM3 >= 16 || input.disposalWeightKg >= 1200) return 3;
      return Math.max(2, input.teamSize);
    case "reinigung":
    case "b2b_reinigung":
      if (input.cleaningAreaM2 >= 250) return 3;
      if (input.cleaningAreaM2 >= 120) return 2;
      return Math.max(1, input.teamSize);
    case "leer_rueckfahrt":
      return Math.max(1, input.teamSize);
    default:
      return Math.max(1, input.teamSize);
  }
}

function buildRiskPercent(input: InternalCostResult["input"]) {
  let risk = PRICING_DEFAULTS.risk.basePercent;

  if (input.distanceKm > 80) risk += 3;
  if ((input.floorsFrom > 0 && !input.elevatorFrom) || (input.floorsTo > 0 && !input.elevatorTo)) risk += 2;
  if (input.walkingDistanceMeters > 30) risk += 2;
  if (input.weekendOrUrgent) risk += 3;
  if (input.heavyItems > 0) risk += 2;
  if (input.serviceType === "entsorgung" && input.disposalWeightKg > 800) risk += 3;
  if ((input.serviceType === "reinigung" || input.serviceType === "b2b_reinigung") && input.cleaningCondition === "stark") risk += 4;
  if (!input.estimatedVolumeM3 && (input.serviceType === "umzug" || input.serviceType === "entsorgung" || input.serviceType === "leer_rueckfahrt")) risk += 2;

  return clamp(risk, PRICING_DEFAULTS.risk.basePercent, PRICING_DEFAULTS.risk.maxPercent);
}

function buildRiskLevel(riskPercent: number): RiskLevel {
  if (riskPercent >= 17) return "high";
  if (riskPercent >= 13) return "medium";
  return "low";
}

function buildVerdict(expectedMarginPercent: number): PricingVerdict {
  if (expectedMarginPercent < 0) return "verlust";
  if (expectedMarginPercent < MARGIN_THRESHOLDS.knapp) return "riskant";
  if (expectedMarginPercent < MARGIN_THRESHOLDS.gut) return "knapp";
  return "gut";
}

function driverListFromBreakdown(breakdown: CostBreakdownItem[], input: InternalCostResult["input"]) {
  const biggest = [...breakdown]
    .filter((item) => item.amountNet > 0)
    .sort((a, b) => b.amountNet - a.amountNet)
    .slice(0, 3)
    .map((item) => item.label);

  const extras: string[] = [];
  if (input.weekendOrUrgent) extras.push("Eil- oder Wochenendwunsch");
  if ((input.floorsFrom > 0 && !input.elevatorFrom) || (input.floorsTo > 0 && !input.elevatorTo)) {
    extras.push("Etagen ohne Aufzug");
  }
  if (input.walkingDistanceMeters > 30) extras.push("Langer Laufweg");
  if (input.noParkingZone) extras.push("Zugang / Parken");

  return [...new Set([...biggest, ...extras])].slice(0, 5);
}

export function calculateInternalCost(input: InternalCostInput): InternalCostResult {
  const vatRate = clamp(toNumber(input.vatRate, DEFAULT_VAT_RATE), 0, 25);
  const desiredMarginPercent = clamp(
    toNumber(input.desiredMarginPercent, DEFAULT_DESIRED_MARGIN_PERCENT),
    5,
    60
  );

  const normalizedInput: InternalCostResult["input"] = {
    serviceType: input.serviceType,
    distanceKm: Math.max(0, toNumber(input.distanceKm)),
    estimatedVolumeM3: Math.max(0, toNumber(input.estimatedVolumeM3)),
    estimatedHours: Math.max(0, toNumber(input.estimatedHours)),
    teamSize: Math.max(1, toNumber(input.teamSize, 2)),
    vehiclesCount: Math.max(1, toNumber(input.vehiclesCount, 1)),
    floorsFrom: Math.max(0, toNumber(input.floorsFrom)),
    floorsTo: Math.max(0, toNumber(input.floorsTo)),
    elevatorFrom: Boolean(input.elevatorFrom),
    elevatorTo: Boolean(input.elevatorTo),
    walkingDistanceMeters: Math.max(0, toNumber(input.walkingDistanceMeters)),
    heavyItems: Math.max(0, toNumber(input.heavyItems)),
    packingService: Boolean(input.packingService),
    disassemblyService: Boolean(input.disassemblyService),
    assemblyService: Boolean(input.assemblyService),
    noParkingZone: Boolean(input.noParkingZone),
    weekendOrUrgent: Boolean(input.weekendOrUrgent),
    disposalWeightKg: Math.max(0, toNumber(input.disposalWeightKg)),
    cleaningAreaM2: Math.max(0, toNumber(input.cleaningAreaM2)),
    cleaningCondition: input.cleaningCondition || "mittel",
    customerPriceGross:
      input.customerPriceGross === undefined || input.customerPriceGross === null
        ? undefined
        : Math.max(0, toNumber(input.customerPriceGross)),
    vatRate,
    desiredMarginPercent,
  };

  normalizedInput.estimatedHours =
    normalizedInput.estimatedHours || estimateHours(normalizedInput);
  normalizedInput.teamSize =
    input.teamSize && input.teamSize > 0 ? normalizedInput.teamSize : estimateTeamSize(normalizedInput);

  const laborRate = Math.max(
    10,
    toNumber(input.employeeHourlyRateNet, PRICING_DEFAULTS.labor.employeeHourlyRateNet)
  );
  const burdenFactor = Math.max(
    1,
    toNumber(input.laborBurdenFactor, PRICING_DEFAULTS.labor.burdenFactor)
  );
  const vehicleDailyRateNet = Math.max(
    0,
    toNumber(input.vehicleDailyRateNet, SERVICE_BASES[normalizedInput.serviceType].vehicleDailyRateNet)
  );
  const kmCostNet = Math.max(0, toNumber(input.kmCostNet, PRICING_DEFAULTS.vehicles.kmCostNet));
  const fuelCostPerKmNet = Math.max(
    0,
    toNumber(input.fuelCostPerKmNet, PRICING_DEFAULTS.vehicles.fuelCostPerKmNet)
  );
  const materialFlatNet = Math.max(
    0,
    toNumber(input.materialFlatNet, SERVICE_BASES[normalizedInput.serviceType].baseMaterialNet)
  );

  const laborHours = normalizedInput.estimatedHours;
  const travelDistanceKm =
    normalizedInput.distanceKm * SERVICE_BASES[normalizedInput.serviceType].roundTripFactor;
  const travelHours = travelDistanceKm > 0 ? travelDistanceKm / PRICING_DEFAULTS.labor.averageSpeedKmH : 0;

  const personalCostNet =
    laborHours * normalizedInput.teamSize * laborRate * burdenFactor;
  const travelTimeCostNet =
    travelHours * normalizedInput.teamSize * laborRate * burdenFactor;

  const rentalDays = Math.max(1, Math.ceil((laborHours + travelHours) / 8));
  const vehicleCostNet =
    normalizedInput.vehiclesCount * vehicleDailyRateNet * rentalDays;
  const kilometerFuelCostNet =
    travelDistanceKm *
    normalizedInput.vehiclesCount *
    (kmCostNet + fuelCostPerKmNet);

  let materialCostNet = materialFlatNet;
  if (normalizedInput.packingService) materialCostNet += 65 + normalizedInput.estimatedVolumeM3 * 6;
  if (normalizedInput.serviceType === "reinigung" || normalizedInput.serviceType === "b2b_reinigung") {
    materialCostNet += normalizedInput.cleaningAreaM2 * 0.18;
  }
  if (normalizedInput.serviceType === "entsorgung") {
    materialCostNet += Math.max(18, normalizedInput.estimatedVolumeM3 * 4);
  }

  let extraCostsNet = 0;
  const stairPenalty =
    (normalizedInput.floorsFrom > 0 && !normalizedInput.elevatorFrom
      ? normalizedInput.floorsFrom * 18
      : 0) +
    (normalizedInput.floorsTo > 0 && !normalizedInput.elevatorTo
      ? normalizedInput.floorsTo * 18
      : 0);
  extraCostsNet += stairPenalty;
  extraCostsNet += Math.max(0, normalizedInput.walkingDistanceMeters - 20) * 0.9;
  extraCostsNet += normalizedInput.heavyItems * 35;
  if (normalizedInput.disassemblyService) extraCostsNet += 90;
  if (normalizedInput.assemblyService) extraCostsNet += 90;
  if (normalizedInput.noParkingZone) extraCostsNet += 85;
  if (normalizedInput.weekendOrUrgent) extraCostsNet += 120;
  if (normalizedInput.serviceType === "entsorgung") {
    extraCostsNet += normalizedInput.disposalWeightKg * 0.28;
  }
  if (normalizedInput.serviceType === "reinigung" || normalizedInput.serviceType === "b2b_reinigung") {
    extraCostsNet +=
      normalizedInput.cleaningAreaM2 *
      (CLEANING_CONDITION_MULTIPLIER[normalizedInput.cleaningCondition || "mittel"] - 1) *
      0.85;
  }

  const subtotalNet =
    personalCostNet +
    vehicleCostNet +
    kilometerFuelCostNet +
    travelTimeCostNet +
    materialCostNet +
    extraCostsNet;

  const riskPercent = buildRiskPercent(normalizedInput);
  const riskBufferNet = subtotalNet * (riskPercent / 100);
  const internalCostNet = subtotalNet + riskBufferNet;
  const internalCostGross = netToGross(internalCostNet, vatRate);

  const suggestedMinimumNet = roundPriceStep(
    internalCostNet / (1 - MINIMUM_SAFE_MARGIN_PERCENT / 100)
  );
  const targetPriceNet = roundPriceStep(
    internalCostNet / (1 - desiredMarginPercent / 100)
  );

  const customerPriceNet =
    typeof normalizedInput.customerPriceGross === "number" &&
    normalizedInput.customerPriceGross > 0
      ? roundCurrency(grossToNet(normalizedInput.customerPriceGross, vatRate))
      : null;
  const evaluationPriceNet = customerPriceNet ?? targetPriceNet;
  const expectedProfitNet = roundCurrency(evaluationPriceNet - internalCostNet);
  const expectedMarginPercent =
    evaluationPriceNet > 0 ? roundCurrency((expectedProfitNet / evaluationPriceNet) * 100) : 0;

  const breakdown: CostBreakdownItem[] = [
    {
      key: "personal",
      label: "Personal",
      amountNet: roundCurrency(personalCostNet),
      description: `${normalizedInput.teamSize} Personen · ${roundCurrency(laborHours)} Stunden`,
    },
    {
      key: "fahrzeuge",
      label: "Fahrzeuge",
      amountNet: roundCurrency(vehicleCostNet),
      description: `${normalizedInput.vehiclesCount} Fahrzeug(e) · ${rentalDays} Miettag(e)`,
    },
    {
      key: "kilometer_fuel",
      label: "Kilometer / Fuel",
      amountNet: roundCurrency(kilometerFuelCostNet),
      description: `${roundCurrency(travelDistanceKm)} km inkl. Rückweg`,
    },
    {
      key: "fahrzeit",
      label: "Fahrzeit",
      amountNet: roundCurrency(travelTimeCostNet),
      description: `${roundCurrency(travelHours)} Stunden als Arbeitszeit`,
    },
    {
      key: "material",
      label: "Material",
      amountNet: roundCurrency(materialCostNet),
      description: "Verbrauch, Schutzmaterial und Reinigungsmittel",
    },
    {
      key: "zusatzkosten",
      label: "Zusatzkosten",
      amountNet: roundCurrency(extraCostsNet),
      description: "Etagen, Laufweg, Sonderaufwand, Entsorgung, Eilwunsch",
    },
    {
      key: "risikopuffer",
      label: "Risiko-Puffer",
      amountNet: roundCurrency(riskBufferNet),
      description: `${riskPercent} % operativer Puffer`,
    },
  ];

  return {
    input: normalizedInput,
    breakdown,
    internalCostNet: roundCurrency(internalCostNet),
    internalCostGross: roundCurrency(internalCostGross),
    suggestedMinimumNet: roundCurrency(suggestedMinimumNet),
    suggestedMinimumGross: roundCurrency(netToGross(suggestedMinimumNet, vatRate)),
    targetPriceNet: roundCurrency(targetPriceNet),
    targetPriceGross: roundCurrency(netToGross(targetPriceNet, vatRate)),
    customerPriceNet,
    expectedProfitNet,
    expectedMarginPercent,
    riskLevel: buildRiskLevel(riskPercent),
    verdict: buildVerdict(expectedMarginPercent),
    explanation: driverListFromBreakdown(breakdown, normalizedInput),
  };
}
