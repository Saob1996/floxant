"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
 Music,
 Truck,
 ArrowUpDown,
} from "lucide-react";
import { ExpertTooltip } from "../ExpertTooltip";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

export default function PianoForm({ dic, currentStep = 1 }: { dic?: any; currentStep?: number }) {
 const klaviertransportData = useCalculatorStore((s) => s.klaviertransportData);
 const updateKlaviertransportData = useCalculatorStore((s) => s.updateKlaviertransportData);

 const liftLabel = dic?.calculator?.lift || "Aufzug (Groß genug?)";

 return (
  <div className="space-y-8">
   <AnimatePresence mode="wait">
    {currentStep === 1 && (
     <m.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
     >
       <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
       <AddressBlock
        title={dic?.calculator?.from_address || "Startpunkt"}
        floorValue={klaviertransportData.fromFloor ?? ""}
        floorLabel="Etage"
        floorPlaceholder="0 = EG"
        onFloorChange={(v) => updateKlaviertransportData({ fromFloor: parseNumber(v) })}
        dic={dic}
        checks={[
         { checked: !!klaviertransportData.hasElevatorFrom, label: liftLabel, onChange: (c) => updateKlaviertransportData({ hasElevatorFrom: c }), tip: "Instrument muss hineinpassen!" },
        ]}
       />

       <AddressBlock
        title={dic?.calculator?.to_address || "Zielpunkt"}
        floorValue={klaviertransportData.toFloor ?? ""}
        floorLabel="Etage"
        floorPlaceholder="0 = EG"
        onFloorChange={(v) => updateKlaviertransportData({ toFloor: parseNumber(v) })}
        dic={dic}
        checks={[
         { checked: !!klaviertransportData.hasElevatorTo, label: liftLabel, onChange: (c) => updateKlaviertransportData({ hasElevatorTo: c }), tip: "Instrument muss hineinpassen!" },
        ]}
       />
      </div>
     </m.div>
    )}

    {currentStep === 2 && (
     <m.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
     >
      <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6">
       <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
        <Music size={14} className="text-blue-400" />
        Art des Instruments
       </h3>

       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
         onClick={() => updateKlaviertransportData({ pianoType: "upright" })}
         className={`flex flex-col items-center justify-center rounded-2xl border p-8 transition-all ${klaviertransportData.pianoType === "upright" ? "border-blue-500/30 bg-blue-500/10" : "border-white/5 bg-[#0B0D12] hover:bg-white/5"}`}
        >
         <span className="mb-4 text-4xl">🎹</span>
         <span className="text-sm font-bold text-white">{dic?.calculator?.upright_piano || "Klavier"}</span>
         <span className="mt-2 text-[10px] text-white/30">Standard bis 130cm Höhe</span>
        </button>

        <button
         onClick={() => updateKlaviertransportData({ pianoType: "grand" })}
         className={`flex flex-col items-center justify-center rounded-2xl border p-8 transition-all ${klaviertransportData.pianoType === "grand" ? "border-blue-500/30 bg-blue-500/10" : "border-white/5 bg-[#0B0D12] hover:bg-white/5"}`}
        >
         <span className="mb-4 text-4xl">🎻</span>
         <span className="text-sm font-bold text-white">{dic?.calculator?.grand_piano_label || "Flügel"}</span>
         <span className="mt-2 text-[10px] text-white/30">Spezialtransport erforderlich</span>
        </button>
       </div>
      </div>
     </m.div>
    )}

    {currentStep === 3 && (
     <m.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
     >
      <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6">
        <FieldCard label="Transport-Distanz (km)">
         <div className="flex items-center gap-2">
          <input
           type="number"
           min={0}
           value={klaviertransportData.distanceKm || ""}
           onChange={(e) => updateKlaviertransportData({ distanceKm: parseNumber(e.target.value) })}
           placeholder="z. B. 10"
           className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
          />
          <span className="text-sm font-medium text-white/30">km</span>
         </div>
        </FieldCard>
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Besondere Hinweise</label>
       <textarea
        value={klaviertransportData.freeTextNote || ""}
        onChange={(e) => updateKlaviertransportData({ freeTextNote: e.target.value })}
        placeholder="Hinweise zur Treppenbreite, Wert des Instruments oder Wunschdatum..."
        className="h-32 w-full resize-none rounded-2xl border border-white/5 bg-[#0B0D12] p-4 text-sm font-medium text-white outline-none placeholder:text-white/20 focus:border-blue-400/20"
       />
      </div>
     </m.div>
    )}
   </AnimatePresence>
  </div>
 );
}

function FieldCard({ label, children, tip }: { label: string; children: React.ReactNode; tip?: string }) {
 return (
  <div className="space-y-2 rounded-2xl border border-white/5 bg-[#0B0D12] p-5 shadow-sm">
   <div className="flex items-center justify-between">
    <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">{label}</label>
    {tip && <ExpertTooltip content={tip} />}
   </div>
   {children}
  </div>
 );
}

function AddressBlock({
 title,
 floorValue,
 floorLabel,
 floorPlaceholder,
 onFloorChange,
 checks,
 dic,
}: {
 title: string;
 floorValue: number | string;
 floorLabel: string;
 floorPlaceholder: string;
 onFloorChange: (v: string) => void;
 checks: Array<{ checked: boolean; label: string; onChange: (c: boolean) => void; tip?: string }>;
 dic: any;
}) {
 return (
  <div className="space-y-6">
   <h4 className="border-b border-white/5 pb-3 text-[10px] font-bold uppercase tracking-widest text-white/20">{title}</h4>
   <div className="space-y-4">
    <div className="grid grid-cols-1 gap-4">
     <FieldCard label={floorLabel}>
      <input type="number" placeholder={floorPlaceholder} value={floorValue} onChange={(e) => onFloorChange(e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
     </FieldCard>
    </div>
    <div className="grid grid-cols-1 gap-2">
     {checks.map((item, i) => (
      <label key={i} className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-3 transition-all ${item.checked ? "border-blue-500/30 bg-blue-500/10" : "border-white/5 bg-[#0B0D12] hover:bg-white/5"}`}>
       <div className="flex items-center gap-3">
        <input type="checkbox" checked={item.checked} onChange={(e) => item.onChange(e.target.checked)} className="h-4 w-4 accent-blue-500" />
        <span className="text-xs font-bold text-white/70">{item.label}</span>
       </div>
       {item.tip && <ExpertTooltip content={item.tip} />}
      </label>
     ))}
    </div>
   </div>
  </div>
 );
}
