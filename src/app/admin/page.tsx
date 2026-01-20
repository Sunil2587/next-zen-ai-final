"use client";

import { useState, useEffect, useCallback } from "react";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSpinner,
  faEye,
  faDownload,
  faUser,
  faCalendar,
  faEnvelope,
  faExternalLink,
  faShieldHalved,
  faSignOutAlt,
  faLock,
  faRefresh,
  faPlus,
  faEdit,
  faTrash,
  faBriefcase,
  faUsers,
  faCheck,
  faTimes,
  faLocationDot,
  faBuilding,
  faSave,
  faNewspaper,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  supabase,
  Job,
  Article,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleArticlePublished,
  toggleArticleFeatured,
} from "@/lib/supabase";

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
  cover_letter?: string;
  jobs: {
    id: string;
    title: string;
    department: string;
    location: string;
    location_country: string;
  };
}

type TabType = "applications" | "jobs" | "articles";

const emptyJob: Omit<Job, 'id' | 'created_at' | 'updated_at'> = {
  title: "",
  department: "",
  location: "",
  location_country: "usa",
  type: "Full-time",
  description: "",
  full_description: "",
  requirements: [],
  responsibilities: [],
  salary_range: "",
  is_active: true,
};

const departmentOptions = [
  "AI Strategy",
  "Data & Analytics",
  "Engineering",
  "Cloud & Infrastructure",
  "Product",
  "Finance",
  "Operations",
  "Human Resources",
  "Sales & Marketing",
  "Quant Finance",
  "Digital Commerce",
  "Consulting",
];

