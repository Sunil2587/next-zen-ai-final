"use client";

import { FadeInUp, Carousel } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faChartLine,
  faCloud,
  faShieldHalved,
  faRobot,
  faCode,
  faArrowRight,
  faMicrochip,
  faCubes,
  faUserShield,
  faMobileScreen,
  faLaptopCode,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const services = [
  {
    slug: "ai-strategy",
    icon: faBrain,
    title: "AI Strategy & Implementation",
    description: "Transform your business with AI-powered solutions tailored to your specific needs and industry requirements.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop", // AI neural network visualization
  },
  {
    slug: "machine-learning",
    icon: faMicrochip,
    title: "Machine Learning Solutions",
    description: "Custom ML model development, training, and deployment for predictive analytics and intelligent applications.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop", // AI robot face
  },
  {
    slug: "cloud-infrastructure",
    icon: faCloud,
    title: "Cloud Infrastructure",
    description: "Build scalable, secure, and cost-effective cloud environments across AWS, Azure, and Google Cloud.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop", // Cloud computing network
  },
  {
    slug: "cybersecurity",
    icon: faShieldHalved,
    title: "Cybersecurity & Compliance",
    description: "Protect your enterprise with comprehensive security solutions and regulatory compliance frameworks.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop", // Digital security lock
  },
  {
    slug: "intelligent-automation",
    icon: faRobot,
    title: "Intelligent Automation",
    description: "Streamline operations and reduce costs with AI-powered automation across your organization.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop", // Robot automation arm
  },
  {
    slug: "data-analytics",
    icon: faDatabase,
    title: "Data Engineering & Analytics",
    description: "Unlock insights from your data with advanced analytics, visualization, and data engineering solutions.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop", // Data visualization screens
  },
  {
    slug: "software-development",
    icon: faCode,
    title: "Custom Software Development",
    description: "Build enterprise-grade applications designed for scalability, security, and user experience.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop", // Code on screen
  },
  {
    slug: "quant-financing",
    icon: faChartLine,
    title: "Quant Financing",
    description: "Quantitative analysis, algorithmic trading strategies, and financial modeling solutions for modern finance.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop", // Stock trading charts
  },
  {
    slug: "consulting-outsourcing",
    icon: faUserShield,
    title: "Consulting & Outsourced Development",
    description: "Strategic technology consulting and dedicated development teams to accelerate your business initiatives.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop", // Business consulting meeting
  },
  {
    slug: "business-intelligence",
    icon: faChartLine,
    title: "Business Intelligence",
    description: "Interactive dashboards, reporting solutions, and data visualization for actionable insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", // Analytics dashboard screens
  },
  {
    slug: "iot-digital-twins",
    icon: faCubes,
    title: "IoT & Digital Twins",
    description: "Connected device ecosystems and digital twin implementations for real-time monitoring.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&h=400&fit=crop", // IoT connected devices
  },
  {
    slug: "identity-management",
    icon: faUserShield,
    title: "Identity & Access Management",
    description: "Single sign-on, multi-factor authentication, and role-based access control systems.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", // Secure access authentication
  },
  {
    slug: "mobile-development",
    icon: faMobileScreen,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless backend integration.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop", // Mobile app development
  },
  {
    slug: "salesforce",
    icon: faLaptopCode,
    title: "Salesforce & CRM Solutions",
    description: "Salesforce implementation, customization, and integration for unified customer relationship management.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop", // Team working on CRM
  },
  {
    slug: "research-development",
    icon: faMicrochip,
    title: "Research & Development",
    description: "Cutting-edge R&D services to drive innovation and develop next-generation technologies for your business.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop", // Scientist with technology
  },
  {
    slug: "talent-management",
    icon: faUserShield,
    title: "Talent Management",
    description: "Comprehensive talent acquisition, development, and retention strategies to build high-performing teams.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop", // Team collaboration
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 sm:mb-6">
              What We Do
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Comprehensive technology solutions designed to accelerate your business growth
            </p>
          </div>
        </FadeInUp>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <Carousel showArrows={false} autoPlay autoPlayInterval={4000}>
            {services.map((service, index) => (
              <div key={index} className="px-2">
                <Link href={`/services/${service.slug}`} className="block h-full group">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-zen hover:shadow-lg transition-all duration-300 flex flex-col mx-auto max-w-[320px]">
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="w-12 h-12 bg-zen rounded-lg flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
                          <FontAwesomeIcon icon={service.icon} className="text-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-black mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-black text-sm font-semibold group-hover:gap-3 transition-all">
                        Learn More
                        <FontAwesomeIcon icon={faArrowRight} className="text-zen" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, index) => (
            <FadeInUp key={index} delay={index * 50}>
              <Link href={`/services/${service.slug}`} className="block h-full group">
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden h-full hover:border-zen hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  {/* Image */}
                  <div className="relative h-32 sm:h-36 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="w-10 h-10 bg-zen rounded-lg flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={service.icon} className="text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex-grow flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-black mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-black text-sm font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <FontAwesomeIcon icon={faArrowRight} className="text-zen" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-900 transition-all"
            >
              View All Services
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

