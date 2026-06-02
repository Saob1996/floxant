import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import { DuesseldorfB2BCleaningForm } from "@/components/DuesseldorfB2BCleaningForm";
import { company, duesseldorfCompany } from "@/lib/company";
import { buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const pagePath = "/duesseldorf/gewerbereinigung";
const canonicalUrl = `${company.url}${pagePath}`;
const whatsappText =
  "Hallo FLOXANT, ich möchte eine Gewerbereinigung in Düsseldorf anfragen. Es geht um [Büro/Praxis/Kanzlei/Gewerbeobjekt/Treppenhaus]. Fläche, Turnus, Zeitfenster und Fotos kann ich senden.";
const whatsappHref = `https://wa.me/${duesseldorfCompany.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  whatsappText,
)}`;
const telHref = `tel:${duesseldorfCompany.phoneRaw}`;
const mailHref =
  "mailto:info@floxant.de?subject=Gewerbereinigung%20D%C3%BCsseldorf%20anfragen";
const offerCompareHref = "/angebot-vergleichen-duesseldorf";

const heroTrustItems = [
  "Unverbindliche Anfrage",
  "WhatsApp mit Fotos möglich",
  "Persönlicher Ansprechpartner",
  "Düsseldorf und Umgebung",
];

const contactHints = [
  "Objektart und Ort in Düsseldorf",
  "Fläche oder ungefähre Raumanzahl",
  "gewünschter Turnus und Zeitfenster",
  "Fotos von Böden, Sanitär, Küche oder Eingang",
];

const decisionReasons = [
  {
    title: "Reinigung, die in Ihren Ablauf passt",
    text: "Ein Büro, eine Praxis oder ein Objekt kann nicht nach einem starren Standardplan laufen. Wir klären deshalb Zeiten, Zugang und Prioritäten, bevor ein Angebot entsteht.",
    Icon: CalendarClock,
  },
  {
    title: "Klare Absprachen statt dauernder Rückfragen",
    text: "Sie nennen, was im Alltag wirklich wichtig ist. Daraus entsteht ein verständlicher Ablauf für Räume, Turnus, Ansprechpartner und Rückmeldung.",
    Icon: ClipboardCheck,
  },
  {
    title: "Schnelle Einschätzung ohne Verkaufsdruck",
    text: "Wenn Angaben und Fotos ausreichen, können wir den nächsten Schritt zügig einordnen. Wenn eine Besichtigung sinnvoller ist, sagen wir das offen.",
    Icon: Clock3,
  },
  {
    title: "Leistungen sauber abgegrenzt",
    text: "Wir besprechen, was zur regelmäßigen Reinigung gehört, welche Zusatzleistungen separat zu klären sind und wo besondere Anforderungen bestehen.",
    Icon: FileText,
  },
];

const services = [
  {
    title: "Büroreinigung",
    href: "/duesseldorf/bueroreinigung",
    Icon: Building2,
    text: "Saubere Arbeitsplätze, Besprechungsräume, Küchen und Sanitärbereiche machen den Alltag ruhiger. Wir stimmen die Büroreinigung auf Betriebszeiten, Raumstruktur und gewünschte Frequenz ab.",
    points: ["Arbeitsplätze", "Meetingräume", "Küche", "Sanitär"],
  },
  {
    title: "Praxisreinigung",
    href: "/duesseldorf/praxisreinigung",
    Icon: Stethoscope,
    text: "In Praxisräumen fällt Unordnung sofort auf. Wir klären Empfang, Wartebereich, Behandlungsräume und Zeitfenster so, dass der Praxisbetrieb nicht gestört wird.",
    points: ["Empfang", "Wartebereich", "Behandlungsräume", "nach Absprache"],
  },
  {
    title: "Gewerbereinigung",
    href: pagePath,
    Icon: ShieldCheck,
    text: "Für Gewerbeflächen, Studios, Kanzleien, Ladenflächen oder gemischte Objekte prüfen wir, welche Bereiche regelmäßig gereinigt werden sollen und was zusätzlich geplant werden muss.",
    points: ["Gewerbeobjekte", "Kanzleien", "Studios", "Nebenflächen"],
  },
  {
    title: "Treppenhausreinigung",
    href: "/duesseldorf/treppenhausreinigung",
    Icon: Users,
    text: "Der Eingangsbereich entscheidet oft über den ersten Eindruck im Haus. Wir stimmen Turnus, Zugang, Etagen, Geländer und typische Problemstellen mit Verwaltung oder Eigentümer ab.",
    points: ["Eingang", "Etagen", "Geländer", "Hausverwaltung"],
  },
  {
    title: "Unterhaltsreinigung",
    href: "/duesseldorf/unterhaltsreinigung",
    Icon: CheckCircle2,
    text: "Wenn Reinigung regelmäßig laufen soll, braucht es mehr als eine einmalige Absprache. Wir planen Turnus, Raumliste und Prioritäten nachvollziehbar für den laufenden Betrieb.",
    points: ["regelmäßig", "Raumliste", "Zeitfenster", "Rückmeldung"],
  },
];

const trustPillars = [
  {
    title: "Persönliche Betreuung",
    text: "Sie haben einen klaren Kontaktweg für Rückfragen, Anpassungen oder Hinweise aus dem Objekt.",
  },
  {
    title: "Flexible Einsatzzeiten",
    text: "Viele Reinigungen lassen sich vor Öffnung, nach Feierabend oder in ruhigeren Zeitfenstern abstimmen.",
  },
  {
    title: "Transparente Kommunikation",
    text: "Leistungsumfang, offene Punkte und Grenzen werden verständlich besprochen, bevor Sie entscheiden.",
  },
  {
    title: "Individuelle Lösung",
    text: "Büro, Praxis, Treppenhaus und Gewerbeobjekt brauchen unterschiedliche Abläufe. Genau das wird berücksichtigt.",
  },
  {
    title: "Regionale Erreichbarkeit",
    text: "Anfragen aus Düsseldorf und Umgebung werden mit Blick auf Ort, Zugang, Timing und verfügbare Kapazität geprüft.",
  },
];

const processSteps = [
  {
    title: "Sie senden Ihre Anfrage",
    text: "Kurzformular, WhatsApp oder Telefon reichen für den Start. Hilfreich sind Ort, Fläche, gewünschter Turnus und Fotos.",
  },
  {
    title: "Wir klären die wichtigsten Punkte",
    text: "Objektart, Zugang, Zeitfenster, Raumliste und besondere Anforderungen werden verständlich eingeordnet.",
  },
  {
    title: "Sie erhalten eine Rückmeldung",
    text: "Je nach Objekt folgt eine konkrete Rückfrage, ein Besichtigungsvorschlag oder ein unverbindliches Angebot.",
  },
  {
    title: "Sie entscheiden in Ruhe",
    text: "Die Anfrage bleibt unverbindlich. Sie wählen erst dann, wenn Umfang und nächster Schritt für Sie klar sind.",
  },
];

const localAreas = [
  "Stadtmitte",
  "Pempelfort",
  "Bilk",
  "Flingern",
  "Derendorf",
  "Oberkassel",
  "MedienHafen",
  "Benrath",
  "Kaiserswerth",
  "Neuss",
  "Ratingen",
  "Meerbusch",
];

const faqItems = [
  {
    q: "Ist eine einmalige Gewerbereinigung möglich?",
    a: "Ja, nach Absprache. FLOXANT prüft einmalige Reinigungen ebenso wie regelmäßige Unterhaltsreinigung. Entscheidend sind Objekt, Umfang, Zugang und gewünschter Termin.",
  },
  {
    q: "Wie schnell bekomme ich eine Rückmeldung?",
    a: "Wenn Objektart, Ort, Fläche und gewünschter Turnus klar sind, melden wir uns in der Regel zeitnah mit Rückfragen oder dem nächsten Schritt. WhatsApp mit Fotos ist oft der schnellste Weg.",
  },
  {
    q: "Kann die Reinigung außerhalb der Öffnungszeiten stattfinden?",
    a: "In vielen Fällen ja. Zeitfenster vor Arbeitsbeginn, nach Feierabend oder am Wochenende werden nach Objekt, Zugang und Verfügbarkeit abgestimmt.",
  },
  {
    q: "Braucht FLOXANT immer eine Besichtigung?",
    a: "Nicht immer. Für eine erste Einschätzung reichen häufig Angaben und Fotos. Bei größeren oder sensiblen Objekten kann eine Besichtigung sinnvoll sein.",
  },
  {
    q: "Können wir ein bestehendes Reinigungsangebot vergleichen lassen?",
    a: "Ja. Wir prüfen kostenlos und unverbindlich, ob FLOXANT eine wirtschaftlich interessante Alternative anbieten kann. Die Einschätzung hängt immer von Objekt, Umfang, Turnus und Rahmenbedingungen ab.",
  },
  {
    q: "Übernimmt FLOXANT medizinische Spezialdesinfektion?",
    a: "Allgemeine Praxisflächen können nach Absprache angefragt werden. Medizinische Spezialdesinfektion, OP- oder Laboranforderungen werden nur gesondert geprüft.",
  },
];

const relatedLinks = [
  { label: "Büroreinigung Düsseldorf", href: "/duesseldorf/bueroreinigung" },
  { label: "Praxisreinigung Düsseldorf", href: "/duesseldorf/praxisreinigung" },
  { label: "Gebäudereinigung Düsseldorf", href: "/duesseldorf/gebaeudereinigung" },
  { label: "Treppenhausreinigung Düsseldorf", href: "/duesseldorf/treppenhausreinigung" },
  { label: "Unterhaltsreinigung Düsseldorf", href: "/duesseldorf/unterhaltsreinigung" },
  { label: "Angebot vergleichen lassen", href: offerCompareHref },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Gewerbereinigung Düsseldorf | Büro, Praxis & Objekt | FLOXANT",
  description:
    "Gewerbereinigung in Düsseldorf für Büros, Praxen, Kanzleien, Treppenhäuser und Gewerbeobjekte. Unverbindlich anfragen, per WhatsApp senden oder telefonisch klären.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Gewerbereinigung Düsseldorf | FLOXANT",
    description:
      "Professionelle Reinigung für Unternehmen in Düsseldorf: Büro, Praxis, Treppenhaus, Unterhaltsreinigung und Gewerbeobjekte klar abstimmen.",
    url: pagePath,
    siteName: company.name,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp",
        width: 1200,
        height: 630,
        alt: "Gewerbereinigung in Düsseldorf für Büro, Praxis und Objekt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gewerbereinigung Düsseldorf | FLOXANT",
    description:
      "Unverbindlich Gewerbereinigung in Düsseldorf anfragen: Büroreinigung, Praxisreinigung, Treppenhaus- und Unterhaltsreinigung.",
    images: ["/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GewerbereinigungLandingPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    name: "Gewerbereinigung Düsseldorf",
    description:
      "Gewerbereinigung in Düsseldorf für Büros, Praxen, Kanzleien, Treppenhäuser, Unterhaltsreinigung und Gewerbeobjekte mit Anfrageformular, WhatsApp und Telefonkontakt.",
    path: pagePath,
    about: [
      "Gewerbereinigung Düsseldorf",
      "Büroreinigung Düsseldorf",
      "Praxisreinigung Düsseldorf",
      "Reinigungsfirma Düsseldorf",
      "Gebäudereinigung Düsseldorf",
      "Unterhaltsreinigung",
    ],
    potentialActions: [
      { name: "Unverbindliches Angebot erhalten", target: `${pagePath}#kontakt`, type: "ContactAction" },
      { name: "Per WhatsApp anfragen", target: whatsappHref, type: "ContactAction" },
      { name: "Angebot vergleichen lassen", target: offerCompareHref, type: "ContactAction" },
    ],
  });

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${company.url}/duesseldorf/reinigung#localbusiness`,
    name: duesseldorfCompany.name,
    url: canonicalUrl,
    telephone: duesseldorfCompany.phoneRaw,
    email: duesseldorfCompany.email,
    image: `${company.url}/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: duesseldorfCompany.streetAddress,
      postalCode: duesseldorfCompany.postalCode,
      addressLocality: duesseldorfCompany.city,
      addressCountry: duesseldorfCompany.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Düsseldorf" },
      { "@type": "City", name: "Neuss" },
      { "@type": "City", name: "Ratingen" },
      { "@type": "City", name: "Meerbusch" },
      { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: duesseldorfCompany.phoneRaw,
      contactType: "customer service",
      areaServed: "DE-NW",
      availableLanguage: ["de"],
    },
    sameAs: company.sameAs,
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: "Gewerbereinigung Düsseldorf",
    serviceType:
      "Gewerbereinigung, Büroreinigung, Praxisreinigung, Treppenhausreinigung und Unterhaltsreinigung",
    description:
      "Gewerbliche Reinigung für Büros, Praxen, Kanzleien, Treppenhäuser und Gewerbeobjekte in Düsseldorf und Umgebung nach individueller Prüfung.",
    url: canonicalUrl,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${company.url}/duesseldorf/reinigung#localbusiness`,
      name: duesseldorfCompany.name,
      telephone: duesseldorfCompany.phoneRaw,
      address: localBusinessJsonLd.address,
    },
    areaServed: localBusinessJsonLd.areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Reinigungsleistungen für Unternehmen",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${company.url}${service.href}`,
        },
      })),
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [webPageJsonLd, localBusinessJsonLd, serviceJsonLd, buildFaqJsonLd(faqItems)],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-white text-slate-950" data-event="view_gewerbereinigung_duesseldorf_page">
        <section className="relative isolate overflow-hidden bg-slate-950 text-white">
          <Image
            src="/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp"
            alt="Gepflegter gewerblicher Raum für Gewerbereinigung in Düsseldorf"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover object-[62%_50%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/82 to-slate-950/30" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-slate-950 to-transparent" />

          <div className="mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 lg:px-10 lg:pb-6 lg:pt-24">
            <div className="max-w-5xl">
              <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-emerald-100 backdrop-blur">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                FLOXANT Reinigung Düsseldorf
              </p>
              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.06] tracking-normal sm:text-5xl lg:text-[3.45rem]">
                Zuverlässige Gewerbereinigung in Düsseldorf – sauber geplant, professionell durchgeführt.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
                Ob Büro, Praxis oder Gewerbeobjekt: Wir unterstützen Unternehmen in Düsseldorf mit
                Reinigungslösungen, die zu Ihren Abläufen passen.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#kontakt"
                  data-event="click_gewerbereinigung_duesseldorf_form_hero"
                  data-contact-channel="form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/25 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  Unverbindliches Angebot erhalten
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappHref}
                  data-event="click_gewerbereinigung_duesseldorf_whatsapp_hero"
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200/40 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Per WhatsApp anfragen
                </a>
                <a
                  href={telHref}
                  data-event="click_gewerbereinigung_duesseldorf_phone_hero"
                  data-contact-channel="phone"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {duesseldorfCompany.phoneRaw.replace("+49", "0").replace(/(\d{5})(\d+)/, "$1 $2")}
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {heroTrustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-3 text-sm font-bold text-slate-100 backdrop-blur">
                    <CheckCircle2 className="h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-14">
            <div className="lg:pt-4">
              <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Anfrage starten</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
                Senden Sie uns die wichtigsten Eckdaten. Wir melden uns mit dem nächsten Schritt.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Sie müssen kein Leistungsverzeichnis vorbereiten. Für den Start reicht eine kurze Beschreibung:
                Was soll gereinigt werden, wo befindet sich das Objekt und welches Zeitfenster passt?
              </p>

              <div className="mt-7 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">Hilfreich für eine schnelle Einschätzung</h3>
                <div className="mt-4 grid gap-3">
                  {contactHints.map((item) => (
                    <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-bold leading-6 text-emerald-950">
                  WhatsApp ist oft der einfachste Weg: Senden Sie uns Fotos oder kurze Informationen zum Objekt.
                  Wir prüfen die Anfrage und melden uns mit Rückfragen oder einem passenden nächsten Schritt.
                </p>
                <a
                  href={whatsappHref}
                  data-event="click_gewerbereinigung_duesseldorf_whatsapp_contact_hint"
                  data-contact-channel="whatsapp"
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-black text-white transition hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Fotos per WhatsApp senden
                </a>
              </div>
            </div>

            <DuesseldorfB2BCleaningForm context="gewerbereinigung" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Warum FLOXANT kontaktieren?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Weil Reinigung im Betrieb verlässlich funktionieren muss.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Gute Gewerbereinigung fällt nicht durch große Worte auf, sondern dadurch, dass Räume nutzbar,
              gepflegt und rechtzeitig vorbereitet sind.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {decisionReasons.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <item.Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="leistungen" className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Leistungen</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                  Reinigungsleistungen aus Kundensicht geplant.
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-600">
                Jede Fläche hat andere Anforderungen. Deshalb beginnen wir nicht mit einer Pauschale, sondern mit
                der Frage, was der Betrieb täglich braucht und welche Bereiche sichtbar sauber bleiben müssen.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="flex min-h-[330px] flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white">
                    <service.Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-950">{service.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-slate-600">{service.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <span key={point} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {point}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={service.href === pagePath ? "#kontakt" : service.href}
                    data-event="click_gewerbereinigung_duesseldorf_service_card"
                    data-label={service.title}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-emerald-900"
                  >
                    Reinigungslösung besprechen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/gewerbereinigung/reinigungsanfrage-checkliste-duesseldorf.webp"
                  alt="Checkliste für eine Reinigungsanfrage in Düsseldorf"
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Vertrauen im Alltag</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Was Unternehmen an einer guten Reinigungsfirma in Düsseldorf brauchen.
              </h2>
              <div className="mt-8 grid gap-4">
                {trustPillars.map((item) => (
                  <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-normal text-emerald-300">So funktioniert es</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Vom ersten Kontakt bis zum sauberen Ablauf.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <article key={step.title} className="rounded-lg border border-white/15 bg-white/8 p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400 text-sm font-black text-slate-950">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#kontakt"
                data-event="click_gewerbereinigung_duesseldorf_form_process"
                data-contact-channel="form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="click_gewerbereinigung_duesseldorf_whatsapp_process"
                data-contact-channel="whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Per WhatsApp anfragen
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Lokal erreichbar</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Für Düsseldorf und die direkte Umgebung.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                FLOXANT prüft Anfragen aus Düsseldorf mit Blick auf Objektart, Stadtteil, gewünschte Zeiten und
                realistische Planung. Gerade bei regelmäßiger Reinigung ist diese Abstimmung wichtiger als ein
                schneller Pauschalsatz.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {localAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2 rounded-lg bg-white px-3 py-3 text-sm font-bold text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    {area}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm font-semibold leading-6 text-slate-600">
                Adresse Düsseldorf: {duesseldorfCompany.streetAddress}, {duesseldorfCompany.postalCode}{" "}
                {duesseldorfCompany.city}. Die genaue Einsatzmöglichkeit wird nach Objekt, Umfang und Termin geprüft.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Schon ein Angebot?</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Lassen Sie Ihr bestehendes Reinigungsangebot unverbindlich prüfen.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Wenn Sie bereits ein Angebot einer anderen Reinigungsfirma haben, prüfen wir Leistungsumfang,
                Turnus, Zeitfenster und Rahmenbedingungen. Ziel ist eine ehrliche Einschätzung, ob FLOXANT eine
                wirtschaftlich interessante Alternative anbieten kann.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                {[
                  "Sie erhalten eine sachliche Einschätzung statt einer pauschalen Ersparniszusage.",
                  "Jede Anfrage wird nach Objekt, Umfang und Zugang bewertet.",
                  "Wir sprechen nicht schlecht über andere Anbieter, sondern prüfen die Alternative sachlich.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-bold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href={offerCompareHref}
                data-event="click_gewerbereinigung_duesseldorf_offer_compare"
                data-contact-channel="offer_check"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                Angebot vergleichen lassen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Kurz erklärt</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Gewerbereinigung in Düsseldorf ohne unnötige Umwege.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Wer eine Reinigungsfirma in Düsseldorf sucht, braucht meist keine lange Grundsatzberatung, sondern
                eine verlässliche Einschätzung für das eigene Objekt. FLOXANT unterstützt bei Büroreinigung,
                Praxisreinigung, Gebäudereinigung und Unterhaltsreinigung, wenn Fläche, Turnus und Zeitfenster
                sauber geklärt werden können.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-event="click_gewerbereinigung_duesseldorf_related_link"
                    data-label={link.label}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-3xl font-black tracking-normal text-slate-950">Häufige Fragen</h2>
              <div className="mt-6 grid gap-3">
                {faqItems.map((item) => (
                  <details key={item.q} className="group rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <summary className="cursor-pointer list-none text-lg font-black text-slate-950">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-base leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-emerald-300">Direkter Kontakt</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
                  Reinigungslösung besprechen und unverbindlich anfragen.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Senden Sie uns Ort, Objektart, Fläche und gewünschtes Zeitfenster. Wir prüfen, welcher nächste
                  Schritt sinnvoll ist und melden uns verständlich zurück.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="#kontakt"
                  data-event="click_gewerbereinigung_duesseldorf_form_final"
                  data-contact-channel="form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  Kostenlos anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappHref}
                  data-event="click_gewerbereinigung_duesseldorf_whatsapp_final"
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Per WhatsApp anfragen
                </a>
                <a
                  href={mailHref}
                  data-event="click_gewerbereinigung_duesseldorf_email_final"
                  data-contact-channel="email"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  E-Mail senden
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-3 border-t border-white/15 pt-8 sm:grid-cols-3">
              {[
                { title: "Kostenlose Anfrage", Icon: Handshake },
                { title: "WhatsApp oder Formular", Icon: MessageCircle },
                { title: "Antwort mit nächstem Schritt", Icon: ClipboardCheck },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-sm font-bold text-slate-100">
                  <item.Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
