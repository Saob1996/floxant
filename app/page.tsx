import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  Crown,
  MessageCircle,
  Sparkles,
  Trash2,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { LocalSeoSignalPanel } from "@/components/seo/LocalSeoSignalPanel";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { TrustFlowSection } from "@/components/seo/TrustFlowSection";
import { company } from "@/lib/company";
import { germanizeDeep, germanizeText } from "@/lib/german-text";
import { generatePageSEO } from "@/lib/seo";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

type RouteCard = {
  label: string;
  title: string;
  text: string;
  href: string;
  Icon: LucideIcon;
};

const coreServices: RouteCard[] = [
  {
    label: "Umzug",
    title: "Privat- und Firmenumzug",
    text: "Für Wohnungen, Häuser, Teams, Büros und klare Standortwechsel in Regensburg und Bayern.",
    href: "/umzug",
    Icon: Truck,
  },
  {
    label: "Reinigung",
    title: "Reinigung mit System",
    text: "Für Übergabe, laufende Betreuung, Gewerbeobjekte und saubere Wiederinbetriebnahme.",
    href: "/reinigung",
    Icon: Sparkles,
  },
  {
    label: "Entrümpelung",
    title: "Räumung und Entsorgung",
    text: "Für Wohnungsauflösung, Nachlass, Firmenflächen und geordnete Freimachung.",
    href: "/entruempelung",
    Icon: Trash2,
  },
  {
    label: "Preis prüfen",
    title: "Rechner oder Budget",
    text: "Wenn zuerst ein Gefühl für Aufwand, Rahmen und den passenden Anfrageweg gebraucht wird.",
    href: "/rechner",
    Icon: Banknote,
  },
];

const specialRoutes: RouteCard[] = [
  {
    label: "Direkter Pfad",
    title: "Buchung statt Sucherei",
    text: "Sauberer Einstieg für Kunden, die Umzug, Reinigung oder Entsorgung direkt anfragen wollen.",
    href: "/buchung",
    Icon: Zap,
  },
  {
    label: "B2B & Objektbetrieb",
    title: "Gewerbliche Reinigung",
    text: "Für Büro, Praxis, Hotel und Hausverwaltung mit festen Ansprechpartnern.",
    href: "/gewerbereinigung-regensburg",
    Icon: Building2,
  },
  {
    label: "Diskreter Sonderweg",
    title: "Private Client",
    text: "Für hochwertige sensible Projekte mit ruhiger Führung und exakter Abstimmung.",
    href: "/private-client-service",
    Icon: Crown,
  },
  {
    label: "Flexible Route",
    title: "Leer-Rückfahrt",
    text: "Freie Kapazität auf Rückfahrten für Transport ohne Vollumzug nutzen.",
    href: "/leerfahrt-rueckfahrt",
    Icon: Briefcase,
  },
];

const trustPoints = [
  { title: "Feste Ansprechpartner", text: "Nicht fünf Kanäle, sondern ein sauber geführter Kontakt mit klaren Zuständigkeiten." },
  { title: "Dokumentierter Leistungsumfang", text: "Was vereinbart ist, bleibt sichtbar. Gerade bei Gewerbe, Übergabe und Sonderfällen." },
  { title: "Keine Lockpreis-Hektik", text: "FLOXANT startet mit Vorprüfung, Aufwand und Preisgefühl statt mit leeren Versprechen." },
  { title: "Kombinierte Services", text: "Umzug, Reinigung, Entsorgung und Übergabe können in einer Logik zusammenlaufen." },
];

const regionLinks = [
  { label: "Regensburg", href: "/umzug-regensburg" },
  { label: "München", href: "/umzug-muenchen" },
  { label: "Nürnberg", href: "/umzug-nuernberg" },
  { label: "Augsburg", href: "/umzug-augsburg" },
  { label: "Passau", href: "/reinigung-passau" },
  { label: "Bayern & Orte", href: "/service-area-bayern" },
];

