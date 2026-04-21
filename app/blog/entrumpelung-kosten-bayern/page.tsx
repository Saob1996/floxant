
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, ArrowRight, Trash2, Home, Receipt, CheckCircle } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
    const pageLocale = "de";
    return generatePageSEO({
        pageLocale,
        path: 'blog/entrumpelung-kosten-bayern',
        title: "Kosten einer Entrümpelung in Bayern | Ratgeber | FLOXANT",
        description: "Was kostet eine Haushaltsauflösung oder Entrümpelung in Bayern? Wir klären auf über Preise, Wertanrechnung und Entsorgung.",
    });
}

export default async function BlogEntruempelungKosten() {
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: "Entrümpelung Kosten Bayern" }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20 text-slate-900">
                <div className="mb-8"><Breadcrumbs lang="de" items={breadcrumbs} /></div>
                <article>
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 15. April 2026</span>
                            <span className="flex items-center gap-1"><Trash2 className="w-4 h-4" /> Entrümpelung</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            Entrümpelung in Bayern: Kosten, Planung und Wertanrechnung
                        </h1>
                    </header>
                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
                        <p>Eine Entrümpelung ist oft eine emotionale und logistische Herausforderung. Wir zeigen Ihnen, wie Sie diese effizient meistern.</p>
                        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 my-10">
                            <h3 className="mt-0 text-emerald-900 flex items-center gap-2"><CheckCircle className="text-emerald-600" /> FLOXANT Transparenz</h3>
                            <p className="text-emerald-800">Wir bieten Ihnen volle Kostenkontrolle durch Besichtigungen per Video oder vor Ort – und das in ganz Bayern.</p>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
