"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  FileText,
  Clock,
  Users,
  Database,
  Info,
  HardHat,
  PhoneCall,
} from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
  calculateUmzugAdvanced,
  calculateReinigungAdvanced,
  calculateEntsorgungAdvanced,
} from "@/lib/pricing/calculator-engine";
import UmzugForm from "./forms/UmzugForm";
import ReinigungForm from "./forms/ReinigungForm";
import EntsorgungForm from "./forms/EntsorgungForm";

function estimatesEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function AdvancedCalculator({ dic }: { dic?: any }) {
  const serviceType = useCalculatorStore((s) => s.serviceType);
  const baseDetails = useCalculatorStore((s) => s.baseDetails);
  const umzugData = useCalculatorStore((s) => s.umzugData);
  const reinigungData = useCalculatorStore((s) => s.reinigungData);
  const entsorgungData = useCalculatorStore((s) => s.entsorgungData);
  const advancedEstimate = useCalculatorStore((s) => s.advancedEstimate);
  const setAdvancedEstimate = useCalculatorStore((s) => s.setAdvancedEstimate);
  const setMode = useCalculatorStore((s) => s.setMode);

  const [isRefreshingEstimate, setIsRefreshingEstimate] = useState(false);

  const hasInput = useMemo(() => {
    if (
      (baseDetails.fromAddress || "").trim().length >= 2 ||
      (baseDetails.toAddress || "").trim().length >= 2
    ) {
      return true;
    }

    if (serviceType === "umzug") {
      return (
        (umzugData.fromAddressDetailed?.trim().length || 0) >= 2 ||
        umzugData.areaM2 > 1 ||
        (umzugData.furnitureList?.length || 0) > 0 ||
        umzugData.boxesCount > 0
      );
    }

    if (serviceType === "reinigung") {
      return (
        reinigungData.areaM2 >= 10 ||
        reinigungData.windowsCount > 0 ||
        (reinigungData.extras?.length || 0) > 0
      );
    }

    if (serviceType === "entsorgung") {
      return (
        (entsorgungData.wasteCategories?.length || 0) > 0 ||
        entsorgungData.wasteVolumeM3 > 1 ||
        (entsorgungData.freeTextNote?.trim().length || 0) > 2
      );
    }

    return false;
  }, [
    baseDetails.fromAddress,
    baseDetails.toAddress,
    serviceType,
    umzugData.fromAddressDetailed,
    umzugData.areaM2,
    umzugData.furnitureList,
    umzugData.boxesCount,
    reinigungData.areaM2,
    reinigungData.windowsCount,
    reinigungData.extras,
    entsorgungData.wasteCategories,
    entsorgungData.wasteVolumeM3,
    entsorgungData.freeTextNote,
  ]);

  const calculatedEstimate = useMemo(() => {
    if (!serviceType) return null;

    if (serviceType === "umzug") {
      return calculateUmzugAdvanced(umzugData, baseDetails, dic);
    }

    if (serviceType === "reinigung") {
      return calculateReinigungAdvanced(reinigungData, dic);
    }

    if (serviceType === "entsorgung") {
      return calculateEntsorgungAdvanced(entsorgungData, dic);
    }

    return null;
  }, [serviceType, umzugData, reinigungData, entsorgungData, baseDetails, dic]);

  useEffect(() => {
    if (!calculatedEstimate) return;

    if (!advancedEstimate || !estimatesEqual(advancedEstimate, calculatedEstimate)) {
      setAdvancedEstimate(calculatedEstimate);
    }
  }, [calculatedEstimate, advancedEstimate, setAdvancedEstimate]);

  useEffect(() => {
    if (!hasInput || !calculatedEstimate) {
      setIsRefreshingEstimate(false);
      return;
    }

    setIsRefreshingEstimate(true);
    const timeout = window.setTimeout(() => {
      setIsRefreshingEstimate(false);
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [calculatedEstimate, hasInput]);

  const est = calculatedEstimate ?? advancedEstimate;
  const showLoadingState = hasInput && (!est || isRefreshingEstimate);
  const canProceedToLead = Boolean(hasInput && est);

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 xl:flex-row xl:items-start">
      <div className="w-full flex-[1.2]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-sm lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_35%)]" />

          <div className="relative z-10">
            <div className="mb-10 border-b border-white/8 pb-5">
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-white">
                <FileText size={22} className="text-blue-400" />
                {dic?.calculator?.requirements_title || "Angaben"}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/55">
                {dic?.calculator?.requirements_subtitle ||
                  "Erfassen Sie die wichtigsten Details. Daraus erzeugen wir eine deutlich bessere Ersteinschätzung für Aufwand, Teamgröße und Preisrahmen."}
              </p>
            </div>

            {serviceType === "umzug" && <UmzugForm dic={dic} />}
            {serviceType === "reinigung" && <ReinigungForm dic={dic} />}
            {serviceType === "entsorgung" && <EntsorgungForm dic={dic} />}
          </div>
        </div>
      </div>

      <div className="sticky top-24 z-40 w-full shrink-0 xl:w-[460px]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0D12] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] lg:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/8 blur-[90px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-violet-500/8 blur-[90px]" />

          <div className="relative z-10 mb-6 flex items-center justify-between gap-3 border-b border-white/6 pb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
              <Database className="text-blue-400" size={18} />
              {dic?.calculator?.calculation_title || "Kalkulation"}
            </h3>

            {est && hasInput && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${est.confidenceLevel === "low"
                    ? "bg-amber-400/10 text-amber-300"
                    : "bg-blue-400/10 text-blue-300"
                  }`}
              >
                <Info size={12} />
                {est.confidenceLevel === "low"
                  ? dic?.calculator?.prognosis_label || "Prognose"
                  : dic?.calculator?.estimate_label || "Schätzung"}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!hasInput ? (
              <m.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10 w-full"
              >
                <div className="flex min-h-[256px] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/6 bg-white/[0.03] p-8 text-center">
                  <m.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                    }}
                  >
                    <span className="text-4xl">👋</span>
                  </m.div>

                  <h4 className="text-lg font-semibold text-white">
                    {dic?.calculator?.start_now || "Jetzt starten"}
                  </h4>

                  <p className="max-w-[290px] text-[14px] leading-relaxed text-white/45">
                    {dic?.calculator?.start_description ||
                      "Sobald Sie die ersten Angaben eintragen, erscheint hier sofort eine live berechnete Einschätzung."}
                  </p>
                </div>
              </m.div>
            ) : showLoadingState ? (
              <m.div
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10 w-full"
              >
                <div className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/6 bg-white/[0.03]">
                  <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-blue-400 border-t-transparent" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {dic?.calculator?.calculating || "Wird berechnet"}
                  </span>
                </div>
              </m.div>
            ) : (
              <m.div
                key="result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10 space-y-6"
              >
                <div className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.06] p-6 shadow-inner">
                  <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300/80">
                    {dic?.calculator?.live_price_indicative || "Live-Preisspanne"}
                  </span>

                  <div className="flex flex-wrap items-end gap-2">
                    <span className="text-5xl font-semibold tracking-tight text-white">
                      {est?.priceRange?.min ?? 0}€
                    </span>
                    <span className="px-1 text-2xl font-light text-white/30">–</span>
                    <span className="text-5xl font-semibold tracking-tight text-white">
                      {est?.priceRange?.max ?? 0}€
                    </span>
                  </div>

                  {est?.confidenceLevel === "low" ? (
                    <span className="mt-4 block border-t border-blue-400/10 pt-4 text-[12px] font-medium leading-relaxed text-blue-100/80">
                      {dic?.calculator?.uncertainty_note ||
                        "Die Datengrundlage ist noch grob. Mit weiteren Angaben wird die Schätzung belastbarer."}
                    </span>
                  ) : (
                    <span className="mt-4 block border-t border-white/6 pt-4 text-[12px] leading-relaxed text-white/45">
                      {dic?.calculator?.legal_note ||
                        "Diese Kalkulation ist unverbindlich und dient als erste Orientierung."}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoTile
                    icon={<Clock size={14} />}
                    label={dic?.calculator?.duration || "Dauer"}
                    value={est?.estimatedHours || "–"}
                  />
                  <InfoTile
                    icon={<Users size={14} />}
                    label={dic?.calculator?.personnel || "Personal"}
                    value={est?.recommendedTeam || "–"}
                  />
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-5">
                  <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/38">
                    {dic?.calculator?.summary || "Zusammenfassung"}
                  </h4>

                  <p className="text-[14px] leading-relaxed text-white/88">
                    {est?.calculationBasis || "Noch keine ausreichenden Daten vorhanden."}
                  </p>

                  {Array.isArray(est?.operationalFlags) && est.operationalFlags.length > 0 && (
                    <div className="mt-5 border-t border-white/6 pt-5">
                      <h4 className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/38">
                        <HardHat size={14} className="text-blue-300/80" />
                        {dic?.calculator?.included_in_calculation || "Berücksichtigt"}
                      </h4>

                      <ul className="space-y-2">
                        {est.operationalFlags.map((flag: string, i: number) => (
                          <li
                            key={`${flag}-${i}`}
                            className="flex items-start text-[12px] leading-relaxed text-white/65"
                          >
                            <span className="me-2 mt-[2px] text-blue-300">✓</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <div className="relative z-10 mt-8 space-y-4">
            <button
              onClick={() => {
                if (!canProceedToLead) return;
                setMode("lead");
              }}
              disabled={!canProceedToLead}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-[15px] font-semibold tracking-wide text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <PhoneCall size={18} />
              {dic?.calculator?.fix_now_btn || "Angebot anfragen"}
            </button>

            <div className="px-2 pt-1 text-center">
              <p className="text-[11px] leading-relaxed text-white/35">
                {dic?.calculator?.unbinding_note ||
                  "Unverbindlich. Die finale Bestätigung erfolgt erst nach Prüfung Ihrer Angaben."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]">
      <div className="mb-2 flex items-center gap-2 text-white/38">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <span className="text-[15px] font-medium text-white">{value}</span>
    </div>
  );
}