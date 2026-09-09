import type { Metadata } from "next";
import { ArrowRight, Check, MapPin, PackageOpen } from "lucide-react";
import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import { buildRequestHref } from "@/lib/lead-intents/resolve-request-context";
import { generatePageSEO } from "@/lib/seo";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/duesseldorf/entruempelung";
const title = "Entrümpelung Düsseldorf für Keller & Wohnung | FLOXANT";
const description = "Keller, einzelne Räume oder Wohnung entrümpeln lassen. FLOXANT in Düsseldorf und 75 km Umgebung. Auf Wunsch mit anschließender Reinigung.";
const headline = "Entrümpelung in Düsseldorf – wieder Platz für das, was Sie brauchen.";
const ctaLabel = "Entrümpelung in Düsseldorf anfragen";
const requestHref = buildRequestHref({ location: "duesseldorf", service: "entruempelung", source: "duesseldorf_entruempelung", entryPage: path, ctaComponent: "service_page", ctaPosition: "hero" });
const button = "inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-black text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700";

const scope = [
  { title: "Keller und einzelne Räume", text: "Wir besprechen, welche Gegenstände entfernt werden und was an Ort und Stelle bleibt. Fotos oder eine kurze Beschreibung von Menge, Treppe und Zugang helfen uns beim ersten Überblick." },
  { title: "Wohnung und größere Mengen", text: "Auch eine Wohnung lässt sich im vereinbarten Umfang räumen. Persönliche Unterlagen, Erinnerungsstücke und Gegenstände, die bleiben sollen, grenzen wir vor Beginn gemeinsam ab." },
  { title: "Transport und Entsorgung", text: "Tragen, Abtransport und Entsorgung sind eigene Bestandteile der Abstimmung. Materialarten, Mengen und geeignete Entsorgungswege werden vor dem Auftrag geklärt und im Angebot berücksichtigt." },
  { title: "Reinigung im Anschluss", text: "Wenn Sie die freigeräumten Flächen anschließend reinigen lassen möchten, planen wir die gewünschten Arbeiten und den Termin mit Ihnen. Der Reinigungsumfang wird gesondert vereinbart." },
] as const;
const steps = [
  { title: "Ihr Vorhaben beschreiben", text: "Nennen Sie Ort oder Postleitzahl, Räume, ungefähre Menge und Wunschtermin. Ergänzen Sie Etage, Aufzug und Zugang. Fotos sind hilfreich und freiwillig." },
  { title: "Umfang persönlich klären", text: "Wir besprechen, was bleibt und was entfernt werden soll. Bei unklaren Mengen oder Zugängen vereinbaren wir bei Bedarf eine Besichtigung." },
  { title: "Angebot und Termin abstimmen", text: "Sie erhalten ein Angebot für die vereinbarten Arbeiten. Transport, Entsorgung und optionale Reinigung werden nachvollziehbar benannt. Schlüssel, Zugang und Termin klären wir vor Beginn." },
  { title: "Räume wie vereinbart freimachen", text: "Wir führen die abgestimmten Entrümpelungsarbeiten aus. Zusätzliche Gegenstände oder Arbeiten besprechen wir mit Ihnen, bevor sich der Umfang ändert." },
] as const;
const costFactors = [
  "Menge, Gewicht und Materialarten der zu entfernenden Gegenstände.",
  "Anzahl und Größe der Räume sowie nötige Demontagearbeiten.",
  "Etage, Aufzug, Treppenbreite, Laufwege und Parkmöglichkeit.",
  "Abtransport, vereinbarte Entsorgungswege und Anfahrt.",
  "Gewünschter Termin und ergänzende Arbeiten wie Reinigung.",
] as const;
const faq = [
  { q: "Kann ich auch nur einen Keller oder einzelne Räume entrümpeln lassen?", a: "Ja. Nennen Sie die Räume und beschreiben Sie, was entfernt werden soll. Wir stimmen den Umfang für Ihren Keller, einzelne Räume oder eine Wohnung persönlich mit Ihnen ab." },
  { q: "Welche Angaben reichen für ein erstes Angebot?", a: "Ort oder Postleitzahl, Räume, ungefähre Menge und Wunschtermin sind ein guter Anfang. Etage, Aufzug, Laufwege und freiwillige Fotos helfen bei der Einschätzung. Fehlende Details klären wir im Gespräch." },
  { q: "Sind Abtransport und Entsorgung automatisch enthalten?", a: "Die vereinbarten Leistungen stehen in Ihrem Angebot. Wir klären Materialarten, Mengen, Transport und geeignete Entsorgungswege vorab. Besondere oder problematische Materialien nennen Sie bitte ausdrücklich; ihre Annahme wird separat geprüft." },
  { q: "Was passiert mit Gegenständen, die ich behalten möchte?", a: "Vor Beginn legen wir gemeinsam fest, was bleiben soll. Kennzeichnen oder trennen Sie persönliche Unterlagen, Erinnerungsstücke und andere wichtige Gegenstände. Unklare Fälle besprechen wir mit Ihnen." },
  { q: "Was beeinflusst den Preis einer Entrümpelung?", a: "Vor allem Menge, Gewicht, Materialarten und Zugänglichkeit bestimmen den Aufwand. Auch Demontage, Tragewege, Abtransport, Entsorgung und ergänzende Reinigung fließen ein. Einen konkreten Preis erhalten Sie für den besprochenen Umfang." },
  { q: "Kann FLOXANT danach reinigen und wie wird der Termin vereinbart?", a: "Ja, eine anschließende Reinigung können Sie mit anfragen. Wir vereinbaren die konkreten Flächen, Aufgaben, den Zugang und den gewünschten Zustand. Beide Arbeitsschritte und der Termin werden persönlich abgestimmt und bestätigt." },
] as const;

