import { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Calendar, Clock, PhoneCall, Zap } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { company } from "@/lib/company";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "express-anfrage",
    title: "Express-Anfrage Bayern | Kurzfristig Umzug & Reinigung",
    description:
      "Kurzfristiger Umzug, Express-Reinigung oder Räumung in Regensburg und Bayern. FLOXANT prüft Ihre Anfrage schnell auf realistische Machbarkeit.",
  });
}

export default async function ExpressPage() {
  const dict = await getDictionary("de");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Express Anfrage" },
  ];

  const faqItems = [
    {
      q: "Wie schnell reagiert FLOXANT auf eine Express-Anfrage?",
      a: "Bei Express-Anfragen priorisieren wir die Kapazitätsprüfung. In der Regel erhalten Sie innerhalb kurzer Zeit eine Rückmeldung zur Machbarkeit in Regensburg oder Bayern.",
    },
    {
      q: "Für welche Situationen ist der Express-Service gedacht?",
      a: "Für kurzfristige Wohnungsübergaben, Ausfall von anderen Dienstleistern oder dringende Räumungen nach einem Immobilienverkauf.",
    },
    {
      q: "Zahle ich bei einer Express-Anfrage einen Aufpreis?",
      a: "Da wir Personal und Fahrzeuge oft kurzfristig umdisponieren müssen, können je nach Dringlichkeit Express-Zuschläge anfallen. Diese werden vorab transparent kommuniziert.",
    },
    {
      q: "Welche Zusage gibt es bei einer Notfall-Anfrage?",
      a: "FLOXANT prüft ehrlich und kommuniziert klar, ob Termin, Team und Fahrzeug realistisch verfügbar sind. Wir machen keine falschen Versprechungen.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Express Anfrage", item: "/express-anfrage" },
      ]),
      buildServiceJsonLd({
        name: "Express-Anfrage in Regensburg und Bayern",
        description:
          "Schnelle Machbarkeitsprüfung für kurzfristige Umzüge, Reinigungen und Räumungen mit FLOXANT.",
        path: "/express-anfrage",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Express Anfrage | FLOXANT",
        description:
          "Definition, Grenzen und direkte Anfrage für kurzfristige Einsätze in Regensburg und Bayern.",
        path: "/express-anfrage",
        about: ["Express-Anfrage", "Kurzfristiger Umzug", "Regensburg", "Bayern"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-55">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-mono uppercase tracking-widest text-blue-700">
            <Clock size={14} className="text-blue-600" />
            Express Anfrage Bayern
          </div>
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Express-Anfrage & Notfall-Service in Regensburg & Bayern
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            Wenn Zeitfenster kippen und schnelle Ergebnisse zählen: FLOXANT prüft kurzfristige Umzüge, Reinigungen und Räumungen mit klarer Rückmeldung zu Kapazität, Ort und Umfang. Sie bekommen eine erreichbare Anlaufstelle für eilige Fälle in Regensburg und Bayern.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/rechner"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-blue-600 px-10 text-xs font-bold uppercase tracking-widest text-white shadow-[0_18px_48px_rgba(37,99,235,0.22)] transition-all hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Express-Anfrage starten
            </Link>
            <a
              href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-10 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <PhoneCall size={16} />
              WhatsApp Sofort-Check
            </a>
          </div>
        </div>
      </section>

      <section className="section-glow px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            { icon: Zap, title: "Was ist das?", text: "Ein priorisierter Einstieg für knappe Zeitfenster und schnelle Machbarkeitsprüfung." },
            { icon: Calendar, title: "Für wen?", text: "Für Kunden mit kurzfristigen Übergaben, Ausfällen oder sehr engem Terminrahmen." },
            { icon: AlertCircle, title: "Welche Grenzen gelten?", text: "Express ist nur sinnvoll, wenn Team, Fahrzeuge und regionale Machbarkeit real vorhanden sind." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card-premium rounded-3xl p-8">
                <Icon className="mb-5 h-8 w-8 text-blue-600" />
                <h2 className="mb-3 text-xl font-bold text-slate-950">{item.title}</h2>
                <p className="text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-slate-950">Häufige Fragen zur Express-Anfrage</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="card-premium rounded-3xl p-8">
                <h3 className="mb-4 text-xl font-bold text-slate-950">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="section-glow py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-12 text-3xl font-bold text-slate-950">Jetzt Express-Status anfragen</h2>
          <div className="glass-elevated rounded-3xl p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <SmartBookingWizard
              dict={{
                common: dict.common,
                calculator: dict.calculator,
              }}
            />
          </div>
        </div>
      </section>

      <section className="section-glow px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/umzug", label: "Umzug als Hauptservice" },
            { href: "/reinigung", label: "Reinigung als Hauptservice" },
            { href: "/entruempelung", label: "Entrümpelung als Hauptservice" },
            { href: "/service-area-bayern", label: "Servicegebiet Bayern" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card-premium rounded-2xl px-6 py-4 font-medium text-slate-700 transition-all hover:border-blue-500/30 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
