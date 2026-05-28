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
  Clock,
  DoorOpen,
  FileText,
  Home,
  MessageCircle,
  ShieldCheck,
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

const pagePath = "/treppenhausreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Treppenhausreinigung Regensburg",
    title: "Treppenhaus sauber halten, ohne Dauerabstimmung",
    text: "Für Mehrfamilienhaus, WEG, Mietshaus, Bürohaus und gemischt genutzte Objekte mit klarem Turnus.",
    Icon: Building2,
  },
  {
    phrase: "Hausverwaltung Reinigung Regensburg",
    title: "Anfrage für Hausverwaltung und Vermieter",
    text: "Objektadresse, Etagen, Eingänge, Aufzug, Kellerflur, Müllraum, Zugang und Ansprechpartner sauber senden.",
    Icon: Users,
  },
  {
    phrase: "Treppenhausreinigung Kosten Regensburg",
    title: "Kosten hängen vom Objekt ab",
    text: "Etagen, Aufzug, Laufwege, Verschmutzung, Turnus, Schlüssel, Außenanteile und Sonderflächen verändern den Aufwand.",
    Icon: FileText,
  },
  {
    phrase: "Treppenhaus reinigen lassen Regensburg",
    title: "Sichtbare Gemeinschaftsflächen schnell einordnen",
    text: "FLOXANT prüft Eingang, Treppen, Geländer, Flure, Aufzug, Kellerflur und Müllraum nach Fotos und Ziel.",
    Icon: ClipboardCheck,
  },
];

const buildingZones = [
  {
    label: "Eingang & Haustür",
    text: "Eingangsbereich, Klingelzone, Briefkastenumfeld, sichtbare Flächen, Matten und Laufwege.",
    Icon: DoorOpen,
  },
  {
    label: "Treppen & Geländer",
    text: "Stufen, Podeste, Handläufe, Kanten, Staub, Laufspuren und sichtbare Kontaktflächen.",
    Icon: Home,
  },
  {
    label: "Aufzug & Flure",
    text: "Aufzugsvorbereich, Kabinenumfeld nach Absprache, Etagenflure, Türen und Gemeinschaftswege.",
    Icon: Building2,
  },
  {
    label: "Kellerflur & Müllraum",
    text: "Nebenflächen, Kellerzugänge, Müllraumumfeld und Sonderpunkte nach Fotos und Freigabe.",
    Icon: ShieldCheck,
  },
];

const cadenceOptions = [
  {
    label: "Wöchentlich",
    text: "Für normale Mehrfamilienhäuser, kleine WEGs und Objekte mit planbarem Bewohnerverkehr.",
  },
  {
    label: "2-3 mal pro Woche",
    text: "Für stark genutzte Eingänge, Geschäftsanteile, Aufzug, viel Publikumsverkehr oder hohe Laufspuren.",
  },
  {
    label: "Alle 2 Wochen",
    text: "Für kleinere Häuser, Nebenaufgänge oder Objekte mit geringerer Nutzung nach Abstimmung.",
  },
  {
    label: "Sondertermin",
    text: "Für Mieterwechsel, Renovierung, starke Verschmutzung, Müllraumproblem oder Übergabe nach Prüfung.",
  },
];

const requestChecklist = [
  "Objektadresse in Regensburg",
  "Hausverwaltung, WEG, Vermieter oder Eigentümer",
  "Anzahl Eingänge und Etagen",
  "Aufzug, Kellerflur und Müllraum",
  "Gewünschter Turnus",
  "Schlüssel, Code oder Ansprechpartner",
  "Besondere Hausordnung oder Zeitfenster",
  "Fotos von Eingang, Treppe, Flur und Problemstellen",
];

const trustSignals = [
  "Objektangaben statt Quadratmeter-Schätzung",
  "Turnus nach Nutzung und Bewohnerverkehr",
  "Fotos von Eingang, Treppe, Flur und Sonderstellen",
  "Zugang, Schlüssel und Ansprechpartner vor Start geklärt",
  "saubere Abgrenzung zu Hausmeisterdienst und Winterdienst",
  "keine Preiszusage ohne Objektprüfung",
];

