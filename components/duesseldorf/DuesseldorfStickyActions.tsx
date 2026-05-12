"use client";

import Link from "next/link";
import { ClipboardCheck, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

export function DuesseldorfStickyActions() {
  const pathname = usePathname();
  const requestHref = pathname?.includes("bueroreinigung")
    ? "#b2b-reinigung-form"
    : pathname?.includes("treppenhausreinigung")
      ? "#kontakt"
      : pathname?.includes("grundreinigung")
        ? "#kontakt"
        : "/duesseldorf/reinigung#kontakt";

  return (
    <div className="fixed inset-x-2 bottom-2 z-[95] lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 rounded-[1.35rem] border border-slate-700/70 bg-[#09111f]/96 p-2 shadow-[0_-16px_48px_rgba(3,7,18,0.36)] backdrop-blur">
        <Link
          href={requestHref}
          className="flex min-h-[4.35rem] flex-col items-center justify-center rounded-[1rem] bg-white px-2 py-2.5 text-center text-[11px] font-black text-slate-950"
        >
          <ClipboardCheck className="mb-1 h-4 w-4" />
          Anfrage
        </Link>
        <a
          href={buildDuesseldorfCleaningWhatsAppHref(
            DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[4.35rem] flex-col items-center justify-center rounded-[1rem] bg-emerald-500 px-2 py-2.5 text-center text-[11px] font-black text-slate-950 shadow-[0_16px_38px_rgba(16,185,129,0.24)]"
        >
          <MessageCircle className="mb-1 h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
          className="flex min-h-[4.35rem] flex-col items-center justify-center rounded-[1rem] border border-slate-700 bg-slate-900 px-2 py-2.5 text-center text-[11px] font-black text-white"
        >
          <Phone className="mb-1 h-4 w-4" />
          Anrufen
        </a>
      </div>
    </div>
  );
}
