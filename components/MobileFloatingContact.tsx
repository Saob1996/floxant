"use client";

import { ClipboardCheck, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";
import { buildGlobalRequestHref } from "@/lib/lead-intents/resolve-request-context";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export default function MobileFloatingContact() {
  const pathname = usePathname() || "/";
  const isPrivatePath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname === "/login";

  if (isPrivatePath) return null;

  const requestHref = buildGlobalRequestHref("global_floating");
  const whatsappHref = buildWhatsAppHref(
    company.phoneRaw,
    "Hallo FLOXANT, ich möchte eine Anfrage stellen.",
  );

  return (
    <div className="flox-mobile-action-wrap flox-universal-action-wrap" aria-label="FLOXANT Schnellkontakt">
      <div className="flox-mobile-action-shell safe-area-bottom">
        <div className="flox-mobile-action-grid">
          <Link
            href={requestHref}
            className="flox-mobile-action flox-mobile-action-primary"
            aria-label="Anfrage an FLOXANT senden"
            data-event="request_cta_click"
            data-source="global_floating"
            data-cta-label="Anfrage"
            data-destination={requestHref}
          >
            <ClipboardCheck aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anfrage</span>
            </span>
          </Link>

          <a
            href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
            className="flox-mobile-action flox-mobile-action-light"
            aria-label="FLOXANT anrufen"
            data-event="phone_click"
            data-source="floating_contact"
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
            aria-label="FLOXANT per WhatsApp schreiben"
            data-event="whatsapp_click"
            data-source="floating_contact"
            data-destination={whatsappHref}
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
