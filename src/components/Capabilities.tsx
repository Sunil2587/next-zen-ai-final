"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCloudBolt,
  faShieldHalved,
  faCodeBranch,
  faRobot,
  faVial,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const pillars = [
  {
    icon: faBrain,
    title: "AI Strategy & Implementation",
    description:
      "Aligning AI adoption with core business objectives to deliver cost reduction and advanced predictive forecasting.",
    tag: "Neural Orchestration",
  },
  {
    icon: faCloudBolt,
    title: "Cloud & Infrastructure",
    description:
      "Secure, scalable hybrid environments optimized for enterprise performance, compliance, and multi-region resilience.",
    tag: "Sovereign Deployment",
  },
  {
    icon: faShieldHalved,
    title: "Cybersecurity & Compliance",
    description:
      "Zero-trust security frameworks designed for rigid regulatory standards and persistent data protection.",
    tag: "Enterprise Defense",
  },
];

const matrixItems = [
  {
    icon: faCodeBranch,
    title: "Custom Software & CRM",
    description:
      "Salesforce ecosystems built for performance and enterprise usability.",
    label: "Matrix 01",
  },
  {
    icon: faRobot,
    title: "Intelligent Automation",
    description:
      "RPA, IoT, and Digital Twins designed to streamline repetitive workflows.",
    label: "Matrix 02",
  },
  {
    icon: faVial,
    title: "R&D Future Lab",
    description:
      "Robotics, VR, and Metaverse prototyping for emerging tech sectors.",
    label: "Matrix 03",
  },
];

export default function Capabilities() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);

  return (
    <section id="capabilities" className="py-10 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-zen font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] mb-2">
            Core Competencies
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-gray-900 leading-tight mb-3 sm:mb-4">
            The Digital Transformation Matrix
          </h3>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto px-2">
            We consult, build, and deploy mission-critical solutions across
            global markets as a dedicated technology partner.
          </p>
        </div>

        {/* Mobile Expandable Cards */}
        <div className="block md:hidden space-y-3">
          {/* Pillars - Expandable */}
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Core Pillars</p>
            <div className="space-y-2">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                    expandedPillar === index ? "border-zen shadow-lg" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setExpandedPillar(expandedPillar === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zen rounded-lg flex items-center justify-center text-black shrink-0">
                        <FontAwesomeIcon icon={pillar.icon} className="text-base" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{pillar.title}</h4>
                        <span className="text-[8px] font-black uppercase tracking-widest text-zen">{pillar.tag}</span>
                      </div>
                    </div>
                    <div className={`w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      expandedPillar === index ? "rotate-180 bg-zen" : ""
                    }`}>
                      <FontAwesomeIcon icon={faChevronDown} className={`text-xs ${expandedPillar === index ? "text-black" : "text-gray-500"}`} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedPillar === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <p className="px-4 pb-4 text-xs text-gray-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Matrix Items - Horizontal Scroll */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Innovation Matrix</p>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
              {matrixItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border-[1.5px] border-black shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] p-4 flex-shrink-0 w-[260px] snap-center"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 bg-zen rounded-lg flex items-center justify-center text-black">
                      <FontAwesomeIcon icon={item.icon} className="text-sm" />
                    </div>
                    <span className="text-[7px] font-bold text-gray-500 border border-gray-300 px-2 py-1 rounded uppercase">
                      {item.label}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Pillars */}
          {pillars.map((pillar, index) => (
            <div key={index} className="card-container p-5 sm:p-6 md:p-8 flex flex-col">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-zen rounded-xl flex items-center justify-center text-black mb-5 md:mb-6">
                <FontAwesomeIcon
                  icon={pillar.icon}
                  className="text-lg md:text-xl"
                />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                {pillar.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-5">
                {pillar.description}
              </p>
              <div className="mt-auto pt-4 md:pt-5 border-t border-gray-100">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zen">
                  {pillar.tag}
                </span>
              </div>
            </div>
          ))}

          {/* Matrix Items */}
          {matrixItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-[1.5px] border-black shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] p-5 sm:p-6 md:p-8 flex flex-col group hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.25)] transition-all"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="w-10 h-10 bg-zen rounded-lg flex items-center justify-center text-black">
                  <FontAwesomeIcon icon={item.icon} className="text-base" />
                </div>
                <span className="text-[7px] md:text-[8px] font-bold text-gray-500 border border-gray-300 px-2 py-1 rounded uppercase">
                  {item.label}
                </span>
              </div>
              <h5 className="text-sm md:text-base font-bold text-gray-900 mb-2">
                {item.title}
              </h5>
              <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
