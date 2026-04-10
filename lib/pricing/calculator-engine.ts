import {
  UmzugAdvancedData,
  ReinigungAdvancedData,
  EntsorgungAdvancedData,
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
  return Math.max(5, areaM2 * 0.4);
}

// EXPRESS CALCULATION
export function calculateUmzugExpress(
  data: UmzugExpressData,
  base: BaseDetails
): PriceRange {
  const areaM2 = Math.max(0, num(data.areaM2, 0));
  const cbm = getAreaToVolume(areaM2);
  const laborCost = cbm * 35;
  const fixedCost = 150;
  const distanceKm = getDistanceKm(base, 15);
  const distanceCost = distanceKm * 1.5;

  let price = fixedCost + laborCost + distanceCost;

  const fromFloor = Math.max(0, num(data.fromFloor, 0));
  const toFloor = Math.max(0, num(data.toFloor, 0));

  if (fromFloor > 0 && !data.hasElevatorFrom) price += fromFloor * 25;
  if (toFloor > 0 && !data.hasElevatorTo) price += toFloor * 25;

  price = minPrice(price, 250);

  return createPriceRange(price, 1.25);
}

export function calculateReinigungExpress(
  data: ReinigungExpressData
): PriceRange {
  const area = Math.max(0, num(data.areaM2, 0));
  let price = Math.max(120, area * 4.5);

  if (data.propertyType === "haus") price *= 1.15;
  if (data.propertyType === "buero") price *= 1.1;

  let conditionMultiplier = 1;
  if (data.condition === "mittel") conditionMultiplier = 1.3;
  if (data.condition === "stark") conditionMultiplier = 1.6;

  price *= conditionMultiplier;

  return createPriceRange(price, 1.2);
}

export function calculateEntsorgungExpress(
  data: EntsorgungExpressData
): PriceRange {
  const volume = Math.max(0, num(data.wasteVolumeM3, 0));
  let price = 90 + volume * 40;

  let accessMultiplier = 1;
  if (data.accessDifficulty === "mittel") accessMultiplier = 1.2;
  if (data.accessDifficulty === "schwer") accessMultiplier = 1.4;

  price *= accessMultiplier;

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
  let uncertaintyMultiplier = 1.15;

  const areaM2 = Math.max(0, num(data.areaM2, 0));
  let cbm = getAreaToVolume(areaM2 || 50);

  if (!areaM2) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "low");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.4);
    flags.push(
      dic?.calculator?.flag_area_missing ||
      "Wohnfläche für genaueres Volumen ergänzen"
    );
  } else if (data.uncertainVolume) {
    confidenceLevel = downgradeConfidence(confidenceLevel, "medium");
    uncertaintyMultiplier = Math.max(uncertaintyMultiplier, 1.3);
    flags.push(
      dic?.calculator?.flag_uncertain_volume ||
      "Kunde wünscht persönliche Beratung zum Volumen"
    );
  }

  if (Array.isArray(data.furnitureList) && data.furnitureList.length > 0) {
    cbm += data.furnitureList.length * 1.2;
  }

  const laborCost = cbm * 35;
  const fixedCost = 150;
  const distanceKm = Math.max(
    0,
    num(data.distanceKm, 0) || getDistanceKm(base, 15)
  );
  const distanceCost = distanceKm * 1.5;

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

  price = minPrice(price, 250);

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

  let price = Math.max(120, area * 4.5);

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

  let price = 90 + expectedVolume * 40;

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

  price = minPrice(price, 90);

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