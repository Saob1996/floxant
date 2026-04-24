"use client";

import { useState } from "react";
import { Calculator, Euro, Fuel, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function CostCalculator() {
 const [distance, setDistance] = useState<number | "">("");
 const [fuelConsumption, setFuelConsumption] = useState<number | "">(12); // L/100km
 const [fuelPrice, setFuelPrice] = useState<number | "">(1.7); // €/L

 const [employees, setEmployees] = useState<number | "">(2);
 const [hoursPerEmployee, setHoursPerEmployee] = useState<number | "">(8);
 const [hourlyWage, setHourlyWage] = useState<number | "">(18); // €/h
 const [setupHours, setSetupHours] = useState<number | "">(1);

 const [materials, setMaterials] = useState<number | "">(50);
 const [vehicleCost, setVehicleCost] = useState<number | "">(80);
 const [insuranceCost, setInsuranceCost] = useState<number | "">(20);
 const [otherCost, setOtherCost] = useState<number | "">(0);

 const [desiredMargin, setDesiredMargin] = useState<number | "">(30); // %

 // Calculations
 const fuelCost = ((Number(distance) * 2) / 100) * Number(fuelConsumption) * Number(fuelPrice);
 const totalHours = (Number(hoursPerEmployee) + Number(setupHours)) * Number(employees);
 const laborCost = totalHours * Number(hourlyWage);
 const totalBaseCost =
  fuelCost + laborCost + Number(materials) + Number(vehicleCost) + Number(insuranceCost) + Number(otherCost);

 const recommendedPrice = totalBaseCost * (1 + Number(desiredMargin) / 100);
 const profitAmount = recommendedPrice - totalBaseCost;

 return (
  <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
   <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2">
     {/* Spritkosten */}
     <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 font-black text-slate-800">
       <Fuel className="h-5 w-5 text-blue-600" />
       Fahrt- & Spritkosten
      </div>
      <div className="space-y-3 text-sm">
       <label className="block">
        Einfache Strecke (km)
        <input
         type="number"
         value={distance}
         onChange={(e) => setDistance(e.target.value === "" ? "" : Number(e.target.value))}
         className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
        />
       </label>
       <div className="grid grid-cols-2 gap-3">
        <label className="block">
         Verbrauch (L/100km)
         <input
          type="number"
          value={fuelConsumption}
          onChange={(e) => setFuelConsumption(e.target.value === "" ? "" : Number(e.target.value))}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
         />
        </label>
        <label className="block">
         Preis pro Liter (€)
         <input
          type="number"
          step="0.01"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
         />
        </label>
       </div>
      </div>
     </div>

     {/* Mitarbeiter */}
     <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 font-black text-slate-800">
       <Users className="h-5 w-5 text-blue-600" />
       Personalkosten
      </div>
      <div className="space-y-3 text-sm">
       <div className="grid grid-cols-2 gap-3">
        <label className="block">
         Anzahl Mitarbeiter
         <input
          type="number"
          value={employees}
          onChange={(e) => setEmployees(e.target.value === "" ? "" : Number(e.target.value))}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
         />
        </label>
        <label className="block">
         Stundenlohn (€/h)
         <input
          type="number"
          value={hourlyWage}
          onChange={(e) => setHourlyWage(e.target.value === "" ? "" : Number(e.target.value))}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
         />
        </label>
       </div>
       <div className="grid grid-cols-2 gap-3">
        <label className="block">
         Einsatzzeit (h) pro MA
         <input
          type="number"
          value={hoursPerEmployee}
          onChange={(e) => setHoursPerEmployee(e.target.value === "" ? "" : Number(e.target.value))}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
         />
        </label>
        <label className="block">
         Auf-/Abbauzeit (h)
         <input
          type="number"
          value={setupHours}
          onChange={(e) => setSetupHours(e.target.value === "" ? "" : Number(e.target.value))}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
         />
        </label>
       </div>
      </div>
     </div>

     {/* Material & Sonstiges */}
     <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
      <div className="mb-4 flex items-center gap-2 font-black text-slate-800">
       <Package className="h-5 w-5 text-blue-600" />
       Material, Fahrzeug & Sonstiges
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
       <label className="block">
        Material (€)
        <input
         type="number"
         value={materials}
         onChange={(e) => setMaterials(e.target.value === "" ? "" : Number(e.target.value))}
         className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
        />
       </label>
       <label className="block">
        Fahrzeug (€)
        <input
         type="number"
         value={vehicleCost}
         onChange={(e) => setVehicleCost(e.target.value === "" ? "" : Number(e.target.value))}
         className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
        />
       </label>
       <label className="block">
        Versicherung (€)
        <input
         type="number"
         value={insuranceCost}
         onChange={(e) => setInsuranceCost(e.target.value === "" ? "" : Number(e.target.value))}
         className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
        />
       </label>
       <label className="block">
        Sonstiges (€)
        <input
         type="number"
         value={otherCost}
         onChange={(e) => setOtherCost(e.target.value === "" ? "" : Number(e.target.value))}
         className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
        />
       </label>
      </div>
     </div>
    </div>
   </div>

   {/* Ergebnis */}
   <div className="rounded-[1.5rem] border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#eff6ff_100%)] p-6 shadow-lg shadow-blue-900/5">
    <div className="mb-6 flex items-center gap-3">
     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-foreground">
      <Calculator className="h-5 w-5" />
     </div>
     <h3 className="text-xl font-black text-slate-900">Kalkulation</h3>
    </div>

    <div className="space-y-4 border-b border-blue-200/50 pb-6 text-sm">
     <div className="flex justify-between">
      <span className="text-slate-600">Spritkosten:</span>
      <span className="font-semibold text-slate-900">{fuelCost.toFixed(2)} €</span>
     </div>
     <div className="flex justify-between">
      <span className="text-slate-600">Personalkosten ({totalHours}h):</span>
      <span className="font-semibold text-slate-900">{laborCost.toFixed(2)} €</span>
     </div>
     <div className="flex justify-between">
      <span className="text-slate-600">Material & Geräte:</span>
      <span className="font-semibold text-slate-900">{Number(materials).toFixed(2)} €</span>
     </div>
     <div className="flex justify-between">
      <span className="text-slate-600">Fahrzeug & Sonstiges:</span>
      <span className="font-semibold text-slate-900">
       {(Number(vehicleCost) + Number(insuranceCost) + Number(otherCost)).toFixed(2)} €
      </span>
     </div>
     <div className="pt-2 flex justify-between font-black text-slate-900">
      <span>Gesamtkosten (Intern):</span>
      <span>{totalBaseCost.toFixed(2)} €</span>
     </div>
    </div>

    <div className="mt-6 space-y-4">
     <label className="block text-sm font-semibold text-slate-800">
      Gewünschte Gewinnmarge (%)
      <input
       type="number"
       value={desiredMargin}
       onChange={(e) => setDesiredMargin(e.target.value === "" ? "" : Number(e.target.value))}
       className="mt-1 h-12 w-full rounded-xl border border-blue-200 bg-white px-4 text-lg font-bold text-blue-900 outline-none focus:border-blue-400"
      />
     </label>

     <div className="rounded-xl bg-blue-600 p-5 text-foreground shadow-md">
      <p className="text-xs font-black uppercase tracking-wider text-blue-600 ">Kundenpreis Empfehlung</p>
      <div className="mt-1 flex items-baseline gap-1">
       <span className="text-3xl font-black">{recommendedPrice.toFixed(2)}</span>
       <span className="text-lg">€</span>
      </div>
      <p className="mt-2 text-sm text-blue-800 ">
       Davon Gewinn: <span className="font-bold text-foreground">{profitAmount.toFixed(2)} €</span>
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}
