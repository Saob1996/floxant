-- FLOXANT admin dashboard access for the existing public.bookings table.
-- Public lead forms keep writing through Cloudflare Pages Functions with the
-- SUPABASE_SERVICE_ROLE_KEY. The browser dashboard never uses that key.

BEGIN;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings FORCE ROW LEVEL SECURITY;

-- The current public form path does not require browser INSERT access. Remove
-- every legacy policy first so an earlier anon/authenticated policy cannot
-- accidentally keep exposing customer requests.
DO $policy_cleanup$
DECLARE
  policy_record record;
BEGIN
  FOR policy_record IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'bookings'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.bookings', policy_record.policyname);
  END LOOP;
END
$policy_cleanup$;

REVOKE ALL PRIVILEGES ON TABLE public.bookings FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.bookings FROM authenticated;

-- RLS still needs the matching PostgreSQL table privileges. UPDATE is limited
-- at column level, so even an admin browser token cannot change customer data.
GRANT SELECT ON TABLE public.bookings TO authenticated;
GRANT UPDATE (status) ON TABLE public.bookings TO authenticated;

CREATE POLICY bookings_admin_select
ON public.bookings
FOR SELECT
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY bookings_admin_update_status
ON public.bookings
FOR UPDATE
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

COMMIT;
