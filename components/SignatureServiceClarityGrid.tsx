import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SignatureServiceItem = {
  title: string;
  text: string;
  href: string;
  cta: string;
};

type SignatureServiceClarityGridProps = {
  title: string;
  intro: string;
  services: readonly SignatureServiceItem[];
};

export function SignatureServiceClarityGrid({ title, intro, services }: SignatureServiceClarityGridProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Signature Services</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">{intro}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-black tracking-normal text-slate-950">{service.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{service.text}</p>
              <Link href={service.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-950">
                {service.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
