"use client";

import { MessageCircle } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/lib/company";

export function WhatsAppButton({ dic }: { dic?: any }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      setHasInteracted(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const phoneClean = company.phoneRaw.replace(/\+/g, "").replace(/\s/g, "");

  if (pathname === "/private-client-service" || pathname === "/villenservice") {
    return null;
  }

  return (
    <div className="fixed bottom-28 right-5 z-[70] flex items-center gap-3 md:bottom-8 md:right-8">
      {/* Tooltip / Microcopy Card */}
      <AnimatePresence>
        {showTooltip && (
          <m.div
            initial={{ opacity: 0, x: 16, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden max-w-[240px] lg:block"
          >
            <div className="glass-elevated rounded-2xl px-5 py-4">
              <span className="block text-[13px] font-semibold text-slate-900 leading-snug">
                Direkt per WhatsApp anfragen
              </span>
              <span className="block mt-1 text-[11px] text-slate-600 leading-relaxed">
                Unverbindlich und schnell — antworten meistens in unter 30 Minuten.
              </span>
            </div>
            {/* Arrow pointing right */}
            <div className="absolute -right-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-slate-200/50 bg-white" />
          </m.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <m.a
        href={`https://wa.me/${phoneClean}?text=${encodeURIComponent(dic?.contact?.whatsapp_message || "Hallo FLOXANT, ich interessiere mich für ein Angebot.")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onHoverStart={() => { setShowTooltip(true); setHasInteracted(true); }}
        onHoverEnd={() => setShowTooltip(false)}
        className="relative flex h-[60px] w-[60px] items-center justify-center rounded-2xl glass-elevated group cursor-pointer"
        aria-label="WhatsApp Chat starten"
      >
        {/* Living gradient ring */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#25D366]/10 via-transparent to-[#128C7E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle pulse ring on initial appearance */}
        {!hasInteracted && (
          <m.div
            className="absolute inset-0 rounded-2xl border-2 border-[#25D366]/30"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        <MessageCircle 
          size={26}
          className="text-[#25D366] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.4)]" 
        />
      </m.a>
    </div>
  );
}
