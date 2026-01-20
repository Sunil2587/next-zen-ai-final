"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faSpinner,
  faCheck,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle as faGoogleBrand } from "@fortawesome/free-brands-svg-icons";
import { supabase, Job, submitApplication, uploadResume, signInWithGoogle } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const visaStatusOptions = [
  { value: "us_citizen", label: "U.S. Citizen" },
  { value: "permanent_resident", label: "Permanent Resident (Green Card)" },
  { value: "f1_opt", label: "F-1 (OPT)" },
  { value: "f1_stem_opt", label: "F-1 (STEM OPT)" },
  { value: "h1b", label: "H-1B" },
  { value: "o1", label: "O-1" },
  { value: "l1", label: "L-1" },
  { value: "tn_e3", label: "TN / E-3" },
  { value: "other", label: "Other" },
];

const raceEthnicityOptions = [
  { value: "hispanic_latino", label: "Hispanic or Latino" },
  { value: "white", label: "White (Not Hispanic or Latino)" },
  { value: "black", label: "Black or African American" },
  { value: "asian", label: "Asian" },
  { value: "native_hawaiian", label: "Native Hawaiian or Other Pacific Islander" },
  { value: "american_indian", label: "American Indian or Alaska Native" },
  { value: "two_or_more", label: "Two or More Races" },
  { value: "prefer_not_say", label: "Prefer not to say" },
];

