import { NextResponse } from 'next/server';
import { getDormantLeads, processReactivationHooks } from '@/lib/lead-reactivation';
/**
 * Phase 5 Serverless Cron Automation.
 * Vercel invokes this automatically daily via vercel.json cron configs.
 */
export async function GET(request: Request) {
 // 1. Verify cron secret to prevent unauthorized execution
 const authHeader = request.headers.get('authorization');
 if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV !== 'development') {
  return new NextResponse('Unauthorized', { status: 401 });
 }
 try {
  // Stage 1: Lead Reactivation Engine
  const dormantLeads = await getDormantLeads();
  const hooksFired = await processReactivationHooks(dormantLeads);
  // Stage 2: Content Generation Trigger 
  // In production, the content-engine.ts module will be evaluated here.
  return NextResponse.json({ 
   success: true, 
   hooksFired,
   timestamp: new Date().toISOString()
  });
 } catch (error) {
  return NextResponse.json({ success: false, error: 'Daily cron execution failed' }, { status: 500 });
 }
}
