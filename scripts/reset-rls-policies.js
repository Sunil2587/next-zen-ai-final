// Script to reset and apply RLS policies
// Run with: node scripts/reset-rls-policies.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://qhgtobzpuijeqsfmzjhw.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZ3RvYnpwdWlqZXFzZm16amh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzg3ODQzMSwiZXhwIjoyMDgzNDU0NDMxfQ.gwFBf9bHAAB0JhL6BPM-kJJjVlsr4fVhJGfzQp1Ty_4';

async function resetPolicies() {
  console.log('=== Resetting RLS Policies ===\n');

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  });

  // Individual SQL statements to run (can't run DO blocks via REST API easily)
  const statements = [
    // Drop existing policies on job_applications
    `DROP POLICY IF EXISTS "Users can view own applications" ON job_applications`,
    `DROP POLICY IF EXISTS "Allow read access for applications" ON job_applications`,
    `DROP POLICY IF EXISTS "Allow admin updates" ON job_applications`,
    `DROP POLICY IF EXISTS "Allow admin to update applications" ON job_applications`,
    `DROP POLICY IF EXISTS "Public can read applications" ON job_applications`,
    `DROP POLICY IF EXISTS "Authenticated users can insert applications" ON job_applications`,
    `DROP POLICY IF EXISTS "Admin can update applications" ON job_applications`,
    `DROP POLICY IF EXISTS "Admin can delete applications" ON job_applications`,

    // Drop existing policies on jobs
    `DROP POLICY IF EXISTS "Public can view jobs" ON jobs`,
    `DROP POLICY IF EXISTS "Admin can manage jobs" ON jobs`,
    `DROP POLICY IF EXISTS "Anyone can view jobs" ON jobs`,
    `DROP POLICY IF EXISTS "Allow public read access" ON jobs`,

    // Drop existing policies on user_profiles
    `DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles`,
    `DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles`,
    `DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles`,
  ];

  // Create new policies
  const createStatements = [
    // Jobs
    `CREATE POLICY "Public can view jobs" ON jobs FOR SELECT USING (is_active = true)`,

    // Job Applications
    `CREATE POLICY "Public can read applications" ON job_applications FOR SELECT USING (true)`,
    `CREATE POLICY "Users can insert own applications" ON job_applications FOR INSERT WITH CHECK (auth.uid() = user_id)`,
    `CREATE POLICY "Admin can update applications" ON job_applications FOR UPDATE USING (true) WITH CHECK (true)`,
    `CREATE POLICY "Admin can delete applications" ON job_applications FOR DELETE USING (true)`,

    // User Profiles
    `CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id)`,
    `CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id)`,
    `CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id)`,
  ];

  // Run drop statements
  console.log('Dropping existing policies...');
  for (const sql of statements) {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).maybeSingle();
    // Ignore errors for drops - policies might not exist
  }
  console.log('✅ Existing policies dropped\n');

  // Run create statements
  console.log('Creating new policies...');
  for (const sql of createStatements) {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).maybeSingle();
    if (error) {
      console.log(`   ⚠️ ${sql.substring(0, 60)}...`);
      console.log(`      Error: ${error.message}`);
    } else {
      console.log(`   ✅ ${sql.substring(0, 60)}...`);
    }
  }

  console.log('\n=== Policy Reset Complete ===');
  console.log('\nNOTE: If errors occurred, you may need to run the SQL directly in Supabase Dashboard:');
  console.log('1. Go to https://supabase.com/dashboard/project/qhgtobzpuijeqsfmzjhw/sql/new');
  console.log('2. Copy and paste the contents of supabase/migrations/007_reset_rls_policies.sql');
  console.log('3. Click "Run"');
}

resetPolicies();

