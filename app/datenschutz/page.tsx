import { Header } from "@/components/Header";

export const metadata = {
    title: "Datenschutz – FLOXANT",
    description: "Datenschutzerklärung von Floxant.",
    robots: "index, follow",
};

export default function Datenschutz() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Datenschutz auf einen Blick</h2>
                            <p>Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Verantwortliche Stelle</h2>
                            <p>
                                FLOXANT<br />
                                [Adresse]<br />
                                Deutschland<br />
                                E-Mail: [E-Mail-Adresse]
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Datenerfassung auf unserer Website</h2>
                            <p><strong>Server-Log-Dateien</strong> werden automatisch gespeichert. Diese enthalten:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Browsertyp</li>
                                <li>Betriebssystem</li>
                                <li>IP-Adresse</li>
                                <li>Uhrzeit der Anfrage</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Kontaktformular / Buchungen</h2>
                            <p>Anfragen werden zur Bearbeitung gespeichert.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Cookies</h2>
                            <p>Unsere Website verwendet Cookies zur Verbesserung der Benutzerfreundlichkeit.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Ihre Rechte</h2>
                            <p>Sie haben jederzeit Recht auf:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Auskunft</li>
                                <li>Löschung</li>
                                <li>Berichtigung</li>
                                <li>Einschränkung</li>
                                <li>Datenübertragbarkeit</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
