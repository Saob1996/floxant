# SEO Conversion Events

Stand: 2026-06-19

## Ziel

Diese Datei beschreibt die vorbereiteten SEO-Conversion-Events fuer FLOXANT. Es wurden keine externen Trackingdienste eingebaut. Die Events liegen als `data-*` Attribute vor und werden dort, wo bereits vorhanden, vom lokalen `ConversionEventReporter` verarbeitet.

## Gemeinsame Attribute

- `data-event`: Eventname.
- `data-service`: Service-Slug, z. B. `reinigung`, `bueroreinigung`, `gewerbereinigung`, `umzug`, `entruempelung`, `wohnungsaufloesung`, `fernumzug`, `private-client`, `angebot-pruefen`.
- `data-city`: Stadt-/Region-Slug, falls lokal ableitbar, z. B. `duesseldorf`, `regensburg`, `landshut`, `muenchen`.
- `data-page-intent`: kaufnaher Seiten- oder Anfrage-Intent, z. B. `reinigung-duesseldorf`.
- `data-priority`: SEO-Prioritaet `p0`, `p1`, `p2` oder `p3`.
- `data-cta-label`: sichtbarer CTA-Text oder knappe technische Bezeichnung.
- `data-destination`: Ziel-URL ohne personenbezogene Daten.
- `data-source`: optionale Komponentenquelle, z. B. `header`, `homepage_hero`, `seo_contact_form`.

## Events

| Event | Zweck | Vorkommen | Aktiv verarbeitet |
| --- | --- | --- | --- |
| `seo_cta_click` | Klick auf SEO-Anfrage-CTA | Header, Footer, Hero, GSC-Module, Kontaktseite, zentrale `LeadCta` | Ja, ueber `ConversionEventReporter` |
| `seo_contact_form_view` | Formularsichtbarkeit fuer spaetere Messung | vorbereitet fuer zentrale Kontaktformular-Strecke | Teilweise vorbereitet, kein externer Dienst |
| `seo_lead_submit_attempt` | Nutzer versucht das SEO-Leadformular zu senden | `SeoLeadForm` Formular und Submit-Button | Ja, ueber Submit-/Custom-Event-Struktur |
| `seo_lead_submit_success` | Lead wurde erfolgreich von der bestehenden Booking-API angenommen | `SeoLeadForm` Success-State und Fetch-Erkennung | Ja |
| `seo_lead_submit_error` | Validierung oder API-Versand fehlgeschlagen | `SeoLeadForm` Fehlerzustand | Ja |
| `seo_phone_click` | Klick auf echte Telefonnummer | Footer, mobile Floating-Bar, Kontakt-/Servicebereiche | Ja als Klick-Event |
| `seo_email_click` | Klick auf echte E-Mail-Adresse | Footer und Kontaktbereiche | Ja als Klick-Event |

## Beispiel: SEO-CTA

```html
<a
  href="/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo"
  data-event="seo_cta_click"
  data-service="bueroreinigung"
  data-city="duesseldorf"
  data-page-intent="bueroreinigung-duesseldorf"
  data-priority="p0"
  data-cta-label="Bueroreinigung anfragen"
  data-destination="/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo"
>
  Bueroreinigung anfragen
</a>
```

## Beispiel: Leadformular

Das zentrale Formular sendet an die vorhandene Route `/api/bookings` und ergaenzt:

- `lead_type=seo_quick_lead`
- `leadSource=seo_quick_lead_form`
- `source=seo`
- `sourceComponent=SeoLeadForm`
- `sourcePage`
- `landingPage`
- `service`
- `city`
- `intent`
- `priority`
- `timestamp`
- `formStartedAt`
- `serviceCategory`
- `contactMethod`
- Angebotscheck optional: `offerStatus`, `existingOffer`, `offerAmount`, `offerConcern`, `deadline`

Honeypot: `companyWebsite` muss leer bleiben. Die minimale Zeitpruefung verhindert extrem schnelle Bot-Submits ohne Captcha.

## Lead-Quality-Felder

Neue strukturierte Leads koennen serverseitig `details.admin.leadQuality` enthalten. Dieses Objekt ist nicht fuer externe Trackingdienste gedacht und enthaelt keine neuen clientseitigen Beacons.

- `priority`: `p0`, `p1`, `p2` oder `p3`.
- `score`: interner Qualitaetsscore von 0 bis 100.
- `qualification`: `ready`, `needs_info` oder `thin`.
- `validation.missingRequired`: harte Blocker wie fehlender Kontakt.
- `validation.missingRecommended`: fehlende operative Angaben wie Ort, Terminfenster, Umfang oder Angebotsstatus.
- `nextAction`, `reasons`, `tags`: interne Bearbeitungshinweise.

## PII-Regeln

- Keine Namen, E-Mail-Adressen, Telefonnummern, Adressen oder Nachrichtentexte in `data-*` Attribute schreiben.
- Keine personenbezogenen Daten in CTA-URLs oder Query-Parameter schreiben.
- Erlaubt in Query-Parametern sind nur Service, Stadt, Intent und Quelle.
- Nachrichten, Telefonnummern und E-Mail-Adressen werden nur im Formularpayload an die bestehende API gesendet.
- Logging und Reports duerfen keine Lead-Inhalte ausgeben.

## Spaeteres GA4/GTM-Mapping

Falls spaeter GA4 oder GTM angebunden wird, kann ohne Code-Duplikation gemappt werden:

- `seo_cta_click` -> GA4 `generate_lead` oder `select_content` mit `service`, `city`, `page_intent`, `priority`, `cta_label`.
- `seo_lead_submit_attempt` -> GA4 `form_start` oder `form_submit_attempt`.
- `seo_lead_submit_success` -> GA4 `generate_lead`.
- `seo_lead_submit_error` -> GA4 `form_error`.
- `seo_phone_click` und `seo_email_click` -> GA4 `contact`.

Diese Zuordnung ist nur eine Empfehlung. In dieser Runde wurde kein GA4, GTM oder anderer externer Trackingdienst eingebaut.
