// Phase 5: Automated Lead Reactivation Engine

export interface LeadProfile {
 id: string;
 quality: 'HOT' | 'WARM' | 'OLD';
 hoursSinceQuote: number;
 reactivationStatus: string;
}

/**
 * Sweeps the CRM database to identify leads dropping out of the pipeline.
 * MOCKED: In production, this runs actual Supabase queries against leads_extended.
 */
export async function getDormantLeads(): Promise<LeadProfile[]> {
 return [
  { id: 'lead-1', quality: 'HOT', hoursSinceQuote: 25, reactivationStatus: 'none' },
  { id: 'lead-2', quality: 'WARM', hoursSinceQuote: 50, reactivationStatus: 'none' },
  { id: 'lead-3', quality: 'OLD', hoursSinceQuote: 400, reactivationStatus: 'none' },
 ];
}

/**
 * Fires the appropriate psychological hook via email/webhook based on the segmentation.
 * This function is completely autonomous.
 */
export async function processReactivationHooks(leads: LeadProfile[]): Promise<number> {
 let hooksSent = 0;

 for (const lead of leads) {
  if (lead.quality === 'HOT' && lead.hoursSinceQuote >= 24 && lead.reactivationStatus !== 'hook_sent') {
   // Send 5% Priority Hook (e.g., via Brevo integration)
   console.log(`[Reactivation] Sending 5% Discount Hook to HOT Lead ${lead.id}`);
   hooksSent++;
  } 
  else if (lead.quality === 'WARM' && lead.hoursSinceQuote >= 48 && lead.reactivationStatus !== 'social_proof_sent') {
   // Send Case Study / Social Proof to warm them back up
   console.log(`[Reactivation] Sending Social Proof Payload to WARM Lead ${lead.id}`);
   hooksSent++;
  }
  // "OLD" leads get scanned once every 14 days (336 hours)
  else if (lead.quality === 'OLD' && lead.hoursSinceQuote > 336 && lead.reactivationStatus !== 'recovered') {
   // Re-anchor them
   console.log(`[Reactivation] Sending "Preise haben sich geändert" Hook to OLD Lead ${lead.id}`);
   hooksSent++;
  }
 }

 // In production, update Supabase: lead.reactivation_status = 'hook_sent' etc.
 return hooksSent;
}
