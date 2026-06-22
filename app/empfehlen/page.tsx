import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  Gift,
  Link2,
  QrCode,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { ReferralPartnerCodeForm } from "@/components/ReferralPartnerCodeForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/empfehlen";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "FLOXANT empfehlen | 50 Euro Empfehlungsbonus",
  description:
    "FLOXANT weiterempfehlen: Bei erfolgreicher Vermittlung eines neuen Kunden bedanken wir uns mit 50 Euro Empfehlungsbonus.",
});

const whatsappShareHref =
  "https://wa.me/?text=Ich%20empfehle%20dir%20FLOXANT%20f%C3%BCr%20Umzug%2C%20Reinigung%2C%20Entr%C3%BCmpelung%2C%20Haushaltsaufl%C3%B6sung%20oder%20%C3%9Cbergabevorbereitung.%20Du%20kannst%20hier%20direkt%20anfragen%3A%20https%3A%2F%2Fwww.floxant.de%2Fempfehlen";

const steps = [
  {
    title: "FLOXANT weiterempfehlen",
    text: "Sie empfehlen FLOXANT an eine Person oder ein Unternehmen weiter.",
  },
  {
    title: "Ihr Name wird genannt",
    text: "Die empfohlene Person nimmt Kontakt mit uns auf und nennt Ihren Namen.",
  },
  {
    title: "Anfrage wird geprüft",
    text: "FLOXANT prüft die Anfrage und erstellt bei passendem Bedarf ein Angebot.",
  },
  {
    title: "Bonus erhalten",
    text: "Kommt ein Auftrag zustande und wird die Rechnung vollständig bezahlt, erhalten Sie den Bonus.",
  },
];

const bonusConditions = [
  "Der Bonus gilt nur bei erfolgreicher Vermittlung eines neuen Kunden.",
  "Eine erfolgreiche Vermittlung liegt vor, wenn der empfohlene Kunde eine Leistung verbindlich beauftragt und die Rechnung vollständig bezahlt hat.",
  "Die Empfehlung muss transparent erfolgen. Bitte informieren Sie die empfohlene Person darüber, dass Sie im Erfolgsfall einen Bonus erhalten können.",
  "Die Empfehlung sollte vor oder bei der ersten Anfrage genannt werden, damit wir sie eindeutig zuordnen können.",
  "Keine Auszahlung bei Eigenauftrag, Storno, unbezahlter Rechnung oder unklarer Zuordnung.",
  "Keine Mehrfachauszahlung für denselben Auftrag.",
];

const audiences = [
  {
    title: "Kunden",
    text: "Wenn Sie FLOXANT bereits kennen und jemanden mit passendem Bedarf weiterempfehlen möchten.",
  },
  {
    title: "Nachbarn und Freunde",
    text: "Ideal, wenn jemand im Haus, Bekanntenkreis oder in der Familie Unterstützung braucht.",
  },
  {
    title: "Vermieter und Makler",
    text: "Für Auszug, Reinigung, Objektvorbereitung, Entrümpelung oder Übergabevorbereitung.",
  },
  {
    title: "Hausverwaltungen",
    text: "Für Mieterwechsel, Keller- und Nebenräume, Endreinigung oder wiederkehrende Objektfälle.",
  },
  {
    title: "Firmen und B2B",
    text: "Für Reinigung, Gewerbeflächen, Angebotsprüfung oder objektbezogene Leistungen nach Absprache.",
  },
];

const services = [
  ["Umzug Regensburg", "Wohnungswechsel, Transportvorbereitung, Zugang und Übergabe nach Absprache.", "/regensburg/umzug"],
  ["Reinigung Düsseldorf", "Reinigung für Unternehmen, Praxen, Wohnungen, Treppenhäuser und Übergaben.", "/duesseldorf/reinigung"],
  ["Reinigung Regensburg", "Endreinigung, Übergabereinigung und Reinigung nach Umzug oder Räumung.", "/regensburg/reinigung"],
  ["Entrümpelung Regensburg", "Wohnung, Keller, Haus oder Objektfläche mit Fotos und klarer Vorprüfung.", "/regensburg/entruempelung"],
  ["Haushaltsauflösung Regensburg", "Räumung, Sortierung, Restpunkte und Vorbereitung für Übergabe oder Nachnutzung.", "/regensburg/haushaltsaufloesung"],
  ["Übergabereinigung", "Wohnung oder Objekt vor Rückgabe, Besichtigung oder Mieterwechsel vorbereiten.", "/regensburg/uebergabereinigung"],
  ["Angebotsprüfung Düsseldorf", "Bestehendes Reinigungsangebot oder Eckdaten sachlich einordnen lassen.", "/angebot-vergleichen-duesseldorf"],
  ["Angebotsprüfung allgemein", "Angebot für Umzug, Reinigung, Entrümpelung oder Entsorgung sachlich prüfen lassen.", "/angebot-guenstiger-pruefen"],
];

