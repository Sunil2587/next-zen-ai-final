import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for API routes)
export const getServiceSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
};

// Database types
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  location_country: 'usa' | 'india';
  type: string;
  description: string;
  full_description?: string;
  requirements: string[];
  responsibilities: string[];
  salary_range?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id?: string;

  // Basic Info
  full_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  cover_letter?: string;
  years_experience?: number;

  // USA Immigration
  is_authorized_usa?: boolean;
  requires_sponsorship?: boolean;
  visa_status?: 'us_citizen' | 'permanent_resident' | 'f1_opt' | 'f1_stem_opt' | 'h1b' | 'o1' | 'l1' | 'tn_e3' | 'other';
  visa_status_other?: string;
  requires_cpt?: boolean;
  is_stem_degree?: boolean;
  opt_expiration_date?: string;
  has_h1b_history?: boolean;
  has_j1_history?: boolean;
  is_subject_to_212e?: boolean;
  has_i140_filed?: boolean;
  requires_future_sponsorship?: boolean;
  immigration_certified?: boolean;

  // EEO
  gender?: 'male' | 'female' | 'non_binary' | 'self_describe' | 'prefer_not_say';
  gender_self_describe?: string;
  race_ethnicity?: string[];
  has_disability?: 'yes' | 'no' | 'prefer_not_answer';
  is_veteran?: 'yes' | 'no' | 'prefer_not_say';
  eeo_acknowledged?: boolean;

  // Status
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected' | 'hired';
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  interest?: string;
  details: string;
  status: 'new' | 'in_progress' | 'completed' | 'spam';
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  published_date: string;
  read_time: string;
  icon: string;
  featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// Helper functions
export const getJobs = async (country?: 'usa' | 'india') => {
  let query = supabase.from('jobs').select('*').eq('is_active', true);
  if (country) {
    query = query.eq('location_country', country);
  }
  const { data, error } = await query.order('title');
  return { data, error };
};

export const getAllJobs = async (includeInactive = false) => {
  let query = supabase.from('jobs').select('*');
  if (!includeInactive) {
    query = query.eq('is_active', true);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const getJobById = async (id: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const createJob = async (job: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert(job)
    .select()
    .single();
  return { data, error };
};

export const updateJob = async (id: string, updates: Partial<Job>) => {
  const { data, error } = await supabase
    .from('jobs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteJob = async (id: string) => {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);
  return { error };
};

export const toggleJobStatus = async (id: string, isActive: boolean) => {
  const { data, error } = await supabase
    .from('jobs')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const submitApplication = async (application: Record<string, unknown>) => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert(application)
    .select()
    .single();
  return { data, error };
};

export const submitContactForm = async (submission: Partial<ContactSubmission>) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert(submission)
    .select()
    .single();
  return { data, error };
};

export const uploadResume = async (file: File, uniqueId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uniqueId}-${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    return { url: null, error };
  }

  // Get signed URL for the file (valid for 1 year)
  const { data: signedData, error: signedError } = await supabase.storage
    .from('resumes')
    .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year

  if (signedError) {
    console.error('Signed URL error:', signedError);
    return { url: null, error: signedError };
  }

  return { url: signedData.signedUrl, error: null };
};

// Auth helpers
export const signInWithGoogle = async (returnUrl?: string) => {
  // Store the return URL before redirecting
  if (returnUrl && typeof window !== 'undefined') {
    localStorage.setItem('authReturnUrl', returnUrl);
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Article functions
export const getArticles = async (category?: string) => {
  let query = supabase.from('articles').select('*').eq('is_published', true);
  if (category && category !== 'All') {
    query = query.eq('category', category);
  }
  const { data, error } = await query.order('published_date', { ascending: false });
  return { data, error };
};

export const getAllArticles = async (includeUnpublished = false) => {
  let query = supabase.from('articles').select('*');
  if (!includeUnpublished) {
    query = query.eq('is_published', true);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const getArticleBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();
  return { data, error };
};

export const getArticleCategories = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select('category')
    .eq('is_published', true);

  if (error) return { categories: [], error };

  const uniqueCategories = ['All', ...new Set(data?.map(a => a.category) || [])];
  return { categories: uniqueCategories, error: null };
};

export const createArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single();
  return { data, error };
};

export const updateArticle = async (id: string, updates: Partial<Article>) => {
  const { data, error } = await supabase
    .from('articles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteArticle = async (id: string) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);
  return { error };
};

export const toggleArticlePublished = async (id: string, isPublished: boolean) => {
  const { data, error } = await supabase
    .from('articles')
    .update({ is_published: isPublished, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const toggleArticleFeatured = async (id: string, featured: boolean) => {
  const { data, error } = await supabase
    .from('articles')
    .update({ featured: featured, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};


