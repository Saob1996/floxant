import { ServiceType } from "@/store/calculatorStore";

export interface IntakeContact {
 fullName: string;
 email: string;
 phone: string;
 callbackPreference: string;
 notes?: string;
}

export interface IntakeServiceInfo {
 type: ServiceType | string;
 source: string; // e.g. "intake_wizard"
 entryPoint?: string;
 presetFromUrl?: string;
 regionPreset?: string;
}

export interface IntakeValuation {
 systemPriceRangeMin: number;
 systemPriceRangeMax: number;
 priceRangeMin: number;
 priceRangeMax: number;
 valuationLabel: string;
 valuationStage: string;
 accuracyState: string;
 topDrivers: string[];
 customerBudget?: number | null;
 priceSuggestion?: number | null;
 priceExplanation?: string;
 pricingSignals?: Record<string, unknown>;
}

export interface WorkOrderDetails {
 status?: "draft" | "planned" | "ready_for_team" | "in_progress" | "done";
 teamLead?: string;
 scheduledDate?: string;
 timeWindow?: string;
 fromAddress?: string;
 toAddress?: string;
 contactName?: string;
 contactPhone?: string;
 contactEmail?: string;
 agreedAmount?: number;
 serviceLabel?: string;
 extraServices?: string[];
 teamInstructions?: string;
 accessNotes?: string;
}

export interface OperationCostLine {
 id: string;
 label: string;
 category: string;
 quantity: number;
 unit: string;
 unitCost: number;
 note?: string;
}

export interface FinanceLedgerEntry {
 id: string;
 type: "income" | "expense";
 label: string;
 category: string;
 amount: number;
 date?: string;
 note?: string;
}

export interface CommercialDecision {
 offerPrice?: number;
 minimumTakePrice?: number;
 targetMarginPercent?: number;
 decision?: "review" | "accept" | "negotiate" | "decline";
 decisionNote?: string;
 updatedAt?: string;
}

export interface IntakeAdminMeta {
 internalNotes?: string;
 nextAction?: string;
 updatedAt?: string;
 updatedBy?: string;
 leadQuality?: any;
 docs?: FloxDocument[];
 workOrder?: WorkOrderDetails;
 costLines?: OperationCostLine[];
 ledgerEntries?: FinanceLedgerEntry[];
 commercialDecision?: CommercialDecision;
 leadRouting?: {
  priority: "critical" | "hot" | "warm" | "normal";
  score: number;
  responseSla: string;
  nextAction: string;
  reasons: string[];
  tags: string[];
 };
 profitability?: {
  incomeTotal: number;
  expenseTotal: number;
  costTotal: number;
  profit: number;
  updatedAt: string;
 };
 history?: Array<{
  status: string;
  note: string;
  timestamp: string;
  user: string;
 }>;
}

export type FloxDocumentType = "inquiry_summary" | "quote" | "order_confirmation" | "invoice";
export type FloxDocumentStatus =
  | "draft"
  | "generated"
  | "approved"
  | "sent"
  | "accepted"
  | "rejected"
  | "confirmed"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled"
  | "voided"
  | "archived";

export interface DocumentCustomerSnapshot {
 id?: string;
 customerType?: "private" | "company";
 customerNumber?: string;
 name: string;
 companyName?: string;
 contactPerson?: string;
 street?: string;
 zip?: string;
 city?: string;
 country?: string;
 email?: string;
 phone?: string;
 vatId?: string;
}

export interface DocumentServiceBlock {
 id: string;
 title: string;
 description?: string;
 orderIndex: number;
 serviceType?: string;
 date?: string;
 location?: string;
 notes?: string;
}

export interface DocumentLineItem {
 id: string;
 position?: number;
 description: string;
 quantity: number;
 unit: string;
 unitPrice: number;
 unitPriceNet?: number;
 discountPercent?: number;
 discountAmountNet?: number;
 taxRate: number; // e.g. 19 for 19%
 taxAmount?: number;
 lineTotalNet?: number;
 lineTotalGross?: number;
 serviceId?: string;
 category?: string;
 orderIndex?: number;
 total: number;
}

export interface FloxDocument {
 id: string;
 bookingId: string;
 type: FloxDocumentType;
 number: string; // e.g. AG-ID-V1
 status: FloxDocumentStatus;
 version: number;
 leadId?: string;
 customerId?: string;
 relatedDocumentId?: string;
 sourceDocumentId?: string;
 sourceFlow?: "manual" | "lead" | "booking" | "derived";
 
 // Snapshot data at time of creation
 snapshot: {
  contact: IntakeContact;
  service: IntakeServiceInfo;
  valuation: IntakeValuation;
  configuration: any;
  timestamp: string;
 };

 // Admin editable fields (especially for quotes/invoices)
 editableData: {
  title?: string;
  documentNumber?: string;
  publicRemark?: string;
  internalNote?: string;
  serviceDate?: string;
  servicePeriodStart?: string;
  servicePeriodEnd?: string;
  performanceLocation?: string;
  customer?: DocumentCustomerSnapshot;
  services?: DocumentServiceBlock[];
  introText?: string;
  items: DocumentLineItem[];
  conditions?: string;
  notesText?: string;
  validUntil?: string;
  documentDate?: string;
  dueDate?: string;
  paymentDueDate?: string;
  paymentTerms?: string;
  terms?: string;
  footerNote?: string;
 };

 totals: {
  net: number;
  discountTotal?: number;
  tax: number;
  gross: number;
  currency: string;
 };

 approvedAt?: string;
 sentAt?: string;
 deliveryInfo?: {
  method: 'email' | 'manual' | 'whatsapp';
  sentTo: string;
  status: 'success' | 'failed' | 'pending';
  error?: string;
 };

 createdAt: string;
 updatedAt: string;
}

export interface IntakePayload {
 contact: IntakeContact;
 service: IntakeServiceInfo;
 valuation: IntakeValuation;
 configuration: any;
 admin?: IntakeAdminMeta;
 metadata: {
  createdAt: string;
  intakeVersion: string;
 source: string;
 servicePresetFromUrl?: string;
 regionPreset?: string;
 conversionJourney?: any;
 clientContext?: any;
};
}
