import { Header } from "@/components/Header";

export const metadata = {
    title: "AGB – FLOXANT",
    description: "Allgemeine Geschäftsbedingungen von Floxant.",
    robots: "index, follow",
};

export default function AGB() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Allgemeine Geschäftsbedingungen (AGB)</h1>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">1. Geltungsbereich</h2>
                        <p>Diese AGB gelten für alle Dienstleistungen der Firma FLOXANT.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">2. Vertragsabschluss</h2>
                        <p>Ein Vertrag kommt durch schriftliche oder digitale Bestätigung zustande.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">3. Leistungen</h2>
                        <p>FLOXANT bietet Umzugs-, Reinigungs- und Zusatzdienstleistungen an.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">4. Preise und Zahlung</h2>
                        <p>Alle Preise werden individuell vereinbart.<br />
                            Zahlung erfolgt nach Rechnungsstellung.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">5. Haftung</h2>
                        <p>FLOXANT haftet nur bei Vorsatz oder grober Fahrlässigkeit.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">6. Termine</h2>
                        <p>Vereinbarte Termine sind verbindlich.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">7. Stornierung</h2>
                        <p>Stornierungen müssen schriftlich erfolgen.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
