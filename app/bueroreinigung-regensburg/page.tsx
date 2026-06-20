import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Coffee,
  FileText,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { B2BRequestPanel } from "@/components/B2BRequestPanel";
import { B2BTrustPanel } from "@/components/B2BTrustPanel";
import { BusinessTrustPanel } from "@/components/BusinessTrustPanel";
import { CommercialCleaningScopeSelector } from "@/components/CommercialCleaningScopeSelector";
import { CommercialCleaningLeadForm } from "@/components/CommercialCleaningLeadForm";
import { InternationalCustomerHint } from "@/components/conversion";
import { EffortFactorsPanel } from "@/components/EffortFactorsPanel";
import { RecurringCleaningHint } from "@/components/RecurringCleaningHint";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { RegensburgCleaningBuyerPath } from "@/components/RegensburgCleaningBuyerPath";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";


const pagePath = "/bueroreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Büroreinigung Regensburg",
    title: "Sauberes Büro ohne lange Abstimmung",
    text: "Für Arbeitsplätze, Besprechungsräume, Empfang, Flure, Küche, Sanitär und sichtbare Kundenbereiche.",
    Icon: Building2,
  },
  {
    phrase: "Büroreinigung Regensburg Angebot",
    title: "Angebot mit Fläche, Turnus und Räumen",
    text: "Kunden senden Quadratmeter, Raumliste, gewünschte Häufigkeit, Zeitfenster, Zugang und Fotos.",
    Icon: FileText,
  },
  {
    phrase: "Büroreinigung Kosten Regensburg",
    title: "Kosten hängen vom Büroalltag ab",
    text: "Nutzung, Küchen, Sanitär, Besprechungsräume, Mitarbeiterzahl, Boden und Reinigungszeiten verändern den Aufwand.",
    Icon: CalendarClock,
  },
  {
    phrase: "Büro Reinigungskraft Regensburg",
    title: "Verlässlicher Ablauf statt Zufall",
    text: "FLOXANT prüft feste Ansprechpartner, Schlüssel, Alarm, Randzeiten und laufende Abstimmung zum Objekt.",
    Icon: Users,
  },
];

const officeZones = [
  { label: "Arbeitsplätze", text: "Schreibtische nach Absprache, Böden, Papierkörbe, sichtbare Flächen und Laufwege.", Icon: BriefcaseBusiness },
  { label: "Küche & Pausenraum", text: "Arbeitsflächen, Spülbereich, Tische, sichtbare Geräteflächen, Müll und Boden.", Icon: Coffee },
  { label: "Sanitär", text: "WC, Waschbecken, Spiegel, Armaturen, Verbrauchsmaterial nach Absprache und Boden.", Icon: ShieldCheck },
  { label: "Empfang & Meeting", text: "Besprechungsräume, Eingang, Empfang, Flure und Kundenbereiche mit sauberem Eindruck.", Icon: Building2 },
];

const cadenceOptions = [
  {
    label: "Täglich",
    text: "Für Empfang, stark genutzte Büros, Sanitär und Flächen mit viel Kundenkontakt.",
  },
  {
    label: "2-3 mal pro Woche",
    text: "Für normale Büroflächen, Kanzleien, Agenturen und Praxen mit planbarem Betrieb.",
  },
  {
    label: "Wöchentlich",
    text: "Für kleinere Büros, Nebenflächen, Studios oder Büros mit geringer Kundenfrequenz.",
  },
  {
    label: "Nach Feierabend",
    text: "Für Reinigung vor oder nach Bürozeiten, wenn Zugang, Schlüssel und Alarm sauber geklärt sind.",
  },
];

const requestChecklist = [
  "Büro-Adresse in Regensburg",
  "Quadratmeter und Anzahl der Räume",
  "Arbeitsplätze und Mitarbeiterzahl",
  "Küche, Sanitär und Besprechungsräume",
  "Bodenart und besondere Oberflächen",
  "Gewünschter Turnus",
  "Zeitfenster, Schlüssel und Alarm",
  "Fotos oder kurzer Rundgang",
];

const trustSignals = [
  "klare Raumliste statt pauschaler Putzliste",
  "Turnus nach Nutzung, nicht nur nach Quadratmetern",
  "Fotos oder Rundgang für realistische Einordnung",
  "saubere Trennung von Unterhalt, Grundreinigung und Extras",
  "feste Ansprechpartner nach Abstimmung",
  "keine Preiszusage ohne Objektprüfung",
];

