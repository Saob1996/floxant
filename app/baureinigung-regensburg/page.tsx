import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  DoorOpen,
  FileText,
  Home,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Timer,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCleaningLeadForm } from "@/components/CommercialCleaningLeadForm";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { RegensburgCleaningBuyerPath } from "@/components/RegensburgCleaningBuyerPath";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";


const pagePath = "/baureinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Baureinigung Regensburg",
    title: "Nach Handwerkern wieder nutzbar werden",
    text: "Für Wohnung, Büro, Praxis, Gewerbefläche oder Objekt nach Renovierung, Sanierung, Umbau oder Ausbau.",
    Icon: Sparkles,
  },
  {
    phrase: "Bauendreinigung Regensburg",
    title: "Vor Übergabe, Einzug oder Nutzung sauber prüfen",
    text: "FLOXANT ordnet Endzustand, Reststaub, Boden, Fenster, Türen, Termin, Zugang und Fotos vorab ein.",
    Icon: ClipboardCheck,
  },
  {
    phrase: "Baufeinreinigung Regensburg",
    title: "Feinstaub, Kanten und sichtbare Flächen",
    text: "Wenn grobe Arbeiten fertig sind, zählen Details: Leisten, Rahmen, Ablagen, Laufwege und erreichbare Oberflächen.",
    Icon: Camera,
  },
  {
    phrase: "Reinigung nach Renovierung Regensburg",
    title: "Wenn Handwerkerstaub überall sitzt",
    text: "Typische Anlässe sind Renovierungsreinigung, Staub entfernen, Wohnung nach Sanierung reinigen oder sauber vor Übergabe.",
    Icon: Home,
  },
];

const serviceAreas = [
  { label: "Baustaub & Flächen", text: "Staub, Laufwege, Türen, Leisten, Ablagen und erreichbare Oberflächen nach Zustand.", Icon: Sparkles },
  { label: "Boden & Kanten", text: "Hartböden, Ecken, Ränder, Schutzspuren und sichtbare Laufbereiche nach Materialprüfung.", Icon: CheckCircle2 },
  { label: "Fensterrahmen & Glas", text: "Fenster, Rahmen, Falze oder Glasflächen werden separat nach Fotos und Zugang eingeordnet.", Icon: DoorOpen },
  { label: "Übergabe & Einzug", text: "Vor Abnahme, Schlüsselübergabe, Einzug, Besichtigung oder Objektstart mit klarer Checkliste.", Icon: KeyRound },
];

const decisionSignals = [
  {
    title: "Bauzustand nennen",
    text: "Ist es Renovierung, Sanierung, Neubau, Umbau oder einzelne Handwerkerarbeit? Das verändert Aufwand und Reihenfolge.",
    Icon: Building2,
  },
  {
    title: "Fotos vorab senden",
    text: "Bilder von Boden, Staub, Fenstern, Bad, Küche, Zugang und Restmaterial sparen Rückfragen und falsche Erwartungen.",
    Icon: Camera,
  },
  {
    title: "Material & Sonderstellen",
    text: "Farbe, Silikon, Zement, Kleber, empfindliche Böden oder Spezialglas müssen vorab erwähnt und geprüft werden.",
    Icon: FileText,
  },
  {
    title: "Deadline offen sagen",
    text: "Übergabe, Einzug, Handwerker-Ende, Parken, Schlüssel, Etage und Aufzug entscheiden, ob der Termin realistisch ist.",
    Icon: Timer,
  },
];

const requestChecklist = [
  "Adresse in Regensburg oder Umgebung",
  "Wohnung, Haus, Büro, Praxis oder Gewerbeobjekt",
  "Renovierung, Sanierung, Neubau oder Handwerkerstaub",
  "Fläche in Quadratmetern und Anzahl der Räume",
  "Boden, Fenster, Rahmen, Bad, Küche und Türen nennen",
  "Bauphase: grob fertig, noch Arbeiten offen oder übergabebereit",
  "Wunschtermin, Deadline, Übergabe oder Einzug",
  "Fotos, Etage, Aufzug, Schlüsselzugang und Parken",
];

