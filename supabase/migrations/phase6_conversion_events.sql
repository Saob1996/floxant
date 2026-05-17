-- Phase 6: Conversion Event Intelligence
-- Server-only conversion telemetry for dashboard evaluation.
-- Access is intentionally routed through Next.js API handlers with SUPABASE_SERVICE_ROLE_KEY.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.conversion_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id VARCHAR(120),
    journey_id VARCHAR(160),
    event_name VARCHAR(120) NOT NULL,
    source VARCHAR(160) NOT NULL DEFAULT 'unknown',
    channel VARCHAR(80) NOT NULL DEFAULT 'navigation',
    path TEXT NOT NULL DEFAULT '/',
    href TEXT,
    priority VARCHAR(30) NOT NULL DEFAULT 'normal',
    score INTEGER NOT NULL DEFAULT 0,
    intent VARCHAR(80) NOT NULL DEFAULT 'awareness',
    response_hint TEXT,
    tags JSONB NOT NULL DEFAULT '[]'::JSONB,
    utm JSONB NOT NULL DEFAULT '{}'::JSONB,
    referrer TEXT,
    search TEXT,
    booking_id UUID,
    booking_service VARCHAR(80),
    converted_at TIMESTAMP WITH TIME ZONE,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS event_id VARCHAR(120);
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS journey_id VARCHAR(160);
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS event_name VARCHAR(120);
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS source VARCHAR(160) DEFAULT 'unknown';
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS channel VARCHAR(80) DEFAULT 'navigation';
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS path TEXT DEFAULT '/';
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS href TEXT;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS priority VARCHAR(30) DEFAULT 'normal';
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS intent VARCHAR(80) DEFAULT 'awareness';
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS response_hint TEXT;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::JSONB;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS utm JSONB DEFAULT '{}'::JSONB;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS search TEXT;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS booking_id UUID;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS booking_service VARCHAR(80);
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS converted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE public.conversion_events ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

ALTER TABLE public.conversion_events ALTER COLUMN event_name SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN source SET DEFAULT 'unknown';
ALTER TABLE public.conversion_events ALTER COLUMN source SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN channel SET DEFAULT 'navigation';
ALTER TABLE public.conversion_events ALTER COLUMN channel SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN path SET DEFAULT '/';
ALTER TABLE public.conversion_events ALTER COLUMN path SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN priority SET DEFAULT 'normal';
ALTER TABLE public.conversion_events ALTER COLUMN priority SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN score SET DEFAULT 0;
ALTER TABLE public.conversion_events ALTER COLUMN score SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN intent SET DEFAULT 'awareness';
ALTER TABLE public.conversion_events ALTER COLUMN intent SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN tags SET DEFAULT '[]'::JSONB;
ALTER TABLE public.conversion_events ALTER COLUMN tags SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN utm SET DEFAULT '{}'::JSONB;
ALTER TABLE public.conversion_events ALTER COLUMN utm SET NOT NULL;
ALTER TABLE public.conversion_events ALTER COLUMN created_at SET DEFAULT timezone('utc'::text, now());
ALTER TABLE public.conversion_events ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events FORCE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.conversion_events FROM anon;
REVOKE ALL ON TABLE public.conversion_events FROM authenticated;

COMMENT ON TABLE public.conversion_events IS
    'Server-only conversion telemetry. RLS is enabled and browser access must go through Next.js API routes using the Supabase service role key.';
COMMENT ON COLUMN public.conversion_events.journey_id IS
    'Anonymous browser journey id used to link CTA/form interactions to a later booking.';
COMMENT ON COLUMN public.conversion_events.booking_id IS
    'Optional booking id linked after an intake/booking submission; cleared when a booking is deleted.';

CREATE INDEX IF NOT EXISTS idx_conversion_events_created_at ON public.conversion_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_events_journey_id ON public.conversion_events(journey_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_booking_id ON public.conversion_events(booking_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_priority ON public.conversion_events(priority);
CREATE INDEX IF NOT EXISTS idx_conversion_events_channel ON public.conversion_events(channel);
CREATE INDEX IF NOT EXISTS idx_conversion_events_source ON public.conversion_events(source);
CREATE INDEX IF NOT EXISTS idx_conversion_events_unlinked_journey_created_at
    ON public.conversion_events(journey_id, created_at DESC)
    WHERE booking_id IS NULL;
