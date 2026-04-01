import { 
  UmzugAdvancedData, 
  ReinigungAdvancedData, 
  EntsorgungAdvancedData, 
  BaseDetails,
  UmzugExpressData,
  ReinigungExpressData,
  EntsorgungExpressData
} from '@/store/calculatorStore';

export interface PriceRange {
  min: number;
  max: number;
}

// EXPRESS CALCULATION
export function calculateUmzugExpress(data: UmzugExpressData, base: BaseDetails): PriceRange {
  const cbm = Math.max(5, data.areaM2 * 0.4); 
  let laborCost = cbm * 35;
  let fixedCost = 150; 
  let dist = base.distance || 15;
  let distanceCost = dist * 1.5;

  let minPrice = fixedCost + laborCost + distanceCost;
  
  if (data.fromFloor && data.fromFloor > 0 && !data.hasElevatorFrom) minPrice += data.fromFloor * 25;
  if (data.toFloor && data.toFloor > 0 && !data.hasElevatorTo) minPrice += data.toFloor * 25;

  if (minPrice < 250) minPrice = 250;

  return { min: Math.round(minPrice), max: Math.round(minPrice * 1.25) };
}

export function calculateReinigungExpress(data: ReinigungExpressData): PriceRange {
  let minPrice = Math.max(120, data.areaM2 * 4.5);
  
  // Property Type adjustments
  if (data.propertyType === 'haus') minPrice *= 1.15;
  if (data.propertyType === 'buero') minPrice *= 1.10;

  let conditionMultiplier = 1;
  if (data.condition === 'mittel') conditionMultiplier = 1.3;
  if (data.condition === 'stark') conditionMultiplier = 1.6;
  minPrice = minPrice * conditionMultiplier;

  return { min: Math.round(minPrice), max: Math.round(minPrice * 1.2) };
}

export function calculateEntsorgungExpress(data: EntsorgungExpressData): PriceRange {
  let minPrice = 90 + data.wasteVolumeM3 * 40;
  
  let accessMultiplier = 1;
  if (data.accessDifficulty === 'mittel') accessMultiplier = 1.2;
  if (data.accessDifficulty === 'schwer') accessMultiplier = 1.4;
  minPrice = minPrice * accessMultiplier;

  return { min: Math.round(minPrice), max: Math.round(minPrice * 1.3) };
}

