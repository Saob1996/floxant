import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, MapPin, Navigation } from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_SERVICES,
  buildDuesseldorfCleaningMetadata,
} from "@/lib/duesseldorf-cleaning";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

const path = "/duesseldorf/reinigung-stadtteile-umgebung";
const title = "Reinigungsfirma Düsseldorf für Stadtteile und Umgebung";
const description =
  "Reinigungsfirma Düsseldorf für Büro, Hotel, Wohnung und Objekt: Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, Neuss, Ratingen, Meerbusch, Mettmann und Duisburg.";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path,
    title: "Reinigungsfirma Düsseldorf Stadtteile & Umgebung | FLOXANT",
    description,
  });
}

const districtGroups = [
  {
    title: "Innenstadt und zentrale Geschäftslagen",
    areas: ["Altstadt", "Stadtmitte", "Pempelfort", "Carlstadt", "Derendorf", "Golzheim"],
    text: "In zentralen Geschäftslagen zählen planbare Zeitfenster, diskreter Zugang, Lieferzone, Etage, Hausordnung und ein verlässlicher Ansprechpartner. Besonders bei Büros, Kanzleien, Hotels und Übergabereinigung entscheidet diese Vorprüfung über Qualität, Ablauf und Preisrahmen.",
  },
  {
    title: "Bilk, MedienHafen und linksrheinische Objekte",
    areas: ["Bilk", "Unterbilk", "MedienHafen", "Oberkassel", "Lörick", "Heerdt"],
    text: "Hier treffen Wohnungen, Apartments, Büros, Praxen, Hotellerie und Gewerbeflächen häufig aufeinander. Für eine seriöse Einschätzung braucht FLOXANT Fläche, Nutzung, Turnus, Boden- und Sanitärbereiche, Fotos und den gewünschten Qualitätsstandard.",
  },
  {
    title: "Süd, Ost und anspruchsvolle Wohnlagen",
    areas: ["Benrath", "Eller", "Gerresheim", "Grafenberg", "Lierenfeld", "Kaiserswerth"],
    text: "Bei Wohnungsreinigung, Endreinigung, Kellerreinigung und Treppenhausreinigung zählen Zustand, Zugang, Parkmöglichkeit, Keller- und Nebenräume sowie der gewünschte Fertigstellungstermin. Fotos verhindern Missverständnisse und beschleunigen die Rückmeldung.",
  },
  {
    title: "Nahe Umgebung mit Düsseldorfer Bezug",
    areas: ["Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg", "Hilden", "Erkrath"],
    text: "Anfragen aus der Umgebung werden professionell nach Ort, Objektart, Termin, Fotos, Zugang und Kapazität geprüft. FLOXANT bleibt dabei klar auf Reinigung und Düsseldorfer Entsorgung begrenzt; Umzug und Transport werden nicht als Düsseldorfer Leistung beworben.",
  },
] as const;

const faqItems = [
  {
    q: "Welche Düsseldorfer Stadtteile sind für professionelle Reinigung relevant?",
    a: "FLOXANT prüft Reinigungsanfragen unter anderem für Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, MedienHafen, Derendorf, Benrath, Gerresheim und Kaiserswerth. Wichtig sind Objektart, Fläche, Zustand, Turnus und Zugang.",
  },
  {
    q: "Gilt das auch für Neuss, Ratingen, Meerbusch, Mettmann und Duisburg?",
    a: "Ja, Anfragen aus der direkten Umgebung können geprüft werden, wenn Objektart, Ort, Fläche, Termin, Zugang und Fotos vorliegen.",
  },
  {
    q: "Warum ist der Stadtteil für Angebot und Ablauf wichtig?",
    a: "Parkmöglichkeit, Lieferzone, Etage, Aufzug, Hausordnung, Zeitfenster, Objektart und gewünschter Standard verändern den Aufwand. Deshalb kalkuliert FLOXANT nicht pauschal nach Stadtname, sondern nach prüfbaren Objektdaten.",
  },
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Umzug, Transport und Büroumzug bleiben getrennt.",
  },
] as const;

export default function DuesseldorfStadtteileUmgebungPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "Stadtteile und Umgebung", item: path },
      ]),
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Reinigung Düsseldorf Stadtteile",
          "Reinigung Neuss",
          "Reinigung Ratingen",
          "Reinigung Meerbusch",
          "Reinigung Mettmann",
          "Reinigung Duisburg",
        ],
        potentialActions: [{ name: "Düsseldorfer Reinigung anfragen", target: "/duesseldorf/reinigung#kontakt", type: "ContactAction" }],
      }),
      buildServiceJsonLd({
        name: "Reinigung Düsseldorf und Umgebung",
        description:
          "Reinigungsanfragen in Düsseldorf, Stadtteilen und naher Umgebung nach Objektart, Fläche, Zugang, Fotos und Zeitfenster prüfen lassen.",
        path,
        serviceType: "Reinigung Düsseldorf Stadtteile und Umgebung",
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg"],
      }),
      buildFaqJsonLd([...faqItems]),
    ],
  };

  return (
    <main className="px-4 pb-28 pt-10 sm:px-6 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-7xl rounded-[1.5rem] border border-white/10 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(7,17,29,0.28)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-cyan-100">
          <Navigation className="h-4 w-4" />
          Reinigungsfirma Düsseldorf
        </div>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5vw,4.9rem)] font-black leading-[0.98] tracking-tight">
          Professionelle Reinigung in Düsseldorf, den Stadtteilen und der nahen Umgebung
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200">
          FLOXANT steht in Düsseldorf für klar geprüfte Reinigung statt pauschaler Versprechen. Für Büro, Hotel, Wohnung, Kanzlei, Praxis, Treppenhaus oder Gewerbefläche werden Stadtteil, Objektart, Zugang, Fotos, Fläche, Turnus, Zeitfenster und Nähe zu Neuss, Ratingen, Meerbusch, Mettmann oder Duisburg sauber eingeordnet.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/duesseldorf/reinigung#kontakt" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-slate-100">
            Reinigung anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/duesseldorf/vielleicht-guenstiger" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-emerald-200/40 bg-emerald-300/15 px-5 text-sm font-bold text-emerald-50 transition hover:bg-emerald-300/25">
            Angebot prüfen lassen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 md:grid-cols-2">
        {districtGroups.map((group) => (
          <article key={group.title} className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-cyan-800">
              <MapPin className="h-4 w-4" />
              Lokaler Fokus
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{group.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">{group.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.areas.map((area) => (
                <span key={area} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800">
                  {area}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[1.25rem] border border-cyan-200 bg-cyan-50 p-6">
        <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">Passende Düsseldorfer Leistungen</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DUESSELDORF_CLEANING_SERVICES.slice(0, 12).map((service) => (
            <Link key={service.href} href={service.href} className="group rounded-[1rem] border border-cyan-100 bg-white p-4 text-sm font-bold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-900">
              <Building2 className="mb-3 h-5 w-5 text-cyan-700" />
              {service.label}
              <span className="mt-2 flex items-center gap-1 text-xs text-slate-500 group-hover:text-cyan-800">
                Objekt prüfen <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-3 md:grid-cols-2">
        {faqItems.map((item) => (
          <details key={item.q} className="rounded-[1rem] border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-black text-slate-950">
              <CheckCircle2 className="mr-2 inline h-4 w-4 text-cyan-700" />
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
          </details>
        ))}
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm leading-7 text-slate-700">
          Adresse Düsseldorf: {DUESSELDORF_CLEANING.address.streetAddress}, {DUESSELDORF_CLEANING.address.postalCode} {DUESSELDORF_CLEANING.address.city}. Anfragen aus Düsseldorf und Umgebung werden nach Objektart, Stadtteil, Umfang, Fotos, Zugang, Turnus und Termin geprüft, damit Kunden eine belastbare und professionelle Rückmeldung erhalten.
        </p>
      </section>
    </main>
  );
}
