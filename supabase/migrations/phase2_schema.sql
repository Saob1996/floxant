-- Phase 2: Data Intelligence & CRM Core
-- Run this in your Supabase SQL Editor

-- 1. Pricing History (For adaptive pricing engine)
CREATE TABLE public.pricing_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_type VARCHAR(50) NOT NULL, -- 'umzug', 'reinigung', 'entsorgung'
    
    -- Metrics for normalization
    base_metric_value DECIMAL NOT NULL, -- m3 for Umzug/Entsorgung, m2 for Reinigung
    
    -- Specific Parameters stored as JSON for flexibility
    input_parameters JSONB NOT NULL DEFAULT '{}'::JSONB,
    
    -- Financials
    final_quoted_price DECIMAL NOT NULL,
    final_negotiated_price DECIMAL, -- if negotiated down later
    profit_margin DECIMAL, -- optional internal tracking
    
    -- Context
    job_duration_hours DECIMAL,
    demand_load_at_quote DECIMAL, -- Load factor when quote was made (0.0 to 2.0)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast moving average calculation
CREATE INDEX idx_pricing_service on public.pricing_history(service_type);
CREATE INDEX idx_pricing_created on public.pricing_history(created_at);

-- 2. Extended Leads
CREATE TABLE public.leads_extended (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_type VARCHAR(50) NOT NULL,
    
    -- Client 
    first_name VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    
    -- Intelligence
    calculator_inputs JSONB NOT NULL,
    chosen_tier VARCHAR(50), -- 'economy', 'balanced', 'premium'
    time_to_convert_seconds INTEGER,
    device_type VARCHAR(50), -- mobile, desktop
    hesitation_discount_used BOOLEAN DEFAULT FALSE,
    
    -- Pricing State
    base_price DECIMAL NOT NULL,
    final_price DECIMAL NOT NULL,
    confidence_score VARCHAR(20), -- 'low', 'medium', 'high'
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
