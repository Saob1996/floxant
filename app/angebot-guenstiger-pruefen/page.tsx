import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Camera,
  CheckCircle2,
  FileSearch,
  Info,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
} from "lucide-react";

import { CheaperAlternativeForm } from "@/components/CheaperAlternativeForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/angebot-guenstiger-pruefen";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Angebot günstiger prüfen lassen | FLOXANT",
  description:
    "Vorhandenes Angebot senden und prüfen lassen, ob FLOXANT eine günstigere, klarere oder passendere Alternative für Umzug, Reinigung, Entrümpelung oder Entsorgung anbieten kann.",
  keywords: [
    "angebot günstiger prüfen",
    "günstigeres angebot umzug",
    "umzugsangebot günstiger",
    "reinigungsangebot günstiger",
    "angebot alternative prüfen",
    "zweite einschätzung preis angebot",
    "angebot mit budget prüfen",
    "entsorgung angebot düsseldorf prüfen",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20m%C3%B6chte%20pr%C3%BCfen%20lassen%2C%20ob%20eine%20g%C3%BCnstigere%20oder%20passendere%20Alternative%20m%C3%B6glich%20ist.%20Es%20geht%20um%20%5BService%5D%20in%20%5BOrt%5D.%20Angebot%2FFotos%2FPreis%20kann%20ich%20senden.";

const checkSteps = [
  {
    title: "1. Angebot oder Preisrahmen senden",
    text: "PDF, Screenshot, Angebotsbild oder Angebotstext. Wenn kein Dokument vorhanden ist, reichen Preis, Ort, Termin und Umfang.",
    Icon: UploadCloud,
  },
  {
    title: "2. Umfang und Lücken klären",
    text: "FLOXANT prüft praktisch, ob Leistung, Fotos, Etage, Zugang, Zusatzservices, Termin und Budget zusammenpassen.",
    Icon: SlidersHorizontal,
  },
  {
    title: "3. Alternative nach Verfügbarkeit prüfen",
    text: "Wenn es realistisch ist, kann FLOXANT eine günstigere, klarere oder passendere eigene Einschätzung vorbereiten.",
    Icon: BadgeEuro,
  },
];

const usefulData = [
  "vorhandener Angebotspreis",
  "Wunschbudget oder Zielrahmen",
  "Ort / PLZ und Termin",
  "Serviceart und Umfang",
  "Fotos von Zugang, Menge oder Zustand",
  "unklare Punkte im Angebot",
  "Düsseldorf nur Reinigung/Entsorgung",
  "Telefon oder E-Mail für Rückfragen",
];

const boundaries = [
  "keine Preisgarantie",
  "keine Aussage, dass FLOXANT immer billiger ist",
  "keine Rechtsberatung",
  "keine Anbieter- oder Plattformbewertung",
  "keine Aufforderung zum Vertragsbruch",
  "keine Düsseldorf-Umzugspositionierung",
];

const faqItems = [
  {
    q: "Prüft FLOXANT, ob ein Angebot günstiger geht?",
    a: "Ja, organisatorisch und praktisch. FLOXANT prüft anhand von Angebot, Ort, Termin, Umfang, Fotos und Kapazität, ob eine günstigere, klarere oder passendere Alternative möglich ist.",
  },
  {
    q: "Garantiert FLOXANT einen niedrigeren Preis?",
    a: "Nein. Es gibt keine Preisgarantie. Manchmal ist ein günstigerer Preis möglich, manchmal zeigt die Prüfung, dass Umfang oder Termin realistisch teurer sind.",
  },
  {
    q: "Muss ich ein Angebot hochladen?",
    a: "Nein. Ein Upload hilft, ist aber optional. Sie können auch Preis, Termin, Ort, Umfang und offene Punkte in Textform senden.",
  },
  {
    q: "Bewertet FLOXANT meinen Anbieter?",
    a: "Nein. FLOXANT bewertet keine Anbieter oder Plattformen rechtlich. Geprüft werden nur Auftrag, Umfang, Preisrahmen und praktische Machbarkeit.",
  },
  {
    q: "Funktioniert das für Reinigung und Entrümpelung?",
    a: "Ja. Die Prüfung ist für Umzug, Reinigung, Entrümpelung, Transport, Entsorgung und Kombinationen gedacht.",
  },
  {
    q: "Funktioniert das für Düsseldorf?",
    a: "Ja, aber nur für Reinigung und Entsorgung. FLOXANT positioniert in Düsseldorf keinen Umzugsservice.",
  },
  {
    q: "Was passiert nach dem Absenden?",
    a: "FLOXANT prüft Angebot, Preisrahmen, Ort, Termin, Umfang, Uploads und Verfügbarkeit. Wenn eine Alternative realistisch ist oder Rückfragen nötig sind, meldet sich FLOXANT.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Angebot günstiger prüfen lassen",
      description:
        "Praktische Prüfung vorhandener Angebote und Preisrahmen mit Option auf eine günstigere oder passendere FLOXANT-Alternative nach Verfügbarkeit.",
      path,
      about: ["Angebotscheck", "Preisrahmen", "zweite Einschätzung", "günstigere Alternative"],
      potentialActions: [
        { name: "Alternative prüfen lassen", target: `${path}#guenstiger-form` },
        { name: "Angebot per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Angebot günstiger prüfen",
      description:
        "Organisatorische und praktische Prüfung, ob auf Basis von Angebot, Ort, Termin, Umfang und Fotos eine günstigere oder passendere Alternative möglich ist. Keine Preisgarantie.",
      path,
      serviceType: "Angebot günstiger oder passender prüfen",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfügbarkeit", "Düsseldorf Reinigung und Entsorgung"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Angebot günstiger prüfen", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function AngebotGuenstigerPruefenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe_0,transparent_34rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_46%,#f8fafc_100%)] text-slate-950" data-event="view_cheaper_alternative_page">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 shadow-sm">
                <BadgeEuro className="h-4 w-4" />
                FLOXANT Preis-Alternative
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Angebot günstiger prüfen lassen
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Sie haben bereits ein Angebot, aber Preis, Umfang oder Zusatzleistungen wirken nicht passend?
                FLOXANT prüft, ob eine günstigere, klarere oder sinnvollere Alternative nach Verfügbarkeit möglich ist.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#guenstiger-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700" data-event="start_cheaper_alternative_lead">
                  Alternative prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="click_cheaper_alternative_whatsapp">
                  Angebot per WhatsApp senden
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Preisgarantie</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Praktische Prüfung</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Upload oder Text möglich</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Düsseldorf nur Reinigung/Entsorgung</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-blue-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
                <div className="grid gap-3">
                  {checkSteps.map((step) => {
                    const Icon = step.Icon;
                    return (
                      <div key={step.title} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                        <Icon className="h-5 w-5 text-blue-700" />
                        <p className="mt-3 text-sm font-black text-slate-950">{step.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{step.text}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 rounded-[1.35rem] border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      Wenn ein Angebot bereits unterschrieben oder rechtlich bindend ist, klären Sie Vertragsfragen bitte selbst oder fachlich. FLOXANT prüft nur eine praktische Alternative.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-800">
                  <FileSearch className="h-4 w-4" />
                  Was FLOXANT braucht
                </div>
                <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950">
                  Einfach klären, nicht lange erklären
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Am schnellsten ist die Prüfung, wenn Angebot, Preisrahmen, Termin und Fotos zusammenkommen. Wenn etwas fehlt, kann FLOXANT trotzdem mit Rückfragen starten.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {usefulData.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-700 shadow-sm">
                <Camera className="h-4 w-4 text-blue-700" />
                Upload + Kundendaten
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.035em] text-slate-950">
                Angebot, Fotos und Kundeninformation senden
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Die Seite ist bewusst kürzer als ein Vollformular: Name, Kontakt, Ort, Termin, Angebotspreis, Zielbudget, Upload und kurze Beschreibung reichen für die erste Prüfung.
              </p>
              <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-4">
                <p className="text-sm font-black text-slate-950">Wichtig</p>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                  {boundaries.map((item) => (
                    <li key={item} className="flex gap-2">
                      <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <CheaperAlternativeForm />
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-black tracking-[-0.035em] text-slate-950">Häufige Fragen</h2>
            <div className="mt-6 grid gap-3">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
