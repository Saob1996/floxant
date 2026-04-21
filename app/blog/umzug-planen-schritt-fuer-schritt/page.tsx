
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    const pageLocale = "de";
    return generatePageSEO({
        pageLocale,
        path: 'blog/umzug-planen-schritt-fuer-schritt',
        title: "Umzug planen: In 10 Schritten zum Ziel | FLOXANT",
        description: "Unser ultimativer Leitfaden für Ihre Umzugsplanung. Schritt für Schritt von der Kündigung bis zur Einweihung.",
    });
}

export default async function BlogUmzugPlanen() {
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: "Umzug planen" }
    ];

    return (
        <main className="min-h-screen bg-white">
            <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20 text-slate-900">
                <div className="mb-8"><Breadcrumbs lang="de" items={breadcrumbs} /></div>
                <article>
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 18. März 2026</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 15 Min. Lesezeit</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                            Umzug planen: Der ultimative Leitfaden in 10 Schritten
                        </h1>
                    </header>
                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
                        <p>Ein Umzug beginnt mit einer Entscheidung und endet in Ihrem neuen Zuhause. Dazwischen liegt die Planung. Wir begleiten Sie durch jede Phase.</p>
                        
                        <div className="bg-slate-50 p-8 rounded-3xl border my-10">
                            <ul className="list-none ps-0 space-y-4">
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="text-blue-600 mt-1" />
                                    <div>
                                        <strong>Schritt 1: Verträge kündigen</strong>
                                        <p className="text-sm text-slate-500">Mietvertrag, Strom, Internet – behalten Sie die Fristen im Auge.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="text-blue-600 mt-1" />
                                    <div>
                                        <strong>Schritt 2: Entrümpeln</strong>
                                        <p className="text-sm text-slate-500">Weniger Ballast bedeutet geringere Umzugskosten.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <p>Noch Fragen? Kontaktieren Sie unsere Experten.</p>
                        <Link href="/umzug" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full no-underline">
                            Zum Umzugsservice
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}
