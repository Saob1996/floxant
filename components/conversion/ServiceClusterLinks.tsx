import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";

import type { SignatureSpecialLink } from "@/lib/signature-special-services";

type ServiceClusterLinksProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  links: readonly SignatureSpecialLink[];
  className?: string;
};

export function ServiceClusterLinks({
  eyebrow = "Service-Cluster",
  title,
  intro,
  links,
  className = "",
}: ServiceClusterLinksProps) {
  return (
    <section className={`border-y border-slate-200 bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr]">
        <article>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Network className="h-4 w-4" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
            >
              <h3 className="text-base font-black text-slate-950">{link.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{link.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                {link.cta || "Seite oeffnen"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