const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("applications");

  // Applications state
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationWithJob | null>(null);
  const [filter, setFilter] = useState<"all" | "usa" | "india">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [jobsFilter, setJobsFilter] = useState<"all" | "usa" | "india">("all");
  const [jobsActiveFilter, setJobsActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [savingJob, setSavingJob] = useState(false);
  const [jobError, setJobError] = useState<string | null>(null);

  // For array fields
  const [requirementsInput, setRequirementsInput] = useState("");
  const [responsibilitiesInput, setResponsibilitiesInput] = useState("");

  // Articles state
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [articleForm, setArticleForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    category: "AI Strategy",
    published_date: new Date().toISOString().split('T')[0],
    read_time: "5 min read",
    icon: "faBrain",
    featured: false,
    is_published: true,
  });
  const [articlesFilter, setArticlesFilter] = useState<"all" | "published" | "draft">("all");
  const [savingArticle, setSavingArticle] = useState(false);
  const [articleError, setArticleError] = useState<string | null>(null);

  const articleCategoryOptions = [
    "AI Strategy",
    "Cloud Infrastructure",
    "Cybersecurity",
    "Automation",
    "Data & Analytics",
    "Digital Transformation",
    "Industry Insights",
  ];

  const articleIconOptions = [
    { value: "faBrain", label: "Brain (AI)" },
    { value: "faCloud", label: "Cloud" },
    { value: "faShieldHalved", label: "Security" },
    { value: "faRobot", label: "Robot (Automation)" },
    { value: "faDatabase", label: "Database" },
    { value: "faChartLine", label: "Chart (Analytics)" },
    { value: "faCode", label: "Code" },
    { value: "faLightbulb", label: "Lightbulb (Ideas)" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("adminAuthenticated", "true");
        setIsAuthenticated(true);
      } else {
        setLoginError("Invalid username or password");
      }
    } catch {
      setLoginError("Authentication failed. Please try again.");
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Fetch applications
  const fetchApplications = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    setFetchError(null);

    try {
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

      if (error) {
        console.error("Supabase fetch error:", error);
        setFetchError(`Failed to load applications: ${error.message}`);
        return;
      }

      if (data) {
        setApplications(data as ApplicationWithJob[]);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setFetchError("Network error. Please check your connection.");
    } finally {
      if (showRefreshIndicator) setRefreshing(false);
    }
  }, []);

  // Fetch jobs
  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const { data, error } = await getAllJobs(true);
      if (error) {
        console.error("Jobs fetch error:", error);
        setJobError(`Failed to load jobs: ${error.message}`);
        return;
      }
      if (data) {
        setJobs(data);
      }
    } finally {
      setJobsLoading(false);
    }
  }, []);

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    const { data, error } = await getAllArticles(true);
    if (error) {
      console.error("Articles fetch error:", error);
      setArticleError(`Failed to load articles: ${error.message}`);
      return;
    }
    if (data) {
      setArticles(data);
    }
  }, []);

  // Initial auth check
  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Fetch data when authenticated or tab changes
  useEffect(() => {
    if (!isAuthenticated) return;

    // Immediate fetch based on active tab
    if (activeTab === "applications") {
      fetchApplications();
    } else if (activeTab === "jobs") {
      fetchJobs();
    } else if (activeTab === "articles") {
      fetchArticles();
    }
  }, [isAuthenticated, activeTab, fetchApplications, fetchJobs, fetchArticles]);

  // Setup realtime subscription separately
  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial fetch of all data
    fetchApplications();
    fetchJobs();
    fetchArticles();

    // Setup realtime subscription
    const channel = supabase
      .channel('admin-data')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job_applications' }, () => {
        fetchApplications();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
        fetchJobs();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, () => {
        fetchArticles();
      })
      .subscribe();

    const refreshInterval = setInterval(() => {
      fetchApplications();
      fetchJobs();
      fetchArticles();
    }, 30000);

    return () => {
      channel.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, [isAuthenticated, fetchApplications, fetchJobs, fetchArticles]);

  const handleManualRefresh = () => {
    fetchApplications(true);
    fetchJobs();
    fetchArticles();
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

  // Job management functions
  const handleCreateJob = () => {
    setIsCreatingJob(true);
    setIsEditingJob(false);
    setSelectedJob(null);
    setJobForm(emptyJob);
    setRequirementsInput("");
    setResponsibilitiesInput("");
    setJobError(null);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsEditingJob(true);
    setIsCreatingJob(false);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      location_country: job.location_country,
      type: job.type,
      description: job.description,
      full_description: job.full_description || "",
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      salary_range: job.salary_range || "",
      is_active: job.is_active,
    });
    setRequirementsInput(job.requirements.join("\n"));
    setResponsibilitiesInput(job.responsibilities.join("\n"));
    setJobError(null);
  };

  const handleCancelJobEdit = () => {
    setIsCreatingJob(false);
    setIsEditingJob(false);
    setSelectedJob(null);
    setJobForm(emptyJob);
    setRequirementsInput("");
    setResponsibilitiesInput("");
    setJobError(null);
  };

  const handleSaveJob = async () => {
    setSavingJob(true);
    setJobError(null);

    // Parse array fields
    const requirements = requirementsInput
      .split("\n")
      .map(s => s.trim())
      .filter(s => s.length > 0);
    const responsibilities = responsibilitiesInput
      .split("\n")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const jobData = {
      ...jobForm,
      requirements,
      responsibilities,
    };

    try {
      if (isCreatingJob) {
        const { error } = await createJob(jobData);
        if (error) {
          setJobError(`Failed to create job: ${error.message}`);
          setSavingJob(false);
          return;
        }
      } else if (isEditingJob && selectedJob) {
        const { error } = await updateJob(selectedJob.id, jobData);
        if (error) {
          setJobError(`Failed to update job: ${error.message}`);
          setSavingJob(false);
          return;
        }
      }

      await fetchJobs();
      handleCancelJobEdit();
    } catch {
      setJobError("An unexpected error occurred");
    }
    setSavingJob(false);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job? This will also delete all applications for this job.")) {
      return;
    }

    const { error } = await deleteJob(jobId);
    if (error) {
      setJobError(`Failed to delete job: ${error.message}`);
      return;
    }

    await fetchJobs();
    if (selectedJob?.id === jobId) {
      setSelectedJob(null);
    }
  };

  const handleToggleJobStatus = async (job: Job) => {
    const { error } = await toggleJobStatus(job.id, !job.is_active);
    if (error) {
      setJobError(`Failed to update job status: ${error.message}`);
      return;
    }
    await fetchJobs();
  };

  // Article management functions
  const handleCreateArticle = () => {
    setIsCreatingArticle(true);
    setIsEditingArticle(false);
    setSelectedArticle(null);
    setArticleForm({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      category: "AI Strategy",
      published_date: new Date().toISOString().split('T')[0],
      read_time: "5 min read",
      icon: "faBrain",
      featured: false,
      is_published: true,
    });
    setArticleError(null);
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsEditingArticle(true);
    setIsCreatingArticle(false);
    setArticleForm({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      published_date: article.published_date.split('T')[0],
      read_time: article.read_time,
      icon: article.icon,
      featured: article.featured,
      is_published: article.is_published,
    });
    setArticleError(null);
  };

  const handleCancelArticleEdit = () => {
    setIsCreatingArticle(false);
    setIsEditingArticle(false);
    setSelectedArticle(null);
    setArticleForm({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      category: "AI Strategy",
      published_date: new Date().toISOString().split('T')[0],
      read_time: "5 min read",
      icon: "faBrain",
      featured: false,
      is_published: true,
    });
    setArticleError(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSaveArticle = async () => {
    setSavingArticle(true);
    setArticleError(null);

    // Auto-generate slug if empty
    const slug = articleForm.slug || generateSlug(articleForm.title);

    const articleData = {
      ...articleForm,
      slug,
    };

    try {
      if (isCreatingArticle) {
        const { error } = await createArticle(articleData);
        if (error) {
          setArticleError(`Failed to create article: ${error.message}`);
          setSavingArticle(false);
          return;
        }
      } else if (isEditingArticle && selectedArticle) {
        const { error } = await updateArticle(selectedArticle.id, articleData);
        if (error) {
          setArticleError(`Failed to update article: ${error.message}`);
          setSavingArticle(false);
          return;
        }
      }

      await fetchArticles();
      handleCancelArticleEdit();
    } catch {
      setArticleError("An unexpected error occurred");
    }
    setSavingArticle(false);
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Are you sure you want to delete this article?")) {
      return;
    }

    const { error } = await deleteArticle(articleId);
    if (error) {
      setArticleError(`Failed to delete article: ${error.message}`);
      return;
    }

    await fetchArticles();
    if (selectedArticle?.id === articleId) {
      setSelectedArticle(null);
    }
  };

  const handleToggleArticlePublished = async (article: Article) => {
    const { error } = await toggleArticlePublished(article.id, !article.is_published);
    if (error) {
      setArticleError(`Failed to update article status: ${error.message}`);
      return;
    }
    await fetchArticles();
  };

  const handleToggleArticleFeatured = async (article: Article) => {
    const { error } = await toggleArticleFeatured(article.id, !article.featured);
    if (error) {
      setArticleError(`Failed to update article: ${error.message}`);
      return;
    }
    await fetchArticles();
  };

  // Filtered data
  const filteredApplications = applications.filter(app => {
    if (filter !== "all" && app.jobs?.location_country !== filter) return false;
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    return true;
  });

  const filteredJobs = jobs.filter(job => {
    if (jobsFilter !== "all" && job.location_country !== jobsFilter) return false;
    if (jobsActiveFilter === "active" && !job.is_active) return false;
    if (jobsActiveFilter === "inactive" && job.is_active) return false;
    return true;
  });

  const filteredArticles = articles.filter(article => {
    if (articlesFilter === "published" && !article.is_published) return false;
    if (articlesFilter === "draft" && article.is_published) return false;
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

  if (!isAuthenticated) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-md mx-auto py-10">
            <FadeInUp>
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-zen rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faShieldHalved} className="text-2xl text-black" />
                  </div>
                  <h1 className="text-2xl font-bold text-black">Admin Portal</h1>
                  <p className="text-gray-500 text-sm mt-2">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {loginError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {loginError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg focus:outline-none focus:border-zen transition-all"
                        placeholder="Enter username"
                        required
                      />
                      <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg focus:outline-none focus:border-zen transition-all"
                        placeholder="Enter password"
                        required
                      />
                      <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-center text-gray-400 text-xs mt-6">
                  Authorized personnel only
                </p>
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
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black inline-flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Home
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-black transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign Out
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === "applications"
                  ? "border-zen text-black"
                  : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-1.5 sm:mr-2" />
              <span className="hidden sm:inline">Applications</span>
              <span className="sm:hidden">Apps</span>
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === "jobs"
                  ? "border-zen text-black"
                  : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faBriefcase} className="mr-1.5 sm:mr-2" />
              Jobs
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === "articles"
                  ? "border-zen text-black"
                  : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faNewspaper} className="mr-1.5 sm:mr-2" />
              <span className="hidden sm:inline">Articles</span>
              <span className="sm:hidden">News</span>
            </button>
          </div>

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <FadeInUp>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black">
                    Career Applications
                  </h1>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-gray-500 text-sm">
                      {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""}
                    </p>
                    {lastRefreshed && (
                      <span className="text-gray-400 text-xs">
                        • Last updated: {lastRefreshed.toLocaleTimeString()}
                      </span>
                    )}
                    <button
                      onClick={handleManualRefresh}
                      disabled={refreshing}
                      className="text-gray-400 hover:text-black transition-colors disabled:opacity-50"
                      title="Refresh applications"
                    >
                      <FontAwesomeIcon
                        icon={faRefresh}
                        className={`text-sm ${refreshing ? 'animate-spin' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
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

              {fetchError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
                  <span>{fetchError}</span>
                  <button onClick={handleManualRefresh} className="text-red-700 hover:text-red-900 font-medium">
                    Retry
                  </button>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-6">
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

                        {selectedApplication.years_experience != null && (
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Experience</p>
                            <p className="text-black text-sm">{selectedApplication.years_experience} years</p>
                          </div>
                        )}

                        {selectedApplication.cover_letter && (
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Cover Letter</p>
                            <p className="text-gray-600 text-sm line-clamp-4">{selectedApplication.cover_letter}</p>
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
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <FadeInUp>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black">
                    Job Management
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} • {jobs.filter(j => j.is_active).length} active
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <div className="inline-flex bg-gray-100 rounded-md p-1">
                    <button
                      onClick={() => setJobsFilter("all")}
                      className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        jobsFilter === "all" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setJobsFilter("usa")}
                      className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        jobsFilter === "usa" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                      }`}
                    >
                      🇺🇸 USA
                    </button>
                    <button
                      onClick={() => setJobsFilter("india")}
                      className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        jobsFilter === "india" ? "bg-black text-white" : "text-gray-500 hover:text-black"
                      }`}
                    >
                      🇮🇳 India
                    </button>
                  </div>

                  <select
                    value={jobsActiveFilter}
                    onChange={(e) => setJobsActiveFilter(e.target.value as typeof jobsActiveFilter)}
                    className="px-3 py-1.5 bg-gray-100 border-0 rounded-md text-xs font-bold uppercase tracking-wider"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <button
                    onClick={handleCreateJob}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zen text-black rounded-md text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    New Job
                  </button>
                </div>
              </div>

              {jobError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {jobError}
                </div>
              )}

              {/* Job Form */}
              {(isCreatingJob || isEditingJob) && (
                <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-black mb-6">
                    {isCreatingJob ? "Create New Job" : "Edit Job"}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          value={jobForm.title}
                          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                          placeholder="e.g., Senior AI/ML Engineer"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Department *
                          </label>
                          <select
                            value={jobForm.department}
                            onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                            required
                          >
                            <option value="">Select...</option>
                            {departmentOptions.map((dept) => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Job Type *
                          </label>
                          <select
                            value={jobForm.type}
                            onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                            required
                          >
                            {jobTypeOptions.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Location *
                          </label>
                          <input
                            type="text"
                            value={jobForm.location}
                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                            placeholder="e.g., Jersey City, NJ"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Country *
                          </label>
                          <select
                            value={jobForm.location_country}
                            onChange={(e) => setJobForm({ ...jobForm, location_country: e.target.value as 'usa' | 'india' })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                            required
                          >
                            <option value="usa">🇺🇸 United States</option>
                            <option value="india">🇮🇳 India</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Salary Range (Optional)
                        </label>
                        <input
                          type="text"
                          value={jobForm.salary_range || ""}
                          onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                          placeholder="e.g., $120,000 - $180,000"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Short Description *
                        </label>
                        <textarea
                          value={jobForm.description}
                          onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen resize-none"
                          rows={3}
                          placeholder="Brief job summary (shown in job listings)"
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Full Job Description
                        </label>
                        <textarea
                          value={jobForm.full_description || ""}
                          onChange={(e) => setJobForm({ ...jobForm, full_description: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen resize-none"
                          rows={4}
                          placeholder="Detailed job description (shown on job detail page)"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Requirements (one per line)
                        </label>
                        <textarea
                          value={requirementsInput}
                          onChange={(e) => setRequirementsInput(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen resize-none font-mono text-sm"
                          rows={4}
                          placeholder="5+ years experience&#10;Python/TypeScript proficiency&#10;Machine learning expertise"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Responsibilities (one per line)
                        </label>
                        <textarea
                          value={responsibilitiesInput}
                          onChange={(e) => setResponsibilitiesInput(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen resize-none font-mono text-sm"
                          rows={4}
                          placeholder="Lead AI/ML initiatives&#10;Design and implement solutions&#10;Mentor junior engineers"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={jobForm.is_active}
                            onChange={(e) => setJobForm({ ...jobForm, is_active: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-zen focus:ring-zen"
                          />
                          <span className="text-sm text-gray-700">Active (visible to applicants)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleCancelJobEdit}
                      className="px-4 py-2 text-gray-500 hover:text-black text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveJob}
                      disabled={savingJob || !jobForm.title || !jobForm.department || !jobForm.location || !jobForm.description}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md text-sm font-bold uppercase tracking-wider hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {savingJob ? (
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      ) : (
                        <FontAwesomeIcon icon={faSave} />
                      )}
                      {isCreatingJob ? "Create Job" : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}

              {/* Jobs List */}
              <div className="space-y-4">
                {jobsLoading ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faSpinner} className="text-4xl text-zen animate-spin mb-3" />
                    <p className="text-gray-500">Loading jobs...</p>
                  </div>
                ) : filteredJobs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faBriefcase} className="text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500">No jobs found.</p>
                    <button
                      onClick={handleCreateJob}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-zen text-black rounded-md text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      Create First Job
                    </button>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`bg-gray-50 border rounded-lg p-5 transition-all ${
                        job.is_active ? "border-gray-200" : "border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-black">{job.title}</h3>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              job.is_active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"
                            }`}>
                              {job.is_active ? "Active" : "Inactive"}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">
                              {job.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faBuilding} />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faLocationDot} />
                              {job.location}
                            </span>
                            <span>
                              {job.location_country === "usa" ? "🇺🇸" : "🇮🇳"}
                            </span>
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faCalendar} />
                              {new Date(job.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleJobStatus(job)}
                            className={`p-2 rounded transition-all ${
                              job.is_active
                                ? "text-green-600 hover:bg-green-50"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                            title={job.is_active ? "Deactivate" : "Activate"}
                          >
                            <FontAwesomeIcon icon={job.is_active ? faCheck : faTimes} />
                          </button>
                          <button
                            onClick={() => handleEditJob(job)}
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-all"
                            title="Edit"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </FadeInUp>
          )}

          {/* Articles Tab */}
          {activeTab === "articles" && (
            <FadeInUp>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black">
                    Article Management
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} • {articles.filter(a => a.is_published).length} published • {articles.filter(a => a.featured).length} featured
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <select
                    value={articlesFilter}
                    onChange={(e) => setArticlesFilter(e.target.value as typeof articlesFilter)}
                    className="px-3 py-1.5 bg-gray-100 border-0 rounded-md text-xs font-bold uppercase tracking-wider"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>

                  <button
                    onClick={handleCreateArticle}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zen text-black rounded-md text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    New Article
                  </button>
                </div>
              </div>

              {articleError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {articleError}
                </div>
              )}

              {/* Article Form */}
              {(isCreatingArticle || isEditingArticle) && (
                <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-black mb-6">
                    {isCreatingArticle ? "Create New Article" : "Edit Article"}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          value={articleForm.title}
                          onChange={(e) => {
                            setArticleForm({ ...articleForm, title: e.target.value });
                            if (!articleForm.slug) {
                              setArticleForm(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                            }
                          }}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                          placeholder="e.g., The Future of Enterprise AI"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Slug (URL)
                        </label>
                        <input
                          type="text"
                          value={articleForm.slug}
                          onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen font-mono text-sm"
                          placeholder="auto-generated-from-title"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Category *
                          </label>
                          <select
                            value={articleForm.category}
                            onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                            required
                          >
                            {articleCategoryOptions.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Icon
                          </label>
                          <select
                            value={articleForm.icon}
                            onChange={(e) => setArticleForm({ ...articleForm, icon: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                          >
                            {articleIconOptions.map((icon) => (
                              <option key={icon.value} value={icon.value}>{icon.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Publish Date
                          </label>
                          <input
                            type="date"
                            value={articleForm.published_date}
                            onChange={(e) => setArticleForm({ ...articleForm, published_date: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Read Time
                          </label>
                          <input
                            type="text"
                            value={articleForm.read_time}
                            onChange={(e) => setArticleForm({ ...articleForm, read_time: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen"
                            placeholder="5 min read"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Excerpt *
                        </label>
                        <textarea
                          value={articleForm.excerpt}
                          onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen resize-none"
                          rows={3}
                          placeholder="Brief summary shown in article listings"
                          required
                        />
                      </div>

                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={articleForm.is_published}
                            onChange={(e) => setArticleForm({ ...articleForm, is_published: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-zen focus:ring-zen"
                          />
                          <span className="text-sm text-gray-700">Published</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={articleForm.featured}
                            onChange={(e) => setArticleForm({ ...articleForm, featured: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-zen focus:ring-zen"
                          />
                          <span className="text-sm text-gray-700">Featured</span>
                        </label>
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Article Content * (Markdown supported)
                        </label>
                        <textarea
                          value={articleForm.content}
                          onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-zen resize-none font-mono text-sm"
                          rows={20}
                          placeholder="## Introduction&#10;&#10;Write your article content here using Markdown...&#10;&#10;### Section Title&#10;&#10;- Bullet point&#10;- Another point&#10;&#10;**Bold text** and *italic text*"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleCancelArticleEdit}
                      className="px-4 py-2 text-gray-500 hover:text-black text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveArticle}
                      disabled={savingArticle || !articleForm.title || !articleForm.excerpt || !articleForm.content}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md text-sm font-bold uppercase tracking-wider hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {savingArticle ? (
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      ) : (
                        <FontAwesomeIcon icon={faSave} />
                      )}
                      {isCreatingArticle ? "Create Article" : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}

              {/* Articles List */}
              <div className="space-y-4">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faNewspaper} className="text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500">No articles found.</p>
                    <button
                      onClick={handleCreateArticle}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-zen text-black rounded-md text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      Create First Article
                    </button>
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className={`bg-gray-50 border rounded-lg p-5 transition-all ${
                        article.is_published ? "border-gray-200" : "border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-black">{article.title}</h3>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              article.is_published ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"
                            }`}>
                              {article.is_published ? "Published" : "Draft"}
                            </span>
                            {article.featured && (
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">
                                Featured
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">
                              {article.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faCalendar} />
                              {new Date(article.published_date).toLocaleDateString()}
                            </span>
                            <span>{article.read_time}</span>
                            <span className="text-gray-300">|</span>
                            <span className="font-mono text-[10px]">/{article.slug}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleArticleFeatured(article)}
                            className={`p-2 rounded transition-all ${
                              article.featured
                                ? "text-yellow-600 hover:bg-yellow-50"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                            title={article.featured ? "Remove from featured" : "Mark as featured"}
                          >
                            <FontAwesomeIcon icon={faStar} />
                          </button>
                          <button
                            onClick={() => handleToggleArticlePublished(article)}
                            className={`p-2 rounded transition-all ${
                              article.is_published
                                ? "text-green-600 hover:bg-green-50"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                            title={article.is_published ? "Unpublish" : "Publish"}
                          >
                            <FontAwesomeIcon icon={article.is_published ? faCheck : faTimes} />
                          </button>
                          <a
                            href={`/insights/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-all"
                            title="View"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </a>
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-all"
                            title="Edit"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </FadeInUp>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}


