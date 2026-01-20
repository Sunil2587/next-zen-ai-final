"use client";

import { use } from "react";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBrain,
  faCloud,
  faShieldHalved,
  faRobot,
  faDatabase,
  faCode,
  faCheck,
  faMicrochip,
  faChartLine,
  faCubes,
  faUserShield,
  faMobileScreen,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";

// Service data
const services = [
  {
    slug: "ai-strategy",
    title: "AI Strategy & Implementation",
    description:
      "Transform your business with AI-powered solutions tailored to your specific needs and industry requirements.",
    icon: faBrain,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    overview: `Our AI Strategy & Implementation service helps organizations navigate the complex landscape of artificial intelligence to drive meaningful business outcomes. We work with you to identify high-value use cases, develop robust AI roadmaps, and implement solutions that deliver measurable ROI.`,
    offerings: [
      { title: "AI Readiness Assessment", description: "Comprehensive evaluation of your organization's data, infrastructure, and culture to determine AI readiness." },
      { title: "Custom ML Model Development", description: "Design and build machine learning models tailored to your specific business challenges." },
      { title: "Generative AI Integration", description: "Implement generative AI solutions including LLMs, chatbots, and content generation systems." },
      { title: "AI Governance & Ethics", description: "Establish frameworks for responsible AI use, ensuring compliance and ethical considerations." },
      { title: "Predictive Analytics", description: "Deploy predictive models for forecasting, risk assessment, and decision support." },
    ],
    benefits: ["Accelerate time-to-value with proven AI implementation methodologies", "Reduce operational costs through intelligent automation", "Gain competitive advantage with data-driven insights", "Ensure responsible AI deployment with built-in governance"],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning Solutions",
    description: "Custom ML model development, training, and deployment for predictive analytics and intelligent applications.",
    icon: faMicrochip,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop",
    overview: `Our Machine Learning Solutions service delivers custom ML models designed for your specific business challenges. From natural language processing to computer vision, we build and deploy production-ready models that drive real business value.`,
    offerings: [
      { title: "Predictive Modeling", description: "Build models that forecast trends, customer behavior, and business outcomes." },
      { title: "Natural Language Processing", description: "Text analytics, sentiment analysis, and language understanding solutions." },
      { title: "Computer Vision", description: "Image recognition, object detection, and visual inspection systems." },
      { title: "Recommendation Engines", description: "Personalized recommendation systems for products, content, and services." },
      { title: "Model Optimization", description: "Fine-tune and optimize models for performance and accuracy." },
    ],
    benefits: ["Improve decision-making with predictive insights", "Automate complex pattern recognition tasks", "Enhance customer experience with personalization", "Reduce manual analysis time by up to 90%"],
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description: "Build scalable, secure, and cost-effective cloud environments across AWS, Azure, and Google Cloud.",
    icon: faCloud,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=600&fit=crop",
    overview: `Our Cloud Infrastructure services enable organizations to build, migrate, and optimize their cloud environments for maximum efficiency and reliability. We specialize in multi-cloud architectures that provide flexibility, resilience, and cost optimization.`,
    offerings: [
      { title: "Cloud Migration & Modernization", description: "Seamlessly migrate legacy systems to the cloud with minimal disruption." },
      { title: "Multi-Cloud Architecture", description: "Design and implement strategies spanning AWS, Azure, and GCP." },
      { title: "Kubernetes & Containerization", description: "Deploy and manage containerized applications at scale." },
      { title: "Serverless Solutions", description: "Build event-driven architectures that scale automatically." },
      { title: "Cloud Cost Optimization", description: "Reduce cloud spending through rightsizing, reserved capacity, and FinOps practices." },
    ],
    benefits: ["Reduce infrastructure costs by up to 40%", "Achieve 99.99% uptime with resilient architectures", "Scale seamlessly to meet demand", "Accelerate deployment with automated CI/CD pipelines"],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity & Compliance",
    description: "Protect your enterprise with comprehensive security solutions and regulatory compliance frameworks.",
    icon: faShieldHalved,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    overview: `Our Cybersecurity & Compliance services provide end-to-end protection for your organization's digital assets. We implement zero-trust architectures, conduct thorough security assessments, and ensure compliance with industry regulations.`,
    offerings: [
      { title: "Zero-Trust Security", description: "Implement modern security architectures based on never trust, always verify principles." },
      { title: "Security Audits & Assessments", description: "Comprehensive penetration testing and vulnerability assessments." },
      { title: "Compliance Frameworks", description: "Achieve and maintain compliance with GDPR, HIPAA, SOC 2, and other regulations." },
      { title: "Threat Detection & Response", description: "24/7 security monitoring with rapid incident response capabilities." },
      { title: "Identity & Access Management", description: "Implement robust IAM solutions to protect user access and privileges." },
    ],
    benefits: ["Reduce security incidents by up to 90%", "Achieve regulatory compliance faster", "Protect brand reputation and customer trust", "Minimize breach impact with rapid response"],
  },
  {
    slug: "intelligent-automation",
    title: "Intelligent Automation",
    description: "Streamline operations and reduce costs with AI-powered automation across your organization.",
    icon: faRobot,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop",
    overview: `Our Intelligent Automation services combine RPA, AI, and machine learning to automate complex business processes. We help organizations reduce manual effort, minimize errors, and free up employees for higher-value work.`,
    offerings: [
      { title: "Robotic Process Automation (RPA)", description: "Automate repetitive tasks with software robots that work 24/7." },
      { title: "Intelligent Document Processing", description: "Extract and process information from documents using AI." },
      { title: "Workflow Automation", description: "Streamline business processes with end-to-end automation." },
      { title: "Chatbots & Virtual Assistants", description: "Deploy conversational AI for customer service and internal support." },
      { title: "Process Mining", description: "Discover and analyze business processes to identify automation opportunities." },
    ],
    benefits: ["Reduce processing time by up to 80%", "Eliminate manual errors in critical processes", "Achieve ROI within 6 months", "Scale operations without proportional headcount increase"],
  },
  {
    slug: "data-analytics",
    title: "Data Engineering & Analytics",
    description: "Unlock insights from your data with advanced analytics, visualization, and data engineering solutions.",
    icon: faDatabase,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop",
    overview: `Our Data & Analytics services help organizations transform raw data into actionable insights. We build robust data infrastructure, implement advanced analytics, and create visualizations that drive better decision-making.`,
    offerings: [
      { title: "Data Strategy & Governance", description: "Develop comprehensive data strategies with strong governance frameworks." },
      { title: "Data Warehouse & Lakes", description: "Build modern data architectures for analytics at scale." },
      { title: "Business Intelligence", description: "Create interactive dashboards and reports for data-driven decisions." },
      { title: "Real-time Analytics", description: "Process and analyze streaming data for immediate insights." },
      { title: "Data Quality & Integration", description: "Ensure data accuracy with robust ETL and data quality processes." },
    ],
    benefits: ["Make faster, data-driven decisions", "Discover hidden patterns and opportunities", "Improve operational efficiency with real-time insights", "Ensure data quality and trustworthiness"],
  },
  {
    slug: "software-development",
    title: "Custom Software Development",
    description: "Build enterprise-grade applications designed for scalability, security, and user experience.",
    icon: faCode,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    overview: `Our Custom Software Development services deliver enterprise-grade applications tailored to your unique requirements. We follow agile methodologies and best practices to build scalable, secure, and maintainable software.`,
    offerings: [
      { title: "Full-Stack Development", description: "Build modern web applications with React, Node.js, and cloud-native technologies." },
      { title: "API Design & Integration", description: "Create robust APIs and integrate with third-party systems." },
      { title: "Salesforce Development", description: "Customize and extend Salesforce to meet your business needs." },
      { title: "Mobile Applications", description: "Develop native and cross-platform mobile apps for iOS and Android." },
      { title: "Legacy Modernization", description: "Upgrade legacy systems to modern architectures without disruption." },
    ],
    benefits: ["Accelerate development with agile methodologies", "Reduce technical debt with modern architectures", "Improve user experience with intuitive interfaces", "Ensure scalability for future growth"],
  },
  {
    slug: "quant-financing",
    title: "Quant Financing",
    description: "Quantitative analysis, algorithmic trading strategies, and financial modeling solutions for modern finance.",
    icon: faChartLine,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    overview: `Our Quant Financing services combine advanced mathematics, statistical analysis, and cutting-edge technology to deliver sophisticated financial solutions. We help financial institutions and enterprises leverage quantitative methods for trading, risk management, and strategic decision-making.`,
    offerings: [
      { title: "Algorithmic Trading Systems", description: "Design and implement automated trading strategies with rigorous backtesting." },
      { title: "Risk Analysis & Modeling", description: "Develop comprehensive risk models for portfolio and market risk assessment." },
      { title: "Portfolio Optimization", description: "Apply mathematical optimization techniques to maximize returns and minimize risk." },
      { title: "Financial Data Analytics", description: "Extract actionable insights from complex financial datasets." },
      { title: "Quantitative Research", description: "Conduct research to discover alpha-generating strategies and market inefficiencies." },
    ],
    benefits: ["Improve trading performance with data-driven strategies", "Reduce risk exposure through sophisticated modeling", "Optimize portfolio allocation for better returns", "Gain competitive edge with advanced analytics"],
  },
  {
    slug: "consulting-outsourcing",
    title: "Consulting & Outsourced Development",
    description: "Strategic technology consulting and dedicated development teams to accelerate your business initiatives.",
    icon: faUserShield,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop",
    overview: `Our Consulting & Outsourced Development services provide organizations with strategic technology guidance and dedicated development teams. We help you accelerate digital initiatives, reduce operational costs, and access world-class talent without the overhead of building in-house teams.`,
    offerings: [
      { title: "Technology Strategy", description: "Develop comprehensive technology roadmaps aligned with business objectives." },
      { title: "Dedicated Development Teams", description: "Access skilled development teams fully dedicated to your projects." },
      { title: "Staff Augmentation", description: "Scale your team quickly with vetted technology professionals." },
      { title: "Project Management", description: "Expert project management to ensure on-time, on-budget delivery." },
      { title: "Technical Advisory", description: "Strategic guidance from experienced technology leaders and architects." },
    ],
    benefits: ["Reduce development costs by up to 50%", "Access global talent pool without recruitment overhead", "Scale teams quickly based on project needs", "Accelerate time-to-market with experienced teams"],
  },
  {
    slug: "business-intelligence",
    title: "Business Intelligence",
    description: "Interactive dashboards, reporting solutions, and data visualization for actionable insights.",
    icon: faChartLine,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&h=600&fit=crop",
    overview: `Our Business Intelligence services transform your data into visual insights that drive better decision-making. We build interactive dashboards, automated reports, and self-service analytics platforms.`,
    offerings: [
      { title: "Dashboard Development", description: "Create interactive dashboards using Power BI, Tableau, or Looker." },
      { title: "Automated Reporting", description: "Build automated report generation and distribution systems." },
      { title: "Self-Service Analytics", description: "Enable business users to explore data independently." },
      { title: "KPI Tracking", description: "Define and monitor key performance indicators across the organization." },
      { title: "Data Storytelling", description: "Present insights in compelling narratives for stakeholders." },
    ],
    benefits: ["Make data-driven decisions faster", "Reduce time spent on manual reporting", "Empower business users with self-service tools", "Improve visibility across the organization"],
  },
  {
    slug: "iot-digital-twins",
    title: "IoT & Digital Twins",
    description: "Connected device ecosystems and digital twin implementations for real-time monitoring.",
    icon: faCubes,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&h=600&fit=crop",
    overview: `Our IoT & Digital Twins services help organizations connect physical assets to digital systems for real-time monitoring, predictive maintenance, and operational optimization.`,
    offerings: [
      { title: "IoT Platform Development", description: "Build scalable platforms for device connectivity and data ingestion." },
      { title: "Digital Twin Creation", description: "Create virtual representations of physical assets and processes." },
      { title: "Predictive Maintenance", description: "Implement ML models to predict equipment failures before they occur." },
      { title: "Edge Computing", description: "Process data at the edge for real-time decision-making." },
      { title: "Asset Tracking", description: "Track location and status of assets across facilities." },
    ],
    benefits: ["Reduce unplanned downtime by up to 50%", "Optimize asset utilization and efficiency", "Enable real-time operational visibility", "Extend equipment lifespan with predictive maintenance"],
  },
  {
    slug: "identity-management",
    title: "Identity & Access Management",
    description: "Single sign-on, multi-factor authentication, and role-based access control systems.",
    icon: faUserShield,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=600&fit=crop",
    overview: `Our Identity & Access Management services help organizations secure user access while providing seamless authentication experiences. We implement modern IAM solutions that protect your enterprise.`,
    offerings: [
      { title: "Single Sign-On (SSO)", description: "Implement SSO for seamless access across applications." },
      { title: "Multi-Factor Authentication", description: "Add additional security layers with MFA solutions." },
      { title: "Role-Based Access Control", description: "Implement granular permissions based on user roles." },
      { title: "Identity Governance", description: "Manage identity lifecycle and access certifications." },
      { title: "Privileged Access Management", description: "Secure and monitor privileged account access." },
    ],
    benefits: ["Reduce security risks from compromised credentials", "Improve user experience with seamless authentication", "Achieve compliance with access control requirements", "Gain visibility into user access patterns"],
  },
  {
    slug: "mobile-development",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless backend integration.",
    icon: faMobileScreen,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop",
    overview: `Our Mobile App Development services deliver high-quality mobile applications for iOS and Android platforms. We build native and cross-platform apps that provide exceptional user experiences.`,
    offerings: [
      { title: "Native iOS Development", description: "Build performant iOS apps using Swift and SwiftUI." },
      { title: "Native Android Development", description: "Develop Android apps using Kotlin and Jetpack Compose." },
      { title: "Cross-Platform Development", description: "Build once, deploy everywhere with React Native or Flutter." },
      { title: "Backend Integration", description: "Connect mobile apps with APIs and backend services." },
      { title: "App Store Optimization", description: "Optimize app listings for discoverability and downloads." },
    ],
    benefits: ["Reach users on their preferred devices", "Deliver consistent experiences across platforms", "Reduce development costs with cross-platform approaches", "Enable offline functionality for better UX"],
  },
  {
    slug: "salesforce",
    title: "Salesforce & CRM Solutions",
    description: "Salesforce implementation, customization, and integration for unified customer relationship management.",
    icon: faLaptopCode,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
    overview: `Our Salesforce & CRM Solutions help organizations maximize their investment in customer relationship management. We implement, customize, and integrate Salesforce to meet your unique business needs.`,
    offerings: [
      { title: "Salesforce Implementation", description: "Deploy Salesforce Sales Cloud, Service Cloud, and Marketing Cloud." },
      { title: "Custom Development", description: "Build custom apps and components on the Salesforce platform." },
      { title: "Integration Services", description: "Connect Salesforce with ERP, marketing, and other systems." },
      { title: "Data Migration", description: "Migrate data from legacy CRM systems to Salesforce." },
      { title: "Training & Adoption", description: "Train users and drive adoption across the organization." },
    ],
    benefits: ["Improve sales productivity and win rates", "Enhance customer service and satisfaction", "Gain 360-degree view of customer relationships", "Automate marketing campaigns and lead nurturing"],
  },
  {
    slug: "research-development",
    title: "Research & Development",
    description: "Cutting-edge R&D services to drive innovation and develop next-generation technologies for your business.",
    icon: faMicrochip,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=600&fit=crop",
    overview: `Our Research & Development services help organizations stay ahead of the curve by exploring emerging technologies and developing innovative solutions. We combine deep technical expertise with strategic thinking to turn ideas into market-ready products.`,
    offerings: [
      { title: "Technology Research", description: "Explore emerging technologies and assess their potential for your business." },
      { title: "Prototype Development", description: "Build rapid prototypes to validate concepts and gather feedback." },
      { title: "Innovation Labs", description: "Establish dedicated innovation labs to foster creativity and experimentation." },
      { title: "Proof of Concept", description: "Develop POCs to demonstrate feasibility and secure stakeholder buy-in." },
      { title: "Emerging Technologies", description: "Stay ahead with blockchain, quantum computing, and other frontier technologies." },
    ],
    benefits: ["Accelerate innovation with structured R&D processes", "Reduce risk with rapid prototyping and validation", "Gain competitive advantage through technology leadership", "Transform ideas into market-ready solutions"],
  },
  {
    slug: "talent-management",
    title: "Talent Management",
    description: "Comprehensive talent acquisition, development, and retention strategies to build high-performing teams.",
    icon: faUserShield,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop",
    overview: `Our Talent Management services help organizations attract, develop, and retain top technology talent. We provide comprehensive solutions from talent acquisition to performance management, ensuring you have the right people to drive your digital initiatives.`,
    offerings: [
      { title: "Talent Acquisition", description: "Source and recruit top technology professionals through our global network." },
      { title: "Team Development", description: "Build and develop high-performing teams through training and mentorship." },
      { title: "Performance Management", description: "Implement effective performance management systems and processes." },
      { title: "Skills Assessment", description: "Evaluate technical and soft skills to identify gaps and opportunities." },
      { title: "Career Pathing", description: "Develop career progression frameworks to retain top talent." },
    ],
    benefits: ["Access global technology talent pool", "Reduce hiring time and costs", "Improve employee retention rates", "Build high-performing, engaged teams"],
  },
];

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/#what-we-do"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black inline-flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Services
            </Link>
          </div>

          <FadeInUp>
            {/* Hero Image */}
            <div className="relative h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-8 sm:mb-12">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zen rounded-xl flex items-center justify-center text-black shadow-lg">
                    <FontAwesomeIcon icon={service.icon} className="text-2xl sm:text-3xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">
                      {service.title}
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base max-w-2xl hidden sm:block">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Description */}
            <p className="text-gray-500 text-base sm:hidden mb-8 px-1">
              {service.description}
            </p>
          </FadeInUp>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <FadeInUp>
                {/* Overview */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">Overview</h2>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {service.overview}
                  </p>
                </section>
              </FadeInUp>

              <FadeInUp>
                {/* Offerings */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
                    What We Offer
                  </h2>
                  <div className="space-y-6">
                    {service.offerings.map((offering, index) => (
                      <div key={index} className="border-l-4 border-zen pl-6 py-2">
                        <h3 className="font-bold text-black text-lg mb-2">
                          {offering.title}
                        </h3>
                        <p className="text-gray-500">
                          {offering.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeInUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FadeInUp>
                {/* Benefits */}
                <div className="sticky top-32">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 mb-8">
                    <h2 className="text-lg font-bold text-black mb-4">
                      Key Benefits
                    </h2>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-zen mt-1 shrink-0"
                          />
                          <span className="text-gray-600 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA - GRADIENT DESIGN */}
                  <div className="relative overflow-hidden rounded-xl border border-zen/30 bg-gradient-to-br from-zen/10 via-white to-zen/5 p-6 sm:p-8 text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zen/20 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-black mb-3">
                        Ready to Get Started?
                      </h3>
                      <p className="text-gray-500 text-sm mb-6">
                        Let&apos;s discuss how we can help transform your business.
                      </p>
                      <a
                        href="/#contact"
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                      >
                        Contact Us
                        <FontAwesomeIcon icon={faArrowRight} />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

