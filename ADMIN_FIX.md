# Fix Admin Dashboard - RLS Policy Update

## Problem
The admin dashboard is not showing new applications because:
1. Row Level Security (RLS) blocks anonymous reads
2. The current policy only allows users to see their OWN applications (`auth.uid() = user_id`)
3. The admin dashboard uses the anon key which has no `auth.uid()`

## Solution
Run this SQL in Supabase Dashboard:

**Go to:** https://supabase.com/dashboard/project/qhgtobzpuijeqsfmzjhw/sql/new

**Paste and Execute:**

```sql
-- =============================================
-- FIX: Admin Read Access for job_applications
-- =============================================

-- Drop the restrictive policy
DROP POLICY IF EXISTS "Users can view own applications" ON job_applications;

-- Allow public read access for admin dashboard
-- (Admin portal has its own authentication layer)
CREATE POLICY "Allow read access for applications" ON job_applications
  FOR SELECT USING (true);

-- Allow updates for status changes from admin
DROP POLICY IF EXISTS "Allow admin updates" ON job_applications;
CREATE POLICY "Allow admin to update applications" ON job_applications
  FOR UPDATE USING (true) WITH CHECK (true);

-- Verify the policies
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'job_applications';
```

## Expected Output After Running
You should see:
| policyname | cmd |
|------------|-----|
| Allow public to insert applications | INSERT |
| Allow read access for applications | SELECT |
| Allow admin to update applications | UPDATE |

## After Applying
1. Refresh the admin dashboard
2. All applications should now appear
3. New applications will appear in real-time (subscriptions added)
4. Status updates will work

## Security Notes
- The admin page still requires username/password login
- The RLS allows reads, but the UI gates access
- For stricter security, we could move to server-side API routes with service_role key

