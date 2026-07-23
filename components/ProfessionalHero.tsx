import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

type HeroLink = {
  href: string;
  label: string;
};

type ProfessionalHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: HeroLink;
  secondaryCta?: HeroLink;
  trustItems?: readonly string[];
  regionLabel?: string;
};

export function ProfessionalHero({
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
  trustItems = [],
  regionLabel,
}: ProfessionalHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-950 px-5 pb-14 pt-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            {intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        {trustItems.length > 0 ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item} className="flex min-h-20 items-start gap-3 rounded-lg border border-white/12 bg-white/[0.06] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                <p className="text-sm font-bold leading-6 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        ) : null}

        {regionLabel ? (
          <p className="mt-5 text-sm font-bold leading-6 text-slate-300">{regionLabel}</p>
        ) : null}
      </div>
    </section>
  );
}
