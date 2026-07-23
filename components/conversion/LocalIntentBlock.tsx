import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type LocalIntentLink = {
  href: string;
  label: string;
};

type LocalIntentBlockProps = {
  regionLabel: string;
  title: string;
  intro: string;
  signals: readonly string[];
  links?: readonly LocalIntentLink[];
  className?: string;
};

export function LocalIntentBlock({
  regionLabel,
  title,
  intro,
  signals,
  links = [],
  className = "",
}: LocalIntentBlockProps) {
  return (
    <section className={`border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <article>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {regionLabel}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{intro}</p>

          {links.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          ) : null}
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          {signals.map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
