-- Allow authenticated dashboard sessions to delete a booking only when the
-- signed JWT carries the protected app_metadata admin role.
-- Apply only after inspecting the live bookings policies and grants.

BEGIN;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings FORCE ROW LEVEL SECURITY;

-- PostgreSQL combines permissive policies with OR. Stop instead of installing
-- this policy beside an unknown DELETE/ALL policy that could broaden access.
DO $policy_guard$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookings'
      AND (
        cmd = 'ALL'
        OR (cmd = 'DELETE' AND policyname <> 'bookings_admin_delete')
      )
  ) THEN
    RAISE EXCEPTION 'Unexpected bookings DELETE/ALL policy; review before enabling admin delete';
  END IF;
END
$policy_guard$;

REVOKE DELETE ON TABLE public.bookings FROM PUBLIC, anon;
GRANT DELETE ON TABLE public.bookings TO authenticated;

DROP POLICY IF EXISTS bookings_admin_delete ON public.bookings;

CREATE POLICY bookings_admin_delete
ON public.bookings
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

COMMIT;
