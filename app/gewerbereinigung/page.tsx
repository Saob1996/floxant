import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Hotel,
  KeyRound,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const pagePath = "/gewerbereinigung";
const bookingHref = "/buchung?service=gewerbereinigung&region=duesseldorf#buchungssystem";
const callbackHref = "/kontakt?anliegen=rueckruf-gewerbereinigung-duesseldorf";
const betterPriceHref = "/duesseldorf/vielleicht-guenstiger";
const whatsappText =
  "Hallo FLOXANT, ich moechte gewerbliche Reinigung in Duesseldorf anfragen. Es geht um: ";
const whatsappHref = `https://wa.me/4915771105087?text=${encodeURIComponent(whatsappText)}`;
const mailHref =
  "mailto:info@floxant.de?subject=Gewerbliche%20Reinigung%20D%C3%BCsseldorf";

const trustItems = [
  "Für Unternehmen, Praxen, Kanzleien, Hotels und Hausverwaltungen",
  "Flexible Einsatzzeiten vor Öffnung, nach Feierabend oder nach Absprache",
  "Einmalig oder regelmäßig möglich",
  "Klare Kommunikation statt langer Formulare",
  "Faire Angebotserstellung nach Objekt, Fläche und Zustand",
  "WhatsApp-Anfrage mit Fotos möglich",
];

const services = [
  {
    title: "Hotelreinigung",
    Icon: Hotel,
    text:
      "Wenn Zimmerwechsel, öffentliche Bereiche oder Frühstücksflächen sauber laufen müssen, zählt Verlässlichkeit. FLOXANT unterstützt Hotels in Düsseldorf bei regelmäßiger Reinigung und bei zusätzlichem Bedarf durch Ausfälle oder hohe Auslastung.",
    areas: ["Zimmer", "Flure und Lobby", "Frühstücksbereich", "Sanitärbereiche"],
    href: "/duesseldorf/hotelreinigung",
  },
  {
    title: "Praxisreinigung",
    Icon: Stethoscope,
    text:
      "In Praxen fällt Unordnung sofort auf. Wir reinigen Empfang, Wartezimmer, Therapieräume und Sanitärbereiche ruhig, diskret und mit Blick auf den Tagesablauf.",
    areas: ["Arztpraxen", "Therapieräume", "Empfang", "Wartezimmer"],
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Kanzleireinigung",
    Icon: ShieldCheck,
    text:
      "Mandanten achten auf Räume, bevor das Gespräch beginnt. FLOXANT kümmert sich um Besprechungsräume, Arbeitsplätze, Eingangsbereich und Sanitärflächen, ohne den Kanzleibetrieb zu stören.",
    areas: ["Anwaltskanzleien", "Steuerkanzleien", "Beratungsbüros", "Besprechungsräume"],
    href: "/duesseldorf/kanzleireinigung",
  },
  {
    title: "Büroreinigung",
    Icon: Building2,
    text:
      "Ein Büro soll sauber sein, ohne dass jeden Tag jemand hinterhertelefonieren muss. Wir reinigen Arbeitsplätze, Küchen, Besprechungsräume und Sanitärbereiche nach einem klaren Plan.",
    areas: ["Arbeitsplätze", "Küchen", "Meetingräume", "Sanitärbereiche"],
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Treppenhausreinigung",
    Icon: Users,
    text:
      "Bei Mehrfamilienhäusern und verwalteten Objekten entscheidet der Eingang oft über den Eindruck. FLOXANT reinigt Eingangsbereiche, Geländer, Briefkästen und Etagen planbar und nachvollziehbar.",
    areas: ["Mehrfamilienhäuser", "Hausverwaltungen", "Eingang", "Etagen"],
    href: "/duesseldorf/treppenhausreinigung",
  },
  {
    title: "Grundreinigung",
    Icon: Sparkles,
    text:
      "Wenn normale Unterhaltsreinigung nicht mehr reicht, braucht das Objekt einen sauberen Neustart. Das gilt vor Übergaben, nach Renovierung oder wenn Böden, Küche und Sanitärbereiche sichtbar belastet sind.",
    areas: ["Übergabe", "Renovierung", "sichtbare Verschmutzung", "starke Nutzung"],
    href: "/duesseldorf/grundreinigung",
  },
];

