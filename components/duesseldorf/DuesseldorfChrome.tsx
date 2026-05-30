import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_SERVICES,
} from "@/lib/duesseldorf-cleaning";

const duesseldorfTrustLinks = [
  { href: "/duesseldorf/reinigung#duesseldorf-reinigung-klickgruende", label: "Schnell anfragen" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil prüfen" },
  { href: "/duesseldorf/reinigung#kontakt", label: "Fotos senden" },
  { href: "/duesseldorf/reinigung#anfrage-checkliste", label: "Was senden?" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Angebot prüfen" },
  { href: "/duesseldorf/kurzfristige-reinigung", label: "Kurzfristig" },
  { href: "/duesseldorf/hausverwaltung-reinigung", label: "Hausverwaltung" },
  { href: "/duesseldorf/schluesseluebergabe-reinigung", label: "Schlüssel" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung" },
  { href: "/duesseldorf/it-raum-reinigung", label: "IT-Raum" },
  { href: "/duesseldorf/fensterreinigung", label: "Fenster" },
  { href: "/duesseldorf/baureinigung", label: "Baustaub" },
  { href: "/duesseldorf/teppichreinigung", label: "Teppich" },
  { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhalt" },
  { href: "/duesseldorf/ladenreinigung", label: "Laden" },
  { href: "/duesseldorf/sonderreinigung", label: "Sonderfall" },
] as const;

const duesseldorfDominanceLinks = [
  { href: "/duesseldorf/reinigung", label: "Reinigungsfirma Düsseldorf" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Reinigung in meiner Nähe" },
  { href: "/duesseldorf/reinigung#kontakt", label: "Reinigung per WhatsApp" },
  { href: "/duesseldorf/reinigung#preisvorschlag", label: "Reinigung Kosten Düsseldorf" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
  { href: "/duesseldorf/kurzfristige-reinigung", label: "Kurzfristige Reinigung Düsseldorf" },
  { href: "/duesseldorf/hausverwaltung-reinigung", label: "Hausverwaltung Reinigung Düsseldorf" },
  { href: "/duesseldorf/schluesseluebergabe-reinigung", label: "Schlüsselübergabe Reinigung Düsseldorf" },
  { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
  { href: "/duesseldorf/endreinigung", label: "Endreinigung Düsseldorf" },
  { href: "/reinigung-moeblierte-wohnung-duesseldorf", label: "Apartment-Reinigung Düsseldorf" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/b2b-reinigung", label: "B2B-Reinigung Düsseldorf" },
  { href: "/duesseldorf/firmenreinigung", label: "Firmenreinigung Düsseldorf" },
  { href: "/duesseldorf/fensterreinigung", label: "Fensterreinigung Düsseldorf" },
  { href: "/duesseldorf/baureinigung", label: "Baureinigung Düsseldorf" },
  { href: "/duesseldorf/teppichreinigung", label: "Teppichreinigung Düsseldorf" },
  { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhaltsreinigung Düsseldorf" },
  { href: "/duesseldorf/ladenreinigung", label: "Ladenreinigung Düsseldorf" },
  { href: "/duesseldorf/sonderreinigung", label: "Sonderreinigung Düsseldorf" },
  { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung Düsseldorf" },
  { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung Düsseldorf" },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
  { href: "/duesseldorf/it-raum-reinigung", label: "IT-Raum Reinigung Düsseldorf" },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
  { href: "/entsorgung-duesseldorf", label: "Möbelentsorgung Düsseldorf" },
] as const;

const duesseldorfCustomerNeedLinks = [
  {
    href: "/duesseldorf/schluesseluebergabe-reinigung",
    label: "Schlüsselübergabe steht an",
    text: "Termin, Zustand, Küche, Bad, Boden und Fotos direkt klären.",
  },
  {
    href: "/duesseldorf/baureinigung",
    label: "Handwerkerstaub ist überall",
    text: "Baustaub, Fensterrahmen, Boden und Übergabeziel prüfen lassen.",
  },
  {
    href: "/duesseldorf/kurzfristige-reinigung",
    label: "Ich brauche Reinigung diese Woche",
    text: "Stadtteil, Objekt, Termin und Fotos direkt senden.",
  },
  {
    href: "/duesseldorf/hausverwaltung-reinigung",
    label: "Hausverwaltung braucht Ruhe",
    text: "Eingang, Treppenhaus, Turnus, Schlüsselweg und Beschwerden sauber einordnen.",
  },
  {
    href: "/duesseldorf/vielleicht-guenstiger",
    label: "Ich habe schon ein Angebot",
    text: "Preis, Umfang und offene Punkte ohne Preisgarantie prüfen.",
  },
  {
    href: "/entsorgung-duesseldorf",
    label: "Möbel oder Sperrmüll müssen raus",
    text: "Fotos, Etage, Laufweg und Materialart für Entsorgung senden.",
  },
  {
    href: "/reinigung-moeblierte-wohnung-duesseldorf",
    label: "Apartment nach Check-out reinigen",
    text: "Zeitfenster, Zugang, Fotos und Zusatzwünsche klar nennen.",
  },
  {
    href: "/duesseldorf/ladenreinigung",
    label: "Laden vor Öffnung sauber bekommen",
    text: "Verkaufsfläche, Eingang, Schaufenster und Zeitfenster senden.",
  },
  {
    href: "/duesseldorf/sonderreinigung",
    label: "Stärkere Verschmutzung einordnen",
    text: "Zustand, Ursache, Fotos und klare Grenzen vorab senden.",
  },
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
    <div className="min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#07111d_0,#0b1726_9rem,#f3f7fb_18rem,#f8fbff_100%)] pt-24 lg:pt-28">
      {children}

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-cyan-200">
              Düsseldorf schnell einordnen
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-normal">
              Reinigungsanfrage nach Objekt, Stadtteil und Termin
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Wohnung, Büro, Hotel, Treppenhaus oder Entsorgung: Senden Sie Ort, Fläche,
              Fotos und Zeitfenster. FLOXANT prüft Düsseldorf und nahe Orte nach realem
              Aufwand statt nach Pauschalversprechen.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(8.75rem,1fr))]">
            {duesseldorfTrustLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-14 items-center justify-between gap-3 rounded-[0.85rem] border border-cyan-100/20 bg-slate-900/75 px-4 py-3 text-[13px] font-black leading-tight !text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-slate-800 sm:text-sm"
              >
                <span className="min-w-0 [overflow-wrap:anywhere]">{item.label}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan-200 transition group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-cyan-700">
              Kunden sagen oft
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
              Direkte Wege nach echter Anfrage-Sprache
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Viele Anfragen beginnen nicht mit Fachbegriffen, sondern mit konkreten
              Situationen. Diese Einstiege führen Kunden schneller zur passenden Düsseldorfer
              Seite und reduzieren falsche Anfragen.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {duesseldorfCustomerNeedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[0.85rem] border border-slate-200 bg-slate-50 p-4 text-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-[0_14px_30px_rgba(8,145,178,0.1)]"
                data-event="click_duesseldorf_customer_need"
                data-region="duesseldorf"
              >
                <span className="flex items-center justify-between gap-3 font-black text-slate-950">
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-cyan-700" />
                </span>
                <span className="mt-2 block leading-6 text-slate-600">{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.9fr_0.8fr]">
          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-cyan-700">
              Passenden Einstieg wählen
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
              Direkte Wege für Wohnung, Büro, Hotel und Angebot
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Kunden müssen nicht raten, welche Seite passt: Objektart wählen, Stadtteil oder
              Nachbarort nennen, Fotos senden und eine konkrete Rückmeldung zu Aufwand,
              Zugang, Turnus und Preisrahmen erhalten.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {duesseldorfDominanceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-12 items-center justify-between gap-3 rounded-[0.85rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-cyan-700" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1rem] border border-slate-200 bg-slate-50 p-5">
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
                  className="rounded-[0.75rem] border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-200 hover:text-cyan-800"
                >
                  Reinigung {district}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1rem] border border-cyan-100 bg-cyan-50 p-5">
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
                  className="rounded-[0.75rem] border border-cyan-100 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-800"
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
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
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
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Leistungen in Düsseldorf
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {DUESSELDORF_CLEANING_SERVICES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-[0.85rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-900" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
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
                  className="group flex items-center justify-between rounded-[0.85rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
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
