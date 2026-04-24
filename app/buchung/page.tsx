import { Metadata } from "next";
import Link from "next/link";
import {
 ArrowRight,
 Banknote,
 Calculator,
 CheckCircle2,
 Clock3,
 MapPin,
 MessageCircle,
 ShieldCheck,
 Truck,
 Zap,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildServiceJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const bookingUrl = `${company.url}/buchung`;

const bookingPaths = [
 {
  title: "Buchungssystem",
  eyebrow: "Direkt starten",
  href: "#buchungssystem",
  description:
   "Service wählen, Eckdaten eintragen und eine Anfrage direkt an FLOXANT senden.",
  Icon: Calculator,
  actionType: "Action",
 },
 {
  title: "Express-Check",
  eyebrow: "Wenig Zeit",
  href: "/express-anfrage",
  description:
   "Für knappe Termine, schnelle Machbarkeitsprüfung und wenige Pflichtangaben.",
  Icon: Zap,
  actionType: "Action",
 },
 {
  title: "Preisvorschlag",
  eyebrow: "Budget nennen",
  href: "/anfrage-mit-preisrahmen",
  description:
   "Eigene Preisvorstellung übermitteln, ohne dass sie den FLOXANT Preisrahmen ersetzt.",
  Icon: Banknote,
  actionType: "ContactAction",
 },
 {
  title: "Leer-Rückfahrt",
  eyebrow: "Freier Laderaum",
  href: "/leerfahrt-rueckfahrt",
  description:
   "Möbel, Kartons oder Büroinventar auf passender Rückfahrt Richtung Regensburg prüfen lassen.",
  Icon: Truck,
  actionType: "Action",
 },
];

const clarityPoints = [
 "Diese Seite ist der direkte Buchungslink für Google Maps und Google Search.",
 "Das Absenden startet eine Anfrage und Vorprüfung, keine automatische Sofortbeauftragung.",
 "Rechner, Express-Check, Preisvorschlag und Leer-Rückfahrt bleiben klar getrennt.",
 "Regensburg ist der operative Kern; Anfragen aus Bayern werden nach Strecke, Termin und Umfang geprüft.",
];

const bookingSteps = [
 {
  name: "Service auswählen",
  text: "Kunde wählt Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt oder einen passenden Spezialservice.",
 },
 {
  name: "Eckdaten senden",
  text: "Ort, Datum, Umfang, Kontakt und Hinweise werden strukturiert erfasst, ohne sofort einen verbindlichen Preis zu versprechen.",
 },
 {
  name: "FLOXANT prüft operativ",
  text: "FLOXANT ordnet Aufwand, Strecke, Zugang, Terminlage und Zusatzleistungen ein und meldet sich mit dem nächsten klaren Schritt.",
 },
];

const faqItems = [
 {
  q: "Kann ich diese Seite als Buchungslink in Google Maps nutzen?",
  a: "Ja. Die URL https://www.floxant.de/buchung ist als zentraler Buchungs- und Anfrageeinstieg gedacht. Sie bündelt Rechner, Express-Check, Preisvorschlag, Leer-Rückfahrt und Kontakt.",
 },
 {
  q: "Ist eine Anfrage über diese Seite schon ein verbindlicher Auftrag?",
  a: "Nein. FLOXANT startet zuerst eine Vorprüfung. Verbindlich wird ein Auftrag erst nach klarer Abstimmung von Leistung, Termin, Preisrahmen und Bestätigung.",
 },
 {
  q: "Welcher Einstieg ist für Kunden am schnellsten?",
  a: "Für normale Planung ist das Buchungssystem oder der Rechner sinnvoll. Für knappe Zeitfenster passt der Express-Check. Wenn schon ein Budget besteht, ist der Preisvorschlag der richtige Weg.",
 },
 {
  q: "Welche Leistungen kann ich über den Buchungslink anfragen?",
  a: "Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Leer-Rückfahrt und passende Zusatzleistungen wie Montage, Demontage, Transport oder Übergabevorbereitung.",
 },
 {
  q: "Warum führt der Google-Maps-Link nicht direkt zu einem Festpreis?",
  a: "Weil FLOXANT keine Lockpreise oder künstlichen Garantien ausgibt. Umfang, Zugang, Strecke, Terminlage und Zusatzleistungen müssen sauber geprüft werden.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "buchung",
  title: "FLOXANT Buchung Regensburg | direkt Anfrage starten",
  description:
   "Direkter Buchungslink für Google Maps: Umzug, Reinigung, Entrümpelung, Express-Check, Preisvorschlag und Leer-Rückfahrt bei FLOXANT starten.",
 });
}

