"use client";

import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const statuses = ["Hub Regensburg aktiv", "Einsatzgebiet Bayern", "Anfrageannahme offen"] as const;

export function OperatingStatusBar({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap gap-2 rounded-[1.25rem] border border-slate-200 bg-white/82 p-2 shadow-sm shadow-slate-950/5 backdrop-blur",
        className,
      )}
      aria-label="FLOXANT Betriebsstatus"
    >
      {statuses.map((status, index) => (
        <m.div
          key={status}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50/90 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          {status}
        </m.div>
      ))}
    </div>
  );
}
