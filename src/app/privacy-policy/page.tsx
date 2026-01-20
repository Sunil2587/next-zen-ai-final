"use client";

import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";

export default function PrivacyPolicy() {
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
                Privacy Policy
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
                    1. Introduction
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Next Zen AI Strategix LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We may collect information about you in a variety of ways, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Personal Data:</strong> Name, email address, phone number, and company information you provide when contacting us or using our services.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                    <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience on our website.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you marketing and promotional communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    4. Data Security
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    5. Third-Party Services
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may share your information with third-party service providers who assist us in operating our website and providing our services. These providers are obligated to maintain the confidentiality of your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    6. Your Rights
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Depending on your location, you may have the following rights:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Access to your personal data</li>
                    <li>Correction of inaccurate data</li>
                    <li>Deletion of your data</li>
                    <li>Objection to processing</li>
                    <li>Data portability</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    7. Contact Us
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at:
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

