-- =============================================
-- NEXT ZEN AI - FULL CAREERS SYSTEM
-- Clear and rebuild from scratch
-- =============================================

-- =============================================
-- DROP EXISTING TABLES
-- =============================================
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- =============================================
-- 1. USER PROFILES TABLE (for Google Auth)
-- =============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- 2. JOBS TABLE
-- =============================================
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
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON jobs
  FOR SELECT USING (is_active = true);

-- =============================================
-- 3. JOB APPLICATIONS TABLE (Full Form)
-- =============================================
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Basic Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  years_experience INTEGER,

  -- USA Immigration (only for USA jobs)
  -- Work Authorization
  is_authorized_usa BOOLEAN,
  requires_sponsorship BOOLEAN,

  -- Current Visa Status
  visa_status TEXT CHECK (visa_status IN (
    'us_citizen', 'permanent_resident', 'f1_opt', 'f1_stem_opt',
    'h1b', 'o1', 'l1', 'tn_e3', 'other', NULL
  )),
  visa_status_other TEXT,

  -- F1/OPT Specific
  requires_cpt BOOLEAN,
  is_stem_degree BOOLEAN,
  opt_expiration_date DATE,

  -- H1B History
  has_h1b_history BOOLEAN,

  -- J1 Status
  has_j1_history BOOLEAN,
  is_subject_to_212e BOOLEAN,

  -- Green Card
  has_i140_filed BOOLEAN,

  -- Future Sponsorship
  requires_future_sponsorship BOOLEAN,

  -- Immigration Compliance
  immigration_certified BOOLEAN,

  -- EEO Voluntary Self-Identification
  gender TEXT CHECK (gender IN ('male', 'female', 'non_binary', 'self_describe', 'prefer_not_say', NULL)),
  gender_self_describe TEXT,

  -- Race/Ethnicity (stored as array for multiple selections)
  race_ethnicity TEXT[] DEFAULT '{}',

  -- Disability
  has_disability TEXT CHECK (has_disability IN ('yes', 'no', 'prefer_not_answer', NULL)),

  -- Veteran Status
  is_veteran TEXT CHECK (is_veteran IN ('yes', 'no', 'prefer_not_say', NULL)),

  -- EEO Acknowledgment
  eeo_acknowledged BOOLEAN,

  -- Application Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interviewed', 'offered', 'rejected', 'hired')),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit applications
CREATE POLICY "Allow public to insert applications" ON job_applications
  FOR INSERT WITH CHECK (true);

-- Users can view their own applications
CREATE POLICY "Users can view own applications" ON job_applications
  FOR SELECT USING (auth.uid() = user_id);

-- =============================================
-- 4. CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  interest TEXT,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert contact" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- =============================================
-- 5. INSERT ALL JOB ROLES
-- =============================================

-- USA JOBS
INSERT INTO jobs (title, department, location, location_country, type, description, requirements, responsibilities) VALUES
('Data Engineer', 'Data & Analytics', 'Jersey City, NJ', 'usa', 'Full-time',
 'Design, build, and maintain scalable data pipelines and infrastructure for enterprise analytics.',
 ARRAY['3+ years data engineering experience', 'Python, SQL, Spark expertise', 'Experience with cloud data platforms (AWS/GCP/Azure)', 'ETL/ELT pipeline development'],
 ARRAY['Build and maintain data pipelines', 'Optimize data warehouse performance', 'Collaborate with data scientists', 'Ensure data quality and governance']),

('Data Architect', 'Data & Analytics', 'Jersey City, NJ', 'usa', 'Full-time',
 'Design enterprise data architecture and lead data modeling initiatives across the organization.',
 ARRAY['7+ years data architecture experience', 'Expert in data modeling and warehousing', 'Cloud platform certifications', 'Strong leadership skills'],
 ARRAY['Design enterprise data architecture', 'Lead data governance initiatives', 'Mentor data engineering teams', 'Define data standards and best practices']),

('Product Manager', 'Product', 'Jersey City, NJ / Remote', 'usa', 'Full-time',
 'Drive product strategy and roadmap for enterprise AI and cloud solutions.',
 ARRAY['5+ years product management experience', 'Experience with B2B/enterprise products', 'Technical background preferred', 'Strong analytical skills'],
 ARRAY['Define product vision and strategy', 'Prioritize features and roadmap', 'Work with engineering and design', 'Analyze market and customer needs']),

