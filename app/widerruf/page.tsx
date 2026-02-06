import { Header } from "@/components/Header";

export const metadata = {
    title: "Widerruf – FLOXANT",
    description: "Widerrufsbelehrung von Floxant.",
    robots: "index, follow",
};

export default function Widerrufsbelehrung() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Widerrufsbelehrung</h1>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p>Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen einen Vertrag zu widerrufen.</p>
                    <p>Die Widerrufsfrist beträgt 14 Tage ab Vertragsabschluss.</p>
                    <p>Zur Ausübung des Widerrufsrechts müssen Kunden FLOXANT mittels eindeutiger Erklärung informieren.</p>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Folgen des Widerrufs:</h2>
                        <p>Bereits geleistete Zahlungen werden innerhalb von 14 Tagen zurückerstattet.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
