"use client";

import { useState, useEffect } from "react";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSpinner,
  faEye,
  faDownload,
  faFilter,
  faUser,
  faBriefcase,
  faCalendar,
  faEnvelope,
  faPhone,
  faCheck,
  faTimes,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface ApplicationWithJob {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  years_experience?: number;
  status: string;
  created_at: string;
  visa_status?: string;
  requires_sponsorship?: boolean;
  jobs: {
    id: string;
    title: string;
    department: string;
    location: string;
    location_country: string;
  };
}

export default function AdminApplications() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationWithJob | null>(null);
  const [filter, setFilter] = useState<"all" | "usa" | "india">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        fetchApplications();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("job_applications")
      .select(`
        *,
        jobs (
          id,
          title,
          department,
          location,
          location_country
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data as ApplicationWithJob[]);
    }
  };

  const updateStatus = async (applicationId: string, newStatus: string) => {
    const { error } = await supabase
      .from("job_applications")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", applicationId);

    if (!error) {
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter !== "all" && app.jobs?.location_country !== filter) return false;
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "reviewing": return "bg-blue-100 text-blue-800";
      case "interviewed": return "bg-purple-100 text-purple-800";
      case "offered": return "bg-green-100 text-green-800";
      case "hired": return "bg-green-200 text-green-900";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto text-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-zen animate-spin" />
            <p className="text-gray-500 mt-4">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-lg mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-black mb-4">Admin Access Required</h1>
            <p className="text-gray-500 mb-8">Please sign in to view applications.</p>
            <button
              onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all"
            >
              Sign In with Google
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link
              href="/careers"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black inline-flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Careers
            </Link>
          </div>

          <FadeInUp>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black">
                  Career Applications
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Location Filter */}
                <div className="inline-flex bg-gray-100 rounded-md p-1">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                      filter === "all" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("usa")}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                      filter === "usa" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    🇺🇸 USA
                  </button>
                  <button
                    onClick={() => setFilter("india")}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                      filter === "india" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    🇮🇳 India
                  </button>
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 bg-gray-100 border-0 rounded-md text-xs font-bold uppercase tracking-wider"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="offered">Offered</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Applications List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No applications found.</p>
                  </div>
                ) : (
                  filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApplication(app)}
                      className={`bg-gray-50 border rounded-lg p-5 cursor-pointer transition-all hover:shadow-md ${
                        selectedApplication?.id === app.id
                          ? "border-zen bg-zen/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-black truncate">{app.full_name}</h3>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{app.jobs?.title}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faEnvelope} />
                              {app.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faCalendar} />
                              {new Date(app.created_at).toLocaleDateString()}
                            </span>
                            <span>
                              {app.jobs?.location_country === "usa" ? "🇺🇸" : "🇮🇳"}
                            </span>
                          </div>
                        </div>
                        <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Application Detail */}
              <div className="lg:col-span-1">
                {selectedApplication ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-28">
                    <h3 className="font-bold text-black text-lg mb-4">Application Details</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Applicant</p>
                        <p className="text-black font-medium">{selectedApplication.full_name}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Position</p>
                        <p className="text-black font-medium">{selectedApplication.jobs?.title}</p>
                        <p className="text-gray-500 text-sm">{selectedApplication.jobs?.department}</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Contact</p>
                        <p className="text-black text-sm">{selectedApplication.email}</p>
                        {selectedApplication.phone && (
                          <p className="text-black text-sm">{selectedApplication.phone}</p>
                        )}
                      </div>

                      {selectedApplication.years_experience && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Experience</p>
                          <p className="text-black text-sm">{selectedApplication.years_experience} years</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.linkedin_url && (
                          <a
                            href={selectedApplication.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-all"
                          >
                            LinkedIn
                            <FontAwesomeIcon icon={faExternalLink} className="text-[10px]" />
                          </a>
                        )}
                        {selectedApplication.portfolio_url && (
                          <a
                            href={selectedApplication.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-all"
                          >
                            Portfolio
                            <FontAwesomeIcon icon={faExternalLink} className="text-[10px]" />
                          </a>
                        )}
                        {selectedApplication.resume_url && (
                          <a
                            href={selectedApplication.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-zen text-black rounded text-xs font-medium hover:brightness-110 transition-all"
                          >
                            <FontAwesomeIcon icon={faDownload} />
                            Resume
                          </a>
                        )}
                      </div>

                      {/* USA Immigration Info */}
                      {selectedApplication.jobs?.location_country === "usa" && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Immigration</p>
                          <div className="space-y-1 text-sm">
                            {selectedApplication.visa_status && (
                              <p className="text-black">
                                Status: <span className="font-medium">{selectedApplication.visa_status}</span>
                              </p>
                            )}
                            <p className="text-black">
                              Needs Sponsorship: {selectedApplication.requires_sponsorship ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Status Update */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Update Status</p>
                        <select
                          value={selectedApplication.status}
                          onChange={(e) => updateStatus(selectedApplication.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-zen"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="offered">Offered</option>
                          <option value="hired">Hired</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <FontAwesomeIcon icon={faUser} className="text-3xl text-gray-300 mb-3" />
                    <p className="text-gray-500 text-sm">Select an application to view details</p>
                  </div>
                )}
              </div>
            </div>
          </FadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}

