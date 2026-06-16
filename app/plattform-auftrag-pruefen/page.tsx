import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileSearch,
  MessageCircle,
  Route,
  Scale,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

import { PlatformOrderCheckForm } from "@/components/PlatformOrderCheckForm";
import { OfferCheckInternalLinks, OfferCheckQuickAnswer, OfferCheckScopePanel } from "@/components/offer-check";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/plattform-auftrag-pruefen";
const whatsappText = encodeURIComponent(
  "Hallo FLOXANT, ich habe bereits über eine Plattform oder einen anderen Anbieter angefragt und möchte den Auftrag prüfen lassen. Es geht um [Service] in [Ort]. Angebot/Screenshot/Fotos/Preis kann ich senden.",
);
const whatsappHref = `https://wa.me/4915771105087?text=${whatsappText}`;

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Plattform-Auftrag prüfen lassen - zweite Einschätzung | FLOXANT",
  description:
    "Bereits über eine Plattform angefragt? FLOXANT prüft praktisch, ob Umfang, Preis, Termin, Fotos, Reinigung, Entsorgung oder Übergabe klar sind.",
  keywords: [
    "Plattform-Angebot prüfen",
    "Angebot von Plattform prüfen lassen",
    "Umzugsangebot von Plattform unklar",
    "zweite Einschätzung Umzug Angebot",
    "Plattform Reinigung Angebot prüfen",
    "Plattform Entrümpelung Angebot prüfen",
    "Entsorgung Düsseldorf Angebot prüfen",
    "MyHammer Angebot prüfen",
    "Check24 Angebot prüfen",
    "Angebot vor Zusage prüfen",
  ],
});

const statusSteps = ["Anfrage", "Angebot", "Umfang", "Termin", "Direktprüfung"];

const platformSituations = [
  {
    title: "Angebot erhalten, aber unsicher",
    text: "Umfang, Preis, Etage, Zugang oder Zusatzkosten wirken noch nicht eindeutig.",
    action: "Angebotscheck starten",
    href: "#plattform-form",
    Icon: FileSearch,
  },
  {
    title: "Anbieter meldet sich nicht",
    text: "Der Termin rückt näher, aber Rückfragen, Bestätigung oder Details bleiben offen.",
    action: "Plan B prüfen",
    href: "/plan-b-service",
    Icon: MessageCircle,
  },
  {
    title: "Auftrag geschlossen oder abgebrochen",
    text: "Wenn der bisherige Weg nicht weiterführt, kann FLOXANT eine eigene Anfrage prüfen.",
    action: "Direkt prüfen",
    href: "#plattform-form",
    Icon: AlertCircle,
  },
  {
    title: "Preis oder Leistung unklar",
    text: "Vor Zusage sollten enthaltene Leistungen, Ausschlüsse, Mehrwertsteuer und Zusatzkosten klar sein.",
    action: "Red Flags checken",
    href: "/angebotscheck#red-flag-scanner",
    Icon: Scale,
  },
  {
    title: "Reinigung, Entsorgung oder Übergabe fehlt",
    text: "FLOXANT kann prüfen, ob Zusatzleistungen oder eine eigene Alternative sinnvoll sind.",
    action: "Situation prüfen",
    href: "#plattform-form",
    Icon: ClipboardCheck,
  },
  {
    title: "Düsseldorf Reinigung oder Entsorgung",
    text: "Für Düsseldorf wird je nach Leistung die passende lokale Seite geprüft, inklusive /duesseldorf/umzug.",
    action: "Düsseldorf prüfen",
    href: "#plattform-form",
    Icon: Route,
  },
];

const redFlags = [
  "Ist die Etage genannt?",
  "Ist der Trageweg klar?",
  "Ist ein Aufzug berücksichtigt?",
  "Ist das Volumen realistisch beschrieben?",
  "Sind Start und Ziel eindeutig?",
  "Sind Fahrzeuge oder Fahrten klar?",
  "Ist Zugang oder Parken nötig und geregelt?",
  "Ist Reinigung enthalten oder ausgeschlossen?",
  "Ist Entrümpelung oder Entsorgung enthalten oder ausgeschlossen?",
  "Sind Mehrwertsteuer und Zahlungsbedingungen klar?",
  "Gibt es klare Zusatzkosten-Regeln?",
  "Ist der Termin verbindlich genug?",
  "Gibt es eine schriftliche Bestätigung?",
  "Sind Schlüsselübergabe oder Übergabevorbereitung relevant?",
];

