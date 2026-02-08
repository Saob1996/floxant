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
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">1. Datenschutz auf einen Blick</h2>
                        <p>
                            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. In dieser Datenschutzerklärung informieren wir Sie darüber, welche Daten beim Besuch unserer Website erfasst werden und wie diese verwendet werden.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">2. Verantwortliche Stelle</h2>
                        <p>
                            FLOXANT<br />
                            Inhaber: Saleh Obid<br />
                            Breite Straße 22<br />
                            40213 Düsseldorf<br />
                            Deutschland<br />
                            Telefon: +49 1577 1105087<br />
                            E-Mail: [wird ergänzt]
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">3. Datenerfassung auf unserer Website</h2>

                        <h3 className="font-semibold text-foreground mt-4 mb-2">a) Server-Log-Dateien</h3>
                        <p>
                            Beim Besuch unserer Website werden automatisch Informationen durch den Hosting-Anbieter erfasst und in sogenannten Server-Log-Dateien gespeichert. Dies sind:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Browsertyp und Browserversion</li>
                            <li>verwendetes Betriebssystem</li>
                            <li>Referrer URL</li>
                            <li>IP-Adresse</li>
                            <li>Datum und Uhrzeit der Serveranfrage</li>
                        </ul>
                        <p className="mt-2">
                            Diese Daten werden zur Sicherstellung eines störungsfreien Betriebs sowie zur Verbesserung der Website verwendet. Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht.
                        </p>
                        <p className="mt-2 font-semibold">Hosting erfolgt über:<br />Vercel Inc., USA</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">4. Kontaktformular und Buchungsanfragen</h2>
                        <p>
                            Wenn Sie uns über das Buchungsformular oder Kontaktformular Anfragen senden, werden Ihre Angaben aus dem Formular inklusive der von Ihnen hochgeladenen Dateien zum Zweck der Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen gespeichert.
                        </p>
                        <p className="mt-2">
                            Diese Daten werden in unserer Datenbank gespeichert (Supabase) und nicht ohne Ihre Einwilligung weitergegeben.
                        </p>
                        <p className="mt-2 italic">
                            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertrag bzw. Vertragsanbahnung)
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">5. Dateiuploads</h2>
                        <p>
                            Wenn Sie im Rahmen einer Anfrage Bilder oder Dateien hochladen, werden diese zur Bearbeitung Ihres Auftrags gespeichert und ausschließlich für diesen Zweck verwendet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">6. Cookies</h2>
                        <p>
                            Unsere Website verwendet Cookies. Cookies richten auf Ihrem Endgerät keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher und sicherer zu machen.
                        </p>
                        <p className="mt-2">
                            Die meisten der verwendeten Cookies sind sogenannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">7. Ihre Rechte</h2>
                        <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                        </ul>
                        <p className="mt-2">Hierzu können Sie sich jederzeit an uns wenden.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">8. SSL- bzw. HTTPS-Verschlüsselung</h2>
                        <p>
                            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. HTTPS-Verschlüsselung.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