const faqItems = [
  {
    q: "Welche Leistungen übernimmt FLOXANT in Regensburg und Bayern?",
    a: "FLOXANT bündelt Umzug, Reinigung, Entrümpelung, Büroumzug, Gewerbereinigung, Firmenentsorgung, Leer-Rückfahrt und direkte Anfragewege in einem klar geführten System.",
  },
  {
    q: "Wie starte ich am schnellsten eine Anfrage?",
    a: "Für die meisten Fälle ist die Buchungsseite der direkteste Weg. Wenn Sie zuerst ein Preisgefühl möchten, passt der Rechner. Für sehr kurze Fälle eignet sich der Express-Check.",
  },
  {
    q: "Warum arbeitet FLOXANT mit Vorprüfung statt mit Schnell-Festpreis?",
    a: "Weil Umfang, Zugang, Strecke, Terminlage und Extras den echten Aufwand verändern. Eine saubere Vorprüfung ist ehrlicher und führt zu besseren Entscheidungen auf beiden Seiten.",
  },
  {
    q: "Ist FLOXANT nur in Regensburg aktiv?",
    a: "Regensburg ist der operative Kern. Von dort aus führt FLOXANT Einsätze in Bayern sauber weiter, wenn Strecke, Verfügbarkeit und Leistungsumfang sinnvoll zusammenpassen.",
  },
  {
    q: "Gibt es auch Wege für Gewerbe oder sensible Projekte?",
    a: "Ja. Für B2B-Reinigung gibt es eine eigene Seite, für diskrete Premium-Fälle den Private-Client-Pfad und für flexible Transporte die Leer-Rückfahrt.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "",
    title: "FLOXANT | Umzug, Reinigung und Entrümpelung in Regensburg und Bayern",
    description:
      "FLOXANT organisiert Umzug, Reinigung und Entrümpelung in Regensburg und Bayern mit klarer Vorprüfung, festen Ansprechpartnern und direktem Einstieg über Buchung, Rechner oder WhatsApp.",
    keywords: [
      "Umzug Regensburg",
      "Reinigung Regensburg",
      "Entrümpelung Regensburg",
      "Umzugsunternehmen Bayern",
      "Gewerbereinigung Regensburg",
      "Buchung Regensburg",
      "Rechner Umzug Reinigung Entrümpelung",
      "Leer-Rückfahrt Regensburg",
      "Private Client Umzug Bayern",
    ],
  });
}