const boundaries = [
  "keine medizinische Spezialdesinfektion",
  "keine Reinraum- oder Gefahrstoffreinigung",
  "kein Hausmeisterdienst oder Winterdienst",
  "keine IT-Arbeit an Geräten, Servern oder Kabeln",
  "keine Fassadenkletterei oder Hebebühne",
  "keine 24/7-Zusage ohne gesonderte Prüfung",
];

const faqItems = [
  {
    q: "Was kostet Büroreinigung in Regensburg?",
    a: "Die Kosten hängen von Fläche, Raumliste, Turnus, Nutzung, Küche, Sanitär, Boden, Zugang, Zeitfenster und gewünschtem Leistungsumfang ab. Für ein realistisches Angebot braucht FLOXANT Objektart, Quadratmeter, Häufigkeit, Fotos oder eine kurze Beschreibung.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Büroreinigung-Angebot?",
    a: "Wichtig sind Adresse, Fläche, Anzahl der Räume, Arbeitsplätze, Sanitärbereiche, Küche, Bodenart, gewünschter Turnus, Zeitfenster, Zugang, Ansprechpartner und Fotos. Je konkreter die Anfrage, desto schneller wird die Rückmeldung.",
  },
  {
    q: "Ist Büroreinigung auch nach Feierabend möglich?",
    a: "Ja, wenn Schlüsselzugang, Alarmanlage, Verantwortliche, Zeitfenster und Ablauf sauber geklärt sind. Viele B2B-Anfragen laufen früh, spät oder in betriebsruhigen Zeiten.",
  },
  {
    q: "Ist Büroreinigung dasselbe wie Unterhaltsreinigung?",
    a: "Büroreinigung ist häufig ein Teil der Unterhaltsreinigung. Diese Seite fokussiert Büros, Kanzleien, Agenturen und Bürobereiche; die Unterhaltsreinigung-Seite ordnet wiederkehrende Objektpflege breiter ein.",
  },
  {
    q: "Kann FLOXANT auch kleine Büros oder Agenturen reinigen?",
    a: "Ja. Gerade kleine Büros, Agenturen, Kanzleien, Studios und Verwaltungsflächen können sinnvoll geprüft werden, wenn Fläche, Räume, Turnus, Zugang und Zeitfenster klar sind.",
  },
];

