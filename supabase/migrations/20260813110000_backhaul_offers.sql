-- Admin-managed Leer-Rueckfahrten with a deliberately narrow public surface.
-- Apply this migration in Supabase before using the dashboard editor.

BEGIN;

CREATE TABLE IF NOT EXISTS public.backhaul_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  departure_date date NOT NULL,
  time_window text NOT NULL DEFAULT 'nach Absprache' CHECK (char_length(time_window) <= 120),
  origin text NOT NULL CHECK (char_length(origin) BETWEEN 2 AND 160),
  destination text NOT NULL DEFAULT 'Regensburg' CHECK (char_length(destination) BETWEEN 2 AND 160),
  destination_radius text NOT NULL DEFAULT 'ca. 200 km um Regensburg' CHECK (char_length(destination_radius) <= 160),
  route_areas text[] NOT NULL DEFAULT '{}'::text[],
  vehicle_type text NOT NULL DEFAULT 'Transporter oder LKW nach Tour' CHECK (char_length(vehicle_type) <= 160),
  available_capacity text NOT NULL CHECK (char_length(available_capacity) BETWEEN 3 AND 500),
  price_hint text NOT NULL DEFAULT 'fairer Rueckfahrt-Preis nach Route und Volumen' CHECK (char_length(price_hint) <= 240),
  fair_price_note text NOT NULL CHECK (char_length(fair_price_note) BETWEEN 10 AND 1500),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'paused', 'draft', 'archived')),
  admin_note text NOT NULL DEFAULT '' CHECK (char_length(admin_note) <= 5000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

COMMENT ON TABLE public.backhaul_offers IS
  'Real, admin-managed return trips. Only active public columns are readable anonymously.';
COMMENT ON COLUMN public.backhaul_offers.admin_note IS
  'Internal note. Never grant anonymous SELECT on this column.';

CREATE OR REPLACE FUNCTION public.set_backhaul_offer_audit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at := now();
  NEW.updated_by := auth.uid();
  IF TG_OP = 'INSERT' THEN
    NEW.created_by := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS backhaul_offer_audit ON public.backhaul_offers;
CREATE TRIGGER backhaul_offer_audit
BEFORE INSERT OR UPDATE ON public.backhaul_offers
FOR EACH ROW
EXECUTE FUNCTION public.set_backhaul_offer_audit();

ALTER TABLE public.backhaul_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backhaul_offers FORCE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE public.backhaul_offers FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.backhaul_offers FROM authenticated;

-- Anonymous visitors can request only the explicitly public columns. RLS below
-- additionally limits them to active rows.
GRANT SELECT (
  id,
  title,
  departure_date,
  time_window,
  origin,
  destination,
  destination_radius,
  route_areas,
  vehicle_type,
  available_capacity,
  price_hint,
  fair_price_note,
  status,
  created_at,
  updated_at
) ON TABLE public.backhaul_offers TO anon;

GRANT SELECT ON TABLE public.backhaul_offers TO authenticated;
GRANT INSERT (
  title,
  departure_date,
  time_window,
  origin,
  destination,
  destination_radius,
  route_areas,
  vehicle_type,
  available_capacity,
  price_hint,
  fair_price_note,
  status,
  admin_note
) ON TABLE public.backhaul_offers TO authenticated;
GRANT UPDATE (
  title,
  departure_date,
  time_window,
  origin,
  destination,
  destination_radius,
  route_areas,
  vehicle_type,
  available_capacity,
  price_hint,
  fair_price_note,
  status,
  admin_note
) ON TABLE public.backhaul_offers TO authenticated;

DROP POLICY IF EXISTS backhaul_offers_public_active_select ON public.backhaul_offers;
DROP POLICY IF EXISTS backhaul_offers_admin_select ON public.backhaul_offers;
DROP POLICY IF EXISTS backhaul_offers_admin_insert ON public.backhaul_offers;
DROP POLICY IF EXISTS backhaul_offers_admin_update ON public.backhaul_offers;

CREATE POLICY backhaul_offers_public_active_select
ON public.backhaul_offers
FOR SELECT
TO anon
USING (status = 'active' AND departure_date >= CURRENT_DATE);

CREATE POLICY backhaul_offers_admin_select
ON public.backhaul_offers
FOR SELECT
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY backhaul_offers_admin_insert
ON public.backhaul_offers
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY backhaul_offers_admin_update
ON public.backhaul_offers
FOR UPDATE
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE INDEX IF NOT EXISTS backhaul_offers_public_idx
  ON public.backhaul_offers(status, departure_date);
CREATE INDEX IF NOT EXISTS backhaul_offers_updated_idx
  ON public.backhaul_offers(updated_at DESC);

COMMIT;
