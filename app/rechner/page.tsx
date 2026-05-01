import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MapPin,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import ServiceRechnerHub from "@/components/calculator/ServiceRechnerHub";
import { getDictionary } from "@/get-dictionary";
import {
  BAVARIA_DIRECT_DEMAND_LINKS,
  BAVARIA_COVERAGE_GROUPS,
  BAVARIA_MAPS_SERVICE_INTENTS,
  BAVARIA_METRO_DISTRICT_LINKS,
  BAVARIA_REGENSBURG_PROXIMITY_LINKS,
} from "@/lib/bavaria-coverage";
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
    path: "rechner",
    title: "Rechner für Umzug, Reinigung, Entrümpelung & Büroumzug | FLOXANT",
    description:
      "Der FLOXANT Rechner liefert Orientierung statt Lockpreis für Umzug, Reinigung, Entrümpelung und Büroumzug in Regensburg, Bayern und dem 200-km-Einsatzraum.",
  });
}

type RechnerService = "umzug" | "reinigung" | "entsorgung" | "bueroumzug";

function buildServiceMarketHref(service: RechnerService, baseHref: string) {
  if (service === "umzug") {
    return baseHref;
  }

  if (service === "entsorgung") {
    return baseHref.replace("/umzug-", "/entruempelung-");
  }

  if (service === "reinigung") {
    return baseHref.replace("/umzug-", "/reinigung-");
  }

  return baseHref.replace("/umzug-", "/bueroumzug-");
}

