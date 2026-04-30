import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Clock3, MapPin, Radar, Route, ShieldCheck, Sparkles, Trash2, Truck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { PRIORITY_SERVICE_AREA_LINKS, SERVICE_AREA_SERVICES, SERVICE_AREA_ZONES } from "@/lib/service-area-200km";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildServiceJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Welche Orte deckt FLOXANT rund um Regensburg ab?",
  a: "FLOXANT prüft Anfragen im direkten Raum Regensburg, in der Oberpfalz, in Niederbayern, in Franken, in München, Augsburg, Passau und weiteren deutschen Städten im ungefähren 200-km-Korridor.",
 },
 {
  q: "Welche Leistungen sind im 200-km-Einsatzgebiet relevant?",
  a: "Besonders relevant sind Umzug, Entrümpelung, Büroumzug, Reinigung, Umzug mit Reinigung, Beiladung, Kleinmengen-Entsorgung und Express-Anfragen.",
 },
 {
  q: "Ist jeder Ort automatisch verfügbar?",
  a: "Nein. FLOXANT prüft jeden Einsatz nach Entfernung, Terminlage, Leistungsumfang, Zugang, Teamkapazität und Fahrzeugplanung. Der Rechner liefert zuerst eine unverbindliche Orientierung.",
 },
 {
  q: "Warum ist Regensburg der operative Kern?",
  a: "Regensburg liegt zentral für Oberpfalz, Niederbayern und wichtige bayerische Achsen. Dadurch lassen sich Nahbereich, Regionalring und 200-km-Ausbaukorridor sauber strukturieren.",
 },
];

const serviceIcons = [Truck, Trash2, Building2, Sparkles];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "einsatzgebiet-regensburg-200km",
  title: "Umzug, Entrümpelung & Büroumzug im 200-km-Raum Regensburg",
  description:
   "FLOXANT Einsatzgebiet rund um Regensburg: Umzug, Entrümpelung, Büroumzug und Reinigung in Oberpfalz, Niederbayern, Franken, München und Bayern.",
  keywords: [
   "Umzug 200 km Regensburg",
   "Entrümpelung rund um Regensburg",
   "Büroumzug Bayern",
   "Reinigung Bayern",
   "FLOXANT Einsatzgebiet",
  ],
 });
}

