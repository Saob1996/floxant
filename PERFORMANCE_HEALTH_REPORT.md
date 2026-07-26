# Performance Health Report

Generated: 2026-07-26T11:16:40.648Z

Status: PASS

## Summary

- Source files scanned: 837
- Client files: 130
- Internal/admin client files: 12
- Public-path client files: 118
- Golden-set import graph client files: 50
- Client API fetch files: 4
- Public assets: 34 files / 3269.1 KB
- Assets over 512 KB: 0
- Assets over 1024 KB: 0
- Files with image usage: 34

## Checks

| Status | Check | Detail | File |
| --- | --- | --- | --- |
| PASS | Vercel image optimization | images.unoptimized bleibt true. | next.config.js |
| PASS | Public page runtime | Keine runtime=nodejs/force-dynamic/revalidate Treffer auf public pages. | - |
| PASS | No vitals/conversion API | Keine /api/vitals, /api/conversion-events oder sendBeacon Treffer. | - |
| INFO | Golden client budget | 50 Client-Dateien im Golden-Set-Importgraph gefunden. | - |
| INFO | Repository client inventory | 130 Client-Dateien repo-weit; 12 intern/admin, 118 public-path. | - |

## Largest Public Assets

| KB | File |
| ---: | --- |
| 316.5 | `public/favicon.ico` |
| 291 | `public/assets/floxant-hero-neu-gedacht.png` |
| 288.3 | `public/assets/service-clearance.png` |
| 263.9 | `public/assets/diskret-service-hero.png` |
| 224.8 | `public/assets/service-cleaning.png` |
| 194.4 | `public/assets/service-moving.png` |
| 147.3 | `public/search-index.json` |
| 128.7 | `public/assets/property-operations/urlaubsretter.png` |
| 127.8 | `public/assets/property-operations/objekt-springer.png` |
| 122.4 | `public/assets/service-clearance.webp` |
| 117.3 | `public/assets/floxant-hero-neu-gedacht.webp` |
| 109.4 | `public/assets/property-operations/airbnb-turnover-express.png` |
| 104.9 | `public/assets/property-operations/human-api.png` |
| 85.1 | `public/assets/property-operations/business-errand-service.png` |
| 84.5 | `public/assets/property-operations/property-operations.png` |
| 83.3 | `public/assets/property-operations/leerstandsmanagement.png` |
| 82.4 | `public/assets/gewerbereinigung/gewerbliche-reinigung-regensburg-hero.webp` |
| 76.1 | `public/assets/service-moving.webp` |
| 75.2 | `public/assets/gewerbereinigung/reinigungsanfrage-checkliste-regensburg.webp` |
| 70.8 | `public/assets/gewerbereinigung/schluessel-treppenhausreinigung-regensburg.webp` |

## Client API Fetch Files

| Submit-bound likely | File |
| --- | --- |
| unknown | `components/dashboard/AdminHealthControl.tsx` |
| unknown | `components/dashboard/BookingDetailView.tsx` |
| unknown | `components/dashboard/documents/DocumentSystemClient.tsx` |
| unknown | `components/dashboard/OperationsControlPanel.tsx` |

## Golden-Set Client Files

| File |
| --- |
| `components/ContactQueryPersonalization.tsx` |
| `components/ConversionEventReporter.tsx` |
| `components/CookieBanner.tsx` |
| `components/DeferredSiteWidgets.tsx` |
| `components/FloxNavigation.tsx` |
| `components/FloxServicesMegaMenu.tsx` |
| `components/Footer.tsx` |
| `components/GlobalRequestCenter.tsx` |
| `components/GoogleAdsTag.tsx` |
| `components/MotionProvider.tsx` |
| `components/OfferComparisonAdsForm.tsx` |
| `components/OfferComparisonAdsTracker.tsx` |
| `components/PublicHeader.tsx` |
| `components/RegionalRouteNotice.tsx` |
| `components/SeoLeadForm.tsx` |
| `components/SmartBookingWizard.tsx` |
| `components/UploadDropCard.tsx` |
| `components/UtmCapture.tsx` |
| `components/calculator/AdvancedCalculator.tsx` |
| `components/calculator/DualCalculator.tsx` |
| `components/calculator/ExitIntentModal.tsx` |
| `components/calculator/ExpertTooltip.tsx` |
| `components/calculator/ExpressCalculator.tsx` |
| `components/calculator/LeadClosing.tsx` |
| `components/calculator/ModeSelection.tsx` |
| `components/calculator/VolumeIndicator.tsx` |
| `components/calculator/elite/CleaningEliteCalculator.tsx` |
| `components/calculator/elite/MovingEliteCalculator.tsx` |
| `components/calculator/forms/ArchiveForm.tsx` |
| `components/calculator/forms/BueroumzugForm.tsx` |
| `components/calculator/forms/EntsorgungForm.tsx` |
| `components/calculator/forms/PaintingForm.tsx` |
| `components/calculator/forms/PianoForm.tsx` |
| `components/calculator/forms/ReinigungForm.tsx` |
| `components/calculator/forms/StorageForm.tsx` |
| `components/calculator/forms/UmzugForm.tsx` |
| `components/calculator/standalone/FloxEntsorgungRechner.tsx` |
| `components/calculator/standalone/FloxReinigungRechner.tsx` |
| `components/calculator/standalone/FloxUmzugRechner.tsx` |
| `components/dominance/DuesseldorfCleaningPlanner.tsx` |
| `components/dominance/HomepageRequestPlanner.tsx` |
| `components/editorial/FaqAccordion.tsx` |
| `components/english/EnglishHeader.tsx` |
| `components/layout/SiteChrome.tsx` |
| `components/search/HeaderSearch.tsx` |
| `components/trust/LiveActivityFeed.tsx` |
| `components/trust/TrustBadge.tsx` |
| `components/trust/TrustBlock.tsx` |
| `components/ui/Magnetic.tsx` |
| `components/ui/PremiumButton.tsx` |

## Recommendations

- Keep image optimization disabled on Vercel.
- Treat repository-wide client count as inventory; release budget is based on the Golden-set import graph.
- Convert oversized PNG hero assets to smaller WebP/AVIF in a dedicated asset sprint if future assets exceed 512 KB.
- Keep automatic dwell/fetch patch tracking disabled; prefer explicit user action or form-success custom events.
- Keep API work on real submit only.
