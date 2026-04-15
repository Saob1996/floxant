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

function roundPrice(value: number): number {
  return Math.round(Math.max(0, value));
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

function createPriceRange(basePrice: number, multiplier: number): PriceRange {
  const min = roundPrice(basePrice);
  const max = roundPrice(basePrice * multiplier);
  return {
    min,
    max: Math.max(min, max),
  };
}

function formatHours(minHours: number, maxHours: number, dic?: any): string {
  return `${dic?.common?.ca || "ca."} ${minHours} - ${maxHours} ${dic?.common?.hours || "Std."}`;
}

function getDistanceKm(base?: BaseDetails, fallback = 15): number {
  return Math.max(0, num(base?.distance, fallback));
}

function getAreaToVolume(areaM2: number): number {
  return Math.max(2, areaM2 * 0.35); // Slightly reduced multiplier for base volume
}

function getCityMultiplier(address: string): number {
  const addr = address.toLowerCase();
  if (addr.includes("münchen") || addr.includes("munich")) return 1.15;
  if (
    addr.includes("nürnberg") ||
    addr.includes("nuremberg") ||
    addr.includes("augsburg")
  )
    return 1.05;
  if (addr.includes("regensburg") || addr.includes("passau")) return 1.02;
  return 1.0;
}

function getSeasonalMultiplier(): number {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth(); // 0-indexed

  let mult = 1.0;

  // End of month / Start of month peak
  if (day >= 25 || day <= 5) mult += 0.1;

  // Summer peak
  if (month >= 5 && month <= 7) mult += 0.05;

  return Number(mult.toFixed(2));
}

function getGlobalMultiplier(base?: BaseDetails): number {
  const cityMult = getCityMultiplier(base?.fromAddress || "");
  const seatMult = getSeasonalMultiplier();
  return cityMult * seatMult;
}

// EXPRESS CALCULATION
export function calculateUmzugExpress(
  data: UmzugExpressData,
  base: BaseDetails
): PriceRange {
  const areaM2 = Math.max(0, num(data.areaM2, 0));
  const cbm = getAreaToVolume(areaM2);
  const laborCost = cbm * 29; // Reduced from 35 for competitive Basis price
  const fixedCost = 120; // Reduced from 150
  const distanceKm = getDistanceKm(base, 15);
  const distanceCost = distanceKm * 1.2; // Reduced from 1.5

  let price = fixedCost + laborCost + distanceCost;

  const fromFloor = Math.max(0, num(data.fromFloor, 0));
  const toFloor = Math.max(0, num(data.toFloor, 0));

  if (fromFloor > 0 && !data.hasElevatorFrom) price += fromFloor * 25;
  if (toFloor > 0 && !data.hasElevatorTo) price += toFloor * 25;

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 220);

  return createPriceRange(price, 1.25);
}

export function calculateReinigungExpress(
  data: ReinigungExpressData
): PriceRange {
  const area = Math.max(0, num(data.areaM2, 0));
  let price = Math.max(99, area * 3.8); // Reduced from 120 and 4.5

  if (data.propertyType === "haus") price *= 1.15;
  if (data.propertyType === "buero") price *= 1.1;

  let conditionMultiplier = 1;
  if (data.condition === "mittel") conditionMultiplier = 1.3;
  if (data.condition === "stark") conditionMultiplier = 1.6;

  price *= conditionMultiplier;
  price *= getSeasonalMultiplier();

  return createPriceRange(price, 1.2);
}

export function calculateEntsorgungExpress(
  data: EntsorgungExpressData
): PriceRange {
  const volume = Math.max(0, num(data.wasteVolumeM3, 0));
  let price = 79 + volume * 34; // Reduced from 90 and 40

  let accessMultiplier = 1;
  if (data.accessDifficulty === "mittel") accessMultiplier = 1.2;
  if (data.accessDifficulty === "schwer") accessMultiplier = 1.4;

  price *= accessMultiplier;
  price *= getGlobalMultiplier();

  return createPriceRange(price, 1.3);
}

