"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { PhoneCall, Clock3, ArrowRight, MessageCircle } from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { company } from "@/lib/company";

export default function ExitIntentModal() {
  const mode = useCalculatorStore((s) => s.mode);
  const setMode = useCalculatorStore((s) => s.setMode);

  const [isVisible, setIsVisible] = useState(false);

  const whatsappUrl = useMemo(
    () => `https://wa.me/${company.phoneRaw.replace("+", "")}`,
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mode !== "advanced") return;

    const hasSeenExitIntent = window.sessionStorage.getItem("floxant_exit_seen");
    if (hasSeenExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 12) {
        setIsVisible(true);
        window.sessionStorage.setItem("floxant_exit_seen", "true");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mode]);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const closeModal = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <m.button
          type="button"
          aria-label="Overlay schließen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <m.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/15 bg-blue-400/10 text-blue-300">
              <PhoneCall size={30} />
            </div>

            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white">
              Noch Fragen vor dem Absenden?
            </h2>

            <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-white/55">
              Sie können Ihre Anfrage jetzt direkt übermitteln oder kurz per
              WhatsApp klären, falls noch Angaben fehlen. So kommen Sie schneller
              zu einer belastbaren Rückmeldung.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-[#0B0D12] p-4 text-start">
              <div className="flex items-center gap-3">
                <Clock3 size={18} className="shrink-0 text-blue-300" />
                <span className="text-sm text-white/85">
                  Unverbindliche Anfrage statt sofortiger Verpflichtung
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-blue-300" />
                <span className="text-sm text-white/85">
                  Rückfragen können später noch ergänzt werden
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMode("lead");
                  closeModal();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-medium text-black transition-colors hover:bg-white/95"
              >
                Anfrage jetzt absenden
                <ArrowRight size={18} />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0B0D12] py-4 font-medium text-white transition-colors hover:border-blue-400/25 hover:bg-white/[0.03]"
              >
                Kurz per WhatsApp klären
              </a>

              <button
                onClick={closeModal}
                className="w-full py-3 text-sm text-white/45 transition-colors hover:text-white"
              >
                Weiter ohne Unterbrechung
              </button>
            </div>
          </div>
        </m.div>
      </div>
    </AnimatePresence>
  );
}