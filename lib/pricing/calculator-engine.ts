import {
  UmzugAdvancedData,
  ReinigungAdvancedData,
  EntsorgungAdvancedData,
  BueroumzugAdvancedData,
  SeniorenumzugAdvancedData,
  KlaviertransportAdvancedData,
  EinlagerungAdvancedData,
  MalerarbeitenAdvancedData,
  AkteneinlagerungAdvancedData,
  BaseDetails,
  UmzugExpressData,
  ReinigungExpressData,
  EntsorgungExpressData,
  AdvancedEstimate,
  PricingSignalSnapshot,
} from "@/store/calculatorStore";

export interface PriceRange {
  min: number;
  max: number;
}

type ConfidenceLevel = "high" | "medium" | "low";

const CONFIDENCE_RANK: Record<ConfidenceLevel, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function num(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function minPrice(value: number, floor: number): number {
  return value < floor ? floor : value;
}

function downgradeConfidence(
  current: ConfidenceLevel,
  next: ConfidenceLevel
): ConfidenceLevel {
  return CONFIDENCE_RANK[next] < CONFIDENCE_RANK[current] ? next : current;
}

function uniqueFlags(flags: string[]): string[] {
  return [...new Set(flags.filter(Boolean))];
}

function getRangeStep(value: number): number {
  if (value < 200) return 10;
  if (value < 500) return 25;
  if (value < 1500) return 50;
  if (value < 3000) return 100;
  return 250;
}

function roundDownToStep(value: number, step: number): number {
  return Math.floor(Math.max(0, value) / step) * step;
}

function roundUpToStep(value: number, step: number): number {
  return Math.ceil(Math.max(0, value) / step) * step;
}

function createPriceRange(basePrice: number, multiplier: number): PriceRange {
  const rawMin = Math.max(0, basePrice);
  const rawMax = Math.max(rawMin, basePrice * multiplier);
  const step = getRangeStep(rawMax);
  const min = roundDownToStep(rawMin, step);
  const max = Math.max(min + step, roundUpToStep(rawMax, step));

  return { min, max };
}

function formatHours(minHours: number, maxHours: number, dic?: any): string {
  return `${dic?.common?.ca || "ca."} ${minHours} - ${maxHours} ${dic?.common?.hours || "Std."}`;
}

function getDistanceKm(base?: BaseDetails, fallback = 15): number {
  return Math.max(0, num(base?.distance, fallback));
}

function getDistanceBandMultiplier(distanceKm: number): number {
  if (distanceKm <= 35) return 1;
  if (distanceKm <= 100) return 1.04;
  if (distanceKm <= 200) return 1.1;
  return 1.18;
}

function getDistanceBandDriver(distanceKm: number): string {
  if (distanceKm <= 35) return "Nahbereich Regensburg";
  if (distanceKm <= 100) return "Regionalachse Oberpfalz und Niederbayern";
  if (distanceKm <= 200) return "200-km-Einsatzkorridor";
  return "Fernstrecke außerhalb des Kernkorridors";
}

function getAreaToVolume(areaM2: number): number {
  return Math.max(2, areaM2 * 0.35);
}

function getCityMultiplier(address: string): number {
  const addr = normalizeText(address || "");
  if (addr.includes("munchen") || addr.includes("munich")) return 1.15;
  if (addr.includes("nurnberg") || addr.includes("nuremberg") || addr.includes("augsburg")) return 1.05;
  if (addr.includes("regensburg") || addr.includes("passau")) return 1.02;
  return 1;
}

function getSeasonalMultiplier(): number {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();

  let multiplier = 1;
  if (day >= 25 || day <= 5) multiplier += 0.08;
  if (month >= 5 && month <= 7) multiplier += 0.05;

  return Number(multiplier.toFixed(2));
}

function getGlobalMultiplier(base?: BaseDetails): number {
  return getCityMultiplier(base?.fromAddress || "") * getSeasonalMultiplier();
}

function getValuationStage(confidenceLevel: ConfidenceLevel): string {
  if (confidenceLevel === "high") return "Gut belastbare Vorprüfung";
  if (confidenceLevel === "medium") return "Solide Vorplanung";
  return "Erste Einschätzung";
}

function trimDrivers(drivers: string[]): string[] {
  return uniqueFlags(drivers).slice(0, 5);
}

function makeSignals(
  serviceType: string,
  primaryFactors: string[],
  metrics: PricingSignalSnapshot["metrics"]
): PricingSignalSnapshot {
  return {
    serviceType,
    primaryFactors: trimDrivers(primaryFactors),
    metrics: Object.fromEntries(
      Object.entries(metrics).filter(([, value]) => value !== undefined)
    ),
  };
}

function finalizeEstimate({
  price,
  uncertaintyMultiplier,
  estimatedHours,
  recommendedTeam,
  calculationBasis,
  operationalFlags,
  confidenceLevel,
  drivers,
  priceExplanation,
  pricingSignals,
  cbm,
}: {
  price: number;
  uncertaintyMultiplier: number;
  estimatedHours: string;
  recommendedTeam: string;
  calculationBasis: string;
  operationalFlags: string[];
  confidenceLevel: ConfidenceLevel;
  drivers: string[];
  priceExplanation: string;
  pricingSignals: PricingSignalSnapshot;
  cbm?: number;
}): AdvancedEstimate {
  const topDrivers = trimDrivers(drivers);

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours,
    recommendedTeam,
    calculationBasis,
    operationalFlags: uniqueFlags(operationalFlags),
    operationalDrivers: topDrivers,
    topDrivers,
    confidenceLevel,
    valuationStage: getValuationStage(confidenceLevel),
    priceExplanation,
    pricingSignals,
    cbm,
  };
}

