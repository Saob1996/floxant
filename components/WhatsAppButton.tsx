"use client";

import { MessageCircle } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function WhatsAppButton({ dic }: { dic?: any }) {
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 3000);
        const hideTimer = setTimeout(() => setShowTooltip(false), 10000);
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[70] flex items-center gap-3">
            <AnimatePresence>
                {showTooltip && (
                    <m.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className="relative hidden lg:block max-w-[220px] rounded-xl bg-white px-4 py-2.5 text-sm font-medium leading-snug text-slate-800 shadow-2xl"
                    >
                        <span className="block font-bold text-[#25D366]">
                            {dic?.common?.whatsapp_title || "WhatsApp"}
                        </span>
                        <span className="text-xs text-slate-500">
                            {dic?.common?.whatsapp_subtitle || ""}
                        </span>
                        <div className="absolute -right-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white shadow-sm" />
                    </m.div>
                )}
            </AnimatePresence>

            <m.a
                href="https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20interessiere%20mich%20für%20ein%20Angebot."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onHoverStart={() => setShowTooltip(true)}
                onHoverEnd={() => setShowTooltip(false)}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 transition-colors hover:bg-[#128C7E]"
                aria-label="Chat with us on WhatsApp"
            >
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                <MessageCircle className="relative z-10 h-7 w-7 fill-current" />

                <span className="absolute -top-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg">
                    1
                </span>
            </m.a>
        </div>
    );
}