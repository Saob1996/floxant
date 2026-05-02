"use client";

import { useEffect, useMemo, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { CheckCircle2, MapPin, Radar } from "lucide-react";

import { cn } from "@/lib/utils";

const scanSteps = ["PLZ erkannt", "Region wird geprüft", "Servicebereich verfügbar"] as const;

type ScanState = "idle" | "scanning" | "complete";

export function PlzOperationScanner({
  className,
  serviceLabel = "Service",
}: {
  className?: string;
  serviceLabel?: string;
}) {
  const [value, setValue] = useState("");
  const [scanState, setScanState] = useState<ScanState>("idle");
  const prefersReducedMotion = useReducedMotion();

  const normalizedLocation = useMemo(() => {
    const fiveDigitPlz = value.match(/\b\d{5}\b/)?.[0];
    return fiveDigitPlz || value.trim();
  }, [value]);

  useEffect(() => {
    const trimmed = value.trim();
    const hasFiveDigitPlz = /\b\d{5}\b/.test(trimmed);
    const hasPlaceName = /[a-zA-ZäöüÄÖÜß]{3,}/.test(trimmed) && !/^\d+$/.test(trimmed);

    if (!trimmed) {
      setScanState("idle");
      return;
    }

    if (!hasFiveDigitPlz && !hasPlaceName) {
      setScanState("idle");
      return;
    }

    setScanState("scanning");
    const timer = window.setTimeout(() => setScanState("complete"), prefersReducedMotion ? 120 : 920);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, value]);

  const isComplete = scanState === "complete";
  const isScanning = scanState === "scanning";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] border border-blue-100 bg-white/88 p-4 shadow-sm shadow-slate-950/5",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
            <Radar className={cn("h-3.5 w-3.5", isScanning && "motion-safe:animate-pulse")} />
            Einsatzgebiet-Check
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Optionaler Schnellcheck für {serviceLabel}: PLZ oder Ort eingeben, dann wird der
            Servicebereich kurz eingeordnet.
          </p>
        </div>
        <label className="relative block w-full lg:max-w-[280px]">
          <span className="sr-only">PLZ oder Ort für Einsatzgebiet prüfen</span>
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600" />
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            inputMode="search"
            placeholder="z. B. 93047 oder Regensburg"
            className="h-11 w-full rounded-[1rem] border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {scanSteps.map((step, index) => {
          const done = isComplete || (isScanning && index === 0);
          const active = isScanning && index === 1;

          return (
            <m.div
              key={step}
              initial={prefersReducedMotion ? false : { opacity: 0.72, y: 4 }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: done || active ? 1 : 0.72,
                      y: 0,
                    }
              }
              transition={{ duration: 0.32, delay: index * 0.05, ease: "easeOut" }}
              className={cn(
                "flex items-center gap-2 rounded-[0.9rem] border px-3 py-2 text-xs font-bold",
                done
                  ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                  : active
                    ? "border-blue-100 bg-blue-50 text-blue-800"
                    : "border-slate-100 bg-slate-50 text-slate-500",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  done ? "bg-emerald-500 text-white" : "bg-white text-slate-400",
                )}
              >
                {done ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <span className={cn("h-1.5 w-1.5 rounded-full bg-current", active && "motion-safe:animate-pulse")} />
                )}
              </span>
              {step}
            </m.div>
          );
        })}
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500" role="status" aria-live="polite">
        {isComplete
          ? `${normalizedLocation || "Region"} ist als Anfragegebiet vorbereitet. Die finale Machbarkeit hängt von Umfang, Termin und Kapazität ab.`
          : isScanning
            ? "Region wird kurz abgeglichen. Die Animation bleibt bewusst kurz und blockiert den Rechner nicht."
            : "Keine automatische Zusage: Der Check hilft nur, die Anfrage schneller einzuordnen."}
      </p>
    </div>
  );
}