function hasSeasonalDemand(): boolean {
  return getSeasonalMultiplier() > 1.04;
}

export function calculateUmzugExpress(
  data: UmzugExpressData,
  base: BaseDetails
): PriceRange {
  const areaM2 = Math.max(0, num(data.areaM2, 0));
  const cbm = getAreaToVolume(areaM2);
  const laborCost = cbm * 29;
  const fixedCost = 120;
  const distanceKm = getDistanceKm(base, 15);
  const distanceCost = distanceKm * 1.2;

  let price = fixedCost + laborCost + distanceCost;

  const fromFloor = Math.max(0, num(data.fromFloor, 0));
  const toFloor = Math.max(0, num(data.toFloor, 0));

  if (fromFloor > 0 && !data.hasElevatorFrom) price += fromFloor * 25;
  if (toFloor > 0 && !data.hasElevatorTo) price += toFloor * 25;

  price *= getGlobalMultiplier(base);
  price *= getDistanceBandMultiplier(distanceKm);
  price = minPrice(price, 220);

  return createPriceRange(price, 1.35);
}

export function calculateReinigungExpress(
  data: ReinigungExpressData
): PriceRange {
  const area = Math.max(0, num(data.areaM2, 0));
  let price = Math.max(99, area * 3.8);

  if (data.propertyType === "haus") price *= 1.15;
  if (data.propertyType === "buero") price *= 1.1;

  let conditionMultiplier = 1;
  if (data.condition === "mittel") conditionMultiplier = 1.22;
  if (data.condition === "stark") conditionMultiplier = 1.45;

  price *= conditionMultiplier;
  price *= getSeasonalMultiplier();

  return createPriceRange(price, 1.18);
}

export function calculateEntsorgungExpress(
  data: EntsorgungExpressData,
  base?: BaseDetails
): PriceRange {
  const volume = Math.max(0, num(data.wasteVolumeM3, 0));
  const distanceKm = getDistanceKm(base, 15);
  let price = 79 + volume * 34;

  let accessMultiplier = 1;
  if (data.accessDifficulty === "mittel") accessMultiplier = 1.18;
  if (data.accessDifficulty === "schwer") accessMultiplier = 1.35;

  price *= accessMultiplier;
  price *= getGlobalMultiplier(base);
  price *= getDistanceBandMultiplier(distanceKm);

  return createPriceRange(price, 1.4);
}

