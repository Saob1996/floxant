"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

const labels = ["Budget einschätzen", "Preisrahmen starten", "Unverbindlich senden"] as const;

export function BudgetOperatingCta({ className }: { className?: string }) {
  const [active, setActive] = useState(false);
  const [labelIndex, setLabelIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active || prefersReducedMotion) {
      setLabelIndex(0);
      return;
    }

    const timer = window.setInterval(() => {
      setLabelIndex((index) => (index + 1) % labels.length);
    }, 780);

    return () => window.clearInterval(timer);
  }, [active, prefersReducedMotion]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.6rem] border border-emerald-200 bg-[linear-gradient(135deg,rgba(236,253,245,0.92),rgba(255,255,255,0.95)_55%,rgba(239,246,255,0.86))] p-4 shadow-sm shadow-slate-950/5",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-emerald-200/45 blur-3xl" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-emerald-600 text-white shadow-lg shadow-emerald-900/15">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
              Preisvorschlag
            </div>
            <h3 className="mt-1 text-xl font-black tracking-[-0.02em] text-slate-950">
              Eigenes Budget nennen, ehrlich einschätzen lassen.
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              Wenn ein Preisrahmen vorhanden ist, kann FLOXANT einordnen, ob Umfang, Termin und
              Leistung dazu realistisch passen.
            </p>
          </div>
        </div>

        <Link
          href="/anfrage-mit-preisrahmen"
          aria-label="Eigenes Budget einschätzen lassen"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          className="group inline-flex h-12 w-full min-w-0 items-center justify-center gap-3 rounded-[1.05rem] bg-slate-950 px-5 text-[11px] font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 sm:w-auto"
        >
          <ClipboardCheck className="h-4 w-4" />
          <m.span
            key={labels[labelIndex]}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="inline-block min-w-0 text-center sm:min-w-[12.5rem] sm:text-left"
          >
            {labels[labelIndex]}
          </m.span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
