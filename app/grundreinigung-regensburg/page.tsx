import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bath,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Home,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Timer,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
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


const pagePath = "/grundreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Grundreinigung Regensburg",
    title: "Intensiv reinigen statt nur oberflächlich wischen",
    text: "Für Wohnungen, Büros, Küchen, Bäder und stark genutzte Flächen, wenn normaler Unterhalt nicht mehr reicht.",
    Icon: Sparkles,
  },
  {
    phrase: "Wohnung Grundreinigung Regensburg",
    title: "Vor Einzug, nach Auszug oder nach Leerstand",
    text: "Böden, Kanten, Bad, Küche, Staub, Kalk, Fettspuren und sichtbare Problemstellen werden nach Fotos eingeordnet.",
    Icon: Home,
  },
  {
    phrase: "Büro Grundreinigung Regensburg",
    title: "Büro und Gewerbe wieder präsentabel machen",
    text: "Für Besichtigung, Mieterwechsel, Saisonstart, Kanzlei, Praxis-Nebenflächen oder stark beanspruchte Arbeitsbereiche.",
    Icon: Building2,
  },
  {
    phrase: "Grundreinigung Kosten Regensburg",
    title: "Preis erst nach Fläche, Zustand und Ziel",
    text: "FLOXANT fragt Objektart, Quadratmeter, Verschmutzung, Material, Termin, Zugang und Fotos ab, bevor ein Angebot sinnvoll ist.",
    Icon: FileText,
  },
];

const serviceAreas = [
  { label: "Küche", text: "Fronten, Arbeitsflächen, Fettspuren, Boden, Ecken und erreichbare Oberflächen.", Icon: Utensils },
  { label: "Bad", text: "Kalk, Armaturen, Fliesen, Sanitär, Spiegel, Ablagen und Boden nach Zustand.", Icon: Bath },
  { label: "Wohnung", text: "Einzug, Auszug, Leerstand, Mieterwechsel oder Vorbereitung vor Besichtigung.", Icon: Home },
  { label: "Büro", text: "Arbeitsbereiche, Besprechungsräume, Küche, Sanitär, Laufwege und sichtbare Kontaktflächen.", Icon: Building2 },
];

const detailChecks = [
  "Boden, Ecken, Ränder und Laufspuren",
  "Küche, Fettfilm und erreichbare Oberflächen",
  "Bad, Kalk, Sanitär und Fliesen",
  "Staub auf Leisten, Türen und sichtbaren Flächen",
  "Leerstand, Auszug oder Einzug vorbereiten",
  "Büro, Praxis-Nebenflächen oder kleine Gewerbefläche",
  "Fotos zur realistischen Aufwandsschätzung",
  "Zusatzwünsche wie Fenster oder Teppich separat prüfen",
];

const decisionSignals = [
  {
    title: "Fotos zeigen den Zustand",
    text: "Am schnellsten geht es mit Bildern von Küche, Bad, Boden, Ecken, Fluren und den stärksten Stellen.",
    Icon: Camera,
  },
  {
    title: "Termin und Zugang klären",
    text: "Schlüssel, Parken, Etage, Aufzug, Zeitfenster und Ansprechpartner entscheiden über die Machbarkeit.",
    Icon: KeyRound,
  },
  {
    title: "Ziel ehrlich benennen",
    text: "Einzug, Übergabe, Besichtigung, Neustart im Büro oder Grundsauberkeit haben unterschiedliche Ansprüche.",
    Icon: ClipboardCheck,
  },
  {
    title: "Zeitdruck offen sagen",
    text: "Bei knapper Deadline prüft FLOXANT schneller, aber ohne pauschale Sofort- oder Abnahmegarantie.",
    Icon: Timer,
  },
];

const requestChecklist = [
  "Adresse in Regensburg oder Umgebung",
  "Wohnung, Haus, Büro oder Gewerbefläche",
  "Fläche in Quadratmetern",
  "Zustand und stärkste Verschmutzung",
  "Küche, Bad, Boden und Sonderstellen",
  "Wunschtermin und Deadline",
  "Zugang, Etage, Aufzug und Parken",
  "Fotos oder kurzer Rundgang",
];

const boundaries = [
  "keine Schimmel-Sanierung",
  "keine Asbest- oder Gefahrstoffreinigung",
  "keine Tatortreinigung",
  "keine Schädlingsbekämpfung",
  "keine Brand- oder Wasserschaden-Sanierung",
  "keine medizinische Spezialdesinfektion ohne gesonderte Prüfung",
];