// ADVANCED CALCULATION
export function calculateUmzugAdvanced(data: UmzugAdvancedData, base: BaseDetails, dic?: any) {
  const flags: string[] = [];
  let confidenceLevel: 'high' | 'medium' | 'low' = 'high';
  let uncertaintyMultiplier = 1.15; 

  let cbm = Math.max(5, (data.areaM2 || 50) * 0.4); 
  if (data.areaM2 === 0 || !data.areaM2) {
    confidenceLevel = 'low';
    uncertaintyMultiplier = 1.4; 
    flags.push(dic?.calculator?.flag_area_missing || "Wohnfläche für genaueres Volumen ergänzen");
  } else if (data.uncertainVolume) {
    confidenceLevel = 'medium';
    uncertaintyMultiplier = 1.3;
    flags.push(dic?.calculator?.flag_uncertain_volume || "Kunde wünscht persönliche Beratung zum Volumen");
  }

  if (data.furnitureList && data.furnitureList.length > 0) {
      cbm += data.furnitureList.length * 1.2;
  }
  
  let laborCost = cbm * 35;
  let fixedCost = 150; 
  let dist = data.distanceKm || base.distance || 15;
  let distanceCost = dist * 1.5;

  let price = fixedCost + laborCost + distanceCost;
  
  if (data.fromFloor && data.fromFloor > 0 && !data.hasElevatorFrom) {
    price += data.fromFloor * 25;
    if (data.fromFloor > 3) flags.push(dic?.calculator?.flag_trageservice_auszug || "Auszug: Trageservice 4.+ Etage berücksichtigt");
  }
  if (data.toFloor && data.toFloor > 0 && !data.hasElevatorTo) {
    price += data.toFloor * 25;
    if (data.toFloor > 3) flags.push(dic?.calculator?.flag_trageservice_einzug || "Einzug: Trageservice 4.+ Etage berücksichtigt");
  }

  price += data.boxesCount * 2.5; 
  
  if (data.heavyItems && data.heavyItems.length > 0) {
    flags.push(`${dic?.calculator?.flag_heavy_transport || "Schwertransport eingeplant"}: ${data.heavyItems.join(', ')}`);
    data.heavyItems.forEach(item => {
      const i = item.toLowerCase();
      if (i.includes('flügel')) price += 350;
      else if (i.includes('piano') || i.includes('klavier')) price += 180;
      else if (i.includes('safe') || i.includes('tresor')) price += 150;
      else if (i.includes('aquarium')) price += 100;
      else if (i.includes('fitness')) price += 80;
    });
  }

  if (data.packingService) { price += cbm * 18; flags.push(dic?.calculator?.flag_packing_service || "Einpackservice gebucht"); }
  if (data.unpackingService) { price += cbm * 15; flags.push(dic?.calculator?.flag_unpacking_service || "Auspackservice gebucht"); }
  if (data.disassemblyService) { price += (data.rooms || 2) * 45; flags.push(dic?.calculator?.flag_disassembly_service || "Möbeldemontage gebucht"); }
  if (data.assemblyService) { price += (data.rooms || 2) * 45; flags.push(dic?.calculator?.flag_assembly_service || "Möbelmontage gebucht"); }
  if (data.kitchenAssembly) {
     price += 350;
     flags.push(dic?.calculator?.flag_kitchen_assembly || "Küchendemontage/-montage notiert");
  }

  if (data.walkingDistanceFrom > 20 || data.courtyardAccessFrom) {
     const extraDistance = data.courtyardAccessFrom ? 30 : (data.walkingDistanceFrom - 20);
     price += extraDistance * 1.5;
     flags.push(data.courtyardAccessFrom ? (dic?.calculator?.flag_difficult_access_from || "Auszug: Erschwerter Zugang (Innenhof)") : `${dic?.calculator?.flag_walking_distance_from || "Auszug: Laufweg"} ${data.walkingDistanceFrom}m`);
  }
  if (data.walkingDistanceTo > 20 || data.courtyardAccessTo) {
     const extraDistance = data.courtyardAccessTo ? 30 : (data.walkingDistanceTo - 20);
     price += extraDistance * 1.5;
     flags.push(data.courtyardAccessTo ? (dic?.calculator?.flag_difficult_access_to || "Einzug: Erschwerter Zugang (Innenhof)") : `${dic?.calculator?.flag_walking_distance_to || "Einzug: Laufweg"} ${data.walkingDistanceTo}m`);
  }

  if (data.narrowStairsFrom) {
    price += 100;
    flags.push(dic?.calculator?.flag_narrow_stairs_from || "Auszug: Enges Treppenhaus (Tragezuschlag)");
  }
  if (data.narrowStairsTo) {
    price += 100;
    flags.push(dic?.calculator?.flag_narrow_stairs_to || "Einzug: Enges Treppenhaus (Tragezuschlag)");
  }

  if (data.noParkingZoneFrom) {
     price += 90;
     flags.push(dic?.calculator?.flag_no_parking_from || "Auszug: Halteverbotszone inkl. Anmeldung");
  }
  if (data.noParkingZoneTo) {
     price += 90;
     flags.push(dic?.calculator?.flag_no_parking_to || "Einzug: Halteverbotszone inkl. Anmeldung");
  }

  if (data.timeConstraint === 'genaues_datum') {
     price *= 1.10;
     flags.push(dic?.calculator?.flag_time_guarantee || "Termingarantie für Wunschdatum eingepreist");
  } else if (data.timeConstraint === 'wochenende') {
     price *= 1.20;
     flags.push(dic?.calculator?.flag_weekend_surcharge || "Wochenendzuschlag");
  } else if (data.timeConstraint === 'dringend') {
     price *= 1.30;
     flags.push(dic?.calculator?.flag_urgent_surcharge || "Dringender Termin (Expresszuschlag einkalkuliert)");
  }
  
  if (data.isPartialMove) {
     price *= 0.65;
     flags.push(dic?.calculator?.flag_partial_move || "Teilleistung / Beiladung berücksichtigt");
  }

  if (price < 250) price = 250;
  
  let teamSize = dic?.calculator?.team_2_persons || "2 Personen";
  if (cbm > 20) teamSize = dic?.calculator?.team_3_persons || "3 Personen";
  if (cbm > 40) teamSize = dic?.calculator?.team_4_persons || "4 Personen";
  let hours = Math.max(3, Math.round(cbm / 4));

  if (data.freeTextNote) flags.push(dic?.calculator?.flag_notes_noted || "Ihren persönlichen Text-Vermerk haben wir notiert");

  return {
    priceRange: { min: Math.round(price), max: Math.round(price * uncertaintyMultiplier) },
    estimatedHours: `${dic?.common?.ca || 'ca.'} ${hours} - ${hours + 2} ${dic?.common?.hours || 'Std.'}`,
    recommendedTeam: teamSize,
    calculationBasis: `${Math.round(cbm)} m³ ${dic?.calculator?.volume || 'Volumen'} | ≈${dist} km ${dic?.calculator?.distance || 'Distanz'}`,
    operationalFlags: [...new Set(flags)],
    confidenceLevel
  };
}

