// Phase 5: Reputation & Referral Loop Engine

export interface ReviewSubmission {
  leadId: string;
  rating: number;
  feedback?: string;
}

export interface ReferralPayload {
  leadId: string;
  referralCode: string;
  friendDiscount: number;
}

/**
 * Handles incoming ratings dynamically. 
 * If 4 or 5 stars -> Reroute strictly to Google Maps to boost SEO authority.
 * If 1, 2, or 3 stars -> Capture internally for QA, preventing public damage.
 */
export async function processReviewWorkflow(submission: ReviewSubmission): Promise<string> {
  const isPositive = submission.rating >= 4;

  if (isPositive) {
    // In production: Save `routed_to_google: true` to Supabase `reputation_feedback`
    console.log(`[Reputation Engine] 5-Star Rating. Rerouting Lead ${submission.leadId} directly to Google.`);
    return 'https://g.page/r/YOUR_GOOGLE_MAPS_LINK/review';
  } else {
    // In production: Save complaint internally `routed_to_google: false`
    console.log(`[Reputation Engine] Low Rating (${submission.rating} stars). Capturing internal feedback for Lead ${submission.leadId}.`);
    return '/de/angebote/umzug-kosten'; // Fallback redirect after submitting internal feedback
  }
}

/**
 * Generates a unique referral link for a successfully completed job
 * to incentivize network growth without manual sales intervention.
 */
export function generateReferralLink(leadId: string, customerName: string): ReferralPayload {
  const referralCode = `FLX-${customerName.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`;
  
  // In production: Insert into `referrals` DB table returning the full URL
  const friendDiscount = 5; // 5% discount for the friend

  return {
    leadId,
    referralCode,
    friendDiscount,
  };
}
