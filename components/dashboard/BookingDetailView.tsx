"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m } from "framer-motion";
import {
 AlertTriangle,
 ArrowRightCircle,
 Check,
 CheckCircle2,
 ClipboardList,
 ExternalLink,
 Info,
 Loader2,
 Mail,
 MapPin,
 Phone,
 Settings,
 Trash2,
 TrendingUp,
 User,
 X,
} from "lucide-react";

import type { Booking } from "@/app/dashboard/DashboardClient";
import { germanizeText } from "@/lib/german-text";
import { cn } from "@/lib/utils";
import { PremiumButton } from "../ui/PremiumButton";
import { DocumentChainTracker } from "./documents/DocumentChainTracker";
import { DocumentManager } from "./documents/DocumentManager";
import { OperationsControlPanel } from "./OperationsControlPanel";

interface BookingDetailViewProps {
 booking: Booking;
 initialTab?: DetailTab;
 onClose: () => void;
 onSave: (updatedBooking: Booking) => void;
 onDelete: (bookingId: string) => Promise<void>;
}

type DetailTab = "overview" | "documents" | "work_order" | "costs" | "decision" | "ledger";

function formatStatus(status: string) {
 if (!status) return "Unbekannt";
 if (status === "new") return "Neu";
 return status.replace(/_/g, " ");
}

function renderConfigValue(value: any) {
 if (value === null || value === undefined) return "Nicht angegeben";
 if (typeof value === "boolean") return value ? "Ja" : "Nein";
 if (typeof value === "object") return JSON.stringify(value);
 return String(value);
}

function formatServiceLabel(service: string) {
 const labels: Record<string, string> = {
  umzug: "Umzug",
  reinigung: "Reinigung",
  entsorgung: "Entruempelung",
  bueroumzug: "Bueroumzug",
  firmenentsorgung: "Firmenentsorgung",
  leerfahrt: "Leerfahrt",
  private_client: "Private Client",
  villenservice: "Private Client",
 };

  return germanizeText(labels[service] || service.replace(/_/g, " "));
}

function getInquirySourceMeta(booking: Booking) {
 const source =
  booking.details?.service?.source ||
  booking.details?.metadata?.source ||
  (typeof booking.details?.configuration?.requestContext === "string"
   ? booking.details.configuration.requestContext
   : "") ||
  (typeof (booking.details as any)?.source === "string" ? (booking.details as any).source : "");
 const entryPoint =
  booking.details?.service?.entryPoint ||
  (typeof booking.details?.configuration?.entryPoint === "string"
   ? booking.details.configuration.entryPoint
   : "") ||
  (typeof booking.details?.metadata?.clientContext?.entryPoint === "string"
   ? booking.details.metadata.clientContext.entryPoint
   : "");

 const sourceMap: Record<string, string> = {
  booking_page_wizard: "Buchungssystem",
  budget_contact_form: "Preisvorschlag",
  quick_express_modal: "Express-Check",
  quick_express: "Express-Check",
  gewerbereinigung_regensburg: "Gewerbereinigung B2B",
  private_client_page: "Private Client",
  business_disposal_page: "Firmenentsorgung",
  backhaul_page: "Leer-Rueckfahrt",
  nav_pinned_button: "Navigation",
  dashboard: "Dashboard",
 };

 return {
   label: germanizeText(sourceMap[source] || "Direkte Anfrage"),
   entryPoint: germanizeText(entryPoint || "Nicht hinterlegt"),
 };
}

function formatValuationRange(booking: Booking) {
 const min = Number(booking.details?.valuation?.systemPriceRangeMin) || 0;
 const max = Number(booking.details?.valuation?.systemPriceRangeMax) || 0;

  if (!min && !max) return germanizeText("Noch keine Einschaetzung");
  return `${new Intl.NumberFormat("de-DE").format(min)} EUR - ${new Intl.NumberFormat("de-DE").format(max)} EUR`;
}

type LeadRoutingSummary = {
 priority?: string;
 score?: number;
 responseSla?: string;
 nextAction?: string;
 reasons?: string[];
 tags?: string[];
};

type ConversionJourneySummary = {
 journeyId?: string;
 lastEventName?: string;
 lastSource?: string;
 lastChannel?: string;
 lastIntent?: string;
 lastPriority?: string;
};

