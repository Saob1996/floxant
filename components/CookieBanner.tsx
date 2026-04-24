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
            className="fixed bottom-6 start-6 z-[90] p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all group"
            title={dic?.cookie?.settings || "Cookie Einstellungen"}
            aria-label={dic?.cookie?.settings || "Cookie Einstellungen anpassen"}
          >
            <Shield className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </m.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl pointer-events-auto">
              {!showSettings ? (
                // Basic View
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl shrink-0 hidden sm:block">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{dic?.cookie?.title || "Ihre Privatsphäre ist uns wichtig"}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {dic?.cookie?.desc || "Wir nutzen Cookies, um Ihre Erfahrung auf FLOXANT zu optimieren. Einige sind essenziell für die Funktionalität, während andere uns helfen, unsere Website und Marketingmaßnahmen zu verbessern. Sie können Ihre Wahl jederzeit anpassen."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-between gap-4 pt-4 border-t border-white/5 sm:flex-row">
                    <div className="flex gap-4 text-xs text-neutral-500">
                      <a href="/datenschutz" className="hover:text-primary transition-colors hover:underline">{dic?.cookie?.privacy || "Datenschutz"}</a>
                      <a href="/impressum" className="hover:text-primary transition-colors hover:underline">{dic?.cookie?.imprint || "Impressum"}</a>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setShowSettings(true)}
                        className="px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        {dic?.cookie?.settings || "Einstellungen"}
                      </button>
                      {/* Note: In Germany (DSGVO/TTDSG), 'Reject' and 'Accept' must be visually comparable */}
                      <button
                        onClick={handleAcceptNecessary}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 rounded-xl transition-colors"
                      >
                        {dic?.cookie?.essential_only || "Nur Essenzielle"}
                      </button>
                      <PremiumButton onClick={handleAcceptAll} className="whitespace-nowrap px-8">
                        {dic?.cookie?.accept_all || "Alle akzeptieren"}
                      </PremiumButton>
                    </div>
                  </div>
                </div>
              ) : (
                // Advanced Settings
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Settings2 className="w-5 h-5 text-primary" />
                      {dic?.cookie?.settings || "Cookie Einstellungen"}
                    </h3>
                    <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pe- custom-scrollbar">
                    {/* Essential */}
                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="pe-">
                        <h4 className="font-bold mb-1">Essenziell</h4>
                        <p className="text-xs text-neutral-400">Diese Cookies sind für die Grundfunktionen der Website zwingend erforderlich.</p>
                      </div>
                      <div className="flex items-center gap-2 text-primary text-sm font-bold bg-primary/10 px-3 py-1 rounded-full shrink-0">
                        <Check className="w-4 h-4" /> Immer aktiv
                      </div>
                    </div>
                    
                    {/* Analytics */}
                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10 transition-colors">
                      <div className="pe- cursor-pointer" onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}>
                        <h4 className="font-bold mb-1">Analyse & Performance</h4>
                        <p className="text-xs text-neutral-400">Helfen uns zu verstehen, wie Besucher mit der Website interagieren (z.B. Google Analytics).</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                        <input type="checkbox" checked={preferences.analytics} onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10 transition-colors">
                      <div className="pe- cursor-pointer" onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}>
                        <h4 className="font-bold mb-1">Marketing</h4>
                        <p className="text-xs text-neutral-400">Werden verwendet, um Besuchern relevante Werbung anzuzeigen (z.B. Google Ads).</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                        <input type="checkbox" checked={preferences.marketing} onChange={(e) => setPreferences(p => ({ ...p, marketing: e.target.checked }))} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      Alle auswählen
                    </button>
                    <PremiumButton onClick={handleSaveSettings} className="px-8">
                      {dic?.cookie?.save || "Auswahl speichern"}
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
