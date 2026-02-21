"use client";

import { m } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <m.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="relative w-16 h-16">
                    <m.div
                        className="absolute inset-0 rounded-full border-4 border-primary/30"
                    />
                    <m.div
                        className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <p className="text-sm font-medium text-muted-foreground animate-pulse">Lade...</p>
            </m.div>
        </div>
    );
}
