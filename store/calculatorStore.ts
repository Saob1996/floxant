import { create } from "zustand";

export type ServiceType = "umzug" | "reinigung" | "entsorgung" | "bueroumzug" | "seniorenumzug" | "klaviertransport" | "einlagerung" | "malerarbeiten" | "akteneinlagerung";
export type CalculatorMode = "selection" | "express" | "advanced" | "lead";
export type PricingTier = "economy" | "balanced" | "premium";

export interface BaseDetails {
  fromAddress: string;
  toAddress?: string;
  moveDate?: string;
  distance?: number;
}

export interface LeadDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  callbackTime: string;
  wantsPhotosLink: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
}

export interface UmzugExpressData {
  areaM2: number;
  rooms: number;
  fromFloor?: number;
  toFloor?: number;
  hasElevatorFrom?: boolean;
  hasElevatorTo?: boolean;
}

export interface ReinigungExpressData {
  propertyType: "wohnung" | "haus" | "buero" | "";
  areaM2: number;
  condition: "leicht" | "mittel" | "stark";
}

export interface EntsorgungExpressData {
  wasteVolumeM3: number;
  accessDifficulty: "einfach" | "mittel" | "schwer";
}

export interface UmzugAdvancedData extends UmzugExpressData {
  boxesCount: number;
  furnitureList: string[];
  heavyItems: string[];
  packingService: boolean;
  unpackingService: boolean;
  disassemblyService: boolean;
  assemblyService: boolean;
  kitchenAssembly: boolean;
  walkingDistanceFrom: number;
  walkingDistanceTo: number;
  noParkingZoneFrom: boolean;
  noParkingZoneTo: boolean;
  timeConstraint: "flexibel" | "wochenende" | "dringend" | "genaues_datum";
  isPartialMove: boolean;
  fromAddressDetailed: string;
  toAddressDetailed: string;
  distanceKm: number;
  narrowStairsFrom: boolean;
  narrowStairsTo: boolean;
  courtyardAccessFrom: boolean;
  courtyardAccessTo: boolean;
  uncertainVolume: boolean;
  freeTextNote: string;
}

export interface SeniorenumzugAdvancedData extends UmzugAdvancedData {
  seniorCarePackage: boolean;
}

export interface BueroumzugAdvancedData extends UmzugExpressData {
  workstations: number;
  itSetup: boolean;
  archiveMeters: number;
  packingService: boolean;
  disassemblyService: boolean;
  assemblyService: boolean;
  walkingDistanceFrom: number;
  walkingDistanceTo: number;
  noParkingZoneFrom: boolean;
  noParkingZoneTo: boolean;
  freeTextNote: string;
}

export interface KlaviertransportAdvancedData {
  pianoType: "upright" | "grand";
  fromFloor: number;
  toFloor: number;
  hasElevatorFrom: boolean;
  hasElevatorTo: boolean;
  distanceKm: number;
  freeTextNote: string;
}

export interface ReinigungAdvancedData extends ReinigungExpressData {
  windowsCount: number;
  extras: string[];
  frequency: "einmalig" | "regelmaessig";
  isFurnished: boolean;
  keysHandover: boolean;
  cleaningGuarantee: boolean;
  uncertainCondition: boolean;
  freeTextNote: string;
}

export interface EntsorgungAdvancedData extends EntsorgungExpressData {
  wasteCategories: string[];
  hazardMaterials: boolean;
  loadingDistanceMeters: number;
  disassemblyRequired: boolean;
  urgency: "flexibel" | "dringend";
  uncertainVolume: boolean;
  freeTextNote: string;
}

export interface EinlagerungAdvancedData {
  volumeM3: number;
  durationMonths: number;
  pickupRequired: boolean;
  insuranceValue: number;
  freeTextNote: string;
}

export interface MalerarbeitenAdvancedData {
  areaM2: number;
  paintQuality: "standard" | "premium" | "bio";
  includesCeiling: boolean;
  includesDoors: boolean;
  roomsCount: number;
  isFurnished: boolean;
  freeTextNote: string;
}

export interface AkteneinlagerungAdvancedData {
  boxCount: number;
  shelfMeters: number;
  durationMonths: number;
  pickupRequired: boolean;
  securityShredding: boolean;
  digitalization: boolean;
  insuranceValue: number;
  freeTextNote: string;
}

export interface AdvancedEstimate {
  priceRange: { min: number; max: number };
  estimatedHours: string;
  recommendedTeam: string;
  calculationBasis: string;
  operationalFlags: string[];
  confidenceLevel: "high" | "medium" | "low";
  cbm?: number;
}

export interface CalculatorState {
  serviceType: ServiceType | null;
  mode: CalculatorMode;
  baseDetails: BaseDetails;
  leadDetails: LeadDetails;

  umzugData: UmzugAdvancedData;
  reinigungData: ReinigungAdvancedData;
  entsorgungData: EntsorgungAdvancedData;
  bueroumzugData: BueroumzugAdvancedData;
  seniorenumzugData: SeniorenumzugAdvancedData;
  klaviertransportData: KlaviertransportAdvancedData;
  einlagerungData: EinlagerungAdvancedData;
  malerarbeitenData: MalerarbeitenAdvancedData;
  akteneinlagerungData: AkteneinlagerungAdvancedData;

