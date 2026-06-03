"use client";

import Link from "next/link";
import { ClipboardCheck, FileSearch, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

function getRequestHref(pathname: string | null) {
  if (pathname?.includes("angebot-vergleichen")) return "#angebot-pruefen";
  if (pathname?.includes("bueroreinigung")) return "#b2b-reinigung-form";
  if (pathname?.includes("gewerbereinigung") || pathname?.includes("luxusreinigung")) return "#kontakt";
  return "/duesseldorf/gewerbereinigung#kontakt";
}

export function DuesseldorfStickyActions() {
  const pathname = usePathname();
  const requestHref = getRequestHref(pathname);
  const whatsappHref = buildWhatsAppHref(
    duesseldorfCompany.phoneRaw,
    [
      "Hallo FLOXANT Reinigung Düsseldorf,",
      "ich möchte eine Reinigungsanfrage stellen.",
      "Objektart, Ort, Fläche, Turnus und Fotos kann ich senden.",
    ].join("\n"),
  );

  return (
    <div className="flox-mobile-action-wrap flox-duesseldorf-action-wrap z-[95]">
      <div className="flox-mobile-action-shell">
        <div className="flox-mobile-action-grid">
          <Link
            href={requestHref}
            className="flox-mobile-action flox-mobile-action-primary"
            aria-label="Düsseldorfer Anfrage starten"
            data-event="hero_cta_click"
            data-contact-channel="form"
          >
            <ClipboardCheck />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anfrage</span>
              <span className="flox-mobile-action-note">Fall senden</span>
            </span>
          </Link>
          <a
            href={whatsappHref}
            className="flox-mobile-action flox-mobile-action-whatsapp"
            aria-label="FLOXANT Düsseldorf per WhatsApp anfragen"
            data-event="whatsapp_click"
            data-contact-channel="whatsapp"
          >
            <WhatsAppMark className="flox-whatsapp-mark" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">WhatsApp</span>
              <span className="flox-mobile-action-note">Fotos senden</span>
            </span>
          </a>
          <a
            href={`tel:${duesseldorfCompany.phoneRaw}`}
            className="flox-mobile-action flox-mobile-action-light"
            aria-label="FLOXANT Düsseldorf anrufen"
            data-event="phone_click"
            data-contact-channel="phone"
          >
            <Phone />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anrufen</span>
              <span className="flox-mobile-action-note">Kurz klären</span>
            </span>
          </a>
          <Link
            href="/angebot-vergleichen-duesseldorf"
            className="flox-mobile-action flox-mobile-action-offer"
            aria-label="Bestehendes Reinigungsangebot prüfen lassen"
            data-event="hero_cta_click"
            data-contact-channel="offer_check"
          >
            <FileSearch />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Angebot</span>
              <span className="flox-mobile-action-note">Prüfen</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

