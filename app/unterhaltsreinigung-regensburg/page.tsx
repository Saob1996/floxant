import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  KeyRound,
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
import { RegensburgCleaningBuyerPath } from "@/components/RegensburgCleaningBuyerPath";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export const revalidate = 3600;

const pagePath = "/unterhaltsreinigung-regensburg";

type IntentCard = {
  phrase: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const customerIntents: IntentCard[] = [
  {
    phrase: "Unterhaltsreinigung Regensburg",
    title: "Regelmäßige Reinigung mit Turnus",
    text: "Für Büros, Kanzleien, Praxen, Treppenhäuser und Gewerbeflächen, die dauerhaft sauber bleiben sollen.",
    Icon: CalendarClock,
  },
  {
    phrase: "Büroreinigung Regensburg Angebot",
    title: "Angebot mit Fläche und Räumen",
    text: "Kunden senden Objektart, Quadratmeter, Raumliste, Sanitärbereiche, Küche, Zeitfenster und Wunschstart.",
    Icon: FileText,
  },
  {
    phrase: "Reinigungsplan Büro Regensburg",
    title: "Plan statt lose Putzliste",
    text: "Arbeitsplätze, Böden, Besprechungsräume, Küche, Sanitär, Müll und Sonderpunkte werden nachvollziehbar geordnet.",
    Icon: ClipboardCheck,
  },
  {
    phrase: "Reinigungskraft Büro Regensburg",
    title: "Verlässliche Betreuung",
    text: "FLOXANT prüft, ob feste Ansprechpartner, Schlüsselzugang, Randzeiten und laufende Abstimmung zum Objekt passen.",
    Icon: Users,
  },
];

const serviceAreas = [
  "Büroflächen und Agenturen",
  "Kanzleien und Verwaltungsräume",
  "Hotels, Pensionen und Boardinghouses nach Absprache",
  "Praxis-Nebenflächen nach Absprache",
  "Treppenhäuser und Gemeinschaftsflächen",
  "Küchen, Pausenräume und Sanitär",
  "Empfang, Flure und Besprechungsräume",
  "Bodenpflege im laufenden Betrieb",
  "Glasflächen innen nach Absprache",
];

const cadenceOptions = [
  {
    label: "Täglich",
    text: "Für stark genutzte Büros, Empfang, Sanitär und Flächen mit viel Kundenkontakt.",
  },
  {
    label: "Mehrmals pro Woche",
    text: "Für normale Büro- und Praxisnutzung mit festen Reinigungstagen und klarer Raumliste.",
  },
  {
    label: "Wöchentlich",
    text: "Für kleinere Büros, Kanzleien, Nebenflächen oder Treppenhäuser mit planbarem Aufwand.",
  },
  {
    label: "Kombiniert",
    text: "Unterhaltsreinigung plus Grundreinigung, Fenster, Eventreinigung oder Sondertermin nach Prüfung.",
  },
];

const requestChecklist = [
  "Objektart und Adresse",
  "Fläche und Raumliste",
  "Gewünschter Turnus",
  "Sanitär, Küche und Müll",
  "Zeitfenster und Zugang",
  "Fotos oder kurzer Rundgang",
];

const boundaries = [
  "keine medizinische Spezialdesinfektion ohne Prüfung",
  "keine Reinraum- oder Gefahrstoffreinigung",
  "kein Hausmeisterdienst oder Winterdienst",
  "keine Fassadenkletterei oder Hebebühne",
  "keine 24/7-Zusage ohne gesonderte Abstimmung",
];

const faqItems = [
  {
    q: "Was kostet Unterhaltsreinigung in Regensburg?",
    a: "Der Preis hängt von Fläche, Raumliste, Turnus, Sanitärbereichen, Boden, Zugang, Zeitfenster und gewünschtem Leistungsumfang ab. Für ein realistisches Angebot braucht FLOXANT Objektart, Quadratmeter, Häufigkeit, Fotos oder eine kurze Beschreibung.",
  },
  {
    q: "Ist Unterhaltsreinigung dasselbe wie Büroreinigung?",
    a: "Büroreinigung ist oft ein Teil der Unterhaltsreinigung. Unterhaltsreinigung meint den wiederkehrenden Reinigungsplan für ein Objekt, zum Beispiel Büro, Kanzlei, Praxis, Treppenhaus oder Gewerbefläche.",
  },
  {
    q: "Kann FLOXANT außerhalb der Öffnungszeiten reinigen?",
    a: "Ja, wenn Schlüsselzugang, Verantwortliche, Alarmanlage, Zeitfenster und Ablauf sauber geklärt sind. Viele B2B-Anfragen laufen früh, spät oder in betriebsruhigen Zeiten.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Angebot?",
    a: "Wichtig sind Objektart, Ort, Fläche, Räume, Sanitär, Küche, Boden, Turnus, gewünschter Start, Zugang, Ansprechpartner und Fotos. Je klarer die Anfrage, desto schneller kann FLOXANT eine Rückfrage oder ein Angebot senden.",
  },
  {
    q: "Übernimmt FLOXANT auch Praxis- oder Kanzleireinigung?",
    a: "Praxis- und Kanzleiflächen können nach Absprache geprüft werden. FLOXANT bewirbt hier normale Objekt- und Nebenflächenreinigung, keine medizinische Spezialdesinfektion oder Reinraumleistung ohne gesonderte Prüfung.",
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
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg" },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
  { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
  { href: "/blog/bueroreinigung-regensburg-angebot-einholen", label: "Büroreinigung Angebot" },
  { href: "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel", label: "Ratgeber Unterhaltsreinigung" },
  { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "unterhaltsreinigung-regensburg",
    title: "Unterhaltsreinigung Regensburg | Büro & Objekt | FLOXANT",
    description:
      "Unterhaltsreinigung in Regensburg für Büro, Praxis, Kanzlei, Treppenhaus und Gewerbe. Turnus, Fläche, Reinigungsplan, Fotos und Angebot prüfen.",
    keywords: [
      "Unterhaltsreinigung Regensburg",
      "Büroreinigung Regensburg Angebot",
      "Reinigungsplan Büro Regensburg",
      "Reinigungskraft Büro Regensburg",
      "Objektreinigung Regensburg",
      "Gebäudereinigung Regensburg",
      "Praxisreinigung Regensburg",
      "Kanzleireinigung Regensburg",
      "Treppenhausreinigung Regensburg",
    ],
  });
}

export default function UnterhaltsreinigungRegensburgPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, wir möchten Unterhaltsreinigung in Regensburg anfragen. Objektart, Fläche, Turnus, Zeitfenster und Fotos können wir senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Gewerbereinigung Regensburg", item: "/gewerbereinigung-regensburg" },
        { name: "Unterhaltsreinigung Regensburg", item: pagePath },
      ]),
      buildServiceJsonLd({
        name: "Unterhaltsreinigung Regensburg",
        description:
          "Regelmäßige Unterhaltsreinigung, Büroreinigung und Objektreinigung in Regensburg nach Fläche, Turnus, Raumliste, Zeitfenster, Zugang und Fotos.",
        path: pagePath,
        serviceType:
          "Unterhaltsreinigung, Büroreinigung, Objektreinigung, Gebäudereinigung, Praxisreinigung, Kanzleireinigung und Treppenhausreinigung in Regensburg",
        areaServed: ["Regensburg", "Landkreis Regensburg", "Neutraubling", "Lappersdorf", "Pentling", "Bayern nach Verfügbarkeit"],
      }),
      buildWebPageJsonLd({
        name: "Unterhaltsreinigung Regensburg für Büro, Praxis, Kanzlei und Objekt",
        description:
          "Kundennaher Einstieg für wiederkehrende Reinigungsanfragen in Regensburg mit Reinigungsplan, Turnus, Anfragecheckliste und Angebot.",
        path: pagePath,
        about: [
          "Unterhaltsreinigung Regensburg",
          "Büroreinigung Regensburg",
          "Reinigungsplan Büro",
          "Objektreinigung",
          "Gebäudereinigung",
          "Praxisreinigung",
          "Kanzleireinigung",
          "Treppenhausreinigung",
        ],
        potentialActions: [
          { name: "Unterhaltsreinigung anfragen", target: `${pagePath}#kontakt` },
          { name: "Reinigungsangebot prüfen", target: "/angebot-guenstiger-pruefen" },
        ],
      }),
      {
        "@type": "ItemList",
        name: "Kundensuchen zur Unterhaltsreinigung Regensburg",
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
          { label: "Unterhaltsreinigung Regensburg" },
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
                Unterhaltsreinigung Regensburg
              </div>

              <h1 className="mt-6 max-w-[16ch] text-[clamp(2.15rem,4.5vw,4.2rem)] font-black leading-[0.96] tracking-tight text-slate-950">
                Büro, Praxis und Objekt regelmäßig sauber halten.
              </h1>

              <p className="mt-5 max-w-[58ch] text-base leading-8 text-slate-700">
                FLOXANT prüft Unterhaltsreinigung in Regensburg nach Objektart,
                Fläche, Reinigungsplan, Turnus, Zeitfenster, Zugang und Fotos.
                Ideal für Büros, Kanzleien, Praxen, Hausverwaltungen und kleine
                Gewerbeflächen, die einen verlässlichen Ablauf brauchen.
              </p>

              <nav
                aria-label="Schnelle Auswahl für Unterhaltsreinigung Regensburg"
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  ["Kundensuchen", "#kunden-suchen"],
                  ["Leistungen", "#leistungen"],
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
                  Angebot anfragen
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
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop"
                alt="Helles Büro als Beispiel für Unterhaltsreinigung in Regensburg"
                fill
                priority
                sizes="(min-width: 1280px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/10" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 md:p-8">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Wiederkehrender Objektplan
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
                    Aus einzelnen Putzterminen wird ein nachvollziehbarer Reinigungsplan.
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Turnus", "klar"],
                      ["Räume", "geordnet"],
                      ["Zugang", "geprüft"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[1rem] border border-white/15 bg-white/12 px-4 py-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">{label}</p>
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
        serviceLabel="Unterhaltsreinigung Regensburg"
        headline="Regelmäßige Reinigung braucht einen Plan, den Kunden sofort verstehen."
        intro="Unterhaltsreinigung wird besser angefragt, wenn Objektart, Turnus, Raumliste, Sanitär, Küche, Schlüsselzugang und Starttermin klar sind. Genau darauf führt der Regensburg-Kundenweg hin."
        focusHrefs={[
          "/bueroreinigung-regensburg",
          "/praxisreinigung-regensburg",
          "/treppenhausreinigung-regensburg",
          "/gewerbereinigung-regensburg",
        ]}
        bookingHref="/buchung?service=reinigung&city=regensburg&source=unterhaltsreinigung_regensburg#buchungssystem"
      />

      <section id="kunden-suchen" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Kundensuchen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Die Seite spricht die Wörter an, die Kunden wirklich eingeben.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Wer nach Unterhaltsreinigung sucht, will selten nur eine allgemeine
              Reinigungsfirma. Meist geht es um Turnus, Büroreinigung, Reinigungsplan,
              Kosten, Zugang und einen Start ohne Betriebsausfall.
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
                  <p className="mt-5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                    {item.phrase}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">{item.title}</h3>
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
            <div className="flox-kicker">Leistungsumfang</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Was bei laufender Büro- und Objektreinigung geprüft wird.
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {serviceAreas.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">Nicht blind zusagen</div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.7vw,3rem)] font-black tracking-tight text-white">
              Gute Unterhaltsreinigung beginnt mit Grenzen.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              FLOXANT formuliert bewusst klar, was nicht automatisch dazugehört.
              So entstehen weniger Missverständnisse und bessere Anfragen.
            </p>
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

      <section id="turnus" className="flox-section pt-0">
        <div className="flox-shell">
          <div className="max-w-3xl">
            <div className="flox-kicker">Turnus & Ablauf</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Der passende Rhythmus hängt vom Objekt ab, nicht von einer Pauschale.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cadenceOptions.map((item) => (
              <article key={item.label} className="flox-panel rounded-[1.5rem] p-6">
                <Clock className="h-6 w-6 text-blue-700" />
                <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">{item.label}</h3>
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
              Diese Angaben machen ein Angebot schneller.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Je konkreter die Anfrage, desto besser kann FLOXANT prüfen, ob
              Turnus, Team, Schlüsselzugang und Leistung realistisch zusammenpassen.
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
        <div className="flox-shell grid gap-5 lg:grid-cols-3">
          <article className="flox-panel rounded-[1.6rem] p-6">
            <Building2 className="h-7 w-7 text-blue-700" />
            <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">Büro und Agentur</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Für Arbeitsplätze, Meetingräume, Küche, Sanitär, Müll, Böden und sichtbare Kundenbereiche.
            </p>
          </article>
          <article className="flox-panel rounded-[1.6rem] p-6">
            <Stethoscope className="h-7 w-7 text-blue-700" />
            <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">Praxis und Kanzlei</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Für normale Nebenflächen, Empfang, Wartebereich, Verwaltung und Personalräume nach Absprache.
            </p>
          </article>
          <article className="flox-panel rounded-[1.6rem] p-6">
            <KeyRound className="h-7 w-7 text-blue-700" />
            <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">Hausverwaltung</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Für Treppenhaus, Eingang, Aufzug, Gemeinschaftsflächen und klare Schlüssel-/Zugangslogik.
            </p>
          </article>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="flox-panel rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
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
          </div>
        </div>
      </section>

      <section className="flox-section pt-0">
        <div className="flox-shell">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">Passende nächste Wege</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  Interne Links für Regensburg-Reinigung und B2B-Suchen.
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
            <div className="flox-kicker">Unterhaltsreinigung anfragen</div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Objekt, Turnus und Fläche senden. FLOXANT prüft den nächsten Schritt.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Für eine schnelle Einordnung reichen Objektart, Fläche, Raumliste,
              gewünschte Häufigkeit, Zeitfenster, Zugang und ein paar Fotos.
            </p>
          </div>

          <CommercialCleaningLeadForm />
        </div>
      </section>

    </main>
  );
}
