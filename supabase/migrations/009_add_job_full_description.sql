-- =============================================
-- ADD FULL JOB DESCRIPTION FIELD
-- Adds a detailed paragraph description for job listings
-- =============================================

-- Add full_description column to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS full_description TEXT;

-- Update existing jobs with full descriptions
UPDATE jobs SET full_description =
  CASE title
    WHEN 'Data Engineer' THEN 'We are seeking an experienced Data Engineer to join our growing team. In this role, you will design, build, and maintain scalable data pipelines and infrastructure that power our enterprise analytics capabilities. You will work closely with data scientists, analysts, and business stakeholders to ensure our data architecture meets both current and future needs. The ideal candidate has a strong background in distributed systems, cloud data platforms, and modern ETL/ELT practices.'

    WHEN 'Data Architect' THEN 'As a Data Architect, you will lead the design and implementation of our enterprise data architecture strategy. You will be responsible for defining data standards, ensuring data governance, and mentoring our data engineering teams. This is a senior leadership role requiring deep expertise in data modeling, warehousing, and modern lakehouse architectures. You will work across multiple projects to ensure consistent, scalable, and secure data solutions.'

    WHEN 'Product Manager' THEN 'We are looking for a strategic Product Manager to drive the vision and roadmap for our enterprise AI and cloud solutions. You will work at the intersection of business, technology, and user experience to deliver products that solve real customer problems. The ideal candidate has experience with B2B/enterprise products, strong analytical skills, and the ability to translate complex technical concepts into compelling product narratives.'

    WHEN 'Cloud Architect' THEN 'Join our team as a Cloud Architect and lead the design of enterprise-grade cloud solutions across AWS, Azure, and Google Cloud. You will be responsible for creating scalable, secure, and cost-effective architectures that meet our clients'' business objectives. This role requires deep expertise in cloud-native technologies, containerization, and infrastructure as code practices.'

    WHEN 'SAP FICO Consultant' THEN 'We are seeking an experienced SAP FICO Consultant to lead implementation and configuration projects for our enterprise clients. You will be responsible for gathering requirements, designing solutions, and ensuring successful go-lives. The ideal candidate has strong financial accounting knowledge combined with deep SAP expertise, particularly in S/4HANA environments.'

    WHEN '.NET Lead Developer' THEN 'As a .NET Lead Developer, you will lead a team of talented developers in building enterprise applications using Microsoft technologies. You will be responsible for architectural decisions, code quality, and mentoring team members. We are looking for someone with deep .NET expertise, Azure cloud experience, and a passion for building scalable microservices architectures.'

    WHEN 'Data Scientist' THEN 'Join our AI/ML team as a Data Scientist and work on cutting-edge machine learning projects that drive real business impact. You will develop predictive models, conduct statistical analyses, and collaborate with engineering teams to deploy models into production. We are looking for someone with strong mathematical foundations, programming skills, and the ability to communicate complex insights to non-technical stakeholders.'

    WHEN 'AI/ML Engineer' THEN 'We are hiring an AI/ML Engineer to build and deploy machine learning solutions at scale. In this role, you will work on the full ML lifecycle—from data preparation and model training to deployment and monitoring. The ideal candidate has strong software engineering skills combined with deep expertise in ML frameworks and cloud ML services.'

    WHEN 'Salesforce Developer' THEN 'As a Salesforce Developer, you will build custom solutions on the Salesforce platform to meet our clients'' unique business requirements. You will work on Apex development, Lightning components, integrations, and automations. We are looking for certified Salesforce professionals who are passionate about delivering exceptional CRM experiences.'

    WHEN 'QA SDET Engineer' THEN 'Join our quality engineering team as a QA SDET Engineer. You will design and implement automated testing frameworks, develop test strategies, and ensure the quality of our software releases. The ideal candidate has strong programming skills, experience with modern testing tools, and a passion for quality.'

    WHEN 'Data Analyst' THEN 'We are seeking a Data Analyst to transform raw data into actionable insights. You will create dashboards, develop reports, and work closely with business stakeholders to understand their analytical needs. The ideal candidate has strong SQL skills, experience with BI tools, and excellent communication abilities.'

    WHEN 'Financial Analyst' THEN 'As a Financial Analyst, you will support financial planning, budgeting, and analysis activities. You will develop financial models, prepare reports, and provide insights to support strategic decision-making. We are looking for someone with strong analytical skills, attention to detail, and experience in financial analysis.'

    WHEN 'Software Engineer' THEN 'Join our engineering team as a Software Engineer and build scalable, high-quality software solutions. You will participate in the full software development lifecycle, from design through deployment. We are looking for engineers who are passionate about clean code, best practices, and continuous learning.'

    WHEN 'Java Full Stack Developer' THEN 'We are hiring a Java Full Stack Developer to build end-to-end web applications. You will work on both backend (Java, Spring) and frontend (React, Angular) development. The ideal candidate has strong Java fundamentals, experience with modern web frameworks, and a passion for building user-centric applications.'

    WHEN 'Business Analyst' THEN 'As a Business Analyst, you will bridge the gap between business needs and technical solutions. You will gather requirements, create documentation, and work closely with development teams to ensure successful project delivery. We are looking for someone with excellent analytical and communication skills.'

    WHEN 'AI Researcher Scientist' THEN 'Join our research team as an AI Research Scientist and push the boundaries of what''s possible with artificial intelligence. You will conduct original research, publish papers, and work on translating research breakthroughs into practical applications. This role requires a PhD in a relevant field and a strong publication record.'

    WHEN 'Project Manager' THEN 'We are seeking an experienced Project Manager to lead complex technology projects from initiation through delivery. You will be responsible for planning, execution, and stakeholder management. The ideal candidate has PMP certification, experience with agile methodologies, and a track record of successful project delivery.'

    WHEN 'HR Business Analyst' THEN 'As an HR Business Analyst, you will analyze HR processes and systems to identify improvement opportunities. You will work on HRIS implementations, develop HR analytics capabilities, and support strategic HR initiatives. We are looking for someone with a blend of HR knowledge and analytical skills.'

    WHEN 'Generative AI Application Engineer' THEN 'Join our cutting-edge AI team as a Generative AI Application Engineer. You will build applications powered by large language models and generative AI technologies. The ideal candidate has experience with LLMs, prompt engineering, and building production AI applications.'

    WHEN 'Gen AI GTM Representative - Gen AI Startups' THEN 'We are seeking a Gen AI GTM Representative to drive our go-to-market strategy for generative AI solutions targeting startups. You will identify opportunities, build relationships, and help startups adopt our AI technologies. This role combines technical knowledge with strong business development skills.'

    WHEN 'Machine Learning Researcher' THEN 'As a Machine Learning Researcher, you will conduct applied research in machine learning and contribute to the development of novel algorithms and techniques. You will collaborate with engineering teams to deploy research outcomes into production systems.'

    WHEN 'Financial Resource Management Specialist' THEN 'We are hiring a Financial Resource Management Specialist to optimize resource allocation across projects and initiatives. You will develop financial models, track utilization, and provide insights to support resource planning decisions.'

    WHEN 'Quantitative Research' THEN 'Join our quantitative research team and work on developing mathematical models for financial applications. You will conduct research, develop algorithms, and work closely with technology teams to implement trading and risk management solutions.'

    WHEN 'E-commerce Intern' THEN 'We are offering an exciting internship opportunity in our e-commerce team. As an E-commerce Intern, you will gain hands-on experience in digital commerce, marketing, and analytics. This is an excellent opportunity for students or recent graduates looking to start their career in e-commerce.'

    WHEN 'Supply Chain Manager' THEN 'As a Supply Chain Manager, you will oversee end-to-end supply chain operations including procurement, logistics, and inventory management. You will develop strategies to optimize costs, improve efficiency, and ensure timely delivery.'

    WHEN 'AI Systems Engineer' THEN 'We are seeking an AI Systems Engineer who combines AI/ML expertise with strong software engineering skills. In this hybrid role, you will build production-grade AI systems, develop ML pipelines, and ensure our AI solutions are reliable, scalable, and maintainable. This role bridges the gap between AI research and production engineering.'

    ELSE 'We are looking for talented individuals to join our growing team. This role offers an exciting opportunity to work on challenging projects with cutting-edge technologies. You will collaborate with a team of experts and contribute to delivering innovative solutions for our enterprise clients.'
  END
WHERE full_description IS NULL;

