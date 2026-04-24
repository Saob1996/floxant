"use client";

import { Check, Clock, FileCheck, FileText, Receipt, ShoppingCart } from "lucide-react";
import { FloxDocument, FloxDocumentType } from "@/lib/types/intake";
import { cn } from "@/lib/utils";

interface DocumentChainTrackerProps {
 documents: FloxDocument[];
}

export function DocumentChainTracker({ documents }: DocumentChainTrackerProps) {
 const steps: Array<{ type: FloxDocumentType; label: string; icon: any }> = [
  { type: "inquiry_summary", label: "Anfrage", icon: FileText },
  { type: "quote", label: "Angebot", icon: FileCheck },
  { type: "order_confirmation", label: "Bestätigung", icon: ShoppingCart },
  { type: "invoice", label: "Rechnung", icon: Receipt },
 ];

 function getDocForType(type: FloxDocumentType) {
  return [...documents]
   .filter((doc) => doc.type === type)
   .sort((a, b) => b.version - a.version || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
 }

 return (
  <div className="w-full px-4 py-6">
   <div className="relative mx-auto flex max-w-3xl items-center justify-between">
    <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white/5" />

    {steps.map((step) => {
     const doc = getDocForType(step.type);
     const isCompleted = doc && ["approved", "sent", "paid"].includes(doc.status);
     const isPending = doc && doc.status === "draft";
     const isMissing = !doc;
     const Icon = step.icon;

     return (
      <div key={step.type} className="group relative z-10 flex flex-col items-center">
       <div
        className={cn(
         "flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-300",
         isCompleted
          ? "border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          : isPending
           ? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
           : "border-white/10 bg-[#0a0a0a] text-white/20"
        )}
       >
        <Icon className="h-5 w-5" />

        {isCompleted ? (
         <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#050505] bg-green-500 text-black">
          <Check className="h-3 w-3 stroke-[4]" />
         </div>
        ) : null}

        {isPending ? (
         <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#050505] bg-amber-500 text-black">
          <Clock className="h-3 w-3 stroke-[4]" />
         </div>
        ) : null}
       </div>

       <div className="mt-3 text-center">
        <p className={cn("text-[10px] font-bold uppercase tracking-widest", isMissing ? "text-white/20" : "text-white")}>
         {step.label}
        </p>
        {doc ? <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">V{doc.version} • {doc.status}</p> : null}
       </div>

       {!isMissing ? (
        <div className="pointer-events-none absolute left-1/2 top-16 z-20 invisible w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0f0f0f] p-3 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
         <p className="mb-1 text-[10px] font-bold uppercase tracking-tight text-white">{doc.number}</p>
         <div className="space-y-1">
          <div className="flex justify-between text-[10px]">
           <span className="text-muted-foreground">Status</span>
           <span className="font-bold text-white">{doc.status.toUpperCase()}</span>
          </div>
          <div className="flex justify-between text-[10px]">
           <span className="text-muted-foreground">Betrag</span>
           <span className="font-bold text-primary">{doc.totals.gross.toLocaleString("de-DE")} EUR</span>
          </div>
         </div>
        </div>
       ) : null}
      </div>
     );
    })}
   </div>
  </div>
 );
}
