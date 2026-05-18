"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ClipboardCheck, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";

const PAGES_WITH_OWN_MOBILE_CTA = new Set([
 "/angebot-guenstiger-pruefen",
 "/anfrage-mit-preisrahmen",
 "/buchung",
 "/diskreter-umzug-trennung-scheidung",
 "/einsatzradar-regensburg",
 "/empfehlen",
 "/express-anfrage",
 "/immobilie-verkaufsbereit-machen",
 "/keller-muellraum-rettung-regensburg",
 "/makler-vermieter-link",
 "/nachlass-raeumung-regensburg",
 "/plan-b-service",
 "/plattform-auftrag-pruefen",
 "/rechner",
 "/reinigung-moeblierte-wohnung-duesseldorf",
 "/rueckfahrt-boerse",
 "/schadensbegrenzung",
 "/uebergabeakte",
 "/wohnung-wieder-vermietbar",
]);

export default function MobileFloatingContact({ dic }: { dic?: any }) {
 const [isVisible, setIsVisible] = useState(false);
 const pathname = usePathname();
 const isBookingPage = pathname === "/buchung";
 const isDuesseldorfPage = Boolean(pathname?.startsWith("/duesseldorf"));
 const isDuesseldorfDisposalPage = pathname === "/entsorgung-duesseldorf";
 const centerHref = isBookingPage
  ? "#buchungssystem"
  : isDuesseldorfDisposalPage
   ? "/buchung?service=entsorgung&region=duesseldorf&utm_source=mobile_cta#buchungssystem"
   : isDuesseldorfPage
    ? "/buchung?service=reinigung&region=duesseldorf#buchungssystem"
    : "/buchung?utm_source=mobile_cta&urgency=24h&contact=callback#buchungssystem";
 const centerEvent = "start_booking";
 const centerLabel = "Anfrage";
 const CenterIcon = ClipboardCheck;
 const whatsappText = isDuesseldorfDisposalPage
  ? "Hallo FLOXANT, ich m\u00f6chte Entsorgung in D\u00fcsseldorf anfragen."
  : isDuesseldorfPage
   ? "Hallo FLOXANT, ich m\u00f6chte eine Reinigung in D\u00fcsseldorf anfragen."
   : "Hallo FLOXANT, ich m\u00f6chte eine Anfrage stellen.";
 const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(whatsappText)}`;

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
   {isVisible && (
    <m.div
     initial={{ y: 80, opacity: 0 }}
     animate={{ y: 0, opacity: 1 }}
     exit={{ y: 80, opacity: 0 }}
     transition={{ type: "spring", bounce: 0.08, duration: 0.45 }}
     className="flox-mobile-action-wrap lg:hidden"
    >
     <div className="absolute inset-x-[-0.35rem] bottom-[-0.35rem] -z-10 h-[125%] rounded-[1.45rem] bg-gradient-to-t from-background via-background/90 to-transparent" />

     <div className="flox-mobile-action-shell safe-area-bottom">
      <div className="flox-mobile-action-grid">
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
      </div>
     </div>
    </m.div>
   )}
  </AnimatePresence>
 );
}