export function calculateUmzugAdvanced(
  data: UmzugAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  let confidenceLevel: ConfidenceLevel = "high";
  let uncertaintyMultiplier = 1.12;

  const rawArea = Math.max(0, num(data.areaM2, 0));
  let cbm = getAreaToVolume(rawArea || 40);

  if (!rawArea) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "low");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.35);
    flags.push(
      dic?.calculator?.flag_area_missing ||
        "Wohnfläche ergänzen, damit der Rahmen belastbarer wird"
    );
  } else if (data.uncertainVolume) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.26);
    flags.push(
      dic?.calculator?.flag_uncertain_volume ||
        "Volumen ist noch nicht abschließend geklärt"
    );
  }

  const furnitureVolumes: Record<string, number> = {
    "sofa-2": 1.5,
    "sofa-3": 2.2,
    "bed-s": 1.5,
    "bed-d": 3,
    table: 0.8,
    chair: 0.2,
    "wardrobe-1": 1.2,
    "wardrobe-2": 2.4,
    "tv-bench": 0.5,
    fridge: 1,
    washing: 0.8,
    shelf: 0.6,
  };

  if (Array.isArray(data.furnitureList) && data.furnitureList.length > 0) {
    const furnitureCbm = data.furnitureList.reduce(
      (sum, item) => sum + (furnitureVolumes[item] || 0.8),
      0
    );

    if (data.furnitureList.length >= 5) {
      cbm = Math.max(cbm, rawArea ? cbm * 0.55 + furnitureCbm * 0.8 : furnitureCbm);
    } else {
      cbm += furnitureCbm * 0.45;
    }
  }

  const distanceKm = Math.max(
    0,
    num(data.distanceKm, 0) || getDistanceKm(base, 15)
  );
  const rooms = Math.max(1, num(data.rooms, 2));
  const boxesCount = Math.max(0, num(data.boxesCount, 0));
  const fromFloor = Math.max(0, num(data.fromFloor, 0));
  const toFloor = Math.max(0, num(data.toFloor, 0));
  const walkingDistanceFrom = Math.max(0, num(data.walkingDistanceFrom, 0));
  const walkingDistanceTo = Math.max(0, num(data.walkingDistanceTo, 0));

  let price = 260 + cbm * 41 + distanceKm * 1.9 + boxesCount * 2.5;
  price *= getDistanceBandMultiplier(distanceKm);

  if (distanceKm > 100) {
    flags.push("Erweiterter Einsatzkorridor bis etwa 200 km eingeplant");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.18);
  }

  if (fromFloor > 0 && !data.hasElevatorFrom) {
    price += fromFloor * 28;
    flags.push(
      dic?.calculator?.flag_trageservice_auszug ||
        "Auszug ohne Aufzug wurde berücksichtigt"
    );
  }

  if (toFloor > 0 && !data.hasElevatorTo) {
    price += toFloor * 28;
    flags.push(
      dic?.calculator?.flag_trageservice_einzug ||
        "Einzug ohne Aufzug wurde berücksichtigt"
    );
  }

  if (walkingDistanceFrom > 20) {
    price += (walkingDistanceFrom - 20) * 1.8;
    flags.push(`Auszug Laufweg: ${walkingDistanceFrom} m`);
  }

  if (walkingDistanceTo > 20) {
    price += (walkingDistanceTo - 20) * 1.8;
    flags.push(`Einzug Laufweg: ${walkingDistanceTo} m`);
  }

  if (data.courtyardAccessFrom) {
    price += 45;
    flags.push("Auszug mit Innenhof oder erschwertem Zugang");
  }

  if (data.courtyardAccessTo) {
    price += 45;
    flags.push("Einzug mit Innenhof oder erschwertem Zugang");
  }

  if (data.narrowStairsFrom) {
    price += 95;
    flags.push("Auszug mit engem Treppenhaus");
  }

  if (data.narrowStairsTo) {
    price += 95;
    flags.push("Einzug mit engem Treppenhaus");
  }

  if (data.noParkingZoneFrom) {
    price += 85;
    flags.push("Haltezone am Auszugsort einplanen");
  }

  if (data.noParkingZoneTo) {
    price += 85;
    flags.push("Haltezone am Einzugsort einplanen");
  }

  if (data.packingService) {
    price += cbm * 16;
    flags.push("Einpackservice notiert");
  }

  if (data.unpackingService) {
    price += cbm * 12;
    flags.push("Auspackhilfe notiert");
  }

  if (data.disassemblyService) {
    price += rooms * 45;
    flags.push("Demontageaufwand berücksichtigt");
  }

  if (data.assemblyService) {
    price += rooms * 45;
    flags.push("Montageaufwand berücksichtigt");
  }

  if (data.kitchenAssembly) {
    price += 320;
    flags.push("Küchenservice eingeplant");
  }

  if (Array.isArray(data.heavyItems) && data.heavyItems.length > 0) {
    data.heavyItems.forEach((item) => {
      const value = normalizeText(item);

      if (value.includes("grand") || value.includes("flugel")) price += 320;
      else if (value.includes("piano") || value.includes("klavier")) price += 180;
      else if (value.includes("safe") || value.includes("tresor")) price += 150;
      else if (value.includes("aquarium")) price += 110;
      else if (value.includes("fitness")) price += 90;
      else price += 70;
    });

    flags.push("Schwerstücke oder Spezialgut berücksichtigt");
  }

  if (data.timeConstraint === "genaues_datum") {
    price *= 1.06;
    flags.push("Festes Zeitfenster eingeplant");
  } else if (data.timeConstraint === "wochenende") {
    price *= 1.12;
    flags.push("Wochenendtermin eingeplant");
  } else if (data.timeConstraint === "dringend") {
    price *= 1.18;
    flags.push("Kurzfristiger Termin angefragt");
  }

  if (data.isPartialMove) {
    price *= 0.72;
    flags.push("Teilleistung oder Beiladung berücksichtigt");
  }

  if (text(data.freeTextNote)) {
    flags.push("Persönliche Hinweise wurden notiert");
  }

  price *= getSeasonalMultiplier();
  price *= getCityMultiplier(base?.fromAddress || "");
  price = minPrice(price, 360);

  const drivers: string[] = ["Volumen und Inventar", getDistanceBandDriver(distanceKm)];

  if ((fromFloor > 1 && !data.hasElevatorFrom) || (toFloor > 1 && !data.hasElevatorTo)) {
    drivers.push("Stockwerke ohne Aufzug");
  }

  if (
    walkingDistanceFrom > 20 ||
    walkingDistanceTo > 20 ||
    data.courtyardAccessFrom ||
    data.courtyardAccessTo ||
    data.narrowStairsFrom ||
    data.narrowStairsTo
  ) {
    drivers.push("Laufwege oder schwieriger Zugang");
  }

  if (
    data.packingService ||
    data.unpackingService ||
    data.disassemblyService ||
    data.assemblyService ||
    data.kitchenAssembly ||
    data.timeConstraint !== "flexibel"
  ) {
    drivers.push("Montage, Verpackung oder Zeitfenster");
  }

  if ((data.heavyItems?.length || 0) > 0) {
    drivers.push("Schwerstücke oder Spezialtransport");
  }

  if (hasSeasonalDemand()) {
    drivers.push("Starke Terminlage");
  }

  let recommendedTeam = dic?.calculator?.team_2_persons || "2 Personen";
  if (cbm > 20) recommendedTeam = dic?.calculator?.team_3_persons || "3 Personen";
  if (cbm > 40) recommendedTeam = dic?.calculator?.team_4_persons || "4 Personen";

  const baseHours = Math.max(3, Math.round(cbm / 4));

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: formatHours(baseHours, baseHours + 2, dic),
    recommendedTeam,
    calculationBasis: `~${Math.round(cbm)} m3 Volumen | ${Math.round(distanceKm)} km Strecke`,
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Ihren Angaben zu Volumen, Strecke, Zugang, Zusatzleistungen und Terminlage.",
    pricingSignals: makeSignals("umzug", drivers, {
      areaM2: rawArea,
      cbm: Math.round(cbm),
      rooms,
      boxesCount,
      distanceKm: Math.round(distanceKm),
      fromFloor,
      toFloor,
      hasElevatorFrom: !!data.hasElevatorFrom,
      hasElevatorTo: !!data.hasElevatorTo,
      walkingDistanceFrom,
      walkingDistanceTo,
      noParkingZoneFrom: !!data.noParkingZoneFrom,
      noParkingZoneTo: !!data.noParkingZoneTo,
      packingService: !!data.packingService,
      unpackingService: !!data.unpackingService,
      disassemblyService: !!data.disassemblyService,
      assemblyService: !!data.assemblyService,
      kitchenAssembly: !!data.kitchenAssembly,
      timeConstraint: data.timeConstraint,
      heavyItems: data.heavyItems,
      uncertainVolume: !!data.uncertainVolume,
    }),
    cbm: Math.round(cbm),
  });
}