export function calculateReinigungAdvanced(data: ReinigungAdvancedData, dic?: any) {
  const flags: string[] = [];
  let confidenceLevel: 'high' | 'medium' | 'low' = 'high';
  let uncertaintyMultiplier = 1.15;

  let area = data.areaM2 || 60;
  if (!data.areaM2 || data.areaM2 === 0) {
    confidenceLevel = 'low';
    uncertaintyMultiplier = 1.4;
    flags.push(dic?.calculator?.flag_cleaning_area_missing || "Fläche für genauere Schätzung ergänzen");
  }

  if (data.uncertainCondition) {
    confidenceLevel = 'medium';
    uncertaintyMultiplier = 1.3;
  }

  let price = Math.max(120, area * 4.5);
  
  if (data.propertyType === 'haus') {
    price *= 1.15;
    flags.push(dic?.calculator?.flag_house_surcharge || "Hauszuschlag für Treppen/Flure");
  } else if (data.propertyType === 'buero') {
    price *= 1.10;
    flags.push(dic?.calculator?.flag_commercial_structure || "Gewerbliche Objektstruktur berücksichtigt");
  }

  let conditionMultiplier = 1;
  if (data.condition === 'mittel') conditionMultiplier = 1.3;
  if (data.condition === 'stark') {
     conditionMultiplier = 1.6;
     flags.push(dic?.calculator?.flag_heavy_dirt || "Reinigungsgrad: Stark");
  }
  price = price * conditionMultiplier;

  price += data.windowsCount * 12;

  if (data.extras) {
    data.extras.forEach(extra => {
      if (extra === 'kueche_tiefenreinigung') { price += 70; flags.push(dic?.calculator?.flag_kitchen_deep_clean || "Inkl. Küche Tiefenreinigung"); }
      if (extra === 'bad_kalk') { price += 45; flags.push(dic?.calculator?.flag_bad_lime || "Inkl. Bad Intensiventkalkung"); }
      if (extra === 'teppich') {
        price += data.areaM2 * 1.5;
        flags.push(dic?.calculator?.flag_carpet_cleaning || "Inkl. Teppichreinigung");
      }
    });
  }

  if (data.isFurnished) {
     price *= 1.2;
     flags.push(dic?.calculator?.flag_furnished_extra || "Objekt ist möbliert (Mehraufwand einkalkuliert)");
  }
  if (data.keysHandover) {
     price += 25;
     flags.push(dic?.calculator?.flag_keys_handover || "Schlüsselübergabe separat");
  }
  if (data.cleaningGuarantee) { 
     price += 50;
     flags.push(dic?.calculator?.flag_handover_guarantee || "Inklusive Abnahmegarantie für Vermieter");
  }

  if (data.frequency === 'regelmaessig') {
    price *= 0.85; 
    flags.push(dic?.calculator?.flag_regular_discount || "Dauerauftrag-Rabatt angewendet");
  }

  if (data.freeTextNote) flags.push(dic?.calculator?.flag_notes_noted || "Ihren Kommentar haben wir notiert");
  if (price < 120) price = 120;

  let teamSize = dic?.calculator?.person_1 || "1 Person";
  if (area > 80) teamSize = dic?.calculator?.team_2_persons || "2 Personen";
  if (area > 150) teamSize = dic?.calculator?.team_3_persons || "3 Personen";
  let hours = Math.max(2, Math.round(area / 20));

  return {
    priceRange: { min: Math.round(price), max: Math.round(price * uncertaintyMultiplier) },
    estimatedHours: `${dic?.common?.ca || 'ca.'} ${hours} - ${hours + 2} ${dic?.common?.hours || 'Std.'}`,
    recommendedTeam: teamSize,
    calculationBasis: `${area} m² ${dic?.calculator?.living_area || 'Fläche'} | ${dic?.calculator?.condition_level || 'Zustand'}: ${data.condition}`,
    operationalFlags: [...new Set(flags)],
    confidenceLevel
  };
}

