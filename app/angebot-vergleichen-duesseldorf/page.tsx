import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Timer,
  UploadCloud,
} from "lucide-react";

import { OfferComparisonAdsForm } from "@/components/OfferComparisonAdsForm";
import { company, duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/angebot-vergleichen-duesseldorf";
const canonical = `${company.url}${path}`;
const title = "Angebot vergleichen lassen Düsseldorf | FLOXANT";
const description =
  "Bestehendes Reinigungsangebot aus Düsseldorf kostenlos und unverbindlich prüfen lassen. FLOXANT bewertet, ob eine wirtschaftlich interessante Alternative möglich ist.";
const heroImage = "/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp";
const heroImageUrl = `${company.url}${heroImage}`;

const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Reinigung Düsseldorf,",
    "ich habe bereits ein Reinigungsangebot erhalten und möchte prüfen lassen, ob eine wirtschaftlich interessante Alternative möglich ist.",
    "Angebot, Objektart, Ort und Eckdaten kann ich senden.",
  ].join("\n"),
);

const trustItems = [
  "Kostenlose Prüfung",
  "Unverbindliche Anfrage",
  "Antwort in der Regel innerhalb kurzer Zeit",
  "Persönlicher Ansprechpartner",
  "Düsseldorf und Umgebung",
] as const;

const comparisonReasons = [
  {
    title: "Unterschiede bei Leistungsumfang",
    text: "Nicht jedes Angebot beschreibt gleich genau, welche Flächen, Intervalle und Zusatzleistungen enthalten sind.",
  },
  {
    title: "Unterschiedliche Preisstrukturen",
    text: "Pauschalen, Stundenmodelle und Turnuspreise lassen sich erst fair einordnen, wenn die Rahmenbedingungen klar sind.",
  },
  {
    title: "Flexible Reinigungskonzepte",
    text: "Manchmal ist nicht der niedrigste Einzelpreis entscheidend, sondern ein besser passender Ablauf für Ihr Objekt.",
  },
  {
    title: "Individuelle Betreuung",
    text: "Objektart, Zugang, Zeitfenster und Ansprechpartner beeinflussen, ob ein Reinigungskonzept zuverlässig funktioniert.",
  },
  {
    title: "Transparenz bei Zusatzleistungen",
    text: "Glas, Sonderflächen, Treppenhaus, Müllbereiche oder Grundreinigung sollten nicht erst nachträglich unklar werden.",
  },
] as const;

const processSteps = [
  {
    title: "Sie senden uns Ihr Angebot oder Ihre Angaben.",
    text: "PDF, Bild oder die wichtigsten Eckdaten reichen für die erste Einordnung.",
  },
  {
    title: "Wir prüfen Umfang und Rahmenbedingungen.",
    text: "Dabei geht es um Leistung, Turnus, Zeitfenster, Objektart, Zugang und offene Punkte.",
  },
  {
    title: "Wir bewerten eine mögliche Alternative.",
    text: "Wenn es realistisch passt, erhalten Sie eine Rückmeldung zu einer passenden FLOXANT-Lösung.",
  },
  {
    title: "Sie entscheiden völlig unverbindlich.",
    text: "Die Prüfung verpflichtet zu nichts und ersetzt keine Zusage für Preis oder Verfügbarkeit.",
  },
] as const;

const trustCards = [
  {
    title: "Persönliche Betreuung",
    text: "Ihre Anfrage wird nicht anonym weitergereicht, sondern konkret für Objekt und Situation eingeordnet.",
  },
  {
    title: "Transparente Kommunikation",
    text: "Wenn Angaben fehlen oder eine Alternative nicht sinnvoll wirkt, wird das klar benannt.",
  },
  {
    title: "Individuelle Lösungen",
    text: "Büro, Praxis, Treppenhaus und Gewerbeflächen werden nach Turnus, Zugang und Bedarf betrachtet.",
  },
  {
    title: "Regionale Erreichbarkeit",
    text: "FLOXANT prüft Anfragen aus Düsseldorf, Neuss, Ratingen, Meerbusch, Mettmann und Umgebung.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title,
    description,
    images: [
      {
        url: heroImageUrl,
        width: 1200,
        height: 630,
        alt: "Reinigungsangebot in Düsseldorf vergleichen lassen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [heroImageUrl],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "de-DE",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${company.url}/#website`,
          name: "FLOXANT",
          url: company.url,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: heroImageUrl,
        },
        potentialAction: [
          {
            "@type": "ContactAction",
            name: "Reinigungsangebot kostenlos prüfen lassen",
            target: `${canonical}#angebot-pruefen`,
          },
          {
            "@type": "ContactAction",
            name: "Angebot per WhatsApp senden",
            target: whatsappHref,
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${canonical}#localbusiness`,
        name: duesseldorfCompany.name,
        url: canonical,
        image: heroImageUrl,
        email: duesseldorfCompany.email,
        telephone: duesseldorfCompany.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: duesseldorfCompany.streetAddress,
          postalCode: duesseldorfCompany.postalCode,
          addressLocality: duesseldorfCompany.city,
          addressCountry: duesseldorfCompany.countryCode,
        },
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg"].map((name) => ({
          "@type": "City",
          name,
        })),
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Reinigungsangebot vergleichen lassen",
            serviceType: "Angebotsprüfung für Reinigungsleistungen",
            areaServed: "Düsseldorf und Umgebung",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "FLOXANT",
            item: company.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Angebot vergleichen lassen Düsseldorf",
            item: canonical,
          },
        ],
      },
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

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold text-cyan-700">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-slate-600">{text}</p> : null}
    </div>
  );
}

