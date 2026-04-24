"use client";

import Link from "next/link";
import { ShieldCheck, Award, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { company } from "@/lib/company";

export function Footer({ dic }: { dic?: any }) {
  const pathname = usePathname();

  if (pathname === "/private-client-service" || pathname === "/villenservice") return null;
  if (!dic) return null;

  const SOLUTIONS = [
    { href: "/umzug", label: "Umzugslösungen" },
    { href: "/bueroumzug", label: "Büroumzug" },
    { href: "/reinigung", label: "Reinigung" },
    { href: "/entruempelung", label: "Entrümpelung" },
    { href: "/firmenentsorgung", label: "Firmenentsorgung" },
    { href: "/private-client-service", label: "Private Client" },
    { href: "/einlagerung", label: "Einlagerung" },
  ];

  const NETWORK = [
    { href: "/umzug-regensburg", label: "Umzug Regensburg" },
    { href: "/einsatzgebiet-regensburg-200km", label: "Einsatzgebiet ab Regensburg" },
    { href: "/endreinigung-regensburg", label: "Endreinigung Regensburg" },
    { href: "/wohnungsaufloesung-regensburg", label: "Wohnungsauflösung Regensburg" },
    { href: "/bueroumzug-bayern", label: "Büroumzug Bayern" },
    { href: "/umzug-bayern", label: "Umzug Bayern" },
  ];

  const COMPLIANCE = [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/agb", label: "AGB" },
    { href: "/floxant-fakten", label: "FLOXANT Fakten" },
  ];

  const EXTENSIONS = [
    { href: "/beiladung", label: "Beiladung & Rücktour" },
    { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt" },
    { href: "/firmenentsorgung", label: "Büroentsorgung" },
    { href: "/private-client-service", label: "Private Client" },
    { href: "/umzug-mit-reinigung", label: "All-In Übergabe" },
    { href: "/express-anfrage", label: "Express-Anfrage" },
    { href: "/anfrage-mit-preisrahmen", label: "Budget-Planung" },
  ];

  return (
    <footer className="relative overflow-hidden bg-background px-6 pb-12 pt-24 section-glow">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl">
        {/* Strategic Contact & Core CTA */}
        <div className="mb-24 flex flex-col items-center justify-between gap-12 border-b border-white/5 pb-24 md:flex-row">
          <div className="max-w-xl text-center md:text-left">
            <span className="label-premium text-blue-400 mb-4 block">
              Bereit für den Einsatz
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {dic?.common?.ready_for_service || "Bereit für den Einsatz?"}
            </h2>
          </div>
          
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/rechner"
                className="h-14 inline-flex items-center justify-center rounded-xl bg-blue-600 px-10 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-500 shadow-xl shadow-blue-900/20"
              >
                Jetzt planen
              </Link>
              <a
                href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-10 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-white/10 gap-3"
              >
                <MessageSquare size={16} className="text-green-500" />
                WhatsApp Chat
              </a>
            </div>
        </div>

        {/* System Directory Grid */}
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5 mb-24">
          {/* Brand & Core */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-[0.05em] text-white block mb-6 outline-none group">
              FLOXANT<span className="text-blue-500">.</span>
            </Link>
            <div className="space-y-4">
              <p className="text-[11px] leading-relaxed text-white/30 max-w-[180px]">
                Premium-Dienstleistungen für Umzug, Reinigung und Entrümpelung mit operativem Kern in Regensburg.
              </p>
              <a href={`mailto:${company.email}`} className="block text-[11px] font-semibold text-blue-400 hover:text-white transition-colors">
                {company.email}
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <span className="label-premium block mb-6">Leistungen</span>
            <ul className="space-y-4">
              {SOLUTIONS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs font-medium text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Extensions */}
          <div>
            <span className="label-premium block mb-6">Zusatzservices</span>
            <ul className="space-y-4">
              {EXTENSIONS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs font-medium text-blue-400/60 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network */}
          <div>
            <span className="label-premium block mb-6">Region</span>
            <ul className="space-y-4">
              {NETWORK.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs font-medium text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & System */}
          <div>
            <span className="label-premium block mb-6">Recht & System</span>
            <ul className="space-y-4">
              {COMPLIANCE.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs font-medium text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link href="/login" rel="nofollow" className="label-premium hover:text-blue-500/50 transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-8 border-t border-white/[0.04] pt-12">
          <div className="flex items-center gap-10 opacity-30 transition-all hover:opacity-80">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-blue-400" />
              <span className="label-premium !text-white/50">Versicherter Transport</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Award size={16} className="text-blue-400" />
              <span className="label-premium !text-white/50">IHK-registriert</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <a href="https://www.check24.de" target="_blank" rel="noopener" className="opacity-10 hover:opacity-60 transition-opacity">
              <img src="https://cdn.profis.check24.de/widget/2026.svg" alt="Quality" width="80" className="h-8 w-auto grayscale invert" />
            </a>
            <span className="text-[10px] font-medium text-white/15 uppercase tracking-[0.1em]">
              © 2026 FLOXANT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