const faqItems = [
  {
    q: "Was kostet eine Grundreinigung in Regensburg?",
    a: "Der Preis hängt von Fläche, Zustand, Material, Verschmutzung, Küche, Bad, Boden, Zugang, Termin und gewünschtem Ergebnis ab. Für ein sinnvolles Angebot braucht FLOXANT Fotos, Objektart, Quadratmeter und eine kurze Zielbeschreibung.",
  },
  {
    q: "Wann ist Grundreinigung statt normaler Reinigung sinnvoll?",
    a: "Grundreinigung ist sinnvoll bei starker Verschmutzung, Leerstand, Einzug, Auszug, Mieterwechsel, Küchen- oder Badproblemen, sichtbaren Laufspuren oder wenn eine Fläche wieder präsentabel werden soll.",
  },
  {
    q: "Übernimmt FLOXANT Grundreinigung vor Einzug oder nach Auszug?",
    a: "Ja, FLOXANT prüft Grundreinigung vor Einzug, nach Auszug, bei Wohnungsübergabe oder vor Besichtigung in Regensburg nach Fotos, Termin, Schlüsselzugang und gewünschtem Ergebnis.",
  },
  {
    q: "Kann auch Büro-Grundreinigung in Regensburg angefragt werden?",
    a: "Ja. Büros, Kanzleien, Praxis-Nebenflächen und kleine Gewerbeflächen können nach Fläche, Nutzung, Zeitfenster, Zugang und Reinigungsziel geprüft werden.",
  },
  {
    q: "Sind Fenster, Teppich oder Polster automatisch enthalten?",
    a: "Nein. Fenster, Teppich, Polster, Spezialmaterialien oder sehr starke Sonderstellen sollten separat genannt werden. FLOXANT prüft dann, ob es zur Grundreinigung passt oder als Zusatzleistung eingeordnet werden muss.",
  },
  {
    q: "Welche Fälle lehnt FLOXANT bei Grundreinigung ab?",
    a: "FLOXANT macht keine Schimmel-Sanierung, Asbest- oder Gefahrstoffreinigung, Tatortreinigung, Schädlingsbekämpfung, Brand- oder Wasserschaden-Sanierung und keine medizinische Spezialdesinfektion ohne gesonderte Prüfung.",
  },
];

