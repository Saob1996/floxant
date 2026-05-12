"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Calculator, ClipboardCheck, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { company } from "@/lib/company";

const PAGES_WITH_OWN_MOBILE_CTA = new Set([
 "/diskreter-umzug-trennung-scheidung",
 "/einsatzradar-regensburg",
 "/empfehlen",
 "/immobilie-verkaufsbereit-machen",
 "/keller-muellraum-rettung-regensburg",
 "/makler-vermieter-link",
 "/nachlass-raeumung-regensburg",
 "/plan-b-service",
 "/plattform-auftrag-pruefen",
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
 const usesBookingStart = isBookingPage || isDuesseldorfPage || isDuesseldorfDisposalPage;
 const centerHref = isBookingPage
  ? "#buchungssystem"
  : isDuesseldorfDisposalPage
   ? "/buchung?service=entsorgung&region=duesseldorf&utm_source=mobile_cta#buchungssystem"
   : isDuesseldorfPage
    ? "/buchung?service=reinigung&region=duesseldorf#buchungssystem"
    : "/rechner";
 const centerEvent = usesBookingStart ? "start_booking" : "start_calculator";
 const centerLabel = usesBookingStart ? "Anfrage" : dic?.common?.mobile_calc || "Rechner";
 const CenterIcon = usesBookingStart ? ClipboardCheck : Calculator;
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
     className="fixed inset-x-2 bottom-2 z-[99] lg:hidden"
    >
     <div className="absolute inset-x-[-0.5rem] bottom-[-0.5rem] -z-10 h-[150%] rounded-[1.6rem] bg-gradient-to-t from-background via-background/92 to-transparent" />

     <div className="mx-auto max-w-md rounded-[1.35rem] border border-slate-200 bg-white/96 p-2 shadow-[0_-14px_42px_rgba(15,23,42,0.18)] backdrop-blur safe-area-bottom">
      <div className="grid grid-cols-3 gap-2">
       <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[4.4rem] flex-col items-center justify-center rounded-[1rem] border border-emerald-200 bg-emerald-500 px-2 py-2.5 text-center text-slate-950 shadow-[0_10px_24px_rgba(16,185,129,0.2)] transition-colors hover:bg-emerald-400"
        aria-label="WhatsApp Chat"
        data-event="click_whatsapp"
        data-source="mobile_floating_contact"
       >
        <div className="mb-1 rounded-full bg-white/30 p-1.5">
         <MessageCircle size={18} className="text-slate-950" />
        </div>
        <span className="text-[11px] font-black leading-none">
         {dic?.common?.mobile_chat || "WhatsApp"}
        </span>
       </a>

       <Link
        href={centerHref}
        className="flex min-h-[4.4rem] flex-col items-center justify-center rounded-[1rem] border border-blue-600 bg-blue-600 px-2 py-2.5 text-center text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition-colors hover:bg-blue-700"
        aria-label={usesBookingStart ? "Zum Anfrageformular" : "Zum Rechner"}
        data-event={centerEvent}
        data-source="mobile_floating_contact"
       >
        <div className="mb-1 rounded-full bg-white/18 p-1.5">
         <CenterIcon size={18} className="text-white" />
        </div>
        <span className="text-[11px] font-black leading-none text-white">
         {centerLabel}
        </span>
       </Link>

       <a
        href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
        className="flex min-h-[4.4rem] flex-col items-center justify-center rounded-[1rem] border border-slate-200 bg-slate-50 px-2 py-2.5 text-center text-slate-950 transition-colors hover:border-blue-200 hover:bg-blue-50"
        aria-label="Jetzt anrufen"
        data-event="click_phone"
        data-source="mobile_floating_contact"
       >
        <div className="mb-1 rounded-full bg-blue-100 p-1.5">
         <Phone size={18} className="text-blue-700" />
        </div>
        <span className="text-[11px] font-black leading-none text-slate-950">
         {dic?.common?.mobile_call || "Anrufen"}
        </span>
       </a>
      </div>
     </div>
    </m.div>
   )}
  </AnimatePresence>
 );
}
