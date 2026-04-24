import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPinned, Phone, Radar, ShieldCheck } from "lucide-react";
import { company } from "@/lib/company";

const mapQuery = encodeURIComponent(`${company.name} ${company.streetAddress} ${company.postalCode} ${company.city}`);
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

const serviceAreas = [
 { label: "Regensburg", text: "operativer Kern und wichtigste lokale Nachfrage" },
 { label: "Oberpfalz", text: "kurze Wege für Umzug, Reinigung und Entrümpelung" },
 { label: "Bayern", text: "strukturierter Ausbau für Service- und Firmenanfragen" },
 { label: "200-km-Raum", text: "realistische Vorprüfung nach Strecke, Termin und Kapazität" },
];

const localSignals = [
 {
  icon: MapPinned,
  title: "Klare lokale Einordnung",
  text: "Adresse, Region, Einsatzradius und Kernleistungen sind sichtbar und konsistent formuliert.",
 },
 {
  icon: ShieldCheck,
  title: "Saubere Service-Grenzen",
  text: "FLOXANT trennt Umzug, Reinigung, Entrümpelung, Büroumzug und Spezialservices verständlich.",
 },
 {
  icon: Radar,
  title: "Regionale Suchpfade",
  text: "Nutzer finden direkt Stadt-, Bayern-, Rechner- und Spezialseiten statt zufälliger Linklisten.",
 },
];

export function LocalSeoSignalPanel() {
 return (
  <section className="relative overflow-hidden border-y border-foreground/5 bg-[linear-gradient(180deg,rgba(10,15,28,0.96),rgba(5,8,15,0.98))] px-6 py-24">
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(245,158,11,0.08),transparent_30%)]" />
   <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
    <div className="rounded-[2.4rem] border border-foreground/10 bg-white/[0.035] p-8 shadow-2xl shadow-foreground/10">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 ">
      <MapPinned className="h-4 w-4" />
      Local SEO Signal
     </div>
     <h2 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
      FLOXANT ist lokal klar verortet.
     </h2>
     <p className="mt-5 text-lg leading-relaxed text-foreground/52">
      Für Google Maps, lokale Suche und echte Kunden zählt Konsistenz: wer FLOXANT ist,
      wo der operative Kern liegt, welche Leistungen angeboten werden und wie eine Anfrage startet.
     </p>

     <div className="mt-8 grid gap-3">
      <a
       href={`tel:${company.phoneRaw}`}
       className="group flex items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/5 px-5 py-4 text-foreground/70 transition hover:border-blue-300/25 hover:bg-blue-500/10 hover:text-foreground"
      >
       <span className="flex items-center gap-3">
        <Phone className="h-4 w-4 text-blue-700 " />
        {company.phone}
       </span>
       <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
      </a>
      <a
       href={`mailto:${company.email}`}
       className="group flex items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/5 px-5 py-4 text-foreground/70 transition hover:border-blue-300/25 hover:bg-blue-500/10 hover:text-foreground"
      >
       <span className="flex items-center gap-3">
        <Mail className="h-4 w-4 text-blue-700 " />
        {company.email}
       </span>
       <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
      </a>
      <a
       href={googleMapsUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="group flex items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/5 px-5 py-4 text-foreground/70 transition hover:border-blue-300/25 hover:bg-blue-500/10 hover:text-foreground"
      >
       <span className="flex items-center gap-3">
        <MapPinned className="h-4 w-4 text-blue-700 " />
        {company.address}
       </span>
       <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
      </a>
     </div>

     <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-400/[0.055] px-5 py-4 text-sm text-emerald-800 ">
      <Clock3 className="h-4 w-4 text-emerald-600 " />
      Anfrage und Vorprüfung für Regensburg, Bayern und passende Einsätze im erweiterten Radius.
     </div>
    </div>

    <div className="grid gap-5">
     <div className="grid gap-4 md:grid-cols-2">
      {serviceAreas.map((area) => (
       <Link
        key={area.label}
        href={area.label === "Regensburg" ? "/umzug-regensburg" : area.label === "Bayern" ? "/service-area-bayern" : "/einsatzgebiet-regensburg-200km"}
        className="premium-scan rounded-[1.75rem] border border-foreground/10 bg-white/[0.028] p-6 transition hover:-translate-y-1 hover:border-blue-300/25"
       >
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 ">
         {area.label}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/48">{area.text}</p>
       </Link>
      ))}
     </div>

     <div className="grid gap-4 md:grid-cols-3">
      {localSignals.map((signal) => {
       const Icon = signal.icon;
       return (
        <div key={signal.title} className="rounded-[1.75rem] border border-foreground/10 bg-foreground/5 p-6">
         <Icon className="h-5 w-5 text-blue-700 " />
         <h3 className="mt-5 text-lg font-semibold text-foreground">{signal.title}</h3>
         <p className="mt-3 text-sm leading-relaxed text-foreground/45">{signal.text}</p>
        </div>
       );
      })}
     </div>

     <div className="flex flex-col gap-3 rounded-[1.75rem] border border-blue-300/15 bg-blue-500/[0.07] p-6 md:flex-row md:items-center md:justify-between">
      <div>
       <h3 className="text-xl font-semibold text-foreground">Nächster sinnvoller Schritt</h3>
       <p className="mt-2 text-sm leading-relaxed text-foreground/50">
        Erst Service und Ort einordnen, dann unverbindlichen Preisrahmen oder Preisvorstellung senden.
       </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
       <Link
        href="/kontakt"
        className="inline-flex h-12 items-center justify-center rounded-2xl border border-foreground/10 bg-white/[0.04] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/75 transition hover:bg-white/[0.08] hover:text-foreground"
       >
        Kontakt
       </Link>
       <Link
        href="/rechner"
        className="inline-flex h-12 items-center justify-center rounded-2xl bg-blue-500 px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground transition hover:bg-blue-400"
       >
        Rechner starten
       </Link>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