export function calculateReinigungAdvanced(
  data: ReinigungAdvancedData,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  let confidenceLevel: ConfidenceLevel = "high";
  let uncertaintyMultiplier = 1.14;

  const rawArea = Math.max(0, num(data.areaM2, 0));
  const area = rawArea || 60;
  const windowsCount = Math.max(0, num(data.windowsCount, 0));

  if (!rawArea) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "low");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.35);
    flags.push(
      dic?.calculator?.flag_cleaning_area_missing ||
        "Fläche ergänzen, damit der Rahmen belastbarer wird"
    );
  }

  if (data.uncertainCondition) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.25);
    flags.push("Zustand wird noch vor Ort geprüft");
  }

  let m2Rate = 5.4;
  if (area < 40) m2Rate = 6.4;
  else if (area >= 150) m2Rate = 4.3;
  else if (area >= 80) m2Rate = 4.8;

  let price = Math.max(149, area * m2Rate);

  if (data.propertyType === "haus") {
    price *= 1.12;
    flags.push("Hausstruktur mit Fluren oder Treppen berücksichtigt");
  } else if (data.propertyType === "buero") {
    price *= 1.08;
    flags.push("Gewerbliche Objektstruktur berücksichtigt");
  }

  let conditionMultiplier = 1;
  if (data.condition === "mittel") conditionMultiplier = 1.22;
  if (data.condition === "stark") {
    conditionMultiplier = 1.45;
    flags.push("Erhöhter Verschmutzungsgrad berücksichtigt");
  }

  price *= conditionMultiplier;
  price += windowsCount * 11;

  if (Array.isArray(data.extras)) {
    data.extras.forEach((extra) => {
      if (extra === "kueche_tiefenreinigung") {
        price += 65;
        flags.push("Tiefenreinigung der Küche berücksichtigt");
      }

      if (extra === "bad_kalk") {
        price += 45;
        flags.push("Zusatzaufwand im Bad berücksichtigt");
      }

      if (extra === "teppich") {
        price += area * 1.2;
        flags.push("Teppichreinigung berücksichtigt");
      }

      if (extra === "fenster_glas") {
        price += Math.max(25, windowsCount * 6);
        flags.push("Fenster- und Glasflächen berücksichtigt");
      }
    });
  }

  if (data.isFurnished) {
    price *= 1.12;
    flags.push("Möbliertes Objekt berücksichtigt");
  }

  if (data.keysHandover) {
    price += 25;
    flags.push("Schlüsselübergabe berücksichtigt");
  }

  if (data.cleaningGuarantee) {
    price += 40;
    flags.push("Abnahmeorientierte Endkontrolle notiert");
  }

  if (data.frequency === "regelmaessig") {
    price *= 0.88;
    flags.push("Regelmäßiger Turnus berücksichtigt");
  }

  if (text(data.freeTextNote)) {
    flags.push("Persönliche Hinweise wurden notiert");
  }

  price *= getSeasonalMultiplier();
  price = minPrice(price, 130);

  const drivers: string[] = ["Fläche und Objektart", "Verschmutzungsgrad"];

  if (data.isFurnished) {
    drivers.push("Möblierung oder enge Objektstruktur");
  }

  if (windowsCount > 0 || (data.extras?.length || 0) > 0) {
    drivers.push("Fenster und Zusatzleistungen");
  }

  if (hasSeasonalDemand() || data.frequency === "einmalig") {
    drivers.push("Terminlage");
  }

  if (data.cleaningGuarantee) {
    drivers.push("Abnahmeorientierte Endkontrolle");
  }

  let recommendedTeam = dic?.calculator?.person_1 || "1 Person";
  if (area > 80) recommendedTeam = dic?.calculator?.team_2_persons || "2 Personen";
  if (area > 150) recommendedTeam = dic?.calculator?.team_3_persons || "3 Personen";

  const baseHours = Math.max(2, Math.round(area / 22));

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: formatHours(baseHours, baseHours + 2, dic),
    recommendedTeam,
    calculationBasis: `${Math.round(area)} m2 Fläche | Zustand: ${data.condition || "mittel"}`,
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Ihren Angaben zu Fläche, Objektart, Zustand, Zusatzleistungen und Terminlage.",
    pricingSignals: makeSignals("reinigung", drivers, {
      areaM2: Math.round(area),
      propertyType: data.propertyType,
      condition: data.condition,
      windowsCount,
      isFurnished: !!data.isFurnished,
      extras: data.extras,
      frequency: data.frequency,
      keysHandover: !!data.keysHandover,
      cleaningGuarantee: !!data.cleaningGuarantee,
      uncertainCondition: !!data.uncertainCondition,
    }),
  });
}

