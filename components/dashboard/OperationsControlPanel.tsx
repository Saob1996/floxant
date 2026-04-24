"use client";

import { useEffect, useMemo, useState } from "react";
import {
 AlertTriangle,
 Banknote,
 BriefcaseBusiness,
 Calculator,
 Check,
 ClipboardList,
 Euro,
 Loader2,
 MapPin,
 Plus,
 Trash2,
 TrendingDown,
 TrendingUp,
 UserRoundCheck,
} from "lucide-react";
import { Booking } from "@/app/dashboard/DashboardClient";
import {
 CommercialDecision,
 FinanceLedgerEntry,
 OperationCostLine,
 WorkOrderDetails,
} from "@/lib/types/intake";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { cn } from "@/lib/utils";

type OperationsControlPanelProps = {
 booking: Booking;
 onSave: (updatedBooking: Booking) => void;
 initialPanel?: OperationsPanel;
 lockedPanel?: boolean;
};

type OperationsPanel = "work_order" | "costs" | "decision" | "ledger";

const defaultCostCategories = [
 "Diesel",
 "Kilometer / Strecke",
 "Fahrzeugmiete",
 "Mitarbeiter",
 "Möbel Abbau/Aufbau",
 "Küche",
 "Material",
 "Entsorgung",
 "Sonstiges",
];

const defaultLedgerCategories = [
 "Kundenzahlung",
 "Anzahlung",
 "Nachzahlung",
 "Diesel",
 "Fahrzeugmiete",
 "Mitarbeiter",
 "Material",
 "Entsorgung",
 "Sonstiges",
];

function toNumber(value: unknown) {
 const parsed = Number(value);
 return Number.isFinite(parsed) ? parsed : 0;
}

function clamp(value: number, min: number, max: number) {
 return Math.min(Math.max(value, min), max);
}

function roundToBusinessStep(value: number) {
 if (!Number.isFinite(value) || value <= 0) return 0;
 return Math.ceil(value / 10) * 10;
}

function formatEuro(value: number) {
 return new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
 }).format(value || 0);
}

function shortDate(value?: string) {
 if (!value) return "";
 return value.slice(0, 10);
}

function getDefaultAmount(booking: Booking) {
 const gross = booking.details?.admin?.docs
  ?.filter((doc) => ["quote", "order_confirmation", "invoice"].includes(doc.type))
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]?.totals.gross;
 return Math.round(gross || booking.details?.valuation?.systemPriceRangeMin || 0);
}

function buildInitialWorkOrder(booking: Booking): WorkOrderDetails {
 const existing = booking.details?.admin?.workOrder || {};
 const configuration = booking.details?.configuration || {};
 const contact = booking.details?.contact;

 return {
  status: existing.status || "draft",
  teamLead: existing.teamLead || "",
  scheduledDate: shortDate(existing.scheduledDate || configuration.moveDate || configuration.date),
  timeWindow: existing.timeWindow || configuration.timeWindow || "",
  fromAddress:
   existing.fromAddress ||
   configuration.fromAddress ||
   configuration.startAddress ||
   configuration.location ||
   "",
  toAddress: existing.toAddress || configuration.toAddress || configuration.targetAddress || "",
  contactName: existing.contactName || contact?.fullName || booking.name || "",
  contactPhone: existing.contactPhone || contact?.phone || booking.phone || "",
  contactEmail: existing.contactEmail || contact?.email || booking.email || "",
  agreedAmount: toNumber(existing.agreedAmount || getDefaultAmount(booking)),
  serviceLabel: existing.serviceLabel || booking.service.replace(/_/g, " "),
  extraServices: existing.extraServices || booking.upgrades || [],
  teamInstructions: existing.teamInstructions || configuration.customerMessage || configuration.note || "",
  accessNotes: existing.accessNotes || "",
 };
}

function newCostLine(category = "Mitarbeiter"): OperationCostLine {
 return {
  id: crypto.randomUUID(),
  label: category,
  category,
  quantity: 1,
  unit: category === "Kilometer / Strecke" ? "km" : category === "Mitarbeiter" ? "Std." : "Stk.",
  unitCost: 0,
  note: "",
 };
}

function newLedgerEntry(type: FinanceLedgerEntry["type"]): FinanceLedgerEntry {
 return {
  id: crypto.randomUUID(),
  type,
  label: type === "income" ? "Kundenzahlung" : "Ausgabe",
  category: type === "income" ? "Kundenzahlung" : "Sonstiges",
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
  note: "",
 };
}