const ways = [
  {
    title: "1. Angebot prüfen",
    text: "Wenn ein Angebot, Screenshot oder Text vorliegt, senden Sie die vorhandenen Angaben direkt an FLOXANT.",
    cta: "Angebot hochladen",
    href: "#plattform-form",
    Icon: UploadCloud,
  },
  {
    title: "2. Red Flags selbst checken",
    text: "Wenn Sie zuerst Orientierung wollen, nutzen Sie den Red-Flag-Scanner für offene Punkte vor der Zusage.",
    cta: "Red-Flag-Check starten",
    href: "/angebotscheck#red-flag-scanner",
    Icon: BadgeCheck,
  },
  {
    title: "3. Direkt mit FLOXANT anfragen",
    text: "Wenn Sie eine Alternative oder zweite Einschätzung brauchen, senden Sie Ort, Termin, Preisrahmen und Fotos.",
    cta: "Direktanfrage starten",
    href: "#plattform-form",
    Icon: ArrowRight,
  },
  {
    title: "4. Plan B prüfen",
    text: "Wenn Termin, Anbieter oder Umfang bereits wackeln, passt der Plan-B-Service besser als ein ruhiger Angebotscheck.",
    cta: "Plan B prüfen lassen",
    href: "/plan-b-service",
    Icon: ShieldCheck,
  },
];

