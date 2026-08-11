import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Info, Minus, Quote } from "lucide-react";

import type { AuthorityLink } from "@/components/editorial/types";

export function QuickAnswer({
  eyebrow = "Kurzantwort",
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-3xl border border-cyan-300 bg-cyan-50 p-5 text-slate-950 shadow-sm sm:p-7 print:border-slate-500 print:bg-white">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-cyan-900">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black leading-tight">{title}</h2>
      <div className="mt-3 text-base font-medium leading-7 text-slate-800">{children}</div>
    </aside>
  );
}

export function KeyFacts({ items }: { items: readonly { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="rounded-2xl border border-slate-200 bg-white p-4">
          <dt className="text-xs font-black uppercase tracking-[0.1em] text-slate-600">{item.label}</dt>
          <dd className="mt-2 text-base font-bold leading-6 text-slate-950">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ScopeSummary({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-3 max-w-3xl text-base font-medium leading-7 text-slate-200">{children}</div>
    </section>
  );
}

export function IncludedExcluded({
  included,
  excluded,
  labels = { included: "Kann enthalten sein", excluded: "Nicht automatisch enthalten" },
}: {
  included: readonly string[];
  excluded: readonly string[];
  labels?: { included: string; excluded: string };
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="text-lg font-black text-emerald-950">{labels.included}</h3>
        <ul className="mt-4 grid gap-3">
          {included.map((item) => <li key={item} className="flex gap-3 font-medium leading-6 text-emerald-950"><Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />{item}</li>)}
        </ul>
      </section>
      <section className="rounded-3xl border border-slate-300 bg-slate-50 p-5">
        <h3 className="text-lg font-black text-slate-950">{labels.excluded}</h3>
        <ul className="mt-4 grid gap-3">
          {excluded.map((item) => <li key={item} className="flex gap-3 font-medium leading-6 text-slate-800"><Minus className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />{item}</li>)}
        </ul>
      </section>
    </div>
  );
}

export function DecisionGuide({ title, items }: { title: string; items: readonly { when: string; then: string }[] }) {
  return (
    <section>
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={`${item.when}-${item.then}`} className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[0.8fr_1.2fr]">
            <p className="font-black text-slate-950">{item.when}</p>
            <p className="font-medium leading-6 text-slate-700">{item.then}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CostDrivers({ items, title = "Was den Aufwand beeinflusst" }: { items: readonly string[]; title?: string }) {
  return <Checklist title={title} items={items} icon="info" />;
}

export function RequiredDetails({ items, title = "Diese Angaben helfen" }: { items: readonly string[]; title?: string }) {
  return <Checklist title={title} items={items} />;
}

export function NextStep({ title, text, href, label }: { title: string; text: string; href: string; label: string }) {
  return (
    <aside className="rounded-3xl bg-cyan-300 p-6 text-slate-950 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
      <div><h2 className="text-2xl font-black">{title}</h2><p className="mt-2 max-w-2xl font-medium leading-7">{text}</p></div>
      <Link href={href} className="mt-5 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white outline-none hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-white sm:mt-0">
        {label}<ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}

export function ArticleHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="bg-slate-950 px-5 pb-14 pt-32 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl"><p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-200">{eyebrow}</p><h1 className="mt-5 text-4xl font-black leading-[1.05] sm:text-6xl">{title}</h1><p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">{description}</p></div>
    </header>
  );
}

export function AuthorAndReview({ author, reviewer, reviewedAt }: { author: string; reviewer: string; reviewedAt: string }) {
  return <p className="text-sm font-bold leading-6 text-slate-600">Verantwortlich: {author} · Review: {reviewer} · Stand: <time dateTime={reviewedAt}>{reviewedAt}</time></p>;
}

export function TableOfContents({ links }: { links: readonly AuthorityLink[] }) {
  return <nav aria-label="Inhaltsverzeichnis" className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="font-black text-slate-950">Auf dieser Seite</p><ul className="mt-3 grid gap-2">{links.map((link) => <li key={link.href}><a className="font-bold text-blue-800 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600" href={link.href}>{link.label}</a></li>)}</ul></nav>;
}

export function KeyTakeaways({ items }: { items: readonly string[] }) {
  return <Checklist title="Das Wichtigste" items={items} />;
}

export function Checklist({ title, items, icon = "check" }: { title: string; items: readonly string[]; icon?: "check" | "info" }) {
  const Icon = icon === "info" ? Info : Check;
  return <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:break-inside-avoid"><h2 className="text-xl font-black text-slate-950">{title}</h2><ul className="mt-4 grid gap-3">{items.map((item) => <li key={item} className="flex gap-3 font-medium leading-6 text-slate-700"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-800" aria-hidden="true" />{item}</li>)}</ul></section>;
}

export function ComparisonTable({ caption, headers, rows }: { caption: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[640px] w-full border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-slate-950 text-white"><tr>{headers.map((item) => <th key={item} scope="col" className="px-4 py-3 font-black">{item}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => (
          <tr key={`${rowIndex}-${row.join("-")}`} className="border-t border-slate-200 even:bg-slate-50">
            {row.map((cell, index) => index === 0
              ? <th key={`${index}-${cell}`} scope="row" className="px-4 py-3 align-top font-black leading-6 text-slate-950">{cell}</th>
              : <td key={`${index}-${cell}`} className="px-4 py-3 align-top font-medium leading-6 text-slate-700">{cell}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export function ExampleBlock({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="rounded-3xl border border-blue-200 bg-blue-50 p-5"><p className="flex items-center gap-2 font-black text-blue-950"><Quote className="h-5 w-5" aria-hidden="true" />{title}</p><div className="mt-3 font-medium leading-7 text-blue-950">{children}</div></aside>;
}

export function WarningBlock({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="rounded-3xl border border-amber-300 bg-amber-50 p-5"><p className="flex items-center gap-2 font-black text-amber-950"><CircleAlert className="h-5 w-5" aria-hidden="true" />{title}</p><div className="mt-3 font-medium leading-7 text-amber-950">{children}</div></aside>;
}

export function RelatedServices({ links }: { links: readonly AuthorityLink[] }) {
  return <LinkGrid title="Passende Leistungen" links={links} />;
}

export function RelatedQuestions({ links }: { links: readonly AuthorityLink[] }) {
  return <LinkGrid title="Weiterführende Fragen" links={links} />;
}

function LinkGrid({ title, links }: { title: string; links: readonly AuthorityLink[] }) {
  return <section><h2 className="text-2xl font-black text-slate-950">{title}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{links.map((link) => <Link key={`${link.href}-${link.label}`} href={link.href} prefetch={false} className="group rounded-2xl border border-slate-200 bg-white p-4 outline-none hover:border-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600"><span className="font-black text-slate-950">{link.label}</span>{link.description ? <span className="mt-1 block text-sm font-medium leading-6 text-slate-600">{link.description}</span> : null}<ArrowRight className="mt-3 h-4 w-4 text-blue-800 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></Link>)}</div></section>;
}

export function SourceList({ sources }: { sources: readonly { label: string; href?: string }[] }) {
  return <section className="border-t border-slate-200 pt-6"><h2 className="text-lg font-black text-slate-950">Quellen und Grundlagen</h2><ul className="mt-3 grid gap-2 text-sm font-medium text-slate-700">{sources.map((source) => <li key={`${source.label}-${source.href || "internal"}`}>{source.href ? <a className="text-blue-800 underline underline-offset-4" href={source.href} rel="noreferrer">{source.label}</a> : source.label}</li>)}</ul></section>;
}

export function LastReviewed({ date, locale = "de" }: { date: string; locale?: "de" | "en" }) {
  return locale === "en"
    ? <p className="text-sm font-bold text-slate-600">Last reviewed: <time dateTime={date}>{date}</time> · FLOXANT editorial team</p>
    : <p className="text-sm font-bold text-slate-600">Zuletzt inhaltlich geprüft: <time dateTime={date}>{date}</time> · FLOXANT Redaktion</p>;
}

export function ArticleCTA(props: { title: string; text: string; href: string; label: string }) {
  return <NextStep {...props} />;
}
