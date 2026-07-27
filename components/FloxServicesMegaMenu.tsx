"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FloxServicesMegaMenuProps = {
  mode?: "desktop" | "mobile";
  onNavigate?: () => void;
};

const serviceGroups = [
  {
    title: "Umzug & Transport",
    region: "Regensburg",
    links: [
      { label: "Umzug", href: "/regensburg/umzug" },
      { label: "Seniorenumzug", href: "/seniorenumzug-bayern" },
      { label: "Klaviertransport", href: "/klaviertransport-regensburg" },
      { label: "Möbeltransport", href: "/kleintransport-regensburg" },
    ],
  },
  {
    title: "Reinigung",
    region: "Standort auswählen",
    links: [
      { label: "Reinigung", href: "/reinigung" },
      { label: "Büroreinigung", href: "/reinigung#bueroreinigung" },
      { label: "Gewerbereinigung", href: "/reinigung#gewerbereinigung" },
      { label: "Spezial- & Grundreinigung", href: "/reinigung#grundreinigung" },
    ],
  },
  {
    title: "Entrümpelung & Auflösung",
    region: "Regensburg",
    links: [
      { label: "Entrümpelung", href: "/regensburg/entruempelung" },
      { label: "Wohnungsauflösung", href: "/regensburg/wohnungsaufloesung" },
      { label: "Haushaltsauflösung", href: "/regensburg/haushaltsaufloesung" },
      { label: "Reinigung nach Umzug", href: "/regensburg/reinigung-nach-umzug" },
    ],
  },
] as const;

export function FloxServicesMegaMenu({
  mode = "desktop",
  onNavigate,
}: FloxServicesMegaMenuProps) {
  if (mode === "mobile") {
    return (
      <details className="border-b border-slate-200" data-mobile-nav-group>
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-base font-black text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          Leistungen
          <span aria-hidden="true">+</span>
        </summary>
        <div className="grid gap-1 pb-3 pl-3">
          {serviceGroups.map((group) => (
            <div key={group.title} className="py-2">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">{group.title}</p>
              <p className="mt-1 text-xs font-bold text-blue-700">{group.region}</p>
              <div className="mt-1 grid sm:grid-cols-2">
                {group.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={onNavigate}
                    className="flex min-h-11 items-center rounded-md px-2 text-sm font-bold text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/leistungen"
            onClick={onNavigate}
            className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-black text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Alle Leistungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </details>
    );
  }

  return (
    <div
      id="services-mega-menu"
      role="menu"
      data-desktop-mega-menu
      className="grid w-[min(48rem,calc(100vw-2rem))] grid-cols-3 gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
    >
      {serviceGroups.map((group) => (
        <section key={group.title} aria-labelledby={`menu-${group.title.replace(/\W+/g, "-")}`}>
          <h2
            id={`menu-${group.title.replace(/\W+/g, "-")}`}
            className="text-sm font-black text-slate-950"
          >
            {group.title}
          </h2>
          <p className="mt-1 text-xs font-bold text-blue-700">{group.region}</p>
          <div className="mt-3 grid gap-1">
            {group.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                role="menuitem"
                onClick={onNavigate}
                className="flex min-h-10 items-center rounded-md px-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      ))}
      <Link
        href="/leistungen"
        role="menuitem"
        onClick={onNavigate}
        className="col-span-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        Alle Leistungen ansehen
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
