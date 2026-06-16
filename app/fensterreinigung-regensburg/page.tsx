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
  Store,
  Timer,
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


const pagePath = "/fensterreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Fensterreinigung Regensburg",
    title: "Fenster, Rahmen und Glasflächen sauber einordnen",
    text: "Für Wohnung, Büro, Praxis, Hotel, Hausverwaltung oder Objektbetrieb mit Fensterzahl, Etage, Zugang und Fotos.",
    Icon: Sparkles,
  },
  {
    phrase: "Fenster putzen lassen Regensburg",
    title: "Schnell anfragen, ohne erst alles ausmessen zu müssen",
    text: "Kunden können Innen- und Außenseite, ungefähre Fensterzahl, Rahmen, Falze, Terminwunsch und Bilder senden.",
    Icon: Home,
  },
  {
    phrase: "Glasreinigung Regensburg Büro",
    title: "Glas, Türen und Empfang wirken sofort gepflegter",
    text: "Für Büros, Kanzleien, Praxen, Schaufenster, Empfangsbereiche, Glastüren und sichtbare Griffspuren im Alltag.",
    Icon: Building2,
  },
  {
    phrase: "Fensterreinigung Kosten Regensburg",
    title: "Kosten hängen von Anzahl, Zugang und Zustand ab",
    text: "FLOXANT prüft Fensterzahl, Glasflächen, Rahmen, Etage, Verschmutzung, Parken, Zeitfenster und gewünschtes Ergebnis.",
    Icon: FileText,
  },
];

const serviceAreas = [
  { label: "Fenster innen & außen", text: "Fensterflächen nach Anzahl, Etage, Zugang, Verschmutzung und gewünschtem Ergebnis.", Icon: Sparkles },
  { label: "Rahmen & Falze", text: "Rahmen, Falze, Kanten und Griffbereiche nach Absprache und Zustand der Fenster.", Icon: ClipboardCheck },
  { label: "Glasflächen & Türen", text: "Glastüren, Trennwände, Empfangsbereiche und sichtbare Kontaktflächen in Büro oder Praxis.", Icon: DoorOpen },
  { label: "Schaufenster", text: "Schaufenster, Verkaufsflächen und Eingangsbereiche, wenn Zugang und Zeitfenster passen.", Icon: Store },
];

const decisionSignals = [
  {
    title: "Fensterzahl nennen",
    text: "Eine grobe Anzahl reicht für den Start: normale Fenster, große Glasflächen, Schaufenster oder Glastüren.",
    Icon: ClipboardCheck,
  },
  {
    title: "Innen, außen oder beides",
    text: "Die Außenseite ist nur möglich, wenn Zugang, Etage, Sicherheit und Wetter sinnvoll geprüft werden können.",
    Icon: Building2,
  },
  {
    title: "Fotos sparen Rückfragen",
    text: "Bilder von Fenstern, Rahmen, Verschmutzung, Zugang und Außenbereich machen die Einordnung deutlich schneller.",
    Icon: Camera,
  },
  {
    title: "Termin und Zugang klären",
    text: "Schlüssel, Ansprechpartner, Parken, Aufzug, Etage und gewünschtes Zeitfenster gehören direkt in die Anfrage.",
    Icon: KeyRound,
  },
];

const requestChecklist = [
  "Adresse in Regensburg oder Umgebung",
  "Fensteranzahl oder grobe Glasflächen",
  "innen, außen oder beidseitig reinigen",
  "Rahmen, Falze und Griffspuren gewünscht",
  "Etage, Aufzug, Zugang und Parkmöglichkeit",
  "Schaufenster, Glastüren oder Glaswände nennen",
  "Wunschtermin, Zeitfenster und Deadline",
  "Fotos von Fenstern, Rahmen und Außenbereich",
];

const cadenceOptions = [
  {
    label: "Einmalig",
    text: "Vor Übergabe, Einzug, Auszug, Besichtigung, Saisonstart oder wenn Fenster lange nicht gereinigt wurden.",
  },
  {
    label: "Regelmäßig",
    text: "Für Büros, Praxen, Kanzleien, Hotels, Hausverwaltungen oder Empfangsflächen mit wiederkehrender Glasreinigung.",
  },
  {
    label: "Nach Renovierung",
    text: "Bei Baustaub, Griffspuren, Farbspritzern oder starken Rückständen nur nach Fotos und Materialprüfung.",
  },
  {
    label: "Schaufenster",
    text: "Für Laden, Praxisfront oder Empfang, wenn Sichtbarkeit und Kundenwirkung besonders wichtig sind.",
  },
];

