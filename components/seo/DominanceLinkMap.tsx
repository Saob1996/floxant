import Link from "next/link";
import { ArrowRight, Compass, Layers3 } from "lucide-react";

const clusters = [
 {
  title: "Kernservices",
  intro: "Direkte Kontaktwege für die häufigsten Anfragen.",
  links: [
   { href: "/umzug", label: "Umzug Regensburg & Bayern" },
   { href: "/reinigung", label: "Reinigung Regensburg & Bayern" },
   { href: "/entruempelung", label: "Entrümpelung Regensburg & Bayern" },
   { href: "/bueroumzug", label: "Büroumzug & Firmenumzug" },
  ],
 },
 {
  title: "Besondere Situationen",
  intro: "Wenn Reinigung, Umzug, Entsorgung oder Übergabe zusammen gedacht werden müssen.",
  links: [
   { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt Richtung Regensburg" },
   { href: "/firmenentsorgung", label: "Firmenentsorgung & Büroinventar" },
   { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung" },
   { href: "/private-client-service", label: "Private Client Service" },
  ],
 },
 {
  title: "Anfrage vorbereiten",
  intro: "Budget, Ablauf, Region und offene Fragen vor dem Auftrag klären.",
  links: [
   { href: "/rechner", label: "FLOXANT Rechner" },
   { href: "/kontakt", label: "Kontakt Regensburg" },
   { href: "/buchung-ablauf", label: "Buchung und Ablauf" },
   { href: "/leistungen-vergleichen", label: "Leistungen vergleichen" },
   { href: "/anbieter-vergleichen", label: "Anbieter fair vergleichen" },
   { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
   { href: "/kostenfaktoren", label: "Kostenfaktoren verstehen" },
   { href: "/qualitaet-ablauf", label: "Qualität und Ablauf prüfen" },
   { href: "/praxisfaelle", label: "Praxisfälle vergleichen" },
   { href: "/einsatzgebiet-regensburg-200km", label: "Einsatzgebiet ab Regensburg" },
   { href: "/blog", label: "Blog und Ratgeber" },
  ],
 },
 {
  title: "Düsseldorf Reinigung",
  intro: "Reinigung für Büro, Praxis, Wohnung, Treppenhaus, Gewerbe und vorhandene Angebote.",
  links: [
   { href: "/duesseldorf/reinigung", label: "Reinigungsfirma Düsseldorf" },
   { href: "/duesseldorf/bueroreinigung", label: "Büro reinigen Düsseldorf" },
   { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
   { href: "/duesseldorf/treppenhausreinigung", label: "Hauseingang & Treppenhaus" },
   { href: "/blog/reinigungsfirma-duesseldorf-in-der-naehe-stadtteile", label: "Reinigung in der Nähe" },
   { href: "/blog/reinigungsunternehmen-duesseldorf-anbieter-vergleichen", label: "Anbieter vergleichen" },
   { href: "/blog/reinigungsfirma-duesseldorf-preise-kosten-angebot-pruefen", label: "Preise & Kosten einordnen" },
   { href: "/blog/buero-reinigen-duesseldorf-bueroreinigung-angebot", label: "Büroreinigung Angebot" },
  ],
 },
 {
  title: "Angebote prüfen",
  intro: "Vorhandene Angebote sachlich einordnen, ohne Preisgarantie oder Druck.",
  links: [
   { href: "/angebot-guenstiger-pruefen", label: "Angebot günstiger prüfen" },
   { href: "/blog/umzugsangebot-muenchen-pruefen-festpreis-guenstiger", label: "München Festpreis prüfen" },
   { href: "/blog/entruempelung-regensburg-angebot-haushaltsaufloesung-pruefen", label: "Entrümpelung Angebot Regensburg" },
   { href: "/blog/besseres-guenstigeres-angebot-floxant-pruefen", label: "Besseres Angebot finden" },
  ],
 },
];

export function DominanceLinkMap({ compact = false }: { compact?: boolean }) {
 return (
  <section className={`relative overflow-hidden px-6 ${compact ? "py-12" : "py-24"}`}>
   <div className="mx-auto max-w-7xl">
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 ">
       <Compass className="h-4 w-4" />
       FLOXANT Leistungen finden
      </div>
      <h2 className={`${compact ? "mt-3 text-3xl flox-display-section-tight" : "mt-4 text-4xl md:text-5xl flox-display-section"} font-semibold text-foreground`}>
       Vom konkreten Problem zur passenden Seite.
      </h2>
     </div>
     <p className="max-w-xl text-sm leading-relaxed text-foreground/45 md:text-right">
      Wenn Sie noch nicht sicher sind, welche Leistung passt, starten Sie über den Fall:
      Umzug, Reinigung, Entrümpelung, Budget, vorhandenes Angebot oder besondere Situation.
     </p>
    </div>

    <div className="grid gap-5 lg:grid-cols-3">
     {clusters.map((cluster) => (
      <div key={cluster.title} className="min-w-0 rounded-[1rem] border border-foreground/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-6">
       <div className="mb-5 flex items-start gap-3">
        <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-3 text-blue-700 ">
         <Layers3 className="h-5 w-5" />
        </div>
        <div>
         <h3 className="text-2xl font-semibold text-foreground">{cluster.title}</h3>
         <p className="mt-2 text-sm leading-relaxed text-foreground/42">{cluster.intro}</p>
        </div>
       </div>

       <div className="grid gap-2">
        {cluster.links.map((link) => (
         <Link
          key={link.href}
          href={link.href}
          className="group flex min-w-0 items-center justify-between gap-3 rounded-[0.9rem] border border-foreground/8 bg-foreground/5 px-4 py-3 text-sm font-semibold text-foreground/58 transition-all hover:border-blue-300/25 hover:bg-blue-500/10 hover:text-foreground"
         >
          {link.label}
          <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
         </Link>
        ))}
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
}