export default async function RegensburgServiceArea200KmPage() {
 const dict = await getDictionary("de");
 const allCities = SERVICE_AREA_ZONES.flatMap((zone) => zone.cities);

 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Einsatzgebiet rund um Regensburg",
    description:
     "Servicegebiet für Umzug, Entrümpelung, Büroumzug und Reinigung im ungefähren 200-km-Raum um Regensburg.",
    path: "/einsatzgebiet-regensburg-200km",
    about: ["Regensburg", "200 km Einsatzgebiet", "Umzug", "Entrümpelung", "Büroumzug", "Reinigung"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Einsatzgebiet Regensburg 200 km", item: "/einsatzgebiet-regensburg-200km" },
   ]),
   ...SERVICE_AREA_SERVICES.map((service) =>
    buildServiceJsonLd({
     name: `${service.name} im 200-km-Raum Regensburg`,
     description: service.description,
     path: service.href,
     areaServed: ["Regensburg", "Bayern", "Nürnberg", "München", "Passau"],
    })
   ),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "Wichtige Städte im FLOXANT Einsatzgebiet",
    itemListElement: allCities.map((city, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: city.name,
     url: `https://www.floxant.de/umzug-${city.slug}`,
     description: `${city.role}, ungefähr ${city.distance} von Regensburg entfernt.`,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Einsatzgebiet 200 km" }]} />

   <section className="relative overflow-hidden px-6 pb-16 pt-10">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.14),transparent_55%)]" />
    <div className="absolute left-1/2 top-28 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-blue-300/15" />
    <div className="absolute left-1/2 top-16 -z-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-blue-300/10" />
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
      <FloxantSymbolLayer variant="moving" density="soft" />
    </div>
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
     <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
       <Radar className="h-4 w-4" />
       Einsatzradius ab Regensburg
      </div>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
       Umzug, Entrümpelung und Büroumzug im 200-km-Raum um Regensburg
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
       FLOXANT plant Dienstleistungen aus dem operativen Kern Regensburg heraus: direkte
       Nahbereiche, starke Regionalachsen und größere Einsätze im deutschen 200-km-Korridor.
       Entscheidend sind nicht bloße Entfernung, sondern Umfang, Zugang, Terminlage und
       passende Kapazität.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
       <Link
        href="/rechner"
        className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-500"
       >
        Einsatz prüfen
        <ArrowRight className="h-4 w-4" />
       </Link>
       <Link
        href="/express-anfrage"
        className="inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-100"
       >
        Express-Anfrage
        <Clock3 className="h-4 w-4" />
       </Link>
      </div>
     </div>

     <div className="glass-elevated premium-scan rounded-[2.4rem] p-7 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between">
       <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">Radius-Modell</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">3 Einsatzzonen</h2>
       </div>
       <Route className="h-9 w-9 text-blue-600" />
      </div>
      <div className="mt-7 space-y-4">
       {SERVICE_AREA_ZONES.map((zone) => (
        <div key={zone.id} className="rounded-[1.5rem] border border-slate-200 bg-white/92 p-5 shadow-sm shadow-slate-950/5">
         <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-950">{zone.title}</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
           {zone.radius}
          </span>
         </div>
         <p className="mt-3 text-sm leading-relaxed text-slate-600">{zone.description}</p>
        </div>
       ))}
      </div>
     </div>
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto max-w-7xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">Leistungsschwerpunkte</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
       Services für Regensburg, Bayern und den erweiterten Einsatzraum
      </h2>
     </div>
     <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {SERVICE_AREA_SERVICES.map((service, index) => {
       const Icon = serviceIcons[index] || Truck;
       return (
        <Link
         key={service.href}
         href={service.href}
         className="card-premium premium-scan group rounded-[1.75rem] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/25"
        >
         <Icon className="h-7 w-7 text-blue-600" />
         <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{service.name}</h3>
         <p className="mt-4 text-sm leading-relaxed text-slate-600">{service.description}</p>
         <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
          Service ansehen
          <ArrowRight className="h-3.5 w-3.5" />
         </span>
        </Link>
       );
      })}
     </div>
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto max-w-7xl space-y-6">
     {SERVICE_AREA_ZONES.map((zone) => (
      <div key={zone.id} className="glass-elevated rounded-[2rem] p-6 md:p-8">
       <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
         <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">{zone.radius}</div>
         <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{zone.title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">{zone.description}</p>
       </div>
       <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {zone.cities.map((city) => (
         <div
          key={city.slug}
          className="group rounded-[1.25rem] border border-slate-200 bg-white/92 p-4 shadow-sm shadow-slate-950/5 transition-all hover:border-blue-300"
         >
          <Link href={`/umzug-${city.slug}`} className="flex items-start justify-between gap-3">
           <div>
            <h3 className="font-semibold text-slate-950 group-hover:text-blue-700">{city.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{city.role}</p>
           </div>
           <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500">{city.distance}</span>
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-2">
           {SERVICE_AREA_SERVICES.map((service) => (
            <Link
             key={service.href}
             href={`/${service.slugPrefix}-${city.slug}`}
             className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-blue-300 hover:text-slate-950"
            >
             {service.name}
            </Link>
           ))}
          </div>
         </div>
        ))}
       </div>
      </div>
     ))}
    </div>
   </section>

   <section className="px-6 pb-12">
    <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,0.98))] p-7 md:p-9 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
     <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
       <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">Starke Einstiege</div>
       <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Wichtige Service-Ort-Kombinationen</h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">
       Diese Links verbinden die stärksten Suchintentionen direkt mit passenden Leistungsseiten.
      </p>
     </div>
     <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {PRIORITY_SERVICE_AREA_LINKS.map((item) => (
       <Link
        key={item.href}
        href={item.href}
       className="card-premium rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-blue-400/25 hover:text-slate-950"
       >
        {item.label}
       </Link>
      ))}
     </div>
    </div>
   </section>

   <section className="section-glow px-6 py-16">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
     <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">Anfrage vorbereiten</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
       Rechner zuerst, finale Planung danach
      </h2>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
       <p>
        Der Einsatzradius hilft bei der Orientierung, ersetzt aber nicht die operative Prüfung.
        Gerade bei 100 bis 200 km entscheidet der konkrete Auftrag: Volumen, Teamgröße,
        Etagen, Haltezone, Reinigung, Entsorgung, IT-Aufwand und Terminfenster.
       </p>
       <p>
        Deshalb zeigt FLOXANT zuerst einen unverbindlichen Orientierungsrahmen und prüft
        danach, welche Route und welches Team realistisch passen.
       </p>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
       {[
        { icon: MapPin, text: "Ort und Strecke" },
        { icon: ShieldCheck, text: "Zugang und Aufwand" },
        { icon: Clock3, text: "Termin und Kapazität" },
       ].map((item) => {
        const Icon = item.icon;
        return (
        <div key={item.text} className="rounded-2xl border border-slate-200 bg-white/92 p-4 shadow-sm shadow-slate-950/5">
          <Icon className="mb-3 h-5 w-5 text-blue-600" />
          <div className="text-sm font-semibold text-slate-950">{item.text}</div>
        </div>
        );
       })}
      </div>
     </div>
     <div className="glass-elevated rounded-[2rem] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
      <SmartBookingWizard dict={{ common: dict.common, calculator: dict.calculator }} />
     </div>
    </div>
   </section>

   <section className="section-glow px-6 py-16">
    <div className="mx-auto max-w-5xl">
     <h2 className="text-3xl font-semibold tracking-tight text-slate-950">FAQ zum FLOXANT Einsatzgebiet</h2>
     <div className="mt-8 space-y-4">
      {faqItems.map((item) => (
       <div key={item.q} className="card-premium rounded-[1.5rem] p-6">
        <h3 className="text-lg font-semibold text-slate-950">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
       </div>
      ))}
     </div>
    </div>
   </section>
  </main>
 );
}
