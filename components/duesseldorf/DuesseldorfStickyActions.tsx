"use client";

import Link from "next/link";
import { BadgeEuro, ClipboardCheck, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

export function DuesseldorfStickyActions() {
  const pathname = usePathname();
  const requestHref = pathname?.includes("bueroreinigung") || pathname?.includes("b2b-reinigung")
    ? "#b2b-reinigung-form"
    : pathname?.includes("treppenhausreinigung") ||
        pathname?.includes("grundreinigung") ||
        pathname?.includes("firmenreinigung") ||
        pathname?.includes("gewerbereinigung") ||
        pathname?.includes("hotelreinigung") ||
        pathname?.includes("kanzleireinigung") ||
        pathname?.includes("praxisreinigung") ||
        pathname?.includes("krankenhausreinigung") ||
        pathname?.includes("kellerreinigung") ||
        pathname?.includes("entsorgung")
      ? "#kontakt"
      : "/duesseldorf/reinigung#kontakt";

  return (
    <div className="flox-mobile-action-wrap flox-duesseldorf-action-wrap z-[95]">
      <div className="flox-mobile-action-shell">
        <div className="flox-mobile-action-grid">
          <Link
            href={requestHref}
            className="flox-mobile-action flox-mobile-action-primary"
            aria-label="Düsseldorfer Anfrage starten"
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
            aria-label="FLOXANT Düsseldorf per WhatsApp anfragen"
          >
            <WhatsAppMark className="flox-whatsapp-mark" />
            WhatsApp
          </a>
          <a
            href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
            className="flox-mobile-action flox-mobile-action-light"
            aria-label="FLOXANT Düsseldorf anrufen"
          >
            <Phone />
            Anrufen
          </a>
          <Link
            href="/duesseldorf/vielleicht-guenstiger"
            className="flox-mobile-action flox-mobile-action-dark"
            aria-label="Düsseldorfer Angebot vielleicht günstiger prüfen"
          >
            <BadgeEuro />
            Günstiger?
          </Link>
        </div>
      </div>
    </div>
  );
}
