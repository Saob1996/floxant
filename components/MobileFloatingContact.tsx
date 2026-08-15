"use client";

import Link from "next/link";
import { ClipboardCheck, FileSearch } from "lucide-react";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";
import { buildGlobalRequestHref } from "@/lib/lead-intents/resolve-request-context";

export default function MobileFloatingContact() {
  const pathname = usePathname() || "/";
  const isPrivatePath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname === "/login";

  if (isPrivatePath) return null;

  const city = pathname.includes("duesseldorf")
    ? "duesseldorf"
    : pathname.includes("regensburg")
      ? "regensburg"
      : "deutschland";
  const requestHref = buildGlobalRequestHref("global_floating");
  const offerHref = "/angebot-guenstiger-pruefen";
  const whatsappText = city === "duesseldorf"
    ? "Hallo FLOXANT, ich möchte eine Anfrage in Düsseldorf stellen."
    : city === "regensburg"
      ? "Hallo FLOXANT, ich möchte eine Anfrage in Regensburg stellen."
      : "Hallo FLOXANT, ich möchte eine Anfrage stellen.";
  const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <nav className="flox-mobile-action-wrap flox-universal-action-wrap flox-compact-action-wrap" aria-label="FLOXANT Schnellkontakt">
      <div className="flox-mobile-action-shell safe-area-bottom">
        <div className="flox-mobile-action-grid">
          <Link
            href={requestHref}
            onClick={() => window.dispatchEvent(new CustomEvent("floxant:neutral-request-entry"))}
            className="flox-mobile-action flox-mobile-action-primary"
            aria-label="Angebot bei FLOXANT anfragen"
            data-event="seo_cta_click"
            data-source="global_floating"
            data-page-intent="neutrale-anfrage"
            data-priority="p1"
            data-cta-label="Angebot anfragen"
            data-destination={requestHref}
          >
            <ClipboardCheck aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Angebot anfragen</span>
              <span className="flox-mobile-action-note">Eckdaten senden</span>
            </span>
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flox-mobile-action flox-mobile-action-light"
            aria-label="FLOXANT per WhatsApp schreiben"
            data-event="whatsapp_click"
            data-source="floating_contact"
            data-destination={whatsappHref}
          >
            <WhatsAppMark aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">WhatsApp</span>
              <span className="flox-mobile-action-note">Fotos senden</span>
            </span>
          </a>

          <Link
            href={offerHref}
            className="flox-mobile-action flox-mobile-action-offer"
            aria-label="Vorhandenes Angebot prüfen lassen"
            data-event="service_card_click"
            data-source="floating_contact"
            data-service="angebot-pruefen"
            data-page-intent="angebot-pruefen"
            data-destination={offerHref}
          >
            <FileSearch aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Angebot prüfen</span>
              <span className="flox-mobile-action-note">Vorhandenes Angebot</span>
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
