import React from 'react';
import { generateCityContent } from '@/lib/content-engine';
import { generateSemanticLinks } from '@/lib/internal-linking';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { AuthorBox } from "@/components/AuthorBox";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parts = slug.split('-');
  const service = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Umzug';
  const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Region';
  return generatePageSEO({
    lang: "de",
    path: `wissen/${slug}`,
    title: `Die besten Tipps für Ihren ${service} in ${city} | FLOXANT Wissen`,
    description: `Alles was Sie über Kosten, Planung und Ablauf eines ${service}s in ${city} wissen müssen. Plus: Lokale Tipps.`,
  });
}
export default async function KnowledgeHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary("de");
 const parts = slug.split('-');
 const service = parts[0] || 'umzug';
 const city = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Ihrer Stadt';
 // 1. Emulate DB fetch -> If missing, Trigger OpenAI Generation via Content Engine
 const article = await generateCityContent(city, service);
 // 2. Fetch semantic internal links for context clustering (SEO Siloing)
 const semanticLinks = generateSemanticLinks(city, article.category);
 return (
  <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
   <div className="max-w-6xl mx-auto px-4 md:px-8">
    {/* Breadcrumb / Label */}
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-8">
     <BookOpen size={14} /> FLOXANT Wissen ({article.category})
    </div>
    <h1 className="text-4xl md:text-5xl font-light mb-12 leading-tight max-w-3xl">
     {article.title}
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
     {/* Main Content Render */}
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
     {/* Programmatic Internal Link Sidebar (SEO Silo) */}
     <aside>
      <div className="bg-[#0B0B12] border border-white/5 rounded-2xl p-6 sticky top-24">
       <h3 className="text-sm tracking-widest uppercase font-medium text-white/50 mb-6">Weiterführend</h3>
       <ul className="space-y-4">
        {semanticLinks.map((link, idx) => (
         <li key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
          <a 
           href={link.url} 
           className="group flex flex-col gap-1 text-white hover:text-blue-400 transition-colors"
          >
           <span className="text-sm font-medium leading-snug">{link.anchorText}</span>
           <span className="text-xs text-blue-500/50 flex items-center gap-1 mt-1">
            Zum Artikel <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
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
