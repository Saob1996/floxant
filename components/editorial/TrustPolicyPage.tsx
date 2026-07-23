import { Mail } from "lucide-react";

import { ArticleHero, LastReviewed } from "@/components/editorial";

export type TrustPolicySection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export function TrustPolicyPage({
  locale,
  eyebrow,
  title,
  intro,
  sections,
  reviewedAt,
}: {
  locale: "de" | "en";
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly TrustPolicySection[];
  reviewedAt: string;
}) {
  const copy = locale === "de"
    ? { owner: "FLOXANT Redaktion", contact: "Hinweis oder Korrektur senden", note: "Diese Seite beschreibt den redaktionellen Prozess. Sie ist keine Rechts-, Preis- oder Sicherheitsberatung." }
    : { owner: "FLOXANT editorial team", contact: "Send a correction or note", note: "This page explains the editorial process. It does not provide legal, pricing or safety advice." };

  return (
    <main className="bg-white text-slate-950">
      <ArticleHero eyebrow={eyebrow} title={title} description={intro} />
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <LastReviewed date={reviewedAt} owner={copy.owner} locale={locale} />
        <div className="mt-10 grid gap-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">{section.title}</h2>
              <div className="mt-4 grid gap-4 text-base font-medium leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.points?.length ? <ul className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-5">{section.points.map((point) => <li key={point} className="font-medium leading-7 text-slate-800">• {point}</li>)}</ul> : null}
            </section>
          ))}
        </div>
        <aside className="mt-12 rounded-3xl bg-slate-950 p-6 text-white">
          <p className="font-medium leading-7 text-slate-200">{copy.note}</p>
          <a href="mailto:info@floxant.de" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white"><Mail className="h-4 w-4" aria-hidden="true" />{copy.contact}</a>
        </aside>
      </div>
    </main>
  );
}
