"use client";

import { FadeInUp, ExpandableCard } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faHandshake,
  faRocket,
  faShieldHalved,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const values = [
  {
    icon: faLightbulb,
    title: "Innovation First",
    description:
      "We stay at the forefront of technology, continuously exploring emerging solutions to deliver cutting-edge results for our clients.",
  },
  {
    icon: faHandshake,
    title: "Client Partnership",
    description:
      "We build lasting relationships based on trust, transparency, and a deep understanding of your unique business goals.",
  },
  {
    icon: faRocket,
    title: "Results Driven",
    description:
      "Every project is measured by tangible business outcomes—ROI, efficiency gains, and sustainable competitive advantage.",
  },
  {
    icon: faShieldHalved,
    title: "Security & Compliance",
    description:
      "We prioritize data protection and regulatory compliance in everything we build, deploy, and manage.",
  },
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block bg-black text-white font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] mb-4 px-4 py-2 rounded-full">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 sm:mb-6">
              Pioneering Enterprise Intelligence
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto">
              Next Zen AI Strategix is a global technology consulting firm
              specializing in AI strategy, cloud infrastructure, and digital
              transformation for enterprises across USA and India.
            </p>
          </div>
        </FadeInUp>

        {/* Mission Statement - SUBTLE GRADIENT */}
        <FadeInUp>
          <div className="relative overflow-hidden rounded-2xl border border-zen/30 bg-gradient-to-br from-zen/5 via-white to-zen/10 mb-10 sm:mb-12">
            <div className="absolute top-0 right-0 w-48 h-48 bg-zen/20 rounded-full blur-3xl" />
            <div className="relative z-10 p-8 sm:p-10 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] text-[10px] mb-4 px-4 py-2 rounded-full">
                  Our Mission
                </span>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  To accelerate enterprise growth through intelligent technology solutions
                  that are built for scale, security, and real business impact. We bridge
                  the gap between cutting-edge AI research and practical enterprise
                  applications.
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Mobile Expandable Cards */}
        <div className="block sm:hidden space-y-3">
          {values.map((value, index) => (
            <FadeInUp key={index}>
              <ExpandableCard
                title={value.title}
                icon={<FontAwesomeIcon icon={value.icon} className="text-lg" />}
                preview={value.description.substring(0, 45) + "..."}
                defaultOpen={index === 0}
              >
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </ExpandableCard>
            </FadeInUp>
          ))}
        </div>

        {/* Desktop Values Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {values.map((value, index) => (
            <FadeInUp key={index}>
              <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 h-full hover:border-zen hover:shadow-md transition-all group">
                <div className="w-14 h-14 bg-zen rounded-lg flex items-center justify-center text-black mb-5 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={value.icon} className="text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="text-center mt-12 sm:mt-16">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zen text-black rounded-md font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:brightness-110 transition-all"
            >
              Get In Touch
              <FontAwesomeIcon icon={faUsers} />
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

