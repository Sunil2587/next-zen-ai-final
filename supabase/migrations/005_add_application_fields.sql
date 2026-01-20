-- =============================================
-- ADD NEW APPLICATION FIELDS
-- =============================================

-- Add new columns to job_applications table
ALTER TABLE job_applications
ADD COLUMN IF NOT EXISTS current_location TEXT,
ADD COLUMN IF NOT EXISTS current_company TEXT,
ADD COLUMN IF NOT EXISTS current_title TEXT,
ADD COLUMN IF NOT EXISTS expected_salary TEXT,
ADD COLUMN IF NOT EXISTS notice_period TEXT,
ADD COLUMN IF NOT EXISTS preferred_start_date DATE,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS how_did_you_hear TEXT;