('Cloud Architect', 'Cloud Infrastructure', 'Jersey City, NJ', 'usa', 'Full-time',
 'Design and implement enterprise cloud architecture across AWS, Azure, and GCP.',
 ARRAY['7+ years cloud architecture experience', 'Multiple cloud certifications', 'Kubernetes and containerization expertise', 'Infrastructure as Code experience'],
 ARRAY['Design cloud solutions', 'Lead migration projects', 'Optimize costs and performance', 'Implement security best practices']),

('SAP FICO Consultant', 'Enterprise Solutions', 'Jersey City, NJ', 'usa', 'Full-time',
 'Implement and configure SAP Financial Accounting and Controlling modules for enterprise clients.',
 ARRAY['5+ years SAP FICO experience', 'SAP S/4HANA experience', 'Strong financial accounting knowledge', 'Client-facing experience'],
 ARRAY['Configure SAP FICO modules', 'Lead implementation projects', 'Provide client training', 'Support go-live and post-implementation']),

('.NET Lead Developer', 'Engineering', 'Jersey City, NJ', 'usa', 'Full-time',
 'Lead .NET development team and architect enterprise applications using Microsoft technologies.',
 ARRAY['7+ years .NET development experience', 'Azure cloud expertise', 'Team leadership experience', 'Microservices architecture knowledge'],
 ARRAY['Lead development team', 'Architect .NET solutions', 'Code reviews and mentoring', 'Collaborate with stakeholders']),

('Data Scientist', 'AI Strategy', 'Jersey City, NJ / Remote', 'usa', 'Full-time',
 'Apply statistical analysis and machine learning to solve complex business problems.',
 ARRAY['3+ years data science experience', 'Python, R, SQL proficiency', 'Machine learning expertise', 'Strong communication skills'],
 ARRAY['Build predictive models', 'Analyze complex datasets', 'Present insights to stakeholders', 'Collaborate with engineering teams']),

('AI/ML Engineer', 'AI Strategy', 'Jersey City, NJ', 'usa', 'Full-time',
 'Design and implement production-grade machine learning systems for enterprise clients.',
 ARRAY['5+ years ML engineering experience', 'Python, TensorFlow/PyTorch expertise', 'MLOps and deployment experience', 'Cloud ML platform experience'],
 ARRAY['Build ML pipelines', 'Deploy models to production', 'Optimize model performance', 'Collaborate with data scientists']),

('Salesforce Developer', 'Enterprise Solutions', 'Jersey City, NJ / Remote', 'usa', 'Full-time',
 'Develop custom Salesforce solutions and integrations for enterprise CRM implementations.',
 ARRAY['3+ years Salesforce development', 'Apex, Lightning Web Components', 'Salesforce certifications', 'Integration experience'],
 ARRAY['Develop Salesforce customizations', 'Build integrations', 'Support implementations', 'Maintain documentation']),

('QA SDET Engineer', 'Engineering', 'Jersey City, NJ', 'usa', 'Full-time',
 'Design and implement automated testing frameworks for enterprise applications.',
 ARRAY['3+ years SDET experience', 'Automation frameworks (Selenium, Cypress)', 'API testing expertise', 'CI/CD integration experience'],
 ARRAY['Build test automation frameworks', 'Write automated tests', 'Integrate with CI/CD pipelines', 'Ensure quality standards']),

('Data Analyst', 'Data & Analytics', 'Jersey City, NJ', 'usa', 'Full-time',
 'Analyze business data and create actionable insights through reporting and visualization.',
 ARRAY['2+ years data analysis experience', 'SQL and Excel proficiency', 'Visualization tools (Tableau, Power BI)', 'Strong analytical skills'],
 ARRAY['Analyze business data', 'Create reports and dashboards', 'Present findings to stakeholders', 'Support decision-making']),

('Financial Analyst', 'Finance', 'Jersey City, NJ', 'usa', 'Full-time',
 'Provide financial analysis, forecasting, and strategic planning support.',
 ARRAY['3+ years financial analysis experience', 'Advanced Excel and modeling skills', 'Financial planning experience', 'CFA or MBA preferred'],
 ARRAY['Build financial models', 'Analyze financial performance', 'Support strategic planning', 'Prepare investor materials']),

