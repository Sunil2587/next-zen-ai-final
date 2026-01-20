// Script to verify RLS policies work correctly
// Run with: node scripts/apply-rls-policies.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qhgtobzpuijeqsfmzjhw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZ3RvYnpwdWlqZXFzZm16amh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4Nzg0MzEsImV4cCI6MjA4MzQ1NDQzMX0.HLirAoVcsCvVqU_pu3k7Z6EkOs9EWT2LQhFVfCJ6VEE';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZ3RvYnpwdWlqZXFzZm16amh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzg3ODQzMSwiZXhwIjoyMDgzNDU0NDMxfQ.gwFBf9bHAAB0JhL6BPM-kJJjVlsr4fVhJGfzQp1Ty_4';

async function verifyPolicies() {
  console.log('=== Testing RLS Policies ===\n');

  // Test 1: Service role key (should always work)
  console.log('1. Testing with SERVICE_ROLE key (bypasses RLS):');
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
  const { data: serviceData, error: serviceError } = await serviceClient
    .from('job_applications')
    .select('id, full_name, email, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (serviceError) {
    console.log('   ❌ ERROR:', serviceError.message);
  } else {
    console.log(`   ✅ Found ${serviceData.length} applications`);
    serviceData.forEach(app => console.log(`      - ${app.full_name} (${app.email})`));
  }

  // Test 2: Anon key (this is what the admin dashboard uses)
  console.log('\n2. Testing with ANON key (subject to RLS):');
  const anonClient = createClient(supabaseUrl, supabaseAnonKey);
  const { data: anonData, error: anonError } = await anonClient
    .from('job_applications')
    .select('id, full_name, email, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (anonError) {
    console.log('   ❌ ERROR:', anonError.message);
    console.log('   RLS is blocking reads. Policy needs to be applied.');
  } else if (anonData.length === 0) {
    console.log('   ⚠️ No applications returned (could be empty table or RLS blocking)');
  } else {
    console.log(`   ✅ SUCCESS! Found ${anonData.length} applications`);
    console.log('   Admin dashboard should now work correctly!');
    anonData.forEach(app => console.log(`      - ${app.full_name} (${app.email})`));
  }

  console.log('\n=== Verification Complete ===');
}

verifyPolicies();

