"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { company } from "@/lib/company";
import {
  floxantRegions,
  getServicesByRegion,
  type FloxantRegion,
} from "@/lib/floxant-services";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/buchungsbedingungen", label: "Buchungsbedingungen" },
] as const;

export function Footer({ dic }: { dic?: any } = {}) {
  const pathname = usePathname();

  if (
    pathname === "/private-client-service" ||
    pathname === "/villenservice" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login")
  ) {
    return null;
  }

  const whatsappHref = buildWhatsAppHref(
    company.phoneRaw,
    [
      "Hallo FLOXANT,",
      "ich möchte eine Anfrage stellen.",
      "Bitte ordnen Sie mein Anliegen der passenden Region zu.",
    ].join("\n"),
  );

  const isDuesseldorfContext = pathname.includes("duesseldorf");
  const isRegensburgContext = pathname.startsWith("/regensburg") || pathname.includes("regensburg");
  const regionsToShow: FloxantRegion[] =
    isDuesseldorfContext && !isRegensburgContext
      ? ["duesseldorf"]
      : isRegensburgContext && !isDuesseldorfContext
        ? ["regensburg"]
        : ["duesseldorf", "regensburg"];
  const footerIntro = isDuesseldorfContext
    ? "Düsseldorf steht für Reinigung von Unternehmen, Praxen und Gewerbeobjekten."
    : isRegensburgContext
      ? "Regensburg steht für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe."
      : "Düsseldorf steht für Reinigung von Unternehmen, Praxen und Gewerbeobjekten. Regensburg steht für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe.";

  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-5 pb-12 pt-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              FLOXANT
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
              Passende Anfrage klar senden.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              {footerIntro}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              data-source="global_footer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp starten
            </a>
            <Link
              href="/kontakt"
              data-event="footer_cta_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100"
            >
              Kontakt öffnen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-8 border-t border-white/10 pt-10 xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Link href="/" className="text-2xl font-black tracking-[0.16em]" translate="no">
              FLOXANT
            </Link>
            <div className="mt-5 grid gap-3 text-sm font-semibold leading-7 text-slate-300">
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-cyan-200" />
                {company.email}
              </a>
              <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-cyan-200" />
                {company.phone}
              </a>
              <div className="flex gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                <span>{company.address}</span>
              </div>
            </div>
          </div>

          <div className={`grid gap-5${regionsToShow.length > 1 ? " lg:grid-cols-2" : ""}`}>
            {regionsToShow.map((regionId) => {
              const region = floxantRegions[regionId];
              const services = getServicesByRegion(regionId).slice(0, 6);

              return (
                <div key={regionId} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black">{region.label}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                        {region.shortDescription}
                      </p>
                    </div>
                    <Link
                      href={region.href}
                      data-event="region_select"
                      data-region={regionId}
                      data-source="global_footer"
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-950"
                      aria-label={`${region.label} öffnen`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={service.href}
                        data-event="service_card_click"
                        data-service={service.id}
                        data-region={service.region}
                        data-source="global_footer"
                        className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-3 text-sm font-bold leading-5 text-slate-200 transition hover:bg-white hover:text-slate-950"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-400">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-xs font-black uppercase tracking-normal text-slate-500">
            © 2026 FLOXANT
          </p>
        </section>
      </div>
    </footer>
  );
}
