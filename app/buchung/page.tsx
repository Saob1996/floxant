import type { Metadata } from "next";
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
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";

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
    eyebrow: "Anfrage starten",
    href: "#buchungssystem",
    description:
      "In wenigen Minuten Service, Orte, Termin und Extras sauber an FLOXANT senden.",
    Icon: Calculator,
  },
  {
    title: "Express-Check",
    eyebrow: "Wenig Zeit",
    href: "/express-anfrage",
    description:
      "Für knappe Termine, schnelle Machbarkeitsprüfung und wenige Pflichtangaben.",
    Icon: Zap,
  },
  {
    title: "Preisvorstellung",
    eyebrow: "Budget nennen",
    href: "/anfrage-mit-preisrahmen",
    description:
      "Eigene Preisvorstellung direkt nennen, damit Aufwand, Wunschrahmen und Rückmeldung besser zusammenpassen.",
    Icon: Banknote,
  },
  {
    title: "Leer-Rückfahrt",
    eyebrow: "Freier Laderaum",
    href: "/leerfahrt-rueckfahrt",
    description:
      "Freie Fahrzeugkapazität auf passender Rückfahrt Richtung Regensburg für Möbel, Kartons oder Büroinventar unverbindlich prüfen lassen.",
    Icon: Truck,
  },
];

const requestFlowPoints = [
  "1. Anfrage absenden",
  "2. Angaben werden geprüft",
  "3. Angebot oder Rückruf erhalten",
  "4. Termin nach Bestätigung verbindlich planen",
];

const bookingTrustSignals = [
  "Unverbindlich starten",
  "Klare Rückmeldung statt Rätselraten",
  "Persönlich aus Regensburg betreut",
];

const bookingSteps = [
  {
    name: "Anfrage absenden",
    text: "Sie wählen den passenden Service und senden Ihre Eckdaten direkt an FLOXANT.",
  },
  {
    name: "Angaben werden geprüft",
    text: "Service, Orte, Termin, Umfang und Hinweise werden ordentlich erfasst, damit wir sauber prüfen können.",
  },
  {
    name: "Angebot oder Rückruf",
    text: "Wir prüfen Aufwand, Zugang, Strecke und Terminlage und melden uns mit einer klaren Rückmeldung.",
  },
  {
    name: "Termin verbindlich planen",
    text: "Erst nach Bestätigung oder Auftragsbestätigung wird der Termin gemeinsam verbindlich geplant.",
  },
] as const;

const bookingAdvantages = [
  {
    title: "Direkter Einstieg",
    text: "Statt erst weiterzusuchen, starten Kunden ihre Anfrage sofort auf dem passenden Weg.",
  },
  {
    title: "Klare Prüfung",
    text: "Kunden sehen sofort, dass ihre Angaben zuerst geprüft und dann sauber weitergeführt werden.",
  },
  {
    title: "Weniger Rückfragen",
    text: "Service, Orte, Termin und Hinweise kommen strukturiert an und sparen unnötiges Hin und Her.",
  },
  {
    title: "Verbindlich erst nach Bestätigung",
    text: "Die Anfrage bleibt unverbindlich, bis Angebot oder Auftragsbestätigung gemeinsam abgestimmt sind.",
  },
] as const;

