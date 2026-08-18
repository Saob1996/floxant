import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  HeartHandshake,
  Home,
  MessageCircle,
  Piano,
  Phone,
  Sparkles,
  Truck,
} from "lucide-react";

import { company } from "@/lib/company";
import { buildWebPageJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/regensburg";
const canonical = `${company.url}${path}`;
const contactHref = "/kontakt?location=regensburg&intent=regensburg&source=website";
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte eine Leistung in Regensburg anfragen.",
    "Ort, gewünschte Leistung, Umfang und Termin:",
  ].join("\n"),
);

type ServiceCard = {
  title: string;
  text: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

type ServiceGroup = {
  eyebrow: string;
  title: string;
  intro: string;
  services: readonly ServiceCard[];
};

const serviceGroups: readonly ServiceGroup[] = [
  {
    eyebrow: "Umzug und Transport",
    title: "Sicher vom Start zum Ziel.",
    intro:
      "Für Wohnungswechsel und empfindliche Transporte helfen klare Angaben zu Route, Zugang und Umfang.",
    services: [
      {
        title: "Umzug",
        text: "Für Wohnungswechsel mit Start, Ziel, Etage, Möbelumfang und Termin.",
        href: "/regensburg/umzug",
        cta: "Umzug ansehen",
        icon: Truck,
      },
      {
        title: "Seniorenumzug",
        text: "Für einen Wohnungswechsel mit persönlicher Abstimmung – auch durch Angehörige oder Betreuende anfragbar.",
        href: "/regensburg/seniorenumzug",
        cta: "Seniorenumzug ansehen",
        icon: HeartHandshake,
      },
      {
        title: "Klaviertransport",
        text: "Für Klavier, E-Piano oder Flügel mit Fotos von Instrument, Treppen und Zugängen.",
        href: "/klaviertransport-regensburg",
        cta: "Klaviertransport ansehen",
        icon: Piano,
      },
    ],
  },
  {
    eyebrow: "Entrümpelung und Auflösung",
    title: "Räume wieder nutzbar übergeben.",
    intro:
      "Beschreiben Sie, was entfernt werden soll und welcher Zustand am Ende gewünscht ist.",
    services: [
      {
        title: "Entrümpelung",
        text: "Für Keller, Garage oder einzelne Räume mit Angaben zu Menge, Zugang und Zielzustand.",
        href: "/regensburg/entruempelung",
        cta: "Entrümpelung ansehen",
        icon: Boxes,
      },
      {
        title: "Wohnungsauflösung",
        text: "Für Nachlass, Auszug oder Leerstand mit Freigaben und persönlichen Gegenständen.",
        href: "/regensburg/wohnungsaufloesung",
        cta: "Wohnungsauflösung ansehen",
        icon: Home,
      },
    ],
  },
  {
    eyebrow: "Weitere Leistungen",
    title: "Reinigung für Wohnung und Unternehmen.",
    intro:
      "Ergänzende Reinigungsleistungen können einzeln oder zusammen mit Ihrem Vorhaben angefragt werden.",
    services: [
      {
        title: "Reinigung",
        text: "Für Wohnung, Auszug oder Übergabe mit Fläche, Zustand und gewünschten Bereichen.",
        href: "/regensburg/reinigung",
        cta: "Reinigung ansehen",
        icon: Sparkles,
      },
      {
        title: "Büroreinigung",
        text: "Für Arbeitsplätze, Sanitärbereiche und Gemeinschaftsflächen mit passendem Zeitfenster.",
        href: "/regensburg/bueroreinigung",
        cta: "Büroreinigung ansehen",
        icon: Building2,
      },
    ],
  },
];

const requestDetails = [
  "Ort sowie Start und Ziel, wenn etwas transportiert wird",
  "Räume, Menge oder Fläche und der gewünschte Zustand",
  "Etage, Aufzug, Laufwege und Parkmöglichkeit",
  "Terminwunsch und eine erreichbare Kontaktperson",
  "Fotos, wenn Zugänge oder Umfang schwer zu beschreiben sind",
] as const;

const steps = [
  {
    title: "Leistung wählen",
    text: "Öffnen Sie die Seite, die zu Ihrem Vorhaben passt.",
  },
  {
    title: "Eckdaten senden",
    text: "Beschreiben Sie Ort, Umfang, Zugang und Termin möglichst konkret.",
  },
  {
    title: "Rückmeldung erhalten",
    text: "Wir klären offene Fragen und stimmen den weiteren Ablauf mit Ihnen ab.",
  },
] as const;

const faqItems = [
  {
    q: "Welche Leistungen kann ich in Regensburg anfragen?",
    a: "Sie können Umzug, Klaviertransport, Entrümpelung, Wohnungsauflösung, Reinigung und Büroreinigung anfragen. Auf den einzelnen Seiten finden Sie die jeweils hilfreichen Angaben.",
  },
  {
    q: "Welche Angaben sind für einen Umzug besonders wichtig?",
    a: "Nennen Sie Start- und Zieladresse, Etagen, Aufzug, Möbelumfang und Termin. Fotos von Treppen, Türen oder besonders großen Möbeln helfen bei der Einschätzung.",
  },
  {
    q: "Was ist der Unterschied zwischen Entrümpelung und Wohnungsauflösung?",
    a: "Bei einer Entrümpelung geht es oft um einzelne Räume oder klar benannte Gegenstände. Eine Wohnungsauflösung betrifft meist die gesamte Wohnung und erfordert zusätzliche Absprachen zu persönlichen Dingen und dem gewünschten Endzustand.",
  },
  {
    q: "Kann ich Umzug, Räumung und Reinigung kombinieren?",
    a: "Ja, nennen Sie alle gewünschten Arbeiten in Ihrer Anfrage. Wir prüfen anschließend, welche Leistungen und Termine sinnvoll zusammenpassen.",
  },
  {
    q: "Kann ich mein Vorhaben zuerst telefonisch besprechen?",
    a: `Ja. Sie erreichen FLOXANT unter ${company.phone}. Eine Anfrage ist noch keine verbindliche Buchung.`,
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Regensburg | Umzug, Räumung & Reinigung",
  description:
    "Umzug, Klaviertransport, Entrümpelung, Wohnungsauflösung und Reinigung in Regensburg anfragen. Eckdaten senden und Rückmeldung erhalten.",
  alternates: {
    canonical,
    languages: { "de-DE": path, "x-default": path },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: "FLOXANT Regensburg für Umzug, Räumung und Reinigung",
    description:
      "Leistung auswählen, Ort, Umfang und Termin nennen und den weiteren Ablauf abstimmen.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Regensburg",
        description:
          "Umzug, Transport, Entrümpelung, Wohnungsauflösung und Reinigung in Regensburg anfragen.",
        path,
        about: [
          "Umzug Regensburg",
          "Entrümpelung Regensburg",
          "Wohnungsauflösung Regensburg",
          "Reinigung Regensburg",
        ],
        potentialActions: [
          { name: "Leistung anfragen", target: contactHref, type: "ContactAction" },
        ],
      }),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function ServiceCards({ services }: { services: readonly ServiceCard[] }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <article
            key={service.href}
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-black">{service.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              {service.text}
            </p>
            <Link
              href={service.href}
              className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-blue-700"
            >
              {service.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default function RegensburgPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <Image
          src="/assets/service-moving.webp"
          alt="Unterstützung bei Umzug und Räumung in Regensburg"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.82)_58%,rgba(2,6,23,0.45)_100%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
            FLOXANT Regensburg
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Umzug, Räumung und Reinigung in Regensburg.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
            Wählen Sie die passende Leistung und senden Sie Ort, Umfang und
            Termin. Wir prüfen Ihre Angaben und melden uns zum weiteren Ablauf.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#leistungen"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
            >
              Leistung auswählen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Fotos per WhatsApp senden
            </a>
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {company.phone}
            </a>
          </div>
        </div>
      </section>

      <section
        id="leistungen"
        className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Leistungen in Regensburg
          </p>
          <div className="mt-4 grid gap-10 lg:grid-cols-3">
            {serviceGroups.map((group) => (
              <section key={group.eyebrow}>
                <p className="text-sm font-black text-blue-700">{group.eyebrow}</p>
                <h2 className="mt-2 text-3xl font-black tracking-normal">
                  {group.title}
                </h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                  {group.intro}
                </p>
                <ServiceCards services={group.services} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Gut vorbereitet
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Diese Angaben helfen uns weiter.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Eine kurze Beschreibung genügt für den Anfang. Fotos sind besonders
              hilfreich, wenn Treppen, Zufahrt, Menge oder Zustand schwer
              einzuschätzen sind.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {requestDetails.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            So geht es weiter
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            In drei Schritten zur Rückmeldung.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Häufige Fragen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Kurz erklärt für Regensburg.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <summary className="cursor-pointer text-base font-black">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Persönlich erreichbar
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Noch nicht sicher, welche Leistung passt?
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
              Nennen Sie Ort, Termin und Ihr Ziel. Wir ordnen Ihre Anfrage der
              passenden Leistung in Regensburg zu.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={contactHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
            >
              Anfrage starten
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
