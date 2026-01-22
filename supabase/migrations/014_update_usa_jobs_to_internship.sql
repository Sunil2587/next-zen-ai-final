-- =============================================
-- NEXT ZEN AI - UPDATE USA JOBS TO INTERNSHIP
-- Change all USA jobs from Full-time to Internship
-- =============================================

-- Update all jobs in USA to be internships
UPDATE jobs
SET
  type = 'Internship',
  updated_at = NOW()
WHERE location_country = 'usa';
