-- Verify RLS policies for job_applications
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'job_applications';

