# Supabase Connection Guide

This guide explains how to connect your Next Zen AI project to Supabase for database, authentication, and storage.

## Prerequisites

- Supabase project created at [supabase.com](https://supabase.com)
- Node.js installed
- Access to your project dashboard

---

## Step 1: Install Supabase Client

Run in terminal:

```bash
npm install @supabase/supabase-js
```

---

## Step 2: Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (for server-side operations only)

---

## Step 3: Create Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Server-side only (do NOT expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

> ⚠️ **Important**: Add `.env.local` to your `.gitignore` file!

---

## Step 4: Create Supabase Client

Create or update `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for API routes)
export const getServiceSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
};
```

---

## Step 5: Create Database Tables

Go to Supabase Dashboard → **SQL Editor** and run:

### Jobs Table (for Careers)

```sql
-- Create jobs table
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  location_country TEXT NOT NULL CHECK (location_country IN ('usa', 'india')),
  type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  salary_range TEXT,
  icon TEXT DEFAULT 'faCode',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON jobs
  FOR SELECT USING (is_active = true);

-- Create policy for authenticated admin write access
CREATE POLICY "Allow admin write access" ON jobs
  FOR ALL USING (auth.role() = 'authenticated');
```

### Job Applications Table

```sql
-- Create job_applications table
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  years_experience INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interviewed', 'offered', 'rejected', 'hired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit applications
CREATE POLICY "Allow public to insert applications" ON job_applications
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view applications
CREATE POLICY "Allow admin read access" ON job_applications
  FOR SELECT USING (auth.role() = 'authenticated');
```

### Contact Form Submissions Table

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  interest TEXT,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact forms
CREATE POLICY "Allow public to insert contact" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view submissions
CREATE POLICY "Allow admin read access" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## Step 6: Insert Sample Job Data

```sql
-- Insert sample USA jobs
INSERT INTO jobs (title, department, location, location_country, type, description, icon) VALUES
('Senior AI/ML Engineer', 'AI Strategy', 'Jersey City, NJ', 'usa', 'Full-time', 'Design and implement machine learning models and AI solutions for enterprise clients.', 'faBrain'),
('Cloud Solutions Architect', 'Cloud Infrastructure', 'Jersey City, NJ / Remote', 'usa', 'Full-time', 'Architect and deploy scalable cloud solutions across AWS, Azure, and GCP platforms.', 'faCloud'),
('Cybersecurity Analyst', 'Security', 'Jersey City, NJ', 'usa', 'Full-time', 'Conduct security assessments and implement zero-trust security frameworks.', 'faShieldHalved');

-- Insert sample India jobs
INSERT INTO jobs (title, department, location, location_country, type, description, icon) VALUES
('Full Stack Developer', 'Engineering', 'Hyderabad, India', 'india', 'Full-time', 'Build and maintain enterprise web applications using modern frameworks.', 'faCode'),
('AI/ML Engineer', 'AI Strategy', 'Hyderabad, India', 'india', 'Full-time', 'Develop and deploy machine learning models for enterprise AI solutions.', 'faBrain'),
('Cloud Engineer', 'Cloud Infrastructure', 'Hyderabad, India / Remote', 'india', 'Full-time', 'Build and manage cloud infrastructure on AWS, Azure, and Google Cloud.', 'faCloud');
```

---

## Step 7: Create Storage Bucket for Resumes

1. Go to Supabase Dashboard → **Storage**
2. Click **New Bucket**
3. Name: `resumes`
4. Set to **Public** or configure policies as needed

```sql
-- Or via SQL:
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Allow authenticated uploads
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resumes');
```

---

## Step 8: Test Connection

Create a test file or run in your app:

```typescript
import { supabase } from '@/lib/supabase';

// Test connection
const testConnection = async () => {
  const { data, error } = await supabase.from('jobs').select('*');
  
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Connected! Jobs:', data);
  }
};

testConnection();
```

---

## Terminal Commands Reference

```bash
# Install Supabase CLI (optional, for advanced features)
npm install -g supabase

# Login to Supabase CLI
supabase login

# Link your project
supabase link --project-ref your-project-id

# Generate TypeScript types from your database
supabase gen types typescript --project-id your-project-id > src/types/supabase.ts

# Push migrations
supabase db push

# Pull remote schema
supabase db pull
```

---

## Environment Variables Checklist

Make sure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Next Steps

1. Copy your Supabase URL and keys from the dashboard
2. Create `.env.local` with those values
3. Run the SQL commands to create tables
4. Test the connection
5. Update your components to fetch from Supabase instead of static data

---

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

