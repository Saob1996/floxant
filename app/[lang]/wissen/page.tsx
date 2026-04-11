import { type Locale } from "@/i18n-config";
import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { generatePageSEO } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generatePageSEO({
        pageLocale: lang as Locale,
        path: "wissen",
        title: "Ratgeber & Wissen rund um Umzug, Reinigung & Entrümpelung | FLOXANT",
        description: "Wertvolle Tipps für Ihren Umzug, professionelle Reinigung und fachgerechte Entrümpelung in Bayern. Jetzt informieren!",
    });
}

export default async function WissenLandingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    return (
        <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
                    <BookOpen size={18} /> FLOXANT Wissen
                </div>
                <h1 className="text-4xl md:text-6xl font-light mb-8">
                    Expertenwissen für Ihren <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Neuanfang.</span>
                </h1>
                <p className="text-xl text-white/60 mb-12 leading-relaxed">
                    Entdecken Sie hilfreiche Ratgeber, Checklisten und tiefgreifende Artikel zu den Themen Umzug, Reinigung und Entrümpelung. Fachmännisch aufbereitet für Ihren Erfolg.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
                    {[
                        { title: "Umzugskosten senken", slug: "umzug-kosten", desc: "Wie Sie systematisch bei Ihrem nächsten Umzug sparen können." },
                        { title: "Richtig Entrümpeln", slug: "entruempelung-tipps", desc: "Schritt-für-Schritt Anleitung zur stressfreien Haushaltsauflösung." },
                    ].map((item) => (
                        <Link 
                            key={item.slug} 
                            href={`/${lang}/wissen/${item.slug}-bayern`}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all"
                        >
                            <h3 className="text-xl font-medium mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                            <p className="text-white/40 text-sm mb-4">{item.desc}</p>
                            <div className="flex items-center gap-2 text-blue-400 font-medium">
                                Weiterlesen <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