const stressMoments = [
  "Die Reinigungskraft fällt kurzfristig aus und der Betrieb läuft trotzdem weiter.",
  "Im Hotel stehen mehr Zimmerwechsel an als geplant.",
  "Die Praxis braucht nach Feierabend eine Reinigung, auf die man sich verlassen kann.",
  "Die Kanzlei will vor Mandantenterminen gepflegt wirken.",
  "Das Büro braucht regelmäßige Reinigung ohne ständige Rückfragen.",
  "Ein Objekt muss vor einer Übergabe ordentlich aussehen.",
  "Die Hausverwaltung braucht saubere Treppenhäuser ohne Diskussionen im Haus.",
];

const steps = [
  {
    title: "Anfrage senden",
    text: "Sie nennen Objekt, Adresse, Zeitraum und was gereinigt werden soll. Fotos helfen, wenn es schnell gehen muss.",
  },
  {
    title: "Räume und Wunschzeit klären",
    text: "Wir prüfen Fläche, Zustand, Zugang, Uhrzeit und ob eine einmalige oder regelmäßige Reinigung sinnvoll ist.",
  },
  {
    title: "Klares Angebot erhalten",
    text: "Sie bekommen einen nächsten Schritt: Rückfrage, Besichtigung oder Angebot. Ohne künstliche Versprechen.",
  },
  {
    title: "Reinigung planen und durchführen",
    text: "Nach Freigabe wird der Einsatz vorbereitet. Ansprechpartner, Zugang und Ablauf werden vorher geklärt.",
  },
];

const addOns = [
  {
    title: "Schlüsselübergabe-Service",
    text:
      "Wenn Sie nicht selbst vor Ort sein können, stimmen wir Schlüsselübernahme, Dokumentation und Rückgabe vorher sauber ab.",
    Icon: KeyRound,
  },
  {
    title: "Abnahmevorbereitung",
    text:
      "Für Büros, Praxen, Wohnungen oder Objekte, die sauber übergeben werden sollen. Im Fokus stehen Böden, Sanitärbereiche, Küche, Eingang und sichtbare Details.",
    Icon: ClipboardCheck,
  },
  {
    title: "Kurzfristige Springer-Reinigung",
    text:
      "Für Hotels, Praxen, Büros oder Betriebe, wenn Personal ausfällt oder plötzlich mehr Arbeit entsteht. Wir prüfen ehrlich, was kurzfristig machbar ist.",
    Icon: CalendarClock,
  },
  {
    title: "Reinigungs-Check vor wichtigen Terminen",
    text:
      "Vor Mandantenterminen, Praxisbesuchen, Besichtigungen, Hotelkontrollen oder internen Terminen. Die Räume sollen vorbereitet, gepflegt und ruhig wirken.",
    Icon: CheckCircle2,
  },
  {
    title: "Foto-Dokumentation nach Absprache",
    text:
      "Auf Wunsch dokumentieren wir ausgewählte Bereiche nach der Reinigung, damit Sie auch aus der Ferne sehen, was erledigt wurde.",
    Icon: ShieldCheck,
  },
];

