import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  Droplets,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "reinigung",
    title: "Reinigung Regensburg & Bayern | Übergabe & Endreinigung",
    description:
      "Fachgerechte Reinigung für Wohnung, Haus und Gewerbe in Regensburg und Bayern: Übergabe, Endreinigung, Extras und klare Vorprüfung.",
  });
}

export default async function ReinigungPillarPage() {
  const dict = await getDictionary("de");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Reinigung" },
  ];

  const faqItems = [
    {
      q: "Welche Reinigungsleistungen bietet FLOXANT an?",
      a: "FLOXANT bietet Endreinigung, Wohnungsreinigung, Gebäudereinigung sowie Reinigungslösungen für Büros und gewerbliche Objekte in Regensburg und Bayern.",
    },
    {
      q: "Für wen ist die Reinigung sinnvoll?",
      a: "Der Service ist für Mieter, Vermieter, Hausverwaltungen, Gewerbekunden und alle relevant, die vor Übergabe oder Wiedervermietung ein klares Reinigungsergebnis brauchen.",
    },
    {
      q: "Was unterscheidet die Leistung von normaler Unterhaltsreinigung?",
      a: "FLOXANT fokussiert sichtbare Übergabefähigkeit, klare Leistungsgrenzen und eine planbare Abstimmung statt einer offenen Alltagsreinigung ohne definierte Zielqualität.",
    },
    {
      q: "Wie starte ich die Anfrage?",
      a: "Über den FLOXANT Rechner. Dort lassen sich Flächen, Objekttyp und Reinigungsbedarf direkt erfassen und als Preisrahmen vorbereiten.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
      ]),
      buildServiceJsonLd({
        name: "Reinigung in Regensburg und Bayern",
        description:
          "Endreinigung, Gebäudereinigung und Objektservice mit FLOXANT in Regensburg und Bayern.",
        path: "/reinigung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Reinigung in Regensburg und Bayern | FLOXANT",
        description:
          "Service-Definition, Einsatzbereiche, Ablauf und direkte Anfrage für Reinigung mit FLOXANT.",
        path: "/reinigung",
        about: ["Reinigung", "Endreinigung", "Gebäudereinigung", "Regensburg", "Bayern"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  const cityLinks = [
    { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
    { href: "/reinigung-muenchen", label: "Reinigung München" },
    { href: "/reinigung-nuernberg", label: "Reinigung Nürnberg" },
    { href: "/reinigung-augsburg", label: "Reinigung Augsburg" },
    { href: "/reinigung-landshut", label: "Reinigung Landshut" },
    { href: "/reinigung-passau", label: "Reinigung Passau" },
  ];

  const serviceLinks = [
    { href: "/rechner", label: "Reinigung direkt kalkulieren" },
    { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung kombinieren" },
    { href: "/express-anfrage", label: "Kurzfristige Reinigung anfragen" },
    { href: "/anfrage-mit-preisrahmen", label: "Reinigung mit Preisrahmen planen" },
    { href: "/service-area-bayern", label: "Servicegebiet Bayern ansehen" },
    { href: "/umzug", label: "Umzug und Reinigung zusammen denken" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <section className="bg-gradient-to-b from-muted/20 to-background px-6 pb-20 pt-8">
        <div className="mx-auto max-w-6xl space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            <span>Reinigung mit Schwerpunkt Regensburg und Bayern</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Reinigung in Regensburg und Bayern
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-400">
            FLOXANT bietet Endreinigung, Gebäudereinigung und Objektservice für saubere Übergaben, Wohnungswechsel und laufende Objektbetreuung. Diese Seite erklärt klar, was der Service ist, für wen er gedacht ist und wie er vom Standardfall abweicht.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Sparkles,
              title: "Was ist das?",
              text: "Ein planbarer Reinigungsservice für Wohnungen, Häuser, Büros und Gewerbeflächen.",
            },
            {
              icon: Home,
              title: "Für wen?",
              text: "Für Mieter, Vermieter, Hausverwaltungen und Unternehmen mit klarer Ergebnis-Erwartung.",
            },
            {
              icon: Droplets,
              title: "Wann sinnvoll?",
              text: "Vor Übergaben, nach Auszug, vor Wiedervermietung oder bei sensiblen Gewerbeflächen.",
            },
            {
              icon: ShieldCheck,
              title: "Wie läuft es ab?",
              text: "Objekt aufnehmen, Leistungsumfang definieren, Termin planen und Ergebnis sauber dokumentiert abarbeiten.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <Icon className="mb-5 h-8 w-8 text-primary" />
                <h2 className="mb-3 text-xl font-bold text-white">{item.title}</h2>
                <p className="leading-relaxed text-slate-300">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-white">
            Wann FLOXANT als Reinigungsfirma besonders relevant ist
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <Building className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-4 text-2xl font-bold text-white">Gewerbe und Verwaltung</h3>
              <p className="text-slate-300">
                Bei Büros, Praxen und Objektbetreuung zählen klare Leistungsverzeichnisse, feste Ansprechpartner und nachvollziehbare Terminplanung.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <Home className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-4 text-2xl font-bold text-white">Auszug und Übergabe</h3>
              <p className="text-slate-300">
                Vor Wohnungsübergaben oder Wiedervermietung muss Reinigung nicht nur sauber wirken, sondern praktisch und terminsicher erledigt sein.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-slate-950/50 py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-white">
            Wie sich der Service vom Standard unterscheidet
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="mb-4 text-xl font-bold text-white">Klare Service-Definition</h3>
              <p className="text-slate-300">
                FLOXANT definiert vorab Flächen, Leistungsumfang, Termin und Besonderheiten. Das vermeidet Missverständnisse und macht Ergebnisse besser vergleichbar.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-8 text-white">
              <h3 className="mb-4 text-xl font-bold text-primary">Regionale Einordnung</h3>
              <p className="text-slate-300">
                Der Fokus auf Regensburg und Bayern macht Anfahrt, Einsatzplanung und Kombinationen mit Umzug oder Entrümpelung sinnvoller und realistischer.
              </p>
              <Link href="/rechner" className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline">
                Zum Rechner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-white">Häufige Fragen zur Reinigung</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                <h3 className="mb-4 text-xl font-bold text-white">{item.q}</h3>
                <p className="text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="bg-slate-900 py-24 border-t border-white/5">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
              Reinigung in Regensburg oder Bayern anfragen
            </h2>
            <p className="text-lg text-slate-400">
              Nutzen Sie den Rechner für einen klaren Preisrahmen und eine saubere Einsatzvorbereitung.
            </p>
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0A0C10] p-1 shadow-2xl">
            <div className="relative z-10 p-4 md:p-8">
              <SmartBookingWizard
                dict={{
                  common: dict.common,
                  calculator: dict.calculator,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-slate-950 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
            Wichtige interne Einstiege rund um Reinigung
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-slate-300 transition-all hover:border-primary hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-slate-950 py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
            Reinigung lokal in wichtigen Regionen
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cityLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-slate-300 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
