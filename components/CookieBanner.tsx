"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumButton } from "./ui/PremiumButton";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("cookie_consent", "all");
        setIsVisible(false);
    };

    const handleAcceptNecessary = () => {
        localStorage.setItem("cookie_consent", "necessary");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-2 max-w-2xl">
                            <h3 className="text-lg font-bold">Wir verwenden Cookies</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Unsere Website verwendet Cookies zur Verbesserung der Benutzerfreundlichkeit.
                                Einige sind notwendig, andere helfen uns, das Nutzererlebnis zu optimieren.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={handleAcceptNecessary}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Nur notwendige Cookies
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Einstellungen
                            </button>
                            <PremiumButton onClick={handleAcceptAll} className="whitespace-nowrap">
                                Alle akzeptieren
                            </PremiumButton>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
