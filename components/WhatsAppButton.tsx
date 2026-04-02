"use client";

import { MessageCircle } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function WhatsAppButton({ dic }: { dic?: any }) {
    const [showTooltip, setShowTooltip] = useState(false);

    // Show tooltip automatically after 3s to grab attention
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 3000);
        const hideTimer = setTimeout(() => setShowTooltip(false), 10000);
        return () => { clearTimeout(timer); clearTimeout(hideTimer); };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            {/* Tooltip bubble */}
            <AnimatePresence>
                {showTooltip && (
                    <m.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className="hidden lg:block bg-white text-slate-800 px-4 py-2.5 rounded-xl shadow-2xl text-sm font-medium max-w-[220px] leading-snug"
                    >
                        <span className="block font-bold text-[#25D366]">💬 {dic?.common?.whatsapp_title || "Sofort Antwort!"}</span>
                        <span className="text-xs text-slate-500">{dic?.common?.whatsapp_subtitle || "Schreiben Sie uns jetzt auf WhatsApp für ein kostenloses Angebot."}</span>
                        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
                    </m.div>
                )}
            </AnimatePresence>

            {/* Button */}
            <m.a
                href="https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20interessiere%20mich%20für%20ein%20Angebot."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setShowTooltip(true)}
                onHoverEnd={() => setShowTooltip(false)}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 transition-colors hover:bg-[#128C7E]"
                aria-label="Chat with us on WhatsApp"
            >
                {/* Pulse ring animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                <MessageCircle className="h-8 w-8 fill-current relative z-10" />
                
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white z-20 shadow-lg">
                    1
                </span>
            </m.a>
        </div>
    );
}