// ADVANCED CALCULATION
export function calculateUmzugAdvanced(
  data: UmzugAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  let confidenceLevel: ConfidenceLevel = "high";
  let uncertaintyMultiplier = 1.12;

  const areaM2 = Math.max(0, num(data.areaM2, 0));
  let cbm = getAreaToVolume(areaM2 || 40);

  if (!areaM2) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "low");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.35);
    flags.push(
      dic?.calculator?.flag_area_missing ||
      "Wohnfläche für genaueres Volumen ergänzen"
    );
  } else if (data.uncertainVolume) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.25);
    flags.push(
      dic?.calculator?.flag_uncertain_volume ||
      "Kunde wünscht persönliche Beratung zum Volumen"
    );
  }

  // Visual Furniture Estimator - CBM values
  const FURNITURE_VOLUMES: Record<string, number> = {
    "sofa-2": 1.5,
    "sofa-3": 2.2,
    "bed-s": 1.5,
    "bed-d": 3.0,
    "table": 0.8,
    "chair": 0.2,
    "wardrobe-1": 1.2,
    "wardrobe-2": 2.4,
    "tv-bench": 0.5,
    "fridge": 1.0,
    "washing": 0.8,
    "shelf": 0.6,
  };

  if (Array.isArray(data.furnitureList) && data.furnitureList.length > 0) {
    let furnitureCbm = 0;
    data.furnitureList.forEach(item => {
      furnitureCbm += FURNITURE_VOLUMES[item] || 0.8; // Default 0.8 if unknown
    });
    
    // If furniture list is long, it becomes more reliable than area calculation
    if (data.furnitureList.length > 5) {
       cbm = (cbm * 0.4) + (furnitureCbm * 0.8);
       confidenceLevel = "high";
    } else {
       cbm += furnitureCbm * 0.5;
    }
  }

  const laborCost = cbm * 42; // Premium labor rate
  const fixedCost = 249; // Professional truck & logistics base
  const distanceKm = Math.max(
    0,
    num(data.distanceKm, 0) || getDistanceKm(base, 15)
  );
  const distanceCost = distanceKm * 1.8;

  let price = fixedCost + laborCost + distanceCost;

  const fromFloor = Math.max(0, num(data.fromFloor, 0));
  const toFloor = Math.max(0, num(data.toFloor, 0));
  const rooms = Math.max(1, num(data.rooms, 2));
  const boxesCount = Math.max(0, num(data.boxesCount, 0));

  if (fromFloor > 0 && !data.hasElevatorFrom) {
    price += fromFloor * 25;
    if (fromFloor > 3) {
      flags.push(
        dic?.calculator?.flag_trageservice_auszug ||
        "Auszug: Trageservice 4.+ Etage berücksichtigt"
      );
    }
  }

  if (toFloor > 0 && !data.hasElevatorTo) {
    price += toFloor * 25;
    if (toFloor > 3) {
      flags.push(
        dic?.calculator?.flag_trageservice_einzug ||
        "Einzug: Trageservice 4.+ Etage berücksichtigt"
      );
    }
  }

  price += boxesCount * 2.5;

  if (Array.isArray(data.heavyItems) && data.heavyItems.length > 0) {
    flags.push(
      `${dic?.calculator?.flag_heavy_transport || "Schwertransport eingeplant"}: ${data.heavyItems.join(", ")}`
    );

    data.heavyItems.forEach((item) => {
      const value = item.toLowerCase();
      if (value.includes("flügel")) price += 350;
      else if (value.includes("piano") || value.includes("klavier")) price += 180;
      else if (value.includes("safe") || value.includes("tresor")) price += 150;
      else if (value.includes("aquarium")) price += 100;
      else if (value.includes("fitness")) price += 80;
    });
  }

  if (data.packingService) {
    price += cbm * 18;
    flags.push(dic?.calculator?.flag_packing_service || "Einpackservice gebucht");
  }

  if (data.unpackingService) {
    price += cbm * 15;
    flags.push(
      dic?.calculator?.flag_unpacking_service || "Auspackservice gebucht"
    );
  }

  if (data.disassemblyService) {
    price += rooms * 45;
    flags.push(
      dic?.calculator?.flag_disassembly_service || "Möbeldemontage gebucht"
    );
  }

  if (data.assemblyService) {
    price += rooms * 45;
    flags.push(dic?.calculator?.flag_assembly_service || "Möbelmontage gebucht");
  }

  if (data.kitchenAssembly) {
    price += 350;
    flags.push(
      dic?.calculator?.flag_kitchen_assembly ||
      "Küchendemontage/-montage notiert"
    );
  }

  const walkingDistanceFrom = Math.max(0, num(data.walkingDistanceFrom, 0));
  const walkingDistanceTo = Math.max(0, num(data.walkingDistanceTo, 0));

  if (walkingDistanceFrom > 20 || data.courtyardAccessFrom) {
    const extraDistance = data.courtyardAccessFrom
      ? 30
      : walkingDistanceFrom - 20;
    price += extraDistance * 1.5;
    flags.push(
      data.courtyardAccessFrom
        ? dic?.calculator?.flag_difficult_access_from ||
        "Auszug: Erschwerter Zugang (Innenhof)"
        : `${dic?.calculator?.flag_walking_distance_from || "Auszug: Laufweg"} ${walkingDistanceFrom}m`
    );
  }

  if (walkingDistanceTo > 20 || data.courtyardAccessTo) {
    const extraDistance = data.courtyardAccessTo ? 30 : walkingDistanceTo - 20;
    price += extraDistance * 1.5;
    flags.push(
      data.courtyardAccessTo
        ? dic?.calculator?.flag_difficult_access_to ||
        "Einzug: Erschwerter Zugang (Innenhof)"
        : `${dic?.calculator?.flag_walking_distance_to || "Einzug: Laufweg"} ${walkingDistanceTo}m`
    );
  }

  if (data.narrowStairsFrom) {
    price += 100;
    flags.push(
      dic?.calculator?.flag_narrow_stairs_from ||
      "Auszug: Enges Treppenhaus (Tragezuschlag)"
    );
  }

  if (data.narrowStairsTo) {
    price += 100;
    flags.push(
      dic?.calculator?.flag_narrow_stairs_to ||
      "Einzug: Enges Treppenhaus (Tragezuschlag)"
    );
  }

  if (data.noParkingZoneFrom) {
    price += 90;
    flags.push(
      dic?.calculator?.flag_no_parking_from ||
      "Auszug: Halteverbotszone inkl. Anmeldung"
    );
  }

  if (data.noParkingZoneTo) {
    price += 90;
    flags.push(
      dic?.calculator?.flag_no_parking_to ||
      "Einzug: Halteverbotszone inkl. Anmeldung"
    );
  }

  if (data.timeConstraint === "genaues_datum") {
    price *= 1.1;
    flags.push(
      dic?.calculator?.flag_time_guarantee ||
      "Termingarantie für Wunschdatum eingepreist"
    );
  } else if (data.timeConstraint === "wochenende") {
    price *= 1.2;
    flags.push(dic?.calculator?.flag_weekend_surcharge || "Wochenendzuschlag");
  } else if (data.timeConstraint === "dringend") {
    price *= 1.3;
    flags.push(
      dic?.calculator?.flag_urgent_surcharge ||
      "Dringender Termin (Expresszuschlag einkalkuliert)"
    );
  }

  if (data.isPartialMove) {
    price *= 0.65;
    flags.push(
      dic?.calculator?.flag_partial_move ||
      "Teilleistung / Beiladung berücksichtigt"
    );
  }

  if (text(data.freeTextNote)) {
    flags.push(
      dic?.calculator?.flag_notes_noted ||
      "Ihren persönlichen Text-Vermerk haben wir notiert"
    );
  }

  price = minPrice(price, 350); // Minimum Order Value for Professional Moving
  price *= getGlobalMultiplier(base);

  let teamSize = dic?.calculator?.team_2_persons || "2 Personen";
  if (cbm > 20) teamSize = dic?.calculator?.team_3_persons || "3 Personen";
  if (cbm > 40) teamSize = dic?.calculator?.team_4_persons || "4 Personen";

  const hours = Math.max(3, Math.round(cbm / 4));

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: formatHours(hours, hours + 2, dic),
    recommendedTeam: teamSize,
    calculationBasis: `${Math.round(cbm)} m³ ${dic?.calculator?.volume || "Volumen"} | ≈${distanceKm} km ${dic?.calculator?.distance || "Distanz"}`,
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
    cbm: Math.round(cbm),
  };
}

