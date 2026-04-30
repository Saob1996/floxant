import { Metadata } from "next";
import Link from "next/link";
import { Calculator, CheckCircle2, MapPin, Sparkles, Wallet } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";

import ServiceRechnerHub from "@/components/calculator/ServiceRechnerHub";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "rechner",
    title: "Rechner für Umzug, Reinigung, Entrümpelung & Büroumzug | FLOXANT",
    description:
      "Der FLOXANT Rechner liefert einen unverbindlichen Orientierungsrahmen für Umzug, Reinigung, Entrümpelung und Büroumzug in Regensburg, Bayern und dem 200-km-Einsatzraum.",
  });
}

export default async function RechnerPage() {
  const dict = await getDictionary("de");


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
      a: "Nein. Der Rechner zeigt einen unverbindlichen Orientierungsrahmen. Die Einordnung basiert auf Ihren Angaben zu Umfang, Zugang, Region, Zusatzleistungen und Terminlage.",
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
    {
      q: "Welche Angaben sollte ich bereithalten?",
      a: "Hilfreich sind Objektgröße, Volumen oder Fläche, Etage, Aufzug, Laufwege, Terminwunsch, Zusatzleistungen und bei Entrümpelung grobe Materialarten oder Fotos.",
    },
    {
      q: "Warum fragt der Rechner nach Kostentreibern?",
      a: "Weil diese Faktoren den realen Aufwand bestimmen. Sichtbare Kostentreiber machen die Einschätzung nachvollziehbar und helfen FLOXANT, später genauer zu planen.",
    },
    {
      q: "Was passiert nach der Rechner-Anfrage?",
      a: "FLOXANT prüft die Angaben, ordnet den Bedarf ein und klärt bei Bedarf offene Punkte. Erst danach entsteht eine konkrete operative Abstimmung.",
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
            <h1 className="mt-8 text-4xl font-bold leading-[0.96] tracking-[-0.06em] text-slate-950 md:text-7xl">
              Orientierungsrahmen für Umzug, Reinigung, Entrümpelung und Büroumzug
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              Der Rechner ist der produktive Einstieg für Regensburg, Bayern und den
              erweiterten Einsatzraum. Er ordnet Aufwand, Umfang und Zusatzleistungen so
              ein, dass aus einer losen Idee eine gut belastbare Vorprüfung wird.
            </p>
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
            ].map((item) => (
              <article key={item.title} className="card-premium rounded-[2rem] p-8">
                <h2 className="text-2xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="preis" className="section-glow relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div id="leistungen" className="relative -top-24 block h-0 w-0" />
          <div className="mb-14 text-center">
            <span className="label-premium text-blue-700">Vorprüfung mit Substanz</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Preiswahrheit statt künstlicher Exaktheit
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Der Rechner soll überzeugend wirken, ohne falsche Sicherheit zu versprechen.
              Deshalb zeigt FLOXANT einen nachvollziehbaren Rahmen mit sichtbaren Treibern und
              optionaler Preisvorstellung.
            </p>
          </div>
          <ServiceRechnerHub dic={dict} />
        </div>
      </section>

      <section id="ablauf" className="section-glow relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <span className="label-premium text-blue-700">Einordnung</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Wie der Rechner die Einschätzung aufbaut
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Wallet,
                title: "Orientierungsrahmen statt Lockpreis",
                text: "Die Ausgabe ist bewusst als Band formuliert, damit sie planbar wirkt, ohne falsche Endpreis-Sicherheit zu suggerieren.",
              },
              {
                icon: CheckCircle2,
                title: "Sichtbare Kostentreiber",
                text: "Die wichtigsten Faktoren werden pro Service benannt, damit Nutzer die Einordnung nachvollziehen können.",
              },
              {
                icon: Sparkles,
                title: "Preisvorstellung möglich",
                text: "Wer bereits ein Zielbudget hat, kann es im Verlauf ergänzen. System-Einschätzung und Kundenwunsch bleiben getrennt.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="glass-elevated rounded-[2rem] p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="zusatzservices" className="section-glow relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <span className="label-premium text-blue-700">Saubere Wege</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Direkte Wege vom Rechner zu den passenden Seiten
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/umzug", label: "Umzug in Bayern verstehen" },
              { href: "/reinigung", label: "Reinigung in Bayern verstehen" },
              { href: "/entruempelung", label: "Entrümpelung in Bayern verstehen" },
              { href: "/bueroumzug", label: "Büroumzug und Firmenumzug prüfen" },
              { href: "/einsatzgebiet-regensburg-200km", label: "200-km-Einsatzgebiet ab Regensburg" },
              { href: "/beiladung", label: "Beiladung für Einzelstücke" },
              { href: "/anfrage-mit-preisrahmen", label: "Anfrage mit Preisvorstellung" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-premium premium-scan rounded-[1.8rem] p-6"
              >
                <div className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Weiterführend
                </div>
                <div className="mt-4 text-xl font-bold text-slate-950">{item.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative px-6 pb-28 pt-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="label-premium text-blue-700">FAQ</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Häufige Fragen zum FLOXANT Rechner
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.q} className="card-premium rounded-[1.9rem] p-8">
                <h3 className="text-2xl font-bold text-slate-950">{item.q}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="region" className="section-glow relative px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Regionale Relevanz",
              text: "Der Rechner ist auf Regensburg und Bayern ausgerichtet und bildet die wichtigsten regionalen Services sauber ab.",
            },
            {
              icon: CheckCircle2,
              title: "Klare Suchintention",
              text: "Die Seite beantwortet direkt, was eingeordnet wird, für wen sie gedacht ist und wie die Anfrage weitergeht.",
            },
            {
              icon: Sparkles,
              title: "Sauberer Einstieg",
              text: "Zusatzservices wie Beiladung, Preisvorstellung oder regionale Kostenartikel sind intern logisch angebunden.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="glass-elevated rounded-[2rem] p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
