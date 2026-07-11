"use client";

import Link from "next/link";
import { BadgeEuro, ClipboardCheck, FileSearch, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";

export default function MobileFloatingContact() {
  const pathname = usePathname() || "/";
  const isPrivatePath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname === "/login";

  if (isPrivatePath) return null;

  const city = pathname.includes("duesseldorf") ? "duesseldorf" : "regensburg";
  const requestHref = `/kontakt?service=sonstiges&city=${city}&intent=allgemeine-anfrage&source=floating`;
  const offerHref = `/kontakt?service=angebot-pruefen&city=${city}&intent=angebot-pruefen&source=floating`;
  const budgetHref = "/anfrage-mit-preisrahmen";
  const whatsappText = `Hallo FLOXANT, ich möchte eine Anfrage in ${city === "duesseldorf" ? "Düsseldorf" : "Regensburg"} stellen.`;
  const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="flox-mobile-action-wrap flox-universal-action-wrap" aria-label="FLOXANT Schnellkontakt">
      <div className="flox-mobile-action-shell safe-area-bottom">
        <div className="flox-mobile-action-grid">
          <Link
            href={requestHref}
            className="flox-mobile-action flox-mobile-action-primary"
            aria-label="Anfrage an FLOXANT senden"
            data-event="seo_cta_click"
            data-source="floating_contact"
            data-service="sonstiges"
            data-city={city}
            data-page-intent="allgemeine-anfrage"
            data-priority="p1"
            data-cta-label="Anfrage"
            data-destination={requestHref}
          >
            <ClipboardCheck aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anfrage</span>
              <span className="flox-mobile-action-note">Fall schildern</span>
            </span>
          </Link>

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
              <span className="flox-mobile-action-note">Fotos senden</span>
            </span>
          </a>

          <a
            href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
            className="flox-mobile-action flox-mobile-action-light"
            aria-label="FLOXANT anrufen"
            data-event="seo_phone_click"
            data-source="floating_contact"
          >
            <Phone aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Anrufen</span>
              <span className="flox-mobile-action-note">Kurz klären</span>
            </span>
          </a>

          <Link
            href={offerHref}
            className="flox-mobile-action flox-mobile-action-offer"
            aria-label="Vorhandenes Angebot prüfen lassen"
            data-event="service_card_click"
            data-source="floating_contact"
            data-service="angebot-pruefen"
            data-city={city}
            data-page-intent="angebot-pruefen"
            data-destination={offerHref}
          >
            <FileSearch aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Angebot</span>
              <span className="flox-mobile-action-note">Prüfen lassen</span>
            </span>
          </Link>

          <Link
            href={budgetHref}
            className="flox-mobile-action flox-mobile-action-dark"
            aria-label="Budget oder Preisrahmen nennen"
            data-event="service_card_click"
            data-source="floating_contact"
            data-page-intent="preisrahmen"
            data-destination={budgetHref}
          >
            <BadgeEuro aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">Budget</span>
              <span className="flox-mobile-action-note">Nennen</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