export default async function BuchungPage() {
 const dict = await getDictionary("de");

 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Buchung starten", item: "/buchung" },
   ]),
   buildWebPageJsonLd({
    name: "FLOXANT Buchung starten",
    description:
     "Direkter Buchungslink für Google Maps, Google Search und Kunden, die eine Anfrage für Umzug, Reinigung, Entrümpelung oder Leer-Rückfahrt starten möchten.",
    path: "/buchung",
    about: [
     "Buchung",
     "Google Maps Buchungslink",
     "Anfrage",
     "Umzug",
     "Reinigung",
     "Entrümpelung",
     "Büroumzug",
     "Leer-Rückfahrt",
     "Regensburg",
     "Bayern",
    ],
   }),
   buildServiceJsonLd({
    name: "FLOXANT Buchungs- und Anfrageweg",
    description:
     "Zentraler Einstieg für unverbindliche Anfragen, Vorprüfung, Express-Check und Preisvorschlag bei FLOXANT.",
    path: "/buchung",
    serviceType: "Buchung und Anfrage",
    areaServed: ["Regensburg", "Bayern"],
   }),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    "@id": `${bookingUrl}#buchungswege`,
    name: "FLOXANT Buchungswege",
    description:
     "Crawlbare Einstiege für Buchungssystem, Express-Check, Preisvorschlag und Leer-Rückfahrt.",
    itemListElement: bookingPaths.map((item, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: item.title,
     url: item.href.startsWith("#") ? `${bookingUrl}${item.href}` : `${company.url}${item.href}`,
     description: item.description,
    })),
   },
   {
    "@type": "WebPage",
    "@id": `${bookingUrl}#google-maps-booking-link`,
    name: "FLOXANT Google Maps Buchungslink",
    url: bookingUrl,
    inLanguage: "de",
    potentialAction: bookingPaths.map((item) => ({
     "@type": item.actionType,
     name: item.title,
     target: item.href.startsWith("#") ? `${bookingUrl}${item.href}` : `${company.url}${item.href}`,
    })),
   },
   {
    "@type": "HowTo",
    "@id": `${bookingUrl}#buchung-ablauf-kurz`,
    name: "FLOXANT Anfrage in drei Schritten starten",
    description:
     "Sichtbarer Kurzablauf für Kunden, die über Google Maps oder Google Search eine FLOXANT Anfrage starten.",
    step: bookingSteps.map((step, index) => ({
     "@type": "HowToStep",
     position: index + 1,
     name: step.name,
     text: step.text,
     url: `${bookingUrl}#buchung-ablauf-kurz`,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Buchung starten" }]} />

   <section className="relative px-6 pb-14 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_52%_0%,rgba(37,99,235,0.28),transparent_62%)]" />
    <div className="pointer-events-none absolute right-[-14%] top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-[90px]" />

    <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
     <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-800 ">
       <MapPin className="h-4 w-4" />
       Direkter Google-Maps-Buchungslink
      </div>
      <h1 className="mt-7 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
       FLOXANT Buchung starten: Umzug, Reinigung oder Entrümpelung direkt anfragen.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
       Diese Seite bündelt alle schnellen Anfragewege für Google Maps, Google Search und
       Kunden, die ohne Umwege starten möchten. Die Anfrage bleibt eine Vorprüfung und
       wird erst nach sauberer Abstimmung verbindlich.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
       <a
        href="#buchungssystem"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-blue-500 px-6 text-[12px] font-black uppercase tracking-[0.14em] text-foreground shadow-xl shadow-blue-900/25 transition hover:bg-blue-400"
       >
        Buchungssystem öffnen
        <ArrowRight className="h-4 w-4" />
       </a>
       <Link
        href="/express-anfrage"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-6 text-[12px] font-black uppercase tracking-[0.14em] text-amber-50 transition hover:bg-amber-300/15"
       >
        <Zap className="h-4 w-4" />
        Express-Check
       </Link>
       <a
        href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-6 text-[12px] font-black uppercase tracking-[0.14em] text-foreground/82 transition hover:bg-white/[0.08]"
       >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
       </a>
      </div>
     </div>

     <aside className="rounded-[2.25rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-6 shadow-2xl shadow-foreground/10">
      <div className="rounded-[1.7rem] border border-blue-300/15 bg-blue-500/10 p-5">
       <div className="flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-blue-600 " />
        <h2 className="text-lg font-semibold text-foreground">URL für Google Business Profile</h2>
       </div>
       <p className="mt-4 text-sm leading-relaxed text-foreground/58">
        Diese URL kann als Buchungs-, Termin- oder Aktionslink im Google Business Profile
        hinterlegt werden:
       </p>
       <div className="mt-4 overflow-x-auto rounded-2xl border border-foreground/10 bg-black/30 px-4 py-3 font-mono text-sm text-blue-800 ">
        {bookingUrl}
       </div>
      </div>

      <div className="mt-5 grid gap-3">
       {clarityPoints.map((point) => (
        <div key={point} className="flex gap-3 rounded-2xl border border-foreground/10 bg-white/[0.03] p-4">
         <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700 " />
         <p className="text-sm leading-relaxed text-foreground/55">{point}</p>
        </div>
       ))}
      </div>
     </aside>
    </div>
   </section>

   <section id="buchung-ablauf-kurz" className="px-6 pb-10">
    <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-blue-300/15 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(255,255,255,0.025))] p-5 shadow-2xl shadow-blue-950/20">
     <div className="mb-5 flex flex-col gap-3 rounded-[1.65rem] border border-foreground/10 bg-foreground/5 p-6 md:flex-row md:items-end md:justify-between">
      <div>
       <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 ">
        Kurzablauf
       </p>
       <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        In drei Schritten von Google Maps zur echten Vorprüfung.
       </h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-foreground/45 md:text-right">
       Für Kunden ist sofort sichtbar: Diese Seite startet eine Anfrage, aber keinen automatischen
       Festauftrag. Das erhöht Vertrauen und reduziert falsche Erwartungen.
      </p>
     </div>

     <div className="grid gap-3 md:grid-cols-3">
      {bookingSteps.map((step, index) => (
       <article
        key={step.name}
        className="rounded-[1.55rem] border border-foreground/10 bg-white/[0.03] p-5"
       >
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-300/15 bg-blue-400/10 text-sm font-black text-blue-800 ">
         {index + 1}
        </div>
        <h3 className="text-xl font-semibold text-foreground">{step.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/48">{step.text}</p>
       </article>
      ))}
     </div>
    </div>
   </section>

   <section className="border-y border-foreground/5 bg-slate-950/45 px-6 py-16">
    <div className="mx-auto max-w-7xl">
     <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
       <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 ">
        Passenden Einstieg wählen
       </div>
       <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Vier Wege, aber ein klares Ziel: Anfrage sauber starten.
       </h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-foreground/45 md:text-right">
       Für Google und Kunden bleibt die Suchintention eindeutig: Buchung starten, Aufwand
       vorprüfen, Kontakt aufnehmen oder freie Rückfahrt nutzen.
      </p>
     </div>

     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {bookingPaths.map((item) => {
       const Icon = item.Icon;
       const commonClasses =
        "group rounded-[1.75rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-6 transition-all hover:-translate-y-1 hover:border-blue-300/25 hover:bg-blue-500/[0.08]";

       const content = (
        <>
         <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-blue-300/15 bg-blue-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-800 ">
           {item.eyebrow}
          </span>
          <Icon className="h-5 w-5 text-blue-700 " />
         </div>
         <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">{item.title}</h3>
         <p className="mt-4 min-h-[84px] text-sm leading-relaxed text-foreground/48">
          {item.description}
         </p>
         <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 ">
          Öffnen
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
         </span>
        </>
       );

       return item.href.startsWith("#") ? (
        <a key={item.title} href={item.href} className={commonClasses}>
         {content}
        </a>
       ) : (
        <Link key={item.title} href={item.href} className={commonClasses}>
         {content}
        </Link>
       );
      })}
     </div>
    </div>
   </section>

   <section id="buchungssystem" className="px-6 py-20">
    <div className="mx-auto max-w-6xl">
     <div className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
      <div>
       <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 ">
        <Clock3 className="h-4 w-4" />
        Direktes Buchungssystem
       </div>
       <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        Anfrage aus Google Maps ohne Umweg absenden.
       </h2>
      </div>
      <p className="text-sm leading-relaxed text-foreground/48 lg:text-right">
       Die Angaben werden an das bestehende Buchungssystem übergeben. So sieht FLOXANT im
       Dashboard Serviceart, Kontakt, Datum, Adressen, Hinweise und Zusatzleistungen.
      </p>
     </div>

     <div className="rounded-[2.25rem] border border-foreground/10 bg-black/35 p-4 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-6">
      <SmartBookingWizard
       dict={{
        common: dict.common,
        calculator: dict.calculator,
       }}
      />
     </div>
    </div>
   </section>

   <section className="border-t border-foreground/5 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
     <div>
      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 ">
       Für Maps, SEO und Kundenklarheit
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
       Warum diese Buchungsseite besser ist als ein einzelner Formularlink.
      </h2>
     </div>
     <div className="grid gap-4 md:grid-cols-2">
      {[
       {
        title: "Ein Link für Google Maps",
        text: "Statt mehrere unklare URLs zu verteilen, führt alles über eine stabile, crawlbare Buchungsseite.",
       },
       {
        title: "Mehr Klickvertrauen",
        text: "Kunden sehen sofort, welche Anfrageform passt und dass keine automatische Kostenpflicht entsteht.",
       },
       {
        title: "Stärkere interne Signale",
        text: "Die Seite verlinkt logisch auf Rechner, Express-Check, Preisvorschlag und Leer-Rückfahrt.",
       },
       {
        title: "Besser für spätere Auswertung",
        text: "Alle Wege führen in bestehende Anfrage- und Dashboard-Strukturen, ohne eine neue Parallel-Logik zu bauen.",
       },
      ].map((item) => (
       <article key={item.title} className="rounded-[1.5rem] border border-foreground/10 bg-white/[0.03] p-6">
        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/50">{item.text}</p>
       </article>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-foreground/5 px-6 py-20">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 ">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
       Häufige Fragen zur FLOXANT Buchung
      </h2>
     </div>
     <div className="space-y-4">
      {faqItems.map((item) => (
       <article key={item.q} className="rounded-[1.5rem] border border-foreground/10 bg-white/[0.025] p-6">
        <h3 className="text-lg font-semibold text-foreground">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/50">{item.a}</p>
       </article>
      ))}
     </div>
    </div>
   </section>
  </main>
 );
}
