import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import dynamic from "next/dynamic";

const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict?.pages as any)?.buero_umzug_regensburg || {};
    return {
        title: content.meta_title || "Büroumzug Regensburg | Profi-Service | FLOXANT",
        description: 'description: content.meta_desc || Professioneller Büroumzug in Regensburg und Umgebung. Wir planen und realisieren Ihren Firmenumzug effizient, termin...',
    };
}

export default async function BueroUmzugRegensburg({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale) as any;
    const content = (dict?.pages as any)?.buero_umzug_regensburg || {};
    const area = (dict?.area as any) || {};

    return (
        <main className="min-h-screen bg-background">
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                        {content.badge || "Regensburg & Oberpfalz"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-8">
                        {content.h1 || "Professioneller Büroumzug Regensburg"}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                        {content.hero_desc || "Wir machen Ihren Firmenumzug zum Erfolg. Effizient, diskret und absolut terminsicher."}
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <DualCalculator dic={dict} />
                </div>
            </section>

            <section className="py-20 px-6 bg-muted/30">
                <div className="max-w-4xl mx-auto prose prose-invert">
                    <h2 className="text-3xl font-bold mb-8">Ihr Partner für Firmenumzüge</h2>
                    <p>Ein Büroumzug erfordert präzise Planung. Wir sorgen dafür, dass Ihre IT-Systeme, Akten und Möbel sicher am neuen Standort ankommen – damit Sie so schnell wie möglich wieder arbeitsbereit sind.</p>
                </div>
            </section>
        </main>
    );
}
