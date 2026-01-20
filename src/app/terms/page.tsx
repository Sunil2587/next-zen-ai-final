"use client";

import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Background />
      <Header />
      <main className="flex-1 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/"
              className="text-zen text-xs uppercase tracking-widest font-bold hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

          <FadeInUp>
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-500">
                Last updated: January 2, 2026
              </p>
            </div>
          </FadeInUp>

          <FadeInUp>
            <div className="prose prose-gray max-w-none">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 md:p-10 space-y-8">
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing or using the services provided by Next Zen AI Strategix LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    2. Services
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Next Zen AI Strategix LLC provides technology consulting services including AI strategy, cloud infrastructure, cybersecurity, data analytics, and custom software development. The specific scope of services will be defined in individual service agreements.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    3. Intellectual Property
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    All content on this website, including text, graphics, logos, and software, is the property of Next Zen AI Strategix LLC and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    4. User Responsibilities
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    When using our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the confidentiality of any account credentials</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not attempt to interfere with or disrupt our services</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    5. Limitation of Liability
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    To the maximum extent permitted by law, Next Zen AI Strategix LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services. Our total liability shall not exceed the amount paid by you for the services in question.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    6. Confidentiality
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of our engagement. This obligation shall survive the termination of any service agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    7. Termination
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to terminate or suspend access to our services at any time, with or without cause, and with or without notice. Upon termination, your right to use our services will immediately cease.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    8. Governing Law
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the State of New Jersey, United States, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    9. Changes to Terms
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    10. Contact Us
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="text-gray-900 font-semibold mt-2">
                    info@nextzenaistrategix.com
                  </p>
                </section>
              </div>
            </div>
          </FadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}