export function calculateEntsorgungAdvanced(
  data: EntsorgungAdvancedData,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  let confidenceLevel: ConfidenceLevel = "high";
  let uncertaintyMultiplier = 1.24;

  const rawVolume = Math.max(0, num(data.wasteVolumeM3, 0));
  const expectedVolume = rawVolume || 3;
  const loadingDistanceMeters = Math.max(0, num(data.loadingDistanceMeters, 0));

  if (!rawVolume) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "low");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.45);
    flags.push(
      dic?.calculator?.flag_waste_volume_missing ||
        "Volumen ergänzen, damit der Rahmen belastbarer wird"
    );
  }

  if (data.uncertainVolume) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.35);
    flags.push("Volumen ist noch nicht abschließend geklärt");
  }

  let price = 155 + expectedVolume * 48;

  if (Array.isArray(data.wasteCategories) && data.wasteCategories.length > 0) {
    data.wasteCategories.forEach((category) => {
      const value = normalizeText(category);

      if (value.includes("bauschutt")) {
        price += expectedVolume * 25;
        flags.push("Bauschutt oder schwere Fraktionen berücksichtigt");
      } else if (value.includes("elektro")) {
        price += 35;
        flags.push("Elektrogeräte und Recycling berücksichtigt");
      } else if (value.includes("misch")) {
        price += expectedVolume * 12;
      } else if (value.includes("metall")) {
        price += expectedVolume * 8;
      } else if (value.includes("grun")) {
        price -= expectedVolume * 4;
      }
    });
  }

  let accessMultiplier = 1;
  if (data.accessDifficulty === "mittel") accessMultiplier = 1.15;
  if (data.accessDifficulty === "schwer") {
    accessMultiplier = 1.32;
    flags.push("Schwieriger Zugang wurde berücksichtigt");
  }

  price *= accessMultiplier;

  if (loadingDistanceMeters > 15) {
    price += (loadingDistanceMeters - 15) * 1.4;
    flags.push(`Laufweg zum Fahrzeug: ${loadingDistanceMeters} m`);
  }

  if (data.disassemblyRequired) {
    price += 65 + expectedVolume * 12;
    flags.push("Demontage vor Ort eingeplant");
  }

  if (data.hazardMaterials) {
    price *= 1.35;
    flags.push("Sonderaufwand durch Problemstoffe notiert");
  }

  if (data.urgency === "dringend") {
    price *= 1.2;
    flags.push("Kurzfristiger Termin angefragt");
  }

  if (text(data.freeTextNote)) {
    flags.push("Persönliche Hinweise wurden notiert");
  }

  price *= getGlobalMultiplier();
  price = minPrice(price, 190);

  const drivers: string[] = ["Volumen und Materialarten"];

  if (data.accessDifficulty !== "einfach" || loadingDistanceMeters > 15) {
    drivers.push("Zugang und Laufweg");
  }

  if (data.disassemblyRequired) {
    drivers.push("Demontage vor Ort");
  }

  if (data.urgency === "dringend") {
    drivers.push("Dringlichkeit");
  }

  if (data.hazardMaterials || (data.wasteCategories?.includes("bauschutt") ?? false)) {
    drivers.push("Sonderaufwand oder Problemstoffe");
  }

  let recommendedTeam = dic?.calculator?.team_2_persons || "2 Personen";
  if (expectedVolume > 15) recommendedTeam = dic?.calculator?.team_3_persons || "3 Personen";

  const baseHours = Math.max(1, Math.round(expectedVolume / 3));

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: formatHours(baseHours, baseHours + 1, dic),
    recommendedTeam,
    calculationBasis: `~${Math.round(expectedVolume)} m3 Entsorgungsgut`,
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Ihren Angaben zu Volumen, Materialarten, Zugang, Zusatzaufwand und Terminlage.",
    pricingSignals: makeSignals("entsorgung", drivers, {
      wasteVolumeM3: Math.round(expectedVolume),
      wasteCategories: data.wasteCategories,
      accessDifficulty: data.accessDifficulty,
      loadingDistanceMeters,
      disassemblyRequired: !!data.disassemblyRequired,
      urgency: data.urgency,
      hazardMaterials: !!data.hazardMaterials,
      uncertainVolume: !!data.uncertainVolume,
    }),
    cbm: Math.round(expectedVolume),
  });
}

