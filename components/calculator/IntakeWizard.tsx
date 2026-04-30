"use client";

import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";

import { ServiceType, useCalculatorStore } from "@/store/calculatorStore";
import FloxButton from "./ui/FloxButton";
import { ValuationSummary } from "./ui/ValuationSummary";
import { usePricingUpdate } from "@/hooks/usePricingUpdate";
import { cn } from "@/lib/utils";

interface IntakeWizardProps {
  dic: any;
  serviceType: ServiceType;
  steps: { id: number; title: string }[];
  renderStep: (step: number) => React.ReactNode;
  onClose: () => void;
  onFinish: () => void;
  hasInput: boolean;
}

const serviceLabels: Partial<Record<ServiceType, string>> = {
  umzug: "Umzug",
  reinigung: "Reinigung",
  entsorgung: "Entrümpelung",
  bueroumzug: "Büroumzug",
};

export const IntakeWizard: React.FC<IntakeWizardProps> = ({
  dic,
  serviceType,
  steps,
  renderStep,
  onClose,
  onFinish,
  hasInput,
}) => {
  const estimate = useCalculatorStore((s) => s.advancedEstimate);

  usePricingUpdate(dic);

  const [currentStep, setCurrentStep] = useState(1);
  const isLastStep = currentStep === steps.length;

  const handleNext = () => {
    if (isLastStep) {
      onFinish();
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onClose();
      return;
    }

    setCurrentStep((step) => step - 1);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start">
      <div className="w-full flex-[1.35]">
        <div className="glass-elevated relative overflow-hidden rounded-[2.7rem] p-6 shadow-[0_32px_100px_rgba(15,23,42,0.12)] lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.1),transparent_28%)]" />

          <div className="relative z-10 border-b border-slate-200 pb-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                  <ShieldCheck className="h-4 w-4" />
                  Strukturierte Vorprüfung
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                  {serviceLabels[serviceType] || "Service"} Schritt für Schritt vorbereiten
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Wir führen Sie ruhig durch die wichtigsten Angaben, damit aus wenigen Eckdaten
                  eine glaubwürdige erste Einordnung wird.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white/92 px-4 py-4 shadow-sm shadow-slate-950/5">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Fortschritt
                </div>
                <div className="mt-1 text-lg font-bold text-slate-950">
                  Schritt {currentStep} von {steps.length}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isDone = step.id < currentStep;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "rounded-[1.5rem] border p-4 transition-all",
                      isActive
                        ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-950/5"
                        : isDone
                          ? "border-emerald-200 bg-emerald-50/80"
                          : "border-slate-200 bg-white/80"
                    )}
                  >
                    <div
                      className={cn(
                        "text-[10px] font-black uppercase tracking-[0.18em]",
                        isActive
                          ? "text-blue-700"
                          : isDone
                            ? "text-emerald-700"
                            : "text-slate-400"
                      )}
                    >
                      Schritt {step.id}
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-950">{step.title}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 min-h-[440px] pt-8">
            <AnimatePresence mode="wait">
              <m.div
                key={currentStep}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.38, ease: "circOut" }}
              >
                {renderStep(currentStep)}
              </m.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="group inline-flex items-center gap-3 rounded-2xl px-1 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 transition-all hover:text-slate-900"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {currentStep === 1 ? "Zurück zur Auswahl" : "Zurück"}
            </button>

            <FloxButton
              onClick={handleNext}
              variant={isLastStep ? "primary" : "secondary"}
              rightIcon={isLastStep ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
              className="px-8 py-4 text-[11px]"
            >
              {isLastStep ? "Jetzt Konfiguration prüfen" : "Nächster Schritt"}
            </FloxButton>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-[1.6rem] border border-slate-200 bg-white/90 px-5 py-4 text-sm text-slate-600 shadow-sm shadow-slate-950/5">
          <HelpCircle size={18} className="shrink-0 text-blue-600" />
          Fragen zum Ablauf? Wir begleiten Sie gerne persönlich und ohne Portal-Chaos.
        </div>
      </div>

      <div className="sticky top-24 z-40 w-full shrink-0 xl:w-[460px]">
        <ValuationSummary estimate={estimate} hasInput={hasInput} dic={dic} />
      </div>
    </div>
  );
};