export function calculateEntsorgungAdvanced(data: EntsorgungAdvancedData, dic?: any) {
  const flags: string[] = [];
  let confidenceLevel: 'high' | 'medium' | 'low' = 'high';
  let uncertaintyMultiplier = 1.25;

  let expectedVolume = data.wasteVolumeM3 || 3;
  if (!data.wasteVolumeM3 || data.wasteVolumeM3 === 0) {
    confidenceLevel = 'low';
    uncertaintyMultiplier = 1.5;
    flags.push(dic?.calculator?.flag_waste_volume_missing || "Volumenangabe empfohlen für präziseren Preis");
  }

  if (data.uncertainVolume) {
    confidenceLevel = 'medium';
    uncertaintyMultiplier = 1.4;
  }

  let price = 90 + expectedVolume * 40;
  
  if (data.wasteCategories && data.wasteCategories.length > 0) {
    data.wasteCategories.forEach(cat => {
      if (cat.includes('bauschutt')) {
        price += expectedVolume * 25; 
        flags.push(dic?.calculator?.flag_construction_waste || "Zuschlag: Bauschuttdeponie");
      }
      if (cat.includes('elektro')) {
        price += 40; 
        flags.push(dic?.calculator?.flag_e_waste || "Elektro-Recycling eingeplant");
      }
      if (cat.includes('gruenschnitt')) {
        price -= expectedVolume * 5; 
        flags.push(dic?.calculator?.flag_green_waste || "Grünschnitt/Bio (Vergünstigt)");
      }
    });
  }

  let accessMultiplier = 1;
  if (data.accessDifficulty === 'mittel') accessMultiplier = 1.2;
  if (data.accessDifficulty === 'schwer') {
     accessMultiplier = 1.4;
     flags.push(dic?.calculator?.flag_difficult_access || "Schwerer Zugang (Extra Tragezeit kalkuliert)");
  }
  price = price * accessMultiplier;

  if (data.hazardMaterials) {
     price *= 1.5;
     flags.push(dic?.calculator?.flag_hazard_materials || "Potenzielle Gefahrstoffe vorgemerkt");
  }

  if (data.loadingDistanceMeters > 20) {
    price += (data.loadingDistanceMeters - 20) * 1.5;
    flags.push(`${dic?.calculator?.flag_loading_path || "Trageweg Laufstrecke"}: ${data.loadingDistanceMeters}m`);
  }

  if (data.disassemblyRequired) {
     price += 50 + (data.wasteVolumeM3 * 10);
     flags.push(dic?.calculator?.flag_disassembly_on_site || "Inkl. Demontage vor Ort");
  }

  if (data.urgency === 'dringend') {
     price *= 1.35;
     flags.push(dic?.calculator?.flag_express_service || "Express-Service (Dringend)");
  }

  if (data.freeTextNote) flags.push(dic?.calculator?.flag_waste_notes_noted || "Ihre Notiz speichern wir für die Planung");
  if (price < 90) price = 90;

  let teamSize = dic?.calculator?.team_2_persons || "2 Personen";
  if (expectedVolume > 15) teamSize = dic?.calculator?.team_3_persons || "3 Personen";
  let hours = Math.max(1, Math.round(expectedVolume / 3));

  return {
    priceRange: { min: Math.round(price), max: Math.round(price * uncertaintyMultiplier) },
    estimatedHours: `${dic?.common?.ca || 'ca.'} ${hours} - ${hours + 1} ${dic?.common?.hours || 'Std.'}`,
    recommendedTeam: teamSize,
    calculationBasis: `${expectedVolume} m³ ${dic?.calculator?.disposal_item || 'Entsorgungsgut'}`,
    operationalFlags: [...new Set(flags)],
    confidenceLevel
  };
}
