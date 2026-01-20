"use client";

import { useState, useEffect } from "react";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getArticleBySlug, getArticles, Article } from "@/lib/supabase";

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await getArticleBySlug(slug);

      if (!error && data) {
        setArticle(data);

        // Fetch related articles
        const { data: allArticles } = await getArticles();
        if (allArticles) {
          const related = allArticles
            .filter((a) => a.category === data.category && a.slug !== slug)
            .slice(0, 2);
          setRelatedArticles(related);
        }
      }
      setLoading(false);
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto text-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-zen animate-spin" />
            <p className="text-gray-500 mt-4">Loading article...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Background />
        <Header />
        <main className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-black mb-4">Article Not Found</h1>
            <p className="text-gray-500 mb-8">This article may have been removed or doesn&apos;t exist.</p>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all"
            >
              ← Back to Insights
            </Link>
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
      <main className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white">
        <article className="max-w-7xl mx-auto">
          {/* Back Link */}
          <div className="mb-8 sm:mb-10">
            <Link
              href="/insights"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black transition-colors inline-flex items-center gap-2"
            >
              ← Back to Insights
            </Link>
          </div>

          <FadeInUp>
            {/* Article Header */}
            <header className="mb-10 sm:mb-14 max-w-4xl">
              <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] text-[10px] sm:text-[11px] mb-5 px-4 py-2 rounded-full">
                {article.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight leading-[1.1]">
                {article.title}
              </h1>
              <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-8">
                {article.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400 pb-8 border-b border-gray-200">
                <span>By <span className="text-black font-medium">Next Zen AI Strategix</span></span>
                <span>{formatDate(article.published_date)}</span>
                <span>{article.read_time}</span>
              </div>
            </header>

            {/* Article Content */}
            <div className="max-w-4xl mb-16 sm:mb-20">
              <div
                className="text-gray-600 text-base sm:text-lg leading-relaxed prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/## (.*?)(?=\n)/g, '<h2 class="text-2xl sm:text-3xl font-bold text-black mt-12 mb-6">$1</h2>')
                    .replace(/### (.*?)(?=\n)/g, '<h3 class="text-xl sm:text-2xl font-bold text-black mt-10 mb-4">$1</h3>')
                    .replace(/\n\n/g, '</p><p class="mb-6">')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-black font-semibold">$1</strong>')
                    .replace(/- (.*?)(?=\n|$)/g, '<li class="ml-6 mb-3 list-disc">$1</li>')
                    .replace(/(\d+)\. \*\*(.*?)\*\*/g, '<div class="mb-4 pl-6 border-l-2 border-zen"><span class="text-zen font-bold text-lg">$1.</span> <strong class="text-black">$2</strong></div>'),
                }}
              />
            </div>

            {/* Company Attribution */}
            <div className="max-w-4xl border-t border-b border-gray-200 py-8 sm:py-10 mb-16 sm:mb-20">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-16 h-16 bg-zen rounded-full flex items-center justify-center text-black text-xl font-bold shrink-0">
                  NZ
                </div>
                <div>
                  <p className="text-black font-bold text-lg mb-1">
                    Next Zen AI Strategix
                  </p>
                  <p className="text-gray-500 text-sm font-medium mb-3">
                    Enterprise AI & Technology Consulting
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Our team of experts specializes in {article.category.toLowerCase()}, helping enterprises navigate
                    digital transformation with cutting-edge solutions across USA and India.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="max-w-4xl">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {relatedArticles.map((related) => (
                    <Link href={`/insights/${related.slug}`} key={related.id} className="group">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">
                        {related.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {related.excerpt}
                      </p>
                      <span className="inline-block mt-3 text-xs font-bold uppercase tracking-wider text-black group-hover:text-zen transition-colors">
                        Read Article →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </FadeInUp>
        </article>
      </main>
      <Footer />
    </>
  );
}
