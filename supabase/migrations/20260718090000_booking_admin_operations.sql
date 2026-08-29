-- FLOXANT lead operations metadata for the existing public.bookings table.
-- This migration is intentionally not executed by repository scripts.
-- Public forms continue to write only to public.bookings through the server-side service role.

CREATE TABLE IF NOT EXISTS public.booking_admin_meta (
  booking_id uuid PRIMARY KEY REFERENCES public.bookings(id) ON DELETE RESTRICT,
  stage text NOT NULL DEFAULT 'new' CHECK (stage IN (
    'new',
    'review',
    'needs_info',
    'contacted',
    'quote_prepared',
    'quote_sent',
    'in_progress',
    'completed',
    'not_fit',
    'archived'
  )),
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  internal_notes text NOT NULL DEFAULT '' CHECK (char_length(internal_notes) <= 10000),
  first_contact_at timestamptz,
  next_follow_up_at timestamptz,
  quote_sent_at timestamptz,
  archived_at timestamptz,
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status_history jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(status_history) = 'array'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

COMMENT ON TABLE public.booking_admin_meta IS
  'Admin-only operational metadata. Customer intake data remains unchanged in public.bookings.';
COMMENT ON COLUMN public.booking_admin_meta.internal_notes IS
  'Internal admin note. Never exposed through public forms or public pages.';
COMMENT ON COLUMN public.booking_admin_meta.status_history IS
  'Trigger-maintained stage history containing stage, timestamp and authenticated admin id.';

CREATE OR REPLACE FUNCTION public.set_booking_admin_meta_audit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_catalog
AS $$
DECLARE
  actor uuid := auth.uid();
BEGIN
  NEW.updated_at := now();
  NEW.updated_by := actor;

  IF TG_OP = 'INSERT' OR NEW.stage IS DISTINCT FROM OLD.stage THEN
    NEW.status_history := COALESCE(
      CASE WHEN TG_OP = 'UPDATE' THEN OLD.status_history ELSE NEW.status_history END,
      '[]'::jsonb
    ) || jsonb_build_array(jsonb_build_object(
      'stage', NEW.stage,
      'changedAt', now(),
      'changedBy', actor
    ));
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS booking_admin_meta_audit ON public.booking_admin_meta;
CREATE TRIGGER booking_admin_meta_audit
BEFORE INSERT OR UPDATE ON public.booking_admin_meta
FOR EACH ROW
EXECUTE FUNCTION public.set_booking_admin_meta_audit();

ALTER TABLE public.booking_admin_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_admin_meta FORCE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE public.booking_admin_meta FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.booking_admin_meta FROM authenticated;

GRANT SELECT ON TABLE public.booking_admin_meta TO authenticated;
GRANT INSERT (
  booking_id,
  stage,
  priority,
  internal_notes,
  first_contact_at,
  next_follow_up_at,
  quote_sent_at,
  archived_at,
  assigned_to
) ON TABLE public.booking_admin_meta TO authenticated;
GRANT UPDATE (
  stage,
  priority,
  internal_notes,
  first_contact_at,
  next_follow_up_at,
  quote_sent_at,
  archived_at,
  assigned_to
) ON TABLE public.booking_admin_meta TO authenticated;

DROP POLICY IF EXISTS booking_admin_meta_admin_select ON public.booking_admin_meta;
DROP POLICY IF EXISTS booking_admin_meta_admin_insert ON public.booking_admin_meta;
DROP POLICY IF EXISTS booking_admin_meta_admin_update ON public.booking_admin_meta;

CREATE POLICY booking_admin_meta_admin_select
ON public.booking_admin_meta
FOR SELECT
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY booking_admin_meta_admin_insert
ON public.booking_admin_meta
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY booking_admin_meta_admin_update
ON public.booking_admin_meta
FOR UPDATE
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE INDEX IF NOT EXISTS booking_admin_meta_stage_idx
  ON public.booking_admin_meta(stage);
CREATE INDEX IF NOT EXISTS booking_admin_meta_follow_up_idx
  ON public.booking_admin_meta(next_follow_up_at)
  WHERE next_follow_up_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS booking_admin_meta_updated_at_idx
  ON public.booking_admin_meta(updated_at DESC);
