import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MessageCircle,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantStorytellingSection } from "@/components/FloxantStorytellingSection";
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

type SectionAnchor = ContentSection & {
  id: string;
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

function toAnchorId(value: string) {
  return germanizeText(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function resolveStoryVariant(title: string, intro: string) {
  const signal = germanizeText(`${title} ${intro}`).toLowerCase();

  if (signal.includes("düsseldorf")) return "duesseldorf" as const;
  if (
    signal.includes("angebot") ||
    signal.includes("preis") ||
    signal.includes("vergleich") ||
    signal.includes("plattform") ||
    signal.includes("red flag")
  ) {
    return "offer" as const;
  }
  if (signal.includes("reinigung") || signal.includes("übergabe") || signal.includes("büro")) {
    return "cleaning" as const;
  }
  if (
    signal.includes("entrümp") ||
    signal.includes("entsorgung") ||
    signal.includes("wohnungsauflösung") ||
    signal.includes("nachlass") ||
    signal.includes("keller")
  ) {
    return "clearance" as const;
  }

  return "operations" as const;
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
  const sectionAnchors: SectionAnchor[] = normalizedSections.map((section, index) => ({
    ...section,
    id: `${toAnchorId(section.title) || "abschnitt"}-${index + 1}`,
  }));
  const storyVariant = resolveStoryVariant(title, intro);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] text-slate-900">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-24 pt-10">
        <div className="mb-8">
          <Breadcrumbs items={normalizedBreadcrumbs} />
        </div>

        <article
          className="flox-blog-article-shell mx-auto w-full overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)]"
        >
          <header className="relative min-w-0 border-b border-slate-200 p-6 sm:p-8 md:p-12">
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

            <h1
              className="flox-blog-article-title w-full min-w-0 break-words text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-6xl"
            >
              {germanizeText(title)}
            </h1>
            <p
              className="flox-blog-article-intro mt-6 break-words text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {germanizeText(intro)}
            </p>
            <p
              className="flox-blog-article-note mt-4 break-words text-sm leading-relaxed text-slate-500"
            >
              Hier geht es um die praktische Frage: Was ist wirklich gemeint, welche Angaben
              braucht FLOXANT und welcher nächste Schritt passt, ohne vorschnelle Versprechen.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Wann passt es?
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Sie erkennen schnell, ob Ihr Fall zu Reinigung, Übergabe, Angebot prüfen oder
                  einer Spezialseite gehört.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Was senden?
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Fotos, Ort, Fläche, Zugang, Termin und Ziel reichen oft für eine erste saubere
                  Einordnung.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Klarer Weg
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Am Ende führen die Links direkt zur passenden FLOXANT-Seite oder zur
                  Angebotsprüfung.
                </p>
              </div>
            </div>
          </header>

          <FloxantStorytellingSection
            variant={storyVariant}
            eyebrow="FLOXANT ordnet den Fall ein"
            title="Aus einer unklaren Situation wird eine prüfbare Anfrage."
            intro="Der Beitrag zeigt, welche Angaben wirklich helfen und welcher FLOXANT-Weg danach sinnvoll ist: passende Spezialseite öffnen, vorhandenes Angebot prüfen lassen oder den Fall direkt schildern."
            primaryHref={normalizedCtas[0]?.href || "/buchung"}
            primaryLabel={normalizedCtas[0]?.label || "Direkt anfragen"}
            secondaryHref="/angebot-guenstiger-pruefen"
            secondaryLabel="Angebot prüfen"
            className="border-b border-slate-200 py-10"
          />

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="p-6 sm:p-8 md:p-12">
              {sectionAnchors.length ? (
                <nav
                  aria-label="Inhaltsverzeichnis"
                  className="mb-10 rounded-[1.75rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.95),rgba(255,255,255,1))] p-6"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Im Beitrag
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {sectionAnchors.map((section, index) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="group rounded-2xl border border-white bg-white px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold text-blue-700">
                            Abschnitt {index + 1}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                        </div>
                        <div className="mt-2 text-sm font-semibold leading-relaxed text-slate-900">
                          {section.title}
                        </div>
                      </a>
                    ))}
                  </div>
                </nav>
              ) : null}

              <div className="prose max-w-none prose-headings:tracking-tight prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600">
                {sectionAnchors.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-32">
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
                  </section>
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
                  {normalizedFaqItems.map((item, index) => (
                    <details
                      key={item.q}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                      open={index === 0}
                    >
                      <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                        {item.q}
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            <aside className="border-t border-slate-200 bg-slate-50/70 p-8 lg:border-l lg:border-t-0">
              <div className="sticky top-28">
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
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
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
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

                {sectionAnchors.length ? (
                  <div className="mt-4 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                      Schnell zu
                    </div>
                    <div className="mt-4 space-y-2">
                      {sectionAnchors.map((section, index) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="flex items-start gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-slate-950"
                        >
                          <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{section.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <div className="text-sm font-semibold text-slate-950">So arbeitet FLOXANT</div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Erst den Fall verstehen, dann den passenden Weg nennen: Service, Umfang,
                    Zugang, Region und Preisrahmen werden klar getrennt.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Kurz gesagt: lieber ehrlich prüfen als vorschnell etwas versprechen. So bleibt
                    die Anfrage für Kunden und FLOXANT belastbarer.
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
