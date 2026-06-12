"use client";

import { AnimatePresence, m } from "framer-motion";
import { BadgeEuro, ClipboardCheck, FileSearch, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";

export default function MobileFloatingContact() {
  const pathname = usePathname();
  const normalizedPathname = pathname?.toLowerCase() || "";
  const isBookingPage = pathname === "/buchung";
  const isDuesseldorfContext =
    Boolean(pathname?.startsWith("/duesseldorf")) ||
    pathname === "/gewerbereinigung" ||
    pathname === "/reinigung-moeblierte-wohnung-duesseldorf";
  const isDuesseldorfDisposalPage = pathname === "/entsorgung-duesseldorf";
  const isRegensburgPage = normalizedPathname.includes("regensburg");
  const isPrivatePath =
    Boolean(pathname?.startsWith("/dashboard")) ||
    Boolean(pathname?.startsWith("/admin")) ||
    pathname === "/login";

  const centerHref = isBookingPage
    ? "#buchungssystem"
    : isDuesseldorfDisposalPage
      ? "/buchung?service=entsorgung&region=duesseldorf#buchungssystem"
      : isDuesseldorfContext
        ? "/buchung?service=reinigung&region=duesseldorf#buchungssystem"
        : "/buchung#buchungssystem";

  const offerHref = isDuesseldorfContext
    ? "/duesseldorf/vielleicht-guenstiger"
    : "/angebot-guenstiger-pruefen";
  const budgetHref = isDuesseldorfContext ? "/duesseldorf/reinigung#preisvorschlag" : "/anfrage-mit-preisrahmen";
  const whatsappText = isDuesseldorfDisposalPage
    ? "Hallo FLOXANT, ich möchte Entsorgung in Düsseldorf anfragen."
    : isDuesseldorfContext
      ? "Hallo FLOXANT, ich möchte eine Reinigung in Düsseldorf anfragen."
      : isRegensburgPage
        ? "Hallo FLOXANT, ich möchte eine Anfrage in Regensburg stellen."
        : "Hallo FLOXANT, ich möchte eine Anfrage stellen.";
  const whatsappHref = `https://wa.me/${company.phoneRaw
    .replace(/\+/g, "")
    .replace(/\s/g, "")}?text=${encodeURIComponent(whatsappText)}`;
  const shouldShow = !isPrivatePath;

  if (isPrivatePath) return null;

  return (
    <AnimatePresence>
      {shouldShow && (
        <m.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.08, duration: 0.45 }}
          className="flox-mobile-action-wrap flox-universal-action-wrap"
        >
          {!isRegensburgPage ? (
            <div className="absolute inset-x-[-0.35rem] bottom-[-0.35rem] -z-10 h-[125%] rounded-[1.45rem] bg-gradient-to-t from-background via-background/90 to-transparent" />
          ) : null}

          <div className="flox-mobile-action-shell safe-area-bottom">
            <div className="flox-mobile-action-grid">
              <Link
                href={centerHref}
                className="flox-mobile-action flox-mobile-action-primary"
                aria-label="Anfrage an FLOXANT senden"
                data-event="hero_cta_click"
                data-source="mobile_floating_contact"
                data-contact-channel="booking"
                data-intent="mobile_booking_start"
                data-priority="hot"
              >
                <ClipboardCheck />
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
                data-source="mobile_floating_contact"
                data-contact-channel="whatsapp"
                data-intent="mobile_direct_contact"
                data-priority="hot"
              >
                <WhatsAppMark className="flox-whatsapp-mark" />
                <span className="flox-mobile-action-copy">
                  <span className="flox-mobile-action-label">WhatsApp</span>
                  <span className="flox-mobile-action-note">Fotos senden</span>
                </span>
              </a>

              <a
                href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
                className="flox-mobile-action flox-mobile-action-light"
                aria-label="FLOXANT anrufen"
                data-event="phone_click"
                data-source="mobile_floating_contact"
                data-contact-channel="phone"
                data-intent="mobile_direct_contact"
                data-priority="hot"
              >
                <Phone />
                <span className="flox-mobile-action-copy">
                  <span className="flox-mobile-action-label">Anrufen</span>
                  <span className="flox-mobile-action-note">Kurz klären</span>
                </span>
              </a>

              <Link
                href={offerHref}
                className="flox-mobile-action flox-mobile-action-offer"
                aria-label="Bestehendes Angebot einer anderen Firma prüfen lassen"
                data-event="hero_cta_click"
                data-source="mobile_floating_contact"
                data-contact-channel="offer_check"
                data-intent="mobile_offer_check"
                data-priority="hot"
              >
                <FileSearch />
                <span className="flox-mobile-action-copy">
                  <span className="flox-mobile-action-label">Angebot</span>
                  <span className="flox-mobile-action-note">Prüfen lassen</span>
                </span>
              </Link>

              <Link
                href={budgetHref}
                className="flox-mobile-action flox-mobile-action-dark"
                aria-label="Budget oder Preisrahmen nennen"
                data-event="hero_cta_click"
                data-source="mobile_floating_contact"
                data-contact-channel="budget_check"
                data-intent="mobile_budget_check"
                data-priority="hot"
              >
                <BadgeEuro />
                <span className="flox-mobile-action-copy">
                  <span className="flox-mobile-action-label">Budget</span>
                  <span className="flox-mobile-action-note">Nennen</span>
                </span>
              </Link>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
