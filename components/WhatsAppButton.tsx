"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/lib/company";
import { PAGES_WITH_OWN_MOBILE_CTA } from "@/lib/floating-contact-pages";
import { buildWhatsAppHref, getWhatsAppContext } from "@/lib/whatsapp";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";

const WHATSAPP_TOOLTIP_SEEN_KEY = "floxant_whatsapp_tooltip_seen_v1";

export function WhatsAppButton(_props: { dic?: any }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [serviceParam, setServiceParam] = useState<string | null>(null);
  const pathname = usePathname();
  const isRegensburgPage = Boolean(pathname?.toLowerCase().includes("regensburg"));
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setServiceParam(params.get("service"));
  }, [pathname]);

  const whatsappContext = getWhatsAppContext(pathname, serviceParam);
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, whatsappContext.message);

  if (
    pathname === "/buchung" ||
    pathname === "/private-client-service" ||
    pathname === "/villenservice" ||
    (isRegensburgPage && !PAGES_WITH_OWN_MOBILE_CTA.has(pathname || ""))
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-5 z-[70] hidden items-end gap-3 lg:flex md:bottom-8 md:right-8">
      <AnimatePresence>
        {showTooltip && (
          <m.div
            initial={{ opacity: 0, x: 16, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden max-w-[270px] lg:block"
          >
            <div className="flox-whatsapp-tooltip overflow-hidden rounded-[1rem] px-5 py-4 shadow-[0_28px_70px_rgba(7,94,84,0.34)]">
              <span className="flox-whatsapp-tooltip__pill inline-flex items-center gap-2 rounded-[0.55rem] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em]">
                <WhatsAppMark className="h-4 w-4 shrink-0" />
                WhatsApp Direktkanal
              </span>
              <span className="flox-whatsapp-tooltip__title mt-3 flex items-center gap-2 text-[13px] font-black leading-snug">
                <span className="flox-whatsapp-tooltip__mark flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.65rem]">
                  <WhatsAppMark className="h-6 w-6" />
                </span>
                <span>{whatsappContext.title}</span>
              </span>
              <span className="flox-whatsapp-tooltip__text mt-1 block text-[11px] leading-relaxed">
                {whatsappContext.teaser}
              </span>
              <span className="flox-whatsapp-tooltip__pill mt-3 inline-flex rounded-[0.55rem] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em]">
                Nachricht vorbereitet
              </span>
            </div>
            <div className="flox-whatsapp-tooltip__arrow absolute -right-[6px] bottom-6 h-3 w-3 rotate-45" />
          </m.div>
        )}
      </AnimatePresence>

      <m.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        onHoverStart={() => {
          setShowTooltip(true);
          if (typeof window !== "undefined") localStorage.setItem(WHATSAPP_TOOLTIP_SEEN_KEY, "1");
        }}
        onHoverEnd={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="flox-whatsapp-cta group relative flex min-h-[70px] w-[302px] items-center gap-3 overflow-hidden rounded-[1.1rem] px-3.5 py-3 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 ease-[var(--flox-ease-standard)]"
        aria-label={whatsappContext.buttonLabel}
      >
        <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-80" />
        <span className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(236,253,245,0.22))]" />

        <span className="flox-whatsapp-cta__icon relative z-10 flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-200">
          <span className="flox-whatsapp-cta__mark" aria-hidden="true" />
          <WhatsAppMark className="sr-only" />
        </span>

        <span className="relative z-10 min-w-0 flex-1">
          <span className="flox-whatsapp-cta__eyebrow flex items-center gap-2 text-[10px] font-black uppercase leading-none tracking-[0.14em]">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.16)]" />
            Sofortkontakt
          </span>
          <span className="flox-whatsapp-cta__title mt-1.5 block whitespace-nowrap text-[16px] font-black leading-[1.05]">
            WhatsApp schreiben
          </span>
          <span className="flox-whatsapp-cta__subline mt-1 block text-[11px] font-bold leading-snug">
            Fotos, Ort oder Termin senden
          </span>
        </span>

        <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.7rem] border border-white/25 bg-white/12 text-white transition group-hover:translate-x-0.5 group-hover:bg-white/18">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </m.a>
    </div>
  );
}
