"use client";

import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCloud,
  faShieldHalved,
  faRobot,
  faDatabase,
  faCode,
  faArrowRight,
  faMicrochip,
  faChartLine,
  faCubes,
  faUserShield,
  faMobileScreen,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    slug: "ai-strategy",
    icon: faBrain,
    title: "AI Strategy & Implementation",
    description:
      "Transform your business with AI-powered solutions tailored to your specific needs and industry requirements.",
    features: [
      "AI Readiness Assessment",
      "Custom ML Model Development",
      "Generative AI Integration",
      "AI Governance & Ethics",
      "Predictive Analytics",
    ],
  },
  {
    slug: "machine-learning",
    icon: faMicrochip,
    title: "Machine Learning Solutions",
    description:
      "Custom ML model development, training, and deployment for predictive analytics and intelligent applications.",
    features: [
      "Predictive Modeling",
      "Natural Language Processing",
      "Computer Vision",
      "Recommendation Engines",
      "Model Optimization",
    ],
  },
  {
    slug: "cloud-infrastructure",
    icon: faCloud,
    title: "Cloud Infrastructure",
    description:
      "Build scalable, secure, and cost-effective cloud environments across AWS, Azure, and Google Cloud.",
    features: [
      "Cloud Migration & Modernization",
      "Multi-Cloud Architecture",
      "Kubernetes & Containerization",
      "Serverless Solutions",
      "Cloud Cost Optimization",
    ],
  },
  {
    slug: "cybersecurity",
    icon: faShieldHalved,
    title: "Cybersecurity & Compliance",
    description:
      "Protect your enterprise with comprehensive security solutions and regulatory compliance frameworks.",
    features: [
      "Zero-Trust Security",
      "Security Audits & Assessments",
      "Compliance (GDPR, HIPAA, SOC 2)",
      "Threat Detection & Response",
      "Identity & Access Management",
    ],
  },
  {
    slug: "intelligent-automation",
    icon: faRobot,
    title: "Intelligent Automation",
    description:
      "Streamline operations and reduce costs with AI-powered automation across your organization.",
    features: [
      "Robotic Process Automation (RPA)",
      "Intelligent Document Processing",
      "Workflow Automation",
      "Chatbots & Virtual Assistants",
      "Process Mining",
    ],
  },
  {
    slug: "data-analytics",
    icon: faDatabase,
    title: "Data Engineering & Analytics",
    description:
      "Unlock insights from your data with advanced analytics, visualization, and data engineering solutions.",
    features: [
      "Data Strategy & Governance",
      "Data Warehouse & Lakes",
      "Business Intelligence",
      "Real-time Analytics",
      "Data Quality & Integration",
    ],
  },
  {
    slug: "software-development",
    icon: faCode,
    title: "Custom Software Development",
    description:
      "Build enterprise-grade applications designed for scalability, security, and user experience.",
    features: [
      "Full-Stack Development",
      "API Design & Integration",
      "Salesforce Development",
      "Mobile Applications",
      "Legacy Modernization",
    ],
  },
  {
    slug: "quant-financing",
    icon: faChartLine,
    title: "Quant Financing",
    description:
      "Quantitative analysis, algorithmic trading strategies, and financial modeling solutions for modern finance.",
    features: [
      "Algorithmic Trading Systems",
      "Risk Analysis & Modeling",
      "Portfolio Optimization",
      "Financial Data Analytics",
      "Quantitative Research",
    ],
  },
  {
    slug: "consulting-outsourcing",
    icon: faUserShield,
    title: "Consulting & Outsourced Development",
    description:
      "Strategic technology consulting and dedicated development teams to accelerate your business initiatives.",
    features: [
      "Technology Strategy",
      "Dedicated Development Teams",
      "Staff Augmentation",
      "Project Management",
      "Technical Advisory",
    ],
  },
  {
    slug: "business-intelligence",
    icon: faChartLine,
    title: "Business Intelligence",
    description:
      "Interactive dashboards, reporting solutions, and data visualization for actionable insights.",
    features: [
      "Dashboard Development",
      "Automated Reporting",
      "Self-Service Analytics",
      "KPI Tracking",
      "Data Storytelling",
    ],
  },
  {
    slug: "iot-digital-twins",
    icon: faCubes,
    title: "IoT & Digital Twins",
    description:
      "Connected device ecosystems and digital twin implementations for real-time monitoring.",
    features: [
      "IoT Platform Development",
      "Digital Twin Creation",
      "Predictive Maintenance",
      "Edge Computing",
      "Asset Tracking",
    ],
  },
  {
    slug: "identity-management",
    icon: faUserShield,
    title: "Identity & Access Management",
    description:
      "Single sign-on, multi-factor authentication, and role-based access control systems.",
    features: [
      "Single Sign-On (SSO)",
      "Multi-Factor Authentication",
      "Role-Based Access Control",
      "Identity Governance",
      "Privileged Access Management",
    ],
  },
  {
    slug: "mobile-development",
    icon: faMobileScreen,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android with seamless backend integration.",
    features: [
      "Native iOS Development",
      "Native Android Development",
      "Cross-Platform Development",
      "Backend Integration",
      "App Store Optimization",
    ],
  },
  {
    slug: "salesforce",
    icon: faLaptopCode,
    title: "Salesforce & CRM Solutions",
    description:
      "Salesforce implementation, customization, and integration for unified customer relationship management.",
    features: [
      "Salesforce Implementation",
      "Custom Development",
      "Integration Services",
      "Data Migration",
      "Training & Adoption",
    ],
  },
  {
    slug: "research-development",
    icon: faMicrochip,
    title: "Research & Development",
    description:
      "Cutting-edge R&D services to drive innovation and develop next-generation technologies for your business.",
    features: [
      "Technology Research",
      "Prototype Development",
      "Innovation Labs",
      "Proof of Concept",
      "Emerging Technologies",
    ],
  },
  {
    slug: "talent-management",
    icon: faUserShield,
    title: "Talent Management",
    description:
      "Comprehensive talent acquisition, development, and retention strategies to build high-performing teams.",
    features: [
      "Talent Acquisition",
      "Team Development",
      "Performance Management",
      "Skills Assessment",
      "Career Pathing",
    ],
  },
];

