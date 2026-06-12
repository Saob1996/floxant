import Image from "next/image";

import type { ServiceVisual } from "@/lib/service-visuals";

type ServiceVisualBlockProps = {
  visual: ServiceVisual;
  className?: string;
  priority?: boolean;
};

export function ServiceVisualBlock({ visual, className = "", priority = false }: ServiceVisualBlockProps) {
  return (
    <article
      className={`overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)] ${className}`}
    >
      <div className="relative aspect-[16/10] bg-slate-100">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 38rem, (min-width: 768px) 48vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[11px] font-black uppercase tracking-normal text-blue-700">
          Einordnung
        </p>
        <h2 className="mt-2 text-xl font-black tracking-normal text-slate-950">
          {visual.title}
        </h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
          {visual.caption}
        </p>
      </div>
    </article>
  );
}