('Software Engineer', 'Engineering', 'Jersey City, NJ / Remote', 'usa', 'Full-time',
 'Build and maintain enterprise software applications using modern technologies.',
 ARRAY['3+ years software development', 'Proficiency in multiple languages', 'Cloud development experience', 'Agile methodology experience'],
 ARRAY['Develop software features', 'Write clean, maintainable code', 'Participate in code reviews', 'Collaborate with cross-functional teams']),

('Java Full Stack Developer', 'Engineering', 'Jersey City, NJ', 'usa', 'Full-time',
 'Develop full-stack enterprise applications using Java and modern frontend frameworks.',
 ARRAY['5+ years Java development', 'Spring Boot expertise', 'React or Angular experience', 'Microservices architecture'],
 ARRAY['Build full-stack applications', 'Design APIs and services', 'Optimize performance', 'Mentor junior developers']),

('Business Analyst', 'Consulting', 'Jersey City, NJ', 'usa', 'Full-time',
 'Bridge business needs and technology solutions through requirements analysis and documentation.',
 ARRAY['3+ years business analysis experience', 'Requirements gathering expertise', 'Agile/Scrum experience', 'Strong communication skills'],
 ARRAY['Gather and document requirements', 'Create user stories', 'Facilitate stakeholder meetings', 'Support UAT and implementation']),

('AI Research Scientist', 'AI Strategy', 'Jersey City, NJ', 'usa', 'Full-time',
 'Conduct cutting-edge AI research and develop novel algorithms for enterprise applications.',
 ARRAY['PhD in CS, ML, or related field', 'Publication track record', 'Deep learning expertise', 'Research-to-production experience'],
 ARRAY['Conduct AI research', 'Develop novel algorithms', 'Publish research papers', 'Collaborate with engineering teams']),

('Project Manager', 'Delivery', 'Jersey City, NJ / Remote', 'usa', 'Full-time',
 'Lead project delivery for enterprise technology implementations.',
 ARRAY['5+ years project management experience', 'PMP or similar certification', 'Agile/Waterfall experience', 'Technology project experience'],
 ARRAY['Lead project delivery', 'Manage timelines and budgets', 'Coordinate cross-functional teams', 'Report to stakeholders']),

('HR Business Analyst', 'Human Resources', 'Jersey City, NJ', 'usa', 'Full-time',
 'Analyze HR processes and implement HR technology solutions.',
 ARRAY['3+ years HR analytics experience', 'HRIS system experience', 'Data analysis skills', 'Process improvement experience'],
 ARRAY['Analyze HR data and processes', 'Implement HR technology', 'Create HR reports', 'Support HR initiatives']),

('Generative AI Application Engineer', 'AI Strategy', 'Jersey City, NJ', 'usa', 'Full-time',
 'Build enterprise applications powered by generative AI and large language models.',
 ARRAY['3+ years software development', 'LLM/GenAI experience', 'Python and cloud expertise', 'RAG and prompt engineering'],
 ARRAY['Build GenAI applications', 'Integrate LLM APIs', 'Optimize AI workflows', 'Deploy AI solutions']),

('Gen AI GTM Representative', 'Sales', 'Jersey City, NJ / Remote', 'usa', 'Full-time',
 'Drive go-to-market strategy for generative AI solutions targeting startup clients.',
 ARRAY['3+ years B2B sales experience', 'AI/ML industry knowledge', 'Startup ecosystem experience', 'Strong presentation skills'],
 ARRAY['Develop GTM strategies', 'Build client relationships', 'Present AI solutions', 'Close enterprise deals']),

('Machine Learning Researcher', 'AI Strategy', 'Jersey City, NJ', 'usa', 'Full-time',
 'Research and develop advanced machine learning algorithms for enterprise AI products.',
 ARRAY['MS/PhD in ML or related field', 'Strong research background', 'Python and ML frameworks', 'Publication experience'],
 ARRAY['Conduct ML research', 'Prototype new algorithms', 'Collaborate with product teams', 'Stay current with research']),

('Financial Resource Management Specialist', 'Finance', 'Jersey City, NJ', 'usa', 'Full-time',
 'Manage financial resources and optimize resource allocation across projects.',
 ARRAY['5+ years financial management', 'Resource planning experience', 'Financial modeling skills', 'ERP system experience'],
 ARRAY['Manage financial resources', 'Optimize resource allocation', 'Financial reporting', 'Support budgeting process']),