const boundaries = [
  "keine Seiltechnik oder Fassadenkletterei",
  "keine Hebebühne ohne gesonderte Prüfung",
  "keine Dachflächen oder gefährlichen Außenbereiche",
  "keine Reparatur beschädigter Fenster, Dichtungen oder Rahmen",
  "keine Garantie für Spezialglas, Folien oder Beschichtungen ohne Materialprüfung",
  "keine Entfernung von Farbe, Zement, Silikon oder Kleber ohne separate Einordnung",
];

const faqItems = [
  {
    q: "Was kostet Fensterreinigung in Regensburg?",
    a: "Die Kosten hängen von Fensteranzahl, Glasfläche, Innen- oder Außenseite, Rahmen, Falzen, Etage, Zugang, Verschmutzung, Termin und Fotos ab. FLOXANT prüft deshalb zuerst die Eckdaten, bevor ein sinnvolles Angebot möglich ist.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Angebot?",
    a: "Hilfreich sind Adresse, Fensterzahl, Glasflächen, innen oder außen, Rahmenwunsch, Etage, Aufzug, Parken, Zugang, Wunschtermin und Fotos von Fenstern, Rahmen und Außenbereich.",
  },
  {
    q: "Reinigt FLOXANT Fenster für Büro, Praxis oder Hotel?",
    a: "Ja, Fensterreinigung und Glasreinigung können für Büro, Kanzlei, Praxis, Hotel, Hausverwaltung oder Objektbetrieb in Regensburg geprüft werden, wenn Umfang, Zugang und Zeitfenster klar sind.",
  },
  {
    q: "Sind Rahmen und Falze automatisch enthalten?",
    a: "Nein, Rahmen, Falze, Kanten, Griffspuren und starke Rückstände sollten ausdrücklich genannt werden. FLOXANT ordnet dann ein, ob sie im Umfang enthalten sind oder separat geprüft werden müssen.",
  },
  {
    q: "Ist Außenreinigung in höheren Etagen möglich?",
    a: "Nur nach Prüfung. Wichtig sind Etage, Fensterart, Öffnungsmöglichkeit, sicherer Zugang, Wetter und Fotos. FLOXANT verspricht keine Seiltechnik, Fassadenkletterei oder Hebebühnenarbeit pauschal.",
  },
  {
    q: "Kann auch Schaufensterreinigung angefragt werden?",
    a: "Ja, Schaufenster, Glastüren und sichtbare Glasflächen können für Laden, Praxis, Büro oder Empfang geprüft werden. Entscheidend sind Größe, Zugang, Turnus, Uhrzeit und gewünschte Sichtbarkeit.",
  },
];

const relatedLinks = [
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/bueroreinigung-regensburg", label: "Büroreinigung Regensburg" },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
  { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "fensterreinigung-regensburg",
    title: "Fensterreinigung Regensburg | Glas, Rahmen & Angebot | FLOXANT",
    description:
      "Fensterreinigung und Glasreinigung in Regensburg für Büro, Praxis, Hotel, Wohnung und Objekt. Fensterzahl, Rahmen, Zugang, Etage, Fotos und Angebot prüfen.",
    keywords: [
      "Fensterreinigung Regensburg",
      "Glasreinigung Regensburg",
      "Fenster putzen lassen Regensburg",
      "Glasreinigung Regensburg Büro",
      "Schaufensterreinigung Regensburg",
      "Fensterreinigung Kosten Regensburg",
      "Fensterreinigung Angebot Regensburg",
      "Fensterreinigung vor Übergabe Regensburg",
      "Rahmen reinigen Regensburg",
      "Glastüren reinigen Regensburg",
    ],
  });
}