function sumCostLines(lines: OperationCostLine[]) {
 return lines.reduce((sum, line) => sum + toNumber(line.quantity) * toNumber(line.unitCost), 0);
}

function sumLedgerExpenses(entries: FinanceLedgerEntry[]) {
 return entries
  .filter((entry) => entry.type === "expense")
  .reduce((sum, entry) => sum + toNumber(entry.amount), 0);
}

function buildInitialCommercialDecision(
 booking: Booking,
 workOrder: WorkOrderDetails,
 costLines: OperationCostLine[],
 ledgerEntries: FinanceLedgerEntry[]
): CommercialDecision {
 const existing = booking.details?.admin?.commercialDecision || {};
 const targetMarginPercent = existing.targetMarginPercent ?? 25;
 const expenseTotal = sumCostLines(costLines) + sumLedgerExpenses(ledgerEntries);
 const computedMinimum = roundToBusinessStep(expenseTotal / Math.max(0.1, 1 - clamp(targetMarginPercent, 0, 80) / 100));
 const fallbackOffer = toNumber(workOrder.agreedAmount) || getDefaultAmount(booking);

 return {
  decision: existing.decision || "review",
  offerPrice: toNumber(existing.offerPrice) || fallbackOffer,
  minimumTakePrice: toNumber(existing.minimumTakePrice) || computedMinimum,
  targetMarginPercent,
  decisionNote: existing.decisionNote || "",
  updatedAt: existing.updatedAt,
 };
}

function getDecisionLabel(decision?: CommercialDecision["decision"]) {
 if (decision === "accept") return "Übernehmen";
 if (decision === "negotiate") return "Verhandeln";
 if (decision === "decline") return "Ablehnen";
 return "Prüfen";
}

const panelCopy: Record<OperationsPanel, { eyebrow: string; title: string; description: string }> = {
 work_order: {
  eyebrow: "Teamleiter-Ansicht",
  title: "Arbeitsauftrag für die Umsetzung vorbereiten.",
  description: "Adresse, Kontakt, Ziel, Datum, Betrag, Extras und Hinweise stehen konzentriert im Mittelpunkt.",
 },
 costs: {
  eyebrow: "Interner Kostenrechner",
  title: "Auftragskosten realistisch kalkulieren.",
  description: "Diesel, Kilometer, Mitarbeiter, Fahrzeug, Material und Sonderkosten bleiben ausschließlich intern.",
 },
 decision: {
  eyebrow: "Chef-Preisprüfung",
  title: "Preisentscheidung mit Mindestpreis und Marge treffen.",
  description: "Systemrahmen, Kundenbudget, Kostenstand und interne Entscheidung werden getrennt von Kundendokumenten geprüft.",
 },
 ledger: {
  eyebrow: "Interne Ein-/Ausgaben",
  title: "Zahlungen, Ausgaben und Ergebnis pro Auftrag pflegen.",
  description: "Diese Werte dienen der internen Wirtschaftlichkeit und erscheinen nicht automatisch in Angeboten oder Rechnungen.",
 },
};

