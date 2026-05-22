import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_SERVICES,
} from "@/lib/duesseldorf-cleaning";

const duesseldorfTrustLinks = [
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteile & Umgebung" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Vielleicht günstiger?" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung" },
  { href: "/duesseldorf/bueroreinigung", label: "B2B-Reinigung" },
] as const;

const duesseldorfDominanceLinks = [
  { href: "/duesseldorf/reinigung", label: "Reinigungsfirma Düsseldorf" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/b2b-reinigung", label: "B2B-Reinigung Düsseldorf" },
  { href: "/duesseldorf/firmenreinigung", label: "Firmenreinigung Düsseldorf" },
  { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung Düsseldorf" },
  { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung Düsseldorf" },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Angebot prüfen lassen" },
] as const;

const duesseldorfDistrictSignals = [
  "Altstadt",
  "Carlstadt",
  "Stadtmitte",
  "Pempelfort",
  "Derendorf",
  "Flingern",
  "Bilk",
  "Unterbilk",
  "Oberbilk",
  "Oberkassel",
  "MedienHafen",
  "Golzheim",
] as const;

const duesseldorfNearbySignals = [
  "Neuss",
  "Ratingen",
  "Meerbusch",
  "Mettmann",
  "Duisburg",
  "Hilden",
  "Erkrath",
  "Kaarst",
  "Krefeld",
] as const;

export function DuesseldorfChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#07111d_0%,#0b1726_14%,#0f1b2d_22%,#f3f7fb_22%,#f8fbff_100%)] pt-24 lg:pt-28">
      {children}

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-cyan-200">
              Düsseldorf stärker finden
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Reinigung in Düsseldorf, Stadtteilen und naher Umgebung
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, MedienHafen sowie Neuss, Ratingen, Meerbusch, Mettmann und Duisburg werden nach Objekt, Zugang, Fotos und Zeitfenster geprüft.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {duesseldorfTrustLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-black text-white transition hover:bg-white/14"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan-200 transition group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.9fr_0.8fr]">
          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-cyan-700">
              Düsseldorf sauber abdecken
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Direkte Einstiege für Reinigung, B2B und Angebotsprüfung
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              FLOXANT bündelt die Düsseldorfer Reinigungsseiten so, dass Kunden nicht raten
              müssen: Objektart wählen, Stadtteil oder Nachbarort nennen, Fotos senden und eine
              konkrete Rückmeldung zu Aufwand, Zugang, Turnus und Preisrahmen erhalten.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {duesseldorfDominanceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-cyan-700" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Stadtteile
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Für jede Anfrage zählt der reale Ort: Innenstadt, Parken, Lieferzone, Hausordnung,
              Aufzug und Zeitfenster verändern Aufwand und Planung.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {duesseldorfDistrictSignals.map((district) => (
                <Link
                  key={district}
                  href="/duesseldorf/reinigung-stadtteile-umgebung"
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-200 hover:text-cyan-800"
                >
                  Reinigung {district}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-5">
            <div className="text-[11px] font-black uppercase tracking-normal text-cyan-700">
              Nahe Umgebung
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Für Nachbarorte wird nicht pauschal versprochen. FLOXANT prüft Objekt, Strecke,
              Fotos, Termin und Kapazität als Düsseldorfer Reinigungsanfrage.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {duesseldorfNearbySignals.map((area) => (
                <Link
                  key={area}
                  href="/duesseldorf/reinigung-stadtteile-umgebung"
                  className="rounded-full border border-cyan-100 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-800"
                >
                  Reinigung {area}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/96 px-4 pb-32 pt-14 lg:pb-36">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_1.05fr_0.8fr]">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              FLOXANT Reinigung Düsseldorf
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Eigener Düsseldorfer Bereich für Reinigung und Entsorgung
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
              bewusst auf Reinigung und Entsorgung ausgerichtet. Düsseldorf bietet bei FLOXANT
              keine Umzüge; Transport, Büroumzug und ähnliche Leistungen bleiben
              von Regensburg und Bayern sauber getrennt.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Leistungen in Düsseldorf
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {DUESSELDORF_CLEANING_SERVICES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-900" />
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
                { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteile & Umgebung" },
                { href: "/duesseldorf/vielleicht-guenstiger", label: "Vielleicht günstiger?" },
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
