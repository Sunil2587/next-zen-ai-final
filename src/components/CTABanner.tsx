"use client";

import { FadeInUp } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-8 sm:py-10 md:py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border-[1.5px] border-black shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)] p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-zen/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-zen/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              <span className="text-zen font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] mb-3 block">
                Ready to Transform?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3 sm:mb-4">
                Let's Build Your{" "}
                <span className="text-zen">Digital Future</span> Together
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-5 sm:mb-6">
                Schedule a free consultation with our experts and discover how
                AI-powered solutions can accelerate your business growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 text-xs sm:text-sm bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all"
                >
                  Start Your Journey
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <Link
                  href="/insights"
                  className="text-gray-500 hover:text-zen transition-colors text-sm sm:text-base font-medium"
                >
                  Explore Case Studies →
                </Link>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

