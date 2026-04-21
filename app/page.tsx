import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Box,
  Briefcase,
  CheckCircle2,
  Crown,
  Repeat,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "@/get-dictionary";
import { RegionalDominanceGrid } from "@/components/RegionalDominanceGrid";
import Magnetic from "@/components/Magnetic";
import ServiceRechnerHub from "@/components/calculator/ServiceRechnerHub";
import { SignatureServices } from "@/components/SignatureServices";
import ReviewCarousel from "@/components/trust/ReviewCarousel";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { germanText } from "@/lib/german-text";

type ServiceItem = {
  title?: string;
  desc?: string;
};

type DisplayService = {
  title: string;
  description: string;
  href: string;
  Icon: any;
  bullets: string[];
};

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "",
    title: "FLOXANT Regensburg | Umzug, Reinigung & Private Services",
    description:
      "Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung und FLOXANT Private Client in Regensburg, Bayern und dem erweiterten Einsatzraum.",
  });
}

export default async function Home() {
  const dict = await getDictionary("de");
  const home = dict.home || {};
  const servicesSection = dict.services_section || {};
  const servicesItems: ServiceItem[] = Array.isArray(servicesSection.items)
    ? (servicesSection.items as ServiceItem[])
    : [];

  const fallbackServices: DisplayService[] = [
    {
      title: "Premium-Umzug",
      description: "Planbarer Privat- und Firmenumzug mit Vorprüfung, Transport und Zusatzleistungen aus einer Hand.",
      href: "/umzug",
      Icon: Box,
      bullets: [
        "Volumen, Strecke und Zugang klar eingeordnet",
        "Montage, Tragewege und Zeitfenster berücksichtigt",
        "Direkter Einstieg über den Rechner",
      ],
    },
    {
      title: "Professionelle Reinigung",
      description: "Reinigung für Übergabe, Objektpflege und kombinierte Auszugslösungen in Regensburg und Bayern.",
      href: "/reinigung",
      Icon: Sparkles,
      bullets: [
        "Fläche, Zustand und Extras sauber bewertet",
        "Endreinigung und laufende Einsätze möglich",
        "Gut kombinierbar mit Umzug und Übergabe",
      ],
    },
    {
      title: "Strukturierte Entrümpelung",
      description: "Räumung, Wohnungsauflösung und fachgerechte Entsorgung mit klarer Vorprüfung und operativem Ablauf.",
      href: "/entruempelung",
      Icon: Trash2,
      bullets: [
        "Volumen, Materialarten und Zugang plausibel eingeordnet",
        "Demontage und Sonderaufwand sichtbar berücksichtigt",
        "Geeignet für private und gewerbliche Räumungen",
      ],
    },
    {
      title: "Büroumzug & Firmenumzug",
      description: "Büroumzug mit Arbeitsplatzanzahl, IT, Archiv, Zugang, Zeitfenster und Betriebsunterbrechung im Blick.",
      href: "/bueroumzug",
      Icon: Briefcase,
      bullets: [
        "Arbeitsplätze, IT und Archiv realistisch eingeordnet",
        "Zugang, Laufwege und Haltezonen operativ berücksichtigt",
        "Für Regensburg, Bayern und größere Firmenumzüge",
      ],
    },
  ];

  const iconMap = [Box, Sparkles, Trash2, Briefcase];
  const primaryServices =
    servicesItems.length >= 3
      ? servicesItems.slice(0, 3).map((item, index) => ({
          title: germanText(item.title, fallbackServices[index].title),
          description: germanText(item.desc, fallbackServices[index].description),
          href: fallbackServices[index].href,
          Icon: iconMap[index],
          bullets: fallbackServices[index].bullets,
        }))
      : fallbackServices.slice(0, 3);
  const displayServices = [...primaryServices, fallbackServices[3]];

  const homeFaqItems = [
    {
      q: "Welche Leistungen bietet FLOXANT in Regensburg und Bayern an?",
      a: "FLOXANT fokussiert sich auf Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung und FLOXANT Private Client. Dazu kommen Zusatzservices wie Beiladung, Leer-Rückfahrt, Express-Anfrage, Preisvorstellung und kombinierte Umzüge mit Reinigung.",
    },
    {
      q: "Wie startet eine Anfrage bei FLOXANT am schnellsten?",
      a: "Am schnellsten über den FLOXANT Rechner. Dort entsteht zuerst ein unverbindlicher Orientierungsrahmen mit service-spezifischen Faktoren für die weitere Planung.",
    },
    {
      q: "Ist der Preis im Rechner final verbindlich?",
      a: "Nein. Der Rechner zeigt einen unverbindlichen Orientierungsrahmen und eine Vorprüfungsstufe. Das hilft bei Planung und Einordnung, ersetzt aber nicht die finale operative Abstimmung.",
    },
    {
      q: "Für wen ist FLOXANT geeignet?",
      a: "Für Privatkunden, Familien, Unternehmen, Hausverwaltungen und Vermieter, die einen klaren Ablauf, starke Kommunikation und saubere Umsetzung brauchen.",
    },
    {
      q: "Warum arbeitet FLOXANT mit einem Preisrahmen statt mit Lockpreisen?",
      a: "Weil Umzug, Reinigung, Entrümpelung und Büroumzug von Umfang, Zugang, Region, Terminlage und Zusatzleistungen abhängen. Ein Orientierungsrahmen ist ehrlicher und besser planbar als eine künstlich exakte Zahl.",
    },
    {
      q: "Welche Rolle spielen Regensburg und Bayern?",
      a: "Regensburg ist der operative Kern von FLOXANT. Bayern ist das Ausbaugebiet, in dem jede Anfrage nach Strecke, Verfügbarkeit und Leistungsumfang realistisch geprüft wird.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT | Umzug, Reinigung, Entrümpelung und Büroumzug in Regensburg und Bayern",
        description: "FLOXANT bietet Umzug, Reinigung, Entrümpelung und Büroumzug mit Fokus auf Regensburg, Bayern und den 200-km-Einsatzraum.",
        path: "/",
        about: ["Umzug", "Reinigung", "Entrümpelung", "Büroumzug", "Regensburg", "Bayern", "200-km-Einsatzgebiet"],
      }),
      buildServiceJsonLd({
        name: "Umzug in Regensburg und Bayern",
        description: "Planbare Umzüge für Privatkunden und Unternehmen.",
        path: "/umzug",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildServiceJsonLd({
        name: "Reinigung in Regensburg und Bayern",
        description: "Objekt-, End- und Übergabereinigung in Regensburg und Bayern.",
        path: "/reinigung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildServiceJsonLd({
        name: "Entrümpelung in Regensburg und Bayern",
        description: "Wohnungsauflösung, Räumung und Entsorgung in Regensburg und Bayern.",
        path: "/entruempelung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildServiceJsonLd({
        name: "Büroumzug in Regensburg und Bayern",
        description: "Firmenumzug, Bürotransport und Arbeitsplatzverlagerung in Regensburg, Bayern und dem erweiterten Einsatzraum.",
        path: "/bueroumzug",
        areaServed: ["Regensburg", "Bayern", "Nürnberg", "München"],
      }),
      buildServiceJsonLd({
        name: "Firmenentsorgung und Büroentsorgung in Regensburg und Bayern",
        description: "Abholung und Entsorgung nicht erlaubnispflichtiger Büro- und Gewerbegegenstände für Firmen, Kanzleien, Praxen und große Büros.",
        path: "/firmenentsorgung",
        serviceType: "Firmenentsorgung",
        areaServed: ["Regensburg", "Bayern", "Nürnberg", "München"],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Private Client in Bayern und Baden-Württemberg",
        description: "Diskreter Service für Anwesen, große Häuser und hochwertige Interieurs mit Umzug, Reinigung, Räumung und Entsorgung.",
        path: "/private-client-service",
        serviceType: "Private Client Service",
        areaServed: ["Bayern", "Baden-Württemberg", "München", "Stuttgart"],
      }),
      buildFaqJsonLd(homeFaqItems),
    ],
  };

  const serviceLinks = [
    { href: "/beiladung", label: "Beiladung", Icon: Repeat },
    { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung", Icon: ShieldCheck },
    { href: "/express-anfrage", label: "Express-Anfrage", Icon: Zap },
    { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung", Icon: Banknote },
    { href: "/kleinmengen-entsorgung", label: "Kleinmengen-Entsorgung", Icon: Trash2 },
    { href: "/firmenentsorgung", label: "Firmenentsorgung", Icon: Briefcase },
    { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt", Icon: Truck },
    { href: "/private-client-service", label: "Private Client", Icon: Crown },
  ];

  const customerDecisionCards = [
    {
      href: "/umzug",
      eyebrow: "Umzug",
      title: "Ich plane einen Ortswechsel",
      text: "Für Wohnungen, Häuser, Firmen und Zusatzleistungen wie Montage, Packhilfe oder Haltezone.",
      action: "Umzugsservice ansehen",
      Icon: Box,
    },
    {
      href: "/reinigung",
      eyebrow: "Reinigung",
      title: "Ich brauche saubere Übergabe",
      text: "Für Endreinigung, Objektpflege, Küche, Bad, Fenster und klare Leistungsgrenzen vor der Abnahme.",
      action: "Reinigung prüfen",
      Icon: Sparkles,
    },
    {
      href: "/entruempelung",
      eyebrow: "Entrümpelung",
      title: "Ich muss räumen oder entsorgen",
      text: "Für Wohnung, Keller, Gewerbefläche, Kleinmengen und fachgerechte Entsorgung mit Vorprüfung.",
      action: "Entrümpelung einordnen",
      Icon: Trash2,
    },
    {
      href: "/rechner",
      eyebrow: "Preisrahmen",
      title: "Ich will zuerst Klarheit",
      text: "Der Rechner zeigt einen unverbindlichen Orientierungsrahmen, Kostentreiber und den nächsten Schritt.",
      action: "Rechner starten",
      Icon: Banknote,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden px-6 pb-24 pt-44 lg:pt-56">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,rgba(59,130,246,0.14),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_36%_32%_at_50%_0%,rgba(255,255,255,0.07),transparent)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              {germanText(home.premium_badge, "Premium-Service | Regensburg und Bayern")}
            </div>

            <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-tight text-white md:text-7xl lg:text-[5.2rem]">
              {germanText(
                home.hero_title,
                "Umzug, Reinigung, Entrümpelung und Büroumzug mit klarem Ablauf und ehrlicher Vorprüfung"
              )}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-balance text-lg leading-relaxed text-white/48">
              {germanText(
                home.hero_subtitle,
                "FLOXANT verbindet Rechner, Anfrage und operative Umsetzung auf einer sauberen Produktlinie. Für Regensburg, den 200-km-Einsatzraum und Kunden, die Struktur statt Chaos wollen."
              )}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic strength={0.15}>
                <Link
                  href="/rechner"
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-10 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-blue-600/25 transition-all hover:from-blue-400 hover:to-blue-500 hover:shadow-2xl hover:shadow-blue-600/35"
                >
                  Vorprüfung starten
                </Link>
              </Magnetic>

              <Link
                href="/anfrage-mit-preisrahmen"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Preisvorstellung senden
              </Link>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                { value: "Vorprüfung", label: "Plausibler Einstieg statt Lockpreis oder Schnellversprechen" },
                { value: "200 km", label: "Operativer Kern Regensburg mit erweitertem Einsatzraum" },
                { value: "Klarheit", label: "Leistungen, Zusatzservices und nächste Schritte verständlich erklärt" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
                  <div className="text-2xl font-semibold tracking-tight text-white">{item.value}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/40">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Kundenpfad</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Was brauchen Sie gerade?
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/45 md:text-right">
              Vier klare Einstiege statt langer Suche: Service verstehen, Preisrahmen prüfen oder direkt die passende Anfrage starten.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {customerDecisionCards.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="premium-scan group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 transition-all hover:-translate-y-1 hover:border-blue-400/25"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                      {item.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-4 min-h-[104px] text-sm leading-relaxed text-white/48">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-300">
                    {item.action}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            {
              href: "/rechner",
              title: "Rechner",
              text: "Für Kunden, die zuerst Aufwand, Preisrahmen und Kostentreiber einordnen möchten.",
            },
            {
              href: "/umzug-mit-reinigung",
              title: "Kombiservice",
              text: "Für Übergaben, bei denen Umzug und Reinigung ineinandergreifen müssen.",
            },
            {
              href: "/blog",
              title: "Praxiswissen",
              text: "Für Leser, die vor der Anfrage erst verstehen möchten, was realistisch und sinnvoll ist.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/20"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Schneller Einstieg</div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/45">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <ReviewCarousel dic={dict} />

      <section id="services" className="section-glow relative overflow-hidden px-6 py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.03),transparent)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="label-premium mb-4 block">Kernleistungen</span>
              <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {germanText(home.services_title, "Vier starke Servicepfade")}
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-white/40 md:text-right">
              {germanText(
                home.services_subtitle,
                "Jeder Hauptservice führt direkt vom Verstehen in die Vorprüfung und von dort in die operative Abstimmung."
              )}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {displayServices.map((service) => {
              const Icon = service.Icon;
              return (
                <article key={service.title} className="premium-scan card-premium group flex flex-col rounded-[2rem] p-8">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-blue-300 transition-all group-hover:scale-105 group-hover:border-blue-500/20 group-hover:bg-blue-500/10">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-white">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/45">{service.description}</p>

                  <div className="mt-7 space-y-3">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400/80" />
                        <span className="text-sm text-white/45">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-all hover:text-blue-300"
                    >
                      Service ansehen
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="rechner" className="section-glow px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="label-premium mb-4 block text-blue-400/70">Preiswahrheit</span>
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Rechner für die erste operative Einordnung
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/45">
              Der FLOXANT Rechner zeigt keinen künstlichen Endpreis, sondern einen unverbindlichen
              Orientierungsrahmen mit service-spezifischen Treibern, Vorprüfungsstufe und optionaler
              Preisvorstellung des Kunden.
            </p>
          </div>
          <ServiceRechnerHub dic={dict} />
        </div>
      </section>

      <SignatureServices dict={dict} locale="de" />

      <section id="extra-services" className="section-glow px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="label-premium mb-4 block text-blue-400/70">Zusatzservices</span>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Spezielle Wege für konkrete Fälle
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/40">
              Kein Linkteppich, sondern direkte Einstiege für Beiladung, Express, Preisvorstellung
              und kombinierte Abläufe.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceLinks.map((item) => {
              const Icon = item.Icon;
              return (
                <Link key={item.href} href={item.href} className="premium-scan card-premium group rounded-[1.75rem] p-7">
                  <Icon className="h-5 w-5 text-blue-300 transition-transform group-hover:scale-110" />
                  <h3 className="mt-6 text-lg font-semibold text-white">{item.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/40">
                    Direkter Spezialpfad für Planung, Vorprüfung und passende Anschlussaktionen.
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <RegionalDominanceGrid dic={dict} />

      <section className="border-t border-white/5 bg-slate-950/40 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">FLOXANT klar eingeordnet</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/45">
              Diese Startseite soll für Google, KI-Systeme und echte Menschen sofort verständlich
              machen, was FLOXANT ist, für wen der Service gedacht ist und welche Seiten den
              nächsten sinnvollen Schritt bilden.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-premium rounded-[1.75rem] p-8">
              <h3 className="text-xl font-semibold text-white">Was ist FLOXANT?</h3>
              <p className="mt-4 leading-relaxed text-white/45">
                Eine Premium-Dienstleistungsmarke für Umzug, Reinigung, Entrümpelung und Büroumzug mit
                operativem Schwerpunkt Regensburg und Ausbau in Bayern.
              </p>
            </div>
            <div className="card-premium rounded-[1.75rem] p-8">
              <h3 className="text-xl font-semibold text-white">Wann ist FLOXANT relevant?</h3>
              <p className="mt-4 leading-relaxed text-white/45">
                Wenn ein Wechsel, eine Übergabe, eine Räumung oder eine koordinierte Zusatzleistung
                sauber geplant und umgesetzt werden muss.
              </p>
            </div>
            <div className="card-premium rounded-[1.75rem] p-8">
              <h3 className="text-xl font-semibold text-white">Wie startet man?</h3>
              <p className="mt-4 leading-relaxed text-white/45">
                Über den Rechner, über einen Spezialservice oder direkt über die Preisvorstellung.
                Die Produktlinie führt dann in Vorprüfung und operative Abstimmung.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { href: "/umzug", label: "Umzug" },
              { href: "/reinigung", label: "Reinigung" },
              { href: "/entruempelung", label: "Entrümpelung" },
              { href: "/rechner", label: "Rechner" },
              { href: "/service-area-bayern", label: "Bayern" },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card-premium rounded-2xl px-5 py-4 text-sm font-semibold text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-semibold text-white">Häufige Fragen zu FLOXANT</h2>
          <div className="space-y-4">
            {homeFaqItems.map((item) => (
              <div key={item.q} className="card-premium rounded-[1.75rem] p-8">
                <h3 className="text-xl font-semibold text-white">{item.q}</h3>
                <p className="mt-4 leading-relaxed text-white/45">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-white/[0.01] px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Link href="/ratgeber" className="card-premium rounded-[1.75rem] p-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Ratgeber</div>
            <h2 className="mt-4 text-2xl font-semibold text-white">Checklisten und Praxiswissen</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Nutzwertige Inhalte statt SEO-Fülltext. Direkte Hilfen für Planung, Übergabe und Preislogik.
            </p>
          </Link>
          <Link href="/blog" className="card-premium rounded-[1.75rem] p-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Blog</div>
            <h2 className="mt-4 text-2xl font-semibold text-white">Aktuelle Spezialthemen</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Neue Inhalte zu Endreinigung, Beiladung, Preisvorstellung, Übergabe und weiteren Suchintentionen.
            </p>
          </Link>
          <Link href="/anfrage-mit-preisrahmen" className="card-premium rounded-[1.75rem] p-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Budget</div>
            <h2 className="mt-4 text-2xl font-semibold text-white">Preisvorstellung senden</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Wenn ein Budget schon feststeht, lässt sich Ihre Preisvorstellung hier sauber und unverbindlich mitgeben.
            </p>
          </Link>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Direkter Draht</div>
            <h2 className="mt-4 text-3xl font-semibold text-white">Lieber sofort schreiben?</h2>
            <p className="mt-4 text-white/50">
              Für schnelle Rückfragen oder erste Orientierung können Sie FLOXANT auch direkt per
              WhatsApp kontaktieren.
            </p>
          </div>
          <a
            href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-blue-50"
          >
            WhatsApp öffnen
          </a>
        </div>
      </section>
    </main>
  );
}
