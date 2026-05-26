"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { BadgeEuro, ClipboardCheck, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";
import { PAGES_WITH_OWN_MOBILE_CTA } from "@/lib/floating-contact-pages";

export default function MobileFloatingContact({ dic }: { dic?: any }) {
 const [isVisible, setIsVisible] = useState(false);
 const pathname = usePathname();
 const normalizedPathname = pathname?.toLowerCase() || "";
 const isBookingPage = pathname === "/buchung";
 const isDuesseldorfPage = Boolean(pathname?.startsWith("/duesseldorf"));
 const isDuesseldorfDisposalPage = pathname === "/entsorgung-duesseldorf";
 const isRegensburgPage = normalizedPathname.includes("regensburg");
 const centerHref = isBookingPage
  ? "#buchungssystem"
  : isDuesseldorfDisposalPage
   ? "/buchung?service=entsorgung&region=duesseldorf#buchungssystem"
   : isDuesseldorfPage
    ? "/buchung?service=reinigung&region=duesseldorf#buchungssystem"
    : "/buchung#buchungssystem";
 const centerEvent = "start_booking";
 const centerLabel = "Anfrage";
 const CenterIcon = ClipboardCheck;
 const offerHref = isDuesseldorfPage ? "/duesseldorf/vielleicht-guenstiger" : "/angebot-guenstiger-pruefen";
 const whatsappText = isDuesseldorfDisposalPage
  ? "Hallo FLOXANT, ich m\u00f6chte Entsorgung in D\u00fcsseldorf anfragen."
  : isDuesseldorfPage
   ? "Hallo FLOXANT, ich m\u00f6chte eine Reinigung in D\u00fcsseldorf anfragen."
   : isRegensburgPage
    ? "Hallo FLOXANT, ich m\u00f6chte eine Anfrage in Regensburg stellen."
    : "Hallo FLOXANT, ich m\u00f6chte eine Anfrage stellen.";
 const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(whatsappText)}`;
 const shouldShow = isRegensburgPage || isVisible;

 useEffect(() => {
  const handleScroll = () => {
   setIsVisible(window.scrollY > 120);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 if (
  pathname === "/private-client-service" ||
  pathname === "/villenservice" ||
  PAGES_WITH_OWN_MOBILE_CTA.has(pathname || "")
 ) {
  return null;
 }

 return (
  <AnimatePresence>
   {shouldShow && (
    <m.div
     initial={{ y: 80, opacity: 0 }}
     animate={{ y: 0, opacity: 1 }}
     exit={{ y: 80, opacity: 0 }}
     transition={{ type: "spring", bounce: 0.08, duration: 0.45 }}
     className={isRegensburgPage ? "flox-mobile-action-wrap flox-regensburg-action-wrap" : "flox-mobile-action-wrap lg:hidden"}
    >
     {!isRegensburgPage ? (
      <div className="absolute inset-x-[-0.35rem] bottom-[-0.35rem] -z-10 h-[125%] rounded-[1.45rem] bg-gradient-to-t from-background via-background/90 to-transparent" />
     ) : null}

     <div className="flox-mobile-action-shell safe-area-bottom">
      <div className="flox-mobile-action-grid">
       {isRegensburgPage ? (
        <>
         <Link
          href={centerHref}
          className="flox-mobile-action flox-mobile-action-primary"
          aria-label="Zum Anfrageformular"
          data-event={centerEvent}
          data-source="mobile_floating_contact"
          data-contact-channel="booking"
          data-intent="mobile_booking_start"
          data-priority="hot"
         >
          <CenterIcon />
          <span className="flox-mobile-action-copy">
           <span className="flox-mobile-action-label">Anfrage</span>
           <span className="flox-mobile-action-note">Daten senden</span>
          </span>
         </Link>

         <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flox-mobile-action flox-mobile-action-whatsapp"
          aria-label="WhatsApp Chat"
          data-event="click_whatsapp"
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
          aria-label="Jetzt anrufen"
          data-event="click_phone"
          data-source="mobile_floating_contact"
          data-contact-channel="phone"
          data-intent="mobile_direct_contact"
          data-priority="hot"
         >
          <Phone />
          <span className="flox-mobile-action-copy">
           <span className="flox-mobile-action-label">Anrufen</span>
           <span className="flox-mobile-action-note">Direkt sprechen</span>
          </span>
         </a>

         <Link
          href={offerHref}
          className="flox-mobile-action flox-mobile-action-dark"
          aria-label="Angebot prüfen lassen"
          data-event="click_offer_check"
          data-source="mobile_floating_contact"
          data-contact-channel="offer_check"
          data-intent="mobile_offer_check"
          data-priority="hot"
         >
          <BadgeEuro />
          <span className="flox-mobile-action-copy">
           <span className="flox-mobile-action-label">Günstiger?</span>
           <span className="flox-mobile-action-note">Angebot prüfen</span>
          </span>
         </Link>
        </>
       ) : (
        <>
         <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flox-mobile-action flox-mobile-action-whatsapp"
          aria-label="WhatsApp Chat"
          data-event="click_whatsapp"
          data-source="mobile_floating_contact"
          data-contact-channel="whatsapp"
          data-intent="mobile_direct_contact"
          data-priority="hot"
         >
          <WhatsAppMark className="flox-whatsapp-mark" />
          {dic?.common?.mobile_chat || "WhatsApp"}
         </a>

         <Link
          href={centerHref}
          className="flox-mobile-action flox-mobile-action-primary"
          aria-label="Zum Anfrageformular"
          data-event={centerEvent}
          data-source="mobile_floating_contact"
          data-contact-channel="booking"
          data-intent="mobile_booking_start"
          data-priority="hot"
         >
          <CenterIcon />
          {centerLabel}
         </Link>

         <a
          href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
          className="flox-mobile-action flox-mobile-action-light"
          aria-label="Jetzt anrufen"
          data-event="click_phone"
          data-source="mobile_floating_contact"
          data-contact-channel="phone"
          data-intent="mobile_direct_contact"
          data-priority="hot"
         >
          <Phone />
          {dic?.common?.mobile_call || "Anrufen"}
         </a>
        </>
       )}
      </div>
     </div>
    </m.div>
   )}
  </AnimatePresence>
 );
}
