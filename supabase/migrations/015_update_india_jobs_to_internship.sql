-- =============================================
-- NEXT ZEN AI - UPDATE INDIA JOBS TO INTERNSHIP
-- Change all India jobs from Full-time to Internship
-- =============================================

-- Update all jobs in India to be internships
UPDATE jobs
SET
  type = 'Internship',
  updated_at = NOW()
WHERE location_country = 'india';
