import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_SERVICES,
} from "@/lib/duesseldorf-cleaning";

export function DuesseldorfChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(148,163,184,0.14),transparent_24%),linear-gradient(180deg,#07111d_0%,#0b1726_14%,#0f1b2d_22%,#f3f7fb_22%,#f8fbff_100%)] pt-24 lg:pt-28">
      {children}

      <footer className="border-t border-slate-200 bg-white/96 px-4 pb-28 pt-14 lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              FLOXANT Reinigung Düsseldorf
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Lokaler Reinigungsbereich für Düsseldorf und die nähere Umgebung
            </h2>
            <div className="mt-5 space-y-1 text-sm leading-7 text-slate-700">
              <div>{DUESSELDORF_CLEANING.address.streetAddress}</div>
              <div>
                {DUESSELDORF_CLEANING.address.postalCode}{" "}
                {DUESSELDORF_CLEANING.address.city}
              </div>
              <div>
                <a href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`} className="hover:text-slate-950">
                  {DUESSELDORF_CLEANING.phoneDisplay}
                </a>
              </div>
              <div>
                <a href={`mailto:${DUESSELDORF_CLEANING.email}`} className="hover:text-slate-950">
                  {DUESSELDORF_CLEANING.email}
                </a>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              Termine nur nach vorheriger Anfrage oder Absprache. Diese Düsseldorf-Sektion ist
              bewusst auf Reinigungsleistungen ausgerichtet. Eine vorhandene Entsorgungsseite
              bleibt separat. Düsseldorf sendet bei FLOXANT keine Umzug-Signale; Umzug, Transport und Entrümpelung bleiben in Regensburg
              und Bayern sauber getrennt positioniert.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Leistungen
            </div>
            <div className="mt-4 space-y-2">
              {DUESSELDORF_CLEANING_SERVICES.slice(0, 5).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-900" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Recht und Kontakt
            </div>
            <div className="mt-4 space-y-2">
              {[
                {
                  href: "/duesseldorf/reinigung/datenschutz",
                  label: "Datenschutz Düsseldorf",
                },
                { href: "/duesseldorf/reinigung/agb", label: "AGB Düsseldorf" },
                { href: "/impressum", label: "Impressum" },
                { href: "/", label: "Hauptmarke FLOXANT" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-900" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
