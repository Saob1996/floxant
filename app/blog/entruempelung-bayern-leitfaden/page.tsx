
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Haushaltsauflösung & Entrümpelung in Bayern | FLOXANT Blog",
    description: "Ein seriöser Leitfaden für Räumung, Wertanrechnung, Materialtrennung und fachgerechte Entsorgung in Bayern."
};

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-[#0A0B10] py-24 text-white">
            <div className="mx-auto max-w-4xl px-6">
                <Breadcrumbs lang="de" items={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: "Entrümpelung Bayern Leitfaden" }
                ]} />
                
                <header className="mb-16 mt-12 text-center">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
                        Haushaltsauflösung und Entrümpelung in Bayern seriös planen
                    </h1>
                    <p className="text-xl text-white/50 leading-relaxed">
                        Ein Leitfaden für fachgerechte Räumung, klare Vorprüfung, Wertanrechnung und Entsorgung.
                    </p>
                </header>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h2>Entrümpelung mit System</h2>
                    <p>
                        Haushaltsauflösungen sind oft emotional belastend. Eine gute Räumung beginnt deshalb nicht beim Tragen,
                        sondern bei einer ruhigen Vorprüfung: Was bleibt, was wird entsorgt, welche Zugangswege gibt es und welche
                        Materialien brauchen besondere Behandlung?
                    </p>

                    <h3>Wertanrechnung realistisch prüfen</h3>
                    <p>
                        Nicht alles ist Müll. Gut erhaltene Möbel, Elektrogeräte oder einzelne Wertgegenstände können in manchen
                        Fällen berücksichtigt werden. Wichtig ist dabei eine ehrliche Einschätzung, damit keine falschen Erwartungen entstehen.
                    </p>

                    <h3>Fachgerechte Entsorgung vorbereiten</h3>
                    <p>
                        Seriöse Entrümpelung trennt Materialien, dokumentiert Sonderfälle und plant Transportwege. Besonders in Bayern
                        sind kurze Wege, klare Materialarten und eine saubere Übergabe entscheidend für einen reibungslosen Ablauf.
                    </p>
                </article>

                <div className="mt-20 border-t border-white/10 pt-12">
                    <div className="rounded-3xl bg-blue-600/10 p-10 text-center">
                        <h2 className="mb-4 text-2xl font-bold">Interesse an einer Beratung?</h2>
                        <p className="mb-8 text-white/60">Starten Sie mit einer unverbindlichen Vorprüfung und einem nachvollziehbaren Orientierungsrahmen.</p>
                        <Link href="/rechner" className="btn-premium inline-flex py-4 px-10 rounded-2xl bg-blue-600 font-bold uppercase tracking-widest">
                            Vorprüfung starten
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
    
