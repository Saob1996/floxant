-- Phase 4: Market Control & Operations 
-- Supabase SQL schema updates

-- 1. Competitor Pricing Database
CREATE TABLE public.competitor_prices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    competitor_name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    base_metric_value DECIMAL NOT NULL, -- e.g. 50 (m2 or m3)
    avg_price DECIMAL NOT NULL,
    min_price DECIMAL,
    max_price DECIMAL,
    reliability_score INTEGER DEFAULT 80, -- 0-100 how sure we are about this scrape
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_competitor_lookup on public.competitor_prices(city, service_type);

-- 2. Extend Pricing History for tracking Profit & Operations
ALTER TABLE public.pricing_history
ADD COLUMN real_cost DECIMAL,         -- Post-job operational cost vs what we quoted
ADD COLUMN real_profit DECIMAL,       -- Margin tracking
ADD COLUMN market_strategy VARCHAR(50); -- 'undercut', 'match', 'premium', 'monopoly'

-- 3. Operational Routing & Clustering
CREATE TABLE public.operational_clusters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    execution_date DATE NOT NULL,
    city VARCHAR(100) NOT NULL,
    total_revenue DECIMAL DEFAULT 0,
    vehicle_required VARCHAR(50), 
    status VARCHAR(50) DEFAULT 'planning', -- 'planning', 'locked', 'active', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.leads_extended
ADD COLUMN cluster_id UUID REFERENCES public.operational_clusters(id),
ADD COLUMN required_team_size INTEGER,
ADD COLUMN estimated_hours DECIMAL,
ADD COLUMN vehicle_type VARCHAR(50);