export function calculateBueroumzugAdvanced(
  data: BueroumzugAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  let confidenceLevel: ConfidenceLevel = "high";
  let uncertaintyMultiplier = 1.15;

  const workstations = Math.max(1, num(data.workstations, 1));
  const archiveMeters = Math.max(0, num(data.archiveMeters, 0));
  const distanceKm = getDistanceKm(base, 15);
  const cbm = workstations * 4.5 + archiveMeters * 0.3;

  let price = 320 + workstations * 180 + archiveMeters * 32 + distanceKm * 2.4;
  price *= getDistanceBandMultiplier(distanceKm);

  if (distanceKm > 100) {
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.22);
    flags.push("200-km-Einsatzkorridor mit Routen- und Teamplanung berücksichtigt");
  }

  if (workstations > 20) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.24);
    flags.push("Größerer Büroumzug mit detaillierter Ablaufplanung empfohlen");
  }

  if (archiveMeters > 30) {
    price *= 1.05;
    flags.push("Größerer Archivbestand berücksichtigt");
  }

  if (data.itSetup) {
    price += workstations * 45;
    flags.push("IT-Arbeitsplätze und Peripherie berücksichtigt");
  }

  if (data.packingService) {
    price += cbm * 14;
    flags.push("Packservice eingeplant");
  }

  if (data.disassemblyService) {
    price += workstations * 28;
    flags.push("Demontageaufwand berücksichtigt");
  }

  if (data.assemblyService) {
    price += workstations * 28;
    flags.push("Montageaufwand berücksichtigt");
  }

  if (data.walkingDistanceFrom > 20 || data.walkingDistanceTo > 20) {
    price +=
      Math.max(0, data.walkingDistanceFrom - 20) * 2 +
      Math.max(0, data.walkingDistanceTo - 20) * 2;
    flags.push("Längere Laufwege berücksichtigt");
  }

  if (data.noParkingZoneFrom || data.noParkingZoneTo) {
    price += 95 * Number(data.noParkingZoneFrom) + 95 * Number(data.noParkingZoneTo);
    flags.push("Haltezonen berücksichtigt");
  }

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 520);

  const drivers = trimDrivers([
    "Arbeitsplätze und Transportvolumen",
    getDistanceBandDriver(distanceKm),
    data.itSetup ? "IT-Handling" : "",
    archiveMeters > 0 ? "Archiv oder Zusatzbestand" : "",
    data.walkingDistanceFrom > 20 || data.walkingDistanceTo > 20 ? "Laufwege und Objektzugang" : "",
    data.disassemblyService || data.assemblyService ? "Montageleistungen" : "",
  ]);

  const recommendedTeam =
    workstations <= 5 ? "2-3 Personen" : workstations <= 15 ? "4-6 Personen" : "8+ Personen";
  const baseHours = Math.ceil(workstations * 2.5);

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: formatHours(baseHours, baseHours + 4, dic),
    recommendedTeam,
    calculationBasis: `${workstations} Arbeitsplätze | ~${Math.round(cbm)} m3`,
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Ihren Angaben zu Arbeitsplatzanzahl, Strecke, Zugang und Zusatzleistungen.",
    pricingSignals: makeSignals("bueroumzug", drivers, {
      workstations,
      archiveMeters,
      distanceKm: Math.round(distanceKm),
      itSetup: !!data.itSetup,
      packingService: !!data.packingService,
      disassemblyService: !!data.disassemblyService,
      assemblyService: !!data.assemblyService,
      walkingDistanceFrom: data.walkingDistanceFrom,
      walkingDistanceTo: data.walkingDistanceTo,
      noParkingZoneFrom: !!data.noParkingZoneFrom,
      noParkingZoneTo: !!data.noParkingZoneTo,
    }),
    cbm: Math.round(cbm),
  });
}

