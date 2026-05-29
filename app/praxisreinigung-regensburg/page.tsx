import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  DoorOpen,
  FileText,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCleaningLeadForm } from "@/components/CommercialCleaningLeadForm";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export const revalidate = 3600;

const pagePath = "/praxisreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Praxisreinigung Regensburg",
    title: "Praxis sauber halten, ohne den Betrieb zu stören",
    text: "Für Empfang, Wartebereich, Büro, Personalraum, Sanitär und Nebenflächen nach klarer Raumliste.",
    Icon: Stethoscope,
  },
  {
    phrase: "Arztpraxis Reinigung Regensburg",
    title: "Anfrage mit Fläche, Turnus und Zeitfenster",
    text: "Praxisinhaber senden Quadratmeter, Räume, Öffnungszeiten, Zugang, Fotos und gewünschte Häufigkeit.",
    Icon: FileText,
  },
  {
    phrase: "Praxisreinigung Angebot Regensburg",
    title: "Realistisches Angebot statt Pauschalpreis",
    text: "Kosten hängen von Nutzung, Sanitär, Wartebereich, Boden, Randzeiten, Zugang und Leistungsumfang ab.",
    Icon: CalendarClock,
  },
  {
    phrase: "Reinigung Praxisräume Regensburg",
    title: "Normale Objektpflege klar abgrenzen",
    text: "FLOXANT prüft allgemeine Praxisflächenreinigung, aber keine medizinische Spezialdesinfektion ohne gesonderte Prüfung.",
    Icon: ShieldCheck,
  },
];

const practiceZones = [
  {
    label: "Empfang & Wartebereich",
    text: "Sichtbare Flächen, Boden, Laufwege, Sitzbereiche, Papierkörbe und gepflegter erster Eindruck.",
    Icon: Users,
  },
  {
    label: "Büro & Verwaltung",
    text: "Schreibtische nach Absprache, Ablagen, Flure, Türen, Böden und allgemeine Arbeitsbereiche.",
    Icon: ClipboardCheck,
  },
  {
    label: "Personalraum",
    text: "Küche, Pausenfläche, Tische, erreichbare Oberflächen, Müll und Boden nach vereinbartem Turnus.",
    Icon: DoorOpen,
  },
  {
    label: "Sanitär & Nebenflächen",
    text: "WC, Waschbecken, Spiegel, Armaturen, Verbrauchsmaterial nach Absprache, Flure und Nebenräume.",
    Icon: ShieldCheck,
  },
];

const cadenceOptions = [
  {
    label: "Täglich",
    text: "Für stark frequentierte Praxen mit viel Patientenverkehr, Sanitär und sichtbaren Kontaktflächen.",
  },
  {
    label: "Mehrmals pro Woche",
    text: "Für kleinere Praxisflächen mit festen Tagen, klaren Bereichen und planbaren Öffnungszeiten.",
  },
  {
    label: "Nach Praxisschluss",
    text: "Wenn Schlüssel, Alarm, Verantwortliche, Zugang und Zeitfenster sauber abgestimmt sind.",
  },
  {
    label: "Zusatztermin",
    text: "Für Grundreinigung, Übergabe, Umbauphase, Sondertermin oder starke Beanspruchung nach Fotos.",
  },
];

const requestChecklist = [
  "Praxis-Adresse in Regensburg",
  "Fachrichtung oder Objektart",
  "Quadratmeter und Raumliste",
  "Empfang, Wartebereich, Büro und Sanitär",
  "Gewünschter Turnus",
  "Öffnungszeiten und Zeitfenster",
  "Schlüssel, Alarm und Ansprechpartner",
  "Fotos oder kurzer Rundgang",
];

const trustSignals = [
  "Raumliste statt unklarer Pauschale",
  "Zeitfenster passend zum Praxisbetrieb",
  "Fotos oder Rundgang für realistische Einordnung",
  "klare Trennung von Reinigung und medizinischer Spezialleistung",
  "Ansprechpartner und Zugang vor Start geklärt",
  "keine Preiszusage ohne Objektprüfung",
];

const boundaries = [
  "keine medizinische Spezialdesinfektion ohne gesonderte Prüfung",
  "keine Reinraum- oder Laborreinigung",
  "keine Krankenhausreinigung",
  "keine Entsorgung medizinischer Abfälle",
  "keine sterile Aufbereitung von Instrumenten",
  "keine Hygienezertifizierung oder Audit-Zusage",
];

