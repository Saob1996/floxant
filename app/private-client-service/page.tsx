import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crown, Gem, Home, KeyRound, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { PrivateClientInquiryForm } from "@/components/PrivateClientInquiryForm";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildServiceJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Was ist der FLOXANT Private Client Service?",
  a: "Der Private Client Service ist eine diskrete Kombination aus Umzug, Reinigung, Räumung und Entsorgung für Villen, Anwesen, große Häuser, Penthouses und hochwertige Interieurs in Bayern und Baden-Württemberg.",
 },
 {
  q: "Warum gibt es keine öffentliche Kalkulation?",
  a: "Private Residences, Kunst, Designmöbel, sensible Räume und besondere Zeitfenster lassen sich nicht seriös öffentlich kalkulieren. FLOXANT arbeitet hier mit persönlicher Vorprüfung, Schutzkonzept und individueller Einsatzplanung.",
 },
 {
  q: "Welche Leistungen sind kombinierbar?",
  a: "Möglich sind hochwertiger Umzug, Verpackung, Möbel- und Kunstschutz, Endreinigung, Grundreinigung, diskrete Räumung, Entsorgung normaler Haushalts- und Einrichtungsgegenstände sowie koordinierte Übergabe.",
 },
 {
  q: "Welche Regionen werden betreut?",
  a: "Der Schwerpunkt liegt auf Bayern und Baden-Württemberg, besonders auf München, Starnberg, Tegernsee, Regensburg, Nürnberg, Stuttgart, Baden-Baden, Heidelberg, Freiburg und Ulm.",
 },
 {
  q: "Welche Grenzen gelten bei Entsorgung und Räumung?",
  a: "FLOXANT übernimmt nur transportfähige und regulär entsorgbare Gegenstände. Gefahrstoffe, Asbest, Chemikalien, kontaminierte Materialien und genehmigungspflichtige Sonderabfälle sind ausgeschlossen.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "private-client-service",
  title: "FLOXANT Private Client | Anwesen, Umzug & Reinigung",
  description:
   "Diskreter Private Client Service für Villen, Anwesen und große Häuser: Umzug, Reinigung, Räumung und Entsorgung für hochwertige Interieurs in Bayern und Baden-Württemberg.",
  keywords: [
   "Private Client Service Bayern",
   "Luxus Umzug Bayern",
   "Private Client Umzug",
   "Villen Reinigung Baden-Württemberg",
   "Anwesen räumen lassen",
   "diskreter Umzug Villa",
  ],
 });
}

