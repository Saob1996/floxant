import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin, PackageOpen, Route, ShieldCheck, Truck } from "lucide-react";

import { BackhaulOffersBoard } from "@/components/BackhaulOffersBoard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { FALLBACK_BACKHAUL_OFFERS, normalizeBackhaulOffer, type BackhaulOffer } from "@/lib/backhaul-offers";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildServiceJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

export const dynamic = "force-dynamic";

const faqItems = [
 {
  q: "Was ist eine Leer-Rückfahrt bei FLOXANT?",
  a: "Eine Leer-Rückfahrt entsteht, wenn ein Fahrzeug nach einem Auftrag ohnehin Richtung Regensburg zurückfährt und noch freie Kapazität hat. Diese freie Fläche kann für Möbel, Büroinventar, Kartons, Paletten, Einzelstücke oder Teilmengen genutzt werden.",
 },
 {
  q: "Warum ist eine Rückfahrt oft günstiger?",
  a: "Weil Fahrzeug, Fahrer und Route teilweise bereits eingeplant sind. Der faire Preis hängt trotzdem von Ladeort, Zielort, Volumen, Gewicht, Etage, Zeitfenster und Umweg ab.",
 },
 {
  q: "Für welche Richtungen ist der Service gedacht?",
  a: "Der Schwerpunkt liegt auf deutschlandweiten Rückfahrten Richtung Regensburg sowie Zielorten im Umkreis von etwa 150 km um Regensburg. Besonders interessant sind flexible Termine aus Bayern, Franken, Baden-Württemberg, Hessen und angrenzenden Regionen.",
 },
 {
  q: "Ist der Service auch für Firmen und große Büros geeignet?",
  a: "Ja. Wenn Büroinventar, Paletten, Archivkartons, Messematerial oder Möbelstücke zur freien Rückfahrt passen, kann FLOXANT die Mitnahme für Firmen, Kanzleien, Praxen, Agenturen und große Büros prüfen.",
 },
 {
  q: "Was passiert, wenn ein Abholort nur unterwegs liegt?",
  a: "Wenn der Abholort sinnvoll auf der Route liegt, prüfen wir den zusätzlichen Umweg. Der mögliche Mehrpreis wird vorher transparent besprochen und nicht automatisch als Festpreis zugesagt.",
 },
 {
  q: "Ist eine Leer-Rückfahrt garantiert verfügbar?",
  a: "Nein. FLOXANT prüft jede Anfrage nach Datum, Route, Fahrzeugkapazität und Ladeaufwand. Wenn es passt, entsteht ein fairer Rückfahrt-Preis; wenn nicht, empfehlen wir einen normalen Transport oder eine Beiladung.",
 },
];

async function loadOffers(): Promise<BackhaulOffer[]> {
 try {
  const { data, error } = await supabase
   .from("bookings")
   .select("*")
   .eq("service", "leerfahrt_offer")
   .eq("status", "active")
   .order("timestamp", { ascending: false });

  if (error) throw error;
  const offers = (data || []).map(normalizeBackhaulOffer).filter((offer) => offer.status === "active");
  return offers.length ? offers : FALLBACK_BACKHAUL_OFFERS;
 } catch {
  return FALLBACK_BACKHAUL_OFFERS;
 }
}

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "leerfahrt-rueckfahrt",
  title: "Leer-Rückfahrt nach Regensburg | Firmen, Möbel & Beiladung",
  description:
   "FLOXANT bietet freie Leer-Rückfahrten Richtung Regensburg und ca. 150 km Umkreis: faire Mitnahme für Firmen, Büroinventar, Möbel, Kartons, Paletten und Teiltransporte.",
  keywords: [
   "Leer Rückfahrt Regensburg",
   "Leerfahrt Umzug Regensburg",
   "Rücktransport nach Regensburg",
   "Beiladung Rückfahrt",
   "Firmen Leerfahrt Regensburg",
   "günstiger Möbeltransport Regensburg",
  ],
 });
}

