-- =============================================
-- FIX: Admin Read Access for job_applications
-- =============================================

-- Drop all existing SELECT/UPDATE policies first
DROP POLICY IF EXISTS "Users can view own applications" ON job_applications;
DROP POLICY IF EXISTS "Allow read access for applications" ON job_applications;
DROP POLICY IF EXISTS "Allow admin updates" ON job_applications;
DROP POLICY IF EXISTS "Allow admin to update applications" ON job_applications;

-- Allow public read access to job_applications (for admin dashboard)
CREATE POLICY "Allow read access for applications" ON job_applications
  FOR SELECT USING (true);

-- Allow updates for status changes from admin
CREATE POLICY "Allow admin to update applications" ON job_applications
  FOR UPDATE USING (true) WITH CHECK (true);

-- =============================================
-- ALTERNATIVE: Secure Admin Access (if you want tighter security)
-- Uncomment below and use service_role key on server-side API
-- =============================================
-- Instead of the above, you can:
-- 1. Create an API route that uses getServiceSupabase()
-- 2. Keep the RLS restrictive
-- 3. Have frontend call API route, not Supabase directly

-- =============================================
-- VERIFY
-- =============================================
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'job_applications';