export function calculateReinigungAdvanced(
  data: ReinigungAdvancedData,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  let confidenceLevel: ConfidenceLevel = "high";
  let uncertaintyMultiplier = 1.15;

  const rawArea = Math.max(0, num(data.areaM2, 0));
  const area = rawArea || 60;

  if (!rawArea) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "low");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.4);
    flags.push(
      dic?.calculator?.flag_cleaning_area_missing ||
      "Fläche für genauere Schätzung ergänzen"
    );
  }

  if (data.uncertainCondition) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.3);
  }

  let m2Rate = 4.8;
  if (area < 40) m2Rate = 6.5;
  else if (area < 80) m2Rate = 5.2;
  else if (area > 150) m2Rate = 3.9;

  let price = Math.max(149, area * m2Rate);

  if (data.propertyType === "haus") {
    price *= 1.15;
    flags.push(
      dic?.calculator?.flag_house_surcharge || "Hauszuschlag für Treppen/Flure"
    );
  } else if (data.propertyType === "buero") {
    price *= 1.1;
    flags.push(
      dic?.calculator?.flag_commercial_structure ||
      "Gewerbliche Objektstruktur berücksichtigt"
    );
  }

  let conditionMultiplier = 1;
  if (data.condition === "mittel") conditionMultiplier = 1.3;
  if (data.condition === "stark") {
    conditionMultiplier = 1.6;
    flags.push(dic?.calculator?.flag_heavy_dirt || "Reinigungsgrad: Stark");
  }

  price *= conditionMultiplier;
  price += Math.max(0, num(data.windowsCount, 0)) * 12;

  if (Array.isArray(data.extras)) {
    data.extras.forEach((extra) => {
      if (extra === "kueche_tiefenreinigung") {
        price += 70;
        flags.push(
          dic?.calculator?.flag_kitchen_deep_clean ||
          "Inkl. Küche Tiefenreinigung"
        );
      }

      if (extra === "bad_kalk") {
        price += 45;
        flags.push(
          dic?.calculator?.flag_bad_lime || "Inkl. Bad Intensiventkalkung"
        );
      }

      if (extra === "teppich") {
        price += area * 1.5;
        flags.push(
          dic?.calculator?.flag_carpet_cleaning || "Inkl. Teppichreinigung"
        );
      }
    });
  }

  if (data.isFurnished) {
    price *= 1.2;
    flags.push(
      dic?.calculator?.flag_furnished_extra ||
      "Objekt ist möbliert (Mehraufwand einkalkuliert)"
    );
  }

  if (data.keysHandover) {
    price += 25;
    flags.push(dic?.calculator?.flag_keys_handover || "Schlüsselübergabe separat");
  }

  if (data.cleaningGuarantee) {
    price += 50;
    flags.push(
      dic?.calculator?.flag_handover_guarantee ||
      "Inklusive Abnahmegarantie für Vermieter"
    );
  }

  if (data.frequency === "regelmaessig") {
    price *= 0.85;
    flags.push(
      dic?.calculator?.flag_regular_discount ||
      "Dauerauftrag-Rabatt angewendet"
    );
  }

  if (text(data.freeTextNote)) {
    flags.push(dic?.calculator?.flag_notes_noted || "Ihren Kommentar haben wir notiert");
  }

  price = minPrice(price, 120);
  price *= getSeasonalMultiplier();

  let teamSize = dic?.calculator?.person_1 || "1 Person";
  if (area > 80) teamSize = dic?.calculator?.team_2_persons || "2 Personen";
  if (area > 150) teamSize = dic?.calculator?.team_3_persons || "3 Personen";

  const hours = Math.max(2, Math.round(area / 20));

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: formatHours(hours, hours + 2, dic),
    recommendedTeam: teamSize,
    calculationBasis: `${area} m² ${dic?.calculator?.living_area || "Fläche"} | ${dic?.calculator?.condition_level || "Zustand"}: ${data.condition}`,
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
  };
}