const boundaries = [
  "kein Hausmeisterdienst",
  "kein Winterdienst",
  "keine Gartenpflege",
  "keine Reparatur- oder Handwerkerleistung",
  "keine Gefahrstoff- oder Schädlingsbekämpfung",
  "keine Fassaden-, Dach- oder Hebebühnenarbeit",
];

const faqItems = [
  {
    q: "Was kostet Treppenhausreinigung in Regensburg?",
    a: "Die Kosten hängen von Anzahl der Eingänge, Etagen, Aufzug, Kellerflur, Müllraum, Verschmutzung, Turnus, Zugang, Zeitfenster und gewünschten Zusatzflächen ab. Für eine realistische Prüfung braucht FLOXANT Objektadresse, Fotos, Turnuswunsch und eine kurze Beschreibung.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Treppenhausreinigung-Angebot?",
    a: "Wichtig sind Adresse, Rolle des Auftraggebers, Anzahl Eingänge, Etagen, Aufzug, Kellerflur, Müllraum, gewünschter Turnus, Schlüssel oder Code, Ansprechpartner, Hausordnung und Fotos von Eingang, Treppe, Flur und Problemstellen.",
  },
  {
    q: "Ist Treppenhausreinigung für Hausverwaltungen möglich?",
    a: "Ja. Hausverwaltungen, WEG, Vermieter und Eigentümer können Objektanfragen senden, wenn Zugang, Freigabe, Ansprechpartner, Turnus und gewünschte Flächen klar sind.",
  },
  {
    q: "Gehört Müllraum oder Kellerflur automatisch dazu?",
    a: "Nein. Müllraum, Kellerflur, Nebenflächen, Aufzug und Außenanteile sollten separat genannt werden. FLOXANT prüft dann, ob sie zum Turnus gehören oder als Zusatzpunkt eingeordnet werden.",
  },
  {
    q: "Übernimmt FLOXANT auch Winterdienst oder Hausmeisterarbeiten?",
    a: "Nein. Diese Seite fokussiert Treppenhaus- und Gemeinschaftsflächenreinigung. Winterdienst, Hausmeisterdienst, Reparaturen, Gartenpflege und technische Objektbetreuung werden nicht automatisch angeboten.",
  },
];