export default function ApplyJob() {
  const params = useParams();
  const jobId = params.jobId as string;

  const [job, setJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    full_name: "",
    email: "",
    phone: "",
    current_location: "",
    linkedin_url: "",
    portfolio_url: "",
    github_url: "",
    years_experience: "",
    current_company: "",
    current_title: "",
    expected_salary: "",
    notice_period: "",
    preferred_start_date: "",
    how_did_you_hear: "",
    cover_letter: "",

    // USA Immigration
    is_authorized_usa: "",
    requires_sponsorship: "",
    visa_status: "",
    visa_status_other: "",
    requires_cpt: "",
    is_stem_degree: "",
    opt_expiration_date: "",
    has_h1b_history: "",
    has_j1_history: "",
    is_subject_to_212e: "",
    has_i140_filed: "",
    requires_future_sponsorship: "",
    immigration_certified: false,

    // EEO
    gender: "",
    gender_self_describe: "",
    race_ethnicity: [] as string[],
    has_disability: "",
    is_veteran: "",
    eeo_acknowledged: false,
  });

  // Check for existing application
  const [existingApplication, setExistingApplication] = useState<{
    id: string;
    created_at: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Get job
      const { data: jobData } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();

      if (jobData) setJob(jobData);

      // Get user session
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
        setFormData(prev => ({
          ...prev,
          full_name: currentUser.user_metadata?.full_name || "",
          email: currentUser.email || "",
        }));

        // Check if user already applied to this job
        const { data: existingApp } = await supabase
          .from("job_applications")
          .select("id, created_at, status")
          .eq("job_id", jobId)
          .eq("email", currentUser.email)
          .single();

        if (existingApp) {
          setExistingApplication(existingApp);
        }
      }

      setLoading(false);
    };

    fetchData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setFormData(prev => ({
          ...prev,
          full_name: session.user.user_metadata?.full_name || prev.full_name,
          email: session.user.email || prev.email,
        }));

        // Check if user already applied to this job
        const { data: existingApp } = await supabase
          .from("job_applications")
          .select("id, created_at, status")
          .eq("job_id", jobId)
          .eq("email", session.user.email)
          .single();

        if (existingApp) {
          setExistingApplication(existingApp);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [jobId]);

  const handleGoogleSignIn = async () => {
    // Pass the current URL so user returns here after auth
    await signInWithGoogle(`/careers/apply/${jobId}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRaceEthnicityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      race_ethnicity: prev.race_ethnicity.includes(value)
        ? prev.race_ethnicity.filter(v => v !== value)
        : [...prev.race_ethnicity, value],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // Scroll to form top
  const scrollToFormTop = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Validation function
  const validateStep = (step: number): string[] => {
    const errors: string[] = [];
    const isUSA = job?.location_country === "usa";

    if (step === 1) {
      // Required fields
      if (!formData.full_name.trim()) errors.push("Full name is required");
      if (!formData.email.trim()) errors.push("Email address is required");
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push("Please enter a valid email address");
      }
      if (!formData.phone.trim()) errors.push("Phone number is required");
      if (!resumeFile) errors.push("Please upload your resume/CV");
      if (!formData.years_experience) errors.push("Years of experience is required");
    }

    if (step === 2 && isUSA) {
      if (!formData.is_authorized_usa) errors.push("Work authorization status is required");
      if (!formData.requires_sponsorship) errors.push("Sponsorship requirement is required");
      if (!formData.visa_status) errors.push("Current visa status is required");
      if (formData.visa_status === "other" && !formData.visa_status_other.trim()) {
        errors.push("Please specify your visa status");
      }
      if ((formData.visa_status === "f1_opt" || formData.visa_status === "f1_stem_opt")) {
        if (!formData.requires_cpt) errors.push("CPT requirement is required");
        if (!formData.is_stem_degree) errors.push("STEM degree status is required");
      }
      if (!formData.has_h1b_history) errors.push("H-1B history is required");
      if (!formData.has_j1_history) errors.push("J-1 history is required");
      if (formData.has_j1_history === "yes" && !formData.is_subject_to_212e) {
        errors.push("212(e) requirement status is required");
      }
      if (!formData.has_i140_filed) errors.push("I-140 status is required");
      if (!formData.requires_future_sponsorship) errors.push("Future sponsorship requirement is required");
      if (!formData.immigration_certified) errors.push("You must certify that your immigration information is accurate");
    }

    // EEO step (step 3 for USA, step 2 for India)
    const eeoStep = isUSA ? 3 : 2;
    if (step === eeoStep) {
      if (!formData.eeo_acknowledged) errors.push("You must acknowledge the voluntary self-identification notice");
    }

    return errors;
  };

  const handleNextStep = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      setValidationErrors(errors);
      scrollToFormTop();
      return;
    }
    setValidationErrors([]);
    setCurrentStep(currentStep + 1);
    scrollToFormTop();
  };

  const handlePrevStep = () => {
    setValidationErrors([]);
    setCurrentStep(currentStep - 1);
    scrollToFormTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let resumeUrl = "";

      // Upload resume if provided
      if (resumeFile && user) {
        const { url, error } = await uploadResume(resumeFile, user.id);
        if (url) resumeUrl = url;
      }

      // Prepare application data
      const applicationData: Record<string, unknown> = {
        job_id: jobId,
        user_id: user?.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || undefined,
        current_location: formData.current_location || undefined,
        linkedin_url: formData.linkedin_url || undefined,
        portfolio_url: formData.portfolio_url || undefined,
        github_url: formData.github_url || undefined,
        resume_url: resumeUrl || undefined,
        cover_letter: formData.cover_letter || undefined,
        years_experience: formData.years_experience ? parseInt(formData.years_experience) : undefined,
        current_company: formData.current_company || undefined,
        current_title: formData.current_title || undefined,
        expected_salary: formData.expected_salary || undefined,
        notice_period: formData.notice_period || undefined,
        preferred_start_date: formData.preferred_start_date || undefined,
        how_did_you_hear: formData.how_did_you_hear || undefined,

        // EEO
        gender: formData.gender || undefined,
        gender_self_describe: formData.gender_self_describe || undefined,
        race_ethnicity: formData.race_ethnicity.length > 0 ? formData.race_ethnicity : undefined,
        has_disability: formData.has_disability || undefined,
        is_veteran: formData.is_veteran || undefined,
        eeo_acknowledged: formData.eeo_acknowledged,
      };
      
      // USA Immigration (only for USA jobs)
      if (job?.location_country === "usa") {
        applicationData.is_authorized_usa = formData.is_authorized_usa === "yes";
        applicationData.requires_sponsorship = formData.requires_sponsorship === "yes";
        applicationData.visa_status = formData.visa_status || undefined;
        applicationData.visa_status_other = formData.visa_status_other || undefined;
        applicationData.requires_cpt = formData.requires_cpt === "yes";
        applicationData.is_stem_degree = formData.is_stem_degree === "yes";
        applicationData.opt_expiration_date = formData.opt_expiration_date || undefined;
        applicationData.has_h1b_history = formData.has_h1b_history === "yes";
        applicationData.has_j1_history = formData.has_j1_history === "yes";
        applicationData.is_subject_to_212e = formData.is_subject_to_212e === "yes";
        applicationData.has_i140_filed = formData.has_i140_filed === "yes";
        applicationData.requires_future_sponsorship = formData.requires_future_sponsorship === "yes";
        applicationData.immigration_certified = formData.immigration_certified;
      }

      const { error } = await submitApplication(applicationData);

      if (error) {
        console.error("Error submitting application:", error);
        alert("There was an error submitting your application. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your application. Please try again.");
    }

    setSubmitting(false);
  };

  const isUSA = job?.location_country === "usa";
  const totalSteps = isUSA ? 4 : 3;

  if (loading) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-3xl mx-auto text-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-zen animate-spin" />
            <p className="text-gray-500 mt-4">Loading...</p>
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
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-xs"
            >
              Back to Careers
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-3xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-zen rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faCheck} className="text-4xl text-black" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">Application Submitted!</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Thank you for applying to {job.title}. We'll review your application and get back to you soon.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all"
            >
              Back to Careers
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // If not logged in, show Google sign-in
  if (!user) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-lg mx-auto">
            <div className="mb-8">
              <Link
                href={`/careers/job/${jobId}`}
                className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black inline-flex items-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Job
              </Link>
            </div>

            <FadeInUp>
              <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-10 text-center">
                <div className="w-16 h-16 bg-zen rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faUser} className="text-2xl text-black" />
                </div>
                <h1 className="text-2xl font-bold text-black mb-2">Apply for {job.title}</h1>
                <p className="text-gray-500 mb-8">
                  Sign in with Google to continue your application
                </p>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-lg font-bold text-black hover:border-black transition-all"
                >
                  <FontAwesomeIcon icon={faGoogleBrand} className="text-xl" />
                  Continue with Google
                </button>

                <p className="text-gray-400 text-xs mt-6">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </FadeInUp>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // If user already applied, show message
  if (existingApplication) {
    const appliedDate = new Date(existingApplication.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-lg mx-auto">
            <div className="mb-8">
              <Link
                href={`/careers/job/${jobId}`}
                className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black inline-flex items-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Job
              </Link>
            </div>

            <FadeInUp>
              <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-10 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faCheck} className="text-2xl text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-black mb-2">Already Applied</h1>
                <p className="text-gray-500 mb-6">
                  You have already submitted an application for <strong>{job.title}</strong> on {appliedDate}.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Application Status</p>
                  <p className="text-lg font-bold text-black capitalize">{existingApplication.status}</p>
                </div>

                <p className="text-gray-400 text-sm mb-6">
                  Our team is reviewing applications and will contact you if your profile matches our requirements.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/careers"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all"
                  >
                    Browse Other Jobs
                  </Link>
                </div>
              </div>
            </FadeInUp>
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
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href={`/careers/job/${jobId}`}
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black inline-flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Job
            </Link>
          </div>

          <FadeInUp>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                Apply for {job.title}
              </h1>
              <p className="text-gray-500">
                {job.location} • {job.department}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      currentStep >= step
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      step
                    )}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`w-12 sm:w-20 h-1 mx-1 ${
                        currentStep > step ? "bg-black" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} id="application-form">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  {/* Personal Information Section */}
                  <div>
                    <h2 className="text-xl font-bold text-black mb-2">Personal Information</h2>
                    <p className="text-gray-500 text-sm mb-6">Fields marked with * are required</p>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Current Location
                          </label>
                          <input
                            type="text"
                            name="current_location"
                            value={formData.current_location}
                            onChange={handleInputChange}
                            placeholder="City, State/Country"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Experience Section */}
                  <div className="pt-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-black mb-6">Professional Experience</h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Current Company
                          </label>
                          <input
                            type="text"
                            name="current_company"
                            value={formData.current_company}
                            onChange={handleInputChange}
                            placeholder="Company Name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Current Job Title
                          </label>
                          <input
                            type="text"
                            name="current_title"
                            value={formData.current_title}
                            onChange={handleInputChange}
                            placeholder="Software Engineer"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Years of Experience *
                          </label>
                          <select
                            name="years_experience"
                            value={formData.years_experience}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all appearance-none bg-white"
                          >
                            <option value="">Select experience...</option>
                            <option value="0">Less than 1 year</option>
                            <option value="1">1-2 years</option>
                            <option value="3">3-5 years</option>
                            <option value="6">6-10 years</option>
                            <option value="10">10-15 years</option>
                            <option value="15">15+ years</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Notice Period
                          </label>
                          <select
                            name="notice_period"
                            value={formData.notice_period}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all appearance-none bg-white"
                          >
                            <option value="">Select notice period...</option>
                            <option value="immediate">Immediately available</option>
                            <option value="1_week">1 week</option>
                            <option value="2_weeks">2 weeks</option>
                            <option value="1_month">1 month</option>
                            <option value="2_months">2 months</option>
                            <option value="3_months">3 months</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Expected Salary (Annual)
                          </label>
                          <input
                            type="text"
                            name="expected_salary"
                            value={formData.expected_salary}
                            onChange={handleInputChange}
                            placeholder={isUSA ? "$100,000 - $150,000" : "₹15,00,000 - ₹25,00,000"}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Preferred Start Date
                          </label>
                          <input
                            type="date"
                            name="preferred_start_date"
                            value={formData.preferred_start_date}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Online Presence Section */}
                  <div className="pt-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-black mb-6">Online Presence</h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            name="linkedin_url"
                            value={formData.linkedin_url}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            GitHub Profile
                          </label>
                          <input
                            type="url"
                            name="github_url"
                            value={formData.github_url}
                            onChange={handleInputChange}
                            placeholder="https://github.com/yourusername"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Portfolio / Personal Website
                        </label>
                        <input
                          type="url"
                          name="portfolio_url"
                          value={formData.portfolio_url}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resume & Documents Section */}
                  <div className="pt-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-black mb-6">Resume & Cover Letter</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Resume/CV *
                        </label>
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${resumeFile ? 'border-zen bg-zen/5' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                            id="resume-upload"
                          />
                          <label htmlFor="resume-upload" className="cursor-pointer">
                            {resumeFile ? (
                              <>
                                <div className="w-12 h-12 bg-zen rounded-full flex items-center justify-center mx-auto mb-3">
                                  <FontAwesomeIcon icon={faCheck} className="text-xl text-black" />
                                </div>
                                <p className="text-black font-medium">{resumeFile.name}</p>
                                <p className="text-gray-400 text-sm mt-1">Click to replace</p>
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faUpload} className="text-3xl text-gray-300 mb-3" />
                                <p className="text-gray-600 font-medium">Drop your resume here or click to browse</p>
                                <p className="text-gray-400 text-sm mt-1">PDF, DOC, or DOCX (Max 10MB)</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Cover Letter (Optional)
                        </label>
                        <textarea
                          name="cover_letter"
                          value={formData.cover_letter}
                          onChange={handleInputChange}
                          rows={5}
                          placeholder="Tell us why you're excited about this role and what makes you a great fit..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          name="how_did_you_hear"
                          value={formData.how_did_you_hear}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all appearance-none bg-white"
                        >
                          <option value="">Select an option...</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="indeed">Indeed</option>
                          <option value="glassdoor">Glassdoor</option>
                          <option value="company_website">Company Website</option>
                          <option value="referral">Employee Referral</option>
                          <option value="job_fair">Job Fair / Event</option>
                          <option value="university">University / Campus</option>
                          <option value="social_media">Social Media</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Immigration (USA only) */}
              {currentStep === 2 && isUSA && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-black mb-2">Immigration & Work Authorization</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      This information is required for US-based positions
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        Are you legally authorized to work in the United States? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="is_authorized_usa"
                            value="yes"
                            checked={formData.is_authorized_usa === "yes"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="is_authorized_usa"
                            value="no"
                            checked={formData.is_authorized_usa === "no"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        Do you require employment-based immigration sponsorship (H-1B, O-1, etc.)? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="requires_sponsorship"
                            value="yes"
                            checked={formData.requires_sponsorship === "yes"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="requires_sponsorship"
                            value="no"
                            checked={formData.requires_sponsorship === "no"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        Current U.S. Immigration Status *
                      </label>
                      <select
                        name="visa_status"
                        value={formData.visa_status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-zen"
                      >
                        <option value="">Select status...</option>
                        {visaStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.visa_status === "other" && (
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Please specify your visa status
                        </label>
                        <input
                          type="text"
                          name="visa_status_other"
                          value={formData.visa_status_other}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-zen"
                        />
                      </div>
                    )}

                    {(formData.visa_status === "f1_opt" || formData.visa_status === "f1_stem_opt") && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-black mb-3">
                            Do you require CPT authorization?
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="requires_cpt"
                                value="yes"
                                checked={formData.requires_cpt === "yes"}
                                onChange={handleInputChange}
                                className="w-4 h-4"
                              />
                              <span>Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="requires_cpt"
                                value="no"
                                checked={formData.requires_cpt === "no"}
                                onChange={handleInputChange}
                                className="w-4 h-4"
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-black mb-3">
                            Is your degree classified as a STEM degree?
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="is_stem_degree"
                                value="yes"
                                checked={formData.is_stem_degree === "yes"}
                                onChange={handleInputChange}
                                className="w-4 h-4"
                              />
                              <span>Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="is_stem_degree"
                                value="no"
                                checked={formData.is_stem_degree === "no"}
                                onChange={handleInputChange}
                                className="w-4 h-4"
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            OPT/STEM OPT EAD Expiration Date
                          </label>
                          <input
                            type="date"
                            name="opt_expiration_date"
                            value={formData.opt_expiration_date}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-zen"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        Have you held H-1B status in the last 6 years?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="has_h1b_history"
                            value="yes"
                            checked={formData.has_h1b_history === "yes"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="has_h1b_history"
                            value="no"
                            checked={formData.has_h1b_history === "no"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        Have you ever held J-1 status?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="has_j1_history"
                            value="yes"
                            checked={formData.has_j1_history === "yes"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="has_j1_history"
                            value="no"
                            checked={formData.has_j1_history === "no"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {formData.has_j1_history === "yes" && (
                      <div>
                        <label className="block text-sm font-medium text-black mb-3">
                          Are you subject to the 2-year home residency requirement (212(e))?
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="is_subject_to_212e"
                              value="yes"
                              checked={formData.is_subject_to_212e === "yes"}
                              onChange={handleInputChange}
                              className="w-4 h-4"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="is_subject_to_212e"
                              value="no"
                              checked={formData.is_subject_to_212e === "no"}
                              onChange={handleInputChange}
                              className="w-4 h-4"
                            />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        Has an I-140 (Immigrant Petition) ever been filed on your behalf?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="has_i140_filed"
                            value="yes"
                            checked={formData.has_i140_filed === "yes"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="has_i140_filed"
                            value="no"
                            checked={formData.has_i140_filed === "no"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        Will you require visa sponsorship at any point in the future?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="requires_future_sponsorship"
                            value="yes"
                            checked={formData.requires_future_sponsorship === "yes"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="requires_future_sponsorship"
                            value="no"
                            checked={formData.requires_future_sponsorship === "no"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-md p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="immigration_certified"
                          checked={formData.immigration_certified}
                          onChange={handleInputChange}
                          className="w-5 h-5 mt-0.5"
                        />
                        <span className="text-sm text-gray-600">
                          I certify that the information provided above is true and accurate to the best of my knowledge.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 (or 2 for India): EEO */}
              {((currentStep === 3 && isUSA) || (currentStep === 2 && !isUSA)) && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-black mb-2">Voluntary Self-Identification</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      This information is voluntary and will not affect your application. It is collected for equal employment opportunity reporting purposes only.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Gender (Optional)
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "non_binary", label: "Non-binary / Third gender" },
                        { value: "self_describe", label: "Prefer to self-describe" },
                        { value: "prefer_not_say", label: "Prefer not to say" },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={option.value}
                            checked={formData.gender === option.value}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {formData.gender === "self_describe" && (
                      <input
                        type="text"
                        name="gender_self_describe"
                        value={formData.gender_self_describe}
                        onChange={handleInputChange}
                        placeholder="Please describe..."
                        className="mt-3 w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-zen"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Race / Ethnicity (Optional - select all that apply)
                    </label>
                    <div className="space-y-2">
                      {raceEthnicityOptions.map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.race_ethnicity.includes(option.value)}
                            onChange={() => handleRaceEthnicityChange(option.value)}
                            className="w-4 h-4"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Do you have a disability? (Optional)
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                        { value: "prefer_not_answer", label: "Prefer not to answer" },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="has_disability"
                            value={option.value}
                            checked={formData.has_disability === option.value}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Are you a protected veteran? (Optional)
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                        { value: "prefer_not_say", label: "Prefer not to say" },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="is_veteran"
                            value={option.value}
                            checked={formData.is_veteran === option.value}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="eeo_acknowledged"
                        checked={formData.eeo_acknowledged}
                        onChange={handleInputChange}
                        className="w-5 h-5 mt-0.5"
                      />
                      <span className="text-sm text-gray-600">
                        I understand that providing this information is voluntary and confidential.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4 (or 3 for India): Review */}
              {((currentStep === 4 && isUSA) || (currentStep === 3 && !isUSA)) && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-black mb-6">Review & Submit</h2>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Name</p>
                      <p className="text-black font-medium">{formData.full_name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                      <p className="text-black font-medium">{formData.email}</p>
                    </div>
                    {formData.phone && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Phone</p>
                        <p className="text-black font-medium">{formData.phone}</p>
                      </div>
                    )}
                    {resumeFile && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Resume</p>
                        <p className="text-black font-medium">{resumeFile.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-zen/10 border border-zen/30 rounded-lg p-6">
                    <p className="text-sm text-gray-600">
                      By submitting this application, you confirm that all information provided is accurate and complete.
                      We'll review your application and contact you if we'd like to move forward.
                    </p>
                  </div>
                </div>
              )}

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 font-bold text-sm mb-2">Please fix the following errors:</p>
                  <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-black rounded-md font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all"
                  >
                    Continue
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-zen text-black rounded-md font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <FontAwesomeIcon icon={faCheck} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </FadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}

