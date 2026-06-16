import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, ClipboardCheck, KeyRound, MessageCircle, Sparkles } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/schluesseluebergabe";

const faqItems = [
  {
    q: "Ist die Schluesseluebergabe eine rechtliche Abnahmegarantie?",
    a: "Nein. FLOXANT kann Schluessel, Fotos und organisatorische Uebergabepunkte nach Absprache unterstuetzen, ersetzt aber keine rechtliche Entscheidung von Vermieter, Verwaltung oder Kaeufer.",
  },
  {
    q: "Wann ist der Service sinnvoll?",
    a: "Er ist sinnvoll, wenn Umzug, Reinigung, Auszug oder Uebergabe zeitlich eng liegen und Kunden nicht alles selbst vor Ort koordinieren koennen.",
  },
  {
    q: "Welche Angaben braucht FLOXANT?",
    a: "Wichtig sind Adresse, Termin, Kontaktperson, Schluesselumfang, Uebergabeziel, Fotos und ob Reinigung oder Restmengen ebenfalls mitgedacht werden sollen.",
  },
];

const relatedServices = [
  {
    href: "/umzug-regensburg",
    title: "Umzug Regensburg mit Schluesseluebergabe",
    text: "Wenn Transport, Reinigung, Fotos und Uebergabetermin in einem Ablauf gedacht werden sollen.",
  },
  {
    href: "/reinigung-regensburg",
    title: "Reinigung vor Wohnungsuebergabe",
    text: "Wenn Endreinigung, Zustand, Schluessel und sichtbare Uebergabepunkte zusammenpassen muessen.",
  },
  {
    href: "/private-client-service",
    title: "Diskreter Schlüssel-Service",
    text: "Wenn Rueckruf, Abstimmung und sensible Objektuebergabe ruhiger gefuehrt werden sollen.",
  },
  {
    href: "/diskreter-umzug-trennung-scheidung",
    title: "Diskreter Auszug mit Schluesseluebergabe",
    text: "Wenn ein sensibler Auszug, sichere Kontaktmethode, Schluesselstatus und Uebergabe ruhig abgestimmt werden sollen.",
  },
  {
    href: "/uebergabeakte",
    title: "FLOXANT Uebergabeakte",
    text: "Wenn Schluesselstatus, Fotos, erledigte Leistungen und Hinweise als Dossier nach Absprache sichtbar werden sollen.",
  },
  {
    href: "/buchung",
    title: "Anfrage mit Fotos starten",
    text: "Wenn Termin, Ort, Zugang und Uebergabeziel direkt an FLOXANT gesendet werden sollen.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "schluesseluebergabe",
    title: "Schluesseluebergabe Service mit Uebergabeprotokoll | FLOXANT",
    description:
      "Schluesseluebergabe nach Umzug, Reinigung oder Auszug: FLOXANT klaert Termin, Fotos, Uebergabepunkte und Protokoll als organisatorische Unterstuetzung.",
    keywords: [
      "Schluesseluebergabe Service",
      "Uebergabeprotokoll Wohnung",
      "Wohnungsuebergabe vorbereiten",
      "Umzug mit Schluesseluebergabe",
      "Endreinigung Uebergabe",
    ],
  });
}

export default async function SchluesseluebergabePage() {
  const dict = await getDictionary("de");
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, ich moechte eine Schluesseluebergabe mit Uebergabeprotokoll anfragen. Ich kann Termin, Ort, Fotos und Uebergabeziel senden.",
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Schluesseluebergabe", item: pagePath },
      ]),
      buildWebPageJsonLd({
        name: "Schluesseluebergabe Service",
        description:
          "Oeffentliche Signature-Angebot fuer Schluesseluebergabe, Uebergabeprotokoll, Fotos und organisatorische Uebergabeunterstuetzung.",
        path: pagePath,
        about: ["Schluesseluebergabe", "Uebergabeprotokoll", "Wohnungsuebergabe", "Umzug", "Reinigung"],
      }),
      buildServiceJsonLd({
        name: "Schluesseluebergabe mit Uebergabeprotokoll",
        description:
          "Organisatorische Unterstuetzung fuer Schluessel, Fotos und Uebergabepunkte nach Umzug, Reinigung oder Auszug.",
        path: pagePath,
        serviceType: "Schluesseluebergabe Service",
        areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs lang="de" items={[{ label: "Services", href: "/#services" }, { label: "Schluesseluebergabe" }]} />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 section-glow">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <span className="label-premium mb-6 block text-blue-700">
            Signature Service fuer Auszug und Uebergabe
          </span>
          <h1 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
            Schluesseluebergabe mit Uebergabeprotokoll
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Wenn Auszug, Reinigung und Rueckgabe eng zusammenliegen, hilft ein klarer Ablauf fuer
            Schluessel, Fotos, Uebergabepunkte und Termin. FLOXANT unterstuetzt organisatorisch
            nach Absprache, ohne falsche Abnahmeversprechen.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#booking"
              className="btn-premium inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition-all hover:brightness-110 hover:shadow-blue-500/40"
              data-event="hero_cta_click"
              data-source="key_handover_hero"
            >
              Uebergabe anfragen
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition-all hover:bg-blue-50 hover:text-slate-900"
              data-event="whatsapp_click"
              data-source="key_handover_hero"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              WhatsApp mit Termin
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            {
              icon: KeyRound,
              title: "Was ist das?",
              text: "Ein Zusatzservice fuer Schluessel, Termin, Fotos und Uebergabepunkte nach Umzug, Reinigung oder Auszug.",
            },
            {
              icon: Camera,
              title: "Warum Fotos helfen",
              text: "Fotos koennen Zustand, Restpunkte und sichtbare Uebergabethemen dokumentieren und Rueckfragen reduzieren.",
            },
            {
              icon: ClipboardCheck,
              title: "Klare Grenze",
              text: "FLOXANT unterstuetzt organisatorisch. Eine rechtliche Abnahme oder Vermieterentscheidung wird nicht garantiert.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="card-premium rounded-2xl p-7">
                <Icon className="mb-5 h-7 w-7 text-blue-700" />
                <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-16 section-glow">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-semibold text-slate-500">
            Passende oeffentliche Kontaktwege
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {relatedServices.map((service) => (
              <Link key={service.href} href={service.href} className="card-premium group rounded-xl p-5 transition-all">
                <h3 className="flex items-center gap-2 font-semibold text-slate-950 transition-colors group-hover:text-blue-700">
                  {service.title}
                  <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{service.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 pt-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-950">
            Haeufige Fragen zur Schluesseluebergabe
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {faqItems.map((item) => (
              <article key={item.q} className="card-premium rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-950">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="px-6 py-24 section-glow">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
              <Sparkles className="h-4 w-4" />
              Anfrage
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-950">
              Uebergabe, Fotos und Termin kurz schildern
            </h2>
            <p className="mx-auto max-w-xl text-lg text-slate-600">
              Je klarer Ort, Termin, Kontaktperson und Uebergabeziel sind, desto schneller kann
              FLOXANT den passenden Ablauf pruefen.
            </p>
          </div>
          <div className="glass-elevated relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[2rem] p-1 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="relative z-10 p-4 md:p-8">
              <SmartBookingWizard dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