const occasionOptions = [
  {
    label: "Nach Renovierung",
    text: "Für Staub, Laufspuren, Kanten, Türen, Boden und sichtbare Flächen nach Maler-, Boden- oder Ausbauarbeiten.",
  },
  {
    label: "Vor Übergabe",
    text: "Für Vermieter, Mieter, Hausverwaltung oder Gewerbe, wenn der Zustand vor Schlüsseltermin sichtbar stimmen soll.",
  },
  {
    label: "Vor Einzug",
    text: "Wenn Räume nach Umbau, Sanierung oder Handwerkern wieder bewohnbar oder nutzbar werden sollen.",
  },
  {
    label: "Nach Handwerkern",
    text: "Bei Handwerkerstaub, Bohrstaub, Materialresten und verschmutzten Laufwegen nach klarer Foto-Einschätzung.",
  },
];

const boundaries = [
  "keine aktive Baustellenleitung",
  "keine Bauschutt- oder Gefahrstoffentsorgung automatisch",
  "keine Asbest-, Schimmel-, Brand- oder Wasserschaden-Sanierung",
  "keine Elektro-, Sanitär-, Maler- oder Reparaturarbeiten",
  "keine Abnahmegarantie oder Rechtsberatung zur Übergabe",
  "keine Spezialmaterial-Garantie ohne Materialprüfung",
];

const faqItems = [
  {
    q: "Was kostet Baureinigung in Regensburg?",
    a: "Die Kosten hängen von Fläche, Bauzustand, Staubmenge, Material, Fenstern, Boden, Bad, Küche, Restmaterial, Zugang, Etage, Parken, Termin und gewünschtem Ergebnis ab. Für ein realistisches Angebot braucht FLOXANT Fotos und eine kurze Beschreibung.",
  },
  {
    q: "Was ist der Unterschied zwischen Baureinigung, Bauendreinigung und Baufeinreinigung?",
    a: "Baureinigung ist der Oberbegriff. Bauendreinigung meint oft die Reinigung vor Übergabe, Einzug oder Nutzung. Baufeinreinigung beschreibt die genauere Arbeit nach grober Bauphase, zum Beispiel Feinstaub, Kanten, Rahmen und sichtbare Oberflächen.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Angebot?",
    a: "Wichtig sind Adresse, Objektart, Quadratmeter, Räume, Bauphase, stärkste Verschmutzung, Boden, Fenster, Rahmen, Bad, Küche, Termin, Zugang, Etage, Aufzug, Parken und Fotos.",
  },
  {
    q: "Geht Reinigung nach Renovierung oder Handwerkerarbeiten?",
    a: "Ja, FLOXANT prüft Reinigung nach Renovierung, Sanierung, Umbau oder Handwerkerarbeiten in Regensburg. Besonders hilfreich sind Fotos von Staub, Böden, Fenstern, Türen, Bad, Küche und Laufwegen.",
  },
  {
    q: "Sind Fenster und Rahmen automatisch enthalten?",
    a: "Nein. Fenster, Rahmen, Falze, Farbe, Zement, Silikon, Kleber oder Spezialglas sollten ausdrücklich genannt werden. FLOXANT prüft dann, ob es zur Baureinigung passt oder separat als Fensterreinigung eingeordnet wird.",
  },
  {
    q: "Welche Leistungen sind ausgeschlossen?",
    a: "FLOXANT übernimmt keine aktive Baustellenleitung, keine Gefahrstoff- oder Asbestarbeiten, keine Schimmel-, Brand- oder Wasserschaden-Sanierung, keine Reparaturen und keine Abnahmegarantie.",
  },
];

