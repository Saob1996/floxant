// Phase 4: Competitor Intelligence Engine

export type PricingStrategy = 'undercut' | 'match' | 'premium' | 'monopoly';

export interface MarketContext {
 averagePrice: number;
 minPrice: number;
 maxPrice: number;
 competitorsCount: number;
}

/**
 * 1. MOCK: Fetch real scraped/manual competitor averages from Supabase (competitor_prices)
 */
export async function getMarketAverages(city: string, serviceType: string, sizeMetric: number): Promise<MarketContext> {
 // Simulating network fetch
 await new Promise(resolve => setTimeout(resolve, 50));

 // Heuristic mock responses
 const baseAvgM2 = serviceType === 'umzug' ? 14 : serviceType === 'reinigung' ? 8 : 65;
 const avgTotal = Math.round(baseAvgM2 * sizeMetric);

 return {
  averagePrice: avgTotal,
  minPrice: Math.round(avgTotal * 0.8),
  maxPrice: Math.round(avgTotal * 1.3),
  competitorsCount: 3 // e.g. Movinga, lokaler Player, etc.
 };
}

/**
 * 2. Strategy Engine
 * Determines how FLOXANT positions itself vs the market in real-time.
 */
export function determineStrategy(floxantBase: number, market: MarketContext, timeConstraint: string): PricingStrategy {
 if (market.competitorsCount === 0) return 'monopoly';

 // If time is urgent/weekend, we don't undercut because supply is low and they are desperate.
 if (timeConstraint === 'wochenende' || timeConstraint === 'dringend') {
  return 'premium';
 }

 const gap = floxantBase - market.averagePrice;
 const percentageDiff = (gap / market.averagePrice) * 100;

 // If we are inherently drastically more expensive (> 20%), 
 // we must either justify it (premium) or crush margins to match (undercut).
 // Assuming standard low-intent traffic, we want to win market share by slight undercutting:
 if (percentageDiff > 5) {
   return 'match'; // we lower our price to match them
 } else if (percentageDiff <= 5 && percentageDiff > -10) {
   return 'undercut'; // we are close, so we go 5% below them to steal the deal
 }
 
 return 'premium'; // default if we are naturally very cheap, we can charge more
}

/**
 * 3. Market Modifier
 * Applies the chosen strategy to the central base price.
 */
export function applyMarketStrategy(floxantBase: number, marketAvg: number, strategy: PricingStrategy): number {
 switch (strategy) {
  case 'undercut':
   // Specifically target 5% below the market average to bait the conversion
   return Math.round(marketAvg * 0.95);
  case 'match':
   // Sit exactly on the average to portray 'fair value'
   return Math.round(marketAvg);
  case 'premium':
   // Sit 10% above average, pushing trust and quality as the differentiator
   return Math.round(marketAvg * 1.10);
  case 'monopoly':
  default:
   return floxantBase;
 }
}
