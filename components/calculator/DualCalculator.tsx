"use client";

import React, { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useCalculatorStore, ServiceType } from "@/store/calculatorStore";
import ExpressCalculator from "./ExpressCalculator";
import AdvancedCalculator from "./AdvancedCalculator";
import { SmartBookingWizard } from "../SmartBookingWizard";
import LiveActivityFeed from "../trust/LiveActivityFeed";
import ExitIntentModal from "./ExitIntentModal";
import ModeSelection from "./ModeSelection";
import MovingEliteCalculator from "./elite/MovingEliteCalculator";
import CleaningEliteCalculator from "./elite/CleaningEliteCalculator";
import DisposalEliteCalculator from "./elite/DisposalEliteCalculator";
import FloxUmzugRechner from "./standalone/FloxUmzugRechner";
import FloxReinigungRechner from "./standalone/FloxReinigungRechner";
import FloxEntsorgungRechner from "./standalone/FloxEntsorgungRechner";
import { ArrowLeft } from "lucide-react";

interface DualCalculatorProps {
  initialService?: ServiceType | null;
  dic?: any;
}

export default function DualCalculator({
  initialService = null,
  dic,
}: DualCalculatorProps) {
  const mode = useCalculatorStore((s) => s.mode);
  const setMode = useCalculatorStore((s) => s.setMode);
  const serviceType = useCalculatorStore((s) => s.serviceType);
  const setServiceType = useCalculatorStore((s) => s.setServiceType);

  useEffect(() => {
    if (initialService) {
      if (initialService !== serviceType) {
        setServiceType(initialService);
      }
      if (mode === "selection") {
        setMode("advanced");
      }
    }
  }, [initialService, serviceType, setServiceType, mode, setMode]);

  const showExitIntent = mode === "express" || mode === "advanced";

  return (
    <div className="relative w-full">
      <LiveActivityFeed dic={dic} />
      {showExitIntent && <ExitIntentModal />}

      <div className="mb-8 text-center">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400/70">
          {dic?.calculator?.seo_heading || (dic?.lang === 'ru' ? "Онлайн-калькулятор стоимости" : "Online Kostenrechner Bayern")}
        </h2>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {mode === "selection" && (
          <CalculatorScene key="selection">
            <ModeSelection dic={dic} />
          </CalculatorScene>
        )}

        {mode === "express" && (
          <CalculatorScene key="express">
            <div className="mb-6 flex justify-start">
              <button
                onClick={() => setMode("selection")}
                className="flex items-center text-sm font-medium text-white/40 transition-colors hover:text-white"
              >
                <ArrowLeft size={16} className="me-2" />
                {dic?.calculator?.back_to_selection || "Zurück zur Auswahl"}
              </button>
            </div>
            <ExpressCalculator dic={dic} />
          </CalculatorScene>
        )}

        {mode === "advanced" && (
          <CalculatorScene key="advanced">
            <div className="mb-6 flex justify-start">
              <button
                onClick={() => setMode("selection")}
                className="flex items-center text-sm font-medium text-white/40 transition-colors hover:text-white"
              >
                <ArrowLeft size={16} className="me-2" />
                {dic?.calculator?.back_to_selection || "Zurück zur Auswahl"}
              </button>
            </div>
            
            {/* Service-Specific Elite Branching */}
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
        )}

        {mode === "lead" && (
          <CalculatorScene key="lead">
            <div className="mb-6 flex justify-start">
              <button
                onClick={() => setMode("selection")}
                className="flex items-center text-sm font-medium text-white/40 transition-colors hover:text-white"
              >
                <ArrowLeft size={16} className="me-2" />
                {dic?.calculator?.back_to_selection || "Zurück zur Auswahl"}
              </button>
            </div>
            <SmartBookingWizard dict={dic} />
          </CalculatorScene>
        )}
      </AnimatePresence>
    </div>
  );
}

function CalculatorScene({
  children,
}: {
  children: React.ReactNode;
}) {
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