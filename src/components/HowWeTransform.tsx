"use client";

import { FadeInUp } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faCode,
  faRocket,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    number: "01",
    icon: faLightbulb,
    title: "Discovery & Strategy",
    description:
      "We begin with a comprehensive assessment of your current infrastructure, business goals, and technical requirements to craft a tailored transformation roadmap.",
  },
  {
    number: "02",
    icon: faCode,
    title: "Design & Development",
    description:
      "Our expert teams architect and build scalable solutions using cutting-edge technologies, ensuring seamless integration with your existing systems.",
  },
  {
    number: "03",
    icon: faRocket,
    title: "Deployment & Integration",
    description:
      "We execute a phased rollout with rigorous testing, comprehensive training, and change management to ensure smooth adoption.",
  },
  {
    number: "04",
    icon: faChartLine,
    title: "Optimization & Scale",
    description:
      "Post-deployment, we continuously monitor, optimize, and scale your solutions to maximize ROI and adapt to evolving needs.",
  },
];

export default function HowWeTransform() {
  return (
    <section id="how-we-transform" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] mb-4 px-4 py-2 rounded-full">
              How We Transform
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 sm:mb-6">
              Our Proven Methodology
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto">
              A battle-tested approach refined through successful enterprise
              transformations worldwide, delivering consistent results every time.
            </p>
          </div>
        </FadeInUp>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <FadeInUp key={index}>
                <div className="relative group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 w-12 h-12 sm:w-14 sm:h-14 bg-zen rounded-full flex items-center justify-center z-10 shadow-lg group-hover:bg-black transition-all">
                    <span className="text-black font-mono font-bold text-sm sm:text-base group-hover:text-zen transition-all">
                      {step.number}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 pt-10 sm:pt-12 h-full hover:border-zen hover:shadow-md transition-all">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zen rounded-lg flex items-center justify-center text-black mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="text-2xl sm:text-3xl"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

