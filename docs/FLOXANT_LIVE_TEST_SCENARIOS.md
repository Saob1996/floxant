# FLOXANT Live Test Scenarios

Ziel: Nach Deployment echte Conversion-Pfade pruefen, ohne SEO-Struktur zu veraendern.

## 1. Google Maps Lead

1. `https://floxant.de/buchung?utm_source=google_business_profile&utm_medium=organic_local&utm_campaign=gbp_booking&utm_content=regensburg_main#buchungssystem` oeffnen.
2. Service waehlen, Ort/PLZ, Termin, Kontakt und optional Budget ausfuellen.
3. Anfrage senden.
4. Dashboard pruefen: Quelle `Google Maps Buchung`, UTM sichtbar, Lead-Score vorhanden.

## 2. Google Ads Reinigung Regensburg

1. `https://floxant.de/reinigung-regensburg?utm_source=google_ads&utm_medium=cpc&utm_campaign=reinigung_regensburg&utm_content=endreinigung#anfrage` oeffnen.
2. Reinigung anfragen oder zur Buchung wechseln.
3. Dashboard pruefen: Quelle `Google Ads Reinigung`, Service Reinigung, Region Regensburg/Bayern.

## 3. Premium Lead

1. `/private-client-service` oeffnen.
2. Premium-/Rueckruf-Anfrage mit Zusatzservices senden.
3. Dashboard pruefen: Quelle Premium/Private Client, hoher Score, naechste Aktion sichtbar.

## 4. Leerfahrt/Rueckfahrt

1. `/leerfahrt-rueckfahrt` oeffnen.
2. Strecke, Datum, Flexibilitaet, Umfang und Kontakt senden.
3. Dashboard pruefen: Quelle Rueckfahrt, Filter `Rueckfahrt`, Strecke sichtbar.

## 5. Duesseldorf Reinigung Privat

1. `/buchung?service=reinigung&region=duesseldorf&utm_source=google_business_profile&utm_medium=organic_local&utm_campaign=gbp_booking&utm_content=duesseldorf_cleaning#buchungssystem` oeffnen.
2. Wohnungsreinigung oder Endreinigung anfragen.
3. Dashboard pruefen: Duesseldorf Reinigung, kein Umzug, kein Bayern-Kontext.

## 6. Duesseldorf Reinigung B2B

1. `/duesseldorf/reinigung` oeffnen.
2. B2B-Reinigung mit Objektart, Flaeche/Frequenz und Kontakt anfragen.
3. Dashboard pruefen: B2B-Reinigung oder Duesseldorf Reinigung, Objekt/Flaeche sichtbar.

## 7. Duesseldorf Entsorgung

1. `/entsorgung-duesseldorf` oeffnen.
2. Umfang, Etage/Zugang, Fotos und Budget senden.
3. Dashboard pruefen: Duesseldorf Entsorgung, keine Umzug-Zuordnung.

## 8. Pflichtfeld-Fehler

1. Buchung ohne Telefon/E-Mail oder ohne Pflichtangaben absenden.
2. Erwartung: menschliche Fehlermeldung, keine technischen Rohfehler, kein doppelter Submit.

## 9. Upload-Fehler

1. Zu grosse oder falsche Datei hochladen.
2. Erwartung: Upload wird abgelehnt oder verstaendlich behandelt, Formular bleibt nutzbar.

## 10. Mobile Smoke Test

1. Hauptflows auf Smartphone-Breite pruefen.
2. Erwartung: CTA sichtbar, Formular bedienbar, Tap Targets ausreichend, keine kaputten Tabellen.