const faqItems = [
  {
    q: "Kann ich ein Angebot von einer Plattform prüfen lassen?",
    a: "Ja. FLOXANT kann vorhandene Angaben organisatorisch und praktisch einordnen: Umfang, Etage, Zugang, Preisrahmen, Termin, Reinigung, Entsorgung oder Übergabe.",
  },
  {
    q: "Muss ich die Plattform nennen?",
    a: "Nein. Die Angabe ist optional. Sie können auch nur Angebot, Screenshot, Preis, Ort, Termin und offene Punkte senden.",
  },
  {
    q: "Kann ich MyHammer oder Check24 erwähnen?",
    a: "Ja, optional. FLOXANT bewertet aber nicht die Plattform, sondern prüft organisatorisch die Angaben zum Auftrag.",
  },
  {
    q: "Ist das eine Rechtsberatung?",
    a: "Nein. Die Prüfung ist eine praktische und organisatorische zweite Einschätzung und ersetzt keine rechtliche Bewertung.",
  },
  {
    q: "Kann FLOXANT ein alternatives Angebot machen?",
    a: "Wenn Ort, Termin, Umfang, Fotos und Kapazität passen, kann FLOXANT eine eigene Anfrage oder Einschätzung prüfen. Es gibt keine Preis- oder Übernahmegarantie.",
  },
  {
    q: "Kann ich nur einen Screenshot senden?",
    a: "Ja. PDF, Screenshot, Bild oder Angebotstext sind möglich. Fotos von Zugang, Menge oder Zustand helfen zusätzlich.",
  },
  {
    q: "Funktioniert das für Düsseldorf?",
    a: "Ja, aber nur für Reinigung und Entsorgung. Düsseldorf-Umzüge werden bei FLOXANT separat geprüft.",
  },
  {
    q: "Was passiert nach dem Absenden?",
    a: "FLOXANT prüft die Angaben, offenen Punkte, Uploads, Ort, Termin und Verfügbarkeit. Wenn Rückfragen nötig sind, melden wir uns.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Plattform-Auftrag prüfen lassen",
      description:
        "Neutrale zweite Einschätzung für Aufträge oder Angebote aus Plattformen, Vergleichsportalen oder von anderen Anbietern.",
      path,
      about: ["Plattform-Auftrag", "Angebotscheck", "Red-Flag-Scanner", "zweite Einschätzung"],
      potentialActions: [
        { name: "Plattform-Auftrag prüfen lassen", target: `${path}#plattform-form` },
        { name: "Plattform-Angebot per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Plattform-Auftrag Prüfung",
      description:
        "Praktische und organisatorische Prüfung von Umfang, Preisrahmen, Termin, Fotos und offenen Punkten nach Plattform- oder Anbieteranfrage. Keine Rechtsberatung und keine Plattformbewertung.",
      path,
      serviceType: "Plattform-Auftrag prüfen lassen",
      areaServed: [
        "Regensburg",
        "Umgebung Regensburg ca. 200 km",
        "Bayern nach Verfügbarkeit",
        "Düsseldorf Reinigung und Entsorgung",
      ],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Plattform-Auftrag prüfen", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function PlattformAuftragPruefenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0f2fe_0,transparent_34rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 shadow-sm">
                <FileSearch className="h-4 w-4" />
                FLOXANT Plattform-Prüfstand
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Plattform-Auftrag prüfen lassen
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Wenn Sie bereits ein Angebot oder eine Anfrage über eine Plattform oder einen anderen Anbieter haben, prüft FLOXANT, ob Umfang, Termin,
                Preisrahmen und offene Punkte nachvollziehbar sind.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#plattform-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700" data-event="service_card_click">
                  Direkt prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/angebot-guenstiger-pruefen" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 text-sm font-black text-blue-800 transition hover:border-blue-300 hover:bg-blue-50" data-event="service_card_click">
                  Günstigere Alternative prüfen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Plattform-Angebot per WhatsApp senden
                </a>
              </div>
              <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-white/80 p-4 text-sm leading-7 text-slate-700">
                Sichere Einordnung: FLOXANT bewertet keine Plattform und diffamiert keine Anbieter. Es geht um praktische Klärung vor Zusage oder eigener Anfrage.
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-950/10">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Direktprüfung</div>
                <p className="mt-3 text-2xl font-black tracking-tight">Anfrage · Angebot · Umfang · Termin</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  FLOXANT sammelt nicht Beschwerden, sondern die entscheidenden Auftragsdaten: Was ist offen, was liegt vor und was soll geprüft werden?
                </p>
              </div>
              <div className="mt-4 grid gap-2">
                {statusSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">{index + 1}</span>
                    <span className="text-sm font-black text-slate-800">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <OfferCheckQuickAnswer />
        <OfferCheckScopePanel />

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Situation</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was ist bei Ihrer Plattform-Anfrage passiert?</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {platformSituations.map((item) => {
                const Icon = item.Icon;
                return (
                  <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <Icon className="h-6 w-6 text-blue-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                    <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700" data-event="service_card_click">
                      {item.action}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <OfferCheckInternalLinks />

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Red Flags</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was vor Zusage klar sein sollte</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Ein Plattform-Angebot kann schnell wirken, aber wichtige organisatorische Punkte sollten vor der Zusage sichtbar sein. Das ist keine
                Rechtsberatung und keine Plattformbewertung.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/angebotscheck#red-flag-scanner" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white" data-event="service_card_click">
                  Red-Flag-Check starten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#plattform-form" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 text-sm font-black text-blue-800" data-event="service_card_click">
                  Ergebnis senden
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {redFlags.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Drei Wege</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">So kommen Plattformkunden schnell weiter</h2>
            <div className="mt-7 grid gap-4 lg:grid-cols-4">
              {ways.map((item) => {
                const Icon = item.Icon;
                return (
                  <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <Icon className="h-6 w-6 text-blue-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                    <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700" data-event="service_card_click" data-source={item.href.includes("plan-b") ? "plan_b_triage" : item.href.includes("red-flag") ? "red_flag_scanner" : "platform_order_check"}>
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Direktanfrage</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Plattform-Auftrag an FLOXANT senden</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Senden Sie nur, was für die praktische Prüfung nötig ist: Ort, Termin, Service, Situation, vorhandenes Angebot, Preisrahmen, Fotos
                und offene Punkte. Sensible Plattform-Auftragsnummern oder Zugangsdaten sollten Sie bitte nicht mitschicken.
              </p>
              <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                <p className="font-black text-slate-950">Düsseldorf-Abgrenzung</p>
                <p className="mt-2">Für Düsseldorf prüft FLOXANT passend zum Anliegen über klare lokale Kontaktmöglichkeiten.</p>
              </div>
            </div>
            <PlatformOrderCheckForm />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-slate-950">Was FLOXANT nicht macht</h2>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-700">
                <li>Keine Rechtsberatung oder Vertragsbewertung.</li>
                <li>Keine Plattform- oder Anbieter-Diffamierung.</li>
                <li>Keine Garantie für billigere Preise.</li>
                <li>Keine Aufforderung zum Vertragsbruch.</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-slate-950">Was geprüft wird</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Umfang, Etage, Zugang, Termin, Fotos, Preisrahmen, Zusatzleistungen, Reinigung, Entsorgung, Übergabe und ob eine eigene Anfrage sinnvoll
                möglich ist.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-slate-950">Wenn es akut wird</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Wenn der Auftrag bereits kippt, führt der bessere Weg in Schadensbegrenzung oder Plan-B-Service.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/plan-b-service" className="text-sm font-black text-blue-700">Plan B</Link>
                <Link href="/schadensbegrenzung" className="text-sm font-black text-red-700">Schadensbegrenzung</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zur Plattform-Auftrag-Prüfung</h2>
            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-8 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Verwandte FLOXANT-Wege</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                ["/angebotscheck", "Angebotscheck"],
                ["/angebotscheck#red-flag-scanner", "Red Flags im Angebot erkennen"],
                ["/angebot-guenstiger-pruefen", "Günstigere Alternative prüfen"],
                ["/plan-b-service", "Plan B nach Plattform-Anfrage"],
                ["/schadensbegrenzung", "Schadensbegrenzung"],
                ["/umzug-regensburg", "Umzug Regensburg"],
                ["/reinigung-regensburg", "Reinigung Regensburg"],
                ["/entruempelung-regensburg", "Entrümpelung Regensburg"],
                ["/rueckfahrt-boerse", "Rückfahrt-Börse"],
                ["/uebergabeakte", "Übergabeakte"],
                ["/duesseldorf/reinigung", "Reinigung Düsseldorf"],
                ["/entsorgung-duesseldorf", "Entsorgung Düsseldorf"],
                ["/buchung", "Direkt anfragen"],
                ["/rechner", "Preisrahmen prüfen"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#plattform-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Angebot senden
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            WhatsApp
          </a>
          <a href="tel:+4915771105087" className="flox-mobile-action flox-mobile-action-light" data-event="phone_click">
            Anrufen
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