('Quantitative Researcher', 'Quant Finance', 'Jersey City, NJ', 'usa', 'Full-time',
 'Develop quantitative models and strategies for financial analysis and trading systems.',
 ARRAY['PhD in quantitative field', 'Strong mathematical background', 'Python/C++ proficiency', 'Financial markets knowledge'],
 ARRAY['Develop quantitative models', 'Backtest trading strategies', 'Analyze market data', 'Collaborate with trading teams']),

('E-commerce Intern', 'Digital Commerce', 'Jersey City, NJ', 'usa', 'Internship',
 'Support e-commerce initiatives and learn digital commerce best practices.',
 ARRAY['Currently pursuing relevant degree', 'Interest in e-commerce', 'Basic analytics skills', 'Strong communication'],
 ARRAY['Support e-commerce projects', 'Analyze customer data', 'Assist with campaigns', 'Learn industry practices']),

('Supply Chain Manager', 'Operations', 'Jersey City, NJ', 'usa', 'Full-time',
 'Optimize supply chain operations and manage vendor relationships.',
 ARRAY['5+ years supply chain experience', 'ERP system expertise', 'Vendor management experience', 'Process optimization skills'],
 ARRAY['Manage supply chain operations', 'Optimize logistics', 'Build vendor relationships', 'Reduce costs and improve efficiency']),

('AI Systems Engineer', 'AI Strategy', 'Jersey City, NJ', 'usa', 'Full-time',
 'Build robust AI systems combining ML engineering and software engineering best practices.',
 ARRAY['5+ years software/ML engineering', 'Systems design expertise', 'ML deployment experience', 'Cloud platform expertise'],
 ARRAY['Design AI systems architecture', 'Build ML infrastructure', 'Optimize AI pipelines', 'Ensure system reliability']);

-- INDIA JOBS (Same roles for India)
INSERT INTO jobs (title, department, location, location_country, type, description, requirements, responsibilities) VALUES
('Data Engineer', 'Data & Analytics', 'Hyderabad, India', 'india', 'Full-time',
 'Design, build, and maintain scalable data pipelines and infrastructure for enterprise analytics.',
 ARRAY['3+ years data engineering experience', 'Python, SQL, Spark expertise', 'Experience with cloud data platforms', 'ETL/ELT pipeline development'],
 ARRAY['Build and maintain data pipelines', 'Optimize data warehouse performance', 'Collaborate with data scientists', 'Ensure data quality and governance']),

('Data Architect', 'Data & Analytics', 'Hyderabad, India', 'india', 'Full-time',
 'Design enterprise data architecture and lead data modeling initiatives.',
 ARRAY['7+ years data architecture experience', 'Expert in data modeling', 'Cloud platform experience', 'Strong leadership skills'],
 ARRAY['Design enterprise data architecture', 'Lead data governance', 'Mentor data engineering teams', 'Define data standards']),

('Product Manager', 'Product', 'Hyderabad, India', 'india', 'Full-time',
 'Drive product strategy and roadmap for enterprise AI and cloud solutions.',
 ARRAY['5+ years product management', 'B2B/enterprise experience', 'Technical background preferred', 'Strong analytical skills'],
 ARRAY['Define product vision', 'Prioritize features', 'Work with engineering', 'Analyze market needs']),

('Cloud Architect', 'Cloud Infrastructure', 'Hyderabad, India', 'india', 'Full-time',
 'Design and implement enterprise cloud architecture across major cloud providers.',
 ARRAY['7+ years cloud experience', 'Cloud certifications', 'Kubernetes expertise', 'IaC experience'],
 ARRAY['Design cloud solutions', 'Lead migrations', 'Optimize costs', 'Implement security']),

('SAP FICO Consultant', 'Enterprise Solutions', 'Hyderabad, India', 'india', 'Full-time',
 'Implement and configure SAP FICO modules for enterprise clients.',
 ARRAY['5+ years SAP FICO', 'S/4HANA experience', 'Financial accounting knowledge', 'Client-facing experience'],
 ARRAY['Configure SAP FICO', 'Lead implementations', 'Client training', 'Post-implementation support']),

