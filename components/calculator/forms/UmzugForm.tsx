"use client";

import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { Box, Truck } from "lucide-react";

import { useCalculatorStore } from "@/store/calculatorStore";
import { ExpertTooltip } from "../ExpertTooltip";

type TimeConstraint = "flexibel" | "wochenende" | "dringend" | "genaues_datum";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

const furnitureItems = [
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
];

export default function UmzugForm({ dic, currentStep = 1 }: { dic?: any; currentStep?: number }) {
 const serviceType = useCalculatorStore((state) => state.serviceType);
 const umzugData = useCalculatorStore((state) =>
  serviceType === "seniorenumzug" ? state.seniorenumzugData : state.umzugData,
 );
 const updateStoreData = useCalculatorStore((state) =>
  serviceType === "seniorenumzug" ? state.updateSeniorenumzugData : state.updateUmzugData,
 );

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
 const noParkingZoneLabel = dic?.footer?.no_parking_zone || "Halteverbotszone";

 const toggleHeavyItem = (item: string) => {
  const exists = umzugData.heavyItems.includes(item);
  updateStoreData({
   heavyItems: exists
    ? umzugData.heavyItems.filter((entry) => entry !== item)
    : [...umzugData.heavyItems, item],
  });
 };

 return (
  <div className="space-y-8">
   <AnimatePresence mode="wait">
    {currentStep === 1 ? (
     <m.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
     >
      <div className="calc-surface rounded-[2rem] p-6">
       <h3 className="calc-kicker mb-6">
        <Truck size={14} className="text-blue-500" />
        {dic?.calculator?.basis_data || "Objekt-Eckdaten"}
       </h3>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldCard label={dic?.calculator?.living_area || "Wohnfläche"}>
         <div className="flex items-center gap-2">
          <input
           type="number"
           min={0}
           value={umzugData.areaM2 || ""}
           onChange={(event) => updateStoreData({ areaM2: parseNumber(event.target.value) })}
           placeholder="z. B. 80"
           className="calc-input text-lg"
          />
          <span className="text-sm font-semibold text-slate-400">m²</span>
         </div>
        </FieldCard>
        <FieldCard label={dic?.calculator?.rooms || "Zimmeranzahl"}>
         <input
          type="number"
          min={0}
          value={umzugData.rooms || ""}
          onChange={(event) => updateStoreData({ rooms: parseNumber(event.target.value) })}
          placeholder="z. B. 3"
          className="calc-input text-lg"
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
       onAddressChange={(value) => updateStoreData({ fromAddressDetailed: value })}
       onFloorChange={(value) => updateStoreData({ fromFloor: parseNumber(value) })}
       onWalkingDistanceChange={(value) =>
        updateStoreData({ walkingDistanceFrom: parseNumber(value) })
       }
       checks={[
        {
         checked: !!umzugData.hasElevatorFrom,
         label: liftLabel,
         onChange: (checked) => updateStoreData({ hasElevatorFrom: checked }),
         tip: "Spart Zeit und schont die Möbel.",
        },
        {
         checked: !!umzugData.narrowStairsFrom,
         label: narrowStairsLabel,
         onChange: (checked) => updateStoreData({ narrowStairsFrom: checked }),
         tip: "Erfordert spezielles Handling.",
        },
        {
         checked: !!umzugData.noParkingZoneFrom,
         label: noParkingZoneLabel,
         onChange: (checked) => updateStoreData({ noParkingZoneFrom: checked }),
         tip: "Wichtig für einen reibungslosen Ablauf.",
        },
       ]}
      />
     </m.div>
    ) : null}

    {currentStep === 2 ? (
     <m.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
     >
      <div className="calc-surface flex items-center justify-between rounded-[1.7rem] p-4">
       <span className="text-xs font-bold text-slate-700">
        Gleiche Bedingungen wie beim Auszug?
       </span>
       <button
        type="button"
        onClick={() =>
         updateStoreData({
          toFloor: umzugData.fromFloor,
          hasElevatorTo: umzugData.hasElevatorFrom,
          narrowStairsTo: umzugData.narrowStairsFrom,
          walkingDistanceTo: umzugData.walkingDistanceFrom,
          noParkingZoneTo: umzugData.noParkingZoneFrom,
         })
        }
        className="rounded-xl bg-blue-600 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_24px_rgba(37,99,235,0.2)] transition-all hover:bg-blue-500"
       >
        Übernehmen
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
       onAddressChange={(value) => updateStoreData({ toAddressDetailed: value })}
       onFloorChange={(value) => updateStoreData({ toFloor: parseNumber(value) })}
       onWalkingDistanceChange={(value) =>
        updateStoreData({ walkingDistanceTo: parseNumber(value) })
       }
       checks={[
        {
         checked: !!umzugData.hasElevatorTo,
         label: liftLabel,
         onChange: (checked) => updateStoreData({ hasElevatorTo: checked }),
         tip: "Spart Zeit und schont die Möbel.",
        },
        {
         checked: !!umzugData.narrowStairsTo,
         label: narrowStairsLabel,
         onChange: (checked) => updateStoreData({ narrowStairsTo: checked }),
         tip: "Erfordert spezielles Handling.",
        },
        {
         checked: !!umzugData.noParkingZoneTo,
         label: noParkingZoneLabel,
         onChange: (checked) => updateStoreData({ noParkingZoneTo: checked }),
         tip: "Vermeidet Bußgelder und Verzögerungen.",
        },
       ]}
      />
     </m.div>
    ) : null}

    {currentStep === 3 ? (
     <m.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
     >
      <div className="calc-surface rounded-[2rem] p-6">
       <h3 className="calc-kicker mb-6">
        <Box size={14} className="text-blue-500" />
        Umzugsgut & Kartons
       </h3>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FieldCard label="Geschätzte Kartonanzahl">
         <input
          type="number"
          min={0}
          value={umzugData.boxesCount || ""}
          onChange={(event) => updateStoreData({ boxesCount: parseNumber(event.target.value) })}
          placeholder="z. B. 40"
          className="calc-input text-lg"
         />
        </FieldCard>

        <div className="calc-field flex items-center">
         <label className="flex cursor-pointer items-center gap-3">
          <input
           type="checkbox"
           checked={umzugData.uncertainVolume}
           onChange={(event) =>
            updateStoreData({ uncertainVolume: event.target.checked })
           }
           className="h-4 w-4 accent-blue-500"
          />
          <span className="text-sm font-semibold text-slate-600">
           Volumen noch unsicher?
          </span>
         </label>
        </div>
       </div>
      </div>

      <div className="space-y-4">
       <label className="calc-label">Möbel-Auswahl</label>
       <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {furnitureItems.map((item) => {
         const count = umzugData.furnitureList.filter((entry) => entry === item.id).length;
         return (
          <button
           type="button"
           key={item.id}
           data-active={count > 0}
           onClick={() =>
            updateStoreData({ furnitureList: [...umzugData.furnitureList, item.id] })
           }
           className="calc-chip-card group relative flex flex-col items-center justify-center rounded-[1.3rem] p-4 hover:scale-[1.02] active:scale-[0.98]"
          >
           <span className="mb-2 text-2xl">{item.icon}</span>
           <span className="text-center text-[10px] font-bold text-slate-600">
            {item.label}
           </span>
           {count > 0 ? (
            <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.24)]">
             {count}
            </div>
           ) : null}
          </button>
         );
        })}
       </div>
      </div>

      <div className="space-y-4">
       <label className="calc-label">Spezialstücke</label>
       <div className="flex flex-wrap gap-2">
        {Object.entries(heavyItemsMap).map(([key, label]) => {
         const active = umzugData.heavyItems.includes(key);
         return (
          <button
           type="button"
           key={key}
           data-active={active}
           onClick={() => toggleHeavyItem(key)}
           className={`calc-chip-card rounded-xl px-4 py-2 text-xs font-bold ${
            active ? "text-amber-700" : "text-slate-600"
           }`}
          >
           {String(label)}
          </button>
         );
        })}
       </div>
      </div>
     </m.div>
    ) : null}

    {currentStep === 4 ? (
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
        onChange={(checked) => updateStoreData({ packingService: checked })}
        tip="Professionelles Material inklusive."
       />
       <OptionCard
        checked={umzugData.disassemblyService}
        title="Möbel-Demontage"
        description="Abbau durch Profis."
        onChange={(checked) => updateStoreData({ disassemblyService: checked })}
        tip="Erforderlich bei großen Schränken."
       />
       <OptionCard
        checked={umzugData.kitchenAssembly}
        title="Küchenservice"
        description="Ab- und Aufbau der Küche."
        onChange={(checked) => updateStoreData({ kitchenAssembly: checked })}
        tip="Wir setzen Ihre Küche passgenau um."
       />
       {serviceType === "seniorenumzug" ? (
        <OptionCard
         checked={(umzugData as any).seniorCarePackage}
         title={dic?.calculator?.senior_care_package || "Begleit-Paket"}
         description="Zusätzliche Hilfe und Betreuung."
         onChange={(checked) =>
          updateStoreData({ seniorCarePackage: checked } as any)
         }
         tip="Speziell für entspannte Seniorenumzüge."
        />
       ) : null}
       <FieldCard label="Zeitliche Flexibilität">
        <select
         value={umzugData.timeConstraint}
         onChange={(event) =>
          updateStoreData({ timeConstraint: event.target.value as TimeConstraint })
         }
         className="calc-select text-sm"
        >
         <option value="flexibel">Flexibel</option>
         <option value="genaues_datum">Fixes Datum</option>
         <option value="wochenende">Wochenende</option>
         <option value="dringend">Dringend / Notfall</option>
        </select>
       </FieldCard>
      </div>

      <div className="space-y-4">
       <label className="calc-label">Besondere Hinweise</label>
       <textarea
        value={umzugData.freeTextNote || ""}
        onChange={(event) => updateStoreData({ freeTextNote: event.target.value })}
        placeholder="Details zu engen Gängen, kostbaren Stücken oder Terminen..."
        className="calc-field calc-textarea h-32 p-4 text-sm"
       />
      </div>
     </m.div>
    ) : null}
   </AnimatePresence>
  </div>
 );
}

