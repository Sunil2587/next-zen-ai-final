-- =============================================
-- CREATE STORAGE BUCKET FOR RESUMES
-- Note: Storage buckets should be created via the Supabase Dashboard
-- Go to: Storage > New Bucket > Name: resumes > Public: false
-- =============================================

-- After creating the bucket in the dashboard, run these policies:

-- Allow anyone to upload resumes (for job applicants)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to read resumes (using signed URLs)
CREATE POLICY "Anyone can read resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

