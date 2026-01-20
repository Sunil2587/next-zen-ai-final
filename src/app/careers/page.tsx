"use client";

import { useState, useEffect } from "react";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faArrowRight,
  faBuilding,
  faBriefcase,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { getJobs, Job } from "@/lib/supabase";

const officeInfo = {
  usa: {
    name: "United States",
    company: "Next Zen AI Strategix",
    address: "97 Newkirk Street, Suite 341, Jersey City, NJ 07306",
    flag: "🇺🇸",
  },
  india: {
    name: "India",
    company: "Nextzen AI Strategix Private Limited",
    address: "4th Floor, Aparna Astute, Jubilee Hills, Hyderabad 500096",
    flag: "🇮🇳",
  },
};

const benefits = [
  {
    title: "Competitive Compensation",
    description: "Industry-leading salaries with performance bonuses",
  },
  {
    title: "Remote Flexibility",
    description: "Work from anywhere with flexible hours",
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision coverage",
  },
  {
    title: "Learning & Growth",
    description: "Professional development and certification support",
  },
  {
    title: "Cutting-Edge Projects",
    description: "Work on innovative AI and cloud projects",
  },
  {
    title: "Global Team",
    description: "Collaborate with experts across USA and India",
  },
];

export default function Careers() {
  const [selectedLocation, setSelectedLocation] = useState<"usa" | "india">("usa");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const office = officeInfo[selectedLocation];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await getJobs(selectedLocation);
      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };
    fetchJobs();
  }, [selectedLocation]);

  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <FadeInUp>
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <span className="inline-block bg-black text-white font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-4 px-4 py-2 rounded-full">
                Join Our Team
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-black mb-4 sm:mb-6 tracking-tight px-2">
                Build the Future of Enterprise AI
              </h1>
              <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Join a team of innovators driving digital transformation for
                global enterprises. We're looking for passionate individuals
                ready to make an impact.
              </p>
            </div>
          </FadeInUp>

          {/* Benefits Section */}
          <FadeInUp>
            <section className="mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-8 sm:mb-10 text-center">
                Why Work With Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 hover:border-zen transition-all">
                    <h3 className="text-base sm:text-lg font-bold text-black mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </FadeInUp>

          {/* Open Positions Section */}
          <FadeInUp>
            <section>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-8 sm:mb-10 text-center">
                Open Positions
              </h2>

              {/* Location Tabs */}
              <div className="flex justify-center mb-8 sm:mb-10">
                <div className="inline-flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedLocation("usa")}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-all ${
                      selectedLocation === "usa"
                        ? "bg-black text-white"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    <span className="text-base sm:text-lg">🇺🇸</span>
                    <span>USA</span>
                  </button>
                  <button
                    onClick={() => setSelectedLocation("india")}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-all ${
                      selectedLocation === "india"
                        ? "bg-black text-white"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    <span className="text-base sm:text-lg">🇮🇳</span>
                    <span>India</span>
                  </button>
                </div>
              </div>

              {/* Office Info Card */}
              <div className="bg-zen/10 border border-zen/30 rounded-lg p-4 sm:p-6 mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 bg-zen rounded-lg flex items-center justify-center text-black shrink-0">
                  <FontAwesomeIcon icon={faBuilding} className="text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black mb-1">{office.company}</h3>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="text-zen" />
                    {office.address}
                  </p>
                </div>
                <span className="text-4xl">{office.flag}</span>
              </div>

              {/* Jobs Count */}
              <div className="flex items-center gap-2 mb-6 text-gray-500 text-sm">
                <FontAwesomeIcon icon={faBriefcase} className="text-zen" />
                <span>{loading ? "Loading..." : `${jobs.length} open positions`}</span>
              </div>

              {/* Positions List */}
              <div className="space-y-4 sm:space-y-5">
                {loading ? (
                  <div className="text-center py-12">
                    <FontAwesomeIcon icon={faSpinner} className="text-3xl text-zen animate-spin" />
                    <p className="text-gray-500 mt-4">Loading positions...</p>
                  </div>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/careers/job/${job.id}`}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 group cursor-pointer block hover:border-zen hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-gray-700 transition-colors">
                              {job.title}
                            </h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                              {job.department}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faLocationDot} className="text-zen" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faClock} className="text-zen" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-zen text-black rounded-md font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all group-hover:gap-3">
                            Apply
                            <FontAwesomeIcon icon={faArrowRight} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No open positions in this location currently.</p>
                  </div>
                )}
              </div>
            </section>
          </FadeInUp>

          {/* Contact Section - GRADIENT DESIGN */}
          <FadeInUp>
            <section className="mt-16 sm:mt-20 md:mt-24 text-center">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-zen/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-zen/10 rounded-full blur-3xl" />
                <div className="relative z-10 p-8 sm:p-10 md:p-16">
                  <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] text-[10px] mb-4 px-4 py-2 rounded-full">
                    Open Applications
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4">
                    Don't See a Fit?
                  </h2>
                  <p className="text-gray-500 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                    We're always looking for talented individuals. Send us your
                    resume and we'll keep you in mind for future opportunities.
                  </p>
                  <a
                    href="mailto:hr@nextzenaistrategix.com"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Send Your Resume
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                  <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
                    hr@nextzenaistrategix.com
                  </p>
                </div>
              </div>
            </section>
          </FadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}