function FieldCard({
 label,
 children,
 tip,
}: {
 label: string;
 children: React.ReactNode;
 tip?: string;
}) {
 return (
  <div className="calc-field space-y-2">
   <div className="flex items-center justify-between">
    <label className="calc-label">{label}</label>
    {tip ? <ExpertTooltip content={tip} /> : null}
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
 onChange: (checked: boolean) => void;
 tip?: string;
}) {
 return (
  <label data-active={checked} className="calc-option-card flex cursor-pointer items-start gap-4 p-5">
   <input
    type="checkbox"
    checked={checked}
    onChange={(event) => onChange(event.target.checked)}
    className="mt-1 h-4 w-4 accent-blue-500"
   />
   <div className="flex-1">
    <div className="flex items-center justify-between">
     <span className="text-sm font-bold text-slate-950">{title}</span>
     {tip ? <ExpertTooltip content={tip} /> : null}
    </div>
    <span className="calc-help">{description}</span>
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
 onAddressChange: (value: string) => void;
 onFloorChange: (value: string) => void;
 onWalkingDistanceChange: (value: string) => void;
 checks: Array<{ checked: boolean; label: string; onChange: (checked: boolean) => void; tip?: string }>;
}) {
 return (
  <div className="space-y-6">
   <h4 className="calc-label border-b calc-divider pb-3 text-slate-500">{title}</h4>
   <div className="space-y-4">
    <FieldCard label={addressLabel}>
     <input
      type="text"
      placeholder={addressPlaceholder}
      value={addressValue}
      onChange={(event) => onAddressChange(event.target.value)}
      className="calc-input text-sm font-semibold"
     />
    </FieldCard>
    <div className="grid grid-cols-2 gap-4">
     <FieldCard label={floorLabel}>
      <input
       type="number"
       placeholder={floorPlaceholder}
       value={floorValue}
       onChange={(event) => onFloorChange(event.target.value)}
       className="calc-input text-sm"
      />
     </FieldCard>
     <FieldCard label={walkingDistanceLabel}>
      <input
       type="number"
       min={0}
       placeholder={walkingDistancePlaceholder}
       value={walkingDistanceValue}
       onChange={(event) => onWalkingDistanceChange(event.target.value)}
       className="calc-input text-sm"
      />
     </FieldCard>
    </div>
    <div className="grid grid-cols-1 gap-2">
      {checks.map((item) => (
       <label
        key={item.label}
        data-active={item.checked}
        className="calc-check-row flex cursor-pointer items-center justify-between rounded-xl px-3 py-3"
       >
        <div className="flex items-center gap-3">
         <input
          type="checkbox"
          checked={item.checked}
          onChange={(event) => item.onChange(event.target.checked)}
          className="h-4 w-4 accent-blue-500"
         />
         <span className="text-xs font-bold text-slate-700">{item.label}</span>
        </div>
        {item.tip ? <ExpertTooltip content={item.tip} /> : null}
       </label>
      ))}
    </div>
   </div>
  </div>
 );
}
