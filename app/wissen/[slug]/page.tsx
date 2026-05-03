import { ArrowRight, BookOpen } from "lucide-react";

import { AuthorBox } from "@/components/AuthorBox";
import { generateCityContent } from "@/lib/content-engine";
import { generateSemanticLinks } from "@/lib/internal-linking";
import { generatePageSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parts = slug.split("-");
  const service = parts[0]
    ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    : "Umzug";
  const city = parts[1]
    ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
    : "Ihrer Region";

  return generatePageSEO({
    lang: "de",
    path: `/wissen/${slug}`,
    title: `Die besten Tipps für Ihren ${service} in ${city} | FLOXANT Wissen`,
    description: `Alles, was Sie über Kosten, Planung und Ablauf eines ${service}s in ${city} wissen müssen. Plus: lokale Tipps.`,
  });
}

export default async function KnowledgeHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parts = slug.split("-");
  const service = parts[0] || "umzug";
  const city = parts[1]
    ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
    : "Ihrer Stadt";

  const article = await generateCityContent(city, service);
  const semanticLinks = generateSemanticLinks(city, article.category);

  return (
    <main className="min-h-screen bg-[#05050A] pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
          <BookOpen size={14} /> FLOXANT Wissen ({article.category})
        </div>

        <h1 className="mb-12 max-w-3xl text-4xl font-light leading-tight md:text-5xl">
          {article.title}
        </h1>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-3">
            <div
              className="prose prose-invert prose-blue max-w-none text-white/70"
              dangerouslySetInnerHTML={{ __html: article.htmlBlob }}
            />

            <AuthorBox
              name="Alexander Florax"
              role="Senior Logistik-Experte & Gründer"
              description="Mit über 15 Jahren Erfahrung in der bayerischen Umzugsbranche ist Alexander Florax Ihr Ansprechpartner für komplexe Logistikprojekte. Er steht für die FLOXANT-Qualitätsversprechen und sorgt für reibungslose Abläufe von Regensburg bis München."
            />
          </div>

          <aside>
            <div className="sticky top-24 rounded-2xl border border-white/5 bg-[#0B0B12] p-6">
              <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-white/50">
                Weiterführend
              </h3>
              <ul className="space-y-4">
                {semanticLinks.map((link, idx) => (
                  <li
                    key={idx}
                    className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <a
                      href={link.url}
                      className="group flex flex-col gap-1 text-white transition-colors hover:text-blue-400"
                    >
                      <span className="text-sm font-medium leading-snug">
                        {link.anchorText}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-blue-500/50">
                        Zum Artikel
                        <ArrowRight
                          size={10}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
