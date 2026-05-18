"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, MessageCircle, PhoneCall } from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { company } from "@/lib/company";

const PROMPT_DELAY_MS = 120000;
const PROMPT_SEEN_KEY = "floxant_exit_prompt_seen_v2";

export default function ExitIntentModal() {
 const mode = useCalculatorStore((s) => s.mode);
 const setMode = useCalculatorStore((s) => s.setMode);
 const [isVisible, setIsVisible] = useState(false);

 const whatsappUrl = useMemo(() => {
  const phone = company.phoneRaw.replace(/\D/g, "");
  const text = encodeURIComponent(
   "Hallo FLOXANT, ich habe noch eine Frage vor dem Absenden meiner Anfrage."
  );
  return `https://wa.me/${phone}?text=${text}`;
 }, []);

 useEffect(() => {
  if (typeof window === "undefined") return;

  const isEligibleMode = mode === "express" || mode === "advanced";
  if (!isEligibleMode) return;
  if (localStorage.getItem(PROMPT_SEEN_KEY)) return;

  const timer = window.setTimeout(() => {
   if (localStorage.getItem(PROMPT_SEEN_KEY)) return;

   localStorage.setItem(PROMPT_SEEN_KEY, new Date().toISOString());
   setIsVisible(true);
  }, PROMPT_DELAY_MS);

  return () => window.clearTimeout(timer);
 }, [mode]);

 useEffect(() => {
  if (!isVisible || typeof document === "undefined") return;

  const previousOverflow = document.body.style.overflow;
  const handleKeyDown = (event: KeyboardEvent) => {
   if (event.key === "Escape") setIsVisible(false);
  };

  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", handleKeyDown);

  return () => {
   document.body.style.overflow = previousOverflow;
   document.removeEventListener("keydown", handleKeyDown);
  };
 }, [isVisible]);

 const closeModal = () => {
  if (typeof window !== "undefined") {
   localStorage.setItem(PROMPT_SEEN_KEY, new Date().toISOString());
  }
  setIsVisible(false);
 };

 return (
  <AnimatePresence>
   {isVisible ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
     <m.button
      type="button"
      aria-label="Hinweis schließen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
      className="absolute inset-0 bg-slate-950/76 backdrop-blur-md"
     />

     <m.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="floxant-exit-title"
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 16 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flox-exit-modal relative w-full max-w-lg overflow-hidden p-6 text-center shadow-[0_34px_90px_rgba(2,6,23,0.48)] md:p-8"
     >
      <div className="flox-exit-modal-mark mx-auto mb-6">
       <PhoneCall className="h-7 w-7" />
      </div>

      <h2 id="floxant-exit-title" className="flox-card-title-lg text-white md:text-3xl">
       Noch Fragen vor dem Absenden?
      </h2>

      <p className="mx-auto mt-4 max-w-sm text-sm font-semibold leading-7 text-slate-300">
       Sie können die Anfrage direkt senden oder eine kurze Rückfrage per WhatsApp klären.
       FLOXANT prüft danach den passenden nächsten Schritt.
      </p>

      <div className="flox-exit-modal-proof mt-7 grid gap-3 p-4 text-left">
       <div className="flex items-center gap-3">
        <Clock3 className="h-5 w-5 shrink-0 text-cyan-200" />
        <span>Kein Sofortauftrag, sondern eine unverbindliche Prüfung.</span>
       </div>
       <div className="flex items-center gap-3">
        <MessageCircle className="h-5 w-5 shrink-0 text-emerald-200" />
        <span>Fehlende Angaben können später ergänzt werden.</span>
       </div>
      </div>

      <div className="mt-7 flex flex-col gap-3">
       <button
        type="button"
        onClick={() => {
         setMode("lead");
         closeModal();
        }}
        className="flox-exit-primary group"
       >
        <CheckCircle2 className="h-5 w-5" />
        Anfrage jetzt absenden
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
       </button>

       <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeModal}
        className="flox-exit-whatsapp"
       >
        <MessageCircle className="h-5 w-5" />
        Kurz per WhatsApp klären
       </a>

       <button
        type="button"
        onClick={closeModal}
        className="py-3 text-sm font-bold text-slate-400 transition hover:text-white"
       >
        Weiter ohne Unterbrechung
       </button>
      </div>
     </m.div>
    </div>
   ) : null}
  </AnimatePresence>
 );
}
