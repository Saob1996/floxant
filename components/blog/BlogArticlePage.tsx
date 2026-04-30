import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { germanizeDeep, germanizeText } from "@/lib/german-text";

type FaqItem = {
  q: string;
  a: string;
};

type ContentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type CtaLink = {
  href: string;
  label: string;
};

interface BlogArticlePageProps {
  breadcrumbs: Array<{ label: string; href?: string }>;
  date: string;
  readTime: string;
  title: string;
  intro: string;
  highlightTitle?: string;
  highlightPoints?: string[];
  sections: ContentSection[];
  ctas: CtaLink[];
  faqTitle: string;
  faqItems: FaqItem[];
}

export function BlogArticlePage({
  breadcrumbs,
  date,
  readTime,
  title,
  intro,
  highlightTitle,
  highlightPoints = [],
  sections,
  ctas,
  faqTitle,
  faqItems,
}: BlogArticlePageProps) {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;
  const normalizedBreadcrumbs = germanizeDeep(breadcrumbs);
  const normalizedSections = germanizeDeep(sections);
  const normalizedCtas = germanizeDeep(ctas);
  const normalizedFaqItems = germanizeDeep(faqItems);
  const normalizedHighlightPoints = germanizeDeep(highlightPoints);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] text-slate-900">
      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-10">
        <div className="mb-8">
          <Breadcrumbs items={normalizedBreadcrumbs} />
        </div>

        <article className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
          <header className="relative border-b border-slate-200 p-8 md:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
            <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                <CalendarDays className="h-4 w-4" /> {germanizeText(date)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                <Clock className="h-4 w-4" /> {germanizeText(readTime)} Lesezeit
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-blue-700">
                Klar erklärt
              </span>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              {germanizeText(title)}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
              {germanizeText(intro)}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
              Wir halten es bewusst verständlich, direkt und ohne unnötiges Fachgerede. Wenn Sie
              mögen, gern ganz unkompliziert: lesen, einordnen und danach einfach anfragen.
            </p>
          </header>

          <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
            <div className="p-8 md:p-12">
              <div className="prose max-w-none prose-headings:tracking-tight prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600">
                {normalizedSections.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-slate-950">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets?.length ? (
                      <div className="not-prose grid gap-4 md:grid-cols-2">
                        {section.bullets.map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-600" />
                              <p className="m-0 text-sm leading-relaxed text-slate-600">{item}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {normalizedHighlightPoints.length ? (
                <section className="mt-12 rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    {germanizeText(highlightTitle || "Kurz gesagt")}
                  </h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {normalizedHighlightPoints.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white bg-white p-5 shadow-sm shadow-slate-950/5"
                      >
                        <CheckCircle2 className="mb-3 h-5 w-5 text-blue-600" />
                        <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-14 border-t border-slate-200 pt-10">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  {germanizeText(faqTitle)}
                </h2>
                <div className="mt-6 space-y-4">
                  {normalizedFaqItems.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                    >
                      <h3 className="text-lg font-semibold text-slate-950">{item.q}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="border-t border-slate-200 bg-slate-50/70 p-8 lg:border-l lg:border-t-0">
              <div className="sticky top-28">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Nächster Schritt
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Wenn das Thema gerade passt, geht es von hier direkt weiter zum Rechner, zur
                  passenden Spezialseite oder zu einer kurzen Anfrage.
                </p>
                <div className="mt-6 space-y-3">
                  {normalizedCtas.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-950/5 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#25D366]/25 bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-950/5 transition-all hover:border-[#25D366] hover:bg-[#25D366]/5"
                >
                  Kurz per WhatsApp fragen
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                </a>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <div className="text-sm font-semibold text-slate-950">FLOXANT Prinzip</div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Erst klären, dann planen: Service, Umfang, Zugang, Region und Preisrahmen
                    werden getrennt sichtbar gemacht.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Kurz gesagt: lieber ehrlich und sauber vorprüfen als schnell irgendetwas
                    versprechen. So läuft es am Ende für beide Seiten entspannter.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