function getLeadRouting(booking: Booking): LeadRoutingSummary | null {
 const details = booking.details as any;
 return (
  details?.admin?.leadRouting ||
  details?.configuration?.leadRouting ||
  details?.metadata?.clientContext?.leadRouting ||
  details?.valuation?.pricingSignals?.leadRouting ||
  null
 );
}

function getConversionJourney(booking: Booking): ConversionJourneySummary | null {
 const details = booking.details as any;
 return (
  details?.metadata?.conversionJourney ||
  details?.configuration?.conversionJourney ||
  details?.valuation?.pricingSignals?.conversionJourney ||
  details?.metadata?.clientContext?.conversionJourney ||
  null
 );
}

function formatConversionJourney(journey: ConversionJourneySummary | null) {
 if (!journey) return "Nicht erfasst";
 const parts = [journey.lastChannel, journey.lastSource, journey.lastEventName].filter(Boolean);
 return germanizeText(parts.join(" / ") || journey.journeyId || "Erfasst");
}

function getPriorityTone(priority?: string) {
 switch (priority) {
  case "critical":
   return "border-red-200 bg-red-50 text-red-700";
  case "hot":
   return "border-orange-200 bg-orange-50 text-orange-700";
  case "warm":
   return "border-amber-200 bg-amber-50 text-amber-700";
  default:
   return "border-slate-200 bg-slate-50 text-slate-600";
 }
}

function getPriorityPanelTone(priority?: string) {
 switch (priority) {
  case "critical":
   return "border-red-200 bg-red-50";
  case "hot":
   return "border-orange-200 bg-orange-50";
  case "warm":
   return "border-amber-200 bg-amber-50";
  default:
   return "border-slate-200 bg-white";
 }
}

function formatPriorityLabel(priority?: string) {
 const labels: Record<string, string> = {
  critical: "Sofort",
  hot: "Heiss",
  warm: "Warm",
  normal: "Normal",
 };
 return labels[priority || "normal"] || "Normal";
}

