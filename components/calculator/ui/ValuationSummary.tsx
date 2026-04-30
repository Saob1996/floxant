"use client";

import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { Clock, Database, Info, ShieldCheck, TrendingUp, Users } from "lucide-react";

import { AdvancedEstimate, useCalculatorStore } from "@/store/calculatorStore";
import { cn } from "@/lib/utils";

interface ValuationSummaryProps {
  estimate: AdvancedEstimate | null;
  hasInput: boolean;
  dic?: any;
  className?: string;
  isMobile?: boolean;
}

function formatEuro(value: number | undefined): string {
  return new Intl.NumberFormat("de-DE").format(value || 0);
}

export const ValuationSummary: React.FC<ValuationSummaryProps> = ({
  estimate,
  hasInput,
  dic,
  className,
  isMobile = false,
}) => {
  const customerBudget = useCalculatorStore((state) => state.leadDetails.customerBudget);

  if (!estimate && hasInput) return null;

  return (
    <div
      className={cn(
        "glass-elevated relative overflow-hidden rounded-[2.5rem] p-7 shadow-[0_28px_90px_rgba(15,23,42,0.12)]",
        isMobile ? "rounded-[1.6rem] p-5" : "",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.08),transparent_24%)]" />

      <div
        className={cn(
          "relative z-10 flex items-center justify-between border-b border-slate-200 pb-6",
          isMobile && "mb-4 border-none pb-0"
        )}
      >
        <h3 className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-950">
          <Database className="text-blue-600" size={20} />
          {isMobile ? "Einordnung" : dic?.calculator?.valuation_title || "Aktuelle Einordnung"}
        </h3>
        <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
          {estimate?.valuationStage || "Erste Einschätzung"}
        </div>
      </div>

      {!hasInput ? (
        <div className="relative z-10 py-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.8rem] border border-slate-200 bg-white text-4xl font-bold text-slate-950 shadow-sm shadow-slate-950/5">
            1
          </div>
          <h4 className="mb-4 text-xl font-bold tracking-tight text-slate-950">
            Vorprüfung startet hier
          </h4>
          <p className="mx-auto max-w-[260px] text-sm leading-7 text-slate-600">
            Geben Sie die wichtigsten Eckdaten an. Daraus entsteht ein erster, unverbindlicher
            Orientierungsrahmen.
          </p>
        </div>
      ) : (
        <div className="relative z-10 space-y-7 pt-7">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-6 text-white shadow-[0_26px_56px_rgba(37,99,235,0.24)]",
              isMobile ? "rounded-[1.3rem] p-5" : "lg:p-8"
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">
                Unverbindlicher Orientierungsrahmen
              </span>
              <Tooltip text="Diese Einordnung basiert auf Ihren Angaben zu Umfang, Zugang, Region, Zusatzleistungen und Terminlage." />
            </div>

            <div className="flex flex-wrap items-end gap-2 lg:gap-3">
              <span className="text-4xl font-bold tracking-tighter lg:text-5xl">
                {formatEuro(estimate?.priceRange?.min)}
              </span>
              <span className="pb-1 text-xl font-light tracking-widest text-blue-100/80 lg:text-2xl">
                -
              </span>
              <span className="text-4xl font-bold tracking-tighter lg:text-5xl">
                {formatEuro(estimate?.priceRange?.max)}
              </span>
              <span className="ml-1 pb-1 text-lg font-black uppercase tracking-[0.12em] text-blue-100 lg:text-xl">
                EUR
              </span>
            </div>

            <p className="mt-5 text-sm font-semibold text-blue-50">
              {estimate?.valuationStage || "Erste Einschätzung"}
            </p>
            <p className="mt-2 text-sm leading-7 text-blue-50/92">
              {estimate?.priceExplanation ||
                "Diese Einschätzung wird mit mehr Details Schritt für Schritt belastbarer."}
            </p>

            {customerBudget.trim() ? (
              <div className="mt-5 rounded-2xl border border-white/20 bg-white/14 p-4 backdrop-blur-sm">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100/88">
                  Ihre Preisvorstellung
                </span>
                <p className="mt-2 text-lg font-bold text-white">{customerBudget}</p>
              </div>
            ) : null}
          </m.div>

          {estimate?.topDrivers?.length ? (
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Wichtigste Kostentreiber
              </span>
              <div className="flex flex-wrap gap-2">
                {estimate.topDrivers.map((driver) => (
                  <span
                    key={driver}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm shadow-slate-950/5"
                  >
                    <TrendingUp size={12} className="text-blue-600" />
                    {driver}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-4">
            <InfoTile label="Zeitansatz" value={estimate?.estimatedHours || "-"} icon={<Clock size={16} />} />
            <InfoTile label="Personal" value={estimate?.recommendedTeam || "-"} icon={<Users size={16} />} />
          </div>

          <div className="flex items-start gap-4 rounded-[1.7rem] border border-emerald-200 bg-emerald-50 p-5">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-600" />
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700">
                Nächster Schritt
              </span>
              <p className="text-sm leading-6 text-slate-700">
                FLOXANT prüft die Anfrage danach fachlich auf Umsetzbarkeit, offene Punkte und
                den realen Leistungsumfang. Erst daraus entsteht ein belastbares Angebot.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    <div className="rounded-[1.6rem] border border-slate-200 bg-white/92 p-5 shadow-sm shadow-slate-950/5">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="text-lg font-bold tracking-tight text-slate-950">{value}</div>
    </div>
  );
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-blue-100/80 transition-colors hover:text-white"
      >
        <Info size={12} />
      </button>
      <AnimatePresence>
        {show ? (
          <m.div
            initial={{ opacity: 0, scale: 0.94, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 5 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl bg-white p-3 text-[10px] font-bold text-slate-900 shadow-2xl"
          >
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
            {text}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
