"use client";

import React, { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useCalculatorStore, ServiceType } from "@/store/calculatorStore";
import ExpressCalculator from "./ExpressCalculator";
import AdvancedCalculator from "./AdvancedCalculator";
import LeadCaptureForm from "./LeadCaptureForm";
import LiveActivityFeed from "../trust/LiveActivityFeed";
import ExitIntentModal from "./ExitIntentModal";

interface DualCalculatorProps {
  initialService?: ServiceType | null;
  dic?: any;
}

export default function DualCalculator({
  initialService = null,
  dic,
}: DualCalculatorProps) {
  const mode = useCalculatorStore((s) => s.mode);
  const serviceType = useCalculatorStore((s) => s.serviceType);
  const setServiceType = useCalculatorStore((s) => s.setServiceType);

  useEffect(() => {
    if (initialService && initialService !== serviceType) {
      setServiceType(initialService);
    }
  }, [initialService, serviceType, setServiceType]);

  const showExitIntent = mode === "express" || mode === "advanced";

  return (
    <div className="relative w-full">
      <LiveActivityFeed dic={dic} />
      {showExitIntent && <ExitIntentModal />}

      <AnimatePresence mode="wait" initial={false}>
        {mode === "express" && (
          <CalculatorScene key="express">
            <ExpressCalculator dic={dic} />
          </CalculatorScene>
        )}

        {mode === "advanced" && (
          <CalculatorScene key="advanced">
            <AdvancedCalculator dic={dic} />
          </CalculatorScene>
        )}

        {mode === "lead" && (
          <CalculatorScene key="lead">
            <LeadCaptureForm dic={dic} />
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