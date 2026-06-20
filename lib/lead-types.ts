export type LeadQualityPriority = "p0" | "p1" | "p2" | "p3";

export type LeadQualificationState = "ready" | "needs_info" | "thin";

export type LeadContactMethod = "email" | "phone" | "whatsapp" | "unknown";

export type CanonicalLeadService =
  | "reinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "praxisreinigung"
  | "fensterreinigung"
  | "umzug"
  | "seniorenumzug"
  | "klaviertransport"
  | "fernumzug"
  | "moebeltransport"
  | "entruempelung"
  | "haushaltsaufloesung"
  | "wohnungsaufloesung"
  | "solarreinigung"
  | "pv-anlagen-reinigung"
  | "angebot-pruefen"
  | "b2b-bueroreinigung"
  | "diskret-service"
  | "plan-b-service"
  | "objektbrief"
  | "sonstiges";

export type CanonicalLeadCity =
  | "duesseldorf"
  | "regensburg"
  | "landshut"
  | "muenchen"
  | "nuernberg"
  | "bayern"
  | "sonstiges"
  | "unknown";

export type CanonicalLeadIntent =
  | "lokale-anfrage"
  | "angebot-pruefen"
  | "b2b-anfrage"
  | "plan-b"
  | "diskret"
  | "angebot-vergleichen"
  | "service-unsicher"
  | "signature-service"
  | "spezialservice"
  | "schnellanfrage"
  | "unknown";

export type CanonicalLeadUrgency =
  | "flexibel"
  | "diese-woche"
  | "kurzfristig"
  | "fester-termin"
  | "sehr-dringend"
  | "unknown";

export type CanonicalOfferStatus =
  | "schriftliches-angebot"
  | "muendliche-preisangabe"
  | "mehrere-angebote"
  | "kein-angebot-orientierung"
  | "unknown";

export type CanonicalOfferConcern =
  | "wirkt-zu-teuer"
  | "leistungsumfang-unklar"
  | "anbieter-reagiert-nicht"
  | "termin-passt-nicht"
  | "mehrere-angebote-vergleichen"
  | "billiges-angebot-riskant"
  | "zusatzkosten-unklar"
  | "anderes"
  | "unknown";

export type LeadLocationKey = "duesseldorf" | "regensburg" | "unknown";

export type OperationalLeadKind =
  | "general"
  | "offer-check"
  | "b2b"
  | "private"
  | "signature"
  | "special"
  | "plan-b"
  | "discreet"
  | "spam-risk"
  | "unclear";

export type NormalizedLeadSubmission = {
  leadType: string;
  leadSubtype: string;
  service: string;
  serviceCanonical: CanonicalLeadService;
  serviceCategory: string;
  source: string;
  sourceComponent: string;
  sourcePage: string;
  landingPage: string;
  intent: string;
  intentCanonical: CanonicalLeadIntent;
  region: string;
  cityOrZip: string;
  cityCanonical: CanonicalLeadCity;
  locationKey: LeadLocationKey;
  name: string;
  email: string;
  phone: string;
  contactMethod: LeadContactMethod;
  preferredContactMethod: LeadContactMethod;
  urgency: string;
  urgencyCanonical: CanonicalLeadUrgency;
  desiredDate: string;
  deadline: string;
  message: string;
  scope: string;
  objectType: string;
  areaSize: string;
  cleaningFrequency: string;
  preferredCleaningTime: string;
  contactPersonRole: string;
  serviceScope: string;
  company: string;
  companyName: string;
  privacyConsent: boolean;
  honeypot: string;
  formStartedAt: number | null;
  startedAt: number | null;
  submittedAt: string;
  elapsedMs: number | null;
  pageType: string;
  funnelStage: string;
  ctaLabel: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  preferredCallbackTime: string;
  isSensitiveCase: boolean;
  leadKind: OperationalLeadKind;
  signatureServiceKey: string;
  missingInfoHints: string[];
  offer: {
    existingOffer: boolean;
    offerStatus: string;
    offerStatusCanonical: CanonicalOfferStatus;
    offerConcern: string;
    offerConcernCanonical: CanonicalOfferConcern;
    offerAmountText: string;
    offerAmount: number | null;
    offerProvider: string;
    offerText: string;
    selectedAddons: string[];
    fileCount: number;
    photoCount: number;
    hasOfferUpload: boolean;
    hasPhotoUpload: boolean;
  };
};

export type LeadValidationResult = {
  ok: boolean;
  errors: string[];
  warnings: string[];
  missingRequired: string[];
  missingRecommended: string[];
  spamSignals: string[];
};

export type LeadPriorityDecision = {
  priority: LeadQualityPriority;
  score: number;
  label: string;
  qualification: LeadQualificationState;
  responseSla: string;
  nextAction: string;
  reasons: string[];
  tags: string[];
};
