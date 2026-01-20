-- =============================================
-- RESET AND RECREATE ALL RLS POLICIES
-- Run this in Supabase Dashboard SQL Editor:
-- https://supabase.com/dashboard/project/qhgtobzpuijeqsfmzjhw/sql/new
-- =============================================

-- Drop ALL existing policies on job_applications
DROP POLICY IF EXISTS "Users can view own applications" ON job_applications;
DROP POLICY IF EXISTS "Allow read access for applications" ON job_applications;
DROP POLICY IF EXISTS "Allow admin updates" ON job_applications;
DROP POLICY IF EXISTS "Allow admin to update applications" ON job_applications;
DROP POLICY IF EXISTS "Public can read applications" ON job_applications;
DROP POLICY IF EXISTS "Authenticated users can insert applications" ON job_applications;
DROP POLICY IF EXISTS "Admin can update applications" ON job_applications;
DROP POLICY IF EXISTS "Admin can delete applications" ON job_applications;
DROP POLICY IF EXISTS "Users can insert own applications" ON job_applications;

-- Drop ALL existing policies on jobs
DROP POLICY IF EXISTS "Public can view jobs" ON jobs;
DROP POLICY IF EXISTS "Admin can manage jobs" ON jobs;
DROP POLICY IF EXISTS "Anyone can view jobs" ON jobs;
DROP POLICY IF EXISTS "Allow public read access" ON jobs;

-- Drop ALL existing policies on user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- =============================================
-- RECREATE POLICIES
-- =============================================

-- JOBS: Public read access
CREATE POLICY "Public can view jobs" ON jobs
  FOR SELECT USING (is_active = true);

-- JOB APPLICATIONS: Full access for admin dashboard
CREATE POLICY "Public can read applications" ON job_applications
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own applications" ON job_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update applications" ON job_applications
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Admin can delete applications" ON job_applications
  FOR DELETE USING (true);

-- USER_PROFILES: Users can manage own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- =============================================
-- STORAGE: Ensure resumes bucket exists and has policies
-- =============================================

-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies for resumes bucket
DROP POLICY IF EXISTS "Users can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admin can download resumes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can download" ON storage.objects;

-- Storage policies for resumes
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resumes' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Anyone can download" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes');

-- =============================================
-- VERIFY POLICIES
-- =============================================
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('job_applications', 'jobs', 'user_profiles', 'objects')
ORDER BY tablename, policyname;

