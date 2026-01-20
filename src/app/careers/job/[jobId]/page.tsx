"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faArrowLeft,
  faArrowRight,
  faBuilding,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { supabase, Job } from "@/lib/supabase";

export default function JobDetail() {
  const params = useParams();
  const jobId = params.jobId as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();

      if (!error && data) {
        setJob(data);
      }
      setLoading(false);
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  if (loading) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto text-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-zen animate-spin" />
            <p className="text-gray-500 mt-4">Loading job details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
            <p className="text-gray-500 mb-8">This position may no longer be available.</p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Careers
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isUSA = job.location_country === "usa";

  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/careers"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black inline-flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Careers
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeInUp>
                {/* Job Header */}
                <div className="mb-8 sm:mb-10">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-zen/20 text-black px-2 py-1 rounded">
                      {job.type}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faLocationDot} className="text-zen" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="text-zen" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faBuilding} className="text-zen" />
                      {isUSA ? "Next Zen AI Strategix" : "Nextzen AI Strategix Pvt Ltd"}
                    </span>
                  </div>
                </div>

                {/* Job Description - Full Paragraph */}
                {job.full_description && (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-4">Job Description</h2>
                    <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-zen">
                      <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                        {job.full_description}
                      </p>
                    </div>
                  </section>
                )}

                {/* Brief Overview */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-black mb-4">About This Role</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {job.description}
                  </p>
                </section>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-4">Key Responsibilities</h2>
                    <ul className="space-y-3">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FontAwesomeIcon icon={faCheck} className="text-zen mt-1 shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-4">Qualifications & Requirements</h2>
                    <ul className="space-y-3">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FontAwesomeIcon icon={faCheck} className="text-zen mt-1 shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </FadeInUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FadeInUp>
                <div className="sticky top-28">
                  {/* Apply Card */}
                  <div className="relative overflow-hidden rounded-xl border border-zen/30 bg-gradient-to-br from-zen/10 via-white to-zen/5 p-6 sm:p-8 mb-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zen/20 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-black mb-3">
                        Ready to Apply?
                      </h3>
                      <p className="text-gray-500 text-sm mb-6">
                        Join our team and help build the future of enterprise AI.
                      </p>
                      <Link
                        href={`/careers/apply/${job.id}`}
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                      >
                        Apply Now
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-sm font-bold text-black mb-4 uppercase tracking-wider">
                      Job Details
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Location</p>
                        <p className="text-black font-medium">{job.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Department</p>
                        <p className="text-black font-medium">{job.department}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Employment Type</p>
                        <p className="text-black font-medium">{job.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Country</p>
                        <p className="text-black font-medium flex items-center gap-2">
                          <span>{isUSA ? "🇺🇸" : "🇮🇳"}</span>
                          {isUSA ? "United States" : "India"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