export const metadata: Metadata = generatePageSEO({ path, title, description });

export default function DuesseldorfClearancePage() {
  const graph = [
    buildWebPageJsonLd({ name: headline, description, path, about: ["Entrümpelung Düsseldorf"], potentialActions: [{ name: ctaLabel, target: requestHref, type: "ContactAction" }] }),
    buildServiceJsonLd({ name: "Entrümpelung Düsseldorf", description, path, serviceType: "Entrümpelung" }),
    buildFaqJsonLd(faq),
  ];
  return <main className="bg-white text-slate-950">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />
    <section className="bg-slate-50 px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Brotkrumennavigation" className="flex flex-wrap gap-2 text-sm font-semibold text-blue-800"><Link href="/">Startseite</Link><span aria-hidden="true">/</span><Link href="/duesseldorf">Düsseldorf</Link><span aria-hidden="true">/</span><span className="text-slate-600">Entrümpelung</span></nav>
        <p className="mt-8 flex items-center gap-2 text-sm font-bold text-blue-700"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Düsseldorf · 75 km Umgebung</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{headline}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">Der Keller ist voll, einzelne Räume müssen frei werden oder eine Wohnung soll geräumt werden? FLOXANT übernimmt die vereinbarten Entrümpelungsarbeiten in Düsseldorf und Umgebung. Gemeinsam klären wir, was bleiben soll, was entfernt wird und ob anschließend eine Reinigung gewünscht ist.</p>
        <div className="mt-7"><Link href={requestHref} data-service-cta="entruempelung" data-location="duesseldorf" className={button}>{ctaLabel}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></Link></div>
        <p className="mt-3 text-sm leading-6 text-slate-600">Erzählen Sie uns, was ansteht. Ihre Anfrage ist unverbindlich.</p>
      </div>
    </section>
    <section className="px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black tracking-tight">Was soll frei werden?</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">Vom einzelnen Raum bis zur Wohnung: Sie entscheiden, welche Arbeiten Sie abgeben möchten. Wir halten fest, welche Leistungen dazugehören.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{scope.map(item => <article key={item.title} className="rounded-xl border border-slate-200 p-6"><PackageOpen className="h-6 w-6 text-blue-700" aria-hidden="true" /><h3 className="mt-4 text-xl font-black">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.text}</p></article>)}</div>
      </div>
    </section>
    <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl"><h2 className="text-3xl font-black tracking-tight">So besprechen wir Ihre Entrümpelung</h2><ol className="mt-7 grid gap-6 md:grid-cols-2">{steps.map((step, index) => <li key={step.title} className="rounded-xl bg-white p-6"><span className="text-sm font-black text-blue-700">Schritt {index + 1}</span><h3 className="mt-2 text-xl font-black">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.text}</p></li>)}</ol></div>
    </section>
    <section className="px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div><h2 className="text-3xl font-black tracking-tight">Wovon hängt der Preis ab?</h2><ul className="mt-6 grid gap-4">{costFactors.map(factor => <li key={factor} className="flex gap-3 leading-7 text-slate-700"><Check className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />{factor}</li>)}</ul><p className="mt-5 leading-7 text-slate-600">Sie erhalten ein persönliches Angebot. Kosten und Umfang zusätzlicher Arbeiten stimmen wir vor ihrer Ausführung mit Ihnen ab.</p></div>
        <div className="rounded-xl bg-slate-950 p-7 text-white"><h2 className="text-3xl font-black tracking-tight">Düsseldorf und 75 km Umgebung</h2><p className="mt-5 leading-7 text-slate-200">Wir übernehmen Entrümpelungen im Düsseldorfer Stadtgebiet und bis 75 km Luftlinie um unseren Standort. Nennen Sie uns die konkrete Einsatzadresse, damit wir Anfahrt und Zugang planen können.</p><p className="mt-4 leading-7 text-slate-200">Sie wünschen danach saubere Räume? Unsere Reinigung können Sie ergänzen oder eigenständig beauftragen.</p><Link href="/duesseldorf/reinigung" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded font-bold text-cyan-200 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Reinigung in Düsseldorf<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      </div>
    </section>
    <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black tracking-tight">Häufige Fragen zur Entrümpelung in Düsseldorf</h2><div className="mt-7 divide-y divide-slate-200">{faq.map(item => <details key={item.q} className="group py-5"><summary className="cursor-pointer rounded text-lg font-bold leading-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">{item.q}</summary><p className="mt-3 leading-7 text-slate-600">{item.a}</p></details>)}</div></div></section>
    <section className="px-5 py-14 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-black tracking-tight">Gemeinsam den nächsten Schritt klären</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">Beschreiben Sie kurz Ihre Räume, den gewünschten Umfang und Termin. Wir melden uns persönlich bei Ihnen.</p><div className="mt-6"><Link href={requestHref} data-service-cta="entruempelung" data-location="duesseldorf" className={button}>{ctaLabel}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></Link></div><Link href="/duesseldorf" className="mt-5 inline-flex min-h-11 items-center rounded font-bold text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Alle Leistungen in Düsseldorf</Link></div></section>
  </main>;
}
