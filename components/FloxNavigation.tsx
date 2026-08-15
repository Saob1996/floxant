"use client";

import Link from "next/link";
import { ChevronDown, FileText, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { FloxBrandUI as BrandLogo } from "@/components/FloxBrandUI";
import { FloxServicesMegaMenu } from "@/components/FloxServicesMegaMenu";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";
import { buildGlobalRequestHref } from "@/lib/lead-intents/resolve-request-context";
import { cn } from "@/lib/utils";

export type PublicHeaderVariant = "default" | "duesseldorf";
type DesktopMenu = "services" | "locations" | null;

const requestHref = buildGlobalRequestHref("global_header");
const mobileRequestHref = buildGlobalRequestHref("global_mobile_header");
const headerWhatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent("Hallo FLOXANT, ich möchte eine Anfrage stellen.")}`;

const locationLinks = [
  {
    label: "Düsseldorf",
    href: "/duesseldorf",
    text: "Reinigung für Wohnung, Büro, Praxis, Gewerbe und Fenster",
  },
  {
    label: "Regensburg",
    href: "/regensburg",
    text: "Umzug, Reinigung, Entrümpelung und Klaviertransport",
  },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function isCalculatorActive(pathname: string) {
  return (
    isActive(pathname, "/rechner") ||
    pathname === "/umzug-kosten-rechner" ||
    pathname === "/reinigung-preis-rechner"
  );
}

export function PublicHeader({
  variant: _variant = "default",
}: {
  dic?: unknown;
  variant?: PublicHeaderVariant;
}) {
  const pathname = usePathname() || "/";
  const [openMenu, setOpenMenu] = useState<DesktopMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const lastDesktopTriggerRef = useRef<HTMLButtonElement | null>(null);

  function resetNeutralRequestState() {
    window.dispatchEvent(new CustomEvent("floxant:neutral-request-entry"));
  }

  function closeDesktopMenu(restoreFocus = false) {
    setOpenMenu(null);
    if (restoreFocus) window.setTimeout(() => lastDesktopTriggerRef.current?.focus(), 0);
  }

  function toggleDesktopMenu(menu: Exclude<DesktopMenu, null>, trigger: HTMLButtonElement) {
    lastDesktopTriggerRef.current = trigger;
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  function closeMobileMenu(restoreFocus = false) {
    setMobileOpen(false);
    if (restoreFocus) window.setTimeout(() => mobileTriggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (openMenu && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeDesktopMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openMenu) {
        event.preventDefault();
        closeDesktopMenu(true);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = mobilePanelRef.current;
    const getFocusable = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((element) => element.getClientRects().length > 0)
        : [];
    getFocusable()[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
        return;
      }
      const focusable = getFocusable();
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
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

  const menuButtonClass = (active: boolean) =>
    cn(
      "inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 xl:px-4",
      active ? "bg-slate-100 text-slate-950" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
    );

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-[9000] px-3 pt-3 text-slate-950 sm:px-5">
      <div
        className={cn(
          "mx-auto w-full max-w-[1380px] rounded-xl border border-white/75 bg-white/95 px-3 py-2.5 shadow-[0_18px_55px_rgba(15,23,42,0.14)] backdrop-blur-xl transition sm:px-4",
          scrolled && "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.18)]",
        )}
      >
        <div className="flex min-h-12 items-center gap-2">
          <Link
            href="/"
            onClick={() => closeDesktopMenu()}
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:max-w-[12rem] xl:max-w-[14rem]"
            aria-label="FLOXANT Startseite"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-950 text-white">
              <BrandLogo size={26} />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-sm font-black tracking-[0.18em]" translate="no">FLOXANT</span>
              <span className="mt-0.5 block truncate text-[10px] font-semibold text-slate-500">Einfach anfragen</span>
            </span>
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center lg:flex">
            <div className="relative">
              <button
                type="button"
                onClick={(event) => toggleDesktopMenu("services", event.currentTarget)}
                className={menuButtonClass(openMenu === "services" || isActive(pathname, "/leistungen"))}
                aria-expanded={openMenu === "services"}
                aria-controls="services-mega-menu"
                data-menu-trigger="services"
              >
                Leistungen
                <ChevronDown className={cn("h-4 w-4 transition", openMenu === "services" && "rotate-180")} aria-hidden="true" />
              </button>
              {openMenu === "services" ? (
                <div className="absolute left-0 top-full pt-3">
                  <FloxServicesMegaMenu onNavigate={() => closeDesktopMenu()} />
                </div>
              ) : null}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={(event) => toggleDesktopMenu("locations", event.currentTarget)}
                className={menuButtonClass(openMenu === "locations" || isActive(pathname, "/duesseldorf") || isActive(pathname, "/regensburg"))}
                aria-expanded={openMenu === "locations"}
                aria-controls="locations-menu"
                data-menu-trigger="locations"
              >
                Standorte
                <ChevronDown className={cn("h-4 w-4 transition", openMenu === "locations" && "rotate-180")} aria-hidden="true" />
              </button>
              {openMenu === "locations" ? (
                <div id="locations-menu" className="absolute left-1/2 top-full w-[31rem] -translate-x-1/2 pt-3" data-desktop-mega-menu>
                  <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                    {locationLinks.map((item) => (
                      <Link key={item.href} href={item.href} prefetch={false} aria-current={isActive(pathname, item.href) ? "page" : undefined} onClick={() => closeDesktopMenu()} className="rounded-lg border border-slate-200 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                        <span className="block font-black text-slate-950">{item.label}</span>
                        <span className="mt-2 block text-xs font-semibold leading-5 text-slate-600">{item.text}</span>
                      </Link>
                    ))}
                    <p className="col-span-2 px-1 text-xs font-semibold text-slate-500">Einsatzort im Umfeld? Ort einfach im Anfrageformular angeben.</p>
                  </div>
                </div>
              ) : null}
            </div>

            <Link href="/angebot-guenstiger-pruefen" aria-current={isActive(pathname, "/angebot-guenstiger-pruefen") ? "page" : undefined} onClick={() => closeDesktopMenu()} className={menuButtonClass(isActive(pathname, "/angebot-guenstiger-pruefen"))}>
              Angebot prüfen
            </Link>

            <Link href="/rechner" aria-current={isCalculatorActive(pathname) ? "page" : undefined} onClick={() => closeDesktopMenu()} className={menuButtonClass(isCalculatorActive(pathname))}>
              Rechner
            </Link>

            <Link href="/anfrage-mit-preisrahmen" aria-current={isActive(pathname, "/anfrage-mit-preisrahmen") ? "page" : undefined} onClick={() => closeDesktopMenu()} className={menuButtonClass(isActive(pathname, "/anfrage-mit-preisrahmen"))}>
              Budget
            </Link>

            <Link href="/kontakt" aria-current={isActive(pathname, "/kontakt") ? "page" : undefined} onClick={() => closeDesktopMenu()} className={menuButtonClass(isActive(pathname, "/kontakt"))}>
              Kontakt
            </Link>
          </nav>

          <Link
            href={requestHref}
            onClick={resetNeutralRequestState}
            data-event="seo_cta_click"
            data-source="global_header"
            data-page-intent="neutrale-anfrage"
            data-priority="p1"
            data-cta-label="Angebot anfragen"
            data-destination={requestHref}
            className="hidden h-11 shrink-0 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:inline-flex"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Angebot anfragen
          </Link>

          <button
            ref={mobileTriggerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:hidden"
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div id="mobile-navigation" className="fixed inset-0 z-[9001] bg-white lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div ref={mobilePanelRef} className="h-full overflow-y-auto px-5 pb-8 pt-4 text-slate-950">
            <div className="mx-auto max-w-2xl">
              <div className="flex min-h-14 items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-sm font-black tracking-[0.18em]" translate="no">FLOXANT</span>
                <button type="button" onClick={() => closeMobileMenu(true)} className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" aria-label="Menü schließen">
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile Hauptnavigation" className="mt-3">
                <FloxServicesMegaMenu mode="mobile" onNavigate={() => closeMobileMenu()} />
                <details className="border-b border-slate-200" data-mobile-nav-group>
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-base font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Standorte <span aria-hidden="true">+</span></summary>
                  <div className="grid gap-1 pb-3 pl-3">
                    {locationLinks.map((item) => (
                      <Link key={item.href} href={item.href} prefetch={false} aria-current={isActive(pathname, item.href) ? "page" : undefined} onClick={() => closeMobileMenu()} className="flex min-h-11 items-center rounded-md px-2 text-sm font-bold text-slate-700 hover:bg-slate-100">{item.label}</Link>
                    ))}
                  </div>
                </details>
                <Link href="/angebot-guenstiger-pruefen" aria-current={isActive(pathname, "/angebot-guenstiger-pruefen") ? "page" : undefined} onClick={() => closeMobileMenu()} className="flex min-h-12 items-center border-b border-slate-200 py-3 text-base font-black">Angebot prüfen</Link>
                <Link href="/rechner" aria-current={isCalculatorActive(pathname) ? "page" : undefined} onClick={() => closeMobileMenu()} className="flex min-h-12 items-center border-b border-slate-200 py-3 text-base font-black">Rechner</Link>
                <Link href="/anfrage-mit-preisrahmen" aria-current={isActive(pathname, "/anfrage-mit-preisrahmen") ? "page" : undefined} onClick={() => closeMobileMenu()} className="flex min-h-12 items-center border-b border-slate-200 py-3 text-base font-black">Budget nennen</Link>
                <Link href="/fragen" aria-current={isActive(pathname, "/fragen") ? "page" : undefined} onClick={() => closeMobileMenu()} className="flex min-h-12 items-center border-b border-slate-200 py-3 text-base font-black">Häufige Fragen</Link>
                <Link href="/kontakt" aria-current={isActive(pathname, "/kontakt") ? "page" : undefined} onClick={() => closeMobileMenu()} className="flex min-h-12 items-center border-b border-slate-200 py-3 text-base font-black">Kontakt</Link>
              </nav>

              <Link href={mobileRequestHref} onClick={() => { resetNeutralRequestState(); closeMobileMenu(); }} data-event="seo_cta_click" data-source="global_mobile_header" data-page-intent="neutrale-anfrage" data-priority="p1" data-cta-label="Angebot anfragen" data-destination={mobileRequestHref} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white">
                Angebot anfragen
                <FileText className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={headerWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-event="whatsapp_click"
                data-source="global_mobile_header"
                data-destination={headerWhatsappHref}
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-800"
              >
                <WhatsAppMark className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function FloxNavigation({ dic }: { dic: unknown }) {
  return <PublicHeader dic={dic} />;
}

export default FloxNavigation;
