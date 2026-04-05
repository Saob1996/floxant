import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    
    const dict = (await getDictionary(pageLocale as Locale)) as any;
return generatePageSEO({
        pageLocale,
        path: 'ratgeber',
        title: dict.ratgeber?.meta_title || "FLOXANT",
        description: dict.ratgeber?.meta_desc || "FLOXANT",
    });
}

const articleSlugs = [
    'umzug-kosten-regensburg',
    'checkliste-umzug',
    'gute-umzugsfirma-finden',
    'entruempelung-kosten-pro-m3',
    'umzug-vorbereiten-7-schritte',
    'wann-lohnt-sich-umzugsfirma',
    'moebeltransport-sicher',
    'umzug-tipps-familien',
    'reinigung-nach-umzug',
    'umzug-kosten-rechner',
    'umzug-anmelden-ummelden',
    'umzug-versicherung',
    'wohnungsaufloesung-tipps',
    'umzug-im-winter',
    'umzug-erste-wohnung',
];

export default async function Ratgeber({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Ratgeber" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <BookOpen className="w-4 h-4" /><span>{dict.ratgeber?.title || "FLOXANT Ratgeber"}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        {dict.ratgeber?.h1_pre || "Umzug "} <span className="text-primary">{dict.common?.guide || "Ratgeber"}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {dict.ratgeber?.subtitle || "Tipps, Checklisten und Kostenübersichten."}
                    </p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articleSlugs.map((slug) => {
                        const dictKey = slug.replace(/-/g, '_');
                        const articleData = (dict.ratgeber?.articles as Record<string, any>)?.[dictKey] || {};
                        return (
                        <Link key={slug} href={`/${pageLocale}/ratgeber/${slug}`} className="group p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
                            <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{articleData.title || slug}</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{articleData.desc}</p>
                            <span className="inline-block mt-4 text-xs font-semibold text-primary">{dict.ratgeber?.read_more || "Weiterlesen →"}</span>
                        </Link>
                    )})}
                </div>
            </section>
        </main>
    );
}
