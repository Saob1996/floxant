import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildServiceContactHref } from "@/lib/service-routing";

const intentOptions = [
  {
    label: "Fotos oder Angebot vorhanden",
    service: "angebot-pruefen",
    intent: "angebot-mit-fotos",
  },
  {
    label: "Rückruf gewünscht",
    service: "sonstiges",
    intent: "rueckruf-gewuenscht",
  },
  {
    label: "Termin/Deadline wichtig",
    service: "angebot-pruefen",
    intent: "deadline-pruefen",
  },
  {
    label: "Diskret abstimmen",
    service: "diskret-service",
    intent: "diskret-service",
  },
] as const;

export function ServiceIntentSelector() {
  const city = "regensburg";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5" data-component="ServiceIntentSelector">
      <h3 className="text-lg font-black text-slate-950">Was ist Ihnen besonders wichtig?</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        Wählen Sie eine passende Situation. Ihre Anfrage wird erst im Formular gesendet.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {intentOptions.map((item) => {
          const href = buildServiceContactHref({
            service: item.service,
            city,
            intent: item.intent,
            source: "contact-routing",
            anchor: "",
          });

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
