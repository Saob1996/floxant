import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  ClipboardCheck,
  MapPinned,
  PackageCheck,
  PhoneCall,
  Piano,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import { company } from "@/lib/company";
import { germanText } from "@/lib/german-text";

interface CityServiceClusterProps {
  locale: string;
  city: string;
  citySlug: string;
}

export function CityServiceCluster({ locale, city, citySlug }: CityServiceClusterProps) {
  if (locale !== "de") return null;

  const incompleteServiceCitySlugs = new Set([
    "garmisch-partenkirchen",
    "kulmbach",
    "lindau",
    "muenchen-bogenhausen",
    "muenchen-haidhausen",
    "muenchen-maxvorstadt",
    "muenchen-sendling",
    "muenchen-schwabing",
    "nuernberg-gostenhof",
    "nuernberg-moegeldorf",
    "nuernberg-suedstadt",
    "nuernberg-ziegelstein",
  ]);

  const useServiceFallbacks = incompleteServiceCitySlugs.has(citySlug);

  const services = [
    {
      title: "Umzug",
      hint: `Umzug in ${city}`,
      detail: "Privat, Familie, Gewerbe oder kombinierte Übergabe sauber starten.",
      href: `/umzug-${citySlug}`,
      icon: Truck,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      title: "Entrümpelung",
      hint: `Entrümpelung in ${city}`,
      detail: "Räumung, Abtransport und Entsorgung mit realistischer Vorprüfung.",
      href: useServiceFallbacks ? "/entruempelung" : `/entruempelung-${citySlug}`,
      icon: Trash2,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Klaviertransport",
      hint: `Klaviertransport in ${city}`,
      detail: "Sensible Stücke, enge Wege und Zusatzrisiken separat einordnen.",
      href: useServiceFallbacks ? "/klaviertransport" : `/klaviertransport-${citySlug}`,
      icon: Piano,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      title: "Reinigung",
      hint: `Reinigung in ${city}`,
      detail: "Endreinigung, Objektpflege oder Übergabevorbereitung gezielt planen.",
      href: useServiceFallbacks ? "/reinigung" : `/reinigung-${citySlug}`,
      icon: Sparkles,
      tone: "bg-cyan-50 text-cyan-700",
    },
    {
      title: "Büroumzug",
      hint: `Büroumzug in ${city}`,
      detail: "Arbeitsplätze, Inventar, Zeitfenster und Betriebsablauf abstimmen.",
      href: useServiceFallbacks ? "/bueroumzug" : `/bueroumzug-${citySlug}`,
      icon: Building2,
      tone: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Rechner",
      hint: "Preisrahmen direkt einordnen",
      detail: "Vor der Anfrage Aufwand, Umfang und grobe Richtung schneller sortieren.",
      href: "/rechner",
      icon: PackageCheck,
      tone: "bg-slate-100 text-slate-800",
    },
  ];
  const routingCards = [
    {
      title: "Direkte Anfrage",
      text: `Für ${city}, wenn Umfang, Termin, Zugang und Leistung schon grob klar sind.`,
      href: "/buchung",
      icon: ClipboardCheck,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      title: "Preisrahmen nennen",
      text: "Wenn Budget oder Zielgröße vorliegt und realistisch gespiegelt werden soll.",
      href: "/anfrage-mit-preisrahmen",
      icon: Banknote,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Direkt abstimmen",
      text: "Wenn Fotos, Sonderfälle oder Rückfragen zuerst menschlich geklärt werden sollen.",
      href: "/kontakt",
      icon: PhoneCall,
      tone: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="section-glow relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-elevated rounded-[1.8rem] px-7 py-7 md:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5">
              Regionale Wege
            </div>
            <h2 className="mt-6 text-[2.2rem] font-bold tracking-tight text-slate-950 md:text-[2.7rem]">
              Direkt zur passenden Leistung in {germanText(city, city)}.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
              {company.name} bündelt für {germanText(city, city)} die wichtigsten Anfragewege zwischen
              Umzug, Reinigung, Entrümpelung, Büroumzug und Rechner. So finden Kunden schneller
              die richtige Leistung statt einer unklaren Sammelseite.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Service wählen", "Aufwand einschätzen", "Anfrage starten"].map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-blue-100 bg-blue-50/75 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-blue-700"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="card-premium rounded-[1.8rem] px-7 py-7 md:px-8">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Nächster Schritt
            </div>
            <h3 className="mt-4 text-[1.6rem] font-bold tracking-tight text-slate-950">
              Welche Anfrage passt für {germanText(city, city)}?
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Regensburg bleibt die Basis. Für {germanText(city, city)} prüfen wir Serviceart,
              Umfang, Termin und Route, bevor aus einer Anfrage eine planbare Durchführung wird.
            </p>
            <Link
              href="/standorte"
              className="mt-7 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700"
            >
              Alle Standorte ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-6 rounded-[1.1rem] border border-slate-200 bg-slate-50/80 px-4 py-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                <MapPinned className="h-4 w-4 text-blue-700" />
                Lokales Signal
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Die Stadtseite bleibt nicht isoliert, sondern führt direkt zu passenden Leistungs-, Preis- und Kontaktpfaden.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.href} href={service.href} className="card-premium card-depth rounded-[1.35rem] p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-[1rem] ${service.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[1.28rem] font-bold tracking-tight text-slate-950">
                  {germanText(service.title, service.title)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{germanText(service.hint, service.hint)}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{germanText(service.detail, service.detail)}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Passende Seite öffnen
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {routingCards.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.35rem] border border-slate-200 bg-white px-5 py-5 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-[1rem] ${item.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 flex items-center gap-2 text-[1.2rem] font-bold tracking-tight text-slate-950 transition-colors group-hover:text-blue-700">
                  {item.title}
                  <ArrowRight className="h-4 w-4" />
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
