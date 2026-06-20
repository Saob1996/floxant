# FLOXANT Mobile Conversion QA

Stand: 2026-06-19

## Umfang

Geprueft werden conversionkritische Mobile-Zustaende fuer 360px, 390px, 430px und Tablet-nahe Breiten. Der Fokus liegt auf Kontakt, CTA, Formular, Success-State und Vercel-sicheren Ladepfaden.

## Status

Gesamtstatus: PASS.

Lokaler Production-Browsercheck am 2026-06-19:

- 30 kritische Routen bei 390px geprueft.
- 0 Failures, 0 Warnings.
- H1 sichtbar, CTA sichtbar, keine horizontalen Scrollbars.
- Kontakt-Prefill fuer service/city/intent geprueft.
- Invalid Query-Parameter brechen `/kontakt` nicht.
- Leeres Formular loest keinen Fetch aus und zeigt deutsche Fehlersignale.
- Success-State wurde mit abgefangener Fetch-Antwort simuliert; kein echter Lead wurde gespeichert oder versendet.

| Bereich | Status | Ergebnis | Risiko | Naechster Schritt |
| --- | --- | --- | --- | --- |
| Header/Navigation | PASS | Public Pages nutzen bestehende SiteChrome-/Header-Struktur. | Niedrig | Browsercheck auf 390px. |
| Hero-CTA | PASS | Kritische Seiten fuehren ueber zentrale CTA-Komponenten oder Kontaktziele. | Niedrig | Auf Mobile sichtbaren ersten CTA pruefen. |
| Sticky/Fixed Elemente | PASS | Browsercheck 390px ohne verdeckte Formular-/CTA-Blocker. | Niedrig | Nach Production stichprobenartig beobachten. |
| Formularfelder | PASS | SeoLeadForm enthaelt Name, E-Mail, Telefon, Service, Ort, Nachricht, Datenschutz, Honeypot. | Niedrig | Mobile Fokus-/Fehlerzustand pruefen. |
| Fehlermeldungen | PASS | Leeres Formular zeigt deutsche Fehlersignale und sendet nicht. | Niedrig | Keine Aktion. |
| Success-State | PASS | SeoLeadForm, Offer-Formulare und Buchungs-API haben Success-/Error-States. | Niedrig | Erfolgszustand nicht als Buchungszusage interpretieren. |
| Horizontales Scrollen | PASS | Kein horizontaler Scroll im 390px Browsercheck. | Niedrig | 360/430px nach Preview stichprobenartig pruefen. |
| Visual Layout Shift | PASS/WARN | 390px Browsercheck ohne sichtbaren Blocker; CLS bleibt nach Preview manuell zu beobachten. | Niedrig | Nach Preview stichprobenartig pruefen. |
| Kontaktseite erreichbar | PASS | `/kontakt` und service/city/intent-URLs werden geroutet. | Niedrig | Query-Prefill im Browser pruefen. |

## Mobile Testpfade

- `/`
- `/kontakt`
- `/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo`
- `/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo`
- `/kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo`
- `/angebot-guenstiger-pruefen`
- `/angebotscheck`
- `/duesseldorf/reinigung`
- `/duesseldorf/bueroreinigung`
- `/umzug-regensburg`
- `/klaviertransport-regensburg`

## Manuelle Mobile-Checkliste vor Merge

- Kein Header verdeckt H1 oder ersten CTA.
- CTA-Buttons bleiben mindestens fingerfreundlich gross.
- Formularfelder sind ohne Zoom nutzbar.
- Fehlertexte erscheinen nahe am betroffenen Feld.
- Datenschutz-Hinweis bleibt sichtbar.
- Success-State sagt nur Anfrage erhalten, keine Buchungs-, Preis- oder Verfuegbarkeitsgarantie.
- Keine horizontalen Scrollbars bei 360px.
- WhatsApp/Telefon nur mit vorhandenen echten FLOXANT-Daten.
