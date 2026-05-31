import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, MapPin, ShieldCheck, Truck } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "umzugsunternehmen-regensburg",
    title: "Umzugsunternehmen Regensburg | Fotos & Angebot prüfen",
    description:
      "Umzugsunternehmen Regensburg: Möbel, Etage, Strecke, Termin, Fotos und Preisrahmen senden. FLOXANT prüft Transport, Reinigung und Übergabe.",
    keywords: [
      "Umzugsunternehmen Regensburg",
      "Umzugsfirma Regensburg",
      "Umzug Regensburg",
      "Umzug mit Reinigung Regensburg",
      "Wohnungsübergabe Regensburg",
    ],
  });
}

const proofItems = [
  {
    icon: Truck,
    title: "Transport realistisch geplant",
    text: "Volumen, Etagen, Laufwege, Parken und Zeitfenster werden vor der Zusage zusammen betrachtet.",
  },
  {
    icon: ClipboardCheck,
    title: "Übergabe mitgedacht",
    text: "Wenn Reinigung, Entsorgung oder Schlüsselübergabe relevant sind, wird das früh in den Ablauf eingeordnet.",
  },
  {
    icon: ShieldCheck,
    title: "Regensburg als Kern",
    text: "FLOXANT startet aus Regensburg und prüft Einsätze in Stadt, Landkreis, Nahbereich und Bayern nach Machbarkeit.",
  },
];

const faqItems = [
  {
    q: "Ist FLOXANT ein Umzugsunternehmen in Regensburg?",
    a: "Ja. FLOXANT organisiert Umzüge von Regensburg aus und verbindet Transport, Reinigung, Entrümpelung und Übergabevorbereitung, wenn der Fall das braucht.",
  },
  {
    q: "Kann ich Umzug und Reinigung zusammen anfragen?",
    a: "Ja. Genau diese Kombination ist für Auszug, Übergabe und Vermietertermin oft sinnvoll, weil weniger Schnittstellen entstehen.",
  },
  {
    q: "Wie bekomme ich einen Preisrahmen?",
    a: "Der schnellste Einstieg ist der FLOXANT Rechner. Dort werden Umfang, Zugang, Termin und Zusatzleistungen strukturiert abgefragt.",
  },
];

export default function UmzugsunternehmenRegensburgPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${company.url}/umzugsunternehmen-regensburg#service`,
      name: "Umzugsunternehmen Regensburg",
      serviceType: "MovingService",
      url: `${company.url}/umzugsunternehmen-regensburg`,
      provider: {
        "@type": "MovingCompany",
        name: company.name,
        telephone: company.phoneRaw,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.streetAddress,
          addressLocality: company.city,
          postalCode: company.postalCode,
          addressRegion: company.state,
          addressCountry: company.countryCode,
        },
      },
      areaServed: ["Regensburg", "Landkreis Regensburg", "Oberpfalz", "Bayern"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: company.url },
        { "@type": "ListItem", position: 2, name: "Umzug", item: `${company.url}/umzug` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Umzugsunternehmen Regensburg",
          item: `${company.url}/umzugsunternehmen-regensburg`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        lang="de"
        items={[
          { label: "Umzug", href: "/umzug" },
          { label: "Umzugsunternehmen Regensburg" },
        ]}
      />

      <section className="px-6 pb-16 pt-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Regensburg Kerngebiet
            </div>
            <h1 className="mt-7 max-w-[15ch] text-4xl font-bold leading-[1.02] tracking-[-0.025em] text-slate-950 md:text-6xl">
              Umzugsunternehmen Regensburg mit sauberer Planung bis zur Übergabe
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Ein Umzug ist selten nur Transport. FLOXANT prüft Möbel, Laufwege,
              Terminfenster, Reinigung, Entrümpelung und Schlüsselübergabe als einen
              zusammenhängenden Ablauf.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/rechner?service=umzug#rechner-wizard" className="flox-button-primary px-6">
                Umzug berechnen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/buchung?service=umzug#buchungssystem" className="flox-button-secondary px-6">
                Unverbindlich anfragen
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3 text-sm font-bold text-slate-950">
              <MapPin className="h-5 w-5 text-blue-700" />
              Regensburg, Landkreis und Bayern nach Verfügbarkeit
            </div>
            <div className="mt-5 space-y-3">
              {[
                "Umzug mit Transport, Tragen und Ablaufplanung",
                "Reinigung und besenreine Übergabe ergänzbar",
                "Entrümpelung, Entsorgung und Restmengen prüfbar",
                "Schlüsselübergabe und Übergabeprotokoll als Zusatzservice",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-[1.15rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {proofItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                <Icon className="h-6 w-6 text-blue-700" />
                <h2 className="mt-5 text-xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-7">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Nächster sinnvoller Schritt
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
              Erst Aufwand einordnen, dann Angebot prüfen.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Diese Seite ist der direkte Einstieg für
              „Umzugsunternehmen Regensburg“. Die Anfrage läuft danach über
              Rechner, Buchung oder WhatsApp, damit der Fall vollständig ankommt.
            </p>
          </article>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer list-none text-base font-bold text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
