"use client";

import { Check, Clock, FileCheck, FileText, Receipt, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { FloxDocument, FloxDocumentType } from "@/lib/types/intake";

interface DocumentChainTrackerProps {
 documents: FloxDocument[];
}

type StepConfig = {
 type: FloxDocumentType;
 label: string;
 icon: typeof FileText;
};

const STEPS: StepConfig[] = [
 { type: "inquiry_summary", label: "Anfrage", icon: FileText },
 { type: "quote", label: "Angebot", icon: FileCheck },
 { type: "order_confirmation", label: "Bestätigung", icon: ShoppingCart },
 { type: "invoice", label: "Rechnung", icon: Receipt },
];

function formatDocStatus(status: string) {
 switch (status) {
  case "approved":
   return "Freigegeben";
  case "sent":
   return "Versendet";
  case "paid":
   return "Bezahlt";
  case "draft":
   return "Entwurf";
  default:
   return status;
 }
}

export function DocumentChainTracker({ documents }: DocumentChainTrackerProps) {
 function getDocForType(type: FloxDocumentType) {
  return [...documents]
   .filter((doc) => doc.type === type)
   .sort((a, b) => b.version - a.version || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
 }

 return (
  <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
   <div className="relative mx-auto max-w-4xl">
    <div className="absolute left-[7%] right-[7%] top-7 hidden h-px bg-slate-200 md:block" />

    <div className="grid gap-5 md:grid-cols-4">
     {STEPS.map((step) => {
      const doc = getDocForType(step.type);
      const isCompleted = !!doc && ["approved", "sent", "paid"].includes(doc.status);
      const isPending = !!doc && doc.status === "draft";
      const isMissing = !doc;
      const Icon = step.icon;

      return (
       <div
        key={step.type}
        className="group relative flex flex-col items-center rounded-[1.4rem] border border-slate-200 bg-slate-50/65 px-4 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-sm hover:shadow-blue-950/5"
       >
        <div
         className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300",
          isCompleted
           ? "border-green-200 bg-green-50 text-green-700"
           : isPending
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : "border-slate-200 bg-white text-slate-400"
         )}
        >
         <Icon className="h-5 w-5" />

         {isCompleted ? (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white shadow-sm">
           <Check className="h-3 w-3 stroke-[4]" />
          </span>
         ) : null}

         {isPending ? (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-500 text-white shadow-sm">
           <Clock className="h-3 w-3 stroke-[4]" />
          </span>
         ) : null}
        </div>

        <div className="mt-4">
         <p className={cn("text-[10px] font-bold uppercase tracking-[0.18em]", isMissing ? "text-slate-400" : "text-slate-950")}>
          {step.label}
         </p>
         <p className="mt-1 min-h-[1rem] font-mono text-[10px] text-slate-500">
          {doc ? `V${doc.version} • ${formatDocStatus(doc.status)}` : "Noch nicht erstellt"}
         </p>
        </div>

        {doc ? (
         <div className="pointer-events-none absolute left-1/2 top-[7.2rem] z-20 invisible w-52 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl shadow-slate-950/10 transition-all group-hover:visible group-hover:opacity-100">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-950">{doc.number}</p>
          <div className="space-y-1">
           <div className="flex justify-between text-[10px]">
            <span className="text-slate-500">Status</span>
            <span className="font-bold text-slate-950">{formatDocStatus(doc.status)}</span>
           </div>
           <div className="flex justify-between text-[10px]">
            <span className="text-slate-500">Betrag</span>
            <span className="font-bold text-blue-700">{doc.totals.gross.toLocaleString("de-DE")} EUR</span>
           </div>
          </div>
         </div>
        ) : null}
       </div>
      );
     })}
    </div>
   </div>
  </div>
 );
}
