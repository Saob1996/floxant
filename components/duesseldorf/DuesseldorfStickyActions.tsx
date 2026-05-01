"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

export function DuesseldorfStickyActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[95] border-t border-slate-800/80 bg-[#09111f]/96 px-3 py-3 pb-7 shadow-[0_-16px_48px_rgba(3,7,18,0.45)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={buildDuesseldorfCleaningWhatsAppHref(
            DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_16px_38px_rgba(16,185,129,0.32)]"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-white"
        >
          <Phone className="h-4 w-4" />
          Anrufen
        </a>
      </div>
    </div>
  );
}

