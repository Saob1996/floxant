import { Header } from "@/components/Header";
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";

export const metadata = {
    title: "AGB – FLOXANT",
    description: "Allgemeine Geschäftsbedingungen von Floxant.",
    robots: "index, follow",
};

export default async function AGB({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Allgemeine Geschäftsbedingungen (AGB)</h1>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <section>
                        <p className="font-semibold text-foreground">
                            FLOXANT<br />
                            Dienstleistungsunternehmen für Umzug, Transport, Reinigung und Zusatzservices<br />
                            Sitz: Düsseldorf, Deutschland
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§1 Geltungsbereich</h2>
                        <p>
                            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Firma FLOXANT, nachfolgend „Dienstleister“ genannt, und ihren Kunden, nachfolgend „Auftraggeber“ genannt.
                        </p>
                        <p className="mt-2">Die AGB gelten für sämtliche Dienstleistungen, insbesondere:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Umzugs- und Transportleistungen</li>
                            <li>Möbelmontage und Demontage</li>
                            <li>Reinigungsleistungen</li>
                            <li>Entrümpelungen</li>
                            <li>Entsorgungen</li>
                            <li>Lager- und Zusatzleistungen</li>
                        </ul>
                        <p className="mt-2">
                            Abweichende Geschäftsbedingungen des Auftraggebers finden keine Anwendung, es sei denn, der Dienstleister stimmt diesen ausdrücklich schriftlich zu.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§2 Vertragsabschluss</h2>
                        <p>Angebote von FLOXANT sind freibleibend und unverbindlich.</p>
                        <p className="mt-2">Ein Vertrag kommt zustande durch:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>schriftliche Auftragsbestätigung,</li>
                            <li>elektronische Bestätigung (z. B. E-Mail oder Online-Formular),</li>
                            <li>oder durch tatsächliche Durchführung der Leistung.</li>
                        </ul>
                        <p className="mt-2">
                            Grundlage des Vertrages ist das jeweils bestätigte Angebot bzw. die vereinbarte Leistungsbeschreibung.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§3 Leistungsumfang</h2>
                        <p>
                            FLOXANT erbringt die vereinbarten Dienstleistungen mit der Sorgfalt eines ordentlichen und fachkundigen Dienstleisters.
                        </p>
                        <p className="mt-2">Der konkrete Leistungsumfang ergibt sich aus dem bestätigten Angebot.</p>
                        <p className="mt-2">Zusatzleistungen oder Mehraufwand werden gesondert berechnet, insbesondere bei:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>nicht angegebenen Möbeln oder Gegenständen,</li>
                            <li>zusätzlichen Etagen ohne Aufzug,</li>
                            <li>langen Tragewegen,</li>
                            <li>Wartezeiten,</li>
                            <li>erschwerten Zugangsbedingungen,</li>
                            <li>nachträglichen Leistungsänderungen.</li>
                        </ul>
                        <p className="mt-2">
                            FLOXANT ist berechtigt, zur Erfüllung des Auftrags geeignete Subunternehmer einzusetzen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§4 Mitwirkungspflichten des Auftraggebers</h2>
                        <p>
                            Der Auftraggeber ist verpflichtet, alle für die Durchführung relevanten Informationen vollständig und wahrheitsgemäß anzugeben.
                        </p>
                        <p className="mt-2">Der Auftraggeber hat sicherzustellen:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>freie Zufahrt und Parkmöglichkeit,</li>
                            <li>zugängliche Transportwege,</li>
                            <li>rechtzeitige Bereitstellung des Umzugsgutes.</li>
                        </ul>
                        <p className="mt-2">
                            Besonders empfindliche oder wertvolle Gegenstände (z. B. Elektronik, Glas, Kunst, Schmuck, Dokumente, Bargeld) sind gesondert zu sichern oder selbst zu transportieren.
                        </p>
                        <p className="mt-2">Elektronische Geräte müssen transportsicher vorbereitet werden.</p>
                        <p className="mt-2">
                            Für Verzögerungen oder Mehraufwand aufgrund unvollständiger Angaben haftet der Auftraggeber.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§5 Preise und Zahlungsbedingungen</h2>
                        <p>Alle Preise werden individuell vereinbart.</p>
                        <p className="mt-2">
                            Sofern nicht anders angegeben, verstehen sich alle Preise in Euro inklusive gesetzlicher Mehrwertsteuer.
                        </p>
                        <p className="mt-2">Rechnungen sind innerhalb von 7 Tagen nach Rechnungsstellung ohne Abzug zu zahlen.</p>
                        <p className="mt-2">
                            FLOXANT ist berechtigt, bei größeren Aufträgen eine angemessene Vorauszahlung zu verlangen.
                        </p>
                        <p className="mt-2">
                            Bei Zahlungsverzug ist FLOXANT berechtigt, gesetzliche Verzugszinsen zu berechnen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§6 Termine und Ausführungszeiten</h2>
                        <p>Vereinbarte Termine sind verbindlich.</p>
                        <p className="mt-2">
                            Verzögerungen aufgrund höherer Gewalt oder unvorhersehbarer Ereignisse (z. B. Verkehr, Wetter, behördliche Maßnahmen, technische Störungen) berechtigen nicht zu Schadensersatzansprüchen.
                        </p>
                        <p className="mt-2">
                            Wartezeiten, die nicht vom Dienstleister zu vertreten sind, können zusätzlich berechnet werden.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§7 Haftung</h2>
                        <p>FLOXANT haftet für Schäden nur bei Vorsatz oder grober Fahrlässigkeit.</p>
                        <p className="mt-2">Eine Haftung ist ausgeschlossen für:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>unzureichend verpackte Gegenstände durch den Auftraggeber,</li>
                            <li>Schäden an besonders empfindlichen Gegenständen ohne vorherige schriftliche Vereinbarung,</li>
                            <li>Geld, Schmuck, Wertpapiere oder wichtige Dokumente,</li>
                            <li>Schäden an selbst verpackten zerbrechlichen Gegenständen.</li>
                        </ul>
                        <p className="mt-2">
                            Offensichtliche Schäden müssen sofort bei Leistungserbringung gemeldet und schriftlich dokumentiert werden.
                        </p>
                        <p className="mt-2">Nicht erkennbare Schäden müssen innerhalb von 14 Tagen schriftlich gemeldet werden.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§8 Stornierung und Rücktritt</h2>
                        <p>Stornierungen müssen schriftlich erfolgen.</p>
                        <p className="mt-2">Es gelten folgende Stornogebühren:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>bis 5 Tage vor Termin: 30 % der Auftragssumme</li>
                            <li>weniger als 5 Tage vor Termin: 100 % der Auftragssumme</li>
                        </ul>
                        <p className="mt-2">
                            Bei Stundenaufträgen werden im Falle kurzfristiger Stornierung mindestens 8 Arbeitsstunden berechnet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§9 Entsorgung und verbotene Gegenstände</h2>
                        <p>
                            Der Auftraggeber bestätigt, dass keine gefährlichen, illegalen oder verbotenen Gegenstände transportiert oder entsorgt werden.
                        </p>
                        <p className="mt-2">
                            Für gesetzeswidrige Inhalte oder Materialien trägt der Auftraggeber die alleinige Verantwortung.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§10 Vermittlung von Drittleistungen</h2>
                        <p>
                            Sofern FLOXANT externe Dienstleister oder Handwerker vermittelt, haftet FLOXANT ausschließlich für die sorgfältige Auswahl, nicht jedoch für die Ausführung der Leistungen durch Dritte.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§11 Lagerung</h2>
                        <p>
                            Sofern Lagerleistungen vereinbart werden, gelten ergänzend die Allgemeinen Lagerbedingungen des Deutschen Möbeltransports (ALB).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§12 Aufrechnung</h2>
                        <p>
                            Eine Aufrechnung gegen Forderungen von FLOXANT ist nur mit unbestrittenen oder rechtskräftig festgestellten Gegenforderungen zulässig.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§13 Gerichtsstand und anwendbares Recht</h2>
                        <p>Es gilt ausschließlich deutsches Recht.</p>
                        <p className="mt-2">Gerichtsstand für Kaufleute ist Düsseldorf.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">§14 Schlussbestimmungen</h2>
                        <p>
                            Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
