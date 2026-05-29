"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const stats = [
  { value: 4, label: "Servicewege", text: "Umzug, Reinigung, Entrümpelung, Büroumzug" },
  { value: 3, label: "Kontaktwege", text: "Rechner, Buchung, WhatsApp" },
  { value: 1, label: "Ablauf", text: "Geführte Anfrage statt loser Preisfrage" },
] as const;

const checklist = [
  "Preisrahmen bleibt unverbindlich, bis der Auftrag geprüft wurde.",
  "Zugang, Termin und Zusatzleistungen werden früh sichtbar.",
  "Budget oder Preisvorstellung kann direkt mitgedacht werden.",
] as const;

function CountUp({ value, start }: { value: number; start: boolean }) {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrent(value);
      return;
    }

    if (!start) {
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const duration = 760;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCurrent(Math.round(value * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    setCurrent(0);
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion, start, value]);

  return <>{current}</>;
}

export function OperatingProofStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(stripRef, { once: true, amount: 0.35 });
  const shouldCount = Boolean(prefersReducedMotion || isInView);

  return (
    <div
      ref={stripRef}
      className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-950/5"
    >
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
            Nachvollziehbarer Ablauf
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-950">
            Klare Schritte, sichtbar geführt.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Keine erfundenen Live-Zahlen. Nur die echten Schritte, die eine Anfrage für FLOXANT
            besser prüfbar machen.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((item, index) => (
            <m.div
              key={item.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="rounded-[1.2rem] border border-slate-100 bg-slate-50 p-4"
            >
              <div className="min-w-8 text-3xl font-black tracking-[-0.04em] text-slate-950 tabular-nums">
                <CountUp value={item.value} start={shouldCount} />
              </div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                {item.label}
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
            </m.div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {checklist.map((item, index) => (
          <m.div
            key={item}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.18 + index * 0.07, ease: "easeOut" }}
            className="flex items-start gap-3 rounded-[1rem] border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm leading-6 text-slate-700"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            {item}
          </m.div>
        ))}
      </div>
    </div>
  );
}
