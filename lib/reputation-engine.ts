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
 * Handles incoming feedback without review gating.
 * Every rating is treated as useful quality feedback; public review links must
 * never depend on whether a rating is positive or critical.
 */
export async function processReviewWorkflow(submission: ReviewSubmission): Promise<string> {
 // In production: Save rating and feedback to the feedback table for QA follow-up.
 console.log(`[Reputation Engine] Feedback received for lead ${submission.leadId}: ${submission.rating} stars.`);
 return "/feedback";
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