export default function AngebotVergleichenDuesseldorfPage() {
  return (
    <main className="bg-white text-slate-950">
      <JsonLd />

      <section className="relative min-h-[76svh] overflow-hidden border-b border-slate-200 bg-slate-100">
        <Image
          src={heroImage}
          alt="Professionelle Reinigung in Düsseldorf"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.9)_42%,rgba(255,255,255,0.58)_70%,rgba(255,255,255,0.34)_100%)]" />
        <div className="relative mx-auto grid min-h-[76svh] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <MapPin className="h-4 w-4 text-cyan-700" />
              Düsseldorf und Umgebung
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-6xl">
              Bereits ein Angebot erhalten? Wir prüfen es kostenlos und unverbindlich.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Senden Sie uns Ihr bestehendes Angebot oder die wichtigsten Eckdaten. Wir prüfen,
              ob wir Ihnen eine wirtschaftlich interessante Alternative anbieten können.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#angebot-pruefen"
                data-event="ads_offer_comparison_primary_cta"
                data-source="google_ads_offer_comparison_landingpage"
                data-channel="form"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-slate-950 px-7 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.2)] transition hover:bg-blue-800"
              >
                Angebot prüfen lassen
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={whatsappHref}
                data-event="ads_offer_comparison_whatsapp_click"
                data-source="google_ads_offer_comparison_landingpage"
                data-channel="whatsapp"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white/88 px-7 text-base font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                <MessageCircle className="h-5 w-5" />
                Per WhatsApp senden
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Einordnung vor der Entscheidung"
            title="Warum viele Unternehmen Angebote vergleichen"
            text="Ein Reinigungsangebot wirkt erst dann belastbar, wenn Leistungsumfang, Turnus, Zeitfenster und Zusatzleistungen verständlich sind. Ein Vergleich kann helfen, offene Punkte vor der Entscheidung zu klären."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {comparisonReasons.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm">
                  <FileSearch className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-normal text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Angebot hochladen"
              title="Bestehendes Angebot einfach hochladen"
              text="Laden Sie Ihr vorhandenes Angebot als PDF oder Bild hoch. Alternativ können Sie die wichtigsten Informationen direkt im Formular angeben."
            />
            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                <UploadCloud className="h-5 w-5 text-blue-700" />
                Unterstützte Dateiformate: PDF, JPG, PNG
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                Keine Preisgarantie, keine automatische Zusage
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                <Timer className="h-5 w-5 text-cyan-700" />
                Kurze Rückmeldung, wenn Angaben fehlen
              </div>
            </div>
          </div>
          <OfferComparisonAdsForm whatsappHref={whatsappHref} />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Ablauf"
            title="So läuft die Prüfung ab"
            text="Der Ablauf bleibt bewusst einfach. Sie müssen keine langen Unterlagen vorbereiten, wenn das Angebot oder die Eckdaten bereits vorliegen."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-normal text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-200">Vertrauen ohne leere Versprechen</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal md:text-4xl">
              Seriöse Prüfung statt pauschaler Unterbietung
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              FLOXANT prüft, ob eine passende Alternative für Ihr Reinigungsobjekt realistisch ist.
              Wenn der vorhandene Preis nachvollziehbar ist oder wichtige Angaben fehlen, wird auch das klar kommuniziert.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustCards.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <ClipboardCheck className="h-5 w-5 text-cyan-200" />
                <h3 className="mt-4 text-lg font-semibold tracking-normal">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Düsseldorf"
              title="Reinigungsangebote in Düsseldorf vergleichen"
              text="Wenn Sie bereits ein Angebot für Büroreinigung, Praxisreinigung, Treppenhausreinigung oder Unterhaltsreinigung erhalten haben, kann eine zweite Einordnung sinnvoll sein. FLOXANT prüft dabei nicht nur den Preis, sondern auch Leistungsumfang, Turnus, Zugang, Zeitfenster und mögliche Zusatzleistungen. So entsteht eine realistische Grundlage für Ihre Entscheidung."
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-950">Typische Anfragen</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-700">
              {["Büroreinigung", "Praxisreinigung", "Gewerbereinigung", "Treppenhausreinigung", "Unterhaltsreinigung", "Objektbetreuung"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-lg border border-slate-200 bg-white p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-700">Nächster Schritt</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
              Angebot senden, kurz prüfen lassen, danach in Ruhe entscheiden.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Die Prüfung ist kostenlos und unverbindlich. Sie erhalten keine automatische Zusage,
              sondern eine individuelle Rückmeldung zur möglichen Alternative.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="#angebot-pruefen"
              data-event="ads_offer_comparison_bottom_cta"
              data-source="google_ads_offer_comparison_landingpage"
              data-channel="form"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Angebot prüfen lassen
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappHref}
              data-event="ads_offer_comparison_whatsapp_click"
              data-source="google_ads_offer_comparison_landingpage"
              data-channel="whatsapp"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-6 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
            >
              <MessageCircle className="h-4 w-4" />
              Per WhatsApp senden
            </a>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl flex-wrap gap-4 text-sm text-slate-600">
          <a href={`tel:${duesseldorfCompany.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-blue-700">
            <Phone className="h-4 w-4" />
            {duesseldorfCompany.phone}
          </a>
          <a href={`mailto:${duesseldorfCompany.email}`} className="inline-flex items-center gap-2 hover:text-blue-700">
            <Mail className="h-4 w-4" />
            {duesseldorfCompany.email}
          </a>
          <Link href="/duesseldorf/reinigung" className="inline-flex items-center gap-2 hover:text-blue-700">
            <Sparkles className="h-4 w-4" />
            FLOXANT Reinigung Düsseldorf
          </Link>
        </div>
      </section>
    </main>
  );
}
