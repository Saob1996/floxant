import type { Metadata } from "next";
import Link from "next/link";
import {
 ArrowRight,
 BadgeCheck,
 Building2,
 ClipboardList,
 DoorOpen,
 Landmark,
 MessageCircle,
 Sparkles,
 Store,
 Stethoscope,
 Building,
 Workflow,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCleaningLeadForm } from "@/components/CommercialCleaningLeadForm";
import { FloxantServiceVisual } from "@/components/FloxantServiceVisual";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
 buildFaqJsonLd,
 buildServiceJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Für welche Objektgrößen bieten Sie die Gewerbereinigung an?",
  a: "Wir betreuen Objekte in nahezu jeder Größenordnung – angefangen bei kleinen Kanzleien oder Praxen ab 20 qm bis hin zu großen Verwaltungsgebäuden, Logistikzentren oder Gewerbeparks mit bis zu 20.000 qm. Unsere Teams und Geräte werden passend zu Ihrer Fläche skaliert.",
 },
 {
  q: "Warum gibt es hier keinen Schnell-Preisrechner?",
  a: "Eine seriöse Gewerbereinigung erfordert eine kurze Prüfung: Wie groß ist die Fläche? Welche Bodenbeläge gibt es? Wie oft soll gereinigt werden? Gibt es spezielle Hygieneanforderungen (z.B. in Praxen)? Wir besprechen diese Details lieber kurz persönlich oder über unser Formular, um Ihnen ein verlässliches Angebot zu machen, das auch wirklich hält.",
 },
 {
  q: "Welche Objekte übernimmt FLOXANT in Regensburg besonders häufig?",
  a: "Den Großteil unserer gewerblichen Einsätze machen Büroetagen, Treppenhäuser für Hausverwaltungen, moderne Arztpraxen und Kanzleien aus. Hier sind Zuverlässigkeit, feste Ansprechpartner und gleichbleibende Reinigungsqualität entscheidend.",
 },
 {
  q: "Bieten Sie auch Fenster- oder Sonderreinigungen an?",
  a: "Ja, als Ergänzung zur laufenden Unterhaltsreinigung übernehmen wir auch die Glas- und Fensterreinigung, Teppichgrundreinigungen sowie intensive Sonderreinigungen bei Mieterwechseln oder nach Renovierungen.",
 },
 {
  q: "Habe ich feste Reinigungskräfte als Ansprechpartner?",
  a: "Ja. Bei wiederkehrender Unterhaltsreinigung setzen wir auf festes Personal. So kennen unsere Mitarbeiter Ihr Objekt, die speziellen Anforderungen und können effizient und diskret arbeiten, ohne dass Sie jeden Tag neu einweisen müssen.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
  lang: "de",
  path: "gewerbereinigung-regensburg",
  title: "Gewerbereinigung Regensburg | 20 bis 20.000 qm",
  description:
   "Zuverlässige Gewerbereinigung in Regensburg für alle Größen (20 bis 20.000 qm). Feste Ansprechpartner für Büros, Praxen und Industrie. Direkt anfragen.",
 });
}

export default function GewerbereinigungRegensburgPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildServiceJsonLd({
    name: "Gewerbereinigung Regensburg",
    description:
     "Zuverlässige gewerbliche Reinigung für Büros, Praxen, Kanzleien, Treppenhäuser und Ladenflächen in Regensburg. Fokus auf Qualität und feste Ansprechpartner.",
    path: "/gewerbereinigung-regensburg",
    serviceType: "Gewerbereinigung, Büroreinigung, Praxisreinigung und Treppenhausreinigung in Regensburg",
    areaServed: ["Regensburg", "Regensburg Umgebung"],
   }),
   buildWebPageJsonLd({
    name: "Gewerbereinigung Regensburg | FLOXANT",
    description:
     "Direkte Landingpage für gewerbliche Reinigung in Regensburg mit Fokus auf Büros, Praxen, Kanzleien, Treppenhäuser und Ladenflächen.",
    path: "/gewerbereinigung-regensburg",
    about: [
     "Gewerbereinigung",
     "Büroreinigung",
     "Praxisreinigung",
     "Kanzleireinigung",
     "Treppenhausreinigung",
     "Regensburg",
    ],
    potentialActions: [
     { name: "Reinigungsangebot anfordern", target: "/gewerbereinigung-regensburg#kontaktformular" },
     { name: "WhatsApp Kontakt starten", target: "/kontakt", type: "ContactAction" },
    ],
   }),
   buildFaqJsonLd(faqItems),
  ],
 };

 const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, wir suchen eine zuverlässige Reinigungsfirma für unser Gewerbeobjekt in Regensburg und hätten gerne ein Angebot."
 )}`;

 const audienceCards = [
  {
   title: "Büro & Kanzlei",
   text: "Laufende Unterhaltsreinigung für Arbeitsplätze, Besprechungsräume, Teeküchen und Sanitäranlagen. Diskret, gründlich und außerhalb der Kernarbeitszeiten.",
   Icon: Building2,
  },
  {
   title: "Arztpraxis & Klinik",
   text: "Strikte Einhaltung von Hygiene- und Desinfektionsplänen für Wartebereiche, Behandlungsräume und Personalräume. Sauberkeit, die Vertrauen schafft.",
   Icon: Stethoscope,
  },
  {
   title: "Treppenhaus & Hausverwaltung",
   text: "Zuverlässige Turnus-Reinigung von Fluren, Eingangsbereichen und Aufzügen für Wohn- und Geschäftshäuser. Ein gepflegter erster Eindruck für Mieter und Gäste.",
   Icon: DoorOpen,
  },
  {
   title: "Ladenflächen & Einzelhandel",
   text: "Staubfreie Regale, streifenfreie Schaufenster und saubere Böden. Wir sorgen dafür, dass Ihr Verkaufsraum jeden Morgen einladend wirkt.",
   Icon: Store,
  },
  {
   title: "Öffentliche Einrichtungen",
   text: "Reinigung von Verwaltungen, Schulen oder Kitas mit Fokus auf hohe Frequentierung, robuste Materialien und umweltschonende Reinigungsmittel.",
   Icon: Landmark,
  },
  {
   title: "Gewerbeeinheiten",
   text: "Ob Autohaus, Ausstellungsraum oder kleine Produktion: Wir passen Reinigungsintervalle und Methoden genau an die jeweilige Nutzung an.",
   Icon: Building,
  },
 ];

 const signalCards = [
  {
   title: "Feste Ansprechpartner statt ständiger Wechsel",
   text: "Bei der Unterhaltsreinigung setzen wir auf feste Teams. Das sichert eine gleichbleibend hohe Qualität und erspart Ihnen ständiges Neuerklären.",
   Icon: Workflow,
  },
  {
   title: "Für jede Größenordnung (20 bis 20.000 qm)",
   text: "Egal ob kleines Steuerbüro, weitläufige Arztpraxis oder mehrstöckiger Bürokomplex: Wir prüfen Objektgröße sowie Turnus vorab und skalieren unsere Reinigungsteams passend zu Ihrer Fläche.",
   Icon: ClipboardList,
  },
  {
   title: "Direkter lokaler Dienstleister",
   text: "Keine Vermittlungsplattform, kein anonymes Callcenter. Mit FLOXANT haben Sie eine echte, in Regensburg greifbare Reinigungsfirma an Ihrer Seite.",
   Icon: BadgeCheck,
  },
 ];

 return (
  <main className="min-h-screen bg-[radial-gradient(circle_at_14%_0%,rgba(37,99,235,0.06),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] text-slate-900">
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

   <Breadcrumbs
    items={[
     { label: "Reinigung", href: "/reinigung" },
     { label: "Gewerbereinigung Regensburg" },
    ]}
   />

   <section className="relative overflow-hidden px-6 pb-16 pt-6 lg:pb-24">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(14,165,233,0.08),transparent_28%)]" />
     <FloxantSymbolLayer variant="office" density="rich" className="opacity-50" />
    </div>

    <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
     <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
       <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800 shadow-sm">
        <Sparkles className="h-3.5 w-3.5" />
        Gewerbereinigung Regensburg
       </span>
       <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600 shadow-sm">
        Lokaler Partner für Unternehmen
       </span>
      </div>

      <div className="space-y-4">
       <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-5xl xl:text-6xl">
        Zuverlässige Reinigung für Ihr Büro, Ihre Praxis oder Ihr Treppenhaus.
       </h1>
       <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
        Gute Gewerbereinigung muss nicht kompliziert sein. Wir sind Ihr echter lokaler Partner aus Regensburg – ehrlich, pünktlich und extrem gründlich. Egal, ob kleine Praxis (ab 20 qm) oder großer Gewerbekomplex (bis 20.000 qm): Mit festen Ansprechpartnern sorgen wir dafür, dass im Alltag einfach alles funktioniert. Pack ma&apos;s!
       </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
       {[
        "Büros & Kanzleien",
        "Arztpraxen",
        "Treppenhäuser",
        "Ladenflächen",
       ].map((item) => (
        <div
         key={item}
         className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
         {item}
        </div>
       ))}
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
       <a
        href="#kontaktformular"
        className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 text-sm font-bold uppercase tracking-widest text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700"
       >
        Angebot anfragen
        <ArrowRight className="h-4 w-4" />
       </a>
       <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-[#25D366]/30 bg-white px-7 text-sm font-bold uppercase tracking-widest text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#25D366] hover:text-slate-900 hover:shadow-[0_8px_20px_rgba(37,211,102,0.18)]"
       >
        <div className="relative flex h-5 w-5 items-center justify-center">
         <span className="absolute inset-0 z-0 animate-ping rounded-full bg-[#25D366] opacity-40 group-hover:opacity-60"></span>
         <MessageCircle className="relative z-10 h-5 w-5 text-[#25D366] transition-transform group-hover:scale-110" />
        </div>
        Kurze Frage per WhatsApp
       </a>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm font-medium text-slate-500">
       <BadgeCheck className="h-5 w-5 text-green-600" />
       <span>Unverbindliche Besichtigung & transparentes Angebot</span>
      </div>
     </div>

     <div className="relative rounded-[2rem] border border-slate-200 bg-white/60 p-3 shadow-xl backdrop-blur-md">
      <div className="absolute -top-6 left-1/2 z-20 hidden -translate-x-1/2 rounded-xl border border-blue-100 bg-white px-5 py-3 shadow-lg md:block">
       <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Fokus Regensburg</p>
       <p className="mt-1 text-sm font-semibold text-slate-900">Kurze Wege, schnelle Reaktion</p>
      </div>
      <div className="absolute -bottom-6 right-6 z-20 w-48 rounded-xl border border-slate-200 bg-slate-900 p-4 text-white shadow-xl">
       <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Arbeitsweise</p>
       <p className="mt-2 text-lg font-bold leading-tight">Diskret & Gründlich</p>
       <p className="mt-1 text-xs text-slate-300">Außerhalb der Kernzeiten möglich.</p>
      </div>
      <FloxantServiceVisual
       variant="office"
       kicker="B2B Reinigungsservice"
       title="Saubere Arbeitsumgebung, produktives Team"
       details={["Unterhaltsreinigung", "Hygiene", "Zuverlässigkeit"]}
       className="min-h-[500px] rounded-[1.5rem] border border-slate-200 bg-white"
      />
     </div>
    </div>
   </section>

   <section className="px-6 pb-16">
    <div className="mx-auto max-w-7xl">
     <div className="mb-10 max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-700">
       Passende Lösungen für Ihre Branche
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
       Wir reinigen dort, wo Qualität erwartet wird.
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
       Jedes Gewerbe hat eigene Anforderungen. Eine Anwaltskanzlei braucht absolute Diskretion, eine Arztpraxis strikte Hygiene und ein Treppenhaus vor allem turnusmäßige Zuverlässigkeit. Wir stellen uns darauf ein.
      </p>
     </div>

     <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {audienceCards.map((item) => {
       const Icon = item.Icon;
       return (
        <article
         key={item.title}
         className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-6 w-6" />
         </div>
         <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
         <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
        </article>
       );
      })}
     </div>
    </div>
   </section>

   <section className="px-6 pb-16">
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
     <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-700">
       Was FLOXANT ausmacht
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
       Ihre Vorteile bei einer Zusammenarbeit
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
       {signalCards.map((item) => {
        const Icon = item.Icon;
        return (
         <div key={item.title} className="flex gap-4">
          <div className="mt-1 flex-shrink-0">
           <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
           <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
           <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
          </div>
         </div>
        );
       })}
      </div>
     </div>

     <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
       Klare Ausrichtung
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
       Qualität braucht den passenden Rahmen
      </h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
       <p>Wir konzentrieren uns voll auf gewerbliche Kunden und Hausverwaltungen, bei denen Verlässlichkeit und langfristige Zusammenarbeit im Vordergrund stehen.</p>
       <p><strong>Warum keine kleinen Privathaushalte?</strong> Um unseren Geschäftskunden feste Kapazitäten und konstante Ansprechpartner garantieren zu können, verzichten wir auf stark schwankende private Kleinstaufträge.</p>
       <p>
        Für Endreinigungen bei Auszug oder Einzug informieren Sie sich gerne auf unserer Spezialseite zur{" "}
        <Link href="/reinigung" className="font-semibold text-blue-600 hover:underline">
         Reinigung bei Umzug
        </Link>.
       </p>
      </div>
     </div>
    </div>
   </section>

   <section id="kontaktformular" className="px-6 pb-16">
    <div className="mx-auto max-w-7xl">
     <div className="mb-10 max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-700">
       Der erste Schritt
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
       Lassen Sie uns über Ihr Objekt sprechen.
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
       Senden Sie uns einfach die Eckdaten zu Ihrer Fläche (z.B. Büro, Praxis, m²) und Ihren gewünschten Turnus. Wir melden uns umgehend bei Ihnen zurück, um die Details oder einen Besichtigungstermin zu klären.
      </p>
     </div>

     <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <CommercialCleaningLeadForm />
     </div>
    </div>
   </section>

   <section className="px-6 pb-16">
    <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12">
     <div className="mb-8 text-center">
      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-700">Fragen & Antworten</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
       Gut zu wissen
      </h2>
     </div>
     <div className="space-y-6">
      {faqItems.map((item) => (
       <article key={item.q} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
        <h3 className="text-base font-bold text-slate-900">{item.q}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
       </article>
      ))}
     </div>
    </div>
   </section>

   <section className="px-6 pb-24">
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
     <Link
      href="/reinigung"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
     >
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Serviceübersicht</p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">Reinigung allgemein</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
       Alle Reinigungsleistungen, inklusive Endreinigung bei Umzügen und Übergaben im Überblick.
      </p>
     </Link>
     <Link
      href="/reinigung-regensburg"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
     >
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Lokale Übersicht</p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">Reinigung in Regensburg</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
       Regionale Seite für Reinigungsdienstleistungen mit Fokus auf Umzug und private Projektanfragen.
      </p>
     </Link>
     <Link
      href="/kontakt"
      className="rounded-2xl border border-slate-200 bg-blue-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
     >
      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-700">Persönlich</p>
      <h2 className="mt-2 text-xl font-bold text-blue-900">Direkter Kontakt</h2>
      <p className="mt-3 text-sm leading-relaxed text-blue-800/80">
       Lieber anrufen? Hier finden Sie alle Kontaktdaten für eine schnelle Rückfrage oder Terminvereinbarung.
      </p>
     </Link>
    </div>
   </section>
  </main>
 );
}
