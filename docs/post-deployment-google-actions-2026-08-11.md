# Post-Deployment Google Actions – 11.08.2026

Diese Aufgaben beginnen erst nach erfolgreichem Production-Deployment und Live-Smoke-Test. Ohne autorisierte Search-Console- oder Business-Profile-Verbindung bleiben alle Punkte manuell.

1. [ ] Search Console öffnen und den letzten Abruf von `https://www.floxant.de/sitemap.xml` prüfen; nur bei tatsächlichem Bedarf erneut einreichen.
2. [ ] URL Inspection für `/duesseldorf/reinigung` ausführen und Live-Test, Indexierbarkeit und gewählten Canonical dokumentieren.
3. [ ] Für tatsächlich geänderte P0-Seiten nach erfolgreichem Live-Test einmalig Indexierung anfordern; keine Massenanfragen.
4. [ ] Beide Ads-Seiten live auf `noindex` prüfen und bestätigen, dass sie nicht in der Sitemap stehen.
5. [ ] Canonicals der P0-/P1-Seiten auf `www.floxant.de` und die jeweilige Primärroute prüfen; keine `pages.dev`-Canonicals.
6. [ ] Mobile Usability und Core-Web-Vitals-Berichte auf neue Fehler beziehungsweise ausreichende Felddaten prüfen.
7. [ ] Rich Results Test nur für unterstützte, tatsächlich vorhandene strukturierte Daten ausführen; kein FAQ-Rich-Result versprechen.
8. [ ] Google Business Profile Düsseldorf anhand von `docs/google-business-profile-customer-acquisition.md` manuell prüfen.
9. [ ] Google Business Profile Regensburg anhand derselben Checkliste manuell prüfen.
10. [ ] Neue echte Bewertungen sachlich beantworten; keine Bewertung erfinden oder verändern.
11. [ ] Nur echte, freigegebene Projektbilder ohne unnötige personenbezogene Daten ergänzen.
12. [ ] GSC-Baseline für den Zeitraum 12.07.2026 bis 08.08.2026 und den Deployment-Commit unveränderlich dokumentieren.
13. [ ] Mindestens 28 vollständige Tage keine weitere große Title-/Description-Runde auf derselben URL starten.
14. [ ] Nach 28 Tagen CTR, Klicks, Impressionen, Position und erfolgreiche Anfragen getrennt nach Seite und Gerät vergleichen; keine Garantie ableiten.

## Messgrenzen

- Query- und Seitenexport bleiben getrennte Aggregationen.
- Veränderungen werden nicht allein einem Title zugeschrieben, wenn Sichtbarkeit, Nachfrage oder Position gleichzeitig variieren.
- Rechner werden wegen geringer organischer Ausgangsdaten primär über Nutzung, Ergebnisverständlichkeit und erfolgreiche Übergabe bewertet.
- Ein technischer Fehler, eine falsche Canonical-/Indexierungsentscheidung oder eine Formularstörung löst sofortige Prüfung aus; ein normaler Performance-Schwankungswert allein nicht.
