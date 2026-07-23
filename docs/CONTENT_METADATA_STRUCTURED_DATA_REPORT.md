# FLOXANT Content Metadata and Structured Data Report

Stand: 2026-06-19

## Geaenderte Inhalte

- Neue dynamische Blogartikel in `lib/offer-check-blog-articles.ts`
- FAQ-Bibliothek in `lib/faqs.ts`
- Service-FAQ-Routing in `lib/service-faqs.ts`
- FAQ-Komponenten in `components/FaqSection.tsx`, `components/ServiceFaq.tsx`, `components/LocationFaq.tsx`, `components/SignatureServiceFaq.tsx`
- Blog-Template mit verwandten Ratgeberlinks in `components/blog/BlogSupportBlocks.tsx` und `components/blog/BlogArticlePage.tsx`
- Standort-Hubs `/duesseldorf` und `/regensburg` mit sichtbarer Standort-FAQ und explizitem AiAnswerBlock.
- `/duesseldorf/gewerbereinigung` mit explizitem AiAnswerBlock und auf 8 sichtbare FAQ-Fragen begrenztem FAQPage-Schema.

## Metadata

- Dynamische Blogartikel nutzen weiter `app/blog/[slug]/page.tsx` und `generatePageSEO`.
- Neue Artikel enthalten `title`, `metaTitle`, `description`, `datePublished`, `about`, `keywords` und CTAs.
- Keine neuen statischen Stadtseiten wurden erstellt.
- Keine erfundenen Adressen, Telefonnummern, Oeffnungszeiten, Bewertungen oder Garantien wurden ergaenzt.

## Structured Data

- Dynamische Blogartikel laufen weiter ueber `StrategicBlogArticleRoute`.
- Article/BlogPosting Schema wird nur fuer echte Artikel erzeugt.
- FAQPage Schema wird aus sichtbaren `faqItems` gebaut.
- `/angebot-guenstiger-pruefen` und `/angebotscheck` wurden fuer sichtbare FAQ/FAQPage auf maximal 8 Fragen begrenzt.
- `/duesseldorf`, `/regensburg` und `/duesseldorf/gewerbereinigung` geben FAQPage Schema nur zusammen mit sichtbaren FAQ-Abschnitten aus.
- Neue FAQ-Komponenten koennen JSON-LD optional ausgeben, default ist `includeJsonLd=false`, um doppelte FAQ-Schemas zu vermeiden.

## Sitemap und Indexierung

- Neue Blogartikel werden ueber `generateStaticParams()` aus `offerCheckBlogArticles` generiert.
- Der Blog-Hub importiert `offerCheckBlogArticles` ueber `lib/blog-posts.ts`; neue Artikel erscheinen ohne separate Page-Dateien.
- Keine Docs, API-, Dashboard-, Login- oder Admin-Routen wurden fuer Indexierung ergaenzt.

## Safety

- Keine neuen `revalidate`-, `runtime = "nodejs"`- oder `dynamic = "force-dynamic"`-Exports.
- Keine automatischen POSTs, keine neuen Trackingdienste.
- Keine Supabase-, Resend-, PDF- oder sharp-Aufrufe auf normalen Public-Seiten.
- Lead-API bleibt nur bei echtem Formular-Submit relevant.
