'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Send, Sparkles, User, Mail, Phone, Linkedin, Globe, Briefcase, MessageSquare, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Job data (same as careers page)
const jobs = [
  { id: 'senior-ai-engineer', title: 'Senior AI Engineer', department: 'Engineering', location: 'Jersey City, NJ / Remote' },
  { id: 'cloud-solutions-architect', title: 'Cloud Solutions Architect', department: 'Engineering', location: 'Hyderabad, India / Hybrid' },
  { id: 'data-scientist', title: 'Data Scientist', department: 'Data & Analytics', location: 'Remote' },
  { id: 'cybersecurity-consultant', title: 'Cybersecurity Consultant', department: 'Security', location: 'Jersey City, NJ / Hybrid' },
  { id: 'business-analyst', title: 'Business Analyst', department: 'Consulting', location: 'Hyderabad, India' },
  { id: 'devops-engineer', title: 'DevOps Engineer', department: 'Engineering', location: 'Remote' },
];

function ApplicationForm() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;

  const [job, setJob] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    experience: '',
    coverLetter: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
    } else {
      router.push('/careers');
    }
  }, [jobId, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // 5MB limit for Supabase Storage
      if (file.size > 5 * 1024 * 1024) {
        setError('Resume file size should be less than 5MB');
        return;
      }
      setResume(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume');
      return;
    }

    // Check file size (max 5MB for Supabase Storage)
    if (resume.size > 5 * 1024 * 1024) {
      setError('Resume file size should be less than 5MB');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload resume to Supabase Storage
      const fileExt = resume.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resume);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Save application to Supabase
      const { error: insertError } = await supabase
        .from('applications')
        .insert({
          user_id: user?.id,
          job_id: job.id,
          job_title: job.title,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin,
          github: formData.github,
          portfolio: formData.portfolio,
          experience: formData.experience,
          cover_letter: formData.coverLetter,
          resume_url: publicUrl,
          resume_name: resume.name,
          resume_size: resume.size,
          status: 'pending',
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        router.push('/careers');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
      setLoading(false);
    }
  };

  if (!job) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-xl"
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Application Submitted Successfully!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-8 text-lg max-w-md mx-auto"
          >
            Thank you for applying! We've received your application and will review it shortly. Check your dashboard for updates.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/careers/dashboard"
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/careers"
              className="px-6 py-3 bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              Browse More Jobs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <Link href={`/careers/job/${jobId}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Job Description
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Professional Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block sticky top-24"
          >
            <div className="relative w-full">
              <Image
                src="https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=800&fit=crop"
                alt="Professional team meeting"
                width={600}
                height={800}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Right Side - Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-4"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
                <p className="text-gray-600 text-lg">{job.department} • {job.location}</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-500" />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-cyan-500" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-500" />
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="e.g., 5 years"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-cyan-500" />
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Github className="w-4 h-4 text-cyan-500" />
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="https://github.com/yourusername"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-500" />
                    Portfolio/Website
                  </label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="https://yourportfolio.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-500" />
                    Cover Letter *
                  </label>
                  <textarea
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-cyan-500" />
                    Resume/CV * (Max 5MB - PDF, DOC, DOCX)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                      required
                    />
                    <label
                      htmlFor="resume-upload"
                      className="w-full px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-gray-900 hover:border-cyan-500 hover:bg-cyan-50/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group"
                    >
                      {resume ? (
                        <>
                          <FileText className="w-8 h-8 text-cyan-500" />
                          <span className="text-cyan-600 font-medium">{resume.name}</span>
                          <span className="text-gray-500 text-sm">
                            {(resume.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                          <span className="text-gray-600 group-hover:text-cyan-600 transition-colors font-medium">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-gray-500 text-sm">
                            PDF, DOC, or DOCX (Max 5MB)
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg rounded-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-500 text-sm">
                  By submitting this application, you agree to our terms and privacy policy.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationPage() {
  return (
    <ProtectedRoute>
      <ApplicationForm />
    </ProtectedRoute>
  );
}