export function calculateSeniorenumzugAdvanced(
  data: SeniorenumzugAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const baseResult = calculateUmzugAdvanced(data, base, dic);

  if (!data.seniorCarePackage) {
    return baseResult;
  }

  baseResult.priceRange.min += 250;
  baseResult.priceRange.max += 250;
  baseResult.operationalFlags = uniqueFlags([
    ...baseResult.operationalFlags,
    dic?.calculator?.flag_senior_care || "Begleitservice für Seniorenumzug eingeplant",
  ]);
  baseResult.topDrivers = trimDrivers([
    "Begleitservice und sensible Planung",
    ...baseResult.topDrivers,
  ]);
  baseResult.operationalDrivers = baseResult.topDrivers;
  baseResult.pricingSignals = makeSignals("seniorenumzug", baseResult.topDrivers, {
    ...baseResult.pricingSignals.metrics,
    seniorCarePackage: true,
  });
  baseResult.priceExplanation =
    "Diese vorläufige Einschätzung basiert auf Ihren Angaben zu Volumen, Strecke, Zugang und dem gewünschten Begleitservice.";

  return baseResult;
}

export function calculateKlaviertransportAdvanced(
  data: KlaviertransportAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  const confidenceLevel: ConfidenceLevel = "high";
  const uncertaintyMultiplier = 1.1;

  const fromFloor = Math.max(0, num(data.fromFloor, 0));
  const toFloor = Math.max(0, num(data.toFloor, 0));
  const distanceKm = Math.max(0, num(data.distanceKm, 10));

  let price = data.pianoType === "grand" ? 390 : 220;

  if (fromFloor > 0 && !data.hasElevatorFrom) {
    price += fromFloor * 45;
    flags.push("Ausgangsort ohne Aufzug");
  }

  if (toFloor > 0 && !data.hasElevatorTo) {
    price += toFloor * 45;
    flags.push("Zielort ohne Aufzug");
  }

  price += distanceKm * 2.2;
  price *= getGlobalMultiplier(base);
  price = minPrice(price, 260);

  const drivers = trimDrivers([
    data.pianoType === "grand" ? "Flügel oder Großinstrument" : "Instrumenttyp",
    fromFloor > 0 || toFloor > 0 ? "Stockwerke und Zugang" : "",
    "Strecke und Spezialhandling",
  ]);

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: "ca. 2 - 4 Std.",
    recommendedTeam: "2-3 Personen",
    calculationBasis: data.pianoType === "grand" ? "Flügel" : "Klavier",
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Instrumenttyp, Stockwerken, Zugang und Strecke.",
    pricingSignals: makeSignals("klaviertransport", drivers, {
      pianoType: data.pianoType,
      fromFloor,
      toFloor,
      hasElevatorFrom: !!data.hasElevatorFrom,
      hasElevatorTo: !!data.hasElevatorTo,
      distanceKm: Math.round(distanceKm),
    }),
  });
}

export function calculateEinlagerungAdvanced(
  data: EinlagerungAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  const confidenceLevel: ConfidenceLevel = "high";
  const uncertaintyMultiplier = 1.15;

  const volume = Math.max(1, num(data.volumeM3, 5));
  const months = Math.max(1, num(data.durationMonths, 1));

  let price = volume * 18 * months;

  if (data.pickupRequired) {
    price += 150 + volume * 25;
    flags.push("Abholung und Einlagerung eingeplant");
  }

  if (data.insuranceValue > 5000) {
    price += (data.insuranceValue - 5000) * 0.002;
    flags.push("Höhere Versicherungssumme berücksichtigt");
  }

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 150);

  const drivers = trimDrivers([
    "Lagervolumen und Laufzeit",
    data.pickupRequired ? "Abholung und Transport" : "",
    data.insuranceValue > 5000 ? "Versicherungswert" : "",
  ]);

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: `Voraussichtliche Mietdauer: ${months} Monate`,
    recommendedTeam: data.pickupRequired ? "2 Personen (Abholung)" : "Self-Storage",
    calculationBasis: `${volume} m3 Lagergut | ${months} Monate`,
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Volumen, Lagerdauer, Abholung und Versicherungswert.",
    pricingSignals: makeSignals("einlagerung", drivers, {
      volumeM3: volume,
      durationMonths: months,
      pickupRequired: !!data.pickupRequired,
      insuranceValue: Math.round(data.insuranceValue),
    }),
    cbm: volume,
  });
}