const faqItems = [
  {
    q: "Was kostet gewerbliche Reinigung ungefähr?",
    a: "Das hängt von Fläche, Zustand, Turnus, Zugang und gewünschtem Umfang ab. Für eine schnelle Einschätzung reichen oft Objektart, Quadratmeter, Adresse, Zeitfenster und einige Fotos.",
  },
  {
    q: "Wie schnell bekomme ich eine Antwort?",
    a: "Bei klaren Angaben melden wir uns in der Regel zeitnah mit Rückfrage, nächstem Schritt oder Angebot. WhatsApp ist oft der schnellste Weg, wenn Fotos vorhanden sind.",
  },
  {
    q: "Reinigt FLOXANT auch außerhalb der Öffnungszeiten?",
    a: "Ja, nach Absprache. Viele Betriebe wünschen Reinigung vor Öffnung, nach Feierabend oder in ruhigen Zeitfenstern.",
  },
  {
    q: "Wer kommt vorbei?",
    a: "FLOXANT plant den Einsatz mit passenden Kräften und einem klaren Ansprechpartner. Vor dem Start werden Zugang, Umfang und wichtige Hinweise abgestimmt.",
  },
  {
    q: "Was passiert, wenn während der Reinigung etwas auffällt?",
    a: "Dann wird es nicht verschwiegen. Wir melden uns, klären den nächsten Schritt und dokumentieren auf Wunsch die betroffenen Stellen.",
  },
];

const relatedLinks = [
  { label: "Büroreinigung Düsseldorf", href: "/duesseldorf/bueroreinigung" },
  { label: "Praxisreinigung Düsseldorf", href: "/duesseldorf/praxisreinigung" },
  { label: "Hotelreinigung Düsseldorf", href: "/duesseldorf/hotelreinigung" },
  { label: "Treppenhausreinigung Düsseldorf", href: "/duesseldorf/treppenhausreinigung" },
  { label: "Kurzfristige Reinigung", href: "/duesseldorf/kurzfristige-reinigung" },
  { label: "Schlüsselübergabe Reinigung", href: "/duesseldorf/schluesseluebergabe-reinigung" },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "gewerbereinigung",
    title: "Gewerbliche Reinigung für Hotels, Praxen, Kanzleien & Büros | FLOXANT",
    description:
      "FLOXANT bietet gewerbliche Reinigung für Hotels, Praxen, Kanzleien, Büros, Treppenhäuser und Objekte. Einmalig oder regelmäßig anfragen.",
    keywords: [
      "Gewerbliche Reinigung Düsseldorf",
      "Gewerbereinigung Düsseldorf",
      "Hotelreinigung Düsseldorf",
      "Praxisreinigung Düsseldorf",
      "Kanzleireinigung Düsseldorf",
      "Büroreinigung Düsseldorf",
      "Treppenhausreinigung Düsseldorf",
      "Grundreinigung Düsseldorf",
      "Reinigungsfirma Düsseldorf",
    ],
  });
}

