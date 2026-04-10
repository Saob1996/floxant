import { create } from "zustand";

export type ServiceType = "umzug" | "reinigung" | "entsorgung";
export type CalculatorMode = "express" | "advanced" | "lead";
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
  propertyType: "wohnung" | "haus" | "buero";
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

export interface AdvancedEstimate {
  priceRange: { min: number; max: number };
  estimatedHours: string;
  recommendedTeam: string;
  calculationBasis: string;
  operationalFlags: string[];
  confidenceLevel: "high" | "medium" | "low";
}

export interface CalculatorState {
  serviceType: ServiceType | null;
  mode: CalculatorMode;
  baseDetails: BaseDetails;
  leadDetails: LeadDetails;

  umzugData: UmzugAdvancedData;
  reinigungData: ReinigungAdvancedData;
  entsorgungData: EntsorgungAdvancedData;

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

const initialReinigungData: ReinigungAdvancedData = {
  propertyType: "wohnung",
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
    arraysEqual(a.operationalFlags, b.operationalFlags)
  );
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  serviceType: null,
  mode: "express",

  baseDetails: initialBaseDetails,
  leadDetails: initialLeadDetails,

  umzugData: initialUmzugData,
  reinigungData: initialReinigungData,
  entsorgungData: initialEntsorgungData,

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