export default function Services() {
  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <FadeInUp>
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-block bg-black text-white font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-4 px-4 py-2 rounded-full">
                Our Services
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6 tracking-tight">
                Enterprise Solutions
              </h1>
              <p className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto">
                Comprehensive technology services designed to transform your
                business, optimize operations, and drive sustainable growth.
              </p>
            </div>
          </FadeInUp>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <FadeInUp key={index}>
                <Link href={`/services/${service.slug}`} className="block h-full group">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 h-full hover:border-zen hover:shadow-md transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zen rounded-lg flex items-center justify-center text-black shrink-0 group-hover:bg-black group-hover:text-zen transition-all">
                        <FontAwesomeIcon
                          icon={service.icon}
                          className="text-xl sm:text-2xl"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
                          {service.title}
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Key Capabilities
                      </h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-gray-600 text-sm flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-zen rounded-full shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-4 flex justify-end">
                      <span className="inline-flex items-center gap-2 text-black font-bold text-sm group-hover:gap-3 transition-all">
                        Learn More
                        <FontAwesomeIcon icon={faArrowRight} className="text-zen" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>

          {/* CTA - GRADIENT DESIGN */}
          <FadeInUp>
            <section className="mt-16 sm:mt-20 text-center">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-zen/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-zen/10 rounded-full blur-3xl" />
                <div className="relative z-10 p-10 sm:p-16">
                  <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] text-[10px] mb-4 px-4 py-2 rounded-full">
                    Custom Solutions
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4">
                    Need a Custom Solution?
                  </h2>
                  <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                    Our team will work with you to design and implement a solution
                    tailored to your unique business requirements.
                  </p>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Discuss Your Project
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </div>
              </div>
            </section>
          </FadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}

