const fs = require('fs');
const path = require('path');

// Extract the title from the command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('❌ Fehler: Bitte geben Sie einen Blog-Titel an.');
    console.error('💡 Beispiel: npm run make:blog "Mein neuer Beitrag"');
    process.exit(1);
}

const title = args[0];

// Generate an SEO-friendly slug
const slug = title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const currentDate = new Date().toISOString();
const displayDate = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });

// Define the target path
const targetDir = path.join(__dirname, '..', 'app', '[lang]', 'blog', slug);
const targetFile = path.join(targetDir, 'page.tsx');

// Check if it already exists
if (fs.existsSync(targetDir)) {
    console.error(`❌ Fehler: Der Ordner für den Slug "${slug}" existiert bereits.`);
    process.exit(1);
}

// Create the directory
fs.mkdirSync(targetDir, { recursive: true });

// Read a template (or define it here directly to avoid dependencies)
const generateTemplate = (title, slug, isoDate, displayDate) => `import { type Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'blog/${slug}',
        title: '${title} | FLOXANT',
        description: 'Hier kommt die Meta-Description für Google hin (max 160 Zeichen).',
    });
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${title}",
        "description": "Die Meta-Description als kurzer Teaser.",
        "author": { "@type": "Organization", "name": "FLOXANT Experten" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo.png" } },
        "datePublished": "${isoDate}",
        "dateModified": "${isoDate}"
    };

    const breadcrumbs = [
        { label: "Home", href: \`/\${lang}\` },
        { label: "Blog", href: \`/\${lang}/blog\` },
        { label: "${title}" }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Header lang={lang} dic={(dict as any).nav} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20">
                <div className="mb-8"><Breadcrumbs lang={lang} items={breadcrumbs}  /></div>
                
                <article>
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> ${displayDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 Min. Lesezeit</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> FLOXANT Redaktion</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            ${title}
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
                            Ein starker Einleitungssatz (Teaser), der sofort den Kern des Artikels trifft und zum Weiterlesen anregt.
                        </p>
                    </header>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none hover:prose-a:text-primary">
                        <p>
                            Hier beginnt Ihr Haupttext. Sie können ganz normales HTML verwenden (p, h2, h3, ul, li).
                        </p>

                        <h2>Die wichtigste Zwischenüberschrift</h2>
                        <p>
                            Weiterer Text. Um SEO-Rankings zu verbessern, verlinken Sie zu Service-Seiten wie z.B.: <a href={\`/\${lang}/umzug\`}>Umzug planen</a>.
                        </p>

                        <div className="bg-primary/5 p-8 rounded-2xl border-primary/20 border mt-12 text-center">
                            <h3 className="mt-0">Lassen Sie uns helfen</h3>
                            <p className="mb-6">Nutzen Sie unser smartes Buchungstool für ein sofortiges Angebot.</p>
                            <a href={\`/\${lang}/#calculator\`} className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors no-underline">
                                Zum Preisrechner <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                        
                    </div>
                </article>
            </div>
            
            <div className="bg-slate-50 py-16 border-t">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-8">Mehr zum Thema</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={\`/\${lang}/umzug\`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Allgemeine Umzugsinformationen</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
`;

// Write the file
fs.writeFileSync(targetFile, generateTemplate(title, slug, currentDate, displayDate));

console.log('✅ Erfolgreich!');
console.log(`📁 Ordner: app/[lang]/blog/${slug}`);
console.log('📄 Datei: page.tsx wurde mit modernem B2B-Layout und JSON-LD erstellt.');
console.log('📝 Was nun? Öffnen Sie die generierte page.tsx und ersetzen Sie den Platzhaltertext.');
