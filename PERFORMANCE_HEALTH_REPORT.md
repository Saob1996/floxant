# Performance Health Report

Generated: 2026-08-28T23:33:33.168Z

Status: PASS

## Summary

- Source files scanned: 817
- Client files: 128
- Internal/admin client files: 12
- Public-path client files: 116
- Golden-set import graph client files: 44
- Client API fetch files: 35
- Public assets: 34 files / 3454.7 KB
- Assets over 512 KB: 0
- Assets over 1024 KB: 0
- Files with image usage: 33

## Checks

| Status | Check | Detail | File |
| --- | --- | --- | --- |
| PASS | Vercel image optimization | images.unoptimized bleibt true. | next.config.js |
| PASS | Public page runtime | Keine runtime=nodejs/force-dynamic/revalidate Treffer auf public pages. | - |
| PASS | No vitals/conversion API | Keine /api/vitals, /api/conversion-events oder sendBeacon Treffer. | - |
| INFO | Golden client budget | 44 Client-Dateien im Golden-Set-Importgraph gefunden. | - |
| INFO | Repository client inventory | 128 Client-Dateien repo-weit; 12 intern/admin, 116 public-path. | - |

## Largest Public Assets

| KB | File |
| ---: | --- |
| 333.3 | `public/uploads/1770296622700_image006.png` |
| 316.5 | `public/favicon.ico` |
| 291 | `public/assets/floxant-hero-neu-gedacht.png` |
| 288.3 | `public/assets/service-clearance.png` |
| 263.9 | `public/assets/diskret-service-hero.png` |
| 224.8 | `public/assets/service-cleaning.png` |
| 194.4 | `public/assets/service-moving.png` |
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
| yes | `components/BackhaulOffersBoard.tsx` |
| yes | `components/BudgetContactForm.tsx` |
| yes | `components/BusinessDisposalForm.tsx` |
| yes | `components/calculator/LeadCaptureForm.tsx` |
| yes | `components/calculator/LeadClosing.tsx` |
| yes | `components/CellarTrashroomRescueForm.tsx` |
| yes | `components/CheaperAlternativeForm.tsx` |
| yes | `components/CommercialCleaningLeadForm.tsx` |
| yes | `components/DamageControlForm.tsx` |
| unknown | `components/dashboard/AdminHealthControl.tsx` |
| unknown | `components/dashboard/BookingDetailView.tsx` |
| unknown | `components/dashboard/documents/DocumentSystemClient.tsx` |
| unknown | `components/dashboard/OperationsControlPanel.tsx` |
| yes | `components/DiscreetMoveForm.tsx` |
| yes | `components/DuesseldorfB2BCleaningForm.tsx` |
| yes | `components/english/EnglishRequestForm.tsx` |
| yes | `components/EstateClearanceForm.tsx` |
| yes | `components/HandoverFileForm.tsx` |
| yes | `components/inquiry/InquiryIntentModal.tsx` |
| yes | `components/OfferCheckForm.tsx` |
| yes | `components/OfferComparisonAdsForm.tsx` |
| yes | `components/PlanBServiceForm.tsx` |
| yes | `components/PlatformOrderCheckForm.tsx` |
| yes | `components/PrivateClientInquiryForm.tsx` |
| yes | `components/PropertyReadyForm.tsx` |
| yes | `components/QuickBudgetModal.tsx` |
| yes | `components/QuickExpressModal.tsx` |
| yes | `components/RealtorLandlordLinkForm.tsx` |
| yes | `components/ReferralPartnerCodeForm.tsx` |
| yes | `components/RegensburgApartmentCleaningForm.tsx` |
| yes | `components/RentalReadyForm.tsx` |
| yes | `components/ReturnTripBoardForm.tsx` |
| yes | `components/SeoLeadForm.tsx` |
| yes | `components/SmartBookingWizard.tsx` |
| yes | `components/TenantTurnoverForm.tsx` |

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
| `components/ProfessionalRequestForm.tsx` |
| `components/PublicHeader.tsx` |
| `components/RegionalRouteNotice.tsx` |
| `components/SeoLeadForm.tsx` |
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
| `components/english/EnglishHeader.tsx` |
| `components/layout/SiteChrome.tsx` |
| `components/trust/LiveActivityFeed.tsx` |
| `components/trust/TrustBadge.tsx` |
| `components/trust/TrustBlock.tsx` |
| `components/ui/Magnetic.tsx` |

## Recommendations

- Keep image optimization disabled on Vercel.
- Treat repository-wide client count as inventory; release budget is based on the Golden-set import graph.
- Convert oversized PNG hero assets to smaller WebP/AVIF in a dedicated asset sprint if future assets exceed 512 KB.
- Keep automatic dwell/fetch patch tracking disabled; prefer explicit user action or form-success custom events.
- Keep API work on real submit only.