const faqItems = [
  {
    q: "Was kostet Praxisreinigung in Regensburg?",
    a: "Die Kosten hängen von Fläche, Raumliste, Nutzung, Turnus, Wartebereich, Sanitär, Boden, Zugang, Zeitfenster und gewünschtem Leistungsumfang ab. Für eine realistische Prüfung braucht FLOXANT Praxisart, Quadratmeter, Häufigkeit, Fotos oder eine kurze Beschreibung.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Praxisreinigung-Angebot?",
    a: "Wichtig sind Adresse, Praxisart, Fläche, Räume, Empfang, Wartebereich, Sanitär, Personalraum, Bodenart, Öffnungszeiten, gewünschter Turnus, Zugang, Ansprechpartner und Fotos. Je konkreter die Anfrage, desto schneller wird die Rückmeldung.",
  },
  {
    q: "Ist Praxisreinigung nach Praxisschluss möglich?",
    a: "Ja, wenn Schlüsselzugang, Alarmanlage, Verantwortliche, Zeitfenster und Ablauf sauber geklärt sind. Viele Praxisanfragen laufen früh, spät oder in betriebsruhigen Zeiten.",
  },
  {
    q: "Übernimmt FLOXANT medizinische Spezialdesinfektion?",
    a: "Diese Seite bewirbt allgemeine Praxisflächenreinigung nach Absprache. Medizinische Spezialdesinfektion, Reinraumleistung, Laborreinigung, Instrumentenaufbereitung oder Entsorgung medizinischer Abfälle werden nicht pauschal zugesagt.",
  },
  {
    q: "Welche Praxisflächen können angefragt werden?",
    a: "Möglich sind zum Beispiel Empfang, Wartebereich, Büro, Personalraum, Sanitär, Flure und Nebenflächen. Behandlungsbereiche werden nur nach genauer Beschreibung, Leistungsgrenze und Objektprüfung eingeordnet.",
  },
];

