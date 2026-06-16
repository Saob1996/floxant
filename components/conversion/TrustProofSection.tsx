import { CheckCircle2, ShieldCheck } from "lucide-react";

type TrustProofSectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  proofs: readonly string[];
  boundaries?: readonly string[];
  className?: string;
};

export function TrustProofSection({
  eyebrow = "Vertrauen",
  title,
  intro,
  proofs,
  boundaries = [],
  className = "",
}: TrustProofSectionProps) {
  return (
    <section className={`bg-slate-50 px-5 py-14 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <ShieldCheck className="h-6 w-6 text-blue-700" aria-hidden="true" />
          <p className="mt-4 text-sm font-black uppercase tracking-normal text-blue-700">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">{title}</h2>
          {intro ? <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{intro}</p> : null}
        </article>

        <div className="grid gap-3">
          {proofs.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
              {item}
            </div>
          ))}

          {boundaries.length ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-black uppercase tracking-normal text-amber-800">
                Wird nicht versprochen
              </p>
              <div className="mt-3 grid gap-2">
                {boundaries.map((item) => (
                  <p key={item} className="text-sm font-semibold leading-6 text-amber-950">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
