import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { floxantLocationList, getLocationContactHref } from "@/lib/floxant-locations";
import { generatePageSEO } from "@/lib/seo";
import places from "@/data/serviceAreas/selected75kmPlaces.json";

export const metadata = generatePageSEO({
  path: "/standorte", lang: "de",
  title: "Düsseldorf & Regensburg: Standorte und Einsatzgebiete | FLOXANT",
  description: "Reinigung in Düsseldorf sowie Reinigung, Umzug und Entrümpelung in Regensburg. Zwei Standorte, jeweils 75 km Umkreis. Finden Sie Ihren Kontakt bei FLOXANT.",
});

export default function LocationsPage() {
  return <main className="bg-white text-slate-950">
    <Breadcrumbs items={[{label:"Standorte und Einsatzgebiete"}]} />
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:pt-12">
      <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">Für Sie in Düsseldorf und Regensburg unterwegs.</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">Wir übernehmen Reinigung in Düsseldorf sowie Reinigung, Umzug und Entrümpelung in Regensburg. Rund um beide Standorte betreuen wir Orte im Umkreis von jeweils 75 km. Beschreiben Sie kurz, wobei Sie Unterstützung brauchen – wir stimmen die passende Leistung mit Ihnen ab.</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {floxantLocationList.map(location => <article key={location.locationKey} className="rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-3xl font-bold">{location.displayName}</h2>
          <p className="mt-4 leading-7 text-slate-700">{location.locationKey === "duesseldorf" ? "Für saubere Wohnungen, Büros und Gewerberäume: regelmäßige Reinigung, Grund- und Endreinigung, Fenster und Treppenhäuser. Umfang und Ablauf passen wir an Ihr Objekt an." : "Für Ihren nächsten Umzug, eine geräumte Wohnung oder die laufende Reinigung: Wir planen die vereinbarten Arbeiten mit Ihnen und berücksichtigen Zugänge, Möbel und den gewünschten Termin."}</p>
          <address className="mt-6 not-italic leading-7">{location.addressLine1}<br />{location.postalCode} {location.city}</address>
          <p className="mt-3"><a href={"tel:" + location.phoneRaw} className="font-bold text-blue-800 underline underline-offset-4">{location.phone}</a></p>
          <p className="mt-2"><a href={"mailto:" + location.email} className="text-blue-800 underline underline-offset-4">{location.email}</a></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={getLocationContactHref(location.locationKey)} className="inline-flex min-h-12 items-center rounded-lg bg-blue-700 px-5 font-bold text-white hover:bg-blue-800">Angebot anfragen</Link>
            <Link href={location.localLandingPage} className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 px-5 font-bold text-slate-800 hover:bg-slate-50">Leistungen ansehen</Link>
          </div>
          <h3 className="mt-8 text-xl font-bold">In {location.city} und Umgebung</h3>
          <p className="mt-3 leading-7 text-slate-700">Zum Einsatzgebiet gehören beispielsweise {places[location.locationKey].filter(p=>p.name!==location.city).map(p=>p.name).join(", ")}.</p>
          <p className="mt-3 leading-7 text-slate-700">Ihr Ort ist nicht genannt? Senden Sie uns Ort oder Postleitzahl zusammen mit Ihrem Anliegen.</p>
        </article>)}
      </div>
      <div className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold">Was bedeutet der 75-km-Umkreis?</h2>
        <p className="mt-4 leading-7 text-slate-700">Gemeint ist die Luftlinie zum jeweiligen Stadtzentrum. Die Anfahrt zur konkreten Adresse kann länger sein; Fahrtzeit und Anfahrtskosten stimmen wir im Angebot ab. Bei Adressen am Rand des Einsatzgebiets klären wir die Entfernung und die gewünschte Leistung persönlich.</p>
        <h2 className="mt-8 text-2xl font-bold">Ein Umzug mit weiter entferntem Ziel?</h2>
        <p className="mt-4 leading-7 text-slate-700">Ein Fernumzug ab Regensburg kann über das lokale Einsatzgebiet hinausführen. Nennen Sie uns dafür Start- und Zielort sowie den ungefähren Umfang. <Link href="/regensburg/umzug" className="font-semibold text-blue-800 underline underline-offset-4">Mehr zum Umzug ab Regensburg</Link>.</p>
        <p className="mt-8 text-sm leading-6 text-slate-600">Ortsauswahl anhand von <a href="https://www.geonames.org/" className="underline" rel="noopener noreferrer" target="_blank">GeoNames</a>, <a href="https://creativecommons.org/licenses/by/4.0/" className="underline" rel="noopener noreferrer" target="_blank">CC BY 4.0</a>. Stand: 9. September 2026. Die Liste ist eine Auswahl; sie bezeichnet keine zusätzlichen Niederlassungen.</p>
      </div>
    </section>
  </main>;
}