  expressPriceRange: { min: number; max: number } | null;
  advancedEstimate: AdvancedEstimate | null;

  timeOnPage: number;
  hesitationDiscountActive: boolean;

  setServiceType: (type: ServiceType | null) => void;
  setMode: (mode: CalculatorMode) => void;
  updateBaseDetails: (details: Partial<BaseDetails>) => void;
  updateLeadDetails: (details: Partial<LeadDetails>) => void;

  updateUmzugData: (data: Partial<UmzugAdvancedData>) => void;
  updateReinigungData: (data: Partial<ReinigungAdvancedData>) => void;
  updateEntsorgungData: (data: Partial<EntsorgungAdvancedData>) => void;
  updateBueroumzugData: (data: Partial<BueroumzugAdvancedData>) => void;
  updateSeniorenumzugData: (data: Partial<SeniorenumzugAdvancedData>) => void;
  updateKlaviertransportData: (data: Partial<KlaviertransportAdvancedData>) => void;
  updateEinlagerungData: (data: Partial<EinlagerungAdvancedData>) => void;
  updateMalerarbeitenData: (data: Partial<MalerarbeitenAdvancedData>) => void;
  updateAkteneinlagerungData: (data: Partial<AkteneinlagerungAdvancedData>) => void;

  setExpressPriceRange: (min: number, max: number) => void;
  setAdvancedEstimate: (estimate: AdvancedEstimate | null) => void;

  incrementTimeOnPage: (seconds: number) => void;
  setHesitationDiscountActive: (active: boolean) => void;
}

const initialBaseDetails: BaseDetails = {
  fromAddress: "",
  toAddress: "",
  moveDate: "",
  distance: undefined,
};

const initialLeadDetails: LeadDetails = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  callbackTime: "",
  wantsPhotosLink: false,
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  gclid: "",
};

const initialUmzugData: UmzugAdvancedData = {
  areaM2: 0,
  rooms: 1,
  fromFloor: 0,
  toFloor: 0,
  hasElevatorFrom: false,
  hasElevatorTo: false,
  boxesCount: 0,
  furnitureList: [],
  heavyItems: [],
  packingService: false,
  unpackingService: false,
  disassemblyService: false,
  assemblyService: false,
  kitchenAssembly: false,
  walkingDistanceFrom: 15,
  walkingDistanceTo: 15,
  noParkingZoneFrom: false,
  noParkingZoneTo: false,
  timeConstraint: "flexibel",
  isPartialMove: false,
  fromAddressDetailed: "",
  toAddressDetailed: "",
  distanceKm: 15,
  narrowStairsFrom: false,
  narrowStairsTo: false,
  courtyardAccessFrom: false,
  courtyardAccessTo: false,
  uncertainVolume: false,
  freeTextNote: "",
};

const initialSeniorenumzugData: SeniorenumzugAdvancedData = {
  ...initialUmzugData,
  seniorCarePackage: true,
};

const initialBueroumzugData: BueroumzugAdvancedData = {
  areaM2: 0,
  rooms: 1,
  fromFloor: 0,
  toFloor: 0,
  hasElevatorFrom: false,
  hasElevatorTo: false,
  workstations: 1,
  itSetup: true,
  archiveMeters: 0,
  packingService: true,
  disassemblyService: false,
  assemblyService: false,
  walkingDistanceFrom: 15,
  walkingDistanceTo: 15,
  noParkingZoneFrom: false,
  noParkingZoneTo: false,
  freeTextNote: "",
};

const initialKlaviertransportData: KlaviertransportAdvancedData = {
  pianoType: "upright",
  fromFloor: 0,
  toFloor: 0,
  hasElevatorFrom: false,
  hasElevatorTo: false,
  distanceKm: 10,
  freeTextNote: "",
};

const initialReinigungData: ReinigungAdvancedData = {
  propertyType: "",
  areaM2: 0,
  condition: "mittel",
  windowsCount: 0,
  extras: [],
  frequency: "einmalig",
  isFurnished: false,
  keysHandover: false,
  cleaningGuarantee: true,
  uncertainCondition: false,
  freeTextNote: "",
};

const initialEntsorgungData: EntsorgungAdvancedData = {
  wasteVolumeM3: 1,
  accessDifficulty: "einfach",
  wasteCategories: ["sperrmuell"],
  hazardMaterials: false,
  loadingDistanceMeters: 5,
  disassemblyRequired: false,
  urgency: "flexibel",
  uncertainVolume: false,
  freeTextNote: "",
};

const initialEinlagerungData: EinlagerungAdvancedData = {
  volumeM3: 5,
  durationMonths: 3,
  pickupRequired: true,
  insuranceValue: 5000,
  freeTextNote: "",
};

const initialMalerarbeitenData: MalerarbeitenAdvancedData = {
  areaM2: 50,
  paintQuality: "standard",
  includesCeiling: true,
  includesDoors: false,
  roomsCount: 2,
  isFurnished: false,
  freeTextNote: "",
};

