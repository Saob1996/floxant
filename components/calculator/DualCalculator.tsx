"use client";

import React, { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCalculatorStore, ServiceType } from "@/store/calculatorStore";
import ExpressCalculator from "./ExpressCalculator";
import AdvancedCalculator from "./AdvancedCalculator";
import LeadClosing from "./LeadClosing";
import ModeSelection from "./ModeSelection";
import ExitIntentModal from "./ExitIntentModal";
import LiveActivityFeed from "../trust/LiveActivityFeed";
import MovingEliteCalculator from "./elite/MovingEliteCalculator";
import CleaningEliteCalculator from "./elite/CleaningEliteCalculator";
import FloxUmzugRechner from "./standalone/FloxUmzugRechner";
import FloxReinigungRechner from "./standalone/FloxReinigungRechner";
import FloxEntsorgungRechner from "./standalone/FloxEntsorgungRechner";

interface DualCalculatorProps {
 initialService?: ServiceType | null;
 dic?: any;
}

export default function DualCalculator({
 initialService = null,
 dic,
}: DualCalculatorProps) {
 const mode = useCalculatorStore((state) => state.mode);
 const setMode = useCalculatorStore((state) => state.setMode);
 const serviceType = useCalculatorStore((state) => state.serviceType);
 const setServiceType = useCalculatorStore((state) => state.setServiceType);

 useEffect(() => {
  if (!initialService) return;

  if (initialService !== serviceType) {
   setServiceType(initialService);
  }

  if (mode === "selection") {
   setMode("advanced");
  }
 }, [initialService, serviceType, setServiceType, mode, setMode]);

 const showExitIntent = mode === "express" || mode === "advanced";

 return (
  <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0A0C10] p-1 shadow-2xl">
   <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
    <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] animate-pulse rounded-full bg-blue-600/20 blur-[120px]" />
    <div className="absolute -right-[10%] bottom-[0%] h-[50%] w-[50%] animate-bounce rounded-full bg-emerald-600/10 blur-[100px] [animation-duration:12s]" />
    <div className="absolute left-[20%] top-[40%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-600/10 blur-[110px] [animation-duration:8s]" />
   </div>

   <div className="relative z-10 p-4 md:p-8">
    <LiveActivityFeed lang={dic?.lang || "de"} />
    {showExitIntent ? <ExitIntentModal /> : null}

    <div className="mb-8 text-center">
     <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400/70">
      {dic?.calculator?.seo_heading || "Online Kostenrechner Bayern"}
     </h2>
    </div>

    <AnimatePresence mode="wait" initial={false}>
     {mode === "selection" ? (
      <CalculatorScene key="selection">
       <ModeSelection dic={dic} />
      </CalculatorScene>
     ) : null}

     {mode === "express" ? (
      <CalculatorScene key="express">
       <BackButton onClick={() => setMode("selection")} label={dic?.calculator?.back_to_selection || "Zurück zur Auswahl"} />
       <ExpressCalculator dic={dic} />
      </CalculatorScene>
     ) : null}

     {mode === "advanced" ? (
      <CalculatorScene key="advanced">
       <BackButton onClick={() => setMode("selection")} label={dic?.calculator?.back_to_selection || "Zurück zur Auswahl"} />

       {serviceType === "umzug" || serviceType === "seniorenumzug" ? (
        <FloxUmzugRechner dic={dic} />
       ) : serviceType === "reinigung" ? (
        <FloxReinigungRechner dic={dic} />
       ) : serviceType === "entsorgung" ? (
        <FloxEntsorgungRechner dic={dic} />
       ) : ["bueroumzug", "klaviertransport", "einlagerung"].includes(serviceType || "") ? (
        <MovingEliteCalculator dic={dic} />
       ) : ["malerarbeiten"].includes(serviceType || "") ? (
        <CleaningEliteCalculator dic={dic} />
       ) : (
        <AdvancedCalculator dic={dic} />
       )}
      </CalculatorScene>
     ) : null}

     {mode === "lead" ? (
      <CalculatorScene key="lead">
       <BackButton onClick={() => setMode("advanced")} label="Zurück zur Einschätzung" />
       <LeadClosing dic={dic} onBack={() => setMode("advanced")} />
      </CalculatorScene>
     ) : null}
    </AnimatePresence>
   </div>
  </div>
 );
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
 return (
  <div className="mb-6 flex justify-start">
   <button
    aria-label={label}
    onClick={onClick}
    className="flex items-center text-sm font-medium text-white/40 transition-colors hover:text-white"
   >
    <ArrowLeft size={16} className="me-2" />
    {label}
   </button>
  </div>
 );
}

function CalculatorScene({ children }: { children: React.ReactNode }) {
 return (
  <m.div
   initial={{ opacity: 0, y: 18, scale: 0.985 }}
   animate={{ opacity: 1, y: 0, scale: 1 }}
   exit={{ opacity: 0, y: 12, scale: 0.985 }}
   transition={{ duration: 0.28, ease: "easeOut" }}
  >
   {children}
  </m.div>
 );
}
