"use client";

import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { Clock, Users, Database, ShieldCheck, Info, TrendingUp } from "lucide-react";
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
        "relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl",
        isMobile ? "rounded-[1.5rem] p-5" : "p-8",
        className
      )}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.1),transparent_70%)]" />

      <div
        className={cn(
          "relative z-10 flex items-center justify-between border-b border-white/5 pb-6",
          isMobile && "mb-4 border-none pb-0"
        )}
      >
        <h3 className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
          <Database className="text-blue-500" size={20} />
          {isMobile ? "Einordnung" : dic?.calculator?.valuation_title || "Aktuelle Einordnung"}
        </h3>
        <div className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
          {estimate?.valuationStage || "Erste Einschätzung"}
        </div>
      </div>

      {!hasInput ? (
        <div className="relative z-10 py-10 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/[0.03] text-5xl shadow-inner">
            1
          </div>
          <h4 className="mb-4 text-xl font-bold tracking-tight text-white">Vorprüfung startet hier</h4>
          <p className="mx-auto max-w-[240px] text-sm font-medium leading-relaxed text-white/40">
            Geben Sie die wichtigsten Eckdaten an, damit FLOXANT einen unverbindlichen
            Orientierungsrahmen einordnen kann.
          </p>
        </div>
      ) : (
        <div className="relative z-10 space-y-8">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-[2rem] border border-blue-500/20 bg-blue-500/[0.03] ring-1 ring-blue-500/10",
              isMobile ? "rounded-[1.2rem] p-5" : "p-6 lg:p-8"
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                Unverbindlicher Orientierungsrahmen
              </span>
              <Tooltip text="Diese Einordnung basiert auf Ihren Angaben zu Umfang, Zugang, Region, Zusatzleistungen und Terminlage." />
            </div>

            <div className="flex flex-wrap items-baseline gap-2 lg:gap-3">
              <span className="text-4xl font-bold tracking-tighter text-white lg:text-5xl">
                {formatEuro(estimate?.priceRange?.min)}
              </span>
              <span className="text-xl font-light tracking-widest text-white/20 lg:text-2xl">-</span>
              <span className="text-4xl font-bold tracking-tighter text-white lg:text-5xl">
                {formatEuro(estimate?.priceRange?.max)}
              </span>
              <span className="ml-1 text-xl font-bold text-blue-500 lg:text-2xl">EUR</span>
            </div>

            <p className="mt-5 text-xs font-semibold text-white/70">{estimate?.valuationStage}</p>
            <p className="mt-2 text-[11px] font-medium leading-relaxed text-white/45">
              {estimate?.priceExplanation ||
                "Diese Einschätzung wird mit mehr Details Schritt für Schritt belastbarer."}
            </p>
            <p className="mt-4 text-[11px] font-medium leading-relaxed text-white/35">
              Auf Basis dieser Vorprüfung kann FLOXANT die Anfrage fachlich prüfen und den
              Leistungsumfang konkretisieren.
            </p>

            {customerBudget.trim() ? (
              <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                  Ihre Preisvorstellung
                </span>
                <p className="mt-2 text-lg font-bold text-white">{customerBudget}</p>
              </div>
            ) : null}
          </m.div>

          {estimate?.topDrivers?.length ? (
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Wichtige Kostentreiber
              </span>
              <div className="flex flex-wrap gap-2">
                {estimate.topDrivers.map((driver) => (
                  <span
                    key={driver}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-1.5 text-[10px] font-bold text-white/70"
                  >
                    <TrendingUp size={10} className="text-blue-500/60" />
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

          <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-500" />
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-400">Nächster Schritt</span>
              <p className="text-[10px] font-medium leading-relaxed text-white/45">
                FLOXANT prüft die Anfrage auf Umsetzbarkeit, offene Punkte und den finalen
                Leistungsumfang. Erst danach entsteht ein belastbares Angebot.
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
    <div className="rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5">
      <div className="mb-3 flex items-center gap-2 text-white/30">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="text-lg font-bold tracking-tight text-white">{value}</div>
    </div>
  );
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-white/20 transition-colors hover:text-white/40"
      >
        <Info size={12} />
      </button>
      <AnimatePresence>
        {show ? (
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-xl bg-white/95 p-3 text-[10px] font-bold text-slate-900 shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
            {text}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