const faqItems = [
  {
    q: "Wie funktioniert der FLOXANT Empfehlungsbonus?",
    a: "Sie empfehlen FLOXANT weiter. Die empfohlene Person nimmt Kontakt mit uns auf und nennt Ihren Namen. Wenn daraus ein verbindlicher Auftrag entsteht und die Rechnung vollständig bezahlt wird, erhalten Sie 50 Euro als Dankeschön.",
  },
  {
    q: "Wann bekomme ich die 50 Euro?",
    a: "Der Bonus wird nach erfolgreicher Vermittlung ausgezahlt. Erfolgreich heißt: Der neue Kunde hat eine Leistung verbindlich beauftragt und die Rechnung vollständig bezahlt.",
  },
  {
    q: "Muss die empfohlene Person meinen Namen nennen?",
    a: "Ja, bitte. Die Empfehlung sollte bei der ersten Anfrage genannt werden, damit FLOXANT den Bonus eindeutig zuordnen kann.",
  },
  {
    q: "Kann ich FLOXANT per WhatsApp empfehlen?",
    a: "Ja. Sie können FLOXANT per WhatsApp, persönlich oder per Link weiterempfehlen. Wichtig ist, dass die empfohlene Person informiert ist und selbst Kontakt aufnimmt.",
  },
  {
    q: "Bekomme ich den Bonus auch, wenn kein Auftrag zustande kommt?",
    a: "Nein. Der Bonus gilt nur, wenn ein neuer Kunde verbindlich beauftragt und die Rechnung vollständig bezahlt wurde.",
  },
  {
    q: "Muss ich offenlegen, dass ich einen Bonus erhalten kann?",
    a: "Ja. Die Empfehlung muss transparent erfolgen. Bitte informieren Sie die empfohlene Person darüber, dass Sie im Erfolgsfall einen Bonus erhalten können.",
  },
  {
    q: "Für welche Services gilt die Empfehlung?",
    a: "Die Aktion gilt für FLOXANT-Leistungen in Düsseldorf und Regensburg, insbesondere für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Übergabereinigung und Angebotsprüfung.",
  },
  {
    q: "Wie wird der Bonus ausgezahlt?",
    a: "Die Auszahlung wird nach erfolgreicher Zuordnung und Prüfung mit Ihnen abgestimmt. Bankdaten werden nicht öffentlich und nicht in einer Empfehlung geteilt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "FLOXANT empfehlen",
      description:
        "Empfehlungsseite für Kunden, Freunde, Vermieter, Makler, Hausverwaltungen und Unternehmen mit 50 Euro Empfehlungsbonus bei erfolgreicher Vermittlung.",
      path,
      about: [
        "FLOXANT Empfehlungsbonus",
        "Empfehlungsbonus",
        "Umzugsfirma empfehlen Regensburg",
        "Reinigungsfirma empfehlen Regensburg",
        "Empfehlungslink teilen",
      ],
      potentialActions: [
        { name: "Empfehlung starten", target: `${path}#empfehlungsformular` },
        { name: "FLOXANT per WhatsApp empfehlen", target: whatsappShareHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Empfehlungsbonus",
      description:
        "Empfehlungsbonus für FLOXANT Services. Bei erfolgreicher Vermittlung eines neuen Kunden kann ein 50 Euro Bonus ausgezahlt werden.",
      path,
      serviceType: "Empfehlungsbonus",
      areaServed: ["Regensburg", "Düsseldorf", "FLOXANT Leistungen nach Verfügbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "FLOXANT empfehlen", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function EmpfehlenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main
        className="overflow-hidden bg-[radial-gradient(circle_at_12%_0%,#dbeafe_0,transparent_34rem),radial-gradient(circle_at_92%_10%,#dcfce7_0,transparent_30rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_43%,#f8fafc_100%)] text-slate-950"

      >
        <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <Gift className="h-4 w-4" />
                FLOXANT weiterempfehlen
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                FLOXANT empfehlen und 50 Euro als Dankeschön erhalten
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Sie kennen jemanden, der Unterstützung bei Umzug, Reinigung,
                Entrümpelung, Haushaltsauflösung oder Übergabevorbereitung braucht?
                Wenn durch Ihre Empfehlung ein erfolgreicher Auftrag zustande kommt,
                bedanken wir uns mit einem Empfehlungsbonus in Höhe von 50 Euro.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#empfehlungsformular" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800" data-event="service_card_click">
                  Empfehlung starten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappShareHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Per WhatsApp empfehlen
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">50 Euro bei erfolgreicher Vermittlung</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Transparent weiterempfehlen</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Düsseldorf und Regensburg</span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
              <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,#22c55e_0,transparent_21rem),linear-gradient(145deg,#1e293b,#020617)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Empfehlungsbonus</div>
                    <h2 className="mt-2 text-3xl font-black tracking-tight">50 Euro bei erfolgreicher Vermittlung</h2>
                  </div>
                  <CircleDollarSign className="h-11 w-11 text-emerald-200" />
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-200">
                  Der Bonus gilt, wenn der empfohlene Kunde eine Leistung verbindlich
                  beauftragt und die Rechnung vollständig bezahlt hat. Bitte informieren
                  Sie die empfohlene Person vorab über den möglichen Bonus.
                </p>
                <div className="mt-6 grid gap-3">
                  {steps.map((step, index) => (
                    <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-xs font-black text-slate-950">{index + 1}</span>
                      <div>
                        <h3 className="text-sm font-black text-white">{step.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-300">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="space-y-5">
              <div className="rounded-[2rem] border border-blue-200 bg-white p-7 shadow-sm">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">So funktioniert es</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Empfehlen, Namen nennen, Auftrag abschließen</h2>
                <div className="mt-6 grid gap-4">
                  {[
                    ["Weiterempfehlen", "Sie empfehlen FLOXANT an eine Person oder ein Unternehmen weiter."],
                    ["Name nennen lassen", "Die empfohlene Person nimmt Kontakt mit FLOXANT auf und nennt Ihren Namen."],
                    ["Bonus erhalten", "Nach verbindlichem Auftrag und vollständig bezahlter Rechnung wird der Bonus zugeordnet."],
                  ].map(([title, text]) => (
                    <div key={title} className="flex gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                      <Link2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                      <div>
                        <h3 className="text-sm font-black text-slate-950">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Wichtig</div>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Wann gilt der Empfehlungsbonus?</h2>
                <div className="mt-5 grid gap-3">
                  {bonusConditions.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm font-bold leading-7 text-amber-900">
                  Der Bonus gilt nur bei erfolgreicher Vermittlung eines neuen Kunden.
                </p>
              </div>
            </div>
            <ReferralPartnerCodeForm />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Wer FLOXANT weiterempfehlen kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Die Empfehlung soll fair und transparent sein. Bitte sagen Sie der
                empfohlenen Person offen, dass Sie im Erfolgsfall einen Bonus erhalten können.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {audiences.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <UsersRound className="mb-4 h-6 w-6 text-blue-700" />
                  <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  <Link href="#empfehlungsformular" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-950" data-event="service_card_click">
                    Empfehlung starten
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Empfehlbare Services</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Wofür kann FLOXANT empfohlen werden?</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Die Aktion gilt für FLOXANT-Leistungen in Düsseldorf und Regensburg,
                  insbesondere für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung,
                  Übergabereinigung und Angebotsprüfung.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/buchung?ref=FLOXANT50" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                    Anfrage starten
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/makler-vermieter-link" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                    Für Vermieter und Objektkunden
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map(([title, text, href]) => (
                  <Link key={title} href={href} className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                    <Sparkles className="mb-4 h-5 w-5 text-blue-700" />
                    <h3 className="text-lg font-black text-slate-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                      Diesen Service empfehlen
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 lg:col-span-2">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Einfach teilen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Empfehlung per WhatsApp, QR-Code oder Link</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Sie können FLOXANT persönlich, per WhatsApp oder über einen Link empfehlen.
                Wichtig ist, dass die empfohlene Person selbst Kontakt aufnimmt und Ihren Namen nennt.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {[
                  "/empfehlen?utm_source=whatsapp&utm_medium=referral&utm_campaign=empfehlungsbonus",
                  "/empfehlen?utm_source=invoice&utm_medium=offline&utm_campaign=empfehlungsbonus",
                  "/empfehlen?utm_source=vehicle_qr&utm_medium=offline&utm_campaign=empfehlungsbonus",
                  "/empfehlen?utm_source=google_business_profile&utm_medium=organic_local&utm_campaign=empfehlungsbonus",
                ].map((item) => (
                  <code key={item} className="block overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700">{item}</code>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-7">
              <QrCode className="h-9 w-9 text-blue-700" />
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">QR-Code möglich</h2>
              <p className="mt-3 text-sm leading-7 text-blue-950">
                Die kurze URL /empfehlen kann als QR-Code genutzt werden. Persönliche Daten
                wie Namen, Telefonnummern oder Objektadressen gehören nicht in den QR-Link.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zum Empfehlungsbonus</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-black text-slate-950">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#empfehlungsformular" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Empfehlen
          </Link>
          <a href={whatsappShareHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            Teilen
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
