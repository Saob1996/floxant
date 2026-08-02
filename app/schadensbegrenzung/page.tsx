import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  FileSearch,
  KeyRound,
  MapPin,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import { DamageControlForm } from "@/components/DamageControlForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/schadensbegrenzung";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Schadensbegrenzung bei Umzug, Reinigung & Übergabe | FLOXANT",
  description:
    "Wenn Umzug, Reinigung, Entrümpelung oder Übergabe kurzfristig kippen: FLOXANT prüft nach Verfügbarkeit, welche Schadensbegrenzung möglich ist.",
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20mein%20Plan%20ist%20kurzfristig%20gekippt.%20Es%20geht%20um%20%5BUmzug%2FReinigung%2FEntruempelung%2FUebergabe%5D%20in%20%5BOrt%5D.%20Deadline%3A%20%5BDatum%5D.%20Fotos%20und%20offene%20Punkte%20kann%20ich%20senden.%20Bitte%20pruefen%2C%20ob%20Schadensbegrenzung%20moeglich%20ist.";

const statusSteps = ["Problem", "Ort", "Termin", "Fotos", "Prüfung"];

const cases = [
  {
    title: "Umzug laeuft nicht wie geplant",
    text: "Helfer fehlen, Fahrzeug reicht nicht, Volumen ist größer oder die Zeit laeuft davon.",
    services: "Transport, Tragen, Zusatzfahrt, Rückfahrt",
    Icon: Truck,
  },
  {
    title: "Anbieter oder Helfer hat abgesagt",
    text: "FLOXANT prüft kurzfristig, ob Kapazität, Ort und Umfang noch realistisch zusammenpassen.",
    services: "Umzug, Reinigung, Entrümpelung",
    Icon: AlertTriangle,
  },
  {
    title: "Wohnung ist nicht übergabefaehig",
    text: "Bad, Küche, Böden, Keller oder sichtbare Übergabepunkte sind kurz vor Termin noch offen.",
    services: "Endreinigung, Übergabeakte, Schlüssel",
    Icon: Sparkles,
  },
  {
    title: "Sperrmuell oder Möbel stehen noch da",
    text: "Restmoebel, Keller, Garage oder Entsorgung blockieren Übergabe, Besichtigung oder Weitervermietung.",
    services: "Entrümpelung, Entsorgung, Reinigung",
    Icon: Trash2,
  },
  {
    title: "Schlüsselübergabe ist unklar",
    text: "Wenn Zugang, Ansprechpartner oder Übergabeprotokoll offen sind, muss zuerst die Lage geklaert werden.",
    services: "Schlüssel, Übergabeakte, Rückfrage",
    Icon: KeyRound,
  },
  {
    title: "Vorhandenes Angebot war unvollstaendig",
    text: "Wenn Umfang, Zugang, Zusatzkosten oder Zusatzleistungen fehlen, kann FLOXANT organisatorisch gegenpruefen.",
    services: "Angebotscheck, Fotos, Budget",
    Icon: FileSearch,
  },
];

const timePressure = [
  ["Heute", "nur prüfbar mit sehr klaren Angaben"],
  ["Morgen", "Fotos, Ort und Telefonnummer stark priorisieren"],
  ["In 2-3 Tagen", "Kapazität, Umfang und Zugang sauber klären"],
  ["Diese Woche", "realistische Optionen und Alternativen prüfen"],
  ["Vor Übergabetermin", "offene Übergabepunkte sichtbar machen"],
  ["Flexibel, aber bald", "mehr Spielraum für sinnvolle Lösung"],
];

const openItems = [
  "Transport",
  "Tragen",
  "Möbel / Kartons",
  "Reinigung",
  "Bad / Küche / Böden",
  "Keller / Garage",
  "Sperrmuell / Entsorgung",
  "Entrümpelung",
  "Schlüsselübergabe",
  "Übergabeprotokoll / Übergabeakte",
  "Zugang / Parken",
  "Fahrzeugbedarf",
  "Rückfahrt / Leerfahrt",
  "Fotos vorhanden",
  "Budget vorhanden",
];

