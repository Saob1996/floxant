import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MessageCircle, ShieldCheck } from "lucide-react";

import { CheaperAlternativeForm } from "@/components/CheaperAlternativeForm";
import { company } from "@/lib/company";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/angebot-guenstiger-pruefen";
const canonical = `${company.url}${path}`;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  "Hallo FLOXANT, ich möchte ein vorhandenes Angebot praktisch prüfen lassen. Leistung, Ort und Preis kann ich senden.",
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Angebot prüfen lassen: Umfang & Zusatzkosten | FLOXANT",
  description:
    "FLOXANT prüft vorhandene Angebote praktisch auf Leistungsumfang, offene Positionen und mögliche Zusatzkosten und kann eine eigene Alternative anbieten.",
  alternates: { canonical, languages: { "de-DE": path, en: "/en/quote-check", "x-default": path } },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    title: "Vorhandenes Angebot praktisch prüfen lassen",
    description: "Zweitmeinung zu Umfang, Preispositionen und offenen Zusatzkosten – mit möglichem FLOXANT Alternativangebot.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "FLOXANT Angebotsprüfung" }],
  },
};

const faqs = [
  {
    q: "Ist FLOXANT eine unabhängige Verbraucherberatung?",
    a: "Nein. FLOXANT bietet eine praktische Zweitmeinung aus Sicht eines Dienstleisters. Wenn Leistung, Ort, Termin und Kapazität passen, kann FLOXANT zusätzlich ein eigenes alternatives Angebot erstellen.",
  },
  {
    q: "Was wird bei einem Angebot betrachtet?",
    a: "Relevant sind der beschriebene Leistungsumfang, Ausschlüsse, Zusatzleistungen, Termin, Zugang, Mengen- oder Flächenannahmen und mögliche Zusatzkosten. Eine rechtliche Vertragsprüfung findet nicht statt.",
  },
  {
    q: "Muss ich das vollständige Angebot hochladen?",
    a: "Nein. Für den Einstieg reichen Leistung, Ort, vorhandener Preis und ein Kontaktweg. Ein PDF, Screenshot oder Angebotstext kann anschließend freiwillig ergänzt werden.",
  },
  {
    q: "Verspricht FLOXANT einen niedrigeren Preis?",
    a: "Nein. Ein niedrigerer Preis ist nicht garantiert. Das Ergebnis kann auch sein, dass der vorhandene Preis zum beschriebenen Umfang plausibel wirkt oder dass vor einer Zusage weitere Angaben nötig sind.",
  },
] as const;

function JsonLd() {
  const description = metadata.description as string;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({ name: "Angebot prüfen lassen", description, path, about: ["Angebotsprüfung"] }),
      buildServiceJsonLd({
        name: "FLOXANT Angebotsprüfung",
        description,
        path,
        serviceType: "Praktische Zweitmeinung zu Dienstleistungsangeboten",
        areaServed: ["Düsseldorf", "Regensburg"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Angebot prüfen", item: path },
      ]),
      buildFaqJsonLd(faqs),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

export default function OfferCheckPage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-950">
      <JsonLd />
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-cyan-300"><FileSearch className="h-4 w-4" /> Praktische Zweitmeinung</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Vorhandenes Angebot prüfen lassen</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">FLOXANT macht sichtbar, welche Leistungen enthalten sind, welche Punkte offenbleiben und wo Zusatzkosten entstehen könnten. Wenn der Auftrag zu FLOXANT passt, kann daraus ein eigenes alternatives Angebot entstehen.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#guenstiger-form" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-cyan-400 px-5 text-sm font-black text-slate-950 hover:bg-cyan-300">Angebot prüfen lassen <ArrowRight className="h-4 w-4" /></a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-black text-white hover:bg-white/10"><MessageCircle className="h-4 w-4" /> Per WhatsApp senden</a>
            </div>
          </div>
          <aside className="rounded-xl border border-white/15 bg-white/10 p-6" aria-label="Transparente Rolle von FLOXANT">
            <ShieldCheck className="h-8 w-8 text-cyan-300" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black">Was Sie erhalten</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-200">
              {[
                "eine praktische Einordnung des beschriebenen Leistungsumfangs",
                "Hinweise auf offene Positionen und mögliche Zusatzkosten",
                "bei passender Leistung und Kapazität ein eigenes FLOXANT Angebot",
              ].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />{item}</li>)}
            </ul>
            <p className="mt-5 text-sm leading-6 text-slate-300">Keine Rechtsberatung, keine Bewertung des anderen Unternehmens und keine Garantie für einen niedrigeren Preis.</p>
          </aside>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="offer-check-scope">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Vier Angaben für den Start</p>
            <h2 id="offer-check-scope" className="mt-3 text-3xl font-black sm:text-4xl">Leistung, Ort, Preis und Kontakt</h2>
            <p className="mt-5 leading-8 text-slate-600">Diese Kerndaten reichen für den Einstieg. Angebot, Fotos, Termin, Fläche oder weitere Aufgaben können Sie freiwillig ergänzen. Dadurch bleibt der Anfrageweg kurz, ohne Informationen zu verlieren, die für eine belastbare Alternative wichtig werden.</p>
            <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-black">FLOXANT schaut besonders auf</h3>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                {[
                  "genaue Leistungen und ausdrücklich ausgeschlossene Arbeiten",
                  "Mengen, Fläche, Etagen, Laufwege und Zugang",
                  "Material, Entsorgung, Montage und weitere Zusatzpositionen",
                  "Termin, Gültigkeit und Bedingungen für Preisänderungen",
                ].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}
              </ul>
            </div>
          </div>
          <CheaperAlternativeForm />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="offer-check-process">
        <div className="mx-auto max-w-7xl">
          <h2 id="offer-check-process" className="text-3xl font-black sm:text-4xl">So läuft die Zweitmeinung ab</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["1", "Kernangaben senden", "Leistung, Stadt, Angebotspreis und Kontaktweg angeben. Dokumente bleiben optional."],
              ["2", "Umfang gegenüberstellen", "FLOXANT trennt enthaltene Leistungen, offene Punkte und mögliche Zusatzpositionen."],
              ["3", "Entscheidung vorbereiten", "Sie erhalten eine praktische Rückmeldung und gegebenenfalls ein eigenes alternatives Angebot."],
            ].map(([number, title, text]) => <li key={number} className="rounded-xl border border-slate-200 bg-white p-6"><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-700 text-sm font-black text-white">{number}</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="offer-check-faq">
        <div className="mx-auto max-w-4xl">
          <h2 id="offer-check-faq" className="text-3xl font-black">Häufige Fragen</h2>
          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq) => <details key={faq.q} className="py-5"><summary className="cursor-pointer list-none font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">{faq.q}</summary><p className="mt-3 leading-7 text-slate-600">{faq.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="bg-blue-800 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-3xl font-black">Offene Positionen vor der Zusage sehen</h2><p className="mt-3 max-w-2xl text-blue-100">Starten Sie mit vier Kerndaten. Weitere Unterlagen können Sie bei Bedarf direkt ergänzen.</p></div>
          <a href="#guenstiger-form" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-blue-900">Angebot senden <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
