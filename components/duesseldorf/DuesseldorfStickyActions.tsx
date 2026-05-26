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
  const requestHref = pathname?.includes("bueroreinigung")
    ? "#b2b-reinigung-form"
    : pathname?.includes("b2b-reinigung")
      ? "#kontakt"
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
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anfrage</span>
              <span className="flox-mobile-action-note">Daten senden</span>
            </span>
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
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">WhatsApp</span>
              <span className="flox-mobile-action-note">Fotos senden</span>
            </span>
          </a>
          <a
            href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
            className="flox-mobile-action flox-mobile-action-light"
            aria-label="FLOXANT Düsseldorf anrufen"
          >
            <Phone />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anrufen</span>
              <span className="flox-mobile-action-note">Direkt sprechen</span>
            </span>
          </a>
          <Link
            href="/duesseldorf/vielleicht-guenstiger"
            className="flox-mobile-action flox-mobile-action-dark"
            aria-label="Düsseldorfer Reinigungskosten oder Angebot prüfen lassen"
          >
            <BadgeEuro />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Günstiger?</span>
              <span className="flox-mobile-action-note">Angebot prüfen</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
