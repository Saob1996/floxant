-- Phase 5: Autonomous Growth Engine Schema Updates

-- 1. Reputation & Referrals Loop
CREATE TABLE public.referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referrer_lead_id UUID NOT NULL, 
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    discount_awarded DECIMAL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'redeemed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.reputation_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL,
    rating INTEGER NOT NULL, -- 1 to 5
    feedback_text TEXT,
    routed_to_google BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. NLP Content Engine Hub
CREATE TABLE public.content_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_blob TEXT NOT NULL,
    seo_metadata JSONB,
    category VARCHAR(50) NOT NULL, -- 'city_guide', 'micro_article', 'case_story'
    internal_links JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CRM Extensions for Lifetime Value (LTV) and Automated Reactivation
ALTER TABLE public.leads_extended
ADD COLUMN is_repeat_customer BOOLEAN DEFAULT false,
ADD COLUMN total_lifetime_spent DECIMAL DEFAULT 0,
ADD COLUMN last_reactivation_trigger TIMESTAMP WITH TIME ZONE,
ADD COLUMN reactivation_status VARCHAR(50) DEFAULT 'none'; -- 'hook_sent', 'social_proof_sent', 'recovered'
