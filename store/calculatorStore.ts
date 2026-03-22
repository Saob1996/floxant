import { create } from 'zustand';

export type ServiceType = 'umzug' | 'reinigung' | 'entsorgung';
export type CalculatorMode = 'express' | 'advanced' | 'lead';
export type PricingTier = 'economy' | 'balanced' | 'premium';

// Base inputs that could apply generally
export interface BaseDetails {
  fromAddress: string;
  toAddress?: string; // only for Umzug
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
  propertyType: 'wohnung' | 'haus' | 'buero';
  areaM2: number;
  condition: 'leicht' | 'mittel' | 'stark';
}

export interface EntsorgungExpressData {
  wasteVolumeM3: number;
  accessDifficulty: 'einfach' | 'mittel' | 'schwer';
}

// ADVANCED DATA SCHEMAS
export interface UmzugAdvancedData extends UmzugExpressData {
  boxesCount: number;
  furnitureList: string[]; // ['Bett', 'Schrank', 'Sofa', 'Waschmaschine']
  heavyItems: string[]; // e.g. 'Piano', 'Safe'
  packingService: boolean;
  unpackingService: boolean;
  disassemblyService: boolean;
  assemblyService: boolean;
  kitchenAssembly: boolean;
  walkingDistanceFrom: number; // in meters (Laufweg)
  walkingDistanceTo: number; 
  noParkingZoneFrom: boolean; // Halteverbotszone
  noParkingZoneTo: boolean;
  timeConstraint: 'flexibel' | 'wochenende' | 'dringend' | 'genaues_datum';
  isPartialMove: boolean; // Teilleistung 
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
  extras: string[]; // 'kueche_tiefenreinigung', 'bad_kalk', 'teppich'
  frequency: 'einmalig' | 'regelmaessig';
  isFurnished: boolean;
  keysHandover: boolean;
  cleaningGuarantee: boolean; // Abnahmegarantie
  uncertainCondition: boolean;
  freeTextNote: string;
}

export interface EntsorgungAdvancedData extends EntsorgungExpressData {
  wasteCategories: string[]; // 'sperrmuell', 'elektro', 'bauschutt'
  hazardMaterials: boolean; // Gefahrstoffe ausgeschlossen
  loadingDistanceMeters: number;
  disassemblyRequired: boolean;
  urgency: 'flexibel' | 'dringend';
  uncertainVolume: boolean;
  freeTextNote: string;
}

export interface CalculatorState {
  serviceType: ServiceType;
  mode: CalculatorMode;
  baseDetails: BaseDetails;
  leadDetails: LeadDetails;

  umzugData: UmzugAdvancedData;
  reinigungData: ReinigungAdvancedData;
  entsorgungData: EntsorgungAdvancedData;

  // Pricing State
  expressPriceRange: { min: number; max: number } | null;
  advancedEstimate: { 
    priceRange: { min: number; max: number };
    estimatedHours: string;
    recommendedTeam: string;
    calculationBasis: string;
    operationalFlags: string[];
    confidenceLevel: 'high' | 'medium' | 'low';
  } | null;
  
  timeOnPage: number;
  hesitationDiscountActive: boolean;

  // Actions
  setServiceType: (type: ServiceType) => void;
  setMode: (mode: CalculatorMode) => void;
  updateBaseDetails: (details: Partial<BaseDetails>) => void;
  updateLeadDetails: (details: Partial<LeadDetails>) => void;
  
  updateUmzugData: (data: Partial<UmzugAdvancedData>) => void;
  updateReinigungData: (data: Partial<ReinigungAdvancedData>) => void;
  updateEntsorgungData: (data: Partial<EntsorgungAdvancedData>) => void;

  setExpressPriceRange: (min: number, max: number) => void;
  setAdvancedEstimate: (estimate: CalculatorState['advancedEstimate']) => void;

  incrementTimeOnPage: (seconds: number) => void;
  setHesitationDiscountActive: (active: boolean) => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  serviceType: 'umzug',
  mode: 'advanced',
  baseDetails: {
    fromAddress: '',
  },
  leadDetails: {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    callbackTime: '',
    wantsPhotosLink: false,
  },

  umzugData: {
    areaM2: 0,
    rooms: 1,
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
    timeConstraint: 'flexibel',
    isPartialMove: false,
    fromAddressDetailed: '',
    toAddressDetailed: '',
    distanceKm: 15,
    narrowStairsFrom: false,
    narrowStairsTo: false,
    courtyardAccessFrom: false,
    courtyardAccessTo: false,
    uncertainVolume: false,
    freeTextNote: '',
  },
  
  reinigungData: {
    propertyType: 'wohnung',
    areaM2: 0,
    condition: 'mittel',
    windowsCount: 0,
    extras: [],
    frequency: 'einmalig',
    isFurnished: false,
    keysHandover: false,
    cleaningGuarantee: true,
    uncertainCondition: false,
    freeTextNote: '',
  },

  entsorgungData: {
    wasteVolumeM3: 1,
    accessDifficulty: 'einfach',
    wasteCategories: ['sperrmuell'],
    hazardMaterials: false,
    loadingDistanceMeters: 5,
    disassemblyRequired: false,
    urgency: 'flexibel',
    uncertainVolume: false,
    freeTextNote: '',
  },

  expressPriceRange: null,
  advancedEstimate: null,

  timeOnPage: 0,
  hesitationDiscountActive: false,

  setServiceType: (type) => set({ serviceType: type }),
  setMode: (mode) => set({ mode }),
  updateBaseDetails: (details) => set((state) => ({ baseDetails: { ...state.baseDetails, ...details } })),
  updateLeadDetails: (details) => set((state) => ({ leadDetails: { ...state.leadDetails, ...details } })),
  
  updateUmzugData: (data) => set((state) => ({ umzugData: { ...state.umzugData, ...data } })),
  updateReinigungData: (data) => set((state) => ({ reinigungData: { ...state.reinigungData, ...data } })),
  updateEntsorgungData: (data) => set((state) => ({ entsorgungData: { ...state.entsorgungData, ...data } })),

  setExpressPriceRange: (min, max) => set({ expressPriceRange: { min, max } }),
  setAdvancedEstimate: (estimate) => set({ advancedEstimate: estimate }),

  incrementTimeOnPage: (seconds) => set((state) => ({ timeOnPage: state.timeOnPage + seconds })),
  setHesitationDiscountActive: (active) => set({ hesitationDiscountActive: active }),
}));
