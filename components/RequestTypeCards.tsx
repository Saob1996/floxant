import Link from "next/link";
import { ArrowRight, Building2, HelpCircle, Home, Package, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";

const requestTypes = [
  {
    title: "Ich brauche Reinigung",
    text: "Wohnung, Büro, Endreinigung, Grundreinigung oder Reinigung nach Räumung.",
    href: "/kontakt?service=reinigung&intent=reinigung-anfrage&priority=p1&source=contact-routing",
    service: "reinigung",
    intent: "reinigung-anfrage",
    priority: "p1",
    Icon: Sparkles,
  },
  {
    title: "Ich brauche Umzug/Transport",
    text: "Privatumzug, Möbeltransport, Beiladung, Seniorenumzug oder Plan-B.",
    href: "/kontakt?service=umzug&intent=umzug-transport&priority=p1&source=contact-routing",
    service: "umzug",
    intent: "umzug-transport",
    priority: "p1",
    Icon: Package,
  },
  {
    title: "Ich brauche Entrümpelung",
    text: "Keller, Wohnung, Haushaltsauflösung, Nachlass oder Räumung mit Reinigung.",
    href: "/kontakt?service=entruempelung&intent=entruempelung-aufloesung&priority=p1&source=contact-routing",
    service: "entruempelung",
    intent: "entruempelung-aufloesung",
    priority: "p1",
    Icon: Home,
  },
  {
    title: "Ich möchte ein Angebot prüfen",
    text: "Vorhandenes Angebot, unklare Zusatzkosten oder mehrere Anbieter vergleichen.",
    href: "/kontakt?service=angebot-pruefen&intent=angebot-pruefen&priority=p0&source=contact-routing",
    service: "angebot-pruefen",
    intent: "angebot-pruefen",
    priority: "p0",
    Icon: SearchCheck,
  },
  {
    title: "Ich bin Gewerbekunde",
    text: "Büro, Gewerbe, Praxis, Hotel, Turnus, Zeitfenster oder vorhandenes B2B-Angebot.",
    href: "/kontakt?service=bueroreinigung&intent=b2b-bueroreinigung&priority=p0&source=contact-routing",
    service: "bueroreinigung",
    intent: "b2b-bueroreinigung",
    priority: "p0",
    Icon: Building2,
  },
  {
    title: "Ich habe einen Plan-B-Fall",
    text: "Anbieter reagiert nicht, Termin kippt oder es muss schnell neu sortiert werden.",
    href: "/kontakt?service=angebot-pruefen&intent=plan-b-anbieterabsage&priority=p0&source=contact-routing",
    service: "angebot-pruefen",
    intent: "plan-b-anbieterabsage",
    priority: "p0",
    Icon: ShieldCheck,
  },
  {
    title: "Ich bin unsicher",
    text: "Kurze Lage beschreiben. FLOXANT ordnet Service, Aufwand und Rückfragen ein.",
    href: "/kontakt?service=sonstiges&intent=unsichere-anfrage&priority=p2&source=contact-routing",
    service: "sonstiges",
    intent: "unsichere-anfrage",
    priority: "p2",
    Icon: HelpCircle,
  },
] as const;

export function RequestTypeCards() {
  const city = "regensburg";

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-component="RequestTypeCards">
      {requestTypes.map((item) => {
        const href = item.href.includes("&source=") ? item.href.replace("&source=", `&city=${city}&source=`) : item.href;

        return (
        <Link
          key={item.title}
          href={href}
          className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200"
          data-event="seo_cta_click"
          data-service={item.service}
          data-city={city}
          data-page-intent={item.intent}
          data-priority={item.priority}
          data-cta-label={item.title}
          data-destination={href}
        >
          <item.Icon className="h-5 w-5 text-blue-700" />
          <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
            Auswählen
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
        );
      })}
    </div>
  );
}
