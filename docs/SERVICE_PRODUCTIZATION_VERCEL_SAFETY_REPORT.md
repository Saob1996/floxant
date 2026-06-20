# Service Productization Vercel Safety Report

Stand: 2026-06-19

## Status

PASS/WARN. In dieser Runde wurden keine neuen Public-Seiten mit `revalidate`, `dynamic = "force-dynamic"` oder `runtime = "nodejs"` erzeugt. Es wurden keine automatischen POSTs, keine neuen Trackingdienste und keine neuen schweren Dependencies hinzugefuegt.

## Gepruefte Risiken

| Risiko | Ergebnis |
| --- | --- |
| Public `revalidate` Rueckkehr | PASS fuer neue/angepasste Public-Dateien |
| Public `force-dynamic` Rueckkehr | PASS fuer neue/angepasste Public-Dateien |
| Public `runtime = "nodejs"` | PASS fuer neue/angepasste Public-Dateien |
| automatische `/api/vitals` POSTs | PASS, keine neue Nutzung |
| automatische `/api/conversion-events` POSTs | PASS, keine neue Nutzung |
| `sendBeacon` | PASS, keine neue Nutzung |
| Supabase beim normalen Seitenaufruf | PASS, keine neue Nutzung |
| Resend beim normalen Seitenaufruf | PASS, keine neue Nutzung |
| PDF/sharp beim normalen Seitenaufruf | PASS, keine neue Nutzung |
| Image Optimization | PASS, keine Reaktivierung |

## Treffer in der Repo-Suche

Die Suche findet bestehende Stellen in API-, Dashboard-, Mail- und Upload-Kontexten:

- `app/api/auth/[...nextauth]/route.ts` mit `runtime = 'nodejs'`
- `app/api/indexnow/route.ts` mit `force-dynamic`
- `app/api/pdf/[id]/route.tsx` und `app/api/bookings/route.ts` fuer PDF/Upload/sharp im API-Kontext
- `app/dashboard/**` mit dynamischen Dashboard-Seiten
- `lib/mail*.ts` und `lib/supabase*.ts` als bestehende Server-/Admin-Infrastruktur

Diese Treffer wurden in dieser Runde nicht neu eingefuehrt und betreffen nicht die neu angepassten Public-Hubs.

## Geaenderte Public-Dateien dieser Runde

- `app/kontakt/page.tsx`
- `app/duesseldorf/page.tsx`
- `app/regensburg/page.tsx`
- `app/signature-services/page.tsx`
- `app/spezialreinigung/page.tsx`
- `app/spezialumzug/page.tsx`
- `app/spezial-entruempelung/page.tsx`
- `components/ServiceFitAdvisor.tsx`

Keine dieser Dateien fuehrt neue API-Calls beim Seitenaufruf ein.

