import { Metadata } from "next";
import Link from "next/link";
import { Calculator, CheckCircle2, MapPin, Sparkles, Wallet } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
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
    <main className="min-h-screen bg-background pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%)]" />

      <section className="relative z-10 px-6 pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
              <Calculator className="h-4 w-4" />
              FLOXANT Rechner
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-7xl">
              Orientierungsrahmen für Umzug, Reinigung, Entrümpelung und Büroumzug
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/50 md:text-xl">
              Der Rechner ist der produktive Einstieg für Regensburg, Bayern und den erweiterten
              200-km-Einsatzraum. Er ordnet
              Aufwand, Umfang und Zusatzleistungen so ein, dass aus einer losen Idee eine gut
              belastbare Vorprüfung wird.
            </p>
          </div>

          <div className="mb-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Was ist das?",
                text: "Ein strukturierter Intake für Umzug, Reinigung, Entrümpelung und Büroumzug mit klarer Datenerfassung statt offener Kontaktwunschliste.",
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
                text: "Die Vorprüfung ersetzt keine finale Einsatzabstimmung, schafft aber eine wesentlich bessere Grundlage für Termin, Team und Angebot.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <h2 className="mb-4 text-xl font-bold text-white">{item.title}</h2>
                <p className="leading-relaxed text-white/60">{item.text}</p>
              </div>
            ))}
          </div>

          <ServiceRechnerHub dic={dict} />
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Wie der Rechner die Einschätzung einordnet</h2>
            <p className="mt-4 max-w-3xl text-lg text-white/50">
              Jede Ausgabe wird als Vorprüfung erklärt. Entscheidend sind Umfang, Zugang,
              Region, Terminlage und Zusatzleistungen. So bleibt der Rechner glaubwürdig und
              operativ anschlussfähig.
            </p>
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
                text: "Die wichtigsten 2 bis 5 Faktoren werden pro Service benannt, damit Nutzer die Einordnung nachvollziehen können.",
              },
              {
                icon: Sparkles,
                title: "Preisvorstellung möglich",
                text: "Wer bereits ein Zielbudget hat, kann es später mitgeben. System-Einschätzung und Kundenwunsch bleiben dabei sauber getrennt.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                  <Icon className="mb-5 h-8 w-8 text-blue-400" />
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/60">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Direkte Wege vom Rechner zu den passenden Seiten</h2>
            <p className="mt-4 max-w-3xl text-lg text-white/50">
              Der Rechner ist nicht isoliert, sondern mit den wichtigsten Service- und
              Zusatzseiten verbunden. So bleiben Anfrage, Erklärung und regionale Einordnung
              sauber crawlbar.
            </p>
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
                className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-white">Häufige Fragen zum FLOXANT Rechner</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                <h3 className="mb-4 text-xl font-bold text-white">{item.q}</h3>
                <p className="text-white/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 px-6 py-16">
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
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <Icon className="mb-5 h-8 w-8 text-blue-400" />
                <h2 className="mb-3 text-xl font-bold text-white">{item.title}</h2>
                <p className="text-white/60">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
