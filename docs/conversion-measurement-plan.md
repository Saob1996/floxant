# Conversion-Messplan

Stand: 18. Juli 2026. Es wurden keine Ereignisse, Conversions oder Erfolgsquoten erfunden und keine neue Tracking-Infrastruktur aktiviert.

## Bestehende Struktur

`ConversionEventReporter` erfasst CTA-, Telefon-, WhatsApp-, E-Mail- und Formularinteraktionen zunächst ausschließlich im Browser-Speicher und in einer anonymen Journey-ID. Google-Ads-Conversions werden nur bei Marketing-Einwilligung und vorhandener Konfiguration ausgelöst. Das automatische Success-Fetch-Tracking und Dwell-Tracking sind im Code deaktiviert. `lib/conversion-events.ts` klassifiziert Signale, speichert sie aber nicht selbst.

Eine ältere, nicht in dieser Phase ausgeführte SQL-Datei beschreibt `conversion_events`. Sie setzt einen serverseitigen Next.js-Pfad und Service-Role-Zugriff voraus und ist daher keine geeignete aktive Grundlage für den weiterhin rein statischen Export mit Cloudflare Pages Functions. Es wird keine zweite Event-Tabelle und keine neue Migration ergänzt.

## Datenschutzgrenzen

Erlaubte Event-Eigenschaften sind Ereignisname, grober Pfad, Sprache, Service-Cluster, anonyme Journey-ID und Zeitstempel. Nicht gespeichert werden dürfen Name, E-Mail, Telefonnummer, Adresse, Nachricht, Datei-URL, IP-Adresse oder vollständiger User-Agent. Vor einer serverseitigen Aktivierung ist die Consent-Kategorie der anonymen Journey-ID ausdrücklich festzulegen; eine Aktivierung erfolgt nicht in dieser Phase.

## Funnel: öffentliche Anfrage

| Schritt | Soll-Event | Aktuell messbar | Hinweis |
| --- | --- | --- | --- |
| Landingpage | `page_view` | Nein | Kein allgemeiner serverseitiger Eventstrom aktiv. |
| primärer CTA | `primary_cta_click` | Nur lokal | Varianten bestehender CTA-Namen müssen normalisiert werden. |
| Formularstart | `form_start` | Teilweise lokal | Nicht über alle Formulare konsistent. |
| Formular erfolgreich | `form_submit_success` | Teilweise | Einige Formulare senden eigene Events; globales Success-Fetch-Tracking ist deaktiviert. |
| Dashboard-Eingang | aus `bookings` | Ja, operativ | Kein anonymes Funnel-Event nötig. |
| Erstkontakt | `first_contact_at` | Nach Migration | `booking_admin_meta` muss manuell geprüft und angewendet werden. |
| Angebot gesendet | `quote_sent_at` | Nach Migration | Explizite Admin-Aktion. |
| Erledigt | Stage `completed` | Nach Migration | Keine automatische Erfolgsannahme. |

Der Funnel ist aktuell nicht durchgängig messbar. Deshalb werden keine Conversion-Prozentsätze angegeben.

## Funnel: Angebotsprüfung

Soll-Sequenz: `quote_check_start` → `quote_check_complete` → `request_builder_start` → `request_builder_complete` → `form_submit_success`. Einzelne Komponenten besitzen lokale Events, aber es gibt keine verifizierte persistente, consent-konforme Sequenz. Der Funnel ist nicht messbar; keine Prozentwerte.

## Funnel: englische Nutzer

Soll-Sequenz: englische Landingpage → englischer CTA → englisches Formular → erfolgreiche Anfrage. Die Locale `en` wird jetzt strukturiert in `bookings.details.metadata.locale` übermittelt. Eine persistente Eventsequenz fehlt weiterhin; der Funnel ist nicht messbar.

## Messplan nach kontrollierter Freigabe

1. Event-Namensliste und Consent-Kategorie fachlich und datenschutzseitig freigeben.
2. Nur anonyme, allowlist-basierte Properties zulassen.
3. Erfolgsereignis ausschließlich nach bestätigter Function-Response auslösen.
4. Operative Stufen aus `booking_admin_meta` aggregiert und ohne Kundendaten auswerten.
5. Vorher-/Nachher-Zeiträume mindestens 28 Tage vergleichen; Saison, Gerät, Sprache und Impressionen separat zeigen.
6. Rohzahlen, fehlende Events und Datenlücken offen ausweisen; keine Ranking- oder Umsatzzusage ableiten.