export default function PrivateClientServicePage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "FLOXANT Private Client", item: "/private-client-service" },
   ]),
   buildWebPageJsonLd({
    name: "FLOXANT Private Client Service",
    description:
     "Diskreter Service für Villen, Anwesen, große Häuser und hochwertige Interieurs in Bayern und Baden-Württemberg.",
    path: "/private-client-service",
    about: [
     "Private Client",
     "Private Client Service",
     "Luxusumzug",
     "Villenreinigung",
     "Anwesen",
     "Bayern",
     "Baden-Württemberg",
    ],
   }),
   buildServiceJsonLd({
    name: "FLOXANT Private Client in Bayern und Baden-Württemberg",
    description:
     "Kombinierter Service für Umzug, Reinigung, Räumung und Entsorgung in Villen, Anwesen, großen Häusern und hochwertigen Privathaushalten.",
    path: "/private-client-service",
    serviceType: "Private Client Service für Villen und Anwesen",
    areaServed: ["Bayern", "Baden-Württemberg", "München", "Stuttgart", "Regensburg", "Baden-Baden"],
   }),
   buildFaqJsonLd(faqItems),
  ],
 };

 const pillars = [
  {
   icon: Crown,
   title: "Villen- und Anwesenumzug",
   text: "Koordinierter Umzug mit Schutzkonzept für Designmöbel, Kunst, empfindliche Oberflächen, Garderoben, Bibliotheken und sensible Privatbereiche.",
  },
  {
   icon: Sparkles,
   title: "Private Residence Cleaning",
   text: "Reinigung mit Blick auf Materialien, Raumwirkung, Übergabe, Personalführung und die Erwartungen gehobener Haushalte.",
  },
  {
   icon: Leaf,
   title: "Diskrete Räumung und Entsorgung",
   text: "Sortierung, Abtransport und Entsorgung normaler Haushalts- und Einrichtungsgegenstände ohne Sonderabfall-Risiko.",
  },
 ];

 const process = [
  "Persönlicher Erstkontakt",
  "Diskrete Objekt- und Inventarprüfung",
  "Schutzkonzept für Räume, Wege und Werte",
  "Kuratiertes Team und Zeitfenster",
  "Umsetzung mit Übergabeprotokoll",
 ];

 return (
  <main className="private-client min-h-screen overflow-hidden bg-[#040302] text-[#F6EBDD]">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <style
    dangerouslySetInnerHTML={{
     __html: `
      .private-client {
       --gold: #D8B76E;
       --champagne: #F6EBDD;
       --muted-champagne: rgba(246, 235, 221, 0.62);
       --oxblood: #2A0907;
       --mahogany: #120907;
       font-family: "Cormorant Garamond", "Bodoni 72", "Didot", Georgia, serif;
      }
      .private-client .private-copy {
       font-family: "Avenir Next", "Optima", "Segoe UI", sans-serif;
      }
     `,
    }}
   />

   <header className="absolute inset-x-0 top-0 z-30 px-6 py-7">
    <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#D8B76E]/18 bg-[#080604]/55 px-5 py-3 backdrop-blur-xl">
     <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8B76E]/40 text-[#D8B76E]">
       <Gem className="h-5 w-5" />
      </div>
      <div>
       <div className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#F6EBDD]">FLOXANT</div>
       <div className="private-copy text-[10px] uppercase tracking-[0.22em] text-[#D8B76E]/75">Private Client</div>
      </div>
     </Link>
     <a
      href={`mailto:${company.email}?subject=${encodeURIComponent("Private Client Anfrage")}`}
      className="private-copy hidden rounded-full border border-[#D8B76E]/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8B76E] transition hover:bg-[#D8B76E] hover:text-[#120D08] sm:inline-flex"
     >
      Privat kontaktieren
     </a>
    </div>
   </header>

   <section className="relative px-6 pb-24 pt-40 md:pb-32 md:pt-52">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(216,183,110,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(90,22,12,0.52),transparent_38%),linear-gradient(135deg,#040302_0%,#120907_44%,#050302_100%)]" />
    <div className="absolute left-1/2 top-24 -z-10 h-[680px] w-[680px] -translate-x-1/2 rounded-full border border-[#D8B76E]/10" />
    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040302] to-transparent" />

    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
     <div>
      <div className="private-copy mb-7 inline-flex items-center gap-3 rounded-full border border-[#D8B76E]/20 bg-[#D8B76E]/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B76E]">
       <ShieldCheck className="h-4 w-4" />
       Diskret in Bayern und Baden-Württemberg
      </div>
      <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-[#F6EBDD] md:text-7xl lg:text-[6.7rem]">
       Private Client Service für Villen und Anwesen.
      </h1>
      <p className="private-copy mt-8 max-w-2xl text-lg leading-relaxed text-[#E6D8C3]/62">
       Für große Häuser, Villen, Penthouses und hochwertige Interieurs, bei denen Umzug,
       Reinigung, Räumung und Entsorgung nicht wie ein Standardauftrag behandelt werden dürfen.
       FLOXANT plant persönlich, diskret und mit Blick auf Werte, Räume und Vertrauen.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
       <a
        href="#private-anfrage"
        className="private-copy inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#D8B76E] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#120D08] transition hover:bg-[#F0D58B]"
       >
        Diskrete Anfrage
        <ArrowRight className="h-4 w-4" />
       </a>
       <a
        href={`tel:${company.phoneRaw.replace(/\s/g, "")}`}
        className="private-copy inline-flex h-14 items-center justify-center rounded-full border border-[#D8B76E]/22 px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8D2A2] transition hover:border-[#D8B76E]/50 hover:bg-[#D8B76E]/8"
       >
        Persönlich sprechen
       </a>
      </div>
     </div>

     <div className="relative rounded-[2.5rem] border border-[#D8B76E]/18 bg-[#0A0604]/72 p-5 shadow-[0_34px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#D8B76E]/16 bg-[linear-gradient(145deg,rgba(216,183,110,0.22),rgba(42,9,7,0.35)),radial-gradient(circle_at_50%_24%,rgba(246,235,221,0.16),transparent_28%)] p-8">
       <div className="flex h-full flex-col justify-between">
        <div>
         <div className="private-copy text-[10px] uppercase tracking-[0.28em] text-[#D8B76E]">No public queue</div>
         <p className="mt-6 text-4xl font-medium leading-tight text-[#F6EBDD] md:text-5xl">
          Werte schützen. Räume respektieren. Abläufe beherrschen.
         </p>
        </div>
        <div className="grid gap-3 private-copy">
         {["Kunst und Designobjekte", "Diskrete Zeitfenster", "Reinigung und Übergabe", "Reguläre Entsorgung"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-full border border-[#D8B76E]/14 bg-black/20 px-4 py-3 text-sm text-[#E6D8C3]/70">
           <span className="h-1.5 w-1.5 rounded-full bg-[#D8B76E]" />
           {item}
          </div>
         ))}
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>

   <section className="px-6 py-20">
    <div className="mx-auto max-w-7xl">
     <div className="mb-12 max-w-3xl">
      <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Drei Ebenen</div>
      <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
       Ein Service, der Umzug, Reinigung und Entsorgung zusammen denkt.
      </h2>
     </div>

     <div className="grid gap-5 lg:grid-cols-3">
      {pillars.map((item) => {
       const Icon = item.icon;
       return (
        <article key={item.title} className="rounded-[2rem] border border-[#D8B76E]/16 bg-[#0B0805] p-8">
         <Icon className="mb-8 h-8 w-8 text-[#D8B76E]" />
         <h3 className="text-3xl font-medium tracking-tight text-[#F6EBDD]">{item.title}</h3>
         <p className="private-copy mt-5 text-sm leading-relaxed text-[#E6D8C3]/56">{item.text}</p>
        </article>
       );
      })}
     </div>
    </div>
   </section>

   <section className="border-y border-[#D8B76E]/10 bg-[#0A0604] px-6 py-20">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
     <div>
      <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Nicht standardisiert</div>
      <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
       Keine öffentliche Standardabwicklung. Keine Massenlogik.
      </h2>
      <p className="private-copy mt-6 text-sm leading-relaxed text-[#E6D8C3]/56">
       Bei Villen und Anwesen zählt nicht nur Volumen. Entscheidend sind Zugang, Wegeführung,
       Materialschutz, Vertraulichkeit, Personal, Terminfenster, Nachbarn, Hausverwaltung,
       Kunst, Designobjekte und die gewünschte Unsichtbarkeit der Arbeit.
      </p>
     </div>
     <div className="grid gap-4 md:grid-cols-2">
      {[
       { icon: KeyRound, title: "Diskretion", text: "Abstimmung mit Eigentümern, Assistenz, Hausverwaltung oder Family Office." },
       { icon: Home, title: "Objektverständnis", text: "Schutz für Böden, Wände, Treppen, Aufzüge, Einfahrten und sensible Räume." },
       { icon: Gem, title: "Werte", text: "Umgang mit Designmöbeln, Kunst, Sammlungen, Bibliotheken und empfindlichen Oberflächen." },
       { icon: ShieldCheck, title: "Grenzen", text: "Keine Gefahrstoffe oder Sonderabfälle. Keine falschen Zusagen für regulierte Materialien." },
      ].map((item) => {
       const Icon = item.icon;
       return (
        <div key={item.title} className="rounded-[1.6rem] border border-[#D8B76E]/12 bg-black/20 p-6">
         <Icon className="mb-5 h-6 w-6 text-[#D8B76E]" />
         <h3 className="text-2xl font-medium text-[#F6EBDD]">{item.title}</h3>
         <p className="private-copy mt-3 text-sm leading-relaxed text-[#E6D8C3]/52">{item.text}</p>
        </div>
       );
      })}
     </div>
    </div>
   </section>

   <section className="px-6 py-20">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr]">
     <div>
      <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Ablauf</div>
      <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">Ruhig. Persönlich. Kontrolliert.</h2>
     </div>
     <div className="space-y-3">
      {process.map((step, index) => (
       <div key={step} className="grid grid-cols-[3.5rem_1fr] items-center rounded-full border border-[#D8B76E]/12 bg-[#0B0805] p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8B76E]/12 text-sm font-semibold text-[#D8B76E]">
         {String(index + 1).padStart(2, "0")}
        </div>
        <div className="private-copy text-sm font-medium text-[#E6D8C3]/72">{step}</div>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="px-6 py-20">
    <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#D8B76E]/14 bg-[linear-gradient(135deg,rgba(216,183,110,0.12),rgba(42,9,7,0.46))] p-8 md:p-12">
     <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
       <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Region</div>
       <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
        Bayern und Baden-Württemberg.
       </h2>
       <p className="private-copy mt-6 text-sm leading-relaxed text-[#E6D8C3]/58">
        FLOXANT betreut hochwertige Privathaushalte und Anwesen in Süddeutschland. Besonders relevant:
        München, Starnberg, Tegernsee, Regensburg, Nürnberg, Stuttgart, Baden-Baden, Heidelberg,
        Freiburg, Ulm und die umliegenden Regionen.
       </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
       {["München", "Starnberg", "Tegernsee", "Regensburg", "Nürnberg", "Stuttgart", "Baden-Baden", "Heidelberg", "Freiburg", "Ulm"].map((city) => (
        <div key={city} className="rounded-full border border-[#D8B76E]/16 bg-black/20 px-5 py-3 private-copy text-sm font-medium text-[#E6D8C3]/70">
         {city}
        </div>
       ))}
      </div>
     </div>
    </div>
   </section>

   <section id="private-anfrage" className="px-6 py-20">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
     <div>
      <div className="private-copy text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D8B76E]">Private Bureau</div>
      <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#F6EBDD] md:text-6xl">
       Beginnen Sie mit wenigen vertraulichen Eckdaten.
      </h2>
      <p className="private-copy mt-6 text-sm leading-relaxed text-[#E6D8C3]/58">
       FLOXANT meldet sich persönlich. Die weitere Planung erfolgt erst nach diskreter Einordnung
       von Objekt, Umfang, Zugang, Schutzbedarf und gewünschtem Servicegrad.
      </p>
     </div>
     <PrivateClientInquiryForm />
    </div>
   </section>

   <section className="border-t border-[#D8B76E]/10 px-6 py-20">
    <div className="mx-auto max-w-6xl">
     <h2 className="text-4xl font-medium tracking-tight text-[#F6EBDD]">Häufige Fragen</h2>
     <div className="mt-8 grid gap-4 md:grid-cols-2">
      {faqItems.map((item) => (
       <div key={item.q} className="rounded-[1.7rem] border border-[#D8B76E]/12 bg-[#0B0805] p-7">
        <h3 className="text-2xl font-medium text-[#F6EBDD]">{item.q}</h3>
        <p className="private-copy mt-4 text-sm leading-relaxed text-[#E6D8C3]/54">{item.a}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <footer className="border-t border-[#D8B76E]/10 px-6 py-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
     <div>
      <div className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#F6EBDD]">FLOXANT Private Client</div>
      <p className="private-copy mt-2 text-sm text-[#E6D8C3]/45">Diskreter Service für Villen, Anwesen und hochwertige Privathaushalte.</p>
     </div>
     <div className="private-copy flex flex-wrap gap-3 text-sm text-[#E6D8C3]/55">
      <Link href="/" className="hover:text-[#D8B76E]">Startseite</Link>
      <span>/</span>
      <Link href="/impressum" className="hover:text-[#D8B76E]">Impressum</Link>
      <span>/</span>
      <Link href="/datenschutz" className="hover:text-[#D8B76E]">Datenschutz</Link>
     </div>
    </div>
   </footer>
  </main>
 );
}
