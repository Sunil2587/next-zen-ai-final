-- =============================================
-- NEXT ZEN AI - SUPABASE DATABASE SETUP
-- Run this in your Supabase SQL Editor
-- =============================================

-- =============================================
-- 1. JOBS TABLE (for Careers)
-- =============================================
CREATE TABLE IF NOT EXISTS jobs (
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

-- =============================================
-- 2. JOB APPLICATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS job_applications (
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

-- =============================================
-- 3. CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
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

-- =============================================
-- 4. INSERT SAMPLE USA JOBS
-- =============================================
INSERT INTO jobs (title, department, location, location_country, type, description, icon, requirements, responsibilities) VALUES
(
  'Senior AI/ML Engineer',
  'AI Strategy',
  'Jersey City, NJ',
  'usa',
  'Full-time',
  'Design and implement machine learning models and AI solutions for enterprise clients.',
  'faBrain',
  ARRAY['5+ years experience in ML/AI', 'Python, TensorFlow/PyTorch expertise', 'Experience with cloud ML platforms', 'Strong mathematical foundations'],
  ARRAY['Design and develop ML models', 'Lead AI implementation projects', 'Mentor junior engineers', 'Collaborate with client teams']
),
(
  'Cloud Solutions Architect',
  'Cloud Infrastructure',
  'Jersey City, NJ / Remote',
  'usa',
  'Full-time',
  'Architect and deploy scalable cloud solutions across AWS, Azure, and GCP platforms.',
  'faCloud',
  ARRAY['7+ years cloud architecture experience', 'AWS/Azure/GCP certifications', 'Kubernetes expertise', 'Infrastructure as Code experience'],
  ARRAY['Design cloud architecture solutions', 'Lead cloud migration projects', 'Optimize cloud costs and performance', 'Implement security best practices']
),
(
  'Cybersecurity Analyst',
  'Security',
  'Jersey City, NJ',
  'usa',
  'Full-time',
  'Conduct security assessments and implement zero-trust security frameworks.',
  'faShieldHalved',
  ARRAY['3+ years cybersecurity experience', 'Security certifications (CISSP, CEH)', 'Experience with SIEM tools', 'Knowledge of compliance frameworks'],
  ARRAY['Conduct security assessments', 'Implement security controls', 'Monitor and respond to threats', 'Develop security policies']
);

-- =============================================
-- 5. INSERT SAMPLE INDIA JOBS
-- =============================================
INSERT INTO jobs (title, department, location, location_country, type, description, icon, requirements, responsibilities) VALUES
(
  'Full Stack Developer',
  'Engineering',
  'Hyderabad, India',
  'india',
  'Full-time',
  'Build and maintain enterprise web applications using modern frameworks.',
  'faCode',
  ARRAY['3+ years full-stack experience', 'React/Next.js expertise', 'Node.js/Python backend skills', 'Database design experience'],
  ARRAY['Develop web applications', 'Write clean, maintainable code', 'Participate in code reviews', 'Collaborate with design team']
),
(
  'AI/ML Engineer',
  'AI Strategy',
  'Hyderabad, India',
  'india',
  'Full-time',
  'Develop and deploy machine learning models for enterprise AI solutions.',
  'faBrain',
  ARRAY['3+ years ML experience', 'Python, TensorFlow/PyTorch', 'Experience with data pipelines', 'Strong analytical skills'],
  ARRAY['Build ML models', 'Process and analyze data', 'Deploy models to production', 'Document solutions']
),
(
  'Cloud Engineer',
  'Cloud Infrastructure',
  'Hyderabad, India / Remote',
  'india',
  'Full-time',
  'Build and manage cloud infrastructure on AWS, Azure, and Google Cloud.',
  'faCloud',
  ARRAY['2+ years cloud experience', 'AWS/Azure experience', 'Docker/Kubernetes knowledge', 'Scripting skills (Python/Bash)'],
  ARRAY['Manage cloud infrastructure', 'Implement CI/CD pipelines', 'Monitor system performance', 'Troubleshoot issues']
);

-- =============================================
-- 6. VERIFY SETUP
-- =============================================
SELECT 'Jobs Table' as table_name, COUNT(*) as count FROM jobs
UNION ALL
SELECT 'Job Applications' as table_name, COUNT(*) as count FROM job_applications
UNION ALL
SELECT 'Contact Submissions' as table_name, COUNT(*) as count FROM contact_submissions;

