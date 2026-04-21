"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { useCalculatorStore, ServiceType } from "@/store/calculatorStore";
import { cn } from "@/lib/utils";
import FloxButton from "./ui/FloxButton";
import { ValuationSummary } from "./ui/ValuationSummary";
import { usePricingUpdate } from "@/hooks/usePricingUpdate";

interface IntakeWizardProps {
  dic: any;
  serviceType: ServiceType;
  steps: { id: number; title: string }[];
  renderStep: (step: number) => React.ReactNode;
  onClose: () => void;
  onFinish: () => void;
  hasInput: boolean;
}

export const IntakeWizard: React.FC<IntakeWizardProps> = ({
  dic,
  serviceType,
  steps,
  renderStep,
  onClose,
  onFinish,
  hasInput
}) => {
  const currentMode = useCalculatorStore((s) => s.mode);
  const estimate = useCalculatorStore((s) => s.advancedEstimate);
  
  // Trigger Reactive Pricing Updates
  usePricingUpdate(dic);

  const [currentStep, setCurrentStep] = useState(1);

  const isLastStep = currentStep === steps.length;

  const handleNext = () => {
    if (isLastStep) {
      onFinish();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onClose();
    } else {
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start anim-fade-in">
      {/* Container: Eingabe */}
      <div className="w-full flex-[1.4]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 shadow-2xl lg:p-12">
          {/* Subtle Accent Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_70%)]" />

          {/* Wizard Header */}
          <div className="relative z-10 mb-10 border-b border-white/5 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight capitalize">
                  {serviceType} <span className="text-blue-500">Konfiguration</span>
                </h2>
                <p className="text-sm text-white/40 font-medium">Strukturierter Intake für Ihre Planung.</p>
              </div>
              <div className="hidden lg:flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-1.5 border border-white/5">
                <ShieldCheck size={14} className="text-blue-500/60" />
                <span className="label-premium !text-white/40">Zertifizierte Sicherheit</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex gap-2">
              {steps.map((step) => (
                <div key={step.id} className="flex-1 space-y-2">
                    <div
                      className={cn(
                        "h-1 rounded-full transition-all duration-700",
                        step.id <= currentStep 
                          ? "bg-gradient-to-r from-blue-600 to-blue-400" 
                          : "bg-white/5"
                      )}
                    />
                  <span className={cn(
                    "block label-premium transition-colors duration-500",
                    step.id === currentStep ? "!text-blue-400/80" : "!text-white/10"
                  )}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="relative z-10 min-h-[440px]">
            <AnimatePresence mode="wait">
              <m.div
                key={currentStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                {renderStep(currentStep)}
              </m.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/5 pt-10">
            <button
              onClick={handleBack}
              className="group flex items-center gap-3 rounded-2xl px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/30 transition-all hover:text-white hover:bg-white/5"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
              {currentStep === 1 ? "Abbrechen" : "Zurück"}
            </button>
            
            <FloxButton
              onClick={handleNext}
              variant={isLastStep ? "primary" : "secondary"}
              rightIcon={isLastStep ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
              className="px-12"
            >
              {isLastStep ? "Jetzt Konfiguration prüfen" : "Nächster Schritt"}
            </FloxButton>
          </div>
        </div>

        {/* Support Hook */}
        <div className="mt-8 flex items-center gap-4 px-6 opacity-40 hover:opacity-100 transition-opacity">
          <HelpCircle size={18} className="text-white" />
          <p className="text-[11px] font-medium text-white italic">
            Fragen zum Ablauf? Wir beraten Sie auch gerne persönlich unter 0800-FLOXANT.
          </p>
        </div>
      </div>

      {/* Container: Valuation (Sidebar) */}
      <div className="sticky top-24 z-40 w-full shrink-0 xl:w-[480px]">
        <ValuationSummary 
          estimate={estimate} 
          hasInput={hasInput} 
          dic={dic} 
        />
      </div>
    </div>
  );
};
