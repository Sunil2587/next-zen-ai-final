"use client";

import { useState } from "react";
import { FadeInUp } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  {
    question: "What industries do you specialize in?",
    answer:
      "We serve 20+ industries including Finance & Private Equity, Healthcare & Pharma, Manufacturing, Logistics, Retail, and Technology. Our solutions are tailored to meet the unique regulatory and operational requirements of each sector.",
  },
  {
    question: "How long does a typical AI implementation take?",
    answer:
      "Implementation timelines vary based on scope and complexity. A proof-of-concept can be delivered in 4-6 weeks, while enterprise-wide deployments typically range from 3-9 months. We provide detailed timelines during the discovery phase.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes, we provide 24/7 enterprise-grade support with dedicated account managers, proactive monitoring, and continuous optimization services. Our support tiers include Standard, Premium, and Enterprise levels to match your needs.",
  },
  {
    question: "What cloud platforms do you work with?",
    answer:
      "We are certified partners with all major cloud providers including AWS, Microsoft Azure, Google Cloud Platform, and Oracle Cloud. We also specialize in hybrid and multi-cloud architectures for maximum flexibility.",
  },
  {
    question: "How do you ensure data security and compliance?",
    answer:
      "Security is foundational to everything we build. We implement zero-trust architectures, end-to-end encryption, and comply with major regulations including GDPR, HIPAA, SOC 2, and industry-specific standards. All projects undergo rigorous security audits.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible engagement models including fixed-price projects, time & materials, and managed services retainers. Pricing is determined based on project scope, complexity, and duration. Contact us for a customized quote.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <span className="text-zen font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] mb-2 block">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2 sm:mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Everything you need to know about our services and how we work.
            </p>
          </div>
        </FadeInUp>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => (
            <FadeInUp key={index}>
              <div className="card-container overflow-hidden">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left group"
                >
                  <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900 pr-4 group-hover:text-zen transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 bg-zen/10 rounded-lg flex items-center justify-center text-zen shrink-0 transition-all duration-500 ${
                      openIndex === index ? "rotate-180 bg-zen/20" : ""
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
                  >
                    <FontAwesomeIcon
                      icon={openIndex === index ? faMinus : faPlus}
                      className="text-xs sm:text-sm transition-transform duration-300"
                    />
                  </div>
                </button>
                <div
                  className="accordion-content"
                  style={{
                    maxHeight: openIndex === index ? "400px" : "0px",
                    opacity: openIndex === index ? 1 : 0,
                    paddingBottom: openIndex === index ? "1.25rem" : "0",
                  }}
                >
                  <p className="px-4 sm:px-5 text-gray-500 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

