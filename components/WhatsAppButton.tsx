"use client";

import { MessageCircle } from "lucide-react";
import { m } from "framer-motion";

export function WhatsAppButton() {
    return (
        <m.a
            href="https://wa.me/4915771105087"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/20 transition-colors hover:bg-[#128C7E]"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageCircle className="h-8 w-8 fill-current" />
            <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded-lg bg-white px-3 py-1 text-sm font-medium text-slate-800 shadow-lg lg:block">
                Chatten Sie mit uns!
            </span>
        </m.a>
    );
}
