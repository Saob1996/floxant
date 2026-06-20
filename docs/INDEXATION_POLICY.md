# Indexation Policy

| Seitenklasse | Indexierungsregel | Sitemap-Regel | Canonical-Regel | Interne Linkregel | Content-Mindestanforderung | Risiko |
| --- | --- | --- | --- | --- | --- | --- |
| Primary Money Page | index/follow | Tier 1 | Self-canonical | starke Hub-, Home- und Bloglinks | klare CTA, Trust, FAQ, sichtbarer Kundennutzen | Kannibalisierung durch Support-Seiten |
| Service Hub | index/follow | Tier 1 | Self-canonical | verlinkt lokale Money-Pages | Service-Überblick, keine lokale Konkurrenz | zu breit oder konkurrierend |
| Local Hub | index/follow | Tier 1 | Self-canonical | verlinkt lokale Services | Stadtlogik, echte Standort-/Einsatzlogik | Doorway-Risiko bei austauschbarem Text |
| Signature Service Page | index wenn eigenständig | Tier 2 | Self-canonical | von Service-/Trust-Kontext verlinken | klare Situation, keine Fake-Claims | unklare Suchnachfrage |
| Spezialservice Page | index wenn echter Service | Tier 2 | Self-canonical | von passenden Money-Pages | eigene Nachfrage und Scope | zu dünn oder nicht real bedient |
| Blog/Ratgeber | index wenn hilfreich | Tier 3 | Self-canonical oder Merge-Kandidat | zu Money-Page verlinken | Info-Intent, kein Kaufseiten-Ersatz | Konkurrenz zur Money-Page |
| Support Page | index optional | Tier 3 oder nicht | Self-canonical | kontextuell | hilft Entscheidung oder Vertrauen | niedrige Qualität |
| Duplicate/Weak Longtail Candidate | prüfen | nicht automatisch | Kandidat | schwach priorisieren | nur behalten, wenn differenziert | Cannibalization |
| Private/Internal/Admin/API | noindex/nicht öffentlich | nie | none | nicht von Public verlinken | keine Public-CTA | Sitemap-Leak |
| Legacy/Locale/Redirect | redirect/410/noindex | nie | kanonische Zielseite | nicht intern verlinken | nur Alt-Signal | Index-Leichen |
