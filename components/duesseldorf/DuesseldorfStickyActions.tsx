"use client";

import Link from "next/link";
import { BadgeEuro, ClipboardCheck, FileSearch, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

function getDuesseldorfRequestHref(pathname: string | null) {
  if (pathname?.includes("vielleicht-guenstiger")) return "#guenstiger-form";
  if (pathname?.includes("reinigung-stadtteile-umgebung")) return "#stadtteil-anfrage";
  if (pathname?.includes("bueroreinigung")) return "#b2b-reinigung-form";
  if (pathname?.includes("b2b-reinigung")) return "#kontakt";
  if (
    pathname?.includes("treppenhausreinigung") ||
    pathname?.includes("grundreinigung") ||
    pathname?.includes("firmenreinigung") ||
    pathname?.includes("gewerbereinigung") ||
    pathname?.includes("fensterreinigung") ||
    pathname?.includes("baureinigung") ||
    pathname?.includes("teppichreinigung") ||
    pathname?.includes("unterhaltsreinigung") ||
    pathname?.includes("ladenreinigung") ||
    pathname?.includes("sonderreinigung") ||
    pathname?.includes("hotelreinigung") ||
    pathname?.includes("kanzleireinigung") ||
    pathname?.includes("praxisreinigung") ||
    pathname?.includes("it-raum-reinigung") ||
    pathname?.includes("krankenhausreinigung") ||
    pathname?.includes("kellerreinigung") ||
    pathname?.includes("entsorgung")
  ) {
    return "#kontakt";
  }

  return "/duesseldorf/reinigung#kontakt";
}

export function DuesseldorfStickyActions() {
  const pathname = usePathname();
  const requestHref = getDuesseldorfRequestHref(pathname);

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
              <span className="flox-mobile-action-note">Fall schildern</span>
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
              <span className="flox-mobile-action-note">Kurz klären</span>
            </span>
          </a>
          <Link
            href="/duesseldorf/vielleicht-guenstiger"
            className="flox-mobile-action flox-mobile-action-offer"
            aria-label="Bestehendes Reinigungsangebot einer anderen Firma prüfen lassen"
          >
            <FileSearch />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Angebot</span>
              <span className="flox-mobile-action-note">Prüfen lassen</span>
            </span>
          </Link>
          <Link
            href="/duesseldorf/reinigung#preisvorschlag"
            className="flox-mobile-action flox-mobile-action-dark"
            aria-label="Düsseldorfer Reinigungskosten oder Budget prüfen lassen"
          >
            <BadgeEuro />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Kosten</span>
              <span className="flox-mobile-action-note">Budget prüfen</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