const boundaries = [
  "kein garantierter Notdienst",
  "keine Soforteinsatzgarantie",
  "keine Konkurrenzdiffamierung",
  "keine Garantie, dass Übergabe oder Umzug gerettet werden",
  "keine Rechtsberatung und keine offizielle Abnahme",
  "Düsseldorf über klare lokale Kontaktmöglichkeiten zuordnen",
];

const faqItems = [
  {
    q: "Ist FLOXANT ein Notdienst?",
    a: "Nein. FLOXANT tritt nicht als garantierter Notdienst auf. Kurzfristige Faelle werden nach Ort, Termin, Umfang, Fotos und verfuegbarer Kapazität geprüft.",
  },
  {
    q: "Was mache ich, wenn mein Umzug gekippt ist?",
    a: "Senden Sie sofort Ort, Deadline, Start/Ziel, Umfang, Etage, Zugang, Fotos und Telefonnummer. FLOXANT prüft, ob Schadensbegrenzung oder eine Alternative realistisch möglich ist.",
  },
  {
    q: "Kann FLOXANT kurzfristig Reinigung uebernehmen?",
    a: "Ja, nach Verfügbarkeit. Besonders wichtig sind Objektort, Termin, Fläche, Zustand, Fotos und welche Bereiche vor Übergabe wirklich offen sind.",
  },
  {
    q: "Kann FLOXANT vor der Wohnungsuebergabe helfen?",
    a: "FLOXANT kann Reinigung, Entrümpelung, Entsorgung, Schlüsselkoordination oder Übergabeakte nach Absprache prüfen. Eine erfolgreiche Abnahme wird nicht garantiert.",
  },
  {
    q: "Sind Fotos wichtig?",
    a: "Ja. Fotos helfen bei Umfang, Fahrzeugbedarf, Verschmutzung, Zugang, Etage, Restmenge und Priorität. Dadurch kann schneller entschieden werden, ob etwas machbar ist.",
  },
  {
    q: "Kann FLOXANT ein anderes Angebot uebernehmen?",
    a: "FLOXANT uebernimmt kein fremdes Angebot automatisch. Ein vorhandenes Angebot kann aber helfen, offene Punkte, Umfang und Zeitdruck organisatorisch einzuordnen.",
  },
  {
    q: "Gibt es eine Garantie für Soforteinsatz?",
    a: "Nein. Machbarkeit haengt von Ort, Termin, Umfang, Zugang und Kapazität ab. FLOXANT formuliert bewusst keine falsche Sofortzusage.",
  },
  {
    q: "Funktioniert das auch in Düsseldorf?",
    a: "Reinigung wird nur für Regensburg und den Umkreis bis 75 km geprüft; andere Notlagen werden nach Ort, Umfang und Machbarkeit getrennt bewertet.",
  },
  {
    q: "Kann ich per WhatsApp anfragen?",
    a: "Ja. Für akute Faelle ist WhatsApp oft der schnellste Startpunkt, besonders wenn Fotos, Deadline und offene Punkte direkt mitgesendet werden können.",
  },
  {
    q: "Was sollte ich sofort senden?",
    a: "Ort/PLZ, Deadline, Problemtyp, offene Punkte, Fotos, Start/Ziel bei Transport, Etage, Aufzug, Zugang, Budget und eine Telefonnummer für Rückfragen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "FLOXANT Schadensbegrenzung",
      description:
        "Rettungsmodus für kippende Umzüge, Reinigungen, Entrümpelungen, Entsorgungen und Übergaben nach Verfügbarkeit.",
      path,
      about: [
        "Schadensbegrenzung",
        "kurzfristige Reinigung",
        "Umzug gekippt",
        "Wohnungsuebergabe",
        "Regensburg",
      ],
      potentialActions: [
        { name: "Schadensbegrenzung anfragen", target: `${path}#schadensbegrenzung-form` },
        { name: "Problem per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Schadensbegrenzung",
      description:
        "Kurzfristige Machbarkeitspruefung für Umzug, Reinigung, Entrümpelung, Entsorgung und Übergabe, wenn ein Plan kippt. Keine Notdienstgarantie.",
      path,
      serviceType: "Schadensbegrenzung nach Verfügbarkeit",
      areaServed: ["Regensburg", "Verifiziertes 75-km-Einsatzgebiet um Regensburg", "Regensburg nach Verfügbarkeit", "Reinigung Regensburg und Entsorgung"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Schadensbegrenzung", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function SchadensbegrenzungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#fecaca_0,transparent_34rem),linear-gradient(180deg,#fff1f2_0%,#ffffff_42%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 shadow-sm">
                <ShieldAlert className="h-4 w-4" />
                FLOXANT Rettungsmodus
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Wenn der Plan kippt: FLOXANT Schadensbegrenzung
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Umzug, Reinigung, Entrümpelung oder Übergabe laufen nicht wie geplant? Senden Sie Ort, Termin, Fotos und offene Punkte.
                FLOXANT prüft nach Verfügbarkeit, was noch machbar ist.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-black text-white transition hover:bg-emerald-700" data-event="whatsapp_click">
                  <MessageCircle className="h-4 w-4" />
                  Problem per WhatsApp senden
                </a>
                <Link href="#schadensbegrenzung-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-red-700" data-event="service_card_click">
                  Schadensbegrenzung prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Regensburg als Kernmarkt</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Bayern nach Verfügbarkeit</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Düsseldorf passend zum Anliegen</span>
                <span className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-red-700">Keine Notdienstgarantie</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-red-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-red-100 bg-white p-5 shadow-2xl shadow-red-950/10">
                <div className="grid grid-cols-5 gap-2">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                      <span className="mt-2 block text-[11px] font-black text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-red-200">Lage klären statt panisch zusagen</div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">Kurzfristig heisst: harte Fakten zuerst</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    FLOXANT prüft keine Fantasie-Lösung, sondern Ort, Deadline, Zugang, Umfang, Fotos und Kapazität.
                    Wenn etwas machbar ist, wird daraus der nächste Vorschlag. Wenn nicht, wird nichts falsch versprochen.
                  </p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Telefonnummer + Fotos beschleunigen die Prüfung.",
                    "Heute/Morgen wird hoeher priorisiert, aber nicht garantiert.",
                    "Offene Punkte ersetzen lange Erklärungen.",
                    "Vorhandenes Angebot kann als Kontext hochgeladen werden.",
                  ].map((item) => (
                    <div key={item} className="rounded-[1rem] border border-red-100 bg-red-50 p-4 text-sm font-bold leading-6 text-red-950">
                      <CheckCircle2 className="mb-2 h-5 w-5 text-red-700" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-red-700">Typische Kipplagen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Wenn kleine offene Punkte den ganzen Ablauf blockieren</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Kurz vor Auszug, Transport oder Wohnungsuebergabe reichen wenige fehlende Details, damit der Plan wackelt. FLOXANT fragt deshalb nicht allgemein nach “Notfall”, sondern nach konkreten offenen Punkten.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cases.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-red-700" />
                    <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                    <div className="mt-4 rounded-full bg-red-50 px-3 py-2 text-xs font-black text-red-700">{item.services}</div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-red-200">Wie dringend?</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Zeitdruck sichtbar machen</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Je vollständiger Ort, Fotos, Umfang und Termin sind, desto schneller kann FLOXANT prüfen, ob Schadensbegrenzung möglich ist. Dringlichkeit erzeugt Priorität, aber keine automatische Zusage.
              </p>
              <Link href="#schadensbegrenzung-form" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-slate-950" data-event="service_card_click">
                Dringende Prüfung starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {timePressure.map(([title, text]) => (
                <div key={title} className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <Clock3 className="h-5 w-5 text-red-700" />
                  <h3 className="mt-4 text-lg font-black tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-red-700">Offene Punkte</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was muss noch stabilisiert werden?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {openItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 p-3 text-sm font-bold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-red-100 bg-red-50 p-7">
              <Camera className="h-8 w-8 text-red-700" />
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">Fotos statt langer Erklärung</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Bilder von Restmoebeln, Keller, Bad, Küche, Böden, Zugang, Etage, Fahrzeugbedarf oder vorhandenen Angeboten helfen, die Lage schneller einzuordnen. Persönliche Dokumente und Zugangsdaten bitte nicht mitsenden.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/angebotscheck" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-slate-950" data-event="hero_cta_click">
                  Angebot prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/plattform-auftrag-pruefen" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-black text-blue-900" data-event="service_card_click">
                  Plattform-Auftrag prüfen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/plan-b-service" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-black text-amber-900" data-event="service_card_click" data-source="damage_control_internal_link">
                  Plan B vorher absichern
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/diskreter-umzug-trennung-scheidung" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 text-sm font-black text-stone-800" data-event="service_card_click">
                  Diskreten Auszug ruhig klären
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/uebergabeakte" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-200 bg-white/70 px-4 text-sm font-black text-red-800" data-event="service_card_click">
                  Übergabeakte ergaenzen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-red-700">Akut-Anfrage</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Problem, Deadline, Fotos und offene Punkte senden</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                FLOXANT prüft kurzfristige Anfragen im Raum Regensburg, in Bayern nach Verfügbarkeit und in Düsseldorf klar getrennt über klare lokale Kontaktmöglichkeiten.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <MapPin className="mb-2 h-5 w-5 text-red-700" />
                  <p className="text-sm leading-7 text-slate-700">Ort/PLZ entscheidet, ob eine kurzfristige Kapazitaetspruefung realistisch ist.</p>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <ShieldAlert className="mb-2 h-5 w-5 text-red-700" />
                  <p className="text-sm leading-7 text-slate-700">FLOXANT diffamiert keine anderen Anbieter und verspricht keine Rettung. Es geht um saubere Schadensbegrenzung nach Faktenlage.</p>
                </div>
              </div>
            </div>
            <DamageControlForm />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-red-700">Abgrenzung</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Nicht Express-Check, sondern Lage-Stabilisierung</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Der Express-Check ist ein schneller Startpunkt für enge Zeitfenster. Schadensbegrenzung ist für konkrete Kipplagen: etwas ist abgesagt, nicht fertig, zu klein geplant, vor Übergabe offen oder organisatorisch unklar.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/express-anfrage" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Express-Check ansehen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/wohnung-wieder-vermietbar" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800" data-event="service_card_click">
                  Wohnung vorbereiten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/keller-muellraum-rettung-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 text-sm font-black text-amber-800" data-event="service_card_click">
                  Keller/Müllraum prüfen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-red-200">Was nicht versprochen wird</div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {boundaries.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 p-4 text-sm font-bold leading-6 text-slate-200">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-200" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-red-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zur FLOXANT Schadensbegrenzung</h2>
            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#schadensbegrenzung-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-red-700" data-event="service_card_click">
                Kurzfristige Prüfung starten
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                Problem per WhatsApp senden
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-6 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["/regensburg/umzug", "Umzug Regensburg"],
              ["/regensburg/reinigung", "Kurzfristige Reinigung Regensburg"],
              ["/regensburg/entruempelung", "Entrümpelung Regensburg"],
              ["/rueckfahrt-boerse", "Rückfahrt/Leerfahrt prüfen"],
              ["/mieterwechsel-service-regensburg", "Mieterwechsel-Service"],
              ["/wohnung-wieder-vermietbar", "Wohnung wieder vermietbar"],
              ["/regensburg/reinigung", "Reinigung Regensburg"],
              ["/regensburg/entruempelung", "Entrümpelung Regensburg"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm font-black text-slate-800 transition hover:border-red-200 hover:bg-red-50">
                {label}
              </Link>
            ))}
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            WhatsApp
          </a>
          <Link href="#schadensbegrenzung-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Problem senden
          </Link>
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
