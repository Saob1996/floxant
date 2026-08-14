import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

import { company } from "@/lib/company";
import { buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/fragen";

const faqItems = [
  {
    q: "Welche Leistungen bietet FLOXANT in Düsseldorf an?",
    a: "In Düsseldorf liegt der Schwerpunkt auf Reinigung für Wohnung, Büro, Praxis und Gewerbe. Dazu gehören unter anderem Fenster-, Grund-, Unterhalts- und Bauendreinigung.",
  },
  {
    q: "Welche Leistungen bietet FLOXANT in Regensburg an?",
    a: "In Regensburg stehen Umzug, Entrümpelung, Wohnungsauflösung, Klaviertransport und weitere Transportleistungen im Mittelpunkt.",
  },
  {
    q: "Welche Angaben helfen bei einer ersten Anfrage?",
    a: "Nennen Sie Standort, gewünschte Leistung, Umfang und Termin. Je nach Aufgabe helfen außerdem Fläche, Räume, Etagen, Zugang, Start und Ziel oder freiwillige Fotos.",
  },
  {
    q: "Ist eine Anfrage bereits eine verbindliche Buchung?",
    a: "Nein. FLOXANT prüft zunächst Ihre Angaben und klärt offene Punkte. Eine konkrete Beauftragung entsteht erst nach der weiteren Abstimmung.",
  },
  {
    q: "Kann ich ein vorhandenes Angebot prüfen lassen?",
    a: "Ja. Senden Sie das Angebot oder die wichtigsten Positionen. FLOXANT kann Umfang und offene Punkte einordnen, verspricht aber weder einen bestimmten Preis noch eine günstigere Alternative.",
  },
  {
    q: "Kann ich FLOXANT auch telefonisch oder per WhatsApp erreichen?",
    a: "Ja. Telefon und WhatsApp sind als direkte Kontaktwege verfügbar. Für eine vollständige Anfrage ist das Formular besonders hilfreich, weil alle Eckdaten zusammen übermittelt werden.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Häufige Fragen zu FLOXANT | Düsseldorf & Regensburg",
  description:
    "Antworten zu FLOXANT-Leistungen in Düsseldorf und Regensburg, benötigten Angaben, Anfrage, Angebot und Kontaktwegen.",
  alternates: { canonical: `${company.url}${path}` },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: "Häufige Fragen zu FLOXANT",
    description: "Kurze Antworten zu Leistungen, Anfrage und Kontaktwegen.",
  },
};

export default function QuestionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Häufige Fragen zu FLOXANT",
        description: "Antworten zu Leistungen, Anfrage und Kontaktwegen in Düsseldorf und Regensburg.",
        path,
        about: ["Reinigung Düsseldorf", "Umzug Regensburg", "FLOXANT Anfrage"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            Häufige Fragen
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-6xl">
            Kurze Antworten zu Leistungen und Anfrage.
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-200 sm:text-lg">
            Hier finden Sie die wichtigsten Informationen zu Düsseldorf, Regensburg und dem Start einer unverbindlichen Anfrage.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-4">
          {faqItems.map((item, index) => (
            <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <summary className="cursor-pointer text-lg font-black text-slate-950">{item.q}</summary>
              <p className="mt-3 max-w-4xl text-sm font-semibold leading-7 text-slate-700 sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-normal">Ihre Frage ist noch offen?</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">Senden Sie Standort, Leistung und die wichtigsten Eckdaten direkt an FLOXANT.</p>
          </div>
          <Link href="/kontakt?mode=neutral&source=faq" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50">
            Anfrage starten
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
