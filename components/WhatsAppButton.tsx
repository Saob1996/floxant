"use client";

import { MessageCircle } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function WhatsAppButton({ dic }: { dic?: any }) {
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 3500);
        const hideTimer = setTimeout(() => setShowTooltip(false), 9000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div className="fixed bottom-24 right-4 z-[70] flex items-center gap-3 md:bottom-6 md:right-6">
            <AnimatePresence>
                {showTooltip && (
                    <m.div
                        initial={{ opacity: 0, x: 14, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 14, scale: 0.96 }}
                        className="relative hidden max-w-[220px] rounded-xl border border-border bg-popover px-4 py-2.5 text-sm leading-snug text-foreground shadow-xl lg:block"
                    >
                        <span className="block font-semibold text-foreground">
                            {dic?.common?.whatsapp_title || "WhatsApp"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {dic?.common?.whatsapp_subtitle || "Direkt und unkompliziert schreiben"}
                        </span>
                        <div className="absolute -right-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-border bg-popover" />
                    </m.div>
                )}
            </AnimatePresence>

            <m.a
                href="https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20Angebot."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onHoverStart={() => setShowTooltip(true)}
                onHoverEnd={() => setShowTooltip(false)}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition-colors hover:bg-[#1fb85a]"
                aria-label="Chat with us on WhatsApp"
            >
                <MessageCircle className="h-6 w-6 fill-current" />
            </m.a>
        </div>
    );
}