# Dependency Security Release Audit – 11.08.2026

## Ergebnis

`npm audit --json` meldet sieben Findings: ein niedriges und sechs hohe. `npm audit --omit=dev --json` meldet vier hohe Findings und keine kritischen Findings. Im veröffentlichten statischen Cloudflare-Modell ist keines der hohen Findings als ausnutzbare Runtime-Schwachstelle nachgewiesen.

Die Website wird als statischer Next.js-Export veröffentlicht. Es gibt keine Next.js-Serverless-Function, kein Middleware-Runtime-Bundle und keine Next-Image-Optimierung. Die transitiven Pakete `nanoid`, `postcss` und `sharp` unter `next` werden deshalb nur während des Builds verwendet und nicht als öffentlich erreichbare Server-Runtime deployed. Die Cloudflare-API-Funktionen bestehen aus separatem JavaScript und importieren diese Pakete nicht. Das Lockfile ist gegenüber dem verifizierten Produktionscommit `88ea736f` unverändert; dieser Release fügt keine betroffene Dependency-Version hinzu.

## Klassifikation

| Paket | Schwere | Abhängigkeit | Direkt/transitiv | Runtime/dev-only | Im statischen Cloudflare-Modell ausnutzbar | Update | Breaking-Risiko | Entscheidung |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `@babel/core` 7.29.0 | low | dev | transitiv | dev-only | nein; betrifft lokale Source-Map-Verarbeitung | verfügbar | niedrig bis mittel | Nach Release kontrolliert aktualisieren |
| `brace-expansion` | high | dev | transitiv | dev-only | nein; keine untrusted Glob-Eingabe in der Production-Runtime | verfügbar | niedrig bis mittel | Nach Release kontrolliert aktualisieren |
| `js-yaml` | high | dev | transitiv | dev-only | nein; kein YAML-Parser in der Production-Runtime | verfügbar | niedrig bis mittel | Nach Release kontrolliert aktualisieren |
| `nanoid` 3.3.16 unter `postcss` | high | production manifest | transitiv | build-only | nein; die Buildkette ruft `nanoid(6)` auf und verwendet keinen angreiferkontrollierten Generator mit Länge null | nur über kontrolliertes Toolchain-Update | mittel | Separat mit Next/PostCSS aktualisieren |
| `next` 16.2.12 | high | production manifest | direkt | Build-Framework; keine Next-Runtime deployed | nein, soweit im aktuellen Exportmodell geprüft | npm schlägt einen fachlich unbrauchbaren Breaking-Downgrade vor | sehr hoch | Kein `--force`; separates Next-Sicherheitsupdate |
| `postcss` 8.4.31 unter `next` | high | production manifest | transitiv | build-only | nein; das direkte Projektpaket ist 8.5.23, das verwundbare Paket wird nicht deployed | nur über kontrolliertes Next-Update | hoch | Separat mit Next aktualisieren |
| `sharp` 0.34.5 unter `next` | high | production manifest | transitiv | build-only | nein; Bilder sind `unoptimized`, das direkte Projektpaket ist 0.35.3 | nur über kontrolliertes Next-Update | hoch | Separat mit Next aktualisieren |

## Besonders geprüfte Pakete

- React, Supabase und Resend: kein eigenes Critical-/High-Finding im Audit.
- Direkte PostCSS-Version 8.5.23 und direkte Sharp-Version 0.35.3: nicht als betroffen gemeldet.
- ZIP-/CSV-Verarbeitung, Markdown- und Suchbibliotheken: kein Critical-/High-Finding im Audit.
- Keine Dependency wurde mit `npm audit fix --force` verändert.

## Release-Entscheidung

Runtime Critical: 0. Runtime High mit nachgewiesener Ausnutzbarkeit: 0. Die vier als Production-Abhängigkeiten gezählten High-Findings liegen in der Build-Toolchain von Next.js und blockieren diesen statischen Release nicht. Ein kontrolliertes Next-/Lockfile-Sicherheitsupdate bleibt eine getrennte manuelle Aufgabe und muss den vollständigen Build-, Cloudflare- und Lighthouse-Gate erneut durchlaufen.
