"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Shield, Check, X, Settings2 } from "lucide-react";
import Link from "next/link";
import { PremiumButton } from "./ui/PremiumButton";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner({ dic }: { dic?: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  
  // Default preferences
  const [preferences, setPreferences] = useState<ConsentState>({
    necessary: true, // Always true
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    } else {
      setShowTrigger(true);
      try {
        if (consent.startsWith("{")) {
          setPreferences(JSON.parse(consent));
        } else {
          // Legacy migration
          setPreferences({
            necessary: true,
            analytics: consent === "all",
            marketing: consent === "all"
          });
        }
      } catch (e) {}
    }
  }, []);

  const saveConsent = (state: ConsentState) => {
    localStorage.setItem("cookie_consent", JSON.stringify(state));
    setPreferences(state);
    setIsVisible(false);
    setShowSettings(false);
    setShowTrigger(true);
    // Here you would trigger analytics logic (e.g. init GTM)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: state }));
    }
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleAcceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveSettings = () => {
    saveConsent(preferences);
  };

  return (
    <>
      {/* Small persistent trigger button bottom left */}
      <AnimatePresence>
        {showTrigger && !isVisible && (
          <m.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsVisible(true)}
            className="fixed bottom-5 start-5 z-[90] rounded-full border border-slate-200 bg-white/95 p-3 text-slate-900 shadow-[0_16px_34px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_42px_rgba(15,23,42,0.22)] group"
            title={dic?.cookie?.settings || "Cookie Einstellungen"}
            aria-label={dic?.cookie?.settings || "Cookie Einstellungen anpassen"}
          >
            <Shield className="w-5 h-5 text-slate-800 transition-colors group-hover:text-blue-700" />
          </m.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4 md:p-6 pointer-events-none"
          >
            <div className="mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-[1.35rem] border border-white/20 bg-[#0b111b] p-5 text-white shadow-[0_24px_90px_rgba(2,6,23,0.45)] ring-1 ring-black/20 pointer-events-auto md:p-7">
              {!showSettings ? (
                // Basic View
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="hidden shrink-0 rounded-xl border border-blue-300/20 bg-blue-400/14 p-3 sm:block">
                      <Shield className="w-6 h-6 text-blue-200" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>{dic?.cookie?.title || "Ihre Privatsphäre ist uns wichtig"}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed" style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}>
                        {dic?.cookie?.desc || "Wir nutzen Cookies, um Ihre Erfahrung auf FLOXANT zu optimieren. Einige sind essenziell für die Funktionalität, während andere uns helfen, unsere Website und Marketingmaßnahmen zu verbessern. Sie können Ihre Wahl jederzeit anpassen."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-stretch justify-between gap-4 border-t border-white/10 pt-4 lg:flex-row lg:items-center">
                    <div className="flex gap-4 text-xs font-semibold text-slate-200">
                      <a href="/datenschutz" className="transition-colors hover:text-white hover:underline" style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}>{dic?.cookie?.privacy || "Datenschutz"}</a>
                      <a href="/impressum" className="transition-colors hover:text-white hover:underline" style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}>{dic?.cookie?.imprint || "Impressum"}</a>
                    </div>
                    
                    <div className="grid w-full gap-3 sm:grid-cols-3 lg:flex lg:w-auto">
                      <button
                        onClick={() => setShowSettings(true)}
                        className="min-h-11 rounded-xl border border-slate-500 bg-slate-800 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-slate-700"
                        style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }}
                      >
                        {dic?.cookie?.settings || "Einstellungen"}
                      </button>
                      {/* Note: In Germany (DSGVO/TTDSG), 'Reject' and 'Accept' must be visually comparable */}
                      <button
                        onClick={handleAcceptNecessary}
                        className="min-h-11 rounded-xl border border-slate-500 bg-neutral-800 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-neutral-700"
                        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                      >
                        {dic?.cookie?.essential_only || "Nur Essenzielle"}
                      </button>
                      <PremiumButton
                        onClick={handleAcceptAll}
                        className="min-h-11 whitespace-nowrap px-6 text-white"
                        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                      >
                        <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                          {dic?.cookie?.accept_all || "Alle akzeptieren"}
                        </span>
                      </PremiumButton>
                    </div>
                  </div>
                </div>
              ) : (
                // Advanced Settings
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                      <Settings2 className="w-5 h-5 text-primary" />
                      {dic?.cookie?.settings || "Cookie Einstellungen"}
                    </h3>
                    <button onClick={() => setShowSettings(false)} className="rounded-full p-2 text-slate-100 transition-colors hover:bg-white/12" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} aria-label="Cookie Einstellungen schließen">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="custom-scrollbar max-h-[50vh] space-y-4 overflow-y-auto pe-1">
                    {/* Essential */}
                    <div className="flex flex-col gap-3 rounded-xl border border-white/12 bg-white/6 p-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="pe-">
                        <h4 className="font-bold mb-1 text-white">Essenziell</h4>
                        <p className="text-xs text-slate-300">Diese Cookies sind für die Grundfunktionen der Website zwingend erforderlich.</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/14 px-3 py-1 text-sm font-bold text-blue-100">
                        <Check className="w-4 h-4" /> Immer aktiv
                      </div>
                    </div>
                    
                    {/* Analytics */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/12 bg-white/6 p-4 transition-colors">
                      <div className="pe- cursor-pointer" onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}>
                        <h4 className="font-bold mb-1 text-white">Analyse & Performance</h4>
                        <p className="text-xs text-slate-300">Helfen uns zu verstehen, wie Besucher mit der Website interagieren (z.B. Google Analytics).</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                        <input type="checkbox" checked={preferences.analytics} onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/12 bg-white/6 p-4 transition-colors">
                      <div className="pe- cursor-pointer" onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}>
                        <h4 className="font-bold mb-1 text-white">Marketing</h4>
                        <p className="text-xs text-slate-300">Werden verwendet, um Besuchern relevante Werbung anzuzeigen (z.B. Google Ads).</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                        <input type="checkbox" checked={preferences.marketing} onChange={(e) => setPreferences(p => ({ ...p, marketing: e.target.checked }))} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-end gap-3 border-t border-white/10 pt-4 sm:flex-row">
                    <button
                      onClick={handleAcceptAll}
                      className="min-h-11 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors hover:bg-white/10"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      Alle auswählen
                    </button>
                    <PremiumButton
                      onClick={handleSaveSettings}
                      className="min-h-11 px-8 text-white"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                        {dic?.cookie?.save || "Auswahl speichern"}
                      </span>
                    </PremiumButton>
                  </div>
                </div>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
