import Link from "next/link";
import { ArrowRight } from "lucide-react";

const intentOptions = [
  {
    label: "Fotos oder Angebot vorhanden",
    href: "/kontakt?service=angebot-pruefen&intent=angebot-mit-fotos&source=contact-routing",
    service: "angebot-pruefen",
    intent: "angebot-mit-fotos",
  },
  {
    label: "Rueckruf gewuenscht",
    href: "/kontakt?service=sonstiges&intent=rueckruf-gewuenscht&source=contact-routing",
    service: "sonstiges",
    intent: "rueckruf-gewuenscht",
  },
  {
    label: "Termin/Deadline wichtig",
    href: "/kontakt?service=angebot-pruefen&intent=deadline-pruefen&source=contact-routing",
    service: "angebot-pruefen",
    intent: "deadline-pruefen",
  },
  {
    label: "Diskret abstimmen",
    href: "/kontakt?service=diskret-service&intent=diskret-service&source=contact-routing",
    service: "diskret-service",
    intent: "diskret-service",
  },
] as const;

export function ServiceIntentSelector() {
  const city = "regensburg";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5" data-component="ServiceIntentSelector">
      <h3 className="text-lg font-black text-slate-950">Optionale Richtung</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        Diese Schnellwahl setzt nur Query-Parameter. Es wird keine API aufgerufen.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {intentOptions.map((item) => {
          const href = item.href.includes("&source=") ? item.href.replace("&source=", `&city=${city}&source=`) : item.href;

          return (
          <Link
            key={item.label}
            href={href}
            className="inline-flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
            data-event="seo_cta_click"
            data-service={item.service}
            data-city={city}
            data-page-intent={item.intent}
            data-priority="p1"
            data-cta-label={item.label}
            data-destination={href}
          >
            {item.label}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
          );
        })}
      </div>
    </div>
  );
}
