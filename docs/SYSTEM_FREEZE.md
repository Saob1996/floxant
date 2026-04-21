# FLOXANT System Freeze Regeln

Definition der stabilen Projektbereiche zur Sicherung der Produktions-Integrität.

## 1. Stabile Bereiche (Locked)
Diese Komponenten sind final abgenommen und dürfen ohne neue Projektphase nicht verändert werden:
- **Kalkulations-Engine**: Mathematische Formeln und Preis-Signale.
- **Root-Routing**: Die URL-Struktur der Website und der API-Endpunkte.
- **Regional-Cluster**: Die Landingpages für Regensburg und Bayern (April 2026 Stand).
- **Snapshot-Logik**: Die Architektur zur revisionssicheren Speicherung von Dokumenten.

## 2. Erlaubte Änderungen (Hotfix Only)
Nur folgende Änderungen sind im Live-Betrieb zulässig:
- Behebung von 500er Server-Fehlern.
- Korrektur von kritischen DSGVO- oder Sicherheitslücken.
- Fixes für blockierte Lead-Übertragungen.

## 3. Definition Neue Phase
Neue Features (z.B. neue Service-Typen, Design-Redesigns oder CRM-Integrationen) sowie **weitere räumliche Seitenexpansionen** gelten als Erweiterungen und erfordern eine neue Planungs- und Entwicklungsphase. Der aktuelle Stand (Hub Regensburg / B2B Bayern) gilt als produktiv konsolidiert.