const relatedLinks = [
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
  { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
  { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/mieterwechsel-service-regensburg", label: "Mieterwechsel-Service" },
  { href: "/blog/hausverwaltung-treppenhausreinigung-regensburg", label: "Ratgeber Hausverwaltung" },
  { href: "/keller-muellraum-rettung-regensburg", label: "Keller-/Müllraum-Rettung" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "treppenhausreinigung-regensburg",
    title: "Treppenhausreinigung Regensburg | Hausverwaltung & Angebot | FLOXANT",
    description:
      "Treppenhausreinigung in Regensburg für Hausverwaltung, WEG, Mietshaus und Objekt. Etagen, Aufzug, Turnus, Zugang, Fotos und Angebot prüfen.",
    keywords: [
      "Treppenhausreinigung Regensburg",
      "Hausverwaltung Reinigung Regensburg",
      "Treppenhausreinigung Kosten Regensburg",
      "Treppenhaus reinigen lassen Regensburg",
      "Reinigungsfirma Treppenhaus Regensburg",
      "WEG Reinigung Regensburg",
      "Mehrfamilienhaus Reinigung Regensburg",
      "Treppenhaus Unterhaltsreinigung Regensburg",
      "Mietshaus Reinigung Regensburg",
    ],
  });
}

export default function TreppenhausreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Treppenhausreinigung in Regensburg anfragen. Objektadresse, Eingänge, Etagen, Turnus, Zugang und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
        { name: "Treppenhausreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Treppenhausreinigung Regensburg",
        description:
          "Treppenhausreinigung in Regensburg für Hausverwaltungen, WEG, Vermieter, Mehrfamilienhäuser und Objektbetreiber nach Eingängen, Etagen, Aufzug, Turnus, Zugang und Fotos.",
        path: pagePath,
        serviceType:
          "Treppenhausreinigung, Hausverwaltung Reinigung, WEG Reinigung, Mehrfamilienhaus Reinigung und Unterhaltsreinigung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Treppenhausreinigung Regensburg für Hausverwaltung, WEG und Mietshaus",
        description:
          "Kundennaher Einstieg für Treppenhausreinigung in Regensburg mit Kostenfaktoren, Turnus, Anfragecheckliste, FAQ, Grenzen und direktem B2B-Formular.",
        path: pagePath,
        about: [
          "Treppenhausreinigung Regensburg",
          "Hausverwaltung Reinigung Regensburg",
          "Treppenhausreinigung Kosten",
          "WEG Reinigung",
          "Mehrfamilienhaus Reinigung",
          "Treppenhaus Unterhaltsreinigung",
          "Kellerflur und Müllraum",
        ],
        potentialActions: [
          { name: "Treppenhausreinigung anfragen", target: `${pagePath}#kontakt`, type: "ContactAction" },
          { name: "Treppenhausreinigung per WhatsApp anfragen", target: whatsappUrl, type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Kundensuchen zur Treppenhausreinigung Regensburg",
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
          { label: "Treppenhausreinigung Regensburg" },
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
                <Building2 className="h-4 w-4" />
                Treppenhausreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[17ch] text-[clamp(2.1rem,4.3vw,4rem)] font-black leading-[0.98] text-slate-950">
                Saubere Eingänge, klare Turnusse, weniger Rückfragen.
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Treppenhausreinigung in Regensburg nach Objektart,
                Eingängen, Etagen, Aufzug, Kellerflur, Müllraum, Turnus,
                Zugang, Ansprechpartner und Fotos. Ideal für Hausverwaltungen,
                WEG, Vermieter und Eigentümer, die Gemeinschaftsflächen
                zuverlässig sauber halten möchten.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Treppenhausreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Kundensuchen", "#kunden-suchen"],
                  ["Bereiche", "#bereiche"],
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
                  Treppenhausreinigung anfragen
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
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop"
                alt="Gepflegter Hauseingang als Beispiel für Treppenhausreinigung in Regensburg"
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
                    Anfrage nach Objektlogik
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                    Erst Eingänge, Etagen, Aufzug und Zugang machen ein Angebot belastbar.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Turnus", "planbar"],
                      ["Zugang", "geklärt"],
                      ["Fotos", "hilfreich"],
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
              Die Seite spricht die Wörter an, mit denen Hausverwaltungen suchen.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Viele Suchende wollen kein allgemeines Reinigungsversprechen. Sie
              suchen Treppenhausreinigung Regensburg, Hausverwaltung Reinigung,
              Kosten, Turnus, WEG, Mietshaus, Aufzug, Kellerflur, Müllraum und
              einen klaren Ansprechpartner.
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
            <div className="flox-kicker">Gemeinschaftsflächen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Treppenhausreinigung wird besser, wenn alle Bereiche klar benannt sind.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {buildingZones.map((item) => {
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
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Objektklarheit</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Hausverwaltungen brauchen wiederholbare Abläufe statt Einmalantworten.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              FLOXANT fragt nach Eingängen, Etagen, Turnus, Zugang und
              Verantwortlichen. So wird aus einer schnellen Anfrage ein
              nachvollziehbarer Objektablauf.
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
            <div className="flox-kicker">Turnus & Objektbetrieb</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Der passende Rhythmus hängt von Etagen, Bewohnerverkehr und Sonderflächen ab.
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
              Diese Angaben machen aus einer Suche eine gute Objektanfrage.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Für Treppenhausreinigung zählen nicht nur Quadratmeter. Erst mit
              Eingängen, Etagen, Aufzug, Nebenflächen, Turnus, Zugang und Fotos
              kann FLOXANT sauber prüfen, ob ein Angebot realistisch ist.
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
            <div className="flox-kicker">FAQ & Snippets</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kurze Antworten für Hausverwaltungen mit Angebotsabsicht.
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
              Was Treppenhausreinigung nicht automatisch enthält.
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
                  Interne Links für Regensburg-Treppenhausreinigung.
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
            <div className="flox-kicker">Treppenhausreinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Objektadresse, Etagen, Turnus und Zugang senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Adresse, Rolle, Anzahl der
              Eingänge und Etagen, Aufzug, gewünschter Turnus, Zugang und ein
              paar Fotos von Eingang, Treppe, Flur und Sonderstellen.
            </p>
          </div>

          <CommercialCleaningLeadForm />
        </div>
      </section>
    </main>
  );
}