const relatedLinks = [
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
  { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
  { href: "/endreinigung-regensburg", label: "Endreinigung Regensburg" },
  { href: "/bueroreinigung-regensburg", label: "Büroreinigung Regensburg" },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "baureinigung-regensburg",
    title: "Baureinigung Regensburg | Bauendreinigung & Staub | FLOXANT",
    description:
      "Baureinigung und Bauendreinigung in Regensburg nach Renovierung, Sanierung oder Handwerkern. Baustaub, Fenster, Boden, Zugang, Fotos und Angebot prüfen.",
    keywords: [
      "Baureinigung Regensburg",
      "Bauendreinigung Regensburg",
      "Baufeinreinigung Regensburg",
      "Reinigung nach Renovierung Regensburg",
      "Handwerkerstaub entfernen Regensburg",
      "Wohnung nach Sanierung reinigen Regensburg",
      "Baustaub Reinigung Regensburg",
      "Baureinigung Kosten Regensburg",
      "Reinigung nach Handwerkern Regensburg",
    ],
  });
}

export default function BaureinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Baureinigung in Regensburg anfragen. Objektart, Fläche, Bauzustand, Staub, Fenster/Boden, Termin und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
        { name: "Baureinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Baureinigung Regensburg",
        description:
          "Baureinigung, Bauendreinigung und Baufeinreinigung in Regensburg nach Renovierung, Sanierung, Umbau oder Handwerkerarbeiten mit Fotos, Fläche, Bauzustand, Zugang und Termin.",
        path: pagePath,
        serviceType:
          "Baureinigung, Bauendreinigung, Baufeinreinigung und Reinigung nach Renovierung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Baureinigung Regensburg nach Renovierung, Sanierung und Handwerkern",
        description:
          "Baureinigung in Regensburg nach Renovierung, Sanierung oder Handwerkerarbeiten mit Fotos, Bauzustand, Fläche, Termin, Anfragecheckliste, FAQ und direkter Kontaktmöglichkeit.",
        path: pagePath,
        about: [
          "Baureinigung Regensburg",
          "Bauendreinigung Regensburg",
          "Baufeinreinigung Regensburg",
          "Reinigung nach Renovierung",
          "Handwerkerstaub entfernen",
          "Baustaub Reinigung",
          "Reinigung vor Übergabe",
        ],
        potentialActions: [
          { name: "Baureinigung anfragen", target: `${pagePath}#kontakt`, type: "ContactAction" },
          { name: "Fotos per WhatsApp senden", target: whatsappUrl, type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Typische Anlässe für Baureinigung Regensburg",
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
          { label: "Baureinigung Regensburg" },
        ]}
      />

      <section id="ueberblick" className="relative overflow-hidden px-6 pb-12 pt-6 lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="flox-grid-backdrop" />
          <FloxantSymbolLayer variant="cleaning" density="soft" mode="hero" className="opacity-15" />
        </div>

        <div className="flox-shell relative">
          <div className="grid gap-5 xl:grid-cols-[1.03fr_0.97fr] xl:items-stretch">
            <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-9 md:py-9">
              <div className="flox-kicker">
                <Sparkles className="h-4 w-4" />
                Baureinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[18ch] text-[clamp(2.05rem,4.2vw,3.9rem)] font-black leading-[0.98] text-slate-950">
                Baustaub raus, Übergabe klarer, Anfrage ohne Rätsel.
              </h1>

              <p className="mt-5 max-w-[62ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Baureinigung, Bauendreinigung und Reinigung nach
                Renovierung in Regensburg für Wohnung, Büro, Praxis und
                Gewerbeobjekt. Entscheidend sind Bauzustand, Fläche, Staub,
                Boden, Fenster, Zugang, Deadline und gute Fotos.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Baureinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Anlässe", "#kunden-suchen"],
                  ["Leistungen", "#leistungen"],
                  ["Kostenfaktoren", "#kostenfaktoren"],
                  ["Checkliste", "#anfrage-checkliste"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="flox-chip hover:border-blue-200 hover:bg-blue-50">
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#kontakt" className="flox-button-primary px-6">
                  Baureinigung anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-button-secondary px-6">
                  <MessageCircle className="h-4 w-4" />
                  Fotos per WhatsApp senden
                </a>
              </div>
            </article>

            <aside className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
              <Image
                  src="/assets/service-cleaning.png"
                alt="Renovierungsbereich als Beispiel für Baureinigung und Bauendreinigung in Regensburg"
                fill
                priority
                sizes="(min-width: 1280px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/58 to-slate-900/10" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 md:p-8">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-2 text-[10px] font-black uppercase text-white">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Angebot nach Fotos
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                    Bauzustand, Staub und Deadline entscheiden über den Aufwand.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Staub", "prüfen"],
                      ["Boden", "schützen"],
                      ["Termin", "planen"],
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

      <RegensburgCleaningBuyerPath
        serviceLabel="Baureinigung Regensburg"
        headline="Nach Renovierung zählt ein klarer Weg, nicht noch mehr Rückfragen."
        intro="Bei Baustaub, Bauendreinigung und Handwerkerstaub entsteht meist Zeitdruck. FLOXANT fragt Bauphase, Fotos, Boden, Fenster, Restmaterial, Zugang und Übergabetermin gezielt ab."
        focusHrefs={[
          "/baustaub-ende",
          "/grundreinigung-regensburg",
          "/fensterreinigung-regensburg",
          "/gewerbereinigung-regensburg",
        ]}
        bookingHref="/buchung?service=reinigung&city=regensburg&source=baureinigung_regensburg#buchungssystem"
      />

      <section id="kunden-suchen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Typische Anlässe</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kunden wollen schnell wissen: passt das zu meinem Bauzustand?
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Oft geht es um ein konkretes Problem: Baustaub entfernen, Wohnung
              nach Sanierung reinigen, Bauendreinigung vor Übergabe oder Reinigung
              nach Handwerkern. Für den Start helfen Fotos, Bauzustand, Fläche,
              Zugang und der gewünschte Termin.
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

      <section id="leistungen" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article>
            <div className="flox-kicker">Leistungen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Baureinigung für Flächen, die nach Umbau wieder funktionieren sollen.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {serviceAreas.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.label} className="flox-panel rounded-[1.2rem] px-5 py-5">
                    <Icon className="h-6 w-6 text-blue-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Anlass</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Nach Renovierung, vor Einzug oder vor Übergabe.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Baureinigung ist selten ein Standardpaket. Der Anlass entscheidet,
              ob eher Staub, Details, Fenster, Boden, Bad, Küche oder Deadline
              im Vordergrund stehen.
            </p>
            <div className="mt-6 grid gap-3">
              {occasionOptions.map((item) => (
                <div key={item.label} className="rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3">
                  <p className="text-sm font-black text-cyan-100">{item.label}</p>
                  <p className="mt-1 text-sm leading-7 text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="kostenfaktoren" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Kostenfaktoren</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Diese vier Punkte machen Angebot und Termin deutlich genauer.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {decisionSignals.map((item) => {
              const Icon = item.Icon;
              return (
                <article key={item.title} className="flox-panel rounded-[1.5rem] p-6">
                  <Icon className="h-6 w-6 text-blue-700" />
                  <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="anfrage-checkliste" className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Anfrage-Checkliste</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              So kann FLOXANT schneller und ehrlicher antworten.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Bei Baureinigung sind Fotos oft wichtiger als lange Texte. Ein
              paar Bilder von Staub, Boden, Fenstern, Bad, Küche, Restmaterial
              und Zugang reichen für den ersten sinnvollen Schritt.
            </p>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {requestChecklist.map((item) => (
              <div key={item} className="flox-panel flex items-start gap-3 rounded-[1.3rem] p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <span className="text-sm font-bold leading-7 text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Häufige Fragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kurze Antworten, damit die Anfrage schneller klar wird.
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
              Was Baureinigung nicht automatisch bedeutet.
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
                  Weitere passende Leistungen für Baureinigung in Regensburg.
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
            <div className="flox-kicker">Baureinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Bauzustand, Fotos und Deadline senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Adresse, Objektart, Fläche,
              Bauphase, stärkste Staubstellen, Fenster- oder Bodenwünsche,
              Termin, Zugang und ein paar klare Fotos.
            </p>
          </div>

          <CommercialCleaningLeadForm />
        </div>
      </section>
    </main>
  );
}
