"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

import { company } from "@/lib/company";

const serviceLinks = [
  { href: "/umzug", label: "Umzug" },
  { href: "/reinigung", label: "Reinigung" },
  { href: "/firmenentsorgung", label: "Firmenentsorgung" },
  { href: "/entruempelung", label: "Entrümpelung" },
  { href: "/bueroumzug", label: "Büroumzug" },
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung" },
  { href: "/private-client-service", label: "Private Client" },
];

const directLinks = [
  { href: "/buchung", label: "Buchung" },
  { href: "/rechner", label: "Rechner" },
  { href: "/anfrage-mit-preisrahmen", label: "Budget nennen" },
  { href: "/angebot-guenstiger-pruefen", label: "Günstiger prüfen" },
  { href: "/express-anfrage", label: "Express-Check" },
  { href: "/empfehlen", label: "Empfehlen" },
  { href: "/makler-vermieter-link", label: "Makler/Vermieter" },
  { href: "/schadensbegrenzung", label: "Schadensbegrenzung" },
  { href: "/keller-muellraum-rettung-regensburg", label: "Keller/Müllraum" },
  { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt" },
  { href: "/wohnung-wieder-vermietbar", label: "Objekt-Ready" },
  { href: "/uebergabeakte", label: "Übergabeakte" },
  { href: "/kontakt", label: "Kontakt" },
];

const localLinks = [
  { href: "/umzug-regensburg", label: "Umzug Regensburg" },
  { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
  { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
  { href: "/bueroumzug-regensburg", label: "Büroumzug Regensburg" },
  { href: "/service-area-bayern", label: "Bayern" },
  { href: "/standorte", label: "Standorte" },
];

const knowledgeLinks = [
  { href: "/blog", label: "Ratgeber-Hub" },
  { href: "/blog/umzug-kosten-regensburg", label: "Umzugskosten" },
  { href: "/blog/wohnungsuebergabe-regensburg-vorbereiten", label: "Wohnungsübergabe" },
  { href: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl", label: "Reinigungsfirma wählen" },
  { href: "/leistungen-vergleichen", label: "Leistungen vergleichen" },
  { href: "/anbieter-vergleichen", label: "Anbieter vergleichen" },
  { href: "/praxisfaelle", label: "Praxisfälle" },
  { href: "/kostenfaktoren", label: "Kostenfaktoren" },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/buchungsbedingungen", label: "Buchungsbedingungen" },
  { href: "/widerruf", label: "Widerruf" },
];

export function Footer({ dic }: { dic?: any } = {}) {
  const pathname = usePathname();

  if (pathname === "/private-client-service" || pathname === "/villenservice") return null;

  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.06),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]" />
      <div className="relative mx-auto max-w-7xl space-y-6">
        <section className="flox-panel-dark rounded-[2.2rem] px-7 py-8 md:px-10 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">
                Letzter klarer Schritt
              </div>
              <h2 className="mt-6 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] font-bold tracking-[-0.025em] text-white">
                Lieber direkt sauber anfragen als später alles doppelt erklären.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                FLOXANT führt Anfrage, Preisgefühl und Ausführung ruhig zusammen.
                Wenn es konkret wird, lieber direkt, klar und mit genug Angaben.
              </p>
            </div>

            <div className="flox-cta-choice-grid">
              <Link
                href="/buchung"
                className="flox-cta-choice flox-cta-choice-primary"
              >
                <span className="flox-cta-choice-icon">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="flox-cta-choice-body">
                  <span className="flox-cta-choice-eyebrow">Anfrageweg</span>
                  <span className="flox-cta-choice-title">Anfrage starten</span>
                  <span className="flox-cta-choice-copy">Buchung öffnen</span>
                </span>
                <span className="flox-cta-choice-arrow">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flox-cta-choice flox-cta-choice-whatsapp"
              >
                <span className="flox-cta-choice-icon">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <span className="flox-cta-choice-body">
                  <span className="flox-cta-choice-eyebrow">Sofortkontakt</span>
                  <span className="flox-cta-choice-title">WhatsApp schreiben</span>
                  <span className="flox-cta-choice-copy">{company.phone}</span>
                </span>
                <span className="flox-cta-choice-arrow">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="flox-panel rounded-[2.2rem] px-7 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.25fr_0.9fr_0.9fr_0.95fr_1.05fr_0.85fr]">
            <div className="xl:border-r xl:border-slate-200/80 xl:pr-8">
              <Link href="/" className="text-2xl font-black tracking-[0.16em] text-slate-950" translate="no">
                FLOXANT
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-700">
                Umzug, Reinigung, Entrümpelung und Übergabevorbereitung mit klarer
                Abstimmung, realistischer Prüfung und sichtbaren nächsten Schritten.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="flox-metric">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-blue-700" />
                    Adresse
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-900">{company.address}</p>
                </div>

                <div className="flox-metric">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Direktkontakt
                  </div>
                  <div className="mt-3 space-y-1 text-sm font-semibold text-slate-900">
                    <a href={`mailto:${company.email}`} className="block hover:text-blue-700">
                      {company.email}
                    </a>
                    <a href={`tel:${company.phoneRaw}`} className="block hover:text-blue-700">
                      {company.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <FooterColumn title="Leistungen" items={serviceLinks} />
            <FooterColumn title="Direkte Wege" items={directLinks} />
            <FooterColumn title="Lokale Seiten" items={localLinks} />
            <FooterColumn title="Ratgeber" items={knowledgeLinks} />
            <FooterColumn title="Rechtliches" items={legalLinks} />
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200/90 pt-7 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                Versicherter Transport und saubere Planung
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                © 2026 FLOXANT
              </span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">{title}</div>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
          >
            <span>{item.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700" />
          </Link>
        ))}
      </div>
    </div>
  );
}
