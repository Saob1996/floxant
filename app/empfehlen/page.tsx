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
  title: "FLOXANT empfehlen - 50 Euro Empfehlungsbonus bei Auftrag",
  description:
    "FLOXANT weiterempfehlen: Wenn aus Ihrer Empfehlung ein bestaetigter und bezahlter Auftrag entsteht, kann ein 50 Euro Empfehlungsbonus ausgezahlt werden.",
  keywords: [
    "FLOXANT empfehlen",
    "Empfehlungsbonus Umzug",
    "Umzugsfirma empfehlen Regensburg",
    "Reinigungsfirma empfehlen Regensburg",
    "Partnercode Umzug",
    "50 Euro Empfehlungsbonus",
  ],
});

const whatsappShareHref =
  "https://wa.me/?text=Ich%20empfehle%20dir%20FLOXANT%20fuer%20Umzug%2C%20Reinigung%2C%20Entruempelung%2C%20Transport%20oder%20Entsorgung.%20Du%20kannst%20hier%20direkt%20anfragen%3A%20https%3A%2F%2Fwww.floxant.de%2Fempfehlen";

const steps = [
  {
    title: "Link oder Code teilen",
    text: "Der beste Datenschutzweg: Die empfohlene Person nutzt Ihren Link oder nennt den Code selbst.",
  },
  {
    title: "Person fragt selbst an",
    text: "Freunde, Nachbarn, Vermieter, Makler oder Unternehmen starten die Anfrage bei FLOXANT.",
  },
  {
    title: "Auftrag wird bestaetigt und bezahlt",
    text: "Nur ein tatsaechlich beauftragter, durchgefuehrter und bezahlter Auftrag kann bonusfaehig werden.",
  },
  {
    title: "Bonus wird geprueft",
    text: "FLOXANT prueft den Partnercode, die Empfehlung und die Bonusbedingungen ohne automatische Auszahlungsgarantie.",
  },
];

const bonusConditions = [
  "Empfehlung muss vor oder bei der Anfrage genannt werden.",
  "Auftrag muss von FLOXANT bestaetigt, durchgefuehrt und bezahlt sein.",
  "Bonus wird nach Pruefung ausgezahlt, nicht automatisch ohne Anspruchspruefung.",
  "Keine Mehrfachauszahlung fuer denselben Auftrag.",
  "Keine Auszahlung bei Eigenauftrag, Storno oder unbezahltem Auftrag.",
  "FLOXANT behaelt sich Pruefung bei Missbrauch oder unklarer Zuordnung vor.",
];

const audiences = [
  {
    title: "Kunden",
    text: "Wenn Sie zufrieden waren oder jemanden kennen, der Umzug, Reinigung oder Entruempelung braucht.",
  },
  {
    title: "Nachbarn und Freunde",
    text: "Ideal, wenn jemand im Haus, Bekanntenkreis oder in der Familie konkrete Hilfe sucht.",
  },
  {
    title: "Vermieter und Makler",
    text: "Empfehlbar fuer Auszug, Reinigung, Objektvorbereitung, Entruempelung oder Uebergabeakte.",
  },
  {
    title: "Hausverwaltungen",
    text: "Fuer Mieterwechsel, Keller-/Muellraum-Themen, Endreinigung oder wiederkehrende Objektfaelle.",
  },
  {
    title: "Firmen und B2B",
    text: "Fuer Reinigung, kleine Gewerbeflaechen, Transport oder Entsorgung nach Absprache.",
  },
];