const relatedLinks = [
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
  { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
  { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
  { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/bueroreinigung-regensburg", label: "Büroreinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl", label: "Ratgeber Reinigungsfirma" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "praxisreinigung-regensburg",
    title: "Praxisreinigung Regensburg | Angebot & Turnus | FLOXANT",
    description:
      "Praxisreinigung in Regensburg für Empfang, Wartebereich, Büro, Sanitär und Nebenflächen. Turnus, Zeitfenster, Fotos und Angebot prüfen.",
    keywords: [
      "Praxisreinigung Regensburg",
      "Arztpraxis Reinigung Regensburg",
      "Praxisreinigung Angebot Regensburg",
      "Reinigung Praxisräume Regensburg",
      "Reinigungsfirma Praxis Regensburg",
      "Praxis Unterhaltsreinigung Regensburg",
      "Praxisreinigung nach Praxisschluss Regensburg",
      "Wartebereich Reinigung Regensburg",
      "Praxisräume reinigen Regensburg",
    ],
  });
}

export default function PraxisreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Praxisreinigung in Regensburg anfragen. Praxisart, Fläche, Räume, Turnus, Zeitfenster und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
        { name: "Praxisreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Praxisreinigung Regensburg",
        description:
          "Allgemeine Praxisreinigung in Regensburg für Empfang, Wartebereich, Büro, Personalraum, Sanitär und Nebenflächen nach Fläche, Raumliste, Turnus, Zeitfenster, Zugang und Fotos.",
        path: pagePath,
        serviceType:
          "Praxisreinigung, Praxis-Unterhaltsreinigung, Arztpraxis Reinigung und gewerbliche Reinigung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Praxisreinigung Regensburg für Empfang, Wartebereich und Nebenflächen",
        description:
          "Kundennaher Einstieg für Praxisreinigung in Regensburg mit Angebot, Turnus, Leistungsgrenzen, Anfragecheckliste, FAQ und direktem B2B-Formular.",
        path: pagePath,
        about: [
          "Praxisreinigung Regensburg",
          "Arztpraxis Reinigung Regensburg",
          "Praxisreinigung Angebot",
          "Praxis Unterhaltsreinigung",
          "Reinigung Praxisräume",
          "Wartebereich Reinigung",
          "Reinigung nach Praxisschluss",
        ],
        potentialActions: [
          { name: "Praxisreinigung anfragen", target: `${pagePath}#kontakt`, type: "ContactAction" },
          { name: "Praxisreinigung per WhatsApp anfragen", target: whatsappUrl, type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Kundensuchen zur Praxisreinigung Regensburg",
        itemListElement: customerIntents.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.phrase,
          description: item.text,
        })),
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-24 text-slate-900 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Reinigung", href: "/reinigung" },
          { label: "Gewerbereinigung Regensburg", href: "/gewerbereinigung-regensburg" },
          { label: "Praxisreinigung Regensburg" },
        ]}
      />

      <section id="ueberblick" className="relative overflow-hidden px-6 pb-12 pt-6 lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="cleaning" density="soft" mode="hero" className="opacity-15" />
        </div>

        <div className="flox-shell relative">
          <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr] xl:items-stretch">
            <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-9 md:py-9">
              <div className="flox-kicker">
                <Stethoscope className="h-4 w-4" />
                Praxisreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[17ch] text-[clamp(2.1rem,4.3vw,4rem)] font-black leading-[0.98] text-slate-950">
                Saubere Praxisflächen, klare Zeiten, ruhiger Ablauf.
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Praxisreinigung in Regensburg nach Praxisart,
                Fläche, Raumliste, Empfang, Wartebereich, Sanitär, Personalraum,
                Turnus, Zeitfenster, Zugang und Fotos. Ideal für Praxen, die
                zuverlässige Objektpflege suchen und die Leistungsgrenzen sauber
                geklärt haben möchten.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Praxisreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Kundensuchen", "#kunden-suchen"],
                  ["Praxisbereiche", "#bereiche"],
                  ["Turnus", "#turnus"],
                  ["Checkliste", "#anfrage-checkliste"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="flox-chip hover:border-blue-200 hover:bg-blue-50">
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#kontakt" className="flox-button-primary px-6">
                  Praxisreinigung anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-button-secondary px-6">
                  <MessageCircle className="h-4 w-4" />
                  Per WhatsApp senden
                </a>
              </div>
            </article>

            <aside className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop"
                alt="Heller Empfangsbereich als Beispiel für Praxisreinigung in Regensburg"
                fill
                priority
                sizes="(min-width: 1280px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/10" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 md:p-8">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-2 text-[10px] font-black uppercase text-white">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Anfrage nach Praxisablauf
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                    Gute Praxisreinigung beginnt mit Raumliste, Öffnungszeiten und klaren Grenzen.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Turnus", "passend"],
                      ["Zugang", "geklärt"],
                      ["Grenzen", "klar"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[1rem] border border-white/15 bg-white/12 px-4 py-3">
                        <p className="text-[10px] font-black uppercase text-white/70">{label}</p>
                        <p className="mt-1 text-sm font-black text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="kunden-suchen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Kundensuchen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Die Seite spricht die Wörter an, mit denen Praxisinhaber suchen.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Viele Kunden wollen keine allgemeine Gebaeudereinigung. Sie suchen
              Praxisreinigung Regensburg, Arztpraxis Reinigung, Angebot, Turnus,
              Wartebereich, Sanitär und Reinigung nach Praxisschluss.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {customerIntents.map((item) => {
              const Icon = item.Icon;
              return (
                <article key={item.phrase} className="flox-panel rounded-[1.5rem] p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-[11px] font-black uppercase text-blue-700">
                    {item.phrase}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="bereiche" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Praxisbereiche</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Praxisreinigung wird besser, wenn Bereiche und Grenzen klar sind.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {practiceZones.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.label} className="rounded-[1.2rem] border border-slate-200 bg-white px-5 py-5">
                    <Icon className="h-6 w-6 text-blue-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Vertrauen</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Praxisanfragen brauchen präzise Angaben statt großer Versprechen.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              FLOXANT fragt bewusst nach Praxisart, Räumen, Öffnungszeiten,
              Turnus und Leistungsgrenzen. So entstehen bessere Anfragen und
              weniger Missverständnisse.
            </p>
            <div className="mt-6 grid gap-3">
              {trustSignals.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-7 text-slate-200">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="turnus" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Turnus & Zeitfenster</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Der richtige Rhythmus hängt von Patientenverkehr, Öffnungszeiten und Flächen ab.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cadenceOptions.map((item) => (
              <article key={item.label} className="flox-panel rounded-[1.5rem] p-6">
                <Clock className="h-6 w-6 text-blue-700" />
                <h3 className="mt-5 text-xl font-black text-slate-950">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="anfrage-checkliste" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Anfrage-Checkliste</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Diese Angaben machen aus einer Suche eine prüfbare Anfrage.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Für Praxisreinigung zählen Quadratmeter, aber nicht allein. Erst
              mit Praxisart, Raumliste, Öffnungszeiten, Zugang und Fotos kann
              FLOXANT sauber prüfen, ob ein Angebot realistisch ist.
            </p>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {requestChecklist.map((item) => (
              <div key={item} className="flox-panel flex items-start gap-3 rounded-[1.3rem] p-5">
                <Camera className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <span className="text-sm font-bold leading-7 text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Haeufige Fragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kurze Antworten fuer eine bessere Anfrage.
            </h2>
            <div className="mt-7 grid gap-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                  <summary className="cursor-pointer list-none text-base font-bold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Grenzen</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Was Praxisreinigung nicht automatisch enthält.
            </h2>
            <div className="mt-6 space-y-3">
              {boundaries.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-7 text-slate-200">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase text-blue-700">Passende nächste Wege</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Interne Links für Regensburg-Praxisreinigung.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="flox-chip hover:border-blue-200 hover:bg-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="mb-10 text-center">
            <div className="flox-kicker">Praxisreinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Praxisart, Räume, Turnus und Zeitfenster senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Adresse, Praxisart,
              Quadratmeter, Raumliste, Öffnungszeiten, gewünschter Turnus,
              Zugang und ein paar Fotos.
            </p>
          </div>

          <CommercialCleaningLeadForm />
        </div>
      </section>
    </main>
  );
}
