"use client";

import Link from "next/link";
import { ClipboardCheck, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
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
    <div className="flox-mobile-action-wrap z-[95] lg:hidden">
      <div className="flox-mobile-action-shell">
        <div className="flox-mobile-action-grid">
        <Link
          href={requestHref}
          className="flox-mobile-action flox-mobile-action-primary"
        >
          <ClipboardCheck />
          Anfragen
        </Link>
        <a
          href={buildDuesseldorfCleaningWhatsAppHref(
            DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flox-mobile-action flox-mobile-action-whatsapp"
        >
          <WhatsAppMark className="flox-whatsapp-mark" />
          WhatsApp
        </a>
        <a
          href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
          className="flox-mobile-action flox-mobile-action-light"
        >
          <Phone />
          Anrufen
        </a>
        </div>
      </div>
    </div>
  );
}
