// Phase 2 & 4: Pricing Intelligence Engine
import { getMarketAverages, determineStrategy, applyMarketStrategy, PricingStrategy } from './market-intelligence';

export interface IntelligenceContext {
 city?: string; // Phase 4
 timeConstraint: 'flexibel' | 'wochenende' | 'dringend' | string;
 loadFactor?: number; // Simulator of 'demand_load_at_quote' from DB
}

export interface TierResults {
 economy: number;
 balanced: number;
 premium: number;
 confidenceScore: 'low' | 'medium' | 'high';
 marketStrategyTriggered?: PricingStrategy; // Phase 4 feedback tag
}

/**
 * 1. MOCK: In production, this would `supabase.from('pricing_history').select...`
 * to calculate the real 30-day moving average per m2/m3.
 */
async function fetchMovingAverageMetrics(service: string): Promise<number> {
 // Simulated DB latency
 await new Promise(resolve => setTimeout(resolve, 50));
 
 if (service === 'umzug') return 8.5; // avg € per m2 from history
 if (service === 'reinigung') return 3.2; 
 if (service === 'entsorgung') return 48.0; // € per m3
 return 10;
}

/**
 * 2. Adaptive Multiplier Calculation
 */
export function calculateTimeMultiplier(constraint: string): number {
 switch (constraint) {
  case 'wochenende': return 1.25; // weekend premium
  case 'dringend': return 1.40;  // urgent premium
  default: return 1.0;
 }
}

/**
 * 3. Confidence Scorer
 * Uses heuristic logic simulating variance checks in historical data.
 */
export function calculateConfidence(service: string, size: number): 'low' | 'medium' | 'high' {
 if (service === 'umzug' && size > 200) return 'low'; // rare large moves have high variance
 if (service === 'reinigung' && size < 100) return 'high'; // common bounds
 return 'medium';
}

/**
 * 4. Master Engine: Generates the 3-Tier Prices
 * basePrice is passed from the existing calculator-engine core logic.
 */
export async function generateIntelligentTiers(
 service: string,
 calculatedBasePrice: number,
 context: IntelligenceContext,
 sizeMetric: number
): Promise<TierResults> {
 
 // Simulated intelligence: Adjusting the fixed calculated price by real-world load factors
 const demandLoad = context.loadFactor || 1.1; // e.g., 1.1x load means high demand right now
 const timeMod = calculateTimeMultiplier(context.timeConstraint);

 // Compute final optimized central price
 // Phase 2: Base * Load * Time
 const standardOptimized = calculatedBasePrice * demandLoad * timeMod;

 // Phase 4: Market Intelligence Override
 let optimizedCentralPrice = standardOptimized;
 let chosenStrategy: PricingStrategy = 'monopoly';
 
 if (context.city) {
  const marketDetails = await getMarketAverages(context.city, service, sizeMetric);
  chosenStrategy = determineStrategy(standardOptimized, marketDetails, context.timeConstraint);
  optimizedCentralPrice = applyMarketStrategy(standardOptimized, marketDetails.averagePrice, chosenStrategy);
 }

 const confidence = calculateConfidence(service, sizeMetric);

 // 5. Build Tiers
 // Economy: 15% cheaper, strict limits
 // Balanced: The optimized price
 // Premium: 30% higher, all-inclusive priority
 const economyPrice = Math.round(optimizedCentralPrice * 0.85);
 const balancedPrice = Math.round(optimizedCentralPrice);
 const premiumPrice = Math.round(optimizedCentralPrice * 1.30);

 return {
  economy: economyPrice,
  balanced: balancedPrice,
  premium: premiumPrice,
  confidenceScore: confidence,
  marketStrategyTriggered: chosenStrategy
 };
}
