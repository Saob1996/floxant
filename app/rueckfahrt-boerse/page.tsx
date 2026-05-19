import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, MapPinned, PackageCheck, Radar, Route, ShieldCheck, SlidersHorizontal, Truck } from "lucide-react";

import { ReturnTripBoardForm } from "@/components/ReturnTripBoardForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/rueckfahrt-boerse";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Rückfahrt-Börse – Leerfahrt & Transportstrecke prüfen | FLOXANT",
  description:
    "Start, Ziel, Datum und Umfang eintragen. FLOXANT prüft, ob Ihre Strecke zu einer Rückfahrt, Leerfahrt oder flexiblen Transportlösung ab Regensburg und Bayern passt.",
  keywords: [
    "Rückfahrt Transport",
    "Leerfahrt Umzug",
    "Leerfahrt Transport",
    "Rückfahrt Regensburg",
    "Transport Rückfahrt Bayern",
    "Möbeltransport Rückfahrt",
    "flexible Transportstrecke anfragen",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20m%C3%B6chte%20eine%20R%C3%BCckfahrt%2FLeerfahrt%20pr%C3%BCfen%20lassen.%20Start%3A%20%5BOrt%5D%2C%20Ziel%3A%20%5BOrt%5D%2C%20Datum%2FZeitraum%3A%20%5BDatum%5D%2C%20Umfang%3A%20%5Bkurz%20beschreiben%5D.%20Fotos%20kann%20ich%20senden.";

const statusSteps = ["Start", "Ziel", "Datum", "Umfang", "Verfügbarkeit prüfen"];

const corridors = [
  "Regensburg ↔ München",
  "Regensburg ↔ Nürnberg",
  "Regensburg ↔ Straubing",
  "Regensburg ↔ Ingolstadt",
  "Regensburg ↔ Passau",
  "Regensburg ↔ Landshut",
  "Regensburg ↔ Augsburg",
  "Regensburg ↔ Deggendorf",
  "Regensburg ↔ Schwandorf",
  "Regensburg ↔ Kelheim",
  "Regensburg ↔ Cham",
  "Regensburg ↔ Amberg",
];

const faqItems = [
  {
    q: "Was ist die FLOXANT Rückfahrt-Börse?",
    a: "Die Rückfahrt-Börse ist ein öffentliches Nachfrage-System. Sie tragen Start, Ziel, Datum, Umfang und Flexibilität ein. FLOXANT prüft, ob die Strecke zu einer Rückfahrt, Leerfahrt oder flexiblen Transportlösung passt.",
  },
  {
    q: "Ist eine Rückfahrt garantiert verfügbar?",
    a: "Nein. Rückfahrten entstehen nur, wenn Strecke, Datum, Umfang, Zugang und Kapazität zusammenpassen. FLOXANT prüft nach Verfügbarkeit und verspricht keine feste Tour.",
  },
  {
    q: "Warum ist Flexibilität wichtig?",
    a: "Je flexibler Datum und Zeitfenster sind, desto besser kann eine Anfrage zu vorhandenen oder geplanten Fahrten passen. Ein fixes Datum ist oft schwerer zu kombinieren.",
  },
  {
    q: "Welche Angaben braucht FLOXANT?",
    a: "Startort, Zielort, Datum oder Zeitraum, Flexibilität, Art der Anfrage, Umfang, Etagen, Zugang, Fotos und optional Budget oder Zusatzservices.",
  },
  {
    q: "Sind Rückfahrten günstiger?",
    a: "Das kann wirtschaftlich sinnvoll sein, wenn Strecke und Zeitpunkt passen. Ein Preis wird aber erst nach Prüfung von Route, Umfang, Zugang und Kapazität möglich.",
  },
  {
    q: "Funktioniert das für kleine Umzüge oder Möbeltransport?",
    a: "Ja. Geeignet sind Möbeltransport, kleine Umzüge, Kartons, einzelne schwere Gegenstände oder flexible Transportstrecken nach Verfügbarkeit.",
  },
  {
    q: "Funktioniert die Rückfahrt-Börse bayernweit?",
    a: "Regensburg ist der Hub. Anfragen ab, nach oder über Regensburg und bayernweite Strecken werden nach Verfügbarkeit geprüft.",
  },
  {
    q: "Was passiert, wenn aktuell keine passende Rückfahrt möglich ist?",
    a: "Dann meldet FLOXANT entweder Rückfragen oder schlägt eine andere Transportlösung vor. Es wird keine Fake-Tour und kein falscher Festpreis erzeugt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Rückfahrt-Börse",
      description:
        "Öffentliches Nachfrage-System für Leerfahrt, Rückfahrt, flexible Transportstrecken, Möbeltransport und kleine Umzüge ab Regensburg und Bayern.",
      path,
      about: ["Rückfahrt", "Leerfahrt", "Möbeltransport", "Transport Regensburg", "Bayern", "Flexible Strecke"],
      potentialActions: [
        { name: "Strecke prüfen lassen", target: `${path}#rueckfahrt-form` },
        { name: "Rückfahrt per WhatsApp anfragen", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "Rückfahrt-Börse und Leerfahrt-Prüfung",
      description:
        "FLOXANT prüft Start, Ziel, Datum, Umfang und Flexibilität für Rückfahrt, Leerfahrt, Möbeltransport und flexible Transportstrecken nach Verfügbarkeit.",
      path,
      serviceType: "Leerfahrt und Rückfahrt prüfen",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Leerfahrt/Rückfahrt", item: "/leerfahrt-rueckfahrt" },
      { name: "Rückfahrt-Börse", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function RueckfahrtBoersePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#d1fae5_0,transparent_31rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950" data-event="view_return_trip_board">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
                <Radar className="h-4 w-4" />
                FLOXANT Streckenradar
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Rückfahrt-Börse: Strecke eintragen und prüfen lassen
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Ob Möbeltransport, kleiner Umzug oder flexible Strecke: FLOXANT prüft nach Verfügbarkeit,
                ob Ihre Anfrage zu einer passenden Rückfahrt, Leerfahrt oder geplanten Tour passt.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#rueckfahrt-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-emerald-700" data-event="start_route_check">
                  Strecke prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="click_return_trip_whatsapp">
                  Strecke per WhatsApp senden
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Regensburg als Hub</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Bayern nach Verfügbarkeit</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Fake-Touren</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-emerald-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
                <div className="grid grid-cols-5 gap-2">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                      <span className="mt-2 block text-[11px] font-black text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
                  <MapPinned className="h-7 w-7 text-emerald-700" />
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">Strecke prüfen statt lange raten</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    FLOXANT veröffentlicht keine erfundenen Touren. Ihre Strecke wird praktisch geprüft:
                    Route, Termin, Umfang, Fotos, Zugang und mögliche freie Kapazität müssen zusammenpassen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">So funktioniert es</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Rückfahrt-Börse als seriöses Anfrage-System</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {[
                ["1", "Strecke eintragen", "Startort, Zielort, Datum oder Zeitraum nennen."],
                ["2", "Umfang beschreiben", "Möbel, Kartons, Gegenstände, Volumen und Fotos."],
                ["3", "Flexibilität angeben", "Je flexibler Datum und Uhrzeit, desto besser prüfbar."],
                ["4", "FLOXANT prüft", "Rückfahrt, Leerfahrt, vorhandene Strecke oder flexible Transportlösung."],
                ["5", "Rückmeldung", "Wenn es passt, kommt ein Vorschlag. Wenn Angaben fehlen, eine Rückfrage."],
              ].map(([number, title, text]) => (
                <article key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">{number}</span>
                  <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Korridore</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Beispiele für Strecken, die geprüft werden können</h2>
              </div>
              <p className="text-sm leading-7 text-slate-600 lg:text-right">
                Diese Karten sind keine aktiven Touren. Sie zeigen häufig angefragte Richtungen ab, nach oder über Regensburg.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {corridors.map((corridor) => (
                <Link
                  key={corridor}
                  href="#rueckfahrt-form"
                  data-event="select_route_corridor"
                  data-corridor={corridor}
                  className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50/60"
                >
                  <Route className="h-6 w-6 text-emerald-700" />
                  <h3 className="mt-4 text-lg font-black text-slate-950">{corridor}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Möbeltransport, kleiner Umzug, Kartons/Gegenstände oder flexible Rückfahrt.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
                    Diese Richtung prüfen lassen
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Flexibilitätslogik</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Warum Flexibilität die Chance erhöht</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Rückfahrten entstehen nur, wenn Strecke, Datum und Umfang zusammenpassen. Flexible Termine,
                Fotos und klare Angaben zu Start, Ziel, Etagen und Zugang machen die Prüfung realistischer.
              </p>
              <Link href="#rueckfahrt-form" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-emerald-700" data-event="start_route_check">
                Flexible Strecke prüfen lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Fixes Datum", "schwerer planbar", "Eine feste Zeit kann passen, ist aber weniger kombinierbar."],
                ["±1-2 Tage flexibel", "besser", "Kleine Spielräume erhöhen die Chance auf passende Routen."],
                ["Flexible Woche", "gut", "Eine Woche Spielraum macht Streckenprüfung deutlich einfacher."],
                ["Komplett flexibel", "beste Chance", "Wenn Datum und Uhrzeit offen sind, kann FLOXANT mehr Optionen prüfen."],
              ].map(([title, badge, text]) => (
                <article key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <SlidersHorizontal className="h-5 w-5 text-emerald-700" />
                  <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-emerald-700">{badge}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Angaben</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Was FLOXANT für die Prüfung braucht</h2>
              <div className="mt-6 grid gap-3">
                {[
                  "Start, Ziel und PLZ ohne Objektadresse in der URL",
                  "Datum oder Zeitraum plus Flexibilität",
                  "Umfang, Fotos, Maße oder Anzahl Gegenstände",
                  "Etagen, Aufzug, Ladeweg und Zugang",
                  "Budget oder Preisrahmen optional",
                  "Zusatzservices wie Reinigung, Entrümpelung oder Schlüsselübergabe optional",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700">
                    <PackageCheck className="h-5 w-5 shrink-0 text-emerald-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <ReturnTripBoardForm />
          </div>
        </section>

        <section className="px-4 pb-20 pt-8 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zur Rückfahrt-Börse</h2>
            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-950">SEO-Hauptseite oder Börse?</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Die bestehende Leerfahrt/Rückfahrt-Seite bleibt der allgemeine Signature-Service. Die Rückfahrt-Börse ist der schnelle Strecke-eintragen-Flow.
                </p>
              </div>
              <Link href="/leerfahrt-rueckfahrt" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-black text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50">
                Leerfahrt-Service ansehen
              </Link>
              <Link href="/schadensbegrenzung" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-red-200 px-5 text-sm font-black text-red-800 transition hover:bg-red-50" data-event="start_damage_control_lead">
                Wenn die Strecke gerade kippt
              </Link>
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-30 lg:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#rueckfahrt-form" className="flox-mobile-action flox-mobile-action-primary" data-event="start_route_check">
            Strecke
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="click_return_trip_whatsapp">
            WhatsApp
          </a>
          <a href="tel:+4915771105087" className="flox-mobile-action flox-mobile-action-light" data-event="click_return_trip_phone">
            Anrufen
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
