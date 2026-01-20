"use client";

import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChartLine,
  faCalculator,
  faBrain,
  faShieldHalved,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function QuantFinanceResearch() {
  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/services"
              className="text-zen text-xs uppercase tracking-widest font-bold hover:underline inline-flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Services
            </Link>
          </div>

          <FadeInUp>
            {/* Header */}
            <div className="card-container p-6 sm:p-8 md:p-10 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="w-16 h-16 bg-zen/10 rounded-xl flex items-center justify-center text-zen shrink-0">
                  <FontAwesomeIcon icon={faChartLine} className="text-3xl" />
                </div>
                <div className="flex-1">
                  <span className="text-zen font-bold uppercase tracking-widest text-[10px] mb-2 block">
                    Specialized Service
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                    Quantitative Finance Research
                  </h1>
                  <p className="text-gray-500 text-base sm:text-lg">
                    Advanced quantitative research and analytics for financial
                    institutions, hedge funds, and asset managers.
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp>
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="card-container p-6 sm:p-8">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our Quantitative Finance Research service combines
                  cutting-edge data science, machine learning, and deep
                  financial expertise to provide actionable insights for trading
                  strategies, risk management, and investment decisions.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We work with hedge funds, proprietary trading firms, asset
                  managers, and investment banks to develop sophisticated
                  quantitative models that drive alpha generation and risk
                  mitigation.
                </p>
              </div>
            </section>
          </FadeInUp>

          <FadeInUp>
            {/* Capabilities */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Our Capabilities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card-container p-6">
                  <div className="w-12 h-12 bg-zen/10 rounded-xl flex items-center justify-center text-zen mb-4">
                    <FontAwesomeIcon icon={faCalculator} className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Algorithmic Trading
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Design and backtest automated trading strategies using
                    statistical and machine learning approaches.
                  </p>
                </div>
                <div className="card-container p-6">
                  <div className="w-12 h-12 bg-zen/10 rounded-xl flex items-center justify-center text-zen mb-4">
                    <FontAwesomeIcon icon={faBrain} className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    ML for Finance
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Apply deep learning and reinforcement learning for price
                    prediction, sentiment analysis, and portfolio optimization.
                  </p>
                </div>
                <div className="card-container p-6">
                  <div className="w-12 h-12 bg-zen/10 rounded-xl flex items-center justify-center text-zen mb-4">
                    <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Risk Analytics
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Develop VaR models, stress testing frameworks, and
                    real-time risk monitoring systems.
                  </p>
                </div>
                <div className="card-container p-6">
                  <div className="w-12 h-12 bg-zen/10 rounded-xl flex items-center justify-center text-zen mb-4">
                    <FontAwesomeIcon icon={faChartLine} className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Alpha Research
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Identify and validate alpha signals using alternative data
                    sources and factor modeling.
                  </p>
                </div>
              </div>
            </section>
          </FadeInUp>

          <FadeInUp>
            {/* Key Benefits */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Key Benefits
              </h2>
              <div className="card-container p-6 sm:p-8">
                <ul className="space-y-3">
                  {[
                    "Access to PhD-level quants with industry experience",
                    "Rigorous backtesting and validation methodologies",
                    "Integration with major execution and data platforms",
                    "Confidential and secure research processes",
                    "Flexible engagement models from research to production",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-zen mt-1"
                      />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </FadeInUp>

          <FadeInUp>
            {/* CTA */}
            <div className="card-container p-8 sm:p-10 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Interested in Quant Research?
              </h2>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Contact us to discuss how our quantitative research capabilities
                can enhance your investment process.
              </p>
              <a
                href="/#contact"
                className="btn-zen inline-flex items-center gap-2"
              >
                Schedule a Consultation
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </FadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}