export default async function RechnerPage() {
  const dict = await getDictionary("de");

  const serviceEntryLinks = [
    {
      label: "Umzug-Rechner",
      href: "/rechner?service=umzug",
      description: "Direkt in die Vorprüfung für Privat- und Firmenumzug einsteigen.",
    },
    {
      label: "Reinigungs-Rechner",
      href: "/rechner?service=reinigung",
      description: "Direkt in die Vorprüfung für Reinigung, Übergabe und Objektservice einsteigen.",
    },
    {
      label: "Entsorgungs-Rechner",
      href: "/rechner?service=entsorgung",
      description: "Direkt in die Vorprüfung für Entrümpelung und Entsorgung einsteigen.",
    },
    {
      label: "Bueroumzug-Rechner",
      href: "/rechner?service=bueroumzug",
      description: "Direkt in die Vorprüfung für Büroumzug, Teamlogik und Firmenstandorte einsteigen.",
    },
  ] as const;

  const rechnerOutcomes = [
    {
      title: "Den richtigen Service",
      text: "Sie sehen schneller, ob Ihr Fall eher in Umzug, Reinigung, Entrümpelung oder Büroumzug sauber aufgehoben ist.",
    },
    {
      title: "Den realistischen Rahmen",
      text: "Statt Lockpreis bekommen Sie eine ehrliche Einordnung mit Bandbreite, Treibern und sinnvollen nächsten Schritten.",
    },
    {
      title: "Den passenden Folgeweg",
      text: "Nach der Vorprüfung geht es geordnet weiter in Anfrage, Preisvorstellung oder Express-Check.",
    },
  ];

  const routingSignals = [
    "Für Preisgefühl und Aufwandseinordnung",
    "Für Privatkunden, Vermieter, Hausverwaltungen und Firmen",
    "Für Regensburg, Bayern und operativ sinnvolle weitere Einsätze",
  ];

  const professionalSignals = [
    {
      title: "Operativer Kern in Regensburg",
      text: "Lokale Führung, klare Zuständigkeiten und ein sauberer Weg von der Vorprüfung in die echte Anfrage.",
    },
    {
      title: "Antwort statt Portal-Rauschen",
      text: "Der Rechner sortiert zuerst den Fall. Danach geht es direkt weiter in Buchung, Express oder Preisvorstellung.",
    },
    {
      title: "Belastbare Einordnung",
      text: "Bandbreite, Treiber und Zusatzleistungen bleiben sichtbar, statt künstlich auf einen Fantasiepreis gepresst zu werden.",
    },
  ] as const;

  const mapsSignals = [
    {
      title: "Regensburg als echter Kern",
      text: "Kontakt, Buchung, Standorte und die Money-Pages verweisen auf einen klaren lokalen Mittelpunkt statt auf beliebige Sammel-URLs.",
      href: "/kontakt",
      label: "Kontakt & Standort",
    },
    {
      title: "Direkte Servicepfade für Bayern",
      text: "Wer Ort und Leistung schon kennt, landet über konkrete Marktseiten direkt im passenden Service statt in einem generischen Formular.",
      href: "/standorte",
      label: "Standorte ansehen",
    },
    {
      title: "Buchung als sauberer Maps-Folgeweg",
      text: "Nach dem ersten Vertrauenssignal aus Maps muss der nächste Klick schnell in Anfrage, Preisrahmen oder WhatsApp weiterführen.",
      href: "/buchung",
      label: "Buchung öffnen",
    },
  ] as const;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Rechner" },
  ];

  const faqItems = [
    {
      q: "Was ist der FLOXANT Rechner?",
      a: "Der Rechner ist der zentrale Einstieg für Umzug, Reinigung, Entrümpelung und Büroumzug. Er sammelt die wichtigsten Angaben und bereitet daraus eine belastbare Vorprüfung vor.",
    },
    {
      q: "Ist der angezeigte Preis ein Endpreis?",
      a: "Nein. Der Rechner dient als Orientierung. Verbindlich wird ein Auftrag erst nach Prüfung der Angaben, Umfang, Zugang, Termin, Zusatzleistungen und schriftlicher Bestätigung.",
    },
    {
      q: "Kann ich eine eigene Preisvorstellung angeben?",
      a: "Ja. Im späteren Verlauf können Sie optional ein Zielbudget angeben. Diese Angabe ergänzt die System-Einschätzung, ersetzt sie aber nicht.",
    },
    {
      q: "Für wen ist der Rechner sinnvoll?",
      a: "Für Privatkunden, Unternehmen, Vermieter und Hausverwaltungen, die Aufwand, regionale Relevanz und Zusatzleistungen vor einer Anfrage sauber einordnen wollen.",
    },
    {
      q: "Welche Regionen deckt der Rechner ab?",
      a: "Der operative Schwerpunkt liegt auf Regensburg und Bayern. Gleichzeitig dient der Rechner als sauberer Einstieg für weitere Einsätze im erweiterten Gebiet.",
    },
  ];

  const marketGroups = BAVARIA_COVERAGE_GROUPS.map((group) => ({
    ...group,
    links: group.links.slice(0, 6),
  }));

  const metroDirectLinks = BAVARIA_METRO_DISTRICT_LINKS.map((item) => ({
    label: item.label,
    href: "/rechner?service=umzug",
    note: item.note,
  }));

  const businessModelSteps = [
    {
      title: "1. Erst Rechner oder Direktanfrage wählen",
      text: "Der Rechner ist für Einordnung und Preisrahmen. Die Buchung ist für klare Fälle mit direkter Umsetzungsabsicht.",
    },
    {
      title: "2. Service und Region sauber sortieren",
      text: "Statt anonyme Vergleichsformulare zusammenzuschieben, führt FLOXANT Leistung, Ort und Machbarkeit in einem klaren Intake zusammen.",
    },
    {
      title: "3. In den passenden Conversion-Kanal weitergehen",
      text: "Danach geht es geordnet in Anfrage, WhatsApp, Express-Check oder Preisvorstellung weiter.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Rechner", item: "/rechner" },
      ]),
      buildWebPageJsonLd({
        name: "FLOXANT Rechner für Umzug, Reinigung und Entrümpelung",
        description:
          "Der FLOXANT Rechner ist der direkte Einstieg für unverbindliche Orientierungsrahmen in Regensburg und Bayern.",
        path: "/rechner",
        about: [
          "Preisrahmen",
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Büroumzug",
          "Regensburg",
          "Bayern",
          "200-km-Einsatzgebiet",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Rechner und Vorprüfung",
        description:
          "Der FLOXANT Rechner ordnet Umzug, Reinigung, Entrümpelung und Büroumzug in einen nachvollziehbaren Orientierungsrahmen ein.",
        path: "/rechner",
        serviceType: "Rechner und Vorprüfung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#service-einstiege",
        name: "FLOXANT Rechner-Einstiege",
        description:
          "Direkte URL-Einstiege in den passenden FLOXANT Rechner für Umzug, Reinigung, Entsorgung und Büroumzug.",
        itemListElement: serviceEntryLinks.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `https://www.floxant.de${item.href}`,
          description: item.description,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#maps-service-intents",
        name: "FLOXANT Maps-Service-Intentionen",
        description:
          "Direkte Servicepfade für Maps-Suchen nach Umzug, Reinigung, Entrümpelung, Entsorgung, Lagerung, Büroumzug und Gewerbereinigung.",
        itemListElement: BAVARIA_MAPS_SERVICE_INTENTS.map((intent, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: intent.title,
          url: `https://www.floxant.de${intent.primary.href}`,
          description: intent.description,
        })),
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <section id="ueberblick" className="section-glow relative px-6 pb-20 pt-10">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <FloxantSymbolLayer variant="office" density="rich" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/88 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5">
              <Calculator className="h-4 w-4" />
              FLOXANT Rechner
            </span>
            <h1 className="mt-8 max-w-[14ch] text-4xl font-bold leading-[0.99] tracking-[-0.022em] text-slate-950 md:text-7xl">
              Orientierungsrahmen für Umzug, Reinigung, Entrümpelung und Büroumzug
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              Der Rechner liefert eine erste Orientierung. Die verbindliche Einschätzung entsteht
              erst, wenn Volumen, Etagen, Laufwege, Parkmöglichkeit, Zusatzleistungen und Zeitfenster
              geprüft sind. So wird aus einer losen Preisfrage eine realistische Einsatzprüfung.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/buchung"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-[1.2rem] bg-blue-600 px-5 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500"
              >
                Direkt anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/express-anfrage"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-[1.2rem] border border-amber-200 bg-amber-50 px-5 text-[11px] font-black uppercase tracking-[0.16em] text-amber-900 transition hover:bg-amber-100"
              >
                <Zap className="h-4 w-4" />
                Express-Check
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {serviceEntryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950 hover:shadow-md"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Was ist das?",
                text: "Ein strukturierter Intake für Umzug, Reinigung, Entrümpelung und Büroumzug mit klarer Datenerfassung statt offener Wunschliste.",
              },
              {
                title: "Für wen?",
                text: "Für Privatkunden, Unternehmen, Vermieter und Hausverwaltungen, die Aufwand, Region und Zusatzleistungen sauber einordnen wollen.",
              },
              {
                title: "Was zeigt der Rechner?",
                text: "Einen unverbindlichen Orientierungsrahmen plus die wichtigsten Kostentreiber, nicht aber einen garantierten Endpreis.",
              },
              {
                title: "Welche Grenzen gelten?",
                text: "Die Vorprüfung ersetzt keine finale Einsatzabstimmung, schafft aber eine viel bessere Grundlage für Termin, Team und Angebot.",
              },
            ].map((item, index) => (
              <article key={item.title} className="card-premium group relative overflow-hidden rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition group-hover:opacity-100" />
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  0{index + 1}
                </div>
                <h2 className="text-2xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 pb-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-elevated rounded-[1.9rem] p-6 md:p-8">
            <div className="label-premium text-blue-700">Was Sie hier wirklich bekommen</div>
            <h2 className="mt-4 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Erst Klarheit, dann der richtige nächste Schritt
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Der Rechner ist kein Taschenrechner für Fantasiepreise. Er ist ein sauberer Einstieg
              für Kunden, die Aufwand, Service-Fit und nächste Entscheidung ruhig einordnen wollen.
              Künstlich niedrige Preise helfen niemandem, wenn am Einsatztag Fahrzeug, Zeitfenster
              oder Übergabe fehlen.
            </p>
            <div className="mt-6 grid gap-3">
              {routingSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm shadow-slate-950/5"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {rechnerOutcomes.map((item) => (
              <article key={item.title} className="card-premium group relative overflow-hidden rounded-[1.7rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 transition group-hover:opacity-100" />
                <h3 className="text-[1.15rem] font-bold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 pb-10">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {businessModelSteps.map((item) => (
            <article key={item.title} className="glass-elevated rounded-[1.8rem] p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Geschaeftsmodell-Klarheit
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-8 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Maps-Service-Suche
            </div>
            <h2 className="mt-3 max-w-[15ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Ein Rechner, aber klare Einstiege für jede Suchabsicht
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Wer in Google Maps nach Umzug, Reinigung, Entsorgung, Entrümpelung, Lagerung
              oder Büroumzug sucht, braucht einen eindeutigen Folgeweg. Diese Service-Matrix
              führt Nutzer und Suchsysteme in die passenden FLOXANT-Seiten.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BAVARIA_MAPS_SERVICE_INTENTS.map((intent) => (
              <article
                key={intent.id}
                className="group relative overflow-hidden rounded-[1.55rem] border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-950/10"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition group-hover:opacity-100" />
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {intent.query}
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{intent.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{intent.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={intent.primary.href}
                    className="rounded-full bg-blue-600 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-sm shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                  >
                    {intent.primary.label}
                  </Link>
                  {intent.supporting.slice(0, 2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span className="label-premium text-blue-700">Bayern-Marktpfade</span>
            <h2 className="mt-4 max-w-[14ch] text-4xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
              Direkte Wege aus Bayern in den passenden Rechner
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Regensburg bleibt der operative Kern. Gleichzeitig sollen Nutzer aus ganz Bayern
              sofort sehen, dass ihr Ort, ihre Region und ihr Service bei FLOXANT sauber
              eingeordnet werden.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {marketGroups.map((group) => (
              <article key={group.id} className="card-premium rounded-[2rem] p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  {group.region}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{group.description}</p>
                <div className="mt-6 grid gap-3">
                  {group.links.map((link) => (
                    <div
                      key={link.href}
                      className="rounded-[1.2rem] border border-slate-200 bg-white/88 p-4 shadow-sm shadow-slate-950/5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold text-slate-950">{link.label}</div>
                        <Link
                          href={link.href}
                          className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 hover:text-blue-900"
                        >
                          Seite
                        </Link>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                          href={buildServiceMarketHref("umzug", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Umzug
                        </Link>
                        <Link
                          href={buildServiceMarketHref("reinigung", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Reinigung
                        </Link>
                        <Link
                          href={buildServiceMarketHref("entsorgung", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Entruempelung
                        </Link>
                        <Link
                          href={buildServiceMarketHref("bueroumzug", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Bueroumzug
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,0.98))] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Verdichtete Bezirke
                </div>
                <h3 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-950">
                  Zusätzliche Hebel für München und Nürnberg
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Diese Wege helfen bei dichten Stadtlagen, knappen Zeitfenstern und
                  Bezirksanfragen, die direkt in den passenden FLOXANT-Einstieg führen sollen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {metroDirectLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-blue-50 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Direkte Stadt- und Servicewege
            </div>
            <h2 className="mt-3 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Wenn der Ort schon feststeht, geht es direkt in die passende Seite
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Nicht jeder Nutzer braucht zuerst den Rechner. Diese Seiten holen Bayern-Suchen
              direkt dort ab, wo Service und Stadt schon konkret sind.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {BAVARIA_DIRECT_DEMAND_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-premium rounded-[1.6rem] p-5 transition-all hover:-translate-y-1 hover:border-blue-300/30"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Direktseite Bayern
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Maps und lokale Suche
            </div>
            <h2 className="mt-3 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Welche Signale den lokalen Eindruck für Regensburg und Bayern stärken
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Niemand kann Platz eins garantieren. Aber klare Ortssignale, gute Folgewege und
              starke Marktseiten machen es für Nutzer und Suchsysteme leichter, FLOXANT als
              echten Anbieter mit operativem Kern zu verstehen.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {mapsSignals.map((item) => (
              <article key={item.title} className="glass-elevated rounded-[1.8rem] p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Local Signal
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-14">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Regensburg Nahraum
            </div>
            <h2 className="mt-3 max-w-[15ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Stadtnahe Orte als starke lokale Einstiegspunkte
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Maps-Ranking lebt auch von Naehe und Plausibilitaet. Diese Orte verdichten den
              Regensburger Kern, bevor Bayern breiter ausgespielt wird.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BAVARIA_REGENSBURG_PROXIMITY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="preis" className="section-glow relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div id="leistungen" className="relative -top-24 block h-0 w-0" />
          <div className="mb-14 text-center">
            <span className="label-premium text-blue-700">Vorprüfung mit Substanz</span>
            <h2 className="mt-4 max-w-[14ch] text-4xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
              Preiswahrheit statt künstlicher Exaktheit
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Der Rechner soll überzeugen, ohne falsche Sicherheit zu versprechen. Deshalb zeigt
              FLOXANT einen nachvollziehbaren Rahmen mit sichtbaren Treibern und optionaler
              Preisvorstellung: realistisch statt nachträglich teuer.
            </p>
          </div>
          <div className="mb-8 grid gap-4 lg:grid-cols-3">
            {professionalSignals.map((item) => (
              <article key={item.title} className="glass-elevated rounded-[1.7rem] px-5 py-5">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Profi-Signal
                </div>
                <h3 className="mt-3 text-[1.1rem] font-bold leading-[1.08] tracking-[-0.018em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>

          <ServiceRechnerHub dic={dict} />
        </div>
      </section>

      <section id="ablauf" className="section-glow relative content-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <span className="label-premium text-blue-700">Einordnung</span>
            <h2 className="mt-4 max-w-[14ch] text-4xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
              Wie der Rechner die Einschätzung aufbaut
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Ausgangslage erfassen",
                text: "Objekt, Umfang, Region und Zusatzleistungen werden so abgefragt, dass keine wesentlichen Faktoren verloren gehen.",
                icon: MapPin,
              },
              {
                title: "Kostentreiber sichtbar machen",
                text: "Fläche, Zugang, Etage, Entfernung, Teamlogik und Zusatzwünsche bilden die reale Belastung für Planung und Einsatz ab.",
                icon: Wallet,
              },
              {
                title: "Nächsten Schritt klar führen",
                text: "Nach dem Rahmen geht es geordnet weiter in Buchung, Preisvorstellung oder Express-Prüfung statt in ein offenes Ende.",
                icon: Sparkles,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="card-premium rounded-[2rem] p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Häufige Fragen zum FLOXANT Rechner
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article
                key={item.q}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-blue-700" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{item.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
