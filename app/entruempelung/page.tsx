import { Metadata } from "next";
import Link from "next/link";
import {
 ArrowRight,
 Building2,
 Home,
 Leaf,
 MapPin,
 ShieldCheck,
 Trash2,
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
  path: "entruempelung",
  title: "Entrümpelung in Regensburg und Bayern | FLOXANT",
  description:
   "FLOXANT organisiert Entrümpelung, Wohnungsauflösung und fachgerechte Entsorgung in Regensburg und Bayern mit klarer Vorprüfung und besenreiner Übergabe.",
 });
}

export default async function EntrümpelungPillarPage() {
 const dict = await getDictionary("de");

 const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Entrümpelung" },
 ];

 const faqItems = [
  {
   q: "Was umfasst eine Entrümpelung mit FLOXANT?",
   a: "FLOXANT übernimmt Sichtung, Tragearbeit, Abtransport, Sortierung und fachgerechte Entsorgung für Wohnungen, Keller, Häuser und gewerbliche Flächen.",
  },
  {
   q: "Für wen ist der Service sinnvoll?",
   a: "Die Leistung ist für Haushalte, Vermieter, Erbfälle und Unternehmen gedacht, die Räume schnell, diskret und besenrein freibekommen müssen. Für normale Büro- und Gewerbegegenstände gibt es zusätzlich die gezielte Firmenentsorgung.",
  },
  {
   q: "Wovon hängt der Preisrahmen ab?",
   a: "Entscheidend sind Volumen, Materialarten, Zugangswege, Laufstrecken, Demontage, Dringlichkeit und Sonderaufwand. Genau diese Punkte fließen in die Vorprüfung ein.",
  },
  {
   q: "Wie starte ich die Anfrage?",
   a: "Über den FLOXANT Rechner oder die passende Zusatzseite. So entsteht direkt ein klares Bild von Volumen, Zugangswegen und dem unverbindlichen Orientierungsrahmen.",
  },
 ];

 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Entrümpelung", item: "/entruempelung" },
   ]),
   buildServiceJsonLd({
    name: "Entrümpelung in Regensburg und Bayern",
    description:
     "Wohnungsauflösungen, Räumungen und fachgerechte Entsorgung mit FLOXANT in Regensburg und Bayern.",
    path: "/entruempelung",
    areaServed: ["Regensburg", "Bayern"],
   }),
   buildWebPageJsonLd({
    name: "Entrümpelung in Regensburg und Bayern | FLOXANT",
    description:
     "Service-Definition, Ablauf, Einsatzbereiche und direkte Anfrage für Entrümpelung mit FLOXANT.",
    path: "/entruempelung",
    about: [
     "Entrümpelung",
     "Wohnungsauflösung",
     "Regensburg",
     "Bayern",
     "Entsorgung",
    ],
   }),
   buildFaqJsonLd(faqItems),
  ],
 };

 const cityLinks = [
  { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
  { href: "/entruempelung-muenchen", label: "Entrümpelung München" },
  { href: "/entruempelung-nuernberg", label: "Entrümpelung Nürnberg" },
  { href: "/entruempelung-augsburg", label: "Entrümpelung Augsburg" },
  { href: "/entruempelung-landshut", label: "Entrümpelung Landshut" },
  { href: "/entruempelung-passau", label: "Entrümpelung Passau" },
 ];

 const serviceLinks = [
  { href: "/rechner", label: "Entrümpelung direkt einordnen" },
  { href: "/firmenentsorgung", label: "Firmenentsorgung für Büros und Gewerbe" },
  { href: "/kleinmengen-entsorgung", label: "Kleinmengen-Entsorgung prüfen" },
  { href: "/umzug-mit-reinigung", label: "Räumung mit Reinigung kombinieren" },
  { href: "/entruempelung-kosten-regensburg", label: "Kosten in Regensburg einordnen" },
  { href: "/umzug", label: "Umzug und Räumung zusammen planen" },
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
      <span>Entrümpelung mit Schwerpunkt Regensburg und Bayern</span>
     </div>
     <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
      Entrümpelung und Wohnungsauflösung in Regensburg und Bayern
     </h1>
     <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-400">
      FLOXANT organisiert Räumungen für Wohnungen, Häuser, Keller und
              Gewerbeflächen. Diese Seite erklärt klar, was der Service ist, für wen er
      gedacht ist, wann er sinnvoll wird und wie fachgerechte Entsorgung eingebunden ist.
     </p>
    </div>
   </section>

   <section className="px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
     {[
      {
       icon: Trash2,
       title: "Was ist das?",
       text: "Ein Service für Sichtung, Räumung, Tragearbeit, Abtransport und geregelte Entsorgung.",
      },
      {
       icon: Home,
       title: "Für wen?",
       text: "Für Haushalte, Vermieter, Nachlassfälle und Unternehmen mit klarer Räumungsaufgabe.",
      },
      {
       icon: Building2,
       title: "Wann sinnvoll?",
       text: "Vor Verkauf, Sanierung, Übergabe, Neuvermietung oder wenn Keller und Nebenräume systematisch leer werden müssen.",
      },
      {
       icon: ShieldCheck,
       title: "Wie läuft es ab?",
       text: "Volumen und Zugangswege aufnehmen, Materialarten klären, Abtransport planen und Räume besenrein übergeben.",
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
      Was FLOXANT bei der Entrümpelung vom Standard unterscheidet
     </h2>
     <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
       <Leaf className="mb-4 h-8 w-8 text-primary" />
       <h3 className="mb-4 text-2xl font-bold text-white">Fachgerechte Entsorgung</h3>
       <p className="text-slate-300">
        Es geht nicht nur um das Wegtragen. FLOXANT trennt Materialien, organisiert
        Transport und denkt die spätere Entsorgung im Ablauf mit.
       </p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
       <Home className="mb-4 h-8 w-8 text-primary" />
       <h3 className="mb-4 text-2xl font-bold text-white">Diskretion und Übergabe</h3>
       <p className="text-slate-300">
        Gerade bei Nachlässen, Vermietung oder schwierigen Objektlagen zählen ruhige
        Kommunikation, klare Grenzen und besenreine Ergebnisse.
       </p>
      </div>
     </div>
    </div>
   </section>

   <section className="border-y border-white/5 bg-slate-950/50 py-20">
    <div className="container mx-auto max-w-5xl px-4">
     <h2 className="mb-8 text-4xl font-bold tracking-tight text-white">
      Regionale und operative Einordnung
     </h2>
     <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
       <h3 className="mb-4 text-xl font-bold text-white">Regensburg und Bayern</h3>
       <p className="text-slate-300">
        Der Fokus auf Regensburg und Bayern hilft bei realistischer Terminierung, kurzen
        Wegen und einer sinnvollen Kombination mit Reinigung oder Umzug.
       </p>
      </div>
      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-8 text-white">
       <h3 className="mb-4 text-xl font-bold text-primary">Direkter Einstieg</h3>
       <p className="text-slate-300">
        Über den Rechner oder die passende Zusatzseite für Kleinmengen lässt sich der
        Bedarf schnell und sauber eingrenzen.
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
     <h2 className="mb-8 text-3xl font-bold text-white">Häufige Fragen zur Entrümpelung</h2>
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

   <section id="booking" className="border-t border-white/5 bg-slate-900 py-24">
    <div className="container px-4">
     <div className="mx-auto mb-16 max-w-3xl text-center">
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
       Entrümpelung in Regensburg oder Bayern anfragen
      </h2>
      <p className="text-lg text-slate-400">
       Nutzen Sie den Rechner für einen klaren Orientierungsrahmen und eine saubere
       Einsatzvorbereitung.
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
      Wichtige interne Einstiege rund um Räumung und Entsorgung
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
      Entrümpelung lokal in wichtigen Regionen
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
