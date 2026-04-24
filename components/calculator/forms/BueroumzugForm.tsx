"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
 Briefcase,
 Truck,
 Monitor,
 Library,
} from "lucide-react";
import { ExpertTooltip } from "../ExpertTooltip";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

export default function BueroumzugForm({ dic, currentStep = 1 }: { dic?: any; currentStep?: number }) {
 const bueroumzugData = useCalculatorStore((s) => s.bueroumzugData);
 const baseDetails = useCalculatorStore((s) => s.baseDetails);
 const updateBueroumzugData = useCalculatorStore((s) => s.updateBueroumzugData);
 const updateBaseDetails = useCalculatorStore((s) => s.updateBaseDetails);

 const liftLabel = dic?.calculator?.lift || "Aufzug";
 const narrowStairsLabel = dic?.calculator?.narrow_stairs || "Enge Treppe";
 const noParkingZoneLabel = dic?.footer?.no_parking_zone || "Halteverbotszone";

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
      {/* Address & Access */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
       <AddressBlock
        title={dic?.calculator?.from_address || "Auszug (Start)"}
        addressValue={baseDetails?.fromAddress || ""}
        addressPlaceholder="Straße / Ort"
        addressLabel="Startadresse"
        floorValue={bueroumzugData.fromFloor ?? ""}
        floorLabel="Etage"
        floorPlaceholder="0 = EG"
        walkingDistanceValue={bueroumzugData.walkingDistanceFrom ?? ""}
        walkingDistanceLabel="Laufweg zum LKW"
        walkingDistancePlaceholder="Meter"
        onAddressChange={(v) => updateBaseDetails({ fromAddress: v })}
        onFloorChange={(v) => updateBueroumzugData({ fromFloor: parseNumber(v) })}
        onWalkingDistanceChange={(v) => updateBueroumzugData({ walkingDistanceFrom: parseNumber(v) })}
        dic={dic}
        checks={[
         { checked: !!bueroumzugData.hasElevatorFrom, label: liftLabel, onChange: (c) => updateBueroumzugData({ hasElevatorFrom: c }), tip: "Spart Zeit und schont die Möbel." },
         { checked: !!bueroumzugData.noParkingZoneFrom, label: noParkingZoneLabel, onChange: (c) => updateBueroumzugData({ noParkingZoneFrom: c }), tip: "Wichtig für einen reibungslosen Ablauf." },
        ]}
       />

       <AddressBlock
        title={dic?.calculator?.to_address || "Einzug (Ziel)"}
        addressValue={baseDetails?.toAddress || ""} 
        addressPlaceholder="Straße / Ort"
        addressLabel="Zieladresse"
        floorValue={bueroumzugData.toFloor ?? ""}
        floorLabel="Etage"
        floorPlaceholder="0 = EG"
        walkingDistanceValue={bueroumzugData.walkingDistanceTo ?? ""}
        walkingDistanceLabel="Laufweg zum LKW"
        walkingDistancePlaceholder="Meter"
        onAddressChange={(v) => updateBaseDetails({ toAddress: v })} 
        onFloorChange={(v) => updateBueroumzugData({ toFloor: parseNumber(v) })}
        onWalkingDistanceChange={(v) => updateBueroumzugData({ walkingDistanceTo: parseNumber(v) })}
        dic={dic}
        checks={[
         { checked: !!bueroumzugData.hasElevatorTo, label: liftLabel, onChange: (c) => updateBueroumzugData({ hasElevatorTo: c }), tip: "Spart Zeit und schont die Möbel." },
         { checked: !!bueroumzugData.noParkingZoneTo, label: noParkingZoneLabel, onChange: (c) => updateBueroumzugData({ noParkingZoneTo: c }), tip: "Vermeidet Bußgelder und Verzögerungen." },
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
        <Briefcase size={14} className="text-blue-400" />
        Büro-Inventar
       </h3>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <FieldCard label={dic?.calculator?.workstations || "Arbeitsplätze"}>
         <input
          type="number"
          min={1}
          value={bueroumzugData.workstations || ""}
          onChange={(e) => updateBueroumzugData({ workstations: parseNumber(e.target.value) })}
          placeholder="z. B. 5"
          className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
         />
        </FieldCard>

        <FieldCard label={dic?.calculator?.archive_meters || "Archivmeter"}>
          <div className="flex items-center gap-2">
          <input
           type="number"
           min={0}
           value={bueroumzugData.archiveMeters || ""}
           onChange={(e) => updateBueroumzugData({ archiveMeters: parseNumber(e.target.value) })}
           placeholder="z. B. 10"
           className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
          />
          <span className="text-sm font-medium text-white/30">lfm</span>
         </div>
        </FieldCard>

        <div className="flex items-center px-2">
         <label className="flex cursor-pointer items-center gap-3">
          <input
           type="checkbox"
           checked={bueroumzugData.itSetup}
           onChange={(e) => updateBueroumzugData({ itSetup: e.target.checked })}
           className="h-4 w-4 accent-blue-500"
          />
          <div className="flex flex-col">
           <span className="text-sm font-medium text-white/60">{dic?.calculator?.it_setup || "IT-Infrastruktur"}</span>
           <span className="text-[10px] text-white/30">Spezialtransport für Server/PCs</span>
          </div>
         </label>
        </div>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
       <OptionCard
        checked={bueroumzugData.packingService}
        title="Einpackservice (Akten/Material)"
        description="Wir verpacken Ihr gesamtes Archiv."
        onChange={(c) => updateBueroumzugData({ packingService: c })}
        dic={dic}
       />
       <OptionCard
        checked={bueroumzugData.disassemblyService}
        title="Möbel-Demontage"
        description="Abbau von Schreibtischsystemen."
        onChange={(c) => updateBueroumzugData({ disassemblyService: c })}
        dic={dic}
       />
        <OptionCard
        checked={bueroumzugData.assemblyService}
        title="Möbel-Montage"
        description="Wiederaufbau am Zielort."
        onChange={(c) => updateBueroumzugData({ assemblyService: c })}
        dic={dic}
       />
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Besondere Hinweise</label>
       <textarea
        value={bueroumzugData.freeTextNote || ""}
        onChange={(e) => updateBueroumzugData({ freeTextNote: e.target.value })}
        placeholder="Details zu Serverräumen, Zeitfenstern oder Sicherheitsvorschriften..."
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

function OptionCard({
 checked,
 title,
 description,
 onChange,
 tip,
}: {
 checked: boolean;
 title: string;
 description: string;
 onChange: (c: boolean) => void;
 dic: any;
 tip?: string;
}) {
 return (
  <label
   className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all ${checked ? "border-blue-500/30 bg-blue-500/10" : "border-white/5 bg-[#0B0D12] hover:bg-white/5"}`}
  >
   <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-blue-500" />
   <div className="flex-1">
    <div className="flex items-center justify-between">
     <span className="text-sm font-bold text-white">{title}</span>
     {tip && <ExpertTooltip content={tip} />}
    </div>
    <span className="text-[11px] leading-relaxed text-white/40">{description}</span>
   </div>
  </label>
 );
}

function AddressBlock({
 title,
 addressValue,
 addressPlaceholder,
 addressLabel,
 floorValue,
 floorLabel,
 floorPlaceholder,
 walkingDistanceValue,
 walkingDistanceLabel,
 walkingDistancePlaceholder,
 onAddressChange,
 onFloorChange,
 onWalkingDistanceChange,
 checks,
 dic,
}: {
 title: string;
 addressValue: string;
 addressPlaceholder: string;
 addressLabel: string;
 floorValue: number | string;
 floorLabel: string;
 floorPlaceholder: string;
 walkingDistanceValue: number | string;
 walkingDistanceLabel: string;
 walkingDistancePlaceholder: string;
 onAddressChange: (v: string) => void;
 onFloorChange: (v: string) => void;
 onWalkingDistanceChange: (v: string) => void;
 checks: Array<{ checked: boolean; label: string; onChange: (c: boolean) => void; tip?: string }>;
 dic: any;
}) {
 return (
  <div className="space-y-6">
   <h4 className="border-b border-white/5 pb-3 text-[10px] font-bold uppercase tracking-widest text-white/20">{title}</h4>
   <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
     <FieldCard label={floorLabel}>
      <input type="number" placeholder={floorPlaceholder} value={floorValue} onChange={(e) => onFloorChange(e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
     </FieldCard>
     <FieldCard label={walkingDistanceLabel}>
      <input type="number" min={0} placeholder={walkingDistancePlaceholder} value={walkingDistanceValue} onChange={(e) => onWalkingDistanceChange(e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
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
