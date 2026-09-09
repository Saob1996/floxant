import { ArrowUpRight, MapPin } from "lucide-react";
import { floxantLocations, type FloxantLocationKey } from "@/lib/floxant-locations";
import { googleReviewProfiles } from "@/lib/google-reviews";
import { RatingStars } from "@/components/RatingStars";

const formatRating = (rating: number, english = false) => rating.toLocaleString(english ? "en-GB" : "de-DE", { minimumFractionDigits: 1 });

export function GoogleReviewSummary() {
  return <div aria-label="Google-Bewertungen unserer Standorte" className="mt-7 grid max-w-2xl gap-4 sm:grid-cols-2">
    {(["duesseldorf", "regensburg"] as const).map((key) => {
      const review = googleReviewProfiles[key];
      if (review.average === null || review.total === null) return null;
      return <div key={key} data-review-summary={key} className="border-t border-white/25 pt-4">
        <p className="text-sm font-bold">{floxantLocations[key].city} · Google</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <RatingStars rating={review.average} compact />
          <p className="text-sm text-slate-100"><strong>{formatRating(review.average)} von 5</strong> · {review.total} Rezensionen</p>
        </div>
        <a href={`#google-bewertungen-${key}`} className="mt-1 inline-flex min-h-11 items-center rounded text-sm font-bold text-cyan-200 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">Bewertungen lesen<span className="sr-only"> – {floxantLocations[key].city}</span></a>
      </div>;
    })}
  </div>;
}

export function GoogleReviews({ location, english = false }: { location?: FloxantLocationKey; english?: boolean }) {
  const order: FloxantLocationKey[] = location === "regensburg" ? ["regensburg", "duesseldorf"] : ["duesseldorf", "regensburg"];
  return (
    <section id="google-bewertungen" className="border-t border-slate-200 bg-slate-50 px-5 py-12 text-slate-950 sm:px-8 lg:px-10" aria-labelledby="google-reviews-title">
      <div className="mx-auto max-w-7xl">
        <h2 id="google-reviews-title" className="text-2xl font-black tracking-tight sm:text-3xl">{english ? "Customer reviews on Google" : "Kundenbewertungen auf Google"}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{english ? "Read customer experiences for each FLOXANT location." : "Lesen Sie die Erfahrungen unserer Kunden zum jeweiligen FLOXANT Standort."}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {order.map((key) => {
            const place = floxantLocations[key];
            const review = googleReviewProfiles[key];
            const verified = review.average !== null && review.total !== null && review.profileUrl;
            return <article key={key} id={`google-bewertungen-${key}`} data-review-location={key} className={`scroll-mt-32 rounded-xl border bg-white p-6 sm:p-8 ${location === key ? "border-blue-600 ring-1 ring-blue-600" : "border-slate-200"}`}>
              <h3 className="flex items-center gap-2 text-xl font-black"><MapPin className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />{place.displayName}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{place.addressLine1}, {place.postalCode} {place.city}</p>
              {verified ? <>
                <div className="mt-6"><RatingStars rating={review.average!} /></div>
                <p className="mt-3 text-4xl font-black tabular-nums">{formatRating(review.average!, english)}<span className="text-base font-semibold text-slate-600"> {english ? "out of 5" : "von 5"}</span></p>
                <p className="mt-1 font-semibold text-slate-700">{review.total} {english ? "Google reviews" : "Google-Rezensionen"}</p>
              </> : <p className="mt-5 text-base leading-7 text-slate-700">{english ? "Ask us about this location and share your experience." : "Sprechen Sie uns zu diesem Standort an und teilen Sie Ihre Erfahrung."}</p>}
              {review.profileUrl ? <a href={review.reviewsUrl || review.profileUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-blue-700 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4">
                {english ? "All reviews on Google" : "Alle Bewertungen auf Google"}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a> : <a href={place.localLandingPage} className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-blue-800 underline underline-offset-4">{english ? "View location and contact" : "Standort und Kontakt ansehen"}</a>}
              {review.writeReviewUrl ? <a href={review.writeReviewUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center rounded text-sm font-semibold text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{english ? "Share your experience" : "Eigene Erfahrung teilen"}</a> : null}
              {review.profileUrl ? <p className="mt-4 text-xs leading-5 text-slate-600">{english ? "Source: Google business profile. Manually checked on " : "Quelle: Google-Unternehmensprofil. Manuell geprüft am "}<time dateTime={review.checkedOn}>{new Date(`${review.checkedOn}T12:00:00Z`).toLocaleDateString(english ? "en-GB" : "de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })}</time>. {english ? "No live update." : "Kein Live-Abgleich."}</p> : null}
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