export function calculateEntsorgungAdvanced(
  data: EntsorgungAdvancedData,
  dic?: any
): AdvancedEstimate {
  const flags: string[] = [];
  let confidenceLevel: ConfidenceLevel = "high";
  let uncertaintyMultiplier = 1.25;

  const rawVolume = Math.max(0, num(data.wasteVolumeM3, 0));
  const expectedVolume = rawVolume || 3;

  if (!rawVolume) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "low");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.5);
    flags.push(
      dic?.calculator?.flag_waste_volume_missing ||
      "Volumenangabe empfohlen für präziseren Preis"
    );
  }

  if (data.uncertainVolume) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.4);
  }

  let price = 149 + expectedVolume * 45; // Increased disposal handling fee

  if (Array.isArray(data.wasteCategories) && data.wasteCategories.length > 0) {
    data.wasteCategories.forEach((cat) => {
      const value = cat.toLowerCase();

      if (value.includes("bauschutt")) {
        price += expectedVolume * 25;
        flags.push(
          dic?.calculator?.flag_construction_waste ||
          "Zuschlag: Bauschuttdeponie"
        );
      }

      if (value.includes("elektro")) {
        price += 40;
        flags.push(
          dic?.calculator?.flag_e_waste || "Elektro-Recycling eingeplant"
        );
      }

      if (value.includes("gruenschnitt")) {
        price -= expectedVolume * 5;
        flags.push(dic?.calculator?.flag_green_waste || "Grünschnitt/Bio (Vergünstigt)");
      }
    });
  }

  let accessMultiplier = 1;
  if (data.accessDifficulty === "mittel") accessMultiplier = 1.2;
  if (data.accessDifficulty === "schwer") {
    accessMultiplier = 1.4;
    flags.push(
      dic?.calculator?.flag_difficult_access ||
      "Schwerer Zugang (Extra Tragezeit kalkuliert)"
    );
  }

  price *= accessMultiplier;

  if (data.hazardMaterials) {
    price *= 1.5;
    flags.push(
      dic?.calculator?.flag_hazard_materials ||
      "Potenzielle Gefahrstoffe vorgemerkt"
    );
  }

  const loadingDistanceMeters = Math.max(0, num(data.loadingDistanceMeters, 0));
  if (loadingDistanceMeters > 20) {
    price += (loadingDistanceMeters - 20) * 1.5;
    flags.push(
      `${dic?.calculator?.flag_loading_path || "Trageweg Laufstrecke"}: ${loadingDistanceMeters}m`
    );
  }

  if (data.disassemblyRequired) {
    price += 50 + expectedVolume * 10;
    flags.push(
      dic?.calculator?.flag_disassembly_on_site || "Inkl. Demontage vor Ort"
    );
  }

  if (data.urgency === "dringend") {
    price *= 1.35;
    flags.push(
      dic?.calculator?.flag_express_service || "Express-Service (Dringend)"
    );
  }

  if (text(data.freeTextNote)) {
    flags.push(
      dic?.calculator?.flag_waste_notes_noted ||
      "Ihre Notiz speichern wir für die Planung"
    );
  }

  price = minPrice(price, 180); // Professional disposal minimum
  price *= getGlobalMultiplier();

  let teamSize = dic?.calculator?.team_2_persons || "2 Personen";
  if (expectedVolume > 15) teamSize = dic?.calculator?.team_3_persons || "3 Personen";

  const hours = Math.max(1, Math.round(expectedVolume / 3));

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: formatHours(hours, hours + 1, dic),
    recommendedTeam: teamSize,
    calculationBasis: `${expectedVolume} m³ ${dic?.calculator?.disposal_item || "Entsorgungsgut"}`,
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
  };
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
  const cbm = workstations * 4.5; // Average 4.5cbm per workstation including desk, chair, storage

  let price = 300 + workstations * 180; // Basic logistics + per workstation fee

  if (data.itSetup) {
    price += workstations * 45;
    flags.push(dic?.calculator?.flag_office_it_setup || "IT-Infrastruktur Spezialtransport eingeplant");
  }

  const archiveMeters = Math.max(0, num(data.archiveMeters, 0));
  if (archiveMeters > 0) {
    price += archiveMeters * 35;
    flags.push(`${dic?.calculator?.archive_meters || "Archivmeter"}: ${archiveMeters}m`);
  }

  if (data.packingService) {
    price += cbm * 15;
  }

  if (data.disassemblyService) {
    price += workstations * 30;
  }

  if (data.assemblyService) {
    price += workstations * 30;
  }

  const distanceKm = Math.max(0, num(base?.distance, 15));
  price += distanceKm * 2.5;

  const walkingDistanceFrom = Math.max(0, num(data.walkingDistanceFrom, 15));
  const walkingDistanceTo = Math.max(0, num(data.walkingDistanceTo, 15));

  if (walkingDistanceFrom > 20) price += (walkingDistanceFrom - 20) * 2;
  if (walkingDistanceTo > 20) price += (walkingDistanceTo - 20) * 2;

  if (data.noParkingZoneFrom) price += 95;
  if (data.noParkingZoneTo) price += 95;

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 500);

  const teamSize = workstations <= 5 ? "2-3 Personen" : workstations <= 15 ? "4-6 Personen" : "8+ Personen";
  const hours = Math.ceil(workstations * 2.5);

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: formatHours(hours, hours + 4, dic),
    recommendedTeam: teamSize,
    calculationBasis: `${workstations} ${dic?.calculator?.workstations || "Arbeitsplätze"} | ${Math.round(cbm)} m³`,
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
    cbm: Math.round(cbm),
  };
}

