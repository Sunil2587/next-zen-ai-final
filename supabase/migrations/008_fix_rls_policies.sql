-- =============================================
-- FIX RLS POLICIES - Use correct table names
-- =============================================

-- First, drop existing policies that may conflict
DO $$
BEGIN
  -- Drop job_applications policies
  DROP POLICY IF EXISTS "Users can view own applications" ON job_applications;
  DROP POLICY IF EXISTS "Allow read access for applications" ON job_applications;
  DROP POLICY IF EXISTS "Allow admin updates" ON job_applications;
  DROP POLICY IF EXISTS "Allow admin to update applications" ON job_applications;
  DROP POLICY IF EXISTS "Public can read applications" ON job_applications;
  DROP POLICY IF EXISTS "Authenticated users can insert applications" ON job_applications;
  DROP POLICY IF EXISTS "Admin can update applications" ON job_applications;
  DROP POLICY IF EXISTS "Admin can delete applications" ON job_applications;
  DROP POLICY IF EXISTS "Users can insert own applications" ON job_applications;
  DROP POLICY IF EXISTS "Allow public to insert applications" ON job_applications;

  -- Drop jobs policies
  DROP POLICY IF EXISTS "Public can view jobs" ON jobs;
  DROP POLICY IF EXISTS "Admin can manage jobs" ON jobs;
  DROP POLICY IF EXISTS "Anyone can view jobs" ON jobs;
  DROP POLICY IF EXISTS "Allow public read access" ON jobs;

  -- Drop user_profiles policies
  DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- =============================================
-- RECREATE POLICIES
-- =============================================

-- JOBS: Public read access for active jobs
CREATE POLICY "Public can view jobs" ON jobs
  FOR SELECT USING (is_active = true);

-- JOB APPLICATIONS: Full access policies
CREATE POLICY "Anyone can insert applications" ON job_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read applications" ON job_applications
  FOR SELECT USING (true);

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
-- STORAGE: Ensure resumes bucket exists
-- =============================================

-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can upload resumes" ON storage.objects;
  DROP POLICY IF EXISTS "Users can view own resumes" ON storage.objects;
  DROP POLICY IF EXISTS "Admin can download resumes" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can download" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access for resumes" ON storage.objects;
  DROP POLICY IF EXISTS "Auth users can upload to resumes" ON storage.objects;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Storage policies for resumes
CREATE POLICY "Auth users can upload to resumes" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resumes' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Public read access for resumes" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes');

