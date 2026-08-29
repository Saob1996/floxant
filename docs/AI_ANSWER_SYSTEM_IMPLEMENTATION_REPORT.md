# Deterministisches Antwortsystem – Implementierungsbericht

Stand: 29. August 2026

Das Projekt verwendet für öffentliche Serviceantworten keine bezahlte Modell-API. Die Antworten sind kuratiert und deterministisch. Dadurch entstehen keine neuen laufenden KI-Kosten und keine unkontrollierten Preis-, Termin- oder Leistungsbehauptungen.

## Abdeckung

23 Antwortdatensätze decken Angebotsprüfung, Düsseldorf Reinigung/Büro/Gewerbe/Praxis, Regensburg Umzug/Reinigung/Büro/Gewerbe, Klaviertransport, Entrümpelung, Grundreinigung, Seniorenumzug, Nachlass, Solar/PV, Rückfahrt/Beiladung, dringende Anfragen, Übergabe, Objektbrief, Diskret-Service, beide Regional-Hubs und englische Anfragen ab.

## Sicherheitslogik

Die Funktion `resolveDeterministicCustomerAnswer` erkennt Preisfragen, Dringlichkeit, widersprüchliche Städte, unbestätigte Orte, nicht bestätigte Leistungen und Gefahrstoff-/Qualifikationsfälle. Sie liefert Status, direkte Antwort, fehlende Angaben, nächsten Schritt, Sicherheitsflags und einen internen, möglichst vorausgefüllten CTA.

## Regressionstest

`npm run ai:answer-regression` prüft neun Gruppen: vollständige Registry, korrekte Regionalzuordnung, keine erfundenen Preise, unbestätigte Services, falsche Gebiete, erfundene Verfügbarkeit, fehlende Angaben, widersprüchliche Ortsnamen, Gefahrstoffe und Formularübergabe. Die vorhandenen sichtbaren Quick-Answer-Komponenten bleiben die UI-Schicht.
