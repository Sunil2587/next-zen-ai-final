-- =============================================
-- STORAGE POLICIES FOR RESUMES BUCKET
-- =============================================

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read resumes" ON storage.objects;

-- Allow anyone to upload resumes (for job applicants)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to read resumes with signed URLs
CREATE POLICY "Anyone can read resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Allow deletion by service role only
CREATE POLICY "Service role can delete resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND auth.role() = 'service_role');

