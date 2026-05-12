# FLOXANT Bing Webmaster Actions

Stand: 2026-05-11

## 1. IndexNow einrichten

Bing meldet, dass IndexNow noch nicht aktiv genutzt wird. Der Code ist vorbereitet:

- Key-Datei: `https://www.floxant.de/indexnow-key.txt`
- Submit-Endpoint intern: `https://www.floxant.de/api/indexnow`
- Environment Variable: `INDEXNOW_KEY`
- Optionaler Schutz für manuelles Senden: `INDEXNOW_SUBMIT_SECRET`

Vercel setzen:

```txt
INDEXNOW_KEY=<Bing-IndexNow-Key>
INDEXNOW_SUBMIT_SECRET=<frei gewähltes internes Secret>
```

Danach Deployment ausführen und in Bing Webmaster Tools IndexNow erneut prüfen.

Manuelles URL-Senden nach Deployment:

```bash
curl -X POST https://www.floxant.de/api/indexnow \
  -H "content-type: application/json" \
  -H "x-indexnow-secret: <INDEXNOW_SUBMIT_SECRET>" \
  -d "{\"urls\":[\"https://www.floxant.de/\",\"https://www.floxant.de/umzug-regensburg\"]}"
```

Wichtig: Der Endpoint akzeptiert nur `https://www.floxant.de/...` URLs. Kundendaten, Angebotsinhalte und interne Dashboard-URLs dürfen nie gesendet werden.

## 2. Identische Titles und Meta Descriptions

Bing meldet viele ähnliche Titel und Beschreibungen. Zentrale Verbesserung:

- Ortsseiten für `Umzug`, `Reinigung`, `Entrümpelung`, `Büroumzug` und `Wohnungsauflösung` nutzen jetzt mehrere deterministische Title- und Description-Varianten.
- Jede Beschreibung enthält Stadt, Service, konkrete Prüfkriterien und eine klare Anfrageabsicht.
- Beschreibungen sind länger und klickstärker formuliert, ohne Fake-Standorte oder falsche Garantien.

Diese Verbesserung wirkt vor allem auf viele Stadt-/Ortsseiten, die vorher zu ähnlich wirkten.

## 3. Eingehende Links

Das kann Code allein nicht lösen. Empfohlene echte Quellen:

- Google Business Profile regelmäßig mit Serviceposts verlinken.
- Bing Places vollständig pflegen.
- Branchenprofile mit konsistentem NAP: Firmenname, Telefon, Website, Regensburg-Adresse.
- Lokale Partnerseiten: Makler, Hausverwaltungen, Gewerbepartner, regionale Verzeichnisse.
- Keine gekauften Spamlinks.

Priorität:

1. Bing Places und Google Business Profile vollständig.
2. 5 bis 10 echte lokale Partner-/Branchenprofile.
3. Inhalte mit klaren Service-URLs verlinken, nicht nur Startseite.

## 4. Nachkontrolle

In Bing Webmaster Tools prüfen:

- IndexNow nach Deployment erneut prüfen.
- Titel-/Meta-Warnungen nach 7 bis 21 Tagen erneut prüfen.
- Neue Sitemap erneut senden.
- Alte Sprach- und falsche Düsseldorf-Umzugs-URLs als entfernt beobachten.
