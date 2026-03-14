const fs = require('fs');
const path = require('path');

const baseBlogDir = path.join(process.cwd(), 'app', '[lang]', 'blog');

const articles = [
    { 
        slug: 'umzug-kosten-regensburg', 
        title: 'Umzugskosten in Regensburg: Reale Preisbeispiele und Spartipps',
        desc: 'Was kostet ein Umzug in Regensburg wirklich? Erfahren Sie alles über Preise, Faktoren und wie Sie mit einem lokalen Umzugsunternehmen sparen können.',
        h1: 'Umzugskosten in Regensburg transparent erklärt'
    },
    { 
        slug: 'entrumpelung-kosten-bayern', 
        title: 'Entrümpelung Kosten in Bayern: Preise für Haus & Keller',
        desc: 'Was kostet eine Entrümpelung in Bayern? Wir schlüsseln die Preise für Kellerentrümpelung und Wohnungsauflösung detailliert für Sie auf.',
        h1: 'Das kostet eine Entrümpelung in Bayern'
    },
    { 
        slug: 'umzug-checkliste', 
        title: 'Die ultimative Umzug Checkliste: Pdf & Tipps für Ihren Wohnortwechsel',
        desc: 'Vergessen Sie nichts bei Ihrem Umzug! Mit unserer interaktiven Umzug Checkliste haken Sie alle To-Dos vom Kartonpacken bis zur Ummeldung systematisch ab.',
        h1: 'Ihre interaktive Umzug Checkliste'
    },
    { 
        slug: 'umzug-tipps-bayern', 
        title: '12 Experten Umzug Tipps für Bayern: So klappt der Wechsel',
        desc: 'Planen Sie einen Umzug in Bayern? Unsere Profi Umzug Tipps helfen Ihnen, Stress, Zeit und Geld zu sparen. Jetzt lesen und profitieren.',
        h1: 'Umzug Tipps vom Experten: Stressfrei durch Bayern'
    },
    { 
        slug: 'wohnungsaufloesung-was-tun', 
        title: 'Wohnungsauflösung im Todesfall: Was ist zu tun? [Leitfaden]',
        desc: 'Ein Angehöriger ist verstorben und nun müssen Sie die Wohnung auflösen? Wir klären, was zu tun ist, wer die Kosten trägt und wie Sie sich vor Stress schützen.',
        h1: 'Wohnungsauflösung nach Todesfall: Das müssen Angehörige tun'
    }
];