('.NET Lead Developer', 'Engineering', 'Hyderabad, India', 'india', 'Full-time',
 'Lead .NET development team and architect enterprise applications.',
 ARRAY['7+ years .NET experience', 'Azure expertise', 'Team leadership', 'Microservices knowledge'],
 ARRAY['Lead development team', 'Architect solutions', 'Code reviews', 'Stakeholder collaboration']),

('Data Scientist', 'AI Strategy', 'Hyderabad, India', 'india', 'Full-time',
 'Apply statistical analysis and machine learning to solve business problems.',
 ARRAY['3+ years data science', 'Python, R, SQL', 'ML expertise', 'Communication skills'],
 ARRAY['Build predictive models', 'Analyze datasets', 'Present insights', 'Team collaboration']),

('AI/ML Engineer', 'AI Strategy', 'Hyderabad, India', 'india', 'Full-time',
 'Design and implement production ML systems for enterprise clients.',
 ARRAY['5+ years ML engineering', 'Python, TensorFlow/PyTorch', 'MLOps experience', 'Cloud ML platforms'],
 ARRAY['Build ML pipelines', 'Deploy models', 'Optimize performance', 'Collaborate with data scientists']),

('Salesforce Developer', 'Enterprise Solutions', 'Hyderabad, India', 'india', 'Full-time',
 'Develop custom Salesforce solutions and integrations.',
 ARRAY['3+ years Salesforce', 'Apex, LWC', 'Certifications', 'Integration experience'],
 ARRAY['Develop customizations', 'Build integrations', 'Support implementations', 'Documentation']),

('QA SDET Engineer', 'Engineering', 'Hyderabad, India', 'india', 'Full-time',
 'Design and implement automated testing frameworks.',
 ARRAY['3+ years SDET', 'Automation frameworks', 'API testing', 'CI/CD experience'],
 ARRAY['Build test frameworks', 'Write automated tests', 'CI/CD integration', 'Quality assurance']),

('Data Analyst', 'Data & Analytics', 'Hyderabad, India', 'india', 'Full-time',
 'Analyze business data and create actionable insights.',
 ARRAY['2+ years data analysis', 'SQL and Excel', 'Visualization tools', 'Analytical skills'],
 ARRAY['Analyze data', 'Create dashboards', 'Present findings', 'Support decisions']),

('Financial Analyst', 'Finance', 'Hyderabad, India', 'india', 'Full-time',
 'Provide financial analysis, forecasting, and planning support.',
 ARRAY['3+ years financial analysis', 'Excel and modeling', 'Financial planning', 'CA/CFA preferred'],
 ARRAY['Build financial models', 'Analyze performance', 'Strategic planning', 'Financial reporting']),

('Software Engineer', 'Engineering', 'Hyderabad, India', 'india', 'Full-time',
 'Build and maintain enterprise software applications.',
 ARRAY['3+ years development', 'Multiple languages', 'Cloud experience', 'Agile methodology'],
 ARRAY['Develop features', 'Clean code', 'Code reviews', 'Cross-functional collaboration']),

('Java Full Stack Developer', 'Engineering', 'Hyderabad, India', 'india', 'Full-time',
 'Develop full-stack enterprise applications using Java.',
 ARRAY['5+ years Java', 'Spring Boot', 'React/Angular', 'Microservices'],
 ARRAY['Build applications', 'Design APIs', 'Optimize performance', 'Mentor developers']),

('Business Analyst', 'Consulting', 'Hyderabad, India', 'india', 'Full-time',
 'Bridge business needs and technology solutions.',
 ARRAY['3+ years BA experience', 'Requirements gathering', 'Agile/Scrum', 'Communication skills'],
 ARRAY['Gather requirements', 'Create user stories', 'Facilitate meetings', 'Support UAT']),

('AI Research Scientist', 'AI Strategy', 'Hyderabad, India', 'india', 'Full-time',
 'Conduct AI research and develop novel algorithms.',
 ARRAY['PhD in CS/ML', 'Publications', 'Deep learning', 'Research-to-production'],
 ARRAY['Conduct research', 'Develop algorithms', 'Publish papers', 'Team collaboration']),

('Project Manager', 'Delivery', 'Hyderabad, India', 'india', 'Full-time',
 'Lead project delivery for technology implementations.',
 ARRAY['5+ years PM experience', 'PMP certification', 'Agile/Waterfall', 'Tech project experience'],
 ARRAY['Lead delivery', 'Manage timelines', 'Coordinate teams', 'Stakeholder reporting']),