const relatedLinks = [
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
  { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
  { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
  { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
  { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
  { href: "/unterhaltsreinigung-regensburg", label: "Unterhaltsreinigung Regensburg" },
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/blog/bueroreinigung-regensburg-angebot-einholen", label: "Ratgeber Büroreinigung" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "bueroreinigung-regensburg",
    title: "Bueroreinigung Regensburg mit Raumliste und Angebot",
    description:
      "Bueroreinigung Regensburg anfragen: Raumliste, Flaeche, Turnus, Zeitfenster, Fotos und Ansprechpartner fuer ein klares Angebot senden.",
  });
}

export default function BueroreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Büroreinigung in Regensburg anfragen. Bürofläche, Räume, Turnus, Zeitfenster und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
        { name: "Büroreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Büroreinigung Regensburg",
        description:
          "Büroreinigung in Regensburg für Büros, Kanzleien, Agenturen, Studios und Verwaltungsflächen nach Fläche, Raumliste, Turnus, Zeitfenster, Zugang und Fotos.",
        path: pagePath,
        serviceType:
          "Büroreinigung, Büro-Unterhaltsreinigung, Kanzleireinigung, Agenturreinigung und gewerbliche Reinigung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
        availableLanguage: ["de", "en"],
      }),
      buildWebPageJsonLd({
        name: "Büroreinigung Regensburg für Büro, Kanzlei, Agentur und Verwaltung",
        description:
          "Büroreinigung in Regensburg für Büros, Kanzleien, Agenturen und Verwaltungsflächen mit Turnus, Raumliste, Zeitfenster, Fotos, FAQ und direkter Anfrage.",
        path: pagePath,
        about: [
          "Büroreinigung Regensburg",
          "Büroreinigung Angebot",
          "Büroreinigung Kosten",
          "Büro Reinigungskraft",
          "Reinigungsplan Büro",
          "Kanzleireinigung",
          "Agenturreinigung",
        ],
        potentialActions: [
          { name: "Büroreinigung anfragen", target: `${pagePath}#kontakt`, type: "ContactAction" },
          { name: "Büroreinigung per WhatsApp anfragen", target: whatsappUrl, type: "ContactAction" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Typische Anlässe für Büroreinigung Regensburg",
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
          { label: "Büroreinigung Regensburg" },
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
                Büroreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[17ch] text-[clamp(2.1rem,4.3vw,4rem)] font-black leading-[0.98] text-slate-950">
                Bueroreinigung Regensburg mit Raumliste, Turnus und Randzeit klaeren.
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-8 text-slate-700">
                FLOXANT prueft Bueroreinigung in Regensburg nach Bueroflaeche,
                Raumliste, Turnus, Kueche, Sanitaer, Boden, Randzeit, Zugang,
                Schluesselweg und Fotos. So wird sichtbar, ob laufende Reinigung,
                Grundreinigung oder ein Angebotscheck der passende naechste Schritt ist.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Büroreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Anlässe", "#kunden-suchen"],
                  ["Bürobereiche", "#bereiche"],
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
                  Büroreinigung anfragen
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
                  src="/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp"
                alt="Helles Büro als Beispiel für Büroreinigung in Regensburg"
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
                    Angebot nach Raumliste
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                    Aus Quadratmetern wird erst mit Räumen, Nutzung und Zeitfenster ein echtes Angebot.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Turnus", "planbar"],
                      ["Zugang", "geklärt"],
                      ["Räume", "sichtbar"],
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

      <InternationalCustomerHint
        cityLabel="Regensburg"
        serviceLabel="Büroreinigung, Unterhaltsreinigung oder gewerbliche Reinigung"
        tags={["Office cleaning", "Commercial cleaning", "Cleaning service", "Cleaning quote", "Photos welcome"]}
        primaryHref="#kontakt"
        photoHref="#kontakt"
        offerHref="/angebot-guenstiger-pruefen#guenstiger-form"
      />

      <B2BRequestPanel city="regensburg" />
      <CommercialCleaningScopeSelector city="regensburg" />
      <EffortFactorsPanel group="b2b" />
      <BusinessTrustPanel />
      <B2BTrustPanel />
      <ServiceProofChecklist serviceKey="b2b" />

      <RegensburgCleaningBuyerPath
        serviceLabel="Büroreinigung Regensburg"
        headline="Wenn das Büro sauber wirken muss, soll die Anfrage nicht hängen bleiben."
        intro="Büro-Kunden in Regensburg wollen schnell wissen, welche Angaben zählen: Fläche, Räume, Turnus, Küche, Sanitär, Zugang und Fotos. Dieser Block führt direkt zu den passenden nächsten Wegen."
        focusHrefs={[
          "/unterhaltsreinigung-regensburg",
          "/fensterreinigung-regensburg",
          "/teppichreinigung-regensburg",
          "/gewerbereinigung-regensburg",
        ]}
        bookingHref="/buchung?service=reinigung&city=regensburg&source=bueroreinigung_regensburg#buchungssystem"
      />

      <section id="kunden-suchen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Typische Anlässe</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Büroreinigung beginnt mit klaren Angaben zum Arbeitsalltag.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Für eine passende Einordnung zählen Bürofläche, Raumliste, Küche,
              Sanitärbereiche, gewünschter Turnus, Zeitfenster, Zugang und Fotos.
              So wird aus einer vagen Anfrage ein sauber planbarer Ablauf.
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
            <div className="flox-kicker">Bürobereiche</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Büroreinigung wird besser, wenn die Bereiche klar benannt sind.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {officeZones.map((item) => {
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
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Angebotsqualität</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black text-white">
              Gute Büroreinigung beginnt vor dem ersten Termin.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              FLOXANT fragt bewusst nach Nutzung, Räumen, Turnus und Zugang.
              Dadurch wird die Anfrage qualifizierter und der spätere Ablauf
              stabiler.
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
              Der richtige Rhythmus hängt von Nutzung, Kundenkontakt und Bürozeiten ab.
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
              Diese Angaben machen aus einer Suche eine gute Anfrage.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Für Büroreinigung zählen Quadratmeter, aber nicht allein. Erst mit
              Nutzung, Raumliste, Zeitfenster und Zugang kann FLOXANT sauber
              prüfen, ob ein Angebot realistisch ist.
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
              Was Büroreinigung nicht automatisch enthält.
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
                  Weitere Leistungen, die zu Ihrer Büroreinigung passen.
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
            <div className="flox-kicker">Büroreinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Bürofläche, Turnus und Räume senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Adresse, Quadratmeter,
              Raumliste, gewünschte Häufigkeit, Zeitfenster, Zugang und ein paar
              Fotos vom Büro.
            </p>
          </div>

          <div className="mb-5">
            <RecurringCleaningHint />
          </div>
          <CommercialCleaningLeadForm />
        </div>
      </section>
    </main>
  );
}