export function BookingDetailView({
 booking,
 initialTab = "overview",
 onClose,
 onSave,
 onDelete,
}: BookingDetailViewProps) {
 const overlayRef = useRef<HTMLDivElement | null>(null);
 const [status, setStatus] = useState(booking.status);
 const [internalNotes, setInternalNotes] = useState(booking.details?.admin?.internalNotes || "");
 const [nextAction, setNextAction] = useState(booking.details?.admin?.nextAction || "");
 const [saving, setSaving] = useState(false);
 const [deleting, setDeleting] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [activeTab, setActiveTab] = useState<DetailTab>(initialTab);
 const sourceMeta = useMemo(() => getInquirySourceMeta(booking), [booking]);
 const leadRouting = useMemo(() => getLeadRouting(booking), [booking]);
 const conversionJourney = useMemo(() => getConversionJourney(booking), [booking]);

 const history = useMemo(() => booking.details?.admin?.history || [], [booking.details?.admin?.history]);

 useEffect(() => {
  setActiveTab(initialTab);
 }, [booking.id, initialTab]);

 useEffect(() => {
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  function handleKeydown(event: KeyboardEvent) {
   if (event.key === "Escape") {
    event.preventDefault();
    onClose();
   }
  }

  document.addEventListener("keydown", handleKeydown);

  return () => {
   document.body.style.overflow = previousOverflow;
   document.removeEventListener("keydown", handleKeydown);
  };
 }, [onClose]);

 async function handleSave() {
  setSaving(true);
  setError(null);

  try {
   const response = await fetch(`/api/bookings/${booking.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     status,
     internalNotes,
     nextAction,
    }),
   });

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Speichern fehlgeschlagen");
   onSave(data.data);
  } catch (saveError: any) {
   console.error("Save error:", saveError);
   setError(saveError.message || "Speichern fehlgeschlagen");
  } finally {
   setSaving(false);
  }
 }

 async function handleDocumentUpdate(documentParams: any) {
  setError(null);

  try {
   const response = await fetch(`/api/bookings/${booking.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(documentParams),
   });

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Dokumentenaktion fehlgeschlagen");
   onSave(data.data);
  } catch (documentError: any) {
   console.error("Document action error:", documentError);
   setError(documentError.message || "Dokumentenaktion fehlgeschlagen");
   throw documentError;
  }
 }

 async function handleDelete() {
  if (!window.confirm(`Moechten Sie die Anfrage von ${booking.name} wirklich dauerhaft loeschen?`)) return;

  setDeleting(true);
  setError(null);

  try {
   await onDelete(booking.id);
   onClose();
  } catch (deleteError: any) {
   console.error("Delete error:", deleteError);
   setError(deleteError.message || "Loeschen fehlgeschlagen");
  } finally {
   setDeleting(false);
  }
 }

const detailTabs: Array<{ id: DetailTab; label: string; hint: string }> = [
 { id: "overview", label: "Anfrage", hint: "Kontakt, Preiswahrheit, Status" },
 { id: "documents", label: "Dokumente", hint: "Angebot, Auftrag, Rechnung" },
 { id: "work_order", label: "Arbeitsauftrag", hint: "Teamleiter, Extras, Hinweise" },
 { id: "costs", label: "Kosten", hint: "Diesel, Automiete, Mitarbeiter" },
  { id: "decision", label: "Preispruefung", hint: "Mindestpreis, Marge, Entscheidung" },
 { id: "ledger", label: "Ein-/Ausgaben", hint: "Gewinn oder Verlust pro Auftrag" },
];

 const detailGroups = [
  {
   title: "Kundenanfrage",
   hint: "Kontakt, Startpunkt, Preisrahmen und Status bleiben fuer die Bearbeitung zusammen.",
   tabs: detailTabs.filter((tab) => tab.id === "overview"),
  },
  {
   title: "Dokumente",
   hint: "Angebot, Auftrag und Rechnung getrennt von Kalkulation und internen Zahlen pflegen.",
   tabs: detailTabs.filter((tab) => tab.id === "documents"),
  },
  {
   title: "Interne Steuerung",
   hint: "Nur intern: Arbeitsauftrag, Kosten, Preispruefung und Ein-/Ausgaben pro Auftrag.",
   tabs: detailTabs.filter((tab) => ["work_order", "costs", "decision", "ledger"].includes(tab.id)),
  },
 ] as const;

 return (
  <div
   ref={overlayRef}
   className="fixed inset-0 z-[100] flex items-center justify-end"
   aria-modal="true"
   role="dialog"
   aria-label="Vorgangsmanagement"
  >
   <m.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="absolute inset-0 bg-slate-950/45 backdrop-blur-md"
   />

   <m.div
    initial={{ x: "100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden border-l border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] shadow-2xl"
   >
    <header className="border-b border-slate-200 bg-white/90 p-6 backdrop-blur-xl">
     <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
       <div className="rounded-2xl border border-slate-200 bg-blue-50 p-3">
        <ClipboardList className="h-6 w-6 text-blue-700" />
       </div>
       <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-950">Vorgangsmanagement</h2>
        <p className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
         <span className="font-mono text-slate-400">{booking.id.slice(0, 8)}</span>
         <span>|</span>
         <span>{new Date(booking.timestamp).toLocaleDateString("de-DE")}</span>
         <span>|</span>
         <span>{formatServiceLabel(booking.service)}</span>
        </p>
       </div>
      </div>

      <button
       type="button"
       aria-label="Vorgang schliessen"
       onClick={onClose}
       className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950"
      >
       <X className="h-6 w-6" />
      </button>
     </div>

     <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-600">
       Kanal: {germanizeText(sourceMeta.label)}
      </span>
      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-600">
       Status: {formatStatus(status)}
      </span>
      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-600">
       Systemrahmen: {formatValuationRange(booking)}
      </span>
      {leadRouting ? (
       <span className={cn("rounded-full border px-3 py-1.5 font-semibold", getPriorityTone(leadRouting.priority))}>
        Prioritaet: {formatPriorityLabel(leadRouting.priority)}
        {typeof leadRouting.score === "number" ? ` (${leadRouting.score})` : ""}
       </span>
      ) : null}
     </div>

     <div className="mt-5 grid gap-3 xl:grid-cols-[0.92fr_0.92fr_1.26fr]">
      {detailGroups.map((group) => (
       <div key={group.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">{group.title}</p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{group.hint}</p>
        <div className="mt-4 grid gap-2">
         {group.tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
           <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
             "rounded-2xl border p-4 text-left transition-all",
             active
              ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-950/5"
              : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/60"
            )}
           >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-950">{tab.label}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{tab.hint}</p>
           </button>
          );
         })}
        </div>
       </div>
      ))}
     </div>
    </header>

    <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
     {activeTab === "overview" ? (
      <div className="grid items-start gap-8 lg:grid-cols-12">
       <div className="space-y-8 lg:col-span-7">
        <section className="space-y-4">
         <div className="flex items-center gap-2 text-slate-500">
          <User className="h-4 w-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Kontakt und Kontext</h3>
         </div>

         <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:grid-cols-2">
          <InfoCell label="Kunde" value={booking.name} />
          <InfoCell label="Service" value={formatServiceLabel(booking.service)} align="end" />
          <InfoLink label="E-Mail" value={booking.email} href={`mailto:${booking.email}`} />
          <InfoLink label="Telefon" value={booking.phone} href={`tel:${booking.phone}`} align="end" />
          <InfoCell label="Kanal" value={sourceMeta.label} />
          <InfoCell label="Startpunkt" value={sourceMeta.entryPoint} align="end" />
          <InfoCell label="Kontakt-Hinweis" value={formatConversionJourney(conversionJourney)} />
          <InfoCell label="Journey-ID" value={conversionJourney?.journeyId ? conversionJourney.journeyId.slice(0, 18) : "Nicht erfasst"} align="end" />
          <button
           type="button"
           onClick={handleDelete}
           disabled={deleting}
           className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
           {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
           Anfrage loeschen
          </button>
         </div>
        </section>

        {leadRouting ? (
         <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-500">
           <AlertTriangle className="h-4 w-4" />
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Lead-Priorisierung</h3>
          </div>

          <div className={cn("space-y-4 rounded-2xl border p-6 shadow-sm shadow-slate-950/5", getPriorityPanelTone(leadRouting.priority))}>
           <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
             <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Prioritaet</p>
             <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              {formatPriorityLabel(leadRouting.priority)}
              {typeof leadRouting.score === "number" ? (
               <span className="ml-2 text-sm font-bold text-slate-500">Score {leadRouting.score}</span>
              ) : null}
             </p>
            </div>
            <span className={cn("rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider", getPriorityTone(leadRouting.priority))}>
             {leadRouting.responseSla || "Regulaere Vorpruefung"}
            </span>
           </div>

           <div className="rounded-xl border border-white/70 bg-white/75 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Naechster Schritt</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-950">
             {leadRouting.nextAction || "Anfrage im normalen Backoffice-Prozess bearbeiten."}
            </p>
           </div>

           {leadRouting.reasons?.length ? (
            <div className="flex flex-wrap gap-2">
             {leadRouting.reasons.slice(0, 4).map((reason) => (
              <span key={reason} className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 shadow-sm shadow-slate-950/5">
               {germanizeText(reason)}
              </span>
             ))}
            </div>
           ) : null}
          </div>
         </section>
        ) : null}

        <section className="space-y-4">
         <div className="flex items-center gap-2 text-slate-500">
          <TrendingUp className="h-4 w-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Preiswahrheit</h3>
         </div>

         <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-blue-200 bg-blue-50 p-6">
           <div className="flex items-center justify-between">
             <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">{germanizeText("System-Einschaetzung")}</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-blue-700">
              {germanizeText(booking.details?.valuation?.valuationStage || "Vorpruefung")}
            </span>
           </div>
           <div className="text-2xl font-bold tracking-tight text-slate-950">{formatValuationRange(booking)}</div>
           {booking.details?.valuation?.priceExplanation ? (
            <p className="text-[11px] italic leading-relaxed text-slate-600">
             "{booking.details.valuation.priceExplanation}"
            </p>
           ) : null}
           {booking.details?.valuation?.topDrivers?.length ? (
            <div className="flex flex-wrap gap-1.5 border-t border-blue-100 pt-2">
             {booking.details.valuation.topDrivers.map((driver) => (
              <span key={driver} className="rounded-md bg-white px-2 py-0.5 text-[10px] text-slate-500">
               # {driver}
              </span>
             ))}
            </div>
           ) : null}
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
           <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Kunden-Budget</span>
           <div className={cn("text-2xl font-bold tracking-tight", booking.details?.valuation?.customerBudget ? "text-blue-700" : "text-slate-300")}>
             {booking.details?.valuation?.customerBudget ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(booking.details.valuation.customerBudget) : "Nicht angegeben"}
           </div>
           {booking.details?.valuation?.customerBudget && booking.details?.valuation?.systemPriceRangeMin ? (
            <div className="border-t border-slate-200 pt-2">
             {booking.details.valuation.customerBudget < booking.details.valuation.systemPriceRangeMin ? (
              <div className="flex items-center gap-2 text-red-700">
               <AlertTriangle className="h-4 w-4" />
               <span className="text-[10px] font-bold uppercase">Budget unter dem Rahmen</span>
              </div>
             ) : (
              <div className="flex items-center gap-2 text-emerald-700">
               <CheckCircle2 className="h-4 w-4" />
               <span className="text-[10px] font-bold uppercase">Budget wirkt plausibel</span>
              </div>
             )}
            </div>
           ) : null}
          </div>
         </div>
        </section>

        <section className="space-y-4">
         <div className="flex items-center gap-2 text-slate-500">
          <Settings className="h-4 w-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Konfiguration</h3>
         </div>

         <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
          <table className="w-full divide-y divide-slate-200">
           <tbody className="divide-y divide-slate-100">
            {Object.entries(booking.details?.configuration || {})
             .filter(([key, value]) => key !== "note" && value !== undefined && value !== "" && value !== null)
             .map(([key, value]) => (
              <tr key={key} className="transition-colors hover:bg-slate-50">
               <td className="w-1/3 px-6 py-3 text-xs font-medium text-slate-500">
                {germanizeText(
                 key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/_/g, " ")
                  .trim(),
                )}
               </td>
               <td className="px-6 py-3 text-xs font-medium text-slate-950">
                {germanizeText(renderConfigValue(value))}
               </td>
              </tr>
             ))}
           </tbody>
          </table>
         </div>

         {booking.details?.configuration?.note ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
           <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <Info className="h-3 w-3" />
            Zusatzhinweis
           </span>
           <p className="mt-3 text-sm font-medium text-slate-950">
            {germanizeText(String(booking.details.configuration.note))}
           </p>
          </div>
         ) : null}
        </section>
       </div>

       <div className="space-y-8 lg:col-span-5">
        <section className="space-y-4">
         <div className="flex items-center gap-2 text-slate-500">
          <ArrowRightCircle className="h-4 w-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Operative Steuerung</h3>
         </div>

         <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <div className="space-y-3">
           <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Vorgangs-Status</label>
           <div className="grid grid-cols-2 gap-2">
            {["new", "in_bearbeitung", "besichtigung_geplant", "angebot_versendet", "abgeschlossen", "storniert"].map((entry) => (
             <button
              key={entry}
              onClick={() => setStatus(entry)}
              className={cn(
               "rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all",
               status === entry
                ? "scale-[1.02] border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-700/20"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-blue-50"
              )}
             >
              {formatStatus(entry)}
             </button>
            ))}
           </div>
          </div>

          <div className="space-y-3">
           <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {germanizeText("Naechster Schritt")}
           </label>
           <select
            value={nextAction}
            onChange={(event) => setNextAction(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none focus:ring-1 focus:ring-blue-300"
           >
            <option value="">{germanizeText("Waehlen...")}</option>
            <option value="rueckruf_planung">{germanizeText("Rueckruf zur Detailplanung")}</option>
            <option value="besichtigung_anbieten">{germanizeText("Besichtigungstermin anbieten")}</option>
            <option value="angebot_erstellen">{germanizeText("Angebot finalisieren")}</option>
            <option value="daten_nachfordern">{germanizeText("Fotos oder Informationen nachfordern")}</option>
            <option value="whatsapp_followup">WhatsApp-Nachfassaktion</option>
           </select>
          </div>

          <div className="space-y-3">
           <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Interne Notizen</label>
           <textarea
            value={internalNotes}
            onChange={(event) => setInternalNotes(event.target.value)}
            placeholder={germanizeText("Interne Hinweise fuer die weitere Bearbeitung...")}
            className="h-48 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-blue-300"
           />
          </div>

          <div className="space-y-3 pt-4">
           {error ? <p className="mb-4 text-xs font-medium text-red-700">{error}</p> : null}

           <PremiumButton className="h-12 w-full bg-blue-600 text-sm font-bold shadow-sm shadow-blue-700/20" onClick={handleSave} disabled={saving}>
            {saving ? (
             <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
             <div className="flex items-center justify-center gap-2">
              <Check className="h-5 w-5" />
              {germanizeText("Aenderungen speichern")}
             </div>
            )}
           </PremiumButton>

           <div className="mt-4 grid grid-cols-2 gap-3">
            <a
             href={`/dashboard/documents/${booking.id}`}
             target="_blank"
             className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 transition-colors hover:bg-slate-50"
             rel="noreferrer"
            >
             <ExternalLink className="h-3.5 w-3.5" />
             Dokumente
            </a>
            <button
             onClick={onClose}
             className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 transition-colors hover:bg-slate-100"
            >
              {germanizeText("Schliessen")}
            </button>
           </div>
          </div>
         </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
         <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Bearbeitungshistorie</span>
         <div className="space-y-4">
          {history.length > 0 ? (
           history.slice(0, 8).map((entry, index) => (
            <div key={`${entry.timestamp}-${index}`} className="flex gap-3">
             <div className="w-1 rounded-full bg-blue-200" />
             <div className="flex-1">
              <p className="text-[11px] font-bold text-slate-950">{entry.note || formatStatus(entry.status)}</p>
              <p className="mt-1 text-[10px] text-slate-500">
               {new Date(entry.timestamp).toLocaleString("de-DE")} | {entry.user}
              </p>
             </div>
            </div>
           ))
          ) : (
           <div className="flex gap-3">
            <div className="w-1 rounded-full bg-blue-200" />
            <div className="flex-1">
             <p className="text-[11px] font-bold text-slate-950">Vorgang erstellt</p>
             <p className="mt-1 text-[10px] text-slate-500">{new Date(booking.timestamp).toLocaleString("de-DE")}</p>
            </div>
           </div>
          )}
         </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
         <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Schnellkontext</span>
         <div className="space-y-4 text-sm">
          <QuickContext icon={Mail} value={booking.email} label="E-Mail" />
          <QuickContext icon={Phone} value={booking.phone} label="Telefon" />
         <QuickContext
          icon={MapPin}
          value={booking.details?.configuration?.fromAddress || booking.details?.configuration?.location || "Unbekannt"}
          label="Ort oder Startadresse"
         />
         <QuickContext icon={ExternalLink} value={sourceMeta.label} label={sourceMeta.entryPoint} />
        </div>
       </section>
       </div>
      </div>
     ) : null}

     {activeTab === "documents" ? (
      <div className="space-y-6">
       <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">Dokumentenbereich</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
         Dokumente getrennt von Anfrage und Kalkulation pflegen
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {germanizeText(
           "Hier bearbeiten Sie Angebotskette, Auftragsbestaetigung, Rechnung und weitere Dokumente, ohne dass operative Kosten oder interne Pruefwerte durcheinander geraten.",
          )}
         </p>
       </div>

       <div className="space-y-6">
        <DocumentChainTracker documents={booking.details?.admin?.docs || []} />
        <DocumentManager bookingId={booking.id} documents={booking.details?.admin?.docs || []} onUpdate={handleDocumentUpdate} />
       </div>
      </div>
     ) : null}

     {activeTab === "work_order" ? <OperationsControlPanel booking={booking} onSave={onSave} initialPanel="work_order" lockedPanel /> : null}
     {activeTab === "costs" ? <OperationsControlPanel booking={booking} onSave={onSave} initialPanel="costs" lockedPanel /> : null}
     {activeTab === "decision" ? <OperationsControlPanel booking={booking} onSave={onSave} initialPanel="decision" lockedPanel /> : null}
     {activeTab === "ledger" ? <OperationsControlPanel booking={booking} onSave={onSave} initialPanel="ledger" lockedPanel /> : null}
    </div>
   </m.div>
  </div>
 );
}

function InfoCell({
 label,
 value,
 align,
}: {
 label: string;
 value: string;
 align?: "start" | "end";
}) {
 return (
  <div className={cn("space-y-1", align === "end" && "text-end")}>
   <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
   <p className="text-base font-bold text-slate-950">{value}</p>
  </div>
 );
}

function InfoLink({
 label,
 value,
 href,
 align,
}: {
 label: string;
 value: string;
 href: string;
 align?: "start" | "end";
}) {
 return (
  <div className={cn("space-y-1", align === "end" && "text-end")}>
   <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
   <a href={href} className="text-sm font-medium text-blue-700 hover:underline">
    {value}
   </a>
  </div>
 );
}

function QuickContext({
 icon: Icon,
 value,
 label,
}: {
 icon: typeof Mail;
 value: string;
 label: string;
}) {
 return (
  <div className="flex items-start gap-3">
   <Icon className="mt-0.5 h-4 w-4 text-blue-700" />
   <div>
    <p className="font-medium text-slate-950">{value}</p>
    <p className="text-slate-500">{label}</p>
   </div>
  </div>
 );
}
