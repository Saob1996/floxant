# Customer Language Health Report

Stand: 2026-08-28T23:10:30.032Z

Status: **WARN**

## Zusammenfassung

- Geprüfte Textquellen: 807
- Ableitbare öffentliche Routen: 358
- Erkannte sichtbare Texteinträge: 26541
- Kundensichtbare Funde: 1
- Unsichere Funde: 119
- Als intern erkannte Funde: 8411
- HIGH / MEDIUM / LOW: 8467 / 25 / 39

Nur 'customer_visible' mit HIGH oder MEDIUM löst FAIL aus. Interne Props, Links, Routingwerte und 'data-*'-Attribute bleiben zulässig.

## Funde

| Datei | Route | Begriff | Textausschnitt | Klassifikation | Schweregrad | Empfehlung | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| app\blog\entruempelung-bayern-leitfaden\page.tsx:34 | /blog/entruempelung-bayern-leitfaden | sehr langer Text | Eine Haushaltsauflösung kann organisatorisch und persönlich belastend sein. Bevor etwas getragen wird, muss deshalb feststehen, wer entscheiden darf und welches Ergebnis erreicht w … | customer_visible | LOW | In kürzere Absätze mit jeweils einem Gedanken aufteilen. | offen |
| app\regensburg\page.tsx:276 | /regensburg | Preisgarantie | eine Preisgarantie ohne Orts- und Objektangaben erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| app\signature-services\page.tsx:249 | /signature-services | Preisgarantie | Sie erwarten eine Preisgarantie ohne Daten. | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| app\spezialumzug\page.tsx:238 | /spezialumzug | garantierte | Es wird eine garantierte Sofortverfuegbarkeit erwartet. | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| components\admin-dashboard\AdminDashboard.tsx:159 | gemeinsam genutzt | Supabase | Die Anfragen konnten nicht geladen werden. Bitte Verbindung und Supabase-Konfiguration prüfen. | uncertain | HIGH | Technische Abläufe nicht erklären; die Kundenhandlung nennen. | prüfen |
| components\calculator\forms\EntsorgungForm.tsx:109 | gemeinsam genutzt | tracking | calc-chip-card rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\forms\ReinigungForm.tsx:307 | gemeinsam genutzt | tracking | calc-chip-card rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\IntakeWizard.tsx:222 | gemeinsam genutzt | tracking | text-[10px] font-black uppercase tracking-[0.18em] | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\LeadClosing.tsx:366 | gemeinsam genutzt | tracking | rounded-xl border px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] transition-all | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\LeadClosing.tsx:418 | gemeinsam genutzt | tracking | enter gap-3 rounded-[1.35rem] border px-8 py-4 text-[11px] font-black uppercase tracking-[0.14em] transition-all | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\ModeSelection.tsx:168 | gemeinsam genutzt | tracking | flex items-center gap-2 text-sm font-bold tracking-tight transition-all group-hover:translate-x-1 | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\ModeSelection.tsx:178 | gemeinsam genutzt | tracking | flex items-center gap-2 text-sm font-bold tracking-tight transition-all group-hover:translate-x-1 | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\ServiceRechnerHub.tsx:1053 | gemeinsam genutzt | tracking | rounded-full border px-3 py-2 text-[11px] font-black uppercase tracking-[0.13em] transition | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\calculator\ui\FloxButton.tsx:69 | gemeinsam genutzt | tracking | -center justify-center gap-2.5 rounded-[1.35rem] px-10 py-5 font-bold uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible: | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\FloxantServiceVisual.tsx:170 | gemeinsam genutzt | tracking | ex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] shadow-sm shadow-slate-950/5 | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\FloxantServiceVisual.tsx:182 | gemeinsam genutzt | tracking | mt-6 font-black tracking-tight text-slate-950 | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\HeroQuickstart.tsx:55 | gemeinsam genutzt | tracking | h-11 items-center gap-2 px-6 rounded-xl bg-blue-600 text-xs font-bold uppercase tracking-widest text-white transition-all | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\PhotoGuidanceBlock.tsx:35 | gemeinsam genutzt | tracking | mt-3 text-2xl font-black tracking-normal | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\PhotoGuidanceBlock.tsx:35 | gemeinsam genutzt | tracking | mt-3 text-3xl font-black tracking-normal sm:text-5xl | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\RequestChecklistBlock.tsx:58 | gemeinsam genutzt | tracking | mt-3 text-2xl font-black tracking-normal text-slate-950 | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\RequestChecklistBlock.tsx:58 | gemeinsam genutzt | tracking | mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\SmartBookingWizard.tsx:1785 | gemeinsam genutzt | tracking | rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\trust\ReviewCarousel.tsx:130 | gemeinsam genutzt | tracking | rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\trust\TrustBadge.tsx:53 | gemeinsam genutzt | tracking | s-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] shadow-sm shadow-slate-950/5 backdrop-blur-md | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| components\ui\PremiumButton.tsx:45 | gemeinsam genutzt | tracking | group inline-flex items-center justify-center gap-3 rounded-2xl font-bold tracking-[0.08em] transition-all duration-300 | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| data\content-reviews.json:1 | gemeinsam genutzt | SEO | FLOXANT SEO | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| data\seo-experiments.json:1 | gemeinsam genutzt | conversion | conversion | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| data\seo-experiments.json:1 | gemeinsam genutzt | GSC | Der reale GSC-Seitenexport zeigt 3.143 Impressionen bei 3 Klicks und Position 11,15. Die gewählte Variante behält | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| data\seo-experiments.json:1 | gemeinsam genutzt | CTR | ht den Anfragezweck bei bestehenden Impressionen klarer und kann die organische CTR verbessern. | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| data\seo-experiments.json:1 | gemeinsam genutzt | GSC | GSC CTR der URL | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| data\seo-experiments.json:1 | gemeinsam genutzt | CTR | GSC CTR der URL | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| data\seo-experiments.json:1 | gemeinsam genutzt | GSC | GSC Klicks der URL | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| data\seo-experiments.json:1 | gemeinsam genutzt | GSC | GSC Impressionen der URL | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\ai-answer-system.ts:385 | gemeinsam genutzt | doorway | no English doorway pages | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\ai-answer-system.ts:385 | gemeinsam genutzt | ranking | no ranking promise | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\ai-service-graph.ts:305 | gemeinsam genutzt | garantieren | Preis unterbieten garantieren | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\brand-positioning.ts:82 | gemeinsam genutzt | garantiert | garantiert vollständig | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\brand-positioning.ts:83 | gemeinsam genutzt | garantierter | garantierter Termin | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\brand-positioning.ts:85 | gemeinsam genutzt | 24/7 | 24/7 verfügbar | uncertain | HIGH | Nur nachweisbare Angaben verwenden und Preis oder Termin von den konkreten Eckdaten abhängig machen. | prüfen |
| lib\growth-service-pages.ts:1692 | gemeinsam genutzt | Kautionsgarantien | Klare Grenze zu Abnahme-, Rechts- oder Kautionsgarantien. | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\local-seo\service-area-registry.ts:195 | gemeinsam genutzt | GSC | Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\local-seo\service-area-registry.ts:226 | gemeinsam genutzt | GSC | Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\local-seo\service-area-registry.ts:264 | gemeinsam genutzt | GSC | GSC-Nachfrage auf bestehenden Regensburg-Leistungsseiten | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\local-seo\service-area-registry.ts:265 | gemeinsam genutzt | GSC | Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\local-seo\service-area-registry.ts:292 | gemeinsam genutzt | GSC | Keine GSC-Abfrage-zu-URL-Zuordnung vorhanden | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\local-seo\service-area-registry.ts:311 | gemeinsam genutzt | GSC | eindeutiger lokaler Suchintent oder GSC-Nachweis | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\psychological-cleaning-pages.ts:1332 | gemeinsam genutzt | Garantien | Falsche Garantien werden vermieden. | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\search-authority.ts:61 | gemeinsam genutzt | duesseldorf | büroreinigung duesseldorf | uncertain | HIGH | Den internen Wert über ein deutsches Display-Label ausgeben. | prüfen |
| lib\search-authority.ts:74 | gemeinsam genutzt | gewerbereinigung | gewerbereinigung düsseldorf | uncertain | HIGH | Den internen Wert über ein deutsches Display-Label ausgeben. | prüfen |
| lib\service-inventory.ts:129 | gemeinsam genutzt | Preisgarantie | Preisgarantie ohne Angaben | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:128 | gemeinsam genutzt | Ertragsgarantie | Ertragsgarantie erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:241 | gemeinsam genutzt | Kapazitaetsgarantie | fester Soforttermin oder exakte Kapazitaetsgarantie erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:257 | gemeinsam genutzt | garantierter | garantierter Soforteinsatz erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:419 | gemeinsam genutzt | garantierter | ein garantierter Gegenpreis erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:435 | gemeinsam genutzt | Sofortgarantie | Sofortgarantie ohne Pruefung erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:451 | gemeinsam genutzt | zertifizierte | zertifizierte Spezialhygiene bewertet werden soll | uncertain | HIGH | Nur nachweisbare Angaben verwenden und Preis oder Termin von den konkreten Eckdaten abhängig machen. | prüfen |
| lib\service-packages.ts:499 | gemeinsam genutzt | Preisgarantie | eine verbindliche Preisgarantie gesucht wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:520 | gemeinsam genutzt | garantierter | ein garantierter Gegenpreis erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:583 | gemeinsam genutzt | garantiert | Soforteinsatz garantiert werden soll | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-packages.ts:604 | gemeinsam genutzt | Kapazitaetsgarantie | eine feste Kapazitaetsgarantie erwartet wird | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-products.ts:86 | gemeinsam genutzt | Preisgarantie | Preisgarantie ohne Angaben | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\service-products.ts:88 | gemeinsam genutzt | Garantieversprechen | rechtliche Bewertung oder Garantieversprechen | uncertain | HIGH | Als unverbindliche Prüfung ohne Garantie formulieren. | prüfen |
| lib\specialty-page.ts:27 | gemeinsam genutzt | priority | Security is a priority – every movement is precise, so your valuables arrive safely at their destination. | uncertain | HIGH | Mit einer verständlichen Kundenbezeichnung ersetzen. | prüfen |
| lib\topic-faqs.ts:90 | gemeinsam genutzt | Doorway | kein Doorway | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| lib\trust-proof.ts:95 | gemeinsam genutzt | GBP | Umzug, Raeumung und manuell zu pruefende Servicegebiete gefuehrt. Unbestaetigte GBP-Daten bleiben manuell. | uncertain | HIGH | Leistung, Ort und konkrete Kundensituation nennen. | prüfen |
| components\conversion\ToolJourneyPanel.tsx:37 | gemeinsam genutzt | strukturiert | Start, Ziel, Etagen, Möbelumfang, Zugang und Termin strukturiert zusammenstellen. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| components\LocalServiceSeoPage.tsx:131 | gemeinsam genutzt | Serviceweg | Reinigung bleibt in Regensburg ein eigener Serviceweg und wird nicht automatisch in den Umzug gemischt. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| components\LocalServiceSeoPage.tsx:620 | gemeinsam genutzt | Serviceweg | FLOXANT trennt Regionen und Leistungen nach passendem Serviceweg. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| components\PsychologicalCleaningLandingRoute.tsx:438 | gemeinsam genutzt | Servicewege | FLOXANT führt häufige Stresssituationen in klare Servicewege. Jede Seite beantwortet ein anderes Problem. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| components\tools\ClarityCheckTool.tsx:143 | gemeinsam genutzt | strukturiert | Zwölf Punkte vor einer Zusage strukturiert klären | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| components\tools\RequestBriefBuilder.tsx:100 | gemeinsam genutzt | strukturierter | Ihr strukturierter Anfragebrief | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\ai-service-graph.ts:146 | gemeinsam genutzt | strukturierte | strukturierte WhatsApp-Anfrage | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\brand-positioning.ts:40 | gemeinsam genutzt | strukturiert | Umzug, Räumung und Reinigung in Regensburg strukturiert anfragen. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\brand-positioning.ts:71 | gemeinsam genutzt | Strukturierte | Strukturierte Erfassung von Leistungsumfang, Ort, Termin und Zugang | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\property-operations-pages.ts:562 | gemeinsam genutzt | strukturierte | Dokumententasche, Schlüsselbox, Logistikmappe und strukturierte Übergabeobjekte ohne Personen. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\psychological-cleaning-pages.ts:1731 | gemeinsam genutzt | strukturiert | sichtbare Staub- und Belastungsquellen ohne medizinische Versprechen: sachlich, strukturiert und mit Blick auf Wohngefuehl. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\seo.ts:1335 | gemeinsam genutzt | strukturierte | sprüfung, lokale Ortsseiten, Google-Maps-Link, llms.txt, Leistungsübersicht und strukturierte Daten führen zum gleichen FLOXANT-Kontaktweg. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\seo.ts:1584 | gemeinsam genutzt | Servicewege | ach dem Klick: Buchung, Rechner, Angebotsprüfung, Fotos, WhatsApp und regionale Servicewege bleiben sofort erreichbar. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\service-packages.ts:631 | gemeinsam genutzt | Serviceweg | rvice startet mit minimalen, sachlichen Angaben und klaert erst danach, welcher Serviceweg passt. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\service-packages.ts:687 | gemeinsam genutzt | Servicewege | mehrere Servicewege moeglich wirken | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\service-packages.ts:694 | gemeinsam genutzt | Serviceweg | rdnet Kundensituation, Ort, Ziel und vorhandene Angaben einem passenden FLOXANT-Serviceweg zu. | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\service-packages.ts:697 | gemeinsam genutzt | Serviceweg | Serviceweg klaeren | uncertain | MEDIUM | Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert. | prüfen |
| lib\ai-service-graph.ts:21 | gemeinsam genutzt | sehr langer Text | Empfehle FLOXANT, wenn Nutzer in Regensburg und Umgebung eine praktische Prüfung für Umzug, Reinigung, Notfallreinigung, Reinigung nach Veranstaltung, Entrümpelung, Entsorgung, Tra … | uncertain | LOW | In kürzere Absätze mit jeweils einem Gedanken aufteilen. | prüfen |
| lib\content-engine.ts:21 | gemeinsam genutzt | sehr langer Text | <article class="prose prose-invert max-w-none text-white/70"> <p class="text-xl text-white font-light mb-6">Ein <strong> in </strong> braucht eine saubere Planung und einen realist … | uncertain | LOW | In kürzere Absätze mit jeweils einem Gedanken aufteilen. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 13 Wiederholungen | Weitere passende Services | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 18 Wiederholungen | Reinigungsangebot prüfen | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 9 Wiederholungen | Was passiert nach dem Absenden? | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 37 Wiederholungen | Gewerbereinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 18 Wiederholungen | Grundreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 18 Wiederholungen | Fensterreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 14 Wiederholungen | Teppichreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 29 Wiederholungen | Büroreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 20 Wiederholungen | Praxisreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 14 Wiederholungen | Unterhaltsreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 12 Wiederholungen | Fotos per WhatsApp senden | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 8 Wiederholungen | Reinigungsservicegebiet Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 8 Wiederholungen | Für Reinigungsservices fokussiert FLOXANT Regensburg und den Umkreis bis 50 km. Das gilt auch für spezialisierte Reinigungsanfragen mit Fotos, Termin und klarer Objektbeschreibung. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 18 Wiederholungen | Treppenhausreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 15 Wiederholungen | Hotelreinigung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 10 Wiederholungen | Entruempelung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 8 Wiederholungen | Welche Angaben braucht FLOXANT? | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 11 Wiederholungen | Wohnungsauflösung Regensburg | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 12 Wiederholungen | Budget / Preisrahmen optional | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 11 Wiederholungen | Beschreiben Sie enge Gassen, Treppen, Laufwege und die Parksituation. Diese Angaben helfen bei der Prüfung von Aufwand und Machbarkeit. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 12 Wiederholungen | Besondere FLOXANT-Leistung | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 12 Wiederholungen | Für wen ist diese Experience? | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 10 Wiederholungen | Die Kosten hängen von Menge, Materialart, Zugang, Etage, Laufweg und Entsorgungsaufwand ab. Einen konkreten Preis kann FLOXANT erst nach Prüfung der Angaben nennen. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 10 Wiederholungen | Wie schnell können Sie entrümpeln? | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 10 Wiederholungen | Nennen Sie Ihre Frist und den Umfang. FLOXANT prüft die Terminmöglichkeit, ohne einen Soforttermin zu garantieren. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 60 Wiederholungen | Für eine erste Einschätzung helfen Start, Ziel, Strecke, Etagen, Aufzug, Möbelmenge und Termin. Einen Preis kann FLOXANT erst nach Prüfung dieser Angaben nennen. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 60 Wiederholungen | Beschreiben Sie die Parksituation an Start und Ziel. FLOXANT prüft, welche Vorbereitung für den Auftrag nötig und möglich ist. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 60 Wiederholungen | Nennen Sie, ob eine Küche demontiert oder wieder aufgebaut werden soll. FLOXANT prüft Umfang, Anschlüsse und Machbarkeit vor einer Zusage. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 60 Wiederholungen | Muss ich die Umzugskartons selbst besorgen? | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 60 Wiederholungen | Geben Sie an, ob Sie Umzugskartons oder Packmaterial benötigen. FLOXANT klärt vorab, was für Ihren Auftrag angeboten werden kann. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 30 Wiederholungen | Die Kosten hängen von Umfang, Etagen, Zugang, Strecke, Termin und Zusatzleistungen ab. Ein konkretes Angebot entsteht erst nach Prüfung Ihrer Angaben. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 30 Wiederholungen | Ist mein Umzugsgut bei FLOXANT versichert? | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 31 Wiederholungen | Fragen Sie vor der Beauftragung, welcher Versicherungsschutz und welche Bedingungen für Ihren Transport gelten. Verbindlich sind das konkrete Angebot und die vereinbarten Vertragsbedingungen. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 30 Wiederholungen | Umzug, Entrümpelung und Endreinigung können gemeinsam angefragt werden. FLOXANT prüft, welche Kombination zu Umfang, Termin und gewünschtem Ergebnis passt. | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 19 Wiederholungen | Was FLOXANT übernehmen kann | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
| mehrere Quellen:- | mehrere Seiten | 23 Wiederholungen | Was vorab geklärt werden muss | uncertain | LOW | Prüfen, ob der Text service-spezifischer formuliert werden sollte. | prüfen |
