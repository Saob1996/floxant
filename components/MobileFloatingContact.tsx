"use client";

import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import { BadgeEuro, ClipboardCheck, FileSearch, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";
import { resolveCtaConfig } from "@/lib/cta-config";
import { buildWhatsAppHref } from "@/lib/whatsapp";

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
  const requestCta = resolveCtaConfig({
    ctaKey: "mobile-sticky",
    label: "Anfrage",
    service: "sonstiges",
    city,
    intent: "allgemeine-anfrage",
    priority: "p1",
    source: "floating",
  });
  const offerCta = resolveCtaConfig({
    ctaKey: "offer-check",
    label: "Angebot",
    service: "angebot-pruefen",
    city,
    intent: "angebot-pruefen",
    priority: "p0",
    source: "floating",
  });
  const budgetHref = "/anfrage-mit-preisrahmen";
  const whatsappText =
    city === "duesseldorf"
      ? "Hallo FLOXANT, ich möchte eine Anfrage in Düsseldorf stellen."
      : city === "regensburg"
        ? "Hallo FLOXANT, ich möchte eine Anfrage in Regensburg stellen."
        : "Hallo FLOXANT, ich möchte eine Anfrage stellen.";
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, whatsappText);

  return (
    <div className="flox-mobile-action-wrap flox-universal-action-wrap" aria-label="FLOXANT Schnellkontakt">
      <div className="flox-mobile-action-shell safe-area-bottom">
        <div className="flox-mobile-action-grid">
          <Link
            href={requestCta.href}
            className="flox-mobile-action flox-mobile-action-primary"
            aria-label="Anfrage an FLOXANT senden"
            data-event="seo_cta_click"
            data-source="floating_contact"
            data-service={requestCta.dataAttributes.service}
            data-city={requestCta.dataAttributes.city}
            data-page-intent={requestCta.dataAttributes.pageIntent}
            data-priority={requestCta.dataAttributes.priority}
            data-cta-label={requestCta.dataAttributes.ctaLabel}
            data-destination={requestCta.dataAttributes.destination}
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

          <a
            href={`mailto:${company.email}`}
            className="flox-mobile-action flox-mobile-action-email"
            aria-label={`FLOXANT per E-Mail an ${company.email} schreiben`}
            data-event="email_click"
            data-source="floating_contact"
            data-contact-channel="email"
            data-destination={`mailto:${company.email}`}
          >
            <Mail aria-hidden="true" />
            <span className="flox-mobile-action-copy">
              <span className="flox-mobile-action-label">E-Mail</span>
              <span className="flox-mobile-action-note">{company.email}</span>
            </span>
          </a>

          <Link
            href={offerCta.href}
            className="flox-mobile-action flox-mobile-action-offer"
            aria-label="Vorhandenes Angebot prüfen lassen"
            data-event="service_card_click"
            data-source="floating_contact"
            data-service={offerCta.dataAttributes.service}
            data-city={offerCta.dataAttributes.city}
            data-page-intent={offerCta.dataAttributes.pageIntent}
            data-priority={offerCta.dataAttributes.priority}
            data-destination={offerCta.dataAttributes.destination}
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
