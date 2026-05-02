import { CalculatorState } from "@/store/calculatorStore";
import { IntakePayload } from "@/lib/types/intake";

function parseBudget(value: string): number | null {
 const normalized = value.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", ".");
 const parsed = Number.parseFloat(normalized);
 return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

/**
 * Serializes the current Zustand store state into a clean API payload
 * for productive intake submission.
 */
export function serializeIntakeStore(state: CalculatorState): IntakePayload {
 const {
  serviceType,
  leadDetails,
  advancedEstimate,
  umzugData,
  reinigungData,
  entsorgungData,
 } = state;

 const customerBudget = parseBudget(leadDetails.customerBudget || "");

 const contact = {
  fullName: leadDetails.customerName.trim(),
  email: leadDetails.customerEmail.trim(),
  phone: leadDetails.customerPhone.trim(),
  callbackPreference: leadDetails.callbackTime || "jederzeit",
  notes: leadDetails.customerNote.trim(),
 };

 const service = {
  type: serviceType || "unknown",
  source: "intake_wizard",
  entryPoint: typeof window !== "undefined" ? window.location.pathname : undefined,
 };

 const valuation = {
  systemPriceRangeMin: advancedEstimate?.priceRange?.min || 0,
  systemPriceRangeMax: advancedEstimate?.priceRange?.max || 0,
  priceRangeMin: advancedEstimate?.priceRange?.min || 0,
  priceRangeMax: advancedEstimate?.priceRange?.max || 0,
  valuationLabel: "Unverbindlicher Orientierungsrahmen",
  valuationStage: advancedEstimate?.valuationStage || "Erste Einschätzung",
  accuracyState: advancedEstimate?.valuationStage || "Erste Einschätzung",
  topDrivers: advancedEstimate?.topDrivers || advancedEstimate?.operationalDrivers || [],
  customerBudget,
  priceSuggestion: customerBudget,
  priceExplanation: advancedEstimate?.priceExplanation || "",
  pricingSignals: advancedEstimate?.pricingSignals || {},
 };

 let configuration: Record<string, unknown> = {};

 if (serviceType === "umzug") {
  configuration = {
   fromAddress: state.baseDetails.fromAddress,
   toAddress: state.baseDetails.toAddress,
   fromFloor: umzugData.fromFloor,
   toFloor: umzugData.toFloor,
   distanceKm: umzugData.distanceKm,
   hasElevatorFrom: umzugData.hasElevatorFrom,
   hasElevatorTo: umzugData.hasElevatorTo,
   rooms: umzugData.rooms,
   areaM2: umzugData.areaM2,
   boxesCount: umzugData.boxesCount,
   extraServices: {
    packing: umzugData.packingService,
    disassembly: umzugData.disassemblyService,
    kitchen: umzugData.kitchenAssembly,
   },
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: umzugData.freeTextNote,
  };
 } else if (serviceType === "reinigung") {
  configuration = {
   locationContext: state.baseDetails.fromAddress,
   cleaningGoal: reinigungData.cleaningGoal,
   sqm: reinigungData.areaM2,
   propertyType: reinigungData.propertyType,
   windowsCount: reinigungData.windowsCount,
   isFurnished: reinigungData.isFurnished,
   keysHandover: reinigungData.keysHandover,
   cleaningControl: reinigungData.cleaningGuarantee,
   cleaningFrequency: reinigungData.frequency,
   extras: reinigungData.extras,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: reinigungData.freeTextNote,
  };
 } else if (serviceType === "entsorgung") {
  configuration = {
   location: state.baseDetails.fromAddress,
   estimatedVolume: entsorgungData.wasteVolumeM3,
   accessDifficulty: entsorgungData.accessDifficulty,
   wasteCategories: entsorgungData.wasteCategories,
   disassemblyRequired: entsorgungData.disassemblyRequired,
   uncertainVolume: entsorgungData.uncertainVolume,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: entsorgungData.freeTextNote,
  };
 } else if (serviceType === "bueroumzug") {
  configuration = {
   fromAddress: state.baseDetails.fromAddress,
   toAddress: state.baseDetails.toAddress,
   workstations: state.bueroumzugData.workstations,
   archiveMeters: state.bueroumzugData.archiveMeters,
   itSetup: state.bueroumzugData.itSetup,
   packingService: state.bueroumzugData.packingService,
   disassemblyService: state.bueroumzugData.disassemblyService,
   assemblyService: state.bueroumzugData.assemblyService,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: state.bueroumzugData.freeTextNote,
  };
 } else if (serviceType === "seniorenumzug") {
  configuration = {
   fromAddress: state.baseDetails.fromAddress,
   toAddress: state.baseDetails.toAddress,
   areaM2: state.seniorenumzugData.areaM2,
   rooms: state.seniorenumzugData.rooms,
   distanceKm: state.seniorenumzugData.distanceKm,
   seniorCarePackage: state.seniorenumzugData.seniorCarePackage,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: state.seniorenumzugData.freeTextNote,
  };
 } else if (serviceType === "klaviertransport") {
  configuration = {
   fromAddress: state.baseDetails.fromAddress,
   toAddress: state.baseDetails.toAddress,
   pianoType: state.klaviertransportData.pianoType,
   fromFloor: state.klaviertransportData.fromFloor,
   toFloor: state.klaviertransportData.toFloor,
   distanceKm: state.klaviertransportData.distanceKm,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: state.klaviertransportData.freeTextNote,
  };
 } else if (serviceType === "einlagerung") {
  configuration = {
   fromAddress: state.baseDetails.fromAddress,
   volumeM3: state.einlagerungData.volumeM3,
   durationMonths: state.einlagerungData.durationMonths,
   pickupRequired: state.einlagerungData.pickupRequired,
   insuranceValue: state.einlagerungData.insuranceValue,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: state.einlagerungData.freeTextNote,
  };
 } else if (serviceType === "malerarbeiten") {
  configuration = {
   fromAddress: state.baseDetails.fromAddress,
   areaM2: state.malerarbeitenData.areaM2,
   paintQuality: state.malerarbeitenData.paintQuality,
   includesCeiling: state.malerarbeitenData.includesCeiling,
   includesDoors: state.malerarbeitenData.includesDoors,
   roomsCount: state.malerarbeitenData.roomsCount,
   isFurnished: state.malerarbeitenData.isFurnished,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: state.malerarbeitenData.freeTextNote,
  };
 } else if (serviceType === "akteneinlagerung") {
  configuration = {
   fromAddress: state.baseDetails.fromAddress,
   boxCount: state.akteneinlagerungData.boxCount,
   shelfMeters: state.akteneinlagerungData.shelfMeters,
   durationMonths: state.akteneinlagerungData.durationMonths,
   pickupRequired: state.akteneinlagerungData.pickupRequired,
   securityShredding: state.akteneinlagerungData.securityShredding,
   digitalization: state.akteneinlagerungData.digitalization,
   insuranceValue: state.akteneinlagerungData.insuranceValue,
   pricingSignals: advancedEstimate?.pricingSignals || {},
   note: state.akteneinlagerungData.freeTextNote,
  };
 }

 configuration = {
  ...configuration,
  wantsPhotosLink: leadDetails.wantsPhotosLink,
 };

 const metadata = {
 createdAt: new Date().toISOString(),
 intakeVersion: "1.1.0",
 source: "intake_wizard",
  clientContext: {
   wantsPhotosLink: leadDetails.wantsPhotosLink,
   customerBudgetProvided: Boolean(customerBudget),
   entryPath: typeof window !== "undefined" ? window.location.pathname + window.location.search : undefined,
  },
 };

 return {
  contact,
  service,
  valuation,
  configuration,
  metadata,
 };
}
