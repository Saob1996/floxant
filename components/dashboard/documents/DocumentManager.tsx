"use client";

import { useState } from "react";
import {
 Check,
 CheckCircle2,
 Clock,
 Download,
 Edit3,
 FileCheck,
 FileText,
 History,
 Loader2,
 Mail,
 Plus,
 Receipt,
 RefreshCw,
 Send,
 ShoppingCart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { FloxDocument, FloxDocumentStatus, FloxDocumentType } from "@/lib/types/intake";
import { PremiumButton } from "../../ui/PremiumButton";
import { QuoteEditor } from "./QuoteEditor";

interface DocumentManagerProps {
 bookingId: string;
 documents: FloxDocument[];
 onUpdate: (payload: any) => Promise<void>;
}

type StatusConfig = {
 label: string;
 color: string;
 icon: typeof Clock;
};

export function DocumentManager({ bookingId, documents, onUpdate }: DocumentManagerProps) {
 const [loading, setLoading] = useState<string | null>(null);
 const [sendingId, setSendingId] = useState<string | null>(null);
 const [editingDoc, setEditingDoc] = useState<FloxDocument | null>(null);

 async function handleAction(action: string, payload: any) {
  setLoading(payload.documentType || payload.documentId || "action");
  try {
   await onUpdate({ action, ...payload });
  } catch {
   // Parent surface handles the visible error state.
  } finally {
   setLoading(null);
  }
 }

 async function handleSendDoc(doc: FloxDocument) {
  if (!window.confirm(`Möchten Sie das Dokument ${doc.number} jetzt an den Kunden senden?`)) return;
  setSendingId(doc.id);
  try {
   await handleAction("send_doc", { documentId: doc.id });
  } finally {
   setSendingId(null);
  }
 }

 function getStatusConfig(status: FloxDocumentStatus): StatusConfig {
  switch (status) {
   case "approved":
    return { label: "Freigegeben", color: "text-green-700 bg-green-50 border-green-200", icon: FileCheck };
   case "sent":
    return { label: "Versendet", color: "text-blue-700 bg-blue-50 border-blue-200", icon: Mail };
   case "draft":
    return { label: "Entwurf", color: "text-amber-700 bg-amber-50 border-amber-200", icon: Edit3 };
   default:
    return { label: status, color: "text-slate-600 bg-slate-50 border-slate-200", icon: Clock };
  }
 }

 function getTypeLabel(type: FloxDocumentType) {
  switch (type) {
   case "quote":
    return "Angebot";
   case "order_confirmation":
    return "Auftragsbestätigung";
   case "invoice":
    return "Rechnung";
   case "inquiry_summary":
    return "Zusammenfassung";
   default:
    return type;
  }
 }

 return (
  <div className="space-y-6">
   <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Operative Dokumente</h3>
    <div className="flex flex-wrap gap-2">
     <PremiumButton
      variant="secondary"
      size="sm"
      className="h-8 border-slate-200 bg-white text-[10px] font-bold uppercase tracking-wider text-slate-700"
      onClick={() => handleAction("create_doc", { documentType: "inquiry_summary" })}
      disabled={!!loading}
     >
      {loading === "inquiry_summary" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
      Zusammenfassung
     </PremiumButton>

     <PremiumButton
      variant="outline"
      size="sm"
      className="h-8 text-[10px] font-bold uppercase tracking-wider"
      onClick={() => handleAction("create_doc", { documentType: "quote" })}
      disabled={!!loading}
     >
      {loading === "quote" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
      Angebot
     </PremiumButton>

     <PremiumButton
      variant="secondary"
      size="sm"
      className="h-8 border-blue-200 bg-blue-50/80 text-[10px] font-bold uppercase tracking-wider text-blue-700 hover:bg-blue-100"
      onClick={() => handleAction("create_doc", { documentType: "order_confirmation" })}
      disabled={!!loading}
     >
      {loading === "order_confirmation" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
      Bestätigung
     </PremiumButton>

     <PremiumButton
      variant="secondary"
      size="sm"
      className="h-8 border-indigo-200 bg-indigo-50/80 text-[10px] font-bold uppercase tracking-wider text-indigo-700 hover:bg-indigo-100"
      onClick={() => handleAction("create_doc", { documentType: "invoice" })}
      disabled={!!loading}
     >
      {loading === "invoice" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
      Rechnung
     </PremiumButton>
    </div>
   </div>

   <div className="space-y-3">
    {documents.length === 0 ? (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
       <FileText className="mb-3 h-8 w-8 text-slate-300" />
       <p className="text-xs text-slate-500">Noch keine operativen Dokumente erstellt.</p>
      </div>
     ) : (
      [...documents]
       .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
       .map((doc) => {
        const status = getStatusConfig(doc.status);
        const StatusIcon = status.icon;

        return (
         <div
          key={doc.id}
          className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 transition-all hover:border-blue-200 hover:shadow-md hover:shadow-blue-950/5 md:flex-row md:items-center"
         >
          <div className="flex items-center gap-4">
           <div
            className={cn(
             "rounded-xl border p-2.5",
             status.color.split(" ")[1],
             status.color.split(" ")[2]
            )}
           >
            {doc.type === "quote" && <FileCheck className="h-5 w-5" />}
            {doc.type === "order_confirmation" && <ShoppingCart className="h-5 w-5" />}
            {doc.type === "invoice" && <Receipt className="h-5 w-5" />}
            {doc.type === "inquiry_summary" && <FileText className="h-5 w-5" />}
           </div>

           <div>
            <div className="flex flex-wrap items-center gap-2">
             <span className="text-sm font-bold text-slate-950">{getTypeLabel(doc.type)}</span>
             <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500">
              {doc.number}
             </span>
            </div>

            <div className="mt-1 flex items-center gap-2">
             <div className={cn("flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase", status.color)}>
              <StatusIcon className="h-2.5 w-2.5" />
              <span>{status.label}</span>
             </div>
             <span className="text-[10px] text-slate-300">/</span>
             <span className="text-[10px] text-slate-500">{new Date(doc.createdAt).toLocaleDateString("de-DE")}</span>
            </div>
           </div>
          </div>

          <div className="flex w-full items-center justify-end gap-2 border-t border-slate-200 pt-3 md:w-auto md:border-t-0 md:pt-0">
           {doc.status === "draft" && getTypeLabel(doc.type) !== "Zusammenfassung" ? (
            <>
             <PremiumButton
              variant="secondary"
              size="sm"
              className="h-8 px-3 text-[10px] font-bold uppercase"
              onClick={() => setEditingDoc(doc)}
             >
              <Edit3 className="mr-1.5 h-3 w-3" />
              Bearbeiten
             </PremiumButton>
             <PremiumButton
              variant="secondary"
              size="sm"
              className="h-8 border-green-200 bg-green-50 px-3 text-[10px] font-bold uppercase text-green-700 hover:bg-green-100"
              onClick={() => handleAction("update_doc", { documentId: doc.id, updatedDoc: { ...doc, status: "approved" } })}
             >
              <Check className="mr-1.5 h-3 w-3" />
              Freigeben
             </PremiumButton>
            </>
           ) : null}

           {doc.status === "approved" ? (
            <>
             <PremiumButton
              variant="secondary"
              size="sm"
              className="h-8 px-3 text-[10px] font-bold uppercase"
              onClick={() => setEditingDoc(doc)}
              title="Neue Version erstellen"
             >
              <History className="mr-1.5 h-3 w-3" />
              Ändern
             </PremiumButton>
             <PremiumButton
              variant="primary"
              size="sm"
              className="h-8 px-3 text-[10px] font-bold uppercase"
              onClick={() => handleSendDoc(doc)}
              disabled={sendingId === doc.id}
             >
              {sendingId === doc.id ? (
               <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
              ) : (
               <Send className="mr-1.5 h-3 w-3" />
              )}
              Senden
             </PremiumButton>
            </>
           ) : null}

           {doc.status === "sent" ? (
            <div className="flex flex-col items-end gap-1">
             <div
              className={cn(
               "flex items-center gap-2 rounded-lg border px-3 py-1.5",
               doc.deliveryInfo?.status === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-blue-200 bg-blue-50 text-blue-700"
              )}
             >
              {doc.deliveryInfo?.status === "success" ? (
               <CheckCircle2 className="h-3 w-3" />
              ) : (
               <RefreshCw className="h-3 w-3 animate-pulse" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider">
               {doc.deliveryInfo?.status === "success" ? "Zugestellt" : "Simulator / Dry-Run"}
              </span>
             </div>
             <span className="text-[10px] text-slate-500">
              {doc.sentAt ? new Date(doc.sentAt).toLocaleString("de-DE") : "..."}
             </span>
            </div>
           ) : null}

           {doc.status === "paid" ? (
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-green-700">
             <CheckCircle2 className="h-3 w-3" />
             <span className="text-[10px] font-bold uppercase tracking-wider">Bezahlt</span>
            </div>
           ) : null}

           <div className="mx-1 hidden h-6 w-px bg-slate-200 md:block" />

           <a
            href={`/api/pdf/${bookingId}?documentId=${doc.id}&download=1`}
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            title="PDF herunterladen"
            aria-label={`${doc.number} als PDF herunterladen`}
            rel="noreferrer"
           >
            <Download className="h-3.5 w-3.5" />
           </a>
          </div>
         </div>
        );
       })
     )}
   </div>

   {editingDoc ? (
    <QuoteEditor
     document={editingDoc}
     onClose={() => setEditingDoc(null)}
     onSave={(updated) => handleAction("update_doc", { documentId: updated.id, updatedDoc: updated })}
    />
   ) : null}
  </div>
 );
}