export default async function LeerfahrtRueckfahrtPage() {
 const offers = await loadOffers();

 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Leer-Rückfahrt", item: "/leerfahrt-rueckfahrt" },
   ]),
   buildWebPageJsonLd({
    name: "Leer-Rückfahrt nach Regensburg",
    description:
     "FLOXANT nutzt freie Fahrzeugkapazität auf Rückfahrten Richtung Regensburg für faire Beiladung, Firmenlieferungen, Möbeltransport und Teiltransporte.",
    path: "/leerfahrt-rueckfahrt",
    about: ["Leer-Rückfahrt", "Leerfahrt", "Beiladung", "Regensburg", "Rücktransport", "Möbeltransport", "Büroinventar", "Firmenlieferung"],
   }),
   buildServiceJsonLd({
    name: "Leer-Rückfahrt und Beiladung Richtung Regensburg",
    description:
     "Faire Rückfahrt-Preise für Umzugsgut, Firmeninventar, Möbel, Kartons, Paletten und Teilmengen, wenn Route und freie Fahrzeugkapazität passen.",
    path: "/leerfahrt-rueckfahrt",
    serviceType: "Leer-Rückfahrt",
    areaServed: ["Regensburg", "Bayern", "Nürnberg", "München", "Deutschland"],
   }),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "Aktuelle FLOXANT Leer-Rückfahrten",
    itemListElement: offers.map((offer, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: offer.title,
     description: `${offer.origin} nach ${offer.destination}, ${offer.destinationRadius}. ${offer.availableCapacity}`,
     url: `${company.url}/leerfahrt-rueckfahrt#leerfahrt-anfrage`,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen bg-background text-white">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Leer-Rückfahrt" }]} />

   <section className="relative overflow-hidden px-6 pb-16 pt-14">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.14),transparent_52%)]" />
    <div className="absolute right-[-10%] top-20 -z-10 h-[520px] w-[520px] rounded-full border border-emerald-300/10" />
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
     <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
       <Truck className="h-4 w-4" />
       freie Rückfahrt Richtung Regensburg
      </div>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
       Leer-Rückfahrt nutzen: fairer Transport für Firmen, Möbel und Teilmengen nach Regensburg
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/55">
       FLOXANT fährt nach Aufträgen regelmäßig Richtung Regensburg zurück. Wenn dabei freie
       Fahrzeugkapazität vorhanden ist, können Privatkunden und Firmen Möbel, Büroinventar,
       Kartons, Paletten, Einzelstücke oder Teilmengen fair mitnehmen lassen. Kein Lockpreis,
       sondern eine ehrliche Prüfung: Datum, Route, Volumen, Ladeaufwand und möglicher Umweg
       müssen zur Rückfahrt passen.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
       <Link
        href="#aktuelle-rueckfahrten"
        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
       >
        Aktuelle Rückfahrten ansehen
        <ArrowRight className="h-4 w-4" />
       </Link>
       <Link
        href="/beiladung"
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white"
       >
        Beiladung vergleichen
       </Link>
      </div>
     </div>

     <div className="premium-scan rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-7 shadow-2xl shadow-black/30">
      <div className="grid gap-4">
       {[
        { icon: Route, label: "Richtung", value: "Deutschlandweit nach Regensburg" },
        { icon: MapPin, label: "Zielgebiet", value: "Regensburg + ca. 150 km Umkreis" },
        { icon: PackageOpen, label: "Geeignet für", value: "Büroinventar, Möbel, Kartons, Paletten" },
        { icon: CalendarClock, label: "Preislogik", value: "fair, wenn Route und Termin passen" },
       ].map((item) => {
        const Icon = item.icon;
        return (
         <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <Icon className="mb-4 h-6 w-6 text-emerald-200" />
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/32">{item.label}</div>
          <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
         </div>
        );
       })}
      </div>
     </div>
    </div>
   </section>

   <section className="border-y border-white/5 bg-white/[0.012] px-6 py-14">
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
     {[
      {
       title: "Für wen lohnt sich das?",
       text: "Für flexible Privatkunden, Firmen und große Büros, die Umzugsgut, Büroinventar, Möbel, Kartons oder Teilmengen Richtung Regensburg transportieren möchten und nicht zwingend eine eigene Fahrt brauchen.",
      },
      {
       title: "Wann ist es nicht passend?",
       text: "Wenn Termin, Ladepunkt, Volumen, Gewicht oder Umweg nicht zur geplanten Rückfahrt passen. Dann ist ein normaler Transport ehrlicher und planbarer.",
      },
      {
       title: "Warum FLOXANT?",
       text: "Weil Route, Preislogik, Umweg und Anfrage sauber geprüft werden. So wird die freie Fahrzeugfläche genutzt, ohne falsche Versprechen zu machen.",
      },
     ].map((item) => (
      <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7">
       <ShieldCheck className="mb-5 h-7 w-7 text-emerald-200" />
       <h2 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
       <p className="mt-4 text-sm leading-relaxed text-white/50">{item.text}</p>
      </div>
     ))}
    </div>
   </section>

   <section id="aktuelle-rueckfahrten" className="px-6 py-20">
    <div className="mx-auto max-w-7xl">
     <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
       <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">Live-Angebote</div>
       <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Aktuelle Leer-Rückfahrten und flexible Rücktransport-Anfragen
       </h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-white/48 md:text-right">
       Admin-gepflegte Rückfahrten erscheinen hier automatisch. Wenn aktuell keine konkrete
       Tour eingetragen ist, bleibt der flexible Rückfahrt-Check sichtbar.
      </p>
     </div>

     <BackhaulOffersBoard initialOffers={offers} />
    </div>
   </section>

   <section className="border-t border-white/5 px-6 py-16">
    <div className="mx-auto max-w-6xl">
     <h2 className="text-3xl font-semibold tracking-tight text-white">FAQ zu Leer-Rückfahrt und fairem Rücktransport</h2>
     <div className="mt-8 grid gap-4 md:grid-cols-2">
      {faqItems.map((item) => (
       <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">
        <h3 className="text-lg font-semibold text-white">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/50">{item.a}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-white/5 px-6 py-16">
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
     {[
      { href: "/beiladung", label: "Beiladung für Einzelstücke" },
      { href: "/firmenentsorgung", label: "Firmenentsorgung & Büroinventar" },
      { href: "/rechner?service=umzug", label: "Normalen Umzug berechnen" },
      { href: "/einsatzgebiet-regensburg-200km", label: "Einsatzgebiet ab Regensburg" },
     ].map((item) => (
      <Link
       key={item.href}
       href={item.href}
       className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-emerald-300/35 hover:text-white"
      >
       {item.label}
      </Link>
     ))}
    </div>
   </section>
  </main>
 );
}
