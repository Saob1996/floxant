import { CheckCircle2 } from "lucide-react";

import { germanText, germanizeDeep } from "@/lib/german-text";
import type { VisualProofItem } from "@/lib/visual-proof";

function ProofShape({ shape }: { shape: VisualProofItem["fallbackShape"] }) {
  const labels: Record<VisualProofItem["fallbackShape"], string[]> = {
    process: ["Senden", "Sortieren", "Prüfen", "Antwort"],
    checklist: ["Ort", "Fotos", "Umfang", "Termin"],
    offer: ["Preis", "Umfang", "Offen", "Nächster Schritt"],
    "before-after": ["Vorher neutral", "Nachher neutral"],
    local: ["Düsseldorf", "Regensburg", "Kontakt", "Service"],
  };

  return (
    <div className="mt-5 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      {labels[shape].map((label, index) => (
        <div key={label} className="flex items-center gap-3 rounded-md bg-white p-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-700 text-xs font-black text-white">{index + 1}</span>
          <span className="text-sm font-black text-slate-800">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function VisualProofCard({ item }: { item: VisualProofItem }) {
  const visibleItem = germanizeDeep(item);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" data-component="VisualProofCard" data-real-photo={visibleItem.isRealPhoto ? "true" : "false"}>
      <p className="text-xs font-black uppercase tracking-normal text-blue-700">{visibleItem.type}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{germanText(visibleItem.title, visibleItem.title)}</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{germanText(visibleItem.description, visibleItem.description)}</p>
      <ProofShape shape={visibleItem.fallbackShape} />
      <div className="mt-4 flex gap-2 text-xs font-bold leading-5 text-slate-600">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
        <span>{germanText(visibleItem.alt, visibleItem.alt)}</span>
      </div>
    </article>
  );
}
