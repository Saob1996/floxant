import { Camera, ShieldCheck } from "lucide-react";

import { getPhotoGuidance } from "@/lib/photo-guidance";

type PhotoGuidanceBlockProps = {
  serviceKey?: string;
  title?: string;
  className?: string;
  compact?: boolean;
};

export function PhotoGuidanceBlock({
  serviceKey = "reinigung",
  title,
  className = "",
  compact = false,
}: PhotoGuidanceBlockProps) {
  const guidance = getPhotoGuidance(serviceKey);

  return (
    <section
      className={`bg-white px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`}
      aria-labelledby={`photo-guidance-${guidance.serviceKey}`}
      data-component="PhotoGuidanceBlock"
      data-request-checklist-key={guidance.serviceKey}
    >
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.76fr_1.24fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Camera className="h-4 w-4" aria-hidden="true" />
            Foto-Hinweise
          </p>
          <h2
            id={`photo-guidance-${guidance.serviceKey}`}
            className={compact ? "mt-3 text-2xl font-black tracking-normal" : "mt-3 text-3xl font-black tracking-normal sm:text-5xl"}
          >
            {title || guidance.title}
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 sm:text-base sm:leading-8">
            {guidance.intro}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="flex items-center gap-2 text-lg font-black">
              <Camera className="h-5 w-5 text-blue-700" aria-hidden="true" />
              Hilfreiche Fotos
            </h3>
            <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
              {guidance.helpfulShots.map((item) => (
                <li key={item} className="flex gap-2">
                  <Camera className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <h3 className="flex items-center gap-2 text-lg font-black text-amber-950">
              <ShieldCheck className="h-5 w-5 text-amber-700" aria-hidden="true" />
              Datenschutz beim Foto
            </h3>
            <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-amber-950/85">
              {guidance.privacyNotes.map((item) => (
                <li key={item} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
