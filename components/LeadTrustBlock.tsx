import { CheckCircle2 } from "lucide-react";

const defaultTrustItems = [
  "Anfrage kostenlos und unverbindlich stellen.",
  "Leistungsumfang wird individuell abgestimmt.",
  "Termine werden nach Verfuegbarkeit geprueft.",
  "Reinigung, Umzug und Entruempelung koennen kombiniert werden.",
  "Klare Rueckmeldung nach Sichtung der Angaben.",
] as const;

export function LeadTrustBlock({
  items = defaultTrustItems,
  tone = "light",
}: {
  items?: readonly string[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={
        dark
          ? "grid gap-3 rounded-lg border border-white/12 bg-white/8 p-4 text-sm text-slate-100"
          : "grid gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-950/5"
      }
    >
      {items.map((item) => (
        <div key={item} className="flex gap-3">
          <CheckCircle2
            className={dark ? "mt-0.5 h-4 w-4 shrink-0 text-cyan-200" : "mt-0.5 h-4 w-4 shrink-0 text-emerald-600"}
            aria-hidden="true"
          />
          <span className="font-semibold leading-6">{item}</span>
        </div>
      ))}
    </div>
  );
}