const relatedLinks = [
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
  { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
  { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
  { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
  { href: "/bueroreinigung-regensburg", label: "Büroreinigung Regensburg" },
  { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
  { href: "/endreinigung-regensburg", label: "Endreinigung Regensburg" },
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "grundreinigung-regensburg",
    title: "Grundreinigung Regensburg | Wohnung, Büro & Auszug | FLOXANT",
    description:
      "Grundreinigung in Regensburg für Wohnung, Büro, Küche, Bad, Einzug, Auszug und starke Verschmutzung. Fotos, Fläche, Zustand und Angebot prüfen.",
    keywords: [
      "Grundreinigung Regensburg",
      "Wohnung Grundreinigung Regensburg",
      "Büro Grundreinigung Regensburg",
      "Grundreinigung Kosten Regensburg",
      "Grundreinigung nach Auszug Regensburg",
      "Grundreinigung vor Einzug",
      "Küche gründlich reinigen Regensburg",
      "Bad Grundreinigung Regensburg",
      "starke Verschmutzung reinigen Regensburg",
    ],
  });
}

export default function GrundreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten eine Grundreinigung in Regensburg anfragen. Objektart, Fläche, Zustand, Termin und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Reinigung Regensburg", item: "/reinigung-regensburg" },
        { name: "Grundreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Grundreinigung Regensburg",
        description:
          "Grundreinigung für Wohnung, Büro, Küche, Bad, Einzug, Auszug, Leerstand und starke Verschmutzung in Regensburg nach Fläche, Zustand, Fotos, Termin und Zugang.",
        path: pagePath,
        serviceType:
          "Grundreinigung, Intensivreinigung, Wohnungsreinigung, Büro-Grundreinigung und Reinigung nach Auszug in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Grundreinigung Regensburg für Wohnung, Büro, Küche und Bad",
        description:
          "Kundennaher Startpunkt für Grundreinigung in Regensburg mit Leistungsgrenzen, Anfragecheckliste, FAQ und direkten Kontaktwegen.",
        path: pagePath,
        about: [
          "Grundreinigung Regensburg",
          "Wohnung Grundreinigung",
          "Büro Grundreinigung",
          "Küche gründlich reinigen",
          "Bad Grundreinigung",
          "Grundreinigung nach Auszug",
          "starke Verschmutzung reinigen",
        ],
        potentialActions: [
          { name: "Grundreinigung per WhatsApp anfragen", target: whatsappUrl, type: "ContactAction" },
          { name: "Grundreinigung buchen", target: "/buchung?service=reinigung&source=grundreinigung_regensburg&entry=grundreinigung_regensburg", type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Typische Anliegen zur Grundreinigung Regensburg",
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
          { label: "Reinigung Regensburg", href: "/reinigung-regensburg" },
          { label: "Grundreinigung Regensburg" },
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
                <Sparkles className="h-4 w-4" />
                Grundreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[17ch] text-[clamp(2.1rem,4.3vw,4rem)] font-black leading-[0.98] text-slate-950">
                Wenn normal putzen nicht mehr reicht.
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Grundreinigung in Regensburg für Wohnung, Büro,
                Küche, Bad, Einzug, Auszug, Leerstand und starke Verschmutzung.
                Wichtig sind Fläche, Zustand, Fotos, Termin, Zugang und das Ziel:
                wieder sauber, präsentabel oder übergabebereit.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Grundreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Anliegen", "#kunden-suchen"],
                  ["Bereiche", "#bereiche"],
                  ["Schnell entscheiden", "#schnell-entscheiden"],
                  ["Checkliste", "#anfrage-checkliste"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="flox-chip hover:border-blue-200 hover:bg-blue-50">
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#kontakt" className="flox-button-primary px-6">
                  Grundreinigung anfragen
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
                alt="Grundreinigung einer stark genutzten Fläche als Beispiel für Regensburg"
                fill
                priority
                sizes="(min-width: 1280px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/62 to-slate-900/10" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 md:p-8">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-2 text-[10px] font-black uppercase text-white">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Nach Fotos besser planen
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                    Küche, Bad, Böden und Ecken zuerst sichtbar machen.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Fläche", "m²"],
                      ["Zustand", "Fotos"],
                      ["Ziel", "klar"],
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
        serviceLabel="Grundreinigung Regensburg"
        headline="Wenn normal putzen nicht reicht, muss die Anfrage schnell Klarheit bringen."
        intro="Bei Einzug, Auszug, Leerstand, Küche, Bad, Boden oder starker Verschmutzung zählen Fotos, Ziel, Zustand, Termin und Zugang. Die passenden Wege helfen Kunden, ohne Umwege richtig anzufragen."
        focusHrefs={[
          "/vermieter-schockschutz-reinigung",
          "/sichtbar-sauber-protokoll",
          "/baustaub-ende",
          "/fensterreinigung-regensburg",
        ]}
        bookingHref="/buchung?service=reinigung&city=regensburg&source=grundreinigung_regensburg#buchungssystem"
      />

      <section id="kunden-suchen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Typische Anliegen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              So finden Kunden schneller den passenden Reinigungsweg.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Oft geht es um einen sichtbaren Neustart: Wohnung nach Auszug,
              Küche, Bad, Boden, Leerstand oder starke Verschmutzung. Fotos,
              Zustand und Ziel helfen mehr als eine pauschale Quadratmeterfrage.
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
            <div className="flox-kicker">Bereiche</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Grundreinigung für die Stellen, die Kunden sofort sehen.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {serviceAreas.map((item) => {
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
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Klarer Umfang</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Keine Zauberformel, sondern saubere Vorprüfung.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Grundreinigung klingt einfach, ist aber je nach Material, Zustand
              und Ziel sehr unterschiedlich. Darum fragt FLOXANT zuerst nach den
              richtigen Punkten.
            </p>
            <div className="mt-6 grid gap-3">
              {detailChecks.slice(0, 6).map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-7 text-slate-200">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="schnell-entscheiden" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Schnell entscheiden</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Diese vier Angaben machen die Anfrage deutlich schneller.
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
              So kann FLOXANT schneller und genauer antworten.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Für Grundreinigung sind Fotos oft wichtiger als lange Texte.
              Besonders hilfreich sind Küche, Bad, Boden, Ränder, stärkste
              Verschmutzung und eine klare Deadline.
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
            <div className="flox-kicker">Mögliche Zusatzpunkte</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Fenster, Teppich oder Polster bitte direkt nennen.
            </h2>
            <div className="mt-7 grid gap-3">
              {detailChecks.slice(6).map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Grenzen</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Was Grundreinigung nicht automatisch ist.
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
          <div className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">FAQ</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kurze Antworten, damit die Anfrage von Anfang an besser passt.
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
          </div>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase text-blue-700">Passende nächste Wege</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Weitere passende Leistungen für Reinigung in Regensburg.
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
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
              <div className="flox-kicker">Grundreinigung anfragen</div>
              <h2 className="mt-6 flox-title-lg text-slate-950">
                Fotos, Fläche und Ziel senden. FLOXANT prüft den nächsten Schritt.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Für eine schnelle Antwort reichen Objektart, Ort, Fläche, Zustand,
                Termin, Zugang und ein paar aussagekräftige Fotos. Bei vorhandenen
                Angeboten kann FLOXANT auch eine zweite Einschätzung prüfen.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flox-panel flex min-h-[190px] flex-col justify-between rounded-[1.5rem] p-6 hover:border-blue-200 hover:bg-blue-50">
                <MessageCircle className="h-7 w-7 text-blue-700" />
                <span>
                  <span className="block text-xl font-black text-slate-950">WhatsApp mit Fotos</span>
                  <span className="mt-3 block text-sm leading-7 text-slate-700">
                    Schnellster Weg für Zustand, Küche, Bad, Boden und Deadline.
                  </span>
                </span>
              </a>

              <Link href="/buchung?service=reinigung&source=grundreinigung_regensburg&entry=grundreinigung_regensburg" className="flox-panel flex min-h-[190px] flex-col justify-between rounded-[1.5rem] p-6 hover:border-blue-200 hover:bg-blue-50">
                <ArrowRight className="h-7 w-7 text-blue-700" />
                <span>
                  <span className="block text-xl font-black text-slate-950">Allgemeine Buchung</span>
                  <span className="mt-3 block text-sm leading-7 text-slate-700">
                    Für strukturierte Anfrage mit Kontaktdaten und Serviceauswahl.
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
