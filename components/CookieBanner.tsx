"use client";

import { useState, useEffect } from "react";
import { Shield, Check, X, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner({ dic }: { dic?: any }) {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const isRequestRoute =
    pathname === "/kontakt" ||
    pathname === "/duesseldorf/reinigung/anfrage" ||
    pathname === "/umzug-regensburg/anfrage";
  const cookie = {
    ...(isEnglish
      ? {
          settings: "Cookie settings",
          settingsAria: "Adjust cookie settings",
          title: "Your privacy matters",
          desc: "We use necessary cookies for basic functions and optional cookies, with your consent, to improve the website. You can change your choice at any time.",
          privacy: "Privacy policy",
          imprint: "Legal notice",
          essentialOnly: "Necessary only",
          acceptAll: "Accept all",
          close: "Close cookie settings",
          essential: "Necessary",
          essentialDesc: "These cookies are required for the basic functions of the website.",
          alwaysActive: "Always active",
          analytics: "Analytics and performance",
          analyticsDesc: "Help us understand how visitors use the website.",
          marketing: "Marketing",
          marketingDesc: "Help us evaluate content and campaigns more effectively.",
          selectAll: "Select all",
          save: "Save selection",
        }
      : {
          settings: "Cookie Einstellungen",
          settingsAria: "Cookie Einstellungen anpassen",
          title: "Ihre Privatsphäre ist uns wichtig",
          desc: "Wir nutzen Cookies für Grundfunktionen und, mit Ihrer Zustimmung, zur Verbesserung unserer Website und Inhalte. Sie können Ihre Auswahl jederzeit anpassen.",
          privacy: "Datenschutz",
          imprint: "Impressum",
          essentialOnly: "Nur Essenzielle",
          acceptAll: "Alle akzeptieren",
          close: "Cookie Einstellungen schließen",
          essential: "Essenziell",
          essentialDesc: "Diese Cookies sind für die Grundfunktionen der Website zwingend erforderlich.",
          alwaysActive: "Immer aktiv",
          analytics: "Analyse & Performance",
          analyticsDesc: "Helfen uns zu verstehen, wie Besucher mit der Website interagieren.",
          marketing: "Marketing",
          marketingDesc: "Helfen dabei, Inhalte und Kampagnen relevanter auszuwerten.",
          selectAll: "Alle auswählen",
          save: "Auswahl speichern",
        }),
    ...(dic?.cookie || {}),
  };
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  
  // Default preferences
  const [preferences, setPreferences] = useState<ConsentState>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
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

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <>
      {showTrigger && !isVisible && (
          <button
            onClick={() => setIsVisible(true)}
            className="fixed bottom-24 start-5 z-[90] rounded-full border border-slate-200 bg-white/95 p-3 text-slate-900 shadow-[0_16px_34px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_42px_rgba(15,23,42,0.22)] group sm:bottom-5"
            title={cookie.settings}
            aria-label={cookie.settingsAria}
          >
            <Shield className="w-5 h-5 text-slate-800 transition-colors group-hover:text-blue-700" />
          </button>
        )}

      {isVisible && (
          <div
            className={
              isRequestRoute
                ? "pointer-events-none relative z-[120] mx-auto w-full max-w-[38rem] px-2 pt-2"
                : "pointer-events-none fixed inset-x-2 bottom-2 z-[120] sm:inset-x-auto sm:left-1/2 sm:right-auto sm:w-[min(38rem,calc(100vw-2.5rem))] sm:-translate-x-1/2"
            }
          >
            <div className="pointer-events-auto max-h-[62dvh] overflow-y-auto rounded-lg border border-white/20 bg-[#0b111b] p-3 text-white shadow-[0_18px_54px_rgba(2,6,23,0.38)] ring-1 ring-black/20 sm:max-h-[calc(100dvh-2rem)] sm:p-4">
              {!showSettings ? (
                // Basic View
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="hidden shrink-0 rounded-lg border border-blue-300/20 bg-blue-400/14 p-2.5 sm:block">
                      <Shield className="h-5 w-5 text-blue-200" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white sm:text-base" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>{cookie.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-300" style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}>
                        {cookie.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-stretch justify-between gap-3 border-t border-white/10 pt-3">
                    <div className="flex gap-4 text-[10px] font-semibold text-slate-200 sm:text-xs">
                      <a href="/datenschutz" className="transition-colors hover:text-white hover:underline" style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}>{cookie.privacy}</a>
                      <a href="/impressum" className="transition-colors hover:text-white hover:underline" style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}>{cookie.imprint}</a>
                    </div>
                    
                    <div className="grid w-full grid-cols-3 gap-1.5 sm:gap-2">
                      <button
                        aria-label={cookie.settings}
                        onClick={() => setShowSettings(true)}
                        className="min-h-10 rounded-lg border border-slate-500 bg-slate-800 px-2 py-2 text-[11px] font-bold leading-tight transition-colors hover:bg-slate-700 sm:text-xs"
                        style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }}
                      >
                        {cookie.settings}
                      </button>
                      {/* Note: In Germany (DSGVO/TTDSG), 'Reject' and 'Accept' must be visually comparable */}
                      <button
                        aria-label={cookie.essentialOnly}
                        onClick={handleAcceptNecessary}
                        className="min-h-10 rounded-lg border border-slate-500 bg-neutral-800 px-2 py-2 text-[11px] font-bold leading-tight transition-colors hover:bg-neutral-700 sm:text-xs"
                        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                      >
                        {cookie.essentialOnly}
                      </button>
                      <button
                        aria-label={cookie.acceptAll}
                        onClick={handleAcceptAll}
                        className="min-h-10 whitespace-nowrap rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-2 text-[11px] font-bold text-white transition-colors hover:from-blue-700 hover:to-cyan-600 sm:text-xs"
                        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                      >
                        <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                          {cookie.acceptAll}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Advanced Settings
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold flex items-center gap-2 text-white sm:text-xl" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                      <Settings2 className="w-5 h-5 text-primary" />
                      {cookie.settings}
                    </h3>
                    <button onClick={() => setShowSettings(false)} className="rounded-full p-2 text-slate-100 transition-colors hover:bg-white/12" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} aria-label={cookie.close}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="custom-scrollbar max-h-[46vh] space-y-3 overflow-y-auto pe-1 sm:max-h-[50vh] sm:space-y-4">
                    {/* Essential */}
                    <div className="flex flex-col gap-3 rounded-[0.85rem] border border-white/12 bg-white/6 p-3 sm:flex-row sm:items-start sm:justify-between sm:p-4">
                      <div className="min-w-0">
                        <h4 className="font-bold mb-1 text-white">{cookie.essential}</h4>
                        <p className="text-xs text-slate-300">{cookie.essentialDesc}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/14 px-3 py-1 text-sm font-bold text-blue-100">
                        <Check className="w-4 h-4" /> {cookie.alwaysActive}
                      </div>
                    </div>
                    
                    {/* Analytics */}
                    <div className="flex items-start justify-between gap-4 rounded-[0.85rem] border border-white/12 bg-white/6 p-3 transition-colors sm:p-4">
                      <button
                        type="button"
                        className="min-w-0 cursor-pointer text-left"
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      >
                        <h4 className="font-bold mb-1 text-white">{cookie.analytics}</h4>
                        <p className="text-xs text-slate-300">{cookie.analyticsDesc}</p>
                      </button>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                        <input type="checkbox" aria-label={cookie.analytics} checked={preferences.analytics} onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start justify-between gap-4 rounded-[0.85rem] border border-white/12 bg-white/6 p-3 transition-colors sm:p-4">
                      <button
                        type="button"
                        className="min-w-0 cursor-pointer text-left"
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      >
                        <h4 className="font-bold mb-1 text-white">{cookie.marketing}</h4>
                        <p className="text-xs text-slate-300">{cookie.marketingDesc}</p>
                      </button>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                        <input type="checkbox" aria-label={cookie.marketing} checked={preferences.marketing} onChange={(e) => setPreferences(p => ({ ...p, marketing: e.target.checked }))} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-end gap-2 border-t border-white/10 pt-3 sm:flex-row sm:gap-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="min-h-10 rounded-[0.75rem] px-5 py-2 text-sm font-bold transition-colors hover:bg-white/10 sm:min-h-11 sm:py-2.5"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      {cookie.selectAll}
                    </button>
                    <button
                      type="button"
                      aria-label={cookie.save}
                      onClick={handleSaveSettings}
                      className="min-h-10 rounded-[0.75rem] bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-8 text-sm font-bold text-white transition-colors hover:from-blue-700 hover:to-cyan-600 sm:min-h-11"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                        {cookie.save}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </>
  );
}
