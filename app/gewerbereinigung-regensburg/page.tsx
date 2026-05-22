import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardList,
  DoorOpen,
  Landmark,
  MessageCircle,
  Sparkles,
  Stethoscope,
  Users,
  Workflow,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCleaningLeadForm } from "@/components/CommercialCleaningLeadForm";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    q: "Für welche Objekte bietet FLOXANT die Gewerbereinigung an?",
    a: "FLOXANT betreut vor allem Büros, Kanzleien, Praxen, Ärztehäuser, Hotels, Hausverwaltungen und andere gewerbliche Flächen in Regensburg und Umgebung.",
  },
  {
    q: "Ist die Anfrage auf dieser Seite unverbindlich?",
    a: "Ja. Sie senden zuerst die Eckdaten zu Objekt, Turnus, Zugang und Leistungsumfang. Danach prüfen wir die Anfrage und melden uns mit Rückfrage, Angebot oder passendem nächsten Schritt zurück.",
  },
  {
    q: "Ist Reinigung auch außerhalb der Öffnungszeiten möglich?",
    a: "Ja, wenn Objekt, Zugang und Ablauf dazu passen. Viele Unternehmen wünschen frühe, späte oder betriebsruhige Zeitfenster.",
  },
  {
    q: "Warum gibt es keinen öffentlichen Schnellpreis?",
    a: "Weil seriöse gewerbliche Reinigung von Fläche, Nutzung, Turnus, Zugang und Leistungsbild abhängt. FLOXANT prüft das lieber sauber vor, damit das Angebot zu Ihrem Objekt passt.",
  },
  {
    q: "Können auch sensible Situationen abgestimmt werden?",
    a: "Ja. Bei Nachlass, Trennung, diskreten Auszügen oder belastenden Übergaben sprechen wir zuerst persönlich über Umfang, Zugang und das passende Vorgehen.",
  },
];

const targetGroups = [
  {
    title: "Büros & Kanzleien",
    text: "Regelmäßige Reinigung für Arbeitsplätze, Besprechungsräume, Küchen und Sanitärbereiche.",
    Icon: Building2,
  },
  {
    title: "Praxen & Ärztehäuser",
    text: "Saubere Abläufe für Empfang, Wartebereich, Personalflächen und Verwaltungszonen.",
    Icon: Stethoscope,
  },
  {
    title: "Hotels & Objekte",
    text: "Verlässliche Reinigung für Lobby, Flure, Allgemeinflächen und objektnahe Bereiche.",
    Icon: Workflow,
  },
  {
    title: "Hausverwaltung",
    text: "Planbare Reinigung für Treppenhäuser, Eingänge, Aufzüge und Gemeinschaftsflächen.",
    Icon: Landmark,
  },
];

const serviceScope = [
  "Unterhaltsreinigung",
  "Hotelreinigung",
  "Büroreinigung",
  "Sanitärreinigung",
  "Küchen- & Pausenbereich",
  "Bodenpflege & Hartbodenreinigung",
  "Glasflächen (optional)",
  "Sonderreinigung nach Absprache",
];

const processSteps = [
  { step: "1", label: "Anfrage senden", text: "Objektart, Fläche und Turnus kurz beschreiben." },
  { step: "2", label: "Objekt einschätzen", text: "Wir prüfen Zugang, Umfang und Zeitfenster." },
  { step: "3", label: "Angebot erhalten", text: "Klares Angebot oder gezielte Rückfrage." },
  { step: "4", label: "Starttermin", text: "Gemeinsam den Beginn verbindlich festlegen." },
  { step: "5", label: "Laufende Betreuung", text: "Feste Ansprechpartner und regelmäßige Abstimmung." },
];

const trustSignals = [
  { title: "Feste Ansprechpartner", text: "Sie wissen, mit wem Sie sprechen. Wir wissen, wie Ihr Objekt organisiert ist.", Icon: Users },
  { title: "Dokumentierter Leistungsumfang", text: "Was vereinbart ist, bleibt sichtbar und nachvollziehbar.", Icon: ClipboardList },
  { title: "Regelmäßige Abstimmung", text: "Qualität wird nicht vermutet, sondern gemeinsam überprüft.", Icon: BadgeCheck },
  { title: "Auch außerhalb der Öffnungszeiten", text: "Frühe, späte oder betriebsruhige Zeitfenster nach Absprache.", Icon: DoorOpen },
];