export function OperationsControlPanel({ booking, onSave, initialPanel = "work_order", lockedPanel = false }: OperationsControlPanelProps) {
 const [activePanel, setActivePanel] = useState<OperationsPanel>(initialPanel);
 const [workOrder, setWorkOrder] = useState<WorkOrderDetails>(() => buildInitialWorkOrder(booking));
 const [extraServicesText, setExtraServicesText] = useState(() => (workOrder.extraServices || []).join("\n"));
 const [costLines, setCostLines] = useState<OperationCostLine[]>(() =>
  booking.details?.admin?.costLines?.length
   ? booking.details.admin.costLines
   : [
     { ...newCostLine("Diesel"), unit: "l", label: "Diesel", unitCost: 0 },
     { ...newCostLine("Kilometer / Strecke"), unit: "km", label: "Strecke Start-Ziel", unitCost: 0 },
     { ...newCostLine("Mitarbeiter"), unit: "Std.", label: "Mitarbeiterstunden", unitCost: 0 },
    ]
 );
 const [ledgerEntries, setLedgerEntries] = useState<FinanceLedgerEntry[]>(() =>
  booking.details?.admin?.ledgerEntries?.length
   ? booking.details.admin.ledgerEntries
   : getDefaultAmount(booking) > 0
    ? [
      {
       ...newLedgerEntry("income"),
       label: "Geplante Kundeneinnahme",
       amount: getDefaultAmount(booking),
       note: "Aus Angebot oder Systemrahmen übernommen, bitte final prüfen.",
      },
     ]
    : []
 );
 const [commercialDecision, setCommercialDecision] = useState<CommercialDecision>(() =>
  buildInitialCommercialDecision(booking, workOrder, costLines, ledgerEntries)
 );
 const [saving, setSaving] = useState(false);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  setActivePanel(initialPanel);
 }, [initialPanel]);

 const activeCopy = panelCopy[activePanel];

 const totals = useMemo(() => {
  const costTotal = costLines.reduce((sum, line) => sum + toNumber(line.quantity) * toNumber(line.unitCost), 0);
  const incomeTotal = ledgerEntries
   .filter((entry) => entry.type === "income")
   .reduce((sum, entry) => sum + toNumber(entry.amount), 0);
  const ledgerExpenseTotal = ledgerEntries
   .filter((entry) => entry.type === "expense")
   .reduce((sum, entry) => sum + toNumber(entry.amount), 0);
  const expenseTotal = costTotal + ledgerExpenseTotal;

  return {
   costTotal,
   ledgerExpenseTotal,
   incomeTotal,
   expenseTotal,
   profit: incomeTotal - expenseTotal,
  };
 }, [costLines, ledgerEntries]);

 const decisionPreview = useMemo(() => {
  const targetMarginPercent = clamp(toNumber(commercialDecision.targetMarginPercent || 25), 0, 80);
  const computedMinimum = roundToBusinessStep(
   totals.expenseTotal / Math.max(0.1, 1 - targetMarginPercent / 100)
  );
  const minimumTakePrice = toNumber(commercialDecision.minimumTakePrice) || computedMinimum;
  const offerPrice = toNumber(commercialDecision.offerPrice) || toNumber(workOrder.agreedAmount) || getDefaultAmount(booking);
  const profitAtOffer = offerPrice - totals.expenseTotal;
  const marginAtOffer = offerPrice > 0 ? (profitAtOffer / offerPrice) * 100 : 0;
  const decision = commercialDecision.decision || "review";

  return {
   targetMarginPercent,
   computedMinimum,
   minimumTakePrice,
   offerPrice,
   profitAtOffer,
   marginAtOffer,
   decision,
   healthy: offerPrice >= minimumTakePrice && profitAtOffer >= 0,
   needsNegotiation: offerPrice > 0 && offerPrice < minimumTakePrice,
  };
 }, [booking, commercialDecision, totals.expenseTotal, workOrder.agreedAmount]);

 function updateWorkOrder(field: keyof WorkOrderDetails, value: string | number) {
  setWorkOrder((current) => ({
   ...current,
   [field]: field === "agreedAmount" ? toNumber(value) : value,
  }));
 }

 function updateCostLine(id: string, patch: Partial<OperationCostLine>) {
  setCostLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
 }

 function updateLedgerEntry(id: string, patch: Partial<FinanceLedgerEntry>) {
  setLedgerEntries((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
 }

 function updateCommercialDecision(patch: Partial<CommercialDecision>) {
  setCommercialDecision((current) => ({ ...current, ...patch }));
 }

 function applyOfferPriceToIncome() {
  const amount = toNumber(decisionPreview.offerPrice);
  if (!amount) return;

  setWorkOrder((current) => ({ ...current, agreedAmount: amount }));
  setLedgerEntries((current) => {
   const existing = current.find((entry) => entry.type === "income" && entry.category === "Kundenzahlung");
   if (existing) {
    return current.map((entry) =>
     entry.id === existing.id
      ? { ...entry, label: "Geplante Kundeneinnahme", amount, note: "Aus Preisprüfung übernommen." }
      : entry
    );
   }

   return [
    ...current,
    {
     ...newLedgerEntry("income"),
     label: "Geplante Kundeneinnahme",
     amount,
     note: "Aus Preisprüfung übernommen.",
    },
   ];
  });
 }

 async function handleSave() {
  setSaving(true);
  setError(null);

  const normalizedWorkOrder: WorkOrderDetails = {
   ...workOrder,
   extraServices: extraServicesText
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean),
   agreedAmount: toNumber(workOrder.agreedAmount),
  };
  const normalizedCommercialDecision: CommercialDecision = {
   ...commercialDecision,
   offerPrice: toNumber(decisionPreview.offerPrice),
   minimumTakePrice: toNumber(decisionPreview.minimumTakePrice),
   targetMarginPercent: toNumber(decisionPreview.targetMarginPercent),
   decision: decisionPreview.decision,
   decisionNote: commercialDecision.decisionNote?.trim() || "",
   updatedAt: new Date().toISOString(),
  };

  try {
   const response = await fetch(`/api/bookings/${booking.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     operations: {
      workOrder: normalizedWorkOrder,
      costLines,
      ledgerEntries,
      commercialDecision: normalizedCommercialDecision,
     },
    }),
   });

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Speichern fehlgeschlagen");
   onSave(data.data);
  } catch (saveError: any) {
   console.error("Operations save failed:", saveError);
   setError(saveError.message || "Speichern fehlgeschlagen");
  } finally {
   setSaving(false);
  }
 }

 return (
  <section className="space-y-6">
   <div className="rounded-[2rem] border border-foreground/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-4">
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
     <div>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 ">{activeCopy.eyebrow}</p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
       {activeCopy.title}
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/48">
       {activeCopy.description}
      </p>
     </div>
     <PremiumButton className="h-11 bg-blue-600 px-5 text-xs font-bold shadow-xl shadow-blue-700/20" onClick={handleSave} disabled={saving}>
      {saving ? (
       <Loader2 className="mx-auto h-5 w-5 animate-spin" />
      ) : (
       <span className="flex items-center gap-2">
        <Check className="h-4 w-4" />
        Speichern
       </span>
      )}
     </PremiumButton>
    </div>
    {lockedPanel ? (
     <div className="rounded-2xl border border-blue-300/15 bg-blue-400/10 p-4 text-sm leading-relaxed text-blue-900 ">
      Fokusmodus aktiv: Es wird nur dieser Arbeitsbereich angezeigt. Andere Bereiche bleiben über die obere Navigation erreichbar.
     </div>
    ) : (
    <div className="grid gap-2 md:grid-cols-4">
     {[
      { id: "work_order" as const, label: "1. Arbeitsauftrag", hint: "Teamleiter, Adresse, Extras", icon: ClipboardList },
      { id: "costs" as const, label: "2. Kostenrechner", hint: "Diesel, km, Mitarbeiter, Material", icon: Calculator },
      { id: "decision" as const, label: "3. Preisprüfung", hint: "Mindestpreis, Angebot, Entscheidung", icon: Euro },
      { id: "ledger" as const, label: "4. Ein-/Ausgaben", hint: "Zahlungen, Ausgaben, Ergebnis", icon: Banknote },
     ].map((tab) => {
      const Icon = tab.icon;
      const active = activePanel === tab.id;
      return (
       <button
        key={tab.id}
        type="button"
        onClick={() => setActivePanel(tab.id)}
        className={cn(
         "rounded-2xl border p-4 text-left transition-all",
         active
          ? "border-blue-300/35 bg-blue-500/15 text-foreground"
          : "border-foreground/10 bg-foreground/5 text-foreground/55 hover:border-foreground/20 hover:bg-white/[0.04]"
        )}
       >
        <div className="mb-3 flex items-center gap-2">
         <Icon className="h-4 w-4 text-blue-600 " />
         <span className="text-xs font-black uppercase tracking-[0.14em]">{tab.label}</span>
        </div>
        <p className="text-xs leading-relaxed text-foreground/42">{tab.hint}</p>
       </button>
      );
     })}
    </div>
    )}
    {error ? <p className="mt-3 text-xs font-medium text-red-300">{error}</p> : null}
   </div>

   <div className={cn(
    "rounded-[2rem] border border-blue-300/15 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(255,255,255,0.025))] p-6",
    activePanel !== "work_order" && "hidden"
   )}>
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
     <div>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800 ">
       <UserRoundCheck className="h-3.5 w-3.5" />
       Teamleiter-Arbeitsauftrag
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-foreground">Was das Team vor Ort wissen muss</h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/50">
       Adresse, Kontakt, Ziel, Datum, Betrag, Zusatzleistungen und Hinweise werden hier als klarer Arbeitsauftrag gespeichert.
      </p>
     </div>
     <span
      className={cn(
       "rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]",
       workOrder.status === "ready_for_team"
        ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-600 "
        : "border-foreground/10 bg-white/[0.04] text-foreground/45"
      )}
     >
      {workOrder.status === "ready_for_team" ? "Bereit fürs Team" : workOrder.status || "Entwurf"}
     </span>
    </div>

    <div className="grid gap-4 lg:grid-cols-4">
     <OperationsField label="Teamleiter" value={workOrder.teamLead || ""} onChange={(value) => updateWorkOrder("teamLead", value)} />
     <OperationsField label="Datum" type="date" value={workOrder.scheduledDate || ""} onChange={(value) => updateWorkOrder("scheduledDate", value)} />
     <OperationsField label="Zeitfenster" value={workOrder.timeWindow || ""} onChange={(value) => updateWorkOrder("timeWindow", value)} />
     <OperationsSelect
      label="Status"
      value={workOrder.status || "draft"}
      options={[
       ["draft", "Entwurf"],
       ["planned", "Geplant"],
       ["ready_for_team", "Bereit fürs Team"],
       ["in_progress", "In Umsetzung"],
       ["done", "Erledigt"],
      ]}
      onChange={(value) => updateWorkOrder("status", value)}
     />
     <div className="lg:col-span-2">
      <OperationsField label="Auszugsort / Startadresse" value={workOrder.fromAddress || ""} onChange={(value) => updateWorkOrder("fromAddress", value)} />
     </div>
     <div className="lg:col-span-2">
      <OperationsField label="Ziel / Einzugsort" value={workOrder.toAddress || ""} onChange={(value) => updateWorkOrder("toAddress", value)} />
     </div>
     <OperationsField label="Kontaktperson" value={workOrder.contactName || ""} onChange={(value) => updateWorkOrder("contactName", value)} />
     <OperationsField label="Telefon" value={workOrder.contactPhone || ""} onChange={(value) => updateWorkOrder("contactPhone", value)} />
     <OperationsField label="E-Mail" value={workOrder.contactEmail || ""} onChange={(value) => updateWorkOrder("contactEmail", value)} />
     <OperationsField label="Geplanter Betrag EUR" type="number" value={String(workOrder.agreedAmount || "")} onChange={(value) => updateWorkOrder("agreedAmount", value)} />
     <div className="lg:col-span-2">
      <OperationsTextarea label="Extra-Services" value={extraServicesText} onChange={setExtraServicesText} placeholder="z. B. Möbel abbauen, Möbel aufbauen, Küche, Verpackung, Entsorgung" />
     </div>
     <div className="lg:col-span-2">
      <OperationsTextarea label="Hinweise für Teamleiter" value={workOrder.teamInstructions || ""} onChange={(value) => updateWorkOrder("teamInstructions", value)} placeholder="Was muss das Team unbedingt wissen?" />
     </div>
     <div className="lg:col-span-4">
      <OperationsTextarea label="Zugang / Parken / Besonderheiten" value={workOrder.accessNotes || ""} onChange={(value) => updateWorkOrder("accessNotes", value)} placeholder="Stockwerk, Aufzug, Laufweg, Haltezone, enge Treppe, Schlüssel, Ansprechpartner vor Ort ..." />
     </div>
    </div>
   </div>

   <div className={cn(
    "grid gap-6 xl:grid-cols-[1.12fr_0.88fr]",
    activePanel !== "costs" && "hidden"
   )}>
    <div className="rounded-[2rem] border border-foreground/10 bg-white/[0.025] p-6">
     <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
       <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-500 ">
        <Calculator className="h-4 w-4" />
        Interne Kostenrechnung
       </div>
       <h3 className="text-xl font-bold text-foreground">Was kostet uns dieser Auftrag?</h3>
      </div>
      <button
       type="button"
       onClick={() => setCostLines((current) => [...current, newCostLine("Sonstiges")])}
       className="inline-flex items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground"
      >
       <Plus className="h-4 w-4" />
       Kostenposition
      </button>
     </div>

     <div className="mb-4 flex flex-wrap gap-2">
      {defaultCostCategories.map((category) => (
       <button
        key={category}
        type="button"
        onClick={() => setCostLines((current) => [...current, newCostLine(category)])}
        className="rounded-full border border-foreground/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/55 transition hover:border-blue-300/25 hover:bg-blue-500/10 hover:text-foreground"
       >
        + {category}
       </button>
      ))}
     </div>

     <div className="space-y-3">
      {costLines.map((line) => (
       <div key={line.id} className="grid gap-2 rounded-2xl border border-foreground/8 bg-foreground/5 p-3 md:grid-cols-[1.2fr_1fr_0.55fr_0.55fr_0.8fr_auto] md:items-end">
        <OperationsField label="Position" value={line.label} onChange={(value) => updateCostLine(line.id, { label: value })} />
        <OperationsSelect label="Kategorie" value={line.category} options={defaultCostCategories.map((entry) => [entry, entry])} onChange={(value) => updateCostLine(line.id, { category: value })} />
        <OperationsField label="Menge" type="number" value={String(line.quantity)} onChange={(value) => updateCostLine(line.id, { quantity: toNumber(value) })} />
        <OperationsField label="Einheit" value={line.unit} onChange={(value) => updateCostLine(line.id, { unit: value })} />
        <OperationsField label="Kosten/Einheit" type="number" value={String(line.unitCost)} onChange={(value) => updateCostLine(line.id, { unitCost: toNumber(value) })} />
        <button
         type="button"
         onClick={() => setCostLines((current) => current.filter((item) => item.id !== line.id))}
         className="mb-1 inline-flex h-10 items-center justify-center rounded-xl border border-red-300/10 bg-red-400/5 px-3 text-red-200/70 hover:text-red-100"
         aria-label="Kostenposition löschen"
        >
         <Trash2 className="h-4 w-4" />
        </button>
        <div className="md:col-span-6">
         <OperationsField label="Notiz" value={line.note || ""} onChange={(value) => updateCostLine(line.id, { note: value })} />
        </div>
       </div>
      ))}
     </div>
    </div>

    <div className="rounded-[2rem] border border-emerald-300/15 bg-[linear-gradient(135deg,rgba(16,185,129,0.09),rgba(255,255,255,0.02))] p-6">
     <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600 ">
      <Euro className="h-4 w-4" />
      Gewinn / Verlust
     </div>

     <div className="grid gap-3">
      <FinanceMetric label="Einnahmen" value={totals.incomeTotal} tone="green" icon={TrendingUp} />
      <FinanceMetric label="Kostenrechner" value={totals.costTotal} tone="red" icon={TrendingDown} />
      <FinanceMetric label="Weitere Ausgaben" value={totals.ledgerExpenseTotal} tone="red" icon={TrendingDown} />
      <div className={cn("rounded-2xl border p-5", totals.profit >= 0 ? "border-emerald-300/25 bg-emerald-400/10" : "border-red-300/20 bg-red-400/10")}>
       <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">Ergebnis bis dato</p>
       <p className={cn("mt-2 text-3xl font-black", totals.profit >= 0 ? "text-emerald-600 " : "text-red-200")}>
        {formatEuro(totals.profit)}
       </p>
       <p className="mt-2 text-xs leading-relaxed text-foreground/45">
        Positiv bedeutet: Auftrag wirkt nach aktuell eingetragenen Einnahmen und Kosten wirtschaftlich.
       </p>
      </div>
     </div>
    </div>
   </div>

   <div className={cn(
    "grid gap-6 xl:grid-cols-[1fr_0.9fr]",
    activePanel !== "decision" && "hidden"
   )}>
    <div className="rounded-[2rem] border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,158,11,0.10),rgba(255,255,255,0.02))] p-6">
     <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div>
       <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-500 ">
        <Euro className="h-4 w-4" />
        Preisentscheidung
       </div>
       <h3 className="text-xl font-bold text-foreground">Zu welchem Preis lohnt sich der Auftrag?</h3>
       <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/48">
        Diese Prüfung ist intern. Sie hilft, Mindestpreis, Angebotspreis und Entscheidung nachvollziehbar zu speichern.
       </p>
      </div>
      <span className={cn(
       "rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]",
       decisionPreview.healthy
        ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-600 "
        : decisionPreview.needsNegotiation
         ? "border-amber-300/25 bg-amber-400/10 text-amber-500 "
         : "border-foreground/10 bg-white/[0.04] text-foreground/45"
      )}>
       {getDecisionLabel(decisionPreview.decision)}
      </span>
     </div>

     <div className="grid gap-4 md:grid-cols-2">
      <OperationsField
       label="Geplanter Angebotspreis EUR"
       type="number"
       value={String(commercialDecision.offerPrice || "")}
       onChange={(value) => updateCommercialDecision({ offerPrice: toNumber(value) })}
      />
      <OperationsField
       label="Mindestpreis EUR"
       type="number"
       value={String(commercialDecision.minimumTakePrice || decisionPreview.computedMinimum || "")}
       onChange={(value) => updateCommercialDecision({ minimumTakePrice: toNumber(value) })}
      />
      <OperationsField
       label="Ziel-Gewinnmarge %"
       type="number"
       value={String(commercialDecision.targetMarginPercent ?? 25)}
       onChange={(value) => updateCommercialDecision({ targetMarginPercent: toNumber(value) })}
      />
      <OperationsSelect
       label="Entscheidung"
       value={commercialDecision.decision || "review"}
       options={[
        ["review", "Noch prüfen"],
        ["accept", "Übernehmen"],
        ["negotiate", "Verhandeln"],
        ["decline", "Ablehnen"],
       ]}
       onChange={(value) => updateCommercialDecision({ decision: value as CommercialDecision["decision"] })}
      />
      <div className="md:col-span-2">
       <OperationsTextarea
        label="Entscheidungsnotiz"
        value={commercialDecision.decisionNote || ""}
        onChange={(value) => updateCommercialDecision({ decisionNote: value })}
        placeholder="Warum übernehmen, verhandeln oder ablehnen? z. B. zu viel Fahrzeit, gute Route, Zusatzleistung nötig ..."
       />
      </div>
     </div>

     <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/5 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3 text-sm text-foreground/55">
       <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500 " />
       <span>
        Wenn der Angebotspreis unter dem Mindestpreis liegt, sollte der Auftrag verhandelt oder abgelehnt werden.
       </span>
      </div>
      <button
       type="button"
       onClick={applyOfferPriceToIncome}
       className="rounded-2xl bg-amber-200 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-amber-100"
      >
       Preis als Einnahme übernehmen
      </button>
     </div>
    </div>

    <div className="rounded-[2rem] border border-foreground/10 bg-white/[0.025] p-6">
     <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">
      <Calculator className="h-4 w-4" />
      Entscheidungshilfe
     </div>

     <div className="grid gap-3">
      <FinanceMetric label="Interne Kosten + Ausgaben" value={totals.expenseTotal} tone="red" icon={TrendingDown} />
      <FinanceMetric label="Mindestpreis" value={decisionPreview.minimumTakePrice} tone="green" icon={TrendingUp} />
      <FinanceMetric label="Angebotspreis" value={decisionPreview.offerPrice} tone="green" icon={TrendingUp} />
      <div className={cn("rounded-2xl border p-5", decisionPreview.profitAtOffer >= 0 ? "border-emerald-300/25 bg-emerald-400/10" : "border-red-300/20 bg-red-400/10")}>
       <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">Erwartetes Ergebnis bei Angebotspreis</p>
       <p className={cn("mt-2 text-3xl font-black", decisionPreview.profitAtOffer >= 0 ? "text-emerald-600 " : "text-red-200")}>
        {formatEuro(decisionPreview.profitAtOffer)}
       </p>
       <p className="mt-2 text-xs leading-relaxed text-foreground/45">
        Marge: {decisionPreview.marginAtOffer.toFixed(1)} %. Ziel: {decisionPreview.targetMarginPercent} %.
       </p>
      </div>
     </div>
    </div>
   </div>

   <div className={cn(
    "rounded-[2rem] border border-foreground/10 bg-white/[0.025] p-6",
    activePanel !== "ledger" && "hidden"
   )}>
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
     <div>
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 ">
       <Banknote className="h-4 w-4" />
       Einnahmen und Ausgaben
      </div>
      <h3 className="text-xl font-bold text-foreground">Flexible Buchungsliste pro Auftrag</h3>
     </div>
     <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => setLedgerEntries((current) => [...current, newLedgerEntry("income")])} className="rounded-2xl bg-emerald-300 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-950">
       Einnahme hinzufügen
      </button>
      <button type="button" onClick={() => setLedgerEntries((current) => [...current, newLedgerEntry("expense")])} className="rounded-2xl border border-red-300/15 bg-red-400/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-red-100">
       Ausgabe hinzufügen
      </button>
     </div>
    </div>

    <div className="space-y-3">
     {ledgerEntries.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-foreground/10 p-6 text-sm text-foreground/45">
       Noch keine Einnahmen oder Ausgaben eingetragen.
      </div>
     ) : (
      ledgerEntries.map((entry) => (
       <div key={entry.id} className="grid gap-2 rounded-2xl border border-foreground/8 bg-foreground/5 p-3 md:grid-cols-[0.75fr_1.2fr_1fr_0.8fr_0.9fr_auto] md:items-end">
        <OperationsSelect label="Typ" value={entry.type} options={[["income", "Einnahme"], ["expense", "Ausgabe"]]} onChange={(value) => updateLedgerEntry(entry.id, { type: value as FinanceLedgerEntry["type"] })} />
        <OperationsField label="Bezeichnung" value={entry.label} onChange={(value) => updateLedgerEntry(entry.id, { label: value })} />
        <OperationsSelect label="Kategorie" value={entry.category} options={defaultLedgerCategories.map((item) => [item, item])} onChange={(value) => updateLedgerEntry(entry.id, { category: value })} />
        <OperationsField label="Betrag" type="number" value={String(entry.amount)} onChange={(value) => updateLedgerEntry(entry.id, { amount: toNumber(value) })} />
        <OperationsField label="Datum" type="date" value={entry.date || ""} onChange={(value) => updateLedgerEntry(entry.id, { date: value })} />
        <button
         type="button"
         onClick={() => setLedgerEntries((current) => current.filter((item) => item.id !== entry.id))}
         className="mb-1 inline-flex h-10 items-center justify-center rounded-xl border border-red-300/10 bg-red-400/5 px-3 text-red-200/70 hover:text-red-100"
         aria-label="Eintrag löschen"
        >
         <Trash2 className="h-4 w-4" />
        </button>
        <div className="md:col-span-6">
         <OperationsField label="Notiz" value={entry.note || ""} onChange={(value) => updateLedgerEntry(entry.id, { note: value })} />
        </div>
       </div>
      ))
     )}
    </div>

    <div className="mt-6 flex flex-col gap-3 border-t border-foreground/10 pt-5 md:flex-row md:items-center md:justify-between">
     <div className="flex items-center gap-3 text-sm text-foreground/48">
      <BriefcaseBusiness className="h-5 w-5 text-blue-600 " />
      <span>Diese Ein-/Ausgaben sind nur für die interne Auswertung. Sie werden nicht in Kundenanfragen, Verträge oder Rechnungen übernommen.</span>
     </div>
     <PremiumButton className="h-12 bg-blue-600 px-6 text-sm font-bold shadow-xl shadow-blue-700/20" onClick={handleSave} disabled={saving}>
      {saving ? (
       <Loader2 className="mx-auto h-5 w-5 animate-spin" />
      ) : (
       <span className="flex items-center gap-2">
        <Check className="h-5 w-5" />
        Arbeitsauftrag & Finanzen speichern
       </span>
      )}
     </PremiumButton>
    </div>
   </div>
  </section>
 );
}

function OperationsField({
 label,
 value,
 onChange,
 type = "text",
}: {
 label: string;
 value: string;
 onChange: (value: string) => void;
 type?: string;
}) {
 return (
  <label className="block">
   <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/35">{label}</span>
   <input
    type={type}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-11 w-full rounded-xl border border-foreground/10 bg-[#070A10] px-3 text-sm text-foreground outline-none focus:border-blue-300/45"
   />
  </label>
 );
}

function OperationsTextarea({
 label,
 value,
 onChange,
 placeholder,
}: {
 label: string;
 value: string;
 onChange: (value: string) => void;
 placeholder?: string;
}) {
 return (
  <label className="block">
   <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/35">{label}</span>
   <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    className="h-28 w-full resize-none rounded-xl border border-foreground/10 bg-[#070A10] px-3 py-3 text-sm text-foreground outline-none placeholder:text-foreground/20 focus:border-blue-300/45"
   />
  </label>
 );
}

function OperationsSelect({
 label,
 value,
 options,
 onChange,
}: {
 label: string;
 value: string;
 options: string[][];
 onChange: (value: string) => void;
}) {
 return (
  <label className="block">
   <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/35">{label}</span>
   <select
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-11 w-full rounded-xl border border-foreground/10 bg-[#070A10] px-3 text-sm text-foreground outline-none focus:border-blue-300/45"
   >
    {options.map(([optionValue, optionLabel]) => (
     <option key={optionValue} value={optionValue} className="bg-[#070A10]">
      {optionLabel}
     </option>
    ))}
   </select>
  </label>
 );
}

function FinanceMetric({
 label,
 value,
 tone,
 icon: Icon,
}: {
 label: string;
 value: number;
 tone: "green" | "red";
 icon: typeof TrendingUp;
}) {
 return (
  <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
   <div className="flex items-center justify-between gap-3">
    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/40">{label}</p>
    <Icon className={cn("h-4 w-4", tone === "green" ? "text-emerald-600 " : "text-red-200")} />
   </div>
   <p className={cn("mt-2 text-2xl font-black", tone === "green" ? "text-emerald-600 " : "text-red-200")}>
    {formatEuro(value)}
   </p>
  </div>
 );
}
