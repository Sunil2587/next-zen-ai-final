"use client";

import { FadeInUp } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faRocket,
  faShieldHalved,
  faUsers,
  faChartLine,
  faClock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const reasons = [
  {
    icon: faBrain,
    title: "AI-First Approach",
    description:
      "We don't just implement AI—we think AI. Our solutions are designed from the ground up to leverage machine learning and intelligent automation.",
  },
  {
    icon: faRocket,
    title: "Rapid Deployment",
    description:
      "Our proven methodologies and pre-built accelerators enable faster time-to-value, with POCs delivered in weeks, not months.",
  },
  {
    icon: faShieldHalved,
    title: "Enterprise Security",
    description:
      "Security is baked into everything we do. We implement zero-trust architectures and maintain compliance with major regulations.",
  },
  {
    icon: faUsers,
    title: "Dedicated Teams",
    description:
      "You get a committed team of experts who understand your business, not rotating consultants who disappear after kickoff.",
  },
  {
    icon: faChartLine,
    title: "Measurable ROI",
    description:
      "We define success metrics upfront and track them throughout the engagement. Every dollar invested shows clear returns.",
  },
  {
    icon: faClock,
    title: "24/7 Global Support",
    description:
      "With teams in the US and India, we provide round-the-clock support to keep your mission-critical systems running smoothly.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block bg-black text-white font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] mb-4 px-4 py-2 rounded-full">
              Why Industry Chooses Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 sm:mb-6">
              The Next Zen Advantage
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto">
              We're not just another consulting firm. We're your strategic
              partner in navigating the complex landscape of enterprise technology transformation.
            </p>
          </div>
        </FadeInUp>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map((reason, index) => (
            <FadeInUp key={index}>
              <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 hover:border-zen hover:shadow-md transition-all group h-full">
                <div className="w-14 h-14 bg-zen rounded-lg flex items-center justify-center text-black mb-5 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={reason.icon} className="text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {reason.description}
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
              Get Started
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