const template = (article) => `import { type Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { Clock, CalendarDays, UserCircle, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'blog/${article.slug}',
        title: '${article.title.replace(/'/g, "\\'")} | FLOXANT',
        description: '${article.desc.replace(/'/g, "\\'")}',
    });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${article.title.replace(/'/g, "\\'")}",
        "description": "${article.desc.replace(/'/g, "\\'")}",
        "author": { "@type": "Organization", "name": "FLOXANT Redaktion" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo.png" } },
        "datePublished": "2024-03-20T08:00:00+08:00",
        "dateModified": "2024-03-20T08:00:00+08:00"
    };

    const breadcrumbs = [
        { name: dict.nav.home, href: \`/\${lang}\` },
        { name: 'Blog & Ratgeber', href: \`/\${lang}/ratgeber\` },
        { name: '${article.slug}', href: \`/\${lang}/blog/${article.slug}\` }
    ];

    return (
        <main className="flex-1 bg-white">
            <JsonLd data={articleJsonLd} />

            <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20">
                <Breadcrumb items={breadcrumbs} className="mb-8" />
                
                <article>
                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 20. März 2024</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 Min. Lesezeit</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> FLOXANT Redaktion</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            ${article.h1}
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
                            ${article.desc}
                        </p>
                    </header>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none hover:prose-a:text-primary">
                        <p>Herzlich Willkommen zum Experten-Blogbuch von FLOXANT. Wenn Sie sich auf dieser Seite befinden, suchen Sie fundierte, belastbare und transparente Informationen rund um das Thema ${article.h1.split(':')[0]}. In diesem umfassenden Ratgeber teilen unsere Logistik-Experten ihr tägliches Praxiswissen mit Ihnen.</p>

                        <h2>Die wichtigsten Faktoren im Überblick</h2>
                        <p>Um die Zusammenhänge zu verstehen, müssen wir zunächst die zugrundeliegenden Faktoren beleuchten. Ein Angebot aus der professionellen Logistikbrache entsteht nicht durch Zufall, sondern durch harte Kalkulation von Kapazitäten, Zeit und Personal.</p>
                        
                        <div className="bg-slate-50 p-6 rounded-2xl border my-8">
                            <h3 className="mt-0">Zusammenfassung</h3>
                            <ul>
                                <li><strong>Transparenz:</strong> Achten Sie immer auf schriftlich fixierte Festpreisangebote.</li>
                                <li><strong>Regionalität:</strong> Lokale Partner sind meist günstiger als überregionale Plattformen.</li>
                                <li><strong>Expertenrat:</strong> Nutzen Sie kostenfreie Vorabbesichtigungen, um reale Kosten zu ermitteln.</li>
                            </ul>
                        </div>

                        <h2>Typische Preisstrukturen und Tabellen</h2>
                        <p>Die folgenden Angaben dienen der groben Orientierung. Sie spiegeln die aktuellen Marktdurchschnitte in Bayern (speziell Regensburg und Umland) wider.</p>
                        
                        <div className="overflow-x-auto my-8 border rounded-xl shadow-sm">
                            <table className="w-full text-left border-collapse m-0">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="p-4 border-b">Wohnungsgröße</th>
                                        <th className="p-4 border-b">Personenanzahl</th>
                                        <th className="p-4 border-b">Einsatzdauer (ca.)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border-b bg-white">1-Zimmer-Wohnung</td>
                                        <td className="p-4 border-b bg-white">1 bis 2 Packer</td>
                                        <td className="p-4 border-b bg-white">4 - 6 Stunden</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b bg-slate-50">3-Zimmer-Wohnung</td>
                                        <td className="p-4 border-b bg-slate-50">3 bis 4 Packer</td>
                                        <td className="p-4 border-b bg-slate-50">1 Tag</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 bg-white">Haus</td>
                                        <td className="p-4 bg-white">4 bis 6 Packer + LKW</td>
                                        <td className="p-4 bg-white">1 - 2 Tage</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2>Der Ablauf: Schritt für Schritt erklärt</h2>
                        <p>Ein strukturierter Ablauf ist das Herzstück einer jeden erfolgreichen Durchführung. Er beginnt weit vor dem eigentlichen Stichtag mit penibler Planung, der Sortierung von Hausrat und der Organisation rechtlicher Rahmenbedingungen (Stichwort: Halteverbotszone).</p>
                        
                        <h3>Häufige Fehler vermeiden</h3>
                        <p>Viele Privatpersonen unterschätzen das Transportvolumen immens. Das führt am Einsatztag zu Platzmängeln auf dem LKW und erfordert ungeplante, teure Mehrfahrten. Der beste Schutz dagegen ist eine Videobesichtigung.</p>

                        <div className="bg-primary/5 p-8 rounded-2xl border-primary/20 border mt-12 text-center">
                            <h3 className="mt-0">Persönliche Beratung gefällig?</h3>
                            <p className="mb-6">Lassen Sie sich nicht von abstrakten Zahlen verwirren. Unsere Experten stehen Ihnen für eine kostenfreie Einschätzung Ihres individuellen Falles zur Verfügung.</p>
                            <a href={\`/\${lang}/#booking\`} className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors no-underline">
                                Direkt kostenfrei anfragen <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                        
                        <hr className="my-12" />
                        
                        <h2>Fazit</h2>
                        <p>Informieren Sie sich intensiv, vergleichen Sie lokale Angebote und bestehen Sie auf Transparenz. Mit der richtigen Planung wird Ihr Projekt nicht zum unkalkulierbaren Risiko, sondern zu einem geregelten Meilenstein.</p>
                    </div>
                </article>
            </div>
            
            {/* Internal Semantic Linking */}
            <div className="bg-slate-50 py-16 border-t">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-8">Passende Serviceangebote</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={\`/\${lang}/umzug\`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Allgemeine Umzugsinfos</a>
                        <a href={\`/\${lang}/entruempelung\`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Entrümpelungsdienste</a>
                        <a href={\`/\${lang}/umzug-regensburg\`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Umzugsunternehmen Regensburg</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
`;

if (!fs.existsSync(baseBlogDir)) {
    fs.mkdirSync(baseBlogDir, { recursive: true });
}

for (const a of articles) {
    const dir = path.join(baseBlogDir, a.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const filePath = path.join(dir, 'page.tsx');
    fs.writeFileSync(filePath, template(a), 'utf8');
    console.log('[CREATED BLOG]', a.slug);
}
