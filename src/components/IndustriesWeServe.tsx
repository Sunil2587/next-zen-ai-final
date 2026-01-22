"use client";

import { FadeInUp, Carousel } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLandmarkDome,
  faMicroscope,
  faGear,
  faTruckRampBox,
  faShoppingCart,
  faArrowRight,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

const industries = [
  {
    icon: faLandmarkDome,
    name: "Finance & Banking",
    items: ["Risk Analytics", "Fraud Detection", "Regulatory Compliance", "Algorithmic Trading"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", // Finance analytics dashboard
  },
  {
    icon: faMicroscope,
    name: "Healthcare & Pharma",
    items: ["Clinical Data Management", "Drug Discovery AI", "Patient Care Optimization", "HIPAA Compliance"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop", // Medical technology
  },
  {
    icon: faGear,
    name: "Manufacturing",
    items: ["Smart Factory Solutions", "Predictive Maintenance", "Supply Chain AI", "Quality Control"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop", // Smart manufacturing technology
  },
  {
    icon: faTruckRampBox,
    name: "Logistics & Supply Chain",
    items: ["Route Optimization", "Warehouse Automation", "Real-time Tracking", "Demand Forecasting"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop", // Logistics warehouse automation
  },
  {
    icon: faShoppingCart,
    name: "Retail & E-commerce",
    items: ["Personalization Engines", "Inventory Management", "Customer Analytics", "Omnichannel Solutions"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", // Online shopping digital commerce
  },
];

export default function IndustriesWeServe() {
  return (
    <section id="industries" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] mb-4 px-4 py-2 rounded-full">
              Industries We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 sm:mb-6">
              Transforming Global Industries
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto">
              Deep domain expertise across diverse sectors, delivering tailored
              solutions for unique industry challenges and regulatory requirements.
            </p>
          </div>
        </FadeInUp>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <Carousel showArrows={false} autoPlay autoPlayInterval={4500}>
            {industries.map((industry, index) => (
              <div key={index} className="px-2">
                <div className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-zen transition-all duration-300 flex flex-col mx-auto max-w-[320px]">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zen rounded-lg flex items-center justify-center text-black shadow-lg">
                          <FontAwesomeIcon icon={industry.icon} className="text-sm" />
                        </div>
                        <h3 className="text-white font-bold text-lg">
                          {industry.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <ul className="space-y-2">
                      {industry.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-zen shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {industries.map((industry, index) => (
            <FadeInUp key={index}>
              <div className="group bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-zen hover:shadow-md transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zen rounded-lg flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={industry.icon} className="text-sm" />
                      </div>
                      <h3 className="text-white font-bold text-lg sm:text-xl">
                        {industry.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-grow">
                  <ul className="space-y-2">
                    {industry.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-zen shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* CTA Section - GRADIENT DESIGN */}
        <FadeInUp>
          <div className="mt-16 sm:mt-20 relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Gradient Orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-zen/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-zen/10 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 sm:p-12 md:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] text-[10px] mb-4 px-4 py-2 rounded-full">
                  Let&apos;s Connect
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4">
                  Partner With Industry Experts
                </h3>
                <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                  Ready to see how our solutions can revolutionize your business?
                  Let&apos;s discuss your specific challenges and opportunities.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    Book a Consultation
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-black border-2 border-black rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-black hover:text-white transition-all"
                  >
                    Contact Us
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

