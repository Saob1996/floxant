import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardList,
  Home,
  KeyRound,
  MapPin,
  Recycle,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Trash2,
  UsersRound,
} from "lucide-react";

import { TenantTurnoverForm } from "@/components/TenantTurnoverForm";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/mieterwechsel-service-regensburg";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Mieterwechsel-Service Regensburg – Räumung, Reinigung & Übergabe | FLOXANT",
  description:
    "FLOXANT unterstützt Vermieter, Hausverwaltungen und Makler beim Mieterwechsel: Räumung, Entsorgung, Endreinigung, Schlüsselkoordination und Übergabevorbereitung im Raum Regensburg.",
  keywords: [
    "Mieterwechsel Service Regensburg",
    "Hausverwaltung Reinigung Regensburg",
    "Wohnung nach Auszug reinigen Regensburg",
    "Räumung und Reinigung nach Auszug",
    "Wohnungsübergabe vorbereiten Regensburg",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20m%C3%B6chte%20einen%20Mieterwechsel-Fall%20anfragen.%20Es%20geht%20um%20ein%20Objekt%20in%20%5BOrt%5D.%20Ben%C3%B6tigt%20werden%20R%C3%A4umung%2FReinigung%2FEntsorgung%2F%C3%9Cbergabevorbereitung.%20Fotos%20und%20Termin%20kann%20ich%20senden.";

const statusSteps = ["Auszug", "Räumung", "Reinigung", "Schlüssel", "Übergabe"];

const objectStatuses = [
  { title: "Wohnung nicht leer", text: "Restmöbel, Kartons oder Gegenstände müssen vor Reinigung oder Übergabe raus.", Icon: Home },
  { title: "Reinigung fehlt", text: "Bad, Küche, Böden und sichtbare Übergabepunkte brauchen eine klare Vorbereitung.", Icon: Sparkles },
  { title: "Keller oder Müllraum offen", text: "Nebenflächen, Kellerabteile oder Müllräume können den Mieterwechsel blockieren.", Icon: Trash2 },
  { title: "Schlüsselkoordination offen", text: "Wer hat Schlüssel, Zugang und Zeitfenster? FLOXANT kann die Abstimmung nach Absprache unterstützen.", Icon: KeyRound },
  { title: "Übergabe steht an", text: "Wenn der Termin nah ist, zählen Fotos, Umfang, Zugang und klare Prioritäten.", Icon: TimerReset },
];

const serviceBlocks = [
  "Wohnung leer machen",
  "Entrümpelung / Räumung",
  "Möbel- und Sperrmüllentsorgung",
  "Endreinigung / Auszugsreinigung",
  "Keller / Nebenräume prüfen",
  "Müllraum-/Keller-Rettung nach Absprache",
  "Schlüsselkoordination nach Absprache",
  "Wohnungsübergabe-Vorbereitung",
  "Foto-Dokumentation nach Absprache",
  "Übergabeakte als Zusatzbaustein",
  "Wiederkehrende Fälle für Hausverwaltungen",
  "Budget-/Preisrahmen-Prüfung",
];

const audiences = [
  {
    title: "Für Hausverwaltungen",
    text:
      "Wiederkehrende Mieterwechsel brauchen keine Einzelimprovisation. FLOXANT prüft Wohnung, Keller, Nebenflächen, Fotos, Termin und Ansprechpartnerlogik für strukturierte Objektfälle.",
    cta: "Mieterwechsel-Fall für Hausverwaltung anfragen",
    Icon: Building2,
  },
  {
    title: "Für Vermieter",
    text:
      "Wenn nach dem Auszug noch Möbel, Restmengen oder Reinigungsbedarf offen sind, bündelt FLOXANT Räumung, Entsorgung, Endreinigung und Übergabevorbereitung.",
    cta: "Wohnung nach Auszug vorbereiten lassen",
    Icon: Home,
  },
  {
    title: "Für Makler",
    text:
      "Vor Besichtigung, Exposé-Fotos oder Übergabe kann ein Objekt sauberer, leerer und besser vorbereitet werden, ohne falsche Verkaufsversprechen.",
    cta: "Wohnung für Besichtigung vorbereiten lassen",
    Icon: BadgeCheck,
  },
  {
    title: "Für Eigentümer",
    text:
      "Wohnung, Keller, Garage oder Nebenräume können für Nutzung, Verkauf oder Vermietung vorbereitet werden: mit Fotos, Umfang, Zugang und Preisrahmen.",
    cta: "Objekt vorbereiten lassen",
    Icon: UsersRound,
  },
];

const faqItems = [
  {
    q: "Was ist der Mieterwechsel-Service?",
    a: "FLOXANT unterstützt organisatorisch und praktisch, wenn eine Wohnung nach Auszug geräumt, gereinigt, entsorgt oder für Übergabe und nächste Nutzung vorbereitet werden muss.",
  },
  {
    q: "Für wen ist der Service gedacht?",
    a: "Für Hausverwaltungen, Vermieter, Makler und Eigentümer im Raum Regensburg. Anfragen aus der Umgebung und Bayern werden nach Verfügbarkeit geprüft.",
  },
  {
    q: "Kann FLOXANT Räumung und Reinigung kombinieren?",
    a: "Ja, genau dafür ist der Service gedacht: erst Restmengen und Gegenstände klären, dann Reinigung und Übergabevorbereitung sinnvoll abstimmen.",
  },
  {
    q: "Kann FLOXANT Keller oder Müllräume räumen?",
    a: "Ja, nach Prüfung von Umfang, Zugang, Fotos, Materialart und Termin. Gefährliche oder rechtlich unklare Entsorgungsleistungen werden nicht pauschal zugesagt.",
  },
  {
    q: "Kann FLOXANT Schlüsselübergabe koordinieren?",
    a: "Nach Absprache kann FLOXANT Schlüssel- und Zugangsthemen organisatorisch unterstützen. Eine rechtliche Übergabeprüfung oder Vermieterentscheidung wird nicht ersetzt.",
  },
  {
    q: "Sind wiederkehrende Aufträge möglich?",
    a: "Ja. Für Hausverwaltungen, Vermieter oder Eigentümer mit mehreren Mieterwechseln kann eine wiederkehrende Zusammenarbeit angefragt und strukturiert geprüft werden.",
  },
  {
    q: "Kann FLOXANT eine Wohnung garantiert wieder vermietbar machen?",
    a: "Nein. FLOXANT kann Räumung, Reinigung, Entsorgung und Vorbereitung unterstützen, aber keine Neuvermietung oder vollständige Abnahme garantieren.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Mieterwechsel-Service Regensburg",
      description:
        "Räumung, Entsorgung, Endreinigung, Schlüsselkoordination und Übergabevorbereitung für Vermieter, Hausverwaltungen, Makler und Eigentümer.",
      path,
      about: [
        "Mieterwechsel",
        "Hausverwaltung",
        "Wohnungsübergabe",
        "Endreinigung",
        "Entrümpelung",
        "Regensburg",
      ],
      potentialActions: [
        { name: "Mieterwechsel-Fall anfragen", target: `${path}#mieterwechsel-form` },
        { name: "WhatsApp Anfrage senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "Mieterwechsel-Service Regensburg",
      description:
        "Organisatorische Unterstützung bei Räumung, Entsorgung, Endreinigung, Schlüsselkoordination und Übergabevorbereitung nach Auszug.",
      path,
      serviceType: "Mieterwechsel-Service für Vermieter und Hausverwaltungen",
      areaServed: ["Regensburg", "Bayern"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Mieterwechsel-Service Regensburg", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function MieterwechselServiceRegensburgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#cffafe_0,transparent_32rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700 shadow-sm">
                <ClipboardList className="h-4 w-4" />
                FLOXANT Objektwechsel-Kontrollzentrum
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Mieterwechsel-Service in Regensburg für Vermieter und Hausverwaltungen
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Wenn eine Wohnung nach Auszug leer, sauber und organisatorisch vorbereitet werden muss,
                bündelt FLOXANT Räumung, Reinigung, Entsorgung und Schlüsselkoordination nach Absprache.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#mieterwechsel-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-cyan-700" data-event="service_card_click">
                  Objektfall prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Mieterwechsel per WhatsApp anfragen
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Regensburg als Kernmarkt</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Umgebung nach Verfügbarkeit</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Rechts- oder Abnahmegarantie</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-cyan-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
                <div className="grid grid-cols-5 gap-2">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                      <span className="mt-2 block text-[11px] font-black text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3">
                  {objectStatuses.slice(0, 4).map((item) => {
                    const Icon = item.Icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                        <div>
                          <p className="text-sm font-black text-slate-950">{item.title}</p>
                          <p className="text-xs leading-5 text-slate-500">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Problem nach Auszug</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Nach einem Auszug bleibt oft mehr als nur eine leere Wohnung</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Für Vermieter, Hausverwaltungen und Makler zählt nicht nur Reinigung. Häufig müssen Räumung, Keller, Schlüssel, Fotos, Entsorgung und Übergabetermin zusammen gedacht werden.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {objectStatuses.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-cyan-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Service-Bausteine</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was FLOXANT beim Mieterwechsel übernehmen kann</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Jeder Fall wird nach Objektart, Ort, Zugang, Termin, Umfang und Fotos geprüft. FLOXANT ersetzt keine rechtliche Übergabeprüfung, sondern unterstützt die praktische Vorbereitung.
                </p>
                <Link href="/uebergabeakte" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-700 transition hover:text-cyan-950" data-event="service_card_click" data-source="tenant_turnover_internal_link">
                  Mieterwechsel mit FLOXANT Übergabeakte dokumentieren
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/wohnung-wieder-vermietbar" className="mt-3 inline-flex items-center gap-2 text-sm font-black text-cyan-700 transition hover:text-cyan-950" data-event="service_card_click" data-source="tenant_turnover_internal_link">
                  Ergebnis-Seite: Wohnung wieder vermietbar vorbereiten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/immobilie-verkaufsbereit-machen" className="mt-3 inline-flex items-center gap-2 text-sm font-black text-amber-700 transition hover:text-amber-950" data-event="service_card_click" data-source="tenant_turnover_internal_link">
                  Wenn Verkauf oder Besichtigung ansteht: Immobilie verkaufsbereit machen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/makler-vermieter-link" className="mt-3 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-950" data-event="service_card_click" data-source="tenant_turnover_internal_link">
                  Direktlink fuer Makler und Vermieter nutzen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/keller-muellraum-rettung-regensburg" className="mt-3 inline-flex items-center gap-2 text-sm font-black text-amber-700 transition hover:text-amber-950" data-event="service_card_click" data-source="tenant_turnover_internal_link">
                  Keller oder Muellraum als Objektflaeche pruefen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/schadensbegrenzung" className="mt-3 inline-flex items-center gap-2 text-sm font-black text-red-700 transition hover:text-red-950" data-event="service_card_click" data-source="tenant_turnover_internal_link">
                  Wenn der Mieterwechsel kurzfristig kippt
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceBlocks.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1rem] border border-cyan-100 bg-cyan-50/60 px-4 py-3 text-sm font-bold leading-6 text-cyan-950">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Für wiederkehrende Objektfälle statt einmaliger Improvisation</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audiences.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-cyan-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                    <Link href="#mieterwechsel-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-700 transition hover:text-cyan-950" data-event="service_card_click">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Anfrage starten</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Mieterwechsel-Fall mit wenigen Eckdaten prüfen lassen</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Je klarer Objektart, Ort, Zeitraum, Fotos, Schlüsselstatus und offene Leistungen sind, desto schneller kann FLOXANT den Fall einordnen.
              </p>
              <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-700">
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <Camera className="mb-2 h-5 w-5 text-cyan-700" />
                  Fotos von Wohnung, Keller, Restmengen, Zugang oder Müllraum helfen bei der Einschätzung.
                </div>
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-cyan-700" />
                  Rechtliche Prüfung, Abnahmeentscheidung oder Neuvermietung werden nicht garantiert.
                </div>
              </div>
            </div>
            <TenantTurnoverForm />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Wiederkehrende Zusammenarbeit</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Für Hausverwaltungen zählt ein wiederholbarer Ablauf</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  Wenn mehrere Wohnungen oder wiederkehrende Wechsel anstehen, kann FLOXANT Ansprechpartner, Fotos, Schlüsselstatus, Objektart und Leistungsbausteine sauber erfassen. Das ersetzt kein CRM, aber es macht die erste Einordnung schneller.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Mehrere Objekte", text: "Einheitenzahl und wiederkehrendes Interesse direkt angeben.", Icon: Building2 },
                  { title: "Schlüssel & Zugang", text: "Schlüsselstatus, Zugang und Zeitfenster früh klären.", Icon: KeyRound },
                  { title: "Räumung + Reinigung", text: "Restmengen zuerst klären, Reinigung danach sinnvoll einplanen.", Icon: Recycle },
                  { title: "Übergabeakte", text: "Als Zusatzbaustein nach Absprache, wenn Dokumentation gewünscht ist.", Icon: ClipboardList },
                ].map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div key={item.title} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                      <Icon className="h-5 w-5 text-cyan-200" />
                      <p className="mt-3 text-sm font-black">{item.title}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-300">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zum Mieterwechsel-Service</h2>
            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-black text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#mieterwechsel-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-cyan-700" data-event="service_card_click">
                Mieterwechsel-Fall anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-cyan-200 hover:text-cyan-700" data-event="phone_click">
                Rückruf anfragen
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
