import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  KeyRound,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { OfferCheckConversionFlow } from "@/components/OfferCheckConversionFlow";
import {
  RelatedSpecialServices,
  ServiceClusterLinks,
  SignatureServicesGrid,
} from "@/components/conversion";
import { OfferCheckAuthoritySections } from "@/components/offer-check";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { offerCheckLinks, signatureServiceLinks } from "@/lib/signature-special-services";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/angebotscheck";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Angebotscheck | Red Flags vor der Zusage | FLOXANT",
  description:
    "Angebot vor der Zusage pruefen: FLOXANT zeigt Red Flags bei Umfang, Fotos, Termin, Zugang, Zusatzpositionen und Preislogik.",
  keywords: [
    "Angebot prüfen lassen",
    "Angebot Red Flag Scanner",
    "Umzugsangebot prüfen",
    "Angebot vor Zusage prüfen",
    "versteckte Kosten Umzug",
    "zweite Einschätzung Umzug Regensburg",
    "Reinigungsangebot prüfen",
    "Entrümpelungsangebot prüfen",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20habe%20bereits%20ein%20Angebot%20erhalten%20und%20m%C3%B6chte%20eine%20zweite%20Einsch%C3%A4tzung.%20Es%20geht%20um%20%5BService%5D%20in%20%5BOrt%5D.%20Ich%20kann%20Angebot%2FFotos%20senden.";

const statusSteps = ["Angebot erhalten", "Red Flags scannen", "Klärungsbedarf erkennen", "Einschätzung anfragen"];

const redFlags = [
  "Ist die Etage berücksichtigt?",
  "Ist der Trageweg berücksichtigt?",
  "Gibt es einen Aufzug?",
  "Ist Zugang oder Parken geklärt?",
  "Ist das Volumen realistisch?",
  "Sind Zusatzfahrten möglich?",
  "Ist Reinigung enthalten oder ausgeschlossen?",
  "Ist Entrümpelung oder Entsorgung klar geregelt?",
  "Ist Schlüsselübergabe berücksichtigt?",
  "Gibt es Angaben zu Fotos oder Besichtigung?",
  "Ist der Termin realistisch?",
  "Sind Zusatzkosten und Mehrwertsteuer eindeutig?",
  "Ist der Leistungsumfang schriftlich klar?",
];

const checkAreas = [
  {
    title: "Umfang und Zugang",
    text: "Etage, Aufzug, Trageweg, Parken, Menge, Fläche oder Volumen müssen nachvollziehbar sein.",
    Icon: ClipboardCheck,
  },
  {
    title: "Termin und Region",
    text: "Regensburg ist Kernmarkt, Umgebung ca. 200 km Nahbereich, Bayern wird nach Verfügbarkeit geprüft.",
    Icon: MapPin,
  },
  {
    title: "Zusatzleistungen",
    text: "Reinigung, Entsorgung, Zugang, Schlüsselübergabe oder Übergabevorbereitung sollten nicht erst am Einsatztag auffallen.",
    Icon: KeyRound,
  },
  {
    title: "Fotos und Preisrahmen",
    text: "Fotos, vorhandener Angebotspreis und Budget helfen, Aufwand und mögliche Rückfragen realistischer einzuordnen.",
    Icon: Camera,
  },
];

const serviceScopes = [
  "Umzug",
  "Reinigung",
  "Entrümpelung",
  "Transport",
  "Entsorgung",
  "Umzug + Endreinigung",
  "Entrümpelung + Reinigung",
  "Sensible Anfrage",
];

const faqItems = [
  {
    q: "Kann ich ein Angebot von einem anderen Anbieter prüfen lassen?",
    a: "Ja. FLOXANT kann organisatorisch und praktisch prüfen, ob wichtige Angaben zu Umfang, Zugang, Termin, Fotos, Zusatzleistungen oder Preisrahmen noch unklar sind.",
  },
  {
    q: "Muss ich den Anbieter oder die Plattform nennen?",
    a: "Nein. Sie können angeben, ob das Angebot von einer Plattform, einem lokalen Anbieter oder einem anderen Unternehmen kommt. Wenn Sie das nicht nennen möchten, ist das ebenfalls möglich.",
  },
  {
    q: "Muss ich ein PDF hochladen?",
    a: "Nein. Sie können ein PDF, einen Screenshot oder ein Bild hochladen. Alternativ reichen auch Preis, Termin, Ort und eine kurze Beschreibung.",
  },
  {
    q: "Was ist der Angebot-Red-Flag-Scanner?",
    a: "Der Scanner zeigt praktische und organisatorische Punkte, die vor einer Zusage geklärt sein sollten. Er ist kein Rechtscheck und bewertet keine Anbieter rechtlich.",
  },
  {
    q: "Kann ich den Scanner ohne Upload nutzen?",
    a: "Ja. Sie können nur die Checkfragen beantworten und das Ergebnis anschließend mit Ort, Termin und Beschreibung an FLOXANT senden.",
  },
  {
    q: "Prüft FLOXANT, ob ein Angebot rechtlich korrekt ist?",
    a: "Nein, der Angebotscheck ist keine Rechtsberatung. FLOXANT prüft praktisch und organisatorisch, ob wichtige Leistungsangaben fehlen oder Rückfragen sinnvoll sind.",
  },
  {
    q: "Kann FLOXANT ein alternatives Angebot machen?",
    a: "Wenn der Auftrag zu Region, Termin und Leistungsumfang passt, kann FLOXANT auf Basis Ihrer Angaben eine eigene Einschätzung oder ein eigenes Angebot vorbereiten.",
  },
  {
    q: "Funktioniert der Angebotscheck für Düsseldorf?",
    a: "Für Düsseldorf prüft FLOXANT Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Endreinigung, Gewerbereinigung und Entsorgung über klare lokale Kontaktmöglichkeiten.",
  },
  {
    q: "Bewertet FLOXANT meinen Anbieter?",
    a: "Nein. FLOXANT prüft offene Punkte im Angebot, nicht den Anbieter. Es geht um Klärungsbedarf vor der Zusage.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Angebotscheck und Red-Flag-Scanner",
      description:
        "Zweite Einschätzung und praktischer Red-Flag-Scanner für Umzug, Reinigung, Entrümpelung, Transport oder Entsorgung vor der Zusage.",
      path,
      about: [
        "Angebotscheck",
        "Red-Flag-Scanner",
        "Angebot vor Zusage prüfen",
        "Umzugsangebot prüfen",
        "Reinigungsangebot prüfen",
        "Entrümpelungsangebot prüfen",
        "Regensburg",
        "Bayern",
      ],
      potentialActions: [
        { name: "Red-Flag-Scanner starten", target: `${path}#red-flag-scanner` },
        { name: "Angebot hochladen", target: `${path}#angebotscheck-form` },
        { name: "WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Angebotscheck und Red-Flag-Scanner",
      description:
        "Organisatorische und praktische Prüfung vorhandener Angebote inklusive Red-Flag-Scanner für offene Klärungspunkte.",
      path,
      serviceType: "Angebotscheck, Red-Flag-Scanner und zweite Einschätzung",
      areaServed: ["Regensburg", "Bayern", "Düsseldorf"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Angebotscheck", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function AngebotscheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0f2fe_0,transparent_34rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <FileSearch className="h-4 w-4" />
                FLOXANT Angebots-Radar
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Angebot prüfen lassen: Red-Flag-Scanner vor der Zusage
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Scannen Sie in zwei Minuten, welche Punkte im Angebot unklar sind, oder senden Sie Angebot,
                Fotos und Eckdaten direkt an FLOXANT.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#red-flag-scanner" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700" data-event="service_card_click">
                  Red-Flag-Scanner starten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/angebot-guenstiger-pruefen" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 text-sm font-black text-blue-800 transition hover:border-blue-300 hover:bg-blue-50" data-event="service_card_click">
                  Günstigere Alternative prüfen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  WhatsApp mit Angebot senden
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Rechtsberatung</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Regensburg + Bayern nach Verfügbarkeit</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Düsseldorf passend zum Anliegen</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-blue-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
                <div className="grid gap-3">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-black text-slate-950">{step}</p>
                        <p className="text-xs leading-5 text-slate-500">
                          {index === 0
                            ? "PDF, Screenshot, Text oder nur Eckdaten reichen."
                            : index === 1
                              ? "FLOXANT schaut auf Umfang, Ort, Zugang und Termin."
                              : index === 2
                                ? "Offene Punkte werden sachlich sichtbar."
                                : "Wenn es passt, folgt eine eigene Einschätzung."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <p>
                      Ein Angebot kann günstig wirken, obwohl Etage, Zugang, Reinigung, Entsorgung oder Übergabe noch nicht eindeutig geregelt sind. Diese Punkte sollten vor einer Zusage klar sein.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OfferCheckAuthoritySections />

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Red-Flag-Checkliste</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was in Angeboten oft unklar bleibt</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Diese Punkte bedeuten nicht automatisch, dass ein Angebot schlecht ist. Sie sollten nur vor einer Zusage sauber geklärt sein.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {redFlags.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm shadow-slate-950/5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Prüfbereiche</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was FLOXANT beim Angebotscheck einordnet</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Die Prüfung bleibt praktisch: keine Abwertung anderer Anbieter, keine Rechtsberatung und kein Preisversprechen. Ziel ist Klarheit vor der Zusage.
              </p>
              <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700">
                <ShieldCheck className="mb-3 h-6 w-6 text-blue-700" />
                Besonders relevant ist der Angebotscheck für Regensburg, das direkte Umfeld bis ca. 200 km und Bayern nach Verfügbarkeit. Für Düsseldorf prüfen wir je nach Leistung die passende lokale Seite.
                <div className="mt-4">
                  <Link href="/rueckfahrt-boerse" className="inline-flex items-center gap-2 font-black text-blue-700 transition hover:text-blue-950" data-event="region_select" data-source="offer_check_internal_link">
                    Flexible Transportstrecke über die Rückfahrt-Börse prüfen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-3">
                  <Link href="/uebergabeakte" className="inline-flex items-center gap-2 font-black text-blue-700 transition hover:text-blue-950" data-event="service_card_click" data-source="offer_check_internal_link">
                    Übergabeakte als Dokumentationsbaustein prüfen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-3">
                  <Link href="/schadensbegrenzung" className="inline-flex items-center gap-2 font-black text-red-700 transition hover:text-red-950" data-event="service_card_click" data-source="offer_check_internal_link">
                    Wenn der Auftrag schon kippt: Schadensbegrenzung prüfen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-3">
                  <Link href="/plattform-auftrag-pruefen" className="inline-flex items-center gap-2 font-black text-blue-700 transition hover:text-blue-950" data-event="service_card_click" data-source="offer_check_internal_link">
                    Plattform-Auftrag oder Screenshot direkt prüfen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-3">
                  <Link href="/angebot-guenstiger-pruefen" className="inline-flex items-center gap-2 font-black text-blue-700 transition hover:text-blue-950" data-event="service_card_click" data-source="offer_check_internal_link">
                    Wenn Preis oder Budget knapp sind: günstigere Alternative prüfen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-3">
                  <Link href="/plan-b-service" className="inline-flex items-center gap-2 font-black text-amber-700 transition hover:text-amber-950" data-event="service_card_click" data-source="offer_check_internal_link">
                    Wenn Plan A wackelt: Plan B vor Zusage prüfen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {checkAreas.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-blue-700" />
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
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Leistungsbereiche</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Für welche Angebote der Check sinnvoll ist</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  FLOXANT prüft, ob das Angebot zur tatsächlichen Situation passt: Ort, Termin, Zugang, Zusatzleistungen, Fotos und Preisrahmen. Wenn FLOXANT den Auftrag übernehmen kann, folgt eine eigene Einschätzung.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceScopes.map((item) => (
                  <div key={item} className="rounded-[1rem] border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm font-black text-blue-950">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceClusterLinks
          eyebrow="Angebotscheck-Cluster"
          title="Welche Pruefung zum vorhandenen Angebot passt."
          intro="Ein Angebot kann guenstig, teuer, unvollstaendig oder einfach schwer vergleichbar sein. Diese Startpunkte halten die Entscheidung sachlich."
          links={offerCheckLinks}
        />

        <SignatureServicesGrid
          title="Signature Services, die beim Angebotscheck oft mitspielen."
          intro="Objektbrief, Uebergabe, Plan B und Rueckfahrt koennen erklaeren, warum ein Angebot lueckenhaft wirkt oder warum eine zweite Einschaetzung sinnvoll ist."
          services={signatureServiceLinks.filter((item) =>
            ["FLOXANT Fairpreis-Check", "FLOXANT Objektbrief", "FLOXANT Uebergabeakte", "FLOXANT Plan-B-Service", "FLOXANT Rueckfahrt-Radar"].includes(item.title),
          )}
        />

        <RelatedSpecialServices
          kind="offer"
          title="Wenn der Angebotscheck in einen naechsten Service fuehrt."
          intro="Nach der Pruefung kann klar werden, ob Reinigung, Umzug, Entruempelung, Rueckfahrt oder ein Objektbrief der bessere naechste Schritt ist."
          limit={3}
        />

        <OfferCheckConversionFlow />

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Vertrauen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Sachlich prüfen statt Panik machen</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                FLOXANT greift keine Anbieter an. Wir schauen auf die praktische Frage: Sind alle Punkte klar genug, damit Sie vor der Zusage wissen, was wirklich beauftragt wird?
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Keine Konkurrenz-Diffamierung", text: "Die Prüfung bleibt neutral und bezieht sich auf Angaben, Umfang und offene Rückfragen.", Icon: ShieldCheck },
                { title: "Keine Fake-Garantien", text: "FLOXANT verspricht keinen besseren Preis, sondern eine nachvollziehbare zweite Einschätzung.", Icon: BadgeCheck },
                { title: "Signature Services mitdenken", text: "Schlüsselübergabe, Zugang, Reinigung oder Entsorgung werden sichtbar, wenn sie für den Auftrag relevant sind.", Icon: Sparkles },
              ].map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-blue-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zum Angebotscheck</h2>
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
              <Link href="#angebotscheck-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700" data-event="hero_cta_click">
                Zweite Einschätzung anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:text-blue-700" data-event="phone_click">
                Telefonisch klären
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