const faqItems = [
  {
    q: "Ist das Absenden der Anfrage schon verbindlich?",
    a: "Nein. Das Absenden der Anfrage ist unverbindlich und stellt noch keine Beauftragung dar. Verbindlich wird ein Termin erst nach Bestätigung oder Auftragsbestätigung.",
  },
  {
    q: "Was passiert nach dem Absenden?",
    a: "FLOXANT prüft Ihre Angaben und meldet sich mit Angebot oder Rückruf. Erst danach wird gemeinsam entschieden, wie es weitergeht.",
  },
  {
    q: "Welcher Weg ist für normale Anfragen am besten?",
    a: "Für die meisten Fälle ist das Buchungssystem der klarste Weg. Wenn es besonders schnell gehen muss, passt der Express-Check. Wenn bereits ein Budget feststeht, hilft die Preisvorstellung.",
  },
  {
    q: "Welche Leistungen kann ich hier anfragen?",
    a: "Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Leer-Rückfahrt und passende Zusatzleistungen wie Montage, Demontage, Transport oder Übergabevorbereitung.",
  },
  {
    q: "Warum sehe ich hier nicht sofort einen Festpreis?",
    a: "Weil FLOXANT keine Lockpreise verspricht. Umfang, Zugang, Strecke, Terminlage und Zusatzleistungen werden zuerst sauber geprüft.",
  },
  {
    q: "Kann ich auch direkt über WhatsApp anfragen?",
    a: "Ja. Wenn Sie lieber schnell schreiben möchten, bleibt WhatsApp als direkter Weg auf dieser Seite erhalten.",
  },
  {
    q: "Was mache ich, wenn mein Fall eher nach gewerblicher Reinigung, Leer-Rückfahrt oder Private Client aussieht?",
    a: "Dann können Sie trotzdem hier starten oder direkt auf den passenden Spezialweg wechseln. Die wichtigsten Wege bleiben auf dieser Seite klar verlinkt.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "buchung",
    title: "FLOXANT Anfrage starten | Umzug, Reinigung & Entsorgung in Regensburg und Bayern",
    description:
      "Umzug, Reinigung oder Entsorgung in Regensburg und Bayern unverbindlich anfragen. FLOXANT prüft Ihre Angaben und meldet sich mit Angebot oder Rückruf.",
    keywords: [
      "Buchung Regensburg",
      "Umzug anfragen Regensburg",
      "Reinigung anfragen Regensburg",
      "Entrümpelung anfragen Regensburg",
      "Google Maps Buchungslink",
      "FLOXANT Buchung",
      "Direkte Anfrage Regensburg",
      "Buchungslink Regensburg",
      "Umzugsfirma Regensburg direkt anfragen",
    ],
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
          "Direkter Anfrageweg für Kunden, die Umzug, Reinigung, Entsorgung oder Leer-Rückfahrt in Regensburg und Bayern schnell anfragen möchten.",
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
          "Zentraler Einstieg für unverbindliche Anfragen, Vorprüfung, Express-Check und Preisvorstellung bei FLOXANT.",
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
          "Crawlbare Einstiege für Buchungssystem, Express-Check, Preisvorstellung und Leer-Rückfahrt.",
        itemListElement: bookingPaths.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: item.href.startsWith("#") ? `${bookingUrl}${item.href}` : `${company.url}${item.href}`,
          description: item.description,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Buchung starten" }]} />

      <section id="ueberblick" className="relative px-6 pb-14 pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_52%_0%,rgba(37,99,235,0.14),transparent_62%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="glass-elevated rounded-[2.35rem] p-7 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              <MapPin className="h-4 w-4" />
              Schnell und unverbindlich anfragen
            </div>
            <h1 className="mt-7 max-w-5xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              FLOXANT Anfrage starten
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Umzug, Reinigung oder Entsorgung in Regensburg und Bayern schnell anfragen. Sie senden
              Ihre Angaben direkt an FLOXANT, wir prüfen den Fall sauber und melden uns mit Angebot
              oder Rückruf. So ist direkt klar, was gebraucht wird, was als Nächstes passiert und
              wann ein Termin wirklich verbindlich wird. Kurz gesagt: lieber gleich gscheid
              anfragen, dann läuft es für alle Seiten ruhiger.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#buchungssystem"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[1.3rem] bg-blue-600 px-6 text-[12px] font-black uppercase tracking-[0.14em] text-white shadow-xl shadow-blue-900/20 transition hover:bg-blue-500"
              >
                Anfrage starten
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/express-anfrage"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[1.3rem] border border-amber-200 bg-amber-50 px-6 text-[12px] font-black uppercase tracking-[0.14em] text-amber-800 transition hover:bg-amber-100"
              >
                <Zap className="h-4 w-4" />
                Express-Check
              </Link>
              <a
                href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[1.3rem] border border-slate-200 bg-white px-6 text-[12px] font-black uppercase tracking-[0.14em] text-slate-700 transition hover:bg-slate-50"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {bookingTrustSignals.map((signal) => (
                <span
                  key={signal}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-sm shadow-slate-950/5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <aside className="glass-elevated rounded-[2.35rem] p-6">
            <div className="rounded-[1.8rem] border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-950">So funktioniert die Anfrage</h2>
              </div>
              <div className="mt-4 space-y-3">
                {requestFlowPoints.map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl border border-blue-100 bg-white p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                    <p className="text-sm leading-relaxed text-slate-700">{point}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
                Das Absenden der Anfrage ist unverbindlich und stellt noch keine Beauftragung dar.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {bookingTrustSignals.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                  <p className="text-sm leading-relaxed text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="preis" className="px-6 pb-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              Kurz erklärt
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Was diese Buchungsseite sofort beantwortet
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Was ist das?",
                text: "Der direkte Anfrageweg von FLOXANT für Umzug, Reinigung und Entsorgung in Regensburg und Bayern.",
              },
              {
                title: "Für wen?",
                text: "Für Kunden, die Umzug, Reinigung, Entrümpelung, B2B-Anfrage oder Spezialfall ohne Umweg starten möchten.",
              },
              {
                title: "Wie läuft es ab?",
                text: "Sie wählen den passenden Einstieg, senden Eckdaten und FLOXANT prüft danach Aufwand, Termin, Zugang und den nächsten Schritt.",
              },
              {
                title: "Wichtige Grenze",
                text: "Diese Seite ist kein Festpreisversprechen. Sie startet eine ehrliche Vorprüfung statt einer künstlich exakten Sofortzusage.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ablauf" className="px-6 pb-10">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(255,255,255,0.92))] p-5 shadow-2xl shadow-blue-950/10">
          <div className="mb-5 flex flex-col gap-3 rounded-[1.65rem] border border-slate-200 bg-white p-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
                Kurzablauf
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                So läuft Ihre Anfrage ab
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">
              Sie senden Ihre Anfrage ab, FLOXANT prüft die Angaben und meldet sich mit Angebot
              oder Rückruf. Verbindlich wird ein Termin erst nach Bestätigung.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {bookingSteps.map((step, index) => (
              <article
                key={step.name}
                className="rounded-[1.55rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-sm font-black text-blue-700">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{step.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="leistungen" className="border-y border-slate-200 bg-slate-50/75 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
                Passenden Einstieg wählen
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Vier Wege, aber ein klares Ziel: Anfrage sauber starten
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">
              Sie wählen einfach den passenden Weg für Ihren Fall, senden die wichtigsten Angaben
              und FLOXANT prüft den nächsten Schritt sauber für Sie.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {bookingPaths.map((item) => {
              const Icon = item.Icon;
              const commonClasses =
                "group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md";

              const content = (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                      {item.eyebrow}
                    </span>
                    <Icon className="h-5 w-5 text-blue-700" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-4 min-h-[84px] text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
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

      <section id="kontakt" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div id="buchungssystem" className="relative -top-24 block h-0 w-0" />
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                <Clock3 className="h-4 w-4" />
                Direktes Buchungssystem
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Anfrage bequem und klar absenden
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 lg:text-right">
              Ihre Angaben kommen direkt beim FLOXANT Team an. So können Service, Orte, Termin,
              Uploads und Hinweise ohne Umweg geprüft und sauber beantwortet werden.
            </p>
          </div>

          <div className="calc-surface relative overflow-hidden rounded-[2.4rem] p-4 shadow-[0_28px_80px_rgba(15,23,42,0.1)] sm:p-6">
            <div className="pointer-events-none absolute inset-0 opacity-18">
              <FloxantSymbolLayer variant="moving" density="soft" className="opacity-70" />
            </div>
            <div className="relative">
              <SmartBookingWizard
                dict={{
                  common: dict.common,
                  calculator: dict.calculator,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="region" className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              Kundenfreundlich erklärt
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              Darum ist dieser Anfrageweg klarer und vertrauenswürdiger
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {bookingAdvantages.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              >
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Häufige Fragen zur FLOXANT Anfrage
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article
                key={item.q}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              >
                <h3 className="text-lg font-semibold text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="zusatzservices" className="border-t border-slate-200 bg-slate-50/70 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              Passender Anschluss
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Von der Buchung direkt auf den richtigen Servicepfad
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Diese Verlinkung hilft Kunden beim Weiterklicken und stärkt gleichzeitig die
              wichtigsten transaktionalen Seiten rund um FLOXANT.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/blog/direkt-anfragen-statt-vergleichsportal-regensburg",
                eyebrow: "Ratgeber",
                title: "Direkt anfragen statt Vergleichsportal",
                text: "Warum klare Direktanfragen oft schneller, ehrlicher und besser planbar sind.",
              },
              {
                href: "/gewerbereinigung-regensburg",
                eyebrow: "B2B",
                title: "Gewerbereinigung Regensburg",
                text: "Gezielter Einstieg für Büro, Praxis, Hotel, Kanzlei und Objektbetrieb.",
              },
              {
                href: "/private-client-service",
                eyebrow: "Exklusiv",
                title: "Private Client Service",
                text: "Separater Bereich für diskrete hochwertige Projekte in Bayern und Baden-Württemberg.",
              },
              {
                href: "/rechner",
                eyebrow: "Preisrahmen",
                title: "Rechner öffnen",
                text: "Für Kunden, die Aufwand, Kostentreiber und Orientierungsrahmen zuerst sauber einordnen möchten.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {item.eyebrow}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