('HR Business Analyst', 'Human Resources', 'Hyderabad, India', 'india', 'Full-time',
 'Analyze HR processes and implement HR technology.',
 ARRAY['3+ years HR analytics', 'HRIS systems', 'Data analysis', 'Process improvement'],
 ARRAY['Analyze HR data', 'Implement HR tech', 'Create reports', 'Support HR initiatives']),

('Generative AI Application Engineer', 'AI Strategy', 'Hyderabad, India', 'india', 'Full-time',
 'Build enterprise applications powered by generative AI.',
 ARRAY['3+ years development', 'LLM/GenAI experience', 'Python and cloud', 'RAG and prompting'],
 ARRAY['Build GenAI apps', 'Integrate LLMs', 'Optimize workflows', 'Deploy solutions']),

('Gen AI GTM Representative', 'Sales', 'Hyderabad, India', 'india', 'Full-time',
 'Drive go-to-market strategy for generative AI solutions.',
 ARRAY['3+ years B2B sales', 'AI/ML knowledge', 'Startup experience', 'Presentation skills'],
 ARRAY['Develop GTM strategies', 'Build relationships', 'Present solutions', 'Close deals']),

('Machine Learning Researcher', 'AI Strategy', 'Hyderabad, India', 'india', 'Full-time',
 'Research and develop advanced ML algorithms.',
 ARRAY['MS/PhD in ML', 'Research background', 'Python and ML frameworks', 'Publications'],
 ARRAY['Conduct research', 'Prototype algorithms', 'Product collaboration', 'Stay current']),

('Financial Resource Management Specialist', 'Finance', 'Hyderabad, India', 'india', 'Full-time',
 'Manage financial resources and optimize allocation.',
 ARRAY['5+ years financial management', 'Resource planning', 'Financial modeling', 'ERP experience'],
 ARRAY['Manage resources', 'Optimize allocation', 'Financial reporting', 'Budgeting support']),

('Quantitative Researcher', 'Quant Finance', 'Hyderabad, India', 'india', 'Full-time',
 'Develop quantitative models for financial analysis.',
 ARRAY['PhD in quantitative field', 'Mathematical background', 'Python/C++', 'Financial markets knowledge'],
 ARRAY['Develop quant models', 'Backtest strategies', 'Analyze market data', 'Team collaboration']),

('E-commerce Intern', 'Digital Commerce', 'Hyderabad, India', 'india', 'Internship',
 'Support e-commerce initiatives and learn digital commerce.',
 ARRAY['Pursuing relevant degree', 'Interest in e-commerce', 'Basic analytics', 'Communication skills'],
 ARRAY['Support projects', 'Analyze data', 'Assist campaigns', 'Learn practices']),

('Supply Chain Manager', 'Operations', 'Hyderabad, India', 'india', 'Full-time',
 'Optimize supply chain operations and vendor relationships.',
 ARRAY['5+ years supply chain', 'ERP expertise', 'Vendor management', 'Process optimization'],
 ARRAY['Manage operations', 'Optimize logistics', 'Vendor relationships', 'Cost reduction']),

('AI Systems Engineer', 'AI Strategy', 'Hyderabad, India', 'india', 'Full-time',
 'Build robust AI systems combining ML and software engineering.',
 ARRAY['5+ years software/ML', 'Systems design', 'ML deployment', 'Cloud expertise'],
 ARRAY['Design AI systems', 'Build ML infrastructure', 'Optimize pipelines', 'Ensure reliability']);

-- =============================================
-- 6. CREATE STORAGE BUCKET FOR RESUMES
-- =============================================
-- Note: Run this in Supabase Dashboard > Storage > New Bucket
-- Bucket name: resumes
-- Public: false

-- =============================================
-- 7. VERIFY SETUP
-- =============================================
SELECT 'Jobs (USA)' as category, COUNT(*) as count FROM jobs WHERE location_country = 'usa'
UNION ALL
SELECT 'Jobs (India)' as category, COUNT(*) as count FROM jobs WHERE location_country = 'india'
UNION ALL
SELECT 'Total Jobs' as category, COUNT(*) as count FROM jobs;

