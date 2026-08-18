"use client";

import { ClipboardCheck, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

function getRequestHref(pathname: string | null) {
  if (pathname?.includes("angebot-vergleichen")) return "#angebot-pruefen";
  if (pathname?.includes("/duesseldorf/umzug")) return "/buchung?region=duesseldorf&service=umzug#buchungssystem";
  if (pathname?.includes("/duesseldorf/entruempelung")) return "/buchung?region=duesseldorf&service=entruempelung#buchungssystem";
  if (pathname?.includes("/duesseldorf/haushaltsaufloesung")) return "/buchung?region=duesseldorf&service=haushaltsaufloesung#buchungssystem";
  return "/buchung?region=duesseldorf#buchungssystem";
}

export function DuesseldorfStickyActions() {
  const pathname = usePathname();
  const requestHref = getRequestHref(pathname);
  const whatsappHref = buildWhatsAppHref(
    duesseldorfCompany.phoneRaw,
    "Hallo FLOXANT Düsseldorf, ich möchte eine Anfrage stellen.",
  );

  return (
    <div className="flox-mobile-action-wrap flox-duesseldorf-action-wrap z-[95]" aria-label="FLOXANT Düsseldorf Schnellkontakt">
      <div className="flox-mobile-action-shell safe-area-bottom">
        <div className="flox-mobile-action-grid">
          <Link
            href={requestHref}
            className="flox-mobile-action flox-mobile-action-primary"
            aria-label="Düsseldorfer Anfrage starten"
            data-event="hero_cta_click"
            data-contact-channel="form"
          >
            <ClipboardCheck aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anfrage</span>
            </span>
          </Link>

          <a
            href={`tel:${duesseldorfCompany.phoneRaw}`}
            className="flox-mobile-action flox-mobile-action-light"
            aria-label="FLOXANT Düsseldorf anrufen"
            data-event="phone_click"
            data-contact-channel="phone"
          >
            <Phone aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anrufen</span>
            </span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flox-mobile-action flox-mobile-action-whatsapp"
            aria-label="FLOXANT Düsseldorf per WhatsApp anfragen"
            data-event="whatsapp_click"
            data-contact-channel="whatsapp"
          >
            <WhatsAppMark aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">WhatsApp</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
