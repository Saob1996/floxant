import Link from "next/link";
import {
 ArrowRight,
 Calculator,
 Mail,
 MapPinned,
 MessageCircle,
 Phone,
 ShieldCheck,
 Zap,
} from "lucide-react";

import { company } from "@/lib/company";

const mapQuery = encodeURIComponent(`${company.name} ${company.streetAddress} ${company.postalCode} ${company.city}`);
export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
export const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;

export const contactEntryPoints = [
 {
  icon: Calculator,
  title: "Preisrahmen berechnen",
  text: "Für Umzug, Reinigung, Entrümpelung und Büroumzug mit strukturierter Vorprüfung.",
  href: "/rechner",
  action: "Rechner starten",
 },
 {
  icon: Zap,
  title: "Express-Anfrage",
  text: "Für kurzfristige Fälle, bei denen FLOXANT zuerst die Machbarkeit prüfen soll.",
  href: "/express-anfrage",
  action: "Express öffnen",
 },
 {
  icon: ShieldCheck,
  title: "Ablauf verstehen",
  text: "Für Kunden, die vor dem Absenden Buchung, Angebot und Dokumente verstehen möchten.",
  href: "/buchung-ablauf",
  action: "Ablauf ansehen",
 },
];

export function ContactTrustPanel({ compact = false }: { compact?: boolean }) {
 return (
  <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-24"}`}>
   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_84%_52%,rgba(34,211,238,0.08),transparent_34%)]" />
   <div className="relative mx-auto max-w-7xl">
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
     <div className="rounded-[2.5rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-8 shadow-2xl shadow-foreground/10">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 ">
       <MapPinned className="h-4 w-4" />
       Kontakt Regensburg
      </div>
      <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       FLOXANT erreichen und den richtigen Einstieg wählen.
      </h2>
      <p className="mt-5 text-sm leading-relaxed text-foreground/52 md:text-base">
       Für Kunden ist wichtig, ob sie direkt rechnen, eine kurze Anfrage stellen oder erst
       eine persönliche Rückfrage senden sollen. FLOXANT bündelt Telefon, WhatsApp, E-Mail,
       Standort und Rechner als klare, crawlbare Kontaktwege.
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
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between rounded-2xl border border-emerald-300/15 bg-emerald-500/[0.07] px-5 py-4 text-emerald-800 transition hover:border-emerald-200/30 hover:bg-emerald-500/[0.12] hover:text-foreground"
       >
        <span className="flex items-center gap-3">
         <MessageCircle className="h-4 w-4 text-emerald-600 " />
         WhatsApp Direktkontakt
        </span>
        <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
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
     </div>

     <div className="grid gap-4">
      <div className="rounded-[2.5rem] border border-blue-300/15 bg-blue-500/[0.055] p-7">
       <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 ">
        Schnell zum richtigen Weg
       </div>
       <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/56">
        Wenn schon Eckdaten vorhanden sind, ist der Rechner der beste Einstieg. Bei knapper
        Zeit passt Express. Für allgemeine Fragen sind Telefon, WhatsApp und E-Mail sichtbar.
       </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
       {contactEntryPoints.map((entry) => {
        const Icon = entry.icon;
        return (
         <Link
          key={entry.href}
          href={entry.href}
          className="premium-scan group rounded-[1.75rem] border border-foreground/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-300/25"
         >
          <Icon className="h-5 w-5 text-blue-700 " />
          <h3 className="mt-5 text-lg font-semibold text-foreground">{entry.title}</h3>
          <p className="mt-3 min-h-[76px] text-sm leading-relaxed text-foreground/46">{entry.text}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 ">
           {entry.action}
           <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
         </Link>
        );
       })}
      </div>

      <div className="rounded-[1.75rem] border border-foreground/10 bg-foreground/5 p-6">
       <h3 className="text-xl font-semibold text-foreground">Lokale Einordnung</h3>
       <p className="mt-3 text-sm leading-relaxed text-foreground/48">
        FLOXANT sitzt in Regensburg und prüft Anfragen für Regensburg, Bayern und passende
        Einsätze im erweiterten Gebiet. Für die Planung zählen Serviceart, Ort, Umfang,
        Zugang, Terminlage und gewünschter Kontaktweg.
       </p>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