export default function GewerbereinigungLandingPage() {
  const serviceJsonLd = buildServiceJsonLd({
    name: "Gewerbliche Reinigung in Düsseldorf",
    description:
      "Gewerbliche Reinigung für Hotels, Praxen, Kanzleien, Büros, Treppenhäuser und Objekte in Düsseldorf. Einmalig oder regelmäßig nach Absprache.",
    path: pagePath,
    serviceType:
      "Gewerbliche Reinigung, Hotelreinigung, Praxisreinigung, Kanzleireinigung, Büroreinigung und Treppenhausreinigung",
    areaServed: ["Düsseldorf", "Nordrhein-Westfalen", "Regensburg", "Oberpfalz", "Bayern"],
  });

  const webPageJsonLd = buildWebPageJsonLd({
    name: "Gewerbliche Reinigung für Hotels, Praxen, Kanzleien und Büros",
    description:
      "Direkte Anfrage für gewerbliche Reinigung in Düsseldorf mit WhatsApp, Telefon, Rückruf und klarer Angebotserstellung.",
    path: pagePath,
    about: [
      "Gewerbliche Reinigung",
      "Hotelreinigung",
      "Praxisreinigung",
      "Kanzleireinigung",
      "Büroreinigung",
      "Treppenhausreinigung",
      "Grundreinigung",
      "Düsseldorf",
    ],
    potentialActions: [
      { name: "Kostenlos anfragen", target: bookingHref, type: "ContactAction" },
      { name: "WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      { name: "Rückruf anfordern", target: callbackHref, type: "ContactAction" },
    ],
  });

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${company.url}/#localbusiness`,
    name: company.name,
    url: company.url,
    telephone: company.phoneRaw,
    email: company.email,
    image: `${company.url}/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressRegion: company.state,
      addressCountry: company.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Düsseldorf" },
      { "@type": "AdministrativeArea", name: "Oberpfalz" },
      { "@type": "State", name: "Bayern" },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      serviceJsonLd,
      webPageJsonLd,
      buildFaqJsonLd(faqItems),
      localBusinessJsonLd,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <Image
              src="/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp"
              alt="Heller gewerblicher Raum in Düsseldorf mit Reinigungsausstattung"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-950/30" />
          </div>

          <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Gewerbliche Reinigung in Düsseldorf
              </p>
              <h1 className="text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
                Gewerbliche Reinigung für Hotels, Praxen, Kanzleien und Büros
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                FLOXANT übernimmt zuverlässige Reinigung für Betriebe, bei denen Sauberkeit direkt mit Vertrauen, Gästen, Patienten, Mandanten oder Mitarbeitenden verbunden ist.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={bookingHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  Kostenlos anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp senden
                </Link>
                <Link
                  href={callbackHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Rückruf anfordern
                </Link>
                <Link
                  href={betterPriceHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-300/10 px-6 py-3 text-sm font-black text-emerald-100 transition hover:bg-emerald-300/15 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <BadgeEuro className="h-4 w-4" aria-hidden="true" />
                  Vielleicht geht es günstiger
                </Link>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <strong className="block text-white">Direkt anfragbar</strong>
                  Ort, Fläche, Zeitfenster und Fotos reichen für den Start.
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <strong className="block text-white">Für laufende Betriebe</strong>
                  Reinigung vor Öffnung, nach Feierabend oder nach Plan.
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <strong className="block text-white">Klarer nächster Schritt</strong>
                  Rückfrage, Angebot oder Terminabstimmung ohne Umwege.
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-slate-950/40 backdrop-blur">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-slate-900">
                <Image
                  src="/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp"
                  alt="Gereinigtes Hotel- und Büroobjekt in Düsseldorf ohne Personen"
                  fill
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="object-cover object-[72%_58%] opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/80 p-5 backdrop-blur">
                    <p className="text-sm font-semibold text-cyan-200">Düsseldorf und nach Absprache</p>
                    <p className="mt-2 text-2xl font-black">Hotel, Praxis, Kanzlei, Büro, Treppenhaus</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      Sie schicken uns die Eckdaten. Wir sagen, was realistisch machbar ist.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-3 px-5 py-6 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
            {trustItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-cyan-700" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">Leistungen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Die wichtigsten Reinigungsservices für Betriebe
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Keine lange Erklärung. Wenn ein Objekt sauber, planbar und ohne ständige Rückfragen laufen muss, geht es meist um diese Bereiche.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="flex min-h-[360px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-800">
                  <service.Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">{service.title}</h3>
                <p className="mt-3 flex-1 text-base leading-7 text-slate-600">{service.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.areas.map((area) => (
                    <span key={area} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {area}
                    </span>
                  ))}
                </div>
                <Link
                  href={bookingHref}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-800 hover:text-cyan-950"
                >
                  Anfrage senden
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-slate-950 p-6 text-white sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h3 className="text-2xl font-black">Sie wissen schon, worum es geht?</h3>
              <p className="mt-2 max-w-2xl text-slate-300">
                Dann reichen Objektart, Adresse, Fläche, Wunschzeit und ein paar Fotos. Wir melden uns mit einem klaren nächsten Schritt.
              </p>
            </div>
            <Link
              href={bookingHref}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300 lg:mt-0"
            >
              Jetzt Reinigung anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">Typische Situationen</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Wann FLOXANT besonders hilft
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Gerade dann, wenn Sauberkeit nicht warten kann und niemand im Betrieb noch eine weitere Baustelle braucht.
              </p>
              <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/assets/gewerbereinigung/schluessel-treppenhausreinigung-duesseldorf.webp"
                    alt="Sauberes Treppenhaus mit Schlüsselbox und Reinigungszubehör"
                    fill
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {stressMoments.map((moment) => (
                <div key={moment} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-cyan-800" aria-hidden="true" />
                  <p className="text-base font-semibold leading-7 text-slate-800">{moment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-8 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:p-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Anfrage</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">So läuft es ab</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {steps.map((step, index) => (
                  <div key={step.title} className="rounded-3xl border border-white/15 bg-white/10 p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-black">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={bookingHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Jetzt Reinigung anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp: 01577 1105087
                </Link>
                <Link
                  href={mailHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  info@floxant.de
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10">
              <div className="relative aspect-[4/5] min-h-[420px]">
                <Image
                  src="/assets/gewerbereinigung/reinigungsanfrage-checkliste-duesseldorf.webp"
                  alt="Checkliste, Schlüssel und Reinigungszubehör für gewerbliche Reinigung"
                  fill
                  sizes="(min-width: 1024px) 35vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">Entlastung</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Zusätzliche Leistungen, die Betrieben Zeit und Stress sparen
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Nicht jede Anfrage ist nur Reinigung. Oft geht es um Schlüssel, Abnahme, Kontrolle oder einen kurzfristigen Engpass.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {addOns.map((addon) => (
                <article key={addon.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-cyan-800 shadow-sm">
                    <addon.Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-black text-slate-950">{addon.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{addon.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">Schon ein Angebot?</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Wir prüfen, ob Umfang, Preis und Ablauf wirklich zusammenpassen
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Wenn Sie bereits ein Angebot einer anderen Firma haben, können Sie es FLOXANT zeigen. Wir schauen auf Fläche, Turnus, Leistungsumfang, Zugang, Zeitfenster und mögliche Zusatzkosten. Wenn wir es sauber und vielleicht günstiger übernehmen können, sagen wir das. Wenn nicht, sagen wir das auch.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "Sie bekommen keine pauschale Unterbietung, sondern eine ehrliche Prüfung.",
                "Fotos, vorhandenes Angebot und gewünschter Starttermin reichen oft für den ersten Schritt.",
                "Wir sprechen nicht schlecht über andere Anbieter. Wir prüfen, ob das Angebot zu Ihrem Objekt passt.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-cyan-800" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
              <Link
                href={betterPriceHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                Angebot prüfen lassen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
              <h2 className="text-3xl font-black tracking-normal">Häufige Fragen</h2>
              <p className="mt-4 text-slate-300">
                Die wichtigsten Punkte vor einer Anfrage. Alles Weitere klären wir direkt am Objekt oder per Rückfrage.
              </p>
              <div className="mt-8 space-y-3">
                <Link href={`tel:${company.phoneRaw}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-black text-white hover:bg-white/15">
                  <Phone className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  {company.phone}
                </Link>
                <Link href={whatsappHref} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-black text-white hover:bg-white/15">
                  <MessageCircle className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  WhatsApp senden
                </Link>
                <Link href={mailHref} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-black text-white hover:bg-white/15">
                  <Mail className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  info@floxant.de
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {faqItems.map((item) => (
                <details key={item.q} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-black text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Direkter Kontakt</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                  Senden Sie Ort, Räume und Wunschzeit. Wir melden uns mit dem nächsten Schritt.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Für Düsseldorf prüfen wir gewerbliche Reinigung nach Objekt, Zugang, Zeitfenster und verfügbarem Umfang. Wenn ein Einsatz nicht sauber machbar ist, sagen wir das ehrlich.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={bookingHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Kostenlos anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp senden
                </Link>
                <Link
                  href={callbackHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Rückruf anfordern
                </Link>
              </div>
            </div>

            <div className="mt-10 border-t border-white/15 pt-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">Passende Seiten</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-slate-100 hover:bg-white/15"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
