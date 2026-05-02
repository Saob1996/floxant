"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Calculator, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/company";

export default function MobileFloatingContact({ dic }: { dic?: any }) {
 const [isVisible, setIsVisible] = useState(false);
 const pathname = usePathname();
 const isBookingPage = pathname === "/buchung";
 const CenterIcon = isBookingPage ? ClipboardCheck : Calculator;

 useEffect(() => {
  const handleScroll = () => {
   setIsVisible(window.scrollY > 300);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 if (pathname === "/private-client-service" || pathname === "/villenservice") {
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
     className="fixed inset-x-0 bottom-0 z-[99] lg:hidden"
    >
     <div className="absolute inset-0 -z-10 h-[140%] bg-gradient-to-t from-background via-background/92 to-transparent" />

     <div className="border-t border-border bg-background/95 px-3 py-3 pb-7 shadow-[0_-8px_28px_rgba(0,0,0,0.28)] backdrop-blur safe-area-bottom">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
       <a
        href={`https://wa.me/${company.phoneRaw.replace(/\+/g, "").replace(/\s/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-2 py-3 text-center transition-colors hover:border-green-500/30 hover:bg-green-500/5"
        aria-label="WhatsApp Chat"
       >
        <div className="mb-1 rounded-full bg-green-500/10 p-2.5">
         <MessageCircle size={20} className="text-[#25D366]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
         {dic?.common?.mobile_chat || "Chatten"}
        </span>
       </a>

       <Link
        href={isBookingPage ? "#buchungssystem" : "/rechner"}
        className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary px-2 py-3 text-center shadow-lg transition-colors hover:bg-primary/90"
        aria-label={isBookingPage ? "Zum Anfrageformular" : "Zum Rechner"}
       >
        <div className="mb-1 rounded-full bg-white/[0.15] p-2.5">
         <CenterIcon size={20} className="text-primary-foreground" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
         {isBookingPage ? "Anfrage" : dic?.common?.mobile_calc || "Rechner"}
        </span>
       </Link>

       <a
        href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
        className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-2 py-3 text-center transition-colors hover:border-primary/30 hover:bg-muted/60"
        aria-label="Jetzt anrufen"
       >
        <div className="mb-1 rounded-full bg-primary/10 p-2.5">
         <Phone size={20} className="text-primary" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
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
