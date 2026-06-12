"use client";

import Link from "next/link";
import { ArrowRight, BadgeEuro, FileSearch, Menu, MessageCircle, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { FloxBrandUI as BrandLogo } from "@/components/FloxBrandUI";
import { FloxServicesMegaMenu } from "@/components/FloxServicesMegaMenu";
import { company } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { FloxantRegion } from "@/lib/floxant-services";

export type PublicHeaderVariant = "default" | "duesseldorf";

const navLinks = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Düsseldorf", href: "/duesseldorf" },
  { label: "Regensburg", href: "/regensburg" },
  { label: "Kontakt", href: "/kontakt" },
];

function inferRegion(pathname: string, variant: PublicHeaderVariant): FloxantRegion {
  if (variant === "duesseldorf" || pathname.includes("duesseldorf")) return "duesseldorf";
  if (pathname.startsWith("/regensburg") || pathname.includes("regensburg")) return "regensburg";
  return "duesseldorf";
}

export function PublicHeader({
  variant = "default",
}: {
  dic?: any;
  variant?: PublicHeaderVariant;
}) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeRegion = useMemo(
    () => inferRegion(pathname || "/", variant),
    [pathname, variant],
  );
  const isDuesseldorfContext = variant === "duesseldorf" || pathname.includes("duesseldorf");
  const isRegensburgContext = pathname.startsWith("/regensburg") || pathname.includes("regensburg");
  const contextualNavLinks = useMemo(() => {
    if (isDuesseldorfContext && !isRegensburgContext) {
      return navLinks.filter((item) => item.href !== "/regensburg");
    }

    if (isRegensburgContext && !isDuesseldorfContext) {
      return navLinks.filter((item) => item.href !== "/duesseldorf");
    }

    return navLinks;
  }, [isDuesseldorfContext, isRegensburgContext]);
  const headerCta = isRegensburgContext && !isDuesseldorfContext
    ? { href: "/kontakt", label: "Anfrage senden" }
    : { href: "/angebot-vergleichen-duesseldorf", label: "Angebot prüfen" };
  const budgetHref =
    isDuesseldorfContext && !isRegensburgContext
      ? "/duesseldorf/reinigung#preisvorschlag"
      : "/anfrage-mit-preisrahmen";

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppHref(
        company.phoneRaw,
        [
          "Hallo FLOXANT,",
          "ich möchte eine Anfrage stellen.",
          activeRegion === "duesseldorf"
            ? "Region: Düsseldorf. Es geht um Reinigung."
            : "Region: Regensburg. Es geht um Umzug, Entrümpelung oder Übergabe.",
        ].join("\n"),
      ),
    [activeRegion],
  );

  function clearServicesCloseTimer() {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }
  }

  function openServicesMenu() {
    clearServicesCloseTimer();
    setServicesOpen(true);
  }

  function scheduleServicesClose() {
    clearServicesCloseTimer();
    servicesCloseTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 700);
  }

  function toggleServicesMenu() {
    clearServicesCloseTimer();
    setServicesOpen((value) => !value);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    clearServicesCloseTimer();
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (servicesCloseTimerRef.current) {
        clearTimeout(servicesCloseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  if (
    pathname === "/private-client-service" ||
    pathname === "/villenservice" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login")
  ) {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[9000] px-3 pt-3 text-slate-950 sm:px-5">
      <div
        className={cn(
          "mx-auto w-full max-w-[1380px] rounded-lg border border-white/75 bg-white/[0.92] px-3 py-3 shadow-[0_20px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition duration-300 sm:px-4",
          scrolled && "border-slate-200/90 bg-white/[0.96] shadow-[0_18px_52px_rgba(15,23,42,0.18)]",
        )}
      >
        <div className="flex min-h-12 items-center gap-3">
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="FLOXANT Startseite"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)]">
              <BrandLogo size={28} />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-sm font-black tracking-[0.18em]" translate="no">
                FLOXANT
              </span>
              <span className="mt-1 block max-w-[25rem] truncate text-[11px] font-semibold text-slate-600">
                Region wählen. Passende Leistung klar anfragen.
              </span>
            </span>
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden shrink-0 items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={openServicesMenu}
              onMouseLeave={scheduleServicesClose}
            >
              <button
                type="button"
                onClick={toggleServicesMenu}
                onFocus={openServicesMenu}
                data-event="service_card_click"
                data-source="desktop_header"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
              >
                Services
                <ArrowRight
                  className={cn("h-4 w-4 transition", servicesOpen && "rotate-90")}
                  aria-hidden="true"
                />
              </button>

              {servicesOpen ? (
                <div
                  className="absolute left-1/2 top-full z-[9010] w-[min(50rem,calc(100vw-2rem))] -translate-x-1/2 pt-3"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={scheduleServicesClose}
                >
                  <FloxServicesMegaMenu
                    initialRegion={activeRegion}
                    onNavigate={() => setServicesOpen(false)}
                  />
                </div>
              ) : null}
            </div>

            {contextualNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-11 items-center rounded-lg px-3 text-sm font-black text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 xl:px-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex">
            <Link
              href={budgetHref}
              data-event="hero_cta_click"
              data-source="header"
              data-contact-channel="budget_check"
              className="hidden h-11 items-center justify-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 text-sm font-black text-slate-900 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 2xl:inline-flex"
            >
              <BadgeEuro className="h-4 w-4" aria-hidden="true" />
              Budget nennen
            </Link>
            <Link
              href={headerCta.href}
              data-event="hero_cta_click"
              data-source="header"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              {headerCta.label}
            </Link>
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              data-source="header"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-black text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)] focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[9001] bg-slate-950/34 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="mx-3 mt-[5.4rem] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-lg border border-white/70 bg-white p-3 text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 rounded-lg bg-slate-950 p-4 text-white">
              <div>
                <p className="text-xs font-black uppercase tracking-normal text-cyan-100">
                  Services wählen
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                  Erst Region, dann Kategorie, dann passende Servicekarte.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                aria-label="Menü schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3">
              <FloxServicesMegaMenu
                mode="mobile"
                initialRegion={activeRegion}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-5">
              <Link
                href="/leistungen"
                data-event="service_card_click"
                data-source="mobile_header_all_services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800"
              >
                Leistungen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-source="mobile_header"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-black text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="phone_click"
                data-source="mobile_header"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-800"
              >
                <Phone className="h-4 w-4" />
                Anrufen
              </a>
              <Link
                href={budgetHref}
                data-event="hero_cta_click"
                data-source="mobile_header"
                data-contact-channel="budget_check"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-4 text-sm font-black text-slate-900"
              >
                <BadgeEuro className="h-4 w-4" />
                Budget nennen
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white"
              >
                Kontakt
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function FloxNavigation({ dic }: { dic: any }) {
  return <PublicHeader dic={dic} />;
}

export default FloxNavigation;
