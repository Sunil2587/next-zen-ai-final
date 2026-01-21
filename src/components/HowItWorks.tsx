"use client";

import { FadeInUp } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faCode,
  faRocket,
  faChartLine,
  faArrowDown,
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
      "We execute a phased rollout with rigorous testing, training, and change management to ensure smooth adoption across your organization.",
  },
  {
    number: "04",
    icon: faChartLine,
    title: "Optimization & Scale",
    description:
      "Post-deployment, we continuously monitor, optimize, and scale your solutions to maximize ROI and adapt to evolving business needs.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span className="text-zen font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] mb-2 block">
              Our Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2 sm:mb-3">
              How We Deliver Excellence
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto px-2">
              A proven methodology refined through hundreds of successful
              enterprise transformations.
            </p>
          </div>
        </FadeInUp>

        {/* Mobile Vertical Timeline */}
        <div className="block sm:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zen via-gray-300 to-transparent" />

            <div className="space-y-6">
              {steps.map((step, index) => (
                <FadeInUp key={index}>
                  <div className="relative flex gap-4">
                    {/* Step Number Circle */}
                    <div className="relative z-10 shrink-0">
                      <div className="w-12 h-12 bg-zen rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-black font-mono font-bold text-sm">
                          {step.number}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-gray-300">
                          <FontAwesomeIcon icon={faArrowDown} className="text-xs animate-bounce" />
                        </div>
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-zen/10 rounded-lg flex items-center justify-center text-zen">
                          <FontAwesomeIcon icon={step.icon} className="text-lg" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet/Desktop Grid */}
        <div className="hidden sm:block relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-black/20 to-transparent" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <FadeInUp key={index}>
                <div className="relative group">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-zen rounded-full flex items-center justify-center z-10 shadow-lg">
                    <span className="text-black font-mono font-bold text-xs sm:text-sm">
                      {step.number}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 md:p-8 pt-8 sm:pt-10 h-full shadow-sm hover:shadow-md transition-shadow hover:border-black/20">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zen/10 rounded-xl flex items-center justify-center text-zen mb-4 sm:mb-5 group-hover:bg-zen/20 transition-colors">
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="text-xl sm:text-2xl"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
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

