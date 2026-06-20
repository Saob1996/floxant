import { Camera, CheckCircle2 } from "lucide-react";

import { getServiceProofInput } from "@/lib/trust-proof";

type ServiceProofChecklistProps = {
  serviceKey?: string;
  title?: string;
  intro?: string;
  className?: string;
};

export function ServiceProofChecklist({
  serviceKey = "reinigung",
  title,
  intro,
  className = "",
}: ServiceProofChecklistProps) {
  const proof = getServiceProofInput(serviceKey);

  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="ServiceProofChecklist">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Camera className="h-4 w-4" aria-hidden="true" />
            Proof-Checkliste
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title || proof.title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro || proof.intro}</p>
          {proof.photosHelp ? (
            <p className="mt-4 rounded-lg border border-blue-100 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
              Fotos sind freiwillig, helfen aber bei Zustand, Zugang, Menge oder Flaeche. Bitte keine privaten Dokumente, Kennzeichen oder sensiblen Details senden.
            </p>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {proof.items.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
