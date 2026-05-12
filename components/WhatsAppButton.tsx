"use client";

import { MessageCircle } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/lib/company";
import { buildWhatsAppHref, getWhatsAppContext } from "@/lib/whatsapp";

export function WhatsAppButton(_props: { dic?: any }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [serviceParam, setServiceParam] = useState<string | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3500);
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      setHasInteracted(true);
    }, 9500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setServiceParam(params.get("service"));
  }, [pathname]);

  const whatsappContext = getWhatsAppContext(pathname, serviceParam);
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, whatsappContext.message);

  if (pathname === "/private-client-service" || pathname === "/villenservice") {
    return null;
  }

  return (
    <div className="fixed bottom-28 right-5 z-[70] hidden items-center gap-3 lg:flex md:bottom-8 md:right-8">
      <AnimatePresence>
        {showTooltip && (
          <m.div
            initial={{ opacity: 0, x: 16, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden max-w-[280px] lg:block"
          >
            <div className="overflow-hidden rounded-[1.8rem] border border-emerald-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.98))] px-5 py-4 shadow-[0_28px_70px_rgba(6,95,70,0.16)] backdrop-blur-xl">
              <span className="inline-flex rounded-full border border-emerald-200 bg-white/86 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                WhatsApp Direktkanal
              </span>
              <span className="mt-3 block text-[13px] font-semibold leading-snug text-slate-900">
                {whatsappContext.title}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-slate-600">
                {whatsappContext.teaser}
              </span>
              <span className="mt-3 inline-flex rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
                Nachricht vorbereitet
              </span>
            </div>
            <div className="absolute -right-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-emerald-200/60 bg-white" />
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
          setHasInteracted(true);
        }}
        onHoverEnd={() => setShowTooltip(false)}
        className="group relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-[1.55rem] border border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.98))] shadow-[0_20px_56px_rgba(6,95,70,0.18)] backdrop-blur-xl md:h-[72px] md:w-auto md:min-w-[262px] md:justify-start md:gap-3 md:px-4"
        aria-label={whatsappContext.buttonLabel}
      >
        <div className="absolute inset-0 rounded-[1.55rem] bg-gradient-to-br from-[#25D366]/12 via-transparent to-[#128C7E]/16 opacity-100" />
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-80" />
        <div className="absolute inset-y-0 right-0 hidden w-20 bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.14),transparent_70%)] md:block" />

        {!hasInteracted && !prefersReducedMotion ? (
          <m.div
            className="absolute inset-0 rounded-[1.55rem] border-2 border-[#25D366]/30"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : null}

        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)] text-white shadow-[0_16px_34px_rgba(37,211,102,0.3)] md:h-12 md:w-12">
          <MessageCircle size={22} className="transition-all duration-300 group-hover:scale-110" />
        </div>

        <div className="relative z-10 hidden min-w-0 md:block">
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">
            WhatsApp
          </div>
          <div className="mt-1 text-[15px] font-semibold leading-tight text-slate-900">
            {whatsappContext.buttonLabel}
          </div>
          <div className="mt-1 text-[11px] leading-relaxed text-slate-600">
            Mit vorbereitetem Service- und Seitenkontext
          </div>
        </div>
      </m.a>
    </div>
  );
}
