-- =============================================
-- ADD FULL_DESCRIPTION COLUMN TO JOBS TABLE
-- =============================================

-- Add full_description column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'jobs' AND column_name = 'full_description'
    ) THEN
        ALTER TABLE jobs ADD COLUMN full_description TEXT;
    END IF;
END $$;

-- Verify the column was added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'jobs'
ORDER BY ordinal_position;
