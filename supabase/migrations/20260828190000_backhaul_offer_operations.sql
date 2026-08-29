-- Expands admin-managed return trips into an operational route register.
-- Internal net prices and admin notes remain unavailable to anonymous users.

BEGIN;

ALTER TABLE public.backhaul_offers
  ADD COLUMN IF NOT EXISTS route_id text,
  ADD COLUMN IF NOT EXISTS date_end date,
  ADD COLUMN IF NOT EXISTS intermediate_stops text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS pickup_radius_km numeric(7,2),
  ADD COLUMN IF NOT EXISTS available_cubic_meters numeric(8,2),
  ADD COLUMN IF NOT EXISTS loading_area text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS weight_limit_kg numeric(10,2),
  ADD COLUMN IF NOT EXISTS required_helpers integer,
  ADD COLUMN IF NOT EXISTS item_types text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS capacity_mode text NOT NULL DEFAULT 'empty-return',
  ADD COLUMN IF NOT EXISTS internal_net_price numeric(12,2),
  ADD COLUMN IF NOT EXISTS public_gross_price numeric(12,2),
  ADD COLUMN IF NOT EXISTS vat_rate numeric(5,2) NOT NULL DEFAULT 19,
  ADD COLUMN IF NOT EXISTS price_type text NOT NULL DEFAULT 'on-request',
  ADD COLUMN IF NOT EXISTS conditions text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS public_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS publication_status text NOT NULL DEFAULT 'unpublished';

UPDATE public.backhaul_offers
SET
  route_id = COALESCE(NULLIF(route_id, ''), 'RF-' || EXTRACT(YEAR FROM departure_date)::text || '-' || UPPER(SUBSTRING(id::text, 1, 8))),
  date_end = COALESCE(date_end, departure_date),
  public_description = COALESCE(NULLIF(public_description, ''), fair_price_note),
  publication_status = CASE WHEN status = 'active' THEN 'published' ELSE publication_status END;

ALTER TABLE public.backhaul_offers
  ALTER COLUMN route_id SET NOT NULL,
  ALTER COLUMN date_end SET NOT NULL;

ALTER TABLE public.backhaul_offers DROP CONSTRAINT IF EXISTS backhaul_offers_status_check;
ALTER TABLE public.backhaul_offers
  ADD CONSTRAINT backhaul_offers_status_check
  CHECK (status IN ('active', 'reserved', 'completed', 'inactive', 'paused', 'draft', 'archived'));

ALTER TABLE public.backhaul_offers DROP CONSTRAINT IF EXISTS backhaul_offers_date_range_check;
ALTER TABLE public.backhaul_offers
  ADD CONSTRAINT backhaul_offers_date_range_check CHECK (date_end >= departure_date);

ALTER TABLE public.backhaul_offers DROP CONSTRAINT IF EXISTS backhaul_offers_capacity_mode_check;
ALTER TABLE public.backhaul_offers
  ADD CONSTRAINT backhaul_offers_capacity_mode_check CHECK (capacity_mode IN ('shared-load', 'empty-return'));

ALTER TABLE public.backhaul_offers DROP CONSTRAINT IF EXISTS backhaul_offers_price_type_check;
ALTER TABLE public.backhaul_offers
  ADD CONSTRAINT backhaul_offers_price_type_check CHECK (price_type IN ('fixed', 'from', 'estimate', 'on-request'));

ALTER TABLE public.backhaul_offers DROP CONSTRAINT IF EXISTS backhaul_offers_publication_status_check;
ALTER TABLE public.backhaul_offers
  ADD CONSTRAINT backhaul_offers_publication_status_check CHECK (publication_status IN ('published', 'unpublished'));

ALTER TABLE public.backhaul_offers DROP CONSTRAINT IF EXISTS backhaul_offers_positive_values_check;
ALTER TABLE public.backhaul_offers
  ADD CONSTRAINT backhaul_offers_positive_values_check CHECK (
    (pickup_radius_km IS NULL OR pickup_radius_km >= 0) AND
    (available_cubic_meters IS NULL OR available_cubic_meters >= 0) AND
    (weight_limit_kg IS NULL OR weight_limit_kg >= 0) AND
    (required_helpers IS NULL OR required_helpers >= 0) AND
    (internal_net_price IS NULL OR internal_net_price >= 0) AND
    (public_gross_price IS NULL OR public_gross_price >= 0) AND
    vat_rate >= 0
  );

CREATE UNIQUE INDEX IF NOT EXISTS backhaul_offers_route_id_idx
  ON public.backhaul_offers(route_id);

GRANT SELECT (
  route_id,
  date_end,
  intermediate_stops,
  pickup_radius_km,
  available_cubic_meters,
  loading_area,
  weight_limit_kg,
  required_helpers,
  item_types,
  capacity_mode,
  public_gross_price,
  vat_rate,
  price_type,
  conditions,
  public_description,
  publication_status
) ON TABLE public.backhaul_offers TO anon;

GRANT INSERT (
  route_id,
  date_end,
  intermediate_stops,
  pickup_radius_km,
  available_cubic_meters,
  loading_area,
  weight_limit_kg,
  required_helpers,
  item_types,
  capacity_mode,
  internal_net_price,
  public_gross_price,
  vat_rate,
  price_type,
  conditions,
  public_description,
  publication_status
) ON TABLE public.backhaul_offers TO authenticated;

GRANT UPDATE (
  route_id,
  date_end,
  intermediate_stops,
  pickup_radius_km,
  available_cubic_meters,
  loading_area,
  weight_limit_kg,
  required_helpers,
  item_types,
  capacity_mode,
  internal_net_price,
  public_gross_price,
  vat_rate,
  price_type,
  conditions,
  public_description,
  publication_status
) ON TABLE public.backhaul_offers TO authenticated;

DROP POLICY IF EXISTS backhaul_offers_public_active_select ON public.backhaul_offers;
CREATE POLICY backhaul_offers_public_active_select
ON public.backhaul_offers
FOR SELECT
TO anon
USING (
  status = 'active'
  AND publication_status = 'published'
  AND date_end >= CURRENT_DATE
);

DROP INDEX IF EXISTS public.backhaul_offers_public_idx;
CREATE INDEX backhaul_offers_public_idx
  ON public.backhaul_offers(publication_status, status, date_end, departure_date);

COMMENT ON COLUMN public.backhaul_offers.internal_net_price IS
  'Internal net calculation. Never grant anonymous SELECT on this column.';
COMMENT ON COLUMN public.backhaul_offers.publication_status IS
  'Explicit public switch; public visibility additionally requires active lifecycle status and a non-expired date range.';

COMMIT;