const initialAkteneinlagerungData: AkteneinlagerungAdvancedData = {
  boxCount: 0,
  shelfMeters: 0,
  durationMonths: 6,
  pickupRequired: true,
  securityShredding: false,
  digitalization: false,
  insuranceValue: 10000,
  freeTextNote: "",
};

function shallowEqualObject<T extends Record<string, any>>(a: T, b: T): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (a[key] !== b[key]) return false;
  }

  return true;
}

function mergeIfChanged<T extends Record<string, any>>(current: T, patch: Partial<T>): T {
  const next = { ...current, ...patch };
  return shallowEqualObject(current, next) ? current : next;
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function advancedEstimateEqual(a: AdvancedEstimate | null, b: AdvancedEstimate | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;

  return (
    a.priceRange.min === b.priceRange.min &&
    a.priceRange.max === b.priceRange.max &&
    a.estimatedHours === b.estimatedHours &&
    a.recommendedTeam === b.recommendedTeam &&
    a.calculationBasis === b.calculationBasis &&
    a.confidenceLevel === b.confidenceLevel &&
    a.cbm === b.cbm &&
    arraysEqual(a.operationalFlags, b.operationalFlags)
  );
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  serviceType: null,
  mode: "selection",

  baseDetails: initialBaseDetails,
  leadDetails: initialLeadDetails,

  umzugData: initialUmzugData,
  reinigungData: initialReinigungData,
  entsorgungData: initialEntsorgungData,
  bueroumzugData: initialBueroumzugData,
  seniorenumzugData: initialSeniorenumzugData,
  klaviertransportData: initialKlaviertransportData,
  einlagerungData: initialEinlagerungData,
  malerarbeitenData: initialMalerarbeitenData,
  akteneinlagerungData: initialAkteneinlagerungData,

  expressPriceRange: null,
  advancedEstimate: null,

  timeOnPage: 0,
  hesitationDiscountActive: false,

  setServiceType: (type) =>
    set((state) => {
      if (state.serviceType === type) return state;

      return {
        serviceType: type,
        mode: "express",
        expressPriceRange: null,
        advancedEstimate: null,
      };
    }),

  setMode: (mode) =>
    set((state) => {
      if (state.mode === mode) return state;
      return { mode };
    }),

  updateBaseDetails: (details) =>
    set((state) => {
      const next = mergeIfChanged(state.baseDetails, details);
      if (next === state.baseDetails) return state;
      return { baseDetails: next };
    }),

  updateLeadDetails: (details) =>
    set((state) => {
      const next = mergeIfChanged(state.leadDetails, details);
      if (next === state.leadDetails) return state;
      return { leadDetails: next };
    }),

  updateUmzugData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.umzugData, data);
      if (next === state.umzugData) return state;
      return { umzugData: next };
    }),

  updateReinigungData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.reinigungData, data);
      if (next === state.reinigungData) return state;
      return { reinigungData: next };
    }),

  updateEntsorgungData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.entsorgungData, data);
      if (next === state.entsorgungData) return state;
      return { entsorgungData: next };
    }),

  updateBueroumzugData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.bueroumzugData, data);
      if (next === state.bueroumzugData) return state;
      return { bueroumzugData: next };
    }),

  updateSeniorenumzugData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.seniorenumzugData, data);
      if (next === state.seniorenumzugData) return state;
      return { seniorenumzugData: next };
    }),

  updateKlaviertransportData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.klaviertransportData, data);
      if (next === state.klaviertransportData) return state;
      return { klaviertransportData: next };
    }),
    
  updateEinlagerungData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.einlagerungData, data);
      if (next === state.einlagerungData) return state;
      return { einlagerungData: next };
    }),

  updateMalerarbeitenData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.malerarbeitenData, data);
      if (next === state.malerarbeitenData) return state;
      return { malerarbeitenData: next };
    }),

  updateAkteneinlagerungData: (data) =>
    set((state) => {
      const next = mergeIfChanged(state.akteneinlagerungData, data);
      if (next === state.akteneinlagerungData) return state;
      return { akteneinlagerungData: next };
    }),

  setExpressPriceRange: (min, max) =>
    set((state) => {
      if (
        state.expressPriceRange &&
        state.expressPriceRange.min === min &&
        state.expressPriceRange.max === max
      ) {
        return state;
      }

      return { expressPriceRange: { min, max } };
    }),

  setAdvancedEstimate: (estimate) =>
    set((state) => {
      if (advancedEstimateEqual(state.advancedEstimate, estimate)) {
        return state;
      }

      return { advancedEstimate: estimate };
    }),

  incrementTimeOnPage: (seconds) =>
    set((state) => {
      if (!Number.isFinite(seconds) || seconds <= 0) return state;
      return { timeOnPage: state.timeOnPage + seconds };
    }),

  setHesitationDiscountActive: (active) =>
    set((state) => {
      if (state.hesitationDiscountActive === active) return state;
      return { hesitationDiscountActive: active };
    }),
}));