export default function FensterreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Fensterreinigung in Regensburg anfragen. Fensterzahl, Glasflächen, Etage, innen/außen, Rahmenwunsch, Termin und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
        { name: "Fensterreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Fensterreinigung Regensburg",
        description:
          "Fensterreinigung und Glasreinigung in Regensburg für Wohnung, Büro, Praxis, Hotel, Hausverwaltung, Schaufenster, Rahmen und Glasflächen nach Fensterzahl, Zugang, Etage, Fotos und Termin.",
        path: pagePath,
        serviceType:
          "Fensterreinigung, Glasreinigung, Schaufensterreinigung, Rahmenreinigung und Objekt-Glasreinigung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Fensterreinigung Regensburg für Glasflächen, Rahmen, Büro, Praxis und Objekt",
        description:
          "Kundennaher Startpunkt für Fensterreinigung in Regensburg mit Kostenfaktoren, Anfragecheckliste, FAQ, Grenzen und direktem Formular.",
        path: pagePath,
        about: [
          "Fensterreinigung Regensburg",
          "Glasreinigung Regensburg",
          "Fenster putzen lassen",
          "Schaufensterreinigung",
          "Glasreinigung Büro",
          "Rahmen reinigen",
          "Fensterreinigung Kosten",
        ],
        potentialActions: [
          { name: "Fensterreinigung anfragen", target: `${pagePath}#kontakt`, type: "ContactAction" },
          { name: "Fensterreinigung per WhatsApp anfragen", target: whatsappUrl, type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Typische Anliegen zur Fensterreinigung Regensburg",
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
          { label: "Fensterreinigung Regensburg" },
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
                Fensterreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[18ch] text-[clamp(2.05rem,4.2vw,3.9rem)] font-black leading-[0.98] text-slate-950">
                Klare Fenster, saubere Glasflächen, weniger Rückfragen.
              </h1>

              <p className="mt-5 max-w-[62ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Fensterreinigung und Glasreinigung in Regensburg
                für Wohnung, Büro, Praxis, Hotel, Schaufenster und Objektbetrieb.
                Wichtig sind Fensterzahl, Glasflächen, Innen- oder Außenseite,
                Rahmen, Etage, Zugang, Termin und aussagekräftige Fotos.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Fensterreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Anliegen", "#kunden-suchen"],
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
                  Fensterreinigung anfragen
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
                alt="Fenster- und Schaufensterreinigung mit Abzieher als Beispiel für Regensburg"
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
                    Fensterzahl, Etage und Zugang entscheiden über den Aufwand.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Glas", "klar"],
                      ["Rahmen", "prüfen"],
                      ["Zugang", "sicher"],
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
            <div className="flox-kicker">Typische Anliegen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kunden wollen schnell wissen: passt das zu meinen Fenstern?
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Entscheidend sind Fensterzahl, Glasflächen, Rahmen, Etage, Zugang und
              Sichtbarkeit. Für Büro, Praxis, Hotel oder Schaufenster zählt außerdem,
              wann gereinigt werden kann, ohne den Betrieb zu stören.
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
          <article className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker">Leistungen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Glasreinigung für Flächen, die Kunden und Besucher sofort sehen.
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
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Turnus</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Einmalig, regelmäßig oder vor Übergabe.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Fensterreinigung ist oft der Punkt, der einen Raum sofort heller
              und gepflegter wirken lässt. Für die Planung zählt der Anlass:
              Übergabe, Regelturnus, Renovierung oder sichtbarer Kundenbereich.
            </p>
            <div className="mt-6 grid gap-3">
              {cadenceOptions.map((item) => (
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
              Diese vier Punkte machen das Angebot deutlich genauer.
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
              Für Fensterreinigung sind Bilder oft besser als lange Erklärungen:
              ein Foto von innen, ein Foto von außen, die Etage, die Fensterzahl
              und der Hinweis, ob Rahmen oder Falze mitgereinigt werden sollen.
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
            <div className="flox-kicker">Häufige Fragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Kurze Antworten, damit Umfang und Termin schneller klar werden.
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
              Was Fensterreinigung nicht automatisch bedeutet.
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
                  Weitere passende Leistungen für Glasreinigung in Regensburg.
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
            <div className="flox-kicker">Fensterreinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Fensterzahl, Fotos und Zugang senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Adresse, Fensteranzahl,
              Glasflächen, Innen- oder Außenseite, Rahmenwunsch, Etage, Zugang,
              Termin und ein paar Fotos von Fenstern, Rahmen und Außenbereich.
            </p>
          </div>

          <CommercialCleaningLeadForm />
        </div>
      </section>
    </main>
  );
}
