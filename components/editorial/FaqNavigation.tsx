import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { AuthorityLink } from "@/components/editorial/types";

export function RelatedQuestion({ link }: { link: AuthorityLink }) {
  return (
    <Link
      href={link.href}
      prefetch={false}
      className="group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-900 outline-none hover:border-cyan-600 hover:bg-cyan-50 focus-visible:ring-2 focus-visible:ring-cyan-600"
    >
      <span>
        <span className="block">{link.label}</span>
        {link.description ? <span className="mt-1 block text-sm font-medium text-slate-600">{link.description}</span> : null}
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-blue-800 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
    </Link>
  );
}

export function QuestionCategory({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: readonly AuthorityLink[];
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{description}</p>
      <div className="mt-5 grid gap-3">
        {links.map((link) => <RelatedQuestion key={`${link.href}-${link.label}`} link={link} />)}
      </div>
    </section>
  );
}
