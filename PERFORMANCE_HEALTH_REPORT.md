# Performance Health Report

Generated: 2026-06-20T03:42:04.671Z

Status: WARN

## Summary

- Source files scanned: 821
- Client files: 121
- Client API fetch files: 38
- Public assets: 29 files / 9142.4 KB
- Assets over 512 KB: 8
- Assets over 1024 KB: 1
- Files with image usage: 31

## Checks

| Status | Check | Detail | File |
| --- | --- | --- | --- |
| PASS | Vercel image optimization | images.unoptimized bleibt true. | next.config.js |
| PASS | Public page runtime | Keine runtime=nodejs/force-dynamic/revalidate Treffer auf public pages. | - |
| PASS | No vitals/conversion API | Keine /api/vitals, /api/conversion-events oder sendBeacon Treffer. | - |
| WARN | Client component budget | 121 Client-Dateien gefunden. | - |
| WARN | Large assets | 8 Assets ueber 512 KB gefunden. | - |

## Largest Public Assets

| KB | File |
| ---: | --- |
| 1824.4 | `public/assets/floxant-hero-neu-gedacht.png` |
| 839.5 | `public/assets/service-clearance.png` |
| 693.4 | `public/assets/service-moving.png` |
| 680.2 | `public/assets/sig-48h.png` |
| 628.2 | `public/assets/sig-clean.png` |
| 621.1 | `public/assets/service-cleaning.png` |
| 606.5 | `public/assets/sig-kit.png` |
| 592.3 | `public/assets/sig-ritual.png` |
| 412.2 | `public/og.jpg` |
| 333.3 | `public/uploads/1770296622700_image006.png` |
| 316.5 | `public/favicon.ico` |
| 316.5 | `public/icon.png` |
| 316.5 | `public/logo_v10.png` |
| 128.7 | `public/assets/property-operations/urlaubsretter.png` |
| 127.8 | `public/assets/property-operations/objekt-springer.png` |
| 109.4 | `public/assets/property-operations/airbnb-turnover-express.png` |
| 104.9 | `public/assets/property-operations/human-api.png` |
| 85.1 | `public/assets/property-operations/business-errand-service.png` |
| 84.5 | `public/assets/property-operations/property-operations.png` |
| 83.3 | `public/assets/property-operations/leerstandsmanagement.png` |

## Client API Fetch Files

| Submit-bound likely | File |
| --- | --- |
| yes | `app/dashboard/DashboardClient.tsx` |
| unknown | `app/dashboard/documents/[id]/page.tsx` |
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
| yes | `components/duesseldorf/DuesseldorfCleaningCalculator.tsx` |
| yes | `components/duesseldorf/GewerbereinigungAdsForm.tsx` |
| yes | `components/DuesseldorfApartmentCleaningForm.tsx` |
| yes | `components/DuesseldorfB2BCleaningForm.tsx` |
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
| yes | `components/RentalReadyForm.tsx` |
| yes | `components/ReturnTripBoardForm.tsx` |
| yes | `components/SeoLeadForm.tsx` |
| yes | `components/SmartBookingWizard.tsx` |
| yes | `components/TenantTurnoverForm.tsx` |

## Recommendations

- Keep image optimization disabled on Vercel.
- Convert oversized PNG hero assets to smaller WebP/AVIF in a dedicated asset sprint.
- Keep automatic dwell/fetch patch tracking disabled; prefer explicit user action or form-success custom events.
- Keep API work on real submit only.
