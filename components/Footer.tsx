"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { company } from "@/lib/company";
import { floxantLocations } from "@/lib/floxant-locations";
import {
  floxantRegions,
  getServicesByRegion,
  type FloxantRegion,
} from "@/lib/floxant-services";
import { buildLeadHref } from "@/lib/lead-intents";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/buchungsbedingungen", label: "Buchungsbedingungen" },
] as const;

const authorityLinks = [
  { href: "/rechner", label: "Rechner" },
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
  { href: "/duesseldorf/fensterreinigung", label: "Fensterreinigung Düsseldorf" },
  { href: "/duesseldorf/entruempelung", label: "Entrümpelung Düsseldorf" },
  { href: "/regensburg/umzug", label: "Umzug Regensburg" },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
  { href: "/klaviertransport-regensburg", label: "Klaviertransport Regensburg" },
  { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
  { href: "/reinigung-landshut", label: "Reinigung Landshut" },
  { href: "/entruempelung-landshut", label: "Entrümpelung Landshut" },
  { href: "/umzug-neustadt-an-der-waldnaab", label: "Umzug Neustadt/Waldnaab" },
  { href: "/umzug-vohenstrauss", label: "Umzug Vohenstrauß" },
  { href: "/reinigungsfirma-angebot", label: "Reinigungsfirma Angebot" },
  { href: "/fernumzug-muenchen", label: "Fernumzug München" },
  { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
  { href: "/angebotscheck", label: "Angebotscheck" },
  { href: "/anbieter-vergleichen", label: "Anbieter vergleichen" },
  { href: "/solarreinigung", label: "Solarreinigung" },
  { href: "/pv-anlagen-reinigung", label: "PV-Anlagen-Reinigung" },
  { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern" },
  { href: "/umzug", label: "Umzug" },
  { href: "/reinigung", label: "Reinigung" },
  { href: "/entruempelung", label: "Entrümpelung" },
  { href: "/bueroumzug", label: "Büroumzug" },
  { href: "/firmenentsorgung", label: "Firmenentsorgung" },
  { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt" },
  { href: "/signature-services", label: "Signature Services" },
  { href: "/empfehlen", label: "Empfehlen" },
  { href: "/makler-vermieter-link", label: "Makler/Vermieter" },
  { href: "/wohnung-wieder-vermietbar", label: "Wieder vermietbar" },
  { href: "/schadensbegrenzung", label: "Schadensbegrenzung" },
  { href: "/keller-muellraum-rettung-regensburg", label: "Keller/Müllraum" },
  { href: "/uebergabeakte", label: "Übergabeakte" },
  { href: "/private-client-service", label: "Private Client" },
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
  const locationsToShow = regionsToShow.map((regionId) => floxantLocations[regionId]);
  const footerIntro = isDuesseldorfContext
    ? "Düsseldorf steht für Reinigung von Unternehmen, Praxen und Gewerbeobjekten."
    : isRegensburgContext
      ? "Regensburg steht für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe."
      : "Düsseldorf steht für Reinigung von Unternehmen, Praxen und Gewerbeobjekten. Regensburg steht für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe.";
  const footerLead = isRegensburgContext && !isDuesseldorfContext
    ? { service: "umzug", city: "regensburg", intent: "regensburg-anfrage" }
    : isDuesseldorfContext
      ? { service: "reinigung", city: "duesseldorf", intent: "reinigung-duesseldorf" }
      : { service: "reinigung", city: "duesseldorf", intent: "homepage-anfrage" };
  const footerContactHref = buildLeadHref(footerLead);

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
            <Link
              href="/leistungen"
              data-event="service_card_click"
              data-source="global_footer_all_services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white hover:text-slate-950"
            >
              Leistungen ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              data-source="global_footer"
              data-destination={whatsappHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp starten
            </a>
            <Link
              href={footerContactHref}
              data-event="seo_cta_click"
              data-source="global_footer"
              data-service={footerLead.service}
              data-city={footerLead.city}
              data-page-intent={footerLead.intent}
              data-priority="p2"
              data-cta-label="Kontakt oeffnen"
              data-destination={footerContactHref}
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
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white" data-event="seo_email_click">
                <Mail className="h-4 w-4 text-cyan-200" />
                {company.email}
              </a>
              <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-2 hover:text-white" data-event="seo_phone_click">
                <Phone className="h-4 w-4 text-cyan-200" />
                {company.phone}
              </a>
              <div className="flex gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                <span>
                  {locationsToShow.length > 1
                    ? "Standorte Düsseldorf und Regensburg"
                    : locationsToShow[0]?.displayName}
                </span>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {locationsToShow.map((location) => (
                <div key={location.locationKey} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-sm font-black text-white">{location.displayName}</div>
                  <div className="mt-1 text-sm font-semibold leading-6 text-slate-300">
                    {location.addressLine1}, {location.postalCode} {location.city}
                  </div>
                  <Link
                    href={location.localLandingPage}
                    data-event="region_select"
                    data-region={location.locationKey}
                    data-source="global_footer_nap"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-black text-cyan-100 hover:text-white"
                  >
                    Standort oeffnen
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
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
          <nav aria-label="Wichtige FLOXANT Startpunkte" className="flex flex-wrap gap-3 text-sm font-semibold text-slate-300">
            {authorityLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </section>

        <section className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
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