export function calculateMalerarbeitenAdvanced(
  data: MalerarbeitenAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  const confidenceLevel: ConfidenceLevel = "high";
  const uncertaintyMultiplier = 1.2;

  const area = Math.max(1, num(data.areaM2, 50));

  let rate = 14;
  if (data.paintQuality === "premium") rate = 18;
  if (data.paintQuality === "bio") rate = 22;

  let price = area * rate;

  if (data.includesCeiling) {
    price *= 1.35;
    flags.push("Deckenflächen berücksichtigt");
  }

  if (data.includesDoors) {
    price += 160;
    flags.push("Türen oder Zargen berücksichtigt");
  }

  if (data.isFurnished) {
    price *= 1.25;
    flags.push("Möbliertes Objekt berücksichtigt");
  }

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 250);

  const baseHours = Math.max(4, Math.ceil(area / 10));
  const drivers = trimDrivers([
    "Fläche und Farbqualität",
    data.includesCeiling ? "Deckenflächen" : "",
    data.includesDoors ? "Türen oder Zargen" : "",
    data.isFurnished ? "Möbliertes Objekt" : "",
  ]);

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: formatHours(baseHours, baseHours + 6, dic),
    recommendedTeam: area > 100 ? "2-3 Personen" : "1-2 Personen",
    calculationBasis: `${area} m2 Wandfläche | Qualität: ${data.paintQuality}`,
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Fläche, Materialqualität, Objektstruktur und Zusatzflächen.",
    pricingSignals: makeSignals("malerarbeiten", drivers, {
      areaM2: area,
      paintQuality: data.paintQuality,
      includesCeiling: !!data.includesCeiling,
      includesDoors: !!data.includesDoors,
      roomsCount: data.roomsCount,
      isFurnished: !!data.isFurnished,
    }),
  });
}

export function calculateAkteneinlagerungAdvanced(
  data: AkteneinlagerungAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  const confidenceLevel: ConfidenceLevel = "high";
  const uncertaintyMultiplier = 1.1;

  const boxes = Math.max(0, num(data.boxCount, 0));
  const meters = Math.max(0, num(data.shelfMeters, 0));
  const months = Math.max(1, num(data.durationMonths, 6));

  let price = (boxes * 1.8 + meters * 12) * months;

  if (months >= 12) {
    price *= 0.9;
    flags.push("Langfristige Laufzeit berücksichtigt");
  }

  if (data.pickupRequired) {
    price += 45 + boxes * 0.6 + meters * 4;
    flags.push("Sichere Abholung berücksichtigt");
  }

  if (data.securityShredding) {
    price += boxes * 15 + meters * 25;
    flags.push("Aktenvernichtung berücksichtigt");
  }

  if (data.digitalization) {
    price += 85 + meters * 150 + boxes * 20;
    flags.push("Digitalisierung berücksichtigt");
  }

  if (data.insuranceValue > 10000) {
    price += (data.insuranceValue - 10000) * 0.0015;
    flags.push("Erhöhte Versicherungssumme berücksichtigt");
  }

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 180);

  const drivers = trimDrivers([
    "Aktenbestand und Laufzeit",
    data.pickupRequired ? "Abholung" : "",
    data.securityShredding ? "Aktenvernichtung" : "",
    data.digitalization ? "Digitalisierung" : "",
  ]);

  return finalizeEstimate({
    price,
    uncertaintyMultiplier,
    estimatedHours: `Mietdauer: ${months} Monate`,
    recommendedTeam: "B2B Logistik-Team",
    calculationBasis: `${boxes} Boxen | ${meters} lfm Archiv`,
    operationalFlags: flags,
    confidenceLevel,
    drivers,
    priceExplanation:
      "Diese vorläufige Einschätzung basiert auf Bestand, Laufzeit, Sicherheitsanforderungen und Zusatzleistungen.",
    pricingSignals: makeSignals("akteneinlagerung", drivers, {
      boxCount: boxes,
      shelfMeters: meters,
      durationMonths: months,
      pickupRequired: !!data.pickupRequired,
      securityShredding: !!data.securityShredding,
      digitalization: !!data.digitalization,
      insuranceValue: Math.round(data.insuranceValue),
    }),
    cbm: boxes * 0.06 + meters * 0.4,
  });
}