export default function Home() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;
  const content = germanizeDeep({
    coreServices,
    specialRoutes,
    trustPoints,
    regionLinks,
    faqItems,
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Startseite",
        description:
          "Premium Service Operating System für Umzug, Reinigung und Entrümpelung in Regensburg und Bayern.",
        path: "/",
        about: [
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Gewerbereinigung",
          "Büroumzug",
          "Regensburg",
          "Bayern",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Umzug, Reinigung und Entrümpelung",
        description:
          "FLOXANT bündelt Umzug, Reinigung, Entrümpelung, Büroumzug und direkte Anfragewege mit operativem Kern in Regensburg und Einsatzgebiet Bayern.",
        path: "/",
        serviceType: "Umzug, Reinigung und Entrümpelung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildFaqJsonLd(content.faqItems),
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="ueberblick" className="relative overflow-hidden px-6 pb-16 pt-12 lg:pb-20 lg:pt-18">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="moving" density="soft" mode="hero" className="opacity-30" />
        </div>

        <div className="flox-shell relative">
          <div className="flox-panel rounded-[2.4rem] px-6 py-7 sm:px-9 sm:py-9 xl:px-10 xl:py-10">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
              <div>
                <div className="flox-kicker">Premium Service Operating System</div>

                <h1 className="mt-7 flox-title-xl flox-display-hero max-w-[14ch] text-slate-950">
                  Umzug, Reinigung und Entrümpelung in Regensburg und Bayern.
                </h1>

                <p className="flox-body mt-5 max-w-2xl">
                  FLOXANT führt Anfragen, Preisgefühl und Durchführung so, wie lokale Dienstleisterseiten
                  es fast nie tun: klar, direkt, operativ präzise und ohne Vergleichsportal-Hektik.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/buchung" className="flox-button-primary px-6">
                    Anfrage starten
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/rechner" className="flox-button-secondary px-6">
                    Preis prüfen
                  </Link>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-button-quiet px-6">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["Regensburg zuerst", "Operative Basis mit kurzen Wegen und echter Erreichbarkeit."],
                  ["Bayern aktiv", "Einsätze werden regional sinnvoll statt wahllos geführt."],
                  ["Sauber dokumentiert", "Leistung, Übergabe und nächster Schritt bleiben sichtbar."],
                ].map(([label, text]) => (
                  <div key={label} className="flox-metric">
                    <div className="flox-metric-label">{label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decision Bar */}
          <div className="mt-5 grid gap-3 lg:grid-cols-5">
            {[
              { label: "Umzug", href: "/umzug" },
              { label: "Reinigung", href: "/reinigung" },
              { label: "Entrümpelung", href: "/entruempelung" },
              { label: "Preis prüfen", href: "/rechner" },
              { label: "Direkt anfragen", href: "/buchung" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flox-panel group rounded-[1.35rem] px-4 py-4 transition hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE ARCHITECTURE ──────────────────────────────── */}
      <section id="leistungen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Service-Architektur</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[16ch] text-slate-950">
              Drei Kernsysteme. Mehrere direkte Wege. Ein sauber geführter Ablauf.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 xl:grid-cols-4">
            {content.coreServices.map((route) => {
              const Icon = route.Icon;
              return (
                <article key={route.title} className="flox-panel rounded-[1.8rem] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {route.label}
                  </div>
                  <h3 className="mt-3 text-[1.5rem] font-bold tracking-tight text-slate-950">{route.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{route.text}</p>
                  <Link href={route.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                    Weiter
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICE SYSTEMS + TRUST (merged) ──────────────────── */}
      <section id="preis" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.03fr_0.97fr]">
          <article className="flox-panel-dark rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Sofortiger Einstieg</div>
            <h2 className="mt-6 max-w-[15ch] text-[clamp(2rem,4vw,3.4rem)] font-bold flox-display-section text-white">
              Nicht jeder Kunde braucht denselben Weg.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              FLOXANT trennt direkte Anfrage, Preisgefühl, B2B-Reinigung und Premium-Fälle
              sauber voneinander, statt alles in einem einzigen Formular zu verstecken.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.specialRoutes.map((item) => {
                const Icon = item.Icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-[1.3rem] border border-white/10 bg-white/6 px-4 py-4 transition hover:border-cyan-300/30 hover:bg-white/8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] bg-white/8 text-cyan-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 text-slate-400" />
                    </div>
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                      {item.label}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                  </Link>
                );
              })}
            </div>
          </article>

          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Warum FLOXANT</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[15ch] text-slate-950">
              Weniger Reibung. Mehr Klarheit. Bessere Entscheidungen.
            </h2>
            <div className="mt-6 flox-list-compact">
              {content.trustPoints.map((item, index) => (
                <div key={item.title} className="flox-list-item">
                  <span className="flox-list-step">{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-700">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── OPERATIONS PROOF ──────────────────────────────────── */}
      <section id="ablauf" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-2">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Ablauf</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[16ch] text-slate-950">
              Vertrauen entsteht durch Struktur, nicht durch Lautstärke.
            </h2>
            <div className="mt-6 space-y-3">
              {[
                "Service und passenden Einstieg wählen.",
                "Objekt, Umfang, Strecke, Turnus oder Extras sauber erfassen.",
                "FLOXANT prüft die Anfrage und meldet sich mit Angebot oder Rückruf.",
                "Erst danach werden Termin, Team und Durchführung verbindlich abgestimmt.",
              ].map((step, index) => (
                <div key={step} className="flox-list-item">
                  <span className="flox-list-step">{index + 1}</span>
                  <span className="text-sm font-semibold leading-7 text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Operative Stärke</div>
            <h2 className="mt-6 flox-title-lg flox-display-section max-w-[15ch] text-slate-950">
              FLOXANT denkt kombinierte Services von Anfang an mit.
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "Direktbuchung, Rechner, WhatsApp und Budget greifen kontrolliert ineinander.",
                "B2B-Reinigung, Leer-Rückfahrt und Private Client sind eigene starke Wege.",
                "Regionale Führung ab Regensburg macht Übergabe und Abstimmung realistischer.",
                "Schlüsselübergabe, Halteverbotszone und Protokoll sind von Anfang an eingeplant.",
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── REGION + FAQ ──────────────────────────────────────── */}
      <TrustFlowSection sectionId="vertrauen" />
      <LocalSeoSignalPanel sectionId="lokales-signal" />

      <section id="region" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Region</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Regensburg ist der Kern. Bayern bleibt das klare Einsatzgebiet.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Diese Klarheit hilft Kunden und Suchmaschinen gleichermaßen, FLOXANT als
              lokales Service-System mit echter operativer Basis zu verstehen.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.regionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </article>

          <div className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">FAQ</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Häufige Fragen zu Anfrage, Preis und Einsatzgebiet.
            </h2>
            <div className="mt-6 grid gap-3">
              {content.faqItems.map((item) => (
                <details key={item.q} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section id="kontakt" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="flox-panel-dark rounded-[2.4rem] px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Direkt anfragen</div>
                <h2 className="mt-6 max-w-[15ch] text-[clamp(2.2rem,4vw,4rem)] font-bold flox-display-hero text-white">
                  Der nächste Schritt soll sich klar anfühlen, nicht laut.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  Wenn Sie schon wissen, was ansteht, starten Sie direkt über die Buchung.
                  Wenn Sie erst ein Preisgefühl brauchen, nehmen Sie den Rechner. Wenn es schnell gehen muss,
                  nutzen Sie WhatsApp oder den Express-Check.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/buchung" className="flox-button-primary min-h-[5.6rem] rounded-[1.4rem] px-5 text-left normal-case tracking-normal">
                  <span className="w-full">
                    <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/74">
                      Hauptpfad
                    </span>
                    <span className="mt-2 block text-xl font-black tracking-tight">Buchung starten</span>
                  </span>
                </Link>
                <Link href="/rechner" className="flox-button-secondary min-h-[5.6rem] rounded-[1.4rem] border-white/12 bg-white/6 px-5 text-left normal-case tracking-normal text-white">
                  <span className="w-full">
                    <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                      Vorprüfung
                    </span>
                    <span className="mt-2 block text-xl font-black tracking-tight">Rechner nutzen</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
