import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

import { company } from "@/lib/company";
import { publicSignatureSolutions } from "@/lib/services/signature-solutions";

const path = "/signature-services";

const faqItems = [
  {
    question: "Was sind FLOXANT Signature Services?",
    answer:
      "Signature Services sind geprüfte Anfragewege für Situationen, in denen Angebot, Objektangaben, Übergabe, Ausweichplanung oder sensible Rahmenbedingungen zuerst strukturiert werden müssen.",
  },
  {
    question: "Entsteht durch die Nutzung bereits ein Auftrag?",
    answer:
      "Nein. Die Anfrage dient der Einordnung. Leistung, Verfügbarkeit, Umfang und ein möglicher Auftrag werden erst nach Prüfung und Abstimmung bestätigt.",
  },
  {
    question: "Welche Angaben helfen bei der Einordnung?",
    answer:
      "Hilfreich sind Region, gewünschte Leistung, Objekt oder Route, Termin, Zugang und eine kurze Beschreibung. Fotos oder ein vorhandenes Angebot können freiwillig ergänzt werden.",
  },
  {
    question: "Welche Grenzen gelten?",
    answer:
      "Es gibt keine Preis-, Ersparnis-, Soforteinsatz-, Abnahme- oder Verfügbarkeitsgarantie. Die einzelnen Lösungen nennen ihre zusätzlichen Grenzen ausdrücklich.",
  },
] as const;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${company.url}${path}#webpage`,
      url: `${company.url}${path}`,
      name: "FLOXANT Signature Services und Speziallösungen",
      description:
        "Öffentlich geprüfte Anfragewege für Angebotsprüfung, Objektangaben, Übergabe, Plan B, diskrete Situationen sowie kombinierte Umzugs- und Reinigungsanfragen.",
      inLanguage: "de-DE",
    },
    {
      "@type": "ItemList",
      "@id": `${company.url}${path}#solutions`,
      name: "Öffentlich freigegebene FLOXANT Lösungen",
      itemListElement: publicSignatureSolutions.map((solution, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: solution.name,
        url: `${company.url}${solution.canonicalRoute}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${company.url}${path}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export function GermanSignatureServicesHub() {
  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Öffentlich geprüfte Lösungen
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Strukturierte Anfragewege für Situationen jenseits eines Standardformulars
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            Diese Lösungen ordnen vorhandene Angebote, Objektangaben, Übergaben,
            Ausweichplanung oder sensible Situationen, bevor eine separate Leistung vereinbart wird.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20" aria-labelledby="solutions-heading">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">Signature und Spezial</p>
            <h2 id="solutions-heading" className="mt-3 text-3xl font-black sm:text-4xl">
              Problem, Ergebnis und Grenzen auf einen Blick
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publicSignatureSolutions.map((solution) => (
              <article
                id={`solution-${solution.id}`}
                key={solution.id}
                className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-950">
                    {solution.kind === "SIGNATURE" ? "Signature Service" : "Speziallösung"}
                  </span>
                  <ShieldCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-black leading-tight">{solution.name}</h3>
                <p className="mt-3 font-medium leading-7 text-slate-700">{solution.actualFunction}</p>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-black">Situation</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{solution.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-black">Ergebnis</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{solution.result}</dd>
                  </div>
                  <div>
                    <dt className="font-black">Benötigte Angaben</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">
                      {solution.requiredDetails.slice(0, 4).join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-black">Grenzen</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">
                      {solution.boundaries.join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-black">Geprüfte Regionen</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">
                      {solution.regions.join(" · ")}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={solution.cta.href}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-black text-blue-800 outline-none hover:text-blue-950 focus-visible:ring-2 focus-visible:ring-cyan-600"
                >
                  {solution.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <aside className="mt-12 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-black">Klare Grenzen bleiben Teil jeder Anfrage</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Keine automatische Buchung oder Leistungsbestätigung",
                "Keine Rechtsberatung",
                "Keine Preis- oder Ersparnisgarantie",
                "Keine garantierte sofortige Verfügbarkeit",
              ].map((item) => (
                <li key={item} className="flex gap-3 font-semibold leading-7 text-slate-200">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/service-finder"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white"
              >
                Service Finder nutzen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/fragen"
                className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-5 text-sm font-black text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-200"
              >
                Häufige Fragen
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black">Häufige Fragen</h2>
          <div className="mt-7 grid gap-4">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-black">{item.question}</h3>
                <p className="mt-2 font-medium leading-7 text-slate-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
