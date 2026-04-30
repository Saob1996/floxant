"use client";

import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { Briefcase, Truck } from "lucide-react";

import { useCalculatorStore } from "@/store/calculatorStore";
import { ExpertTooltip } from "../ExpertTooltip";

function parseNumber(value: string): number {
 if (!value.trim()) return 0;
 const parsed = Number.parseInt(value, 10);
 return Number.isFinite(parsed) ? parsed : 0;
}

export default function BueroumzugForm({
 dic,
 currentStep = 1,
}: {
 dic?: any;
 currentStep?: number;
}) {
 const bueroumzugData = useCalculatorStore((state) => state.bueroumzugData);
 const baseDetails = useCalculatorStore((state) => state.baseDetails);
 const updateBueroumzugData = useCalculatorStore((state) => state.updateBueroumzugData);
 const updateBaseDetails = useCalculatorStore((state) => state.updateBaseDetails);

 const liftLabel = dic?.calculator?.lift || "Aufzug";
 const noParkingZoneLabel = dic?.footer?.no_parking_zone || "Halteverbotszone";

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
        onAddressChange={(value) => updateBaseDetails({ fromAddress: value })}
        onFloorChange={(value) =>
         updateBueroumzugData({ fromFloor: parseNumber(value) })
        }
        onWalkingDistanceChange={(value) =>
         updateBueroumzugData({ walkingDistanceFrom: parseNumber(value) })
        }
        checks={[
         {
          checked: !!bueroumzugData.hasElevatorFrom,
          label: liftLabel,
          onChange: (checked) =>
           updateBueroumzugData({ hasElevatorFrom: checked }),
          tip: "Spart Zeit und schont die Möbel.",
         },
         {
          checked: !!bueroumzugData.noParkingZoneFrom,
          label: noParkingZoneLabel,
          onChange: (checked) =>
           updateBueroumzugData({ noParkingZoneFrom: checked }),
          tip: "Wichtig für einen reibungslosen Ablauf.",
         },
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
        onAddressChange={(value) => updateBaseDetails({ toAddress: value })}
        onFloorChange={(value) => updateBueroumzugData({ toFloor: parseNumber(value) })}
        onWalkingDistanceChange={(value) =>
         updateBueroumzugData({ walkingDistanceTo: parseNumber(value) })
        }
        checks={[
         {
          checked: !!bueroumzugData.hasElevatorTo,
          label: liftLabel,
          onChange: (checked) => updateBueroumzugData({ hasElevatorTo: checked }),
          tip: "Spart Zeit und schont die Möbel.",
         },
         {
          checked: !!bueroumzugData.noParkingZoneTo,
          label: noParkingZoneLabel,
          onChange: (checked) =>
           updateBueroumzugData({ noParkingZoneTo: checked }),
          tip: "Vermeidet Bußgelder und Verzögerungen.",
         },
        ]}
       />
      </div>
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
      <div className="calc-surface rounded-[2rem] p-6">
       <h3 className="calc-kicker mb-6">
        <Briefcase size={14} className="text-blue-500" />
        Büro-Inventar
       </h3>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <FieldCard label={dic?.calculator?.workstations || "Arbeitsplätze"}>
         <input
          type="number"
          min={1}
          value={bueroumzugData.workstations || ""}
          onChange={(event) =>
           updateBueroumzugData({ workstations: parseNumber(event.target.value) })
          }
          placeholder="z. B. 5"
          className="calc-input text-lg"
         />
        </FieldCard>

        <FieldCard label={dic?.calculator?.archive_meters || "Archivmeter"}>
         <div className="flex items-center gap-2">
          <input
           type="number"
           min={0}
           value={bueroumzugData.archiveMeters || ""}
           onChange={(event) =>
            updateBueroumzugData({ archiveMeters: parseNumber(event.target.value) })
           }
           placeholder="z. B. 10"
           className="calc-input text-lg"
          />
          <span className="text-sm font-semibold text-slate-400">lfm</span>
         </div>
        </FieldCard>

        <div className="calc-field flex items-center">
         <label className="flex cursor-pointer items-center gap-3">
          <input
           type="checkbox"
           checked={bueroumzugData.itSetup}
           onChange={(event) =>
            updateBueroumzugData({ itSetup: event.target.checked })
           }
           className="h-4 w-4 accent-blue-500"
          />
          <div className="flex flex-col">
           <span className="text-sm font-semibold text-slate-700">
            {dic?.calculator?.it_setup || "IT-Infrastruktur"}
           </span>
           <span className="calc-help">Spezialtransport für Server und PCs.</span>
          </div>
         </label>
        </div>
       </div>
      </div>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
       <OptionCard
        checked={bueroumzugData.packingService}
        title="Einpackservice (Akten / Material)"
        description="Wir verpacken Archiv, Material und sensible Bereiche strukturiert."
        onChange={(checked) => updateBueroumzugData({ packingService: checked })}
       />
       <OptionCard
        checked={bueroumzugData.disassemblyService}
        title="Möbel-Demontage"
        description="Abbau von Schreibtischsystemen, Regalen und Sondermöbeln."
        onChange={(checked) =>
         updateBueroumzugData({ disassemblyService: checked })
        }
       />
       <OptionCard
        checked={bueroumzugData.assemblyService}
        title="Möbel-Montage"
        description="Wiederaufbau am Zielort mit klarem Ablauf für Team und Fläche."
        onChange={(checked) => updateBueroumzugData({ assemblyService: checked })}
       />
      </div>

      <div className="space-y-4">
       <label className="calc-label">Besondere Hinweise</label>
       <textarea
        value={bueroumzugData.freeTextNote || ""}
        onChange={(event) => updateBueroumzugData({ freeTextNote: event.target.value })}
        placeholder="Details zu Serverräumen, Zeitfenstern oder Sicherheitsvorschriften..."
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
  <label
   data-active={checked}
   className="calc-option-card flex cursor-pointer items-start gap-4 p-5"
  >
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
   <div className="calc-surface rounded-[2rem] p-6">
    <h4 className="calc-kicker mb-6">
     <Truck size={14} className="text-blue-500" />
     {title}
    </h4>
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
  </div>
 );
}
