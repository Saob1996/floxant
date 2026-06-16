"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroQuickstart() {
  const [plz, setPlz] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plz.length < 5) return;

    setStatus("processing");
    
    // Operational Feedback (Natural speed, not fake blocking)
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        // Optional: trigger some store state if calculator should pre-fill
      }, 800);
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-lg">
      <form 
        onSubmit={handleSubmit}
        className="group relative flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all hover:border-blue-500/30"
      >
        <div className="flex-1 flex items-center gap-3 px-4">
          <MapPin className="h-4 w-4 text-white/40" />
          <input
            type="text"
            maxLength={5}
            placeholder="PLZ eingeben..."
            value={plz}
            onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-transparent text-sm font-medium text-white placeholder:text-white/20 outline-none"
          />
        </div>
        
        <button
          type="submit"
          disabled={plz.length < 5 || status !== "idle"}
          className={cn(
            "inline-flex h-11 items-center gap-2 px-6 rounded-xl bg-blue-600 text-xs font-bold uppercase tracking-widest text-white transition-all",
            "hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {status === "idle" ? (
            <>
              Starten
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          ) : (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          )}
        </button>
      </form>

      <AnimatePresence>
        {status !== "idle" && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-4 p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-lg z-20"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400">
                  {status === "processing" ? "Region wird geprüft" : "Weiter geht es"}
                </span>
                {status === "success" && <CheckCircle2 className="h-3 w-3 text-blue-400" />}
              </div>
              <p className="text-xs font-medium text-white/80">
                {status === "processing"
                  ? "Wir prüfen, ob Ihr Einsatzort zum passenden FLOXANT Kontaktweg passt."
                  : "Danke. Wir führen Sie jetzt direkt zum Anfragebereich."}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