/* ------------------------------------------------------------------ */
/*  METADATA                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "gewerbereinigung-regensburg",
    title: "Gewerbereinigung Regensburg | Büro, Hotel, Praxis & B2B | FLOXANT",
    description:
      "Gewerbereinigung, Büroreinigung und Hotelreinigung in Regensburg für B2B, Praxen, Kanzleien und Hausverwaltungen. Objekt, Turnus und Fotos direkt senden.",
    keywords: [
      "Gewerbereinigung Regensburg",
      "Büroreinigung Regensburg",
      "Praxisreinigung Regensburg",
      "Unterhaltsreinigung Regensburg",
      "Reinigungsfirma Regensburg",
      "gewerbliche Reinigung Regensburg",
      "Objektreinigung Regensburg",
      "Kanzleireinigung Regensburg",
      "Hotelreinigung Regensburg",
      "B2B Reinigung Regensburg",
    ],
  });
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function GewerbereinigungRegensburgPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
      ]),
      buildServiceJsonLd({
        name: "Gewerbereinigung Regensburg",
        description:
          "Gewerbereinigung für Büros, Praxen, Kanzleien, Hotels, Hausverwaltungen und Objektbetrieb in Regensburg und Umgebung.",
        path: "/gewerbereinigung-regensburg",
        serviceType:
          "Gewerbereinigung, Unterhaltsreinigung, Büroreinigung, Praxisreinigung und Objektservice in Regensburg",
        areaServed: ["Regensburg", "Regensburg Umgebung"],
      }),
      buildWebPageJsonLd({
        name: "Gewerbereinigung in Regensburg für Büro, Praxis und Objektbetrieb",
        description:
          "Angebotsseite für gewerbliche Reinigung in Regensburg und Umgebung.",
        path: "/gewerbereinigung-regensburg",
        about: [
          "Gewerbereinigung",
          "Büroreinigung",
          "Hotelreinigung",
          "B2B-Reinigung",
          "Praxisreinigung",
          "Unterhaltsreinigung",
          "Regensburg",
        ],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten eine gewerbliche Reinigung in Regensburg anfragen. Es geht um [Büro/Hotel/Praxis/Kanzlei/Objekt]. Fläche, Turnus, Zeitfenster und Fotos können wir senden.",
  )}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Reinigung", href: "/reinigung" },
          { label: "Gewerbereinigung Regensburg" },
        ]}
      />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section id="ueberblick" className="relative overflow-hidden px-6 pb-16 pt-6 lg:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="cleaning" density="soft" mode="hero" className="opacity-20" />
        </div>

        <div className="flox-shell relative">
          <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr] xl:items-start">
            {/* Left: Content */}
            <div className="flox-panel rounded-[2.2rem] px-6 py-7 md:px-9 md:py-9">
              <div className="flox-kicker">
                <Sparkles className="h-4 w-4" />
                Gewerbereinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[17ch] text-[clamp(2.2rem,4.4vw,4rem)] font-bold leading-[0.96] tracking-tight text-slate-950">
                Gewerbereinigung für Büro, Hotel und Praxis in Regensburg
              </h1>

              <p className="mt-5 max-w-[56ch] text-base leading-8 text-slate-700">
                Klare Abstimmung, feste Ansprechpartner und dokumentierter Leistungsumfang
                für Büros, Praxen, Kanzleien, Hotels und Hausverwaltungen in Regensburg und Umgebung.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {["Büro", "Hotel", "Praxis", "B2B"].map((item) => (
                  <span key={item} className="flox-chip">{item}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#kontaktformular" className="flox-button-primary px-6">
                  Angebot anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-button-secondary px-6">
                  <MessageCircle className="h-4 w-4" />
                  Per WhatsApp fragen
                </a>
              </div>
            </div>

            {/* Right: Operations visual */}
            <div className="flox-panel-dark rounded-[2.2rem] px-5 py-5 md:px-6 md:py-6">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-5 py-5">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                  Objektübersicht
                </div>
                <p className="mt-2 text-[1.1rem] font-bold leading-7 text-white">
                  So sieht ein sauber geführtes Reinigungsobjekt aus.
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Objektart", "Büro · 280 m²"],
                  ["Intervall", "2× wöchentlich"],
                  ["Zustand", "Laufende Betreuung"],
                  ["Ansprechpartner", "Festgelegt"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3.5">
                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</div>
                    <div className="mt-1.5 text-sm font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.2rem] border border-cyan-400/16 bg-gradient-to-r from-blue-500/12 to-cyan-400/10 px-5 py-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Ergebnis
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  Dokumentierte Leistung, regelmäßige Abstimmung, keine Überraschungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ENTSCHEIDUNGSMODUL ──────────────────────────────── */}
      <section id="zielgruppen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Was soll gereinigt werden?</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Gewerbliche Reinigung für echte Objektlogik statt leere Schlagworte.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {targetGroups.map((card) => {
              const Icon = card.Icon;
              return (
                <article key={card.title} className="flox-panel rounded-[1.75rem] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-[1.35rem] font-bold tracking-tight text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. LEISTUNGSUMFANG ─────────────────────────────────── */}
      <section id="leistungen" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Leistungsumfang</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Was FLOXANT bei gewerblicher Reinigung konkret übernimmt.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {serviceScope.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Warum FLOXANT</div>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.07em] text-white">
              Nicht der billigste Putzdienst, sondern ein verlässliches System.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Gewerbliche Reinigung funktioniert nur mit klarer Abstimmung, dokumentiertem
              Leistungsumfang und regelmäßiger Qualitätsprüfung. Genau das liefert FLOXANT.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#kontaktformular" className="flox-button-primary px-6">
                Angebot anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/rechner" className="flox-button-secondary border-white/12 bg-white/6 px-6 text-white">
                Preis prüfen
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── 4. PROZESS ─────────────────────────────────────────── */}
      <section id="ablauf" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Ablauf</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Von der Anfrage bis zur laufenden Betreuung in fünf klaren Schritten.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {processSteps.map((item) => (
              <article key={item.step} className="flox-panel rounded-[1.6rem] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-700">
                  {item.step}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-950">{item.label}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TRUST / QUALITÄT ────────────────────────────────── */}
      <section id="qualitaet" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-2">
          {trustSignals.map((signal) => {
            const Icon = signal.Icon;
            return (
              <article key={signal.title} className="flox-panel rounded-[1.75rem] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{signal.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{signal.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── 6. LOKALER SEO-BLOCK ───────────────────────────────── */}
      <section id="region" className="flox-section pt-0">
        <div className="flox-shell grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Region</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Regensburg und Umgebung klar im Fokus.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              FLOXANT ist kein bundesweiter Reinigungskonzern, sondern ein regional
              geführtes Unternehmen mit operativer Basis in Regensburg. Das macht
              Abstimmung, Erreichbarkeit und Reaktionszeit verlässlicher als bei
              überregionalen Anbietern.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {["Regensburg", "Neutraubling", "Lappersdorf", "Barbing", "Wenzenbach", "Umgebung"].map((item) => (
                <span key={item} className="flox-chip">{item}</span>
              ))}
            </div>
          </article>

          <article className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">Für wen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Gewerbliche Flächen, die verlässliche Reinigung verdienen.
            </h2>
            <div className="mt-6 space-y-3">
              {[
                "Büros und Kanzleien mit laufender Nutzung",
                "Praxen und Ärztehäuser mit festen Abläufen",
                "Hausverwaltungen mit mehreren Einheiten",
                "Hotels und Objektbetrieb mit klaren Standards",
              ].map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="flox-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker">FAQ</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Häufige Fragen zur Gewerbereinigung in Regensburg.
            </h2>
            <div className="mt-6 grid gap-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                  <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA + LEAD FORM ──────────────────────────── */}
      <section id="kontakt" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="mb-10 text-center">
            <div className="flox-kicker">Gewerbereinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Angebot für Ihr Objekt in Regensburg und Umgebung.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Senden Sie Objektart, Fläche, Intervall, Zugang und Wunschstart. Danach meldet sich
              FLOXANT mit Rückfrage, Angebot oder dem passenden nächsten Schritt.
            </p>
          </div>

          <div id="kontaktformular" className="flox-panel rounded-[2rem] p-4 md:p-6">
            <CommercialCleaningLeadForm />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-button-secondary rounded-[1.3rem] px-5 py-4 text-left normal-case tracking-normal">
              <span className="w-full">
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Direkter Draht
                </span>
                <span className="mt-2 block text-lg font-bold tracking-tight text-slate-950">Per WhatsApp fragen</span>
              </span>
            </a>

            <Link href="/buchung" className="flox-button-primary rounded-[1.3rem] px-5 py-4 text-left normal-case tracking-normal">
              <span className="w-full">
                <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/74">
                  Alternativer Weg
                </span>
                <span className="mt-2 block text-lg font-bold tracking-tight">Allgemeine Buchung öffnen</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