export function calculateSeniorenumzugAdvanced(
  data: SeniorenumzugAdvancedData,
  base: BaseDetails,
  dic?: any
): AdvancedEstimate {
  // Seniorenumzug is a wrapper around Umzug with premium defaults and care package
  const baseResult = calculateUmzugAdvanced(data, base, dic);
  
  if (data.seniorCarePackage) {
    const careSurcharge = 250; // Premium service surcharge for senior assistance
    baseResult.priceRange.min += careSurcharge;
    baseResult.priceRange.max += careSurcharge;
    baseResult.operationalFlags.push(dic?.calculator?.flag_senior_care || "Senioren-Begleitpaket (Sorglos) aktiviert");
  }

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

  let price = data.pianoType === "grand" ? 350 : 180;
  
  const fromFloor = Math.max(0, num(data.fromFloor, 0));
  const toFloor = Math.max(0, num(data.toFloor, 0));

  if (fromFloor > 0 && !data.hasElevatorFrom) {
    price += fromFloor * 40;
  }
  if (toFloor > 0 && !data.hasElevatorTo) {
    price += toFloor * 40;
  }

  const distanceKm = Math.max(0, num(data.distanceKm, 10));
  price += distanceKm * 2;

  flags.push(dic?.calculator?.flag_piano_special || "Klavier/Flügel Speziallogistik (Schlitten & Schutz)");

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 220);

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: "2 - 4 Std.",
    recommendedTeam: "2-3 Personen",
    calculationBasis: data.pianoType === "grand" ? "Flügel" : "Klavier (Hock)",
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
  };
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
  
  const monthlyRate = volume * 18;
  let price = monthlyRate * months;

  if (data.pickupRequired) {
    const pickupFee = 150 + volume * 25;
    price += pickupFee;
    flags.push(dic?.calculator?.flag_storage_pickup || "Inkl. Abholung und Einlagerungsservice");
  }

  if (data.insuranceValue > 5000) {
    price += (data.insuranceValue - 5000) * 0.002;
    flags.push(dic?.calculator?.flag_storage_insurance || "Zusatzversicherung für Lagergut");
  }

  flags.push(`${dic?.calculator?.storage_volume || "Lagervolumen"}: ${volume} m³ | ${dic?.calculator?.duration || "Dauer"}: ${months} ${dic?.common?.months || "Monate"}`);

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 150);

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: "Voraussichtliche Mietdauer: " + months + " Monate",
    recommendedTeam: data.pickupRequired ? "2 Personen (Abholung)" : "Self-Storage",
    calculationBasis: `${volume} m³ Storage | ${months} Monate`,
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
    cbm: volume,
  };
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
    flags.push(dic?.calculator?.flag_painting_ceiling || "Inkl. Deckenanstrich");
  }

  if (data.includesDoors) {
    price += 80 * 2;
    flags.push(dic?.calculator?.flag_painting_doors || "Inkl. Türen/Rahmen lackieren");
  }

  if (data.isFurnished) {
    price *= 1.25;
    flags.push(dic?.calculator?.flag_painting_furnished || "Möbliert (Mehraufwand für Abdecken/Rücken)");
  }

  flags.push(`${dic?.calculator?.painting_area || "Anstrichfläche"}: ~${area} m²`);

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 250);

  const hours = Math.max(4, Math.ceil(area / 10));

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: formatHours(hours, hours + 6, dic),
    recommendedTeam: area > 100 ? "2-3 Personen" : "1-2 Personen",
    calculationBasis: `${area} m² Wandfläche | Qualität: ${data.paintQuality}`,
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
  };
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

  const monthlyRate = (boxes * 1.8) + (meters * 12);
  let price = monthlyRate * months;

  if (months >= 12) {
    price *= 0.9;
    flags.push(dic?.calculator?.flag_longterm_discount || "Langzeit-Rabatt angewendet (>12 Mon.)");
  }

  if (data.pickupRequired) {
    const pickupFee = 45 + (boxes * 0.6) + (meters * 4);
    price += pickupFee;
    flags.push(dic?.calculator?.flag_secure_pickup || "Sicherheits-Abholung durch Fachpersonal");
  }

  if (data.securityShredding) {
    const shredFee = (boxes * 15) + (meters * 25);
    price += shredFee;
    flags.push(dic?.calculator?.flag_secure_destruction || "Inkl. zertifizierter Aktenvernichtung");
  }

  if (data.digitalization) {
    const scanFee = 85 + (meters * 150) + (boxes * 20);
    price += scanFee;
    flags.push(dic?.calculator?.flag_digitalization || "Inkl. Scan-on-Demand & Digitalisierung");
  }

  if (data.insuranceValue > 10000) {
    price += (data.insuranceValue - 10000) * 0.0015;
    flags.push(dic?.calculator?.flag_archive_insurance || "Spezial-Versicherung für Dokumente");
  }

  flags.push(`${dic?.calculator?.storage_volume || "Bestand"}: ${boxes} Boxen | ${meters} lfm`);

  price *= getGlobalMultiplier(base);
  price = minPrice(price, 180);

  return {
    priceRange: createPriceRange(price, uncertaintyMultiplier),
    estimatedHours: "Mietdauer: " + months + " Monate",
    recommendedTeam: "B2B Logistik-Team",
    calculationBasis: `${boxes} Boxen / ${meters} lfm Archive Storage`,
    operationalFlags: uniqueFlags(flags),
    confidenceLevel,
    cbm: (boxes * 0.06) + (meters * 0.4),
  };
}