const services = [
  ["Umzug Regensburg", "Privatumzug, Transport, Halteverbot und Uebergabe nach Absprache.", "/umzug-regensburg"],
  ["Reinigung Regensburg", "Wohnungsreinigung, Endreinigung, Grundreinigung und Uebergabevorbereitung.", "/reinigung-regensburg"],
  ["Entruempelung Regensburg", "Wohnung, Keller, Garage oder Objektflaeche mit Fotoeinschaetzung.", "/entruempelung-regensburg"],
  ["Transport Regensburg", "Moebeltransport, Kleintransport und flexible Strecken nach Verfuegbarkeit.", "/kleintransport-regensburg"],
  ["Mieterwechsel-Service", "Raeumung, Reinigung, Entsorgung und Schluesselkoordination fuer B2B-Faelle.", "/mieterwechsel-service-regensburg"],
  ["Wohnung wieder vermietbar", "Objekt nach Auszug, Leerstand oder Entruempelung wieder nutzbarer vorbereiten.", "/wohnung-wieder-vermietbar"],
  ["Angebotscheck", "Zweite Einschaetzung vor Zusage, wenn bereits ein Angebot vorliegt.", "/angebotscheck"],
  ["Rueckfahrt-Boerse", "Strecke eintragen und Leerfahrt/Rueckfahrt nach Verfuegbarkeit pruefen lassen.", "/rueckfahrt-boerse"],
  ["Uebergabeakte", "Organisatorisches Dossier fuer Auszug, Reinigung, Fotos und Schluesselstatus.", "/uebergabeakte"],
  ["Keller-/Muellraum-Rettung", "Objektflaechen fuer Verwaltung, WEG, Gewerbe oder Privatkunden pruefen lassen.", "/keller-muellraum-rettung-regensburg"],
  ["Duesseldorf Reinigung", "Nur Reinigung, Endreinigung und B2B-Reinigung fuer Duesseldorf.", "/duesseldorf/reinigung"],
  ["Duesseldorf Entsorgung", "Nur Entsorgung und Fotoeinschaetzung fuer Duesseldorf, keine Umzugssignale.", "/entsorgung-duesseldorf"],
];

