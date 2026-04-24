"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import { Box, Truck } from "lucide-react";
import { ExpertTooltip } from "../ExpertTooltip";
import { cn } from "@/lib/utils";

type TimeConstraint = "flexibel" | "wochenende" | "dringend" | "genaues_datum";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

export default function UmzugForm({ dic, currentStep = 1 }: { dic?: any; currentStep?: number }) {
 const serviceType = useCalculatorStore((s) => s.serviceType);
 const umzugData = useCalculatorStore((s) => (serviceType === "seniorenumzug" ? s.seniorenumzugData : s.umzugData));
 const updateStoreData = useCalculatorStore((s) => (serviceType === "seniorenumzug" ? s.updateSeniorenumzugData : s.updateUmzugData));

 const heavyItemsMap =
  dic?.calculator?.heavy_items || {
   piano: "Piano",
   safe: "Safe",
   fitness_gear: "Fitnessgerät",
   aquarium: "Aquarium",
   grand_piano: "Flügel",
  };

 const liftLabel = dic?.calculator?.lift || "Aufzug";
 const narrowStairsLabel = dic?.calculator?.narrow_stairs || "Enge Treppe";
 const courtyardAccessLabel =
  dic?.calculator?.courtyard_access || "Innenhof / schwieriger Zugang";
 const noParkingZoneLabel =
  dic?.footer?.no_parking_zone || "Halteverbotszone";

 const toggleHeavyItem = (item: string) => {
  const exists = umzugData.heavyItems.includes(item);
  updateStoreData({
   heavyItems: exists
    ? umzugData.heavyItems.filter((i) => i !== item)
    : [...umzugData.heavyItems, item],
  });
 };

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
      {/* Object Basics */}
      <div className="rounded-[24px] border border-white/5 bg-white/[0.02] p-6">
       <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
        <Truck size={14} className="text-blue-400" />
        {dic?.calculator?.basis_data || "Objekt-Eckdaten"}
       </h3>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldCard label={dic?.calculator?.living_area || "Wohnfläche"}>
         <div className="flex items-center gap-2">
          <input
           type="number" min={0} value={umzugData.areaM2 || ""}
           onChange={(e) => updateStoreData({ areaM2: parseNumber(e.target.value) })}
           placeholder="z. B. 80"
           className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
          />
          <span className="text-sm font-medium text-white/30">m²</span>
         </div>
        </FieldCard>
        <FieldCard label={dic?.calculator?.rooms || "Zimmeranzahl"}>
         <input
          type="number" min={0} value={umzugData.rooms || ""}
          onChange={(e) => updateStoreData({ rooms: parseNumber(e.target.value) })}
          placeholder="z. B. 3"
          className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
         />
        </FieldCard>
       </div>
      </div>

      <AddressBlock
       title="Start-Check: Wo ziehen Sie aus?"
       addressValue={umzugData.fromAddressDetailed || ""}
       addressPlaceholder="Straße / Ort"
       addressLabel="Startadresse"
       floorValue={umzugData.fromFloor ?? ""}
       floorLabel="Etage"
       floorPlaceholder="0 = EG"
       walkingDistanceValue={umzugData.walkingDistanceFrom ?? ""}
       walkingDistanceLabel="Laufweg zum LKW"
       walkingDistancePlaceholder="Meter"
       onAddressChange={(v) => updateStoreData({ fromAddressDetailed: v })}
       onFloorChange={(v) => updateStoreData({ fromFloor: parseNumber(v) })}
       onWalkingDistanceChange={(v) => updateStoreData({ walkingDistanceFrom: parseNumber(v) })}
       dic={dic}
       checks={[
        { checked: !!umzugData.hasElevatorFrom, label: liftLabel, onChange: (c) => updateStoreData({ hasElevatorFrom: c }), tip: "Spart Zeit und schont die Möbel." },
        { checked: !!umzugData.narrowStairsFrom, label: narrowStairsLabel, onChange: (c) => updateStoreData({ narrowStairsFrom: c }), tip: "Erfordert spezielles Handling." },
        { checked: !!umzugData.noParkingZoneFrom, label: noParkingZoneLabel, onChange: (c) => updateStoreData({ noParkingZoneFrom: c }), tip: "Wichtig für einen reibungslosen Ablauf." },
       ]}
      />
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
      <div className="flex items-center justify-between rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
       <span className="text-xs font-bold text-white/70">Gleiche Bedingungen wie Auszug?</span>
       <button
        type="button"
        onClick={() => {
         updateStoreData({
          toFloor: umzugData.fromFloor,
          hasElevatorTo: umzugData.hasElevatorFrom,
          narrowStairsTo: umzugData.narrowStairsFrom,
          walkingDistanceTo: umzugData.walkingDistanceFrom,
          noParkingZoneTo: umzugData.noParkingZoneFrom
         });
        }}
        className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-blue-500 transition-colors"
       >
        Anwenden
       </button>
      </div>

      <AddressBlock
       title="Ziel-Check: Wo geht es hin?"
       addressValue={umzugData.toAddressDetailed || ""}
       addressPlaceholder="Straße / Ort"
       addressLabel="Zieladresse"
       floorValue={umzugData.toFloor ?? ""}
       floorLabel="Etage"
       floorPlaceholder="0 = EG"
       walkingDistanceValue={umzugData.walkingDistanceTo ?? ""}
       walkingDistanceLabel="Laufweg zum LKW"
       walkingDistancePlaceholder="Meter"
       onAddressChange={(v) => updateStoreData({ toAddressDetailed: v })}
       onFloorChange={(v) => updateStoreData({ toFloor: parseNumber(v) })}
       onWalkingDistanceChange={(v) => updateStoreData({ walkingDistanceTo: parseNumber(v) })}
       dic={dic}
       checks={[
        { checked: !!umzugData.hasElevatorTo, label: liftLabel, onChange: (c) => updateStoreData({ hasElevatorTo: c }), tip: "Spart Zeit und schont die Möbel." },
        { checked: !!umzugData.narrowStairsTo, label: narrowStairsLabel, onChange: (c) => updateStoreData({ narrowStairsTo: c }), tip: "Erfordert spezielles Handling." },
        { checked: !!umzugData.noParkingZoneTo, label: noParkingZoneLabel, onChange: (c) => updateStoreData({ noParkingZoneTo: c }), tip: "Vermeidet Bußgelder und Verzögerungen." },
       ]}
      />
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
       <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
        <Box size={14} className="text-blue-400" />
        Umzugsgut & Kartons
       </h3>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FieldCard label="Geschätzte Kartonanzahl">
         <input
          type="number"
          min={0}
          value={umzugData.boxesCount || ""}
          onChange={(e) => updateStoreData({ boxesCount: parseNumber(e.target.value) })}
          placeholder="z. B. 40"
          className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/20"
         />
        </FieldCard>

        <div className="flex items-center px-2">
         <label className="flex cursor-pointer items-center gap-3">
          <input
           type="checkbox"
           checked={umzugData.uncertainVolume}
           onChange={(e) => updateStoreData({ uncertainVolume: e.target.checked })}
           className="h-4 w-4 accent-blue-500"
          />
          <span className="text-sm font-medium text-white/60">Volumen noch unsicher?</span>
         </label>
        </div>
       </div>
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">
        Möbel-Auswahl
       </label>
       <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {[
         { id: "sofa-2", label: "Sofa 2er", icon: "🛋️" },
         { id: "sofa-3", label: "Sofa 3er", icon: "🛋️" },
         { id: "bed-s", label: "Bett (E)", icon: "🛏️" },
         { id: "bed-d", label: "Bett (D)", icon: "🛏️" },
         { id: "table", label: "Tisch", icon: "🪑" },
         { id: "chair", label: "Stuhl", icon: "🪑" },
         { id: "wardrobe-1", label: "Schrank 1m", icon: "👗" },
         { id: "wardrobe-2", label: "Schrank 2m", icon: "👗" },
         { id: "fridge", label: "Kühlschrank", icon: "🧊" },
         { id: "washing", label: "Waschm.", icon: "🧺" },
         { id: "tv-bench", label: "TV-Board", icon: "📺" },
         { id: "shelf", label: "Regal", icon: "📚" },
        ].map((item) => {
         const count = umzugData.furnitureList.filter(id => id === item.id).length;
         return (
          <button
           type="button"
           key={item.id}
           onClick={() => updateStoreData({ furnitureList: [...umzugData.furnitureList, item.id] })}
           className={`group relative flex flex-col items-center justify-center rounded-[20px] border p-4 transition-all hover:scale-[1.02] active:scale-[0.98] ${count > 0 ? "border-blue-500/30 bg-blue-500/10" : "border-white/5 bg-[#0B0D12] hover:border-white/10"}`}
          >
           <span className="mb-2 text-2xl">{item.icon}</span>
           <span className="text-center text-[10px] font-bold text-white/50">{item.label}</span>
           {count > 0 && <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold">{count}</div>}
          </button>
         );
        })}
       </div>
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Spezialstücke</label>
       <div className="flex flex-wrap gap-2">
        {Object.entries(heavyItemsMap).map(([key, label]) => {
         const active = umzugData.heavyItems.includes(key);
         return (
          <button
           type="button"
           key={key}
           onClick={() => toggleHeavyItem(key)}
           className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${active ? "border-amber-500/30 bg-amber-500/10 text-amber-200" : "border-white/5 bg-[#0B0D12] text-white/40 hover:bg-white/5"}`}
          >
           {String(label)}
          </button>
         );
        })}
       </div>
      </div>
     </m.div>
    )}

    {currentStep === 4 && (
     <m.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
     >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
       <OptionCard
        checked={umzugData.packingService}
        title="Einpackservice"
        description="Wir verpacken alles sicher."
        onChange={(c) => updateStoreData({ packingService: c })}
        dic={dic}
        tip="Professionelles Material inklusive."
       />
       <OptionCard
        checked={umzugData.disassemblyService}
        title="Möbel-Demontage"
        description="Abbau durch Profis."
        onChange={(c) => updateStoreData({ disassemblyService: c })}
        dic={dic}
        tip="Erforderlich bei großen Schränken."
       />
       <OptionCard
        checked={umzugData.kitchenAssembly}
        title="Küchenservice"
        description="Ab- und Aufbau der Küche."
        onChange={(c) => updateStoreData({ kitchenAssembly: c })}
        dic={dic}
        tip="Wir setzen Ihre Küche passgenau um."
       />
       {serviceType === "seniorenumzug" && (
        <OptionCard
         checked={(umzugData as any).seniorCarePackage}
         title={dic?.calculator?.senior_care_package || "Begleit-Paket"}
         description="Zusätzliche Hilfe & Betreuung."
         onChange={(c) => updateStoreData({ seniorCarePackage: c } as any)}
         dic={dic}
         tip="Speziell für entspannte Seniorenumzüge."
        />
       )}
       <FieldCard label="Zeitliche Flexibilität">
        <select
         value={umzugData.timeConstraint}
         onChange={(e) => updateStoreData({ timeConstraint: e.target.value as TimeConstraint })}
         className="w-full bg-transparent text-sm font-bold text-white outline-none"
        >
         <option value="flexibel" className="bg-[#0B0D12]">Flexibel</option>
         <option value="genaues_datum" className="bg-[#0B0D12]">Fixes Datum</option>
         <option value="wochenende" className="bg-[#0B0D12]">Wochenende</option>
         <option value="dringend" className="bg-[#0B0D12]">Dringend / Notfall</option>
        </select>
       </FieldCard>
      </div>

      <div className="space-y-4">
       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Besondere Hinweise</label>
       <textarea
        value={umzugData.freeTextNote || ""}
        onChange={(e) => updateStoreData({ freeTextNote: e.target.value })}
        placeholder="Details zu engen Gängen, kostbaren Stücken oder Terminen..."
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
    <FieldCard label={addressLabel}>
     <input
      type="text"
      placeholder={addressPlaceholder}
      value={addressValue}
      onChange={(e) => onAddressChange(e.target.value)}
      className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/20"
     />
    </FieldCard>
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
