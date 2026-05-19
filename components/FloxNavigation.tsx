"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  FileSearch,
  Menu,
  MessageCircle,
  PackageOpen,
  Sparkles,
  Truck,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FloxBrandUI as BrandLogo } from "@/components/FloxBrandUI";
import { openRequestCenter } from "@/components/GlobalRequestCenter";
import {
  headerInquiryIntents,
  inquiryConfigs,
  OFFER_CHECK_ROUTE,
  type InquiryIntent,
} from "@/components/inquiry/inquiry-config";
import { cn } from "@/lib/utils";

export type PublicHeaderVariant = "default" | "duesseldorf";

const intentIcons: Record<InquiryIntent, typeof Truck> = {
  move: Truck,
  cleaning: Sparkles,
  clearance: PackageOpen,
  express: Zap,
  "offer-check": FileSearch,
};

const desktopLinks = [
  { label: "Wissen", href: "/blog" },
  { label: "Servicegebiet", href: "/service-area-bayern" },
  { label: "Kontakt", href: "/kontakt" },
];

function openIntent(intent: InquiryIntent, variant: PublicHeaderVariant) {
  openRequestCenter({
    intent,
    region: variant === "duesseldorf" ? "duesseldorf" : "regensburg-bayern",
    service:
      intent === "move"
        ? "umzug"
        : intent === "cleaning"
          ? "reinigung"
          : intent === "clearance"
            ? "entsorgung"
            : undefined,
  });
}

export function PublicHeader({
  variant = "default",
}: {
  dic?: any;
  variant?: PublicHeaderVariant;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDuesseldorf = variant === "duesseldorf";

  const inquiryButtons = useMemo(
    () =>
      headerInquiryIntents.map((intent) => ({
        intent,
        config: inquiryConfigs[intent],
        Icon: intentIcons[intent],
      })),
    [],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  if (pathname === "/private-client-service" || pathname === "/villenservice") {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[9000] px-3 pt-3 text-slate-950 sm:px-5">
      <div
        className={cn(
          "mx-auto max-w-[1380px] rounded-[1.45rem] border border-white/70 bg-white/[0.88] px-3 py-3 shadow-[0_20px_70px_rgba(15,23,42,0.16)] backdrop-blur-2xl transition duration-300 sm:px-4",
          scrolled && "border-slate-200/80 bg-white/[0.94] shadow-[0_18px_52px_rgba(15,23,42,0.2)]",
        )}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 xl:grid-cols-[minmax(260px,0.9fr)_auto_minmax(250px,0.8fr)]">
          <Link
            href={isDuesseldorf ? "/duesseldorf/reinigung" : "/"}
            className="group flex min-w-0 items-center gap-3 rounded-2xl px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isDuesseldorf ? "FLOXANT Düsseldorf Reinigung" : "FLOXANT Startseite"}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[1rem] bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)]">
              <BrandLogo size={28} />
            </span>
            <span className="min-w-0 max-[430px]:hidden">
              <span className="block text-sm font-black tracking-[0.18em]" translate="no">
                FLOXANT
              </span>
              <span className="mt-1 hidden max-w-[23rem] truncate text-[12px] font-semibold text-slate-600 sm:block">
                Umzug, Reinigung und Entrümpelung – direkt richtig anfragen.
              </span>
              <span className="mt-1 block truncate text-[11px] font-bold text-slate-600 sm:hidden">
                Schnell zur Anfrage
              </span>
            </span>
          </Link>

          <nav
            aria-label="Anfrageoptionen"
            className="hidden items-center rounded-2xl border border-slate-200 bg-slate-50/88 p-1 shadow-inner lg:flex"
          >
            {inquiryButtons.map(({ intent, config, Icon }) => (
              <button
                key={intent}
                type="button"
                onClick={() => openIntent(intent, variant)}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-3 text-[12px] font-black text-slate-700 transition hover:bg-white hover:text-slate-950 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  intent === "express" && "text-blue-700",
                )}
              >
                <Icon className="h-4 w-4" />
                {config.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-2 xl:flex">
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-10 items-center rounded-xl px-3 text-[12px] font-black text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={OFFER_CHECK_ROUTE}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-700 bg-blue-700 px-4 text-[12px] font-black text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Angebot prüfen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 lg:hidden">
            <Link
              href={OFFER_CHECK_ROUTE}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 text-[12px] font-black text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Angebot prüfen
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(15,23,42,0.24)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={menuOpen ? "Menü schließen" : "Anfragemenü öffnen"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              Anfrage
            </button>
          </div>
        </div>

        <div className="mt-3 hidden items-center justify-between gap-3 border-t border-slate-200/80 pt-3 text-[12px] font-semibold text-slate-600 md:flex lg:hidden">
          <span className="font-black text-slate-950">Schnell zur passenden Anfrage.</span>
          <span className="truncate">
            Wählen Sie direkt, worum es geht. FLOXANT öffnet nur die passende Anfrage – ohne langes Formular.
          </span>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-[9001] bg-slate-950/34 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <m.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-3 mt-[5.4rem] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.65rem] border border-white/70 bg-white p-3 text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.28)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 rounded-[1.35rem] bg-slate-950 p-4 text-white">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100">
                    Anfrage wählen
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                    Ein Klick, ein passendes Fenster. Keine Formularwand.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  aria-label="Menü schließen"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3 grid gap-2">
                {inquiryButtons.map(({ intent, config, Icon }) => (
                  <button
                    key={intent}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      openIntent(intent, variant);
                    }}
                    className="flex min-h-16 items-center justify-between gap-3 rounded-[1.25rem] border border-slate-200 bg-white px-4 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white",
                          intent === "express" ? "bg-blue-700" : "bg-slate-950",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-black text-slate-950">{config.primaryCta}</span>
                        <span className="mt-0.5 block truncate text-xs font-semibold text-slate-500">
                          {intent === "cleaning" ? "Regensburg/Bayern oder Düsseldorf" : config.regionScope}
                        </span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                ))}

                <Link
                  href={OFFER_CHECK_ROUTE}
                  className="flex min-h-16 items-center justify-between gap-3 rounded-[1.25rem] border border-blue-200 bg-blue-50 px-4 text-left shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-blue-700 shadow-sm">
                      <FileSearch className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-black text-slate-950">Angebot prüfen lassen</span>
                      <span className="mt-0.5 block text-xs font-semibold text-slate-600">
                        Preis, Umfang und Leistungen prüfen
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-blue-700" />
                </Link>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {desktopLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-black text-slate-700"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="tel:+4915771105087"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-3 text-sm font-black text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Anrufen
                </a>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function FloxNavigation({ dic }: { dic: any }) {
  return <PublicHeader dic={dic} />;
}

export default FloxNavigation;
