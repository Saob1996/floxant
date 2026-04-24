import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPinned, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
 ContactTrustPanel,
 contactEntryPoints,
 googleMapsUrl,
 whatsappUrl,
} from "@/components/seo/ContactTrustPanel";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Wie erreiche ich FLOXANT am schnellsten?",
  a: "Am schnellsten starten Sie über den Rechner oder die Express-Anfrage. Für direkte Rückfragen sind Telefon, WhatsApp und E-Mail sichtbar angegeben.",
 },
 {
  q: "Ist eine Kontaktaufnahme direkt eine Buchung?",
  a: "Nein. Eine Kontaktaufnahme oder Rechner-Anfrage startet die fachliche Vorprüfung. Eine Beauftragung entsteht erst nach klarer Abstimmung von Leistung, Termin und Dokumenten.",
 },
 {
  q: "Welche Angaben helfen bei einer schnellen Rückmeldung?",
  a: "Hilfreich sind Serviceart, Ort, Umfang, Zugang, Terminwunsch, Fotos, besondere Bedingungen und eine optionale Preisvorstellung.",
 },
 {
  q: "Für welche Region ist FLOXANT erreichbar?",
  a: "Der operative Kern liegt in Regensburg. FLOXANT prüft Anfragen in Bayern und passende Einsätze im erweiterten Einsatzgebiet nach Strecke, Termin und Kapazität.",
 },
 {
  q: "Kann ich auch nur eine Preisvorstellung senden?",
  a: "Ja. Die Preisvorstellung ergänzt den System-Orientierungsrahmen, ersetzt ihn aber nicht. Sie hilft bei der Einschätzung, ob Budget und Leistungsumfang zusammenpassen.",
 },
];

const preparationItems = [
 "Serviceart wählen: Umzug, Reinigung, Entrümpelung, Büroumzug oder Spezialservice.",
 "Ort und Zeitraum nennen: Regensburg, Bayern, Strecke, Datum oder gewünschtes Zeitfenster.",
 "Umfang beschreiben: Volumen, Fläche, Räume, Etagen, Aufzug, Laufwege oder Fotos.",
 "Kontaktweg festlegen: Rückruf, WhatsApp oder E-Mail für die nächste Abstimmung.",
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "kontakt",
  title: "FLOXANT Kontakt Regensburg | Rechner, Anfrage & Beratung",
  description:
   "FLOXANT Kontakt in Regensburg: direkt rechnen, Express-Anfrage starten, WhatsApp, Telefon, E-Mail und Standort für Umzug, Reinigung und Entrümpelung.",
 });
}

export default function KontaktPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Kontakt Regensburg",
    description:
     "Kontaktseite für FLOXANT mit Rechner, Express-Anfrage, Telefon, WhatsApp, E-Mail und Standort in Regensburg.",
    path: "/kontakt",
    about: [
     "FLOXANT Kontakt",
     "Umzug Regensburg",
     "Reinigung Regensburg",
     "Entrümpelung Regensburg",
     "Büroumzug",
     "WhatsApp Kontakt",
     "Regensburg",
     "Bayern",
    ],
   }),
   {
    "@type": "ContactPage",
    "@id": `${company.url}/kontakt#contactpage`,
    name: "FLOXANT Kontakt",
    url: `${company.url}/kontakt`,
    mainEntity: {
     "@type": "LocalBusiness",
     "@id": `${company.url}/#localbusiness`,
     name: company.name,
     telephone: company.phoneRaw,
     email: company.email,
     url: company.url,
     address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: company.countryCode,
     },
     areaServed: [
      { "@type": "City", name: "Regensburg" },
      { "@type": "State", name: "Bayern" },
     ],
     contactPoint: [
      {
       "@type": "ContactPoint",
       telephone: company.phoneRaw,
       contactType: "customer service",
       areaServed: "DE",
       availableLanguage: ["de"],
      },
     ],
    },
   },
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Kontakt", item: "/kontakt" },
   ]),
   buildFaqJsonLd(faqItems),
   {
    "@type": "ItemList",
    name: "FLOXANT Kontakt-Einstiege",
    itemListElement: contactEntryPoints.map((entry, index) => ({
     "@type": "ListItem",
     position: index + 1,
     name: entry.title,
     url: `${company.url}${entry.href}`,
     description: entry.text,
    })),
   },
  ],
 };

 return (
  <main className="min-h-screen overflow-hidden bg-background text-foreground">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <Breadcrumbs items={[{ label: "Kontakt" }]} />

   <section className="relative px-6 pb-14 pt-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[590px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.21),transparent_64%)]" />
    <div className="relative mx-auto max-w-6xl">
     <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 ">
      <MapPinned className="h-4 w-4" />
      FLOXANT Kontakt Regensburg
     </div>
     <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
      Kontakt aufnehmen, direkt rechnen oder Anfrage vorbereiten.
     </h1>
     <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
      FLOXANT bündelt die wichtigsten Kontaktwege für Umzug, Reinigung, Entrümpelung,
      Büroumzug und Spezialservices. Sie können sofort den Rechner starten, eine
      Express-Anfrage senden oder persönlich per Telefon, WhatsApp und E-Mail Kontakt aufnehmen.
     </p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href="/rechner"
       className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
      >
       Direkt rechnen
       <ArrowRight className="h-4 w-4" />
      </Link>
      <a
       href={whatsappUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-500/15"
      >
       WhatsApp öffnen
       <MessageCircle className="h-4 w-4" />
      </a>
      <a
       href={googleMapsUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
      >
       Standort ansehen
      </a>
     </div>
    </div>
   </section>

   <ContactTrustPanel compact />

   <section className="border-y border-foreground/5 bg-slate-950/55 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
     <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       Vorbereiten
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
       So wird die Rückmeldung schneller und genauer.
      </h2>
     </div>
     <div className="grid gap-4">
      {preparationItems.map((item) => (
       <div key={item} className="flex gap-4 rounded-[1.5rem] border border-foreground/10 bg-white/[0.03] p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 " />
        <p className="text-sm leading-relaxed text-foreground/56">{item}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="border-t border-foreground/5 px-6 py-20">
    <div className="mx-auto max-w-5xl">
     <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">FAQ</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
       Häufige Fragen zu Kontakt und Anfrage
      </h2>
     </div>
     <div className="space-y-4">
      {faqItems.map((item) => (
       <article key={item.q} className="rounded-[1.5rem] border border-foreground/10 bg-white/[0.025] p-6">
        <h3 className="text-lg font-semibold text-foreground">{item.q}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/50">{item.a}</p>
       </article>
      ))}
     </div>
    </div>
   </section>
  </main>
 );
}