const faqItems = [
  {
    q: "Wie funktioniert der FLOXANT Empfehlungsbonus?",
    a: "Sie teilen einen neutralen Partnercode oder Empfehlungslink. Wenn daraus ein bestaetigter und bezahlter Auftrag entsteht, prueft FLOXANT den 50 Euro Empfehlungsbonus.",
  },
  {
    q: "Wann bekomme ich die 50 Euro?",
    a: "Eine Auszahlung kann nach Pruefung erfolgen, wenn der Auftrag bestaetigt, durchgefuehrt und bezahlt wurde. Es gibt keine automatische Auszahlung ohne Pruefung.",
  },
  {
    q: "Muss die empfohlene Person meinen Code nennen?",
    a: "Am besten ja. Der Code kann ueber den Link uebernommen oder im Formular, per WhatsApp oder im Gespraech genannt werden.",
  },
  {
    q: "Kann ich FLOXANT per WhatsApp empfehlen?",
    a: "Ja. Sie koennen den Link oder Code per WhatsApp teilen. Die empfohlene Person soll selbst Kontakt aufnehmen.",
  },
  {
    q: "Bekomme ich den Bonus auch, wenn kein Auftrag zustande kommt?",
    a: "Nein. Der Bonus wird nur geprueft, wenn ein bestaetigter und bezahlter Auftrag entsteht.",
  },
  {
    q: "Darf ich Kontaktdaten einer anderen Person eintragen?",
    a: "Nur, wenn diese Person mit der Kontaktaufnahme durch FLOXANT einverstanden ist. Ohne diese Einwilligung sollen Sie nur Link oder Code teilen.",
  },
  {
    q: "Fuer welche Services gilt die Empfehlung?",
    a: "Empfehlungen koennen fuer Umzug, Reinigung, Entruempelung, Transport, Entsorgung und Signature Services gelten. Duesseldorf nur fuer Reinigung und Entsorgung.",
  },
  {
    q: "Wie wird der Bonus ausgezahlt?",
    a: "Auszahlung oder Verrechnung wird spaeter nach Pruefung und Absprache geklaert. Bankdaten werden im ersten Formular nicht erhoben.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "FLOXANT empfehlen",
      description:
        "Empfehlungsseite fuer Kunden, Freunde, Vermieter, Makler, Hausverwaltungen und Unternehmen mit Partnercode und 50 Euro Empfehlungsbonus nach Pruefung.",
      path,
      about: [
        "FLOXANT Empfehlungsbonus",
        "Partnercode",
        "Umzugsfirma empfehlen Regensburg",
        "Reinigungsfirma empfehlen Regensburg",
        "Empfehlungslink teilen",
      ],
      potentialActions: [
        { name: "Partnercode erstellen", target: `${path}#empfehlungsformular` },
        { name: "FLOXANT per WhatsApp empfehlen", target: whatsappShareHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Partnercode und Empfehlungsbonus",
      description:
        "Empfehlungsmechanik fuer FLOXANT Services. Bei bestaetigtem und bezahltem Auftrag kann ein 50 Euro Empfehlungsbonus nach Pruefung ausgezahlt werden.",
      path,
      serviceType: "Empfehlungsbonus und Partnercode",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfuegbarkeit", "Duesseldorf Reinigung und Entsorgung"],
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
        data-event="view_referral_page"
      >
        <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <Gift className="h-4 w-4" />
                FLOXANT Empfehlungs-Zentrale
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                FLOXANT empfehlen und 50 Euro Bonus sichern
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Empfehlen Sie FLOXANT fuer Umzug, Reinigung, Entruempelung, Transport oder Entsorgung.
                Wenn aus Ihrer Empfehlung ein bestaetigter und bezahlter Auftrag entsteht, prueft FLOXANT den Empfehlungsbonus.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#empfehlungsformular" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800" data-event="start_referral_form">
                  Partnercode erstellen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappShareHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="click_referral_whatsapp_share">
                  Per WhatsApp empfehlen
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine MLM-Logik</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Bonus nach Pruefung</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Bankdaten im ersten Schritt</span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
              <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,#22c55e_0,transparent_21rem),linear-gradient(145deg,#1e293b,#020617)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Bonus-Karte</div>
                    <h2 className="mt-2 text-3xl font-black tracking-tight">50 Euro bei erfolgreicher Vermittlung</h2>
                  </div>
                  <CircleDollarSign className="h-11 w-11 text-emerald-200" />
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-200">
                  Sicher formuliert: Wenn aus Ihrer Empfehlung ein bestaetigter und bezahlter Auftrag entsteht,
                  kann ein 50 Euro Empfehlungsbonus ausgezahlt werden. Details und Pruefung erfolgen durch FLOXANT.
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
                <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Empfehlungsmechanik</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Ein Code, mehrere sichere Wege</h2>
                <div className="mt-6 grid gap-4">
                  {[
                    ["Empfehlungslink teilen", "Neutraler Link wie /buchung?ref=CODE. Die empfohlene Person fragt selbst an."],
                    ["Code manuell nennen", "Der Code kann im Formular, per WhatsApp oder im Telefonat genannt werden."],
                    ["Direkte Empfehlung", "Nur mit bestaetigter Einwilligung der empfohlenen Person, wenn fremde Kontaktdaten eingetragen werden."],
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
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Bedingungen transparent</div>
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
                  Der Empfehlungsbonus ist kein automatischer Anspruch ohne Pruefung.
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Wer FLOXANT sinnvoll empfehlen kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Die Empfehlungs-Zentrale bleibt bewusst seriös: kein Schneeball-System, kein unklarer Affiliate-Auftritt,
                sondern ein nachvollziehbarer Bonus fuer echte Auftraege.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {audiences.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <UsersRound className="mb-4 h-6 w-6 text-blue-700" />
                  <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  <Link href="#empfehlungsformular" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-950" data-event="start_referral_form">
                    Partnercode nutzen
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
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Wofuer kann FLOXANT empfohlen werden?</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Regensburg bleibt der Kern. Bayern wird nach Verfuegbarkeit geprueft.
                  Duesseldorf ist sauber getrennt und nur fuer Reinigung und Entsorgung sichtbar.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/buchung?ref=FLOXANT50" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                    Beispiel-Link zur Buchung
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/makler-vermieter-link" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                    B2B-Objekt-Link
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">GBP, Offline und Vertrieb</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Link-freundlich fuer WhatsApp, QR-Code und Signatur</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Nutzen Sie die Seite fuer Google Business Profile Posts, WhatsApp-Nachrichten nach Auftrag,
                Rechnungsfooter, Fahrzeug-/Flyer-QR-Codes oder Partnerkommunikation. UTM-Parameter duerfen Quelle,
                Medium und Kampagne enthalten, aber keine personenbezogenen Daten.
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
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">QR-Code faehig</h2>
              <p className="mt-3 text-sm leading-7 text-blue-950">
                Die kurze URL /empfehlen kann auf Rechnungen, Flyern oder Fahrzeugen als QR-Code genutzt werden.
                Im QR-Link keine Namen, Telefonnummern oder Objektadressen codieren.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Haeufige Fragen zum FLOXANT Partnercode</h2>
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

        <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-slate-950/15 backdrop-blur md:hidden">
          <Link href="#empfehlungsformular" className="rounded-xl bg-slate-950 px-3 py-3 text-center text-xs font-black text-white" data-event="start_referral_form">
            Code
          </Link>
          <a href={whatsappShareHref} className="rounded-xl bg-emerald-600 px-3 py-3 text-center text-xs font-black text-white" data-event="click_referral_whatsapp_share">
            Teilen
          </a>
          <a href="tel:+4915771105087" className="rounded-xl bg-blue-700 px-3 py-3 text-center text-xs font-black text-white" data-event="click_referral_phone">
            Anrufen
          </a>
        </div>
      </main>
    </>
  );
}
