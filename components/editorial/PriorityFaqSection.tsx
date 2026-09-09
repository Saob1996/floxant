import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";

import { FaqAccordion } from "@/components/editorial/FaqAccordion";
import type { DisplayFaq } from "@/components/editorial/types";
import { getFaqsForRoute } from "@/lib/content/faq-registry";

type PriorityFaqSectionProps = {
  route: string;
  locale?: "de" | "en";
  title?: string;
  intro?: string;
  limit?: number;
  openFirst?: boolean;
  tone?: "light" | "dark";
  className?: string;
  allQuestionsHref?: string;
};

const localizedCopy = {
  de: {
    eyebrow: "Häufige Fragen",
    title: "Antworten für den nächsten Schritt",
    intro:
      "Die wichtigsten Fragen zu Umfang, Ablauf und Anfrageweg – kurz beantwortet und direkt auf dieser Seite lesbar.",
    linkLabel: "Alle Fragen ansehen",
    allQuestionsHref: "/fragen",
  },
  en: {
    eyebrow: "Frequently asked questions",
    title: "Answers for the next step",
    intro:
      "The most important questions about scope, process and enquiries, answered directly on this page.",
    linkLabel: "View all questions",
    allQuestionsHref: "/en/questions",
  },
} as const;

function inferLocale(route: string): "de" | "en" {
  const pathname = route.split(/[?#]/, 1)[0] || "/";
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

function idFragment(value: string): string {
  const fragment = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return fragment || "route";
}

export function PriorityFaqSection({
  route,
  locale: requestedLocale,
  title,
  intro,
  limit = 8,
  openFirst = true,
  tone = "light",
  className = "",
  allQuestionsHref,
}: PriorityFaqSectionProps) {
  const locale = requestedLocale ?? inferLocale(route);
  const copy = localizedCopy[locale];
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.floor(limit)) : 8;
  const routeId = idFragment(route.split(/[?#]/, 1)[0] || "/");
  const items: DisplayFaq[] = getFaqsForRoute(route)
    .slice(0, safeLimit)
    .map((faq) => ({
      id: faq.id,
      question: faq.question,
      shortAnswer: faq.shortAnswer,
      detailedAnswer: faq.detailedAnswer,
      category: faq.category,
      region: faq.region.join(", "),
      locale: faq.locale,
      relatedService: faq.relatedService,
      relatedArticle: faq.relatedArticle ?? undefined,
    }));

  if (items.length === 0) return null;

  const headingId = `priority-faq-heading-${locale}-${routeId}`;
  const questionsHref = allQuestionsHref ?? copy.allQuestionsHref;
  const isDark = tone === "dark";
  return (
    <>
      <section
        aria-labelledby={headingId}
        className={`px-6 py-16 sm:py-20 ${className}`.trim()}
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className={`text-xs font-black uppercase tracking-[0.18em] ${isDark ? "text-cyan-200" : "text-blue-800"}`}>
                {copy.eyebrow}
              </p>
              <h2
                id={headingId}
                className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}
              >
                {title ?? copy.title}
              </h2>
              <p className={`mt-4 text-base font-medium leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {intro ?? copy.intro}
              </p>
            </div>
            <Link
              href={questionsHref}
              prefetch={false}
              className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full px-5 text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 ${
                isDark
                  ? "border border-white/30 bg-white/10 text-white hover:border-white hover:bg-white hover:text-slate-950"
                  : "border border-slate-300 bg-white text-slate-950 hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              }`}
            >
              {copy.linkLabel}
            </Link>
          </div>

          <div className="mt-9">
            <FaqAccordion items={items} openFirst={openFirst} />
          </div>
        </div>
      </section>
    </>
  );
}
